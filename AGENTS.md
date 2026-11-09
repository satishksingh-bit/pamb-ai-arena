# 🇲🇾 PRUMDA Learning Trip • AI Arena — Jetski Agent Guide (`AGENTS.md`)

Welcome! You are assisting a developer working on the **11th November PRUMDA Learning Trip Arena**.

---

## 🔒 1. Strict File Ownership Boundaries (Zero Merge Conflicts)

This codebase is split into **3 isolated Challenge modules** so 3 developers can work in parallel using Jetski, test in their own **Argolis Cloud Run** projects, and merge back cleanly without conflicts:

| Role / Owner | Challenge & Session Time | ONLY Edit These 2 Files | Isolated Sandbox Route |
|---|---|---|---|
| **Colleague 1** | **Challenge 1 (14:00 – 14:20)**: *Reinvent Your Professional Image & Customer Outreach* (Camera Selfie -> Gemini Image AI Studio Headshot -> VIP Outreach) | 1. `challenges/c1_image_outreach.py`<br>2. `static/challenge1.js` | `http://localhost:8095/sandbox/1` |
| **Colleague 2** | **Challenge 2 (14:20 – 14:35)**: *Master the Art of AI Dialogue* (4-Pillar Prompting Duel: Persona + Context + Task + Format/Tone -> AI Prompt Judge) | 1. `challenges/c2_prompt_duel.py`<br>2. `static/challenge2.js` | `http://localhost:8095/sandbox/2` |
| **Satish (Lead)** | **Challenge 3 (14:35 – 15:05)**: *Drive Faster Pipeline, Sharpen Your Strategic Proposal — Pre-Pitch* (Dato' Sri Raymond Tan Dossier -> Gemini Grounded Synthesis -> Agent Assist Co-Creation) | 1. `challenges/c3_pre_pitch.py`<br>2. `static/challenge3.js` | `http://localhost:8095/sandbox/3` |

> **IMPORTANT RULE FOR COLLEAGUE 1 & COLLEAGUE 2:**
> Do **NOT** modify `server.py`, `static/arena_app.js`, `static/showcases.js`, or other challenges' files unless explicitly coordinating with Satish. Keep all backend logic inside your `challenges/cX_*.py` file and all frontend UI inside your `static/challengeX.js` file so your module can be merged into the master repository in one command.

---

## 🔌 2. How Your Challenge Plugs Into the Main Arena

### A. Backend API Hook (`challenges/cX_*.py`)
`server.py` delegates `POST /api/c1-generate`, `POST /api/c2-evaluate`, and `POST /api/c3-assist` directly to:
- **Challenge 1 (`challenges/c1_image_outreach.py`)**:
  - `handle_c1_generate(body, call_gemini_fn, call_imagen_fn, call_gemini_image_fn=None) -> (dict, int)`
  - Uses `call_gemini_image_fn(prompt, raw_image_data_url)` (`gemini-2.5-flash-image`) to transform a participant's real camera selfie into a studio-grade executive portrait while preserving facial identity, and `call_gemini_fn(prompt)` (`gemini-2.5-flash`) to generate personalized PAMB Malaysia client outreach and score the submission.
- **Challenge 2 (`challenges/c2_prompt_duel.py`)**:
  - `handle_c2_evaluate(body, call_gemini_fn) -> (dict, int)`
  - Evaluates the participant's 4-Pillar prompt (*Persona, Context, Task, Format/Tone*), generates the AI response in the participant's chosen language (`zh-CN`, `zh-TW`, `en`, `ms`), and scores each pillar out of 25 (`total` out of 100).
- **Challenge 3 (`challenges/c3_pre_pitch.py`)**:
  - `handle_c3_assist(body, call_gemini_fn) -> (dict, int)`
  - Handles multi-step Pre-Pitch synthesis (`action="synthesize"` or `action="evaluate"`) on Dato' Sri Raymond Tan's Penang HNW dossier and scores grounding (`Clause 4.2.a`), empathy, and commercial close.

### B. Frontend Component Contract (`static/challengeX.js`)
Your frontend file registers a global React component (`window.Challenge1View`, `window.Challenge2View`, or `window.Challenge3View`) receiving these props from `static/arena_app.js`:

```javascript
function ChallengeXView({
  lang,               // "zh-CN" | "zh-TW" | "en" | "ms"
  participant,        // { id, name, region, regionBadge, language }
  completed,          // boolean (true if already submitted in this session)
  scoreObj,           // previous score object if completed
  onSubmit,           // (challengeNum, scoreData, submissionCard) => Promise<void>
  onBackToMissions,   // () => void
  reportActivity,     // (statusText, agenticStep, challengeNum, logEventBool) => void
})
```

### C. Required `onSubmit(challengeNum, scoreData, submissionCard)` Schema
When the participant clicks **Submit to Big Screen**, call:
```javascript
await onSubmit(
  1, // 1, 2, or 3
  {
    speed: 94,                  // integer 0..100
    accuracy: 97,               // integer 0..100
    total: 96,                  // integer 0..100 (used for live leaderboard & combined podium)
    timeSec: 18,                // integer seconds elapsed
    criteria: {                 // key-value breakdown shown on scorecard
      "Brand Presence": 97,
      "Personalization": 96,
    },
    judgeFeedback: "One-sentence AI Judge feedback in participant's language",
  },
  {
    challengeType: "c1_image_outreach", // "c1_image_outreach" | "c2_prompt_duel" | "c3_pre_pitch"
    title: "Headline shown on the Presenter Spotlight & Scorecard",
    styleBadge: "💎 Badge label",
    userInput: "Summary of what the participant configured or prompted",
    aiOutput: "The generated outreach message, dialogue output, or proposal pitch",
    judgeFeedback: "One-sentence AI Judge feedback",
    // Challenge 1 specific fields:
    imageBefore: rawPhotoDataUrl,        // Original selfie data URL (for Before -> After comparison)
    imageAfter: executiveCardDataUrl,    // Framed executive card data URL
    rawPortraitUrl: aiStudioPortraitUrl, // Raw AI-retouched portrait URL
    portraitSvg: styleKey,               // "mdrt_keynote" | "forbes_studio" | "family_office" | "festive_vip"
    motto: mottoString,
    // Challenge 2 specific fields:
    pillarScores: { persona: 24, context: 25, task: 24, format: 24 },
  }
);
```
As soon as `onSubmit(...)` is called:
1. The **Presenter Screen (`/presenter`)** automatically transitions from the Challenge Brief to the **Round-Robin Flashing Creation Spotlight** (left) + **Live Scorecard** (right).
2. Multiple submissions automatically rotate in a live round-robin flash while updating the leaderboard in real time.

---

## 🧪 3. Local Development & Testing Commands

### Start the Local Server
```bash
PORT=8095 python3 server.py
```

### Test URLs
- **Isolated Developer Sandbox (Split-Screen Mobile + Live Big-Screen Preview):**
  - Challenge 1 Sandbox: `http://localhost:8095/sandbox/1`
  - Challenge 2 Sandbox: `http://localhost:8095/sandbox/2`
  - Challenge 3 Sandbox: `http://localhost:8095/sandbox/3`
- **Full Presenter Stage Screen:** `http://localhost:8095/presenter`
  - Includes `🧪 Sim: ON` in the top bar to test 4, 8, 16, or 24 simulated PAMB Malaysia leaders and auto-flow submissions, or click `🟢 Live Mode` to test with real phones only.
- **Participant Mobile QR Screen:** `http://localhost:8095/join`

---

## ☁️ 4. Deploying to Your Own Argolis Cloud Run

Each developer can deploy and test on their own Argolis GCP project:

```bash
# 1. Authenticate with your Argolis account
gcloud auth login

# 2. Deploy to your Argolis project
./deploy.sh <YOUR_ARGOLIS_PROJECT_ID>
```

---

## 🔄 5. Sharing Your Challenge Back to Merge

When your Challenge enhancements are tested and ready to share back with Satish:

### Option A — Export a 2-File Challenge Package (`.tar.gz`)
```bash
./export_challenge.sh 1   # For Challenge 1 (creates pamb-challenge-1-handoff.tar.gz)
./export_challenge.sh 2   # For Challenge 2 (creates pamb-challenge-2-handoff.tar.gz)
```

### Option B — Share Your Live Cloud Run URL or Git Repo
Every deployed instance exposes a read-only handoff endpoint `/handoff/export-challenge/<1|2|3>`.
You can simply share your **Cloud Run URL** or **Git repository URL** with Satish, and Satish can merge your Challenge into the master deployment with one command:
```bash
./import_challenge.sh 1 <COLLEAGUE_1_CLOUD_RUN_URL_OR_TARBALL>
./import_challenge.sh 2 <COLLEAGUE_2_CLOUD_RUN_URL_OR_TARBALL>
```
