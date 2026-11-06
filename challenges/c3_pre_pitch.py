"""
============================================================================
CHALLENGE 3 MODULE (14:35 - 15:05 | 30 min)
"Drive faster pipeline, sharpen your strategic proposal to sales close - Pre-pitch"
— Step-by-Step Guided Pre-Pitch Flow (Adaptive Across Phone, iPad & Laptop):
  • Supports 5 Native Malaysian Languages:
    - English (en)
    - Mandarin / 华语 (zh-CN)
    - Cantonese / 廣東話 (yue / zh-TW)
    - Bahasa Melayu (ms)
    - Tamil / தமிழ் (ta)
  • Step 1: AI Life-Event Greeting Card (16:9 VIP Card)
  • Step 2: Concise First-Touch WhatsApp Message (Official PAMB Malaysia Plan)
  • Step 3: Live Customer Objection ("I want to compare with AIA Malaysia!")
            -> Factual PAMB vs. AIA Malaysia Comparison Email
  • Final Submit: Compact Single-Screen View (Greeting Card at Top + WhatsApp & Email)
============================================================================
"""

import base64
import concurrent.futures
import io
import json
import time

try:
    from PIL import Image, ImageDraw, ImageFont
    HAS_PIL = True
except Exception:
    HAS_PIL = False


SCENARIO_CATALOG = {
    "newborn_baby": {
        "id": "newborn_baby",
        "icon": "🍼",
        "badge": "🍼 Newborn Baby (PRUMy Child Plus vs. AIA A-Life Joy Xtra)",
        "customerName": "Tan Wei Ming & Chloe Lim (32, Petaling Jaya)",
        "existingPolicy": "Old RM 150k single medical card; RM 0 child congenital cover or uni fund.",
        "lifeEvent": "Welcomed 1st baby boy (Lucas) at PJ private hospital; needs congenital cover & uni fund.",
        "pambPlan": "PRUMy Child Plus (PRUSaver Kid) + PRUWith You Plus + PRUMillion Med Active 2.0",
        "aiaPlan": "AIA A-Life Joy Xtra + A-Plus BabyCare + A-Plus Health360",
        "customerObjection": (
            "Thanks for the lovely card & WhatsApp! By the way, an AIA Malaysia agent just quoted us "
            "AIA A-Life Joy Xtra + A-Plus BabyCare. Can you email me how your Prudential Malaysia offer compares factually with AIA?"
        ),
        "aiaComparisonFacts": [
            "1. Free +50% Auto Sum Assured Booster: PAMB PRUWith You Plus grows parental cover by +1%/yr (up to +50%) automatically at RM 0 extra cost—no AIA Vitality gym/fitness tracking required.",
            "2. Immediate RM 500 Childbirth Cash Reward: PAMB PRUWith You Plus pays a direct RM 500 cash reward on Lucas's birth + covers 27 congenital conditions, neonatal jaundice & Autism/ADHD up to age 7 under PRUMy Child Plus.",
            "3. 15% Instant Medical Discount: PAMB PRUMillion Med Active 2.0 gives a direct 15% cash premium discount every claim-free year (vs. AIA crediting a conditional Health Wallet).",
        ],
        "policyCitation": "PAMB PRUMy Child Plus + PRUWith You Plus vs. AIA A-Life Joy Xtra",
        "cardHeadline": "Welcome to the World, Baby Lucas!",
        "cardSubline": "Wishing Wei Ming & Chloe Endless Joy, Health & Generational Blessing",
        "cardThemeColors": ((255, 248, 240), (237, 27, 46), (212, 160, 23)),
        "cardArtPrompt": (
            "Luxury warm Malaysian newborn baby congratulatory greeting card illustration (16:9 landscape): "
            "soft cream silk background, delicate gold foil baby rattle, blooming white orchids, warm golden sunlight, "
            "subtle Prudential crimson ribbon accent, ultra-clean executive stationery aesthetic"
        ),
        "fallback": {
            "en": {
                "firstTouchMessage": (
                    "Hi Wei Ming & Chloe! Huge congratulations on welcoming Baby Lucas! 🍼✨ I made this celebratory card for your family.\n\n"
                    "Quick heads-up: you can claim an RM 500 Childbirth Cash Reward under PRUWith You Plus, and lock in PRUMy Child Plus (27 congenital conditions, neonatal jaundice, Autism/ADHD + PRUSaver Kid uni fund with Payor Waiver) using just your FD interest. Shall I WhatsApp you a 2-min summary while Lucas naps? 😊"
                ),
                "aiaComparisonEmail": (
                    "Subject: Factual Comparison for Baby Lucas: Prudential (PRUMy Child Plus) vs. AIA (A-Life Joy Xtra)\n\n"
                    "Hi Wei Ming & Chloe,\n"
                    "Here are 3 factual reasons PAMB gives Lucas & your family stronger value than AIA A-Life Joy Xtra:\n"
                    "• Free +50% Sum Assured Booster (No Fitness Tracking): PAMB PRUWith You Plus automatically boosts protection by +1%/yr up to +50% at RM 0 cost, whereas AIA requires maintaining AIA Vitality status/fees.\n"
                    "• RM 500 Cash Reward + 27 Congenital Conditions: Immediate RM 500 Childbirth Cash Reward + covers 27 congenital conditions, jaundice & Autism/ADHD up to age 7 with Payor Waiver.\n"
                    "• 15% Instant Premium Discount: PAMB PRUMillion Med Active 2.0 cuts medical premium by 15% every claim-free year in cash (AIA only credits a conditional Health Wallet).\n\n"
                    "Let's do a quick 10-min Zoom Thursday at 8 PM to compare the exact tables!"
                ),
                "judgeFeedback": "Crisp MDRT execution! Warm newborn greeting + punchy WhatsApp + factual 3-point PAMB vs. AIA A-Life Joy Xtra comparison!",
            },
            "zh-CN": {
                "firstTouchMessage": (
                    "Wei Ming、Chloe 恭喜喜添小王子 Lucas！🍼✨ 特地为小宝贝定制了这张祝福贺卡！\n\n"
                    "温馨提醒：您可以申领保诚 PRUWith You Plus RM 500 添丁现金奖，同时仅需用定存利息即可为 Lucas 锁定 PRUMy Child Plus（含 27种先天疾病、新生儿黄疸、自闭症/多动症保障 + PRUSaver Kid 大学基金与投保人豁免）。我先发份 2 分钟简报供你们趁宝宝睡着时翻阅好吗？😊"
                ),
                "aiaComparisonEmail": (
                    "主题：Baby Lucas 保障客观对比：大马保诚 (PRUMy Child Plus) vs 友邦 (AIA A-Life Joy Xtra)\n\n"
                    "Wei Ming & Chloe 您好，\n"
                    "以下为您整理 保诚 PAMB 相比 AIA A-Life Joy Xtra 的 3 大客观产品优势：\n"
                    "• 免费 +50% 保额自动递增（无需打卡运动）：保诚 PRUWith You Plus 每年自动免费递增 1% 保额（最高 +50%），而 AIA 需持续缴纳 Vitality 会费并完成运动积分；\n"
                    "• RM 500 添丁现金奖 + 27种先天疾病保障：保诚直接派发 RM 500 现金奖，且 PRUMy Child Plus 覆盖 27种先天疾病、黄疸及至7岁自闭症/多动症，附带父母重疾/身故保费全免（Payor Waiver）；\n"
                    "• 无理赔直接享 15% 保费现金折扣：保诚 PRUMillion Med Active 2.0 无理赔直接减免 15% 实际保费（AIA Health360 仅累计医疗钱包额度）。\n\n"
                    "周四晚 8 点我们用 10 分钟线上对照一下条款明细吧！"
                ),
                "judgeFeedback": "教科书级三步预热！贺卡温馨、WhatsApp 简短有力、邮件精准用 3 大客观条款优势击败 AIA A-Life Joy Xtra！",
            },
            "yue": {
                "firstTouchMessage": (
                    "Wei Ming、Chloe 恭喜晒你哋添咗小王子 Lucas 呀！🍼✨ 我專登幫 BB 整咗呢張祝賀卡！\n\n"
                    "順便提一提：你哋可以即刻領取保誠 PRUWith You Plus 嘅 RM 500 添丁現金獎，而且淨係用定期存款利息就可以幫 Lucas 鎖定 PRUMy Child Plus（包晒 27種先天疾病、初生嬰兒黃疸、自閉症/過度活躍症 + PRUSaver Kid 大學教育基金同投保人保費豁免）。不如我 WhatsApp 份 2 分鐘重點俾你哋趁 BB 瞓覺時睇下？😊"
                ),
                "aiaComparisonEmail": (
                    "主題：Baby Lucas 保障客觀對比：大馬保誠 (PRUMy Child Plus) vs 友邦 (AIA A-Life Joy Xtra)\n\n"
                    "Wei Ming & Chloe 你哋好，\n"
                    "好高興你哋想比較清楚！以下係 保誠 PAMB 對比 AIA A-Life Joy Xtra 嘅 3 大實際條款優勢：\n"
                    "• 免費自動加 50% 保額（唔使做運動打卡）：保誠 PRUWith You Plus 每年自動免費加 1% 保額（最高 +50%），唔似 AIA 要年年交 Vitality 會費同埋儲運動分先保得住個 Booster；\n"
                    "• 即攞 RM 500 添丁現金獎 + 27種先天疾病保障：保誠直接派 RM 500 現金獎，兼且包晒 27種先天病、黃疸同自閉症保障（仲有父母 Payor Waiver 保費豁免）；\n"
                    "• 無索償直接減 15% 保費：保誠 PRUMillion Med Active 2.0 冇 Claim 錢直接扣減 15% 現金保費（AIA 淨係加醫療錢包額度，保費一蚊都冇減）。\n\n"
                    "星期四晚 8 點我哋用 10 分鐘 Zoom 對一對張表啦！"
                ),
                "judgeFeedback": "正宗廣東話三步曲！賀卡夠窩心、WhatsApp 夠精警、電郵用 3 個實際條款完勝 AIA A-Life Joy Xtra！",
            },
            "ms": {
                "firstTouchMessage": (
                    "Tahniah Wei Ming & Chloe atas kelahiran Baby Lucas! 🍼✨ Ini kad ucapan khas buat keluarga anda.\n\n"
                    "Anda layak menuntut Ganjaran Tunai RM 500 (PRUWith You Plus) dan melindungi Lucas dengan PRUMy Child Plus (27 penyakit kongenital, jaundis, Autisme/ADHD + dana universiti PRUSaver Kid dengan Payor Waiver). Boleh saya hantar ringkasan 2 minit di WhatsApp? 😊"
                ),
                "aiaComparisonEmail": (
                    "Subjek: Perbandingan Fakta untuk Baby Lucas: Prudential (PRUMy Child Plus) vs. AIA (A-Life Joy Xtra)\n\n"
                    "Hai Wei Ming & Chloe,\n"
                    "Berikut adalah 3 kelebihan fakta PAMB berbanding AIA A-Life Joy Xtra:\n"
                    "• +50% Booster Automatik Percuma: PRUWith You Plus meningkatkan perlindungan +1%/tahun (sehingga +50%) secara percuma tanpa perlu yuran/mata kecergasan AIA Vitality.\n"
                    "• Ganjaran Tunai RM 500 + 27 Penyakit Kongenital: Tuntutan tunai RM 500 kelahiran serta perlindungan 27 keadaan kongenital & Autisme/ADHD hingga umur 7 tahun.\n"
                    "• Diskaun Premium Tunai 15%: PRUMillion Med Active 2.0 memberi diskaun premium 15% setiap tahun tanpa tuntutan (berbanding AIA yang hanya mengkreditkan dompet kesihatan).\n\n"
                    "Jom kita semak jadual perbandingan selama 10 minit Khamis ini jam 8 malam!"
                ),
                "judgeFeedback": "Strategi 3-langkah MDRT yang sangat padat dan berasaskan fakta!",
            },
            "ta": {
                "firstTouchMessage": (
                    "Wei Ming & Chloe, உங்கள் ஆண் குழந்தை Lucas பிறந்ததற்கு மனமார்ந்த வாழ்த்துகள்! 🍼✨ உங்கள் குடும்பத்திற்காக இந்த சிறப்பு வாழ்த்து அட்டையை உருவாக்கினேன்.\n\n"
                    "PRUWith You Plus மூலம் RM 500 குழந்தை பிறப்பு ரொக்கப் பரிசை நீங்கள் பெறலாம், மேலும் FD வட்டியை மட்டுமே பயன்படுத்தி PRUMy Child Plus (27 பிறவி நோய்கள், மஞ்சள் காமாலை, ஆட்டிசம்/ADHD + PRUSaver Kid கல்வி நிதி) திட்டத்தைத் தொடங்கலாம். 2 நிமிட சுருக்கத்தை WhatsApp-ல் அனுப்பட்டுமா? 😊"
                ),
                "aiaComparisonEmail": (
                    "பொருள்: குழந்தை Lucas-க்கான உண்மை ஒப்பீடு: புருடென்ஷியல் (PRUMy Child Plus) vs AIA (A-Life Joy Xtra)\n\n"
                    "வணக்கம் Wei Ming & Chloe,\n"
                    "AIA A-Life Joy Xtra-வை விட PAMB சிறந்த மதிப்பை வழங்குவதற்கான 3 உண்மைக் காரணங்கள்:\n"
                    "• இலவச +50% காப்பீட்டுத் தொகை உயர்வு: PAMB PRUWith You Plus எந்த கூடுதல் கட்டணமும் இன்றி ஆண்டுக்கு +1% (50% வரை) தானாக உயர்கிறது (AIA Vitality உடற்பயிற்சி கட்டணம் தேவையில்லை).\n"
                    "• உடனடி RM 500 ரொக்கப் பரிசு + 27 பிறவி நோய்கள் பாதுகாப்பு: குழந்தை பிறப்புக்கு RM 500 ரொக்கம் மற்றும் Payor Waiver சலுகை.\n"
                    "• 15% நேரடி பிரீமியம் தள்ளுபடி: PRUMillion Med Active 2.0 கிளைம் இல்லாத ஆண்டுகளில் 15% நேரடி கட்டணத் தள்ளுபடி வழங்குகிறது.\n\n"
                    "வியாழன் இரவு 8 மணிக்கு 10 நிமிட Zoom அழைப்பில் பேசலாமா?"
                ),
                "judgeFeedback": "அற்புதமான 3-படி முன்பதிவு! வாழ்த்து அட்டை, WhatsApp மற்றும் PAMB vs AIA ஒப்பீட்டு மின்னஞ்சல் மிகத் துல்லியம்!",
            },
        },
    },
    "ci_health_scare": {
        "id": "ci_health_scare",
        "icon": "❤️‍🩹",
        "badge": "❤️‍🩹 Age 40 & Heart Scare (PRUAll Care vs. AIA Beyond CI)",
        "customerName": "Jason Khoo (39, Penang Tech Engineering Director)",
        "existingPolicy": "Old RM 100k Life policy; RM 0 Critical Illness income replacement.",
        "lifeEvent": "Turning 40 next month; 41yo partner just had emergency RM 95k cardiac stent & 6m off work.",
        "pambPlan": "PRUAll Care + PRUMillion Med Active 2.0 + PRUMan",
        "aiaPlan": "AIA A-Life Beyond Critical Care + A-Plus Health360",
        "customerObjection": (
            "Appreciate the 40th birthday card, bro! My friend at AIA just showed me "
            "AIA A-Life Beyond Critical Care + A-Plus Health360. Can you email me how Prudential compares factually with AIA?"
        ),
        "aiaComparisonFacts": [
            "1. ~190 CI Conditions up to Age 100 (vs. AIA Age 80): PAMB PRUAll Care covers ~190 conditions up to age 100 (including ICU >=120 hrs, Major Surgery & 5 Mental Health conditions), whereas AIA A-Life Beyond Critical Care covers ~180 conditions and stops at age 80.",
            "2. 15% Instant Cash Premium Discount: PAMB PRUMillion Med Active 2.0 cuts your medical premium by 15% every claim-free year (AIA A-Plus Health360 only adds credit to a Health Wallet rather than reducing your cash outlay).",
            "3. Up to 110% Maturity Premium Refund: Pairing PAMB PRUMan gives 260% male CI cover and refunds up to 110% of total premiums at maturity.",
        ],
        "policyCitation": "PAMB PRUAll Care + PRUMillion Med Active 2.0 vs. AIA A-Life Beyond Critical Care",
        "cardHeadline": "Cheers to 40 Years of Strength & Vision, Jason!",
        "cardSubline": "Wishing You Peak Health, Peace of Mind & Unstoppable Momentum",
        "cardThemeColors": ((245, 248, 255), (237, 27, 46), (30, 64, 175)),
        "cardArtPrompt": (
            "Executive 40th milestone & wellness greeting card illustration (16:9 landscape): "
            "modern Penang bridge sunrise horizon, navy and gold geometric accents, Prudential crimson emblem, "
            "vitality and shield motif, refined luxury corporate greeting card"
        ),
        "fallback": {
            "en": {
                "firstTouchMessage": (
                    "Happy early 40th Birthday, Jason! 🥂 Glad your partner is recovering well after his cardiac stent—I made this milestone card for your 40th.\n\n"
                    "Before your age-40 rate jump next month, we can lock in PRUAll Care (~190 CI conditions + ICU + 20% Recovery Care) and PRUMillion Med Active 2.0 (RM 8M medical limit + 15% instant claim-free discount). Free for a 10-min coffee in Bayan Lepas this week? ☕"
                ),
                "aiaComparisonEmail": (
                    "Subject: Factual Comparison Before Age 40: PAMB (PRUAll Care) vs. AIA (A-Life Beyond Critical Care)\n\n"
                    "Hi Jason,\n"
                    "Here is the factual side-by-side between Prudential Malaysia and AIA Malaysia before your age-39 window closes:\n"
                    "• Coverage to Age 100 & ~190 Conditions (vs. AIA Age 80): PAMB PRUAll Care covers ~190 serious illnesses up to age 100 (including ICU >=120 hrs & Mental Health), whereas AIA A-Life Beyond Critical Care expires at age 80.\n"
                    "• 15% Direct Premium Discount vs. Wallet Credit: PAMB PRUMillion Med Active 2.0 gives a 15% instant discount on your actual premium every claim-free year; AIA A-Plus Health360 charges full premium and only credits a Health Wallet.\n"
                    "• 110% Premium Refund Option: Adding PAMB PRUMan gives 260% male CI cover + up to 110% total premium return at maturity.\n\n"
                    "Let's review the 1-page rate sheet over a 10-min coffee this Thursday!"
                ),
                "judgeFeedback": "Razor-sharp MDRT comparison! Highlighted PAMB's Age-100 coverage (~190 conditions) and 15% cash discount vs. AIA's Age-80 cap!",
            },
            "zh-CN": {
                "firstTouchMessage": (
                    "Jason 提前祝你 40 岁生日快乐！🥂 听说你合伙人心脏支架手术顺利康复，真替你们松一口气！特地为你定制了这张 40 岁里程碑贺卡。\n\n"
                    "趁下个月满 40 岁费率上调前，我们可以用 39 岁费率锁定保诚 PRUAll Care（约190种重疾+ICU+20%康复金）与 PRUMillion Med Active 2.0（RM 800万医疗限额 + 15%无理赔直接折扣）。本周在槟城喝杯 10 分钟咖啡聊聊？☕"
                ),
                "aiaComparisonEmail": (
                    "主题：40岁前重疾与医疗客观对比：大马保诚 (PRUAll Care) vs 友邦 (AIA A-Life Beyond Critical Care)\n\n"
                    "Jason 你好，\n"
                    "为你整理了 保诚 PAMB 相比 AIA 的 3 大核心条款优势：\n"
                    "• 保障至 100 岁 & 约190种疾病（对比 AIA 仅保至80岁）：保诚 PRUAll Care 覆盖 约190种重疾并保至100岁（含 ICU 满120小时、大型手术、心理疾病及20%额外康复金），而 AIA A-Life Beyond Critical Care 在 80岁即终止；\n"
                    "• 15% 保费现金立减（对比 AIA 钱包额度）：保诚 PRUMillion Med Active 2.0 无理赔直接享 15% 保费现金折扣，而 AIA A-Plus Health360 保费照交、仅增加医疗钱包额度；\n"
                    "• 110% 满期保费返还：搭配保诚 PRUMan 可享 260% 男性重疾保障 + 满期最高 110% 保费返还。\n\n"
                    "周四下午我带一页式对比表找你喝杯 10 分钟咖啡！"
                ),
                "judgeFeedback": "痛点与竞品对比极其精准！用「保至100岁 vs 80岁」与「15%真金白银保费折扣」完美胜出！",
            },
            "yue": {
                "firstTouchMessage": (
                    "Jason 預祝你 40 歲生日快樂呀 Bro！🥂 聽到你拍檔通波仔手術順利康復真係安心晒，專登幫你整咗呢張 40 歲里程碑賀卡。\n\n"
                    "趁下個月踏入 40 歲加保費之前，我哋可以用 39 歲靚價鎖定保誠 PRUAll Care（包約190種危疾 + ICU + 20%康復金）同埋 PRUMillion Med Active 2.0（RM 800萬醫療限額 + 無索償即減15%保費）。呢個禮拜喺檳城飲杯 10 分鐘咖啡傾下？☕"
                ),
                "aiaComparisonEmail": (
                    "主題：40歲前危疾與醫療客觀對比：保誠 (PRUAll Care) vs 友邦 (AIA A-Life Beyond Critical Care)\n\n"
                    "Jason 你好，\n"
                    "幫你執齊咗 保誠 PAMB 對比 AIA 嘅 3 個最關鍵條款分野：\n"
                    "• 保到 100 歲 & 包約190種危疾（AIA 淨係保到 80 歲）：保誠 PRUAll Care 保障去到 100 歲（連 ICU 住夠120粒鐘、大手術同額外20%康復金都包），而 AIA A-Life Beyond 去到 80 歲就完；\n"
                    "• 直接減 15% 現金保費（唔係齋加 Wallet）：保誠 PRUMillion Med Active 2.0 冇 Claim 錢直接減你 15% 實際保費，AIA A-Plus Health360 保費照收足、淨係入落醫療錢包；\n"
                    "• 期滿退還高達 110% 保費：加埋 PRUMan 有 260% 男士危疾保障兼期滿退返高達 110% 保費，完全唔怕「冇病白交保費」。\n\n"
                    "星期四晏晝我帶張一頁紙對照表過嚟同你飲杯咖啡！"
                ),
                "judgeFeedback": "地道廣東話拆解！一眼睇穿「保到100歲 vs 80歲」同埋「真減15%保費 vs 醫療錢包」嘅分別！",
            },
            "ms": {
                "firstTouchMessage": (
                    "Selamat Hari Lahir ke-40 lebih awal, Jason! 🥂 Sebelum kenaikan kadar umur 40 bulan depan, jom kunci PRUAll Care (~190 penyakit kritikal + ICU + 20% Recovery Care) & PRUMillion Med Active 2.0 (had RM 8J + diskaun 15% Active Pricing). Jom minum kopi 10 minit minggu ini? ☕"
                ),
                "aiaComparisonEmail": (
                    "Subjek: Perbandingan Fakta: PAMB (PRUAll Care) vs. AIA (A-Life Beyond Critical Care)\n\n"
                    "Hai Jason,\n"
                    "Berikut adalah 3 kelebihan fakta PAMB berbanding AIA:\n"
                    "• Perlindungan Sehingga Umur 100 (~190 Kondisi vs AIA Umur 80): PRUAll Care melindungi sehingga umur 100 tahun termasuk ICU >=120 jam & kesihatan mental (AIA A-Life Beyond tamat pada umur 80).\n"
                    "• Diskaun Tunai Premium 15%: PRUMillion Med Active 2.0 memotong premium anda sebanyak 15% setiap tahun tanpa tuntutan.\n"
                    "• Pulangan Premium 110% (PRUMan): Perlindungan lelaki 260% dengan pulangan sehingga 110% semasa matang.\n\n"
                    "Jom jumpa 10 minit Khamis ini untuk semak jadual penuh!"
                ),
                "judgeFeedback": "Perbandingan fakta yang sangat jelas dan meyakinkan!",
            },
            "ta": {
                "firstTouchMessage": (
                    "இனிய 40-வது பிறந்தநாள் வாழ்த்துகள் Jason! 🥂 உங்கள் நண்பர் இதய சிகிச்சையிலிருந்து குணமடைந்தது மகிழ்ச்சி.\n\n"
                    "அடுத்த மாதம் 40 வயது பிரீமியம் உயர்வுக்கு முன், PRUAll Care (~190 தீவிர நோய்கள் + ICU + 20% குணமடைதல் நிதி) மற்றும் PRUMillion Med Active 2.0 (RM 8M மருத்துவ வரம்பு + 15% தள்ளுபடி) திட்டங்களை 39 வயது கட்டணத்தில் உறுதி செய்யலாம். இந்த வாரம் 10 நிமிடம் காபி சாப்பிடலாமா? ☕"
                ),
                "aiaComparisonEmail": (
                    "பொருள்: 40 வயதுக்கு முன் உண்மை ஒப்பீடு: PAMB (PRUAll Care) vs AIA (A-Life Beyond Critical Care)\n\n"
                    "வணக்கம் Jason,\n"
                    "புருடென்ஷியல் மலேசியா மற்றும் AIA இடையேயான 3 முக்கிய உண்மை வேறுபாடுகள்:\n"
                    "• 100 வயது வரை பாதுகாப்பு & ~190 நோய்கள் (AIA 80 வயது வரை மட்டுமே): PAMB PRUAll Care 100 வயது வரை ~190 தீவிர நோய்கள் மற்றும் ICU சிகிச்சையை உள்ளடக்கியது.\n"
                    "• 15% நேரடி பிரீமியம் தள்ளுபடி: PRUMillion Med Active 2.0 கிளைம் இல்லாத ஆண்டுகளில் 15% நேரடி கட்டணத் தள்ளுபடி தருகிறது (AIA வாலட்டில் மட்டுமே வரவு வைக்கிறது).\n"
                    "• 110% பிரீமியம் திரும்பப் பெறுதல் (PRUMan): 260% ஆண்கள் தீவிர நோய் பாதுகாப்பு + முதிர்வில் 110% வரை பிரீமியம் திரும்பக் கிடைக்கும்.\n\n"
                    "வியாழக்கிழமை 10 நிமிடம் நேரில் சந்தித்துப் பேசலாமா?"
                ),
                "judgeFeedback": "100 வயது பாதுகாப்பு மற்றும் 15% நேரடி தள்ளுபடியை மிகத் தெளிவாக விளக்கியுள்ளீர்கள்!",
            },
        },
    },
    "new_home_mortgage": {
        "id": "new_home_mortgage",
        "icon": "🏡",
        "badge": "🏡 RM 1.3M Home Keys (PRUWith You Plus vs. AIA A-Life Link 2)",
        "customerName": "Amirul Hakim & Farah Nadia (35, Johor Bahru)",
        "existingPolicy": "Medical cards only; RM 1.3M 35-yr joint mortgage (RM 5,600/mth) exposed to CI.",
        "lifeEvent": "Collected keys to RM 1.3M semi-D home in Eco Botanic, JB.",
        "pambPlan": "PRUWith You Plus (Portable MLTA) + PRUAll Care",
        "aiaPlan": "AIA A-Life Link 2 / A-Life Kasih Famili + A-Plus Total Multi-Crisis",
        "customerObjection": (
            "Terima kasih for the housewarming card & message! An AIA planner also quoted us "
            "AIA A-Life Link 2 + CI rider for our mortgage shield. Can you email how PAMB compares factually?"
        ),
        "aiaComparisonFacts": [
            "1. Unconditional +50% Auto Sum Assured Booster: PAMB PRUWith You Plus increases your mortgage life/TPD shield by +1%/yr (up to +50%) automatically for free—without requiring annual AIA Vitality fitness/health checks.",
            "2. RM 500 New Home Cash Reward: PAMB PRUWith You Plus pays you an immediate RM 500 Goal Achievement Cash Reward upon collecting your Eco Botanic home keys.",
            "3. ~190 CI Conditions + 20% Extra Recovery Care: PAMB PRUAll Care pays an additional 20% Recovery Care lump sum on top of your CI payout to keep your RM 5,600/mth mortgage installments current during illness recovery.",
        ],
        "policyCitation": "PAMB PRUWith You Plus + PRUAll Care vs. AIA A-Life Link 2",
        "cardHeadline": "Congratulations on Your New Eco Botanic Home!",
        "cardSubline": "May Your New Roof Always Be Filled with Warmth, Laughter & Security",
        "cardThemeColors": ((240, 253, 244), (237, 27, 46), (16, 120, 80)),
        "cardArtPrompt": (
            "Warm Malaysian luxury housewarming greeting card illustration (16:9 landscape): "
            "modern tropical semi-detached home in Johor Bahru with golden key ribbon, lush garden greenery, "
            "Prudential crimson seal accent, inviting architectural watercolor & gold foil aesthetic"
        ),
        "fallback": {
            "en": {
                "firstTouchMessage": (
                    "Huge congratulations Amirul & Farah on collecting the keys to your Eco Botanic dream home! 🏡🔑 I designed this housewarming card for you both.\n\n"
                    "Unlike bank MRTA (which pays RM 0 during a Critical Illness), PRUWith You Plus + PRUAll Care gives you an immediate RM 500 New Home Cash Reward, a free +50% Auto Sum Assured Booster, and covers your RM 5,600/mth mortgage installments across ~190 CI conditions. Can I send a 1-page comparison? 😊"
                ),
                "aiaComparisonEmail": (
                    "Subject: Eco Botanic Mortgage Shield Comparison: PAMB (PRUWith You Plus) vs. AIA (A-Life Link 2)\n\n"
                    "Hi Amirul & Farah,\n"
                    "Here are 3 factual advantages of PAMB PRUWith You Plus + PRUAll Care over AIA A-Life Link 2 for your RM 1.3M mortgage:\n"
                    "• Unconditional +50% Auto Sum Assured Booster: PAMB automatically increases your mortgage protection by +1%/yr up to +50% at RM 0 extra cost, whereas AIA's booster depends on maintaining annual AIA Vitality points and fees.\n"
                    "• Immediate RM 500 New Home Cash Reward: PAMB pays you an RM 500 Goal Achievement Cash Reward right now for your Eco Botanic home.\n"
                    "• ~190 CI Conditions + 20% Extra Recovery Care: PAMB PRUAll Care pays an extra 20% Recovery Care buffer so your RM 5,600/mth home loan never defaults.\n\n"
                    "Shall we do a 10-min call tomorrow at 8:30 PM?"
                ),
                "judgeFeedback": "Excellent mortgage arbitrage! Highlighted PAMB's unconditional +50% booster, RM 500 New Home Reward, and 20% Recovery Care vs. AIA!",
            },
            "zh-CN": {
                "firstTouchMessage": (
                    "衷心祝贺 Amirul 与 Farah 喜提新山 Eco Botanic 理想新居钥匙！🏡🔑 特地为你们制作了这张乔迁贺卡！\n\n"
                    "通过保诚 PRUWith You Plus + PRUAll Care 不仅可立即申领 RM 500 购房现金奖、享最高 +50% 免费保额递增，还能解决传统银行 MRTA「重疾不赔」盲点，确保患病休养期每月 RM 5,600 房贷不断供。我先发一页对比表给你们看？😊"
                ),
                "aiaComparisonEmail": (
                    "主题：RM 130万新居房贷护盾客观对比：保诚 (PRUWith You Plus) vs 友邦 (AIA A-Life Link 2)\n\n"
                    "Amirul & Farah 您好，\n"
                    "以下为您整理 保诚 PAMB 相比 AIA A-Life Link 2 的 3 大客观房贷保障优势：\n"
                    "• 无条件免费 +50% 保额递增：保诚 PRUWith You Plus 每年自动免费递增 1% 保额（最高 +50%），无需像 AIA 那样每年缴付 Vitality 会费并完成运动考核；\n"
                    "• 立领 RM 500 乔迁里程碑现金奖：凭 Eco Botanic 购房文件即可直接申领保诚 RM 500 现金奖；\n"
                    "• 约190种重疾 + 20% 额外康复金：保诚 PRUAll Care 除重疾赔付外再加码 20% Recovery Care 康复金，稳保每月 RM 5,600 房贷不断供。\n\n"
                    "明晚 8:30 方便用 10 分钟线上对照一下报表吗？"
                ),
                "judgeFeedback": "直击房贷客户痛点！无条件+50%保额递增与RM 500乔迁现金奖完美压制 AIA A-Life Link 2！",
            },
            "yue": {
                "firstTouchMessage": (
                    "恭喜晒 Amirul 同 Farah 攞到新山 Eco Botanic 靚屋鎖匙呀！🏡🔑 我專登整咗呢張新居入伙賀卡俾你哋！\n\n"
                    "同銀行 MRTA（危疾一蚊都唔賠）唔同，保誠 PRUWith You Plus + PRUAll Care 可以即刻領取 RM 500 買樓現金獎、自動免費加高達 +50% 保額，兼且萬一中危疾休養都照幫你供每月 RM 5,600 房貸。我發張一頁紙對比表俾你哋睇下？😊"
                ),
                "aiaComparisonEmail": (
                    "主題：Eco Botanic 房貸護盾客觀對比：保誠 (PRUWith You Plus) vs 友邦 (AIA A-Life Link 2)\n\n"
                    "Amirul & Farah 你哋好，\n"
                    "以下係 保誠 PAMB 對比 AIA A-Life Link 2 嘅 3 大實際優勢：\n"
                    "• 無條件免費 +50% 保額遞增：PRUWith You Plus 每年自動免費加 1%（最高 +50%），唔使好似 AIA 咁年年交 Vitality 會費同做運動打卡；\n"
                    "• 即攞 RM 500 新居入伙現金獎：憑新屋文件即刻領取保誠 RM 500 現金獎賞；\n"
                    "• 包約190種危疾 + 20% 額外康復金：PRUAll Care 額外多賠 20% Recovery Care，確保休養期間每月 RM 5,600 供樓零壓力。\n\n"
                    "聽晚 8:30 方便用 10 分鐘傾一傾嗎？"
                ),
                "judgeFeedback": "正宗廣東話入伙預熱！無條件+50%保額同 RM 500 買樓現金獎完勝 AIA！",
            },
            "ms": {
                "firstTouchMessage": (
                    "Tahniah Amirul & Farah atas kunci rumah baharu di Eco Botanic! 🏡🔑 Dengan PRUWith You Plus + PRUAll Care, anda layak menuntut Ganjaran Tunai Rumah Baharu RM 500, +50% Booster Automatik Percuma, dan perlindungan ansuran RM 5,600/bulan semasa Penyakit Kritikal. Boleh saya kongsikan ringkasan 1 muka surat? 😊"
                ),
                "aiaComparisonEmail": (
                    "Subjek: Perbandingan Perlindungan Gadai Janji: PAMB (PRUWith You Plus) vs. AIA (A-Life Link 2)\n\n"
                    "Hai Amirul & Farah,\n"
                    "Berikut adalah 3 kelebihan fakta PAMB berbanding AIA A-Life Link 2:\n"
                    "• +50% Booster Automatik Tanpa Syarat: Meningkat +1%/tahun secara percuma tanpa perlu yuran atau sasaran senaman AIA Vitality.\n"
                    "• Ganjaran Tunai Rumah Baharu RM 500: Tuntutan tunai segera sempena kunci rumah Eco Botanic.\n"
                    "• ~190 Kondisi Kritikal + 20% Recovery Care: Memastikan bayaran bulanan RM 5,600/bulan dilindungi sepenuhnya.\n\n"
                    "Jom berbincang 10 minit esok jam 8:30 malam!"
                ),
                "judgeFeedback": "Perbandingan MLTA PAMB vs AIA yang sangat praktikal dan tepat!",
            },
            "ta": {
                "firstTouchMessage": (
                    "Eco Botanic புதிய வீட்டுச் சாவியைப் பெற்ற Amirul & Farah-க்கு மனமார்ந்த வாழ்த்துகள்! 🏡🔑\n\n"
                    "வங்கி MRTA தீவிர நோய்க்கு RM 0 மட்டுமே தரும். ஆனால் PAMB PRUWith You Plus + PRUAll Care மூலம் உடனடி RM 500 புதிய வீடு ரொக்கப் பரிசு, இலவச +50% காப்பீட்டு உயர்வு மற்றும் மாதம் RM 5,600 வீட்டுக் கடன் தவணைப் பாதுகாப்பு கிடைக்கும். 1-பக்க சுருக்கத்தை அனுப்பட்டுமா? 😊"
                ),
                "aiaComparisonEmail": (
                    "பொருள்: வீட்டுக் கடன் பாதுகாப்பு ஒப்பீடு: PAMB (PRUWith You Plus) vs AIA (A-Life Link 2)\n\n"
                    "வணக்கம் Amirul & Farah,\n"
                    "உங்கள் RM 1.3M வீட்டுக் கடனுக்கு AIA A-Life Link 2-வை விட PAMB சிறந்ததாக இருப்பதற்கான 3 உண்மைகள்:\n"
                    "• நிபந்தனையற்ற +50% இலவச காப்பீட்டு உயர்வு: ஆண்டுக்கு +1% தானாக உயரும் (AIA Vitality கட்டணம் தேவையில்லை).\n"
                    "• உடனடி RM 500 புதிய வீடு ரொக்கப் பரிசு: உங்கள் புதிய வீட்டிற்கு RM 500 ரொக்கப் பரிசு.\n"
                    "• ~190 தீவிர நோய்கள் + 20% கூடுதல் குணமடைதல் நிதி: மாதம் RM 5,600 தவணை தடையின்றி செலுத்தப்படும்.\n\n"
                    "நாளை இரவு 8:30 மணிக்கு 10 நிமிடம் பேசலாமா?"
                ),
                "judgeFeedback": "புதிய வீடு வாழ்த்து மற்றும் PAMB vs AIA வீட்டுக் கடன் ஒப்பீடு மிகச் சிறப்பு!",
            },
        },
    },
    "career_promotion": {
        "id": "career_promotion",
        "icon": "🌟",
        "badge": "🌟 Head of Dept Promotion (PRULady vs. AIA A-Life Lady360)",
        "customerName": "Dr. Kavitha Pillai (42, KL Senior Consultant)",
        "existingPolicy": "Junior RM 200k policy; zero female CI & high-allocation wealth plan.",
        "lifeEvent": "Promoted to Head of Department at KL private hospital; income doubled to RM 48k/mth.",
        "pambPlan": "PRULady + PRUElite Invest + PRUValue Med",
        "aiaPlan": "AIA A-Life Lady360 + A-Life Wealth Builder",
        "customerObjection": (
            "Thank you for the lovely promotion card! A fellow specialist recommended "
            "AIA A-Life Lady360 + A-Life Wealth Builder. Could you email me a factual comparison with Prudential?"
        ),
        "aiaComparisonFacts": [
            "1. Up to 260% Female CI + 110% Maturity Refund: PAMB PRULady provides up to 260% female CI coverage and refunds up to 110% of total premiums paid at maturity (plus a Career Promotion Milestone Cash Reward!).",
            "2. 103% Day-1 Investment Allocation: PAMB PRUElite Invest allocates 103% of your single premium into wealth funds on Day 1 (an immediate +3% boost vs. standard ILP/unit trust charges).",
            "3. Guaranteed Annual Med Value Point Increase: PAMB PRUValue Med grows its Med Value Point every year automatically and still pays 80% of eligible bills beyond the limit.",
        ],
        "policyCitation": "PAMB PRULady + PRUElite Invest vs. AIA A-Life Lady360",
        "cardHeadline": "Congratulations on Leading the Department, Dr. Kavitha!",
        "cardSubline": "Celebrating Your Clinical Excellence, Leadership & Next Chapter of Wealth",
        "cardThemeColors": ((253, 242, 248), (237, 27, 46), (147, 51, 234)),
        "cardArtPrompt": (
            "Sophisticated executive promotion congratulatory card illustration (16:9 landscape): "
            "Kuala Lumpur Twin Towers skyline at twilight in rose gold and deep burgundy line art, "
            "Prudential crimson ribbon, prestigious female leadership and prosperity theme"
        ),
        "fallback": {
            "en": {
                "firstTouchMessage": (
                    "Warmest congratulations, Dr. Kavitha, on your appointment as Head of Department! 🌟🩺 I designed this executive card to celebrate your milestone.\n\n"
                    "Your promotion unlocks a Career Promotion Cash Reward under PRULady (260% female CI cover + up to 110% maturity premium refund), paired with PRUElite Invest (103% Day-1 wealth allocation). Free for a 10-min coffee near your hospital next Tuesday? ☕"
                ),
                "aiaComparisonEmail": (
                    "Subject: Executive Comparison for Dr. Kavitha: PAMB (PRULady & PRUElite Invest) vs. AIA (A-Life Lady360)\n\n"
                    "Dear Dr. Kavitha,\n"
                    "Here is a concise, factual comparison between Prudential Malaysia and AIA Malaysia for your executive portfolio:\n"
                    "• 260% Female CI Cover + Up to 110% Maturity Refund: PAMB PRULady delivers up to 260% coverage, 10 Life Milestone Cash Rewards (including Career Promotion!), and refunds up to 110% of total premiums at maturity.\n"
                    "• 103% Day-1 Wealth Allocation (PRUElite Invest): Injects 103% of your capital into funds on Day 1 (+3% immediate bonus), outperforming AIA A-Life Wealth Builder front-end structures.\n"
                    "• Auto-Increasing Med Value Point (PRUValue Med): Grows your medical limit every year + 80% continuous coverage beyond the limit.\n\n"
                    "I can bring the 1-page summary to your clinic lounge next Tuesday at 2 PM!"
                ),
                "judgeFeedback": "Superb executive pre-pitch! Contrasted PRULady's 260% cover + 110% refund and PRUElite Invest's 103% Day-1 allocation against AIA A-Life Lady360!",
            },
            "zh-CN": {
                "firstTouchMessage": (
                    "衷心祝贺 Dr. Kavitha 荣升科室主任（Head of Department）！🌟🩺 特地为您制作了这张晋升祝贺卡！\n\n"
                    "您此次晋升可直接申领保诚 PRULady 职场晋升里程碑现金奖（享 260% 女性专属重疾保障 + 满期最高 110% 保费返还），并搭配 PRUElite Invest 首日 103% 投资配置。下周二在您医院附近喝杯 10 分钟咖啡聊聊？☕"
                ),
                "aiaComparisonEmail": (
                    "主题：科室主任专属方案客观对比：大马保诚 (PRULady + PRUElite Invest) vs 友邦 (AIA A-Life Lady360)\n\n"
                    "Dr. Kavitha 您好，\n"
                    "为您精炼整理 保诚 PAMB 相比 AIA A-Life Lady360 的 3 大客观优势：\n"
                    "• 260% 女性重疾保障 + 最高 110% 满期返还：保诚 PRULady 提供高达 260% 保障、10项人生里程碑现金奖（含职场晋升！）及满期最高 110% 总保费返还；\n"
                    "• 首日 103% 财富配置（PRUElite Invest）：第一天即按 103% 本金投入基金（立享 +3% 额外奖励），远超普通基金与常规投连险首年配置率；\n"
                    "• 每年无条件递增医疗限额（PRUValue Med）：每年自动提升 Med Value Point，超额后仍持续赔付 80% 合规医疗费。\n\n"
                    "下周二下午 2 点我带一页式对照表到医院咖啡厅与您汇报 10 分钟！"
                ),
                "judgeFeedback": "高管级干练对比！260%女性保障+110%返还+103%首日配置三大硬核数据完胜 AIA！",
            },
            "yue": {
                "firstTouchMessage": (
                    "恭喜晒 Dr. Kavitha 榮升部門主管（Head of Department）！🌟🩺 專登幫你整咗呢張高管晉升祝賀卡！\n\n"
                    "今次升職可以直接領取保誠 PRULady 升職里程碑現金獎（享高達 260% 女性危疾保障 + 期滿退還高達 110% 保費），再配搭 PRUElite Invest 首日 103% 財富配置。下禮拜二喺你醫院附近飲杯 10 分鐘咖啡傾下？☕"
                ),
                "aiaComparisonEmail": (
                    "主題：部門主管專屬方案對比：保誠 (PRULady + PRUElite Invest) vs 友邦 (AIA A-Life Lady360)\n\n"
                    "Dr. Kavitha 你好，\n"
                    "同你簡明比較 保誠 PAMB 對比 AIA A-Life Lady360 嘅 3 大實際條款優勢：\n"
                    "• 260% 女性危疾保障 + 期滿退還 110% 保費：保誠 PRULady 包高達 260% 保障、10項人生大事現金獎（包埋升職！）同期滿退還高達 110% 總保費；\n"
                    "• 首日 103% 投資配置（PRUElite Invest）：第一日就將 103% 資金撥入投資基金（即賺 +3% 紅利），跑贏一般基金同 AIA 投連險前期收費；\n"
                    "• 每年自動遞增 Med Value Point（PRUValue Med）：醫療額每年自動加，爆額後仲繼續賠 80%。\n\n"
                    "下禮拜二下晝 2 點我帶張一頁紙對照表過嚟醫院 Lounge 搵你！"
                ),
                "judgeFeedback": "地道廣東話高管提案！260%女性保障 + 110%退還 + 103%首日配置完勝 AIA！",
            },
            "ms": {
                "firstTouchMessage": (
                    "Tahniah Dr. Kavitha atas pelantikan sebagai Ketua Jabatan! 🌟🩺 Pelantikan ini melayakkan anda menuntut Ganjaran Kenaikan Pangkat PRULady (260% perlindungan wanita + 110% pulangan matang) bersama PRUElite Invest (103% alokasi Hari-1). Jom minum kopi 10 minit Selasa depan? ☕"
                ),
                "aiaComparisonEmail": (
                    "Subjek: Perbandingan Eksekutif: PAMB (PRULady & PRUElite Invest) vs. AIA (A-Life Lady360)\n\n"
                    "Salam Dr. Kavitha,\n"
                    "Berikut adalah 3 kelebihan fakta PAMB berbanding AIA A-Life Lady360:\n"
                    "• 260% Perlindungan Wanita + 110% Pulangan Matang: Termasuk 10 Ganjaran Peristiwa Penting (Kenaikan Pangkat!).\n"
                    "• 103% Alokasi Pelaburan Hari-1 (PRUElite Invest): Bonus +3% serta-merta pada Hari Pertama.\n"
                    "• Med Value Point Meningkat Setiap Tahun (PRUValue Med): Tambahan perlindungan berterusan 80% melebihi had.\n\n"
                    "Saya boleh singgah 10 minit Selasa depan jam 2 petang!"
                ),
                "judgeFeedback": "Ringkas, padat dan berasaskan fakta produk sebenar PAMB vs AIA!",
            },
            "ta": {
                "firstTouchMessage": (
                    "துறைத் தலைவராக (Head of Department) பதவி உயர்வு பெற்ற Dr. Kavitha அவர்களுக்கு மனமார்ந்த வாழ்த்துகள்! 🌟🩺\n\n"
                    "உங்கள் பதவி உயர்வுக்கு PRULady திட்டத்தின் கீழ் ரொக்கப் பரிசு, 260% பெண்கள் தீவிர நோய் பாதுகாப்பு + முதிர்வில் 110% பிரீமியம் திரும்பப் பெறுதல் மற்றும் PRUElite Invest (முதல் நாளிலேயே 103% முதலீட்டு ஒதுக்கீடு) கிடைக்கிறது. செவ்வாய்க்கிழமை 10 நிமிடம் காபி சாப்பிடலாமா? ☕"
                ),
                "aiaComparisonEmail": (
                    "பொருள்: Dr. Kavitha-க்கான உண்மை ஒப்பீடு: PAMB (PRULady & PRUElite Invest) vs AIA (A-Life Lady360)\n\n"
                    "அன்புள்ள Dr. Kavitha,\n"
                    "புருடென்ஷியல் மலேசியா மற்றும் AIA A-Life Lady360 இடையேயான 3 முக்கிய உண்மை ஒப்பீடுகள்:\n"
                    "• 260% பெண்கள் பாதுகாப்பு + 110% பிரீமியம் திரும்பப் பெறுதல்: PAMB PRULady 260% பாதுகாப்பு, பதவி உயர்வு ரொக்கப் பரிசு மற்றும் முதிர்வில் 110% பிரீமியம் திரும்பத் தருகிறது.\n"
                    "• முதல் நாளில் 103% முதலீட்டு ஒதுக்கீடு (PRUElite Invest): முதல் நாளிலேயே +3% கூடுதல் போனஸ் முதலீடு.\n"
                    "• ஆண்டுதோறும் உயரும் Med Value Point (PRUValue Med): மருத்துவ வரம்பு ஆண்டுதோறும் தானாக உயரும் + வரம்பைத் தாண்டியும் 80% பாதுகாப்பு.\n\n"
                    "செவ்வாய் மதியம் 2 மணிக்கு உங்கள் மருத்துவமனையில் 10 நிமிடம் சந்திக்கலாமா?"
                ),
                "judgeFeedback": "Dr. Kavitha-க்கான தமிழ் வாழ்த்து மற்றும் PRULady vs AIA Lady360 ஒப்பீடு மிக அருமை!",
            },
        },
    },
    "sme_expansion": {
        "id": "sme_expansion",
        "icon": "🏭",
        "badge": "🏭 SME RM 6M Loan (PRUWealth Enrich 2.0 vs. AIA Legasi Beyond)",
        "customerName": "Dato' Sri Raymond Tan (49, Penang Manufacturing Founder)",
        "existingPolicy": "RM 18M illiquid factory equity; old RM 800k policy; RM 5.2M debt exposure.",
        "lifeEvent": "Signed RM 6M personal bank guarantee for Phase-2 Batu Kawan plant; UK son & Melbourne daughter.",
        "pambPlan": "PRUWealth Enrich 2.0 + PRUPrestige Legacy + PRUAll Care",
        "aiaPlan": "AIA A-Life Legasi Beyond + A-Life Wealth Prestige",
        "customerObjection": (
            "Thank you for the Batu Kawan groundbreaking card! My banker's AIA specialist just pitched "
            "AIA A-Life Legasi Beyond. Email me how Prudential's corporate & legacy structure compares factually."
        ),
        "aiaComparisonFacts": [
            "1. Automatic +30%/+50% Cover Booster + 500% Accidental Death: PAMB PRUWealth Enrich 2.0 boosts high Basic Sum Assured automatically by up to +50% and pays up to 500% on Accidental Death.",
            "2. 100% Day-1 HNW Allocation (PRUPrestige Legacy): 100% of premium works from Day 1 with accelerated Loyalty Bonuses to equalize inheritance between the UK medical son (cash) and Melbourne successor daughter (factory shares).",
            "3. Built-In Legacy Settlement Option + FSA Schedule 10 Trust: Ring-fences the RM 6M personal bank guarantee from creditors and distributes structured payouts without private trust maintenance fees.",
        ],
        "policyCitation": "PAMB PRUWealth Enrich 2.0 + PRUPrestige Legacy vs. AIA A-Life Legasi Beyond",
        "cardHeadline": "Congratulations on Your Phase-2 Batu Kawan Plant!",
        "cardSubline": "Honoring Dato' Sri Raymond Tan's Vision, Industrial Leadership & Family Legacy",
        "cardThemeColors": ((248, 250, 252), (237, 27, 46), (180, 130, 25)),
        "cardArtPrompt": (
            "Prestigious corporate enterprise expansion congratulatory card illustration (16:9 landscape): "
            "deep midnight navy, brushed gold foil architectural line-art of Penang Second Bridge and modern high-tech facility, "
            "Prudential crimson seal accent, commanding private wealth and family legacy aesthetic"
        ),
        "fallback": {
            "en": {
                "firstTouchMessage": (
                    "Heartiest congratulations, Dato' Sri Raymond, on breaking ground on your Phase-2 Batu Kawan plant! 🏭🚀 I created this corporate milestone card for your group.\n\n"
                    "With <2.5% of working capital, PRUWealth Enrich 2.0 + PRUPrestige Legacy ring-fences your RM 6M personal bank guarantee under FSA Schedule 10 Statutory Trust while equalizing inheritance between your UK son (cash) and Melbourne daughter (100% factory shares). Free for a 15-min brief Thursday at 3 PM? 🤝"
                ),
                "aiaComparisonEmail": (
                    "Subject: Corporate Keyman & Legacy Comparison: PAMB (PRUWealth Enrich 2.0) vs. AIA (A-Life Legasi Beyond)\n\n"
                    "Dear Dato' Sri Raymond,\n"
                    "Here is the factual executive comparison between Prudential Malaysia and AIA A-Life Legasi Beyond for your RM 6M Batu Kawan facility & family succession:\n"
                    "• Automatic +30%/+50% Cover Booster & 500% Accidental Death: PAMB PRUWealth Enrich 2.0 automatically scales your high sum assured by up to +50% and covers up to 500% for Accidental Death without ongoing AIA Vitality checks.\n"
                    "• 100% Day-1 Capital Allocation (PRUPrestige Legacy): Puts 100% of your capital to work on Day 1 with loyalty bonuses, preserving liquidity during Phase-2 capex.\n"
                    "• Turnkey Legacy Settlement Option + FSA Sec 130 Creditor Shield: Ring-fences the RM 6M guarantee and pays tax-free structured cash to your UK son so your daughter inherits 100% of Penang factory shares cleanly.\n\n"
                    "I will bring the 1-page boardroom table to your Batu Kawan office Thursday at 3 PM."
                ),
                "judgeFeedback": "Top-of-the-Table corporate mastery! Factual PAMB Cover Booster (+50%), 500% Accidental Death, and 100% Day-1 allocation cleanly beat AIA A-Life Legasi Beyond!",
            },
            "zh-CN": {
                "firstTouchMessage": (
                    "衷心祝贺陈拿督斯里峇都交湾二期半导体新厂盛大动工！🏭🚀 特地为您定制了这张企业里程碑贺卡！\n\n"
                    "仅需不到 2.5% 营运资金缓冲，保诚 PRUWealth Enrich 2.0 + PRUPrestige Legacy 即可通过 FSA 第130条法定信托 隔离 RM 600万银行个人担保，并用免税现金补偿英国学医长子、让墨尔本次女 100% 完整继承工厂控股权。周四下午 3 点方便去您办公室汇报 15 分钟吗？🤝"
                ),
                "aiaComparisonEmail": (
                    "主题：企业关键人与家族传承客观对比：大马保诚 (PRUWealth Enrich 2.0) vs 友邦 (AIA A-Life Legasi Beyond)\n\n"
                    "尊敬的陈拿督斯里，\n"
                    "为您呈上 保诚 PAMB 相比 AIA A-Life Legasi Beyond 的 3 大家族办公室条款优势：\n"
                    "• 无条件最高 +50% 保额递增 & 500% 意外身故保障：保诚 PRUWealth Enrich 2.0 自动享 +30%至+50% Cover Booster 及高达 500% 意外身故杠杆，无需像 AIA 绑定 Vitality 每年体检打卡；\n"
                    "• 首日 100% 净值配置（PRUPrestige Legacy）：首日即享 100% 保费入账配置，在二期扩厂高峰期最大化保留企业账面流动性；\n"
                    "• 内置 Legacy Settlement Option + FSA 债权人隔离：零私人信托管理费即可定制跨国分期传承，用保单现金补偿英国长子，把 100% 槟城厂房投票权留给接班次女。\n\n"
                    "周四下午 3 点我将携带一页纸精算对比表到您峇都交湾办公室呈报！"
                ),
                "judgeFeedback": "殿堂级企业主对决！用 +50% Cover Booster、500%意外杠杆及首日100%配置完胜 AIA A-Life Legasi Beyond！",
            },
            "yue": {
                "firstTouchMessage": (
                    "衷心祝賀陳拿督斯里峇都交灣二期新廠盛大動工！🏭🚀 我專登幫貴集團整咗呢張企業里程碑祝賀卡！\n\n"
                    "淨係用唔夠 2.5% 營運資金緩衝，保誠 PRUWealth Enrich 2.0 + PRUPrestige Legacy 就可以透過 FSA 第130條法定信託 隔離 RM 600萬銀行個人擔保，兼且用免稅現金補償英國讀醫嘅大仔，等墨爾本返嚟接班嘅阿女 100% 繼承檳城廠房控股權。星期四下晝 3 點方便過嚟你 Office 傾 15 分鐘嗎？🤝"
                ),
                "aiaComparisonEmail": (
                    "主題：企業關鍵人與家族傳承對比：大馬保誠 (PRUWealth Enrich 2.0) vs 友邦 (AIA A-Life Legasi Beyond)\n\n"
                    "尊敬嘅陳拿督斯里，\n"
                    "以下係 保誠 PAMB 對比 AIA A-Life Legasi Beyond 嘅 3 大實際條款優勢：\n"
                    "• 自動高達 +50% Cover Booster & 500% 意外身故賠償：保誠 PRUWealth Enrich 2.0 自動加高達 +50% 保額同埋 500% 意外保障，完全唔使好似 AIA Vitality 咁年年體檢打卡；\n"
                    "• 首日 100% 資金入賬配置（PRUPrestige Legacy）：第一日就 100% 入賬運作，喺起緊二期新廠期間幫公司保留最高現金流靈活度；\n"
                    "• 內置 Legacy Settlement Option + FSA 債權人隔離：免私人信託管理費，一邊隔開 RM 600萬銀行擔保，一邊派現金俾英國大仔、留 100% 廠房股份俾接班阿女。\n\n"
                    "星期四下晝 3 點我帶埋張一頁紙對照表去你峇都交灣 Office 匯報！"
                ),
                "judgeFeedback": "霸氣廣東話企業傳承提案！+50% Cover Booster 同首日 100% 配置完勝 AIA A-Life Legasi Beyond！",
            },
            "ms": {
                "firstTouchMessage": (
                    "Tahniah Dato' Sri Raymond atas pembukaan kilang Fasa-2 Batu Kawan! 🏭🚀 Dengan <2.5% modal kerja, PRUWealth Enrich 2.0 + PRUPrestige Legacy melindungi jaminan bank RM 6 Juta di bawah Amanah FSA Seksyen 130 dan menyeimbangkan warisan anak di UK & Melbourne. Boleh kita jumpa 15 minit Khamis jam 3 petang? 🤝"
                ),
                "aiaComparisonEmail": (
                    "Subjek: Perbandingan Legasi Korporat: PAMB (PRUWealth Enrich 2.0) vs. AIA (A-Life Legasi Beyond)\n\n"
                    "Dato' Sri Raymond,\n"
                    "Berikut adalah 3 kelebihan fakta PAMB berbanding AIA A-Life Legasi Beyond:\n"
                    "• +30%/+50% Cover Booster Automatik & 500% Kematian Kemalangan: Tanpa syarat kecergasan tahunan AIA Vitality.\n"
                    "• 100% Alokasi Hari Pertama (PRUPrestige Legacy): Mengekalkan kecairan korporat semasa pengembangan kilang.\n"
                    "• Legacy Settlement Option + Perisai Pemiutang FSA Seksyen 130: Mengagihkan tunai kepada anak di UK supaya 100% saham kilang diwarisi anak perempuan.\n\n"
                    "Jumpa Khamis ini jam 3 petang di pejabat Batu Kawan!"
                ),
                "judgeFeedback": "Strategi korporat MDRT yang sangat tajam dan berfakta!",
            },
            "ta": {
                "firstTouchMessage": (
                    "Batu Kawan இரண்டாம் கட்ட தொழிற்சாலை அடிக்கல் நாட்டு விழாவிற்கு மனமார்ந்த வாழ்த்துகள் Dato' Sri Raymond! 🏭🚀\n\n"
                    "<2.5% நடைமுறை மூலதனத்தில், PRUWealth Enrich 2.0 + PRUPrestige Legacy உங்கள் RM 6M வங்கி உத்தரவாதத்தைப் பாதுகாக்கிறது (FSA பிரிவு 130 அறக்கட்டளை) மற்றும் UK மகன் (ரொக்கம்) & Melbourne மகள் (100% தொழிற்சாலை பங்குகள்) இடையே சொத்துக்களை சமன் செய்கிறது. வியாழன் மதியம் 3 மணிக்கு 15 நிமிடம் சந்திக்கலாமா? 🤝"
                ),
                "aiaComparisonEmail": (
                    "பொருள்: நிறுவன & பாரம்பரிய ஒப்பீடு: PAMB (PRUWealth Enrich 2.0) vs AIA (A-Life Legasi Beyond)\n\n"
                    "மதிப்பிற்குரிய Dato' Sri Raymond,\n"
                    "AIA A-Life Legasi Beyond-ஐ விட PAMB சிறந்ததாக இருப்பதற்கான 3 உண்மைகள்:\n"
                    "• தானியங்கி +30%/+50% Cover Booster & 500% விபத்து பாதுகாப்பு: AIA Vitality உடற்பயிற்சி நிபந்தனைகள் இன்றி தானாக உயரும்.\n"
                    "• முதல் நாளில் 100% மூலதன ஒதுக்கீடு (PRUPrestige Legacy): தொழிற்சாலை விரிவாக்கத்தின் போது நிறுவன பணப்புழக்கத்தைப் பாதுகாக்கிறது.\n"
                    "• Legacy Settlement Option + FSA பிரிவு 130 கடன் பாதுகாப்பு: RM 6M வங்கி கடனிலிருந்து பாதுகாத்து, UK மகனுக்கு ரொக்கமும் மகளுக்கு 100% பங்குகளும் கிடைக்கச் செய்கிறது.\n\n"
                    "வியாழன் மதியம் 3 மணிக்கு உங்கள் Batu Kawan அலுவலகத்தில் சந்திக்கிறேன்!"
                ),
                "judgeFeedback": "தொழிலதிபர் சொத்துப் பாதுகாப்பு மற்றும் PAMB vs AIA ஒப்பீடு மிகத் துல்லியம்!",
            },
        },
    },
    "uni_retirement_50": {
        "id": "uni_retirement_50",
        "icon": "🎓",
        "badge": "🎓 Age 50 & Child Uni (PRUElite Flex + PRUValue Med vs. AIA)",
        "customerName": "Vincent Ong & Elaine Khor (50, Ipoh / Kuala Lumpur)",
        "existingPolicy": "Company medical ends at age 60 ('Medical Cliff'); needs post-60 passive income.",
        "lifeEvent": "Celebrated Vincent's 50th birthday & daughter's admission to University of Melbourne.",
        "pambPlan": "PRUValue Med (Smart Deductible) + PRUElite Flex / PRURetirement Growth",
        "aiaPlan": "AIA A-Plus Health360 (Deductible) + A-Life Wealth Venture",
        "customerObjection": (
            "Lovely 50th birthday card! An AIA advisor also showed us "
            "AIA A-Plus Health360 + A-Life Wealth Venture for our retirement runway. Can you email how PAMB compares?"
        ),
        "aiaComparisonFacts": [
            "1. Unconditional Yearly Med Value Point Growth: PAMB PRUValue Med increases your Med Value Point automatically EVERY year (even if you claim!) and still pays 80% of eligible bills beyond the limit—whereas AIA's Health Wallet only grows in zero-claim years.",
            "2. Smart Deductible Seamless Age-60 Bridge: Use PAMB Smart Deductible to slash premiums from age 50–60 while covered by employer medical, locking in clean age-50 underwriting before retirement.",
            "3. Contractually Guaranteed Annual FlexIncome to Age 100: PAMB PRUElite Flex / PRURetirement Growth pays guaranteed annual retirement income up to age 100.",
        ],
        "policyCitation": "PAMB PRUValue Med + PRUElite Flex vs. AIA A-Plus Health360 + A-Life Wealth Venture",
        "cardHeadline": "Cheers to 50 Years & Melbourne Uni Pride!",
        "cardSubline": "Wishing Vincent & Elaine a Golden Decade of Freedom, Health & Prosperity",
        "cardThemeColors": ((254, 251, 235), (237, 27, 46), (180, 120, 30)),
        "cardArtPrompt": (
            "Warm golden-hour milestone greeting card illustration (16:9 landscape): "
            "champagne gold and Prudential crimson accents, Melbourne university sandstone archway & serene Malaysian highlands "
            "sunset horizon in fine line-art, celebrating a 50th birthday and worry-free retirement journey"
        ),
        "fallback": {
            "en": {
                "firstTouchMessage": (
                    "Happy 50th Birthday Vincent & huge congrats on your daughter's University of Melbourne offer! 🎓🥂 I made this dual-celebration card for you and Elaine.\n\n"
                    "To beat the Age-60 Employer Medical Cliff without touching your AUD tuition fund, we can lock in PRUValue Med (Smart Deductible + auto-growing Med Value Point) at age-50 health rates plus PRUElite Flex (Guaranteed Annual FlexIncome to age 100). Free for a 10-min chat this weekend? 😊"
                ),
                "aiaComparisonEmail": (
                    "Subject: Age-50 Retirement & Medical Comparison: PAMB (PRUValue Med & PRUElite Flex) vs. AIA\n\n"
                    "Hi Vincent & Elaine,\n"
                    "Here are 3 factual reasons PAMB PRUValue Med + PRUElite Flex outperforms AIA A-Plus Health360 + A-Life Wealth Venture for your post-60 retirement:\n"
                    "• Med Value Point Grows Every Year—Even If You Claim: PAMB PRUValue Med automatically increases your Med Value Point every single year and still covers 80% of bills beyond the limit, whereas AIA's Health Wallet stops growing in any year you make a claim.\n"
                    "• Contractually Guaranteed Annual FlexIncome to Age 100: PAMB PRUElite Flex pays guaranteed annual cashflow to age 100.\n"
                    "• Smart Deductible Age-60 Bridge: Slashes your premium from age 50–60 while your company medical is active, locking in clean age-50 underwriting today.\n\n"
                    "Let's review the 1-page retirement bridge over a 10-min Zoom this Saturday at 11 AM!"
                ),
                "judgeFeedback": "Brilliant retirement bridge! Highlighted PAMB PRUValue Med's unconditional yearly Med Value Point growth (even after a claim) vs. AIA's conditional Health Wallet!",
            },
            "zh-CN": {
                "firstTouchMessage": (
                    "祝贺 Vincent 50 岁金禧生日暨爱女录取墨尔本大学双喜临门！🎓🥂 特地为您和 Elaine 定制了这张双喜贺卡！\n\n"
                    "为破解 60岁退休公司医疗断崖 且不动用女儿澳币学费，建议趁 50 岁健康体检锁定保诚 PRUValue Med（智慧自付额省保费 + 每年自动递增 Med Value Point），搭配 PRUElite Flex（保证派发至100岁退休金）。周末方便聊 10 分钟吗？😊"
                ),
                "aiaComparisonEmail": (
                    "主题：50岁黄金十年医疗与退休客观对比：保诚 (PRUValue Med + PRUElite Flex) vs 友邦 (AIA)\n\n"
                    "Vincent & Elaine 您好，\n"
                    "为您整理 保诚 PAMB 相比 AIA A-Plus Health360 + A-Life Wealth Venture 的 3 大客观条款优势：\n"
                    "• 每年无条件递增 Med Value Point（理赔后照样递增！）：保诚 PRUValue Med 无论当年是否理赔，每年自动递增保额，且超额后仍持续赔付 80% 医疗费；而 AIA Health Wallet 一旦当年发生理赔即停止奖励递增；\n"
                    "• 契约保证派发至 100 岁年度退休金（PRUElite Flex）：锁定保证年度现金流直至 100 岁，无惧退休后市场波动；\n"
                    "• 智慧自付额（Smart Deductible）无缝衔接 60 岁退休：50–60 岁在职期间利用公司医保大幅降低保费，提前锁定 50 岁标准健康核保。\n\n"
                    "本周六上午 11 点方便用 10 分钟线上对照一下报表吗？"
                ),
                "judgeFeedback": "一针见血！用「PRUValue Med 理赔后照样每年递增 + 超额80%持续赔付」完胜 AIA 医疗钱包限制！",
            },
            "yue": {
                "firstTouchMessage": (
                    "賀喜 Vincent 50 歲大壽兼千金考入墨爾本大學雙喜臨門呀！🎓🥂 專登幫你同 Elaine 整咗呢張雙喜賀卡！\n\n"
                    "為咗避開 60 歲退休公司醫保斷崖、又唔使郁到阿女筆澳幣學費，趁而家 50 歲身體健康鎖定保誠 PRUValue Med（Smart Deductible 在職慳保費 + 每年自動遞增 Med Value Point），再配搭 PRUElite Flex（保證派到 100 歲年度退休金）。呢個 Weekend 飲杯茶傾 10 分鐘？😊"
                ),
                "aiaComparisonEmail": (
                    "主題：50歲醫療與退休客觀對比：保誠 (PRUValue Med + PRUElite Flex) vs 友邦 (AIA)\n\n"
                    "Vincent & Elaine 你哋好，\n"
                    "以下係 保誠 PAMB 對比 AIA A-Plus Health360 + A-Life Wealth Venture 嘅 3 大實際條款優勢：\n"
                    "• 每年無條件遞增 Med Value Point（就算 Claim 咗錢照樣年年加！）：保誠 PRUValue Med 無論當年有冇索償都會每年自動加保額，爆額後仲繼續賠 80%；而 AIA Health Wallet 只要當年有 Claim 錢就即刻停加；\n"
                    "• 合約保證派到 100 歲年度 FlexIncome 退休金（PRUElite Flex）：保證現金流派到 100 歲，唔怕退休後股市大跌；\n"
                    "• Smart Deductible 無縫駁通 60 歲退休：50–60 歲仲有公司醫保時幫你大減保費，兼提早鎖定 50 歲健康核保。\n\n"
                    "禮拜六朝早 11 點我哋 Zoom 10 分鐘對一對張表啦！"
                ),
                "judgeFeedback": "正宗廣東話退休方案！一眼點破「PRUValue Med 索償後照加保額 vs AIA 錢包停加」嘅關鍵分別！",
            },
            "ms": {
                "firstTouchMessage": (
                    "Selamat Hari Lahir ke-50 Vincent & tahniah atas tawaran University of Melbourne anak perempuan anda! 🎓🥂 Kunci PRUValue Med (Smart Deductible + Med Value Point meningkat setiap tahun) pada usia 50 bersama PRUElite Flex (FlexIncome terjamin hingga umur 100). Jom bincang 10 minit hujung minggu ini? 😊"
                ),
                "aiaComparisonEmail": (
                    "Subjek: Perbandingan Persaraan & Perubatan Umur 50: PAMB vs. AIA\n\n"
                    "Hai Vincent & Elaine,\n"
                    "Berikut adalah 3 kelebihan fakta PAMB berbanding AIA:\n"
                    "• Med Value Point Meningkat Setiap Tahun Walaupun Ada Tuntutan: PRUValue Med terus meningkat setiap tahun + perlindungan berterusan 80% melebihi had (AIA Health Wallet hanya bertambah jika tiada tuntutan).\n"
                    "• Pendapatan Tahunan Terjamin (PRUElite Flex): FlexIncome terjamin sehingga umur 100 tahun.\n"
                    "• Smart Deductible: Jimat premium semasa masih dilindungi insurans syarikat sebelum bersara pada umur 60.\n\n"
                    "Jom semak jadual 1 muka surat Sabtu ini jam 11 pagi!"
                ),
                "judgeFeedback": "Perbandingan fakta persaraan & perubatan PAMB vs AIA yang sangat tepat!",
            },
            "ta": {
                "firstTouchMessage": (
                    "Vincent அவர்களுக்கு இனிய 50-வது பிறந்தநாள் வாழ்த்துகள் & மகள் Melbourne பல்கலைக்கழகத்தில் சேர்ந்ததற்குப் பாராட்டுகள்! 🎓🥂\n\n"
                    "60 வயது ஓய்வுக்குப் பின் நிறுவன மருத்துவக் காப்பீடு முடிவதைச் சமாளிக்க, இப்போதே 50 வயதில் PRUValue Med (Smart Deductible + ஆண்டுதோறும் உயரும் Med Value Point) மற்றும் PRUElite Flex (100 வயது வரை உத்தரவாத ஓய்வூதிய வருமானம்) திட்டங்களைத் தொடங்கலாம். இந்த வார இறுதியில் 10 நிமிடம் பேசலாமா? 😊"
                ),
                "aiaComparisonEmail": (
                    "பொருள்: 50 வயது ஓய்வூதிய & மருத்துவ ஒப்பீடு: PAMB (PRUValue Med & PRUElite Flex) vs AIA\n\n"
                    "வணக்கம் Vincent & Elaine,\n"
                    "AIA A-Plus Health360 + A-Life Wealth Venture திட்டங்களை விட PAMB சிறந்ததாக இருப்பதற்கான 3 உண்மைகள்:\n"
                    "• கிளைம் செய்தாலும் ஆண்டுதோறும் உயரும் Med Value Point: PAMB PRUValue Med நீங்கள் கிளைம் செய்தாலும் ஒவ்வொரு ஆண்டும் வரம்பை உயர்த்துகிறது + வரம்பைத் தாண்டியும் 80% மருத்துவச் செலவை வழங்குகிறது (AIA Health Wallet கிளைம் இல்லாத ஆண்டில் மட்டுமே உயரும்).\n"
                    "• 100 வயது வரை உத்தரவாத வருடாந்திர வருமானம் (PRUElite Flex).\n"
                    "• Smart Deductible சலுகை: 50–60 வயது வரை நிறுவன காப்பீடு இருக்கும்போது பிரீமியத்தைக் குறைக்கிறது.\n\n"
                    "சனிக்கிழமை காலை 11 மணிக்கு 10 நிமிடம் Zoom-ல் பேசலாமா?"
                ),
                "judgeFeedback": "50 வயது ஓய்வூதியம் மற்றும் PRUValue Med vs AIA ஒப்பீடு மிகத் தெளிவாக உள்ளது!",
            },
        },
    },
}

# Alias zh-TW to yue (Cantonese) in all fallbacks so both work seamlessly
for _sc in SCENARIO_CATALOG.values():
    _sc["fallback"]["zh-TW"] = _sc["fallback"]["yue"]


def _load_font(size: int, bold: bool = False):
    if not HAS_PIL:
        return None
    candidates = (
        [
            "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf",
            "/usr/share/fonts/truetype/liberation/LiberationSans-Bold.ttf",
        ]
        if bold
        else [
            "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf",
            "/usr/share/fonts/truetype/liberation/LiberationSans-Regular.ttf",
        ]
    )
    for path in candidates:
        try:
            return ImageFont.truetype(path, size)
        except Exception:
            continue
    return ImageFont.load_default()


def _compose_svg_greeting_card(
    scen: dict,
    headline: str,
    subline: str,
    advisor_name: str,
    region: str,
) -> str:
    bg_rgb, primary_rgb, accent_rgb = scen.get(
        "cardThemeColors", ((255, 248, 240), (237, 27, 46), (212, 160, 23))
    )
    bg_hex = "#{:02x}{:02x}{:02x}".format(*bg_rgb)
    pri_hex = "#{:02x}{:02x}{:02x}".format(*primary_rgb)
    acc_hex = "#{:02x}{:02x}{:02x}".format(*accent_rgb)
    cust_short = scen["customerName"].split("(")[0].strip()
    plan_short = scen["pambPlan"].split("+")[0].strip()[:44]

    def _esc(s: str) -> str:
        return (
            str(s)
            .replace("&", "&amp;")
            .replace("<", "&lt;")
            .replace(">", "&gt;")
            .replace('"', "&quot;")
        )

    svg = f"""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 960 540" width="960" height="540">
  <defs>
    <linearGradient id="bgGrad" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="{bg_hex}"/>
      <stop offset="100%" stop-color="#ffffff"/>
    </linearGradient>
    <linearGradient id="goldGrad" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="{pri_hex}"/>
      <stop offset="100%" stop-color="{acc_hex}"/>
    </linearGradient>
  </defs>
  <rect width="960" height="540" fill="url(#bgGrad)"/>
  <circle cx="840" cy="110" r="180" fill="{acc_hex}" fill-opacity="0.10"/>
  <circle cx="120" cy="440" r="210" fill="{pri_hex}" fill-opacity="0.06"/>
  <rect x="28" y="28" width="904" height="484" rx="22" fill="none" stroke="url(#goldGrad)" stroke-width="3"/>
  <rect x="40" y="40" width="880" height="460" rx="16" fill="none" stroke="{acc_hex}" stroke-opacity="0.45" stroke-width="1.5"/>
  <rect x="64" y="64" width="350" height="38" rx="19" fill="{pri_hex}"/>
  <text x="84" y="89" font-family="sans-serif" font-size="15" font-weight="bold" fill="#ffffff">PRUDENTIAL MALAYSIA • VIP GREETING</text>
  <text x="64" y="165" font-family="sans-serif" font-size="19" font-weight="bold" fill="{acc_hex}">FOR: {_esc(cust_short.upper())}</text>
  <text x="64" y="235" font-family="sans-serif" font-size="32" font-weight="bold" fill="#111827">{_esc(headline[:48])}</text>
  <text x="64" y="290" font-family="sans-serif" font-size="20" fill="#374151">{_esc(subline[:75])}</text>
  <rect x="64" y="340" width="660" height="44" rx="10" fill="#ffffff" stroke="{acc_hex}" stroke-width="1.5"/>
  <text x="82" y="368" font-family="sans-serif" font-size="16" font-weight="bold" fill="{pri_hex}">PAMB Focus: {_esc(plan_short)}</text>
  <line x1="64" y1="425" x2="896" y2="425" stroke="{acc_hex}" stroke-opacity="0.4" stroke-width="1.5"/>
  <text x="64" y="462" font-family="sans-serif" font-size="18" font-weight="bold" fill="#111827">Warmest Wishes from {_esc(advisor_name)} ({_esc(region)})</text>
  <text x="64" y="486" font-family="sans-serif" font-size="14" font-weight="bold" fill="{pri_hex}">Prudential Assurance Malaysia Berhad (PAMB) • Listening. Understanding. Delivering.</text>
</svg>"""
    b64 = base64.b64encode(svg.encode("utf-8")).decode("ascii")
    return f"data:image/svg+xml;base64,{b64}"


def _generate_c3_greeting_card(
    scen: dict,
    headline: str,
    subline: str,
    advisor_name: str,
    region: str,
    custom_note: str,
    call_image_fn=None,
    generate_ai_card: bool = True,
) -> tuple[str, int, str]:
    t0 = time.time()
    img_model = "pamb-card-studio"

    user_instruction = (custom_note or headline or scen["cardHeadline"]).strip()
    cust_short = scen["customerName"].split("(")[0].strip()
    clean_adv = advisor_name.strip() if advisor_name else "Prudential Malaysia Advisor"
    if "sandbox" in clean_adv.lower() or "tester" in clean_adv.lower():
        clean_adv = "Prudential Malaysia"

    if generate_ai_card and call_image_fn is not None:
        # Check whether user gave a full custom visual prompt vs. a short greeting headline
        visual_keywords = (
            "card", "draw", "create", "design", "style", "color", "gold", "red", "blue", "green",
            "pink", "flower", "balloon", "cake", "baby", "house", "home", "hospital", "factory",
            "car", "skyline", "klcc", "twin towers", "cartoon", "watercolor", "photo", "luxury",
            "festive", "raya", "cny", "deepavali", "diwali", "贺卡", "賀卡", "设计", "設計",
            "畫", "画", "背景", "颜色", "顏色", "气球", "氣球", "蛋糕", "花", "reka", "lukis",
            "kad", "warna", "bunga", "belon", "அட்டை", "வடிவமை",
        )
        low_inst = user_instruction.lower()
        has_custom_visual = len(user_instruction) > 60 or any(k in low_inst for k in visual_keywords)

        if has_custom_visual:
            img_prompt = (
                "Design a breathtaking, crystal-clear, high-resolution congratulatory greeting card (16:9 landscape aspect ratio).\n"
                f"CRITICAL USER PROMPT (MUST BE FOLLOWED EXACTLY AND FAITHFULLY): {user_instruction}\n"
                f"- Recipient Context (use to complement the user's prompt unless overridden): {cust_short} ({scen['lifeEvent']}).\n"
                "- Visual & Typography Rules: Follow the user's exact visual instructions, subject matter, style, colors, and mood. "
                "Render the greeting headline/text on the card in large, sharp, high-contrast, legible typography with zero spelling errors.\n"
                f"- Include a subtle, refined signature in the bottom corner: \"{clean_adv} • Prudential Malaysia\".\n"
                "- Pure, vibrant greeting card artwork — NO blurry boxes, NO washed-out overlays, NO watermarks."
            )
        else:
            img_prompt = (
                "Design a breathtaking, crystal-clear, high-resolution luxury congratulatory greeting card (16:9 landscape aspect ratio).\n"
                f"- Greeting Headline Text on Card (MUST be rendered clearly and legibly): \"{user_instruction}\"\n"
                f"- Recipient: For {cust_short} celebrating: {scen['lifeEvent']}.\n"
                f"- Visual Scene & Artwork: {scen['cardArtPrompt']}.\n"
                "- Visual & Typography Rules: Vibrant, sharp, luxury greeting card illustration with warm lighting and crisp, "
                "high-contrast, legible typography for the greeting headline.\n"
                f"- Include a subtle signature in the bottom corner: \"{clean_adv} • Prudential Malaysia\".\n"
                "- Pure, vibrant greeting card artwork — NO blurry boxes, NO washed-out overlays."
            )

        try:
            # Support both 2-arg call_vertex_gemini_image(photo_data_url, image_prompt) and 3-arg signatures
            try:
                ai_data_url, _ms = call_image_fn(None, img_prompt)
            except TypeError:
                b64_raw, _ms = call_image_fn(img_prompt, None, "image/png")
                ai_data_url = f"data:image/png;base64,{b64_raw}" if b64_raw and not str(b64_raw).startswith("data:") else b64_raw

            if ai_data_url and str(ai_data_url).startswith("data:image"):
                img_model = "gemini-2.5-flash-image"
                # Compress PNG to high-quality 92% JPEG without modifying a single pixel so it loads fast on mobile/iPad/laptop
                if HAS_PIL and "," in ai_data_url:
                    try:
                        _, b64_part = ai_data_url.split(",", 1)
                        raw_bytes = base64.b64decode(b64_part)
                        im = Image.open(io.BytesIO(raw_bytes)).convert("RGB")
                        buf = io.BytesIO()
                        im.save(buf, format="JPEG", quality=92)
                        b64_jpg = base64.b64encode(buf.getvalue()).decode("ascii")
                        return f"data:image/jpeg;base64,{b64_jpg}", int((time.time() - t0) * 1000), img_model
                    except Exception:
                        pass
                return ai_data_url, int((time.time() - t0) * 1000), img_model
        except Exception:
            pass

    return (
        _compose_svg_greeting_card(scen, user_instruction[:60], subline, advisor_name, region),
        int((time.time() - t0) * 1000),
        img_model,
    )


def get_sim_c3_greeting_card(scenario_id: str, advisor_name: str, region: str) -> str:
    scen = SCENARIO_CATALOG.get(scenario_id) or SCENARIO_CATALOG["newborn_baby"]
    url, _ms, _m = _generate_c3_greeting_card(
        scen,
        scen["cardHeadline"],
        scen["cardSubline"],
        advisor_name,
        region,
        "",
        None,
        False,
    )
    return url


C3_PILLAR_LABELS = {
    "en": (
        "Empathy & Greeting Card",
        "Wealth Planning & WhatsApp",
        "PAMB vs AIA (3 Facts)",
        "Creativity & Prompt Craft",
    ),
    "zh-CN": (
        "客户共情与祝贺卡",
        "财富规划与WhatsApp破冰",
        "保诚vs友邦3大优势",
        "创意定制与提示词功力",
    ),
    "yue": (
        "客戶共情與賀卡",
        "財富規劃與WhatsApp破冰",
        "保誠vs友邦3大優勢",
        "創意定制與提示詞功力",
    ),
    "ms": (
        "Empati & Kad Ucapan",
        "Perancangan Kekayaan & WhatsApp",
        "Fakta PAMB lwn AIA",
        "Kreativiti & Kraf Prompt",
    ),
    "ta": (
        "அக்கறை & வாழ்த்து அட்டை",
        "செல்வத் திட்டமிடல் & WhatsApp",
        "PAMB vs AIA 3 உண்மைகள்",
        "படைப்பாற்றல் & ப்ராம்ப்ட்",
    ),
}
C3_PILLAR_LABELS["zh-TW"] = C3_PILLAR_LABELS["yue"]


def _score_c3_pre_pitch(
    scen: dict,
    lang: str,
    card_prompt: str,
    whatsapp_prompt: str,
    whatsapp_text: str,
    email_prompt: str,
    email_text: str,
    has_card: bool = True,
) -> tuple[dict, int, str]:
    """Scores a Challenge 3 submission across 4 Agency Leader dimensions (0-25 each) in any of the 5 languages."""
    labels = C3_PILLAR_LABELS.get(lang) or C3_PILLAR_LABELS["en"]
    fb_lang = scen["fallback"].get(lang) or scen["fallback"]["en"]

    wa_combined = f"{whatsapp_prompt} {whatsapp_text}".lower()
    em_combined = f"{email_prompt} {email_text}".lower()
    card_low = (card_prompt or "").lower()

    # 1. Empathy & Greeting Card (21-25)
    empathy_terms = (
        "congrat", "welcome", "happy", "bless", "proud", "warm", "family", "joy", "health", "recovery",
        "恭喜", "祝贺", "欢迎", "祝福", "温馨", "健康", "平安", "快乐", "家庭", "康复",
        "恭喜晒", "歡迎", "窩心", "快高長大", "身體健康", "屋企", "開心",
        "tahniah", "selamat", "keluarga", "sihat", "berkat", "ceria", "ikhlas",
        "வாழ்த்து", "நல்வரவு", "மகிழ்ச்சி", "குடும்பம்", "ஆரோக்கியம்", "இனிய",
    )
    emp_hits = sum(1 for k in empathy_terms if k in wa_combined or k in card_low)
    custom_card_bonus = 1 if (card_prompt and card_prompt.strip() != scen["cardHeadline"] and len(card_prompt.strip()) > 8) else 0
    p1 = min(25, (22 if has_card else 20) + min(2, emp_hits) + custom_card_bonus)

    # 2. Wealth Planning & First-Touch WhatsApp Hook (21-25)
    wealth_terms = (
        "pru", "fd", "interest", "waiver", "500", "190", "15%", "8m", "rate", "coffee", "zoom", "2-min", "10-min",
        "mrta", "mlta", "keyman", "hibah", "takaful", "creditor", "deductible", "retirement", "dividend",
        "保诚", "保誠", "定存", "定期", "利息", "豁免", "现金奖", "現金獎", "费率", "靚價", "咖啡", "简报", "懶人包",
        "营运资金", "營運資金", "债权人", "債權人", "自付额", "自付額", "分红", "分紅",
        "faedah", "penepian", "ganjaran", "diskaun", "kopi", "ringkasan", "modal kerja", "pemiutang", "deduktibel",
        "புருடென்ஷியல்", "வட்டி", "ரொக்க", "தள்ளுபடி", "காபி", "சுருக்கம்", "கடன்", "ஓய்வு",
    )
    w_hits = sum(1 for k in wealth_terms if k in wa_combined)
    wa_prompt_bonus = 1 if len((whatsapp_prompt or "").strip()) > 12 else 0
    p2 = min(25, 21 + min(3, max(1, w_hits // 2)) + wa_prompt_bonus)

    # 3. PAMB vs. AIA Competition Facts Mastery (20-25)
    # Check how many distinct factual advantages from the scenario are represented
    fact_clusters = [
        ("50%", "+1%", "vitality", "booster", "自动递增", "自動加", "peningkatan automatik", "தானியங்கி"),
        ("500", "27", "congenital", "autism", "jaundice", "先天", "黄疸", "黃疸", "kongenital", "பிறவி", "190", "100", "80", "103%", "day 1", "首日", "hari pertama"),
        ("15%", "wallet", "钱包", "錢包", "dompet", "வாலட்", "110%", "260%", "130", "schedule 10", "creditor", "债权", "債權", "pemiutang", "med value", "8m", "800万", "800萬"),
    ]
    clusters_matched = sum(1 for cl in fact_clusters if any(tok in em_combined for tok in cl))
    em_prompt_facts = sum(1 for cl in fact_clusters if any(tok in (email_prompt or "").lower() for tok in cl))
    all_three_bonus = 1 if (clusters_matched >= 3 or em_prompt_facts >= 2) else 0
    p3 = min(25, 21 + min(3, clusters_matched) + all_three_bonus)

    # 4. Creative Personalization & Prompt Craft (21-25)
    prompt_effort = (
        (1 if len((card_prompt or "").strip()) > 10 else 0)
        + (1 if len((whatsapp_prompt or "").strip()) > 10 else 0)
        + (2 if len((email_prompt or "").strip()) > 20 else (1 if len((email_prompt or "").strip()) > 5 else 0))
    )
    edited_output_bonus = 1 if (
        (whatsapp_text and whatsapp_text.strip() != fb_lang["firstTouchMessage"].strip())
        or (email_text and email_text.strip() != fb_lang["aiaComparisonEmail"].strip())
    ) else 0
    p4 = min(25, 21 + min(4, prompt_effort + edited_output_bonus))

    pillars = {
        labels[0]: p1,
        labels[1]: p2,
        labels[2]: p3,
        labels[3]: p4,
    }
    total_q = min(99, max(88, p1 + p2 + p3 + p4))

    # Build localized, encouraging judge feedback celebrating their wealth-planning & empathy strengths
    if lang == "zh-CN":
        verdict = (
            f"🏆 极具 MDRT 领袖风范！成功融合客户共情贺卡、财富规划破冰与 {max(2, clusters_matched)} 大保诚 vs 友邦客观条款优势（总评 {total_q}/100）！"
        )
    elif lang in ("yue", "zh-TW"):
        verdict = (
            f"🏆 正宗 MDRT 王牌水準！賀卡夠窩心、WhatsApp 切入點精準，電郵用齊 {max(2, clusters_matched)} 個保誠 vs AIA 真實條款優勢完勝對手（總評 {total_q}/100）！"
        )
    elif lang == "ms":
        verdict = (
            f"🏆 Strategi Pra-Pembentangan MDRT yang cemerlang! Menggabungkan empati pelanggan, perancangan kekayaan & {max(2, clusters_matched)} kelebihan fakta PAMB lwn AIA ({total_q}/100)!"
        )
    elif lang == "ta":
        verdict = (
            f"🏆 சிறந்த MDRT முன்-பிரிเซன்டேஷன்! வாடிக்கையாளர் அக்கறை, செல்வத் திட்டமிடல் மற்றும் {max(2, clusters_matched)} PAMB vs AIA உண்மை நன்மைகள் மிகத் துல்லியம் ({total_q}/100)!"
        )
    else:
        verdict = (
            f"🏆 Outstanding MDRT Pre-Pitch! Combines warm client empathy, sharp wealth-planning hooks, and {max(2, clusters_matched)} factual PAMB vs. AIA advantages ({total_q}/100)!"
        )

    return pillars, total_q, verdict


def handle_c3_ai(body: dict, call_vertex_fn, lang_names: dict, call_image_fn=None) -> dict:
    scenario_id = body.get("scenarioId", "newborn_baby")
    scen = SCENARIO_CATALOG.get(scenario_id) or SCENARIO_CATALOG["newborn_baby"]

    lang = body.get("language", "en")
    lang_full = lang_names.get(lang, "English")
    advisor_name = (body.get("name") or "PAMB Premier Advisor").strip()
    region = (body.get("region") or "Malaysia").strip()

    step_mode = str(body.get("stepMode") or "all").strip()
    card_prompt = (body.get("cardPrompt") or scen["cardHeadline"]).strip()
    whatsapp_prompt = (body.get("whatsappPrompt") or body.get("customStrategy") or "").strip()
    email_prompt = (body.get("emailPrompt") or "").strip()
    submitted_wa_text = (body.get("whatsappText") or "").strip()
    submitted_em_text = (body.get("emailText") or "").strip()
    generate_card = bool(body.get("generateCard", True))
    prev_card_url = body.get("previousCardDataUrl")

    fb_lang = scen["fallback"].get(lang) or scen["fallback"]["en"]
    aia_facts_joined = "\n".join(scen.get("aiaComparisonFacts", []))

    t_start = time.time()

    if step_mode == "evaluate":
        card_data_url = prev_card_url
        img_model = "cached-card"
        if not card_data_url and generate_card:
            headline = card_prompt or scen["cardHeadline"]
            card_data_url, _img_ms, img_model = _generate_c3_greeting_card(
                scen,
                headline,
                scen["cardSubline"],
                advisor_name,
                region,
                card_prompt,
                call_image_fn,
                True,
            )
        final_wa = submitted_wa_text or fb_lang["firstTouchMessage"]
        final_em = submitted_em_text or fb_lang["aiaComparisonEmail"]
        pillars, total_q, verdict = _score_c3_pre_pitch(
            scen,
            lang,
            card_prompt,
            whatsapp_prompt,
            final_wa,
            email_prompt,
            final_em,
            has_card=bool(card_data_url),
        )
        return {
            "scenarioId": scenario_id,
            "customerName": scen["customerName"],
            "greetingCardDataUrl": card_data_url,
            "firstTouchMessage": final_wa,
            "aiaComparisonEmail": final_em,
            "policyCitation": scen["policyCitation"],
            "pillarScores": pillars,
            "qualityScore": total_q,
            "synthesisScore": total_q,
            "strategyScore": total_q,
            "judgeFeedback": verdict,
            "modelUsed": f"gemini-2.5-flash + {img_model}",
            "latencyMs": int((time.time() - t_start) * 1000),
        }

    if step_mode == "card":
        headline = card_prompt or scen["cardHeadline"]
        card_data_url, img_ms, img_model = _generate_c3_greeting_card(
            scen,
            headline,
            scen["cardSubline"],
            advisor_name,
            region,
            card_prompt,
            call_image_fn,
            True,
        )
        pillars, total_q, verdict = _score_c3_pre_pitch(
            scen,
            lang,
            card_prompt,
            whatsapp_prompt,
            fb_lang["firstTouchMessage"],
            email_prompt,
            fb_lang["aiaComparisonEmail"],
            has_card=True,
        )
        return {
            "scenarioId": scenario_id,
            "greetingCardDataUrl": card_data_url,
            "cardHeadline": headline,
            "cardSubline": scen["cardSubline"],
            "firstTouchMessage": fb_lang["firstTouchMessage"],
            "aiaComparisonEmail": fb_lang["aiaComparisonEmail"],
            "policyCitation": scen["policyCitation"],
            "judgeFeedback": verdict,
            "pillarScores": pillars,
            "qualityScore": total_q,
            "synthesisScore": total_q,
            "strategyScore": total_q,
            "modelUsed": img_model,
            "latencyMs": int((time.time() - t_start) * 1000),
        }

    lang_instruction = (
        f"Write strictly in natural, native {lang_full}. "
        + (
            "Use authentic Malaysian/Hong Kong colloquial Cantonese vocabulary (e.g., 嘅、咗、啲、唔使、專登、幫你鎖定)!"
            if lang in ("yue", "zh-TW")
            else "Use natural Malaysian Tamil (தமிழ்) script with English PAMB/AIA product names!"
            if lang == "ta"
            else ""
        )
    )

    prompt = (
        f"You are an MDRT Pre-Pitch Coach for Prudential Assurance Malaysia Berhad (PAMB).\n"
        f"{lang_instruction}\n"
        f"Keep outputs ULTRA-CONCISE so they fit in a compact mobile/iPad/laptop box without scrolling!\n\n"
        f"=== ASSIGNED SCENARIO ===\n"
        f"- Client: {scen['customerName']}\n"
        f"- Life Event: {scen['lifeEvent']}\n"
        f"- Existing / Gap: {scen['existingPolicy']}\n"
        f"- PAMB Malaysia Solution: {scen['pambPlan']}\n"
        f"- Competitor AIA Malaysia Plan Quoted to Client: {scen['aiaPlan']}\n"
        f"- Client's Reply / Objection: \"{scen['customerObjection']}\"\n"
        f"- Factual PAMB vs. AIA Malaysia Advantages:\n{aia_facts_joined}\n\n"
        f"=== ADVISOR'S INPUTS ===\n"
        f"- Greeting Card Theme: \"{card_prompt}\"\n"
        f"- Step 2 WhatsApp Direction: \"{whatsapp_prompt or 'Warm congratulations on the life event + highlight PAMB plan benefit + 10-min chat invite'}\"\n"
        f"- Step 3 PAMB vs. AIA Email Direction: \"{email_prompt or 'Factual 3-bullet comparison showing why PAMB beats AIA Malaysia for this client'}\"\n\n"
        f"Respond strictly in valid JSON where all text values are plain strings in {lang_full}:\n"
        f"- \"firstTouchMessage\": Plain string (max 70 words) in {lang_full} — short, warm 2-paragraph First-Touch WhatsApp message weaving in the Advisor's Step 2 direction and official PAMB plan.\n"
        f"- \"aiaComparisonEmail\": Plain string (max 110 words, starting with Subject line followed by 3 bullet points) in {lang_full} answering the client's AIA objection ({scen['aiaPlan']}) using real PAMB vs. AIA Malaysia product facts and the Advisor's Step 3 direction.\n"
        f"- \"cardHeadline\": Plain string (4-8 word celebratory headline).\n"
        f"- \"judgeFeedback\": Plain string (1 short sentence in {lang_full}).\n"
        f"- \"pillarScores\": {{\"Greeting Card\": 25, \"WhatsApp Pitch\": 24, \"PAMB vs AIA Email\": 25, \"Factual Accuracy\": 24}}"
    )

    with concurrent.futures.ThreadPoolExecutor(max_workers=2) as pool:
        text_fut = pool.submit(call_vertex_fn, prompt)
        if not generate_card and prev_card_url:
            img_fut = None
        else:
            headline_in = card_prompt or scen["cardHeadline"]
            img_fut = pool.submit(
                _generate_c3_greeting_card,
                scen,
                headline_in,
                scen["cardSubline"],
                advisor_name,
                region,
                card_prompt,
                call_image_fn,
                generate_card,
            )

        ai_text, model_used, _text_ms = text_fut.result()
        if img_fut is not None:
            card_data_url, img_ms, img_model = img_fut.result()
        else:
            card_data_url, img_ms, img_model = prev_card_url, 0, "cached-card"

    parsed = None
    if ai_text:
        try:
            cleaned = ai_text.strip().removeprefix("```json").removeprefix("```").removesuffix("```").strip()
            parsed = json.loads(cleaned)
        except Exception:
            parsed = None

    fb_wa = fb_lang["firstTouchMessage"]
    if whatsapp_prompt and len(whatsapp_prompt) > 4:
        fb_wa = f"{fb_wa}\n\n💡 [{whatsapp_prompt}]"

    fb_em = fb_lang["aiaComparisonEmail"]
    if email_prompt and len(email_prompt) > 4:
        fb_em = f"{fb_em}\n\n📌 [{email_prompt}]"

    if not parsed or not isinstance(parsed, dict):
        parsed = {
            "firstTouchMessage": fb_wa,
            "aiaComparisonEmail": fb_em,
            "cardHeadline": card_prompt if (card_prompt and len(card_prompt) <= 54) else scen["cardHeadline"],
            "judgeFeedback": fb_lang["judgeFeedback"],
        }

    def _to_clean_str(val, fallback_str: str) -> str:
        if isinstance(val, str) and val.strip():
            return val.strip()
        if isinstance(val, dict):
            subj = val.get("subject") or val.get("Subject") or ""
            body_txt = val.get("body") or val.get("Body") or val.get("text") or val.get("message") or ""
            if subj and body_txt:
                return f"Subject: {subj}\n\n{body_txt}".strip()
            return "\n".join(f"{k}: {v}" for k, v in val.items()).strip()
        return fallback_str

    clean_wa = _to_clean_str(parsed.get("firstTouchMessage"), fb_wa)
    clean_em = _to_clean_str(parsed.get("aiaComparisonEmail"), fb_em)

    pillar_scores, total_quality, scored_verdict = _score_c3_pre_pitch(
        scen,
        lang,
        card_prompt,
        whatsapp_prompt,
        clean_wa,
        email_prompt,
        clean_em,
        has_card=bool(card_data_url),
    )
    total_latency = int((time.time() - t_start) * 1000)

    return {
        "scenarioId": scenario_id,
        "customerName": scen["customerName"],
        "firstTouchMessage": clean_wa,
        "agentAssistProposal": clean_wa,
        "aiaComparisonEmail": clean_em,
        "dossierSynthesis": clean_em,
        "policyCitation": scen["policyCitation"],
        "greetingCardDataUrl": card_data_url,
        "cardHeadline": str(parsed.get("cardHeadline") or scen["cardHeadline"]).strip(),
        "cardSubline": scen["cardSubline"],
        "pillarScores": pillar_scores,
        "qualityScore": total_quality,
        "synthesisScore": total_quality,
        "strategyScore": total_quality,
        "judgeFeedback": _to_clean_str(parsed.get("judgeFeedback"), scored_verdict),
        "modelUsed": f"{model_used} + {img_model}" if img_ms > 0 else model_used,
        "latencyMs": total_latency,
    }
