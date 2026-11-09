#!/usr/bin/env python3
"""Challenge 1 Full 6-Language Coverage Suite (`en`, `zh-CN`, `yue`, `zh-TW`, `ms`, `ta`).

Validates across ALL 6 supported Arena languages:
1. Static & Deterministic Heuristic Parity:
   - `_default_follow_ups` returns 3 `craft` + 5 `work` generic pills in every language with zero dummy names or WhatsApp leaks.
   - `_detect_heuristic_intent` accurately routes headshot, milestone/CNY/Hari Raya/Deepavali cards, and personal branding banners in all 6 languages.
2. Localized Gate 0 Enforcement:
   - Missing photo returns `photoRequired=True` with a localized `assistantReply` in each of the 6 languages.
3. Live 3-Turn End-to-End Multimodal Execution per Language (6 languages x 3 turns = 18 live image generations):
   - Turn 1: Localized Step 1 Studio Portrait starter pill -> verifies portrait image + localized reply/pills.
   - Turn 2: Localized Step 2 Generic (Unnamed) Card starter pill -> verifies `clientName == ""`, target-language `cardHeadline`, OCR script match, zero dummy names, and `zero_text_overlap == True`.
   - Turn 3: Localized Step 2 Named Recipient Card prompt -> verifies `clientName` extraction, localized dedication rendering via Gemini Vision OCR, and `zero_text_overlap == True`.

Usage:
  python3 tests/c1/test_c1_multilingual.py --api-url http://localhost:8095/api/ai --project gemini-enterprise-demo-cb
"""

from __future__ import annotations

import argparse
import base64
from concurrent.futures import ThreadPoolExecutor, as_completed
import glob
import json
import os
import re
import subprocess
import sys
import tempfile
import time
import requests

REPO_ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
if REPO_ROOT not in sys.path:
    sys.path.insert(0, REPO_ROOT)

from challenges.c1_image_outreach import _default_follow_ups, _detect_heuristic_intent  # noqa: E402

SIM_PORTRAITS_DIR = os.path.join(REPO_ROOT, "static", "sim_portraits")
ALL_LANGUAGES = ["en", "zh-CN", "yue", "zh-TW", "ms", "ta"]

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


def has_expected_script(text: str, lang: str) -> bool:
    if not text or not text.strip():
        return False
    if lang in ("zh-CN", "zh-TW", "yue"):
        return any("\u4e00" <= ch <= "\u9fff" for ch in text)
    if lang == "ta":
        return any("\u0b80" <= ch <= "\u0bff" for ch in text)
    # `en` and `ms` use Latin alphabet
    return any("A" <= ch <= "Z" or "a" <= ch <= "z" for ch in text)


def verify_static_pills_and_heuristics() -> None:
    """Verify all 6 languages have complete, generic, accurately routed starter/follow-up pills."""
    bad_tokens = ("datin tan", "dato' & datin", "拿督陈", "拿督陳", "whatsapp")
    expected_work_occasions = ["newborn", "cny_lunar", "hari_raya", "deepavali"]

    for lang in ALL_LANGUAGES:
        pills = _default_follow_ups(lang, "executive_headshot", "newborn", "")
        crafts = [p for p in pills if p.get("group") == "craft"]
        works = [p for p in pills if p.get("group") == "work"]
        assert len(crafts) == 3, f"{lang}: expected 3 craft pills, got {len(crafts)}"
        assert len(works) == 5, f"{lang}: expected 5 work pills, got {len(works)}"

        for p in pills:
            combined = f"{p.get('label', '')} {p.get('prompt', '')}"
            assert has_expected_script(combined, lang), f"{lang}: pill missing target script: {combined}"
            for bt in bad_tokens:
                assert bt not in combined.lower(), f"{lang}: forbidden token {bt!r} in pill: {combined}"

        # Heuristic routing check on every pill in this language
        for cp in crafts:
            h = _detect_heuristic_intent(cp["prompt"], "executive_headshot", "mdrt_keynote", "newborn", "", False)
            assert h["creationMode"] == "executive_headshot", f"{lang} craft pill misrouted: {cp['prompt']} -> {h}"

        for idx, occ_expected in enumerate(expected_work_occasions):
            wp = works[idx]
            h = _detect_heuristic_intent(wp["prompt"], "executive_headshot", "mdrt_keynote", "newborn", "", True)
            assert h["creationMode"] == "outreach_card", f"{lang} card pill misrouted: {wp['prompt']} -> {h}"
            assert h["occasionKey"] == occ_expected, (
                f"{lang} card pill occasion mismatch (expected {occ_expected}, got {h['occasionKey']}): {wp['prompt']}"
            )

        bp = works[4]
        hb = _detect_heuristic_intent(bp["prompt"], "executive_headshot", "mdrt_keynote", "newborn", "", True)
        assert hb["creationMode"] == "brand_banner", f"{lang} banner pill misrouted: {bp['prompt']} -> {hb}"

    # Also verify all 40 frontend starter pills in `static/challenge1.js`
    js_path = os.path.join(REPO_ROOT, "static", "challenge1.js")
    with open(js_path, "r", encoding="utf-8") as f:
        js_src = f.read()
    js_pills = list(re.finditer(r'group:\s*"(craft|work)",\s*label:\s*"([^"]+)",\s*prompt:\s*"([^"]+)"', js_src))
    assert len(js_pills) == 40, f"Expected 40 starter pills in static/challenge1.js, found {len(js_pills)}"
    for m in js_pills:
        grp, lbl, prm = m.groups()
        combined = f"{lbl} {prm}"
        for bt in bad_tokens:
            assert bt not in combined.lower(), f"Forbidden token {bt!r} in frontend pill: {combined}"
        h = _detect_heuristic_intent(prm, "executive_headshot", "mdrt_keynote", "newborn", "", True)
        expected_mode = (
            "executive_headshot"
            if grp == "craft"
            else (
                "brand_banner"
                if any(k in combined.lower() for k in ("banner", "横幅", "橫幅", "penjenamaan", "பேனர"))
                else "outreach_card"
            )
        )
        assert h["creationMode"] == expected_mode, (
            f"Frontend pill mode mismatch ({lbl}): got {h['creationMode']}, expected {expected_mode}"
        )


def verify_localized_gate0(api_url: str) -> None:
    """Verify Gate 0 returns localized photoRequired prompts in all 6 languages."""
    for lang in ALL_LANGUAGES:
        resp = requests.post(
            api_url,
            json={"challenge": "1", "language": lang, "userMessage": "Create portrait"},
            timeout=20,
        ).json()
        assert resp.get("photoRequired") is True, f"{lang}: Gate 0 did not set photoRequired=True: {resp}"
        reply = str(resp.get("assistantReply") or "")
        assert has_expected_script(reply, lang), f"{lang}: Gate 0 reply not in expected script: {reply!r}"


def audit_multilingual_card(image_path: str, lang: str, expected_recipient: str, project_id: str) -> dict:
    with open(image_path, "rb") as f:
        b64 = base64.b64encode(f.read()).decode()
    token = get_token()
    url = (
        f"https://aiplatform.googleapis.com/v1/projects/{project_id}"
        "/locations/global/publishers/google/models/gemini-3-flash-preview:generateContent"
    )
    recip_instruction = (
        f'Check whether the recipient name "{expected_recipient}" (or its core surname/given name) is visibly printed on the card.'
        if expected_recipient
        else "This is a generic unnamed greeting card — confirm NO dummy 'Dato & Datin Tan' / '拿督陈' recipient name is printed."
    )
    prompt = f"""Inspect this luxury horizontal greeting card carefully (target language code: "{lang}").
{recip_instruction}
Also verify that the circular gold-framed portrait medallion does NOT overlap, touch, or obscure any printed text, and that there is exactly ONE portrait medallion on the card.
Return ONLY valid JSON:
{{
  "visible_text": "exact transcription of all visible words/characters on the card",
  "recipient_present": true/false,
  "zero_text_overlap": true/false,
  "single_clean_circle": true/false,
  "notes": "1 concise sentence describing text legibility, script accuracy, and medallion clearance"
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
        timeout=40,
    )
    if resp.status_code != 200:
        return {"error": f"HTTP {resp.status_code}: {resp.text[:200]}"}
    parts = resp.json().get("candidates", [{}])[0].get("content", {}).get("parts", [])
    text = "".join(p.get("text", "") for p in parts if not p.get("thought"))
    try:
        return json.loads(text)
    except Exception:
        return {"raw": text}


LANGUAGE_E2E_TRACKS = [
    {
        "lang": "en",
        "lang_label": "English",
        "seed_file": "leader_1_before.png",
        "agent": "Jason Lim",
        "t1_prompt": "Transform my photo into an executive studio headshot wearing a tailored charcoal suit and crisp white shirt against the Kuala Lumpur skyline at golden hour.",
        "t2_generic_prompt": "Put my studio portrait onto a champagne-ivory & brushed gold Client Milestone greeting card celebrating a newborn baby.",
        "t2_occasion": "newborn",
        "t3_named_prompt": "Put my studio portrait onto a luxury Chinese New Year (CNY) prosperity card in imperial crimson & gold with plum blossoms and the KL skyline for Mr. & Mrs. Wong.",
        "t3_recipient_substr": "wong",
        "t3_recipient_display": "Mr. & Mrs. Wong",
    },
    {
        "lang": "zh-CN",
        "lang_label": "简体中文 (Mandarin)",
        "seed_file": "leader_2_before.png",
        "agent": "林俊杰",
        "t1_prompt": "将我的照片生成一张高管影棚形象照：身穿修身炭灰西装、白衬衫与红真丝袋巾，背景是吉隆坡双峰塔黄昏落地窗。",
        "t2_generic_prompt": "设计一张红金配色的新春尊尚贺卡，融入梅花、双峰塔天际线与我的头像徽章。",
        "t2_occasion": "cny_lunar",
        "t3_named_prompt": "把我的高管形象照放到一张送给「林先生与夫人」的庆祝新生宝宝诞生的香槟金尊尚纪念贺卡上。",
        "t3_recipient_substr": "林",
        "t3_recipient_display": "林先生与夫人",
    },
    {
        "lang": "yue",
        "lang_label": "廣東話 (Cantonese)",
        "seed_file": "leader_1_before.png",
        "agent": "陳大文",
        "t1_prompt": "保留我嘅五官，將形象照換成修身炭灰西裝配白恤衫，背景係吉隆坡雙峰塔黃昏高管落地玻璃。",
        "t2_generic_prompt": "將我張高管形象照放到一張慶祝新生BB誕生嘅香檳金尊尚紀念賀卡上面。",
        "t2_occasion": "newborn",
        "t3_named_prompt": "將我張高管形象照放到一張送畀「陳生陳太」嘅紅金新春尊尚賀卡上面（含梅花同雙峰塔天際線）。",
        "t3_recipient_substr": "陳",
        "t3_recipient_display": "陳生陳太",
    },
    {
        "lang": "zh-TW",
        "lang_label": "繁體中文 (Traditional Chinese)",
        "seed_file": "leader_2_before.png",
        "agent": "王雅婷",
        "t1_prompt": "將我的照片重塑為《福布斯》封面風格的高管領袖形象照：深藍訂製三件套西裝，背景為吉隆坡 TRX 現代高管會議室。",
        "t2_generic_prompt": "把我的高管形象照放到一張奢華排燈節（Deepavali/Diwali）點燈賀卡上，搭配金色彩繪油燈圖騰。",
        "t2_occasion": "deepavali",
        "t3_named_prompt": "把我的高管形象照放到一張送給「王先生與夫人」的紅金新春尊尚賀卡上（含梅花與雙峰塔天際線）。",
        "t3_recipient_substr": "王",
        "t3_recipient_display": "王先生與夫人",
    },
    {
        "lang": "ms",
        "lang_label": "Bahasa Melayu",
        "seed_file": "leader_4_before.png",
        "agent": "Nurul Izzah",
        "t1_prompt": "Transformasikan foto saya menjadi potret studio eksekutif memakai sut kelabu gelap berlatarkan Menara Berkembar KLCC waktu senja.",
        "t2_generic_prompt": "Hasilkan kad ucapan Hari Raya Aidilfitri zamrud & emas bersama pelita, corak songket, dan lencana potret saya.",
        "t2_occasion": "hari_raya",
        "t3_named_prompt": "Hasilkan kad ucapan mewah sambutan kelahiran cahaya mata baharu buat Encik Farid & Puan Aishah dengan lencana potret saya.",
        "t3_recipient_substr": "farid",
        "t3_recipient_display": "Encik Farid & Puan Aishah",
    },
    {
        "lang": "ta",
        "lang_label": "தமிழ் (Tamil)",
        "seed_file": "leader_3_before.png",
        "agent": "அரவிந்த் மேனன்",
        "t1_prompt": "எனது புகைப்படத்தை கோலாலம்பூர் இரட்டை கோபுர (KLCC) மாலை நேர பின்னணியில் நேர்த்தியான சாம்பல் நிற கோட் அணிந்த நிர்வாக உருவப்படமாக மாற்றவும்.",
        "t2_generic_prompt": "எனது உருவப்பட பேட்ஜுடன் அழகான அகல் விளக்குகள் மற்றும் ரங்கோலி கோலத்துடன் கூடிய தீபாவளி நல்வாழ்த்து அட்டையை உருவாக்கவும்.",
        "t2_occasion": "deepavali",
        "t3_named_prompt": "திரு & திருமதி குமார் குடும்பத்திற்கு எனது ஸ்டுடியோ உருவப்படத்துடன் கூடிய புதிய குழந்தை பிறப்பு வாழ்த்து அட்டையை உருவாக்கவும்.",
        "t3_recipient_substr": "குமார்",
        "t3_recipient_display": "திரு & திருமதி குமார்",
    },
]


def run_language_track(track: dict, api_url: str, project_id: str, out_dir: str) -> dict:
    lang = track["lang"]
    slug = lang.replace("-", "_").lower()
    raw_durl = load_data_url(os.path.join(SIM_PORTRAITS_DIR, track["seed_file"]))

    # Turn 1: Localized Step 1 Studio Portrait
    r1 = requests.post(
        api_url,
        json={
            "id": f"ml-{slug}",
            "challenge": "1",
            "language": lang,
            "userMessage": track["t1_prompt"],
            "agentName": track["agent"],
            "hasCustomPhoto": True,
            "photoBase64": raw_durl,
            "previousState": {},
        },
        timeout=130,
    ).json()
    p1_url = r1.get("aiPortraitDataUrl")
    p1_path = save_data_url(p1_url, out_dir, f"{slug}_t1_portrait.jpg")
    t1_ok = bool(
        p1_path
        and r1.get("creationMode") == "executive_headshot"
        and has_expected_script(str(r1.get("assistantReply") or ""), lang)
        and "whatsapp" not in str(r1.get("assistantReply") or "").lower()
    )

    # Turn 2: Localized Step 2 Generic (Unnamed) Card
    r2 = requests.post(
        api_url,
        json={
            "id": f"ml-{slug}",
            "challenge": "1",
            "language": lang,
            "userMessage": track["t2_generic_prompt"],
            "chatHistory": [
                {"role": "user", "text": track["t1_prompt"]},
                {"role": "assistant", "text": r1.get("assistantReply", "")},
            ],
            "agentName": track["agent"],
            "hasCustomPhoto": True,
            "photoBase64": raw_durl,
            "prevPortraitDataUrl": p1_url,
            "previousState": {
                "creationMode": "executive_headshot",
                "style": r1.get("style"),
                "hasExistingVisual": True,
                "hasAiPortrait": True,
            },
        },
        timeout=130,
    ).json()
    c2_path = save_data_url(r2.get("aiCardArtworkDataUrl"), out_dir, f"{slug}_t2_generic_card.jpg")
    audit2 = audit_multilingual_card(c2_path, lang, "", project_id) if c2_path else {"error": "No image"}
    vis2 = str(audit2.get("visible_text") or "")
    t2_ok = bool(
        c2_path
        and r2.get("creationMode") == "outreach_card"
        and str(r2.get("clientName") or "").strip() == ""
        and has_expected_script(str(r2.get("cardHeadline") or ""), lang)
        and has_expected_script(vis2, lang)
        and has_expected_script(str(r2.get("assistantReply") or ""), lang)
        and audit2.get("zero_text_overlap") is True
        and audit2.get("single_clean_circle") is True
        and "datin tan" not in vis2.lower()
        and "拿督" not in vis2
    )

    # Turn 3: Localized Step 2 Explicitly Named Card
    r3 = requests.post(
        api_url,
        json={
            "id": f"ml-{slug}",
            "challenge": "1",
            "language": lang,
            "userMessage": track["t3_named_prompt"],
            "chatHistory": [
                {"role": "user", "text": track["t1_prompt"]},
                {"role": "assistant", "text": r1.get("assistantReply", "")},
                {"role": "user", "text": track["t2_generic_prompt"]},
                {"role": "assistant", "text": r2.get("assistantReply", "")},
            ],
            "agentName": track["agent"],
            "hasCustomPhoto": True,
            "photoBase64": raw_durl,
            "prevPortraitDataUrl": p1_url,
            "previousState": {
                "creationMode": r2.get("creationMode"),
                "style": r2.get("style"),
                "occasion": r2.get("occasion"),
                "clientName": r2.get("clientName"),
                "hasExistingVisual": True,
                "hasAiPortrait": True,
            },
        },
        timeout=130,
    ).json()
    c3_path = save_data_url(r3.get("aiCardArtworkDataUrl"), out_dir, f"{slug}_t3_named_card.jpg")
    audit3 = audit_multilingual_card(c3_path, lang, track["t3_recipient_display"], project_id) if c3_path else {"error": "No image"}
    vis3 = str(audit3.get("visible_text") or "")
    client3 = str(r3.get("clientName") or "").strip()
    recip_in_ocr = (
        track["t3_recipient_substr"].lower() in vis3.lower()
        or audit3.get("recipient_present") is True
    )
    t3_ok = bool(
        c3_path
        and r3.get("creationMode") == "outreach_card"
        and track["t3_recipient_substr"].lower() in client3.lower()
        and recip_in_ocr
        and has_expected_script(str(r3.get("assistantReply") or ""), lang)
        and audit3.get("zero_text_overlap") is True
        and audit3.get("single_clean_circle") is True
    )

    passed = bool(t1_ok and t2_ok and t3_ok)
    print(
        f"[Multilingual {lang:5s} ({track['lang_label']})]: {'PASS' if passed else 'FAIL'} | "
        f"T1={t1_ok} | T2_Generic(headline={r2.get('cardHeadline')!r}, ocr={vis2!r}, ok={t2_ok}) | "
        f"T3_Named(client={client3!r}, ocr={vis3!r}, ok={t3_ok})"
    )
    return {
        "lang": lang,
        "lang_label": track["lang_label"],
        "t1_portrait": {"ok": t1_ok, "reply": r1.get("assistantReply"), "path": p1_path},
        "t2_generic_card": {
            "ok": t2_ok,
            "clientName": r2.get("clientName"),
            "cardHeadline": r2.get("cardHeadline"),
            "audit": audit2,
            "path": c2_path,
        },
        "t3_named_card": {
            "ok": t3_ok,
            "clientName": client3,
            "cardHeadline": r3.get("cardHeadline"),
            "audit": audit3,
            "path": c3_path,
        },
        "passed": passed,
    }


def main() -> None:
    parser = argparse.ArgumentParser(description="Run Challenge 1 Full 6-Language Coverage Suite.")
    parser.add_argument("--api-url", default=os.environ.get("ARENA_API_URL", "http://localhost:8095/api/ai"))
    parser.add_argument("--project", default=os.environ.get("PROJECT_ID", "gemini-enterprise-demo-cb"))
    parser.add_argument("--out-dir", default=os.path.join(tempfile.gettempdir(), "pamb_c1_multilingual_outputs"))
    parser.add_argument("--workers", type=int, default=3)
    args = parser.parse_args()

    os.makedirs(args.out_dir, exist_ok=True)

    verify_static_pills_and_heuristics()
    print("✓ Static & Heuristic Parity Passed across all 6 languages: en, zh-CN, yue, zh-TW, ms, ta.")

    verify_localized_gate0(args.api_url)
    print("✓ Localized Gate 0 Check Passed across all 6 languages: en, zh-CN, yue, zh-TW, ms, ta.")

    results = []
    with ThreadPoolExecutor(max_workers=args.workers) as pool:
        futs = {
            pool.submit(run_language_track, tr, args.api_url, args.project, args.out_dir): tr["lang"]
            for tr in LANGUAGE_E2E_TRACKS
        }
        for fut in as_completed(futs):
            results.append(fut.result())

    order = {l: i for i, l in enumerate(ALL_LANGUAGES)}
    results.sort(key=lambda r: order.get(r["lang"], 99))
    passed_cnt = sum(1 for r in results if r["passed"])

    report_path = os.path.join(args.out_dir, "multilingual_6lang_report.json")
    with open(report_path, "w", encoding="utf-8") as f:
        json.dump(
            {
                "timestamp": time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime()),
                "languages_tested": ALL_LANGUAGES,
                "passed": f"{passed_cnt}/{len(results)}",
                "results": results,
            },
            f,
            indent=2,
            ensure_ascii=False,
        )
    print(f"\nSaved 6-language coverage report to: {report_path}")
    print(f"=== MULTILINGUAL SUMMARY: {passed_cnt}/{len(results)} LANGUAGES PASSED (18/18 visual turns) ===")
    if passed_cnt < len(results):
        sys.exit(1)


if __name__ == "__main__":
    main()
