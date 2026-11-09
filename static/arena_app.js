/* ============================================================================
   CORE ARENA APPLICATION (static/arena_app.js)
    Implements the exact PAMB 11 Nov Game-Show Flow:
   1. LOBBY      : QR Code + Elapsed Timer (00:00 ↑) + Floating Joined Names on
                   Presenter Screen. Participant phones show Briefs of C1, C2 & C3.
   2. C1_LIVE    : Starts Challenge 1. Shows C1 Brief on Presenter Screen until
                   1st submission arrives; then switches to Auto-Rotating
                   Round-Robin Flash Spotlight (Name + Score + Headshot Picture)
                   + Live C1 Scorecard on the right.
   3. C1_RESULTS : Final Score List for Challenge 1 → Button to Start Challenge 2.
   4. C2_LIVE    : Starts Challenge 2. Shows C2 Brief until 1st C2 submission
                   arrives; then Round-Robin Flash Spotlight + Live C2 Scorecard.
   5. C2_RESULTS : Shows Challenge 2 Scorers → then Combined (C1 + C2) Scorers →
                   Button to Start Challenge 3.
   6. C3_LIVE    : Starts Challenge 3. Shows C3 Brief until 1st C3 submission
                   arrives; then Round-Robin Flash Spotlight + Live C3 Scorecard.
   7. C3_RESULTS : Shows Challenge 3 Scorers ONLY + Dramatic Suspense Banner →
                   Button to Launch Final Podium with Music.
   8. PODIUM     : Dramatic Staged Top 3 Combined Winners Reveal (#3 → #2 → #1)
                   with Web Audio Victory Fanfare Music & Golden Confetti!
============================================================================ */

const { useState, useEffect, useRef } = React;

function getRouteMode() {
  const path = window.location.pathname.toLowerCase();
  const params = new URLSearchParams(window.location.search);
  if (path.startsWith("/sandbox/") || params.get("sandbox")) {
    const num = params.get("sandbox") || path.split("/sandbox/")[1]?.split("/")[0] || "1";
    return { mode: "sandbox", sandboxChallenge: ["1", "2", "3"].includes(num) ? num : "1" };
  }
  if (
    path.startsWith("/join") ||
    path.startsWith("/participate") ||
    params.get("role") === "participant"
  ) {
    return { mode: "participant", sandboxChallenge: "1" };
  }
  return { mode: "presenter", sandboxChallenge: "1" };
}

/* ============================================================================
   WEB AUDIO VICTORY FANFARE & PODIUM MUSIC SYNTHESIZER
============================================================================ */
let _podiumAudioCtx = null;
let _podiumLoopTimer = null;

function stopPodiumMusic() {
  if (_podiumLoopTimer) {
    clearInterval(_podiumLoopTimer);
    _podiumLoopTimer = null;
  }
  if (_podiumAudioCtx) {
    try {
      _podiumAudioCtx.close();
    } catch (e) {}
    _podiumAudioCtx = null;
  }
}

function playPodiumVictoryMusic() {
  stopPodiumMusic();
  try {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    _podiumAudioCtx = ctx;

    const playNote = (freq, startOffset, duration, type = "triangle", gainVal = 0.16) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, ctx.currentTime + startOffset);
      gain.gain.setValueAtTime(0.001, ctx.currentTime + startOffset);
      gain.gain.exponentialRampToValueAtTime(gainVal, ctx.currentTime + startOffset + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + startOffset + duration);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(ctx.currentTime + startOffset);
      osc.stop(ctx.currentTime + startOffset + duration + 0.05);
    };

    // Grand Olympic / Championship Brass Fanfare
    const fanfare = [
      // Drumroll / Heraldic intro
      [261.63, 0.0, 0.18, "sawtooth", 0.14],
      [261.63, 0.2, 0.18, "sawtooth", 0.14],
      [261.63, 0.4, 0.18, "sawtooth", 0.14],
      [329.63, 0.6, 0.45, "sawtooth", 0.18],
      [392.0, 1.1, 0.45, "sawtooth", 0.18],
      // Rising Triad to High C
      [261.63, 1.6, 0.2, "triangle", 0.16],
      [329.63, 1.82, 0.2, "triangle", 0.16],
      [392.0, 2.04, 0.2, "triangle", 0.18],
      [523.25, 2.28, 0.85, "sawtooth", 0.22],
      [659.25, 2.28, 0.85, "triangle", 0.14],
      // Final Grand Victory Chord
      [392.0, 3.2, 0.28, "sawtooth", 0.18],
      [523.25, 3.52, 1.6, "sawtooth", 0.24],
      [659.25, 3.52, 1.6, "triangle", 0.18],
      [783.99, 3.52, 1.6, "triangle", 0.16],
      [261.63, 3.52, 1.6, "sine", 0.25],
    ];
    fanfare.forEach(([f, s, d, t, g]) => playNote(f, s, d, t, g));

    // Celebratory background arpeggio loop after fanfare
    const loopChords = [
      [261.63, 329.63, 392.0, 523.25],
      [349.23, 440.0, 523.25, 698.46],
      [392.0, 493.88, 587.33, 783.99],
      [261.63, 329.63, 392.0, 523.25],
    ];
    let bar = 0;
    _podiumLoopTimer = setInterval(() => {
      if (!_podiumAudioCtx) return;
      const notes = loopChords[bar % loopChords.length];
      notes.forEach((n, idx) => {
        playNote(n, idx * 0.22, 0.35, "triangle", 0.08);
      });
      bar++;
    }, 1000);
  } catch (e) {}
}

/* ============================================================================
   CHALLENGE BRIEF COMPONENT (Displayed on Presenter Screen when 0 Submissions)
============================================================================ */
function ChallengeStageBriefBoard({
  challengeNum,
  participantsCount,
  participants = [],
  simulationMode = true,
  onSimulateSubmission,
}) {
  const briefs = {
    "1": {
      badge: "📸 CHALLENGE 1 LIVE (14:00 – 14:20)",
      title: "Reinvent Your Professional Image & Customer Outreach",
      subtitle: "The GenAI Magic: Taking your headshot and pictures to the AI era",
      steps: [
        {
          num: "1",
          icon: "📸",
          title: "Snap Your Selfie or Upload Photo",
          desc: "Use your phone camera to take a live headshot (or pick an executive studio avatar).",
        },
        {
          num: "2",
          icon: "💎",
          title: "Pick Studio Style & Client Occasion",
          desc: "Choose MDRT Gala, Forbes Studio, Family Office, or Festive VIP + your client milestone.",
        },
        {
          num: "3",
          icon: "🚀",
          title: "Generate & Submit to Big Screen",
          desc: "As soon as the 1st submission arrives, this screen will flash your AI Portrait & Live Score!",
        },
      ],
    },
    "2": {
      badge: "🧠 CHALLENGE 2 LIVE (14:20 – 14:35)",
      title: "Executive Pre-Pitch 3-Slide Studio (R.C.T.F.C. + Personal Angle)",
      subtitle: "Each leader receives a unique HNW Malaysian client case — apply R.C.T.F.C. logic + your Personal Strategic Angle to build a strictly 3-slide boardroom deck",
      steps: [
        {
          num: "1",
          icon: "🏛️",
          title: "Inspect Your Assigned HNW Client Case",
          desc: "56 unique executive seats across Clinic Founders, Semicon Bosses, Logistics Patriarchs, Surgeons, Tech Exits & Listed CFOs.",
        },
        {
          num: "2",
          icon: "🧭",
          title: "Activate R.C.T.F.C. + Personal Strategic Angle",
          desc: "Combine Role, Context, Task (Strictly 3 Slides), Format (KPIs, Gap Chart, Strategy Table), BNM Guardrails & your own relationship hook.",
        },
        {
          num: "3",
          icon: "🏅",
          title: "Generate 3-Slide Keynote Deck & Submit",
          desc: "Preview your 3-slide executive presentation + 16:9 visuals and lock your 6-dimension Judge score onto the Big Screen!",
        },
      ],
    },
    "3": {
      badge: "🎯 CHALLENGE 3 LIVE (14:35 – 15:05)",
      title: "Drive Faster Pipeline, Sharpen Your Strategic Proposal — Pre-Pitch",
      subtitle: "Existing Customer X Life-Event Scenario • Official Plan Match • AI Greeting Card & First-Touch Outreach",
      steps: [
        {
          num: "1",
          icon: "🎯",
          title: "Inspect Your Assigned Customer X Life Event",
          desc: "Newborn Baby, Colleague CI Heart Scare, New Home Mortgage, Career Promotion, SME RM 6M Loan, or Turning 50.",
        },
        {
          num: "2",
          icon: "🇲🇾",
          title: "Match Official Malaysia Plans",
          desc: "Select the right brochure solution (PRUAll Care, PRUMillion Med Active 2.0, PRUValue Med, PRUMy Child Plus, PRUWith You Plus, PRULady/PRUMan, PRUWealth Enrich 2.0, PRUElite Flex).",
        },
        {
          num: "3",
          icon: "🎨",
          title: "Generate Greeting Card & First-Touch Pitch",
          desc: "Create a custom AI Life-Event Greeting Card + consultative first WhatsApp pre-pitch message and submit to the Big Screen!",
        },
      ],
    },
  };

  const b = briefs[String(challengeNum)] || briefs["1"];

  return (
    <div className="bg-white border-t-4 border-t-[#ed1b2e] border-x border-b border-slate-200 rounded-3xl p-8 lg:p-10 shadow-xl space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-50 border border-red-200 text-[#ed1b2e] text-xs font-extrabold uppercase tracking-wider">
            {b.badge}
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 leading-tight">
            {b.title}
          </h2>
          <p className="text-base sm:text-xl text-slate-600 font-medium">{b.subtitle}</p>
        </div>

        <div className="bg-slate-50 border border-slate-200 rounded-2xl px-6 py-3.5 text-center shadow-sm">
          <div className="text-xs uppercase font-extrabold text-[#ed1b2e]">
            📱 Phones Unlocked
          </div>
          <div className="text-2xl font-extrabold text-slate-900 mt-0.5">
            {participantsCount} <span className="text-sm font-normal text-slate-500">Joined</span>
          </div>
        </div>
      </div>

      {/* 3 Mission Steps */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {b.steps.map((s) => (
          <div
            key={s.num}
            className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-2.5 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <span className="w-9 h-9 rounded-xl bg-[#ed1b2e] text-white font-extrabold flex items-center justify-center text-base shadow-sm">
                {s.num}
              </span>
              <span className="text-2xl">{s.icon}</span>
            </div>
            <h3 className="text-base font-extrabold text-slate-900">{s.title}</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{s.desc}</p>
          </div>
        ))}
      </div>

      {/* Live Room Phone Activity Strip (Fixed max 6 visible so screen never expands) */}
      {participants.length > 0 && (
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-2.5">
          <div className="flex items-center justify-between text-xs">
            <span className="font-extrabold uppercase tracking-wider text-[#ed1b2e] flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#ed1b2e] animate-ping" />
              📡 Live Phone Activity ({participants.length} Joined)
            </span>
            <span className="text-slate-600 font-bold">
              Switches to Live Spotlight automatically on 1st submission
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
            {participants.slice(0, 6).map((p) => (
              <div
                key={p.id}
                className="bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 flex items-center justify-between gap-2 text-xs shadow-sm"
              >
                <div className="truncate">
                  <span className="font-extrabold text-slate-900">🇲🇾 {p.name}</span>
                  <div className="text-[11px] text-[#ed1b2e] font-semibold truncate mt-0.5">
                    {p.status || `📱 Working on Challenge ${challengeNum}...`}
                  </div>
                </div>
                <span className="text-[10px] px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200 font-mono font-bold shrink-0">
                  {p.language?.toUpperCase()}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Clean Waiting Pulse Bar (No extra buttons) */}
      <div className="bg-red-50/70 border border-red-200 rounded-2xl px-5 py-3.5 flex items-center gap-3">
        <span className="w-3 h-3 rounded-full bg-[#ed1b2e] animate-ping shrink-0" />
        <span className="text-sm font-extrabold text-[#ed1b2e]">
          Waiting for 1st Submission... Once submitted, this screen automatically flashes each leader&apos;s creation &amp; live score!
        </span>
      </div>
    </div>
  );
}

/* ============================================================================
   FIXED-HEIGHT FLOATING JOINING LOBBY STAGE
   - Never expands vertically regardless of how many people join (4, 16, 24, 50+)
   - Shows at most 6 floating cards at a time in a locked stage
   - Newer joiners immediately replace older joiners at the front of the window
   - Continuously cycles ("comes and goes") when > 6 leaders have joined
   - Displays prominent Total Joined Count badge in the corner
============================================================================ */
function LobbyFloatingJoinersStage({ participants }) {
  const MAX_VISIBLE = 6;
  const [cycleOffset, setCycleOffset] = useState(0);
  const prevCountRef = useRef(participants.length);

  // Sort newest joiners first so a newly joined participant immediately pushes out the oldest visible card
  const sortedNewestFirst = [...participants].sort(
    (a, b) => (b.joinedAt || 0) - (a.joinedAt || 0)
  );

  // Whenever a new participant joins, snap cycleOffset to 0 so the newest joiner immediately enters Slot #1
  useEffect(() => {
    if (participants.length !== prevCountRef.current) {
      prevCountRef.current = participants.length;
      setCycleOffset(0);
    }
  }, [participants.length]);

  // When more than MAX_VISIBLE (6) have joined, gently float names in and out ("comes and go")
  useEffect(() => {
    if (participants.length <= MAX_VISIBLE) {
      setCycleOffset(0);
      return;
    }
    const timer = setInterval(() => {
      setCycleOffset((prev) => (prev + 1) % participants.length);
    }, 2500);
    return () => clearInterval(timer);
  }, [participants.length]);

  const visibleJoiners = [];
  if (sortedNewestFirst.length <= MAX_VISIBLE) {
    visibleJoiners.push(...sortedNewestFirst);
  } else {
    for (let i = 0; i < MAX_VISIBLE; i++) {
      const idx = (cycleOffset + i) % sortedNewestFirst.length;
      visibleJoiners.push(sortedNewestFirst[idx]);
    }
  }

  return (
    <div className="lg:col-span-7 bg-white border-t-4 border-t-[#ed1b2e] border-x border-b border-slate-200 rounded-3xl p-6 flex flex-col justify-between relative overflow-hidden shadow-xl h-[520px]">
      {/* Top Header with Total Joined Count */}
      <div className="flex items-center justify-between gap-3 z-10 border-b border-slate-200 pb-3.5 shrink-0">
        <div>
          <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900">
            ✨ Live Joining Arena — PRUMDA Learning Trip
          </h3>
          <p className="text-xs text-slate-500 font-medium">
            Newer joiners float in &amp; replace older cards • Briefs for Challenge 1, 2 &amp; 3 unlocked on phones
          </p>
        </div>

        <div className="px-4 py-2 rounded-2xl bg-[#ed1b2e] text-white font-extrabold text-base sm:text-lg shadow-md shrink-0 flex items-center gap-2">
          <span>🇲🇾</span>
          <span>{participants.length} Joined</span>
        </div>
      </div>

      {/* Fixed-Height Center Floating Stage (Max 6 cards at a time, never expands screen) */}
      {participants.length === 0 ? (
        <div className="my-auto text-center space-y-3">
          <div className="text-5xl animate-bounce">📱✨</div>
          <div className="text-xl font-extrabold text-slate-800">
            Scan the QR Code to Join the Arena
          </div>
          <p className="text-xs text-slate-500 max-w-md mx-auto">
            Select your Name &amp; Language on your phone and watch your card float onto this stage!
          </p>
        </div>
      ) : (
        <div className="my-auto grid grid-cols-1 sm:grid-cols-2 gap-3.5 z-10 py-2">
          {visibleJoiners.map((p, slotIdx) => {
            const langMeta =
              window.PAMB_LANGUAGES.find((l) => l.code === p.language) ||
              window.PAMB_LANGUAGES[0];
            const isNewestOverall =
              sortedNewestFirst[0] && sortedNewestFirst[0].id === p.id;

            return (
              <div
                key={`${p.id}-${slotIdx}`}
                style={{ animationDelay: `${(slotIdx % 3) * 0.35}s` }}
                className="animate-float-card bg-white border-l-4 border-l-[#ed1b2e] border-t border-r border-b border-slate-200 rounded-2xl px-4 py-3.5 shadow-md flex items-center justify-between gap-3 transition-all duration-500"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <span className="text-2xl shrink-0">🇲🇾</span>
                  <div className="min-w-0">
                    <div className="font-extrabold text-slate-900 text-base leading-tight truncate flex items-center gap-1.5">
                      <span className="truncate">{p.name}</span>
                      {isNewestOverall && (
                        <span className="px-2 py-0.5 rounded-full bg-[#ed1b2e] text-white text-[10px] font-extrabold shrink-0">
                          NEW
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-slate-500 font-medium truncate mt-0.5">
                      ✨ PRUMDA Learning Trip
                    </div>
                  </div>
                </div>

                <span className="px-2.5 py-1 rounded-full bg-red-50 text-[#ed1b2e] border border-red-200 text-xs font-extrabold shrink-0">
                  {langMeta.label}
                </span>
              </div>
            );
          })}
        </div>
      )}

      {/* Compact Footer Indicator */}
      <div className="z-10 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 flex items-center justify-between text-xs text-slate-600 shrink-0">
        <span className="font-medium">
          {participants.length > MAX_VISIBLE
            ? `🔄 Floating Live Stream: Showing ${MAX_VISIBLE} of ${participants.length} Joined Leaders (newer joiners replace older cards)`
            : `📖 Joined leaders are reviewing the Challenge 1, 2 & 3 briefs on their phones`}
        </span>
        <span className="text-[#ed1b2e] font-extrabold">
          Total: {participants.length}
        </span>
      </div>
    </div>
  );
}

/* ============================================================================
   ROUND-ROBIN FLASH SPOTLIGHT + LIVE SCORECARD SPLIT STAGE
   - Zero extra buttons, fixed height so the screen never distorts
============================================================================ */
function LiveRoundRobinChallengeStage({
  challengeNum,
  submissionsList,
  onSelectSubmissionModal,
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [flashAnim, setFlashAnim] = useState(false);
  const lastNewestTsRef = useRef(0);

  // Whenever a brand-new submission arrives, jump to it immediately and trigger flash!
  useEffect(() => {
    if (submissionsList.length === 0) return;
    let newestIdx = 0;
    let newestTs = 0;
    submissionsList.forEach((item, idx) => {
      const ts = item.submission?.submittedAtTs || 0;
      if (ts > newestTs) {
        newestTs = ts;
        newestIdx = idx;
      }
    });
    if (newestTs > lastNewestTsRef.current) {
      lastNewestTsRef.current = newestTs;
      setCurrentIndex(newestIdx);
      setFlashAnim(true);
      const t = setTimeout(() => setFlashAnim(false), 900);
      return () => clearTimeout(t);
    }
  }, [submissionsList]);

  // Round-robin cycling when there are 2 or more submissions
  useEffect(() => {
    if (submissionsList.length <= 1) return;
    const interval = setInterval(() => {
      setFlashAnim(true);
      setTimeout(() => setFlashAnim(false), 500);
      setCurrentIndex((prev) => (prev + 1) % submissionsList.length);
    }, 3600);
    return () => clearInterval(interval);
  }, [submissionsList.length]);

  const safeIdx = submissionsList.length > 0 ? currentIndex % submissionsList.length : 0;
  const activeItem = submissionsList[safeIdx];

  // Sort right-side scorecard by this challenge's score descending
  const sortedByScore = [...submissionsList].sort(
    (a, b) => (b.scoreObj?.total || 0) - (a.scoreObj?.total || 0)
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
      {/* LEFT 7 COLS: ROUND-ROBIN FLASHING CREATION SPOTLIGHT */}
      <div className="lg:col-span-7 flex flex-col justify-between space-y-3">
        <div className="bg-white border border-slate-200 rounded-2xl px-4 py-2.5 flex items-center justify-between shadow-sm">
          <span className="px-3 py-1 rounded-full bg-[#ed1b2e] text-white text-xs font-extrabold animate-pulse">
            🔥 LIVE SUBMISSION SPOTLIGHT ({safeIdx + 1} of {submissionsList.length})
          </span>
          <span className="text-xs text-slate-600 font-extrabold">
            {submissionsList.length > 1
              ? "🔄 Round-Robin Auto-Flash Active"
              : "✨ First Submission On Stage"}
          </span>
        </div>

        {/* Flashing Spotlight Card */}
        {activeItem && (
          <div
            className={`transition-all duration-500 transform ${
              flashAnim
                ? "scale-[1.01] ring-4 ring-[#ed1b2e]/40 shadow-2xl rounded-3xl"
                : "scale-100"
            }`}
          >
            <window.SubmissionCardRenderer
              agentName={activeItem.participant.name}
              regionBadge={activeItem.participant.regionBadge}
              language={activeItem.participant.language}
              submission={activeItem.submission}
              scoreObj={activeItem.scoreObj}
              mode="spotlight"
            />
          </div>
        )}
      </div>

      {/* RIGHT 5 COLS: PERSISTENT CHALLENGE SCORECARD (Fixed height, never stretches screen) */}
      <div className="lg:col-span-5 bg-white border-t-4 border-t-[#ed1b2e] border-x border-b border-slate-200 rounded-3xl p-5 flex flex-col justify-between shadow-xl h-[510px]">
        <div className="flex items-center justify-between border-b border-slate-200 pb-3 shrink-0">
          <div>
            <h3 className="text-lg font-extrabold text-slate-900">
              📊 Challenge {challengeNum} Live Scorecard
            </h3>
            <p className="text-xs text-slate-500 font-medium">
              Live ranking as submissions arrive
            </p>
          </div>
          <span className="px-3 py-1 rounded-full bg-red-50 text-[#ed1b2e] border border-red-200 text-xs font-extrabold">
            {sortedByScore.length} Scored
          </span>
        </div>

        <div className="space-y-2.5 overflow-y-auto pr-1 my-2 flex-1">
          {sortedByScore.map((item, rankIdx) => {
            const isCurrentlyFlashing =
              activeItem && activeItem.participant.id === item.participant.id;
            return (
              <div
                key={item.participant.id}
                onClick={() => {
                  const origIdx = submissionsList.findIndex(
                    (x) => x.participant.id === item.participant.id
                  );
                  if (origIdx >= 0) {
                    setCurrentIndex(origIdx);
                  }
                  if (onSelectSubmissionModal) {
                    onSelectSubmissionModal(item.participant, String(challengeNum));
                  }
                }}
                className={`cursor-pointer rounded-2xl border p-3 transition-all flex items-center justify-between gap-3 ${
                  isCurrentlyFlashing
                    ? "bg-red-50/70 border-2 border-[#ed1b2e] shadow-md"
                    : "bg-slate-50 border-slate-200 hover:border-[#ed1b2e]"
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div
                    className={`w-7 h-7 rounded-xl flex items-center justify-center font-extrabold text-xs shrink-0 ${
                      rankIdx === 0
                        ? "bg-[#ed1b2e] text-white"
                        : rankIdx === 1
                        ? "bg-slate-800 text-white"
                        : rankIdx === 2
                        ? "bg-amber-600 text-white"
                        : "bg-slate-200 text-slate-700"
                    }`}
                  >
                    #{rankIdx + 1}
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className="font-extrabold text-slate-900 text-sm truncate">
                        🇲🇾 {item.participant.name}
                      </span>
                      {isCurrentlyFlashing && (
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#ed1b2e] text-white font-extrabold shrink-0">
                          FLASHING
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-slate-500 truncate">
                      {item.submission?.title}
                    </div>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <div className="text-xl font-extrabold text-[#ed1b2e]">
                    {item.scoreObj?.total}{" "}
                    <span className="text-[10px] text-slate-500 font-normal">pts</span>
                  </div>
                  <div className="text-[10px] font-mono font-bold text-slate-600">
                    ⚡{item.scoreObj?.speed}% • 🎯{item.scoreObj?.accuracy}%
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* ============================================================================
   1. PRESENTER ISOLATED APP (Room Bromo Big Screen)
============================================================================ */
function PresenterIsolatedApp({ arenaState, fetchArenaState }) {
  const [c2ResultsTab, setC2ResultsTab] = useState("c2_only"); // "c2_only" | "combined_c1_c2"
  const [spotlightModal, setSpotlightModal] = useState(null); // { participant, challengeKey }
  const [podiumStep, setPodiumStep] = useState(0); // 0 -> 1 (#3 Bronze) -> 2 (#2 Silver) -> 3 (#1 Gold Champion)
  const [musicPlaying, setMusicPlaying] = useState(false);

  // Simulation Director Controls
  const simulationMode = arenaState.simulationMode !== false;
  const [simAutoFlow, setSimAutoFlow] = useState(false);
  const [simTargetJoins, setSimTargetJoins] = useState(8);
  const [simSpeedMs, setSimSpeedMs] = useState(2800);

  const phase = arenaState.phase || "LOBBY";
  const timerElapsed = arenaState.timerElapsed ?? 0;
  const participants = arenaState.participants || [];
  const joinUrl = `${window.location.origin}/join`;
  const qrImageUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&margin=8&data=${encodeURIComponent(
    joinUrl
  )}`;

  // Reset C2 results sub-tab when entering C2_RESULTS
  useEffect(() => {
    if (phase === "C2_RESULTS") {
      setC2ResultsTab("c2_only");
    }
  }, [phase]);

  // Dramatic Top 3 Podium Staged Reveal + Victory Music
  useEffect(() => {
    if (phase === "PODIUM") {
      setPodiumStep(0);
      playPodiumVictoryMusic();
      setMusicPlaying(true);
      const t1 = setTimeout(() => setPodiumStep(1), 700);
      const t2 = setTimeout(() => setPodiumStep(2), 1900);
      const t3 = setTimeout(() => setPodiumStep(3), 3200);
      return () => {
        clearTimeout(t1);
        clearTimeout(t2);
        clearTimeout(t3);
        stopPodiumMusic();
        setMusicPlaying(false);
      };
    } else {
      stopPodiumMusic();
      setMusicPlaying(false);
    }
  }, [phase]);

  const setPhase = async (newPhase) => {
    try {
      await fetch("/api/game-control", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "set_phase", phase: newPhase }),
      });
      await fetchArenaState();
    } catch (e) {}
  };

  const runSimAction = async (payload = {}) => {
    try {
      const res = await fetch("/api/simulate-step", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      await fetchArenaState();
      return data;
    } catch (e) {
      return null;
    }
  };

  const triggerSimulateStep = async () => {
    await runSimAction({ action: "auto_step" });
  };

  const toggleSimulationMode = async (enableSim) => {
    setSimAutoFlow(false);
    await runSimAction({ action: "toggle_sim_mode", enabled: enableSim });
  };

  const setSimulatedJoinCount = async (count) => {
    setSimTargetJoins(count);
    await runSimAction({ action: "set_join_count", count });
  };

  const resetToCleanLobby = async (withDemoJoined = false) => {
    setSimAutoFlow(false);
    try {
      await fetch("/api/reset", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          keepDemo: withDemoJoined,
          phase: "LOBBY",
          simulationMode,
        }),
      });
      await fetchArenaState();
    } catch (e) {}
  };

  // Auto-Flow Simulation Loop (Streams joins in LOBBY, or streams realistic phone activity + submissions in C1/C2/C3)
  useEffect(() => {
    if (!simulationMode || !simAutoFlow) return;
    const interval = setInterval(async () => {
      if (phase === "LOBBY") {
        if (participants.length < simTargetJoins) {
          await runSimAction({ action: "join_one" });
        } else {
          setSimAutoFlow(false);
        }
      } else if (phase === "C1_LIVE" || phase === "C2_LIVE" || phase === "C3_LIVE") {
        const data = await runSimAction({ action: "submit_one" });
        if (data && (data.simulated === "all_submitted" || data.remaining === 0)) {
          setSimAutoFlow(false);
        }
      } else {
        setSimAutoFlow(false);
      }
    }, phase === "LOBBY" ? 1400 : simSpeedMs);
    return () => clearInterval(interval);
  }, [simulationMode, simAutoFlow, phase, participants.length, simTargetJoins, simSpeedMs]);

  // Helper to get submissions for a specific challenge ("1", "2", or "3")
  const getChallengeSubmissions = (cKey) => {
    const list = [];
    participants.forEach((p) => {
      if (p.submissions && p.submissions[cKey]) {
        list.push({
          participant: p,
          challengeKey: cKey,
          submission: p.submissions[cKey],
          scoreObj: p.scores?.[cKey] || {
            total: p.submissions[cKey].total || 95,
            speed: 92,
            accuracy: 95,
            timeSec: p.submissions[cKey].timeSec || 20,
          },
        });
      }
    });
    // Order by submission arrival order for round-robin
    list.sort(
      (a, b) =>
        (a.submission.submittedAtTs || 0) - (b.submission.submittedAtTs || 0)
    );
    return list;
  };

  const c1Submissions = getChallengeSubmissions("1");
  const c2Submissions = getChallengeSubmissions("2");
  const c3Submissions = getChallengeSubmissions("3");

  // Rankings helpers
  const c1Ranked = [...c1Submissions].sort(
    (a, b) => (b.scoreObj?.total || 0) - (a.scoreObj?.total || 0)
  );
  const c2Ranked = [...c2Submissions].sort(
    (a, b) => (b.scoreObj?.total || 0) - (a.scoreObj?.total || 0)
  );
  const c3Ranked = [...c3Submissions].sort(
    (a, b) => (b.scoreObj?.total || 0) - (a.scoreObj?.total || 0)
  );

  // Combined C1 + C2 Leaderboard
  const combinedC1C2Ranked = participants
    .filter((p) => p.scores?.["1"] || p.scores?.["2"])
    .map((p) => {
      const s1 = p.scores?.["1"]?.total || 0;
      const s2 = p.scores?.["2"]?.total || 0;
      const combined = s1 + s2;
      return { participant: p, s1, s2, combined };
    })
    .sort((a, b) => b.combined - a.combined);

  // Final Combined C1 + C2 + C3 Leaderboard for Podium
  const finalCombinedRanked = participants
    .filter((p) => p.scores?.["1"] || p.scores?.["2"] || p.scores?.["3"])
    .map((p) => {
      const s1 = p.scores?.["1"]?.total || 0;
      const s2 = p.scores?.["2"]?.total || 0;
      const s3 = p.scores?.["3"]?.total || 0;
      const combined = s1 + s2 + s3;
      return { participant: p, s1, s2, s3, combined };
    })
    .sort((a, b) => b.combined - a.combined);

  const phaseLabels = {
    LOBBY: "STAGE 1 • JOINING ARENA",
    C1_LIVE: "STAGE 2 • CHALLENGE 1 LIVE",
    C1_RESULTS: "STAGE 3 • CHALLENGE 1 SCORES",
    C2_LIVE: "STAGE 4 • CHALLENGE 2 LIVE",
    C2_RESULTS: "STAGE 5 • CHALLENGE 2 & COMBINED",
    C3_LIVE: "STAGE 6 • CHALLENGE 3 LIVE",
    C3_RESULTS: "STAGE 7 • CHALLENGE 3 SCORES",
    PODIUM: "STAGE 8 • GRAND PODIUM",
  };

  return (
    <div className="min-h-screen bg-[#f4f6f9] text-slate-900 flex flex-col">
      {/* Floating Keyframe Styles */}
      <style>{`
        @keyframes floatCard {
          0%   { transform: translateY(0px); }
          50%  { transform: translateY(-6px); }
          100% { transform: translateY(0px); }
        }
        .animate-float-card {
          animation: floatCard 3.2s ease-in-out infinite;
        }
      `}</style>

      {/* SINGLE COMPACT TOP BAR — PRUDENTIAL EXECUTIVE WHITE & RED */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur border-t-4 border-t-[#ed1b2e] border-b border-slate-200 px-4 lg:px-8 py-2.5 shadow-sm">
        <div className="max-w-[1600px] mx-auto flex flex-wrap items-center justify-between gap-3">
          {/* Left: Brand + Active Phase Badge */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#ed1b2e] flex items-center justify-center font-extrabold text-lg text-white shadow-sm">
              🇲🇾
            </div>
            <div className="flex items-center gap-2.5">
              <span className="font-extrabold text-base sm:text-lg text-slate-900">
                PRUMDA Learning Trip
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-extrabold bg-red-50 text-[#ed1b2e] border border-red-200">
                {phaseLabels[phase] || phase}
              </span>
            </div>
          </div>

          {/* Center: Minimal Phase-Specific Sim Controls (ONLY when Sim Mode is ON and ONLY for LOBBY or LIVE phases) */}
          {simulationMode && phase === "LOBBY" && (
            <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 rounded-xl px-3 py-1">
              <span className="text-[11px] font-extrabold text-slate-700 mr-1">
                Sim Joins:
              </span>
              {[4, 8, 16, 24].map((cnt) => (
                <button
                  key={cnt}
                  onClick={() => setSimulatedJoinCount(cnt)}
                  className={`px-2 py-0.5 rounded text-xs font-extrabold border transition-all ${
                    participants.length === cnt
                      ? "bg-[#ed1b2e] text-white border-[#ed1b2e]"
                      : "bg-white text-[#ed1b2e] border-slate-300 hover:bg-red-50"
                  }`}
                >
                  {cnt}
                </button>
              ))}
              <button
                onClick={() => {
                  if (participants.length >= simTargetJoins) {
                    setSimTargetJoins(Math.min(24, participants.length + 6));
                  }
                  setSimAutoFlow((prev) => !prev);
                }}
                className={`ml-1 px-2.5 py-0.5 rounded text-xs font-extrabold border transition-all ${
                  simAutoFlow
                    ? "bg-[#ed1b2e] text-white border-[#ed1b2e] animate-pulse"
                    : "bg-white hover:bg-red-50 text-[#ed1b2e] border-[#ed1b2e]"
                }`}
              >
                {simAutoFlow ? "⏸ Pause" : "🌊 Stream"}
              </button>
            </div>
          )}

          {simulationMode &&
            (phase === "C1_LIVE" || phase === "C2_LIVE" || phase === "C3_LIVE") && (
              <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 rounded-xl px-3 py-1">
                <button
                  onClick={() => {
                    runSimAction({ action: "activity_tick" });
                    setSimAutoFlow((prev) => !prev);
                  }}
                  className={`px-2.5 py-0.5 rounded text-xs font-extrabold border transition-all ${
                    simAutoFlow
                      ? "bg-[#ed1b2e] text-white border-[#ed1b2e] animate-pulse"
                      : "bg-white hover:bg-red-50 text-[#ed1b2e] border-[#ed1b2e]"
                  }`}
                >
                  {simAutoFlow ? "⏸ Pause Sim" : "▶️ Auto-Sim"}
                </button>
                <button
                  onClick={() => runSimAction({ action: "submit_one" })}
                  className="px-2.5 py-0.5 rounded bg-[#ed1b2e] hover:bg-[#c8102e] text-white text-xs font-extrabold"
                >
                  +1 Submit
                </button>
              </div>
            )}

          {/* Right: Elapsed Timer + Sim Mode Toggle + Reset */}
          <div className="flex items-center gap-2">
            <div className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-1 flex items-center gap-1.5">
              <span className="text-[11px] font-bold text-slate-500">⏱️</span>
              <span className="text-sm font-mono font-extrabold text-[#ed1b2e]">
                {window.formatMMSS(timerElapsed)}
              </span>
            </div>

            <button
              onClick={() => toggleSimulationMode(!simulationMode)}
              className={`px-2.5 py-1 rounded-xl text-xs font-extrabold border-2 transition-all ${
                simulationMode
                  ? "bg-white hover:bg-red-50 text-[#ed1b2e] border-[#ed1b2e]"
                  : "bg-[#ed1b2e] text-white border-[#ed1b2e]"
              }`}
            >
              {simulationMode ? "🧪 Sim: ON" : "🟢 Live Mode"}
            </button>

            <button
              onClick={() => resetToCleanLobby(false)}
              className="px-3 py-1 rounded-xl bg-white hover:bg-red-50 text-[#ed1b2e] border-2 border-[#ed1b2e] text-xs font-extrabold transition-all"
            >
              🔄 Reset
            </button>
          </div>
        </div>
      </header>

      {/* MAIN STAGE BODY — LOCKED CLEAN VIEWPORT */}
      <main className="flex-1 max-w-[1600px] w-full mx-auto px-4 lg:px-8 py-4 space-y-4">
        {/* ====================================================================
            1. LOBBY: QR CODE + ELAPSED TIMER + FIXED-HEIGHT FLOATING NAMES
           ==================================================================== */}
        {phase === "LOBBY" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
            {/* Left 5 Cols: QR Code + Elapsed Timer + Start Challenge 1 Button */}
            <div className="lg:col-span-5 bg-white border-t-4 border-t-[#ed1b2e] border-x border-b border-slate-200 rounded-3xl p-6 text-center flex flex-col justify-between shadow-xl h-[520px]">
              <div className="space-y-1.5">
                <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded-full bg-red-50 border border-red-200 text-[#ed1b2e] text-xs font-extrabold">
                  📡 SCAN QR TO JOIN
                </div>
                <h2 className="text-2xl font-extrabold text-slate-900">
                  Select Your Language &amp; Name
                </h2>
                <p className="text-xs text-slate-500 font-semibold">
                  English • 华语 • 廣東話 • Bahasa Melayu • தமிழ்
                </p>
              </div>

              <div className="space-y-2">
                <img
                  src={qrImageUrl}
                  alt="Scan to join PRUMDA Learning Trip"
                  title="Tap to zoom"
                  data-zoomable="true"
                  className="w-52 h-52 mx-auto rounded-2xl border-4 border-[#ed1b2e]/20 shadow-lg bg-white p-1 cursor-zoom-in"
                />
                <div className="text-xs font-mono font-extrabold text-[#ed1b2e] break-all">
                  {joinUrl}
                </div>
              </div>

              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-3">
                <div className="flex items-center justify-between px-1">
                  <span className="text-xs font-extrabold uppercase text-slate-500">
                    ⏱️ Lobby Elapsed Time:
                  </span>
                  <span className="text-2xl font-mono font-extrabold text-[#ed1b2e]">
                    {window.formatMMSS(timerElapsed)}
                  </span>
                </div>

                <button
                  onClick={() => setPhase("C1_LIVE")}
                  className="w-full py-3.5 rounded-2xl bg-[#ed1b2e] hover:bg-[#c8102e] text-white font-extrabold text-base shadow-lg transition-all"
                >
                  🚀 Start Challenge 1 →
                </button>
              </div>
            </div>

            {/* Right 7 Cols: Fixed-Height Floating Names Stage (Newer Replaces Older + Total Count) */}
            <LobbyFloatingJoinersStage participants={participants} />
          </div>
        )}

        {/* ====================================================================
            2. CHALLENGE 1 LIVE (C1_LIVE)
           ==================================================================== */}
        {phase === "C1_LIVE" && (
          <div className="space-y-4">
            <div className="bg-white border-l-4 border-l-[#ed1b2e] border-t border-r border-b border-slate-200 rounded-2xl px-5 py-3.5 flex flex-wrap items-center justify-between gap-4 shadow-md">
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 rounded-full bg-[#ed1b2e] text-white font-extrabold text-xs">
                  📸 CHALLENGE 1
                </span>
                <span className="font-extrabold text-slate-900 text-base sm:text-lg">
                  Reinvent Your Professional Image &amp; Customer Outreach
                </span>
              </div>

              <div className="flex items-center gap-4">
                <span className="text-xs text-slate-600 font-bold">
                  Submitted: <strong className="text-[#ed1b2e] text-base">{c1Submissions.length}</strong> / {participants.length}
                </span>
                <button
                  onClick={() => setPhase("C1_RESULTS")}
                  className="px-5 py-2 rounded-xl bg-[#ed1b2e] hover:bg-[#c8102e] text-white font-extrabold text-xs sm:text-sm shadow-md transition-all"
                >
                  🏁 Finish Challenge 1 →
                </button>
              </div>
            </div>

            {c1Submissions.length === 0 ? (
              <ChallengeStageBriefBoard
                challengeNum="1"
                participantsCount={participants.length}
                participants={participants}
              />
            ) : (
              <LiveRoundRobinChallengeStage
                challengeNum="1"
                submissionsList={c1Submissions}
                onSelectSubmissionModal={(p, ck) =>
                  setSpotlightModal({ participant: p, challengeKey: ck })
                }
              />
            )}
          </div>
        )}

        {/* ====================================================================
            3. CHALLENGE 1 FINAL SCOREBOARD (C1_RESULTS)
           ==================================================================== */}
        {phase === "C1_RESULTS" && (
          <div className="bg-white border-t-4 border-t-[#ed1b2e] border-x border-b border-slate-200 rounded-3xl p-6 space-y-5 shadow-xl">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 pb-4">
              <div>
                <div className="text-xs font-extrabold uppercase text-[#ed1b2e]">
                  🏁 CHALLENGE 1 COMPLETE
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                  📸 Challenge 1 Final Scorers
                </h2>
              </div>

              <button
                onClick={() => setPhase("C2_LIVE")}
                className="px-6 py-3 rounded-2xl bg-[#ed1b2e] hover:bg-[#c8102e] text-white font-extrabold text-sm sm:text-base shadow-lg transition-all"
              >
                🚀 Start Challenge 2 →
              </button>
            </div>

            {c1Ranked.length === 0 ? (
              <div className="text-center py-12 text-slate-400">
                No Challenge 1 submissions recorded yet.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 max-h-[440px] overflow-y-auto pr-1">
                {c1Ranked.map((item, idx) => (
                  <div
                    key={item.participant.id}
                    onClick={() =>
                      setSpotlightModal({
                        participant: item.participant,
                        challengeKey: "1",
                      })
                    }
                    className={`cursor-pointer rounded-2xl border p-3.5 flex items-center justify-between gap-4 transition-all ${
                      idx === 0
                        ? "bg-red-50/60 border-2 border-[#ed1b2e] shadow-sm"
                        : "bg-slate-50 border-slate-200 hover:border-[#ed1b2e]"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-9 h-9 rounded-xl flex items-center justify-center font-extrabold text-sm ${
                          idx === 0
                            ? "bg-[#ed1b2e] text-white"
                            : idx === 1
                            ? "bg-slate-800 text-white"
                            : idx === 2
                            ? "bg-amber-600 text-white"
                            : "bg-slate-200 text-slate-700"
                        }`}
                      >
                        #{idx + 1}
                      </div>
                      <div>
                        <div className="font-extrabold text-slate-900 text-base">
                          🇲🇾 {item.participant.name}
                        </div>
                        <div className="text-xs text-slate-500 font-medium">
                          {item.submission?.styleBadge || "✨ PRUMDA Learning Trip"}
                        </div>
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="text-2xl font-extrabold text-[#ed1b2e]">
                        {item.scoreObj?.total}{" "}
                        <span className="text-xs text-slate-500 font-normal">pts</span>
                      </div>
                      <div className="text-xs font-mono font-bold text-slate-600">
                        ⚡ {item.scoreObj?.speed}% • 🎯 {item.scoreObj?.accuracy}%
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ====================================================================
            4. CHALLENGE 2 LIVE (C2_LIVE)
           ==================================================================== */}
        {phase === "C2_LIVE" && (
          <div className="space-y-4">
            <div className="bg-white border-l-4 border-l-[#ed1b2e] border-t border-r border-b border-slate-200 rounded-2xl px-5 py-3.5 flex flex-wrap items-center justify-between gap-4 shadow-md">
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 rounded-full bg-[#ed1b2e] text-white font-extrabold text-xs">
                  🧠 CHALLENGE 2
                </span>
                <span className="font-extrabold text-slate-900 text-base sm:text-lg">
                  Deck Challenge: Simple → Enhanced Presentation (R.C.T.F.C. Prompt Duel)
                </span>
              </div>

              <div className="flex items-center gap-4">
                <span className="text-xs text-slate-600 font-bold">
                  Submitted: <strong className="text-[#ed1b2e] text-base">{c2Submissions.length}</strong> / {participants.length}
                </span>
                <button
                  onClick={() => setPhase("C2_RESULTS")}
                  className="px-5 py-2 rounded-xl bg-[#ed1b2e] hover:bg-[#c8102e] text-white font-extrabold text-xs sm:text-sm shadow-md transition-all"
                >
                  🏁 Finish Challenge 2 →
                </button>
              </div>
            </div>

            {c2Submissions.length === 0 ? (
              <ChallengeStageBriefBoard
                challengeNum="2"
                participantsCount={participants.length}
                participants={participants}
              />
            ) : (
              <LiveRoundRobinChallengeStage
                challengeNum="2"
                submissionsList={c2Submissions}
                onSelectSubmissionModal={(p, ck) =>
                  setSpotlightModal({ participant: p, challengeKey: ck })
                }
              />
            )}
          </div>
        )}

        {/* ====================================================================
            5. CHALLENGE 2 SCORERS -> COMBINED (C1 + C2) SCORERS (C2_RESULTS)
               Strictly one primary forward CTA at each step
           ==================================================================== */}
        {phase === "C2_RESULTS" && (
          <div className="bg-white border-t-4 border-t-[#ed1b2e] border-x border-b border-slate-200 rounded-3xl p-6 space-y-5 shadow-xl">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 pb-4">
              <div>
                <div className="text-xs font-extrabold uppercase text-[#ed1b2e]">
                  🏁 CHALLENGE 2 COMPLETE
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                  {c2ResultsTab === "c2_only"
                    ? "🧠 Challenge 2 Scorers (3-Slide Deck Challenge)"
                    : "🔥 Combined Leaderboard (Challenge 1 + Challenge 2)"}
                </h2>
              </div>

              {c2ResultsTab === "c2_only" ? (
                <button
                  onClick={() => setC2ResultsTab("combined_c1_c2")}
                  className="px-6 py-3 rounded-2xl bg-white hover:bg-red-50 text-[#ed1b2e] border-2 border-[#ed1b2e] font-extrabold text-sm sm:text-base shadow-md transition-all"
                >
                  🔥 Show Combined (C1 + C2) Leaderboard →
                </button>
              ) : (
                <button
                  onClick={() => setPhase("C3_LIVE")}
                  className="px-6 py-3 rounded-2xl bg-[#ed1b2e] hover:bg-[#c8102e] text-white font-extrabold text-sm sm:text-base shadow-lg transition-all"
                >
                  🚀 Start Challenge 3 →
                </button>
              )}
            </div>

            {c2ResultsTab === "c2_only" ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 max-h-[440px] overflow-y-auto pr-1">
                {c2Ranked.map((item, idx) => (
                  <div
                    key={item.participant.id}
                    onClick={() =>
                      setSpotlightModal({
                        participant: item.participant,
                        challengeKey: "2",
                      })
                    }
                    className={`cursor-pointer rounded-2xl border p-3.5 flex items-center justify-between gap-4 transition-all ${
                      idx === 0
                        ? "bg-red-50/60 border-2 border-[#ed1b2e] shadow-sm"
                        : "bg-slate-50 border-slate-200 hover:border-[#ed1b2e]"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-9 h-9 rounded-xl flex items-center justify-center font-extrabold text-sm ${
                          idx === 0
                            ? "bg-[#ed1b2e] text-white"
                            : idx === 1
                            ? "bg-slate-800 text-white"
                            : idx === 2
                            ? "bg-amber-600 text-white"
                            : "bg-slate-200 text-slate-700"
                        }`}
                      >
                        #{idx + 1}
                      </div>
                      <div>
                        <div className="font-extrabold text-slate-900 text-base">
                          🇲🇾 {item.participant.name}
                        </div>
                        <div className="text-xs text-slate-500 font-medium">
                          {item.submission?.title || "✨ PRUMDA Learning Trip"}
                        </div>
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="text-2xl font-extrabold text-[#ed1b2e]">
                        {item.scoreObj?.total}{" "}
                        <span className="text-xs text-slate-500 font-normal">pts</span>
                      </div>
                      <div className="text-xs font-mono font-bold text-slate-600">
                        ⚡ {item.scoreObj?.speed}% • 🎯 {item.scoreObj?.accuracy}%
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 max-h-[440px] overflow-y-auto pr-1">
                {combinedC1C2Ranked.map((row, idx) => (
                  <div
                    key={row.participant.id}
                    className={`rounded-2xl border p-3.5 flex items-center justify-between gap-4 ${
                      idx === 0
                        ? "bg-red-50/60 border-2 border-[#ed1b2e] shadow-sm"
                        : "bg-slate-50 border-slate-200"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-9 h-9 rounded-xl flex items-center justify-center font-extrabold text-sm ${
                          idx === 0
                            ? "bg-[#ed1b2e] text-white"
                            : idx === 1
                            ? "bg-slate-800 text-white"
                            : idx === 2
                            ? "bg-amber-600 text-white"
                            : "bg-slate-200 text-slate-700"
                        }`}
                      >
                        #{idx + 1}
                      </div>
                      <div>
                        <div className="font-extrabold text-slate-900 text-base">
                          🇲🇾 {row.participant.name}
                        </div>
                        <div className="text-xs text-slate-500 font-mono font-semibold">
                          📸 C1: {row.s1} • 🧠 C2: {row.s2}
                        </div>
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="text-2xl font-extrabold text-[#ed1b2e]">
                        {row.combined}{" "}
                        <span className="text-xs text-slate-500 font-normal">pts</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ====================================================================
            6. CHALLENGE 3 LIVE (C3_LIVE)
           ==================================================================== */}
        {phase === "C3_LIVE" && (
          <div className="space-y-4">
            <div className="bg-white border-l-4 border-l-[#ed1b2e] border-t border-r border-b border-slate-200 rounded-2xl px-5 py-3.5 flex flex-wrap items-center justify-between gap-4 shadow-md">
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 rounded-full bg-[#ed1b2e] text-white font-extrabold text-xs">
                  🎯 CHALLENGE 3
                </span>
                <span className="font-extrabold text-slate-900 text-base sm:text-lg">
                  Drive Faster Pipeline, Sharpen Strategic Proposal — Pre-Pitch &amp; Agent Assist
                </span>
              </div>

              <div className="flex items-center gap-4">
                <span className="text-xs text-slate-600 font-bold">
                  Submitted: <strong className="text-[#ed1b2e] text-base">{c3Submissions.length}</strong> / {participants.length}
                </span>
                <button
                  onClick={() => setPhase("C3_RESULTS")}
                  className="px-5 py-2 rounded-xl bg-[#ed1b2e] hover:bg-[#c8102e] text-white font-extrabold text-xs sm:text-sm shadow-md transition-all"
                >
                  🏁 Finish Challenge 3 →
                </button>
              </div>
            </div>

            {c3Submissions.length === 0 ? (
              <ChallengeStageBriefBoard
                challengeNum="3"
                participantsCount={participants.length}
                participants={participants}
              />
            ) : (
              <LiveRoundRobinChallengeStage
                challengeNum="3"
                submissionsList={c3Submissions}
                onSelectSubmissionModal={(p, ck) =>
                  setSpotlightModal({ participant: p, challengeKey: ck })
                }
              />
            )}
          </div>
        )}

        {/* ====================================================================
            7. CHALLENGE 3 SCORERS ONLY -> REVEAL PODIUM (C3_RESULTS)
           ==================================================================== */}
        {phase === "C3_RESULTS" && (
          <div className="bg-white border-t-4 border-t-[#ed1b2e] border-x border-b border-slate-200 rounded-3xl p-6 space-y-5 shadow-xl">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 pb-4">
              <div>
                <div className="text-xs font-extrabold uppercase text-[#ed1b2e]">
                  🏁 CHALLENGE 3 COMPLETE • CHALLENGE 3 SCORERS ONLY
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                  🎯 Challenge 3 Scorers (Pre-Pitch &amp; Agent Assist)
                </h2>
              </div>

              <button
                onClick={() => setPhase("PODIUM")}
                className="px-6 py-3.5 rounded-2xl bg-[#ed1b2e] hover:bg-[#c8102e] text-white font-extrabold text-sm sm:text-base shadow-xl hover:scale-[1.02] transition-all"
              >
                🎵🏆 Reveal Final Top 3 Podium →
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 max-h-[440px] overflow-y-auto pr-1">
              {c3Ranked.map((item, idx) => (
                <div
                  key={item.participant.id}
                  onClick={() =>
                    setSpotlightModal({
                      participant: item.participant,
                      challengeKey: "3",
                    })
                  }
                  className={`cursor-pointer rounded-2xl border p-3.5 flex items-center justify-between gap-4 transition-all ${
                    idx === 0
                      ? "bg-red-50/60 border-2 border-[#ed1b2e] shadow-sm"
                      : "bg-slate-50 border-slate-200 hover:border-[#ed1b2e]"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-9 h-9 rounded-xl flex items-center justify-center font-extrabold text-sm ${
                        idx === 0
                          ? "bg-[#ed1b2e] text-white"
                          : idx === 1
                          ? "bg-slate-800 text-white"
                          : idx === 2
                          ? "bg-amber-600 text-white"
                          : "bg-slate-200 text-slate-700"
                      }`}
                    >
                      #{idx + 1}
                    </div>
                    <div>
                      <div className="font-extrabold text-slate-900 text-base">
                        🇲🇾 {item.participant.name}
                      </div>
                      <div className="text-xs text-slate-500 font-medium">
                        {item.submission?.styleBadge || item.submission?.title || "✨ PRUMDA Learning Trip"}
                      </div>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-2xl font-extrabold text-[#ed1b2e]">
                      {item.scoreObj?.total}{" "}
                      <span className="text-xs text-slate-500 font-normal">pts</span>
                    </div>
                    <div className="text-xs font-mono font-bold text-slate-600">
                      ⚡ {item.scoreObj?.speed}% • 🎯 {item.scoreObj?.accuracy}%
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ====================================================================
            8. DRAMATIC TOP 3 COMBINED PODIUM WITH MUSIC (PODIUM)
           ==================================================================== */}
        {phase === "PODIUM" && (
          <div className="bg-white border-t-4 border-t-[#ed1b2e] border-x border-b border-slate-200 rounded-3xl p-8 text-center space-y-6 shadow-2xl">
            <div className="space-y-1">
              <div className="text-xs font-extrabold uppercase tracking-widest text-[#ed1b2e]">
                🏆 PRUMDA LEARNING TRIP • COMBINED TOP 3 PODIUM
              </div>
              <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900">
                🎉 Congratulations, PRUMDA Learning Trip Champions! 🎉
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 font-medium">
                Combined Score across Challenge 1 + Challenge 2 + Challenge 3 (Max 300 pts)
              </p>
            </div>

            {/* PODIUM STAGE: #2 Silver (Left), #1 Gold (Center Elevated), #3 Bronze (Right) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto pt-4 items-end">
              {/* #2 SILVER RUNNER-UP */}
              {finalCombinedRanked[1] && (
                <div
                  className={`transition-all duration-700 transform ${
                    podiumStep >= 2
                      ? "opacity-100 translate-y-0 scale-100"
                      : "opacity-0 translate-y-12 scale-90"
                  } rounded-3xl border-2 border-slate-300 bg-slate-50 p-6 space-y-2.5 shadow-lg`}
                >
                  <div className="text-4xl">🥈</div>
                  <div className="text-xs font-extrabold uppercase tracking-wider text-slate-600">
                    #2 RUNNER-UP
                  </div>
                  <div className="text-2xl font-extrabold text-slate-900">
                    🇲🇾 {finalCombinedRanked[1].participant.name}
                  </div>
                  <div className="text-4xl font-extrabold text-slate-900">
                    {finalCombinedRanked[1].combined}{" "}
                    <span className="text-xs text-slate-500 font-normal">pts</span>
                  </div>
                  <div className="text-xs font-mono font-bold text-slate-600">
                    C1: {finalCombinedRanked[1].s1} • C2: {finalCombinedRanked[1].s2} • C3:{" "}
                    {finalCombinedRanked[1].s3}
                  </div>
                </div>
              )}

              {/* #1 GOLD GRAND CHAMPION (CENTER) */}
              {finalCombinedRanked[0] && (
                <div
                  className={`transition-all duration-1000 transform ${
                    podiumStep >= 3
                      ? "opacity-100 md:-translate-y-4 scale-105"
                      : "opacity-0 translate-y-16 scale-75"
                  } rounded-3xl border-4 border-[#ed1b2e] bg-gradient-to-b from-red-50/90 via-white to-white p-7 space-y-3 shadow-[0_20px_50px_rgba(237,27,46,0.22)]`}
                >
                  <div className="text-5xl animate-bounce">👑🥇</div>
                  <div className="px-3.5 py-1 rounded-full bg-[#ed1b2e] text-white font-extrabold text-xs inline-block shadow-sm">
                    #1 GRAND CHAMPION • PRUMDA LEARNING TRIP
                  </div>
                  <div className="text-3xl font-extrabold text-slate-900">
                    🇲🇾 {finalCombinedRanked[0].participant.name}
                  </div>
                  <div className="text-5xl font-extrabold text-[#ed1b2e]">
                    {finalCombinedRanked[0].combined}{" "}
                    <span className="text-sm text-slate-500 font-normal">pts</span>
                  </div>
                  <div className="text-xs font-mono font-bold text-slate-700">
                    📸 C1: {finalCombinedRanked[0].s1} • 🧠 C2: {finalCombinedRanked[0].s2} • 🎯 C3:{" "}
                    {finalCombinedRanked[0].s3}
                  </div>
                </div>
              )}

              {/* #3 BRONZE FINALIST */}
              {finalCombinedRanked[2] && (
                <div
                  className={`transition-all duration-700 transform ${
                    podiumStep >= 1
                      ? "opacity-100 translate-y-0 scale-100"
                      : "opacity-0 translate-y-12 scale-90"
                  } rounded-3xl border-2 border-amber-300 bg-amber-50/40 p-6 space-y-2.5 shadow-lg`}
                >
                  <div className="text-4xl">🥉</div>
                  <div className="text-xs font-extrabold uppercase tracking-wider text-amber-800">
                    #3 THIRD PLACE
                  </div>
                  <div className="text-2xl font-extrabold text-slate-900">
                    🇲🇾 {finalCombinedRanked[2].participant.name}
                  </div>
                  <div className="text-4xl font-extrabold text-[#ed1b2e]">
                    {finalCombinedRanked[2].combined}{" "}
                    <span className="text-xs text-slate-500 font-normal">pts</span>
                  </div>
                  <div className="text-xs font-mono font-bold text-slate-600">
                    C1: {finalCombinedRanked[2].s1} • C2: {finalCombinedRanked[2].s2} • C3:{" "}
                    {finalCombinedRanked[2].s3}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </main>

      {/* ======================================================================
          FULL-SCREEN STAGE SPOTLIGHT MODAL (Inspect Any Submission)
         ====================================================================== */}
      {spotlightModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white border-2 border-[#ed1b2e] rounded-3xl max-w-4xl w-full p-6 space-y-4 shadow-2xl my-auto">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 pb-3">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-[#ed1b2e] text-white font-extrabold text-xs">
                  🔍 SUBMISSION SPOTLIGHT
                </span>
                <span className="font-extrabold text-slate-900 text-lg">
                  🇲🇾 {spotlightModal.participant.name}
                </span>
              </div>

              <div className="flex items-center gap-2">
                {["1", "2", "3"].map((ck) => {
                  const hasSub = Boolean(spotlightModal.participant.submissions?.[ck]);
                  return (
                    <button
                      key={ck}
                      disabled={!hasSub}
                      onClick={() =>
                        setSpotlightModal({
                          participant: spotlightModal.participant,
                          challengeKey: ck,
                        })
                      }
                      className={`px-3 py-1.5 rounded-xl text-xs font-extrabold border-2 transition-all ${
                        spotlightModal.challengeKey === ck
                          ? "bg-[#ed1b2e] text-white border-[#ed1b2e]"
                          : hasSub
                          ? "bg-white hover:bg-red-50 text-[#ed1b2e] border-[#ed1b2e]"
                          : "bg-slate-100 text-slate-400 border-slate-200 opacity-60"
                      }`}
                    >
                      Challenge {ck}
                    </button>
                  );
                })}

                <button
                  onClick={() => setSpotlightModal(null)}
                  className="px-3.5 py-1.5 rounded-xl bg-white hover:bg-red-50 text-[#ed1b2e] border-2 border-[#ed1b2e] font-extrabold text-xs transition-all"
                >
                  ✕ Close
                </button>
              </div>
            </div>

            <window.SubmissionCardRenderer
              agentName={spotlightModal.participant.name}
              regionBadge={spotlightModal.participant.regionBadge}
              language={spotlightModal.participant.language}
              submission={
                spotlightModal.participant.submissions?.[spotlightModal.challengeKey]
              }
              scoreObj={spotlightModal.participant.scores?.[spotlightModal.challengeKey]}
              mode="spotlight"
            />
          </div>
        </div>
      )}
    </div>
  );
}

/* ============================================================================
   2. PARTICIPANT MOBILE EXPERIENCE (/join)
   - Before Presenter clicks Start: Shows Brief of Challenge 1, 2 & 3
   - When Presenter clicks Start C1 / C2 / C3: Unlocks that Challenge!
============================================================================ */
function ParticipantIsolatedApp({ arenaState, fetchArenaState }) {
  const [agentId] = useState(() => {
    const saved = localStorage.getItem("pamb_agent_id_v1");
    if (saved) return saved;
    const fresh = `pamb-${Date.now()}-${Math.floor(Math.random() * 900 + 100)}`;
    localStorage.setItem("pamb_agent_id_v1", fresh);
    return fresh;
  });

  const [agentName, setAgentName] = useState(
    () => localStorage.getItem("pamb_agent_name_v1") || ""
  );
  const [agentRegion] = useState("");
  const [lang, setLang] = useState(
    () => localStorage.getItem("pamb_agent_lang_v1") || "zh-CN"
  );
  const [registered, setRegistered] = useState(
    () => localStorage.getItem("pamb_agent_registered_v1") === "true"
  );
  const [activeTab, setActiveTab] = useState("1"); // "1" | "2" | "3" | "card"

  const t = window.PAMB_I18N[lang] || window.PAMB_I18N["zh-CN"];
  const phase = arenaState.phase || "LOBBY";
  const myRecord =
    (arenaState.participants || []).find((p) => p.id === agentId) || null;

  // Stage-gated locks: Participants cannot enter Challenge 2 or Challenge 3 until Presenter starts that challenge
  const c2Unlocked = ["C2_LIVE", "C2_RESULTS", "C3_LIVE", "C3_RESULTS", "PODIUM"].includes(phase);
  const c3Unlocked = ["C3_LIVE", "C3_RESULTS", "PODIUM"].includes(phase);

  // Automatically reset phone back to the Join screen whenever Presenter clicks "Reset Game"
  useEffect(() => {
    if (!arenaState.gameSessionId) return;
    const savedSession = localStorage.getItem("pamb_game_session_id_v1");
    if (savedSession && savedSession !== arenaState.gameSessionId) {
      localStorage.setItem("pamb_game_session_id_v1", arenaState.gameSessionId);
      localStorage.removeItem("pamb_agent_registered_v1");
      setRegistered(false);
      setActiveTab("1");
    } else if (!savedSession) {
      localStorage.setItem("pamb_game_session_id_v1", arenaState.gameSessionId);
    }
  }, [arenaState.gameSessionId]);

  // Automatically sync participant's active challenge tab when Presenter starts C1, C2, C3, or Podium
  useEffect(() => {
    if (phase === "C1_LIVE") setActiveTab("1");
    else if (phase === "C2_LIVE") setActiveTab("2");
    else if (phase === "C3_LIVE") setActiveTab("3");
    else if (phase === "PODIUM") setActiveTab("card");
  }, [phase]);

  const handleRegister = async (e) => {
    if (e) e.preventDefault();
    const cleanName = agentName.trim() || "PRUMDA Leader";
    setAgentName(cleanName);
    localStorage.setItem("pamb_agent_name_v1", cleanName);
    localStorage.removeItem("pamb_agent_region_v1");
    localStorage.setItem("pamb_agent_lang_v1", lang);
    localStorage.setItem("pamb_agent_registered_v1", "true");
    if (arenaState.gameSessionId) {
      localStorage.setItem("pamb_game_session_id_v1", arenaState.gameSessionId);
    }
    setRegistered(true);

    try {
      await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: agentId,
          name: cleanName,
          language: lang,
        }),
      });
      await fetchArenaState();
    } catch (err) {}
  };

  if (!registered) {
    return (
      <div className="min-h-screen bg-[#f4f6f9] text-slate-900 flex items-center justify-center p-3 sm:p-5">
        <form
          onSubmit={handleRegister}
          className="w-full max-w-md sm:max-w-lg md:max-w-2xl bg-white border-t-4 border-t-[#ed1b2e] border-x border-b border-slate-200 rounded-3xl p-5 sm:p-7 space-y-5 shadow-2xl"
        >
          <div className="flex items-center justify-between">
            <span className="px-3 py-1 rounded-full bg-red-50 border border-red-200 text-[#ed1b2e] text-xs font-extrabold">
              🇲🇾 PRUMDA LEARNING TRIP
            </span>
            <span className="text-xs font-mono font-bold text-slate-500">11 Nov • Google SG</span>
          </div>

          <div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900">{t.joinHeading}</h1>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">{t.joinSub}</p>
          </div>

          {/* Language Selector (5 Native Languages: English, Mandarin, Cantonese, Bahasa Melayu, Tamil) */}
          <div>
            <label className="block text-xs font-extrabold uppercase text-[#ed1b2e] mb-2">
              1. {t.yourLang}
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
              {window.PAMB_LANGUAGES.map((l) => (
                <button
                  key={l.code}
                  type="button"
                  onClick={() => setLang(l.code)}
                  className={`p-3 rounded-xl border-2 text-left text-xs sm:text-sm font-extrabold transition-all ${
                    lang === l.code
                      ? "bg-[#ed1b2e] text-white border-[#ed1b2e] shadow-md"
                      : "bg-white hover:bg-red-50/50 text-slate-800 border-slate-200 hover:border-[#ed1b2e]"
                  }`}
                >
                  🇲🇾 {l.label}
                </button>
              ))}
            </div>
          </div>

          {/* Name Input */}
          <div>
            <label className="block text-xs font-extrabold uppercase text-slate-800 mb-1.5">
              2. {t.yourName}
            </label>
            <input
              type="text"
              required
              value={agentName}
              onChange={(e) => setAgentName(e.target.value)}
              placeholder="e.g. Dato' Jason Lim / Mei Ling / Priya / Amirul"
              className="w-full bg-white border-2 border-slate-300 rounded-xl px-4 py-3 text-sm sm:text-base text-slate-900 placeholder:text-slate-400 font-bold focus:outline-none focus:border-[#ed1b2e] focus:ring-2 focus:ring-[#ed1b2e]/15"
            />
          </div>

          <button
            type="submit"
            className="w-full py-4 rounded-2xl bg-[#ed1b2e] hover:bg-[#c8102e] text-white font-extrabold text-sm sm:text-base shadow-lg transition-all"
          >
            {t.enterArenaBtn}
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f4f6f9] text-slate-900 pb-8">
      {/* Adaptive Sticky Header (Phone, iPad & Laptop) */}
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur border-t-4 border-t-[#ed1b2e] border-b border-slate-200 px-3 sm:px-5 py-2.5 shadow-sm">
        <div className="w-full max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-sm sm:text-base text-slate-900">🇲🇾 {agentName}</span>
              <span className="text-[11px] px-2 py-0.5 rounded bg-red-50 text-[#ed1b2e] border border-red-200 font-extrabold">
                {(myRecord?.scores?.["1"]?.total || 0) +
                  (myRecord?.scores?.["2"]?.total || 0) +
                  (myRecord?.scores?.["3"]?.total || 0)}{" "}
                pts
              </span>
              <button
                type="button"
                onClick={() => {
                  localStorage.removeItem("pamb_agent_registered_v1");
                  setRegistered(false);
                }}
                className="text-[10px] px-2 py-0.5 rounded bg-white hover:bg-red-50 text-[#ed1b2e] border border-[#ed1b2e] font-bold"
                title="Change Name or Re-Join"
              >
                ✎ Re-Join
              </button>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-1">
            {window.PAMB_LANGUAGES.map((l) => (
              <button
                key={l.code}
                onClick={() => {
                  setLang(l.code);
                  localStorage.setItem("pamb_agent_lang_v1", l.code);
                  fetch("/api/activity", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                      id: agentId,
                      name: agentName,
                      region: agentRegion,
                      language: l.code,
                    }),
                  }).catch(() => {});
                }}
                className={`px-2.5 py-1 rounded-lg text-[11px] sm:text-xs font-extrabold border transition-all ${
                  lang === l.code
                    ? "bg-[#ed1b2e] text-white border-[#ed1b2e]"
                    : "bg-white hover:bg-red-50 text-slate-700 border-slate-300"
                }`}
              >
                {l.short}
              </button>
            ))}
          </div>
        </div>
      </header>

      <main className="w-full max-w-xl md:max-w-3xl lg:max-w-5xl mx-auto px-3 sm:px-5 pt-3 space-y-3">
        {phase === "LOBBY" ? (
          /* PRE-START BRIEFING DECK FOR CHALLENGE 1, 2 & 3 */
          <div className="space-y-4">
            <div className="bg-white border-t-4 border-t-[#ed1b2e] border-x border-b border-slate-200 rounded-3xl p-5 text-center space-y-2 shadow-md">
              <div className="text-xs font-extrabold uppercase tracking-wider text-[#ed1b2e]">
                ✨ YOU ARE LIVE ON THE PRESENTER SCREEN!
              </div>
              <div className="text-lg font-extrabold text-slate-900">
                {t.lobbyWaitBanner}
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">{t.lobbyReadSub}</p>
            </div>

            {/* Briefs for Challenge 1, Challenge 2, and Challenge 3 */}
            <div className="space-y-3">
              {[
                {
                  num: "1",
                  badge: "📸 CHALLENGE 1 (14:00 – 14:20)",
                  title: t.c1Title,
                  sub: t.c1Sub,
                  desc: t.c1Scenario,
                },
                {
                  num: "2",
                  badge: "🧠 CHALLENGE 2 (14:20 – 14:35)",
                  title: t.c2Title,
                  sub: t.c2Sub,
                  desc: t.c2Scenario,
                },
                {
                  num: "3",
                  badge: "🎯 CHALLENGE 3 (14:35 – 15:05)",
                  title: t.c3Title,
                  sub: t.c3Sub,
                  desc: t.c3Scenario,
                },
              ].map((c) => (
                <div
                  key={c.num}
                  className="bg-white border-l-4 border-l-[#ed1b2e] border-t border-r border-b border-slate-200 rounded-2xl p-4 space-y-2 shadow-sm"
                >
                  <span className="text-[11px] font-mono text-[#ed1b2e] font-extrabold">
                    {c.badge}
                  </span>
                  <h3 className="text-sm font-extrabold text-slate-900">{c.title}</h3>
                  <div className="text-xs text-slate-700 font-bold">{c.sub}</div>
                  <p className="text-xs text-slate-600 leading-relaxed">{c.desc}</p>
                </div>
              ))}
            </div>
          </div>
        ) : (
          /* ACTIVE CHALLENGE VIEW */
          <>
            <div className="grid grid-cols-4 gap-1.5 bg-white p-1.5 rounded-2xl border border-slate-200 shadow-sm">
              {[
                { id: "1", label: "📸 C1", done: myRecord?.completed?.["1"], unlocked: true },
                { id: "2", label: "🧠 C2", done: myRecord?.completed?.["2"], unlocked: c2Unlocked },
                { id: "3", label: "🎯 C3", done: myRecord?.completed?.["3"], unlocked: c3Unlocked },
                { id: "card", label: "🏆 Score", unlocked: true },
              ].map((tb) => (
                <button
                  key={tb.id}
                  type="button"
                  disabled={!tb.unlocked}
                  onClick={() => {
                    if (tb.unlocked) setActiveTab(tb.id);
                  }}
                  className={`py-2 px-1 rounded-xl text-xs font-extrabold transition-all ${
                    !tb.unlocked
                      ? "bg-slate-50 text-slate-400 cursor-not-allowed opacity-70"
                      : activeTab === tb.id
                      ? "bg-[#ed1b2e] text-white shadow-sm"
                      : "bg-white text-slate-700 hover:bg-red-50 hover:text-[#ed1b2e]"
                  }`}
                >
                  {tb.unlocked ? tb.label : `🔒 C${tb.id}`} {tb.done ? "✓" : ""}
                </button>
              ))}
            </div>

            {activeTab === "1" && (
              <window.Challenge1ParticipantView
                t={t}
                lang={lang}
                agentId={agentId}
                agentName={agentName}
                agentRegion={agentRegion}
                canProceedNext={c2Unlocked}
                onNext={() => {
                  if (c2Unlocked) setActiveTab("2");
                }}
                fetchArenaState={fetchArenaState}
              />
            )}

            {activeTab === "2" && c2Unlocked && (
              <window.Challenge2ParticipantView
                t={t}
                lang={lang}
                agentId={agentId}
                agentName={agentName}
                agentRegion={agentRegion}
                canProceedNext={c3Unlocked}
                onNext={() => {
                  if (c3Unlocked) setActiveTab("3");
                }}
                onViewScorecard={() => setActiveTab("card")}
                existingSubmission={myRecord?.submissions?.["2"] || null}
                existingScore={myRecord?.scores?.["2"] || null}
                isCompleted={Boolean(myRecord?.completed?.["2"])}
                fetchArenaState={fetchArenaState}
              />
            )}

            {activeTab === "3" && c3Unlocked && (
              <window.Challenge3ParticipantView
                t={t}
                lang={lang}
                agentId={agentId}
                agentName={agentName}
                agentRegion={agentRegion}
                onNext={() => setActiveTab("card")}
                existingSubmission={myRecord?.submissions?.["3"] || null}
                existingScore={myRecord?.scores?.["3"] || null}
                isCompleted={Boolean(myRecord?.completed?.["3"])}
                fetchArenaState={fetchArenaState}
              />
            )}

            {activeTab === "card" && (
              <div className="space-y-4">
                <div className="bg-white border-t-4 border-t-[#ed1b2e] border-x border-b border-slate-200 rounded-3xl p-6 text-center space-y-3 shadow-lg">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 border border-red-200 text-[#ed1b2e] text-xs font-extrabold">
                    🏆 PRUMDA LEARNING TRIP • 10X LEADER SCORECARD
                  </div>
                  <h2 className="text-2xl font-extrabold text-slate-900">🇲🇾 {agentName}</h2>
                  <div className="text-5xl font-extrabold text-[#ed1b2e]">
                    {(myRecord?.scores?.["1"]?.total || 0) +
                      (myRecord?.scores?.["2"]?.total || 0) +
                      (myRecord?.scores?.["3"]?.total || 0)}{" "}
                    <span className="text-base text-slate-500 font-normal">combined pts</span>
                  </div>
                </div>

                {["1", "2", "3"].map((ck) =>
                  myRecord?.submissions?.[ck] ? (
                    <window.SubmissionCardRenderer
                      key={ck}
                      agentName={agentName}
                      regionBadge={agentRegion}
                      language={lang}
                      submission={myRecord.submissions[ck]}
                      scoreObj={myRecord.scores?.[ck]}
                      mode="card"
                    />
                  ) : null
                )}
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}

/* ============================================================================
   3. DEVELOPER SPLIT-SCREEN SANDBOX (/sandbox/1, /sandbox/2, /sandbox/3)
============================================================================ */
function DeveloperSandboxApp({ initialChallenge, arenaState, fetchArenaState }) {
  const [cNum, setCNum] = useState(initialChallenge || "1");
  const [lang, setLang] = useState("zh-CN");
  const [sandboxSubmission, setSandboxSubmission] = useState(null);
  const t = window.PAMB_I18N[lang] || window.PAMB_I18N["zh-CN"];

  const demoLeader = (arenaState.participants || [])[0] || {};
  const activeSubmission =
    sandboxSubmission || demoLeader.submissions?.[cNum] || null;

  return (
    <div className="min-h-screen bg-[#f4f6f9] text-slate-900 p-4 lg:p-6 space-y-5">
      <div className="bg-white border-t-4 border-t-[#ed1b2e] border-x border-b border-slate-200 rounded-2xl p-4 flex flex-wrap items-center justify-between gap-3 shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-[#ed1b2e] text-white text-xs font-extrabold">
              🧪 PARALLEL DEVELOPER SANDBOX
            </span>
            <span className="font-extrabold text-base text-slate-900">
              Challenge {cNum} Isolated Test Harness
            </span>
          </div>
          <div className="text-xs text-slate-500 mt-0.5">
            Left: Mobile Participant UI (`static/challenge{cNum}.js`) • Right: Presenter Screen Card Preview (`SubmissionCardRenderer`)
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {["1", "2", "3"].map((n) => (
            <button
              key={n}
              onClick={() => {
                setCNum(n);
                setSandboxSubmission(null);
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-extrabold border-2 transition-all ${
                cNum === n
                  ? "bg-[#ed1b2e] text-white border-[#ed1b2e]"
                  : "bg-white hover:bg-red-50 text-[#ed1b2e] border-[#ed1b2e]"
              }`}
            >
              Sandbox C{n}
            </button>
          ))}

          {window.PAMB_LANGUAGES.map((l) => (
            <button
              key={l.code}
              onClick={() => setLang(l.code)}
              className={`px-2.5 py-1.5 rounded-xl text-xs font-bold border transition-all ${
                lang === l.code
                  ? "bg-[#ed1b2e] text-white border-[#ed1b2e]"
                  : "bg-white hover:bg-red-50 text-slate-700 border-slate-300"
              }`}
            >
              {l.short}
            </button>
          ))}

          <a
            href="/"
            className="px-3 py-1.5 rounded-xl bg-white hover:bg-red-50 text-[#ed1b2e] border-2 border-[#ed1b2e] text-xs font-extrabold"
          >
            ← Back to Presenter Screen
          </a>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <div
          className={`${
            cNum === "2" ? "lg:col-span-7" : "lg:col-span-5"
          } bg-white border border-slate-200 rounded-3xl p-4 shadow-md`}
        >
          <div className="text-xs font-extrabold uppercase text-[#ed1b2e] mb-3">
            📱 Participant Mobile Simulator (Challenge {cNum})
          </div>
          {cNum === "1" && (
            <window.Challenge1ParticipantView
              t={t}
              lang={lang}
              agentId="sandbox-dev-agent"
              agentName="Dato' Sandbox Tester"
              agentRegion=""
              onNext={() => setCNum("2")}
              fetchArenaState={fetchArenaState}
              onSandboxPreview={(sub) => setSandboxSubmission(sub)}
            />
          )}
          {cNum === "2" && (
            <window.Challenge2ParticipantView
              t={t}
              lang={lang}
              agentId="sandbox-dev-agent"
              agentName="Dato' Sandbox Tester"
              agentRegion=""
              onNext={() => setCNum("3")}
              fetchArenaState={fetchArenaState}
              onSandboxPreview={(sub) => setSandboxSubmission(sub)}
            />
          )}
          {cNum === "3" && (
            <window.Challenge3ParticipantView
              t={t}
              lang={lang}
              agentId="sandbox-dev-agent"
              agentName="Dato' Sandbox Tester"
              agentRegion=""
              onNext={() => setCNum("1")}
              fetchArenaState={fetchArenaState}
              onSandboxPreview={(sub) => setSandboxSubmission(sub)}
            />
          )}
        </div>

        <div className={`${cNum === "2" ? "lg:col-span-5" : "lg:col-span-7"} space-y-4`}>
          <div className="bg-white border border-slate-200 rounded-3xl p-5 space-y-3 shadow-md">
            <div className="text-xs font-extrabold uppercase text-[#ed1b2e]">
              🖥️ Live Presenter Screen Render Preview (`mode=&quot;spotlight&quot;`)
            </div>
            {activeSubmission && (
              <window.SubmissionCardRenderer
                agentName="Dato' Sandbox Tester"
                regionBadge=""
                language={lang}
                submission={activeSubmission}
                scoreObj={{
                  total: activeSubmission.total || 96,
                  speed: 94,
                  accuracy: activeSubmission.total || 97,
                  timeSec: activeSubmission.timeSec || 16,
                  criteria: activeSubmission.pillarScores || {},
                }}
                mode="spotlight"
              />
            )}
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
            <div className="text-xs font-extrabold uppercase text-slate-700 mb-2">
              📦 Standardized Submission JSON Payload (`submission` object)
            </div>
            <pre className="text-[11px] font-mono text-slate-800 bg-slate-50 p-3 rounded-xl border border-slate-200 overflow-x-auto max-h-60">
              {JSON.stringify(activeSubmission, null, 2)}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ============================================================================
   ROOT APP ENTRYPOINT
============================================================================ */
function RootApp() {
  const [route] = useState(() => getRouteMode());
  const [arenaState, setArenaState] = useState({
    phase: "LOBBY",
    activeRound: "1",
    timerElapsed: 0,
    participants: [],
    regionStandings: [],
    events: [],
  });

  const fetchArenaState = async () => {
    try {
      const res = await fetch("/api/state", { cache: "no-store" });
      if (res.ok) {
        const data = await res.json();
        setArenaState(data);
      }
    } catch (e) {}
  };

  useEffect(() => {
    fetchArenaState();
    const id = setInterval(fetchArenaState, 2000);
    return () => clearInterval(id);
  }, []);

  if (route.mode === "sandbox") {
    return (
      <DeveloperSandboxApp
        initialChallenge={route.sandboxChallenge}
        arenaState={arenaState}
        fetchArenaState={fetchArenaState}
      />
    );
  }
  if (route.mode === "participant") {
    return (
      <ParticipantIsolatedApp
        arenaState={arenaState}
        fetchArenaState={fetchArenaState}
      />
    );
  }
  return (
    <PresenterIsolatedApp
      arenaState={arenaState}
      fetchArenaState={fetchArenaState}
    />
  );
}

const rootEl = document.getElementById("root");
if (rootEl) {
  ReactDOM.createRoot(rootEl).render(<RootApp />);
}
