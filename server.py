#!/usr/bin/env python3
"""PRUMDA Learning Trip • AI Arena — 11 November (Google Singapore).

Strictly Isolated Presenter Command Screen (/ , /presenter), Participant Mobile Experience (/join),
and Developer Split-Screen Sandbox (/sandbox/1, /sandbox/2, /sandbox/3).

Aligned 1:1 with the 11 November PAMB Agenda (13:45 - 15:30):
- Stage 0 ("LAUNCH"): 13:45 - 13:55 | Envision the future — Overview of AI
- Stage 1 ("LOBBY"):  13:55 - 14:00 | QR Code Onboarding (/join) — PRUMDA Learning Trip Onboarding & Language Selection
- Stage 2 ("LIVE"):   14:00 - 15:05 | The 3 Hands-On Challenges + Live Submissions Wall & Spotlight Modal:
    • Challenge 1 (14:00 - 14:20 | 20m): Reinvent your professional image & customer outreach (Camera Selfie + GenAI Card)
    • Challenge 2 (14:20 - 14:35 | 15m): Master the art of AI dialogue (4-Pillar Prompting Duel + AI Judge)
    • Challenge 3 (14:35 - 15:05 | 30m): Drive faster pipeline, sharpen strategic proposal - Pre-pitch (Gemini Synthesis + Agent Assist)
- Stage 3 ("CANVAS"): 15:05 - 15:15 | Demo Session 1 — Canvas to ideate to your team (Conceptual ideas into realisation)
- Stage 4 ("COACH"):  15:15 - 15:30 | Demo Session 2 — Live coaching: The Public Speaker (Multimodal AI Executive Coach)
- Stage 5 ("PODIUM"): 15:27 - 15:30 | Champions Podium & 11 Nov Bootcamp Takeaways
"""

from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
import io
import json
import mimetypes
import os
import random
import subprocess
import tarfile
import threading
import time
import urllib.parse
import requests

from challenges.c1_image_outreach import handle_c1_ai
from challenges.c2_prompt_duel import (
    PRETRANSLATED_MY,
    TARGET_MY,
    _with_target_images,
    build_pptx_bytes,
    handle_c2_ai,
    handle_c2_coach,
    handle_c2_generate_deck,
    handle_c2_get_challenge,
    handle_c2_get_submission,
    handle_c2_images,
    handle_c2_leaderboard,
    handle_c2_submit_deck,
    handle_c2_target_pptx,
    norm_lang,
)
from challenges.c3_pre_pitch import SCENARIO_CATALOG, get_sim_c3_greeting_card, handle_c3_ai
from challenges.stage_demos import CANVAS_BLUEPRINTS, handle_canvas_ai, handle_coach_ai

PROJECT_ID = os.environ.get("PROJECT_ID", "argolis-sandbox-main")
LOCATION = os.environ.get("VERTEX_LOCATION", "us-central1")
PORT = int(os.environ.get("PORT", "8095"))
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
STATIC_DIR = os.path.join(BASE_DIR, "static")
STATIC_HTML = os.path.join(STATIC_DIR, "index.html")
STATE_FILE = "/tmp/pamb_agency_ai_arena_state_v1.json"

MODEL_CANDIDATES = [
    "gemini-2.5-flash",
    "gemini-2.5-flash-lite",
    "gemini-2.0-flash",
]

# All participants are visiting for PRUMDA Learning Trip 🇲🇾
PAMB_REGIONS = {}

LANG_NAMES = {
    "en": "English",
    "zh-CN": "简体中文 (Malaysian Mandarin)",
    "yue": "廣東話 / 粵語 (Malaysian Cantonese written in authentic colloquial Cantonese)",
    "zh-TW": "廣東話 / 繁體中文 (Cantonese / Traditional Chinese)",
    "ms": "Bahasa Melayu (Malaysian Malay)",
    "ta": "தமிழ் (Malaysian Tamil)",
}

_TOKEN_CACHE = {"token": None, "expires_at": 0.0}
_STATE_LOCK = threading.Lock()


def get_access_token(force_refresh: bool = False) -> str:
    env_tok = os.environ.get("GCP_ACCESS_TOKEN", "").strip()
    if env_tok:
        return env_tok
    now = time.time()
    if not force_refresh and _TOKEN_CACHE["token"] and now < _TOKEN_CACHE["expires_at"]:
        return _TOKEN_CACHE["token"]

    for cmd in (
        ["gcloud", "auth", "print-access-token", "--quiet"],
        ["gcloud", "auth", "print-access-token", "--account=capsule-sa-ar@capsules-agents-1.iam.gserviceaccount.com", "--quiet"],
    ):
        try:
            out = subprocess.check_output(
                cmd,
                text=True,
                timeout=2,
                stderr=subprocess.DEVNULL,
            ).strip()
            if out and not out.startswith("ERROR"):
                _TOKEN_CACHE["token"] = out
                _TOKEN_CACHE["expires_at"] = now + 1500
                return out
        except Exception:
            pass

    try:
        import google.auth
        import google.auth.transport.requests
        creds, _ = google.auth.default(scopes=["https://www.googleapis.com/auth/cloud-platform"])
        auth_req = google.auth.transport.requests.Request()
        creds.refresh(auth_req)
        if creds.token:
            _TOKEN_CACHE["token"] = creds.token
            _TOKEN_CACHE["expires_at"] = now + 1500
            return creds.token
    except Exception:
        pass

    try:
        m_resp = requests.get(
            "http://metadata.google.internal/computeMetadata/v1/instance/service-accounts/default/token",
            headers={"Metadata-Flavor": "Google"},
            timeout=2,
        )
        if m_resp.status_code == 200:
            tok = m_resp.json().get("access_token", "")
            if tok:
                _TOKEN_CACHE["token"] = tok
                _TOKEN_CACHE["expires_at"] = now + 1500
                return tok
    except Exception:
        pass

    return ""


def call_vertex_gemini(prompt: str, preferred_model: str = "gemini-2.5-flash") -> tuple[str | None, str, int]:
    t0 = time.time()
    token = get_access_token()
    if not token:
        return None, f"{preferred_model}", int((time.time() - t0) * 1000) + 410

    candidates = [preferred_model] + [m for m in MODEL_CANDIDATES if m != preferred_model]

    for attempt in range(2):
        headers = {
            "Authorization": f"Bearer {token}",
            "Content-Type": "application/json",
            "X-Goog-User-Project": PROJECT_ID,
        }
        for model_id in candidates:
            url = (
                f"https://{LOCATION}-aiplatform.googleapis.com/v1/projects/{PROJECT_ID}"
                f"/locations/{LOCATION}/publishers/google/models/{model_id}:generateContent"
            )
            payload = {
                "contents": [{"role": "user", "parts": [{"text": prompt}]}],
                "generationConfig": {
                    "temperature": 0.35,
                    "maxOutputTokens": 650,
                },
            }
            if model_id.startswith("gemini-2.5"):
                payload["generationConfig"]["thinkingConfig"] = {"thinkingBudget": 0}
            try:
                resp = requests.post(url, headers=headers, json=payload, timeout=7)
                if resp.status_code == 200:
                    data = resp.json()
                    parts = (
                        data.get("candidates", [{}])[0]
                        .get("content", {})
                        .get("parts", [])
                    )
                    text = "".join(p.get("text", "") for p in parts).strip()
                    if text:
                        ms = int((time.time() - t0) * 1000)
                        return text, model_id, ms
                elif resp.status_code in (401, 403) and attempt == 0:
                    token = get_access_token(force_refresh=True)
                    break
            except Exception:
                continue

    return None, f"{preferred_model}", int((time.time() - t0) * 1000) + 460


def call_vertex_gemini_image(photo_data_url: str | None, image_prompt: str) -> tuple[str | None, int]:
    """Transforms a raw camera selfie (or generates a studio portrait) into a photorealistic
    Executive Studio Headshot using Vertex AI gemini-2.5-flash-image."""
    t0 = time.time()
    token = get_access_token()
    if not token:
        return None, int((time.time() - t0) * 1000)

    parts = []
    if photo_data_url and "," in photo_data_url:
        try:
            header, b64_data = photo_data_url.split(",", 1)
            mime_type = "image/jpeg"
            if "image/png" in header:
                mime_type = "image/png"
            elif "image/webp" in header:
                mime_type = "image/webp"
            parts.append({"inlineData": {"mimeType": mime_type, "data": b64_data.strip()}})
        except Exception:
            pass
    parts.append({"text": image_prompt})

    for attempt in range(2):
        headers = {
            "Authorization": f"Bearer {token}",
            "Content-Type": "application/json",
            "X-Goog-User-Project": PROJECT_ID,
        }
        url = (
            f"https://{LOCATION}-aiplatform.googleapis.com/v1/projects/{PROJECT_ID}"
            f"/locations/{LOCATION}/publishers/google/models/gemini-2.5-flash-image:generateContent"
        )
        payload = {
            "contents": [{"role": "user", "parts": parts}],
            "generationConfig": {
                "responseModalities": ["TEXT", "IMAGE"],
                "temperature": 0.2 if photo_data_url else 0.4,
            },
        }
        try:
            resp = requests.post(url, headers=headers, json=payload, timeout=22)
            if resp.status_code == 200:
                data = resp.json()
                c_parts = (
                    data.get("candidates", [{}])[0]
                    .get("content", {})
                    .get("parts", [])
                )
                for p in c_parts:
                    inline = p.get("inlineData")
                    if inline and inline.get("data"):
                        out_mime = inline.get("mimeType", "image/png")
                        ms = int((time.time() - t0) * 1000)
                        return f"data:{out_mime};base64,{inline['data']}", ms
            elif resp.status_code in (401, 403) and attempt == 0:
                token = get_access_token(force_refresh=True)
                continue
        except Exception:
            pass

    return None, int((time.time() - t0) * 1000)


DEMO_AGENTS = [
    {
        "id": "demo-jason-kl",
        "name": "Dato' Jason Lim",
        "region": "",
        "regionBadge": "✨ PRUMDA Learning Trip",
        "countryFlag": "🇲🇾",
        "language": "zh-CN",
        "speed": 95,
        "accuracy": 97,
        "total": 96,
        "xp": 2880,
        "badges": ["📸 AI Brand Icon", "🧠 4-Pillar Master", "🏆 PRUMDA 10x Closer"],
        "completed": {"1": True, "2": True, "3": True},
        "scores": {
            "1": {
                "speed": 94,
                "accuracy": 97,
                "total": 96,
                "timeSec": 18,
                "criteria": {"Brand Presence": 97, "Personalization": 96},
                "judgeFeedback": "极具MDRT总监风范！将专业形象照与新生儿教育金问候完美结合！",
            },
            "2": {
                "speed": 95,
                "accuracy": 96,
                "total": 96,
                "timeSec": 22,
                "criteria": {"Persona": 25, "Context": 24, "Task": 24, "Format": 23},
                "judgeFeedback": "四维提示词精准锁定高净值物流老板痛点，免税流动性护盾话术极具说服力！",
            },
            "3": {
                "speed": 96,
                "accuracy": 98,
                "total": 97,
                "timeSec": 29,
                "criteria": {"Gemini Synthesis": 98, "Agent Assist Strategy": 97},
                "judgeFeedback": "精准定位 RM 600万扩厂个人担保敞口，巧妙运用 PRUWealth Enrich 条款 4.2.a 破局！",
            },
        },
        "submissions": {
            "1": {
                "challenge": "1",
                "title": "MDRT Gala Executive Portrait • Newborn VIP Card",
                "styleBadge": "💎 MDRT Executive Studio",
                "userInput": "Style: MDRT Gala Keynote | Occasion: Newborn Baby Protection | Motto: 守护大马每个家庭的世代传承",
                "aiOutput": "尊敬的陈总您好！衷心祝贺您喜添新丁！🍼 作为您的专属财富顾问，我特别为您定制了《PRUMy Child 与海外名校教育金蓝图》，等您有 10 分钟空闲时我们喝杯咖啡聊聊！✨",
                "judgeFeedback": "极具MDRT总监风范！将专业形象照与新生儿教育金问候完美结合！",
                "portraitSvg": "mdrt_keynote",
                "total": 96,
                "timeSec": 18,
            },
            "2": {
                "challenge": "2",
                "title": "4-Pillar Prompt Duel • HNW SME Boss (FD & Property)",
                "styleBadge": "🧠 96/100 Prompt Mastery",
                "userInput": "[Persona]: 15年经验 PRUMDA MDRT 总监\n[Context]: 吉隆坡物流集团王拿督（49岁），认为资金放厂房与4.1%定存回报更高\n[Task]: 用资产流动性护盾与杠杆传承化解异议\n[Format]: 3点高管简报 + 温暖咖啡邀约",
                "aiOutput": "王拿督，物流仓储与定存确实是您创富的基石！但 PRUWealth Enrich 是为您千万房产加装「免税现金流防火墙」：房产变现需 6–18 个月，而保单能即时提供免遗产冻结的百万现金流！",
                "judgeFeedback": "四维提示词精准锁定高净值物流老板痛点，免税流动性护盾话术极具说服力！",
                "pillarScores": {"persona": 25, "context": 24, "task": 24, "format": 23},
                "total": 96,
                "timeSec": 22,
            },
            "3": {
                "challenge": "3",
                "title": "Pre-Pitch War Room • Dato' Sri Raymond Tan (RM 10M Trust)",
                "styleBadge": "🎯 Clause 4.2.a Verified",
                "userInput": "Angle: Creditor-Protected Keyman Shield (Clause 4.2.a) + UK/Melbourne Children Inheritance Equalization",
                "aiOutput": "陈拿督，正因为今年您全力冲刺槟城二期新厂，RM 600万个人担保敞口处于最高峰！采用 PRUWealth Enrich（条款 4.2.a）仅需极低首年现金流即可锁定 RM 1,000万债权人隔离池，同时用保险金平衡英国长子与接班次女的传承！",
                "judgeFeedback": "精准定位 RM 600万扩厂个人担保敞口，巧妙运用 PRUWealth Enrich 条款 4.2.a 破局！",
                "policyCitation": "PRUWealth Enrich [Page 38, Clause 4.2.a — Creditor-Protected Trust]",
                "total": 97,
                "timeSec": 29,
            },
        },
        "status": "🏆 Completed all 3 PRUMDA Learning Trip Challenges!",
        "agenticStep": "All 3 Challenges Complete ✓",
        "activeChallenge": 3,
        "isDemo": True,
        "joinedAt": time.time() - 180,
        "updatedAt": time.time() - 20,
    },
    {
        "id": "demo-mei-penang",
        "name": "Mei Ling Tan",
        "region": "",
        "regionBadge": "✨ PRUMDA Learning Trip",
        "countryFlag": "🇲🇾",
        "language": "zh-TW",
        "speed": 91,
        "accuracy": 95,
        "total": 93,
        "xp": 1860,
        "badges": ["📸 AI Brand Icon", "🧠 4-Pillar Master"],
        "completed": {"1": True, "2": True, "3": False},
        "scores": {
            "1": {
                "speed": 90,
                "accuracy": 95,
                "total": 93,
                "timeSec": 24,
                "criteria": {"Brand Presence": 95, "Personalization": 94},
                "judgeFeedback": "東方喜慶金紅尊尚風格搭配企業傳承賀詞，非常契合檳城企業家客群！",
            },
            "2": {
                "speed": 92,
                "accuracy": 95,
                "total": 94,
                "timeSec": 21,
                "criteria": {"Persona": 24, "Context": 24, "Task": 23, "Format": 24},
                "judgeFeedback": "完美示範如何用 AI 激勵受挫的新人顧問，既有同理心又有明確陪訪行動！",
            },
        },
        "submissions": {
            "1": {
                "challenge": "1",
                "title": "Festive Prosperity VIP Portrait • SME Legacy Card",
                "styleBadge": "🧧 PRUMDA Prosperity VIP",
                "userInput": "Style: Festive VIP | Occasion: SME Boss Factory Expansion | Motto: 穩健傳承，富過三代",
                "aiOutput": "拿督林您好！祝賀貴集團檳城新廠順利落成！🏛️ 我為您準備了一份《PRUWealth Enrich 企業關鍵人與家族傳承簡報》，期待週四下午用 15 分鐘與您分享！🤝",
                "judgeFeedback": "東方喜慶金紅尊尚風格搭配企業傳承賀詞，非常契合檳城企業家客群！",
                "portraitSvg": "festive_vip",
                "total": 93,
                "timeSec": 24,
            },
            "2": {
                "challenge": "2",
                "title": "4-Pillar Prompt Duel • Re-Igniting Slumping Rookie",
                "styleBadge": "🧠 95/100 Prompt Mastery",
                "userInput": "[Persona]: 溫暖且堅定的 PRUMDA 區經理\n[Context]: 新人 Jason 連續遭遇 4 次高淨值客戶拒絕想放棄\n[Task]: 肯定第一季佳績 + 邀約明早 9:30 用 AI 復盤並陪同拜訪",
                "aiOutput": "Jason，還記得你第一季連簽三單時的衝勁嗎？🔥 在 PRUMDA 團隊，每一次被高淨值客戶拒絕都是晉升 MDRT 的必經勳章！明早 9:30 來我辦公室，我們用 AI 復盤，下一單我陪你去談！💪",
                "judgeFeedback": "完美示範如何用 AI 激勵受挫的新人顧問，既有同理心又有明確陪訪行動！",
                "pillarScores": {"persona": 24, "context": 24, "task": 23, "format": 24},
                "total": 94,
                "timeSec": 21,
            },
        },
        "status": "✅ Completed C1 & C2 • Working on C3 Pre-Pitch War Room",
        "agenticStep": "Synthesizing Dato' Sri Tan Dossier",
        "activeChallenge": 3,
        "isDemo": True,
        "joinedAt": time.time() - 150,
        "updatedAt": time.time() - 35,
    },
    {
        "id": "demo-ariff-jb",
        "name": "Ariff Iskandar",
        "region": "",
        "regionBadge": "✨ PRUMDA Learning Trip",
        "countryFlag": "🇲🇾",
        "language": "en",
        "speed": 89,
        "accuracy": 93,
        "total": 91,
        "xp": 910,
        "badges": ["📸 AI Brand Icon"],
        "completed": {"1": True, "2": False, "3": False},
        "scores": {
            "1": {
                "speed": 89,
                "accuracy": 93,
                "total": 91,
                "timeSec": 26,
                "criteria": {"Brand Presence": 93, "Personalization": 93},
                "judgeFeedback": "Crisp Forbes Studio look paired with a sharp medical inflation portfolio review hook!",
            },
            "2": {
                "speed": 90,
                "accuracy": 92,
                "total": 91,
                "timeSec": 25,
                "criteria": {"Persona": 23, "Context": 23, "Task": 23, "Format": 23},
                "judgeFeedback": "Clear 4-Pillar structure addressing SME fixed deposit liquidity trade-offs!",
            },
            "3": {
                "speed": 91,
                "accuracy": 94,
                "total": 93,
                "timeSec": 31,
                "criteria": {"Gemini Synthesis": 94, "Agent Assist Strategy": 92},
                "judgeFeedback": "Strong synthesis of Dato' Sri Tan's UK/Melbourne children inheritance equalization!",
            },
        },
        "submissions": {
            "1": {
                "challenge": "1",
                "title": "Forbes Financial Studio Portrait • Annual Portfolio Shield",
                "styleBadge": "🏛️ Forbes Wealth Leader",
                "userInput": "Style: Forbes Financial Leader | Occasion: Annual Medical & Wealth Review | Motto: Clarity & Protection for Every Malaysian Family",
                "aiOutput": "Hi Sarah! With Malaysian private hospital medical inflation rising this year, I ran an AI portfolio check on your family's coverage and spotted an immediate upgrade to strengthen your cashless Hospital Admission (LOG) shield. Let's connect for 10 mins this week! 📈",
                "judgeFeedback": "Crisp Forbes Studio look paired with a sharp medical inflation portfolio review hook!",
                "portraitSvg": "forbes_studio",
                "avatarIdx": 2,
                "total": 91,
                "timeSec": 26,
            },
            "2": {
                "challenge": "2",
                "title": "4-Pillar Prompt Duel • HNW FD & Property Objection",
                "styleBadge": "🧠 91/100 Prompt Mastery",
                "userInput": "[Persona]: PRUMDA HNW Family Office Specialist\n[Context]: Dato' Wong (KL Logistics Boss) has RM 12M in warehouses & FDs\n[Task]: Reframe PRUWealth Enrich as an instant tax-free Estate Liquidity Firewall\n[Format]: Crisp executive bullets + Tuesday coffee invite",
                "aiOutput": "Dear Dato' Wong, your logistics warehouses and FDs are outstanding wealth engines—yet commercial property takes 12–18 months to liquidate during probate. By allocating just a fraction of your FD yield into PRUWealth Enrich, you lock in an instant, creditor-protected RM 5M cash buffer for your family.",
                "judgeFeedback": "Clear 4-Pillar structure addressing SME fixed deposit liquidity trade-offs!",
                "pillarScores": {"persona": 23, "context": 23, "task": 23, "format": 23},
                "total": 91,
                "timeSec": 25,
            },
            "3": {
                "challenge": "3",
                "title": "Pre-Pitch War Room • Cross-Border Inheritance Equalizer",
                "styleBadge": "🎯 Clause 4.2.a Verified",
                "userInput": "Angle: Cross-Border Children Inheritance Equalizer + Creditor-Protected Keyman Shield (Clause 4.2.a)",
                "aiOutput": "Dato' Sri Raymond, since your daughter Chloe is returning from Melbourne to run the Penang plant while your son Ryan practices medicine in the UK, PRUWealth Enrich (Clause 4.2.a) lets you leave 100% of the factory shares to Chloe while creating an instant RM 10M tax-free trust for Ryan—while ring-fencing your RM 6M bank guarantee!",
                "judgeFeedback": "Strong synthesis of Dato' Sri Tan's UK/Melbourne children inheritance equalization!",
                "policyCitation": "PRUWealth Enrich [Page 38, Clause 4.2.a — Creditor-Protected Trust]",
                "total": 93,
                "timeSec": 31,
            },
        },
        "status": "⚡ Ready in Arena",
        "agenticStep": "Ready",
        "activeChallenge": 1,
        "isDemo": True,
        "joinedAt": time.time() - 120,
        "updatedAt": time.time() - 50,
    },
    {
        "id": "demo-siti-kl",
        "name": "Siti Nurhaliza Rahman",
        "region": "",
        "regionBadge": "✨ PRUMDA Learning Trip",
        "countryFlag": "🇲🇾",
        "language": "ms",
        "speed": 93,
        "accuracy": 95,
        "total": 94,
        "xp": 2820,
        "badges": ["📸 AI Brand Icon", "🧠 4-Pillar Master", "🎯 Pre-Pitch Strategist"],
        "completed": {"1": True, "2": True, "3": True},
        "scores": {
            "1": {
                "speed": 93,
                "accuracy": 95,
                "total": 94,
                "timeSec": 19,
                "criteria": {"Brand Presence": 95, "Personalization": 94},
                "judgeFeedback": "Potret Eksekutif Family Office yang sangat meyakinkan dengan mesej perlindungan keluarga yang mesra!",
            },
            "2": {
                "speed": 92,
                "accuracy": 95,
                "total": 94,
                "timeSec": 21,
                "criteria": {"Persona": 24, "Context": 24, "Task": 23, "Format": 24},
                "judgeFeedback": "Struktur prompt 4-Tiang yang sangat jelas dan penuh empati untuk membakar semangat ejen baharu!",
            },
            "3": {
                "speed": 94,
                "accuracy": 96,
                "total": 95,
                "timeSec": 27,
                "criteria": {"Gemini Synthesis": 96, "Agent Assist Strategy": 95},
                "judgeFeedback": "Strategi perlindungan jaminan bank RM 6 Juta (Klausa 4.2.a) yang sangat tepat!",
            },
        },
        "submissions": {
            "1": {
                "challenge": "1",
                "title": "Premier Family Office Portrait • Family Blessing Card",
                "styleBadge": "🌿 Premier Family Office",
                "userInput": "Style: Premier Family Office | Occasion: Newborn & Education | Motto: Melindungi Masa Depan Keluarga Malaysia",
                "aiOutput": "Tahniah Dato' & Datin atas kelahiran cahaya mata baharu! 🌟 Sebagai perunding kewangan anda, saya telah menyediakan pelan pendidikan global PRUMy Child khas untuk masa depan si kecil. Jom minum kopi 10 minit minggu ini!",
                "judgeFeedback": "Potret Eksekutif Family Office yang sangat meyakinkan dengan mesej perlindungan keluarga yang mesra!",
                "portraitSvg": "family_advisor",
                "avatarIdx": 1,
                "total": 94,
                "timeSec": 19,
            },
            "2": {
                "challenge": "2",
                "title": "4-Pillar Prompt Duel • Motivasi Ejen Baharu MDRT",
                "styleBadge": "🧠 94/100 Prompt Mastery",
                "userInput": "[Persona]: Pengurus Agensi PRUMDA MDRT\n[Context]: Ejen baharu kecewa selepas 4 penolakan pelanggan HNW\n[Task]: Beri semangat & jadualkan sesi latihan AI esok 9:30 pagi",
                "aiOutput": "Jangan putus asa! Setiap penolakan daripada pelanggan korporat sebenarnya membina ketahanan anda menuju MDRT. Esok jam 9:30 pagi kita analisa skrip bersama AI dan saya akan temankan anda ke temujanji seterusnya! 💪🔥",
                "judgeFeedback": "Struktur prompt 4-Tiang yang sangat jelas dan penuh empati untuk membakar semangat ejen baharu!",
                "pillarScores": {"persona": 24, "context": 24, "task": 23, "format": 24},
                "total": 94,
                "timeSec": 21,
            },
            "3": {
                "challenge": "3",
                "title": "Pre-Pitch War Room • Perisai Jaminan Bank RM 6 Juta",
                "styleBadge": "🎯 Clause 4.2.a Verified",
                "userInput": "Angle: Perisai Jaminan Bank RM 6 Juta (Klausa 4.2.a) + Pewarisan Anak UK/Melbourne",
                "aiOutput": "Dato' Sri, melalui PRUWealth Enrich (Klausa 4.2.a), hanya ~3% komitmen tahunan diperlukan untuk mewujudkan dana amanah RM 10 Juta yang dilindungi daripada pemiutang bagi melindungi jaminan peribadi RM 6 Juta kilang Pulau Pinang anda!",
                "judgeFeedback": "Strategi perlindungan jaminan bank RM 6 Juta (Klausa 4.2.a) yang sangat tepat!",
                "policyCitation": "PRUWealth Enrich [Page 38, Clause 4.2.a — Creditor-Protected Trust]",
                "total": 95,
                "timeSec": 27,
            },
        },
        "status": "⚡ Ready in Arena",
        "agenticStep": "Ready",
        "activeChallenge": 1,
        "isDemo": True,
        "joinedAt": time.time() - 90,
        "updatedAt": time.time() - 30,
    },
]

# Also ensure Mei Ling Tan has a Challenge 3 template for full 3-round simulation
DEMO_AGENTS[1]["scores"]["3"] = {
    "speed": 93,
    "accuracy": 95,
    "total": 94,
    "timeSec": 28,
    "criteria": {"Gemini Synthesis": 95, "Agent Assist Strategy": 94},
    "judgeFeedback": "跨國子女傳承平衡方案（英國長子現金信託 + 澳洲次女股權）極具說服力！",
}
DEMO_AGENTS[1]["submissions"]["3"] = {
    "challenge": "3",
    "title": "Pre-Pitch War Room • 跨國子女資產傳承與債務隔離方案",
    "styleBadge": "🎯 Clause 4.2.a Verified",
    "userInput": "Angle: 跨國子女傳承平衡 + 條款 4.2.a 債權人隔離信託",
    "aiOutput": "陳拿督，透過 PRUWealth Enrich（條款 4.2.a），我們能為英國行醫的長子建立 RM 1,000萬免稅現金信託，讓墨爾本歸國的次女完整繼承檳城廠房股權，同時隔離 RM 600萬銀行個人擔保風險！",
    "judgeFeedback": "跨國子女傳承平衡方案（英國長子現金信託 + 澳洲次女股權）極具說服力！",
    "policyCitation": "PRUWealth Enrich [Page 38, Clause 4.2.a — Creditor-Protected Trust]",
    "total": 94,
    "timeSec": 28,
}

# Attach photorealistic Before Selfie & After Studio Portrait URLs to DEMO_AGENTS
_PORTRAIT_MAP = [
    ("leader_1", "守护大马每个家庭的世代传承"),
    ("leader_2", "穩健傳承，富過三代"),
    ("leader_4", "Clarity & Protection for Every Malaysian Family"),
    ("leader_3", "Melindungi Masa Depan Keluarga Malaysia"),
]
_SIM_C3_KEYS = list(SCENARIO_CATALOG.keys())
for _idx, _ag in enumerate(DEMO_AGENTS):
    _pkey, _motto = _PORTRAIT_MAP[_idx % len(_PORTRAIT_MAP)]
    _ag["submissions"]["1"]["rawPortraitUrl"] = f"/static/sim_portraits/{_pkey}_after.png"
    _ag["submissions"]["1"]["imageBefore"] = f"/static/sim_portraits/{_pkey}_before.png"
    _ag["submissions"]["1"]["motto"] = _motto
    _ag["submissions"]["1"]["avatarIdx"] = _idx
    # Populate Challenge 2 with the 3-Slide Deck Challenge (Datin Sharifah Aleya) in the leader's language
    _lang_c2 = norm_lang(_ag.get("language", "en"))
    _c2_target = PRETRANSLATED_MY.get(_lang_c2, {}).get("target", TARGET_MY) if _lang_c2 != "en" else TARGET_MY
    _c2_deck = _with_target_images(_c2_target, "MY")
    _c2_tot = _ag["scores"].get("2", {}).get("total", 95)
    _c2_tsec = _ag["scores"].get("2", {}).get("timeSec", 22)
    _c2_rubric_map = {
        "Structure & Completeness": 10,
        "Client Personalisation": 10,
        "Insight & Quantification": 9,
        "Solution Fit": 10,
        "Objection Readiness": 9,
        "Compliance & Fair Dealing": 10,
    }
    _ag["scores"]["2"]["criteria"] = _c2_rubric_map
    _ag["submissions"]["2"] = {
        "challenge": "2",
        "title": f"{_c2_deck['title']} • 3-Slide Pre-Pitch Deck",
        "deck_title": _c2_deck["title"],
        "styleBadge": f"📊 {round(_c2_tot / 10, 1)}/10 Deck Score • 3 Slides",
        "userInput": (
            f"[Role]: Senior PRUMDA Wealth & Legacy Planning Consultant\n"
            f"[Context]: Datin Sharifah Aleya (52, 6 clinics in Klang Valley, Net Worth ≈ RM 28M [68% clinic shares], RM 4.5M loan guarantee, RM 1M 2009 policy)\n"
            f"[Task]: Create a 3-slide pre-pitch deck for her 60-min Bangsar meeting\n"
            f"[Format]: Slide 1 KPI Snapshot, Slide 2 RM 6.5M Liquidity Gap Bar Chart, Slide 3 Family Takaful + Hibah Strategy Table + Speaker Notes\n"
            f"[Constraints]: BNM Fair Treatment rules, fact-find first, PDS & 15-day free-look, Shariah principles, illustrative figures"
        ),
        "aiOutput": "\n".join(f"Slide {i+1}: {s['title']}" for i, s in enumerate(_c2_deck["slides"])),
        "deck": _c2_deck,
        "slide_titles": [s["title"] for s in _c2_deck["slides"]],
        "slides": len(_c2_deck["slides"]),
        "rubric": [
            {"dimension": k, "score": v, "comment": "Strong alignment with Datin Sharifah Aleya case facts & BNM compliance."}
            for k, v in _c2_rubric_map.items()
        ],
        "pillarScores": _c2_rubric_map,
        "judgeFeedback": _ag["scores"]["2"].get("judgeFeedback", "Outstanding 3-slide pre-pitch deck with KPI snapshot, RM 6.5M liquidity gap chart, and Family Takaful + Hibah strategy table!"),
        "total": _c2_tot,
        "timeSec": _c2_tsec,
    }
    # Populate Challenge 3 across the 6 PAMB Malaysia Life-Event Scenarios + Greeting Card
    _sc_key = _SIM_C3_KEYS[_idx % len(_SIM_C3_KEYS)]
    _sc_obj = SCENARIO_CATALOG[_sc_key]
    _lang_c3 = _ag.get("language", "en")
    _fb_c3 = _sc_obj["fallback"].get(_lang_c3, _sc_obj["fallback"]["en"])
    _c3_pillars = {
        "Greeting Card": 25,
        "WhatsApp Pitch": 24,
        "PRU vs AIA Email": 25,
        "Factual Accuracy": 24,
    }
    _ag["scores"]["3"]["criteria"] = _c3_pillars
    _ag["submissions"]["3"] = {
        "challenge": "3",
        "title": f"{_sc_obj['customerName'].split('(')[0].strip()} • PRU vs. AIA Pre-Pitch",
        "styleBadge": _sc_obj["badge"],
        "userInput": f"Assigned Case: {_sc_obj['customerName']} | {_sc_obj['policyCitation']}",
        "aiOutput": _fb_c3["firstTouchMessage"],
        "whatsappMessage": _fb_c3["firstTouchMessage"],
        "aiaComparisonEmail": _fb_c3["aiaComparisonEmail"],
        "dossierSynthesis": _fb_c3["aiaComparisonEmail"],
        "policyCitation": _sc_obj["policyCitation"],
        "pillarScores": _c3_pillars,
        "judgeFeedback": _fb_c3["judgeFeedback"],
        "imageAfter": get_sim_c3_greeting_card(_sc_key, _ag["name"], _ag["region"]),
        "total": _ag["scores"].get("3", {}).get("total", 95),
        "timeSec": _ag["scores"].get("3", {}).get("timeSec", 27),
    }


EXTRA_SIM_ROSTER = [
    ("Dato' Marcus Wong", "", "zh-CN", "leader_5", "forbes_studio", "🏛️ Forbes Wealth Leader", "跨代财富护航 • 槟城家族办公室"),
    ("Grace Lee", "", "en", "leader_6", "mdrt_keynote", "💎 MDRT Executive Studio", "Empowering Malaysian Families with AI Clarity"),
    ("Rajesh Krishnan", "", "en", "leader_4", "festive_vip", "🧧 PRUMDA Prosperity VIP", "Building Generational Wealth in Southern Malaysia"),
    ("Vivian Khor", "", "zh-TW", "leader_2", "forbes_studio", "🏛️ Forbes Wealth Leader", "以專業與科技守護大馬企業家"),
    ("Farah Aziz", "", "ms", "leader_3", "family_advisor", "🌿 Premier Family Office", "Warisan Teguh Untuk Setiap Keluarga"),
    ("Dato' Kelvin Chong", "", "zh-CN", "leader_1", "mdrt_keynote", "💎 MDRT Executive Studio", "立足东马，服务全马高净值家族"),
    ("Michelle Yeoh-Lim", "", "en", "leader_6", "family_advisor", "🌿 Premier Family Office", "Trusted Legacy Partner for SME Founders"),
    ("Daniel Hakim", "", "ms", "leader_5", "forbes_studio", "🏛️ Forbes Wealth Leader", "Kepimpinan AI & Perlindungan Takaful/Insurans"),
    ("Evelyn Ooi", "", "zh-TW", "leader_2", "festive_vip", "🧧 PRUMDA Prosperity VIP", "百萬圓桌頂尖團隊 • 世代傳承"),
    ("Vincent Tan-Ng", "", "zh-CN", "leader_1", "forbes_studio", "🏛️ Forbes Wealth Leader", "用 AI 速度创造有温度的保障"),
    ("Priya Nair", "", "en", "leader_6", "mdrt_keynote", "💎 MDRT Executive Studio", "Protecting Tomorrow's Dreams Today"),
    ("Adrian Lau", "", "zh-CN", "leader_5", "festive_vip", "🧧 PRUMDA Prosperity VIP", "家族基业长青的坚实后盾"),
    ("Nurul Izzah", "", "ms", "leader_3", "family_advisor", "🌿 Premier Family Office", "Perancangan Harta & Pendidikan Terbaik"),
    ("stephenie Koh", "", "en", "leader_2", "mdrt_keynote", "💎 MDRT Executive Studio", "Your Cross-Border Legacy Architect"),
    ("Raymond Cheah", "", "zh-CN", "leader_4", "forbes_studio", "🏛️ Forbes Wealth Leader", "守护企业现金流与家族信托"),
    ("Carmen Yap", "", "zh-TW", "leader_6", "family_advisor", "🌿 Premier Family Office", "用心傾聽，定制專屬保障"),
    ("Hafiz Zulkifli", "", "ms", "leader_1", "mdrt_keynote", "💎 MDRT Executive Studio", "Membina Generasi Bebas Kewangan"),
    ("Serena Ong", "", "en", "leader_2", "festive_vip", "🧧 PRUMDA Prosperity VIP", "Excellence in High-Net-Worth Advisory"),
    ("Nicholas Teoh", "", "zh-CN", "leader_5", "mdrt_keynote", "💎 MDRT Executive Studio", "十年百万圆桌，终身家庭挚友"),
    ("Aishah Mansor", "", "ms", "leader_3", "forbes_studio", "🏛️ Forbes Wealth Leader", "Pakar Perancangan Legasi Korporat"),
]


def _enrich_sim_c2_submission(tmpl: dict):
    """Attaches a localized 3-slide Pre-Pitch Deck and 6-dimension rubric to simulated Challenge 2 submissions."""
    lang = norm_lang(tmpl.get("language", "en"))
    target_deck = PRETRANSLATED_MY.get(lang, {}).get("target") or TARGET_MY
    deck_with_imgs = _with_target_images(target_deck, "MY")
    guide_steps = PRETRANSLATED_MY.get(lang, {}).get("guide")
    if guide_steps:
        prompt_str = "\n\n".join(g["template"] for g in guide_steps)
    else:
        prompt_str = tmpl.get("submissions", {}).get("2", {}).get("userInput", "")
    tot = tmpl.get("scores", {}).get("2", {}).get("total", 96)
    deck_10 = round(tot / 10.0, 1)
    rubric_map = {
        "Structure & Completeness": "10/10",
        "Client Personalisation": "10/10",
        "Insight & Quantification": "9/10",
        "Solution Fit": "10/10",
        "Objection Readiness": "9/10",
        "Compliance & Fair Dealing": "10/10",
    }
    tmpl.setdefault("scores", {}).setdefault("2", {})["criteria"] = rubric_map
    sub2 = tmpl.setdefault("submissions", {}).setdefault("2", {})
    sub2["challenge"] = "2"
    sub2["title"] = f"{deck_with_imgs.get('title', 'Pre-Pitch Brief: Datin Sharifah Aleya')} ({deck_10}/10)"
    sub2["styleBadge"] = f"🧠 {deck_10}/10 Deck (5/5 R.C.T.F.C.)"
    sub2["userInput"] = prompt_str
    sub2["deck"] = deck_with_imgs
    sub2["deckScore10"] = deck_10
    sub2["pillarScores"] = rubric_map


def _get_sim_template_by_index(idx: int) -> dict:
    """Returns a complete 3-challenge simulation template for participant #idx (0..23)."""
    if idx < len(DEMO_AGENTS):
        t_copy = json.loads(json.dumps(DEMO_AGENTS[idx]))
        _enrich_sim_c2_submission(t_copy)
        return t_copy

    ext_idx = (idx - len(DEMO_AGENTS)) % len(EXTRA_SIM_ROSTER)
    name, region, lang, pkey, style_key, style_badge, motto = EXTRA_SIM_ROSTER[ext_idx]
    base_tmpl = json.loads(json.dumps(DEMO_AGENTS[idx % len(DEMO_AGENTS)]))
    rmeta = PAMB_REGIONS.get(region, {"badge": f"🇲🇾 {region}"})

    # Deterministic realistic score variance (86 - 98)
    s1_spd = max(84, min(98, 95 - ((idx * 3) % 11)))
    s1_acc = max(86, min(99, 97 - ((idx * 2) % 9)))
    s1_tot = round((s1_spd + s1_acc) / 2)

    s2_spd = max(85, min(98, 94 - ((idx * 4) % 10)))
    s2_acc = max(86, min(99, 96 - ((idx * 3) % 9)))
    s2_tot = round((s2_spd + s2_acc) / 2)

    s3_spd = max(86, min(99, 96 - ((idx * 2) % 9)))
    s3_acc = max(87, min(99, 97 - ((idx * 3) % 8)))
    s3_tot = round((s3_spd + s3_acc) / 2)

    base_tmpl["id"] = f"sim-leader-{idx+1}"
    base_tmpl["name"] = name
    base_tmpl["region"] = region
    base_tmpl["regionBadge"] = rmeta["badge"]
    base_tmpl["language"] = lang

    base_tmpl["scores"]["1"]["speed"] = s1_spd
    base_tmpl["scores"]["1"]["accuracy"] = s1_acc
    base_tmpl["scores"]["1"]["total"] = s1_tot
    base_tmpl["scores"]["1"]["timeSec"] = 16 + (idx % 14)

    base_tmpl["scores"]["2"]["speed"] = s2_spd
    base_tmpl["scores"]["2"]["accuracy"] = s2_acc
    base_tmpl["scores"]["2"]["total"] = s2_tot
    base_tmpl["scores"]["2"]["timeSec"] = 19 + (idx % 15)

    base_tmpl["scores"]["3"]["speed"] = s3_spd
    base_tmpl["scores"]["3"]["accuracy"] = s3_acc
    base_tmpl["scores"]["3"]["total"] = s3_tot
    base_tmpl["scores"]["3"]["timeSec"] = 22 + (idx % 16)

    base_tmpl["submissions"]["1"]["portraitSvg"] = style_key
    base_tmpl["submissions"]["1"]["styleBadge"] = style_badge
    base_tmpl["submissions"]["1"]["rawPortraitUrl"] = f"/static/sim_portraits/{pkey}_after.png"
    base_tmpl["submissions"]["1"]["imageBefore"] = f"/static/sim_portraits/{pkey}_before.png"
    base_tmpl["submissions"]["1"]["motto"] = motto
    base_tmpl["submissions"]["1"]["total"] = s1_tot
    base_tmpl["submissions"]["1"]["timeSec"] = base_tmpl["scores"]["1"]["timeSec"]

    base_tmpl["submissions"]["2"]["total"] = s2_tot
    base_tmpl["submissions"]["2"]["timeSec"] = base_tmpl["scores"]["2"]["timeSec"]
    _enrich_sim_c2_submission(base_tmpl)

    sc_key = _SIM_C3_KEYS[idx % len(_SIM_C3_KEYS)]
    sc_obj = SCENARIO_CATALOG[sc_key]
    fb_c3 = sc_obj["fallback"].get(lang, sc_obj["fallback"]["en"])
    c3_pillars = {
        "Greeting Card": 25,
        "WhatsApp Pitch": 24,
        "PRU vs AIA Email": 25,
        "Factual Accuracy": 24,
    }
    base_tmpl["scores"]["3"]["criteria"] = c3_pillars
    base_tmpl["submissions"]["3"] = {
        "challenge": "3",
        "title": f"{sc_obj['customerName'].split('(')[0].strip()} • PRU vs. AIA Pre-Pitch",
        "styleBadge": sc_obj["badge"],
        "userInput": f"Assigned Case: {sc_obj['customerName']} | {sc_obj['policyCitation']}",
        "aiOutput": fb_c3["firstTouchMessage"],
        "whatsappMessage": fb_c3["firstTouchMessage"],
        "aiaComparisonEmail": fb_c3["aiaComparisonEmail"],
        "dossierSynthesis": fb_c3["aiaComparisonEmail"],
        "policyCitation": sc_obj["policyCitation"],
        "pillarScores": c3_pillars,
        "judgeFeedback": fb_c3["judgeFeedback"],
        "imageAfter": get_sim_c3_greeting_card(sc_key, name, region),
        "total": s3_tot,
        "timeSec": base_tmpl["scores"]["3"]["timeSec"],
    }
    return base_tmpl


def _make_lobby_only_participant(template: dict) -> dict:
    """Creates a joined participant in the Lobby with 0 challenge submissions yet."""
    now = time.time()
    return {
        "id": template["id"],
        "name": template["name"],
        "region": template["region"],
        "regionBadge": template["regionBadge"],
        "countryFlag": "🇲🇾",
        "language": template["language"],
        "speed": 0,
        "accuracy": 0,
        "total": 0,
        "xp": 100,
        "badges": ["🇲🇾 PRUMDA Leader"],
        "completed": {"1": False, "2": False, "3": False},
        "scores": {},
        "submissions": {},
        "status": "📖 Reading Challenge 1, 2 & 3 Briefs in Lobby",
        "agenticStep": "Lobby Pre-Read Brief",
        "activeChallenge": 1,
        "isDemo": True,
        "simTemplateIdx": template.get("simTemplateIdx", 0),
        "joinedAt": now - random.randint(1, 15),
        "updatedAt": now,
    }


def _default_state(with_demo: bool = False, initial_phase: str = "LOBBY", simulation_mode: bool = True) -> dict:
    now = time.time()
    parts = {}
    if with_demo and simulation_mode:
        if initial_phase == "LOBBY":
            for i in range(4):
                tmpl = _get_sim_template_by_index(i)
                tmpl["simTemplateIdx"] = i
                parts[tmpl["id"]] = _make_lobby_only_participant(tmpl)
        else:
            for i in range(4):
                tmpl = _get_sim_template_by_index(i)
                tmpl["simTemplateIdx"] = i
                parts[tmpl["id"]] = tmpl
    return {
        "gameSessionId": f"session-{int(now*1000)}",
        "simulationMode": simulation_mode,
        "phase": initial_phase,  # "LOBBY" | "C1_LIVE" | "C1_RESULTS" | "C2_LIVE" | "C2_RESULTS" | "C3_LIVE" | "C3_RESULTS" | "PODIUM"
        "activeRound": "1",      # "1" | "2" | "3"
        "stageStartedAt": now,
        "timerEndAt": now + 900,
        "timerPausedRemaining": None,
        "autoStartOnZero": False,
        "participants": parts,
        "events": [
            {
                "id": "evt-init-1",
                "time": time.strftime("%H:%M:%S"),
                "text": "🇲🇾 PAMB Joining Arena Open! Scan the QR code, enter your Name & Language, and read the briefs for Challenges 1, 2 & 3.",
                "type": "info",
            },
        ],
        "canvasState": CANVAS_BLUEPRINTS["mdrt_sprint"],
        "coachState": {},
        "preferredModel": "gemini-2.5-flash",
        "lastModelUsed": "gemini-2.5-flash",
        "simulateDemo": False,
        "aiCallsCount": 24,
        "avgLatencyMs": 740,
    }


def load_state() -> dict:
    if os.path.exists(STATE_FILE):
        try:
            with open(STATE_FILE, "r", encoding="utf-8") as f:
                return json.load(f)
        except Exception:
            pass
    st = _default_state(with_demo=True, initial_phase="LOBBY")
    save_state(st)
    return st


def save_state(st: dict):
    try:
        with open(STATE_FILE, "w", encoding="utf-8") as f:
            json.dump(st, f)
    except Exception:
        pass


def add_event(st: dict, text: str, evt_type: str = "info"):
    st["events"].insert(
        0,
        {
            "id": f"evt-{int(time.time()*1000)}-{random.randint(100,999)}",
            "time": time.strftime("%H:%M:%S"),
            "text": text,
            "type": evt_type,
        },
    )
    st["events"] = st["events"][:40]


def get_timer_elapsed(st: dict) -> int:
    started = st.get("stageStartedAt") or time.time()
    return max(0, int(round(time.time() - started)))


def get_timer_remaining(st: dict) -> int:
    if st.get("timerPausedRemaining") is not None:
        return max(0, int(st["timerPausedRemaining"]))
    end_at = st.get("timerEndAt") or (time.time() + 60)
    return max(0, int(round(end_at - time.time())))


def recompute_participant(p: dict):
    scores = p.get("scores", {})
    if not scores:
        p["speed"] = 0
        p["accuracy"] = 0
        p["total"] = 0
        p["xp"] = 100
        return
    speeds = [v.get("speed", 90) for v in scores.values()]
    accs = [v.get("accuracy", 92) for v in scores.values()]
    avg_speed = round(sum(speeds) / len(speeds))
    avg_acc = round(sum(accs) / len(accs))
    completed_count = len(scores)
    raw_avg = (avg_speed + avg_acc) / 2.0
    progress_factor = 0.64 + (0.12 * min(3, completed_count))
    p["speed"] = min(100, avg_speed)
    p["accuracy"] = min(100, avg_acc)
    p["total"] = min(100, round(raw_avg * progress_factor))
    p["xp"] = sum(v.get("total", 90) * 10 for v in scores.values())

    badges = []
    if "1" in scores:
        badges.append("📸 AI Brand Icon")
    if "2" in scores:
        badges.append("🧠 4-Pillar Master")
    if "3" in scores:
        badges.append("🎯 Pre-Pitch Strategist")
    if completed_count >= 3:
        badges.append("🏆 PRUMDA 10x Closer")
    p["badges"] = badges


def compute_region_standings(participants: list) -> list:
    by_reg = {}
    for p in participants:
        r = p.get("region", "")
        badge = p.get("regionBadge") or PAMB_REGIONS.get(r, {}).get("badge", "✨ PRUMDA Learning Trip")
        entry = by_reg.setdefault(
            r,
            {"region": r, "badge": badge, "flag": "🇲🇾", "agents": 0, "totalSum": 0, "completedMissions": 0},
        )
        entry["agents"] += 1
        entry["totalSum"] += p.get("total", 0)
        entry["completedMissions"] += sum(1 for k in ("1", "2", "3") if p.get("completed", {}).get(k))
    res = []
    for r, d in by_reg.items():
        avg_score = round(d["totalSum"] / d["agents"]) if d["agents"] else 0
        res.append({
            "region": r,
            "badge": d["badge"],
            "flag": "🇲🇾",
            "agents": d["agents"],
            "avgScore": avg_score,
            "completedMissions": d["completedMissions"],
        })
    res.sort(key=lambda x: (x["avgScore"], x["completedMissions"], x["agents"]), reverse=True)
    return res


class PAMBArenaHTTPHandler(BaseHTTPRequestHandler):
    def log_message(self, format, *args):
        pass

    def _send_json(self, data: dict, status: int = 200):
        raw = json.dumps(data).encode("utf-8")
        self.send_response(status)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Cache-Control", "no-store")
        self.send_header("Content-Length", str(len(raw)))
        self.end_headers()
        self.wfile.write(raw)

    def _send_file(self, filepath: str):
        if not os.path.exists(filepath):
            self.send_response(404)
            self.end_headers()
            return
        ctype, _ = mimetypes.guess_type(filepath)
        if not ctype:
            ctype = "text/plain; charset=utf-8"
        elif ctype.startswith("text/") or ctype == "application/javascript":
            ctype += "; charset=utf-8"
        with open(filepath, "rb") as f:
            raw = f.read()
        self.send_response(200)
        self.send_header("Content-Type", ctype)
        self.send_header("Cache-Control", "no-store")
        self.send_header("Content-Length", str(len(raw)))
        self.end_headers()
        self.wfile.write(raw)

    def do_GET(self):
        parsed = urllib.parse.urlparse(self.path)
        path = parsed.path

        if path == "/api/state":
            with _STATE_LOCK:
                st = load_state()
                rem = get_timer_remaining(st)

                if st.get("simulateDemo") and st.get("phase") == "LIVE":
                    for p in st["participants"].values():
                        if p.get("isDemo") and random.random() < 0.35:
                            p["speed"] = min(100, max(82, p["speed"] + random.choice([-1, 1, 2])))
                            p["accuracy"] = min(100, max(86, p["accuracy"] + random.choice([0, 1, 2])))
                            p["total"] = round((p["speed"] + p["accuracy"]) / 2)
                            p["xp"] = p.get("xp", 1400) + random.randint(15, 50)
                    save_state(st)

                plist = list(st["participants"].values())
                plist.sort(
                    key=lambda x: (
                        x.get("total", 0),
                        sum(1 for k in ("1", "2", "3") if x.get("completed", {}).get(k)),
                        x.get("speed", 0),
                        -x.get("joinedAt", 0),
                    ),
                    reverse=True,
                )
                region_standings = compute_region_standings(plist)
                return self._send_json({
                    "gameSessionId": st.get("gameSessionId", "session-init"),
                    "simulationMode": st.get("simulationMode", True),
                    "phase": st.get("phase", "LOBBY"),
                    "activeRound": st.get("activeRound", "1"),
                    "timerElapsed": get_timer_elapsed(st),
                    "timerRemaining": rem,
                    "timerPaused": st.get("timerPausedRemaining") is not None,
                    "autoStartOnZero": False,
                    "participants": plist,
                    "regionStandings": region_standings,
                    "events": st.get("events", []),
                    "canvasState": st.get("canvasState", CANVAS_BLUEPRINTS["mdrt_sprint"]),
                    "coachState": st.get("coachState", {}),
                    "preferredModel": st.get("preferredModel", "gemini-2.5-flash"),
                    "lastModelUsed": st.get("lastModelUsed", "gemini-2.5-flash"),
                    "simulateDemo": st.get("simulateDemo", False),
                    "aiCallsCount": st.get("aiCallsCount", 24),
                    "avgLatencyMs": st.get("avgLatencyMs", 740),
                    "projectId": PROJECT_ID,
                })

        if path == "/api/challenge":
            qs = urllib.parse.parse_qs(parsed.query)
            market = (qs.get("market", ["MY"])[0] or "MY").strip()
            lang = (qs.get("lang", ["en"])[0] or "en").strip()
            res = handle_c2_get_challenge(market, lang, get_access_token, PROJECT_ID, LOCATION)
            return self._send_json(res)

        if path.startswith("/api/submissions/"):
            sid = path.removeprefix("/api/submissions/").strip("/")
            res, status = handle_c2_get_submission(sid)
            return self._send_json(res, status=status)

        if path == "/api/leaderboard":
            qs = urllib.parse.parse_qs(parsed.query)
            market = qs.get("market", [None])[0]
            limit = int(qs.get("limit", ["20"])[0] or 20)
            return self._send_json(handle_c2_leaderboard(market=market, limit=limit))

        if path == "/api/target/pptx":
            qs = urllib.parse.parse_qs(parsed.query)
            market = (qs.get("market", ["MY"])[0] or "MY").strip()
            lang = (qs.get("lang", ["en"])[0] or "en").strip()
            raw = handle_c2_target_pptx(market, lang, get_access_token, PROJECT_ID, LOCATION)
            self.send_response(200)
            self.send_header("Content-Type", "application/vnd.openxmlformats-officedocument.presentationml.presentation")
            self.send_header("Content-Disposition", f'attachment; filename="target-deck-{market.upper()}.pptx"')
            self.send_header("Content-Length", str(len(raw)))
            self.end_headers()
            self.wfile.write(raw)
            return

        if path in ("/c2-embed", "/c2-embed/", "/embed", "/embed/"):
            return self._send_file(os.path.join(STATIC_DIR, "c2_index.html"))

        if path == "/target" or path.startswith("/view/"):
            return self._send_file(os.path.join(STATIC_DIR, "view.html"))

        if path in ("/handoff", "/handoff/"):
            return self._send_file(os.path.join(STATIC_DIR, "handoff.html"))

        if path == "/handoff/pamb-ai-arena.tar.gz":
            base_dir = os.path.dirname(os.path.abspath(__file__))
            buf = io.BytesIO()
            with tarfile.open(fileobj=buf, mode="w:gz") as tar:
                for root, dirs, files in os.walk(base_dir):
                    dirs[:] = [d for d in dirs if d not in (".git", "__pycache__", ".venv", "node_modules")]
                    for fname in files:
                        if fname.endswith((".pyc", ".tar.gz", ".zip")):
                            continue
                        full_p = os.path.join(root, fname)
                        rel_p = os.path.relpath(full_p, base_dir)
                        tar.add(full_p, arcname=rel_p)
            raw = buf.getvalue()
            self.send_response(200)
            self.send_header("Content-Type", "application/gzip")
            self.send_header("Content-Disposition", 'attachment; filename="pamb-ai-arena.tar.gz"')
            self.send_header("Cache-Control", "no-store")
            self.send_header("Content-Length", str(len(raw)))
            self.end_headers()
            self.wfile.write(raw)
            return

        if path == "/handoff/pamb-ai-arena.zip":
            import zipfile
            base_dir = os.path.dirname(os.path.abspath(__file__))
            buf = io.BytesIO()
            with zipfile.ZipFile(buf, "w", zipfile.ZIP_DEFLATED) as zf:
                for root, dirs, files in os.walk(base_dir):
                    dirs[:] = [d for d in dirs if d not in (".git", "__pycache__", ".venv", "node_modules")]
                    for fname in files:
                        if fname.endswith((".pyc", ".tar.gz", ".zip")):
                            continue
                        full_p = os.path.join(root, fname)
                        rel_p = os.path.relpath(full_p, base_dir)
                        zf.write(full_p, arcname=rel_p)
            raw = buf.getvalue()
            self.send_response(200)
            self.send_header("Content-Type", "application/zip")
            self.send_header("Content-Disposition", 'attachment; filename="pamb-ai-arena.zip"')
            self.send_header("Cache-Control", "no-store")
            self.send_header("Content-Length", str(len(raw)))
            self.end_headers()
            self.wfile.write(raw)
            return

        if path == "/handoff/pamb-ai-arena.bundle":
            bundle_path = os.path.join(STATIC_DIR, "pamb-ai-arena.bundle")
            if os.path.isfile(bundle_path):
                with open(bundle_path, "rb") as f:
                    raw = f.read()
                self.send_response(200)
                self.send_header("Content-Type", "application/octet-stream")
                self.send_header("Content-Disposition", 'attachment; filename="pamb-ai-arena.bundle"')
                self.send_header("Cache-Control", "no-store")
                self.send_header("Content-Length", str(len(raw)))
                self.end_headers()
                self.wfile.write(raw)
                return

        if path.startswith("/handoff/export-challenge/"):
            cnum = path.removeprefix("/handoff/export-challenge/").strip("/")
            mapping = {
                "1": ("challenges/c1_image_outreach.py", "static/challenge1.js"),
                "2": ("challenges/c2_prompt_duel.py", "static/challenge2.js"),
                "3": ("challenges/c3_pre_pitch.py", "static/challenge3.js"),
            }
            if cnum not in mapping:
                return self._send_json({"ok": False, "error": "Invalid challenge number (use 1, 2, or 3)"}, 400)
            base_dir = os.path.dirname(os.path.abspath(__file__))
            files_out = {}
            for rel_f in mapping[cnum]:
                fp = os.path.join(base_dir, rel_f)
                if os.path.exists(fp):
                    with open(fp, "r", encoding="utf-8") as f:
                        files_out[rel_f] = f.read()
            return self._send_json({"ok": True, "challenge": cnum, "files": files_out})

        if path.startswith("/static/"):
            rel = path.removeprefix("/static/")
            safe_path = os.path.normpath(os.path.join(STATIC_DIR, rel))
            if safe_path.startswith(STATIC_DIR):
                return self._send_file(safe_path)

        return self._send_file(STATIC_HTML)

    def do_POST(self):
        parsed = urllib.parse.urlparse(self.path)
        path = parsed.path
        length = int(self.headers.get("Content-Length", 0))
        body = {}
        if length > 0:
            try:
                body = json.loads(self.rfile.read(length).decode("utf-8"))
            except Exception:
                body = {}

        if path == "/api/deck/generate":
            res, status = handle_c2_generate_deck(body, get_access_token, PROJECT_ID, LOCATION)
            return self._send_json(res, status=status)

        if path == "/api/prompt/coach":
            res, status = handle_c2_coach(body, get_access_token, PROJECT_ID, LOCATION)
            return self._send_json(res, status=status)

        if path == "/api/deck/images":
            res, status = handle_c2_images(body, call_vertex_gemini_image)
            return self._send_json(res, status=status)

        if path == "/api/deck/submit":
            res, status = handle_c2_submit_deck(body, get_access_token, PROJECT_ID, LOCATION)
            return self._send_json(res, status=status)

        if path == "/api/deck/pptx":
            raw = build_pptx_bytes(body)
            self.send_response(200)
            self.send_header("Content-Type", "application/vnd.openxmlformats-officedocument.presentationml.presentation")
            self.send_header("Content-Disposition", 'attachment; filename="pre-pitch-deck.pptx"')
            self.send_header("Content-Length", str(len(raw)))
            self.end_headers()
            self.wfile.write(raw)
            return

        if path == "/api/register":
            pid = (body.get("id") or f"pamb-{int(time.time()*1000)}").strip()
            name = (body.get("name") or "PRUMDA Leader").strip()
            region = (body.get("region") or "").strip()
            r_meta = {"flag": "🇲🇾", "badge": "✨ PRUMDA Learning Trip"}
            lang = (body.get("language") or "zh-CN").strip()
            with _STATE_LOCK:
                st = load_state()
                existing = st["participants"].get(pid, {})
                is_new = not bool(existing)
                p = {
                    "id": pid,
                    "name": name,
                    "region": region,
                    "regionBadge": r_meta["badge"],
                    "countryFlag": "🇲🇾",
                    "language": lang,
                    "speed": existing.get("speed", 0),
                    "accuracy": existing.get("accuracy", 0),
                    "total": existing.get("total", 0),
                    "xp": existing.get("xp", 100),
                    "badges": existing.get("badges", ["🇲🇾 PRUMDA Leader"]),
                    "completed": existing.get("completed", {"1": False, "2": False, "3": False}),
                    "scores": existing.get("scores", {}),
                    "submissions": existing.get("submissions", {}),
                    "status": body.get("status") or existing.get("status") or "📖 Joined Lobby • Ready for PRUMDA Learning Trip",
                    "agenticStep": existing.get("agenticStep", "Briefing & Strategy Pre-Read"),
                    "activeChallenge": existing.get("activeChallenge", 1),
                    "isDemo": False,
                    "joinedAt": existing.get("joinedAt", time.time()),
                    "updatedAt": time.time(),
                }
                st["participants"][pid] = p
                if is_new:
                    add_event(
                        st,
                        f"🇲🇾 {name} joined PRUMDA Learning Trip in {LANG_NAMES.get(lang, lang)}!",
                        "join",
                    )
                save_state(st)
                return self._send_json({"ok": True, "participant": p, "phase": st.get("phase", "LAUNCH")})

        if path == "/api/activity":
            pid = body.get("id", "")
            status_text = body.get("status", "")
            agentic_step = body.get("agenticStep", "")
            challenge_num = body.get("challenge", 0)
            lang = body.get("language")
            region = body.get("region")
            with _STATE_LOCK:
                st = load_state()
                if pid in st["participants"]:
                    p = st["participants"][pid]
                    if status_text:
                        p["status"] = status_text
                    if agentic_step:
                        p["agenticStep"] = agentic_step
                    if challenge_num:
                        p["activeChallenge"] = challenge_num
                    if lang:
                        p["language"] = lang
                    if region:
                        p["region"] = region
                        p["regionBadge"] = PAMB_REGIONS.get(region, {}).get("badge", f"🇲🇾 {region}")
                    p["updatedAt"] = time.time()
                    if body.get("logEvent") and status_text:
                        add_event(
                            st,
                            f"🇲🇾 {p['name']}: {status_text}",
                            "activity",
                        )
                    save_state(st)
                return self._send_json({"ok": True})

        if path == "/api/submit":
            pid = body.get("id", "")
            name = body.get("name", "PRUMDA Leader")
            region = body.get("region", "")
            r_meta = {"flag": "🇲🇾", "badge": "✨ PRUMDA Learning Trip"}
            lang = body.get("language", "zh-CN")
            c_num = str(body.get("challenge", "1"))
            speed = int(body.get("speed", 92))
            accuracy = int(body.get("accuracy", 96))
            time_sec = int(body.get("timeSec", 15))
            criteria = body.get("criteria") or {}
            judge_feedback = body.get("judgeFeedback", "")
            submission_obj = body.get("submission") or {}

            with _STATE_LOCK:
                st = load_state()
                p = st["participants"].get(pid, {
                    "id": pid,
                    "name": name,
                    "region": region,
                    "regionBadge": r_meta["badge"],
                    "countryFlag": "🇲🇾",
                    "language": lang,
                    "speed": 0,
                    "accuracy": 0,
                    "total": 0,
                    "xp": 100,
                    "badges": [],
                    "completed": {"1": False, "2": False, "3": False},
                    "scores": {},
                    "submissions": {},
                    "isDemo": False,
                    "joinedAt": time.time(),
                })
                p["name"] = name
                p["region"] = region
                p["regionBadge"] = r_meta["badge"]
                p["language"] = lang

                # Challenge 2 enforces a strict one-time final submission lock for real participants
                if (
                    c_num == "2"
                    and p.get("completed", {}).get("2")
                    and p.get("submissions", {}).get("2")
                    and not p.get("isDemo")
                    and pid != "sandbox-dev-agent"
                    and not body.get("forceResubmit")
                ):
                    return self._send_json({"ok": True, "alreadySubmitted": True, "participant": p})

                c_total = round((speed + accuracy) / 2)
                p.setdefault("completed", {"1": False, "2": False, "3": False})[c_num] = True
                p.setdefault("scores", {})[c_num] = {
                    "speed": speed,
                    "accuracy": accuracy,
                    "total": c_total,
                    "timeSec": time_sec,
                    "criteria": criteria,
                    "judgeFeedback": judge_feedback,
                }
                submission_obj["challenge"] = c_num
                submission_obj["total"] = c_total
                submission_obj["timeSec"] = time_sec
                submission_obj["judgeFeedback"] = judge_feedback
                submission_obj["submittedAt"] = time.strftime("%H:%M:%S")
                submission_obj["submittedAtTs"] = time.time()
                p.setdefault("submissions", {})[c_num] = submission_obj

                recompute_participant(p)
                done_count = sum(1 for k in ("1", "2", "3") if p["completed"].get(k))
                if done_count >= 3:
                    p["status"] = f"🏆 CLEARED ALL 3 CHALLENGES! ({p['total']} pts • {p['xp']} XP)"
                    p["agenticStep"] = "All 3 PRUMDA Learning Trip Challenges Complete ✓"
                else:
                    p["status"] = f"✅ Submitted Challenge {c_num} ({c_total} pts in {time_sec}s)"
                    p["agenticStep"] = f"Challenge {c_num} Scored → Ready for Challenge {int(c_num)+1}"
                p["updatedAt"] = time.time()
                st["participants"][pid] = p

                c_titles = {
                    "1": "C1: Executive AI Image & Outreach",
                    "2": "C2: 4-Pillar Prompt Duel",
                    "3": "C3: Pre-Pitch Synthesis & Agent Assist",
                }
                add_event(
                    st,
                    f"🔥 🇲🇾 {name} submitted {c_titles.get(c_num, f'Challenge {c_num}')} — "
                    f"Score: {c_total} pts (Speed {speed}% • Quality {accuracy}%)!",
                    "submit",
                )
                save_state(st)
                return self._send_json({"ok": True, "participant": p})

        if path == "/api/simulate-step":
            action = body.get("action", "auto_step")
            with _STATE_LOCK:
                st = load_state()
                cur_phase = st.get("phase", "LOBBY")
                now = time.time()

                # 1. Toggle Simulation Mode vs Real Scenario Mode
                if action == "toggle_sim_mode":
                    enabled = bool(body.get("enabled", False))
                    st["simulationMode"] = enabled
                    if not enabled:
                        # Remove all simulated demo participants so ONLY real QR-joined participants remain
                        st["participants"] = {
                            k: v for k, v in st["participants"].items() if not v.get("isDemo")
                        }
                        add_event(
                            st,
                            "🟢 REAL EVENT MODE ACTIVE — Simulation disabled & simulated participants removed. Only real QR participants will appear!",
                            "info",
                        )
                    else:
                        add_event(
                            st,
                            "🧪 SIMULATION DIRECTOR MODE ENABLED — Use the Simulation Bar to control how many join and how submissions flow.",
                            "info",
                        )
                    save_state(st)
                    return self._send_json({
                        "ok": True,
                        "simulationMode": st["simulationMode"],
                        "participantsCount": len(st["participants"]),
                    })

                # 2. Set Exact Number of Joined Simulated Leaders (e.g. 0, 4, 8, 12, 16, 24)
                if action == "set_join_count":
                    target_count = max(0, min(24, int(body.get("count", 6))))
                    st["simulationMode"] = True
                    real_parts = {
                        k: v for k, v in st["participants"].items() if not v.get("isDemo")
                    }
                    existing_demo = [
                        v for v in st["participants"].values() if v.get("isDemo")
                    ]
                    existing_demo.sort(key=lambda x: x.get("joinedAt", 0))

                    new_parts = dict(real_parts)
                    for i in range(target_count):
                        if i < len(existing_demo):
                            p = existing_demo[i]
                            new_parts[p["id"]] = p
                        else:
                            tmpl = _get_sim_template_by_index(i)
                            tmpl["simTemplateIdx"] = i
                            p = _make_lobby_only_participant(tmpl)
                            p["joinedAt"] = now - (target_count - i) * 0.5
                            new_parts[p["id"]] = p
                    st["participants"] = new_parts
                    add_event(
                        st,
                        f"👥 Simulation Headcount set to {target_count} PRUMDA Learning Trip Leaders.",
                        "join",
                    )
                    save_state(st)
                    return self._send_json({
                        "ok": True,
                        "simulated": "set_join_count",
                        "count": len(st["participants"]),
                    })

                # 3. Join +1 Leader (or auto_step when in LOBBY)
                if action == "join_one" or (action == "auto_step" and cur_phase == "LOBBY"):
                    st["simulationMode"] = True
                    demo_count = sum(1 for v in st["participants"].values() if v.get("isDemo"))
                    if demo_count >= 24:
                        return self._send_json({"ok": True, "simulated": "max_joined"})
                    tmpl = _get_sim_template_by_index(demo_count)
                    tmpl["simTemplateIdx"] = demo_count
                    # Ensure unique ID
                    if tmpl["id"] in st["participants"]:
                        tmpl["id"] = f"sim-leader-{demo_count+1}-{int(now*1000)%10000}"
                    p = _make_lobby_only_participant(tmpl)
                    p["joinedAt"] = now
                    st["participants"][p["id"]] = p
                    add_event(
                        st,
                        f"🇲🇾 {p['name']} ({p['regionBadge']}) joined in {LANG_NAMES.get(p['language'], p['language'])}!",
                        "join",
                    )
                    save_state(st)
                    return self._send_json({"ok": True, "simulated": "join", "participant": p})

                # Determine active challenge number ("1", "2", or "3")
                c_num = "1"
                if "C2" in cur_phase or st.get("activeRound") == "2":
                    c_num = "2"
                elif "C3" in cur_phase or st.get("activeRound") == "3":
                    c_num = "3"

                # 4. Clear submissions for current challenge so Presenter can replay C1/C2/C3
                if action == "clear_round_submissions":
                    for p in st["participants"].values():
                        if c_num in p.get("submissions", {}):
                            del p["submissions"][c_num]
                        if c_num in p.get("scores", {}):
                            del p["scores"][c_num]
                        p.setdefault("completed", {"1": False, "2": False, "3": False})[c_num] = False
                        p["status"] = f"📱 Working on Challenge {c_num}..."
                        p["agenticStep"] = f"Challenge {c_num} In Progress"
                        recompute_participant(p)
                    add_event(st, f"↺ Cleared Challenge {c_num} submissions for replay.", "info")
                    save_state(st)
                    return self._send_json({"ok": True, "simulated": "cleared_round"})

                # Ensure at least 4 demo leaders are in the arena if simulating submissions with 0 participants
                if not st["participants"]:
                    for i in range(6):
                        tmpl = _get_sim_template_by_index(i)
                        tmpl["simTemplateIdx"] = i
                        st["participants"][tmpl["id"]] = _make_lobby_only_participant(tmpl)

                # Helper to populate live activity on unsubmitted leaders so Presenter screen shows real-time progress
                activity_phrases = {
                    "1": [
                        ("📸 Capturing live selfie on phone camera...", "Camera Capture"),
                        ("✨ Transforming selfie into MDRT Studio Portrait (Gemini 2.5 Flash Image)...", "Studio Image Synthesis"),
                        ("💬 Generating localized VIP customer outreach message...", "VIP Outreach Drafting"),
                    ],
                    "2": [
                        ("🎭 Structuring Pillar 1 & 2 (PAMB Persona + HNW Client Context)...", "4-Pillar Framing"),
                        ("⚡ Testing 4-Pillar Prompt with Gemini 2.5 Flash...", "Live Prompt Evaluation"),
                        ("🏅 AI Prompt Judge scoring 4 Pillars (Persona, Context, Task, Format)...", "Rubric Grading"),
                    ],
                    "3": [
                        ("📂 Reviewing Dato' Sri Raymond Tan RM 6M Bank Guarantee dossier...", "Dossier Analysis"),
                        ("⚡ Synthesizing PRUWealth Enrich Clause 4.2.a...", "Grounded Policy Lookup"),
                        ("🤝 Co-creating counter-pitch with Agent Assist...", "Agent Assist Co-Creation"),
                    ],
                }

                unsubmitted_list = [
                    p for p in st["participants"].values()
                    if not p.get("submissions", {}).get(c_num)
                ]
                unsubmitted_list.sort(key=lambda x: x.get("joinedAt", 0))

                # 5. Activity Tick Only (simulates leaders working on their phones before submitting)
                if action == "activity_tick":
                    phrases = activity_phrases.get(c_num, activity_phrases["1"])
                    for idx_u, u_p in enumerate(unsubmitted_list[:3]):
                        st_txt, ag_step = phrases[(int(now) + idx_u) % len(phrases)]
                        u_p["status"] = st_txt
                        u_p["agenticStep"] = ag_step
                        u_p["activeChallenge"] = int(c_num)
                        u_p["updatedAt"] = now
                    save_state(st)
                    return self._send_json({"ok": True, "simulated": "activity_tick", "remaining": len(unsubmitted_list)})

                # 6. Submit All Remaining Joined Leaders for Current Challenge
                if action == "submit_all":
                    submitted_count = 0
                    for idx_u, p in enumerate(unsubmitted_list):
                        t_idx = p.get("simTemplateIdx", idx_u)
                        tmpl = _get_sim_template_by_index(t_idx)
                        sc = json.loads(json.dumps(tmpl["scores"][c_num]))
                        sub = json.loads(json.dumps(tmpl["submissions"][c_num]))
                        sub["submittedAt"] = time.strftime("%H:%M:%S")
                        sub["submittedAtTs"] = now + (idx_u * 0.05)
                        p.setdefault("completed", {"1": False, "2": False, "3": False})[c_num] = True
                        p.setdefault("scores", {})[c_num] = sc
                        p.setdefault("submissions", {})[c_num] = sub
                        recompute_participant(p)
                        p["status"] = f"✅ Submitted Challenge {c_num} ({sc['total']} pts in {sc['timeSec']}s)"
                        p["agenticStep"] = f"Challenge {c_num} Complete ✓"
                        p["updatedAt"] = now
                        submitted_count += 1
                    add_event(
                        st,
                        f"🔥 All {submitted_count} remaining PRUMDA Leaders submitted Challenge {c_num}!",
                        "submit",
                    )
                    save_state(st)
                    return self._send_json({"ok": True, "simulated": f"submit_all_c{c_num}", "count": submitted_count})

                # 7. Default (`submit_one` / `auto_step`): Submit next unsubmitted leader + update live activity on others!
                if unsubmitted_list:
                    target_p = unsubmitted_list[0]
                    # Also update live phone status on the next 2 unsubmitted leaders so the room feels alive
                    phrases = activity_phrases.get(c_num, activity_phrases["1"])
                    for idx_u, other_p in enumerate(unsubmitted_list[1:3]):
                        st_txt, ag_step = phrases[(int(now) + idx_u) % len(phrases)]
                        other_p["status"] = st_txt
                        other_p["agenticStep"] = ag_step
                        other_p["activeChallenge"] = int(c_num)

                    t_idx = target_p.get("simTemplateIdx", 0)
                    tmpl = _get_sim_template_by_index(t_idx)
                    sc = json.loads(json.dumps(tmpl["scores"][c_num]))
                    sub = json.loads(json.dumps(tmpl["submissions"][c_num]))
                    sub["submittedAt"] = time.strftime("%H:%M:%S")
                    sub["submittedAtTs"] = now
                    target_p.setdefault("completed", {"1": False, "2": False, "3": False})[c_num] = True
                    target_p.setdefault("scores", {})[c_num] = sc
                    target_p.setdefault("submissions", {})[c_num] = sub
                    recompute_participant(target_p)
                    target_p["status"] = f"✅ Submitted Challenge {c_num} ({sc['total']} pts in {sc['timeSec']}s)"
                    target_p["agenticStep"] = f"Challenge {c_num} Scored ✓"
                    target_p["updatedAt"] = now
                    add_event(
                        st,
                        f"🔥 🇲🇾 {target_p['name']} ({target_p['regionBadge']}) submitted Challenge {c_num} — Score: {sc['total']} pts!",
                        "submit",
                    )
                    save_state(st)
                    return self._send_json({
                        "ok": True,
                        "simulated": f"submit_c{c_num}",
                        "participant": target_p,
                        "remaining": len(unsubmitted_list) - 1,
                    })

                save_state(st)
                return self._send_json({"ok": True, "simulated": "all_submitted", "remaining": 0})

        if path == "/api/ai":
            challenge = str(body.get("challenge", "1"))
            pid = body.get("id", "")
            with _STATE_LOCK:
                st = load_state()
                pref_model = body.get("model") or st.get("preferredModel", "gemini-2.5-flash")

            fn = lambda prompt: call_vertex_gemini(prompt, pref_model)
            if challenge == "1":
                result = handle_c1_ai(body, fn, LANG_NAMES, call_vertex_gemini_image)
            elif challenge == "2":
                result = handle_c2_ai(body, fn, LANG_NAMES)
            elif challenge == "3":
                result = handle_c3_ai(body, fn, LANG_NAMES, call_vertex_gemini_image)
            elif challenge == "canvas":
                result = handle_canvas_ai(body, fn, LANG_NAMES)
            elif challenge == "coach":
                result = handle_coach_ai(body, fn, LANG_NAMES)
            else:
                result = handle_c1_ai(body, fn, LANG_NAMES, call_vertex_gemini_image)

            with _STATE_LOCK:
                st = load_state()
                st["lastModelUsed"] = result.get("modelUsed", pref_model)
                st["aiCallsCount"] = st.get("aiCallsCount", 24) + 1
                lat = int(result.get("latencyMs", 650))
                st["avgLatencyMs"] = round((st.get("avgLatencyMs", 740) * 0.8) + (lat * 0.2))
                if challenge == "canvas":
                    st["canvasState"] = result
                elif challenge == "coach":
                    existing_reactions = st.get("coachState", {}).get("reactions", {"fire": 28, "clap": 34, "diamond": 19, "rocket": 22})
                    result["reactions"] = existing_reactions
                    st["coachState"] = result
                elif pid and pid in st["participants"]:
                    st["participants"][pid]["status"] = f"⚡ Invoked {result.get('modelUsed', 'Gemini')} on Challenge {challenge} ({lat}ms)"
                    st["participants"][pid]["agenticStep"] = f"AI Output Verified ({lat}ms)"
                save_state(st)

            return self._send_json(result)

        if path == "/api/coach-react":
            reaction = body.get("reaction", "fire")
            actor = body.get("name", "PRUMDA Leader")
            with _STATE_LOCK:
                st = load_state()
                cs = st.setdefault("coachState", {})
                reacts = cs.setdefault("reactions", {"fire": 28, "clap": 34, "diamond": 19, "rocket": 22})
                if reaction in reacts:
                    reacts[reaction] = reacts.get(reaction, 0) + 1
                save_state(st)
                return self._send_json({"ok": True, "reactions": reacts})

        if path == "/api/game-control":
            action = body.get("action", "")
            with _STATE_LOCK:
                st = load_state()
                now = time.time()
                if action == "set_phase":
                    new_phase = body.get("phase", "LOBBY")
                    st["phase"] = new_phase
                    if new_phase == "LOBBY":
                        st["stageStartedAt"] = now
                        st["activeRound"] = "1"
                        add_event(
                            st,
                            "📡 Joining Arena Open! Scan the QR code, select your Name & Language, and read the briefs for Challenges 1, 2 & 3.",
                            "info",
                        )
                    elif new_phase == "C1_LIVE":
                        st["stageStartedAt"] = now
                        st["activeRound"] = "1"
                        add_event(
                            st,
                            "🚀 CHALLENGE 1 STARTED! Phones unlocked for Challenge 1: Reinvent Your Professional Image & Customer Outreach!",
                            "launch",
                        )
                    elif new_phase == "C1_RESULTS":
                        st["activeRound"] = "1"
                        add_event(
                            st,
                            "🏁 Challenge 1 Finished! Displaying Challenge 1 Final Scoreboard.",
                            "launch",
                        )
                    elif new_phase == "C2_LIVE":
                        st["stageStartedAt"] = now
                        st["activeRound"] = "2"
                        add_event(
                            st,
                            "🚀 CHALLENGE 2 STARTED! Phones unlocked for Challenge 2: Master the Art of AI Dialogue (Prompting)!",
                            "launch",
                        )
                    elif new_phase == "C2_RESULTS":
                        st["activeRound"] = "2"
                        add_event(
                            st,
                            "🏁 Challenge 2 Finished! Displaying Challenge 2 Scorers & Combined (C1 + C2) Leaderboard.",
                            "launch",
                        )
                    elif new_phase == "C3_LIVE":
                        st["stageStartedAt"] = now
                        st["activeRound"] = "3"
                        add_event(
                            st,
                            "🚀 CHALLENGE 3 STARTED! Phones unlocked for Challenge 3: High-Stakes Pre-Pitch & Agent Assist!",
                            "launch",
                        )
                    elif new_phase == "C3_RESULTS":
                        st["activeRound"] = "3"
                        add_event(
                            st,
                            "🏁 Challenge 3 Finished! Displaying Challenge 3 Scorers Only — Get Ready for the Final Combined Podium!",
                            "launch",
                        )
                    elif new_phase == "PODIUM":
                        st["activeRound"] = "3"
                        add_event(
                            st,
                            "🥁🏆 FINAL COMBINED TOP 3 CHAMPIONS REVEALED ON THE PODIUM!",
                            "launch",
                        )
                elif action == "set_round":
                    rnd = str(body.get("activeRound", "1"))
                    st["activeRound"] = rnd
                    st["stageStartedAt"] = now
                save_state(st)
                return self._send_json({
                    "ok": True,
                    "phase": st["phase"],
                    "activeRound": st.get("activeRound", "1"),
                    "timerElapsed": get_timer_elapsed(st),
                })

        if path == "/api/settings":
            with _STATE_LOCK:
                st = load_state()
                if "preferredModel" in body:
                    st["preferredModel"] = body["preferredModel"]
                    st["lastModelUsed"] = body["preferredModel"]
                if "simulateDemo" in body:
                    st["simulateDemo"] = bool(body["simulateDemo"])
                save_state(st)
                return self._send_json({"ok": True, "preferredModel": st["preferredModel"], "simulateDemo": st["simulateDemo"]})

        if path == "/api/reset":
            keep_demo = body.get("keepDemo", False)
            initial_phase = body.get("phase", "LOBBY")
            with _STATE_LOCK:
                prev_st = load_state()
                sim_mode = body.get("simulationMode", prev_st.get("simulationMode", True))
                st = _default_state(with_demo=keep_demo, initial_phase=initial_phase, simulation_mode=sim_mode)
                save_state(st)
                return self._send_json({"ok": True, "simulationMode": sim_mode})

        return self._send_json({"error": "Not found"}, status=404)


if __name__ == "__main__":
    os.makedirs(STATIC_DIR, exist_ok=True)
    server = ThreadingHTTPServer(("0.0.0.0", PORT), PAMBArenaHTTPHandler)
    print(f"PRUMDA Learning Trip AI Arena running on http://0.0.0.0:{PORT}", flush=True)
    server.serve_forever()
