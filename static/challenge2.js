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
    pillarsHeader: "3. 🚀 Improve Your Prompt! (R.C.T.F.C. Power-Ups)",
    improveHeader: "3. 🚀 Improve Your Prompt! (R.C.T.F.C. Power-Ups)",
    improveSub:
      "Tap any R.C.T.F.C. pillar below to inject structured context into your prompt (tap again to remove):",
    activateAllShort: "✨ All 5 On",
    clearAllShort: "✕ Clear 5",
    pillarTitles: {
      role: "R · Role",
      context: "C · Context",
      task: "T · Task",
      format: "F · Format",
      constraints: "C · Constraints",
    },
    toneHeader: "1. Boardroom Style",
    tones: [
      {
        id: "boardroom",
        shortLabel: "🏛️ Boardroom",
        clause:
          "Executive Family-Office boardroom style — crisp balance-sheet framing, zero sales fluff.",
      },
      {
        id: "empathy",
        shortLabel: "❤️ Empathy",
        clause:
          "Warm founder & family-harmony tone — protect spouse dignity and children's future.",
      },
      {
        id: "cfo",
        shortLabel: "📊 CFO",
        clause:
          "Analytical CFO tone — compare ~2% p.a. liquidity cost vs keeping 100% enterprise equity.",
      },
    ],
    angleHeader: "2. 💡 Personal Strategic Angle",
    customAngleBtn: "✍️ Write my own custom angle...",
    customAngleInputPlaceholder: "Type your custom strategic angle (populates your prompt live)...",
    anglePlaceholder:
      "Tap a style, angle, or R.C.T.F.C. power-up above — or edit your live prompt directly...",
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
    pillarsHeader: "3. 🚀 升级您的提示词！(R.C.T.F.C. 五维强化)",
    improveHeader: "3. 🚀 升级您的提示词！(R.C.T.F.C. 五维强化)",
    improveSub: "点击下方任意 R.C.T.F.C. 模块即可注入提示词（再次点击即可移除）：",
    activateAllShort: "✨ 全选5维",
    clearAllShort: "✕ 清空5维",
    pillarTitles: {
      role: "R · 角色",
      context: "C · 背景",
      task: "T · 任务",
      format: "F · 格式",
      constraints: "C · 合规",
    },
    toneHeader: "1. 董事会呈现风格",
    tones: [
      {
        id: "boardroom",
        shortLabel: "🏛️ 董事会",
        clause:
          "高管家族办公室董事会风格——聚焦资产负债表与传承结构，零推销感。",
      },
      {
        id: "empathy",
        shortLabel: "❤️ 共情家风",
        clause:
          "温暖创始人家风共情——守护配偶尊严、家族和睦与子女学业未来。",
      },
      {
        id: "cfo",
        shortLabel: "📊 CFO量化",
        clause:
          "严谨CFO量化视角——对比每年约2%流动性成本与保留100%企业股权。",
      },
    ],
    angleHeader: "2. 💡 个人策略切入点",
    customAngleBtn: "✍️ 自定义输入我的专属切入点...",
    customAngleInputPlaceholder: "输入您的专属顾问切入点（实时写入下方提示词）...",
    anglePlaceholder: "点击上方风格、切入点或 R.C.T.F.C. 模块，或直接编辑提示词...",
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
    pillarsHeader: "3. 🚀 升級你嘅提示詞！(R.C.T.F.C. 五維強化)",
    improveHeader: "3. 🚀 升級你嘅提示詞！(R.C.T.F.C. 五維強化)",
    improveSub: "撳下面任何一個 R.C.T.F.C. 積木即可寫入提示詞（再撳一次即可移除）：",
    activateAllShort: "✨ 全選5維",
    clearAllShort: "✕ 清空5維",
    pillarTitles: {
      role: "R · 角色",
      context: "C · 背景",
      task: "T · 任務",
      format: "F · 格式",
      constraints: "C · 合規",
    },
    toneHeader: "1. 董事會呈現風格",
    tones: [
      {
        id: "boardroom",
        shortLabel: "🏛️ 董事會",
        clause:
          "高管家族辦公室董事會風格——聚焦資產負債表同傳承架構，零Hard Sell。",
      },
      {
        id: "empathy",
        shortLabel: "❤️ 共情護家",
        clause:
          "窩心創辦人護家語調——守護另一半尊嚴、家族和睦同仔女升學未來。",
      },
      {
        id: "cfo",
        shortLabel: "📊 CFO量化",
        clause:
          "嚴謹CFO量化視角——對比每年約2%流動性成本與保留100%企業股權。",
      },
    ],
    angleHeader: "2. 💡 個人策略切入點",
    customAngleBtn: "✍️ 自己輸入專屬切入點...",
    customAngleInputPlaceholder: "輸入你嘅專屬切入點（即時寫入下面提示詞）...",
    anglePlaceholder: "撳上面風格、切入點或 R.C.T.F.C. 積木，或者直接修改提示詞...",
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
    pillarsHeader: "3. 🚀 Tingkatkan Prompt Anda! (R.C.T.F.C.)",
    improveHeader: "3. 🚀 Tingkatkan Prompt Anda! (R.C.T.F.C.)",
    improveSub:
      "Ketik mana-mana tiang R.C.T.F.C. di bawah untuk menambah ke dalam prompt (ketik lagi untuk buang):",
    activateAllShort: "✨ Aktif Semua 5",
    clearAllShort: "✕ Kosongkan",
    pillarTitles: {
      role: "R · Peranan",
      context: "C · Konteks",
      task: "T · Tugasan",
      format: "F · Format",
      constraints: "C · Kekangan",
    },
    toneHeader: "1. Gaya Bilik Lembaga",
    tones: [
      {
        id: "boardroom",
        shortLabel: "🏛️ Lembaga",
        clause:
          "Gaya bilik lembaga Pejabat Keluarga — fokus kunci kira-kira, sifar tekanan jualan.",
      },
      {
        id: "empathy",
        shortLabel: "❤️ Empati",
        clause:
          "Nada empati pengasas & harmoni keluarga — lindungi maruah pasangan dan masa depan anak.",
      },
      {
        id: "cfo",
        shortLabel: "📊 CFO",
        clause:
          "Nada CFO analitik — bandingkan kos kecairan ~2% setahun lwn kekalkan 100% ekuiti syarikat.",
      },
    ],
    angleHeader: "2. 💡 Sudut Strategik Peribadi",
    customAngleBtn: "✍️ Tulis sudut strategik saya sendiri...",
    customAngleInputPlaceholder: "Taip sudut strategik anda (dikemas kini terus dalam prompt)...",
    anglePlaceholder: "Ketik gaya, sudut strategik atau R.C.T.F.C. di atas, atau sunting terus...",
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
    pillarsHeader: "3. 🚀 உங்கள் ப்ராம்ப்ட்டை மேம்படுத்துங்கள்! (R.C.T.F.C.)",
    improveHeader: "3. 🚀 உங்கள் ப்ராம்ப்ட்டை மேம்படுத்துங்கள்! (R.C.T.F.C.)",
    improveSub:
      "ப்ராம்ப்ட்டில் சேர்க்க கீழே உள்ள R.C.T.F.C. தூண்களைத் தட்டவும் (நீக்க மீண்டும் தட்டவும்):",
    activateAllShort: "✨ 5-ம் இயக்கு",
    clearAllShort: "✕ நீக்கு",
    pillarTitles: {
      role: "R · பங்கு",
      context: "C · பின்னணி",
      task: "T · பணி",
      format: "F · வடிவம்",
      constraints: "C · விதிகள்",
    },
    toneHeader: "1. போர்டுரூம் பாணி",
    tones: [
      {
        id: "boardroom",
        shortLabel: "🏛️ போர்டுரூம்",
        clause:
          "Executive Family-Office boardroom style — crisp balance-sheet framing, zero sales fluff.",
      },
      {
        id: "empathy",
        shortLabel: "❤️ அக்கறை",
        clause:
          "Warm founder & family-harmony tone — protect spouse dignity and children's future.",
      },
      {
        id: "cfo",
        shortLabel: "📊 CFO",
        clause:
          "Analytical CFO tone — compare ~2% p.a. liquidity cost vs keeping 100% enterprise equity.",
      },
    ],
    angleHeader: "2. 💡 தனிப்பட்ட உத்தி கோணம்",
    customAngleBtn: "✍️ எனது சொந்த உத்தி கோணத்தை எழுதவும்...",
    customAngleInputPlaceholder: "உங்கள் சொந்த கோணத்தை உள்ளிடவும்...",
    anglePlaceholder: "மேலுள்ள பாணி, கோணம் அல்லது R.C.T.F.C.-ஐத் தட்டவும்...",
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

function detectPillarStatusClient(promptText, guideSteps) {
  const txt = String(promptText || "");
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
    if (tag && new RegExp("^\\s*\\[" + tag + "\\]:\\s*\\S", "im").test(txt)) {
      out[k] = "done";
      return;
    }
    const tmpl = String(g.template || "").trim();
    if (tmpl.length >= 24 && txt.includes(tmpl.slice(0, 26))) {
      out[k] = "done";
      return;
    }
    out[k] = "missing";
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
                    <div key={pi} className="flex-1 flex flex-col items-center justify-end h-full min-w-0">
                      <div className={`text-[11px] sm:text-xs whitespace-nowrap font-extrabold mb-1 ${st.val}`}>
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
  const storageKey = `prumda_c2_v7_${agentId || "anon"}`;

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
  const [confirmArmedSlot, setConfirmArmedSlot] = useState(null);
  const [showBenchmark, setShowBenchmark] = useState(false);
  const [targetSlideIdx, setTargetSlideIdx] = useState(0);

  // Step & Brief Collapse State
  const [activeStep, setActiveStep] = useState(initDraft.deck ? "2" : "1");
  const [showBrief, setShowBrief] = useState(initDraft.deck ? false : true);
  const [selectedToneId, setSelectedToneId] = useState(
    sameDraftLang && initDraft.selectedToneId ? initDraft.selectedToneId : null
  );
  const [selectedAngleChipIdx, setSelectedAngleChipIdx] = useState(
    sameDraftLang &&
      (typeof initDraft.selectedAngleChipIdx === "number" ||
        initDraft.selectedAngleChipIdx === "custom")
      ? initDraft.selectedAngleChipIdx
      : null
  );
  const [showCustomAngleInput, setShowCustomAngleInput] = useState(
    sameDraftLang
      ? Boolean(initDraft.showCustomAngleInput || initDraft.selectedAngleChipIdx === "custom")
      : false
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
  const [showRctfcDrawer, setShowRctfcDrawer] = useState(false);
  const [activePillarsMap, setActivePillarsMap] = useState(
    sameDraftLang && initDraft.activePillarsMap
      ? initDraft.activePillarsMap
      : {
          role: false,
          context: false,
          task: false,
          format: false,
          constraints: false,
        }
  );
  const [lastUpdatedTag, setLastUpdatedTag] = useState("");
  const initialPromptLoadedRef = useRef(
    Boolean(sameDraftLang && typeof initDraft.promptText === "string" && initDraft.promptText.length > 0)
  );

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
          showCustomAngleInput,
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
    showCustomAngleInput,
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
  // (Splits cleanly on any new [Tag]: line, even if user deleted blank lines or edited text inside a block!)
  const parsePromptBlocks = (rawPrompt) => {
    const blocks = {};
    const customParas = [];
    const tagNamesPattern = "Role|Context|Task|Format|Constraints|Tone|Personal Strategic Angle";
    const chunkSplitRx = new RegExp(`(?=^\\s*\\[(?:${tagNamesPattern})\\]:)`, "im");
    const tagMatchRx = new RegExp(`^\\s*\\[(${tagNamesPattern})\\]:\\s*([\\s\\S]*)$`, "i");

    // Split whenever a line begins with [Tag]:
    const lines = String(rawPrompt || "").split("\n");
    const chunks = [];
    let cur = [];
    lines.forEach((ln) => {
      if (new RegExp(`^\\s*\\[(?:${tagNamesPattern})\\]:`, "i").test(ln) && cur.length > 0) {
        chunks.push(cur.join("\n"));
        cur = [ln];
      } else {
        cur.push(ln);
      }
    });
    if (cur.length > 0) chunks.push(cur.join("\n"));

    chunks
      .map((c) => c.trim())
      .filter(Boolean)
      .forEach((chunk) => {
        const m = chunk.match(tagMatchRx);
        if (m) {
          const canon = CANONICAL_TAGS.find((t) => t.toLowerCase() === m[1].toLowerCase()) || m[1];
          // If custom untagged paragraphs follow after double-newline inside the last chunk, preserve them only if truly untagged
          blocks[canon] = m[2].trim();
        } else {
          customParas.push(chunk);
        }
      });
    void chunkSplitRx;
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
    const simpleStr = (challengeData?.simple_prompt || "").trim();
    let filteredCustomParas = customParas;
    if (shouldInclude && tag === "Task" && simpleStr) {
      filteredCustomParas = customParas.filter((cp) => cp.trim() !== simpleStr);
    }
    if (shouldInclude && bodyText && String(bodyText).trim()) {
      blocks[tag] = String(bodyText).trim();
    } else {
      delete blocks[tag];
    }
    return serializePromptBlocks(blocks, filteredCustomParas);
  };

  // Shorten verbose R.C.T.F.C. guide templates into crisp ~1-sentence lines while preserving all key scenario numbers & visual/BNM keywords
  const getConcisePillarTemplate = (g, sc = challengeData?.scenario, targetLang = normLang) => {
    if (!g) return "";
    const k = g.key;
    const raw = String(g.template || "").trim();
    const client = sc?.clientShort || sc?.clientName || "HNW Client";
    const biz = sc?.businessName ? ` (${sc.businessName})` : "";
    const nw = sc?.netWorth || "RM 28M";
    const gap = sc?.gapAmount || "RM 6.5M";
    const need = sc?.needAmount || "RM 10.5M";
    const have = sc?.haveAmount || "RM 4.0M";
    const loc = sc?.locationName || "KL";
    const isShariah = Boolean(sc?.shariah);
    const keyNums = Array.isArray(sc?.keyNumbers) ? sc.keyNumbers.map(String) : [];

    if (k === "role") {
      if (targetLang === "zh-CN") {
        return `担任 PRUMDA 资深家族办公室与企业传承顾问，为 ${client} 撰写高管战前简报。`;
      }
      if (targetLang === "yue") {
        return `擔任 PRUMDA 資深家族辦公室與企業傳承顧問，為 ${client} 撰寫高管戰前簡報。`;
      }
      if (targetLang === "ms") {
        return `Bertindak sebagai Perunding Kanan Kekayaan & Legasi PRUMDA bagi dek pra-pitch ${client}.`;
      }
      if (targetLang === "ta") {
        return `PRUMDA மூத்த செல்வ & பாரம்பரிய ஆலோசகராக ${client}-க்கான முன்-முன்மொழிவை உருவாக்கவும்.`;
      }
      return `Senior PRUMDA Family-Office Strategist preparing an executive pre-pitch brief for ${client}.`;
    }

    if (k === "context") {
      const baseNumsText = `${nw} ${need} ${have} ${gap}`;
      const extraNums = keyNums.filter((n) => !baseNumsText.includes(n));
      const extraSuffix = extraNums.length > 0 ? ` (RM ${extraNums.join("M / RM ")}M)` : "";
      if (targetLang === "zh-CN") {
        return `${client}${biz}：净值 ${nw}，需 ${need} vs 现有 ${have}，面临 ${gap} 缺口${extraSuffix}。`;
      }
      if (targetLang === "yue") {
        return `${client}${biz}：淨值 ${nw}，需 ${need} vs 現有 ${have}，面臨 ${gap} 缺口${extraSuffix}。`;
      }
      if (targetLang === "ms") {
        return `${client}${biz}: Nilai bersih ${nw}, perlu ${need} lwn sedia ada ${have}, jurang kecairan ${gap}${extraSuffix}.`;
      }
      if (targetLang === "ta") {
        return `${client}${biz}: சொத்து ${nw}, தேவை ${need} vs இருப்பு ${have}, பணப்புழக்க இடைவெளி ${gap}${extraSuffix}.`;
      }
      return `${client}${biz}: Net worth ${nw}, need ${need} vs liquid ${have}, leaving a ${gap} liquidity gap${extraSuffix}.`;
    }

    if (k === "task") {
      if (targetLang === "zh-CN") {
        return `为 ${client}（${loc}首次会面）制作严格 3 页高管战前简报，弥合 ${gap} 缺口。`;
      }
      if (targetLang === "yue") {
        return `為 ${client}（${loc}首次會面）製作嚴格 3 頁高管戰前簡報，彌合 ${gap} 缺口。`;
      }
      if (targetLang === "ms") {
        return `Bina dek pra-pitch tepat 3 slaid bagi mesyuarat pertama ${client} di ${loc} untuk menutup jurang ${gap}.`;
      }
      if (targetLang === "ta") {
        return `${client} (${loc} முதல் சந்திப்பு) ${gap} இடைவெளியை நிரப்ப சரியாக 3-ஸ்லைடு டெக்கை உருவாக்கவும்.`;
      }
      return `Build a strictly 3-slide pre-pitch deck for ${client}'s first ${loc} review to close the ${gap} gap.`;
    }

    if (k === "format") {
      if (targetLang === "zh-CN") {
        return `严格3页：第1页4张KPI卡，第2页缺口柱状图（${need} vs ${have} vs ${gap}），第3页策略对比表+备注。`;
      }
      if (targetLang === "yue") {
        return `嚴格3頁：第1頁4張KPI卡，第2頁缺口柱狀圖（${need} vs ${have} vs ${gap}），第3頁策略對比表+備註。`;
      }
      if (targetLang === "ms") {
        return `3 slaid: Slaid 1 KPI, Slaid 2 Carta Palang Jurang (${need} lwn ${have} lwn ${gap}), Slaid 3 Jadual Strategi + nota.`;
      }
      if (targetLang === "ta") {
        return `3 ஸ்லைடுகள்: ஸ்லைடு 1 KPI, ஸ்லைடு 2 இடைவெளி வரைபடம் (${need} vs ${have} vs ${gap}), ஸ்லைடு 3 தீர்வு அட்டவணை + குறிப்பு.`;
      }
      return `3 slides: Slide 1 KPIs, Slide 2 Liquidity Gap Bar Chart (${need} vs ${have} vs ${gap}), Slide 3 Strategy Table + speaker notes.`;
    }

    if (k === "constraints") {
      if (targetLang === "zh-CN") {
        return `遵守BNM公平待客：先做需求分析(Fact-Find)、说明PDS与15天犹豫期、非保证收益仅供说明${isShariah ? "、遵循Takaful与Hibah原则" : "、Schedule 10法定信托隔离"}。`;
      }
      if (targetLang === "yue") {
        return `遵守BNM公平待客：先做需求分析(Fact-Find)、說明PDS與15天猶豫期、非保證收益僅供說明${isShariah ? "、遵循Takaful與Hibah原則" : "、Schedule 10法定信託隔離"}。`;
      }
      if (targetLang === "ms") {
        return `Patuhi BNM FTFC: Fact-Find dahulu, PDS & 15 hari free-look, angka ilustratif tanpa jaminan${isShariah ? ", patuh Syariah Takaful/Hibah" : ", amanah Schedule 10"}.`;
      }
      if (targetLang === "ta") {
        return `BNM விதிகள்: முதலில் Fact-Find, PDS & 15-நாள் free-look, உத்தரவாதமற்ற மாதிரி எண்கள்${isShariah ? ", ஷரியா Takaful/Hibah" : ", Schedule 10 பாதுகாப்பு"}.`;
      }
      return `BNM Fair Dealing: Fact-Find first, 15-day free-look, PDS, illustrative non-guaranteed figures${isShariah ? ", Shariah Takaful/Hibah" : ", FSA Schedule 10 trust"}.`;
    }

    return raw.length > 120 ? `${raw.slice(0, 117).trim()}...` : raw;
  };

  // Assemble clean R.C.T.F.C. + Tone + Personal Strategic Angle prompt in explicit targetLang
  const buildAssembledPrompt = (
    guideList,
    pMap,
    toneId,
    angleStr,
    simpleFallback,
    targetLang = normLang,
    scenObj = challengeData?.scenario
  ) => {
    const anyActive = Object.values(pMap || {}).some(Boolean);
    const langDict = C2_UI_I18N[targetLang] || C2_UI_I18N.en;
    const blocks = {};
    if (anyActive) {
      (guideList || []).forEach((g) => {
        const tag = KEY_TO_TAG[g.key];
        if (tag && pMap[g.key] && g.template) {
          blocks[tag] = getConcisePillarTemplate(g, scenObj, targetLang);
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
    if (!built) return simpleFallback || "";
    return built;
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
          const starterMap = {
            role: false,
            context: false,
            task: false,
            format: false,
            constraints: false,
          };
          setActivePillarsMap(starterMap);
          setSelectedToneId(null);
          setSelectedAngleChipIdx(null);
          setShowCustomAngleInput(false);
          setUserTypedCustomAngle(false);
          setPersonalAngle("");
          setDeck(null);
          setDeckSignature("");
          setActiveStep("1");
          setShowBrief(true);
          setPromptText(
            buildAssembledPrompt(
              gList,
              starterMap,
              null,
              "",
              data.simple_prompt,
              targetLang,
              data.scenario
            )
          );
          initialPromptLoadedRef.current = true;
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
            !initialPromptLoadedRef.current ||
            (!isTargetCjk && /[\u4e00-\u9fff]/.test(promptText || ""))
          ) {
            setPromptText(
              buildAssembledPrompt(
                gList,
                activePillarsMap,
                selectedToneId,
                nextAngle,
                data.simple_prompt,
                targetLang,
                data.scenario
              )
            );
            initialPromptLoadedRef.current = true;
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
    const hasTagBlock = new RegExp(`^\\s*\\[${tag}\\]:`, "im").test(promptText || "");
    const currentlyActive = hasTagBlock || pillarStatuses[key] === "done";
    const shouldInclude = !currentlyActive;
    const nextMap = { ...activePillarsMap, [key]: shouldInclude };
    setActivePillarsMap(nextMap);
    const conciseBody = getConcisePillarTemplate(gObj, challengeData?.scenario, normLang);
    setPromptText((prev) => upsertOrRemovePromptBlock(prev, tag, conciseBody, shouldInclude));
    flashTagFeedback(`${shouldInclude ? "+ Added" : "− Removed"} [${tag}]`);
    setLineage((prev) => [
      ...prev,
      { t: Math.round((Date.now() - startRef.current) / 1000), e: "toggle", k: key },
    ]);
  };

  const handleRemoveBlockByTag = (tag) => {
    setPromptText((prev) => upsertOrRemovePromptBlock(prev, tag, "", false));
    const pillarKey = Object.keys(KEY_TO_TAG).find((k) => KEY_TO_TAG[k] === tag);
    if (pillarKey) {
      setActivePillarsMap((prev) => ({ ...prev, [pillarKey]: false }));
    } else if (tag === "Tone") {
      setSelectedToneId(null);
    } else if (tag === "Personal Strategic Angle") {
      setSelectedAngleChipIdx(null);
      setShowCustomAngleInput(false);
      setUserTypedCustomAngle(false);
      setPersonalAngle("");
    }
    flashTagFeedback(`− Removed [${tag}]`);
  };

  const handleClearAllPillars = () => {
    setActivePillarsMap({
      role: false,
      context: false,
      task: false,
      format: false,
      constraints: false,
    });
    setPromptText((prev) => {
      let cur = prev;
      ["Role", "Context", "Task", "Format", "Constraints"].forEach((tg) => {
        cur = upsertOrRemovePromptBlock(cur, tg, "", false);
      });
      return cur;
    });
    flashTagFeedback("✕ Removed All 5 R.C.T.F.C. Pillars");
  };

  const handleClearAllPrompt = () => {
    setActivePillarsMap({
      role: false,
      context: false,
      task: false,
      format: false,
      constraints: false,
    });
    setSelectedToneId(null);
    setSelectedAngleChipIdx(null);
    setShowCustomAngleInput(false);
    setUserTypedCustomAngle(false);
    setPersonalAngle("");
    setPromptText("");
    flashTagFeedback("✕ Cleared Prompt");
  };

  const handleResetStarterPrompt = () => {
    const starterMap = {
      role: false,
      context: false,
      task: false,
      format: false,
      constraints: false,
    };
    setActivePillarsMap(starterMap);
    setSelectedToneId(null);
    setSelectedAngleChipIdx(null);
    setShowCustomAngleInput(false);
    setUserTypedCustomAngle(false);
    setPersonalAngle("");
    setPromptText(
      buildAssembledPrompt(
        challengeData?.guide || [],
        starterMap,
        null,
        "",
        challengeData?.simple_prompt || "",
        normLang,
        challengeData?.scenario
      )
    );
    flashTagFeedback("↺ Reset to Starter");
  };

  const handleActivateAllPillars = () => {
    const allOn = { role: true, context: true, task: true, format: true, constraints: true };
    setActivePillarsMap(allOn);
    setPromptText((prev) => {
      let cur = prev;
      (challengeData?.guide || []).forEach((g) => {
        const tag = KEY_TO_TAG[g.key];
        if (tag && g.template) {
          const conciseBody = getConcisePillarTemplate(g, challengeData?.scenario, normLang);
          cur = upsertOrRemovePromptBlock(cur, tag, conciseBody, true);
        }
      });
      return cur;
    });
    flashTagFeedback("✓ Added All 5 R.C.T.F.C. Pillars");
  };

  const handleSelectTone = (toneId) => {
    const hasToneBlock = /^\s*\[Tone\]:/im.test(promptText || "");
    const togglingOff = selectedToneId === toneId && hasToneBlock;
    const nextTone = togglingOff ? null : toneId;
    setSelectedToneId(nextTone);
    const toneObj = nextTone ? (ui.tones || []).find((x) => x.id === nextTone) : null;
    setPromptText((prev) =>
      upsertOrRemovePromptBlock(prev, "Tone", toneObj?.clause || "", Boolean(toneObj))
    );
    flashTagFeedback(toneObj ? `+ Tone: ${toneObj.shortLabel}` : "− Removed [Tone]");
  };

  const handlePickAngleChip = (hintVal, chipIdx) => {
    const hasAngleBlock = /^\s*\[Personal Strategic Angle\]:/im.test(promptText || "");
    const togglingOff =
      !showCustomAngleInput &&
      hasAngleBlock &&
      (selectedAngleChipIdx === chipIdx || personalAngle.trim() === hintVal.trim());
    const nextIdx = togglingOff ? null : chipIdx;
    const nextVal = togglingOff ? "" : hintVal;
    setShowCustomAngleInput(false);
    setSelectedAngleChipIdx(nextIdx);
    setUserTypedCustomAngle(false);
    setPersonalAngle(nextVal);
    setPromptText((prev) =>
      upsertOrRemovePromptBlock(prev, "Personal Strategic Angle", nextVal, Boolean(nextVal))
    );
    flashTagFeedback(nextVal ? "+ Added [Personal Strategic Angle]" : "− Removed [Angle]");
  };

  const handleToggleCustomAngleOption = () => {
    const turningOff = showCustomAngleInput || selectedAngleChipIdx === "custom";
    if (turningOff) {
      setShowCustomAngleInput(false);
      setSelectedAngleChipIdx(null);
      setUserTypedCustomAngle(false);
      setPersonalAngle("");
      setPromptText((prev) => upsertOrRemovePromptBlock(prev, "Personal Strategic Angle", "", false));
      flashTagFeedback("− Removed [Angle]");
    } else {
      const startCustomVal = userTypedCustomAngle ? personalAngle : "";
      setShowCustomAngleInput(true);
      setSelectedAngleChipIdx("custom");
      setUserTypedCustomAngle(true);
      setPersonalAngle(startCustomVal);
      setPromptText((prev) =>
        upsertOrRemovePromptBlock(
          prev,
          "Personal Strategic Angle",
          startCustomVal,
          Boolean(startCustomVal && startCustomVal.trim())
        )
      );
    }
  };

  const handleCustomAngleType = (typedVal) => {
    setShowCustomAngleInput(true);
    setSelectedAngleChipIdx("custom");
    setUserTypedCustomAngle(true);
    setPersonalAngle(typedVal);
    setPromptText((prev) =>
      upsertOrRemovePromptBlock(
        prev,
        "Personal Strategic Angle",
        typedVal,
        Boolean(typedVal && typedVal.trim())
      )
    );
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
    } else if (!/^\s*\[Personal Strategic Angle\]:/im.test(rawVal || "")) {
      setPersonalAngle("");
      if (!showCustomAngleInput) {
        setSelectedAngleChipIdx(null);
      }
    }
    if (!blocks["Tone"]) {
      setSelectedToneId(null);
    }
  };

  // Current 72-seat coordinates: caseSlot (0..5) + personaRound (0..11)
  const currentSeat = typeof challengeData?.seatIndex === "number" ? challengeData.seatIndex : 0;
  const currentCaseSlot = ((currentSeat % 6) + 6) % 6;
  const currentPersonaRound = Math.floor(currentSeat / 6);

  const executePickCaseSlot = (targetSlot) => {
    const k = ((targetSlot % 6) + 6) % 6;
    const total = challengeData?.totalUniqueSeats || 72;
    const nextSeat = (currentPersonaRound * 6 + k) % total;
    setConfirmArmedSlot(null);
    setSeatOverride(nextSeat);
    setShowCasePicker(false);
    loadScenarioSeat(nextSeat, true);
  };

  const handlePickCaseSlot = (targetSlot) => {
    const k = ((targetSlot % 6) + 6) % 6;
    if (k === currentCaseSlot) {
      setConfirmArmedSlot(null);
      setShowCasePicker(false);
      return;
    }
    if (deck && confirmArmedSlot !== k) {
      setConfirmArmedSlot(k);
      return;
    }
    executePickCaseSlot(k);
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
      setTimeout(() => {
        try {
          URL.revokeObjectURL(url);
        } catch (e) {}
      }, 30000);
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
      <div className="w-full max-w-full min-w-0 overflow-hidden bg-white border-t-4 border-t-[#ed1b2e] border-x border-b border-slate-200 rounded-2xl p-3.5 sm:p-5 space-y-3.5 shadow-md">
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
              <div className="flex flex-wrap items-center gap-1.5">
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
    <div className="w-full max-w-full min-w-0 overflow-hidden bg-white border-t-4 border-t-[#ed1b2e] border-x border-b border-slate-200 rounded-2xl p-3 sm:p-5 space-y-3 shadow-sm">
      {/* 1. Slim Top Studio Bar + Compact 🎯 Sample Button */}
      <div className="flex items-center justify-between gap-2 pb-2 border-b border-slate-200 min-w-0">
        <h2 className="text-sm sm:text-base font-extrabold text-slate-900 truncate min-w-0">
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
          className="fixed inset-0 z-50 bg-slate-950/75 backdrop-blur-sm flex items-center justify-center p-3 sm:p-5 overflow-y-auto"
          onClick={() => setShowBenchmark(false)}
        >
          <div
            className="bg-slate-900 text-white border border-slate-700 rounded-2xl w-full max-w-2xl p-3.5 sm:p-4 space-y-3 shadow-2xl max-h-[88dvh] overflow-y-auto"
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
                  className={`py-1.5 px-2 rounded-lg text-xs font-extrabold truncate transition-all ${
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

      {/* 2. Unified Auto-Collapsing Light-Grey Client Brief Card + 6-Case Switcher (Aligned 1:1 with C3) */}
      <div
        data-testid="client-brief-card"
        className="bg-slate-50 border border-slate-200 rounded-2xl p-2.5 sm:p-3 space-y-2"
      >
        {!showBrief ? (
          /* Sleek 1-Line Collapsed Client Bar */
          <div className="flex items-center justify-between gap-2">
            <button
              type="button"
              onClick={() => setShowBrief(true)}
              className="min-w-0 flex-1 flex items-center gap-1.5 text-xs font-extrabold text-slate-900 truncate text-left"
            >
              <span className="shrink-0">{scen?.icon || "🏛️"}</span>
              <span className="truncate flex-1">{clientShort}</span>
              {gapValue && (
                <span className="hidden min-[400px]:inline text-[#ed1b2e] font-mono text-[11px] shrink-0">
                  • {gapValue}
                </span>
              )}
            </button>
            <div className="flex items-center gap-1.5 shrink-0">
              <button
                type="button"
                onClick={() => setShowBrief(true)}
                className="px-2 py-1 rounded-lg bg-white hover:bg-red-50 border border-slate-300 text-[11px] font-bold text-slate-700 hover:text-[#ed1b2e] whitespace-nowrap transition-all"
              >
                {ui.caseInfoBtn}
              </button>
              <button
                type="button"
                onClick={() => {
                  setConfirmArmedSlot(null);
                  setShowCasePicker((v) => !v);
                }}
                className="px-2 py-1 rounded-lg bg-white hover:bg-red-50 border border-slate-300 text-[11px] font-extrabold text-slate-800 hover:text-[#ed1b2e] whitespace-nowrap transition-all"
              >
                {ui.switchShortFmt} ({currentCaseSlot + 1}/6) ▾
              </button>
            </div>
          </div>
        ) : (
          /* Expanded Client Card Header */
          <div className="flex items-center justify-between gap-2">
            <button
              type="button"
              onClick={() => setShowBrief(false)}
              className="min-w-0 flex-1 flex items-center gap-1.5 text-left"
            >
              <span className="text-base leading-none shrink-0">{scen?.icon || "🏛️"}</span>
              <span className="text-xs font-extrabold text-slate-900 truncate">
                {scen?.shortLabel || clientShort}
              </span>
            </button>
            <div className="flex items-center gap-1.5 shrink-0">
              <button
                type="button"
                onClick={() => setShowBrief(false)}
                className="px-2 py-1 rounded-lg bg-white hover:bg-red-50 border border-slate-300 text-[11px] font-bold text-slate-700 hover:text-[#ed1b2e] whitespace-nowrap transition-all"
              >
                {ui.hideCaseBtn}
              </button>
              <button
                type="button"
                onClick={() => {
                  setConfirmArmedSlot(null);
                  setShowCasePicker((v) => !v);
                }}
                className="px-2 py-1 rounded-lg bg-white hover:bg-red-50 border border-slate-300 text-[11px] font-extrabold text-slate-800 hover:text-[#ed1b2e] whitespace-nowrap transition-all"
              >
                {ui.switchShortFmt} ({currentCaseSlot + 1}/6) ▾
              </button>
            </div>
          </div>
        )}

        {/* Sleek 6-Item Curated Case Picker (WebView-Safe Inline Switch Confirmation — No window.confirm!) */}
        {showCasePicker && (
          <div className="bg-white border border-slate-200 rounded-xl p-2 space-y-2 shadow-sm">
            {confirmArmedSlot !== null && (
              <div className="bg-amber-50 border border-amber-300 rounded-lg p-2 flex flex-wrap items-center justify-between gap-2">
                <span className="text-[11px] font-bold text-amber-950 leading-snug">
                  ⚠️ {ui.switchConfirmMsg}
                </span>
                <div className="flex items-center gap-1.5 ml-auto">
                  <button
                    type="button"
                    onClick={() => setConfirmArmedSlot(null)}
                    className="px-2.5 py-1 rounded-lg bg-white hover:bg-slate-100 border border-slate-300 text-[11px] font-bold text-slate-700"
                  >
                    ✕
                  </button>
                  <button
                    type="button"
                    onClick={() => executePickCaseSlot(confirmArmedSlot)}
                    className="px-2.5 py-1 rounded-lg bg-[#ed1b2e] hover:bg-[#c81526] text-white text-[11px] font-extrabold"
                  >
                    ✓ {ui.switchShortFmt} ({confirmArmedSlot + 1}/6)
                  </button>
                </div>
              </div>
            )}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
              {C2_CURATED_CASES_META.map((cm) => {
                const isCur = cm.slot === currentCaseSlot;
                const isArmed = confirmArmedSlot === cm.slot;
                const lbl = cm.labels[normLang] || cm.labels.en;
                return (
                  <button
                    key={cm.id}
                    type="button"
                    onClick={() => handlePickCaseSlot(cm.slot)}
                    className={`text-left px-2.5 py-2 rounded-lg border text-xs font-extrabold transition-all flex items-center justify-between gap-2 ${
                      isCur
                        ? "bg-[#ed1b2e] border-[#ed1b2e] text-white"
                        : isArmed
                        ? "bg-amber-50 border-amber-400 text-amber-950"
                        : "bg-slate-50 hover:bg-red-50/50 border-slate-200 text-slate-800 hover:border-[#ed1b2e]"
                    }`}
                  >
                    <span className="truncate">
                      {cm.icon} {lbl}
                    </span>
                    <span
                      className={`text-[10px] font-mono shrink-0 ${
                        isCur ? "text-red-100" : "text-[#ed1b2e]"
                      }`}
                    >
                      {cm.slot + 1}/6
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Compact 2×2 Mobile Balance-Sheet Grid (~130px height on mobile) */}
        {showBrief && (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
            {caseCards.map((c, ci) => (
              <div
                key={ci}
                className="bg-white border border-slate-200 rounded-xl p-2 min-w-0"
              >
                <div className="text-[10px] font-extrabold text-[#ed1b2e] truncate">
                  {c.icon} {c.label}
                </div>
                <div className="text-[11px] text-slate-800 leading-snug mt-0.5 line-clamp-2">
                  {c.value}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Unified Segmented Step Workflow Bar (Aligned across C2 & C3) */}
      <div className="grid grid-cols-2 gap-1.5 bg-slate-100 p-1 rounded-2xl border border-slate-200/80 min-w-0">
        <button
          type="button"
          onClick={() => setActiveStep("1")}
          className={`min-w-0 overflow-hidden py-2 px-2 rounded-xl text-xs font-extrabold transition-all flex items-center justify-center gap-1 ${
            activeStep === "1"
              ? "bg-[#ed1b2e] text-white shadow-sm"
              : activePillarCount >= 3
              ? "bg-white text-emerald-800 border border-emerald-200 shadow-sm"
              : "text-slate-700 hover:bg-white/70 hover:text-slate-900"
          }`}
        >
          {activeStep !== "1" && activePillarCount >= 3 && <span className="shrink-0">✓</span>}
          <span className="truncate">{ui.step1Tab}</span>
        </button>
        <button
          type="button"
          onClick={() => deck && setActiveStep("2")}
          disabled={!deck}
          className={`min-w-0 overflow-hidden py-2 px-2 rounded-xl text-xs font-extrabold transition-all flex items-center justify-center gap-1 ${
            activeStep === "2"
              ? "bg-[#ed1b2e] text-white shadow-sm"
              : deck
              ? "bg-white text-emerald-800 border border-emerald-200 shadow-sm"
              : "text-slate-400 cursor-not-allowed opacity-75"
          }`}
        >
          {!deck && <span className="shrink-0 text-[10px]">🔒</span>}
          <span className="truncate">{ui.step2Tab}</span>
          {deck && (
            <span className="px-1.5 py-0.5 rounded-full bg-emerald-500 text-white text-[9px]">
              3/3
            </span>
          )}
        </button>
      </div>

      {/* ========================================================================
         STEP 1: 1. BOARDROOM STYLE -> 2. PERSONAL ANGLE -> 3. COLLAPSIBLE R.C.T.F.C.
      ======================================================================== */}
      {activeStep === "1" && (
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-3 sm:p-4 space-y-3">
          {/* 1. 1-Row 3-Pill Boardroom Style Selector */}
          <div className="space-y-1.5 min-w-0">
            <div className="text-xs font-extrabold text-slate-900">{ui.toneHeader}</div>
            <div className="grid grid-cols-3 gap-1.5 min-w-0">
              {(ui.tones || []).map((tn) => {
                const active = selectedToneId === tn.id;
                return (
                  <button
                    key={tn.id}
                    type="button"
                    onClick={() => handleSelectTone(tn.id)}
                    className={`min-w-0 max-w-full overflow-hidden px-2 py-2 rounded-xl border text-[11px] sm:text-xs font-extrabold text-center truncate transition-all ${
                      active
                        ? "bg-[#ed1b2e] text-white border-[#ed1b2e] shadow-sm"
                        : "bg-white hover:bg-red-50/50 text-slate-800 border-slate-200"
                    }`}
                  >
                    {tn.shortLabel}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 2. Personal Strategic Angle Quick-Insert Chips + 4th Custom Option */}
          <div className="space-y-1.5 min-w-0">
            <div className="text-xs font-extrabold text-slate-900">{ui.angleHeader}</div>
            <div className="flex flex-col gap-1.5 min-w-0">
              {angleHints.slice(0, 3).map((hint, hi) => {
                const hasAngleBlock = /^\s*\[Personal Strategic Angle\]:/im.test(promptText || "");
                const selected =
                  !showCustomAngleInput &&
                  hasAngleBlock &&
                  (selectedAngleChipIdx === hi || promptText.includes(hint.trim()));
                return (
                  <button
                    key={hi}
                    type="button"
                    onClick={() => handlePickAngleChip(hint, hi)}
                    className={`w-full min-w-0 max-w-full overflow-hidden px-2.5 py-2 rounded-xl text-xs font-bold border text-left whitespace-normal break-words leading-snug transition-all ${
                      selected
                        ? "bg-red-50 border-[#ed1b2e] text-[#ed1b2e] shadow-sm"
                        : "bg-white hover:bg-red-50/40 text-slate-800 border-slate-200"
                    }`}
                  >
                    {selected ? "✓ " : "+ ✨ "}
                    {hint}
                  </button>
                );
              })}

              {/* 4th Option: Write Your Own Custom Strategic Angle */}
              <button
                type="button"
                onClick={handleToggleCustomAngleOption}
                className={`w-full min-w-0 max-w-full overflow-hidden px-2.5 py-2 rounded-xl text-xs font-extrabold border text-left whitespace-normal break-words leading-snug transition-all ${
                  showCustomAngleInput || selectedAngleChipIdx === "custom"
                    ? "bg-amber-50 border-[#ed1b2e] text-[#ed1b2e] shadow-sm"
                    : "bg-white hover:bg-amber-50/60 text-slate-800 border-slate-300 border-dashed"
                }`}
              >
                {showCustomAngleInput || selectedAngleChipIdx === "custom" ? "✓ " : "+ "}
                {ui.customAngleBtn}
              </button>

              {(showCustomAngleInput || selectedAngleChipIdx === "custom") && (
                <input
                  type="text"
                  value={personalAngle}
                  onChange={(e) => handleCustomAngleType(e.target.value)}
                  placeholder={ui.customAngleInputPlaceholder}
                  className="w-full bg-white border border-amber-300 focus:border-[#ed1b2e] rounded-xl px-3 py-2 text-base sm:text-xs text-slate-900 font-medium focus:outline-none"
                />
              )}
            </div>
          </div>

          {/* 3. 🚀 Improve Your Prompt! (R.C.T.F.C.) Collapsible Power-Ups Drawer */}
          <div data-testid="c2-rctfc-collapsible" className="min-w-0">
            <button
              type="button"
              onClick={() => setShowRctfcDrawer((v) => !v)}
              className="w-full flex items-center justify-between gap-2 px-3 py-2.5 rounded-xl bg-white hover:bg-red-50/40 border border-slate-300 text-left transition-all"
            >
              <span className="text-xs font-extrabold text-slate-900 truncate">
                {ui.improveHeader}
              </span>
              <span className="shrink-0 flex items-center gap-1.5">
                <span
                  className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold border ${
                    activePillarCount > 0
                      ? "bg-emerald-50 text-emerald-800 border-emerald-300"
                      : "bg-slate-100 text-slate-600 border-slate-200"
                  }`}
                >
                  {activePillarCount}/5
                </span>
                <span className="text-xs font-extrabold text-slate-500">
                  {showRctfcDrawer ? "▴" : "▾"}
                </span>
              </span>
            </button>

            {showRctfcDrawer && (
              <div className="pt-2 space-y-2">
                <div className="flex flex-wrap items-center justify-between gap-1.5">
                  <span className="text-[11px] text-slate-600 leading-snug">
                    {ui.improveSub}
                  </span>
                  <div className="flex items-center gap-1.5 ml-auto shrink-0">
                    {activePillarCount < 5 && (
                      <button
                        type="button"
                        onClick={handleActivateAllPillars}
                        className="px-2.5 py-1 rounded-lg bg-[#ed1b2e] hover:bg-[#c81526] text-white text-[11px] font-extrabold transition-all"
                      >
                        {ui.activateAllShort}
                      </button>
                    )}
                    {activePillarCount > 0 && (
                      <button
                        type="button"
                        onClick={handleClearAllPillars}
                        className="px-2.5 py-1 rounded-lg bg-white hover:bg-red-50 border border-slate-300 hover:border-[#ed1b2e] text-slate-700 hover:text-[#ed1b2e] text-[11px] font-extrabold transition-all"
                      >
                        {ui.clearAllShort}
                      </button>
                    )}
                  </div>
                </div>

                {loadingChallenge ? (
                  <div className="text-xs text-slate-500 py-3 text-center">Loading scenario...</div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                    {guideSteps.map((g) => {
                      const isDone = pillarStatuses[g.key] === "done";
                      const shortTitle =
                        (ui.pillarTitles && ui.pillarTitles[g.key]) || g.label;
                      return (
                        <button
                          key={g.key}
                          type="button"
                          onClick={() => handleTogglePillar(g.key)}
                          className={`min-w-0 max-w-full px-3 py-2.5 rounded-xl border text-left transition-all ${
                            isDone
                              ? "bg-emerald-50/90 border-emerald-500 shadow-sm"
                              : "bg-white hover:bg-red-50/40 border-slate-200"
                          }`}
                        >
                          <div className="flex items-center justify-between gap-1.5 min-w-0">
                            <span
                              className={`text-xs font-extrabold ${
                                isDone ? "text-emerald-900" : "text-slate-900"
                              }`}
                            >
                              {isDone ? "✓ " : "+ "}
                              {shortTitle}
                            </span>
                          </div>
                          <div className="text-[11px] text-slate-600 leading-snug mt-0.5 whitespace-normal break-words">
                            {g.tip || g.summary}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* 4. LIVE EDITABLE PROMPT BOX (100% Transparent — Removable [Tag ✕] Pills + Clear/Reset!) */}
          {(() => {
            const activeTagsInPrompt = CANONICAL_TAGS.filter((tg) =>
              new RegExp(`^\\s*\\[${tg}\\]:`, "im").test(promptText || "")
            );
            return (
              <div className="bg-white border-2 border-slate-300 focus-within:border-[#ed1b2e] rounded-2xl p-2.5 space-y-2 transition-all">
                <div className="flex flex-wrap items-center justify-between gap-1.5">
                  <span className="text-[11px] font-extrabold text-slate-800">
                    ✍️ Your Live AI Prompt ({activePillarCount}/5 R.C.T.F.C.)
                  </span>
                  <div className="flex items-center gap-1">
                    {lastUpdatedTag && (
                      <span className="px-2 py-0.5 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-900 text-[10px] font-extrabold">
                        {lastUpdatedTag}
                      </span>
                    )}
                    <button
                      type="button"
                      onClick={handleResetStarterPrompt}
                      className="px-2 py-0.5 rounded-lg bg-slate-50 hover:bg-slate-100 border border-slate-300 text-[10px] font-extrabold text-slate-700"
                      title="Reset to starter prompt"
                    >
                      ↺ Reset
                    </button>
                    {promptText.trim().length > 0 && (
                      <button
                        type="button"
                        onClick={handleClearAllPrompt}
                        className="px-2 py-0.5 rounded-lg bg-slate-50 hover:bg-red-50 border border-slate-300 hover:border-red-300 text-[10px] font-extrabold text-slate-700 hover:text-[#ed1b2e]"
                        title="Clear entire prompt"
                      >
                        ✕ Clear
                      </button>
                    )}
                  </div>
                </div>

                {/* One-Tap Removable [Section ✕] Chips — Works Even After You Edit Text! */}
                {activeTagsInPrompt.length > 0 && (
                  <div className="flex flex-wrap items-center gap-1">
                    {activeTagsInPrompt.map((tg) => {
                      const shortTg = tg === "Personal Strategic Angle" ? "Angle" : tg;
                      return (
                        <button
                          key={tg}
                          type="button"
                          onClick={() => handleRemoveBlockByTag(tg)}
                          className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-slate-50 hover:bg-red-50 border border-slate-300 hover:border-[#ed1b2e] text-[10px] font-extrabold text-slate-700 hover:text-[#ed1b2e] transition-all"
                          title={`Remove [${tg}] section`}
                        >
                          <span>{shortTg}</span>
                          <span className="text-[#ed1b2e]">✕</span>
                        </button>
                      );
                    })}
                  </div>
                )}

                <textarea
                  rows={4}
                  value={promptText}
                  onChange={(e) => handleLivePromptEdit(e.target.value)}
                  placeholder={ui.anglePlaceholder}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-none p-2.5 text-base sm:text-xs text-slate-900 leading-relaxed font-sans"
                />
              </div>
            );
          })()}

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
