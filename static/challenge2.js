/* ============================================================================
   CHALLENGE 2 MODULE (14:20 - 14:35 | 15 Mins)
   "Executive Pre-Pitch 3-Slide Deck Studio (R.C.T.F.C. + Personal Touch)"
   - Strictly 3 Slides Only (Slide 1 KPI Snapshot · Slide 2 Gap Chart · Slide 3 Strategy Matrix)
   - 56 Unique HNW Malaysian Client Scenarios (14 Archetypes × 4 Personas)
   - Clean Visual R.C.T.F.C. Builder + Boardroom Tone + Personal Strategic Angle
   - Full 5-Language Native Localization (EN, ZH-CN, YUE, MS, TA)
   - Mobile localStorage Persistence + Strict One-Time Final Submission Lock
============================================================================ */

const C2_UI_I18N = {
  en: {
    badge: "🧠 CHALLENGE 2 • R.C.T.F.C. 3-SLIDE DECK STUDIO",
    title: "Executive Pre-Pitch 3-Slide Studio",
    subtitle:
      "Every leader receives a unique HNW client case. Activate the 5 R.C.T.F.C. pillars, add your Personal Strategic Angle, and generate a strictly 3-slide boardroom pre-pitch deck.",
    step1Tab: "1️⃣ Architect Prompt & Angle",
    step2Tab: "2️⃣ Review 3-Slide Deck & Submit",
    targetBtn: "🎯 Benchmark Deck",
    hideTargetBtn: "✕ Hide Benchmark",
    browseCasesBtn: "📂 14 Cases",
    switchCaseBtn: "🎲 Switch Case",
    casePickerTitle: "Choose an HNW Executive Scenario (14 Archetypes • 56 Unique Seats)",
    targetGoalBanner: "🎯 3-SLIDE BENCHMARK REFERENCE DECK (FOR YOUR CLIENT)",
    assignedCaseLabel: "ASSIGNED HNW CLIENT BRIEF",
    moreCaseBtn: "Full Dossier ▾",
    lessCaseBtn: "Compact ▴",
    pillarsHeader: "1. Activate the 5 R.C.T.F.C. Prompt Pillars",
    pillarsSub: "Tap individual pillars to toggle, or activate all 5 and focus on your personal angle below.",
    insertAllBtn: "✨ Activate All 5 Pillars",
    weakPromptBtn: "🧪 Try Weak 1-Line Prompt",
    toneHeader: "2. Choose Boardroom Presentation Style",
    tones: [
      {
        id: "boardroom",
        label: "🏛️ Family-Office Boardroom",
        clause: "[Presentation Style]: Authoritative Family-Office boardroom tone — crisp balance-sheet framing, zero sales fluff.",
      },
      {
        id: "empathy",
        label: "❤️ Founder & Family Empathy",
        clause: "[Presentation Style]: Warm founder & family-dignity tone — protect family harmony, spouse security, and children's dreams.",
      },
      {
        id: "cfo",
        label: "📊 CFO Precision & IRR Clarity",
        clause: "[Presentation Style]: Analytical CFO tone — emphasize cost-of-capital (~2% p.a. vs 40% fire-sale loss) and statutory ring-fencing.",
      },
    ],
    angleHeader: "3. 💡 Add Your Personal Strategic Angle / Relationship Hook",
    angleSub: "What makes YOUR advisory approach stand out? Tap an idea below or write your own custom angle:",
    anglePlaceholder: "e.g., Propose a 30-min joint review with their tax accountant & company secretary—zero product push...",
    promptDrawerShow: "🔍 Inspect / Edit Full Assembled Prompt",
    promptDrawerHide: "▴ Collapse Prompt Editor",
    pillarsActiveLabel: "R.C.T.F.C. Active",
    strictly3Badge: "STRICTLY 3 SLIDES",
    generateBtn: "⚡ Generate 3-Slide Executive Deck",
    regenerateBtn: "🔄 Regenerate 3-Slide Deck",
    genStages: [
      "1/3 · Structuring Slide 1 Client & Balance-Sheet KPIs...",
      "2/3 · Modeling Slide 2 Liquidity Gap Bar Chart...",
      "3/3 · Synthesizing Slide 3 Strategy Matrix & Speaker Notes...",
    ],
    generatingImgText: "🎨 Rendering bespoke 16:9 boardroom slide visuals...",
    finishingImgBeforeSubmit: "🎨 Attaching slide visuals before locking your final deck...",
    slideTabPrefix: "Slide ",
    slideTabSuffix: "",
    slideShortLabels: ["Snapshot & KPIs", "Liquidity Gap", "Strategy Matrix"],
    slidesCountBadge: "3 Slides Locked ✓",
    compareToggleOn: "🔀 Side-by-Side Benchmark: ON",
    compareToggleOff: "🔀 Compare vs Benchmark",
    downloadPptxBtn: "⬇ Export .pptx",
    yourSlideLabel: "📊 YOUR GENERATED SLIDE",
    targetSlideLabel: "🎯 BENCHMARK SLIDE",
    speakerNotesLabel: "🎙️ Presenter Notes",
    qualityChecksHeader: "✅ Pre-Submit 3-Slide Readiness Checklist",
    checkLabels: {
      slides3: "Strictly 3 Slides",
      clientFacts: "Client Balance-Sheet Numbers",
      visuals: "KPIs + Gap Chart + Strategy Table",
      personalTouch: "Personal Strategic Angle",
      compliance: "BNM & Trust/Hibah Guardrails",
    },
    backToPromptBtn: "✏️ Refine Prompt / Angle",
    finalSubmitBtn: "🏆 Finalize & Submit 3-Slide Deck to Arena",
    finalSubmittingText: "⚖️ Executive Judge Scoring Your 3-Slide Deck & Personal Angle...",
    oneTimeNotice:
      "🔒 Regenerate freely while drafting. Clicking Finalize & Submit locks your 3-slide deck onto the Live Arena Leaderboard.",
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
    promptUsedLabel: "📝 Your Submitted R.C.T.F.C. Prompt & Strategic Angle",
  },
  "zh-CN": {
    badge: "🧠 挑战 2 • R.C.T.F.C. 三页高管简报工作室",
    title: "高管战前 3 页简报工作室",
    subtitle:
      "每位团队长均获分配专属高净值客户案例。激活 R.C.T.F.C. 五大维度并融入您的「个人策略切入点」，生成严格限定 3 页的家族办公室级提案简报。",
    step1Tab: "1️⃣ 构建五维策略与个人切入点",
    step2Tab: "2️⃣ 预览 3 页简报并最终提交",
    targetBtn: "🎯 参考标杆简报",
    hideTargetBtn: "✕ 收起标杆",
    browseCasesBtn: "📂 14类案例",
    switchCaseBtn: "🎲 切换客户",
    casePickerTitle: "选择高净值客户实战案例（14 大行业原型 • 全场 56 席独立案例）",
    targetGoalBanner: "🎯 3 页标杆参考简报（对应您当前客户）",
    assignedCaseLabel: "您的专属高净值客户档案",
    moreCaseBtn: "完整背景 ▾",
    lessCaseBtn: "收起 ▴",
    pillarsHeader: "1. 激活 R.C.T.F.C. 五维提示词积木",
    pillarsSub: "点击点亮各维度，或一键激活全部 5 个维度后专注打磨下方的个人策略切入点。",
    insertAllBtn: "✨ 一键激活全部 5 个维度",
    weakPromptBtn: "🧪 体验普通一句话提示词对比",
    toneHeader: "2. 选择简报呈现风格",
    tones: [
      {
        id: "boardroom",
        label: "🏛️ 家族办公室尊尚风",
        clause: "[呈现风格]：采用资深家族办公室董事会风格——聚焦资产负债表与传承结构，零推销感。",
      },
      {
        id: "empathy",
        label: "❤️ 创办人共情与家风守护",
        clause: "[呈现风格]：温暖共情切入——守护创业心血免遭折价变卖，保障配偶尊严与子女学业和谐。",
      },
      {
        id: "cfo",
        label: "📊 CFO 财务量化对比",
        clause: "[呈现风格]：严谨 CFO 财务视角——用每年约 2% 保费成本对比资产冻结 40% 折价损失与法定信托隔离。",
      },
    ],
    angleHeader: "3. 💡 加入您的「个人策略切入点 / 顾问式邀约钩子」",
    angleSub: "展现您独特的团队长破局思路！可点击下方灵感胶囊，或用自己的话输入：",
    anglePlaceholder: "例如：提议与客户的公司秘书及税务会计师进行30分钟三方联合审视，零推销压力...",
    promptDrawerShow: "🔍 查看 / 自由编辑完整提示词原文",
    promptDrawerHide: "▴ 收起提示词编辑器",
    pillarsActiveLabel: "已激活 R.C.T.F.C.",
    strictly3Badge: "严格限定 3 页",
    generateBtn: "⚡ 生成严格 3 页高管战前简报",
    regenerateBtn: "🔄 更新并重新生成 3 页简报",
    genStages: [
      "1/3 · 正在构建第 1 页：客户资产快照与 4 大 KPI 指标卡...",
      "2/3 · 正在测算第 2 页：流动性缺口量化对比柱状图...",
      "3/3 · 正在生成第 3 页：定制传承策略矩阵表与演讲备注...",
    ],
    generatingImgText: "🎨 正在绘制 16:9 高管简报尊尚配图...",
    finishingImgBeforeSubmit: "🎨 正在合成简报视觉配图并锁定最终成绩...",
    slideTabPrefix: "第 ",
    slideTabSuffix: " 页",
    slideShortLabels: ["全景与KPI", "流动性缺口图", "策略矩阵表"],
    slidesCountBadge: "严格 3 页已就绪 ✓",
    compareToggleOn: "🔀 对标标杆简报：开启",
    compareToggleOff: "🔀 与标杆简报并排对比",
    downloadPptxBtn: "⬇ 下载 .pptx",
    yourSlideLabel: "📊 您生成的简报页",
    targetSlideLabel: "🎯 标杆参考简报页",
    speakerNotesLabel: "🎙️ 演讲者备注",
    qualityChecksHeader: "✅ 提交前 3 页简报质量自检",
    checkLabels: {
      slides3: "严格限定 3 页结构",
      clientFacts: "精准引用客户财务数据",
      visuals: "KPI卡 + 缺口柱状图 + 策略表",
      personalTouch: "融入个人策略切入点",
      compliance: "BNM 与信托/Hibah合规护栏",
    },
    backToPromptBtn: "✏️ 返回调整策略或切入点",
    finalSubmitBtn: "🏆 最终确认并提交 3 页简报至主赛场",
    finalSubmittingText: "⚖️ AI 评审团正在为您的 3 页简报与个人策略打分...",
    oneTimeNotice:
      "🔒 定稿前可无限次调整并重新生成 3 页简报；点击「最终确认并提交」后成绩即锁定上榜！",
    jobDoneBadge: "✅ 挑战 2 已完成 — 已锁定上榜",
    jobDoneTitle: "您的 3 页高管战前提案简报已同步至主赛场大屏",
    arenaScoreLabel: "主赛场得分",
    deckScoreLabel: "简报专业评级",
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
    promptUsedLabel: "📝 您最终提交的提示词与个人策略切入点",
  },
  yue: {
    badge: "🧠 挑戰 2 • R.C.T.F.C. 三頁高管簡報工作室",
    title: "高管戰前 3 頁簡報工作室",
    subtitle:
      "每位團隊長都會獲派專屬高淨值客戶個案。激活 R.C.T.F.C. 五大維度並加入你嘅「個人策略切入點」，生成嚴格限定 3 頁嘅董事會級簡報。",
    step1Tab: "1️⃣ 構建五維策略與個人切入點",
    step2Tab: "2️⃣ 預覽 3 頁簡報並最終提交",
    targetBtn: "🎯 參考標竿簡報",
    hideTargetBtn: "✕ 收起標竿",
    browseCasesBtn: "📂 14類個案",
    switchCaseBtn: "🎲 轉另一個案",
    casePickerTitle: "揀選高淨值客戶實戰個案（14 大行業原型 • 全場 56 席獨立個案）",
    targetGoalBanner: "🎯 3 頁標竿參考簡報（對應你當前客戶）",
    assignedCaseLabel: "你嘅專屬高淨值客戶檔案",
    moreCaseBtn: "完整背景 ▾",
    lessCaseBtn: "收起 ▴",
    pillarsHeader: "1. 激活 R.C.T.F.C. 五維提示詞積木",
    pillarsSub: "撳一下點亮各個維度，或者一鍵激活晒 5 個維度再專注寫下面嘅個人策略切入點。",
    insertAllBtn: "✨ 一鍵激活全部 5 個維度",
    weakPromptBtn: "🧪 試下普通一句話提示詞對比",
    toneHeader: "2. 揀選簡報呈現風格",
    tones: [
      {
        id: "boardroom",
        label: "🏛️ 家族辦公室尊尚風",
        clause: "[呈現風格]：採用資深家族辦公室董事會風格——聚焦資產負債表同傳承架構，零 Hard Sell。",
      },
      {
        id: "empathy",
        label: "❤️ 創辦人共情與守護屋企",
        clause: "[呈現風格]：窩心共情切入——守護創業心血免遭賤賣，保障另一半生活尊嚴同仔女升學和睦。",
      },
      {
        id: "cfo",
        label: "📊 CFO 財務量化對比",
        clause: "[呈現風格]：嚴謹 CFO 財務視角——用每年約 2% 成本對比資產凍結 40% 折價損失同法定信託隔離。",
      },
    ],
    angleHeader: "3. 💡 加入你嘅「個人策略切入點 / 約見鉤子」",
    angleSub: "騷出你獨門嘅團隊長破局心法！可以撳下面靈感膠囊，或者用自己說話輸入：",
    anglePlaceholder: "例如：提議同客戶嘅公司秘書及稅務會計師開個30分鐘三方聯合審視，零推銷壓力...",
    promptDrawerShow: "🔍 查看 / 自由修改完整提示詞原文",
    promptDrawerHide: "▴ 收起提示詞編輯器",
    pillarsActiveLabel: "已激活 R.C.T.F.C.",
    strictly3Badge: "嚴格限定 3 頁",
    generateBtn: "⚡ 生成嚴格 3 頁高管戰前簡報",
    regenerateBtn: "🔄 更新並重新生成 3 頁簡報",
    genStages: [
      "1/3 · 緊係度構建第 1 頁：客戶資產快照同 4 大 KPI 指標卡...",
      "2/3 · 緊係度測算第 2 頁：流動性缺口量化對比柱狀圖...",
      "3/3 · 緊係度生成第 3 頁：定制傳承策略矩陣表同演講備註...",
    ],
    generatingImgText: "🎨 緊係度繪製 16:9 高管簡報配圖...",
    finishingImgBeforeSubmit: "🎨 緊係度附上簡報配圖並鎖定最終成績...",
    slideTabPrefix: "第 ",
    slideTabSuffix: " 頁",
    slideShortLabels: ["全景與KPI", "流動性缺口圖", "策略矩陣表"],
    slidesCountBadge: "嚴格 3 頁已就緒 ✓",
    compareToggleOn: "🔀 對比標竿簡報：開啟",
    compareToggleOff: "🔀 與標竿簡報並排對比",
    downloadPptxBtn: "⬇ 下載 .pptx",
    yourSlideLabel: "📊 你生成嘅簡報頁",
    targetSlideLabel: "🎯 標竿參考簡報頁",
    speakerNotesLabel: "🎙️ 演講者備註",
    qualityChecksHeader: "✅ 提交前 3 頁簡報質量自檢",
    checkLabels: {
      slides3: "嚴格限定 3 頁結構",
      clientFacts: "精準引用客戶財務數據",
      visuals: "KPI卡 + 缺口柱狀圖 + 策略表",
      personalTouch: "融入個人策略切入點",
      compliance: "BNM 與信託/Hibah合規護欄",
    },
    backToPromptBtn: "✏️ 返回調整策略或切入點",
    finalSubmitBtn: "🏆 最終確認並提交 3 頁簡報至主賽場",
    finalSubmittingText: "⚖️ AI 評審團緊係度為你份 3 頁簡報同個人策略評分...",
    oneTimeNotice:
      "🔒 定稿前可以無限次調整並重新生成 3 頁簡報；撳咗「最終確認並提交」之後成績即刻鎖定上榜！",
    jobDoneBadge: "✅ 挑戰 2 已完成 — 已鎖定上榜",
    jobDoneTitle: "你份 3 頁高管戰前提案簡報已同步上主賽場大屏",
    arenaScoreLabel: "主賽場得分",
    deckScoreLabel: "簡報專業評級",
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
    promptUsedLabel: "📝 你最終提交嘅提示詞同個人策略切入點",
  },
  ms: {
    badge: "🧠 CABARAN 2 • STUDIO DEK 3-SLAID R.C.T.F.C.",
    title: "Studio Dek Pra-Pembentangan 3-Slaid",
    subtitle:
      "Setiap pemimpin menerima kes pelanggan HNW unik. Aktifkan 5 tiang R.C.T.F.C., tambah Sudut Strategik Peribadi anda, dan jana dek tepat 3-slaid bertaraf bilik lembaga.",
    step1Tab: "1️⃣ Bina Strategi & Sudut Peribadi",
    step2Tab: "2️⃣ Semak Dek 3-Slaid & Hantar",
    targetBtn: "🎯 Dek Penanda Aras",
    hideTargetBtn: "✕ Tutup Penanda Aras",
    browseCasesBtn: "📂 14 Kes",
    switchCaseBtn: "🎲 Tukar Kes",
    casePickerTitle: "Pilih Senario Pelanggan HNW (14 Arketaip • 56 Kerusi Unik)",
    targetGoalBanner: "🎯 DEK PENANDA ARAS 3-SLAID (UNTUK PELANGGAN ANDA)",
    assignedCaseLabel: "PROFIL PELANGGAN HNW ANDA",
    moreCaseBtn: "Butiran Penuh ▾",
    lessCaseBtn: "Ringkas ▴",
    pillarsHeader: "1. Aktifkan 5 Tiang Prompt R.C.T.F.C.",
    pillarsSub: "Ketik setiap tiang atau aktifkan kesemua 5 tiang dan fokus pada sudut peribadi anda di bawah.",
    insertAllBtn: "✨ Aktifkan Kesemua 5 Tiang",
    weakPromptBtn: "🧪 Cuba Prompt Lemah 1-Baris",
    toneHeader: "2. Pilih Gaya Pembentangan",
    tones: [
      {
        id: "boardroom",
        label: "🏛️ Bilik Lembaga Pejabat Keluarga",
        clause: "[Gaya Pembentangan]: Nada eksekutif Pejabat Keluarga yang berwibawa — fokus kunci kira-kira tanpa tekanan jualan.",
      },
      {
        id: "empathy",
        label: "❤️ Empati Pengasas & Keluarga",
        clause: "[Gaya Pembentangan]: Nada empati hangat — lindungi maruah keluarga, kesinambungan perniagaan dan pendidikan anak.",
      },
      {
        id: "cfo",
        label: "📊 Ketepatan Analitik CFO",
        clause: "[Gaya Pembentangan]: Nada analitik CFO — bandingkan kos ~2% setahun lwn risiko jualan terpaksa diskaun 40%.",
      },
    ],
    angleHeader: "3. 💡 Tambah Sudut Strategik Peribadi Anda",
    angleSub: "Apakah sentuhan peribadi anda untuk memikat pelanggan ini? Ketik cadangan atau tulis sendiri:",
    anglePlaceholder: "cth: Cadangkan semakan 30 minit bersama setiausaha syarikat & akauntan cukai tanpa tekanan jualan...",
    promptDrawerShow: "🔍 Lihat / Sunting Prompt Penuh",
    promptDrawerHide: "▴ Tutup Penyunting Prompt",
    pillarsActiveLabel: "Tiang R.C.T.F.C. Aktif",
    strictly3Badge: "TEPAT 3 SLAID",
    generateBtn: "⚡ Jana Dek Eksekutif 3-Slaid",
    regenerateBtn: "🔄 Jana Semula Dek 3-Slaid",
    genStages: [
      "1/3 · Membina Slaid 1 Gambaran Pelanggan & 4 Kad KPI...",
      "2/3 · Memodelkan Slaid 2 Carta Palang Jurang Kecairan...",
      "3/3 · Menyusun Slaid 3 Jadual Strategi & Nota Pembentang...",
    ],
    generatingImgText: "🎨 Menjana visual slaid eksekutif 16:9...",
    finishingImgBeforeSubmit: "🎨 Melampirkan visual slaid sebelum mengunci penghantaran...",
    slideTabPrefix: "Slaid ",
    slideTabSuffix: "",
    slideShortLabels: ["Ringkasan KPI", "Carta Jurang", "Jadual Strategi"],
    slidesCountBadge: "3 Slaid Sedia ✓",
    compareToggleOn: "🔀 Banding Penanda Aras: AKTIF",
    compareToggleOff: "🔀 Banding dengan Penanda Aras",
    downloadPptxBtn: "⬇ Muat Turun .pptx",
    yourSlideLabel: "📊 SLAID JANAAN ANDA",
    targetSlideLabel: "🎯 SLAID PENANDA ARAS",
    speakerNotesLabel: "🎙️ Nota Pembentang",
    qualityChecksHeader: "✅ Senarai Semak Kualiti Dek 3-Slaid",
    checkLabels: {
      slides3: "Tepat 3 Slaid",
      clientFacts: "Angka Kunci Kira-kira Pelanggan",
      visuals: "KPI + Carta Jurang + Jadual",
      personalTouch: "Sudut Strategik Peribadi",
      compliance: "Pematuhan BNM & Amanah/Hibah",
    },
    backToPromptBtn: "✏️ Kemas Kini Strategi / Sudut",
    finalSubmitBtn: "🏆 Muktamadkan & Hantar Dek 3-Slaid ke Arena",
    finalSubmittingText: "⚖️ Hakim AI Menilai Dek 3-Slaid & Sudut Strategik Anda...",
    oneTimeNotice:
      "🔒 Jana semula seberapa kerap semasa draf. Klik Muktamadkan & Hantar akan mengunci markah ke Papan Pendahulu.",
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
    promptUsedLabel: "📝 Prompt R.C.T.F.C. & Sudut Strategik Anda",
  },
  ta: {
    badge: "🧠 சவால் 2 • R.C.T.F.C. 3-ஸ்லைடு ஸ்டுடியோ",
    title: "நிர்வாக முன்-முன்மொழிவு 3-ஸ்லைடு ஸ்டுடியோ",
    subtitle:
      "ஒவ்வொரு தலைவருக்கும் தனித்துவமான HNW வாடிக்கையாளர் வழக்கு வழங்கப்படுகிறது. 5 R.C.T.F.C. தூண்கள் மற்றும் உங்கள் தனிப்பட்ட உத்தியை இணைத்து சரியாக 3-ஸ்லைடு விளக்கக்காட்சியை உருவாக்குங்கள்.",
    step1Tab: "1️⃣ உத்தி & தனிப்பட்ட கோணம்",
    step2Tab: "2️⃣ 3-ஸ்லைடு ஆய்வு & சமர்ப்பிப்பு",
    targetBtn: "🎯 மாதிரி டெக்",
    hideTargetBtn: "✕ மாதிரியை மறை",
    browseCasesBtn: "📂 14 வழக்குகள்",
    switchCaseBtn: "🎲 வழக்கை மாற்று",
    casePickerTitle: "HNW வாடிக்கையாளர் வழக்கைத் தேர்ந்தெடுக்கவும் (14 வகைகள் • 56 இடங்கள்)",
    targetGoalBanner: "🎯 3-ஸ்லைடு மாதிரி விளக்கக்காட்சி",
    assignedCaseLabel: "உங்கள் HNW வாடிக்கையாளர் விவரம்",
    moreCaseBtn: "முழு விவரம் ▾",
    lessCaseBtn: "சுருக்கு ▴",
    pillarsHeader: "1. 5 R.C.T.F.C. தூண்களைச் செயல்படுத்தவும்",
    pillarsSub: "ஒவ்வொரு தூணையும் தட்டவும் அல்லது அனைத்தையும் இயக்கி கீழே உங்கள் தனிப்பட்ட உத்தியைச் சேர்க்கவும்.",
    insertAllBtn: "✨ அனைத்து 5 தூண்களையும் இயக்கு",
    weakPromptBtn: "🧪 எளிய 1-வரி ப்ராம்ப்ட் சோதனை",
    toneHeader: "2. விளக்கக்காட்சி பாணியைத் தேர்ந்தெடுக்கவும்",
    tones: [
      {
        id: "boardroom",
        label: "🏛️ குடும்ப அலுவலக போர்டுரூம்",
        clause: "[Presentation Style]: Authoritative Family-Office boardroom tone — crisp balance-sheet framing, zero sales pressure.",
      },
      {
        id: "empathy",
        label: "❤️ நிறுவனர் & குடும்ப அக்கறை",
        clause: "[Presentation Style]: Warm founder empathy — protect family harmony, spouse security, and children's education.",
      },
      {
        id: "cfo",
        label: "📊 CFO நிதித் துல்லியம்",
        clause: "[Presentation Style]: Analytical CFO tone — compare ~2% annual cost vs 40% forced asset fire-sale loss.",
      },
    ],
    angleHeader: "3. 💡 உங்கள் தனிப்பட்ட உத்தி / ஆலோசனை அணுகுமுறை",
    angleSub: "உங்கள் தனித்துவமான ஆலோசனைக் கோணத்தைத் தட்டவும் அல்லது எழுதவும்:",
    anglePlaceholder: "எ.கா: கணக்காளர் மற்றும் நிறுவனச் செயலாளருடன் 30 நிமிட கூட்டு ஆய்வுக்கு அழைப்பு...",
    promptDrawerShow: "🔍 முழு ப்ராம்ப்ட்டை பார்க்க / திருத்த",
    promptDrawerHide: "▴ ப்ராம்ப்ட் பெட்டியை மூடு",
    pillarsActiveLabel: "R.C.T.F.C. தூண்கள்",
    strictly3Badge: "சரியாக 3 ஸ்லைடுகள்",
    generateBtn: "⚡ 3-ஸ்லைடு விளக்கக்காட்சியை உருவாக்கு",
    regenerateBtn: "🔄 மீண்டும் 3-ஸ்லைடு உருவாக்கு",
    genStages: [
      "1/3 · ஸ்லைடு 1 வாடிக்கையாளர் சுருக்கம் & KPI அட்டைகள்...",
      "2/3 · ஸ்லைடு 2 பணப்புழக்க இடைவெளி வரைபடம்...",
      "3/3 · ஸ்லைடு 3 தீர்வு அட்டவணை & பேச்சாளர் குறிப்புகள்...",
    ],
    generatingImgText: "🎨 16:9 ஸ்லைடு காட்சிகளை உருவாக்குகிறது...",
    finishingImgBeforeSubmit: "🎨 ஸ்லைடு படங்களை இணைத்து இறுதி செய்கிறது...",
    slideTabPrefix: "ஸ்லைடு ",
    slideTabSuffix: "",
    slideShortLabels: ["KPI சுருக்கம்", "இடைவெளி வரைபடம்", "தீர்வு அட்டவணை"],
    slidesCountBadge: "3 ஸ்லைடுகள் தயார் ✓",
    compareToggleOn: "🔀 மாதிரியுடன் ஒப்பீடு: இயக்கத்தில்",
    compareToggleOff: "🔀 மாதிரியுடன் ஒப்பிடுக",
    downloadPptxBtn: "⬇ .pptx பதிவிறக்கம்",
    yourSlideLabel: "📊 உங்கள் ஸ்லைடு",
    targetSlideLabel: "🎯 மாதிரி ஸ்லைடு",
    speakerNotesLabel: "🎙️ பேச்சாளர் குறிப்புகள்",
    qualityChecksHeader: "✅ சமர்ப்பிக்கும் முன் 3-ஸ்லைடு தர சரிபார்ப்பு",
    checkLabels: {
      slides3: "சரியாக 3 ஸ்லைடுகள்",
      clientFacts: "வாடிக்கையாளர் நிதி எண்கள்",
      visuals: "KPI + வரைபடம் + அட்டவணை",
      personalTouch: "தனிப்பட்ட உத்தி கோணம்",
      compliance: "BNM & அறக்கட்டளை/Hibah விதிகள்",
    },
    backToPromptBtn: "✏️ உத்தியை மாற்றி உருவாக்கு",
    finalSubmitBtn: "🏆 3-ஸ்லைடு டெக்கை அரங்கிற்கு சமர்ப்பிக்கவும்",
    finalSubmittingText: "⚖️ AI நடுவர் உங்கள் 3-ஸ்லைடு டெக்கை மதிப்பிடுகிறார்...",
    oneTimeNotice:
      "🔒 வரைவு செய்யும்போது பலமுறை உருவாக்கலாம். இறுதி சமர்ப்பிப்பை அழுத்தியவுடன் மதிப்பெண் பூட்டப்படும்.",
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
    promptUsedLabel: "📝 நீங்கள் சமர்ப்பித்த ப்ராம்ப்ட் & தனிப்பட்ட உத்தி",
  },
};

const PILLAR_META = {
  role: { icon: "🎭", code: "R" },
  context: { icon: "📋", code: "C" },
  task: { icon: "🎯", code: "T" },
  format: { icon: "📐", code: "F" },
  constraints: { icon: "⚖️", code: "C" },
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
  const out = {};
  (guideSteps || []).forEach((g) => {
    const k = g.key;
    const tmpl = String(g.template || "").trim();
    if (tmpl && txt.includes(tmpl.slice(0, Math.min(26, tmpl.length)))) {
      out[k] = "done";
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
        <div className="bg-slate-900 text-white px-4 py-3 sm:px-5 sm:py-3.5 flex items-start justify-between gap-3">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2 mb-1">
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
        <div className={`${compact ? "p-3 space-y-2.5" : "p-4 sm:p-5 space-y-3.5"}`}>
          {/* KPI Metric Cards */}
          {Array.isArray(slide.kpis) && slide.kpis.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
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
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 space-y-2">
              <div className="flex items-center justify-between text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                <span>Quantified Exposure Stress-Test</span>
                {slide.chart.unit && <span>{slide.chart.unit}</span>}
              </div>
              <div className="flex items-end gap-4 h-28 pt-5 px-3 border-b-2 border-slate-300">
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
              <div className="flex gap-4 px-3">
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

          {/* Executive Strategy Matrix Table */}
          {slide.table && Array.isArray(slide.table.headers) && slide.table.headers.length > 0 && (
            <div className="overflow-x-auto border border-slate-200 rounded-xl shadow-sm">
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

          {/* Bullets + Optional 16:9 Slide Artwork */}
          {(Array.isArray(slide.bullets) && slide.bullets.length > 0) ||
          slide.image ||
          (generatingImages && slide.image_prompt) ? (
            <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
              <div
                className={
                  slide.image || (generatingImages && slide.image_prompt)
                    ? "md:col-span-8 space-y-1.5"
                    : "md:col-span-12 space-y-1.5"
                }
              >
                {Array.isArray(slide.bullets) && slide.bullets.length > 0 && (
                  <ul className="space-y-1.5 text-xs text-slate-800 leading-snug">
                    {slide.bullets.slice(0, 5).map((b, bi) => (
                      <li key={bi} className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#ed1b2e] mt-1.5 shrink-0" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              {slide.image ? (
                <div className="md:col-span-4 relative group">
                  <img
                    src={slide.image}
                    alt={slide.title || "Executive Slide Visual"}
                    title="Tap to zoom"
                    data-zoomable="true"
                    className="w-full aspect-video object-cover rounded-xl border border-slate-200 shadow-sm cursor-zoom-in"
                  />
                  <span className="pointer-events-none absolute bottom-1.5 right-1.5 px-2 py-0.5 rounded-full bg-slate-900/70 text-white text-[9px] font-bold opacity-85 group-hover:opacity-100">
                    🔍 Zoom
                  </span>
                </div>
              ) : generatingImages && slide.image_prompt ? (
                <div className="md:col-span-4">
                  <div className="w-full aspect-video rounded-xl border border-dashed border-amber-300 bg-amber-50/60 flex items-center justify-center text-[11px] font-bold text-amber-800 animate-pulse px-2 text-center">
                    🎨 Rendering 16:9 Slide Visual...
                  </div>
                </div>
              ) : null}
            </div>
          ) : null}

          {/* Executive Callout Strip */}
          {slide.callout && (
            <div className="bg-gradient-to-r from-red-50 to-amber-50/50 border-l-4 border-l-[#ed1b2e] px-3.5 py-2 rounded-r-xl text-xs font-bold text-slate-900">
              {slide.callout}
            </div>
          )}
        </div>
      </div>

      {/* Presenter Speaker Notes Footer */}
      {slide.speaker_notes && (
        <div className="bg-slate-50 border-t border-slate-200 px-4 py-2 text-[11px] text-slate-600 leading-snug">
          <span className="font-extrabold text-slate-800 mr-1.5">
            {speakerNotesLabel || "🎙️ Presenter Notes"}:
          </span>
          {slide.speaker_notes}
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
  const storageKey = `prumda_c2_v3_${agentId || "anon"}`;

  // Restore saved draft from localStorage if available
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

  const [challengeData, setChallengeData] = useState(null);
  const [loadingChallenge, setLoadingChallenge] = useState(true);
  const [seatOverride, setSeatOverride] = useState(
    typeof initDraft.seatIndex === "number" ? initDraft.seatIndex : null
  );
  const [showCasePicker, setShowCasePicker] = useState(false);
  const [showFullCase, setShowFullCase] = useState(false);
  const [showTargetModal, setShowTargetModal] = useState(false);
  const [targetSlideIdx, setTargetSlideIdx] = useState(0);

  // Step & Prompt Builder State
  const [activeStep, setActiveStep] = useState(initDraft.deck ? "2" : "1");
  const [selectedToneId, setSelectedToneId] = useState(initDraft.selectedToneId || "boardroom");
  const [personalAngle, setPersonalAngle] = useState(initDraft.personalAngle || "");
  const [promptText, setPromptText] = useState(initDraft.promptText || "");
  const [manualPromptEdited, setManualPromptEdited] = useState(Boolean(initDraft.manualPromptEdited));
  const [activePillarsMap, setActivePillarsMap] = useState(
    initDraft.activePillarsMap || {
      role: true,
      context: true,
      task: true,
      format: true,
      constraints: true,
    }
  );
  const [showPromptDrawer, setShowPromptDrawer] = useState(false);

  // Generated 3-Slide Deck State
  const [deck, setDeck] = useState(initDraft.deck || null);
  const [deckSignature, setDeckSignature] = useState(initDraft.deckSignature || "");
  const [slideIdx, setSlideIdx] = useState(0);
  const [compareMode, setCompareMode] = useState(false);
  const [generatingDeck, setGeneratingDeck] = useState(false);
  const [genStageIdx, setGenStageIdx] = useState(0);
  const [generatingImages, setGeneratingImages] = useState(false);
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

  // Persist draft in localStorage
  useEffect(() => {
    if (lockedSubmission) return;
    try {
      localStorage.setItem(
        storageKey,
        JSON.stringify({
          seatIndex: challengeData?.seatIndex ?? seatOverride,
          selectedToneId,
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
    challengeData?.seatIndex,
    seatOverride,
    selectedToneId,
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

  // Assemble clean R.C.T.F.C. + Tone + Personal Strategic Angle prompt
  const buildAssembledPrompt = (guideList, pMap, toneId, angleStr, simpleFallback) => {
    const anyActive = Object.values(pMap || {}).some(Boolean);
    if (!anyActive) {
      return simpleFallback || "";
    }
    const parts = [];
    (guideList || []).forEach((g) => {
      if (pMap[g.key] && g.template) {
        parts.push(g.template.trim());
      }
    });
    const toneObj = (ui.tones || []).find((x) => x.id === toneId);
    if (toneObj && toneObj.clause) {
      parts.push(toneObj.clause);
    }
    if (angleStr && angleStr.trim().length > 0) {
      parts.push(`[Personal Strategic Angle]: ${angleStr.trim()}`);
    }
    return parts.join("\n\n");
  };

  // Load localized, per-seat Challenge 2 scenario (/api/challenge)
  const loadScenarioSeat = (explicitSeat = null, resetDeckOnSwitch = false) => {
    setLoadingChallenge(true);
    const params = new URLSearchParams({
      market: "MY",
      lang: normLang,
    });
    if (agentId) params.set("id", agentId);
    if (explicitSeat !== null && explicitSeat !== undefined) {
      params.set("seat", String(explicitSeat));
      params.set("persist", "1");
    }
    fetch(`/api/challenge?${params.toString()}`, { cache: "no-store" })
      .then((r) => r.json())
      .then((data) => {
        setChallengeData(data);
        setLoadingChallenge(false);
        const gList = data.guide || [];
        if (resetDeckOnSwitch) {
          const allOn = { role: true, context: true, task: true, format: true, constraints: true };
          const defaultHint = (data.angleHints && data.angleHints[0]) || "";
          setActivePillarsMap(allOn);
          setPersonalAngle(defaultHint);
          setManualPromptEdited(false);
          setDeck(null);
          setDeckSignature("");
          setActiveStep("1");
          setPromptText(
            buildAssembledPrompt(gList, allOn, selectedToneId, defaultHint, data.simple_prompt)
          );
        } else {
          setPersonalAngle((prevAngle) => {
            const nextAngle =
              prevAngle && prevAngle.trim().length > 0
                ? prevAngle
                : (data.angleHints && data.angleHints[0]) || "";
            if (!manualPromptEdited) {
              setPromptText(
                buildAssembledPrompt(
                  gList,
                  activePillarsMap,
                  selectedToneId,
                  nextAngle,
                  data.simple_prompt
                )
              );
            }
            return nextAngle;
          });
        }
      })
      .catch(() => setLoadingChallenge(false));
  };

  useEffect(() => {
    loadScenarioSeat(seatOverride, false);
  }, [normLang, agentId]);

  // Re-assemble prompt automatically when structured controls change (unless manually overridden)
  const syncStructuredPrompt = (nextMap, nextTone, nextAngle) => {
    if (!challengeData) return;
    setManualPromptEdited(false);
    const built = buildAssembledPrompt(
      challengeData.guide || [],
      nextMap,
      nextTone,
      nextAngle,
      challengeData.simple_prompt
    );
    setPromptText(built);
  };

  const handleTogglePillar = (key) => {
    const nextMap = { ...activePillarsMap, [key]: !activePillarsMap[key] };
    setActivePillarsMap(nextMap);
    syncStructuredPrompt(nextMap, selectedToneId, personalAngle);
    setLineage((prev) => [
      ...prev,
      { t: Math.round((Date.now() - startRef.current) / 1000), e: "toggle", k: key },
    ]);
  };

  const handleActivateAllPillars = () => {
    const allOn = { role: true, context: true, task: true, format: true, constraints: true };
    const nextAngle =
      personalAngle || (challengeData?.angleHints && challengeData.angleHints[0]) || "";
    setActivePillarsMap(allOn);
    setPersonalAngle(nextAngle);
    syncStructuredPrompt(allOn, selectedToneId, nextAngle);
  };

  const handleTryWeakPrompt = () => {
    const allOff = { role: false, context: false, task: false, format: false, constraints: false };
    setActivePillarsMap(allOff);
    setPersonalAngle("");
    setManualPromptEdited(false);
    setPromptText(challengeData?.simple_prompt || "Create a presentation for my client about insurance.");
  };

  const handleSelectTone = (toneId) => {
    setSelectedToneId(toneId);
    syncStructuredPrompt(activePillarsMap, toneId, personalAngle);
  };

  const handleAngleChange = (val) => {
    setPersonalAngle(val);
    if (!manualPromptEdited) {
      syncStructuredPrompt(activePillarsMap, selectedToneId, val);
    } else {
      // Update or append [Personal Strategic Angle] line inside custom prompt
      setPromptText((prev) => {
        const cleaned = String(prev || "")
          .replace(/\n*\[Personal Strategic Angle\]:[^\n]*/gi, "")
          .trim();
        return val && val.trim()
          ? `${cleaned}\n\n[Personal Strategic Angle]: ${val.trim()}`
          : cleaned;
      });
    }
  };

  const handleSwitchSeat = (targetSeat) => {
    const total = challengeData?.totalUniqueSeats || 56;
    const nextS =
      typeof targetSeat === "number"
        ? targetSeat % total
        : ((challengeData?.seatIndex || 0) + 1) % total;
    setSeatOverride(nextS);
    setShowCasePicker(false);
    loadScenarioSeat(nextS, true);
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

  // Generate Strictly 3-Slide Deck (/api/deck/generate + /api/deck/images)
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
      setActiveStep("2");
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

      // Generate 16:9 boardroom visuals in background & store promise so Submit can await if still running
      const slidesWithPrompts = clampedSlides
        .map((s, idx) => ({ idx, prompt: s.image_prompt }))
        .filter((x) => Boolean(x.prompt))
        .slice(0, 2);

      if (slidesWithPrompts.length > 0) {
        setGeneratingImages(true);
        const imgJob = fetch("/api/deck/images", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ prompts: slidesWithPrompts.map((x) => x.prompt) }),
        })
          .then((ir) => ir.json())
          .then((imgData) => {
            if (imgData && Array.isArray(imgData.images)) {
              setDeck((cur) => {
                if (!cur || !Array.isArray(cur.slides)) return cur;
                const clonedSlides = cur.slides.slice(0, 3).map((sl) => ({ ...sl }));
                slidesWithPrompts.forEach((item, ii) => {
                  if (imgData.images[ii] && clonedSlides[item.idx]) {
                    clonedSlides[item.idx].image = imgData.images[ii];
                  }
                });
                const updated = { ...cur, slides: clonedSlides };
                latestDeckRef.current = updated;
                return updated;
              });
            }
          })
          .catch(() => {})
          .finally(() => {
            setGeneratingImages(false);
            imagePromiseRef.current = null;
          });
        imagePromiseRef.current = imgJob;
      }
    } catch (err) {
      setGenError(err.message || "Could not generate 3-slide deck.");
    } finally {
      setGeneratingDeck(false);
    }
  };

  // Export .pptx
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

  // Dynamic Scenario-Aware Pre-Submit Readiness Checks
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
    const hasChart = slides.some((s) => s.chart && Array.isArray(s.chart.series) && s.chart.series.length >= 2);
    const hasTable = slides.some((s) => s.table && Array.isArray(s.table.rows) && s.table.rows.length >= 2);
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

  const preChecks = computePreSubmitChecks(deck);

  // ONE-TIME FINAL SUBMIT
  const handleFinalSubmitOnce = async () => {
    if (!deck || submittingFinal || lockedSubmission) return;
    setSubmittingFinal(true);

    // Briefly await in-flight slide visual generation (up to 5.5s) so Big Screen card has slide artwork
    if (imagePromiseRef.current) {
      setWaitingImagesForSubmit(true);
      await Promise.race([
        imagePromiseRef.current,
        new Promise((resolve) => setTimeout(resolve, 5500)),
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
      .map((s, i) => `${ui.slideTabPrefix}${i + 1}${ui.slideTabSuffix || ""}: ${s.title}`)
      .join(" • ");

    const submissionPayload = {
      challenge: "2",
      seatIndex: challengeData?.seatIndex ?? 0,
      scenarioId: scen?.id || "clinic_founder_takaful",
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
        <div className="flex flex-wrap items-center justify-between gap-3 bg-emerald-50 border border-emerald-200 rounded-2xl p-4">
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

          <div className="flex items-center gap-3 bg-white border-2 border-emerald-400 rounded-2xl px-4 py-2.5 shadow-sm shrink-0">
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

        {criteriaEntries.length > 0 && (
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-3.5 space-y-2">
            <div className="text-xs font-extrabold uppercase tracking-wider text-slate-700">
              {ui.rubricHeader}
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {criteriaEntries.map(([dim, val]) => (
                <div
                  key={dim}
                  className="bg-white border border-slate-200 rounded-xl px-2.5 py-2 flex items-center justify-between gap-2"
                >
                  <span className="text-[11px] font-bold text-slate-700 truncate">{dim}</span>
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
                    {ui.slideTabPrefix}
                    {idx + 1}
                    {ui.slideTabSuffix} · {(ui.slideShortLabels || [])[idx] || ""}
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
              speakerNotesLabel={ui.speakerNotesLabel}
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
     RENDER 2: ACTIVE CHALLENGE 2 EXECUTIVE 3-SLIDE STUDIO
  ============================================================================ */
  const targetDeck = challengeData?.target || null;
  const targetSlides = (targetDeck?.slides || []).slice(0, 3);
  const currentSlides = (deck?.slides || []).slice(0, 3);
  const safeSlideIdx = Math.min(slideIdx, Math.max(0, currentSlides.length - 1));
  const safeTargetIdx = Math.min(targetSlideIdx, Math.max(0, targetSlides.length - 1));

  return (
    <div className="bg-white border border-slate-200 rounded-3xl p-4 sm:p-6 space-y-4 shadow-sm">
      {/* Top Studio Header + Strictly 3 Slides Pill + Benchmark Toggle */}
      <div className="flex flex-wrap items-start justify-between gap-3 border-b border-slate-200 pb-3.5">
        <div className="space-y-1 max-w-2xl">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-red-50 text-[#ed1b2e] border border-red-200 text-[11px] font-extrabold">
              {ui.badge}
            </span>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-slate-900 text-amber-300 text-[10px] font-extrabold tracking-wider">
              📐 {ui.strictly3Badge}
            </span>
          </div>
          <h2 className="text-lg sm:text-xl font-extrabold text-slate-900">{ui.title}</h2>
          <p className="text-xs text-slate-600 leading-relaxed">{ui.subtitle}</p>
        </div>

        <button
          type="button"
          onClick={() => setShowTargetModal((v) => !v)}
          className={`px-3.5 py-2 rounded-xl text-xs font-extrabold border-2 transition-all shrink-0 ${
            showTargetModal
              ? "bg-slate-900 text-white border-slate-900"
              : "bg-white hover:bg-red-50 text-[#ed1b2e] border-[#ed1b2e]"
          }`}
        >
          {showTargetModal ? ui.hideTargetBtn : ui.targetBtn}
        </button>
      </div>

      {/* Collapsible 3-Slide Benchmark Reference Deck */}
      {showTargetModal && targetSlides.length > 0 && (
        <div className="bg-slate-900 text-white rounded-2xl p-3.5 sm:p-4 space-y-3 shadow-inner">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="text-xs font-extrabold uppercase tracking-wider text-amber-300">
              {ui.targetGoalBanner}
            </div>
            <div className="flex items-center gap-1.5">
              {targetSlides.map((_, ti) => (
                <button
                  key={ti}
                  type="button"
                  onClick={() => setTargetSlideIdx(ti)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-extrabold transition-all ${
                    safeTargetIdx === ti
                      ? "bg-[#ed1b2e] text-white"
                      : "bg-slate-800 hover:bg-slate-700 text-slate-200"
                  }`}
                >
                  {ui.slideTabPrefix}
                  {ti + 1}
                  {ui.slideTabSuffix}
                </button>
              ))}
            </div>
          </div>
          <ExecutiveSlideCard
            slide={targetSlides[safeTargetIdx]}
            slideIndex={safeTargetIdx}
            totalSlides={3}
            badgeLabel={ui.targetSlideLabel}
            speakerNotesLabel={ui.speakerNotesLabel}
            compact={true}
          />
        </div>
      )}

      {/* Assigned Unique Client Scenario Card + 14-Archetype Case Picker */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800 text-white rounded-2xl p-3.5 sm:p-4 space-y-3 shadow-md">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-[#ed1b2e] text-white text-[10px] font-extrabold uppercase tracking-wider">
              Case #{(challengeData?.seatIndex ?? 0) + 1}/{challengeData?.totalUniqueSeats || 56}
            </span>
            <span className="text-[11px] font-bold text-amber-300 uppercase tracking-wide">
              {scen?.icon || "🏛️"} {scen?.shortLabel || ui.assignedCaseLabel}
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-1.5">
            <button
              type="button"
              onClick={() => setShowCasePicker((v) => !v)}
              className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-600 text-[11px] font-extrabold text-white"
            >
              {ui.browseCasesBtn}
            </button>
            <button
              type="button"
              onClick={() => handleSwitchSeat()}
              className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-600 text-[11px] font-extrabold text-amber-300"
            >
              {ui.switchCaseBtn}
            </button>
            <button
              type="button"
              onClick={() => setShowFullCase((v) => !v)}
              className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-[11px] font-bold text-slate-300"
            >
              {showFullCase ? ui.lessCaseBtn : ui.moreCaseBtn}
            </button>
          </div>
        </div>

        {/* 14-Archetype Case Picker Drawer */}
        {showCasePicker && Array.isArray(challengeData?.archetypes) && (
          <div className="bg-slate-800/95 border border-slate-700 rounded-xl p-3 space-y-2">
            <div className="text-[11px] font-extrabold text-amber-300">{ui.casePickerTitle}</div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 max-h-56 overflow-y-auto pr-1">
              {challengeData.archetypes.map((arch) => {
                const isCur = scen?.id === arch.id;
                return (
                  <button
                    key={arch.id}
                    type="button"
                    onClick={() => handleSwitchSeat(arch.seatIndex)}
                    className={`text-left p-2 rounded-lg border text-xs transition-all flex items-center justify-between gap-2 ${
                      isCur
                        ? "bg-[#ed1b2e]/20 border-[#ed1b2e] text-white"
                        : "bg-slate-900/70 hover:bg-slate-900 border-slate-700 text-slate-200"
                    }`}
                  >
                    <div className="min-w-0">
                      <div className="font-extrabold truncate">
                        {arch.icon} {arch.shortLabel}
                      </div>
                      <div className="text-[10px] text-slate-400 truncate">{arch.clientName}</div>
                    </div>
                    <span className="text-[10px] font-mono font-bold text-amber-300 shrink-0">
                      Gap {arch.gapAmount}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* 4 Crisp Balance-Sheet Snapshot Tiles */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
          {caseCards.map((c, ci) => (
            <div
              key={ci}
              className="bg-slate-800/90 border border-slate-700 rounded-xl px-3 py-2 flex items-start gap-2"
            >
              <span className="text-base leading-none mt-0.5">{c.icon}</span>
              <div className="min-w-0">
                <div className="text-[11px] font-extrabold text-amber-300 leading-tight">
                  {c.label}
                </div>
                <div className="text-[11px] text-slate-200 leading-snug mt-0.5">{c.value}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Expanded Case File Details */}
        {showFullCase && challengeData?.case_file && (
          <div className="bg-slate-950/70 border border-slate-700 rounded-xl p-3 grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] text-slate-200">
            {Object.entries(challengeData.case_file).map(([k, v]) => (
              <div key={k}>
                <span className="font-extrabold uppercase text-amber-400 mr-1">
                  {k.replace("_", " ")}:
                </span>
                <span>{v}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Two-Step Workflow Bar */}
      <div className="grid grid-cols-2 gap-2 bg-slate-100 p-1.5 rounded-2xl">
        <button
          type="button"
          onClick={() => setActiveStep("1")}
          className={`py-2.5 px-3 rounded-xl text-xs sm:text-sm font-extrabold transition-all ${
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
          className={`py-2.5 px-3 rounded-xl text-xs sm:text-sm font-extrabold transition-all flex items-center justify-center gap-1.5 ${
            activeStep === "2"
              ? "bg-[#ed1b2e] text-white shadow-sm"
              : deck
              ? "text-slate-800 hover:bg-white/60"
              : "text-slate-400 cursor-not-allowed"
          }`}
        >
          <span>{ui.step2Tab}</span>
          {deck && (
            <span className="px-1.5 py-0.5 rounded-full bg-emerald-500 text-white text-[10px]">
              3/3
            </span>
          )}
        </button>
      </div>

      {/* ========================================================================
         STEP 1: CLEAN VISUAL R.C.T.F.C. ARCHITECT + PERSONAL STRATEGIC ANGLE
      ======================================================================== */}
      {activeStep === "1" && (
        <div className="space-y-4">
          {/* 1. 5 Visual R.C.T.F.C. Toggle Cards */}
          <div className="space-y-2.5">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <div className="text-xs sm:text-sm font-extrabold text-slate-900">
                  {ui.pillarsHeader}
                </div>
                <div className="text-[11px] text-slate-500">{ui.pillarsSub}</div>
              </div>
              <div className="flex flex-wrap items-center gap-1.5">
                <button
                  type="button"
                  onClick={handleActivateAllPillars}
                  className="px-3 py-1.5 rounded-xl bg-[#ed1b2e] hover:bg-[#c81526] text-white text-xs font-extrabold shadow-sm"
                >
                  {ui.insertAllBtn}
                </button>
                <button
                  type="button"
                  onClick={handleTryWeakPrompt}
                  className="px-2.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-[11px] font-bold"
                >
                  {ui.weakPromptBtn}
                </button>
              </div>
            </div>

            {loadingChallenge ? (
              <div className="text-xs text-slate-500 py-4 text-center">Loading scenario...</div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-5 gap-2">
                {guideSteps.map((g) => {
                  const isDone = pillarStatuses[g.key] === "done";
                  const meta = PILLAR_META[g.key] || { icon: "•", code: "•" };
                  return (
                    <button
                      key={g.key}
                      type="button"
                      onClick={() => handleTogglePillar(g.key)}
                      className={`p-3 rounded-2xl border-2 text-left transition-all flex flex-col justify-between gap-1.5 ${
                        isDone
                          ? "bg-emerald-50/70 border-emerald-500 shadow-sm"
                          : "bg-slate-50 hover:bg-slate-100 border-slate-200 opacity-75"
                      }`}
                    >
                      <div className="flex items-center justify-between gap-1">
                        <span className="text-xs font-extrabold text-slate-900">
                          {meta.icon} {g.label}
                        </span>
                        <span
                          className={`w-5 h-5 rounded-full flex items-center justify-center text-[11px] font-extrabold shrink-0 ${
                            isDone
                              ? "bg-emerald-600 text-white"
                              : "bg-white border border-slate-300 text-slate-400"
                          }`}
                        >
                          {isDone ? "✓" : "+"}
                        </span>
                      </div>
                      <div className="text-[11px] text-slate-600 font-medium leading-snug line-clamp-2">
                        {g.summary || g.tip}
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* 2. Boardroom Presentation Tone Selector */}
          <div className="space-y-2">
            <div className="text-xs sm:text-sm font-extrabold text-slate-900">{ui.toneHeader}</div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {(ui.tones || []).map((tn) => {
                const active = selectedToneId === tn.id;
                return (
                  <button
                    key={tn.id}
                    type="button"
                    onClick={() => handleSelectTone(tn.id)}
                    className={`px-3 py-2.5 rounded-xl border-2 text-xs font-extrabold text-left transition-all ${
                      active
                        ? "bg-slate-900 text-white border-slate-900 shadow-sm"
                        : "bg-white hover:bg-slate-50 text-slate-700 border-slate-200"
                    }`}
                  >
                    {tn.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 3. Personal Strategic Angle / Relationship Hook */}
          <div className="bg-amber-50/80 border-2 border-amber-300 rounded-2xl p-3.5 space-y-2.5">
            <div>
              <div className="text-xs sm:text-sm font-extrabold text-slate-900">
                {ui.angleHeader}
              </div>
              <div className="text-[11px] text-slate-600">{ui.angleSub}</div>
            </div>

            {angleHints.length > 0 && (
              <div className="flex flex-wrap gap-1.5">
                {angleHints.map((hint, hi) => {
                  const selected = personalAngle.trim() === hint.trim();
                  return (
                    <button
                      key={hi}
                      type="button"
                      onClick={() => handleAngleChange(hint)}
                      className={`px-2.5 py-1.5 rounded-xl text-[11px] font-bold border text-left transition-all ${
                        selected
                          ? "bg-amber-600 text-white border-amber-700 shadow-sm"
                          : "bg-white hover:bg-amber-100 text-slate-800 border-amber-300"
                      }`}
                    >
                      ✨ {hint}
                    </button>
                  );
                })}
              </div>
            )}

            <textarea
              rows={2}
              value={personalAngle}
              onChange={(e) => handleAngleChange(e.target.value)}
              placeholder={ui.anglePlaceholder}
              className="w-full rounded-xl border border-amber-300 focus:border-[#ed1b2e] focus:outline-none p-2.5 text-xs sm:text-sm text-slate-900 bg-white leading-relaxed"
            />
          </div>

          {/* 4. Collapsible Master Prompt Inspector / Editor */}
          <div className="border border-slate-200 rounded-2xl overflow-hidden bg-slate-50">
            <button
              type="button"
              onClick={() => setShowPromptDrawer((v) => !v)}
              className="w-full px-3.5 py-2.5 flex items-center justify-between gap-2 text-xs font-extrabold text-slate-700 hover:bg-slate-100"
            >
              <span>{showPromptDrawer ? ui.promptDrawerHide : ui.promptDrawerShow}</span>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-extrabold">
                {ui.pillarsActiveLabel}: {activePillarCount}/5
              </span>
            </button>
            {showPromptDrawer && (
              <div className="p-3 border-t border-slate-200 bg-white">
                <textarea
                  rows={6}
                  value={promptText}
                  onChange={(e) => {
                    setManualPromptEdited(true);
                    setPromptText(e.target.value);
                  }}
                  className="w-full rounded-xl border border-slate-300 focus:border-[#ed1b2e] focus:outline-none p-3 text-xs text-slate-900 leading-relaxed font-mono"
                />
              </div>
            )}
          </div>

          {genError && (
            <div className="bg-red-50 border border-red-200 text-[#ed1b2e] text-xs font-bold px-3.5 py-2.5 rounded-xl">
              ⚠️ {genError}
            </div>
          )}

          {/* Animated 3-Stage Deck Build Progress or Primary Generate CTA */}
          {generatingDeck ? (
            <div className="bg-slate-900 text-white rounded-2xl p-4 space-y-2.5 shadow-md">
              <div className="flex items-center justify-between text-xs font-extrabold text-amber-300">
                <span>{(ui.genStages || [])[genStageIdx] || ui.genStages[0]}</span>
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
              className="w-full py-3.5 px-5 rounded-2xl bg-[#ed1b2e] hover:bg-[#c81526] disabled:opacity-50 text-white font-extrabold text-sm sm:text-base shadow-md transition-all"
            >
              {deck ? ui.regenerateBtn : ui.generateBtn}
            </button>
          )}
        </div>
      )}

      {/* ========================================================================
         STEP 2: 3-SLIDE KEYNOTE PREVIEW, CHECKLIST & ONE-TIME FINAL SUBMIT
      ======================================================================== */}
      {activeStep === "2" && deck && (
        <div className="space-y-4">
          {/* 3-Slide Keynote Filmstrip Switcher + Compare & Export Controls */}
          <div className="flex flex-wrap items-center justify-between gap-2 bg-slate-100 border border-slate-200 rounded-2xl p-2.5">
            <div className="flex flex-wrap items-center gap-1.5">
              {currentSlides.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setSlideIdx(idx)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-extrabold transition-all ${
                    safeSlideIdx === idx
                      ? "bg-slate-900 text-white shadow-sm"
                      : "bg-white hover:bg-red-50 text-slate-700 border border-slate-200"
                  }`}
                >
                  {ui.slideTabPrefix}
                  {idx + 1}
                  {ui.slideTabSuffix} · {(ui.slideShortLabels || [])[idx] || ""}
                </button>
              ))}
              <span className="text-[11px] font-extrabold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-lg">
                {ui.slidesCountBadge}
              </span>
              {generatingImages && (
                <span className="text-[11px] font-bold text-amber-700 bg-amber-50 border border-amber-200 px-2.5 py-1 rounded-lg animate-pulse">
                  {ui.generatingImgText}
                </span>
              )}
            </div>

            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => setCompareMode((v) => !v)}
                className={`px-3 py-1.5 rounded-xl text-xs font-extrabold border transition-all ${
                  compareMode
                    ? "bg-slate-900 text-white border-slate-900"
                    : "bg-white hover:bg-slate-50 text-slate-700 border-slate-300"
                }`}
              >
                {compareMode ? ui.compareToggleOn : ui.compareToggleOff}
              </button>
              <button
                type="button"
                onClick={() => handleDownloadPptx(deck)}
                className="px-3 py-1.5 rounded-xl bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 text-xs font-extrabold"
              >
                {ui.downloadPptxBtn}
              </button>
            </div>
          </div>

          {/* Slide Canvas (Single or Side-by-Side vs Benchmark) */}
          {compareMode && targetSlides.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
              <ExecutiveSlideCard
                slide={currentSlides[safeSlideIdx]}
                slideIndex={safeSlideIdx}
                totalSlides={3}
                badgeLabel={ui.yourSlideLabel}
                speakerNotesLabel={ui.speakerNotesLabel}
                generatingImages={generatingImages}
              />
              <ExecutiveSlideCard
                slide={targetSlides[Math.min(safeSlideIdx, targetSlides.length - 1)]}
                slideIndex={Math.min(safeSlideIdx, targetSlides.length - 1)}
                totalSlides={3}
                badgeLabel={ui.targetSlideLabel}
                speakerNotesLabel={ui.speakerNotesLabel}
              />
            </div>
          ) : (
            <ExecutiveSlideCard
              slide={currentSlides[safeSlideIdx]}
              slideIndex={safeSlideIdx}
              totalSlides={3}
              badgeLabel={ui.yourSlideLabel}
              speakerNotesLabel={ui.speakerNotesLabel}
              generatingImages={generatingImages}
            />
          )}

          {/* Pre-Submit 5-Point Readiness Bar */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-3.5 space-y-2">
            <div className="text-xs font-extrabold uppercase tracking-wider text-slate-700">
              {ui.qualityChecksHeader}
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
              {Object.entries(ui.checkLabels).map(([ckKey, ckLabel]) => {
                const ok = preChecks[ckKey];
                return (
                  <div
                    key={ckKey}
                    className={`px-2.5 py-2 rounded-xl border text-[11px] font-bold flex items-center gap-1.5 ${
                      ok
                        ? "bg-emerald-50 border-emerald-300 text-emerald-900"
                        : "bg-white border-slate-200 text-slate-500"
                    }`}
                  >
                    <span className="font-extrabold">{ok ? "✅" : "⚪"}</span>
                    <span className="leading-tight">{ckLabel}</span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-xl px-3.5 py-2.5 text-xs text-amber-900 font-medium">
            {ui.oneTimeNotice}
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5">
            <button
              type="button"
              onClick={() => setActiveStep("1")}
              disabled={submittingFinal}
              className="px-4 py-3 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs sm:text-sm font-extrabold transition-all"
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
