/* ============================================================================
   STAGE SHOWCASES & SUBMISSION RENDERER MODULE
   1. SubmissionCardRenderer — Displays "What They Submitted" + Score Breakdown
      for Challenges 1, 2 & 3 on Presenter Wall, Spotlight Modal, and Sandbox.
   2. CanvasStageShowcase (15:05 - 15:15 | 10 min) — "Canvas to ideate to your team"
   3. LiveCoachStageShowcase (15:15 - 15:30 | 15 min) — "Live coaching: The Public Speaker"
============================================================================ */

window.SubmissionCardRenderer = function ({
  agentName,
  regionBadge,
  language,
  submission,
  scoreObj,
  mode = "card", // "card" | "spotlight"
  onOpenSpotlight,
  onSendToCanvas,
}) {
  const { useState, useEffect } = React;
  const [fallbackPortrait, setFallbackPortrait] = useState(null);
  const [slideIdx, setSlideIdx] = useState(0);

  const cNum = String(submission?.challenge || "1");

  useEffect(() => {
    let active = true;
    if (submission && cNum === "1" && !submission.imageAfter && window.composeExecutivePortraitCard) {
      window
        .composeExecutivePortraitCard({
          rawImageDataUrl: submission.rawPortraitUrl || null,
          styleKey: submission.portraitSvg || "mdrt_keynote",
          agentName: agentName || "PRUMDA Leader",
          region: "",
          motto: submission.motto || "Protecting Malaysian Families Across Generations",
          avatarIndex: submission.avatarIdx || 0,
        })
        .then((url) => {
          if (active) setFallbackPortrait(url);
        });
    }
    return () => {
      active = false;
    };
  }, [submission, cNum, agentName, regionBadge]);

  if (!submission) return null;
  const displayPortrait =
    submission.imageAfter || submission.rawPortraitUrl || fallbackPortrait;
  const total = scoreObj?.total || submission.total || 95;
  const speed = scoreObj?.speed || 92;
  const acc = scoreObj?.accuracy || 96;
  const timeSec = scoreObj?.timeSec || submission.timeSec || 18;
  const criteria = scoreObj?.criteria || submission.pillarScores || {};

  const badgeColors = {
    "1": "bg-red-50 text-[#ed1b2e] border-red-200",
    "2": "bg-red-50 text-[#ed1b2e] border-red-200",
    "3": "bg-red-50 text-[#ed1b2e] border-red-200",
  };

  return (
    <div
      className={`rounded-2xl transition-all ${
        mode === "spotlight"
          ? "bg-white border-2 border-[#ed1b2e] p-6 sm:p-7 shadow-xl space-y-5"
          : "bg-white border border-slate-200 hover:border-[#ed1b2e] p-4 space-y-3 shadow-md"
      }`}
    >
      {/* Top Author & Score Header */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#ed1b2e] flex items-center justify-center font-extrabold text-white text-sm shadow-sm">
            C{cNum}
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-extrabold text-slate-900 text-base">{agentName}</span>
              {submission.styleBadge && (
                <span className={`text-[11px] px-2.5 py-0.5 rounded-full border font-extrabold ${badgeColors[cNum] || badgeColors["1"]}`}>
                  {submission.styleBadge}
                </span>
              )}
            </div>
            <div className="text-xs text-slate-500 font-medium mt-0.5">{submission.title}</div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right">
            <div className="text-2xl font-extrabold text-[#ed1b2e]">
              {total} <span className="text-xs font-normal text-slate-500">pts</span>
            </div>
            <div className="text-[11px] font-mono font-bold text-slate-600">
              ⚡ {speed}% Spd • 🎯 {acc}% Qual ({timeSec}s)
            </div>
          </div>
          {mode === "card" && onOpenSpotlight && (
            <button
              type="button"
              onClick={onOpenSpotlight}
              className="px-3 py-2 rounded-xl bg-white hover:bg-red-50 text-[#ed1b2e] border-2 border-[#ed1b2e] text-xs font-extrabold transition-all shadow-sm"
            >
              🔍 Spotlight
            </button>
          )}
        </div>
      </div>

      {/* Challenge 3 Compact Single-Box Layout: Greeting Card at Top + WhatsApp & Plan Comparison Email Below */}
      {cNum === "3" ? (
        <div className="space-y-2.5">
          {displayPortrait && (
            <div className="flex items-center justify-center bg-slate-50 border border-slate-200 rounded-xl p-2">
              <img
                src={displayPortrait}
                alt="Submitted Life-Event Greeting Card"
                className={`${
                  mode === "spotlight" ? "h-40 sm:h-44" : "h-32"
                } w-auto object-contain rounded-lg border-2 border-[#ed1b2e] shadow-sm`}
              />
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-2.5">
              <div className="text-[11px] font-extrabold text-[#ed1b2e] mb-1">
                💬 1. First-Touch WhatsApp Message
              </div>
              <div className="text-[11px] text-slate-800 whitespace-pre-line leading-snug max-h-36 overflow-y-auto bg-white p-2 rounded-lg border border-slate-200">
                {submission.whatsappMessage || submission.aiOutput}
              </div>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-xl p-2.5">
              <div className="text-[11px] font-extrabold text-[#ed1b2e] mb-1">
                📧 2. Factual Plan Comparison Email (vs. AIA)
              </div>
              <div className="text-[11px] text-slate-800 whitespace-pre-line leading-snug max-h-36 overflow-y-auto bg-white p-2 rounded-lg border border-slate-200">
                {submission.aiaComparisonEmail || submission.dossierSynthesis || submission.aiOutput}
              </div>
            </div>
          </div>

          {onSendToCanvas && (
            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => onSendToCanvas(agentName, submission)}
                className="px-3 py-1 rounded-xl bg-white hover:bg-red-50 text-[#ed1b2e] border border-[#ed1b2e] text-[11px] font-extrabold"
              >
                🎨 Send to Stage Canvas →
              </button>
            </div>
          )}
        </div>
      ) : cNum === "2" && submission.deck && Array.isArray(submission.deck.slides) && submission.deck.slides.length > 0 ? (
        /* Challenge 2: Interactive 3-Slide Enterprise Deck Preview + Prompt & 6-Dimension Rubric */
        (() => {
          const slides = submission.deck.slides;
          const safeSlideIdx = Math.min(slideIdx, slides.length - 1);
          const curSlide = slides[safeSlideIdx] || slides[0];
          const maxChartVal =
            curSlide.chart && Array.isArray(curSlide.chart.series)
              ? Math.max(...curSlide.chart.series.map((p) => Number(p.value) || 0), 1)
              : 1;

          return (
            <div className="space-y-3">
              {/* Slide Selector Tabs */}
              <div className="flex flex-wrap items-center justify-between gap-2 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2">
                <div className="flex items-center gap-1.5">
                  {slides.map((sl, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setSlideIdx(idx)}
                      className={`px-2.5 py-1 rounded-lg text-xs font-extrabold transition-all ${
                        safeSlideIdx === idx
                          ? "bg-[#ed1b2e] text-white shadow-sm"
                          : "bg-white hover:bg-red-50 text-slate-700 border border-slate-200"
                      }`}
                    >
                      Slide {idx + 1}
                    </button>
                  ))}
                </div>
                <span className="text-[11px] font-bold text-slate-500">
                  {submission.deck.title} ({safeSlideIdx + 1}/{slides.length})
                </span>
              </div>

              {/* 16:9 Slide Card Render */}
              <div className="bg-white border-2 border-slate-200 rounded-2xl overflow-hidden shadow-md">
                <div className="h-1.5 bg-[#ed1b2e]" />
                <div className="p-4 sm:p-5 space-y-3">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h4 className="text-sm sm:text-base font-extrabold text-slate-900">
                        {curSlide.title}
                      </h4>
                      {curSlide.subtitle && (
                        <div className="text-xs text-slate-500 mt-0.5">{curSlide.subtitle}</div>
                      )}
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-red-50 text-[#ed1b2e] border border-red-200 font-bold uppercase shrink-0">
                      {curSlide.layout || "slide"}
                    </span>
                  </div>

                  {/* KPIs if present */}
                  {Array.isArray(curSlide.kpis) && curSlide.kpis.length > 0 && (
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {curSlide.kpis.map((k, ki) => (
                        <div
                          key={ki}
                          className="bg-red-50/60 border border-red-200 rounded-xl p-2.5"
                        >
                          <div className="text-[10px] font-bold uppercase text-slate-500">
                            {k.label}
                          </div>
                          <div className="text-sm sm:text-base font-extrabold text-[#ed1b2e] mt-0.5">
                            {k.value}
                          </div>
                          {k.note && (
                            <div className="text-[10px] text-slate-500 mt-0.5">{k.note}</div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Chart if present */}
                  {curSlide.chart && Array.isArray(curSlide.chart.series) && (
                    <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 space-y-2">
                      <div className="flex items-end gap-4 h-28 pt-4 px-2 border-b border-slate-300">
                        {curSlide.chart.series.map((pt, pi) => {
                          const pct = Math.max(8, Math.round(((Number(pt.value) || 0) / maxChartVal) * 100));
                          const barColors = [
                            "bg-[#ed1b2e]",
                            "bg-blue-600",
                            "bg-amber-500",
                            "bg-emerald-600",
                          ];
                          return (
                            <div key={pi} className="flex-1 flex flex-col items-center justify-end h-full">
                              <div className="text-[11px] font-extrabold text-slate-900 mb-1">
                                {pt.value}
                              </div>
                              <div
                                className={`w-3/4 rounded-t-md ${barColors[pi % barColors.length]}`}
                                style={{ height: `${pct}%` }}
                              />
                            </div>
                          );
                        })}
                      </div>
                      <div className="flex gap-4 px-2">
                        {curSlide.chart.series.map((pt, pi) => (
                          <div key={pi} className="flex-1 text-center text-[10px] font-bold text-slate-600">
                            {pt.label}
                          </div>
                        ))}
                      </div>
                      {curSlide.chart.unit && (
                        <div className="text-[10px] text-slate-400 text-right">{curSlide.chart.unit}</div>
                      )}
                    </div>
                  )}

                  {/* Table if present */}
                  {curSlide.table && Array.isArray(curSlide.table.headers) && (
                    <div className="overflow-x-auto border border-slate-200 rounded-xl">
                      <table className="w-full text-left border-collapse text-xs">
                        <thead>
                          <tr className="bg-slate-900 text-white">
                            {curSlide.table.headers.map((h, hi) => (
                              <th key={hi} className="p-2 font-bold text-[11px]">
                                {h}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {(curSlide.table.rows || []).map((row, ri) => (
                            <tr key={ri} className={ri % 2 === 1 ? "bg-slate-50" : "bg-white"}>
                              {curSlide.table.headers.map((_, ci) => (
                                <td key={ci} className="p-2 border-t border-slate-200 text-[11px] text-slate-700">
                                  {row[ci] || ""}
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}

                  {/* Bullets + Optional Image */}
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
                    <div className={curSlide.image ? "md:col-span-8 space-y-1.5" : "md:col-span-12 space-y-1.5"}>
                      {Array.isArray(curSlide.bullets) && curSlide.bullets.length > 0 && (
                        <ul className="list-disc pl-5 space-y-1 text-xs text-slate-700">
                          {curSlide.bullets.map((b, bi) => (
                            <li key={bi}>{b}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                    {curSlide.image && (
                      <div className="md:col-span-4">
                        <img
                          src={curSlide.image}
                          alt={curSlide.title}
                          className="w-full h-28 object-cover rounded-xl border border-slate-200"
                        />
                      </div>
                    )}
                  </div>

                  {curSlide.callout && (
                    <div className="bg-slate-50 border-l-4 border-l-[#ed1b2e] px-3 py-2 rounded-r-lg text-xs font-semibold text-slate-800">
                      {curSlide.callout}
                    </div>
                  )}
                </div>
              </div>

              {/* Upgraded Prompt + Rubric Pills + Judge Feedback */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-2.5">
                  <div className="text-[10px] font-extrabold uppercase tracking-wider text-slate-600 mb-1">
                    📝 Final Upgraded Prompt ({agentName})
                  </div>
                  <div className="text-[11px] text-slate-800 whitespace-pre-line font-mono leading-snug max-h-28 overflow-y-auto bg-white p-2 rounded-lg border border-slate-200">
                    {submission.userInput}
                  </div>
                </div>

                <div className="bg-slate-50 border border-slate-200 rounded-xl p-2.5 space-y-2">
                  <div className="text-[10px] font-extrabold uppercase tracking-wider text-[#ed1b2e]">
                    🏅 6-Dimension AI Rubric &amp; Verdict
                  </div>
                  {Object.keys(criteria).length > 0 && (
                    <div className="flex flex-wrap gap-1.5">
                      {Object.entries(criteria).map(([k, v]) => (
                        <span
                          key={k}
                          className="px-2 py-0.5 rounded-md bg-white border border-slate-200 text-[10px] font-bold text-slate-700"
                        >
                          {k}: <strong className="text-[#ed1b2e]">{v}</strong>
                        </span>
                      ))}
                    </div>
                  )}
                  {submission.judgeFeedback && (
                    <div className="text-[11px] text-slate-800 bg-red-50/70 px-2.5 py-1.5 rounded-lg border border-red-200">
                      💡 <strong className="text-[#ed1b2e]">AI Judge:</strong> {submission.judgeFeedback}
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })()
      ) : (
        /* Body Content for Challenge 1 (and fallback) */
        <div className={`grid grid-cols-1 ${cNum === "1" && displayPortrait ? "md:grid-cols-12" : ""} gap-5 items-center`}>
          {cNum === "1" && displayPortrait && (
            <div className={mode === "spotlight" ? "md:col-span-5 text-center" : "md:col-span-4 text-center"}>
              <div className="relative inline-block">
                <img
                  src={displayPortrait}
                  alt="Submitted AI Executive Portrait"
                  className={`mx-auto rounded-2xl border-2 border-[#ed1b2e] shadow-xl ${
                    mode === "spotlight" ? "w-full max-w-[380px]" : "w-44"
                  }`}
                />
                {submission.imageBefore && (
                  <div className="absolute -bottom-2 -left-2 bg-white border-2 border-[#ed1b2e] rounded-xl p-1 shadow-lg text-center">
                    <img
                      src={submission.imageBefore}
                      alt="Original Selfie"
                      className={`${mode === "spotlight" ? "w-16 h-16" : "w-11 h-11"} object-cover rounded-lg`}
                    />
                    <div className="text-[9px] font-extrabold text-[#ed1b2e] uppercase mt-0.5">
                      Before Selfie
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          <div className={`${cNum === "1" && displayPortrait ? (mode === "spotlight" ? "md:col-span-7" : "md:col-span-8") : ""} space-y-3`}>
            {/* What the Participant Configured / Prompted */}
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-3">
              <div className="text-[10px] font-extrabold uppercase tracking-wider text-slate-600 mb-1">
                📝 What {agentName} Prompted / Configured
              </div>
              <div className="text-xs text-slate-800 whitespace-pre-line font-mono leading-relaxed">
                {submission.userInput}
              </div>
            </div>

            {/* What Gemini / Agent Assist Generated */}
            <div className="bg-white border-2 border-slate-200 rounded-xl p-3 shadow-sm">
              <div className="text-[10px] font-extrabold uppercase tracking-wider text-[#ed1b2e] mb-1">
                ✨ Submitted AI Output ({String(language || "zh-CN").toUpperCase()})
              </div>
              <div
                className={`text-xs sm:text-sm text-slate-900 whitespace-pre-line leading-relaxed ${
                  mode === "card" ? "line-clamp-4" : ""
                }`}
              >
                {submission.aiOutput}
              </div>
            </div>

            {/* Criteria Breakdown Pills */}
            {Object.keys(criteria).length > 0 && (
              <div className="flex flex-wrap gap-2 pt-1">
                {Object.entries(criteria).map(([k, v]) => (
                  <span
                    key={k}
                    className="px-2.5 py-1 rounded-lg bg-slate-100 border border-slate-200 text-[11px] font-bold text-slate-700"
                  >
                    {k}: <strong className="text-[#ed1b2e]">{v}</strong>
                  </span>
                ))}
              </div>
            )}

            {/* AI Judge Feedback */}
            {submission.judgeFeedback && (
              <div className="text-xs text-slate-800 bg-red-50/70 px-3 py-2 rounded-xl border border-red-200">
                🏅 <strong className="text-[#ed1b2e]">AI Judge:</strong> {submission.judgeFeedback}
              </div>
            )}

            {onSendToCanvas && (
              <div className="pt-1 flex justify-end">
                <button
                  type="button"
                  onClick={() => onSendToCanvas(agentName, submission)}
                  className="px-3.5 py-1.5 rounded-xl bg-white hover:bg-red-50 text-[#ed1b2e] border-2 border-[#ed1b2e] text-xs font-extrabold transition-all shadow-sm"
                >
                  🎨 Send Idea to 15:05 Stage Canvas →
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

/* ============================================================================
   DEMO SESSION 1 (15:05 - 15:15 | 10 min):
   "Canvas to ideate to your team — Canvas to explore conceptual ideas into actual realisation"
============================================================================ */
window.CanvasStageShowcase = function ({ arenaState, fetchArenaState, initialSeed }) {
  const { useState } = React;
  const participants = arenaState.participants || [];
  const topLeader = participants[0] || { name: "Dato' Jason Lim" };

  const [seedKey, setSeedKey] = useState(initialSeed?.seedKey || "mdrt_sprint");
  const [winnerName, setWinnerName] = useState(initialSeed?.winnerName || topLeader.name);
  const [winnerIdea, setWinnerIdea] = useState(initialSeed?.winnerIdea || "");
  const [refinement, setRefinement] = useState("");
  const [lang, setLang] = useState("zh-CN");
  const [isUpdating, setIsUpdating] = useState(false);

  const canvasData = arenaState.canvasState || {};

  const triggerCanvasUpdate = async (customRefinement) => {
    setIsUpdating(true);
    try {
      await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          challenge: "canvas",
          seedKey,
          winnerName,
          winnerIdea,
          refinement: customRefinement !== undefined ? customRefinement : refinement,
          language: lang,
        }),
      });
      await fetchArenaState();
    } catch (e) {}
    setIsUpdating(false);
  };

  const quickChips = [
    "加入马来西亚华语/英语双语 15 分钟早会演练脚本 (Add Bilingual 15-min Morning Huddle Script)",
    "增加针对槟城与柔佛高净值企业主的专项 KPI (Add Penang & JB SME Boss Target KPIs)",
    "生成零代码新顾问 30 天破冰行动清单 (Generate 30-Day New Recruit Action Checklist)",
  ];

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-purple-950/80 via-[#121521] to-indigo-950/80 border-2 border-purple-500/70 rounded-3xl p-6 shadow-2xl">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/20 border border-purple-400 text-purple-200 text-xs font-extrabold uppercase tracking-wider mb-2">
              🎨 15:05 – 15:15 (10 MIN STAGE DEMO 1) • GEMINI CANVAS TEAM IDEATION
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              Canvas to Ideate to Your Team: Concept → Realisation
            </h2>
            <p className="text-xs sm:text-sm text-gray-300 mt-1">
              Watch how an Agency Leader&apos;s raw idea transforms side-by-side into a structured PRUMDA Learning Trip Team Playbook, KPI Tracker &amp; Morning Huddle Script!
            </p>
          </div>

          <div className="flex items-center gap-2">
            {window.PAMB_LANGUAGES.map((l) => (
              <button
                key={l.code}
                onClick={() => setLang(l.code)}
                className={`px-3 py-1.5 rounded-xl text-xs font-extrabold border ${
                  lang === l.code
                    ? "bg-purple-600 text-white border-purple-300"
                    : "bg-[#141824] text-gray-300 border-gray-700"
                }`}
              >
                {l.short}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Split Screen: Left = Ideation Prompt & Co-Creation Controls | Right = Live Realized Canvas Document */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left 5 Cols: Conceptual Idea & Co-Creation Chat */}
        <div className="lg:col-span-5 bg-[#121521] border border-gray-800 rounded-2xl p-5 space-y-4 shadow-xl">
          <div className="text-xs font-extrabold uppercase tracking-wider text-purple-400">
            1. Select Conceptual Seed or Leaderboard Winner Idea
          </div>

          <div className="grid grid-cols-1 gap-2">
            {[
              { id: "mdrt_sprint", icon: "🏆", label: "Blueprint A: PRUMDA 90-Day 'Road to MDRT' Agency Sprint" },
              { id: "genz_recruit", icon: "🚀", label: "Blueprint B: 'Next-Gen AI Wealth Entrepreneur' Recruitment Campaign" },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setSeedKey(item.id);
                  triggerCanvasUpdate("");
                }}
                className={`p-3 rounded-xl border text-left text-xs font-extrabold flex items-center gap-2 transition-all ${
                  seedKey === item.id
                    ? "bg-purple-950/80 border-purple-400 text-white shadow"
                    : "bg-[#0a0d14] border-gray-800 text-gray-300"
                }`}
              >
                <span className="text-lg">{item.icon}</span>
                <span>{item.label}</span>
              </button>
            ))}
          </div>

          <div className="bg-[#0a0d14] border border-gray-800 rounded-xl p-3.5 space-y-2">
            <div className="text-xs font-bold text-amber-300">
              🌟 Pull Inspiration from Top PRUMDA Leaderboard Challenger:
            </div>
            <div className="flex flex-wrap gap-1.5">
              {participants.slice(0, 5).map((p) => (
                <button
                  key={p.id}
                  onClick={() => {
                    setWinnerName(p.name);
                    const sub3 = p.submissions?.["3"]?.aiOutput || p.submissions?.["2"]?.aiOutput || "";
                    setWinnerIdea(sub3.slice(0, 180));
                  }}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold border ${
                    winnerName === p.name
                      ? "bg-amber-500 text-black border-amber-300"
                      : "bg-[#151926] text-gray-300 border-gray-700"
                  }`}
                >
                  🇲🇾 {p.name}
                </button>
              ))}
            </div>
          </div>

          {/* Quick Co-Creation Chips */}
          <div className="space-y-2">
            <div className="text-xs font-extrabold uppercase tracking-wider text-emerald-400">
              2. Click a Live Canvas Co-Creation Prompt:
            </div>
            {quickChips.map((chip, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setRefinement(chip);
                  triggerCanvasUpdate(chip);
                }}
                className="w-full p-2.5 rounded-xl bg-[#161b29] hover:bg-purple-950/60 border border-gray-700 hover:border-purple-400 text-left text-xs text-gray-200 transition-all"
              >
                ✨ {chip}
              </button>
            ))}
          </div>

          {/* Custom Refinement Input */}
          <div className="space-y-2 pt-1">
            <input
              type="text"
              value={refinement}
              onChange={(e) => setRefinement(e.target.value)}
              placeholder="Or type any live team request from the Room Bromo floor..."
              className="w-full bg-[#0a0d14] border border-gray-700 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-purple-400"
            />
            <button
              onClick={() => triggerCanvasUpdate(refinement)}
              disabled={isUpdating}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-purple-600 to-[#ed1b2e] text-white font-extrabold text-xs sm:text-sm shadow-xl"
            >
              {isUpdating ? "⚡ Gemini Canvas Realizing Document..." : "🎨 Realize in Gemini Canvas Live →"}
            </button>
          </div>
        </div>

        {/* Right 7 Cols: Live Realized Canvas Artifact */}
        <div className="lg:col-span-7 bg-gradient-to-br from-[#161a2b] to-[#0f1320] border-2 border-purple-500/60 rounded-2xl p-6 space-y-5 shadow-2xl">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-gray-800 pb-4">
            <div>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-700 text-[11px] font-extrabold">
                LIVE CANVAS DOCUMENT REALISATION
              </span>
              <h3 className="text-xl sm:text-2xl font-extrabold text-white mt-1">
                {canvasData.title || "PRUMDA 90-Day 'Road to MDRT' Agency Sprint Playbook"}
              </h3>
              <p className="text-xs text-purple-300 font-semibold">
                {canvasData.customBanner || canvasData.subtitle}
              </p>
            </div>
            <div className="text-right text-xs font-mono text-gray-400">
              <div>Model: {canvasData.modelUsed || "gemini-2.5-flash"}</div>
              <div>{canvasData.latencyMs ? `${canvasData.latencyMs}ms` : "Live Sync"}</div>
            </div>
          </div>

          {/* Executive Summary */}
          <div className="bg-black/40 border border-gray-800 rounded-xl p-4">
            <div className="text-xs font-extrabold uppercase text-purple-400 mb-1">
              📋 Executive Vision
            </div>
            <p className="text-xs sm:text-sm text-gray-200 leading-relaxed">
              {canvasData.executiveSummary}
            </p>
          </div>

          {/* KPI Impact Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {(canvasData.kpis || []).map((k, i) => (
              <div key={i} className="bg-[#111522] border border-purple-800/50 rounded-xl p-3.5">
                <div className="text-[11px] text-gray-400 font-semibold">{k.metric}</div>
                <div className="text-xs text-gray-500 line-through mt-1">Before: {k.baseline}</div>
                <div className="text-base font-extrabold text-emerald-400">AI Target: {k.target}</div>
              </div>
            ))}
          </div>

          {/* 3 Execution Phases */}
          <div className="space-y-2.5">
            <div className="text-xs font-extrabold uppercase text-amber-400">
              🗓️ Phased Rollout Blueprint for PRUMDA Units
            </div>
            {(canvasData.phases || []).map((ph, i) => (
              <div key={i} className="bg-[#0d101a] border border-gray-800 rounded-xl p-3.5">
                <div className="flex items-center justify-between text-xs font-extrabold text-white">
                  <span>{ph.week}</span>
                  <span className="text-purple-300">{ph.focus}</span>
                </div>
                <p className="text-xs text-gray-300 mt-1">{ph.deliverable}</p>
              </div>
            ))}
          </div>

          {/* Morning Huddle Script */}
          <div className="bg-emerald-950/25 border border-emerald-700/60 rounded-xl p-4">
            <div className="text-xs font-extrabold text-emerald-400 mb-1">
              🎙️ Ready-to-Use Monday Morning Huddle Script
            </div>
            <p className="text-xs sm:text-sm text-gray-100 italic leading-relaxed">
              {canvasData.huddleScript}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ============================================================================
   DEMO SESSION 2 (15:15 - 15:30 | 15 min):
   "Live coaching — The Public Speaker: Using multimodal AI as your personal executive coach"
============================================================================ */
window.LiveCoachStageShowcase = function ({ arenaState, fetchArenaState }) {
  const { useState, useRef, useEffect } = React;
  const participants = arenaState.participants || [];
  const coachState = arenaState.coachState || {};
  const reactions = coachState.reactions || { fire: 28, clap: 34, diamond: 19, rocket: 22 };

  const [speakerName, setSpeakerName] = useState(
    participants[0]?.name || "Dato' Jason Lim (PRUMDA Leader)"
  );
  const [topic, setTopic] = useState("60-Second MDRT Agency Morning Rally (Mandarin / EN)");
  const [lang, setLang] = useState("zh-CN");
  const [cameraActive, setCameraActive] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [pitchSeconds, setPitchSeconds] = useState(0);
  const [transcript, setTranscript] = useState(
    "各位 PRUMDA Learning Trip 的精英伙伴们，AI 时代不是要取代有温度的财富顾问，而是让我们用 10 倍的速度去守护每一个马来西亚家庭的未来！今天让我们一起冲刺百万圆桌！"
  );
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const timerRef = useRef(null);
  const recogRef = useRef(null);

  useEffect(() => {
    return () => {
      stopStageCamera();
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const startStageCamera = async () => {
    try {
      setCameraActive(true);
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: { ideal: 640 }, height: { ideal: 360 } },
        audio: false,
      });
      streamRef.current = stream;
      if (videoRef.current) videoRef.current.srcObject = stream;
    } catch (e) {
      setCameraActive(false);
    }
  };

  const stopStageCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((tr) => tr.stop());
      streamRef.current = null;
    }
    setCameraActive(false);
  };

  const toggleLivePitchRecording = () => {
    if (isRecording) {
      setIsRecording(false);
      if (timerRef.current) clearInterval(timerRef.current);
      if (recogRef.current) {
        try {
          recogRef.current.stop();
        } catch (e) {}
      }
      runMultimodalCoachAnalysis();
      return;
    }

    setPitchSeconds(0);
    setIsRecording(true);
    timerRef.current = setInterval(() => {
      setPitchSeconds((prev) => prev + 1);
    }, 1000);

    const SpeechRec = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRec) {
      try {
        const rec = new SpeechRec();
        rec.lang = lang === "en" ? "en-US" : lang === "ms" ? "ms-MY" : "zh-CN";
        rec.continuous = true;
        rec.interimResults = true;
        rec.onresult = (ev) => {
          let txt = "";
          for (let i = 0; i < ev.results.length; i++) {
            txt += ev.results[i][0].transcript;
          }
          if (txt.trim()) setTranscript(txt.trim());
        };
        rec.start();
        recogRef.current = rec;
      } catch (e) {}
    }
  };

  const runMultimodalCoachAnalysis = async () => {
    setIsAnalyzing(true);
    try {
      const res = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          challenge: "coach",
          speakerName,
          topic,
          transcript,
          durationSec: Math.max(15, pitchSeconds || 45),
          language: lang,
        }),
      });
      const data = await res.json();
      await fetchArenaState();
      if (window.speechSynthesis && data.spokenCoachSummary) {
        window.speechSynthesis.cancel();
        const utter = new SpeechSynthesisUtterance(data.spokenCoachSummary);
        utter.lang = lang === "en" ? "en-US" : lang === "ms" ? "ms-MY" : "zh-CN";
        utter.rate = 1.02;
        window.speechSynthesis.speak(utter);
      }
    } catch (e) {}
    setIsAnalyzing(false);
  };

  const speakCoachFeedbackAgain = () => {
    if (!window.speechSynthesis || !coachState.spokenCoachSummary) return;
    window.speechSynthesis.cancel();
    const utter = new SpeechSynthesisUtterance(coachState.spokenCoachSummary);
    utter.lang = lang === "en" ? "en-US" : lang === "ms" ? "ms-MY" : "zh-CN";
    window.speechSynthesis.speak(utter);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-amber-950/80 via-[#121521] to-red-950/80 border-2 border-amber-500/80 rounded-3xl p-6 shadow-2xl">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400 text-amber-200 text-xs font-extrabold uppercase tracking-wider mb-2">
              🎤 15:15 – 15:30 (15 MIN STAGE DEMO 2) • THE PUBLIC SPEAKER: MULTIMODAL AI EXECUTIVE COACH
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              Live Coaching: Multimodal AI as Your Personal Executive Coach
            </h2>
            <p className="text-xs sm:text-sm text-gray-300 mt-1">
              Evaluates live stage posture, eye contact, vocal pacing &amp; persuasive storytelling in Mandarin / English — while the room cheers live from their phones!
            </p>
          </div>

          {/* Live Audience Crowd Cheer Counters */}
          <div className="flex items-center gap-2 bg-black/60 px-4 py-2.5 rounded-2xl border border-amber-500/50">
            <span className="text-xs font-extrabold text-gray-300 mr-1">📱 Live Room Cheers:</span>
            <span className="px-2.5 py-1 rounded-xl bg-red-950/90 text-amber-300 font-extrabold text-xs">
              🔥 {reactions.fire || 28}
            </span>
            <span className="px-2.5 py-1 rounded-xl bg-blue-950/90 text-blue-300 font-extrabold text-xs">
              👏 {reactions.clap || 34}
            </span>
            <span className="px-2.5 py-1 rounded-xl bg-purple-950/90 text-purple-300 font-extrabold text-xs">
              💎 {reactions.diamond || 19}
            </span>
            <span className="px-2.5 py-1 rounded-xl bg-emerald-950/90 text-emerald-300 font-extrabold text-xs">
              🚀 {reactions.rocket || 22}
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left 5 Cols: Live Stage Camera + Mic Controls */}
        <div className="lg:col-span-5 bg-[#121521] border border-gray-800 rounded-2xl p-5 space-y-4 shadow-xl">
          <div className="flex items-center justify-between">
            <span className="text-xs font-extrabold uppercase tracking-wider text-amber-400">
              📹 Stage Hot-Seat Camera &amp; Voice Feed
            </span>
            <div className="flex gap-1.5">
              {window.PAMB_LANGUAGES.map((l) => (
                <button
                  key={l.code}
                  onClick={() => setLang(l.code)}
                  className={`px-2 py-0.5 rounded text-[11px] font-bold border ${
                    lang === l.code
                      ? "bg-[#ed1b2e] text-white border-[#ed1b2e]"
                      : "bg-[#0a0d14] text-gray-400 border-gray-700"
                  }`}
                >
                  {l.short}
                </button>
              ))}
            </div>
          </div>

          {/* Select Speaker from Leaderboard */}
          <div>
            <label className="block text-xs font-bold text-gray-300 mb-1">
              Speaker on Stage (Pick Volunteer / Finalist):
            </label>
            <div className="flex flex-wrap gap-1.5 mb-2">
              {participants.slice(0, 4).map((p) => (
                <button
                  key={p.id}
                  onClick={() => setSpeakerName(p.name)}
                  className="px-2.5 py-1 rounded-lg bg-[#181d2c] hover:bg-amber-500/20 border border-gray-700 text-xs font-bold text-gray-200"
                >
                  🇲🇾 {p.name}
                </button>
              ))}
            </div>
            <input
              type="text"
              value={speakerName}
              onChange={(e) => setSpeakerName(e.target.value)}
              className="w-full bg-[#0a0d14] border border-gray-700 rounded-xl px-3 py-2 text-xs sm:text-sm text-white font-bold"
            />
          </div>

          {/* Webcam Viewport */}
          <div className="relative rounded-2xl overflow-hidden bg-[#080a10] border-2 border-gray-800 h-52 flex items-center justify-center">
            {cameraActive ? (
              <video ref={videoRef} autoPlay playsInline muted className="w-full h-full object-cover" />
            ) : (
              <div className="text-center space-y-2 p-4">
                <div className="text-4xl">🎙️👔</div>
                <div className="text-xs font-bold text-gray-300">
                  Stage Camera &amp; Multimodal Vision Ready
                </div>
                <button
                  type="button"
                  onClick={startStageCamera}
                  className="px-4 py-2 rounded-xl bg-gray-800 hover:bg-gray-700 text-amber-300 font-extrabold text-xs border border-amber-500/40"
                >
                  📹 Enable Live Stage Webcam
                </button>
              </div>
            )}

            {isRecording && (
              <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-[#ed1b2e] text-white text-xs font-extrabold flex items-center gap-1.5 animate-pulse">
                <span>● REC</span>
                <span>{window.formatMMSS(pitchSeconds)}</span>
              </div>
            )}
          </div>

          {/* Live Transcript Box */}
          <div>
            <label className="block text-xs font-bold text-gray-300 mb-1">
              Live Speech Transcript (Voice-to-Text or Editable Stage Script):
            </label>
            <textarea
              rows={3}
              value={transcript}
              onChange={(e) => setTranscript(e.target.value)}
              className="w-full bg-[#0a0d14] border border-gray-700 rounded-xl p-3 text-xs text-gray-100 leading-relaxed"
            />
          </div>

          <div className="flex gap-2">
            <button
              type="button"
              onClick={toggleLivePitchRecording}
              className={`flex-1 py-3.5 rounded-xl font-extrabold text-xs sm:text-sm shadow-xl ${
                isRecording
                  ? "bg-red-600 hover:bg-red-500 text-white animate-pulse"
                  : "bg-[#1e2436] hover:bg-gray-700 text-white border border-gray-600"
              }`}
            >
              {isRecording ? "⏹ Stop Pitch & Run AI Coach" : "🎙️ Start Live Mic Pitch"}
            </button>

            <button
              type="button"
              onClick={runMultimodalCoachAnalysis}
              disabled={isAnalyzing}
              className="flex-1 py-3.5 rounded-xl bg-gradient-to-r from-[#ed1b2e] to-amber-600 text-white font-extrabold text-xs sm:text-sm shadow-xl"
            >
              {isAnalyzing ? "⚡ Analyzing..." : "✨ Run AI Executive Coach Now"}
            </button>
          </div>
        </div>

        {/* Right 7 Cols: Multimodal Executive Speaker Scorecard */}
        <div className="lg:col-span-7 bg-gradient-to-br from-[#191522] via-[#121521] to-[#111d24] border-2 border-amber-500/70 rounded-2xl p-6 space-y-5 shadow-2xl">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-gray-800 pb-4">
            <div>
              <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 border border-amber-400 text-amber-300 text-[11px] font-extrabold">
                MULTIMODAL EXECUTIVE SPEAKER EVALUATION
              </span>
              <h3 className="text-2xl font-extrabold text-white mt-1">
                {coachState.speakerName || speakerName}
              </h3>
              <p className="text-xs text-gray-400">{coachState.topic || topic}</p>
            </div>

            <div className="text-right">
              <div className="text-4xl font-extrabold text-amber-400">
                {coachState.overallScore || 96}
                <span className="text-sm text-gray-400 font-normal"> / 100</span>
              </div>
              <button
                type="button"
                onClick={speakCoachFeedbackAgain}
                className="mt-1 px-3 py-1 rounded-lg bg-emerald-950 hover:bg-emerald-900 text-emerald-300 border border-emerald-700 text-xs font-extrabold"
              >
                🔊 Speak AI Coach Feedback
              </button>
            </div>
          </div>

          {/* 3 Multimodal Pillars: Body Language, Vocal Delivery, Persuasion */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              { label: "👁️ Executive Presence & Posture", score: coachState.presenceScore || 96, color: "text-amber-400" },
              { label: "🎙️ Vocal Pacing & Conviction", score: coachState.vocalScore || 94, color: "text-blue-400" },
              { label: "💎 Storytelling & Empathy Impact", score: coachState.persuasionScore || 97, color: "text-emerald-400" },
            ].map((m, i) => (
              <div key={i} className="bg-black/50 border border-gray-800 rounded-xl p-4 text-center">
                <div className="text-xs text-gray-300 font-bold">{m.label}</div>
                <div className={`text-3xl font-extrabold mt-1 ${m.color}`}>{m.score}%</div>
              </div>
            ))}
          </div>

          {/* Spoken Coach Summary */}
          <div className="bg-emerald-950/30 border border-emerald-600/60 rounded-2xl p-4 space-y-1.5">
            <div className="text-xs font-extrabold uppercase tracking-wider text-emerald-400">
              🗣️ Gemini Multimodal Coach Live Feedback
            </div>
            <p className="text-sm sm:text-base text-white font-semibold leading-relaxed">
              &ldquo;{coachState.spokenCoachSummary}&rdquo;
            </p>
          </div>

          {/* Key Strengths + 10x Pro Tip */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-[#0d1018] border border-gray-800 rounded-xl p-4 space-y-2">
              <div className="text-xs font-extrabold uppercase text-amber-400">
                ✓ What Worked Brilliantly
              </div>
              <ul className="space-y-1.5 text-xs text-gray-200 list-disc list-inside leading-relaxed">
                {(coachState.strengths || []).map((st, idx) => (
                  <li key={idx}>{st}</li>
                ))}
              </ul>
            </div>

            <div className="bg-blue-950/25 border border-blue-800/60 rounded-xl p-4 space-y-2">
              <div className="text-xs font-extrabold uppercase text-blue-400">
                🚀 10x Executive Coaching Pro-Tip
              </div>
              <p className="text-xs text-gray-200 leading-relaxed">{coachState.proTip}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
