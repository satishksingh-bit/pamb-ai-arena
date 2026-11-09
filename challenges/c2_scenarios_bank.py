"""Challenge 2 Scenario Bank: 56 Unique HNW Malaysian Executive Pre-Pitch Cases (14 Archetypes × 4 Personas).

Every participant in a 50–54 leader room receives a distinct HNW client case while being evaluated
on the exact same core skill: structuring a 5-Pillar R.C.T.F.C. prompt + personal strategic angle
to generate a boardroom-grade 3-Slide Pre-Pitch Deck (Slide 1 Snapshot & KPIs, Slide 2 Liquidity Gap Chart,
Slide 3 Tailored Strategy Matrix & Co-Advisory Close).
"""

from __future__ import annotations

import copy

C2_ARCHETYPE_ORDER = [
    "clinic_founder_takaful",
    "penang_semicon_keyman",
    "johor_logistics_succession",
    "kl_surgeon_practice",
    "tech_exit_family_office",
    "east_my_plantation_probate",
    "halal_fnb_cofounders",
    "ipoh_pharma_matriarch",
    "boutique_law_partner",
    "heritage_hotel_gearing",
    "intl_school_founder",
    "auto_dealership_group",
    "glc_cfo_golden_bridge",
    "d2c_couple_founders",
]

C2_PERSONA_VARIANTS: dict[str, list[dict[str, str]]] = {
    "clinic_founder_takaful": [
        {"en": "Datin Sharifah Aleya (52, Klang Valley)", "zh": "Datin Sharifah Aleya（52岁，巴生谷）", "biz": "Aleya Specialist Clinics (6 clinics)", "loc": "Bangsar"},
        {"en": "Dato' Dr. Nik Mahmood (54, Shah Alam)", "zh": "Dato' Dr. Nik Mahmood（54岁，莎阿南）", "biz": "Nik Eye & Laser Centres (5 centres)", "loc": "Shah Alam"},
        {"en": "Puan Sri Dr. Huda Zainal (51, Putrajaya)", "zh": "Puan Sri Dr. Huda Zainal（51岁，布城）", "biz": "Zainal Women & Child Specialist Group", "loc": "Damansara"},
        {"en": "Datin Paduka Dr. Soraya (55, Subang)", "zh": "Datin Paduka Dr. Soraya（55岁，梳邦）", "biz": "Soraya Dental & Aesthetic Group (7 branches)", "loc": "Subang Jaya"},
    ],
    "penang_semicon_keyman": [
        {"en": "Dato' Sri Raymond Khor (53, Penang)", "zh": "拿督斯里许总 Raymond Khor（53岁，槟城）", "biz": "KhorTech Precision Automation Sdn Bhd", "loc": "Bayan Lepas"},
        {"en": "Dato' Lawrence Yeoh (56, Batu Kawan)", "zh": "拿督杨总 Lawrence Yeoh（56岁，峇都交湾）", "biz": "Yeoh Micro-Optics Engineering Sdn Bhd", "loc": "Batu Kawan"},
        {"en": "Ir. Kenneth Ooi (50, Bukit Mertajam)", "zh": "黄总工程师 Kenneth Ooi（50岁，大山脚）", "biz": "Ooi Semicon Tooling Group", "loc": "Georgetown"},
        {"en": "Dato' Victor Chuah (54, Perai)", "zh": "拿督蔡总 Victor Chuah（54岁，北赖）", "biz": "Chuah Cleanroom Robotics Sdn Bhd", "loc": "Gurney Drive"},
    ],
    "johor_logistics_succession": [
        {"en": "Dato' Ong Boon Huat (58, Johor Bahru)", "zh": "拿督王文发 Dato' Ong（58岁，新山）", "biz": "Southern Cross-Border Haulage (180 trucks)", "loc": "Iskandar Puteri"},
        {"en": "Dato' Chua Kian Seng (59, Pasir Gudang)", "zh": "拿督蔡建生 Dato' Chua（59岁，巴西古当）", "biz": "Kian Seng Cold-Chain Port Logistics", "loc": "Tebrau"},
        {"en": "Mr. Teo Kah Meng (57, Senai)", "zh": "张家明董事长 Teo Kah Meng（57岁，士乃）", "biz": "Senai Regional Bonded Warehousing", "loc": "Senai"},
        {"en": "Dato' Koh Swee Heng (60, Batu Pahat)", "zh": "拿督许瑞兴 Dato' Koh（60岁，峇株巴辖）", "biz": "Swee Heng Container & Freight Group", "loc": "Johor Bahru"},
    ],
    "kl_surgeon_practice": [
        {"en": "Dato' Dr. Anand Krishnan (49, Bukit Tunku)", "zh": "Dato' Dr. Anand Krishnan（49岁，吉隆坡）", "biz": "KL Heart & Vascular Private Practice", "loc": "Mont Kiara"},
        {"en": "Dr. Gerard Sta Maria (51, Bangsar)", "zh": "Dr. Gerard Sta Maria（51岁，孟沙）", "biz": "Bangsar Spine & Orthopaedic Suite", "loc": "Bangsar"},
        {"en": "Prof. Dr. Suresh Nair (52, PJ)", "zh": "Prof. Dr. Suresh Nair（52岁，八打灵再也）", "biz": "Nair Neuro & Minimally Invasive Centre", "loc": "Petaling Jaya"},
        {"en": "Dr. Evelyn Cheah (48, Desa ParkCity)", "zh": "谢医生 Dr. Evelyn Cheah（48岁，甲洞）", "biz": "ParkCity Oncology & Diagnostic Practice", "loc": "Desa ParkCity"},
    ],
    "tech_exit_family_office": [
        {"en": "brendan Lim & Cheryl Tan (43, KLCC)", "zh": "林哲宇与陈欣怡（43岁，吉隆坡双峰塔）", "biz": "Post-Series-C Retail SaaS Buyout", "loc": "KLCC"},
        {"en": "Adrian Yap (41, Mont Kiara)", "zh": "叶俊杰 Adrian Yap（41岁，满家乐）", "biz": "ASEAN FinTech Payment Gateway Exit", "loc": "Mont Kiara"},
        {"en": "karthik Subramaniam (44, Cyberjaya)", "zh": "Karthik Subramaniam（44岁，赛城）", "biz": "Cloud Cybersecurity Firm Acquisition", "loc": "Bangsar South"},
        {"en": "melissa Wong (42, Damansara Heights)", "zh": "黄美玲 Melissa Wong（42岁，白沙罗高原）", "biz": "E-Logistics Platform Strategic Sale", "loc": "Damansara Heights"},
    ],
    "east_my_plantation_probate": [
        {"en": "Temenggong Dato' Philip Ting (59, Sibu)", "zh": "拿督陈总 Dato' Philip Ting（59岁，诗巫）", "biz": "Ting Borneo Agro & Timber Holdings", "loc": "Kuching"},
        {"en": "Datuk Wong Kwok Wah (57, Kota Kinabalu)", "zh": "拿督黄国华 Datuk Wong（57岁，亚庇）", "biz": "Sabah Eco-Resort & Palm Estates", "loc": "Kota Kinabalu"},
        {"en": "Dato' Henry Lau (60, Miri)", "zh": "拿督刘总 Dato' Henry Lau（60岁，美里）", "biz": "Miri Marine & Plantation Group", "loc": "Miri"},
        {"en": "Datuk Seri Panglima Chin (58, Sandakan)", "zh": "拿督斯里陈总 Datuk Seri Chin（58岁，山打根）", "biz": "East Coast Cocoa & Oil Palm Group", "loc": "Sandakan"},
    ],
    "halal_fnb_cofounders": [
        {"en": "Tuan Haji Faizal & Ustaz Ridzuan (47, Bangi)", "zh": "Tuan Haji Faizal 与合伙人（47岁，万宜）", "biz": "Warisan Rasa Halal Restaurant Chain (22 outlets)", "loc": "Putrajaya"},
        {"en": "Encik Hafiz & Encik Azlan (45, TTDI)", "zh": "Encik Hafiz 与 Azlan（45岁，敦依斯迈花园）", "biz": "Kopi Nusantara Roastery & Franchises (30 stores)", "loc": "TTDI KL"},
        {"en": "Puan Nadia & Puan Farah (44, Ampang)", "zh": "Puan Nadia 与 Farah（44岁，安邦）", "biz": "Seri Modest Fashion & Halal Pastry Group", "loc": "KLCC"},
        {"en": "Dato' Kamarul & Encik Imran (50, Klang)", "zh": "Dato' Kamarul 与 Imran（50岁，巴生）", "biz": "Barakah Frozen Halal Export Foods Sdn Bhd", "loc": "Shah Alam"},
    ],
    "ipoh_pharma_matriarch": [
        {"en": "Datin Seri Madam Foo (58, Ipoh)", "zh": "拿汀斯里胡太 Madam Foo（58岁，怡保）", "biz": "Perak Herbal & GMP Nutraceutical Industries", "loc": "Ipoh"},
        {"en": "Madam Cheong Siew Lan (60, Taiping)", "zh": "张秀兰董事长 Madam Cheong（60岁，太平）", "biz": "Cheong Medical Supplies & OEM Factory", "loc": "Ipoh"},
        {"en": "Datin Lee Mei Fong (57, Seremban)", "zh": "拿汀李美芳 Datin Lee（57岁，芙蓉）", "biz": "Negeri GMP Healthcare Packaging Group", "loc": "Seremban"},
        {"en": "Madam Tan Geok Bee (59, Klang)", "zh": "陈玉美女士 Madam Tan（59岁，巴生）", "biz": "Port Klang Biotech & Wellness Manufacturing", "loc": "Klang"},
    ],
    "boutique_law_partner": [
        {"en": "Dato' Ranjit Singh (54, Kenny Hills)", "zh": "Dato' Ranjit Singh 大律师（54岁，吉隆坡）", "biz": "Ranjit & Partners Corporate Law Chambers", "loc": "KL Sentral"},
        {"en": "Ar. Julian Chee (53, Bangsar)", "zh": "朱建筑师 Ar. Julian Chee（53岁，孟沙）", "biz": "Chee & Associates Urban Architecture Practice", "loc": "Bangsar"},
        {"en": "Mr. Christopher Yong (55, Damansara)", "zh": "杨资深合伙人 Christopher Yong（55岁，白沙罗）", "biz": "Yong Tax & Forensic Advisory Partnership", "loc": "Damansara"},
        {"en": "Datin Valerie Teh (52, Penang)", "zh": "拿汀郑大律师 Valerie Teh（52岁，槟城）", "biz": "Teh Commercial Dispute & Conveyancing Firm", "loc": "Georgetown"},
    ],
    "heritage_hotel_gearing": [
        {"en": "Dato' Khoo Boo Teik (55, Georgetown)", "zh": "拿督邱武德 Dato' Khoo（55岁，乔治市）", "biz": "Straits Heritage Boutique Hotels (4 properties)", "loc": "Georgetown"},
        {"en": "Datuk Gan Kim Huat (56, Melaka)", "zh": "拿督颜金发 Datuk Gan（56岁，马六甲）", "biz": "Jonker Peranakan Luxury Suites & Retail", "loc": "Melaka"},
        {"en": "Dato' Lim Cheng Hoe (54, Ipoh)", "zh": "拿督林清河 Dato' Lim（54岁，怡保）", "biz": "Limestone Valley Eco-Villas & Commercial", "loc": "Ipoh"},
        {"en": "Datuk Seri Yap (57, Kuantan)", "zh": "拿督斯里叶总 Datuk Seri Yap（57岁，关丹）", "biz": "East Coast Beachfront Resort Development", "loc": "Kuantan"},
    ],
    "intl_school_founder": [
        {"en": "Datin Paduka Evelyn Khor (53, Setia Alam)", "zh": "拿汀伊芙琳 Evelyn Khor（53岁，实达阿南）", "biz": "Oakridge International Academy (1,400 students)", "loc": "Setia Alam"},
        {"en": "Dato' Dr. Samuel Ling (56, Cheras)", "zh": "拿督林博士 Dato' Dr. Ling（56岁，蕉赖）", "biz": " Beacon Private K-12 & Montessori Group", "loc": "Cheras"},
        {"en": "Puan Sri Rohani (55, Cyberjaya)", "zh": "Puan Sri Rohani（55岁，赛城）", "biz": "Cemerlang STEM International Campus", "loc": "Cyberjaya"},
        {"en": "Mr. Rajendran (54, Subang)", "zh": "Rajendran 校长（54岁，梳邦）", "biz": "Regent A-Levels & Private College Group", "loc": "Subang Jaya"},
    ],
    "auto_dealership_group": [
        {"en": "Datuk Seri Clement Tan (52, Glenmarie)", "zh": "拿督斯里陈总 Clement Tan（52岁，格林玛丽）", "biz": "Glenmarie Luxury EV & 4S Dealership Group", "loc": "Glenmarie"},
        {"en": "Dato' Billy Ng (54, Puchong)", "zh": "拿督黄总 Billy Ng（54岁，蒲种）", "biz": "Southern 4S Passenger & Commercial Auto Group", "loc": "Puchong"},
        {"en": "Datuk Azman Shah (53, Sungai Besi)", "zh": "Datuk Azman Shah（53岁，新街场）", "biz": " continental AP & 4S Flagship Showrooms", "loc": "Kuala Lumpur"},
        {"en": "Dato' Steven Phua (55, Johor Bahru)", "zh": "拿督潘总 Steven Phua（55岁，新山）", "biz": "Tebrau Multi-Brand Auto & Fleet Group", "loc": "Johor Bahru"},
    ],
    "glc_cfo_golden_bridge": [
        {"en": "Encik Wan Zulhilmi (53, Group CFO, KL)", "zh": "Wan Zulhilmi（53岁，上市集团首席财务官）", "biz": "Bursa-Listed Infrastructure Group CFO", "loc": "KLCC"},
        {"en": "Ms. Pauline Chok (52, Regional Bank MD)", "zh": "卓保琳 Pauline Chok（52岁，银行董事总经理）", "biz": "Regional Corporate Banking Managing Director", "loc": "TRX Kuala Lumpur"},
        {"en": "Mr. Devandran Pillai (54, Energy EVP)", "zh": "Devandran Pillai（54岁，能源集团执行副总裁）", "biz": "National Energy Transition EVP", "loc": "Bangsar"},
        {"en": "Dato' Simon Foo (53, Telco COO)", "zh": "拿督符总 Simon Foo（53岁，电讯集团首席运营官）", "biz": "Listed Telecom & Data-Centre COO", "loc": "Petaling Jaya"},
    ],
    "d2c_couple_founders": [
        {"en": "Jason Lee & Vivienne Chua (38, Bangsar)", "zh": "李杰森与蔡薇薇（38岁，孟沙）", "biz": "GlowLab Malaysia D2C Skincare (RM 45M rev)", "loc": "Bangsar"},
        {"en": "Syafiq & Hanna Zulkifli (36, Shah Alam)", "zh": "Syafiq 与 Hanna（36岁，莎阿南）", "biz": "Alya Wellness & Halal Cosmetics E-Commerce", "loc": "Shah Alam"},
        {"en": "ryan Goh & Mandy Lim (39, Penang)", "zh": "吴瑞安与林曼迪（39岁，槟城）", "biz": "Artisan Home & Lifestyle Regional Brand", "loc": "Georgetown"},
        {"en": "Kelvin Tan & Joanne Yap (37, Sunway)", "zh": "陈凯文与叶乔安（37岁，双威）", "biz": "FitFuel Active Nutrition Omnichannel Brand", "loc": "Sunway"},
    ],
}

# Capitalize clean English names
for _aid, _plist in C2_PERSONA_VARIANTS.items():
    for _p in _plist:
        _p["en"] = _p["en"][0].upper() + _p["en"][1:]
        _p["biz"] = _p["biz"].strip()

C2_ARCHETYPES: dict[str, dict] = {
    "clinic_founder_takaful": {
        "icon": "🏥",
        "en_label": "Clinic Group Founder (Hibah Gap)",
        "zh_label": "专科诊所集团创办人 (Hibah流动性)",
        "ms_label": "Pengasas Kumpulan Klinik (Jurang Hibah)",
        "ta_label": "சிறப்பு கிளினிக் நிறுவனர் (Hibah நிதி)",
        "nw": "RM 28M",
        "illiquid": "RM 19M (68%) clinic shares + RM 6M property",
        "liquid_only": "RM 3.0M cash/FD/ASB",
        "loan": "RM 4.5M expansion loan (personal guarantee)",
        "old_cover": "RM 1.0M old life policy (2009)",
        "family": "Retired spouse (RM 30k/mo dividends) + 2 kids studying UK Medicine & Melbourne Engineering (RM 450k/yr)",
        "need_m": 10.5,
        "have_m": 4.0,
        "gap_m": 6.5,
        "need_breakdown": "RM 4.5M loan guarantee + RM 1.0M estate costs + RM 3.6M spouse income + RM 1.4M uni completion",
        "shariah": True,
        "solution_rows": [
            ["Immediate Estate Liquidity", "PRUBSN WarisanPlus (Hibah Nomination)", "Provides dedicated tax-free liquidity for smooth estate continuity", "RM 5.0M"],
            ["Clinic Loan Ring-Fencing", "Credit-Related Family Takaful", "Settles RM 4.5M personal guarantee while keeping 100% clinic ownership intact", "RM 4.5M"],
            ["Clinic Continuity", "Key-Person Takaful + Buy-Sell", "Protects monthly RM 30k family dividend stream", "To be sized"],
        ],
        "angle_hints_en": [
            "Co-review 30 mins with company secretary & tax accountant—zero product push",
            "Keep 100% of {biz} specialist clinics family-owned so UK & Melbourne degrees finish uninterrupted",
            "Compare ~2% p.a. Hibah allocation vs preserving 100% specialist clinic equity & overseas university readiness",
        ],
        "angle_hints_zh": [
            "提议与公司秘书及税务会计师进行30分钟三方协同审视，零推销压力",
            "守护 {biz} 100%家族股权完整延续，确保英国与墨尔本子女学业全程无忧",
            "对比每年约2% Hibah 资金配置成本与守护100%专科诊所估值及留学储备",
        ],
        "nums": ["28", "19", "4.5", "10.5", "4", "6.5", "1"],
    },
    "penang_semicon_keyman": {
        "icon": "🏭",
        "en_label": "Semicon Founder (Capex & Legacy)",
        "zh_label": "半导体精密制造创办人 (扩厂与传承)",
        "ms_label": "Pengasas Semikonduktor (Pinjaman & Legasi)",
        "ta_label": "செமிகண்டக்டர் தொழிற்சாலை நிறுவனர்",
        "nw": "RM 42M",
        "illiquid": "RM 31M (74%) factory equity + RM 7M industrial land",
        "liquid_only": "RM 4.0M cash/FD",
        "loan": "RM 8.0M cleanroom capex bank guarantee",
        "old_cover": "RM 1.5M legacy term policy",
        "family": "Homemaker spouse + 1 daughter running operations & 2 sons working abroad (non-joining)",
        "need_m": 15.0,
        "have_m": 5.5,
        "gap_m": 9.5,
        "need_breakdown": "RM 8.0M bank guarantee + RM 5.0M cash equalisation for 2 overseas sons + RM 2.0M spouse reserve",
        "shariah": False,
        "solution_rows": [
            ["Capex Guarantee Shield", "PRUWealth Enrich 2.0 (FSA Sched 10 Trust)", "Creditor-protected payout + up to +50% auto cover booster", "RM 8.0M"],
            ["Fair Child Equalisation", "PRUPrestige Legacy (100% Day-1 Alloc)", "Gives cash to 2 overseas sons while daughter keeps 100% factory", "RM 5.0M"],
            ["Founder Continuity Reserve", "PRUAll Care (~190 Conditions to Age 100)", "Strengthens founder continuity & working-capital confidence", "RM 2.0M"],
        ],
        "angle_hints_en": [
            "Equalise inheritance cleanly: 100% factory shares to successor daughter, tax-free policy cash to 2 sons",
            "Joint 30-min briefing at {loc} with corporate CFO & company auditor",
            "Ring-fence the RM 8M personal bank guarantee under FSA Schedule 10 statutory trust",
        ],
        "angle_hints_zh": [
            "实现儿女公平传承：接班女儿100%掌握 {biz} 控股权，海外两子获免税保单现金",
            "约在 {loc} 与集团 CFO 及审计师做30分钟高管联合测算",
            "运用金融服务法令 Schedule 10 法定信托彻底隔离 RM 8M 银行个人连带担保",
        ],
        "nums": ["42", "31", "8", "15", "5.5", "9.5"],
    },
    "johor_logistics_succession": {
        "icon": "🚛",
        "en_label": "Logistics Patriarch (Sibling Harmony)",
        "zh_label": "跨境物流家族掌舵人 (股权与和谐)",
        "ms_label": "Pengasas Logistik (Kesinambungan Waris)",
        "ta_label": "லாஜிஸ்டிக்ஸ் குழும நிறுவனர்",
        "nw": "RM 35M",
        "illiquid": "RM 24M fleet/depots (69%) + RM 7.5M commercial shoplots",
        "liquid_only": "RM 3.5M FD/cash",
        "loan": "RM 6.0M fleet hire-purchase & port facility guarantee",
        "old_cover": "RM 1.0M whole life policy",
        "family": "Spouse (56) + 2 sons active in fleet ops + 1 daughter (doctor in SG, not in business)",
        "need_m": 12.0,
        "have_m": 4.5,
        "gap_m": 7.5,
        "need_breakdown": "RM 6.0M fleet debt guarantee + RM 4.0M daughter fair-share equalisation + RM 2.0M spouse retirement",
        "shariah": False,
        "solution_rows": [
            ["Fleet Facility Continuity", "PRUWealth Enrich 2.0 Keyman/Guarantee", "Assures uninterrupted fleet credit-line continuity across transitions", "RM 6.0M"],
            ["Sibling Harmony Legacy", "PRUPrestige Legacy Multi-Tranche Option", "Pays SG doctor daughter in cash so 2 sons lead {biz} in full harmony", "RM 4.0M"],
            ["Matriarch Lifetime Buffer", "PRUElite Flex Guaranteed Income", "Secures independent lifetime cashflow for spouse to Age 100", "RM 2.0M"],
        ],
        "angle_hints_en": [
            "Ensure fair sibling equity harmony—keep 100% voting shares with the 2 operating sons while funding an equal cash gift for your daughter",
            "Structured multi-tranche legacy settlement with RM 0 annual private-bank trust fees",
            "30-min family constitution pre-briefing with family lawyer in {loc}",
        ],
        "angle_hints_zh": [
            "护航兄妹公平传承与股权和谐：让在公司打拼的两个儿子稳握 {biz} 经营权，新加坡当医生的女儿获等值现金",
            "利用保单内建免费分期传承功能，省去私人银行信托每年数万管理费",
            "在 {loc} 协同家族律师进行30分钟家族宪章与流动性审视",
        ],
        "nums": ["35", "24", "6", "12", "4.5", "7.5"],
    },
    "kl_surgeon_practice": {
        "icon": "🩺",
        "en_label": "Senior Specialist Surgeon (Income & Debt)",
        "zh_label": "资深专科外科名医 (高收入与设备债)",
        "ms_label": "Pakar Bedah Kanan (Pendapatan & Klinik)",
        "ta_label": "மூத்த சிறப்பு அறுவை சிகிச்சை நிபுணர்",
        "nw": "RM 18M",
        "illiquid": "RM 9.5M medical suite equity + RM 5.5M Bangsar home",
        "liquid_only": "RM 3.0M cash/unit trusts",
        "loan": "RM 3.8M surgical suite & mortgage liability",
        "old_cover": "RM 700k old CI/life cover from junior doctor days",
        "family": "Spouse + 2 teenagers bound for UK medical schools (RM 650k/yr upcoming tuition)",
        "need_m": 9.5,
        "have_m": 3.7,
        "gap_m": 5.8,
        "need_breakdown": "RM 3.8M suite/home debt + RM 3.2M UK medical tuition reserve + RM 2.5M Specialist Practice & Sabbatical Continuity Reserve",
        "shariah": False,
        "solution_rows": [
            ["Specialist Practice & Sabbatical Continuity Reserve", "PRUAll Care (~190 Conditions + Recovery)", "Provides dedicated income liquidity to sustain practice & family lifestyle", "RM 3.0M"],
            ["Debt & Family Protection", "PRUWith You Plus (+50% Auto Booster)", "Clears RM 3.8M suite & home loans while keeping investments compounding", "RM 4.0M"],
            ["UK Medical Tuition Lock", "PRUElite Flex Guaranteed Annual Cash", "Contractually guaranteed tuition cashflow + parent waiver shield", "RM 2.5M"],
        ],
        "angle_hints_en": [
            "Build a 'Specialist Practice & Sabbatical Continuity Reserve' so your clinical excellence is backed by passive balance-sheet strength",
            "Guarantee both teenagers complete UK medical school on schedule with contractually ring-fenced tuition funding",
            "Concise 20-min lunch review between clinic list hours at {loc}",
        ],
        "angle_hints_zh": [
            "建立专属「专科名医执业延续与英伦教育储备」，让精湛医术与稳健家庭现金流双轨并行",
            "叠加教育护盾，契约化锁定两名子女100%顺利完成英国医科学业",
            "配合医生门诊间隙，在 {loc} 诊所做20分钟精炼午餐简报",
        ],
        "nums": ["18", "9.5", "3.8", "3.7", "5.8"],
    },
    "tech_exit_family_office": {
        "icon": "🚀",
        "en_label": "Tech Post-Exit Founder (Legacy Multiplier)",
        "zh_label": "科技企业套现创始人 (家族办公室传承)",
        "ms_label": "Pengasas Teknologi Selepas Exit (Legasi)",
        "ta_label": "டெக் நிறுவன விற்பனை நிறுவனர்",
        "nw": "RM 24M",
        "illiquid": "RM 11M real estate & angel stakes (illiquid)",
        "liquid_only": "RM 13M post-exit cash sitting in low-yield FD",
        "loan": "RM 3.5M luxury residence mortgage + angel co-investment pledges",
        "old_cover": "RM 500k startup-era personal life policy",
        "family": "Young spouse + 2 young children (ages 4 & 7); wants creditor-ringfenced multi-tranche legacy",
        "need_m": 18.0,
        "have_m": 13.5,
        "gap_m": 4.5,
        "need_breakdown": "RM 18M target creditor-shielded generational estate + angel liability buffer vs RM 13.5M exposed cash/cover",
        "shariah": False,
        "solution_rows": [
            ["Day-1 Wealth Multiplier", "PRUPrestige Legacy (100% Day-1 Alloc)", "Turns RM 2M cash into multi-million creditor-shielded estate", "RM 8.0M"],
            ["High-Allocation Compounding", "PRUElite Invest (103% Day-1 Allocation)", "+3% instant Day-1 capital boost vs idle taxable FD drag", "RM 3.0M"],
            ["Multi-Tranche Child Guard", "Built-In Legacy Settlement (RM 0 Fee)", "Staggers payouts at ages 25/30/35 without 1%/yr bank trust fees", "Included"],
        ],
        "angle_hints_en": [
            "Keep RM 11M liquid for new ventures while deploying just RM 2M to lock in an RM 8M creditor-proof family floor",
            "Save RM 20k+/yr vs private-bank family trust setup & annual maintenance fees",
            "30-min whiteboard session with your tax advisor at {loc}",
        ],
        "angle_hints_zh": [
            "保留大部分现金继续做天使投资，仅拨小部分锁定债权隔离的家族安全底盘",
            "善用内建免费分期给付（设定25/30/35岁分批领），省下私人银行每年数万信托费",
            "在 {loc} 与您的税务顾问做30分钟家族办公室架构推演",
        ],
        "nums": ["24", "13", "3.5", "18", "13.5", "4.5"],
    },
    "east_my_plantation_probate": {
        "icon": "🌴",
        "en_label": "Plantation & Hotel Datuk (Multi-State Estate Liquidity)",
        "zh_label": "东马种植与酒店集团拿督 (跨州传承流动性)",
        "ms_label": "Pengarah Perladangan & Hotel (Kecairan Pusaka Pelbagai Negeri)",
        "ta_label": "தோட்ட & ஹோட்டல் குழும இயக்குநர்",
        "nw": "RM 50M",
        "illiquid": "RM 44M (88%) land titles & hotels across Sarawak/Sabah",
        "liquid_only": "RM 6.0M cash across joint accounts",
        "loan": "RM 9.0M working-capital & hotel refurbishment guarantee",
        "old_cover": "RM 1.0M old policy",
        "family": "Spouse + 4 adult children across KL, Kuching & Melbourne; multi-title estate administration spans 18–36 months",
        "need_m": 16.0,
        "have_m": 7.0,
        "gap_m": 9.0,
        "need_breakdown": "RM 9.0M bank facility + RM 4.0M 24-month resort operations & estate liquidity + RM 3.0M spouse reserve",
        "shariah": False,
        "solution_rows": [
            ["Multi-State Estate Liquidity", "PRUWealth Enrich 2.0 (Sched 10 Trust)", "Injects RM 9M rapid liquidity in weeks while land titles stay 100% intact", "RM 9.0M"],
            ["4-Child Estate Harmony", "PRUPrestige Legacy Equalisation Pool", "Keeps prime plantation & resort land undivided across generations", "RM 5.0M"],
            ["Senior Medical Shield", "PRUMillion Med Booster 2.0 (RM 8M Limit)", "Covers international/private tertiary care with Smart Deductible", "RM 8M Med"],
        ],
        "angle_hints_en": [
            "88% land-rich portfolio—provide dedicated Multi-State Estate Liquidity for uninterrupted resort operations & team continuity",
            "Keep ancestral Borneo land titles 100% undivided across all 4 children",
            "Co-advisory review with group company secretary & estate solicitor in {loc}",
        ],
        "angle_hints_zh": [
            "88%资产为跨州土地与度假酒店，提前配置专项传承流动性，护航酒店运营与团队稳健延续",
            "确保家族珍贵地契100%完整不分割，同时让4名子女公平传承",
            "在 {loc} 协同集团公司秘书与遗产律师进行30分钟盘点",
        ],
        "nums": ["50", "44", "9", "16", "7", "88"],
    },
    "halal_fnb_cofounders": {
        "icon": "🕌",
        "en_label": "Halal F&B Co-Founders (50/50 Faraid Buy-Sell)",
        "zh_label": "清真餐饮连锁联合创办人 (50/50股权与Hibah)",
        "ms_label": "Pengasas Bersama F&B Halal (Buy-Sell & Hibah)",
        "ta_label": "ஹலால் உணவுச் சங்கிலி இணை நிறுவனர்கள்",
        "nw": "RM 22M",
        "illiquid": "RM 16M (73%) 50/50 unlisted F&B group shares + central kitchen",
        "liquid_only": "RM 2.5M personal cash + RM 3.5M property",
        "loan": "RM 4.0M central kitchen Islamic Sukuk/financing guarantee",
        "old_cover": "RM 500k personal Takaful",
        "family": "Both co-founders married with 3 school-going kids each; opportunity to establish a funded Shariah Buy-Sell deed",
        "need_m": 11.0,
        "have_m": 3.0,
        "gap_m": 8.0,
        "need_breakdown": "RM 6.0M funded 50% share buyout for partner's family + RM 4.0M kitchen financing + RM 1.0M family buffer",
        "shariah": True,
        "solution_rows": [
            ["Funded Shariah Buy-Sell", "PRUBSN WarisanPlus Cross-Hibah Structure", "Equips co-founder with dedicated cash to acquire partner's family 50% shares fairly", "RM 6.0M"],
            ["Central Kitchen Debt Shield", "Credit-Related Corporate Takaful", "Clears RM 4.0M Islamic facility while preserving outlet working capital", "RM 4.0M"],
            ["Co-Founder Continuity Reserve", "Crisis Total Care Takaful Rider", "Provides dedicated liquidity for smooth leadership & operational continuity", "RM 1.5M"],
        ],
        "angle_hints_en": [
            "Establish a funded Shariah Buy-Sell so {biz} enjoys smooth boardroom transition while honoring Faraid harmony",
            "Win-win dignity: partner's family receives immediate RM 6M cash while continuing co-founder keeps 100% operational stewardship",
            "30-min joint session with both co-founders & Shariah corporate secretary at {loc}",
        ],
        "angle_hints_zh": [
            "设立专项资金池支撑的 Shariah Buy-Sell 协议，确保 {biz} 董事会平稳交接并兼顾 Faraid 传承和谐",
            "双赢守护：合伙人家属即刻获得 RM 6M 免税现金保障，留任合伙人稳握100%经营主导权",
            "在 {loc} 邀请两位创办人及公司秘书进行30分钟三方联合规划",
        ],
        "nums": ["22", "16", "4", "11", "3", "8", "50"],
    },
    "ipoh_pharma_matriarch": {
        "icon": "🌿",
        "en_label": "GMP Pharma Matriarch (3-Gen Trust Pool)",
        "zh_label": "制药集团女掌门 (三代同堂传承与医疗)",
        "ms_label": "Pengasas Kilang Farmasi (Amanah 3 Generasi)",
        "ta_label": "மருந்துத் தொழிற்சாலை நிறுவனர்",
        "nw": "RM 30M",
        "illiquid": "RM 21M (70%) GMP plant shares + RM 5M commercial lots",
        "liquid_only": "RM 4.0M FD/cash",
        "loan": "RM 3.5M automated GMP line loan + RM 2.5M elderly spouse care reserve",
        "old_cover": "RM 800k matured/old endowment",
        "family": "Spouse (64, retired) + 2 children + 3 grandchildren; wants direct grandchild education payouts",
        "need_m": 10.8,
        "have_m": 4.8,
        "gap_m": 6.0,
        "need_breakdown": "RM 3.5M GMP plant loan + RM 3.3M spouse medical/care reserve + RM 4.0M 3-grandchild education legacy",
        "shariah": False,
        "solution_rows": [
            ["Plant & Spouse Liquidity", "PRUPrestige Legacy (100% Day-1 Alloc)", "Bypasses probate to clear RM 3.5M GMP loan & fund spouse care", "RM 6.0M"],
            ["3-Grandchild Uni Stream", "PRUElite Flex Guaranteed Annual Payouts", "Contractually guaranteed education & milestone cash to Age 100", "RM 3.0M"],
            ["High-Limit Medical Buffer", "PRUValue Med (Auto-Growing Med Value)", "Protects retirement savings from private hospital inflation", "Included"],
        ],
        "angle_hints_en": [
            "Create a 'Matriarch Love Envelope' paying guaranteed annual university gifts directly to each grandchild",
            "Protect retired spouse's dignity and medical comfort without burdening the children",
            "Warm 30-min tea review with family accountant in {loc}",
        ],
        "angle_hints_zh": [
            "设立专属「祖母关爱传承金」，每年契约保证派发教育贺礼陪伴3名孙辈成长",
            "独立预留退休先生的终身医疗与安养金，不给儿女添任何财务压力",
            "在 {loc} 与您的家族会计师喝茶聊30分钟完成财务盘点",
        ],
        "nums": ["30", "21", "3.5", "10.8", "4.8", "6"],
    },
    "boutique_law_partner": {
        "icon": "⚖️",
        "en_label": "Managing Partner (Retirement & Partnership)",
        "zh_label": "律所/建筑师事务所管理合伙人 (退休与买断)",
        "ms_label": "Rakan Kongsi Utama Firma Profesional",
        "ta_label": "சட்ட / கட்டிடக்கலை நிறுவன முதன்மை பங்குதாரர்",
        "nw": "RM 16M",
        "illiquid": "RM 7M partnership capital/WIP + RM 6M Kenny Hills/Bangsar property",
        "liquid_only": "RM 3.0M EPF/cash",
        "loan": "RM 3.2M luxury home mortgage + RM 1.8M firm credit line indemnity",
        "old_cover": "RM 1.0M personal term life",
        "family": "Spouse + 1 child at LSE London; retiring from active billable hours in 7 years",
        "need_m": 9.0,
        "have_m": 4.0,
        "gap_m": 5.0,
        "need_breakdown": "RM 5.0M mortgage & firm indemnity + RM 1.5M LSE completion + RM 2.5M post-60 medical/income bridge",
        "shariah": False,
        "solution_rows": [
            ["Indemnity & Mortgage Shield", "PRUWith You Plus (+50% Auto Booster)", "Clears RM 5.0M personal & firm liabilities outside probate", "RM 5.0M"],
            ["Age-60 Pension Replacement", "PRUElite Flex Guaranteed FlexIncome", "Replaces partner drawings with guaranteed annual cashflow to 100", "RM 2.5M"],
            ["Post-Firm Medical Bridge", "PRUValue Med (Smart Deductible)", "Locks in healthy underwriting now before stepping down at 60", "Included"],
        ],
        "angle_hints_en": [
            "Convert non-transferable firm goodwill into portable, contractually guaranteed family wealth ahead of Age 60",
            "Pivot active billable-hour drawings into passive guaranteed retirement income by Age 60",
            "25-min chambers review at {loc} alongside your tax partner",
        ],
        "angle_hints_zh": [
            "在60岁前将不可转让的事务所商誉转化为可携带、受契约保障的家庭传承资产",
            "在60岁退居二线前，提前铺好每年契约保证派息的被动退休俸禄",
            "约在 {loc} 办公室做25分钟精炼合伙人保障审视",
        ],
        "nums": ["16", "7", "3.2", "5", "9", "4"],
    },
    "heritage_hotel_gearing": {
        "icon": "🏨",
        "en_label": "Hotel & Property Datuk (Asset-Rich Cash-Tight)",
        "zh_label": "精品酒店与地产拿督 (重资产高杠杆隔离)",
        "ms_label": "Pemaju Hotel & Hartanah (Kaya Aset, Kekangan Tunai)",
        "ta_label": "ஹோட்டல் & ரியல் எஸ்டேட் நிறுவனர்",
        "nw": "RM 38M",
        "illiquid": "RM 35M (92%) geared hotel & commercial shophouse portfolio",
        "liquid_only": "RM 3.0M cash buffer",
        "loan": "RM 11.0M hotel bridging & commercial term loans (personal guarantee)",
        "old_cover": "RM 1.5M decreasing MRTA only (covers RM 0 CI & non-portable)",
        "family": "Spouse + 3 children; banks hold cross-collateralised guarantees over family properties",
        "need_m": 15.5,
        "have_m": 4.5,
        "gap_m": 11.0,
        "need_breakdown": "RM 11.0M cross-collateralised bank loans + RM 3.0M family living trust + RM 1.5M probate & stamp liquidity",
        "shariah": False,
        "solution_rows": [
            ["Cross-Collateral Debt Shield", "PRUWealth Enrich 2.0 (Up to +50% Booster)", "Retires RM 11M bridging facilities while preserving 100% family hotel ownership", "RM 11.0M"],
            ["Creditor-Proof Family Reserve", "PRUPrestige Legacy (FSA Sched 10 Trust)", "Ring-fences RM 3M family wealth cleanly separated from corporate facilities", "RM 3.0M"],
            ["Executive Debt-Service Reserve", "PRUAll Care (~190 Conditions + 20% Recovery)", "Sustains RM 65k/mo debt-service continuity & hospitality cashflow confidence", "RM 2.0M"],
        ],
        "angle_hints_en": [
            "Preserving 100% family ownership of heritage boutique hotels across generations with dedicated liquidity ring-fencing",
            "Upgrade rigid bank MRTA into portable, creditor-shielded Schedule 10 family protection",
            "30-min portfolio stress-test with your corporate banker & CFO in {loc}",
        ],
        "angle_hints_zh": [
            "92%重资产稳健护航：通过专项流动性隔离守护家族100%世代持有精品酒店产权",
            "用可携带、受法定信托隔离的个人保障升级传统银行 MRTA",
            "在 {loc} 联合您的财务总监做30分钟债务压力测试",
        ],
        "nums": ["38", "35", "11", "15.5", "4.5", "92"],
    },
    "intl_school_founder": {
        "icon": "🎓",
        "en_label": "Private School Founder (Campus Debt & Heir)",
        "zh_label": "国际学校教育集团创办人 (校区扩建与接班)",
        "ms_label": "Pengasas Sekolah Antarabangsa (Kampus & Waris)",
        "ta_label": "சர்வதேசப் பள்ளி குழும நிறுவனர்",
        "nw": "RM 26M",
        "illiquid": "RM 20M (77%) campus equity + RM 3.5M home",
        "liquid_only": "RM 2.5M cash/FD",
        "loan": "RM 5.0M STEM wing expansion loan (founder guarantee)",
        "old_cover": "RM 1.0M life policy",
        "family": "Spouse + elder daughter (Vice-Principal successor) + younger son (architect in Sydney)",
        "need_m": 11.5,
        "have_m": 3.5,
        "gap_m": 8.0,
        "need_breakdown": "RM 5.0M campus expansion loan + RM 4.5M Sydney son inheritance equalisation + RM 2.0M spouse security",
        "shariah": False,
        "solution_rows": [
            ["Campus Loan Continuity", "PRUWealth Enrich 2.0 Keyman Shield", "Ensures Ministry & parent confidence with zero debt disruption", "RM 5.0M"],
            ["Heir Equalisation Plan", "PRUPrestige Legacy (100% Day-1 Alloc)", "Sydney son receives RM 4.5M cash; daughter inherits 100% school", "RM 4.5M"],
            ["Founder Health Protection", "PRUAll Care + PRUMillion Med Active 2.0", "Comprehensive CI to Age 100 + 15% no-claim cash saver", "RM 2.0M"],
        ],
        "angle_hints_en": [
            "Protect the trust of 1,400 parents & teachers—ensure campus expansion never stalls over bank guarantees",
            "Empower your Vice-Principal daughter with 100% school ownership while treating your Sydney son fairly in cash",
            "30-min boardroom coffee after school dismissal at {loc}",
        ],
        "angle_hints_zh": [
            "守护上千名家长与师生的信心——确保新校区贷款绝不因任何个人变故被银行收紧",
            "让担任副校长的女儿100%安心接班办学，同时给悉尼儿子等值免税现金",
            "放学后在 {loc} 校区办公室用30分钟与学校财务顾问共同审视",
        ],
        "nums": ["26", "20", "5", "11.5", "3.5", "8"],
    },
    "auto_dealership_group": {
        "icon": "🚘",
        "en_label": "4S Auto Dealership Datuk (Floor-Stock Credit)",
        "zh_label": "4S汽车经销集团拿督 (库存授信与现金流)",
        "ms_label": "Pengasas Kumpulan Pengedar 4S Automotif",
        "ta_label": "4S ஆட்டோமொபைல் டீலர்ஷிப் குழும நிறுவனர்",
        "nw": "RM 32M",
        "illiquid": "RM 25M (78%) 4S showroom land & dealership franchise equity",
        "liquid_only": "RM 4.0M cash + RM 3.0M equities",
        "loan": "RM 7.2M floor-stock revolving credit & showroom guarantee",
        "old_cover": "RM 1.2M personal life policy",
        "family": "Spouse + 3 children (eldest 23 just joined management trainee program)",
        "need_m": 13.4,
        "have_m": 5.2,
        "gap_m": 8.2,
        "need_breakdown": "RM 7.2M floor-stock credit guarantee + RM 4.2M 5-year transition runway while eldest matures + RM 2.0M family reserve",
        "shariah": False,
        "solution_rows": [
            ["Floor-Stock Credit Shield", "PRUWealth Enrich 2.0 Corporate Keyman", "Keeps OEM principal & bank floor-stock lines open during transition", "RM 7.2M"],
            ["Next-Gen 5-Year Bridge", "PRUPrestige Legacy Staggered Trust", "Provides liquidity runway while 23-yr-old successor gains experience", "RM 4.0M"],
            ["Executive Male CI Cover", "PRUMan (260% Male CI + 110% Refund)", "High-leverage health shield with up to 110% maturity premium refund", "RM 2.0M"],
        ],
        "angle_hints_en": [
            "Auto franchises rely on OEM & bank floor-stock confidence—buy a '5-Year Successor Runway' for your 23-year-old",
            "Protect showroom credit lines instantly without tying up working capital needed for EV inventory",
            "25-min review at your {loc} flagship showroom with your group FC",
        ],
        "angle_hints_zh": [
            "汽车经销命脉在于主机厂授权与银行库存授信——为23岁接班子女买下稳健的「5年成长护航期」",
            "无需占用电动车库存周转现金，即可锁住 RM 7.2M 银行授信防线",
            "在 {loc} 旗舰展厅协同集团财务总监做25分钟推演",
        ],
        "nums": ["32", "25", "7.2", "13.4", "5.2", "8.2"],
    },
    "glc_cfo_golden_bridge": {
        "icon": "🏛️",
        "en_label": "Listed Group CFO (Age-60 Cliff & Twins Uni)",
        "zh_label": "上市集团首席财务官 (60岁医疗断层与双胞胎留学)",
        "ms_label": "CFO Kumpulan Tersenerai (Jurang Umur 60 & Pendidikan)",
        "ta_label": "பட்டியலிடப்பட்ட நிறுவன CFO (60 வயது ஓய்வு பாலம்)",
        "nw": "RM 14M",
        "illiquid": "RM 6.5M homes + RM 3.5M unvested ESOS/LTIP shares",
        "liquid_only": "RM 4.0M EPF & cash",
        "loan": "RM 2.5M mortgage + RM 2.4M upcoming UK university commitment for twins",
        "old_cover": "Covered under RM 2M corporate group life & group medical until Age 60 transition",
        "family": "Spouse + 16-year-old twins targeting UK Russell Group universities in 2 years",
        "need_m": 8.4,
        "have_m": 4.0,
        "gap_m": 4.4,
        "need_breakdown": "RM 2.5M mortgage + RM 2.4M twins UK tuition + RM 3.5M portable post-60 executive life/medical bridge",
        "shariah": False,
        "solution_rows": [
            ["Age-60 Medical Continuity Bridge", "PRUValue Med (Smart Deductible)", "Optimizes premiums Age 53–60 alongside corporate cover; seamless full cover at 60", "Auto-Growing"],
            ["Twins UK Tuition + Pension", "PRUElite Flex Guaranteed Annual Cash", "Funds UK tuition years first, then pivots to CFO pension to Age 100", "RM 2.4M"],
            ["Personal Portable Executive Bridge", "PRUWith You Plus + PRUAll Care", "Establishes portable executive protection while underwriting is optimal at 53", "RM 3.0M"],
        ],
        "angle_hints_en": [
            "Speak CFO-to-CFO: build a portable personal executive bridge alongside corporate benefits & ESOS while Age-53 underwriting is optimal",
            "Smart Deductible eliminates duplicate medical spend from Age 53–60 while guaranteeing seamless Age-60 conversion",
            "20-min IRR & cashflow table walkthrough at {loc} over coffee",
        ],
        "angle_hints_zh": [
            "用 CFO 熟悉的资产负债表视角：趁53岁健康优选核保期，提前搭建可随身携带的个人高管医疗与传承桥梁",
            "善用 Smart Deductible 省下53至60岁重叠医疗保费，60岁退休无缝衔接终身医疗",
            "在 {loc} 用20分钟一页式现金流模型清晰汇报",
        ],
        "nums": ["14", "6.5", "2.5", "2.4", "8.4", "4", "4.4"],
    },
    "d2c_couple_founders": {
        "icon": "✨",
        "en_label": "D2C Brand Couple Founders (Twins & Key-Person)",
        "zh_label": "新消费品牌夫妻档创办人 (双核心保障与幼子信托)",
        "ms_label": "Pasangan Pengasas Jenama D2C (Kembar & Keyman)",
        "ta_label": "D2C பிராண்ட் தம்பதி நிறுவனர்கள்",
        "nw": "RM 20M",
        "illiquid": "RM 14M (70%) brand equity & warehouse inventory + RM 3.5M home",
        "liquid_only": "RM 2.5M cash reinvested heavily in regional ads/inventory",
        "loan": "RM 3.0M warehouse & trade-finance personal guarantee",
        "old_cover": "RM 600k individual policies with no guardian/minor trust structure",
        "family": "Married co-founders (both appear in brand marketing) + 2-year-old twins + aging parents",
        "need_m": 9.6,
        "have_m": 3.1,
        "gap_m": 6.5,
        "need_breakdown": "RM 3.0M trade-finance guarantee + RM 4.6M 20-year twins guardian & education trust + RM 2.0M dual-founder CI",
        "shariah": False,
        "solution_rows": [
            ["Dual-Founder Continuity Shield", "PRUWealth Enrich 2.0 (Joint Coverage)", "Sustains warehouse credit lines & brand momentum with co-founder continuity", "RM 4.0M"],
            ["2-Yr-Old Twins Guardian Pool", "PRUPrestige Legacy Staggered Payouts", "Nurtures minors with structured milestone payouts through university & adulthood", "RM 3.5M"],
            ["Milestone Family Protection", "PRUWith You Plus + PRUMillion Med Active", "Auto +50% cover growth + 15% claim-free cash medical discount", "RM 2.0M"],
        ],
        "angle_hints_en": [
            "When husband & wife build and lead the brand together, co-founder continuity keeps growth momentum & trade credit rock-solid",
            "Structure staggered guardian payouts for the 2-year-old twins so funds are protected until adulthood",
            "Relaxed 25-min Zoom at 8:30pm after the twins are asleep",
        ],
        "angle_hints_zh": [
            "夫妻携手打造新消费品牌，提前建立双创始人延续储备与2岁双胞胎成长信托是稳健基石",
            "设定未成年子女分期给付机制，确保专项传承金稳步护航双胞胎成年与留学",
            "配合新手爸妈作息，约晚8点半宝宝睡后做25分钟线上精炼沟通",
        ],
        "nums": ["20", "14", "3", "9.6", "3.1", "6.5"],
    },
}


def _build_c2_56_roster() -> list[dict]:
    roster: list[dict] = []
    max_v = max(len(v) for v in C2_PERSONA_VARIANTS.values())
    for v_idx in range(max_v):
        for aid in C2_ARCHETYPE_ORDER:
            plist = C2_PERSONA_VARIANTS[aid]
            if v_idx < len(plist):
                roster.append({
                    "seatIndex": len(roster),
                    "archetypeId": aid,
                    "variantIndex": v_idx,
                    "persona": plist[v_idx],
                })
    return roster


C2_SEAT_ROSTER_56 = _build_c2_56_roster()


def get_c2_total_unique_seats() -> int:
    return len(C2_SEAT_ROSTER_56)


def _to_yue_text(s: str) -> str:
    swaps = [
        ("正在为您", "緊係度幫你"), ("请扮演一位", "請扮演一位"), ("创始人", "創辦人"), ("为您", "為你"),
        ("您的", "你嘅"), ("没有", "冇"), ("无需", "唔使"), ("省下", "慳返"), ("对比", "對比"),
        ("优势", "優勢"), ("简报", "簡報"), ("账户", "戶口"), ("贷款", "貸款"), ("资产", "資產"),
        ("现金", "現金"), ("规划", "規劃"), ("专家", "專家"), ("页", "頁"), ("岁", "歲"), ("万", "萬"),
        ("个", "個"), ("两", "兩"), ("与", "同"), ("及", "同埋"),
    ]
    out = s
    for a, b in swaps:
        out = out.replace(a, b)
    return out


def resolve_c2_seat_scenario(seat_index: int, lang: str = "en") -> dict:
    """Returns a complete, localized Challenge 2 scenario, 5-pillar R.C.T.F.C. guide,
    personal strategic angle hints, and 3-slide benchmark target deck."""
    norm = "yue" if lang in ("zh-TW", "zh-HK") else (lang or "en")
    seat = C2_SEAT_ROSTER_56[seat_index % len(C2_SEAT_ROSTER_56)]
    aid = seat["archetypeId"]
    persona = seat["persona"]
    arch = C2_ARCHETYPES[aid]

    is_cjk = norm in ("zh-CN", "yue")
    cust_name = persona["zh"] if is_cjk else persona["en"]
    cust_short = cust_name.split("(")[0].split("（")[0].strip()
    biz = persona["biz"]
    loc = persona["loc"]

    short_label = {
        "en": arch["en_label"],
        "zh-CN": arch["zh_label"],
        "yue": _to_yue_text(arch["zh_label"]),
        "ms": arch["ms_label"],
        "ta": arch["ta_label"],
    }.get(norm, arch["en_label"])

    need_str = f"RM {arch['need_m']:g}M"
    have_str = f"RM {arch['have_m']:g}M"
    gap_str = f"RM {arch['gap_m']:g}M"
    reg_label = (
        "Family Takaful + Hibah • BNM Fact-Find • PDS & 15-Day Free-Look"
        if arch["shariah"]
        else "FSA Sched 10 Trust • BNM Fact-Find • PDS & 15-Day Free-Look"
    )

    # 4 Crisp Case Snapshot Cards
    if is_cjk:
        cards_zh = [
            {"icon": "👤", "label": "客户与核心企业", "value": f"{cust_name} • {biz}"},
            {"icon": "💰", "label": f"净资产 ≈ {arch['nw']}", "value": f"{arch['illiquid']} • 流动 {arch['liquid_only']}"},
            {"icon": "🏦", "label": "负债担保与旧保单", "value": f"{arch['loan']} • 现有 {arch['old_cover']}"},
            {"icon": "📉", "label": f"流动性缺口 = {gap_str}", "value": f"需 {need_str} vs 现有 {have_str} • {'Takaful+Hibah' if arch['shariah'] else 'Schedule 10 隔离+BNM合规'}"},
        ]
        case_cards = [
            {k: (_to_yue_text(v) if k in ("label", "value") and norm == "yue" else v) for k, v in c.items()}
            for c in cards_zh
        ]
    elif norm == "ms":
        case_cards = [
            {"icon": "👤", "label": "Pelanggan & Perniagaan", "value": f"{cust_name} • {biz}"},
            {"icon": "💰", "label": f"Nilai Bersih ≈ {arch['nw']}", "value": f"{arch['illiquid']} • Cair: {arch['liquid_only']}"},
            {"icon": "🏦", "label": "Liabiliti & Polisi Lama", "value": f"{arch['loan']} • Sedia ada: {arch['old_cover']}"},
            {"icon": "📉", "label": f"Jurang Kecairan = {gap_str}", "value": f"Perlu {need_str} lwn Sedia Ada {have_str} • Peraturan BNM"},
        ]
    elif norm == "ta":
        case_cards = [
            {"icon": "👤", "label": "வாடிக்கையாளர் & நிறுவனம்", "value": f"{cust_name} • {biz}"},
            {"icon": "💰", "label": f"நிகர சொத்து ≈ {arch['nw']}", "value": f"{arch['illiquid']} • ரொக்கம்: {arch['liquid_only']}"},
            {"icon": "🏦", "label": "கடன் & பழைய பாலிசி", "value": f"{arch['loan']} • தற்போதைய: {arch['old_cover']}"},
            {"icon": "📉", "label": f"பணப்புழக்க இடைவெளி = {gap_str}", "value": f"தேவை {need_str} vs இருப்பு {have_str} • BNM விதிகள்"},
        ]
    else:
        case_cards = [
            {"icon": "👤", "label": "Client & Enterprise", "value": f"{cust_name} • {biz}"},
            {"icon": "💰", "label": f"Net Worth ≈ {arch['nw']}", "value": f"{arch['illiquid']} • Liquid: {arch['liquid_only']}"},
            {"icon": "🏦", "label": "Debt & Existing Cover", "value": f"{arch['loan']} • Existing: {arch['old_cover']}"},
            {"icon": "📉", "label": f"Liquidity Gap = {gap_str}", "value": f"Need {need_str} vs Available {have_str} • {reg_label}"},
        ]

    # Case File Dict
    case_file = {
        "client": f"{cust_name} — {biz}",
        "family": arch["family"],
        "wealth": f"Net worth ≈ {arch['nw']}: {arch['illiquid']}; liquid {arch['liquid_only']}",
        "liabilities": arch["loan"],
        "existing_cover": arch["old_cover"],
        "concerns": f"Liquidity gap of {gap_str} ({arch['need_breakdown']}); multi-year estate administration & continuity readiness",
        "meeting": f"First executive pre-pitch review at {loc} office (referred by corporate accountant)",
        "rules": reg_label + "; illustrative non-guaranteed figures; independent legal/tax review",
    }

    # 5 R.C.T.F.C. Guide Pillars (concise, crystal-clear, scenario-tailored)
    if is_cjk:
        g_zh = [
            {
                "key": "role",
                "label": "R · 角色 (Role)",
                "summary": "资深家族办公室与企业传承规划顾问",
                "tip": "明确资深财富传承顾问身份，瞬间拉升高管简报专业度。",
                "template": "请扮演一位 PRUMDA 资深高净值财富与企业传承规划顾问，以客观、尊尚的家族办公室视角撰写战前提案简报。",
            },
            {
                "key": "context",
                "label": "C · 客户背景 (Context)",
                "summary": f"{cust_short} • 净值 {arch['nw']} • 缺口 {gap_str}",
                "tip": "带入客户核心资产、负债担保与家庭结构数据。",
                "template": f"客户：{cust_name}（{biz}）。家庭：{arch['family']}。净资产约 {arch['nw']}（{arch['illiquid']}；流动资金 {arch['liquid_only']}）。负债：{arch['loan']}；旧保单：{arch['old_cover']}。核心痛点：面临 {gap_str} 遗产与债务流动性缺口（需 {need_str} 对比现有 {have_str}）。",
            },
            {
                "key": "task",
                "label": "T · 核心任务 (Task)",
                "summary": f"为 {loc} 首次会面生成严格 3 页高管简报",
                "tip": "锁定严格3页结构与首次会面目标（建立信任并约定需求分析）。",
                "template": f"请为我在 {loc} 办公室与客户进行的首次会面，制作一份严格限定 3 页 (3 slides) 的高管战前提案简报。",
            },
            {
                "key": "format",
                "label": "F · 视觉格式 (Format)",
                "summary": "第1页KPI卡 · 第2页缺口柱状图 · 第3页策略表+备注",
                "tip": "指定每页图表组件与演讲者备注，让简报达到麦肯锡级可读性。",
                "template": f"第1页：客户全景快照（4张KPI指标卡）及议程；第2页：流动性缺口对比柱状图（总需求 {need_str} vs 现有流动资产+保额 {have_str} vs 缺口 {gap_str}）及风险洞察；第3页：定制方案策略对比表（需求、推荐方案、核心优势、参考保额）及下一步邀约。每页最多4条精炼要点并附上演讲者备注。",
            },
            {
                "key": "constraints",
                "label": "C · 合规边界 (Constraints)",
                "summary": "BNM公平待客 · 先做Fact-Find · PDS与15天冷静期",
                "tip": "加入马来西亚国家银行 (BNM) 与伊斯兰/信托合规护栏。",
                "template": (
                    "严格遵守马来西亚国家银行 (BNM) 公平待客准则：推荐前先完成全面财务需求分析 (Fact-Find)，说明产品披露表 (PDS) 与15天犹豫期 (Free-Look)，"
                    + ("按伊斯兰教义阐明 Takaful 与 Hibah 原则，" if arch["shariah"] else "善用金融服务法令 Schedule 10 法定信托隔离原则，")
                    + "严禁承诺保证投资回报，注明测算仅供说明并建议协同会计师与律师审视。"
                ),
            },
        ]
        guide = [
            {k: (_to_yue_text(v) if k != "key" and norm == "yue" else v) for k, v in step.items()}
            for step in g_zh
        ]
    elif norm == "ms":
        guide = [
            {
                "key": "role",
                "label": "R · Peranan (Role)",
                "summary": "Perunding Kanan Kekayaan & Legasi HNW",
                "tip": "Tetapkan peranan pakar pejabat keluarga untuk nada eksekutif.",
                "template": "Bertindak sebagai Perunding Kanan Perancangan Kekayaan & Legasi PRUMDA yang menyediakan dek pra-pembentangan eksekutif.",
            },
            {
                "key": "context",
                "label": "C · Konteks (Context)",
                "summary": f"{cust_short} • Nilai Bersih {arch['nw']} • Jurang {gap_str}",
                "tip": "Masukkan fakta aset, pinjaman jaminan & keluarga pelanggan.",
                "template": f"Pelanggan: {cust_name} ({biz}). Keluarga: {arch['family']}. Nilai bersih ≈ {arch['nw']} ({arch['illiquid']}; cair {arch['liquid_only']}). Liabiliti: {arch['loan']}; perlindungan lama: {arch['old_cover']}. Jurang kecairan pusaka = {gap_str} (perlu {need_str} lwn sedia ada {have_str}).",
            },
            {
                "key": "task",
                "label": "T · Tugasan (Task)",
                "summary": f"Dek Tepat 3-Slaid untuk mesyuarat di {loc}",
                "tip": "Tetapkan sasaran tepat 3 slaid untuk mesyuarat pertama.",
                "template": f"Hasilkan dek pra-pembentangan tepat 3 slaid (strictly 3 slides) untuk mesyuarat pertama selama 60 minit di pejabat {loc} beliau.",
            },
            {
                "key": "format",
                "label": "F · Format Visual",
                "summary": "Slaid 1 KPI · Slaid 2 Carta Jurang · Slaid 3 Jadual",
                "tip": "Nyatakan susun atur KPI, carta palang, jadual strategi & nota pembentang.",
                "template": f"Slaid 1: Gambaran keseluruhan pelanggan dengan 4 kad KPI & objektif. Slaid 2: Carta palang keperluan kecairan ({need_str}) lwn aset cair+polisi ({have_str}) lwn jurang ({gap_str}). Slaid 3: Jadual strategi (keperluan, pendekatan, kelebihan, anggaran perlindungan) & langkah seterusnya. Sertakan nota pembentang pada setiap slaid.",
            },
            {
                "key": "constraints",
                "label": "C · Kekangan BNM",
                "summary": "BNM FTFC · Fact-Find · PDS & 15 Hari Free-Look",
                "tip": "Pastikan pematuhan BNM & Syariah/Amanah dipaparkan dengan jelas.",
                "template": "Patuhi garis panduan Layanan Adil BNM: lengkapkan analisis keperluan (fact-find) dahulu, terangkan PDS & tempoh bertenang 15 hari, tiada jaminan pulangan pelaburan, angka adalah ilustratif, dan cadangkan semakan bersama akauntan/peguam.",
            },
        ]
    elif norm == "ta":
        guide = [
            {
                "key": "role",
                "label": "R · பங்கு (Role)",
                "summary": "மூத்த HNW செல்வ & பாரம்பரிய ஆலோசகர்",
                "tip": "உயர்மட்ட ஆலோசகர் பாத்திரத்தைத் தெளிவாகக் குறிப்பிடவும்.",
                "template": "PRUMDA மூத்த செல்வ மற்றும் குடும்பப் பாரம்பரிய திட்டமிடல் ஆலோசகராகச் செயல்பட்டு நிர்வாக முன்-முன்மொழிவு விளக்கக்காட்சியை உருவாக்கவும்.",
            },
            {
                "key": "context",
                "label": "C · பின்னணி (Context)",
                "summary": f"{cust_short} • சொத்து {arch['nw']} • இடைவெளி {gap_str}",
                "tip": "வாடிக்கையாளரின் சொத்து, கடன் மற்றும் குடும்ப விவரங்களைச் சேர்க்கவும்.",
                "template": f"வாடிக்கையாளர்: {cust_name} ({biz}). குடும்பம்: {arch['family']}. நிகர சொத்து ≈ {arch['nw']} ({arch['illiquid']}; ரொக்கம் {arch['liquid_only']}). கடன் பொறுப்பு: {arch['loan']}; பழைய பாலிசி: {arch['old_cover']}. பணப்புழக்க இடைவெளி = {gap_str} (தேவை {need_str} vs இருப்பு {have_str}).",
            },
            {
                "key": "task",
                "label": "T · பணி (Task)",
                "summary": f"{loc} சந்திப்பிற்கான துல்லியமான 3-ஸ்லைடு டெக்",
                "tip": "சரியாக 3 ஸ்லைடுகள் கொண்ட விளக்கக்காட்சியைக் கோருங்கள்.",
                "template": f"{loc} அலுவலகத்தில் நடைபெறும் முதல் ஆலோசனைக் கூட்டத்திற்காக சரியாக 3 ஸ்லைடுகள் (strictly 3 slides) கொண்ட விளக்கக்காட்சியை உருவாக்கவும்.",
            },
            {
                "key": "format",
                "label": "F · வடிவமைப்பு (Format)",
                "summary": "ஸ்லைடு 1 KPI · ஸ்லைடு 2 வரைபடம் · ஸ்லைடு 3 அட்டவணை",
                "tip": "KPI அட்டைகள், ஒப்பீட்டு வரைபடம் மற்றும் அட்டவணையைக் குறிப்பிடவும்.",
                "template": f"ஸ்லைடு 1: 4 KPI அட்டைகளுடன் வாடிக்கையாளர் சுருக்கம். ஸ்லைடு 2: பணப்புழக்கத் தேவை ({need_str}) vs தற்போதைய இருப்பு ({have_str}) vs இடைவெளி ({gap_str}) ஒப்பீட்டு வரைபடம். ஸ்லைடு 3: தீர்வு அட்டவணை மற்றும் அடுத்த படிகள். ஒவ்வொரு ஸ்லைடிலும் பேச்சாளர் குறிப்புகளைச் சேர்க்கவும்.",
            },
            {
                "key": "constraints",
                "label": "C · BNM விதிகள்",
                "summary": "BNM விதிகள் · Fact-Find · PDS & 15-நாள் Free-Look",
                "tip": "BNM இணக்க விதிகளைத் தெளிவாக இணைக்கவும்.",
                "template": "BNM விதிகளைப் பின்பற்றவும்: முதலில் தேவைப் பகுப்பாய்வு (Fact-Find), PDS மற்றும் 15-நாள் Free-Look விளக்கம், உத்தரவாத வருமானம் வாக்குறுதி இல்லை, கணக்காளர்/வழக்கறிஞர் கூட்டு ஆலோசனையைப் பரிந்துரைக்கவும்.",
            },
        ]
    else:
        guide = [
            {
                "key": "role",
                "label": "R · Role",
                "summary": "Senior Family-Office Wealth & Legacy Strategist",
                "tip": "Anchor an executive family-office advisor persona so every slide reads boardroom-ready.",
                "template": "Act as a senior PRUMDA HNW wealth & business succession strategist preparing an executive pre-pitch boardroom brief.",
            },
            {
                "key": "context",
                "label": "C · Context",
                "summary": f"{cust_short} • {arch['nw']} NW • {gap_str} Gap",
                "tip": "Ground the deck in the client's exact balance sheet, family commitments & debt exposure.",
                "template": f"Client: {cust_name}, founder/leader of {biz}. Family: {arch['family']}. Net worth ≈ {arch['nw']} ({arch['illiquid']}; liquid {arch['liquid_only']}). Liabilities: {arch['loan']}. Existing cover: {arch['old_cover']}. Core exposure: {gap_str} estate & debt liquidity shortfall ({arch['need_breakdown']}).",
            },
            {
                "key": "task",
                "label": "T · Task",
                "summary": f"Strictly 3-Slide Pre-Pitch Deck for {loc} meeting",
                "tip": "Define the exact 3-slide deliverable and consultative first-meeting objective.",
                "template": f"Create a strictly 3-slide executive pre-pitch deck for our 60-minute first review at {cust_short}'s {loc} office (referred by their accountant).",
            },
            {
                "key": "format",
                "label": "F · Format",
                "summary": "S1 KPI Snapshot · S2 Gap Bar Chart · S3 Strategy Table",
                "tip": "Specify KPI cards, quantified bar chart, strategy matrix, and speaker notes.",
                "template": f"Slide 1: Executive snapshot with 4 KPI cards and meeting agenda. Slide 2: Bar chart comparing Liquidity Needed ({need_str}) vs Liquid Assets + Cover ({have_str}) vs Liquidity Shortfall ({gap_str}), plus key business/family risks. Slide 3: Strategy table (Need, Recommended Solution, Strategic Fit, Indicative Cover) plus low-pressure next step. Max 4 crisp bullets per slide and add speaker notes.",
            },
            {
                "key": "constraints",
                "label": "C · Constraints",
                "summary": "BNM Fair Dealing · Fact-Find · PDS & 15-Day Free-Look",
                "tip": "Lock in regulatory & ethical guardrails so the proposal is 100% BNM-compliant.",
                "template": (
                    "Follow BNM Fair Treatment of Financial Consumers rules: complete a formal fact-find before product sizing, explain the PDS and 15-day free-look period, "
                    + ("structure per Shariah Takaful & Hibah principles, " if arch["shariah"] else "highlight FSA Schedule 10 statutory trust creditor protection, ")
                    + "make zero guaranteed investment return claims, state figures are illustrative, and invite legal/tax co-review."
                ),
            },
        ]

    # Tappable Personal Strategic Angle Hints
    raw_hints = arch["angle_hints_zh"] if is_cjk else arch["angle_hints_en"]
    angle_hints = [
        (_to_yue_text(h) if norm == "yue" else h).replace("{biz}", biz).replace("{loc}", loc)
        for h in raw_hints
    ]

    # Scenario-Specific 3-Slide Target Benchmark Deck
    sol_rows = [
        [c.replace("{biz}", biz).replace("{loc}", loc) for c in row]
        for row in copy.deepcopy(arch["solution_rows"])
    ]
    target_deck = {
        "title": f"Executive Pre-Pitch: {cust_short}",
        "subtitle": f"{biz} • Wealth, Liquidity & Continuity Review",
        "slides": [
            {
                "layout": "kpi",
                "title": f"{cust_short} — Balance Sheet Snapshot & Review Agenda",
                "subtitle": f"First Advisory Review · {loc} · Referred by Corporate Accountant",
                "kpis": [
                    {"label": "Net Worth", "value": f"≈ {arch['nw']}", "note": arch["illiquid"].split("+")[0].strip()},
                    {"label": "Debt / Exposure", "value": arch["loan"].split(" ")[0] + " " + arch["loan"].split(" ")[1], "note": "Personal / corporate exposure"},
                    {"label": "Existing Cover", "value": ("RM 2M" if "RM 2M" in arch["old_cover"] else arch["old_cover"].split(" ")[0] + " " + arch["old_cover"].split(" ")[1]), "note": "Legacy protection"},
                    {"label": "Liquidity Gap", "value": gap_str, "note": f"Need {need_str} vs {have_str}"},
                ],
                "bullets": [
                    f"Objective: Protect {biz} continuity and family lifestyle while keeping core enterprise equity 100% intact",
                    "Consultative Agenda: Confirm family priorities → Stress-test liquidity gap → Agree formal Fact-Find",
                ],
                "left": None,
                "right": None,
                "chart": None,
                "table": None,
                "steps": None,
                "callout": f"Position as a collaborative Family-Office balance-sheet review for {cust_short}, never a product push.",
                "speaker_notes": f"Thank the accountant for the introduction. Invite {cust_short} to share their #1 priority for {biz} and their family first.",
                "image_prompt": "Executive modern Malaysian boardroom skyline illustration, navy and subtle crimson accents, clean architectural light, no text",
                "image": "/static/target/MY_1.jpg",
            },
            {
                "layout": "chart",
                "title": f"Quantifying the {gap_str} Estate & Business Liquidity Gap",
                "subtitle": f"Illustrative stress-test ({arch['need_breakdown']})",
                "kpis": None,
                "left": None,
                "right": None,
                "chart": {
                    "type": "bar",
                    "unit": "RM million (illustrative)",
                    "series": [
                        {"label": "Total Liquidity Needed", "value": arch["need_m"]},
                        {"label": "Liquid Assets + Cover", "value": arch["have_m"]},
                        {"label": "Net Liquidity Gap", "value": arch["gap_m"]},
                    ],
                },
                "table": None,
                "steps": None,
                "bullets": [
                    f"Breakdown: {arch['need_breakdown']}",
                    f"Continuity Focus: {arch['illiquid']} benefits from dedicated cash liquidity for smooth transition continuity",
                    f"Structure: Ring-fencing {arch['loan']} keeps corporate facilities and family wealth cleanly separated",
                ],
                "callout": f"Allocating ~1.5–2.5% p.a. to close the {gap_str} gap unlocks instant liquidity while preserving 100% of enterprise value in {biz}.",
                "speaker_notes": "Walk through the 3 bars calmly and let the client validate each assumption before the formal fact-find.",
                "image_prompt": None,
                "image": None,
            },
            {
                "layout": "table",
                "title": "Tailored Protection Architecture & Co-Advisory Next Steps",
                "subtitle": "Illustrative structure subject to formal BNM Fact-Find & underwriting",
                "kpis": None,
                "left": None,
                "right": None,
                "chart": None,
                "table": {
                    "headers": ["Priority Need", "Recommended Structure", "Why It Fits", "Indicative Cover"],
                    "rows": sol_rows,
                },
                "steps": None,
                "bullets": [
                    f"Next Step: 30-min joint Fact-Find session at {loc} with company secretary & tax accountant",
                    "BNM Guardrails: ✔ Needs-based Fact-Find · ✔ PDS & 15-Day Free-Look · ✔ Illustrative non-guaranteed figures",
                ],
                "callout": f'Suggested Close: "Shall we schedule 30 minutes next week with your accountant to verify these assumptions?"',
                "speaker_notes": "Emphasize co-advisory collaboration with their existing accountant and lawyer under BNM Fair Dealing rules.",
                "image_prompt": "Minimalist luxury architectural shield protecting enterprise and family legacy, navy gold crimson palette, no text",
                "image": "/static/target/MY_3.jpg",
            },
        ],
    }

    starter_weak = {
        "en": f"Create a short presentation for my meeting with {cust_short} about business and family insurance.",
        "zh-CN": f"帮我做一份和 {cust_short} 谈企业与家庭保险的简报。",
        "yue": f"幫我整一份同 {cust_short} 傾生意同屋企保險嘅簡報。",
        "ms": f"Buat pembentangan ringkas untuk mesyuarat saya bersama {cust_short} mengenai perlindungan perniagaan dan keluarga.",
        "ta": f"{cust_short} உடனான எனது சந்திப்பிற்கு வணிக மற்றும் குடும்பக் காப்பீடு குறித்த சுருக்கமான விளக்கக்காட்சியை உருவாக்கவும்.",
    }.get(norm, f"Create a presentation for my meeting with {cust_short} about insurance.")

    return {
        "seatIndex": seat["seatIndex"],
        "totalUniqueSeats": len(C2_SEAT_ROSTER_56),
        "id": aid,
        "scenarioKey": f"{aid}__v{seat['variantIndex']}",
        "icon": arch["icon"],
        "shortLabel": short_label,
        "clientName": cust_name,
        "clientShort": cust_short,
        "businessName": biz,
        "locationName": loc,
        "shariah": arch["shariah"],
        "netWorth": arch["nw"],
        "gapAmount": gap_str,
        "needAmount": need_str,
        "haveAmount": have_str,
        "keyNumbers": arch["nums"],
        "caseCards": case_cards,
        "case_file": case_file,
        "guide": guide,
        "angleHints": angle_hints,
        "simple_prompt": starter_weak,
        "target": target_deck,
    }


def list_c2_archetype_summaries(lang: str = "en") -> list[dict]:
    seen = set()
    out = []
    for s in C2_SEAT_ROSTER_56:
        aid = s["archetypeId"]
        if aid in seen:
            continue
        seen.add(aid)
        sc = resolve_c2_seat_scenario(s["seatIndex"], lang)
        out.append({
            "seatIndex": s["seatIndex"],
            "id": aid,
            "icon": sc["icon"],
            "shortLabel": sc["shortLabel"],
            "clientName": sc["clientName"],
            "netWorth": sc["netWorth"],
            "gapAmount": sc["gapAmount"],
        })
    return out
