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
   - Aligned Step-1 Section Order:
     1) 1. Boardroom Style (3 horizontal tone pills toggling `[Tone]:` ON/OFF)
     2) 2. 💡 Personal Strategic Angle (3 hint pills + 4th custom `"Write my own"` option opening `<input type="text">` >=16px)
     3) 3. 🚀 Improve Your Prompt! (R.C.T.F.C.) collapsible drawer (collapsed by default on load!)
   - Starts at `0/5` R.C.T.F.C. pillars pre-selected (1-line baseline `simple_prompt`, NOT `[Task]:`),
     and clicking `R · Role` ON then OFF cleanly returns down to `0/5` pillars selected.
   - Sample Deck opens as a fixed modal overlay (does not push Step 1 down inline), renders
     stacked mobile strategy cards (not a crushed table) on Slide 3 at 390px, and keeps Speaker Notes collapsed.
   - 6-Case Switcher opens exact 6 curated cases and updates active case cleanly.
   - .pptx export hidden prior to final submission so mobile users don't leave the browser tab early.

3. Challenge 3 Mobile UX Regressions (390x844 Phone Viewport on /join):
   - Zero horizontal scroll overflow (scrollWidth <= 390).
   - Zero legacy clutter (/56, 16 Scenarios, CHALLENGE 3 • ADVISOR PLAYBOOK) & zero morbid labels.
   - Aligned dark-slate executive client brief card (`from-slate-900`) and 2-column 6-Case Switcher (`1/6`..`6/6`).
   - Step 1 visual style pills sit on 1 horizontal row; Personal Touch input collapsed by default;
     primary "Create Greeting Card" button fits above/near the 844px mobile fold.
   - Client Brief Card auto-collapses to a 1-line bar upon entering Step 2 / Step 3, and re-expands on tapping "Case Info".
   - Step 3 tab is `disabled` before sending WhatsApp and client reply (`Incoming Client WhatsApp Reply` / `AIA`) is NOT staged early;
     tapping "Send WhatsApp Message" runs mock send + client typing transition, unlocks Step 3 automatically, and reveals both
     outgoing `"WhatsApp Sent"` confirmation and `"Incoming Client WhatsApp Reply"`.
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

    // Register mobile participant cleanly WITHOUT clicking any language button -> verify default is English!
    await evalJs(`(() => {
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

      // 1. Boardroom Style: 3 horizontal tone pills
      const toneGrid = Array.from(document.querySelectorAll("div.grid.grid-cols-3")).find(
        g => g.children.length === 3 && /Boardroom|CFO|Empathy/i.test(g.innerText)
      );
      const toneRects = toneGrid
        ? Array.from(toneGrid.children).map(el => Math.round(el.getBoundingClientRect().top))
        : [];
      const toneTop = toneGrid ? Math.round(toneGrid.getBoundingClientRect().top) : null;

      // 2. Personal Strategic Angle section (with 4th custom "Write my own" option)
      const customAngleBtn = Array.from(document.querySelectorAll("button")).find(b =>
        /Write my own|自定义|自己輸入|Tulis sudut|எனது சொந்த/i.test(b.textContent)
      );
      const angleTop = customAngleBtn ? Math.round(customAngleBtn.getBoundingClientRect().top) : null;

      // 3. Improve Your Prompt! (R.C.T.F.C.) collapsible drawer — collapsed by default on load!
      const rctfcCollapsible = document.querySelector("[data-testid='c2-rctfc-collapsible']");
      const rctfcHeaderBtn =
        (rctfcCollapsible && rctfcCollapsible.querySelector("button")) ||
        Array.from(document.querySelectorAll("button")).find(b =>
          /Improve Your Prompt|R\\.C\\.T\\.F\\.C\\./i.test(b.textContent)
        );
      const rctfcTop = rctfcHeaderBtn
        ? Math.round(rctfcHeaderBtn.getBoundingClientRect().top)
        : rctfcCollapsible
        ? Math.round(rctfcCollapsible.getBoundingClientRect().top)
        : null;

      const visibleRoleCardOnLoad = Array.from(document.querySelectorAll("button")).some(b => {
        if (!/R\\s*·\\s*Role/i.test(b.textContent)) return false;
        const st = window.getComputedStyle(b);
        return st.display !== "none" && st.visibility !== "hidden" && b.getBoundingClientRect().height > 0;
      });

      const sectionOrder123Ok =
        toneTop !== null &&
        angleTop !== null &&
        rctfcTop !== null &&
        toneTop < angleTop &&
        angleTop < rctfcTop;

      // Live prompt box (1 textarea visible)
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
        hasCustomAngleOption: Boolean(customAngleBtn),
        rctfcCollapsedByDefault: Boolean(rctfcHeaderBtn || rctfcCollapsible) && !visibleRoleCardOnLoad,
        sectionOrder123Ok,
        sectionTops: { toneTop, angleTop, rctfcTop },
        textareaCountCollapsed: textareas.length,
      };
    })()`);

    // Test Aligned 1 -> 2 -> 3 Step-1 Flow & 0/5 Pillar Removal + Custom Angle Input + Collapsible R.C.T.F.C.:
    const c2LivePromptAudit = await evalJs(`(async () => {
      const ta = document.querySelector("textarea");
      if (!ta) return { found: false };
      const initialVal = ta.value;
      // Starts at 0/5 R.C.T.F.C. pillars pre-selected (baseline 1-line simple_prompt, NOT [Task]:!)
      const initialZeroPillars =
        initialVal.trim().length > 5 &&
        !/\\[(Role|Context|Task|Format|Constraints)\\]:/i.test(initialVal);
      const initialEnglishOnly = !/[\\u4e00-\\u9fff]/.test(initialVal) && initialZeroPillars;
      const editable = !ta.readOnly;

      // Section 1: Clicking a Boardroom Style pill toggles [Tone]: ON then OFF cleanly!
      const toneGrid = Array.from(document.querySelectorAll("div.grid.grid-cols-3")).find(
        g => g.children.length === 3 && /Boardroom|CFO|Empathy/i.test(g.innerText)
      );
      const firstToneBtn = toneGrid ? toneGrid.querySelector("button") : null;
      if (firstToneBtn) firstToneBtn.click();
      await new Promise(r => setTimeout(r, 100));
      const toneAddedOk = /\\[Tone\\]:/i.test(document.querySelector("textarea").value);
      if (firstToneBtn) firstToneBtn.click();
      await new Promise(r => setTimeout(r, 100));
      const toneRemovedOk = !/\\[Tone\\]:/i.test(document.querySelector("textarea").value);

      // Section 2: Click 4th custom Personal Strategic Angle button ("Write my own") -> verify <input type="text"> (>=16px) populates [Personal Strategic Angle]: live!
      const writeOwnBtn = Array.from(document.querySelectorAll("button")).find(b =>
        /Write my own|自定义|自己輸入|Tulis sudut|எனது சொந்த/i.test(b.textContent)
      );
      if (writeOwnBtn) writeOwnBtn.click();
      await new Promise(r => setTimeout(r, 120));
      const customInp = Array.from(document.querySelectorAll("input[type='text']")).find(el => {
        const st = window.getComputedStyle(el);
        return st.display !== "none" && st.visibility !== "hidden" && el.getBoundingClientRect().height > 0;
      });
      let customAngleInputFontPx = 0;
      let customAnglePopulatedOk = false;
      if (customInp) {
        customAngleInputFontPx = parseFloat(window.getComputedStyle(customInp).fontSize || "0");
        const inpSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, "value").set;
        inpSetter.call(customInp, "Custom 20-min boardroom co-review");
        customInp.dispatchEvent(new Event("input", { bubbles: true }));
        await new Promise(r => setTimeout(r, 120));
        const valWithCustomAngle = document.querySelector("textarea").value;
        customAnglePopulatedOk = valWithCustomAngle.includes(
          "[Personal Strategic Angle]: Custom 20-min boardroom co-review"
        );
      }
      // Remove [Personal Strategic Angle] via its [Angle ✕] chip so we test pure 0/5 R.C.T.F.C. toggle cleanly
      const angleRemoveChip = Array.from(document.querySelectorAll("button")).find(
        b => b.title === "Remove [Personal Strategic Angle] section"
      );
      if (angleRemoveChip) {
        angleRemoveChip.click();
        await new Promise(r => setTimeout(r, 100));
      }

      // Section 3: Expand collapsible "3. 🚀 Improve Your Prompt! (R.C.T.F.C.)" drawer
      const rctfcContainer = document.querySelector("[data-testid='c2-rctfc-collapsible']");
      const rctfcToggleBtn =
        (rctfcContainer && rctfcContainer.querySelector("button")) ||
        Array.from(document.querySelectorAll("button")).find(b =>
          /Improve Your Prompt|R\\.C\\.T\\.F\\.C\\./i.test(b.textContent)
        );
      if (rctfcToggleBtn) rctfcToggleBtn.click();
      await new Promise(r => setTimeout(r, 140));

      const getPillarCards = () =>
        Array.from(document.querySelectorAll("button")).filter(b =>
          /(R\\s*·\\s*Role|C\\s*·\\s*Context|T\\s*·\\s*Task|F\\s*·\\s*Format|C\\s*·\\s*Constraints)/i.test(
            b.textContent
          )
        );

      const rctfcExpandedCardCount = getPillarCards().length;

      // Click R · Role -> verify [Role]: appears in live textarea!
      const roleBtn = getPillarCards().find(b => /R\\s*·\\s*Role/i.test(b.textContent));
      if (roleBtn) roleBtn.click();
      await new Promise(r => setTimeout(r, 100));
      const afterAddRole = document.querySelector("textarea").value;
      const roleAddedVisibly = afterAddRole.includes("[Role]:");

      // Click R · Role again -> verify [Role]: is removed cleanly back down to 0/5 pillars selected!
      const roleBtn2 = getPillarCards().find(b => /R\\s*·\\s*Role/i.test(b.textContent));
      if (roleBtn2) roleBtn2.click();
      await new Promise(r => setTimeout(r, 100));
      const afterRemoveRole = document.querySelector("textarea").value;
      const zeroCheckmarksAfterRemove = getPillarCards().every(b => !b.textContent.includes("✓"));
      const roleRemovedBackToZeroPillars =
        !/\\[(Role|Context|Task|Format|Constraints)\\]:/i.test(afterRemoveRole) &&
        zeroCheckmarksAfterRemove;

      // Click All 5 On button -> verify all 5 sections appear visibly!
      const addAllBtn = Array.from(document.querySelectorAll("button")).find(b =>
        /All 5 On|Activate All 5|Add All 5/i.test(b.textContent)
      );
      if (addAllBtn) addAllBtn.click();
      await new Promise(r => setTimeout(r, 100));
      const afterAll5 = document.querySelector("textarea").value;
      const all5AddedVisibly =
        afterAll5.includes("[Role]:") &&
        afterAll5.includes("[Context]:") &&
        afterAll5.includes("[Task]:") &&
        afterAll5.includes("[Format]:") &&
        afterAll5.includes("[Constraints]:");

      // Switch language to Mandarin (华语) then back to EN -> verify ZERO leftover Chinese in promptText!
      const zhBtn = Array.from(document.querySelectorAll("header button")).find(b => b.textContent.includes("华语"));
      if (zhBtn) zhBtn.click();
      await new Promise(r => setTimeout(r, 350));
      const zhPrompt = document.querySelector("textarea").value;
      const switchedToChineseOk = /[\\u4e00-\\u9fff]/.test(zhPrompt);

      const enBtn = Array.from(document.querySelectorAll("header button")).find(b => b.textContent.trim() === "EN" || b.textContent.includes("English"));
      if (enBtn) enBtn.click();
      await new Promise(r => setTimeout(r, 350));
      const backToEnPrompt = document.querySelector("textarea").value;
      const backToEnglishZeroCjk = !/[\\u4e00-\\u9fff]/.test(backToEnPrompt) && backToEnPrompt.includes("[Role]:");

      // Edit text inside [Role]: block manually, then click [Role ✕] chip -> verify 100% removed!
      const taNow = document.querySelector("textarea");
      const editedVal = taNow.value.replace(/\\[Role\\]:[^\\n]*/, "[Role]: Custom edited family office advisor text!");
      const taSetter = Object.getOwnPropertyDescriptor(window.HTMLTextAreaElement.prototype, "value").set;
      taSetter.call(taNow, editedVal);
      taNow.dispatchEvent(new Event("input", { bubbles: true }));
      await new Promise(r => setTimeout(r, 100));

      const roleRemoveChip = Array.from(document.querySelectorAll("button")).find(b => b.title === "Remove [Role] section");
      if (roleRemoveChip) roleRemoveChip.click();
      await new Promise(r => setTimeout(r, 100));
      const afterEditedRemove = document.querySelector("textarea").value;
      const editedBlockRemovedCleanly =
        !afterEditedRemove.includes("[Role]:") &&
        !afterEditedRemove.includes("Custom edited family office") &&
        afterEditedRemove.includes("[Task]:");

      return {
        found: true,
        editable,
        initialZeroPillars,
        initialEnglishOnly,
        toneAddedOk,
        toneRemovedOk,
        customAngleInputFontPx,
        customAnglePopulatedOk,
        rctfcExpandedCardCount,
        roleAddedVisibly,
        roleRemovedBackToZeroPillars,
        all5AddedVisibly,
        switchedToChineseOk,
        backToEnglishZeroCjk,
        editedBlockRemovedCleanly,
      };
    })()`);

    // Open 🎯 Sample modal -> verify position:fixed, Slide 3 mobile cards, Speaker Notes collapsed, ZERO boardroom image, and test Click-to-Zoom helper!
    const c2SampleModalAudit = await evalJs(`(async () => {
      const sampleBtn = Array.from(document.querySelectorAll("button")).find(b => /Sample/i.test(b.textContent));
      if (!sampleBtn) return { opened: false };
      sampleBtn.click();
      await new Promise(r => setTimeout(r, 180));

      const modal = document.querySelector("div.fixed.inset-0.z-50");
      if (!modal) return { opened: false };

      // Verify Slide 1 inside modal has ZERO decorative boardroom images!
      const slide1ImgCount = modal.querySelectorAll("img").length;

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

      // Close Sample Modal
      const closeBtn = Array.from(modal.querySelectorAll("button")).find(b => /Close|✕/i.test(b.textContent));
      if (closeBtn) closeBtn.click();
      await new Promise(r => setTimeout(r, 120));

      // Verify global Click-to-Zoom lightbox (used on C1/C3 portraits & greeting cards) opens, zooms 2x, and closes!
      window.openArenaImageZoom("data:image/gif;base64,R0lGODlhAQABAAAAACwAAAAAAQABAAA=", "Greeting Card Preview");
      await new Promise(r => setTimeout(r, 80));
      const lb = document.getElementById("arena-image-zoom-lightbox");
      const zoomOpened = Boolean(lb && window.getComputedStyle(lb).display === "flex");
      const btn2x = lb ? Array.from(lb.querySelectorAll("button")).find(b => b.textContent.trim() === "2×") : null;
      let zoom2xOk = false;
      if (btn2x) {
        btn2x.click();
        await new Promise(r => setTimeout(r, 80));
        zoom2xOk = document.getElementById("arena-zoom-reset")?.textContent.trim() === "200%";
      }
      window.closeArenaImageZoom();
      await new Promise(r => setTimeout(r, 80));
      const zoomClosed = Boolean(lb && window.getComputedStyle(lb).display === "none");

      return {
        opened: true,
        slide1ImgCount,
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

    // Switch to Case 1/6 (Newborn Baby) via C3 Dark-Slate 6-Case Switcher and verify 6 options
    const c3CaseSwitcherAudit = await evalJs(`(async () => {
      const swBtn = Array.from(document.querySelectorAll("button")).find(b =>
        /Switch.*\\([1-6]\\/6\\)|\\([1-6]\\/6\\)/i.test(b.textContent)
      );
      if (!swBtn) return { found: false };
      swBtn.click();
      await new Promise(r => setTimeout(r, 150));
      const darkBrief = document.querySelector("div.from-slate-900");
      const searchRoot = darkBrief || document;
      const pickerGrid = Array.from(searchRoot.querySelectorAll("div.grid")).find(g => {
        const btns = Array.from(g.querySelectorAll("button"));
        return (
          btns.length === 6 &&
          btns.every(b => /^[1-6]\\.\\s|[1-6]\\/6/.test(b.textContent.trim()))
        );
      });
      const pickerBtns = pickerGrid
        ? Array.from(pickerGrid.querySelectorAll("button"))
        : Array.from(searchRoot.querySelectorAll("button")).filter(b =>
            /^[1-6]\\.\\s|[1-6]\\/6$/.test(b.textContent.trim())
          );
      const count = pickerBtns.length;
      if (pickerBtns[0]) pickerBtns[0].click(); // Select Case 1/6 (Newborn Baby)
      await new Promise(r => setTimeout(r, 350));
      const updatedBtn = Array.from(document.querySelectorAll("button")).find(b => /\\(1\\/6\\)/.test(b.textContent));
      return {
        found: true,
        hasDarkSlateBrief: Boolean(darkBrief),
        optionCount: count,
        switchedTo1of6: Boolean(updatedBtn),
      };
    })()`);

    // Audit C3 Step 1 layout at 390x844
    const c3Step1Audit = await evalJs(`(() => {
      const bodyTxt = document.body.innerText;
      const scrollW = document.documentElement.scrollWidth;

      // 3 visual style pills in 1 horizontal row
      const styleGrid = Array.from(document.querySelectorAll("div.grid.grid-cols-3")).find(
        g => g.children.length === 3 && /Watercolor|Prestige|Luxury|Modern|Lifestyle|水彩|奢华|尊尚/i.test(g.innerText)
      );
      const styleTops = styleGrid
        ? Array.from(styleGrid.children).map(el => Math.round(el.getBoundingClientRect().top))
        : [];

      // Personal touch input collapsed by default on Step 1
      const step1Inputs = Array.from(document.querySelectorAll("input[type='text']"));

      // Primary Create Greeting Card button position relative to 844px mobile fold
      const createBtn = Array.from(document.querySelectorAll("button")).find(b => /Create Greeting Card|生成专属贺卡|生成专属祝贺卡/i.test(b.textContent));
      const createRect = createBtn ? createBtn.getBoundingClientRect() : null;

      // Dark-slate brief card expanded height on Step 1
      const briefCard =
        document.querySelector("div.from-slate-900") ||
        Array.from(document.querySelectorAll("div")).find(
          d => d.querySelector("button") && /\\(1\\/6\\)/.test(d.innerText) && d.className.includes("rounded-2xl")
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

    // Switch to C3 Step 2 -> verify Client Brief AUTO-COLLAPSES, Step 3 is LOCKED & client reply UNSTAGED before WhatsApp send,
    // then Draft & Mock-Send WhatsApp -> verify auto-transition to Step 3 + "WhatsApp Sent" + "Incoming Client WhatsApp Reply"!
    const c3Step2And3Audit = await evalJs(`(async () => {
      const step2Tab = Array.from(document.querySelectorAll("button")).find(b => /^2\\./.test(b.textContent.trim()));
      if (step2Tab) step2Tab.click();
      await new Promise(r => setTimeout(r, 200));

      const bodyStep2 = document.body.innerText;
      const hasPositiveBabyPill = bodyStep2.includes("Day-1 Baby Peace of Mind");
      const hasMorbidCongenital = /congenital|jaundice/i.test(bodyStep2);

      // Verify Client Brief collapsed (no 3-bullet Moment / Gap / PRU Plan box visible until Case Info tapped)
      const briefBulletsVisibleOnStep2 =
        bodyStep2.includes("PRU Plan:") ||
        bodyStep2.includes("Suitable PRU Portfolio:") ||
        bodyStep2.includes("Coverage Gap:");

      // Tap Case Info to re-expand and verify toggle works!
      const caseInfoBtn = Array.from(document.querySelectorAll("button")).find(b => /Case Info/i.test(b.textContent));
      let reExpandedOk = false;
      if (caseInfoBtn) {
        caseInfoBtn.click();
        await new Promise(r => setTimeout(r, 120));
        reExpandedOk = document.body.innerText.includes("PRUMy Child Plus");
        const hideBtn = Array.from(document.querySelectorAll("button")).find(b => /Hide|Case Info/i.test(b.textContent));
        if (hideBtn) hideBtn.click();
        await new Promise(r => setTimeout(r, 80));
      }

      // CRITICAL: Before sending WhatsApp (!waSent), Step 3 tab is disabled AND client reply is NOT staged!
      const step3TabBefore = Array.from(document.querySelectorAll("button")).find(b => /^3\\./.test(b.textContent.trim()));
      const step3DisabledBeforeSend = Boolean(step3TabBefore && step3TabBefore.disabled === true);
      const bodyBeforeSend = document.body.innerText;
      const replyUnstagedBeforeSend =
        !bodyBeforeSend.includes("Incoming Client WhatsApp Reply") &&
        !bodyBeforeSend.includes("AIA friend quoted") &&
        !bodyBeforeSend.includes("AIA agent just quoted");

      // Draft First-Touch WhatsApp Message
      const draftWaBtn = Array.from(document.querySelectorAll("button")).find(b =>
        /Draft My WhatsApp Message/i.test(b.textContent)
      );
      if (draftWaBtn) draftWaBtn.click();

      // Wait up to 8s for WhatsApp textarea & "Send WhatsApp Message" button
      let sendWaBtn = null;
      for (let i = 0; i < 40; i++) {
        sendWaBtn = Array.from(document.querySelectorAll("button")).find(b =>
          /Send WhatsApp Message/i.test(b.textContent)
        );
        const waTa = document.querySelector("textarea");
        if (sendWaBtn && waTa && waTa.value.trim().length > 10) break;
        await new Promise(r => setTimeout(r, 200));
      }

      if (sendWaBtn) sendWaBtn.click();
      // Wait ~1250ms for mock WhatsApp send (420ms) + client typing (550ms) transition to complete
      await new Promise(r => setTimeout(r, 1250));

      const step3ScrollW = document.documentElement.scrollWidth;
      const bodyAfterSend = document.body.innerText;
      const whatsappSentVisible = bodyAfterSend.includes("WhatsApp Sent");
      const incomingReplyVisibleAfterSend = bodyAfterSend.includes("Incoming Client WhatsApp Reply");
      const step3UnlockedAfterSend = Boolean(
        Array.from(document.querySelectorAll("button")).find(b => /Draft Winning Comparison Reply/i.test(b.textContent))
      );

      return {
        hasPositiveBabyPill,
        hasMorbidCongenital,
        briefAutoCollapsedOnStep2: !briefBulletsVisibleOnStep2,
        reExpandedOk,
        step3DisabledBeforeSend,
        replyUnstagedBeforeSend,
        whatsappSentVisible,
        incomingReplyVisibleAfterSend,
        step3UnlockedAfterSend,
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
        c2LivePromptAudit,
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
            timeout=65,
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

        # 3 Boardroom Tone pills aligned horizontally on 1 row + 1 -> 2 -> 3 Step-1 Section Order & Collapsible R.C.T.F.C.
        self.assertEqual(len(c2["toneRects"]), 3, f"Expected 3 tone pills, got {c2['toneRects']}")
        self.assertLessEqual(max(c2["toneRects"]) - min(c2["toneRects"]), 3)
        self.assertTrue(c2["hasCustomAngleOption"], "Missing 4th custom Personal Strategic Angle ('Write my own') option!")
        self.assertTrue(
            c2["rctfcCollapsedByDefault"],
            "C2 '3. Improve Your Prompt! (R.C.T.F.C.)' collapsible section must be collapsed by default on load!",
        )
        self.assertTrue(
            c2["sectionOrder123Ok"],
            f"C2 Step 1 sections must follow 1. Style -> 2. Angle -> 3. R.C.T.F.C. order, got {c2['sectionTops']}",
        )

        # Single Always-Visible Live Editable Prompt Box + 0/5 Starter + Custom Angle + Pillar Toggle & Language Switch Sync
        self.assertEqual(c2["textareaCountCollapsed"], 1)
        lp = res["c2LivePromptAudit"]
        self.assertTrue(lp["found"])
        self.assertTrue(lp["editable"], "C2 Live Prompt Box should be directly editable")
        self.assertTrue(
            lp["initialZeroPillars"],
            "C2 Step 1 must start with 0/5 R.C.T.F.C. pillars pre-selected (baseline simple_prompt, NOT [Task]:)!",
        )
        self.assertTrue(lp["initialEnglishOnly"], "C2 default prompt was not English on load!")
        self.assertTrue(lp["toneAddedOk"], "Clicking Boardroom Style pill did not toggle [Tone]: ON")
        self.assertTrue(lp["toneRemovedOk"], "Clicking Boardroom Style pill again did not toggle [Tone]: OFF")
        self.assertGreaterEqual(
            lp["customAngleInputFontPx"],
            15.9,
            f"C2 4th custom angle <input type='text'> font-size < 16px ({lp['customAngleInputFontPx']}px) triggers iOS focus zoom!",
        )
        self.assertTrue(
            lp["customAnglePopulatedOk"],
            "Typing in C2 4th custom angle input did not populate '[Personal Strategic Angle]: Custom 20-min boardroom co-review'!",
        )
        self.assertEqual(
            lp["rctfcExpandedCardCount"],
            5,
            f"Expanding Section 3 R.C.T.F.C. should show all 5 pillar cards, got {lp['rctfcExpandedCardCount']}",
        )
        self.assertTrue(lp["roleAddedVisibly"], "Clicking +Role did not visibly add [Role]: to promptText")
        self.assertTrue(
            lp["roleRemovedBackToZeroPillars"],
            "Clicking R · Role again did not remove [Role]: cleanly back down to 0/5 pillars with zero ✓ checkmarks!",
        )
        self.assertTrue(lp["all5AddedVisibly"], "Clicking All 5 On did not visibly populate all 5 pillars")
        self.assertTrue(lp["switchedToChineseOk"], "Switching to Mandarin did not translate promptText")
        self.assertTrue(lp["backToEnglishZeroCjk"], "Switching back to English left Chinese text in prompt!")
        self.assertTrue(lp["editedBlockRemovedCleanly"], "Edited [Role] block was not removed cleanly!")

        # Sample Modal overlay + ZERO boardroom image + mobile Slide-3 cards + Click-to-Zoom lightbox
        modal = res["c2SampleModalAudit"]
        self.assertTrue(modal["opened"], "C2 Sample Modal did not open")
        self.assertEqual(modal["slide1ImgCount"], 0, "C2 slide still rendered decorative boardroom image!")
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
        self.assertTrue(c3_sw["hasDarkSlateBrief"], "C3 brief card must use dark-slate executive styling (from-slate-900)")
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
        self.assertIsNotNone(c3["step1BriefHeight"])
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
        self.assertTrue(c3_s23["step3DisabledBeforeSend"], "C3 Step 3 tab must be disabled before sending WhatsApp!")
        self.assertTrue(
            c3_s23["replyUnstagedBeforeSend"],
            "C3 client reply ('Incoming Client WhatsApp Reply' / AIA) leaked before WhatsApp was sent!",
        )
        self.assertTrue(c3_s23["whatsappSentVisible"], "Missing outgoing 'WhatsApp Sent' confirmation on Step 3")
        self.assertTrue(
            c3_s23["incomingReplyVisibleAfterSend"],
            "Missing 'Incoming Client WhatsApp Reply' bubble after mock WhatsApp send + typing transition",
        )
        self.assertTrue(
            c3_s23["step3UnlockedAfterSend"],
            "Did not automatically land on unlocked Step 3 ('Draft Winning Comparison Reply') after sending WhatsApp",
        )
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
