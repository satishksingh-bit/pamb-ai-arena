# 🇲🇾 PRUMDA Learning Trip • AI Arena — 11 November

**Event:** PRUMDA Learning Trip AI Arena  
**Date & Time:** 11 November | 13:45 – 15:30 (Hands-On Challenges & Stage Showcases)  
**Venue:** Google Singapore (Room Bromo)  
**Audience:** Visiting Malaysian Agency Leaders (`🇲🇾`) — supporting all **5 native languages** (defaulting to **English (`en`)**): **English (`en`)**, **简体中文 (`zh-CN`)**, **廣東話 / 粵語 (`yue` / `zh-TW`)**, **Bahasa Melayu (`ms`)**, and **தமிழ் (`ta`)**.

---

## 🤖 Standardized Vertex AI Model Stack (`locations/global`)

| Modality | Primary Model | Fallback Chain | Usage Across Arena |
| :--- | :--- | :--- | :--- |
| **Text / JSON / Vision / Judge** | **`gemini-3.5-flash-lite`** | `gemini-3.1-flash-lite` → `gemini-2.5-flash` | C1 Copy & Face Bounding-Box Detection, C2 3-Slide Structured Deck & 6-Dim Judge, C3 WhatsApp/Comparison Email & 4-Pillar Judge, Stage Canvas & Live Coach |
| **Image Generation** | **`gemini-3.1-flash-image`** | `gemini-3-pro-image` → `gemini-2.5-flash-image` | C1 Face-Locked Executive Portrait & Greeting/Brand Cards, C2 16:9 Slide Visuals, C3 Life-Event Greeting Cards |

---

## 🧭 1. Exact Mapping to the 11 November Agenda

| Time | Duration | Agenda Session | Arena Stage / Module |
| :--- | :--- | :--- | :--- |
| **13:45 – 14:00** | 15m | **Envision the future — Overview of AI** | **Stage 0 (`LAUNCH`) & Stage 1 (`LOBBY`)**: Welcome briefing + QR Code Onboarding (`/join`) with 5-language selection (`en` default, `zh-CN`, `zh-TW`/`yue`, `ms`, `ta`). |
| **14:00 – 14:20** | 20m | **Reinvent your professional image and customer outreach when it matters** | **Challenge 1 (`C1`)**: Live phone selfie / upload + Step 1 Face-Locked Executive Studio Portrait (`gemini-3.1-flash-image`) + Step 2 Personalized Client Milestone/Festive Cards & Brand Banners. |
| **14:20 – 14:35** | 15m | **Master the art of AI dialogue** (*R.C.T.F.C. Executive 3-Slide Deck Studio*) | **Challenge 2 (`C2`)**: **72 unique HNW Malaysian client seats** (**6 curated cases × 12 personas**). Leaders toggle the **5 R.C.T.F.C. Pillars**, Boardroom Style, and **Personal Strategic Angle** inside a live editable prompt box to generate a **strictly 3-slide** Keynote Pre-Pitch Deck (KPIs + Liquidity Gap Bar Chart + Strategy Matrix + post-submit `.pptx` export), scored across 6 dimensions (`/10`). |
| **14:35 – 15:05** | 30m | **Drive faster pipeline, sharpen your strategic proposal to sales close - Pre-pitch** | **Challenge 3 (`C3`)**: **72 unique life-milestone seats** (**6 curated positive cases × 12 personas** with strong Health & Wealth coverage). Leaders create a Step 1 Door-Opener Greeting Card + Step 2 First-Touch WhatsApp + Step 3 Grounded Plan Comparison Email (vs. competitor quote) with their **Personal Touch**. |
| **15:05 – 15:15** | 10m | **Canvas to ideate to your team** | **Stage Demo 1 (`CANVAS`)**: Live split-screen stage showcase turning a team concept or winning submission into a **90-Day MDRT Sprint Playbook**, KPI table, and Monday Huddle Script. |
| **15:15 – 15:30** | 15m | **Live coaching — The Public Speaker** | **Stage Demo 2 (`COACH`) + Podium (`PODIUM`)**: Multimodal AI Executive Coach (`WebRTC Camera + Live Mic`) + Champions Podium. |

---

## 🎯 2. Curated 72-Seat Architecture (`6 Cases × 12 Personas`)

Seats are interleaved (`seat = round * 6 + slot`, `round = 0..11`, `slot = 0..5`) so consecutive mobile participants receive distinct cases and personas, and manual `[Switch Case (1/6) ▾]` preserves each leader's persona round:

- **Challenge 2 (`6 Curated HNW Pre-Pitch Cases × 12 Personas = 72 Seats`):**
  1. 🏛️ **Listed Group CFO** (*Age-60 Cliff & Twins Uni* — Gap `RM 4.4M`)
  2. 🩺 **Senior Medical Specialist** (*Premier Health & Practice Reserve* — Gap `RM 5.9M`)
  3. 🏥 **Clinic Group Founder** (*Hibah Gap* — Gap `RM 6.5M`)
  4. 🚀 **Tech Post-Exit Founder** (*Legacy Multiplier* — Gap `RM 4.5M`)
  5. 🌿 **3-Gen Family Matriarch** (*Longevity Care & Grandkids Pool* — Gap `RM 6M`)
  6. 🏭 **Semicon Founder** (*Capex & Legacy* — Gap `RM 9.5M`)
- **Challenge 3 (`6 Curated Positive Life-Milestone Cases × 12 Personas = 72 Seats`):**
  1. 🍼 **Newborn Baby** (`PRUMy Child Plus (PRUSaver Kid) + PRUWith You Plus + PRUMillion Med Active 2.0`)
  2. ⚡ **40th Birthday & Health Upgrade** (`PRUMillion Med Active 2.0 + PRUAll Care + PRUMan`)
  3. 🌟 **Executive Promotion** (`PRULady + PRUElite Invest + PRUValue Med`)
  4. 🎓 **Turning 50 & Uni Offer** (`PRUValue Med (Smart Deductible) + PRUElite Flex`)
  5. 🏡 **New RM 1.3M Home Keys** (`PRUWith You Plus (Portable MLTA) + PRUAll Care`)
  6. 🕌 **Muslim SME Hibah & Faraid** (`PRUBSN WarisanPlus + PRUBSN AnugerahPlus (Shariah Hibah)`)

---

## 🗂️ 3. Repository Structure

```text
pamb-ai-arena/
├── server.py                        # Core HTTP server, atomic C2/C3 72-seat router, /api/media/ offload & Vertex AI auth
├── Dockerfile                       # Cloud Run container definition (Port 8095)
├── requirements.txt                 # Python dependencies (requests, google-auth, Pillow, pydantic, python-pptx, google-genai)
├── deploy.sh                        # One-command Cloud Run deployment script
├── challenges/
│   ├── c1_image_outreach.py         # Challenge 1 Backend: Face-Lock Portrait, Multi-Turn Isolation & Brand Judge
│   ├── c2_prompt_duel.py            # Challenge 2 Backend: Strict 3-Slide Schemas, PPTX Export & 6-Dim Hybrid Judge
│   ├── c2_scenarios_bank.py         # Challenge 2 Bank: 72 Unique HNW Malaysian Seats (6 Curated Cases × 12 Personas)
│   ├── c3_pre_pitch.py              # Challenge 3 Backend: Greeting Card, Selection-Isolated Synthesis & 4-Pillar Judge
│   ├── c3_scenarios_bank.py         # Challenge 3 Bank: 72 Unique Life-Milestone Seats (6 Curated Cases × 12 Personas)
│   └── stage_demos.py               # Stage Showcases: 15:05 Canvas & 15:15 Live Coach
├── static/
│   ├── index.html                   # Mobile-hardened app shell + Universal Pinch/Pan Lightbox + WebView-safe Media Saver
│   ├── i18n.js                      # 5-Language UI Dictionaries & Executive Portrait Compositor
│   ├── challenge1.js                # Challenge 1 Mobile UI (Selfie/Camera Modal + 2-Step Guided AI Image Studio)
│   ├── challenge2.js                # Challenge 2 Mobile UI (Live Editable R.C.T.F.C. Prompt Studio + 3-Slide Deck)
│   ├── challenge3.js                # Challenge 3 Mobile UI (Auto-Collapsing Brief + 3-Step Advisor Playbook)
│   ├── showcases.js                 # Live Presenter Submissions Wall, Spotlight Modal, Canvas & Live Coach UI
│   └── arena_app.js                 # Core Presenter Command Screen, Participant Router & /sandbox/1..3
├── tests/
│   ├── test_top5_mobile_browsers.py # Multi-engine Playwright suite (WebKit Safari/CriOS, Android Chrome/Samsung, Firefox/WebView)
│   ├── test_mobile_ux_c2_c3_regressions.py          # 66-leader even seat distribution + 390×844 Chrome CDP UX checks
│   ├── test_ux_positivity_and_selection_regressions.py # Positivity guardrails, C3 1-of-3 selection isolation & 72-seat checks
│   └── c1/test_c1_multiturn_isolation.py            # Challenge 1 multi-turn isolation & prompt-stacking refusal checks
└── evals/
    ├── eval_c2_suite.py             # Challenge 2 Automated Eval Suite
    ├── c2_eval_report.json          # Challenge 2 machine-readable evaluation report
    ├── eval_c3_suite.py             # Challenge 3 Automated Eval Suite
    └── c3_eval_report.json          # Challenge 3 machine-readable evaluation report
```

---

## 🧪 4. Running Locally & Executing Regression / Evaluation Suites

### Start the Local Server
```bash
PORT=8095 python3 server.py
```

### Key Routes
- **Presenter Big Screen (Room Bromo):** `http://localhost:8095/presenter`
- **Participant Mobile Screen (QR Target):** `http://localhost:8095/join`
- **Challenge 1 / 2 / 3 Split-Screen Sandboxes:** `http://localhost:8095/sandbox/1`, `/sandbox/2`, `/sandbox/3`

### Run Mobile UX & Functional Regression Suites
```bash
# Top-5 Mobile Browser Multi-Engine Suite (iOS Safari, CriOS, Narrow Android Chrome, Samsung 110%, WhatsApp/WeChat/Firefox WebView)
python3 tests/test_top5_mobile_browsers.py

# 72-Seat Distribution + 390x844 Mobile Geometry + Positivity + C1/C3 Isolation Suites
python3 tests/test_ux_positivity_and_selection_regressions.py
python3 tests/test_mobile_ux_c2_c3_regressions.py
python3 tests/c1/test_c1_multiturn_isolation.py
```

### Run End-to-End LLM Evaluations
```bash
python3 evals/eval_c2_suite.py
python3 evals/eval_c3_suite.py
```

---

## ☁️ 5. Deploying to Cloud Run

```bash
gcloud auth login
./deploy.sh argolis-sandbox-main
```
