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
                    alt="Uploaded"
                    className="w-12 h-12 rounded-xl object-cover border-2 border-[#ed1b2e] shadow-sm"
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
                        alt="Your photo"
                        className="w-9 h-9 rounded-full object-cover border-2 border-[#ed1b2e]"
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

                  {/* Compact Small Prompt Pills — Grouped into: 1. Craft Your Image & 2. Put Your Image to Work */}
                  {msg.followUps && msg.followUps.length > 0 && (() => {
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
                                const isActive = (inputText || "").includes(fup.prompt);
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
                                    title="Tap to combine into the prompt box below so you can edit freely"
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
                                const isActive = (inputText || "").includes(fup.prompt);
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
                                    title="Tap to combine into the prompt box below so you can edit freely"
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
        label: "🤝 客户里程碑关怀卡",
        prompt: "让我的形象照为您拓展业务：为刚迎来新生宝宝的客户「拿督陈与夫人」设计一张温馨香槟金贺卡，配一段约咖啡聊教育金的 WhatsApp 问候语。",
      },
      {
        group: "work",
        label: "🧧 新春尊尚贺卡 (CNY)",
        prompt: "把形象转化为新春业务触达：为「拿督陈与夫人」制作一张红金新春尊尚贺卡（含梅花与双峰塔天际线），配一段温暖走心的 WhatsApp 佳节祝福语。",
      },
      {
        group: "work",
        label: "🪔 屠妖节祈福贺卡 (Diwali)",
        prompt: "为高净值客户制作一张奢华排灯节（Deepavali/Diwali）点灯贺卡，配金色蓝宝石油灯与传统蓝金图腾，附一段诚挚的 WhatsApp 节日问候。",
      },
      {
        group: "work",
        label: "💼 个人品牌横幅",
        prompt: "用我的照片生成一张 LinkedIn 与 WhatsApp Business 个人品牌横幅，背景是吉隆坡双峰塔金色黄昏天际线。",
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
        prompt: "讓我的形象照為您拓展業務：為剛迎來新生兒的客戶「拿督陳與夫人」製作一張香檳金紀念賀卡，並附一段約咖啡的 WhatsApp 問候訊息。",
      },
      {
        group: "work",
        label: "🧧 新春尊尚賀卡 (CNY)",
        prompt: "把形象轉化為新春業務觸達：為「拿督陳與夫人」製作一張紅金新春尊尚賀卡（含梅花與雙峰塔天際線），配一段溫暖的 WhatsApp 祝福話術。",
      },
      {
        group: "work",
        label: "🪔 屠妖節祈福賀卡 (Diwali)",
        prompt: "為高淨值客戶製作一張奢華排燈節（Deepavali/Diwali）點燈賀卡，搭配金色彩繪油燈圖騰與 WhatsApp 節日問候。",
      },
      {
        group: "work",
        label: "💼 個人品牌橫幅",
        prompt: "生成一張 LinkedIn 與 WhatsApp 個人品牌橫幅，搭配雙峰塔黃昏天際線與我的頭像。",
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
        prompt: "Jana hasil dari foto saya: hasilkan kad tahniah kelahiran cahaya mata baharu buat Dato' & Datin Tan bersama mesej WhatsApp.",
      },
      {
        group: "work",
        label: "🧧 Kad Tahun Baru Cina (CNY)",
        prompt: "Tukar imej kepada sentuhan perniagaan: hasilkan kad ucapan Tahun Baru Cina warna merah & emas bersama Menara KLCC dan ucapan WhatsApp.",
      },
      {
        group: "work",
        label: "🪔 Kad Pesta Deepavali (Diwali)",
        prompt: "Hasilkan kad ucapan Pesta Cahaya Deepavali mewah dengan lampu pelita emas diyas dan corak rangoli bersama mesej WhatsApp santai.",
      },
      {
        group: "work",
        label: "💼 Penjenamaan Peribadi",
        prompt: "Jana sepanduk penjenamaan peribadi LinkedIn & WhatsApp berlatarkan langit senja Kuala Lumpur.",
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
        prompt: "எனது படத்தை வணிகத்திற்குப் பயன்படுத்துக: Dato' & Datin Tan தம்பதியரின் குழந்தை பிறப்பைக் கொண்டாடும் வாழ்த்து அட்டை மற்றும் அன்பான WhatsApp செய்தியை உருவாக்கவும்.",
      },
      {
        group: "work",
        label: "🧧 சீனப் புத்தாண்டு வாழ்த்து அட்டை",
        prompt: "எனது படத்தைக் கொண்டு சிவப்பு மற்றும் தங்க நிற சீனப் புத்தாண்டு (CNY) வாழ்த்து அட்டை மற்றும் WhatsApp வாழ்த்துச் செய்தியை உருவாக்கவும்.",
      },
      {
        group: "work",
        label: "🪔 தீபாவளி பண்டிகை வாழ்த்து அட்டை",
        prompt: "எனது படத்தைக் கொண்டு அழகான அகல் விளக்குகள் மற்றும் ரங்கோலி கோலத்துடன் கூடிய தீபாவளி நல்வாழ்த்து அட்டை மற்றும் WhatsApp செய்தியை உருவாக்கவும்.",
      },
      {
        group: "work",
        label: "💼 தனிப்பட்ட பிராண்டிங் பேனர்",
        prompt: "கோலாலம்பூர் மாலை நேர பின்னணியில் எனது உருவப்படத்துடன் கூடிய LinkedIn மற்றும் WhatsApp தனிப்பட்ட பிராண்டிங் பேனரை உருவாக்கவும்.",
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
      prompt: "Let's put this image to work: create a warm Client-Focused milestone card for Dato' & Datin Tan celebrating their newborn baby, with a friendly WhatsApp coffee invite.",
    },
    {
      group: "work",
      label: "🧧 Chinese New Year Card",
      prompt: "Put my image to work on a luxury Chinese New Year (CNY) prosperity card in imperial crimson & brushed gold with plum blossoms, KL skyline, and warm WhatsApp wishes for Dato' & Datin Tan.",
    },
    {
      group: "work",
      label: "🪔 Deepavali Festival Card",
      prompt: "Put my image to work on an opulent Deepavali Festival of Lights greeting card with glowing brass diyas, golden rangoli, and warm festive WhatsApp wishes for Dato' & Datin Tan.",
    },
    {
      group: "work",
      label: "💼 Personal Branding Banner",
      prompt: "Put this portrait onto a sleek LinkedIn & WhatsApp Personal Branding banner featuring my portrait badge and the Kuala Lumpur skyline at golden hour.",
    },
  ];
}

function getCelebrityPillsC1(lang) {
  if (lang === "zh-CN") {
    return [
      {
        group: "craft",
        label: "🌟 杨紫琼炭灰西装",
        prompt: "使用名人杨紫琼（Michelle Yeoh）生成一张身穿炭灰西装、背景为吉隆坡双峰塔黄昏的高管肖像照。",
      },
      {
        group: "craft",
        label: "🌟 亨利·高汀深蓝西装",
        prompt: "使用名人亨利·高汀（Henry Golding）生成一张身穿深蓝订制三件套西装、背景为吉隆坡双峰塔的高管形象照。",
      },
      {
        group: "craft",
        label: "🌟 亲和顾问会客厅",
        prompt: "使用名人杨紫琼（Michelle Yeoh）生成一张身穿米色休闲西装、背景为阳光私人会客厅的温和财富领袖形象照。",
      },
      {
        group: "work",
        label: "🤝 客户关怀贺卡（名人版）",
        prompt: "使用名人杨紫琼头像，为客户「拿督陈与夫人」设计一张喜迎新生宝宝的温馨香槟金纪念贺卡，配一段 WhatsApp 问候语。",
      },
      {
        group: "work",
        label: "🧧 新春尊尚贺卡 (CNY)",
        prompt: "使用名人杨紫琼头像，设计一张红金配色的吉隆坡双峰塔天际线新春尊尚贺卡与 WhatsApp 祝福语。",
      },
      {
        group: "work",
        label: "🪔 屠妖节祈福贺卡 (Diwali)",
        prompt: "使用名人杨紫琼头像，制作一张奢华排灯节（Deepavali/Diwali）点灯贺卡与 WhatsApp 佳节祝福。",
      },
      {
        group: "work",
        label: "💼 个人品牌横幅（名人版）",
        prompt: "使用名人杨紫琼头像，制作一张吉隆坡双峰塔黄昏天际线风格的 LinkedIn 与 WhatsApp 个人品牌横幅。",
      },
    ];
  }

  if (lang === "zh-TW" || lang === "yue") {
    return [
      {
        group: "craft",
        label: "🌟 楊紫瓊炭灰西裝",
        prompt: "使用名人楊紫瓊（Michelle Yeoh）生成一張身穿炭灰西裝、背景為吉隆坡雙峰塔黃昏的高管肖像照。",
      },
      {
        group: "craft",
        label: "🌟 亨利·高汀深藍西裝",
        prompt: "使用名人亨利·高汀（Henry Golding）生成一張深藍訂製西裝、背景為吉隆坡雙峰塔的高管形象照。",
      },
      {
        group: "craft",
        label: "🌟 親和顧問會客廳",
        prompt: "使用名人楊紫瓊生成一張米色休閒西裝、陽光私人會客廳的溫和財富領袖形象照。",
      },
      {
        group: "work",
        label: "🤝 客戶關懷賀卡",
        prompt: "使用名人楊紫瓊頭像，設計一張祝賀客戶喜迎新生寶寶的香檳金紀念賀卡，並附一段 WhatsApp 問候語。",
      },
      {
        group: "work",
        label: "🧧 新春尊尚賀卡 (CNY)",
        prompt: "使用名人楊紫瓊頭像，設計一張紅金配色的吉隆坡天際線新春尊尚賀卡，並附一段 WhatsApp 祝福語。",
      },
      {
        group: "work",
        label: "🪔 屠妖節祈福賀卡 (Diwali)",
        prompt: "使用名人楊紫瓊頭像，製作一張奢華排燈節（Deepavali/Diwali）點燈賀卡與 WhatsApp 祝福語。",
      },
      {
        group: "work",
        label: "💼 個人品牌橫幅",
        prompt: "使用名人楊紫瓊頭像，製作一張吉隆坡雙峰塔黃昏天際線風格的 LinkedIn 與 WhatsApp 個人品牌橫幅。",
      },
    ];
  }

  if (lang === "ms") {
    return [
      {
        group: "craft",
        label: "🌟 Michelle Yeoh Sut Kelabu",
        prompt: "Gunakan selebriti Michelle Yeoh untuk menghasilkan potret studio eksekutif memakai sut kelabu gelap berlatarkan Menara Berkembar KLCC waktu senja.",
      },
      {
        group: "craft",
        label: "🌟 Henry Golding Sut Biru",
        prompt: "Gunakan selebriti Henry Golding untuk menghasilkan potret studio eksekutif memakai sut biru gelap berlatarkan KLCC.",
      },
      {
        group: "craft",
        label: "🌟 Michelle Yeoh Ruang Mesra",
        prompt: "Gunakan selebriti Michelle Yeoh untuk menghasilkan potret memakai blazer cerah di ruang perbankan peribadi yang mesra.",
      },
      {
        group: "work",
        label: "🤝 Kad Fokus Pelanggan",
        prompt: "Gunakan selebriti Michelle Yeoh untuk menghasilkan kad tahniah kelahiran cahaya mata baharu buat Dato' & Datin Tan bersama mesej WhatsApp.",
      },
      {
        group: "work",
        label: "🧧 Kad Tahun Baru Cina (CNY)",
        prompt: "Gunakan selebriti Michelle Yeoh untuk mereka kad ucapan Tahun Baru Cina merah & emas bersama ucapan WhatsApp.",
      },
      {
        group: "work",
        label: "🪔 Kad Pesta Deepavali (Diwali)",
        prompt: "Gunakan selebriti Michelle Yeoh untuk menghasilkan kad ucapan Deepavali mewah bersama pelita emas diyas dan mesej WhatsApp.",
      },
      {
        group: "work",
        label: "💼 Penjenamaan Peribadi",
        prompt: "Gunakan selebriti Michelle Yeoh untuk menghasilkan sepanduk profil LinkedIn & WhatsApp Business berlatarkan KLCC waktu senja.",
      },
    ];
  }

  if (lang === "ta") {
    return [
      {
        group: "craft",
        label: "🌟 மிஷெல் யோ (Michelle Yeoh) கோட்",
        prompt: "பிரபல நடிகை Michelle Yeoh-வைப் பயன்படுத்தி கோலாலம்பூர் இரட்டை கோபுர பின்னணியில் சாம்பல் நிற கோட் அணிந்த நிர்வாக உருவப்படத்தை உருவாக்கவும்.",
      },
      {
        group: "craft",
        label: "🌟 ஹென்றி கோல்டிங் (Henry Golding) சூட்",
        prompt: "பிரபல நடிகர் Henry Golding-ஐப் பயன்படுத்தி KLCC பின்னணியில் நீல நிற சூட் அணிந்த நிர்வாக உருவப்படத்தை உருவாக்கவும்.",
      },
      {
        group: "craft",
        label: "🌟 அன்பான ஆலோசகர் தோற்றம்",
        prompt: "பிரபல நடிகை Michelle Yeoh-வைப் பயன்படுத்தி நவீன செல்வ ஆலோசனை அறையில் நட்பான நிதி ஆலோசகர் உருவப்படத்தை உருவாக்கவும்.",
      },
      {
        group: "work",
        label: "🤝 வாடிக்கையாளர் வாழ்த்து அட்டை",
        prompt: "Michelle Yeoh உருவப்படத்தைப் பயன்படுத்தி Dato' & Datin Tan தம்பதியரின் குழந்தை பிறப்பைக் கொண்டாடும் வாழ்த்து அட்டை மற்றும் WhatsApp செய்தியை உருவாக்கவும்.",
      },
      {
        group: "work",
        label: "🧧 சீனப் புத்தாண்டு வாழ்த்து அட்டை",
        prompt: "Michelle Yeoh உருவப்படத்தைப் பயன்படுத்தி சிவப்பு மற்றும் தங்க நிற சீனப் புத்தாண்டு (CNY) வாழ்த்து அட்டை மற்றும் WhatsApp வாழ்த்தை உருவாக்கவும்.",
      },
      {
        group: "work",
        label: "🪔 தீபாவளி பண்டிகை வாழ்த்து அட்டை",
        prompt: "Michelle Yeoh உருவப்படத்தைப் பயன்படுத்தி அகல் விளக்குகள் மற்றும் ரங்கோலி கோலத்துடன் கூடிய தீபாவளி வாழ்த்து அட்டை மற்றும் WhatsApp செய்தியை உருவாக்கவும்.",
      },
      {
        group: "work",
        label: "💼 தனிப்பட்ட பிராண்டிங் பேனர்",
        prompt: "Michelle Yeoh உருவப்படத்தைப் பயன்படுத்தி கோலாலம்பூர் மாலை நேர பின்னணியில் LinkedIn மற்றும் WhatsApp தனிப்பட்ட பிராண்டிங் பேனரை உருவாக்கவும்.",
      },
    ];
  }

  return [
    {
      group: "craft",
      label: "🌟 Michelle Yeoh (Charcoal Suit)",
      prompt: "Use celebrity Michelle Yeoh to create an executive studio portrait in a tailored charcoal suit overlooking the Kuala Lumpur skyline at golden hour.",
    },
    {
      group: "craft",
      label: "🌟 Henry Golding (Navy Suit)",
      prompt: "Use celebrity Henry Golding to create an executive studio portrait in a tailored royal-navy suit overlooking the Petronas Twin Towers at golden hour.",
    },
    {
      group: "craft",
      label: "🌟 Warm Advisor Lounge Look",
      prompt: "Use celebrity Michelle Yeoh to create a warm, approachable portrait in a smart-casual beige blazer in a sunlit private wealth client lounge.",
    },
    {
      group: "work",
      label: "🤝 Client Milestone Card",
      prompt: "Use celebrity Michelle Yeoh to create a warm Client-Focused milestone card for Dato' & Datin Tan celebrating their newborn baby, paired with a friendly WhatsApp coffee invite.",
    },
    {
      group: "work",
      label: "🧧 Chinese New Year Card",
      prompt: "Use celebrity Michelle Yeoh to design a luxury Chinese New Year (CNY) greeting card in crimson & brushed gold with plum blossoms, KL skyline, and warm WhatsApp wishes.",
    },
    {
      group: "work",
      label: "🪔 Deepavali Festival Card",
      prompt: "Use celebrity Michelle Yeoh to design an opulent Deepavali Festival of Lights greeting card with glowing brass diyas, golden rangoli, and warm WhatsApp wishes.",
    },
    {
      group: "work",
      label: "💼 Personal Branding Banner",
      prompt: "Use celebrity Michelle Yeoh to create a sleek LinkedIn & WhatsApp Personal Branding banner featuring the Kuala Lumpur Petronas Twin Towers at golden hour.",
    },
  ];
}

const UI_COPY_C1 = {
  "zh-CN": {
    briefSteps: [
      { title: "1. 塑造专业形象 (Craft Your Image)", desc: "拍照、上传图片或使用名人形象，定制专属高管大片。" },
      { title: "2. 让形象为您赚钱 (Put Your Image to Work)", desc: "将形象转化为客户关怀卡、节日日历触达与个人品牌，驱动业务增长。" },
    ],
    craftSectionTitle: "1. 塑造专业形象 (Craft Your Image)",
    workSectionTitle: "2. 让形象为您拓展业务 (Put Your Image to Work)",
    welcome:
      "嗨！👋 我是您的 **AI 形象助手**，接下来由我一步步引导您。\n\n**第 1 步 — 我们需要一张您的照片开始创作：**",
    photoReadyMsg:
      "照片已就位！🙌 接下来您可以按两个方向进行（可同时点击组合多个标签并自由修改提示词）：\n• **1. 塑造专业形象**：定制高级西装、亲和会客厅或微调造型\n• **2. 让形象为您赚钱**：制作客户关怀卡、节日日历贺卡或个人品牌横幅\n\n点击下方药丸按钮组合示例提示词（可自由修改）：",
    celebReadyMsg:
      "名人模式已激活！🌟 接下来您可以按两个方向进行（可同时点击组合多个标签并自由修改提示词）：\n• **1. 塑造专业形象**：定制名人高管形象大片\n• **2. 让形象为您赚钱**：制作客户关怀卡、节日日历贺卡或个人品牌横幅\n\n点击下方药丸按钮组合示例提示词（可自由修改）：",
    takePhotoBtn: "拍照",
    uploadImageBtn: "上传图片",
    useCelebrityBtn: "使用名人形象",
    changePhotoBtn: "更换照片",
    lockedSelfie: "照片已就绪",
    lockedCeleb: "名人模式：",
    placeholder: "可点击多个下方标签组合提示词，自由修改后按发送...",
    streaming: "✨ 正在为您生成高清图片...",
    editHint: "点击 1 个或多个标签组合提示词，在下方框内自由修改后发送：",
    waBtn: "💬 发送到 WhatsApp",
    copyBtn: "📋 复制",
    copiedBtn: "✅ 已复制",
    saveImgBtn: "⬇️ 保存图片",
    dictateBtn: "🎙️ 语音",
    listeningBtn: "🔴 聆听中...",
    resetChatBtn: "↺ 重新开始",
    clearBtn: "✕ 清空",
    outreachMsgLabel: "💬 客户关怀 WhatsApp 话术（可直接编辑修改）",
    submitBtn: "🚀 提交作品",
    submittingBtn: "正在提交...",
    submittedBadge: "✓ 挑战 1 已提交至实时总积分榜",
    yourScoreLabel: "🏅 您的挑战 1 得分",
    backToChatBtn: "💬 返回继续创作",
    waitingC2Title: "⏳ 请等待主持人开启挑战 2...",
    waitingC2Sub: "您的挑战 1 成绩已同步至主舞台大屏！主持人开启挑战 2 后，您的手机将自动解锁下一关。",
    criteriaLabels: ["高管品牌形象", "客户共情与定制", "创意提示词巧思"],
  },
  "zh-TW": {
    briefSteps: [
      { title: "1. 塑造專業形象 (Craft Your Image)", desc: "拍照、上傳圖片或使用名人形象，定制專屬高管大片。" },
      { title: "2. 讓形象為您賺錢 (Put Your Image to Work)", desc: "將形象轉化為客戶關懷卡、節日日曆觸達與個人品牌，驅動業務增長。" },
    ],
    craftSectionTitle: "1. 塑造專業形象 (Craft Your Image)",
    workSectionTitle: "2. 讓形象為您拓展業務 (Put Your Image to Work)",
    welcome:
      "嗨！👋 我係你嘅 **AI 形象助手**，跟住由我一步步引導你。\n\n**第 1 步 — 我們需要一張你嘅照片開始創作：**",
    photoReadyMsg:
      "相片已經準備好！🙌 跟住你可以按兩個方向進行（可以同時撳多個標籤組合提示詞並自由修改）：\n• **1. 塑造專業形象**：定制高級西裝、親和會客廳或微調造型\n• **2. 讓形象為你賺錢**：製作客戶關懷卡、節日日曆賀卡或個人品牌橫幅\n\n撳下方藥丸掣組合示例提示詞（可自由修改）：",
    celebReadyMsg:
      "名人模式已啟動！🌟 跟住你可以按兩個方向進行（可以同時撳多個標籤組合提示詞並自由修改）：\n• **1. 塑造專業形象**：定制名人高管形象大片\n• **2. 讓形象為你賺錢**：製作客戶關懷卡、節日日曆賀卡或個人品牌橫幅\n\n撳下方藥丸掣組合示例提示詞（可自由修改）：",
    takePhotoBtn: "影相",
    uploadImageBtn: "上傳圖片",
    useCelebrityBtn: "使用名人形象",
    changePhotoBtn: "更換相片",
    lockedSelfie: "相片已就緒",
    lockedCeleb: "名人模式：",
    placeholder: "可撳多個標籤組合提示詞，自由修改後按發送...",
    streaming: "✨ 正在為你生成高清圖片...",
    editHint: "撳 1 個或多個小標籤組合示例提示詞供你自由修改：",
    waBtn: "💬 發送到 WhatsApp",
    copyBtn: "📋 複製",
    copiedBtn: "✅ 已複製",
    saveImgBtn: "⬇️ 儲存圖片",
    dictateBtn: "🎙️ 語音",
    listeningBtn: "🔴 聆聽中...",
    resetChatBtn: "↺ 重新開始",
    clearBtn: "✕ 清空",
    outreachMsgLabel: "💬 客戶關懷 WhatsApp 話術（可直接改）",
    submitBtn: "🚀 提交作品",
    submittingBtn: "交緊卷...",
    submittedBadge: "✓ 挑戰 1 已提交至實時總積分榜",
    yourScoreLabel: "🏅 你嘅挑戰 1 得分",
    backToChatBtn: "💬 返去繼續創作",
    waitingC2Title: "⏳ 請等待主持人開啟挑戰 2...",
    waitingC2Sub: "你嘅挑戰 1 分數已經上咗主舞台大螢幕！主持人一開挑戰 2，你部電話就會自動解鎖下一關。",
    criteriaLabels: ["高管品牌形象", "客戶人情味與定制", "創意提示詞巧思"],
  },
  ms: {
    briefSteps: [
      { title: "1. Cipta Imej Anda (Craft Your Image)", desc: "Ambil foto, muat naik imej, atau guna nama selebriti untuk gaya eksekutif." },
      { title: "2. Jana Hasil Dari Imej Anda (Put Your Image to Work)", desc: "Tukar imej kepada kad sapaan pelanggan, kalendar perayaan & penjenamaan pemacu perniagaan." },
    ],
    craftSectionTitle: "1. Cipta Imej Anda (Craft Your Image)",
    workSectionTitle: "2. Jana Hasil Dari Imej Anda (Put Your Image to Work)",
    welcome:
      "Hai! 👋 Saya **Pembantu Imej AI** anda, dan saya akan membimbing anda.\n\n**Langkah 1 — Kita perlukan sekeping foto anda:**",
    photoReadyMsg:
      "Terbaik — foto anda sudah sedia! 🙌 Anda kini boleh gabungkan pilihan di bawah dan sunting bebas:\n• **1. Cipta Imej Anda** — kemaskan potret eksekutif, pakaian atau latar belakang.\n• **2. Jana Hasil Dari Imej Anda** — tukar imej kepada kad sapaan pelanggan, kalendar atau penjenamaan peribadi.\n\nKlik satu atau beberapa pil di bawah untuk membina prompt anda:",
    celebReadyMsg:
      "Mod selebriti aktif! 🌟 Anda kini boleh gabungkan pilihan di bawah dan sunting bebas:\n• **1. Cipta Imej Anda** — jana potret studio selebriti.\n• **2. Jana Hasil Dari Imej Anda** — bina kad ucapan pelanggan, kalendar atau penjenamaan.\n\nKlik satu atau beberapa pil di bawah untuk membina prompt anda:",
    takePhotoBtn: "Ambil foto",
    uploadImageBtn: "Muat naik imej",
    useCelebrityBtn: "Guna selebriti",
    changePhotoBtn: "Tukar foto",
    lockedSelfie: "Foto Sedia",
    lockedCeleb: "Selebriti: ",
    placeholder: "Klik beberapa pil untuk gabung prompt, ubah suai di sini, kemudian tekan Send...",
    streaming: "✨ Sedang menjana imej anda...",
    editHint: "Klik 1 atau beberapa pil untuk gabungkan contoh prompt & sunting bebas:",
    waBtn: "💬 Hantar ke WhatsApp",
    copyBtn: "📋 Salin",
    copiedBtn: "✅ Disalin",
    saveImgBtn: "⬇️ Simpan",
    dictateBtn: "🎙️ Suara",
    listeningBtn: "🔴 Mendengar...",
    resetChatBtn: "↺ Mula Semula",
    clearBtn: "✕ Kosongkan",
    outreachMsgLabel: "💬 Mesej Sapaan Pelanggan (Boleh disunting)",
    submitBtn: "🚀 Hantar",
    submittingBtn: "Menghantar...",
    submittedBadge: "✓ CABARAN 1 DIHANTAR KE PAPAN PENDAHULU LANGSUNG",
    yourScoreLabel: "🏅 Markah Cabaran 1 Anda",
    backToChatBtn: "💬 Kembali ke Ruang Sembang",
    waitingC2Title: "⏳ Menunggu Penyampai Memulakan Cabaran 2...",
    waitingC2Sub: "Markah Cabaran 1 anda kini dipaparkan di pentas utama! Cabaran 2 akan dibuka secara automatik sebaik sahaja Penyampai memulakannya.",
    criteriaLabels: ["Jenama Eksekutif", "Empati & Pemperibadian", "Kreativiti Prompt"],
  },
  en: {
    briefSteps: [
      { title: "1. Craft Your Image", desc: "Take a photo, upload an image, or use a celebrity to style your executive portrait." },
      { title: "2. Put Your Image to Work", desc: "Put that image to work driving business: client milestone cards, festive calendar greetings & personal branding." },
    ],
    craftSectionTitle: "1. Craft Your Image",
    workSectionTitle: "2. Put Your Image to Work (Make It Drive Business)",
    welcome:
      "Hi! 👋 I'm your **AI Image Assistant**, and I'm going to guide you through this.\n\n**Step 1 — We need a photo of you to work with:**",
    photoReadyMsg:
      "Awesome — got your photo! 🙌 You can now tap 1 or multiple pills below to combine them and edit freely:\n• **1. Craft Your Image** — refine your executive portrait, wardrobe, or setting.\n• **2. Put Your Image to Work** — turn your image into client outreach cards, festive greetings, or personal branding.\n\nTap any pill(s) below to build your prompt:",
    celebReadyMsg:
      "Celebrity mode active! 🌟 You can now tap 1 or multiple pills below to combine them and edit freely:\n• **1. Craft Your Image** — generate celebrity executive studio headshots.\n• **2. Put Your Image to Work** — turn it into client milestone cards, festive greetings, or branding.\n\nTap any pill(s) below to build your prompt:",
    takePhotoBtn: "Take a photo",
    uploadImageBtn: "Upload an image",
    useCelebrityBtn: "Use a celebrity",
    changePhotoBtn: "Change photo",
    lockedSelfie: "Photo Ready",
    lockedCeleb: "Celebrity: ",
    placeholder: "Tap multiple pills to combine them or type your own prompt here, then press Send...",
    streaming: "✨ Generating your image...",
    editHint: "Tap 1 or multiple option pills to combine into your prompt and edit freely:",
    waBtn: "💬 Send to WhatsApp",
    copyBtn: "📋 Copy",
    copiedBtn: "✅ Copied",
    saveImgBtn: "⬇️ Save",
    dictateBtn: "🎙️ Voice",
    listeningBtn: "🔴 Listening...",
    resetChatBtn: "↺ Start Over",
    clearBtn: "✕ Clear",
    outreachMsgLabel: "💬 Outreach Message (Editable)",
    submitBtn: "🚀 Submit",
    submittingBtn: "Submitting...",
    submittedBadge: "✓ CHALLENGE 1 SUBMITTED TO LIVE LEADERBOARD",
    yourScoreLabel: "🏅 Your Challenge 1 Score",
    backToChatBtn: "💬 Back to Chat",
    waitingC2Title: "⏳ Waiting for Presenter to Start Challenge 2...",
    waitingC2Sub: "Your Challenge 1 score is live on the main stage! Challenge 2 will unlock automatically on your phone as soon as the Presenter starts it.",
    criteriaLabels: ["Executive Brand", "Empathy & Personalization", "Creative Prompt Craft"],
  },
  ta: {
    briefSteps: [
      { title: "1. உங்கள் தொழில்முறை தோற்றத்தை உருவாக்குங்கள் (Craft Your Image)", desc: "புகைப்படம் எடுக்கவும், பதிவேற்றவும் அல்லது பிரபல நபரைப் பயன்படுத்தி தொழில்முறை உருவப்படத்தை உருவாக்கவும்." },
      { title: "2. உங்கள் படத்தை வணிகத்திற்குப் பயன்படுத்துங்கள் (Put Your Image to Work)", desc: "வாடிக்கையாளர் வாழ்த்து அட்டைகள், பண்டிகை காலண்டர் மற்றும் தனிப்பட்ட பிராண்டிங்காக மாற்றுங்கள்." },
    ],
    craftSectionTitle: "1. உங்கள் தொழில்முறை தோற்றத்தை உருவாக்குங்கள் (Craft Your Image)",
    workSectionTitle: "2. உங்கள் படத்தை வணிகத்திற்குப் பயன்படுத்துங்கள் (Put Your Image to Work)",
    welcome:
      "வணக்கம்! 👋 நான் உங்கள் **AI பட உதவியாளர்**, உங்களுக்கு வழிகாட்ட உள்ளேன்.\n\n**படி 1 — தொடங்குவதற்கு உங்கள் புகைப்படம் தேவை:**",
    photoReadyMsg:
      "அருமை — உங்கள் புகைப்படம் தயார்! 🙌 கீழே உள்ள 1 அல்லது பல விருப்பங்களைத் தட்டி இணைத்து சுதந்திரமாகத் திருத்தலாம்:\n• **1. உங்கள் தோற்றத்தை வடிவமைக்கவும்** — உடை அல்லது பின்னணியை மாற்றவும்.\n• **2. வணிகத்திற்குப் பயன்படுத்தவும்** — வாடிக்கையாளர் வாழ்த்து அட்டை அல்லது காலண்டராக மாற்றவும்.\n\nகீழே உள்ள மாதிரி ப்ராம்ப்ட்களைத் தேர்ந்தெடுத்து இணைக்கவும்:",
    celebReadyMsg:
      "பிரபல பயன்முறை தயார்! 🌟 கீழே உள்ள 1 அல்லது பல மாதிரி ப்ராம்ப்ட்களைத் தட்டி இணைத்து மாற்றலாம்:",
    takePhotoBtn: "புகைப்படம் எடு",
    uploadImageBtn: "படத்தைப் பதிவேற்று",
    useCelebrityBtn: "பிரபலரைப் பயன்படுத்து",
    changePhotoBtn: "படத்தை மாற்று",
    lockedSelfie: "புகைப்படம் தயார்",
    lockedCeleb: "பிரபலம்: ",
    placeholder: "பல விருப்பங்களை இணைத்து அல்லது உங்கள் ப்ராம்ப்டை உள்ளிட்டு அனுப்பவும்...",
    streaming: "✨ உங்கள் படம் உருவாக்கப்படுகிறது...",
    editHint: "1 அல்லது பல விருப்பங்களைத் தட்டி ப்ராம்ப்டில் இணைத்து சுதந்திரமாகத் திருத்தவும்:",
    waBtn: "💬 WhatsApp-க்கு அனுப்பு",
    copyBtn: "📋 நகலெடு",
    copiedBtn: "✅ நகலெடுக்கப்பட்டது",
    saveImgBtn: "⬇️ சேமி",
    dictateBtn: "🎙️ குரல்",
    listeningBtn: "🔴 கேட்கிறது...",
    resetChatBtn: "↺ மீண்டும் தொடங்கு",
    clearBtn: "✕ அழி",
    outreachMsgLabel: "💬 வாடிக்கையாளர் WhatsApp செய்தி (திருத்தலாம்)",
    submitBtn: "🚀 சமர்ப்பி",
    submittingBtn: "சமர்ப்பிக்கிறது...",
    submittedBadge: "✓ சவால் 1 நேரடி தரவரிசைப் பட்டியலில் சமர்ப்பிக்கப்பட்டது",
    yourScoreLabel: "🏅 உங்கள் சவால் 1 மதிப்பெண்",
    backToChatBtn: "💬 உரையாடலுக்குத் திரும்பு",
    waitingC2Title: "⏳ தொகுப்பாளர் சவால் 2-ஐத் தொடங்கும் வரை காத்திருக்கவும்...",
    waitingC2Sub: "உங்கள் சவால் 1 மதிப்பெண் பிரதான திரையில் பதிவாகியுள்ளது! தொகுப்பாளர் சவால் 2-ஐத் தொடங்கியவுடன் உங்கள் திரையில் தானாகத் திறக்கும்.",
    criteriaLabels: ["நிர்வாக பிராண்ட்", "வாடிக்கையாளர் அக்கறை", "ப்ராம்ப்ட் படைப்பாற்றல்"],
  },
};
UI_COPY_C1["yue"] = UI_COPY_C1["zh-TW"];

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
        }
      } catch (err) {
        setCameraError(
          "Camera preview unavailable — tap 'Choose Photo from Device' above to upload or take a photo."
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
        className="w-full max-w-md bg-white border-2 border-[#ed1b2e] rounded-2xl overflow-hidden shadow-2xl space-y-3 p-4"
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

        {cameraError ? (
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-center text-xs text-slate-600 leading-relaxed">
            {cameraError}
          </div>
        ) : (
          <>
            <div className="relative rounded-2xl overflow-hidden bg-slate-900 aspect-square max-h-[50vh] mx-auto border border-slate-300">
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

  // Step 1 State: Chat prompt stays hidden until user chooses Take Photo, Upload Image, or Use a Celebrity
  const [rawPhoto, setRawPhoto] = useState(null);
  const [celebrityMode, setCelebrityMode] = useState(false);
  const [celebrityName, setCelebrityName] = useState("");
  const [isCameraModalOpen, setIsCameraModalOpen] = useState(false);

  const fileInputRef = useRef(null);
  const isStep1Unlocked = Boolean(rawPhoto || celebrityMode);

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
  const [outreachDraftByMsg, setOutreachDraftByMsg] = useState({});
  const [copiedMsgId, setCopiedMsgId] = useState(null);

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
            followUps: getPostPhotoPillsC1(lang),
          };
        }
        if (m.isCelebReadyGreeting) {
          return {
            ...m,
            text: curUi.celebReadyMsg,
            followUps: getCelebrityPillsC1(lang),
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
        agenticStep: "Step 1: Photo, Upload, or Celebrity",
      }),
    }).catch(() => {});
  }, [lang]);

  // Option 1 & 2: User took a photo or uploaded an image
  const handlePhotoLocked = (dataUrl) => {
    setRawPhoto(dataUrl);
    setCelebrityMode(false);
    setCelebrityName("");
    setMessages((prev) => [
      ...prev,
      {
        id: `photo_ready_${Date.now()}`,
        role: "assistant",
        agentName: "AI Image Assistant",
        isPhotoReadyGreeting: true,
        photoThumb: dataUrl,
        text: ui.photoReadyMsg,
        followUps: getPostPhotoPillsC1(lang),
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

  // Option 3: User clicked "Use a celebrity"
  const handleSelectCelebrity = () => {
    setCelebrityMode(true);
    setCelebrityName("Michelle Yeoh");
    const sample =
      lang === "zh-CN"
        ? "使用名人杨紫琼（Michelle Yeoh）生成一张身穿炭灰西装、背景为吉隆坡双峰塔黄昏的高管肖像照。"
        : lang === "zh-TW" || lang === "yue"
        ? "使用名人楊紫瓊（Michelle Yeoh）生成一張身穿炭灰西裝、背景為吉隆坡雙峰塔黃昏的高管肖像照。"
        : lang === "ms"
        ? "Gunakan selebriti Michelle Yeoh untuk menghasilkan potret studio eksekutif memakai sut kelabu gelap berlatarkan Menara Berkembar KLCC waktu senja."
        : lang === "ta"
        ? "நடிகை மிஷெல் யோ (Michelle Yeoh) கோலாலம்பூர் இரட்டை கோபுரப் பின்னணியில் நிர்வாக உடையணிந்த தொழில்முறை உருவப்படத்தை உருவாக்கவும்."
        : "Use celebrity Michelle Yeoh to create an executive studio portrait in a tailored charcoal suit overlooking the Kuala Lumpur skyline at golden hour.";
    setInputText(sample);
    setMessages((prev) => [
      ...prev,
      {
        id: `celeb_ready_${Date.now()}`,
        role: "assistant",
        agentName: "AI Image Assistant",
        isCelebReadyGreeting: true,
        text: ui.celebReadyMsg,
        followUps: getCelebrityPillsC1(lang),
      },
    ]);
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
    rec.start();
  };

  const handleResetChat = () => {
    setRawPhoto(null);
    setCelebrityMode(false);
    setCelebrityName("");
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
      const compactHistory = nextHistory
        .filter((m) => m.id !== "welcome_c1" && !m.isPhotoReadyGreeting && !m.isCustomReadyGreeting)
        .slice(-6)
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
            celebrityName: celebrityName.trim(),
            hasExistingVisual: Boolean(studioState.latestArtifact),
            hasAiPortrait: Boolean(studioState.aiPortraitDataUrl),
          },
          celebrityName: rawPhoto ? "" : celebrityName.trim(),
          agentName: agentName || "",
          region: agentRegion || "Kuala Lumpur",
          hasCustomPhoto: Boolean(rawPhoto),
          photoBase64: rawPhoto,
          prevPortraitDataUrl: studioState.aiPortraitDataUrl || null,
          customImageMode: false,
          requirePhotoOrCelebrity: !Boolean(rawPhoto || celebrityMode || celebrityName),
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

      if (data.celebrityUsed && !rawPhoto) {
        setCelebrityName(data.celebrityUsed);
      }

      const nextMode = data.creationMode || studioState.creationMode || "executive_headshot";
      const nextStyle = data.style || studioState.style || "mdrt_keynote";
      const nextOccasion = data.occasion || studioState.occasion || "newborn";
      const mergedPortrait = data.aiPortraitDataUrl || studioState.aiPortraitDataUrl || null;
      const mergedArtwork = data.copyOnly
        ? studioState.aiCardArtworkDataUrl
        : data.aiCardArtworkDataUrl || null;

      // Pure, clean AI-generated image (NO fake canvas borders, NO "Dato' Sandbox Tester", NO fallback motto!)
      const cleanImageUrl =
        nextMode === "executive_headshot"
          ? mergedPortrait || studioState.latestArtifact?.cleanImageUrl || rawPhoto
          : mergedArtwork || mergedPortrait || studioState.latestArtifact?.cleanImageUrl || rawPhoto;

      const userAskedForOutreach =
        nextMode === "outreach_card" ||
        Boolean(data.copyOnly) ||
        /\b(whatsapp|outreach|message|greeting|card|client|calendar)\b/i.test(promptToSend);

      const aMsgId = `a_${Date.now()}`;
      const artifactObj = {
        msgId: aMsgId,
        creationMode: nextMode,
        styleKey: nextStyle,
        occasionKey: nextOccasion,
        styleBadge: data.styleBadge || "✨ AI Studio Image",
        cleanImageUrl,
        beforeUrl: rawPhoto || null,
        showCopyBox: userAskedForOutreach,
        outreachMessage: data.outreachMessage || "",
        linkedinHeadline: data.linkedinHeadline || "",
        judgeFeedback: data.judgeFeedback || "",
        brandScore: data.brandScore || 96,
        personalizationScore: data.personalizationScore || 96,
        craftScore: data.craftScore || 96,
        clientName: data.clientName || "",
        motto: data.motto || "",
        userPrompt: promptToSend,
      };

      setOutreachDraftByMsg((prev) => ({
        ...prev,
        [aMsgId]: artifactObj.outreachMessage,
      }));

      setStudioState({
        creationMode: nextMode,
        style: nextStyle,
        occasion: nextOccasion,
        clientName: data.clientName || studioState.clientName,
        motto: data.motto || studioState.motto,
        cardHeadline: data.cardHeadline || studioState.cardHeadline,
        visualPrompt: data.visualPrompt || promptToSend,
        aiPortraitDataUrl: mergedPortrait,
        aiCardArtworkDataUrl: mergedArtwork,
        latestArtifact: artifactObj,
      });

      setMessages((prev) => [
        ...prev,
        {
          id: aMsgId,
          role: "assistant",
          agentName: "AI Image Assistant",
          turnBadge: `Turn ${data.turnNumber || 1}`,
          text: data.assistantReply || "",
          artifact: artifactObj,
          followUps: data.suggestedFollowUps || [],
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

  const handleCombinePillPrompt = (pillPrompt) => {
    const clean = (pillPrompt || "").trim();
    if (!clean) return;
    setInputText((prev) => {
      const cur = (prev || "").trim();
      if (!cur) return clean;
      if (cur.includes(clean)) {
        const lines = cur
          .split(/\n+/)
          .map((l) => l.trim())
          .filter((l) => l && l !== clean);
        return lines.join("\n");
      }
      return `${cur}\n${clean}`;
    });
  };

  const handleSubmitArtifact = async (targetArtifact = null) => {
    const art = targetArtifact || studioState.latestArtifact;
    if (!art || isSubmitting) return;
    setIsSubmitting(true);
    setSubmitError("");

    try {
      const elapsedSec = Math.max(6, Math.round((Date.now() - startTime) / 1000));
      const speedScore = Math.max(85, Math.min(99, 100 - Math.floor(elapsedSec / 6)));

      const editedCopy =
        outreachDraftByMsg[art.msgId] !== undefined
          ? outreachDraftByMsg[art.msgId]
          : art.outreachMessage;
      const didCustomizeCopy =
        Boolean(editedCopy && art.outreachMessage) &&
        editedCopy.trim() !== (art.outreachMessage || "").trim() &&
        editedCopy.trim().length >= 15;

      const bScore = Math.min(99, art.brandScore || 96);
      const pScore = Math.min(99, (art.personalizationScore || 96) + (didCustomizeCopy ? 2 : 0));
      const cScore = Math.min(99, (art.craftScore || 96) + (didCustomizeCopy ? 1 : 0));
      const accuracyScore = Math.min(99, Math.round((bScore + pScore + cScore) / 3));

      const beforeThumb = await makeCompactBeforeThumb(rawPhoto);

      const userTurnTexts = messages
        .filter((m) => m.role === "user")
        .map((m, i) => `Turn ${i + 1}: ${m.text}`);

      const cLabels = ui.criteriaLabels || [
        "Executive Brand",
        "Empathy & Personalization",
        "Creative Prompt Craft",
      ];
      const criteriaMap = {
        [cLabels[0] || "Executive Brand"]: bScore,
        [cLabels[1] || "Empathy & Personalization"]: pScore,
        [cLabels[2] || "Creative Prompt Craft"]: cScore,
      };

      const modeLabelMap = {
        executive_headshot: "AI Portrait",
        outreach_card: "Outreach Card",
        brand_banner: "Personal Branding Banner",
      };

      const subPayload = {
        challenge: "1",
        challengeType: "c1_image_outreach",
        creationMode: art.creationMode,
        title: modeLabelMap[art.creationMode] || "AI Studio Image",
        styleBadge: art.styleBadge,
        userInput: userTurnTexts.slice(-3).join("\n") || art.userPrompt,
        aiOutput: editedCopy,
        judgeFeedback:
          art.judgeFeedback || "Clean visual craft and personalized outreach!",
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
    const a = document.createElement("a");
    a.href = url;
    a.download = `AI_Image_${modeName || "Studio"}_${Date.now()}.jpg`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const handleCopyCopy = (msgId, text) => {
    if (!text) return;
    navigator.clipboard
      .writeText(text)
      .then(() => {
        setCopiedMsgId(msgId);
        setTimeout(() => setCopiedMsgId(null), 2000);
      })
      .catch(() => {});
  };

  const handleShareWhatsApp = (msgId, text) => {
    const cleanText = (text || "").trim();
    if (cleanText) {
      navigator.clipboard?.writeText(cleanText).catch(() => {});
      setCopiedMsgId(msgId);
      setTimeout(() => setCopiedMsgId(null), 2000);
    }
    const waUrl = `https://wa.me/?text=${encodeURIComponent(cleanText)}`;
    window.open(waUrl, "_blank", "noopener,noreferrer");
  };

  // Step 1: Exactly the 3 choices requested — Take a photo, Upload an image, Use a celebrity
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
        <button
          type="button"
          onClick={handleSelectCelebrity}
          className="px-4 py-2 rounded-full bg-white hover:bg-red-50 text-slate-800 hover:text-[#ed1b2e] font-extrabold text-xs border border-slate-300 hover:border-[#ed1b2e] shadow-sm transition-all"
        >
          🌟 {ui.useCelebrityBtn || "Use a celebrity"}
        </button>
      </div>
    );
  };

  // Render JUST the clean generated image (+ Outreach copy box ONLY when building outreach)
  const renderArtifactCard = (msg) => {
    const art = msg.artifact;
    if (!art) return null;
    const showingBefore = Boolean(showBeforeByMsg[msg.id]);
    const draftCopy =
      outreachDraftByMsg[msg.id] !== undefined
        ? outreachDraftByMsg[msg.id]
        : art.outreachMessage;

    const displayedImg =
      showingBefore && art.beforeUrl ? art.beforeUrl : art.cleanImageUrl;

    return (
      <div className="space-y-2.5 pt-1">
        {/* Clean Generated Image — No Fake Card Frame */}
        {displayedImg && (
          <div className="relative max-w-[300px] sm:max-w-[340px] mx-auto">
            <img
              src={displayedImg}
              alt="Generated AI Image"
              className="w-full rounded-2xl border-2 border-slate-200 shadow-lg block"
            />
            <div className="flex items-center justify-end gap-1.5 mt-2">
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

        {/* Editable WhatsApp Copy Box — Shown Only When Doing Outreach */}
        {art.showCopyBox && draftCopy && (
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-2.5 space-y-1.5">
            <div className="flex items-center justify-between gap-1.5 text-[11px]">
              <span className="font-bold text-slate-800">{ui.outreachMsgLabel || "💬 Outreach Message (Editable)"}</span>
              <button
                type="button"
                onClick={() => handleCopyCopy(msg.id, draftCopy)}
                className="px-2.5 py-0.5 rounded-full bg-white hover:bg-red-50 text-[#ed1b2e] font-bold text-[10px] border border-[#ed1b2e]"
              >
                {copiedMsgId === msg.id ? ui.copiedBtn : ui.copyBtn}
              </button>
            </div>

            <textarea
              rows={3}
              value={draftCopy}
              onChange={(e) =>
                setOutreachDraftByMsg((p) => ({ ...p, [msg.id]: e.target.value }))
              }
              style={{ fontSize: "16px" }}
              className="w-full bg-white border border-slate-300 focus:border-[#ed1b2e] focus:outline-none rounded-lg p-2.5 text-slate-900 leading-relaxed sm:text-xs"
            />
          </div>
        )}

        {/* Compact Action Row: Share to WhatsApp (White + Red Border) OR Submit (Solid Prudential Red) */}
        <div className="grid grid-cols-2 gap-2.5 pt-1">
          <button
            type="button"
            onClick={() => handleShareWhatsApp(msg.id, draftCopy)}
            className="py-2.5 px-3 rounded-xl bg-white hover:bg-red-50 text-[#ed1b2e] border-2 border-[#ed1b2e] font-extrabold text-xs flex items-center justify-center gap-1 shadow-sm transition-all"
          >
            <span>{ui.waBtn}</span>
          </button>
          <button
            type="button"
            disabled={isSubmitting}
            onClick={() => handleSubmitArtifact(art)}
            className="py-2.5 px-3 rounded-xl bg-[#ed1b2e] hover:bg-[#c8102e] disabled:opacity-50 text-white font-extrabold text-xs shadow-md shadow-red-600/20 transition-all"
          >
            {isSubmitting ? (ui.submittingBtn || "Submitting...") : (ui.submitBtn || "🚀 Submit")}
          </button>
        </div>
      </div>
    );
  };

  if (submitted) {
    const finalCopy =
      submittedSnapshot && outreachDraftByMsg[submittedSnapshot.msgId] !== undefined
        ? outreachDraftByMsg[submittedSnapshot.msgId]
        : submittedSnapshot?.outreachMessage || "";
    const totalPts = submittedSnapshot?.totalScore || 96;
    const spdPts = submittedSnapshot?.speedScore || 94;
    const accPts = submittedSnapshot?.accuracyScore || 97;
    const secTaken = submittedSnapshot?.elapsedSec || 18;
    const critMap = submittedSnapshot?.criteriaMap || {};
    const jFeedback =
      submittedSnapshot?.finalJudgeFeedback ||
      submittedSnapshot?.judgeFeedback ||
      "Executive visual craft and personalized client outreach!";

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
            className="w-56 mx-auto rounded-2xl border-2 border-[#ed1b2e] shadow-lg"
          />
        )}

        <div className="flex flex-wrap justify-center gap-2">
          <button
            type="button"
            onClick={() => handleShareWhatsApp(submittedSnapshot?.msgId || "sub", finalCopy)}
            className="px-4 py-2 rounded-full bg-white hover:bg-red-50 text-[#ed1b2e] border-2 border-[#ed1b2e] text-xs font-extrabold shadow-sm"
          >
            {ui.waBtn}
          </button>
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
            className="w-full py-3.5 bg-[#ed1b2e] hover:bg-[#c8102e] text-white font-extrabold rounded-xl shadow-md shadow-red-600/20 text-sm"
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
    <div className="flex items-center justify-between gap-2 px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-[11px]">
      <div className="flex items-center gap-2 min-w-0">
        {rawPhoto ? (
          <>
            <img
              src={rawPhoto}
              alt="Uploaded"
              className="w-6 h-6 rounded-full object-cover border-2 border-[#ed1b2e] shrink-0"
            />
            <span className="font-bold text-slate-800 truncate">✓ {ui.lockedSelfie}</span>
          </>
        ) : (
          <span className="font-bold text-[#ed1b2e] truncate">
            🌟 {ui.lockedCeleb}{celebrityName || "Michelle Yeoh"}
          </span>
        )}
      </div>
      <div className="flex items-center gap-1.5 shrink-0">
        <button
          type="button"
          onClick={() => setIsCameraModalOpen(true)}
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
        regionLabel={agentRegion}
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
        onPrefillPrompt={handleCombinePillPrompt}
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
