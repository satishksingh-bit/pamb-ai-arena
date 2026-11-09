/* ============================================================================
   CHALLENGE 1 MODULE (14:00 - 14:20 | 20 min) + SHARED `window.PAMBChatShell`
   "Reinvent your professional image and customer outreach when it matters"
   — The GenAI Magic (Nano Banana: Taking your headshot and pictures to the AI era)

   Ported from Demo 1 (`web-app/frontend/src/App.jsx` + `CameraModal.jsx` + `demo-1-image-outreach`):
   - Reusable mobile-first `window.PAMBChatShell` (available globally for Challenges 1, 2 & 3)
   - Step 1: Chat prompt is hidden until user picks "Upload an image" or "Create a custom image"
   - Step 2+: Free-order conversational creation with small modifiable sample prompt pills,
     clean pure AI images (no fake card wrappers), Share to WhatsApp, and Submit!

   Owner: Colleague 1 (`static/challenge1.js` + `challenges/c1_image_outreach.py`)
============================================================================ */

/* ----------------------------------------------------------------------------
   1. REUSABLE ARENA CHAT SHELL (`window.PAMBChatShell`)
   ---------------------------------------------------------------------------- */
function formatInlineBoldC1(text) {
  if (!text) return null;
  const parts = String(text).split(/(\*\*[^*]+\*\*|\*[^*\n]+\*)/g);
  return parts.map((part, idx) => {
    if (part.startsWith("**") && part.endsWith("**") && part.length > 4) {
      return (
        <strong key={idx} className="font-extrabold text-slate-900">
          {part.slice(2, -2)}
        </strong>
      );
    }
    if (part.startsWith("*") && part.endsWith("*") && part.length > 2) {
      return (
        <em key={idx} className="italic text-[#ed1b2e]">
          {part.slice(1, -1)}
        </em>
      );
    }
    return part;
  });
}

window.PAMBChatShell = function PAMBChatShell({
  badgeLeft,
  badgeRight,
  regionLabel,
  title,
  subtitle,
  briefSteps = [],
  scenarioText,
  messages = [],
  isStreaming = false,
  streamingLabel = "Synthesizing...",
  hideComposer = false,
  inputText = "",
  onInputChange,
  onSendMessage,
  onPrefillPrompt,
  inputPlaceholder = "Type a prompt or tap a pill above to customize...",
  composerLeftActions = null,
  composerAttachmentStrip = null,
  renderMessageActions = null,
  renderAssistantArtifact = null,
  stickySubmitBar = null,
  pillHint = "Tap an option pill to load a sample prompt you can modify:",
  craftSectionTitle = "1. Craft Your Image",
  workSectionTitle = "2. Put Your Image to Work",
}) {
  const { useState, useEffect, useRef } = React;
  const chatBottomRef = useRef(null);
  const textareaRef = useRef(null);
  const [flashComposer, setFlashComposer] = useState(false);

  useEffect(() => {
    if (messages.length > 1 || isStreaming) {
      chatBottomRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  }, [messages.length, isStreaming]);

  const handlePrefill = (promptStr) => {
    if (onPrefillPrompt) {
      onPrefillPrompt(promptStr);
    } else if (onInputChange) {
      onInputChange(promptStr);
    }
    setFlashComposer(true);
    setTimeout(() => setFlashComposer(false), 750);
    setTimeout(() => {
      if (textareaRef.current) {
        textareaRef.current.focus();
        const len = promptStr.length;
        try {
          textareaRef.current.setSelectionRange(len, len);
        } catch (_) {}
        textareaRef.current.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }
    }, 30);
  };

  const dynamicRows = inputText && inputText.length > 80 ? 4 : 3;
  let latestFollowUpMsgId = null;
  for (let i = messages.length - 1; i >= 0; i--) {
    if (messages[i].role !== "user" && messages[i].followUps && messages[i].followUps.length > 0) {
      latestFollowUpMsgId = messages[i].id;
      break;
    }
  }

  return (
    <div className="space-y-3">
      {/* Clean, Compact Executive Header + 2-Step Overview Brief */}
      <div className="bg-white border border-slate-200 border-t-4 border-t-[#ed1b2e] rounded-2xl p-3.5 sm:p-4 shadow-sm space-y-2.5">
        <div className="flex flex-wrap items-center justify-between gap-1.5">
          <div className="flex flex-wrap items-center gap-1.5">
            {badgeLeft && (
              <span className="px-2.5 py-0.5 rounded-full bg-[#ed1b2e] text-white text-[10px] font-extrabold tracking-wide uppercase">
                {badgeLeft}
              </span>
            )}
            {badgeRight && (
              <span className="px-2.5 py-0.5 rounded-full bg-red-50 text-[#ed1b2e] border border-red-200 text-[10px] font-extrabold">
                {badgeRight}
              </span>
            )}
          </div>
          {regionLabel && (
            <span className="text-[11px] font-semibold text-slate-500">🇲🇾 {regionLabel}</span>
          )}
        </div>

        <div>
          <h2 className="text-sm sm:text-base font-extrabold text-slate-900 leading-snug">{title}</h2>
          {subtitle && (
            <p className="text-[11px] text-[#ed1b2e] font-semibold mt-0.5">{subtitle}</p>
          )}
        </div>

        {/* Nicely Formatted 2-Step Brief */}
        {briefSteps.length > 0 && (
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-2.5 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {briefSteps.map((bs, idx) => (
              <div key={idx} className="flex items-start gap-2 min-w-0">
                <span className="w-5 h-5 rounded-full bg-[#ed1b2e] text-white text-[11px] font-extrabold flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                  {idx + 1}
                </span>
                <div className="min-w-0 text-xs leading-snug">
                  <span className="font-extrabold text-slate-900">
                    {bs.title.replace(/^[0-9]+[.\s]+/, "")}:{" "}
                  </span>
                  <span className="text-slate-600">{bs.desc}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {scenarioText && (
          <details className="group text-[11px] text-slate-500">
            <summary className="cursor-pointer select-none hover:text-[#ed1b2e] inline-flex items-center gap-1 font-semibold">
              <span>ℹ️ Scoring &amp; Mission Details</span>
              <span className="text-[10px] text-[#ed1b2e] group-open:rotate-180 transition-transform">▼</span>
            </summary>
            <p className="text-xs text-slate-700 mt-1.5 leading-relaxed bg-slate-50 rounded-xl border border-slate-200 p-2.5">
              {scenarioText}
            </p>
          </details>
        )}
      </div>

      {/* Main Chat Workspace Card */}
      <div className="bg-white border border-slate-200 rounded-2xl shadow-md overflow-hidden flex flex-col">
        {/* Scrollable Conversation Timeline */}
        <div className="p-3 sm:p-4 space-y-3 max-h-[56vh] sm:max-h-[520px] overflow-y-auto overscroll-contain bg-slate-50/50">
          {messages.map((msg) =>
            msg.role === "user" ? (
              <div key={msg.id} className="flex flex-col items-end gap-1.5">
                {msg.thumbUrl && (
                  <img
                    src={msg.thumbUrl}
                    alt="Uploaded Photo"
                    title="Tap to zoom"
                    data-zoomable="true"
                    className="w-12 h-12 rounded-xl object-cover border-2 border-[#ed1b2e] shadow-sm cursor-zoom-in hover:opacity-90"
                  />
                )}
                <div className="max-w-[88%] sm:max-w-[80%] rounded-2xl rounded-br-sm bg-[#ed1b2e] text-white px-3.5 py-2.5 text-xs sm:text-sm leading-relaxed shadow-sm break-words font-medium">
                  {msg.text}
                </div>
              </div>
            ) : (
              <div key={msg.id} className="flex items-start gap-2.5">
                <div className="w-7 h-7 rounded-full bg-[#ed1b2e] text-white text-xs font-extrabold flex items-center justify-center shrink-0 shadow-sm mt-0.5">
                  ✨
                </div>
                <div className="flex-1 min-w-0 bg-white border border-slate-200 rounded-2xl rounded-tl-sm p-3.5 space-y-2.5 shadow-sm">
                  <div className="flex flex-wrap items-center justify-between gap-1.5">
                    <span className="text-[11px] font-extrabold text-[#ed1b2e] uppercase tracking-wide">
                      {msg.agentName || "AI Image Assistant"}
                    </span>
                    {msg.turnBadge && (
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200 font-mono font-semibold">
                        {msg.turnBadge}
                      </span>
                    )}
                  </div>

                  {/* Optional Uploaded Photo Preview inside Assistant Confirmation */}
                  {msg.photoThumb && (
                    <div className="inline-flex items-center gap-2 px-2.5 py-1.5 rounded-xl bg-red-50/70 border border-red-200">
                      <img
                        src={msg.photoThumb}
                        alt="Your Uploaded Photo"
                        title="Tap to zoom"
                        data-zoomable="true"
                        className="w-9 h-9 rounded-full object-cover border-2 border-[#ed1b2e] cursor-zoom-in hover:opacity-90"
                      />
                      <span className="text-[11px] font-bold text-[#ed1b2e]">
                        ✓ Photo ready
                      </span>
                    </div>
                  )}

                  {/* Assistant Conversational Text */}
                  {msg.text && (
                    <div className="text-xs sm:text-sm text-slate-700 leading-relaxed whitespace-pre-line break-words">
                      {formatInlineBoldC1(msg.text)}
                    </div>
                  )}

                  {/* Step 1 Inline Choice Buttons ("Upload an image" | "Create a custom image") */}
                  {renderMessageActions && renderMessageActions(msg, handlePrefill)}

                  {/* Clean Generated Image + Optional Outreach Copy + Share/Submit */}
                  {renderAssistantArtifact && msg.artifact && renderAssistantArtifact(msg)}

                  {/* Compact Small Prompt Pills — Shown only on the latest assistant message */}
                  {msg.id === latestFollowUpMsgId && msg.followUps && msg.followUps.length > 0 && (() => {
                    const isWorkPill = (p) => {
                      if (p.group === "work" || p.category === "work") return true;
                      if (p.group === "craft" || p.category === "craft") return false;
                      const lbl = (p.label || "").toLowerCase();
                      return /\b(outreach|client|calendar|festive|brand|banner|whatsapp|card|关怀|日历|贺卡|横幅|penjenamaan|kad|வாழ்த்து|பண்டிகை|பிராண்டிங்|அட்டை)\b/i.test(lbl);
                    };
                    const workPills = msg.followUps.filter(isWorkPill);
                    const craftPills = msg.followUps.filter((p) => !isWorkPill(p));

                    return (
                      <div className="pt-2.5 border-t border-slate-200 space-y-2.5">
                        <div className="text-[11px] text-slate-500 font-medium">
                          ✎ {pillHint}
                        </div>

                        {craftPills.length > 0 && (
                          <div className="space-y-1.5">
                            <div className="text-[10px] font-extrabold uppercase tracking-wider text-[#ed1b2e] flex items-center gap-1.5">
                              <span>🎨</span>
                              <span>{craftSectionTitle}</span>
                            </div>
                            <div className="flex flex-wrap gap-1.5">
                              {craftPills.map((fup, fIdx) => {
                                const isActive =
                                  (inputText || "").trim() === (fup.prompt || "").trim();
                                return (
                                  <button
                                    key={`c_${fIdx}`}
                                    type="button"
                                    disabled={isStreaming}
                                    onClick={() => handlePrefill(fup.prompt)}
                                    className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-full active:scale-95 border text-[11px] sm:text-xs font-semibold transition-all shadow-sm ${
                                      isActive
                                        ? "bg-emerald-50 text-emerald-950 border-emerald-500"
                                        : "bg-white hover:bg-[#ed1b2e] text-[#ed1b2e] hover:text-white border-[#ed1b2e]/60 hover:border-[#ed1b2e]"
                                    }`}
                                    title="Tap to load this sample prompt (replaces current prompt)"
                                  >
                                    <span>{isActive ? `✓ ${fup.label}` : fup.label}</span>
                                  </button>
                                );
                              })}
                            </div>
                          </div>
                        )}

                        {workPills.length > 0 && (
                          <div className="space-y-1.5 pt-2 border-t border-slate-100">
                            <div className="text-[10px] font-extrabold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                              <span>💼</span>
                              <span>{workSectionTitle}</span>
                            </div>
                            <div className="flex flex-wrap gap-1.5">
                              {workPills.map((fup, fIdx) => {
                                const isActive =
                                  (inputText || "").trim() === (fup.prompt || "").trim();
                                return (
                                  <button
                                    key={`w_${fIdx}`}
                                    type="button"
                                    disabled={isStreaming}
                                    onClick={() => handlePrefill(fup.prompt)}
                                    className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-full active:scale-95 border text-[11px] sm:text-xs font-semibold transition-all shadow-sm ${
                                      isActive
                                        ? "bg-emerald-50 text-emerald-950 border-emerald-500"
                                        : "bg-white hover:bg-red-50 text-slate-800 hover:text-[#ed1b2e] border-slate-300 hover:border-[#ed1b2e]"
                                    }`}
                                    title="Tap to load this sample prompt (replaces current prompt)"
                                  >
                                    <span>{isActive ? `✓ ${fup.label}` : fup.label}</span>
                                  </button>
                                );
                              })}
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })()}
                </div>
              </div>
            )
          )}

          {/* Streaming / Generating Indicator Bubble */}
          {isStreaming && (
            <div className="flex items-start gap-2.5 animate-pulse">
              <div className="w-7 h-7 rounded-full bg-[#ed1b2e] text-white text-xs font-extrabold flex items-center justify-center shrink-0">
                ✨
              </div>
              <div className="flex-1 bg-white border border-red-200 rounded-2xl rounded-tl-sm p-3.5 space-y-2 shadow-sm">
                <div className="text-xs font-extrabold text-[#ed1b2e]">{streamingLabel}</div>
                <div className="h-1.5 w-44 bg-slate-200 rounded-full overflow-hidden">
                  <div className="h-full w-2/3 bg-[#ed1b2e] rounded-full" />
                </div>
              </div>
            </div>
          )}

          <div ref={chatBottomRef} />
        </div>

        {/* Optional Error / Sticky Bar */}
        {stickySubmitBar && (
          <div className="px-3 py-2 bg-red-50 border-t border-red-200">
            {stickySubmitBar}
          </div>
        )}

        {/* Bottom Chat Prompt Composer — Hidden on Step 1 until user picks Upload or Create Custom */}
        {!hideComposer && (
          <div className="p-3 bg-white border-t border-slate-200 space-y-2">
            {composerAttachmentStrip}

            <div className="flex items-end gap-2">
              <textarea
                ref={textareaRef}
                rows={dynamicRows}
                value={inputText}
                onChange={(e) => onInputChange && onInputChange(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    if (inputText.trim() && !isStreaming) {
                      onSendMessage && onSendMessage();
                    }
                  }
                }}
                placeholder={inputPlaceholder}
                style={{ fontSize: "16px" }}
                className={`flex-1 min-w-0 bg-slate-50 border-2 rounded-xl px-4 py-3 text-slate-900 placeholder-slate-400 focus:outline-none leading-snug resize-y text-sm sm:text-base transition-all ${
                  flashComposer
                    ? "border-[#ed1b2e] ring-2 ring-[#ed1b2e]/30 bg-red-50/30"
                    : "border-slate-300 focus:border-[#ed1b2e] focus:bg-white"
                }`}
              />
              <button
                type="button"
                disabled={isStreaming || !inputText.trim()}
                onClick={() => onSendMessage && onSendMessage()}
                className="h-[52px] px-4 sm:px-5 rounded-xl bg-[#ed1b2e] hover:bg-[#c8102e] disabled:opacity-40 text-white font-extrabold text-xs sm:text-sm shadow-md shadow-red-600/20 shrink-0 flex items-center justify-center gap-1.5 transition-all"
              >
                <span>Send</span>
                <span>➤</span>
              </button>
            </div>

            {composerLeftActions && (
              <div className="flex items-center justify-between gap-2 overflow-x-auto">
                {composerLeftActions}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

/* ----------------------------------------------------------------------------
   2. CHALLENGE 1 GUIDED PILLS & UPLOAD / CAMERA MODAL
   ---------------------------------------------------------------------------- */

function getPostPhotoPillsC1(lang) {
  if (lang === "zh-CN") {
    return [
      {
        group: "craft",
        label: "👔 高管炭灰西装",
        prompt: "将我的照片生成一张高管影棚形象照：身穿修身炭灰西装、白衬衫与红真丝袋巾，背景是吉隆坡双峰塔黄昏落地窗。",
      },
      {
        group: "craft",
        label: "☕ 亲和财富顾问",
        prompt: "将我的照片生成一张温和亲切的高端财富顾问形象照：身穿米色休闲西装，背景是明亮阳光的私人会客厅。",
      },
      {
        group: "craft",
        label: "🏙️ 福布斯领袖风范",
        prompt: "将我的照片生成一张《福布斯》封面风格的高管领袖形象照：身穿深蓝定制三件套西装，背景为吉隆坡 TRX 现代高管会议室。",
      },
      {
        group: "work",
        label: "🤝 客户里程碑贺卡",
        prompt: "设计一张庆祝新生宝宝诞生的温馨香槟金纪念贺卡（融入我的头像徽章）。",
      },
      {
        group: "work",
        label: "🧧 新春尊尚贺卡 (CNY)",
        prompt: "设计一张红金配色的新春尊尚贺卡，融入梅花、双峰塔天际线与我的头像徽章。",
      },
      {
        group: "work",
        label: "🌙 开斋节尊尚贺卡 (Hari Raya)",
        prompt: "设计一张翡翠绿与拉丝金配色的开斋节（Hari Raya Aidilfitri）尊尚贺卡，搭配传统油灯、宋吉锦纹样与我的头像徽章。",
      },
      {
        group: "work",
        label: "🪔 屠妖节祈福贺卡 (Diwali)",
        prompt: "设计一张奢华排灯节（Deepavali/Diwali）点灯贺卡，配金色油灯、传统蓝金图腾与我的头像徽章。",
      },
      {
        group: "work",
        label: "💼 个人品牌横幅",
        prompt: "用我的形象照生成一张吉隆坡双峰塔金色黄昏天际线风格的个人品牌横幅。",
      },
    ];
  }

  if (lang === "zh-TW" || lang === "yue") {
    return [
      {
        group: "craft",
        label: "👔 高管西裝形象照",
        prompt: "將我的照片重塑為高管影棚形象照：炭灰訂製西裝配白襯衫，背景為吉隆坡雙峰塔黃昏落地窗。",
      },
      {
        group: "craft",
        label: "☕ 親和財富顧問",
        prompt: "將我的照片重塑為溫和親切的高端財富顧問形象照：米色休閒西裝配明亮陽光會客廳。",
      },
      {
        group: "craft",
        label: "🏙️ 福布斯領袖大片",
        prompt: "將我的照片重塑為《福布斯》封面風格的高管領袖形象照：深藍訂製三件套西裝，背景為吉隆坡 TRX 現代高管會議室。",
      },
      {
        group: "work",
        label: "🤝 客戶里程碑紀念卡",
        prompt: "製作一張慶祝新生兒誕生的香檳金紀念賀卡（融入我的頭像徽章）。",
      },
      {
        group: "work",
        label: "🧧 新春尊尚賀卡 (CNY)",
        prompt: "製作一張紅金新春尊尚賀卡，融入梅花、雙峰塔天際線與我的頭像徽章。",
      },
      {
        group: "work",
        label: "🌙 開齋節尊尚賀卡 (Hari Raya)",
        prompt: "設計一張翡翠綠配拉絲金嘅開齋節（Hari Raya Aidilfitri）尊尚賀卡，融入傳統油燈、宋吉錦紋樣與我的頭像徽章。",
      },
      {
        group: "work",
        label: "🪔 屠妖節祈福賀卡 (Diwali)",
        prompt: "製作一張奢華排燈節（Deepavali/Diwali）點燈賀卡，搭配金色彩繪油燈圖騰與我的頭像徽章。",
      },
      {
        group: "work",
        label: "💼 個人品牌橫幅",
        prompt: "生成一張雙峰塔黃昏天際線風格的高管個人品牌橫幅（融入我的頭像徽章）。",
      },
    ];
  }

  if (lang === "ms") {
    return [
      {
        group: "craft",
        label: "👔 Potret Eksekutif",
        prompt: "Transformasikan foto saya menjadi potret studio eksekutif memakai sut kelabu gelap berlatarkan Menara Berkembar KLCC waktu senja.",
      },
      {
        group: "craft",
        label: "☕ Potret Penasihat Mesra",
        prompt: "Transformasikan foto saya menjadi potret penasihat kewangan mesra memakai blazer santai cerah di ruang istirehat moden.",
      },
      {
        group: "craft",
        label: "🏙️ Potret Pemimpin Forbes",
        prompt: "Transformasikan foto saya menjadi potret studio eksekutif bergaya Forbes memakai sut biru diraja berlatarkan menara TRX Kuala Lumpur.",
      },
      {
        group: "work",
        label: "🤝 Kad Fokus Pelanggan",
        prompt: "Hasilkan kad ucapan mewah sambutan kelahiran cahaya mata baharu dengan lencana potret saya.",
      },
      {
        group: "work",
        label: "🧧 Kad Tahun Baru Cina (CNY)",
        prompt: "Hasilkan kad ucapan Tahun Baru Cina warna merah & emas bersama Menara KLCC dan lencana potret saya.",
      },
      {
        group: "work",
        label: "🌙 Kad Hari Raya Aidilfitri",
        prompt: "Hasilkan kad ucapan Hari Raya Aidilfitri zamrud & emas bersama pelita, corak songket, dan lencana potret saya.",
      },
      {
        group: "work",
        label: "🪔 Kad Pesta Deepavali (Diwali)",
        prompt: "Hasilkan kad ucapan Pesta Cahaya Deepavali mewah dengan lampu pelita emas diyas, corak rangoli, dan lencana potret saya.",
      },
      {
        group: "work",
        label: "💼 Penjenamaan Peribadi",
        prompt: "Jana sepanduk penjenamaan peribadi eksekutif berlatarkan langit senja Kuala Lumpur dengan lencana potret saya.",
      },
    ];
  }

  if (lang === "ta") {
    return [
      {
        group: "craft",
        label: "👔 நிர்வாகக் கோட் தோற்றம்",
        prompt: "எனது புகைப்படத்தை கோலாலம்பூர் இரட்டை கோபுர (KLCC) மாலை நேர பின்னணியில் நேர்த்தியான சாம்பல் நிற கோட் அணிந்த நிர்வாக உருவப்படமாக மாற்றவும்.",
      },
      {
        group: "craft",
        label: "☕ அன்பான ஆலோசகர் தோற்றம்",
        prompt: "எனது புகைப்படத்தை நவீன செல்வ ஆலோசனை அறையில் வெளிர் நிற பிளேசர் அணிந்த நட்பான நிதி ஆலோசகர் உருவப்படமாக மாற்றவும்.",
      },
      {
        group: "craft",
        label: "🏙️ ஃபோர்ப்ஸ் தலைவர் தோற்றம்",
        prompt: "எனது புகைப்படத்தை கோலாலம்பூர் TRX வானளாவிய கட்டிடங்களின் பின்னணியில் நீல நிற சூட் அணிந்த ஃபோர்ப்ஸ் பாணி தலைவர் படமாக மாற்றவும்.",
      },
      {
        group: "work",
        label: "🤝 வாடிக்கையாளர் வாழ்த்து அட்டை",
        prompt: "புதிய குழந்தை பிறப்பைக் கொண்டாடும் ஆடம்பர வாழ்த்து அட்டையை எனது உருவப்பட பேட்ஜுடன் உருவாக்கவும்.",
      },
      {
        group: "work",
        label: "🧧 சீனப் புத்தாண்டு வாழ்த்து அட்டை",
        prompt: "எனது உருவப்பட பேட்ஜுடன் சிவப்பு மற்றும் தங்க நிற சீனப் புத்தாண்டு (CNY) வாழ்த்து அட்டையை உருவாக்கவும்.",
      },
      {
        group: "work",
        label: "🌙 ஹரி ராயா வாழ்த்து அட்டை",
        prompt: "எனது உருவப்பட பேட்ஜுடன் மரகதப் பச்சை மற்றும் தங்க நிற ஹரி ராயா (Hari Raya Aidilfitri) வாழ்த்து அட்டையை உருவாக்கவும்.",
      },
      {
        group: "work",
        label: "🪔 தீபாவளி பண்டிகை வாழ்த்து அட்டை",
        prompt: "எனது உருவப்பட பேட்ஜுடன் அழகான அகல் விளக்குகள் மற்றும் ரங்கோலி கோலத்துடன் கூடிய தீபாவளி நல்வாழ்த்து அட்டையை உருவாக்கவும்.",
      },
      {
        group: "work",
        label: "💼 தனிப்பட்ட பிராண்டிங் பேனர்",
        prompt: "கோலாலம்பூர் மாலை நேர பின்னணியில் எனது உருவப்பட பேட்ஜுடன் கூடிய தனிப்பட்ட பிராண்டிங் பேனரை உருவாக்கவும்.",
      },
    ];
  }

  return [
    {
      group: "craft",
      label: "👔 Executive Charcoal Suit",
      prompt: "Transform my photo into an executive studio headshot wearing a tailored charcoal suit and crisp white shirt against the Kuala Lumpur skyline at golden hour.",
    },
    {
      group: "craft",
      label: "☕ Warm Advisor Portrait",
      prompt: "Transform my photo into a warm, approachable portrait wearing a smart-casual beige blazer and crisp open-collar white shirt in a sunlit private wealth lounge.",
    },
    {
      group: "craft",
      label: "🏙️ Forbes Studio Leader",
      prompt: "Transform my photo into a Forbes-style executive studio portrait in a sharp tailored royal-navy suit overlooking the modern Kuala Lumpur TRX skyscraper skyline.",
    },
    {
      group: "work",
      label: "🤝 Client Milestone Card",
      prompt: "Put my studio portrait onto a champagne-ivory & brushed gold Client Milestone greeting card celebrating a newborn baby.",
    },
    {
      group: "work",
      label: "🧧 Chinese New Year Card",
      prompt: "Put my studio portrait onto a luxury Chinese New Year (CNY) prosperity greeting card in imperial crimson & brushed gold with plum blossoms and the KL skyline.",
    },
    {
      group: "work",
      label: "🌙 Hari Raya Aidilfitri Card",
      prompt: "Put my studio portrait onto an emerald & brushed-gold Hari Raya Aidilfitri greeting card with woven songket patterns and warm pelita lamps.",
    },
    {
      group: "work",
      label: "🪔 Deepavali Festival Card",
      prompt: "Put my studio portrait onto an opulent Deepavali Festival of Lights greeting card with glowing brass diyas and golden rangoli.",
    },
    {
      group: "work",
      label: "💼 Personal Branding Banner",
      prompt: "Put my studio portrait onto a sleek Executive Personal Branding banner overlooking the Kuala Lumpur Petronas Twin Towers at golden hour.",
    },
  ];
}

const UI_COPY_C1 = {
  "zh-CN": {
    briefSteps: [
      { title: "1. 塑造专业形象 (Craft Your Image)", desc: "请先拍照或上传图片，定制专属高管影棚大片。" },
      { title: "2. 让形象为您赋能 (Put Your Image to Work)", desc: "生成形象照后解锁：客户里程碑贺卡、佳节贺卡与个人品牌横幅。" },
    ],
    craftSectionTitle: "1. 塑造专业形象 (Craft Your Image — 第 1 步必选)",
    workSectionTitle: "2. 让形象为您赋能 (Put Your Image to Work)",
    welcome:
      "嗨！👋 我是您的 **AI 形象助手**。\n\n**第 1 步 — 请先拍照或上传一张图片（必须先提供图片才能开始创作）：**",
    photoReadyMsg:
      "照片已就位！🙌 **请先完成第 1 步 — 塑造您的专属高管影棚形象照**（生成形象照后，将自动解锁第 2 步尊尚贺卡与个人品牌横幅）：\n\n点击下方风格标签或自由修改提示词后发送：",
    takePhotoBtn: "拍照",
    uploadImageBtn: "上传图片",
    changePhotoBtn: "更换照片",
    lockedSelfie: "照片已就绪",
    placeholder: "选择上方形象风格标签或输入视觉提示词，先生成您的专属形象照...",
    streaming: "✨ 正在为您生成高清图片...",
    editHint: "点击标签载入提示词，可在下方输入框自由修改后发送：",
    saveImgBtn: "⬇️ 保存图片",
    dictateBtn: "🎙️ 语音",
    listeningBtn: "🔴 聆听中...",
    resetChatBtn: "↺ 重新开始",
    clearBtn: "✕ 清空",
    submitBtn: "🚀 提交作品",
    submittingBtn: "正在提交...",
    submittedBadge: "✓ 挑战 1 已提交至实时总积分榜",
    yourScoreLabel: "🏅 您的挑战 1 得分",
    backToChatBtn: "💬 返回继续创作",
    waitingC2Title: "⏳ 请等待主持人开启挑战 2...",
    waitingC2Sub: "您的挑战 1 成绩已同步至主舞台大屏！主持人开启挑战 2 后，您的手机将自动解锁下一关。",
    criteriaLabels: ["高管品牌形象", "视觉构图质感", "创意提示词巧思"],
  },
  "zh-TW": {
    briefSteps: [
      { title: "1. 塑造專業形象 (Craft Your Image)", desc: "請先影相或上傳圖片，定制專屬高管影棚大片。" },
      { title: "2. 讓形象為您賦能 (Put Your Image to Work)", desc: "生成形象照後解鎖：客戶里程碑賀卡、佳節賀卡與個人品牌橫幅。" },
    ],
    craftSectionTitle: "1. 塑造專業形象 (Craft Your Image — 第 1 步必選)",
    workSectionTitle: "2. 讓形象為您賦能 (Put Your Image to Work)",
    welcome:
      "嗨！👋 我係你嘅 **AI 形象助手**。\n\n**第 1 步 — 請先影相或上傳一張圖片（必須先提供相片先可以開始創作）：**",
    photoReadyMsg:
      "相片已經準備好！🙌 **請先完成第 1 步 — 生成你嘅專屬高管影棚形象照**（生成形象照後，會自動解鎖第 2 步尊尚賀卡與個人品牌橫幅）：\n\n撳下方風格標籤或自由修改提示詞後發送：",
    takePhotoBtn: "影相",
    uploadImageBtn: "上傳圖片",
    changePhotoBtn: "更換相片",
    lockedSelfie: "相片已就緒",
    placeholder: "揀選上方形象風格標籤或輸入視覺提示詞，先生成你嘅專屬形象照...",
    streaming: "✨ 正在為你生成高清圖片...",
    editHint: "撳標籤載入提示詞，可喺下方輸入框自由修改後發送：",
    saveImgBtn: "⬇️ 儲存圖片",
    dictateBtn: "🎙️ 語音",
    listeningBtn: "🔴 聆聽中...",
    resetChatBtn: "↺ 重新開始",
    clearBtn: "✕ 清空",
    submitBtn: "🚀 提交作品",
    submittingBtn: "交緊卷...",
    submittedBadge: "✓ 挑戰 1 已提交至實時總積分榜",
    yourScoreLabel: "🏅 你嘅挑戰 1 得分",
    backToChatBtn: "💬 返去繼續創作",
    waitingC2Title: "⏳ 請等待主持人開啟挑戰 2...",
    waitingC2Sub: "你嘅挑戰 1 分數已經上咗主舞台大螢幕！主持人一開挑戰 2，你部電話就會自動解鎖下一關。",
    criteriaLabels: ["高管品牌形象", "視覺構圖質感", "創意提示詞巧思"],
  },
  ms: {
    briefSteps: [
      { title: "1. Cipta Imej Anda (Craft Your Image)", desc: "Ambil foto atau muat naik imej dahulu untuk menjana potret studio eksekutif anda." },
      { title: "2. Gunakan Imej Anda (Put Your Image to Work)", desc: "Dibuka selepas potret siap: kad perayaan VIP & sepanduk penjenamaan peribadi." },
    ],
    craftSectionTitle: "1. Cipta Imej Anda (Langkah 1: Potret Studio Dahulu)",
    workSectionTitle: "2. Gunakan Imej Anda (Put Your Image to Work)",
    welcome:
      "Hai! 👋 Saya **Pembantu Imej AI** anda.\n\n**Langkah 1 — Sila ambil foto atau muat naik imej terlebih dahulu (imej diperlukan sebelum memulakan):**",
    photoReadyMsg:
      "Terbaik — foto anda sudah sedia! 🙌 **Langkah 1: Cipta Potret Studio Eksekutif anda terlebih dahulu** (Langkah 2 kad ucapan VIP & penjenamaan peribadi akan dibuka sebaik sahaja potret anda siap):\n\nKlik gaya di bawah atau sunting prompt anda:",
    takePhotoBtn: "Ambil foto",
    uploadImageBtn: "Muat naik imej",
    changePhotoBtn: "Tukar foto",
    lockedSelfie: "Foto Sedia",
    placeholder: "Pilih gaya potret di atas atau taip prompt visual anda, kemudian tekan Send...",
    streaming: "✨ Sedang menjana imej anda...",
    editHint: "Klik pil pilihan untuk memuatkan contoh prompt & sunting bebas:",
    saveImgBtn: "⬇️ Simpan",
    dictateBtn: "🎙️ Suara",
    listeningBtn: "🔴 Mendengar...",
    resetChatBtn: "↺ Mula Semula",
    clearBtn: "✕ Kosongkan",
    submitBtn: "🚀 Hantar",
    submittingBtn: "Menghantar...",
    submittedBadge: "✓ CABARAN 1 DIHANTAR KE PAPAN PENDAHULU LANGSUNG",
    yourScoreLabel: "🏅 Markah Cabaran 1 Anda",
    backToChatBtn: "💬 Kembali ke Ruang Sembang",
    waitingC2Title: "⏳ Menunggu Penyampai Memulakan Cabaran 2...",
    waitingC2Sub: "Markah Cabaran 1 anda kini dipaparkan di pentas utama! Cabaran 2 akan dibuka secara automatik sebaik sahaja Penyampai memulakannya.",
    criteriaLabels: ["Jenama Eksekutif", "Komposisi Visual", "Kreativiti Prompt"],
  },
  en: {
    briefSteps: [
      { title: "1. Craft Your Image", desc: "Take a photo or upload an image first, then generate your executive studio portrait." },
      { title: "2. Put Your Image to Work", desc: "Unlocks after Step 1 portrait: VIP greeting cards, festive cards & personal branding banners." },
    ],
    craftSectionTitle: "1. Craft Your Image (Step 1 — Portrait First)",
    workSectionTitle: "2. Put Your Image to Work (Cards & Branding Banners)",
    welcome:
      "Hi! 👋 I'm your **AI Image Assistant**, and I'll guide you step-by-step.\n\n**Step 1 — Please take a photo or upload an image first (an image is required before you can do anything):**",
    photoReadyMsg:
      "Awesome — got your image! 🙌 **First, let's craft your Step 1 Studio Portrait** (Step 2 Greeting Cards & Personal Branding Banners will unlock right after your portrait is generated):\n\nTap a portrait style below or customize your prompt:",
    takePhotoBtn: "Take a photo",
    uploadImageBtn: "Upload an image",
    changePhotoBtn: "Change photo",
    lockedSelfie: "Image Ready",
    placeholder: "Tap a portrait style pill or type your visual prompt, then press Send...",
    streaming: "✨ Generating your studio image...",
    editHint: "Tap an option pill to load a sample prompt (replaces current prompt), then edit freely:",
    saveImgBtn: "⬇️ Save",
    dictateBtn: "🎙️ Voice",
    listeningBtn: "🔴 Listening...",
    resetChatBtn: "↺ Start Over",
    clearBtn: "✕ Clear",
    submitBtn: "🚀 Submit",
    submittingBtn: "Submitting...",
    submittedBadge: "✓ CHALLENGE 1 SUBMITTED TO LIVE LEADERBOARD",
    yourScoreLabel: "🏅 Your Challenge 1 Score",
    backToChatBtn: "💬 Back to Chat",
    waitingC2Title: "⏳ Waiting for Presenter to Start Challenge 2...",
    waitingC2Sub: "Your Challenge 1 score is live on the main stage! Challenge 2 will unlock automatically on your phone as soon as the Presenter starts it.",
    criteriaLabels: ["Executive Brand", "Visual Composition", "Creative Prompt Craft"],
  },
  ta: {
    briefSteps: [
      { title: "1. உங்கள் தொழில்முறை தோற்றத்தை உருவாக்குங்கள் (Craft Your Image)", desc: "முதலில் புகைப்படம் எடுக்கவும் அல்லது பதிவேற்றவும், பின்னர் நிர்வாக உருவப்படத்தை உருவாக்கவும்." },
      { title: "2. உங்கள் படத்தை பயன்படுத்துங்கள் (Put Your Image to Work)", desc: "உருவப்படம் தயாரானதும் திறக்கும்: வாழ்த்து அட்டைகள், பண்டிகை அட்டைகள் மற்றும் பிராண்டிங் பேனர்." },
    ],
    craftSectionTitle: "1. உங்கள் தொழில்முறை தோற்றத்தை உருவாக்குங்கள் (படி 1)",
    workSectionTitle: "2. உங்கள் படத்தை பயன்படுத்துங்கள் (Put Your Image to Work)",
    welcome:
      "வணக்கம்! 👋 நான் உங்கள் **AI பட உதவியாளர்**.\n\n**படி 1 — தொடங்குவதற்கு முதலில் புகைப்படம் எடுக்கவும் அல்லது படத்தைப் பதிவேற்றவும்:**",
    photoReadyMsg:
      "அருமை — உங்கள் புகைப்படம் தயார்! 🙌 **முதலில் படி 1: உங்கள் தொழில்முறை உருவப்படத்தை உருவாக்குவோம்** (அதன் பிறகு படி 2 வாழ்த்து அட்டைகள் மற்றும் பிராண்டிங் பேனர் திறக்கும்):",
    takePhotoBtn: "புகைப்படம் எடு",
    uploadImageBtn: "படத்தைப் பதிவேற்று",
    changePhotoBtn: "படத்தை மாற்று",
    lockedSelfie: "புகைப்படம் தயார்",
    placeholder: "மேலே உள்ள உருவப்பட பாணியைத் தேர்ந்தெடுத்து அனுப்பவும்...",
    streaming: "✨ உங்கள் படம் உருவாக்கப்படுகிறது...",
    editHint: "விருப்பத்தைத் தட்டி மாதிரி ப்ராம்ப்டை ஏற்றி சுதந்திரமாகத் திருத்தவும்:",
    saveImgBtn: "⬇️ சேமி",
    dictateBtn: "🎙️ குரல்",
    listeningBtn: "🔴 கேட்கிறது...",
    resetChatBtn: "↺ மீண்டும் தொடங்கு",
    clearBtn: "✕ அழி",
    submitBtn: "🚀 சமர்ப்பி",
    submittingBtn: "சமர்ப்பிக்கிறது...",
    submittedBadge: "✓ சவால் 1 நேரடி தரவரிசைப் பட்டியலில் சமர்ப்பிக்கப்பட்டது",
    yourScoreLabel: "🏅 உங்கள் சவால் 1 மதிப்பெண்",
    backToChatBtn: "💬 உரையாடலுக்குத் திரும்பு",
    waitingC2Title: "⏳ தொகுப்பாளர் சவால் 2-ஐத் தொடங்கும் வரை காத்திருக்கவும்...",
    waitingC2Sub: "உங்கள் சவால் 1 மதிப்பெண் பிரதான திரையில் பதிவாகியுள்ளது! தொகுப்பாளர் சவால் 2-ஐத் தொடங்கியவுடன் உங்கள் திரையில் தானாகத் திறக்கும்.",
    criteriaLabels: ["நிர்வாக பிராண்ட்", "காட்சி அமைப்பு", "ப்ராம்ப்ட் படைப்பாற்றல்"],
  },
};
UI_COPY_C1["yue"] = UI_COPY_C1["zh-TW"];

function getStep1CraftOnlyPillsC1(lang) {
  return getPostPhotoPillsC1(lang).filter((p) => p.group === "craft");
}

function loadCanvasImageC1(src) {
  return new Promise((resolve) => {
    if (!src) return resolve(null);
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => resolve(img);
    img.onerror = () => resolve(null);
    img.src = src;
  });
}

/* Unified Upload File + Live Camera Modal */
function CameraModalC1({ isOpen, onClose, onCapture }) {
  const { useState, useEffect, useRef } = React;
  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const filePickerRef = useRef(null);
  const nativeSelfieRef = useRef(null);
  const [facingMode, setFacingMode] = useState("user");
  const [cameraError, setCameraError] = useState("");

  useEffect(() => {
    if (!isOpen) {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((tr) => tr.stop());
        streamRef.current = null;
      }
      return;
    }

    let active = true;
    async function openStream() {
      setCameraError("");
      try {
        if (streamRef.current) {
          streamRef.current.getTracks().forEach((tr) => tr.stop());
        }
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode, width: { ideal: 960 }, height: { ideal: 960 } },
          audio: false,
        });
        if (!active) {
          stream.getTracks().forEach((tr) => tr.stop());
          return;
        }
        streamRef.current = stream;
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          const p = videoRef.current.play();
          if (p && p.catch) p.catch(() => {});
        }
      } catch (err) {
        setCameraError(
          "Camera preview unavailable — tap 'Take Selfie with Phone Camera' below or 'Choose Photo from Device' above."
        );
      }
    }

    openStream();
    return () => {
      active = false;
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((tr) => tr.stop());
        streamRef.current = null;
      }
    };
  }, [isOpen, facingMode]);

  if (!isOpen) return null;

  const cropSquareAndCapture = (sourceEl, srcW, srcH, mirrorHorizontal) => {
    // Preserve full portrait framing up to 1024px without chopping off hair or forehead
    const maxDim = 1024;
    const scale = Math.min(maxDim / srcW, maxDim / srcH, 1);
    const targetW = Math.round(srcW * scale);
    const targetH = Math.round(srcH * scale);
    const c = document.createElement("canvas");
    c.width = targetW;
    c.height = targetH;
    const ctx = c.getContext("2d");
    if (mirrorHorizontal) {
      ctx.translate(targetW, 0);
      ctx.scale(-1, 1);
    }
    ctx.drawImage(sourceEl, 0, 0, targetW, targetH);
    onCapture(c.toDataURL("image/jpeg", 0.95));
    onClose();
  };

  const handleSnapVideo = () => {
    const v = videoRef.current;
    if (!v || !v.videoWidth) return;
    cropSquareAndCapture(v, v.videoWidth, v.videoHeight, facingMode === "user");
  };

  const handleFileSelected = (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const img = new Image();
      img.onload = () => cropSquareAndCapture(img, img.width, img.height, false);
      img.src = ev.target.result;
    };
    reader.readAsDataURL(file);
    e.target.value = "";
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-slate-900/75 backdrop-blur-sm flex items-center justify-center p-3"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md bg-white border-2 border-[#ed1b2e] rounded-2xl max-h-[90dvh] overflow-y-auto shadow-2xl space-y-3 p-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between gap-2">
          <div>
            <div className="text-sm font-extrabold text-slate-900">Upload or Take a Photo</div>
            <div className="text-[11px] text-slate-500">
              Choose an existing photo or snap one right here
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-red-50 text-slate-600 hover:text-[#ed1b2e] border border-slate-200 font-bold text-sm"
          >
            ✕
          </button>
        </div>

        {/* 1-Click File / Photo Library Upload */}
        <button
          type="button"
          onClick={() => filePickerRef.current && filePickerRef.current.click()}
          className="w-full py-2.5 px-4 rounded-xl bg-white hover:bg-red-50 text-[#ed1b2e] border-2 border-[#ed1b2e] font-extrabold text-xs flex items-center justify-center gap-2 transition-all shadow-sm"
        >
          <span>📁 Choose Photo from Device / Library</span>
        </button>
        <input
          ref={filePickerRef}
          type="file"
          accept="image/*"
          onChange={handleFileSelected}
          className="hidden"
        />
        <input
          ref={nativeSelfieRef}
          type="file"
          accept="image/*"
          capture="user"
          onChange={handleFileSelected}
          className="hidden"
        />

        {cameraError ? (
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-center space-y-3">
            <div className="text-xs text-slate-600 leading-relaxed">{cameraError}</div>
            <button
              type="button"
              onClick={() => nativeSelfieRef.current && nativeSelfieRef.current.click()}
              className="w-full py-2.5 px-4 rounded-xl bg-[#ed1b2e] hover:bg-[#c8102e] text-white font-extrabold text-xs flex items-center justify-center gap-2 shadow-md shadow-red-600/20 transition-all"
            >
              <span>📷 Take Selfie with Phone Camera</span>
            </button>
          </div>
        ) : (
          <>
            <div className="relative rounded-2xl overflow-hidden bg-slate-900 aspect-square max-h-[46dvh] mx-auto border border-slate-300">
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                style={{ transform: facingMode === "user" ? "scaleX(-1)" : "none" }}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex items-center justify-between gap-2 pt-1">
              <button
                type="button"
                onClick={() => setFacingMode((p) => (p === "user" ? "environment" : "user"))}
                className="px-3.5 py-2 rounded-xl bg-white hover:bg-red-50 text-[#ed1b2e] text-xs font-bold border-2 border-[#ed1b2e]"
              >
                🔄 Flip Camera
              </button>

              <button
                type="button"
                onClick={handleSnapVideo}
                className="px-4 py-2.5 rounded-xl bg-[#ed1b2e] hover:bg-[#c8102e] text-white font-extrabold text-xs shadow-md shadow-red-600/20"
              >
                📸 Capture Photo
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

/* ----------------------------------------------------------------------------
   3. CHALLENGE 1 PARTICIPANT VIEW (`window.Challenge1ParticipantView`)
   ---------------------------------------------------------------------------- */

window.Challenge1ParticipantView = function ({
  t,
  lang,
  agentId,
  agentName,
  agentRegion,
  onNext,
  canProceedNext = true,
  fetchArenaState,
  onSandboxPreview,
}) {
  const { useState, useEffect, useRef } = React;
  const ui = UI_COPY_C1[lang] || UI_COPY_C1.en;

  // Step 0 Gate: Chat prompt stays strictly locked until user takes a photo or uploads an image
  const [rawPhoto, setRawPhoto] = useState(null);
  const [isCameraModalOpen, setIsCameraModalOpen] = useState(false);

  const fileInputRef = useRef(null);
  const isStep1Unlocked = Boolean(rawPhoto);

  // Multi-Turn Chat & Artifact State
  const [messages, setMessages] = useState(() => [
    {
      id: "welcome_c1",
      role: "assistant",
      agentName: "AI Image Assistant",
      text: (UI_COPY_C1[lang] || UI_COPY_C1.en).welcome,
      needsStep1Actions: true,
    },
  ]);
  const [inputText, setInputText] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const [isDictating, setIsDictating] = useState(false);

  // Persisted Latest Studio State across turns
  const [studioState, setStudioState] = useState({
    creationMode: "executive_headshot",
    style: "mdrt_keynote",
    occasion: "newborn",
    clientName: "",
    motto: "",
    cardHeadline: "",
    visualPrompt: "",
    aiPortraitDataUrl: null,
    aiCardArtworkDataUrl: null,
    latestArtifact: null,
  });

  const [showBeforeByMsg, setShowBeforeByMsg] = useState({});

  // Submission State
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [submittedSnapshot, setSubmittedSnapshot] = useState(null);
  const [startTime] = useState(Date.now());

  const recognitionRef = useRef(null);

  // Keep greeting messages localized when user switches language
  useEffect(() => {
    const curUi = UI_COPY_C1[lang] || UI_COPY_C1.en;
    setMessages((prev) =>
      prev.map((m) => {
        if (m.id === "welcome_c1") return { ...m, text: curUi.welcome };
        if (m.isPhotoReadyGreeting) {
          return {
            ...m,
            text: curUi.photoReadyMsg,
            followUps: getStep1CraftOnlyPillsC1(lang),
          };
        }
        return m;
      })
    );
    fetch("/api/activity", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: agentId,
        challenge: 1,
        language: lang,
        region: agentRegion,
        status: "💬 Challenge 1: AI Image Assistant",
        agenticStep: "Step 1: Take or Upload Photo",
      }),
    }).catch(() => {});
  }, [lang]);

  // User took a photo or uploaded an image -> reset studio state cleanly & unlock Step 1
  const handlePhotoLocked = (dataUrl) => {
    setRawPhoto(dataUrl);
    setStudioState({
      creationMode: "executive_headshot",
      style: "mdrt_keynote",
      occasion: "newborn",
      clientName: "",
      motto: "",
      cardHeadline: "",
      visualPrompt: "",
      aiPortraitDataUrl: null,
      aiCardArtworkDataUrl: null,
      latestArtifact: null,
    });
    const step1Pills = getStep1CraftOnlyPillsC1(lang);
    if (step1Pills.length > 0) {
      setInputText(step1Pills[0].prompt);
    }
    setMessages((prev) => [
      ...prev,
      {
        id: `photo_ready_${Date.now()}`,
        role: "assistant",
        agentName: "AI Image Assistant",
        isPhotoReadyGreeting: true,
        photoThumb: dataUrl,
        text: ui.photoReadyMsg,
        followUps: step1Pills,
      },
    ]);
  };

  const handleNativeFileUpload = (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const img = new Image();
      img.onload = () => {
        // Preserve full portrait framing up to 1024px without chopping off hair or forehead
        const maxDim = 1024;
        const scale = Math.min(maxDim / img.width, maxDim / img.height, 1);
        const targetW = Math.round(img.width * scale);
        const targetH = Math.round(img.height * scale);
        const c = document.createElement("canvas");
        c.width = targetW;
        c.height = targetH;
        const ctx = c.getContext("2d");
        ctx.drawImage(img, 0, 0, targetW, targetH);
        handlePhotoLocked(c.toDataURL("image/jpeg", 0.95));
      };
      img.src = ev.target.result;
    };
    reader.readAsDataURL(file);
    e.target.value = "";
  };

  const toggleVoiceDictation = () => {
    const SpeechRec = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRec) return;
    if (isDictating && recognitionRef.current) {
      recognitionRef.current.stop();
      setIsDictating(false);
      return;
    }
    const rec = new SpeechRec();
    rec.lang =
      lang === "zh-CN"
        ? "zh-CN"
        : lang === "zh-TW" || lang === "yue"
        ? "zh-HK"
        : lang === "ms"
        ? "ms-MY"
        : lang === "ta"
        ? "ta-MY"
        : "en-MY";
    rec.interimResults = false;
    rec.maxAlternatives = 1;
    recognitionRef.current = rec;
    rec.onstart = () => setIsDictating(true);
    rec.onresult = (ev) => {
      const tr = ev.results?.[0]?.[0]?.transcript || "";
      if (tr) setInputText((p) => (p ? `${p} ${tr}` : tr));
    };
    rec.onerror = () => setIsDictating(false);
    rec.onend = () => setIsDictating(false);
    try {
      rec.start();
    } catch (_) {
      setIsDictating(false);
    }
  };

  const handleResetChat = () => {
    setRawPhoto(null);
    setMessages([
      {
        id: "welcome_c1",
        role: "assistant",
        agentName: "AI Image Assistant",
        text: ui.welcome,
        needsStep1Actions: true,
      },
    ]);
    setStudioState({
      creationMode: "executive_headshot",
      style: "mdrt_keynote",
      occasion: "newborn",
      clientName: "",
      motto: "",
      cardHeadline: "",
      visualPrompt: "",
      aiPortraitDataUrl: null,
      aiCardArtworkDataUrl: null,
      latestArtifact: null,
    });
    setInputText("");
    setSubmitError("");
  };

  const handleSendMessage = async (overridePrompt = null) => {
    if (!rawPhoto) {
      setMessages((prev) => [
        ...prev,
        {
          id: `gate_${Date.now()}`,
          role: "assistant",
          agentName: "AI Image Assistant",
          text: ui.welcome,
          needsStep1Actions: true,
        },
      ]);
      return;
    }
    const promptToSend = (overridePrompt !== null ? overridePrompt : inputText).trim();
    if (!promptToSend || isStreaming) return;
    if (overridePrompt === null) {
      setInputText("");
    }

    const userMsgId = `u_${Date.now()}`;
    const isFirstUserTurn = messages.filter((m) => m.role === "user").length === 0;

    const userMsg = {
      id: userMsgId,
      role: "user",
      text: promptToSend,
      thumbUrl: isFirstUserTurn && rawPhoto ? rawPhoto : null,
    };

    const nextHistory = [...messages, userMsg];
    setMessages(nextHistory);
    setIsStreaming(true);
    setSubmitError("");

    fetch("/api/activity", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: agentId,
        challenge: 1,
        language: lang,
        region: agentRegion,
        status: `✨ Generating image (Turn ${
          nextHistory.filter((m) => m.role === "user").length
        })...`,
        agenticStep: "Generating Studio Image",
      }),
    }).catch(() => {});

    try {
      // Only consider turns AFTER the latest photo upload so changing photos never leaks old turns
      let lastResetIdx = -1;
      for (let i = nextHistory.length - 1; i >= 0; i--) {
        if (nextHistory[i].isPhotoReadyGreeting || nextHistory[i].id === "welcome_c1") {
          lastResetIdx = i;
          break;
        }
      }
      const postPhotoTurns = nextHistory
        .slice(lastResetIdx + 1)
        .filter((m) => !m.isRefusalNotice);
      // Keep only the immediate prior exchange + current user prompt to prevent multi-turn pollution
      const compactHistory = postPhotoTurns
        .slice(-3)
        .map((m) => ({ role: m.role, text: m.text }));

      const res = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: agentId,
          challenge: "1",
          language: lang,
          userMessage: promptToSend,
          chatHistory: compactHistory,
          previousState: {
            creationMode: studioState.creationMode,
            style: studioState.style,
            occasion: studioState.occasion,
            clientName: studioState.clientName,
            motto: studioState.motto,
            cardHeadline: studioState.cardHeadline,
            visualPrompt: studioState.visualPrompt,
            hasExistingVisual: Boolean(studioState.latestArtifact),
            hasAiPortrait: Boolean(studioState.aiPortraitDataUrl),
          },
          agentName: agentName || "",
          region: agentRegion || "",
          hasCustomPhoto: Boolean(rawPhoto),
          photoBase64: rawPhoto,
          prevPortraitDataUrl: studioState.aiPortraitDataUrl || null,
          requirePhotoOrCelebrity: true,
          useStudioAvatar: false,
          seedIndex: 0,
        }),
      });

      if (!res.ok) {
        throw new Error(`Server returned HTTP ${res.status}`);
      }

      const data = await res.json();

      if (data.status === "photo_or_celebrity_required") {
        setMessages((prev) => [
          ...prev,
          {
            id: `a_${Date.now()}`,
            role: "assistant",
            agentName: "AI Image Assistant",
            text: data.assistantReply || data.message,
            needsStep1Actions: true,
          },
        ]);
        setIsStreaming(false);
        return;
      }

      if (data.status === "refused_out_of_scope") {
        const currentFollowUps = Boolean(studioState.aiPortraitDataUrl)
          ? data.suggestedFollowUps || getPostPhotoPillsC1(lang)
          : getStep1CraftOnlyPillsC1(lang);
        setMessages((prev) => [
          ...prev,
          {
            id: `refuse_${Date.now()}`,
            role: "assistant",
            agentName: "AI Image Assistant",
            isRefusalNotice: true,
            text: data.assistantReply || data.message,
            followUps: currentFollowUps,
          },
        ]);
        setIsStreaming(false);
        return;
      }

      const nextMode = data.creationMode || studioState.creationMode || "executive_headshot";
      const nextStyle = data.style || studioState.style || "mdrt_keynote";
      const nextOccasion = data.occasion || studioState.occasion || "newborn";
      const mergedPortrait = data.aiPortraitDataUrl || studioState.aiPortraitDataUrl || null;
      const mergedArtwork = data.copyOnly
        ? studioState.aiCardArtworkDataUrl
        : data.aiCardArtworkDataUrl || null;

      // Pure, clean AI-generated image
      const cleanImageUrl =
        nextMode === "executive_headshot"
          ? mergedPortrait || studioState.latestArtifact?.cleanImageUrl || rawPhoto
          : mergedArtwork || mergedPortrait || studioState.latestArtifact?.cleanImageUrl || rawPhoto;

      const aMsgId = `a_${Date.now()}`;
      const artifactObj = {
        msgId: aMsgId,
        creationMode: nextMode,
        styleKey: nextStyle,
        occasionKey: nextOccasion,
        styleBadge: data.styleBadge || "✨ AI Studio Image",
        cleanImageUrl,
        beforeUrl: rawPhoto || null,
        showCopyBox: false,
        outreachMessage: "",
        linkedinHeadline: data.linkedinHeadline || "",
        judgeFeedback: data.judgeFeedback || "",
        brandScore: data.brandScore || 96,
        personalizationScore: data.personalizationScore || 96,
        craftScore: data.craftScore || 96,
        clientName: nextMode === "outreach_card" ? data.clientName || "" : "",
        motto: nextMode === "brand_banner" ? data.motto || "" : "",
        userPrompt: promptToSend,
      };

      setStudioState({
        creationMode: nextMode,
        style: nextStyle,
        occasion: nextOccasion,
        clientName: nextMode === "outreach_card" ? data.clientName || "" : "",
        motto: nextMode === "brand_banner" ? data.motto || "" : "",
        cardHeadline: nextMode === "outreach_card" ? data.cardHeadline || "" : "",
        visualPrompt: data.visualPrompt || promptToSend,
        aiPortraitDataUrl: mergedPortrait,
        aiCardArtworkDataUrl: nextMode === "executive_headshot" ? null : mergedArtwork,
        latestArtifact: artifactObj,
      });

      const unlockedFollowUps = Boolean(mergedPortrait)
        ? data.suggestedFollowUps || getPostPhotoPillsC1(lang)
        : getStep1CraftOnlyPillsC1(lang);

      setMessages((prev) => [
        ...prev,
        {
          id: aMsgId,
          role: "assistant",
          agentName: "AI Image Assistant",
          turnBadge: `Turn ${data.turnNumber || 1}`,
          text: data.assistantReply || "",
          artifact: artifactObj,
          followUps: unlockedFollowUps,
        },
      ]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          id: `err_${Date.now()}`,
          role: "assistant",
          agentName: "AI Image Assistant",
          text: "⚠️ Temporary connection hiccup reaching the Studio server. Please tap Send again!",
        },
      ]);
    } finally {
      setIsStreaming(false);
    }
  };

  const makeCompactBeforeThumb = async (src) => {
    if (!src || !src.startsWith("data:image/")) return src || null;
    const img = await loadCanvasImageC1(src);
    if (!img) return src;
    const c = document.createElement("canvas");
    c.width = 180;
    c.height = 180;
    const ctx = c.getContext("2d");
    const minDim = Math.min(img.width, img.height);
    ctx.drawImage(
      img,
      (img.width - minDim) / 2,
      (img.height - minDim) / 2,
      minDim,
      minDim,
      0,
      0,
      180,
      180
    );
    return c.toDataURL("image/jpeg", 0.8);
  };

  const handleReplacePillPrompt = (pillPrompt) => {
    const clean = (pillPrompt || "").trim();
    if (!clean) return;
    setInputText(clean);
  };

  const handleSubmitArtifact = async (targetArtifact = null) => {
    const art = targetArtifact || studioState.latestArtifact;
    if (!art || isSubmitting) return;
    setIsSubmitting(true);
    setSubmitError("");

    try {
      const elapsedSec = Math.max(6, Math.round((Date.now() - startTime) / 1000));
      const speedScore = Math.max(85, Math.min(99, 100 - Math.floor(elapsedSec / 6)));

      const bScore = Math.min(99, art.brandScore || 96);
      const pScore = Math.min(99, art.personalizationScore || 96);
      const cScore = Math.min(99, art.craftScore || 96);
      const accuracyScore = Math.min(99, Math.round((bScore + pScore + cScore) / 3));

      const beforeThumb = await makeCompactBeforeThumb(rawPhoto);

      const userTurnTexts = messages
        .filter((m) => m.role === "user")
        .map((m, i) => `Turn ${i + 1}: ${m.text}`);

      const cLabels = ui.criteriaLabels || [
        "Executive Brand",
        "Visual Composition",
        "Creative Prompt Craft",
      ];
      const criteriaMap = {
        [cLabels[0] || "Executive Brand"]: bScore,
        [cLabels[1] || "Visual Composition"]: pScore,
        [cLabels[2] || "Creative Prompt Craft"]: cScore,
      };

      const modeLabelMap = {
        executive_headshot: "AI Studio Portrait",
        outreach_card: "VIP Greeting Card",
        brand_banner: "Personal Branding Banner",
      };

      const subPayload = {
        challenge: "1",
        challengeType: "c1_image_outreach",
        creationMode: art.creationMode,
        title: modeLabelMap[art.creationMode] || "AI Studio Image",
        styleBadge: art.styleBadge,
        userInput: userTurnTexts.slice(-3).join("\n") || art.userPrompt,
        aiOutput: art.userPrompt || modeLabelMap[art.creationMode] || "AI Studio Visual",
        judgeFeedback:
          art.judgeFeedback || "Executive visual craft and sharp studio direction!",
        imageBefore: beforeThumb,
        imageAfter: art.cleanImageUrl,
        rawPortraitUrl: art.cleanImageUrl,
        portraitSvg: art.styleKey,
        motto: art.motto || "",
        pillarScores: criteriaMap,
        hasCustomPhoto: Boolean(rawPhoto || art.cleanImageUrl),
      };

      if (onSandboxPreview) {
        onSandboxPreview({
          ...subPayload,
          speed: speedScore,
          accuracy: accuracyScore,
          total: Math.round((speedScore + accuracyScore) / 2),
          timeSec: elapsedSec,
        });
      }

      const res = await fetch("/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: agentId,
          name: agentName,
          region: agentRegion,
          language: lang,
          challenge: "1",
          speed: speedScore,
          accuracy: accuracyScore,
          timeSec: elapsedSec,
          criteria: criteriaMap,
          judgeFeedback: subPayload.judgeFeedback,
          submission: subPayload,
        }),
      });
      if (!res.ok) {
        throw new Error(`Submit HTTP ${res.status}`);
      }
      await fetchArenaState();
      const totalScore = Math.round((speedScore + accuracyScore) / 2);
      setSubmittedSnapshot({
        ...art,
        speedScore,
        accuracyScore,
        totalScore,
        elapsedSec,
        criteriaMap,
        finalJudgeFeedback: subPayload.judgeFeedback,
      });
      setSubmitted(true);
    } catch (err) {
      setSubmitError("Could not reach Arena server to submit. Please tap Submit again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDownloadUrl = (url, modeName) => {
    if (!url) return;
    const baseName = "AI_Image_" + (modeName || "Studio") + "_" + Date.now();
    if (typeof window.saveArenaMediaMobileSafe === "function") {
      window.saveArenaMediaMobileSafe(url, baseName);
      return;
    }
    fetch(url)
      .then((r) => r.blob())
      .then((blob) => {
        const ext = blob.type && blob.type.includes("png") ? "png" : "jpg";
        const blobUrl = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = blobUrl;
        a.download = `${baseName}.${ext}`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        setTimeout(() => {
          URL.revokeObjectURL(blobUrl);
        }, 30000);
      })
      .catch(() => {
        const a = document.createElement("a");
        a.href = url;
        a.download = `${baseName}.jpg`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      });
  };

  // Step 1: Image-first gate — Take a photo OR Upload an image
  const renderMessageActions = (msg) => {
    if (!msg.needsStep1Actions || isStep1Unlocked) return null;
    return (
      <div className="flex flex-wrap items-center gap-2 pt-1.5">
        <button
          type="button"
          onClick={() => setIsCameraModalOpen(true)}
          className="px-4 py-2 rounded-full bg-[#ed1b2e] hover:bg-[#c8102e] text-white font-extrabold text-xs shadow-md shadow-red-600/20 transition-all"
        >
          📸 {ui.takePhotoBtn || "Take a photo"}
        </button>
        <button
          type="button"
          onClick={() => fileInputRef.current && fileInputRef.current.click()}
          className="px-4 py-2 rounded-full bg-white hover:bg-red-50 text-[#ed1b2e] font-extrabold text-xs border-2 border-[#ed1b2e] shadow-sm transition-all"
        >
          📤 {ui.uploadImageBtn || "Upload an image"}
        </button>
      </div>
    );
  };

  // Render JUST the clean generated image + Original toggle + Save + Submit
  const renderArtifactCard = (msg) => {
    const art = msg.artifact;
    if (!art) return null;
    const showingBefore = Boolean(showBeforeByMsg[msg.id]);

    const displayedImg =
      showingBefore && art.beforeUrl ? art.beforeUrl : art.cleanImageUrl;

    return (
      <div className="space-y-2.5 pt-1">
        {displayedImg && (
          <div
            className={`relative mx-auto ${
              art.creationMode === "executive_headshot"
                ? "max-w-[300px] sm:max-w-[340px]"
                : "max-w-full sm:max-w-[460px]"
            }`}
          >
            <div className="relative group">
              <img
                src={displayedImg}
                alt={showingBefore ? "Original Uploaded Photo" : "Generated AI Image"}
                title="Tap to zoom"
                data-zoomable="true"
                className="w-full rounded-2xl border-2 border-slate-200 shadow-lg block cursor-zoom-in"
              />
              <button
                type="button"
                onClick={() =>
                  window.openArenaImageZoom &&
                  window.openArenaImageZoom(
                    displayedImg,
                    showingBefore ? "Original Uploaded Photo" : "Generated AI Image"
                  )
                }
                className="absolute bottom-2.5 right-2.5 px-2.5 py-1 rounded-full bg-slate-900/75 hover:bg-[#ed1b2e] text-white text-[10px] font-bold backdrop-blur-sm shadow-md transition-colors"
              >
                🔍 Tap to zoom
              </button>
            </div>
            <div className="flex flex-wrap items-center justify-end gap-1.5 mt-2">
              {art.creationMode === "executive_headshot" &&
                art.cleanImageUrl &&
                (studioState.aiPortraitDataUrl === art.cleanImageUrl ? (
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-emerald-50 text-emerald-800 border border-emerald-400">
                    ✓ Active Portrait
                  </span>
                ) : (
                  <button
                    type="button"
                    onClick={() =>
                      setStudioState((prev) => ({
                        ...prev,
                        aiPortraitDataUrl: art.cleanImageUrl,
                        style: art.styleKey || prev.style,
                      }))
                    }
                    className="px-3 py-1 rounded-full text-[10px] font-bold bg-white hover:bg-emerald-50 text-emerald-700 border border-emerald-500 shadow-sm"
                  >
                    ✓ Use This Portrait
                  </button>
                ))}
              {art.beforeUrl && (
                <button
                  type="button"
                  onClick={() =>
                    setShowBeforeByMsg((p) => ({ ...p, [msg.id]: !p[msg.id] }))
                  }
                  className="px-3 py-1 rounded-full text-[10px] font-bold bg-white hover:bg-red-50 text-slate-700 hover:text-[#ed1b2e] border border-slate-300 hover:border-[#ed1b2e] shadow-sm"
                >
                  {showingBefore ? "✨ Show AI Image" : "👀 Original Photo"}
                </button>
              )}
              <button
                type="button"
                onClick={() => handleDownloadUrl(art.cleanImageUrl, art.creationMode)}
                className="px-3 py-1 rounded-full text-[10px] font-bold bg-white hover:bg-red-50 text-[#ed1b2e] border border-[#ed1b2e] shadow-sm"
              >
                {ui.saveImgBtn}
              </button>
            </div>
          </div>
        )}

        <div className="pt-1">
          <button
            type="button"
            disabled={isSubmitting}
            onClick={() => handleSubmitArtifact(art)}
            className="w-full py-2.5 px-4 rounded-xl bg-[#ed1b2e] hover:bg-[#c8102e] disabled:opacity-50 text-white font-extrabold text-xs shadow-md shadow-red-600/20 transition-all"
          >
            {isSubmitting ? (ui.submittingBtn || "Submitting...") : (ui.submitBtn || "🚀 Submit")}
          </button>
        </div>
      </div>
    );
  };

  if (submitted) {
    const totalPts = submittedSnapshot?.totalScore || 96;
    const spdPts = submittedSnapshot?.speedScore || 94;
    const accPts = submittedSnapshot?.accuracyScore || 97;
    const secTaken = submittedSnapshot?.elapsedSec || 18;
    const critMap = submittedSnapshot?.criteriaMap || {};
    const jFeedback =
      submittedSnapshot?.finalJudgeFeedback ||
      submittedSnapshot?.judgeFeedback ||
      "Executive visual craft and sharp studio direction!";

    return (
      <div className="bg-white border-t-4 border-t-[#ed1b2e] border-x border-b border-slate-200 rounded-2xl p-5 sm:p-6 text-center space-y-4 shadow-xl">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-red-50 border border-red-200 text-[#ed1b2e] text-xs font-extrabold">
          {ui.submittedBadge || "✓ CHALLENGE 1 SUBMITTED TO LIVE LEADERBOARD"}
        </div>
        <h3 className="text-xl font-extrabold text-slate-900">{t.submittedTitle}</h3>
        <p className="text-xs text-slate-600">{t.submittedSub}</p>

        {/* Live Challenge 1 Score Breakdown Box */}
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-3 text-left">
          <div className="flex items-center justify-between border-b border-slate-200 pb-2.5">
            <div>
              <div className="text-[11px] font-extrabold uppercase tracking-wider text-slate-500">
                {ui.yourScoreLabel || "🏅 Your Challenge 1 Score"}
              </div>
              <div className="text-xs font-bold text-slate-700 mt-0.5">
                ⚡ {spdPts}% {t.speed || "Speed"} • 🎯 {accPts}% {t.accuracy || "Quality"} ({secTaken}s)
              </div>
            </div>
            <div className="text-right">
              <span className="text-3xl font-extrabold text-[#ed1b2e]">{totalPts}</span>
              <span className="text-xs text-slate-500 font-bold"> / 100 pts</span>
            </div>
          </div>

          {Object.keys(critMap).length > 0 && (
            <div className="grid grid-cols-3 gap-2 text-center">
              {Object.entries(critMap).map(([k, v]) => (
                <div key={k} className="bg-white border border-slate-200 rounded-xl p-2 shadow-sm">
                  <div className="text-[10px] font-bold text-slate-500 truncate">{k}</div>
                  <div className="text-sm font-extrabold text-[#ed1b2e] mt-0.5">{v}%</div>
                </div>
              ))}
            </div>
          )}

          <div className="text-xs text-slate-800 bg-red-50/60 p-2.5 rounded-xl border border-red-200">
            💡 <strong className="text-[#ed1b2e]">AI Judge:</strong> {jFeedback}
          </div>
        </div>

        {submittedSnapshot?.cleanImageUrl && (
          <img
            src={submittedSnapshot.cleanImageUrl}
            alt="Submitted AI Image"
            title="Tap to zoom"
            data-zoomable="true"
            className="w-56 mx-auto rounded-2xl border-2 border-[#ed1b2e] shadow-lg cursor-zoom-in"
          />
        )}

        <div className="flex flex-wrap justify-center gap-2">
          <button
            type="button"
            onClick={() => setSubmitted(false)}
            className="px-4 py-2 rounded-full bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 text-xs font-bold shadow-sm"
          >
            {ui.backToChatBtn || "💬 Back to Chat"}
          </button>
          {submittedSnapshot?.cleanImageUrl && (
            <button
              type="button"
              onClick={() =>
                handleDownloadUrl(
                  submittedSnapshot.cleanImageUrl,
                  submittedSnapshot.creationMode
                )
              }
              className="px-4 py-2 rounded-full bg-white hover:bg-red-50 text-[#ed1b2e] border border-[#ed1b2e] text-xs font-bold shadow-sm"
            >
              {ui.saveImgBtn}
            </button>
          )}
        </div>

        {canProceedNext ? (
          <button
            type="button"
            onClick={onNext}
            className="w-full py-3.5 px-4 bg-[#ed1b2e] hover:bg-[#c8102e] text-white font-extrabold rounded-xl shadow-md shadow-red-600/20 text-sm"
          >
            {t.nextMission} (14:20 Master the Art of AI Dialogue)
          </button>
        ) : (
          <div className="bg-red-50/80 border-2 border-[#ed1b2e]/40 rounded-2xl p-4 space-y-1.5 text-center">
            <div className="flex items-center justify-center gap-2 text-xs font-extrabold text-[#ed1b2e]">
              <span className="w-2.5 h-2.5 rounded-full bg-[#ed1b2e] animate-ping" />
              <span>{ui.waitingC2Title || "⏳ Waiting for Presenter to Start Challenge 2..."}</span>
            </div>
            <p className="text-[11px] text-slate-600 leading-relaxed">
              {ui.waitingC2Sub ||
                "Your Challenge 1 score is live on the main stage! Challenge 2 will unlock automatically on your phone as soon as the Presenter starts it."}
            </p>
          </div>
        )}
      </div>
    );
  }

  // Compact 1-line status bar above the unlocked composer so user can switch/upload a photo anytime
  const compactAttachmentStrip = (
    <div className="flex flex-wrap items-center justify-between gap-2 px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-[11px]">
      <div className="flex items-center gap-2 min-w-0">
        {rawPhoto && (
          <img
            src={rawPhoto}
            alt="Locked Selfie Photo"
            title="Tap to zoom"
            data-zoomable="true"
            className="w-6 h-6 rounded-full object-cover border-2 border-[#ed1b2e] shrink-0 cursor-zoom-in hover:opacity-90"
          />
        )}
        <span className="font-bold text-slate-800 truncate">✓ {ui.lockedSelfie}</span>
      </div>
      <div className="flex items-center gap-1.5 shrink-0">
        <button
          type="button"
          onClick={() => setIsCameraModalOpen(true)}
          className="px-2.5 py-0.5 rounded-full bg-white hover:bg-red-50 text-[#ed1b2e] border border-[#ed1b2e] font-bold text-[10px]"
        >
          📸 {ui.takePhotoBtn || "Camera"}
        </button>
        <button
          type="button"
          onClick={() => fileInputRef.current && fileInputRef.current.click()}
          className="px-2.5 py-0.5 rounded-full bg-white hover:bg-red-50 text-[#ed1b2e] border border-[#ed1b2e] font-bold text-[10px]"
        >
          📤 {ui.changePhotoBtn}
        </button>
      </div>
    </div>
  );

  const composerTools = (
    <>
      <div className="flex items-center gap-1.5 shrink-0">
        {(window.SpeechRecognition || window.webkitSpeechRecognition) && (
          <button
            type="button"
            onClick={toggleVoiceDictation}
            className={`px-3 py-1 rounded-full text-[11px] font-bold border shrink-0 ${
              isDictating
                ? "bg-[#ed1b2e] text-white border-[#ed1b2e] animate-pulse"
                : "bg-white hover:bg-red-50 text-slate-700 hover:text-[#ed1b2e] border-slate-300"
            }`}
          >
            {isDictating ? ui.listeningBtn : ui.dictateBtn}
          </button>
        )}
        {inputText && inputText.trim() && (
          <button
            type="button"
            onClick={() => setInputText("")}
            className="px-2.5 py-1 rounded-full bg-white hover:bg-red-50 text-slate-500 hover:text-[#ed1b2e] text-[10px] font-bold border border-slate-200 hover:border-[#ed1b2e] shrink-0"
          >
            {ui.clearBtn || "🗑️ Clear"}
          </button>
        )}
      </div>
      <button
        type="button"
        onClick={handleResetChat}
        className="px-3 py-1 rounded-full bg-white hover:bg-red-50 text-slate-600 hover:text-[#ed1b2e] text-[11px] font-bold border border-slate-300 hover:border-[#ed1b2e] shrink-0"
      >
        {ui.resetChatBtn}
      </button>
    </>
  );

  const stickySubmit = submitError ? (
    <div className="text-xs text-[#ed1b2e] bg-red-50 border border-red-200 rounded-lg px-2.5 py-1 font-bold">
      ⚠️ {submitError}
    </div>
  ) : null;

  return (
    <>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleNativeFileUpload}
        className="hidden"
      />

      <window.PAMBChatShell
        badgeLeft="14:00 – 14:20 • CHALLENGE 1"
        badgeRight="✨ AI Image Assistant"
        regionLabel=""
        title={t.c1Title}
        subtitle={t.c1Sub}
        briefSteps={ui.briefSteps}
        scenarioText={t.c1Scenario}
        messages={messages}
        isStreaming={isStreaming}
        streamingLabel={ui.streaming}
        hideComposer={!isStep1Unlocked}
        inputText={inputText}
        onInputChange={setInputText}
        onPrefillPrompt={handleReplacePillPrompt}
        onSendMessage={handleSendMessage}
        inputPlaceholder={ui.placeholder}
        composerAttachmentStrip={compactAttachmentStrip}
        composerLeftActions={composerTools}
        renderMessageActions={renderMessageActions}
        renderAssistantArtifact={renderArtifactCard}
        stickySubmitBar={stickySubmit}
        pillHint={ui.editHint}
        craftSectionTitle={ui.craftSectionTitle}
        workSectionTitle={ui.workSectionTitle}
      />

      <CameraModalC1
        isOpen={isCameraModalOpen}
        onClose={() => setIsCameraModalOpen(false)}
        onCapture={(dataUrl) => handlePhotoLocked(dataUrl)}
      />
    </>
  );
};

// Alias for documentation compatibility
window.Challenge1View = window.Challenge1ParticipantView;
