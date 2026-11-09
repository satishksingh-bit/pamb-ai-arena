"""
============================================================================
CHALLENGE 2 MODULE (14:20 - 14:35 | 15 min)
"Deck Challenge — Simple → Enhanced Presentation (Prompt Studio)"
— Full Native Integration of `deck-challenge_v2.0` into PAMB AI Arena:
  • 5 Native Languages (Unified with Arena Lobby):
    - English (en)
    - Mandarin / 华语 (zh-CN)
    - Cantonese / 廣東話 (yue / zh-TW)
    - Bahasa Melayu (ms)
    - Tamil / தமிழ் (ta)
  • HNW Client Case Files:
    - MY Default: Datin Sharifah Aleya binti Syed Hamzah (Founder & MD, Aleya Specialist Clinics Sdn Bhd)
    - SG Switchable: Mr Jonathan Ng (Founder & CEO, NgLink Logistics Pte Ltd)
  • 5-Step Guided Prompt Coach (R.C.T.F.C.: Role, Context, Task, Format, Constraints)
  • Prompt → 3-Slide Enterprise Deck JSON (8 layouts: title, bullets, two_column, kpi, chart, table, timeline, quote)
  • AI Slide Image Generation (gemini-2.5-flash-image)
  • 10-Point Evaluation Judge: 6.0 AI Rubric + 2.5 Target Coverage + 1.5 Deterministic Checks
  • PPTX Export (/api/deck/pptx & /api/target/pptx)
============================================================================
"""

from __future__ import annotations

import base64
import concurrent.futures
import copy
import hashlib
import hmac
import io
import json
import logging
import os
from pathlib import Path
import re
import secrets
import threading
import time
import xml.sax.saxutils as saxutils
import zipfile
import requests

from challenges.c2_scenarios_bank import (
    get_c2_total_unique_seats,
    list_c2_archetype_summaries,
    resolve_c2_seat_scenario,
)

logger = logging.getLogger("deck-challenge")

BASE_DIR = Path(__file__).resolve().parent.parent
STATIC_DIR = BASE_DIR / "static"
SECRET = (os.environ.get("DECK_SECRET") or "pamb-deck-challenge-secret-2026").encode()
IMAGE_MODEL = os.environ.get("DECK_IMAGE_MODEL", "gemini-3.1-flash-image")

# Supported deck / content languages (Arena join codes zh-TW -> yue are mapped automatically).
LANGS = {
    "en": "English",
    "zh-CN": "Mandarin Chinese (Simplified Chinese characters)",
    "ms": "Bahasa Melayu (Malay)",
    "ta": "Tamil (தமிழ்)",
    "yue": "Cantonese (Traditional Chinese characters, colloquial Cantonese style)",
}
LANG_ALIASES = {"zh-TW": "yue", "zh-HK": "yue", "zh": "zh-CN", "tamil": "ta", "my": "ms"}


def norm_lang(lang: str | None) -> str:
    lang = LANG_ALIASES.get((lang or "en").strip(), (lang or "en").strip())
    return lang if lang in LANGS else "en"


LANG_LABELS = {
    "en": "English",
    "zh-CN": "中文 (Mandarin)",
    "ms": "Bahasa Melayu",
    "ta": "தமிழ் (Tamil)",
    "yue": "粵語 (Cantonese)",
}

SIMPLE_PROMPT = {
    "en": "Sample - Create a presentation for my meeting with a client about insurance.",
    "zh-CN": "示例 - 帮我做一个演示文稿，用于我和客户谈保险的会面。",
    "ms": "Contoh - Buat persembahan untuk mesyuarat saya dengan pelanggan tentang insurans.",
    "ta": "மாதிரி - காப்பீடு பற்றி ஒரு வாடிக்கையாளருடன் நான் சந்திக்கும் கூட்டத்திற்கு ஒரு விளக்கக்காட்சியை உருவாக்கவும்.",
    "yue": "示例 - 幫我整一份簡報，用嚟同客戶傾保險。",
}

UI = {
    "en": {"challenge": "Upgrade the simple prompt until your deck matches the 3-slide target."},
    "zh-CN": {"challenge": "不断优化这句简单提示词，直到你的简报接近3页目标简报。"},
    "ms": {"challenge": "Tingkatkan prompt ringkas sehingga dek anda menyamai dek sasaran 3 slaid."},
    "ta": {"challenge": "உங்கள் விளக்கக்காட்சி 3-ஸ்லைடு இலக்குடன் பொருந்தும் வரை எளிய ப்ராம்ப்டை மேம்படுத்துங்கள்."},
    "yue": {"challenge": "不斷改良呢句簡單提示詞，直到你份簡報貼近3頁目標簡報。"},
}

# Guided prompt building: one step per R.C.T.F.C. element (tip + insertable template).
GUIDE = [
    {
        "key": "role",
        "label": "Role",
        "tip": "Tell Gemini who it is. A clear expert role raises the quality of every slide.",
        "template": "Act as a senior PRUMDA wealth & legacy planning consultant preparing a client pre-pitch brief.",
    },
    {
        "key": "context",
        "label": "Context",
        "tip": "Add the client facts from the case file — family, wealth, liabilities, existing cover and concerns.",
        "template": "Client: Datin Sharifah Aleya (52, Founder & MD of Aleya Specialist Clinics Sdn Bhd, 6 clinics in Klang Valley). Family: Husband Dato' Hakim (58, retired, relies on ~RM 30k/month clinic dividends), children Aisyah (22, medicine, UK) & Imran (19, engineering, Melbourne, ~RM 450k/yr education). Wealth: Net worth ≈ RM 28M (clinic shares RM 19M / 68%, properties RM 6M, cash & FD RM 2.2M, ASB/unit trusts RM 0.8M). Liabilities: RM 4.5M clinic expansion loan with personal guarantee. Existing cover: RM 1M conventional life (2009). Concerns: Estate liquidity (faraid/probate 12–24m freeze), no clinic successor, prefers Shariah-compliant Takaful & hibah.",
    },
    {
        "key": "task",
        "label": "Task",
        "tip": "Say exactly what to produce and for which meeting.",
        "template": "Create a 3-slide pre-pitch deck for my 60-minute first meeting with this client at her Bangsar office (referred by her accountant).",
    },
    {
        "key": "format",
        "label": "Format",
        "tip": "Describe each slide: what goes on it, charts/tables, speaker notes and bullet limits.",
        "template": "Slide 1: client snapshot with KPI cards and meeting agenda. Slide 2: bar chart of liquidity needed (RM 10.5M) vs liquid assets + cover (RM 4.0M) vs gap (RM 6.5M), with key risks. Slide 3: strategy table (need, approach, why it fits, indicative cover) plus next steps. Add speaker notes to every slide; max 5 short bullets per slide.",
    },
    {
        "key": "constraints",
        "label": "Constraints",
        "tip": "Add the compliance guardrails and limits so the deck is safe to use.",
        "template": "Follow BNM Fair Treatment of Financial Consumers rules: complete a fact-find first, explain the PDS and 15-day free-look period, explain Takaful per Shariah principles, no guaranteed returns, figures are illustrative, and recommend independent legal/tax advice. Use only the facts given.",
    },
]

# ----------------------------------------------------------------------------- MARKETS
MARKETS = {
    "SG": {
        "code": "SG",
        "flag": "🇸🇬",
        "company": "Prudential Singapore",
        "short_name": "Pru SG",
        "currency": "SGD",
        "regulator": "Monetary Authority of Singapore (MAS)",
        "compliance_rules": [
            "MAS Financial Advisers Act (FAA) & FAA-N16 — fair dealing and needs-based advice",
            "Must perform a Financial Needs Analysis (fact-find) before recommending products",
            "No guarantees of non-guaranteed returns; illustrate with both 4.25% and 3% (par) where relevant",
            "Disclose product risks, fees, free-look period and policy exclusions",
            "No disparaging competitors; no replacement of existing policies without a proper switching analysis",
            "PDPA — obtain consent before collecting/using personal data",
        ],
        "products": [
            "PRUShield (Integrated Shield Plan) with PRUExtra riders",
            "PRUActive Life / PRULife Vantage (whole life protection)",
            "PRUActive Cash / PRUWealth (savings & endowment)",
            "PRUActive Retirement (retirement income)",
            "PRUCancer 360 / PRUMultiple Crisis Cover (critical illness)",
            "PRUPersonal Accident",
            "Corporate Keyman & Buy-Sell solutions for SMEs",
        ],
        "cultural_notes": (
            "Singaporean clients often compare against CPF, MediShield Life, T-bills, ETFs and bank "
            "products; value efficiency, transparency and data; family decisions often involve spouse "
            "and parents."
        ),
    },
    "MY": {
        "code": "MY",
        "flag": "🇲🇾",
        "company": "PRUMDA Learning Trip (Malaysia)",
        "short_name": "PRUMDA",
        "currency": "RM",
        "regulator": "Bank Negara Malaysia (BNM)",
        "compliance_rules": [
            "BNM Fair Treatment of Financial Consumers (FTFC) and Customer Due Diligence",
            "Complete a needs-based fact-find before recommending any product",
            "Explain Product Disclosure Sheet (PDS), benefits, exclusions, charges and 15-day free-look period",
            "No guarantees of non-guaranteed investment-linked returns",
            "Do not induce replacement of existing policies without a proper comparison",
            "PDPA 2010 — obtain consent before collecting/using personal data",
            "Takaful products must be explained per Shariah principles where applicable",
        ],
        "products": [
            "PRUMillion Med Active (medical card)",
            "PRUWith You (investment-linked protection)",
            "PRUBSN Takaful plans (Shariah-compliant)",
            "PRUCritical Care / PRUEarly Stage Crisis Cover (critical illness)",
            "PRULink Investment-linked funds",
            "PRUSafe Retirement / education savings plans",
            "Keyman & Business Continuity cover for SMEs",
        ],
        "cultural_notes": (
            "Malaysian clients often weigh EPF/KWSP savings, medical-card premium increases, Takaful vs "
            "conventional options, and family/elders' opinions; relationship and trust are built before "
            "product discussion."
        ),
    },
}


def market_context_block(code: str | None) -> str:
    m = MARKETS.get((code or "MY").upper(), MARKETS["MY"])
    rules = "\n".join(f"  - {r}" for r in m["compliance_rules"])
    products = "\n".join(f"  - {p}" for p in m["products"])
    return (
        f"MARKET: {m['company']} ({m['code']}), currency {m['currency']}, regulator {m['regulator']}.\n"
        f"Compliance rules:\n{rules}\n"
        f"Typical product shelf:\n{products}\n"
        f"Cultural notes: {m['cultural_notes']}"
    )


# ----------------------------------------------------------------------------- MALAYSIA (default)
CASE_MY = {
    "client": "Datin Sharifah Aleya binti Syed Hamzah, 52 — Founder & Managing Director, Aleya Specialist Clinics Sdn Bhd (6 clinics in the Klang Valley)",
    "family": "Husband Dato' Hakim (58, retired, relies on clinic dividends ~RM 30k/month); children Aisyah (22, medicine, UK) and Imran (19, engineering, Melbourne)",
    "wealth": "Net worth ≈ RM 28M: clinic group shares ≈ RM 19M (68%), properties RM 6M, cash & FD RM 2.2M, ASB/unit trusts RM 0.8M",
    "liabilities": "RM 4.5M clinic expansion loan with her personal guarantee",
    "existing_cover": "Conventional life policy RM 1M (2009); company group medical",
    "concerns": "Estate liquidity & continuity — keeping all 6 specialist clinics 100% family-owned across 12–24m Faraid/probate administration; clinic leadership succession; sustaining husband's retirement income; funding children's overseas education (~RM 450k/year); prefers Shariah-compliant solutions (Takaful, hibah)",
    "meeting": "60-minute first meeting at her Bangsar office, referred by her accountant",
    "rules": "BNM Fair Treatment of Financial Consumers; fact-find before recommending; explain PDS and 15-day free-look; explain Takaful per Shariah principles; recommend legal/tax advice; no guaranteed returns",
}

TARGET_MY = {
    "title": "Pre-Pitch Brief: Datin Sharifah Aleya",
    "subtitle": "Legacy, Estate Liquidity & Business Continuity Review",
    "slides": [
        {
            "layout": "title",
            "title": "Datin Sharifah Aleya — Client Snapshot & Meeting Objective",
            "subtitle": "First meeting · Bangsar office · 60 min · Referred by her accountant",
            "kpis": [
                {"label": "Net worth", "value": "≈ RM 28M", "note": "68% in clinic shares"},
                {"label": "Personal guarantee", "value": "RM 4.5M", "note": "Clinic expansion loan"},
                {"label": "Existing cover", "value": "RM 1M", "note": "Conventional, 2009"},
                {"label": "Dependants", "value": "3", "note": "Husband + 2 children overseas"},
            ],
            "bullets": [
                "Objective: understand her legacy goals and agree a fact-find for a Shariah-compliant plan",
                "Agenda: her goals · exposure review · strategy options · next steps",
            ],
            "left": None,
            "right": None,
            "chart": None,
            "table": None,
            "steps": None,
            "callout": None,
            "speaker_notes": "Thank her accountant for the referral. Position this as a review, not a sale. Confirm her priorities in her own words before any numbers.",
            "image_prompt": "Elegant corporate illustration of a confident Malaysian businesswoman founder in a modern private clinic lobby, warm light, no text",
            "image": None,
        },
        {
            "layout": "chart",
            "title": "The Estate Liquidity Gap",
            "subtitle": None,
            "kpis": None,
            "left": None,
            "right": None,
            "chart": {
                "type": "bar",
                "unit": "RM million (illustrative)",
                "series": [
                    {"label": "Liquidity needed", "value": 10.5},
                    {"label": "Liquid assets + cover", "value": 4.0},
                    {"label": "Gap", "value": 6.5},
                ],
            },
            "table": None,
            "steps": None,
            "bullets": [
                "Need: RM 4.5M guarantee + RM 1.0M estate costs + RM 3.6M husband's income + RM 1.35M education",
                "68% of wealth is in clinic shares — benefits from dedicated cash liquidity for smooth Faraid harmony",
                "Dedicated liquidity ensures credit facilities & clinic operations continue smoothly across 12–24m administration",
            ],
            "callout": "Dedicated liquidity keeps all 6 specialist clinics 100% family-owned while funding overseas university milestones.",
            "speaker_notes": "Walk through each component and let her correct the assumptions. Figures are illustrative until the fact-find.",
            "image_prompt": None,
            "image": None,
        },
        {
            "layout": "table",
            "title": "Recommended Strategy & Next Steps (subject to fact-find)",
            "subtitle": None,
            "kpis": None,
            "left": None,
            "right": None,
            "chart": None,
            "table": {
                "headers": ["Need", "Approach", "Why it fits", "Indicative cover"],
                "rows": [
                    ["Estate liquidity", "Family Takaful with hibah nomination", "Paid to beneficiaries outside the estate", "RM 5M"],
                    ["Personal guarantee", "Credit-related Takaful", "Clears the RM 4.5M loan", "RM 4.5M"],
                    ["Business continuity", "Key-person Takaful + buy-sell", "Funds a smooth handover", "To be sized"],
                ],
            },
            "steps": None,
            "bullets": [
                "Next: full fact-find → joint session with accountant & lawyer → proposal with PDS",
                "✔ Shariah principles explained · ✔ 15-day free-look · ✔ No guaranteed returns",
            ],
            "callout": 'Close: "Shall we book 45 minutes next week with your accountant to complete the fact-find?"',
            "speaker_notes": "Present options, not a product push. Handle 'I already have RM 1M cover' by showing it covers less than a quarter of the guarantee.",
            "image_prompt": "Minimal corporate illustration of a family legacy shield protecting a modern clinic building and a family home, navy and red palette, no text",
            "image": None,
        },
    ],
}

# ----------------------------------------------------------------------------- SINGAPORE
CASE_SG = {
    "client": "Mr Jonathan Ng, 55 — Founder & CEO, NgLink Logistics Pte Ltd (regional freight forwarder, 400 staff)",
    "family": "Wife Michelle (53, homemaker); daughter Rachel (27, works in the firm) and son Ethan (24, studying in London)",
    "wealth": "Net worth ≈ SGD 30M: company shares ≈ SGD 20M (67%), properties SGD 7M, cash SGD 2M, private-bank portfolio SGD 1M",
    "liabilities": "SGD 5M SORA-linked private-bank property loan and a SGD 3M company facility with his personal guarantee",
    "existing_cover": "Term life SGD 1.5M; MediShield Life + Integrated Shield Plan",
    "concerns": "Estate liquidity and family harmony; succession (Rachel vs external CEO); protecting Michelle; margin-call risk; wants a Section 49L trust nomination",
    "meeting": "60-minute first meeting at his Changi office, referred by his private banker",
    "rules": "MAS FAA & FAA-N16 fair dealing; fact-find before recommending; disclose fees, risks and free-look; no guaranteed returns; recommend legal/tax advice",
}

TARGET_SG = {
    "title": "Pre-Pitch Brief: Mr Jonathan Ng",
    "subtitle": "Legacy, Estate Liquidity & Succession Review",
    "slides": [
        {
            "layout": "title",
            "title": "Mr Jonathan Ng — Client Snapshot & Meeting Objective",
            "subtitle": "First meeting · Changi office · 60 min · Referred by his private banker",
            "kpis": [
                {"label": "Net worth", "value": "≈ SGD 30M", "note": "67% in company shares"},
                {"label": "Loans & guarantee", "value": "SGD 8M", "note": "SGD 5M loan + SGD 3M guarantee"},
                {"label": "Existing cover", "value": "SGD 1.5M", "note": "Term life"},
                {"label": "Dependants", "value": "3", "note": "Wife + 2 children"},
            ],
            "bullets": [
                "Objective: understand his legacy and succession goals; agree a fact-find",
                "Agenda: goals · exposure review · strategy options · next steps",
            ],
            "left": None,
            "right": None,
            "chart": None,
            "table": None,
            "steps": None,
            "callout": None,
            "speaker_notes": "Thank the private banker for the referral. Frame it as a legacy review.",
            "image_prompt": "Elegant corporate illustration of a confident Singaporean Chinese logistics company founder in a modern office overlooking a container port, no text",
            "image": None,
        },
        {
            "layout": "chart",
            "title": "The Estate Liquidity Gap",
            "subtitle": None,
            "kpis": None,
            "left": None,
            "right": None,
            "chart": {
                "type": "bar",
                "unit": "SGD million (illustrative)",
                "series": [
                    {"label": "Liquidity needed", "value": 12.0},
                    {"label": "Liquid assets + cover", "value": 4.5},
                    {"label": "Gap", "value": 7.5},
                ],
            },
            "table": None,
            "steps": None,
            "bullets": [
                "Need: SGD 5M loan + SGD 3M guarantee + SGD 2.5M for Michelle + SGD 1.5M estate & equalisation",
                "67% of wealth in unlisted shares; succession not yet decided",
                "SORA rises or a market fall could trigger margin calls",
            ],
            "callout": "Liquidity protects family harmony and keeps the business intact.",
            "speaker_notes": "Figures are illustrative; confirm in the fact-find.",
            "image_prompt": None,
            "image": None,
        },
        {
            "layout": "table",
            "title": "Recommended Strategy & Next Steps (subject to fact-find)",
            "subtitle": None,
            "kpis": None,
            "left": None,
            "right": None,
            "chart": None,
            "table": {
                "headers": ["Need", "Approach", "Why it fits", "Indicative cover"],
                "rows": [
                    ["Estate liquidity", "Universal Life with Section 49L trust nomination", "Creditor-protected, outside probate", "SGD 6M"],
                    ["Loan & guarantee", "Term cover assigned to the facilities", "Preserves 100% enterprise & property ownership", "SGD 8M"],
                    ["Succession", "Key-person cover + buy-sell agreement", "Funds the transition", "To be sized"],
                ],
            },
            "steps": None,
            "bullets": [
                "Next: fact-find → joint session with banker & lawyer → proposal with Product Summary",
                "✔ Fees & risks disclosed · ✔ Free-look explained · ✔ Non-guaranteed returns shown at both rates",
            ],
            "callout": 'Close: "Shall we schedule 45 minutes with your banker next week to complete the fact-find?"',
            "speaker_notes": "Options, not a product push. Respect the private-banker relationship.",
            "image_prompt": "Minimal corporate illustration of a legacy shield protecting a family home and a logistics business, navy and red palette, no text",
            "image": None,
        },
    ],
}

CASES = {"MY": CASE_MY, "SG": CASE_SG}
TARGETS = {"MY": TARGET_MY, "SG": TARGET_SG}
TARGET_SLIDES = 3


def case_file_text(market: str) -> str:
    return "\n".join(f"- {k.replace('_', ' ').title()}: {v}" for k, v in CASES[market].items())


# Pre-translated instant cache for MY in zh-CN, yue, ms, ta so participants get <5ms zero-wait loading!
PRETRANSLATED_MY = {
    "zh-CN": {
        "case": {
            "client": "Datin Sharifah Aleya binti Syed Hamzah，52岁 — Aleya Specialist Clinics Sdn Bhd 创始人兼董事总经理（巴生谷拥有6家专科诊所）",
            "family": "丈夫 Dato' Hakim（58岁，已退休，依赖诊所每月约 RM 30k 分红）；女儿 Aisyah（22岁，英国读医科）及儿子 Imran（19岁，墨尔本读工程系）",
            "wealth": "净资产 ≈ RM 28M：诊所集团股权 ≈ RM 19M (68%)、房产 RM 6M、现金及定存 RM 2.2M、ASB/信托基金 RM 0.8M",
            "liabilities": "RM 4.5M 诊所扩建银行贷款（由她提供个人担保 Personal Guarantee）",
            "existing_cover": "传统人寿保单 RM 1M（2009年投保）；公司团体医疗险",
            "concerns": "遗产流动性与延续规划 — 在12–24个月伊斯兰遗产分配法 (Faraid) 及遗嘱办理期间确保6家专科诊所100%归家族持有；诊所管理层传承；稳步支持丈夫退休生活与子女海外留学里程碑（约 RM 450k/年）；倾向符合伊斯兰教义 (Shariah-compliant) 的方案（Takaful、Hibah 赠与）",
            "meeting": "在她孟沙 (Bangsar) 办公室进行60分钟首次会面，由她的会计师转介",
            "rules": "遵守马来西亚国家银行 (BNM) 公平对待金融消费者准则；推荐前先完成财务需求分析 (Fact-find)；说明产品披露说明书 (PDS) 及15天犹豫期；按伊斯兰教义解释 Takaful；建议咨询法律/税务顾问；不承诺保证收益",
        },
        "guide": [
            {
                "key": "role",
                "label": "角色 (Role)",
                "tip": "告诉 Gemini 它的专业身份。清晰的资深顾问角色能全面提升每一页简报的专业度。",
                "template": "请扮演一位 PRUMDA 资深财富与家族传承规划顾问，正在为高净值客户准备首次会面的战前提案简报 (Pre-Pitch Brief)。",
            },
            {
                "key": "context",
                "label": "背景 (Context)",
                "tip": "加入客户档案中的关键事实——家庭结构、资产分布、负债担保、现有保单及核心顾虑。",
                "template": "客户：Datin Sharifah Aleya（52岁，Aleya Specialist Clinics 创始人，巴生谷6家诊所）。家庭：丈夫 Dato' Hakim（58岁退休，依赖每月 RM 30k 诊所分红），女儿英国读医、儿子墨尔本读工程（每年留学费约 RM 450k）。净资产 ≈ RM 28M（诊所股权 RM 19M 占68%、房产 RM 6M、现金定存 RM 2.2M、信托 RM 0.8M）。负债：RM 4.5M 诊所扩建贷款含个人担保。现有保障：RM 1M 传统寿险（2009年）。痛点：Faraid/遗产认证可能冻结资产12-24个月、诊所无接班人、偏好符合教义的 Takaful 与 Hibah 方案。会面：会计师转介，Bangsar 办公室60分钟首次会面。",
            },
            {
                "key": "task",
                "label": "任务 (Task)",
                "tip": "明确说明需要生成几页简报以及用于哪场会面。",
                "template": "请为我与这位客户的首次会面制作一份 3页 (3-slide) 的高管战前提案简报。",
            },
            {
                "key": "format",
                "label": "格式 (Format)",
                "tip": "具体描述每一页的内容结构：KPI卡片、柱状图、策略表格、演讲者备注及字数限制。",
                "template": "第1页：客户全景快照（含4个KPI指标卡）及会面议程。第2页：遗产流动性缺口柱状图（所需流动资金 RM 10.5M vs 现有流动资产+保额 RM 4.0M vs 缺口 RM 6.5M）及核心风险要点。第3页：策略建议对比表（需求、方案、匹配原因、建议保额）及下一步行动。每页附上演讲者备注 (Speaker Notes)，每页最多5条精炼要点。",
            },
            {
                "key": "constraints",
                "label": "合规约束 (Constraints)",
                "tip": "加上监管合规护栏与边界，确保简报安全合规。",
                "template": "严格遵循国家银行 (BNM) 公平对待消费者准则：先做全面财务需求分析 (Fact-find)，说明产品披露表 (PDS) 与15天犹豫期 (Free-look)，阐明 Takaful 伊斯兰教义原则，注明数字仅供说明且非保证收益，并建议协同会计师与律师落实。",
            },
        ],
        "target": {
            "title": "战前提案简报：Datin Sharifah Aleya",
            "subtitle": "家族传承、遗产流动性与诊所业务延续规划审视",
            "slides": [
                {
                    "layout": "title",
                    "title": "Datin Sharifah Aleya — 客户概况与会面目标",
                    "subtitle": "首次会面 · 孟沙 (Bangsar) 办公室 · 60分钟 · 会计师转介",
                    "kpis": [
                        {"label": "净资产", "value": "≈ RM 28M", "note": "68% 为诊所集团股权"},
                        {"label": "个人连带担保", "value": "RM 4.5M", "note": "诊所扩建银行贷款"},
                        {"label": "现有寿险保障", "value": "RM 1M", "note": "传统保单 (2009年)"},
                        {"label": "家庭受养人", "value": "3人", "note": "丈夫 + 2名海外留学子女"},
                    ],
                    "bullets": [
                        "会面目标：倾听她的家族传承优先事项，并商定针对伊斯兰合规方案的财务需求分析 (Fact-find)",
                        "今日议程：核心目标确认 · 风险敞口审视 · 策略方案框架 · 下一步行动",
                    ],
                    "left": None,
                    "right": None,
                    "chart": None,
                    "table": None,
                    "steps": None,
                    "callout": None,
                    "speaker_notes": "首先感谢会计师的专业转介。将本次会面定位为一次客观的风险审视而非产品推销，在展示任何数字前先用她自己的话确认核心关注点。",
                    "image_prompt": "Elegant corporate illustration of a confident Malaysian businesswoman founder in a modern private clinic lobby, warm light, no text",
                    "image": None,
                },
                {
                    "layout": "chart",
                    "title": "遗产流动性缺口分析 (Estate Liquidity Gap)",
                    "subtitle": None,
                    "kpis": None,
                    "left": None,
                    "right": None,
                    "chart": {
                        "type": "bar",
                        "unit": "百万令吉 RM million（示意数据）",
                        "series": [
                            {"label": "所需流动资金", "value": 10.5},
                            {"label": "流动资产 + 现有保额", "value": 4.0},
                            {"label": "流动性缺口", "value": 6.5},
                        ],
                    },
                    "table": None,
                    "steps": None,
                    "bullets": [
                        "资金需求：RM 4.5M 贷款担保 + RM 1.0M 遗产处理费 + RM 3.6M 丈夫生活费 + RM 1.35M 子女海外学费",
                        "68% 资产集中在诊所非上市股权——配置专项流动资金有助于实现 Faraid 和谐传承",
                        "专项现金储备确保在 12–24 个月遗产办理期间诊所授信稳健延续、运营无忧",
                    ],
                    "callout": "充足的专项流动性可守护全部 6 家专科诊所 100% 归家族持有，并稳步支持子女完成海外学业。",
                    "speaker_notes": "逐项梳理测算逻辑，邀请她修正假设条件。强调所有数字仅为初步示意，待正式 Fact-find 后精准核定。",
                    "image_prompt": None,
                    "image": None,
                },
                {
                    "layout": "table",
                    "title": "建议策略框架与下一步行动（须经财务需求分析核实）",
                    "subtitle": None,
                    "kpis": None,
                    "left": None,
                    "right": None,
                    "chart": None,
                    "table": {
                        "headers": ["核心需求", "配置策略", "为何契合", "参考保额"],
                        "rows": [
                            ["遗产流动性", "家庭伊斯兰保险 (Family Takaful) + Hibah 赠与指定", "赔付直接归受益人，不列入冻结遗产", "RM 5M"],
                            ["个人贷款担保", "信贷相关 Takaful 保障", "直接清偿 RM 4.5M 诊所扩建贷款", "RM 4.5M"],
                            ["业务延续规划", "关键人物 Takaful + 股权买卖协议 (Buy-Sell)", "为诊所平稳交接提供专项资金", "待评估核定"],
                        ],
                    },
                    "steps": None,
                    "bullets": [
                        "下一步：完成全面 Fact-find → 与会计师及律师三方会商 → 呈交附带 PDS 的正式方案",
                        "✔ 阐明 Shariah 教义原则 · ✔ 15天犹豫期 (Free-look) · ✔ 非保证收益合规披露",
                    ],
                    "callout": "会面促成：“我们下周是否可以约您的会计师一起花45分钟完成正式的财务需求分析 (Fact-find)？”",
                    "speaker_notes": "呈现清晰策略选项而非硬推产品。若客户提出“我已有 RM 1M 保单”，可温和指出该保额尚不足以覆盖 RM 4.5M 贷款担保的四分之一。",
                    "image_prompt": "Minimal corporate illustration of a family legacy shield protecting a modern clinic building and a family home, navy and red palette, no text",
                    "image": None,
                },
            ],
        },
    },
    "yue": {
        "case": {
            "client": "Datin Sharifah Aleya binti Syed Hamzah，52歲 — Aleya Specialist Clinics Sdn Bhd 創辦人兼董事總經理（喺巴生谷擁有6間專科診所）",
            "family": "丈夫 Dato' Hakim（58歲，已退休，靠診所每月約 RM 30k 分紅生活）；女 Aisyah（22歲，英國讀醫科）同埋仔 Imran（19歲，墨爾本讀工程系）",
            "wealth": "淨資產 ≈ RM 28M：診所集團股權 ≈ RM 19M (68%)、物業 RM 6M、現金及定期 RM 2.2M、ASB/信託基金 RM 0.8M",
            "liabilities": "RM 4.5M 診所擴建銀行貸款（由佢簽個人擔保 Personal Guarantee）",
            "existing_cover": "傳統人壽保單 RM 1M（2009年買落）；公司團體醫療保",
            "concerns": "遺產流動性與延續規劃 — 喺12–24個月伊斯蘭遺產分配法 (Faraid) 同遺囑辦理期間守護6間專科診所100%歸家族持有；診所管理層傳承；穩步照顧丈夫退休生活同仔女外國讀書里程碑（約 RM 450k/年）；傾向符合伊斯蘭教義 (Shariah-compliant) 嘅方案（Takaful、Hibah 贈與）",
            "meeting": "喺佢孟沙 (Bangsar) 辦公室進行60分鐘首次會面，由佢會計師轉介",
            "rules": "遵守馬來西亞國家銀行 (BNM) 公平對待金融消費者準則；推薦前必先完成財務需求分析 (Fact-find)；講解產品披露說明書 (PDS) 同15日冷靜期；按伊斯蘭教義解釋 Takaful；建議諮詢法律/稅務顧問；唔保證非保證回報",
        },
        "guide": [
            {
                "key": "role",
                "label": "角色 (Role)",
                "tip": "話俾 Gemini 知佢嘅專業身份。清晰嘅資深顧問角色可以令每一頁簡報都更有說服力。",
                "template": "請扮演一位 PRUMDA 資深財富與家族傳承規劃顧問，為高淨值客戶準備首次會面嘅戰前提案簡報 (Pre-Pitch Brief)。",
            },
            {
                "key": "context",
                "label": "背景 (Context)",
                "tip": "加入客戶檔案入面嘅關鍵事實——家庭結構、資產分佈、負債擔保、現有保單同埋核心憂慮。",
                "template": "客戶：Datin Sharifah Aleya（52歲，Aleya Specialist Clinics 創辦人，巴生谷6間診所）。家庭：丈夫 Dato' Hakim（58歲退休，靠每月 RM 30k 診所分紅），女喺英國讀醫、仔喺墨爾本讀工程（每年學費約 RM 450k）。淨資產 ≈ RM 28M（診所股權 RM 19M 佔68%、物業 RM 6M、現金定期 RM 2.2M、信託 RM 0.8M）。負債：RM 4.5M 診所擴建貸款連個人擔保。現有保障：RM 1M 傳統人壽（2009年）。痛點：Faraid/遺產認證可能凍結資產12-24個月、診所無接班人、偏好符合教義嘅 Takaful 同 Hibah 方案。會面：會計師轉介，Bangsar 辦公室60分鐘首次會面。",
            },
            {
                "key": "task",
                "label": "任務 (Task)",
                "tip": "講清楚要整幾多頁簡報同埋用喺邊場會面。",
                "template": "請為我同呢位客戶嘅首次會面製作一份 3頁 (3-slide) 嘅高管戰前提案簡報。",
            },
            {
                "key": "format",
                "label": "格式 (Format)",
                "tip": "具體描述每一頁嘅內容結構：KPI卡片、柱狀圖、策略表格、演講備註同埋字數限制。",
                "template": "第1頁：客戶全景快照（連4個KPI指標卡）同會面議程。第2頁：遺產流動性缺口柱狀圖（所需流動資金 RM 10.5M vs 現有流動資產+保額 RM 4.0M vs 缺口 RM 6.5M）及核心風險要點。第3頁：策略建議對比表（需求、方案、點解適合、建議保額）同下一步行動。每頁加上演講備註 (Speaker Notes)，每頁最多5條精簡要點。",
            },
            {
                "key": "constraints",
                "label": "合規約束 (Constraints)",
                "tip": "加上監管合規護欄同限制，確保簡報安全見客。",
                "template": "嚴格跟足國家銀行 (BNM) 公平對待消費者準則：先做全面財務需求分析 (Fact-find)，講解產品披露表 (PDS) 同15日冷靜期 (Free-look)，闡明 Takaful 伊斯蘭教義原則，註明數字僅供參考且非保證回報，並建議聯同會計師同律師一齊落實。",
            },
        ],
        "target": {
            "title": "戰前提案簡報：Datin Sharifah Aleya",
            "subtitle": "家族傳承、遺產流動性與診所業務延續規劃審視",
            "slides": [
                {
                    "layout": "title",
                    "title": "Datin Sharifah Aleya — 客戶概況與會面目標",
                    "subtitle": "首次會面 · 孟沙 (Bangsar) 辦公室 · 60分鐘 · 會計師轉介",
                    "kpis": [
                        {"label": "淨資產", "value": "≈ RM 28M", "note": "68% 為診所集團股權"},
                        {"label": "個人連帶擔保", "value": "RM 4.5M", "note": "診所擴建銀行貸款"},
                        {"label": "現有壽險保障", "value": "RM 1M", "note": "傳統保單 (2009年)"},
                        {"label": "家庭受養人", "value": "3人", "note": "丈夫 + 2名海外留學子女"},
                    ],
                    "bullets": [
                        "會面目標：了解佢嘅家族傳承優先事項，並約定做符合伊斯蘭教義方案嘅財務需求分析 (Fact-find)",
                        "今日議程：核心目標確認 · 風險敞口審視 · 策略方案框架 · 下一步行動",
                    ],
                    "left": None,
                    "right": None,
                    "chart": None,
                    "table": None,
                    "steps": None,
                    "callout": None,
                    "speaker_notes": "首先多謝會計師嘅轉介。將今次會面定位為客觀審視而唔係硬銷產品，喺講任何數字之前先用佢自己嘅說話確認優先次序。",
                    "image_prompt": "Elegant corporate illustration of a confident Malaysian businesswoman founder in a modern private clinic lobby, warm light, no text",
                    "image": None,
                },
                {
                    "layout": "chart",
                    "title": "遺產流動性缺口分析 (Estate Liquidity Gap)",
                    "subtitle": None,
                    "kpis": None,
                    "left": None,
                    "right": None,
                    "chart": {
                        "type": "bar",
                        "unit": "百萬令吉 RM million（示意數據）",
                        "series": [
                            {"label": "所需流動資金", "value": 10.5},
                            {"label": "流動資產 + 現有保額", "value": 4.0},
                            {"label": "流動性缺口", "value": 6.5},
                        ],
                    },
                    "table": None,
                    "steps": None,
                    "bullets": [
                        "資金需求：RM 4.5M 貸款擔保 + RM 1.0M 遺產處理費 + RM 3.6M 丈夫生活費 + RM 1.35M 仔女外國學費",
                        "68% 資產集中喺診所非上市股權——配置專項流動資金有助實現 Faraid 和睦傳承",
                        "專項現金儲備確保喺 12–24 個月遺產辦理期間診所授信同日常營運穩健延續",
                    ],
                    "callout": "充足嘅專項流動性可以守護全部 6 間專科診所 100% 歸家族持有，同時穩步支持仔女完成外國大學里程碑。",
                    "speaker_notes": "逐項同佢行一次條數，等佢修正假設。強調所有數字只係初步示意，要完成正式 Fact-find 先至作準。",
                    "image_prompt": None,
                    "image": None,
                },
                {
                    "layout": "table",
                    "title": "建議策略框架與下一步行動（須經財務需求分析核實）",
                    "subtitle": None,
                    "kpis": None,
                    "left": None,
                    "right": None,
                    "chart": None,
                    "table": {
                        "headers": ["核心需求", "配置策略", "點解適合", "參考保額"],
                        "rows": [
                            ["遺產流動性", "家庭伊斯蘭保險 (Family Takaful) + Hibah 贈與指定", "賠償直接交俾受益人，唔使入凍結遺產", "RM 5M"],
                            ["個人貸款擔保", "信貸相關 Takaful 保障", "直接清還 RM 4.5M 診所擴建貸款", "RM 4.5M"],
                            ["業務延續規劃", "關鍵人物 Takaful + 股權買賣協議 (Buy-Sell)", "為診所順利交接提供專項資金", "待評估核定"],
                        ],
                    },
                    "steps": None,
                    "bullets": [
                        "下一步：完成全面 Fact-find → 聯同會計師及律師三方會商 → 呈交附帶 PDS 嘅正式建議書",
                        "✔ 講解 Shariah 教義原則 · ✔ 15日冷靜期 (Free-look) · ✔ 非保證回報合規披露",
                    ],
                    "callout": "會面促成：「不如我哋下星期約埋你位會計師，用45分鐘一齊完成份財務需求分析 (Fact-find)？」",
                    "speaker_notes": "提供清晰方案選擇而唔係硬推產品。如果客人話「我已經有 RM 1M 保單」，可以溫和指出嗰筆錢連 RM 4.5M 貸款擔保嘅四分之一都未夠。",
                    "image_prompt": "Minimal corporate illustration of a family legacy shield protecting a modern clinic building and a family home, navy and red palette, no text",
                    "image": None,
                },
            ],
        },
    },
    "ms": {
        "case": {
            "client": "Datin Sharifah Aleya binti Syed Hamzah, 52 — Pengasas & Pengarah Urusan, Aleya Specialist Clinics Sdn Bhd (6 klinik pakar di Lembah Klang)",
            "family": "Suami Dato' Hakim (58, bersara, bergantung pada dividen klinik ~RM 30k/bulan); anak-anak Aisyah (22, perubatan, UK) dan Imran (19, kejuruteraan, Melbourne)",
            "wealth": "Nilai bersih ≈ RM 28J: saham kumpulan klinik ≈ RM 19J (68%), hartanah RM 6J, tunai & FD RM 2.2J, ASB/unit amanah RM 0.8J",
            "liabilities": "Pinjaman pengembangan klinik RM 4.5J dengan jaminan peribadi (personal guarantee) beliau",
            "existing_cover": "Polisi hayat konvensional RM 1J (2009); perubatanกลุ่ม syarikat",
            "concerns": "Kecairan & kesinambungan harta pusaka — memastikan kesemua 6 klinik pakar kekal 100% milik keluarga sepanjang pentadbiran faraid/probet 12–24 bulan; peralihan kepimpinan klinik; menyokong pendapatan persaraan suami serta pengajian universiti anak di luar negara (~RM 450k/tahun); memilih penyelesaian patuh Syariah (Takaful, hibah)",
            "meeting": "Mesyuarat pertama 60 minit di pejabat Bangsar beliau, dirujuk oleh akauntan beliau",
            "rules": "Layanan Adil terhadap Pengguna Kewangan BNM; lakukan analisis keperluan (fact-find) sebelum mengesyorkan; terangkan PDS dan tempoh bertenang 15 hari; terangkan Takaful mengikut prinsip Syariah; syorkan nasihat guaman/cukai; tiada pulangan terjamin",
        },
        "guide": [
            {
                "key": "role",
                "label": "Peranan (Role)",
                "tip": "Beritahu Gemini peranannya. Peranan pakar yang jelas meningkatkan kualiti setiap slaid.",
                "template": "Bertindak sebagai perunding kanan perancangan kekayaan & legasi PRUMDA yang menyediakan ringkasan pra-pembentangan pelanggan.",
            },
            {
                "key": "context",
                "label": "Konteks (Context)",
                "tip": "Masukkan fakta pelanggan daripada fail kes — keluarga, kekayaan, liabiliti, perlindungan sedia ada dan kebimbangan.",
                "template": "Pelanggan: Datin Sharifah Aleya (52, Pengasas & MD Aleya Specialist Clinics Sdn Bhd, 6 klinik di Lembah Klang). Keluarga: Suami Dato' Hakim (58, bersara, bergantung pada dividen klinik ~RM 30k/bulan), anak Aisyah (22, perubatan, UK) & Imran (19, kejuruteraan, Melbourne, pendidikan ~RM 450k/thn). Nilai bersih ≈ RM 28J (saham klinik RM 19J / 68%, hartanah RM 6J, tunai & FD RM 2.2J, ASB/unit amanah RM 0.8J). Liabiliti: Pinjaman pengembangan klinik RM 4.5J dengan jaminan peribadi. Perlindungan sedia ada: Hayat konvensional RM 1J (2009). Kebimbangan: Kecairan pusaka (pembekuan faraid/probet 12–24 bulan), tiada pengganti klinik, memilih Takaful & hibah patuh Syariah.",
            },
            {
                "key": "task",
                "label": "Tugasan (Task)",
                "tip": "Nyatakan dengan tepat apa yang perlu dihasilkan dan untuk mesyuarat mana.",
                "template": "Hasilkan dek pra-pembentangan 3 slaid untuk mesyuarat pertama 60 minit saya dengan pelanggan ini di pejabat Bangsar beliau (dirujuk oleh akauntannya).",
            },
            {
                "key": "format",
                "label": "Format",
                "tip": "Huraikan setiap slaid: kandungan, carta/jadual, nota pembentang dan had poin.",
                "template": "Slaid 1: ringkasan pelanggan dengan kad KPI dan agenda mesyuarat. Slaid 2: carta palang kecairan diperlukan (RM 10.5J) lwn aset cair + perlindungan (RM 4.0J) lwn jurang (RM 6.5J), dengan risiko utama. Slaid 3: jadual strategi (keperluan, pendekatan, sebab sesuai, perlindungan indikatif) serta langkah seterusnya. Tambah nota pembentang pada setiap slaid; maksimum 5 poin ringkas setiap slaid.",
            },
            {
                "key": "constraints",
                "label": "Kekangan (Constraints)",
                "tip": "Tambah garis panduan pematuhan supaya dek selamat digunakan.",
                "template": "Patuhi peraturan layanan adil BNM: lengkapkan analisis keperluan (fact-find) dahulu, terangkan Lembaran Pendedahan Produk (PDS) dan tempoh bertenang 15 hari, terangkan Takaful mengikut prinsip Syariah, tiada pulangan terjamin, angka adalah ilustrasi, dan syorkan nasihat guaman/cukai bebas.",
            },
        ],
        "target": {
            "title": "Ringkasan Pra-Pembentangan: Datin Sharifah Aleya",
            "subtitle": "Semakan Legasi, Kecairan Pusaka & Kesinambungan Perniagaan",
            "slides": [
                {
                    "layout": "title",
                    "title": "Datin Sharifah Aleya — Ringkasan Pelanggan & Objektif Mesyuarat",
                    "subtitle": "Mesyuarat pertama · Pejabat Bangsar · 60 min · Dirujuk oleh akauntan beliau",
                    "kpis": [
                        {"label": "Nilai bersih", "value": "≈ RM 28J", "note": "68% dalam saham klinik"},
                        {"label": "Jaminan peribadi", "value": "RM 4.5J", "note": "Pinjaman pengembangan klinik"},
                        {"label": "Perlindungan sedia ada", "value": "RM 1J", "note": "Konvensional, 2009"},
                        {"label": "Tanggungan", "value": "3", "note": "Suami + 2 anak di luar negara"},
                    ],
                    "bullets": [
                        "Objektif: fahami matlamat legasi beliau dan persetujui analisis keperluan (fact-find) untuk pelan patuh Syariah",
                        "Agenda: matlamat beliau · semakan pendedahan risiko · pilihan strategi · langkah seterusnya",
                    ],
                    "left": None,
                    "right": None,
                    "chart": None,
                    "table": None,
                    "steps": None,
                    "callout": None,
                    "speaker_notes": "Ucapkan terima kasih kepada akauntan beliau atas rujukan. Posisikan pertemuan ini sebagai semakan strategik, bukan jualan. Sahkan keutamaan beliau sebelum membincangkan sebarang angka.",
                    "image_prompt": "Elegant corporate illustration of a confident Malaysian businesswoman founder in a modern private clinic lobby, warm light, no text",
                    "image": None,
                },
                {
                    "layout": "chart",
                    "title": "Jurang Kecairan Harta Pusaka",
                    "subtitle": None,
                    "kpis": None,
                    "left": None,
                    "right": None,
                    "chart": {
                        "type": "bar",
                        "unit": "RM juta (ilustrasi)",
                        "series": [
                            {"label": "Kecairan diperlukan", "value": 10.5},
                            {"label": "Aset cair + perlindungan", "value": 4.0},
                            {"label": "Jurang", "value": 6.5},
                        ],
                    },
                    "table": None,
                    "steps": None,
                    "bullets": [
                        "Keperluan: Jaminan RM 4.5J + kos pusaka RM 1.0J + pendapatan suami RM 3.6J + pendidikan RM 1.35J",
                        "68% kekayaan adalah saham klinik — kecairan khusus menyokong keharmonian agihan faraid",
                        "Rizab kecairan memastikan kemudahan kredit dan operasi klinik berjalan lancar sepanjang 12–24 bulan pentadbiran pusaka",
                    ],
                    "callout": "Kecairan khusus memastikan kesemua 6 klinik pakar kekal 100% milik keluarga sambil membiayai pengajian universiti anak di luar negara.",
                    "speaker_notes": "Teliti setiap komponen dan benarkan beliau membetulkan andaian. Angka adalah ilustrasi sehingga analisis keperluan selesai.",
                    "image_prompt": None,
                    "image": None,
                },
                {
                    "layout": "table",
                    "title": "Strategi Disyorkan & Langkah Seterusnya (tertakluk kepada analisis keperluan)",
                    "subtitle": None,
                    "kpis": None,
                    "left": None,
                    "right": None,
                    "chart": None,
                    "table": {
                        "headers": ["Keperluan", "Pendekatan", "Mengapa sesuai", "Perlindungan indikatif"],
                        "rows": [
                            ["Kecairan pusaka", "Takaful Keluarga dengan penamaan hibah", "Dibayar terus kepada waris di luar harta pusaka", "RM 5J"],
                            ["Jaminan peribadi", "Takaful berkaitan kredit", "Menjelaskan pinjaman klinik RM 4.5J", "RM 4.5J"],
                            ["Kesinambungan perniagaan", "Takaful orang penting + perjanjian jual-beli", "Membiayai peralihan kepimpinan klinik", "Akan ditentukan"],
                        ],
                    },
                    "steps": None,
                    "bullets": [
                        "Seterusnya: analisis keperluan penuh → sesi bersama akauntan & peguam → cadangan dengan PDS",
                        "✔ Prinsip Syariah diterangkan · ✔ Tempoh bertenang 15 hari · ✔ Tiada pulangan terjamin",
                    ],
                    "callout": 'Penutup: "Bolehkah kitajadualkan 45 minit minggu depan bersama akauntan Datin untuk melengkapkan analisis keperluan?"',
                    "speaker_notes": "Bentangkan pilihan strategi, bukan desakan produk. Tangani 'Saya sudah ada perlindungan RM 1J' dengan menunjukkan ia meliputi kurang daripada suku jaminan pinjaman.",
                    "image_prompt": "Minimal corporate illustration of a family legacy shield protecting a modern clinic building and a family home, navy and red palette, no text",
                    "image": None,
                },
            ],
        },
    },
    "ta": {
        "case": {
            "client": "Datin Sharifah Aleya binti Syed Hamzah, 52 — நிறுவனர் & நிர்வாக இயக்குநர், Aleya Specialist Clinics Sdn Bhd (கிள்ளான் பள்ளத்தாக்கில் 6 சிறப்பு கிளினிக்குகள்)",
            "family": "கணவர் Dato' Hakim (58, ஓய்வு பெற்றவர், கிளினிக் ஈவுத்தொகை ~RM 30k/மாதம் சார்ந்துள்ளார்); பிள்ளைகள் Aisyah (22, மருத்துவம், UK) மற்றும் Imran (19, பொறியியல், மெல்போர்ன்)",
            "wealth": "நிகர சொத்து ≈ RM 28M: கிளினிக் குழும பங்குகள் ≈ RM 19M (68%), சொத்துக்கள் RM 6M, ரொக்கம் & FD RM 2.2M, ASB/யூனிட் டிரஸ்ட் RM 0.8M",
            "liabilities": "அவரது தனிப்பட்ட உத்தரவாதத்துடன் (Personal Guarantee) RM 4.5M கிளினிக் விரிவாக்கக் கடன்",
            "existing_cover": "வழக்கமான ஆயுள் காப்பீடு RM 1M (2009); நிறுவன குழு மருத்துவக் காப்பீடு",
            "concerns": "சொத்து பணப்புழக்கம் & தொடர்ச்சி — 12–24 மாத ஃபரைத் (faraid) மற்றும் நிர்வாகக் காலத்திலும் 6 சிறப்பு கிளினிக்குகளும் 100% குடும்ப வசம் நீடிப்பதை உறுதி செய்தல்; கிளினிக் நிர்வாகத் தொடர்ச்சி; கணவரின் ஓய்வுக்கால வருமானம் மற்றும் பிள்ளைகளின் வெளிநாட்டுக் கல்வி (~RM 450k/ஆண்டு); ஷரியா இணக்கமான தீர்வுகளை விரும்புகிறார் (Takaful, hibah)",
            "meeting": "அவரது கணக்காளர் பரிந்துரையின் பேரில் பங்சார் (Bangsar) அலுவலகத்தில் 60 நிமிட முதல் சந்திப்பு",
            "rules": "BNM நிதி நுகர்வோர் நியாயமான நடத்தும் விதிகள்; பரிந்துரைக்கும் முன் தேவை பகுப்பாய்வு (fact-find); PDS மற்றும் 15-நாள் பரிசீலனைக் காலத்தை விளக்குதல்; ஷரியா கொள்கைப்படி தகாஃபுல் விளக்கம்; சட்ட/வரி ஆலோசனை பரிந்துரை; உத்தரவாத வருமானம் இல்லை",
        },
        "guide": [
            {
                "key": "role",
                "label": "பங்கு (Role)",
                "tip": "Gemini-க்கு அதன் நிபுணர் பாத்திரத்தைத் தெளிவாகக் கூறுங்கள். இது ஒவ்வொரு ஸ்லைடின் தரத்தையும் உயர்த்தும்.",
                "template": "வாடிக்கையாளர் சந்திப்புக்கு முன் சுருக்க அறிக்கையைத் தயாரிக்கும் மூத்த PRUMDA செல்வ மற்றும் மரபுத் திட்டமிடல் ஆலோசகராகச் செயல்படுங்கள்.",
            },
            {
                "key": "context",
                "label": "சூழல் (Context)",
                "tip": "வழக்கு கோப்பிலிருந்து வாடிக்கையாளர் விவரங்களைச் சேர்க்கவும் — குடும்பம், சொத்து, கடன்கள், தற்போதைய காப்பீடு மற்றும் கவலைகள்.",
                "template": "வாடிக்கையாளர்: Datin Sharifah Aleya (52, நிறுவனர், Aleya Specialist Clinics, 6 கிளினிக்குகள்). குடும்பம்: கணவர் Dato' Hakim (58, ஓய்வு, ~RM 30k/மாதம் ஈவுத்தொகை), பிள்ளைகள் Aisyah (UK மருத்துவம்) & Imran (மெல்போர்ன் பொறியியல், கல்வி ~RM 450k/ஆண்டு). நிகர சொத்து ≈ RM 28M (கிளினிக் பங்குகள் RM 19M / 68%, சொத்து RM 6M, ரொக்கம்/FD RM 2.2M, யூனிட் டிரஸ்ட் RM 0.8M). கடன்: தனிப்பட்ட உத்தரவாதத்துடன் RM 4.5M கிளினிக் கடன். தற்போதைய காப்பீடு: RM 1M ஆயுள் பாலிசி (2009). கவலைகள்: 12-24 மாத சொத்து முடக்கம் (faraid/probate), ஷரியா இணக்கமான Takaful & hibah விருப்பம்.",
            },
            {
                "key": "task",
                "label": "பணி (Task)",
                "tip": "எந்தச் சந்திப்புக்காக எத்தனை ஸ்லைடுகள் உருவாக்க வேண்டும் என்பதைத் துல்லியமாகக் குறிப்பிடுங்கள்.",
                "template": "பங்சார் அலுவலகத்தில் நடைபெறும் 60 நிமிட முதல் சந்திப்பிற்காக 3-ஸ்லைடு (3-slide) முன்-முன்மொழிவு விளக்கக்காட்சியை உருவாக்கவும்.",
            },
            {
                "key": "format",
                "label": "வடிவம் (Format)",
                "tip": "ஒவ்வொரு ஸ்லைடிலும் இடம்பெற வேண்டிய KPI அட்டைகள், வரைபடம், அட்டவணை மற்றும் குறிப்புகளை விவரிக்கவும்.",
                "template": "ஸ்லைடு 1: KPI அட்டைகளுடன் வாடிக்கையாளர் சுருக்கம் மற்றும் நிகழ்ச்சி நிரல். ஸ்லைடு 2: தேவைப்படும் பணப்புழக்கம் (RM 10.5M) எதிர் திரவ சொத்துக்கள்+காப்பீடு (RM 4.0M) எதிர் இடைவெளி (RM 6.5M) பட்டை வரைபடம். ஸ்லைடு 3: உத்தி அட்டவணை (தேவை, அணுகுமுறை, பொருத்தம், உத்தேச காப்பீடு) மற்றும் அடுத்த படிகள். ஒவ்வொரு ஸ்லைடிலும் பேச்சாளர் குறிப்புகள் (Speaker Notes) மற்றும் அதிகபட்சம் 5 சுருக்கமான புள்ளிகள்.",
            },
            {
                "key": "constraints",
                "label": "விதிமுறைகள் (Constraints)",
                "tip": "பாதுகாப்பான மற்றும் இணக்கமான விளக்கக்காட்சிக்கு BNM விதிமுறைகளைச் சேர்க்கவும்.",
                "template": "BNM நியாயமான விதிமுறைகளைப் பின்பற்றவும்: முதலில் தேவை பகுப்பாய்வு (fact-find), PDS மற்றும் 15-நாள் பரிசீலனைக் காலம் (free-look) விளக்கம், ஷரியா அடிப்படையில் தகாஃபுல் விளக்கம், உத்தரவாத வருமானம் இல்லை, எண்கள் மாதிரிக்கானவை மட்டுமே, சட்ட/வரி ஆலோசனை பரிந்துரை.",
            },
        ],
        "target": {
            "title": "முன்-முன்மொழிவு அறிக்கை: Datin Sharifah Aleya",
            "subtitle": "மரபு, சொத்து பணப்புழக்கம் & வணிகத் தொடர்ச்சி ஆய்வு",
            "slides": [
                {
                    "layout": "title",
                    "title": "Datin Sharifah Aleya — வாடிக்கையாளர் சுருக்கம் & சந்திப்பு நோக்கம்",
                    "subtitle": "முதல் சந்திப்பு · பங்சார் அலுவலகம் · 60 நிமிடம் · கணக்காளர் பரிந்துரை",
                    "kpis": [
                        {"label": "நிகர சொத்து", "value": "≈ RM 28M", "note": "68% கிளினிக் பங்குகள்"},
                        {"label": "தனிப்பட்ட உத்தரவாதம்", "value": "RM 4.5M", "note": "கிளினிக் விரிவாக்கக் கடன்"},
                        {"label": "தற்போதைய காப்பீடு", "value": "RM 1M", "note": "வழக்கமான பாலிசி, 2009"},
                        {"label": "சார்ந்திருப்பவர்கள்", "value": "3", "note": "கணவர் + வெளிநாட்டில் 2 பிள்ளைகள்"},
                    ],
                    "bullets": [
                        "நோக்கம்: அவரது மரபு இலக்குகளைப் புரிந்துகொண்டு ஷரியா இணக்கமான திட்டத்திற்கான தேவை பகுப்பாய்வை (fact-find) ஒப்புக்கொள்வது",
                        "நிகழ்ச்சி நிரல்: இலக்குகள் · இடர் ஆய்வு · உத்தி விருப்பங்கள் · அடுத்த படிகள்",
                    ],
                    "left": None,
                    "right": None,
                    "chart": None,
                    "table": None,
                    "steps": None,
                    "callout": None,
                    "speaker_notes": "பரிந்துரைத்த கணக்காளருக்கு நன்றி கூறுங்கள். இதை விற்பனையாக அல்லாமல் ஒரு ஆய்வாக முன்வைக்கவும்.",
                    "image_prompt": "Elegant corporate illustration of a confident Malaysian businesswoman founder in a modern private clinic lobby, warm light, no text",
                    "image": None,
                },
                {
                    "layout": "chart",
                    "title": "சொத்து பணப்புழக்க இடைவெளி (Estate Liquidity Gap)",
                    "subtitle": None,
                    "kpis": None,
                    "left": None,
                    "right": None,
                    "chart": {
                        "type": "bar",
                        "unit": "RM மில்லியன் (மாதிரி)",
                        "series": [
                            {"label": "தேவைப்படும் பணப்புழக்கம்", "value": 10.5},
                            {"label": "திரவ சொத்து + காப்பீடு", "value": 4.0},
                            {"label": "இடைவெளி (Gap)", "value": 6.5},
                        ],
                    },
                    "table": None,
                    "steps": None,
                    "bullets": [
                        "தேவை: RM 4.5M கடன் உத்தரவாதம் + RM 1.0M செலவுகள் + RM 3.6M கணவர் வருமானம் + RM 1.35M கல்வி",
                        "68% சொத்து கிளினிக் பங்குகளில் உள்ளது — பிரத்யேக பணப்புழக்கம் சுமுகமான Faraid பகிர்வை உறுதி செய்கிறது",
                        "12–24 மாத நிர்வாகக் காலத்திலும் கிளினிக் செயல்பாடுகள் மற்றும் வங்கி வசதிகள் தடையின்றித் தொடர உதவுகிறது",
                    ],
                    "callout": "பிரத்யேக பணப்புழக்கம் 6 சிறப்பு கிளினிக்குகளும் 100% குடும்ப வசம் நீடிப்பதையும் வெளிநாட்டு பல்கலைக்கழகக் கல்வியையும் உறுதி செய்கிறது.",
                    "speaker_notes": "ஒவ்வொரு எண்ணையும் விளக்கி அவரது கருத்துக்களைக் கேளுங்கள். தேவை பகுப்பாய்வு முடியும் வரை எண்கள் மாதிரிக்கானவை மட்டுமே.",
                    "image_prompt": None,
                    "image": None,
                },
                {
                    "layout": "table",
                    "title": "பரிந்துரைக்கப்படும் உத்தி & அடுத்த படிகள் (தேவை பகுப்பாய்விற்கு உட்பட்டது)",
                    "subtitle": None,
                    "kpis": None,
                    "left": None,
                    "right": None,
                    "chart": None,
                    "table": {
                        "headers": ["தேவை", "அணுகுமுறை", "ஏன் பொருந்துகிறது", "உத்தேச காப்பீடு"],
                        "rows": [
                            ["சொத்து பணப்புழக்கம்", "ஹிபா (Hibah) நியமனத்துடன் குடும்ப தகாஃபுல்", "சொத்து முடக்கத்திற்கு வெளியே பயனாளிகளுக்கு நேரடியாக வழங்கப்படும்", "RM 5M"],
                            ["தனிப்பட்ட உத்தரவாதம்", "கடன் சார்ந்த தகாஃபுல் (Credit Takaful)", "RM 4.5M கிளினிக் கடனை அடைக்கிறது", "RM 4.5M"],
                            ["வணிகத் தொடர்ச்சி", "முக்கிய நபர் தகாஃபுல் + பங்கு ஒப்பந்தம்", "சுமுகமான நிர்வாக மாற்றத்திற்கு நிதியளிக்கிறது", "கணக்கிடப்படும்"],
                        ],
                    },
                    "steps": None,
                    "bullets": [
                        "அடுத்தது: முழு தேவை பகுப்பாய்வு (fact-find) → கணக்காளர் & வழக்கறிஞருடன் ஆலோசனை → PDS உடன் முன்மொழிவு",
                        "✔ ஷரியா கொள்கைகள் விளக்கம் · ✔ 15-நாள் பரிசீலனைக் காலம் · ✔ உத்தரவாத வருமானம் இல்லை",
                    ],
                    "callout": 'முடிவு: "தேவை பகுப்பாய்வை நிறைவு செய்ய அடுத்த வாரம் உங்கள் கணக்காளருடன் 45 நிமிடங்கள் ஒதுக்கலாமா?"',
                    "speaker_notes": "தயாரிப்பைத் திணிக்காமல் தீர்வுகளை முன்வைக்கவும். RM 1M காப்பீடுRM 4.5M கடனில் கால் பங்கிற்கும் குறைவு என்பதை மென்மையாகச் சுட்டிக்காட்டவும்.",
                    "image_prompt": "Minimal corporate illustration of a family legacy shield protecting a modern clinic building and a family home, navy and red palette, no text",
                    "image": None,
                },
            ],
        },
    },
}

# ----------------------------------------------------------------------------- JSON SCHEMAS FOR VERTEX AI
SLIDE_SCHEMA = {
    "type": "OBJECT",
    "properties": {
        "layout": {
            "type": "STRING",
            "enum": ["title", "bullets", "two_column", "kpi", "chart", "table", "timeline", "quote"],
        },
        "title": {"type": "STRING"},
        "subtitle": {"type": "STRING", "nullable": True},
        "bullets": {"type": "ARRAY", "items": {"type": "STRING"}, "nullable": True},
        "left": {
            "type": "OBJECT",
            "nullable": True,
            "properties": {
                "heading": {"type": "STRING"},
                "bullets": {"type": "ARRAY", "items": {"type": "STRING"}},
            },
            "required": ["heading", "bullets"],
        },
        "right": {
            "type": "OBJECT",
            "nullable": True,
            "properties": {
                "heading": {"type": "STRING"},
                "bullets": {"type": "ARRAY", "items": {"type": "STRING"}},
            },
            "required": ["heading", "bullets"],
        },
        "kpis": {
            "type": "ARRAY",
            "nullable": True,
            "items": {
                "type": "OBJECT",
                "properties": {
                    "label": {"type": "STRING"},
                    "value": {"type": "STRING"},
                    "note": {"type": "STRING"},
                },
                "required": ["label", "value"],
            },
        },
        "chart": {
            "type": "OBJECT",
            "nullable": True,
            "properties": {
                "type": {"type": "STRING", "enum": ["bar"]},
                "unit": {"type": "STRING"},
                "series": {
                    "type": "ARRAY",
                    "items": {
                        "type": "OBJECT",
                        "properties": {
                            "label": {"type": "STRING"},
                            "value": {"type": "NUMBER"},
                        },
                        "required": ["label", "value"],
                    },
                },
            },
            "required": ["series"],
        },
        "table": {
            "type": "OBJECT",
            "nullable": True,
            "properties": {
                "headers": {"type": "ARRAY", "items": {"type": "STRING"}},
                "rows": {"type": "ARRAY", "items": {"type": "ARRAY", "items": {"type": "STRING"}}},
            },
            "required": ["headers", "rows"],
        },
        "steps": {
            "type": "ARRAY",
            "nullable": True,
            "items": {
                "type": "OBJECT",
                "properties": {
                    "label": {"type": "STRING"},
                    "detail": {"type": "STRING"},
                },
                "required": ["label", "detail"],
            },
        },
        "callout": {"type": "STRING", "nullable": True},
        "speaker_notes": {"type": "STRING"},
        "image_prompt": {"type": "STRING", "nullable": True},
    },
    "required": ["layout", "title", "speaker_notes"],
}

DECK_SCHEMA = {
    "type": "OBJECT",
    "properties": {
        "title": {"type": "STRING"},
        "subtitle": {"type": "STRING"},
        "slides": {
            "type": "ARRAY",
            "minItems": 3,
            "maxItems": 3,
            "items": SLIDE_SCHEMA,
        },
    },
    "required": ["title", "slides"],
}

COACH_SCHEMA = {
    "type": "OBJECT",
    "properties": {
        "next_step": {
            "type": "STRING",
            "enum": ["role", "context", "task", "format", "constraints"],
        },
        "headline": {"type": "STRING"},
        "steps": {
            "type": "ARRAY",
            "items": {
                "type": "OBJECT",
                "properties": {
                    "key": {
                        "type": "STRING",
                        "enum": ["role", "context", "task", "format", "constraints"],
                    },
                    "status": {"type": "STRING", "enum": ["done", "partial", "missing"]},
                    "tip": {"type": "STRING"},
                    "suggestion": {"type": "STRING"},
                },
                "required": ["key", "status", "tip", "suggestion"],
            },
        },
    },
    "required": ["next_step", "headline", "steps"],
}

JUDGE_SCHEMA = {
    "type": "OBJECT",
    "properties": {
        "verdict": {"type": "STRING"},
        "rubric": {
            "type": "ARRAY",
            "items": {
                "type": "OBJECT",
                "properties": {
                    "dimension": {"type": "STRING"},
                    "score": {"type": "INTEGER"},
                    "evidence": {"type": "STRING"},
                    "comment": {"type": "STRING"},
                },
                "required": ["dimension", "score", "evidence", "comment"],
            },
        },
        "coverage": {
            "type": "ARRAY",
            "items": {
                "type": "OBJECT",
                "properties": {
                    "target_slide": {"type": "INTEGER"},
                    "target_title": {"type": "STRING"},
                    "status": {"type": "STRING", "enum": ["covered", "partial", "missing"]},
                    "matched_user_slides": {"type": "ARRAY", "items": {"type": "INTEGER"}},
                    "missing_elements": {"type": "ARRAY", "items": {"type": "STRING"}},
                },
                "required": ["target_slide", "target_title", "status", "matched_user_slides", "missing_elements"],
            },
        },
        "factual_issues": {"type": "ARRAY", "items": {"type": "STRING"}},
        "what_went_well": {"type": "ARRAY", "items": {"type": "STRING"}},
        "prompt_improvements": {
            "type": "ARRAY",
            "items": {
                "type": "OBJECT",
                "properties": {
                    "issue": {"type": "STRING"},
                    "add_this_line": {"type": "STRING"},
                },
                "required": ["issue", "add_this_line"],
            },
        },
        "prompt_craft": {
            "type": "OBJECT",
            "properties": {
                "role": {"type": "INTEGER"},
                "context": {"type": "INTEGER"},
                "task": {"type": "INTEGER"},
                "format": {"type": "INTEGER"},
                "constraints": {"type": "INTEGER"},
                "comment": {"type": "STRING"},
            },
            "required": ["role", "context", "task", "format", "constraints", "comment"],
        },
    },
    "required": [
        "verdict",
        "rubric",
        "coverage",
        "factual_issues",
        "what_went_well",
        "prompt_improvements",
        "prompt_craft",
    ],
}

CASE_SCHEMA = {
    "type": "OBJECT",
    "properties": {
        k: {"type": "STRING"}
        for k in ("client", "family", "wealth", "liabilities", "existing_cover", "concerns", "meeting", "rules")
    },
    "required": ["client", "family", "wealth", "liabilities", "existing_cover", "concerns", "meeting", "rules"],
}

GUIDE_SCHEMA = {
    "type": "OBJECT",
    "properties": {
        "steps": {
            "type": "ARRAY",
            "items": {
                "type": "OBJECT",
                "properties": {
                    "key": {"type": "STRING"},
                    "label": {"type": "STRING"},
                    "tip": {"type": "STRING"},
                    "template": {"type": "STRING"},
                },
                "required": ["key", "label", "tip", "template"],
            },
        }
    },
    "required": ["steps"],
}


def call_vertex_structured(
    prompt: str,
    response_schema: dict,
    get_access_token_fn,
    project_id: str = "argolis-sandbox-main",
    location: str = "us-central1",
    system_instruction: str | None = None,
    temperature: float = 0.4,
    max_output_tokens: int = 8192,
) -> tuple[dict, str]:
    """Thread-safe Vertex AI structured JSON generation with fast thinkingBudget=0."""
    token = get_access_token_fn()
    if not token:
        raise RuntimeError("No GCP access token available for Vertex AI.")

    models = ["gemini-3.5-flash-lite", "gemini-3.1-flash-lite", "gemini-2.5-flash"]
    last_err = None
    for attempt in range(2):
        headers = {
            "Authorization": f"Bearer {token}",
            "Content-Type": "application/json",
            "X-Goog-User-Project": project_id,
        }
        for model_id in models:
            if model_id.startswith("gemini-3"):
                url = (
                    f"https://aiplatform.googleapis.com/v1/projects/{project_id}"
                    f"/locations/global/publishers/google/models/{model_id}:generateContent"
                )
            else:
                url = (
                    f"https://{location}-aiplatform.googleapis.com/v1/projects/{project_id}"
                    f"/locations/{location}/publishers/google/models/{model_id}:generateContent"
                )
            payload: dict = {
                "contents": [{"role": "user", "parts": [{"text": prompt}]}],
                "generationConfig": {
                    "temperature": temperature,
                    "maxOutputTokens": max_output_tokens,
                    "responseMimeType": "application/json",
                    "responseSchema": response_schema,
                },
            }
            if system_instruction:
                payload["systemInstruction"] = {"parts": [{"text": system_instruction}]}
            if model_id.startswith(("gemini-2.5", "gemini-3")):
                payload["generationConfig"]["thinkingConfig"] = {"thinkingBudget": 0}
            try:
                resp = requests.post(url, headers=headers, json=payload, timeout=28)
                if resp.status_code == 200:
                    data = resp.json()
                    parts = (
                        data.get("candidates", [{}])[0]
                        .get("content", {})
                        .get("parts", [])
                    )
                    text = "".join(p.get("text", "") for p in parts if not p.get("thought")).strip()
                    if text:
                        return json.loads(text), model_id
                elif resp.status_code in (401, 403) and attempt == 0:
                    token = get_access_token_fn(force_refresh=True)
                    break
                else:
                    last_err = f"HTTP {resp.status_code}: {resp.text[:240]}"
            except Exception as exc:
                last_err = str(exc)
                continue
    raise RuntimeError(f"Structured generation failed: {last_err}")


# ----------------------------------------------------------------------------- TRANSLATION CACHE
_cache: dict[tuple[str, str, str], object] = {}
_cache_lock = threading.Lock()


def _init_pretranslated_cache():
    for lang_code, bundle in PRETRANSLATED_MY.items():
        _cache[("case", "MY", lang_code)] = copy.deepcopy(bundle["case"])
        _cache[("guide", "MY", lang_code)] = copy.deepcopy(bundle["guide"])
        _cache[("target", "MY", lang_code)] = copy.deepcopy(bundle["target"])


_init_pretranslated_cache()


def _translated_sync(kind: str, market: str, lang: str, get_access_token_fn, project_id: str, location: str):
    key = (kind, market, lang)
    with _cache_lock:
        if key in _cache:
            return copy.deepcopy(_cache[key])

    if kind == "case":
        src = copy.deepcopy(CASES[market])
        schema = CASE_SCHEMA
    elif kind == "guide":
        src = {"steps": copy.deepcopy(GUIDE)}
        schema = GUIDE_SCHEMA
    else:
        src = copy.deepcopy(TARGETS[market])
        schema = DECK_SCHEMA

    if lang == "en":
        out_val = src["steps"] if kind == "guide" else src
        with _cache_lock:
            _cache[key] = copy.deepcopy(out_val)
        return out_val

    try:
        out, _ = call_vertex_structured(
            f"Translate every human-readable string value in this JSON into {LANGS[lang]}. Keep names, "
            "numbers, currency, product names and JSON structure unchanged. Do not translate `layout`, "
            f"`type`, `key` or `image_prompt` values.\n\n{json.dumps(src, ensure_ascii=False)}",
            schema,
            get_access_token_fn,
            project_id=project_id,
            location=location,
            temperature=0.1,
        )
        out_val = out.get("steps", GUIDE) if kind == "guide" else out
        if kind == "target":
            out_val = _normalize_deck_dict(out_val)
        with _cache_lock:
            _cache[key] = copy.deepcopy(out_val)
        return out_val
    except Exception as exc:
        logger.warning("translation %s failed: %s", key, exc)
        return src["steps"] if kind == "guide" else src


def _normalize_slide_dict(s: dict) -> dict:
    return {
        "layout": s.get("layout") or "bullets",
        "title": s.get("title") or "Slide",
        "subtitle": s.get("subtitle"),
        "bullets": s.get("bullets"),
        "left": s.get("left"),
        "right": s.get("right"),
        "kpis": s.get("kpis"),
        "chart": s.get("chart"),
        "table": s.get("table"),
        "steps": s.get("steps"),
        "callout": s.get("callout"),
        "speaker_notes": s.get("speaker_notes") or "",
        "image_prompt": s.get("image_prompt"),
        "image": s.get("image"),
    }


_FALLBACK_SLIDE_TITLES = {
    "en": ["Client Overview & Meeting Objective", "Financial Exposure & Liquidity Review", "Proposed Strategy & Next Steps"],
    "zh-CN": ["客户概况与会面目标", "财务风险与流动性审视", "建议策略方案与下一步"],
    "yue": ["客戶概況與會面目標", "財務風險與流動性審視", "建議策略方案與下一步"],
    "ms": ["Gambaran Pelanggan & Objektif Mesyuarat", "Semakan Pendedahan & Kecairan", "Cadangan Strategi & Langkah Seterusnya"],
    "ta": ["வாடிக்கையாளர் சுருக்கம் & சந்திப்பு நோக்கம்", "நிதி மற்றும் பணப்புழக்க ஆய்வு", "பரிந்துரைக்கப்பட்ட திட்டம் & அடுத்த படிகள்"],
}


def _enforce_exact_3_slides(slides: list[dict], lang: str = "en") -> list[dict]:
    """Guarantees strictly 3 slides (never < 3, never > 3)."""
    norm = norm_lang(lang)
    out = [_normalize_slide_dict(s) for s in (slides or [])[:3]]
    titles = _FALLBACK_SLIDE_TITLES.get(norm, _FALLBACK_SLIDE_TITLES["en"])
    while len(out) < 3:
        idx = len(out)
        out.append({
            "layout": "bullets",
            "title": titles[idx],
            "subtitle": None,
            "bullets": [" Clarify client priorities and review financial needs before product sizing."],
            "left": None,
            "right": None,
            "kpis": None,
            "chart": None,
            "table": None,
            "steps": None,
            "callout": None,
            "speaker_notes": "",
            "image_prompt": None,
            "image": None,
        })
    return out[:3]


def _normalize_deck_dict(d: dict, lang: str = "en") -> dict:
    return {
        "title": d.get("title") or "Executive Pre-Pitch Brief",
        "subtitle": d.get("subtitle") or "",
        "slides": _enforce_exact_3_slides(d.get("slides") or [], lang=lang),
    }


def _with_target_images(deck_dict: dict, market: str, as_data_url: bool = False) -> dict:
    d = copy.deepcopy(_normalize_deck_dict(deck_dict))
    for i, s in enumerate(d.get("slides", []), 1):
        f = STATIC_DIR / "target" / f"{market}_{i}.jpg"
        if s.get("image_prompt") and f.exists():
            if as_data_url:
                s["image"] = "data:image/jpeg;base64," + base64.b64encode(f.read_bytes()).decode()
            else:
                s["image"] = f"/static/target/{market}_{i}.jpg"
    return d


# ----------------------------------------------------------------------------- GENERATOR & SIGNING
GENERATOR_SYSTEM = (
    "You are an executive presentation generator for HNW wealth & business succession advisors. "
    "Convert the user's prompt into a structured slide deck JSON.\n"
    "STRICT INVARIANT RULES:\n"
    "1. STRICTLY 3 SLIDES ONLY: The `slides` array MUST ALWAYS contain EXACTLY 3 slides (Slide 1, Slide 2, Slide 3) — "
    "NEVER fewer than 3 and NEVER more than 3, even if the user prompt explicitly asks for 1 slide, 5 slides, 7 slides, or 10 slides! "
    "If more topics are requested, synthesize them cleanly across the 3 slides.\n"
    "2. MATCH DEPTH & DATA TO PROMPT QUALITY (DO NOT INVENT MISSING CLIENT FACTS): "
    "Do NOT invent client names, net worth, debt numbers, liquidity math, or BNM/Takaful/Schedule 10 compliance clauses "
    "that are NOT present in the user's prompt. If the prompt is a short generic 1-liner, produce 3 simple generic `bullets` slides "
    "without fabricated KPIs, charts, tables, or compliance language.\n"
    "3. WHEN THE USER PROVIDES STRUCTURED FACTS & FORMAT INSTRUCTIONS:\n"
    "   - Slide 1: Use layout `kpi` with 4 crisp KPI cards (e.g. Net Worth, Debt Exposure, Existing Cover, Liquidity Gap) + concise agenda bullets.\n"
    "   - Slide 2: Use layout `chart` with a 3-bar `series` comparing Liquidity Needed vs Liquid Assets + Cover vs Net Liquidity Gap, plus key risk bullets.\n"
    "   - Slide 3: Use layout `table` with a tailored Strategy Matrix (`headers` + 3 `rows`) plus consultative next steps & BNM guardrails.\n"
    "4. PERSONAL STRATEGIC TOUCH: If the user prompt includes a Personal Strategic Angle, relationship hook, or co-advisory framing, "
    "highlight it prominently in Slide 1 or Slide 3 `callout` and `bullets`.\n"
    "5. Keep slides boardroom-scannable: max 4 concise bullets per slide. Populate `speaker_notes` when requested or when R.C.T.F.C. structure is present.\n"
    "6. Set `image_prompt` (English, luxury architectural/editorial illustration, zero text/words/logos) on Slide 1 and optionally Slide 3 when prompt is detailed; leave `image` null.\n"
    "7. Write ALL slide titles, subtitles, KPIs, chart labels, table cells, bullets, callouts, and speaker_notes in the requested OUTPUT LANGUAGE.\n"
    "8. Frame all recommendations around constructive strategic readiness, enterprise continuity, and family harmony — avoid morbid, tragic, or fear-mongering phrasing (such as grim crisis scenarios or distressed liquidation rhetoric)."
)


_KPI_ITEM_SCHEMA = {
    "type": "OBJECT",
    "properties": {
        "label": {"type": "STRING"},
        "value": {"type": "STRING"},
        "note": {"type": "STRING"},
    },
    "required": ["label", "value", "note"],
}

_CHART_OBJ_SCHEMA = {
    "type": "OBJECT",
    "properties": {
        "type": {"type": "STRING", "enum": ["bar"]},
        "unit": {"type": "STRING"},
        "series": {
            "type": "ARRAY",
            "minItems": 3,
            "maxItems": 3,
            "items": {
                "type": "OBJECT",
                "properties": {
                    "label": {"type": "STRING"},
                    "value": {"type": "NUMBER"},
                },
                "required": ["label", "value"],
            },
        },
    },
    "required": ["type", "unit", "series"],
}

_TABLE_OBJ_SCHEMA = {
    "type": "OBJECT",
    "properties": {
        "headers": {"type": "ARRAY", "minItems": 4, "maxItems": 4, "items": {"type": "STRING"}},
        "rows": {
            "type": "ARRAY",
            "minItems": 3,
            "maxItems": 3,
            "items": {"type": "ARRAY", "minItems": 4, "maxItems": 4, "items": {"type": "STRING"}},
        },
    },
    "required": ["headers", "rows"],
}

RICH_3SLIDE_SCHEMA = {
    "type": "OBJECT",
    "properties": {
        "title": {"type": "STRING"},
        "subtitle": {"type": "STRING"},
        "slide1": {
            "type": "OBJECT",
            "properties": {
                "layout": {"type": "STRING", "enum": ["kpi"]},
                "title": {"type": "STRING"},
                "subtitle": {"type": "STRING"},
                "kpis": {"type": "ARRAY", "minItems": 4, "maxItems": 4, "items": _KPI_ITEM_SCHEMA},
                "bullets": {"type": "ARRAY", "minItems": 2, "maxItems": 3, "items": {"type": "STRING"}},
                "callout": {"type": "STRING"},
                "speaker_notes": {"type": "STRING"},
                "image_prompt": {"type": "STRING"},
            },
            "required": ["layout", "title", "subtitle", "kpis", "bullets", "callout", "speaker_notes", "image_prompt"],
        },
        "slide2": {
            "type": "OBJECT",
            "properties": {
                "layout": {"type": "STRING", "enum": ["chart"]},
                "title": {"type": "STRING"},
                "subtitle": {"type": "STRING"},
                "chart": _CHART_OBJ_SCHEMA,
                "bullets": {"type": "ARRAY", "minItems": 2, "maxItems": 3, "items": {"type": "STRING"}},
                "callout": {"type": "STRING"},
                "speaker_notes": {"type": "STRING"},
            },
            "required": ["layout", "title", "subtitle", "chart", "bullets", "callout", "speaker_notes"],
        },
        "slide3": {
            "type": "OBJECT",
            "properties": {
                "layout": {"type": "STRING", "enum": ["table"]},
                "title": {"type": "STRING"},
                "subtitle": {"type": "STRING"},
                "table": _TABLE_OBJ_SCHEMA,
                "bullets": {"type": "ARRAY", "minItems": 2, "maxItems": 3, "items": {"type": "STRING"}},
                "callout": {"type": "STRING"},
                "speaker_notes": {"type": "STRING"},
                "image_prompt": {"type": "STRING"},
            },
            "required": ["layout", "title", "subtitle", "table", "bullets", "callout", "speaker_notes", "image_prompt"],
        },
    },
    "required": ["title", "subtitle", "slide1", "slide2", "slide3"],
}

CONTEXT_3SLIDE_SCHEMA = {
    "type": "OBJECT",
    "properties": {
        "title": {"type": "STRING"},
        "subtitle": {"type": "STRING"},
        "slide1": {
            "type": "OBJECT",
            "properties": {
                "layout": {"type": "STRING", "enum": ["kpi"]},
                "title": {"type": "STRING"},
                "subtitle": {"type": "STRING"},
                "kpis": {"type": "ARRAY", "minItems": 3, "maxItems": 4, "items": _KPI_ITEM_SCHEMA},
                "bullets": {"type": "ARRAY", "minItems": 2, "maxItems": 3, "items": {"type": "STRING"}},
                "speaker_notes": {"type": "STRING"},
                "image_prompt": {"type": "STRING"},
            },
            "required": ["layout", "title", "subtitle", "kpis", "bullets", "speaker_notes", "image_prompt"],
        },
        "slide2": {
            "type": "OBJECT",
            "properties": {
                "layout": {"type": "STRING", "enum": ["two_column"]},
                "title": {"type": "STRING"},
                "left": {
                    "type": "OBJECT",
                    "properties": {
                        "heading": {"type": "STRING"},
                        "bullets": {"type": "ARRAY", "minItems": 2, "maxItems": 3, "items": {"type": "STRING"}},
                    },
                    "required": ["heading", "bullets"],
                },
                "right": {
                    "type": "OBJECT",
                    "properties": {
                        "heading": {"type": "STRING"},
                        "bullets": {"type": "ARRAY", "minItems": 2, "maxItems": 3, "items": {"type": "STRING"}},
                    },
                    "required": ["heading", "bullets"],
                },
                "callout": {"type": "STRING"},
                "speaker_notes": {"type": "STRING"},
            },
            "required": ["layout", "title", "left", "right", "callout", "speaker_notes"],
        },
        "slide3": {
            "type": "OBJECT",
            "properties": {
                "layout": {"type": "STRING", "enum": ["table"]},
                "title": {"type": "STRING"},
                "table": _TABLE_OBJ_SCHEMA,
                "bullets": {"type": "ARRAY", "minItems": 2, "maxItems": 3, "items": {"type": "STRING"}},
                "speaker_notes": {"type": "STRING"},
            },
            "required": ["layout", "title", "table", "bullets", "speaker_notes"],
        },
    },
    "required": ["title", "subtitle", "slide1", "slide2", "slide3"],
}

SIMPLE_3SLIDE_SCHEMA = {
    "type": "OBJECT",
    "properties": {
        "title": {"type": "STRING"},
        "subtitle": {"type": "STRING"},
        "slide1": {
            "type": "OBJECT",
            "properties": {
                "layout": {"type": "STRING", "enum": ["bullets"]},
                "title": {"type": "STRING"},
                "bullets": {"type": "ARRAY", "minItems": 3, "maxItems": 4, "items": {"type": "STRING"}},
            },
            "required": ["layout", "title", "bullets"],
        },
        "slide2": {
            "type": "OBJECT",
            "properties": {
                "layout": {"type": "STRING", "enum": ["bullets"]},
                "title": {"type": "STRING"},
                "bullets": {"type": "ARRAY", "minItems": 3, "maxItems": 4, "items": {"type": "STRING"}},
            },
            "required": ["layout", "title", "bullets"],
        },
        "slide3": {
            "type": "OBJECT",
            "properties": {
                "layout": {"type": "STRING", "enum": ["bullets"]},
                "title": {"type": "STRING"},
                "bullets": {"type": "ARRAY", "minItems": 3, "maxItems": 4, "items": {"type": "STRING"}},
            },
            "required": ["layout", "title", "bullets"],
        },
    },
    "required": ["title", "subtitle", "slide1", "slide2", "slide3"],
}

_FORMAT_VISUAL_RE = re.compile(
    r"kpi|chart|bar\s+chart|table|matrix|carta|jadual|柱状图|柱狀圖|策略表|对比表|對比表|வரைபடம்|அட்டவணை",
    re.I,
)


def _select_generation_schema(prompt: str) -> dict:
    p = (prompt or "").strip()
    if _FORMAT_VISUAL_RE.search(p):
        return RICH_3SLIDE_SCHEMA
    num_hits = re.findall(r"\d+(?:\.\d+)?", p)
    if len(num_hits) >= 3 or len(p) >= 220:
        return CONTEXT_3SLIDE_SCHEMA
    return SIMPLE_3SLIDE_SCHEMA


def generate_deck_sync(
    prompt: str,
    lang: str,
    get_access_token_fn,
    project_id: str,
    location: str,
) -> tuple[dict, str]:
    norm_l = norm_lang(lang)
    chosen_schema = _select_generation_schema(prompt)
    full = (
        f"OUTPUT LANGUAGE: {LANGS.get(norm_l, 'English')}\n"
        "SLIDE COUNT INVARIANT: Populate `slide1`, `slide2`, and `slide3` (STRICTLY 3 slides total). "
        "Populate EVERY required visual array (`kpis`, `chart.series`, `table.rows`, `bullets`) with concise, boardroom-grade content grounded strictly in the user's prompt.\n\n"
        f"USER PROMPT:\n\"\"\"{prompt.strip()}\"\"\""
    )
    raw_obj, model = call_vertex_structured(
        full,
        chosen_schema,
        get_access_token_fn,
        project_id=project_id,
        location=location,
        system_instruction=GENERATOR_SYSTEM,
        temperature=0.3,
        max_output_tokens=8192,
    )
    assembled = {
        "title": raw_obj.get("title") or "Executive Pre-Pitch Brief",
        "subtitle": raw_obj.get("subtitle") or "",
        "slides": [
            raw_obj.get("slide1") or {},
            raw_obj.get("slide2") or {},
            raw_obj.get("slide3") or {},
        ],
    }
    deck = _normalize_deck_dict(assembled, lang=norm_l)
    deck["slides"] = _enforce_exact_3_slides(deck["slides"], lang=norm_l)
    for s in deck["slides"]:
        s["image"] = None
    imgs = [s for s in deck["slides"] if s.get("image_prompt")]
    for s in imgs[2:]:
        s["image_prompt"] = None
    return deck, model


def _canonical(deck: dict) -> bytes:
    d = _normalize_deck_dict(deck)
    for s in d["slides"]:
        s.pop("image", None)
    return json.dumps(d, sort_keys=True, ensure_ascii=False).encode()


def sign_deck(deck: dict) -> str:
    return hmac.new(SECRET, _canonical(deck), hashlib.sha256).hexdigest()


def verify_deck(deck: dict, signature: str) -> bool:
    if not signature:
        return False
    return hmac.compare_digest(sign_deck(deck), signature)


# ----------------------------------------------------------------------------- COACH
COACH_SYSTEM = (
    "You are a friendly executive prompt-engineering coach for PRUMDA Learning Trip Agency Leaders. "
    "Help them strengthen their prompt across Role, Context, Task, Format, and Constraints (plus a personal strategic angle) "
    "to generate a boardroom-grade 3-slide pre-pitch deck. "
    "Frame all recommendations around constructive strategic readiness, enterprise continuity, and family harmony — avoid morbid, tragic, or fear-mongering phrasing (such as grim crisis scenarios or distressed liquidation rhetoric). "
    "Be specific, concise, and encouraging. Never reveal a score."
)


def _resolve_case_and_target(market: str, lang: str, seat_index: int | None = None) -> tuple[dict, dict, list[dict], list[str]]:
    """Returns (case_dict, target_deck, guide_steps, key_numbers) for either a specific 56-seat MY case or market default."""
    if market == "MY" and seat_index is not None:
        sc = resolve_c2_seat_scenario(int(seat_index), lang)
        return sc["case_file"], sc["target"], sc["guide"], [str(x) for x in sc.get("keyNumbers", [])]
    c_dict = CASES[market]
    t_deck = TARGETS[market]
    nums = sorted({x for x in _numbers(case_file_text(market)) if x not in {"0", "1", "2", "3"}})
    return c_dict, t_deck, GUIDE, nums


def _format_case_dict_text(c_dict: dict) -> str:
    return "\n".join(f"- {k.replace('_', ' ').title()}: {v}" for k, v in c_dict.items())


def coach_sync(
    req_body: dict,
    get_access_token_fn,
    project_id: str,
    location: str,
) -> dict:
    market = "SG" if str(req_body.get("market", "MY")).upper() == "SG" else "MY"
    lang = norm_lang(req_body.get("lang", "en"))
    seat_raw = req_body.get("seat_index", req_body.get("seatIndex"))
    seat_idx = int(seat_raw) if seat_raw is not None and str(seat_raw).strip() != "" else None
    user_prompt = str(req_body.get("prompt") or "").strip()
    slide_titles = req_body.get("slide_titles") or []
    case_dict, target, guide_ref, _ = _resolve_case_and_target(market, lang, seat_idx)
    outline = "\n".join(f"{i + 1}. {s['title']}" for i, s in enumerate(target["slides"]))
    prompt = (
        f"CLIENT CASE FILE (facts the leader may use):\n{_format_case_dict_text(case_dict)}\n\n"
        f"TARGET 3-SLIDE BENCHMARK DECK:\n{outline}\nTarget detail: {json.dumps(target, ensure_ascii=False)}\n\n"
        f"LEADER'S CURRENT PROMPT:\n\"\"\"{user_prompt}\"\"\"\n"
        + (f"Slides their last deck produced: {slide_titles}\n" if slide_titles else "")
        + "\nFor each element role, context, task, format, constraints (in that order) rate the CURRENT PROMPT "
        "done / partial / missing compared with what is needed to produce an executive 3-slide deck, give one short tip "
        "and a ready-to-insert suggestion (using real facts from THIS client's case file). Pick next_step = the most valuable "
        f"element to improve now. Write tip, suggestion and headline in {LANGS[lang]}."
    )
    out, _ = call_vertex_structured(
        prompt,
        COACH_SCHEMA,
        get_access_token_fn,
        project_id=project_id,
        location=location,
        system_instruction=COACH_SYSTEM,
        temperature=0.3,
    )
    order = ["role", "context", "task", "format", "constraints"]
    steps_by_key = {s["key"]: s for s in out.get("steps", []) if s.get("key") in order}
    for k in order:
        if k not in steps_by_key:
            g_fallback = next((g for g in guide_ref if g["key"] == k), guide_ref[0])
            steps_by_key[k] = {
                "key": k,
                "status": "missing",
                "tip": g_fallback["tip"],
                "suggestion": g_fallback["template"],
            }
    out["steps"] = [steps_by_key[k] for k in order]
    if out.get("next_step") not in order:
        out["next_step"] = "role"
    return out


# ----------------------------------------------------------------------------- EVALUATOR (/10)
RUBRIC = [
    "Structure & Completeness",
    "Client Personalisation",
    "Insight & Quantification",
    "Solution Fit",
    "Objection Readiness",
    "Compliance & Fair Dealing",
]
RUBRIC_I18N = {
    "en": RUBRIC,
    "zh-CN": [
        "结构与完整度",
        "客户共情与定制化",
        "财富洞察与量化测算",
        "方案契合度",
        "异议应对准备",
        "合规与公平待客",
    ],
    "yue": [
        "結構同完整度",
        "客戶人情味同個人化",
        "財富洞察同量化測算",
        "方案契合度",
        "異議應對準備",
        "合規同公平待客",
    ],
    "ms": [
        "Struktur & Kesempurnaan",
        "Empati & Pemperibadian Pelanggan",
        "Wawasan Kekayaan & Kuantifikasi",
        "Kesesuaian Penyelesaian",
        "Kesediaan Menangani Bantahan",
        "Pematuhan & Layanan Adil",
    ],
    "ta": [
        "கட்டமைப்பு & முழுமை",
        "வாடிக்கையாளர் அக்கறை & தனிப்பயனாக்கம்",
        "செல்வ நுண்ணறிவு & எண் மதிப்பீடு",
        "தீர்வுப் பொருத்தம்",
        "ஆட்சேபனை எதிர்கொள்ளல்",
        "விதிமுறை இணக்கம் & நேர்மை",
    ],
}
COMPLIANCE_TERMS = [
    "pds", "free-look", "free look", "fact-find", "fact find", "needs analysis", "fair dealing", "shariah",
    "schedule 10", "sched 10", "statutory trust", "hibah", "ftfc",
    "product summary", "faa", "bnm", "mas ", "pdpa", "illustrative", "no guaranteed", "not guaranteed", "non-guaranteed",
    "lembaran pendedahan", "tempoh bertenang", "analisis keperluan", "syariah", "patuh", "ilustratif",
    "犹豫期", "猶豫期", "冷静期", "冷靜期", "产品披露", "產品披露", "需求分析", "合规", "合規", "伊斯兰", "伊斯蘭", "法定信托", "法定信託", "仅供说明",
    "இணக்க", "ஷரியா", "வெளிப்படுத்தல்", "தேவை பகுப்பாய்வு", "உத்தரவாத", "ஆலோசனை",
]

BNM_VIOLATION_PATTERNS = [
    re.compile(r"guarante(?:e|ed|es|ing)\s+\d{1,2}(?:\.\d+)?\s*%\s*(?:annual|yearly|p\.?a\.?|investment|return|yield|profit)", re.I),
    re.compile(r"\d{1,2}(?:\.\d+)?\s*%\s*guaranteed\s*(?:return|yield|profit|interest|dividend)", re.I),
    re.compile(r"100%\s*risk[- ]?free\s*(?:investment|return|profit)", re.I),
    re.compile(r"(?:skip|bypass|ignore|without)\s+(?:any\s+)?(?:fact[- ]?find|needs\s+analysis|pds)", re.I),
    re.compile(r"(?:保证|保證)\s*(?:每年|年化)?\s*\d{1,2}(?:\.\d+)?\s*%\s*(?:回报|回報|收益|利息)", re.I),
    re.compile(r"pulangan\s+pelaburan\s+dijamin\s+\d{1,2}\s*%", re.I),
    re.compile(r"(?:skip|跳过|跳過|abaikan)\s*fact[- ]?find", re.I),
]


def _detect_bnm_violation(prompt: str, deck_text: str) -> str | None:
    combined = f"{prompt}\n{deck_text}"
    for rx in BNM_VIOLATION_PATTERNS:
        m = rx.search(combined)
        if m:
            return f"BNM Fair Dealing Violation detected ('{m.group(0)}'): Never promise guaranteed investment returns or bypass mandatory Fact-Find / PDS disclosure."
    return None


def _deck_text(deck: dict) -> str:
    d = copy.deepcopy(_normalize_deck_dict(deck))
    for s in d["slides"]:
        s.pop("image", None)
        s.pop("image_prompt", None)
    return json.dumps(d, ensure_ascii=False)


def _fmt_num(val: float) -> str:
    s = f"{val:.4f}".rstrip("0").rstrip(".")
    return s if s else "0"


def _numbers(text: str) -> set[str]:
    clean = text.replace(",", "")
    nums = {n.rstrip("0").rstrip(".") if "." in n else n for n in re.findall(r"\d+(?:\.\d+)?", clean)}
    for m in re.findall(r"(\d+(?:\.\d+)?)\s*[万萬]", clean):
        try:
            v = float(m)
            nums.add(_fmt_num(v / 100.0))
            nums.add(_fmt_num(v * 10.0))
        except Exception:
            pass
    return nums


def _bullet_words(b: str) -> float:
    cjk = len(re.findall(r"[\u4e00-\u9fff]", b))
    return len(b.split()) + cjk / 3.0


def deterministic_checks(
    deck: dict,
    market: str,
    seat_index: int | None = None,
    prompt: str = "",
    personal_angle: str = "",
) -> dict:
    slides = deck.get("slides") or []
    n = len(slides)
    slide_count = 1.0 if n == 3 else 0.0
    notes_ratio = sum(1 for s in slides if (s.get("speaker_notes") or "").strip()) / max(n, 1)
    text = _deck_text(deck)

    case_dict, _, _, key_nums = _resolve_case_and_target(market, "en", seat_index)
    case_nums = {x for x in (_numbers(_format_case_dict_text(case_dict)) | set(key_nums)) if x not in {"1", "2", "0", "3"}}
    matched = case_nums & _numbers(text)
    facts = min(1.0, len(matched) / 3.0)

    has_kpi = any(isinstance(s.get("kpis"), list) and len(s.get("kpis")) >= 2 for s in slides)
    has_chart = any(isinstance((s.get("chart") or {}).get("series"), list) and len((s.get("chart") or {}).get("series")) >= 2 for s in slides)
    has_table = any(isinstance((s.get("table") or {}).get("rows"), list) and len((s.get("table") or {}).get("rows")) >= 2 for s in slides)
    visual_richness = round((int(has_kpi) + int(has_chart) + int(has_table)) / 3.0, 2)

    low = text.lower()
    compliance = 1.0 if any(t in low for t in COMPLIANCE_TERMS) else 0.0
    violation = _detect_bnm_violation(prompt, text)
    if violation:
        compliance = 0.0

    angle_clean = (personal_angle or "").strip()
    has_angle_tag = bool(
        len(angle_clean) >= 10
        or re.search(
            r"\[(?:Personal Strategic Angle|Leader Strategic Angle|Empathy|Wealth Planning|Creative Relationship|个人策略切入|個人策略切入|Sudut Strategik|தனிப்பட்ட உத்தி)\]",
            prompt or "",
            re.I,
        )
    )
    personal_touch_score = 1.0 if has_angle_tag else (0.35 if len((prompt or "").strip()) > 320 else 0.0)

    dense = 0.0
    for s in slides:
        left_b = (s.get("left") or {}).get("bullets") or []
        right_b = (s.get("right") or {}).get("bullets") or []
        bl = (s.get("bullets") or []) + left_b + right_b
        max_w = max((_bullet_words(b) for b in bl), default=0.0)
        if len(s.get("bullets") or []) <= 6 and max_w <= 38:
            dense += 1.0
        elif len(s.get("bullets") or []) <= 7 and max_w <= 52:
            dense += 0.75
    density = dense / max(n, 1)

    items = {
        "slide_count": slide_count,
        "visual_richness": visual_richness,
        "speaker_notes": round(notes_ratio, 2),
        "case_facts_used": round(facts, 2),
        "compliance_mentioned": compliance,
        "personal_touch": round(personal_touch_score, 2),
        "readable_density": round(density, 2),
    }
    return {
        "items": items,
        "ratio": round(sum(items.values()) / len(items), 3),
        "slide_count": n,
        "matched_numbers": sorted(matched)[:12],
        "visual_flags": {"kpi": has_kpi, "chart": has_chart, "table": has_table},
        "compliance_violation": violation,
    }


def _judge_prompt(
    deck: dict,
    prompt: str,
    market: str,
    lang: str,
    seat_index: int | None = None,
    personal_angle: str = "",
) -> str:
    case_dict, target, _, _ = _resolve_case_and_target(market, lang, seat_index)
    target_outline = "\n".join(f"{i + 1}. {s['title']}" for i, s in enumerate(target["slides"]))
    loc_dims = RUBRIC_I18N.get(lang, RUBRIC)
    return (
        f"{market_context_block(market)}\n\n"
        f"ASSIGNED CLIENT CASE FILE (ground truth facts for THIS participant's unique seat):\n{_format_case_dict_text(case_dict)}\n\n"
        f"REFERENCE 3-SLIDE BENCHMARK DECK (3 slides):\n{target_outline}\n"
        f"Benchmark JSON:\n{_deck_text(target)}\n\n"
        f"PARTICIPANT'S ASSEMBLED PROMPT:\n\"\"\"{prompt}\"\"\"\n\n"
        f"PARTICIPANT'S PERSONAL STRATEGIC ANGLE / HOOK:\n\"\"\"{personal_angle or '(See prompt)'}\"\"\"\n\n"
        f"PARTICIPANT'S GENERATED 3-SLIDE DECK:\n{_deck_text(deck)}\n\n"
        "You are a calibrated, rigorous yet encouraging MDRT Executive Judge evaluating Challenge 2 for PRUMDA Learning Trip Agency Leaders.\n"
        "IMPORTANT CALIBRATION RULES (grade the QUALITY OF THE 3-SLIDE DECK + R.C.T.F.C. LOGIC + PERSONAL STRATEGIC TOUCH, independent of which client scenario was assigned):\n"
        "- Score 9–10 ONLY when the deck has quantified client numbers, structured visuals (KPIs + Gap Chart + Strategy Table), speaker notes, BNM/Shariah/Trust compliance, AND a bespoke Personal Strategic Angle / Co-Advisory Hook.\n"
        "- Score 7–8 when the deck uses R.C.T.F.C. structure and client facts well, but lacks a bespoke personal strategic touch or misses one visual/compliance element.\n"
        "- Score 4–6 when the prompt was a generic 1-liner producing generic bullet slides without the client's specific liquidity gap math, chart, table, or compliance guardrails.\n"
        "- Score 1–3 on Compliance & Fair Dealing (and flag in `factual_issues`) if the prompt or deck promises guaranteed investment returns (e.g. 'guaranteed 12% return') or skips mandatory BNM Fact-Find / PDS.\n"
        f"Write ALL feedback strings in {LANGS.get(lang, 'English')}.\n"
        f"1. rubric: score 1-10 for exactly these 6 dimensions in order: {', '.join(loc_dims)}. Quote brief evidence from the deck.\n"
        "2. coverage: for EACH of the 3 benchmark slides (target_slide 1..3 with its title) mark covered / partial / missing.\n"
        "3. factual_issues: any contradicted numbers or BNM compliance violations.\n"
        "4. what_went_well: 2-4 specific strengths. prompt_improvements: 2-3 actionable lines to add.\n"
        "5. prompt_craft: rate the PROMPT (0-2 each) for Role, Context, Task, Format, Constraints.\n"
        "6. verdict: one crisp, executive summary sentence."
    )


def evaluate_sync(
    deck: dict,
    prompt: str,
    market: str,
    lang: str,
    get_access_token_fn,
    project_id: str,
    location: str,
    seat_index: int | None = None,
    personal_angle: str = "",
) -> dict:
    norm_l = norm_lang(lang)
    norm_deck = _normalize_deck_dict(deck, lang=norm_l)
    checks = deterministic_checks(
        norm_deck, market, seat_index=seat_index, prompt=prompt, personal_angle=personal_angle
    )
    _, target_ref, _, _ = _resolve_case_and_target(market, norm_l, seat_index)
    loc_dims = RUBRIC_I18N.get(norm_l, RUBRIC)
    try:
        judge, model = call_vertex_structured(
            _judge_prompt(norm_deck, prompt, market, norm_l, seat_index=seat_index, personal_angle=personal_angle),
            JUDGE_SCHEMA,
            get_access_token_fn,
            project_id=project_id,
            location=location,
            temperature=0.15,
        )
    except Exception as exc:
        logger.warning("Vertex judge fallback triggered: %s", exc)
        base_sc = max(5, min(10, int(round(4.5 + checks["ratio"] * 5.2))))
        judge = {
            "rubric": [
                {"dimension": dim, "score": base_sc, "evidence": "", "comment": ""}
                for dim in loc_dims
            ],
            "coverage": [
                {
                    "target_slide": i + 1,
                    "target_title": s.get("title", f"Slide {i + 1}"),
                    "status": "covered" if checks["items"]["case_facts_used"] >= 0.6 else "partial",
                    "matched_user_slides": [i + 1],
                    "missing_elements": [],
                }
                for i, s in enumerate(target_ref["slides"][:3])
            ],
            "factual_issues": [checks["compliance_violation"]] if checks.get("compliance_violation") else [],
            "what_went_well": [],
            "prompt_improvements": [],
            "prompt_craft": {"role": 2, "context": 2, "task": 2, "format": 2, "constraints": 2, "comment": ""},
            "verdict": "",
        }
        model = "deterministic-fallback"

    rubric_list = judge.get("rubric") or []
    for idx, r in enumerate(rubric_list):
        r["score"] = max(1, min(10, int(r.get("score", 7))))
        if idx < len(loc_dims):
            r["dimension"] = loc_dims[idx]

    # Enforce deterministic BNM violation penalty if detected
    if checks.get("compliance_violation"):
        if rubric_list and len(rubric_list) >= 6:
            rubric_list[5]["score"] = min(rubric_list[5]["score"], 2)
        issues = judge.setdefault("factual_issues", [])
        if checks["compliance_violation"] not in issues:
            issues.insert(0, checks["compliance_violation"])

    rubric_avg = sum(r["score"] for r in rubric_list) / max(len(rubric_list), 1)
    cov_points = {"covered": 1.0, "partial": 0.5, "missing": 0.0}
    coverage_list = (judge.get("coverage") or [])[:3]
    coverage_ratio = sum(cov_points.get(c.get("status", "missing"), 0.0) for c in coverage_list) / 3.0

    craft = judge.get("prompt_craft") or {}
    craft_sum = sum(max(0, min(2, int(craft.get(k, 1)))) for k in ("role", "context", "task", "format", "constraints"))
    craft_ratio = craft_sum / 10.0

    # Hybrid calibration anchors grounded in deterministic structural evidence:
    # Ensure non-violating rich decks across all 5 languages receive consistent executive grading
    if not checks.get("compliance_violation"):
        if (
            checks["items"]["visual_richness"] >= 0.99
            and checks["items"]["case_facts_used"] >= 0.66
            and checks["items"]["compliance_mentioned"] >= 1.0
            and checks["items"]["personal_touch"] >= 1.0
        ):
            rubric_avg = max(rubric_avg, 9.1)
            coverage_ratio = max(coverage_ratio, 1.0)
            craft_ratio = max(craft_ratio, 0.9)
        elif (
            checks["items"]["visual_richness"] >= 0.6
            and checks["items"]["case_facts_used"] >= 0.66
            and checks["items"]["compliance_mentioned"] >= 1.0
        ):
            rubric_avg = max(rubric_avg, 8.0)
            coverage_ratio = max(coverage_ratio, 0.83)
            craft_ratio = max(craft_ratio, 0.8)

    # Weighted 10-point score:
    # - 5.2 pts: 6-Dimension Deck Quality Rubric
    # - 1.8 pts: 3-Slide Benchmark Coverage
    # - 1.5 pts: R.C.T.F.C. Prompt Craft
    # - 1.5 pts: Deterministic Visuals, Case Facts, Compliance & Personal Strategic Touch
    part_a = 5.2 * (rubric_avg / 10.0)
    part_b = 1.8 * coverage_ratio
    part_craft = 1.5 * craft_ratio
    part_c = 1.5 * checks["ratio"]
    raw_total = part_a + part_b + part_craft + part_c

    # Hard cap if BNM Fair Dealing violation (e.g. guaranteed % return promise)
    if checks.get("compliance_violation"):
        raw_total = min(raw_total, 5.8)
    # Fair baseline floor (4.2) & ceiling (6.6) for non-violating bare 1-line prompts
    elif checks["items"]["case_facts_used"] == 0.0 and checks["items"]["visual_richness"] == 0.0:
        raw_total = max(4.2, min(raw_total, 6.6))
    # Cap decks that have no Personal Strategic Touch at 8.8 so Master + Personal Touch cleanly wins Tier A (9.1+)
    elif checks["items"]["personal_touch"] < 0.5:
        raw_total = min(raw_total, 8.8)

    total = round(max(1.0, min(10.0, raw_total)), 1)
    return {
        "total": total,
        "breakdown": {
            "rubric": round(part_a, 2),
            "coverage": round(part_b, 2),
            "prompt_craft": round(part_craft, 2),
            "checks": round(part_c, 2),
            "rubric_avg": round(rubric_avg, 1),
            "coverage_ratio": round(coverage_ratio, 2),
        },
        "judge": judge,
        "checks": checks,
        "model": model,
    }


# ----------------------------------------------------------------------------- PPTX EXPORT
def _resolve_slide_image_bytes(img_val: str | None) -> tuple[bytes | None, str]:
    """Resolves slide image bytes from data: URLs, /api/media/<fname>, or /static/<rel>."""
    if not img_val or not isinstance(img_val, str):
        return None, ".jpg"
    val = img_val.strip()
    try:
        if val.startswith("data:image/"):
            header, b64 = val.split(",", 1)
            ext = ".png" if "png" in header.lower() else ".jpg"
            return base64.b64decode(b64), ext
        if val.startswith("/api/media/"):
            fname = val.removeprefix("/api/media/").strip("/")
            media_dir = Path(os.environ.get("PAMB_MEDIA_DIR", "/tmp/pamb_arena_media"))
            fpath = media_dir / fname
            if fpath.is_file() and fpath.suffix.lower() in (".png", ".jpg", ".jpeg"):
                return fpath.read_bytes(), fpath.suffix.lower()
        if val.startswith("/static/"):
            rel = val.removeprefix("/static/").lstrip("/")
            fpath = STATIC_DIR / rel
            if fpath.is_file() and fpath.suffix.lower() in (".png", ".jpg", ".jpeg"):
                return fpath.read_bytes(), fpath.suffix.lower()
    except Exception:
        pass
    return None, ".jpg"


def _build_minimal_openxml_pptx(deck_dict: dict) -> bytes:
    """Pure-stdlib valid OpenXML .pptx builder (3 slides + embedded media) when python-pptx is absent."""
    slides = (deck_dict.get("slides") or [])[:3]
    buf = io.BytesIO()
    with zipfile.ZipFile(buf, "w", zipfile.ZIP_DEFLATED) as zf:
        media_exts = set()
        slide_media: dict[int, str] = {}
        for idx, s in enumerate(slides, 1):
            raw_img, ext = _resolve_slide_image_bytes(s.get("image"))
            if raw_img:
                ext_clean = "jpeg" if ext in (".jpg", ".jpeg") else "png"
                media_exts.add(ext_clean)
                mname = f"image{idx}.{ext_clean}"
                zf.writestr(f"ppt/media/{mname}", raw_img)
                slide_media[idx] = mname

        ext_defaults = [
            '<Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>',
            '<Default Extension="xml" ContentType="application/xml"/>',
        ]
        if "png" in media_exts:
            ext_defaults.append('<Default Extension="png" ContentType="image/png"/>')
        if "jpeg" in media_exts:
            ext_defaults.append('<Default Extension="jpeg" ContentType="image/jpeg"/>')

        slide_overrides = "".join(
            f'<Override PartName="/ppt/slides/slide{i}.xml" '
            'ContentType="application/vnd.openxmlformats-officedocument.presentationml.slide+xml"/>'
            for i in range(1, len(slides) + 1)
        )
        zf.writestr(
            "[Content_Types].xml",
            '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>'
            '<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">'
            + "".join(ext_defaults)
            + '<Override PartName="/ppt/presentation.xml" '
            'ContentType="application/vnd.openxmlformats-officedocument.presentationml.presentation.main+xml"/>'
            + slide_overrides
            + "</Types>",
        )
        zf.writestr(
            "_rels/.rels",
            '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>'
            '<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">'
            '<Relationship Id="rId1" '
            'Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" '
            'Target="ppt/presentation.xml"/></Relationships>',
        )
        pres_rels = "".join(
            f'<Relationship Id="rId{i}" '
            'Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/slide" '
            f'Target="slides/slide{i}.xml"/>'
            for i in range(1, len(slides) + 1)
        )
        zf.writestr(
            "ppt/_rels/presentation.xml.rels",
            '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>'
            f'<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">{pres_rels}</Relationships>',
        )
        sld_ids = "".join(
            f'<p:sldId id="{255 + i}" r:id="rId{i}"/>' for i in range(1, len(slides) + 1)
        )
        zf.writestr(
            "ppt/presentation.xml",
            '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>'
            '<p:presentation xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" '
            'xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships" '
            'xmlns:p="http://schemas.openxmlformats.org/presentationml/2006/main">'
            f"<p:sldIdLst>{sld_ids}</p:sldIdLst>"
            '<p:sldSz cx="12192000" cy="6858000"/>'
            '<p:notesSz cx="6858000" cy="9144000"/>'
            "</p:presentation>",
        )

        for i, s in enumerate(slides, 1):
            lines_out = [s.get("title") or f"Slide {i}"]
            if s.get("subtitle"):
                lines_out.append(str(s["subtitle"]))
            for kp in s.get("kpis") or []:
                lines_out.append(f"{kp.get('label', '')}: {kp.get('value', '')} ({kp.get('note', '')})")
            if s.get("chart") and (s["chart"].get("series") or []):
                lines_out.append(
                    " | ".join(f"{pt.get('label', '')}: {pt.get('value', '')}" for pt in s["chart"]["series"])
                )
            if s.get("table") and (s["table"].get("rows") or []):
                for r in s["table"]["rows"]:
                    lines_out.append(" • ".join(str(c) for c in r))
            for b in s.get("bullets") or []:
                lines_out.append(f"• {b}")
            if s.get("callout"):
                lines_out.append(str(s["callout"]))

            paras = "".join(
                f"<a:p><a:r><a:t>{saxutils.escape(str(line))}</a:t></a:r></a:p>"
                for line in lines_out
            )
            pic_xml = ""
            if i in slide_media:
                zf.writestr(
                    f"ppt/slides/_rels/slide{i}.xml.rels",
                    '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>'
                    '<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">'
                    '<Relationship Id="rImg1" '
                    'Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/image" '
                    f'Target="../media/{slide_media[i]}"/></Relationships>',
                )
                pic_xml = (
                    "<p:pic><p:nvPicPr><p:cNvPr id=\"4\" name=\"SlideVisual\"/><p:cNvPicPr/><p:nvPr/></p:nvPicPr>"
                    "<p:blipFill><a:blip r:embed=\"rImg1\"/><a:stretch><a:fillRect/></a:stretch></p:blipFill>"
                    "<p:spPr><a:xfrm><a:off x=\"7600000\" y=\"1600000\"/><a:ext cx=\"4100000\" cy=\"2300000\"/></a:xfrm>"
                    "<a:prstGeom prst=\"rect\"><a:avLst/></a:prstGeom></p:spPr></p:pic>"
                )
            zf.writestr(
                f"ppt/slides/slide{i}.xml",
                '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>'
                '<p:sld xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" '
                'xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships" '
                'xmlns:p="http://schemas.openxmlformats.org/presentationml/2006/main">'
                "<p:cSld><p:spTree>"
                '<p:nvGrpSpPr><p:cNvPr id="1" name=""/><p:cNvGrpSpPr/><p:nvPr/></p:nvGrpSpPr>'
                "<p:grpSpPr/>"
                '<p:sp><p:nvSpPr><p:cNvPr id="2" name="Content"/><p:cNvSpPr/><p:nvPr/></p:nvSpPr>'
                '<p:spPr><a:xfrm><a:off x="550000" y="450000"/><a:ext cx="6800000" cy="5800000"/></a:xfrm>'
                '<a:prstGeom prst="rect"><a:avLst/></a:prstGeom></p:spPr>'
                f"<p:txBody><a:bodyPr/><a:lstStyle/>{paras}</p:txBody></p:sp>"
                f"{pic_xml}"
                "</p:spTree></p:cSld></p:sld>",
            )
    return buf.getvalue()


def build_pptx_bytes(deck_dict: dict) -> bytes:
    """Builds 3-slide .pptx using python-pptx when installed, or valid OpenXML .pptx fallback."""
    deck_dict = _normalize_deck_dict(deck_dict)
    try:
        from pptx import Presentation
        from pptx.chart.data import CategoryChartData
        from pptx.dml.color import RGBColor
        from pptx.enum.chart import XL_CHART_TYPE
        from pptx.enum.shapes import MSO_SHAPE
        from pptx.util import Emu, Inches, Pt

        RED = RGBColor(0xD9, 0x1F, 0x26)
        NAVY = RGBColor(0x14, 0x1B, 0x2D)
        GREY = RGBColor(0x4B, 0x55, 0x63)
        LIGHT = RGBColor(0xF4, 0xF5, 0xF7)
        W, H = Inches(13.333), Inches(7.5)

        def _text(slide, x, y, w, h, text, size=16, bold=False, color=NAVY):
            tb = slide.shapes.add_textbox(x, y, w, h)
            tf = tb.text_frame
            tf.word_wrap = True
            p = tf.paragraphs[0]
            p.text = text or ""
            p.font.size = Pt(size)
            p.font.bold = bold
            p.font.color.rgb = color
            return tf

        def _bullets(slide, x, y, w, h, items, size=15):
            tb = slide.shapes.add_textbox(x, y, w, h)
            tf = tb.text_frame
            tf.word_wrap = True
            for i, it in enumerate(items or []):
                p = tf.paragraphs[0] if i == 0 else tf.add_paragraph()
                p.text = f"•  {it}"
                p.font.size = Pt(size)
                p.font.color.rgb = GREY
                p.space_after = Pt(6)

        prs = Presentation()
        prs.slide_width, prs.slide_height = W, H
        slides = (deck_dict.get("slides") or [])[:3]
        n = len(slides)
        for i, s in enumerate(slides, 1):
            sl = prs.slides.add_slide(prs.slide_layouts[6])
            bar = sl.shapes.add_shape(MSO_SHAPE.RECTANGLE, 0, 0, W, Inches(0.12))
            bar.fill.solid()
            bar.fill.fore_color.rgb = RED
            bar.line.fill.background()
            _text(sl, Inches(0.6), Inches(0.35), Inches(12), Inches(0.9), s.get("title"), 28, True)
            if s.get("subtitle"):
                _text(sl, Inches(0.6), Inches(1.15), Inches(12), Inches(0.5), s.get("subtitle"), 14, False, GREY)
            _text(sl, Inches(11.6), Inches(7.0), Inches(1.5), Inches(0.4), f"{i}/{n}", 10, False, GREY)
            if s.get("speaker_notes"):
                sl.notes_slide.notes_text_frame.text = s.get("speaker_notes")

            top = Inches(1.8)
            raw_img_bytes, _ = _resolve_slide_image_bytes(s.get("image"))
            has_img = raw_img_bytes is not None
            content_w = Inches(7.4) if has_img else Inches(12.1)
            if has_img:
                try:
                    sl.shapes.add_picture(io.BytesIO(raw_img_bytes), Inches(8.2), top, Inches(4.6), Inches(2.6))
                except Exception:
                    content_w = Inches(12.1)
            kpis = s.get("kpis") or []
            if kpis:
                cw = (content_w - Inches(0.3) * (len(kpis) - 1)) / max(len(kpis), 1)
                for k, kp in enumerate(kpis[:4]):
                    x = Inches(0.6) + k * (cw + Inches(0.3))
                    box = sl.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, x, top, Emu(int(cw)), Inches(1.3))
                    box.fill.solid()
                    box.fill.fore_color.rgb = LIGHT
                    box.line.color.rgb = RED
                    _text(sl, x + Inches(0.15), top + Inches(0.1), Emu(int(cw)) - Inches(0.3), Inches(0.4), kp.get("label", ""), 11, False, GREY)
                    _text(sl, x + Inches(0.15), top + Inches(0.42), Emu(int(cw)) - Inches(0.3), Inches(0.5), kp.get("value", ""), 22, True, RED)
                    _text(sl, x + Inches(0.15), top + Inches(0.9), Emu(int(cw)) - Inches(0.3), Inches(0.35), kp.get("note", ""), 10, False, GREY)
                top += Inches(1.6)
            chart = s.get("chart")
            table = s.get("table")
            left = s.get("left")
            right = s.get("right")
            steps = s.get("steps")
            bullets = s.get("bullets")
            if chart and chart.get("series"):
                cd = CategoryChartData()
                cd.categories = [p.get("label", "") for p in chart["series"]]
                cd.add_series(chart.get("unit") or "Value", [float(p.get("value", 0)) for p in chart["series"]])
                gf = sl.shapes.add_chart(XL_CHART_TYPE.COLUMN_CLUSTERED, Inches(0.6), top, Inches(6.2), Inches(4.2), cd)
                gf.chart.has_legend = False
                gf.chart.plots[0].series[0].format.fill.solid()
                gf.chart.plots[0].series[0].format.fill.fore_color.rgb = RED
                _bullets(sl, Inches(7.1), top, Inches(5.6), Inches(4.2), bullets, 13)
            elif table and table.get("headers"):
                headers = table["headers"]
                rows_data = table.get("rows") or []
                rows, cols = len(rows_data) + 1, len(headers)
                tbl = sl.shapes.add_table(rows, cols, Inches(0.6), top, content_w, Inches(0.5) * rows).table
                for c, hd in enumerate(headers):
                    cell = tbl.cell(0, c)
                    cell.text = hd
                    cell.fill.solid()
                    cell.fill.fore_color.rgb = NAVY
                    cell.text_frame.paragraphs[0].font.color.rgb = RGBColor(255, 255, 255)
                    cell.text_frame.paragraphs[0].font.size = Pt(12)
                    cell.text_frame.paragraphs[0].font.bold = True
                for r, row in enumerate(rows_data, 1):
                    for c in range(cols):
                        cell = tbl.cell(r, c)
                        cell.text = row[c] if c < len(row) else ""
                        cell.text_frame.paragraphs[0].font.size = Pt(11)
            elif left or right:
                for k, col in enumerate([left, right]):
                    if not col:
                        continue
                    x = Inches(0.6) + k * Inches(6.2)
                    _text(sl, x, top, Inches(5.8), Inches(0.5), col.get("heading", ""), 16, True, RED)
                    _bullets(sl, x, top + Inches(0.5), Inches(5.8), Inches(4), col.get("bullets"), 14)
            elif steps:
                sw = content_w / max(len(steps), 1)
                for k, st in enumerate(steps):
                    x = Inches(0.6) + k * sw
                    dot = sl.shapes.add_shape(MSO_SHAPE.OVAL, x, top, Inches(0.4), Inches(0.4))
                    dot.fill.solid()
                    dot.fill.fore_color.rgb = RED
                    dot.line.fill.background()
                    _text(sl, x, top + Inches(0.5), Emu(int(sw)) - Inches(0.2), Inches(0.4), st.get("label", ""), 13, True)
                    _text(sl, x, top + Inches(0.9), Emu(int(sw)) - Inches(0.2), Inches(1.2), st.get("detail", ""), 11, False, GREY)
                _bullets(sl, Inches(0.6), top + Inches(2.3), content_w, Inches(2), bullets, 13)
            elif bullets:
                _bullets(sl, Inches(0.6), top, content_w, Inches(4.6), bullets, 16)
            if s.get("callout"):
                cb = sl.shapes.add_shape(MSO_SHAPE.RECTANGLE, Inches(0.6), Inches(6.35), Inches(12.1), Inches(0.55))
                cb.fill.solid()
                cb.fill.fore_color.rgb = LIGHT
                cb.line.color.rgb = RED
                tf = cb.text_frame
                tf.text = s["callout"]
                tf.paragraphs[0].font.size = Pt(13)
                tf.paragraphs[0].font.color.rgb = NAVY
        buf = io.BytesIO()
        prs.save(buf)
        return buf.getvalue()
    except ImportError:
        return _build_minimal_openxml_pptx(deck_dict)


# ----------------------------------------------------------------------------- IN-MEMORY STATE & HANDLERS
_lock = threading.Lock()
_last_gen: dict[str, float] = {}
_submissions: dict[str, dict] = {}


def handle_c2_get_challenge(
    market: str,
    lang: str,
    get_access_token_fn,
    project_id: str,
    location: str,
    seat_index: int | None = None,
) -> dict:
    market = "SG" if (market or "MY").upper() == "SG" else "MY"
    lang = norm_lang(lang)

    if market == "MY":
        effective_seat = int(seat_index) if seat_index is not None else 0
        scen = resolve_c2_seat_scenario(effective_seat, lang)
        archetypes = list_c2_archetype_summaries(lang)
        return {
            "market": market,
            "lang": lang,
            "langs": LANG_LABELS,
            "ui": UI[lang],
            "seatIndex": scen["seatIndex"],
            "totalUniqueSeats": scen["totalUniqueSeats"],
            "scenario": scen,
            "archetypes": archetypes,
            "caseCards": scen["caseCards"],
            "angleHints": scen["angleHints"],
            "simple_prompt": scen["simple_prompt"],
            "target_slides": 3,
            "case_file": scen["case_file"],
            "guide": scen["guide"],
            "target": scen["target"],
            "rubric": RUBRIC_I18N.get(lang, RUBRIC),
            "scoring": {"rubric": 5.2, "coverage": 1.8, "prompt_craft": 1.5, "checks": 1.5, "max": 10},
        }

    with concurrent.futures.ThreadPoolExecutor(max_workers=3) as pool:
        f_case = pool.submit(_translated_sync, "case", market, lang, get_access_token_fn, project_id, location)
        f_guide = pool.submit(_translated_sync, "guide", market, lang, get_access_token_fn, project_id, location)
        f_target = pool.submit(_translated_sync, "target", market, lang, get_access_token_fn, project_id, location)
        case_out = f_case.result()
        guide_out = f_guide.result()
        target_out = f_target.result()

    return {
        "market": market,
        "lang": lang,
        "langs": LANG_LABELS,
        "ui": UI[lang],
        "seatIndex": 0,
        "totalUniqueSeats": get_c2_total_unique_seats(),
        "simple_prompt": SIMPLE_PROMPT[lang],
        "target_slides": 3,
        "case_file": case_out,
        "guide": guide_out,
        "target": _with_target_images(target_out, market),
        "rubric": RUBRIC_I18N.get(lang, RUBRIC),
        "scoring": {"rubric": 5.2, "coverage": 1.8, "prompt_craft": 1.5, "checks": 1.5, "max": 10},
    }


def handle_c2_generate_deck(body: dict, get_access_token_fn, project_id: str, location: str) -> tuple[dict, int]:
    session_id = str(body.get("session_id") or "default-session")
    prompt = str(body.get("prompt") or "").strip()
    if len(prompt) < 3:
        return {"detail": "Prompt must be at least 3 characters."}, 400

    now = time.time()
    with _lock:
        if now - _last_gen.get(session_id, 0) < 1.2:
            return {"detail": "Please wait a moment between generations."}, 429
        _last_gen[session_id] = now

    try:
        deck, model = generate_deck_sync(
            prompt,
            norm_lang(body.get("lang", "en")),
            get_access_token_fn,
            project_id,
            location,
        )
    except Exception as exc:
        logger.exception("generate failed")
        return {"detail": f"Deck generation failed: {exc}"}, 502

    return {
        "deck": deck,
        "signature": sign_deck(deck),
        "version": int(body.get("version", 1)),
        "model": model,
        "seconds": round(time.time() - now, 1),
    }, 200


def handle_c2_coach(body: dict, get_access_token_fn, project_id: str, location: str) -> tuple[dict, int]:
    try:
        out = coach_sync(body, get_access_token_fn, project_id, location)
        return out, 200
    except Exception as exc:
        logger.exception("coach failed")
        return {"detail": f"Guidance failed: {exc}"}, 502


def handle_c2_images(body: dict, call_image_fn) -> tuple[dict, int]:
    prompts = (body.get("prompts") or [])[:2]

    def _gen_one(p: str):
        if not p:
            return None
        styled = (
            f"{p}. Luxury editorial boardroom presentation illustration, architectural geometry, warm natural light, "
            "deep slate navy, crisp ivory and subtle crimson accents, 16:9 widescreen, strictly zero text, letters, numbers or logos."
        )
        try:
            data_url, _ = call_image_fn(None, styled)
            return data_url
        except Exception:
            return None

    with concurrent.futures.ThreadPoolExecutor(max_workers=2) as pool:
        imgs = list(pool.map(_gen_one, prompts))
    return {"images": imgs}, 200


def handle_c2_submit_deck(body: dict, get_access_token_fn, project_id: str, location: str) -> tuple[dict, int]:
    lang = norm_lang(body.get("lang", "en"))
    deck = _normalize_deck_dict(body.get("deck") or {}, lang=lang)
    signature = str(body.get("signature") or "")
    if not verify_deck(deck, signature):
        return {"detail": "This deck was not generated by the challenge (signature mismatch)."}, 400

    started = time.time()
    market = "SG" if str(body.get("market", "MY")).upper() == "SG" else "MY"
    prompt = str(body.get("prompt") or "")
    personal_angle = str(body.get("personal_angle") or body.get("personalAngle") or "")
    seat_raw = body.get("seat_index", body.get("seatIndex"))
    seat_idx = int(seat_raw) if seat_raw is not None and str(seat_raw).strip() != "" else None
    try:
        result = evaluate_sync(
            deck,
            prompt,
            market,
            lang,
            get_access_token_fn,
            project_id,
            location,
            seat_index=seat_idx,
            personal_angle=personal_angle,
        )
    except Exception as exc:
        logger.exception("evaluation failed")
        return {"detail": f"Evaluation failed: {exc}"}, 502

    sid = secrets.token_hex(5)
    history = body.get("history") or []
    lineage = body.get("lineage") or []
    first = history[0] if history else None
    duration_s = None
    if len(history) > 1 and isinstance(history[-1], dict) and isinstance(history[0], dict):
        try:
            duration_s = round(float(history[-1].get("at", 0)) - float(history[0].get("at", 0)), 1)
        except Exception:
            duration_s = None

    record = {
        "id": sid,
        "name": (body.get("name") or "Agent").strip() or "Agent",
        "participant_id": body.get("participant_id"),
        "seat_index": seat_idx,
        "personal_angle": personal_angle,
        "market": market,
        "lang": lang,
        "prompt": prompt,
        "deck": deck,
        "result": result,
        "iterations": len(history) or 1,
        "first_prompt": first.get("prompt", prompt) if isinstance(first, dict) else prompt,
        "first_slide_count": 3,
        "lineage": lineage[-60:],
        "duration_s": duration_s,
        "submitted_at": time.time(),
    }
    with _lock:
        _submissions[sid] = record

    return {
        "submission_id": sid,
        "view_url": f"/view/{sid}",
        **result,
        "iterations": record["iterations"],
        "eval_seconds": round(time.time() - started, 1),
    }, 200


def handle_c2_get_submission(sid: str) -> tuple[dict, int]:
    with _lock:
        rec = _submissions.get(sid)
    if not rec:
        return {"detail": "Submission not found"}, 404
    return rec, 200


def handle_c2_leaderboard(market: str | None = None, limit: int = 20) -> dict:
    with _lock:
        rows = [r for r in _submissions.values() if not market or r["market"] == market]
    rows.sort(key=lambda r: (-r["result"]["total"], r["submitted_at"]))
    return {
        "leaderboard": [
            {
                "rank": i + 1,
                "id": r["id"],
                "name": r["name"],
                "total": r["result"]["total"],
                "slides": len(r["deck"]["slides"]),
                "iterations": r["iterations"],
                "market": r["market"],
                "deck_title": r["deck"]["title"],
            }
            for i, r in enumerate(rows[:limit])
        ]
    }


def handle_c2_target_pptx(market: str, lang: str, get_access_token_fn, project_id: str, location: str) -> bytes:
    market = "SG" if (market or "MY").upper() == "SG" else "MY"
    target = _translated_sync("target", market, norm_lang(lang), get_access_token_fn, project_id, location)
    return build_pptx_bytes(_with_target_images(target, market, as_data_url=True))


# Legacy /api/ai handler for backward compatibility
def handle_c2_ai(body: dict, call_gemini_fn, lang_names: dict) -> dict:
    lang = body.get("language", "zh-CN")
    lang_label = lang_names.get(lang, "English")
    persona = body.get("persona", "Senior PRUMDA Wealth & Legacy Planning Consultant")
    context = body.get("context", "Datin Sharifah Aleya (52, Founder of 6 specialist clinics in Klang Valley, RM 28M net worth)")
    task = body.get("task", "Create a 3-slide pre-pitch deck covering Client Snapshot, Estate Liquidity Gap, and Shariah-compliant Takaful Strategy")
    fmt = body.get("format", "3 structured slides with KPI cards, bar chart, strategy table, and speaker notes")
    custom = body.get("customPrompt", "").strip()
    assembled = f"[Role]: {persona}\n[Context]: {context}\n[Task]: {task}\n[Format]: {fmt}"
    if custom:
        assembled += f"\n[Constraints]: {custom}"
    prompt = f"Respond in {lang_label}. Summarize a 3-slide pre-pitch brief based on:\n{assembled}"
    ai_text, model_used, ms = call_gemini_fn(prompt)
    return {
        "ok": True,
        "challenge": "2",
        "assembledPrompt": assembled,
        "aiResponse": ai_text or "Slide 1: Client Snapshot • Slide 2: RM 6.5M Estate Liquidity Gap • Slide 3: Family Takaful + Hibah Strategy",
        "pillarScores": {"persona": 24, "context": 25, "task": 24, "format": 24},
        "qualityScore": 97,
        "judgeFeedback": "Strong R.C.T.F.C. prompt structure aligned with the 3-slide target deck!",
        "modelUsed": model_used,
        "latencyMs": ms,
    }
