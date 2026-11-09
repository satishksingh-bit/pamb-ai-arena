/* ============================================================================
   CHALLENGE 2 MODULE (14:20 - 14:35 | 15 Mins)
   "Executive Pre-Pitch 3-Slide Deck Studio (R.C.T.F.C. + Personal Touch)"
   - Strictly 3 Slides Only (Slide 1 KPI Snapshot · Slide 2 Gap Chart · Slide 3 Strategy Matrix)
   - 72 Evenly Distributed HNW Malaysian Client Seats (6 Curated Cases × 12 Personas)
   - Streamlined 390×844 Mobile R.C.T.F.C. Builder + Boardroom Tone + Personal Strategic Angle
   - Full 5-Language Native Localization (EN, ZH-CN, YUE, MS, TA)
   - Mobile localStorage Persistence + Strict One-Time Final Submission Lock
============================================================================ */

const C2_CURATED_CASES_META = [
  {
    slot: 0,
    id: "glc_cfo_golden_bridge",
    icon: "🏛️",
    labels: {
      en: "Age-60 CFO Health Bridge",
      "zh-CN": "上市CFO 60岁医疗桥",
      yue: "上市CFO 60歲醫療橋",
      ms: "Jambatan Kesihatan CFO 60",
      ta: "60 வயது CFO மருத்துவப் பாலம்",
    },
  },
  {
    slot: 1,
    id: "kl_surgeon_practice",
    icon: "🩺",
    labels: {
      en: "Specialist Premier Health",
      "zh-CN": "专科名医高端医疗储备",
      yue: "專科名醫高端醫療儲備",
      ms: "Perubatan Premier Pakar",
      ta: "மருத்துவ நிபுணர் பிரீமியர் நலன்",
    },
  },
  {
    slot: 2,
    id: "clinic_founder_takaful",
    icon: "🏥",
    labels: {
      en: "Clinic Takaful & Hibah",
      "zh-CN": "专科诊所 Takaful & Hibah",
      yue: "專科診所 Takaful & Hibah",
      ms: "Takaful & Hibah Klinik",
      ta: "கிளினிக் தகாஃபுல் & Hibah",
    },
  },
  {
    slot: 3,
    id: "tech_exit_family_office",
    icon: "🚀",
    labels: {
      en: "Post-Exit Tech Trust",
      "zh-CN": "科技套现家族信托",
      yue: "科技套現家族信託",
      ms: "Amanah Pengasas Tech",
      ta: "டெக் நிறுவனர் குடும்ப அறக்கட்டளை",
    },
  },
  {
    slot: 4,
    id: "ipoh_pharma_matriarch",
    icon: "🌿",
    labels: {
      en: "3-Gen Longevity & Grandkids",
      "zh-CN": "三代长寿康养与孙辈池",
      yue: "三代長壽康養與孫輩池",
      ms: "Penjagaan 3-Gen & Cucu",
      ta: "3-தலைமுறை நலன் & பேரப்பிள்ளைகள்",
    },
  },
  {
    slot: 5,
    id: "penang_semicon_keyman",
    icon: "🏭",
    labels: {
      en: "Semicon Heir Harmony",
      "zh-CN": "半导体扩厂与传承和谐",
      yue: "半導體擴廠與傳承和睦",
      ms: "Harmoni Waris Semikonduktor",
      ta: "செமிகண்டக்டர் வாரிசு நல்லிணக்கம்",
    },
  },
];

const C2_UI_I18N = {
  en: {
    studioHeader: "🧠 3-Slide Pre-Pitch Studio",
    sampleBtn: "🎯 Sample",
    closeSampleBtn: "✕ Close",
    targetGoalBanner: "🎯 3-SLIDE SAMPLE BENCHMARK DECK",
    caseInfoBtn: "Case Info ▾",
    hideCaseBtn: "Hide ▴",
    switchCaseFmt: "Switch Case",
    switchShortFmt: "Switch",
    switchConfirmMsg: "Switch client case and start a fresh 3-slide deck?",
    step1Tab: "1. 🧩 Build Prompt",
    step2Tab: "2. 📊 3-Slide Deck",
    pillarsHeader: "1. R.C.T.F.C. Prompt Pillars",
    activateAllShort: "✨ All 5 On",
    pillarTitles: {
      role: "R · Role",
      context: "C · Context",
      task: "T · Task",
      format: "F · Format",
      constraints: "C · Constraints",
    },
    toneHeader: "2. Boardroom Style",
    tones: [
      {
        id: "boardroom",
        shortLabel: "🏛️ Boardroom",
        clause:
          "[Presentation Style]: Authoritative Family-Office boardroom tone — crisp balance-sheet framing, zero sales fluff.",
      },
      {
        id: "empathy",
        shortLabel: "❤️ Empathy",
        clause:
          "[Presentation Style]: Warm founder & family-dignity tone — protect family harmony, spouse security, and children's dreams.",
      },
      {
        id: "cfo",
        shortLabel: "📊 CFO",
        clause:
          "[Presentation Style]: Analytical CFO tone — emphasize capital efficiency (~2% p.a. liquidity allocation vs preserving 100% enterprise valuation) and statutory ring-fencing.",
      },
    ],
    angleHeader: "3. 💡 Personal Strategic Angle",
    anglePlaceholder:
      "Tap a quick angle above or write your bespoke hook (e.g., 30-min co-review with accountant)...",
    inspectPromptShow: "Inspect Full Prompt ▾",
    inspectPromptHide: "Hide Full Prompt ▴",
    pillarsReadySuffix: "Pillars Ready",
    unlockEditBtn: "✏️ Unlock Manual Edit",
    lockAutoSyncBtn: "🔒 Re-Sync Pillars",
    generateBtn: "⚡ Generate 3-Slide Executive Deck",
    regenerateBtn: "🔄 Regenerate 3-Slide Deck",
    genStages: [
      "1/3 · Structuring Slide 1 Client & KPIs...",
      "2/3 · Modeling Slide 2 Liquidity Gap Chart...",
      "3/3 · Synthesizing Slide 3 Strategy Matrix...",
    ],
    generatingImgBadge: "🎨 Rendering visuals...",
    finishingImgBeforeSubmit: "🎨 Attaching slide visuals...",
    slideTabs: ["1. KPIs", "2. Gap Chart", "3. Strategy"],
    downloadPptxBtn: "⬇ Export .pptx",
    yourSlideLabel: "📊 YOUR SLIDE",
    targetSlideLabel: "🎯 SAMPLE SLIDE",
    speakerNotesToggle: "🎙️ Speaker Notes",
    readyStatusBar: "✅ 3-Slide Deck Ready • Final Submit Locks Score",
    backToPromptBtn: "✏️ Refine Prompt",
    finalSubmitBtn: "🏆 Finalize & Submit Deck",
    finalSubmittingText: "⚖️ Scoring Your 3-Slide Deck...",
    jobDoneBadge: "✅ CHALLENGE 2 COMPLETE — LOCKED ON LEADERBOARD",
    jobDoneTitle: "Your 3-Slide Executive Pre-Pitch Deck is Live in the Arena",
    arenaScoreLabel: "Arena Score",
    deckScoreLabel: "Deck Rating",
    rubricHeader: "🏅 6-Dimension Executive Deck Breakdown",
    rubricDims: [
      "Structure & Completeness",
      "Client Personalisation",
      "Insight & Quantification",
      "Solution Fit",
      "Objection Readiness",
      "Compliance & Fair Dealing",
    ],
    viewMainScoreBtn: "🏆 View Live Leaderboard",
    proceedC3Btn: "🚀 Proceed to Challenge 3 →",
    waitingC3Text: "⏳ Score recorded on the Big Screen! Waiting for Presenter to launch Challenge 3...",
  },
  "zh-CN": {
    studioHeader: "🧠 3页战前简报工作室",
    sampleBtn: "🎯 标杆样例",
    closeSampleBtn: "✕ 关闭",
    targetGoalBanner: "🎯 3页标杆参考简报（对应当前客户）",
    caseInfoBtn: "客户详情 ▾",
    hideCaseBtn: "收起 ▴",
    switchCaseFmt: "切换案例",
    switchShortFmt: "切换",
    switchConfirmMsg: "确认切换客户案例并重新生成 3 页简报吗？",
    step1Tab: "1. 🧩 构建提示词",
    step2Tab: "2. 📊 3页简报",
    pillarsHeader: "1. R.C.T.F.C. 五维积木",
    activateAllShort: "✨ 全选5维",
    pillarTitles: {
      role: "R · 角色",
      context: "C · 背景",
      task: "T · 任务",
      format: "F · 格式",
      constraints: "C · 合规",
    },
    toneHeader: "2. 董事会呈现风格",
    tones: [
      {
        id: "boardroom",
        shortLabel: "🏛️ 董事会",
        clause:
          "[呈现风格]：采用资深家族办公室董事会风格——聚焦资产负债表与传承结构，零推销感。",
      },
      {
        id: "empathy",
        shortLabel: "❤️ 共情家风",
        clause:
          "[呈现风格]：温暖共情切入——守护创业心血与100%家族股权完整，保障配偶尊严与子女学业和谐。",
      },
      {
        id: "cfo",
        shortLabel: "📊 CFO量化",
        clause:
          "[呈现风格]：严谨 CFO 财务视角——对比每年约 2% 资金配置成本与守护 100% 企业估值完整及法定信托隔离。",
      },
    ],
    angleHeader: "3. 💡 个人策略切入点",
    anglePlaceholder: "点击上方灵感胶囊，或输入您的专属顾问邀约切入点...",
    inspectPromptShow: "查看完整提示词 ▾",
    inspectPromptHide: "收起完整提示词 ▴",
    pillarsReadySuffix: "维已就绪",
    unlockEditBtn: "✏️ 解锁手动编辑",
    lockAutoSyncBtn: "🔒 恢复自动同步",
    generateBtn: "⚡ 生成 3 页高管战前简报",
    regenerateBtn: "🔄 重新生成 3 页简报",
    genStages: [
      "1/3 · 构建第 1 页：客户快照与 KPI 卡...",
      "2/3 · 测算第 2 页：流动性缺口柱状图...",
      "3/3 · 生成第 3 页：定制策略矩阵表...",
    ],
    generatingImgBadge: "🎨 绘制配图中...",
    finishingImgBeforeSubmit: "🎨 正在合成配图...",
    slideTabs: ["1. 全景KPI", "2. 缺口图", "3. 策略表"],
    downloadPptxBtn: "⬇ 导出 .pptx",
    yourSlideLabel: "📊 您的简报页",
    targetSlideLabel: "🎯 标杆样例页",
    speakerNotesToggle: "🎙️ 演讲备注",
    readyStatusBar: "✅ 3页简报已就绪 • 提交后锁定上榜成绩",
    backToPromptBtn: "✏️ 返回微调",
    finalSubmitBtn: "🏆 最终确认并提交简报",
    finalSubmittingText: "⚖️ AI 评审团正在打分...",
    jobDoneBadge: "✅ 挑战 2 已完成 — 已锁定上榜",
    jobDoneTitle: "您的 3 页高管战前提案简报已同步至主赛场大屏",
    arenaScoreLabel: "主赛场得分",
    deckScoreLabel: "简报评级",
    rubricHeader: "🏅 6 维高管简报评审详情",
    rubricDims: [
      "结构与完整度",
      "客户共情与定制化",
      "财富洞察与量化测算",
      "方案契合度",
      "异议应对准备",
      "合规与公平待客",
    ],
    viewMainScoreBtn: "🏆 查看主赛场总积分榜",
    proceedC3Btn: "🚀 进入挑战 3 →",
    waitingC3Text: "⏳ 分数已计入大屏总榜！请等待主持人开启挑战 3...",
  },
  yue: {
    studioHeader: "🧠 3頁戰前簡報工作室",
    sampleBtn: "🎯 標竿範例",
    closeSampleBtn: "✕ 關閉",
    targetGoalBanner: "🎯 3頁標竿參考簡報（對應當前客戶）",
    caseInfoBtn: "客戶詳情 ▾",
    hideCaseBtn: "收起 ▴",
    switchCaseFmt: "切換個案",
    switchShortFmt: "切換",
    switchConfirmMsg: "確認切換客戶個案並重新生成 3 頁簡報嗎？",
    step1Tab: "1. 🧩 構建提示詞",
    step2Tab: "2. 📊 3頁簡報",
    pillarsHeader: "1. R.C.T.F.C. 五維積木",
    activateAllShort: "✨ 全選5維",
    pillarTitles: {
      role: "R · 角色",
      context: "C · 背景",
      task: "T · 任務",
      format: "F · 格式",
      constraints: "C · 合規",
    },
    toneHeader: "2. 董事會呈現風格",
    tones: [
      {
        id: "boardroom",
        shortLabel: "🏛️ 董事會",
        clause:
          "[呈現風格]：採用資深家族辦公室董事會風格——聚焦資產負債表同傳承架構，零 Hard Sell。",
      },
      {
        id: "empathy",
        shortLabel: "❤️ 共情護家",
        clause:
          "[呈現風格]：窩心共情切入——守護創業心血同100%家族股權完整，保障另一半生活尊嚴同仔女升學和睦。",
      },
      {
        id: "cfo",
        shortLabel: "📊 CFO量化",
        clause:
          "[呈現風格]：嚴謹 CFO 財務視角——對比每年約 2% 資金配置成本與守護 100% 企業估值完整同法定信託隔離。",
      },
    ],
    angleHeader: "3. 💡 個人策略切入點",
    anglePlaceholder: "撳上面靈感膠囊，或者輸入你嘅專屬約見切入點...",
    inspectPromptShow: "查看完整提示詞 ▾",
    inspectPromptHide: "收起完整提示詞 ▴",
    pillarsReadySuffix: "維已就緒",
    unlockEditBtn: "✏️ 解鎖手動修改",
    lockAutoSyncBtn: "🔒 恢復自動同步",
    generateBtn: "⚡ 生成 3 頁高管戰前簡報",
    regenerateBtn: "🔄 重新生成 3 頁簡報",
    genStages: [
      "1/3 · 構建第 1 頁：客戶快照同 KPI 卡...",
      "2/3 · 測算第 2 頁：流動性缺口柱狀圖...",
      "3/3 · 生成第 3 頁：定制策略矩陣表...",
    ],
    generatingImgBadge: "🎨 繪製配圖中...",
    finishingImgBeforeSubmit: "🎨 緊係度附上配圖...",
    slideTabs: ["1. 全景KPI", "2. 缺口圖", "3. 策略表"],
    downloadPptxBtn: "⬇ 匯出 .pptx",
    yourSlideLabel: "📊 你嘅簡報頁",
    targetSlideLabel: "🎯 標竿範例頁",
    speakerNotesToggle: "🎙️ 演講備註",
    readyStatusBar: "✅ 3頁簡報已就緒 • 提交後鎖定上榜成績",
    backToPromptBtn: "✏️ 返回微調",
    finalSubmitBtn: "🏆 最終確認並提交簡報",
    finalSubmittingText: "⚖️ AI 評審團緊係度評分...",
    jobDoneBadge: "✅ 挑戰 2 已完成 — 已鎖定上榜",
    jobDoneTitle: "你份 3 頁高管戰前提案簡報已同步上主賽場大屏",
    arenaScoreLabel: "主賽場得分",
    deckScoreLabel: "簡報評級",
    rubricHeader: "🏅 6 維高管簡報評審詳情",
    rubricDims: [
      "結構同完整度",
      "客戶人情味同個人化",
      "財富洞察同量化測算",
      "方案契合度",
      "異議應對準備",
      "合規同公平待客",
    ],
    viewMainScoreBtn: "🏆 查看主賽場總積分榜",
    proceedC3Btn: "🚀 進入挑戰 3 →",
    waitingC3Text: "⏳ 分數已計入大屏總榜！請等待主持人開啟挑戰 3...",
  },
  ms: {
    studioHeader: "🧠 Studio Pra-Pitch 3-Slaid",
    sampleBtn: "🎯 Contoh",
    closeSampleBtn: "✕ Tutup",
    targetGoalBanner: "🎯 DEK CONTOH PENANDA ARAS 3-SLAID",
    caseInfoBtn: "Info Kes ▾",
    hideCaseBtn: "Tutup ▴",
    switchCaseFmt: "Tukar Kes",
    switchShortFmt: "Tukar",
    switchConfirmMsg: "Tukar kes pelanggan dan mulakan dek 3-slaid baharu?",
    step1Tab: "1. 🧩 Bina Prompt",
    step2Tab: "2. 📊 Dek 3-Slaid",
    pillarsHeader: "1. Tiang Prompt R.C.T.F.C.",
    activateAllShort: "✨ Aktif Semua 5",
    pillarTitles: {
      role: "R · Peranan",
      context: "C · Konteks",
      task: "T · Tugasan",
      format: "F · Format",
      constraints: "C · Kekangan",
    },
    toneHeader: "2. Gaya Bilik Lembaga",
    tones: [
      {
        id: "boardroom",
        shortLabel: "🏛️ Lembaga",
        clause:
          "[Gaya Pembentangan]: Nada eksekutif Pejabat Keluarga yang berwibawa — fokus kunci kira-kira tanpa tekanan jualan.",
      },
      {
        id: "empathy",
        shortLabel: "❤️ Empati",
        clause:
          "[Gaya Pembentangan]: Nada empati hangat — lindungi maruah keluarga, kesinambungan perniagaan dan pendidikan anak.",
      },
      {
        id: "cfo",
        shortLabel: "📊 CFO",
        clause:
          "[Gaya Pembentangan]: Nada analitik CFO — tekankan kecekapan modal (peruntukan kecairan ~2% setahun demi memelihara 100% nilai ekuiti perniagaan) serta perlindungan amanah.",
      },
    ],
    angleHeader: "3. 💡 Sudut Strategik Peribadi",
    anglePlaceholder: "Ketik cadangan di atas atau tulis pendekatan peribadi anda...",
    inspectPromptShow: "Lihat Prompt Penuh ▾",
    inspectPromptHide: "Sembunyi Prompt ▴",
    pillarsReadySuffix: "Tiang Sedia",
    unlockEditBtn: "✏️ Sunting Manual",
    lockAutoSyncBtn: "🔒 Segerak Semula",
    generateBtn: "⚡ Jana Dek Eksekutif 3-Slaid",
    regenerateBtn: "🔄 Jana Semula Dek 3-Slaid",
    genStages: [
      "1/3 · Membina Slaid 1 KPI Pelanggan...",
      "2/3 · Memodelkan Slaid 2 Carta Jurang...",
      "3/3 · Menyusun Slaid 3 Strategi...",
    ],
    generatingImgBadge: "🎨 Menjana visual...",
    finishingImgBeforeSubmit: "🎨 Melampirkan visual...",
    slideTabs: ["1. KPI", "2. Carta Jurang", "3. Strategi"],
    downloadPptxBtn: "⬇ Eksport .pptx",
    yourSlideLabel: "📊 SLAID ANDA",
    targetSlideLabel: "🎯 SLAID CONTOH",
    speakerNotesToggle: "🎙️ Nota Pembentang",
    readyStatusBar: "✅ Dek 3-Slaid Sedia • Hantar Akhir Mengunci Markah",
    backToPromptBtn: "✏️ Kemas Kini",
    finalSubmitBtn: "🏆 Muktamadkan & Hantar",
    finalSubmittingText: "⚖️ Hakim AI Menilai Dek Anda...",
    jobDoneBadge: "✅ CABARAN 2 SELESAI — DIKUNCI",
    jobDoneTitle: "Dek Pra-Pembentangan Eksekutif 3-Slaid Anda Kini Di Arena Utama",
    arenaScoreLabel: "Markah Arena",
    deckScoreLabel: "Penilaian Dek",
    rubricHeader: "🏅 Pecahan Rubrik 6-Dimensi",
    rubricDims: [
      "Struktur & Kesempurnaan",
      "Empati & Pemperibadian Pelanggan",
      "Wawasan Kekayaan & Kuantifikasi",
      "Kesesuaian Penyelesaian",
      "Kesediaan Menangani Bantahan",
      "Pematuhan & Layanan Adil",
    ],
    viewMainScoreBtn: "🏆 Lihat Papan Pendahulu Utama",
    proceedC3Btn: "🚀 Teruskan ke Cabaran 3 →",
    waitingC3Text: "⏳ Markah direkodkan! Menunggu Penyampai membuka Cabaran 3...",
  },
  ta: {
    studioHeader: "🧠 3-ஸ்லைடு முன்-முன்மொழிவு ஸ்டுடியோ",
    sampleBtn: "🎯 மாதிரி",
    closeSampleBtn: "✕ மூடு",
    targetGoalBanner: "🎯 3-ஸ்லைடு மாதிரி விளக்கக்காட்சி",
    caseInfoBtn: "வழக்கு விவரம் ▾",
    hideCaseBtn: "சுருக்கு ▴",
    switchCaseFmt: "வழக்கை மாற்று",
    switchShortFmt: "மாற்று",
    switchConfirmMsg: "வாடிக்கையாளர் வழக்கை மாற்றி புதிய 3-ஸ்லைடு டெக்கை உருவாக்கவா?",
    step1Tab: "1. 🧩 ப்ராம்ப்ட்",
    step2Tab: "2. 📊 3-ஸ்லைடு டெக்",
    pillarsHeader: "1. R.C.T.F.C. 5 தூண்கள்",
    activateAllShort: "✨ 5-ம் இயக்கு",
    pillarTitles: {
      role: "R · பங்கு",
      context: "C · பின்னணி",
      task: "T · பணி",
      format: "F · வடிவம்",
      constraints: "C · விதிகள்",
    },
    toneHeader: "2. போர்டுரூம் பாணி",
    tones: [
      {
        id: "boardroom",
        shortLabel: "🏛️ போர்டுரூம்",
        clause:
          "[Presentation Style]: Authoritative Family-Office boardroom tone — crisp balance-sheet framing, zero sales pressure.",
      },
      {
        id: "empathy",
        shortLabel: "❤️ அக்கறை",
        clause:
          "[Presentation Style]: Warm founder empathy — protect family harmony, spouse security, and children's education.",
      },
      {
        id: "cfo",
        shortLabel: "📊 CFO",
        clause:
          "[Presentation Style]: Analytical CFO tone — emphasize capital efficiency (~2% p.a. liquidity allocation vs preserving 100% enterprise valuation) and statutory ring-fencing.",
      },
    ],
    angleHeader: "3. 💡 தனிப்பட்ட உத்தி கோணம்",
    anglePlaceholder: "மேலுள்ள குறிப்பைத் தட்டவும் அல்லது உங்கள் அணுகுமுறையை எழுதவும்...",
    inspectPromptShow: "முழு ப்ராம்ப்ட்டை பார்க்க ▾",
    inspectPromptHide: "ப்ராம்ப்ட்டை மறை ▴",
    pillarsReadySuffix: "தூண்கள் தயார்",
    unlockEditBtn: "✏️ திருத்த திறக்கவும்",
    lockAutoSyncBtn: "🔒 தானியங்கு இணைப்பு",
    generateBtn: "⚡ 3-ஸ்லைடு டெக்கை உருவாக்கு",
    regenerateBtn: "🔄 மீண்டும் 3-ஸ்லைடு உருவாக்கு",
    genStages: [
      "1/3 · ஸ்லைடு 1 வாடிக்கையாளர் KPI...",
      "2/3 · ஸ்லைடு 2 இடைவெளி வரைபடம்...",
      "3/3 · ஸ்லைடு 3 தீர்வு அட்டவணை...",
    ],
    generatingImgBadge: "🎨 படங்கள் உருவாகின்றன...",
    finishingImgBeforeSubmit: "🎨 படங்களை இணைக்கிறது...",
    slideTabs: ["1. KPI", "2. வரைபடம்", "3. உத்தி"],
    downloadPptxBtn: "⬇ .pptx பதிவிறக்கம்",
    yourSlideLabel: "📊 உங்கள் ஸ்லைடு",
    targetSlideLabel: "🎯 மாதிரி ஸ்லைடு",
    speakerNotesToggle: "🎙️ பேச்சாளர் குறிப்பு",
    readyStatusBar: "✅ 3-ஸ்லைடு டெக் தயார் • இறுதி சமர்ப்பிப்பு மதிப்பெண்ணைப் பூட்டும்",
    backToPromptBtn: "✏️ மாற்றி அமை",
    finalSubmitBtn: "🏆 இறுதி செய்து சமர்ப்பி",
    finalSubmittingText: "⚖️ AI நடுவர் மதிப்பிடுகிறார்...",
    jobDoneBadge: "✅ சவால் 2 முடிந்தது — பூட்டப்பட்டது",
    jobDoneTitle: "உங்கள் 3-ஸ்லைடு விளக்கக்காட்சி பிரதான அரங்கில் பதிவானது",
    arenaScoreLabel: "அரங்க மதிப்பெண்",
    deckScoreLabel: "டெக் மதிப்பீடு",
    rubricHeader: "🏅 6-பரிமாண AI நடுவர் மதிப்பீடு",
    rubricDims: [
      "கட்டமைப்பு & முழுமை",
      "வாடிக்கையாளர் அக்கறை & தனிப்பயனாக்கம்",
      "செல்வ நுண்ணறிவு & எண் மதிப்பீடு",
      "தீர்வுப் பொருத்தம்",
      "ஆட்சேபனை எதிர்கொள்ளல்",
      "விதிமுறை இணக்கம் & நேர்மை",
    ],
    viewMainScoreBtn: "🏆 பிரதான தரவரிசைப் பட்டியல்",
    proceedC3Btn: "🚀 சவால் 3-க்குச் செல்லவும் →",
    waitingC3Text: "⏳ மதிப்பெண் பதிவானது! சவால் 3 திறக்கப்படும் வரை காத்திருக்கவும்...",
  },
};

const PILLAR_HEURISTICS = {
  role: [/role|peranan|角色|பங்கு|strategist|consultant|advisor|perunding|顾问|顧問|ஆலோசகர்|family-office|prumda/i],
  context: [/rm\s*\d+|net worth|nilai bersih|净资产|淨資產|நிகர சொத்து|liquidity|kecairan|流动性|流動性|பணப்புழக்க/i],
  task: [/3-slide|3 slide|3 slaid|3页|3 页|3頁|3 頁|3-ஸ்லைடு|3 ஸ்லைடுகள்|pre-pitch|pra-pembentangan|战前|戰前|முன்-முன்மொழிவு/i],
  format: [/kpi|chart|table|carta|jadual|柱状图|柱狀圖|策略|வரைபடம்|அட்டவணை|speaker notes|nota pembentang|备注|備註|பேச்சாளர்/i],
  constraints: [/bnm|pds|free-look|free look|15-day|15 hari|15天|15日|15-நாள்|fact-find|analisis keperluan|需求分析|schedule 10|shariah|syariah|takaful|hibah|法定信托|法定信託|ஷரியா/i],
};

function detectPillarStatusClient(promptText, guideSteps) {
  const txt = String(promptText || "");
  const hasExplicitTags = /\[(Role|Context|Task|Format|Constraints)\]:/i.test(txt);
  const tagMap = {
    role: "Role",
    context: "Context",
    task: "Task",
    format: "Format",
    constraints: "Constraints",
  };
  const out = {};
  (guideSteps || []).forEach((g) => {
    const k = g.key;
    const tag = tagMap[k];
    if (tag && new RegExp(`\\[${tag}\\]:\\s*\\S`, "i").test(txt)) {
      out[k] = "done";
      return;
    }
    const tmpl = String(g.template || "").trim();
    if (tmpl && txt.includes(tmpl.slice(0, Math.min(26, tmpl.length)))) {
      out[k] = "done";
      return;
    }
    if (hasExplicitTags) {
      out[k] = "missing";
      return;
    }
    const regexes = PILLAR_HEURISTICS[k] || [];
    out[k] = regexes.some((rx) => rx.test(txt)) ? "done" : "missing";
  });
  return out;
}

function getSemanticBarStyle(label, idx, totalBars) {
  const low = String(label || "").toLowerCase();
  if (/gap|shortfall|缺口|jurang|பற்றாக்குறை|இடைவெளி/.test(low) || (totalBars === 3 && idx === 2)) {
    return {
      bar: "bg-gradient-to-t from-[#b80d1d] to-[#ed1b2e] ring-2 ring-red-200",
      val: "text-[#ed1b2e]",
      tag: "GAP",
    };
  }
  if (/available|liquid|have|cover|现有|現有|sedia ada|இருப்பு/.test(low) || (totalBars === 3 && idx === 1)) {
    return {
      bar: "bg-gradient-to-t from-emerald-700 to-emerald-500",
      val: "text-emerald-700",
      tag: null,
    };
  }
  return {
    bar: "bg-gradient-to-t from-slate-900 to-slate-700",
    val: "text-slate-900",
    tag: null,
  };
}

/* Luxury 16:9 Executive Keynote Slide Card Component (Shared Globally) */
function ExecutiveSlideCard({
  slide,
  slideIndex,
  totalSlides = 3,
  badgeLabel,
  speakerNotesLabel,
  generatingImages = false,
  compact = false,
}) {
  const [showNotesMobile, setShowNotesMobile] = React.useState(false);

  React.useEffect(() => {
    setShowNotesMobile(false);
  }, [slideIndex, slide?.title]);

  if (!slide) return null;
  const clampedTotal = Math.min(3, Math.max(1, totalSlides || 3));
  const maxChartVal =
    slide.chart && Array.isArray(slide.chart.series)
      ? Math.max(...slide.chart.series.map((p) => Number(p.value) || 0), 1)
      : 1;

  return (
    <div className="bg-white border-2 border-slate-200 rounded-2xl overflow-hidden shadow-md flex flex-col justify-between">
      <div>
        {/* Executive Dark Navy + Crimson Keynote Banner */}
        <div className="h-1.5 bg-gradient-to-r from-[#ed1b2e] via-red-500 to-amber-500" />
        <div className="bg-slate-900 text-white px-3.5 py-2.5 sm:px-5 sm:py-3.5 flex items-start justify-between gap-2.5">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-1.5 mb-1">
              <span className="px-2 py-0.5 rounded bg-[#ed1b2e] text-white text-[10px] font-extrabold uppercase tracking-wider">
                SLIDE {slideIndex + 1} / {clampedTotal}
              </span>
              {badgeLabel && (
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-300">
                  {badgeLabel}
                </span>
              )}
            </div>
            <h4
              className={`${
                compact ? "text-xs sm:text-sm" : "text-sm sm:text-base"
              } font-extrabold text-white leading-snug`}
            >
              {slide.title}
            </h4>
            {slide.subtitle && (
              <div className="text-[11px] text-slate-300 mt-0.5 leading-snug">{slide.subtitle}</div>
            )}
          </div>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-amber-300 border border-slate-700 font-bold uppercase shrink-0">
            {slide.layout || "executive"}
          </span>
        </div>

        {/* Slide Body */}
        <div className={`${compact ? "p-3 space-y-2.5" : "p-3.5 sm:p-5 space-y-3"}`}>
          {/* KPI Metric Cards */}
          {Array.isArray(slide.kpis) && slide.kpis.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {slide.kpis.slice(0, 4).map((k, ki) => (
                <div
                  key={ki}
                  className="bg-gradient-to-br from-slate-50 to-red-50/40 border border-slate-200 border-t-2 border-t-[#ed1b2e] rounded-xl p-2.5 shadow-sm"
                >
                  <div className="text-[10px] font-extrabold uppercase tracking-wide text-slate-500 truncate">
                    {k.label}
                  </div>
                  <div className="text-sm sm:text-base font-extrabold text-slate-900 mt-0.5">
                    {k.value}
                  </div>
                  {k.note && (
                    <div className="text-[10px] text-slate-500 mt-0.5 leading-tight">{k.note}</div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Semantic Liquidity Gap Bar Chart */}
          {slide.chart && Array.isArray(slide.chart.series) && slide.chart.series.length > 0 && (
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 space-y-2">
              <div className="flex items-center justify-between text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                <span>Quantified Exposure Stress-Test</span>
                {slide.chart.unit && <span>{slide.chart.unit}</span>}
              </div>
              <div className="flex items-end gap-3 sm:gap-4 h-28 pt-5 px-2 sm:px-3 border-b-2 border-slate-300">
                {slide.chart.series.map((pt, pi) => {
                  const pct = Math.max(12, Math.round(((Number(pt.value) || 0) / maxChartVal) * 100));
                  const st = getSemanticBarStyle(pt.label, pi, slide.chart.series.length);
                  return (
                    <div key={pi} className="flex-1 flex flex-col items-center justify-end h-full">
                      <div className={`text-xs font-extrabold mb-1 ${st.val}`}>
                        {pt.value}
                      </div>
                      <div
                        className={`w-3/4 max-w-[76px] rounded-t-lg transition-all shadow-sm ${st.bar}`}
                        style={{ height: `${pct}%` }}
                      />
                    </div>
                  );
                })}
              </div>
              <div className="flex gap-3 sm:gap-4 px-2 sm:px-3">
                {slide.chart.series.map((pt, pi) => (
                  <div
                    key={pi}
                    className="flex-1 text-center text-[10px] sm:text-[11px] font-bold text-slate-700 leading-tight"
                  >
                    {pt.label}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Executive Strategy Matrix: Mobile Stacked Cards (<640px) + Desktop Table (>=640px) */}
          {slide.table && Array.isArray(slide.table.headers) && slide.table.headers.length > 0 && (
            <div>
              {/* Mobile-Native Strategy Cards */}
              <div className="sm:hidden space-y-2">
                {(slide.table.rows || []).map((row, ri) => {
                  const needTxt = row[0] || "";
                  const approachTxt = row[1] || "";
                  const fitTxt = row[2] || "";
                  const coverTxt = row.length > 3 ? row[row.length - 1] : "";
                  return (
                    <div
                      key={ri}
                      className="bg-slate-50 border border-slate-200 border-l-4 border-l-[#ed1b2e] rounded-xl p-2.5 space-y-1 shadow-sm"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-slate-900 text-white text-[10px] font-extrabold leading-tight">
                          {needTxt}
                        </span>
                        {coverTxt && (
                          <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-red-50 border border-red-200 text-[#ed1b2e] text-[10px] font-extrabold shrink-0">
                            {coverTxt}
                          </span>
                        )}
                      </div>
                      {approachTxt && (
                        <div className="text-xs font-extrabold text-slate-900 leading-snug">
                          {approachTxt}
                        </div>
                      )}
                      {fitTxt && (
                        <div className="text-[11px] text-slate-600 leading-snug">{fitTxt}</div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Desktop / Tablet HTML Table */}
              <div className="hidden sm:block overflow-x-auto border border-slate-200 rounded-xl shadow-sm">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-slate-900 text-white">
                      {slide.table.headers.map((h, hi) => (
                        <th key={hi} className="px-2.5 py-2 font-extrabold text-[11px] tracking-wide">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {(slide.table.rows || []).map((row, ri) => (
                      <tr key={ri} className={ri % 2 === 1 ? "bg-slate-50/90" : "bg-white"}>
                        {slide.table.headers.map((_, ci) => (
                          <td
                            key={ci}
                            className={`px-2.5 py-2 border-t border-slate-200 text-[11px] align-top ${
                              ci === 0
                                ? "font-extrabold text-slate-900"
                                : ci === slide.table.headers.length - 1
                                ? "font-extrabold text-[#ed1b2e] whitespace-nowrap"
                                : "text-slate-700"
                            }`}
                          >
                            {row[ci] || ""}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Two Column Layout */}
          {(slide.left || slide.right) && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {[slide.left, slide.right].map((col, ci) =>
                col ? (
                  <div key={ci} className="bg-slate-50 border border-slate-200 rounded-xl p-3">
                    {col.heading && (
                      <div className="text-xs font-extrabold text-[#ed1b2e] mb-1.5">{col.heading}</div>
                    )}
                    {Array.isArray(col.bullets) && (
                      <ul className="space-y-1 text-[11px] text-slate-700">
                        {col.bullets.map((b, bi) => (
                          <li key={bi} className="flex items-start gap-1.5">
                            <span className="text-[#ed1b2e] font-bold">▪</span>
                            <span>{b}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ) : null
              )}
            </div>
          )}

          {/* Timeline Steps */}
          {Array.isArray(slide.steps) && slide.steps.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {slide.steps.map((st, si) => (
                <div key={si} className="bg-slate-50 border border-slate-200 rounded-xl p-2.5">
                  <div className="text-xs font-extrabold text-[#ed1b2e]">
                    {si + 1}. {st.label}
                  </div>
                  <div className="text-[11px] text-slate-600 mt-0.5">{st.detail}</div>
                </div>
              ))}
            </div>
          )}

          {/* Full-Width Executive Bullets (No Decorative Boardroom Image Clutter) */}
          {Array.isArray(slide.bullets) && slide.bullets.length > 0 ? (
            <ul className="space-y-1.5 text-xs text-slate-800 leading-snug">
              {slide.bullets.slice(0, 5).map((b, bi) => (
                <li key={bi} className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#ed1b2e] mt-1.5 shrink-0" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          ) : null}

          {/* Executive Callout Strip */}
          {slide.callout && (
            <div className="bg-gradient-to-r from-red-50 to-amber-50/50 border-l-4 border-l-[#ed1b2e] px-3 py-2 rounded-r-xl text-xs font-bold text-slate-900">
              {slide.callout}
            </div>
          )}
        </div>
      </div>

      {/* Collapsible Speaker Notes on Mobile + Visible on Desktop */}
      {slide.speaker_notes && (
        <div className="bg-slate-50 border-t border-slate-200">
          <div className="sm:hidden">
            <button
              type="button"
              onClick={() => setShowNotesMobile((v) => !v)}
              className="w-full px-3.5 py-2 flex items-center justify-between text-[11px] font-extrabold text-slate-700"
            >
              <span>{speakerNotesLabel || "🎙️ Speaker Notes"}</span>
              <span className="text-slate-400">{showNotesMobile ? "▴" : "▾"}</span>
            </button>
            {showNotesMobile && (
              <div className="px-3.5 pb-2.5 text-[11px] text-slate-600 leading-snug">
                {slide.speaker_notes}
              </div>
            )}
          </div>
          <div className="hidden sm:block px-4 py-2 text-[11px] text-slate-600 leading-snug">
            <span className="font-extrabold text-slate-800 mr-1.5">
              {speakerNotesLabel || "🎙️ Speaker Notes"}:
            </span>
            {slide.speaker_notes}
          </div>
        </div>
      )}
    </div>
  );
}

window.ExecutiveSlideCard = ExecutiveSlideCard;

window.Challenge2ParticipantView = function ({
  t,
  lang,
  agentId,
  agentName,
  agentRegion,
  canProceedNext = true,
  onNext,
  fetchArenaState,
  onSandboxPreview,
  existingSubmission = null,
  existingScore = null,
  isCompleted = false,
  onViewScorecard = null,
}) {
  const { useState, useEffect, useRef } = React;
  const normLang = lang === "zh-TW" || lang === "zh-HK" ? "yue" : lang || "en";
  const ui = C2_UI_I18N[normLang] || C2_UI_I18N.en;
  const storageKey = `prumda_c2_v6_${agentId || "anon"}`;

  // Restore saved draft from localStorage if available (only reuse text if draftLang matches normLang!)
  const savedDraftRef = useRef(null);
  if (savedDraftRef.current === null) {
    try {
      const raw = localStorage.getItem(storageKey);
      savedDraftRef.current = raw ? JSON.parse(raw) : {};
    } catch (e) {
      savedDraftRef.current = {};
    }
  }
  const initDraft = savedDraftRef.current || {};
  const sameDraftLang = !initDraft.draftLang || initDraft.draftLang === normLang;

  const [challengeData, setChallengeData] = useState(null);
  const [loadingChallenge, setLoadingChallenge] = useState(true);
  // Only restore explicit seatOverride if the participant manually switched cases!
  const [seatOverride, setSeatOverride] = useState(
    initDraft.userPickedSeat === true && typeof initDraft.seatOverride === "number"
      ? initDraft.seatOverride
      : null
  );
  const [showCasePicker, setShowCasePicker] = useState(false);
  const [showBenchmark, setShowBenchmark] = useState(false);
  const [targetSlideIdx, setTargetSlideIdx] = useState(0);

  // Step & Brief Collapse State
  const [activeStep, setActiveStep] = useState(initDraft.deck ? "2" : "1");
  const [showBrief, setShowBrief] = useState(initDraft.deck ? false : true);
  const [selectedToneId, setSelectedToneId] = useState(
    sameDraftLang && initDraft.selectedToneId ? initDraft.selectedToneId : null
  );
  const [selectedAngleChipIdx, setSelectedAngleChipIdx] = useState(
    sameDraftLang && typeof initDraft.selectedAngleChipIdx === "number"
      ? initDraft.selectedAngleChipIdx
      : null
  );
  const [userTypedCustomAngle, setUserTypedCustomAngle] = useState(
    sameDraftLang ? Boolean(initDraft.userTypedCustomAngle) : false
  );
  const [personalAngle, setPersonalAngle] = useState(
    sameDraftLang ? initDraft.personalAngle || "" : ""
  );
  const [promptText, setPromptText] = useState(
    sameDraftLang ? initDraft.promptText || "" : ""
  );
  const [manualPromptEdited, setManualPromptEdited] = useState(false);
  const [manualEditUnlocked, setManualEditUnlocked] = useState(true);
  const [activePillarsMap, setActivePillarsMap] = useState(
    sameDraftLang && initDraft.activePillarsMap
      ? initDraft.activePillarsMap
      : {
          role: false,
          context: false,
          task: true,
          format: false,
          constraints: false,
        }
  );
  const [lastUpdatedTag, setLastUpdatedTag] = useState("");

  // Generated 3-Slide Deck State
  const [deck, setDeck] = useState(initDraft.deck || null);
  const [deckSignature, setDeckSignature] = useState(initDraft.deckSignature || "");
  const [slideIdx, setSlideIdx] = useState(0);
  const [generatingDeck, setGeneratingDeck] = useState(false);
  const [genStageIdx, setGenStageIdx] = useState(0);
  const [imagesLoading, setImagesLoading] = useState(false);
  const [waitingImagesForSubmit, setWaitingImagesForSubmit] = useState(false);
  const [genError, setGenError] = useState(null);
  const [history, setHistory] = useState(initDraft.history || []);
  const [lineage, setLineage] = useState([]);

  // One-Time Final Submission State
  const [submittingFinal, setSubmittingFinal] = useState(false);
  const [lockedSubmission, setLockedSubmission] = useState(null);
  const [lockedScore, setLockedScore] = useState(null);

  const startRef = useRef(Date.now());
  const sessionIdRef = useRef(`c2-${agentId || "anon"}-${Date.now()}`);
  const imagePromiseRef = useRef(null);
  const latestDeckRef = useRef(initDraft.deck || null);
  useEffect(() => {
    latestDeckRef.current = deck;
  }, [deck]);

  // Auto-collapse client brief on Step 2, expand on Step 1
  useEffect(() => {
    if (activeStep === "2") {
      setShowBrief(false);
      setShowCasePicker(false);
    } else {
      setShowBrief(true);
    }
  }, [activeStep]);

  // Persist draft in localStorage (preserving draftLang & userPickedSeat vs server-assigned seat)
  useEffect(() => {
    if (lockedSubmission) return;
    try {
      localStorage.setItem(
        storageKey,
        JSON.stringify({
          draftLang: normLang,
          userPickedSeat: seatOverride !== null && seatOverride !== undefined,
          seatOverride: seatOverride,
          selectedToneId,
          selectedAngleChipIdx,
          userTypedCustomAngle,
          personalAngle,
          promptText,
          manualPromptEdited,
          activePillarsMap,
          deck,
          deckSignature,
          history,
        })
      );
    } catch (e) {}
  }, [
    storageKey,
    normLang,
    seatOverride,
    selectedToneId,
    selectedAngleChipIdx,
    userTypedCustomAngle,
    personalAngle,
    promptText,
    manualPromptEdited,
    activePillarsMap,
    deck,
    deckSignature,
    history,
    lockedSubmission,
  ]);

  // Animated 3-stage progress ticker while deck is generating
  useEffect(() => {
    if (!generatingDeck) {
      setGenStageIdx(0);
      return;
    }
    const iv = setInterval(() => {
      setGenStageIdx((prev) => (prev + 1) % 3);
    }, 850);
    return () => clearInterval(iv);
  }, [generatingDeck]);

  // Sync if participant already completed Challenge 2 in Arena State
  useEffect(() => {
    if (isCompleted && existingSubmission && !lockedSubmission) {
      setLockedSubmission(existingSubmission);
      setLockedScore(
        existingScore || {
          total: existingSubmission.total || 95,
          speed: 92,
          accuracy: existingSubmission.total || 96,
          timeSec: existingSubmission.timeSec || 22,
          criteria: existingSubmission.pillarScores || {},
          judgeFeedback: existingSubmission.judgeFeedback || "",
        }
      );
      if (existingSubmission.deck) {
        setDeck({
          ...existingSubmission.deck,
          slides: (existingSubmission.deck.slides || []).slice(0, 3),
        });
      }
      if (existingSubmission.userInput) {
        setPromptText(existingSubmission.userInput);
      }
      if (existingSubmission.personalAngle) {
        setPersonalAngle(existingSubmission.personalAngle);
      }
    }
  }, [isCompleted, existingSubmission, existingScore]);

  const KEY_TO_TAG = {
    role: "Role",
    context: "Context",
    task: "Task",
    format: "Format",
    constraints: "Constraints",
  };
  const CANONICAL_TAGS = [
    "Role",
    "Context",
    "Task",
    "Format",
    "Constraints",
    "Tone",
    "Personal Strategic Angle",
  ];

  // Parse promptText into tagged canonical blocks + any untagged custom user paragraphs
  const parsePromptBlocks = (rawPrompt) => {
    const blocks = {};
    const customParas = [];
    const tagRegex = /^\[(Role|Context|Task|Format|Constraints|Tone|Personal Strategic Angle)\]:\s*([\s\S]*)$/i;
    String(rawPrompt || "")
      .split(/\n{2,}/)
      .map((p) => p.trim())
      .filter(Boolean)
      .forEach((para) => {
        const m = para.match(tagRegex);
        if (m) {
          const canon = CANONICAL_TAGS.find((t) => t.toLowerCase() === m[1].toLowerCase()) || m[1];
          blocks[canon] = m[2].trim();
        } else {
          customParas.push(para);
        }
      });
    return { blocks, customParas };
  };

  const serializePromptBlocks = (blocks, customParas) => {
    const out = [];
    CANONICAL_TAGS.forEach((tag) => {
      if (blocks[tag] && String(blocks[tag]).trim()) {
        out.push(`[${tag}]: ${String(blocks[tag]).trim()}`);
      }
    });
    (customParas || []).forEach((cp) => {
      if (cp && cp.trim()) out.push(cp.trim());
    });
    return out.join("\n\n");
  };

  const upsertOrRemovePromptBlock = (currentPrompt, tag, bodyText, shouldInclude) => {
    const { blocks, customParas } = parsePromptBlocks(currentPrompt);
    if (shouldInclude && bodyText && String(bodyText).trim()) {
      blocks[tag] = String(bodyText).trim();
    } else {
      delete blocks[tag];
    }
    return serializePromptBlocks(blocks, customParas);
  };

  // Assemble clean R.C.T.F.C. + Tone + Personal Strategic Angle prompt in explicit targetLang
  const buildAssembledPrompt = (
    guideList,
    pMap,
    toneId,
    angleStr,
    simpleFallback,
    targetLang = normLang
  ) => {
    const anyActive = Object.values(pMap || {}).some(Boolean);
    const langDict = C2_UI_I18N[targetLang] || C2_UI_I18N.en;
    const blocks = {};
    if (anyActive) {
      (guideList || []).forEach((g) => {
        const tag = KEY_TO_TAG[g.key];
        if (tag && pMap[g.key] && g.template) {
          blocks[tag] = g.template.trim();
        }
      });
    }
    const toneObj = toneId ? (langDict.tones || []).find((x) => x.id === toneId) : null;
    if (toneObj && toneObj.clause) {
      blocks["Tone"] = toneObj.clause.trim();
    }
    if (angleStr && angleStr.trim().length > 0) {
      blocks["Personal Strategic Angle"] = angleStr.trim();
    }
    const built = serializePromptBlocks(blocks, []);
    return built || simpleFallback || "";
  };

  const flashTagFeedback = (label) => {
    setLastUpdatedTag(label);
    setTimeout(() => {
      setLastUpdatedTag((cur) => (cur === label ? "" : cur));
    }, 1800);
  };

  const prevNormLangRef = useRef(normLang);
  const latestReqIdRef = useRef(0);

  // Load localized, per-seat Challenge 2 scenario (/api/challenge)
  // WITHOUT seat= on initial load so server-assigned 72-seat distribution is preserved!
  const loadScenarioSeat = (
    explicitSeat = null,
    resetDeckOnSwitch = false,
    targetLang = normLang,
    langSwitched = false
  ) => {
    const reqId = ++latestReqIdRef.current;
    setLoadingChallenge(true);
    const params = new URLSearchParams({
      market: "MY",
      lang: targetLang,
    });
    if (agentId) params.set("id", agentId);
    if (explicitSeat !== null && explicitSeat !== undefined) {
      params.set("seat", String(explicitSeat));
      params.set("persist", "1");
    }
    fetch(`/api/challenge?${params.toString()}`, { cache: "no-store" })
      .then((r) => r.json())
      .then((data) => {
        if (reqId !== latestReqIdRef.current) return;
        setChallengeData(data);
        setLoadingChallenge(false);
        const gList = data.guide || [];
        const hints = data.angleHints || [];
        if (resetDeckOnSwitch) {
          const starterMap = { role: false, context: false, task: true, format: false, constraints: false };
          setActivePillarsMap(starterMap);
          setSelectedToneId(null);
          setSelectedAngleChipIdx(null);
          setUserTypedCustomAngle(false);
          setPersonalAngle("");
          setDeck(null);
          setDeckSignature("");
          setActiveStep("1");
          setShowBrief(true);
          setPromptText(
            buildAssembledPrompt(gList, starterMap, null, "", data.simple_prompt, targetLang)
          );
        } else {
          const isTargetCjk = targetLang === "zh-CN" || targetLang === "yue";
          const hasStaleCjkInNonCjk = !isTargetCjk && /[\u4e00-\u9fff]/.test(personalAngle || "");
          const hasChipSelected =
            typeof selectedAngleChipIdx === "number" &&
            selectedAngleChipIdx >= 0 &&
            selectedAngleChipIdx < hints.length;
          const nextAngle = hasChipSelected
            ? hints[selectedAngleChipIdx]
            : hasStaleCjkInNonCjk
            ? ""
            : personalAngle || "";

          setPersonalAngle(nextAngle);
          if (
            langSwitched ||
            !promptText ||
            !promptText.trim() ||
            (!isTargetCjk && /[\u4e00-\u9fff]/.test(promptText || ""))
          ) {
            setPromptText(
              buildAssembledPrompt(
                gList,
                activePillarsMap,
                selectedToneId,
                nextAngle,
                data.simple_prompt,
                targetLang
              )
            );
          }
        }
      })
      .catch(() => {
        if (reqId === latestReqIdRef.current) setLoadingChallenge(false);
      });
  };

  useEffect(() => {
    const langSwitched = prevNormLangRef.current !== normLang;
    prevNormLangRef.current = normLang;
    loadScenarioSeat(seatOverride, false, normLang, langSwitched);
  }, [normLang, agentId]);

  const handleTogglePillar = (key) => {
    const gObj = (challengeData?.guide || []).find((x) => x.key === key);
    if (!gObj) return;
    const tag = KEY_TO_TAG[key];
    const currentlyActive = pillarStatuses[key] === "done";
    const shouldInclude = !currentlyActive;
    const nextMap = { ...activePillarsMap, [key]: shouldInclude };
    setActivePillarsMap(nextMap);
    setPromptText((prev) => {
      const updated = upsertOrRemovePromptBlock(prev, tag, gObj.template, shouldInclude);
      return updated || challengeData?.simple_prompt || "";
    });
    flashTagFeedback(`${shouldInclude ? "+ Added" : "− Removed"} [${tag}]`);
    setLineage((prev) => [
      ...prev,
      { t: Math.round((Date.now() - startRef.current) / 1000), e: "toggle", k: key },
    ]);
  };

  const handleActivateAllPillars = () => {
    const allOn = { role: true, context: true, task: true, format: true, constraints: true };
    setActivePillarsMap(allOn);
    setPromptText((prev) => {
      let cur = prev;
      (challengeData?.guide || []).forEach((g) => {
        const tag = KEY_TO_TAG[g.key];
        if (tag && g.template) {
          cur = upsertOrRemovePromptBlock(cur, tag, g.template, true);
        }
      });
      return cur;
    });
    flashTagFeedback("✓ Added All 5 R.C.T.F.C. Pillars");
  };

  const handleSelectTone = (toneId) => {
    const togglingOff = selectedToneId === toneId;
    const nextTone = togglingOff ? null : toneId;
    setSelectedToneId(nextTone);
    const toneObj = nextTone ? (ui.tones || []).find((x) => x.id === nextTone) : null;
    setPromptText((prev) =>
      upsertOrRemovePromptBlock(prev, "Tone", toneObj?.clause || "", Boolean(toneObj))
    );
    flashTagFeedback(toneObj ? `+ Tone: ${toneObj.shortLabel}` : "− Removed [Tone]");
  };

  const handlePickAngleChip = (hintVal, chipIdx) => {
    const togglingOff = personalAngle.trim() === hintVal.trim();
    const nextIdx = togglingOff ? null : chipIdx;
    const nextVal = togglingOff ? "" : hintVal;
    setSelectedAngleChipIdx(nextIdx);
    setUserTypedCustomAngle(false);
    setPersonalAngle(nextVal);
    setPromptText((prev) =>
      upsertOrRemovePromptBlock(prev, "Personal Strategic Angle", nextVal, Boolean(nextVal))
    );
    flashTagFeedback(nextVal ? "+ Added [Personal Strategic Angle]" : "− Removed [Angle]");
  };

  const handleLivePromptEdit = (rawVal) => {
    setPromptText(rawVal);
    const { blocks } = parsePromptBlocks(rawVal);
    const nextMap = {
      role: Boolean(blocks["Role"]),
      context: Boolean(blocks["Context"]),
      task: Boolean(blocks["Task"]),
      format: Boolean(blocks["Format"]),
      constraints: Boolean(blocks["Constraints"]),
    };
    setActivePillarsMap(nextMap);
    if (blocks["Personal Strategic Angle"]) {
      setPersonalAngle(blocks["Personal Strategic Angle"]);
    }
  };

  // Current 72-seat coordinates: caseSlot (0..5) + personaRound (0..11)
  const currentSeat = typeof challengeData?.seatIndex === "number" ? challengeData.seatIndex : 0;
  const currentCaseSlot = ((currentSeat % 6) + 6) % 6;
  const currentPersonaRound = Math.floor(currentSeat / 6);

  const handlePickCaseSlot = (targetSlot) => {
    const k = ((targetSlot % 6) + 6) % 6;
    if (k === currentCaseSlot) {
      setShowCasePicker(false);
      return;
    }
    if (deck && !window.confirm(ui.switchConfirmMsg)) {
      return;
    }
    const total = challengeData?.totalUniqueSeats || 72;
    const nextSeat = (currentPersonaRound * 6 + k) % total;
    setSeatOverride(nextSeat);
    setShowCasePicker(false);
    loadScenarioSeat(nextSeat, true);
  };

  // Ping Arena activity
  const pingActivity = (statusText, stepLabel) => {
    if (!agentId) return;
    fetch("/api/activity", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: agentId,
        challenge: 2,
        language: lang,
        status: statusText,
        agenticStep: stepLabel,
      }),
    }).catch(() => {});
  };

  const guideSteps = challengeData?.guide || [];
  const pillarStatuses = detectPillarStatusClient(promptText, guideSteps);
  const activePillarCount = Object.values(pillarStatuses).filter((v) => v === "done").length;
  const scen = challengeData?.scenario || null;
  const caseCards = challengeData?.caseCards || scen?.caseCards || [];
  const angleHints = challengeData?.angleHints || scen?.angleHints || [];

  // Generate Strictly 3-Slide Deck (/api/deck/generate)
  const handleGenerateDeck = async () => {
    if (!promptText || promptText.trim().length < 3 || generatingDeck) return;
    setGeneratingDeck(true);
    setGenError(null);
    pingActivity(
      `📊 Building 3-Slide Pre-Pitch Deck (${scen?.clientShort || "HNW Case"})...`,
      "C2: Generating 3-Slide Deck"
    );

    try {
      const nextVersion = history.length + 1;
      const res = await fetch("/api/deck/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          session_id: sessionIdRef.current,
          prompt: promptText,
          lang: normLang,
          market: "MY",
          version: nextVersion,
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.deck) {
        throw new Error(data.detail || "Could not generate deck. Please try again.");
      }

      const clampedSlides = (data.deck.slides || []).slice(0, 3);
      const newDeck = { ...data.deck, slides: clampedSlides };
      setDeck(newDeck);
      latestDeckRef.current = newDeck;
      setDeckSignature(data.signature || "");
      setSlideIdx(0);
      setShowBrief(false);
      setActiveStep("2");
      try {
        window.scrollTo({ top: 0, behavior: "smooth" });
      } catch (e) {}

      setHistory((prev) => [
        ...prev,
        {
          version: nextVersion,
          prompt: promptText,
          slide_count: clampedSlides.length,
          at: Date.now() / 1000,
        },
      ]);
      setLineage((prev) => [
        ...prev,
        {
          t: Math.round((Date.now() - startRef.current) / 1000),
          e: "gen",
          v: nextVersion,
          n: clampedSlides.length,
          len: promptText.length,
        },
      ]);
    } catch (err) {
      setGenError(err.message || "Could not generate 3-slide deck.");
    } finally {
      setGeneratingDeck(false);
    }
  };

  // Export .pptx (Exclusively offered on Post-Submit Locked screen)
  const handleDownloadPptx = async (targetDeckObj) => {
    const deckToExport = targetDeckObj || latestDeckRef.current || deck;
    if (!deckToExport) return;
    try {
      const res = await fetch("/api/deck/pptx", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(deckToExport),
      });
      if (!res.ok) return;
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `PRUMDA-3Slide-Deck-${(scen?.clientShort || "HNW").replace(/\s+/g, "-")}.pptx`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    } catch (e) {}
  };

  // Dynamic Scenario-Aware Pre-Submit Readiness Checks (used for fallback scoring)
  const computePreSubmitChecks = (d) => {
    if (!d || !Array.isArray(d.slides)) {
      return {
        slides3: false,
        clientFacts: false,
        visuals: false,
        personalTouch: false,
        compliance: false,
      };
    }
    const slides = d.slides.slice(0, 3);
    const rawJson = JSON.stringify(d).toLowerCase();
    const slides3 = slides.length === 3;
    const keyNums = scen?.keyNumbers || ["28", "4.5", "6.5"];
    const matchedKeyNums = keyNums.filter((n) => rawJson.includes(String(n).toLowerCase()));
    const clientFacts =
      matchedKeyNums.length >= 2 ||
      (scen?.clientShort && rawJson.includes(scen.clientShort.split(" ")[0].toLowerCase()));
    const hasKpi = slides.some((s) => Array.isArray(s.kpis) && s.kpis.length >= 2);
    const hasChart = slides.some(
      (s) => s.chart && Array.isArray(s.chart.series) && s.chart.series.length >= 2
    );
    const hasTable = slides.some(
      (s) => s.table && Array.isArray(s.table.rows) && s.table.rows.length >= 2
    );
    const visuals = [hasKpi, hasChart, hasTable].filter(Boolean).length >= 2;
    const personalTouch = Boolean(
      (personalAngle && personalAngle.trim().length >= 10) ||
        /\[personal strategic angle\]/i.test(promptText)
    );
    const compliance =
      /bnm|pds|free-look|free look|15|fact-find|fact find|analisis keperluan|schedule 10|sched 10|shariah|syariah|takaful|hibah|犹豫期|猶豫期|冷静期|冷靜期|需求分析|法定信托|法定信託|ஷரியா/i.test(
        rawJson
      );
    return { slides3, clientFacts, visuals, personalTouch, compliance };
  };

  // ONE-TIME FINAL SUBMIT
  const handleFinalSubmitOnce = async () => {
    if (!deck || submittingFinal || lockedSubmission) return;
    setSubmittingFinal(true);

    // Briefly await in-flight slide visual generation (capped at 1500ms so submit stays snappy!)
    if (imagePromiseRef.current) {
      setWaitingImagesForSubmit(true);
      await Promise.race([
        imagePromiseRef.current,
        new Promise((resolve) => setTimeout(resolve, 1500)),
      ]);
      setWaitingImagesForSubmit(false);
    }

    const finalDeckToSubmit = {
      ...(latestDeckRef.current || deck),
      slides: ((latestDeckRef.current || deck).slides || []).slice(0, 3),
    };

    pingActivity(
      "⚖️ Submitting Final 3-Slide Executive Deck to Judge...",
      "C2: Finalizing & Scoring 3-Slide Deck"
    );

    const elapsedSec = Math.max(8, Math.round((Date.now() - startRef.current) / 1000));
    let evalResult = null;

    try {
      const evalRes = await fetch("/api/deck/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: agentName || "PRUMDA Leader",
          participant_id: agentId || null,
          seat_index: challengeData?.seatIndex ?? 0,
          personal_angle: personalAngle || "",
          market: "MY",
          lang: normLang,
          prompt: promptText,
          deck: finalDeckToSubmit,
          signature: deckSignature,
          history,
          lineage,
        }),
      });
      if (evalRes.ok) {
        evalResult = await evalRes.json();
      }
    } catch (e) {}

    const checksPassed = Object.values(computePreSubmitChecks(finalDeckToSubmit)).filter(Boolean).length;
    const fallbackTotal10 = Math.min(
      9.7,
      Math.max(5.8, Number((5.5 + activePillarCount * 0.45 + checksPassed * 0.35).toFixed(1)))
    );
    const total10 =
      evalResult && typeof evalResult.total === "number" ? evalResult.total : fallbackTotal10;
    const accuracyScore = Math.min(100, Math.max(55, Math.round(total10 * 10)));
    const speedScore = Math.max(84, Math.min(99, 100 - Math.floor(elapsedSec / 12)));
    const arenaTotal = Math.round((speedScore + accuracyScore) / 2);

    const locDims = ui.rubricDims || C2_UI_I18N.en.rubricDims;
    const rawRubric =
      evalResult?.judge?.rubric ||
      locDims.map((d) => ({ dimension: d, score: Math.round(total10) }));
    const rubricArr = rawRubric.map((r, i) => ({
      ...r,
      dimension: locDims[i] || r.dimension,
    }));

    const criteriaMap = {};
    rubricArr.forEach((r) => {
      criteriaMap[r.dimension] = `${r.score}/10`;
    });

    const fallbackVerdictByLang = {
      en: `Boardroom-ready 3-slide pre-pitch brief (${total10}/10) for ${scen?.clientShort || "HNW Client"} with ${activePillarCount}/5 R.C.T.F.C. pillars applied.`,
      "zh-CN": `极具水准的 3 页高管战前提案简报（${total10}/10），精准匹配 ${scen?.clientShort || "高净值客户"} 需求与 ${activePillarCount}/5 个 R.C.T.F.C. 核心维度！`,
      yue: `極具水準嘅 3 頁高管戰前提案簡報（${total10}/10），精準貼合 ${scen?.clientShort || "高淨值客戶"} 需求同 ${activePillarCount}/5 個 R.C.T.F.C. 核心維度！`,
      ms: `Dek pra-pembentangan eksekutif 3-slaid yang mantap (${total10}/10) untuk ${scen?.clientShort || "Pelanggan HNW"} dengan ${activePillarCount}/5 tiang R.C.T.F.C.`,
      ta: `சிறந்த 3-ஸ்லைடு நிர்வாக முன்-முன்மொழிவு (${total10}/10) — ${activePillarCount}/5 R.C.T.F.C. தூண்கள் பயன்படுத்தப்பட்டுள்ளன!`,
    };

    const verdictText =
      evalResult?.judge?.verdict ||
      fallbackVerdictByLang[normLang] ||
      fallbackVerdictByLang.en;

    const slideSummary = (finalDeckToSubmit.slides || [])
      .map((s, i) => `Slide ${i + 1}: ${s.title}`)
      .join(" • ");

    const submissionPayload = {
      challenge: "2",
      seatIndex: challengeData?.seatIndex ?? 0,
      scenarioId: scen?.id || "glc_cfo_golden_bridge",
      clientName: scen?.clientName || "",
      personalAngle: personalAngle || "",
      title: `${finalDeckToSubmit.title || `Pre-Pitch: ${scen?.clientShort || "HNW Client"}`} (${total10}/10)`,
      styleBadge: `📊 ${total10}/10 Deck • ${scen?.icon || "🏛️"} ${scen?.clientShort || "3 Slides"}`,
      userInput: promptText,
      aiOutput: slideSummary,
      deck: finalDeckToSubmit,
      deckScore10: total10,
      rubricList: rubricArr,
      coverageList: evalResult?.judge?.coverage || [],
      pillarScores: criteriaMap,
      judgeFeedback: verdictText,
      iterations: history.length || 1,
      total: arenaTotal,
      timeSec: elapsedSec,
    };

    try {
      await fetch("/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: agentId,
          name: agentName,
          region: agentRegion,
          language: lang,
          challenge: "2",
          speed: speedScore,
          accuracy: accuracyScore,
          timeSec: elapsedSec,
          criteria: criteriaMap,
          judgeFeedback: verdictText,
          submission: submissionPayload,
        }),
      });
      localStorage.removeItem(storageKey);
    } catch (e) {}

    const finalScoreObj = {
      total: arenaTotal,
      speed: speedScore,
      accuracy: accuracyScore,
      timeSec: elapsedSec,
      deckScore10: total10,
      criteria: criteriaMap,
      judgeFeedback: verdictText,
    };

    setDeck(finalDeckToSubmit);
    setLockedSubmission(submissionPayload);
    setLockedScore(finalScoreObj);
    setSubmittingFinal(false);

    if (onSandboxPreview) onSandboxPreview(submissionPayload);
    if (fetchArenaState) fetchArenaState();
  };

  /* ============================================================================
     RENDER 1: LOCKED "JOB DONE!" VIEW (AFTER FINAL SUBMISSION)
  ============================================================================ */
  if (lockedSubmission) {
    const finalDeck = lockedSubmission.deck || deck || challengeData?.target;
    const finalSlides = (finalDeck?.slides || []).slice(0, 3);
    const safeIdx = Math.min(slideIdx, Math.max(0, finalSlides.length - 1));
    const curSlide = finalSlides[safeIdx];
    const arenaPts = lockedScore?.total || lockedSubmission.total || 95;
    const deckRating10 =
      lockedSubmission.deckScore10 ||
      lockedScore?.deckScore10 ||
      Number((arenaPts / 10).toFixed(1));
    const criteriaEntries = Object.entries(
      lockedScore?.criteria || lockedSubmission.pillarScores || {}
    );

    return (
      <div className="bg-white border-2 border-emerald-500 rounded-3xl p-4 sm:p-6 space-y-4 shadow-lg">
        <div className="flex flex-wrap items-center justify-between gap-3 bg-emerald-50 border border-emerald-200 rounded-2xl p-3.5 sm:p-4">
          <div className="space-y-1">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-600 text-white text-[11px] font-extrabold tracking-wide">
              {ui.jobDoneBadge}
            </span>
            <h3 className="text-base sm:text-lg font-extrabold text-slate-900">
              {ui.jobDoneTitle}
            </h3>
            {lockedSubmission.judgeFeedback && (
              <p className="text-xs text-slate-700 font-medium leading-relaxed">
                💬 {lockedSubmission.judgeFeedback}
              </p>
            )}
          </div>

          <div className="flex items-center gap-3 bg-white border-2 border-emerald-400 rounded-2xl px-4 py-2 shadow-sm shrink-0">
            <div className="text-center pr-3 border-r border-slate-200">
              <div className="text-[10px] font-extrabold uppercase text-slate-500">
                {ui.deckScoreLabel}
              </div>
              <div className="text-xl sm:text-2xl font-extrabold text-slate-900">
                {deckRating10}
                <span className="text-xs font-normal text-slate-500">/10</span>
              </div>
            </div>
            <div className="text-center">
              <div className="text-[10px] font-extrabold uppercase text-[#ed1b2e]">
                {ui.arenaScoreLabel}
              </div>
              <div className="text-2xl sm:text-3xl font-extrabold text-[#ed1b2e]">
                {arenaPts} <span className="text-xs font-normal text-slate-500">pts</span>
              </div>
            </div>
          </div>
        </div>

        {lockedSubmission.personalAngle && (
          <div className="bg-amber-50 border border-amber-300 rounded-2xl px-3.5 py-2.5 text-xs font-bold text-amber-950">
            <span className="uppercase tracking-wider text-[10px] font-extrabold text-amber-800 mr-1.5">
              💡 Personal Strategic Angle:
            </span>
            {lockedSubmission.personalAngle}
          </div>
        )}

        {/* Untruncated 6-Dimension Rubric Breakdown */}
        {criteriaEntries.length > 0 && (
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-3.5 space-y-2">
            <div className="text-xs font-extrabold uppercase tracking-wider text-slate-700">
              {ui.rubricHeader}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
              {criteriaEntries.map(([dim, val]) => (
                <div
                  key={dim}
                  className="bg-white border border-slate-200 rounded-xl px-3 py-2 flex items-center justify-between gap-2"
                >
                  <span className="text-[11px] font-bold text-slate-700 leading-snug">{dim}</span>
                  <span className="text-xs font-extrabold text-[#ed1b2e] shrink-0">{val}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {finalSlides.length > 0 && (
          <div className="space-y-2.5">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-1.5">
                {finalSlides.map((_, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setSlideIdx(idx)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-extrabold transition-all ${
                      safeIdx === idx
                        ? "bg-slate-900 text-white shadow-sm"
                        : "bg-slate-100 hover:bg-slate-200 text-slate-700"
                    }`}
                  >
                    {(ui.slideTabs || [])[idx] || `Slide ${idx + 1}`}
                  </button>
                ))}
              </div>
              <button
                type="button"
                onClick={() => handleDownloadPptx(finalDeck)}
                className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-extrabold"
              >
                {ui.downloadPptxBtn}
              </button>
            </div>
            <ExecutiveSlideCard
              slide={curSlide}
              slideIndex={safeIdx}
              totalSlides={3}
              badgeLabel={ui.yourSlideLabel}
              speakerNotesLabel={ui.speakerNotesToggle}
            />
          </div>
        )}

        <div className="flex flex-wrap items-center justify-between gap-2.5 pt-2 border-t border-slate-200">
          {onViewScorecard && (
            <button
              type="button"
              onClick={onViewScorecard}
              className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs sm:text-sm font-extrabold transition-all"
            >
              {ui.viewMainScoreBtn}
            </button>
          )}
          {canProceedNext ? (
            <button
              type="button"
              onClick={onNext}
              className="px-5 py-2.5 rounded-xl bg-[#ed1b2e] hover:bg-[#c81526] text-white text-xs sm:text-sm font-extrabold shadow-md transition-all ml-auto"
            >
              {ui.proceedC3Btn}
            </button>
          ) : (
            <div className="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3.5 py-2 rounded-xl ml-auto">
              {ui.waitingC3Text}
            </div>
          )}
        </div>
      </div>
    );
  }

  /* ============================================================================
     RENDER 2: ACTIVE CHALLENGE 2 EXECUTIVE 3-SLIDE STUDIO (STREAMLINED MOBILE UX)
  ============================================================================ */
  const targetDeck = challengeData?.target || null;
  const targetSlides = (targetDeck?.slides || []).slice(0, 3);
  const currentSlides = (deck?.slides || []).slice(0, 3);
  const safeSlideIdx = Math.min(slideIdx, Math.max(0, currentSlides.length - 1));
  const safeTargetIdx = Math.min(targetSlideIdx, Math.max(0, targetSlides.length - 1));
  const clientShort = scen?.clientShort || "HNW Client";
  const gapValue = scen?.gapAmount ? `Gap ${scen.gapAmount}` : "";

  return (
    <div className="bg-white border border-slate-200 rounded-3xl p-3.5 sm:p-5 space-y-3 shadow-sm">
      {/* 1. Slim Top Studio Bar + Compact 🎯 Sample Button */}
      <div className="flex items-center justify-between gap-2 pb-2 border-b border-slate-200">
        <h2 className="text-sm sm:text-base font-extrabold text-slate-900 truncate">
          {ui.studioHeader}
        </h2>
        <button
          type="button"
          onClick={() => setShowBenchmark(true)}
          className="px-3 py-1.5 rounded-xl text-xs font-extrabold bg-red-50 hover:bg-red-100 text-[#ed1b2e] border border-red-200 transition-all shrink-0"
        >
          {ui.sampleBtn}
        </button>
      </div>

      {/* Dismissible Sample / Benchmark 3-Slide Modal Overlay */}
      {showBenchmark && targetSlides.length > 0 && (
        <div
          className="fixed inset-0 z-50 bg-slate-950/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5 overflow-y-auto"
          onClick={() => setShowBenchmark(false)}
        >
          <div
            className="bg-slate-900 text-white border border-slate-700 rounded-2xl w-full max-w-2xl p-3.5 sm:p-4 space-y-3 shadow-2xl max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between gap-2">
              <div className="text-xs font-extrabold uppercase tracking-wider text-amber-300 truncate">
                {ui.targetGoalBanner}
              </div>
              <button
                type="button"
                onClick={() => setShowBenchmark(false)}
                className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-extrabold text-white shrink-0"
              >
                {ui.closeSampleBtn}
              </button>
            </div>

            <div className="grid grid-cols-3 gap-1.5 bg-slate-800 p-1 rounded-xl">
              {targetSlides.map((_, ti) => (
                <button
                  key={ti}
                  type="button"
                  onClick={() => setTargetSlideIdx(ti)}
                  className={`py-1.5 px-2 rounded-lg text-xs font-extrabold transition-all ${
                    safeTargetIdx === ti
                      ? "bg-[#ed1b2e] text-white shadow-sm"
                      : "text-slate-300 hover:text-white"
                  }`}
                >
                  {(ui.slideTabs || [])[ti] || `Slide ${ti + 1}`}
                </button>
              ))}
            </div>

            <ExecutiveSlideCard
              slide={targetSlides[safeTargetIdx]}
              slideIndex={safeTargetIdx}
              totalSlides={3}
              badgeLabel={ui.targetSlideLabel}
              speakerNotesLabel={ui.speakerNotesToggle}
              compact={true}
            />
          </div>
        </div>
      )}

      {/* 2. Unified Auto-Collapsing Client Brief Card + 6-Case Switcher (72-Seat Preserving) */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800 text-white rounded-2xl p-3 space-y-2.5 shadow-md">
        {!showBrief ? (
          /* Sleek 1-Line Collapsed Client Bar */
          <div className="flex items-center justify-between gap-2">
            <div className="min-w-0 flex items-center gap-1.5 text-xs font-extrabold truncate">
              <span>{scen?.icon || "🏛️"}</span>
              <span className="truncate">{clientShort}</span>
              {gapValue && (
                <span className="text-amber-300 font-mono text-[11px] shrink-0">• {gapValue}</span>
              )}
            </div>
            <div className="flex items-center gap-1.5 shrink-0">
              <button
                type="button"
                onClick={() => setShowBrief(true)}
                className="px-2 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-600 text-[11px] font-bold text-slate-200"
              >
                {ui.caseInfoBtn}
              </button>
              <button
                type="button"
                onClick={() => setShowCasePicker((v) => !v)}
                className="px-2 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 border border-amber-400/50 text-[11px] font-extrabold text-amber-300"
              >
                {ui.switchShortFmt} ({currentCaseSlot + 1}/6) ▾
              </button>
            </div>
          </div>
        ) : (
          /* Expanded Client Card Header */
          <div className="flex items-center justify-between gap-2">
            <div className="min-w-0 flex items-center gap-1.5">
              <span className="text-base leading-none shrink-0">{scen?.icon || "🏛️"}</span>
              <span className="text-xs font-extrabold text-amber-300 truncate">
                {scen?.shortLabel || clientShort}
              </span>
            </div>
            <div className="flex items-center gap-1.5 shrink-0">
              {activeStep === "2" && (
                <button
                  type="button"
                  onClick={() => setShowBrief(false)}
                  className="px-2 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-[11px] font-bold text-slate-300"
                >
                  {ui.hideCaseBtn}
                </button>
              )}
              <button
                type="button"
                onClick={() => setShowCasePicker((v) => !v)}
                className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 border border-amber-400/50 text-[11px] font-extrabold text-amber-300"
              >
                {ui.switchCaseFmt} ({currentCaseSlot + 1}/6) ▾
              </button>
            </div>
          </div>
        )}

        {/* Sleek 6-Item Curated Case Picker */}
        {showCasePicker && (
          <div className="bg-slate-800/95 border border-slate-700 rounded-xl p-2 grid grid-cols-1 sm:grid-cols-2 gap-1.5">
            {C2_CURATED_CASES_META.map((cm) => {
              const isCur = cm.slot === currentCaseSlot;
              const lbl = cm.labels[normLang] || cm.labels.en;
              return (
                <button
                  key={cm.id}
                  type="button"
                  onClick={() => handlePickCaseSlot(cm.slot)}
                  className={`text-left px-2.5 py-2 rounded-lg border text-xs font-extrabold transition-all flex items-center justify-between gap-2 ${
                    isCur
                      ? "bg-[#ed1b2e]/25 border-[#ed1b2e] text-white"
                      : "bg-slate-900/80 hover:bg-slate-900 border-slate-700 text-slate-200"
                  }`}
                >
                  <span className="truncate">
                    {cm.icon} {lbl}
                  </span>
                  <span className="text-[10px] font-mono text-amber-300 shrink-0">
                    {cm.slot + 1}/6
                  </span>
                </button>
              );
            })}
          </div>
        )}

        {/* Compact 2×2 Mobile Balance-Sheet Grid (~130px height on mobile) */}
        {showBrief && (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
            {caseCards.map((c, ci) => (
              <div
                key={ci}
                className="bg-slate-800/90 border border-slate-700 rounded-xl p-2 min-w-0"
              >
                <div className="text-[10px] font-extrabold text-amber-300 truncate">
                  {c.icon} {c.label}
                </div>
                <div className="text-[11px] text-slate-200 leading-snug mt-0.5 line-clamp-2">
                  {c.value}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Two-Step Workflow Bar (Short 1-Line Mobile Labels) */}
      <div className="grid grid-cols-2 gap-1.5 bg-slate-100 p-1 rounded-2xl">
        <button
          type="button"
          onClick={() => setActiveStep("1")}
          className={`py-2 px-2.5 rounded-xl text-xs font-extrabold whitespace-nowrap transition-all ${
            activeStep === "1"
              ? "bg-white text-slate-900 shadow-sm border border-slate-200"
              : "text-slate-600 hover:text-slate-900"
          }`}
        >
          {ui.step1Tab}
        </button>
        <button
          type="button"
          onClick={() => deck && setActiveStep("2")}
          disabled={!deck}
          className={`py-2 px-2.5 rounded-xl text-xs font-extrabold whitespace-nowrap transition-all flex items-center justify-center gap-1 ${
            activeStep === "2"
              ? "bg-[#ed1b2e] text-white shadow-sm"
              : deck
              ? "text-slate-800 hover:bg-white/60"
              : "text-slate-400 cursor-not-allowed"
          }`}
        >
          <span>{ui.step2Tab}</span>
          {deck && (
            <span className="px-1.5 py-0.5 rounded-full bg-emerald-500 text-white text-[9px]">
              3/3
            </span>
          )}
        </button>
      </div>

      {/* ========================================================================
         STEP 1: COMPACT R.C.T.F.C. PILLARS + 3-PILL TONE + PERSONAL ANGLE
      ======================================================================== */}
      {activeStep === "1" && (
        <div className="space-y-3">
          {/* 1. Compact 2-Col / 5-Col R.C.T.F.C. Pill Toggles */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between gap-2">
              <div className="text-xs font-extrabold text-slate-900">{ui.pillarsHeader}</div>
              {activePillarCount < 5 && (
                <button
                  type="button"
                  onClick={handleActivateAllPillars}
                  className="px-2.5 py-1 rounded-lg bg-[#ed1b2e] text-white text-[11px] font-extrabold"
                >
                  {ui.activateAllShort}
                </button>
              )}
            </div>

            {loadingChallenge ? (
              <div className="text-xs text-slate-500 py-3 text-center">Loading scenario...</div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-1.5">
                {guideSteps.map((g, gi) => {
                  const isDone = pillarStatuses[g.key] === "done";
                  const shortTitle =
                    (ui.pillarTitles && ui.pillarTitles[g.key]) || g.label;
                  const spanLast = gi === 4 ? "col-span-2 sm:col-span-1" : "";
                  return (
                    <button
                      key={g.key}
                      type="button"
                      onClick={() => handleTogglePillar(g.key)}
                      className={`${spanLast} px-2.5 py-2 rounded-xl border text-left transition-all ${
                        isDone
                          ? "bg-emerald-50/80 border-emerald-500 shadow-2xs"
                          : "bg-slate-50 hover:bg-slate-100 border-slate-200 opacity-75"
                      }`}
                    >
                      <div className="flex items-center justify-between gap-1">
                        <span className="text-[11px] font-extrabold text-slate-900 truncate">
                          {isDone ? "✓ " : "+ "}
                          {shortTitle}
                        </span>
                      </div>
                      <div className="text-[10px] text-slate-600 truncate mt-0.5">
                        {g.summary || g.tip}
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* 2. 1-Row 3-Pill Boardroom Tone Selector */}
          <div className="space-y-1.5">
            <div className="text-xs font-extrabold text-slate-900">{ui.toneHeader}</div>
            <div className="grid grid-cols-3 gap-1.5">
              {(ui.tones || []).map((tn) => {
                const active = selectedToneId === tn.id;
                return (
                  <button
                    key={tn.id}
                    type="button"
                    onClick={() => handleSelectTone(tn.id)}
                    className={`px-2 py-2 rounded-xl border text-[11px] sm:text-xs font-extrabold text-center truncate transition-all ${
                      active
                        ? "bg-slate-900 text-white border-slate-900 shadow-xs"
                        : "bg-white hover:bg-slate-50 text-slate-700 border-slate-200"
                    }`}
                  >
                    {tn.shortLabel}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 3. Personal Strategic Angle Quick-Insert Chips */}
          {angleHints.length > 0 && (
            <div className="space-y-1.5">
              <div className="text-xs font-extrabold text-slate-900">{ui.angleHeader}</div>
              <div className="flex flex-col gap-1.5">
                {angleHints.map((hint, hi) => {
                  const selected = promptText.includes(hint.trim());
                  return (
                    <button
                      key={hi}
                      type="button"
                      onClick={() => handlePickAngleChip(hint, hi)}
                      className={`w-full px-2.5 py-1.5 rounded-xl text-[11px] font-bold border text-left truncate transition-all ${
                        selected
                          ? "bg-amber-600 text-white border-amber-700 shadow-xs"
                          : "bg-amber-50/70 hover:bg-amber-100 text-slate-800 border-amber-300"
                      }`}
                    >
                      {selected ? "✓ " : "+ ✨ "}
                      {hint}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* 4. SINGLE LIVE EDITABLE PROMPT BOX (100% Transparent — Every Pill Updates This Directly!) */}
          <div className="bg-slate-50 border-2 border-slate-300 focus-within:border-[#ed1b2e] rounded-2xl p-2.5 space-y-1.5 transition-all">
            <div className="flex items-center justify-between gap-2">
              <span className="text-[11px] font-extrabold text-slate-800">
                ✍️ Your Live AI Prompt ({activePillarCount}/5 Pillars)
              </span>
              {lastUpdatedTag ? (
                <span className="px-2 py-0.5 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-900 text-[10px] font-extrabold">
                  {lastUpdatedTag}
                </span>
              ) : (
                <span className="text-[10px] font-semibold text-slate-500">
                  Tap pills above or edit directly
                </span>
              )}
            </div>
            <textarea
              rows={6}
              value={promptText}
              onChange={(e) => handleLivePromptEdit(e.target.value)}
              placeholder={ui.anglePlaceholder}
              className="w-full rounded-xl border border-slate-200 bg-white focus:outline-none p-2.5 text-xs text-slate-900 leading-relaxed font-sans"
            />
          </div>

          {genError && (
            <div className="bg-red-50 border border-red-200 text-[#ed1b2e] text-xs font-bold px-3 py-2 rounded-xl">
              ⚠️ {genError}
            </div>
          )}

          {/* Animated 3-Stage Deck Build Progress or Primary Generate CTA */}
          {generatingDeck ? (
            <div className="bg-slate-900 text-white rounded-2xl p-3.5 space-y-2 shadow-md">
              <div className="flex items-center justify-between text-xs font-extrabold text-amber-300">
                <span className="truncate mr-2">
                  {(ui.genStages || [])[genStageIdx] || ui.genStages[0]}
                </span>
                <span>{Math.min(95, (genStageIdx + 1) * 32)}%</span>
              </div>
              <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-[#ed1b2e] to-amber-400 transition-all duration-500"
                  style={{ width: `${(genStageIdx + 1) * 33}%` }}
                />
              </div>
            </div>
          ) : (
            <button
              type="button"
              onClick={handleGenerateDeck}
              disabled={!promptText || promptText.trim().length < 3}
              className="w-full py-3.5 px-4 rounded-2xl bg-[#ed1b2e] hover:bg-[#c81526] disabled:opacity-50 text-white font-extrabold text-sm sm:text-base shadow-md transition-all"
            >
              {deck ? ui.regenerateBtn : ui.generateBtn}
            </button>
          )}
        </div>
      )}

      {/* ========================================================================
         STEP 2: CLEAN 3-TAB SLIDE DECK PREVIEW & SNAPPY FINAL SUBMIT
      ======================================================================== */}
      {activeStep === "2" && deck && (
        <div className="space-y-3">
          {/* Crisp 3-Tab Segmented Slide Switcher + Subtle Visuals Rendering Badge */}
          <div className="space-y-1.5">
            <div className="grid grid-cols-3 gap-1.5 bg-slate-100 border border-slate-200 rounded-2xl p-1">
              {currentSlides.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setSlideIdx(idx)}
                  className={`py-2 px-2 rounded-xl text-xs font-extrabold truncate transition-all ${
                    safeSlideIdx === idx
                      ? "bg-slate-900 text-white shadow-sm"
                      : "text-slate-700 hover:bg-white"
                  }`}
                >
                  {(ui.slideTabs || [])[idx] || `Slide ${idx + 1}`}
                </button>
              ))}
            </div>
            {imagesLoading && (
              <div className="flex justify-end">
                <span className="text-[11px] font-bold text-amber-700 bg-amber-50 border border-amber-200 px-2.5 py-0.5 rounded-full animate-pulse">
                  {ui.generatingImgBadge}
                </span>
              </div>
            )}
          </div>

          {/* Slide Canvas */}
          <ExecutiveSlideCard
            slide={currentSlides[safeSlideIdx]}
            slideIndex={safeSlideIdx}
            totalSlides={3}
            badgeLabel={ui.yourSlideLabel}
            speakerNotesLabel={ui.speakerNotesToggle}
            generatingImages={imagesLoading}
          />

          {/* Compact 1-Line Pre-Submit Status Bar */}
          <div className="bg-emerald-50 border border-emerald-200 rounded-xl px-3 py-2 text-xs font-extrabold text-emerald-900 text-center">
            {ui.readyStatusBar}
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2">
            <button
              type="button"
              onClick={() => setActiveStep("1")}
              disabled={submittingFinal}
              className="px-4 py-2.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs sm:text-sm font-extrabold transition-all"
            >
              {ui.backToPromptBtn}
            </button>

            <button
              type="button"
              onClick={handleFinalSubmitOnce}
              disabled={submittingFinal}
              className="flex-1 py-3.5 px-5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 disabled:opacity-60 text-white font-extrabold text-sm sm:text-base shadow-md transition-all"
            >
              {waitingImagesForSubmit
                ? ui.finishingImgBeforeSubmit
                : submittingFinal
                ? ui.finalSubmittingText
                : ui.finalSubmitBtn}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
