/* ============================================================================
   Shared Multilingual Dictionary — PRUMDA Learning Trip:
   - Mandarin (zh-CN)
   - Cantonese (yue / zh-TW)
   - Tamil (ta)
   - Bahasa Melayu (ms)
   - English (en)
   Plus Studio Portrait Compositor
============================================================================ */

window.PAMB_LANGUAGES = [
  { code: "en", label: "English", short: "EN", flag: "🇲🇾", speechLang: "en-US" },
  { code: "zh-CN", label: "华语 (Mandarin)", short: "华语", flag: "🇲🇾", speechLang: "zh-CN" },
  { code: "yue", label: "廣東話 (Cantonese)", short: "粵語", flag: "🇲🇾", speechLang: "zh-HK" },
  { code: "ms", label: "Bahasa Melayu", short: "BM", flag: "🇲🇾", speechLang: "ms-MY" },
  { code: "ta", label: "தமிழ் (Tamil)", short: "தமிழ்", flag: "🇲🇾", speechLang: "ta-MY" },
];

window.PAMB_REGIONS = [];

const _CANTONESE_I18N = {
  appTitle: "PRUMDA Learning Trip • AI 實戰擂台",
  appSubtitle: "11月11日 新加坡 Google 總部 • 實戰挑戰擂台",
  joinHeading: "歡迎加入 PRUMDA Learning Trip",
  joinSub: "專為 PRUMDA Learning Trip 🇲🇾 領袖團隊而設 — 請揀選你慣用嘅語言（英文 / 華語 / 廣東話 / 馬來語 / 淡米爾語）並輸入你嘅姓名。",
  yourName: "你嘅姓名 / 職銜 (例如: Dato' Jason / 區域總監)",
  yourLang: "揀選你嘅介面與 AI 互動語言",
  enterArenaBtn: "🚀 進入 PRUMDA Learning Trip 大廳並預覽今日議程",
  lobbyWaitBanner: "等待主持人開啟實戰挑戰",
  lobbyReadSub: "請先睇下今日 14:00 – 15:30 嘅三大實戰挑戰同兩場舞台示範。主持人一撳開始，你部手機就會自動解鎖！",
  lockedNotice: "🔒 等主持人開始後自動解鎖",
  c1Tab: "📸 14:00 形象與獲客",
  c2Tab: "🧠 14:20 提示詞對決",
  c3Tab: "🎯 14:35 戰前提案",
  cardTab: "🏆 我嘅戰績",
  c1Title: "挑戰 1 (14:00–14:20)：重塑專業形象與關鍵時刻客戶問候",
  c1Sub: "The GenAI Magic：將你嘅專業相片同客戶問候帶入 AI 時代",
  c1Scenario: "實戰任務：用手機影張自拍（或者上傳相片），揀選 MDRT 高管影棚風格同客戶重要時刻，一鍵生成專屬 AI 形象名片同暖心問候語！",
  c2Title: "挑戰 2 (14:20–14:35)：由簡單提示詞升級至高管級簡報 (Deck Challenge)",
  c2Sub: "運用 5步 R.C.T.F.C. 提示詞教練（角色 · 背景 · 任務 · 格式 · 合規約束）打造 3頁高淨值客戶戰前簡報",
  c2Scenario: "實戰任務：針對大馬專科診所創辦人 Datin Sharifah Aleya（RM 28M 淨資產、RM 4.5M 貸款擔保）個案，不斷改良簡單提示詞直至生成貼近目標嘅 3頁簡報（KPI快照 + RM 6.5M 遺產流動性缺口圖表 + Takaful/Hibah 策略表）！",
  c3Title: "挑戰 3 (14:35–15:05)：客戶人生大事預熱 (賀卡 + WhatsApp + 方案對比電郵)",
  c3Sub: "三步實戰：生成專屬祝賀卡 → 首條 WhatsApp 破冰 → 客觀方案條款對比電郵",
  c3Scenario: "實戰任務：系統會隨機派發一位現有客戶嘅人生大事個案，先整張 AI 祝賀卡，再寫首條 WhatsApp 問候，最後用真實保障條款優勢回覆客戶「想同 AIA 比較」嘅電郵！",
  submitBtn: "🚀 提交作品至大螢幕並同步計分",
  submittedTitle: "作品已經提交並即時投射去主螢幕！",
  submittedSub: "主持人可以喺大螢幕展示你嘅作品同 AI 評分。",
  nextMission: "繼續去下一項挑戰 →",
  viewMyCard: "🏆 睇我嘅 PRUMDA Learning Trip 戰績卡 →",
};

window.PAMB_I18N = {
  "zh-CN": {
    appTitle: "PRUMDA Learning Trip • AI 实战擂台",
    appSubtitle: "11月11日 新加坡 Google 总部 • 实战挑战与演练擂台",
    joinHeading: "欢迎加入 PRUMDA Learning Trip",
    joinSub: "专为 PRUMDA Learning Trip 🇲🇾 精英领袖打造 — 请选择您偏好的语言（华语 / 广东话 / 英文 / 马来语 / 淡米尔语）并输入您的姓名。",
    yourName: "您的姓名 / 职称 (如: Dato' Jason / 区经理)",
    yourLang: "选择您的界面与 AI 互动语言",
    enterArenaBtn: "🚀 进入 PRUMDA Learning Trip 大厅并预览议程",
    lobbyWaitBanner: "等待主持人开启实战挑战",
    lobbyReadSub: "请先预览今日 14:00 – 15:30 的三大实战挑战与两场舞台实景秀。主持人启动后您的手机将自动解锁！",
    lockedNotice: "🔒 等待主持人开启后自动解锁",
    c1Tab: "📸 14:00 形象与获客",
    c2Tab: "🧠 14:20 提示词对决",
    c3Tab: "🎯 14:35 战前提案",
    cardTab: "🏆 我的战绩",
    c1Title: "挑战 1 (14:00–14:20)：重塑专业形象与关键时刻客户触达",
    c1Sub: "The GenAI Magic：将您的个人形象照与客户问候带入 AI 时代",
    c1Scenario: "实战任务：现场拍摄一张自拍照（或上传照片/选用高管头像），选择您的 MDRT/福布斯高管影棚风格与客户重要时刻，一键生成专属 AI 形象名片与高温度问候语！",
    c2Title: "挑战 2 (14:20–14:35)：从简单提示词到高管级提案简报 (Deck Challenge)",
    c2Sub: "运用 5步 R.C.T.F.C. 提示词教练（角色 · 背景 · 任务 · 格式 · 合规约束）打造 3页高净值客户战前简报",
    c2Scenario: "实战任务：针对大马专科诊所创始人 Datin Sharifah Aleya（RM 28M 净资产、RM 4.5M 贷款担保）档案，升级一句话提示词，让 Gemini 生成贴近目标的 3页高管简报（KPI快照 + RM 6.5M 流动性缺口图表 + Takaful/Hibah 策略表）！",
    c3Title: "挑战 3 (14:35–15:05)：客户人生大事战前预热 (贺卡 + WhatsApp + 方案对比邮件)",
    c3Sub: "三步实战：生成专属祝贺卡 → 首条 WhatsApp 破冰 → 客观方案条款对比邮件",
    c3Scenario: "实战任务：针对随机分配的现有客户人生大事（添丁、40岁心脏警钟、新居入伙、升职、扩厂贷款或50岁退休），依次生成祝贺卡、WhatsApp 问候及方案对比友邦（AIA）的客观邮件！",
    submitBtn: "🚀 提交作品至大屏幕并同步得分",
    submittedTitle: "作品已提交并实时投射至主屏幕！",
    submittedSub: "主持人可在 Room Bromo 大屏幕上展示您的作品与 AI 裁判评分。",
    nextMission: "继续前往下一项挑战 →",
    viewMyCard: "🏆 查看我的 PRUMDA Learning Trip 战绩卡 →",
  },
  yue: _CANTONESE_I18N,
  "zh-TW": _CANTONESE_I18N,
  en: {
    appTitle: "PRUMDA Learning Trip",
    appSubtitle: "11 Nov • Google Singapore (Room Bromo) • Live Executive Arena",
    joinHeading: "Welcome to PRUMDA Learning Trip",
    joinSub: "Welcome, Agency Leaders! 🇲🇾 Choose your preferred language (English, Mandarin, Cantonese, Bahasa Melayu, or Tamil) and enter your name to join the live AI Arena.",
    yourName: "Your Name & Title (e.g. Dato' Jason / Agency Manager)",
    yourLang: "Choose Your Preferred Language",
    enterArenaBtn: "🚀 Join PRUMDA Learning Trip Lobby & Preview Agenda",
    lobbyWaitBanner: "WAITING FOR PRESENTER TO LAUNCH CHALLENGE",
    lobbyReadSub: "Preview the 3 Hands-On Challenges (14:00–15:05) and 2 Live Stage Demos (15:05–15:30) below. Your device will unlock automatically!",
    lockedNotice: "🔒 Unlocks when Presenter starts the session",
    c1Tab: "📸 14:00 Image & Outreach",
    c2Tab: "🧠 14:20 Prompt Duel",
    c3Tab: "🎯 14:35 Pre-Pitch",
    cardTab: "🏆 My Score",
    c1Title: "Challenge 1 (14:00–14:20): Reinvent Your Professional Image & Outreach",
    c1Sub: "The GenAI Magic: Taking your headshot and pictures to the AI era",
    c1Scenario: "Task: Snap a live selfie with your camera (or upload a photo), choose an Executive Portrait Style & Client Milestone, and generate your AI Executive Card + VIP Outreach message!",
    c2Title: "Challenge 2 (14:20–14:35): Simple → Enhanced Presentation (Deck Challenge)",
    c2Sub: "Master 5-Step R.C.T.F.C. Prompting (Role · Context · Task · Format · Constraints) to build a 3-Slide HNW Pre-Pitch Deck",
    c2Scenario: "Task: Review the HNW client case file (Datin Sharifah Aleya, RM 28M net worth, RM 4.5M clinic loan guarantee) and iteratively upgrade a simple 1-line prompt until Gemini builds a 3-slide enterprise deck matching the target!",
    c3Title: "Challenge 3 (14:35–15:05): Pre-Pitch Studio (Greeting Card + WhatsApp + Plan Comparison Email)",
    c3Sub: "3-Step Guided Flow: Greeting Card → First-Touch WhatsApp → Factual Plan Comparison Email",
    c3Scenario: "Task: Read your assigned Customer X life-event scenario, generate a Greeting Card (Step 1), craft your First-Touch WhatsApp (Step 2), and counter the customer's AIA Malaysia comparison request via Email (Step 3)!",
    submitBtn: "🚀 Submit to Big Screen & Sync Score",
    submittedTitle: "Submitted Live to the Room Bromo Screen!",
    submittedSub: "Your creation and AI Judge score are now visible on the Presenter Leaderboard & Gallery Wall.",
    nextMission: "Continue to Next Challenge →",
    viewMyCard: "🏆 View My PRUMDA Learning Trip Scorecard →",
  },
  ms: {
    appTitle: "PRUMDA Learning Trip • Arena AI",
    appSubtitle: "11 Nov • Google Singapura (Bilik Bromo) • Arena Eksekutif Langsung",
    joinHeading: "Selamat Datang ke PRUMDA Learning Trip",
    joinSub: "Selamat datang Pemimpin Agensi 🇲🇾 — Pilih bahasa pilihan anda dan masukkan nama anda untuk menyertai Arena AI.",
    yourName: "Nama & Jawatan Anda (cth. Dato' Jason / Pengurus Agensi)",
    yourLang: "Pilih Bahasa Pilihan Anda",
    enterArenaBtn: "🚀 Sertai Lobi PRUMDA Learning Trip & Pratonton Agenda",
    lobbyWaitBanner: "MENUNGGU PENGACARA MEMULAKAN CABARAN",
    lobbyReadSub: "Pratonton 3 Cabaran Interaktif (14:00–15:05) dan 2 Demo Pentas (15:05–15:30) di bawah.",
    lockedNotice: "🔒 Akan dibuka apabila sesi bermula",
    c1Tab: "📸 14:00 Imej AI",
    c2Tab: "🧠 14:20 Dialog AI",
    c3Tab: "🎯 14:35 Pra-Jualan",
    cardTab: "🏆 Skor Saya",
    c1Title: "Cabaran 1 (14:00–14:20): Transformasi Imej Profesional & Hebahan Pelanggan",
    c1Sub: "Keajaiban GenAI: Membawa potret dan gambar anda ke era AI",
    c1Scenario: "Tugas: Ambil swafoto langsung dengan kamera anda (atau muat naik foto), pilih Gaya Potret Eksekutif & Detik Pelanggan untuk menjana Kad Eksekutif AI + mesej VIP!",
    c2Title: "Cabaran 2 (14:20–14:35): Pembentangan Ringkas → Dipertingkat (Deck Challenge)",
    c2Sub: "Kuasai Jurulatih Prompt 5-Langkah R.C.T.F.C. (Peranan · Konteks · Tugasan · Format · Kekangan) untuk membina Dek 3 Slaid",
    c2Scenario: "Tugas: Semak fail kes pelanggan HNW (Datin Sharifah Aleya, nilai bersih RM 28J, jaminan pinjaman klinik RM 4.5J) dan tingkatkan prompt ringkas sehingga Gemini membina dek 3 slaid yang menyamai dek sasaran!",
    c3Title: "Cabaran 3 (14:35–15:05): Pra-Temujanji (Kad Ucapan + WhatsApp + E-mel Perbandingan Pelan)",
    c3Sub: "Aliran 3 Langkah: Kad Ucapan → Mesej WhatsApp → E-mel Perbandingan Fakta Pelan",
    c3Scenario: "Tugas: Baca senario peristiwa hidup Pelanggan X anda, hasilkan Kad Ucapan (Langkah 1), tulis WhatsApp Pertama (Langkah 2), dan jawab permintaan perbandingan AIA Malaysia melalui E-mel (Langkah 3)!",
    submitBtn: "🚀 Hantar ke Skrin Besar & Simpan Skor",
    submittedTitle: "Dihantar Secara Langsung ke Skrin Utama!",
    submittedSub: "Hasil kerja dan skor Hakim AI anda kini dipaparkan di papan pendahulu.",
    nextMission: "Teruskan ke Cabaran Seterusnya →",
    viewMyCard: "🏆 Lihat Kad Skor PRUMDA Learning Trip Saya →",
  },
  ta: {
    appTitle: "PRUMDA Learning Trip • AI அரங்கம்",
    appSubtitle: "நவம்பர் 11 • கூகுள் சிங்கப்பூர் • நேரடி முகவர் போட்டி",
    joinHeading: "PRUMDA Learning Trip-க்கு நல்வரவு!",
    joinSub: "முகமைத் தலைவர்களே வருக 🇲🇾 — உங்கள் விருப்பமான மொழியைத் தேர்ந்தெடுத்து உங்கள் பெயரை உள்ளிடவும்.",
    yourName: "உங்கள் பெயர் & பதவி (எ.கா. Dato' Jason / முகமை மேலாளர்)",
    yourLang: "உங்கள் விருப்பமான மொழியைத் தேர்ந்தெடுக்கவும்",
    enterArenaBtn: "🚀 PRUMDA Learning Trip அரங்கில் இணைந்து நிகழ்ச்சி நிரலைப் பார்க்கவும்",
    lobbyWaitBanner: "நிகழ்ச்சித் தொகுப்பாளர் போட்டியைத் தொடங்க காத்திருக்கிறது",
    lobbyReadSub: "இன்றைய 3 நேரடி AI சவால்களை (14:00–15:05) கீழே முன்னோட்டமிடுங்கள். போட்டி தொடங்கியதும் உங்கள் திரை தானாகத் திறக்கும்!",
    lockedNotice: "🔒 தொகுப்பாளர் தொடங்கியதும் திறக்கப்படும்",
    c1Tab: "📸 14:00 AI படம்",
    c2Tab: "🧠 14:20 ப்ராம்ட்",
    c3Tab: "🎯 14:35 முன்பதிவு",
    cardTab: "🏆 மதிப்பெண்",
    c1Title: "சவால் 1 (14:00–14:20): தொழில்முறை தோற்றம் & வாடிக்கையாளர் வாழ்த்து",
    c1Sub: "GenAI மாயாஜாலம்: உங்கள் புகைப்படத்தை AI யுகத்திற்கு கொண்டு செல்லுங்கள்",
    c1Scenario: "பணி: செல்ஃபி எடுத்து அல்லது புகைப்படத்தைப் பதிவேற்றி, வாடிக்கையாளர் வாழ்த்து அட்டையை உருவாக்குங்கள்!",
    c2Title: "சவால் 2 (14:20–14:35): எளிய → மேம்படுத்தப்பட்ட விளக்கக்காட்சி (Deck Challenge)",
    c2Sub: "5-படி R.C.T.F.C. பயிற்சியாளரைப் பயன்படுத்தி 3-ஸ்லைடு முன்-முன்மொழிவு விளக்கக்காட்சியை உருவாக்குதல்",
    c2Scenario: "பணி: வாடிக்கையாளர் கோப்பைப் (Datin Sharifah Aleya, RM 28M நிகர சொத்து) படித்து, 3-ஸ்லைடு இலக்கு விளக்கக்காட்சிக்குப் பொருந்தும் வகையில் எளிய ப்ராம்ப்டை மேம்படுத்தி சமர்ப்பிக்கவும்!",
    c3Title: "சவால் 3 (14:35–15:05): வாடிக்கையாளர் முன்-பிற்ச் (வாழ்த்து அட்டை + WhatsApp + ஒப்பீட்டு மின்னஞ்சல்)",
    c3Sub: "3 படிகள்: வாழ்த்து அட்டை → முதல் WhatsApp செய்தி → திட்ட ஒப்பீட்டு மின்னஞ்சல்",
    c3Scenario: "பணி: உங்களுக்கு வழங்கப்பட்ட வாடிக்கையாளர் நிகழ்வைப் படித்து, படி 1-ல் வாழ்த்து அட்டை, படி 2-ல் WhatsApp செய்தி, மற்றும் படி 3-ல் AIA மலேசியா ஒப்பீட்டு மின்னஞ்சலை உருவாக்கி சமர்ப்பிக்கவும்!",
    submitBtn: "🚀 பெரிய திரைக்கு சமர்ப்பித்து மதிப்பெண் பெறுக",
    submittedTitle: "வெற்றிகரமாக சமர்ப்பிக்கப்பட்டது!",
    submittedSub: "உங்கள் படைப்பும் மதிப்பெண்ணும் பிரதான திரையில் காட்டப்படுகின்றன.",
    nextMission: "அடுத்த சவாலுக்குச் செல்லவும் →",
    viewMyCard: "🏆 எனது PRUMDA Learning Trip மதிப்பெண் அட்டை →",
  },
};

window.formatMMSS = function (totalSec) {
  const s = Math.max(0, Math.floor(totalSec || 0));
  const m = Math.floor(s / 60);
  const rem = s % 60;
  return `${String(m).padStart(2, "0")}:${String(rem).padStart(2, "0")}`;
};

window.composeExecutivePortraitCard = function ({
  rawImageDataUrl,
  styleKey = "mdrt_keynote",
  agentName = "PRUMDA Leader",
  region = "",
  motto = "Protecting Malaysian Families",
  avatarIndex = 0,
}) {
  return new Promise((resolve) => {
    const canvas = document.createElement("canvas");
    canvas.width = 560;
    canvas.height = 680;
    const ctx = canvas.getContext("2d");

    const palettes = {
      mdrt_keynote: {
        bg1: "#1a1207",
        bg2: "#0a0d16",
        accent: "#f59e0b",
        badge: "💎 MDRT EXECUTIVE STUDIO",
        glow: "rgba(245, 158, 11, 0.38)",
      },
      forbes_studio: {
        bg1: "#0a192f",
        bg2: "#070b14",
        accent: "#38bdf8",
        badge: "🏛️ FORBES WEALTH LEADER",
        glow: "rgba(56, 189, 248, 0.35)",
      },
      family_advisor: {
        bg1: "#08221b",
        bg2: "#080d14",
        accent: "#10b981",
        badge: "🌿 PREMIER FAMILY OFFICE",
        glow: "rgba(16, 185, 129, 0.35)",
      },
      festive_vip: {
        bg1: "#2c0910",
        bg2: "#120609",
        accent: "#fbbf24",
        badge: "🧧 PRUMDA PROSPERITY VIP",
        glow: "rgba(237, 27, 46, 0.45)",
      },
    };
    const pal = palettes[styleKey] || palettes.mdrt_keynote;

    const drawFrameAndOverlays = (imgEl) => {
      const grad = ctx.createLinearGradient(0, 0, 560, 680);
      grad.addColorStop(0, pal.bg1);
      grad.addColorStop(1, pal.bg2);
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 560, 680);

      const rad = ctx.createRadialGradient(280, 250, 30, 280, 250, 290);
      rad.addColorStop(0, pal.glow);
      rad.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = rad;
      ctx.fillRect(0, 0, 560, 680);

      ctx.save();
      ctx.beginPath();
      ctx.roundRect(45, 78, 470, 410, 28);
      ctx.clip();

      if (imgEl) {
        ctx.filter =
          styleKey === "forbes_studio"
            ? "contrast(1.14) saturate(1.08) brightness(1.04)"
            : styleKey === "festive_vip"
            ? "contrast(1.12) saturate(1.22) brightness(1.05)"
            : "contrast(1.12) saturate(1.15) brightness(1.05)";
        const scale = Math.max(470 / imgEl.width, 410 / imgEl.height);
        const w = imgEl.width * scale;
        const h = imgEl.height * scale;
        const x = 45 + (470 - w) / 2;
        const y = 78 + (410 - h) / 2;
        ctx.drawImage(imgEl, x, y, w, h);
        ctx.filter = "none";

        const vig = ctx.createLinearGradient(0, 320, 0, 488);
        vig.addColorStop(0, "rgba(0,0,0,0)");
        vig.addColorStop(1, "rgba(6,8,15,0.88)");
        ctx.fillStyle = vig;
        ctx.fillRect(45, 78, 470, 410);
      } else {
        const avGrad = ctx.createLinearGradient(45, 78, 515, 488);
        avGrad.addColorStop(0, pal.bg1);
        avGrad.addColorStop(1, "#1e293b");
        ctx.fillStyle = avGrad;
        ctx.fillRect(45, 78, 470, 410);

        const halo = ctx.createRadialGradient(280, 260, 20, 280, 260, 170);
        halo.addColorStop(0, pal.accent);
        halo.addColorStop(1, "rgba(0,0,0,0)");
        ctx.globalAlpha = 0.35;
        ctx.fillStyle = halo;
        ctx.fillRect(45, 78, 470, 410);
        ctx.globalAlpha = 1.0;

        ctx.fillStyle = "#0f172a";
        ctx.beginPath();
        ctx.arc(280, 470, 145, Math.PI, 0, false);
        ctx.fill();

        ctx.fillStyle = "#ed1b2e";
        ctx.beginPath();
        ctx.moveTo(280, 355);
        ctx.lineTo(298, 440);
        ctx.lineTo(280, 475);
        ctx.lineTo(262, 440);
        ctx.closePath();
        ctx.fill();

        ctx.fillStyle = "#e2e8f0";
        ctx.beginPath();
        ctx.arc(280, 240, 62, 0, Math.PI * 2);
        ctx.fill();

        const emojis = ["👔", "👩‍💼", "🤵", "🌟"];
        ctx.font = "68px sans-serif";
        ctx.textAlign = "center";
        ctx.fillText(emojis[avatarIndex % emojis.length], 280, 264);
      }
      ctx.restore();

      ctx.strokeStyle = pal.accent;
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.roundRect(45, 78, 470, 410, 28);
      ctx.stroke();

      ctx.fillStyle = "rgba(10, 13, 22, 0.88)";
      ctx.beginPath();
      ctx.roundRect(36, 22, 275, 38, 19);
      ctx.fill();
      ctx.strokeStyle = pal.accent;
      ctx.lineWidth = 1.5;
      ctx.stroke();

      ctx.fillStyle = pal.accent;
      ctx.font = "bold 13px sans-serif";
      ctx.textAlign = "left";
      ctx.fillText(pal.badge, 52, 46);

      ctx.fillStyle = "#ed1b2e";
      ctx.beginPath();
      ctx.roundRect(350, 22, 174, 38, 19);
      ctx.fill();
      ctx.fillStyle = "#ffffff";
      ctx.font = "bold 13px sans-serif";
      ctx.textAlign = "center";
      ctx.fillText("🇲🇾 PRUMDA", 437, 46);

      ctx.fillStyle = "rgba(12, 16, 28, 0.95)";
      ctx.beginPath();
      ctx.roundRect(36, 506, 488, 146, 22);
      ctx.fill();
      ctx.strokeStyle = "rgba(255,255,255,0.14)";
      ctx.lineWidth = 1.5;
      ctx.stroke();

      ctx.fillStyle = "#ffffff";
      ctx.font = "bold 26px sans-serif";
      ctx.textAlign = "left";
      ctx.fillText((agentName || "PRUMDA Leader").slice(0, 28), 58, 548);

      ctx.fillStyle = pal.accent;
      ctx.font = "bold 14px sans-serif";
      ctx.fillText("🇲🇾 PRUMDA Learning Trip • Agency Leader", 58, 575);

      ctx.strokeStyle = "rgba(255,255,255,0.12)";
      ctx.beginPath();
      ctx.moveTo(58, 590);
      ctx.lineTo(500, 590);
      ctx.stroke();

      ctx.fillStyle = "#cbd5e1";
      ctx.font = "italic 14px sans-serif";
      const cleanMotto = (motto || "Listening. Understanding. Delivering.").slice(0, 58);
      ctx.fillText(`"${cleanMotto}"`, 58, 618);

      ctx.fillStyle = "#94a3b8";
      ctx.font = "bold 11px monospace";
      ctx.fillText("VERIFIED BY GEMINI AI STUDIO • PRUMDA LEARNING TRIP", 58, 640);

      try {
        resolve(canvas.toDataURL("image/jpeg", 0.86));
      } catch (e) {
        resolve(null);
      }
    };

    if (rawImageDataUrl) {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.onload = () => drawFrameAndOverlays(img);
      img.onerror = () => drawFrameAndOverlays(null);
      img.src = rawImageDataUrl;
    } else {
      drawFrameAndOverlays(null);
    }
  });
};
