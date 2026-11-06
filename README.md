# 🇲🇾 Prudential Malaysia (PAMB) Agency Leaders AI Bootcamp Arena — 11 November

**Event:** Prudential Assurance Malaysia Berhad (PAMB) Agency AI Bootcamp  
**Date & Time:** 11 November | 13:45 – 15:30 (Hands-On Challenges & Stage Showcases)  
**Venue:** Google Singapore (Room Bromo)  
**Audience:** Exclusively PAMB Malaysia Agency Leaders (`🇲🇾`) — supporting **简体中文 (Mandarin)**, **繁體中文**, **English**, and **Bahasa Melayu**.

---

## 🧭 1. Exact Mapping to the 11 November PAMB Agenda

| Time | Duration | Agenda Session | Arena Stage / Module |
|---|---|---|---|
| **13:45 – 14:00** | 15m | **Envision the future — Overview of AI** | **Stage 0 (`LAUNCH`) & Stage 1 (`LOBBY`)**: Welcome briefing + QR Code Onboarding (`/join`) where PAMB leaders pick their Malaysian Region & preferred language (`zh-CN`, `zh-TW`, `en`, `ms`). |
| **14:00 – 14:20** | 20m | **Reinvent your professional image and customer outreach when it matters** (*The GenAI Magic: Taking your headshot and pictures to the AI era*) | **Challenge 1 (`C1`)**: Leaders take a live selfie with their phone camera (or upload a photo / pick an avatar), select an Executive Studio Style & Client Milestone, and submit their AI Executive Portrait Card + VIP Outreach to the Big Screen. |
| **14:20 – 14:35** | 15m | **Master the art of AI dialogue** (*Mastering prompting: How to get AI to do what you really want*) | **Challenge 2 (`C2`)**: Leaders contrast a generic prompt against the **4-Pillar Prompting Framework** (*Persona + Context + Task + Format/Tone*) and get scored out of 100 (`25 × 4`) live by the AI Prompt Judge. |
| **14:35 – 15:05** | 30m | **Drive faster pipeline, sharpen your strategic proposal to sales close - Pre-pitch** (*High-stakes customer meeting preparation: Using Gemini to instantly synthesize information + Leveraging Agent Assist as your strategic partner*) | **Challenge 3 (`C3`)**: Leaders use **Gemini Synthesis** on Dato' Sri Raymond Tan's multi-doc dossier (Penang manufacturer, RM 6M bank guarantee, UK/Melbourne succession gap) + co-create a grounded pitch (`Clause 4.2.a`) with **Agent Assist**. |
| **15:05 – 15:15** | 10m | **Canvas to ideate to your team** (*Canvas to explore conceptual ideas into actual realisation*) | **Stage Demo 1 (`CANVAS`)**: Live split-screen stage showcase turning a conceptual PAMB team idea (or a Leaderboard winner's submission) into a complete **90-Day MDRT Sprint Playbook**, KPI table, and Monday Morning Huddle Script. |
| **15:15 – 15:30** | 15m | **Live coaching — The Public Speaker** (*Using multimodal AI as your personal executive coach*) | **Stage Demo 2 (`COACH`) + Podium (`PODIUM`)**: A PAMB leader steps onto the stage hot-seat (`WebRTC Camera + Live Mic`) for a 60-second rally speech. Multimodal AI scores *Executive Presence*, *Vocal Pacing*, and *Storytelling Impact*, speaks feedback aloud via TTS, while participants cheer (`🔥 👏 💎 🚀`) from their phones! |

---

## 🤝 2. 3-Developer Parallel Collaboration Architecture (Zero Merge Conflicts)

This repository is modularized so **3 colleagues** can develop and test in their own **Argolis GCP projects** independently and merge cleanly via Git:

```text
pamb-ai-arena/
├── server.py                        # Core HTTP server, state sync & Vertex AI auth router
├── Dockerfile                       # Cloud Run container definition (Port 8095)
├── requirements.txt                 # Python dependencies
├── deploy.sh                        # One-command Argolis Cloud Run deployment script
├── challenges/
│   ├── c1_image_outreach.py         # 👤 COLLEAGUE 1: Challenge 1 Backend + AI Brand Judge
│   ├── c2_prompt_duel.py            # 👤 COLLEAGUE 2: Challenge 2 Backend + 4-Pillar Judge
│   ├── c3_pre_pitch.py              # 👤 COLLEAGUE 3: Challenge 3 Backend + Gemini/Agent Assist
│   └── stage_demos.py               # 🎤 LEAD / SHARED: 15:05 Canvas & 15:15 Live Coach Demos
└── static/
    ├── index.html                   # App shell
    ├── i18n.js                      # PAMB Malaysia Regions, Languages & Portrait Card Compositor
    ├── challenge1.js                # 👤 COLLEAGUE 1: Challenge 1 Mobile UI (Camera Selfie + Card)
    ├── challenge2.js                # 👤 COLLEAGUE 2: Challenge 2 Mobile UI (4-Pillar Studio)
    ├── challenge3.js                # 👤 COLLEAGUE 3: Challenge 3 Mobile UI (Dossier + Agent Assist)
    ├── showcases.js                 # 🎤 SubmissionCardRenderer + 15:05 Canvas + 15:15 Live Coach UI
    └── arena_app.js                 # Core Presenter Screen, Participant Shell & /sandbox/1..3
```

### Ownership Matrix

1. **Colleague 1 (Challenge 1 — 14:00 Image & Outreach):**
   - Edit only `challenges/c1_image_outreach.py` and `static/challenge1.js`.
   - Test at: `/sandbox/1`
2. **Colleague 2 (Challenge 2 — 14:20 Mastering Prompting):**
   - Edit only `challenges/c2_prompt_duel.py` and `static/challenge2.js`.
   - Test at: `/sandbox/2`
3. **Colleague 3 / Lead (Challenge 3 — 14:35 Pre-Pitch & Stage Demos):**
   - Edit `challenges/c3_pre_pitch.py`, `static/challenge3.js`, and `challenges/stage_demos.py` / `static/showcases.js`.
   - Test at: `/sandbox/3` and Presenter Screen `/`

---

## 🧪 3. Running Locally & Using the Split-Screen Developer Sandbox

### Start the Local Server
```bash
python3 server.py
```

### Key Routes
- **Presenter Big Screen (Room Bromo):** `http://localhost:8095/` (or `http://localhost:8095/presenter`)
- **Participant Mobile Screen (QR Target):** `http://localhost:8095/join`
- **Colleague 1 Sandbox (Challenge 1):** `http://localhost:8095/sandbox/1`
- **Colleague 2 Sandbox (Challenge 2):** `http://localhost:8095/sandbox/2`
- **Colleague 3 Sandbox (Challenge 3):** `http://localhost:8095/sandbox/3`

---

## ☁️ 4. Deploying to Your Own Argolis Cloud Run Project

Each colleague can deploy to their own Argolis project for testing:

```bash
# 1. Authenticate with your Argolis account
gcloud auth login

# 2. Deploy main service to your Argolis project
./deploy.sh <YOUR_ARGOLIS_PROJECT_ID>

# Or deploy a tagged preview URL (e.g. for c1-dev, c2-dev, c3-dev)
./deploy.sh <YOUR_ARGOLIS_PROJECT_ID> c1-dev
```

---

## 📦 5. Standardized Submission Contract (`/api/submit`)

To ensure every challenge renders automatically in the **Presenter Live Submissions Wall** and **Full-Screen Stage Spotlight Modal**, each `static/challengeN.js` submits the following JSON structure to `POST /api/submit`:

```json
{
  "id": "pamb-1730000000",
  "name": "Dato' Jason Lim",
  "region": "Kuala Lumpur / Klang Valley",
  "language": "zh-CN",
  "challenge": "1",
  "speed": 94,
  "accuracy": 97,
  "timeSec": 18,
  "criteria": {
    "Brand Presence": 97,
    "Personalization": 96
  },
  "judgeFeedback": "极具MDRT总监风范！将专业形象照与新生儿教育金问候完美结合！",
  "submission": {
    "title": "MDRT Gala Executive • Newborn Baby & Education Fund",
    "styleBadge": "💎 MDRT Gala Executive",
    "userInput": "Style: MDRT Gala Executive | Occasion: Newborn | Motto: 守护大马每个家庭",
    "aiOutput": "尊敬的陈总您好！衷心祝贺您喜添新丁...",
    "imageAfter": "data:image/jpeg;base64,...",
    "judgeFeedback": "极具MDRT总监风范！..."
  }
}
```
