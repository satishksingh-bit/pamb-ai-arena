/* ============================================================================
   CHALLENGE 3 MODULE (14:35 - 15:05 | 30 min)
   "Drive faster pipeline, sharpen your strategic proposal to sales close - Pre-pitch"
   — Adaptive Phone / iPad / Laptop Single-Screen Workbench:
     • 5 Native Malaysian Languages: English (en), Mandarin (zh-CN), Cantonese (yue),
       Bahasa Melayu (ms), Tamil (ta)
     • 1 Assigned Scenario per Participant (4 Crisp Key Data Points)
     • Step 1: Create Life-Event Greeting Card (Large Prompt Box)
     • Step 2: Create First-Touch WhatsApp Message (Large Prompt + Editable Output Box)
     • Step 3: Customer Replies ("Compare with AIA Malaysia!") -> Factual PAMB vs. AIA Email
     • Final Submit: Score + Greeting Card at Top + WhatsApp & Email in 1 Visible Box
============================================================================ */

const C3_UI_I18N = {
  en: {
    badge: "CHALLENGE 3 • MDRT PRE-PITCH",
    assignedCase: "Assigned Case:",
    switchCase: "🎲 Switch Case",
    lifeEventLabel: "🎉 Life Event:",
    gapLabel: "⚠️ Current Gap:",
    pambOfferLabel: "🇲🇾 Your PAMB Offer:",
    aiaRivalLabel: "⚔️ AIA Rival (Step 3):",
    step1Tab: "Step 1: 🎨 Greeting Card",
    step2Tab: "Step 2: 💬 WhatsApp Pitch",
    step3Tab: "Step 3: 📧 PAMB vs. AIA Email",
    step1Title: "🎨 Step 1 of 3: Create Personalized Life-Event Greeting Card",
    themeChip: "💡 Theme",
    cardStyleBoostersLabel: "✨ Empathy & Creative Visual Boosters (tap to combine into prompt):",
    cardStyleBoosters: [
      "❤️ Warm Family Milestone & Heartfelt Empathy",
      "🌟 Prudential Red & Gold MDRT Prestige Border",
      "🇲🇾 Authentic Malaysian Cultural & Family Warmth",
    ],
    cardPromptLabel: "✏️ Greeting Card Prompt / Headline (Combine themes above & edit freely):",
    cardPromptPlaceholder: "Type your warm celebratory greeting card headline or visual prompt...",
    generatingCard: "🎨 Generating Card...",
    redrawCard: "↻ Redraw Card",
    generateCardBtn: "🎨 Generate Greeting Card",
    cardReadyMsg: "✓ Greeting Card Ready! Now craft your First-Touch WhatsApp message.",
    nextStep2Btn: "Confirm Card & Next: Step 2 (WhatsApp) →",
    cardAttachedBadge: "✓ Step 1 Greeting Card Attached",
    editCardBtn: "Edit Card",
    step2Title: "💬 Step 2 of 3: First-Touch WhatsApp Message",
    pambAngleChip: "⚡ PAMB Angle",
    combineBothWaBtn: "✨ Use All PAMB Wealth & Empathy Angles + Edit Prompt",
    waEmpathyBoosters: [
      "❤️ Warm Empathy First: Celebrate life milestone sincerely with zero sales pressure",
      "💎 Wealth Planning Angle: Protect family cashflow & ring-fence existing savings",
    ],
    waPromptLabel: "✏️ AI Prompt Box — Combine angles above & edit in your own words before clicking AI Generate:",
    waPromptPlaceholder: "Tap 1 or all angles above, customize with your wealth planning & empathy touch, then click AI Generate...",
    waDrafting: "⚡ Drafting...",
    aiRefineBtn: "✨ AI Generate / Refine",
    waOutputLabel: "📱 Final First-Touch WhatsApp Message (Editable before sending):",
    backBtn: "← Back",
    nextStep3Btn: "Send WhatsApp & Next: Step 3 (Customer Replies!) →",
    objectionHeader: "📲 Incoming Customer WhatsApp Reply — AIA Malaysia Comparison Objection!",
    tapFactHint: "👇 Tap 1, 2, or ALL 3 factual PAMB vs. AIA advantages to build your prompt, then edit freely below:",
    useAll3FactsBtn: "✨ Use All 3 PAMB vs. AIA Advantages + Edit Prompt",
    emailLeaderBoosters: [
      "🤝 Respectful MDRT Tone: Acknowledge AIA fairly while proving why PAMB protects family wealth better",
      "📊 Side-by-Side Clarity: Present all 3 PAMB vs. AIA clauses clearly for easy family decision-making",
    ],
    emailPromptLabel: "✏️ AI Prompt Box — Combine all 3 facts & edit your strategy before clicking AI Generate:",
    emailPromptPlaceholder: "Click 'Use All 3 PAMB vs. AIA Advantages' or tap individual facts above, edit freely, then click AI Generate...",
    emailOutputLabel: "📧 Final Factual PAMB vs. AIA Malaysia Comparison Email (Editable before final submit):",
    clearPromptBtn: "✕ Clear Prompt",
    promptEditHint: "💡 Tip: Tap multiple options above to combine them into the prompt box, edit in your own words, then click ✨ AI Generate / Refine!",
    submittingBtn: "⚡ Finalizing & Scoring...",
    finalSubmitBtn: "✅ Final Submit Pre-Pitch & Score",
    submittedBadge: "✓ SUBMITTED",
    scoreLabel: "🏆 Score:",
    pillarsHeader: "📊 MDRT Pre-Pitch 4-Pillar Evaluation",
    waFinalHeader: "💬 1. First-Touch WhatsApp Message",
    emailFinalHeader: "📧 2. Factual PAMB vs. AIA Malaysia Comparison Email",
  },
  "zh-CN": {
    badge: "挑战 3 • MDRT 绩优签单前预热 (PRE-PITCH)",
    assignedCase: "分配客户案例：",
    switchCase: "🎲 切换案例",
    lifeEventLabel: "🎉 人生大事：",
    gapLabel: "⚠️ 现有保障缺口：",
    pambOfferLabel: "🇲🇾 您的保诚 (PAMB) 方案：",
    aiaRivalLabel: "⚔️ 友邦 (AIA) 竞品 (第3步)：",
    step1Tab: "第1步：🎨 祝贺卡设计",
    step2Tab: "第2步：💬 WhatsApp 破冰",
    step3Tab: "第3步：📧 保诚 vs 友邦电邮",
    step1Title: "🎨 第 1 / 3 步：制作专属人生大事祝贺卡 (Greeting Card)",
    themeChip: "💡 主题",
    cardStyleBoostersLabel: "✨ 客户共情与创意视觉加分项（点击可叠加至提示词框）：",
    cardStyleBoosters: [
      "❤️ 温馨家庭里程碑与真挚客户共情",
      "🌟 保诚红金 MDRT 尊贵质感边框",
      "🇲🇾 大马本土家庭温情与祝福氛围",
    ],
    cardPromptLabel: "✏️ 祝贺卡提示词 / 贺词标题（可叠加主题并自由修改）：",
    cardPromptPlaceholder: "输入温馨的祝贺卡标题或画面提示词...",
    generatingCard: "🎨 正在生成祝贺卡...",
    redrawCard: "↻ 重新生成祝贺卡",
    generateCardBtn: "🎨 生成专属祝贺卡",
    cardReadyMsg: "✓ 祝贺卡已生成！接下来请撰写首条 WhatsApp 破冰信息。",
    nextStep2Btn: "确认祝贺卡并进入第 2 步 (WhatsApp) →",
    cardAttachedBadge: "✓ 已附上第1步祝贺卡",
    editCardBtn: "修改祝贺卡",
    step2Title: "💬 第 2 / 3 步：撰写首条 WhatsApp 破冰信息",
    pambAngleChip: "⚡ 保诚切入点",
    combineBothWaBtn: "✨ 一键全选保诚财富与共情切入点（可自由编辑提示词）",
    waEmpathyBoosters: [
      "❤️ 共情先行：先真诚祝贺客户人生大事，零推销压力",
      "💎 财富规划视角：守护家庭现金流，避免动用现有储蓄",
    ],
    waPromptLabel: "✏️ AI 提示词框 (Prompt Box) — 点击上方多个切入点组合并自由修改后，再点击 AI 生成：",
    waPromptPlaceholder: "点击上方切入点组合提示词，加入您的财富规划与共情巧思，再点击「✨ AI 生成 / 优化话术」...",
    waDrafting: "⚡ AI 撰写中...",
    aiRefineBtn: "✨ AI 生成 / 优化话术",
    waOutputLabel: "📱 最终 WhatsApp 破冰信息（发送前可直接编辑修改）：",
    backBtn: "← 返回上一步",
    nextStep3Btn: "发送 WhatsApp 并进入第 3 步（客户回复异议！）→",
    objectionHeader: "📲 收到客户 WhatsApp 回复 — 提出友邦 (AIA Malaysia) 货比三家异议！",
    tapFactHint: "👇 可点击 1 个或一键全选 3 大保诚 vs 友邦客观优势加入提示词框，自由编辑后再生成电邮：",
    useAll3FactsBtn: "✨ 一键全选 3 大保诚 vs 友邦优势 + 自由编辑提示词",
    emailLeaderBoosters: [
      "🤝 尊重专业 MDRT 语调：客观肯定友邦，同时用条款证明为何保诚更能守护家庭长期财富",
      "📊 清晰对比总结：将保诚 vs 友邦 3 大关键条款整理成一目了然的对比方便客户决策",
    ],
    emailPromptLabel: "✏️ AI 提示词框 (Prompt Box) — 组合全部 3 大优势并自由编辑您的对比策略：",
    emailPromptPlaceholder: "点击「一键全选 3 大保诚 vs 友邦优势」或逐个点击上方要点，自由修改补充后点击 AI 生成...",
    emailOutputLabel: "📧 最终大马保诚 (PAMB) vs 友邦 (AIA) 客观对比电邮（提交前可编辑）：",
    clearPromptBtn: "✕ 清空提示词",
    promptEditHint: "💡 提示：可点击多个选项组合进提示词框，用您自己的话自由修改补充后，再点击右侧「✨ AI 生成 / 优化话术」！",
    submittingBtn: "⚡ 正在提交并智能评分...",
    finalSubmitBtn: "✅ 最终提交 Pre-Pitch 并获取评分",
    submittedBadge: "✓ 已完成提交",
    scoreLabel: "🏆 最终得分：",
    pillarsHeader: "📊 MDRT 签单前预热 4 大维度评分",
    waFinalHeader: "💬 1. 首条 WhatsApp 破冰信息",
    emailFinalHeader: "📧 2. 大马保诚 (PAMB) vs 友邦 (AIA) 客观对比电邮",
  },
  yue: {
    badge: "挑戰 3 • MDRT 王牌見客前預熱 (PRE-PITCH)",
    assignedCase: "派定客戶個案：",
    switchCase: "🎲 轉另一個案",
    lifeEventLabel: "🎉 人生大事：",
    gapLabel: "⚠️ 現有保障缺口：",
    pambOfferLabel: "🇲🇾 你嘅保誠 (PAMB) 方案：",
    aiaRivalLabel: "⚔️ 友邦 (AIA) 對手 (第3步)：",
    step1Tab: "第1步：🎨 賀卡設計",
    step2Tab: "第2步：💬 WhatsApp 破冰",
    step3Tab: "第3步：📧 保誠 vs AIA 電郵",
    step1Title: "🎨 第 1 / 3 步：整張專屬人生大事賀卡 (Greeting Card)",
    themeChip: "💡 主題",
    cardStyleBoostersLabel: "✨ 人情味同創意視覺加分項（撳一下即可加落提示詞框）：",
    cardStyleBoosters: [
      "❤️ 窩心屋企里程碑同真摯人情味",
      "🌟 保誠紅金 MDRT 尊貴邊框設計",
      "🇲🇾 大馬本土屋企溫情同祝福氣氛",
    ],
    cardPromptLabel: "✏️ 賀卡提示詞 / 賀詞標題（可以組合上面主題再自由改）：",
    cardPromptPlaceholder: "輸入窩心嘅賀卡標題或者畫面提示詞...",
    generatingCard: "🎨 緊係幫緊你畫賀卡...",
    redrawCard: "↻ 重新畫過張卡",
    generateCardBtn: "🎨 生成專屬賀卡",
    cardReadyMsg: "✓ 賀卡搞掂！跟住寫第一條 WhatsApp 暖場信息啦。",
    nextStep2Btn: "確認賀卡，去第 2 步 (WhatsApp) →",
    cardAttachedBadge: "✓ 已連埋第1步賀卡",
    editCardBtn: "改返張卡",
    step2Title: "💬 第 2 / 3 步：寫第一條 WhatsApp 破冰信息",
    pambAngleChip: "⚡ 保誠切入點",
    combineBothWaBtn: "✨ 一鍵全選保誠財富同人情味切入點（可自由改提示詞）",
    waEmpathyBoosters: [
      "❤️ 人情味先行：先真心祝賀個客人生大事，零 Hard Sell 壓力",
      "💎 財富規劃角度：守住屋企現金流，唔使郁到現有儲蓄",
    ],
    waPromptLabel: "✏️ AI 提示詞框 (Prompt Box) — 撳上面幾個切入點組合兼自己執靚後，再撳 AI 生成：",
    waPromptPlaceholder: "撳上面嘅切入點組合提示詞，加埋你嘅財富規劃心法，再撳「✨ AI 生成 / 執靚段字」...",
    waDrafting: "⚡ AI 寫緊...",
    aiRefineBtn: "✨ AI 生成 / 執靚段字",
    waOutputLabel: "📱 最終 WhatsApp 破冰信息（Send 之前可以自己改）：",
    backBtn: "← 返上一步",
    nextStep3Btn: "Send WhatsApp 去第 3 步（個客覆機問 AIA！）→",
    objectionHeader: "📲 收到個客 WhatsApp 覆機 — 想同大馬友邦 (AIA Malaysia) 格價比較！",
    tapFactHint: "👇 可撳 1 個或者一鍵全選 3 大保誠 vs AIA 真實條款優勢加落提示詞框，自由改完再生成電郵：",
    useAll3FactsBtn: "✨ 一鍵全選 3 大保誠 vs AIA 優勢 + 自由改提示詞",
    emailLeaderBoosters: [
      "🤝 專業得體 MDRT 語氣：客觀尊重 AIA，同時用條款證明點解保誠更能守住屋企長遠財富",
      "📊 清晰對比總結：將保誠 vs AIA 3 大關鍵條款整理到一目了然方便屋企人傾",
    ],
    emailPromptLabel: "✏️ AI 提示詞框 (Prompt Box) — 組合晒 3 大優勢兼自由改你嘅比較策略：",
    emailPromptPlaceholder: "撳「一鍵全選 3 大保誠 vs AIA 優勢」或者逐個撳上面重點，自由改完再撳 AI 生成...",
    emailOutputLabel: "📧 最終大馬保誠 (PAMB) vs 友邦 (AIA) 客觀比較電郵（交之前可以改）：",
    clearPromptBtn: "✕ 清空提示詞",
    promptEditHint: "💡 貼士：可以撳多個選項組合落提示詞框，加埋你自己嘅見解之後，再撳右邊「✨ AI 生成 / 執靚段字」！",
    submittingBtn: "⚡ 交緊卷同智能計緊分...",
    finalSubmitBtn: "✅ 最終提交 Pre-Pitch 兼睇分",
    submittedBadge: "✓ 已經交咗",
    scoreLabel: "🏆 最終得分：",
    pillarsHeader: "📊 MDRT 見客前預熱 4 大維度評分",
    waFinalHeader: "💬 1. 第一條 WhatsApp 破冰信息",
    emailFinalHeader: "📧 2. 大馬保誠 (PAMB) vs 友邦 (AIA) 客觀比較電郵",
  },
  ms: {
    badge: "CABARAN 3 • PRA-PEMBENTANGAN MDRT (PRE-PITCH)",
    assignedCase: "Kes Pelanggan Anda:",
    switchCase: "🎲 Tukar Kes",
    lifeEventLabel: "🎉 Peristiwa Hidup:",
    gapLabel: "⚠️ Jurang Semasa:",
    pambOfferLabel: "🇲🇾 Cadangan PAMB Anda:",
    aiaRivalLabel: "⚔️ Pesaing AIA (Langkah 3):",
    step1Tab: "Langkah 1: 🎨 Kad Ucapan",
    step2Tab: "Langkah 2: 💬 Mesej WhatsApp",
    step3Tab: "Langkah 3: 📧 E-mel PAMB lwn AIA",
    step1Title: "🎨 Langkah 1 daripada 3: Cipta Kad Ucapan Peristiwa Hidup Peribadi",
    themeChip: "💡 Tema",
    cardStyleBoostersLabel: "✨ Penggalak Empati & Visual Kreatif (tekan untuk gabung ke dalam prompt):",
    cardStyleBoosters: [
      "❤️ Empati Keluarga Mesra & Detik Bermakna",
      "🌟 Bingkai Prestij MDRT Merah & Emas Prudential",
      "🇲🇾 Sentuhan Budaya & Kekeluargaan Malaysia Asli",
    ],
    cardPromptLabel: "✏️ Kotak Prompt / Tajuk Kad Ucapan (Gabung tema di atas & sunting bebas):",
    cardPromptPlaceholder: "Taipkan tajuk kad ucapan mesra atau prompt visual anda...",
    generatingCard: "🎨 Menjana Kad...",
    redrawCard: "↻ Lukis Semula Kad",
    generateCardBtn: "🎨 Jana Kad Ucapan",
    cardReadyMsg: "✓ Kad Ucapan Siap! Sekarang rangka mesej WhatsApp sentuhan pertama anda.",
    nextStep2Btn: "Sahkan Kad & Seterusnya: Langkah 2 (WhatsApp) →",
    cardAttachedBadge: "✓ Kad Ucapan Langkah 1 Dilampirkan",
    editCardBtn: "Sunting Kad",
    step2Title: "💬 Langkah 2 daripada 3: Mesej WhatsApp Sentuhan Pertama",
    pambAngleChip: "⚡ Sudut PAMB",
    combineBothWaBtn: "✨ Gunakan Semua Sudut Kekayaan & Empati PAMB + Sunting Prompt",
    waEmpathyBoosters: [
      "❤️ Empati Dahulu: Raikan detik bermakna pelanggan secara ikhlas tanpa tekanan jualan",
      "💎 Sudut Perancangan Kekayaan: Lindungi aliran tunai keluarga & simpanan sedia ada",
    ],
    waPromptLabel: "✏️ Kotak Prompt AI — Gabungkan sudut di atas & sunting mengikut ayat anda sebelum klik AI:",
    waPromptPlaceholder: "Tekan 1 atau semua sudut di atas, tambah sentuhan perancangan kekayaan anda, kemudian klik Jana AI...",
    waDrafting: "⚡ Merangka...",
    aiRefineBtn: "✨ Jana / Halusi dengan AI",
    waOutputLabel: "📱 Mesej WhatsApp Sentuhan Pertama Akhir (Boleh disunting sebelum hantar):",
    backBtn: "← Kembali",
    nextStep3Btn: "Hantar WhatsApp & Seterusnya: Langkah 3 (Pelanggan Balas!) →",
    objectionHeader: "📲 Balasan WhatsApp Pelanggan Masuk — Bantahan Perbandingan AIA Malaysia!",
    tapFactHint: "👇 Tekan 1, 2, atau KETIGA-TIGA (3/3) fakta kelebihan PAMB lwn AIA untuk dimasukkan ke dalam prompt & sunting bebas:",
    useAll3FactsBtn: "✨ Gunakan Ketiga-tiga (3/3) Kelebihan PAMB lwn AIA + Sunting Prompt",
    emailLeaderBoosters: [
      "🤝 Nada Profesional MDRT: Hormati AIA secara adil sambil membuktikan bagaimana PAMB lebih melindungi kekayaan keluarga",
      "📊 Ringkasan Perbandingan Jelas: Susun 3 klausa utama PAMB lwn AIA supaya mudah dibaca oleh keluarga",
    ],
    emailPromptLabel: "✏️ Kotak Prompt AI — Gabungkan ketiga-tiga fakta & sunting strategi anda sebelum klik Jana AI:",
    emailPromptPlaceholder: "Klik 'Gunakan Ketiga-tiga Kelebihan PAMB lwn AIA' atau tekan fakta di atas, sunting bebas, kemudian klik Jana AI...",
    emailOutputLabel: "📧 E-mel Perbandingan Berfakta PAMB lwn AIA Malaysia Akhir (Boleh disunting):",
    clearPromptBtn: "✕ Kosongkan Prompt",
    promptEditHint: "💡 Tip: Tekan beberapa pilihan di atas untuk menggabungkannya ke dalam kotak prompt, sunting mengikut kreativiti anda, kemudian klik ✨ Jana / Halusi dengan AI!",
    submittingBtn: "⚡ Menghantar & Mengira Skor...",
    finalSubmitBtn: "✅ Hantar Akhir Pra-Pitch & Kira Skor",
    submittedBadge: "✓ DIHANTAR",
    scoreLabel: "🏆 Skor:",
    pillarsHeader: "📊 Penilaian 4-Tunjang Pra-Pitch MDRT",
    waFinalHeader: "💬 1. Mesej WhatsApp Sentuhan Pertama",
    emailFinalHeader: "📧 2. E-mel Perbandingan Berfakta PAMB lwn AIA Malaysia",
  },
  ta: {
    badge: "சவால் 3 • MDRT முன்-பிரிזेंटेஷன் (PRE-PITCH)",
    assignedCase: "ஒதுக்கப்பட்ட வாடிக்கையாளர்:",
    switchCase: "🎲 வேறு கேஸ் மாற்று",
    lifeEventLabel: "🎉 வாழ்க்கை நிகழ்வு:",
    gapLabel: "⚠️ தற்போதைய இடைவெளி:",
    pambOfferLabel: "🇲🇾 உங்கள் PAMB திட்டம்:",
    aiaRivalLabel: "⚔️ AIA போட்டித் திட்டம் (படி 3):",
    step1Tab: "படி 1: 🎨 வாழ்த்து அட்டை",
    step2Tab: "படி 2: 💬 WhatsApp செய்தி",
    step3Tab: "படி 3: 📧 PAMB vs AIA மின்னஞ்சல்",
    step1Title: "🎨 படி 1 / 3: தனிப்பயன் வாழ்க்கை நிகழ்வு வாழ்த்து அட்டையை உருவாக்குக",
    themeChip: "💡 தீம்",
    cardStyleBoostersLabel: "✨ அக்கறை & படைப்பாற்றல் காட்சி ஊக்கிகள் (Prompt-ல் சேர்க்க அழுத்தவும்):",
    cardStyleBoosters: [
      "❤️ குடும்ப அன்பும் மனமார்ந்த வாழ்த்தும்",
      "🌟 Prudential சிவப்பு & தங்க MDRT பிரீமியம் வடிவமைப்பு",
      "🇲🇾 மலேசிய குடும்ப கலாச்சார உணர்வு",
    ],
    cardPromptLabel: "✏️ வாழ்த்து அட்டை Prompt / தலைப்பு (மேலே உள்ள தீம்களைச் சேர்த்து சுதந்திரமாகத் திருத்தவும்):",
    cardPromptPlaceholder: "உங்கள் வாழ்த்து அட்டை தலைப்பு அல்லது காட்சி குறிப்பை உள்ளிடவும்...",
    generatingCard: "🎨 அட்டை தயாராகிறது...",
    redrawCard: "↻ மீண்டும் உருவாக்கு",
    generateCardBtn: "🎨 வாழ்த்து அட்டையை உருவாக்கு",
    cardReadyMsg: "✓ வாழ்த்து அட்டை தயார்! இப்போது உங்கள் முதல் WhatsApp செய்தியை உருவாக்குங்கள்.",
    nextStep2Btn: "அட்டையை உறுதிசெய்து படி 2-க்குச் செல்க (WhatsApp) →",
    cardAttachedBadge: "✓ படி 1 வாழ்த்து அட்டை இணைக்கப்பட்டது",
    editCardBtn: "அட்டையை மாற்று",
    step2Title: "💬 படி 2 / 3: முதல்-தொடர்பு WhatsApp செய்தி",
    pambAngleChip: "⚡ PAMB கோணம்",
    combineBothWaBtn: "✨ அனைத்து PAMB செல்வ & அக்கறை கோணங்களையும் சேர் + Prompt திருத்து",
    waEmpathyBoosters: [
      "❤️ அக்கறை முதலில்: விற்பனை அழுத்தமின்றி மனமார்ந்த வாழ்த்துக்களைப் பகிரவும்",
      "💎 செல்வத் திட்டமிடல்: குடும்ப சேமிப்பு மற்றும் பணப்புழக்கத்தைப் பாதுகாத்தல்",
    ],
    waPromptLabel: "✏️ AI Prompt பெட்டி — மேலே உள்ள கோணங்களை இணைத்து உங்கள் சொந்த நடையில் திருத்திய பின் AI-ஐ அழுத்தவும்:",
    waPromptPlaceholder: "மேலே உள்ள கோணங்களை அழுத்தி Prompt-ல் சேர்த்து, உங்கள் செல்வத் திட்டமிடல் கருத்துக்களைச் சேர்த்து AI பொத்தானை அழுத்தவும்...",
    waDrafting: "⚡ உருவாக்குகிறது...",
    aiRefineBtn: "✨ AI மூலம் உருவாக்கு / மேம்படுத்து",
    waOutputLabel: "📱 இறுதி WhatsApp செய்தி (அனுப்பும் முன் திருத்தலாம்):",
    backBtn: "← பின்செல்",
    nextStep3Btn: "WhatsApp அனுப்பி படி 3-க்குச் செல்க (வாடிக்கையாளர் பதில்!) →",
    objectionHeader: "📲 வாடிக்கையாளர் WhatsApp பதில் — AIA Malaysia உடன் ஒப்பிடக் கோரிக்கை!",
    tapFactHint: "👇 1, 2 அல்லது அனைத்து 3 PAMB vs AIA நன்மைகளையும் Prompt-ல் சேர்த்து சுதந்திரமாகத் திருத்தவும்:",
    useAll3FactsBtn: "✨ அனைத்து 3 PAMB vs AIA நன்மைகளையும் சேர் + Prompt திருத்து",
    emailLeaderBoosters: [
      "🤝 மரியாதையான MDRT அணுகுமுறை: AIA-வை மதித்து, PAMB எவ்வாறு குடும்ப செல்வத்தை சிறப்பாகப் பாதுகாக்கிறது என்பதை விளக்குக",
      "📊 தெளிவான ஒப்பீட்டு சுருக்கம்: 3 முக்கிய PAMB vs AIA நன்மைகளை எளிதாகப் புரியும்படி வரிசைப்படுத்துக",
    ],
    emailPromptLabel: "✏️ AI Prompt பெட்டி — 3 உண்மைகளையும் இணைத்து உங்கள் உத்தியைத் திருத்திய பின் AI-ஐ அழுத்தவும்:",
    emailPromptPlaceholder: "'அனைத்து 3 PAMB vs AIA நன்மைகளையும் சேர்' என்பதை அழுத்தி, திருத்திய பின் AI மூலம் உருவாக்கவும்...",
    emailOutputLabel: "📧 இறுதி PAMB vs AIA Malaysia ஒப்பீட்டு மின்னஞ்சல் (சமர்ப்பிக்கும் முன் திருத்தலாம்):",
    clearPromptBtn: "✕ Prompt-ஐ அழி",
    promptEditHint: "💡 குறிப்பு: மேலே உள்ள பல விருப்பங்களை அழுத்தி Prompt பெட்டியில் சேர்த்து, உங்கள் விருப்பப்படி திருத்திய பின் ✨ AI பொத்தானை அழுத்தவும்!",
    submittingBtn: "⚡ சமர்ப்பித்து மதிப்பெண் கணக்கிடுகிறது...",
    finalSubmitBtn: "✅ இறுதி சமர்ப்பிப்பு & மதிப்பெண் பெறுக",
    submittedBadge: "✓ சமர்ப்பிக்கப்பட்டது",
    scoreLabel: "🏆 மதிப்பெண்:",
    pillarsHeader: "📊 MDRT முன்-பிரிזेंटेஷன் 4-தூண் மதிப்பீடு",
    waFinalHeader: "💬 1. முதல்-தொடர்பு WhatsApp செய்தி",
    emailFinalHeader: "📧 2. உண்மையான PAMB vs AIA Malaysia ஒப்பீட்டு மின்னஞ்சல்",
  },
};
C3_UI_I18N["zh-TW"] = C3_UI_I18N.yue;

const PAMB_C3_SCENARIOS = [
  {
    id: "newborn_baby",
    icon: "🍼",
    i18n: {
      en: {
        shortLabel: "Newborn Baby",
        customerName: "Tan Wei Ming & Chloe Lim (32, PJ)",
        existingGap: "Old RM 150k single med card • RM 0 child congenital / uni fund",
        lifeEvent: "Welcomed 1st baby boy (Lucas) at PJ private hospital",
        pambPlan: "PRUMy Child Plus (PRUSaver Kid) + PRUWith You Plus + PRUMillion Med Active 2.0",
        aiaPlan: "AIA A-Life Joy Xtra + A-Plus BabyCare + A-Plus Health360",
        customerReply:
          "\"Thanks for the lovely card & WhatsApp! An AIA agent just quoted us AIA A-Life Joy Xtra + A-Plus BabyCare. Can you email me how Prudential compares factually with AIA?\"",
        cardHeadline: "Welcome to the World, Baby Lucas! 🌟",
        cardChips: [
          "Welcome to the World, Baby Lucas! 🌟",
          "Blessings to the Tan Family & Baby Lucas 🍼",
        ],
        whatsappChips: [
          "Claim RM 500 Childbirth Cash Reward (PRUWith You Plus) + cover 27 congenital conditions & PRUSaver Kid uni fund using FD interest",
          "Lock in PRUMy Child Plus (jaundice, Autism/ADHD to age 7 + Payor Waiver) & send 2-min summary while baby naps",
        ],
        aiaFacts: [
          "✓ Free +50% Auto Booster (PRUWith You Plus +1%/yr free vs. AIA Vitality fees/fitness tracking)",
          "✓ Immediate RM 500 Childbirth Cash Reward + 27 Congenital & Autism/ADHD cover",
          "✓ 15% Instant Cash Premium Discount (PRUMillion Med Active 2.0 vs. AIA conditional Health Wallet)",
        ],
        defaultWhatsapp:
          "Hi Wei Ming & Chloe! Huge congrats on welcoming Baby Lucas! 🍼✨ I made this celebratory card for your family.\n\nQuick heads-up: you can claim an RM 500 Childbirth Cash Reward under PRUWith You Plus, and lock in PRUMy Child Plus (27 congenital conditions, jaundice, Autism/ADHD + PRUSaver Kid uni fund with Payor Waiver) using just your FD interest. Shall I send a 2-min summary while Lucas naps? 😊",
        defaultEmail:
          "Subject: Factual Comparison for Baby Lucas: PAMB (PRUMy Child Plus) vs. AIA (A-Life Joy Xtra)\n\nHi Wei Ming & Chloe,\nHere are 3 factual reasons PAMB gives Lucas & your family stronger value than AIA A-Life Joy Xtra:\n1. Free +50% Auto Sum Assured Booster: PRUWith You Plus grows cover +1%/yr up to +50% at RM 0 extra cost (no AIA Vitality gym/membership fees required).\n2. Immediate RM 500 Childbirth Cash Reward + 27 Congenital Conditions & Payor Waiver.\n3. 15% Cash Premium Discount: PRUMillion Med Active 2.0 cuts your medical premium by 15% when claim-free (AIA only credits a conditional Health Wallet).\n\nLet's do a 10-min Zoom Thursday at 8 PM to compare the exact tables!",
      },
      "zh-CN": {
        shortLabel: "新生宝宝",
        customerName: "陈伟明 & 林晓雯 (32岁，八打灵再也 PJ)",
        existingGap: "旧 RM 15万单人医药卡 • RM 0 婴儿先天性疾病与大学教育基金",
        lifeEvent: "刚在 PJ 私人医院迎来第一胎男宝宝 (Lucas)",
        pambPlan: "PRUMy Child Plus (PRUSaver Kid) + PRUWith You Plus + PRUMillion Med Active 2.0",
        aiaPlan: "AIA A-Life Joy Xtra + A-Plus BabyCare + A-Plus Health360",
        customerReply:
          "“谢谢你这么用心的祝贺卡和 WhatsApp！刚好有位 AIA 代理向我们推荐 AIA A-Life Joy Xtra + A-Plus BabyCare。你可以发一封电邮客观对比大马保诚和友邦的差别吗？”",
        cardHeadline: "欢迎来到这个世界，小 Lucas 宝宝！🌟",
        cardChips: [
          "欢迎来到这个世界，小 Lucas 宝宝！🌟",
          "祝福伟明与晓雯喜获麟儿，小 Lucas 健康快乐成长！🍼",
        ],
        whatsappChips: [
          "领取 RM 500 新生儿现金奖赏 (PRUWith You Plus) + 仅用定存利息锁定 27 种先天疾病与 PRUSaver Kid 教育金",
          "锁定 PRUMy Child Plus（黄疸、自闭症/多动症保障至7岁 + 父母豁免保费）并发送2分钟精华简报",
        ],
        aiaFacts: [
          "✓ 免费 +50% 保额自动递增（PRUWith You Plus 每年免费+1%，无需缴付 AIA Vitality 会员费）",
          "✓ 立即领取 RM 500 新生儿现金奖赏 + 涵盖 27 种儿童先天性疾病与自闭症/ADHD",
          "✓ 无索赔享 15% 保费现金折扣（PRUMillion Med Active 2.0 直接减保费 vs AIA 仅记入医疗钱包）",
        ],
        defaultWhatsapp:
          "伟明、晓雯，衷心恭喜你们喜迎小宝贝 Lucas！🍼✨ 我特意为你们一家制作了这张满月祝贺卡。\n\n顺带一提：您现有的保单升级至 PRUWith You Plus 可直接申领 RM 500 生育现金奖赏，并只需利用定期存款利息为 Lucas 锁定 PRUMy Child Plus（涵盖27种先天疾病、新生儿黄疸、自闭症/ADHD 及 PRUSaver Kid 大学教育金 + 父母保费豁免）。趁宝宝午睡时，我发一份2分钟简报给您参考好吗？😊",
        defaultEmail:
          "主题：小 Lucas 少儿保障客观对比：大马保诚 (PRUMy Child Plus) vs 友邦 (AIA A-Life Joy Xtra)\n\n伟明、晓雯 您好：\n以下是大马保诚 (PAMB) 相比友邦 AIA A-Life Joy Xtra 的 3 大客观条款优势：\n1. 免费高达 +50% 自动保额递增：PRUWith You Plus 每年免费增加 1% 保额（最高 +50%），无需像 AIA Vitality 那样每年缴付会员费或运动打卡。\n2. 立即申领 RM 500 生育现金奖赏 + 27 种先天性疾病与自闭症/ADHD 保障及双亲豁免保费。\n3. 15% 实际保费现金折扣：PRUMillion Med Active 2.0 在无索赔时直接减免 15% 现金保费（AIA 仅把额度存入有条件的 Health Wallet）。\n\n我们周四晚 8 点用 10 分钟 Zoom 对照一下具体利益表吧！",
      },
      yue: {
        shortLabel: "初生 BB",
        customerName: "陳偉明 & 林曉雯 (32歲，PJ 八打靈再也)",
        existingGap: "舊 RM 15萬單人醫藥卡 • RM 0 BB 先天病同大學教育基金",
        lifeEvent: "啱啱喺 PJ 私家醫院生咗第一胎男 B (Lucas)",
        pambPlan: "PRUMy Child Plus (PRUSaver Kid) + PRUWith You Plus + PRUMillion Med Active 2.0",
        aiaPlan: "AIA A-Life Joy Xtra + A-Plus BabyCare + A-Plus Health360",
        customerReply:
          "「唔該晒你張咁靚嘅賀卡同 WhatsApp 呀！啱啱有個 AIA Agent quote 咗份 AIA A-Life Joy Xtra + A-Plus BabyCare 俾我哋。你可唔可以 Email 份保誠 vs AIA 嘅客觀比較俾我睇下？」",
        cardHeadline: "歡迎嚟到呢個世界，Lucas BB！🌟",
        cardChips: [
          "歡迎嚟到呢個世界，Lucas BB！🌟",
          "恭喜偉明同曉雯添丁之喜，Lucas BB 快高長大！🍼",
        ],
        whatsappChips: [
          "拎 RM 500 生 B 現金獎賞 (PRUWith You Plus) + 淨係用 FD 利息幫 BB 鎖定 27 種先天病同 PRUSaver Kid 大學基金",
          "鎖定 PRUMy Child Plus（黃疸、自閉症/ADHD 保到7歲 + 父母保費豁免）趁 BB 瞓覺 send 份 2 分鐘懶人包俾你",
        ],
        aiaFacts: [
          "✓ 免費 +50% 自動加大保額（PRUWith You Plus 每年免費 +1%，唔使交 AIA Vitality 會費同做運動打卡）",
          "✓ 即拎 RM 500 生 B 現金獎賞 + 保齊 27 種先天病同自閉症/ADHD",
          "✓ 無 Claim 直接減 15% 現金保費（PRUMillion Med Active 2.0 真減保費 vs AIA 淨係入落 Health Wallet）",
        ],
        defaultWhatsapp:
          "偉明、曉雯，恭喜晒你哋迎接小王子 Lucas BB 呀！🍼✨ 我特登整咗呢張賀卡送俾你哋一家。\n\n順便提一提：你哋透過 PRUWith You Plus 可以即刻 claim RM 500 生 B 現金獎賞，仲可以淨係用銀行 FD 定期啲利息幫 Lucas 鎖定 PRUMy Child Plus（保 27 種先天病、初生黃疸、自閉症/ADHD 兼夾 PRUSaver Kid 大學基金 + 父母保費豁免）。趁 BB 瞓緊晏覺，我 WhatsApp 份 2 分鐘懶人包俾你哋睇下好冇？😊",
        defaultEmail:
          "主題：Lucas BB 保障客觀比較：大馬保誠 (PRUMy Child Plus) vs 友邦 (AIA A-Life Joy Xtra)\n\n偉明、曉雯 你好：\n以下係大馬保誠 (PAMB) 對比 AIA A-Life Joy Xtra 嘅 3 個真實條款優勢：\n1. 免費高達 +50% 自動加大保額：PRUWith You Plus 每年免費加 1% 保額（最高 +50%），完全唔使好似 AIA Vitality 咁年年交會費同做運動打卡。\n2. 即刻拎 RM 500 生 B 現金獎賞 + 保齊 27 種先天病、自閉症/ADHD 兼父母豁免保費。\n3. 直接減 15% 現金保費：PRUMillion Med Active 2.0 只要無索償就直接減 15% 保費（AIA 係收足保費、只係撥入有條件限制嘅 Health Wallet）。\n\n我哋星期四晚 8 點鐘開個 10 分鐘 Zoom 一齊對下張表啦！",
      },
      ms: {
        shortLabel: "Bayi Baru Lahir",
        customerName: "Tan Wei Ming & Chloe Lim (32, PJ)",
        existingGap: "Kad perubatan lama RM 150k • RM 0 perlindungan kongenital / tabung universiti anak",
        lifeEvent: "Menyambut kelahiran bayi lelaki pertama (Lucas) di hospital swasta PJ",
        pambPlan: "PRUMy Child Plus (PRUSaver Kid) + PRUWith You Plus + PRUMillion Med Active 2.0",
        aiaPlan: "AIA A-Life Joy Xtra + A-Plus BabyCare + A-Plus Health360",
        customerReply:
          "\"Terima kasih atas kad ucapan & WhatsApp yang menarik! Ejen AIA baru sahaja memberi sebut harga AIA A-Life Joy Xtra + A-Plus BabyCare. Boleh e-melkan perbandingan berfakta antara Prudential dan AIA?\"",
        cardHeadline: "Selamat Datang ke Dunia, Bayi Lucas! 🌟",
        cardChips: [
          "Selamat Datang ke Dunia, Bayi Lucas! 🌟",
          "Tahniah kepada Keluarga Wei Ming & Chloe atas Kelahiran Bayi Lucas! 🍼",
        ],
        whatsappChips: [
          "Tuntut Ganjaran Tunai Kelahiran RM 500 (PRUWith You Plus) + lindungi 27 penyakit kongenital & tabung universiti PRUSaver Kid guna faedah FD",
          "Kunci PRUMy Child Plus (jaundis, Autisme/ADHD hingga umur 7 tahun + Penepian Pembayar) & hantar ringkasan 2 minit",
        ],
        aiaFacts: [
          "✓ Peningkatan Automatik +50% Percuma (PRUWith You Plus +1%/thn percuma lwn yuran tahunan AIA Vitality)",
          "✓ Ganjaran Tunai Kelahiran RM 500 Segera + 27 Keadaan Kongenital & Autisme/ADHD",
          "✓ Diskaun Tunai Premium 15% (PRUMillion Med Active 2.0 lwn Dompet Kesihatan bersyarat AIA)",
        ],
        defaultWhatsapp:
          "Hai Wei Ming & Chloe! Tahniah atas kelahiran Bayi Lucas! 🍼✨ Saya sediakan kad ucapan khas ini untuk keluarga anda.\n\nMakluman ringkas: anda layak menuntut Ganjaran Tunai Kelahiran RM 500 di bawah PRUWith You Plus, serta mengunci PRUMy Child Plus (27 keadaan kongenital, jaundis, Autisme/ADHD + tabung universiti PRUSaver Kid dengan Penepian Pembayar) hanya menggunakan faedah FD anda. Boleh saya hantarkan ringkasan 2 minit? 😊",
        defaultEmail:
          "Subjek: Perbandingan Berfakta untuk Bayi Lucas: PAMB (PRUMy Child Plus) lwn AIA (A-Life Joy Xtra)\n\nHai Wei Ming & Chloe,\nBerikut ialah 3 sebab berfakta mengapa PAMB memberi nilai lebih kukuh berbanding AIA A-Life Joy Xtra:\n1. Peningkatan Jumlah Diinsuranskan Automatik +50% Percuma: PRUWith You Plus meningkatkan perlindungan +1%/tahun sehingga +50% pada kos tambahan RM 0 (tanpa yuran keahlian AIA Vitality).\n2. Ganjaran Tunai Kelahiran RM 500 Segera + 27 Keadaan Kongenital & Penepian Pembayar.\n3. Diskaun Premium Tunai 15%: PRUMillion Med Active 2.0 mengurangkan bayaran premium perubatan anda sebanyak 15% apabila tiada tuntutan (AIA hanya mengkreditkan Health Wallet bersyarat).\n\nJom kita buat panggilan Zoom 10 minit Khamis ini jam 8 malam!",
      },
      ta: {
        shortLabel: "பிறந்த குழந்தை",
        customerName: "டான் வெய் மிங் & குளோயி லிம் (32, PJ)",
        existingGap: "பழைய RM 150k மருத்துவ அட்டை • RM 0 குழந்தை பிறவி நோய் / பல்கலைக்கழக நிதி",
        lifeEvent: "PJ தனியார் மருத்துவமனையில் முதல் ஆண் குழந்தை (Lucas) பிறந்துள்ளது",
        pambPlan: "PRUMy Child Plus (PRUSaver Kid) + PRUWith You Plus + PRUMillion Med Active 2.0",
        aiaPlan: "AIA A-Life Joy Xtra + A-Plus BabyCare + A-Plus Health360",
        customerReply:
          "\"அழகான வாழ்த்து அட்டை மற்றும் WhatsApp செய்திக்கு நன்றி! ஒரு AIA முகவர் AIA A-Life Joy Xtra + A-Plus BabyCare திட்டத்தை பரிந்துரைத்தார். Prudential மற்றும் AIA இடையேயான உண்மையான ஒப்பீட்டை மின்னஞ்சல் செய்ய முடியுமா?\"",
        cardHeadline: "உலகிற்கு நல்வரவு, குழந்தை லூகாஸ் (Lucas)! 🌟",
        cardChips: [
          "உலகிற்கு நல்வரவு, குழந்தை லூகாஸ் (Lucas)! 🌟",
          "டான் குடும்பத்தினருக்கும் குழந்தை லூகாஸுக்கும் இனிய வாழ்த்துகள்! 🍼",
        ],
        whatsappChips: [
          "RM 500 குழந்தை பிறப்பு ரொக்கப் பரிசு (PRUWith You Plus) + FD வட்டி மூலம் 27 பிறவி நோய்கள் & PRUSaver Kid கல்வி நிதி",
          "PRUMy Child Plus (மஞ்சள் காமாலை, ஆட்டிசம்/ADHD + Payor Waiver) திட்டத்தின் 2 நிமிட சுருக்கத்தை அனுப்புக",
        ],
        aiaFacts: [
          "✓ இலவச +50% தானியங்கி காப்பீட்டு உயர்வு (PRUWith You Plus +1%/ஆண்டு இலவசம் vs AIA Vitality கட்டணம்)",
          "✓ உடனடி RM 500 குழந்தை பிறப்பு ரொக்கப் பரிசு + 27 பிறவி நோய்கள் & ஆட்டிசம்/ADHD பாதுகாப்பு",
          "✓ 15% நேரடி பிரீமியம் ரொக்கத் தள்ளுபடி (PRUMillion Med Active 2.0 vs AIA நிபந்தனை Health Wallet)",
        ],
        defaultWhatsapp:
          "வணக்கம் வெய் மிங் & குளோயி! குழந்தை லூகாஸ் பிறந்ததற்கு மனமார்ந்த வாழ்த்துகள்! 🍼✨ உங்கள் குடும்பத்திற்காக இந்த சிறப்பு வாழ்த்து அட்டையை உருவாக்கினேன்.\n\nமுக்கிய தகவல்: PRUWith You Plus மூலம் RM 500 குழந்தை பிறப்பு ரொக்கப் பரிசைப் பெறலாம், மேலும் உங்கள் FD வட்டியை மட்டுமே பயன்படுத்தி PRUMy Child Plus (27 பிறவி நோய்கள், மஞ்சள் காமாலை, ஆட்டிசம்/ADHD + PRUSaver Kid கல்வி நிதி) திட்டத்தை உறுதி செய்யலாம். 2 நிமிட சுருக்கத்தை அனுப்பட்டுமா? 😊",
        defaultEmail:
          "பொருள்: குழந்தை லூகாஸிற்கான உண்மையான ஒப்பீடு: PAMB (PRUMy Child Plus) vs AIA (A-Life Joy Xtra)\n\nவணக்கம் வெய் மிங் & குளோயி,\nAIA A-Life Joy Xtra திட்டத்தை விட PAMB சிறந்த மதிப்பை வழங்குவதற்கான 3 உண்மையான காரணங்கள்:\n1. இலவச +50% தானியங்கி காப்பீட்டு உயர்வு: PRUWith You Plus எந்த கூடுதல் கட்டணமும் இன்றி (+1%/ஆண்டு) +50% வரை காப்பீட்டை உயர்த்துகிறது (AIA Vitality உறுப்பினர் கட்டணம் தேவையில்லை).\n2. உடனடி RM 500 குழந்தை பிறப்பு ரொக்கப் பரிசு + 27 பிறவி நோய்கள் மற்றும் Payor Waiver பாதுகாப்பு.\n3. 15% நேரடி பிரீமியம் தள்ளுபடி: PRUMillion Med Active 2.0 கிளைம் இல்லாதபோது பிரீமியத்தில் 15% நேரடித் தள்ளுபடி வழங்குகிறது.\n\nவியாழக்கிழமை இரவு 8 மணிக்கு 10 நிமிட Zoom அழைப்பில் பேசலாமா!",
      },
    },
  },
  {
    id: "ci_health_scare",
    icon: "❤️‍🩹",
    i18n: {
      en: {
        shortLabel: "Age 40 & Heart Scare",
        customerName: "Jason Khoo (39, Penang Tech Director)",
        existingGap: "Old RM 100k Life policy • RM 0 Critical Illness income shield",
        lifeEvent: "Turning 40 next month; partner had emergency RM 95k heart stent",
        pambPlan: "PRUAll Care + PRUMillion Med Active 2.0 + PRUMan",
        aiaPlan: "AIA A-Life Beyond Critical Care + A-Plus Health360",
        customerReply:
          "\"Appreciate the 40th birthday card, bro! My friend at AIA pitched AIA A-Life Beyond Critical Care + A-Plus Health360. Email me how Prudential compares factually!\"",
        cardHeadline: "Cheers to 40 Years of Leadership & Peak Health, Jason! 🥂",
        cardChips: [
          "Cheers to 40 Years of Leadership & Peak Health, Jason! 🥂",
          "Happy 40th Milestone Birthday, Jason Khoo! 🛡️",
        ],
        whatsappChips: [
          "Lock in age-39 rates before next month: PRUAll Care (~190 CI conditions + ICU + 20% Recovery Care) + PRUMillion Med Active 2.0 (15% discount)",
          "Add PRUMan (260% male CI cover + up to 110% total premium refund at maturity—zero 'dead money')",
        ],
        aiaFacts: [
          "✓ Covers ~190 CI Conditions to Age 100 (PRUAll Care vs. AIA A-Life Beyond expiring at Age 80)",
          "✓ 15% Instant Cash Premium Discount (PRUMillion Med Active 2.0 vs. AIA Health360 wallet credit)",
          "✓ Up to 110% Maturity Refund (PRUMan 260% male CI + 110% refund if healthy)",
        ],
        defaultWhatsapp:
          "Happy early 40th Birthday, Jason! 🥂 Glad your partner is recovering well after his cardiac stent—I made this milestone card for your 40th.\n\nBefore your age-40 rate jump next month, we can lock in PRUAll Care (~190 CI conditions + ICU + 20% Recovery Care) and PRUMillion Med Active 2.0 (RM 8M medical limit + 15% claim-free discount). Free for a 10-min coffee in Bayan Lepas this week? ☕",
        defaultEmail:
          "Subject: Factual Comparison Before Age 40: PAMB (PRUAll Care) vs. AIA (A-Life Beyond Critical Care)\n\nHi Jason,\nHere is the factual side-by-side between Prudential Malaysia and AIA before your age-39 window closes:\n1. Coverage to Age 100 & ~190 Conditions: PAMB PRUAll Care covers ~190 illnesses up to Age 100 (including ICU >=120 hrs & Mental Health), whereas AIA A-Life Beyond Critical Care expires at Age 80.\n2. 15% Direct Premium Discount: PAMB PRUMillion Med Active 2.0 cuts your cash premium by 15% when claim-free (AIA charges full premium and only credits a Health Wallet).\n3. 110% Premium Refund: PAMB PRUMan gives 260% male CI cover + up to 110% maturity refund.\n\nLet's review the 1-page rate sheet over coffee this Thursday!",
      },
      "zh-CN": {
        shortLabel: "40岁生日与心脏警讯",
        customerName: "邱家豪 Jason Khoo (39岁，槟城科技总监)",
        existingGap: "旧 RM 10万寿险 • RM 0 重疾收入替代与高端医疗",
        lifeEvent: "下个月满 40 岁；合伙人刚做 RM 9.5万紧急心脏支架手术",
        pambPlan: "PRUAll Care + PRUMillion Med Active 2.0 + PRUMan",
        aiaPlan: "AIA A-Life Beyond Critical Care + A-Plus Health360",
        customerReply:
          "“谢谢你的40岁生日贺卡兄弟！我一位做 AIA 的朋友刚推荐了 AIA A-Life Beyond Critical Care + A-Plus Health360。你能发封电邮客观对比保诚和 AIA 的条款吗？”",
        cardHeadline: "致敬 40 岁卓越领导力与巅峰健康，Jason！🥂",
        cardChips: [
          "致敬 40 岁卓越领导力与巅峰健康，Jason！🥂",
          "祝 Jason Khoo 40 岁里程碑生日快乐，事业家庭双丰收！🛡️",
        ],
        whatsappChips: [
          "赶在下月满40岁保费跳涨前锁定39岁费率：PRUAll Care（~190种重疾+ICU+20%康复津贴）+ PRUMillion Med Active 2.0（15%保费折扣）",
          "搭配 PRUMan（高达260%男性危疾保障 + 满期健康退还高达110%总保费，绝不白交保费）",
        ],
        aiaFacts: [
          "✓ 保障约 190 种重疾至 100 岁（PRUAll Care 保至100岁 vs AIA A-Life Beyond 仅保至80岁）",
          "✓ 无索赔享 15% 现金保费折扣（PRUMillion Med Active 2.0 直接扣减保费 vs AIA 仅记入钱包）",
          "✓ 满期退还高达 110% 总保费（PRUMan 提供260%男性危疾保障 + 110%满期退费）",
        ],
        defaultWhatsapp:
          "Jason，提前祝你 40 岁生日快乐！🥂 听说你合伙人做完心脏支架手术恢复得不错，我特意为你制作了这张 40 岁里程碑贺卡。\n\n趁下个月满 40 岁保费跳涨前，我们可以用 39 岁健康费率锁定 PRUAll Care（涵盖约190种重疾、ICU 满120小时及额外20%康复护理金）与 PRUMillion Med Active 2.0（RM 800万年度医疗限额 + 无索赔15%现金保费折扣）。本周在 Bayan Lepas 喝杯10分钟咖啡聊聊？☕",
        defaultEmail:
          "主题：40岁前重疾与医疗客观对比：大马保诚 (PRUAll Care) vs 友邦 (AIA A-Life Beyond Critical Care)\n\nJason 您好：\n赶在您 39 岁费率窗口关闭前，为您整理大马保诚与友邦 AIA 的 3 大客观条款差异：\n1. 保至 100 岁且涵盖约 190 种疾病：保诚 PRUAll Care 保障约 190 种严重疾病至 100 岁（含 ICU >=120 小时及精神健康），而 AIA A-Life Beyond Critical Care 仅保至 80 岁。\n2. 15% 直接现金保费折扣：保诚 PRUMillion Med Active 2.0 在无索赔时直接减免 15% 现金保费（AIA 仍收全额保费，仅把额度记入 Health Wallet）。\n3. 高达 110% 保费退还：保诚 PRUMan 提供高达 260% 男性危疾赔付，若平安满期可退还高达 110% 已缴总保费。\n\n这周四喝咖啡时我带一页式费率对比表给您过目！",
      },
      yue: {
        shortLabel: "40歲生日兼心臟警號",
        customerName: "邱家豪 Jason Khoo (39歲，檳城 Tech 總監)",
        existingGap: "舊 RM 10萬人壽 • RM 0 危疾收入保障",
        lifeEvent: "下個月踏入 40 歲；生意拍檔啱啱通波仔使咗 RM 95k",
        pambPlan: "PRUAll Care + PRUMillion Med Active 2.0 + PRUMan",
        aiaPlan: "AIA A-Life Beyond Critical Care + A-Plus Health360",
        customerReply:
          "「多謝你張 40 歲生日卡呀 Bro！我有個做 AIA 嘅 friend 啱啱 sell 我 AIA A-Life Beyond Critical Care + A-Plus Health360。你可唔可以 Email 份保誠 vs AIA 嘅真實比較俾我睇？」",
        cardHeadline: "賀 Jason 40 歲事業巔峰、身體健康！🥂",
        cardChips: [
          "賀 Jason 40 歲事業巔峰、身體健康！🥂",
          "祝 Jason Khoo 40 歲大壽快樂，健康同事業一樣咁勁！🛡️",
        ],
        whatsappChips: [
          "趕喺下個月 40 歲加價前鎖定 39 歲保費：PRUAll Care（~190種危疾+ICU+20%康復金）+ PRUMillion Med Active 2.0（15%保費折扣）",
          "加埋 PRUMan（高達 260% 男士危疾 + 期滿無索償退返高達 110% 總保費，一啲都唔會蝕底）",
        ],
        aiaFacts: [
          "✓ 保約 190 種危疾到 100 歲（PRUAll Care 保到100歲 vs AIA A-Life Beyond 80歲就滿期）",
          "✓ 無 Claim 直接減 15% 現金保費（PRUMillion Med Active 2.0 真係減保費 vs AIA 入落 Wallet）",
          "✓ 期滿退返高達 110% 總保費（PRUMan 260% 男士危疾 + 110% 退費）",
        ],
        defaultWhatsapp:
          "Jason，預祝你 40 歲生日快樂呀！🥂 聽講你拍檔通完波仔康復得幾好，我特登整咗呢張 40 歲里程碑賀卡俾你。\n\n趁下個月踏入 40 歲保費跳升之前，我哋可以用 39 歲靚價鎖定 PRUAll Care（保約190種危疾 + ICU + 20%康復津貼）同埋 PRUMillion Med Active 2.0（RM 800萬醫療額 + 無索償減 15% 保費）。今個禮拜喺 Bayan Lepas 飲杯咖啡傾 10 分鐘？☕",
        defaultEmail:
          "主題：40歲前危疾醫療客觀比較：大馬保誠 (PRUAll Care) vs 友邦 (AIA A-Life Beyond Critical Care)\n\nHi Jason：\n趕喺你 39 歲保費窗口閂門之前，同你客觀對比大馬保誠同 AIA 嘅 3 大分別：\n1. 保到 100 歲兼包約 190 種病：保誠 PRUAll Care 保約 190 種危疾直到 100 歲（包埋 ICU >=120個鐘同埋精神健康），相反 AIA A-Life Beyond Critical Care 去到 80 歲就完。\n2. 直接減 15% 現金保費：保誠 PRUMillion Med Active 2.0 只要無 claim 就真金白銀減 15% 保費（AIA 照收全額保費，只係撥落 Health Wallet）。\n3. 高達 110% 保費退還：保誠 PRUMan 俾到 260% 男士危疾保障，平安到尾仲退返高達 110% 總保費。\n\n星期四飲咖啡嗰陣我帶埋張一頁紙對比表俾你過目！",
      },
      ms: {
        shortLabel: "Umur 40 & Kejutan Jantung",
        customerName: "Jason Khoo (39, Pengarah Teknologi Pulau Pinang)",
        existingGap: "Polisi Hayat lama RM 100k • RM 0 perisai pendapatan Penyakit Kritikal",
        lifeEvent: "Bakal mencecah umur 40 bulan depan; rakan kongsi jalani sten jantung RM 95k",
        pambPlan: "PRUAll Care + PRUMillion Med Active 2.0 + PRUMan",
        aiaPlan: "AIA A-Life Beyond Critical Care + A-Plus Health360",
        customerReply:
          "\"Terima kasih atas kad hari jadi ke-40, bro! Rakan saya di AIA mencadangkan AIA A-Life Beyond Critical Care + A-Plus Health360. E-melkan kepada saya perbandingan berfakta dengan Prudential!\"",
        cardHeadline: "Tahniah 40 Tahun Kepimpinan & Kesihatan Unggul, Jason! 🥂",
        cardChips: [
          "Tahniah 40 Tahun Kepimpinan & Kesihatan Unggul, Jason! 🥂",
          "Selamat Hari Jadi Ke-40, Jason Khoo! 🛡️",
        ],
        whatsappChips: [
          "Kunci kadar umur 39 sebelum bulan depan: PRUAll Care (~190 keadaan CI + ICU + 20% Penjagaan Pemulihan) + PRUMillion Med Active 2.0 (diskaun 15%)",
          "Tambah PRUMan (260% perlindungan CI lelaki + sehingga 110% pulangan premium semasa matang)",
        ],
        aiaFacts: [
          "✓ Melindungi ~190 Keadaan CI hingga Umur 100 (PRUAll Care lwn AIA A-Life Beyond tamat pada Umur 80)",
          "✓ Diskaun Premium Tunai 15% (PRUMillion Med Active 2.0 lwn kredit dompet AIA Health360)",
          "✓ Pulangan Matang Sehingga 110% (PRUMan 260% CI lelaki + 110% pulangan jika sihat)",
        ],
        defaultWhatsapp:
          "Selamat menyambut Hari Jadi ke-40 awal, Jason! 🥂 Syukur rakan kongsi anda semakin pulih selepas pembedahan sten jantung—saya reka kad khas ini untuk ulang tahun ke-40 anda.\n\nSebelum kadar premium umur 40 meningkat bulan depan, kita boleh kunci PRUAll Care (~190 keadaan CI + ICU + 20% Penjagaan Pemulihan) dan PRUMillion Med Active 2.0 (had RM 8 Juta + diskaun 15% tanpa tuntutan). Jom minum kopi 10 minit di Bayan Lepas minggu ini? ☕",
        defaultEmail:
          "Subjek: Perbandingan Berfakta Sebelum Umur 40: PAMB (PRUAll Care) lwn AIA (A-Life Beyond Critical Care)\n\nHai Jason,\nBerikut ialah perbandingan berfakta antara Prudential Malaysia dan AIA sebelum tetingkap umur 39 anda ditutup:\n1. Perlindungan hingga Umur 100 & ~190 Keadaan: PAMB PRUAll Care melindungi ~190 penyakit sehingga Umur 100 (termasuk ICU >=120 jam & Kesihatan Mental), manakala AIA A-Life Beyond Critical Care tamat pada Umur 80.\n2. Diskaun Premium Langsung 15%: PAMB PRUMillion Med Active 2.0 memotong premium tunai anda sebanyak 15% apabila tiada tuntutan.\n3. Pulangan Premium 110%: PAMB PRUMan memberi 260% perlindungan CI lelaki + sehingga 110% pulangan premium semasa matang.\n\nMari kita semak jadual kadar 1 halaman sambil minum kopi Khamis ini!",
      },
      ta: {
        shortLabel: "வயது 40 & இதய சிகிச்சை எச்சரிக்கை",
        customerName: "ஜேசன் கூ (Jason Khoo, 39, பினாங்கு தொழில்நுட்ப இயக்குநர்)",
        existingGap: "பழைய RM 100k ஆயுள் பாலிசி • RM 0 தீவிர நோய் (CI) வருமான பாதுகாப்பு",
        lifeEvent: "அடுத்த மாதம் 40 வயது; தொழில் கூட்டாளிக்கு RM 95k அவசர இதய ஸ்டென்ட் சிகிச்சை",
        pambPlan: "PRUAll Care + PRUMillion Med Active 2.0 + PRUMan",
        aiaPlan: "AIA A-Life Beyond Critical Care + A-Plus Health360",
        customerReply:
          "\"40வது பிறந்தநாள் வாழ்த்து அட்டைக்கு நன்றி சகோதரா! எனது AIA நண்பர் AIA A-Life Beyond Critical Care + A-Plus Health360 திட்டத்தை பரிந்துரைத்தார். Prudential உடன் உண்மையான ஒப்பீட்டை மின்னஞ்சல் செய்யவும்!\"",
        cardHeadline: "40 ஆண்டு தலைமைத்துவம் & சிறந்த ஆரோக்கியத்திற்கு வாழ்த்துகள் ஜேசன்! 🥂",
        cardChips: [
          "40 ஆண்டு தலைமைத்துவம் & சிறந்த ஆரோக்கியத்திற்கு வாழ்த்துகள் ஜேசன்! 🥂",
          "இனிய 40வது பிறந்தநாள் நல்வாழ்த்துகள், ஜேசன் கூ! 🛡️",
        ],
        whatsappChips: [
          "அடுத்த மாதம் 40 வயது கட்டண உயர்வுக்கு முன் 39 வயது கட்டணத்தில் PRUAll Care (~190 CI + ICU + 20% Recovery Care) உறுதி செய்க",
          "PRUMan (260% ஆண்கள் தீவிர நோய் காப்பீடு + முதிர்வில் 110% வரை பிரீமியம் திரும்பப் பெறுதல்) சேர்க்கவும்",
        ],
        aiaFacts: [
          "✓ 100 வயது வரை ~190 தீவிர நோய்களுக்கு பாதுகாப்பு (PRUAll Care vs 80 வயதில் முடியும் AIA A-Life Beyond)",
          "✓ 15% நேரடி பிரீமியம் ரொக்கத் தள்ளுபடி (PRUMillion Med Active 2.0 vs AIA Health360 வாலட்)",
          "✓ முதிர்வில் 110% வரை பிரீமியம் திரும்பப் பெறுதல் (PRUMan 260% CI + 110% refund)",
        ],
        defaultWhatsapp:
          "இனிய 40வது பிறந்தநாள் நல்வாழ்த்துகள் ஜேசன்! 🥂 உங்கள் தொழில் கூட்டாளி இதய சிகிச்சைக்குப் பிறகு நலமாகத் தேறி வருவது மகிழ்ச்சி—உங்களுக்காக இந்த சிறப்பு வாழ்த்து அட்டையை உருவாக்கினேன்.\n\nஅடுத்த மாதம் 40 வயது பிரீமியம் உயர்வுக்கு முன், PRUAll Care (~190 தீவிர நோய்கள் + ICU + 20% Recovery Care) மற்றும் PRUMillion Med Active 2.0 (RM 8M மருத்துவ வரம்பு + 15% தள்ளுபடி) திட்டங்களை உறுதி செய்யலாம். இந்த வாரம் Bayan Lepas-ல் 10 நிமிடம் காபி அருந்தலாமா? ☕",
        defaultEmail:
          "பொருள்: 40 வயதுக்கு முன் உண்மையான ஒப்பீடு: PAMB (PRUAll Care) vs AIA (A-Life Beyond Critical Care)\n\nவணக்கம் ஜேசன்,\nஉங்கள் 39 வயது சலுகை முடிவதற்குள் Prudential Malaysia மற்றும் AIA இடையேயான உண்மையான ஒப்பீடு:\n1. 100 வயது வரை பாதுகாப்பு & ~190 நோய்கள்: PAMB PRUAll Care 100 வயது வரை ~190 நோய்களை உள்ளடக்கியது (AIA A-Life Beyond Critical Care 80 வயதில் முடிவடைகிறது).\n2. 15% நேரடி பிரீமியம் தள்ளுபடி: PAMB PRUMillion Med Active 2.0 கிளைம் இல்லாதபோது 15% நேரடி ரொக்கத் தள்ளுபடி தருகிறது.\n3. 110% பிரீமியம் திரும்பப் பெறுதல்: PAMB PRUMan 260% ஆண்கள் CI பாதுகாப்பு + முதிர்வில் 110% வரை பிரீமியம் திரும்பத் தருகிறது.\n\nஇந்த வியாழக்கிழமை காபி சந்திப்பில் 1 பக்க அட்டவணையைப் பார்ப்போம்!",
      },
    },
  },
  {
    id: "new_home_mortgage",
    icon: "🏡",
    i18n: {
      en: {
        shortLabel: "New RM 1.3M Home",
        customerName: "Amirul Hakim & Farah Nadia (35, JB)",
        existingGap: "Medical cards only • RM 1.3M 35-yr mortgage exposed to CI",
        lifeEvent: "Collected keys to RM 1.3M semi-D home in Eco Botanic, JB",
        pambPlan: "PRUWith You Plus (Portable MLTA) + PRUAll Care",
        aiaPlan: "AIA A-Life Link 2 / A-Life Kasih Famili + CI Rider",
        customerReply:
          "\"Terima kasih for the housewarming card! An AIA planner quoted us AIA A-Life Link 2 + CI rider for our mortgage. Can you email how PAMB compares factually?\"",
        cardHeadline: "Congratulations on Your New Eco Botanic Home! 🏡🔑",
        cardChips: [
          "Congratulations on Your New Eco Botanic Home! 🏡🔑",
          "Warmest Housewarming Wishes to Amirul & Farah! ✨",
        ],
        whatsappChips: [
          "Claim RM 500 New Home Cash Reward (PRUWith You Plus) + portable MLTA (+50% free Booster) + PRUAll Care to cover RM 5,600/mth installments during CI",
          "Explain why Bank MRTA pays RM 0 on Critical Illness while PAMB pays cash directly to spouse under FSA Statutory Trust",
        ],
        aiaFacts: [
          "✓ Unconditional +50% Auto Booster (PRUWith You Plus +1%/yr free vs. AIA Vitality fitness checks)",
          "✓ Immediate RM 500 New Home Goal Achievement Cash Reward upon collecting keys",
          "✓ ~190 CI Conditions + 20% Extra Recovery Care to pay RM 5,600/mth loan installments",
        ],
        defaultWhatsapp:
          "Huge congratulations Amirul & Farah on collecting the keys to your Eco Botanic dream home! 🏡🔑 I designed this housewarming card for you both.\n\nUnlike bank MRTA (which pays RM 0 during Critical Illness), PRUWith You Plus + PRUAll Care gives you an immediate RM 500 New Home Cash Reward, a free +50% Auto Sum Assured Booster, and covers your RM 5,600/mth installments across ~190 CI conditions. Can I send a 1-page summary? 😊",
        defaultEmail:
          "Subject: Eco Botanic Mortgage Shield Comparison: PAMB (PRUWith You Plus) vs. AIA (A-Life Link 2)\n\nHi Amirul & Farah,\nHere are 3 factual advantages of PAMB PRUWith You Plus + PRUAll Care over AIA A-Life Link 2 for your RM 1.3M mortgage:\n1. Unconditional +50% Auto Sum Assured Booster: Grows +1%/yr up to +50% at RM 0 extra cost without needing annual AIA Vitality fitness/membership fees.\n2. Immediate RM 500 New Home Cash Reward: Direct RM 500 cash payout upon buying your Eco Botanic home.\n3. ~190 CI Conditions + 20% Extra Recovery Care: Pays an extra 20% buffer on top of CI sum assured so your RM 5,600/mth loan never defaults.\n\nShall we do a 10-min call tomorrow at 8:30 PM?",
      },
      "zh-CN": {
        shortLabel: "新居 RM 130万房贷",
        customerName: "Amirul Hakim & Farah Nadia (35岁，新山 JB)",
        existingGap: "仅有医药卡 • RM 130万 35年期房贷缺乏重疾断供保障",
        lifeEvent: "刚拿到新山 Eco Botanic RM 130万半独立式洋房钥匙",
        pambPlan: "PRUWith You Plus (可携式 MLTA) + PRUAll Care",
        aiaPlan: "AIA A-Life Link 2 / A-Life Kasih Famili + CI Rider",
        customerReply:
          "“谢谢你的乔迁祝贺卡！有位 AIA 顾问刚为我们报价 AIA A-Life Link 2 + 重疾附加险来保房贷。你能发封电邮客观对比保诚和 AIA 吗？”",
        cardHeadline: "恭贺乔迁新山 Eco Botanic 梦想家园！🏡🔑",
        cardChips: [
          "恭贺乔迁新山 Eco Botanic 梦想家园！🏡🔑",
          "祝 Amirul 与 Farah 新居入伙大吉，幸福美满！✨",
        ],
        whatsappChips: [
          "申领 RM 500 购屋现金奖赏 (PRUWith You Plus) + 免费+50%保额递增 MLTA + PRUAll Care 保障患重疾时每月 RM 5,600 房贷不断供",
          "解析为何银行 MRTA 在患重疾时赔付 RM 0，而保诚通过 FSA 法定信托直接赔付现金给配偶",
        ],
        aiaFacts: [
          "✓ 无条件免费 +50% 保额自动递增（PRUWith You Plus 每年免费+1%，无需 AIA Vitality 年费）",
          "✓ 拿到新房钥匙即可申领 RM 500 购屋里程碑现金奖赏",
          "✓ 涵盖约 190 种重疾 + 额外 20% 康复津贴，确保每月 RM 5,600 房贷绝不断供",
        ],
        defaultWhatsapp:
          "衷心恭喜 Amirul 与 Farah 喜获新山 Eco Botanic 梦想新居钥匙！🏡🔑 我特意为你们设计了这张乔迁祝贺卡。\n\n不同于银行 MRTA（罹患重疾时赔付 RM 0），保诚 PRUWith You Plus + PRUAll Care 不仅让您立即申领 RM 500 购屋现金奖赏、享有免费高达 +50% 保额递增，还能在发生约 190 种重疾时替您偿还每月 RM 5,600 的房贷供期。我发一份 1 页式对比图给您看看好吗？😊",
        defaultEmail:
          "主题：Eco Botanic RM 130万房贷保障对比：大马保诚 (PRUWith You Plus) vs 友邦 (AIA A-Life Link 2)\n\nAmirul 与 Farah 您好：\n针对您 RM 130 万的新居房贷，以下是大马保诚相比 AIA A-Life Link 2 的 3 大客观优势：\n1. 无条件免费 +50% 保额自动递增：每年自动增长 1% 至最高 +50%，零额外保费，也无需缴付 AIA Vitality 健身会员费。\n2. 立即申领 RM 500 购屋现金奖赏：购买 Eco Botanic 新居即可直接获得 RM 500 现金祝贺金。\n3. 约 190 种重疾 + 额外 20% 康复护理金：在重疾保额之上额外赔付 20% 现金缓冲，确保每月 RM 5,600 房贷绝不逾期。\n\n我们明晚 8:30 通个 10 分钟电话细聊好吗？",
      },
      yue: {
        shortLabel: "新樓 RM 130萬按揭",
        customerName: "Amirul Hakim & Farah Nadia (35歲，新山 JB)",
        existingGap: "得張醫藥卡 • RM 130萬 35年供樓按揭無危疾斷供保障",
        lifeEvent: "啱啱收鎖匙入伙新山 Eco Botanic RM 130萬半獨立屋",
        pambPlan: "PRUWith You Plus (可攜式 MLTA) + PRUAll Care",
        aiaPlan: "AIA A-Life Link 2 / A-Life Kasih Famili + CI Rider",
        customerReply:
          "「多謝你張入伙賀卡呀！有個 AIA 顧問 quote 咗 AIA A-Life Link 2 + 危疾 Rider 俾我哋保層樓。你可唔可以 Email 比較下保誠同 AIA 有咩分別？」",
        cardHeadline: "恭喜入伙新山 Eco Botanic 夢想新居！🏡🔑",
        cardChips: [
          "恭喜入伙新山 Eco Botanic 夢想新居！🏡🔑",
          "祝 Amirul 同 Farah 新居入伙大吉、安居樂業！✨",
        ],
        whatsappChips: [
          "拎 RM 500 買樓現金獎賞 (PRUWith You Plus) + 免費+50%加大保額 MLTA + PRUAll Care 頂住每月 RM 5,600 供樓唔怕斷供",
          "解釋點解銀行 MRTA 中危疾係賠 RM 0，而保誠透過 FSA 法定信託直接賠現金俾另一半",
        ],
        aiaFacts: [
          "✓ 無條件免費 +50% 自動加大保額（PRUWith You Plus 每年免費+1%，唔使交 AIA Vitality 年費）",
          "✓ 收鎖匙即拎 RM 500 買樓里程碑現金獎賞",
          "✓ 保約 190 種危疾 + 額外 20% 康復金，確保每月 RM 5,600 供樓唔會斷供",
        ],
        defaultWhatsapp:
          "恭喜晒 Amirul 同 Farah 收到新山 Eco Botanic 新屋鎖匙呀！🏡🔑 我特登整咗呢張入伙賀卡送俾你哋。\n\n銀行 MRTA 萬一中危疾係賠 RM 0 㗎；相反保誠 PRUWith You Plus + PRUAll Care 一收鎖匙即送 RM 500 買樓現金獎賞、免費高達 +50% 自動加大保額，仲包約 190 種危疾幫你頂住每個月 RM 5,600 供樓。我 WhatsApp 份一頁紙懶人包俾你哋睇下？😊",
        defaultEmail:
          "主題：Eco Botanic RM 130萬按揭保障比較：大馬保誠 (PRUWith You Plus) vs 友邦 (AIA A-Life Link 2)\n\nHi Amirul & Farah：\n針對你哋 RM 130 萬新屋按揭，以下係大馬保誠對比 AIA A-Life Link 2 嘅 3 個真實優勢：\n1. 無條件免費 +50% 自動加大保額：每年自動加 1% 去到 +50%，唔使加保費，亦唔使交 AIA Vitality 會費。\n2. 即拎 RM 500 買樓現金獎賞：買 Eco Botanic 新屋即刻有 RM 500 現金獎賞。\n3. 保約 190 種危疾 + 額外 20% 康復護理金：危疾保額之上再多賠 20% 現金緩衝，保證每個月 RM 5,600 供樓絕對唔會斷供。\n\n聽晚 8 點半鐘傾個 10 分鐘電話好嗎？",
      },
      ms: {
        shortLabel: "Rumah Baru RM 1.3J",
        customerName: "Amirul Hakim & Farah Nadia (35, JB)",
        existingGap: "Kad perubatan sahaja • Pinjaman rumah RM 1.3J (35 thn) terdedah kepada risiko CI",
        lifeEvent: "Baru mengambil kunci rumah semi-D RM 1.3J di Eco Botanic, JB",
        pambPlan: "PRUWith You Plus (MLTA Mudah Alih) + PRUAll Care",
        aiaPlan: "AIA A-Life Link 2 / A-Life Kasih Famili + CI Rider",
        customerReply:
          "\"Terima kasih atas kad ucapan rumah baru! Perancang AIA memberi sebut harga AIA A-Life Link 2 + rider CI untuk gadai janji kami. Boleh e-melkan perbandingan berfakta dengan PAMB?\"",
        cardHeadline: "Tahniah atas Rumah Impian Eco Botanic Baru Anda! 🏡🔑",
        cardChips: [
          "Tahniah atas Rumah Impian Eco Botanic Baru Anda! 🏡🔑",
          "Selamat Masuk Rumah Baru kepada Amirul & Farah! ✨",
        ],
        whatsappChips: [
          "Tuntut Ganjaran Tunai Rumah Baru RM 500 (PRUWith You Plus) + MLTA mudah alih (+50% Booster percuma) + PRUAll Care lindungi ansuran RM 5,600/bln",
          "Terangkan mengapa MRTA Bank membayar RM 0 semasa Penyakit Kritikal manakala PAMB membayar tunai terus kepada pasangan di bawah Amanah Berkanun FSA",
        ],
        aiaFacts: [
          "✓ Peningkatan Automatik +50% Tanpa Syarat (PRUWith You Plus +1%/thn percuma lwn yuran AIA Vitality)",
          "✓ Ganjaran Tunai Pencapaian Rumah Baru RM 500 Segera apabila mengambil kunci",
          "✓ ~190 Keadaan CI + 20% Penjagaan Pemulihan Tambahan untuk bayar ansuran RM 5,600/bln",
        ],
        defaultWhatsapp:
          "Tahniah Amirul & Farah kerana menerima kunci rumah impian Eco Botanic anda! 🏡🔑 Saya reka kad ucapan masuk rumah baru ini khas untuk anda berdua.\n\nBerbeza dengan MRTA bank (yang membayar RM 0 semasa Penyakit Kritikal), PRUWith You Plus + PRUAll Care memberi anda Ganjaran Tunai Rumah Baru RM 500 serta-merta, Peningkatan Perlindungan Automatik +50% percuma, dan melindungi ansuran RM 5,600/bulan anda merentasi ~190 keadaan CI. Boleh saya hantarkan ringkasan 1 halaman? 😊",
        defaultEmail:
          "Subjek: Perbandingan Perisai Gadai Janji Eco Botanic: PAMB (PRUWith You Plus) lwn AIA (A-Life Link 2)\n\nHai Amirul & Farah,\nBerikut ialah 3 kelebihan berfakta PAMB PRUWith You Plus + PRUAll Care berbanding AIA A-Life Link 2 untuk gadai janji RM 1.3J anda:\n1. Peningkatan Jumlah Diinsuranskan Automatik +50% Tanpa Syarat: Meningkat +1%/tahun sehingga +50% pada kos tambahan RM 0 tanpa yuran tahunan AIA Vitality.\n2. Ganjaran Tunai Rumah Baru RM 500 Segera: Bayaran tunai terus RM 500 apabila membeli rumah Eco Botanic anda.\n3. ~190 Keadaan CI + 20% Penjagaan Pemulihan Tambahan: Membayar penimbal tambahan 20% supaya pinjaman RM 5,600/bulan anda tidak pernah tertunggak.\n\nBoleh kita berbual 10 minit esok jam 8:30 malam?",
      },
      ta: {
        shortLabel: "புதிய RM 1.3M வீடு",
        customerName: "அமிருல் ஹக்கீம் & ஃபரா நதியா (35, JB)",
        existingGap: "மருத்துவ அட்டை மட்டும் • RM 1.3M வீட்டுக் கடனுக்கு தீவிர நோய் (CI) பாதுகாப்பு இல்லை",
        lifeEvent: "ஜோகூர் பாரு Eco Botanic-ல் RM 1.3M மதிப்புள்ள புதிய வீட்டின் சாவியைப் பெற்றுள்ளனர்",
        pambPlan: "PRUWith You Plus (Portable MLTA) + PRUAll Care",
        aiaPlan: "AIA A-Life Link 2 / A-Life Kasih Famili + CI Rider",
        customerReply:
          "\"புதுமனை புகுவிழா வாழ்த்து அட்டைக்கு நன்றி! எங்கள் வீட்டுக் கடனுக்காக AIA A-Life Link 2 + CI rider திட்டத்தை ஒரு AIA முகவர் பரிந்துரைத்தார். PAMB உடன் உண்மையான ஒப்பீட்டை மின்னஞ்சல் செய்ய முடியுமா?\"",
        cardHeadline: "உங்கள் புதிய Eco Botanic இல்லத்திற்கு மனமார்ந்த வாழ்த்துகள்! 🏡🔑",
        cardChips: [
          "உங்கள் புதிய Eco Botanic இல்லத்திற்கு மனமார்ந்த வாழ்த்துகள்! 🏡🔑",
          "அமிருல் & ஃபரா தம்பதியருக்கு இனிய புதுமனை புகுவிழா வாழ்த்துகள்! ✨",
        ],
        whatsappChips: [
          "RM 500 புதிய வீடு ரொக்கப் பரிசு (PRUWith You Plus) + இலவச +50% Booster MLTA + மாதம் RM 5,600 தவணையைப் பாதுகாக்கும் PRUAll Care",
          "வங்கி MRTA தீவிர நோய்க்கு RM 0 தரும் நிலையில், PAMB FSA சட்டப்பூர்வ அறக்கட்டளை மூலம் நேரடி ரொக்கம் தருவதை விளக்குக",
        ],
        aiaFacts: [
          "✓ நிபந்தனையற்ற +50% தானியங்கி காப்பீட்டு உயர்வு (PRUWith You Plus +1%/ஆண்டு இலவசம் vs AIA Vitality கட்டணம்)",
          "✓ புதிய வீட்டு சாவி பெற்றவுடன் உடனடி RM 500 ரொக்கப் பரிசு",
          "✓ ~190 தீவிர நோய்கள் + 20% கூடுதல் Recovery Care மூலம் மாதம் RM 5,600 வீட்டுக் கடன் பாதுகாப்பு",
        ],
        defaultWhatsapp:
          "உங்கள் Eco Botanic கனவு இல்லத்தின் சாவியைப் பெற்ற அமிருல் & ஃபராவிற்கு மனமார்ந்த வாழ்த்துகள்! 🏡🔑 உங்கள் இருவருக்காகவும் இந்த வாழ்த்து அட்டையை வடிவமைத்தேன்.\n\nவங்கி MRTA போலன்றி (அது தீவிர நோயின் போது RM 0 மட்டுமே தரும்), PRUWith You Plus + PRUAll Care உங்களுக்கு உடனடி RM 500 புதிய வீடு ரொக்கப் பரிசு, இலவச +50% காப்பீட்டு உயர்வு மற்றும் ~190 தீவிர நோய்களின் போதும் மாதம் RM 5,600 கடனை அடைக்கும் பாதுகாப்பை வழங்குகிறது. 1 பக்க சுருக்கத்தை அனுப்பட்டுமா? 😊",
        defaultEmail:
          "பொருள்: Eco Botanic வீட்டுக் கடன் பாதுகாப்பு ஒப்பீடு: PAMB (PRUWith You Plus) vs AIA (A-Life Link 2)\n\nவணக்கம் அமிருல் & ஃபரா,\nஉங்கள் RM 1.3M வீட்டுக் கடனுக்கு AIA A-Life Link 2-ஐ விட PAMB சிறந்ததாக இருப்பதற்கான 3 உண்மையான காரணங்கள்:\n1. நிபந்தனையற்ற +50% தானியங்கி காப்பீட்டு உயர்வு: ஆண்டுக்கு +1% வீதம் +50% வரை இலவசமாக உயரும் (AIA Vitality கட்டணம் தேவையில்லை).\n2. உடனடி RM 500 புதிய வீடு ரொக்கப் பரிசு: உங்கள் புதிய வீட்டிற்கு RM 500 நேரடி ரொக்கப் பரிசு.\n3. ~190 தீவிர நோய்கள் + 20% கூடுதல் Recovery Care: உங்கள் RM 5,600 மாதத் தவணை தடையின்றி செலுத்தப்படுவதை உறுதி செய்கிறது.\n\nநாளை இரவு 8:30 மணிக்கு 10 நிமிடம் தொலைபேசியில் பேசலாமா?",
      },
    },
  },
  {
    id: "career_promotion",
    icon: "🌟",
    i18n: {
      en: {
        shortLabel: "Career Promotion",
        customerName: "Dr. Kavitha Pillai (42, KL Senior Consultant)",
        existingGap: "Old RM 200k policy • RM 0 female CI & high-allocation wealth",
        lifeEvent: "Promoted to Head of Department at KL hospital (Income doubled)",
        pambPlan: "PRULady + PRUElite Invest + PRUValue Med",
        aiaPlan: "AIA A-Life Lady360 + A-Life Wealth Builder",
        customerReply:
          "\"Thank you for the promotion card! A fellow consultant recommended AIA A-Life Lady360 + A-Life Wealth Builder. Could you email me a factual comparison with PAMB?\"",
        cardHeadline: "Congratulations on Leading the Department, Dr. Kavitha! 🌟",
        cardChips: [
          "Congratulations on Leading the Department, Dr. Kavitha! 🌟",
          "Celebrating Your Appointment as Head of Department! 🩺",
        ],
        whatsappChips: [
          "Claim PRULady Career Promotion Cash Reward (260% female CI + 110% maturity refund) + PRUElite Invest (103% Day-1 wealth allocation)",
          "Upgrade medical to PRUValue Med (auto-increasing Med Value Point every year) + 10-min hospital coffee invite",
        ],
        aiaFacts: [
          "✓ 260% Female CI + Up to 110% Maturity Refund + Career Promotion Cash Reward (PRULady vs. AIA Lady360)",
          "✓ 103% Day-1 Wealth Allocation (PRUElite Invest gives immediate +3% Day-1 bonus vs. AIA Wealth Builder)",
          "✓ Auto-Increasing Med Value Point Every Year + 80% continuous cover beyond limit (PRUValue Med)",
        ],
        defaultWhatsapp:
          "Warmest congratulations, Dr. Kavitha, on your appointment as Head of Department! 🌟🩺 I designed this executive card to celebrate your milestone.\n\nYour promotion unlocks a Career Promotion Cash Reward under PRULady (260% female CI cover + up to 110% maturity premium refund), paired with PRUElite Invest (103% Day-1 wealth allocation). Free for a 10-min coffee near your hospital next Tuesday? ☕",
        defaultEmail:
          "Subject: Executive Comparison for Dr. Kavitha: PAMB (PRULady & PRUElite Invest) vs. AIA (A-Life Lady360)\n\nDear Dr. Kavitha,\nHere is the factual comparison between Prudential Malaysia and AIA Malaysia for your executive portfolio:\n1. 260% Female CI + Up to 110% Maturity Refund: PAMB PRULady delivers up to 260% cover, a Career Promotion Cash Reward, and refunds up to 110% of total premiums at maturity.\n2. 103% Day-1 Wealth Allocation (PRUElite Invest): Invests 103% of your single premium on Day 1 (+3% immediate bonus), beating standard ILP/unit trust front-end charges.\n3. Auto-Increasing Med Value Point (PRUValue Med): Grows your medical limit every year + 80% continuous coverage beyond the limit.\n\nI can bring the 1-page table to your clinic lounge Tuesday at 2 PM!",
      },
      "zh-CN": {
        shortLabel: "高管晋升",
        customerName: "Dr. Kavitha Pillai (42岁，吉隆坡专科医院主任)",
        existingGap: "旧 RM 20万保单 • RM 0 女性专属危疾与高配置财富增值",
        lifeEvent: "晋升为吉隆坡私人医院专科部门主任（收入翻倍）",
        pambPlan: "PRULady + PRUElite Invest + PRUValue Med",
        aiaPlan: "AIA A-Life Lady360 + A-Life Wealth Builder",
        customerReply:
          "“谢谢你的升职祝贺卡！医院同事向我推荐了 AIA A-Life Lady360 + A-Life Wealth Builder。你能发封电邮客观对比保诚和 AIA 的差别吗？”",
        cardHeadline: "恭贺荣升专科部门主任，Dr. Kavitha！🌟",
        cardChips: [
          "恭贺荣升专科部门主任，Dr. Kavitha！🌟",
          "祝贺 Dr. Kavitha 荣任医院部门主管，医术仁心！🩺",
        ],
        whatsappChips: [
          "申领 PRULady 升职现金奖赏（260%女性危疾 + 满期高达110%保费退还）+ PRUElite Invest（首日 103% 财富配置率）",
          "升级至 PRUValue Med（Med Value Point 医疗限额每年自动递增）+ 邀约医院旁 10 分钟咖啡简报",
        ],
        aiaFacts: [
          "✓ 260% 女性危疾 + 高达 110% 满期退费 + 升职现金奖赏（PRULady vs AIA Lady360）",
          "✓ 首日 103% 财富配置（PRUElite Invest 首日即送 +3% 额外投资红利 vs AIA Wealth Builder）",
          "✓ 医疗限额每年自动递增 + 超额后仍享 80% 持续赔付（PRUValue Med）",
        ],
        defaultWhatsapp:
          "Dr. Kavitha，诚挚祝贺您荣升医院专科部门主任！🌟🩺 我特意为您设计了这张高管祝贺卡。\n\n您的晋升可直接触发 PRULady 的职业晋升现金奖赏（提供高达 260% 女性专属危疾保障 + 满期退还高达 110% 总保费），并可搭配 PRUElite Invest（首日即享 103% 资金配置率，立享 +3% 红利）。下周二在您医院附近喝杯 10 分钟咖啡聊聊好吗？☕",
        defaultEmail:
          "主题：Dr. Kavitha 专属高管方案对比：大马保诚 (PRULady & PRUElite Invest) vs 友邦 (AIA Lady360)\n\n尊敬的 Dr. Kavitha：\n以下是针对您的高管保障与财富组合，大马保诚与友邦 AIA 的 3 大客观条款对比：\n1. 高达 260% 女性危疾 + 110% 满期保费退还：保诚 PRULady 提供高达 260% 赔付、职业晋升现金奖赏，且满期退还高达 110% 已缴总保费。\n2. 首日 103% 财富配置率 (PRUElite Invest)：第 1 天即将您 103% 的保费投入增值（立即赠送 +3% 红利），远超传统投资联结险或信托基金的前端收费。\n3. 医疗限额每年自动递增 (PRUValue Med)：不论有无索赔，每年自动提高 Med Value Point，超额后仍持续赔付 80%。\n\n我周二下午 2 点把一页式对比表带到您诊所休息室给您过目！",
      },
      yue: {
        shortLabel: "升職做部門主管",
        customerName: "Dr. Kavitha Pillai (42歲，KL 高級專科醫生)",
        existingGap: "舊 RM 20萬保單 • RM 0 女性危疾同埋高配置財富增值",
        lifeEvent: "升職做 KL 私家醫院部門主管（人工翻倍）",
        pambPlan: "PRULady + PRUElite Invest + PRUValue Med",
        aiaPlan: "AIA A-Life Lady360 + A-Life Wealth Builder",
        customerReply:
          "「多謝你張升職賀卡呀！有個醫生同事介紹咗 AIA A-Life Lady360 + A-Life Wealth Builder 俾我。你可唔可以 Email 份保誠 vs AIA 嘅客觀比較俾我睇下？」",
        cardHeadline: "恭喜榮升部門主管，Dr. Kavitha！🌟",
        cardChips: [
          "恭喜榮升部門主管，Dr. Kavitha！🌟",
          "賀 Dr. Kavitha 榮任醫院部門主管，步步高陞！🩺",
        ],
        whatsappChips: [
          "拎 PRULady 升職現金獎賞（260%女性危疾 + 期滿退返高達110%保費）+ PRUElite Invest（Day 1 即有 103% 財富配置）",
          "升級去 PRUValue Med（Med Value Point 醫療額年年自動加）+ 約喺醫院樓下飲杯 10 分鐘咖啡",
        ],
        aiaFacts: [
          "✓ 260% 女性危疾 + 期滿高達 110% 退費 + 升職現金獎賞（PRULady vs AIA Lady360）",
          "✓ Day 1 即享 103% 財富配置（PRUElite Invest 第一日即送 +3% Bonus vs AIA Wealth Builder）",
          "✓ Med Value Point 年年自動遞增 + 爆額後繼續保 80%（PRUValue Med）",
        ],
        defaultWhatsapp:
          "Dr. Kavitha，恭喜晒你榮升醫院部門主管呀！🌟🩺 我特登設計咗呢張賀卡賀你升職。\n\n你今次升職可以直接喺 PRULady 拎到職業晉升現金獎賞（高達 260% 女性危疾保障 + 期滿退返高達 110% 總保費），再配搭 PRUElite Invest（Day 1 即將 103% 資金擺落投資，即送 +3% Bonus）。下個禮拜二喺你醫院附近飲杯咖啡傾 10 分鐘得唔得？☕",
        defaultEmail:
          "主題：Dr. Kavitha 行政人員方案比較：大馬保誠 (PRULady & PRUElite Invest) vs 友邦 (AIA Lady360)\n\nDear Dr. Kavitha：\n以下係大馬保誠同 AIA 針對你行政財富組合嘅 3 大真實條款比較：\n1. 高達 260% 女性危疾 + 110% 期滿保費退還：保誠 PRULady 提供高達 260% 保障、升職現金獎賞，期滿仲退返高達 110% 總保費。\n2. Day 1 即享 103% 財富配置 (PRUElite Invest)：第一日就有 103% 資金幫你滾存（即送 +3% 紅利），遠勝一般基金同 ILP 手續費。\n3. 醫療額年年自動遞增 (PRUValue Med)：無論有無 claim，Med Value Point 年年自動加，爆咗額仲持續保 80%。\n\n我禮拜二下晝 2 點帶埋張一頁紙對比表過嚟你診所 Lounge 俾你睇！",
      },
      ms: {
        shortLabel: "Kenaikan Pangkat",
        customerName: "Dr. Kavitha Pillai (42, Pakar Perunding Kanan KL)",
        existingGap: "Polisi lama RM 200k • RM 0 CI wanita & pelaburan peruntukan tinggi",
        lifeEvent: "Dinaikkan pangkat sebagai Ketua Jabatan di hospital KL (Pendapatan berganda)",
        pambPlan: "PRULady + PRUElite Invest + PRUValue Med",
        aiaPlan: "AIA A-Life Lady360 + A-Life Wealth Builder",
        customerReply:
          "\"Terima kasih atas kad ucapan kenaikan pangkat! Rakan pakar mengesyorkan AIA A-Life Lady360 + A-Life Wealth Builder. Boleh e-melkan perbandingan berfakta dengan PAMB?\"",
        cardHeadline: "Tahniah atas Pelantikan sebagai Ketua Jabatan, Dr. Kavitha! 🌟",
        cardChips: [
          "Tahniah atas Pelantikan sebagai Ketua Jabatan, Dr. Kavitha! 🌟",
          "Meraikan Pelantikan Dr. Kavitha sebagai Ketua Jabatan! 🩺",
        ],
        whatsappChips: [
          "Tuntut Ganjaran Tunai Kenaikan Pangkat PRULady (260% CI wanita + 110% pulangan matang) + PRUElite Invest (103% peruntukan Hari-1)",
          "Naik taraf perubatan ke PRUValue Med (Med Value Point meningkat automatik setiap tahun)",
        ],
        aiaFacts: [
          "✓ 260% CI Wanita + Pulangan Matang Sehingga 110% + Ganjaran Kenaikan Pangkat (PRULady lwn AIA Lady360)",
          "✓ Peruntukan Kekayaan Hari-1 103% (PRUElite Invest beri bonus segera +3% Hari-1 lwn AIA Wealth Builder)",
          "✓ Med Value Point Meningkat Setiap Tahun + 80% perlindungan berterusan melebihi had (PRUValue Med)",
        ],
        defaultWhatsapp:
          "Setinggi-tinggi tahniah, Dr. Kavitha, atas pelantikan anda sebagai Ketua Jabatan! 🌟🩺 Saya reka kad eksekutif ini untuk meraikan pencapaian anda.\n\nKenaikan pangkat anda melayakkan anda menerima Ganjaran Tunai Kenaikan Pangkat di bawah PRULady (260% perlindungan CI wanita + sehingga 110% pulangan premium matang), digandingkan dengan PRUElite Invest (103% peruntukan pelaburan Hari Pertama). Lapang untuk minum kopi 10 minit berhampiran hospital anda Selasa depan? ☕",
        defaultEmail:
          "Subjek: Perbandingan Eksekutif untuk Dr. Kavitha: PAMB (PRULady & PRUElite Invest) lwn AIA (A-Life Lady360)\n\nDr. Kavitha yang dihormati,\nBerikut ialah perbandingan berfakta antara Prudential Malaysia dan AIA Malaysia untuk portfolio eksekutif anda:\n1. 260% CI Wanita + Pulangan Matang Sehingga 110%: PAMB PRULady memberikan perlindungan sehingga 260%, Ganjaran Tunai Kenaikan Pangkat, dan memulangkan sehingga 110% jumlah premium semasa matang.\n2. Peruntukan Kekayaan Hari-1 103% (PRUElite Invest): Melaburkan 103% daripada premium tunggal anda pada Hari Pertama (+3% bonus segera).\n3. Med Value Point Meningkat Automatik (PRUValue Med): Meningkatkan had perubatan anda setiap tahun + 80% perlindungan berterusan melebihi had.\n\nSaya boleh bawakan jadual 1 halaman ke ruang istirahat klinik anda Selasa jam 2 petang!",
      },
      ta: {
        shortLabel: "பதவி உயர்வு (Promotion)",
        customerName: "டாக்டர் கவிதா பிள்ளை (42, KL மூத்த சிறப்பு மருத்துவர்)",
        existingGap: "பழைய RM 200k பாலிசி • RM 0 பெண்கள் தீவிர நோய் & உயர் முதலீட்டுத் திட்டம்",
        lifeEvent: "KL மருத்துவமனையில் துறைத் தலைவராக (HOD) பதவி உயர்வு (வருமானம் இருமடங்கு)",
        pambPlan: "PRULady + PRUElite Invest + PRUValue Med",
        aiaPlan: "AIA A-Life Lady360 + A-Life Wealth Builder",
        customerReply:
          "\"பதவி உயர்வு வாழ்த்து அட்டைக்கு நன்றி! சக மருத்துவர் ஒருவர் AIA A-Life Lady360 + A-Life Wealth Builder திட்டத்தை பரிந்துரைத்தார். PAMB உடனான உண்மையான ஒப்பீட்டை மின்னஞ்சல் செய்ய முடியுமா?\"",
        cardHeadline: "துறைத் தலைவராகப் பொறுப்பேற்ற டாக்டர் கவிதாவுக்கு வாழ்த்துகள்! 🌟",
        cardChips: [
          "துறைத் தலைவராகப் பொறுப்பேற்ற டாக்டர் கவிதாவுக்கு வாழ்த்துகள்! 🌟",
          "உங்கள் புதிய HOD பதவி உயர்வுக்கு மனமார்ந்த பாராட்டுகள்! 🩺",
        ],
        whatsappChips: [
          "PRULady பதவி உயர்வு ரொக்கப் பரிசு (260% பெண்கள் CI + 110% முதிர்வுத் தொகை) + PRUElite Invest (முதல் நாளில் 103% முதலீட்டு ஒதுக்கீடு)",
          "PRUValue Med (ஆண்டுதோறும் தானாக உயரும் Med Value Point) + 10 நிமிட காபி சந்திப்பு",
        ],
        aiaFacts: [
          "✓ 260% பெண்கள் CI + முதிர்வில் 110% வரை பிரீமியம் திரும்பப் பெறுதல் + பதவி உயர்வு ரொக்கப் பரிசு (PRULady vs AIA Lady360)",
          "✓ முதல் நாளில் 103% முதலீட்டு ஒதுக்கீடு (PRUElite Invest உடனடி +3% போனஸ் vs AIA Wealth Builder)",
          "✓ ஆண்டுதோறும் உயரும் Med Value Point + வரம்பைத் தாண்டியும் 80% தொடர் பாதுகாப்பு (PRUValue Med)",
        ],
        defaultWhatsapp:
          "துறைத் தலைவராகப் பதவி உயர்வு பெற்ற டாக்டர் கவிதா அவர்களுக்கு மனமார்ந்த வாழ்த்துகள்! 🌟🩺 உங்கள் சாதனையைக் கொண்டாட இந்த சிறப்பு வாழ்த்து அட்டையை உருவாக்கினேன்.\n\nஉங்கள் பதவி உயர்வு மூலம் PRULady திட்டத்தில் Career Promotion ரொக்கப் பரிசு (260% பெண்கள் CI பாதுகாப்பு + முதிர்வில் 110% வரை பிரீமியம் திரும்பப் பெறுதல்) மற்றும் PRUElite Invest (முதல் நாளிலேயே 103% முதலீட்டு ஒதுக்கீடு) பெறலாம். அடுத்த செவ்வாயன்று மருத்துவமனை அருகே 10 நிமிடம் சந்திக்கலாமா? ☕",
        defaultEmail:
          "பொருள்: டாக்டர் கவிதாவுக்கான உண்மையான ஒப்பீடு: PAMB (PRULady & PRUElite Invest) vs AIA (A-Life Lady360)\n\nஅன்புள்ள டாக்டர் கவிதா,\nPrudential Malaysia மற்றும் AIA Malaysia இடையேயான 3 உண்மையான ஒப்பீடுகள்:\n1. 260% பெண்கள் CI + 110% முதிர்வுத் தொகை: PAMB PRULady 260% வரை பாதுகாப்பும், பதவி உயர்வு ரொக்கப் பரிசும், முதிர்வில் 110% வரை பிரீமியத்தையும் திரும்ப வழங்குகிறது.\n2. முதல் நாளில் 103% முதலீட்டு ஒதுக்கீடு (PRUElite Invest): முதல் நாளிலேயே 103% முதலீடு செய்யப்படுகிறது (+3% உடனடி போனஸ்).\n3. தானாக உயரும் Med Value Point (PRUValue Med): ஒவ்வொரு ஆண்டும் உங்கள் மருத்துவ வரம்பு உயர்கிறது + வரம்பிற்கு மேலும் 80% தொடர் பாதுகாப்பு.\n\nசெவ்வாய்க்கிழமை மதியம் 2 மணிக்கு உங்கள் கிளினிக்கில் 1 பக்க ஒப்பீட்டைக் காட்டுகிறேன்!",
      },
    },
  },
  {
    id: "sme_expansion",
    icon: "🏭",
    i18n: {
      en: {
        shortLabel: "SME RM 6M Loan",
        customerName: "Dato' Sri Raymond Tan (49, Penang Founder)",
        existingGap: "RM 18M illiquid factory • RM 5.2M bank guarantee exposure",
        lifeEvent: "Signed RM 6M personal guarantee for Phase-2 plant; UK son & Melbourne daughter",
        pambPlan: "PRUWealth Enrich 2.0 + PRUPrestige Legacy + PRUAll Care",
        aiaPlan: "AIA A-Life Legasi Beyond + A-Life Wealth Prestige",
        customerReply:
          "\"Thank you for the Batu Kawan groundbreaking card! My banker's AIA specialist pitched AIA A-Life Legasi Beyond. Email me how Prudential's corporate legacy plan compares.\"",
        cardHeadline: "Congratulations on Your Phase-2 Batu Kawan Plant! 🏭🚀",
        cardChips: [
          "Congratulations on Your Phase-2 Batu Kawan Plant! 🏭🚀",
          "Honoring Dato' Sri Raymond Tan's Industrial Legacy! 🏛️",
        ],
        whatsappChips: [
          "Use <2.5% working capital in PRUWealth Enrich 2.0 (+50% Cover Booster) to ring-fence RM 6M bank guarantee under FSA Schedule 10 Trust",
          "Equalize UK medical son (PAMB tax-free cash) & Melbourne successor daughter (100% Penang factory shares) via PRUPrestige Legacy",
        ],
        aiaFacts: [
          "✓ Automatic +30%/+50% Cover Booster & 500% Accidental Death (PRUWealth Enrich 2.0 without AIA Vitality checks)",
          "✓ 100% Day-1 Capital Allocation (PRUPrestige Legacy preserves corporate liquidity during Phase-2 capex)",
          "✓ Built-In Legacy Settlement Option + FSA Sec 130 Statutory Creditor Shield (zero private trust fees)",
        ],
        defaultWhatsapp:
          "Heartiest congratulations, Dato' Sri Raymond, on breaking ground on your Phase-2 Batu Kawan plant! 🏭🚀 I created this corporate milestone card for your group.\n\nWith <2.5% of working capital, PRUWealth Enrich 2.0 + PRUPrestige Legacy ring-fences your RM 6M personal bank guarantee under FSA Schedule 10 Statutory Trust while equalizing inheritance between your UK son (cash) and Melbourne daughter (100% factory shares). Free for a 15-min brief Thursday at 3 PM? 🤝",
        defaultEmail:
          "Subject: Corporate Keyman & Legacy Comparison: PAMB (PRUWealth Enrich 2.0) vs. AIA (A-Life Legasi Beyond)\n\nDear Dato' Sri Raymond,\nHere is the factual comparison between PAMB and AIA A-Life Legasi Beyond for your RM 6M Batu Kawan facility & family succession:\n1. Automatic +30%/+50% Cover Booster & 500% Accidental Death: PRUWealth Enrich 2.0 automatically scales your high sum assured by up to +50% and covers 500% Accidental Death without annual AIA Vitality fitness checks.\n2. 100% Day-1 Capital Allocation (PRUPrestige Legacy): Puts 100% of premium to work on Day 1, preserving cashflow liquidity during factory expansion.\n3. Legacy Settlement Option + FSA Sec 130 Creditor Shield: Protects against the RM 6M guarantee and pays structured cash to your UK son so your daughter inherits 100% of factory shares cleanly.\n\nSee you Thursday at 3 PM at your Batu Kawan office!",
      },
      "zh-CN": {
        shortLabel: "企业 RM 600万担保",
        customerName: "拿督斯里陈耀明 Dato' Sri Raymond Tan (49岁，槟城精密制造创办人)",
        existingGap: "RM 1800万厂房股权缺乏流动性 • RM 600万个人银行担保敞口",
        lifeEvent: "刚签下槟城 Batu Kawan 二期厂房 RM 600万个人担保；儿子在英国学医、女儿在墨尔本准备接班",
        pambPlan: "PRUWealth Enrich 2.0 + PRUPrestige Legacy + PRUAll Care",
        aiaPlan: "AIA A-Life Legasi Beyond + A-Life Wealth Prestige",
        customerReply:
          "“谢谢你的 Batu Kawan 二期动土祝贺卡！银行介绍的 AIA 专家刚向我推荐了 AIA A-Life Legasi Beyond。请发封电邮客观对比保诚和 AIA 的企业传承方案。”",
        cardHeadline: "恭贺 Batu Kawan 二期智能厂房隆重动土！🏭🚀",
        cardChips: [
          "恭贺 Batu Kawan 二期智能厂房隆重动土！🏭🚀",
          "致敬拿督斯里陈耀明卓越工业版图与家族传承！🏛️",
        ],
        whatsappChips: [
          "仅用 <2.5% 营运资金配置 PRUWealth Enrich 2.0（+50%保额倍增），以 FSA 第10附表法定信托隔离 RM 600万银行个人担保",
          "通过 PRUPrestige Legacy 平衡英国学医儿子（保诚免税现金）与墨尔本接班女儿（100%槟城厂房股权）的家业分配",
        ],
        aiaFacts: [
          "✓ 自动 +30%/+50% 保额倍增 & 500% 意外身故赔付（PRUWealth Enrich 2.0 无需 AIA Vitality 体检打卡）",
          "✓ 首日 100% 资本配置率（PRUPrestige Legacy 在二期扩厂期间保留高现金流价值）",
          "✓ 内置分期传承给付 (Legacy Settlement) + FSA 第130条债权人隔离保护（免高额私人信托年费）",
        ],
        defaultWhatsapp:
          "拿督斯里陈耀明，诚挚祝贺贵集团 Batu Kawan 二期厂房隆重动土！🏭🚀 我特意为贵公司制作了这张企业里程碑祝贺卡。\n\n只需动用不到 2.5% 的营运资金，PRUWealth Enrich 2.0 + PRUPrestige Legacy 即可在《2013年金融服务法令》(FSA) 第10附表法定信托下为您隔离 RM 600万银行个人担保风险，同时让英国学医的公子获得免税现金、墨尔本千金完整继承 100% 厂房股权。周四下午 3 点方便用 15 分钟向您汇报吗？🤝",
        defaultEmail:
          "主题：企业关键人物与家族传承客观对比：大马保诚 (PRUWealth Enrich 2.0) vs 友邦 (AIA A-Life Legasi Beyond)\n\n尊敬的拿督斯里陈耀明：\n针对您 Batu Kawan 二期厂房 RM 600万银行担保与子女股权传承，以下是大马保诚与 AIA A-Life Legasi Beyond 的 3 大客观优势：\n1. 自动 +30%/+50% 保额倍增与 500% 意外赔付：PRUWealth Enrich 2.0 自动提升高额保障高达 +50% 并涵盖高达 500% 意外身故，无需像 AIA Vitality 那样每年做健康打卡。\n2. 首日 100% 资本配置率 (PRUPrestige Legacy)：第 1 天即 100% 投入保单价值，在二期扩厂资本支出期间为您保留高额企业现金流。\n3. 内置分期传承给付 + FSA 法定债权人隔离：有效隔离 RM 600万个人担保，将免税现金分期拨付给英国公子，让接班千金完整持有 100% 厂房股份。\n\n周四下午 3 点在您 Batu Kawan 办公室见！",
      },
      yue: {
        shortLabel: "廠家 RM 600萬擔保",
        customerName: "拿督斯里陳耀明 Dato' Sri Raymond Tan (49歲，檳城廠家老闆)",
        existingGap: "RM 1800萬廠房股份無流動現金 • 簽咗 RM 600萬銀行個人擔保",
        lifeEvent: "啱啱簽咗檳城 Batu Kawan 二期廠房 RM 600萬個人擔保；個仔喺英國讀醫、個女喺墨爾本準備接班",
        pambPlan: "PRUWealth Enrich 2.0 + PRUPrestige Legacy + PRUAll Care",
        aiaPlan: "AIA A-Life Legasi Beyond + A-Life Wealth Prestige",
        customerReply:
          "「多謝你張 Batu Kawan 二期動土賀卡！銀行嗰位 AIA 專家啱啱向我 sell 咗 AIA A-Life Legasi Beyond。你 Email 份保誠企業傳承對比俾我睇下。」",
        cardHeadline: "恭賀 Batu Kawan 二期新廠房隆重動土！🏭🚀",
        cardChips: [
          "恭賀 Batu Kawan 二期新廠房隆重動土！🏭🚀",
          "致敬拿督斯里陳耀明工業版圖與家族傳承！🏛️",
        ],
        whatsappChips: [
          "用少過 2.5% 營運資金配置 PRUWealth Enrich 2.0（+50%加大保額），用 FSA 法定信託隔離 RM 600萬銀行個人擔保",
          "用 PRUPrestige Legacy 平衡英國讀醫個仔（保誠免稅現金）同墨爾本接班個女（100%檳城廠房股份）公平分家",
        ],
        aiaFacts: [
          "✓ 自動 +30%/+50% 保額倍增 & 500% 意外身故（PRUWealth Enrich 2.0 唔使做 AIA Vitality 運動打卡）",
          "✓ Day 1 即有 100% 資本配置（PRUPrestige Legacy 喺擴建廠房期間保留高現金流價值）",
          "✓ 內置分期傳承派發 (Legacy Settlement) + FSA 債權人隔離保護（慳返私家信託貴年費）",
        ],
        defaultWhatsapp:
          "拿督斯里陳生，恭喜晒貴集團 Batu Kawan 二期新廠房動土大吉！🏭🚀 我特登整咗呢張企業里程碑賀卡送俾你。\n\n只要用少過 2.5% 營運資金，PRUWealth Enrich 2.0 + PRUPrestige Legacy 就可以透過 FSA 法定信託幫你隔離 RM 600萬銀行個人擔保風險，仲可以俾免稅現金英國讀醫個仔、等墨爾本個女可以 100% 完整接班揸晒廠房股份。星期四下晝 3 點鐘方唔方便傾 15 分鐘？🤝",
        defaultEmail:
          "主題：企業要員與家族傳承客觀比較：大馬保誠 (PRUWealth Enrich 2.0) vs 友邦 (AIA A-Life Legasi Beyond)\n\n尊敬嘅拿督斯里陳耀明：\n針對你 Batu Kawan 二期廠房 RM 600萬銀行擔保同埋仔女接班傳承，以下係大馬保誠對比 AIA A-Life Legasi Beyond 嘅 3 大真實優勢：\n1. 自動 +30%/+50% 保額倍增兼 500% 意外保障：PRUWealth Enrich 2.0 自動加大保額高達 +50% 同埋包 500% 意外身故，唔使好似 AIA Vitality 咁每年打卡。\n2. Day 1 即享 100% 資本配置 (PRUPrestige Legacy)：第一日就 100% 擺落保單價值，喺起新廠期間保留最高企業現金流。\n3. 內置分期傳承派發 + FSA 債權人隔離：保護屋企唔受 RM 600萬擔保牽連，直接派免稅現金俾英國個仔，等你個女乾手淨腳繼承 100% 廠房股份。\n\n星期四下晝 3 點喺你 Batu Kawan Office 見！",
      },
      ms: {
        shortLabel: "Pinjaman PKS RM 6J",
        customerName: "Dato' Sri Raymond Tan (49, Pengasas Kilang Pulau Pinang)",
        existingGap: "Kilang RM 18J tidak cair • Pendedahan jaminan bank RM 5.2J",
        lifeEvent: "Menandatangani jaminan peribadi RM 6J untuk kilang Fasa-2; anak lelaki di UK & anak perempuan di Melbourne",
        pambPlan: "PRUWealth Enrich 2.0 + PRUPrestige Legacy + PRUAll Care",
        aiaPlan: "AIA A-Life Legasi Beyond + A-Life Wealth Prestige",
        customerReply:
          "\"Terima kasih atas kad pecah tanah Batu Kawan! Pakar AIA bank saya mencadangkan AIA A-Life Legasi Beyond. E-melkan kepada saya bagaimana pelan legasi korporat Prudential berbanding secara fakta.\"",
        cardHeadline: "Tahniah atas Majlis Pecah Tanah Kilang Fasa-2 Batu Kawan! 🏭🚀",
        cardChips: [
          "Tahniah atas Majlis Pecah Tanah Kilang Fasa-2 Batu Kawan! 🏭🚀",
          "Menghormati Legasi Perindustrian Dato' Sri Raymond Tan! 🏛️",
        ],
        whatsappChips: [
          "Guna <2.5% modal kerja dalam PRUWealth Enrich 2.0 (+50% Booster) untuk lindungi jaminan bank RM 6J di bawah Amanah Berkanun Jadual 10 FSA",
          "Seimbangkan warisan anak lelaki di UK (tunai bebas cukai PAMB) & anak perempuan pengganti (100% saham kilang) melalui PRUPrestige Legacy",
        ],
        aiaFacts: [
          "✓ Peningkatan Perlindungan Automatik +30%/+50% & 500% Kematian Kemalangan (PRUWealth Enrich 2.0 tanpa semakan AIA Vitality)",
          "✓ Peruntukan Modal Hari-1 100% (PRUPrestige Legacy mengekalkan kecairan korporat semasa capex Fasa-2)",
          "✓ Pilihan Penyelesaian Legasi Terbina Dalam + Perisai Pemiutang Berkanun Sek 130 FSA (sifar yuran amanah swasta)",
        ],
        defaultWhatsapp:
          "Setinggi-tinggi tahniah, Dato' Sri Raymond, atas majlis pecah tanah kilang Fasa-2 Batu Kawan anda! 🏭🚀 Saya sediakan kad pencapaian korporat ini untuk kumpulan anda.\n\nDengan <2.5% modal kerja, PRUWealth Enrich 2.0 + PRUPrestige Legacy melindungi jaminan bank peribadi RM 6J anda di bawah Amanah Berkanun Jadual 10 FSA sambil menyeimbangkan warisan antara anak lelaki anda di UK (tunai) dan anak perempuan di Melbourne (100% saham kilang). Lapang untuk taklimat 15 minit Khamis jam 3 petang? 🤝",
        defaultEmail:
          "Subjek: Perbandingan Keyman Korporat & Legasi: PAMB (PRUWealth Enrich 2.0) lwn AIA (A-Life Legasi Beyond)\n\nDato' Sri Raymond yang dihormati,\nBerikut ialah perbandingan berfakta antara PAMB dan AIA A-Life Legasi Beyond untuk kemudahan RM 6J Batu Kawan & pewarisan keluarga anda:\n1. Peningkatan Perlindungan Automatik +30%/+50% & 500% Kematian Kemalangan: PRUWealth Enrich 2.0 meningkatkan jumlah diinsuranskan sehingga +50% secara automatik tanpa pemeriksaan tahunan AIA Vitality.\n2. Peruntukan Modal Hari-1 100% (PRUPrestige Legacy): Memasukkan 100% premium untuk bekerja pada Hari Pertama, mengekalkan kecairan aliran tunai semasa pengembangan kilang.\n3. Pilihan Penyelesaian Legasi + Perisai Pemiutang Sek 130 FSA: Melindungi daripada jaminan RM 6J dan membayar tunai berstruktur kepada anak lelaki anda supaya anak perempuan anda mewarisi 100% saham kilang.\n\nJumpa anda Khamis jam 3 petang di pejabat Batu Kawan anda!",
      },
      ta: {
        shortLabel: "நிறுவன RM 6M கடன் பாதுகாப்பு",
        customerName: "டத்தோ ஸ்ரீ ரேமண்ட் டான் (49, பினாங்கு தொழிற்சாலை நிறுவனர்)",
        existingGap: "RM 18M தொழிற்சாலை பங்குகள் • RM 6M தனிப்பட்ட வங்கி உத்தரவாத அபாயம்",
        lifeEvent: "Batu Kawan இரண்டாம் கட்ட ஆலைக்காக RM 6M தனிப்பட்ட வங்கி உத்தரவாதம்; UK-வில் மகன் & மெல்போர்னில் மகள்",
        pambPlan: "PRUWealth Enrich 2.0 + PRUPrestige Legacy + PRUAll Care",
        aiaPlan: "AIA A-Life Legasi Beyond + A-Life Wealth Prestige",
        customerReply:
          "\"Batu Kawan ஆலை வாழ்த்து அட்டைக்கு நன்றி! எனது வங்கியின் AIA நிபுணர் AIA A-Life Legasi Beyond திட்டத்தை பரிந்துரைத்தார். Prudential-ன் நிறுவன வாரிசுத் திட்டம் எவ்வாறு சிறந்தது என்பதை மின்னஞ்சல் செய்யவும்.\"",
        cardHeadline: "உங்கள் Batu Kawan 2-ம் கட்ட தொழிற்சாலைக்கு வாழ்த்துகள்! 🏭🚀",
        cardChips: [
          "உங்கள் Batu Kawan 2-ம் கட்ட தொழிற்சாலைக்கு வாழ்த்துகள்! 🏭🚀",
          "டத்தோ ஸ்ரீ ரேமண்ட் டானின் தொழில் சாம்ராஜ்யத்திற்கு வாழ்த்துகள்! 🏛️",
        ],
        whatsappChips: [
          "<2.5% மூலதனத்தில் PRUWealth Enrich 2.0 (+50% Cover Booster) மூலம் FSA Schedule 10 அறக்கட்டளையின் கீழ் RM 6M வங்கி உத்தரவாதத்தை பாதுகாக்கவும்",
          "PRUPrestige Legacy மூலம் UK மகனுக்கு ரொக்கமும் மெல்போர்ன் மகளுக்கு 100% தொழிற்சாலை பங்குகளும் சமமாகக் கிடைக்கச் செய்க",
        ],
        aiaFacts: [
          "✓ தானியங்கி +30%/+50% Cover Booster & 500% விபத்து காப்பீடு (PRUWealth Enrich 2.0 - AIA Vitality நிபந்தனை இல்லை)",
          "✓ முதல் நாளில் 100% மூலதன ஒதுக்கீடு (PRUPrestige Legacy ஆலை விரிவாக்கத்தின் போது பணப்புழக்கத்தைப் பாதுகாக்கிறது)",
          "✓ உள்ளமைக்கப்பட்ட Legacy Settlement Option + FSA பிரிவு 130 கடன் பாதுகாப்பு",
        ],
        defaultWhatsapp:
          "Batu Kawan இரண்டாம் கட்ட தொழிற்சாலையைத் தொடங்கும் டத்தோ ஸ்ரீ ரேமண்ட் அவர்களுக்கு மனமார்ந்த வாழ்த்துகள்! 🏭🚀 உங்கள் நிறுவனத்திற்காக இந்த சிறப்பு வாழ்த்து அட்டையை உருவாக்கினேன்.\n\nவெறும் <2.5% மூலதனத்தில், PRUWealth Enrich 2.0 + PRUPrestige Legacy உங்கள் RM 6M வங்கி உத்தரவாதத்தை FSA Schedule 10 சட்டப்பூர்வ அறக்கட்டளையின் கீழ் பாதுகாக்கிறது; மேலும் UK மகனுக்கு வரியில்லா ரொக்கமும், மகளுக்கு 100% ஆலை பங்குகளும் கிடைக்கச் செய்கிறது. வியாழன் மதியம் 3 மணிக்கு 15 நிமிடம் பேசலாமா? 🤝",
        defaultEmail:
          "பொருள்: நிறுவன Keyman & வாரிசு ஒப்பீடு: PAMB (PRUWealth Enrich 2.0) vs AIA (A-Life Legasi Beyond)\n\nமதிப்பிற்குரிய டத்தோ ஸ்ரீ ரேமண்ட்,\nஉங்கள் RM 6M Batu Kawan ஆலை மற்றும் குடும்ப வாரிசுத் திட்டத்திற்கான PAMB vs AIA A-Life Legasi Beyond உண்மையான ஒப்பீடு:\n1. தானியங்கி +30%/+50% Cover Booster & 500% விபத்து காப்பீடு: PRUWealth Enrich 2.0 எந்த AIA Vitality நிபந்தனையும் இன்றி காப்பீட்டை +50% வரை உயர்த்துகிறது.\n2. முதல் நாளில் 100% மூலதன ஒதுக்கீடு (PRUPrestige Legacy): ஆலை விரிவாக்கத்தின் போது உங்கள் நிறுவன பணப்புழக்கத்தைப் பாதுகாக்கிறது.\n3. Legacy Settlement Option + FSA பிரிவு 130 பாதுகாப்பு: RM 6M கடன் உத்தரவாதத்திலிருந்து பாதுகாத்து, மகளுக்கு 100% ஆலை பங்குகளையும் மகனுக்கு ரொக்கத்தையும் வழங்குகிறது.\n\nவியாழக்கிழமை மதியம் 3 மணிக்கு உங்கள் Batu Kawan அலுவலகத்தில் சந்திப்போம்!",
      },
    },
  },
  {
    id: "uni_retirement_50",
    icon: "🎓",
    i18n: {
      en: {
        shortLabel: "Age 50 & Child Uni",
        customerName: "Vincent Ong & Elaine Khor (50, Ipoh / KL)",
        existingGap: "Company med ends at 60 ('Med Cliff') • Needs post-60 income",
        lifeEvent: "Vincent's 50th birthday & daughter admitted to Melbourne Uni",
        pambPlan: "PRUValue Med (Smart Deductible) + PRUElite Flex",
        aiaPlan: "AIA A-Plus Health360 (Deductible) + A-Life Wealth Venture",
        customerReply:
          "\"Lovely 50th birthday card! An AIA advisor showed us AIA A-Plus Health360 + A-Life Wealth Venture for retirement. Can you email how PAMB compares factually?\"",
        cardHeadline: "Cheers to 50 Years & Melbourne Uni Pride! 🎓🥂",
        cardChips: [
          "Cheers to 50 Years & Melbourne Uni Pride! 🎓🥂",
          "Happy Golden 50th Birthday Vincent & Congrats on Melbourne Uni! ✨",
        ],
        whatsappChips: [
          "Beat the Age-60 Company Medical Cliff: lock in PRUValue Med (Smart Deductible + yearly auto-growing Med Value Point) at age-50 health rates",
          "Protect AUD Melbourne tuition reserve & build Guaranteed Annual FlexIncome to age 100 with PRUElite Flex",
        ],
        aiaFacts: [
          "✓ Med Value Point Grows Every Year Even After a Claim + 80% cover beyond limit (AIA Wallet only grows in zero-claim years)",
          "✓ Contractually Guaranteed Annual FlexIncome to Age 100 (PRUElite Flex vs. non-guaranteed ILP returns)",
          "✓ Smart Deductible slashes premiums from age 50–60 while company medical is active",
        ],
        defaultWhatsapp:
          "Happy 50th Birthday Vincent & huge congrats on your daughter's University of Melbourne offer! 🎓🥂 I made this dual-celebration card for you and Elaine.\n\nTo beat the Age-60 Employer Medical Cliff without touching your AUD tuition fund, we can lock in PRUValue Med (Smart Deductible + auto-growing Med Value Point) at age-50 health rates plus PRUElite Flex (Guaranteed Annual FlexIncome to age 100). Free for a 10-min chat this weekend? 😊",
        defaultEmail:
          "Subject: Age-50 Retirement & Medical Comparison: PAMB (PRUValue Med & PRUElite Flex) vs. AIA\n\nHi Vincent & Elaine,\nHere are 3 factual reasons PAMB PRUValue Med + PRUElite Flex outperforms AIA A-Plus Health360 + A-Life Wealth Venture for your retirement:\n1. Med Value Point Grows Every Year—Even If You Claim: PAMB PRUValue Med increases your limit every single year and pays 80% of bills beyond the limit (AIA's Health Wallet stops growing in any year you claim).\n2. Guaranteed Annual FlexIncome to Age 100: PRUElite Flex locks in guaranteed annual retirement income to age 100.\n3. Smart Deductible Age-60 Bridge: Slashes premiums from age 50–60 while covered by employer medical, locking in clean age-50 underwriting now.\n\nLet's review the 1-page bridge on Zoom this Saturday at 11 AM!",
      },
      "zh-CN": {
        shortLabel: "50岁退休与女儿留学",
        customerName: "王文森 Vincent & 许依琳 Elaine (50岁，怡保 / 吉隆坡)",
        existingGap: "公司医药卡 60 岁终止（医疗断崖）• 需保留澳币学费并建立退休现金流",
        lifeEvent: "Vincent 喜迎 50 岁生日，且女儿刚获墨尔本大学录取",
        pambPlan: "PRUValue Med (Smart Deductible) + PRUElite Flex",
        aiaPlan: "AIA A-Plus Health360 (Deductible) + A-Life Wealth Venture",
        customerReply:
          "“谢谢你这么棒的50岁生日贺卡！有位 AIA 顾问刚给我们看了 AIA A-Plus Health360 + A-Life Wealth Venture 退休方案。你能发封电邮客观对比保诚和 AIA 吗？”",
        cardHeadline: "同贺 50 岁金禧生日与千金荣登墨尔本大学！🎓🥂",
        cardChips: [
          "同贺 50 岁金禧生日与千金荣登墨尔本大学！🎓🥂",
          "祝 Vincent 50 岁生日快乐 & 恭喜千金金榜题名墨尔本大学！✨",
        ],
        whatsappChips: [
          "化解 60 岁公司医保断崖：趁 50 岁健康体锁定 PRUValue Med（高自付额大幅省保费 + Med Value Point 每年自动递增）",
          "不动用澳币留学基金，通过 PRUElite Flex 建立保证每年派发至 100 岁的 FlexIncome 退休终身俸",
        ],
        aiaFacts: [
          "✓ Med Value Point 即使索赔后依然每年递增 + 超额续保 80%（AIA 钱包一旦索赔当年即停止增长）",
          "✓ 合同保证每年派发 FlexIncome 退休金至 100 岁（PRUElite Flex 保证现金流 vs 非保证投资联结险）",
          "✓ Smart Deductible 在 50–60 岁有公司医保期间大幅降低保费，提前锁定 50 岁标准核保",
        ],
        defaultWhatsapp:
          "祝 Vincent 50 岁金禧生日快乐，也热烈恭喜令千金荣获墨尔本大学录取！🎓🥂 我特意为您和 Elaine 制作了这张双喜临门祝贺卡。\n\n为了在不占用澳币学费储备的前提下化解“60岁公司医保断崖”，我们可以趁 50 岁健康体锁定 PRUValue Med（Smart Deductible 省保费 + 每年自动增长 Med Value Point）以及 PRUElite Flex（保证每年派发退休金至 100 岁）。这周末方便聊 10 分钟吗？😊",
        defaultEmail:
          "主题：50岁退休与医疗衔接客观对比：大马保诚 (PRUValue Med & PRUElite Flex) vs 友邦 (AIA)\n\nVincent 与 Elaine 您好：\n以下是大马保诚 PRUValue Med + PRUElite Flex 相比友邦 AIA A-Plus Health360 + A-Life Wealth Venture 的 3 大客观优势：\n1. 即使发生索赔，Med Value Point 依然每年递增：保诚 PRUValue Med 每年自动提高医疗限额，且超额后仍赔付 80%（而 AIA Health Wallet 在索赔年份会停止增长）。\n2. 保证每年派发 FlexIncome 至 100 岁：PRUElite Flex 提供写进合同的保证年度退休现金流至 100 岁。\n3. 50–60 岁 Smart Deductible 完美衔接：在您仍有公司医药卡期间大幅减免保费，同时提前锁定 50 岁健康核保资格。\n\n我们周六上午 11 点在 Zoom 上用 10 分钟看一下一页式对比表吧！",
      },
      yue: {
        shortLabel: "50歲生日兼阿女留學",
        customerName: "王文森 Vincent & 許依琳 Elaine (50歲，怡保 / KL)",
        existingGap: "公司醫藥卡 60 歲就停（醫療斷崖）• 要留澳幣學費兼準備退休長糧",
        lifeEvent: "Vincent 50 歲大壽，同埋阿女啱啱收到墨爾本大學 Offer",
        pambPlan: "PRUValue Med (Smart Deductible) + PRUElite Flex",
        aiaPlan: "AIA A-Plus Health360 (Deductible) + A-Life Wealth Venture",
        customerReply:
          "「好靚呀張 50 歲生日賀卡！啱啱有個 AIA 顧問俾我哋睇 AIA A-Plus Health360 + A-Life Wealth Venture 退休計劃。你可唔可以 Email 份保誠 vs AIA 嘅客觀比較俾我哋？」",
        cardHeadline: "賀 50 歲大壽兼阿女考入墨爾本大學雙喜臨門！🎓🥂",
        cardChips: [
          "賀 50 歲大壽兼阿女考入墨爾本大學雙喜臨門！🎓🥂",
          "祝 Vincent 50 歲生日快樂 & 恭喜千金入讀墨爾本大學！✨",
        ],
        whatsappChips: [
          "拆解 60 歲公司醫療卡斷崖：趁 50 歲健康鎖定 PRUValue Med（Smart Deductible 慳保費 + Med Value Point 年年自動加）",
          "唔使郁到澳幣學費基金，用 PRUElite Flex 鎖定保證派到 100 歲嘅 FlexIncome 退休長糧",
        ],
        aiaFacts: [
          "✓ Med Value Point 就算 claim 過都年年照加 + 爆額照保 80%（AIA Wallet 一 claim 嗰年就停加）",
          "✓ 合約保證年年派 FlexIncome 長糧到 100 歲（PRUElite Flex 保證現金流 vs 非保證基金回報）",
          "✓ Smart Deductible 喺 50–60 歲有公司醫保嗰陣大減保費，提早鎖定 50 歲健康核保",
        ],
        defaultWhatsapp:
          "Vincent 50 歲生日快樂，仲要恭喜晒阿女收到墨爾本大學 Offer 呀！🎓🥂 我特登整咗呢張雙喜臨門賀卡送俾你同 Elaine。\n\n想過渡 60 歲公司醫保斷崖、又唔使郁到留俾阿女嘅澳幣學費，我哋可以趁 50 歲健康身體鎖定 PRUValue Med（Smart Deductible 慳保費 + 年年自動加 Med Value Point）加埋 PRUElite Flex（保證年年派退休長糧到 100 歲）。今個 Weekend 傾個 10 分鐘電話好嗎？😊",
        defaultEmail:
          "主題：50歲退休同醫療駁腳客觀比較：大馬保誠 (PRUValue Med & PRUElite Flex) vs 友邦 (AIA)\n\nHi Vincent & Elaine：\n以下係大馬保誠 PRUValue Med + PRUElite Flex 對比 AIA A-Plus Health360 + A-Life Wealth Venture 嘅 3 個真實條款優勢：\n1. 就算有 Claim，Med Value Point 都年年照加：保誠 PRUValue Med 每年自動加大醫療額，爆額後仲保 80%（AIA 個 Health Wallet 只要嗰年有 claim 就會停加）。\n2. 保證年年派 FlexIncome 長糧到 100 歲：PRUElite Flex 寫明喺合約入面保證派發退休現金流到 100 歲。\n3. Smart Deductible 50–60 歲完美駁腳：趁仲有公司醫保嗰陣大幅減保費，但係而家就鎖定 50 歲健康核保。\n\n我哋星期六朝早 11 點開個 10 分鐘 Zoom 睇下張一頁紙對比表啦！",
      },
      ms: {
        shortLabel: "Umur 50 & Universiti Anak",
        customerName: "Vincent Ong & Elaine Khor (50, Ipoh / KL)",
        existingGap: "Perubatan syarikat tamat umur 60 ('Med Cliff') • Perlu pendapatan selepas 60",
        lifeEvent: "Hari jadi ke-50 Vincent & anak perempuan diterima masuk ke Universiti Melbourne",
        pambPlan: "PRUValue Med (Smart Deductible) + PRUElite Flex",
        aiaPlan: "AIA A-Plus Health360 (Deductible) + A-Life Wealth Venture",
        customerReply:
          "\"Kad hari jadi ke-50 yang sangat cantik! Penasihat AIA menunjukkan kami AIA A-Plus Health360 + A-Life Wealth Venture untuk persaraan. Boleh e-melkan perbandingan berfakta dengan PAMB?\"",
        cardHeadline: "Tahniah Ulang Tahun Ke-50 & Kejayaan Universiti Melbourne! 🎓🥂",
        cardChips: [
          "Tahniah Ulang Tahun Ke-50 & Kejayaan Universiti Melbourne! 🎓🥂",
          "Selamat Hari Jadi Ke-50 Vincent & Tahniah Tawaran Universiti Melbourne! ✨",
        ],
        whatsappChips: [
          "Atasi Jurang Perubatan Syarikat Umur 60: kunci PRUValue Med (Smart Deductible + Med Value Point meningkat setiap tahun) pada kadar kesihatan umur 50",
          "Lindungi rizab yuran AUD Melbourne & bina FlexIncome Tahunan Terjamin hingga umur 100 dengan PRUElite Flex",
        ],
        aiaFacts: [
          "✓ Med Value Point Meningkat Setiap Tahun Walaupun Selepas Tuntutan + 80% perlindungan melebihi had (Dompet AIA hanya meningkat jika tiada tuntutan)",
          "✓ FlexIncome Tahunan Terjamin Secara Kontrak hingga Umur 100 (PRUElite Flex lwn pulangan ILP tidak terjamin)",
          "✓ Smart Deductible mengurangkan premium dari umur 50–60 semasa perubatan syarikat masih aktif",
        ],
        defaultWhatsapp:
          "Selamat Hari Jadi ke-50 Vincent & tahniah atas tawaran Universiti Melbourne anak perempuan anda! 🎓🥂 Saya sediakan kad dwi-sambutan ini untuk anda dan Elaine.\n\nUntuk mengatasi Jurang Perubatan Majikan Umur 60 tanpa menyentuh tabung yuran AUD anda, kita boleh kunci PRUValue Med (Smart Deductible + Med Value Point meningkat automatik) pada kadar kesihatan umur 50 serta PRUElite Flex (FlexIncome Tahunan Terjamin hingga umur 100). Lapang untuk berbual 10 minit hujung minggu ini? 😊",
        defaultEmail:
          "Subjek: Perbandingan Persaraan & Perubatan Umur 50: PAMB (PRUValue Med & PRUElite Flex) lwn AIA\n\nHai Vincent & Elaine,\nBerikut ialah 3 sebab berfakta mengapa PAMB PRUValue Med + PRUElite Flex mengatasi AIA A-Plus Health360 + A-Life Wealth Venture untuk persaraan anda:\n1. Med Value Point Meningkat Setiap Tahun—Walaupun Anda Membuat Tuntutan: PAMB PRUValue Med meningkatkan had anda setiap tahun dan membayar 80% bil melebihi had (Health Wallet AIA berhenti meningkat pada tahun anda membuat tuntutan).\n2. FlexIncome Tahunan Terjamin hingga Umur 100: PRUElite Flex mengunci pendapatan persaraan tahunan terjamin sehingga umur 100.\n3. Jambatan Smart Deductible Umur 60: Mengurangkan premium dari umur 50–60 semasa dilindungi majikan sambil mengunci pengunderaitan bersih umur 50 sekarang.\n\nMari kita semak jadual 1 halaman di Zoom Sabtu ini jam 11 pagi!",
      },
      ta: {
        shortLabel: "வயது 50 & மகள் பல்கலைக்கழகம்",
        customerName: "வின்சென்ட் ஓங் & எலைன் கோர் (50, ஈப்போ / KL)",
        existingGap: "நிறுவன மருத்துவ அட்டை 60 வயதில் முடிகிறது • 60 வயதுக்குப் பின் ஓய்வூதிய வருமானம் தேவை",
        lifeEvent: "வின்சென்ட்டின் 50வது பிறந்தநாள் & மகளுக்கு மெல்போர்ன் பல்கலைக்கழகத்தில் இடம் கிடைத்துள்ளது",
        pambPlan: "PRUValue Med (Smart Deductible) + PRUElite Flex",
        aiaPlan: "AIA A-Plus Health360 (Deductible) + A-Life Wealth Venture",
        customerReply:
          "\"அழகான 50வது பிறந்தநாள் வாழ்த்து அட்டை! ஒரு AIA ஆலோசகர் ஓய்வூதியத்திற்காக AIA A-Plus Health360 + A-Life Wealth Venture திட்டத்தைக் காட்டினார். PAMB உடனான உண்மையான ஒப்பீட்டை மின்னஞ்சல் செய்ய முடியுமா?\"",
        cardHeadline: "50வது பிறந்தநாள் & மெல்போர்ன் பல்கலைக்கழக வெற்றிக்கு வாழ்த்துகள்! 🎓🥂",
        cardChips: [
          "50வது பிறந்தநாள் & மெல்போர்ன் பல்கலைக்கழக வெற்றிக்கு வாழ்த்துகள்! 🎓🥂",
          "இனிய 50வது பிறந்தநாள் வின்சென்ட் & மகளின் மெல்போர்ன் பல்கலைக்கழக வெற்றிக்கு வாழ்த்துகள்! ✨",
        ],
        whatsappChips: [
          "60 வயது நிறுவன மருத்துவ இடைவெளியை வெல்லுங்கள்: 50 வயது ஆரோக்கிய கட்டணத்தில் PRUValue Med (Smart Deductible + Med Value Point) உறுதி செய்க",
          "AUD கல்வி நிதியைப் பாதுகாத்து 100 வயது வரை உத்தரவாதமான வருடாந்திர FlexIncome தரும் PRUElite Flex",
        ],
        aiaFacts: [
          "✓ கிளைம் செய்த பிறகும் Med Value Point ஆண்டுதோறும் உயரும் + வரம்பிற்கு மேல் 80% பாதுகாப்பு (AIA வாலட் கிளைம் இல்லாத ஆண்டில் மட்டுமே உயரும்)",
          "✓ 100 வயது வரை ஒப்பந்த ரீதியாக உத்தரவாதமான வருடாந்திர FlexIncome (PRUElite Flex vs உத்தரவாதமற்ற ILP)",
          "✓ 50–60 வயது வரை நிறுவன மருத்துவ காப்பீடு இருக்கும்போது Smart Deductible பிரீமியத்தைக் குறைக்கிறது",
        ],
        defaultWhatsapp:
          "இனிய 50வது பிறந்தநாள் வாழ்த்துகள் வின்சென்ட் & உங்கள் மகளுக்கு மெல்போர்ன் பல்கலைக்கழகத்தில் இடம் கிடைத்ததற்கு பாராட்டுகள்! 🎓🥂 உங்களுக்கும் எலைனுக்கும் இந்த சிறப்பு வாழ்த்து அட்டையை உருவாக்கினேன்.\n\nஉங்கள் AUD கல்வி நிதியைத் தொடாமல் 60 வயது மருத்துவ இடைவெளியைச் சமாளிக்க, 50 வயது கட்டணத்தில் PRUValue Med (Smart Deductible + ஆண்டுதோறும் உயரும் Med Value Point) மற்றும் PRUElite Flex (100 வயது வரை உத்தரவாதமான FlexIncome) திட்டத்தை உறுதி செய்யலாம். இந்த வார இறுதியில் 10 நிமிடம் பேசலாமா? 😊",
        defaultEmail:
          "பொருள்: 50 வயது ஓய்வூதியம் & மருத்துவ ஒப்பீடு: PAMB (PRUValue Med & PRUElite Flex) vs AIA\n\nவணக்கம் வின்சென்ட் & எலைன்,\nAIA A-Plus Health360 + A-Life Wealth Venture திட்டத்தை விட PAMB சிறந்து விளங்குவதற்கான 3 உண்மையான காரணங்கள்:\n1. கிளைம் செய்தாலும் Med Value Point ஆண்டுதோறும் உயரும்: PAMB PRUValue Med ஒவ்வொரு ஆண்டும் உங்கள் வரம்பை உயர்த்துகிறது மற்றும் வரம்பிற்கு மேல் 80% வழங்குகிறது (AIA Health Wallet நீங்கள் கிளைம் செய்யும் ஆண்டில் உயராது).\n2. 100 வயது வரை உத்தரவாதமான வருடாந்திர FlexIncome: PRUElite Flex 100 வயது வரை உத்தரவாதமான ஓய்வூதிய வருமானத்தை வழங்குகிறது.\n3. Smart Deductible சலுகை: 50–60 வயது வரை நிறுவன காப்பீடு இருக்கும்போது பிரீமியத்தைக் குறைத்து, 50 வயது ஆரோக்கிய தகுதியை இப்போதே உறுதி செய்கிறது.\n\nஇந்த சனிக்கிழமை காலை 11 மணிக்கு Zoom-ல் 1 பக்க ஒப்பீட்டைப் பார்ப்போம்!",
      },
    },
  },
];

function _pickAssignedScenarioIdx(agentId) {
  if (!agentId) return 0;
  let hash = 0;
  for (let i = 0; i < agentId.length; i++) {
    hash = (hash * 31 + agentId.charCodeAt(i)) % 997;
  }
  return hash % PAMB_C3_SCENARIOS.length;
}

function _getLocalizedScenario(scObj, lang) {
  const normLang = lang === "zh-TW" ? "yue" : lang;
  const loc = (scObj.i18n && (scObj.i18n[normLang] || scObj.i18n.en)) || {};
  return {
    id: scObj.id,
    icon: scObj.icon,
    ...loc,
  };
}

window.Challenge3ParticipantView = function ({
  t,
  lang,
  agentId,
  agentName,
  agentRegion,
  onNext,
  fetchArenaState,
  onSandboxPreview,
}) {
  const { useState, useEffect } = React;

  const normLang = lang === "zh-TW" ? "yue" : lang || "en";
  const ui = C3_UI_I18N[normLang] || C3_UI_I18N.en;

  // 1 Fixed Scenario randomly/deterministically assigned per participant
  const [scenarioIdx, setScenarioIdx] = useState(() => _pickAssignedScenarioIdx(agentId));
  const rawSc = PAMB_C3_SCENARIOS[scenarioIdx] || PAMB_C3_SCENARIOS[0];
  const sc = _getLocalizedScenario(rawSc, normLang);

  // Step-by-Step Wizard: 1 = Greeting Card, 2 = WhatsApp Message, 3 = AIA Objection Email
  const [step, setStep] = useState(1);

  // Step 1 state: Greeting Card
  const [cardPrompt, setCardPrompt] = useState(() => sc.cardHeadline);
  const [cardUrl, setCardUrl] = useState(null);
  const [isBusy, setIsBusy] = useState(false);

  // Step 2 state: First-Touch WhatsApp Message
  const [whatsappPrompt, setWhatsappPrompt] = useState("");
  const [whatsappText, setWhatsappText] = useState(() => sc.defaultWhatsapp);

  // Step 3 state: Customer AIA Objection -> PAMB vs. AIA Comparison Email
  const [emailPrompt, setEmailPrompt] = useState("");
  const [emailText, setEmailText] = useState(() => sc.defaultEmail);

  // Final Submit state
  const [submitted, setSubmitted] = useState(false);
  const [submittedData, setSubmittedData] = useState(null);
  const [startTime] = useState(Date.now());

  // Automatically translate all default prompts & texts when language or scenario changes
  useEffect(() => {
    const localized = _getLocalizedScenario(
      PAMB_C3_SCENARIOS[scenarioIdx] || PAMB_C3_SCENARIOS[0],
      normLang
    );
    setCardPrompt(localized.cardHeadline);
    setWhatsappPrompt("");
    setWhatsappText(localized.defaultWhatsapp);
    setEmailPrompt("");
    setEmailText(localized.defaultEmail);
  }, [normLang, scenarioIdx]);

  useEffect(() => {
    const stepLabels = {
      1: "Step 1/3: Creating Life-Event Greeting Card",
      2: "Step 2/3: Drafting First-Touch WhatsApp",
      3: "Step 3/3: Countering AIA Malaysia Objection via Email",
    };
    fetch("/api/activity", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: agentId,
        challenge: 3,
        language: lang,
        region: agentRegion,
        status: `🎯 C3 (${sc.shortLabel}): ${stepLabels[step] || "Pre-Pitch"}`,
        agenticStep: stepLabels[step] || "Pre-Pitch",
      }),
    }).catch(() => {});
  }, [step, scenarioIdx, lang]);

  const handleRotateScenario = () => {
    const nextIdx = (scenarioIdx + 1) % PAMB_C3_SCENARIOS.length;
    setScenarioIdx(nextIdx);
    setStep(1);
    setCardUrl(null);
  };

  // Step 1: Generate Greeting Card
  const handleGenerateCard = async () => {
    setIsBusy(true);
    try {
      const res = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: agentId,
          name: agentName,
          region: agentRegion,
          challenge: "3",
          language: lang,
          scenarioId: sc.id,
          stepMode: "card",
          cardPrompt: cardPrompt.trim() || sc.cardHeadline,
          generateCard: true,
        }),
      });
      const data = await res.json();
      if (data.greetingCardDataUrl) {
        setCardUrl(data.greetingCardDataUrl);
      }
      if (typeof data.firstTouchMessage === "string" && data.firstTouchMessage.trim()) {
        setWhatsappText(data.firstTouchMessage);
      }
      if (typeof data.aiaComparisonEmail === "string" && data.aiaComparisonEmail.trim()) {
        setEmailText(data.aiaComparisonEmail);
      }
    } catch (e) {}
    setIsBusy(false);
  };

  // Helper: Toggle or append a snippet into a prompt without overwriting custom edits or auto-firing AI
  const toggleSnippetInPrompt = (currentText, snippet) => {
    const cleanSnippet = (snippet || "").trim();
    if (!cleanSnippet) return currentText;
    const cur = (currentText || "").trim();
    if (!cur) return cleanSnippet;
    if (cur.includes(cleanSnippet)) {
      const removed = cur
        .split("\n")
        .map((line) => line.replace(cleanSnippet, "").trim())
        .filter((line) => line && !/^[\d\.\)\-\•]+$/.test(line))
        .join("\n")
        .trim();
      return removed;
    }
    return `${cur}\n• ${cleanSnippet}`;
  };

  // Helper: Combine multiple snippets into the prompt while preserving any custom user lines
  const combineSnippetsIntoPrompt = (currentText, snippetsList) => {
    let result = (currentText || "").trim();
    (snippetsList || []).forEach((s, idx) => {
      const clean = (s || "").trim();
      if (clean && !result.includes(clean)) {
        const prefix = `${idx + 1}) `;
        result = result ? `${result}\n${prefix}${clean}` : `${prefix}${clean}`;
      }
    });
    return result;
  };

  // Step 2: Generate / Refine WhatsApp Message
  const handleGenerateWhatsapp = async (overrideAngle) => {
    const angle = overrideAngle !== undefined ? overrideAngle : whatsappPrompt;
    if (overrideAngle !== undefined) setWhatsappPrompt(overrideAngle);
    setIsBusy(true);
    try {
      const res = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: agentId,
          name: agentName,
          region: agentRegion,
          challenge: "3",
          language: lang,
          scenarioId: sc.id,
          stepMode: "whatsapp",
          cardPrompt: cardPrompt.trim() || sc.cardHeadline,
          whatsappPrompt: angle,
          emailPrompt,
          generateCard: !cardUrl,
          previousCardDataUrl: cardUrl,
        }),
      });
      const data = await res.json();
      if (data.greetingCardDataUrl && !cardUrl) setCardUrl(data.greetingCardDataUrl);
      if (typeof data.firstTouchMessage === "string" && data.firstTouchMessage.trim()) {
        setWhatsappText(data.firstTouchMessage);
      }
      if (typeof data.aiaComparisonEmail === "string" && data.aiaComparisonEmail.trim()) {
        setEmailText(data.aiaComparisonEmail);
      }
    } catch (e) {}
    setIsBusy(false);
  };

  // Step 3: Generate / Refine PAMB vs. AIA Comparison Email
  const handleGenerateEmail = async (overrideAngle) => {
    const angle = overrideAngle !== undefined ? overrideAngle : emailPrompt;
    if (overrideAngle !== undefined) setEmailPrompt(overrideAngle);
    setIsBusy(true);
    try {
      const res = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: agentId,
          name: agentName,
          region: agentRegion,
          challenge: "3",
          language: lang,
          scenarioId: sc.id,
          stepMode: "email",
          cardPrompt: cardPrompt.trim() || sc.cardHeadline,
          whatsappPrompt,
          emailPrompt: angle,
          generateCard: !cardUrl,
          previousCardDataUrl: cardUrl,
        }),
      });
      const data = await res.json();
      if (data.greetingCardDataUrl && !cardUrl) setCardUrl(data.greetingCardDataUrl);
      if (typeof data.aiaComparisonEmail === "string" && data.aiaComparisonEmail.trim()) {
        setEmailText(data.aiaComparisonEmail);
      }
    } catch (e) {}
    setIsBusy(false);
  };

  // Final Submit (Evaluates dynamically via /api/ai stepMode="evaluate" & locks into compact view)
  const handleFinalSubmit = async () => {
    setIsBusy(true);
    let finalCardUrl = cardUrl;
    let evalData = null;

    try {
      const r = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: agentId,
          name: agentName,
          region: agentRegion,
          challenge: "3",
          language: lang,
          scenarioId: sc.id,
          stepMode: "evaluate",
          cardPrompt: cardPrompt.trim() || sc.cardHeadline,
          whatsappPrompt,
          whatsappText,
          emailPrompt,
          emailText,
          generateCard: !finalCardUrl,
          previousCardDataUrl: finalCardUrl,
        }),
      });
      evalData = await r.json();
      if (evalData && evalData.greetingCardDataUrl) {
        finalCardUrl = evalData.greetingCardDataUrl;
        setCardUrl(finalCardUrl);
      }
    } catch (e) {}

    const elapsedSec = Math.max(10, Math.round((Date.now() - startTime) / 1000));
    const speedScore = Math.max(90, Math.min(99, 100 - Math.floor(elapsedSec / 10)));
    const pillarScores =
      evalData && evalData.pillarScores && Object.keys(evalData.pillarScores).length > 0
        ? evalData.pillarScores
        : {
            "Empathy & Greeting Card": 24,
            "Wealth Planning & WhatsApp": 24,
            "PAMB vs AIA (3 Facts)": 24,
            "Creativity & Prompt Craft": 24,
          };
    const accuracyScore =
      evalData && typeof evalData.qualityScore === "number"
        ? evalData.qualityScore
        : Object.values(pillarScores).reduce((acc, v) => acc + Number(v || 0), 0) || 96;
    const totalScore = Math.round((speedScore + accuracyScore) / 2);
    const judgeFeedback =
      (evalData && evalData.judgeFeedback) ||
      "Complete 3-step MDRT Pre-Pitch! Warm Life-Event Greeting Card + concise First-Touch WhatsApp + factual PAMB vs. AIA Malaysia comparison email.";

    const combinedMessages = `💬 [WHATSAPP]:\n${whatsappText}\n\n📧 [PAMB vs. AIA EMAIL]:\n${emailText}`;

    const subPayload = {
      challenge: "3",
      title: `${sc.icon} ${sc.customerName.split("(")[0].trim()} • PAMB vs. AIA`,
      styleBadge: `${sc.icon} ${sc.shortLabel}`,
      userInput: `${sc.customerName} (${sc.lifeEvent}) | PAMB: ${sc.pambPlan} vs. ${sc.aiaPlan}`,
      aiOutput: combinedMessages,
      whatsappMessage: whatsappText,
      aiaComparisonEmail: emailText,
      imageAfter: finalCardUrl,
      policyCitation: `${sc.pambPlan} vs. ${sc.aiaPlan}`,
      pillarScores,
      judgeFeedback,
    };

    if (onSandboxPreview) {
      onSandboxPreview({
        ...subPayload,
        speed: speedScore,
        accuracy: accuracyScore,
        total: totalScore,
        timeSec: elapsedSec,
      });
    }

    await fetch("/api/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: agentId,
        name: agentName,
        region: agentRegion,
        language: lang,
        challenge: "3",
        speed: speedScore,
        accuracy: accuracyScore,
        timeSec: elapsedSec,
        criteria: pillarScores,
        judgeFeedback,
        submission: subPayload,
      }),
    });
    fetchArenaState();
    setSubmittedData({
      total: totalScore,
      speed: speedScore,
      accuracy: accuracyScore,
      timeSec: elapsedSec,
      cardUrl: finalCardUrl,
      whatsappText,
      emailText,
      pillarScores,
      judgeFeedback,
    });
    setIsBusy(false);
    setSubmitted(true);
  };

  /* ==========================================================================
     FINAL SUBMITTED VIEW — SINGLE VISIBLE BOX (NO SCROLLING DOWN!)
     Shows: Score + 4 Pillar Breakdown + Greeting Card + WhatsApp & Email
  ========================================================================== */
  if (submitted && submittedData) {
    const pillarEntries = Object.entries(submittedData.pillarScores || {});
    return (
      <div className="bg-white border-t-4 border-t-[#ed1b2e] border-x border-b border-slate-200 rounded-2xl p-3 sm:p-4 shadow-lg space-y-2.5">
        {/* Top Row: Score Badge + Customer Name + Next Button */}
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 pb-2">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs font-extrabold">
              {ui.submittedBadge}
            </span>
            <span className="text-xs sm:text-sm font-extrabold text-slate-900">
              {sc.icon} {sc.customerName}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-red-50 border border-red-200 text-[#ed1b2e] text-xs sm:text-sm font-black">
              {ui.scoreLabel} {submittedData.total} / 100 pts ({submittedData.timeSec}s)
            </span>
            <button
              type="button"
              onClick={onNext}
              className="px-4 py-1.5 rounded-xl bg-[#ed1b2e] hover:bg-[#c8102e] text-white text-xs sm:text-sm font-extrabold shadow"
            >
              {t.viewMyCard} →
            </button>
          </div>
        </div>

        {/* 4-Pillar Score Breakdown + AI Judge Verdict */}
        {pillarEntries.length > 0 && (
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-2.5 space-y-2">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {pillarEntries.map(([k, v]) => (
                <div
                  key={k}
                  className="bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 flex items-center justify-between gap-1"
                >
                  <span className="text-[11px] font-bold text-slate-700 truncate">{k}</span>
                  <span className="text-xs font-black text-[#ed1b2e] shrink-0">{v}/25</span>
                </div>
              ))}
            </div>
            {submittedData.judgeFeedback && (
              <div className="text-xs font-bold text-slate-800 bg-red-50/60 border border-red-200 rounded-lg px-2.5 py-1.5">
                {submittedData.judgeFeedback}
              </div>
            )}
          </div>
        )}

        {/* 1. Greeting Card at the Top */}
        {submittedData.cardUrl && (
          <div className="flex items-center justify-center bg-slate-50 border border-slate-200 rounded-xl p-2.5">
            <img
              src={submittedData.cardUrl}
              alt="Life-Event Greeting Card"
              className="h-40 sm:h-48 md:h-52 w-auto object-contain rounded-xl border-2 border-[#ed1b2e] shadow-md"
            />
          </div>
        )}

        {/* 2. WhatsApp Message & PAMB vs. AIA Email Side-by-Side Inside Same Visible Box */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="bg-emerald-50/50 border border-emerald-200 rounded-xl p-2.5">
            <div className="text-xs font-extrabold text-emerald-900 mb-1">
              {ui.waFinalHeader}
            </div>
            <div className="text-xs sm:text-sm text-slate-900 whitespace-pre-line leading-snug max-h-36 overflow-y-auto bg-white p-2.5 rounded-lg border border-emerald-200">
              {submittedData.whatsappText}
            </div>
          </div>

          <div className="bg-blue-50/50 border border-blue-200 rounded-xl p-2.5">
            <div className="text-xs font-extrabold text-blue-900 mb-1">
              {ui.emailFinalHeader}
            </div>
            <div className="text-xs sm:text-sm text-slate-900 whitespace-pre-line leading-snug max-h-36 overflow-y-auto bg-white p-2.5 rounded-lg border border-blue-200">
              {submittedData.emailText}
            </div>
          </div>
        </div>
      </div>
    );
  }

  /* ==========================================================================
     ACTIVE WORKBENCH — ADAPTIVE PHONE / IPAD / LAPTOP 3-STEP WIZARD
  ========================================================================== */
  return (
    <div className="bg-white border-t-4 border-t-[#ed1b2e] border-x border-b border-slate-200 rounded-2xl p-3 sm:p-4 md:p-5 shadow-md space-y-3">
      {/* Compact Header + Assigned Customer X Key Data Points */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 pb-2.5">
        <div className="flex flex-wrap items-center gap-2">
          <span className="px-2.5 py-1 rounded-full bg-red-50 text-[#ed1b2e] border border-red-200 text-xs font-extrabold">
            {ui.badge}
          </span>
          <span className="text-sm sm:text-base font-extrabold text-slate-900">
            {sc.icon} {ui.assignedCase} {sc.customerName}
          </span>
        </div>
        <button
          type="button"
          onClick={handleRotateScenario}
          className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-red-50 text-slate-800 hover:text-[#ed1b2e] border border-slate-300 text-xs font-extrabold transition-all"
        >
          {ui.switchCase}
        </button>
      </div>

      {/* 4 Crisp Key Data Points — Adaptive Grid: 1 col Phone, 2 cols iPad, 4 cols Laptop */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 text-xs">
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-2.5">
          <span className="font-extrabold text-[#ed1b2e] block mb-0.5">{ui.lifeEventLabel}</span>
          <span className="text-slate-900 font-semibold leading-snug">{sc.lifeEvent}</span>
        </div>
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-2.5">
          <span className="font-extrabold text-slate-700 block mb-0.5">{ui.gapLabel}</span>
          <span className="text-slate-800 leading-snug">{sc.existingGap}</span>
        </div>
        <div className="bg-red-50/60 border border-red-200 rounded-xl p-2.5">
          <span className="font-extrabold text-[#ed1b2e] block mb-0.5">{ui.pambOfferLabel}</span>
          <span className="text-slate-900 font-bold leading-snug">{sc.pambPlan}</span>
        </div>
        <div className="bg-amber-50/70 border border-amber-200 rounded-xl p-2.5">
          <span className="font-extrabold text-amber-900 block mb-0.5">{ui.aiaRivalLabel}</span>
          <span className="text-slate-800 font-semibold leading-snug">{sc.aiaPlan}</span>
        </div>
      </div>

      {/* 3-Step Guided Stepper Bar — Adaptive across Phone / iPad / Laptop */}
      <div className="grid grid-cols-3 gap-2">
        {[
          { n: 1, label: ui.step1Tab, done: !!cardUrl },
          { n: 2, label: ui.step2Tab, done: step > 2 },
          { n: 3, label: ui.step3Tab, done: false },
        ].map((s) => {
          const active = step === s.n;
          return (
            <button
              type="button"
              key={s.n}
              onClick={() => setStep(s.n)}
              className={`py-2.5 px-2 sm:px-3 rounded-xl border text-xs sm:text-sm font-extrabold transition-all flex items-center justify-center gap-1.5 ${
                active
                  ? "bg-[#ed1b2e] border-[#ed1b2e] text-white shadow"
                  : s.done
                  ? "bg-emerald-50 border-emerald-300 text-emerald-800"
                  : "bg-slate-50 border-slate-200 text-slate-700 hover:border-[#ed1b2e]"
              }`}
            >
              <span>{s.done && !active ? "✓" : ""}</span>
              <span className="truncate">{s.label}</span>
            </button>
          );
        })}
      </div>

      {/* ====================================================================
          STEP 1: CREATE LIFE-EVENT GREETING CARD (FULL CHIPS + EMPATHY BOOSTERS)
      ==================================================================== */}
      {step === 1 && (
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 sm:p-4 space-y-3">
          <div className="space-y-2">
            <span className="text-xs sm:text-sm font-extrabold text-slate-900 block">
              {ui.step1Title}
            </span>
            {/* Full Headline Theme Chips (No truncation!) */}
            <div className="flex flex-wrap gap-1.5">
              {sc.cardChips.map((c, i) => {
                const isSelected = (cardPrompt || "").includes(c);
                return (
                  <button
                    type="button"
                    key={i}
                    onClick={() => setCardPrompt(c)}
                    className={`px-3 py-1.5 rounded-lg border text-xs font-bold shadow-sm transition-all text-left ${
                      isSelected
                        ? "bg-red-50 border-[#ed1b2e] text-[#ed1b2e]"
                        : "bg-white hover:bg-red-50 text-slate-800 hover:text-[#ed1b2e] border-slate-300"
                    }`}
                  >
                    {isSelected ? "✓ " : ""}{ui.themeChip} {i + 1}: {c}
                  </button>
                );
              })}
            </div>
            {/* Combinable Empathy & Creative Visual Boosters */}
            {ui.cardStyleBoosters && (
              <div className="pt-1 space-y-1">
                <span className="text-[11px] font-bold text-slate-600 block">
                  {ui.cardStyleBoostersLabel}
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {ui.cardStyleBoosters.map((booster, idx) => {
                    const active = (cardPrompt || "").includes(booster);
                    return (
                      <button
                        type="button"
                        key={idx}
                        onClick={() =>
                          setCardPrompt((prev) => toggleSnippetInPrompt(prev, booster))
                        }
                        className={`px-2.5 py-1 rounded-lg border text-xs font-bold transition-all ${
                          active
                            ? "bg-emerald-50 border-emerald-400 text-emerald-900"
                            : "bg-white hover:bg-red-50 text-slate-700 border-slate-300"
                        }`}
                      >
                        {active ? "✓ " : "+ "}{booster}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center justify-between gap-2">
              <label className="block text-xs sm:text-sm font-extrabold text-slate-800">
                {ui.cardPromptLabel}
              </label>
              {cardPrompt && (
                <button
                  type="button"
                  onClick={() => setCardPrompt("")}
                  className="text-[11px] font-bold text-slate-500 hover:text-[#ed1b2e]"
                >
                  {ui.clearPromptBtn}
                </button>
              )}
            </div>
            <div className="flex flex-col md:flex-row gap-2.5 items-stretch">
              <textarea
                rows={3}
                value={cardPrompt}
                onChange={(e) => setCardPrompt(e.target.value)}
                placeholder={ui.cardPromptPlaceholder}
                className="flex-1 bg-white border-2 border-slate-300 rounded-xl p-3 text-sm sm:text-base text-slate-900 font-semibold leading-snug focus:outline-none focus:border-[#ed1b2e] shadow-inner"
              />
              <button
                type="button"
                onClick={handleGenerateCard}
                disabled={isBusy}
                className="px-5 py-3 rounded-xl bg-[#ed1b2e] hover:bg-[#c8102e] text-white text-sm sm:text-base font-extrabold shadow-md shrink-0 flex items-center justify-center"
              >
                {isBusy ? ui.generatingCard : cardUrl ? ui.redrawCard : ui.generateCardBtn}
              </button>
            </div>
          </div>

          {cardUrl && (
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-white border-2 border-emerald-200 rounded-xl p-3.5">
              <img
                src={cardUrl}
                alt="Generated Greeting Card"
                className="h-48 sm:h-60 md:h-64 w-auto object-contain rounded-xl border-2 border-[#ed1b2e] shadow-md mx-auto md:mx-0"
              />
              <div className="flex flex-col gap-2.5 w-full md:w-auto md:flex-1 md:pl-3">
                <div className="text-xs sm:text-sm font-bold text-emerald-900 bg-emerald-50 border border-emerald-200 px-3.5 py-2.5 rounded-xl">
                  {ui.cardReadyMsg}
                </div>
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="w-full py-3 px-5 rounded-xl bg-slate-900 hover:bg-[#ed1b2e] text-white text-sm sm:text-base font-extrabold shadow-md transition-all"
                >
                  {ui.nextStep2Btn}
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ====================================================================
          STEP 2: CRAFT FIRST-TOUCH WHATSAPP MESSAGE (COMBINABLE + EDITABLE PROMPT)
      ==================================================================== */}
      {step === 2 && (
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 sm:p-4 space-y-3">
          {/* Keep Greeting Card Visible at the Top */}
          <div className="flex items-center justify-between gap-2 bg-white border border-slate-200 rounded-xl px-3 py-2">
            <div className="flex items-center gap-2.5 min-w-0">
              {cardUrl && (
                <img
                  src={cardUrl}
                  alt="Card Thumbnail"
                  className="h-11 w-auto rounded border border-[#ed1b2e] shrink-0"
                />
              )}
              <div className="text-xs truncate">
                <span className="font-extrabold text-emerald-700">{ui.cardAttachedBadge}</span>
                <span className="text-slate-600 ml-2 hidden sm:inline">({cardPrompt})</span>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setStep(1)}
              className="text-xs font-extrabold text-[#ed1b2e] hover:underline shrink-0"
            >
              {ui.editCardBtn}
            </button>
          </div>

          <div className="space-y-2">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="text-xs sm:text-sm font-extrabold text-slate-900">
                {ui.step2Title} ({sc.pambPlan})
              </span>
              <button
                type="button"
                onClick={() =>
                  setWhatsappPrompt((prev) =>
                    combineSnippetsIntoPrompt(prev, [
                      ...(sc.whatsappChips || []),
                      ...(ui.waEmpathyBoosters || []),
                    ])
                  )
                }
                className="px-3 py-1.5 rounded-lg bg-[#ed1b2e] hover:bg-[#c8102e] text-white text-xs font-extrabold shadow-sm transition-all"
              >
                {ui.combineBothWaBtn}
              </button>
            </div>

            {/* Full readable PAMB Angles + Empathy/Wealth Boosters (Tap to combine into prompt without auto-firing!) */}
            <div className="flex flex-wrap gap-1.5">
              {sc.whatsappChips.map((chip, idx) => {
                const active = (whatsappPrompt || "").includes(chip);
                return (
                  <button
                    type="button"
                    key={idx}
                    onClick={() =>
                      setWhatsappPrompt((prev) => toggleSnippetInPrompt(prev, chip))
                    }
                    className={`text-left px-3 py-1.5 rounded-lg border text-xs font-bold shadow-sm transition-all ${
                      active
                        ? "bg-emerald-50 border-emerald-400 text-emerald-950"
                        : "bg-white hover:bg-red-50 text-slate-800 hover:text-[#ed1b2e] border-slate-300"
                    }`}
                  >
                    {active ? "✓ " : "+ "}{ui.pambAngleChip} {idx + 1}: {chip}
                  </button>
                );
              })}
              {(ui.waEmpathyBoosters || []).map((booster, bIdx) => {
                const active = (whatsappPrompt || "").includes(booster);
                return (
                  <button
                    type="button"
                    key={`wb-${bIdx}`}
                    onClick={() =>
                      setWhatsappPrompt((prev) => toggleSnippetInPrompt(prev, booster))
                    }
                    className={`text-left px-3 py-1.5 rounded-lg border text-xs font-bold shadow-sm transition-all ${
                      active
                        ? "bg-emerald-50 border-emerald-400 text-emerald-950"
                        : "bg-white hover:bg-red-50 text-slate-700 hover:text-[#ed1b2e] border-slate-300"
                    }`}
                  >
                    {active ? "✓ " : "+ "}{booster}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Larger AI Prompt Box for Step 2 */}
          <div className="space-y-1">
            <div className="flex items-center justify-between gap-2">
              <label className="block text-xs sm:text-sm font-extrabold text-slate-800">
                {ui.waPromptLabel}
              </label>
              {whatsappPrompt && (
                <button
                  type="button"
                  onClick={() => setWhatsappPrompt("")}
                  className="text-[11px] font-bold text-slate-500 hover:text-[#ed1b2e]"
                >
                  {ui.clearPromptBtn}
                </button>
              )}
            </div>
            <div className="text-[11px] text-slate-600 font-semibold">{ui.promptEditHint}</div>
            <div className="flex flex-col md:flex-row gap-2 items-stretch">
              <textarea
                rows={3}
                value={whatsappPrompt}
                onChange={(e) => setWhatsappPrompt(e.target.value)}
                placeholder={ui.waPromptPlaceholder}
                className="flex-1 bg-white border-2 border-slate-300 rounded-xl p-3 text-sm sm:text-base text-slate-900 leading-snug focus:outline-none focus:border-[#ed1b2e] shadow-inner"
              />
              <button
                type="button"
                onClick={() => handleGenerateWhatsapp()}
                disabled={isBusy}
                className="px-5 py-2.5 rounded-xl bg-[#ed1b2e] hover:bg-[#c8102e] text-white text-sm sm:text-base font-extrabold shadow shrink-0 flex items-center justify-center"
              >
                {isBusy ? ui.waDrafting : ui.aiRefineBtn}
              </button>
            </div>
          </div>

          {/* Larger Editable WhatsApp Message Box */}
          <div className="space-y-1">
            <label className="block text-xs sm:text-sm font-extrabold text-emerald-900">
              {ui.waOutputLabel}
            </label>
            <textarea
              rows={4}
              value={whatsappText}
              onChange={(e) => setWhatsappText(e.target.value)}
              className="w-full bg-white border-2 border-emerald-400 rounded-xl p-3 text-sm sm:text-base text-slate-900 leading-snug focus:outline-none focus:border-[#ed1b2e] shadow-sm"
            />
          </div>

          <div className="flex flex-wrap justify-between items-center gap-2 pt-1">
            <button
              type="button"
              onClick={() => setStep(1)}
              className="px-4 py-2.5 rounded-xl bg-white border border-slate-300 text-xs sm:text-sm font-extrabold text-slate-700"
            >
              {ui.backBtn}
            </button>
            <button
              type="button"
              onClick={() => setStep(3)}
              className="py-2.5 px-5 rounded-xl bg-slate-900 hover:bg-[#ed1b2e] text-white text-xs sm:text-sm font-extrabold shadow-md transition-all"
            >
              {ui.nextStep3Btn}
            </button>
          </div>
        </div>
      )}

      {/* ====================================================================
          STEP 3: CUSTOMER REPLIES ("COMPARE WITH AIA MALAYSIA!") -> EMAIL
          SUPPORTS "USE ALL 3 ADVANTAGES + EDIT PROMPT" BEFORE GENERATING!
      ==================================================================== */}
      {step === 3 && (
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 sm:p-4 space-y-3">
          {/* Incoming Customer Objection Banner + Factual PAMB vs. AIA Cheat Pills */}
          <div className="bg-amber-50 border-2 border-amber-300 rounded-xl p-3 space-y-2.5">
            <div className="flex items-center justify-between gap-2">
              <span className="text-xs sm:text-sm font-extrabold uppercase text-amber-950">
                {ui.objectionHeader}
              </span>
              {cardUrl && (
                <img
                  src={cardUrl}
                  alt="Card Thumbnail"
                  className="h-10 w-auto rounded border border-[#ed1b2e] shrink-0"
                />
              )}
            </div>
            <div className="text-xs sm:text-sm font-bold text-slate-900 italic bg-white/80 p-2.5 rounded-lg border border-amber-200">
              {sc.customerReply}
            </div>
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="text-[11px] sm:text-xs font-extrabold text-amber-900">
                {ui.tapFactHint}
              </span>
              <button
                type="button"
                onClick={() =>
                  setEmailPrompt((prev) =>
                    combineSnippetsIntoPrompt(prev, sc.aiaFacts || [])
                  )
                }
                className="px-3.5 py-1.5 rounded-lg bg-[#ed1b2e] hover:bg-[#c8102e] text-white text-xs font-extrabold shadow transition-all"
              >
                {ui.useAll3FactsBtn}
              </button>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {sc.aiaFacts.map((fact, i) => {
                const active = (emailPrompt || "").includes(fact);
                return (
                  <button
                    type="button"
                    key={i}
                    onClick={() =>
                      setEmailPrompt((prev) => toggleSnippetInPrompt(prev, fact))
                    }
                    className={`text-left px-3 py-1.5 rounded-lg border text-xs font-bold shadow-sm transition-all ${
                      active
                        ? "bg-emerald-50 border-emerald-500 text-emerald-950"
                        : "bg-white hover:bg-red-50 text-slate-900 hover:text-[#ed1b2e] border-amber-300"
                    }`}
                  >
                    {active ? "✓ " : "+ "}{fact}
                  </button>
                );
              })}
            </div>
            {(ui.emailLeaderBoosters || []).length > 0 && (
              <div className="flex flex-wrap gap-1.5 pt-1 border-t border-amber-200/80">
                {ui.emailLeaderBoosters.map((booster, bIdx) => {
                  const active = (emailPrompt || "").includes(booster);
                  return (
                    <button
                      type="button"
                      key={`eb-${bIdx}`}
                      onClick={() =>
                        setEmailPrompt((prev) => toggleSnippetInPrompt(prev, booster))
                      }
                      className={`text-left px-2.5 py-1 rounded-lg border text-xs font-bold transition-all ${
                        active
                          ? "bg-emerald-50 border-emerald-500 text-emerald-950"
                          : "bg-white/90 hover:bg-red-50 text-slate-800 border-amber-300"
                      }`}
                    >
                      {active ? "✓ " : "+ "}{booster}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Larger AI Prompt Box for Step 3 */}
          <div className="space-y-1">
            <div className="flex items-center justify-between gap-2">
              <label className="block text-xs sm:text-sm font-extrabold text-slate-800">
                {ui.emailPromptLabel}
              </label>
              {emailPrompt && (
                <button
                  type="button"
                  onClick={() => setEmailPrompt("")}
                  className="text-[11px] font-bold text-slate-500 hover:text-[#ed1b2e]"
                >
                  {ui.clearPromptBtn}
                </button>
              )}
            </div>
            <div className="text-[11px] text-slate-600 font-semibold">{ui.promptEditHint}</div>
            <div className="flex flex-col md:flex-row gap-2 items-stretch">
              <textarea
                rows={4}
                value={emailPrompt}
                onChange={(e) => setEmailPrompt(e.target.value)}
                placeholder={ui.emailPromptPlaceholder}
                className="flex-1 bg-white border-2 border-slate-300 rounded-xl p-3 text-sm sm:text-base text-slate-900 leading-snug focus:outline-none focus:border-[#ed1b2e] shadow-inner"
              />
              <button
                type="button"
                onClick={() => handleGenerateEmail()}
                disabled={isBusy}
                className="px-5 py-2.5 rounded-xl bg-[#ed1b2e] hover:bg-[#c8102e] text-white text-sm sm:text-base font-extrabold shadow shrink-0 flex items-center justify-center"
              >
                {isBusy ? ui.waDrafting : ui.aiRefineBtn}
              </button>
            </div>
          </div>

          {/* Larger Editable PAMB vs. AIA Comparison Email Box */}
          <div className="space-y-1">
            <label className="block text-xs sm:text-sm font-extrabold text-blue-950">
              {ui.emailOutputLabel}
            </label>
            <textarea
              rows={5}
              value={emailText}
              onChange={(e) => setEmailText(e.target.value)}
              className="w-full bg-white border-2 border-blue-400 rounded-xl p-3 text-sm sm:text-base text-slate-900 leading-snug focus:outline-none focus:border-[#ed1b2e] shadow-sm"
            />
          </div>

          <div className="flex flex-wrap justify-between items-center gap-2 pt-1">
            <button
              type="button"
              onClick={() => setStep(2)}
              className="px-4 py-2.5 rounded-xl bg-white border border-slate-300 text-xs sm:text-sm font-extrabold text-slate-700"
            >
              {ui.backBtn}
            </button>
            <button
              type="button"
              onClick={handleFinalSubmit}
              disabled={isBusy}
              className="py-3 px-6 rounded-xl bg-[#ed1b2e] hover:bg-[#c8102e] text-white text-sm sm:text-base font-extrabold shadow-lg transition-all"
            >
              {isBusy ? ui.submittingBtn : ui.finalSubmitBtn}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
