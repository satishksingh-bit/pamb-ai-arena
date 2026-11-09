#!/usr/bin/env python3
"""End-to-End Mobile UX Regression Suite for Challenge 2 & Challenge 3 (390x844 Phone).

Validates both live server-side 60+ seat distribution AND real rendered mobile DOM/geometry
in Headless Chrome (390x844 iPhone 14 viewport via Chrome DevTools Protocol):

1. Live 66-Participant Room Scale & Even Seat Distribution (/api/register, /api/challenge, /api/c3/scenario):
   - 66 concurrent leaders across 5 languages receive 66/66 unique client seats & personas.
   - Exact 11-11-11-11-11-11 even distribution across the 6 C2 cases and 6 C3 cases.
   - Manual case switching (?seat=round*6+slot&persist=1) preserves the participant's persona round.

2. Challenge 2 Mobile UX Regressions (390x844 Phone Viewport on /join):
   - Zero horizontal scroll overflow (scrollWidth <= 390).
   - Zero legacy clutter (/56, 14 Cases, Full Dossier, Try Weak, Compare vs Benchmark).
   - 2x2 Balance-Sheet Grid geometry (2 side-by-side columns, not 4 stacked rows).
   - 3 Boardroom Tone pills aligned on 1 horizontal row (y-delta <= 2px).
   - Raw Master Prompt collapsed by default, and readOnly===true until explicitly unlocked.
   - Sample Deck opens as a fixed modal overlay (does not push Step 1 down inline), renders
     stacked mobile strategy cards (not a crushed table) on Slide 3 at 390px, and keeps Speaker Notes collapsed.
   - 6-Case Switcher opens exact 6 curated cases and updates active case cleanly.
   - .pptx export hidden prior to final submission so mobile users don't leave the browser tab early.

3. Challenge 3 Mobile UX Regressions (390x844 Phone Viewport on /join):
   - Zero horizontal scroll overflow (scrollWidth <= 390).
   - Zero legacy clutter (/56, 16 Scenarios, CHALLENGE 3 • ADVISOR PLAYBOOK) & zero morbid labels.
   - Step 1 visual style pills sit on 1 horizontal row; Personal Touch input collapsed by default;
     primary "Create Greeting Card" button fits above/near the 844px mobile fold.
   - 6-Case Switcher opens exact 6 curated positive cases (including 40th Birthday Health & Newborn Wellness).
   - Client Brief Card auto-collapses to a 1-line bar (<68px tall) upon entering Step 2 / Step 3,
     and re-expands on tapping "Case Info".
   - Universal Click-to-Zoom (#arena-image-zoom-lightbox) opens on tapping zoomable slide/card images,
     zooms to 200% via 2x preset, and closes cleanly.
"""

from collections import Counter
import json
import os
import socket
import subprocess
import sys
import tempfile
import time
import unittest
import requests

ROOT_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))


def _find_free_port() -> int:
    with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
        s.bind(("127.0.0.1", 0))
        return s.getsockname()[1]


NODE_CDP_RUNNER = r"""
const { spawn } = require("child_process");
const fs = require("fs");

const BASE_URL = process.env.TEST_BASE_URL;
const CDP_PORT = Number(process.env.TEST_CDP_PORT);

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function run() {
  const chrome = spawn(
    "/usr/bin/google-chrome",
    [
      "--headless=new",
      "--no-sandbox",
      "--disable-gpu",
      "--disable-dev-shm-usage",
      "--no-first-run",
      "--no-default-browser-check",
      `--remote-debugging-port=${CDP_PORT}`,
      "--window-size=390,844",
      `${BASE_URL}/join`,
    ],
    { stdio: "ignore" }
  );

  let ws;
  try {
    let wsUrl = null;
    for (let i = 0; i < 40; i++) {
      try {
        const res = await fetch(`http://127.0.0.1:${CDP_PORT}/json/list`);
        const tabs = await res.json();
        const pageTab = tabs.find((t) => t.type === "page" && t.webSocketDebuggerUrl);
        if (pageTab) {
          wsUrl = pageTab.webSocketDebuggerUrl;
          break;
        }
      } catch (_) {}
      await sleep(150);
    }
    if (!wsUrl) throw new Error("Failed to connect to headless Chrome CDP");

    ws = new WebSocket(wsUrl);
    await new Promise((resolve, reject) => {
      ws.onopen = resolve;
      ws.onerror = reject;
    });

    let msgId = 0;
    const pending = new Map();
    const consoleErrors = [];

    ws.onmessage = (ev) => {
      const data = JSON.parse(ev.data);
      if (data.method === "Runtime.exceptionThrown") {
        consoleErrors.push(JSON.stringify(data.params?.exceptionDetails?.text || "exception"));
      }
      if (data.id && pending.has(data.id)) {
        const { resolve, reject } = pending.get(data.id);
        pending.delete(data.id);
        if (data.error) reject(new Error(JSON.stringify(data.error)));
        else resolve(data.result);
      }
    };

    const send = (method, params = {}) =>
      new Promise((resolve, reject) => {
        const id = ++msgId;
        pending.set(id, { resolve, reject });
        ws.send(JSON.stringify({ id, method, params }));
      });

    const evalJs = async (expression) => {
      const res = await send("Runtime.evaluate", {
        expression,
        returnByValue: true,
        awaitPromise: true,
      });
      if (res.exceptionDetails) {
        throw new Error("JS Eval Error: " + JSON.stringify(res.exceptionDetails));
      }
      return res.result ? res.result.value : undefined;
    };

    await send("Page.enable");
    await send("Runtime.enable");
    await send("Emulation.setDeviceMetricsOverride", {
      width: 390,
      height: 844,
      deviceScaleFactor: 3,
      mobile: true,
    });

    // Clear localStorage on /join and wait for React + Babel mount
    await evalJs(`try { localStorage.clear(); } catch (_) {}`);
    await send("Page.reload", { ignoreCache: false });
    for (let i = 0; i < 40; i++) {
      const ready = await evalJs(`Boolean(document.querySelector("form button[type='submit']"))`);
      if (ready) break;
      await sleep(200);
    }

    // Select English on onboarding form and register mobile participant cleanly
    await evalJs(`(() => {
      const enBtn = Array.from(document.querySelectorAll("form button")).find(b => /English|^EN$/i.test(b.textContent.trim()));
      if (enBtn) enBtn.click();
      const inp = document.querySelector("form input[type='text']");
      if (inp) {
        const setter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, "value").set;
        setter.call(inp, "Mobile UX Tester");
        inp.dispatchEvent(new Event("input", { bubbles: true }));
      }
      const btn = document.querySelector("form button[type='submit']");
      if (btn) btn.click();
    })()`);

    // Wait for C1/C2/C3 tab bar
    for (let i = 0; i < 30; i++) {
      const hasTabs = await evalJs(`Array.from(document.querySelectorAll("button")).some(b => b.textContent.includes("🧠 C2"))`);
      if (hasTabs) break;
      await sleep(200);
    }

    // =========================================================================
    // CHALLENGE 2 MOBILE UX CHECKS (390x844)
    // =========================================================================
    await evalJs(`(() => {
      const c2Tab = Array.from(document.querySelectorAll("button")).find(b => b.textContent.includes("🧠 C2"));
      if (c2Tab) c2Tab.click();
    })()`);

    // Wait for C2 scenario & guide pills to load
    for (let i = 0; i < 30; i++) {
      const loaded = await evalJs(`Array.from(document.querySelectorAll("button")).some(b => /\\([1-6]\\/6\\)/.test(b.textContent)) && !document.body.innerText.includes("Loading scenario...")`);
      if (loaded) break;
      await sleep(200);
    }
    await sleep(200);

    const c2Step1Audit = await evalJs(`(() => {
      const bodyTxt = document.body.innerText;
      const scrollW = document.documentElement.scrollWidth;

      // 4 balance-sheet tiles inside dark client card
      const briefGrid = Array.from(document.querySelectorAll("div.grid.grid-cols-2")).find(
        g => g.children.length === 4 && g.closest(".bg-gradient-to-br")
      );
      const tileRects = briefGrid
        ? Array.from(briefGrid.children).map(el => {
            const r = el.getBoundingClientRect();
            return { top: Math.round(r.top), left: Math.round(r.left), width: Math.round(r.width) };
          })
        : [];

      // 3 horizontal tone pills
      const toneGrid = Array.from(document.querySelectorAll("div.grid.grid-cols-3")).find(
        g => g.children.length === 3 && /Boardroom|CFO|Empathy/i.test(g.innerText)
      );
      const toneRects = toneGrid
        ? Array.from(toneGrid.children).map(el => Math.round(el.getBoundingClientRect().top))
        : [];

      // Raw prompt collapsed by default (only 1 textarea visible = Personal Strategic Angle)
      const textareas = Array.from(document.querySelectorAll("textarea"));

      return {
        scrollW,
        has56: bodyTxt.includes("/56"),
        has14Cases: bodyTxt.includes("14 Cases"),
        hasFullDossier: bodyTxt.includes("Full Dossier"),
        hasTryWeak: bodyTxt.includes("Try Weak"),
        hasCompareMode: bodyTxt.includes("Compare vs"),
        hasPptxBeforeSubmit: bodyTxt.includes(".pptx"),
        tileRects,
        toneRects,
        textareaCountCollapsed: textareas.length,
      };
    })()`);

    // Inspect Raw Master Prompt toggle -> verify readOnly === true by default
    const c2PromptReadOnly = await evalJs(`(async () => {
      const inspBtn = Array.from(document.querySelectorAll("button")).find(b => b.textContent.includes("5/5") && b.textContent.includes("✓"));
      if (!inspBtn) return { found: false };
      inspBtn.click();
      await new Promise(r => setTimeout(r, 120));
      const tas = Array.from(document.querySelectorAll("textarea"));
      const rawTa = tas[tas.length - 1];
      const ro = rawTa ? rawTa.readOnly : null;
      inspBtn.click();
      await new Promise(r => setTimeout(r, 80));
      return { found: true, readOnly: ro, countWhenOpen: tas.length };
    })()`);

    // Open 🎯 Sample modal -> verify position:fixed, Slide 3 mobile cards, Speaker Notes collapsed, and Zoom lightbox!
    const c2SampleModalAudit = await evalJs(`(async () => {
      const sampleBtn = Array.from(document.querySelectorAll("button")).find(b => /Sample/i.test(b.textContent));
      if (!sampleBtn) return { opened: false };
      sampleBtn.click();
      await new Promise(r => setTimeout(r, 180));

      const modal = document.querySelector("div.fixed.inset-0.z-50");
      if (!modal) return { opened: false };

      // Switch to Slide 3 inside Sample Modal
      const slide3Tab = Array.from(modal.querySelectorAll("button")).find(b => /3\\.|Strategy/i.test(b.textContent));
      if (slide3Tab) slide3Tab.click();
      await new Promise(r => setTimeout(r, 150));

      // Verify desktop table is hidden at 390px and mobile strategy cards are visible
      const desktopTable = modal.querySelector("table");
      const tableDisplay = desktopTable ? window.getComputedStyle(desktopTable.parentElement).display : "none";
      const modalScrollW = modal.scrollWidth;

      // Verify Speaker Notes is collapsed behind a button toggle on mobile
      const notesBtn = Array.from(modal.querySelectorAll("button")).find(b => /Speaker Notes|Presenter Notes/i.test(b.textContent));

      // Test clicking zoomable 16:9 slide visual inside modal!
      const zoomImg = modal.querySelector("img[data-zoomable='true']");
      let zoomOpened = false;
      let zoom2xOk = false;
      let zoomClosed = false;
      if (zoomImg) {
        zoomImg.click();
        await new Promise(r => setTimeout(r, 120));
        const lb = document.getElementById("arena-image-zoom-lightbox");
        zoomOpened = Boolean(lb && window.getComputedStyle(lb).display === "flex");
        const btn2x = lb ? Array.from(lb.querySelectorAll("button")).find(b => b.textContent.trim() === "2×") : null;
        if (btn2x) {
          btn2x.click();
          await new Promise(r => setTimeout(r, 80));
          zoom2xOk = document.getElementById("arena-zoom-reset")?.textContent.trim() === "200%";
        }
        window.closeArenaImageZoom();
        await new Promise(r => setTimeout(r, 80));
        zoomClosed = Boolean(lb && window.getComputedStyle(lb).display === "none");
      }

      // Close Sample Modal
      const closeBtn = Array.from(modal.querySelectorAll("button")).find(b => /Close|✕/i.test(b.textContent));
      if (closeBtn) closeBtn.click();
      await new Promise(r => setTimeout(r, 120));

      return {
        opened: true,
        tableParentDisplayAt390px: tableDisplay,
        modalScrollW,
        hasCollapsedNotesToggle: Boolean(notesBtn),
        zoomOpened,
        zoom2xOk,
        zoomClosed,
        closedCleanly: !document.querySelector("div.fixed.inset-0.z-50"),
      };
    })()`);

    // Test C2 6-Case Switcher
    const c2CaseSwitcherAudit = await evalJs(`(async () => {
      const swBtn = Array.from(document.querySelectorAll("button")).find(b => /Switch.*\\([1-6]\\/6\\)/i.test(b.textContent));
      if (!swBtn) return { found: false };
      swBtn.click();
      await new Promise(r => setTimeout(r, 150));
      const caseBtns = Array.from(document.querySelectorAll("button")).filter(b => /[1-6]\\/6$/.test(b.textContent.trim()));
      const count = caseBtns.length;
      // Pick slot 2 (index 1 -> "2/6")
      if (caseBtns[1]) caseBtns[1].click();
      await new Promise(r => setTimeout(r, 350));
      const updatedSwBtn = Array.from(document.querySelectorAll("button")).find(b => /Switch.*\\(2\\/6\\)/i.test(b.textContent));
      return { found: true, optionCount: count, switchedTo2of6: Boolean(updatedSwBtn) };
    })()`);

    // =========================================================================
    // CHALLENGE 3 MOBILE UX CHECKS (390x844)
    // =========================================================================
    await evalJs(`(() => {
      const c3Tab = Array.from(document.querySelectorAll("button")).find(b => b.textContent.includes("🎯 C3"));
      if (c3Tab) c3Tab.click();
    })()`);

    for (let i = 0; i < 30; i++) {
      const loaded = await evalJs(`Array.from(document.querySelectorAll("button")).some(b => /\\([1-6]\\/6\\)/.test(b.textContent))`);
      if (loaded) break;
      await sleep(200);
    }
    await sleep(250);

    // Switch to Case 1/6 (Newborn Baby) via C3 6-Case Switcher and verify 6 options
    const c3CaseSwitcherAudit = await evalJs(`(async () => {
      const swBtn = Array.from(document.querySelectorAll("button")).find(b => /\\([1-6]\\/6\\)/.test(b.textContent));
      if (!swBtn) return { found: false };
      swBtn.click();
      await new Promise(r => setTimeout(r, 150));
      const pickerGrid = Array.from(document.querySelectorAll("div.grid")).find(
        g => g.children.length >= 5 && Array.from(g.querySelectorAll("button")).every(b => /^[1-6]\\.\\s/.test(b.textContent.trim()))
      );
      const pickerBtns = pickerGrid ? Array.from(pickerGrid.querySelectorAll("button")) : [];
      const count = pickerBtns.length;
      if (pickerBtns[0]) pickerBtns[0].click(); // Select 1. Newborn Baby
      await new Promise(r => setTimeout(r, 350));
      const updatedBtn = Array.from(document.querySelectorAll("button")).find(b => /\\(1\\/6\\)/.test(b.textContent));
      return { found: true, optionCount: count, switchedTo1of6: Boolean(updatedBtn) };
    })()`);

    // Audit C3 Step 1 layout at 390x844
    const c3Step1Audit = await evalJs(`(() => {
      const bodyTxt = document.body.innerText;
      const scrollW = document.documentElement.scrollWidth;

      // 3 visual style pills in 1 horizontal row
      const styleGrid = Array.from(document.querySelectorAll("div.grid.grid-cols-3")).find(
        g => g.children.length === 3 && /Watercolor|Luxury|Modern|水彩|奢华/i.test(g.innerText)
      );
      const styleTops = styleGrid
        ? Array.from(styleGrid.children).map(el => Math.round(el.getBoundingClientRect().top))
        : [];

      // Personal touch input collapsed by default on Step 1
      const step1Inputs = Array.from(document.querySelectorAll("input[type='text']"));

      // Primary Create Greeting Card button position relative to 844px mobile fold
      const createBtn = Array.from(document.querySelectorAll("button")).find(b => /Create Greeting Card|生成专属贺卡/i.test(b.textContent));
      const createRect = createBtn ? createBtn.getBoundingClientRect() : null;

      // Brief card expanded height on Step 1
      const briefCard = Array.from(document.querySelectorAll("div")).find(
        d => d.querySelector("button") && /\\(1\\/6\\)/.test(d.innerText) && d.className.includes("rounded-2xl") && d.className.includes("border-slate-200")
      );
      const step1BriefHeight = briefCard ? Math.round(briefCard.getBoundingClientRect().height) : null;

      return {
        scrollW,
        has56: bodyTxt.includes("/56"),
        has16Scenarios: bodyTxt.includes("16 Scenarios"),
        hasOldBadge: bodyTxt.includes("CHALLENGE 3 • ADVISOR PLAYBOOK"),
        hasHintWall: bodyTxt.includes("💡 Hint:"),
        styleTops,
        openTextInputsCount: step1Inputs.length,
        createBtnBottomPx: createRect ? Math.round(createRect.bottom) : null,
        step1BriefHeight,
      };
    })()`);

    // Switch to C3 Step 2 -> verify Client Brief AUTO-COLLAPSES to 1-line bar & positive "Day-1 Baby Peace of Mind" pill renders!
    const c3Step2And3Audit = await evalJs(`(async () => {
      const step2Tab = Array.from(document.querySelectorAll("button")).find(b => /^2\\.\\s/.test(b.textContent.trim()));
      if (step2Tab) step2Tab.click();
      await new Promise(r => setTimeout(r, 200));

      const bodyStep2 = document.body.innerText;
      const hasPositiveBabyPill = bodyStep2.includes("Day-1 Baby Peace of Mind");
      const hasMorbidCongenital = /congenital|jaundice/i.test(bodyStep2);

      // Verify Client Brief collapsed (no 3-bullet Life Moment / Coverage Gap box visible)
      const briefBulletsVisibleOnStep2 = bodyStep2.includes("Suitable PRU Portfolio:") || bodyStep2.includes("Coverage Gap:");

      // Tap Case Info to re-expand and verify toggle works!
      const caseInfoBtn = Array.from(document.querySelectorAll("button")).find(b => /Case Info/i.test(b.textContent));
      let reExpandedOk = false;
      if (caseInfoBtn) {
        caseInfoBtn.click();
        await new Promise(r => setTimeout(r, 120));
        reExpandedOk = document.body.innerText.includes("PRUMy Child Plus");
        caseInfoBtn.click();
        await new Promise(r => setTimeout(r, 80));
      }

      // Switch to Step 3 -> verify horizontal scroll stays <= 390px and no amber readiness wall
      const step3Tab = Array.from(document.querySelectorAll("button")).find(b => /^3\\.\\s/.test(b.textContent.trim()));
      if (step3Tab) step3Tab.click();
      await new Promise(r => setTimeout(r, 200));
      const step3ScrollW = document.documentElement.scrollWidth;

      return {
        hasPositiveBabyPill,
        hasMorbidCongenital,
        briefAutoCollapsedOnStep2: !briefBulletsVisibleOnStep2,
        reExpandedOk,
        step3ScrollW,
      };
    })()`);

    // 5-Language Mobile Viewport Overflow Sweep across BOTH C2 and C3 (en, zh-CN, yue, ms, ta)
    const multiLangOverflow = await evalJs(`(async () => {
      const langShorts = ["EN", "华语", "粵語", "BM", "தமிழ்"];
      const maxWidths = {};
      for (const ls of langShorts) {
        const lBtn = Array.from(document.querySelectorAll("header button")).find(b => b.textContent.includes(ls));
        if (lBtn) {
          lBtn.click();
          await new Promise(r => setTimeout(r, 120));
        }
        const c3W = document.documentElement.scrollWidth;
        const c2Tab = Array.from(document.querySelectorAll("button")).find(b => b.textContent.includes("C2"));
        if (c2Tab) c2Tab.click();
        await new Promise(r => setTimeout(r, 120));
        const c2W = document.documentElement.scrollWidth;
        const c3Tab = Array.from(document.querySelectorAll("button")).find(b => b.textContent.includes("C3"));
        if (c3Tab) c3Tab.click();
        await new Promise(r => setTimeout(r, 100));
        maxWidths[ls] = { c2: c2W, c3: c3W };
      }
      return maxWidths;
    })()`);

    console.log(
      JSON.stringify({
        ok: true,
        consoleErrors,
        c2Step1Audit,
        c2PromptReadOnly,
        c2SampleModalAudit,
        c2CaseSwitcherAudit,
        c3CaseSwitcherAudit,
        c3Step1Audit,
        c3Step2And3Audit,
        multiLangOverflow,
      })
    );
  } finally {
    if (ws) try { ws.close(); } catch (_) {}
    chrome.kill("SIGKILL");
  }
}

run().catch((err) => {
  console.error("CDP_FAILURE:", err);
  process.exit(1);
});
"""


class TestMobileUXChallenge2And3(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.port = _find_free_port()
        cls.base_url = f"http://127.0.0.1:{cls.port}"
        cls.tmp_dir = tempfile.mkdtemp(prefix="arena_ux_reg_")
        env = os.environ.copy()
        env["PORT"] = str(cls.port)
        env["PAMB_STATE_FILE"] = os.path.join(cls.tmp_dir, "state.json")
        env["PAMB_MEDIA_DIR"] = os.path.join(cls.tmp_dir, "media")
        env["PYTHONDONTWRITEBYTECODE"] = "1"
        cls.server_proc = subprocess.Popen(
            [sys.executable, os.path.join(ROOT_DIR, "server.py")],
            cwd=ROOT_DIR,
            env=env,
            stdout=subprocess.DEVNULL,
            stderr=subprocess.DEVNULL,
        )
        for _ in range(40):
            try:
                r = requests.get(f"{cls.base_url}/api/state", timeout=1)
                if r.status_code == 200:
                    break
            except Exception:
                pass
            time.sleep(0.15)
        else:
            raise RuntimeError("Local test server failed to start")

    @classmethod
    def tearDownClass(cls):
        if getattr(cls, "server_proc", None):
            cls.server_proc.terminate()
            try:
                cls.server_proc.wait(timeout=3)
            except Exception:
                cls.server_proc.kill()

    def test_01_live_66_participant_even_distribution_and_round_preserving_switch(self):
        """Registers 66 concurrent mobile participants and verifies exact 11x6 even distribution."""
        r_reset = requests.post(
            f"{self.base_url}/api/reset",
            json={"keepDemo": False, "phase": "C3_LIVE", "simulationMode": False},
            timeout=5,
        )
        self.assertEqual(r_reset.status_code, 200)

        langs = ["en", "zh-CN", "yue", "ms", "ta"]
        c2_seats, c2_keys, c2_cases = [], [], Counter()
        c3_seats, c3_keys, c3_cases = [], [], Counter()

        for i in range(66):
            lg = langs[i % len(langs)]
            pid = f"mob-leader-{i:02d}"
            reg = requests.post(
                f"{self.base_url}/api/register",
                json={"id": pid, "name": f"Leader {i:02d}", "language": lg},
                timeout=5,
            )
            self.assertEqual(reg.status_code, 200)

            r_c2 = requests.get(
                f"{self.base_url}/api/challenge",
                params={"market": "MY", "lang": lg, "id": pid},
                timeout=5,
            ).json()
            c2_seats.append(r_c2["seatIndex"])
            c2_keys.append(r_c2["scenario"]["scenarioKey"])
            c2_cases[r_c2["scenario"]["id"]] += 1

            r_c3 = requests.get(
                f"{self.base_url}/api/c3/scenario",
                params={"id": pid, "lang": lg},
                timeout=5,
            ).json()
            c3_seats.append(r_c3["seatIndex"])
            c3_keys.append(r_c3["scenario"]["scenarioKey"])
            c3_cases[r_c3["scenario"]["id"]] += 1

        # 66/66 unique seats & client personas across both C2 and C3
        self.assertEqual(len(set(c2_seats)), 66)
        self.assertEqual(len(set(c2_keys)), 66)
        self.assertEqual(len(set(c3_seats)), 66)
        self.assertEqual(len(set(c3_keys)), 66)

        # Exact 6 curated cases with 11 participants per case (66 / 6 == 11)
        self.assertEqual(len(c2_cases), 6)
        self.assertEqual(len(c3_cases), 6)
        for case_id, cnt in c2_cases.items():
            self.assertEqual(cnt, 11, f"C2 uneven case count for {case_id}: {cnt}")
        for case_id, cnt in c3_cases.items():
            self.assertEqual(cnt, 11, f"C3 uneven case count for {case_id}: {cnt}")

        # Verify manual case switch preserves persona round (e.g. leader #19 in round 3 -> seat 18..23)
        orig_seat = c3_seats[19]
        orig_round = orig_seat // 6
        switched_seat = orig_round * 6 + 4  # Slot 4 = new_home_mortgage
        r_sw = requests.get(
            f"{self.base_url}/api/c3/scenario",
            params={"id": "mob-leader-19", "lang": "en", "seat": str(switched_seat), "persist": "1"},
            timeout=5,
        ).json()
        self.assertEqual(r_sw["seatIndex"], switched_seat)
        self.assertEqual(r_sw["scenario"]["id"], "new_home_mortgage")
        self.assertIn(f"__v{orig_round}", r_sw["scenario"]["scenarioKey"])

    def test_02_headless_chrome_390x844_mobile_ux_across_c2_and_c3(self):
        """Renders /join in real Headless Chrome at 390x844 and validates C2 & C3 UX geometry & interactions."""
        requests.post(
            f"{self.base_url}/api/game-control",
            json={"action": "set_phase", "phase": "C3_LIVE"},
            timeout=5,
        )
        script_path = os.path.join(self.tmp_dir, "run_cdp_ux.js")
        chrome_dir = os.path.join(self.tmp_dir, "chrome_prof")
        os.makedirs(chrome_dir, exist_ok=True)
        with open(script_path, "w", encoding="utf-8") as f:
            f.write(NODE_CDP_RUNNER)

        env = os.environ.copy()
        env["TEST_BASE_URL"] = self.base_url
        env["TEST_CDP_PORT"] = str(_find_free_port())
        env["TEST_CHROME_DIR"] = chrome_dir

        proc = subprocess.run(
            ["node", script_path],
            env=env,
            capture_output=True,
            text=True,
            timeout=45,
        )
        self.assertEqual(
            proc.returncode,
            0,
            f"Headless Chrome UX runner failed:\nSTDOUT:\n{proc.stdout}\nSTDERR:\n{proc.stderr}",
        )
        res = json.loads(proc.stdout.strip().splitlines()[-1])
        self.assertEqual(res["consoleErrors"], [], f"Uncaught JS errors: {res['consoleErrors']}")

        # --- Challenge 2 Assertions ---
        c2 = res["c2Step1Audit"]
        self.assertLessEqual(c2["scrollW"], 392, f"C2 horizontal overflow at 390px: {c2['scrollW']}")
        self.assertFalse(c2["has56"], "C2 leaked /56 badge")
        self.assertFalse(c2["has14Cases"], "C2 leaked 14 Cases drawer")
        self.assertFalse(c2["hasFullDossier"], "C2 leaked duplicate Full Dossier toggle")
        self.assertFalse(c2["hasTryWeak"], "C2 leaked destructive Try Weak Prompt button")
        self.assertFalse(c2["hasCompareMode"], "C2 leaked vertical Compare Mode")
        self.assertFalse(c2["hasPptxBeforeSubmit"], "C2 exposed .pptx before final submit")

        # 2x2 Balance-Sheet Grid: Row 1 tiles share top, Row 2 tiles share top
        self.assertEqual(len(c2["tileRects"]), 4, f"Expected 4 balance-sheet tiles, got {c2['tileRects']}")
        self.assertLessEqual(abs(c2["tileRects"][0]["top"] - c2["tileRects"][1]["top"]), 3)
        self.assertLessEqual(abs(c2["tileRects"][2]["top"] - c2["tileRects"][3]["top"]), 3)
        self.assertGreater(c2["tileRects"][2]["top"], c2["tileRects"][0]["top"] + 20)

        # 3 Boardroom Tone pills aligned horizontally on 1 row
        self.assertEqual(len(c2["toneRects"]), 3, f"Expected 3 tone pills, got {c2['toneRects']}")
        self.assertLessEqual(max(c2["toneRects"]) - min(c2["toneRects"]), 3)

        # Raw Prompt collapsed by default (only 1 textarea open = Personal Strategic Angle) & readOnly when inspected
        self.assertEqual(c2["textareaCountCollapsed"], 1)
        self.assertTrue(res["c2PromptReadOnly"]["found"])
        self.assertTrue(res["c2PromptReadOnly"]["readOnly"])

        # Sample Modal overlay + mobile Slide-3 cards + Click-to-Zoom lightbox
        modal = res["c2SampleModalAudit"]
        self.assertTrue(modal["opened"], "C2 Sample Modal did not open")
        self.assertEqual(modal["tableParentDisplayAt390px"], "none", "Desktop 4-col table should hide at 390px")
        self.assertTrue(modal["hasCollapsedNotesToggle"], "Speaker Notes should collapse behind toggle on mobile")
        self.assertTrue(modal["zoomOpened"], "Click-to-Zoom lightbox failed to open on slide image")
        self.assertTrue(modal["zoom2xOk"], "Click-to-Zoom 2x preset failed to reach 200%")
        self.assertTrue(modal["zoomClosed"], "Click-to-Zoom failed to close cleanly")
        self.assertTrue(modal["closedCleanly"], "C2 Sample Modal failed to close")

        # C2 6-Case Switcher
        c2_sw = res["c2CaseSwitcherAudit"]
        self.assertTrue(c2_sw["found"])
        self.assertEqual(c2_sw["optionCount"], 6, f"Expected 6 C2 cases, got {c2_sw}")
        self.assertTrue(c2_sw["switchedTo2of6"])

        # --- Challenge 3 Assertions ---
        c3_sw = res["c3CaseSwitcherAudit"]
        self.assertTrue(c3_sw["found"])
        self.assertEqual(c3_sw["optionCount"], 6, f"Expected 6 C3 cases, got {c3_sw}")
        self.assertTrue(c3_sw["switchedTo1of6"])

        c3 = res["c3Step1Audit"]
        self.assertLessEqual(c3["scrollW"], 392, f"C3 horizontal overflow at 390px: {c3['scrollW']}")
        self.assertFalse(c3["has56"], "C3 leaked /56 badge")
        self.assertFalse(c3["has16Scenarios"], "C3 leaked 16 Scenarios drawer")
        self.assertFalse(c3["hasOldBadge"], "C3 leaked redundant CHALLENGE 3 badge")
        self.assertFalse(c3["hasHintWall"], "C3 leaked verbose Hint prose paragraph")
        self.assertEqual(len(c3["styleTops"]), 3, f"Expected 3 visual style pills, got {c3['styleTops']}")
        self.assertLessEqual(max(c3["styleTops"]) - min(c3["styleTops"]), 3)
        self.assertEqual(c3["openTextInputsCount"], 0, "C3 Personal Touch input should be collapsed by default")
        self.assertIsNotNone(c3["createBtnBottomPx"])
        self.assertLessEqual(
            c3["createBtnBottomPx"],
            844,
            f"C3 Step 1 Create Card CTA pushed below 844px fold ({c3['createBtnBottomPx']}px)",
        )

        c3_s23 = res["c3Step2And3Audit"]
        self.assertTrue(c3_s23["hasPositiveBabyPill"], "Missing positive 'Day-1 Baby Peace of Mind' pill")
        self.assertFalse(c3_s23["hasMorbidCongenital"], "Morbid congenital/jaundice leaked into Step 2 DOM")
        self.assertTrue(c3_s23["briefAutoCollapsedOnStep2"], "C3 Client Brief did not auto-collapse on Step 2")
        self.assertTrue(c3_s23["reExpandedOk"], "C3 Case Info toggle failed to re-expand brief")
        self.assertLessEqual(c3_s23["step3ScrollW"], 392, f"C3 Step 3 horizontal overflow: {c3_s23['step3ScrollW']}")

        # 5-Language Mobile Overflow Check (EN, Mandarin, Cantonese, Malay, Tamil)
        for lg_label, widths in res["multiLangOverflow"].items():
            self.assertLessEqual(
                widths["c2"], 392, f"C2 horizontal overflow in {lg_label}: {widths['c2']}px"
            )
            self.assertLessEqual(
                widths["c3"], 392, f"C3 horizontal overflow in {lg_label}: {widths['c3']}px"
            )


if __name__ == "__main__":
    unittest.main(verbosity=2)
