#!/usr/bin/env python3
"""Challenge 1 No-Stacking, 3rd-Task Refusal & Multi-Turn Anti-Pollution Suite.

Validates:
1. Frontend `static/challenge1.js` replaces `inputText` on pill tap (no `\n` stacking, exact `===` active pill highlight).
2. Stacked multi-mode prompts and out-of-scope '3rd-step' non-image requests (WhatsApp copy, emails, decks, videos) are cleanly refused (`status == "refused_out_of_scope"`).
3. Multi-turn iteration & going back to redo Step 1 / Step 2 never leaks prior outfits, festive motifs, headlines, mottos, or recipient names across turns, while same-artifact incremental tweaks continue to work seamlessly.

Usage:
  python3 tests/c1/test_c1_multiturn_isolation.py --api-url http://localhost:8096/api/ai --project gemini-enterprise-demo-cb
"""

from __future__ import annotations

import argparse
import base64
import json
import os
import subprocess
import sys
import tempfile
import time
import requests

REPO_ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
SIM_DIR = os.path.join(REPO_ROOT, "static", "sim_portraits")


def get_token() -> str:
    return subprocess.check_output(["gcloud", "auth", "print-access-token", "--quiet"], text=True, timeout=15).strip()


def load_data_url(path: str) -> str:
    mime = "image/png" if path.endswith(".png") else "image/jpeg"
    with open(path, "rb") as f:
        return f"data:{mime};base64," + base64.b64encode(f.read()).decode("ascii")


def save_data_url(data_url: str | None, out_dir: str, filename: str) -> str | None:
    if not data_url or "," not in data_url:
        return None
    _, b64 = data_url.split(",", 1)
    out_path = os.path.join(out_dir, filename)
    with open(out_path, "wb") as f:
        f.write(base64.b64decode(b64))
    return out_path


def verify_frontend_no_stacking() -> None:
    js_path = os.path.join(REPO_ROOT, "static", "challenge1.js")
    with open(js_path, "r", encoding="utf-8") as f:
        js = f.read()

    assert "handleCombinePillPrompt" not in js, "Legacy handleCombinePillPrompt still present in challenge1.js!"
    assert "handleReplacePillPrompt" in js, "Missing handleReplacePillPrompt in challenge1.js!"
    assert "${cur}\\n${clean}" not in js, "Newline prompt stacking logic still present in challenge1.js!"
    assert '.includes(fup.prompt)' not in js, "Substring .includes(fup.prompt) multi-active check still present!"
    assert "load or combine" not in js.lower(), "Legacy 'load or combine' hint still present in challenge1.js!"


def audit_card_ocr(image_path: str, project_id: str) -> dict:
    with open(image_path, "rb") as f:
        b64 = base64.b64encode(f.read()).decode("ascii")
    token = get_token()
    url = (
        f"https://aiplatform.googleapis.com/v1/projects/{project_id}"
        "/locations/global/publishers/google/models/gemini-3-flash-preview:generateContent"
    )
    prompt = """Inspect this greeting card and return STRICT JSON:
{
  "visible_text": "exact transcription of all visible words on the card",
  "zero_text_overlap": true/false,
  "single_clean_circle": true/false
}"""
    resp = requests.post(
        url,
        headers={"Authorization": f"Bearer {token}", "X-Goog-User-Project": project_id},
        json={
            "contents": [{"role": "user", "parts": [{"inlineData": {"mimeType": "image/jpeg", "data": b64}}, {"text": prompt}]}],
            "generationConfig": {"temperature": 0.0, "responseMimeType": "application/json", "maxOutputTokens": 512, "thinkingConfig": {"thinkingBudget": 0}},
        },
        timeout=35,
    )
    parts = resp.json().get("candidates", [{}])[0].get("content", {}).get("parts", [])
    txt = "".join(p.get("text", "") for p in parts if not p.get("thought")).strip()
    return json.loads(txt)


def main() -> None:
    parser = argparse.ArgumentParser(description="Verify no-stacking, 3rd-task refusal & multi-turn isolation.")
    parser.add_argument("--api-url", default="http://localhost:8096/api/ai")
    parser.add_argument("--project", default=os.environ.get("PROJECT_ID", "gemini-enterprise-demo-cb"))
    parser.add_argument("--out-dir", default=os.path.join(tempfile.gettempdir(), "pamb_c1_isolation_outputs"))
    args = parser.parse_args()

    os.makedirs(args.out_dir, exist_ok=True)
    verify_frontend_no_stacking()
    print("✓ Frontend Static Check Passed: Pill click replaces prompt (zero stacking).")

    raw_photo = load_data_url(os.path.join(SIM_DIR, "leader_1_before.png"))
    step1_portrait_seed = load_data_url(os.path.join(SIM_DIR, "leader_1_after.png"))

    # 1. Test Refusal Gate on Stacked Prompts & Out-of-Scope '3rd Step' Tasks
    refusal_cases = [
        (
            "ref01_newline_stacked_pills",
            "stacked_prompts",
            "Keep my exact face, switch the outfit to a tailored charcoal suit.\nPut my studio portrait onto a luxury Chinese New Year (CNY) prosperity card.",
        ),
        (
            "ref02_dual_mode_card_and_banner",
            "stacked_prompts",
            "Put my studio portrait onto a luxury Chinese New Year greeting card AND also make an Executive Personal Branding banner.",
        ),
        (
            "ref03_third_task_whatsapp_copy",
            "out_of_scope_third_task",
            "Now write a warm WhatsApp message to send to my client with this card.",
        ),
        (
            "ref04_third_task_slide_deck_and_email",
            "out_of_scope_third_task",
            "Create a 3-slide presentation deck and draft an email comparing with AIA.",
        ),
    ]

    for cid, expected_reason, prompt in refusal_cases:
        r = requests.post(
            args.api_url,
            json={
                "id": f"iso-{cid}",
                "challenge": "1",
                "language": "en",
                "userMessage": prompt,
                "agentName": "Jason Lim",
                "hasCustomPhoto": True,
                "photoBase64": raw_photo,
                "prevPortraitDataUrl": step1_portrait_seed,
                "previousState": {"creationMode": "outreach_card", "hasExistingVisual": True, "hasAiPortrait": True},
            },
            timeout=30,
        ).json()
        assert r.get("status") == "refused_out_of_scope", f"{cid} was NOT refused: {r}"
        assert r.get("refusedReason") == expected_reason, f"{cid} wrong reason: {r.get('refusedReason')} != {expected_reason}"
        print(f"✓ [{cid}] Refused cleanly ({r.get('refusedReason')}): {r.get('assistantReply')[:85]}...")

    # 2. Test 6-Turn Live Iteration & 'Go Back & Redo Anything' Anti-Pollution Gauntlet
    # Turn 1: Step 1 Portrait (Charcoal Suit)
    p1 = "Transform my photo into an executive studio headshot wearing a tailored charcoal suit and crisp white shirt against the Kuala Lumpur skyline at golden hour."
    t1 = requests.post(
        args.api_url,
        json={"id": "iso-gauntlet", "challenge": "1", "language": "en", "userMessage": p1, "agentName": "Jason Lim", "hasCustomPhoto": True, "photoBase64": raw_photo, "previousState": {}},
        timeout=135,
    ).json()
    port1 = t1.get("aiPortraitDataUrl")
    save_data_url(port1, args.out_dir, "t1_suit_portrait.jpg")
    assert t1.get("creationMode") == "executive_headshot" and port1 and t1.get("cardHeadline") == ""
    print("✓ [Turn 1] Generated Step 1 Charcoal Suit Portrait.")

    # Turn 2: Step 2 Named CNY Card for Mr. & Mrs. Wong with custom headline
    p2 = "Put my studio portrait onto a luxury Chinese New Year (CNY) prosperity card for Mr. & Mrs. Wong with custom headline 'Crimson Prosperity 2027'."
    t2 = requests.post(
        args.api_url,
        json={
            "id": "iso-gauntlet", "challenge": "1", "language": "en", "userMessage": p2, "agentName": "Jason Lim",
            "hasCustomPhoto": True, "photoBase64": raw_photo, "prevPortraitDataUrl": port1,
            "chatHistory": [{"role": "user", "text": p1}, {"role": "assistant", "text": t1.get("assistantReply", "")}],
            "previousState": {"creationMode": "executive_headshot", "style": t1.get("style"), "visualPrompt": t1.get("visualPrompt"), "hasExistingVisual": True, "hasAiPortrait": True},
        },
        timeout=135,
    ).json()
    save_data_url(t2.get("aiCardArtworkDataUrl"), args.out_dir, "t2_cny_wong_card.jpg")
    assert t2.get("creationMode") == "outreach_card" and "wong" in str(t2.get("clientName") or "").lower()
    print(f"✓ [Turn 2] Generated Named CNY Card (client={t2.get('clientName')!r}, headline={t2.get('cardHeadline')!r}).")

    # Turn 3: Go Back & Redo Step 1 Portrait (Warm Beige Blazer in sunlit lounge) — must NOT leak CNY/crimson/Wong!
    p3 = "Keep my exact face, create a warm, approachable portrait in a smart-casual beige blazer in a sunlit private wealth client lounge."
    t3 = requests.post(
        args.api_url,
        json={
            "id": "iso-gauntlet", "challenge": "1", "language": "en", "userMessage": p3, "agentName": "Jason Lim",
            "hasCustomPhoto": True, "photoBase64": raw_photo, "prevPortraitDataUrl": port1,
            "chatHistory": [{"role": "user", "text": p2}, {"role": "assistant", "text": t2.get("assistantReply", "")}],
            "previousState": {
                "creationMode": t2.get("creationMode"), "style": t2.get("style"), "occasion": t2.get("occasion"),
                "clientName": t2.get("clientName"), "cardHeadline": t2.get("cardHeadline"),
                "visualPrompt": t2.get("visualPrompt"), "hasExistingVisual": True, "hasAiPortrait": True,
            },
        },
        timeout=135,
    ).json()
    port3 = t3.get("aiPortraitDataUrl")
    save_data_url(port3, args.out_dir, "t3_redone_beige_portrait.jpg")
    vp3 = str(t3.get("visualPrompt") or "").lower()
    assert t3.get("creationMode") == "executive_headshot" and port3
    assert t3.get("clientName") == "" and t3.get("cardHeadline") == "" and t3.get("aiCardArtworkDataUrl") is None
    assert not any(leak in vp3 for leak in ("lantern", "plum blossom", "wong", "crimson prosperity")), f"Turn 3 portrait visualPrompt polluted by Turn 2 CNY card: {vp3}"
    print(f"✓ [Turn 3] Redone Step 1 Beige Blazer Portrait cleanly isolated (visualPrompt={t3.get('visualPrompt')!r}).")

    # Turn 4: Step 2 Personal Branding Banner with custom motto 'Trusted Legacy Partner' using new port3
    p4 = "Put my studio portrait onto a sleek Executive Personal Branding banner overlooking the Kuala Lumpur Petronas Twin Towers at golden hour with tagline 'Trusted Legacy Partner'."
    t4 = requests.post(
        args.api_url,
        json={
            "id": "iso-gauntlet", "challenge": "1", "language": "en", "userMessage": p4, "agentName": "Jason Lim",
            "hasCustomPhoto": True, "photoBase64": raw_photo, "prevPortraitDataUrl": port3,
            "chatHistory": [{"role": "user", "text": p3}, {"role": "assistant", "text": t3.get("assistantReply", "")}],
            "previousState": {
                "creationMode": "executive_headshot", "style": t3.get("style"), "visualPrompt": t3.get("visualPrompt"),
                "hasExistingVisual": True, "hasAiPortrait": True,
            },
        },
        timeout=135,
    ).json()
    save_data_url(t4.get("aiCardArtworkDataUrl"), args.out_dir, "t4_banner.jpg")
    assert t4.get("creationMode") == "brand_banner" and t4.get("clientName") == "" and t4.get("cardHeadline") == ""
    print(f"✓ [Turn 4] Generated Brand Banner (motto={t4.get('motto')!r}, cardHeadline={t4.get('cardHeadline')!r}).")

    # Turn 5: Redo Step 2 as Generic Hari Raya Card — must NOT leak 'Trusted Legacy Partner', 'Wong', or 'Crimson Prosperity'!
    p5 = "Put my studio portrait onto an emerald & brushed-gold Hari Raya Aidilfitri greeting card with woven songket patterns and warm pelita lamps."
    t5 = requests.post(
        args.api_url,
        json={
            "id": "iso-gauntlet", "challenge": "1", "language": "en", "userMessage": p5, "agentName": "Jason Lim",
            "hasCustomPhoto": True, "photoBase64": raw_photo, "prevPortraitDataUrl": port3,
            "chatHistory": [{"role": "user", "text": p4}, {"role": "assistant", "text": t4.get("assistantReply", "")}],
            "previousState": {
                "creationMode": "brand_banner", "style": t4.get("style"), "occasion": t4.get("occasion"),
                "motto": t4.get("motto"), "visualPrompt": t4.get("visualPrompt"),
                "hasExistingVisual": True, "hasAiPortrait": True,
            },
        },
        timeout=135,
    ).json()
    c5_path = save_data_url(t5.get("aiCardArtworkDataUrl"), args.out_dir, "t5_generic_raya_card.jpg")
    aud5 = audit_card_ocr(c5_path, args.project)
    ocr5 = str(aud5.get("visible_text") or "")
    assert t5.get("creationMode") == "outreach_card" and t5.get("occasion") == "hari_raya"
    assert t5.get("clientName") == "" and t5.get("motto") == ""
    assert not any(leak in ocr5.lower() for leak in ("wong", "crimson", "trusted legacy")), f"Turn 5 Hari Raya OCR polluted: {ocr5!r}"
    assert aud5.get("zero_text_overlap") is True and aud5.get("single_clean_circle") is True
    print(f"✓ [Turn 5] Generic Hari Raya Card 100% unpolluted (ocr={ocr5!r}, overlap0=True).")

    # Turn 6: Incremental refinement on SAME Hari Raya Card -> must preserve Hari Raya card context & apply update!
    p6 = "Make the golden songket border richer and update the card headline to 'Salam Aidilfitri 2027'."
    t6 = requests.post(
        args.api_url,
        json={
            "id": "iso-gauntlet", "challenge": "1", "language": "en", "userMessage": p6, "agentName": "Jason Lim",
            "hasCustomPhoto": True, "photoBase64": raw_photo, "prevPortraitDataUrl": port3,
            "chatHistory": [{"role": "user", "text": p5}, {"role": "assistant", "text": t5.get("assistantReply", "")}],
            "previousState": {
                "creationMode": "outreach_card", "style": t5.get("style"), "occasion": "hari_raya",
                "cardHeadline": t5.get("cardHeadline"), "visualPrompt": t5.get("visualPrompt"),
                "hasExistingVisual": True, "hasAiPortrait": True,
            },
        },
        timeout=135,
    ).json()
    c6_path = save_data_url(t6.get("aiCardArtworkDataUrl"), args.out_dir, "t6_refined_raya_card.jpg")
    aud6 = audit_card_ocr(c6_path, args.project)
    ocr6 = str(aud6.get("visible_text") or "")
    assert t6.get("creationMode") == "outreach_card" and "2027" in ocr6 and aud6.get("zero_text_overlap") is True
    print(f"✓ [Turn 6] Incremental Same-Card Refinement Passed (ocr={ocr6!r}, overlap0=True).")

    print("\n=== ALL NO-STACKING, REFUSAL & 6-TURN ISOLATION CHECKS PASSED (100%) ===")


if __name__ == "__main__":
    main()
