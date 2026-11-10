/* ============================================================================
   CHALLENGE 3 MODULE (14:35 - 15:05 | 30 min) — ADVISOR PLAYBOOK EDITION
   "Drive faster pipeline, sharpen your strategic proposal to sales close - Pre-pitch"
   — Designed for Business Leaders (Zero Raw Prompt Clutter, Quiet-Room Friendly):
     • 5 Native Languages: English (en), Mandarin (zh-CN), Cantonese (yue),
       Bahasa Melayu (ms), Tamil (ta)
     • Clean 3-Point Client Story Strip (AIA objection stays hidden until Step 3!)
     • Step 1: Door-Opener Greeting Card (Visual Style + Vibe + Hint-Guided Creative Touch)
     • Step 2: First-Touch WhatsApp (Empathy Tone + Short Wealth Pills + Hint-Guided Personal Touch -> Live WhatsApp Bubble)
     • Step 3: Live Incoming Client Reply ("AIA Quoted Us!") -> Check Winning Facts + Advisory Style + Hint-Guided Meeting Closer -> Clean Email Card
============================================================================ */

const C3_PLAYBOOK_UI = {
  en: {
    studioHeader: "🎯 Pre-Pitch Advisor Studio",
    badge: "CHALLENGE 3 • ADVISOR PLAYBOOK",
    assignedCase: "Client Case:",
    switchCase: "Switch Case",
    switchShortFmt: "Switch",
    switchConfirmMsg: "Switch client case and start a fresh Pre-Pitch?",
    caseInfoBtn: "Case Info",
    personalTouchBtn: "+ 💡 Add Personal Touch (Bonus pts)",
    cardSettingsBar: "🎨 Card Settings",
    promptHooksBar: "💬 Prompt Hooks",
    comparisonSettingsBar: "📧 Comparison Settings",
    editBtn: "✎ Edit",
    detailsBtn: "Details",
    hideBtn: "Hide",
    lifeEventLabel: "🎉 Moment",
    gapLabel: "⚠️ Gap",
    offerLabel: "🛡️ PRU Plan",
    step1Tab: "1. 🎨 Card",
    step2Tab: "2. 💬 WhatsApp",
    step3Tab: "3. 📧 vs. AIA",
    step1TabFull: "1. 🎨 Greeting Card",
    step2TabFull: "2. 💬 First WhatsApp",
    step3TabFull: "3. 📧 Win vs. AIA",
    step3LockedShort: "3. 🔒 Step 3",
    step3LockedFull: "3. 🔒 Send WhatsApp First",

    step1Title: "Step 1: Warm Door-Opener Greeting Card",
    pickVisualStyle: "1. Choose Card Visual Style:",
    visualStyles: [
      { id: "watercolor", label: "🎨 Warm Family Watercolor", prompt: "Warm hand-painted storybook watercolor illustration, soft golden family glow, heartfelt emotional warmth" },
      { id: "prestige", label: "✨ Crimson & Gold Prestige", prompt: "Luxury executive stationery card with refined crimson-red and brushed-gold accents, crisp modern typography" },
      { id: "malaysian", label: "🇲🇾 Malaysian Lifestyle Warmth", prompt: "Authentic modern Malaysian home & skyline warmth, joyful celebratory atmosphere, vibrant sunlight" },
    ],
    pickHeadline: "2. Choose Greeting Headline:",
    cardTouchLabel: "3. 💡 Add Your Own Creative Touch (Optional — type a few words):",
    cardTouchHint: "Hint: Mention a warm visual detail (e.g. teddy bear, house keys, flowers) or a special family blessing — tap an example below to edit, or type your own!",
    cardTouchPlaceholder: "e.g. Add a cute teddy bear & warm family blessing...",
    generatingCard: "🎨 Designing Your Card...",
    redrawCard: "↻ Regenerate Card",
    generateCardBtn: "🎨 Create Greeting Card",
    cardReadyMsg: "✓ Greeting Card ready! Now let's craft your warm First-Touch WhatsApp.",
    nextStep2Btn: "Next: Craft First WhatsApp →",
    cardAttachedBadge: "✓ Step 1 Card Attached",
    editCardBtn: "Change Card",

    step2Title: "Step 2: First-Touch WhatsApp (Empathy + Wealth Idea)",
    pickOpeningTone: "1. How will you open the conversation?",
    openingTones: [
      { id: "warm_zero_push", label: "❤️ Celebrate First (Zero Push)", prompt: "Open with 100% genuine celebration and warmth, zero sales pressure" },
      { id: "casual_checkin", label: "☕ Casual 2-Min Check-In", prompt: "Warm, friendly check-in like a trusted longtime family advisor" },
      { id: "card_gift", label: "🎁 Pair with Card Gift", prompt: "Lead with the custom greeting card made specially for their milestone" },
    ],
    pickWealthHooks: "2. Which Wealth Planning Ideas will you plant? (Tap 1 or more):",
    selectAllIdeas: "✓ Select All Ideas",
    waTouchLabel: "3. 💡 Add Your Personal Relationship Touch (Optional — type 5–10 words):",
    waTouchHint: "Hint: Mention how you know them, a caring family thought, or an easy coffee/summary offer — tap a hint to customize or type your own!",
    waTouchPlaceholder: "e.g. Offer a 2-min summary while baby naps, no rush at all...",
    waGenerateBtn: "✨ Draft My WhatsApp Message",
    waRegenerateBtn: "↻ Re-Draft with My Changes",
    waDrafting: "⚡ Drafting WhatsApp...",
    waPreviewHeader: "📱 Live WhatsApp Preview (Tap text to tweak any word):",
    waEmptyHint: "👆 Pick your opening tone & wealth ideas above, add an optional personal touch, then tap 'Draft My WhatsApp Message'!",
    quickPolishLabel: "Quick 1-Tap Polish:",
    waPolishes: [
      { label: "↻ Shorter & Punchier", inst: "Make it 25% shorter, punchier, and effortless to read on a phone" },
      { label: "↻ Warmer & More Caring", inst: "Make the tone even warmer, more personal, and more empathetic" },
      { label: "↻ Clearer Wealth Hook", inst: "Make the financial/wealth benefit crystal-clear in one simple sentence" },
    ],
    backBtn: "← Back",
    nextStep3Btn: "📲 Send WhatsApp Message →",
    resendWaBtn: "📲 Re-Send WhatsApp →",
    sendingWaBtn: "📤 Sending via WhatsApp...",
    sentWaLabel: "Your WhatsApp Sent & Delivered",
    typingLabel: "💬 Client is typing a reply on WhatsApp...",

    incomingBubbleTag: "📲 Incoming Client WhatsApp Reply • Just now",
    pickWinningFacts: "1. Pick Winning PRU Advantages vs. AIA (Tap cards or Select All 3):",
    selectAll3Facts: "✓ Select All 3 Advantages",
    pickAdvisoryStyle: "2. Choose Your Advisory Tone:",
    advisoryStyles: [
      { id: "respectful", label: "🤝 Respectful & Fair", prompt: "Acknowledge AIA respectfully while showing factually why PRU fits their family gap better" },
      { id: "crisp_bullets", label: "📊 Crisp 3-Bullet Summary", prompt: "Ultra-clear side-by-side 3-bullet executive comparison for fast decision-making" },
      { id: "peace_of_mind", label: "👨‍👩‍👦 Family Peace-of-Mind", prompt: "Connect each policy clause back to protecting their family's long-term peace of mind" },
    ],
    closeTouchLabel: "3. 💡 How Will You Close the Meeting? (Optional — type your idea):",
    closeTouchHint: "Hint: Suggest an easy 10-min Zoom/coffee time, offer to compare both PDFs side-by-side, or invite their spouse — tap a hint or type your own!",
    closeTouchPlaceholder: "e.g. Suggest a 10-min Zoom at 8:30pm to compare both tables...",
    emailGenerateBtn: "✨ Draft Winning Comparison Reply",
    emailRegenerateBtn: "↻ Re-Draft Comparison Reply",
    emailDrafting: "⚡ Crafting Reply...",
    emailPreviewHeader: "📧 Your Winning Comparison Email (Editable before submit):",
    emailEmptyHint: "👆 Select your PRU advantages & closing idea above, then tap 'Draft Winning Comparison Reply'!",
    emailPolishes: [
      { label: "↻ More Concise", inst: "Tighten into a crisp, skimmable 90-word executive email" },
      { label: "↻ Softer MDRT Tone", inst: "Make the tone extra gracious, consultative, and zero-pressure" },
      { label: "↻ Sharper Clause Contrast", inst: "Make the exact clause differences between PRU and AIA stand out clearly" },
    ],
    submittingBtn: "⚡ Scoring Your Pre-Pitch...",
    finalSubmitBtn: "🚀 Submit Pre-Pitch & See Score",
    submittedBadge: "✓ SUBMITTED",
    scoreLabel: "🏆 Score:",
    waFinalHeader: "💬 1. First-Touch WhatsApp Message",
    emailFinalHeader: "📧 2. Winning Plan Comparison Email (vs. AIA)",
    improvePromptBtn: "🚀 Improve Your Prompt! (R.C.T.F.C.)",
    improvePromptSub: "Tap any R.C.T.F.C. pillar to add or remove a short instruction line:",
    activateAllShort: "✨ All 5 On",
    clearAllShort: "✕ Clear 5",
    livePromptHeader: "✍️ Live AI Prompt",
    resetPromptBtn: "↺ Reset",
    clearPromptBtn: "✕ Clear",
    pillarTitles: {
      role: "R · Role",
      context: "C · Context",
      task: "T · Task",
      format: "F · Format",
      constraints: "C · Constraints",
    },
  },

  "zh-CN": {
    studioHeader: "🎯 战前顾问实战工作台",
    badge: "挑战 3 • 绩优顾问实战手册",
    assignedCase: "客户案例：",
    switchCase: "切换案例",
    switchShortFmt: "切换",
    switchConfirmMsg: "确定切换客户案例并重新开始吗？",
    caseInfoBtn: "案例详情",
    personalTouchBtn: "+ 💡 专属巧思（加分）",
    cardSettingsBar: "🎨 贺卡设定",
    promptHooksBar: "💬 破冰设定",
    comparisonSettingsBar: "📧 对比设定",
    editBtn: "✎ 修改",
    detailsBtn: "详情",
    hideBtn: "收起",
    lifeEventLabel: "🎉 时刻",
    gapLabel: "⚠️ 缺口",
    offerLabel: "🛡️ PRU 方案",
    step1Tab: "1. 🎨 贺卡",
    step2Tab: "2. 💬 WhatsApp",
    step3Tab: "3. 📧 vs AIA",
    step1TabFull: "1. 🎨 暖心祝贺卡",
    step2TabFull: "2. 💬 首条 WhatsApp",
    step3TabFull: "3. 📧 应对 AIA 对比",
    step3LockedShort: "3. 🔒 第3步",
    step3LockedFull: "3. 🔒 发送 WhatsApp 后解锁",

    step1Title: "第 1 步：制作专属开门红祝贺卡",
    pickVisualStyle: "1. 选择祝贺卡视觉风格：",
    visualStyles: [
      { id: "watercolor", label: "🎨 温馨手绘水彩风", prompt: "Warm hand-painted storybook watercolor illustration, soft golden family glow, heartfelt emotional warmth" },
      { id: "prestige", label: "✨ 尊尚红金高管风", prompt: "Luxury executive stationery card with refined crimson-red and brushed-gold accents, crisp modern typography" },
      { id: "malaysian", label: "🇲🇾 大马本土家庭温情", prompt: "Authentic modern Malaysian home & skyline warmth, joyful celebratory atmosphere, vibrant sunlight" },
    ],
    pickHeadline: "2. 选择贺卡主标题：",
    cardTouchLabel: "3. 💡 加入您的专属创意巧思（选填 — 简单输入几个字即可）：",
    cardTouchHint: "提示：可补充温馨画面细节（如小泰迪熊、新居钥匙、鲜花）或一句专属祝福 — 点击下方灵感词可直接修改，或输入您自己的想法！",
    cardTouchPlaceholder: "例如：加上可爱的小泰迪熊与温馨家庭祝福...",
    generatingCard: "🎨 正在设计祝贺卡...",
    redrawCard: "↻ 重新生成祝贺卡",
    generateCardBtn: "🎨 生成专属祝贺卡",
    cardReadyMsg: "✓ 祝贺卡已就绪！接下来构思您的首条破冰 WhatsApp。",
    nextStep2Btn: "下一步：撰写首条 WhatsApp →",
    cardAttachedBadge: "✓ 已附上第1步祝贺卡",
    editCardBtn: "修改贺卡",

    step2Title: "第 2 步：首条 WhatsApp 破冰（共情开场 + 财富规划亮点）",
    pickOpeningTone: "1. 您想用什么方式开场？",
    openingTones: [
      { id: "warm_zero_push", label: "❤️ 真诚祝贺（零推销压力）", prompt: "Open with 100% genuine celebration and warmth, zero sales pressure" },
      { id: "casual_checkin", label: "☕ 老朋友式轻松问候", prompt: "Warm, friendly check-in like a trusted longtime family advisor" },
      { id: "card_gift", label: "🎁 结合专属贺卡送祝福", prompt: "Lead with the custom greeting card made specially for their milestone" },
    ],
    pickWealthHooks: "2. 想埋下哪几个财富规划亮点？（点击选择 1 个或多个）：",
    selectAllIdeas: "✓ 全选亮点",
    waTouchLabel: "3. 💡 加入您的个人温度 / 关系巧思（选填 — 输入简短一句话）：",
    waTouchHint: "提示：可提一句过往交情、贴心的家庭关怀，或轻松的 2 分钟简报/喝咖啡邀约 — 点击下方灵感词可修改，或输入您的巧思！",
    waTouchPlaceholder: "例如：趁宝宝午睡发一份2分钟简报给您，完全不急...",
    waGenerateBtn: "✨ 生成我的 WhatsApp 破冰信息",
    waRegenerateBtn: "↻ 按最新想法重新生成",
    waDrafting: "⚡ 正在撰写 WhatsApp...",
    waPreviewHeader: "📱 WhatsApp 实时预览（点击文字可直接微调）：",
    waEmptyHint: "👆 请先在上方点选开场方式与财富亮点（可加上您的个人巧思），然后点击「生成我的 WhatsApp 破冰信息」！",
    quickPolishLabel: "一键润色：",
    waPolishes: [
      { label: "↻ 更精炼简短", inst: "Make it 25% shorter, punchier, and effortless to read on a phone" },
      { label: "↻ 更有温度与共情", inst: "Make the tone even warmer, more personal, and more empathetic" },
      { label: "↻ 突出财富数字亮点", inst: "Make the financial/wealth benefit crystal-clear in one simple sentence" },
    ],
    backBtn: "← 上一步",
    nextStep3Btn: "📲 发送 WhatsApp 信息 →",
    resendWaBtn: "📲 重新发送 WhatsApp →",
    sendingWaBtn: "📤 正在通过 WhatsApp 发送...",
    sentWaLabel: "您的 WhatsApp 已发送并送达",
    typingLabel: "💬 客户正在 WhatsApp 输入回复...",

    incomingBubbleTag: "📲 客户刚刚回复了您的 WhatsApp • 刚刚",
    pickWinningFacts: "1. 点选胜出友邦 (AIA) 的核心条款优势（可单选或一键全选 3 项）：",
    selectAll3Facts: "✓ 全选 3 大优势",
    pickAdvisoryStyle: "2. 选择您的专业沟通风格：",
    advisoryStyles: [
      { id: "respectful", label: "🤝 尊重对手 · 客观专业", prompt: "Acknowledge AIA respectfully while showing factually why PRU fits their family gap better" },
      { id: "crisp_bullets", label: "📊 3点清晰高管摘要", prompt: "Ultra-clear side-by-side 3-bullet executive comparison for fast decision-making" },
      { id: "peace_of_mind", label: "👨‍👩‍👦 聚焦家庭长远安心", prompt: "Connect each policy clause back to protecting their family's long-term peace of mind" },
    ],
    closeTouchLabel: "3. 💡 您想如何邀约促成面谈？（选填 — 输入您的收尾巧思）：",
    closeTouchHint: "提示：可提议方便的 10 分钟 Zoom 时间、并排对比两份计划书 PDF、或邀请另一半一起听 — 点击下方灵感或自己输入！",
    closeTouchPlaceholder: "例如：周四晚8点半宝宝睡后用10分钟Zoom并排对照两份利益表...",
    emailGenerateBtn: "✨ 生成专业对比回复电邮",
    emailRegenerateBtn: "↻ 按最新想法重新生成电邮",
    emailDrafting: "⚡ 正在撰写对比电邮...",
    emailPreviewHeader: "📧 您的专业方案对比电邮（提交前可直接修改）：",
    emailEmptyHint: "👆 请在上方点选条款优势与收尾方式，然后点击「生成专业对比回复电邮」！",
    emailPolishes: [
      { label: "↻ 更精炼易读", inst: "Tighten into a crisp, skimmable 90-word executive email" },
      { label: "↻ 更温和顾问口吻", inst: "Make the tone extra gracious, consultative, and zero-pressure" },
      { label: "↻ 强化条款差异对比", inst: "Make the exact clause differences between PRU and AIA stand out clearly" },
    ],
    submittingBtn: "⚡ 正在评分并同步大屏...",
    finalSubmitBtn: "🚀 提交完整 Pre-Pitch 并查看得分",
    submittedBadge: "✓ 已提交",
    scoreLabel: "🏆 得分：",
    waFinalHeader: "💬 1. 首条 WhatsApp 破冰信息",
    emailFinalHeader: "📧 2. 方案对比回复电邮 (vs. AIA)",
    improvePromptBtn: "🚀 升级您的提示词！(R.C.T.F.C.)",
    improvePromptSub: "点击下方任意 R.C.T.F.C. 维度加入简短指令（再次点击可移除）：",
    activateAllShort: "✨ 全选5维",
    clearAllShort: "✕ 清空5维",
    livePromptHeader: "✍️ 实时 AI 提示词",
    resetPromptBtn: "↺ 重置",
    clearPromptBtn: "✕ 清空",
    pillarTitles: {
      role: "R · 角色",
      context: "C · 背景",
      task: "T · 任务",
      format: "F · 格式",
      constraints: "C · 限制",
    },
  },

  yue: {
    studioHeader: "🎯 戰前顧問實戰工作台",
    badge: "挑戰 3 • 王牌顧問實戰手冊",
    assignedCase: "客戶個案：",
    switchCase: "轉個案",
    switchShortFmt: "轉個案",
    switchConfirmMsg: "確定轉去另一個客戶個案重新開始？",
    caseInfoBtn: "個案詳情",
    personalTouchBtn: "+ 💡 專屬心思（加分）",
    cardSettingsBar: "🎨 賀卡設定",
    promptHooksBar: "💬 破冰設定",
    comparisonSettingsBar: "📧 對比設定",
    editBtn: "✎ 修改",
    detailsBtn: "詳情",
    hideBtn: "收起",
    lifeEventLabel: "🎉 時刻",
    gapLabel: "⚠️ 缺口",
    offerLabel: "🛡️ PRU 方案",
    step1Tab: "1. 🎨 賀卡",
    step2Tab: "2. 💬 WhatsApp",
    step3Tab: "3. 📧 vs AIA",
    step1TabFull: "1. 🎨 窩心賀卡",
    step2TabFull: "2. 💬 首條 WhatsApp",
    step3TabFull: "3. 📧 應對 AIA 比較",
    step3LockedShort: "3. 🔒 第3步",
    step3LockedFull: "3. 🔒 Send 咗 WhatsApp 先解鎖",

    step1Title: "第 1 步：整張專屬開門紅賀卡",
    pickVisualStyle: "1. 揀賀卡視覺風格：",
    visualStyles: [
      { id: "watercolor", label: "🎨 溫馨手繪水彩風", prompt: "Warm hand-painted storybook watercolor illustration, soft golden family glow, heartfelt emotional warmth" },
      { id: "prestige", label: "✨ 尊尚紅金高管風", prompt: "Luxury executive stationery card with refined crimson-red and brushed-gold accents, crisp modern typography" },
      { id: "malaysian", label: "🇲🇾 大馬本土屋企溫情", prompt: "Authentic modern Malaysian home & skyline warmth, joyful celebratory atmosphere, vibrant sunlight" },
    ],
    pickHeadline: "2. 揀賀卡主標題：",
    cardTouchLabel: "3. 💡 加少少你個人創意細節（選填 — 打幾個字就得）：",
    cardTouchHint: "貼士：可以加個畫面細節（例如公仔熊、新屋鎖匙、鮮花）或者一句窩心祝福 — 撳下面靈感詞即刻改，或者打你自己諗法！",
    cardTouchPlaceholder: "例如：加隻得意公仔熊同埋屋企祝福...",
    generatingCard: "🎨 緊係幫緊你畫賀卡...",
    redrawCard: "↻ 重新畫過張卡",
    generateCardBtn: "🎨 生成專屬賀卡",
    cardReadyMsg: "✓ 賀卡搞掂！跟住構思你第一條破冰 WhatsApp。",
    nextStep2Btn: "下一步：寫首條 WhatsApp →",
    cardAttachedBadge: "✓ 已連埋第1步賀卡",
    editCardBtn: "改返張卡",

    step2Title: "第 2 步：首條 WhatsApp 破冰（人情味開場 + 財富規劃亮點）",
    pickOpeningTone: "1. 你想點樣開場？",
    openingTones: [
      { id: "warm_zero_push", label: "❤️ 真心祝賀先（零 Hard Sell）", prompt: "Open with 100% genuine celebration and warmth, zero sales pressure" },
      { id: "casual_checkin", label: "☕ 老朋友輕鬆問候", prompt: "Warm, friendly check-in like a trusted longtime family advisor" },
      { id: "card_gift", label: "🎁 連埋專屬賀卡送祝福", prompt: "Lead with the custom greeting card made specially for their milestone" },
    ],
    pickWealthHooks: "2. 想輕輕帶出邊幾個財富規劃亮點？（撳 1 個或多個）：",
    selectAllIdeas: "✓ 全選亮點",
    waTouchLabel: "3. 💡 加一句你嘅人情味 / 關係心思（選填 — 打短短一句）：",
    waTouchHint: "貼士：提下以前點識、屋企貼心問候，或者約飲杯啡 / Send 份兩分鐘懶人包 — 撳下面靈感詞或者自己寫！",
    waTouchPlaceholder: "例如：趁 BB 瞓晏覺 Send 份兩分鐘懶人包俾你睇，完全唔急...",
    waGenerateBtn: "✨ 生成我嘅 WhatsApp 破冰信息",
    waRegenerateBtn: "↻ 按最新諗法重新生成",
    waDrafting: "⚡ 寫緊 WhatsApp...",
    waPreviewHeader: "📱 WhatsApp 即時預覽（撳入去可以直接執字眼）：",
    waEmptyHint: "👆 先喺上面揀開場方式同財富亮點（可加埋個人心思），再撳「生成我嘅 WhatsApp 破冰信息」！",
    quickPolishLabel: "一撳執靚：",
    waPolishes: [
      { label: "↻ 再短啲精警啲", inst: "Make it 25% shorter, punchier, and effortless to read on a phone" },
      { label: "↻ 更加窩心有人情味", inst: "Make the tone even warmer, more personal, and more empathetic" },
      { label: "↻ 突出財富數字亮點", inst: "Make the financial/wealth benefit crystal-clear in one simple sentence" },
    ],
    backBtn: "← 上一步",
    nextStep3Btn: "📲 Send WhatsApp 信息 →",
    resendWaBtn: "📲 重新 Send WhatsApp →",
    sendingWaBtn: "📤 正在透過 WhatsApp 發送...",
    sentWaLabel: "你嘅 WhatsApp 已送達",
    typingLabel: "💬 個客喺 WhatsApp 打緊字覆你...",

    incomingBubbleTag: "📲 個客啱啱覆咗你 WhatsApp • 剛剛",
    pickWinningFacts: "1. 揀贏過 AIA 嘅實際條款優勢（單選或一撳全選 3 項）：",
    selectAll3Facts: "✓ 全選 3 大優勢",
    pickAdvisoryStyle: "2. 揀你嘅專業溝通風格：",
    advisoryStyles: [
      { id: "respectful", label: "🤝 大方尊重 · 客觀專業", prompt: "Acknowledge AIA respectfully while showing factually why PRU fits their family gap better" },
      { id: "crisp_bullets", label: "📊 3點清晰重點對比", prompt: "Ultra-clear side-by-side 3-bullet executive comparison for fast decision-making" },
      { id: "peace_of_mind", label: "👨‍👩‍👦 守護屋企長遠安心", prompt: "Connect each policy clause back to protecting their family's long-term peace of mind" },
    ],
    closeTouchLabel: "3. 💡 你想點樣約實下一步傾？（選填 — 打你嘅收尾心思）：",
    closeTouchHint: "貼士：提議 10 分鐘 Zoom 時間、拍住兩份 PDF 一齊睇，或者叫埋另一半一齊聽 — 撳下面靈感或者自己打！",
    closeTouchPlaceholder: "例如：星期四晚8點半 BB 瞓咗之後用10分鐘 Zoom 拍住兩份表睇...",
    emailGenerateBtn: "✨ 生成專業對比回覆電郵",
    emailRegenerateBtn: "↻ 重新生成對比電郵",
    emailDrafting: "⚡ 寫緊對比電郵...",
    emailPreviewHeader: "📧 你嘅專業方案對比電郵（交之前可以隨時改）：",
    emailEmptyHint: "👆 喺上面揀好條款優勢同約見方式，再撳「生成專業對比回覆電郵」！",
    emailPolishes: [
      { label: "↻ 再精簡易睇", inst: "Tighten into a crisp, skimmable 90-word executive email" },
      { label: "↻ 更溫和顧問語氣", inst: "Make the tone extra gracious, consultative, and zero-pressure" },
      { label: "↻ 強化條款分野", inst: "Make the exact clause differences between PRU and AIA stand out clearly" },
    ],
    submittingBtn: "⚡ 計緊分並同步去大螢幕...",
    finalSubmitBtn: "🚀 提交完整 Pre-Pitch 兼睇分",
    submittedBadge: "✓ 已經提交",
    scoreLabel: "🏆 得分：",
    waFinalHeader: "💬 1. 首條 WhatsApp 破冰信息",
    emailFinalHeader: "📧 2. 方案對比回覆電郵 (vs. AIA)",
    improvePromptBtn: "🚀 升級你嘅提示詞！(R.C.T.F.C.)",
    improvePromptSub: "撳下面任何一個 R.C.T.F.C. 維度加入簡短指令（再撳一次即可移除）：",
    activateAllShort: "✨ 全選5維",
    clearAllShort: "✕ 清空5維",
    livePromptHeader: "✍️ 即時 AI 提示詞",
    resetPromptBtn: "↺ 重設",
    clearPromptBtn: "✕ 清空",
    pillarTitles: {
      role: "R · 角色",
      context: "C · 背景",
      task: "T · 任務",
      format: "F · 格式",
      constraints: "C · 限制",
    },
  },

  ms: {
    studioHeader: "🎯 Studio Pra-Pitch Perunding",
    badge: "CABARAN 3 • BUKU PANDUAN PERUNDING",
    assignedCase: "Kes Pelanggan:",
    switchCase: "Tukar Kes",
    switchShortFmt: "Tukar",
    switchConfirmMsg: "Tukar kes pelanggan dan mulakan Pra-Pitch baharu?",
    caseInfoBtn: "Info Kes",
    personalTouchBtn: "+ 💡 Sentuhan Peribadi (Bonus)",
    cardSettingsBar: "🎨 Tetapan Kad",
    promptHooksBar: "💬 Idea Pembuka",
    comparisonSettingsBar: "📧 Tetapan Banding",
    editBtn: "✎ Ubah",
    detailsBtn: "Butiran",
    hideBtn: "Tutup",
    lifeEventLabel: "🎉 Detik",
    gapLabel: "⚠️ Jurang",
    offerLabel: "🛡️ Pelan PRU",
    step1Tab: "1. 🎨 Kad",
    step2Tab: "2. 💬 WhatsApp",
    step3Tab: "3. 📧 lwn AIA",
    step1TabFull: "1. 🎨 Kad Ucapan",
    step2TabFull: "2. 💬 WhatsApp Pertama",
    step3TabFull: "3. 📧 Banding lwn AIA",
    step3LockedShort: "3. 🔒 Langkah 3",
    step3LockedFull: "3. 🔒 Hantar WhatsApp Dahulu",

    step1Title: "Langkah 1: Kad Ucapan Pembuka Bicara Mesra",
    pickVisualStyle: "1. Pilih Gaya Visual Kad:",
    visualStyles: [
      { id: "watercolor", label: "🎨 Cat Air Keluarga Mesra", prompt: "Warm hand-painted storybook watercolor illustration, soft golden family glow, heartfelt emotional warmth" },
      { id: "prestige", label: "✨ Prestij Merah & Emas", prompt: "Luxury executive stationery card with refined crimson-red and brushed-gold accents, crisp modern typography" },
      { id: "malaysian", label: "🇲🇾 Kehangatan Keluarga Malaysia", prompt: "Authentic modern Malaysian home & skyline warmth, joyful celebratory atmosphere, vibrant sunlight" },
    ],
    pickHeadline: "2. Pilih Tajuk Ucapan:",
    cardTouchLabel: "3. 💡 Tambah Sentuhan Kreatif Anda (Pilihan — taip beberapa patah perkataan):",
    cardTouchHint: "Tip: Nyatakan perincian mesra (cth. patung beruang, kunci rumah, bunga) atau doa keluarga — tekan contoh di bawah atau taip idea anda!",
    cardTouchPlaceholder: "cth. Tambah patung beruang comel & doa kesejahteraan keluarga...",
    generatingCard: "🎨 Mencipta Kad Anda...",
    redrawCard: "↻ Jana Semula Kad",
    generateCardBtn: "🎨 Cipta Kad Ucapan",
    cardReadyMsg: "✓ Kad Ucapan siap! Sekarang rangka WhatsApp sentuhan pertama anda.",
    nextStep2Btn: "Seterusnya: Rangka WhatsApp Pertama →",
    cardAttachedBadge: "✓ Kad Langkah 1 Dilampirkan",
    editCardBtn: "Tukar Kad",

    step2Title: "Langkah 2: WhatsApp Pertama (Empati + Idea Kekayaan)",
    pickOpeningTone: "1. Bagaimana anda mahu memulakan perbualan?",
    openingTones: [
      { id: "warm_zero_push", label: "❤️ Raikan Dahulu (Tanpa Tekanan)", prompt: "Open with 100% genuine celebration and warmth, zero sales pressure" },
      { id: "casual_checkin", label: "☕ Sapaan Santai 2 Minit", prompt: "Warm, friendly check-in like a trusted longtime family advisor" },
      { id: "card_gift", label: "🎁 Sertakan Hadiah Kad", prompt: "Lead with the custom greeting card made specially for their milestone" },
    ],
    pickWealthHooks: "2. Idea Perancangan Kekayaan untuk dikongsi (Tekan 1 atau lebih):",
    selectAllIdeas: "✓ Pilih Semua Idea",
    waTouchLabel: "3. 💡 Tambah Sentuhan Hubungan Peribadi Anda (Pilihan — taip 5–10 perkataan):",
    waTouchHint: "Tip: Sebut kenangan bersama, ucapan prihatin keluarga, atau tawaran ringkasan 2 minit — tekan contoh di bawah atau taip sendiri!",
    waTouchPlaceholder: "cth. Hantar ringkasan 2 minit semasa bayi tidur, tiada paksaan...",
    waGenerateBtn: "✨ Rangka Mesej WhatsApp Saya",
    waRegenerateBtn: "↻ Rangka Semula dengan Idea Baharu",
    waDrafting: "⚡ Merangka WhatsApp...",
    waPreviewHeader: "📱 Pratonton WhatsApp (Boleh sunting terus jika mahu):",
    waEmptyHint: "👆 Pilih nada pembukaan & idea kekayaan di atas, tambah sentuhan peribadi, kemudian tekan 'Rangka Mesej WhatsApp Saya'!",
    quickPolishLabel: "Gilap Pantas 1-Tekan:",
    waPolishes: [
      { label: "↻ Lebih Ringkas & Padat", inst: "Make it 25% shorter, punchier, and effortless to read on a phone" },
      { label: "↻ Lebih Mesra & Prihatin", inst: "Make the tone even warmer, more personal, and more empathetic" },
      { label: "↻ Jelas Angka Manfaat", inst: "Make the financial/wealth benefit crystal-clear in one simple sentence" },
    ],
    backBtn: "← Kembali",
    nextStep3Btn: "📲 Hantar Mesej WhatsApp →",
    resendWaBtn: "📲 Hantar Semula WhatsApp →",
    sendingWaBtn: "📤 Menghantar melalui WhatsApp...",
    sentWaLabel: "WhatsApp Anda Dihantar",
    typingLabel: "💬 Pelanggan sedang menaip balasan...",

    incomingBubbleTag: "📲 Balasan WhatsApp Pelanggan • Sebentar tadi",
    pickWinningFacts: "1. Pilih Kelebihan Fakta PRU lwn AIA (Tekan kad atau Pilih Semua 3):",
    selectAll3Facts: "✓ Pilih Ketiga-tiga Kelebihan",
    pickAdvisoryStyle: "2. Pilih Gaya Nasihat Anda:",
    advisoryStyles: [
      { id: "respectful", label: "🤝 Profesional & Adil", prompt: "Acknowledge AIA respectfully while showing factually why PRU fits their family gap better" },
      { id: "crisp_bullets", label: "📊 Ringkasan 3 Poin Jelas", prompt: "Ultra-clear side-by-side 3-bullet executive comparison for fast decision-making" },
      { id: "peace_of_mind", label: "👨‍👩‍👦 Ketenangan Keluarga", prompt: "Connect each policy clause back to protecting their family's long-term peace of mind" },
    ],
    closeTouchLabel: "3. 💡 Bagaimana Anda Mahu Menutup Temujanji? (Pilihan — taip idea anda):",
    closeTouchHint: "Tip: Cadangkan Zoom/kopi 10 minit, semak kedua-dua PDF bersebelahan, atau jemput pasangan — tekan contoh atau taip sendiri!",
    closeTouchPlaceholder: "cth. Zoom 10 minit jam 8:30 malam untuk bandingkan kedua-dua jadual...",
    emailGenerateBtn: "✨ Rangka E-mel Perbandingan",
    emailRegenerateBtn: "↻ Rangka Semula E-mel",
    emailDrafting: "⚡ Merangka E-mel...",
    emailPreviewHeader: "📧 E-mel Perbandingan Anda (Boleh disunting sebelum hantar):",
    emailEmptyHint: "👆 Pilih kelebihan PRU & cara penutup di atas, kemudian tekan 'Rangka E-mel Perbandingan'!",
    emailPolishes: [
      { label: "↻ Lebih Padat", inst: "Tighten into a crisp, skimmable 90-word executive email" },
      { label: "↻ Nada MDRT Lembut", inst: "Make the tone extra gracious, consultative, and zero-pressure" },
      { label: "↻ Kontras Klausa Jelas", inst: "Make the exact clause differences between PRU and AIA stand out clearly" },
    ],
    submittingBtn: "⚡ Mengira Skor Pra-Pitch...",
    finalSubmitBtn: "🚀 Hantar Pra-Pitch & Lihat Skor",
    submittedBadge: "✓ DIHANTAR",
    scoreLabel: "🏆 Skor:",
    waFinalHeader: "💬 1. Mesej WhatsApp Pertama",
    emailFinalHeader: "📧 2. E-mel Perbandingan Pelan (lwn AIA)",
    improvePromptBtn: "🚀 Tingkatkan Prompt Anda! (R.C.T.F.C.)",
    improvePromptSub: "Ketik mana-mana tiang R.C.T.F.C. untuk menambah atau membuang arahan ringkas:",
    activateAllShort: "✨ Aktif 5",
    clearAllShort: "✕ Kosongkan",
    livePromptHeader: "✍️ Prompt AI Langsung",
    resetPromptBtn: "↺ Tetap Semula",
    clearPromptBtn: "✕ Kosongkan",
    pillarTitles: {
      role: "R · Peranan",
      context: "C · Konteks",
      task: "T · Tugasan",
      format: "F · Format",
      constraints: "C · Kekangan",
    },
  },

  ta: {
    studioHeader: "🎯 முன்-முன்மொழிவு ஸ்டுடியோ",
    badge: "சவால் 3 • ஆலோசகர் வழிகாட்டி",
    assignedCase: "வாடிக்கையாளர்:",
    switchCase: "கேஸ் மாற்று",
    switchShortFmt: "மாற்று",
    switchConfirmMsg: "வாடிக்கையாளர் கேஸை மாற்றி புதிதாகத் தொடங்கவா?",
    caseInfoBtn: "கேஸ் விவரம்",
    personalTouchBtn: "+ 💡 தனிப்பட்ட தொடல் (போனஸ்)",
    cardSettingsBar: "🎨 அட்டை அமைப்பு",
    promptHooksBar: "💬 தொடக்க அமைப்பு",
    comparisonSettingsBar: "📧 ஒப்பீட்டு அமைப்பு",
    editBtn: "✎ திருத்து",
    detailsBtn: "விவரம்",
    hideBtn: "மறை",
    lifeEventLabel: "🎉 நிகழ்வு",
    gapLabel: "⚠️ இடைவெளி",
    offerLabel: "🛡️ PRU திட்டம்",
    step1Tab: "1. 🎨 அட்டை",
    step2Tab: "2. 💬 WhatsApp",
    step3Tab: "3. 📧 vs AIA",
    step1TabFull: "1. 🎨 வாழ்த்து அட்டை",
    step2TabFull: "2. 💬 முதல் WhatsApp",
    step3TabFull: "3. 📧 AIA ஒப்பீடு",
    step3LockedShort: "3. 🔒 படி 3",
    step3LockedFull: "3. 🔒 முதலில் WhatsApp அனுப்புக",

    step1Title: "படி 1: அன்பான வாழ்த்து அட்டையை உருவாக்குங்கள்",
    pickVisualStyle: "1. அட்டையின் காட்சி பாணியைத் தேர்ந்தெடுக்கவும்:",
    visualStyles: [
      { id: "watercolor", label: "🎨 குடும்ப நீர்வண்ண ஓவியம்", prompt: "Warm hand-painted storybook watercolor illustration, soft golden family glow, heartfelt emotional warmth" },
      { id: "prestige", label: "✨ சிவப்பு & தங்க பிரீமியம்", prompt: "Luxury executive stationery card with refined crimson-red and brushed-gold accents, crisp modern typography" },
      { id: "malaysian", label: "🇲🇾 மலேசிய இல்லற அன்பு", prompt: "Authentic modern Malaysian home & skyline warmth, joyful celebratory atmosphere, vibrant sunlight" },
    ],
    pickHeadline: "2. வாழ்த்துத் தலைப்பைத் தேர்ந்தெடுக்கவும்:",
    cardTouchLabel: "3. 💡 உங்கள் சொந்த படைப்புத் தொடலைச் சேர்க்கவும் (விருப்பத்தேர்வு — சில சொற்கள்):",
    cardTouchHint: "குறிப்பு: அழகான காட்சி விவரம் (பொம்மை கரடி, வீட்டு சாவி, பூக்கள்) அல்லது குடும்ப வாழ்த்தைச் சேர்க்கலாம் — கீழே உள்ள குறிப்பைத் தட்டவும் அல்லது தட்டச்சு செய்யவும்!",
    cardTouchPlaceholder: "எ.கா. அழகான பொம்மை கரடி மற்றும் குடும்ப ஆசீர்வாதம்...",
    generatingCard: "🎨 அட்டை தயாராகிறது...",
    redrawCard: "↻ மீண்டும் உருவாக்கு",
    generateCardBtn: "🎨 வாழ்த்து அட்டையை உருவாக்கு",
    cardReadyMsg: "✓ வாழ்த்து அட்டை தயார்! இப்போது முதல் WhatsApp செய்தியை உருவாக்குவோம்.",
    nextStep2Btn: "அடுத்து: முதல் WhatsApp →",
    cardAttachedBadge: "✓ படி 1 அட்டை இணைக்கப்பட்டது",
    editCardBtn: "மாற்று",

    step2Title: "படி 2: முதல் WhatsApp செய்தி (அக்கறை + செல்வ யோசனை)",
    pickOpeningTone: "1. உரையாடலை எவ்வாறு தொடங்க விரும்புகிறீர்கள்?",
    openingTones: [
      { id: "warm_zero_push", label: "❤️ முதலில் வாழ்த்து (விற்பனை அழுத்தமின்றி)", prompt: "Open with 100% genuine celebration and warmth, zero sales pressure" },
      { id: "casual_checkin", label: "☕ நட்பான 2-நிமிட நலம் விசாரிப்பு", prompt: "Warm, friendly check-in like a trusted longtime family advisor" },
      { id: "card_gift", label: "🎁 வாழ்த்து அட்டை பரிசுடன் தொடங்கு", prompt: "Lead with the custom greeting card made specially for their milestone" },
    ],
    pickWealthHooks: "2. எந்த செல்வத் திட்டமிடல் கருத்துக்களைப் பகிர்வீர்கள்? (1 அல்லது அதற்கு மேல்):",
    selectAllIdeas: "✓ அனைத்தையும் தேர்ந்தெடு",
    waTouchLabel: "3. 💡 உங்கள் தனிப்பட்ட நட்புத் தொடலைச் சேர்க்கவும் (விருப்பத்தேர்வு — 5–10 சொற்கள்):",
    waTouchHint: "குறிப்பு: பழைய நட்பு நினைவு, குடும்ப அக்கறை அல்லது எளிய காபி/சுருக்க அழைப்பைக் குறிப்பிடலாம் — கீழே உள்ள குறிப்பைத் தட்டவும் அல்லது எழுதவும்!",
    waTouchPlaceholder: "எ.கா. குழந்தை தூங்கும்போது 2 நிமிட சுருக்கத்தை அனுப்புகிறேன்...",
    waGenerateBtn: "✨ எனது WhatsApp செய்தியை உருவாக்கு",
    waRegenerateBtn: "↻ மீண்டும் உருவாக்கு",
    waDrafting: "⚡ உருவாக்குகிறது...",
    waPreviewHeader: "📱 நேரடி WhatsApp முன்னோட்டம் (விரும்பினால் திருத்தலாம்):",
    waEmptyHint: "👆 மேலே தொடக்க முறை & செல்வ கருத்துக்களைத் தேர்ந்தெடுத்து, 'எனது WhatsApp செய்தியை உருவாக்கு' என்பதை அழுத்தவும்!",
    quickPolishLabel: "1-தட்டல் மெருகூட்டல்:",
    waPolishes: [
      { label: "↻ சுருக்கமாக மாற்று", inst: "Make it 25% shorter, punchier, and effortless to read on a phone" },
      { label: "↻ மேலும் அன்பாக மாற்று", inst: "Make the tone even warmer, more personal, and more empathetic" },
      { label: "↻ எண்களைத் தெளிவாக்கு", inst: "Make the financial/wealth benefit crystal-clear in one simple sentence" },
    ],
    backBtn: "← பின்செல்",
    nextStep3Btn: "📲 WhatsApp செய்தி அனுப்பு →",
    resendWaBtn: "📲 மீண்டும் WhatsApp அனுப்பு →",
    sendingWaBtn: "📤 WhatsApp வழியாக அனுப்புகிறது...",
    sentWaLabel: "உங்கள் WhatsApp அனுப்பப்பட்டது",
    typingLabel: "💬 வாடிக்கையாளர் தட்டச்சு செய்கிறார்...",

    incomingBubbleTag: "📲 வாடிக்கையாளரின் WhatsApp பதில் • இப்போது",
    pickWinningFacts: "1. AIA-வை வெல்லும் PRU நன்மைகளைத் தேர்ந்தெடுக்கவும் (அனைத்து 3-ம் சேர்க்கலாம்):",
    selectAll3Facts: "✓ அனைத்து 3 நன்மைகளையும் தேர்ந்தெடு",
    pickAdvisoryStyle: "2. உங்கள் ஆலோசனை பாணியைத் தேர்ந்தெடுக்கவும்:",
    advisoryStyles: [
      { id: "respectful", label: "🤝 மரியாதையான & நேர்மையான", prompt: "Acknowledge AIA respectfully while showing factually why PRU fits their family gap better" },
      { id: "crisp_bullets", label: "📊 தெளிவான 3-புள்ளி சுருக்கம்", prompt: "Ultra-clear side-by-side 3-bullet executive comparison for fast decision-making" },
      { id: "peace_of_mind", label: "👨‍👩‍👦 குடும்ப மன அமைதி", prompt: "Connect each policy clause back to protecting their family's long-term peace of mind" },
    ],
    closeTouchLabel: "3. 💡 சந்திப்பை எவ்வாறு உறுதி செய்வீர்கள்? (விருப்பத்தேர்வு — உங்கள் யோசனை):",
    closeTouchHint: "குறிப்பு: 10 நிமிட Zoom நேரம், இரண்டு PDF அட்டவணைகளையும் ஒப்பிடுதல் அல்லது வாழ்க்கைத் துணையை அழைத்தல் — கீழே தட்டவும் அல்லது எழுதவும்!",
    closeTouchPlaceholder: "எ.கா. இரவு 8:30 மணிக்கு 10 நிமிட Zoom-ல் இரண்டு அட்டவணைகளையும் ஒப்பிடுவோம்...",
    emailGenerateBtn: "✨ ஒப்பீட்டு மின்னஞ்சலை உருவாக்கு",
    emailRegenerateBtn: "↻ மீண்டும் உருவாக்கு",
    emailDrafting: "⚡ உருவாக்குகிறது...",
    emailPreviewHeader: "📧 உங்கள் ஒப்பீட்டு மின்னஞ்சல் (சமர்ப்பிக்கும் முன் திருத்தலாம்):",
    emailEmptyHint: "👆 மேலே PRU நன்மைகளைத் தேர்ந்தெடுத்து, 'ஒப்பீட்டு மின்னஞ்சலை உருவாக்கு' என்பதை அழுத்தவும்!",
    emailPolishes: [
      { label: "↻ சுருக்கமாக", inst: "Tighten into a crisp, skimmable 90-word executive email" },
      { label: "↻ மென்மையான MDRT தொனி", inst: "Make the tone extra gracious, consultative, and zero-pressure" },
      { label: "↻ விதிமுறை வேறுபாட்டைக் காட்டு", inst: "Make the exact clause differences between PRU and AIA stand out clearly" },
    ],
    submittingBtn: "⚡ மதிப்பெண் கணக்கிடுகிறது...",
    finalSubmitBtn: "🚀 சமர்ப்பித்து மதிப்பெண் பார்",
    submittedBadge: "✓ சமர்ப்பிக்கப்பட்டது",
    scoreLabel: "🏆 மதிப்பெண்:",
    waFinalHeader: "💬 1. முதல் WhatsApp செய்தி",
    emailFinalHeader: "📧 2. திட்ட ஒப்பீட்டு மின்னஞ்சல் (vs. AIA)",
    improvePromptBtn: "🚀 உங்கள் Prompt-ஐ மேம்படுத்துக! (R.C.T.F.C.)",
    improvePromptSub: "சுருக்கமான குறிப்பைச் சேர்க்க அல்லது நீக்க R.C.T.F.C. தூண்களைத் தட்டவும்:",
    activateAllShort: "✨ அனைத்தும் 5",
    clearAllShort: "✕ அழி",
    livePromptHeader: "✍️ நேரடி AI Prompt",
    resetPromptBtn: "↺ மீட்டமை",
    clearPromptBtn: "✕ அழி",
    pillarTitles: {
      role: "R · பங்கு",
      context: "C · சூழல்",
      task: "T · பணி",
      format: "F · வடிவம்",
      constraints: "C · விதிகள்",
    },
  },
};
C3_PLAYBOOK_UI["zh-TW"] = C3_PLAYBOOK_UI.yue;

const C3_ADVISOR_PLAYBOOK = {
  newborn_baby: {
    en: {
      cardHints: ["🧸 Cute teddy bear & baby cradle", "🌟 Healthy, joyful future for Baby Lucas", "💐 Warm flowers for proud new mum Chloe"],
      waIdeas: [
        { label: "💵 RM 500 Baby Cash Reward", detail: "Claim RM 500 Childbirth Cash Reward under PRUWith You Plus" },
        { label: "🛡️ Day-1 Baby Peace of Mind", detail: "Start PRUMy Child Plus early for Day-1 newborn wellness protection & pediatric peace of mind" },
        { label: "🏦 Fund via FD Interest", detail: "Fund baby's medical & PRUSaver Kid uni fund using just FD interest without touching savings principal" },
      ],
      waHints: ["Send a 2-min summary while Lucas naps", "So happy seeing your family grow since your wedding!", "Zero rush—read whenever you both get rest"],
      closeHints: ["10-min Zoom at 8:30pm after baby sleeps", "Compare both quotation PDFs side-by-side in 10 mins", "Send a 1-page comparison table on WhatsApp first"],
    },
    "zh-CN": {
      cardHints: ["🧸 加上可爱小泰迪熊与摇篮", "🌟 祝小 Lucas 健康快乐茁壮成长", "💐 送给新手妈妈晓雯的温馨花束"],
      waIdeas: [
        { label: "💵 RM 500 生育现金奖", detail: "通过 PRUWith You Plus 直接申领 RM 500 新生儿现金奖赏" },
        { label: "🛡️ 宝宝首日安心守护", detail: "尽早启动 PRUMy Child Plus，锁定宝宝初生首日全面健康守护与成长礼遇" },
        { label: "🏦 仅用定存利息规划", detail: "只用定期存款利息即可锁定医疗与 PRUSaver Kid 大学基金，不动本金" },
      ],
      waHints: ["趁宝宝午睡发一份2分钟简报给你们", "从你们结婚到现在迎来小宝贝，太替你们开心了", "完全不急，等你们休息好随时看"],
      closeHints: ["周四晚8点半宝宝睡后10分钟Zoom对照利益表", "把两份计划书PDF重点做成1页对比表发您", "周末喝杯咖啡10分钟轻松聊聊"],
    },
    yue: {
      cardHints: ["🧸 加隻得意公仔熊同BB搖籃", "🌟 祝小 Lucas 快高長大聰明伶俐", "💐 送俾新手媽咪曉雯嘅溫馨花束"],
      waIdeas: [
        { label: "💵 RM 500 添丁現金獎", detail: "透過 PRUWith You Plus 即刻領取 RM 500 添丁現金獎" },
        { label: "🛡️ 初生首日周全守護", detail: "及早啟動 PRUMy Child Plus，鎖定 BB 初生首日健康守護同成長禮遇" },
        { label: "🏦 淨用定存利息供款", detail: "淨係用定期存款利息就鎖定醫療同 PRUSaver Kid 大學基金，唔使郁本金" },
      ],
      waHints: ["趁 BB 瞓晏覺 Send 份2分鐘懶人包俾你哋", "由你哋結婚到今日抱 B，真係好替你哋開心", "完全唔急，等你哋唞夠得閒先睇"],
      closeHints: ["星期四晚8點半 BB 瞓咗用10分鐘 Zoom 拍住睇", "幫你整張1頁紙重點對比表 Send 俾你先", "週末飲杯啡10分鐘輕鬆傾吓"],
    },
    ms: {
      cardHints: ["🧸 Patung beruang comel & buaian bayi", "🌟 Masa depan cerah & sihat buat Baby Lucas", "💐 Jambangan bunga mesra buat ibu baharu"],
      waIdeas: [
        { label: "💵 Ganjaran Tunai Bayi RM 500", detail: "Tuntut Ganjaran Tunai Kelahiran RM 500 di bawah PRUWith You Plus" },
        { label: "🛡️ Perlindungan Awal Bayi Hari-1", detail: "Mulakan PRUMy Child Plus awal untuk perlindungan kesejahteraan bayi sejak Hari Pertama" },
        { label: "🏦 Guna Faedah FD Sahaja", detail: "Biayai pelan bayi & tabung universiti PRUSaver Kid guna faedah FD tanpa usik pokok" },
      ],
      waHints: ["Hantar ringkasan 2 minit semasa Lucas tidur", "Tumpang gembira melihat keluarga anda bertambah seri!", "Tiada paksaan—baca bila anda berdua sempat berehat"],
      closeHints: ["Zoom 10 minit jam 8:30 malam selepas bayi tidur", "Bandingkan kedua-dua jadual PDF sebelah-menyebelah", "Saya hantarkan jadual 1 muka surat di WhatsApp dahulu"],
    },
    ta: {
      cardHints: ["🧸 அழகான பொம்மை கரடி & தொட்டில்", "🌟 குழந்தை Lucas ஆரோக்கியமாக வளர வாழ்த்து", "💐 புதிய தாய்க்கு அன்பான மலர்க்கொத்து"],
      waIdeas: [
        { label: "💵 RM 500 குழந்தை ரொக்கப் பரிசு", detail: "PRUWith You Plus மூலம் RM 500 பிறப்பு ரொக்கப் பரிசைப் பெறுங்கள்" },
        { label: "🛡️ முதல் நாள் குழந்தை நலப் பாதுகாப்பு", detail: "PRUMy Child Plus மூலம் குழந்தையின் முதல் நாள் நலன் மற்றும் வளர்ச்சிப் பாதுகாப்பு" },
        { label: "🏦 FD வட்டி மூலம் மட்டும் சேமிப்பு", detail: "அசல் தொகையைத் தொடாமல் FD வட்டி மூலமே PRUSaver Kid பல்கலைக்கழக நிதி" },
      ],
      waHints: ["குழந்தை தூங்கும்போது 2 நிமிட சுருக்கம் அனுப்புகிறேன்", "உங்கள் குடும்பத்தின் இந்த மகிழ்ச்சியில் நானும் பங்கு கொள்கிறேன்", "அவசரமில்லை—ஓய்வு கிடைக்கும்போது பாருங்கள்"],
      closeHints: ["இரவு 8:30 மணிக்கு 10 நிமிட Zoom-ல் ஒப்பிடுவோம்", "இரண்டு PDF அட்டவணைகளையும் 1 பக்கத்தில் ஒப்பிட்டுக் காட்டுகிறேன்", "WhatsApp-ல் 1 பக்க சுருக்கத்தை முதலில் அனுப்புகிறேன்"],
    },
  },

  ci_health_scare: {
    en: {
      cardHints: ["🥂 Festive 40th birthday toast & golden sunrise", "⚡ Celebrating A+ peak health & career momentum", "🏥 Premier private suite peace of mind for your 40s"],
      waIdeas: [
        { label: "🏥 RM 8M Suite + 15% Cash Saver", detail: "Upgrade to PRUMillion Med Active 2.0 (RM 8M private hospital suite cover + 15% instant healthy no-claim cash discount at Age-39 rates)" },
        { label: "⚡ ~190 Conditions to Age 100", detail: "Lock in comprehensive wellness & recovery protection across ~190 conditions up to Age 100 via PRUAll Care" },
        { label: "💰 110% Maturity Cash Refund", detail: "Pair PRUMan for 260% executive wellness protection + up to 110% total premium cash refund at maturity" },
      ],
      waHints: ["Early Happy 40th & congrats on your A+ wellness checkup!", "Quick 2-min tip to lock Age-39 rates + 15% healthy cash discount", "Celebratory 10-min coffee this Friday?"],
      closeHints: ["Celebratory 10-min birthday coffee before your Age-39 window closes", "Compare RM 8M 15% cash discount & Age-100 tables side-by-side", "Quick 10-min Zoom Thursday evening"],
    },
    "zh-CN": {
      cardHints: ["🥂 40岁生日香槟举杯与金色日出", "⚡ 祝贺体检全优达标与巅峰状态", "🏥 尊尚私家病房健康护航黄金十年"],
      waIdeas: [
        { label: "🏥 RM 800万医疗 + 15%现金折", detail: "趁39岁黄金费率升级 PRUMillion Med Active 2.0（RM 800万私家医院尊尚保障 + 无索赔立减15%现金保费）" },
        { label: "⚡ ~190项全面守护至100岁", detail: "搭配 PRUAll Care 锁定约190项全方位健康与康复守护直至100岁" },
        { label: "💰 满期高达 110% 保费返还", detail: "结合 PRUMan 享260%高管健康保障，满期最高返还高达110%已缴总保费" },
      ],
      waHints: ["提前祝40岁生日快乐，更恭喜年度体检全优达标！", "趁40岁生日前帮您锁住39岁费率与15%健康现金折扣", "周五请您喝杯10分钟庆生咖啡？"],
      closeHints: ["生日前喝杯10分钟庆生咖啡并排看利益表", "一页表看清15%真金白银折扣与保至100岁优势", "周四晚用10分钟Zoom快速过一遍"],
    },
    yue: {
      cardHints: ["🥂 40歲生日舉杯同金色日出賀圖", "⚡ 恭喜體檢靚仔達標同巔峰狀態", "🏥 尊尚私家病房護航黃金十年"],
      waIdeas: [
        { label: "🏥 RM 800萬醫療 + 15%現金折", detail: "趁39歲靚價升級 PRUMillion Med Active 2.0（RM 800萬私家醫院尊尚保障 + 無索償即減15%現金保費）" },
        { label: "⚡ ~190項周全守護到100歲", detail: "配搭 PRUAll Care 保足約190項全面健康同康復保障直到100歲" },
        { label: "💰 期滿高達 110% 回贈保費", detail: "配埋 PRUMan 享260%高管健康保障，期滿攞返高達110%總保費" },
      ],
      waHints: ["預祝40歲生日快樂，仲要恭喜年度體檢靚仔達標！", "趕喺40歲生日前幫你鎖實39歲靚價同15%現金折扣", "星期五請你飲杯10分鐘慶生啡？"],
      closeHints: ["生日前約個10分鐘飲杯慶生啡拍住睇條款", "一頁紙對比15%真減保費同保到100歲優勢", "星期四晚10分鐘 Zoom 快閃傾吓"],
    },
    ms: {
      cardHints: ["🥂 Sambutan hari jadi ke-40 & matahari terbit emas", "⚡ Meraikan kesihatan A+ & momentum kerjaya", "🏥 Ketenangan suite hospital premier untuk dekad baharu"],
      waIdeas: [
        { label: "🏥 Suite RM 8J + Diskaun Tunai 15%", detail: "Naik taraf ke PRUMillion Med Active 2.0 (suite hospital swasta RM 8J + diskaun tunai sihat 15% pada kadar Umur 39)" },
        { label: "⚡ ~190 Perlindungan hingga 100", detail: "PRUAll Care melindungi ~190 kondisi kesejahteraan & pemulihan hingga Umur 100" },
        { label: "💰 Pulangan Matang 110%", detail: "Padankan PRUMan untuk 260% perlindungan eksekutif + pulangan tunai sehingga 110% jumlah premium" },
      ],
      waHints: ["Selamat Hari Jadi ke-40 awal & tahniah rekod kesihatan A+!", "Tip pantas 2 minit kunci kadar Umur 39 + diskaun tunai sihat 15%", "Minum kopi sambutan 10 minit Jumaat ini?"],
      closeHints: ["Kopi sambutan 10 minit sebelum tetingkap Umur 39 ditutup", "Bandingkan diskaun tunai 15% RM 8J & jadual Umur 100", "Zoom ringkas 10 minit Khamis malam"],
    },
    ta: {
      cardHints: ["🥂 இனிய 40-வது பிறந்தநாள் & பொன்னிற உதயம்", "⚡ சிறந்த A+ ஆரோக்கியம் & தலைமைத்துவ வாழ்த்து", "🏥 RM 8M பிரீமியம் மருத்துவப் பாதுகாப்பு"],
      waIdeas: [
        { label: "🏥 RM 8M மருத்துவம் + 15% தள்ளுபடி", detail: "39 வயது சலுகைக் கட்டணத்தில் PRUMillion Med Active 2.0 (RM 8M மருத்துவ வரம்பு + 15% நேரடி ரொக்கத் தள்ளுபடி)" },
        { label: "⚡ 100 வயது வரை ~190 நலன்", detail: "PRUAll Care மூலம் ~190 நலன் & குணமடைதல் நிலைகளுக்கு 100 வயது வரை பாதுகாப்பு" },
        { label: "💰 110% முதிர்வுப் பணம் திரும்ப", detail: "PRUMan மூலம் 260% பாதுகாப்பு + முதிர்வில் 110% வரை பிரீமியம் திரும்பப் பெறுதல்" },
      ],
      waHints: ["இனிய 40-வது பிறந்தநாள் & சிறந்த உடல்நலப் பரிசோதனைக்கு வாழ்த்துகள்!", "40-வது பிறந்தநாளுக்கு முன் 39 வயது கட்டணம் & 15% தள்ளுபடி", "வெள்ளிக்கிழமை 10 நிமிடம் காபி அருந்திப் பேசலாமா?"],
      closeHints: ["பிறந்தநாளுக்கு முன் 10 நிமிட காபி சந்திப்பு", "RM 8M 15% தள்ளுபடி & 100 வயது பாதுகாப்பு ஒப்பீடு", "வியாழன் மாலை 10 நிமிட Zoom அழைப்பு"],
    },
  },

  new_home_mortgage: {
    en: {
      cardHints: ["🔑 Golden house keys & lush garden terrace", "🏡 Warm 'Selamat Masuk Rumah Baru' blessing", "🌿 Cozy family living room sunlight"],
      waIdeas: [
        { label: "🔑 RM 500 New Home Reward", detail: "Claim an immediate RM 500 New Home Goal Achievement Cash Reward under PRUWith You Plus" },
        { label: "🏠 Portable MLTA (Keep Surplus)", detail: "Protect the RM 1.3M mortgage with portable family-owned MLTA instead of bank-locked MRTA" },
        { label: "🛡️ 20% Mortgage Continuity Reserve", detail: "PRUAll Care adds a +20% mortgage continuity reserve to keep RM 5,600/mth installments smooth during recovery" },
      ],
      waHints: ["Congrats on your beautiful Eco Botanic semi-D!", "Celebrate housewarming first—happy to share a 2-min MRTA vs MLTA tip", "Coffee near Eco Botanic this weekend?"],
      closeHints: ["10-min coffee near Eco Botanic with you & Farah", "Side-by-side bank MRTA vs portable MLTA + AIA comparison", "Quick 10-min Zoom Sunday afternoon"],
    },
    "zh-CN": {
      cardHints: ["🔑 金色新居钥匙与花园洋房插画", "🏡 祝贺新居入伙阖家平安兴旺", "🌿 温馨阳光客厅与幸福家庭氛围"],
      waIdeas: [
        { label: "🔑 RM 500 新居现金奖", detail: "凭新屋拿钥匙直接申领 PRUWith You Plus RM 500 人生目标现金奖赏" },
        { label: "🏠 可携式 MLTA 胜过银行 MRTA", detail: "用可随身携带、盈余归家人的 MLTA 守护 RM 130万房贷，而非只赔银行的 MRTA" },
        { label: "🛡️ 20% 房贷延续储备金", detail: "PRUAll Care 额外加码 +20% 房贷延续储备金，稳妥守护每月 RM 5,600 供款顺畅" },
      ],
      waHints: ["恭喜喜提 Eco Botanic 新居金钥匙！", "先开心布置新家，顺手发您一份2分钟房贷护盾对比", "周末在 Eco Botanic 附近请你们喝杯咖啡？"],
      closeHints: ["周末在 Eco Botanic 喝杯10分钟咖啡和太太一起看", "一页纸看清银行MRTA、AIA与PRU可携式护盾差别", "周日晚8点10分钟Zoom轻松聊"],
    },
    yue: {
      cardHints: ["🔑 金色新屋鎖匙同花園洋房插畫", "🏡 恭喜新居入伙風生水起闔家平安", "🌿 陽光客廳同溫馨屋企氣氛"],
      waIdeas: [
        { label: "🔑 RM 500 新居現金獎", detail: "攞新屋鎖匙即刻領取 PRUWith You Plus RM 500 人生目標現金獎" },
        { label: "🏠 可攜式 MLTA 贏銀行 MRTA", detail: "用跟身兼餘額歸屋企人嘅 MLTA 守住 RM 130萬按揭，唔使綁死銀行 MRTA" },
        { label: "🛡️ 20% 供樓延續儲備金", detail: "PRUAll Care 額外加碼 +20% 供樓延續儲備金，確保每月 RM 5,600 供款順暢安心" },
      ],
      waHints: ["恭喜晒攞到 Eco Botanic 靚屋鎖匙！", "先開心執靚間新屋，順手 Send 份2分鐘按揭比較俾你", "週末喺 Eco Botanic 附近請你哋飲杯啡？"],
      closeHints: ["週末喺 Eco Botanic 同太太一齊飲杯啡睇10分鐘", "一頁紙拍住睇清銀行 MRTA、AIA 同 PRU 分別", "星期日晚8點10分鐘 Zoom 輕鬆傾"],
    },
    ms: {
      cardHints: ["🔑 Kunci emas rumah baharu & laman hijau", "🏡 Doa keberkatan 'Selamat Masuk Rumah Baharu'", "🌿 Suasana ruang tamu keluarga yang nyaman"],
      waIdeas: [
        { label: "🔑 Ganjaran Rumah Baharu RM 500", detail: "Tuntut Ganjaran Tunai Pencapaian RM 500 sempena kunci rumah baharu (PRUWith You Plus)" },
        { label: "🏠 MLTA Mudah Alih (Milik Keluarga)", detail: "Lindungi gadai janji RM 1.3J dengan MLTA milik keluarga berbanding MRTA terkunci bank" },
        { label: "🛡️ 20% Rizab Kesinambungan", detail: "PRUAll Care menambah +20% rizab kesinambungan gadai janji supaya ansuran RM 5,600/bln kekal lancar" },
      ],
      waHints: ["Tahniah atas kunci rumah Semi-D Eco Botanic yang indah!", "Selamat mengemas rumah baharu—saya kongsikan tip 2 minit MRTA lwn MLTA", "Jom minum kopi di Eco Botanic hujung minggu ini?"],
      closeHints: ["Kopi 10 minit di Eco Botanic bersama Farah", "Jadual ringkas 1 halaman MRTA Bank lwn AIA lwn PRU", "Zoom santai 10 minit Ahad petang"],
    },
    ta: {
      cardHints: ["🔑 தங்க வீட்டு சாவிகள் & அழகான தோட்டம்", "🏡 புதிய இல்லம் மகிழ்ச்சியும் வளமும் பெற வாழ்த்து", "🌿 ஒளிமயமான குடும்ப வரவேற்பறை"],
      waIdeas: [
        { label: "🔑 RM 500 புது வீடு ரொக்கப் பரிசு", detail: "புதிய வீட்டு சாவி பெற்றதற்கு PRUWith You Plus மூலம் RM 500 ரொக்கப் பரிசு" },
        { label: "🏠 குடும்பத்திற்கான Portable MLTA", detail: "வங்கி MRTA-க்கு பதில் குடும்பத்திற்கு உபரித் தொகை தரும் Portable MLTA பாதுகாப்பு" },
        { label: "🛡️ 20% கடன் தொடர்ச்சி நிதி", detail: "மாதம் RM 5,600 தவணை தடையின்றித் தொடர PRUAll Care +20% கூடுதல் தொடர்ச்சி நிதி" },
      ],
      waHints: ["Eco Botanic புதிய வீட்டு சாவிகள் பெற்றதற்கு மனமார்ந்த வாழ்த்துகள்!", "புது வீட்டு வேலைகளுக்கு நடுவே 2 நிமிட சுருக்கம் அனுப்புகிறேன்", "இந்த வார இறுதியில் Eco Botanic அருகே காபி அருந்தலாமா?"],
      closeHints: ["மனைவியுடன் 10 நிமிட காபி சந்திப்பில் ஒப்பிட்டுப் பார்ப்போம்", "வங்கி MRTA vs AIA vs PRU 1 பக்க ஒப்பீட்டு அட்டவணை", "ஞாயிறு மாலை 10 நிமிட Zoom அழைப்பு"],
    },
  },

  career_promotion: {
    en: {
      cardHints: ["🩺 Executive specialist office overlooking KLCC", "🌟 Celebrating leadership & medical excellence", "💐 Elegant orchids & gold prestige motif"],
      waIdeas: [
        { label: "🌟 Promotion Cash Reward", detail: "Unlock Career Milestone Cash Reward + up to 260% female CI cover under PRULady" },
        { label: "📈 103% Day-1 Wealth Boost", detail: "Deploy surplus income via PRUElite Invest with 103% Day-1 premium allocation (+3% instant boost)" },
        { label: "🏥 Growing Med Value Point", detail: "Upgrade executive medical shield via PRUValue Med with automatic annual limit growth" },
      ],
      waHints: ["Huge congrats on leading the department, Dr. Kavitha!", "Designed for busy specialists—2-min read between clinic rounds", "Quick coffee at the hospital lounge this week?"],
      closeHints: ["10-min coffee at hospital lounge between your clinic sessions", "1-page executive yield & female CI comparison table", "Brief 10-min Zoom Friday after 6pm"],
    },
    "zh-CN": {
      cardHints: ["🩺 俯瞰双峰塔的高管专科诊室", "🌟 祝贺荣升科室主任医术仁心", "💐 典雅兰花与红金尊尚贺卡"],
      waIdeas: [
        { label: "🌟 升职里程碑奖 + 260%女性重疾", detail: "PRULady 专属女性重疾高达260%赔付 + 满期高达110%返还及升职现金奖" },
        { label: "📈 首日 103% 财富配置加码", detail: "PRUElite Invest 首日即享 103% 保费投入基金运作（立享额外+3%起跑优势）" },
        { label: "🏥 医疗保额每年自动递增", detail: "PRUValue Med 医疗额度每年自动增长，超限仍可报销80%" },
      ],
      waHints: ["衷心祝贺 Dr. Kavitha 荣升科室主任！", "深知您门诊繁忙，特意浓缩成2分钟高管简报", "这周在医院咖啡厅用10分钟请您喝杯咖啡？"],
      closeHints: ["门诊间隙在医院咖啡厅10分钟快速对照", "整理1页高管收益与女性重疾条款对比表发您", "周五傍晚6点后10分钟Zoom简报"],
    },
    yue: {
      cardHints: ["🩺 望住雙子塔嘅高級專科診室", "🌟 恭喜榮升部門主管仁心仁術", "💐 高貴蘭花配紅金尊尚設計"],
      waIdeas: [
        { label: "🌟 升職現金獎 + 260%女士危疾", detail: "PRULady 高達260%女士危疾保障 + 期滿高達110%保費回贈兼升職獎賞" },
        { label: "📈 首日 103% 財富投資配置", detail: "PRUElite Invest 首日即有 103% 保費落場投資（即賺額外+3%起步優勢）" },
        { label: "🏥 醫療額度年年自動加碼", detail: "PRUValue Med 每年自動調高醫療額度，爆額仲保多80%" },
      ],
      waHints: ["恭喜晒 Dr. Kavitha 榮升部門主管！", "知你巡房睇症好忙，專登撮要成2分鐘精華", "呢個禮拜喺醫院 Cafe 飲杯10分鐘啡？"],
      closeHints: ["巡房空檔喺醫院 Cafe 用10分鐘拍住睇", "整張1頁紙行政回報同女士危疾對比表俾你", "星期五放工後10分鐘 Zoom 快閃傾"],
    },
    ms: {
      cardHints: ["🩺 Pejabat pakar menghadap KLCC", "🌟 Meraikan kepimpinan & kecemerlangan perubatan", "💐 Orkid elegan & motif emas"],
      waIdeas: [
        { label: "🌟 Ganjaran Kenaikan Pangkat", detail: "PRULady menawarkan sehingga 260% CI wanita + pulangan matang 110% & ganjaran kerjaya" },
        { label: "📈 103% Peruntukan Hari Pertama", detail: "PRUElite Invest melaburkan 103% premium pada Hari Pertama (+3% lonjakan serta-merta)" },
        { label: "🏥 Med Value Point Meningkat", detail: "PRUValue Med menggandakan had perubatan setiap tahun secara automatik" },
      ],
      waHints: ["Tahniah Dr. Kavitha atas pelantikan Ketua Jabatan!", "Ringkasan padat 2 minit khas untuk jadual klinik anda yang sibuk", "Minum kopi 10 minit di kafe hospital minggu ini?"],
      closeHints: ["Kopi 10 minit di lobi hospital antara sesi klinik", "Jadual 1 halaman perbandingan PRULady + PRUElite Invest lwn AIA", "Zoom ringkas 10 minit Jumaat petang"],
    },
    ta: {
      cardHints: ["🩺 KLCC காட்சி தரும் சிறப்பு மருத்துவர் அறை", "🌟 துறைத் தலைவர் பதவி உயர்வுக்கு வாழ்த்து", "💐 அழகிய ஆர்க்கிட் மலர்கள் & தங்க வடிவமைப்பு"],
      waIdeas: [
        { label: "🌟 பதவி உயர்வு பரிசு + 260% பெண் CI", detail: "PRULady மூலம் 260% பெண் CI பாதுகாப்பு + முதிர்வில் 110% பிரீமியம் திரும்பப் பெறுதல்" },
        { label: "📈 முதல் நாளே 103% முதலீட்டு உயர்வு", detail: "PRUElite Invest முதல் நாளிலேயே 103% முதலீட்டு ஒதுக்கீட்டை வழங்குகிறது (+3% உடனடி கூடுதல்)" },
        { label: "🏥 ஆண்டுதோறும் உயரும் Med Value", detail: "PRUValue Med ஒவ்வொரு ஆண்டும் மருத்துவ வரம்பை தானாக உயர்த்துகிறது" },
      ],
      waHints: ["துறைத் தலைவராகப் பதவியேற்றதற்கு வாழ்த்துகள் Dr. Kavitha!", "உங்கள் பணி நேரத்திற்கு ஏற்ப 2 நிமிட சுருக்கம்", "இந்த வாரம் மருத்துவமனை கஃபேவில் 10 நிமிட காபி?"],
      closeHints: ["மருத்துவமனை இடைவேளையில் 10 நிமிட நேரில் சந்திப்பு", "1 பக்க சுருக்க ஒப்பீட்டு அட்டவணை அனுப்புகிறேன்", "வெள்ளி மாலை 6 மணிக்கு 10 நிமிட Zoom"],
    },
  },

  sme_expansion: {
    en: {
      cardHints: ["🏭 Modern Batu Kawan Phase-2 plant & sunrise", "🏛️ Multi-generational family legacy emblem", "🤝 Celebrating industrial leadership in Penang"],
      waIdeas: [
        { label: "🏭 Ring-Fence RM 6M Bank Loan", detail: "Ring-fence the RM 6M personal bank guarantee from family assets via FSA Schedule 10 trust" },
        { label: "⚖️ Equalize Son & Daughter", detail: "Give UK doctor son tax-free cash via PRUPrestige Legacy while daughter inherits 100% plant shares" },
        { label: "📈 +50% Auto High-Cover Boost", detail: "PRUWealth Enrich 2.0 automatically boosts large Sum Assured up to +50% + 100% Day-1 legacy allocation" },
      ],
      waHints: ["Congrats on breaking ground for Batu Kawan Phase 2, Dato' Sri!", "Happy to walk through this with you and your CFO/company secretary", "15-min tea at your Penang office this week?"],
      closeHints: ["15-min briefing at your Batu Kawan office with your CFO", "Compare bank guarantee protection & trust fee savings side-by-side", "Private 10-min Zoom before your board meeting"],
    },
    "zh-CN": {
      cardHints: ["🏭 槟城 Batu Kawan 二期现代化新厂日出", "🏛️ 家族企业基业长青传承徽章", "🤝 祝贺实业版图再创高峰"],
      waIdeas: [
        { label: "🏭 隔离 RM 600万银行担保", detail: "运用金融服务法令 Schedule 10 信托隔离 RM 600万个人担保债务，守护家族资产" },
        { label: "⚖️ 兄妹公平传承不伤股权", detail: "女儿完整继承槟城厂房股权，英国行医儿子获等值免税现金（PRUPrestige Legacy 首日100%配置）" },
        { label: "📈 自动高达 +50% 保额递增", detail: "PRUWealth Enrich 2.0 大额保单自动递增高达+50%保额，内建分期传承无需私人信托年费" },
      ],
      waHints: ["祝贺拿督斯里 Batu Kawan 二期新厂顺利扩建！", "非常乐意配合您的财务总监或公司秘书一起审阅架构", "这周四去您槟城办公室敬茶聊15分钟？"],
      closeHints: ["周四到您厂房办公室与CFO用15分钟并排审阅条款", "对比免私人信托管理费与债权隔离的实际优势", "董事会前安排10分钟私密Zoom汇报"],
    },
    yue: {
      cardHints: ["🏭 檳城 Batu Kawan 二期現代化新廠日出", "🏛️ 家族企業基業長青傳承徽章", "🤝 恭喜集團版圖再創高峰"],
      waIdeas: [
        { label: "🏭 隔離 RM 600萬銀行擔保", detail: "用 FSA Schedule 10 法定信託隔離 RM 600萬個人銀行擔保，保護屋企資產" },
        { label: "⚖️ 兄妹公平分配唔散股權", detail: "阿女完整接班廠房股權，英國做醫生嘅阿仔攞等值免稅現金（首日100%配置）" },
        { label: "📈 自動高達 +50% 保額遞增", detail: "PRUWealth Enrich 2.0 大額保單自動加碼高達+50%，內置分期傳承慳返私人信託年費" },
      ],
      waHints: ["恭喜拿督斯里 Batu Kawan 二期新廠大展鴻圖！", "好樂意同你位 CFO 或者公司秘書一齊傾個架構", "呢個禮拜四過嚟你檳城 Office 飲杯茶傾15分鐘？"],
      closeHints: ["星期四上你 Office 同 CFO 用15分鐘拍住睇條款", "一頁紙對比慳返私人信託年費同債權隔離優勢", "開會前約個10分鐘私密 Zoom 簡報"],
    },
    ms: {
      cardHints: ["🏭 Kilang moden Fasa-2 Batu Kawan waktu pagi", "🏛️ Lambang legasi perniagaan keluarga", "🤝 Meraikan kejayaan industri di Pulau Pinang"],
      waIdeas: [
        { label: "🏭 Asingkan Jaminan Bank RM 6J", detail: "Lindungi aset keluarga daripada jaminan peribadi bank RM 6J melalui amanah Jadual 10 FSA" },
        { label: "⚖️ Seimbangkan Warisan Anak", detail: "Anak perempuan warisi 100% saham kilang, anak lelaki di UK terima tunai setara (100% Hari-1)" },
        { label: "📈 +50% Lonjakan Perlindungan", detail: "PRUWealth Enrich 2.0 meningkatkan perlindungan tinggi sehingga +50% tanpa yuran amanah tahunan" },
      ],
      waHints: ["Tahniah Dato' Sri atas pembesaran kilang Fasa 2 Batu Kawan!", "Boleh dibincangkan bersama CFO atau setiausaha syarikat Dato' Sri", "Minum petang 15 minit di pejabat Dato' Sri minggu ini?"],
      closeHints: ["Taklimat 15 minit di pejabat Batu Kawan bersama CFO", "Bandingkan penjimatan yuran amanah & perlindungan pemiutang", "Zoom peribadi 10 minit sebelum mesyuarat lembaga"],
    },
    ta: {
      cardHints: ["🏭 Batu Kawan புதிய தொழிற்சாலை உதய காட்சி", "🏛️ தலைமுறை குடும்பத் தொழில் பாரம்பரிய சின்னம்", "🤝 தொழில்துறை விரிவாக்க வெற்றி வாழ்த்து"],
      waIdeas: [
        { label: "🏭 RM 6M வங்கி உத்தரவாதப் பாதுகாப்பு", detail: "FSA Schedule 10 டிரஸ்ட் மூலம் RM 6M தனிப்பட்ட வங்கி கடன் பொறுப்பிலிருந்து குடும்பச் சொத்தைப் பாதுகாத்தல்" },
        { label: "⚖️ மகன் & மகளுக்கு சமமான பங்கு", detail: "மகளுக்கு முழு தொழிற்சாலை பங்குகள், UK மருத்துவர் மகனுக்கு சமமான ரொக்க நிதி (முதல் நாளே 100% ஒதுக்கீடு)" },
        { label: "📈 +50% தானியங்கி காப்பீட்டு உயர்வு", detail: "PRUWealth Enrich 2.0 மூலம் தனிப்பட்ட டிரஸ்ட் கட்டணமின்றி +50% வரை கூடுதல் பாதுகாப்பு" },
      ],
      waHints: ["Batu Kawan இரண்டாம் கட்ட விரிவாக்கத்திற்கு வாழ்த்துகள் Dato' Sri!", "உங்கள் CFO உடன் இணைந்து 15 நிமிடம் ஆய்வு செய்யத் தயார்", "இந்த வாரம் உங்கள் அலுவலகத்தில் 15 நிமிடம் சந்திக்கலாமா?"],
      closeHints: ["உங்கள் அலுவலகத்தில் CFO உடன் 15 நிமிட ஒப்பீட்டுச் சந்திப்பு", "டிரஸ்ட் கட்டண சேமிப்பு & கடன் பாதுகாப்பு ஒப்பீடு", "10 நிமிட தனிப்பட்ட Zoom ஆலோசனை"],
    },
  },

  uni_retirement_50: {
    en: {
      cardHints: ["🎓 Melbourne Uni archway & golden 50th toast", "🥂 Double milestone celebration for Vincent & Elaine", "🌏 Smooth transition into golden retirement"],
      waIdeas: [
        { label: "🏥 Beat Age-60 Med Cliff", detail: "Bridge the Age-60 employer medical cutoff now at clean Age-50 health rates via Smart Deductible" },
        { label: "📈 Med Limit Grows Even After Claim", detail: "PRUValue Med grows Med Value Point every year unconditionally—even in years you claim!" },
        { label: "🥂 Guaranteed Income to Age 100", detail: "Protect AUD Melbourne tuition reserve & build guaranteed annual FlexIncome to age 100 (PRUElite Flex)" },
      ],
      waHints: ["Happy 50th Vincent & huge congrats on Melbourne Uni!", "Keep your AUD tuition reserve untouched while bridging Age 60", "Weekend brunch/coffee with you & Elaine?"],
      closeHints: ["10-min Zoom Saturday 11am with you & Elaine", "Compare post-claim medical growth vs AIA conditional wallet", "Share a 1-page Age-50 to Age-100 retirement bridge chart"],
    },
    "zh-CN": {
      cardHints: ["🎓 墨尔本大学校门与50岁金禧举杯同庆", "🥂 祝贺 Vincent 知天命之喜与爱女金榜题名", "🌏 稳健迈向无忧退休黄金十年"],
      waIdeas: [
        { label: "🏥 化解 60 岁公司断保悬崖", detail: "趁50岁健康体搭配 Smart Deductible 低保费锁定衔接60岁退休后的终身医疗" },
        { label: "📈 理赔后保额依然年年涨", detail: "PRUValue Med 医疗额度每年无条件递增（即使发生理赔照涨不误！）" },
        { label: "🥂 保证终身年金领至100岁", detail: "不动用澳币学费储备，以 PRUElite Flex 建立保证派发至100岁的退休被动收入" },
      ],
      waHints: ["祝 Vincent 50岁生日快乐，更恭喜千金考入墨尔本大学！", "帮您护住澳币学费专款，同时提前填平60岁医疗缺口", "这周末和太太 Elaine 一起喝杯早茶聊10分钟？"],
      closeHints: ["周六上午11点与您和 Elaine 用10分钟Zoom对照", "并排看清「理赔后额度照涨」vs 友邦无理赔限制的差别", "先发您一张50至100岁医疗与年金衔接图"],
    },
    yue: {
      cardHints: ["🎓 墨爾本大學校門配50歲金禧舉杯賀圖", "🥂 雙喜臨門：Vincent 50大壽兼阿女入讀名校", "🌏 輕鬆銜接無憂嘆世界退休生活"],
      waIdeas: [
        { label: "🏥 拆解 60 歲公司斷保懸崖", detail: "趁50歲健康體用 Smart Deductible 平保費鎖定60歲退休後嘅終身醫療" },
        { label: "📈 Claim 完錢保額照樣年年加", detail: "PRUValue Med 醫療額度每年無條件自動加碼（就算 Claim 過錢都照加！）" },
        { label: "🥂 保證長俸派到 100 歲", detail: "唔使郁到澳幣學費儲備，用 PRUElite Flex 鎖定保證派到100歲嘅退休現金流" },
      ],
      waHints: ["祝 Vincent 50歲生日快樂，仲要恭喜阿女考入墨爾本大學！", "幫你守住筆澳幣學費，同時預早鋪好60歲後醫療後路", "呢個週末同嫂夫人 Elaine 飲杯茶傾10分鐘？"],
      closeHints: ["星期六朝11點同你和 Elaine 用10分鐘 Zoom 拍住睇", "一頁紙睇清「Claim 完照加保額」贏過 AIA 錢包條款", "Send 張 50 至 100 歲醫療同長俸銜接圖俾你睇先"],
    },
    ms: {
      cardHints: ["🎓 Gerbang Universiti Melbourne & sambutan ke-50", "🥂 Dwi-kejayaan bermakna buat Vincent & Elaine", "🌏 Persaraan tenang & penuh bermaruah"],
      waIdeas: [
        { label: "🏥 Atasi Jurang Perubatan Umur 60", detail: "Kunci kelayakan sihat umur 50 dengan Smart Deductible sebelum perlindungan majikan tamat pada umur 60" },
        { label: "📈 Had Naik Walaupun Selepas Tuntutan", detail: "PRUValue Med menaikkan Med Value Point setiap tahun walaupun selepas membuat tuntutan" },
        { label: "🥂 Pendapatan Terjamin hingga 100", detail: "Lindungi tabung AUD Melbourne & bina FlexIncome tahunan terjamin sehingga umur 100 (PRUElite Flex)" },
      ],
      waHints: ["Selamat Hari Jadi ke-50 Vincent & tahniah tawaran Melbourne Uni!", "Pastikan tabung yuran AUD kekal utuh sambil menutup jurang umur 60", "Minum pagi santai hujung minggu ini bersama Elaine?"],
      closeHints: ["Zoom 10 minit Sabtu 11 pagi bersama anda & Elaine", "Bandingkan kenaikan had selepas tuntutan lwn dompet bersyarat AIA", "Saya kongsikan carta jambatan persaraan Umur 50–100"],
    },
    ta: {
      cardHints: ["🎓 மெல்போர்ன் பல்கலைக்கழக வளைவு & 50வது பிறந்தநாள்", "🥂 வின்சென்ட் & எலைன் குடும்ப இரட்டை மகிழ்ச்சி", "🌏 நிம்மதியான ஓய்வுக்காலப் பயணம்"],
      waIdeas: [
        { label: "🏥 60 வயது மருத்துவ இடைவெளி தீர்வு", detail: "நிறுவன காப்பீடு 60 வயதில் முடியும் முன் Smart Deductible மூலம் 50 வயது கட்டணத்தை உறுதி செய்க" },
        { label: "📈 கிளைம் செய்தாலும் வரம்பு உயரும்", detail: "PRUValue Med கிளைம் செய்த ஆண்டிலும் Med Value Point வரம்பை ஆண்டுதோறும் உயர்த்துகிறது" },
        { label: "🥂 100 வயது வரை உத்தரவாத வருமானம்", detail: "AUD கல்வி நிதியைப் பாதுகாத்து 100 வயது வரை உத்தரவாதமான வருடாந்திர FlexIncome (PRUElite Flex)" },
      ],
      waHints: ["50வது பிறந்தநாள் & மகளின் மெல்போர்ன் பல்கலைக்கழக வெற்றிக்கு வாழ்த்துகள்!", "AUD கல்வி நிதியைத் தொடாமல் 60 வயது மருத்துவப் பாதுகாப்பை உறுதி செய்யலாம்", "இந்த வார இறுதியில் எலைனுடன் 10 நிமிடம் காபி?"],
      closeHints: ["சனிக்கிழமை காலை 11 மணிக்கு எலைனுடன் 10 நிமிட Zoom", "கிளைம் பிறகும் உயரும் வரம்பு vs AIA நிபந்தனை வாலட் ஒப்பீடு", "50–100 வயது ஓய்வூதியப் பால அட்டவணையை அனுப்புகிறேன்"],
    },
  },

  takaful_hibah_estate: {
    en: {
      cardHints: ["🕌 Elegant emerald & gold geometric arabesque motif", "🌿 Peaceful family legacy & Barakah theme", "✨ Celebrating Engineering Sdn Bhd milestone"],
      waIdeas: [
        { label: "🕌 Conditional Hibah (No Freeze)", detail: "Inject immediate Shariah-compliant cash via PRUBSN WarisanPlus Hibah outside probate/estate freeze" },
        { label: "📈 Up to 400% Accidental Shield", detail: "Up to 400% accidental / public transport & overseas Umrah/Hajj protection built in" },
        { label: "🛡️ Preserve Faraid Harmony", detail: "Provide instant family & business liquidity to settle debts without forced sale of company assets" },
      ],
      waHints: ["Alhamdulillah, huge congrats on your company's record milestone!", "Prepared a 2-min Hibah liquidity brief to keep family assets intact", "10-min coffee after Friday prayers or next week?"],
      closeHints: ["15-min coffee with you & Puan Aishah to map Hibah vs Faraid", "1-page side-by-side PRUBSN WarisanPlus vs AIA Legasi table", "Quick 10-min Zoom Wednesday evening"],
    },
    "zh-CN": {
      cardHints: ["🕌 典雅翠绿与描金几何艺术纹样", "🌿 家族和谐与世代平安主题", "✨ 祝贺企业业绩创下里程碑"],
      waIdeas: [
        { label: "🕌 Hibah 免遗产冻结直付", detail: "通过 PRUBSN WarisanPlus 指定 Hibah 受益人，绕过漫长遗产冻结即刻注入免税现金" },
        { label: "📈 高达 400% 意外与朝圣护盾", detail: "内建高达400%特定意外（含朝圣 Umrah/Hajj 与公共枢纽）高额保障" },
        { label: "🛡️ 守护 Faraid 家族和谐", detail: "提供充裕流动现金清偿企业负债，无需变卖企业资产" },
      ],
      waHints: ["衷心祝贺贵公司今年创下业绩新高！", "特意整理了2分钟 Hibah 免冻结现金流简报供您参考", "下周方便约10分钟喝杯咖啡聊聊吗？"],
      closeHints: ["与您和夫人喝杯15分钟咖啡梳理 Hibah 配比", "发您1页 PRUBSN WarisanPlus vs AIA Legasi 对比表", "周三晚8点10分钟Zoom快速讲解"],
    },
    yue: {
      cardHints: ["🕌 典雅翠綠配描金幾何藝術花紋", "🌿 家族和諧同世代平安主題", "✨ 恭喜公司業績創下新里程碑"],
      waIdeas: [
        { label: "🕌 Hibah 免遺產凍結直付", detail: "透過 PRUBSN WarisanPlus 指定 Hibah 受益人，免卻漫長遺產凍結即刻注入現金" },
        { label: "📈 高達 400% 意外與朝聖保障", detail: "內置高達400%特定意外（包埋 Umrah/Hajj 朝聖同公共交通）高額保障" },
        { label: "🛡️ 守護 Faraid 家族和諧", detail: "提供充裕流動現金清還公司負債，唔使變賣生意資產" },
      ],
      waHints: ["恭喜晒貴公司今年業績再創新高！", "特登整理咗份2分鐘 Hibah 免凍結現金流懶人包俾你參考", "下個禮拜方唔方便飲杯10分鐘咖啡傾吓？"],
      closeHints: ["同你和夫人飲杯15分鐘咖啡傾吓 Hibah 配比", "Send 張1頁紙 PRUBSN WarisanPlus vs AIA Legasi 對比表俾你", "星期三晚8點10分鐘 Zoom 快閃講解"],
    },
    ms: {
      cardHints: ["🕌 Motif geometri Islam zamrud & emas", "🌿 Doa keberkatan & keharmonian keluarga", "✨ Meraikan kejayaan cemerlang syarikat"],
      waIdeas: [
        { label: "🕌 Hibah Tanpa Pembekuan", detail: "Suntik tunai segera patuh Syariah melalui Hibah PRUBSN WarisanPlus di luar pembekuan pusaka" },
        { label: "📈 Perlindungan Kemalangan 400%", detail: "Perlindungan sehingga 400% kemalangan termasuk ketika menunaikan Umrah/Haji" },
        { label: "🛡️ Jaga Keharmonian Faraid", detail: "Sediakan tunai segera untuk menjelaskan liabiliti tanpa perlu menjual aset perniagaan" },
      ],
      waHints: ["Alhamdulillah, tahniah atas pencapaian hebat syarikat Tuan Haji!", "Saya sediakan ringkasan 2 minit strategi kecairan Hibah", "Minum kopi 10 minit minggu depan?"],
      closeHints: ["Kopi 15 minit bersama Puan Aishah untuk semak struktur Hibah", "Jadual 1 halaman PRUBSN WarisanPlus lwn AIA Legasi", "Zoom ringkas 10 minit Rabu malam"],
    },
    ta: {
      cardHints: ["🕌 மரகத பச்சை & தங்க இஸ்லாமிய கலை வடிவம்", "🌿 குடும்ப ஒற்றுமை மற்றும் Barakah வாழ்த்து", "✨ நிறுவனத்தின் சாதனை வெற்றி வாழ்த்து"],
      waIdeas: [
        { label: "🕌 Hibah உடனடி ரொக்கப் பாதுகாப்பு", detail: "சொத்து முடக்கமின்றி PRUBSN WarisanPlus Hibah மூலம் உடனடி ஷரியா ரொக்கப் பாதுகாப்பு" },
        { label: "📈 400% வரை விபத்து பாதுகாப்பு", detail: "Umrah/Hajj மற்றும் பொதுப் போக்குவரத்து உட்பட 400% வரை விபத்து காப்பீடு" },
        { label: "🛡️ Faraid குடும்ப ஒற்றுமை", detail: "நிறுவனச் சொத்துக்களை விற்காமல் கடன்களைத் தீர்க்க உடனடி பணப்புழக்கம்" },
      ],
      waHints: ["உங்கள் நிறுவனத்தின் சாதனை வெற்றிக்கு வாழ்த்துகள்!", "குடும்பச் சொத்துக்களைப் பாதுகாக்கும் 2 நிமிட Hibah சுருக்கம்", "அடுத்த வாரம் 10 நிமிடம் காபி அருந்திப் பேசலாமா?"],
      closeHints: ["துணைவியாருடன் 15 நிமிட Hibah ஆலோசனைச் சந்திப்பு", "PRUBSN WarisanPlus vs AIA Legasi 1 பக்க ஒப்பீடு", "புதன் மாலை 10 நிமிட Zoom அழைப்பு"],
    },
  },
};

const PAMB_C3_SCENARIOS = [
  {
    id: "newborn_baby",
    icon: "🍼",
    i18n: {
      en: {
        shortLabel: "Newborn Baby",
        customerName: "Tan Wei Ming & Chloe Lim (32, PJ)",
        existingGap: "Old RM 150k single med card • RM 0 Day-1 newborn wellness / uni fund",
        lifeEvent: "Welcomed 1st baby boy (Lucas) at PJ private hospital",
        pambPlan: "PRUMy Child Plus (PRUSaver Kid) + PRUWith You Plus + PRUMillion Med Active 2.0",
        aiaPlan: "AIA A-Life Joy Xtra + A-Plus BabyCare + A-Plus Health360",
        customerReply:
          "\"Thanks for the lovely card & WhatsApp! An AIA agent just quoted us AIA A-Life Joy Xtra + A-Plus BabyCare. Can you email me how our PRU plan compares factually with AIA?\"",
        cardHeadline: "Welcome to the World, Baby Lucas! 🌟",
        cardChips: [
          "Welcome to the World, Baby Lucas! 🌟",
          "Blessings to the Tan Family & Baby Lucas 🍼",
        ],
        whatsappChips: [
          "Claim RM 500 Childbirth Cash Reward (PRUWith You Plus) + start PRUMy Child Plus & PRUSaver Kid uni fund using FD interest",
          "Lock in PRUMy Child Plus (Day-1 newborn wellness, pediatric milestone care + Payor Continuity) & send 2-min summary while baby naps",
        ],
        aiaFacts: [
          "✓ Free +50% Auto Booster (PRUWith You Plus +1%/yr free vs. AIA Vitality fees/fitness tracking)",
          "✓ Immediate RM 500 Childbirth Cash Reward + Day-1 Newborn Wellness & Payor Continuity Guarantee",
          "✓ 15% Instant Cash Premium Discount (PRUMillion Med Active 2.0 vs. AIA conditional Health Wallet)",
        ],
        defaultWhatsapp:
          "Hi Wei Ming & Chloe! Huge congrats on welcoming Baby Lucas! 🍼✨ I made this celebratory card for your family.\n\nQuick heads-up: you can claim an RM 500 Childbirth Cash Reward under PRUWith You Plus, and start PRUMy Child Plus early for Day-1 newborn wellness protection, pediatric milestone care & a PRUSaver Kid university milestone fund with Payor Continuity Guarantee using just your FD interest. Shall I send a 2-min summary while Lucas naps? 😊",
        defaultEmail:
          "Subject: Factual Comparison for Baby Lucas: PRU (PRUMy Child Plus) vs. AIA (A-Life Joy Xtra)\n\nHi Wei Ming & Chloe,\nHere are 3 factual reasons our PRU plan gives Lucas & your family stronger value than AIA A-Life Joy Xtra:\n1. Free +50% Auto Sum Assured Booster: PRUWith You Plus grows cover +1%/yr up to +50% at RM 0 extra cost (no AIA Vitality gym/membership fees required).\n2. Immediate RM 500 Childbirth Cash Reward + Day-1 Newborn Wellness Protection & Payor Continuity Guarantee.\n3. 15% Cash Premium Discount: PRUMillion Med Active 2.0 cuts your medical premium by 15% when claim-free (AIA only credits a conditional Health Wallet).\n\nLet's do a 10-min Zoom Thursday at 8 PM to compare the exact tables!",
      },
      "zh-CN": {
        shortLabel: "新生宝宝",
        customerName: "陈伟明 & 林晓雯 (32岁，八打灵再也 PJ)",
        existingGap: "旧 RM 15万单人医药卡 • RM 0 宝宝初生首日健康守护与大学教育基金",
        lifeEvent: "刚在 PJ 私人医院迎来第一胎男宝宝 (Lucas)",
        pambPlan: "PRUMy Child Plus (PRUSaver Kid) + PRUWith You Plus + PRUMillion Med Active 2.0",
        aiaPlan: "AIA A-Life Joy Xtra + A-Plus BabyCare + A-Plus Health360",
        customerReply:
          "“谢谢你这么用心的祝贺卡和 WhatsApp！刚好有位 AIA 代理向我们推荐 AIA A-Life Joy Xtra + A-Plus BabyCare。你可以发一封电邮客观对比 PRU 方案和友邦的差别吗？”",
        cardHeadline: "欢迎来到这个世界，小 Lucas 宝宝！🌟",
        cardChips: [
          "欢迎来到这个世界，小 Lucas 宝宝！🌟",
          "祝福伟明与晓雯喜获麟儿，小 Lucas 健康快乐成长！🍼",
        ],
        whatsappChips: [
          "领取 RM 500 新生儿现金奖赏 (PRUWith You Plus) + 仅用定存利息锁定宝宝首日健康守护与 PRUSaver Kid 教育金",
          "尽早启动 PRUMy Child Plus（宝宝初生首日全面健康守护与成长礼遇 + 父母豁免保费）并发送2分钟精华简报",
        ],
        aiaFacts: [
          "✓ 免费 +50% 保额自动递增（PRUWith You Plus 每年免费+1%，无需缴付 AIA Vitality 会员费）",
          "✓ 立即领取 RM 500 新生儿现金奖赏 + PRUMy Child Plus 宝宝首日健康成长守护与双亲保费豁免",
          "✓ 无索赔享 15% 保费现金折扣（PRUMillion Med Active 2.0 直接减保费 vs AIA 仅记入医疗钱包）",
        ],
        defaultWhatsapp:
          "伟明、晓雯，衷心恭喜你们喜迎小宝贝 Lucas！🍼✨ 我特意为你们一家制作了这张满月祝贺卡。\n\n顺带一提：您现有的保单升级至 PRUWith You Plus 可直接申领 RM 500 生育现金奖赏，并只需利用定期存款利息为 Lucas 尽早启动 PRUMy Child Plus（锁定初生首日全面健康守护、儿科成长礼遇及 PRUSaver Kid 大学教育金 + 父母保费豁免）。趁宝宝午睡时，我发一份2分钟简报给您参考好吗？😊",
        defaultEmail:
          "主题：小 Lucas 少儿保障客观对比：PRU (PRUMy Child Plus) vs 友邦 (AIA A-Life Joy Xtra)\n\n伟明、晓雯 您好：\n以下是 PRU 方案相比友邦 AIA A-Life Joy Xtra 的 3 大客观条款优势：\n1. 免费高达 +50% 自动保额递增：PRUWith You Plus 每年免费增加 1% 保额（最高 +50%），无需像 AIA Vitality 那样每年缴付会员费或运动打卡。\n2. 立即申领 RM 500 生育现金奖赏 + PRUMy Child Plus 宝宝首日安心健康守护与双亲豁免保费。\n3. 15% 实际保费现金折扣：PRUMillion Med Active 2.0 在无索赔时直接减免 15% 现金保费（AIA 仅把额度存入有条件的 Health Wallet）。\n\n我们周四晚 8 点用 10 分钟 Zoom 对照一下具体利益表吧！",
      },
      yue: {
        shortLabel: "初生 BB",
        customerName: "陳偉明 & 林曉雯 (32歲，PJ 八打靈再也)",
        existingGap: "舊 RM 15萬單人醫藥卡 • RM 0 BB 初生首日守護同大學教育基金",
        lifeEvent: "啱啱喺 PJ 私家醫院生咗第一胎男 B (Lucas)",
        pambPlan: "PRUMy Child Plus (PRUSaver Kid) + PRUWith You Plus + PRUMillion Med Active 2.0",
        aiaPlan: "AIA A-Life Joy Xtra + A-Plus BabyCare + A-Plus Health360",
        customerReply:
          "「唔該晒你張咁靚嘅賀卡同 WhatsApp 呀！啱啱有個 AIA Agent quote 咗份 AIA A-Life Joy Xtra + A-Plus BabyCare 俾我哋。你可唔可以 Email 份 PRU vs AIA 嘅客觀比較俾我睇下？」",
        cardHeadline: "歡迎嚟到呢個世界，Lucas BB！🌟",
        cardChips: [
          "歡迎嚟到呢個世界，Lucas BB！🌟",
          "恭喜偉明同曉雯添丁之喜，Lucas BB 快高長大！🍼",
        ],
        whatsappChips: [
          "拎 RM 500 生 B 現金獎賞 (PRUWith You Plus) + 淨係用 FD 利息幫 BB 鎖定首日健康守護同 PRUSaver Kid 大學基金",
          "及早啟動 PRUMy Child Plus（初生首日健康守護同成長禮遇 + 父母保費豁免）趁 BB 瞓覺 send 份 2 分鐘懶人包俾你",
        ],
        aiaFacts: [
          "✓ 免費 +50% 自動加大保額（PRUWith You Plus 每年免費 +1%，唔使交 AIA Vitality 會費同做運動打卡）",
          "✓ 即拎 RM 500 生 B 現金獎賞 + PRUMy Child Plus 初生首日周全健康守護兼父母保費豁免",
          "✓ 無 Claim 直接減 15% 現金保費（PRUMillion Med Active 2.0 真減保費 vs AIA 淨係入落 Health Wallet）",
        ],
        defaultWhatsapp:
          "偉明、曉雯，恭喜晒你哋迎接小王子 Lucas BB 呀！🍼✨ 我特登整咗呢張賀卡送俾你哋一家。\n\n順便提一提：你哋透過 PRUWith You Plus 可以即刻 claim RM 500 生 B 現金獎賞，仲可以淨係用銀行 FD 定期啲利息幫 Lucas 及早啟動 PRUMy Child Plus（鎖定 BB 初生首日健康守護、成長禮遇兼夾 PRUSaver Kid 大學基金 + 父母保費豁免）。趁 BB 瞓緊晏覺，我 WhatsApp 份 2 分鐘懶人包俾你哋睇下好冇？😊",
        defaultEmail:
          "主題：Lucas BB 保障客觀比較：PRU (PRUMy Child Plus) vs 友邦 (AIA A-Life Joy Xtra)\n\n偉明、曉雯 你好：\n以下係 PRU 方案對比 AIA A-Life Joy Xtra 嘅 3 個真實條款優勢：\n1. 免費高達 +50% 自動加大保額：PRUWith You Plus 每年免費加 1% 保額（最高 +50%），完全唔使好似 AIA Vitality 咁年年交會費同做運動打卡。\n2. 即刻拎 RM 500 生 B 現金獎賞 + PRUMy Child Plus 初生首日周全健康守護兼父母豁免保費。\n3. 直接減 15% 現金保費：PRUMillion Med Active 2.0 只要無索償就直接減 15% 保費（AIA 係收足保費、只係撥入有條件限制嘅 Health Wallet）。\n\n我哋星期四晚 8 點鐘開個 10 分鐘 Zoom 一齊對下張表啦！",
      },
      ms: {
        shortLabel: "Bayi Baru Lahir",
        customerName: "Tan Wei Ming & Chloe Lim (32, PJ)",
        existingGap: "Kad perubatan lama RM 150k • RM 0 perlindungan kesejahteraan Hari-1 / tabung universiti anak",
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
          "Tuntut Ganjaran Tunai Kelahiran RM 500 (PRUWith You Plus) + mulakan PRUMy Child Plus & tabung universiti PRUSaver Kid guna faedah FD",
          "Mulakan PRUMy Child Plus awal (perlindungan kesejahteraan Hari-1 + Penepian Pembayar) & hantar ringkasan 2 minit",
        ],
        aiaFacts: [
          "✓ Peningkatan Automatik +50% Percuma (PRUWith You Plus +1%/thn percuma lwn yuran tahunan AIA Vitality)",
          "✓ Ganjaran Tunai Kelahiran RM 500 Segera + Perlindungan Kesejahteraan Bayi Hari-1 & Penepian Pembayar",
          "✓ Diskaun Tunai Premium 15% (PRUMillion Med Active 2.0 lwn Dompet Kesihatan bersyarat AIA)",
        ],
        defaultWhatsapp:
          "Hai Wei Ming & Chloe! Tahniah atas kelahiran Bayi Lucas! 🍼✨ Saya sediakan kad ucapan khas ini untuk keluarga anda.\n\nMakluman ringkas: anda layak menuntut Ganjaran Tunai Kelahiran RM 500 di bawah PRUWith You Plus, serta memulakan PRUMy Child Plus awal untuk perlindungan kesejahteraan bayi sejak Hari Pertama, penjagaan pediatrik & tabung universiti PRUSaver Kid dengan Penepian Pembayar hanya menggunakan faedah FD anda. Boleh saya hantarkan ringkasan 2 minit? 😊",
        defaultEmail:
          "Subjek: Perbandingan Berfakta untuk Bayi Lucas: PRU (PRUMy Child Plus) lwn AIA (A-Life Joy Xtra)\n\nHai Wei Ming & Chloe,\nBerikut ialah 3 sebab berfakta mengapa pelan PRU memberi nilai lebih kukuh berbanding AIA A-Life Joy Xtra:\n1. Peningkatan Jumlah Diinsuranskan Automatik +50% Percuma: PRUWith You Plus meningkatkan perlindungan +1%/tahun sehingga +50% pada kos tambahan RM 0 (tanpa yuran keahlian AIA Vitality).\n2. Ganjaran Tunai Kelahiran RM 500 Segera + Perlindungan Kesejahteraan Bayi Hari-1 & Penepian Pembayar.\n3. Diskaun Premium Tunai 15%: PRUMillion Med Active 2.0 mengurangkan bayaran premium perubatan anda sebanyak 15% apabila tiada tuntutan (AIA hanya mengkreditkan Health Wallet bersyarat).\n\nJom kita buat panggilan Zoom 10 minit Khamis ini jam 8 malam!",
      },
      ta: {
        shortLabel: "பிறந்த குழந்தை",
        customerName: "டான் வெய் மிங் & குளோயி லிம் (32, PJ)",
        existingGap: "பழைய RM 150k மருத்துவ அட்டை • RM 0 முதல் நாள் குழந்தை நலன் / பல்கலைக்கழக நிதி",
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
          "RM 500 குழந்தை பிறப்பு ரொக்கப் பரிசு (PRUWith You Plus) + FD வட்டி மூலம் முதல் நாள் குழந்தை நலன் & PRUSaver Kid கல்வி நிதி",
          "PRUMy Child Plus (முதல் நாள் குழந்தை நலப் பாதுகாப்பு + Payor Waiver) திட்டத்தின் 2 நிமிட சுருக்கத்தை அனுப்புக",
        ],
        aiaFacts: [
          "✓ இலவச +50% தானியங்கி காப்பீட்டு உயர்வு (PRUWith You Plus +1%/ஆண்டு இலவசம் vs AIA Vitality கட்டணம்)",
          "✓ உடனடி RM 500 குழந்தை பிறப்பு ரொக்கப் பரிசு + முதல் நாள் குழந்தை நலப் பாதுகாப்பு & Payor Waiver",
          "✓ 15% நேரடி பிரீமியம் ரொக்கத் தள்ளுபடி (PRUMillion Med Active 2.0 vs AIA நிபந்தனை Health Wallet)",
        ],
        defaultWhatsapp:
          "வணக்கம் வெய் மிங் & குளோயி! குழந்தை லூகாஸ் பிறந்ததற்கு மனமார்ந்த வாழ்த்துகள்! 🍼✨ உங்கள் குடும்பத்திற்காக இந்த சிறப்பு வாழ்த்து அட்டையை உருவாக்கினேன்.\n\nமுக்கிய தகவல்: PRUWith You Plus மூலம் RM 500 குழந்தை பிறப்பு ரொக்கப் பரிசைப் பெறலாம், மேலும் உங்கள் FD வட்டியை மட்டுமே பயன்படுத்தி PRUMy Child Plus (முதல் நாள் குழந்தை நலப் பாதுகாப்பு, வளர்ச்சிப் பராமரிப்பு + PRUSaver Kid பல்கலைக்கழக கல்வி நிதி & Payor Waiver) திட்டத்தை உறுதி செய்யலாம். 2 நிமிட சுருக்கத்தை அனுப்பட்டுமா? 😊",
        defaultEmail:
          "பொருள்: குழந்தை லூகாஸிற்கான உண்மையான ஒப்பீடு: PRU (PRUMy Child Plus) vs AIA (A-Life Joy Xtra)\n\nவணக்கம் வெய் மிங் & குளோயி,\nAIA A-Life Joy Xtra திட்டத்தை விட PRU திட்டம் சிறந்த மதிப்பை வழங்குவதற்கான 3 உண்மையான காரணங்கள்:\n1. இலவச +50% தானியங்கி காப்பீட்டு உயர்வு: PRUWith You Plus எந்த கூடுதல் கட்டணமும் இன்றி (+1%/ஆண்டு) +50% வரை காப்பீட்டை உயர்த்துகிறது (AIA Vitality உறுப்பினர் கட்டணம் தேவையில்லை).\n2. உடனடி RM 500 குழந்தை பிறப்பு ரொக்கப் பரிசு + முதல் நாள் குழந்தை நலப் பாதுகாப்பு மற்றும் Payor Waiver சலுகை.\n3. 15% நேரடி பிரீமியம் தள்ளுபடி: PRUMillion Med Active 2.0 கிளைம் இல்லாதபோது பிரீமியத்தில் 15% நேரடித் தள்ளுபடி வழங்குகிறது.\n\nவியாழக்கிழமை இரவு 8 மணிக்கு 10 நிமிட Zoom அழைப்பில் பேசலாமா!",
      },
    },
  },
  {
    id: "ci_health_scare",
    icon: "⚡",
    i18n: {
      en: {
        shortLabel: "40th Birthday & Health Upgrade",
        customerName: "Jason Khoo (39, Penang Tech Director)",
        existingGap: "Basic RM 100k policy • Ready to upgrade RM 8M private suite health cover + 15% cash discount",
        lifeEvent: "Celebrating upcoming 40th birthday after A+ checkup; wants Age-39 premier medical & 110% refund",
        pambPlan: "PRUMillion Med Active 2.0 + PRUAll Care + PRUMan",
        aiaPlan: "AIA A-Plus Health360 + A-Life Beyond Critical Care",
        customerReply:
          "\"Love the 40th birthday card, bro! My friend at AIA quoted AIA A-Plus Health360 + A-Life Beyond Critical Care. Email me how our PRU plan compares factually!\"",
        cardHeadline: "Happy 40th Birthday — Cheers to Peak Health & Your Best Decade Ahead! 🥂⚡",
        cardChips: [
          "Happy 40th Birthday — Cheers to Peak Health & Your Best Decade Ahead! 🥂⚡",
          "Celebrating 40 Years Strong — Wishing You Vibrant Health & Momentum! 🌟",
        ],
        whatsappChips: [
          "Lock in Age-39 rates on PRUMillion Med Active 2.0 (RM 8M private suite + 15% healthy cash discount) + PRUAll Care (~190 conditions to Age 100)",
          "Add PRUMan (260% executive wellness protection + up to 110% total premium refund at maturity)",
        ],
        aiaFacts: [
          "✓ 15% Instant Healthy Cash Discount on RM 8M Med Cover (PRUMillion Med Active 2.0 vs. AIA Health360 conditional wallet)",
          "✓ Protects ~190 Conditions to Age 100 (PRUAll Care vs. AIA A-Life Beyond expiring at Age 80)",
          "✓ Up to 110% Maturity Cash Refund (PRUMan 260% executive protection + 110% refund at maturity)",
        ],
        defaultWhatsapp:
          "Happy early 40th Birthday, Jason! 🥂⚡ Awesome news on your A+ annual executive wellness checkup—I made this celebratory card for your 40th.\n\nBefore your age-40 rate step-up next month, we can lock in Age-39 rates on PRUMillion Med Active 2.0 (RM 8M private suite cover + 15% instant healthy cash discount), PRUAll Care (~190 conditions to Age 100), and PRUMan (up to 110% maturity refund). Free for a 10-min birthday coffee this Friday? ☕",
        defaultEmail:
          "Subject: Factual 40th Milestone Comparison: PRU (PRUMillion Med Active 2.0 & PRUAll Care) vs. AIA\n\nHi Jason,\nHere is the factual side-by-side between our PRU plan and AIA before your Age-39 window closes:\n1. 15% Direct Healthy Cash Discount (RM 8M Cover): PRUMillion Med Active 2.0 cuts your cash premium by 15% when claim-free (AIA charges full premium and only credits a Health Wallet).\n2. Comprehensive Protection to Age 100 & ~190 Conditions: PRUAll Care covers ~190 conditions up to Age 100, whereas AIA A-Life Beyond Critical Care expires at Age 80.\n3. Up to 110% Maturity Cash Refund: PRUMan gives 260% executive wellness protection + up to 110% maturity refund.\n\nLet's review the 1-page rate sheet over birthday coffee this Thursday!",
      },
      "zh-CN": {
        shortLabel: "40岁生日与高端医疗升级",
        customerName: "邱志豪 Jason Khoo (39岁，槟城科技总监)",
        existingGap: "基础 RM 10万旧单 • 计划升级 RM 800万私家病房高端医疗（享15%健康现金折扣）",
        lifeEvent: "年度高管体检全优达标，下月喜迎 40 岁生日；希望趁39岁锁定高端医疗与110%返还",
        pambPlan: "PRUMillion Med Active 2.0 + PRUAll Care + PRUMan",
        aiaPlan: "AIA A-Plus Health360 + A-Life Beyond Critical Care",
        customerReply:
          "“40岁生日贺卡太赞了兄弟！我一位做 AIA 的朋友刚推荐了 AIA A-Plus Health360 + Beyond Critical Care。你能发封电邮客观对比 PRU 和 AIA 的条款吗？”",
        cardHeadline: "40岁生日快乐 — 敬巅峰健康与人生最精彩的黄金十年！🥂⚡",
        cardChips: [
          "40岁生日快乐 — 敬巅峰健康与人生最精彩的黄金十年！🥂⚡",
          "礼赞四十风华正茂：愿活力常青、宏图大展！🌟",
        ],
        whatsappChips: [
          "趁下月满40岁前锁住39岁黄金费率：PRUMillion Med Active 2.0（RM 800万医疗+15%健康现金折）+ PRUAll Care（保至100岁）",
          "搭配 PRUMan（高达260%高管健康保障 + 满期退还高达110%总保费）",
        ],
        aiaFacts: [
          "✓ 无索赔立享 15% 现金保费折扣（PRUMillion Med Active 2.0 RM 800万高端医疗 vs AIA 仅记入钱包）",
          "✓ 保障约 190 项健康与康复条件至 100 岁（PRUAll Care 保至100岁 vs AIA A-Life Beyond 80岁终止）",
          "✓ 满期退还高达 110% 总保费（PRUMan 提供260%高管健康保障 + 110%满期退费）",
        ],
        defaultWhatsapp:
          "Jason，提前祝你 40 岁生日快乐！🥂⚡ 恭喜年度高管健康体检全优达标，我特意为你制作了这张 40 岁庆生贺卡。\n\n趁下个月满 40 岁费率调整前，我们可以用 39 岁黄金费率锁定 PRUMillion Med Active 2.0（RM 800万私家医院尊尚医疗 + 无索赔15%现金保费折扣）、PRUAll Care（保至100岁）及 PRUMan（高达110%满期返还）。本周请您喝杯10分钟庆生咖啡聊聊？☕",
        defaultEmail:
          "主题：40岁高端医疗升级客观对比：PRU (PRUMillion Med Active 2.0) vs 友邦 (AIA)\n\nJason 您好：\n赶在您 39 岁费率窗口关闭前，为您整理 PRU 方案与友邦 AIA 的 3 大客观条款差异：\n1. 15% 直接现金保费折扣（RM 800万高端医疗）：PRUMillion Med Active 2.0 在无索赔时直接减免 15% 现金保费（AIA 仍收全额保费，仅把额度记入 Health Wallet）。\n2. 保至 100 岁且涵盖约 190 项全面守护：PRUAll Care 全面健康与康复守护至 100 岁，而 AIA A-Life Beyond Critical Care 仅保至 80 岁。\n3. 高达 110% 保费退还：PRUMan 提供高达 260% 高管健康保障，满期可退还高达 110% 已缴总保费。\n\n这周四喝庆生咖啡时我带一页式对比表给您过目！",
      },
      yue: {
        shortLabel: "40歲生日與高端醫療升級",
        customerName: "邱志豪 Jason Khoo (39歲，檳城 Tech 總監)",
        existingGap: "基礎 RM 10萬舊單 • 計劃升級 RM 800萬私家病房高端醫療（享15%健康現金折扣）",
        lifeEvent: "年度高管體檢靚仔達標，下個月喜迎 40 歲生日；想趁39歲鎖定高端醫療同110%回贈",
        pambPlan: "PRUMillion Med Active 2.0 + PRUAll Care + PRUMan",
        aiaPlan: "AIA A-Plus Health360 + A-Life Beyond Critical Care",
        customerReply:
          "「多謝你張 40 歲生日卡呀 Bro！我有個做 AIA 嘅 friend 啱啱 sell 我 AIA A-Plus Health360 + Beyond Critical Care。你可唔可以 Email 份 PRU vs AIA 嘅真實比較俾我睇？」",
        cardHeadline: "40歲生日快樂 — 敬巔峰健康同人生最精彩嘅黃金十年！🥂⚡",
        cardChips: [
          "40歲生日快樂 — 敬巔峰健康同人生最精彩嘅黃金十年！🥂⚡",
          "賀四十風華正茂：祝身體健康、事業再創高峰！🌟",
        ],
        whatsappChips: [
          "趕喺下個月 40 歲前鎖定 39 歲靚價：PRUMillion Med Active 2.0（RM 800萬醫療+15%現金折扣）+ PRUAll Care（保到100歲）",
          "加埋 PRUMan（高達 260% 高管健康保障 + 期滿退返高達 110% 總保費）",
        ],
        aiaFacts: [
          "✓ 無 Claim 直接減 15% 現金保費（PRUMillion Med Active 2.0 RM 800萬醫療 vs AIA 入落 Wallet）",
          "✓ 保約 190 項周全守護到 100 歲（PRUAll Care 保到100歲 vs AIA A-Life Beyond 80歲就滿期）",
          "✓ 期滿退返高達 110% 總保費（PRUMan 260% 高管健康保障 + 110% 退費）",
        ],
        defaultWhatsapp:
          "Jason，預祝你 40 歲生日快樂呀！🥂⚡ 恭喜你年度高管體檢靚仔達標，我特登整咗呢張 40 歲生日賀卡俾你。\n\n趁下個月踏入 40 歲保費調整之前，我哋可以用 39 歲靚價鎖定 PRUMillion Med Active 2.0（RM 800萬私家病房醫療 + 無索償減 15% 保費）、PRUAll Care（保到100歲）同 PRUMan（高達110%期滿回贈）。今個禮拜請你飲杯10分鐘慶生啡？☕",
        defaultEmail:
          "主題：40歲高端醫療升級客觀比較：PRU (PRUMillion Med Active 2.0) vs 友邦 (AIA)\n\nHi Jason：\n趕喺你 39 歲保費窗口閂門之前，同你客觀對比 PRU 方案同 AIA 嘅 3 大分別：\n1. 直接減 15% 現金保費（RM 800萬醫療）：PRUMillion Med Active 2.0 只要無 claim 就真金白銀減 15% 保費（AIA 照收全額保費，只係撥落 Health Wallet）。\n2. 保到 100 歲兼包約 190 項周全守護：PRUAll Care 全面健康同康復保障直到 100 歲，相反 AIA A-Life Beyond 去到 80 歲就完。\n3. 高達 110% 保費退還：PRUMan 俾到 260% 高管健康保障，期滿仲退返高達 110% 總保費。\n\n星期四飲慶生啡嗰陣我帶埋張一頁紙對比表俾你過目！",
      },
      ms: {
        shortLabel: "Ulang Tahun Ke-40 & Medikal Premier",
        customerName: "Jason Khoo (39, Pengarah Teknologi Pulau Pinang)",
        existingGap: "Polisi asas lama RM 100k • Sedia naik taraf suite hospital swasta RM 8J + diskaun tunai sihat 15%",
        lifeEvent: "Meraikan ulang tahun ke-40 selepas pemeriksaan kesihatan A+; mahu kadar Umur 39 & pulangan 110%",
        pambPlan: "PRUMillion Med Active 2.0 + PRUAll Care + PRUMan",
        aiaPlan: "AIA A-Plus Health360 + A-Life Beyond Critical Care",
        customerReply:
          "\"Cantik kad hari jadi ke-40 ini, bro! Rakan saya di AIA mencadangkan AIA A-Plus Health360 + Beyond Critical Care. E-melkan kepada saya perbandingan berfakta dengan PRU!\"",
        cardHeadline: "Selamat Ulang Tahun Ke-40 — Semoga Sihat Unggul & Dekad Terbaik Menanti! 🥂⚡",
        cardChips: [
          "Selamat Ulang Tahun Ke-40 — Semoga Sihat Unggul & Dekad Terbaik Menanti! 🥂⚡",
          "Meraikan 40 Tahun Cemerlang — Semoga Terus Bertenaga & Berjaya! 🌟",
        ],
        whatsappChips: [
          "Kunci kadar Umur 39 sebelum bulan depan: PRUMillion Med Active 2.0 (suite RM 8J + diskaun tunai sihat 15%) + PRUAll Care (hingga Umur 100)",
          "Tambah PRUMan (260% perlindungan eksekutif + sehingga 110% pulangan premium semasa matang)",
        ],
        aiaFacts: [
          "✓ Diskaun Tunai Sihat 15% atas Pelan RM 8J (PRUMillion Med Active 2.0 lwn kredit dompet AIA Health360)",
          "✓ Melindungi ~190 Kondisi Kesejahteraan hingga Umur 100 (PRUAll Care lwn AIA A-Life Beyond tamat pada Umur 80)",
          "✓ Pulangan Matang Sehingga 110% (PRUMan 260% perlindungan eksekutif + 110% pulangan matang)",
        ],
        defaultWhatsapp:
          "Selamat menyambut Hari Jadi ke-40 awal, Jason! 🥂⚡ Tahniah atas keputusan pemeriksaan kesihatan eksekutif A+—saya reka kad sambutan ini khas untuk ulang tahun ke-40 anda.\n\nSebelum kadar umur 40 meningkat bulan depan, kita boleh kunci PRUMillion Med Active 2.0 (suite hospital RM 8J + diskaun tunai sihat 15%), PRUAll Care (hingga Umur 100), dan PRUMan (pulangan 110%). Jom minum kopi sambutan 10 minit minggu ini? ☕",
        defaultEmail:
          "Subjek: Perbandingan Ulang Tahun Ke-40: PRU (PRUMillion Med Active 2.0) lwn AIA\n\nHai Jason,\nBerikut ialah perbandingan berfakta antara pelan PRU dan AIA sebelum tetingkap Umur 39 anda ditutup:\n1. Diskaun Tunai Sihat 15% (Had RM 8J): PRUMillion Med Active 2.0 memotong premium tunai anda sebanyak 15% apabila tiada tuntutan.\n2. Perlindungan hingga Umur 100 & ~190 Kondisi: PRUAll Care melindungi ~190 keadaan kesejahteraan sehingga Umur 100, manakala AIA tamat pada Umur 80.\n3. Pulangan Premium 110%: PRUMan memberi 260% perlindungan eksekutif + sehingga 110% pulangan premium semasa matang.\n\nMari kita semak jadual kadar 1 halaman sambil minum kopi Khamis ini!",
      },
      ta: {
        shortLabel: "40-வது பிறந்தநாள் & மருத்துவ மேம்பாடு",
        customerName: "ஜேசன் கூ (Jason Khoo, 39, பினாங்கு தொழில்நுட்ப இயக்குநர்)",
        existingGap: "பழைய RM 100k பாலிசி • RM 8M மருத்துவக் காப்பீடு + 15% ரொக்கத் தள்ளுபடிக்கு மேம்படுத்தத் தயார்",
        lifeEvent: "சிறந்த உடல்நலப் பரிசோதனைக்குப் பின் 40-வது பிறந்தநாள்; 39 வயது சலுகைக் கட்டணம் & 110% முதிர்வுப் பலன்",
        pambPlan: "PRUMillion Med Active 2.0 + PRUAll Care + PRUMan",
        aiaPlan: "AIA A-Plus Health360 + A-Life Beyond Critical Care",
        customerReply:
          "\"40-வது பிறந்தநாள் வாழ்த்து அட்டைக்கு நன்றி சகோதரா! எனது AIA நண்பர் AIA A-Plus Health360 + Beyond Critical Care திட்டத்தை பரிந்துரைத்தார். PRU உடன் உண்மையான ஒப்பீட்டை மின்னஞ்சல் செய்யவும்!\"",
        cardHeadline: "இனிய 40-வது பிறந்தநாள் — சிறந்த ஆரோக்கியம் & பொன்னான தசாப்தத்திற்கு வாழ்த்துகள்! 🥂⚡",
        cardChips: [
          "இனிய 40-வது பிறந்தநாள் — சிறந்த ஆரோக்கியம் & பொன்னான தசாப்தத்திற்கு வாழ்த்துகள்! 🥂⚡",
          "40 ஆண்டு சாதனை & துடிப்பான ஆரோக்கியத்திற்கு நல்வாழ்த்துகள்! 🌟",
        ],
        whatsappChips: [
          "39 வயது சலுகைக் கட்டணத்தில் PRUMillion Med Active 2.0 (RM 8M மருத்துவ வரம்பு + 15% தள்ளுபடி) + PRUAll Care உறுதி செய்க",
          "PRUMan (260% பாதுகாப்பு + முதிர்வில் 110% வரை பிரீமியம் திரும்பப் பெறுதல்) சேர்க்கவும்",
        ],
        aiaFacts: [
          "✓ RM 8M மருத்துவப் பாதுகாப்பில் 15% நேரடி பிரீமியம் ரொக்கத் தள்ளுபடி (PRUMillion Med Active 2.0 vs AIA Health360 வாலட்)",
          "✓ 100 வயது வரை ~190 நிலைகளுக்கு பாதுகாப்பு (PRUAll Care vs 80 வயதில் முடியும் AIA A-Life Beyond)",
          "✓ முதிர்வில் 110% வரை பிரீமியம் திரும்பப் பெறுதல் (PRUMan 260% பாதுகாப்பு + 110% refund)",
        ],
        defaultWhatsapp:
          "இனிய 40-வது பிறந்தநாள் நல்வாழ்த்துகள் ஜேசன்! 🥂⚡ உங்கள் வருடாந்திர உடல்நலப் பரிசோதனை சிறப்பாக அமைந்ததற்கு வாழ்த்துகள்—உங்களுக்காக இந்த பிறந்தநாள் வாழ்த்து அட்டையை உருவாக்கினேன்.\n\nஅடுத்த மாதம் 40 வயது பிரீமியம் உயர்வுக்கு முன், PRUMillion Med Active 2.0 (RM 8M மருத்துவ வரம்பு + 15% தள்ளுபடி), PRUAll Care மற்றும் PRUMan திட்டங்களை உறுதி செய்யலாம். இந்த வாரம் 10 நிமிடம் காபி அருந்தலாமா? ☕",
        defaultEmail:
          "பொருள்: 40-வது பிறந்தநாள் மருத்துவ மேம்பாடு ஒப்பீடு: PRU (PRUMillion Med Active 2.0) vs AIA\n\nவணக்கம் ஜேசன்,\nஉங்கள் 39 வயது சலுகை முடிவதற்குள் PRU திட்டம் மற்றும் AIA இடையேயான உண்மையான ஒப்பீடு:\n1. 15% நேரடி பிரீமியம் தள்ளுபடி (RM 8M வரம்பு): PRUMillion Med Active 2.0 கிளைம் இல்லாதபோது 15% நேரடி ரொக்கத் தள்ளுபடி தருகிறது.\n2. 100 வயது வரை பாதுகாப்பு & ~190 நிலைகள்: PRUAll Care 100 வயது வரை விரிவான நலப் பாதுகாப்பை வழங்குகிறது (AIA 80 வயதில் முடிவடைகிறது).\n3. 110% பிரீமியம் திரும்பப் பெறுதல்: PRUMan 260% பாதுகாப்பு + முதிர்வில் 110% வரை பிரீமியம் திரும்பத் தருகிறது.\n\nஇந்த வியாழக்கிழமை காபி சந்திப்பில் 1 பக்க அட்டவணையைப் பார்ப்போம்!",
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
        existingGap: "Medical cards only • Wants portable family-owned protection + 20% mortgage continuity reserve",
        lifeEvent: "Collected keys to RM 1.3M semi-D home in Eco Botanic, JB",
        pambPlan: "PRUWith You Plus (Portable MLTA) + PRUAll Care",
        aiaPlan: "AIA A-Life Link 2 / A-Life Kasih Famili + CI Rider",
        customerReply:
          "\"Terima kasih for the housewarming card! An AIA planner quoted us AIA A-Life Link 2 + CI rider for our mortgage. Can you email how PRU compares factually?\"",
        cardHeadline: "Congratulations on Your New Eco Botanic Home! 🏡🔑",
        cardChips: [
          "Congratulations on Your New Eco Botanic Home! 🏡🔑",
          "Warmest Housewarming Wishes to Amirul & Farah! ✨",
        ],
        whatsappChips: [
          "Claim RM 500 New Home Cash Reward (PRUWith You Plus) + portable MLTA (+50% free Booster) + PRUAll Care 20% mortgage continuity reserve",
          "Explain why Bank MRTA locks value to the bank while PRU pays directly to spouse under FSA Statutory Trust",
        ],
        aiaFacts: [
          "✓ Unconditional +50% Auto Booster (PRUWith You Plus +1%/yr free vs. AIA Vitality fitness checks)",
          "✓ Immediate RM 500 New Home Goal Achievement Cash Reward upon collecting keys",
          "✓ ~190 Conditions + 20% Mortgage Continuity Reserve for RM 5,600/mth loan installments",
        ],
        defaultWhatsapp:
          "Huge congratulations Amirul & Farah on collecting the keys to your Eco Botanic dream home! 🏡🔑 I designed this housewarming card for you both.\n\nUnlike bank-locked MRTA, portable family-owned PRUWith You Plus + PRUAll Care gives you an immediate RM 500 New Home Cash Reward, a free +50% Auto Sum Assured Booster, and a 20% mortgage continuity reserve across ~190 conditions. Can I send a 1-page summary? 😊",
        defaultEmail:
          "Subject: Eco Botanic Mortgage Shield Comparison: PRU (PRUWith You Plus) vs. AIA (A-Life Link 2)\n\nHi Amirul & Farah,\nHere are 3 factual advantages of PRUWith You Plus + PRUAll Care over AIA A-Life Link 2 for your RM 1.3M mortgage:\n1. Unconditional +50% Auto Sum Assured Booster: Grows +1%/yr up to +50% at RM 0 extra cost without needing annual AIA Vitality fitness/membership fees.\n2. Immediate RM 500 New Home Cash Reward: Direct RM 500 cash payout upon buying your Eco Botanic home.\n3. ~190 Conditions + 20% Mortgage Continuity Reserve: Adds an extra 20% continuity reserve so your RM 5,600/mth installments stay smoothly on track.\n\nShall we do a 10-min call tomorrow at 8:30 PM?",
      },
      "zh-CN": {
        shortLabel: "新居 RM 130万房贷",
        customerName: "Amirul Hakim & Farah Nadia (35岁，新山 JB)",
        existingGap: "仅有医药卡 • 希望配置可携式家庭护盾与 20% 房贷延续储备金",
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
          "申领 RM 500 购屋现金奖赏 (PRUWith You Plus) + 免费+50%保额递增 MLTA + PRUAll Care 20% 房贷延续储备金",
          "解析可携式 MLTA 如何通过 FSA 法定信托直接把保障权益留给家人",
        ],
        aiaFacts: [
          "✓ 无条件免费 +50% 保额自动递增（PRUWith You Plus 每年免费+1%，无需 AIA Vitality 年费）",
          "✓ 拿到新房钥匙即可申领 RM 500 购屋里程碑现金奖赏",
          "✓ 涵盖约 190 项保障 + 20% 房贷延续储备金，稳妥守护每月 RM 5,600 房贷顺畅",
        ],
        defaultWhatsapp:
          "衷心恭喜 Amirul 与 Farah 喜获新山 Eco Botanic 梦想新居钥匙！🏡🔑 我特意为你们设计了这张乔迁祝贺卡。\n\n不同于绑定银行的 MRTA，可携式家庭护盾 PRUWith You Plus + PRUAll Care 不仅让您立即申领 RM 500 购屋现金奖赏、享有免费高达 +50% 保额递增，还附带 20% 房贷延续储备金守护每月 RM 5,600 供期。我发一份 1 页式对比图给您看看好吗？😊",
        defaultEmail:
          "主题：Eco Botanic RM 130万房贷保障对比：PRU (PRUWith You Plus) vs 友邦 (AIA A-Life Link 2)\n\nAmirul 与 Farah 您好：\n针对您 RM 130 万的新居房贷，以下是 PRU 方案相比 AIA A-Life Link 2 的 3 大客观优势：\n1. 无条件免费 +50% 保额自动递增：每年自动增长 1% 至最高 +50%，零额外保费，也无需缴付 AIA Vitality 健身会员费。\n2. 立即申领 RM 500 购屋现金奖赏：购买 Eco Botanic 新居即可直接获得 RM 500 现金祝贺金。\n3. 约 190 项保障 + 20% 房贷延续储备金：额外加码 20% 房贷延续储备，让每月 RM 5,600 新居供款稳健无忧。\n\n我们明晚 8:30 通个 10 分钟电话细聊好吗？",
      },
      yue: {
        shortLabel: "新樓 RM 130萬按揭",
        customerName: "Amirul Hakim & Farah Nadia (35歲，新山 JB)",
        existingGap: "得張醫藥卡 • 想配置跟身家庭保障同埋 20% 供樓延續儲備金",
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
          "拎 RM 500 買樓現金獎賞 (PRUWith You Plus) + 免費+50%加大保額 MLTA + PRUAll Care 20% 供樓延續儲備金",
          "解釋跟身 MLTA 點樣透過 FSA 法定信託將保障權益留返俾屋企人",
        ],
        aiaFacts: [
          "✓ 無條件免費 +50% 自動加大保額（PRUWith You Plus 每年免費+1%，唔使交 AIA Vitality 年費）",
          "✓ 收鎖匙即拎 RM 500 買樓里程碑現金獎賞",
          "✓ 保約 190 項守護 + 20% 供樓延續儲備金，確保每月 RM 5,600 供樓穩健輕鬆",
        ],
        defaultWhatsapp:
          "恭喜晒 Amirul 同 Farah 收到新山 Eco Botanic 新屋鎖匙呀！🏡🔑 我特登整咗呢張入伙賀卡送俾你哋。\n\n配搭跟身家庭保障 PRUWith You Plus + PRUAll Care 一收鎖匙即送 RM 500 買樓現金獎賞、免費高達 +50% 自動加大保額，仲附帶 20% 供樓延續儲備金守護每個月 RM 5,600 供樓。我 WhatsApp 份一頁紙懶人包俾你哋睇下？😊",
        defaultEmail:
          "主題：Eco Botanic RM 130萬按揭保障比較：PRU (PRUWith You Plus) vs 友邦 (AIA A-Life Link 2)\n\nHi Amirul & Farah：\n針對你哋 RM 130 萬新屋按揭，以下係 PRU 方案對比 AIA A-Life Link 2 嘅 3 個真實優勢：\n1. 無條件免費 +50% 自動加大保額：每年自動加 1% 去到 +50%，唔使加保費，亦唔使交 AIA Vitality 會費。\n2. 即拎 RM 500 買樓現金獎賞：買 Eco Botanic 新屋即刻有 RM 500 現金獎賞。\n3. 保約 190 項守護 + 20% 供樓延續儲備金：額外加碼 20% 儲備金，確保每個月 RM 5,600 供樓順暢安心。\n\n聽晚 8 點半鐘傾個 10 分鐘電話好嗎？",
      },
      ms: {
        shortLabel: "Rumah Baru RM 1.3J",
        customerName: "Amirul Hakim & Farah Nadia (35, JB)",
        existingGap: "Kad perubatan sahaja • Mahu perlindungan mudah alih milik keluarga + rizab kesinambungan gadai janji 20%",
        lifeEvent: "Baru mengambil kunci rumah semi-D RM 1.3J di Eco Botanic, JB",
        pambPlan: "PRUWith You Plus (MLTA Mudah Alih) + PRUAll Care",
        aiaPlan: "AIA A-Life Link 2 / A-Life Kasih Famili + CI Rider",
        customerReply:
          "\"Terima kasih atas kad ucapan rumah baru! Perancang AIA memberi sebut harga AIA A-Life Link 2 + rider CI untuk gadai janji kami. Boleh e-melkan perbandingan berfakta dengan pelan PRU?\"",
        cardHeadline: "Tahniah atas Rumah Impian Eco Botanic Baru Anda! 🏡🔑",
        cardChips: [
          "Tahniah atas Rumah Impian Eco Botanic Baru Anda! 🏡🔑",
          "Selamat Masuk Rumah Baru kepada Amirul & Farah! ✨",
        ],
        whatsappChips: [
          "Tuntut Ganjaran Tunai Rumah Baru RM 500 (PRUWith You Plus) + MLTA mudah alih (+50% Booster percuma) + rizab kesinambungan gadai janji 20%",
          "Terangkan kelebihan MLTA milik keluarga di bawah Amanah Berkanun FSA berbanding MRTA bank",
        ],
        aiaFacts: [
          "✓ Peningkatan Automatik +50% Tanpa Syarat (PRUWith You Plus +1%/thn percuma lwn yuran AIA Vitality)",
          "✓ Ganjaran Tunai Pencapaian Rumah Baru RM 500 Segera apabila mengambil kunci",
          "✓ ~190 Kondisi + 20% Rizab Kesinambungan Gadai Janji untuk ansuran RM 5,600/bln",
        ],
        defaultWhatsapp:
          "Tahniah Amirul & Farah kerana menerima kunci rumah impian Eco Botanic anda! 🏡🔑 Saya reka kad ucapan masuk rumah baru ini khas untuk anda berdua.\n\nDengan pelan milik keluarga PRUWith You Plus + PRUAll Care, anda menikmati Ganjaran Tunai Rumah Baru RM 500 serta-merta, Peningkatan Perlindungan Automatik +50% percuma, dan rizab kesinambungan gadai janji 20% untuk ansuran RM 5,600/bulan anda. Boleh saya hantarkan ringkasan 1 halaman? 😊",
        defaultEmail:
          "Subjek: Perbandingan Perisai Gadai Janji Eco Botanic: PRU (PRUWith You Plus) lwn AIA (A-Life Link 2)\n\nHai Amirul & Farah,\nBerikut ialah 3 kelebihan berfakta PRUWith You Plus + PRUAll Care berbanding AIA A-Life Link 2 untuk gadai janji RM 1.3J anda:\n1. Peningkatan Jumlah Diinsuranskan Automatik +50% Tanpa Syarat: Meningkat +1%/tahun sehingga +50% pada kos tambahan RM 0 tanpa yuran tahunan AIA Vitality.\n2. Ganjaran Tunai Rumah Baru RM 500 Segera: Bayaran tunai terus RM 500 apabila membeli rumah Eco Botanic anda.\n3. ~190 Kondisi + 20% Rizab Kesinambungan Gadai Janji: Menambah rizab kesinambungan 20% supaya bayaran RM 5,600/bulan anda kekal lancar.\n\nBoleh kita berbual 10 minit esok jam 8:30 malam?",
      },
      ta: {
        shortLabel: "புதிய RM 1.3M வீடு",
        customerName: "அமிருல் ஹக்கீம் & ஃபரா நதியா (35, JB)",
        existingGap: "மருத்துவ அட்டை மட்டும் • குடும்பத்திற்குச் சொந்தமான பாதுகாப்பு + 20% வீட்டுக் கடன் தொடர்ச்சி நிதி தேவை",
        lifeEvent: "ஜோகூர் பாரு Eco Botanic-ல் RM 1.3M மதிப்புள்ள புதிய வீட்டின் சாவியைப் பெற்றுள்ளனர்",
        pambPlan: "PRUWith You Plus (Portable MLTA) + PRUAll Care",
        aiaPlan: "AIA A-Life Link 2 / A-Life Kasih Famili + CI Rider",
        customerReply:
          "\"புதுமனை புகுவிழா வாழ்த்து அட்டைக்கு நன்றி! எங்கள் வீட்டுக் கடனுக்காக AIA A-Life Link 2 + CI rider திட்டத்தை ஒரு AIA முகவர் பரிந்துரைத்தார். PRU திட்டத்துடனான உண்மையான ஒப்பீட்டை மின்னஞ்சல் செய்ய முடியுமா?\"",
        cardHeadline: "உங்கள் புதிய Eco Botanic இல்லத்திற்கு மனமார்ந்த வாழ்த்துகள்! 🏡🔑",
        cardChips: [
          "உங்கள் புதிய Eco Botanic இல்லத்திற்கு மனமார்ந்த வாழ்த்துகள்! 🏡🔑",
          "அமிருல் & ஃபரா தம்பதியருக்கு இனிய புதுமனை புகுவிழா வாழ்த்துகள்! ✨",
        ],
        whatsappChips: [
          "RM 500 புதிய வீடு ரொக்கப் பரிசு (PRUWith You Plus) + இலவச +50% Booster MLTA + 20% வீட்டுக் கடன் தொடர்ச்சி நிதி",
          "FSA சட்டப்பூர்வ அறக்கட்டளை மூலம் PRU நேரடியாக குடும்பத்திற்குப் பலன் அளிப்பதை விளக்குக",
        ],
        aiaFacts: [
          "✓ நிபந்தனையற்ற +50% தானியங்கி காப்பீட்டு உயர்வு (PRUWith You Plus +1%/ஆண்டு இலவசம் vs AIA Vitality கட்டணம்)",
          "✓ புதிய வீட்டு சாவி பெற்றவுடன் உடனடி RM 500 ரொக்கப் பரிசு",
          "✓ ~190 நிலைகள் + 20% வீட்டுக் கடன் தொடர்ச்சி நிதி மூலம் மாதம் RM 5,600 தவணைப் பாதுகாப்பு",
        ],
        defaultWhatsapp:
          "உங்கள் Eco Botanic கனவு இல்லத்தின் சாவியைப் பெற்ற அமிருல் & ஃபராவிற்கு மனமார்ந்த வாழ்த்துகள்! 🏡🔑 உங்கள் இருவருக்காகவும் இந்த வாழ்த்து அட்டையை வடிவமைத்தேன்.\n\nPRUWith You Plus + PRUAll Care உங்களுக்கு உடனடி RM 500 புதிய வீடு ரொக்கப் பரிசு, இலவச +50% காப்பீட்டு உயர்வு மற்றும் மாதம் RM 5,600 கடனைத் தடையின்றித் தொடர 20% கூடுதல் தொடர்ச்சி நிதியையும் வழங்குகிறது. 1 பக்க சுருக்கத்தை அனுப்பட்டுமா? 😊",
        defaultEmail:
          "பொருள்: Eco Botanic வீட்டுக் கடன் பாதுகாப்பு ஒப்பீடு: PRU (PRUWith You Plus) vs AIA (A-Life Link 2)\n\nவணக்கம் அமிருல் & ஃபரா,\nஉங்கள் RM 1.3M வீட்டுக் கடனுக்கு AIA A-Life Link 2-ஐ விட PRU திட்டம் சிறந்ததாக இருப்பதற்கான 3 உண்மையான காரணங்கள்:\n1. நிபந்தனையற்ற +50% தானியங்கி காப்பீட்டு உயர்வு: ஆண்டுக்கு +1% வீதம் +50% வரை இலவசமாக உயரும் (AIA Vitality கட்டணம் தேவையில்லை).\n2. உடனடி RM 500 புதிய வீடு ரொக்கப் பரிசு: உங்கள் புதிய வீட்டிற்கு RM 500 நேரடி ரொக்கப் பரிசு.\n3. ~190 நிலைகள் + 20% வீட்டுக் கடன் தொடர்ச்சி நிதி: உங்கள் RM 5,600 மாதத் தவணை தடையின்றி செலுத்தப்படுவதை உறுதி செய்கிறது.\n\nநாளை இரவு 8:30 மணிக்கு 10 நிமிடம் தொலைபேசியில் பேசலாமா?",
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
          "\"Thank you for the promotion card! A fellow consultant recommended AIA A-Life Lady360 + A-Life Wealth Builder. Could you email me a factual comparison with PRU?\"",
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
          "Subject: Executive Comparison for Dr. Kavitha: PRU (PRULady & PRUElite Invest) vs. AIA (A-Life Lady360)\n\nDear Dr. Kavitha,\nHere is the factual comparison between our PRU plan and AIA Malaysia for your executive portfolio:\n1. 260% Female CI + Up to 110% Maturity Refund: PRULady delivers up to 260% cover, a Career Promotion Cash Reward, and refunds up to 110% of total premiums at maturity.\n2. 103% Day-1 Wealth Allocation (PRUElite Invest): Invests 103% of your single premium on Day 1 (+3% immediate bonus), beating standard ILP/unit trust front-end charges.\n3. Auto-Increasing Med Value Point (PRUValue Med): Grows your medical limit every year + 80% continuous coverage beyond the limit.\n\nI can bring the 1-page table to your clinic lounge Tuesday at 2 PM!",
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
          "主题：Dr. Kavitha 专属高管方案对比：PRU (PRULady & PRUElite Invest) vs 友邦 (AIA Lady360)\n\n尊敬的 Dr. Kavitha：\n以下是针对您的高管保障与财富组合，PRU 方案与友邦 AIA 的 3 大客观条款对比：\n1. 高达 260% 女性危疾 + 110% 满期保费退还：PRULady 提供高达 260% 赔付、职业晋升现金奖赏，且满期退还高达 110% 已缴总保费。\n2. 首日 103% 财富配置率 (PRUElite Invest)：第 1 天即将您 103% 的保费投入增值（立即赠送 +3% 红利），远超传统投资联结险或信托基金的前端收费。\n3. 医疗限额每年自动递增 (PRUValue Med)：不论有无索赔，每年自动提高 Med Value Point，超额后仍持续赔付 80%。\n\n我周二下午 2 点把一页式对比表带到您诊所休息室给您过目！",
      },
      yue: {
        shortLabel: "升職做部門主管",
        customerName: "Dr. Kavitha Pillai (42歲，KL 高級專科醫生)",
        existingGap: "舊 RM 20萬保單 • RM 0 女性危疾同埋高配置財富增值",
        lifeEvent: "升職做 KL 私家醫院部門主管（人工翻倍）",
        pambPlan: "PRULady + PRUElite Invest + PRUValue Med",
        aiaPlan: "AIA A-Life Lady360 + A-Life Wealth Builder",
        customerReply:
          "「多謝你張升職賀卡呀！有個醫生同事介紹咗 AIA A-Life Lady360 + A-Life Wealth Builder 俾我。你可唔可以 Email 份PRU vs AIA 嘅客觀比較俾我睇下？」",
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
          "主題：Dr. Kavitha 行政人員方案比較：PRU (PRULady & PRUElite Invest) vs 友邦 (AIA Lady360)\n\nDear Dr. Kavitha：\n以下係PRU 方案同 AIA 針對你行政財富組合嘅 3 大真實條款比較：\n1. 高達 260% 女性危疾 + 110% 期滿保費退還：PRULady 提供高達 260% 保障、升職現金獎賞，期滿仲退返高達 110% 總保費。\n2. Day 1 即享 103% 財富配置 (PRUElite Invest)：第一日就有 103% 資金幫你滾存（即送 +3% 紅利），遠勝一般基金同 ILP 手續費。\n3. 醫療額年年自動遞增 (PRUValue Med)：無論有無 claim，Med Value Point 年年自動加，爆咗額仲持續保 80%。\n\n我禮拜二下晝 2 點帶埋張一頁紙對比表過嚟你診所 Lounge 俾你睇！",
      },
      ms: {
        shortLabel: "Kenaikan Pangkat",
        customerName: "Dr. Kavitha Pillai (42, Pakar Perunding Kanan KL)",
        existingGap: "Polisi lama RM 200k • RM 0 CI wanita & pelaburan peruntukan tinggi",
        lifeEvent: "Dinaikkan pangkat sebagai Ketua Jabatan di hospital KL (Pendapatan berganda)",
        pambPlan: "PRULady + PRUElite Invest + PRUValue Med",
        aiaPlan: "AIA A-Life Lady360 + A-Life Wealth Builder",
        customerReply:
          "\"Terima kasih atas kad ucapan kenaikan pangkat! Rakan pakar mengesyorkan AIA A-Life Lady360 + A-Life Wealth Builder. Boleh e-melkan perbandingan berfakta dengan pelan PRU?\"",
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
          "Subjek: Perbandingan Eksekutif untuk Dr. Kavitha: PRU (PRULady & PRUElite Invest) lwn AIA (A-Life Lady360)\n\nDr. Kavitha yang dihormati,\nBerikut ialah perbandingan berfakta antara our PRU plan dan AIA Malaysia untuk portfolio eksekutif anda:\n1. 260% CI Wanita + Pulangan Matang Sehingga 110%: PRULady memberikan perlindungan sehingga 260%, Ganjaran Tunai Kenaikan Pangkat, dan memulangkan sehingga 110% jumlah premium semasa matang.\n2. Peruntukan Kekayaan Hari-1 103% (PRUElite Invest): Melaburkan 103% daripada premium tunggal anda pada Hari Pertama (+3% bonus segera).\n3. Med Value Point Meningkat Automatik (PRUValue Med): Meningkatkan had perubatan anda setiap tahun + 80% perlindungan berterusan melebihi had.\n\nSaya boleh bawakan jadual 1 halaman ke ruang istirahat klinik anda Selasa jam 2 petang!",
      },
      ta: {
        shortLabel: "பதவி உயர்வு (Promotion)",
        customerName: "டாக்டர் கவிதா பிள்ளை (42, KL மூத்த சிறப்பு மருத்துவர்)",
        existingGap: "பழைய RM 200k பாலிசி • RM 0 பெண்கள் தீவிர நோய் & உயர் முதலீட்டுத் திட்டம்",
        lifeEvent: "KL மருத்துவமனையில் துறைத் தலைவராக (HOD) பதவி உயர்வு (வருமானம் இருமடங்கு)",
        pambPlan: "PRULady + PRUElite Invest + PRUValue Med",
        aiaPlan: "AIA A-Life Lady360 + A-Life Wealth Builder",
        customerReply:
          "\"பதவி உயர்வு வாழ்த்து அட்டைக்கு நன்றி! சக மருத்துவர் ஒருவர் AIA A-Life Lady360 + A-Life Wealth Builder திட்டத்தை பரிந்துரைத்தார். PRU திட்டத்துடனான உண்மையான ஒப்பீட்டை மின்னஞ்சல் செய்ய முடியுமா?\"",
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
          "பொருள்: டாக்டர் கவிதாவுக்கான உண்மையான ஒப்பீடு: PRU (PRULady & PRUElite Invest) vs AIA (A-Life Lady360)\n\nஅன்புள்ள டாக்டர் கவிதா,\nour PRU plan மற்றும் AIA Malaysia இடையேயான 3 உண்மையான ஒப்பீடுகள்:\n1. 260% பெண்கள் CI + 110% முதிர்வுத் தொகை: PRULady 260% வரை பாதுகாப்பும், பதவி உயர்வு ரொக்கப் பரிசும், முதிர்வில் 110% வரை பிரீமியத்தையும் திரும்ப வழங்குகிறது.\n2. முதல் நாளில் 103% முதலீட்டு ஒதுக்கீடு (PRUElite Invest): முதல் நாளிலேயே 103% முதலீடு செய்யப்படுகிறது (+3% உடனடி போனஸ்).\n3. தானாக உயரும் Med Value Point (PRUValue Med): ஒவ்வொரு ஆண்டும் உங்கள் மருத்துவ வரம்பு உயர்கிறது + வரம்பிற்கு மேலும் 80% தொடர் பாதுகாப்பு.\n\nசெவ்வாய்க்கிழமை மதியம் 2 மணிக்கு உங்கள் கிளினிக்கில் 1 பக்க ஒப்பீட்டைக் காட்டுகிறேன்!",
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
        existingGap: "RM 18M illiquid factory • RM 5.2M corporate guarantee to ring-fence",
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
          "Equalize UK medical son (PRU tax-free cash) & Melbourne successor daughter (100% Penang factory shares) via PRUPrestige Legacy",
        ],
        aiaFacts: [
          "✓ Automatic +30%/+50% Cover Booster & 500% Executive Travel & Keyman Multiplier (PRUWealth Enrich 2.0 without AIA Vitality checks)",
          "✓ 100% Day-1 Capital Allocation (PRUPrestige Legacy preserves corporate liquidity during Phase-2 capex)",
          "✓ Built-In Legacy Settlement Option + FSA Sec 130 Statutory Creditor Shield (zero private trust fees)",
        ],
        defaultWhatsapp:
          "Heartiest congratulations, Dato' Sri Raymond, on breaking ground on your Phase-2 Batu Kawan plant! 🏭🚀 I created this corporate milestone card for your group.\n\nWith <2.5% of working capital, PRUWealth Enrich 2.0 + PRUPrestige Legacy ring-fences your RM 6M personal bank guarantee under FSA Schedule 10 Statutory Trust while equalizing inheritance between your UK son (cash) and Melbourne daughter (100% factory shares). Free for a 15-min brief Thursday at 3 PM? 🤝",
        defaultEmail:
          "Subject: Corporate Keyman & Legacy Comparison: PRU (PRUWealth Enrich 2.0) vs. AIA (A-Life Legasi Beyond)\n\nDear Dato' Sri Raymond,\nHere is the factual comparison between PRU and AIA A-Life Legasi Beyond for your RM 6M Batu Kawan facility & family succession:\n1. Automatic +30%/+50% Cover Booster & 500% Executive Travel & Keyman Multiplier: PRUWealth Enrich 2.0 automatically scales your high sum assured by up to +50% and includes a 500% Executive Travel & Keyman Multiplier without annual AIA Vitality fitness checks.\n2. 100% Day-1 Capital Allocation (PRUPrestige Legacy): Puts 100% of premium to work on Day 1, preserving cashflow liquidity during factory expansion.\n3. Legacy Settlement Option + FSA Sec 130 Creditor Shield: Ring-fences the RM 6M guarantee and pays structured cash to your UK son so your daughter inherits 100% of factory shares cleanly.\n\nSee you Thursday at 3 PM at your Batu Kawan office!",
      },
      "zh-CN": {
        shortLabel: "企业 RM 600万担保",
        customerName: "拿督斯里陈耀明 Dato' Sri Raymond Tan (49岁，槟城精密制造创办人)",
        existingGap: "RM 1800万厂房股权缺乏流动性 • RM 600万个人银行担保待隔离",
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
          "✓ 自动 +30%/+50% 保额倍增 & 高达 500% 高管差旅与关键人保障倍增（PRUWealth Enrich 2.0 无需 AIA Vitality 体检打卡）",
          "✓ 首日 100% 资本配置率（PRUPrestige Legacy 在二期扩厂期间保留高现金流价值）",
          "✓ 内置分期传承给付 (Legacy Settlement) + FSA 第130条债权人隔离保护（免高额私人信托年费）",
        ],
        defaultWhatsapp:
          "拿督斯里陈耀明，诚挚祝贺贵集团 Batu Kawan 二期厂房隆重动土！🏭🚀 我特意为贵公司制作了这张企业里程碑祝贺卡。\n\n只需动用不到 2.5% 的营运资金，PRUWealth Enrich 2.0 + PRUPrestige Legacy 即可在《2013年金融服务法令》(FSA) 第10附表法定信托下为您隔离 RM 600万银行个人担保，同时让英国学医的公子获得免税现金、墨尔本千金完整继承 100% 厂房股权。周四下午 3 点方便用 15 分钟向您汇报吗？🤝",
        defaultEmail:
          "主题：企业关键人物与家族传承客观对比：PRU (PRUWealth Enrich 2.0) vs 友邦 (AIA A-Life Legasi Beyond)\n\n尊敬的拿督斯里陈耀明：\n针对您 Batu Kawan 二期厂房 RM 600万银行担保与子女股权传承，以下是 PRU 方案与 AIA A-Life Legasi Beyond 的 3 大客观优势：\n1. 自动 +30%/+50% 保额倍增与高达 500% 高管差旅与关键人保障倍增：PRUWealth Enrich 2.0 自动提升高额保障高达 +50% 并涵盖高达 500% 高管差旅与关键人保障倍增，无需像 AIA Vitality 那样每年做健康打卡。\n2. 首日 100% 资本配置率 (PRUPrestige Legacy)：第 1 天即 100% 投入保单价值，在二期扩厂资本支出期间为您保留高额企业现金流。\n3. 内置分期传承给付 + FSA 法定债权人隔离：有效隔离 RM 600万个人担保，将免税现金分期拨付给英国公子，让接班千金完整持有 100% 厂房股份。\n\n周四下午 3 点在您 Batu Kawan 办公室见！",
      },
      yue: {
        shortLabel: "廠家 RM 600萬擔保",
        customerName: "拿督斯里陳耀明 Dato' Sri Raymond Tan (49歲，檳城廠家老闆)",
        existingGap: "RM 1800萬廠房股份無流動現金 • 簽咗 RM 600萬銀行個人擔保待隔離",
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
          "✓ 自動 +30%/+50% 保額倍增 & 高達 500% 高管差旅與關鍵人保障倍增（PRUWealth Enrich 2.0 唔使做 AIA Vitality 運動打卡）",
          "✓ Day 1 即有 100% 資本配置（PRUPrestige Legacy 喺擴建廠房期間保留高現金流價值）",
          "✓ 內置分期傳承派發 (Legacy Settlement) + FSA 債權人隔離保護（慳返私家信託貴年費）",
        ],
        defaultWhatsapp:
          "拿督斯里陳生，恭喜晒貴集團 Batu Kawan 二期新廠房動土大吉！🏭🚀 我特登整咗呢張企業里程碑賀卡送俾你。\n\n只要用少過 2.5% 營運資金，PRUWealth Enrich 2.0 + PRUPrestige Legacy 就可以透過 FSA 法定信託幫你隔離 RM 600萬銀行個人擔保，仲可以俾免稅現金英國讀醫個仔、等墨爾本個女可以 100% 完整接班揸晒廠房股份。星期四下晝 3 點鐘方唔方便傾 15 分鐘？🤝",
        defaultEmail:
          "主題：企業要員與家族傳承客觀比較：PRU (PRUWealth Enrich 2.0) vs 友邦 (AIA A-Life Legasi Beyond)\n\n尊敬嘅拿督斯里陳耀明：\n針對你 Batu Kawan 二期廠房 RM 600萬銀行擔保同埋仔女接班傳承，以下係 PRU 方案對比 AIA A-Life Legasi Beyond 嘅 3 大真實優勢：\n1. 自動 +30%/+50% 保額倍增兼高達 500% 高管差旅與關鍵人保障倍增：PRUWealth Enrich 2.0 自動加大保額高達 +50% 同埋包高達 500% 高管差旅與關鍵人保障倍增，唔使好似 AIA Vitality 咁每年打卡。\n2. Day 1 即享 100% 資本配置 (PRUPrestige Legacy)：第一日就 100% 擺落保單價值，喺起新廠期間保留最高企業現金流。\n3. 內置分期傳承派發 + FSA 債權人隔離：保護屋企唔受 RM 600萬擔保牽連，直接派免稅現金俾英國個仔，等你個女乾手淨腳繼承 100% 廠房股份。\n\n星期四下晝 3 點喺你 Batu Kawan Office 見！",
      },
      ms: {
        shortLabel: "Pinjaman PKS RM 6J",
        customerName: "Dato' Sri Raymond Tan (49, Pengasas Kilang Pulau Pinang)",
        existingGap: "Kilang RM 18J tidak cair • Jaminan bank RM 5.2J untuk diasingkan",
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
          "Seimbangkan warisan anak lelaki di UK (tunai bebas cukai PRU) & anak perempuan pengganti (100% saham kilang) melalui PRUPrestige Legacy",
        ],
        aiaFacts: [
          "✓ Peningkatan Perlindungan Automatik +30%/+50% & Sehingga 500% Gandaan Perlindungan Eksekutif & Perjalanan (PRUWealth Enrich 2.0 tanpa semakan AIA Vitality)",
          "✓ Peruntukan Modal Hari-1 100% (PRUPrestige Legacy mengekalkan kecairan korporat semasa capex Fasa-2)",
          "✓ Pilihan Penyelesaian Legasi Terbina Dalam + Perisai Pemiutang Berkanun Sek 130 FSA (sifar yuran amanah swasta)",
        ],
        defaultWhatsapp:
          "Setinggi-tinggi tahniah, Dato' Sri Raymond, atas majlis pecah tanah kilang Fasa-2 Batu Kawan anda! 🏭🚀 Saya sediakan kad pencapaian korporat ini untuk kumpulan anda.\n\nDengan <2.5% modal kerja, PRUWealth Enrich 2.0 + PRUPrestige Legacy melindungi jaminan bank peribadi RM 6J anda di bawah Amanah Berkanun Jadual 10 FSA sambil menyeimbangkan warisan antara anak lelaki anda di UK (tunai) dan anak perempuan di Melbourne (100% saham kilang). Lapang untuk taklimat 15 minit Khamis jam 3 petang? 🤝",
        defaultEmail:
          "Subjek: Perbandingan Keyman Korporat & Legasi: PRU (PRUWealth Enrich 2.0) lwn AIA (A-Life Legasi Beyond)\n\nDato' Sri Raymond yang dihormati,\nBerikut ialah perbandingan berfakta antara PRU dan AIA A-Life Legasi Beyond untuk kemudahan RM 6J Batu Kawan & pewarisan keluarga anda:\n1. Peningkatan Perlindungan Automatik +30%/+50% & Sehingga 500% Gandaan Perlindungan Eksekutif & Perjalanan: PRUWealth Enrich 2.0 meningkatkan jumlah diinsuranskan sehingga +50% secara automatik tanpa pemeriksaan tahunan AIA Vitality.\n2. Peruntukan Modal Hari-1 100% (PRUPrestige Legacy): Memasukkan 100% premium untuk bekerja pada Hari Pertama, mengekalkan kecairan aliran tunai semasa pengembangan kilang.\n3. Pilihan Penyelesaian Legasi + Perisai Pemiutang Sek 130 FSA: Melindungi daripada jaminan RM 6J dan membayar tunai berstruktur kepada anak lelaki anda supaya anak perempuan anda mewarisi 100% saham kilang.\n\nJumpa anda Khamis jam 3 petang di pejabat Batu Kawan anda!",
      },
      ta: {
        shortLabel: "நிறுவன RM 6M கடன் பாதுகாப்பு",
        customerName: "டத்தோ ஸ்ரீ ரேமண்ட் டான் (49, பினாங்கு தொழிற்சாலை நிறுவனர்)",
        existingGap: "RM 18M தொழிற்சாலை பங்குகள் • RM 6M தனிப்பட்ட வங்கி உத்தரவாதப் பாதுகாப்பு தேவை",
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
          "✓ தானியங்கி +30%/+50% Cover Booster & 500% உயர் அதிகாரி பயண & Keyman பாதுகாப்பு மடங்கு (PRUWealth Enrich 2.0 - AIA Vitality நிபந்தனை இல்லை)",
          "✓ முதல் நாளில் 100% மூலதன ஒதுக்கீடு (PRUPrestige Legacy ஆலை விரிவாக்கத்தின் போது பணப்புழக்கத்தைப் பாதுகாக்கிறது)",
          "✓ உள்ளமைக்கப்பட்ட Legacy Settlement Option + FSA பிரிவு 130 கடன் பாதுகாப்பு",
        ],
        defaultWhatsapp:
          "Batu Kawan இரண்டாம் கட்ட தொழிற்சாலையைத் தொடங்கும் டத்தோ ஸ்ரீ ரேமண்ட் அவர்களுக்கு மனமார்ந்த வாழ்த்துகள்! 🏭🚀 உங்கள் நிறுவனத்திற்காக இந்த சிறப்பு வாழ்த்து அட்டையை உருவாக்கினேன்.\n\nவெறும் <2.5% மூலதனத்தில், PRUWealth Enrich 2.0 + PRUPrestige Legacy உங்கள் RM 6M வங்கி உத்தரவாதத்தை FSA Schedule 10 சட்டப்பூர்வ அறக்கட்டளையின் கீழ் பாதுகாக்கிறது; மேலும் UK மகனுக்கு வரியில்லா ரொக்கமும், மகளுக்கு 100% ஆலை பங்குகளும் கிடைக்கச் செய்கிறது. வியாழன் மதியம் 3 மணிக்கு 15 நிமிடம் பேசலாமா? 🤝",
        defaultEmail:
          "பொருள்: நிறுவன Keyman & வாரிசு ஒப்பீடு: PRU (PRUWealth Enrich 2.0) vs AIA (A-Life Legasi Beyond)\n\nமதிப்பிற்குரிய டத்தோ ஸ்ரீ ரேமண்ட்,\nஉங்கள் RM 6M Batu Kawan ஆலை மற்றும் குடும்ப வாரிசுத் திட்டத்திற்கான PRU vs AIA A-Life Legasi Beyond உண்மையான ஒப்பீடு:\n1. தானியங்கி +30%/+50% Cover Booster & 500% உயர் அதிகாரி பயண & Keyman பாதுகாப்பு மடங்கு: PRUWealth Enrich 2.0 எந்த AIA Vitality நிபந்தனையும் இன்றி காப்பீட்டை +50% வரை உயர்த்துகிறது.\n2. முதல் நாளில் 100% மூலதன ஒதுக்கீடு (PRUPrestige Legacy): ஆலை விரிவாக்கத்தின் போது உங்கள் நிறுவன பணப்புழக்கத்தைப் பாதுகாக்கிறது.\n3. Legacy Settlement Option + FSA பிரிவு 130 பாதுகாப்பு: RM 6M கடன் உத்தரவாதத்திலிருந்து பாதுகாத்து, மகளுக்கு 100% ஆலை பங்குகளையும் மகனுக்கு ரொக்கத்தையும் வழங்குகிறது.\n\nவியாழக்கிழமை மதியம் 3 மணிக்கு உங்கள் Batu Kawan அலுவலகத்தில் சந்திப்போம்!",
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
          "\"Lovely 50th birthday card! An AIA advisor showed us AIA A-Plus Health360 + A-Life Wealth Venture for retirement. Can you email how PRU compares factually?\"",
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
          "Subject: Age-50 Retirement & Medical Comparison: PRU (PRUValue Med & PRUElite Flex) vs. AIA\n\nHi Vincent & Elaine,\nHere are 3 factual reasons PRUValue Med + PRUElite Flex outperforms AIA A-Plus Health360 + A-Life Wealth Venture for your retirement:\n1. Med Value Point Grows Every Year—Even If You Claim: PRUValue Med increases your limit every single year and pays 80% of bills beyond the limit (AIA's Health Wallet stops growing in any year you claim).\n2. Guaranteed Annual FlexIncome to Age 100: PRUElite Flex locks in guaranteed annual retirement income to age 100.\n3. Smart Deductible Age-60 Bridge: Slashes premiums from age 50–60 while covered by employer medical, locking in clean age-50 underwriting now.\n\nLet's review the 1-page bridge on Zoom this Saturday at 11 AM!",
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
          "主题：50岁退休与医疗衔接客观对比：PRU (PRUValue Med & PRUElite Flex) vs 友邦 (AIA)\n\nVincent 与 Elaine 您好：\n以下是大马PRUValue Med + PRUElite Flex 相比友邦 AIA A-Plus Health360 + A-Life Wealth Venture 的 3 大客观优势：\n1. 即使发生索赔，Med Value Point 依然每年递增：PRUValue Med 每年自动提高医疗限额，且超额后仍赔付 80%（而 AIA Health Wallet 在索赔年份会停止增长）。\n2. 保证每年派发 FlexIncome 至 100 岁：PRUElite Flex 提供写进合同的保证年度退休现金流至 100 岁。\n3. 50–60 岁 Smart Deductible 完美衔接：在您仍有公司医药卡期间大幅减免保费，同时提前锁定 50 岁健康核保资格。\n\n我们周六上午 11 点在 Zoom 上用 10 分钟看一下一页式对比表吧！",
      },
      yue: {
        shortLabel: "50歲生日兼阿女留學",
        customerName: "王文森 Vincent & 許依琳 Elaine (50歲，怡保 / KL)",
        existingGap: "公司醫藥卡 60 歲就停（醫療斷崖）• 要留澳幣學費兼準備退休長糧",
        lifeEvent: "Vincent 50 歲大壽，同埋阿女啱啱收到墨爾本大學 Offer",
        pambPlan: "PRUValue Med (Smart Deductible) + PRUElite Flex",
        aiaPlan: "AIA A-Plus Health360 (Deductible) + A-Life Wealth Venture",
        customerReply:
          "「好靚呀張 50 歲生日賀卡！啱啱有個 AIA 顧問俾我哋睇 AIA A-Plus Health360 + A-Life Wealth Venture 退休計劃。你可唔可以 Email 份PRU vs AIA 嘅客觀比較俾我哋？」",
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
          "主題：50歲退休同醫療駁腳客觀比較：PRU (PRUValue Med & PRUElite Flex) vs 友邦 (AIA)\n\nHi Vincent & Elaine：\n以下係大馬PRUValue Med + PRUElite Flex 對比 AIA A-Plus Health360 + A-Life Wealth Venture 嘅 3 個真實條款優勢：\n1. 就算有 Claim，Med Value Point 都年年照加：PRUValue Med 每年自動加大醫療額，爆額後仲保 80%（AIA 個 Health Wallet 只要嗰年有 claim 就會停加）。\n2. 保證年年派 FlexIncome 長糧到 100 歲：PRUElite Flex 寫明喺合約入面保證派發退休現金流到 100 歲。\n3. Smart Deductible 50–60 歲完美駁腳：趁仲有公司醫保嗰陣大幅減保費，但係而家就鎖定 50 歲健康核保。\n\n我哋星期六朝早 11 點開個 10 分鐘 Zoom 睇下張一頁紙對比表啦！",
      },
      ms: {
        shortLabel: "Umur 50 & Universiti Anak",
        customerName: "Vincent Ong & Elaine Khor (50, Ipoh / KL)",
        existingGap: "Perubatan syarikat tamat umur 60 ('Med Cliff') • Perlu pendapatan selepas 60",
        lifeEvent: "Hari jadi ke-50 Vincent & anak perempuan diterima masuk ke Universiti Melbourne",
        pambPlan: "PRUValue Med (Smart Deductible) + PRUElite Flex",
        aiaPlan: "AIA A-Plus Health360 (Deductible) + A-Life Wealth Venture",
        customerReply:
          "\"Kad hari jadi ke-50 yang sangat cantik! Penasihat AIA menunjukkan kami AIA A-Plus Health360 + A-Life Wealth Venture untuk persaraan. Boleh e-melkan perbandingan berfakta dengan pelan PRU?\"",
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
          "Subjek: Perbandingan Persaraan & Perubatan Umur 50: PRU (PRUValue Med & PRUElite Flex) lwn AIA\n\nHai Vincent & Elaine,\nBerikut ialah 3 sebab berfakta mengapa PRUValue Med + PRUElite Flex mengatasi AIA A-Plus Health360 + A-Life Wealth Venture untuk persaraan anda:\n1. Med Value Point Meningkat Setiap Tahun—Walaupun Anda Membuat Tuntutan: PRUValue Med meningkatkan had anda setiap tahun dan membayar 80% bil melebihi had (Health Wallet AIA berhenti meningkat pada tahun anda membuat tuntutan).\n2. FlexIncome Tahunan Terjamin hingga Umur 100: PRUElite Flex mengunci pendapatan persaraan tahunan terjamin sehingga umur 100.\n3. Jambatan Smart Deductible Umur 60: Mengurangkan premium dari umur 50–60 semasa dilindungi majikan sambil mengunci pengunderaitan bersih umur 50 sekarang.\n\nMari kita semak jadual 1 halaman di Zoom Sabtu ini jam 11 pagi!",
      },
      ta: {
        shortLabel: "வயது 50 & மகள் பல்கலைக்கழகம்",
        customerName: "வின்சென்ட் ஓங் & எலைன் கோர் (50, ஈப்போ / KL)",
        existingGap: "நிறுவன மருத்துவ அட்டை 60 வயதில் முடிகிறது • 60 வயதுக்குப் பின் ஓய்வூதிய வருமானம் தேவை",
        lifeEvent: "வின்சென்ட்டின் 50வது பிறந்தநாள் & மகளுக்கு மெல்போர்ன் பல்கலைக்கழகத்தில் இடம் கிடைத்துள்ளது",
        pambPlan: "PRUValue Med (Smart Deductible) + PRUElite Flex",
        aiaPlan: "AIA A-Plus Health360 (Deductible) + A-Life Wealth Venture",
        customerReply:
          "\"அழகான 50வது பிறந்தநாள் வாழ்த்து அட்டை! ஒரு AIA ஆலோசகர் ஓய்வூதியத்திற்காக AIA A-Plus Health360 + A-Life Wealth Venture திட்டத்தைக் காட்டினார். PRU திட்டத்துடனான உண்மையான ஒப்பீட்டை மின்னஞ்சல் செய்ய முடியுமா?\"",
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
          "பொருள்: 50 வயது ஓய்வூதியம் & மருத்துவ ஒப்பீடு: PRU (PRUValue Med & PRUElite Flex) vs AIA\n\nவணக்கம் வின்சென்ட் & எலைன்,\nAIA A-Plus Health360 + A-Life Wealth Venture திட்டத்தை விட PRU திட்டம் சிறந்து விளங்குவதற்கான 3 உண்மையான காரணங்கள்:\n1. கிளைம் செய்தாலும் Med Value Point ஆண்டுதோறும் உயரும்: PRUValue Med ஒவ்வொரு ஆண்டும் உங்கள் வரம்பை உயர்த்துகிறது மற்றும் வரம்பிற்கு மேல் 80% வழங்குகிறது (AIA Health Wallet நீங்கள் கிளைம் செய்யும் ஆண்டில் உயராது).\n2. 100 வயது வரை உத்தரவாதமான வருடாந்திர FlexIncome: PRUElite Flex 100 வயது வரை உத்தரவாதமான ஓய்வூதிய வருமானத்தை வழங்குகிறது.\n3. Smart Deductible சலுகை: 50–60 வயது வரை நிறுவன காப்பீடு இருக்கும்போது பிரீமியத்தைக் குறைத்து, 50 வயது ஆரோக்கிய தகுதியை இப்போதே உறுதி செய்கிறது.\n\nஇந்த சனிக்கிழமை காலை 11 மணிக்கு Zoom-ல் 1 பக்க ஒப்பீட்டைப் பார்ப்போம்!",
      },
    },
  },
  {
    id: "takaful_hibah_estate",
    icon: "🕌",
    rivalBrand: "AIA Public Takaful",
    i18n: {
      en: {
        shortLabel: "Hibah & SME Estate",
        rivalBrand: "AIA Public Takaful",
        customerName: "Tuan Haji Zulkarnain & Puan Aishah (46, Shah Alam)",
        existingGap: "RM 9M business & property in joint names • Zero conditional Hibah Takaful liquidity",
        lifeEvent: "Engineering Sdn Bhd hit record revenue; wants Shariah Hibah liquidity outside 18-mth estate freeze",
        pambPlan: "PRUBSN WarisanPlus + PRUBSN AnugerahPlus (Shariah Hibah)",
        aiaPlan: "AIA Public Takaful A-Life Legasi + A-Life Ikhtiar",
        customerReply:
          "\"Alhamdulillah, thank you for the card! AIA Public Takaful quoted us A-Life Legasi. How does PRUBSN WarisanPlus compare for Hibah?\"",
        cardHeadline: "Mabruk on Engineering Sdn Bhd's Record Milestone & Barakah! 🌟",
        cardChips: [
          "Mabruk on Engineering Sdn Bhd's Record Milestone & Barakah! 🌟",
          "Wishing Continued Barakah, Harmony & Family Legacy! 🕌",
        ],
        aiaFacts: [
          "✓ Immediate Conditional Hibah Payout Outside Estate Freeze: PRUBSN WarisanPlus delivers fast Shariah liquidity without annual AIA Vitality fees",
          "✓ Up to 400% Accidental Cover (including Umrah/Hajj & public hubs) + rare diseases protection built into the certificate",
          "✓ Flexible Wakaf & Charitable Endowments option alongside family Hibah nomination for lasting Sadaqah Jariyah",
        ],
        defaultWhatsapp:
          "Assalamualaikum & Mabruk Tuan Haji Zulkarnain & Puan Aishah on Engineering Sdn Bhd's record milestone! 🕌✨ I designed this celebratory card specially for your family.\n\nQuick Shariah estate note: PRUBSN WarisanPlus injects immediate Conditional Hibah cash outside probate/estate freeze while adding up to 400% Umrah/Hajj accidental protection so your RM 9M business assets stay intact. Shall I send a 2-min Hibah summary? 😊",
        defaultEmail:
          "Subject: Shariah Hibah & Legacy Comparison: PRUBSN WarisanPlus vs. AIA Public Takaful A-Life Legasi\n\nAssalamualaikum Tuan Haji Zulkarnain & Puan Aishah,\nHere are 3 factual reasons PRUBSN WarisanPlus serves your family & business legacy stronger than AIA A-Life Legasi:\n1. Immediate Conditional Hibah Outside Estate Freeze: Delivers fast Shariah-compliant family liquidity with zero annual AIA Vitality fees required.\n2. Up to 400% Accidental & Umrah/Hajj Shield: Built-in high multiplier protection for public transport and overseas pilgrimage.\n3. Built-In Wakaf & Faraid Harmony: Settles company liabilities cleanly without forced asset sales while supporting Sadaqah Jariyah.\n\nHow about a 15-min coffee with you and Puan Aishah next week to review both tables?",
      },
      "zh-CN": {
        shortLabel: "清真企业 Hibah 传承",
        rivalBrand: "AIA Public Takaful",
        customerName: "Haji Zulkarnain & Aishah (46岁, 莎阿南企业主)",
        existingGap: "RM 900万房产与公司股份联名持有 • 缺乏免冻结即刻到账的 Hibah 流动现金",
        lifeEvent: "Engineering Sdn Bhd 业绩创历史新高；希望通过 Hibah 赠与隔离长达18个月遗产冻结",
        pambPlan: "PRUBSN WarisanPlus + PRUBSN AnugerahPlus (Shariah Hibah)",
        aiaPlan: "AIA Public Takaful A-Life Legasi + A-Life Ikhtiar",
        customerReply:
          "“非常感谢精美的祝贺卡！AIA Public Takaful 刚报了 A-Life Legasi，PRUBSN WarisanPlus 在 Hibah 传承上有什么优势？”",
        cardHeadline: "祝贺 Engineering Sdn Bhd 业绩长虹、家族福泽绵长！🌟",
        cardChips: [
          "祝贺 Engineering Sdn Bhd 业绩长虹、家族福泽绵长！🌟",
          "愿事业兴旺、家族和谐传承世代平安！🕌",
        ],
        aiaFacts: [
          "✓ 免 Vitality 会费稳享高额 Hibah 传承：PRUBSN WarisanPlus 绕过遗产冻结即刻直付，无需每年缴会费打卡",
          "✓ 高达 400% 特定意外与朝圣保障（含 Umrah/Hajj 与公共枢纽）+ 罕见重症覆盖",
          "✓ 内建 Wakaf 公益捐赠选项：守护家人 Hibah 之外可同步规划永续慈善传承",
        ],
        defaultWhatsapp:
          "Haji Zulkarnain 与夫人您好！衷心祝贺贵公司创下业绩历史新高！🕌✨ 特意为您一家制作了这张专属祝贺卡。\n\n顺带分享：通过 PRUBSN WarisanPlus 指定 Hibah 受益人，可绕过漫长遗产冻结即刻注入免税流动现金，并享高达 400% 朝圣与意外保障，稳护公司资产。方便发一份 2 分钟简报给您参考吗？😊",
        defaultEmail:
          "主题：清真家族传承客观对比：PRUBSN WarisanPlus vs AIA Public Takaful (A-Life Legasi)\n\nHaji Zulkarnain 您好：\n针对您的企业与家族传承需求，以下是 PRUBSN WarisanPlus 相比 AIA A-Life Legasi 的 3 大客观条款优势：\n1. 免遗产冻结 Hibah 即刻直付：无需像友邦每年缴付 Vitality 会费打卡即可稳锁高额传承杠杆。\n2. 高达 400% 特定意外与朝圣保障：涵盖 Umrah/Hajj 及公共交通高额护盾。\n3. 兼顾 Faraid 家族和谐与 Wakaf 慈善传承：无需变卖公司资产即可清偿负债。\n\n下周与您和夫人喝杯 15 分钟咖啡一起对照利益表吧！",
      },
      yue: {
        shortLabel: "清真企業 Hibah 傳承",
        rivalBrand: "AIA Public Takaful",
        customerName: "Haji Zulkarnain & Aishah (46歲, 莎阿南企業主)",
        existingGap: "RM 900萬物業同公司股份聯名持有 • 缺乏免凍結即刻到賬嘅 Hibah 流動現金",
        lifeEvent: "Engineering Sdn Bhd 業績創新高；希望透過 Hibah 贈與避開 18 個月遺產凍結",
        pambPlan: "PRUBSN WarisanPlus + PRUBSN AnugerahPlus (Shariah Hibah)",
        aiaPlan: "AIA Public Takaful A-Life Legasi + A-Life Ikhtiar",
        customerReply:
          "「多謝晒張咁靚嘅賀卡！AIA Public Takaful 啱啱 quote 咗 A-Life Legasi，PRUBSN WarisanPlus 喺 Hibah 傳承上有咩優勢？」",
        cardHeadline: "恭賀 Engineering Sdn Bhd 業績長虹、家族福澤綿長！🌟",
        cardChips: [
          "恭賀 Engineering Sdn Bhd 業績長虹、家族福澤綿長！🌟",
          "願事業興旺、家族和諧傳承世代平安！🕌",
        ],
        aiaFacts: [
          "✓ 免 Vitality 會費穩享高額 Hibah 傳承：PRUBSN WarisanPlus 免遺產凍結即刻直付，唔使年年交會費打卡",
          "✓ 高達 400% 特定意外同朝聖保障（包埋 Umrah/Hajj 同公共交通）+ 罕見危疾保障",
          "✓ 內置 Wakaf 公益捐贈選項：守護屋企人 Hibah 同時規劃永續慈善傳承",
        ],
        defaultWhatsapp:
          "Haji Zulkarnain 同夫人你好！恭喜晒貴公司今年創下業績新高！🕌✨ 特登整咗呢張賀卡送俾你哋。\n\n順便提一提：透過 PRUBSN WarisanPlus 指定 Hibah 受益人，可以免卻漫長遺產凍結即刻注入現金，仲包高達 400% 朝聖同意外保障，保護公司股份唔使變賣。Send 份 2 分鐘懶人包俾你睇下好嗎？😊",
        defaultEmail:
          "主題：清真家族傳承客觀比較：PRUBSN WarisanPlus vs AIA Public Takaful (A-Life Legasi)\n\nHi Haji Zulkarnain：\n以下係 PRUBSN WarisanPlus 對比 AIA A-Life Legasi 嘅 3 個真實條款優勢：\n1. 免遺產凍結 Hibah 即刻直付：唔使好似 AIA Vitality 咁年年交會費打卡都可以鎖定高額傳承。\n2. 高達 400% 特定意外同朝聖保障：包埋 Umrah/Hajj 同公共交通高額保障。\n3. 守護 Faraid 家族和諧兼內置 Wakaf 慈善傳承。\n\n下個禮拜同你和夫人飲杯 15 分鐘咖啡一齊睇下張對比表啦！",
      },
      ms: {
        shortLabel: "Hibah Takaful & Pusaka",
        rivalBrand: "AIA Public Takaful",
        customerName: "Tuan Haji Zulkarnain & Puan Aishah (46, Shah Alam)",
        existingGap: "Aset perniagaan & hartanah RM 9J terikat nama bersama • Tiada tunai segera Hibah Takaful",
        lifeEvent: "Engineering Sdn Bhd mencatat rekod jualan tertinggi; mahu kecairan Hibah elak pembekuan pusaka 18 bulan",
        pambPlan: "PRUBSN WarisanPlus + PRUBSN AnugerahPlus (Shariah Hibah)",
        aiaPlan: "AIA Public Takaful A-Life Legasi + A-Life Ikhtiar",
        customerReply:
          "\"Alhamdulillah, terima kasih atas kad ini! AIA Public Takaful mencadangkan A-Life Legasi. Bagaimana PRUBSN WarisanPlus lebih baik untuk Hibah?\"",
        cardHeadline: "Tahniah & Mabruk atas Pencapaian Cemerlang Engineering Sdn Bhd! 🌟",
        cardChips: [
          "Tahniah & Mabruk atas Pencapaian Cemerlang Engineering Sdn Bhd! 🌟",
          "Semoga Terus Diberkati & Harmoni Sekeluarga! 🕌",
        ],
        aiaFacts: [
          "✓ Bayaran Hibah Bersyarat Segera Di Luar Pembekuan Pusaka tanpa perlu membayar yuran tahunan AIA Vitality",
          "✓ Perlindungan Kemalangan Sehingga 400% (termasuk semasa Umrah/Haji & pengangkutan awam) terbina dalam sijil",
          "✓ Pilihan Wakaf & Amal Jariah terbina bersama penamaan Hibah keluarga untuk pahala berpanjangan",
        ],
        defaultWhatsapp:
          "Assalamualaikum & Tahniah Tuan Haji Zulkarnain & Puan Aishah atas pencapaian cemerlang Engineering Sdn Bhd! 🕌✨ Saya reka kad khas ini untuk keluarga Tuan Haji.\n\nInfo ringkas: PRUBSN WarisanPlus menyuntik tunai segera Hibah patuh Syariah di luar pembekuan pusaka berserta perlindungan kemalangan sehingga 400% (termasuk Umrah/Haji) tanpa perlu menjual aset perniagaan. Boleh saya kongsikan ringkasan 2 minit? 😊",
        defaultEmail:
          "Subjek: Perbandingan Fakta Hibah & Legasi: PRUBSN WarisanPlus lwn AIA Public Takaful A-Life Legasi\n\nAssalamualaikum Tuan Haji Zulkarnain & Puan Aishah,\nBerikut ialah 3 kelebihan berfakta PRUBSN WarisanPlus berbanding AIA A-Life Legasi:\n1. Bayaran Hibah Segera Tanpa Pembekuan Pusaka: Kecairan pantas patuh Syariah tanpa yuran tahunan AIA Vitality.\n2. Perlindungan Kemalangan Sehingga 400%: Termasuk perlindungan semasa menunaikan Umrah/Haji & pengangkutan awam.\n3. Pilihan Wakaf & Keharmonian Faraid: Menyelesaikan liabiliti syarikat tanpa jualan paksa aset.\n\nJom minum kopi 15 minit bersama Puan Aishah minggu depan untuk semak jadual perbandingan!",
      },
      ta: {
        shortLabel: "தகாஃபுல் Hibah பாதுகாப்பு",
        rivalBrand: "AIA Public Takaful",
        customerName: "Tuan Haji Zulkarnain & Puan Aishah (46, Shah Alam)",
        existingGap: "RM 9M தொழில் & சொத்துக்கள் கூட்டுப் பெயரில் • உடனடி Hibah ரொக்கப் பாதுகாப்பு இல்லை",
        lifeEvent: "Engineering Sdn Bhd சாதனை வருவாய்; 18 மாத சொத்து முடக்கத்தைத் தவிர்க்க Shariah Hibah தேவை",
        pambPlan: "PRUBSN WarisanPlus + PRUBSN AnugerahPlus (Shariah Hibah)",
        aiaPlan: "AIA Public Takaful A-Life Legasi + A-Life Ikhtiar",
        customerReply:
          "\"வாழ்த்து அட்டைக்கு நன்றி! AIA Public Takaful எங்களுக்கு A-Life Legasi திட்டத்தை பரிந்துரைத்தது. Hibah பாதுகாப்பிற்கு PRUBSN WarisanPlus எவ்வாறு சிறந்தது?\"",
        cardHeadline: "Engineering Sdn Bhd சாதனை வெற்றிக்கு மனமார்ந்த வாழ்த்துகள்! 🌟",
        cardChips: [
          "Engineering Sdn Bhd சாதனை வெற்றிக்கு மனமார்ந்த வாழ்த்துகள்! 🌟",
          "குடும்ப ஒற்றுமையும் தொழில் வளமும் என்றென்றும் நிலைக்க வாழ்த்துகள்! 🕌",
        ],
        aiaFacts: [
          "✓ சொத்து முடக்கமின்றி உடனடி Hibah ரொக்கப் பட்டுவாடா (AIA Vitality வருடாந்திர கட்டணம் தேவையில்லை)",
          "✓ Umrah/Hajj மற்றும் பொதுப் போக்குவரத்து உட்பட 400% வரை விபத்து பாதுகாப்பு",
          "✓ குடும்ப Hibah உடன் இணைந்த Wakaf தர்ம நன்கொடை வசதி",
        ],
        defaultWhatsapp:
          "Tuan Haji Zulkarnain & Puan Aishah அவர்களுக்கு வணக்கம்! Engineering Sdn Bhd சாதனை வெற்றிக்கு வாழ்த்துகள்! 🕌✨ உங்கள் குடும்பத்திற்காக இந்த சிறப்பு அட்டையை உருவாக்கினேன்.\n\nPRUBSN WarisanPlus மூலம் சொத்து முடக்கமின்றி உடனடி Shariah Hibah ரொக்கப் பாதுகாப்பும் 400% வரை விபத்து காப்பீடும் பெறலாம். 2 நிமிட சுருக்கத்தை அனுப்பட்டுமா? 😊",
        defaultEmail:
          "பொருள்: Hibah ஒப்பீடு: PRUBSN WarisanPlus vs AIA Public Takaful A-Life Legasi\n\nவணக்கம் Tuan Haji Zulkarnain & Puan Aishah,\nAIA A-Life Legasi திட்டத்தை விட PRUBSN WarisanPlus சிறந்ததாக இருப்பதற்கான 3 காரணங்கள்:\n1. சொத்து முடக்கமின்றி உடனடி Hibah பட்டுவாடா (AIA Vitality கட்டணம் இல்லை).\n2. Umrah/Hajj உட்பட 400% வரை விபத்து பாதுகாப்பு.\n3. தொழில் சொத்துக்களை விற்காமல் பாதுகாக்கும் Faraid & Wakaf வசதி.\n\nஅடுத்த வாரம் 15 நிமிட சந்திப்பில் இரு அட்டவணைகளையும் ஒப்பிட்டுப் பார்ப்போம்!",
      },
    },
  },
];

// Curated 6 Malaysian Advisor Playbook Cases (3 Health-Led + 3 Family/Wealth Milestones)
// Interleaved across 12 unique Malaysian personas per case = 72 evenly distributed seats (0..71)
const C3_CURATED_6_SEATS = [0, 1, 2, 3, 4, 5];

const C3_CURATED_6_META = [
  {
    slot: 0,
    id: "newborn_baby",
    icon: "🍼",
    clientName: "Tan Wei Ming & Chloe",
    labels: {
      en: "Newborn Baby",
      "zh-CN": "喜迎新生宝宝",
      yue: "喜迎初生 BB",
      ms: "Kelahiran Bayi Baharu",
      ta: "புதிய குழந்தை பிறப்பு",
    },
  },
  {
    slot: 1,
    id: "ci_health_scare",
    icon: "⚡",
    clientName: "Jason Khoo",
    labels: {
      en: "40th Birthday & Health Upgrade",
      "zh-CN": "40岁生日与高端医疗升级",
      yue: "40歲生日與高端醫療升級",
      ms: "Ulang Tahun Ke-40 & Medikal Premier",
      ta: "40-வது பிறந்தநாள் & மருத்துவ மேம்பாடு",
    },
  },
  {
    slot: 2,
    id: "career_promotion",
    icon: "🌟",
    clientName: "Dr. Kavitha Pillai",
    labels: {
      en: "Executive Promotion",
      "zh-CN": "高管晋升加薪",
      yue: "高管升職加薪",
      ms: "Kenaikan Pangkat",
      ta: "உயர் பதவி உயர்வு",
    },
  },
  {
    slot: 3,
    id: "uni_retirement_50",
    icon: "🎓",
    clientName: "Vincent Ong & Elaine Khor",
    labels: {
      en: "Turning 50 & Uni Offer",
      "zh-CN": "50岁与名校录取",
      yue: "50歲兼名校錄取",
      ms: "Umur 50 & Universiti",
      ta: "50வது பிறந்தநாள் & பல்கலைக்கழக அனுமதி",
    },
  },
  {
    slot: 4,
    id: "new_home_mortgage",
    icon: "🏡",
    clientName: "Amirul Hakim & Farah Nadia",
    labels: {
      en: "New Dream Home Keys",
      "zh-CN": "喜提理想新居",
      yue: "喜提夢想新居",
      ms: "Kunci Rumah Impian",
      ta: "புதிய RM 1.3M வீட்டுக் கடன்",
    },
  },
  {
    slot: 5,
    id: "takaful_hibah_estate",
    icon: "🕌",
    clientName: "Tuan Haji Zulkarnain & Puan Aishah",
    labels: {
      en: "Record Year & Takaful Hibah",
      "zh-CN": "企业佳绩与 Hibah 传承",
      yue: "企業佳績與 Hibah 傳承",
      ms: "Hibah Takaful & Pusaka",
      ta: "தகாஃபுல் Hibah சொத்து பாதுகாப்பு",
    },
  },
];

function _pickAssignedScenarioIdx(agentId) {
  if (!agentId) return 0;
  let hash = 0;
  for (let i = 0; i < agentId.length; i++) {
    hash = (hash * 31 + agentId.charCodeAt(i)) % 997;
  }
  return hash;
}

function _summarizeFactClause(rawFact) {
  const clean = String(rawFact || "").replace(/^✓\s*/, "").trim();
  const colonIdx = clean.indexOf(":");
  const fullColonIdx = clean.indexOf("：");
  const splitAt =
    colonIdx > 8 && colonIdx <= 66
      ? colonIdx
      : fullColonIdx > 4 && fullColonIdx <= 36
      ? fullColonIdx
      : -1;
  if (splitAt > 0) {
    return {
      summary: clean.slice(0, splitAt).trim(),
      detail: clean.slice(splitAt + 1).trim(),
      full: clean,
    };
  }
  const parenIdx = clean.search(/\s*[\(（]/);
  if (parenIdx > 10 && parenIdx <= 66) {
    return {
      summary: clean.slice(0, parenIdx).trim(),
      detail: clean.slice(parenIdx).trim(),
      full: clean,
    };
  }
  if (clean.length <= 65) {
    return { summary: clean, detail: "", full: clean };
  }
  const cut = clean.slice(0, 62).replace(/\s+\S*$/, "");
  return {
    summary: `${cut || clean.slice(0, 62)}…`,
    detail: clean,
    full: clean,
  };
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
  existingSubmission,
  existingScore,
  isCompleted,
  fetchArenaState,
  onSandboxPreview,
}) {
  const { useState, useEffect, useRef } = React;

  const normLang = lang === "zh-TW" ? "yue" : lang || "en";
  const ui = C3_PLAYBOOK_UI[normLang] || C3_PLAYBOOK_UI.en;
  const storageKey = `prumda_c3_v9_${agentId || "guest"}`;

  // Load persisted mobile draft state so phone lock / refresh / tab switch never loses work
  const [savedInit] = useState(() => {
    try {
      const raw = localStorage.getItem(storageKey);
      return raw ? JSON.parse(raw) : {};
    } catch (e) {
      return {};
    }
  });

  const [seatOverride, setSeatOverride] = useState(() =>
    typeof savedInit.seatOverride === "number" && savedInit.seatOverride >= 0
      ? savedInit.seatOverride
      : null
  );

  const seatToFallbackIdx = (targetSeat) => {
    const slot =
      typeof targetSeat === "number" && targetSeat >= 0
        ? targetSeat % C3_CURATED_6_SEATS.length
        : _pickAssignedScenarioIdx(agentId) % C3_CURATED_6_SEATS.length;
    const meta = C3_CURATED_6_META[slot];
    if (meta) {
      const foundIdx = PAMB_C3_SCENARIOS.findIndex((s) => s.id === meta.id);
      if (foundIdx >= 0) return foundIdx;
    }
    return 0;
  };

  const [scenarioIdx, setScenarioIdx] = useState(() =>
    seatToFallbackIdx(savedInit.seatOverride ?? null)
  );
  const [serverScenario, setServerScenario] = useState(null);
  const [showCasePicker, setShowCasePicker] = useState(false);
  const [confirmArmedSlot, setConfirmArmedSlot] = useState(null);

  const rawFallbackSc = PAMB_C3_SCENARIOS[scenarioIdx % PAMB_C3_SCENARIOS.length] || PAMB_C3_SCENARIOS[0];
  const fallbackSc = _getLocalizedScenario(rawFallbackSc, normLang);
  const sc = serverScenario || fallbackSc;

  const effectiveSeat =
    typeof sc.seatIndex === "number"
      ? sc.seatIndex
      : typeof seatOverride === "number"
      ? seatOverride
      : _pickAssignedScenarioIdx(agentId) % C3_CURATED_6_SEATS.length;
  const matchedMetaSlot = C3_CURATED_6_META.findIndex((m) => m.id === sc.id);
  const activeSlot =
    typeof sc.seatIndex === "number" || typeof seatOverride === "number"
      ? ((effectiveSeat % C3_CURATED_6_SEATS.length) + C3_CURATED_6_SEATS.length) %
        C3_CURATED_6_SEATS.length
      : matchedMetaSlot >= 0
      ? matchedMetaSlot
      : 0;
  const activeCaseMeta = C3_CURATED_6_META[activeSlot] || C3_CURATED_6_META[0];

  const fallbackPb =
    (C3_ADVISOR_PLAYBOOK[sc.id] &&
      (C3_ADVISOR_PLAYBOOK[sc.id][normLang] || C3_ADVISOR_PLAYBOOK[sc.id].en)) ||
    C3_ADVISOR_PLAYBOOK.newborn_baby.en;
  const pb = {
    cardHints: (sc.cardHints && sc.cardHints.length ? sc.cardHints : fallbackPb.cardHints) || [],
    waIdeas: (sc.waIdeas && sc.waIdeas.length ? sc.waIdeas : fallbackPb.waIdeas) || [],
    waHints: (sc.waHints && sc.waHints.length ? sc.waHints : fallbackPb.waHints) || [],
    closeHints: (sc.closeHints && sc.closeHints.length ? sc.closeHints : fallbackPb.closeHints) || [],
  };

  // Dynamic rival insurer label (AIA Malaysia, AIA Public Takaful, Great Eastern Malaysia)
  const rivalRaw = String(sc.rivalBrand || "AIA Malaysia");
  const rivalShort = rivalRaw.includes("Great Eastern")
    ? normLang === "zh-CN"
      ? "大东方 (GE)"
      : normLang === "yue"
      ? "大東方 (GE)"
      : "Great Eastern"
    : rivalRaw.includes("Takaful")
    ? "AIA Takaful"
    : "AIA";

  const adaptRivalLabel = (str) => {
    if (!str || rivalShort === "AIA") return str;
    return str
      .replace(/友邦\s*\(AIA\)/g, rivalShort)
      .replace(/\bAIA\b/g, rivalShort);
  };

  const initialWaAlreadySent = Boolean(
    savedInit.waSent === true || existingSubmission
  );
  const [step, setStep] = useState(() => {
    const s = savedInit.step || 1;
    return s === 3 && !initialWaAlreadySent ? 2 : s;
  });
  const [waSent, setWaSent] = useState(() => initialWaAlreadySent);
  const [waReplyArrived, setWaReplyArrived] = useState(() =>
    Boolean((savedInit.waSent === true && savedInit.waReplyArrived) || existingSubmission)
  );
  const [waSendPhase, setWaSendPhase] = useState("idle"); // "idle" | "sending" | "typing"
  const [showSentWaPreview, setShowSentWaPreview] = useState(false);
  const waTimerRef = useRef([]);

  const clearWaTimers = () => {
    (waTimerRef.current || []).forEach((tid) => clearTimeout(tid));
    waTimerRef.current = [];
  };

  useEffect(() => () => clearWaTimers(), []);
  const [isBusy, setIsBusy] = useState(false);
  const [cardStageIdx, setCardStageIdx] = useState(0);
  const [langChangedBanner, setLangChangedBanner] = useState(false);
  const [copyToast, setCopyToast] = useState("");

  // Step 1 State
  const [cardStyleId, setCardStyleId] = useState(() => savedInit.cardStyleId || "watercolor");
  const [selectedHeadlineIdx, setSelectedHeadlineIdx] = useState(() => savedInit.selectedHeadlineIdx || 0);
  const [cardPersonalNote, setCardPersonalNote] = useState(() => savedInit.cardPersonalNote || "");
  const [cardUrl, setCardUrl] = useState(() => savedInit.cardUrl || existingSubmission?.imageAfter || null);
  const [showStep1Pickers, setShowStep1Pickers] = useState(
    () => !(savedInit.cardUrl || existingSubmission?.imageAfter)
  );
  const [showCardTouch, setShowCardTouch] = useState(() => Boolean((savedInit.cardPersonalNote || "").trim()));

  // Step 2 State
  const [openingToneId, setOpeningToneId] = useState(() => savedInit.openingToneId || "warm_zero_push");
  const [selectedWaIdeaIdxs, setSelectedWaIdeaIdxs] = useState(() =>
    Array.isArray(savedInit.selectedWaIdeaIdxs) ? savedInit.selectedWaIdeaIdxs : [0, 1]
  );
  const [waPersonalNote, setWaPersonalNote] = useState(() => savedInit.waPersonalNote || "");
  const [whatsappText, setWhatsappText] = useState(
    () => savedInit.whatsappText || existingSubmission?.whatsappMessage || ""
  );
  const [showStep2Pickers, setShowStep2Pickers] = useState(
    () => !(savedInit.whatsappText || existingSubmission?.whatsappMessage)
  );
  const [showWaTouch, setShowWaTouch] = useState(() => Boolean((savedInit.waPersonalNote || "").trim()));

  // Step 3 State
  const [selectedFactIdxs, setSelectedFactIdxs] = useState(() =>
    Array.isArray(savedInit.selectedFactIdxs) ? savedInit.selectedFactIdxs : [0, 1, 2]
  );
  const [advisoryStyleId, setAdvisoryStyleId] = useState(() => savedInit.advisoryStyleId || "respectful");
  const [emailPersonalNote, setEmailPersonalNote] = useState(() => savedInit.emailPersonalNote || "");
  const [emailText, setEmailText] = useState(
    () => savedInit.emailText || existingSubmission?.aiaComparisonEmail || ""
  );
  const [showStep3Pickers, setShowStep3Pickers] = useState(
    () => !(savedInit.emailText || existingSubmission?.aiaComparisonEmail)
  );
  const [showEmailTouch, setShowEmailTouch] = useState(() => Boolean((savedInit.emailPersonalNote || "").trim()));
  const [expandedFactIdxs, setExpandedFactIdxs] = useState([]);

  // Collapsible Brief Card & Post-Submit Tab State
  const [showCaseBrief, setShowCaseBrief] = useState(
    () => (savedInit.step || 1) === 1 && !(savedInit.cardUrl || existingSubmission?.imageAfter)
  );
  const [postSubmitTab, setPostSubmitTab] = useState("whatsapp");

  // Per-Step Collapsed-by-Default R.C.T.F.C. Drawer + Live Editable Prompt State (0/5 default on every step!)
  const [openRctfcStep, setOpenRctfcStep] = useState({ 1: false, 2: false, 3: false });
  const [c3RctfcMap, setC3RctfcMap] = useState({ 1: {}, 2: {}, 3: {} });
  const [step1PromptText, setStep1PromptText] = useState("");
  const [step2PromptText, setStep2PromptText] = useState("");
  const [step3PromptText, setStep3PromptText] = useState("");

  // Final Submit State (restored from server submission or localStorage if already completed)
  const [submitted, setSubmitted] = useState(() => Boolean(isCompleted && existingSubmission));
  const [submittedData, setSubmittedData] = useState(() => {
    if (existingSubmission) {
      return {
        total: existingScore?.total || existingSubmission.total || 92,
        speed: existingScore?.speed || 94,
        accuracy: existingScore?.accuracy || existingSubmission.total || 90,
        timeSec: existingScore?.timeSec || existingSubmission.timeSec || 25,
        cardUrl: existingSubmission.imageAfter || null,
        whatsappText: existingSubmission.whatsappMessage || "",
        emailText: existingSubmission.aiaComparisonEmail || "",
        personalTouch: existingSubmission.personalTouch || "",
        pillarScores: existingScore?.criteria || existingSubmission.pillarScores || {},
        judgeFeedback: existingScore?.judgeFeedback || existingSubmission.judgeFeedback || "",
      };
    }
    return savedInit.submittedData || null;
  });
  const [startTime] = useState(() => savedInit.startTime || Date.now());

  // Sync if existingSubmission arrives asynchronously from /api/state poll
  useEffect(() => {
    if (isCompleted && existingSubmission && !submittedData) {
      setSubmittedData({
        total: existingScore?.total || existingSubmission.total || 92,
        speed: existingScore?.speed || 94,
        accuracy: existingScore?.accuracy || existingSubmission.total || 90,
        timeSec: existingScore?.timeSec || existingSubmission.timeSec || 25,
        cardUrl: existingSubmission.imageAfter || cardUrl || null,
        whatsappText: existingSubmission.whatsappMessage || whatsappText || "",
        emailText: existingSubmission.aiaComparisonEmail || emailText || "",
        personalTouch: existingSubmission.personalTouch || "",
        pillarScores: existingScore?.criteria || existingSubmission.pillarScores || {},
        judgeFeedback: existingScore?.judgeFeedback || existingSubmission.judgeFeedback || "",
      });
      setSubmitted(true);
    }
  }, [isCompleted, existingSubmission]);

  // Persist working draft to localStorage (safe against QuotaExceededError)
  useEffect(() => {
    try {
      const safeCardUrl =
        typeof cardUrl === "string" && cardUrl.length < 32000 ? cardUrl : null;
      localStorage.setItem(
        storageKey,
        JSON.stringify({
          scenarioIdx,
          seatOverride,
          step,
          cardStyleId,
          selectedHeadlineIdx,
          cardPersonalNote,
          cardUrl: safeCardUrl,
          openingToneId,
          selectedWaIdeaIdxs,
          waPersonalNote,
          whatsappText,
          waSent,
          waReplyArrived,
          selectedFactIdxs,
          advisoryStyleId,
          emailPersonalNote,
          emailText,
          startTime,
        })
      );
    } catch (e) {}
  }, [
    storageKey,
    scenarioIdx,
    seatOverride,
    step,
    cardStyleId,
    selectedHeadlineIdx,
    cardPersonalNote,
    cardUrl,
    openingToneId,
    selectedWaIdeaIdxs,
    waPersonalNote,
    whatsappText,
    waSent,
    waReplyArrived,
    selectedFactIdxs,
    advisoryStyleId,
    emailPersonalNote,
    emailText,
    startTime,
  ]);

  // Fetch assigned curated seat scenario from backend
  useEffect(() => {
    let active = true;
    const qs = new URLSearchParams({
      id: agentId || "guest",
      lang: normLang,
    });
    if (seatOverride !== null && seatOverride !== undefined) {
      qs.set("seat", String(seatOverride));
      qs.set("persist", "1");
    }
    fetch(`/api/c3/scenario?${qs.toString()}`)
      .then((r) => r.json())
      .then((data) => {
        if (!active || !data || !data.scenario) return;
        setServerScenario(data.scenario);
      })
      .catch(() => {});
    return () => {
      active = false;
    };
  }, [agentId, normLang, seatOverride]);

  // Auto-collapse Client Brief Card whenever cardUrl is generated OR user moves to Step 2 / Step 3
  useEffect(() => {
    if (step === 2 || step === 3 || Boolean(cardUrl)) {
      setShowCaseBrief(false);
    }
  }, [step, cardUrl]);

  // Preserve user's drafted messages on language toggle instead of wiping them silently
  const prevLangRef = useRef(normLang);
  useEffect(() => {
    if (prevLangRef.current !== normLang) {
      prevLangRef.current = normLang;
      if (whatsappText.trim() || emailText.trim()) {
        setLangChangedBanner(true);
      }
    }
  }, [normLang]);

  // Animated 3-stage progress bar while Step 1 Greeting Card renders
  useEffect(() => {
    if (!isBusy || step !== 1) {
      setCardStageIdx(0);
      return;
    }
    const t1 = setTimeout(() => setCardStageIdx(1), 2200);
    const t2 = setTimeout(() => setCardStageIdx(2), 4800);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [isBusy, step]);

  useEffect(() => {
    const stepLabels = {
      1: "Step 1/3: Designing Door-Opener Greeting Card",
      2: "Step 2/3: Crafting First-Touch WhatsApp",
      3: `Step 3/3: Answering Client's ${rivalShort} Comparison Reply`,
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
  }, [step, sc.shortLabel, lang]);

  const resetDraftsForNewCase = () => {
    clearWaTimers();
    setSelectedHeadlineIdx(0);
    setCardPersonalNote("");
    setCardUrl(null);
    setShowStep1Pickers(true);
    setShowCardTouch(false);
    setSelectedWaIdeaIdxs([0, 1]);
    setWaPersonalNote("");
    setWhatsappText("");
    setWaSent(false);
    setWaReplyArrived(false);
    setWaSendPhase("idle");
    setShowSentWaPreview(false);
    setShowStep2Pickers(true);
    setShowWaTouch(false);
    setSelectedFactIdxs([0, 1, 2]);
    setEmailPersonalNote("");
    setEmailText("");
    setShowStep3Pickers(true);
    setShowEmailTouch(false);
    setExpandedFactIdxs([]);
    setShowCaseBrief(true);
    setLangChangedBanner(false);
    setOpenRctfcStep({ 1: false, 2: false, 3: false });
    setC3RctfcMap({ 1: {}, 2: {}, 3: {} });
    setStep(1);
  };

  const executeSelectCaseSlot = (targetSlot) => {
    const k =
      ((Number(targetSlot) || 0) % C3_CURATED_6_SEATS.length +
        C3_CURATED_6_SEATS.length) %
      C3_CURATED_6_SEATS.length;
    const baseSeat =
      typeof sc.seatIndex === "number"
        ? sc.seatIndex
        : typeof seatOverride === "number"
        ? seatOverride
        : 0;
    const curRound = Math.floor(baseSeat / C3_CURATED_6_SEATS.length);
    const nextSeat = curRound * C3_CURATED_6_SEATS.length + k;
    setConfirmArmedSlot(null);
    setSeatOverride(nextSeat);
    setScenarioIdx(seatToFallbackIdx(nextSeat));
    setShowCasePicker(false);
    resetDraftsForNewCase();
  };

  const handleSelectCaseSlot = (targetSlot) => {
    const k =
      ((Number(targetSlot) || 0) % C3_CURATED_6_SEATS.length +
        C3_CURATED_6_SEATS.length) %
      C3_CURATED_6_SEATS.length;
    if (k === activeSlot) {
      setConfirmArmedSlot(null);
      setShowCasePicker(false);
      return;
    }
    const hasProgress = Boolean(cardUrl || whatsappText.trim() || emailText.trim());
    if (hasProgress && confirmArmedSlot !== k) {
      setConfirmArmedSlot(k);
      return;
    }
    executeSelectCaseSlot(k);
  };

  const handleMockSendWhatsapp = () => {
    if (!whatsappText.trim() || waSendPhase === "sending") return;
    clearWaTimers();
    setWaSendPhase("sending");
    fetch("/api/activity", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: agentId,
        challenge: 3,
        language: lang,
        region: agentRegion,
        status: `📲 C3 (${sc.shortLabel}): Sent First-Touch WhatsApp — awaiting client reply`,
        agenticStep: "Step 2/3: Mock WhatsApp Sent",
      }),
    }).catch(() => {});

    const tDeliver = setTimeout(() => {
      setWaSent(true);
      setWaReplyArrived(false);
      setShowSentWaPreview(false);
      setWaSendPhase("typing");
      setStep(3);
      try {
        window.scrollTo({ top: 0, behavior: "smooth" });
      } catch (e) {}

      const tReply = setTimeout(() => {
        setWaReplyArrived(true);
        setWaSendPhase("idle");
      }, 550);
      waTimerRef.current.push(tReply);
    }, 420);
    waTimerRef.current.push(tDeliver);
  };

  const activeHeadline =
    (sc.cardChips && sc.cardChips[selectedHeadlineIdx]) || sc.cardHeadline;
  const activeStyleObj =
    ui.visualStyles.find((s) => s.id === cardStyleId) || ui.visualStyles[0];
  const activeOpeningObj =
    ui.openingTones.find((o) => o.id === openingToneId) || ui.openingTones[0];
  const activeAdvisoryObj =
    ui.advisoryStyles.find((a) => a.id === advisoryStyleId) || ui.advisoryStyles[0];
  const clientShortName = (sc.customerName || activeCaseMeta.clientName || "").split("(")[0].trim();
  const clientShortTitle =
    sc.shortLabel || activeCaseMeta.labels[normLang] || activeCaseMeta.labels.en;

  const C3_RCTFC_KEYS = ["role", "context", "task", "format", "constraints"];
  const C3_KEY_TO_TAG = {
    role: "Role",
    context: "Context",
    task: "Task",
    format: "Format",
    constraints: "Constraints",
  };

  const getStepRctfcDefs = (stepNum) => {
    const planLead = String(sc.pambPlan || "PRU Plan").split("+")[0].trim();
    if (stepNum === 1) {
      if (normLang === "zh-CN") {
        return {
          role: `[Role]: 资深 PRUMDA 家族财富顾问。`,
          context: `[Context]: 祝贺 ${clientShortName} 迎来「${clientShortTitle}」喜悦时刻。`,
          task: `[Task]: 设计一张温馨高雅的专属里程碑祝贺卡。`,
          format: `[Format]: 16:9 精致插画构图，主标题字体清晰醒目。`,
          constraints: `[Constraints]: 纯粹真挚祝贺氛围，贺卡画面零推销感。`,
        };
      }
      if (normLang === "yue") {
        return {
          role: `[Role]: 資深 PRUMDA 家族財富顧問。`,
          context: `[Context]: 祝賀 ${clientShortName} 迎接「${clientShortTitle}」喜悅時刻。`,
          task: `[Task]: 設計一張窩心高雅嘅專屬里程碑祝賀卡。`,
          format: `[Format]: 16:9 精緻插畫構圖，主標題字體清晰醒目。`,
          constraints: `[Constraints]: 純粹真摯祝賀氣氛，賀卡畫面零 Hard Sell。`,
        };
      }
      if (normLang === "ms") {
        return {
          role: `[Role]: Perunding Kekayaan Keluarga Utama PRUMDA.`,
          context: `[Context]: Meraikan detik ${clientShortTitle} buat ${clientShortName}.`,
          task: `[Task]: Reka kad ucapan pencapaian eksekutif yang mesra.`,
          format: `[Format]: Ilustrasi kad mewah bersih dengan tipografi tajuk jelas.`,
          constraints: `[Constraints]: Suasana meraikan yang ikhlas tanpa unsur jualan pada kad.`,
        };
      }
      if (normLang === "ta") {
        return {
          role: `[Role]: முதன்மை PRUMDA குடும்பச் செல்வ ஆலோசகர்.`,
          context: `[Context]: ${clientShortName}-ன் ${clientShortTitle} நிகழ்வைக் கொண்டாடுதல்.`,
          task: `[Task]: அன்பான சிறப்பு வாழ்த்து அட்டையை வடிவமைக்கவும்.`,
          format: `[Format]: தெளிவான தலைப்புடன் கூடிய அழகிய வாழ்த்து அட்டை ஓவியம்.`,
          constraints: `[Constraints]: அன்பான கொண்டாட்ட உணர்வு, விற்பனை அழுத்தம் இல்லை.`,
        };
      }
      return {
        role: `[Role]: Premier PRUMDA Family Wealth Advisor.`,
        context: `[Context]: Celebrating ${clientShortName}'s ${clientShortTitle}.`,
        task: `[Task]: Design a warm executive milestone greeting card.`,
        format: `[Format]: Clean luxury card illustration with clear headline typography.`,
        constraints: `[Constraints]: Warm celebratory mood, zero sales pitch on card.`,
      };
    }

    if (stepNum === 2) {
      if (normLang === "zh-CN") {
        return {
          role: `[Role]: 值得信赖的 PRUMDA 家庭顾问，向 ${clientShortName} 发送问候。`,
          context: `[Context]: 附上「${clientShortTitle}」专属祝贺卡并跟进关怀。`,
          task: `[Task]: 撰写温暖的首条破冰 WhatsApp，自然带出所选财富亮点。`,
          format: `[Format]: 简短 3 句手机易读 WhatsApp 信息，配自然表情符号。`,
          constraints: `[Constraints]: 零硬性推销；以轻松 2 分钟简报邀约收尾。`,
        };
      }
      if (normLang === "yue") {
        return {
          role: `[Role]: 值得信賴嘅 PRUMDA 家庭顧問，WhatsApp 問候 ${clientShortName}。`,
          context: `[Context]: 連埋「${clientShortTitle}」專屬賀卡跟進問候。`,
          task: `[Task]: 寫一條窩心首條破冰 WhatsApp，自然帶出所選財富亮點。`,
          format: `[Format]: 簡短 3 句手機易睇 WhatsApp 信息，配自然 Emoji。`,
          constraints: `[Constraints]: 零 Hard Sell；以輕鬆 2 分鐘懶人包邀約收尾。`,
        };
      }
      if (normLang === "ms") {
        return {
          role: `[Role]: Perunding Keluarga PRUMDA yang dipercayai menyapa ${clientShortName}.`,
          context: `[Context]: Susulan mesra bersama kad ucapan ${clientShortTitle}.`,
          task: `[Task]: Rangka WhatsApp pertama yang mesra dengan idea kekayaan terpilih.`,
          format: `[Format]: Mesej WhatsApp mudah alih 3 ayat ringkas dengan emoji semula jadi.`,
          constraints: `[Constraints]: Tiada desakan jualan; akhiri dengan tawaran ringkasan 2 minit.`,
        };
      }
      if (normLang === "ta") {
        return {
          role: `[Role]: ${clientShortName}-க்கு செய்தி அனுப்பும் நம்பகமான PRUMDA ஆலோசகர்.`,
          context: `[Context]: ${clientShortTitle} வாழ்த்து அட்டையுடன் அன்பான தொடர்ச்சி.`,
          task: `[Task]: தேர்ந்தெடுத்த செல்வக் கருத்துக்களுடன் முதல் WhatsApp செய்தி.`,
          format: `[Format]: இயல்பான எமோஜிகளுடன் சுருக்கமான 3-வாக்கிய WhatsApp செய்தி.`,
          constraints: `[Constraints]: விற்பனை அழுத்தம் வேண்டாம்; 2-நிமிட சுருக்க அழைப்புடன் முடிக்கவும்.`,
        };
      }
      return {
        role: `[Role]: Trusted PRUMDA Family Advisor texting ${clientShortName}.`,
        context: `[Context]: Following up on ${clientShortTitle} greeting card.`,
        task: `[Task]: Draft a warm first-touch WhatsApp planting selected wealth ideas.`,
        format: `[Format]: Short 3-sentence mobile WhatsApp message with natural emojis.`,
        constraints: `[Constraints]: Zero hard-selling; end with an easy 2-min summary offer.`,
      };
    }

    // Step 3
    if (normLang === "zh-CN") {
      return {
        role: `[Role]: 资深 MDRT 专家顾问，为 ${clientShortName} 客观解答。`,
        context: `[Context]: 客户对比 ${planLead} 与 ${rivalShort} 报价。`,
        task: `[Task]: 仅基于所选 PRU 条款优势撰写客观对比回复。`,
        format: `[Format]: 温和共情开场 + 清晰要点对比 + 轻松面谈邀约。`,
        constraints: `[Constraints]: 尊重同业 ${rivalShort}；严格遵循国家银行 (BNM) 公平待客规范。`,
      };
    }
    if (normLang === "yue") {
      return {
        role: `[Role]: 資深 MDRT 專家顧問，為 ${clientShortName} 客觀解答。`,
        context: `[Context]: 客戶比較緊 ${planLead} 同 ${rivalShort} 報價。`,
        task: `[Task]: 淨係根據所選 PRU 條款優勢寫客觀對比回覆。`,
        format: `[Format]: 窩心共情開場 + 清晰重點對比 + 輕鬆約見收尾。`,
        constraints: `[Constraints]: 大方尊重 ${rivalShort}；嚴格遵守 BNM 公平待客規範。`,
      };
    }
    if (normLang === "ms") {
      return {
        role: `[Role]: Pakar Kanan MDRT menasihati ${clientShortName}.`,
        context: `[Context]: Pelanggan membandingkan ${planLead} dengan sebut harga ${rivalShort}.`,
        task: `[Task]: Tulis balasan perbandingan berfakta menggunakan kelebihan PRU terpilih sahaja.`,
        format: `[Format]: Pembukaan mesra + poin perbandingan padat + penutup temujanji santai.`,
        constraints: `[Constraints]: Hormati ${rivalShort}; patuhi garis panduan layanan adil BNM.`,
      };
    }
    if (normLang === "ta") {
      return {
        role: `[Role]: ${clientShortName}-க்கு ஆலோசனை வழங்கும் மூத்த MDRT நிபுணர்.`,
        context: `[Context]: ${planLead} மற்றும் ${rivalShort} திட்டங்களை வாடிக்கையாளர் ஒப்பிடுகிறார்.`,
        task: `[Task]: தேர்ந்தெடுக்கப்பட்ட PRU நன்மைகளை மட்டும் கொண்டு உண்மை ஒப்பீடு எழுதுக.`,
        format: `[Format]: அன்பான தொடக்கம் + தெளிவான ஒப்பீட்டுப் புள்ளிகள் + எளிய சந்திப்பு அழைப்பு.`,
        constraints: `[Constraints]: ${rivalShort}-ஐ மதிக்கவும்; BNM விதிமுறைகளுக்கு உட்பட்டது.`,
      };
    }
    return {
      role: `[Role]: Senior MDRT Specialist advising ${clientShortName}.`,
      context: `[Context]: Client compared ${planLead} against ${rivalShort} quote.`,
      task: `[Task]: Write a factual comparison reply using only selected PRU advantages.`,
      format: `[Format]: Warm opening + crisp bullet comparison + low-pressure meeting close.`,
      constraints: `[Constraints]: Respectful toward ${rivalShort}; BNM fair-dealing compliant.`,
    };
  };

  const buildStepBaseLine = (stepNum) => {
    if (stepNum === 1) {
      return (
        `Style: ${activeStyleObj.label} | Headline: "${activeHeadline}"` +
        (cardPersonalNote.trim() ? ` | Touch: ${cardPersonalNote.trim()}` : "")
      );
    }
    if (stepNum === 2) {
      const chosenIdeaLabels = (pb.waIdeas || [])
        .filter((_, idx) => selectedWaIdeaIdxs.includes(idx))
        .map((item) => String(item.label || "").replace(/^[^\w\u4e00-\u9fff\u0b80-\u0bff]+/, "").trim());
      return (
        `Tone: ${activeOpeningObj.label} | Ideas: ${chosenIdeaLabels.join(", ") || "Warm check-in"}` +
        (waPersonalNote.trim() ? ` | Touch: ${waPersonalNote.trim()}` : "")
      );
    }
    const chosenFactSummaries = (sc.aiaFacts || [])
      .filter((_, idx) => selectedFactIdxs.includes(idx))
      .map((f) => _summarizeFactClause(f).summary);
    return (
      `Tone: ${activeAdvisoryObj.label} | PRU Advantages: ${chosenFactSummaries.join("; ") || "Select advantages"}` +
      (emailPersonalNote.trim() ? ` | Closer: ${emailPersonalNote.trim()}` : "")
    );
  };

  const composeStepPrompt = (stepNum, rctfcForStep) => {
    const baseLine = buildStepBaseLine(stepNum);
    const defs = getStepRctfcDefs(stepNum);
    const activeLines = C3_RCTFC_KEYS.filter((k) => rctfcForStep && rctfcForStep[k]).map(
      (k) => defs[k]
    );
    return [baseLine, ...activeLines].filter(Boolean).join("\n");
  };

  // Keep per-step live prompts synced whenever pills, notes, scenario, language, or R.C.T.F.C. toggles change
  useEffect(() => {
    setStep1PromptText(composeStepPrompt(1, c3RctfcMap[1] || {}));
  }, [
    cardStyleId,
    selectedHeadlineIdx,
    cardPersonalNote,
    sc.id,
    sc.seatIndex,
    normLang,
    c3RctfcMap[1],
  ]);

  useEffect(() => {
    setStep2PromptText(composeStepPrompt(2, c3RctfcMap[2] || {}));
  }, [
    openingToneId,
    selectedWaIdeaIdxs,
    waPersonalNote,
    sc.id,
    sc.seatIndex,
    normLang,
    c3RctfcMap[2],
  ]);

  useEffect(() => {
    setStep3PromptText(composeStepPrompt(3, c3RctfcMap[3] || {}));
  }, [
    advisoryStyleId,
    selectedFactIdxs,
    emailPersonalNote,
    sc.id,
    sc.seatIndex,
    normLang,
    c3RctfcMap[3],
  ]);

  const getStepPromptState = (stepNum) => {
    if (stepNum === 1) return [step1PromptText, setStep1PromptText];
    if (stepNum === 2) return [step2PromptText, setStep2PromptText];
    return [step3PromptText, setStep3PromptText];
  };

  const handleToggleStepRctfcPillar = (stepNum, key) => {
    const curStepMap = (c3RctfcMap && c3RctfcMap[stepNum]) || {};
    const nextVal = !curStepMap[key];
    const nextStepMap = { ...curStepMap };
    if (nextVal) {
      nextStepMap[key] = true;
    } else {
      delete nextStepMap[key];
    }
    setC3RctfcMap((prev) => ({ ...prev, [stepNum]: nextStepMap }));
    const [, setPromptFn] = getStepPromptState(stepNum);
    setPromptFn(composeStepPrompt(stepNum, nextStepMap));
  };

  const handleActivateAllStepRctfc = (stepNum) => {
    const allMap = { role: true, context: true, task: true, format: true, constraints: true };
    setC3RctfcMap((prev) => ({ ...prev, [stepNum]: allMap }));
    const [, setPromptFn] = getStepPromptState(stepNum);
    setPromptFn(composeStepPrompt(stepNum, allMap));
  };

  const handleClearAllStepRctfc = (stepNum) => {
    setC3RctfcMap((prev) => ({ ...prev, [stepNum]: {} }));
    const [, setPromptFn] = getStepPromptState(stepNum);
    setPromptFn(composeStepPrompt(stepNum, {}));
  };

  const handleResetStepPrompt = (stepNum) => {
    setC3RctfcMap((prev) => ({ ...prev, [stepNum]: {} }));
    const [, setPromptFn] = getStepPromptState(stepNum);
    setPromptFn(composeStepPrompt(stepNum, {}));
  };

  const handleClearStepPrompt = (stepNum) => {
    setC3RctfcMap((prev) => ({ ...prev, [stepNum]: {} }));
    const [, setPromptFn] = getStepPromptState(stepNum);
    setPromptFn("");
  };

  const handleManualStepPromptEdit = (stepNum, rawVal) => {
    const [, setPromptFn] = getStepPromptState(stepNum);
    setPromptFn(rawVal);
    const detected = {};
    C3_RCTFC_KEYS.forEach((k) => {
      const tag = C3_KEY_TO_TAG[k];
      if (new RegExp(`^\\s*\\[${tag}\\]:`, "im").test(rawVal || "")) {
        detected[k] = true;
      }
    });
    setC3RctfcMap((prev) => ({ ...prev, [stepNum]: detected }));
  };

  const renderStepPromptAndRctfc = (stepNum) => {
    const stepMap = (c3RctfcMap && c3RctfcMap[stepNum]) || {};
    const activeCount = C3_RCTFC_KEYS.filter((k) => stepMap[k]).length;
    const isOpen = Boolean(openRctfcStep && openRctfcStep[stepNum]);
    const [curPromptVal] = getStepPromptState(stepNum);
    const defs = getStepRctfcDefs(stepNum);

    return (
      <div className="space-y-1.5 min-w-0">
        {/* 1. Collapsed-by-Default 🚀 Improve Your Prompt! (R.C.T.F.C.) Drawer */}
        <div data-testid={`c3-rctfc-collapsible-${stepNum}`} className="min-w-0">
          <button
            type="button"
            onClick={() =>
              setOpenRctfcStep((prev) => ({ ...prev, [stepNum]: !prev[stepNum] }))
            }
            className="w-full px-3 py-1.5 rounded-xl bg-white hover:bg-red-50/40 border border-slate-300 text-xs font-extrabold text-slate-900 flex items-center justify-between gap-2 text-left transition-all"
          >
            <span className="truncate">{ui.improvePromptBtn}</span>
            <span className="shrink-0 flex items-center gap-1.5">
              <span
                className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold border ${
                  activeCount > 0
                    ? "bg-emerald-50 text-emerald-800 border-emerald-300"
                    : "bg-slate-100 text-slate-600 border-slate-200"
                }`}
              >
                {activeCount}/5
              </span>
              <span className="text-xs font-extrabold text-slate-500">
                {isOpen ? "▴" : "▾"}
              </span>
            </span>
          </button>

          {isOpen && (
            <div className="pt-1.5 space-y-1.5">
              <div className="flex flex-wrap items-center justify-between gap-1.5">
                <span className="text-[11px] text-slate-600 leading-snug">
                  {ui.improvePromptSub}
                </span>
                <div className="flex items-center gap-1.5 ml-auto shrink-0">
                  {activeCount < 5 && (
                    <button
                      type="button"
                      onClick={() => handleActivateAllStepRctfc(stepNum)}
                      className="px-2 py-0.5 rounded-lg bg-[#ed1b2e] hover:bg-[#c81526] text-white text-[10px] font-extrabold transition-all"
                    >
                      {ui.activateAllShort}
                    </button>
                  )}
                  {activeCount > 0 && (
                    <button
                      type="button"
                      onClick={() => handleClearAllStepRctfc(stepNum)}
                      className="px-2 py-0.5 rounded-lg bg-white hover:bg-red-50 border border-slate-300 text-slate-700 hover:text-[#ed1b2e] text-[10px] font-extrabold transition-all"
                    >
                      {ui.clearAllShort}
                    </button>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                {C3_RCTFC_KEYS.map((k) => {
                  const isDone = Boolean(stepMap[k]);
                  const title = (ui.pillarTitles && ui.pillarTitles[k]) || C3_KEY_TO_TAG[k];
                  const shortDesc = String(defs[k] || "").replace(/^\[[^\]]+\]:\s*/, "");
                  return (
                    <button
                      key={k}
                      type="button"
                      onClick={() => handleToggleStepRctfcPillar(stepNum, k)}
                      className={`min-w-0 max-w-full px-2.5 py-2 rounded-xl border text-left transition-all ${
                        isDone
                          ? "bg-emerald-50/90 border-emerald-500 shadow-sm"
                          : "bg-white hover:bg-red-50/40 border-slate-200"
                      }`}
                    >
                      <div className="flex items-center justify-between gap-1 min-w-0">
                        <span
                          className={`text-xs font-extrabold ${
                            isDone ? "text-emerald-900" : "text-slate-900"
                          }`}
                        >
                          {isDone ? "✓ " : "+ "}
                          {title}
                        </span>
                      </div>
                      <div className="text-[11px] text-slate-600 leading-snug mt-0.5 whitespace-normal break-words">
                        {shortDesc}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* 2. Compact Live Editable Prompt Box */}
        <div className="bg-white border border-slate-300 focus-within:border-[#ed1b2e] rounded-xl p-2 space-y-1 transition-all">
          <div className="flex flex-wrap items-center justify-between gap-1">
            <span className="text-[11px] font-extrabold text-slate-800">
              {ui.livePromptHeader} ({activeCount}/5 R.C.T.F.C.)
            </span>
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => handleResetStepPrompt(stepNum)}
                className="px-2 py-0.5 rounded-lg bg-slate-50 hover:bg-slate-100 border border-slate-300 text-[10px] font-extrabold text-slate-700"
              >
                {ui.resetPromptBtn}
              </button>
              {curPromptVal.trim().length > 0 && (
                <button
                  type="button"
                  onClick={() => handleClearStepPrompt(stepNum)}
                  className="px-2 py-0.5 rounded-lg bg-slate-50 hover:bg-red-50 border border-slate-300 hover:border-red-300 text-[10px] font-extrabold text-slate-700 hover:text-[#ed1b2e]"
                >
                  {ui.clearPromptBtn}
                </button>
              )}
            </div>
          </div>

          {activeCount > 0 && (
            <div className="flex flex-wrap items-center gap-1">
              {C3_RCTFC_KEYS.filter((k) => stepMap[k]).map((k) => (
                <button
                  key={k}
                  type="button"
                  onClick={() => handleToggleStepRctfcPillar(stepNum, k)}
                  className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-slate-50 hover:bg-red-50 border border-slate-300 hover:border-[#ed1b2e] text-[10px] font-extrabold text-slate-700 hover:text-[#ed1b2e] transition-all"
                >
                  <span>{C3_KEY_TO_TAG[k]}</span>
                  <span className="text-[#ed1b2e]">✕</span>
                </button>
              ))}
            </div>
          )}

          <textarea
            rows={2}
            data-testid={`c3-live-prompt-${stepNum}`}
            value={curPromptVal}
            onChange={(e) => handleManualStepPromptEdit(stepNum, e.target.value)}
            className="w-full rounded-lg border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-none px-2 py-1 text-base sm:text-xs text-slate-900 leading-snug font-sans"
          />
        </div>
      </div>
    );
  };

  const buildWhatsappStrategySummary = () => {
    const chosenIdeas = (pb.waIdeas || [])
      .filter((_, idx) => selectedWaIdeaIdxs.includes(idx))
      .map((item) => item.detail);
    return [
      `Opening Approach: ${activeOpeningObj.prompt}`,
      chosenIdeas.length > 0 ? `Wealth Hooks to Plant: ${chosenIdeas.join("; ")}` : "",
    ]
      .filter(Boolean)
      .join(" | ");
  };

  const buildEmailStrategySummary = () => {
    const chosenFacts = (sc.aiaFacts || []).filter((_, idx) =>
      selectedFactIdxs.includes(idx)
    );
    return [
      `Advisory Style: ${activeAdvisoryObj.prompt}`,
      chosenFacts.length > 0 ? `Selected Facts: ${chosenFacts.join(" ; ")}` : "",
    ]
      .filter(Boolean)
      .join(" | ");
  };

  const buildPersonalTouchSummary = () => {
    return [
      cardPersonalNote.trim() ? `🎨 Card: ${cardPersonalNote.trim()}` : "",
      waPersonalNote.trim() ? `💬 WhatsApp: ${waPersonalNote.trim()}` : "",
      emailPersonalNote.trim() ? `🤝 Closer: ${emailPersonalNote.trim()}` : "",
    ]
      .filter(Boolean)
      .join("  •  ");
  };

  const toggleIdxInList = (list, idx) =>
    list.includes(idx) ? list.filter((x) => x !== idx) : [...list, idx].sort();

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
          seatIndex: typeof sc.seatIndex === "number" ? sc.seatIndex : seatOverride,
          stepMode: "card",
          cardPrompt: activeHeadline,
          cardHeadlineText: activeHeadline,
          cardStyle: activeStyleObj.prompt,
          cardPersonalNote: cardPersonalNote.trim(),
          generateCard: true,
        }),
      });
      const data = await res.json();
      if (data.greetingCardDataUrl) {
        setCardUrl(data.greetingCardDataUrl);
        setShowStep1Pickers(false);
        setShowCaseBrief(false);
      }
    } catch (e) {}
    setIsBusy(false);
  };

  const buildLocalSubsetWhatsappFallback = () => {
    const chosenIdeas = (pb.waIdeas || [])
      .filter((_, idx) => selectedWaIdeaIdxs.includes(idx))
      .map((item) => item.detail);
    if (chosenIdeas.length >= (pb.waIdeas || []).length) {
      return sc.defaultWhatsapp;
    }
    const firstName = String(sc.customerName || "Friend").split("(")[0].split("&")[0].trim();
    const note = waPersonalNote.trim();
    if (normLang === "zh-CN" || normLang === "yue") {
      return (
        `${firstName} 您好！衷心祝贺您迎来「${sc.shortLabel}」的喜悦时刻！🎉 特地为您制作了这张祝贺卡。` +
        (chosenIdeas.length ? `\n\n顺带分享一个贴心规划重点：${chosenIdeas.join("；")}。` : "") +
        ` ${note || "等您方便时我发一份 2 分钟简报给您参考好吗？😊"}`
      );
    }
    return (
      `Warmest congratulations ${firstName} on this wonderful milestone! 🎉 I made this celebratory card specially for you.` +
      (chosenIdeas.length ? `\n\nQuick helpful note: ${chosenIdeas.join("; ")}.` : "") +
      ` ${note || "Shall I send a quick 2-min summary whenever convenient? 😊"}`
    );
  };

  const buildLocalSubsetEmailFallback = () => {
    const chosenFacts = (sc.aiaFacts || []).filter((_, idx) =>
      selectedFactIdxs.includes(idx)
    );
    if (chosenFacts.length >= (sc.aiaFacts || []).length) {
      return sc.defaultEmail;
    }
    const firstName = String(sc.customerName || "Friend").split("(")[0].split("&")[0].trim();
    const leadPlan = String(sc.pambPlan || "PRU Plan").split("+")[0].trim();
    const cleanBullets = chosenFacts
      .map((f) => `• ${String(f).replace(/^\s*[✓✔•\-\*]\s*/, "").trim()}`)
      .join("\n");
    const closer = emailPersonalNote.trim() || (pb.closeHints && pb.closeHints[0]) || "Let's compare the 1-page summary in a quick 10-min chat";
    if (normLang === "zh-CN" || normLang === "yue") {
      return (
        `主题：方案重点对比：${leadPlan} vs ${rivalShort}\n\n` +
        `${firstName} 您好：\n感谢您的回复！` +
        (cleanBullets ? `以下是为您重点整理的 ${chosenFacts.length} 项核心优势：\n${cleanBullets}\n\n` : "\n\n") +
        `${closer}！`
      );
    }
    return (
      `Subject: Factual Comparison: ${leadPlan} vs. ${rivalShort}\n\n` +
      `Hi ${firstName},\nGreat question—comparing options is a smart move! ` +
      (cleanBullets
        ? `Here ${chosenFacts.length === 1 ? "is the 1 key advantage" : `are the ${chosenFacts.length} key advantages`} over ${sc.aiaPlan}:\n${cleanBullets}\n\n`
        : "\n\n") +
      `Next step: ${closer}?`
    );
  };

  const handleGenerateWhatsapp = async (polishInst = "") => {
    setIsBusy(true);
    setLangChangedBanner(false);
    const chosenIdeas = (pb.waIdeas || [])
      .filter((_, idx) => selectedWaIdeaIdxs.includes(idx))
      .map((item) => item.detail);
    const excludedIdeas = (pb.waIdeas || [])
      .filter((_, idx) => !selectedWaIdeaIdxs.includes(idx))
      .map((item) => item.detail);
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
          seatIndex: typeof sc.seatIndex === "number" ? sc.seatIndex : seatOverride,
          stepMode: "whatsapp",
          cardPrompt: activeHeadline,
          whatsappPrompt: buildWhatsappStrategySummary(),
          selectedWaIdeaIdxs,
          selectedWaIdeas: chosenIdeas,
          excludedWaIdeas: excludedIdeas,
          waPersonalNote: waPersonalNote.trim(),
          whatsappText: polishInst ? whatsappText.trim() : "",
          polishInstruction: polishInst,
          generateCard: false,
          previousCardDataUrl: cardUrl,
        }),
      });
      const data = await res.json();
      if (typeof data.firstTouchMessage === "string" && data.firstTouchMessage.trim()) {
        setWhatsappText(data.firstTouchMessage.trim());
        setShowStep2Pickers(false);
      } else if (!whatsappText) {
        setWhatsappText(buildLocalSubsetWhatsappFallback());
        setShowStep2Pickers(false);
      }
    } catch (e) {
      if (!whatsappText) {
        setWhatsappText(buildLocalSubsetWhatsappFallback());
        setShowStep2Pickers(false);
      }
    }
    setIsBusy(false);
  };

  const handleGenerateEmail = async (polishInst = "") => {
    setIsBusy(true);
    setLangChangedBanner(false);
    const chosenFacts = (sc.aiaFacts || []).filter((_, idx) =>
      selectedFactIdxs.includes(idx)
    );
    const excludedFacts = (sc.aiaFacts || []).filter(
      (_, idx) => !selectedFactIdxs.includes(idx)
    );
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
          seatIndex: typeof sc.seatIndex === "number" ? sc.seatIndex : seatOverride,
          stepMode: "email",
          cardPrompt: activeHeadline,
          emailPrompt: step3PromptText.trim() || buildEmailStrategySummary(),
          selectedFactIdxs,
          selectedFacts: chosenFacts,
          excludedFacts,
          emailPersonalNote: emailPersonalNote.trim(),
          emailText: polishInst ? emailText.trim() : "",
          polishInstruction: polishInst,
          generateCard: false,
          previousCardDataUrl: cardUrl,
        }),
      });
      const data = await res.json();
      if (typeof data.aiaComparisonEmail === "string" && data.aiaComparisonEmail.trim()) {
        setEmailText(data.aiaComparisonEmail.trim());
        setShowStep3Pickers(false);
      } else if (!emailText) {
        setEmailText(buildLocalSubsetEmailFallback());
        setShowStep3Pickers(false);
      }
    } catch (e) {
      if (!emailText) {
        setEmailText(buildLocalSubsetEmailFallback());
        setShowStep3Pickers(false);
      }
    }
    setIsBusy(false);
  };

  const readyToSubmit = Boolean(whatsappText.trim() && emailText.trim());

  const handleFinalSubmit = async () => {
    if (!readyToSubmit) return;
    setIsBusy(true);
    let finalCardUrl = cardUrl;
    const finalWaText = whatsappText.trim();
    const finalEmText = emailText.trim();
    const waStrat = buildWhatsappStrategySummary();
    const emStrat = buildEmailStrategySummary();
    const personalTouchSummary = buildPersonalTouchSummary();
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
          seatIndex: typeof sc.seatIndex === "number" ? sc.seatIndex : seatOverride,
          stepMode: "evaluate",
          cardPrompt: activeHeadline,
          cardStyle: activeStyleObj.prompt,
          cardPersonalNote: cardPersonalNote.trim(),
          whatsappPrompt: waStrat,
          waPersonalNote: waPersonalNote.trim(),
          whatsappText: finalWaText,
          emailPrompt: emStrat,
          emailPersonalNote: emailPersonalNote.trim(),
          emailText: finalEmText,
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
    const speedScore = Math.max(85, Math.min(99, 100 - Math.floor(elapsedSec / 18)));
    const pillarScores =
      evalData && evalData.pillarScores && Object.keys(evalData.pillarScores).length > 0
        ? evalData.pillarScores
        : {
            "Visual Warmth & Card": 22,
            "Empathy-First Opening": 22,
            "Wealth & Plan Mastery": 22,
            "Personal Advisor Touch": personalTouchSummary ? 22 : 18,
          };
    const accuracyScore =
      evalData && typeof evalData.qualityScore === "number"
        ? evalData.qualityScore
        : Object.values(pillarScores).reduce((acc, v) => acc + Number(v || 0), 0) || 88;
    const totalScore = Math.round(speedScore * 0.25 + accuracyScore * 0.75);
    const judgeFeedback =
      (evalData && evalData.judgeFeedback) ||
      `Strong Pre-Pitch! Warm Greeting Card + empathetic WhatsApp + factual PRU vs. ${rivalShort} comparison.`;

    const combinedMessages = `💬 [WHATSAPP]:\n${finalWaText}\n\n📧 [PRU vs. ${rivalShort}]:\n${finalEmText}`;

    const subPayload = {
      challenge: "3",
      title: `${sc.icon} ${sc.customerName.split("(")[0].trim()} • PRU vs. ${rivalShort}`,
      styleBadge: `${sc.icon} ${sc.shortLabel}`,
      rivalBrand: rivalShort,
      personalTouch: personalTouchSummary,
      userInput: `${sc.customerName} (${sc.lifeEvent}) | PRU: ${sc.pambPlan} vs. ${sc.aiaPlan}`,
      aiOutput: combinedMessages,
      whatsappMessage: finalWaText,
      aiaComparisonEmail: finalEmText,
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
      whatsappText: finalWaText,
      emailText: finalEmText,
      personalTouch: personalTouchSummary,
      pillarScores,
      judgeFeedback,
    });
    setIsBusy(false);
    setSubmitted(true);
  };

  const fallbackExecCopy = (str) => {
    try {
      const ta = document.createElement("textarea");
      ta.value = String(str || "");
      ta.setAttribute("readonly", "");
      ta.style.position = "fixed";
      ta.style.top = "-9999px";
      ta.style.left = "-9999px";
      ta.style.opacity = "0";
      ta.style.fontSize = "16px";
      document.body.appendChild(ta);
      ta.focus();
      ta.select();
      const ok = document.execCommand && document.execCommand("copy");
      ta.remove();
      return Boolean(ok);
    } catch (e) {
      return false;
    }
  };

  const handleCopyPrePitch = (textToCopy, toastMsg) => {
    const showDone = () => {
      setCopyToast(toastMsg);
      setTimeout(() => setCopyToast(""), 2400);
    };
    if (navigator.clipboard && typeof navigator.clipboard.writeText === "function") {
      navigator.clipboard
        .writeText(textToCopy)
        .then(showDone)
        .catch(() => {
          if (fallbackExecCopy(textToCopy)) showDone();
        });
    } else if (fallbackExecCopy(textToCopy)) {
      showDone();
    }
  };

  const cardProgressStages =
    normLang === "zh-CN"
      ? ["1/3 构思大马温馨场景构图...", "2/3 绘制您的专属家庭祝福细节...", "3/3 润色高质感祝贺卡排版..."]
      : normLang === "yue"
      ? ["1/3 構思大馬溫馨場景構圖...", "2/3 畫緊你揀嘅專屬祝福細節...", "3/3 執靚高質感賀卡排版..."]
      : normLang === "ms"
      ? ["1/3 Menyusun suasana mesra Malaysia...", "2/3 Melukis sentuhan kreatif anda...", "3/3 Kemasan akhir kad eksklusif..."]
      : normLang === "ta"
      ? ["1/3 இனிய மலேசிய காட்சி அமைப்பு...", "2/3 உங்கள் சிறப்பு வாழ்த்து ஓவியம்...", "3/3 வாழ்த்து அட்டை இறுதி வடிவமைப்பு..."]
      : ["1/3 Composing warm Malaysian scene...", "2/3 Painting your personal creative touch...", "3/3 Finishing executive greeting card..."];

  if (submitted && submittedData) {
    const pillarEntries = Object.entries(submittedData.pillarScores || {});
    const fullSharePack = `${submittedData.whatsappText}\n\n---\n\n${submittedData.emailText}`;

    return (
      <div className="bg-white border-t-4 border-t-[#ed1b2e] border-x border-b border-slate-200 rounded-2xl p-3 sm:p-4 shadow-lg space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 pb-2.5">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs font-extrabold">
              {ui.submittedBadge}
            </span>
            <span className="text-xs sm:text-sm font-extrabold text-slate-900">
              {sc.icon} {sc.customerName}
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-red-50 border border-red-200 text-[#ed1b2e] text-xs sm:text-sm font-black">
              {ui.scoreLabel} {submittedData.total} / 100 pts ({submittedData.timeSec}s)
            </span>
            <button
              type="button"
              onClick={() => setSubmitted(false)}
              className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-extrabold border border-slate-300"
            >
              ✎ Refine
            </button>
            <button
              type="button"
              onClick={onNext}
              className="px-4 py-1.5 rounded-xl bg-[#ed1b2e] hover:bg-[#c8102e] text-white text-xs sm:text-sm font-extrabold shadow"
            >
              {t.viewMyCard}
            </button>
          </div>
        </div>

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
            {submittedData.personalTouch && (
              <div className="text-[11px] font-bold text-amber-950 bg-amber-50 border border-amber-200 rounded-lg px-2.5 py-1.5">
                💡 {submittedData.personalTouch}
              </div>
            )}
            {submittedData.judgeFeedback && (
              <div className="text-xs font-bold text-slate-800 bg-red-50/60 border border-red-200 rounded-lg px-2.5 py-1.5">
                🏅 {submittedData.judgeFeedback}
              </div>
            )}
          </div>
        )}

        {/* Real-World Advisor Takeaway Actions (100% In-App — Never Bounces User Out of Browser) */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => handleCopyPrePitch(fullSharePack, "✓ Pre-Pitch Copied!")}
            className="flex-1 py-2 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-extrabold shadow-sm"
          >
            {copyToast || "📋 Copy Full Pre-Pitch Pack"}
          </button>
          <button
            type="button"
            onClick={() =>
              handleCopyPrePitch(submittedData.whatsappText || "", "✓ WhatsApp Copied!")
            }
            className="flex-1 py-2 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-extrabold text-center shadow-sm"
          >
            💬 Copy First-Touch WhatsApp
          </button>
        </div>

        {submittedData.cardUrl && (
          <div className="flex items-center justify-center bg-slate-50 border border-slate-200 rounded-xl p-2.5">
            <div className="relative group inline-block">
              <img
                src={submittedData.cardUrl}
                alt="Life-Event Greeting Card"
                title="Tap to zoom"
                data-zoomable="true"
                className="h-40 sm:h-48 md:h-52 w-auto object-contain rounded-xl border-2 border-[#ed1b2e] shadow-md cursor-zoom-in"
              />
              <span className="pointer-events-none absolute bottom-2 right-2 px-2 py-0.5 rounded-full bg-slate-900/75 text-white text-[10px] font-bold">
                🔍 Tap to zoom
              </span>
            </div>
          </div>
        )}

        {/* Clean 2-Tab Switcher for Submitted WhatsApp vs. Comparison Email */}
        <div className="space-y-2">
          <div className="grid grid-cols-2 gap-1.5 bg-slate-100 p-1 rounded-xl border border-slate-200">
            <button
              type="button"
              onClick={() => setPostSubmitTab("whatsapp")}
              className={`py-2 px-2.5 rounded-lg text-xs font-extrabold transition-all truncate ${
                postSubmitTab === "whatsapp"
                  ? "bg-white text-emerald-900 shadow-sm border border-emerald-300"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              💬 WhatsApp
            </button>
            <button
              type="button"
              onClick={() => setPostSubmitTab("email")}
              className={`py-2 px-2.5 rounded-lg text-xs font-extrabold transition-all truncate ${
                postSubmitTab === "email"
                  ? "bg-white text-blue-950 shadow-sm border border-blue-300"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              {adaptRivalLabel("📧 vs. AIA Email")}
            </button>
          </div>

          {postSubmitTab === "whatsapp" ? (
            <div className="bg-emerald-50/50 border border-emerald-200 rounded-xl p-2.5">
              <div className="text-xs font-extrabold text-emerald-900 mb-1">
                {ui.waFinalHeader}
              </div>
              <div className="text-xs sm:text-sm text-slate-900 whitespace-pre-line leading-snug max-h-44 overflow-y-auto bg-white p-2.5 rounded-lg border border-emerald-200">
                {submittedData.whatsappText}
              </div>
            </div>
          ) : (
            <div className="bg-blue-50/50 border border-blue-200 rounded-xl p-2.5">
              <div className="text-xs font-extrabold text-blue-950 mb-1">
                {adaptRivalLabel(ui.emailFinalHeader)}
              </div>
              <div className="text-xs sm:text-sm text-slate-900 whitespace-pre-line leading-snug max-h-44 overflow-y-auto bg-white p-2.5 rounded-lg border border-blue-200">
                {submittedData.emailText}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-full min-w-0 overflow-hidden bg-white border-t-4 border-t-[#ed1b2e] border-x border-b border-slate-200 rounded-2xl p-2.5 sm:p-5 shadow-sm space-y-2 sm:space-y-3">
      {/* 1. Slim Top Studio Bar (Aligned 1:1 with Challenge 2 Studio Header) */}
      <div className="flex items-center justify-between gap-2 pb-1 border-b border-slate-200 min-w-0">
        <h2 className="text-sm sm:text-base font-extrabold text-slate-900 truncate min-w-0">
          {ui.studioHeader}
        </h2>
        <span className="px-2.5 py-0.5 rounded-xl text-[11px] font-extrabold bg-red-50 text-[#ed1b2e] border border-red-200 shrink-0">
          Step {step}/3
        </span>
      </div>

      {/* 2. Unified Auto-Collapsing Light-Grey Client Brief Card + 6-Case Switcher (Aligned 1:1 with C2) */}
      <div
        data-testid="client-brief-card"
        className="bg-slate-50 border border-slate-200 rounded-2xl p-2 sm:p-3 space-y-1.5"
      >
        <div className="flex flex-wrap sm:flex-nowrap items-center justify-between gap-1.5">
          <button
            type="button"
            onClick={() => setShowCaseBrief((v) => !v)}
            className="flex items-center gap-1.5 min-w-[130px] text-left flex-1"
          >
            <span className="text-base leading-none shrink-0">{sc.icon || activeCaseMeta.icon}</span>
            <div className="min-w-0 flex-1">
              <div className="text-xs font-extrabold text-slate-900 truncate">
                {clientShortName}{" "}
                <span className="hidden min-[400px]:inline text-[#ed1b2e] font-bold">
                  • {clientShortTitle}
                </span>
              </div>
            </div>
          </button>

          <div className="flex items-center gap-1.5 shrink-0 ml-auto">
            <button
              type="button"
              onClick={() => setShowCaseBrief((v) => !v)}
              className="px-2 py-1 rounded-lg bg-white hover:bg-red-50 border border-slate-300 text-[11px] font-bold text-slate-700 hover:text-[#ed1b2e] whitespace-nowrap transition-all"
            >
              {showCaseBrief ? `${ui.hideBtn} ▴` : `${ui.caseInfoBtn} ▾`}
            </button>

            <button
              type="button"
              onClick={() => {
                setConfirmArmedSlot(null);
                setShowCasePicker((v) => !v);
              }}
              className="px-2 py-1 rounded-lg bg-white hover:bg-red-50 border border-slate-300 text-[11px] font-extrabold text-slate-800 hover:text-[#ed1b2e] whitespace-nowrap transition-all"
            >
              {ui.switchShortFmt} ({activeSlot + 1}/6) ▾
            </button>
          </div>
        </div>

        {/* Sleek 6-Item Curated Case Picker (Aligned 1:1 with C2 + WebView-Safe Inline Switch Confirmation) */}
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
                    onClick={() => executeSelectCaseSlot(confirmArmedSlot)}
                    className="px-2.5 py-1 rounded-lg bg-[#ed1b2e] hover:bg-[#c81526] text-white text-[11px] font-extrabold"
                  >
                    ✓ {ui.switchShortFmt} ({confirmArmedSlot + 1}/6)
                  </button>
                </div>
              </div>
            )}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
              {C3_CURATED_6_META.map((item, idx) => {
                const isCurrent = idx === activeSlot;
                const isArmed = confirmArmedSlot === idx;
                const locLabel = item.labels[normLang] || item.labels.en;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => handleSelectCaseSlot(idx)}
                    className={`text-left px-2.5 py-2 rounded-lg border text-xs font-extrabold transition-all flex items-center justify-between gap-2 ${
                      isCurrent
                        ? "bg-[#ed1b2e] border-[#ed1b2e] text-white"
                        : isArmed
                        ? "bg-amber-50 border-amber-400 text-amber-950"
                        : "bg-slate-50 hover:bg-red-50/50 border-slate-200 text-slate-800 hover:border-[#ed1b2e]"
                    }`}
                  >
                    <span className="truncate">
                      {idx + 1}. {item.icon} {locLabel}
                    </span>
                    <span
                      className={`text-[10px] font-mono shrink-0 ${
                        isCurrent ? "text-red-100" : "text-[#ed1b2e]"
                      }`}
                    >
                      {idx + 1}/6
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Expandable 3 Ultra-Concise 1-Line Bullets in Matching Light Card */}
        {showCaseBrief && (
          <div className="bg-white border border-slate-200 rounded-xl px-2.5 py-2 space-y-1 text-[11px] sm:text-xs leading-snug">
            <div className="flex items-baseline gap-1.5">
              <span className="font-extrabold text-[#ed1b2e] shrink-0">{ui.lifeEventLabel}:</span>
              <span className="text-slate-800 font-medium line-clamp-1">{sc.lifeEvent}</span>
            </div>
            <div className="flex items-baseline gap-1.5">
              <span className="font-extrabold text-slate-700 shrink-0">{ui.gapLabel}:</span>
              <span className="text-slate-700 line-clamp-1">{sc.existingGap}</span>
            </div>
            <div className="flex items-baseline gap-1.5">
              <span className="font-extrabold text-[#ed1b2e] shrink-0">{ui.offerLabel}:</span>
              <span className="text-slate-900 font-bold line-clamp-1">{sc.pambPlan}</span>
            </div>
          </div>
        )}
      </div>

      {langChangedBanner && (
        <div className="bg-amber-50 border border-amber-300 rounded-xl px-3 py-1.5 flex items-center justify-between gap-2 text-xs font-bold text-amber-950">
          <span>🌐 Draft kept — tap Re-Draft anytime to translate.</span>
          <button
            type="button"
            onClick={() => setLangChangedBanner(false)}
            className="text-amber-800 font-extrabold px-1.5"
          >
            ✕
          </button>
        </div>
      )}

      {/* 3. Unified Segmented 3-Step Workflow Bar (Aligned 1:1 with C2 • Step 3 Locked Until WhatsApp Sent!) */}
      <div className="grid grid-cols-3 gap-1.5 bg-slate-100 p-1 rounded-2xl border border-slate-200/80 min-w-0">
        {[
          {
            n: 1,
            short: ui.step1Tab,
            full: ui.step1TabFull || ui.step1Tab,
            done: !!cardUrl,
            unlocked: true,
          },
          {
            n: 2,
            short: ui.step2Tab,
            full: ui.step2TabFull || ui.step2Tab,
            done: !!whatsappText.trim() && waSent,
            unlocked: true,
          },
          {
            n: 3,
            short: waSent && waReplyArrived ? adaptRivalLabel(ui.step3Tab) : ui.step3LockedShort,
            full:
              waSent && waReplyArrived
                ? adaptRivalLabel(ui.step3TabFull || ui.step3Tab)
                : ui.step3LockedFull,
            done: !!emailText.trim(),
            unlocked: waSent,
          },
        ].map((s) => {
          const active = step === s.n;
          return (
            <button
              type="button"
              key={s.n}
              disabled={!s.unlocked}
              onClick={() => s.unlocked && setStep(s.n)}
              className={`py-2 px-1.5 sm:px-3 rounded-xl text-[11px] sm:text-xs font-extrabold transition-all flex items-center justify-center gap-1 min-w-0 ${
                active
                  ? "bg-[#ed1b2e] text-white shadow-sm"
                  : !s.unlocked
                  ? "text-slate-400 cursor-not-allowed opacity-75"
                  : s.done
                  ? "bg-white text-emerald-800 border border-emerald-200 shadow-sm"
                  : "text-slate-700 hover:bg-white/70 hover:text-slate-900"
              }`}
            >
              {s.done && !active && <span className="shrink-0">✓</span>}
              <span className="truncate sm:hidden">{s.short}</span>
              <span className="hidden sm:inline truncate">{s.full}</span>
            </button>
          );
        })}
      </div>

      {/* STEP 1: DOOR-OPENER GREETING CARD */}
      {step === 1 && (
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-2.5 sm:p-4 space-y-1.5">
          {cardUrl && !showStep1Pickers ? (
            <div className="flex items-center justify-between gap-2 bg-white border border-slate-200 rounded-xl px-3 py-2">
              <div className="text-xs font-extrabold text-slate-800 truncate">
                {ui.cardSettingsBar} <span className="text-slate-500 font-semibold">• {activeStyleObj.label}</span>
              </div>
              <button
                type="button"
                onClick={() => setShowStep1Pickers(true)}
                className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-red-50 text-[#ed1b2e] border border-slate-300 text-xs font-extrabold shrink-0"
              >
                {ui.editBtn}
              </button>
            </div>
          ) : (
            <div className="space-y-1.5">
              <div className="flex items-center justify-between gap-2">
                <div className="text-xs sm:text-sm font-extrabold text-slate-900">
                  {ui.step1Title}
                </div>
                {cardUrl && (
                  <button
                    type="button"
                    onClick={() => setShowStep1Pickers(false)}
                    className="text-[11px] font-extrabold text-slate-500 hover:text-slate-800"
                  >
                    {ui.hideBtn} ▴
                  </button>
                )}
              </div>

              <div className="space-y-1 min-w-0">
                <div className="text-xs font-extrabold text-slate-900">{ui.pickVisualStyle}</div>
                <div className="grid grid-cols-3 gap-1.5 min-w-0">
                  {ui.visualStyles.map((vs) => {
                    const active = cardStyleId === vs.id;
                    return (
                      <button
                        key={vs.id}
                        type="button"
                        onClick={() => setCardStyleId(vs.id)}
                        className={`min-w-0 break-words px-1.5 sm:px-2 py-1.5 rounded-xl border text-center sm:text-left text-[11px] sm:text-xs font-extrabold leading-tight transition-all ${
                          active
                            ? "bg-[#ed1b2e] border-[#ed1b2e] text-white shadow-sm"
                            : "bg-white hover:bg-red-50/50 border-slate-200 text-slate-800 hover:border-[#ed1b2e]"
                        }`}
                      >
                        {vs.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="space-y-1">
                <div className="text-xs font-extrabold text-slate-900">{ui.pickHeadline}</div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                  {(sc.cardChips || [sc.cardHeadline]).map((hl, idx) => {
                    const active = selectedHeadlineIdx === idx;
                    return (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setSelectedHeadlineIdx(idx)}
                        className={`px-2.5 py-1.5 rounded-xl border text-left text-xs font-bold leading-snug transition-all ${
                          active
                            ? "bg-red-50 border-[#ed1b2e] text-[#ed1b2e] shadow-sm"
                            : "bg-white hover:bg-red-50/40 border-slate-200 text-slate-800"
                        }`}
                      >
                        {active ? "✓ " : ""}{hl}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Collapsed Optional Personal Touch */}
              <div>
                <button
                  type="button"
                  onClick={() => setShowCardTouch((v) => !v)}
                  className={`px-3 py-1 rounded-full border text-[11px] font-extrabold transition-all ${
                    showCardTouch || cardPersonalNote.trim()
                      ? "bg-amber-50 border-amber-300 text-amber-950"
                      : "bg-white border-slate-300 text-slate-700 hover:border-[#ed1b2e]"
                  }`}
                >
                  {cardPersonalNote.trim() ? `✓ 💡 ${cardPersonalNote.trim()}` : ui.personalTouchBtn}{" "}
                  {showCardTouch ? "▴" : "▾"}
                </button>

                {showCardTouch && (
                  <div className="mt-1.5 bg-white border border-slate-200 rounded-xl p-2.5 space-y-2">
                    <div className="flex flex-wrap gap-1">
                      {(pb.cardHints || []).map((hintTxt, hIdx) => {
                        const isUsed = cardPersonalNote === hintTxt;
                        return (
                          <button
                            key={hIdx}
                            type="button"
                            onClick={() => setCardPersonalNote(isUsed ? "" : hintTxt)}
                            className={`px-2.5 py-1 rounded-full border text-[11px] font-bold transition-all ${
                              isUsed
                                ? "bg-amber-100 border-amber-400 text-amber-950"
                                : "bg-slate-50 hover:bg-amber-50 border-slate-300 text-slate-700"
                            }`}
                          >
                            {isUsed ? "✓ " : "+ "}{hintTxt}
                          </button>
                        );
                      })}
                    </div>
                    <input
                      type="text"
                      value={cardPersonalNote}
                      onChange={(e) => setCardPersonalNote(e.target.value)}
                      placeholder={ui.cardTouchPlaceholder}
                      className="w-full bg-slate-50 focus:bg-white border border-slate-200 focus:border-[#ed1b2e] rounded-lg px-3 py-2 text-base sm:text-xs text-slate-900 font-medium focus:outline-none"
                    />
                  </div>
                )}
              </div>

              <button
                type="button"
                onClick={handleGenerateCard}
                disabled={isBusy}
                className="w-full rounded-2xl py-2.5 sm:py-3.5 px-4 bg-[#ed1b2e] hover:bg-[#c8102e] disabled:opacity-75 text-white font-extrabold text-sm sm:text-base shadow-md transition-all"
              >
                {isBusy ? ui.generatingCard : cardUrl ? ui.redrawCard : ui.generateCardBtn}
              </button>
            </div>
          )}

          {isBusy && (
            <div className="bg-white border border-red-200 rounded-xl p-2.5 space-y-1.5">
              <div className="flex items-center justify-between text-xs font-extrabold text-[#ed1b2e]">
                <span>{cardProgressStages[cardStageIdx] || cardProgressStages[0]}</span>
                <span>{cardStageIdx === 0 ? "35%" : cardStageIdx === 1 ? "72%" : "92%"}</span>
              </div>
              <div className="w-full h-2 bg-red-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#ed1b2e] transition-all duration-700 rounded-full"
                  style={{ width: cardStageIdx === 0 ? "35%" : cardStageIdx === 1 ? "72%" : "92%" }}
                />
              </div>
            </div>
          )}

          {cardUrl && (
            <div className="flex flex-col md:flex-row items-center justify-between gap-3 bg-white border-2 border-emerald-300 rounded-2xl p-3 shadow-sm">
              <div className="relative group mx-auto md:mx-0 shrink-0">
                <img
                  src={cardUrl}
                  alt="Generated Greeting Card"
                  title="Tap to zoom"
                  data-zoomable="true"
                  className="h-44 sm:h-52 w-auto object-contain rounded-xl border-2 border-[#ed1b2e] shadow-md cursor-zoom-in"
                />
                <span className="pointer-events-none absolute bottom-2 right-2 px-2.5 py-0.5 rounded-full bg-slate-900/75 text-white text-[10px] font-bold">
                  🔍 Tap to zoom
                </span>
              </div>
              <div className="flex flex-col gap-2 w-full md:flex-1">
                <div className="text-xs font-bold text-emerald-900 bg-emerald-50 border border-emerald-200 px-3 py-2 rounded-xl">
                  {ui.cardReadyMsg}
                </div>
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="w-full rounded-2xl py-3 sm:py-3.5 px-4 bg-slate-900 hover:bg-[#ed1b2e] text-white font-extrabold text-sm sm:text-base shadow-md transition-all"
                >
                  {ui.nextStep2Btn}
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* STEP 2: FIRST-TOUCH WHATSAPP */}
      {step === 2 && (
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-3 sm:p-4 space-y-2.5">
          {cardUrl && (
            <div className="flex items-center justify-between gap-2 bg-white border border-slate-200 rounded-xl px-2.5 py-1.5">
              <div className="flex items-center gap-2 min-w-0">
                <img
                  src={cardUrl}
                  alt="Greeting Card Thumbnail"
                  title="Tap to zoom"
                  data-zoomable="true"
                  className="h-9 w-auto rounded border border-[#ed1b2e] shrink-0 cursor-zoom-in hover:opacity-90"
                />
                <span className="text-xs font-extrabold text-emerald-700 truncate">
                  {ui.cardAttachedBadge}
                </span>
              </div>
              <button
                type="button"
                onClick={() => {
                  setShowStep1Pickers(true);
                  setStep(1);
                }}
                className="text-xs font-extrabold text-[#ed1b2e] hover:underline shrink-0"
              >
                {ui.editCardBtn}
              </button>
            </div>
          )}

          {whatsappText && !showStep2Pickers ? (
            <div className="flex items-center justify-between gap-2 bg-white border border-slate-200 rounded-xl px-3 py-2">
              <div className="text-xs font-extrabold text-slate-800 truncate">
                {ui.promptHooksBar} <span className="text-slate-500 font-semibold">• {activeOpeningObj.label}</span>
              </div>
              <button
                type="button"
                onClick={() => setShowStep2Pickers(true)}
                className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-red-50 text-[#ed1b2e] border border-slate-300 text-xs font-extrabold shrink-0"
              >
                {ui.editBtn}
              </button>
            </div>
          ) : (
            <div className="space-y-2.5">
              <div className="flex items-center justify-between gap-2">
                <div className="text-xs sm:text-sm font-extrabold text-slate-900">
                  {ui.step2Title}
                </div>
                {whatsappText && (
                  <button
                    type="button"
                    onClick={() => setShowStep2Pickers(false)}
                    className="text-[11px] font-extrabold text-slate-500 hover:text-slate-800"
                  >
                    {ui.hideBtn} ▴
                  </button>
                )}
              </div>

              <div className="space-y-1">
                <div className="text-xs font-extrabold text-slate-900">{ui.pickOpeningTone}</div>
                <div className="flex flex-wrap gap-1.5">
                  {ui.openingTones.map((ot) => {
                    const active = openingToneId === ot.id;
                    return (
                      <button
                        key={ot.id}
                        type="button"
                        onClick={() => setOpeningToneId(ot.id)}
                        className={`px-2.5 py-1.5 rounded-xl border text-xs font-extrabold transition-all flex-1 min-w-[105px] ${
                          active
                            ? "bg-[#ed1b2e] border-[#ed1b2e] text-white shadow-sm"
                            : "bg-white hover:bg-red-50/50 border-slate-200 text-slate-800 hover:border-[#ed1b2e]"
                        }`}
                      >
                        {ot.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-xs font-extrabold text-slate-900">{ui.pickWealthHooks}</span>
                  <button
                    type="button"
                    onClick={() => setSelectedWaIdeaIdxs((pb.waIdeas || []).map((_, i) => i))}
                    className="text-[11px] font-extrabold text-[#ed1b2e] hover:underline"
                  >
                    {ui.selectAllIdeas}
                  </button>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {(pb.waIdeas || []).map((idea, idx) => {
                    const active = selectedWaIdeaIdxs.includes(idx);
                    return (
                      <button
                        key={idx}
                        type="button"
                        onClick={() =>
                          setSelectedWaIdeaIdxs((prev) => toggleIdxInList(prev, idx))
                        }
                        className={`px-2.5 py-1.5 rounded-xl border text-left text-xs font-extrabold transition-all flex-1 min-w-[130px] ${
                          active
                            ? "bg-emerald-50 border-emerald-500 text-emerald-950 shadow-sm"
                            : "bg-white hover:bg-red-50/40 border-slate-200 text-slate-800"
                        }`}
                      >
                        {active ? "✓ " : "+ "}{idea.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Collapsed Optional Personal Touch */}
              <div>
                <button
                  type="button"
                  onClick={() => setShowWaTouch((v) => !v)}
                  className={`px-3 py-1.5 rounded-full border text-[11px] font-extrabold transition-all ${
                    showWaTouch || waPersonalNote.trim()
                      ? "bg-amber-50 border-amber-300 text-amber-950"
                      : "bg-white border-slate-300 text-slate-700 hover:border-[#ed1b2e]"
                  }`}
                >
                  {waPersonalNote.trim() ? `✓ 💡 ${waPersonalNote.trim()}` : ui.personalTouchBtn}{" "}
                  {showWaTouch ? "▴" : "▾"}
                </button>

                {showWaTouch && (
                  <div className="mt-1.5 bg-white border border-slate-200 rounded-xl p-2.5 space-y-2">
                    <div className="flex flex-wrap gap-1">
                      {(pb.waHints || []).map((hTxt, hIdx) => {
                        const isUsed = waPersonalNote === hTxt;
                        return (
                          <button
                            key={hIdx}
                            type="button"
                            onClick={() => setWaPersonalNote(isUsed ? "" : hTxt)}
                            className={`px-2.5 py-1 rounded-full border text-[11px] font-bold transition-all ${
                              isUsed
                                ? "bg-amber-100 border-amber-400 text-amber-950"
                                : "bg-slate-50 hover:bg-amber-50 border-slate-300 text-slate-700"
                            }`}
                          >
                            {isUsed ? "✓ " : "+ "}{hTxt}
                          </button>
                        );
                      })}
                    </div>
                    <input
                      type="text"
                      value={waPersonalNote}
                      onChange={(e) => setWaPersonalNote(e.target.value)}
                      placeholder={ui.waTouchPlaceholder}
                      className="w-full bg-slate-50 focus:bg-white border border-slate-200 focus:border-[#ed1b2e] rounded-lg px-3 py-2 text-base sm:text-xs text-slate-900 font-medium focus:outline-none"
                    />
                  </div>
                )}
              </div>

              <button
                type="button"
                onClick={() => handleGenerateWhatsapp("")}
                disabled={isBusy}
                className="w-full rounded-2xl py-3 sm:py-3.5 px-4 bg-[#ed1b2e] hover:bg-[#c8102e] disabled:opacity-75 text-white font-extrabold text-sm sm:text-base shadow-md transition-all"
              >
                {isBusy ? ui.waDrafting : whatsappText ? ui.waRegenerateBtn : ui.waGenerateBtn}
              </button>
            </div>
          )}

          {whatsappText && (
            <div className="bg-[#e7f8ee] border-2 border-emerald-400 rounded-2xl p-3 space-y-2 shadow-sm">
              <div className="text-xs font-extrabold text-emerald-950">
                {ui.waPreviewHeader}
              </div>
              <textarea
                rows={4}
                value={whatsappText}
                onChange={(e) => setWhatsappText(e.target.value)}
                className="w-full bg-white border border-emerald-300 rounded-xl p-2.5 text-base sm:text-sm text-slate-900 leading-relaxed focus:outline-none focus:border-[#ed1b2e]"
              />
              <div className="flex flex-wrap items-center gap-1.5">
                <span className="text-[11px] font-extrabold text-emerald-900 mr-0.5">
                  {ui.quickPolishLabel}
                </span>
                {ui.waPolishes.map((pol, pIdx) => (
                  <button
                    key={pIdx}
                    type="button"
                    disabled={isBusy}
                    onClick={() => handleGenerateWhatsapp(pol.inst)}
                    className="px-2.5 py-1 rounded-full bg-white hover:bg-emerald-100 border border-emerald-400 text-[11px] font-extrabold text-emerald-900 transition-all"
                  >
                    {pol.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="flex flex-wrap justify-between items-center gap-2 pt-0.5">
            <button
              type="button"
              onClick={() => setStep(1)}
              className="px-3.5 py-2 rounded-xl bg-white border border-slate-300 text-xs font-extrabold text-slate-700"
            >
              {ui.backBtn}
            </button>
            {whatsappText.trim() && (
              <button
                type="button"
                onClick={handleMockSendWhatsapp}
                disabled={waSendPhase === "sending"}
                className="bg-emerald-600 hover:bg-emerald-700 disabled:opacity-80 text-white rounded-xl py-2.5 sm:py-3 px-4 text-xs sm:text-sm font-extrabold shadow-md transition-all flex items-center gap-1.5"
              >
                <span>
                  {waSendPhase === "sending"
                    ? ui.sendingWaBtn
                    : waSent
                    ? ui.resendWaBtn
                    : ui.nextStep3Btn}
                </span>
              </button>
            )}
          </div>
        </div>
      )}

      {/* STEP 3: UNLOCKED ONLY AFTER MOCK WHATSAPP SEND -> LIVE CLIENT REPLY -> WINNING COMPARISON */}
      {step === 3 && (
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-3 sm:p-4 space-y-2.5">
          {!waSent ? (
            <div className="bg-white border border-slate-200 rounded-xl p-4 text-center space-y-2.5">
              <div className="text-xs sm:text-sm font-extrabold text-slate-800">
                🔒 {ui.step3LockedFull}
              </div>
              <button
                type="button"
                onClick={() => setStep(2)}
                className="px-4 py-2 rounded-xl bg-[#ed1b2e] hover:bg-[#c8102e] text-white text-xs font-extrabold shadow-sm"
              >
                {ui.backBtn}
              </button>
            </div>
          ) : (
            <>
              {/* Compact Outgoing Sent WhatsApp Confirmation Bar (Collapsible) */}
              <div className="bg-[#e7f8ee] border border-emerald-300 rounded-xl px-2.5 py-2 space-y-1.5">
                <div className="flex items-center justify-between gap-2">
                  <div className="min-w-0 flex items-center gap-1.5 text-[11px] font-extrabold text-emerald-900 truncate">
                    <span className="text-sky-600 shrink-0">✓✓</span>
                    <span className="truncate">{ui.sentWaLabel}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowSentWaPreview((v) => !v)}
                    className="text-[10px] font-extrabold text-emerald-800 bg-white/80 border border-emerald-300 px-2 py-0.5 rounded-lg shrink-0"
                  >
                    {showSentWaPreview ? `${ui.hideBtn} ▴` : `${ui.detailsBtn} ▾`}
                  </button>
                </div>
                {showSentWaPreview && (
                  <div className="bg-white border border-emerald-200 rounded-lg p-2 text-xs text-slate-800 whitespace-pre-line leading-snug">
                    {whatsappText}
                  </div>
                )}
              </div>

              {!waReplyArrived || waSendPhase === "typing" ? (
                /* Simulated Live WhatsApp Typing State — Client Reply NOT Staged Yet! */
                <div className="bg-white border border-amber-300 rounded-xl p-3.5 flex items-center justify-between gap-2 shadow-sm animate-pulse">
                  <div className="text-xs font-extrabold text-amber-900">
                    {ui.typingLabel}
                  </div>
                  <div className="flex items-center gap-1 shrink-0">
                    <span className="w-2 h-2 rounded-full bg-amber-500 animate-bounce" />
                    <span className="w-2 h-2 rounded-full bg-amber-500 animate-bounce" />
                    <span className="w-2 h-2 rounded-full bg-amber-500 animate-bounce" />
                  </div>
                </div>
              ) : (
                <>
                  {/* Incoming Client WhatsApp Reply Bubble — Arrives ONLY After Sending WhatsApp! */}
                  <div className="bg-amber-50 border border-amber-300 rounded-xl p-2.5 space-y-1 shadow-sm">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[11px] font-extrabold tracking-wide text-amber-900">
                        {ui.incomingBubbleTag}
                      </span>
                      <span className="text-[11px] font-bold text-amber-800 truncate">
                        {clientShortName}
                      </span>
                    </div>
                    <div className="bg-white border border-amber-200 rounded-xl rounded-tl-none px-2.5 py-2 text-xs font-bold text-slate-900 leading-snug">
                      {sc.customerReply}
                    </div>
                  </div>

          {emailText && !showStep3Pickers ? (
            <div className="flex items-center justify-between gap-2 bg-white border border-slate-200 rounded-xl px-3 py-2">
              <div className="text-xs font-extrabold text-slate-800 truncate">
                {ui.comparisonSettingsBar}{" "}
                <span className="text-slate-500 font-semibold">• {activeAdvisoryObj.label}</span>
              </div>
              <button
                type="button"
                onClick={() => setShowStep3Pickers(true)}
                className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-red-50 text-[#ed1b2e] border border-slate-300 text-xs font-extrabold shrink-0"
              >
                {ui.editBtn}
              </button>
            </div>
          ) : (
            <div className="space-y-2.5">
              {emailText && (
                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={() => setShowStep3Pickers(false)}
                    className="text-[11px] font-extrabold text-slate-500 hover:text-slate-800"
                  >
                    {ui.hideBtn} ▴
                  </button>
                </div>
              )}

              <div className="space-y-1.5">
                <div className="flex flex-wrap items-center justify-between gap-1.5">
                  <span className="text-xs font-extrabold text-slate-900">
                    {adaptRivalLabel(ui.pickWinningFacts)}
                  </span>
                  <button
                    type="button"
                    onClick={() => setSelectedFactIdxs([0, 1, 2])}
                    className="px-2.5 py-0.5 rounded-lg bg-[#ed1b2e] hover:bg-[#c8102e] text-white text-[11px] font-extrabold shadow-sm"
                  >
                    {ui.selectAll3Facts}
                  </button>
                </div>
                <div className="space-y-1.5">
                  {(sc.aiaFacts || []).map((fact, idx) => {
                    const active = selectedFactIdxs.includes(idx);
                    const parsed = _summarizeFactClause(fact);
                    const isExpanded = expandedFactIdxs.includes(idx);
                    return (
                      <div
                        key={idx}
                        className={`w-full px-2.5 py-2 rounded-xl border transition-all ${
                          active
                            ? "bg-emerald-50 border-emerald-500 text-emerald-950 shadow-sm"
                            : "bg-white border-slate-200 text-slate-700"
                        }`}
                      >
                        <div className="flex items-center justify-between gap-2">
                          <button
                            type="button"
                            onClick={() =>
                              setSelectedFactIdxs((prev) => toggleIdxInList(prev, idx))
                            }
                            className="flex items-center gap-2 text-left min-w-0 flex-1 text-xs font-extrabold"
                          >
                            <span className="shrink-0 text-sm">{active ? "☑️" : "⬜"}</span>
                            <span className="truncate">{parsed.summary}</span>
                          </button>
                          {parsed.detail && (
                            <button
                              type="button"
                              onClick={() =>
                                setExpandedFactIdxs((prev) => toggleIdxInList(prev, idx))
                              }
                              className="text-[10px] font-extrabold text-slate-500 hover:text-[#ed1b2e] shrink-0 px-1.5 py-0.5 rounded bg-white/80 border border-slate-200"
                            >
                              {ui.detailsBtn} {isExpanded ? "▴" : "▾"}
                            </button>
                          )}
                        </div>
                        {isExpanded && parsed.detail && (
                          <div className="mt-1 pl-6 text-[11px] font-medium text-slate-700 leading-snug">
                            {parsed.full}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="space-y-1">
                <div className="text-xs font-extrabold text-slate-900">{ui.pickAdvisoryStyle}</div>
                <div className="flex flex-wrap gap-1.5">
                  {ui.advisoryStyles.map((as) => {
                    const active = advisoryStyleId === as.id;
                    return (
                      <button
                        key={as.id}
                        type="button"
                        onClick={() => setAdvisoryStyleId(as.id)}
                        className={`px-2.5 py-1.5 rounded-xl border text-xs font-extrabold transition-all flex-1 min-w-[105px] ${
                          active
                            ? "bg-[#ed1b2e] border-[#ed1b2e] text-white shadow-sm"
                            : "bg-white hover:bg-red-50/50 border-slate-200 text-slate-800 hover:border-[#ed1b2e]"
                        }`}
                      >
                        {as.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Collapsed Optional Meeting Closer Touch */}
              <div>
                <button
                  type="button"
                  onClick={() => setShowEmailTouch((v) => !v)}
                  className={`px-3 py-1.5 rounded-full border text-[11px] font-extrabold transition-all ${
                    showEmailTouch || emailPersonalNote.trim()
                      ? "bg-amber-50 border-amber-300 text-amber-950"
                      : "bg-white border-slate-300 text-slate-700 hover:border-[#ed1b2e]"
                  }`}
                >
                  {emailPersonalNote.trim() ? `✓ 💡 ${emailPersonalNote.trim()}` : ui.personalTouchBtn}{" "}
                  {showEmailTouch ? "▴" : "▾"}
                </button>

                {showEmailTouch && (
                  <div className="mt-1.5 bg-white border border-slate-200 rounded-xl p-2.5 space-y-2">
                    <div className="flex flex-wrap gap-1">
                      {(pb.closeHints || []).map((cTxt, cIdx) => {
                        const isUsed = emailPersonalNote === cTxt;
                        return (
                          <button
                            key={cIdx}
                            type="button"
                            onClick={() => setEmailPersonalNote(isUsed ? "" : cTxt)}
                            className={`px-2.5 py-1 rounded-full border text-[11px] font-bold transition-all ${
                              isUsed
                                ? "bg-amber-100 border-amber-400 text-amber-950"
                                : "bg-slate-50 hover:bg-amber-50 border-slate-300 text-slate-700"
                            }`}
                          >
                            {isUsed ? "✓ " : "+ "}{cTxt}
                          </button>
                        );
                      })}
                    </div>
                    <input
                      type="text"
                      value={emailPersonalNote}
                      onChange={(e) => setEmailPersonalNote(e.target.value)}
                      placeholder={ui.closeTouchPlaceholder}
                      className="w-full bg-slate-50 focus:bg-white border border-slate-200 focus:border-[#ed1b2e] rounded-lg px-3 py-2 text-base sm:text-xs text-slate-900 font-medium focus:outline-none"
                    />
                  </div>
                )}
              </div>

              {renderStepPromptAndRctfc(3)}

              <button
                type="button"
                onClick={() => handleGenerateEmail("")}
                disabled={isBusy}
                className="w-full rounded-2xl py-3 sm:py-3.5 px-4 bg-slate-900 hover:bg-slate-800 disabled:opacity-75 text-white font-extrabold text-sm sm:text-base shadow-md transition-all"
              >
                {isBusy ? ui.emailDrafting : emailText ? ui.emailRegenerateBtn : ui.emailGenerateBtn}
              </button>
            </div>
          )}

          {emailText && (
            <div className="bg-blue-50/60 border-2 border-blue-400 rounded-2xl p-3 space-y-2 shadow-sm">
              <div className="text-xs font-extrabold text-blue-950">
                {ui.emailPreviewHeader}
              </div>
              <textarea
                rows={5}
                value={emailText}
                onChange={(e) => setEmailText(e.target.value)}
                className="w-full bg-white border border-blue-300 rounded-xl p-2.5 text-base sm:text-sm text-slate-900 leading-relaxed focus:outline-none focus:border-[#ed1b2e]"
              />
              <div className="flex flex-wrap items-center gap-1.5">
                <span className="text-[11px] font-extrabold text-blue-950 mr-0.5">
                  {ui.quickPolishLabel}
                </span>
                {ui.emailPolishes.map((pol, pIdx) => (
                  <button
                    key={pIdx}
                    type="button"
                    disabled={isBusy}
                    onClick={() => handleGenerateEmail(pol.inst)}
                    className="px-2.5 py-1 rounded-full bg-white hover:bg-blue-100 border border-blue-400 text-[11px] font-extrabold text-blue-950 transition-all"
                  >
                    {pol.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="flex flex-wrap justify-between items-center gap-2 pt-0.5">
            <button
              type="button"
              onClick={() => setStep(2)}
              className="px-3.5 py-2 rounded-xl bg-white border border-slate-300 text-xs font-extrabold text-slate-700"
            >
              {ui.backBtn}
            </button>
            {!whatsappText.trim() && emailText.trim() ? (
              <button
                type="button"
                onClick={() => setStep(2)}
                className="py-2.5 px-4 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs sm:text-sm font-extrabold shadow"
              >
                💬 Draft Step 2 WhatsApp →
              </button>
            ) : (
              <button
                type="button"
                onClick={handleFinalSubmit}
                disabled={isBusy || !readyToSubmit}
                className={`rounded-2xl py-3 sm:py-3.5 px-4 sm:px-5 font-extrabold text-sm sm:text-base shadow-md transition-all ${
                  readyToSubmit
                    ? "bg-[#ed1b2e] hover:bg-[#c8102e] text-white"
                    : "bg-slate-200 text-slate-400 cursor-not-allowed"
                }`}
              >
                {isBusy ? ui.submittingBtn : ui.finalSubmitBtn}
              </button>
            )}
          </div>
                </>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
};
