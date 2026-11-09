"""Stage Demo Sessions Backend (15:05 - 15:30):
- Demo Session 1 (15:05 - 15:15 | 10 min): Canvas to ideate to your team
  (Canvas to explore conceptual ideas into actual realisation)
- Demo Session 2 (15:15 - 15:30 | 15 min): Live coaching — The Public Speaker
  (Using multimodal AI as your personal executive coach)
"""

import json


CANVAS_BLUEPRINTS = {
    "mdrt_sprint": {
        "title": "PRUMDA 90-Day 'Road to MDRT' Agency Sprint & AI Co-Pilot Playbook",
        "subtitle": "Co-Created Live in Gemini Canvas • Ready for Malaysia Agency Rollout",
        "executiveSummary": "A structured 12-week transformation program equipping PRUMDA agency leaders and rookies with daily AI-powered morning huddles, HNW pre-pitch dossiers, and automated follow-up workflows.",
        "kpis": [
            {"metric": "Weekly HNW Pre-Pitch Dossiers / Agent", "baseline": "1.5 / week", "target": "8.0 / week (5.3x)"},
            {"metric": "Proposal Turnaround Time", "baseline": "3 Days", "target": "12 Minutes"},
            {"metric": "Rookie 90-Day Case Activation Rate", "baseline": "42%", "target": "85%"},
        ],
        "phases": [
            {
                "week": "Weeks 1–4: Foundation & Personal Brand",
                "focus": "AI Executive Headshot & VIP Outreach Cadence",
                "deliverable": "Every agent upgrades their digital profile & sends 30 hyper-personalized life-stage greetings per week.",
            },
            {
                "week": "Weeks 5–8: High-Stakes SME & Legacy Pre-Pitch",
                "focus": "Gemini Dossier Synthesis + Agent Assist Sparring",
                "deliverable": "15-minute daily morning role-play against top Malaysian SME objections (FD, Property, Cashflow).",
            },
            {
                "week": "Weeks 9–12: MDRT Closing Sprint & Live Coaching",
                "focus": "Multimodal Pitch Certification & VIP Client Seminars",
                "deliverable": "Each unit hosts 1 micro-seminar using Canvas-generated invitations and decks.",
            },
        ],
        "huddleScript": "「各位夥伴早安！今天我們的 15 分鐘晨會聚焦一個核心動作：打開 Gemini 選出 3 位今年有新生兒或企業擴張的客戶，用 4 維提示詞生成專屬問候，中午 12 點前完成發送！」",
    },
    "genz_recruit": {
        "title": "PRUMDA 'Next-Gen AI Wealth Entrepreneur' Recruitment Campaign",
        "subtitle": "Conceptual Idea → Realized Interactive Recruitment Blueprint",
        "executiveSummary": "Positions PRUMDA Learning Trip not as traditional insurance sales, but as an AI-augmented Wealth & Legacy Advisory career for ambitious 23–32 year old graduates and corporate switchers.",
        "kpis": [
            {"metric": "Candidate Discovery-to-Interview Conversion", "baseline": "18%", "target": "52%"},
            {"metric": "New Recruit First-30-Day Confidence Score", "baseline": "61%", "target": "94%"},
            {"metric": "Agency Leader Onboarding Prep Time", "baseline": "6 Hours", "target": "20 Minutes"},
        ],
        "phases": [
            {
                "week": "Touchpoint 1: The 'AI Career Mirror' Booth",
                "focus": "Instant GenAI Executive Portrait at Recruitment Events",
                "deliverable": "Candidates see themselves as a Forbes/MDRT Wealth Advisor in 10 seconds with a personalized career roadmap.",
            },
            {
                "week": "Touchpoint 2: Zero-Fear AI Co-Pilot Demo",
                "focus": "Overcoming 'I don't know complex policy terms'",
                "deliverable": "Live demo showing how Gemini + Agent Assist answers any client question in 2 seconds with zero hallucination.",
            },
            {
                "week": "Touchpoint 3: 30-Day Fast-Start Bootcamp",
                "focus": "Multimodal AI Pitch Coach on Every Recruit's Phone",
                "deliverable": "New recruits practice 10 simulated pitches with Gemini Live before meeting their first real prospect.",
            },
        ],
        "huddleScript": "「加入PRUMDA Learning Trip，你不是一個人在戰鬥——從第一天起，你就擁有 Google Gemini 頂尖 AI 智囊團作為你的 24 小時隨身導師！」",
    },
}


def handle_canvas_ai(body: dict, call_vertex_fn, lang_names: dict) -> dict:
    seed_key = body.get("seedKey", "mdrt_sprint")
    refinement = (body.get("refinement") or "").strip()
    winner_name = (body.get("winnerName") or "PRUMDA Top Challenger").strip()
    winner_idea = (body.get("winnerIdea") or "").strip()
    lang = body.get("language", "zh-CN")
    lang_full = lang_names.get(lang, "Simplified Chinese (Mandarin)")

    bp = dict(CANVAS_BLUEPRINTS.get(seed_key, CANVAS_BLUEPRINTS["mdrt_sprint"]))

    prompt = (
        f"You are Gemini Canvas Co-Creator for PRUMDA Learning Trip Agency Leaders.\n"
        f"Base Blueprint: {bp['title']}\n"
        f"Inspired by participant {winner_name}'s idea: {winner_idea if winner_idea else bp['executiveSummary']}\n"
        f"Requested Live Stage Refinement: {refinement if refinement else 'Make it actionable for Malaysian Agency Leaders in Mandarin & English'}\n"
        f"Respond strictly in valid JSON with keys (in {lang_full}):\n"
        f"- \"customBanner\": A 1-line inspiring headline incorporating the refinement.\n"
        f"- \"executiveSummary\": 2-3 sentences summarizing the realized campaign/playbook.\n"
        f"- \"huddleScript\": A 2-3 sentence energizing morning huddle script for the team.\n"
        f"- \"actionChecklist\": Array of 3 concrete Monday-morning action items."
    )

    ai_text, model_used, latency_ms = call_vertex_fn(prompt)
    parsed = None
    if ai_text:
        try:
            cleaned = ai_text.strip().removeprefix("```json").removeprefix("```").removesuffix("```").strip()
            parsed = json.loads(cleaned)
        except Exception:
            parsed = None

    if parsed and isinstance(parsed, dict):
        bp["customBanner"] = parsed.get("customBanner") or f"✨ Realized for {winner_name}: {bp['title']}"
        bp["executiveSummary"] = parsed.get("executiveSummary") or bp["executiveSummary"]
        bp["huddleScript"] = parsed.get("huddleScript") or bp["huddleScript"]
        bp["actionChecklist"] = parsed.get("actionChecklist") or [
            "1. Launch 15-min Monday AI Pre-Pitch War Room across all agency units",
            "2. Upgrade 100% of unit agents' WhatsApp/LinkedIn executive portraits using GenAI Studio",
            "3. Track weekly HNW pre-pitch conversion lift on the agency leaderboard",
        ]
    else:
        bp["customBanner"] = (
            f"✨ Canvas Realization ({refinement})" if refinement else f"✨ Inspired by {winner_name} • Live Canvas Blueprint"
        )
        bp["actionChecklist"] = [
            "1. 周一晨会启动 15 分钟 AI 战前简报演练 (Launch 15-min Monday AI Pre-Pitch Huddle)",
            "2. 全员完成 AI 高管形象照与节日 VIP 问候卡升级 (Upgrade 100% Agent Executive Portraits)",
            "3. 追踪每位顾问每周高净值客户提案转化率 (Track Weekly HNW Proposal Conversion Lift)",
        ]

    bp["modelUsed"] = model_used
    bp["latencyMs"] = latency_ms
    return bp


def handle_coach_ai(body: dict, call_vertex_fn, lang_names: dict) -> dict:
    speaker_name = (body.get("speakerName") or "PRUMDA Executive Speaker").strip()
    topic = (body.get("topic") or "MDRT Agency Morning Rally").strip()
    transcript = (body.get("transcript") or "").strip()
    duration_sec = int(body.get("durationSec") or 30)
    lang = body.get("language", "zh-CN")
    lang_full = lang_names.get(lang, "Simplified Chinese (Mandarin)")

    prompt = (
        f"You are 'The Public Speaker' — a Multimodal AI Executive Speech & Presence Coach for PRUMDA Learning Trip Agency Leaders.\n"
        f"Speaker on Stage: {speaker_name}\n"
        f"Pitch Topic: {topic}\n"
        f"Duration: {duration_sec} seconds\n"
        f"Spoken Transcript: {transcript if transcript else 'Delivered an inspiring bilingual keynote rallying the PRUMDA agency team to embrace AI and protect Malaysian families.'}\n\n"
        f"Respond strictly in valid JSON with keys (text written in {lang_full}):\n"
        f"- \"presenceScore\": integer 90-99 (Eye contact, posture, executive command)\n"
        f"- \"vocalScore\": integer 89-98 (Pacing, vocal conviction, pause control)\n"
        f"- \"persuasionScore\": integer 91-99 (Emotional resonance, story hook, call-to-action)\n"
        f"- \"strengths\": Array of 2 specific observations praising their delivery & body language.\n"
        f"- \"proTip\": 1 actionable executive coaching tip to elevate from 95% to 100%.\n"
        f"- \"spokenCoachSummary\": A 2-sentence warm, energizing spoken feedback script in {lang_full} addressed directly to {speaker_name}."
    )

    ai_text, model_used, latency_ms = call_vertex_fn(prompt)
    parsed = None
    if ai_text:
        try:
            cleaned = ai_text.strip().removeprefix("```json").removeprefix("```").removesuffix("```").strip()
            parsed = json.loads(cleaned)
        except Exception:
            parsed = None

    if not parsed or not isinstance(parsed, dict) or not parsed.get("spokenCoachSummary"):
        if lang.startswith("zh"):
            parsed = {
                "presenceScore": 96,
                "vocalScore": 94,
                "persuasionScore": 97,
                "strengths": [
                    "眼神坚定且肢体语言开放自信，开场第一句话就抓住了全场代理人的注意力！",
                    "将冷冰冰的金融数据转化为守护马来西亚家庭的温度故事，极具 MDRT 领袖感染力！",
                ],
                "proTip": "在抛出核心行动号召（Call-to-Action）前停顿 1.5 秒，能进一步放大全场共鸣！",
                "spokenCoachSummary": f"{speaker_name}，您刚才的演说展现出极强的领袖气场与真诚温度！如果能在最后关键金句前稍作停顿，全场感染力将直接满分！",
            }
        else:
            parsed = {
                "presenceScore": 96,
                "vocalScore": 94,
                "persuasionScore": 97,
                "strengths": [
                    "Commanding eye contact and open executive posture—hooked the room in the first 5 seconds.",
                    "Masterful blend of emotional family protection storytelling with clear commercial urgency.",
                ],
                "proTip": "Add a deliberate 1.5-second pause right before your final Call-to-Action to let the message land with maximum gravitas.",
                "spokenCoachSummary": f"Phenomenal executive presence, {speaker_name}! Your vocal energy and conviction lit up the room—add a brief dramatic pause before your closing line and that is a 10 out of 10 keynote!",
            }

    pres = min(99, max(88, int(parsed.get("presenceScore", 96))))
    voc = min(99, max(88, int(parsed.get("vocalScore", 94))))
    pers = min(99, max(88, int(parsed.get("persuasionScore", 97))))
    overall = round((pres + voc + pers) / 3)

    return {
        "speakerName": speaker_name,
        "topic": topic,
        "presenceScore": pres,
        "vocalScore": voc,
        "persuasionScore": pers,
        "overallScore": overall,
        "strengths": parsed.get("strengths", []),
        "proTip": parsed.get("proTip", ""),
        "spokenCoachSummary": parsed.get("spokenCoachSummary", ""),
        "modelUsed": model_used,
        "latencyMs": latency_ms,
    }
