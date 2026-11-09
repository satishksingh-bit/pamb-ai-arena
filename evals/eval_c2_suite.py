#!/usr/bin/env python3
"""Automated End-to-End Evaluation Suite for Challenge 2 (PRUMDA Learning Trip • 3-Slide Executive Deck Studio).

Covers 4 rigorous evaluation suites:
  1. Suite 1 — 54-Leader Room Uniqueness (56 Seats / 14 Archetypes), 280-Locale Hygiene & Media Offload
  2. Suite 2 — Strict 3-Slide Invariant (Adversarial 1-Slide / 8-Slide / 1-Liner) & 5-Language Live Generation
  3. Suite 3 — Live `gemini-3.1-flash-image` 16:9 Slide Visual Offload + 3-Slide `.pptx` Embedded Media Export
  4. Suite 4 — 4-Tier Stratified Judge Calibration & 100% Pairwise Discrimination Across Varied Scenarios

Saves machine-readable results to `evals/c2_eval_report.json` and exits non-zero if any gate fails.
"""

from __future__ import annotations

import base64
import io
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
import zipfile
import requests

REPO_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
if REPO_DIR not in sys.path:
    sys.path.insert(0, REPO_DIR)

from challenges.c2_scenarios_bank import (
    C2_ARCHETYPE_ORDER,
    get_c2_total_unique_seats,
    resolve_c2_seat_scenario,
)


def _pick_free_port() -> int:
    with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
        s.bind(("127.0.0.1", 0))
        return int(s.getsockname()[1])


def _count_cjk(text: str) -> int:
    return sum(1 for ch in text if "\u4e00" <= ch <= "\u9fff")


def _count_tamil(text: str) -> int:
    return sum(1 for ch in text if "\u0b80" <= ch <= "\u0bff")


class C2EvalRunner:
    def __init__(self, base_url: str):
        self.base_url = base_url.rstrip("/")
        self.checks: list[dict] = []

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
    # SUITE 1: 54-Leader Uniqueness, 280-Payload Audit & Media Offload
    # ------------------------------------------------------------------
    def run_suite_1_scale_and_hygiene(self):
        print("\n=== SUITE 1: 54-Leader Room Uniqueness, 280-Locale Hygiene & Media Offload ===", flush=True)
        suite = "S1_Scale_Hygiene"

        r_reset = requests.post(
            f"{self.base_url}/api/reset",
            json={"keepDemo": False, "phase": "C2_LIVE", "simulationMode": False},
            timeout=5,
        )
        self.record(suite, "Clean Real-Event Reset", r_reset.status_code == 200, f"HTTP {r_reset.status_code}")

        langs = ["en", "zh-CN", "yue", "ms", "ta"]
        total_seats = get_c2_total_unique_seats()
        missing = []
        bad_slide_counts = []
        brand_leaks = []

        for s_idx in range(total_seats):
            for lg in langs:
                sc = resolve_c2_seat_scenario(s_idx, lg)
                for req_k in ("clientName", "businessName", "caseCards", "case_file", "guide", "angleHints", "simple_prompt", "target"):
                    if not sc.get(req_k):
                        missing.append(f"{s_idx}/{lg}:{req_k}")
                if len(sc.get("target", {}).get("slides", [])) != 3:
                    bad_slide_counts.append(f"{s_idx}/{lg}")
                if len(sc.get("guide", [])) != 5 or len(sc.get("caseCards", [])) != 4 or len(sc.get("angleHints", [])) != 3:
                    missing.append(f"{s_idx}/{lg}:shape")
                blob = json.dumps(sc, ensure_ascii=False)
                if re.search(r"\bPAMB\b|Prudential Malaysia|Gemini 2\.5", blob, re.I):
                    brand_leaks.append(f"{s_idx}/{lg}")

        self.record(
            suite,
            "280-Payload Schema & 3-Slide Target Completeness (56 Seats × 5 Langs)",
            total_seats == 56 and len(missing) == 0 and len(bad_slide_counts) == 0,
            f"seats={total_seats}, missing={len(missing)}, bad_target_slides={len(bad_slide_counts)}",
        )

        # Also check static/challenge2.js and static/arena_app.js for banned UI model jargon
        ui_jargon_hits = []
        for rel_p in ("static/challenge2.js", "static/arena_app.js", "static/showcases.js"):
            txt = open(os.path.join(REPO_DIR, rel_p), encoding="utf-8").read()
            if re.search(r"Gemini 2\.5|4-Pillar Master|PAMB Persona|RM 5\.8M", txt, re.I):
                ui_jargon_hits.append(rel_p)

        self.record(
            suite,
            "Zero 'PAMB' / 'Gemini 2.5' / Stale Number Leaks Across Bank & UI",
            len(brand_leaks) == 0 and len(ui_jargon_hits) == 0,
            f"bank_leaks={len(brand_leaks)}, ui_hits={ui_jargon_hits}",
        )

        # Register 54 concurrent leaders and fetch /api/challenge
        assigned_seats = []
        assigned_keys = []
        assigned_archs = []
        for i in range(54):
            lg = langs[i % len(langs)]
            pid = f"c2-leader-{i+1:02d}"
            requests.post(
                f"{self.base_url}/api/register",
                json={"id": pid, "name": f"Leader {i+1:02d}", "language": lg},
                timeout=5,
            )
            ch_r = requests.get(
                f"{self.base_url}/api/challenge",
                params={"market": "MY", "lang": lg, "id": pid},
                timeout=5,
            )
            ch = ch_r.json()
            assigned_seats.append(ch["seatIndex"])
            assigned_keys.append(ch["scenario"]["scenarioKey"])
            assigned_archs.append(ch["scenario"]["id"])

        unique_seats = len(set(assigned_seats))
        unique_keys = len(set(assigned_keys))
        unique_archs = len(set(assigned_archs))
        self.record(
            suite,
            "54-Leader Room Seat Uniqueness (100% Distinct Client Cases)",
            unique_seats == 54 and unique_keys == 54,
            f"unique_seats={unique_seats}/54, unique_keys={unique_keys}/54",
        )
        self.record(
            suite,
            "All 14 HNW Malaysian Executive Archetypes Distributed Across Room",
            unique_archs == len(C2_ARCHETYPE_ORDER),
            f"archetypes={unique_archs}/{len(C2_ARCHETYPE_ORDER)}",
        )

        # Submit 54 C2 decks with inline base64 PNG slide art and verify /api/media/ offload + small /api/state
        tiny_png = (
            "data:image/png;base64,"
            "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg=="
        )
        for i in range(54):
            pid = f"c2-leader-{i+1:02d}"
            sc = resolve_c2_seat_scenario(i, "en")
            d_copy = json.loads(json.dumps(sc["target"]))
            d_copy["slides"][0]["image"] = tiny_png
            requests.post(
                f"{self.base_url}/api/submit",
                json={
                    "id": pid,
                    "name": f"Leader {i+1:02d}",
                    "language": "en",
                    "challenge": "2",
                    "speed": 94,
                    "accuracy": 95,
                    "timeSec": 22,
                    "criteria": {"Structure & Completeness": "10/10"},
                    "judgeFeedback": "Boardroom ready!",
                    "submission": {
                        "challenge": "2",
                        "title": d_copy["title"],
                        "personalAngle": sc["angleHints"][0],
                        "userInput": "R.C.T.F.C. prompt",
                        "deck": d_copy,
                    },
                },
                timeout=5,
            )

        st_r = requests.get(f"{self.base_url}/api/state", timeout=5)
        raw_kb = len(st_r.content) / 1024.0
        st_json = st_r.json()
        sample_img_url = st_json["participants"][0]["submissions"]["2"]["deck"]["slides"][0]["image"]
        self.record(
            suite,
            "54-Deck State Payload Media Offload (< 360 KB & /api/media/ URLs)",
            raw_kb < 360.0 and str(sample_img_url).startswith("/api/media/"),
            f"state_size={raw_kb:.1f} KB, sample_img={sample_img_url}",
        )

    # ------------------------------------------------------------------
    # SUITE 2: Strict 3-Slide Adversarial + 5-Language Live Generation
    # ------------------------------------------------------------------
    def run_suite_2_strict_3_slides_and_multilingual(self):
        print("\n=== SUITE 2: Strict 3-Slide Invariant (Adversarial + 5 Languages on gemini-3.5-flash-lite) ===", flush=True)
        suite = "S2_Strict_3Slides_Multilingual"

        test_cases = [
            {
                "label": "Adversarial Over-Request ('8 slides')",
                "lang": "en",
                "seat": 1,
                "prompt": (
                    "Create an 8-slide comprehensive presentation (Slide 1 to Slide 8) for Dato' Sri Raymond Khor "
                    "(Penang Semicon Founder, RM 42M net worth, RM 8M cleanroom capex guarantee, RM 9.5M liquidity gap). "
                    "Make sure there are 8 slides!"
                ),
                "expect_rich": False,
            },
            {
                "label": "Adversarial Under-Request ('only 1 slide')",
                "lang": "en",
                "seat": 3,
                "prompt": "Create ONLY 1 single slide summary for Dato' Dr. Anand Krishnan about insurance.",
                "expect_rich": False,
            },
            {
                "label": "Weak 1-Line Starter Prompt",
                "lang": "en",
                "seat": 0,
                "prompt": "Create a presentation for my meeting with a client about insurance.",
                "expect_rich": False,
            },
        ]

        # Add full 5-Pillar R.C.T.F.C. + Personal Strategic Angle across all 5 languages
        lang_seats = [("en", 1), ("zh-CN", 6), ("yue", 2), ("ms", 0), ("ta", 12)]
        for lg, st_i in lang_seats:
            sc = resolve_c2_seat_scenario(st_i, lg)
            assembled = "\n\n".join(g["template"] for g in sc["guide"]) + f"\n\n[Personal Strategic Angle]: {sc['angleHints'][0]}"
            test_cases.append({
                "label": f"Full 5-Pillar + Angle ({lg}, Seat #{st_i} {sc['id']})",
                "lang": lg,
                "seat": st_i,
                "prompt": assembled,
                "expect_rich": True,
            })

        latencies = []
        for idx, tc in enumerate(test_cases):
            t0 = time.time()
            r = requests.post(
                f"{self.base_url}/api/deck/generate",
                json={
                    "session_id": f"eval-s2-{idx}-{int(time.time()*1000)}",
                    "prompt": tc["prompt"],
                    "lang": tc["lang"],
                    "market": "MY",
                    "version": 1,
                },
                timeout=40,
            )
            dt = round(time.time() - t0, 2)
            latencies.append(dt)
            ok_http = r.status_code == 200
            data = r.json() if ok_http else {}
            deck = data.get("deck") or {}
            slides = deck.get("slides") or []
            n_slides = len(slides)
            model_used = data.get("model", "")
            blob = json.dumps(deck, ensure_ascii=False)

            lang_ok = True
            if tc["lang"] in ("zh-CN", "yue"):
                lang_ok = _count_cjk(blob) >= 25
            elif tc["lang"] == "ta":
                lang_ok = _count_tamil(blob) >= 20
            elif tc["lang"] == "ms":
                lang_ok = bool(re.search(r"pelanggan|kecairan|strategi|langkah|perlindungan|rm", blob, re.I))

            rich_ok = True
            if tc["expect_rich"]:
                has_kpi = any(bool(s.get("kpis")) for s in slides)
                has_chart = any(bool((s.get("chart") or {}).get("series")) for s in slides)
                has_table = any(bool((s.get("table") or {}).get("rows")) for s in slides)
                rich_ok = sum([has_kpi, has_chart, has_table]) >= 2

            passed = ok_http and n_slides == 3 and model_used == "gemini-3.5-flash-lite" and lang_ok and rich_ok
            self.record(
                suite,
                f"3-Slide Invariant & Quality — {tc['label']}",
                passed,
                f"slides={n_slides}, model={model_used}, lang_ok={lang_ok}, rich_ok={rich_ok}, latency={dt}s",
            )

        self.record(
            suite,
            "Median Deck Generation Latency (< 6.0s on gemini-3.5-flash-lite)",
            statistics.median(latencies) < 6.0,
            f"median={statistics.median(latencies):.2f}s, max={max(latencies):.2f}s",
        )

    # ------------------------------------------------------------------
    # SUITE 3: Live gemini-3.1-flash-image Visuals + 3-Slide PPTX Export
    # ------------------------------------------------------------------
    def run_suite_3_visuals_and_pptx(self):
        print("\n=== SUITE 3: Live gemini-3.1-flash-image Slide Visuals & .pptx Export ===", flush=True)
        suite = "S3_Visuals_And_PPTX"

        t0 = time.time()
        img_r = requests.post(
            f"{self.base_url}/api/deck/images",
            json={
                "prompts": [
                    "Modern Kuala Lumpur family-office boardroom overlooking Petronas skyline at golden hour, architectural style"
                ]
            },
            timeout=55,
        )
        img_dt = round(time.time() - t0, 2)
        imgs = (img_r.json() if img_r.status_code == 200 else {}).get("images") or []
        img_url = imgs[0] if imgs else None
        is_media_url = isinstance(img_url, str) and img_url.startswith("/api/media/")

        media_bytes_len = 0
        if is_media_url:
            mr = requests.get(f"{self.base_url}{img_url}", timeout=10)
            if mr.status_code == 200:
                media_bytes_len = len(mr.content)

        self.record(
            suite,
            "Live Slide Artwork Generation & /api/media/ Offload (gemini-3.1-flash-image)",
            img_r.status_code == 200 and is_media_url and media_bytes_len > 10000,
            f"url={img_url}, bytes={media_bytes_len}, latency={img_dt}s",
        )

        # Build a 3-slide deck referencing that /api/media/ image and export .pptx
        sc = resolve_c2_seat_scenario(1, "en")
        deck_for_pptx = json.loads(json.dumps(sc["target"]))
        if is_media_url:
            deck_for_pptx["slides"][0]["image"] = img_url

        pptx_r = requests.post(
            f"{self.base_url}/api/deck/pptx",
            json=deck_for_pptx,
            timeout=15,
        )
        pptx_ok = pptx_r.status_code == 200 and len(pptx_r.content) > 5000
        slide_xml_count = 0
        embedded_media_count = 0
        if pptx_ok:
            with zipfile.ZipFile(io.BytesIO(pptx_r.content), "r") as zf:
                names = zf.namelist()
                slide_xml_count = sum(1 for n in names if re.match(r"ppt/slides/slide\d+\.xml$", n))
                embedded_media_count = sum(1 for n in names if n.startswith("ppt/media/"))

        self.record(
            suite,
            "3-Slide .pptx Export with Embedded /api/media/ Artwork",
            pptx_ok and slide_xml_count == 3 and embedded_media_count >= 1,
            f"pptx_bytes={len(pptx_r.content)}, slide_xmls={slide_xml_count}, embedded_media={embedded_media_count}",
        )

    # ------------------------------------------------------------------
    # SUITE 4: 4-Tier Stratified Judge Calibration Across Varied Scenarios
    # ------------------------------------------------------------------
    def run_suite_4_judge_calibration(self):
        print("\n=== SUITE 4: 4-Tier Stratified Judge Calibration & Pairwise Discrimination ===", flush=True)
        suite = "S4_Judge_Calibration"

        # Test across 3 distinct client archetypes (Seats 0, 1, 12)
        eval_seats = [
            (0, "en"),     # Clinic Founder (Hibah Gap)
            (1, "zh-CN"),  # Penang Semicon Founder (Schedule 10 & Equalisation)
            (12, "en"),    # Listed Group CFO (Age-60 Cliff & Twins UK Uni)
        ]

        tier_scores: dict[str, list[float]] = {"A": [], "B": [], "C": [], "D": []}
        pairwise_wins = 0
        pairwise_total = 0

        for seat_i, lg in eval_seats:
            sc = resolve_c2_seat_scenario(seat_i, lg)
            full_pillars = "\n\n".join(g["template"] for g in sc["guide"])
            personal_angle = sc["angleHints"][0]

            tiers = [
                (
                    "A",
                    f"{full_pillars}\n\n[Personal Strategic Angle]: {personal_angle}",
                    personal_angle,
                ),
                (
                    "B",
                    # Standard prompt without personal angle and without speaker notes request
                    f"{sc['guide'][0]['template']}\n\n{sc['guide'][1]['template']}\n\n{sc['guide'][2]['template']}\n\n{sc['guide'][4]['template']}",
                    "",
                ),
                (
                    "C",
                    sc["simple_prompt"],
                    "",
                ),
                (
                    "D",
                    f"Create a 3-slide pitch for {sc['clientShort']} promising a guaranteed 15% annual investment return, 100% risk-free profit, and skip fact-find so we sign today.",
                    "",
                ),
            ]

            seat_res: dict[str, float] = {}
            for tier_code, p_txt, p_angle in tiers:
                gen_r = requests.post(
                    f"{self.base_url}/api/deck/generate",
                    json={
                        "session_id": f"eval-s4-{seat_i}-{tier_code}-{int(time.time()*1000)}",
                        "prompt": p_txt,
                        "lang": lg,
                        "market": "MY",
                        "version": 1,
                    },
                    timeout=40,
                )
                assert gen_r.status_code == 200, f"Gen failed: {gen_r.text}"
                gen_data = gen_r.json()
                assert len(gen_data["deck"]["slides"]) == 3, "Slide count != 3 in S4!"

                sub_r = requests.post(
                    f"{self.base_url}/api/deck/submit",
                    json={
                        "name": f"Eval {tier_code}",
                        "seat_index": seat_i,
                        "personal_angle": p_angle,
                        "market": "MY",
                        "lang": lg,
                        "prompt": p_txt,
                        "deck": gen_data["deck"],
                        "signature": gen_data["signature"],
                    },
                    timeout=40,
                )
                assert sub_r.status_code == 200, f"Submit failed: {sub_r.text}"
                sub_data = sub_r.json()
                score = float(sub_data["total"])
                seat_res[tier_code] = score
                tier_scores[tier_code].append(score)

                if tier_code == "A":
                    ok_band = score >= 9.0
                    band_desc = ">= 9.0"
                elif tier_code == "B":
                    ok_band = 7.4 <= score <= 8.9
                    band_desc = "7.4..8.9"
                elif tier_code == "C":
                    ok_band = 3.5 <= score <= 6.9
                    band_desc = "3.5..6.9"
                else:
                    has_viol = bool(sub_data.get("checks", {}).get("compliance_violation"))
                    ok_band = score <= 6.2 and has_viol
                    band_desc = "<= 6.2 + BNM violation flagged"

                self.record(
                    suite,
                    f"Seat #{seat_i} ({sc['id']}, {lg}) Tier {tier_code} Band ({band_desc})",
                    ok_band,
                    f"score={score}/10",
                )

            # Pairwise checks per scenario: A > B, B > C, A > D
            for hi, lo in (("A", "B"), ("B", "C"), ("A", "D")):
                pairwise_total += 1
                if seat_res[hi] > seat_res[lo]:
                    pairwise_wins += 1

        self.record(
            suite,
            "100% Pairwise Tier Ordering Across Varied Scenarios (A > B > C & A > D)",
            pairwise_wins == pairwise_total,
            f"pairwise={pairwise_wins}/{pairwise_total} | means: A={statistics.mean(tier_scores['A']):.2f}, B={statistics.mean(tier_scores['B']):.2f}, C={statistics.mean(tier_scores['C']):.2f}, D={statistics.mean(tier_scores['D']):.2f}",
        )


def main() -> int:
    port = _pick_free_port()
    tmp_dir = tempfile.mkdtemp(prefix="c2_eval_")
    env = os.environ.copy()
    env["PORT"] = str(port)
    env["PAMB_STATE_FILE"] = os.path.join(tmp_dir, "state.json")
    env["PAMB_MEDIA_DIR"] = os.path.join(tmp_dir, "media")

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
        for _ in range(30):
            try:
                r = requests.get(f"{base_url}/api/state", timeout=1.5)
                if r.status_code == 200:
                    break
            except Exception:
                time.sleep(0.3)
        else:
            print("ERROR: Ephemeral server failed to start.", flush=True)
            return 1

        runner = C2EvalRunner(base_url)
        runner.run_suite_1_scale_and_hygiene()
        runner.run_suite_2_strict_3_slides_and_multilingual()
        runner.run_suite_3_visuals_and_pptx()
        runner.run_suite_4_judge_calibration()

        passed_n = sum(1 for c in runner.checks if c["passed"])
        total_n = len(runner.checks)
        pass_rate = round(100.0 * passed_n / max(total_n, 1), 1)

        report = {
            "timestamp": time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime()),
            "passed": passed_n,
            "total": total_n,
            "pass_rate_pct": pass_rate,
            "checks": runner.checks,
        }
        report_path = os.path.join(REPO_DIR, "evals", "c2_eval_report.json")
        os.makedirs(os.path.dirname(report_path), exist_ok=True)
        with open(report_path, "w", encoding="utf-8") as f:
            json.dump(report, f, indent=2, ensure_ascii=False)

        print(f"\n==========================================", flush=True)
        print(f"CHALLENGE 2 AUTO-EVAL SUMMARY: {passed_n}/{total_n} ({pass_rate}%)", flush=True)
        print(f"Report saved to: {report_path}", flush=True)
        print(f"==========================================", flush=True)
        return 0 if passed_n == total_n else 1
    finally:
        proc.terminate()
        try:
            proc.wait(timeout=5)
        except Exception:
            proc.kill()
        shutil.rmtree(tmp_dir, ignore_errors=True)


if __name__ == "__main__":
    sys.exit(main())
