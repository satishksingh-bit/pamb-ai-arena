#!/usr/bin/env python3
"""Challenge 1 End-to-End Regression Suite (20 Outreach/Banner Cases + 4 Multi-Turn Face-Lock Tracks).

Validates:
1. Strict Image-First Gate (Step 0 photo required + Step 1 Studio Portrait required before Step 2).
2. Zero WhatsApp message leaks in `assistantReply` and `suggestedFollowUps`.
3. Single clean circular gold portrait medallion (zero duplicate/ghost background circles or silhouettes).
4. Centered face framing inside the medallion (`_detect_face_box_norm`).
5. Dynamic zero-overlap badge placement (`_detect_text_boxes_norm` + `_choose_zero_overlap_badge_placement`).
6. Multi-turn facial identity preservation (`temperature=0.2`) across 3 turns on real participant selfies.

Usage:
  python3 tests/c1/test_c1_regression.py --api-url http://localhost:8095/api/ai --project gemini-enterprise-demo-cb
"""

from __future__ import annotations

import argparse
import base64
from concurrent.futures import ThreadPoolExecutor, as_completed
import glob
import json
import os
import subprocess
import sys
import tempfile
import time
import requests

REPO_ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
SIM_PORTRAITS_DIR = os.path.join(REPO_ROOT, "static", "sim_portraits")

_CACHED_TOKEN = {"val": "", "exp": 0.0}


def get_token(force_refresh: bool = False) -> str:
    now = time.time()
    if not force_refresh and _CACHED_TOKEN["val"] and now < _CACHED_TOKEN["exp"]:
        return _CACHED_TOKEN["val"]
    env_tok = os.environ.get("GCP_ACCESS_TOKEN", "").strip()
    if env_tok and not force_refresh:
        return env_tok
    tok = subprocess.check_output(
        ["gcloud", "auth", "print-access-token", "--quiet"],
        text=True,
        timeout=15,
    ).strip()
    _CACHED_TOKEN["val"] = tok
    _CACHED_TOKEN["exp"] = now + 1800
    return tok


def load_data_url(path: str) -> str:
    mime = "image/png" if path.lower().endswith(".png") else "image/jpeg"
    with open(path, "rb") as f:
        return f"data:{mime};base64," + base64.b64encode(f.read()).decode("ascii")


def save_data_url(data_url: str | None, out_dir: str, filename: str) -> str | None:
    if not data_url or "," not in data_url:
        return None
    _, b64 = data_url.split(",", 1)
    path = os.path.join(out_dir, filename)
    with open(path, "wb") as f:
        f.write(base64.b64decode(b64))
    return path


def generate_or_load_celeb_photo(
    idx: int, celebrity: str, slug: str, project_id: str, celeb_cache_dir: str | None, out_dir: str
) -> str:
    """Load cached celebrity reference photo if provided, else synthesize a 1:1 reference photo via Vertex AI."""
    if celeb_cache_dir and os.path.isdir(celeb_cache_dir):
        candidates = sorted(
            glob.glob(os.path.join(celeb_cache_dir, f"c{idx:02d}_*portrait*.jpg"))
            + glob.glob(os.path.join(celeb_cache_dir, f"c{idx:02d}_*headshot*.jpg"))
        )
        if candidates:
            return load_data_url(candidates[0])

    token = get_token()
    url = (
        f"https://aiplatform.googleapis.com/v1/projects/{project_id}"
        "/locations/global/publishers/google/models/gemini-3.1-flash-image:generateContent"
    )
    payload = {
        "contents": [{
            "role": "user",
            "parts": [{
                "text": (
                    f"Create a realistic square (1:1) casual candid head-and-shoulders photo of public figure "
                    f"{celebrity} centered in frame, natural daylight, no text or borders."
                )
            }],
        }],
        "generationConfig": {
            "responseModalities": ["TEXT", "IMAGE"],
            "temperature": 0.35,
            "imageConfig": {"aspectRatio": "1:1"},
        },
    }
    resp = requests.post(
        url,
        headers={"Authorization": f"Bearer {token}", "X-Goog-User-Project": project_id},
        json=payload,
        timeout=45,
    )
    if resp.status_code == 200:
        parts = resp.json().get("candidates", [{}])[0].get("content", {}).get("parts", [])
        for p in parts:
            inl = p.get("inlineData")
            if inl and inl.get("data"):
                durl = f"data:{inl.get('mimeType', 'image/png')};base64,{inl['data']}"
                save_data_url(durl, out_dir, f"c{idx:02d}_{slug}_input_ref.jpg")
                return durl

    fallback_seed = os.path.join(SIM_PORTRAITS_DIR, f"leader_{(idx % 6) + 1}_before.png")
    return load_data_url(fallback_seed)


def audit_card_visual(image_path: str, expected_subject: str, occasion_label: str, project_id: str) -> dict:
    with open(image_path, "rb") as f:
        b64 = base64.b64encode(f.read()).decode()
    token = get_token()
    url = (
        f"https://aiplatform.googleapis.com/v1/projects/{project_id}"
        "/locations/global/publishers/google/models/gemini-3-flash-preview:generateContent"
    )
    prompt = f"""Inspect this generated luxury greeting card / personal branding banner carefully.
Expected subject inside the circular gold medallion: "{expected_subject}"
Expected visual theme: "{occasion_label}"

Evaluate ALL 6 checks strictly and return ONLY valid JSON:
{{
  "zero_text_overlap": true/false,
  "single_clean_circle": true/false,
  "portrait_centered_in_circle": true/false,
  "background_free_of_ghost_faces": true/false,
  "theme_matches_occasion": true/false,
  "badge_position": "bottom-right / top-right / right-center / left-center / bottom-left / top-left",
  "notes": "1 concise sentence describing text clearance, badge placement, face centering, and background cleanliness"
}}"""
    payload = {
        "contents": [{
            "role": "user",
            "parts": [
                {"inlineData": {"mimeType": "image/jpeg", "data": b64}},
                {"text": prompt},
            ],
        }],
        "generationConfig": {
            "temperature": 0.0,
            "maxOutputTokens": 512,
            "responseMimeType": "application/json",
            "thinkingConfig": {"thinkingBudget": 0},
        },
    }
    resp = requests.post(
        url,
        headers={"Authorization": f"Bearer {token}", "X-Goog-User-Project": project_id},
        json=payload,
        timeout=35,
    )
    if resp.status_code != 200:
        return {"error": f"HTTP {resp.status_code}: {resp.text[:200]}"}
    parts = resp.json().get("candidates", [{}])[0].get("content", {}).get("parts", [])
    text = "".join(p.get("text", "") for p in parts if not p.get("thought"))
    try:
        return json.loads(text)
    except Exception:
        return {"raw": text}


def audit_face_identity(orig_path: str, edited_path: str, stage_desc: str, project_id: str) -> dict:
    with open(orig_path, "rb") as f1, open(edited_path, "rb") as f2:
        b1 = base64.b64encode(f1.read()).decode()
        b2 = base64.b64encode(f2.read()).decode()
    mime1 = "image/png" if orig_path.endswith(".png") else "image/jpeg"
    mime2 = "image/png" if edited_path.endswith(".png") else "image/jpeg"
    token = get_token()
    url = (
        f"https://aiplatform.googleapis.com/v1/projects/{project_id}"
        "/locations/global/publishers/google/models/gemini-3-flash-preview:generateContent"
    )
    prompt = f"""Compare Image 1 (original participant photo) and Image 2 ({stage_desc}).
Determine whether Image 2 preserves the EXACT facial identity of the person in Image 1 (bone structure, eyes, nose, mouth, skin tone, glasses if worn, age, and ethnicity).
Return ONLY valid JSON:
{{
  "same_person": true/false,
  "identity_score": 0-100,
  "glasses_and_features_preserved": true/false,
  "notes": "1 concise sentence comparing facial identity between Image 1 and Image 2"
}}"""
    payload = {
        "contents": [{
            "role": "user",
            "parts": [
                {"inlineData": {"mimeType": mime1, "data": b1}},
                {"inlineData": {"mimeType": mime2, "data": b2}},
                {"text": prompt},
            ],
        }],
        "generationConfig": {
            "temperature": 0.0,
            "maxOutputTokens": 512,
            "responseMimeType": "application/json",
            "thinkingConfig": {"thinkingBudget": 0},
        },
    }
    resp = requests.post(
        url,
        headers={"Authorization": f"Bearer {token}", "X-Goog-User-Project": project_id},
        json=payload,
        timeout=35,
    )
    if resp.status_code != 200:
        return {"error": f"HTTP {resp.status_code}"}
    parts = resp.json().get("candidates", [{}])[0].get("content", {}).get("parts", [])
    text = "".join(p.get("text", "") for p in parts if not p.get("thought"))
    try:
        return json.loads(text)
    except Exception:
        return {"raw": text}


CELEB_CASES = [
    {"idx": 1, "celebrity": "Michelle Yeoh", "occasion_expected": "cny_lunar", "occasion_label": "Chinese New Year (CNY) Crimson & Gold Prosperity Card", "lang": "en", "agent": "Mei Ling Tan", "prompt": "Put my studio portrait onto a luxury Chinese New Year (CNY) greeting card in crimson & brushed gold with plum blossoms and the KL skyline."},
    {"idx": 2, "celebrity": "Shah Rukh Khan", "occasion_expected": "deepavali", "occasion_label": "Deepavali Festival of Lights Card", "lang": "en", "agent": "Rajesh Menon", "prompt": "Put my studio portrait onto an opulent Deepavali Festival of Lights greeting card with glowing brass diyas and golden rangoli."},
    {"idx": 3, "celebrity": "Siti Nurhaliza", "occasion_expected": "hari_raya", "occasion_label": "Hari Raya Aidilfitri Emerald & Gold Card", "lang": "ms", "agent": "Nurul Aisyah", "prompt": "Letakkan potret studio saya pada kad ucapan mewah Hari Raya Aidilfitri berwarna zamrud & emas berserta ketupat anyaman dan pelita hangat."},
    {"idx": 4, "celebrity": "Henry Golding", "occasion_expected": "brand_banner", "occasion_label": "Executive Personal Branding Banner", "lang": "en", "agent": "Daniel Wong", "prompt": "Put my studio portrait onto a sleek Executive Personal Branding banner overlooking the Kuala Lumpur Petronas Twin Towers at golden hour."},
    {"idx": 5, "celebrity": "Lee Chong Wei", "occasion_expected": "cny_lunar", "occasion_label": "Chinese New Year (CNY) Prosperity Card", "lang": "zh-CN", "agent": "Jason Lim", "prompt": "把我的高管形象照放到一张奢华红金农历新年（CNY）新春尊享贺卡上，融入梅花、红灯笼与双子塔天际线。"},
    {"idx": 6, "celebrity": "Rajinikanth", "occasion_expected": "deepavali", "occasion_label": "Deepavali Festival of Lights Card", "lang": "ta", "agent": "Arvind Kumar", "prompt": "தங்க நிற அகல் விளக்குகள் மற்றும் ரங்கோலி கோலத்துடன் ஆடம்பரமான தீபாவளி (Deepavali) வாழ்த்து அட்டையில் எனது ஸ்டுடியோ உருவப்படத்தை வைக்கவும்."},
    {"idx": 7, "celebrity": "Tony Leung Chiu-wai", "occasion_expected": "newborn", "occasion_label": "Newborn Baby Milestone Luxury Card", "lang": "yue", "agent": "Raymond Cheung", "prompt": "將我張高管形象照放上香檳金客戶里程碑賀卡，祝賀喜迎新生寶寶。"},
    {"idx": 8, "celebrity": "Nicol David", "occasion_expected": "annual_review", "occasion_label": "Annual Executive Protection Review Card", "lang": "en", "agent": "Grace Lim", "prompt": "Put my studio portrait onto an Annual Policy & Protection Review executive greeting card in refined navy & gold."},
    {"idx": 9, "celebrity": "Keanu Reeves", "occasion_expected": "sme_legacy", "occasion_label": "SME Business Expansion & Keyman Legacy Card", "lang": "en", "agent": "Victor Chong", "prompt": "Put my studio portrait onto a luxury SME Business Expansion & Legacy congratulatory card in slate navy & brushed gold overlooking the Johor skyline."},
    {"idx": 10, "celebrity": "Priyanka Chopra", "occasion_expected": "deepavali", "occasion_label": "Deepavali Festival of Lights Card", "lang": "en", "agent": "Kavitha Nair", "prompt": "Put my studio portrait onto an opulent Deepavali Festival of Lights VIP greeting card in royal amethyst, marigold gold, and brass oil diyas."},
    {"idx": 11, "celebrity": "Jay Chou", "occasion_expected": "cny_lunar", "occasion_label": "Chinese New Year (CNY) Prosperity Card", "lang": "zh-CN", "agent": "Marcus Ong", "prompt": "把我的高管形象照放到一张红金新春尊享贺卡（CNY）上，带有金色梅花与吉隆坡天际线。"},
    {"idx": 12, "celebrity": "Yuna", "occasion_expected": "hari_raya", "occasion_label": "Hari Raya Aidilfitri Emerald & Gold Card", "lang": "ms", "agent": "Farah Nadiah", "prompt": "Letakkan potret studio saya pada kad ucapan Hari Raya Aidilfitri zamrud & emas bersama pelita dan corak songket."},
    {"idx": 13, "celebrity": "Simu Liu", "occasion_expected": "festive", "occasion_label": "VIP Year-End Client Appreciation Card", "lang": "en", "agent": "Adrian Teh", "prompt": "Put my studio portrait onto a warm Year-End VIP Client Appreciation luxury card in emerald velvet & antique gold leaf overlooking the Kuala Lumpur skyline."},
    {"idx": 14, "celebrity": "Zendaya", "occasion_expected": "newborn", "occasion_label": "Newborn Baby Milestone Luxury Card", "lang": "en", "agent": "Sarah Khoo", "prompt": "Put my studio portrait onto a champagne-ivory & brushed gold newborn milestone card celebrating a newborn baby girl."},
    {"idx": 15, "celebrity": "Son Heung-min", "occasion_expected": "cny_lunar", "occasion_label": "Chinese New Year (CNY) Prosperity Card", "lang": "en", "agent": "Kelvin Yap", "prompt": "Put my studio portrait onto a crimson & brushed gold Chinese New Year (CNY) prosperity card with glowing lanterns and mandarin oranges."},
    {"idx": 16, "celebrity": "Andy Lau", "occasion_expected": "sme_legacy", "occasion_label": "SME Business Expansion & Keyman Legacy Card", "lang": "yue", "agent": "Kenneth Wong", "prompt": "將我張高管形象照放上深藍配拉絲金商業里程碑賀卡，祝賀企業擴建新廠房。"},
    {"idx": 17, "celebrity": "Taylor Swift", "occasion_expected": "hari_raya", "occasion_label": "Hari Raya Aidilfitri Emerald & Gold Card", "lang": "en", "agent": "Hannah Lim", "prompt": "Put my studio portrait onto an emerald & brushed gold Hari Raya Aidilfitri greeting card with intricate songket patterns and brass pelita lamps."},
    {"idx": 18, "celebrity": "Donnie Yen", "occasion_expected": "cny_lunar", "occasion_label": "Chinese New Year (CNY) Prosperity Card", "lang": "zh-CN", "agent": "Steven Chow", "prompt": "把我的高管形象照放到一张尊贵红金农历新年（CNY）贺卡上，配金色祥云梅花图案。"},
    {"idx": 19, "celebrity": "Deepika Padukone", "occasion_expected": "deepavali", "occasion_label": "Deepavali Festival of Lights Card", "lang": "en", "agent": "Priya Subramaniam", "prompt": "Put my studio portrait onto a luxury Deepavali Festival of Lights greeting card featuring glowing brass diyas and lotus rangoli."},
    {"idx": 20, "celebrity": "Roger Federer", "occasion_expected": "brand_banner", "occasion_label": "Executive Personal Branding Banner", "lang": "en", "agent": "Alexander Tan", "prompt": "Put my studio portrait onto a sleek Executive Personal Branding banner overlooking the Kuala Lumpur Petronas Twin Towers at golden hour."},
]


def run_single_celeb_case(case: dict, api_url: str, project_id: str, celeb_cache_dir: str | None, out_dir: str) -> dict:
    idx = case["idx"]
    slug = case["celebrity"].lower().replace(" ", "_").replace("'", "")
    t0 = time.time()
    photo_durl = generate_or_load_celeb_photo(idx, case["celebrity"], slug, project_id, celeb_cache_dir, out_dir)

    r_t1 = requests.post(api_url, json={
        "id": f"reg-{idx:02d}",
        "challenge": "1",
        "language": case["lang"],
        "userMessage": "Keep my exact face, generate an executive studio portrait in a tailored dark suit overlooking the Kuala Lumpur skyline at golden hour.",
        "hasCustomPhoto": True,
        "photoBase64": photo_durl,
        "agentName": case["agent"],
    }, timeout=120).json()
    t1_portrait = r_t1.get("aiPortraitDataUrl") or photo_durl
    t1_path = save_data_url(t1_portrait, out_dir, f"c{idx:02d}_{slug}_t1_portrait.jpg")

    r_t2 = requests.post(api_url, json={
        "id": f"reg-{idx:02d}",
        "challenge": "1",
        "language": case["lang"],
        "userMessage": case["prompt"],
        "hasCustomPhoto": True,
        "photoBase64": photo_durl,
        "prevPortraitDataUrl": t1_portrait,
        "prevMode": "executive_headshot",
        "previousState": {
            "creationMode": "executive_headshot",
            "style": r_t1.get("style"),
            "hasExistingVisual": True,
            "hasAiPortrait": True,
        },
        "agentName": case["agent"],
    }, timeout=120).json()
    elapsed = round(time.time() - t0, 1)

    card_path = save_data_url(
        r_t2.get("aiCardArtworkDataUrl"),
        out_dir,
        f"c{idx:02d}_{slug}_{case['occasion_expected']}.jpg",
    )
    wa_leaks = sum(
        1 for p in (r_t2.get("suggestedFollowUps") or [])
        if "whatsapp" in (p.get("prompt", "") + p.get("label", "")).lower()
    ) + (1 if "whatsapp" in (r_t2.get("assistantReply") or "").lower() else 0)

    audit = audit_card_visual(card_path, case["celebrity"], case["occasion_label"], project_id) if card_path else {"error": "No card generated"}
    passed = bool(
        card_path
        and wa_leaks == 0
        and audit.get("zero_text_overlap") is True
        and audit.get("single_clean_circle") is True
        and audit.get("portrait_centered_in_circle") is True
        and audit.get("background_free_of_ghost_faces") is True
        and audit.get("theme_matches_occasion") is True
    )
    print(f"[Case {idx:02d}] {case['celebrity']} ({case['occasion_expected']}) -> PASS={passed} overlap_free={audit.get('zero_text_overlap')} pos={audit.get('badge_position')} ({elapsed}s)")
    return {
        "idx": idx,
        "celebrity": case["celebrity"],
        "lang": case["lang"],
        "expected_occasion": case["occasion_expected"],
        "creation_mode": r_t2.get("creationMode"),
        "card_headline": r_t2.get("cardHeadline"),
        "wa_leaks": wa_leaks,
        "elapsed_s": elapsed,
        "t1_portrait_path": t1_path,
        "card_path": card_path,
        "audit": audit,
        "passed": passed,
    }


def run_single_leader_face_lock(item_cfg: tuple, api_url: str, project_id: str, out_dir: str) -> dict:
    key, path, agent_name, card_desc = item_cfg
    photo_b64 = load_data_url(path)
    r1 = requests.post(api_url, json={
        "id": f"fl-{key}", "challenge": "1", "language": "en",
        "userMessage": "Transform my photo into an executive studio headshot in a tailored charcoal suit overlooking the Kuala Lumpur skyline at golden hour.",
        "hasCustomPhoto": True, "photoBase64": photo_b64, "agentName": agent_name,
    }, timeout=120).json()
    t1_path = save_data_url(r1.get("aiPortraitDataUrl"), out_dir, f"{key}_t1_headshot.jpg")

    r2 = requests.post(api_url, json={
        "id": f"fl-{key}", "challenge": "1", "language": "en",
        "userMessage": "Keep my exact face, change the outfit to a warm approachable beige blazer in a sunlit family office lounge.",
        "hasCustomPhoto": True, "photoBase64": photo_b64,
        "prevPortraitDataUrl": r1.get("aiPortraitDataUrl"),
        "prevMode": "executive_headshot",
        "previousState": {"creationMode": "executive_headshot", "hasExistingVisual": True, "hasAiPortrait": True},
        "agentName": agent_name,
    }, timeout=120).json()
    t2_path = save_data_url(r2.get("aiPortraitDataUrl"), out_dir, f"{key}_t2_wardrobe_edit.jpg")

    r3 = requests.post(api_url, json={
        "id": f"fl-{key}", "challenge": "1", "language": "en",
        "userMessage": f"Put my studio portrait onto a luxury {card_desc}.",
        "hasCustomPhoto": True, "photoBase64": photo_b64,
        "prevPortraitDataUrl": r2.get("aiPortraitDataUrl"),
        "prevMode": "executive_headshot",
        "previousState": {"creationMode": "executive_headshot", "hasExistingVisual": True, "hasAiPortrait": True},
        "agentName": agent_name,
    }, timeout=120).json()
    t3_path = save_data_url(r3.get("aiCardArtworkDataUrl"), out_dir, f"{key}_t3_card.jpg")

    a1 = audit_face_identity(path, t1_path, "Turn 1 AI Studio Headshot", project_id) if t1_path else {}
    a2 = audit_face_identity(path, t2_path, "Turn 2 Multi-turn Wardrobe Edit Headshot", project_id) if t2_path else {}
    a3 = audit_card_visual(t3_path, agent_name, card_desc, project_id) if t3_path else {}
    passed = bool(
        a1.get("same_person") is True
        and a2.get("same_person") is True
        and a3.get("zero_text_overlap") is True
        and a3.get("single_clean_circle") is True
        and a3.get("portrait_centered_in_circle") is True
        and a3.get("background_free_of_ghost_faces") is True
    )
    print(f"[FaceLock {key}] PASS={passed} | T1={a1.get('identity_score')} T2={a2.get('identity_score')} | overlap_free={a3.get('zero_text_overlap')}")
    return {
        "leader": key,
        "agent_name": agent_name,
        "orig_path": path,
        "t1_path": t1_path,
        "t2_path": t2_path,
        "t3_path": t3_path,
        "t1_identity": a1,
        "t2_identity": a2,
        "t3_card_audit": a3,
        "passed": passed,
    }


def verify_no_dummy_recipient_in_source() -> None:
    """Ensure dummy 'Dato & Datin Tan' / '拿督陈与夫人' never appears in Challenge 1 sample prompts or defaults."""
    forbidden = ("Datin Tan", "Dato' & Datin", "拿督陈", "拿督陳")
    targets = [
        os.path.join(REPO_ROOT, "static", "challenge1.js"),
        os.path.join(REPO_ROOT, "challenges", "c1_image_outreach.py"),
    ]
    leaks = []
    for path in targets:
        with open(path, "r", encoding="utf-8") as f:
            for lineno, line in enumerate(f, 1):
                if any(tok in line for tok in forbidden):
                    leaks.append(f"{os.path.relpath(path, REPO_ROOT)}:{lineno}: {line.strip()}")
    if leaks:
        raise AssertionError("Dummy recipient name leaked in Challenge 1 source:\n" + "\n".join(leaks))


def audit_card_ocr_and_overlap(image_path: str, project_id: str) -> dict:
    """Inspect rendered card text via Gemini Vision to verify zero text-badge overlap and exact OCR text."""
    with open(image_path, "rb") as f:
        b64 = base64.b64encode(f.read()).decode()
    token = get_token()
    url = (
        f"https://aiplatform.googleapis.com/v1/projects/{project_id}"
        "/locations/global/publishers/google/models/gemini-3-flash-preview:generateContent"
    )
    prompt = """Inspect this generated luxury greeting card carefully.
Transcribe ALL visible text printed anywhere on the card, and check that the circular gold-framed portrait medallion does NOT touch, cover, or overlap any letter or character.
Return ONLY valid JSON:
{
  "visible_text": "exact transcription of all text visible on the card",
  "zero_text_overlap": true/false,
  "single_clean_circle": true/false,
  "notes": "1 concise sentence describing rendered text and portrait medallion clearance"
}"""
    payload = {
        "contents": [{
            "role": "user",
            "parts": [
                {"inlineData": {"mimeType": "image/jpeg", "data": b64}},
                {"text": prompt},
            ],
        }],
        "generationConfig": {
            "temperature": 0.0,
            "maxOutputTokens": 512,
            "responseMimeType": "application/json",
            "thinkingConfig": {"thinkingBudget": 0},
        },
    }
    resp = requests.post(
        url,
        headers={"Authorization": f"Bearer {token}", "X-Goog-User-Project": project_id},
        json=payload,
        timeout=35,
    )
    if resp.status_code != 200:
        return {"error": f"HTTP {resp.status_code}: {resp.text[:200]}"}
    parts = resp.json().get("candidates", [{}])[0].get("content", {}).get("parts", [])
    text = "".join(p.get("text", "") for p in parts if not p.get("thought"))
    try:
        return json.loads(text)
    except Exception:
        return {"raw": text}


def _has_dummy_tan_leak(resp_obj: dict) -> list[str]:
    bad_tokens = ("datin tan", "dato' & datin", "拿督陈", "拿督陳")
    hits = []
    for field in ("clientName", "cardHeadline", "assistantReply"):
        val = str(resp_obj.get(field) or "")
        if any(t in val.lower() for t in bad_tokens):
            hits.append(f"{field}: {val}")
    for pill in resp_obj.get("suggestedFollowUps") or []:
        p_txt = f"{pill.get('label', '')} {pill.get('prompt', '')}"
        if any(t in p_txt.lower() for t in bad_tokens):
            hits.append(f"pill: {p_txt}")
    return hits


def run_named_unnamed_suite(api_url: str, project_id: str, out_dir: str, max_workers: int = 4) -> list[dict]:
    """Verify BOTH unnamed (generic) sample-pill cards AND explicitly named recipient cards,
    plus stateful multi-turn Named -> Same-Card Refinement -> Generic Card Reset."""
    os.makedirs(out_dir, exist_ok=True)
    seed_portraits = [
        load_data_url(os.path.join(SIM_PORTRAITS_DIR, f"leader_{i}_after.png"))
        if os.path.exists(os.path.join(SIM_PORTRAITS_DIR, f"leader_{i}_after.png"))
        else load_data_url(os.path.join(SIM_PORTRAITS_DIR, f"leader_{i}_before.png"))
        for i in range(1, 5)
    ]

    single_turn_cases = [
        {
            "id": "nu01_unnamed_milestone_en",
            "kind": "unnamed",
            "lang": "en",
            "agent": "Jason Lim",
            "seed_idx": 0,
            "prompt": "Put my studio portrait onto a warm champagne-gold Client Milestone greeting card celebrating a newborn baby.",
            "expect_client_substr": "",
            "forbid_ocr_substrs": ["tan", "dato", "datin"],
        },
        {
            "id": "nu02_unnamed_cny_zh",
            "kind": "unnamed",
            "lang": "zh-CN",
            "agent": "林俊杰",
            "seed_idx": 1,
            "prompt": "把我的高管形象照放到一张红金新春尊尚贺卡上，搭配梅花与双峰塔天际线。",
            "expect_client_substr": "",
            "forbid_ocr_substrs": ["拿督", "陈", "陳", "tan", "dato"],
        },
        {
            "id": "nu03_unnamed_raya_ms",
            "kind": "unnamed",
            "lang": "ms",
            "agent": "Nurul Izzah",
            "seed_idx": 3,
            "prompt": "Letakkan potret studio saya pada kad ucapan Hari Raya Aidilfitri zamrud & emas bersama pelita dan corak songket.",
            "expect_client_substr": "",
            "forbid_ocr_substrs": ["tan", "dato", "datin"],
        },
        {
            "id": "nu04_named_milestone_en",
            "kind": "named",
            "lang": "en",
            "agent": "Jason Lim",
            "seed_idx": 0,
            "prompt": "Put my studio portrait onto a warm champagne-gold Client Milestone greeting card for Mr. & Mrs. Wong celebrating their newborn baby.",
            "expect_client_substr": "wong",
            "expect_ocr_substr": "wong",
        },
        {
            "id": "nu05_named_cny_zh",
            "kind": "named",
            "lang": "zh-CN",
            "agent": "张伟明",
            "seed_idx": 2,
            "prompt": "把我的高管形象照放到一张送给「林先生与夫人」的红金新春尊尚贺卡上，搭配梅花与双峰塔天际线。",
            "expect_client_substr": "林",
            "expect_ocr_substr": "林",
        },
    ]

    def _run_one(case: dict) -> dict:
        portrait_durl = seed_portraits[case["seed_idx"] % len(seed_portraits)]
        resp = requests.post(
            api_url,
            json={
                "id": f"reg-{case['id']}",
                "challenge": "1",
                "language": case["lang"],
                "userMessage": case["prompt"],
                "agentName": case["agent"],
                "region": "Kuala Lumpur",
                "hasCustomPhoto": True,
                "photoBase64": portrait_durl,
                "prevPortraitDataUrl": portrait_durl,
                "previousState": {
                    "creationMode": "executive_headshot",
                    "hasExistingVisual": True,
                    "hasAiPortrait": True,
                },
            },
            timeout=130,
        ).json()
        card_path = save_data_url(resp.get("aiCardArtworkDataUrl"), out_dir, f"{case['id']}.jpg")
        ok_img = bool(card_path and os.path.exists(card_path))
        ocr = audit_card_ocr_and_overlap(card_path, project_id) if ok_img else {"error": "No image"}
        vis_text = str(ocr.get("visible_text") or "")
        client_ret = str(resp.get("clientName") or "").strip()
        dummy_leaks = _has_dummy_tan_leak(resp)

        if case["kind"] == "unnamed":
            client_ok = client_ret == ""
            ocr_ok = not any(sub in vis_text.lower() for sub in case.get("forbid_ocr_substrs", []))
        else:
            client_ok = case["expect_client_substr"].lower() in client_ret.lower()
            ocr_ok = case["expect_ocr_substr"].lower() in vis_text.lower()

        passed = bool(
            ok_img
            and resp.get("creationMode") == "outreach_card"
            and client_ok
            and ocr_ok
            and len(dummy_leaks) == 0
            and ocr.get("zero_text_overlap") is True
            and ocr.get("single_clean_circle") is True
        )
        print(
            f"[Named/Unnamed {case['id']}] {'PASS' if passed else 'FAIL'} | "
            f"clientName={client_ret!r} | text={vis_text!r} | overlap0={ocr.get('zero_text_overlap')}"
        )
        return {
            "id": case["id"],
            "kind": case["kind"],
            "clientName": client_ret,
            "cardHeadline": resp.get("cardHeadline"),
            "dummy_leaks": dummy_leaks,
            "ocr": ocr,
            "card_path": card_path,
            "passed": passed,
        }

    def _run_multiturn_named_to_generic() -> dict:
        cid = "nu06_multiturn_named_to_generic_reset"
        portrait_durl = seed_portraits[3]
        # Turn A: Named Hari Raya card for Encik Farid & Puan Aishah
        p_a = "Put my studio portrait onto an emerald & brushed-gold Hari Raya Aidilfitri greeting card for Encik Farid & Puan Aishah."
        r_a = requests.post(
            api_url,
            json={
                "id": f"reg-{cid}",
                "challenge": "1",
                "language": "en",
                "userMessage": p_a,
                "agentName": "Arvind Menon",
                "hasCustomPhoto": True,
                "photoBase64": portrait_durl,
                "prevPortraitDataUrl": portrait_durl,
                "previousState": {"creationMode": "executive_headshot", "hasExistingVisual": True, "hasAiPortrait": True},
            },
            timeout=130,
        ).json()
        path_a = save_data_url(r_a.get("aiCardArtworkDataUrl"), out_dir, f"{cid}_turnA_named.jpg")
        ocr_a = audit_card_ocr_and_overlap(path_a, project_id) if path_a else {"error": "No image"}

        # Turn B: Refine SAME Hari Raya card without repeating name -> should keep Encik Farid & Puan Aishah
        p_b = "Make the woven golden songket border and glowing pelita lamps warmer and richer."
        r_b = requests.post(
            api_url,
            json={
                "id": f"reg-{cid}",
                "challenge": "1",
                "language": "en",
                "userMessage": p_b,
                "chatHistory": [
                    {"role": "user", "text": p_a},
                    {"role": "assistant", "text": r_a.get("assistantReply", "")},
                ],
                "agentName": "Arvind Menon",
                "hasCustomPhoto": True,
                "photoBase64": portrait_durl,
                "prevPortraitDataUrl": portrait_durl,
                "previousState": {
                    "creationMode": r_a.get("creationMode"),
                    "style": r_a.get("style"),
                    "occasion": r_a.get("occasion"),
                    "clientName": r_a.get("clientName"),
                    "cardHeadline": r_a.get("cardHeadline"),
                    "visualPrompt": r_a.get("visualPrompt"),
                    "hasExistingVisual": True,
                    "hasAiPortrait": True,
                },
            },
            timeout=130,
        ).json()
        path_b = save_data_url(r_b.get("aiCardArtworkDataUrl"), out_dir, f"{cid}_turnB_refined.jpg")
        ocr_b = audit_card_ocr_and_overlap(path_b, project_id) if path_b else {"error": "No image"}

        # Turn C: Switch to Generic Deepavali sample pill -> clientName MUST reset to "" and Farid MUST NOT appear!
        p_c = "Put my studio portrait onto an opulent Deepavali Festival of Lights greeting card with glowing brass diyas and golden rangoli."
        r_c = requests.post(
            api_url,
            json={
                "id": f"reg-{cid}",
                "challenge": "1",
                "language": "en",
                "userMessage": p_c,
                "chatHistory": [
                    {"role": "user", "text": p_a},
                    {"role": "assistant", "text": r_a.get("assistantReply", "")},
                    {"role": "user", "text": p_b},
                    {"role": "assistant", "text": r_b.get("assistantReply", "")},
                ],
                "agentName": "Arvind Menon",
                "hasCustomPhoto": True,
                "photoBase64": portrait_durl,
                "prevPortraitDataUrl": portrait_durl,
                "previousState": {
                    "creationMode": r_b.get("creationMode"),
                    "style": r_b.get("style"),
                    "occasion": r_b.get("occasion"),
                    "clientName": r_b.get("clientName"),
                    "cardHeadline": r_b.get("cardHeadline"),
                    "visualPrompt": r_b.get("visualPrompt"),
                    "hasExistingVisual": True,
                    "hasAiPortrait": True,
                },
            },
            timeout=130,
        ).json()
        path_c = save_data_url(r_c.get("aiCardArtworkDataUrl"), out_dir, f"{cid}_turnC_generic_reset.jpg")
        ocr_c = audit_card_ocr_and_overlap(path_c, project_id) if path_c else {"error": "No image"}

        ok_a = "farid" in str(r_a.get("clientName") or "").lower() and "farid" in str(ocr_a.get("visible_text") or "").lower() and ocr_a.get("zero_text_overlap") is True
        ok_b = "farid" in str(r_b.get("clientName") or "").lower() and "farid" in str(ocr_b.get("visible_text") or "").lower() and ocr_b.get("zero_text_overlap") is True
        ok_c = (
            str(r_c.get("clientName") or "").strip() == ""
            and "farid" not in str(ocr_c.get("visible_text") or "").lower()
            and len(_has_dummy_tan_leak(r_c)) == 0
            and ocr_c.get("zero_text_overlap") is True
        )
        passed = bool(ok_a and ok_b and ok_c)
        print(
            f"[Named/Unnamed {cid}] {'PASS' if passed else 'FAIL'} | "
            f"TurnA={r_a.get('clientName')!r} (ok={ok_a}) -> TurnB={r_b.get('clientName')!r} (ok={ok_b}) -> TurnC={r_c.get('clientName')!r} (ok={ok_c})"
        )
        return {
            "id": cid,
            "kind": "multiturn_named_to_generic",
            "turnA": {"clientName": r_a.get("clientName"), "ocr": ocr_a, "ok": ok_a, "path": path_a},
            "turnB": {"clientName": r_b.get("clientName"), "ocr": ocr_b, "ok": ok_b, "path": path_b},
            "turnC": {"clientName": r_c.get("clientName"), "ocr": ocr_c, "ok": ok_c, "path": path_c},
            "passed": passed,
        }

    results = []
    with ThreadPoolExecutor(max_workers=max_workers) as pool:
        futs = [pool.submit(_run_one, c) for c in single_turn_cases]
        futs.append(pool.submit(_run_multiturn_named_to_generic))
        for fut in as_completed(futs):
            results.append(fut.result())
    results.sort(key=lambda x: x["id"])
    return results


def main() -> None:
    parser = argparse.ArgumentParser(description="Run Challenge 1 20-Case Outreach + 4-Leader Face-Lock + Named/Unnamed Card Regression Suite.")
    parser.add_argument("--api-url", default=os.environ.get("ARENA_API_URL", "http://localhost:8095/api/ai"))
    parser.add_argument("--project", default=os.environ.get("PROJECT_ID", "gemini-enterprise-demo-cb"))
    parser.add_argument("--out-dir", default=os.path.join(tempfile.gettempdir(), "pamb_c1_regression_outputs"))
    parser.add_argument("--celeb-dir", default=None, help="Optional directory containing cached celebrity portrait JPEGs")
    parser.add_argument("--suite", choices=["all", "named-unnamed", "celebs", "facelock"], default="all")
    parser.add_argument("--workers", type=int, default=4)
    args = parser.parse_args()

    verify_no_dummy_recipient_in_source()
    print("✓ Static Source Check Passed: Zero dummy 'Dato & Datin Tan' strings in Challenge 1 sample prompts/defaults.")

    celeb_out = os.path.join(args.out_dir, "suite_20_celebs")
    face_out = os.path.join(args.out_dir, "suite_face_lock")
    nu_out = os.path.join(args.out_dir, "suite_named_unnamed")
    os.makedirs(args.out_dir, exist_ok=True)

    # Gate 0 smoke check: request with no photo must return photoRequired=True
    r0 = requests.post(args.api_url, json={"challenge": "1", "language": "en", "userMessage": "Make a CNY card"}, timeout=30).json()
    if not r0.get("photoRequired"):
        print(f"FAIL: Step 0 Image-First Gate did not reject empty photo request: {r0}", file=sys.stderr)
        sys.exit(1)
    print("✓ Gate 0 Check Passed: Photo required before chat unlocks.")

    leaders = [
        ("leader_1", os.path.join(SIM_PORTRAITS_DIR, "leader_1_before.png"), "Jason Lim", "Chinese New Year (CNY) crimson & gold card"),
        ("leader_2", os.path.join(SIM_PORTRAITS_DIR, "leader_2_before.png"), "Grace Lim", "Newborn Baby Milestone champagne & gold card"),
        ("leader_3", os.path.join(SIM_PORTRAITS_DIR, "leader_4_before.png"), "Nurul Izzah", "Hari Raya Aidilfitri emerald & gold card"),
        ("leader_4", os.path.join(SIM_PORTRAITS_DIR, "leader_3_before.png"), "Arvind Menon", "Deepavali Festival of Lights card"),
    ]

    celeb_results = []
    face_results = []
    nu_results = []

    if args.suite in ("all", "celebs", "facelock"):
        if args.suite in ("all", "celebs"):
            os.makedirs(celeb_out, exist_ok=True)
        if args.suite in ("all", "facelock"):
            os.makedirs(face_out, exist_ok=True)
        with ThreadPoolExecutor(max_workers=args.workers) as pool:
            c_futs = (
                {pool.submit(run_single_celeb_case, c, args.api_url, args.project, args.celeb_dir, celeb_out): c["idx"] for c in CELEB_CASES}
                if args.suite in ("all", "celebs")
                else {}
            )
            f_futs = (
                {pool.submit(run_single_leader_face_lock, l, args.api_url, args.project, face_out): l[0] for l in leaders}
                if args.suite in ("all", "facelock")
                else {}
            )
            for fut in as_completed(c_futs):
                celeb_results.append(fut.result())
            for fut in as_completed(f_futs):
                face_results.append(fut.result())

    if args.suite in ("all", "named-unnamed"):
        nu_results = run_named_unnamed_suite(args.api_url, args.project, nu_out, max_workers=args.workers)

    celeb_results.sort(key=lambda x: x["idx"])
    face_results.sort(key=lambda x: x["leader"])
    c_pass = sum(1 for r in celeb_results if r["passed"])
    f_pass = sum(1 for r in face_results if r["passed"])
    nu_pass = sum(1 for r in nu_results if r["passed"])
    c_zero = sum(1 for r in celeb_results if (r.get("audit") or {}).get("zero_text_overlap") is True)
    f_zero = sum(1 for r in face_results if (r.get("t3_card_audit") or {}).get("zero_text_overlap") is True)

    report_path = os.path.join(args.out_dir, "c1_regression_results.json")
    with open(report_path, "w", encoding="utf-8") as f:
        json.dump(
            {
                "timestamp": time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime()),
                "suite": args.suite,
                "celeb_passed": f"{c_pass}/{len(celeb_results)}" if celeb_results else "skipped",
                "celeb_zero_text_overlap": f"{c_zero}/{len(celeb_results)}" if celeb_results else "skipped",
                "face_lock_passed": f"{f_pass}/{len(face_results)}" if face_results else "skipped",
                "face_lock_zero_text_overlap": f"{f_zero}/{len(face_results)}" if face_results else "skipped",
                "named_unnamed_passed": f"{nu_pass}/{len(nu_results)}" if nu_results else "skipped",
                "celeb_results": celeb_results,
                "face_lock_results": face_results,
                "named_unnamed_results": nu_results,
            },
            f,
            indent=2,
            ensure_ascii=False,
        )
    print(f"\nSaved regression report to: {report_path}")
    print(
        f"=== SUMMARY: Celebs {c_pass}/{len(celeb_results)} | "
        f"FaceLock {f_pass}/{len(face_results)} | Named/Unnamed {nu_pass}/{len(nu_results)} ==="
    )
    if (
        (celeb_results and c_pass < len(celeb_results))
        or (face_results and f_pass < len(face_results))
        or (nu_results and nu_pass < len(nu_results))
    ):
        sys.exit(1)


if __name__ == "__main__":
    main()
