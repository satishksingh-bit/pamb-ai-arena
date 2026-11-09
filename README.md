# 🇲🇾 PRUMDA Learning Trip • AI Arena — 11 November

**Event:** PRUMDA Learning Trip AI Arena  
**Date & Time:** 11 November | 13:45 – 15:30 (Hands-On Challenges & Stage Showcases)  
**Venue:** Google Singapore (Room Bromo)  
**Audience:** Visiting Malaysian Agency Leaders (`🇲🇾`) — supporting all **5 native languages**: **English (`en`)**, **简体中文 (`zh-CN`)**, **廣東話 / 粵語 (`yue` / `zh-TW`)**, **Bahasa Melayu (`ms`)**, and **தமிழ் (`ta`)**.

---

## 🤖 Standardized Vertex AI Model Stack (`locations/global`)

| Modality | Primary Model | Fallback Chain | Usage Across Arena |
| :--- | :--- | :--- | :--- |
| **Text / JSON / Vision / Judge** | **`gemini-3.5-flash-lite`** | `gemini-3.1-flash-lite` → `gemini-2.5-flash` | C1 Copy & Face Bounding-Box Detection, C2 3-Slide Structured Deck & 6-Dim Judge, C3 WhatsApp/Comparison Email & 4-Pillar Judge, Stage Canvas & Live Coach |
| **Image Generation** | **`gemini-3.1-flash-image`** | `gemini-3-pro-image` → `gemini-2.5-flash-image` | C1 Face-Locked Executive Portrait Cards, C2 16:9 Boardroom Slide Visuals, C3 Life-Event Greeting Cards |

---

## 🧭 1. Exact Mapping to the 11 November Agenda

| Time | Duration | Agenda Session | Arena Stage / Module |
| :--- | :--- | :--- | :--- |
| **13:45 – 14:00** | 15m | **Envision the future — Overview of AI** | **Stage 0 (`LAUNCH`) & Stage 1 (`LOBBY`)**: Welcome briefing + QR Code Onboarding (`/join`) with 5-language selection (`en`, `zh-CN`, `zh-TW`/`yue`, `ms`, `ta`). |
| **14:00 – 14:20** | 20m | **Reinvent your professional image and customer outreach when it matters** | **Challenge 1 (`C1`)**: Live phone selfie / upload + Face-Locked Executive Studio Portrait Card (`gemini-3.1-flash-image` + zero-overlap dynamic medallion) + localized VIP outreach message. |
| **14:20 – 14:35** | 15m | **Master the art of AI dialogue** (*R.C.T.F.C. Executive 3-Slide Deck Studio*) | **Challenge 2 (`C2`)**: **56 unique HNW Malaysian client seats** (14 archetypes × 4 personas). Leaders activate the **5 R.C.T.F.C. Pillars** + add their **Personal Strategic Angle** to generate a **strictly 3-slide** Keynote Pre-Pitch Deck (KPIs + Liquidity Gap Bar Chart + Strategy Matrix Table + `.pptx` export), scored across 6 dimensions (`/10`). |
| **14:35 – 15:05** | 30m | **Drive faster pipeline, sharpen your strategic proposal to sales close - Pre-pitch** | **Challenge 3 (`C3`)**: **56 unique Customer X life-event seats** (16 archetypes across AIA, Great Eastern, Manulife, Takaful Ikhlas, Zurich & Etiqa quotes). Leaders generate a Life-Event Greeting Card + First-Touch WhatsApp + Grounded Brochure Plan Comparison Email with their **Personal Touch**. |
| **15:05 – 15:15** | 10m | **Canvas to ideate to your team** | **Stage Demo 1 (`CANVAS`)**: Live split-screen stage showcase turning a team concept or winning submission into a **90-Day MDRT Sprint Playbook**, KPI table, and Monday Huddle Script. |
| **15:15 – 15:30** | 15m | **Live coaching — The Public Speaker** | **Stage Demo 2 (`COACH`) + Podium (`PODIUM`)**: Multimodal AI Executive Coach (`WebRTC Camera + Live Mic`) + Champions Podium. |

---

## 🗂️ 2. Repository Structure

```text
pamb-ai-arena/
├── server.py                        # Core HTTP server, atomic C2/C3 56-seat router, /api/media/ offload & Vertex AI auth
├── Dockerfile                       # Cloud Run container definition (Port 8095)
├── requirements.txt                 # Python dependencies (requests, google-auth, Pillow, pydantic, python-pptx, google-genai)
├── deploy.sh                        # One-command Cloud Run deployment script
├── challenges/
│   ├── c1_image_outreach.py         # Challenge 1 Backend: Face-Lock Portrait, Vision Box-2D & Brand Judge
│   ├── c2_prompt_duel.py            # Challenge 2 Backend: Strict 3-Slide Schemas, PPTX Export & 6-Dim Hybrid Judge
│   ├── c2_scenarios_bank.py         # Challenge 2 Bank: 56 Unique HNW Malaysian Executive Cases (14 Archetypes × 4)
│   ├── c3_pre_pitch.py              # Challenge 3 Backend: Greeting Card, Brochure Synthesis & 4-Pillar Hybrid Judge
│   ├── c3_scenarios_bank.py         # Challenge 3 Bank: 56 Unique Customer X Life-Event Cases (16 Archetypes)
│   └── stage_demos.py               # Stage Showcases: 15:05 Canvas & 15:15 Live Coach
├── static/
│   ├── index.html                   # App shell
│   ├── i18n.js                      # 5-Language UI Dictionaries & Executive Portrait Compositor
│   ├── challenge1.js                # Challenge 1 Mobile UI
│   ├── challenge2.js                # Challenge 2 Mobile UI (R.C.T.F.C. Visual Architect + Keynote 3-Slide Canvas)
│   ├── challenge3.js                # Challenge 3 Mobile UI (3-Step Advisor Playbook + Personal Touch)
│   ├── showcases.js                 # Live Presenter Submissions Wall, Spotlight Modal, Canvas & Live Coach UI
│   └── arena_app.js                 # Core Presenter Command Screen, Participant Router & /sandbox/1..3
└── evals/
    ├── eval_c2_suite.py             # Challenge 2 Automated Eval Suite (30/30 — 100% Pass)
    ├── c2_eval_report.json          # Latest Challenge 2 machine-readable evaluation report
    ├── eval_c3_suite.py             # Challenge 3 Automated Eval Suite (40/40 — 100% Pass)
    └── c3_eval_report.json          # Latest Challenge 3 machine-readable evaluation report
```

---

## 🧪 3. Running Locally & Executing Automated Evaluation Suites

### Start the Local Server
```bash
PORT=8095 python3 server.py
```

### Key Routes
- **Presenter Big Screen (Room Bromo):** `http://localhost:8095/presenter`
- **Participant Mobile Screen (QR Target):** `http://localhost:8095/join`
- **Challenge 1 Split-Screen Sandbox:** `http://localhost:8095/sandbox/1`
- **Challenge 2 Split-Screen Sandbox:** `http://localhost:8095/sandbox/2`
- **Challenge 3 Split-Screen Sandbox:** `http://localhost:8095/sandbox/3`

### Run Automated End-to-End Evaluations
```bash
# Challenge 2 Auto-Eval (30 checks across 54 seats, adversarial 3-slide invariant, 5 langs, PPTX & 4-tier Judge)
python3 evals/eval_c2_suite.py

# Challenge 3 Auto-Eval (40 checks across 54 seats, 280 locales, greeting cards, 5 langs & 4-tier Judge)
python3 evals/eval_c3_suite.py
```

---

## ☁️ 4. Deploying to Cloud Run

```bash
gcloud auth login
./deploy.sh argolis-sandbox-main
```
