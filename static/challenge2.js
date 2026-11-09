/* ============================================================================
   CHALLENGE 2 MODULE (14:20 - 14:35 | 15 Mins)
   "Executive Pre-Pitch Deck Prompt Duel (R.C.T.F.C. Framework)"
   100% Native React Integration — Adaptive across Phone, iPad & Laptop
   Full 5-Language Native Localization (EN, ZH-CN, YUE, MS, TA)
   Strict One-Time Final Submission -> Feeds Main Arena Score & Locks ("Job Done!")
============================================================================ */

const C2_UI_I18N = {
  en: {
    badge: "🧠 CHALLENGE 2 • R.C.T.F.C. PROMPT DUEL",
    title: "Executive Pre-Pitch Deck Studio",
    subtitle:
      "Combine the 5 R.C.T.F.C. Pillars + Agency Leader Wealth & Empathy Boosters to generate a 3-slide HNW Pre-Pitch Deck for Datin Sharifah Aleya. Edit your prompt freely, iterate, then submit once when finalized.",
    step1Tab: "1️⃣ Craft R.C.T.F.C. Prompt",
    step2Tab: "2️⃣ Review 3-Slide Deck & Submit",
    targetBtn: "🎯 View Target Deck",
    hideTargetBtn: "✕ Hide Target Deck",
    targetGoalBanner: "🎯 TARGET 3-SLIDE BENCHMARK DECK (YOUR GOAL)",
    caseHeader: "📋 Client Scenario: Datin Sharifah Aleya (HNW Founder, 52)",
    moreCaseBtn: "Full Case Details ▾",
    lessCaseBtn: "Compact View ▴",
    caseCards: [
      { icon: "👤", label: "Client & Clinic Group", value: "Founder & MD, 6 Specialist Clinics (Klang Valley)" },
      { icon: "💰", label: "Net Worth ≈ RM 28M", value: "RM 19M (68%) Clinic Shares • RM 6M Property • RM 3M Liquid" },
      { icon: "🏦", label: "Liabilities & Cover", value: "RM 4.5M Loan (Personal Guarantee) • RM 1M 2009 Life Policy" },
      { icon: "👨‍👩‍👧‍👦", label: "Family & Education", value: "Husband (RM 30k/mo dividends) • 2 Kids UK/Melb (RM 450k/yr)" },
      { icon: "📉", label: "Estate Liquidity Gap", value: "RM 10.5M Needed vs RM 4.0M Liquid = RM 6.5M Shortfall" },
      { icon: "🕌", label: "Shariah & BNM Rules", value: "Family Takaful + Hibah • Fact-Find • PDS & 15-Day Free-Look" },
    ],
    pillarsHeader: "5-Pillar R.C.T.F.C. Prompt Builder (Tap any pillar or insert all 5 & edit below)",
    insertPillarBtn: "+ Insert into Prompt",
    pillarIncluded: "✓ Included in Prompt",
    insertAllBtn: "✨ Insert All 5 Pillars",
    resetPromptBtn: "↺ Reset Starter Prompt",
    leaderBoostersHeader: "💡 Agency Leader Wealth, Empathy & Creative Boosters (Tap to combine into prompt):",
    addAllBoostersBtn: "✨ Add All 3 Leader Boosters",
    leaderBoosters: [
      {
        label: "❤️ Founder Empathy & Family Dignity",
        snippet:
          "[Empathy & Family Continuity]: Frame with warm founder empathy — protect Datin Aleya's 6 clinics from forced fire-sale so Dr Hakim stays supported and Aisyah (UK medicine) & Imran (Melbourne) finish university uninterrupted.",
      },
      {
        label: "🛡️ Hibah & Creditor Ring-Fencing",
        snippet:
          "[Wealth Planning & Hibah Strategy]: Show how Family Takaful + Hibah nomination injects immediate Shariah-compliant cash outside estate freeze to settle the RM 4.5M personal-guarantee loan and preserve Faraid harmony.",
      },
      {
        label: "🤝 Accountant Co-Advisory Close",
        snippet:
          "[Creative Relationship Close]: Propose a collaborative 30-minute joint review with Datin's company secretary & tax accountant rather than a product push.",
      },
    ],
    promptLabel: "✏️ Your Master Prompt to Gemini (Combine pillars & boosters above, then edit freely in your own words):",
    promptPlaceholder: "Write or assemble your 5-pillar R.C.T.F.C. + Wealth Planning prompt here...",
    pillarsActiveLabel: "R.C.T.F.C. Pillars Active",
    generateBtn: "⚡ Generate 3-Slide Pre-Pitch Deck",
    regenerateBtn: "🔄 Update & Regenerate 3-Slide Deck",
    generatingText: "✨ Gemini 2.5 Flash is building your 3-slide executive deck...",
    generatingImgText: "🎨 Generating slide visuals...",
    slideTabPrefix: "Slide ",
    slideTabSuffix: "",
    slidesCountBadge: "Slides ✓",
    compareToggleOn: "🔀 Side-by-Side Target Compare: ON",
    compareToggleOff: "🔀 Compare with Target Deck",
    downloadPptxBtn: "⬇ Download .pptx",
    yourSlideLabel: "📊 YOUR GENERATED SLIDE",
    targetSlideLabel: "🎯 TARGET BENCHMARK SLIDE",
    speakerNotesLabel: "🎙️ Presenter Speaker Notes",
    qualityChecksHeader: "✅ Pre-Submit Deck Quality Readiness",
    checkLabels: {
      slides3: "3 Structured Slides",
      clientFacts: "Client Facts (RM 28M / 4.5M / 6.5M)",
      visuals: "KPIs, Gap Chart & Strategy Table",
      notes: "Speaker Notes Included",
      compliance: "BNM & Shariah Guardrails",
    },
    backToPromptBtn: "✏️ Edit Prompt & Regenerate",
    finalSubmitBtn: "🏆 Finalize & Submit Deck to Arena (Submit Once)",
    finalSubmittingText: "⚖️ AI Judge Scoring & Locking Your Final Submission...",
    oneTimeNotice:
      "🔒 You can edit your prompt and regenerate your deck as many times as you wish while drafting. Once you click Finalize & Submit, your score is locked and sent to the Main Arena Leaderboard.",
    jobDoneBadge: "✅ CHALLENGE 2 COMPLETE — JOB DONE! (LOCKED)",
    jobDoneTitle: "Your 3-Slide Pre-Pitch Deck is Finalized & Scored in the Main Arena",
    arenaScoreLabel: "Main Arena Score",
    deckScoreLabel: "AI Judge Deck Rating",
    rubricHeader: "🏅 6-Dimension AI Judge Breakdown",
    rubricDims: [
      "Structure & Completeness",
      "Client Personalisation",
      "Insight & Quantification",
      "Solution Fit",
      "Objection Readiness",
      "Compliance & Fair Dealing",
    ],
    viewMainScoreBtn: "🏆 View Main Arena Scoreboard",
    proceedC3Btn: "🚀 Proceed to Challenge 3 →",
    waitingC3Text: "⏳ Score fed to Main Arena! Waiting for Presenter to unlock Challenge 3...",
    promptUsedLabel: "📝 Your Final Submitted R.C.T.F.C. Prompt",
  },
  "zh-CN": {
    badge: "🧠 挑战 2 • R.C.T.F.C. 提示词对决",
    title: "高管战前提案简报工作室 (3-Slide Deck Studio)",
    subtitle:
      "结合 R.C.T.F.C. 五维提示词框架与团队长「财富规划 + 客户共情」加分项，为高净值客户 Datin Sharifah Aleya 生成 3 页战前提案简报。您可自由编辑提示词并多次生成，定稿后最终提交一次。",
    step1Tab: "1️⃣ 构建 R.C.T.F.C. 提示词",
    step2Tab: "2️⃣ 预览 3 页简报并最终提交",
    targetBtn: "🎯 查看目标参考简报",
    hideTargetBtn: "✕ 收起目标简报",
    targetGoalBanner: "🎯 目标 3 页参考简报（您的对标目标）",
    caseHeader: "📋 客户背景档案：Datin Sharifah Aleya（52岁，专科诊所集团创始人）",
    moreCaseBtn: "查看完整档案 ▾",
    lessCaseBtn: "收起详情 ▴",
    caseCards: [
      { icon: "👤", label: "客户与企业", value: "巴生谷 6 家专科诊所创始人兼董事总经理 (52岁)" },
      { icon: "💰", label: "净资产 ≈ RM 28M", value: "诊所股权 RM 19M (68%) • 房产 RM 6M • 流动资金 RM 3M" },
      { icon: "🏦", label: "负债与现有保单", value: "RM 4.5M 诊所扩建贷款(个人担保) • 仅 RM 1M 旧寿险" },
      { icon: "👨‍👩‍👧‍👦", label: "家庭与留学负担", value: "丈夫靠每月 RM 30k 分红 • 2名子女英国/墨尔本留学(RM 450k/年)" },
      { icon: "📉", label: "遗产流动性缺口", value: "需 RM 10.5M 流动资金 vs 现有 RM 4.0M = RM 6.5M 缺口" },
      { icon: "🕌", label: "伊斯兰方案与 BNM 合规", value: "Family Takaful + Hibah • 先做 Fact-Find • PDS 及15天犹豫期" },
    ],
    pillarsHeader: "R.C.T.F.C. 五维提示词构建器（点击任意维度或一键全选 5 个维度后自由修改）",
    insertPillarBtn: "+ 插入到提示词",
    pillarIncluded: "✓ 已包含此维度",
    insertAllBtn: "✨ 一键插入全部 5 个维度",
    resetPromptBtn: "↺ 重置初始提示词",
    leaderBoostersHeader: "💡 团队长「财富规划 · 客户共情 · 创意关系」加分项（点击可叠加进提示词）：",
    addAllBoostersBtn: "✨ 一键叠加全部 3 大领袖加分项",
    leaderBoosters: [
      {
        label: "❤️ 创办人共情与守护家庭尊严",
        snippet:
          "[客户共情与家族传承]：以温暖共情切入——守护 Datin Aleya 辛苦创立的 6 家诊所免遭低价贱卖，确保丈夫 Dr Hakim 维持每月生活开销，且英国学医长女 Aisyah 与墨尔本幼子 Imran 学业不受任何影响。",
      },
      {
        label: "🛡️ Hibah 赠与及债务隔离策略",
        snippet:
          "[财富规划与 Hibah 隔离]：清晰展示 Family Takaful 搭配 Hibah 指定受益人如何在遗产冻结期外即刻注入免税流动现金，清偿 RM 4.5M 个人担保贷款并兼顾 Faraid 家族和谐。",
      },
      {
        label: "🤝 联合会计师与公司秘书协同面谈",
        snippet:
          "[顾问式成交邀约]：不硬推销产品，建议与 Datin 的公司秘书及税务会计师进行 30 分钟三方协同财务审视。",
      },
    ],
    promptLabel: "✏️ 您发送给 Gemini 的完整提示词（可一键组合上方全部要点，并用自己的话自由修改）：",
    promptPlaceholder: "在此输入或组合您的 R.C.T.F.C. 与财富规划提示词...",
    pillarsActiveLabel: "已激活 R.C.T.F.C. 维度",
    generateBtn: "⚡ 生成 3 页高管战前简报",
    regenerateBtn: "🔄 更新并重新生成 3 页简报",
    generatingText: "✨ Gemini 2.5 Flash 正在为您生成 3 页高管战前简报...",
    generatingImgText: "🎨 正在生成简报配图...",
    slideTabPrefix: "第 ",
    slideTabSuffix: " 页",
    slidesCountBadge: "页简报 ✓",
    compareToggleOn: "🔀 对比目标简报：已开启",
    compareToggleOff: "🔀 与目标参考简报并排对比",
    downloadPptxBtn: "⬇ 下载 .pptx",
    yourSlideLabel: "📊 您生成的简报页",
    targetSlideLabel: "🎯 目标基准简报页",
    speakerNotesLabel: "🎙️ 演讲者备注 (Speaker Notes)",
    qualityChecksHeader: "✅ 提交前简报质量自检",
    checkLabels: {
      slides3: "完整 3 页结构",
      clientFacts: "包含核心客户数据 (RM 28M / 4.5M / 6.5M)",
      visuals: "包含 KPI 卡、缺口柱状图与策略表",
      notes: "包含演讲者备注",
      compliance: "包含 BNM 与 Shariah 合规说明",
    },
    backToPromptBtn: "✏️ 返回修改提示词并重新生成",
    finalSubmitBtn: "🏆 最终确认并提交简报至主赛场（仅限提交一次）",
    finalSubmittingText: "⚖️ AI 评审团正在评分并锁定您的最终成绩...",
    oneTimeNotice:
      "🔒 定稿前您可以多次修改提示词并重新生成简报。一旦点击「最终确认并提交」，成绩将立即锁定并同步至主赛场总积分榜！",
    jobDoneBadge: "✅ 挑战 2 已完成 — 任务达成！(已锁定)",
    jobDoneTitle: "您的 3 页高管战前提案简报已定稿并计入主赛场总成绩",
    arenaScoreLabel: "主赛场得分",
    deckScoreLabel: "AI 评审简报评级",
    rubricHeader: "🏅 6 维 AI 专业评审得分详情",
    rubricDims: [
      "结构与完整度",
      "客户共情与定制化",
      "财富洞察与量化测算",
      "方案契合度",
      "异议应对准备",
      "合规与公平待客",
    ],
    viewMainScoreBtn: "🏆 查看主赛场总积分榜与成绩单",
    proceedC3Btn: "🚀 进入挑战 3 →",
    waitingC3Text: "⏳ 分数已计入主赛场总榜！请等待主持人解锁挑战 3...",
    promptUsedLabel: "📝 您最终提交的 R.C.T.F.C. 提示词",
  },
  yue: {
    badge: "🧠 挑戰 2 • R.C.T.F.C. 提示詞對決",
    title: "高管戰前提案簡報工作室 (3-Slide Deck Studio)",
    subtitle:
      "結合 R.C.T.F.C. 五維提示詞框架同團隊長「財富規劃 + 人情味共情」加分項，為高淨值客戶 Datin Sharifah Aleya 生成 3 頁戰前提案簡報。你可以自由改提示詞同多次生成，定稿後最終提交一次。",
    step1Tab: "1️⃣ 構建 R.C.T.F.C. 提示詞",
    step2Tab: "2️⃣ 預覽 3 頁簡報並最終提交",
    targetBtn: "🎯 查看目標參考簡報",
    hideTargetBtn: "✕ 收起目標簡報",
    targetGoalBanner: "🎯 目標 3 頁參考簡報（你嘅對標目標）",
    caseHeader: "📋 客戶背景檔案：Datin Sharifah Aleya（52歲，專科診所集團創辦人）",
    moreCaseBtn: "查看完整檔案 ▾",
    lessCaseBtn: "收起詳情 ▴",
    caseCards: [
      { icon: "👤", label: "客戶與企業", value: "巴生谷 6 間專科診所創辦人兼董事總經理 (52歲)" },
      { icon: "💰", label: "淨資產 ≈ RM 28M", value: "診所股權 RM 19M (68%) • 物業 RM 6M • 流動資金 RM 3M" },
      { icon: "🏦", label: "負債與現有保單", value: "RM 4.5M 診所擴建貸款(個人擔保) • 僅 RM 1M 舊人壽" },
      { icon: "👨‍👩‍👧‍👦", label: "家庭與留學負擔", value: "丈夫靠每月 RM 30k 分紅 • 2名仔女英國/墨爾本讀書(RM 450k/年)" },
      { icon: "📉", label: "遺產流動性缺口", value: "需 RM 10.5M 流動資金 vs 現有 RM 4.0M = RM 6.5M 缺口" },
      { icon: "🕌", label: "伊斯蘭方案與 BNM 合規", value: "Family Takaful + Hibah • 先做 Fact-Find • PDS 及15日冷靜期" },
    ],
    pillarsHeader: "R.C.T.F.C. 五維提示詞構建器（撳任何維度或者一鍵全選 5 個維度再自由執靚）",
    insertPillarBtn: "+ 插入到提示詞",
    pillarIncluded: "✓ 已包含呢個維度",
    insertAllBtn: "✨ 一鍵插入全部 5 個維度",
    resetPromptBtn: "↺ 重置初始提示詞",
    leaderBoostersHeader: "💡 團隊長「財富規劃 · 客戶人情味 · 關係成交」加分項（撳一下加落提示詞）：",
    addAllBoostersBtn: "✨ 一鍵加晒 3 大領袖加分項",
    leaderBoosters: [
      {
        label: "❤️ 創辦人共情與守護屋企尊嚴",
        snippet:
          "[客戶人情味與家族傳承]：用窩心共情角度切入——保護 Datin Aleya 一手創立嘅 6 間診所唔使被迫賤賣，確保老公 Dr Hakim 維持生活品質，同埋英國讀醫大女 Aisyah、墨爾本細仔 Imran 安心完成大學。",
      },
      {
        label: "🛡️ Hibah 贈與同債務隔離策略",
        snippet:
          "[財富規劃與 Hibah 隔離]：清晰展示 Family Takaful 配合 Hibah 指定受益人點樣喺遺產凍結之外即刻注入流動現金，清還 RM 4.5M 個人擔保貸款兼顧及 Faraid 屋企和睦。",
      },
      {
        label: "🤝 約埋會計師同公司秘書一齊傾",
        snippet:
          "[專業顧問式約見]：唔做 Hard Sell，建議同 Datin 嘅公司秘書及稅務會計師開個 30 分鐘三方財富規劃會議。",
      },
    ],
    promptLabel: "✏️ 你發送俾 Gemini 嘅完整提示詞（可一鍵組合上面全部重點，再用自己說話自由改）：",
    promptPlaceholder: "喺度輸入或者組合你嘅 R.C.T.F.C. 同財富規劃提示詞...",
    pillarsActiveLabel: "已激活 R.C.T.F.C. 維度",
    generateBtn: "⚡ 生成 3 頁高管戰前簡報",
    regenerateBtn: "🔄 更新並重新生成 3 頁簡報",
    generatingText: "✨ Gemini 2.5 Flash 正在為你生成 3 頁高管戰前簡報...",
    generatingImgText: "🎨 正在生成簡報配圖...",
    slideTabPrefix: "第 ",
    slideTabSuffix: " 頁",
    slidesCountBadge: "頁簡報 ✓",
    compareToggleOn: "🔀 對比目標簡報：已開啟",
    compareToggleOff: "🔀 與目標參考簡報並排對比",
    downloadPptxBtn: "⬇ 下載 .pptx",
    yourSlideLabel: "📊 你生成嘅簡報頁",
    targetSlideLabel: "🎯 目標基準簡報頁",
    speakerNotesLabel: "🎙️ 演講者備註 (Speaker Notes)",
    qualityChecksHeader: "✅ 提交前簡報質量自檢",
    checkLabels: {
      slides3: "完整 3 頁結構",
      clientFacts: "包含核心客戶數據 (RM 28M / 4.5M / 6.5M)",
      visuals: "包含 KPI 卡、缺口柱狀圖與策略表",
      notes: "包含演講者備註",
      compliance: "包含 BNM 與 Shariah 合規說明",
    },
    backToPromptBtn: "✏️ 返回修改提示詞並重新生成",
    finalSubmitBtn: "🏆 最終確認並提交簡報至主賽場（只限提交一次）",
    finalSubmittingText: "⚖️ AI 評審團正在評分並鎖定你嘅最終成績...",
    oneTimeNotice:
      "🔒 定稿前你可以多次修改提示詞並重新生成簡報。一旦撳咗「最終確認並提交」，成績會即刻鎖定並同步去主賽場總積分榜！",
    jobDoneBadge: "✅ 挑戰 2 已完成 — 任務達成！(已鎖定)",
    jobDoneTitle: "你嘅 3 頁高管戰前提案簡報已定稿並計入主賽場總成績",
    arenaScoreLabel: "主賽場得分",
    deckScoreLabel: "AI 評審簡報評級",
    rubricHeader: "🏅 6 維 AI 專業評審得分詳情",
    rubricDims: [
      "結構同完整度",
      "客戶人情味同個人化",
      "財富洞察同量化測算",
      "方案契合度",
      "異議應對準備",
      "合規同公平待客",
    ],
    viewMainScoreBtn: "🏆 查看主賽場總積分榜與成績單",
    proceedC3Btn: "🚀 進入挑戰 3 →",
    waitingC3Text: "⏳ 分數已計入主賽場總榜！請等待主持人解鎖挑戰 3...",
    promptUsedLabel: "📝 你最終提交嘅 R.C.T.F.C. 提示詞",
  },
  ms: {
    badge: "🧠 CABARAN 2 • DUEL PROMPT R.C.T.F.C.",
    title: "Studio Dek Pra-Pembentangan Eksekutif",
    subtitle:
      "Gabungkan 5 Tiang R.C.T.F.C. + Penggalak Perancangan Kekayaan & Empati Pemimpin Agensi untuk menjana Dek Pra-Pembentangan 3-Slaid bagi Datin Sharifah Aleya. Sunting bebas, dan hantar sekali apabila muktamad.",
    step1Tab: "1️⃣ Bina Prompt R.C.T.F.C.",
    step2Tab: "2️⃣ Semak Dek 3-Slaid & Hantar",
    targetBtn: "🎯 Lihat Dek Sasaran",
    hideTargetBtn: "✕ Tutup Dek Sasaran",
    targetGoalBanner: "🎯 DEK PENANDA ARAS 3-SLAID SASARAN (MATLAMAT ANDA)",
    caseHeader: "📋 Senario Pelanggan: Datin Sharifah Aleya (Pengasas HNW, 52)",
    moreCaseBtn: "Butiran Kes Penuh ▾",
    lessCaseBtn: "Paparan Ringkas ▴",
    caseCards: [
      { icon: "👤", label: "Pelanggan & Klinik", value: "Pengasas & MD, 6 Klinik Pakar di Lembah Klang (52 thn)" },
      { icon: "💰", label: "Nilai Bersih ≈ RM 28J", value: "Saham Klinik RM 19J (68%) • Hartanah RM 6J • Tunai RM 3J" },
      { icon: "🏦", label: "Liabiliti & Polisi", value: "Pinjaman RM 4.5J (Jaminan Peribadi) • Polisi Hayat RM 1J" },
      { icon: "👨‍👩‍👧‍👦", label: "Keluarga & Pendidikan", value: "Suami (dividen RM 30k/bln) • 2 Anak UK/Melb (RM 450k/thn)" },
      { icon: "📉", label: "Jurang Kecairan Pusaka", value: "Perlu RM 10.5J lwn Aset Cair RM 4.0J = Jurang RM 6.5J" },
      { icon: "🕌", label: "Syariah & Peraturan BNM", value: "Takaful Keluarga + Hibah • Fact-Find • PDS & 15 Hari Free-Look" },
    ],
    pillarsHeader: "Pembina Prompt 5-Tiang R.C.T.F.C. (Ketik mana-mana tiang atau masukkan kesemua 5 & sunting)",
    insertPillarBtn: "+ Masukkan ke Prompt",
    pillarIncluded: "✓ Sudah Dimasukkan",
    insertAllBtn: "✨ Masukkan Kesemua 5 Tiang",
    resetPromptBtn: "↺ Tetap Semula Prompt Asal",
    leaderBoostersHeader: "💡 Penggalak Perancangan Kekayaan, Empati & Kreativiti Pemimpin Agensi (Ketik untuk gabung):",
    addAllBoostersBtn: "✨ Tambah Kesemua 3 Penggalak Pemimpin",
    leaderBoosters: [
      {
        label: "❤️ Empati Pengasas & Maruah Keluarga",
        snippet:
          "[Empati & Kesinambungan Keluarga]: Gunakan nada empati yang mesra — lindungi 6 klinik Datin Aleya daripada jualan terpaksa supaya Dr Hakim terus terpelihara dan pengajian Aisyah (UK) & Imran (Melbourne) tidak terjejas.",
      },
      {
        label: "🛡️ Strategi Hibah & Perlindungan Pemiutang",
        snippet:
          "[Perancangan Kekayaan & Hibah]: Tunjukkan bagaimana Takaful Keluarga + penamaan Hibah menyuntik tunai segera patuh Syariah di luar pembekuan pusaka untuk menyelesaikan pinjaman jaminan peribadi RM 4.5J serta menjaga keharmonian Faraid.",
      },
      {
        label: "🤝 Sesi Bersama Akauntan & Setiausaha Syarikat",
        snippet:
          "[Penutup Perundingan Kolaboratif]: Cadangkan sesi semakan bersama selama 30 minit dengan setiausaha syarikat & akauntan cukai Datin tanpa tekanan jualan.",
      },
    ],
    promptLabel: "✏️ Prompt Utama Anda kepada Gemini (Gabungkan tiang & penggalak di atas, dan sunting bebas):",
    promptPlaceholder: "Tulis atau gabungkan prompt 5-tiang R.C.T.F.C. & perancangan kekayaan anda di sini...",
    pillarsActiveLabel: "Tiang R.C.T.F.C. Aktif",
    generateBtn: "⚡ Jana Dek Pra-Pembentangan 3-Slaid",
    regenerateBtn: "🔄 Kemas Kini & Jana Semula Dek 3-Slaid",
    generatingText: "✨ Gemini 2.5 Flash sedang membina dek eksekutif 3-slaid anda...",
    generatingImgText: "🎨 Menjana ilustrasi slaid...",
    slideTabPrefix: "Slaid ",
    slideTabSuffix: "",
    slidesCountBadge: "Slaid ✓",
    compareToggleOn: "🔀 Banding dengan Dek Sasaran: AKTIF",
    compareToggleOff: "🔀 Banding Sebelah-menyebelah dengan Sasaran",
    downloadPptxBtn: "⬇ Muat Turun .pptx",
    yourSlideLabel: "📊 SLAID JANAAN ANDA",
    targetSlideLabel: "🎯 SLAID PENANDA ARAS SASARAN",
    speakerNotesLabel: "🎙️ Nota Pembentang (Speaker Notes)",
    qualityChecksHeader: "✅ Senarai Semak Kualiti Sebelum Hantar",
    checkLabels: {
      slides3: "3 Slaid Berstruktur",
      clientFacts: "Fakta Pelanggan (RM 28J / 4.5J / 6.5J)",
      visuals: "Kad KPI, Carta Jurang & Jadual Strategi",
      notes: "Nota Pembentang Disertakan",
      compliance: "Garis Panduan Pematuhan BNM & Syariah",
    },
    backToPromptBtn: "✏️ Edit Prompt & Jana Semula",
    finalSubmitBtn: "🏆 Muktamadkan & Hantar Dek ke Arena (Hantar Sekali)",
    finalSubmittingText: "⚖️ Hakim AI Sedang Menilai & Mengunci Markah Akhir Anda...",
    oneTimeNotice:
      "🔒 Anda boleh menyunting prompt dan menjana semula dek seberapa banyak kali semasa draf. Sebaik sahaja anda klik Muktamadkan & Hantar, markah anda dikunci dan dihantar ke Papan Pendahulu Utama Arena.",
    jobDoneBadge: "✅ CABARAN 2 SELESAI — TUGAS SELESAI! (DIKUNCI)",
    jobDoneTitle: "Dek Pra-Pembentangan 3-Slaid Anda Telah Dimuktamadkan & Dinilai",
    arenaScoreLabel: "Markah Arena Utama",
    deckScoreLabel: "Penilaian Dek Hakim AI",
    rubricHeader: "🏅 Pecahan Rubrik 6-Dimensi Hakim AI",
    rubricDims: [
      "Struktur & Kesempurnaan",
      "Empati & Pemperibadian Pelanggan",
      "Wawasan Kekayaan & Kuantifikasi",
      "Kesesuaian Penyelesaian",
      "Kesediaan Menangani Bantahan",
      "Pematuhan & Layanan Adil",
    ],
    viewMainScoreBtn: "🏆 Lihat Kad Skor & Kedudukan Utama",
    proceedC3Btn: "🚀 Teruskan ke Cabaran 3 →",
    waitingC3Text: "⏳ Markah dimasukkan ke Arena Utama! Menunggu Penyampai membuka Cabaran 3...",
    promptUsedLabel: "📝 Prompt R.C.T.F.C. Muktamad Anda",
  },
  ta: {
    badge: "🧠 சவால் 2 • R.C.T.F.C. ப்ராம்ப்ட் போட்டி",
    title: "நிர்வாக முன்-முன்மொழிவு ஸ்லைடு ஸ்டுடியோ",
    subtitle:
      "Datin Sharifah Aleya-க்கான 3-ஸ்லைடு முன்-முன்மொழிவு விளக்கக்காட்சியை உருவாக்க 5-தூண் R.C.T.F.C. கட்டமைப்பு மற்றும் செல்வத் திட்டமிடல் & அக்கறை ஊக்கிகளை இணைத்து சுதந்திரமாகத் திருத்துங்கள்.",
    step1Tab: "1️⃣ R.C.T.F.C. ப்ராம்ப்ட் உருவாக்கம்",
    step2Tab: "2️⃣ 3-ஸ்லைடு ஆய்வு & இறுதி சமர்ப்பிப்பு",
    targetBtn: "🎯 இலக்கு ஸ்லைடுகளைப் பார்க்க",
    hideTargetBtn: "✕ இலக்கு ஸ்லைடுகளை மறை",
    targetGoalBanner: "🎯 இலக்கு 3-ஸ்லைடு மாதிரி விளக்கக்காட்சி (உங்கள் இலக்கு)",
    caseHeader: "📋 வாடிக்கையாளர் விவரம்: Datin Sharifah Aleya (நிறுவனர், 52)",
    moreCaseBtn: "முழு விவரங்கள் ▾",
    lessCaseBtn: "சுருக்கமான காட்சி ▴",
    caseCards: [
      { icon: "👤", label: "வாடிக்கையாளர் & நிறுவனம்", value: "நிறுவனர் & MD, 6 சிறப்பு கிளினிக்குகள் (கிள்ளான் பள்ளத்தாக்கு)" },
      { icon: "💰", label: "நிகர சொத்து ≈ RM 28M", value: "கிளினிக் பங்குகள் RM 19M (68%) • சொத்து RM 6M • ரொக்கம் RM 3M" },
      { icon: "🏦", label: "கடன் & காப்பீடு", value: "RM 4.5M கிளினிக் கடன் (தனிப்பட்ட உத்தரவாதம்) • RM 1M ஆயுள் பாலிசி" },
      { icon: "👨‍👩‍👧‍👦", label: "குடும்பம் & கல்வி", value: "கணவர் (RM 30k/மாதம்) • 2 பிள்ளைகள் UK/Melb கல்வி (RM 450k/ஆண்டு)" },
      { icon: "📉", label: "பணப்புழக்க இடைவெளி", value: "தேவை RM 10.5M vs திரவ சொத்து RM 4.0M = RM 6.5M பற்றாக்குறை" },
      { icon: "🕌", label: "ஷரியா & BNM விதிகள்", value: "Family Takaful + Hibah • Fact-Find • PDS & 15-நாள் Free-Look" },
    ],
    pillarsHeader: "5-தூண் R.C.T.F.C. ப்ராம்ப்ட் கட்டமைப்பாளர் (எந்த தூணையும் தட்டிச் சேர்க்கவும் அல்லது திருத்தவும்)",
    insertPillarBtn: "+ ப்ராம்ப்ட்டில் சேர்க்கவும்",
    pillarIncluded: "✓ ப்ராம்ப்ட்டில் உள்ளது",
    insertAllBtn: "✨ அனைத்து 5 தூண்களையும் சேர்",
    resetPromptBtn: "↺ தொடக்க ப்ராம்ப்ட்டுக்கு மீட்டமை",
    leaderBoostersHeader: "💡 முகமைத் தலைவர் செல்வத் திட்டமிடல் & வாடிக்கையாளர் அக்கறை ஊக்கிகள் (சேர்க்க அழுத்தவும்):",
    addAllBoostersBtn: "✨ அனைத்து 3 தலைவர் ஊக்கிகளையும் சேர்",
    leaderBoosters: [
      {
        label: "❤️ நிறுவனர் அக்கறை & குடும்ப கௌரவம்",
        snippet:
          "[வாடிக்கையாளர் அக்கறை & குடும்ப பாதுகாப்பு]: Datin Aleya-வின் 6 கிளினிக்குகள் அவசர விற்பனைக்குச் செல்லாமல் பாதுகாத்து, கணவர் Dr Hakim மற்றும் பிள்ளைகள் Aisyah (UK), Imran (Melbourne) கல்வி தடையின்றித் தொடர அக்கறையுடன் அணுகவும்.",
      },
      {
        label: "🛡️ Hibah & கடன் பாதுகாப்பு உத்தி",
        snippet:
          "[செல்வத் திட்டமிடல் & Hibah]: Family Takaful மற்றும் Hibah மூலம் சொத்து முடக்கத்திற்கு வெளியே உடனடி ரொக்கத்தை வழங்கி RM 4.5M கடனை அடைத்து Faraid குடும்ப ஒற்றுமையைப் பாதுகாப்பதை விளக்கவும்.",
      },
      {
        label: "🤝 கணக்காளர் & நிறுவனச் செயலாளருடன் கூட்டு ஆலோசனை",
        snippet:
          "[ஆலோசனை அணுகுமுறை]: விற்பனை அழுத்தமின்றி Datin-ன் கணக்காளர் மற்றும் நிறுவனச் செயலாளருடன் 30 நிமிட கூட்டு ஆலோசனைக் கூட்டத்தை முன்மொழியவும்.",
      },
    ],
    promptLabel: "✏️ Gemini-க்கான உங்கள் முழு ப்ராம்ப்ட் (மேலே உள்ளவற்றை இணைத்து உங்கள் சொந்த நடையில் திருத்தவும்):",
    promptPlaceholder: "உங்கள் 5-தூண் R.C.T.F.C. மற்றும் செல்வத் திட்டமிடல் ப்ராம்ப்ட்டை இங்கே எழுதவும்...",
    pillarsActiveLabel: "செயலில் உள்ள R.C.T.F.C. தூண்கள்",
    generateBtn: "⚡ 3-ஸ்லைடு விளக்கக்காட்சியை உருவாக்கு",
    regenerateBtn: "🔄 புதுப்பித்து மீண்டும் 3-ஸ்லைடு உருவாக்கு",
    generatingText: "✨ Gemini 2.5 Flash உங்கள் 3-ஸ்லைடு விளக்கக்காட்சியை உருவாக்குகிறது...",
    generatingImgText: "🎨 ஸ்லைடு படங்களை உருவாக்குகிறது...",
    slideTabPrefix: "ஸ்லைடு ",
    slideTabSuffix: "",
    slidesCountBadge: "ஸ்லைடுகள் ✓",
    compareToggleOn: "🔀 இலக்குடன் ஒப்பீடு: இயக்கத்தில்",
    compareToggleOff: "🔀 இலக்கு ஸ்லைடுடன் ஒப்பிடுக",
    downloadPptxBtn: "⬇ .pptx பதிவிறக்கம்",
    yourSlideLabel: "📊 நீங்கள் உருவாக்கிய ஸ்லைடு",
    targetSlideLabel: "🎯 இலக்கு மாதிரி ஸ்லைடு",
    speakerNotesLabel: "🎙️ பேச்சாளர் குறிப்புகள் (Speaker Notes)",
    qualityChecksHeader: "✅ சமர்ப்பிக்கும் முன் தர சரிபார்ப்பு",
    checkLabels: {
      slides3: "3 ஸ்லைடுகள் கட்டமைப்பு",
      clientFacts: "வாடிக்கையாளர் எண்கள் (RM 28M / 4.5M / 6.5M)",
      visuals: "KPI அட்டைகள், வரைபடம் & அட்டவணை",
      notes: "பேச்சாளர் குறிப்புகள் உள்ளன",
      compliance: "BNM & ஷரியா விதிமுறைகள்",
    },
    backToPromptBtn: "✏️ ப்ராம்ப்ட்டை மாற்றி மீண்டும் உருவாக்கு",
    finalSubmitBtn: "🏆 இறுதி செய்து அரங்கிற்கு சமர்ப்பிக்கவும் (ஒருமுறை மட்டும்)",
    finalSubmittingText: "⚖️ AI நடுவர் மதிப்பிட்டு உங்கள் இறுதி மதிப்பெண்ணை உறுதி செய்கிறார்...",
    oneTimeNotice:
      "🔒 வரைவு செய்யும்போது எத்தனை முறை வேண்டுமானாலும் ப்ராம்ப்ட்டை மாற்றி ஸ்லைடுகளை உருவாக்கலாம். இறுதி சமர்ப்பிப்பை அழுத்தியவுடன் உங்கள் மதிப்பெண் பிரதான தரவரிசைப் பட்டியலில் சேர்க்கப்பட்டு பூட்டப்படும்.",
    jobDoneBadge: "✅ சவால் 2 முடிந்தது — பணி நிறைவு! (பூட்டப்பட்டது)",
    jobDoneTitle: "உங்கள் 3-ஸ்லைடு விளக்கக்காட்சி இறுதி செய்யப்பட்டு பிரதான அரங்கில் மதிப்பிடப்பட்டது",
    arenaScoreLabel: "பிரதான அரங்க மதிப்பெண்",
    deckScoreLabel: "AI நடுவர் ஸ்லைடு மதிப்பீடு",
    rubricHeader: "🏅 6-பரிமாண AI நடுவர் மதிப்பெண் விவரம்",
    rubricDims: [
      "கட்டமைப்பு & முழுமை",
      "வாடிக்கையாளர் அக்கறை & தனிப்பயனாக்கம்",
      "செல்வ நுண்ணறிவு & எண் மதிப்பீடு",
      "தீர்வுப் பொருத்தம்",
      "ஆட்சேபனை எதிர்கொள்ளல்",
      "விதிமுறை இணக்கம் & நேர்மை",
    ],
    viewMainScoreBtn: "🏆 பிரதான மதிப்பெண் பட்டியலைப் பார்க்க",
    proceedC3Btn: "🚀 சவால் 3-க்குச் செல்லவும் →",
    waitingC3Text: "⏳ மதிப்பெண் பிரதான பட்டியலில் சேர்க்கப்பட்டது! சவால் 3 திறக்கப்படும் வரை காத்திருக்கவும்...",
    promptUsedLabel: "📝 நீங்கள் சமர்ப்பித்த இறுதி R.C.T.F.C. ப்ராம்ப்ட்",
  },
};

const PILLAR_ICONS = {
  role: "🎭",
  context: "📋",
  task: "🎯",
  format: "📐",
  constraints: "⚖️",
};

const PILLAR_HEURISTICS = {
  role: [/role|peranan|角色|பங்கு|consultant|advisor|perunding|顾问|顧問|ஆலோசகர்|prumda|prudential|pamb/i],
  context: [/aleya|28m|28j|2800|4\.5m|4\.5j|450|6\.5m|6\.5j|650|19m|19j|1900|clinic|klinik|诊所|診所|கிளினிக்|hakim|aisyah|imran/i],
  task: [/3-slide|3 slide|3 slaid|3页|3 頁|3頁|3-ஸ்லைடு|pre-pitch|pra-pembentangan|战前|戰前|முன்-முன்மொழிவு|liquidity|kecairan|流动性|流動性|பணப்புழக்க/i],
  format: [/kpi|chart|table|carta|jadual|柱状图|柱狀圖|策略表|வரைபடம்|அட்டவணை|speaker notes|nota pembentang|演讲者备注|演講備註|பேச்சாளர்/i],
  constraints: [/bnm|pds|free-look|free look|15-day|15 hari|15天|15日|15-நாள்|fact-find|analisis keperluan|需求分析|shariah|syariah|takaful|伊斯兰|伊斯蘭|ஷரியா/i],
};

function detectPillarStatusClient(promptText, guideSteps) {
  const txt = String(promptText || "");
  const out = {};
  (guideSteps || []).forEach((g) => {
    const k = g.key;
    const tmpl = String(g.template || "").trim();
    if (tmpl && txt.includes(tmpl.slice(0, Math.min(28, tmpl.length)))) {
      out[k] = "done";
      return;
    }
    const regexes = PILLAR_HEURISTICS[k] || [];
    const hit = regexes.some((rx) => rx.test(txt));
    out[k] = hit ? "done" : "missing";
  });
  return out;
}

/* Reusable 16:9 Executive Slide Card Component */
function ExecutiveSlideCard({ slide, slideIndex, totalSlides, badgeLabel, speakerNotesLabel, compact = false }) {
  if (!slide) return null;
  const maxChartVal =
    slide.chart && Array.isArray(slide.chart.series)
      ? Math.max(...slide.chart.series.map((p) => Number(p.value) || 0), 1)
      : 1;

  return (
    <div className="bg-white border-2 border-slate-200 rounded-2xl overflow-hidden shadow-sm flex flex-col justify-between">
      <div>
        <div className="h-1.5 bg-[#ed1b2e]" />
        <div className={`${compact ? "p-3 space-y-2.5" : "p-4 sm:p-5 space-y-3"}`}>
          {/* Top metadata row */}
          <div className="flex items-start justify-between gap-2">
            <div>
              {badgeLabel && (
                <div className="text-[10px] font-extrabold uppercase tracking-wider text-[#ed1b2e] mb-0.5">
                  {badgeLabel} • {slideIndex + 1}/{totalSlides}
                </div>
              )}
              <h4 className={`${compact ? "text-xs sm:text-sm" : "text-sm sm:text-base"} font-extrabold text-slate-900 leading-snug`}>
                {slide.title}
              </h4>
              {slide.subtitle && (
                <div className="text-[11px] text-slate-500 mt-0.5">{slide.subtitle}</div>
              )}
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-red-50 text-[#ed1b2e] border border-red-200 font-bold uppercase shrink-0">
              {slide.layout || "slide"}
            </span>
          </div>

          {/* KPI Cards */}
          {Array.isArray(slide.kpis) && slide.kpis.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {slide.kpis.map((k, ki) => (
                <div key={ki} className="bg-red-50/60 border border-red-200 rounded-xl p-2">
                  <div className="text-[10px] font-bold uppercase text-slate-500 truncate">{k.label}</div>
                  <div className="text-xs sm:text-sm font-extrabold text-[#ed1b2e] mt-0.5">{k.value}</div>
                  {k.note && <div className="text-[10px] text-slate-500 mt-0.5 leading-tight">{k.note}</div>}
                </div>
              ))}
            </div>
          )}

          {/* Bar Chart */}
          {slide.chart && Array.isArray(slide.chart.series) && slide.chart.series.length > 0 && (
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 space-y-1.5">
              <div className="flex items-end gap-3 h-24 pt-3 px-2 border-b border-slate-300">
                {slide.chart.series.map((pt, pi) => {
                  const pct = Math.max(10, Math.round(((Number(pt.value) || 0) / maxChartVal) * 100));
                  const barColors = ["bg-[#ed1b2e]", "bg-blue-600", "bg-amber-500", "bg-emerald-600"];
                  return (
                    <div key={pi} className="flex-1 flex flex-col items-center justify-end h-full">
                      <div className="text-[11px] font-extrabold text-slate-900 mb-0.5">{pt.value}</div>
                      <div
                        className={`w-3/4 rounded-t-md transition-all ${barColors[pi % barColors.length]}`}
                        style={{ height: `${pct}%` }}
                      />
                    </div>
                  );
                })}
              </div>
              <div className="flex gap-3 px-2">
                {slide.chart.series.map((pt, pi) => (
                  <div key={pi} className="flex-1 text-center text-[10px] font-bold text-slate-700 leading-tight">
                    {pt.label}
                  </div>
                ))}
              </div>
              {slide.chart.unit && (
                <div className="text-[10px] text-slate-400 text-right">{slide.chart.unit}</div>
              )}
            </div>
          )}

          {/* Strategy Table */}
          {slide.table && Array.isArray(slide.table.headers) && slide.table.headers.length > 0 && (
            <div className="overflow-x-auto border border-slate-200 rounded-xl">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-900 text-white">
                    {slide.table.headers.map((h, hi) => (
                      <th key={hi} className="p-2 font-bold text-[11px]">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {(slide.table.rows || []).map((row, ri) => (
                    <tr key={ri} className={ri % 2 === 1 ? "bg-slate-50" : "bg-white"}>
                      {slide.table.headers.map((_, ci) => (
                        <td key={ci} className="p-2 border-t border-slate-200 text-[11px] text-slate-800 align-top">
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
                  <div key={ci} className="bg-slate-50 border border-slate-200 rounded-xl p-2.5">
                    {col.heading && (
                      <div className="text-xs font-extrabold text-[#ed1b2e] mb-1">{col.heading}</div>
                    )}
                    {Array.isArray(col.bullets) && (
                      <ul className="list-disc pl-4 space-y-1 text-[11px] text-slate-700">
                        {col.bullets.map((b, bi) => (
                          <li key={bi}>{b}</li>
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

          {/* Bullets + Optional Slide Image */}
          {(Array.isArray(slide.bullets) && slide.bullets.length > 0) || slide.image ? (
            <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
              <div className={slide.image ? "md:col-span-8 space-y-1" : "md:col-span-12 space-y-1"}>
                {Array.isArray(slide.bullets) && slide.bullets.length > 0 && (
                  <ul className="list-disc pl-5 space-y-1 text-xs text-slate-700 leading-snug">
                    {slide.bullets.map((b, bi) => (
                      <li key={bi}>{b}</li>
                    ))}
                  </ul>
                )}
              </div>
              {slide.image && (
                <div className="md:col-span-4">
                  <img
                    src={slide.image}
                    alt={slide.title}
                    className="w-full h-28 object-cover rounded-xl border border-slate-200 shadow-sm"
                  />
                </div>
              )}
            </div>
          ) : null}

          {/* Callout Banner */}
          {slide.callout && (
            <div className="bg-red-50/70 border-l-4 border-l-[#ed1b2e] px-3 py-2 rounded-r-xl text-xs font-bold text-slate-900">
              {slide.callout}
            </div>
          )}
        </div>
      </div>

      {/* Speaker Notes Footer */}
      {slide.speaker_notes && (
        <div className="bg-slate-50 border-t border-slate-200 px-3.5 py-2 text-[11px] text-slate-600">
          <span className="font-extrabold text-slate-800 mr-1.5">
            {speakerNotesLabel || "🎙️ Speaker Notes"}:
          </span>
          {slide.speaker_notes}
        </div>
      )}
    </div>
  );
}

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
  const ui = C2_UI_I18N[lang] || C2_UI_I18N.en;

  const [challengeData, setChallengeData] = useState(null);
  const [loadingChallenge, setLoadingChallenge] = useState(true);
  const [activeStep, setActiveStep] = useState("1"); // "1" = Prompt Builder, "2" = Review & Final Submit
  const [selectedPillarKey, setSelectedPillarKey] = useState("role");
  const [promptText, setPromptText] = useState("");
  const [showFullCase, setShowFullCase] = useState(false);
  const [showTargetModal, setShowTargetModal] = useState(false);
  const [targetSlideIdx, setTargetSlideIdx] = useState(0);

  // Generated Deck State
  const [deck, setDeck] = useState(null);
  const [deckSignature, setDeckSignature] = useState("");
  const [slideIdx, setSlideIdx] = useState(0);
  const [compareMode, setCompareMode] = useState(false);
  const [generatingDeck, setGeneratingDeck] = useState(false);
  const [generatingImages, setGeneratingImages] = useState(false);
  const [genError, setGenError] = useState(null);
  const [history, setHistory] = useState([]);
  const [lineage, setLineage] = useState([]);

  // One-Time Final Submission State
  const [submittingFinal, setSubmittingFinal] = useState(false);
  const [lockedSubmission, setLockedSubmission] = useState(null);
  const [lockedScore, setLockedScore] = useState(null);

  const startRef = useRef(Date.now());
  const sessionIdRef = useRef(`c2-${agentId || "anon"}-${Date.now()}`);
  const lastLangRef = useRef(lang);

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
        setDeck(existingSubmission.deck);
      }
      if (existingSubmission.userInput) {
        setPromptText(existingSubmission.userInput);
      }
    }
  }, [isCompleted, existingSubmission, existingScore]);

  // Load localized Challenge 2 bundle (/api/challenge?market=MY&lang=...)
  useEffect(() => {
    let active = true;
    setLoadingChallenge(true);
    fetch(`/api/challenge?market=MY&lang=${encodeURIComponent(lang)}`, { cache: "no-store" })
      .then((r) => r.json())
      .then((data) => {
        if (!active) return;
        setChallengeData(data);
        setLoadingChallenge(false);
        // Initialize or update starter prompt if user hasn't customized it yet
        setPromptText((prev) => {
          if (!prev || prev.trim().length === 0 || lastLangRef.current !== lang) {
            // Only overwrite on language switch if they haven't generated a deck yet
            if (!deck) {
              return data.simple_prompt || "";
            }
          }
          return prev;
        });
        lastLangRef.current = lang;
      })
      .catch(() => {
        if (active) setLoadingChallenge(false);
      });
    return () => {
      active = false;
    };
  }, [lang]);

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
  const currentPillarObj =
    guideSteps.find((g) => g.key === selectedPillarKey) || guideSteps[0] || null;

  // Insert single R.C.T.F.C. pillar template into prompt (strip weak 1-line starter cleanly)
  const handleInsertPillar = (pillarObj) => {
    if (!pillarObj || !pillarObj.template) return;
    const clause = pillarObj.template.trim();
    setPromptText((prev) => {
      let base = (prev || "").trim();
      const simpleStarter = (challengeData?.simple_prompt || "").trim();
      if (simpleStarter && base === simpleStarter) {
        base = "";
      } else if (simpleStarter && base.startsWith(simpleStarter)) {
        base = base.slice(simpleStarter.length).trim();
      }
      const nextText = base
        ? base.includes(clause)
          ? base
          : `${base}\n\n${clause}`
        : clause;
      return nextText;
    });
    setLineage((prev) => [
      ...prev,
      { t: Math.round((Date.now() - startRef.current) / 1000), e: "chip", k: pillarObj.key },
    ]);
    // Advance selector to next missing pillar
    const order = ["role", "context", "task", "format", "constraints"];
    const curIdx = order.indexOf(pillarObj.key);
    for (let i = 1; i <= order.length; i++) {
      const candidate = order[(curIdx + i) % order.length];
      if (pillarStatuses[candidate] !== "done" && candidate !== pillarObj.key) {
        setSelectedPillarKey(candidate);
        break;
      }
    }
  };

  // Insert all 5 R.C.T.F.C. pillars at once while preserving any custom user edits / boosters
  const handleInsertAllPillars = () => {
    if (!guideSteps.length) return;
    setPromptText((prev) => {
      let cur = (prev || "").trim();
      const simpleStarter = (challengeData?.simple_prompt || "").trim();
      if (simpleStarter && cur === simpleStarter) {
        cur = "";
      } else if (simpleStarter && cur.startsWith(simpleStarter)) {
        cur = cur.slice(simpleStarter.length).trim();
      }
      guideSteps.forEach((g) => {
        const tmpl = (g.template || "").trim();
        if (tmpl && !cur.includes(tmpl.slice(0, Math.min(28, tmpl.length)))) {
          cur = cur ? `${cur}\n\n${tmpl}` : tmpl;
        }
      });
      return cur;
    });
    setLineage((prev) => [
      ...prev,
      { t: Math.round((Date.now() - startRef.current) / 1000), e: "insert_all" },
    ]);
  };

  // Toggle or append an Agency Leader Wealth / Empathy / Relationship Booster into prompt
  const handleToggleLeaderBooster = (snippet) => {
    const clean = (snippet || "").trim();
    if (!clean) return;
    setPromptText((prev) => {
      let cur = (prev || "").trim();
      const simpleStarter = (challengeData?.simple_prompt || "").trim();
      if (simpleStarter && cur === simpleStarter) {
        cur = "";
      }
      if (cur.includes(clean)) {
        return cur.replace(clean, "").replace(/\n{3,}/g, "\n\n").trim();
      }
      return cur ? `${cur}\n\n${clean}` : clean;
    });
  };

  // Add all 3 Agency Leader Wealth / Empathy / Relationship Boosters at once
  const handleAddAllLeaderBoosters = () => {
    const list = ui.leaderBoosters || [];
    if (!list.length) return;
    setPromptText((prev) => {
      let cur = (prev || "").trim();
      const simpleStarter = (challengeData?.simple_prompt || "").trim();
      if (simpleStarter && cur === simpleStarter) {
        cur = "";
      }
      list.forEach((b) => {
        const clean = (b.snippet || "").trim();
        if (clean && !cur.includes(clean)) {
          cur = cur ? `${cur}\n\n${clean}` : clean;
        }
      });
      return cur;
    });
  };

  // Reset to starter prompt
  const handleResetPrompt = () => {
    setPromptText(challengeData?.simple_prompt || "");
  };

  // Generate 3-Slide Deck via /api/deck/generate (+ background /api/deck/images)
  const handleGenerateDeck = async () => {
    if (!promptText || promptText.trim().length < 3 || generatingDeck) return;
    setGeneratingDeck(true);
    setGenError(null);
    pingActivity("⚡ Generating 3-Slide Pre-Pitch Deck with Gemini...", "C2: Generating 3-Slide Deck");

    try {
      const nextVersion = history.length + 1;
      const res = await fetch("/api/deck/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          session_id: sessionIdRef.current,
          prompt: promptText,
          lang,
          market: "MY",
          version: nextVersion,
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.deck) {
        throw new Error(data.detail || "Failed to generate deck. Please try again.");
      }

      const newDeck = data.deck;
      setDeck(newDeck);
      setDeckSignature(data.signature || "");
      setSlideIdx(0);
      setActiveStep("2");
      setHistory((prev) => [
        ...prev,
        {
          version: nextVersion,
          prompt: promptText,
          slide_count: (newDeck.slides || []).length,
          at: Date.now() / 1000,
        },
      ]);
      setLineage((prev) => [
        ...prev,
        {
          t: Math.round((Date.now() - startRef.current) / 1000),
          e: "gen",
          v: nextVersion,
          n: (newDeck.slides || []).length,
          len: promptText.length,
        },
      ]);

      // Generate slide illustrations in background if any slide has image_prompt
      const slidesWithPrompts = (newDeck.slides || [])
        .map((s, idx) => ({ idx, prompt: s.image_prompt }))
        .filter((x) => Boolean(x.prompt))
        .slice(0, 2);

      if (slidesWithPrompts.length > 0) {
        setGeneratingImages(true);
        fetch("/api/deck/images", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ prompts: slidesWithPrompts.map((x) => x.prompt) }),
        })
          .then((ir) => ir.json())
          .then((imgData) => {
            if (imgData && Array.isArray(imgData.images)) {
              setDeck((cur) => {
                if (!cur || !Array.isArray(cur.slides)) return cur;
                const clonedSlides = cur.slides.map((sl) => ({ ...sl }));
                slidesWithPrompts.forEach((item, ii) => {
                  if (imgData.images[ii] && clonedSlides[item.idx]) {
                    clonedSlides[item.idx].image = imgData.images[ii];
                  }
                });
                return { ...cur, slides: clonedSlides };
              });
            }
          })
          .catch(() => {})
          .finally(() => setGeneratingImages(false));
      }
    } catch (err) {
      setGenError(err.message || "Could not generate slide deck.");
    } finally {
      setGeneratingDeck(false);
    }
  };

  // Download .pptx for current deck
  const handleDownloadPptx = async (targetDeckObj) => {
    const deckToExport = targetDeckObj || deck;
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
      a.download = "PRUMDA-Pre-Pitch-Deck.pptx";
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    } catch (e) {}
  };

  // Compute live pre-submit quality checks on the generated deck (supports EN/BM/ZH/YUE/TA numbers)
  const computePreSubmitChecks = (d) => {
    if (!d || !Array.isArray(d.slides)) {
      return { slides3: false, clientFacts: false, visuals: false, notes: false, compliance: false };
    }
    const slides = d.slides;
    const rawJson = JSON.stringify(d).toLowerCase();
    const slides3 = slides.length === 3;
    const clientFacts =
      (rawJson.includes("28") || rawJson.includes("19") || rawJson.includes("2800") || rawJson.includes("1900")) &&
      (rawJson.includes("4.5") || rawJson.includes("6.5") || rawJson.includes("450") || rawJson.includes("650") || rawJson.includes("aleya"));
    const visuals = slides.some(
      (s) =>
        (Array.isArray(s.kpis) && s.kpis.length > 0) ||
        (s.chart && Array.isArray(s.chart.series)) ||
        (s.table && Array.isArray(s.table.headers))
    );
    const notes = slides.every((s) => Boolean((s.speaker_notes || "").trim()));
    const compliance =
      /bnm|pds|free-look|free look|15|fact-find|fact find|analisis keperluan|shariah|syariah|takaful|hibah|犹豫期|猶豫期|冷静期|冷靜期|需求分析|ஷரியா|தகாஃபுல்/i.test(
        rawJson
      );
    return { slides3, clientFacts, visuals, notes, compliance };
  };

  const preChecks = computePreSubmitChecks(deck);

  // ONE-TIME FINAL SUBMIT: Evaluates via /api/deck/submit and posts to Main Arena /api/submit
  const handleFinalSubmitOnce = async () => {
    if (!deck || submittingFinal || lockedSubmission) return;
    setSubmittingFinal(true);
    pingActivity("⚖️ Submitting Final 3-Slide Deck to AI Judge...", "C2: Finalizing & Scoring Deck");

    const elapsedSec = Math.max(8, Math.round((Date.now() - startRef.current) / 1000));
    let evalResult = null;

    try {
      const evalRes = await fetch("/api/deck/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: agentName || "PRUMDA Leader",
          participant_id: agentId || null,
          market: "MY",
          lang,
          prompt: promptText,
          deck,
          signature: deckSignature,
          history,
          lineage,
        }),
      });
      if (evalRes.ok) {
        evalResult = await evalRes.json();
      }
    } catch (e) {}

    // Extract or synthesize fallback score if Vertex judge timed out
    const checksPassed = Object.values(preChecks).filter(Boolean).length;
    const fallbackTotal10 = Math.min(
      9.8,
      Math.max(7.8, Number((6.8 + activePillarCount * 0.4 + checksPassed * 0.25).toFixed(1)))
    );
    const total10 =
      evalResult && typeof evalResult.total === "number" ? evalResult.total : fallbackTotal10;
    const accuracyScore = Math.min(100, Math.max(78, Math.round(total10 * 10)));
    const speedScore = Math.max(85, Math.min(99, 100 - Math.floor(elapsedSec / 10)));
    const arenaTotal = Math.round((speedScore + accuracyScore) / 2);

    const locDims = ui.rubricDims || [
      "Structure & Completeness",
      "Client Personalisation",
      "Insight & Quantification",
      "Solution Fit",
      "Objection Readiness",
      "Compliance & Fair Dealing",
    ];

    const rawRubric = evalResult?.judge?.rubric || locDims.map((d) => ({ dimension: d, score: Math.round(total10) }));
    const rubricArr = rawRubric.map((r, i) => ({
      ...r,
      dimension: locDims[i] || r.dimension,
    }));

    const criteriaMap = {};
    rubricArr.forEach((r) => {
      criteriaMap[r.dimension] = `${r.score}/10`;
    });

    const fallbackVerdictByLang = {
      en: `Strong ${deck.slides?.length || 3}-slide executive pre-pitch brief (${total10}/10) with ${activePillarCount}/5 R.C.T.F.C. pillars applied.`,
      "zh-CN": `极具水准的 ${deck.slides?.length || 3} 页高管战前提案简报（${total10}/10），完整覆盖 ${activePillarCount}/5 个 R.C.T.F.C. 核心维度与家族财富规划洞察！`,
      yue: `極具水準嘅 ${deck.slides?.length || 3} 頁高管戰前提案簡報（${total10}/10），完整覆蓋 ${activePillarCount}/5 個 R.C.T.F.C. 核心維度同家族財富規劃心法！`,
      ms: `Ringkasan pra-pembentangan eksekutif ${deck.slides?.length || 3}-slaid yang mantap (${total10}/10) dengan ${activePillarCount}/5 tiang R.C.T.F.C. diterapkan.`,
      ta: `சிறந்த ${deck.slides?.length || 3}-ஸ்லைடு நிர்வாக முன்-முன்மொழிவு (${total10}/10) — ${activePillarCount}/5 R.C.T.F.C. தூண்கள் மற்றும் செல்வத் திட்டமிடல் பயன்படுத்தப்பட்டுள்ளது!`,
    };

    const verdictText =
      evalResult?.judge?.verdict ||
      fallbackVerdictByLang[normLang] ||
      fallbackVerdictByLang.en;

    const slideSummary = (deck.slides || [])
      .map((s, i) => `${ui.slideTabPrefix}${i + 1}${ui.slideTabSuffix || ""}: ${s.title}`)
      .join(" • ");

    const submissionPayload = {
      challenge: "2",
      title: `${deck.title || "Pre-Pitch Brief: Datin Sharifah Aleya"} (${total10}/10)`,
      styleBadge: `🧠 ${total10}/10 Deck (${activePillarCount}/5 R.C.T.F.C.)`,
      userInput: promptText,
      aiOutput: slideSummary,
      deck,
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

    setLockedSubmission(submissionPayload);
    setLockedScore(finalScoreObj);
    setSubmittingFinal(false);

    if (onSandboxPreview) {
      onSandboxPreview(submissionPayload);
    }
    if (fetchArenaState) {
      fetchArenaState();
    }
  };

  /* ============================================================================
     RENDER 1: LOCKED "JOB DONE!" VIEW (AFTER ONE-TIME FINAL SUBMISSION)
  ============================================================================ */
  if (lockedSubmission) {
    const finalDeck = lockedSubmission.deck || deck || challengeData?.target;
    const finalSlides = finalDeck?.slides || [];
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
        {/* Top Locked Completion Banner */}
        <div className="flex flex-wrap items-center justify-between gap-3 bg-emerald-50 border border-emerald-200 rounded-2xl p-3.5">
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

        {/* 6-Dimension Rubric Breakdown Pills */}
        {criteriaEntries.length > 0 && (
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-3 space-y-2">
            <div className="text-[11px] font-extrabold uppercase tracking-wider text-slate-700">
              {ui.rubricHeader}
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
              {criteriaEntries.map(([dim, val]) => (
                <div
                  key={dim}
                  className="bg-white border border-slate-200 rounded-xl px-2.5 py-1.5 flex flex-col justify-between"
                >
                  <span className="text-[10px] font-semibold text-slate-600 leading-tight">
                    {dim}
                  </span>
                  <span className="text-xs font-extrabold text-[#ed1b2e] mt-1">
                    {typeof val === "number" ? `${val}` : val}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Finalized 3-Slide Deck Interactive Viewer */}
        {finalSlides.length > 0 && (
          <div className="space-y-2.5">
            <div className="flex flex-wrap items-center justify-between gap-2 bg-slate-100 border border-slate-200 rounded-xl px-3 py-2">
              <div className="flex items-center gap-1.5">
                {finalSlides.map((_, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setSlideIdx(idx)}
                    className={`px-3 py-1 rounded-lg text-xs font-extrabold transition-all ${
                      safeIdx === idx
                        ? "bg-[#ed1b2e] text-white shadow-sm"
                        : "bg-white hover:bg-red-50 text-slate-700 border border-slate-200"
                    }`}
                  >
                    {ui.slideTabPrefix}{idx + 1}{ui.slideTabSuffix || ""}
                  </button>
                ))}
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleDownloadPptx(finalDeck)}
                  className="px-3 py-1 rounded-lg bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 text-xs font-extrabold shadow-sm"
                >
                  {ui.downloadPptxBtn}
                </button>
              </div>
            </div>

            <ExecutiveSlideCard
              slide={curSlide}
              slideIndex={safeIdx}
              totalSlides={finalSlides.length}
              badgeLabel={finalDeck.title}
              speakerNotesLabel={ui.speakerNotesLabel}
              compact={true}
            />
          </div>
        )}

        {/* Final Submitted Prompt Accordion */}
        {lockedSubmission.userInput && (
          <details className="bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs">
            <summary className="font-extrabold text-slate-700 cursor-pointer">
              {ui.promptUsedLabel}
            </summary>
            <div className="mt-2 font-mono text-[11px] text-slate-800 whitespace-pre-line bg-white p-2.5 rounded-lg border border-slate-200 max-h-32 overflow-y-auto">
              {lockedSubmission.userInput}
            </div>
          </details>
        )}

        {/* Progression Footer to Main Scoreboard or Challenge 3 */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-200">
          {onViewScorecard && (
            <button
              type="button"
              onClick={onViewScorecard}
              className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs sm:text-sm font-extrabold shadow-sm transition-all"
            >
              {ui.viewMainScoreBtn}
            </button>
          )}

          {canProceedNext ? (
            <button
              type="button"
              onClick={onNext}
              className="flex-1 sm:flex-none px-5 py-2.5 rounded-xl bg-[#ed1b2e] hover:bg-[#c81526] text-white text-xs sm:text-sm font-extrabold shadow-md transition-all"
            >
              {ui.proceedC3Btn}
            </button>
          ) : (
            <div className="text-xs font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-3.5 py-2 rounded-xl">
              {ui.waitingC3Text}
            </div>
          )}
        </div>
      </div>
    );
  }

  /* ============================================================================
     RENDER 2: ACTIVE CHALLENGE 2 STUDIO (STEP 1 PROMPT BUILDER & STEP 2 REVIEW)
  ============================================================================ */
  const targetDeck = challengeData?.target || null;
  const targetSlides = targetDeck?.slides || [];
  const generatedSlides = deck?.slides || [];
  const safeSlideIdx = Math.min(slideIdx, Math.max(0, generatedSlides.length - 1));
  const curGeneratedSlide = generatedSlides[safeSlideIdx] || null;
  const curTargetSlide =
    targetSlides[Math.min(safeSlideIdx, Math.max(0, targetSlides.length - 1))] || null;

  return (
    <div className="bg-white border-t-4 border-t-[#ed1b2e] border-x border-b border-slate-200 rounded-3xl p-3.5 sm:p-5 space-y-3.5 shadow-md">
      {/* Top Executive Title + Target Benchmark Button */}
      <div className="flex flex-wrap items-start justify-between gap-2.5 border-b border-slate-200 pb-3">
        <div className="space-y-0.5">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[11px] font-mono uppercase px-2.5 py-0.5 rounded-full bg-red-50 text-[#ed1b2e] border border-red-200 font-extrabold">
              {ui.badge}
            </span>
            <span className="text-[11px] font-extrabold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
              {ui.pillarsActiveLabel}: {activePillarCount}/5
            </span>
          </div>
          <h2 className="text-base sm:text-xl font-extrabold text-slate-900 pt-0.5">
            {ui.title}
          </h2>
          <p className="text-xs text-slate-600 leading-relaxed max-w-3xl">{ui.subtitle}</p>
        </div>

        <button
          type="button"
          onClick={() => setShowTargetModal((v) => !v)}
          className={`px-3.5 py-2 rounded-xl text-xs font-extrabold border-2 transition-all shrink-0 shadow-sm ${
            showTargetModal
              ? "bg-slate-900 text-white border-slate-900"
              : "bg-white hover:bg-red-50 text-[#ed1b2e] border-[#ed1b2e]"
          }`}
        >
          {showTargetModal ? ui.hideTargetBtn : ui.targetBtn}
        </button>
      </div>

      {/* Collapsible Target Benchmark Deck Drawer */}
      {showTargetModal && targetDeck && (
        <div className="bg-slate-900 text-white rounded-2xl p-3.5 sm:p-4 space-y-3 shadow-inner">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <div className="text-[10px] font-extrabold uppercase tracking-wider text-red-400">
                {ui.targetGoalBanner}
              </div>
              <div className="text-xs sm:text-sm font-extrabold text-white">
                {targetDeck.title} — {targetDeck.subtitle}
              </div>
            </div>
            <div className="flex items-center gap-1.5">
              {targetSlides.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setTargetSlideIdx(idx)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-extrabold transition-all ${
                    targetSlideIdx === idx
                      ? "bg-[#ed1b2e] text-white"
                      : "bg-slate-800 hover:bg-slate-700 text-slate-200"
                  }`}
                >
                  {ui.slideTabPrefix}{idx + 1}{ui.slideTabSuffix || ""}
                </button>
              ))}
            </div>
          </div>

          <div className="text-slate-900">
            <ExecutiveSlideCard
              slide={targetSlides[targetSlideIdx] || targetSlides[0]}
              slideIndex={targetSlideIdx}
              totalSlides={targetSlides.length}
              badgeLabel={ui.targetSlideLabel}
              speakerNotesLabel={ui.speakerNotesLabel}
              compact={true}
            />
          </div>
        </div>
      )}

      {/* Crisp 6-Card Client Case Fact Strip (Always Visible + Expandable) */}
      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-3 space-y-2.5">
        <div className="flex items-center justify-between gap-2">
          <div className="text-xs font-extrabold text-slate-900">{ui.caseHeader}</div>
          <button
            type="button"
            onClick={() => setShowFullCase((v) => !v)}
            className="text-[11px] font-extrabold text-[#ed1b2e] hover:underline"
          >
            {showFullCase ? ui.lessCaseBtn : ui.moreCaseBtn}
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
          {ui.caseCards.map((c, idx) => (
            <div
              key={idx}
              className="bg-white border border-slate-200 rounded-xl px-2.5 py-2 flex items-start gap-2 shadow-sm"
            >
              <span className="text-sm shrink-0 mt-0.5">{c.icon}</span>
              <div className="min-w-0">
                <div className="text-[11px] font-extrabold text-slate-900 leading-tight">
                  {c.label}
                </div>
                <div className="text-[11px] text-slate-600 leading-snug mt-0.5">{c.value}</div>
              </div>
            </div>
          ))}
        </div>

        {showFullCase && challengeData?.case_file && (
          <div className="bg-white border border-slate-200 rounded-xl p-3 grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-slate-700">
            {Object.entries(challengeData.case_file).map(([k, v]) => (
              <div key={k} className="leading-snug">
                <span className="font-extrabold text-slate-900 capitalize">
                  {k.replace(/_/g, " ")}:{" "}
                </span>
                <span>{v}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 2-Step Navigation Bar: Step 1 (Craft Prompt) -> Step 2 (Review 3-Slide Deck & Final Submit) */}
      <div className="grid grid-cols-2 gap-2 bg-slate-100 p-1.5 rounded-2xl border border-slate-200">
        <button
          type="button"
          onClick={() => setActiveStep("1")}
          className={`py-2 px-3 rounded-xl text-xs sm:text-sm font-extrabold transition-all flex items-center justify-center gap-1.5 ${
            activeStep === "1"
              ? "bg-[#ed1b2e] text-white shadow-sm"
              : "bg-white text-slate-700 hover:bg-red-50 hover:text-[#ed1b2e]"
          }`}
        >
          <span>{ui.step1Tab}</span>
          <span
            className={`text-[10px] px-1.5 py-0.5 rounded-full ${
              activeStep === "1" ? "bg-white/20 text-white" : "bg-slate-100 text-slate-600"
            }`}
          >
            {activePillarCount}/5
          </span>
        </button>

        <button
          type="button"
          disabled={!deck}
          onClick={() => {
            if (deck) setActiveStep("2");
          }}
          className={`py-2 px-3 rounded-xl text-xs sm:text-sm font-extrabold transition-all flex items-center justify-center gap-1.5 ${
            !deck
              ? "bg-slate-50 text-slate-400 cursor-not-allowed"
              : activeStep === "2"
              ? "bg-[#ed1b2e] text-white shadow-sm"
              : "bg-white text-emerald-700 border border-emerald-300 hover:bg-emerald-50"
          }`}
        >
          <span>{ui.step2Tab}</span>
          {deck && (
            <span
              className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                activeStep === "2"
                  ? "bg-white/20 text-white"
                  : "bg-emerald-100 text-emerald-800"
              }`}
            >
              {generatedSlides.length} {ui.slidesCountBadge}
            </span>
          )}
        </button>
      </div>

      {/* ========================================================================
          STEP 1: 5-PILLAR R.C.T.F.C. PROMPT BUILDER + LEADER BOOSTERS + PROMPT BOX
      ======================================================================== */}
      {activeStep === "1" && (
        <div className="space-y-3">
          {/* 5-Pillar Selector Strip */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-3 space-y-2.5">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="text-xs font-extrabold text-slate-800">{ui.pillarsHeader}</div>
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={handleInsertAllPillars}
                  className="px-2.5 py-1 rounded-lg bg-[#ed1b2e] hover:bg-[#c81526] text-white text-[11px] font-extrabold shadow-sm transition-all"
                >
                  {ui.insertAllBtn}
                </button>
                <button
                  type="button"
                  onClick={handleResetPrompt}
                  className="px-2.5 py-1 rounded-lg bg-white hover:bg-slate-100 text-slate-600 border border-slate-200 text-[11px] font-bold transition-all"
                >
                  {ui.resetPromptBtn}
                </button>
              </div>
            </div>

            {/* 5 Pillar Buttons */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-1.5">
              {guideSteps.map((g, idx) => {
                const isDone = pillarStatuses[g.key] === "done";
                const isSelected = selectedPillarKey === g.key;
                return (
                  <button
                    key={g.key}
                    type="button"
                    onClick={() => setSelectedPillarKey(g.key)}
                    className={`p-2 rounded-xl border text-left transition-all flex items-center justify-between gap-1 ${
                      isSelected
                        ? "bg-slate-900 text-white border-slate-900 shadow-sm"
                        : isDone
                        ? "bg-emerald-50 text-emerald-900 border-emerald-300 hover:bg-emerald-100"
                        : "bg-white text-slate-700 border-slate-200 hover:border-[#ed1b2e]"
                    }`}
                  >
                    <div className="min-w-0">
                      <div className="text-[10px] font-mono opacity-75">
                        {PILLAR_ICONS[g.key] || "📌"} #{idx + 1}
                      </div>
                      <div className="text-xs font-extrabold truncate">{g.label}</div>
                    </div>
                    <span
                      className={`text-xs font-extrabold px-1.5 py-0.5 rounded-full shrink-0 ${
                        isDone
                          ? "bg-emerald-600 text-white"
                          : isSelected
                          ? "bg-[#ed1b2e] text-white"
                          : "bg-slate-100 text-slate-500"
                      }`}
                    >
                      {isDone ? "✓" : "+"}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Active Pillar Detail & One-Tap Insert Box */}
            {currentPillarObj && (
              <div className="bg-white border-2 border-slate-200 rounded-xl p-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="space-y-1 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-extrabold text-[#ed1b2e]">
                      {PILLAR_ICONS[currentPillarObj.key]} {currentPillarObj.label}
                    </span>
                    <span className="text-[11px] text-slate-500 font-medium">
                      — {currentPillarObj.tip}
                    </span>
                  </div>
                  <div className="text-xs text-slate-800 bg-slate-50 border border-slate-200 rounded-lg p-2 font-medium leading-relaxed">
                    &ldquo;{currentPillarObj.template}&rdquo;
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => handleInsertPillar(currentPillarObj)}
                  className={`px-3.5 py-2.5 rounded-xl text-xs font-extrabold shrink-0 transition-all shadow-sm ${
                    pillarStatuses[currentPillarObj.key] === "done"
                      ? "bg-emerald-600 hover:bg-emerald-700 text-white"
                      : "bg-[#ed1b2e] hover:bg-[#c81526] text-white"
                  }`}
                >
                  {pillarStatuses[currentPillarObj.key] === "done"
                    ? ui.pillarIncluded
                    : ui.insertPillarBtn}
                </button>
              </div>
            )}

            {/* NEW: Agency Leader Wealth, Empathy & Relationship Boosters Bar */}
            {(ui.leaderBoosters || []).length > 0 && (
              <div className="bg-amber-50/70 border border-amber-200 rounded-xl p-2.5 space-y-2">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-[11px] sm:text-xs font-extrabold text-amber-950">
                    {ui.leaderBoostersHeader}
                  </span>
                  <button
                    type="button"
                    onClick={handleAddAllLeaderBoosters}
                    className="px-2.5 py-1 rounded-lg bg-amber-600 hover:bg-amber-700 text-white text-[11px] font-extrabold shadow-sm transition-all"
                  >
                    {ui.addAllBoostersBtn}
                  </button>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {ui.leaderBoosters.map((b, bIdx) => {
                    const active = (promptText || "").includes(b.snippet);
                    return (
                      <button
                        type="button"
                        key={bIdx}
                        onClick={() => handleToggleLeaderBooster(b.snippet)}
                        className={`text-left px-3 py-1.5 rounded-lg border text-xs font-bold transition-all shadow-sm ${
                          active
                            ? "bg-emerald-50 border-emerald-500 text-emerald-950"
                            : "bg-white hover:bg-red-50 text-slate-800 hover:text-[#ed1b2e] border-amber-300"
                        }`}
                      >
                        {active ? "✓ " : "+ "}{b.label}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Large High-Visibility Editable Prompt Box */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-xs sm:text-sm font-extrabold text-slate-900">
                {ui.promptLabel}
              </label>
              <span className="text-[11px] font-mono text-slate-500">
                {promptText.length} chars
              </span>
            </div>
            <textarea
              rows={6}
              value={promptText}
              onChange={(e) => setPromptText(e.target.value)}
              placeholder={ui.promptPlaceholder}
              className="w-full rounded-2xl bg-white border-2 border-slate-300 focus:border-[#ed1b2e] focus:outline-none px-3.5 py-3 text-sm sm:text-base text-slate-900 font-medium leading-relaxed shadow-inner"
            />
          </div>

          {genError && (
            <div className="bg-red-50 border border-red-200 text-[#ed1b2e] text-xs font-bold px-3.5 py-2.5 rounded-xl">
              ⚠️ {genError}
            </div>
          )}

          {/* Generate / Update 3-Slide Deck CTA */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
            <div className="text-[11px] text-slate-500 font-medium max-w-xl">
              {ui.oneTimeNotice}
            </div>

            <button
              type="button"
              disabled={generatingDeck || loadingChallenge || !promptText.trim()}
              onClick={handleGenerateDeck}
              className={`w-full sm:w-auto px-6 py-3 rounded-2xl font-extrabold text-sm text-white shadow-md transition-all ${
                generatingDeck
                  ? "bg-slate-400 cursor-wait"
                  : "bg-[#ed1b2e] hover:bg-[#c81526]"
              }`}
            >
              {generatingDeck
                ? ui.generatingText
                : deck
                ? ui.regenerateBtn
                : ui.generateBtn}
            </button>
          </div>
        </div>
      )}

      {/* ========================================================================
          STEP 2: INTERACTIVE 3-SLIDE DECK PREVIEW, COMPARE & ONE-TIME FINAL SUBMIT
      ======================================================================== */}
      {activeStep === "2" && deck && (
        <div className="space-y-3.5">
          {/* Slide Selector + Compare with Target + PPTX Download Toolbar */}
          <div className="flex flex-wrap items-center justify-between gap-2 bg-slate-100 border border-slate-200 rounded-2xl p-2.5">
            <div className="flex items-center gap-1.5">
              {generatedSlides.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setSlideIdx(idx)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-extrabold transition-all ${
                    safeSlideIdx === idx
                      ? "bg-[#ed1b2e] text-white shadow-sm"
                      : "bg-white hover:bg-red-50 text-slate-700 border border-slate-200"
                  }`}
                >
                  {ui.slideTabPrefix}{idx + 1}{ui.slideTabSuffix || ""}
                </button>
              ))}
              {generatingImages && (
                <span className="text-[11px] font-bold text-amber-700 bg-amber-50 border border-amber-200 px-2.5 py-1 rounded-lg animate-pulse">
                  {ui.generatingImgText}
                </span>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => setCompareMode((v) => !v)}
                className={`px-3 py-1.5 rounded-xl text-xs font-extrabold border transition-all ${
                  compareMode
                    ? "bg-slate-900 text-white border-slate-900"
                    : "bg-white hover:bg-red-50 text-slate-800 border-slate-300"
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

          {/* Slide Canvas: Single View or Side-by-Side Target Comparison */}
          {compareMode && curTargetSlide ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 items-stretch">
              <ExecutiveSlideCard
                slide={curGeneratedSlide}
                slideIndex={safeSlideIdx}
                totalSlides={generatedSlides.length}
                badgeLabel={ui.yourSlideLabel}
                speakerNotesLabel={ui.speakerNotesLabel}
                compact={true}
              />
              <ExecutiveSlideCard
                slide={curTargetSlide}
                slideIndex={safeSlideIdx}
                totalSlides={targetSlides.length}
                badgeLabel={ui.targetSlideLabel}
                speakerNotesLabel={ui.speakerNotesLabel}
                compact={true}
              />
            </div>
          ) : (
            <ExecutiveSlideCard
              slide={curGeneratedSlide}
              slideIndex={safeSlideIdx}
              totalSlides={generatedSlides.length}
              badgeLabel={deck.title || ui.yourSlideLabel}
              speakerNotesLabel={ui.speakerNotesLabel}
              compact={false}
            />
          )}

          {/* 5-Point Pre-Submit Quality Checklist */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-3 space-y-2">
            <div className="text-[11px] font-extrabold uppercase tracking-wider text-slate-700">
              {ui.qualityChecksHeader}
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
              {Object.entries(ui.checkLabels).map(([ckKey, ckLabel]) => {
                const passed = Boolean(preChecks[ckKey]);
                return (
                  <div
                    key={ckKey}
                    className={`rounded-xl px-2.5 py-2 border text-xs font-bold flex items-center gap-1.5 ${
                      passed
                        ? "bg-emerald-50 border-emerald-300 text-emerald-900"
                        : "bg-white border-slate-200 text-slate-500"
                    }`}
                  >
                    <span
                      className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-extrabold shrink-0 ${
                        passed
                          ? "bg-emerald-600 text-white"
                          : "bg-slate-200 text-slate-600"
                      }`}
                    >
                      {passed ? "✓" : "•"}
                    </span>
                    <span className="text-[11px] leading-tight">{ckLabel}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Final Decision Bar: Back to Edit Prompt OR One-Time Final Submit */}
          <div className="bg-red-50/60 border-2 border-red-200 rounded-2xl p-3.5 flex flex-col sm:flex-row items-center justify-between gap-3">
            <button
              type="button"
              disabled={submittingFinal}
              onClick={() => setActiveStep("1")}
              className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-white hover:bg-slate-100 text-slate-800 border-2 border-slate-300 text-xs sm:text-sm font-extrabold transition-all"
            >
              {ui.backToPromptBtn}
            </button>

            <button
              type="button"
              disabled={submittingFinal}
              onClick={handleFinalSubmitOnce}
              className={`w-full sm:w-auto px-6 py-3 rounded-xl font-extrabold text-xs sm:text-sm text-white shadow-md transition-all ${
                submittingFinal
                  ? "bg-slate-500 cursor-wait"
                  : "bg-emerald-600 hover:bg-emerald-700"
              }`}
            >
              {submittingFinal ? ui.finalSubmittingText : ui.finalSubmitBtn}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
