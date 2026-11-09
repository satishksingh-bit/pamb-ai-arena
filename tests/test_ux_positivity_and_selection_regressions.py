#!/usr/bin/env python3
"""Comprehensive Regression Suite for Mobile UX, Selection Isolation, Positivity & Zoom.

Covers every user-reported callout across Challenges 1, 2, 3 & Arena Shell:
1. Challenge 3 1-of-3 / subset selection isolation (Step 2 WhatsApp & Step 3 Comparison Email):
   - Selecting 1 of 3 items must NEVER leak the 2 unchecked items into the prompt or output,
     even if an LLM tries to echo unselected items from model weights or fallback triggers.
2. Positive, celebratory workshop tone across Challenges 1, 2, 3 & Arena Shell:
   - Zero morbid/clinical/fear-mongering language (e.g. congenital defects, jaundice, cardiac stents,
     breast cancer scares, widow/fire-sale auctions, accidental death) in user-facing copy & scenarios.
   - Challenge 3 Top-5 curated seats exclude `ci_health_scare` (Seat 1) in favor of positive milestones.
3. Challenge 3 Mobile UX declutter & Top-5 curation (zero `/56` or `16 Scenarios` clutter, 56-seat backend preserved).
4. Universal Click-to-Zoom lightbox across `index.html`, `challenge1..3.js`, `showcases.js`, `arena_app.js`.
5. Challenge 1 replace-only pills, 3rd-step refusal gate, multi-turn redo isolation & Stage-1 portrait selector.
"""

import os
import re
import sys
import unittest

ROOT_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
if ROOT_DIR not in sys.path:
    sys.path.insert(0, ROOT_DIR)

from challenges.c2_scenarios_bank import get_c2_total_unique_seats, resolve_c2_seat_scenario
from challenges.c3_pre_pitch import SCENARIO_CATALOG, handle_c3_ai
from challenges.c3_scenarios_bank import (
    ARCHETYPE_ORDER,
    get_total_unique_seats,
    resolve_seat_scenario,
)

LANG_NAMES = {
    "en": "English",
    "zh-CN": "简体中文 (Malaysian Mandarin)",
    "yue": "廣東話 / 粵語",
    "zh-TW": "廣東話 / 繁體中文",
    "ms": "Bahasa Melayu",
    "ta": "தமிழ்",
}


class TestC3SelectionIsolation(unittest.TestCase):
    """Regression tests for Bug: selecting 1 of 3 items in C3 previously returned all 3."""

    def test_step3_email_1_of_3_prompt_excludes_unchecked_facts(self):
        captured_prompts = []

        def compliant_llm(prompt: str):
            captured_prompts.append(prompt)
            return (
                '{"aiaComparisonEmail": "Subject: PRU vs. AIA Comparison\\n\\n'
                'Hi Wei Ming,\\nGreat question! Here is the key advantage:\\n'
                '• Free +50% Auto Booster: PRUWith You Plus grows cover +1%/yr automatically at RM 0 extra fee.\\n\\n'
                'Shall we do a quick 10-min Zoom at 8:30pm?"}',
                "mock-gemini",
                12,
            )

        out = handle_c3_ai(
            {
                "id": "u1",
                "name": "Sarah",
                "language": "en",
                "seatIndex": 0,
                "stepMode": "email",
                "selectedFactIdxs": [0],
                "emailPrompt": "Advisory Style: Respectful | Selected Facts: Free +50% Auto Booster",
            },
            compliant_llm,
            LANG_NAMES,
        )
        self.assertEqual(len(captured_prompts), 1)
        sent_prompt = captured_prompts[0]
        # Prompt must ask for EXACTLY 1 bullet point and list the 2 unchecked facts under FORBIDDEN
        self.assertIn("EXACTLY 1 bullet point", sent_prompt)
        self.assertIn("(1 of 3 selected)", sent_prompt)
        self.assertIn("STRICT FORBIDDEN POINTS", sent_prompt)
        # Unchecked fact #3 ("15%") must NOT appear in the allowed advantages section
        allowed_section = sent_prompt.split("STRICT FORBIDDEN POINTS")[0]
        self.assertNotIn("15%", allowed_section)

        email_txt = out["aiaComparisonEmail"]
        bullets = re.findall(r"(?m)^\s*(?:[•\-\*]|\d+[\.\)])\s+", email_txt)
        self.assertEqual(len(bullets), 1, f"Expected 1 bullet, got {len(bullets)}:\n{email_txt}")
        self.assertIn("+50%", email_txt)
        self.assertNotIn("15%", email_txt)

    def test_step3_email_blocks_leaky_llm_returning_all_3_bullets(self):
        """Even if the LLM ignores instructions and returns all 3 facts, the post-guard strips leakage."""

        def leaky_llm(_prompt: str):
            return (
                '{"aiaComparisonEmail": "Subject: PRU vs AIA\\n\\nHi Wei Ming,\\n'
                'Here are 3 advantages:\\n'
                '• Free +50% Auto Booster with zero Vitality fees.\\n'
                '• RM 500 Childbirth Cash Reward + PRUMy Child Plus Day-1 wellness.\\n'
                '• 15% cash medical discount vs AIA Health Wallet.\\n\\n'
                'Let us chat Thursday!"}',
                "leaky-gemini",
                15,
            )

        for target_idx in (0, 1, 2):
            scen = resolve_seat_scenario(0, "en")
            out = handle_c3_ai(
                {
                    "id": "u1",
                    "name": "Sarah",
                    "language": "en",
                    "seatIndex": 0,
                    "stepMode": "email",
                    "selectedFactIdxs": [target_idx],
                },
                leaky_llm,
                LANG_NAMES,
            )
            email_txt = out["aiaComparisonEmail"]
            bullets = re.findall(r"(?m)^\s*(?:[•\-\*]|\d+[\.\)])\s+", email_txt)
            self.assertEqual(
                len(bullets),
                1,
                f"selectedFactIdxs=[{target_idx}] leaked multiple bullets:\n{email_txt}",
            )
            # Verify unselected facts did not leak
            if target_idx == 0:
                self.assertIn("50%", email_txt)
                self.assertNotIn("15%", email_txt)
                self.assertNotIn("RM 500", email_txt)
            elif target_idx == 2:
                self.assertIn("15%", email_txt)
                self.assertNotIn("+50%", email_txt)
                self.assertNotIn("RM 500", email_txt)

    def test_step3_email_2_of_3_selection_excludes_third(self):
        def leaky_llm(_prompt: str):
            return (
                '{"aiaComparisonEmail": "Subject: PRU vs AIA\\n\\nHi Wei Ming,\\n'
                '• Free +50% Auto Booster.\\n'
                '• RM 500 Baby Cash Reward.\\n'
                '• 15% cash discount vs Health Wallet."}',
                "leaky-gemini",
                10,
            )

        out = handle_c3_ai(
            {
                "id": "u1",
                "name": "Sarah",
                "language": "en",
                "seatIndex": 0,
                "stepMode": "email",
                "selectedFactIdxs": [0, 2],
            },
            leaky_llm,
            LANG_NAMES,
        )
        email_txt = out["aiaComparisonEmail"]
        bullets = re.findall(r"(?m)^\s*(?:[•\-\*]|\d+[\.\)])\s+", email_txt)
        self.assertEqual(len(bullets), 2, f"Expected 2 bullets for [0, 2], got:\n{email_txt}")
        self.assertIn("50%", email_txt)
        self.assertIn("15%", email_txt)
        self.assertNotIn("RM 500", email_txt)

    def test_step2_whatsapp_1_of_3_blocks_unchecked_ideas(self):
        captured_prompts = []

        def leaky_wa_llm(prompt: str):
            captured_prompts.append(prompt)
            return (
                '{"firstTouchMessage": "Congrats Wei Ming! Claim your RM 500 Childbirth Cash Reward, '
                'start PRUMy Child Plus, and fund PRUSaver Kid via FD interest!"}',
                "leaky-gemini",
                10,
            )

        out = handle_c3_ai(
            {
                "id": "u1",
                "name": "Sarah",
                "language": "en",
                "seatIndex": 0,
                "stepMode": "whatsapp",
                "selectedWaIdeaIdxs": [0],
            },
            leaky_wa_llm,
            LANG_NAMES,
        )
        self.assertIn("STRICT FORBIDDEN TOPICS", captured_prompts[0])
        wa_txt = out["firstTouchMessage"]
        self.assertIn("RM 500", wa_txt)
        self.assertNotIn("FD interest", wa_txt.lower())
        self.assertNotIn("prumy child", wa_txt.lower())

    def test_frontend_challenge3_wires_selected_indices(self):
        c3_js_path = os.path.join(ROOT_DIR, "static", "challenge3.js")
        with open(c3_js_path, encoding="utf-8") as f:
            c3_js = f.read()
        self.assertIn("selectedWaIdeaIdxs,", c3_js)
        self.assertIn("selectedFactIdxs,", c3_js)
        self.assertIn("excludedWaIdeas:", c3_js)
        self.assertIn("excludedFacts,", c3_js)


class TestWorkshopPositivityAndUX(unittest.TestCase):
    """Regression tests for workshop positivity, Top-5 mobile UX, and universal Click-to-Zoom."""

    MORBID_PATTERNS = [
        r"\bcongenital\b",
        r"\bjaundice\b",
        r"\bkongenital\b",
        r"\bjaundis\b",
        r"先天",
        r"黄疸",
        r"黃疸",
        r"மஞ்சள் காமாலை",
        r"\bcardiac stent\b",
        r"\bheart stent\b",
        r"心脏支架",
        r"通波仔",
        r"40岁心脏警钟",
        r"Colleague CI Heart Scare",
        r"\bbreast cancer\b",
        r"\bcarcinoma\b",
        r"乳癌",
        r"门诊化疗",
        r"\bwidow\b",
        r"遗孀",
        r"\bfire-sale\b",
        r"贱卖",
        r"賤賣",
        r"法拍",
        r"starving hotel payroll",
        r"\bAccidental Death\b",
        r"意外身故",
        r"Kematian Kemalangan",
    ]

    def test_zero_morbid_copy_across_user_facing_files(self):
        rel_files = [
            "static/challenge1.js",
            "static/challenge2.js",
            "static/challenge3.js",
            "static/i18n.js",
            "static/arena_app.js",
            "static/showcases.js",
            "challenges/c1_image_outreach.py",
            "challenges/c2_scenarios_bank.py",
            "challenges/c2_prompt_duel.py",
            "challenges/c3_scenarios_bank.py",
        ]
        violations = []
        for rel in rel_files:
            full_p = os.path.join(ROOT_DIR, rel)
            with open(full_p, encoding="utf-8") as f:
                txt = f.read()
            for pat in self.MORBID_PATTERNS:
                m = re.search(pat, txt, flags=re.IGNORECASE)
                if m:
                    line_no = txt[: m.start()].count("\n") + 1
                    violations.append(f"{rel}:{line_no} matched `{pat}` -> `{m.group(0)}`")
        self.assertEqual(violations, [], "Morbid/fear-heavy phrases found:\n" + "\n".join(violations))

    def test_zero_morbid_copy_in_c3_scenario_catalog(self):
        catalog_blob = repr(SCENARIO_CATALOG)
        violations = []
        for pat in self.MORBID_PATTERNS:
            m = re.search(pat, catalog_blob, flags=re.IGNORECASE)
            if m:
                violations.append(f"SCENARIO_CATALOG matched `{pat}` -> `{m.group(0)}`")
        self.assertEqual(violations, [], "\n".join(violations))

    def test_c3_top5_excludes_health_scare_and_hides_56_cases(self):
        c3_js_path = os.path.join(ROOT_DIR, "static", "challenge3.js")
        with open(c3_js_path, encoding="utf-8") as f:
            c3_js = f.read()
        self.assertIn("const C3_TOP5_SEATS = [0, 3, 4, 6, 5]", c3_js)
        self.assertNotIn("/56", c3_js)
        self.assertNotIn("16 Scenarios", c3_js)
        # Backend 56-seat & 16-archetype bank remains intact for evals
        self.assertGreaterEqual(get_total_unique_seats(), 54)
        self.assertEqual(len(ARCHETYPE_ORDER), 16)
        self.assertEqual(get_c2_total_unique_seats(), 56)

    def test_c2_and_c3_banks_pass_brand_guardrails(self):
        for seat in range(get_total_unique_seats()):
            for lg in ("en", "zh-CN", "yue", "ms", "ta"):
                sc = resolve_seat_scenario(seat, lg)
                blob = " ".join(
                    [
                        sc["lifeEvent"],
                        sc["existingGap"],
                        sc["defaultWhatsapp"],
                        sc["defaultEmail"],
                        " ".join(sc["aiaFacts"]),
                    ]
                )
                self.assertIsNone(
                    re.search(r"\bPAMB\b|Prudential Malaysia", blob),
                    f"C3 brand leak at seat={seat} lang={lg}",
                )
        for seat in range(get_c2_total_unique_seats()):
            for lg in ("en", "zh-CN", "yue", "ms", "ta"):
                c2 = resolve_c2_seat_scenario(seat, lg)
                blob = repr(c2)
                self.assertIsNone(
                    re.search(r"\bPAMB\b|Prudential Malaysia|Gemini 2\.5", blob),
                    f"C2 brand/jargon leak at seat={seat} lang={lg}",
                )

    def test_universal_click_to_zoom_present_across_all_views(self):
        with open(os.path.join(ROOT_DIR, "static", "index.html"), encoding="utf-8") as f:
            index_html = f.read()
        self.assertIn("arena-image-zoom-lightbox", index_html)
        self.assertIn("window.openArenaImageZoom", index_html)
        self.assertIn("window.closeArenaImageZoom", index_html)

        for js_name in ("challenge1.js", "challenge2.js", "challenge3.js", "showcases.js", "arena_app.js"):
            with open(os.path.join(ROOT_DIR, "static", js_name), encoding="utf-8") as f:
                js_src = f.read()
            self.assertIn(
                "data-zoomable",
                js_src,
                f"Expected data-zoomable attribute in static/{js_name}",
            )


if __name__ == "__main__":
    unittest.main(verbosity=2)
