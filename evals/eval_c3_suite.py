#!/usr/bin/env python3
"""Automated End-to-End Evaluation Suite for Challenge 3 (PRUMDA Learning Trip • Advisor Playbook).

Covers 4 rigorous evaluation suites:
  1. Suite 1 — 54-Leader Room Uniqueness, 280-Locale Brand Hygiene & 50-Phone Wi-Fi Media Offload
  2. Suite 2 — Step 1 Greeting Card Visual & Multilingual Typography Safety (Live Image + 5-Lang SVG)
  3. Suite 3 — Live Multilingual Vertex AI Generation & Personal-Touch Fidelity (10 Cases × 5 Languages)
  4. Suite 4 — 4-Tier Stratified Hybrid Judge Calibration & Pairwise Rank-Order Accuracy (16 Golden Cases)

Outputs a detailed machine-readable report to `evals/c3_eval_report.json` and exits non-zero if any
critical gate fails.
"""

from __future__ import annotations

import base64
from concurrent.futures import ThreadPoolExecutor, as_completed
import json
import os
import re
import shutil
import socket
import statistics
import subprocess
import sys
import tempfile
import time
import requests

REPO_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
if REPO_DIR not in sys.path:
    sys.path.insert(0, REPO_DIR)

from challenges.c3_pre_pitch import _compose_svg_greeting_card
from challenges.c3_scenarios_bank import (
    ARCHETYPE_ORDER,
    SEAT_ROSTER_56,
    get_total_unique_seats,
    resolve_seat_scenario,
)


def _pick_free_port() -> int:
    with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
        s.bind(("127.0.0.1", 0))
        return int(s.getsockname()[1])


def _count_cjk(text: str) -> int:
    return sum(1 for ch in text if "\u4e00" <= ch <= "\u9fff")


def _count_tamil(text: str) -> int:
    return sum(1 for ch in text if "\u0b80" <= ch <= "\u0bff")


class EvalRunner:
    def __init__(self, base_url: str):
        self.base_url = base_url.rstrip("/")
        self.checks: list[dict] = []
        self.suite_summaries: dict[str, dict] = {}

    def record(self, suite: str, name: str, passed: bool, detail: str = "", meta: dict | None = None):
        entry = {
            "suite": suite,
            "name": name,
            "passed": bool(passed),
            "detail": detail,
        }
        if meta:
            entry["meta"] = meta
        self.checks.append(entry)
        icon = "✅" if passed else "❌"
        print(f"  {icon} [{suite}] {name}: {detail}", flush=True)

    # ------------------------------------------------------------------
    # SUITE 1: 54-Leader Room Scale, Uniqueness & Media Offload Hygiene
    # ------------------------------------------------------------------
    def run_suite_1_system_and_scale(self):
        print("\n=== SUITE 1: 54-Leader Room Uniqueness, 280-Locale Hygiene & Payload Offload ===", flush=True)
        suite = "S1_Scale_Uniqueness"

        # Reset test server into clean Real Event Mode (0 demo agents)
        r_reset = requests.post(
            f"{self.base_url}/api/reset",
            json={"keepDemo": False, "phase": "C3_LIVE", "simulationMode": False},
            timeout=5,
        )
        self.record(suite, "Clean Real-Event Reset", r_reset.status_code == 200, f"HTTP {r_reset.status_code}")

        # 1A. Audit all 56 seats × 5 languages = 280 scenario payloads for completeness & zero PAMB leaks
        langs = ["en", "zh-CN", "yue", "ms", "ta"]
        total_seats = get_total_unique_seats()
        leak_hits = []
        missing_fields = []
        required_keys = (
            "customerName",
            "lifeEvent",
            "existingGap",
            "pambPlan",
            "aiaPlan",
            "customerReply",
            "cardHeadline",
            "cardChips",
            "cardHints",
            "waIdeas",
            "waHints",
            "aiaFacts",
            "closeHints",
            "defaultWhatsapp",
            "defaultEmail",
        )
        for s_idx in range(total_seats):
            for lg in langs:
                sc = resolve_seat_scenario(s_idx, lg)
                for rk in required_keys:
                    if not sc.get(rk):
                        missing_fields.append(f"seat={s_idx}/{lg}:{rk}")
                joined_visible = " | ".join(
                    [
                        str(sc.get("customerName", "")),
                        str(sc.get("lifeEvent", "")),
                        str(sc.get("existingGap", "")),
                        str(sc.get("pambPlan", "")),
                        str(sc.get("customerReply", "")),
                        str(sc.get("cardHeadline", "")),
                        " ".join(sc.get("aiaFacts", [])),
                        str(sc.get("defaultWhatsapp", "")),
                        str(sc.get("defaultEmail", "")),
                    ]
                )
                if re.search(r"\bPAMB\b|Prudential Malaysia", joined_visible):
                    leak_hits.append(f"seat={s_idx}/{lg}")

        self.record(
            suite,
            "280-Payload Schema Completeness (56 Seats × 5 Langs)",
            len(missing_fields) == 0 and total_seats >= 54,
            f"total_seats={total_seats}, missing={len(missing_fields)}",
        )
        self.record(
            suite,
            "Zero 'PAMB' / 'Prudential Malaysia' Leaks Across 280 Payloads",
            len(leak_hits) == 0,
            f"leaks={leak_hits[:5]}",
        )

        # 1B. Register 54 concurrent leaders across 5 languages and fetch /api/c3/scenario
        assigned_seats = []
        assigned_keys = []
        assigned_archetypes = []
        rival_brands = set()

        for i in range(54):
            lg = langs[i % len(langs)]
            pid = f"leader-room-bromo-{i+1:02d}"
            reg_r = requests.post(
                f"{self.base_url}/api/register",
                json={"id": pid, "name": f"Leader {i+1:02d}", "language": lg},
                timeout=5,
            )
            assert reg_r.status_code == 200
            sc_r = requests.get(
                f"{self.base_url}/api/c3/scenario",
                params={"id": pid, "lang": lg},
                timeout=5,
            )
            assert sc_r.status_code == 200
            sc_json = sc_r.json()
            scen = sc_json["scenario"]
            assigned_seats.append(scen["seatIndex"])
            assigned_keys.append(scen["scenarioKey"])
            assigned_archetypes.append(scen["id"])
            rival_brands.add(scen["rivalBrand"])

        unique_seats = len(set(assigned_seats))
        unique_keys = len(set(assigned_keys))
        first_16_unique_arch = len(set(assigned_archetypes[:16]))
        total_arch_covered = len(set(assigned_archetypes))

        self.record(
            suite,
            "54-Leader Zero-Collision Unique Case Assignment",
            unique_seats == 54 and unique_keys == 54,
            f"unique_seats={unique_seats}/54, unique_persona_keys={unique_keys}/54",
        )
        self.record(
            suite,
            "Interleaved 16-Archetype Coverage (First 16 Leaders Get 16 Distinct Topics)",
            first_16_unique_arch == 16 and total_arch_covered == len(ARCHETYPE_ORDER),
            f"first_16_unique={first_16_unique_arch}/16, total_archetypes={total_arch_covered}/{len(ARCHETYPE_ORDER)}",
        )
        self.record(
            suite,
            "Multi-Competitor Variety (AIA, AIA Public Takaful, Great Eastern)",
            len(rival_brands) >= 3,
            f"rivals={sorted(rival_brands)}",
        )

        # 1C. Re-fetching /api/c3/scenario for an existing leader keeps their exact seat (idempotency)
        recheck = requests.get(
            f"{self.base_url}/api/c3/scenario",
            params={"id": "leader-room-bromo-07", "lang": "zh-CN"},
            timeout=5,
        ).json()["scenario"]
        self.record(
            suite,
            "Seat Persistence Across Refreshes & Language Switches",
            recheck["seatIndex"] == assigned_seats[6],
            f"expected seat={assigned_seats[6]}, got={recheck['seatIndex']}",
        )

        # 1D. Stress-test 25 image-heavy submissions (~80 KB base64 each = 2 MB raw) and verify /api/state stays < 120 KB
        fake_raw_bytes = os.urandom(60000)  # ~80 KB base64
        fake_data_url = "data:image/png;base64," + base64.b64encode(fake_raw_bytes).decode("ascii")
        for i in range(25):
            pid = f"leader-room-bromo-{i+1:02d}"
            # Make each image slightly unique so 25 distinct media files get offloaded
            unique_bytes = fake_raw_bytes + f"-card-{i}".encode("ascii")
            data_url_i = "data:image/png;base64," + base64.b64encode(unique_bytes).decode("ascii")
            sub_r = requests.post(
                f"{self.base_url}/api/submit",
                json={
                    "id": pid,
                    "name": f"Leader {i+1:02d}",
                    "language": "en",
                    "challenge": "3",
                    "speed": 94,
                    "accuracy": 92,
                    "timeSec": 42,
                    "criteria": {"Visual Warmth & Card": 23, "Empathy-First Opening": 23, "Wealth & Plan Mastery": 23, "Personal Advisor Touch": 23},
                    "judgeFeedback": "Great pre-pitch!",
                    "submission": {
                        "challenge": "3",
                        "title": f"Case #{i+1}",
                        "styleBadge": "🍼 Newborn",
                        "personalTouch": "🎨 Card: Teddy bear  •  💬 WhatsApp: 2-min summary",
                        "whatsappMessage": "Warm congratulations!",
                        "aiaComparisonEmail": "Subject: PRU vs AIA",
                        "imageAfter": data_url_i,
                    },
                },
                timeout=5,
            )
            assert sub_r.status_code == 200

        st_resp = requests.get(f"{self.base_url}/api/state", timeout=5)
        state_kb = len(st_resp.content) / 1024.0
        st_data = st_resp.json()
        sample_p = next(p for p in st_data["participants"] if p["id"] == "leader-room-bromo-01")
        offloaded_url = sample_p["submissions"]["3"]["imageAfter"]
        media_resp = requests.get(f"{self.base_url}{offloaded_url}", timeout=5)

        self.record(
            suite,
            "50-Phone Wi-Fi State Payload < 120 KB After 25 Image Submissions",
            state_kb < 120.0 and offloaded_url.startswith("/api/media/"),
            f"/api/state={state_kb:.1f} KB (2,000+ KB raw base64 offloaded to {offloaded_url})",
        )
        self.record(
            suite,
            "Offloaded /api/media/<hash> Serves Valid Cached Image Bytes",
            media_resp.status_code == 200
            and len(media_resp.content) > 50000
            and "max-age=86400" in media_resp.headers.get("Cache-Control", ""),
            f"HTTP {media_resp.status_code}, bytes={len(media_resp.content)}, Cache-Control={media_resp.headers.get('Cache-Control')}",
        )

    # ------------------------------------------------------------------
    # SUITE 2: Step 1 Greeting Card Visual & Multilingual Typography Eval
    # ------------------------------------------------------------------
    def run_suite_2_greeting_cards(self):
        print("\n=== SUITE 2: Step 1 Greeting Card Visual & Multilingual Typography Safety ===", flush=True)
        suite = "S2_Greeting_Cards"

        # 2A. Test deterministic SVG fallback cards across all 5 languages (zero corporate logos, valid SVG)
        svg_ok = True
        svg_details = []
        for idx, lg in enumerate(["en", "zh-CN", "yue", "ms", "ta"]):
            sc = resolve_seat_scenario(idx, lg)
            data_url = _compose_svg_greeting_card(
                sc,
                sc["cardHeadline"],
                sc["cardSubline"],
                "Dato' Test Advisor",
                "",
                lang=lg,
            )
            has_prefix = data_url.startswith("data:image/svg+xml;base64,")
            raw_svg = base64.b64decode(data_url.split(",", 1)[1]).decode("utf-8")
            clean_brand = ("PAMB" not in raw_svg) and ("<svg" in raw_svg) and ("</svg>" in raw_svg)
            if not (has_prefix and clean_brand):
                svg_ok = False
            svg_details.append(f"{lg}:{len(raw_svg)}B")

        self.record(
            suite,
            "5-Language Localized SVG Fallback Cards Valid & Brand-Clean",
            svg_ok,
            ", ".join(svg_details),
        )

        # 2B. Live Step 1 Card API generation test (English + Mandarin non-Latin text-free art guard)
        for lg, seat, note in [
            ("en", 0, "Cute teddy bear and warm golden nursery lamp"),
            ("zh-CN", 6, "翡翠与流金几何纹样，温馨家庭祝福"),
        ]:
            t0 = time.time()
            sc = resolve_seat_scenario(seat, lg)
            r = requests.post(
                f"{self.base_url}/api/ai",
                json={
                    "id": f"eval-card-{lg}",
                    "name": "Advisor Mei Ling",
                    "challenge": "3",
                    "language": lg,
                    "seatIndex": seat,
                    "scenarioId": sc["id"],
                    "stepMode": "card",
                    "cardPrompt": sc["cardHeadline"],
                    "cardStyle": "Warm hand-painted storybook watercolor illustration",
                    "cardPersonalNote": note,
                    "generateCard": True,
                },
                timeout=35,
            )
            dt = time.time() - t0
            data = r.json()
            c_url = data.get("greetingCardDataUrl", "")
            if c_url.startswith("/api/media/"):
                m_r = requests.get(f"{self.base_url}{c_url}", timeout=5)
                valid_img = m_r.status_code == 200 and len(m_r.content) > 1500
                size_info = f"{len(m_r.content)//1024}KB via {c_url}"
            else:
                valid_img = c_url.startswith("data:image/") and len(c_url) > 1500
                size_info = f"inline {len(c_url)//1024}KB"

            self.record(
                suite,
                f"Live Step 1 Card Generation ({lg}, seat={seat}, model={data.get('modelUsed')})",
                r.status_code == 200 and valid_img,
                f"{size_info} in {dt:.1f}s",
            )

    # ------------------------------------------------------------------
    # SUITE 3: Live Multilingual Generation & Personal-Touch Fidelity
    # ------------------------------------------------------------------
    def run_suite_3_multilingual_generation(self):
        print("\n=== SUITE 3: Live Multilingual Generation & Personal-Touch Fidelity (10 Cases × 5 Langs) ===", flush=True)
        suite = "S3_Live_Multilingual_Gen"

        test_matrix = [
            {"seat": 0, "lang": "en", "waNote": "2-min summary while baby naps", "emNote": "10-min Zoom Thursday at 8:30pm", "expectWa": ["nap", "2-min", "summary", "lucas"], "expectEm": ["8:30", "zoom", "thursday"]},
            {"seat": 10, "lang": "en", "waNote": "coffee near Bangsar clinic Friday", "emNote": "compare deductible tables on Zoom Wednesday", "expectWa": ["bangsar", "coffee", "friday"], "expectEm": ["wednesday", "zoom", "deductible", "15%"]},
            {"seat": 4, "lang": "zh-CN", "waNote": "周四去峇都交湾顺道喝杯10分钟咖啡", "emNote": "周四下午3点带一页对比表去您办公室", "expectWa": ["咖啡", "10", "周四", "峇都交湾"], "expectEm": ["周四", "3点", "办公室", "对比"]},
            {"seat": 14, "lang": "zh-CN", "waNote": "祝老爷子老太太福寿安康，顺道发2分钟简报", "emNote": "周六早茶用10分钟帮您算同预算升级表", "expectWa": ["2分钟", "简报", "安康", "祝"], "expectEm": ["早茶", "10分钟", "预算", "周六"]},
            {"seat": 1, "lang": "yue", "waNote": "趁未滿40歲飲杯靚啡傾兩句", "emNote": "禮拜五放工用10分鐘 Zoom 拍住兩份表睇", "expectWa": ["40", "啡", "傾"], "expectEm": ["10分鐘", "Zoom", "禮拜五", "表"]},
            {"seat": 7, "lang": "yue", "waNote": "恭喜定存到期，Send 份兩分鐘懶人包俾你睇先", "emNote": "聽日下晝飲杯茶10分鐘同你計下數", "expectWa": ["懶人包", "兩分鐘", "2分鐘", "定存"], "expectEm": ["10分鐘", "茶", "聽日"]},
            {"seat": 6, "lang": "ms", "waNote": "hantar ringkasan 2 minit strategi kecairan Hibah", "emNote": "minum kopi 15 minit Rabu malam bersama pasangan", "expectWa": ["2 minit", "ringkasan", "hibah"], "expectEm": ["15 minit", "rabu", "kopi", "pasangan"]},
            {"seat": 2, "lang": "ms", "waNote": "tahniah rumah baharu, saya hantar jadual 2 minit", "emNote": "Zoom 10 minit Khamis jam 8:30 malam", "expectWa": ["rumah", "2 minit", "tahniah"], "expectEm": ["8:30", "10 minit", "zoom", "khamis"]},
            {"seat": 3, "lang": "ta", "waNote": "மருத்துவமனை அருகே செவ்வாய் 10 நிமிடம் காபி", "emNote": "செவ்வாய் மதியம் 2 மணிக்கு 1 பக்க ஒப்பீடு", "expectWa": ["10", "காபி", "செவ்வாய்"], "expectEm": ["2", "செவ்வாய்", "ஒப்பீடு", "1"]},
            {"seat": 13, "lang": "ta", "waNote": "விசா வேலைக்கு முன் 2 நிமிட சுருக்கம் அனுப்புகிறேன்", "emNote": "வியாழன் இரவு 8 மணிக்கு 10 நிமிட Zoom", "expectWa": ["2", "சுருக்கம்", "விசா"], "expectEm": ["Zoom", "10", "8", "வியாழன்"]},
        ]

        def _run_one_gen(item: dict) -> dict:
            seat = item["seat"]
            lg = item["lang"]
            sc = resolve_seat_scenario(seat, lg)
            wa_strat = "Opening Approach: Open with 100% genuine celebration and warmth, zero sales pressure | Wealth Hooks to Plant: " + "; ".join(
                x["detail"] for x in sc["waIdeas"][:2]
            )
            em_strat = "Advisory Style: Acknowledge competitor respectfully while showing factually why PRU fits better | Selected Facts: " + " ; ".join(
                sc["aiaFacts"]
            )
            r_wa = requests.post(
                f"{self.base_url}/api/ai",
                json={
                    "id": f"eval-gen-{seat}-{lg}",
                    "name": "Advisor Satish",
                    "challenge": "3",
                    "language": lg,
                    "seatIndex": seat,
                    "scenarioId": sc["id"],
                    "stepMode": "whatsapp",
                    "cardPrompt": sc["cardHeadline"],
                    "whatsappPrompt": wa_strat,
                    "waPersonalNote": item["waNote"],
                },
                timeout=25,
            ).json()

            r_em = requests.post(
                f"{self.base_url}/api/ai",
                json={
                    "id": f"eval-gen-{seat}-{lg}",
                    "name": "Advisor Satish",
                    "challenge": "3",
                    "language": lg,
                    "seatIndex": seat,
                    "scenarioId": sc["id"],
                    "stepMode": "email",
                    "cardPrompt": sc["cardHeadline"],
                    "emailPrompt": em_strat,
                    "emailPersonalNote": item["emNote"],
                },
                timeout=25,
            ).json()

            return {"item": item, "sc": sc, "wa": r_wa.get("firstTouchMessage", ""), "em": r_em.get("aiaComparisonEmail", ""), "model": r_em.get("modelUsed", "")}

        results = []
        with ThreadPoolExecutor(max_workers=4) as pool:
            futs = [pool.submit(_run_one_gen, it) for it in test_matrix]
            for f in as_completed(futs):
                results.append(f.result())

        # Sort back into matrix order
        results.sort(key=lambda x: (x["item"]["lang"], x["item"]["seat"]))

        yue_markers = ("嘅", "咗", "啲", "唔", "俾", "喺", "傾", "睇", "晒", "幫", "搵", "係", "同埋")
        ms_markers = ("tahniah", "untuk", "dengan", "anda", "keluarga", "pelan", "ringkasan", "salam", "boleh", "perlindungan", "lebih")

        for res in results:
            it = res["item"]
            lg = it["lang"]
            sc = res["sc"]
            wa = res["wa"]
            em = res["em"]
            combined = f"{wa}\n{em}"
            comb_low = combined.lower()

            # Check 1: Non-empty, non-truncated, no raw JSON wrapper leakage
            len_ok = len(wa) >= 55 and len(em) >= 80 and not wa.lstrip().startswith("{") and not em.lstrip().startswith("{")

            # Check 2: Language & Script fidelity
            if lg == "zh-CN":
                script_ok = _count_cjk(wa) >= 20 and _count_cjk(em) >= 35
            elif lg == "yue":
                yue_hits = sum(1 for m in yue_markers if m in combined)
                script_ok = _count_cjk(wa) >= 20 and _count_cjk(em) >= 35 and yue_hits >= 2
            elif lg == "ta":
                script_ok = _count_tamil(wa) >= 20 and _count_tamil(em) >= 35
            elif lg == "ms":
                ms_hits = sum(1 for m in ms_markers if m in comb_low)
                script_ok = ms_hits >= 3
            else:
                script_ok = len(re.findall(r"[A-Za-z]+", combined)) >= 40

            # Check 3: PRU plan grounding & zero PAMB corporate leak
            has_pru = ("pru" in comb_low) or ("保诚" in combined) or ("保誠" in combined) or ("புருடென்ஷியல்" in combined)
            no_pamb = re.search(r"\bPAMB\b", combined) is None

            # Check 4: Personal Touch / Meeting Closer woven in
            wa_touch_hit = any(tok.lower() in wa.lower() for tok in it["expectWa"])
            em_touch_hit = any(tok.lower() in em.lower() for tok in it["expectEm"])

            passed = len_ok and script_ok and has_pru and no_pamb and wa_touch_hit and em_touch_hit
            self.record(
                suite,
                f"Live {lg} ({sc['id']} vs {sc['rivalBrand']})",
                passed,
                f"wa={len(wa)}c, em={len(em)}c, script={script_ok}, pru={has_pru}, noPAMB={no_pamb}, waTouch={wa_touch_hit}, emTouch={em_touch_hit}",
            )

    # ------------------------------------------------------------------
    # SUITE 4: 4-Tier Stratified Hybrid Judge Calibration & Pairwise Eval
    # ------------------------------------------------------------------
    def run_suite_4_judge_calibration(self):
        print("\n=== SUITE 4: 4-Tier Stratified Hybrid Judge Calibration & Pairwise Rank-Order (16 Golden Cases) ===", flush=True)
        suite = "S4_Judge_Calibration"

        sc_baby_en = resolve_seat_scenario(0, "en")
        sc_sme_zh = resolve_seat_scenario(4, "zh-CN")
        sc_ci_yue = resolve_seat_scenario(1, "yue")
        sc_hibah_ms = resolve_seat_scenario(6, "ms")
        sc_doc_ta = resolve_seat_scenario(3, "ta")

        golden_cases = [
            # --- TIER A: Master MDRT Pre-Pitch (Target: 90 - 99) ---
            {
                "id": "A1_Master_EN_Baby",
                "tier": "A",
                "lang": "en",
                "seat": 0,
                "hasCard": True,
                "personal": "Cute teddy bear card | Send 2-min summary while Baby Lucas naps | 10-min Zoom Thursday 8:30pm after baby sleeps",
                "wa": (
                    "Warmest congratulations Wei Ming & Chloe on welcoming Baby Lucas! 🍼🌟 Seeing your family blossom since your wedding makes me so happy—I made this little nursery card specially for you three.\n\n"
                    "Zero rush while you both rest! Whenever Lucas naps, I can send a quick 2-min summary on claiming your RM 500 Childbirth Cash Reward under PRUWith You Plus and locking in PRUMy Child Plus (27 congenital conditions + neonatal jaundice) using just your FD interest. Sound good? 😊"
                ),
                "em": (
                    "Subject: Clear Side-by-Side for Baby Lucas: PRUMy Child Plus & PRUWith You Plus vs. AIA Joy Xtra\n\n"
                    "Hi Wei Ming & Chloe,\n"
                    "Smart move comparing both quotes carefully for Lucas! AIA A-Life Joy Xtra is a solid plan; here are the 3 specific clause advantages where our PRU portfolio fits your young family better:\n"
                    "• Unconditional +50% Auto Sum Assured Booster: PRUWith You Plus grows cover +1%/yr up to +50% automatically at RM 0 extra cost (no annual AIA Vitality membership fee or fitness targets required).\n"
                    "• RM 500 Childbirth Cash Reward + 27 Congenital Conditions: Immediate RM 500 milestone cash plus comprehensive neonatal jaundice, Autism/ADHD cover & Payor Waiver.\n"
                    "• Real 15% Cash No-Claim Discount: PRUMillion Med Active 2.0 cuts medical COI directly by 15% in cash when claim-free vs. a conditional wallet credit.\n\n"
                    "Shall we hop on a relaxed 10-min Zoom this Thursday at 8:30pm after Lucas sleeps to view both tables side-by-side?"
                ),
                "min": 90,
                "max": 99,
            },
            {
                "id": "A2_Master_ZH_SME",
                "tier": "A",
                "lang": "zh-CN",
                "seat": 4,
                "hasCard": True,
                "personal": "峇都交湾二期厂房烫金贺卡 | 恭喜破土动工顺道带2分钟简报 | 周四下午3点到您厂房办公室用10分钟汇报",
                "wa": (
                    "衷心祝贺拿督斯里陈总（Dato' Sri Raymond）峇都交湾二期新厂盛大破土动工！🏭🚀 特意为您制作了这张里程碑烫金祝贺卡，见证集团再攀高峰！\n\n"
                    "考虑到二期 RM 600万个人银行担保及令郎在英国学医、令嫒在墨尔本接班的传承布局，只需不到 2.5% 流动资金即可通过 PRUWealth Enrich 2.0 与 PRUPrestige Legacy 隔离企业债务并公平传承。这周四顺路发份2分钟高管简报给您过目好吗？🤝"
                ),
                "em": (
                    "主题：企业担保隔离与家族传承客观对比：PRUWealth Enrich 2.0 vs 友邦 AIA Legasi Beyond\n\n"
                    "拿督斯里陈总您好：\n"
                    "非常赞同您让银行团队一起比对条款！友邦 Legasi Beyond 也是市场常见高额方案，但针对您二期 RM 600万担保与儿女公平传承，PRU 组合有 3 项硬核契约优势：\n"
                    "• 自动高达 +50% 保额递增 + 500% 意外赔付：PRUWealth Enrich 2.0 无需每年打卡运动或缴交 AIA Vitality 会费，自动递增保额并享高达5倍意外保障。\n"
                    "• 首日 100% 净保费直投配置（PRUPrestige Legacy）：首日即保留高额资产净值，完美契合扩建期企业现金流弹性。\n"
                    "• 法定 Schedule 10 债权隔离 + 内建免费分期传承：彻底隔离 RM 600万银行连带担保，免信托年费留免税现金给英国学医儿子，让女儿完整继承工厂股权。\n\n"
                    "这周四下午 3 点我带一页式对照表到您峇都交湾办公室，用 10 分钟向您清晰汇报可以吗？"
                ),
                "min": 90,
                "max": 99,
            },
            {
                "id": "A3_Master_YUE_CI",
                "tier": "A",
                "lang": "yue",
                "seat": 1,
                "hasCard": True,
                "personal": "檳威大橋日出活力賀卡 | 問候拍檔早日康復 + 趁39歲鎖定保費 | 禮拜五喺 Bayan Lepas 飲杯10分鐘靚啡",
                "wa": (
                    "Marcus 兄，專登整咗張檳城日出賀卡俾你，祝你生意拍檔早日康復、身體安康！🌅🙏 呢排你一個人睇晒成間廠真係辛苦晒。\n\n"
                    "順帶提一提，趁你下個月滿 40 歲保費跳級之前，可以用 39 歲健康費率鎖定 PRUAll Care（包 ~190 種危疾保到 100 歲）配埋 PRUMan 期滿退還高達 110% 保費。完全唔急，Send 份兩分鐘懶人包俾你得閒睇下好嗎？☕"
                ),
                "em": (
                    "主題：40歲前危疾保障條款客觀對比：PRUAll Care + PRUMan vs 友邦 AIA Beyond Critical Care\n\n"
                    "Marcus 兄你好：\n"
                    "貨比三家絕對係最精明嘅決定！AIA Beyond Critical Care 都有多重賠償，但對比你最關心嘅長遠保障同保費回報，PRU 有 3 大實際條款優勢：\n"
                    "• 保障直達 100 歲（涵蓋約 190 種危疾、ICU 留醫 ≥120 小時及大手術）：比 AIA 80 歲期滿足足多守護人生最關鍵嘅 20 年。\n"
                    "• 260% 男性危疾保障 + 期滿退還高達 110% 保費（PRUMan）：有事賠足，平平安安期滿仲退返高達 110% 已繳總保費。\n"
                    "• 無索償直接減免 15% 醫療現金保費（PRUMillion Med Active 2.0）：真金白銀減保費，唔似 AIA 只係撥入有條件限制嘅醫療錢包。\n\n"
                    "呢個禮拜五喺 Bayan Lepas 請你飲杯 10 分鐘靚啡，拍住兩份利益表一齊睇清楚好嗎？"
                ),
                "min": 90,
                "max": 99,
            },
            {
                "id": "A4_Master_MS_Hibah",
                "tier": "A",
                "lang": "ms",
                "seat": 6,
                "hasCard": True,
                "personal": "Motif geometri zamrud & doa keberkatan | Ringkasan 2 minit strategi Hibah | Kopi 15 minit Rabu malam bersama pasangan",
                "wa": (
                    "Alhamdulillah, setinggi-tinggi tahniah Tuan Haji Zulkifli & Puan Siti atas pencapaian jualan tertinggi rangkaian logistik anda tahun ini! 🕌🌟 Saya sediakan kad doa keberkatan ini khas buat keluarga tuan.\n\n"
                    "Memandangkan aset perniagaan & hartanah RM 9 juta dipegang atas nama bersama, kita boleh menyediakan kecairan tunai segera patuh Syariah melalui Hibah PRUBSN WarisanPlus tanpa menjejaskan operasi syarikat. Boleh saya kongsikan ringkasan 2 minit bila tuan berkelapangan? 😊"
                ),
                "em": (
                    "Subjek: Perbandingan Fakta Struktur Hibah Takaful: PRUBSN WarisanPlus lwn AIA Public Takaful A-Life Legasi\n\n"
                    "Salam hormat Tuan Haji Zulkifli & Puan Siti,\n"
                    "Langkah yang sangat bijak untuk menyemak terma sijil secara terperinci! AIA Public Takaful A-Life Legasi juga pelan yang baik, namun bagi melindungi kecairan aset RM 9 juta keluarga tuan, PRUBSN WarisanPlus menawarkan 3 kelebihan utama:\n"
                    "• Bayaran Tunai Hibah Bersyarat Segera Di Luar Pembekuan Pusaka tanpa perlu membayar yuran tahunan keahlian AIA Vitality atau syarat kecergasan.\n"
                    "• Perlindungan Kemalangan Sehingga 400% terbina dalam sijil termasuk ketika menunaikan ibadah Umrah/Haji dan menaiki pengangkutan awam.\n"
                    "• Pilihan Wakaf & Amal Jariah terbina bersama penamaan Hibah keluarga supaya keharmonian Faraid dan legasi perniagaan kekal terpelihara.\n\n"
                    "Bagaimana jika kita minum kopi santai 15 minit Rabu malam ini bersama Puan Siti untuk menyemak jadual perbandingan 1 halaman?"
                ),
                "min": 90,
                "max": 99,
            },

            # --- TIER B: Solid Standard Advisor (Target: 78 - 90) ---
            {
                "id": "B1_Standard_EN",
                "tier": "B",
                "lang": "en",
                "seat": 0,
                "hasCard": True,
                "personal": "",
                "wa": (
                    "Congratulations Wei Ming and Chloe on the birth of your baby boy! Wishing your family good health and happiness. "
                    "When you have some free time, let's look at PRUMy Child Plus to set up medical and congenital coverage for your newborn. Let me know when you are free."
                ),
                "em": (
                    "Subject: PRU vs AIA Baby Plan Comparison\n\n"
                    "Hi Wei Ming,\n"
                    "Thanks for sharing that AIA quoted you Joy Xtra. Our PRUWith You Plus and PRUMy Child Plus package gives an automatic sum assured booster without Vitality fees and covers congenital conditions plus a childbirth reward. "
                    "Let me know if we can have a quick call this week to go through the brochure."
                ),
                "min": 78,
                "max": 90,
            },
            {
                "id": "B2_Standard_ZH",
                "tier": "B",
                "lang": "zh-CN",
                "seat": 4,
                "hasCard": True,
                "personal": "",
                "wa": (
                    "恭喜陈总二期新厂动工大吉！生意兴隆！您目前有银行担保贷款，我们可以用 PRUWealth Enrich 2.0 帮您做好高额人寿与资产隔离规划。方便的时候欢迎联系我了解一下。"
                ),
                "em": (
                    "主题：PRU 与 AIA 企业传承方案对比\n\n"
                    "陈总您好：\n"
                    "友邦的方案也不错，不过我们的 PRUWealth Enrich 2.0 有自动保额递增功能，不需要每年买 Vitality 会员，而且配合信托条款可以保护您的企业担保风险。看您哪天有空我发资料给您参考。"
                ),
                "min": 78,
                "max": 90,
            },
            {
                "id": "B3_Standard_MS",
                "tier": "B",
                "lang": "ms",
                "seat": 6,
                "hasCard": True,
                "personal": "",
                "wa": (
                    "Tahniah Tuan Zulkifli atas kejayaan perniagaan tahun ini! Semoga terus maju. Saya ingin berkongsi tentang pelan PRUBSN WarisanPlus untuk perlindungan Hibah keluarga tuan. Beritahu saya bila senang berbincang."
                ),
                "em": (
                    "Subjek: Perbandingan PRUBSN WarisanPlus dan AIA\n\n"
                    "Salam Tuan Zulkifli,\n"
                    "Terima kasih atas maklum balas tuan. PRUBSN WarisanPlus memudahkan urusan Hibah tanpa pembekuan harta pusaka dan tidak memerlukan yuran tahunan Vitality seperti AIA, selain ada perlindungan kemalangan tambahan. Jemput hubungi saya bila lapang."
                ),
                "min": 78,
                "max": 90,
            },
            {
                "id": "B4_Standard_TA",
                "tier": "B",
                "lang": "ta",
                "seat": 3,
                "hasCard": True,
                "personal": "",
                "wa": (
                    "துறைத் தலைவராக பதவி உயர்வு பெற்ற Dr. Kavitha அவர்களுக்கு வாழ்த்துகள்! உங்கள் புதிய வருமானத்திற்கு ஏற்ப PRULady மற்றும் PRUElite Invest திட்டங்களைப் பற்றிப் பேச விரும்புகிறேன். நேரம் கிடைக்கும்போது தெரிவியுங்கள்."
                ),
                "em": (
                    "பொருள்: PRULady மற்றும் AIA ஒப்பீடு\n\n"
                    "வணக்கம் Dr. Kavitha,\n"
                    "AIA திட்டத்தை விட PRULady பெண்கள் தீவிர நோய் பாதுகாப்பு மற்றும் முதிர்வில் பிரீமியம் திரும்பப் பெறும் வசதியைத் தருகிறது. மேலும் PRUElite Invest முதல் நாளிலேயே நல்ல முதலீட்டு ஒதுக்கீடு வழங்குகிறது. இந்த வாரம் பேசலாமா?"
                ),
                "min": 78,
                "max": 90,
            },

            # --- TIER C: Minimal / Lazy / Pushy Incomplete (Target: 45 - 75) ---
            {
                "id": "C1_Minimal_Pushy_EN",
                "tier": "C",
                "lang": "en",
                "seat": 0,
                "hasCard": False,
                "personal": "",
                "wa": "Hi buy baby insurance from me quickly, special promo closing tonight!! Sign up now.",
                "em": "Choose PRU instead of AIA because our plan is cheaper and better. Please sign today.",
                "min": 45,
                "max": 74,
            },
            {
                "id": "C2_Minimal_Pushy_ZH",
                "tier": "C",
                "lang": "zh-CN",
                "seat": 4,
                "hasCard": False,
                "personal": "",
                "wa": "陈总您好，月底冲业绩最后一天，赶紧跟我买份大额保单吧！",
                "em": "别买友邦了，买我们公司的保单肯定更好，今天之内签单就行。",
                "min": 45,
                "max": 74,
            },
            {
                "id": "C3_Minimal_YUE",
                "tier": "C",
                "lang": "yue",
                "seat": 1,
                "hasCard": False,
                "personal": "",
                "wa": "喂快啲買份危疾保險啦，今晚截數喇。",
                "em": "我哋份單好過 AIA 好多，唔使睇條款啦直接簽名啦。",
                "min": 45,
                "max": 74,
            },
            {
                "id": "C4_Minimal_MS",
                "tier": "C",
                "lang": "ms",
                "seat": 6,
                "hasCard": False,
                "personal": "",
                "wa": "Tolong beli takaful dengan saya hari ini juga sebab saya nak kejar kuota bulanan.",
                "em": "Pelan kami paling bagus, tak payah tengok sebut harga lain, terus tandatangan borang.",
                "min": 45,
                "max": 74,
            },

            # --- TIER D: BNM Non-Compliant Guaranteed-% Return / Competitor Bashing (Target: <= 68) ---
            {
                "id": "D1_NonCompliant_GuaranteedReturn_EN",
                "tier": "D",
                "lang": "en",
                "seat": 0,
                "hasCard": True,
                "personal": "Fast profit guarantee",
                "wa": (
                    "Congrats Wei Ming! Put RM 50,000 into our investment-linked plan today—it gives a 100% guaranteed 18% annual return completely risk-free Return Guarantee!"
                ),
                "em": (
                    "Subject: Why AIA is a Scam\n\n"
                    "Do not ever trust AIA—AIA is a total scam and garbage company that never pays claims! Our fund has a guaranteed 18% return every single year with zero market risk."
                ),
                "min": 40,
                "max": 68,
            },
            {
                "id": "D2_NonCompliant_Bashing_ZH",
                "tier": "D",
                "lang": "zh-CN",
                "seat": 4,
                "hasCard": True,
                "personal": "保本高息",
                "wa": (
                    "祝贺陈总！把资金放进我们投连险，我向您书面保证每年稳赚20%固定回报，百分百零风险包赚不赔！"
                ),
                "em": (
                    "主题：千万别信友邦\n\n"
                    "友邦完全是垃圾骗子公司，理赔全拒赔！买我们的产品每年稳赚20%保证收益！"
                ),
                "min": 40,
                "max": 68,
            },
            {
                "id": "D3_NonCompliant_Bashing_MS",
                "tier": "D",
                "lang": "ms",
                "seat": 6,
                "hasCard": True,
                "personal": "Untung tetap",
                "wa": (
                    "Tahniah Tuan! Pelan pelaburan kami memberi pulangan dijamin 16% setahun tanpa sebarang risiko langsung!"
                ),
                "em": (
                    "Subjek: Jangan beli AIA\n\n"
                    "Syarikat AIA itu penipu dan sampah yang tidak pernah bayar tuntutan! Pelan kami ada pulangan dijamin 16% setiap tahun."
                ),
                "min": 40,
                "max": 68,
            },
            {
                "id": "D4_NonCompliant_GuaranteedReturn_YUE",
                "tier": "D",
                "lang": "yue",
                "seat": 1,
                "hasCard": True,
                "personal": "包賺",
                "wa": "恭喜晒！買我哋份投資相連保單保證每年穩賺 15% 回報，零風險包賺！",
                "em": "AIA 係垃圾呃人公司千祈唔好買！我哋保證每年 15% 回報率。",
                "min": 40,
                "max": 68,
            },
        ]

        def _eval_one(gc: dict) -> dict:
            sc = resolve_seat_scenario(gc["seat"], gc["lang"])
            r = requests.post(
                f"{self.base_url}/api/ai",
                json={
                    "id": f"eval-judge-{gc['id']}",
                    "name": "Eval Judge Runner",
                    "challenge": "3",
                    "language": gc["lang"],
                    "seatIndex": gc["seat"],
                    "scenarioId": sc["id"],
                    "stepMode": "evaluate",
                    "cardPrompt": sc["cardHeadline"],
                    "cardPersonalNote": gc["personal"],
                    "whatsappPrompt": "Empathy + wealth hook",
                    "waPersonalNote": gc["personal"],
                    "whatsappText": gc["wa"],
                    "emailPrompt": "Factual comparison",
                    "emailPersonalNote": gc["personal"],
                    "emailText": gc["em"],
                    "generateCard": False,
                    "previousCardDataUrl": "/api/media/mock-card.svg" if gc["hasCard"] else "",
                },
                timeout=25,
            ).json()
            return {
                "gc": gc,
                "score": int(r.get("qualityScore", 0)),
                "pillars": r.get("pillarScores", {}),
                "feedback": r.get("judgeFeedback", ""),
            }

        scored = []
        with ThreadPoolExecutor(max_workers=4) as pool:
            futs = [pool.submit(_eval_one, g) for g in golden_cases]
            for f in as_completed(futs):
                scored.append(f.result())

        order_map = {g["id"]: i for i, g in enumerate(golden_cases)}
        scored.sort(key=lambda x: order_map[x["gc"]["id"]])

        by_tier: dict[str, list[int]] = {"A": [], "B": [], "C": [], "D": []}
        for item in scored:
            gc = item["gc"]
            sc_val = item["score"]
            by_tier[gc["tier"]].append(sc_val)
            in_band = gc["min"] <= sc_val <= gc["max"]
            fb_ok = len(item["feedback"].strip()) >= 15
            self.record(
                suite,
                f"Golden Case {gc['id']} (Tier {gc['tier']}, {gc['lang']})",
                in_band and fb_ok,
                f"score={sc_val} (target {gc['min']}..{gc['max']}), pillars={item['pillars']}, feedback='{item['feedback'][:75]}...'",
                meta={"tier": gc["tier"], "score": sc_val, "pillars": item["pillars"]},
            )

        mean_a = statistics.mean(by_tier["A"])
        mean_b = statistics.mean(by_tier["B"])
        mean_c = statistics.mean(by_tier["C"])
        mean_d = statistics.mean(by_tier["D"])

        # Compute Pairwise Rank-Order Accuracy across all (A > B), (B > C), (A > D), (B > D) pairs
        pair_wins = 0
        pair_total = 0
        for a in by_tier["A"]:
            for b in by_tier["B"]:
                pair_total += 1
                if a > b:
                    pair_wins += 1
            for c in by_tier["C"]:
                pair_total += 1
                if a > c:
                    pair_wins += 1
            for d in by_tier["D"]:
                pair_total += 1
                if a > d:
                    pair_wins += 1
        for b in by_tier["B"]:
            for c in by_tier["C"]:
                pair_total += 1
                if b > c:
                    pair_wins += 1
            for d in by_tier["D"]:
                pair_total += 1
                if b > d:
                    pair_wins += 1

        pairwise_acc = (pair_wins / pair_total) * 100.0 if pair_total else 0.0
        sep_ok = (mean_a >= mean_b + 5.0) and (mean_b >= mean_c + 10.0) and (max(by_tier["D"]) < min(by_tier["B"]))

        self.record(
            suite,
            "4-Tier Mean Score Separation (Mean A > B > C & Non-Compliant D Penalized)",
            sep_ok,
            f"Mean A={mean_a:.1f}, Mean B={mean_b:.1f}, Mean C={mean_c:.1f}, Mean D={mean_d:.1f}",
        )
        self.record(
            suite,
            "Pairwise Rank-Order Discrimination Accuracy == 100%",
            pairwise_acc == 100.0,
            f"{pair_wins}/{pair_total} pairs ({pairwise_acc:.1f}%)",
        )

        self.suite_summaries["tier_means"] = {
            "Tier_A_Master_MDRT": round(mean_a, 2),
            "Tier_B_Solid_Standard": round(mean_b, 2),
            "Tier_C_Minimal_Pushy": round(mean_c, 2),
            "Tier_D_BNM_NonCompliant": round(mean_d, 2),
            "Pairwise_Accuracy_Pct": round(pairwise_acc, 2),
        }


def main() -> int:
    port = _pick_free_port()
    tmp_dir = tempfile.mkdtemp(prefix="prumda_c3_eval_")
    state_file = os.path.join(tmp_dir, "eval_state.json")
    media_dir = os.path.join(tmp_dir, "eval_media")

    env = os.environ.copy()
    env["PORT"] = str(port)
    env["PAMB_STATE_FILE"] = state_file
    env["PAMB_MEDIA_DIR"] = media_dir

    print(f"🚀 Starting isolated Challenge 3 Evaluation Server on http://127.0.0.1:{port} ...", flush=True)
    proc = subprocess.Popen(
        [sys.executable, os.path.join(REPO_DIR, "server.py")],
        cwd=REPO_DIR,
        env=env,
        stdout=subprocess.PIPE,
        stderr=subprocess.STDOUT,
        text=True,
    )

    base_url = f"http://127.0.0.1:{port}"
    try:
        # Wait for server startup
        ready = False
        for _ in range(30):
            try:
                r = requests.get(f"{base_url}/api/state", timeout=1)
                if r.status_code == 200:
                    ready = True
                    break
            except Exception:
                time.sleep(0.2)
        if not ready:
            print("❌ Failed to start local evaluation server!", flush=True)
            return 1

        t_start = time.time()
        runner = EvalRunner(base_url)
        runner.run_suite_1_system_and_scale()
        runner.run_suite_2_greeting_cards()
        runner.run_suite_3_multilingual_generation()
        runner.run_suite_4_judge_calibration()
        elapsed = round(time.time() - t_start, 2)

        passed_cnt = sum(1 for c in runner.checks if c["passed"])
        total_cnt = len(runner.checks)
        pass_rate = round((passed_cnt / total_cnt) * 100.0, 2) if total_cnt else 0.0

        report = {
            "timestamp": time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime()),
            "elapsedSeconds": elapsed,
            "totalChecks": total_cnt,
            "passedChecks": passed_cnt,
            "failedChecks": total_cnt - passed_cnt,
            "passRatePct": pass_rate,
            "calibrationSummary": runner.suite_summaries.get("tier_means", {}),
            "checks": runner.checks,
        }
        report_path = os.path.join(REPO_DIR, "evals", "c3_eval_report.json")
        with open(report_path, "w", encoding="utf-8") as f:
            json.dump(report, f, indent=2, ensure_ascii=False)

        print("\n" + "=" * 76)
        print(f"🏆 CHALLENGE 3 AUTO-EVAL SUMMARY: {passed_cnt}/{total_cnt} PASSED ({pass_rate}%) in {elapsed}s")
        if runner.suite_summaries.get("tier_means"):
            tm = runner.suite_summaries["tier_means"]
            print(
                f"📊 Judge Calibration: Tier A={tm['Tier_A_Master_MDRT']} | "
                f"Tier B={tm['Tier_B_Solid_Standard']} | "
                f"Tier C={tm['Tier_C_Minimal_Pushy']} | "
                f"Tier D (Violation)={tm['Tier_D_BNM_NonCompliant']} | "
                f"Pairwise={tm['Pairwise_Accuracy_Pct']}%"
            )
        print(f"📄 Full Report Saved: {report_path}")
        print("=" * 76, flush=True)

        if passed_cnt < total_cnt:
            print("\n⚠️ FAILING CHECKS:")
            for c in runner.checks:
                if not c["passed"]:
                    print(f"   ❌ [{c['suite']}] {c['name']} -> {c['detail']}")
            return 1
        return 0
    finally:
        proc.terminate()
        try:
            proc.wait(timeout=3)
        except Exception:
            proc.kill()
        shutil.rmtree(tmp_dir, ignore_errors=True)


if __name__ == "__main__":
    sys.exit(main())
