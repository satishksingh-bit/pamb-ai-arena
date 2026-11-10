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
  • Step 2: Concise First-Touch WhatsApp Message (Official PRU Malaysia Plan)
  • Step 3: Live Customer Objection ("I want to compare with AIA Malaysia!")
            -> Factual PRU vs. AIA Malaysia Comparison Email
  • Final Submit: Compact Single-Screen View (Greeting Card at Top + WhatsApp & Email)
============================================================================
"""

import base64
import concurrent.futures
import io
import json
import re
import time
from challenges.c3_scenarios_bank import (
    ARCHETYPE_ORDER,
    SEAT_ROSTER_56,
    get_total_unique_seats,
    list_all_archetype_summaries,
    resolve_seat_scenario,
)

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
        "existingPolicy": "Old RM 150k single medical card; RM 0 Day-1 newborn wellness cover or uni milestone fund.",
        "lifeEvent": "Welcomed 1st baby boy (Lucas) at PJ private hospital; wants Day-1 newborn wellness protection & future university milestone fund.",
        "pambPlan": "PRUMy Child Plus (PRUSaver Kid) + PRUWith You Plus + PRUMillion Med Active 2.0",
        "aiaPlan": "AIA A-Life Joy Xtra + A-Plus BabyCare + A-Plus Health360",
        "customerObjection": (
            "Thanks for the lovely card & WhatsApp! By the way, an AIA Malaysia agent just quoted us "
            "AIA A-Life Joy Xtra + A-Plus BabyCare. Can you email me how your PRU plan offer compares factually with AIA?"
        ),
        "aiaComparisonFacts": [
            "1. Free +50% Auto Sum Assured Booster: PRUWith You Plus grows parental cover by +1%/yr (up to +50%) automatically at RM 0 extra cost—no AIA Vitality gym/fitness tracking required.",
            "2. Immediate RM 500 Childbirth Cash Reward + Day-1 Wellness & Payor Continuity: PRUWith You Plus pays a direct RM 500 cash reward on Lucas's birth + unlocks Day-1 newborn wellness protection, pediatric milestone care & Payor Waiver continuity under PRUMy Child Plus.",
            "3. 15% Instant Medical Discount: PRUMillion Med Active 2.0 gives a direct 15% cash premium discount every claim-free year (vs. AIA crediting a conditional Health Wallet).",
        ],
        "policyCitation": "PRUMy Child Plus + PRUWith You Plus vs. AIA A-Life Joy Xtra",
        "cardHeadline": "Welcome to the World, Baby Lucas!",
        "cardSubline": "Wishing Wei Ming & Chloe Endless Joy, Health & Generational Blessing",
        "cardThemeColors": ((255, 248, 240), (237, 27, 46), (212, 160, 23)),
        "cardArtPrompt": (
            "Luxury warm Malaysian newborn baby congratulatory greeting card illustration (16:9 landscape): "
            "soft cream silk background, delicate gold foil baby rattle, blooming white orchids, warm golden sunlight, "
            "subtle crimson ribbon accent, ultra-clean executive stationery aesthetic, do NOT include any company logo or corporate footer"
        ),
        "fallback": {
            "en": {
                "firstTouchMessage": (
                    "Hi Wei Ming & Chloe! Huge congratulations on welcoming Baby Lucas! 🍼✨ I made this celebratory card for your family.\n\n"
                    "Quick heads-up: you can claim an RM 500 Childbirth Cash Reward under PRUWith You Plus, and start PRUMy Child Plus early for Day-1 newborn wellness protection, pediatric milestone care & a PRUSaver Kid university milestone fund with Payor Continuity Guarantee using just your FD interest. Shall I WhatsApp you a 2-min summary while Lucas naps? 😊"
                ),
                "aiaComparisonEmail": (
                    "Subject: Factual Comparison for Baby Lucas: PRU (PRUMy Child Plus) vs. AIA (A-Life Joy Xtra)\n\n"
                    "Hi Wei Ming & Chloe,\n"
                    "Here are 3 factual reasons our PRU plan gives Lucas & your family stronger value than AIA A-Life Joy Xtra:\n"
                    "• Free +50% Sum Assured Booster (No Fitness Tracking): PRUWith You Plus automatically boosts protection by +1%/yr up to +50% at RM 0 cost, whereas AIA requires maintaining AIA Vitality status/fees.\n"
                    "• RM 500 Cash Reward + Day-1 Newborn Wellness Protection: Immediate RM 500 Childbirth Cash Reward + comprehensive Day-1 pediatric wellness care & Payor Continuity Guarantee under PRUMy Child Plus.\n"
                    "• 15% Instant Premium Discount: PRUMillion Med Active 2.0 cuts medical premium by 15% every claim-free year in cash (AIA only credits a conditional Health Wallet).\n\n"
                    "Let's do a quick 10-min Zoom Thursday at 8 PM to compare the exact tables!"
                ),
                "judgeFeedback": "Crisp MDRT execution! Warm newborn greeting + punchy WhatsApp + factual 3-point PRU vs. AIA A-Life Joy Xtra comparison!",
            },
            "zh-CN": {
                "firstTouchMessage": (
                    "Wei Ming、Chloe 恭喜喜添小王子 Lucas！🍼✨ 特地为小宝贝定制了这张祝福贺卡！\n\n"
                    "温馨提醒：您可以申领 PRUWith You Plus RM 500 添丁现金奖，同时仅需用定存利息即可尽早启动 PRUMy Child Plus，锁定宝宝初生首日全面健康守护、儿科成长礼遇及 PRUSaver Kid 大学里程碑基金（含父母保费豁免延续保障）。我先发份 2 分钟简报供你们趁宝宝睡着时翻阅好吗？😊"
                ),
                "aiaComparisonEmail": (
                    "主题：Baby Lucas 保障客观对比：PRU (PRUMy Child Plus) vs 友邦 (AIA A-Life Joy Xtra)\n\n"
                    "Wei Ming & Chloe 您好，\n"
                    "以下为您整理 PRU 方案 相比 AIA A-Life Joy Xtra 的 3 大客观产品优势：\n"
                    "• 免费 +50% 保额自动递增（无需打卡运动）：PRUWith You Plus 每年自动免费递增 1% 保额（最高 +50%），而 AIA 需持续缴纳 Vitality 会费并完成运动积分；\n"
                    "• RM 500 添丁现金奖 + 宝宝首日安心守护：PRUWith You Plus 直接派发 RM 500 现金奖，且 PRUMy Child Plus 提供初生首日健康成长守护与投保人保费延续豁免（Payor Waiver）；\n"
                    "• 无理赔直接享 15% 保费现金折扣：PRUMillion Med Active 2.0 无理赔直接减免 15% 实际保费（AIA Health360 仅累计医疗钱包额度）。\n\n"
                    "周四晚 8 点我们用 10 分钟线上对照一下条款明细吧！"
                ),
                "judgeFeedback": "教科书级三步预热！贺卡温馨、WhatsApp 简短有力、邮件精准用 3 大客观条款优势击败 AIA A-Life Joy Xtra！",
            },
            "yue": {
                "firstTouchMessage": (
                    "Wei Ming、Chloe 恭喜晒你哋添咗小王子 Lucas 呀！🍼✨ 我專登幫 BB 整咗呢張祝賀卡！\n\n"
                    "順便提一提：你哋可以即刻領取 PRUWith You Plus 嘅 RM 500 添丁現金獎，而且淨係用定期存款利息就可以及早啟動 PRUMy Child Plus，鎖定 Lucas 初生首日周全健康守護、兒科成長禮遇同埋 PRUSaver Kid 大學里程碑基金（連父母 Payor Waiver 保費延續保障）。不如我 WhatsApp 份 2 分鐘重點俾你哋趁 BB 瞓覺時睇下？😊"
                ),
                "aiaComparisonEmail": (
                    "主題：Baby Lucas 保障客觀對比：PRU (PRUMy Child Plus) vs 友邦 (AIA A-Life Joy Xtra)\n\n"
                    "Wei Ming & Chloe 你哋好，\n"
                    "好高興你哋想比較清楚！以下係 PRU 方案 對比 AIA A-Life Joy Xtra 嘅 3 大實際條款優勢：\n"
                    "• 免費自動加 50% 保額（唔使做運動打卡）：PRUWith You Plus 每年自動免費加 1% 保額（最高 +50%），唔似 AIA 要年年交 Vitality 會費同埋儲運動分先保得住個 Booster；\n"
                    "• 即攞 RM 500 添丁現金獎 + 初生首日周全守護：PRUWith You Plus 直接派 RM 500 現金獎，兼且 PRUMy Child Plus 鎖定初生首日健康守護與成長禮遇（仲有父母 Payor Waiver 保費豁免）；\n"
                    "• 無索償直接減 15% 保費：PRUMillion Med Active 2.0 冇 Claim 錢直接扣減 15% 現金保費（AIA 淨係加醫療錢包額度，保費一蚊都冇減）。\n\n"
                    "星期四晚 8 點我哋用 10 分鐘 Zoom 對一對張表啦！"
                ),
                "judgeFeedback": "正宗廣東話三步曲！賀卡夠窩心、WhatsApp 夠精警、電郵用 3 個實際條款完勝 AIA A-Life Joy Xtra！",
            },
            "ms": {
                "firstTouchMessage": (
                    "Tahniah Wei Ming & Chloe atas kelahiran Baby Lucas! 🍼✨ Ini kad ucapan khas buat keluarga anda.\n\n"
                    "Anda layak menuntut Ganjaran Tunai RM 500 (PRUWith You Plus) dan memulakan PRUMy Child Plus awal untuk perlindungan kesejahteraan bayi sejak Hari Pertama, penjagaan pediatrik serta dana universiti PRUSaver Kid dengan Jaminan Kesinambungan Pembayar (Payor Waiver). Boleh saya hantar ringkasan 2 minit di WhatsApp? 😊"
                ),
                "aiaComparisonEmail": (
                    "Subjek: Perbandingan Fakta untuk Baby Lucas: PRU (PRUMy Child Plus) vs. AIA (A-Life Joy Xtra)\n\n"
                    "Hai Wei Ming & Chloe,\n"
                    "Berikut adalah 3 kelebihan fakta pelan PRU berbanding AIA A-Life Joy Xtra:\n"
                    "• +50% Booster Automatik Percuma: PRUWith You Plus meningkatkan perlindungan +1%/tahun (sehingga +50%) secara percuma tanpa perlu yuran/mata kecergasan AIA Vitality.\n"
                    "• Ganjaran Tunai RM 500 + Perlindungan Kesejahteraan Bayi Hari-1: Tuntutan tunai RM 500 kelahiran serta perlindungan kesejahteraan awal & Payor Waiver di bawah PRUMy Child Plus.\n"
                    "• Diskaun Premium Tunai 15%: PRUMillion Med Active 2.0 memberi diskaun premium 15% setiap tahun tanpa tuntutan (berbanding AIA yang hanya mengkreditkan dompet kesihatan).\n\n"
                    "Jom kita semak jadual perbandingan selama 10 minit Khamis ini jam 8 malam!"
                ),
                "judgeFeedback": "Strategi 3-langkah MDRT yang sangat padat dan berasaskan fakta!",
            },
            "ta": {
                "firstTouchMessage": (
                    "Wei Ming & Chloe, உங்கள் ஆண் குழந்தை Lucas பிறந்ததற்கு மனமார்ந்த வாழ்த்துகள்! 🍼✨ உங்கள் குடும்பத்திற்காக இந்த சிறப்பு வாழ்த்து அட்டையை உருவாக்கினேன்.\n\n"
                    "PRUWith You Plus மூலம் RM 500 குழந்தை பிறப்பு ரொக்கப் பரிசை நீங்கள் பெறலாம், மேலும் FD வட்டியை மட்டுமே பயன்படுத்தி PRUMy Child Plus (முதல் நாள் குழந்தை நலப் பாதுகாப்பு, வளர்ச்சிப் பராமரிப்பு + PRUSaver Kid பல்கலைக்கழக கல்வி நிதி & Payor Waiver) திட்டத்தைத் தொடங்கலாம். 2 நிமிட சுருக்கத்தை WhatsApp-ல் அனுப்பட்டுமா? 😊"
                ),
                "aiaComparisonEmail": (
                    "பொருள்: குழந்தை Lucas-க்கான உண்மை ஒப்பீடு: புருடென்ஷியல் (PRUMy Child Plus) vs AIA (A-Life Joy Xtra)\n\n"
                    "வணக்கம் Wei Ming & Chloe,\n"
                    "AIA A-Life Joy Xtra-வை விட PRU சிறந்த மதிப்பை வழங்குவதற்கான 3 உண்மைக் காரணங்கள்:\n"
                    "• இலவச +50% காப்பீட்டுத் தொகை உயர்வு: PRUWith You Plus எந்த கூடுதல் கட்டணமும் இன்றி ஆண்டுக்கு +1% (50% வரை) தானாக உயர்கிறது (AIA Vitality உடற்பயிற்சி கட்டணம் தேவையில்லை).\n"
                    "• உடனடி RM 500 ரொக்கப் பரிசு + முதல் நாள் குழந்தை நலப் பாதுகாப்பு: குழந்தை பிறப்புக்கு RM 500 ரொக்கம், PRUMy Child Plus முதல் நாள் நலன் மற்றும் Payor Waiver தொடர்ச்சி சலுகை.\n"
                    "• 15% நேரடி பிரீமியம் தள்ளுபடி: PRUMillion Med Active 2.0 கிளைம் இல்லாத ஆண்டுகளில் 15% நேரடி கட்டணத் தள்ளுபடி வழங்குகிறது.\n\n"
                    "வியாழன் இரவு 8 மணிக்கு 10 நிமிட Zoom அழைப்பில் பேசலாமா?"
                ),
                "judgeFeedback": "அற்புதமான 3-படி முன்பதிவு! வாழ்த்து அட்டை, WhatsApp மற்றும் PRU vs AIA ஒப்பீட்டு மின்னஞ்சல் மிகத் துல்லியம்!",
            },
        },
    },
    "ci_health_scare": {
        "id": "ci_health_scare",
        "icon": "⚡",
        "badge": "⚡ Turning-40 Executive Wellness Milestone (PRUAll Care vs. AIA Beyond CI)",
        "customerName": "Jason Khoo (39, Penang Tech Engineering Director)",
        "existingPolicy": "Old RM 100k Life policy; ready to upgrade executive wellness & income continuity shield.",
        "lifeEvent": "Turning 40 next month after annual executive wellness checkup; wants to lock in favorable Age-39 rates & 110% maturity cash refund.",
        "pambPlan": "PRUAll Care + PRUMillion Med Active 2.0 + PRUMan",
        "aiaPlan": "AIA A-Life Beyond Critical Care + A-Plus Health360",
        "customerObjection": (
            "Appreciate the 40th birthday card, bro! My friend at AIA just showed me "
            "AIA A-Life Beyond Critical Care + A-Plus Health360. Can you email me how our PRU plan compares factually with AIA?"
        ),
        "aiaComparisonFacts": [
            "1. ~190 Wellness & Recovery Conditions up to Age 100 (vs. AIA Age 80): PRUAll Care provides comprehensive multi-stage wellness & recovery protection across ~190 conditions up to age 100, whereas AIA A-Life Beyond Critical Care covers ~180 conditions and stops at age 80.",
            "2. 15% Instant Cash Premium Discount: PRUMillion Med Active 2.0 cuts your medical premium by 15% every claim-free year (AIA A-Plus Health360 only adds credit to a Health Wallet rather than reducing your cash outlay).",
            "3. Up to 110% Maturity Premium Refund: Pairing PRUMan gives 260% executive wellness protection and refunds up to 110% of total premiums in cash at maturity.",
        ],
        "policyCitation": "PRUAll Care + PRUMillion Med Active 2.0 vs. AIA A-Life Beyond Critical Care",
        "cardHeadline": "Cheers to 40 Years of Strength & Vision, Jason!",
        "cardSubline": "Wishing You Peak Health, Peace of Mind & Unstoppable Momentum",
        "cardThemeColors": ((245, 248, 255), (237, 27, 46), (30, 64, 175)),
        "cardArtPrompt": (
            "Executive 40th milestone & wellness greeting card illustration (16:9 landscape): "
            "modern Penang bridge sunrise horizon, navy and gold geometric accents, crimson emblem, "
            "vitality and shield motif, refined luxury corporate greeting card"
        ),
        "fallback": {
            "en": {
                "firstTouchMessage": (
                    "Happy early 40th Birthday, Jason! 🥂 Awesome news on your clean annual executive wellness checkup—I made this milestone card for your 40th.\n\n"
                    "Before your age-40 rate step-up next month, we can lock in favorable Age-39 rates on PRUAll Care (~190 wellness & recovery conditions to Age 100 + 20% Recovery Care) and PRUMillion Med Active 2.0 (RM 8M limit + 15% instant claim-free discount). Free for a 10-min coffee in Bayan Lepas this week? ☕"
                ),
                "aiaComparisonEmail": (
                    "Subject: Factual Comparison Before Age 40: PRU (PRUAll Care) vs. AIA (A-Life Beyond Critical Care)\n\n"
                    "Hi Jason,\n"
                    "Here is the factual side-by-side between our PRU plan and AIA Malaysia before your age-39 window closes:\n"
                    "• Comprehensive Protection to Age 100 & ~190 Conditions (vs. AIA Age 80): PRUAll Care protects your wellness & recovery across ~190 conditions up to age 100 (+20% Recovery Care boost), whereas AIA A-Life Beyond Critical Care expires at age 80.\n"
                    "• 15% Direct Premium Discount vs. Wallet Credit: PRUMillion Med Active 2.0 gives a 15% instant discount on your actual premium every claim-free year; AIA A-Plus Health360 charges full premium and only credits a Health Wallet.\n"
                    "• 110% Maturity Cash Refund Option: Adding PRUMan gives 260% executive wellness protection + up to 110% total premium return at maturity.\n\n"
                    "Let's review the 1-page rate sheet over a 10-min coffee this Thursday!"
                ),
                "judgeFeedback": "Razor-sharp MDRT comparison! Highlighted PRU's Age-100 coverage (~190 conditions) and 15% cash discount vs. AIA's Age-80 cap!",
            },
            "zh-CN": {
                "firstTouchMessage": (
                    "Jason 提前祝你 40 岁生日快乐！🥂 恭喜年度高管健康体检一切达标！特地为你定制了这张 40 岁健康里程碑贺卡。\n\n"
                    "趁下个月满 40 岁费率调整前，我们可以用 39 岁黄金健康费率锁定 PRUAll Care（涵盖约190种全面健康与康复保障保至100岁 + 20%康复津贴）与 PRUMillion Med Active 2.0（RM 800万医疗限额 + 15%无理赔直接折扣）。本周在槟城喝杯 10 分钟咖啡聊聊？☕"
                ),
                "aiaComparisonEmail": (
                    "主题：40岁健康里程碑客观对比：PRU (PRUAll Care) vs 友邦 (AIA A-Life Beyond Critical Care)\n\n"
                    "Jason 你好，\n"
                    "为你整理了 PRU 方案 相比 AIA 的 3 大核心条款优势：\n"
                    "• 保障至 100 岁 & 约190种全面守护（对比 AIA 仅保至80岁）：PRUAll Care 覆盖约190项健康与康复保障直至100岁（含额外20%康复津贴），而 AIA A-Life Beyond Critical Care 在 80岁即终止；\n"
                    "• 15% 保费现金立减（对比 AIA 钱包额度）：PRUMillion Med Active 2.0 无理赔直接享 15% 保费现金折扣，而 AIA A-Plus Health360 保费照交、仅增加医疗钱包额度；\n"
                    "• 110% 满期保费返还：搭配 PRUMan 可享 260% 高管健康保障 + 满期最高 110% 保费现金返还。\n\n"
                    "周四下午我带一页式对比表找你喝杯 10 分钟咖啡！"
                ),
                "judgeFeedback": "亮点与竞品对比极其精准！用「保至100岁 vs 80岁」与「15%真金白银保费折扣」完美胜出！",
            },
            "yue": {
                "firstTouchMessage": (
                    "Jason 預祝你 40 歲生日快樂呀 Bro！🥂 恭喜你年度高管體檢報告靚仔達標，專登幫你整咗呢張 40 歲健康里程碑賀卡。\n\n"
                    "趁下個月踏入 40 歲調整保費之前，我哋可以用 39 歲靚價鎖定 PRUAll Care（包約190種全面健康同康復守護直到100歲 + 20%康復金）同埋 PRUMillion Med Active 2.0（RM 800萬醫療限額 + 無索償即減15%保費）。呢個禮拜喺檳城飲杯 10 分鐘咖啡傾下？☕"
                ),
                "aiaComparisonEmail": (
                    "主題：40歲健康里程碑客觀對比：保誠 (PRUAll Care) vs 友邦 (AIA A-Life Beyond Critical Care)\n\n"
                    "Jason 你好，\n"
                    "幫你執齊咗 PRU 方案 對比 AIA 嘅 3 個最關鍵條款分野：\n"
                    "• 保到 100 歲 & 包約190種周全守護（AIA 淨係保到 80 歲）：PRUAll Care 全面健康同康復保障去到 100 歲（仲有額外20%康復金），而 AIA A-Life Beyond 去到 80 歲就完；\n"
                    "• 直接減 15% 現金保費（唔係齋加 Wallet）：PRUMillion Med Active 2.0 冇 Claim 錢直接減你 15% 實際保費，AIA A-Plus Health360 保費照收足、淨係入落醫療錢包；\n"
                    "• 期滿退還高達 110% 保費：加埋 PRUMan 有 260% 高管健康保障兼期滿退返高達 110% 保費現金回贈。\n\n"
                    "星期四晏晝我帶張一頁紙對照表過嚟同你飲杯咖啡！"
                ),
                "judgeFeedback": "地道廣東話拆解！一眼睇穿「保到100歲 vs 80歲」同埋「真減15%保費 vs 醫療錢包」嘅分別！",
            },
            "ms": {
                "firstTouchMessage": (
                    "Selamat Hari Lahir ke-40 lebih awal, Jason! 🥂 Tahniah atas keputusan pemeriksaan kesihatan tahunan eksekutif yang cemerlang! Sebelum kenaikan kadar umur 40 bulan depan, jom kunci PRUAll Care (~190 perlindungan kesejahteraan & pemulihan hingga Umur 100 + 20% Recovery Care) & PRUMillion Med Active 2.0 (had RM 8J + diskaun 15% Active Pricing). Jom minum kopi 10 minit minggu ini? ☕"
                ),
                "aiaComparisonEmail": (
                    "Subjek: Perbandingan Fakta: PRU (PRUAll Care) vs. AIA (A-Life Beyond Critical Care)\n\n"
                    "Hai Jason,\n"
                    "Berikut adalah 3 kelebihan fakta pelan PRU berbanding AIA:\n"
                    "• Perlindungan Kesejahteraan Sehingga Umur 100 (~190 Kondisi vs AIA Umur 80): PRUAll Care melindungi kesejahteraan & pemulihan sehingga umur 100 tahun (AIA A-Life Beyond tamat pada umur 80).\n"
                    "• Diskaun Tunai Premium 15%: PRUMillion Med Active 2.0 memotong premium anda sebanyak 15% setiap tahun tanpa tuntutan.\n"
                    "• Pulangan Tunai Matang 110% (PRUMan): Perlindungan eksekutif 260% dengan pulangan tunai sehingga 110% semasa matang.\n\n"
                    "Jom jumpa 10 minit Khamis ini untuk semak jadual penuh!"
                ),
                "judgeFeedback": "Perbandingan fakta yang sangat jelas dan meyakinkan!",
            },
            "ta": {
                "firstTouchMessage": (
                    "இனிய 40-வது பிறந்தநாள் வாழ்த்துகள் Jason! 🥂 உங்கள் வருடாந்திர முழு உடல்நலப் பரிசோதனை சிறப்பாக அமைந்ததற்கு வாழ்த்துகள்.\n\n"
                    "அடுத்த மாதம் 40 வயது பிரீமியம் உயர்வுக்கு முன், PRUAll Care (100 வயது வரை ~190 நலன் & குணமடைதல் பாதுகாப்பு + 20% கூடுதல் நிதி) மற்றும் PRUMillion Med Active 2.0 (RM 8M மருத்துவ வரம்பு + 15% தள்ளுபடி) திட்டங்களை 39 வயது சலுகைக் கட்டணத்தில் உறுதி செய்யலாம். இந்த வாரம் 10 நிமிடம் காபி சாப்பிடலாமா? ☕"
                ),
                "aiaComparisonEmail": (
                    "பொருள்: 40 வயதுக்கு முன் உண்மை ஒப்பீடு: PRU (PRUAll Care) vs AIA (A-Life Beyond Critical Care)\n\n"
                    "வணக்கம் Jason,\n"
                    "PRU திட்டம் மற்றும் AIA இடையேயான 3 முக்கிய உண்மை வேறுபாடுகள்:\n"
                    "• 100 வயது வரை முழு நலப் பாதுகாப்பு & ~190 நிலைகள் (AIA 80 வயது வரை மட்டுமே): PRUAll Care 100 வயது வரை விரிவான நலன் மற்றும் குணமடைதல் பாதுகாப்பை வழங்குகிறது.\n"
                    "• 15% நேரடி பிரீமியம் தள்ளுபடி: PRUMillion Med Active 2.0 கிளைம் இல்லாத ஆண்டுகளில் 15% நேரடி கட்டணத் தள்ளுபடி தருகிறது (AIA வாலட்டில் மட்டுமே வரவு வைக்கிறது).\n"
                    "• 110% முதிர்வு ரொக்கம் திரும்பப் பெறுதல் (PRUMan): 260% பாதுகாப்பு + முதிர்வில் 110% வரை பிரீமியம் திரும்பக் கிடைக்கும்.\n\n"
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
        "existingPolicy": "Medical cards only; wants portable family-owned protection for RM 1.3M 35-yr joint mortgage (RM 5,600/mth).",
        "lifeEvent": "Collected keys to RM 1.3M semi-D home in Eco Botanic, JB.",
        "pambPlan": "PRUWith You Plus (Portable MLTA) + PRUAll Care",
        "aiaPlan": "AIA A-Life Link 2 / A-Life Kasih Famili + A-Plus Total Multi-Crisis",
        "customerObjection": (
            "Terima kasih for the housewarming card & message! An AIA planner also quoted us "
            "AIA A-Life Link 2 + CI rider for our mortgage shield. Can you email how PRU compares factually?"
        ),
        "aiaComparisonFacts": [
            "1. Unconditional +50% Auto Sum Assured Booster: PRUWith You Plus increases your portable family mortgage shield by +1%/yr (up to +50%) automatically for free—without requiring annual AIA Vitality fitness/health checks.",
            "2. RM 500 New Home Cash Reward: PRUWith You Plus pays you an immediate RM 500 Goal Achievement Cash Reward upon collecting your Eco Botanic home keys.",
            "3. ~190 Conditions + 20% Mortgage Continuity Reserve: PRUAll Care adds a dedicated 20% mortgage continuity reserve so your RM 5,600/mth home installments stay smoothly on track during recovery.",
        ],
        "policyCitation": "PRUWith You Plus + PRUAll Care vs. AIA A-Life Link 2",
        "cardHeadline": "Congratulations on Your New Eco Botanic Home!",
        "cardSubline": "May Your New Roof Always Be Filled with Warmth, Laughter & Security",
        "cardThemeColors": ((240, 253, 244), (237, 27, 46), (16, 120, 80)),
        "cardArtPrompt": (
            "Warm Malaysian luxury housewarming greeting card illustration (16:9 landscape): "
            "modern tropical semi-detached home in Johor Bahru with golden key ribbon, lush garden greenery, "
            "crimson seal accent, inviting architectural watercolor & gold foil aesthetic"
        ),
        "fallback": {
            "en": {
                "firstTouchMessage": (
                    "Huge congratulations Amirul & Farah on collecting the keys to your Eco Botanic dream home! 🏡🔑 I designed this housewarming card for you both.\n\n"
                    "Unlike bank-locked MRTA, portable family-owned PRUWith You Plus + PRUAll Care gives you an immediate RM 500 New Home Cash Reward, a free +50% Auto Sum Assured Booster, and a 20% mortgage continuity reserve to keep your RM 5,600/mth installments smooth across ~190 conditions. Can I send a 1-page comparison? 😊"
                ),
                "aiaComparisonEmail": (
                    "Subject: Eco Botanic Mortgage Shield Comparison: PRU (PRUWith You Plus) vs. AIA (A-Life Link 2)\n\n"
                    "Hi Amirul & Farah,\n"
                    "Here are 3 factual advantages of PRUWith You Plus + PRUAll Care over AIA A-Life Link 2 for your RM 1.3M mortgage:\n"
                    "• Unconditional +50% Auto Sum Assured Booster: PRU automatically increases your portable family protection by +1%/yr up to +50% at RM 0 extra cost, whereas AIA's booster depends on maintaining annual AIA Vitality points and fees.\n"
                    "• Immediate RM 500 New Home Cash Reward: PRU pays you an RM 500 Goal Achievement Cash Reward right now for your Eco Botanic home.\n"
                    "• ~190 Conditions + 20% Mortgage Continuity Reserve: PRUAll Care adds an extra 20% continuity reserve so your RM 5,600/mth home installments remain seamless and worry-free.\n\n"
                    "Shall we do a 10-min call tomorrow at 8:30 PM?"
                ),
                "judgeFeedback": "Excellent mortgage arbitrage! Highlighted PRU's unconditional +50% booster, RM 500 New Home Reward, and 20% mortgage continuity reserve vs. AIA!",
            },
            "zh-CN": {
                "firstTouchMessage": (
                    "衷心祝贺 Amirul 与 Farah 喜提新山 Eco Botanic 理想新居钥匙！🏡🔑 特地为你们制作了这张乔迁贺卡！\n\n"
                    "通过可携式家庭护盾 PRUWith You Plus + PRUAll Care 不仅可立即申领 RM 500 购房现金奖、享最高 +50% 免费保额递增，还自带额外 20% 房贷延续储备金，稳妥守护每月 RM 5,600 供款顺畅无忧。我先发一页对比表给你们看？😊"
                ),
                "aiaComparisonEmail": (
                    "主题：RM 130万新居房贷护盾客观对比：保诚 (PRUWith You Plus) vs 友邦 (AIA A-Life Link 2)\n\n"
                    "Amirul & Farah 您好，\n"
                    "以下为您整理 PRU 方案 相比 AIA A-Life Link 2 的 3 大客观房贷保障优势：\n"
                    "• 无条件免费 +50% 保额递增：PRUWith You Plus 每年自动免费递增 1% 保额（最高 +50%），无需像 AIA 那样每年缴付 Vitality 会费并完成运动考核；\n"
                    "• 立领 RM 500 乔迁里程碑现金奖：凭 Eco Botanic 购房文件即可直接申领保诚 RM 500 现金奖；\n"
                    "• 约190项保障 + 20% 房贷延续储备金：PRUAll Care 额外加码 20% Recovery Care 延续储备，让每月 RM 5,600 新居供款稳健安心。\n\n"
                    "明晚 8:30 方便用 10 分钟线上对照一下报表吗？"
                ),
                "judgeFeedback": "直击新居业主亮点！无条件+50%保额递增与RM 500乔迁现金奖完美胜过 AIA A-Life Link 2！",
            },
            "yue": {
                "firstTouchMessage": (
                    "恭喜晒 Amirul 同 Farah 攞到新山 Eco Botanic 靚屋鎖匙呀！🏡🔑 我專登整咗呢張新居入伙賀卡俾你哋！\n\n"
                    "配搭跟身家庭保障 PRUWith You Plus + PRUAll Care 可以即刻領取 RM 500 買樓現金獎、自動免費加高達 +50% 保額，兼且附帶 20% 供樓延續儲備金，輕鬆守護每月 RM 5,600 供款順暢無憂。我發張一頁紙對比表俾你哋睇下？😊"
                ),
                "aiaComparisonEmail": (
                    "主題：Eco Botanic 房貸護盾客觀對比：保誠 (PRUWith You Plus) vs 友邦 (AIA A-Life Link 2)\n\n"
                    "Amirul & Farah 你哋好，\n"
                    "以下係 PRU 方案 對比 AIA A-Life Link 2 嘅 3 大實際優勢：\n"
                    "• 無條件免費 +50% 保額遞增：PRUWith You Plus 每年自動免費加 1%（最高 +50%），唔使好似 AIA 咁年年交 Vitality 會費同做運動打卡；\n"
                    "• 即攞 RM 500 新居入伙現金獎：憑新屋文件即刻領取保誠 RM 500 現金獎賞；\n"
                    "• 包約190項守護 + 20% 供樓延續儲備金：PRUAll Care 額外多派 20% Recovery Care 儲備，確保每月 RM 5,600 供樓穩健輕鬆。\n\n"
                    "聽晚 8:30 方便用 10 分鐘傾一傾嗎？"
                ),
                "judgeFeedback": "正宗廣東話入伙預熱！無條件+50%保額同 RM 500 買樓現金獎完勝 AIA！",
            },
            "ms": {
                "firstTouchMessage": (
                    "Tahniah Amirul & Farah atas kunci rumah baharu di Eco Botanic! 🏡🔑 Dengan pelan milik keluarga PRUWith You Plus + PRUAll Care, anda layak menuntut Ganjaran Tunai Rumah Baharu RM 500, +50% Booster Automatik Percuma, dan rizab kesinambungan gadai janji 20% untuk ansuran RM 5,600/bulan yang tenang. Boleh saya kongsikan ringkasan 1 muka surat? 😊"
                ),
                "aiaComparisonEmail": (
                    "Subjek: Perbandingan Perlindungan Gadai Janji: PRU (PRUWith You Plus) vs. AIA (A-Life Link 2)\n\n"
                    "Hai Amirul & Farah,\n"
                    "Berikut adalah 3 kelebihan fakta pelan PRU berbanding AIA A-Life Link 2:\n"
                    "• +50% Booster Automatik Tanpa Syarat: Meningkat +1%/tahun secara percuma tanpa perlu yuran atau sasaran senaman AIA Vitality.\n"
                    "• Ganjaran Tunai Rumah Baharu RM 500: Tuntutan tunai segera sempena kunci rumah Eco Botanic.\n"
                    "• ~190 Kondisi + 20% Rizab Kesinambungan Gadai Janji: Memastikan bayaran bulanan RM 5,600/bulan kekal lancar dan terjamin.\n\n"
                    "Jom berbincang 10 minit esok jam 8:30 malam!"
                ),
                "judgeFeedback": "Perbandingan MLTA PRU vs AIA yang sangat praktikal dan tepat!",
            },
            "ta": {
                "firstTouchMessage": (
                    "Eco Botanic புதிய வீட்டுச் சாவியைப் பெற்ற Amirul & Farah-க்கு மனமார்ந்த வாழ்த்துகள்! 🏡🔑\n\n"
                    "குடும்பத்திற்குச் சொந்தமான PRUWith You Plus + PRUAll Care மூலம் உடனடி RM 500 புதிய வீடு ரொக்கப் பரிசு, இலவச +50% காப்பீட்டு உயர்வு மற்றும் மாதம் RM 5,600 வீட்டுக் கடன் தொடர்ச்சிக்கான 20% கூடுதல் நிதிப் பாதுகாப்பு கிடைக்கும். 1-பக்க சுருக்கத்தை அனுப்பட்டுமா? 😊"
                ),
                "aiaComparisonEmail": (
                    "பொருள்: வீட்டுக் கடன் பாதுகாப்பு ஒப்பீடு: PRU (PRUWith You Plus) vs AIA (A-Life Link 2)\n\n"
                    "வணக்கம் Amirul & Farah,\n"
                    "உங்கள் RM 1.3M வீட்டுக் கடனுக்கு AIA A-Life Link 2-வை விட PRU சிறந்ததாக இருப்பதற்கான 3 உண்மைகள்:\n"
                    "• நிபந்தனையற்ற +50% இலவச காப்பீட்டு உயர்வு: ஆண்டுக்கு +1% தானாக உயரும் (AIA Vitality கட்டணம் தேவையில்லை).\n"
                    "• உடனடி RM 500 புதிய வீடு ரொக்கப் பரிசு: உங்கள் புதிய வீட்டிற்கு RM 500 ரொக்கப் பரிசு.\n"
                    "• ~190 பாதுகாப்பு நிலைகள் + 20% வீட்டுக் கடன் தொடர்ச்சி நிதி: மாதம் RM 5,600 தவணை தடையின்றி தொடர்வதை உறுதி செய்கிறது.\n\n"
                    "நாளை இரவு 8:30 மணிக்கு 10 நிமிடம் பேசலாமா?"
                ),
                "judgeFeedback": "புதிய வீடு வாழ்த்து மற்றும் PRU vs AIA வீட்டுக் கடன் ஒப்பீடு மிகச் சிறப்பு!",
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
            "1. Up to 260% Female CI + 110% Maturity Refund: PRULady provides up to 260% female CI coverage and refunds up to 110% of total premiums paid at maturity (plus a Career Promotion Milestone Cash Reward!).",
            "2. 103% Day-1 Investment Allocation: PRU PRUElite Invest allocates 103% of your single premium into wealth funds on Day 1 (an immediate +3% boost vs. standard ILP/unit trust charges).",
            "3. Guaranteed Annual Med Value Point Increase: PRUValue Med grows its Med Value Point every year automatically and still pays 80% of eligible bills beyond the limit.",
        ],
        "policyCitation": "PRULady + PRUElite Invest vs. AIA A-Life Lady360",
        "cardHeadline": "Congratulations on Leading the Department, Dr. Kavitha!",
        "cardSubline": "Celebrating Your Clinical Excellence, Leadership & Next Chapter of Wealth",
        "cardThemeColors": ((253, 242, 248), (237, 27, 46), (147, 51, 234)),
        "cardArtPrompt": (
            "Sophisticated executive promotion congratulatory card illustration (16:9 landscape): "
            "Kuala Lumpur Twin Towers skyline at twilight in rose gold and deep burgundy line art, "
            "crimson ribbon, prestigious female leadership and prosperity theme"
        ),
        "fallback": {
            "en": {
                "firstTouchMessage": (
                    "Warmest congratulations, Dr. Kavitha, on your appointment as Head of Department! 🌟🩺 I designed this executive card to celebrate your milestone.\n\n"
                    "Your promotion unlocks a Career Promotion Cash Reward under PRULady (260% female CI cover + up to 110% maturity premium refund), paired with PRUElite Invest (103% Day-1 wealth allocation). Free for a 10-min coffee near your hospital next Tuesday? ☕"
                ),
                "aiaComparisonEmail": (
                    "Subject: Executive Comparison for Dr. Kavitha: PRU (PRULady & PRUElite Invest) vs. AIA (A-Life Lady360)\n\n"
                    "Dear Dr. Kavitha,\n"
                    "Here is a concise, factual comparison between our PRU plan and AIA Malaysia for your executive portfolio:\n"
                    "• 260% Female CI Cover + Up to 110% Maturity Refund: PRULady delivers up to 260% coverage, 10 Life Milestone Cash Rewards (including Career Promotion!), and refunds up to 110% of total premiums at maturity.\n"
                    "• 103% Day-1 Wealth Allocation (PRUElite Invest): Injects 103% of your capital into funds on Day 1 (+3% immediate bonus), outperforming AIA A-Life Wealth Builder front-end structures.\n"
                    "• Auto-Increasing Med Value Point (PRUValue Med): Grows your medical limit every year + 80% continuous coverage beyond the limit.\n\n"
                    "I can bring the 1-page summary to your clinic lounge next Tuesday at 2 PM!"
                ),
                "judgeFeedback": "Superb executive pre-pitch! Contrasted PRULady's 260% cover + 110% refund and PRUElite Invest's 103% Day-1 allocation against AIA A-Life Lady360!",
            },
            "zh-CN": {
                "firstTouchMessage": (
                    "衷心祝贺 Dr. Kavitha 荣升科室主任（Head of Department）！🌟🩺 特地为您制作了这张晋升祝贺卡！\n\n"
                    "您此次晋升可直接申领PRULady 职场晋升里程碑现金奖（享 260% 女性专属重疾保障 + 满期最高 110% 保费返还），并搭配 PRUElite Invest 首日 103% 投资配置。下周二在您医院附近喝杯 10 分钟咖啡聊聊？☕"
                ),
                "aiaComparisonEmail": (
                    "主题：科室主任专属方案客观对比：PRU (PRULady + PRUElite Invest) vs 友邦 (AIA A-Life Lady360)\n\n"
                    "Dr. Kavitha 您好，\n"
                    "为您精炼整理 PRU 方案 相比 AIA A-Life Lady360 的 3 大客观优势：\n"
                    "• 260% 女性重疾保障 + 最高 110% 满期返还：PRULady 提供高达 260% 保障、10项人生里程碑现金奖（含职场晋升！）及满期最高 110% 总保费返还；\n"
                    "• 首日 103% 财富配置（PRUElite Invest）：第一天即按 103% 本金投入基金（立享 +3% 额外奖励），远超普通基金与常规投连险首年配置率；\n"
                    "• 每年无条件递增医疗限额（PRUValue Med）：每年自动提升 Med Value Point，超额后仍持续赔付 80% 合规医疗费。\n\n"
                    "下周二下午 2 点我带一页式对照表到医院咖啡厅与您汇报 10 分钟！"
                ),
                "judgeFeedback": "高管级干练对比！260%女性保障+110%返还+103%首日配置三大硬核数据完胜 AIA！",
            },
            "yue": {
                "firstTouchMessage": (
                    "恭喜晒 Dr. Kavitha 榮升部門主管（Head of Department）！🌟🩺 專登幫你整咗呢張高管晉升祝賀卡！\n\n"
                    "今次升職可以直接領取PRULady 升職里程碑現金獎（享高達 260% 女性危疾保障 + 期滿退還高達 110% 保費），再配搭 PRUElite Invest 首日 103% 財富配置。下禮拜二喺你醫院附近飲杯 10 分鐘咖啡傾下？☕"
                ),
                "aiaComparisonEmail": (
                    "主題：部門主管專屬方案對比：保誠 (PRULady + PRUElite Invest) vs 友邦 (AIA A-Life Lady360)\n\n"
                    "Dr. Kavitha 你好，\n"
                    "同你簡明比較 PRU 方案 對比 AIA A-Life Lady360 嘅 3 大實際條款優勢：\n"
                    "• 260% 女性危疾保障 + 期滿退還 110% 保費：PRULady 包高達 260% 保障、10項人生大事現金獎（包埋升職！）同期滿退還高達 110% 總保費；\n"
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
                    "Subjek: Perbandingan Eksekutif: PRU (PRULady & PRUElite Invest) vs. AIA (A-Life Lady360)\n\n"
                    "Salam Dr. Kavitha,\n"
                    "Berikut adalah 3 kelebihan fakta pelan PRU berbanding AIA A-Life Lady360:\n"
                    "• 260% Perlindungan Wanita + 110% Pulangan Matang: Termasuk 10 Ganjaran Peristiwa Penting (Kenaikan Pangkat!).\n"
                    "• 103% Alokasi Pelaburan Hari-1 (PRUElite Invest): Bonus +3% serta-merta pada Hari Pertama.\n"
                    "• Med Value Point Meningkat Setiap Tahun (PRUValue Med): Tambahan perlindungan berterusan 80% melebihi had.\n\n"
                    "Saya boleh singgah 10 minit Selasa depan jam 2 petang!"
                ),
                "judgeFeedback": "Ringkas, padat dan berasaskan fakta produk sebenar PRU vs AIA!",
            },
            "ta": {
                "firstTouchMessage": (
                    "துறைத் தலைவராக (Head of Department) பதவி உயர்வு பெற்ற Dr. Kavitha அவர்களுக்கு மனமார்ந்த வாழ்த்துகள்! 🌟🩺\n\n"
                    "உங்கள் பதவி உயர்வுக்கு PRULady திட்டத்தின் கீழ் ரொக்கப் பரிசு, 260% பெண்கள் தீவிர நோய் பாதுகாப்பு + முதிர்வில் 110% பிரீமியம் திரும்பப் பெறுதல் மற்றும் PRUElite Invest (முதல் நாளிலேயே 103% முதலீட்டு ஒதுக்கீடு) கிடைக்கிறது. செவ்வாய்க்கிழமை 10 நிமிடம் காபி சாப்பிடலாமா? ☕"
                ),
                "aiaComparisonEmail": (
                    "பொருள்: Dr. Kavitha-க்கான உண்மை ஒப்பீடு: PRU (PRULady & PRUElite Invest) vs AIA (A-Life Lady360)\n\n"
                    "அன்புள்ள Dr. Kavitha,\n"
                    "புருடென்ஷியல் மலேசியா மற்றும் AIA A-Life Lady360 இடையேயான 3 முக்கிய உண்மை ஒப்பீடுகள்:\n"
                    "• 260% பெண்கள் பாதுகாப்பு + 110% பிரீமியம் திரும்பப் பெறுதல்: PRULady 260% பாதுகாப்பு, பதவி உயர்வு ரொக்கப் பரிசு மற்றும் முதிர்வில் 110% பிரீமியம் திரும்பத் தருகிறது.\n"
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
            "1. Automatic +30%/+50% Cover Booster + 500% Executive Travel & Keyman Multiplier: PRUWealth Enrich 2.0 boosts high Basic Sum Assured automatically by up to +50% and includes up to 500% Executive Travel & Keyman Multiplier.",
            "2. 100% Day-1 HNW Allocation (PRUPrestige Legacy): 100% of premium works from Day 1 with accelerated Loyalty Bonuses to equalize inheritance between the UK medical son (cash) and Melbourne successor daughter (factory shares).",
            "3. Built-In Legacy Settlement Option + FSA Schedule 10 Trust: Ring-fences the RM 6M personal bank guarantee from creditors and distributes structured payouts without private trust maintenance fees.",
        ],
        "policyCitation": "PRUWealth Enrich 2.0 + PRUPrestige Legacy vs. AIA A-Life Legasi Beyond",
        "cardHeadline": "Congratulations on Your Phase-2 Batu Kawan Plant!",
        "cardSubline": "Honoring Dato' Sri Raymond Tan's Vision, Industrial Leadership & Family Legacy",
        "cardThemeColors": ((248, 250, 252), (237, 27, 46), (180, 130, 25)),
        "cardArtPrompt": (
            "Prestigious corporate enterprise expansion congratulatory card illustration (16:9 landscape): "
            "deep midnight navy, brushed gold foil architectural line-art of Penang Second Bridge and modern high-tech facility, "
            "crimson seal accent, commanding private wealth and family legacy aesthetic"
        ),
        "fallback": {
            "en": {
                "firstTouchMessage": (
                    "Heartiest congratulations, Dato' Sri Raymond, on breaking ground on your Phase-2 Batu Kawan plant! 🏭🚀 I created this corporate milestone card for your group.\n\n"
                    "With <2.5% of working capital, PRUWealth Enrich 2.0 + PRUPrestige Legacy ring-fences your RM 6M personal bank guarantee under FSA Schedule 10 Statutory Trust while equalizing inheritance between your UK son (cash) and Melbourne daughter (100% factory shares). Free for a 15-min brief Thursday at 3 PM? 🤝"
                ),
                "aiaComparisonEmail": (
                    "Subject: Corporate Keyman & Legacy Comparison: PRU (PRUWealth Enrich 2.0) vs. AIA (A-Life Legasi Beyond)\n\n"
                    "Dear Dato' Sri Raymond,\n"
                    "Here is the factual executive comparison between our PRU plan and AIA A-Life Legasi Beyond for your RM 6M Batu Kawan facility & family succession:\n"
                    "• Automatic +30%/+50% Cover Booster & 500% Executive Travel & Keyman Multiplier: PRUWealth Enrich 2.0 automatically scales your high sum assured by up to +50% and includes a 500% Executive Travel & Keyman Multiplier without ongoing AIA Vitality checks.\n"
                    "• 100% Day-1 Capital Allocation (PRUPrestige Legacy): Puts 100% of your capital to work on Day 1 with loyalty bonuses, preserving liquidity during Phase-2 capex.\n"
                    "• Turnkey Legacy Settlement Option + FSA Sec 130 Creditor Shield: Ring-fences the RM 6M guarantee and pays tax-free structured cash to your UK son so your daughter inherits 100% of Penang factory shares cleanly.\n\n"
                    "I will bring the 1-page boardroom table to your Batu Kawan office Thursday at 3 PM."
                ),
                "judgeFeedback": "Top-of-the-Table corporate mastery! Factual PRU Cover Booster (+50%), 500% Executive Travel & Keyman Multiplier, and 100% Day-1 allocation cleanly beat AIA A-Life Legasi Beyond!",
            },
            "zh-CN": {
                "firstTouchMessage": (
                    "衷心祝贺陈拿督斯里峇都交湾二期半导体新厂盛大动工！🏭🚀 特地为您定制了这张企业里程碑贺卡！\n\n"
                    "仅需不到 2.5% 营运资金缓冲，PRUWealth Enrich 2.0 + PRUPrestige Legacy 即可通过 FSA 第130条法定信托 隔离 RM 600万银行个人担保，并用免税现金补偿英国学医长子、让墨尔本次女 100% 完整继承工厂控股权。周四下午 3 点方便去您办公室汇报 15 分钟吗？🤝"
                ),
                "aiaComparisonEmail": (
                    "主题：企业关键人与家族传承客观对比：PRU (PRUWealth Enrich 2.0) vs 友邦 (AIA A-Life Legasi Beyond)\n\n"
                    "尊敬的陈拿督斯里，\n"
                    "为您呈上 PRU 方案 相比 AIA A-Life Legasi Beyond 的 3 大家族办公室条款优势：\n"
                    "• 无条件最高 +50% 保额递增 & 高达 500% 高管差旅与关键人保障倍增：PRUWealth Enrich 2.0 自动享 +30%至+50% Cover Booster 及高达 500% 高管差旅与关键人保障倍增，无需像 AIA 绑定 Vitality 每年体检打卡；\n"
                    "• 首日 100% 净值配置（PRUPrestige Legacy）：首日即享 100% 保费入账配置，在二期扩厂高峰期最大化保留企业账面流动性；\n"
                    "• 内置 Legacy Settlement Option + FSA 债权人隔离：零私人信托管理费即可定制跨国分期传承，用保单现金补偿英国长子，把 100% 槟城厂房投票权留给接班次女。\n\n"
                    "周四下午 3 点我将携带一页纸精算对比表到您峇都交湾办公室呈报！"
                ),
                "judgeFeedback": "殿堂级企业主对决！用 +50% Cover Booster、500%高管差旅保障倍增及首日100%配置完胜 AIA A-Life Legasi Beyond！",
            },
            "yue": {
                "firstTouchMessage": (
                    "衷心祝賀陳拿督斯里峇都交灣二期新廠盛大動工！🏭🚀 我專登幫貴集團整咗呢張企業里程碑祝賀卡！\n\n"
                    "淨係用唔夠 2.5% 營運資金緩衝，PRUWealth Enrich 2.0 + PRUPrestige Legacy 就可以透過 FSA 第130條法定信託 隔離 RM 600萬銀行個人擔保，兼且用免稅現金補償英國讀醫嘅大仔，等墨爾本返嚟接班嘅阿女 100% 繼承檳城廠房控股權。星期四下晝 3 點方便過嚟你 Office 傾 15 分鐘嗎？🤝"
                ),
                "aiaComparisonEmail": (
                    "主題：企業關鍵人與家族傳承對比：PRU (PRUWealth Enrich 2.0) vs 友邦 (AIA A-Life Legasi Beyond)\n\n"
                    "尊敬嘅陳拿督斯里，\n"
                    "以下係 PRU 方案 對比 AIA A-Life Legasi Beyond 嘅 3 大實際條款優勢：\n"
                    "• 自動高達 +50% Cover Booster & 高達 500% 高管差旅與關鍵人保障倍增：PRUWealth Enrich 2.0 自動加高達 +50% 保額同埋高達 500% 高管差旅與關鍵人保障倍增，完全唔使好似 AIA Vitality 咁年年體檢打卡；\n"
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
                    "Subjek: Perbandingan Legasi Korporat: PRU (PRUWealth Enrich 2.0) vs. AIA (A-Life Legasi Beyond)\n\n"
                    "Dato' Sri Raymond,\n"
                    "Berikut adalah 3 kelebihan fakta pelan PRU berbanding AIA A-Life Legasi Beyond:\n"
                    "• +30%/+50% Cover Booster Automatik & Sehingga 500% Gandaan Perlindungan Eksekutif & Perjalanan: Tanpa syarat kecergasan tahunan AIA Vitality.\n"
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
                    "பொருள்: நிறுவன & பாரம்பரிய ஒப்பீடு: PRU (PRUWealth Enrich 2.0) vs AIA (A-Life Legasi Beyond)\n\n"
                    "மதிப்பிற்குரிய Dato' Sri Raymond,\n"
                    "AIA A-Life Legasi Beyond-ஐ விட PRU சிறந்ததாக இருப்பதற்கான 3 உண்மைகள்:\n"
                    "• தானியங்கி +30%/+50% Cover Booster & 500% உயர் அதிகாரி பயண & Keyman பாதுகாப்பு மடங்கு: AIA Vitality உடற்பயிற்சி நிபந்தனைகள் இன்றி தானாக உயரும்.\n"
                    "• முதல் நாளில் 100% மூலதன ஒதுக்கீடு (PRUPrestige Legacy): தொழிற்சாலை விரிவாக்கத்தின் போது நிறுவன பணப்புழக்கத்தைப் பாதுகாக்கிறது.\n"
                    "• Legacy Settlement Option + FSA பிரிவு 130 கடன் பாதுகாப்பு: RM 6M வங்கி கடனிலிருந்து பாதுகாத்து, UK மகனுக்கு ரொக்கமும் மகளுக்கு 100% பங்குகளும் கிடைக்கச் செய்கிறது.\n\n"
                    "வியாழன் மதியம் 3 மணிக்கு உங்கள் Batu Kawan அலுவலகத்தில் சந்திக்கிறேன்!"
                ),
                "judgeFeedback": "தொழிலதிபர் சொத்துப் பாதுகாப்பு மற்றும் PRU vs AIA ஒப்பீடு மிகத் துல்லியம்!",
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
            "AIA A-Plus Health360 + A-Life Wealth Venture for our retirement runway. Can you email how PRU compares?"
        ),
        "aiaComparisonFacts": [
            "1. Unconditional Yearly Med Value Point Growth: PRUValue Med increases your Med Value Point automatically EVERY year (even if you claim!) and still pays 80% of eligible bills beyond the limit—whereas AIA's Health Wallet only grows in zero-claim years.",
            "2. Smart Deductible Seamless Age-60 Bridge: Use PRU Smart Deductible to slash premiums from age 50–60 while covered by employer medical, locking in clean age-50 underwriting before retirement.",
            "3. Contractually Guaranteed Annual FlexIncome to Age 100: PRUElite Flex / PRURetirement Growth pays guaranteed annual retirement income up to age 100.",
        ],
        "policyCitation": "PRUValue Med + PRUElite Flex vs. AIA A-Plus Health360 + A-Life Wealth Venture",
        "cardHeadline": "Cheers to 50 Years & Melbourne Uni Pride!",
        "cardSubline": "Wishing Vincent & Elaine a Golden Decade of Freedom, Health & Prosperity",
        "cardThemeColors": ((254, 251, 235), (237, 27, 46), (180, 120, 30)),
        "cardArtPrompt": (
            "Warm golden-hour milestone greeting card illustration (16:9 landscape): "
            "champagne gold and crimson accents, Melbourne university sandstone archway & serene Malaysian highlands "
            "sunset horizon in fine line-art, celebrating a 50th birthday and worry-free retirement journey"
        ),
        "fallback": {
            "en": {
                "firstTouchMessage": (
                    "Happy 50th Birthday Vincent & huge congrats on your daughter's University of Melbourne offer! 🎓🥂 I made this dual-celebration card for you and Elaine.\n\n"
                    "To beat the Age-60 Employer Medical Cliff without touching your AUD tuition fund, we can lock in PRUValue Med (Smart Deductible + auto-growing Med Value Point) at age-50 health rates plus PRUElite Flex (Guaranteed Annual FlexIncome to age 100). Free for a 10-min chat this weekend? 😊"
                ),
                "aiaComparisonEmail": (
                    "Subject: Age-50 Retirement & Medical Comparison: PRU (PRUValue Med & PRUElite Flex) vs. AIA\n\n"
                    "Hi Vincent & Elaine,\n"
                    "Here are 3 factual reasons PRUValue Med + PRUElite Flex outperforms AIA A-Plus Health360 + A-Life Wealth Venture for your post-60 retirement:\n"
                    "• Med Value Point Grows Every Year—Even If You Claim: PRUValue Med automatically increases your Med Value Point every single year and still covers 80% of bills beyond the limit, whereas AIA's Health Wallet stops growing in any year you make a claim.\n"
                    "• Contractually Guaranteed Annual FlexIncome to Age 100: PRUElite Flex pays guaranteed annual cashflow to age 100.\n"
                    "• Smart Deductible Age-60 Bridge: Slashes your premium from age 50–60 while your company medical is active, locking in clean age-50 underwriting today.\n\n"
                    "Let's review the 1-page retirement bridge over a 10-min Zoom this Saturday at 11 AM!"
                ),
                "judgeFeedback": "Brilliant retirement bridge! Highlighted PRUValue Med's unconditional yearly Med Value Point growth (even after a claim) vs. AIA's conditional Health Wallet!",
            },
            "zh-CN": {
                "firstTouchMessage": (
                    "祝贺 Vincent 50 岁金禧生日暨爱女录取墨尔本大学双喜临门！🎓🥂 特地为您和 Elaine 定制了这张双喜贺卡！\n\n"
                    "为破解 60岁退休公司医疗断崖 且不动用女儿澳币学费，建议趁 50 岁健康体检锁定PRUValue Med（智慧自付额省保费 + 每年自动递增 Med Value Point），搭配 PRUElite Flex（保证派发至100岁退休金）。周末方便聊 10 分钟吗？😊"
                ),
                "aiaComparisonEmail": (
                    "主题：50岁黄金十年医疗与退休客观对比：保诚 (PRUValue Med + PRUElite Flex) vs 友邦 (AIA)\n\n"
                    "Vincent & Elaine 您好，\n"
                    "为您整理 PRU 方案 相比 AIA A-Plus Health360 + A-Life Wealth Venture 的 3 大客观条款优势：\n"
                    "• 每年无条件递增 Med Value Point（理赔后照样递增！）：PRUValue Med 无论当年是否理赔，每年自动递增保额，且超额后仍持续赔付 80% 医疗费；而 AIA Health Wallet 一旦当年发生理赔即停止奖励递增；\n"
                    "• 契约保证派发至 100 岁年度退休金（PRUElite Flex）：锁定保证年度现金流直至 100 岁，无惧退休后市场波动；\n"
                    "• 智慧自付额（Smart Deductible）无缝衔接 60 岁退休：50–60 岁在职期间利用公司医保大幅降低保费，提前锁定 50 岁标准健康核保。\n\n"
                    "本周六上午 11 点方便用 10 分钟线上对照一下报表吗？"
                ),
                "judgeFeedback": "一针见血！用「PRUValue Med 理赔后照样每年递增 + 超额80%持续赔付」完胜 AIA 医疗钱包限制！",
            },
            "yue": {
                "firstTouchMessage": (
                    "賀喜 Vincent 50 歲大壽兼千金考入墨爾本大學雙喜臨門呀！🎓🥂 專登幫你同 Elaine 整咗呢張雙喜賀卡！\n\n"
                    "為咗避開 60 歲退休公司醫保斷崖、又唔使郁到阿女筆澳幣學費，趁而家 50 歲身體健康鎖定PRUValue Med（Smart Deductible 在職慳保費 + 每年自動遞增 Med Value Point），再配搭 PRUElite Flex（保證派到 100 歲年度退休金）。呢個 Weekend 飲杯茶傾 10 分鐘？😊"
                ),
                "aiaComparisonEmail": (
                    "主題：50歲醫療與退休客觀對比：保誠 (PRUValue Med + PRUElite Flex) vs 友邦 (AIA)\n\n"
                    "Vincent & Elaine 你哋好，\n"
                    "以下係 PRU 方案 對比 AIA A-Plus Health360 + A-Life Wealth Venture 嘅 3 大實際條款優勢：\n"
                    "• 每年無條件遞增 Med Value Point（就算 Claim 咗錢照樣年年加！）：PRUValue Med 無論當年有冇索償都會每年自動加保額，爆額後仲繼續賠 80%；而 AIA Health Wallet 只要當年有 Claim 錢就即刻停加；\n"
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
                    "Subjek: Perbandingan Persaraan & Perubatan Umur 50: PRU vs. AIA\n\n"
                    "Hai Vincent & Elaine,\n"
                    "Berikut adalah 3 kelebihan fakta pelan PRU berbanding AIA:\n"
                    "• Med Value Point Meningkat Setiap Tahun Walaupun Ada Tuntutan: PRUValue Med terus meningkat setiap tahun + perlindungan berterusan 80% melebihi had (AIA Health Wallet hanya bertambah jika tiada tuntutan).\n"
                    "• Pendapatan Tahunan Terjamin (PRUElite Flex): FlexIncome terjamin sehingga umur 100 tahun.\n"
                    "• Smart Deductible: Jimat premium semasa masih dilindungi insurans syarikat sebelum bersara pada umur 60.\n\n"
                    "Jom semak jadual 1 muka surat Sabtu ini jam 11 pagi!"
                ),
                "judgeFeedback": "Perbandingan fakta persaraan & perubatan PRU vs AIA yang sangat tepat!",
            },
            "ta": {
                "firstTouchMessage": (
                    "Vincent அவர்களுக்கு இனிய 50-வது பிறந்தநாள் வாழ்த்துகள் & மகள் Melbourne பல்கலைக்கழகத்தில் சேர்ந்ததற்குப் பாராட்டுகள்! 🎓🥂\n\n"
                    "60 வயது ஓய்வுக்குப் பின் நிறுவன மருத்துவக் காப்பீடு முடிவதைச் சமாளிக்க, இப்போதே 50 வயதில் PRUValue Med (Smart Deductible + ஆண்டுதோறும் உயரும் Med Value Point) மற்றும் PRUElite Flex (100 வயது வரை உத்தரவாத ஓய்வூதிய வருமானம்) திட்டங்களைத் தொடங்கலாம். இந்த வார இறுதியில் 10 நிமிடம் பேசலாமா? 😊"
                ),
                "aiaComparisonEmail": (
                    "பொருள்: 50 வயது ஓய்வூதிய & மருத்துவ ஒப்பீடு: PRU (PRUValue Med & PRUElite Flex) vs AIA\n\n"
                    "வணக்கம் Vincent & Elaine,\n"
                    "AIA A-Plus Health360 + A-Life Wealth Venture திட்டங்களை விட PRU சிறந்ததாக இருப்பதற்கான 3 உண்மைகள்:\n"
                    "• கிளைம் செய்தாலும் ஆண்டுதோறும் உயரும் Med Value Point: PRUValue Med நீங்கள் கிளைம் செய்தாலும் ஒவ்வொரு ஆண்டும் வரம்பை உயர்த்துகிறது + வரம்பைத் தாண்டியும் 80% மருத்துவச் செலவை வழங்குகிறது (AIA Health Wallet கிளைம் இல்லாத ஆண்டில் மட்டுமே உயரும்).\n"
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


def _sync_full_scenario_catalog():
    for idx, entry in enumerate(SEAT_ROSTER_56):
        aid = entry["archetypeId"]
        if aid not in SCENARIO_CATALOG:
            sc_en = resolve_seat_scenario(idx, "en")
            sc_zh = resolve_seat_scenario(idx, "zh-CN")
            sc_yue = resolve_seat_scenario(idx, "yue")
            sc_ms = resolve_seat_scenario(idx, "ms")
            sc_ta = resolve_seat_scenario(idx, "ta")
            SCENARIO_CATALOG[aid] = {
                "id": aid,
                "icon": sc_en["icon"],
                "badge": f"{sc_en['icon']} {sc_en['shortLabel']}",
                "customerName": sc_en["customerName"],
                "existingPolicy": sc_en["existingGap"],
                "lifeEvent": sc_en["lifeEvent"],
                "pambPlan": sc_en["pambPlan"],
                "aiaPlan": sc_en["aiaPlan"],
                "customerObjection": sc_en["customerObjection"],
                "aiaComparisonFacts": sc_en["aiaComparisonFacts"],
                "policyCitation": sc_en["policyCitation"],
                "cardHeadline": sc_en["cardHeadline"],
                "cardSubline": sc_en["cardSubline"],
                "cardThemeColors": sc_en["cardThemeColors"],
                "cardArtPrompt": sc_en["cardArtPrompt"],
                "fallback": {
                    "en": {"firstTouchMessage": sc_en["defaultWhatsapp"], "aiaComparisonEmail": sc_en["defaultEmail"], "judgeFeedback": "Crisp MDRT Pre-Pitch execution!"},
                    "zh-CN": {"firstTouchMessage": sc_zh["defaultWhatsapp"], "aiaComparisonEmail": sc_zh["defaultEmail"], "judgeFeedback": "极具 MDRT 顾问风范！"},
                    "yue": {"firstTouchMessage": sc_yue["defaultWhatsapp"], "aiaComparisonEmail": sc_yue["defaultEmail"], "judgeFeedback": "正宗 MDRT 王牌水準！"},
                    "ms": {"firstTouchMessage": sc_ms["defaultWhatsapp"], "aiaComparisonEmail": sc_ms["defaultEmail"], "judgeFeedback": "Strategi Pra-Pitch MDRT yang cemerlang!"},
                    "ta": {"firstTouchMessage": sc_ta["defaultWhatsapp"], "aiaComparisonEmail": sc_ta["defaultEmail"], "judgeFeedback": "சிறந்த MDRT முன்-பிரிசென்டேஷன்!"},
                },
            }


_sync_full_scenario_catalog()


def _compose_svg_greeting_card(
    scen: dict,
    headline: str,
    subline: str,
    advisor_name: str,
    region: str = "",
    lang: str = "en",
) -> str:
    bg_rgb, pri_rgb, accent_rgb = scen.get("cardThemeColors", ((255, 248, 240), (237, 27, 46), (212, 160, 23)))
    bg_hex = "#{:02x}{:02x}{:02x}".format(*bg_rgb)
    pri_hex = "#{:02x}{:02x}{:02x}".format(*pri_rgb)
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

    wishes_by_lang = {
        "zh-CN": f"诚挚祝福 • {_esc(advisor_name)}",
        "yue": f"誠摯祝福 • {_esc(advisor_name)}",
        "zh-TW": f"誠摯祝福 • {_esc(advisor_name)}",
        "ms": f"Salam Mesra daripada {_esc(advisor_name)}",
        "ta": f"அன்பான வாழ்த்துகளுடன் • {_esc(advisor_name)}",
    }
    wishes_line = wishes_by_lang.get(lang, f"Warmest Wishes from {_esc(advisor_name)}")
    badge_top = {
        "zh-CN": "专属里程碑贺卡 • VIP GREETING",
        "yue": "專屬里程碑賀卡 • VIP GREETING",
        "ms": "KAD UCAPAN EKSKLUSIF • PRUMDA",
        "ta": "சிறப்பு வாழ்த்து அட்டை • PRUMDA",
    }.get(lang, "PRUMDA • VIP MILESTONE GREETING")

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
  <rect x="64" y="64" width="380" height="38" rx="19" fill="{pri_hex}"/>
  <text x="84" y="89" font-family="sans-serif" font-size="15" font-weight="bold" fill="#ffffff">{badge_top}</text>
  <text x="64" y="165" font-family="sans-serif" font-size="19" font-weight="bold" fill="{acc_hex}">{_esc(scen.get('icon', '🌟'))} {_esc(cust_short)}</text>
  <text x="64" y="235" font-family="sans-serif" font-size="30" font-weight="bold" fill="#111827">{_esc(headline[:44])}</text>
  <text x="64" y="290" font-family="sans-serif" font-size="19" fill="#374151">{_esc(subline[:72])}</text>
  <rect x="64" y="340" width="680" height="44" rx="10" fill="#ffffff" stroke="{acc_hex}" stroke-width="1.5"/>
  <text x="82" y="368" font-family="sans-serif" font-size="15" font-weight="bold" fill="{pri_hex}">Portfolio Focus: {_esc(plan_short)}</text>
  <line x1="64" y1="425" x2="896" y2="425" stroke="{acc_hex}" stroke-opacity="0.4" stroke-width="1.5"/>
  <text x="64" y="464" font-family="sans-serif" font-size="19" font-weight="bold" fill="#111827">{wishes_line}</text>
  <text x="64" y="490" font-family="sans-serif" font-size="13" font-weight="bold" fill="{acc_hex}">PRUMDA Learning Trip • Wealth &amp; Family Advisory</text>
</svg>"""
    b64 = base64.b64encode(svg.encode("utf-8")).decode("ascii")
    return f"data:image/svg+xml;base64,{b64}"


def _has_non_latin_script(s: str) -> bool:
    return bool(re.search(r"[\u0b80-\u0bff\u4e00-\u9fff]", s or ""))


def _generate_c3_greeting_card(
    scen: dict,
    headline: str,
    subline: str,
    advisor_name: str,
    region: str,
    custom_note: str,
    call_image_fn=None,
    generate_ai_card: bool = True,
    lang: str = "en",
) -> tuple[str, int, str]:
    t0 = time.time()
    img_model = "pamb-card-studio"

    user_instruction = (custom_note or headline or scen["cardHeadline"]).strip()
    cust_short = scen["customerName"].split("(")[0].strip()
    clean_adv = advisor_name.strip() if advisor_name else "Advisor"
    if "sandbox" in clean_adv.lower() or "tester" in clean_adv.lower():
        clean_adv = ""

    if generate_ai_card and call_image_fn is not None:
        # Prevent garbled Chinese/Tamil characters inside raster image pixels!
        non_latin = _has_non_latin_script(headline) or lang in ("zh-CN", "yue", "zh-TW", "ta")
        if non_latin:
            typography_rule = (
                "- CRITICAL TEXT RULE: Do NOT render long Chinese or Tamil sentences inside the artwork (to avoid warped strokes). "
                "Instead, render a pure, breathtaking text-free celebratory illustration (or at most a short 2-word English calligraphy crest like 'Warmest Wishes' or 'Congratulations').\n"
            )
        else:
            clean_en_hl = re.sub(r"[^\w\s!'&,.-]", "", headline).strip()[:52] or "Warmest Congratulations!"
            typography_rule = (
                f'- Greeting Headline Text on Card: Render "{clean_en_hl}" in crisp, high-contrast, legible luxury calligraphy with zero spelling errors.\n'
                + (f'- Subtle personal signature in bottom corner: "{clean_adv}" (do NOT include any company name or logo).\n' if clean_adv and not _has_non_latin_script(clean_adv) else "")
            )

        img_prompt = (
            "Design a breathtaking, crystal-clear, high-resolution luxury congratulatory greeting card (16:9 landscape aspect ratio).\n"
            f"- Occasion & Recipient Context: Celebrating {scen['lifeEvent']} for {cust_short}.\n"
            f"- Base Visual Scene: {scen['cardArtPrompt']}.\n"
            f"- Advisor's Styling & Creative Details: {user_instruction}.\n"
            + typography_rule
            + "- Do NOT include any corporate logos, insurance company names, or watermarks anywhere on the card."
        )

        try:
            try:
                ai_data_url, _ms = call_image_fn(None, img_prompt)
            except TypeError:
                b64_raw, _ms = call_image_fn(img_prompt, None, "image/png")
                ai_data_url = f"data:image/png;base64,{b64_raw}" if b64_raw and not str(b64_raw).startswith("data:") else b64_raw

            if ai_data_url and str(ai_data_url).startswith("data:image"):
                img_model = "gemini-3.1-flash-image"
                if HAS_PIL and "," in ai_data_url:
                    try:
                        _, b64_part = ai_data_url.split(",", 1)
                        raw_bytes = base64.b64decode(b64_part)
                        im = Image.open(io.BytesIO(raw_bytes)).convert("RGB")
                        buf = io.BytesIO()
                        im.save(buf, format="JPEG", quality=90)
                        b64_jpg = base64.b64encode(buf.getvalue()).decode("ascii")
                        return f"data:image/jpeg;base64,{b64_jpg}", int((time.time() - t0) * 1000), img_model
                    except Exception:
                        pass
                return ai_data_url, int((time.time() - t0) * 1000), img_model
        except Exception:
            pass

    return (
        _compose_svg_greeting_card(scen, headline[:48], subline, advisor_name, region, lang=lang),
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
        "Visual Warmth & Card",
        "Empathy-First Opening",
        "Wealth & Plan Mastery",
        "Personal Advisor Touch",
    ),
    "zh-CN": (
        "祝贺卡视觉与温度",
        "共情先行破冰开场",
        "财富与条款精准度",
        "顾问个人巧思与创意",
    ),
    "yue": (
        "賀卡視覺與人情味",
        "共情先行破冰開場",
        "財富與條款精準度",
        "顧問個人巧思與創意",
    ),
    "ms": (
        "Kemewahan & Kad Ucapan",
        "Pembukaan Empati Mesra",
        "Ketepatan Kekayaan & Pelan",
        "Sentuhan Peribadi Perunding",
    ),
    "ta": (
        "வாழ்த்து அட்டை & அன்பு",
        "அக்கறை நிறைந்த தொடக்கம்",
        "செல்வ & திட்டத் துல்லியம்",
        "ஆலோசகர் தனிப்பட்ட படைப்பாற்றல்",
    ),
}
C3_PILLAR_LABELS["zh-TW"] = C3_PILLAR_LABELS["yue"]


def _detect_compliance_or_bashing_violations(wa_text: str, em_text: str) -> list[str]:
    """Detects BNM FTFC compliance violations (false guaranteed return promises or rude competitor-bashing)."""
    combined = f"{wa_text}\n{em_text}".lower()
    issues = []
    # 1. Misleading guaranteed investment return claims across EN / ZH-CN / YUE / MS / TA
    if re.search(
        r"(guarantee[ds]?\s+\d{1,2}%\s*(annual\s*)?(return|profit|yield|interest|dividend)"
        r"|100%\s+guaranteed\s+(profit|return|investment)"
        r"|pulangan\s+dijamin\s*\d{1,2}%|dijamin\s+untung"
        r"|包赚|包賺|稳赚\s*\d{1,2}%|穩賺\s*\d{1,2}%"
        r"|保证[^\n]{0,10}\d{1,2}%\s*(固定)?(回报|收益|利息)"
        r"|保證[^\n]{0,10}\d{1,2}%\s*(固定)?(回報|收益|利息))",
        combined,
    ):
        issues.append("compliance_guaranteed_return")
    # 2. Disparaging / bashing competitor (Latin word-bounded + CJK substring matching)
    if re.search(
        r"(\b(scam|fraud|cheat|garbage|trash|useless|terrible|worst|bankrupt|rip[\s-]?off|penipu|sampah)\b"
        r"|骗子|騙子|垃圾|黑心|呃人)",
        combined,
    ):
        issues.append("competitor_bashing")
    return issues


def _score_c3_deterministic_bounds(
    scen: dict,
    lang: str,
    card_prompt: str,
    whatsapp_prompt: str,
    whatsapp_text: str,
    email_prompt: str,
    email_text: str,
    has_card: bool = True,
    personal_notes: str = "",
) -> tuple[dict, int, str, list[str]]:
    """Computes calibrated 4-pillar rubric scores (range 45-99) with genuine differentiation across Tiers A/B/C/D."""
    labels = C3_PILLAR_LABELS.get(lang) or C3_PILLAR_LABELS["en"]
    wa_txt = (whatsapp_text or "").strip()
    em_txt = (email_text or "").strip()
    wa_low = wa_txt.lower()
    em_low = em_txt.lower()
    notes_clean = (personal_notes or "").strip()

    violations = _detect_compliance_or_bashing_violations(wa_txt, em_txt)

    # Length / effort check (handles CJK characters where 1 char ~ 1 word)
    def _effective_words(s: str) -> int:
        cjk = len(re.findall(r"[\u4e00-\u9fff\u0b80-\u0bff]", s))
        latin = len(re.findall(r"[A-Za-z0-9]+", s))
        return latin + int(cjk * 0.7)

    wa_words = _effective_words(wa_txt)
    em_words = _effective_words(em_txt)

    # 1. Visual Warmth & Greeting Card (0-25)
    if not has_card:
        p1 = 13
    else:
        p1 = 21
        if card_prompt and len(card_prompt.strip()) > 6:
            p1 += 1
        if len(notes_clean) >= 6:
            p1 += 2
        if len(notes_clean) >= 24:
            p1 += 1
    if violations:
        p1 = min(p1, 18)
    p1 = min(25, max(10, p1))

    # 2. Empathy-First Opening (0-25)
    empathy_markers = (
        "congrat", "welcome", "happy", "bless", "proud", "warm", "thrilled", "wishing", "hope", "alhamdulillah", "mabruk",
        "恭喜", "祝贺", "欢迎", "祝福", "温馨", "健康", "开心", "高兴", "致敬", "欣喜",
        "恭喜晒", "歡迎", "窩心", "開心", "替你", "辛苦晒",
        "tahniah", "selamat", "syukur", "tumpang gembira", "semoga", "doakan",
        "வாழ்த்து", "மகிழ்ச்சி", "நல்வரவு", "ஆசீர்வாதம்",
    )
    emp_hits = sum(1 for k in empathy_markers if k in wa_low)
    pushy_spam = bool(
        re.search(
            r"(\b(buy now|sign today|sign up now|last chance|must buy|closing tonight|kuota bulanan)\b|马上买|立刻签单|冲业绩|今晚截數)",
            wa_low,
        )
    )

    if wa_words < 8:
        p2 = 11
    elif wa_words < 22:
        p2 = 16 + min(3, emp_hits)
    elif wa_words < 45:
        p2 = 19 + min(3, emp_hits)
    else:
        p2 = 21 + min(3, emp_hits) + (1 if "?" in wa_txt or "？" in wa_txt else 0)
    if pushy_spam:
        p2 -= 6
    p2 = min(25, max(8, p2))

    # 3. Wealth & Plan Mastery vs Competitor (0-25)
    plan_tokens = [
        tok.strip().lower()
        for tok in re.split(r"[+/(),]", scen.get("pambPlan", ""))
        if len(tok.strip()) >= 5
    ]
    has_plan_ref = any(pt[:8] in wa_low or pt[:8] in em_low for pt in plan_tokens) or ("pru" in wa_low or "pru" in em_low)

    # Count distinct factual proof points in Step 3 comparison reply
    fact_signals = (
        "50%", "+1%", "vitality", "500", "27", "congenital", "jaundice", "15%", "wallet",
        "190", "100", "80", "110%", "260%", "103%", "day 1", "day-1", "schedule 10", "hibah",
        "faraid", "400%", "8m", "8 million", "800万", "800萬", "deductible", "flexincome",
        "med value", "buy-sell", "500%", "trust", "probate", "mlta", "mrta", "20%",
        "wellness", "milestone", "continuity", "payor", "pediatric",
        "自动递增", "自動加", "现金奖", "現金獎", "先天", "折扣", "钱包", "錢包", "首日", "分期", "冻结", "凍結",
        "成长", "守护", "守護", "延续", "延續",
        "ganjaran", "diskaun", "dompet", "pembekuan", "penepian", "kesejahteraan", "kesinambungan",
        "தள்ளுபடி", "வாலட்", "பிறவி", "உத்தரவாத", "நலன்",
    )
    f_hits = sum(1 for k in fact_signals if k in em_low)
    bullet_count = len(re.findall(r"(^|\n)\s*([\•\-\*]|\d+[\.\)])\s+", em_txt))

    if em_words < 12:
        p3 = 11
    elif em_words < 30:
        p3 = 15 + min(3, f_hits)
    elif bullet_count >= 2 and f_hits >= 3:
        p3 = 22 + (1 if has_plan_ref else 0) + min(2, f_hits // 2)
    else:
        p3 = 18 + (1 if has_plan_ref else 0) + min(2, (f_hits + 1) // 2)

    if violations:
        p3 = max(8, min(11, p3 - 10))
        p2 = max(10, min(15, p2 - 5))
    p3 = min(25, max(8, p3))

    # 4. Personal Advisor Touch & Creative Closer (0-25)
    meeting_markers = (
        "zoom", "coffee", "tea", "10-min", "10 min", "15-min", "15 min", "2-min", "2 min", "summary", "nap", "sleep", "pdf", "side-by-side", "spouse",
        "咖啡", "早茶", "茶", "10分钟", "15分钟", "2分钟", "简报", "懶人包", "两分钟", "兩分鐘", "10分鐘", "睡", "对比表", "對比表", "一页", "一頁",
        "kopi", "10 minit", "15 minit", "2 minit", "ringkasan", "jadual", "1 halaman",
        "காபி", "நிமிட", "சுருக்கம்", "அட்டவணை",
    )
    m_hits = sum(1 for k in meeting_markers if k in wa_low or k in em_low)
    if wa_words < 10 and em_words < 15:
        p4 = 11
    elif not notes_clean:
        # Standard advisor who clicked pills without adding custom personal notes lands cleanly around 18-20
        p4 = 18 + min(2, m_hits)
    else:
        p4 = 19 + (2 if len(notes_clean) >= 12 else 1) + min(3, m_hits) + (1 if len(notes_clean) >= 20 and m_hits >= 2 else 0)
    if violations:
        p4 = max(9, min(13, p4 - 6))
    p4 = min(25, max(9, p4))

    pillars = {
        labels[0]: p1,
        labels[1]: p2,
        labels[2]: p3,
        labels[3]: p4,
    }
    total_q = min(99, max(42, p1 + p2 + p3 + p4))

    if "compliance_guaranteed_return" in violations:
        verdict = (
            "⚠️ BNM Compliance Alert: Never promise 'guaranteed % investment returns' on investment-linked/wealth plans—illustrate factually and disclose non-guaranteed projections."
            if lang not in ("zh-CN", "yue", "zh-TW")
            else "⚠️ 合规提醒：切勿对投资连结或财富方案承诺「保证固定百分比回报」，请遵循国家银行 (BNM) 规范客观呈现条款优势！"
        )
    elif "competitor_bashing" in violations:
        verdict = (
            "⚠️ MDRT Ethics Coaching: Avoid disparaging competitors—acknowledge their quote respectfully while proving your plan's factual fit."
            if lang not in ("zh-CN", "yue", "zh-TW")
            else "⚠️ MDRT 专业风范提醒：请避免贬低同业竞品，以客观尊重的条款对比展现专业顾问格局！"
        )
    elif total_q >= 92:
        verdict = {
            "zh-CN": f"🏆 教科书级 MDRT 顾问风范！成功融合暖心贺卡、共情破冰、精准条款对比与您的个人巧思（{total_q}/100）！",
            "yue": f"🏆 正宗 MDRT 王牌水準！賀卡夠窩心、WhatsApp 有人情味，兼且用齊實際條款優勢同個人心思（{total_q}/100）！",
            "ms": f"🏆 Pra-Pitch MDRT luar biasa! Menggabungkan kad mesra, empati pelanggan, fakta pelan tepat & sentuhan peribadi anda ({total_q}/100)!",
            "ta": f"🏆 மிகச்சிறந்த MDRT முன்-பிரிசென்டேஷன்! அன்பான வாழ்த்து அட்டை, அக்கறை மற்றும் துல்லியமான திட்ட ஒப்பீடு ({total_q}/100)!",
        }.get(lang, f"🏆 Masterclass MDRT Pre-Pitch! Warm client empathy, sharp plan clauses, and a memorable personal advisor touch ({total_q}/100)!")
    elif total_q >= 82:
        verdict = {
            "zh-CN": f"✨ 扎实专业的签单前预热（{total_q}/100）！若在收尾加入更具体的个人交情细节或 10 分钟邀约时间，还能冲刺 95+ 高分！",
            "yue": f"✨ 好穩陣嘅專業見客前預熱（{total_q}/100）！如果加多句個人關係細節或者具體 10 分鐘約見時間就更加完美！",
            "ms": f"✨ Pra-Pitch yang kukuh ({total_q}/100)! Tambah sedikit sentuhan hubungan peribadi untuk mencapai 95+ mata!",
            "ta": f"✨ சிறந்த முயற்சி ({total_q}/100)! உங்கள் தனிப்பட்ட நட்புக் குறிப்பைச் சேர்த்தால் 95+ மதிப்பெண் பெறலாம்!",
        }.get(lang, f"✨ Solid professional Pre-Pitch ({total_q}/100)! Adding a specific personal relationship memory or exact 10-min chat invite would push this to 95+!")
    else:
        verdict = {
            "zh-CN": f"💡 基础框架已建立（{total_q}/100）：建议补充至少 2–3 项具体条款对比优势及温和的下一步邀约以提升说服力。",
            "yue": f"💡 基本框架已有（{total_q}/100）：建議加返 2–3 個具體條款比較重點同埋輕鬆約見時間，說服力會大增！",
            "ms": f"💡 Permulaan baik ({total_q}/100): Tambahkan 2–3 fakta perbandingan klausa dan cadangan temujanji ringkas.",
            "ta": f"💡 நல்ல தொடக்கம் ({total_q}/100): 2–3 திட்ட நன்மைகளையும் 10 நிமிட சந்திப்பு அழைப்பையும் சேர்க்கவும்.",
        }.get(lang, f"💡 Good start ({total_q}/100): Flesh out your WhatsApp empathy hook and include 2–3 specific clause comparisons vs. {scen.get('rivalBrand', 'the rival quote')}.")

    return pillars, total_q, verdict, violations


def _evaluate_c3_hybrid(
    scen: dict,
    lang: str,
    lang_full: str,
    card_prompt: str,
    whatsapp_prompt: str,
    whatsapp_text: str,
    email_prompt: str,
    email_text: str,
    has_card: bool,
    personal_notes: str,
    call_vertex_fn,
) -> tuple[dict, int, str]:
    """Hybrid deterministic guardrail + live Gemini Executive Coach Judge."""
    det_pillars, det_total, det_verdict, violations = _score_c3_deterministic_bounds(
        scen,
        lang,
        card_prompt,
        whatsapp_prompt,
        whatsapp_text,
        email_prompt,
        email_text,
        has_card=has_card,
        personal_notes=personal_notes,
    )
    labels = C3_PILLAR_LABELS.get(lang) or C3_PILLAR_LABELS["en"]

    # If severe violation or no LLM fn provided, return deterministic immediately
    if violations or call_vertex_fn is None:
        return det_pillars, det_total, det_verdict

    judge_prompt = (
        "You are an encouraging yet discerning MDRT Master Coach judging a Challenge 3 Pre-Pitch submission on the PRUMDA Learning Trip.\n"
        f"Write `judgeFeedback` strictly in {lang_full} (1–2 crisp sentences, max 42 words). "
        "Specifically praise 1 concrete detail the advisor wrote (especially their Personal Touch or wealth hook), and if total < 92 add 1 friendly tip.\n\n"
        f"Client Case: {scen['customerName']} — {scen['lifeEvent']}\n"
        f"Recommended Portfolio: {scen['pambPlan']} (vs. {scen['aiaPlan']})\n"
        f"Greeting Card Created: {'Yes' if has_card else 'No'} | Card Headline/Note: {card_prompt}\n"
        f"Advisor's Custom Personal Touch Notes: {personal_notes or '(None typed)'}\n"
        f"Submitted First-Touch WhatsApp:\n{whatsapp_text}\n\n"
        f"Submitted Comparison Reply:\n{email_text}\n\n"
        "Score each of the 4 pillars from 10 to 25 using strict MDRT calibration:\n"
        "1. p1 (Visual Warmth & Card: 13 if no card, 20-21 if standard card without custom note, 23-25 if personalized card note)\n"
        "2. p2 (Empathy-First Opening: 10-15 if pushy/tiny, 19-21 if polite standard, 23-25 if deeply personal & zero-pressure)\n"
        "3. p3 (Wealth & Plan Mastery: 11-16 if vague, 19-21 if 1 general clause without bullets, 23-25 if 3 structured clause bullets with numbers)\n"
        "4. p4 (Personal Advisor Touch: 18-19 if Custom Personal Touch Notes is '(None typed)', 23-25 if bespoke relationship detail + specific 10-min closer)\n"
        'Respond STRICTLY in JSON (replace each pillar with an integer from 10 to 25): {"p1": 22, "p2": 21, "p3": 21, "p4": 19, "judgeFeedback": "..."}'
    )
    try:
        ai_txt, _m, _ms = call_vertex_fn(judge_prompt)
        if ai_txt:
            cleaned = ai_txt.strip().removeprefix("```json").removeprefix("```").removesuffix("```").strip()
            s_i, e_i = cleaned.find("{"), cleaned.rfind("}")
            if s_i != -1 and e_i > s_i:
                j_obj = json.loads(cleaned[s_i : e_i + 1])
                if isinstance(j_obj, dict):
                    raw_det = [det_pillars[labels[i]] for i in range(4)]
                    final_p = []
                    for i, k_name in enumerate(("p1", "p2", "p3", "p4")):
                        llm_v = int(j_obj.get(k_name, raw_det[i]))
                        blended = round(0.5 * llm_v + 0.5 * raw_det[i])
                        clamped = max(raw_det[i] - 2, min(raw_det[i] + 2, blended))
                        final_p.append(max(8, min(25, clamped)))
                    pillars_out = {labels[i]: final_p[i] for i in range(4)}
                    total_out = min(99, max(45, sum(final_p)))
                    fb_str = str(j_obj.get("judgeFeedback") or "").strip()
                    if fb_str:
                        return pillars_out, total_out, fb_str
    except Exception:
        pass

    return det_pillars, det_total, det_verdict


def _resolve_active_scenario(body: dict, lang: str) -> dict:
    """Resolves scenario by seatIndex (0..55) if provided, else by scenarioId."""
    seat_raw = body.get("seatIndex")
    if seat_raw is not None and str(seat_raw).strip() != "":
        try:
            return resolve_seat_scenario(int(seat_raw), lang)
        except Exception:
            pass
    scenario_id = str(body.get("scenarioId") or "newborn_baby").strip()
    if "__v" in scenario_id:
        arch_part, v_part = scenario_id.split("__v", 1)
        for idx, s in enumerate(SEAT_ROSTER_56):
            if s["archetypeId"] == arch_part and str(s["variantIndex"]) == v_part:
                return resolve_seat_scenario(idx, lang)
    for idx, s in enumerate(SEAT_ROSTER_56):
        if s["archetypeId"] == scenario_id:
            return resolve_seat_scenario(idx, lang)
    return resolve_seat_scenario(0, lang)


def handle_c3_ai(body: dict, call_vertex_fn, lang_names: dict, call_image_fn=None) -> dict:
    lang = body.get("language", "en")
    norm_lang = "yue" if lang == "zh-TW" else (lang or "en")
    lang_full = lang_names.get(lang, "English")
    scen = _resolve_active_scenario(body, norm_lang)
    scenario_id = scen["id"]

    advisor_name = (body.get("name") or "PRUMDA Advisor").strip()
    region = (body.get("region") or "").strip()

    step_mode = str(body.get("stepMode") or "all").strip()
    card_prompt = (body.get("cardPrompt") or scen["cardHeadline"]).strip()
    card_headline_text = (body.get("cardHeadlineText") or "").strip()
    if not card_headline_text:
        m_hl = re.search(r'Headline:\s*"([^"]+)"', card_prompt)
        card_headline_text = m_hl.group(1).strip() if m_hl else (card_prompt.splitlines()[0].strip() if card_prompt else scen["cardHeadline"])
    card_style = (body.get("cardStyle") or "").strip()
    card_personal_note = (body.get("cardPersonalNote") or "").strip()
    whatsapp_prompt = (body.get("whatsappPrompt") or body.get("customStrategy") or "").strip()
    wa_personal_note = (body.get("waPersonalNote") or "").strip()
    email_prompt = (body.get("emailPrompt") or "").strip()
    email_personal_note = (body.get("emailPersonalNote") or "").strip()
    polish_instruction = (body.get("polishInstruction") or "").strip()
    submitted_wa_text = (body.get("whatsappText") or "").strip()
    submitted_em_text = (body.get("emailText") or "").strip()
    generate_card = bool(body.get("generateCard", True))
    prev_card_url = body.get("previousCardDataUrl")

    combined_personal_notes = " | ".join(
        x for x in (card_personal_note, wa_personal_note, email_personal_note) if x
    ).strip()

    def _clean_fact_item(txt: str) -> str:
        return re.sub(r"^\s*(?:[✓✔•\-\*]|\d+[\.\)])\s*", "", str(txt or "").strip()).strip()

    all_wa_items = [
        (item.get("detail") or item.get("label") or "").strip()
        if isinstance(item, dict)
        else str(item).strip()
        for item in (scen.get("waIdeas") or [])
        if item
    ]
    raw_wa_idxs = body.get("selectedWaIdeaIdxs")
    wa_subset_explicit = isinstance(raw_wa_idxs, list) or isinstance(body.get("selectedWaIdeas"), list)
    if isinstance(raw_wa_idxs, list):
        valid_wa_idxs = []
        for idx_val in raw_wa_idxs:
            try:
                iv = int(idx_val)
                if 0 <= iv < len(all_wa_items) and iv not in valid_wa_idxs:
                    valid_wa_idxs.append(iv)
            except Exception:
                pass
        chosen_wa_ideas = [all_wa_items[i] for i in valid_wa_idxs]
        excluded_wa_ideas = [all_wa_items[i] for i in range(len(all_wa_items)) if i not in valid_wa_idxs]
    elif isinstance(body.get("selectedWaIdeas"), list):
        chosen_wa_ideas = [str(x).strip() for x in body.get("selectedWaIdeas") if str(x).strip()]
        excluded_wa_ideas = [x for x in all_wa_items if x not in chosen_wa_ideas]
    elif "Wealth Hooks to Plant:" in whatsapp_prompt:
        wa_subset_explicit = True
        hook_part = whatsapp_prompt.split("Wealth Hooks to Plant:", 1)[1].strip()
        chosen_wa_ideas = [x.strip() for x in hook_part.split(";") if x.strip()]
        excluded_wa_ideas = [
            x for x in all_wa_items
            if not any(c.lower() in x.lower() or x.lower() in c.lower() for c in chosen_wa_ideas)
        ]
    else:
        chosen_wa_ideas = list(all_wa_items)
        excluded_wa_ideas = []

    raw_scen_facts = scen.get("aiaFacts") or scen.get("aiaComparisonFacts") or []
    all_fact_items = [_clean_fact_item(f) for f in raw_scen_facts if str(f).strip()]
    raw_fact_idxs = body.get("selectedFactIdxs")
    fact_subset_explicit = isinstance(raw_fact_idxs, list) or isinstance(body.get("selectedFacts"), list)
    if isinstance(raw_fact_idxs, list):
        valid_fact_idxs = []
        for idx_val in raw_fact_idxs:
            try:
                iv = int(idx_val)
                if 0 <= iv < len(all_fact_items) and iv not in valid_fact_idxs:
                    valid_fact_idxs.append(iv)
            except Exception:
                pass
        chosen_facts = [all_fact_items[i] for i in valid_fact_idxs]
        excluded_facts = [all_fact_items[i] for i in range(len(all_fact_items)) if i not in valid_fact_idxs]
    elif isinstance(body.get("selectedFacts"), list):
        chosen_facts = [_clean_fact_item(x) for x in body.get("selectedFacts") if str(x).strip()]
        excluded_facts = [x for x in all_fact_items if x not in chosen_facts]
    elif "Selected Facts:" in email_prompt:
        fact_subset_explicit = True
        fact_part = email_prompt.split("Selected Facts:", 1)[1].strip()
        chosen_facts = [_clean_fact_item(x) for x in fact_part.split(";") if _clean_fact_item(x)]
        excluded_facts = [
            x for x in all_fact_items
            if not any(c.lower() in x.lower() or x.lower() in c.lower() for c in chosen_facts)
        ]
    else:
        chosen_facts = list(all_fact_items)
        excluded_facts = []

    aia_facts_joined = "\n".join(f"{i + 1}. {txt}" for i, txt in enumerate(chosen_facts))
    client_first_name = scen["customerName"].split("(")[0].split("&")[0].strip()
    clean_milestone_context = scen["lifeEvent"].split(";")[0].strip()
    t_start = time.time()

    def _extract_distinct_exclusion_markers(chosen_list: list[str], excluded_list: list[str], allow_note: str = "") -> list[str]:
        """Finds distinctive numbers/plan names/keywords present ONLY in excluded items so we can detect LLM leakage."""
        if not excluded_list:
            return []
        allowed_blob = (" ".join(chosen_list) + " " + (allow_note or "")).lower()
        markers = []
        candidate_patterns = [
            r"\+?\d+%",
            r"\brm\s?\d+[km]?\b",
            r"\b27\b",
            r"\b190\b",
            r"\bprumy child(?:\s+plus)?\b",
            r"\bprusaver(?:\s+kid)?\b",
            r"\bpruwith you(?:\s+plus)?\b",
            r"\bprumillion med(?:\s+active(?:\s+2\.0)?)?\b",
            r"\bpruall care\b",
            r"\bpruman\b",
            r"\bprulady\b",
            r"\bpruelite(?:\s+invest|\s+flex)?\b",
            r"\bpruvalue med\b",
            r"\bpruwealth enrich(?:\s+2\.0)?\b",
            r"\bpruprestige legacy\b",
            r"\bprubsn\s+\w+\b",
            r"\bvitality\b",
            r"\bhealth wallet\b",
            r"\bwallet\b",
            r"\bcongenital\b",
            r"\bjaundice\b",
            r"\bautism\b",
            r"\bday-1\b",
            r"\bwellness\b",
            r"\bmilestone\b",
            r"\bcontinuity\b",
            r"\bpayor\b",
            r"\bpediatric\b",
            r"\bfd interest\b",
            r"\bfixed deposit\b",
            r"\bschedule 10\b",
            r"\bfaraid\b",
            r"\bhibah\b",
            r"\bdeductible\b",
            r"\bflexincome\b",
            r"\bmed value point\b",
            r"先天", r"黄疸", r"黃疸", r"定存利息", r"现金奖", r"現金獎", r"钱包", r"錢包",
            r"守护", r"守護", r"kesejahteraan", r"kesinambungan", r"நலன்",
        ]
        excl_blob = " ".join(excluded_list).lower()
        for pat in candidate_patterns:
            for m in re.findall(pat, excl_blob):
                tok = m.strip()
                if tok and tok not in allowed_blob and tok not in markers:
                    markers.append(tok)
        return markers

    def _has_excluded_leak(text_out: str, chosen_list: list[str], excluded_list: list[str], allow_note: str = "") -> bool:
        if not text_out or not excluded_list:
            return False
        low_out = text_out.lower()
        for mk in _extract_distinct_exclusion_markers(chosen_list, excluded_list, allow_note):
            if mk in low_out:
                return True
        return False

    def _build_card_custom_instruction() -> str:
        parts = []
        if card_style:
            parts.append(f"Visual Style & Mood: {card_style}")
        if card_personal_note:
            parts.append(f"Advisor's Custom Creative Detail to Include: {card_personal_note}")
        if card_prompt and card_prompt != card_headline_text:
            parts.append(f"Advisor's Live Prompt Instructions: {card_prompt.replace(chr(10), ' ; ')}")
        return ". ".join(parts) if parts else card_prompt

    def _weave_fallback_wa() -> str:
        if wa_subset_explicit and len(chosen_wa_ideas) < len(all_wa_items):
            hooks_txt = "; ".join(chosen_wa_ideas)
            if norm_lang in ("zh-CN", "yue"):
                msg = f"{client_first_name} 您好！衷心祝贺您迎来「{scen.get('shortLabel', '人生里程碑')}」的喜悦时刻！🎉 特地为您制作了这张祝贺卡。"
                if hooks_txt:
                    msg += f"\n\n顺带跟您分享一个贴心规划重点：{hooks_txt}。"
                msg += f" {wa_personal_note if wa_personal_note else '等您方便时我发一份简短摘要给您参考好吗？😊'}"
                return msg
            if norm_lang == "ms":
                msg = f"Tahniah {client_first_name} atas detik bermakna ini! 🎉 Saya sediakan kad ucapan khas ini untuk anda."
                if hooks_txt:
                    msg += f"\n\nSekadar berkongsi satu info berguna: {hooks_txt}."
                msg += f" {wa_personal_note if wa_personal_note else 'Boleh saya kongsikan ringkasan pendek bila anda lapang? 😊'}"
                return msg
            msg = f"Warmest congratulations {client_first_name} on this wonderful milestone! 🎉 I made this celebratory card specially for you."
            if hooks_txt:
                msg += f"\n\nQuick helpful note: {hooks_txt}."
            msg += f" {wa_personal_note if wa_personal_note else 'Shall I send a quick 2-min summary whenever convenient? 😊'}"
            return msg
        base = scen["defaultWhatsapp"]
        if wa_personal_note and wa_personal_note not in base:
            return f"{base}\n\nP.S. {wa_personal_note}"
        return base

    def _weave_fallback_em() -> str:
        if fact_subset_explicit and len(chosen_facts) < len(all_fact_items):
            bullets = "\n".join(f"• {f}" for f in chosen_facts)
            lead_plan = scen["pambPlan"].split("+")[0].strip()
            n_pts = len(chosen_facts)
            closer_line = email_personal_note or (
                (scen.get("closeHints") or ["Let's review the 1-page table in a quick 10-min chat"])[0]
            )
            if norm_lang in ("zh-CN", "yue"):
                body_bullets = f"以下是为您重点整理的 {n_pts} 项核心条款优势：\n{bullets}\n\n" if bullets else ""
                return (
                    f"主题：方案重点对比：{lead_plan} vs {scen.get('rivalBrand', 'AIA')}\n\n"
                    f"{client_first_name} 您好：\n感谢您的回复！针对您关心的重点，{body_bullets}"
                    f"{closer_line}！"
                )
            if norm_lang == "ms":
                body_bullets = f"Berikut ialah {n_pts} kelebihan utama pelan PRU berbanding {scen['aiaPlan']}:\n{bullets}\n\n" if bullets else ""
                return (
                    f"Subjek: Perbandingan Fakta: {lead_plan} vs. {scen.get('rivalBrand', 'AIA')}\n\n"
                    f"Hai {client_first_name},\nTerima kasih atas maklum balas anda! {body_bullets}"
                    f"Cadangan langkah seterusnya: {closer_line}."
                )
            pt_word = "advantage" if n_pts == 1 else "advantages"
            body_bullets = (
                f"Here {'is' if n_pts == 1 else 'are'} the {n_pts} key factual {pt_word} over {scen['aiaPlan']}:\n{bullets}\n\n"
                if bullets
                else ""
            )
            return (
                f"Subject: Factual Comparison: {lead_plan} vs. {scen.get('rivalBrand', 'AIA')}\n\n"
                f"Hi {client_first_name},\nGreat question—comparing clauses is a smart move! {body_bullets}"
                f"How about this next step: {closer_line}?"
            )
        base = scen["defaultEmail"]
        if email_personal_note and email_personal_note not in base:
            return f"{base}\n\nNext Step: {email_personal_note}"
        return base

    if step_mode == "evaluate":
        card_data_url = prev_card_url
        img_model = "cached-card"
        if not card_data_url and generate_card:
            headline = card_headline_text or scen["cardHeadline"]
            card_data_url, _img_ms, img_model = _generate_c3_greeting_card(
                scen,
                headline,
                scen["cardSubline"],
                advisor_name,
                region,
                _build_card_custom_instruction(),
                call_image_fn,
                True,
                lang=norm_lang,
            )
        final_wa = submitted_wa_text
        final_em = submitted_em_text
        pillars, total_q, verdict = _evaluate_c3_hybrid(
            scen,
            norm_lang,
            lang_full,
            card_prompt,
            whatsapp_prompt,
            final_wa,
            email_prompt,
            final_em,
            has_card=bool(card_data_url),
            personal_notes=combined_personal_notes,
            call_vertex_fn=call_vertex_fn,
        )
        return {
            "scenarioId": scenario_id,
            "seatIndex": scen.get("seatIndex", 0),
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
            "modelUsed": f"gemini-3.5-flash-lite + {img_model}",
            "latencyMs": int((time.time() - t_start) * 1000),
        }

    if step_mode == "card":
        headline = card_headline_text or scen["cardHeadline"]
        card_data_url, img_ms, img_model = _generate_c3_greeting_card(
            scen,
            headline,
            scen["cardSubline"],
            advisor_name,
            region,
            _build_card_custom_instruction(),
            call_image_fn,
            True,
            lang=norm_lang,
        )
        return {
            "scenarioId": scenario_id,
            "seatIndex": scen.get("seatIndex", 0),
            "greetingCardDataUrl": card_data_url,
            "cardHeadline": headline,
            "cardSubline": scen["cardSubline"],
            "policyCitation": scen["policyCitation"],
            "modelUsed": img_model,
            "latencyMs": int((time.time() - t_start) * 1000),
        }

    lang_instruction = (
        f"Write strictly in natural, warm, native {lang_full}. "
        + (
            "CRITICAL FOR CANTONESE: Write using authentic colloquial Cantonese grammar and characters (e.g., 嘅、咗、啲、唔使、專登、幫你、傾吓、睇吓) — do NOT write standard Mandarin!"
            if norm_lang == "yue"
            else "CRITICAL FOR TAMIL: Write in natural Malaysian Tamil (தமிழ்) script while keeping official English plan names (e.g. PRUWith You Plus, PRUAll Care, AIA)!"
            if norm_lang == "ta"
            else "CRITICAL FOR BAHASA MELAYU: Write in warm, natural executive Bahasa Melayu Malaysia!"
            if norm_lang == "ms"
            else ""
        )
    )

    def _extract_json_dict(raw_txt: str):
        if not raw_txt:
            return None
        cleaned = raw_txt.strip().removeprefix("```json").removeprefix("```").removesuffix("```").strip()
        s_i = cleaned.find("{")
        e_i = cleaned.rfind("}")
        if s_i != -1 and e_i != -1 and e_i > s_i:
            cleaned = cleaned[s_i : e_i + 1]
        try:
            obj = json.loads(cleaned)
            return obj if isinstance(obj, dict) else None
        except Exception:
            return None

    if step_mode == "whatsapp":
        is_wa_subset = wa_subset_explicit and len(chosen_wa_ideas) < len(all_wa_items)
        wa_hooks_block = (
            "\n".join(f"  {i + 1}. {idea}" for i, idea in enumerate(chosen_wa_ideas))
            if chosen_wa_ideas
            else "  (None selected — write a warm celebratory greeting & relationship check-in ONLY without pitching specific product benefits)"
        )
        wa_excl_block = (
            "- STRICT FORBIDDEN TOPICS (The advisor explicitly UNCHECKED these — DO NOT mention, hint at, or include ANY of these plans, numbers, or benefits):\n"
            + "\n".join(f"  ✗ {ex}" for ex in excluded_wa_ideas)
            + "\n"
            if is_wa_subset and excluded_wa_ideas
            else ""
        )
        wa_context_lines = (
            f"- Client: {scen['customerName']}\n"
            f"- Milestone to Celebrate: {clean_milestone_context if is_wa_subset else scen['lifeEvent']}\n"
            + ("" if is_wa_subset else f"- Existing Coverage Gap: {scen['existingPolicy']}\n- Suitable PRU Portfolio: {scen['pambPlan']}\n")
            + f"- Advisor's Live Prompt & Strategy: {whatsapp_prompt.replace(chr(10), ' | ') if whatsapp_prompt else 'Warm congratulations first + gentle wealth planning hook'}\n"
            + f"- ALLOWED WEALTH PLANNING IDEA(S) TO INCLUDE (Include ONLY {'this exact 1 idea' if len(chosen_wa_ideas) == 1 else f'these exact {len(chosen_wa_ideas)} ideas'}):\n{wa_hooks_block}\n"
            + wa_excl_block
        )
        wa_only_prompt = (
            f"You are an empathetic, upbeat, top-performing MDRT Wealth & Legacy Advisor ({advisor_name}) on the PRUMDA Learning Trip.\n"
            f"{lang_instruction}\n"
            f"Draft a concise, warm, positive First-Touch WhatsApp message (50–78 words max, 2 short paragraphs) to your existing client.\n"
            + wa_context_lines
            + (f"- MANDATORY PERSONAL TOUCH TO WEAVE IN NATURALLY: \"{wa_personal_note}\"\n" if wa_personal_note else "")
            + (f"- Current Draft to Refine: {submitted_wa_text}\n" if submitted_wa_text and polish_instruction else "")
            + (f"- Refinement Instruction: {polish_instruction}\n" if polish_instruction else "")
            + "Rules: Keep the tone joyful, celebratory, and empowering (never morbid or fear-mongering). Never write corporate acronym 'PAMB' (use exact PRU / PRUBSN plan names from the allowed idea(s) only). STRICTLY respect the advisor's selection—never include unchecked ideas! Never promise guaranteed % investment returns. End with a low-pressure question.\n"
            + 'Respond STRICTLY in valid JSON: {"firstTouchMessage": "..."}'
        )
        ai_text, model_used, _ms = call_vertex_fn(wa_only_prompt)
        parsed_wa = _extract_json_dict(ai_text)
        out_wa = (
            str(parsed_wa.get("firstTouchMessage")).strip()
            if parsed_wa and parsed_wa.get("firstTouchMessage")
            else _weave_fallback_wa()
        )
        if is_wa_subset and not polish_instruction and _has_excluded_leak(out_wa, chosen_wa_ideas, excluded_wa_ideas, wa_personal_note):
            out_wa = _weave_fallback_wa()
        return {
            "scenarioId": scenario_id,
            "seatIndex": scen.get("seatIndex", 0),
            "firstTouchMessage": out_wa,
            "greetingCardDataUrl": prev_card_url,
            "modelUsed": model_used,
            "latencyMs": int((time.time() - t_start) * 1000),
        }

    if step_mode == "client_reply":
        rival_brand = scen.get("rivalBrand", "AIA Malaysia")
        rival_plan = scen.get("aiaPlan", "AIA plan")
        pru_plan = scen.get("pambPlan", "PRU plan")
        advisor_msg = submitted_wa_text or _weave_fallback_wa()
        reply_prompt = (
            f"You are role-playing as {scen['customerName']} ({scen['lifeEvent']}), a warm, friendly Malaysian client replying on WhatsApp to your trusted advisor ({advisor_name}).\n"
            f"{lang_instruction}\n"
            f"Your advisor just sent you a celebratory Greeting Card (\"{card_prompt or scen['cardHeadline']}\") and this First-Touch WhatsApp message:\n"
            f"\"\"\"{advisor_msg}\"\"\"\n\n"
            f"Write a natural, warm, conversational WhatsApp reply (28–52 words, 2–3 sentences) directly responding to what your advisor wrote:\n"
            f"1. Warmly thank {advisor_name} for the thoughtful card and specific message/personal touch, and gladly accept catching up / reviewing their summary.\n"
            f"2. Mention naturally that a friend/agent from {rival_brand} also just shared a quote for {rival_plan}, and ask how {pru_plan} compares factually so you can review both together.\n"
            f"Rules: Sound like a real, appreciative Malaysian client on WhatsApp (warm, receptive, never hostile). Keep official plan names ({rival_plan}, {pru_plan.split('+')[0].strip()}) clear.\n"
            + 'Respond STRICTLY in valid JSON: {"customerReply": "..."}'
        )
        ai_text, model_used, _ms = call_vertex_fn(reply_prompt)
        parsed_rep = _extract_json_dict(ai_text)
        out_reply = (
            str(parsed_rep.get("customerReply")).strip().strip('"')
            if parsed_rep and parsed_rep.get("customerReply")
            else str(scen.get("customerObjection") or "").strip().strip('"')
        )
        return {
            "scenarioId": scenario_id,
            "seatIndex": scen.get("seatIndex", 0),
            "customerReply": out_reply,
            "modelUsed": model_used,
            "latencyMs": int((time.time() - t_start) * 1000),
        }

    if step_mode == "email":
        custom_client_reply = (
            str(body.get("customerReplyText") or "").strip() or scen["customerObjection"]
        )
        is_fact_subset = fact_subset_explicit and len(chosen_facts) < len(all_fact_items)
        n_sel_facts = len(chosen_facts)
        bullet_rule = (
            "Write a warm, respectful 1-paragraph reply inviting a quick comparison chat without listing technical clause bullets (0 bullets selected)."
            if n_sel_facts == 0
            else f"Include EXACTLY {n_sel_facts} bullet point{'s' if n_sel_facts != 1 else ''} covering ONLY the {n_sel_facts} selected advantage{'s' if n_sel_facts != 1 else ''} listed below (do NOT write {len(all_fact_items)} bullets when only {n_sel_facts} {'is' if n_sel_facts == 1 else 'are'} selected!)."
        )
        fact_excl_block = (
            "- STRICT FORBIDDEN POINTS (The advisor explicitly UNCHECKED these — DO NOT mention, list, or hint at ANY of these unselected facts, numbers, or riders):\n"
            + "\n".join(f"  ✗ {ex}" for ex in excluded_facts)
            + "\n"
            if is_fact_subset and excluded_facts
            else ""
        )
        em_only_prompt = (
            f"You are an empathetic, upbeat, top-performing MDRT Wealth & Legacy Advisor ({advisor_name}) on the PRUMDA Learning Trip.\n"
            f"{lang_instruction}\n"
            f"Your client just replied on WhatsApp asking how your recommended PRU plan compares against a {scen.get('rivalBrand', 'competitor')} quote.\n"
            f"Draft a crisp, positive, factual comparison reply (70–115 words max, starting with a Subject/Topic line, warm 1-line acknowledgment, {bullet_rule} End with the advisor's closing invite).\n"
            f"- Client: {scen['customerName']} ({clean_milestone_context if is_fact_subset else scen['lifeEvent']})\n"
            f"- Recommended Portfolio: {scen['pambPlan'].split('+')[0].strip() if is_fact_subset else scen['pambPlan']}\n"
            f"- Competitor Quote: {scen['aiaPlan']}\n"
            f"- Client's Question: \"{custom_client_reply}\"\n"
            f"- Advisor's Live Prompt & Advisory Style: {email_prompt.replace(chr(10), ' | ') if email_prompt else 'Warm, respectful side-by-side comparison'}\n"
            f"- ONLY SELECTED FACTUAL ADVANTAGE(S) TO INCLUDE ({n_sel_facts} of {len(all_fact_items)} selected):\n{aia_facts_joined or '(None selected)'}\n"
            + fact_excl_block
            + (f"- MANDATORY MEETING CLOSER / PERSONAL IDEA TO INCLUDE IN CLOSING: \"{email_personal_note}\"\n" if email_personal_note else "")
            + (f"- Current Draft to Refine: {submitted_em_text}\n" if submitted_em_text and polish_instruction else "")
            + (f"- Refinement Instruction: {polish_instruction}\n" if polish_instruction else "")
            + "Rules: Keep the tone positive, constructive, and reassuring. Never disparage the competitor—acknowledge their quote fairly while highlighting ONLY the selected PRU / PRUBSN advantage(s). Never write 'PAMB'. Follow BNM Fair Treatment of Financial Consumers (no guaranteed ILP return claims).\n"
            + 'Respond STRICTLY in valid JSON: {"aiaComparisonEmail": "..."}'
        )
        ai_text, model_used, _ms = call_vertex_fn(em_only_prompt)
        parsed_em = _extract_json_dict(ai_text)
        out_em = (
            str(parsed_em.get("aiaComparisonEmail")).strip()
            if parsed_em and parsed_em.get("aiaComparisonEmail")
            else _weave_fallback_em()
        )
        if is_fact_subset and not polish_instruction:
            em_bullets = re.findall(r"(?m)^\s*(?:[•\-\*]|\d+[\.\)])\s+", out_em)
            if _has_excluded_leak(out_em, chosen_facts, excluded_facts, email_personal_note) or (
                n_sel_facts > 0 and len(em_bullets) > n_sel_facts
            ):
                out_em = _weave_fallback_em()
        return {
            "scenarioId": scenario_id,
            "seatIndex": scen.get("seatIndex", 0),
            "aiaComparisonEmail": out_em,
            "greetingCardDataUrl": prev_card_url,
            "modelUsed": model_used,
            "latencyMs": int((time.time() - t_start) * 1000),
        }

    # Combined "all" mode fallback compatibility
    clean_wa = _weave_fallback_wa()
    clean_em = _weave_fallback_em()
    card_data_url = prev_card_url
    img_model = "cached-card"
    if generate_card and not card_data_url:
        card_data_url, _ims, img_model = _generate_c3_greeting_card(
            scen, card_prompt, scen["cardSubline"], advisor_name, region, _build_card_custom_instruction(), call_image_fn, True, lang=norm_lang
        )
    pillar_scores, total_quality, scored_verdict = _evaluate_c3_hybrid(
        scen, norm_lang, lang_full, card_prompt, whatsapp_prompt, clean_wa, email_prompt, clean_em, bool(card_data_url), combined_personal_notes, call_vertex_fn
    )
    return {
        "scenarioId": scenario_id,
        "seatIndex": scen.get("seatIndex", 0),
        "customerName": scen["customerName"],
        "firstTouchMessage": clean_wa,
        "agentAssistProposal": clean_wa,
        "aiaComparisonEmail": clean_em,
        "dossierSynthesis": clean_em,
        "policyCitation": scen["policyCitation"],
        "greetingCardDataUrl": card_data_url,
        "cardHeadline": card_prompt,
        "cardSubline": scen["cardSubline"],
        "pillarScores": pillar_scores,
        "qualityScore": total_quality,
        "synthesisScore": total_quality,
        "strategyScore": total_quality,
        "judgeFeedback": scored_verdict,
        "modelUsed": f"gemini-3.5-flash-lite + {img_model}",
        "latencyMs": int((time.time() - t_start) * 1000),
    }
