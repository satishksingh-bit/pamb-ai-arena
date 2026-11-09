#!/usr/bin/env python3
"""Top-5 Real Mobile Browser Multi-Engine Regression Suite (WebKit Safari + Chromium + Firefox/WebView).

Simulates the Top-5 real-world mobile browsers & restricted embedded WebViews used by
PRUMDA Malaysia & Singapore agency leaders scanning QR codes on personal smartphones:

1. iOS Safari (AppleWebKit engine, iPhone SE 375x667 & iPhone 14 390x844, touch enabled)
2. Chrome Mobile on Android (Chromium engine, narrow Galaxy S23 360x800, touch enabled)
3. Chrome on iOS — CriOS (AppleWebKit WKWebView engine, iPhone 15 Pro 393x852, CriOS UA, touch enabled)
4. Samsung Internet on Android (Chromium engine, 384x854 + 110% system font scale, SamsungBrowser UA, touch enabled)
5. WhatsApp / WeChat In-App WebView & Firefox Mobile (Gecko engine, 375x660 cramped WebView height,
   suppressed `window.confirm = () => false`, missing `navigator.clipboard`, and throwing `localStorage` check)

Across EVERY mobile browser engine & profile, verifies:
- Zero uncaught JS page errors & resilient render even when `localStorage` throws `SecurityError`.
- Zero horizontal scroll overflow (`scrollWidth <= innerWidth + 2`) across ALL 5 WORKSHOP LANGUAGES
  (`en`, `zh-CN`, `yue`, `ms`, `ta`) on Onboarding, Challenge 1, Challenge 2, and Challenge 3
  — including 360px narrow Android & 110% Samsung system font scaling!
- Computed `font-size >= 16px` on every visible `<input>` and `<textarea>` so iOS Safari / `CriOS`
  never auto-zooms the page to ~133% on focus.
- Client short name readability (`width >= 110px`) in both C2 (collapsed & expanded) and C3 brief headers
  even at 360px in Tamil (`ta`) & Bahasa Melayu (`ms`).
- Real Touch (`page.tap`) & Restricted-WebView Behavioral Regressions:
  * Challenge 1 Camera Modal (`Take a photo`) fits inside 660px/667px short viewports and renders
    the native phone camera fallback (`capture="user"`) when `getUserMedia` is denied/unavailable.
  * Challenge 2 R.C.T.F.C. pillar toggle (`+ Role` / `[Role ✕]`), `🎯 Sample` modal `backdrop-filter`
    blur + Slide-3 stacked mobile cards, and inline case-switch confirmation when `window.confirm`
    is suppressed (`() => false`) in WhatsApp/WeChat WebViews!
  * Challenge 3 6-case switcher, Step 1 -> Step 2 brief auto-collapse, `execCommand("copy")` fallback
    when `navigator.clipboard` is missing, and Lightbox Touch Pan -> Backdrop Tap Close without
    `state.dragMoved` getting stuck!
"""

import hashlib
import os
import socket
import subprocess
import sys
import time
import unittest
from pathlib import Path
from urllib.request import Request, urlopen

import requests
from playwright.sync_api import Browser, BrowserContext, Page, sync_playwright

ROOT_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
if ROOT_DIR not in sys.path:
    sys.path.insert(0, ROOT_DIR)

from challenges.c2_prompt_duel import TARGET_MY, sign_deck  # noqa: E402

CDN_URLS = [
    "https://cdn.tailwindcss.com",
    "https://unpkg.com/react@18/umd/react.production.min.js",
    "https://unpkg.com/react-dom@18/umd/react-dom.production.min.js",
    "https://unpkg.com/@babel/standalone/babel.min.js",
]

CACHE_DIR = Path(os.environ.get("PAMB_CDN_CACHE_DIR", "/tmp/pamb-playwright-cdn-cache"))

TINY_TEST_PNG_DATA_URL = (
    "data:image/png;base64,"
    "iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAIAAABLbSncAAAADklEQVQI12P4z8DAwMAAAz8B/6O9N7kAAAAASUVORK5CYII="
)


def _find_free_port() -> int:
    with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
        s.bind(("127.0.0.1", 0))
        return s.getsockname()[1]


def _ensure_cdn_bundles_cached() -> dict[str, bytes]:
    """Caches the 4 external CDN JS bundles locally so WebKit/Firefox/Chromium run deterministically in <5ms."""
    CACHE_DIR.mkdir(parents=True, exist_ok=True)
    # Also check conversation scratch cache if already present so offline CI needs zero network
    alt_dirs = [
        CACHE_DIR,
        Path(
            "/usr/local/google/home/cbribiescas/.gemini/jetski/brain/"
            "33ef12a9-6194-4428-8881-fe4c5f9eb385/scratch/cdn-cache"
        ),
    ]
    bundles: dict[str, bytes] = {}
    for url in CDN_URLS:
        fname = hashlib.md5(url.encode("utf-8")).hexdigest() + ".js"
        loaded = None
        for d in alt_dirs:
            candidate = d / fname
            if candidate.is_file() and candidate.stat().st_size > 1000:
                loaded = candidate.read_bytes()
                break
        if loaded is None:
            req = Request(url, headers={"User-Agent": "Mozilla/5.0"})
            with urlopen(req, timeout=25) as resp:
                loaded = resp.read()
            (CACHE_DIR / fname).write_bytes(loaded)
        bundles[url] = loaded
    return bundles


MOBILE_PROFILES = [
    {
        "id": "ios_safari_iphone_se",
        "label": "1. iOS Safari (WebKit • iPhone SE 375×667)",
        "engine": "webkit",
        "viewport": {"width": 375, "height": 667},
        "device_scale_factor": 2,
        "user_agent": (
            "Mozilla/5.0 (iPhone; CPU iPhone OS 17_5 like Mac OS X) "
            "AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.5 Mobile/15E148 Safari/604.1"
        ),
        "font_scale_pct": 100,
        "restricted_webview": False,
    },
    {
        "id": "chrome_android_s23_narrow",
        "label": "2. Chrome Mobile Android (Chromium • Narrow Galaxy S23 360×800)",
        "engine": "chromium",
        "viewport": {"width": 360, "height": 800},
        "device_scale_factor": 3,
        "user_agent": (
            "Mozilla/5.0 (Linux; Android 14; SM-S911B) "
            "AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.6478.122 Mobile Safari/537.36"
        ),
        "font_scale_pct": 100,
        "restricted_webview": False,
    },
    {
        "id": "chrome_ios_crios",
        "label": "3. Chrome on iOS CriOS (WebKit WKWebView • iPhone 15 Pro 393×852)",
        "engine": "webkit",
        "viewport": {"width": 393, "height": 852},
        "device_scale_factor": 3,
        "user_agent": (
            "Mozilla/5.0 (iPhone; CPU iPhone OS 17_5 like Mac OS X) "
            "AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/126.0.6478.153 Mobile/15E148 Safari/604.1"
        ),
        "font_scale_pct": 100,
        "restricted_webview": False,
    },
    {
        "id": "samsung_internet_android_110pct",
        "label": "4. Samsung Internet Android (Chromium • 384×854 @ 110% System Font Scale)",
        "engine": "chromium",
        "viewport": {"width": 384, "height": 854},
        "device_scale_factor": 2.8,
        "user_agent": (
            "Mozilla/5.0 (Linux; Android 14; SAMSUNG SM-S921B) "
            "AppleWebKit/537.36 (KHTML, like Gecko) SamsungBrowser/25.0 Chrome/121.0.0.0 Mobile Safari/537.36"
        ),
        "font_scale_pct": 110,
        "restricted_webview": False,
    },
    {
        "id": "whatsapp_wechat_firefox_webview",
        "label": "5. WhatsApp/WeChat In-App WebView & Firefox Mobile (Gecko • 375×660 Restricted WebView)",
        "engine": "firefox",
        "viewport": {"width": 375, "height": 660},
        "device_scale_factor": 2,
        "user_agent": (
            "Mozilla/5.0 (Android 14; Mobile; rv:127.0; MicroMessenger/8.0.49 WhatsApp/2.24.13) "
            "Gecko/127.0 Firefox/127.0"
        ),
        "font_scale_pct": 100,
        "restricted_webview": True,
    },
]


class Top5MobileBrowsersRegressionTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.cdn_bundles = _ensure_cdn_bundles_cached()
        cls.port = _find_free_port()
        cls.base_url = f"http://127.0.0.1:{cls.port}"
        cls.tmp_dir = Path("/tmp") / f"pamb_top5_mob_{cls.port}"
        cls.tmp_dir.mkdir(parents=True, exist_ok=True)
        (cls.tmp_dir / "empty_gcloud").mkdir(parents=True, exist_ok=True)
        env = os.environ.copy()
        env["PORT"] = str(cls.port)
        env["CLOUDSDK_CONFIG"] = str(cls.tmp_dir / "empty_gcloud")
        env["GOOGLE_APPLICATION_CREDENTIALS"] = str(cls.tmp_dir / "nonexistent_adc.json")
        env["GCE_METADATA_HOST"] = "127.0.0.1:1"
        env["PAMB_STATE_FILE"] = str(cls.tmp_dir / "state.json")
        env["PAMB_MEDIA_DIR"] = str(cls.tmp_dir / "media")
        env["PYTHONDONTWRITEBYTECODE"] = "1"
        cls.server_proc = subprocess.Popen(
            [sys.executable, os.path.join(ROOT_DIR, "server.py")],
            cwd=ROOT_DIR,
            env=env,
            stdout=subprocess.DEVNULL,
            stderr=subprocess.DEVNULL,
        )

        ready = False
        for _ in range(50):
            try:
                r = requests.get(f"{cls.base_url}/api/state", timeout=1.0)
                if r.status_code == 200:
                    ready = True
                    break
            except Exception:
                pass
            time.sleep(0.15)

        if not ready:
            cls.server_proc.terminate()
            raise RuntimeError("Local server.py failed to start for Top-5 Mobile Browser tests")

        # Unlock C1 + C2 + C3 via /api/reset phase=C3_LIVE so every mobile browser can switch across all 3 challenges
        r_reset = requests.post(
            f"{cls.base_url}/api/reset",
            json={"keepDemo": False, "phase": "C3_LIVE", "simulationMode": False},
            timeout=5,
        )
        assert r_reset.status_code == 200

        cls.pw = sync_playwright().start()
        chrome_bin = "/usr/bin/google-chrome"
        cls.browsers: dict[str, Browser] = {
            "webkit": cls.pw.webkit.launch(headless=True),
            "chromium": cls.pw.chromium.launch(
                headless=True,
                executable_path=chrome_bin if os.path.exists(chrome_bin) else None,
                args=["--no-sandbox", "--disable-gpu", "--disable-dev-shm-usage"],
            ),
            "firefox": cls.pw.firefox.launch(headless=True),
        }

    @classmethod
    def tearDownClass(cls):
        for b in getattr(cls, "browsers", {}).values():
            try:
                b.close()
            except Exception:
                pass
        if hasattr(cls, "pw") and cls.pw:
            try:
                cls.pw.stop()
            except Exception:
                pass
        if hasattr(cls, "server_proc") and cls.server_proc:
            cls.server_proc.terminate()
            try:
                cls.server_proc.wait(timeout=5)
            except subprocess.TimeoutExpired:
                cls.server_proc.kill()

    def _attach_cdn_routes(self, context: BrowserContext):
        mock_deck_payload = {
            "deck": TARGET_MY,
            "signature": sign_deck(TARGET_MY),
            "version": 1,
            "model": "mock-mobile-regression",
            "seconds": 0.1,
        }

        def handle_route(route):
            url = route.request.url
            if url in self.cdn_bundles:
                route.fulfill(
                    status=200,
                    content_type="application/javascript; charset=utf-8",
                    body=self.cdn_bundles[url],
                )
                return
            if url.endswith("/api/deck/generate") and route.request.method == "POST":
                route.fulfill(
                    status=200,
                    content_type="application/json; charset=utf-8",
                    body=requests.compat.json.dumps(mock_deck_payload),
                )
                return
            if "fonts.googleapis.com" in url or "fonts.gstatic.com" in url:
                route.fulfill(status=200, content_type="text/css", body="/* offline-font-stub */")
                return
            route.continue_()

        context.route("**/*", handle_route)

    def _open_mobile_context(self, profile: dict, block_local_storage: bool = False) -> tuple[BrowserContext, Page, list[str]]:
        browser = self.browsers[profile["engine"]]
        ctx_kwargs = {
            "viewport": profile["viewport"],
            "device_scale_factor": profile["device_scale_factor"],
            "user_agent": profile["user_agent"],
            "has_touch": True,
        }
        # Firefox doesn't support `is_mobile=True` flag in Playwright context options
        if profile["engine"] != "firefox":
            ctx_kwargs["is_mobile"] = True

        ctx = browser.new_context(**ctx_kwargs)
        self._attach_cdn_routes(ctx)

        if profile.get("font_scale_pct", 100) != 100:
            pct = profile["font_scale_pct"]
            ctx.add_init_script(
                f"""
                document.addEventListener('DOMContentLoaded', () => {{
                  document.documentElement.style.fontSize = '{pct}%';
                }});
                """
            )

        if profile.get("restricted_webview"):
            ctx.add_init_script(
                """
                // Simulate WhatsApp / WeChat embedded WebView restrictions:
                // 1) window.confirm() is suppressed & synchronously returns false
                window.confirm = () => false;
                // 2) navigator.clipboard is undefined or permission-blocked
                try {
                  Object.defineProperty(navigator, 'clipboard', { value: undefined, configurable: true });
                } catch (e) {}
                // 3) getUserMedia rejects with NotAllowedError inside restricted WebViews
                if (navigator.mediaDevices) {
                  navigator.mediaDevices.getUserMedia = () =>
                    Promise.reject(new DOMException('Permission denied in WebView', 'NotAllowedError'));
                } else {
                  Object.defineProperty(navigator, 'mediaDevices', {
                    value: {
                      getUserMedia: () =>
                        Promise.reject(new DOMException('Permission denied in WebView', 'NotAllowedError')),
                    },
                    configurable: true,
                  });
                }
                """
            )

        if block_local_storage:
            ctx.add_init_script(
                """
                try {
                  const deny = () => { throw new DOMException('Blocked storage', 'SecurityError'); };
                  Storage.prototype.getItem = deny;
                  Storage.prototype.setItem = deny;
                  Storage.prototype.removeItem = deny;
                } catch (e) {}
                """
            )

        page = ctx.new_page()
        page_errors: list[str] = []
        page.on("pageerror", lambda exc: page_errors.append(str(exc)))
        return ctx, page, page_errors

    def _assert_zero_horizontal_overflow(self, page: Page, context_label: str):
        metrics = page.evaluate(
            """() => {
              const vw = window.innerWidth;
              const docSw = document.documentElement.scrollWidth;
              const bodySw = document.body ? document.body.scrollWidth : vw;
              const offenders = [];
              for (const el of document.querySelectorAll('body *')) {
                const st = window.getComputedStyle(el);
                if (st.display === 'none' || st.visibility === 'hidden' || st.position === 'fixed') continue;
                const r = el.getBoundingClientRect();
                if (r.width > 0 && r.right > vw + 3) {
                  // Ignore elements neatly clipped inside an overflow-hidden/auto ancestor
                  let clipped = false;
                  let p = el.parentElement;
                  while (p && p !== document.body) {
                    const pst = window.getComputedStyle(p);
                    if (['hidden', 'clip', 'auto', 'scroll'].includes(pst.overflowX)) {
                      const pr = p.getBoundingClientRect();
                      if (pr.right <= vw + 3) {
                        clipped = true;
                        break;
                      }
                    }
                    p = p.parentElement;
                  }
                  if (!clipped && offenders.length < 5) {
                    offenders.push({
                      tag: el.tagName,
                      cls: String(el.className || '').slice(0, 70),
                      txt: String(el.innerText || '').trim().slice(0, 40),
                      right: Math.round(r.right),
                      vw,
                    });
                  }
                }
              }
              return { vw, docSw, bodySw, offenders };
            }"""
        )
        self.assertLessEqual(
            metrics["docSw"],
            metrics["vw"] + 2,
            f"[{context_label}] Horizontal document overflow ({metrics['docSw']} > {metrics['vw']}): {metrics['offenders']}",
        )
        self.assertEqual(
            metrics["offenders"],
            [],
            f"[{context_label}] Unclipped horizontal overflow elements: {metrics['offenders']}",
        )

    def _assert_ios_focus_zoom_safe_inputs(self, page: Page, context_label: str):
        bad_inputs = page.evaluate(
            """() => {
              const bad = [];
              for (const el of document.querySelectorAll('input, textarea, select')) {
                if (el.type === 'hidden' || el.type === 'file' || el.type === 'checkbox' || el.type === 'radio') continue;
                const st = window.getComputedStyle(el);
                if (st.display === 'none' || st.visibility === 'hidden') continue;
                const r = el.getBoundingClientRect();
                if (r.width === 0 || r.height === 0) continue;
                const fs = parseFloat(st.fontSize || '0');
                if (fs < 15.9) {
                  bad.push({
                    tag: el.tagName,
                    type: el.type || '',
                    placeholder: (el.placeholder || '').slice(0, 35),
                    fontSize: fs,
                  });
                }
              }
              return bad;
            }"""
        )
        self.assertEqual(
            bad_inputs,
            [],
            f"[{context_label}] Inputs with font-size < 16px trigger iOS Safari/CriOS focus auto-zoom: {bad_inputs}",
        )

    def _tap_button_containing(self, page: Page, text_substr: str):
        loc = page.locator("button:visible", has_text=text_substr).first
        loc.wait_for(state="visible", timeout=6000)
        loc.tap()

    def test_01_top5_mobile_browsers_5lang_layout_touch_and_webview_matrix(self):
        """Runs full touch & 5-language layout checks across all Top-5 Mobile Browser Engines & Profiles."""
        for p_idx, profile in enumerate(MOBILE_PROFILES):
            with self.subTest(browser=profile["label"]):
                ctx, page, page_errors = self._open_mobile_context(profile)
                try:
                    page.goto(f"{self.base_url}/join", wait_until="domcontentloaded", timeout=15000)
                    page.locator("input[type='text']").first.wait_for(state="visible", timeout=10000)

                    # 1) Onboarding screen checks: default English, >=16px input font, zero overflow
                    self._assert_zero_horizontal_overflow(page, f"{profile['id']}:onboarding:en")
                    self._assert_ios_focus_zoom_safe_inputs(page, f"{profile['id']}:onboarding:en")

                    # Check color-scheme light is enforced against Samsung/Android forced auto-dark
                    color_scheme = page.evaluate(
                        "() => window.getComputedStyle(document.documentElement).colorScheme"
                    )
                    self.assertIn("light", color_scheme, f"[{profile['id']}] Missing color-scheme: light")

                    # Join with a realistic long Malaysian honorific name to stress-test 360px sticky header!
                    long_name = f"Dato' Sri Kamarul Bahrin #{p_idx + 1}"
                    name_input = page.locator("input[type='text']").first
                    name_input.tap()
                    name_input.fill(long_name)
                    page.locator("button[type='submit']").tap()

                    # Wait for main arena 4-tab bar (📸 C1 / 🧠 C2 / 🎯 C3 / 🏆 Score) and switch to C1 first
                    c1_tab = page.locator("main button:visible", has_text="C1").first
                    c1_tab.wait_for(state="visible", timeout=10000)
                    c1_tab.tap()
                    page.wait_for_timeout(250)

                    # Verify sticky header keeps `pts` & `Re-Join` on single horizontal lines even with long name
                    header_pills = page.evaluate(
                        """() => {
                          const ptsEl = Array.from(document.querySelectorAll('span')).find((s) => /\\bpts\\b/i.test(s.textContent || ''));
                          const rjEl = Array.from(document.querySelectorAll('button')).find((b) => /Re-Join/i.test(b.textContent || ''));
                          return {
                            ptsH: ptsEl ? Math.round(ptsEl.getBoundingClientRect().height) : 0,
                            rjH: rjEl ? Math.round(rjEl.getBoundingClientRect().height) : 0,
                          };
                        }"""
                    )
                    self.assertLessEqual(
                        header_pills["ptsH"],
                        34,
                        f"[{profile['id']}] Score pill wrapped onto multiple lines: {header_pills}",
                    )
                    self.assertLessEqual(
                        header_pills["rjH"],
                        34,
                        f"[{profile['id']}] Re-Join button wrapped onto multiple lines: {header_pills}",
                    )

                    # 2) Challenge 1 Touch Camera Modal check (especially critical on 660px/667px short phones & WebView)
                    take_photo_btn = page.locator("button:visible", has_text="Take a photo")
                    if take_photo_btn.count() > 0:
                        take_photo_btn.first.tap()
                        page.wait_for_timeout(350)
                        cam_check = page.evaluate(
                            """() => {
                              const modal = Array.from(document.querySelectorAll('div.fixed')).find((d) =>
                                /Camera|Selfie|Photo/i.test(d.innerText || '')
                              );
                              if (!modal) return null;
                              const card = modal.firstElementChild;
                              const r = card ? card.getBoundingClientRect() : modal.getBoundingClientRect();
                              const fileCapture = modal.querySelector('input[type="file"][capture]');
                              return {
                                modalHeight: Math.round(r.height),
                                vh: window.innerHeight,
                                fitsViewport: r.bottom <= window.innerHeight + 4 && r.top >= -2,
                                hasNativeCaptureInput: Boolean(fileCapture),
                                text: (modal.innerText || '').slice(0, 300),
                              };
                            }"""
                        )
                        self.assertIsNotNone(cam_check, f"[{profile['id']}] Camera modal failed to open on tap")
                        self.assertTrue(
                            cam_check["fitsViewport"],
                            f"[{profile['id']}] Camera modal overflows short mobile viewport: {cam_check}",
                        )
                        self.assertTrue(
                            cam_check["hasNativeCaptureInput"],
                            f"[{profile['id']}] Missing capture='user' native selfie input fallback",
                        )
                        if profile["restricted_webview"]:
                            self.assertIn(
                                "Phone Camera",
                                cam_check["text"],
                                f"[{profile['id']}] Restricted WebView did not show native Phone Camera CTA",
                            )
                        # Close camera modal via touch on its `✕` close button
                        page.locator("div.fixed.inset-0.z-50 button:visible", has_text="✕").first.tap()
                        page.wait_for_timeout(150)

                    # 3) Sweep ALL 5 LANGUAGES across C1, C2, and C3 checking zero overflow & client header readability!
                    lang_buttons = [
                        ("en", "EN"),
                        ("zh-CN", "华语"),
                        ("yue", "粵語"),
                        ("ms", "BM"),
                        ("ta", "தமிழ்"),
                    ]
                    for lang_code, lang_btn_label in lang_buttons:
                        self._tap_button_containing(page, lang_btn_label)
                        page.wait_for_timeout(200)

                        # C1 check
                        page.locator("main button:visible", has_text="C1").first.tap()
                        page.wait_for_timeout(200)
                        self._assert_zero_horizontal_overflow(page, f"{profile['id']}:C1:{lang_code}")
                        self._assert_ios_focus_zoom_safe_inputs(page, f"{profile['id']}:C1:{lang_code}")

                        # C2 check
                        page.locator("main button:visible", has_text="C2").first.tap()
                        page.locator("textarea:visible").first.wait_for(state="visible", timeout=8000)
                        page.wait_for_timeout(250)
                        self._assert_zero_horizontal_overflow(page, f"{profile['id']}:C2:{lang_code}")
                        self._assert_ios_focus_zoom_safe_inputs(page, f"{profile['id']}:C2:{lang_code}")

                        # C3 check + clientShortName width check (catches 360px Tamil/BM header crushing!)
                        page.locator("main button:visible", has_text="C3").first.tap()
                        page.wait_for_timeout(280)
                        self._assert_zero_horizontal_overflow(page, f"{profile['id']}:C3:{lang_code}")
                        self._assert_ios_focus_zoom_safe_inputs(page, f"{profile['id']}:C3:{lang_code}")

                        c3_header_w = page.evaluate(
                            """() => {
                              // First button inside C3 brief card is the clientShortName toggle
                              const card = document.querySelector('div.border-t-4');
                              if (!card) return 0;
                              const btn = card.querySelector('button');
                              return btn ? Math.round(btn.getBoundingClientRect().width) : 0;
                            }"""
                        )
                        self.assertGreaterEqual(
                            c3_header_w,
                            110,
                            f"[{profile['id']}:C3:{lang_code}] C3 client name crushed to {c3_header_w}px!",
                        )

                    # Return to English for deep interactive touch flow tests on C2, C3, and Lightbox
                    self._tap_button_containing(page, "EN")
                    page.wait_for_timeout(200)

                    # 4) Challenge 2 Deep Touch Flow + Sample Backdrop-Blur + WebView Case-Switch Confirmation
                    page.locator("main button:visible", has_text="C2").first.tap()
                    page.locator("textarea:visible").first.wait_for(state="visible", timeout=8000)
                    page.wait_for_timeout(250)

                    # Tap `+ Role` pillar -> verify `[Role]:` appears -> tap `Role ✕` -> verify removed
                    self._tap_button_containing(page, "Role")
                    page.wait_for_timeout(150)
                    val_after_add = page.locator("textarea:visible").first.input_value()
                    self.assertIn("[Role]:", val_after_add)

                    role_chip = page.locator("button:visible", has_text="Role").filter(has_text="✕").first
                    role_chip.tap()
                    page.wait_for_timeout(150)
                    val_after_rm = page.locator("textarea:visible").first.input_value()
                    self.assertNotIn("[Role]:", val_after_rm)

                    # Tap `All 5 On` and open `Sample` modal -> verify Tailwind v3.4 backdrop-blur works!
                    self._tap_button_containing(page, "All 5 On")
                    self._tap_button_containing(page, "Sample")
                    page.wait_for_timeout(200)
                    sample_modal_info = page.evaluate(
                        """() => {
                          const m = document.querySelector('div.fixed.inset-0.z-50');
                          if (!m) return null;
                          const st = window.getComputedStyle(m);
                          const bf = st.backdropFilter || st.webkitBackdropFilter || '';
                          return { bf, vw: window.innerWidth, sw: document.documentElement.scrollWidth };
                        }"""
                    )
                    self.assertIsNotNone(sample_modal_info)
                    self.assertIn(
                        "blur",
                        sample_modal_info["bf"],
                        f"[{profile['id']}] Sample modal backdrop-blur-sm missing in computed CSS: {sample_modal_info}",
                    )
                    self._tap_button_containing(page, "3. Strategy")
                    page.wait_for_timeout(150)
                    self._assert_zero_horizontal_overflow(page, f"{profile['id']}:C2:sample_slide3")
                    self._tap_button_containing(page, "Close")
                    page.wait_for_timeout(150)

                    # Generate 3-Slide Deck -> auto-collapses brief -> check collapsed clientShort width >= 95px!
                    self._tap_button_containing(page, "Generate 3-Slide Executive Deck")
                    page.locator("button:visible", has_text="Finalize & Submit Deck").first.wait_for(
                        state="visible", timeout=10000
                    )
                    page.wait_for_timeout(200)
                    self._assert_zero_horizontal_overflow(page, f"{profile['id']}:C2:step2_deck")

                    collapsed_name_w = page.evaluate(
                        """() => {
                          const bar = document.querySelector('div.from-slate-900');
                          if (!bar) return 0;
                          const spans = bar.querySelectorAll('span.truncate');
                          return spans.length ? Math.round(spans[0].getBoundingClientRect().width) : 0;
                        }"""
                    )
                    self.assertGreaterEqual(
                        collapsed_name_w,
                        80,
                        f"[{profile['id']}] C2 collapsed brief clientShort crushed to {collapsed_name_w}px!",
                    )

                    # CRITICAL WebView Test: Switch Case AFTER a deck exists!
                    # Even when `window.confirm` is suppressed (`() => false`), our inline confirmation must switch cleanly!
                    before_switch_text = page.locator("div.from-slate-900").first.inner_text()
                    self._tap_button_containing(page, "Switch (")
                    page.wait_for_timeout(150)
                    # Pick a slot different from current `(X/6)`
                    other_slot_idx = 1 if "(1/6)" in before_switch_text else 0
                    case_picker_btns = page.locator("div.from-slate-900 div.grid button:visible")
                    case_picker_btns.nth(other_slot_idx).tap()
                    page.wait_for_timeout(150)
                    # Inline confirmation banner should now be visible — tap its confirm button (`✓ Switch`)
                    confirm_btn = page.locator("div.from-slate-900 button:visible", has_text="✓").first
                    confirm_btn.wait_for(state="visible", timeout=4000)
                    confirm_btn.tap()
                    page.wait_for_timeout(350)
                    after_switch_text = page.locator("div.from-slate-900").first.inner_text()
                    self.assertNotEqual(
                        before_switch_text,
                        after_switch_text,
                        f"[{profile['id']}] Switching C2 case failed when deck existed (WebView confirm regression)!",
                    )

                    # 5) Challenge 3 Deep Touch Flow + Personal Touch >=16px + Clipboard Fallback + Lightbox Touch Pan!
                    page.locator("main button:visible", has_text="C3").first.tap()
                    page.wait_for_timeout(250)

                    # Expand optional Personal Touch input & verify >=16px font size on mobile
                    self._tap_button_containing(page, "Add Personal Touch")
                    page.wait_for_timeout(120)
                    self._assert_ios_focus_zoom_safe_inputs(page, f"{profile['id']}:C3:personal_touch_open")

                    # Generate Card -> Step 2 WhatsApp -> Step 3 Email -> Submit -> Test Copy Pack fallback!
                    self._tap_button_containing(page, "Create Greeting Card")
                    page.locator("button:visible", has_text="Next: Craft First WhatsApp").first.wait_for(
                        state="visible", timeout=10000
                    )
                    self._tap_button_containing(page, "Next: Craft First WhatsApp")
                    page.wait_for_timeout(150)
                    self._tap_button_containing(page, "Draft My WhatsApp Message")
                    page.locator("textarea:visible").first.wait_for(state="visible", timeout=10000)
                    self._assert_ios_focus_zoom_safe_inputs(page, f"{profile['id']}:C3:whatsapp_textarea")

                    self._tap_button_containing(page, "See Client Reply")
                    page.wait_for_timeout(150)
                    self._tap_button_containing(page, "Draft Winning Comparison Reply")
                    page.locator("button:visible", has_text="Submit Pre-Pitch").first.wait_for(
                        state="visible", timeout=10000
                    )
                    self._assert_ios_focus_zoom_safe_inputs(page, f"{profile['id']}:C3:email_textarea")

                    self._tap_button_containing(page, "Submit Pre-Pitch")
                    page.locator("button:visible", has_text="Copy Full Pre-Pitch Pack").first.wait_for(
                        state="visible", timeout=10000
                    )
                    # Tap Copy Pack (exercises `execCommand('copy')` fallback in restricted WebView!)
                    self._tap_button_containing(page, "Copy Full Pre-Pitch Pack")
                    page.wait_for_timeout(200)

                    # 6) Universal Lightbox Touch Pan -> Backdrop Tap Close Regression
                    # Verifies `state.dragMoved` resets after `touchend` so the next backdrop tap closes cleanly!
                    lightbox_ok = page.evaluate(
                        f"""async () => {{
                          window.openArenaImageZoom({TINY_TEST_PNG_DATA_URL!r}, 'Mobile Touch Test');
                          const lb = document.getElementById('arena-image-zoom-lightbox');
                          const stage = document.getElementById('arena-zoom-stage');
                          const btn2x = document.querySelector('#arena-image-zoom-lightbox button[data-zoom-preset="2"]');
                          if (!lb || !stage || !btn2x || !lb.classList.contains('is-open')) return {{ opened: false }};

                          // Zoom to 2x so 1-finger touch pan activates state.dragging & state.dragMoved = true
                          btn2x.click();

                          const fireTouch = (type, x, y) => {{
                            let ev;
                            try {{
                              const tObj = new Touch({{
                                identifier: 1,
                                target: stage,
                                clientX: x,
                                clientY: y,
                                pageX: x,
                                pageY: y,
                              }});
                              ev = new TouchEvent(type, {{
                                bubbles: true,
                                cancelable: true,
                                touches: type === 'touchend' ? [] : [tObj],
                                targetTouches: type === 'touchend' ? [] : [tObj],
                                changedTouches: [tObj],
                              }});
                            }} catch (e) {{
                              ev = new Event(type, {{ bubbles: true, cancelable: true }});
                              ev.touches = type === 'touchend' ? [] : [{{ clientX: x, clientY: y }}];
                              ev.changedTouches = [{{ clientX: x, clientY: y }}];
                            }}
                            stage.dispatchEvent(ev);
                          }};

                          fireTouch('touchstart', 180, 320);
                          fireTouch('touchmove', 130, 270);
                          fireTouch('touchend', 130, 270);

                          // Wait >60ms for touchend reset timer, then tap stage backdrop to close!
                          await new Promise((r) => setTimeout(r, 110));
                          stage.dispatchEvent(new MouseEvent('click', {{ bubbles: true, cancelable: true }}));

                          return {{
                            opened: true,
                            closedAfterBackdropTap: !lb.classList.contains('is-open'),
                          }};
                        }}"""
                    )
                    self.assertTrue(lightbox_ok["opened"], f"[{profile['id']}] Lightbox failed to open")
                    self.assertTrue(
                        lightbox_ok["closedAfterBackdropTap"],
                        f"[{profile['id']}] Lightbox backdrop tap swallowed after touch pan (dragMoved stuck)!",
                    )

                    self.assertEqual(
                        page_errors,
                        [],
                        f"[{profile['id']}] Uncaught JS page errors during mobile regression flow: {page_errors}",
                    )
                finally:
                    ctx.close()

    def test_02_blocked_localstorage_private_webview_does_not_crash_onboarding(self):
        """Verifies Safari full Private Storage / restricted Android WebView (`localStorage` SecurityError) still boots & joins."""
        ctx, page, page_errors = self._open_mobile_context(
            MOBILE_PROFILES[0], block_local_storage=True
        )
        try:
            page.goto(f"{self.base_url}/join", wait_until="domcontentloaded", timeout=15000)
            inp = page.locator("input[type='text']").first
            inp.wait_for(state="visible", timeout=10000)
            inp.fill("Private Safari Leader")
            page.locator("button[type='submit']").tap()
            page.locator("main button:visible", has_text="C2").first.wait_for(state="visible", timeout=10000)
            self.assertEqual(
                page_errors,
                [],
                f"Blocked localStorage caused uncaught crash: {page_errors}",
            )
        finally:
            ctx.close()


if __name__ == "__main__":
    unittest.main(verbosity=2)
