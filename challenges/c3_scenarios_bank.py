"""
Challenge 3 Scenario Bank — PRUMDA Learning Trip
=================================================
6 Curated Malaysian Financial Advisory Cases (3 Health-Led + 3 Family/Wealth Milestones)
x 12 Unique Client Persona Variants = 72 Evenly Distributed Seats (0..71) so every
leader in a 60–72 person room gets their own unique client & scenario, with 16 full
archetypes preserved for catalog compatibility!

Supports all 5 languages:
- English (en)
- Mandarin (zh-CN)
- Cantonese (yue / zh-TW)
- Bahasa Melayu (ms)
- Tamil (ta)
"""

from __future__ import annotations

# 72 distinct Malaysian client identities across the 6 curated Challenge 3 cases (12 unique personas per case = 72 seats),
# plus the remaining 10 archetypes preserved for full 16-archetype catalog compatibility.
PERSONA_VARIANTS = {
    "newborn_baby": [
        {"en": "Tan Wei Ming & Chloe Lim (32, Petaling Jaya)", "zh": "陈伟明 & 林晓雯 (32岁, PJ)", "child": "Lucas"},
        {"en": "Arjun Nair & Divya Menon (34, Bangsar)", "zh": "Arjun & Divya (34岁, 孟沙 Bangsar)", "child": "Maya"},
        {"en": "Farhan Zulkifli & Nurul Izzah (30, Shah Alam)", "zh": "Farhan & Nurul (30岁, 莎阿南)", "child": "Adam"},
        {"en": "Darren Yap & Michelle Ong (35, Mont Kiara)", "zh": "叶俊杰 & 王美琪 (35岁, 满家乐)", "child": "Ethan"},
        {"en": "Gavin Khor & Clarissa Teoh (33, Tanjung Tokong Penang)", "zh": "许家豪 & 张嘉欣 (33岁, 槟城丹绒道光)", "child": "Noah"},
        {"en": "Syafiq Rahman & Hannah Sofea (31, Putrajaya)", "zh": "Syafiq & Hannah (31岁, 布城)", "child": "Ayden"},
        {"en": "Dinesh Kumar & Lavanya Raj (34, Bukit Damansara)", "zh": "Dinesh & Lavanya (34岁, 武吉白沙罗)", "child": "Aarav"},
        {"en": "Justin Chew & Valerie Tan (32, Sutera Utama JB)", "zh": "周子俊 & 陈薇莉 (32岁, 新山五福城)", "child": "Chloe"},
        {"en": "Melvin Sia & Joanne Ling (35, Kuching Sarawak)", "zh": "谢明辉 & 林乔安 (35岁, 砂拉越古晋)", "child": "Caleb"},
        {"en": "Imran Hakimi & Farah Yasmin (31, Cyberjaya)", "zh": "Imran & Farah (31岁, 赛城)", "child": "Zara"},
        {"en": "Kenneth Ooi & Sabrina Lee (33, Sunway Geo Subang)", "zh": "黄健恒 & 李思敏 (33岁, 双威梳邦)", "child": "Jayden"},
        {"en": "Navin Pillai & Preetha Nair (36, Taman Tun KL)", "zh": "Navin & Preetha (36岁, 敦依斯迈花园)", "child": "Riya"},
    ],
    "ci_health_scare": [
        {"en": "Jason Khoo (39, Penang Tech Director)", "zh": "邱志豪 Jason (39岁, 槟城科技总监)", "city": "Penang"},
        {"en": "Kelvin Chong (39, Subang Engineering Lead)", "zh": "张凯文 Kelvin (39岁, 梳邦工程主管)", "city": "Subang"},
        {"en": "Suresh Krishnan (39, Cyberjaya Cloud Architect)", "zh": "Suresh (39岁, 赛城云端架构师)", "city": "Cyberjaya"},
        {"en": "Hafizuddin Omar (39, KL Oil & Gas Manager)", "zh": "Hafizuddin (39岁, 吉隆坡油气经理)", "city": "KLCC"},
        {"en": "terence Liew (39, Bangsar Fintech VP)", "zh": "刘志轩 Terence (39岁, 孟沙金融科技副总裁)", "city": "Bangsar"},
        {"en": "Anand Subramaniam (39, PJ Data Science Head)", "zh": "Anand (39岁, 八打灵数据科学总监)", "city": "Petaling Jaya"},
        {"en": "Khairul Anwar (39, Iskandar Puteri Port Director)", "zh": "Khairul (39岁, 柔佛依斯干达港口总监)", "city": "Iskandar JB"},
        {"en": "Victor Phua (39, Kota Kinabalu Aviation Manager)", "zh": "潘维克 Victor (39岁, 亚庇航空运营经理)", "city": "Kota Kinabalu"},
        {"en": "Adrian Yeoh (39, Bayan Lepas Chip Design Lead)", "zh": "杨文轩 Adrian (39岁, 槟城芯片设计主管)", "city": "Bayan Lepas"},
        {"en": "Faizal Mustapha (39, Shah Alam Automotive GM)", "zh": "Faizal (39岁, 莎阿南汽车制造总经理)", "city": "Shah Alam"},
        {"en": "Rajeshwar Rao (39, KL Sentral Telecom Director)", "zh": "Rajeshwar (39岁, 中环电信工程总监)", "city": "KL Sentral"},
        {"en": "Dominic Ngu (39, Miri Offshore Operations Lead)", "zh": "吴明达 Dominic (39岁, 美里海事工程主管)", "city": "Miri"},
    ],
    "new_home_mortgage": [
        {"en": "Amirul Hakim & Farah Nadia (35, Eco Botanic JB)", "zh": "Amirul & Farah (35岁, 新山 Eco Botanic)", "area": "Eco Botanic"},
        {"en": "Brandon Lee & Rachel Tan (33, Desa ParkCity KL)", "zh": "李家豪 & 陈瑞秋 (33岁, 甲洞 DPC)", "area": "Desa ParkCity"},
        {"en": "Viknesh Raj & Shalini Devi (36, Setia Alam)", "zh": "Viknesh & Shalini (36岁, 实达阿南)", "area": "Setia Alam"},
        {"en": "Nicholas Teoh & Vivian Lim (34, Queensbay Penang)", "zh": "张伟伦 & 林慧雯 (34岁, 槟城 Queensbay)", "area": "Queensbay"},
        {"en": "Zharif Azmi & Nurul Ain (34, Elmina Gardens Shah Alam)", "zh": "Zharif & Ain (34岁, 莎阿南 Elmina)", "area": "Elmina Gardens"},
        {"en": "Desmond Ting & Felicia Wong (35, Tropics Kuching)", "zh": "丁德明 & 黄菲莉 (35岁, 古晋 Tropics)", "area": "Tropics Kuching"},
        {"en": "Harish Menon & Deepika Nair (37, Kota Kemuning)", "zh": "Harish & Deepika (37岁, 哥打哥文宁)", "area": "Kota Kemuning"},
        {"en": "Shaun Goh & Amanda Koh (33, Horizon Hills JB)", "zh": "吴俊雄 & 许雅曼 (33岁, 新山浩然山庄)", "area": "Horizon Hills"},
        {"en": "wan Muhd Firdaus & Sabrina Noor (36, Bangi Avenue)", "zh": "Wan Firdaus & Sabrina (36岁, 万宜新镇)", "area": "Bangi Avenue"},
        {"en": "enson Chin & Stephanie Yap (34, Bandar Utama PJ)", "zh": "陈彦森 & 叶思婷 (34岁, 万达镇 BU)", "area": "Bandar Utama"},
        {"en": "Kuganathan & Meera Krishnan (35, Sri Petaling KL)", "zh": "Kuganathan & Meera (35岁, 大城堡 KL)", "area": "Sri Petaling"},
        {"en": "alvin Chua & Jocelyn Pang (36, Luyang Kota Kinabalu)", "zh": "蔡文杰 & 彭佳玲 (36岁, 亚庇路阳)", "area": "Luyang KK"},
    ],
    "career_promotion": [
        {"en": "Dr. Kavitha Pillai (42, KL Senior Specialist)", "zh": "Dr. Kavitha (42岁, 吉隆坡专科主任)", "role": "Hospital Dept Head"},
        {"en": "Evelyn Choo (40, Damansara Legal Partner)", "zh": "朱伊琳 Evelyn (40岁, 白沙罗律所合伙人)", "role": "Managing Partner"},
        {"en": "Nadia Kamarudin (41, Putrajaya CFO)", "zh": "Nadia (41岁, 集团首席财务官 CFO)", "role": "Group CFO"},
        {"en": "Grace Wong (43, George Town Pharma VP)", "zh": "黄淑仪 Grace (43岁, 槟城药企副总裁)", "role": "Regional VP"},
        {"en": "Stephanie Cheong (41, KLCC Investment Bank MD)", "zh": "张思敏 Stephanie (41岁, 双峰塔投行董事总经理)", "role": "Managing Director"},
        {"en": "Dr. Suraya Halim (44, Subang Medical Director)", "zh": "Dr. Suraya (44岁, 梳邦私立医院院长)", "role": "Medical Director"},
        {"en": "Sharmila Devi (40, Cyberjaya Regional Tech Head)", "zh": "Sharmila (40岁, 赛城亚太科技总裁)", "role": "APAC Tech Head"},
        {"en": "Beatrice Lim (42, Johor MedTech Country Lead)", "zh": "林美琪 Beatrice (42岁, 柔佛医疗科技总裁)", "role": "Country Director"},
        {"en": "Faridah Zainal (43, KL Energy Group Treasurer)", "zh": "Faridah (43岁, 吉隆坡能源集团司库长)", "role": "Group Treasurer"},
        {"en": "celine Khoo (41, Penang Semiconductor VP)", "zh": "邱诗琳 Celine (41岁, 槟城半导体全球副总裁)", "role": "Global Operations VP"},
        {"en": "Dr. Malini Natarajan (45, Sunway Chief Surgeon)", "zh": "Dr. Malini (45岁, 双威外科首席主任)", "role": "Chief of Surgery"},
        {"en": "Audrey Siaw (42, Kuching Infrastructure CEO)", "zh": "萧雅丽 Audrey (42岁, 古晋基建集团总裁)", "role": "Chief Executive Officer"},
    ],
    "sme_expansion": [
        {"en": "Dato' Sri Raymond Tan (49, Batu Kawan Manufacturing)", "zh": "拿督斯里陈耀明 (49岁, 槟城精密制造厂主)", "area": "Batu Kawan"},
        {"en": "Dato' Kenneth Lim (51, Klang Cold-Chain Logistics)", "zh": "拿督林国强 (51岁, 巴生冷链物流创办人)", "area": "Port Klang"},
        {"en": "Dato' Vijayakumar (48, Senai Medical Devices SME)", "zh": "拿督 Vijayakumar (48岁, 柔佛医疗器械厂主)", "area": "Senai JB"},
        {"en": "Dato' Edmund Loh (52, Ipoh Packaging Group)", "zh": "拿督罗文耀 (52岁, 怡保包装工业集团主席)", "area": "Ipoh"},
    ],
    "uni_retirement_50": [
        {"en": "Vincent Ong & Elaine Khor (50, Ipoh / KL)", "zh": "王文森 & 许伊琳 (50岁, 怡保 / 吉隆坡)", "uni": "University of Melbourne"},
        {"en": "Lawrence Cheah & Janet Ooi (50, Penang)", "zh": "谢国良 & 黄珍妮 (50岁, 槟城)", "uni": "UNSW Sydney"},
        {"en": "Ramesh Nair & Geetha (50, Petaling Jaya)", "zh": "Ramesh & Geetha (50岁, 八打灵再也)", "uni": "Monash Australia"},
        {"en": "Patrick Yong & Shirley Chin (50, Kota Kinabalu)", "zh": "杨博智 & 陈雪莉 (50岁, 亚庇)", "uni": "University of Sydney"},
        {"en": "Kamaludin Hassan & Rohana (50, Shah Alam)", "zh": "Kamaludin & Rohana (50岁, 莎阿南)", "uni": "University of Queensland"},
        {"en": "francis Lau & Irene Ngu (50, Sibu / Kuching)", "zh": "刘弗朗 & 吴艾琳 (50岁, 诗巫 / 古晋)", "uni": "University of Western Australia"},
        {"en": "Bala Chandran & Uma Devi (50, Klang)", "zh": "Bala & Uma (50岁, 巴生)", "uni": "Australian National University"},
        {"en": "Stanley Phang & Wendy Sia (50, Mount Austin JB)", "zh": "彭世达 & 谢温蒂 (50岁, 新山茂奥斯汀)", "uni": "University of Adelaide"},
        {"en": "jeffrey Quah & Esther Beh (50, Alor Setar / Penang)", "zh": "柯杰明 & 马伊丝 (50岁, 亚罗士打 / 槟城)", "uni": "University of Auckland"},
        {"en": "Zulkifli Mahmud & Noraini (50, Putrajaya)", "zh": "Zulkifli & Noraini (50岁, 布城)", "uni": "University of Manchester"},
        {"en": "Eric Tham & Cynthia Loh (50, Damansara Heights)", "zh": "谭伟良 & 罗心怡 (50岁, 白沙罗高原)", "uni": "Imperial College London"},
        {"en": "Sivakumar & Vasanthi (50, Seremban 2)", "zh": "Sivakumar & Vasanthi (50岁, 芙蓉新城)", "uni": "University of Bristol"},
    ],
    "takaful_hibah_estate": [
        {"en": "Tuan Haji Zulkarnain & Puan Aishah (46, Shah Alam)", "zh": "Haji Zulkarnain & Aishah (46岁, 莎阿南企业主)", "biz": "Engineering Sdn Bhd"},
        {"en": "Dato' Irfan Hakimi & Datin Sofea (48, Bangi)", "zh": "Dato' Irfan & Datin Sofea (48岁, 万宜医疗连锁创办人)", "biz": "Poliklinik Group"},
        {"en": "Encik Ridzuan & Puan Mariam (44, Johor Bahru)", "zh": "Ridzuan & Mariam (44岁, 新山餐饮连锁东主)", "biz": "Bistro Holdings"},
        {"en": "Tuan Syed Azlan & Sharifah Hana (47, TTDI KL)", "zh": "Syed Azlan & Sharifah (47岁, 敦依斯迈建筑顾问)", "biz": "Consultancy Sdn Bhd"},
        {"en": "Dato' Megat Firdaus & Datinalina (49, Putrajaya)", "zh": "Dato' Megat & Datin Alina (49岁, 布城土木工程集团)", "biz": "Infra Bina Sdn Bhd"},
        {"en": "Encik Nik Faiz & Puan Hidayah (45, Kota Bharu / KL)", "zh": "Nik Faiz & Hidayah (45岁, 黄金珠宝连锁东主)", "biz": "Emas Warisan Sdn Bhd"},
        {"en": "Tuan HajiLokman & Puan Salmah (51, Melaka)", "zh": "Haji Lokman & Salmah (51岁, 马六甲清真食品厂主)", "biz": "Halal Agro Industries"},
        {"en": "EncikShahrul Nizam & Puan Nabila (43, Cyberjaya)", "zh": "Shahrul & Nabila (43岁, 赛城软件系统创办人)", "biz": " CloudTech Solutions"},
        {"en": "Dato' Wan Hisham & Datin Soraya (50, Kuantan)", "zh": "Dato' Wan Hisham & Soraya (50岁, 关丹海运物流主席)", "biz": "East Coast Marine Sdn Bhd"},
        {"en": "Encik Badrul Hisham & Puan Zulaikha (46, Bertam Penang)", "zh": "Badrul & Zulaikha (46岁, 槟城医疗耗材贸易东主)", "biz": "MedSupply Utara Sdn Bhd"},
        {"en": "Tuan Haji Roslan & Puan Fauziah (52, Kuching)", "zh": "Haji Roslan & Fauziah (52岁, 古晋建材集团创办人)", "biz": "Borneo Niaga Sdn Bhd"},
        {"en": "EncikTariq Ismail & Puan Ameera (44, Ampang Hilir KL)", "zh": "Tariq & Ameera (44岁, 安邦精品连锁酒店创办人)", "biz": "Seri Boutique Hotels"},
    ],
    "fd_maturing_wealth": [
        {"en": "Madam Christina Yeoh (54, Pulau Tikus Penang)", "zh": "杨丽华女士 Christina (54岁, 槟城浮罗池滑)", "amt": "RM 600k"},
        {"en": "Mr. Bernard Koo & Mrs. Koo (56, Cheras KL)", "zh": "古志明夫妇 Bernard (56岁, 吉隆坡蕉赖)", "amt": "RM 750k"},
        {"en": "Dr. Subramaniam (55, Klang Senior Dentist)", "zh": "Dr. Subramaniam (55岁, 巴生资深牙医)", "amt": "RM 500k"},
        {"en": "Mr. Philip Tiong (53, Kuching Timber Executive)", "zh": "张菲立 Philip (53岁, 古晋企业高管)", "amt": "RM 800k"},
    ],
    "female_ci_family_scare": [
        {"en": "Melissa Chia (36, KL Marketing Director)", "zh": "谢美莉 Melissa (36岁, 吉隆坡行销总监)", "rel": "older sister"},
        {"en": "Priya Darshini (35, PJ Senior Actuary)", "zh": "Priya Darshini (35岁, 八打灵再也精算主管)", "rel": "cousin"},
        {"en": "Nuraini Fauzi (37, Cyberjaya Product Lead)", "zh": "Nuraini (37岁, 赛城产品总监)", "rel": "close colleague"},
    ],
    "newlyweds_joint_life": [
        {"en": "Adrian Lim & Carmen Wong (29, Subang Jaya)", "zh": "林子轩 & 黄嘉敏 (29岁, 梳邦再也新婚夫妻)", "home": "Subang condo"},
        {"en": "Karthik & Ananya (30, Brickfields / Bangsar South)", "zh": "Karthik & Ananya (30岁, 孟沙南区新婚夫妻)", "home": "Bangsar South condo"},
        {"en": "Danial Harith & Yasmin (28, Ara Damansara)", "zh": "Danial & Yasmin (28岁, 阿拉白沙罗新婚夫妻)", "home": "Ara Damansara condo"},
    ],
    "hospital_bill_shock": [
        {"en": "Steven Goh & Linda Tan (44, Puchong)", "zh": "吴志强 & 陈琳达 (44岁, 蒲种家庭)", "bill": "RM 68k"},
        {"en": "Mohan Raj & Bavani (45, Seremban / KL)", "zh": "Mohan & Bavani (45岁, 芙蓉/吉隆坡)", "bill": "RM 74k"},
        {"en": "Chew Kok Wai & Annie Lim (43, Melaka)", "zh": "周国伟 & 林安妮 (43岁, 马六甲)", "bill": "RM 62k"},
    ],
    "cofounder_keyman_buysell": [
        {"en": "Marcus Teo & Alvin Ng (41, KL 12-Outlet F&B Chain)", "zh": "张文凯 & 吴家辉 (41岁, 吉隆坡12家连锁餐饮股东)", "biz": "12-outlet F&B chain"},
        {"en": "Ganesh & Hairul (42, Penang Automation Sdn Bhd)", "zh": "Ganesh & Hairul (42岁, 槟城自动化工程合伙人)", "biz": "automation firm"},
        {"en": "Desmond Koh & Ivan Lau (40, JB E-Commerce Logistics)", "zh": "许德明 & 刘伊凡 (40岁, 新山跨境物流合伙人)", "biz": "logistics venture"},
    ],
    "single_parent_guardian": [
        {"en": "Joanne Tan (38, PJ Architect & Mum of 2)", "zh": "陈乔安 Joanne (38岁, 八打灵建筑师·单亲妈妈育有2孩)", "kids": "ages 6 & 9"},
        {"en": "Siti Hajar (39, KL Senior Lecturer & Mum of 2)", "zh": "Siti Hajar (39岁, 吉隆坡资深讲师·育有2名子女)", "kids": "ages 5 & 8"},
        {"en": "Raymond D'Cruz (41, Subang IT Head & Single Dad)", "zh": "Raymond D'Cruz (41岁, 梳邦IT总监·单亲爸爸育有2孩)", "kids": "ages 7 & 10"},
    ],
    "overseas_med_student": [
        {"en": "Dr. Lim Kah Heng & Mrs. Lim (48, Penang)", "zh": "林家兴医生夫妇 (48岁, 槟城)", "dest": "University of Edinburgh (UK Medicine)"},
        {"en": "Dato' Bala & Datin Meena (49, Klang)", "zh": "拿督 Bala & 拿汀 Meena (49岁, 巴生)", "dest": "Monash Melbourne (Medicine)"},
        {"en": "Wong Chee Keong & May (47, Kota Kinabalu)", "zh": "黄志强 & 梅姐 (47岁, 亚庇企业主)", "dest": "University of Manchester (Dentistry)"},
    ],
    "sandwich_gen_parents": [
        {"en": "Daniel Foo & Serene Yap (43, Cheras KL)", "zh": "符国良 & 叶思琳 (43岁, 蕉赖夹心层夫妻)", "parents": "parents aged 71 & 69"},
        {"en": "Azman Shah & Norliza (42, Ampang)", "zh": "Azman & Norliza (42岁, 安邦双薪夫妻)", "parents": "parents aged 70 & 68"},
        {"en": "Prakash & Revathi (44, Bukit Jalil)", "zh": "Prakash & Revathi (44岁, 武吉加里尔夫妻)", "parents": "parents aged 72 & 69"},
    ],
    "business_exit_windfall": [
        {"en": "Dato' Richard Khor (55, KL Tech Exit — RM 2.5M Windfall)", "zh": "拿督许瑞哲 (55岁, 吉隆坡出售股权获 RM 250万现金)", "windfall": "RM 2.5M"},
        {"en": "Datin Seri Pauline Tan (57, Penang Commercial Sale)", "zh": "拿汀斯里陈宝琳 (57岁, 槟城售出商铺获 RM 300万现金)", "windfall": "RM 3.0M"},
        {"en": "Mr. Anthony Lau (54, Johor Industrial Land Exit)", "zh": "刘安东尼 Anthony (54岁, 柔佛售出工业地获 RM 220万)", "windfall": "RM 2.2M"},
        {"en": "Dato' Krishnan (56, KL Specialist Group Buyout)", "zh": "拿督 Krishnan (56岁, 吉隆坡医疗集团并购套现 RM 280万)", "windfall": "RM 2.8M"},
    ],
}

# Normalize spacing & capitalization across all persona entries
for _k, _vlist in PERSONA_VARIANTS.items():
    for _item in _vlist:
        for _fk, _fv in list(_item.items()):
            if isinstance(_fv, str):
                _item[_fk] = _fv.strip()
        if _item["en"] and _item["en"][0].islower():
            _item["en"] = _item["en"][0].upper() + _item["en"][1:]
        _item["en"] = (
            _item["en"]
            .replace("Datinalina", "Datin Alina")
            .replace("HajiLokman", "Haji Lokman")
            .replace("EncikShahrul", "Encik Shahrul")
            .replace("EncikTariq", "Encik Tariq")
            .replace("Enson Chin", "Benson Chin")
        )


ARCHETYPE_ORDER = list(PERSONA_VARIANTS.keys())  # 16 archetypes preserved for catalog compatibility

# 6 Approved Challenge 3 Cases (3 Health-led + 3 Family/Wealth Milestones, 100% upbeat & celebratory)
C3_CURATED_6_ORDER = [
    "newborn_baby",          # 1. 🍼 Newborn Baby (Baby Health + Day-1 Wellness + Uni)
    "ci_health_scare",       # 2. ⚡ 40th Birthday & Premier Health Upgrade (PRUMillion Med Active 2.0 RM 8M + 15% Healthy Discount + PRUAll Care + PRUMan 110% Refund)
    "career_promotion",      # 3. 🌟 Executive Promotion (PRUValue Med + PRULady + PRUElite Invest)
    "uni_retirement_50",     # 4. 🎓 Turning 50 & Melbourne Uni Offer (PRUValue Med Smart Deductible + PRUElite Flex)
    "new_home_mortgage",     # 5. 🏡 New Dream Home Keys (PRUWith You Plus + PRUAll Care)
    "takaful_hibah_estate",  # 6. 🕌 Record Business Year & Takaful Hibah (PRUBSN WarisanPlus + AnugerahPlus)
]


# Base 16 Archetype Blueprints (multilingual + competitor facts + short playbook pills + hints)
BASE_ARCHETYPES: dict[str, dict] = {
    "newborn_baby": {
        "icon": "🍼",
        "rivalBrand": "AIA Malaysia",
        "pambPlan": "PRUMy Child Plus (PRUSaver Kid) + PRUWith You Plus + PRUMillion Med Active 2.0",
        "aiaPlan": "AIA A-Life Joy Xtra + A-Plus BabyCare + A-Plus Health360",
        "cardThemeColors": ((255, 248, 240), (237, 27, 46), (212, 160, 23)),
        "cardArtPrompt": "Warm celebratory newborn baby greeting card illustration (16:9 landscape), soft cream silk background, golden baby rattle, blooming white orchids, warm sunlight, zero corporate logos",
        "en": {
            "shortLabel": "Newborn Baby",
            "lifeEvent": "Just welcomed 1st baby ({child}) at private hospital; wants Day-1 newborn wellness protection & future university milestone fund.",
            "existingGap": "Old RM 150k single medical card • RM 0 Day-1 newborn wellness protection or university milestone fund.",
            "customerReply": "\"Thanks for the lovely card! An AIA agent just quoted us AIA A-Life Joy Xtra + BabyCare. How does your PRU plan compare factually?\"",
            "cardHeadline": "Welcome to the World, Baby {child}! 🌟",
            "cardChips": ["Welcome to the World, Baby {child}! 🌟", "Endless Joy & Health to Baby {child} & Family 🍼"],
            "cardHints": ["🧸 Cute teddy bear & baby cradle", "🌟 Healthy, joyful future for Baby {child}", "💐 Warm flowers for the proud new parents"],
            "waIdeas": [
                {"label": "💵 RM 500 Baby Cash Reward", "detail": "Claim RM 500 Childbirth Cash Reward under PRUWith You Plus"},
                {"label": "🛡️ Day-1 Baby Peace of Mind", "detail": "Start PRUMy Child Plus early for Day-1 newborn wellness protection & pediatric peace of mind"},
                {"label": "🏦 Fund via FD Interest", "detail": "Fund baby's medical & PRUSaver Kid uni fund using just FD interest without touching savings principal"},
            ],
            "waHints": ["Send a 2-min summary while baby naps", "So happy seeing your family grow since your wedding!", "Zero rush—read whenever you both get rest"],
            "aiaFacts": [
                "Free +50% Auto Cover Booster: PRUWith You Plus grows cover +1%/yr (up to +50%) free—no AIA Vitality gym/membership fees required.",
                "RM 500 Childbirth Cash Reward + Day-1 Newborn Wellness Protection, Pediatric Milestone Care & Payor Continuity Guarantee under PRUMy Child Plus.",
                "15% Instant Cash Medical Discount: PRUMillion Med Active 2.0 cuts actual cash premium by 15% when claim-free (vs. AIA conditional Health Wallet).",
            ],
            "closeHints": ["10-min Zoom at 8:30pm after baby sleeps", "Compare both quotation PDFs side-by-side in 10 mins", "Send a 1-page comparison table on WhatsApp first"],
        },
        "zh-CN": {
            "shortLabel": "喜迎新生宝宝",
            "lifeEvent": "刚在私立医院迎来宝宝 ({child})，希望规划宝宝首日全面健康守护与未来大学教育里程碑基金。",
            "existingGap": "仅有旧款 RM 15万单人医药卡 • 宝宝初生首日健康守护与大学教育基金为 RM 0。",
            "customerReply": "“谢谢这么用心的祝贺卡！刚好有位友邦 (AIA) 代理报了 AIA A-Life Joy Xtra + BabyCare，你能客观对比一下你们方案的优势吗？”",
            "cardHeadline": "欢迎来到这个世界，小宝贝 {child}！🌟",
            "cardChips": ["欢迎来到这个世界，小宝贝 {child}！🌟", "祝小宝贝 {child} 健康快乐成长、阖家幸福！🍼"],
            "cardHints": ["🧸 加上可爱小泰迪熊与婴儿摇篮", "🌟 祝小宝贝健康快乐茁壮成长", "💐 送给新手爸妈的温馨花束"],
            "waIdeas": [
                {"label": "💵 RM 500 生育现金奖", "detail": "通过 PRUWith You Plus 直接申领 RM 500 新生儿现金奖赏"},
                {"label": "🛡️ 宝宝首日安心守护", "detail": "尽早启动 PRUMy Child Plus，锁定宝宝初生首日全面健康守护与成长礼遇"},
                {"label": "🏦 仅用定存利息规划", "detail": "只用定期存款利息即可锁定医疗与 PRUSaver Kid 大学基金，不动存款本金"},
            ],
            "waHints": ["趁宝宝午睡发一份2分钟简报给你们", "见证你们从结婚到迎来小宝贝太开心了", "完全不急，等你们休息好随时翻阅"],
            "aiaFacts": [
                "免费 +50% 保额自动递增：PRUWith You Plus 每年免费+1%（最高+50%），无需像 AIA Vitality 每年缴会费打卡。",
                "立即领取 RM 500 生育现金奖 + PRUMy Child Plus 宝宝初生首日健康成长守护与父母保费延续豁免。",
                "无索赔立享 15% 保费现金折扣：PRUMillion Med Active 2.0 直接减免15%现金保费（友邦仅计入有条件医疗钱包）。",
            ],
            "closeHints": ["周四晚8点半宝宝睡后10分钟Zoom对照利益表", "把两份计划书做成1页清晰对比表先发您", "周末喝杯咖啡10分钟轻松聊聊"],
        },
    },

    "ci_health_scare": {
        "icon": "⚡",
        "rivalBrand": "AIA Malaysia",
        "pambPlan": "PRUMillion Med Active 2.0 + PRUAll Care + PRUMan",
        "aiaPlan": "AIA A-Plus Health360 + A-Life Beyond Critical Care",
        "cardThemeColors": ((240, 249, 255), (237, 27, 46), (30, 64, 175)),
        "cardArtPrompt": "Warm celebratory 40th birthday executive greeting card illustration (16:9 landscape), golden sunrise over {city} skyline, festive champagne toast, navy and brushed gold accents, vibrant healthy energy, zero corporate logos",
        "en": {
            "shortLabel": "40th Birthday & Health Upgrade",
            "lifeEvent": "Celebrating upcoming 40th birthday after an A+ executive wellness checkup in {city}; wants to lock in Age-39 premier private suite medical & 110% refund.",
            "existingGap": "Basic RM 100k policy • Ready to upgrade to RM 8M private hospital suite health cover with 15% healthy cash discount.",
            "customerReply": "\"Love the 40th birthday card! An AIA friend quoted me AIA A-Plus Health360 + Beyond Critical Care before my 40th. How does PRU compare?\"",
            "cardHeadline": "Happy 40th Birthday — Cheers to Peak Health & Your Best Decade Ahead! 🥂⚡",
            "cardChips": [
                "Happy 40th Birthday — Cheers to Peak Health & Your Best Decade Ahead! 🥂⚡",
                "Celebrating 40 Years Strong — Wishing You Vibrant Health & Momentum! 🌟",
            ],
            "cardHints": ["🥂 Festive 40th birthday toast & golden {city} sunrise", "⚡ Celebrating A+ peak health & career momentum", "🏥 Premier private suite peace of mind for your 40s"],
            "waIdeas": [
                {"label": "🏥 RM 8M Suite + 15% Cash Saver", "detail": "Upgrade to PRUMillion Med Active 2.0 (RM 8M private hospital suite cover + 15% instant healthy no-claim cash discount at Age-39 rates)"},
                {"label": "⚡ ~190 Conditions to Age 100", "detail": "Lock in comprehensive wellness & recovery protection across ~190 conditions up to Age 100 via PRUAll Care"},
                {"label": "💰 110% Maturity Cash Refund", "detail": "Pair PRUMan for 260% executive wellness protection + up to 110% total premium cash refund at maturity"},
            ],
            "waHints": ["Early Happy 40th & congrats on your A+ wellness checkup!", "Quick 2-min tip to lock Age-39 rates + 15% healthy cash discount", "Celebratory 10-min coffee in {city} this Friday?"],
            "aiaFacts": [
                "15% Instant Healthy Cash Discount (RM 8M Med Cover): PRUMillion Med Active 2.0 cuts actual cash medical premium by 15% every claim-free year (AIA Health360 only credits a conditional wallet).",
                "Protection to Age 100 Across ~190 Conditions (vs. AIA Age 80): PRUAll Care safeguards executive wellness & recovery up to Age 100, 20 years longer than AIA's Age-80 cap.",
                "Up to 110% Maturity Premium Refund: Pairing PRUMan delivers 260% executive wellness protection + refunds up to 110% of total premiums in cash at maturity.",
            ],
            "closeHints": ["Celebratory 10-min birthday coffee in {city} before your Age-39 window closes", "Compare RM 8M 15% cash discount & Age-100 tables side-by-side", "Quick 10-min Zoom Thursday at 8pm"],
        },
        "zh-CN": {
            "shortLabel": "40岁生日与高端医疗升级",
            "lifeEvent": "在 {city} 完成年度高管健康体检全优达标，下月喜迎40岁生日；希望趁39岁黄金费率升级 RM 800万高端私家病房医疗与110%满期返还。",
            "existingGap": "仅有基础 RM 10万旧单 • 计划升级 RM 800万高端医疗护盾（享15%健康现金折扣）与收入延续保障。",
            "customerReply": "“40岁生日贺卡太赞了！有位 AIA 朋友趁我40岁生日前报了 AIA A-Plus Health360 + Beyond Critical Care，你们的方案有什么实际优势？”",
            "cardHeadline": "40岁生日快乐 — 敬巅峰健康与人生最精彩的黄金十年！🥂⚡",
            "cardChips": [
                "40岁生日快乐 — 敬巅峰健康与人生最精彩的黄金十年！🥂⚡",
                "礼赞四十风华正茂：愿活力常青、宏图大展！🌟",
            ],
            "cardHints": ["🥂 40岁生日香槟举杯与 {city} 金色日出", "⚡ 祝贺体检全优达标与巅峰状态", "🏥 尊尚私家病房健康护航黄金十年"],
            "waIdeas": [
                {"label": "🏥 RM 800万医疗 + 15%现金折", "detail": "趁39岁黄金费率升级 PRUMillion Med Active 2.0（RM 800万私家医院尊尚保障 + 无索赔立减15%现金保费）"},
                {"label": "⚡ ~190项全面守护至100岁", "detail": "搭配 PRUAll Care 锁定约190项全方位健康与康复守护直至100岁"},
                {"label": "💰 满期高达 110% 保费返还", "detail": "结合 PRUMan 享260%高管健康保障，满期最高返还高达110%已缴总保费"},
            ],
            "waHints": ["提前祝40岁生日快乐，更恭喜年度体检全优达标！", "趁40岁生日前帮您锁住39岁费率与15%健康现金折扣", "周五在 {city} 请您喝杯10分钟庆生咖啡？"],
            "aiaFacts": [
                "无索赔立享 15% 现金保费折扣（RM 800万高端医疗）：PRUMillion Med Active 2.0 直接减免15%现金保费（AIA Health360 保费照收、仅记入有条件医疗钱包）。",
                "保至100岁 & 约190项全面守护（对比 AIA 80岁终止）：PRUAll Care 全方位健康与康复保障直至100岁，比 AIA 多守护整整20年。",
                "高达 110% 满期保费现金返还：搭配 PRUMan 提供260%高管健康保障，满期最高返还110%已缴总保费。",
            ],
            "closeHints": ["生日前在 {city} 喝杯10分钟庆生咖啡并排看利益表", "一页表看清15%真金白银折扣与保至100岁优势", "周四晚8点用10分钟Zoom轻松过一遍"],
        },
    },

    "new_home_mortgage": {
        "icon": "🏡",
        "rivalBrand": "AIA Malaysia",
        "pambPlan": "PRUWith You Plus (Portable MLTA) + PRUAll Care",
        "aiaPlan": "AIA A-Life Link 2 + A-Plus Total Multi-Crisis (or Bank MRTA)",
        "cardThemeColors": ((240, 253, 244), (237, 27, 46), (21, 128, 61)),
        "cardArtPrompt": "Warm Malaysian semi-D housewarming congratulatory card (16:9 landscape), golden house keys with crimson ribbon, sunlit tropical garden terrace, zero corporate logos",
        "en": {
            "shortLabel": "New RM 1.3M Home Keys",
            "lifeEvent": "Collected keys to RM 1.3M semi-D in {area}; RM 5,600/mth 35-year joint mortgage.",
            "existingGap": "Medical cards only • Wants portable family-owned protection + 20% mortgage continuity reserve for RM 1.3M home.",
            "customerReply": "\"Love the housewarming card! AIA quoted us A-Life Link 2 for our mortgage (and the bank pushed MRTA). How does PRU compare?\"",
            "cardHeadline": "Congratulations on Your Beautiful New Home! 🏡🔑",
            "cardChips": ["Congratulations on Your Beautiful New Home! 🏡🔑", "Wishing Warmth & Blessings in Your New {area} Home! ✨"],
            "cardHints": ["🔑 Golden house keys & lush garden terrace", "🏡 Warm housewarming blessing for the family", "🌿 Sunlit cozy living room celebration"],
            "waIdeas": [
                {"label": "🔑 RM 500 New Home Reward", "detail": "Claim an immediate RM 500 New Home Goal Achievement Cash Reward under PRUWith You Plus"},
                {"label": "🏠 Portable MLTA (Keep Surplus)", "detail": "Protect RM 1.3M mortgage with portable family-owned MLTA instead of bank-locked MRTA"},
                {"label": "🛡️ 20% Mortgage Continuity Reserve", "detail": "PRUAll Care adds a +20% mortgage continuity reserve to keep RM 5,600/mth installments smooth during recovery"},
            ],
            "waHints": ["Congrats on your gorgeous new home in {area}!", "Enjoy unpacking first—happy to share a 2-min MRTA vs MLTA tip", "Weekend coffee near {area}?"],
            "aiaFacts": [
                "Unconditional +50% Auto Booster: PRUWith You Plus grows your portable family mortgage shield +1%/yr (up to +50%) free—no annual AIA Vitality checks/fees.",
                "Immediate RM 500 New Home Cash Reward upon collecting your house keys + portable cover for future properties.",
                "+20% Mortgage Continuity Reserve (PRUAll Care): Adds a dedicated 20% continuity reserve so RM 5,600/mth mortgage installments stay seamlessly on track.",
            ],
            "closeHints": ["10-min coffee near {area} with your spouse", "1-page Bank MRTA vs AIA vs PRU portable MLTA comparison", "Quick 10-min Zoom Sunday afternoon"],
        },
        "zh-CN": {
            "shortLabel": "喜提 RM 130万新居",
            "lifeEvent": "刚拿到 {area} RM 130万半独立洋房钥匙，开启35年期新居按揭规划（月供 RM 5,600）。",
            "existingGap": "仅有普通医药卡 • 希望为 RM 130万新居配置可携式家庭护盾与 20% 房贷延续储备金。",
            "customerReply": "“新居贺卡太漂亮了！银行推销 MRTA，而 AIA 代理刚报了 A-Life Link 2，你能对比一下 PRU 方案优势吗？”",
            "cardHeadline": "恭贺新居入伙：阖家安康、福满华堂！🏡🔑",
            "cardChips": ["恭贺新居入伙：阖家安康、福满华堂！🏡🔑", "祝贺喜提 {area} 理想新居，幸福美满！✨"],
            "cardHints": ["🔑 金色新居钥匙与花园露台", "🏡 新居入伙阖家兴旺祝福", "🌿 阳光满屋的温馨客厅"],
            "waIdeas": [
                {"label": "🔑 RM 500 新居现金奖", "detail": "凭新屋拿钥匙直接申领 PRUWith You Plus RM 500 人生目标现金奖赏"},
                {"label": "🏠 可携式 MLTA 胜银行 MRTA", "detail": "用可随身携带、盈余归家人的 MLTA 守护新居，而非绑定银行的 MRTA"},
                {"label": "🛡️ 20% 房贷延续储备金", "detail": "PRUAll Care 额外加码+20%房贷延续储备金，稳妥守护每月 RM 5,600 供款顺畅"},
            ],
            "waHints": ["恭喜喜提 {area} 漂亮新屋！", "先开心布置新家，顺手发您一份2分钟房贷护盾对比", "周末在 {area} 附近请你们喝杯咖啡？"],
            "aiaFacts": [
                "免费自动 +50% 保额递增：PRUWith You Plus 每年免费+1%（最高+50%），无需缴付 AIA Vitality 年费或打卡。",
                "即领 RM 500 新居达成现金奖 + 保单可随未来换房自由携带，保障盈余100%归家人享有。",
                "额外 +20% 房贷延续储备金 (PRUAll Care)：额外加码20%延续储备，让每月 RM 5,600 新居月供始终稳健无忧。",
            ],
            "closeHints": ["周末在 {area} 和另一半喝杯10分钟咖啡对照", "一页表看清银行MRTA、AIA与PRU可携式护盾差异", "周日晚8点10分钟Zoom轻松聊"],
        },
    },

    "career_promotion": {
        "icon": "🌟",
        "rivalBrand": "AIA Malaysia",
        "pambPlan": "PRULady + PRUElite Invest + PRUValue Med",
        "aiaPlan": "AIA A-Life Lady360 + A-Life Wealth Builder",
        "cardThemeColors": ((253, 244, 255), (237, 27, 46), (147, 51, 234)),
        "cardArtPrompt": "Elegant executive promotion congratulatory card (16:9 landscape), blooming white & purple orchids, KLCC golden skyline view, brushed gold luxury border, zero corporate logos",
        "en": {
            "shortLabel": "Executive Promotion",
            "lifeEvent": "Promoted to {role}; monthly income doubled to RM 48k/mth.",
            "existingGap": "Junior RM 200k policy from 10 yrs ago • Zero female CI & low wealth allocation.",
            "customerReply": "\"Thank you! My colleague introduced an AIA planner quoting AIA A-Life Lady360 + Wealth Builder. How does PRU compare for my bracket?\"",
            "cardHeadline": "Congratulations on Your Promotion to {role}! 🌟",
            "cardChips": ["Congratulations on Your Promotion to {role}! 🌟", "Celebrating Your Leadership Milestone & New Chapter! 🏆"],
            "cardHints": ["🏙️ Executive office overlooking KL skyline", "💐 Elegant orchids & brushed-gold prestige motif", "🌟 Celebrating leadership excellence"],
            "waIdeas": [
                {"label": "🌟 Promotion Cash Reward", "detail": "Unlock Career Promotion Milestone Cash Reward + up to 260% female CI cover under PRULady"},
                {"label": "📈 103% Day-1 Wealth Boost", "detail": "Deploy surplus income via PRUElite Invest with 103% Day-1 premium allocation (+3% instant boost)"},
                {"label": "🏥 Growing Med Value Point", "detail": "Upgrade executive medical shield via PRUValue Med with automatic annual limit growth"},
            ],
            "waHints": ["Well-deserved promotion to {role}!", "Condensed into a 2-min executive brief for your packed schedule", "Quick 10-min coffee near your office this week?"],
            "aiaFacts": [
                "Up to 260% Female CI + 110% Maturity Refund: PRULady pays up to 260% female CI cover, Career Milestone Cash Reward, and refunds up to 110% of premiums at maturity.",
                "103% Day-1 Investment Allocation (PRUElite Invest): 103% of single premium enters wealth funds on Day 1 (+3% immediate head start vs. standard ILP upfront charges).",
                "Guaranteed Annual Med Value Point Growth: PRUValue Med grows medical limits automatically every year and still covers 80% beyond limit.",
            ],
            "closeHints": ["10-min coffee between your afternoon meetings", "1-page Day-1 103% yield & female CI comparison table", "Brief 10-min Zoom Friday at 6:30pm"],
        },
        "zh-CN": {
            "shortLabel": "高管晋升收入翻倍",
            "lifeEvent": "荣升 {role}，月收入翻倍至 RM 4.8万/月。",
            "existingGap": "十年前旧款 RM 20万保单 • 缺乏高管女性重疾与高配比财富增值。",
            "customerReply": "“非常感谢！同事刚介绍了 AIA 顾问报价 AIA A-Life Lady360 + Wealth Builder，你们的高管方案相比有什么优势？”",
            "cardHeadline": "恭贺荣升 {role}：卓越领航、再创高峰！🌟",
            "cardChips": ["恭贺荣升 {role}：卓越领航、再创高峰！🌟", "祝贺步入事业新巅峰，前程似锦！🏆"],
            "cardHints": ["🏙️ 俯瞰吉隆坡天际线的高管视野", "💐 典雅兰花与红金尊尚边框", "🌟 祝贺卓越领导力里程碑"],
            "waIdeas": [
                {"label": "🌟 升职现金奖 + 260%女性重疾", "detail": "PRULady 高达260%女性重疾赔付 + 满期最高110%返还及升职现金奖"},
                {"label": "📈 首日 103% 财富配置加码", "detail": "PRUElite Invest 首日即享 103% 保费投入基金运作（立享+3%起跑优势）"},
                {"label": "🏥 医疗额度每年自动递增", "detail": "PRUValue Med 医疗额度每年自动增长，超额仍报销80%"},
            ],
            "waHints": ["实至名归荣升 {role}！", "深知您行程紧凑，特浓缩成2分钟高管简报", "这周在您办公楼下请您喝杯10分钟咖啡？"],
            "aiaFacts": [
                "高达 260% 女性重疾 + 110% 满期返还：PRULady 含升职现金奖，无事满期最高返还110%总保费。",
                "首日 103% 财富配置 (PRUElite Invest)：首日即有103%保费进入投资账户（比传统产品立多+3%本金运作）。",
                "医疗额度每年无条件递增：PRUValue Med 每年自动提升额度，超限仍赔付80%合规账单。",
            ],
            "closeHints": ["午休或会议间隙10分钟咖啡快速对照", "先发您1页首日103%配置与女性重疾对比表", "周五傍晚6点半10分钟Zoom简报"],
        },
    },

    "sme_expansion": {
        "icon": "🏭",
        "rivalBrand": "AIA Malaysia",
        "pambPlan": "PRUWealth Enrich 2.0 + PRUPrestige Legacy + PRUAll Care",
        "aiaPlan": "AIA A-Life Legasi Beyond + A-Life Wealth Prestige",
        "cardThemeColors": ((254, 252, 232), (237, 27, 46), (180, 83, 9)),
        "cardArtPrompt": "Prestigious SME industrial expansion congratulatory card (16:9 landscape), modern high-tech Malaysian plant at golden sunrise, deep navy and gold legacy crest, zero corporate logos",
        "en": {
            "shortLabel": "SME RM 6M Bank Guarantee",
            "lifeEvent": "Signed RM 6M personal bank guarantee for {area} plant expansion; 1 child abroad, 1 joining business.",
            "existingGap": "RM 18M illiquid factory shares • Old RM 800k policy • Wants to ring-fence RM 5.2M corporate guarantee from family harmony.",
            "customerReply": "\"Appreciate the gesture! Our banker & AIA advisor pitched AIA A-Life Legasi Beyond for keyman/legacy. How does PRU structure it better?\"",
            "cardHeadline": "Congratulations on Your {area} Expansion Milestone! 🏭",
            "cardChips": ["Congratulations on Your {area} Expansion Milestone! 🏭", "To Enduring Enterprise Growth & Generational Legacy! 🏛️"],
            "cardHints": ["🏭 Modern {area} plant at golden sunrise", "🏛️ Multi-generational family legacy crest", "🤝 Celebrating industrial leadership"],
            "waIdeas": [
                {"label": "🏭 Ring-Fence RM 6M Loan", "detail": "Ring-fence RM 6M personal bank guarantee from family estate via FSA Schedule 10 statutory trust"},
                {"label": "⚖️ Equalize Both Children", "detail": "Give non-business child tax-free cash (PRUPrestige Legacy) while successor child keeps 100% factory shares"},
                {"label": "📈 +50% Auto High-Cover Boost", "detail": "PRUWealth Enrich 2.0 boosts high Sum Assured up to +50% automatically + 500% Executive Travel & Keyman Multiplier"},
            ],
            "waHints": ["Huge milestone expanding in {area}, Dato'!", "Happy to walk through this alongside your CFO or company secretary", "15-min tea at your {area} office this week?"],
            "aiaFacts": [
                "Automatic up to +50% High-Cover Booster + 500% Executive Travel & Keyman Multiplier under PRUWealth Enrich 2.0 without Vitality fitness tracking.",
                "100% Day-1 HNW Legacy Allocation (PRUPrestige Legacy): 100% of single premium works from Day 1 to equalize cash vs. factory equity fairly.",
                "Built-In Legacy Settlement + FSA Schedule 10 Creditor Shield: Protects payout from RM 6M bank guarantee claims with zero annual private trust fees.",
            ],
            "closeHints": ["15-min briefing at your {area} office with your CFO", "Side-by-side creditor ring-fencing & trust fee comparison", "Private 10-min Zoom ahead of your board meeting"],
        },
        "zh-CN": {
            "shortLabel": "扩厂 RM 600万个人担保",
            "lifeEvent": "刚签下 RM 600万个人银行担保扩建 {area} 新厂；一名子女留洋，一名准备接班。",
            "existingGap": "RM 1,800万厂房股权难变现 • 旧保单仅 RM 80万 • 希望稳妥隔离 RM 520万企业连带担保并守护家族和谐。",
            "customerReply": "“有心了！银行与 AIA 顾问刚向我推荐 AIA A-Life Legasi Beyond 做关键人与传承，你们架构好在哪里？”",
            "cardHeadline": "恭贺 {area} 新厂宏图大展、基业长青！🏭",
            "cardChips": ["恭贺 {area} 新厂宏图大展、基业长青！🏭", "祝集团骏业崇隆、世代荣耀传承！🏛️"],
            "cardHints": ["🏭 {area} 现代化新厂金色日出", "🏛️ 家族基业长青传承徽章", "🤝 祝贺实业版图再上层楼"],
            "waIdeas": [
                {"label": "🏭 隔离 RM 600万银行担保", "detail": "运用金融服务法令 Schedule 10 法定信托隔离 RM 600万个人担保债务"},
                {"label": "⚖️ 子女公平传承不散股权", "detail": "接班子女100%继承厂房股权，海外子女获等值免税现金（首日100%配置）"},
                {"label": "📈 大额自动 +50% 保额递增", "detail": "PRUWealth Enrich 2.0 大额保单自动递增高达+50%保额，享高达 500% 高管差旅与关键人保障倍增"},
            ],
            "waHints": ["祝贺 {area} 新厂扩建顺利动工！", "非常乐意配合您的 CFO 或公司秘书一起审阅", "这周去您办公室敬茶聊15分钟？"],
            "aiaFacts": [
                "大额保单自动高达 +50% 保额递增 + 高达 500% 高管差旅与关键人保障倍增 (PRUWealth Enrich 2.0)，无需运动积分维持。",
                "首日 100% 高净值传承配置 (PRUPrestige Legacy)：首日100%保费运作，完美平衡厂房股权与海外子女现金分配。",
                "内建分期传承 + Schedule 10 法定债权隔离：隔离 RM 600万银行连带追索，且省下私人信托每年管理费。",
            ],
            "closeHints": ["周四到您 {area} 办公室与 CFO 用15分钟对照", "一页表看清债权隔离与免私人信托年费优势", "董事会前安排10分钟私密Zoom汇报"],
        },
    },

    "uni_retirement_50": {
        "icon": "🎓",
        "rivalBrand": "AIA Malaysia",
        "pambPlan": "PRUValue Med (Smart Deductible) + PRUElite Flex",
        "aiaPlan": "AIA A-Plus Health360 (Deductible) + A-Life Wealth Venture",
        "cardThemeColors": ((248, 250, 252), (237, 27, 46), (15, 118, 110)),
        "cardArtPrompt": "Warm double-milestone 50th birthday & overseas university admission greeting card (16:9 landscape), sandstone campus archway, golden champagne toast, zero corporate logos",
        "en": {
            "shortLabel": "Turning 50 & Uni Offer",
            "lifeEvent": "Celebrated 50th birthday & child's offer to {uni}.",
            "existingGap": "Employer medical stops at age 60 ('Med Cliff') • Needs post-60 passive income without draining AUD uni fund.",
            "customerReply": "\"Lovely 50th card! An AIA advisor showed us A-Plus Health360 + Wealth Venture for retirement. How does PRU compare factually?\"",
            "cardHeadline": "Happy 50th & Congrats on {uni}! 🎓🥂",
            "cardChips": ["Happy 50th & Congrats on {uni}! 🎓🥂", "Celebrating Two Golden Family Milestones! ✨"],
            "cardHints": ["🎓 Campus archway & golden 50th toast", "🥂 Double celebration for the whole family", "🌏 Smooth bridge into golden retirement"],
            "waIdeas": [
                {"label": "🏥 Beat Age-60 Med Cliff", "detail": "Lock in clean Age-50 health underwriting now with low-cost Smart Deductible before employer cover ends at 60"},
                {"label": "📈 Med Grows Even After Claim", "detail": "PRUValue Med grows Med Value Point every year unconditionally—even in years you claim!"},
                {"label": "🥂 Guaranteed Income to 100", "detail": "Keep AUD uni reserve safe & build contractually guaranteed annual FlexIncome to age 100 (PRUElite Flex)"},
            ],
            "waHints": ["Happy 50th & huge congrats on {uni}!", "Keep your AUD tuition reserve intact while bridging Age 60", "Weekend morning coffee with you & your spouse?"],
            "aiaFacts": [
                "Med Value Point Grows Every Year Even After Claims: PRUValue Med boosts limits yearly + pays 80% above limit (AIA Health Wallet stops growing in claim years).",
                "Contractually Guaranteed Annual FlexIncome to Age 100 under PRUElite Flex (vs. non-guaranteed market-only ILP projections).",
                "Smart Deductible Age-60 Bridge: Slashes premiums from age 50–60 while covered by company medical, locking in healthy age-50 insurability.",
            ],
            "closeHints": ["10-min Zoom Saturday 11am with your spouse", "Compare post-claim medical growth vs AIA wallet side-by-side", "Send a 1-page Age-50 to Age-100 retirement bridge chart"],
        },
        "zh-CN": {
            "shortLabel": "50知天命与名校录取",
            "lifeEvent": "刚庆祝50岁生日，同时孩子喜获 {uni} 录取通知。",
            "existingGap": "公司团体医疗60岁即终止（断保悬崖） • 需规划60岁后稳定被动收入且不动用澳币学费。",
            "customerReply": "“谢谢50岁贺卡！AIA 顾问刚推荐了 A-Plus Health360 + Wealth Venture 做退休衔接，PRU 方案有什么核心差异？”",
            "cardHeadline": "恭祝50金禧大寿暨金榜题名 {uni}！🎓🥂",
            "cardChips": ["恭祝50金禧大寿暨金榜题名 {uni}！🎓🥂", "双喜临门：五十风华正茂，名校锦绣前程！✨"],
            "cardHints": ["🎓 名校拱门与50岁金禧举杯", "🥂 阖家双喜临门温馨画面", "🌏 稳健衔接黄金退休十年"],
            "waIdeas": [
                {"label": "🏥 化解 60 岁公司断保悬崖", "detail": "趁50岁健康体搭配 Smart Deductible 低保费提前锁定60岁退休后终身医疗"},
                {"label": "📈 理赔后额度照样年年涨", "detail": "PRUValue Med 医疗额度每年无条件递增（即使发生过理赔照涨不误！）"},
                {"label": "🥂 保证终身年金领至100岁", "detail": "不动澳币学费储备，以 PRUElite Flex 建立保证派发至100岁的退休现金流"},
            ],
            "waHints": ["祝50岁生日快乐，更恭喜孩子考入 {uni}！", "帮您护住澳币学费专款，同时填平60岁医疗断层", "这周末和另一半喝杯早茶聊10分钟？"],
            "aiaFacts": [
                "理赔后保额依然每年递增：PRUValue Med 每年无条件涨额度且超限赔80%（AIA 医疗钱包一旦理赔当年即停止增长）。",
                "契约保证派发年度退休金至100岁 (PRUElite Flex)，稳胜纯非保证市场波动预测。",
                "Smart Deductible 50–60岁省费衔接：在职有公司医保期间大幅降低保费，提前锁住50岁标准健康核保。",
            ],
            "closeHints": ["周六上午11点与另一半一起10分钟Zoom对照", "一页看清「理赔后照涨额度」对比友邦钱包限制", "先发您一张50至100岁医疗与年金衔接图"],
        },
    },

    "takaful_hibah_estate": {
        "icon": "🕌",
        "rivalBrand": "AIA Public Takaful",
        "pambPlan": "PRUBSN WarisanPlus + PRUBSN AnugerahPlus (Shariah Hibah)",
        "aiaPlan": "AIA Public Takaful A-Life Legasi + A-Life Ikhtiar",
        "cardThemeColors": ((236, 253, 245), (237, 27, 46), (5, 150, 105)),
        "cardArtPrompt": "Refined Malaysian Islamic geometric art & warm golden lantern greeting card (16:9 landscape), emerald and brushed gold arabesque border, peaceful family blessing, zero corporate logos",
        "en": {
            "shortLabel": "Muslim SME Hibah & Faraid",
            "lifeEvent": "{biz} hit record revenue; wants Shariah-compliant Hibah liquidity so family avoids 18-mth estate freeze.",
            "existingGap": "RM 9M business & property tied up in joint names • Zero conditional Hibah Takaful liquidity.",
            "customerReply": "\"Alhamdulillah, thank you for the card! AIA Public Takaful quoted us A-Life Legasi. How does PRUBSN WarisanPlus compare for Hibah?\"",
            "cardHeadline": "Mabruk on {biz}'s Record Milestone & Barakah! 🌟",
            "cardChips": ["Mabruk on {biz}'s Record Milestone & Barakah! 🌟", "Wishing Continued Barakah, Harmony & Family Legacy! 🕌"],
            "cardHints": ["🕌 Elegant emerald & gold geometric arabesque motif", "🌿 Peaceful family legacy & Barakah theme", "✨ Celebrating {biz} milestone"],
            "waIdeas": [
                {"label": "🕌 Conditional Hibah (No Freeze)", "detail": "Inject immediate Shariah-compliant cash via PRUBSN WarisanPlus Hibah outside probate/estate freeze"},
                {"label": "📈 Up to 400% Accidental Shield", "detail": "Up to 400% accidental / public transport & overseas Umrah/Hajj protection built in"},
                {"label": "🛡️ Preserve Faraid Harmony", "detail": "Provide instant family & business liquidity to settle debts without forced sale of {biz} assets"},
            ],
            "waHints": ["Alhamdulillah, huge congrats on {biz}'s milestone!", "Prepared a 2-min Hibah liquidity brief to keep family assets intact", "10-min coffee after Friday prayers or next week?"],
            "aiaFacts": [
                "Immediate Conditional Hibah Payout Outside Estate Freeze: PRUBSN WarisanPlus delivers fast Shariah-compliant liquidity without requiring AIA Vitality annual fees to keep boosters.",
                "Up to 400% Accidental Cover (including Umrah/Hajj & public hubs) + rare diseases protection built into the legacy certificate.",
                "Flexible Wakaf & Charitable Endowments option alongside family Hibah nomination for lasting Sadaqah Jariyah.",
            ],
            "closeHints": ["15-min coffee with you & spouse to map Hibah vs Faraid", "1-page side-by-side PRUBSN WarisanPlus vs AIA Legasi table", "Quick 10-min Zoom Wednesday evening"],
        },
        "zh-CN": {
            "shortLabel": "清真企业 Hibah 传承",
            "lifeEvent": "{biz} 业绩创历史新高；希望通过符合教义的 Hibah 赠与隔离长达18个月的遗产冻结。",
            "existingGap": "RM 900万房产与公司股份联名持有 • 缺乏免冻结即刻到账的 Hibah 流动现金。",
            "customerReply": "“非常感谢精美的祝贺卡！AIA Public Takaful 刚报了 A-Life Legasi，PRUBSN WarisanPlus 在 Hibah 传承上有什么优势？”",
            "cardHeadline": "祝贺 {biz} 业绩长虹、家族福泽绵长！🌟",
            "cardChips": ["祝贺 {biz} 业绩长虹、家族福泽绵长！🌟", "愿事业兴旺、家族和谐传承世代平安！🕌"],
            "cardHints": ["🕌 典雅翠绿与描金几何艺术纹样", "🌿 家族和谐与世代平安主题", "✨ 祝贺 {biz} 创下里程碑"],
            "waIdeas": [
                {"label": "🕌 Hibah 免遗产冻结直付", "detail": "通过 PRUBSN WarisanPlus 指定 Hibah 受益人，绕过漫长遗产冻结即刻注入免税现金"},
                {"label": "📈 高达 400% 意外与朝圣护盾", "detail": "内建高达400%特定意外（含朝圣 Umrah/Hajj 与公共枢纽）高额保障"},
                {"label": "🛡️ 守护 Faraid 家族和谐", "detail": "提供充裕流动现金清偿企业负债，无需变卖 {biz} 资产"},
            ],
            "waHints": ["衷心祝贺 {biz} 今年创下业绩新高！", "特意整理了2分钟 Hibah 免冻结现金流简报供您参考", "下周方便约10分钟喝杯咖啡聊聊吗？"],
            "aiaFacts": [
                "免 Vitality 会费稳享高额 Hibah 传承：PRUBSN WarisanPlus 无需像友邦每年缴会费刷运动分即可稳锁传承杠杆。",
                "高达 400% 特定意外与朝圣保障 + 罕见重症覆盖，全面贴合大马穆斯林企业家家庭需求。",
                "内建 Wakaf 公益捐赠选项：在守护家人 Hibah 之外可同步规划永续慈善传承。",
            ],
            "closeHints": ["与您和夫人喝杯15分钟咖啡梳理 Hibah 配比", "发您1页 PRUBSN WarisanPlus vs AIA Legasi 对比表", "周三晚8点10分钟Zoom快速讲解"],
        },
    },

    "fd_maturing_wealth": {
        "icon": "📈",
        "rivalBrand": "Great Eastern Malaysia",
        "pambPlan": "PRUElite Invest + PRUWealth Enrich 2.0",
        "aiaPlan": "Great Eastern Great Wealth Advantage (or Bank 4% Front-Load Unit Trust)",
        "cardThemeColors": ((255, 251, 235), (237, 27, 46), (202, 138, 4)),
        "cardArtPrompt": "Sophisticated private wealth milestone greeting card (16:9 landscape), golden compass, calm sunlit ocean horizon, refined crimson & gold trim, zero corporate logos",
        "en": {
            "shortLabel": "Maturing FD Wealth Shift",
            "lifeEvent": "{amt} Fixed Deposit just matured; exploring smart wealth growth beyond dropping bank FD rates & 3–5% unit trust sales charges.",
            "existingGap": "Excess cash in low-yield bank FD • Wants Day-1 compounding + direct probate-free family wealth nomination.",
            "customerReply": "\"Lovely card! My relationship manager pitched Great Eastern Great Wealth Advantage & a bank unit trust for my {amt}. Why PRUElite Invest?\"",
            "cardHeadline": "Wishing You Enduring Prosperity & Smart Wealth Growth! 📈",
            "cardChips": ["Wishing You Enduring Prosperity & Smart Wealth Growth! 📈", "To Calm Seas, Strong Yields & Generational Wealth! ✨"],
            "cardHints": ["🧭 Golden wealth compass & sunlit horizon", "🌟 Celebrating smart financial stewardship", "🏛️ Refined private-wealth stationery look"],
            "waIdeas": [
                {"label": "📈 103% Day-1 Allocation", "detail": "PRUElite Invest puts 103% of your single premium to work on Day 1 (+3% instant bonus vs. 3-5% bank sales charge)"},
                {"label": "🏛️ Seamless Family Continuity", "detail": "Direct policy nomination transfers {amt}+ growth smoothly to loved ones outside 12-month probate administration"},
                {"label": "🌍 Institutional Global Funds", "detail": "Access curated global multi-asset & income funds with ongoing Loyalty Bonus boosts"},
            ],
            "waHints": ["Thought of you with FD promotional rates shifting this quarter!", "2-min comparison showing 103% Day-1 allocation vs bank upfront fees", "Morning tea this week to review your {amt} tranche?"],
            "aiaFacts": [
                "103% Day-1 Invested Capital: PRUElite Invest gives an immediate +3% extra allocation on Day 1 (whereas bank unit trusts deduct 2–5% upfront).",
                "Ongoing Loyalty Bonuses compound long-term wealth faster than standard regular-charge plans from Great Eastern / banks.",
                "Direct Probate-Free Family Continuity: Unlike bank FDs & unit trusts tied up in lengthy probate administration, policy nomination transfers wealth directly to beneficiaries.",
            ],
            "closeHints": ["10-min tea this Thursday to compare Day-1 net invested capital", "1-page RM {amt} 10-year net allocation comparison sheet", "Quick 10-min Zoom with your spouse"],
        },
        "zh-CN": {
            "shortLabel": "大额定存到期增值配置",
            "lifeEvent": "{amt} 银行定期存款刚到期；希望寻找优于传统定存收益、且免除银行基金 3–5% 前扣费的稳健增值方案。",
            "existingGap": "闲置定存收益偏低 • 期待首日高配比复利及便捷直达家人的财富延续提名。",
            "customerReply": "“谢谢心意！银行经理刚向我推销大东方 (Great Eastern) Great Wealth Advantage 和银行基金来放这笔 {amt}，PRUElite Invest 好在哪？”",
            "cardHeadline": "祝财源稳健长流、富足安康常伴！📈",
            "cardChips": ["祝财源稳健长流、富足安康常伴！📈", "稳驭财富航向，守护世代丰盛！✨"],
            "cardHints": ["🧭 金色财富罗盘与晨曦海平线", "🌟 祝贺稳健财富管理新篇章", "🏛️ 私人银行级典雅贺卡质感"],
            "waIdeas": [
                {"label": "📈 首日 103% 本金直接运作", "detail": "PRUElite Invest 首日即投入103%资金运作（立多+3%红利，免除银行基金3-5%前扣费）"},
                {"label": "🏛️ 免遗产冻结顺畅传承", "detail": "通过保单受益人提名，{amt} 资产免除繁琐认证流程顺畅直达家人"},
                {"label": "🌍 全球精选基金 + 忠诚红利", "detail": "对接国际机构级多元资产基金，并享长期持续忠诚红利加码"},
            ],
            "waHints": ["看到本季银行定存促销息调整，第一时间想到您！", "帮您算了首日103%配置对比银行前扣费的2分钟简表", "这周请您喝杯早茶聊聊这笔 {amt} 配置？"],
            "aiaFacts": [
                "首日 103% 净本金起跑：PRUElite Invest 第一天就有103%资金进场复利（银行基金往往先扣2–5%认购费，起跑即差5–8%）。",
                "长期忠诚红利持续加码，中长期净值表现优于大东方及银行常规高费率方案。",
                "顺畅直达家人的财富延续机制：不同于传统定存与基金需漫长遗产认证流程，保单受益人提名可高效直付家人，守护家族和谐。",
            ],
            "closeHints": ["周四喝杯10分钟早茶对比首日净投入金额", "发您1页 {amt} 十年净复利对比测算表", "安排10分钟Zoom简洁汇报"],
        },
    },

    "female_ci_family_scare": {
        "icon": "🌸",
        "rivalBrand": "Great Eastern Malaysia",
        "pambPlan": "PRULady + PRUAll Care",
        "aiaPlan": "Great Eastern Great Female Shield / AIA A-Life Lady360",
        "cardThemeColors": ((253, 242, 248), (237, 27, 46), (219, 39, 119)),
        "cardArtPrompt": "Warm empowering women's wellness & career milestone greeting card (16:9 landscape), soft pink camellia blossoms, warm morning tea cup, golden sunlight, zero corporate logos",
        "en": {
            "shortLabel": "Women's Executive Wellness & Milestone Plan",
            "lifeEvent": "Celebrating annual wellness checkup & career milestone alongside {rel}; wants PRULady life-stage cash rewards + 110% maturity return.",
            "existingGap": "Company medical card only • Ready to add dedicated women's wellness rewards & 110% maturity cash refund plan.",
            "customerReply": "\"Thank you for your kind note! I also got a quote for Great Eastern Female Shield / AIA Lady360. How does PRULady + PRUAll Care compare?\"",
            "cardHeadline": "Celebrating Your Radiant Wellness & Career Milestone! 🌸",
            "cardChips": ["Celebrating Your Radiant Wellness & Career Milestone! 🌸", "Wishing Vibrant Wellness, Joy & Lasting Prosperity! 💖"],
            "cardHints": ["🌸 Soft camellia blossoms & warm sunlight", "💖 Celebrating women's leadership & radiant wellness", "☕ Warm, empowering milestone note"],
            "waIdeas": [
                {"label": "🌸 Women's Wellness + Rewards", "detail": "PRULady delivers up to 260% dedicated women's wellness protection + life-stage milestone cash rewards"},
                {"label": "💰 Up to 110% Maturity Refund", "detail": "Enjoy peace of mind knowing PRULady refunds up to 110% of total premiums paid at maturity"},
                {"label": "🛡️ ~190 Conditions to Age 100", "detail": "Pair PRUAll Care for comprehensive wellness & recovery protection across ~190 conditions to Age 100"},
            ],
            "waHints": ["Congrats on a wonderful wellness & career year!", "Happy to share a 2-min guide on PRULady's life-stage cash rewards & 110% refund", "Quiet coffee whenever convenient next week?"],
            "aiaFacts": [
                "Up to 260% Comprehensive Women's Wellness Protection + Life Stage Cash Rewards under PRULady (celebrating marriage, career & motherhood milestones).",
                "Up to 110% Total Premium Refund at Maturity: Turns dedicated women's wellness protection into rewarding long-term savings.",
                "Age-100 ~190 Wellness & Recovery Coverage (PRUAll Care): Extends comprehensive protection to age 100 vs. competitors capping at 80.",
            ],
            "closeHints": ["10-min quiet coffee near your office next Tuesday", "1-page PRULady milestone rewards & 110% refund comparison table", "10-min evening Zoom at your convenience"],
        },
        "zh-CN": {
            "shortLabel": "女性高管健康与里程碑礼遇",
            "lifeEvent": "刚完成年度健康体检并迎来职场新里程碑，希望规划 PRULady 人生阶段现金奖赏与满期 110% 保费返还。",
            "existingGap": "仅有公司普通团体医保 • 计划补充专属女性健康守护、里程碑现金礼遇与满期返还。",
            "customerReply": "“谢谢你的暖心祝贺！我也正对比大东方女性保单和友邦 Lady360，PRULady + PRUAll Care 具体优势在哪里？”",
            "cardHeadline": "致敬自信闪耀的您：愿健康、优雅与丰盛常伴 🌸",
            "cardChips": ["致敬自信闪耀的您：愿健康、优雅与丰盛常伴 🌸", "用心守护您的健康活力与每一个精彩里程碑 💖"],
            "cardHints": ["🌸 温柔山茶花与晨光暖茶插画", "💖 致敬现代女性卓越风采与健康活力", "☕ 温暖零压力的专属问候"],
            "waIdeas": [
                {"label": "🌸 高达 260% 女性健康 + 现金奖", "detail": "PRULady 提供高达260%女性专属健康守护与多项人生里程碑现金奖赏"},
                {"label": "💰 满期最高返还 110% 保费", "detail": "满期最高返还110%已缴总保费，兼顾周全健康守护与稳健储蓄回报"},
                {"label": "🛡️ ~190项全面守护至100岁", "detail": "搭配 PRUAll Care 守护至100岁并附带额外+20%康复关怀津贴"},
            ],
            "waHints": ["祝贺迎来健康与事业双丰收的美好时刻！", "特地整理了2分钟 PRULady 里程碑现金奖与110%满期返还要点供您参考", "下周找个安静咖啡馆聊10分钟？"],
            "aiaFacts": [
                "高达 260% 女性专属健康守护 + 人生阶段现金奖：PRULady 全方位覆盖女性健康礼遇与升职、置业、添丁现金奖赏。",
                "满期高达 110% 保费返还：满期可领回高达110%总保费，胜过纯消费型女性附约。",
                "保至100岁约190项全面守护 (PRUAll Care)：比市面上80岁即终止的竞品多出整整20年黄金健康保障。",
            ],
            "closeHints": ["下周二喝杯10分钟咖啡安静对照条款", "先发您1页女性里程碑礼遇与110%满期返还对比表", "晚上方便时10分钟Zoom轻松讲解"],
        },
    },

    "newlyweds_joint_life": {
        "icon": "💍",
        "rivalBrand": "AIA Malaysia",
        "pambPlan": "PRUWith You Plus + PRUMillion Med Active 2.0",
        "aiaPlan": "AIA A-Life Link 2 + A-Plus Health360",
        "cardThemeColors": ((255, 241, 242), (237, 27, 46), (225, 29, 72)),
        "cardArtPrompt": "Romantic Malaysian newlywed congratulatory card (16:9 landscape), intertwined gold wedding bands, blush roses, warm fairy lights over {home} balcony, zero corporate logos",
        "en": {
            "shortLabel": "Newlyweds Merging Finances",
            "lifeEvent": "Just married & moving into {home}; merging finances & updating beneficiaries from parents to spouse.",
            "existingGap": "Outdated student policies • No joint income protection or no-claim discount medical shield.",
            "customerReply": "\"Aww thank you for the wedding card! An AIA cousin quoted us A-Life Link 2 + Health360 as couples plans. How does PRU compare?\"",
            "cardHeadline": "Congratulations on Your Marriage & Beautiful New Chapter! 💍✨",
            "cardChips": ["Congratulations on Your Marriage & Beautiful New Chapter! 💍✨", "Wishing Lifetime Love, Harmony & Shared Prosperity! 🥂"],
            "cardHints": ["💍 Gold wedding rings & blush floral bouquet", "🥂 Romantic toast to your new life in {home}", "❤️ Warm lifetime happiness blessing"],
            "waIdeas": [
                {"label": "💍 RM 500 Marriage Reward", "detail": "Claim RM 500 Legal Marriage Cash Reward under PRUWith You Plus (+ future baby/home rewards!)"},
                {"label": "📈 Free +50% Auto Booster", "detail": "Protection grows +1%/yr up to +50% automatically as your young family grows—at RM 0 extra cost"},
                {"label": "💳 15% Cash Med Discount", "detail": "Healthy young couples save 15% instant cash on PRUMillion Med Active 2.0 premiums every claim-free year"},
            ],
            "waHints": ["Loved seeing your wedding photos—congrats again!", "Quick 2-min newlywed checklist (nomination + RM 500 marriage reward)", "Coffee near {home} after your honeymoon?"],
            "aiaFacts": [
                "RM 500 Marriage Cash Reward + Future Childbirth Reward built into PRUWith You Plus life milestones.",
                "Free +50% Automatic Cover Booster (+1%/yr) with zero AIA Vitality membership fees or gym tracking needed.",
                "15% Direct Cash Premium Discount on PRUMillion Med Active 2.0 for healthy claim-free years (real cash savings for young couples vs. AIA wallet credit).",
            ],
            "closeHints": ["10-min coffee near {home} with both of you", "1-page couples monthly budget & 15% discount comparison", "Relaxed 10-min Zoom next week"],
        },
        "zh-CN": {
            "shortLabel": "新婚夫妻共筑爱巢",
            "lifeEvent": "刚新婚燕尔入住 {home}，正规划夫妻共同财务与更新保单受益人。",
            "existingGap": "仍沿用大学时期旧保单 • 缺乏夫妻家庭责任护盾与健康无理赔现金折扣。",
            "customerReply": "“新婚贺卡太甜了谢谢！家里做友邦 (AIA) 的表姐刚报了 A-Life Link 2 + Health360 情侣方案，你能客观对比一下吗？”",
            "cardHeadline": "新婚志喜：愿百年好合、携手共筑幸福未来！💍✨",
            "cardChips": ["新婚志喜：愿百年好合、携手共筑幸福未来！💍✨", "祝白头偕老、新居 {home} 甜蜜美满！🥂"],
            "cardHints": ["💍 金色婚戒与浪漫玫瑰花束", "🥂 祝贺入住 {home} 开启甜蜜新生活", "❤️ 百年好合温馨祝福"],
            "waIdeas": [
                {"label": "💍 RM 500 新婚现金奖", "detail": "PRUWith You Plus 可领 RM 500 新婚现金奖（未来买房、生娃还能再领！）"},
                {"label": "📈 免费自动 +50% 递增保额", "detail": "保额每年免费自动+1%（最高+50%），随小家庭责任同步长大"},
                {"label": "💳 年轻健康立省 15% 保费", "detail": "PRUMillion Med Active 2.0 无索赔直接减免 15% 实际现金保费"},
            ],
            "waHints": ["看到你们婚礼照片太幸福啦，再次恭喜！", "整理了2分钟新婚必做清单（更新受益人+领RM500新婚奖）", "度完蜜月在 {home} 附近请你们喝咖啡！"],
            "aiaFacts": [
                "新婚、买房、添丁人生里程碑现金奖赏 (PRUWith You Plus)，完美陪伴新婚夫妻每一步成长。",
                "免费高达 +50% 保额自动递增，无需像友邦每年缴交 Vitality 会费打卡运动才能保住加成。",
                "年轻夫妻无理赔直接省下 15% 现金保费 (PRUMillion Med Active 2.0)，实打实省钱而非仅记入有条件钱包。",
            ],
            "closeHints": ["在 {home} 附近和你们俩喝杯10分钟咖啡", "发您1页新婚预算与15%现金折扣对比表", "下周晚间10分钟Zoom轻松聊聊"],
        },
    },

    "hospital_bill_shock": {
        "icon": "🏥",
        "rivalBrand": "Great Eastern Malaysia",
        "pambPlan": "PRUMillion Med Active 2.0 + PRUWith You Plus",
        "aiaPlan": "Great Eastern SmartMedic Million / AIA A-Plus Health360",
        "cardThemeColors": ((239, 246, 255), (237, 27, 46), (2, 132, 199)),
        "cardArtPrompt": "Warm caring family wellness & premier healthcare card (16:9 landscape), sunlit basket of fresh fruits & honey, soothing sky-blue and gold tones, zero corporate logos",
        "en": {
            "shortLabel": "Premier RM 8M Family Med Upgrade",
            "lifeEvent": "Reviewing annual family healthcare portfolio; wants to upgrade old RM 100k card to a premier RM 8M cashless medical shield.",
            "existingGap": "Legacy RM 100k/yr card with co-insurance • Ready for flexible Smart Deductible options & 15% claim-free cash reward.",
            "customerReply": "\"Thanks for reaching out! We're comparing Great Eastern SmartMedic & AIA Health360 to upgrade our medical cards. Why PRUMillion Med Active 2.0?\"",
            "cardHeadline": "Wishing Your Family Lasting Health & Total Peace of Mind! 🛡️",
            "cardChips": ["Wishing Your Family Lasting Health & Total Peace of Mind! 🛡️", "Here's to Worry-Free Healthcare for Your Whole Family! 🌟"],
            "cardHints": ["🍎 Warm sunlit fruit basket & wellness motif", "🛡️ Worry-free family healthcare peace of mind", "💛 Caring check-in for the whole family"],
            "waIdeas": [
                {"label": "🏥 RM 8M Annual / No Lifetime Cap", "detail": "Upgrade to RM 8M annual limit with ZERO lifetime limit under PRUMillion Med Active 2.0"},
                {"label": "💵 15% Cash No-Claim Discount", "detail": "Save 15% instant cash off medical insurance charges every claim-free year (plus flexible Smart Deductible options)"},
                {"label": "🌟 Precision Preventive Care & Outpatient Privilege", "detail": "Includes precision genomic wellness testing & comprehensive outpatient specialist care privileges"},
            ],
            "waHints": ["Happy to share a 2-min VIP medical upgrade summary for your family!", "Quick rule-of-thumb check for upgrading legacy RM 100k cards", "10-min coffee this weekend to review your current card privileges?"],
            "aiaFacts": [
                "15% Instant Cash Discount When Healthy: PRUMillion Med Active 2.0 rewards claim-free years by cutting your actual cash cost by 15% with flexible deductible options (vs. conditional wallet credits).",
                "Up to RM 8 Million Annual Limit + Zero Lifetime Limit + Precision Preventive Care & Outpatient Privilege.",
                "Seamless Cashless Hospital Admission (LOG) across Malaysia's premier private hospitals with zero legacy co-insurance hassles.",
            ],
            "closeHints": ["Bring your existing policy book for a complimentary 10-min privilege check", "1-page RM 8M limit, deductible & 15% cash discount comparison table", "10-min Zoom this Thursday night"],
        },
        "zh-CN": {
            "shortLabel": "尊尚 RM 800万家庭医疗升级",
            "lifeEvent": "年度家庭健康保单检视，计划将十年前旧款 RM 10万医药卡升级为 RM 800万尊尚免找数医疗护盾。",
            "existingGap": "旧款 RM 10万医药卡含共同承担条款 • 希望升级终身无上限、灵活自付额与15%无索赔现金折扣礼遇。",
            "customerReply": "“太及时了！我们正对比大东方 SmartMedic 和友邦 Health360 准备升级全家医药卡，PRUMillion Med Active 2.0 强在哪？”",
            "cardHeadline": "愿您与家人健康无忧、稳享周全医疗守护！🛡️",
            "cardChips": ["愿您与家人健康无忧、稳享周全医疗守护！🛡️", "守护全家安心就医，健康幸福常伴！🌟"],
            "cardHints": ["🍎 阳光果篮与温馨安康插画", "🛡️ 全家无忧医疗守护主题", "💛 贴心家庭健康关怀"],
            "waIdeas": [
                {"label": "🏥 高达 RM 800万年限额·终身无上限", "detail": "升级 PRUMillion Med Active 2.0 高达 RM 800万年度限额且终身无限额"},
                {"label": "💵 无索赔直享 15% 保费现金折扣", "detail": "健康无索赔年份直接减免 15% 医疗保费，实打实省现金"},
                {"label": "🌟 精准预防检测与专科门诊礼遇", "detail": "全面覆盖精准基因健康检测与多项专科门诊医疗礼遇"},
            ],
            "waHints": ["特地为您全家整理了2分钟尊尚医疗升级简报！", "梳理了旧款10万医药卡升级可享的3项尊贵权益", "周末喝杯咖啡帮您免费梳理现有保单礼遇？"],
            "aiaFacts": [
                "健康无理赔直接打 85 折（省15%现金）：PRUMillion Med Active 2.0 直接扣减医疗保费支出，而非像竞品只把额度记入钱包。",
                "高达 RM 800万年度限额 + 终身无上限 + 精准预防基因检测与专科门诊礼遇全覆盖。",
                "告别旧保单 Co-insurance 共同承担限制，全马各大私立医院快捷免找数入院 (LOG)。",
            ],
            "closeHints": ["带上现有旧保单喝杯10分钟咖啡帮您梳理升级权益", "发您1页 RM 800万限额与15%现金折扣对比表", "周四晚8点10分钟Zoom快速对照"],
        },
    },

    "cofounder_keyman_buysell": {
        "icon": "🤝",
        "rivalBrand": "AIA Malaysia",
        "pambPlan": "PRUWealth Enrich 2.0 (Corporate Keyman & Buy-Sell)",
        "aiaPlan": "AIA Corporate Keyman A-Life Legasi Beyond",
        "cardThemeColors": ((241, 245, 249), (237, 27, 46), (30, 41, 59)),
        "cardArtPrompt": "Executive business partnership milestone card (16:9 landscape), two modern skyscrapers connected by a golden bridge, crisp architectural lines, zero corporate logos",
        "en": {
            "shortLabel": "Co-Founder Buy-Sell Continuity",
            "lifeEvent": "50/50 co-founders scaled {biz} to RM 12M valuation; ready to establish a funded Buy-Sell equity continuity agreement.",
            "existingGap": "RM 12M growing valuation • Wants pre-funded RM 6M Buy-Sell liquidity for seamless partner governance & family harmony.",
            "customerReply": "\"Sharp reminder! Our corporate secretary also got an AIA Legasi Beyond Keyman quote. How does PRUWealth Enrich 2.0 compare for Buy-Sell?\"",
            "cardHeadline": "Congratulations on Scaling Your {biz} to New Heights! 🤝",
            "cardChips": ["Congratulations on Scaling Your {biz} to New Heights! 🤝", "To Strong Partnership & Bulletproof Business Continuity! 🏆"],
            "cardHints": ["🌉 Architectural golden bridge symbolizing partnership", "🏆 Celebrating your {biz} growth milestone", "🤝 Executive co-founder prestige card"],
            "waIdeas": [
                {"label": "🤝 Funded RM 6M Buy-Sell", "detail": "Fund a clean RM 6M Cross-Purchase / Buy-Sell pool for smooth 100% equity continuity & full family liquidity"},
                {"label": "📈 Auto up to +50% Cover Boost", "detail": "PRUWealth Enrich 2.0 automatically scales high Sum Assured up to +50% as your company valuation grows"},
                {"label": "⚡ 500% Executive Travel Multiplier", "detail": "Up to 500% Executive Travel & Keyman Multiplier for frequent-traveling co-founders"},
            ],
            "waHints": ["Congrats to both of you on scaling your {biz}!", "2-min visual showing how funded Buy-Sell protects both families & smooth company governance", "15-min coffee with both co-founders this week?"],
            "aiaFacts": [
                "Automatic up to +50% Sum Assured Booster tracks rising business valuation with zero Vitality wellness admin for busy founders.",
                "Up to 500% Executive Travel & Keyman Multiplier protects traveling co-founders during rapid regional expansion.",
                "Clean Corporate Ownership & Assignment flexibility to pair seamlessly with your company lawyer's Buy-Sell deed.",
            ],
            "closeHints": ["15-min coffee with both co-founders & your company secretary", "1-page RM 6M Buy-Sell cashflow diagram vs AIA", "10-min Zoom before your monthly partners' review"],
        },
        "zh-CN": {
            "shortLabel": "合伙人股权延续与家族和谐",
            "lifeEvent": "两位 50/50 合伙人将 {biz} 做到 RM 1,200万估值，计划建立股东互保股权延续资金池 (Buy-Sell)。",
            "existingGap": "企业估值快速增长 • 希望提前储备 RM 600万股权延续专款，兼顾公司稳健治理与两家人的和谐。",
            "customerReply": "“提醒太关键了！公司秘书刚拿了友邦 AIA Legasi Beyond 关键人报价，PRUWealth Enrich 2.0 做股东互保有什么优势？”",
            "cardHeadline": "祝贺合伙事业蒸蒸日上、版图再创新高！🤝",
            "cardChips": ["祝贺合伙事业蒸蒸日上、版图再创新高！🤝", "强强联手、稳筑企业永续护城河！🏆"],
            "cardHints": ["🌉 双塔金桥象征合伙同心", "🏆 庆祝企业估值突破里程碑", "🤝 高管合伙人尊尚质感"],
            "waIdeas": [
                {"label": "🤝 RM 600万股东延续资金池", "detail": "建立股东互保资金池：保障家族获得充裕现金，同时确保企业100%顺畅经营权"},
                {"label": "📈 保额自动递增高达 +50%", "detail": "PRUWealth Enrich 2.0 随企业估值成长自动免费递增高达+50%保额"},
                {"label": "⚡ 高达 500% 高管差旅保障倍增", "detail": "针对高频出差创始人提供高达 500% 高管差旅与关键人保障倍增"},
            ],
            "waHints": ["祝贺两位把事业规模做得这么出色！", "画了一张2分钟「股东股权延续护城河」示意图发你们看", "这周约两位合伙人一起喝杯15分钟咖啡？"],
            "aiaFacts": [
                "大额保额自动递增高达 +50%，随企业估值壮大同步扩容，无需合伙人每年打卡运动维持。",
                "高达 500% 高管差旅与关键人保障倍增，专为高频奔波拓展版图的创始人保驾护航。",
                "清晰灵活的企业投保与股权协议对接架构，方便公司秘书与律师直接落地 Buy-Sell 契约。",
            ],
            "closeHints": ["约两位合伙人喝15分钟咖啡演示股权延续流程图", "发您1页股东互保杠杆对比 AIA 明细表", "合伙人月会前10分钟Zoom快速汇报"],
        },
    },

    "single_parent_guardian": {
        "icon": "👨‍👧",
        "rivalBrand": "AIA Malaysia",
        "pambPlan": "PRUWith You Plus + PRUAll Care (Structured Legacy Settlement)",
        "aiaPlan": "AIA A-Life Link 2 + A-Plus Total Multi-Crisis",
        "cardThemeColors": ((254, 249, 195), (237, 27, 46), (161, 98, 7)),
        "cardArtPrompt": "Heartwarming parent & two children walking into golden sunrise park illustration (16:9 landscape), protective umbrella of light, warm watercolor style, zero corporate logos",
        "en": {
            "shortLabel": "Single Parent Securing 2 Kids",
            "lifeEvent": "Devoted parent raising 2 young kids ({kids}); wants structured annual milestone payouts for their education & living harmony.",
            "existingGap": "100% single-income household • Wants structured yearly child milestone payouts (zero private trust fees) + income continuity shield.",
            "customerReply": "\"Thank you for understanding my priorities! An AIA agent quoted A-Life Link 2. How does PRU protect my 2 kids better?\"",
            "cardHeadline": "Honoring Your Strength, Love & Dedication as a Parent! 🌟",
            "cardChips": ["Honoring Your Strength, Love & Dedication as a Parent! 🌟", "Wishing Bright Skies & Protection for You and Your Kids! 💛"],
            "cardHints": ["🌅 Parent & kids sunlit park watercolor", "💛 Warm tribute to a devoted super-parent", "🛡️ Gentle protective family warmth"],
            "waIdeas": [
                {"label": "📅 Structured Yearly Payouts", "detail": "Use Built-In Legacy Settlement Option to release structured yearly living & tuition funds to kids at RM 0 trust fee"},
                {"label": "🛡️ ~190 Conditions + 20% Reserve", "detail": "Protect household income continuity across ~190 conditions to Age 100 + 20% extra Recovery Care"},
                {"label": "📈 Free +50% Auto Booster", "detail": "PRUWith You Plus boosts family protection up to +50% automatically at RM 0 extra cost"},
            ],
            "waHints": ["Truly admire how wonderfully you're raising both kids ({kids})!", "Found a zero-fee way to schedule yearly milestone payouts for your kids without a costly private trust", "10-min coffee near school pickup time?"],
            "aiaFacts": [
                "Built-In Staggered Legacy Settlement Option (RM 0 Private Trust Fee): Releases structured annual milestone payouts for your kids ({kids}) cleanly and reliably.",
                "Free +50% Auto Cover Booster (+1%/yr) with zero AIA Vitality membership fees eating into your family budget.",
                "~190 Conditions + +20% Extra Recovery Care (PRUAll Care) to keep your monthly household cashflow steady and worry-free.",
            ],
            "closeHints": ["10-min Zoom at 9pm after the kids are asleep", "1-page Staggered Child Payout vs Lump-Sum comparison", "Quick coffee near your office"],
        },
        "zh-CN": {
            "shortLabel": "单亲精英父母守护子女成长",
            "lifeEvent": "用心培养两名年幼孩子（{kids}），希望通过免信托费的「按年分期成长金」稳妥规划孩子的长远教育与生活。",
            "existingGap": "家庭依赖单一核心收入 • 希望建立稳健收入延续护盾与「按年分期」子女成长基金机制。",
            "customerReply": "“谢谢你的贴心理解！AIA 代理刚报了 A-Life Link 2，你们的方案怎么更稳妥地守护我两个孩子的未来？”",
            "cardHeadline": "致敬最坚强温暖的父母心：愿您与孩子平安顺遂！🌟",
            "cardChips": ["致敬最坚强温暖的父母心：愿您与孩子平安顺遂！🌟", "愿阳光与周全守护常伴您和两个宝贝！💛"],
            "cardHints": ["🌅 父母牵手孩子漫步晨光水彩画", "💛 致敬用心守护家庭的温暖力量", "🛡️ 安心陪伴孩子成长每一步"],
            "waIdeas": [
                {"label": "📅 按年分期派发成长金", "detail": "利用内建分期传承选项按年稳妥发放孩子生活与学费，零私人信托管理费"},
                {"label": "🛡️ ~190项守护 + 20%康复金", "detail": "PRUAll Care 稳固守护家庭核心收入延续，并附带额外20%康复关怀金"},
                {"label": "📈 免费自动 +50% 递增保额", "detail": "PRUWith You Plus 免费每年递增保额最高+50%，轻松放大教育与家庭护盾"},
            ],
            "waHints": ["一直很佩服您把两个孩子（{kids}）培养得这么棒！", "帮您找到免私人信托年费也能按年定额发放孩子成长金的方法", "接送孩子前后喝杯10分钟咖啡聊聊？"],
            "aiaFacts": [
                "内建免费分期传承给付机制：无需每年花数千元设立私人信托，即可设定按年稳步发放成长与教育金给孩子（{kids}）。",
                "免费自动 +50% 保额递增，省去 AIA Vitality 每年会员费，把每一分预算都转化为实际保障。",
                "约190项守护保至100岁 + 额外20%康复关怀金 (PRUAll Care)，全方位守护家庭稳健现金流。",
            ],
            "closeHints": ["晚上9点孩子们睡后用10分钟Zoom安静聊", "发您1页「分期成长金」对比传统赔付说明表", "周三午休10分钟咖啡简报"],
        },
    },

    "overseas_med_student": {
        "icon": "✈️",
        "rivalBrand": "Great Eastern Malaysia",
        "pambPlan": "PRUElite Flex + Parent Payor / PRUWealth Enrich 2.0",
        "aiaPlan": "Great Eastern Great Flexi Wealth / AIA A-Life Wealth Venture",
        "cardThemeColors": ((238, 242, 255), (237, 27, 46), (67, 56, 202)),
        "cardArtPrompt": "Proud overseas medical university admission congratulatory card (16:9 landscape), stethoscope with graduation mortarboard, classic UK/Australian sandstone university quad, zero corporate logos",
        "en": {
            "shortLabel": "Overseas Medical Degree",
            "lifeEvent": "Child accepted to {dest}; planning RM 1.2M 5-year overseas GBP/AUD tuition milestone with a self-completing guarantee.",
            "existingGap": "Tuition sits in standard cash • Wants a self-completing Tuition Continuity Guarantee across all 5 clinical years.",
            "customerReply": "\"We're so proud, thank you! Our bank pitched Great Eastern Flexi Wealth for the tuition pool. How does PRUElite Flex + Payor shield compare?\"",
            "cardHeadline": "Huge Congratulations on Admission to {dest}! 🩺🎓",
            "cardChips": ["Huge Congratulations on Admission to {dest}! 🩺🎓", "Celebrating Your Future Doctor's Global Journey! ✈️"],
            "cardHints": ["🩺 Stethoscope & graduation cap over historic campus", "✈️ Proud send-off for your future doctor", "🌟 Celebrating years of family dedication"],
            "waIdeas": [
                {"label": "🎓 Guaranteed Yearly Tuition Payouts", "detail": "PRUElite Flex delivers contractually guaranteed annual cash payouts timed to clinical years"},
                {"label": "🛡️ Self-Completing Degree Guarantee", "detail": "Payor Continuity Guarantee ensures all 5 years at {dest} are 100% self-completing under any circumstance"},
                {"label": "🔄 Convert to Retirement Later", "detail": "Once child graduates as a doctor, seamlessly pivot ongoing FlexIncome into parents' retirement stream"},
            ],
            "waHints": ["Getting into {dest} is an extraordinary achievement!", "2-min structure to make sure all 5 clinical years are 100% self-completing", "Celebratory coffee with you & spouse before departure?"],
            "aiaFacts": [
                "Contractually Guaranteed Annual FlexIncome Payouts timed cleanly for overseas university years (vs. non-guaranteed bank ILP projections).",
                "Dual-Purpose Design: Serves as guaranteed university cashflow first, then continues paying annual retirement income up to Age 100.",
                "Self-Completing Tuition Continuity Guarantee: Built-in Payor Waiver ensures your future doctor completes {dest} seamlessly.",
            ],
            "closeHints": ["10-min coffee before university visa & FX remittance", "1-page 5-Year Tuition Cashflow + Waiver schedule", "10-min Zoom with both parents Thursday"],
        },
        "zh-CN": {
            "shortLabel": "子女赴英澳读医科",
            "lifeEvent": "孩子喜获 {dest} 录取！正在规划未来5年逾 RM 120万英镑/澳币医学学费的自动完学保证。",
            "existingGap": "学费仅放普通账户 • 希望为5年海外医科加上「自动完学延续保证」与毕业后父母长俸转换。",
            "customerReply": "“全家都特别自豪，谢谢贺卡！银行刚推了大东方 Great Flexi Wealth 来规划学费池，你们的方案好在哪里？”",
            "cardHeadline": "金榜题名：恭贺荣录 {dest} 未来仁医！🩺🎓",
            "cardChips": ["金榜题名：恭贺荣录 {dest} 未来仁医！🩺🎓", "祝贺准医生扬帆远航、鹏程万里！✈️"],
            "cardHints": ["🩺 听诊器与学士帽名校插画", "✈️ 祝贺未来仁医开启海外求学路", "🌟 全家骄傲的高光时刻"],
            "waIdeas": [
                {"label": "🎓 契约保证每年学费现金流", "detail": "PRUElite Flex 提供写进合同的保证年度现金派发，精准对接临床学年"},
                {"label": "🛡️ 5年学业自动完学保证", "detail": "附带双亲豁免延续保障，确保5年 {dest} 医科学业100%稳妥完成"},
                {"label": "🔄 毕业后无缝转父母退休金", "detail": "孩子毕业行医后，保单每年保证派息直接转为父母终身退休俸禄至100岁"},
            ],
            "waHints": ["考进 {dest} 实在太争气了，衷心祝贺！", "构思了「前5年护航学费+毕业后转父母长俸」一举两得方案", "出发前请您和夫人喝杯咖啡庆祝一下？"],
            "aiaFacts": [
                "写进合同的保证年度现金派发 (PRUElite Flex)，稳健度远胜依赖市场波动的非保证投连险预测。",
                "一单双享：前段精准支持海外求学现金流，孩子毕业独立后自动延续为父母领至100岁的保证退休金。",
                "100% 自动完学延续保证：内建双亲保费豁免机制，全程护航孩子的仁医梦想圆满达成。",
            ],
            "closeHints": ["换汇办签证前喝杯10分钟咖啡看一页现金流表", "发您1页「5年学费+终身长俸」衔接对比表", "周四晚与您和夫人10分钟Zoom详解"],
        },
    },

    "sandwich_gen_parents": {
        "icon": "🫶",
        "rivalBrand": "AIA Malaysia",
        "pambPlan": "PRUAll Care + PRUMillion Med Active 2.0 (Smart Deductible)",
        "aiaPlan": "AIA A-Life Beyond Critical Care + A-Plus Health360",
        "cardThemeColors": ((255, 247, 237), (237, 27, 46), (234, 88, 12)),
        "cardArtPrompt": "Warm three-generation Malaysian family dinner celebration card (16:9 landscape), grandparents, parents and grandchildren smiling in warm lantern glow, zero corporate logos",
        "en": {
            "shortLabel": "Sandwich Gen (Parents + Kids)",
            "lifeEvent": "Hosted 70th anniversary dinner for {parents} while raising 2 school-age kids; feeling two-way financial squeeze.",
            "existingGap": "Supporting {parents}' rising medical bills + kids' schooling • Breadwinners' own CI shield severely underinsured.",
            "customerReply": "\"Such a touching 3-generation card! An AIA friend quoted A-Life Beyond Critical Care + Health360. How does PRU stretch our budget further?\"",
            "cardHeadline": "Blessings of Health & Joy Across All Three Generations! 🫶",
            "cardChips": ["Blessings of Health & Joy Across All Three Generations! 🫶", "Wishing Longevity to Your Parents & Harmony to Your Home! 🌟"],
            "cardHints": ["🏮 Warm 3-generation family dinner glow", "💛 Honoring filial piety & family love", "🌿 Health & longevity blessing for {parents}"],
            "waIdeas": [
                {"label": "💡 Smart Deductible + 15% Saver", "detail": "Cut medical premiums sharply via Smart Deductible + 15% cash no-claim discount to free up monthly budget"},
                {"label": "🛡️ ~190 CI Shield to Age 100", "detail": "Protect the family's core breadwinners across ~190 conditions to Age 100 (PRUAll Care)"},
                {"label": "💵 +20% Recovery Cash Buffer", "detail": "Extra 20% Recovery Care payout keeps both parents' care & kids' tuition running smoothly"},
            ],
            "waHints": ["Warmest wishes to your {parents}—such a blessed family!", "Found a smart way to stretch your monthly ringgit while upgrading your CI shield", "10-min coffee near your neighbourhood this week?"],
            "aiaFacts": [
                "Real Monthly Budget Relief: PRUMillion Med Active 2.0 gives a 15% direct cash discount when claim-free (AIA credits a conditional wallet instead of lowering your bill).",
                "Coverage to Age 100 (~190 Conditions) under PRUAll Care vs. AIA A-Life Beyond Critical Care stopping at Age 80.",
                "+20% Extra Recovery Care Lump Sum keeps household allowances for both {parents} and your kids uninterrupted.",
            ],
            "closeHints": ["10-min Zoom at 8:30pm to optimize your family budget", "1-page 'Same Budget, Stronger 3-Gen Protection' table", "Weekend morning coffee near Cheras/Ampang"],
        },
        "zh-CN": {
            "shortLabel": "三代同堂夹心层护盾",
            "lifeEvent": "刚为年迈双亲（{parents}）庆生，同时抚养2名在读子女，上有老下有小预算紧绷。",
            "existingGap": "既要准备老人医疗备用金又要供孩子读书 • 夫妻自身顶梁柱重疾保障严重不足。",
            "customerReply": "“三代同堂贺卡太暖心了！友邦朋友刚报了 Beyond Critical Care + Health360，你们怎么在有限预算下做得更周全？”",
            "cardHeadline": "祝福三代同堂：父母福寿安康、阖家幸福美满！🫶",
            "cardChips": ["祝福三代同堂：父母福寿安康、阖家幸福美满！🫶", "愿长辈松柏长青，小家岁岁平安！🌟"],
            "cardHints": ["🏮 三代同堂团圆温馨灯光", "💛 孝亲敬老与家庭守护主题", "🌿 祝长辈福寿康宁"],
            "waIdeas": [
                {"label": "💡 自付额巧搭 + 15%现金折扣", "detail": "善用自付额搭配 PRUMillion Med Active 2.0 无理赔15%现金折扣，省下预算补齐重疾"},
                {"label": "🛡️ 顶梁柱 ~190种重疾保至100岁", "detail": "优先守住夫妻经济支柱，PRUAll Care 覆盖约190种重疾直至100岁"},
                {"label": "💵 额外 +20% 康复家庭备用金", "detail": "确诊额外多赔20%现金，确保父母奉养费与孩子补习费不断档"},
            ],
            "waHints": ["祝长辈（{parents}）福如东海、身体硬朗！", "帮夹心层家庭算了一招「不加预算却把顶梁柱重疾翻倍」的巧思", "这周在附近请您喝杯10分钟咖啡？"],
            "aiaFacts": [
                "实打实减轻每月负担：PRUMillion Med Active 2.0 无索赔直接减免 15% 现金保费（友邦仅记入医疗钱包，保费照交）。",
                "保至100岁约190种重疾 (PRUAll Care)，比友邦 80 岁终止足足多守护 20 年长寿风险。",
                "额外 +20% 康复津贴直付现金，确保休养期间长辈奉养与孩子学费稳如泰山。",
            ],
            "closeHints": ["晚8点半用10分钟Zoom帮您做家庭预算最优配比", "发您1页「同预算·更高保障」对比友邦测算表", "周末早茶10分钟轻松聊"],
        },
    },

    "business_exit_windfall": {
        "icon": "🏆",
        "rivalBrand": "AIA Malaysia",
        "pambPlan": "PRUPrestige Legacy + PRUWealth Enrich 2.0",
        "aiaPlan": "AIA A-Life Wealth Prestige / Private Bank Trust",
        "cardThemeColors": ((254, 243, 199), (237, 27, 46), (146, 64, 14)),
        "cardArtPrompt": "Ultra-luxury private family office milestone card (16:9 landscape), golden banyan tree with deep roots, mahogany & brushed gold prestige seal, zero corporate logos",
        "en": {
            "shortLabel": "Business Exit Windfall",
            "lifeEvent": "Completed commercial buyout/sale netting {windfall} liquid windfall; wants multi-generational legacy multiplication.",
            "existingGap": "Sitting on {windfall} cash • Wants Day-1 100% legacy allocation + staggered generational payouts without 1%/yr bank trust fees.",
            "customerReply": "\"Classy card, thank you! Private bank & AIA pitched A-Life Wealth Prestige + a family trust for my {windfall}. How does PRUPrestige Legacy compare?\"",
            "cardHeadline": "Congratulations on Your Landmark {windfall} Milestone! 🏆",
            "cardChips": ["Congratulations on Your Landmark {windfall} Milestone! 🏆", "Celebrating Visionary Harvest & Multi-Generational Legacy! 🌳"],
            "cardHints": ["🌳 Golden banyan tree of generational wealth", "🏆 Private family-office gold & crimson seal", "✨ Celebrating visionary harvest"],
            "waIdeas": [
                {"label": "💎 100% Day-1 HNW Allocation", "detail": "PRUPrestige Legacy allocates 100% of premium from Day 1—preserving immediate liquidity & compounding"},
                {"label": "🏛️ Zero Private Trust Annual Fees", "detail": "Use Built-In Legacy Settlement Option for multi-tranche child/grandchild payouts without 1%/yr bank trust fees"},
                {"label": "🚀 Instant Estate Multiplier", "detail": "Multiply a fraction of {windfall} into an immediate multi-million creditor-protected legacy envelope"},
            ],
            "waHints": ["Congratulations on closing such a landmark {windfall} exit!", "Prepared a 2-min Family Office brief comparing policy settlement vs 1%/yr bank trust fees", "Private coffee at your club this week?"],
            "aiaFacts": [
                "100% Day-1 Premium Allocation (PRUPrestige Legacy) + accelerated Loyalty Bonuses preserve high Day-1 cash value for HNW balance sheets.",
                "Built-In Multi-Tranche Legacy Settlement (RM 0 Setup/Annual Fee) vs. private bank trusts charging RM 15k–30k every year.",
                "FSA Schedule 10 Statutory Creditor Protection + automatic high-cover booster under PRUWealth Enrich 2.0.",
            ],
            "closeHints": ["15-min private briefing at your club or family office", "1-page 20-year Trust Fee Savings & Legacy Multiplier sheet", "10-min Zoom with your tax/legal advisor"],
        },
        "zh-CN": {
            "shortLabel": "资产套现千万家族传承",
            "lifeEvent": "刚完成企业并购/物业出售套现 {windfall} 现金，希望规划跨代财富放大与防败家分期传承。",
            "existingGap": "{windfall} 现金待配置 • 私人银行家族信托每年收取高额管理费，亟需首日100%配置的高杠杆传承工具。",
            "customerReply": "“贺卡非常有格调！私人银行和友邦刚推荐了 AIA A-Life Wealth Prestige 配家族信托，PRUPrestige Legacy 有什么优势？”",
            "cardHeadline": "恭贺华丽收官创富里程碑：福泽绵延、世代荣华！🏆",
            "cardChips": ["恭贺华丽收官创富里程碑：福泽绵延、世代荣华！🏆", "远见卓识结硕果，基业长青传万代！🌳"],
            "cardHints": ["🌳 根深叶茂金色家族生命树", "🏆 家族办公室红金尊尚印鉴", "✨ 祝贺圆满套现开启传承新篇"],
            "waIdeas": [
                {"label": "💎 首日 100% 净资产直投配置", "detail": "PRUPrestige Legacy 首日即享 100% 保费进入运作，兼顾高现金价值与传承杠杆"},
                {"label": "🏛️ 省去每年数万私人信托年费", "detail": "内建分期传承选项可设定分批给付子孙，免除私人银行信托高昂设立费与年费"},
                {"label": "🚀 一笔资金放大数倍免税传承", "detail": "仅拨出 {windfall} 一小部分即可锁定数倍免遗产冻结、隔离债务的家族传承池"},
            ],
            "waHints": ["衷心祝贺圆满完成这笔 {windfall} 里程碑交易！", "整理了2分钟《保单内建分期传承 vs 私人银行收费信托》高管简报", "这周在俱乐部请您喝杯茶私密交流15分钟？"],
            "aiaFacts": [
                "首日 100% 保费高配比运作 (PRUPrestige Legacy) 搭配加速忠诚红利，首日即保留高额资产净值。",
                "内建免费多阶段分期传承给付机制，为您省下私人银行信托每年动辄 RM 1.5万–3万的管理年费。",
                "金融服务法令 Schedule 10 法定债权隔离 + PRUWealth Enrich 2.0 大额保额自动递增。",
            ],
            "closeHints": ["在俱乐部用15分钟私密对照20年信托费节省测算", "发您1页家族传承杠杆对比友邦高管简表", "配合您的税务顾问做10分钟Zoom简报"],
        },
    },
}


def _fill_template(val, fmt_vars: dict[str, str]):
    if isinstance(val, str):
        out = val
        for k, v in fmt_vars.items():
            out = out.replace("{" + k + "}", str(v))
        return out
    if isinstance(val, list):
        return [_fill_template(x, fmt_vars) for x in val]
    if isinstance(val, dict):
        return {k: _fill_template(v, fmt_vars) for k, v in val.items()}
    return val


# Build the 72-seat deterministic roster by interleaving r_idx (0..11) across the 6 curated
# Challenge 3 cases (C3_CURATED_6_ORDER) so every batch of 6 participants gets an exact
# 1-1-1-1-1-1 even split, and 60-72 participants get 100% unique client names!
def _build_curated_72_seat_roster() -> list[dict]:
    seats: list[dict] = []
    max_rounds = max(len(PERSONA_VARIANTS[aid]) for aid in C3_CURATED_6_ORDER)
    for r_idx in range(max_rounds):
        for arch_id in C3_CURATED_6_ORDER:
            variants = PERSONA_VARIANTS[arch_id]
            if r_idx < len(variants):
                seats.append({
                    "seatIndex": len(seats),
                    "archetypeId": arch_id,
                    "variantIndex": r_idx,
                    "persona": variants[r_idx],
                })
    return seats


CURATED_ROSTER_72 = _build_curated_72_seat_roster()  # 6 curated cases x 12 personas = 72 unique seats
SEAT_ROSTER_56 = CURATED_ROSTER_72  # Alias kept for seamless compatibility across c3_pre_pitch.py & tests


def get_total_unique_seats() -> int:
    return len(SEAT_ROSTER_56)


def resolve_seat_scenario(seat_index: int, lang: str = "en") -> dict:
    """Returns a fully localized scenario object for a given seat (0..N-1) across all 5 languages."""
    norm = "yue" if lang == "zh-TW" else (lang or "en")
    seat = SEAT_ROSTER_56[seat_index % len(SEAT_ROSTER_56)]
    arch_id = seat["archetypeId"]
    persona = seat["persona"]
    arch = BASE_ARCHETYPES[arch_id]

    fmt_vars = {k: v for k, v in persona.items() if k not in ("en", "zh")}
    cust_name = persona["zh"] if norm in ("zh-CN", "yue") else persona["en"]

    # Pick localized block (yue adapts zh-CN cleanly with colloquial Cantonese phrasing; ms/ta adapt en cleanly with localized headers & full native AI generation)
    if norm == "zh-CN":
        loc = _fill_template(arch["zh-CN"], fmt_vars)
    elif norm == "yue":
        zh_base = _fill_template(arch["zh-CN"], fmt_vars)
        # Convert Mandarin markers to natural Cantonese for instant UI readability
        yue_swaps = [
            ("刚在", "啱啱喺"), ("刚拿到", "啱啱攞到"), ("刚庆祝", "啱啱慶祝"), ("刚新婚", "啱啱新婚"),
            ("仅有", "淨係得"), ("为您", "為你"), ("您的", "你嘅"), ("你们", "你哋"), ("这周", "呢個禮拜"),
            ("没有", "冇"), ("无需", "唔使"), ("省下", "慳返"), ("对比", "對比"), ("优势", "優勢"),
            ("祝贺卡", "賀卡"), ("电邮", "電郵"), ("方案", "方案"), ("保障", "保障"), ("现金奖", "現金獎"),
            ("医疗", "醫療"), ("重疾", "危疾"), ("岁", "歲"), ("万", "萬"), ("个", "個"), ("两", "兩"),
        ]
        def _to_yue(obj):
            if isinstance(obj, str):
                s = obj
                for a, b in yue_swaps:
                    s = s.replace(a, b)
                return s
            if isinstance(obj, list):
                return [_to_yue(x) for x in obj]
            if isinstance(obj, dict):
                return {k: _to_yue(v) for k, v in obj.items()}
            return obj
        loc = _to_yue(zh_base)
    else:
        loc = _fill_template(arch["en"], fmt_vars)

    first_name = cust_name.split("(")[0].split("&")[0].strip()
    default_wa = (
        f"{cust_name.split('(')[0].strip()} 您好！衷心祝贺您迎来「{loc['shortLabel']}」的重要时刻！🎉 特意为您制作了这张专属祝贺卡。\n\n"
        f"顺带分享一个实用规划巧思：{loc['waIdeas'][0]['detail']}；同时可搭配 {arch['pambPlan']} 补齐现有缺口。等您有空时我发一份 2 分钟简报给您参考好吗？😊"
        if norm in ("zh-CN", "yue")
        else f"Warmest congratulations {first_name} on this wonderful milestone! 🎉 I made this celebratory card specially for you.\n\n"
        f"Quick wealth-planning heads-up: {loc['waIdeas'][0]['detail']}, and we can tailor {arch['pambPlan']} to close your current gap effortlessly. Shall I send a 2-min summary whenever convenient? 😊"
    )
    facts_bullets = "\n".join(f"• {f}" for f in loc["aiaFacts"])
    default_em = (
        f"主题：专属方案客观对比：PRU ({arch['pambPlan'].split('+')[0].strip()}) vs {arch['rivalBrand']}\n\n"
        f"{first_name} 您好：\n非常赞赏您货比三家的严谨态度！针对您的家庭需求，以下是推荐方案相比 {arch['aiaPlan']} 的 3 大客观条款优势：\n{facts_bullets}\n\n"
        f"{loc['closeHints'][0]}，我们一起对照具体利益表！"
        if norm in ("zh-CN", "yue")
        else f"Subject: Factual Side-by-Side Comparison: {arch['pambPlan'].split('+')[0].strip()} vs. {arch['rivalBrand']}\n\n"
        f"Hi {first_name},\nGreat question—comparing clauses side-by-side is the smartest move! Here are 3 factual reasons {arch['pambPlan']} fits your gap better than {arch['aiaPlan']}:\n{facts_bullets}\n\n"
        f"How about a {loc['closeHints'][0]} so you can review both tables comfortably?"
    )

    return {
        "seatIndex": seat["seatIndex"],
        "totalUniqueSeats": len(SEAT_ROSTER_56),
        "id": arch_id,
        "scenarioKey": f"{arch_id}__v{seat['variantIndex']}",
        "icon": arch["icon"],
        "rivalBrand": arch["rivalBrand"],
        "customerName": cust_name,
        "pambPlan": arch["pambPlan"],
        "aiaPlan": arch["aiaPlan"],
        "policyCitation": f"{arch['pambPlan']} vs. {arch['aiaPlan']}",
        "cardThemeColors": arch["cardThemeColors"],
        "cardArtPrompt": _fill_template(arch["cardArtPrompt"], fmt_vars),
        "cardSubline": f"Warmest Wishes to {cust_name.split('(')[0].strip()}",
        "shortLabel": loc["shortLabel"],
        "lifeEvent": loc["lifeEvent"],
        "existingGap": loc["existingGap"],
        "existingPolicy": loc["existingGap"],
        "customerReply": loc["customerReply"],
        "customerObjection": loc["customerReply"].strip('"“”'),
        "cardHeadline": loc["cardHeadline"],
        "cardChips": loc["cardChips"],
        "cardHints": loc["cardHints"],
        "waIdeas": loc["waIdeas"],
        "waHints": loc["waHints"],
        "aiaFacts": loc["aiaFacts"],
        "aiaComparisonFacts": [f"{i+1}. {txt}" for i, txt in enumerate(loc["aiaFacts"])],
        "closeHints": loc["closeHints"],
        "defaultWhatsapp": default_wa,
        "defaultEmail": default_em,
    }


def list_all_archetype_summaries(lang: str = "en") -> list[dict]:
    """Returns 1 representative entry per curated archetype (6 curated cases) for Switch Case picker."""
    out = []
    for slot_idx, aid in enumerate(C3_CURATED_6_ORDER):
        sc = resolve_seat_scenario(slot_idx, lang)
        out.append({
            "seatIndex": sc["seatIndex"],
            "id": aid,
            "icon": sc["icon"],
            "shortLabel": sc["shortLabel"],
            "customerName": sc["customerName"],
            "rivalBrand": sc["rivalBrand"],
        })
    return out


# Native Bahasa Melayu (ms) and Tamil (ta) scenario summaries, pills & hints across curated archetypes
ARCHETYPE_MS_OVERRIDES = {
    "newborn_baby": {
        "shortLabel": "Kelahiran Bayi Baharu",
        "lifeEvent": "Baru menyambut kelahiran bayi pertama ({child}) di hospital swasta; mahu perlindungan kesejahteraan Hari-1 & tabung universiti.",
        "existingGap": "Kad perubatan lama RM 150k sahaja • RM 0 perlindungan kesejahteraan Hari-1 bayi & tabung pendidikan.",
        "customerReply": "\"Terima kasih atas kad ucapan yang cantik! Ejen AIA baru mencadangkan AIA A-Life Joy Xtra + BabyCare. Bagaimana pelan PRU berbanding AIA secara fakta?\"",
        "cardHeadline": "Selamat Datang ke Dunia, Baby {child}! 🌟",
        "cardChips": ["Selamat Datang ke Dunia, Baby {child}! 🌟", "Semoga Baby {child} & Keluarga Sentiasa Sihat & Ceria! 🍼"],
        "cardHints": ["🧸 Patung beruang comel & buaian bayi", "🌟 Masa depan cerah buat Baby {child}", "💐 Jambangan bunga buat ibu bapa baharu"],
        "waIdeas": [
            {"label": "💵 Ganjaran Bayi RM 500", "detail": "Tuntut Ganjaran Tunai Kelahiran RM 500 di bawah PRUWith You Plus"},
            {"label": "🛡️ Perlindungan Awal Bayi Hari-1", "detail": "Mulakan PRUMy Child Plus awal untuk perlindungan kesejahteraan bayi sejak Hari Pertama"},
            {"label": "🏦 Guna Faedah FD Sahaja", "detail": "Biayai pelan bayi & tabung universiti PRUSaver Kid guna faedah FD tanpa usik simpanan pokok"},
        ],
        "waHints": ["Hantar ringkasan 2 minit semasa bayi tidur", "Tumpang gembira melihat keluarga anda bertambah seri!", "Tiada paksaan—baca bila anda berdua sempat berehat"],
        "aiaFacts": [
            "Lonjakan Perlindungan Automatik +50% Percuma: PRUWith You Plus meningkat +1%/thn (sehingga +50%) tanpa yuran tahunan AIA Vitality.",
            "Ganjaran Tunai Kelahiran RM 500 + Perlindungan Kesejahteraan Bayi Hari-1, penjagaan pediatrik & Jaminan Kesinambungan Pembayar (Payor Waiver).",
            "Diskaun Tunai 15% Tiada Tuntutan: PRUMillion Med Active 2.0 memberi diskaun tunai 15% atas kos perubatan (berbanding dompet bersyarat AIA).",
        ],
        "closeHints": ["Zoom 10 minit jam 8:30 malam selepas bayi tidur", "Bandingkan kedua-dua jadual PDF sebelah-menyebelah", "Saya hantarkan jadual 1 halaman di WhatsApp dahulu"],
    },
    "ci_health_scare": {
        "shortLabel": "Ulang Tahun Ke-40 & Medikal Premier",
        "lifeEvent": "Meraikan ulang tahun ke-40 selepas pemeriksaan kesihatan eksekutif A+ di {city}; mahu mengunci kadar Umur 39 bilik suite perubatan RM 8J & pulangan 110%.",
        "existingGap": "Polisi asas lama RM 100k • Sedia menaik taraf ke pelan perubatan suite swasta RM 8J dengan diskaun tunai sihat 15%.",
        "customerReply": "\"Cantik kad hari jadi ke-40 ini! Rakan AIA mencadangkan AIA A-Plus Health360 + Beyond Critical Care sebelum umur 40 saya. Bagaimana PRU berbanding secara fakta?\"",
        "cardHeadline": "Selamat Ulang Tahun Ke-40 — Semoga Sihat Unggul & Dekad Terbaik Menanti! 🥂⚡",
        "cardChips": [
            "Selamat Ulang Tahun Ke-40 — Semoga Sihat Unggul & Dekad Terbaik Menanti! 🥂⚡",
            "Meraikan 40 Tahun Cemerlang — Semoga Terus Bertenaga & Berjaya! 🌟",
        ],
        "cardHints": ["🥂 Sambutan hari jadi ke-40 & matahari terbit {city}", "⚡ Meraikan kesihatan A+ & momentum kerjaya", "🏥 Ketenangan suite hospital premier untuk dekad baharu"],
        "waIdeas": [
            {"label": "🏥 Suite RM 8J + Diskaun Tunai 15%", "detail": "Naik taraf ke PRUMillion Med Active 2.0 (suite hospital swasta RM 8J + diskaun tunai sihat 15% pada kadar Umur 39)"},
            {"label": "⚡ ~190 Kondisi hingga Umur 100", "detail": "Kunci perlindungan kesejahteraan & pemulihan menyeluruh ~190 kondisi sehingga Umur 100 melalui PRUAll Care"},
            {"label": "💰 Pulangan Tunai Matang 110%", "detail": "Padankan PRUMan untuk 260% perlindungan eksekutif + pulangan tunai sehingga 110% jumlah premium semasa matang"},
        ],
        "waHints": ["Selamat Hari Jadi ke-40 awal & tahniah atas rekod kesihatan A+!", "Tip pantas 2 minit kunci kadar Umur 39 + diskaun tunai sihat 15%", "Minum kopi sambutan 10 minit di {city} Jumaat ini?"],
        "aiaFacts": [
            "Diskaun Tunai Sihat 15% Serta-merta (Perlindungan RM 8J): PRUMillion Med Active 2.0 memotong bayaran tunai sebanyak 15% setiap tahun tanpa tuntutan (AIA Health360 hanya mengkreditkan dompet bersyarat).",
            "Perlindungan Sehingga Umur 100 Merangkumi ~190 Kondisi (lwn AIA Umur 80): PRUAll Care melindungi kesejahteraan & pemulihan sehingga Umur 100, 20 tahun lebih lama daripada had AIA.",
            "Pulangan Tunai Premium Matang Sehingga 110%: Padanan PRUMan memberi 260% perlindungan eksekutif + memulangkan sehingga 110% jumlah premium dalam tunai semasa matang.",
        ],
        "closeHints": ["Kopi sambutan 10 minit di {city} sebelum tetingkap Umur 39 ditutup", "Bandingkan diskaun tunai 15% RM 8J & jadual Umur 100 bersebelahan", "Zoom ringkas 10 minit Khamis jam 8 malam"],
    },
    "takaful_hibah_estate": {
        "shortLabel": "Hibah Takaful & Pusaka Perniagaan",
        "lifeEvent": "{biz} mencatat rekod jualan tertinggi; mahu kecairan Hibah patuh Syariah supaya keluarga elak pembekuan pusaka 18 bulan.",
        "existingGap": "Aset perniagaan & hartanah RM 9J terikat nama bersama • Tiada tunai segera Hibah Takaful.",
        "customerReply": "\"Alhamdulillah, terima kasih atas kad ini! AIA Public Takaful mencadangkan A-Life Legasi. Bagaimana PRUBSN WarisanPlus lebih baik untuk Hibah?\"",
        "cardHeadline": "Tahniah & Mabruk atas Pencapaian Cemerlang {biz}! 🌟",
        "cardChips": ["Tahniah & Mabruk atas Pencapaian Cemerlang {biz}! 🌟", "Semoga Terus Diberkati & Harmoni Sekeluarga! 🕌"],
        "cardHints": ["🕌 Motif geometri Islam zamrud & emas", "🌿 Doa keberkatan & keharmonian keluarga", "✨ Meraikan kejayaan {biz}"],
        "waIdeas": [
            {"label": "🕌 Hibah Tanpa Pembekuan", "detail": "Suntik tunai segera patuh Syariah melalui Hibah PRUBSN WarisanPlus di luar pembekuan pusaka"},
            {"label": "📈 Perlindungan Kemalangan 400%", "detail": "Perlindungan sehingga 400% kemalangan termasuk ketika menunaikan Umrah/Haji"},
            {"label": "🛡️ Jaga Keharmonian Faraid", "detail": "Sediakan tunai segera untuk menjelaskan liabiliti tanpa perlu menjual aset {biz}"},
        ],
        "waHints": ["Alhamdulillah, tahniah atas pencapaian hebat {biz}!", "Saya sediakan ringkasan 2 minit strategi kecairan Hibah", "Minum kopi 10 minit minggu depan?"],
        "aiaFacts": [
            "Bayaran Hibah Bersyarat Segera Di Luar Pembekuan Pusaka tanpa perlu membayar yuran keahlian tahunan AIA Vitality.",
            "Perlindungan Kemalangan Sehingga 400% (termasuk semasa Umrah/Haji & pengangkutan awam) terbina dalam sijil.",
            "Pilihan Wakaf & Amal Jariah terbina bersama penamaan Hibah keluarga untuk pahala berpanjangan.",
        ],
        "closeHints": ["Kopi 15 minit bersama pasangan untuk semak struktur Hibah", "Jadual 1 halaman PRUBSN WarisanPlus lwn AIA Legasi", "Zoom ringkas 10 minit Rabu malam"],
    },
}


# Patch resolve_seat_scenario to apply Bahasa Melayu / Tamil cleanly across all 16 archetypes
_orig_resolve_seat = resolve_seat_scenario


def resolve_seat_scenario(seat_index: int, lang: str = "en") -> dict:
    norm = "yue" if lang == "zh-TW" else (lang or "en")
    base = _orig_resolve_seat(seat_index, norm)
    if norm == "ms":
        arch_id = base["id"]
        seat = SEAT_ROSTER_56[seat_index % len(SEAT_ROSTER_56)]
        fmt_vars = {k: v for k, v in seat["persona"].items() if k not in ("en", "zh")}
        if arch_id in ARCHETYPE_MS_OVERRIDES:
            ov = _fill_template(ARCHETYPE_MS_OVERRIDES[arch_id], fmt_vars)
            base.update(ov)
            base["existingPolicy"] = ov["existingGap"]
            base["customerObjection"] = ov["customerReply"].strip('"')
            base["aiaComparisonFacts"] = [f"{i+1}. {x}" for i, x in enumerate(ov["aiaFacts"])]
        else:
            # Translate common English phrases smoothly for BM UI pills
            bm_map = [
                ("Congratulations on", "Tahniah atas"), ("Wishing You", "Semoga Anda"), ("Happy 50th", "Selamat Ulang Tahun ke-50"),
                ("10-min coffee", "Kopi 10 minit"), ("10-min Zoom", "Zoom 10 minit"), ("1-page", "Jadual 1 halaman"),
                ("Cash Reward", "Ganjaran Tunai"), ("Maturity Refund", "Pulangan Matang"), ("Auto Booster", "Lonjakan Automatik"),
            ]
            for fld in ("cardHeadline", "lifeEvent", "existingGap"):
                s = base[fld]
                for a, b in bm_map:
                    s = s.replace(a, b)
                base[fld] = s
    elif norm == "ta":
        ta_prefix_label = {
            "newborn_baby": "புதிய குழந்தை பிறப்பு",
            "ci_health_scare": "40-வது பிறந்தநாள் & மருத்துவ மேம்பாடு",
            "new_home_mortgage": "புதிய RM 1.3M வீட்டுக் கடன்",
            "career_promotion": "உயர் பதவி உயர்வு",
            "sme_expansion": "தொழிற்சாலை RM 6M வங்கி உத்தரவாதம்",
            "uni_retirement_50": "50வது பிறந்தநாள் & பல்கலைக்கழக அனுமதி",
            "takaful_hibah_estate": "தகாஃபுல் Hibah சொத்து பாதுகாப்பு",
            "fd_maturing_wealth": "முதிர்வடைந்த FD முதலீட்டு மாற்று",
            "female_ci_family_scare": "பெண்கள் நலன் & மைல்கல் திட்டம்",
            "newlyweds_joint_life": "புதுமணத் தம்பதியர் திட்டம்",
            "hospital_bill_shock": "RM 8M குடும்ப மருத்துவ மேம்பாடு",
            "cofounder_keyman_buysell": "கூட்டாளிகள் Buy-Sell தொடர்ச்சி",
            "single_parent_guardian": "தனிப் பெற்றோர் குழந்தைகள் பாதுகாப்பு",
            "overseas_med_student": "வெளிநாட்டு மருத்துவப் படிப்பு நிதி",
            "sandwich_gen_parents": "மூன்று தலைமுறை குடும்பப் பாதுகாப்பு",
            "business_exit_windfall": "தொழில் விற்பனை தலைமுறைச் செல்வம்",
        }
        base["shortLabel"] = ta_prefix_label.get(base["id"], base["shortLabel"])
        if base["id"] == "newborn_baby":
            base["waIdeas"][1] = {
                "label": "🛡️ முதல் நாள் குழந்தை நலப் பாதுகாப்பு",
                "detail": "PRUMy Child Plus மூலம் குழந்தையின் முதல் நாள் நலன் மற்றும் வளர்ச்சிப் பாதுகாப்பு",
            }
        elif base["id"] == "ci_health_scare":
            base["cardHeadline"] = "இனிய 40-வது பிறந்தநாள் — சிறந்த ஆரோக்கியம் & பொன்னான தசாப்தத்திற்கு வாழ்த்துகள்! 🥂⚡"
            base["cardChips"] = [
                "இனிய 40-வது பிறந்தநாள் — சிறந்த ஆரோக்கியம் & பொன்னான தசாப்தத்திற்கு வாழ்த்துகள்! 🥂⚡",
                "40 ஆண்டு சாதனை & துடிப்பான ஆரோக்கியத்திற்கு நல்வாழ்த்துகள்! 🌟",
            ]
    return base
