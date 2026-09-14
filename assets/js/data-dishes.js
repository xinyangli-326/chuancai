/* 川味小厨房 · 菜谱数据（备菜 + 调味 + 烹饪模拟步骤）
   步骤类型 type：
   heat  选火候（大火/中火/小火）
   order 选下锅顺序（从选项中选出该下锅的食材/调料）
   season 选用量或调味方案
   stir  翻炒小游戏（点按/空格，够次数且别超时）
   wait  计时步骤（课堂用加速计时）
   每个步骤 add: [emoji] 表示食材进入锅中，锅里的画面会随之变化。
*/
window.CC = window.CC || {};

CC.dishes = [
  /* ==================== 1. 麻婆豆腐 ==================== */
  {
    id: 'mapo', name: '麻婆豆腐', py: 'Má pó dòufu', en: 'Mapo Tofu',
    emoji: '🍲', plate: '🍲', color: '#d7263d',
    flavorId: 'mala', flavor: '麻辣味', flavorPy: 'málà wèi', heat: 3, difficulty: 1, minutes: 20,
    region: '成都 · 上河帮', tags: ['经典名菜', '下饭菜', '零基础'],
    story: {
      zh: '清朝同治元年（1862 年），成都北门外万福桥边有一家"陈兴盛饭铺"。店主陈春富早逝，店由老板娘陈刘氏经营；她脸上有麻点，街坊和来往的挑夫、脚夫都叫她"陈麻婆"。那时脚夫常自带豆腐、牛肉，花几个手工钱请她代烧。她烧出来的豆腐又麻、又辣、又烫、又香，慢慢就有了"麻婆豆腐"这个菜名。传统做法用的是牛肉末；这道菜讲究八个字：麻、辣、烫、香、酥、嫩、鲜、活。',
      py: 'Qīngcháo Tóngzhì niánjiān, Chéngdū Wànfúqiáo biān yǒu yì jiā xiǎo fàn pù, lǎobǎnniáng xìng Chén, liǎn shang yǒu jǐ kē mázi, dàjiā jiào tā "Chén mápó".',
      en: 'In 1862, by Wanfu Bridge outside the north gate of Chengdu, there was a small eatery called "Chen Xingsheng". After its owner Chen Chunfu died, his wife Chen Liushi ran the shop. Nicknamed "Pockmarked Chen" for the marks on her face, she cooked tofu that porters brought in, charging only a small fee. Her dish was numbing, hot, scalding and fragrant — so it took her nickname: Mapo Tofu. Traditionally it uses minced beef. Its eight virtues: numbing, hot, scalding, fragrant, crisp, tender, fresh and lively.'
    },
    prep: [
      { ing: 'nendoufu', qty: '约 400 克', prep: 'qiekuai', note: { zh: '切成 1.5—2 厘米的小块；先放进淡盐水里泡一会儿，或用沸水焯 1 分钟，可以去豆腥味、让豆腐更紧实。', en: 'Cut into 1.5–2 cm cubes. Soak in lightly salted water or blanch for 1 minute to remove the bean smell and firm it up.' } },
      { ing: 'roumo', qty: '约 150 克', prep: 'duomo', note: { zh: '传统做法用牛肉末（也可以换成猪肉末，肥瘦 3 : 7）。', en: 'Traditionally minced beef — minced pork (30% fat) works too.' } },
      { ing: 'suanmiao', qty: '2 根', prep: 'qieduan', note: { zh: '斜切成小段，出锅前用。', en: 'Cut on the diagonal into short sections.' } },
      { ing: 'shengjiang', qty: '10 克', prep: 'duomo', note: { zh: '姜剁成末，去豆腥味。', en: 'Mince the ginger to cut the bean smell.' } },
      { ing: 'dasuan', qty: '15 克', prep: 'duomo', note: { zh: '蒜剁成末，和姜一起下锅。', en: 'Mince the garlic; it goes in with the ginger.' } },
      { ing: 'huajiao', qty: '1 小勺', prep: 'mofen', note: { zh: '花椒先炒香再磨粉，麻香最好。', en: 'Toast the peppercorns first, then grind — the numbing aroma peaks.' } },
      { ing: 'xiaocong', qty: '少许', prep: 'duomo', note: { zh: '切葱花，最后撒上。', en: 'Chop into scallion flowers for the finish.' } }
    ],
    seasonings: ['pixiandouban', 'doushi', 'lajiaomian', 'huajiaofen', 'shengchou', 'liaojiu', 'dianfen', 'shiyongyou', 'yan'],
    seasonQty: { pixiandouban: '20 克（约 1.5 大勺）', doushi: '10 克', lajiaomian: '3 克', huajiaofen: '1 克，最后撒', shengchou: '10 毫升', liaojiu: '10 毫升', dianfen: '10 克，加水调成水淀粉', shiyongyou: '30 毫升', yan: '3 克' },
    flavorTask: {
      question: { zh: '麻婆豆腐的"麻辣味"要用哪两样当家？', en: 'Which two seasonings define the numbing-spicy taste?' },
      options: [
        { zh: '花椒 + 辣椒', emoji: '🫘🌶️', correct: true },
        { zh: '糖 + 醋', emoji: '🍬🫙' },
        { zh: '芝麻酱 + 香油', emoji: '🥫🫗' }
      ],
      explain: { zh: '麻来自花椒，辣来自辣椒，两样各管一件事。', en: 'Numbing comes from pepper, heat from chili — two different jobs.' }
    },
    tips: [
      { zh: '豆腐下锅后别用力翻炒，用锅铲轻轻推，才不会碎。', en: 'Never stir tofu hard — nudge it gently so it stays whole.' },
      { zh: '豆瓣酱一定要炒出红油再加汤，这是川菜的"基本功"。', en: 'Always fry the bean paste until red oil appears — a Sichuan basic skill.' }
    ],
    steps: [
      { type: 'heat', heat: 'zhong', zh: '锅烧热，倒油，油面上有小波纹就可以下料了。', py: 'Guō shāo rè, dào yóu.', en: 'Heat the wok and add oil.', add: ['🫗'], tip: { zh: '中火最稳，油温太高豆瓣酱会苦。', en: 'Medium heat is safest — burnt bean paste turns bitter.' } },
      { type: 'order', zh: '第一样下锅的是什么？', py: 'Dì yī yàng xià guō de shì shénme?', en: 'What goes into the wok first?', options: [{ id: 'rou', zh: '牛肉末', emoji: '⚪' }, { id: 'doufu', zh: '豆腐', emoji: '⬜' }, { id: 'suanmiao', zh: '蒜苗', emoji: '🌿' }], answer: 'rou', add: ['⚪'], tip: { zh: '先炒肉末，炒散炒香，后面才有"酥"的口感。', en: 'Fry the mince first and break it up — that gives the "crisp" texture.' } },
      { type: 'order', zh: '接下来下锅的是……', py: 'Jiē xiàlái xià guō de shì…', en: 'Next into the wok…', options: [{ id: 'douban', zh: '豆瓣酱 + 豆豉', emoji: '🥫' }, { id: 'cu', zh: '香醋', emoji: '🫙' }, { id: 'suanmiao', zh: '蒜苗', emoji: '🌿' }], answer: 'douban', add: ['🥫'], tip: { zh: '中火慢慢炒，看到红油冒出来，香味就出来了。', en: 'Fry gently until red oil surfaces — that is the aroma moment.' } },
      { type: 'season', zh: '姜末、蒜末、辣椒面各放多少？', py: 'Jiāngmò, suànmò, làjiāomiàn gè fàng duōshao?', en: 'How much ginger, garlic and chili flakes?', options: [{ id: 'xiao', zh: '各 1 小勺', emoji: '🥄' }, { id: 'da', zh: '各 3 大勺', emoji: '🥄🥄🥄' }, { id: 'wan', zh: '各半碗', emoji: '🥣' }], answer: 'xiao', add: ['🌶️'], tip: { zh: '调料是"提味"不是"主角"，少量多次才好吃。', en: 'Seasoning supports, not dominates — small amounts at a time.' } },
      { type: 'wait', seconds: 5, label: '小火慢烧 3 分钟', zh: '倒入高汤，放入豆腐，转小火，盖上锅盖烧 3 分钟。', py: 'Dào rù gāotāng, fàng rù dòufu, zhuǎn xiǎo huǒ.', en: 'Add stock and tofu, turn to low heat and simmer 3 minutes.', add: ['💧', '⬜'], tip: { zh: '小火让豆腐慢慢吸味，看到汤在"咕嘟咕嘟"就好了。', en: 'Low heat lets tofu absorb flavour — look for gentle bubbling.' } },
      { type: 'season', zh: '要勾芡了，放哪一样？', py: 'Yào gōu qiàn le, fàng nǎ yí yàng?', en: 'Time to thicken — what goes in?', options: [{ id: 'shui', zh: '水淀粉', emoji: '🥛' }, { id: 'you', zh: '红油', emoji: '🫙' }, { id: 'cu', zh: '香醋', emoji: '🫙' }], answer: 'shui', add: ['🥛'], tip: { zh: '水淀粉分两三次淋入，芡汁才薄薄挂住豆腐。', en: 'Add starch water in two or three rounds so it clings lightly.' } },
      { type: 'stir', target: 6, seconds: 9, word: '轻轻推', zh: '用锅铲轻轻推锅，让芡汁均匀（豆腐怕翻，别用力炒）。', py: 'Yòng guōchǎn qīng qīng tuī guō.', en: 'Gently push the tofu around with the spatula.', add: ['🥄'], tip: { zh: '这是川菜里"温柔"的一步。', en: 'The gentlest step in Sichuan cooking.' } },
      { type: 'finish', zh: '关火，撒上花椒粉、蒜苗和葱花，装盘上桌！', py: 'Guān huǒ, sǎ shàng huājiāofěn, suànmiáo hé cōnghuā.', en: 'Turn off the heat, sprinkle pepper, garlic sprouts and scallion, then serve.', add: ['🫘', '🌿'], tip: { zh: '花椒粉最后撒，麻香才"活"。', en: 'Pepper powder goes on last so the numbing aroma stays alive.' } }
    ]
  },

  /* ==================== 2. 宫保鸡丁 ==================== */
  {
    id: 'gongbao', name: '宫保鸡丁', py: 'Gōngbǎo jīdīng', en: 'Kung Pao Chicken',
    emoji: '🍗', plate: '🍛', color: '#e2703a',
    flavorId: 'hula', flavor: '糊辣味 + 荔枝味', flavorPy: 'húlà wèi', heat: 2, difficulty: 2, minutes: 25,
    region: '成都 · 官府菜', tags: ['国际知名', '甜酸微辣', '宴客菜'],
    story: {
      zh: '清朝光绪年间，贵州人丁宝桢任四川总督，官衔是"太子少保"（尊称"宫保"）。相传这道菜出自他家的厨师：鸡丁配上干辣椒、花椒和花生米，甜酸里带着糊辣香。后来人们就用他的尊称叫它"宫保鸡丁"。它属于"糊辣荔枝味"：干辣椒炒到棕红，糖和醋的比例大约是 1 : 1.5，吃起来先酸后甜，像荔枝。',
      py: 'Qīngcháo guānyuán Dīng Bǎozhēn dāngguo Sìchuān zǒngdū, guānxián shì "Tàizǐ Shǎobǎo", rén chēng "Dīng Gōngbǎo".',
      en: 'In the Guangxu reign of the Qing dynasty, Ding Baozhen — a native of Guizhou — served as governor of Sichuan. His honorary title was "Gongbao" (Guardian of the Heir Apparent). The dish is said to come from his household kitchen: diced chicken with dried chili, Sichuan pepper and peanuts, sweet-sour with a toasted-chili aroma. It became "Gongbao Chicken". Its flavour is "toasted chili + lychee": chili fried deep red, sugar to vinegar roughly 1 : 1.5, sour first, then sweet.'
    },
    prep: [
      { ing: 'jiwing', qty: '300 克', prep: 'qieding', note: { zh: '先切条再切丁，大小像骰子。', en: 'Cut into strips, then into dice.' } },
      { ing: 'dacong', qty: '1 根', prep: 'qieduan', note: { zh: '切成 1.5 厘米的"葱丁"。', en: 'Cut into 1.5 cm "scallion dice".' } },
      { ing: 'gansuan', qty: '10 个', prep: 'qieduan', note: { zh: '干辣椒剪成段，抖掉辣椒籽免得发苦。', en: 'Snip chili into sections and shake out the seeds.' } },
      { ing: 'huajiao', qty: '1 小勺', prep: 'chaoxiang', note: { zh: '和干辣椒一起下油，炸出香味。', en: 'Goes into the oil with the chili.' } },
      { ing: 'dasuan', qty: '3 瓣', prep: 'qiepian', note: { zh: '切片备用。', en: 'Slice and set aside.' } },
      { ing: 'shengjiang', qty: '1 小块', prep: 'qiepian', note: { zh: '切片，和蒜一起下锅。', en: 'Slice; goes in with the garlic.' } },
      { ing: 'huashengmi', qty: '50 克', prep: 'chaoxiang', note: { zh: '油炸或干炒到酥脆，最后才下锅。', en: 'Fry or toast until crisp; it goes in at the very end.' } },
      { ing: 'dianfen', qty: '1 大勺', prep: 'tiaozhi', note: { zh: '和糖、醋、生抽调成"碗汁"。', en: 'Mix with sugar, vinegar and soy sauce into a sauce bowl.' } }
    ],
    seasonings: ['ganlajiao', 'huajiao', 'shengchou', 'xiangcu', 'baitang', 'liaojiu', 'dianfen', 'shiyongyou', 'huashengmi'],
    seasonQty: { ganlajiao: '10 个，剪段去籽', huajiao: '1 小勺', shengchou: '2 勺', xiangcu: '1.5 勺', baitang: '1 勺（糖醋约 1 : 1.5）', liaojiu: '1 勺', dianfen: '半勺，碗汁里用', shiyongyou: '30 毫升', huashengmi: '50–80 克，关火后下' },
    flavorTask: {
      question: { zh: '"荔枝味"的碗汁，最重要的是哪两样？', en: 'The "lychee" sauce bowl needs which two?' },
      options: [
        { zh: '白糖 + 香醋', emoji: '🍬🫙', correct: true },
        { zh: '花椒 + 孜然', emoji: '🫘' },
        { zh: '豆豉 + 甜面酱', emoji: '🫘🥫' }
      ],
      explain: { zh: '糖和醋的比例是 1 : 1 左右，先酸后甜，就像吃荔枝。', en: 'Roughly equal sugar and vinegar: sour first, sweet after — like a lychee.' }
    },
    tips: [
      { zh: '"碗汁"要提前调好，川菜爆炒很快，来不及一样一样加。', en: 'Mix the sauce beforehand — Sichuan stir-frying is too fast for one-by-one seasoning.' },
      { zh: '花生米最后放，才能保持又香又脆。', en: 'Peanuts go in last, so they stay crunchy.' }
    ],
    steps: [
      { type: 'heat', heat: 'zhong', zh: '中火下油，先炸香干辣椒和花椒。', py: 'Zhōng huǒ xià yóu, zhà xiāng gān làjiāo hé huājiāo.', en: 'Add oil over medium heat, then bloom the dried chili and pepper.', add: ['🫗'], tip: { zh: '中火慢炸，辣椒变成棕红色就好，黑了就苦。', en: 'Medium heat: chili should turn deep red, never black.' } },
      { type: 'order', zh: '先下锅的是……', py: 'Xiān xià guō de shì…', en: 'First into the wok…', options: [{ id: 'lajiao', zh: '干辣椒 + 花椒', emoji: '🌶️🫘' }, { id: 'ji', zh: '鸡丁', emoji: '🍗' }, { id: 'huasheng', zh: '花生米', emoji: '🥜' }], answer: 'lajiao', add: ['🌶️', '🫘'], tip: { zh: '糊辣香是这道菜的"灵魂香味"。', en: 'Toasted chili fragrance is the soul of this dish.' } },
      { type: 'heat', heat: 'da', zh: '现在把火开大，下鸡丁爆炒！', py: 'Xiànzài bǎ huǒ kāi dà, xià jīdīng bàochǎo!', en: 'Turn up the heat and add the chicken.', add: ['🍗'], tip: { zh: '大火才能"锁住"肉里的水分，鸡肉才嫩。', en: 'High heat seals in moisture — that is how the chicken stays tender.' } },
      { type: 'stir', target: 14, seconds: 11, word: '翻炒', zh: '快速翻炒，鸡丁变色就差不多熟了。', py: 'Kuàisù fānchǎo.', en: 'Stir fast until the chicken changes colour.', add: ['🥄'], tip: { zh: '手要快，锅气就是这么炒出来的。', en: 'Move fast — that is where "wok breath" comes from.' } },
      { type: 'order', zh: '鸡肉变色了，接着下……', py: 'Jīròu biànsè le, jiēzhe xià…', en: 'The chicken has changed colour — add…', options: [{ id: 'cong', zh: '葱丁 + 姜蒜片', emoji: '🌱' }, { id: 'huasheng', zh: '花生米', emoji: '🥜' }, { id: 'cu', zh: '香醋', emoji: '🫙' }], answer: 'cong', add: ['🌱'], tip: { zh: '葱姜蒜是川菜的"三香"，去腥增香。', en: 'Scallion, ginger and garlic are the "three aromatics".' } },
      { type: 'season', zh: '该调味了，倒进哪一样？', py: 'Gāi tiáowèi le, dào jìn nǎ yí yàng?', en: 'Time to season — pour in what?', options: [{ id: 'wanzhi', zh: '提前调好的碗汁', emoji: '🥣' }, { id: 'shui', zh: '一碗清水', emoji: '💧' }, { id: 'hongyou', zh: '半瓶红油', emoji: '🫙' }], answer: 'wanzhi', add: ['🥣'], tip: { zh: '碗汁要沿锅边淋一圈，香气一下就起来了。', en: 'Pour it around the rim of the wok — the aroma jumps immediately.' } },
      { type: 'wait', seconds: 5, label: '大火收汁 30 秒', zh: '大火收汁，看到汁变少、油变亮就好了。', py: 'Dà huǒ shōu zhī.', en: 'Reduce the sauce over high heat until it turns glossy.', add: ['💨'], tip: { zh: '川菜讲"亮油"，盘子里油亮但不腻。', en: 'Sichuan chefs aim for a glossy, not greasy, finish.' } },
      { type: 'finish', zh: '关火，倒入花生米，快速拌匀，出锅！', py: 'Guān huǒ, dào rù huāshēngmǐ, kuàisù bàn yún, chū guō!', en: 'Turn off the heat, add peanuts, toss and plate.', add: ['🥜'], tip: { zh: '花生米最后放，脆！', en: 'Peanuts last — crunch guaranteed.' } }
    ]
  },

  /* ==================== 3. 回锅肉 ==================== */
  {
    id: 'huiguo', name: '回锅肉', py: 'Huíguōròu', en: 'Twice-cooked Pork',
    emoji: '🥓', plate: '🍽️', color: '#b4451f',
    flavorId: 'jiachang', flavor: '家常味', flavorPy: 'jiācháng wèi', heat: 2, difficulty: 2, minutes: 30,
    region: '四川 · 家家会做', tags: ['川菜第一菜', '家常味', '超级下饭'],
    story: {
      zh: '"回锅"就是"再回到锅里"。这道菜讲究"一煮二炒三回锅"：先把整块猪肉（常用二刀肉或五花肉）冷水下锅煮到八成熟，晾凉后切成薄片，再回锅煸炒，加郫县豆瓣、豆豉、甜面酱和蒜苗。相传这个做法和过去祭祖用的白水煮肉有关——煮好的肉没什么味道，人们就切片回锅再炒一次。判断手艺的标准很形象：肉片炒到卷起来，像一个个小灯盏，叫"灯盏窝"。',
      py: '"Huí guō" jiù shì "zài huí dào guō lǐ".',
      en: '"Hui guo" means "back into the wok". The dish follows three steps: boil, fry, then return to the wok. A block of pork (hind leg or belly) is boiled from cold water until 80% cooked, cooled, sliced thin, then fried with Pixian bean paste, fermented black beans, sweet wheat paste and garlic sprouts. Legend links it to the plain boiled pork used in ancestral offerings. The test of skill: slices curl into little lamp shapes.'
    },
    prep: [
      { ing: 'houtuirou', qty: '300 克', prep: 'qiepian', note: { zh: '先整块煮到八成熟，凉一点再切薄片（越薄越好）。', en: 'Boil the block until 80% cooked, cool slightly, then slice thin.' } },
      { ing: 'suanmiao', qty: '3 根', prep: 'qieduan', note: { zh: '斜切成段，白色的部分先下锅。', en: 'Cut on the diagonal; the white parts go in first.' } },
      { ing: 'pixiandouban', qty: '1.5 大勺', prep: 'duosui', note: { zh: '豆瓣酱剁细，炒起来更容易出红油。', en: 'Chop the bean paste finely so it releases red oil.' } },
      { ing: 'doushi', qty: '1 小勺', prep: 'duosui', note: { zh: '剁碎，增加"陈香"。', en: 'Chop for a deeper savoury note.' } },
      { ing: 'dasuan', qty: '3 瓣', prep: 'qiepian', note: { zh: '蒜切片。', en: 'Slice the garlic.' } },
      { ing: 'shengjiang', qty: '3 片', prep: 'qiepian', note: { zh: '姜切片，煮肉时也要用。', en: 'Slice; also used when boiling the pork.' } },
      { ing: 'xiaocong', qty: '少许', prep: 'qieduan', note: { zh: '葱段，煮肉去腥。', en: 'Scallion sections, for boiling the pork.' } }
    ],
    seasonings: ['pixiandouban', 'doushi', 'tianmianjiang', 'shengchou', 'liaojiu', 'baitang', 'shiyongyou'],
    seasonQty: { pixiandouban: '1.5 大勺', doushi: '1 小勺', tianmianjiang: '1 小勺', shengchou: '1 勺', liaojiu: '1 勺', baitang: '半勺', shiyongyou: '15 毫升（肉自己会出油）' },
    flavorTask: {
      question: { zh: '回锅肉已经放了豆瓣酱和甜面酱，还需要放很多盐吗？', en: 'The bean paste and sweet paste are already salty. Do we add lots of salt?' },
      options: [
        { zh: '不用，或少放一点', emoji: '🧂', correct: true },
        { zh: '要放两大勺', emoji: '🧂🧂' },
        { zh: '要放半碗', emoji: '🥣' }
      ],
      explain: { zh: '豆瓣酱、豆豉、甜面酱、生抽都有盐，川菜家常味的秘诀是"咸鲜"而不是"死咸"。', en: 'Bean paste, black beans, sweet paste and soy sauce are all salty. Home-style means savoury, not salty.' }
    },
    tips: [
      { zh: '肉要煮到"筷子能插进去、但还有一点硬"，才好切薄片。', en: 'Boil until a chopstick goes in but the meat is still firm — that slices best.' },
      { zh: '肉片一定要炒到卷起来（灯盏窝），多余的油煸出来，菜才不腻。', en: 'Fry until the slices curl so the extra fat renders out.' }
    ],
    steps: [
      { type: 'heat', heat: 'zhong', zh: '锅里放一点点油，下肉片，中火慢煸。', py: 'Guō lǐ fàng yì diǎndiǎn yóu, xià ròupiàn, zhōng huǒ màn biān.', en: 'A little oil, add the pork slices, fry gently over medium heat.', add: ['🫗', '🥓'], tip: { zh: '肉自己会出油，油别放多。', en: 'The pork releases its own fat — go easy on the oil.' } },
      { type: 'wait', seconds: 6, label: '煸 2 分钟，等肉片卷起来', zh: '慢慢煸，看到肉片卷成"小灯盏"、锅里有清亮的油。', py: 'Màn man biān, kàn dào ròupiàn juǎn qǐlái.', en: 'Fry until the slices curl into "little lamps" and clear oil appears.', add: ['💨'], tip: { zh: '"煸"就是让水分跑掉、香味出来。', en: '"Biān" drives off water and builds aroma.' } },
      { type: 'order', zh: '肉片卷起来了，现在下……', py: 'Ròupiàn juǎn qǐlái le, xiànzài xià…', en: 'Slices are curled — now add…', options: [{ id: 'douban', zh: '郫县豆瓣酱', emoji: '🥫' }, { id: 'suanmiao', zh: '蒜苗', emoji: '🌿' }, { id: 'cu', zh: '香醋', emoji: '🫙' }], answer: 'douban', add: ['🥫'], tip: { zh: '豆瓣酱要炒出红油，回锅肉的红色就是这么来的。', en: 'Fry the bean paste until red oil appears — that is where the colour comes from.' } },
      { type: 'order', zh: '再加一样提甜香……', py: 'Zài jiā yí yàng tí tiánxiāng…', en: 'Add one more for sweet depth…', options: [{ id: 'tianmianjiang', zh: '甜面酱 + 豆豉', emoji: '🥫' }, { id: 'baitang', zh: '两大勺白糖', emoji: '🍬' }, { id: 'cu', zh: '香醋', emoji: '🫙' }], answer: 'tianmianjiang', add: ['🥫'], tip: { zh: '甜面酱和豆豉让味道更厚，这就是"家常味"。', en: 'Sweet paste and black beans add depth — that is "home-style".' } },
      { type: 'heat', heat: 'da', zh: '转大火，下蒜苗，快速炒到"断生"。', py: 'Zhuǎn dà huǒ, xià suànmiáo.', en: 'Turn to high heat and add the garlic sprouts.', add: ['🌿'], tip: { zh: '"断生"就是刚熟但还脆，颜色还是翠绿的。', en: '"Ready" means just cooked and still crisp and green.' } },
      { type: 'stir', target: 10, seconds: 9, word: '翻炒', zh: '快速翻炒，让蒜苗和肉片拌匀。', py: 'Kuàisù fānchǎo.', en: 'Stir briskly so everything mixes.', add: ['🥄'], tip: { zh: '蒜苗炒久了会变黄、变软，就不好看了。', en: 'Overcooked sprouts go yellow and limp.' } },
      { type: 'season', zh: '最后要放多少盐？', py: 'Zuìhòu yào fàng duōshao yán?', en: 'How much salt at the end?', options: [{ id: 'none', zh: '不用放，或少放一点', emoji: '🤏' }, { id: 'much', zh: '两大勺', emoji: '🧂🧂' }, { id: 'bowl', zh: '半碗', emoji: '🥣' }], answer: 'none', add: ['🍶'], tip: { zh: '豆瓣、豆豉、甜面酱、生抽都很咸，盐要省着放。', en: 'Everything in the wok is already salty — restrain the salt.' } },
      { type: 'finish', zh: '闻到香味了！出锅装盘，配一碗米饭。', py: 'Wén dào xiāngwèi le! Chū guō zhuāngpán.', en: 'Smells great! Plate it up and serve with rice.', add: ['🍚'], tip: { zh: '在四川，回锅肉和米饭是"最佳搭档"。', en: 'In Sichuan, twice-cooked pork and rice are best partners.' } }
    ]
  },

  /* ==================== 4. 鱼香肉丝 ==================== */
  {
    id: 'yuxiang', name: '鱼香肉丝', py: 'Yúxiāng ròusī', en: 'Fish-fragrant Pork Slivers',
    emoji: '🥘', plate: '🍛', color: '#c2185b',
    flavorId: 'yuxiang', flavor: '鱼香味', flavorPy: 'yúxiāng wèi', heat: 2, difficulty: 3, minutes: 30,
    region: '四川 · 家常菜', tags: ['没有鱼', '酸甜微辣', '考刀工'],
    story: {
      zh: '第一次听到"鱼香肉丝"的留学生都会问：鱼在哪里？其实"鱼香"不是鱼的香味，而是四川人做鱼时用的那一套调料——泡椒、姜、葱、蒜、糖、醋。后来有人用同样的调料来炒肉丝，就叫"鱼香肉丝"。所以这道菜里有咸、甜、酸、辣，还有浓浓的姜葱蒜香，是一条鱼都没有的"鱼香"。',
      py: '"Yúxiāng" bú shì yú de xiāngwèi, ér shì Sìchuān rén zuò yú shí yòng de nà tào tiáoliào.',
      en: 'Students always ask: where is the fish? "Fish-fragrant" is not the smell of fish — it is the seasoning set Sichuan people use when cooking fish: pickled chili, ginger, scallion, garlic, sugar and vinegar. Cook pork slivers the same way and you get "fish-fragrant pork" with no fish at all.'
    },
    prep: [
      { ing: 'zhuliji', qty: '300 克', prep: 'qiesi', note: { zh: '先冻硬一点再切，能切得更细更匀。', en: 'Chill it slightly first for even, fine shreds.' } },
      { ing: 'paojiao', qty: '6 个', prep: 'duosui', note: { zh: '泡椒剁碎，这是鱼香味的灵魂。', en: 'Chop the pickled chili — the soul of this flavour.' } },
      { ing: 'muer', qty: '一小把', prep: 'qiesi', note: { zh: '泡发后切丝。', en: 'Soak until soft, then shred.' } },
      { ing: 'dongsun', qty: '100 克', prep: 'qiesi', note: { zh: '切丝，和木耳一样粗细。', en: 'Shred to the same width as the wood ear.' } },
      { ing: 'shengjiang', qty: '1 小块', prep: 'duomo', note: { zh: '剁成姜末。', en: 'Mince.' } },
      { ing: 'dasuan', qty: '4 瓣', prep: 'duomo', note: { zh: '剁成蒜末。', en: 'Mince.' } },
      { ing: 'xiaocong', qty: '2 根', prep: 'duomo', note: { zh: '切葱花（葱白葱绿分开更好）。', en: 'Chop; separating white and green is even better.' } },
      { ing: 'dianfen', qty: '1 大勺', prep: 'tiaozhi', note: { zh: '糖、醋、生抽、淀粉调成鱼香碗汁。', en: 'Mix sugar, vinegar, soy sauce and starch into the sauce bowl.' } }
    ],
    seasonings: ['paojiao', 'shengchou', 'xiangcu', 'baitang', 'liaojiu', 'dianfen', 'jiangmo', 'suanmo', 'conghua', 'shiyongyou'],
    seasonQty: { paojiao: '6 个，剁碎', shengchou: '2 勺', xiangcu: '1.5 勺', baitang: '1 勺', liaojiu: '1 勺（腌肉用）', dianfen: '1 大勺（上浆 + 碗汁）', jiangmo: '1 小勺', suanmo: '1 大勺', conghua: '2 根', shiyongyou: '30 毫升' },
    flavorTask: {
      question: { zh: '调一碗"鱼香味汁"，需要哪几样？', en: 'To build a fish-fragrant sauce, which set do you need?' },
      options: [
        { zh: '泡椒 + 糖 + 醋 + 姜葱蒜', emoji: '🌶️🍬🫙', correct: true },
        { zh: '花椒 + 芝麻酱 + 香油', emoji: '🫘🥫' },
        { zh: '牛油 + 豆瓣 + 孜然', emoji: '🧈' }
      ],
      explain: { zh: '泡椒给辣、糖醋给酸甜、姜葱蒜给香——这就是"鱼香"。', en: 'Pickled chili for heat, sugar-vinegar for sweet-sour, aromatics for fragrance — that is fish-fragrant.' }
    },
    tips: [
      { zh: '肉丝切得越匀，炒的时候熟得越一致。', en: 'Even shreds cook evenly.' },
      { zh: '给肉丝上浆（料酒+盐+淀粉），炒出来又滑又嫩。', en: 'Velvet the pork with wine, salt and starch for a silky texture.' }
    ],
    steps: [
      { type: 'season', zh: '肉丝要先"上浆"，放什么？', py: 'Ròusī yào xiān "shàng jiāng", fàng shénme?', en: 'First velvet the pork — with what?', options: [{ id: 'jiang', zh: '料酒 + 盐 + 水淀粉', emoji: '🥣' }, { id: 'cu', zh: '香醋 + 糖', emoji: '🫙' }, { id: 'shui', zh: '只用清水', emoji: '💧' }], answer: 'jiang', add: ['🥣'], tip: { zh: '抓匀腌 10 分钟，肉会变得又滑又嫩。', en: 'Mix and rest 10 minutes for a silky texture.' } },
      { type: 'heat', heat: 'da', zh: '油温六成热（筷子下去有小泡泡），下肉丝快速划散。', py: 'Yóuwēn liù chéng rè, xià ròusī kuàisù huásàn.', en: 'When the oil is ready, add the pork and separate the shreds fast.', add: ['🫗', '🥩'], tip: { zh: '油太凉肉粘锅，油太热肉就老了。', en: 'Cold oil sticks; too-hot oil toughens the meat.' } },
      { type: 'stir', target: 12, seconds: 10, word: '划散', zh: '用筷子或锅铲快速划散，肉丝变白就先盛出来。', py: 'Yòng kuàizi kuàisù huásàn.', en: 'Separate quickly; take the pork out once it turns pale.', add: ['🥄'], tip: { zh: '先盛出、后回锅，肉才嫩。', en: 'Out first, back in later — that keeps it tender.' } },
      { type: 'order', zh: '锅里留一点油，先下哪样炒香？', py: 'Guō lǐ liú yìdiǎn yóu, xiān xià nǎ yàng chǎo xiāng?', en: 'Leave a little oil — what goes in to build aroma?', options: [{ id: 'paojiao', zh: '泡椒 + 姜蒜末', emoji: '🌶️' }, { id: 'muer', zh: '木耳丝', emoji: '🍄' }, { id: 'cong', zh: '葱花', emoji: '🌱' }], answer: 'paojiao', add: ['🌶️'], tip: { zh: '炒到油变红，鱼香味就出来了。', en: 'Fry until the oil turns red — there is your fish-fragrant aroma.' } },
      { type: 'order', zh: '接着下配料……', py: 'Jiēzhe xià pèiliào…', en: 'Then the vegetables…', options: [{ id: 'shucai', zh: '木耳丝 + 冬笋丝', emoji: '🍄🎋' }, { id: 'tang', zh: '白糖', emoji: '🍬' }, { id: 'cu', zh: '香醋', emoji: '🫙' }], answer: 'shucai', add: ['🍄', '🎋'], tip: { zh: '一黑一白，颜色好看，口感也脆。', en: 'Black and white for colour, and both stay crunchy.' } },
      { type: 'season', zh: '把肉丝倒回锅里，加入……', py: 'Bǎ ròusī dào huí guō lǐ, jiārù…', en: 'Return the pork and add…', options: [{ id: 'wanzhi', zh: '鱼香碗汁', emoji: '🥣' }, { id: 'shui', zh: '清水', emoji: '💧' }, { id: 'jiangyou', zh: '老抽', emoji: '🍶' }], answer: 'wanzhi', add: ['🥩', '🥣'], tip: { zh: '碗汁下锅后会马上变稠，动作要快。', en: 'The sauce thickens instantly — work fast.' } },
      { type: 'wait', seconds: 5, label: '大火收汁 20 秒', zh: '大火翻炒收汁，让每根肉丝都裹上汁。', py: 'Dà huǒ shōu zhī.', en: 'Reduce over high heat so every shred is coated.', add: ['💨'], tip: { zh: '汁要"亮、匀、不多"，盘底不能一汪水。', en: 'The sauce should be glossy and even, with no puddle on the plate.' } },
      { type: 'finish', zh: '撒上葱花，出锅！尝尝有没有鱼的香味？', py: 'Sǎ shàng cōnghuā, chū guō!', en: 'Sprinkle the scallion and serve — can you smell the "fish"?', add: ['🌱'], tip: { zh: '记住：鱼香肉丝里没有鱼，只有做鱼的方法。', en: 'Remember: no fish inside, only the method for cooking fish.' } }
    ]
  },

  /* ==================== 5. 水煮牛肉 ==================== */
  {
    id: 'shuizhu', name: '水煮牛肉', py: 'Shuǐzhǔ niúròu', en: 'Poached Beef in Chili Oil',
    emoji: '🥩', plate: '🍲', color: '#b3121f',
    flavorId: 'mala', flavor: '麻辣味', flavorPy: 'málà wèi', heat: 4, difficulty: 3, minutes: 40,
    region: '自贡 · 小河帮（盐帮菜）', tags: ['盐帮菜', '重口味', '冬季暖身'],
    story: {
      zh: '自贡是四川的"盐都"，盐井多、牛也多。相传早在北宋时期，盐场用牛拉车汲卤，牛老了、干不动了就被淘汰；盐工把牛肉切片，放进盐水里加花椒、辣椒煮着吃，简单、便宜、又能补力气，这就是水煮牛肉最早的样子。后来厨师把它做成"牛肉在汤里、辣椒花椒在面上、最后淋一勺滚油"的版本，名字虽然叫"水煮"，其实一点也不清淡。',
      py: 'Zìgòng shì Sìchuān de "yándū", yánchǎng gōngrén yòng niúròu jiā làjiāo huājiāo zhǔ chéng yí dà guō.',
      en: 'Zigong was Sichuan\'s salt capital: many salt wells, many cattle. Legend says that as early as the Northern Song dynasty, oxen were used to lift brine; when they grew too old they were culled, and salt workers sliced the beef and boiled it in brine with Sichuan pepper and chili — simple, cheap and strengthening. That was the earliest "water-boiled beef". Later cooks refined it: beef in broth, chili and pepper on top, finished with a ladle of smoking oil.'
    },
    prep: [
      { ing: 'niuliji', qty: '300 克', prep: 'qiepian', note: { zh: '逆着纹路切薄片，越薄越嫩。', en: 'Slice thin against the grain for tenderness.' } },
      { ing: 'wosun', qty: '1 根', prep: 'qiepian', note: { zh: '切片，垫在碗底。', en: 'Slice and use as the bed for the beef.' } },
      { ing: 'paojiao', qty: '4 个', prep: 'duosui', note: { zh: '剁碎，和豆瓣酱一起炒。', en: 'Chop; fries together with the bean paste.' } },
      { ing: 'pixiandouban', qty: '2 大勺', prep: 'duosui', note: { zh: '剁细，炒出红油。', en: 'Chop fine to release red oil.' } },
      { ing: 'gansuan', qty: '8 个', prep: 'qieduan', note: { zh: '剪段，最后淋油用。', en: 'Snip into sections for the final oil pour.' } },
      { ing: 'dasuan', qty: '6 瓣', prep: 'duomo', note: { zh: '蒜末最后撒在肉上。', en: 'Minced garlic is scattered over the beef at the end.' } },
      { ing: 'huajiao', qty: '1 大勺', prep: 'mofen', note: { zh: '炒香后磨成花椒粉。', en: 'Toast then grind.' } },
      { ing: 'dianfen', qty: '2 大勺', prep: 'shangjiang', note: { zh: '加水调匀，给牛肉上浆。', en: 'Mix with water to velvet the beef.' } }
    ],
    seasonings: ['pixiandouban', 'paojiao', 'ganlajiao', 'lajiaomian', 'huajiaofen', 'shengchou', 'liaojiu', 'dianfen', 'shiyongyou', 'yan'],
    seasonQty: { pixiandouban: '2 大勺', paojiao: '4 个', ganlajiao: '8 个', lajiaomian: '1 大勺（最后撒）', huajiaofen: '1 小勺（最后撒）', shengchou: '1 勺', liaojiu: '1 勺', dianfen: '2 大勺（牛肉上浆）', shiyongyou: '60 毫升，其中一半用来最后淋油', yan: '2 克' },
    flavorTask: {
      question: { zh: '水煮牛肉最后"滋——"的一声，是把什么淋上去？', en: 'The final "zzz" sound comes from pouring what?' },
      options: [
        { zh: '烧到冒烟的热油', emoji: '🫗🔥', correct: true },
        { zh: '一碗冷水', emoji: '💧' },
        { zh: '香醋', emoji: '🫙' }
      ],
      explain: { zh: '热油淋在辣椒面和蒜末上，香味被"激"出来，这叫声香。', en: 'Smoking oil poured over chili flakes and garlic "wakes up" the aroma.' }
    },
    tips: [
      { zh: '牛肉上浆后腌 10 分钟，下锅只要煮到变色，久了就老。', en: 'Velvet and rest 10 minutes; cook only until it changes colour.' },
      { zh: '垫底的菜可以换：豆芽、莴笋、白菜都行。', en: 'The vegetable bed is flexible: bean sprouts, celtuce, cabbage.' }
    ],
    steps: [
      { type: 'season', zh: '牛肉片要先怎么处理？', py: 'Niúròupiàn yào xiān zěnme chǔlǐ?', en: 'How do we prepare the beef first?', options: [{ id: 'shangjiang', zh: '料酒 + 盐 + 水淀粉，抓匀腌制', emoji: '🥣' }, { id: 'shuizhu', zh: '直接用水煮 10 分钟', emoji: '💧' }, { id: 'cu', zh: '先用醋泡', emoji: '🫙' }], answer: 'shangjiang', add: ['🥣'], tip: { zh: '上浆是牛肉嫩不嫩的关键。', en: 'Velveting decides whether the beef is tender.' } },
      { type: 'heat', heat: 'zhong', zh: '中火下油，炒香豆瓣酱、泡椒和姜蒜。', py: 'Zhōng huǒ xià yóu, chǎo xiāng dòubànjiàng, pàojiao hé jiāngsuàn.', en: 'Medium heat: fry the bean paste, pickled chili, ginger and garlic.', add: ['🫗', '🥫'], tip: { zh: '中火慢慢炒，红油才会红亮。', en: 'Medium heat gives a bright red oil.' } },
      { type: 'order', zh: '炒出红油后，加什么煮汤？', py: 'Chǎo chū hóngyóu hòu, jiā shénme zhǔ tāng?', en: 'After the red oil appears, what do we add?', options: [{ id: 'gaotang', zh: '高汤或清水', emoji: '🍲' }, { id: 'cu', zh: '香醋', emoji: '🫙' }, { id: 'tang', zh: '白糖', emoji: '🍬' }], answer: 'gaotang', add: ['🍲'], tip: { zh: '汤要多一点，牛肉要在汤里"游泳"。', en: 'Use plenty of stock — the beef should swim in it.' } },
      { type: 'wait', seconds: 5, label: '下莴笋片垫底，煮 1 分钟', zh: '把莴笋片放进汤里煮一下，捞出来铺在碗底。', py: 'Bǎ wōsǔn piàn fàng jìn tāng lǐ zhǔ yíxià.', en: 'Cook the celtuce in the broth, then lay it in the bowl.', add: ['🥬'], tip: { zh: '垫底的菜吸了汤汁最好吃。', en: 'The vegetable bed soaks up the broth — the best bite.' } },
      { type: 'heat', heat: 'zhong', zh: '转中火，把牛肉片一片片放进汤里，煮到变色就关火。', py: 'Zhuǎn zhōng huǒ, bǎ niúròupiàn yí piàn piàn fàng jìn tāng lǐ.', en: 'Medium heat: slide in the beef slices and stop when they change colour.', add: ['🥩'], tip: { zh: '千万别煮久，牛肉一老就"柴"了。', en: 'Do not overcook — beef turns tough fast.' } },
      { type: 'order', zh: '牛肉盛进碗里，上面撒什么？', py: 'Niúròu chéng jìn wǎn lǐ, shàngmiàn sǎ shénme?', en: 'Beef in the bowl — what goes on top?', options: [{ id: 'mian', zh: '辣椒面 + 花椒粉 + 蒜末', emoji: '🌶️🧄' }, { id: 'tang', zh: '白糖', emoji: '🍬' }, { id: 'cu', zh: '香醋', emoji: '🫙' }], answer: 'mian', add: ['🌶️', '🧄'], tip: { zh: '这三样等着被热油"激"香。', en: 'These three are waiting for the hot oil.' } },
      { type: 'heat', heat: 'da', zh: '另起锅，大火把油烧到冒烟，然后淋在辣椒面上！', py: 'Lìng qǐ guō, dà huǒ bǎ yóu shāo dào mào yān, ránhòu lín zài làjiāomiàn shang!', en: 'In another pan, heat oil until it smokes, then pour it over the chili flakes!', add: ['🫗'], tip: { zh: '"滋——"的一声，就是水煮牛肉的高光时刻。', en: 'That sizzle is the star moment of the dish.' } },
      { type: 'finish', zh: '撒上葱花和花椒粉，端上桌，趁热吃！', py: 'Sǎ shàng cōnghuā hé huājiāofěn, duān shàng zhuō, chèn rè chī!', en: 'Sprinkle scallion and pepper, take it to the table and eat it hot.', add: ['🌱', '🫘'], tip: { zh: '这道菜要"烫"着吃，凉了香味就少一半。', en: 'Eat it scalding hot — half the aroma fades when cold.' } }
    ]
  },

  /* ==================== 6. 担担面 ==================== */
  {
    id: 'dandan', name: '担担面', py: 'Dàndàn miàn', en: 'Dan Dan Noodles',
    emoji: '🍜', plate: '🍜', color: '#e08a1e',
    flavorId: 'mala', flavor: '麻辣味（面食）', flavorPy: 'málà wèi', heat: 3, difficulty: 1, minutes: 30,
    region: '自贡 · 街头小吃', tags: ['小吃', '一碗面', '吃前要拌'],
    story: {
      zh: '据《成都通览》记载，担担面最早出现在 1841 年，由自贡小贩陈包包创制（也有说法认为它起源于川东达州一带）。他用一根扁担挑着面摊走街串巷：一头是炉子和锅，一头是面条和碗料，边走边喊"担担面咯"。担担面是"干拌"的，红油、酱油、醋、花椒粉都藏在碗底，上面还有宜宾芽菜和肉臊子，所以吃之前一定要拌一拌。',
      py: 'Yì bǎi duō nián qián, Zìgòng yǒu ge jiào Chén Bāobāo de rén, yòng yì gēn biǎndan tiāo zhe miàntān mài miàn.',
      en: 'According to "Chengdu Tonglan", dan dan noodles first appeared in 1841, created by a Zigong street vendor named Chen Baobao (some accounts place its origin in eastern Sichuan instead). He carried his stall on a shoulder pole — stove on one end, noodles and bowls on the other. The noodles are served "dry-tossed": chili oil, soy, vinegar and pepper hide at the bottom of the bowl with Yibin preserved sprout and pork topping, so mix well before eating.'
    },
    prep: [
      { ing: 'miantiao', qty: '200 克', prep: 'xi', note: { zh: '细面条最好，也可以用碱水面。', en: 'Thin noodles are best, ideally alkaline noodles.' } },
      { ing: 'roumo', qty: '100 克', prep: 'duomo', note: { zh: '猪肉剁成末，炒成"臊子"。', en: 'Mince the pork to make the "saozi" topping.' } },
      { ing: 'yacai', qty: '1 大勺', prep: 'duosui', note: { zh: '芽菜剁碎，川味小吃的秘密武器。', en: 'Chop the preserved mustard sprout — the secret weapon.' } },
      { ing: 'huashengmi', qty: '30 克', prep: 'paisui', note: { zh: '炒香后拍碎，撒在面上。', en: 'Toast then crush to sprinkle on top.' } },
      { ing: 'xiaocong', qty: '2 根', prep: 'duomo', note: { zh: '切成葱花。', en: 'Chop into scallion flowers.' } },
      { ing: 'dasuan', qty: '3 瓣', prep: 'duomo', note: { zh: '蒜剁成末，放进碗底。', en: 'Mince and put in the bottom of the bowl.' } },
      { ing: 'zhimajiang', qty: '1 大勺', prep: 'tiaozhi', note: { zh: '用香油或温水慢慢调开。', en: 'Loosen with sesame oil or warm water.' } }
    ],
    seasonings: ['hongyou', 'zhimajiang', 'shengchou', 'xiangcu', 'baitang', 'huajiaofen', 'yacai', 'suanmo', 'conghua', 'huashengmi'],
    seasonQty: { hongyou: '1 勺', zhimajiang: '15 克，先用温水或香油调开', shengchou: '1 勺', xiangcu: '5 毫升', baitang: '半小勺', huajiaofen: '1 小勺', yacai: '30 克，炒进肉臊里', suanmo: '1 小勺（碗底）', conghua: '少许', huashengmi: '10 克，拍碎撒面' },
    flavorTask: {
      question: { zh: '担担面的调料在哪里？', en: 'Where do the seasonings hide in dan dan noodles?' },
      options: [
        { zh: '在碗底，吃前要拌一拌', emoji: '🥣', correct: true },
        { zh: '在面条上面，直接吃', emoji: '🍜' },
        { zh: '在旁边的碟子里', emoji: '🍽️' }
      ],
      explain: { zh: '把面条拌起来，碗底的麻辣、蒜香、芝麻酱才能裹住每一根面。', en: 'Toss it so the chili, garlic and sesame paste at the bottom coat every strand.' }
    },
    tips: [
      { zh: '面条煮到"断生"就行，太软不好吃。', en: 'Cook until just done — soft noodles lose the point.' },
      { zh: '臊子要炒到干香，才有担担面的味道。', en: 'Fry the pork topping until dry and fragrant.' }
    ],
    steps: [
      { type: 'heat', heat: 'zhong', zh: '中火下油，炒肉末，炒到干香。', py: 'Zhōng huǒ xià yóu, chǎo ròumò, chǎo dào gān xiāng.', en: 'Medium heat: fry the pork mince until dry and fragrant.', add: ['🫗', '⚪'], tip: { zh: '肉末炒干一点，才像"臊子"。', en: 'Dry it out — that is what makes a proper "saozi".' } },
      { type: 'order', zh: '肉末干了，加入……', py: 'Ròumò gān le, jiārù…', en: 'The pork is dry — now add…', options: [{ id: 'yacai', zh: '芽菜', emoji: '🥬' }, { id: 'tang', zh: '白糖', emoji: '🍬' }, { id: 'cu', zh: '香醋', emoji: '🫙' }], answer: 'yacai', add: ['🥬'], tip: { zh: '芽菜让臊子咸香有味，这是川味小吃的"隐藏队友"。', en: 'The preserved sprout gives that salty depth — the hidden teammate.' } },
      { type: 'season', zh: '碗底要先放什么？', py: 'Wǎndǐ yào xiān fàng shénme?', en: 'What goes into the bottom of the bowl first?', options: [{ id: 'diaoli', zh: '红油、生抽、醋、糖、花椒粉、蒜末、芝麻酱', emoji: '🥣' }, { id: 'shui', zh: '一碗清水', emoji: '💧' }, { id: 'yan', zh: '半碗盐', emoji: '🧂' }], answer: 'diaoli', add: ['🥣'], tip: { zh: '这碗"底料"才是担担面的灵魂。', en: 'This base is the soul of the dish.' } },
      { type: 'heat', heat: 'da', zh: '水烧开，下面条，保持大火。', py: 'Shuǐ shāo kāi, xià miàntiáo, bǎochí dà huǒ.', en: 'Boil the water and add the noodles over high heat.', add: ['💧', '🍜'], tip: { zh: '水一定要大开，面条才不会粘。', en: 'A rolling boil keeps the noodles from sticking.' } },
      { type: 'wait', seconds: 6, label: '煮面 2 分钟', zh: '煮到面条刚熟（断生），中间留一点点白心最好。', py: 'Zhǔ dào miàntiáo gāng shú (duàn shēng).', en: 'Cook until just done — a faint white core is ideal.', add: ['💨'], tip: { zh: '面条煮过头就"坨"了。', en: 'Overcooked noodles clump.' } },
      { type: 'stir', target: 8, seconds: 8, word: '挑面', zh: '用筷子把面条挑散，抖掉多余的水。', py: 'Yòng kuàizi bǎ miàntiáo tiāo sàn.', en: 'Lift and shake the noodles to drain.', add: ['🥢'], tip: { zh: '水太多会冲淡碗底的味汁。', en: 'Too much water dilutes the sauce base.' } },
      { type: 'finish', zh: '面条放进碗里，加臊子、花生碎和葱花，拌一拌再吃！', py: 'Miàntiáo fàng jìn wǎn lǐ, jiā sàozi, huāshēng suì hé cōnghuā, bàn yí bàn zài chī!', en: 'Put the noodles in the bowl, add the topping, peanuts and scallion. Mix before eating!', add: ['🥜', '🌱'], tip: { zh: '拌均匀，这碗面才算完成。', en: 'Only when it is fully mixed is the bowl complete.' } }
    ]
  },

  /* ==================== 7. 夫妻肺片 ==================== */
  {
    id: 'feipian', name: '夫妻肺片', py: 'Fūqī fèipiàn', en: 'Couple\'s Delight (Chili-oil Beef)',
    emoji: '🥗', plate: '🥗', color: '#8e2440',
    flavorId: 'hongyou', flavor: '红油味', flavorPy: 'hóngyóu wèi', heat: 3, difficulty: 3, minutes: 60,
    region: '成都 · 凉菜', tags: ['凉菜', '红油', '夫妻的故事'],
    story: {
      zh: '20 世纪 30 年代，成都长顺街一带有一对小夫妻摆摊卖凉拌牛杂：郭朝华和张田政。他们用牛头皮、牛心、牛舌、牛肚这些便宜的"边角料"，卤好以后切成薄片，淋上红油、花椒粉、芝麻和花生碎拌一拌，麻辣鲜香、价钱便宜，很快就出了名。因为最初叫"肺片"，又是夫妻俩卖的，大家就叫它"夫妻肺片"——不过现在这道菜里已经不放牛肺了。',
      py: '1930 niándài de Chéngdū jiētóu, Guō Cháohuá hé Zhāng Tiánzhèng fūqī liǎ bǎile yí ge xiǎotān.',
      en: 'In the 1930s, a young couple — Guo Chaohua and Zhang Tianzheng — sold dressed beef offal from a stall around Changshun Street in Chengdu. They braised cheap cuts (beef head skin, heart, tongue, tripe), sliced them thin and tossed them with chili oil, ground Sichuan pepper, sesame and crushed peanuts. Hot, numbing, fragrant and cheap, it soon became famous. Originally called "lung slices" and sold by a couple, it became "Couple\'s Delight" — today there is no lung in it at all.'
    },
    prep: [
      { ing: 'niurou', qty: '200 克', prep: 'qiepian', note: { zh: '卤好后切薄片，越薄越入味。', en: 'Braise first, then slice thin so it absorbs the dressing.' } },
      { ing: 'niudu', qty: '200 克', prep: 'qiepian', note: { zh: '牛肚卤好后切片，口感脆。', en: 'Braise the tripe, then slice — it stays crisp.' } },
      { ing: 'niutoupi', qty: '150 克', prep: 'qiepian', note: { zh: '牛头皮卤到软糯再切片。', en: 'Braise the head skin until soft, then slice.' } },
      { ing: 'huashengmi', qty: '30 克', prep: 'paisui', note: { zh: '花生炒香拍碎，撒在最上面。', en: 'Toast and crush the peanuts for the topping.' } },
      { ing: 'qincai', qty: '2 根', prep: 'qieduan', note: { zh: '芹菜切段，增加清香和脆感。', en: 'Cut celery into sections for freshness and crunch.' } },
      { ing: 'xiaocong', qty: '2 根', prep: 'duomo', note: { zh: '切葱花。', en: 'Chop into scallion flowers.' } },
      { ing: 'dasuan', qty: '3 瓣', prep: 'duomo', note: { zh: '蒜末，和红油一起拌。', en: 'Mince; mixed with the chili oil.' } },
      { ing: 'zhima', qty: '1 小勺', prep: 'chaoxiang', note: { zh: '芝麻炒香，最后撒上。', en: 'Toast the sesame for the finish.' } }
    ],
    seasonings: ['hongyou', 'huajiaofen', 'shengchou', 'xiangcu', 'baitang', 'zhima', 'zhimajiang', 'suanmo', 'qincai'],
    seasonQty: { hongyou: '半杯（约 100 毫升）', huajiaofen: '2 小勺，现磨更香', shengchou: '3 大勺', xiangcu: '1 勺', baitang: '1 小勺（回甜）', zhima: '1 大勺', zhimajiang: '1 勺', suanmo: '1 勺', qincai: '2 根，切细段' },
    flavorTask: {
      question: { zh: '"红油味"是哪几样的组合？', en: 'What makes a "chili-oil flavour"?' },
      options: [
        { zh: '红油 + 生抽 + 糖 + 花椒粉', emoji: '🫙🍶', correct: true },
        { zh: '牛油 + 豆瓣 + 高汤', emoji: '🧈' },
        { zh: '芝麻酱 + 芥末 + 醋', emoji: '🥫' }
      ],
      explain: { zh: '红油给香辣、生抽给咸鲜、糖给回甜、花椒粉给麻，拌出来红亮亮。', en: 'Chili oil for fragrance and heat, soy for saltiness, sugar for a sweet echo, pepper for numbness.' }
    },
    tips: [
      { zh: '这是一道"拌"菜，不是炒菜——"拌"也是川菜的重要做法。', en: 'This is a tossed dish, not a stir-fry — tossing is a technique in itself.' },
      { zh: '卤好的肉要放凉再切，才能切得又薄又整齐。', en: 'Cool the braised meat before slicing — thin, neat slices.' }
    ],
    steps: [
      { type: 'heat', heat: 'xiao', zh: '卤水用小火保持微沸，把牛肉和牛肚卤到软糯。', py: 'Lǔshuǐ yòng xiǎo huǒ bǎochí wēifèi, bǎ niúròu hé niúdǔ lǔ dào ruǎnnuò.', en: 'Keep the braising liquid barely simmering and cook the beef and tripe until tender.', add: ['🍲'], tip: { zh: '大火会把肉卤散，小火才能慢慢入味。', en: 'High heat shreds the meat; low heat builds flavour.' } },
      { type: 'wait', seconds: 9, label: '卤 1 小时（课堂快进）', zh: '卤一小时后，捞出来放凉。', py: 'Lǔ yì xiǎoshí hòu, lāo chūlái fàng liáng.', en: 'After an hour, lift it out and let it cool.', add: ['🥩'], tip: { zh: '卤味是四川人过年过节的味道。', en: 'Braised dishes are holiday flavours in Sichuan.' } },
      { type: 'season', zh: '调一碗红油味汁，先放哪一样打底？', py: 'Tiáo yì wǎn hóngyóu wèizhī, xiān fàng nǎ yí yàng dǎdǐ?', en: 'To build the chili-oil dressing, what goes in first?', options: [{ id: 'hongyou', zh: '红油 + 蒜末', emoji: '🫙🧄' }, { id: 'shui', zh: '清水', emoji: '💧' }, { id: 'cu', zh: '半碗香醋', emoji: '🫙' }], answer: 'hongyou', add: ['🫙'], tip: { zh: '红油是川菜凉菜的"底色"。', en: 'Chili oil is the base colour of Sichuan cold dishes.' } },
      { type: 'season', zh: '再放生抽、香醋、糖和花椒粉，猜猜糖的作用是什么？', py: 'Zài fàng shēngchōu, xiāngcù, táng hé huājiāofěn.', en: 'Then soy sauce, vinegar, sugar and pepper. What does the sugar do?', options: [{ id: 'hui', zh: '让味道回甜、更柔和', emoji: '🍬' }, { id: 'tian', zh: '让菜变成甜点', emoji: '🍰' }, { id: 'wu', zh: '没有作用', emoji: '❌' }], answer: 'hui', add: ['🍬'], tip: { zh: '"回甜"是川菜平衡麻辣的小秘密。', en: 'That sweet echo is Sichuan\'s trick for balancing heat.' } },
      { type: 'order', zh: '开始装盘，先放什么？', py: 'Kāishǐ zhuāngpán, xiān fàng shénme?', en: 'Plating time — what goes down first?', options: [{ id: 'rou', zh: '牛肉片 + 牛肚片', emoji: '🥩' }, { id: 'huasheng', zh: '花生碎', emoji: '🥜' }, { id: 'zhima', zh: '芝麻', emoji: '⚪' }], answer: 'rou', add: ['🥩'], tip: { zh: '肉片铺平，味汁才能均匀淋到每一片。', en: 'Lay the slices flat so the dressing reaches every piece.' } },
      { type: 'season', zh: '现在最重要的动作是……', py: 'Xiànzài zuì zhòngyào de dòngzuò shì…', en: 'The most important action now is…', options: [{ id: 'lin', zh: '淋上红油味汁', emoji: '🫗' }, { id: 'chao', zh: '再炒 5 分钟', emoji: '🔥' }, { id: 'zhǔ', zh: '再煮 10 分钟', emoji: '💧' }], answer: 'lin', add: ['🫗'], tip: { zh: '凉菜不放锅，淋和拌就够了。', en: 'Cold dishes never see the wok — just pour and toss.' } },
      { type: 'stir', target: 6, seconds: 9, word: '拌匀', zh: '用筷子轻轻"拌"，让每片肉都沾上红油。', py: 'Yòng kuàizi qīng qīng bàn, ràng měi piàn ròu dōu zhān shàng hóngyóu.', en: 'Toss gently so every slice is coated in red oil.', add: ['🥢'], tip: { zh: '"拌"是川菜凉菜最重要的动作。', en: '"Bàn" (tossing) is the key move for Sichuan cold dishes.' } },
      { type: 'finish', zh: '撒上花生碎、芝麻、芹菜和葱花，上桌！', py: 'Sǎ shàng huāshēng suì, zhīma, qíncài hé cōnghuā, shàng zhuō!', en: 'Sprinkle peanuts, sesame, celery and scallion, then serve.', add: ['🥜', '⚪', '🥬'], tip: { zh: '一红一绿，先看颜色就饿了。', en: 'Red and green — appetising before the first bite.' } }
    ]
  },

  /* ==================== 8. 干煸四季豆 ==================== */
  {
    id: 'ganbian', name: '干煸四季豆', py: 'Gānbiān sìjìdòu', en: 'Dry-fried Green Beans',
    emoji: '🫛', plate: '🍽️', color: '#3f7d3a',
    flavorId: 'jiachang', flavor: '家常味（不辣版可选）', flavorPy: 'jiācháng wèi', heat: 1, difficulty: 1, minutes: 15,
    region: '四川 · 家常素菜', tags: ['素菜', '安全第一', '认识"煸"'],
    story: {
      zh: '"煸"是川菜很特别的一个做法：锅里放不多的油，用中小火慢慢炒，把食材里的水分一点点炒走，表面就会起皱、变得干香，行话叫"虎皮"。干煸四季豆就是这样做的，再加芽菜、干辣椒和花椒，又香又下饭。家庭做法有两种：直接中火干煸 4—5 分钟，或者先焯水煮到七八成熟再炒，两种都可以。要记住一件事：四季豆含有皂甙和红细胞凝集素，必须彻底加热熟透，半生的四季豆会让人中毒，所以这道菜也是"厨房安全"最好的教材。',
      py: '"Biān" shì chuāncài hěn tèbié de yí ge zuòfǎ.',
      en: '"Biān" is a distinct Sichuan technique: a little oil, medium-low heat, slowly driving out moisture until the surface wrinkles and turns fragrant — chefs call it "tiger skin". Dry-fried green beans are the classic example, finished with preserved sprout, dried chili and pepper. Home cooks do it two ways: dry-fry straight in the wok for 4–5 minutes, or blanch first until nearly cooked. One rule never changes: green beans contain saponins and phytohaemagglutinin, so they must be fully cooked — half-raw beans can make people ill.'
    },
    prep: [
      { ing: 'sijidou', qty: '400 克', prep: 'qieduan', note: { zh: '掐掉两头和筋，掰成 5 厘米左右的段，洗净擦干。', en: 'Snap off both ends, break into 5 cm sections, wash and dry.' } },
      { ing: 'yacai', qty: '1 大勺', prep: 'duosui', note: { zh: '芽菜剁碎，香味一下就上来了。', en: 'Chop the preserved sprout for instant aroma.' } },
      { ing: 'gansuan', qty: '4 个', prep: 'qieduan', note: { zh: '干辣椒剪段，怕辣可以少放。', en: 'Snip the chili; use less if you dislike heat.' } },
      { ing: 'dasuan', qty: '3 瓣', prep: 'duomo', note: { zh: '蒜剁成末。', en: 'Mince.' } },
      { ing: 'huajiao', qty: '1 小勺', prep: 'chaoxiang', note: { zh: '花椒备用，和干辣椒一起下锅。', en: 'Ready to go in with the chili.' } },
      { ing: 'shengchou', qty: '1 小勺', prep: 'tiaozhi', note: { zh: '（生抽按口味用，别多）', en: 'Use sparingly, to taste.' } }
    ],
    seasonings: ['yacai', 'ganlajiao', 'huajiao', 'suanmo', 'shengchou', 'yan', 'shiyongyou'],
    seasonQty: { yacai: '1 大勺', ganlajiao: '4 个，怕辣可少放', huajiao: '1 小勺', suanmo: '3 瓣', shengchou: '1 小勺', yan: '2 克（芽菜本身有咸味）', shiyongyou: '20 毫升，油不用多' },
    flavorTask: {
      question: { zh: '"干煸"是什么意思？', en: 'What does "gān biān" mean?' },
      options: [
        { zh: '慢慢炒，把水分炒干、表面起皱', emoji: '🔥', correct: true },
        { zh: '放进水里煮干', emoji: '💧' },
        { zh: '用大火油炸', emoji: '🍟' }
      ],
      explain: { zh: '煸的秘诀是"油不多、火不大、时间够"。', en: 'The secret: not much oil, not high heat, enough time.' }
    },
    tips: [
      { zh: '安全提醒：四季豆必须炒到熟透（表皮起皱、颜色变深），半生的四季豆不能吃。', en: 'Safety: green beans must be fully cooked — wrinkled skin, darker colour. Never serve them half-raw.' },
      { zh: '洗好的四季豆要擦干，带水下锅会"炸油"，也会变成水煮。', en: 'Dry them well — wet beans splatter and steam instead of frying.' }
    ],
    steps: [
      { type: 'heat', heat: 'zhong', zh: '中火下油，油不用多，先下四季豆。', py: 'Zhōng huǒ xià yóu, yóu bú yòng duō, xiān xià sìjìdòu.', en: 'Medium heat, modest oil, add the green beans.', add: ['🫗', '🫛'], tip: { zh: '中火最好：火太大会外糊内生。', en: 'Medium heat: too hot burns outside and leaves the inside raw.' } },
      { type: 'wait', seconds: 10, label: '煸 4 分钟，等表面起皱', zh: '慢慢煸，看到四季豆表皮起皱、颜色变深，才算熟透。', py: 'Màn man biān, kàn dào sìjìdòu biǎopí qǐ zhòu.', en: 'Dry-fry until the skins wrinkle and darken — that means fully cooked.', add: ['💨'], tip: { zh: '这一步不能省时间，安全第一！', en: 'Never rush this step. Safety first!' } },
      { type: 'order', zh: '四季豆起皱了，把它们先盛出来，锅里下……', py: 'Sìjìdòu qǐ zhòu le, chéng chūlái, guō lǐ xià…', en: 'Set the beans aside — into the wok goes…', options: [{ id: 'xiang', zh: '干辣椒 + 花椒 + 蒜末', emoji: '🌶️🫘' }, { id: 'shui', zh: '一碗水', emoji: '💧' }, { id: 'cu', zh: '香醋', emoji: '🫙' }], answer: 'xiang', add: ['🌶️', '🫘', '🧄'], tip: { zh: '香料炒香，但别炒糊。', en: 'Bloom the aromatics, but do not burn them.' } },
      { type: 'order', zh: '接着放……', py: 'Jiēzhe fàng…', en: 'Then add…', options: [{ id: 'yacai', zh: '芽菜', emoji: '🥬' }, { id: 'tang', zh: '白糖', emoji: '🍬' }, { id: 'cu', zh: '香醋', emoji: '🫙' }], answer: 'yacai', add: ['🥬'], tip: { zh: '芽菜的咸香是这道菜的"底味"。', en: 'The preserved sprout provides the savoury base.' } },
      { type: 'season', zh: '四季豆倒回锅里，最后怎么调味？', py: 'Sìjìdòu dào huí guō lǐ, zuìhòu zěnme tiáowèi?', en: 'Return the beans — how do we finish the seasoning?', options: [{ id: 'shao', zh: '一点生抽和盐，翻匀就好', emoji: '🍶' }, { id: 'duo', zh: '大量生抽和两勺盐', emoji: '🧂' }, { id: 'shui', zh: '加半碗水煮一煮', emoji: '💧' }], answer: 'shao', add: ['🍶'], tip: { zh: '芽菜本身有咸味，调味要"轻手"。', en: 'The sprout is already salty — season lightly.' } },
      { type: 'stir', target: 8, seconds: 9, word: '翻炒', zh: '快速翻炒均匀，让芽菜和香料沾在四季豆上。', py: 'Kuàisù fānchǎo jūnyún.', en: 'Toss quickly so everything clings to the beans.', add: ['🥄'], tip: { zh: '这时的香味已经很浓了。', en: 'By now the aroma is strong.' } },
      { type: 'finish', zh: '出锅装盘！尝一口：外皮微皱、里面还嫩，这就是"干煸"。', py: 'Chū guō zhuāngpán! Zhè jiù shì "gānbiān".', en: 'Plate it up! Wrinkled outside, tender inside — that is "dry-fried".', add: ['🍽️'], tip: { zh: '素菜也能是川菜的主角。', en: 'In Sichuan, vegetables can be the star too.' } }
    ]
  }
];

/* ---------- 文化小测（结合上面的文化内容） ---------- */
CC.cultureQuiz = [
  { q: { zh: '川菜的"麻"来自什么？', en: 'What gives Sichuan food its numbing taste?' },
    options: [{ zh: '花椒', en: 'Sichuan pepper', correct: true }, { zh: '辣椒', en: 'chili' }, { zh: '生姜', en: 'ginger' }],
    explain: { zh: '麻来自花椒，辣来自辣椒，这是两样不同的东西。', en: 'Numbing = Sichuan pepper; heat = chili. Two different things.' } },
  { q: { zh: '郫县豆瓣酱主要用什么做的？', en: 'Pixian bean paste is mainly made from…' },
    options: [{ zh: '蚕豆、辣椒和面粉发酵', en: 'fermented broad beans, chili and flour', correct: true }, { zh: '黄豆和花椒', en: 'soybeans and pepper' }, { zh: '花生和白糖', en: 'peanuts and sugar' }],
    explain: { zh: '郫县豆瓣相传创制于清代康熙年间，被叫做"川菜之魂"。', en: 'Said to date from the Qing dynasty, it is called "the soul of Sichuan cuisine".' } },
  { q: { zh: '"麻婆豆腐"的"麻婆"是什么意思？', en: 'Who was "Mapo"?' },
    options: [{ zh: '一位脸上有麻子的老板娘', en: 'a snack-shop owner nicknamed "pockmarked"', correct: true }, { zh: '一位很辣的婆婆', en: 'a very spicy grandmother' }, { zh: '一个卖花椒的老奶奶', en: 'a pepper-selling granny' }],
    explain: { zh: '清代同治年间成都万福桥边的陈麻婆，是这道菜的创造者。', en: 'Chen the "pockmarked lady" ran a small eatery by Wanfu Bridge in Chengdu.' } },
  { q: { zh: '回锅肉为什么叫"回锅"？', en: 'Why is twice-cooked pork called "back to the wok"?' },
    options: [{ zh: '先把肉煮好，再回到锅里炒一次', en: 'the pork is boiled first, then returned to the wok', correct: true }, { zh: '要洗两次锅', en: 'the wok is washed twice' }, { zh: '要用两个锅炒', en: 'two woks are used' }],
    explain: { zh: '"回锅"就是再回锅炒一次，它被称为"川菜第一菜"。', en: '"Hui guo" means returning to the wok — often called the first dish of Sichuan cuisine.' } },
  { q: { zh: '鱼香肉丝里有鱼吗？', en: 'Is there fish in fish-fragrant pork?' },
    options: [{ zh: '没有鱼，是四川人做鱼时的调味方法', en: 'no fish — it is the seasoning method for cooking fish', correct: true }, { zh: '有一点点鱼', en: 'a little fish' }, { zh: '名字来自鱼形的盘子', en: 'named after a fish-shaped plate' }],
    explain: { zh: '泡椒、姜葱蒜、糖醋，这就是"鱼香"。', en: 'Pickled chili, aromatics, sugar and vinegar — that is "fish-fragrant".' } },
  { q: { zh: '四川人爱吃麻辣，和什么关系最大？', en: 'What is most connected to Sichuan\'s love of numbing-spicy food?' },
    options: [{ zh: '潮湿多雾的气候', en: 'the humid, foggy climate', correct: true }, { zh: '天气太热', en: 'the extreme heat' }, { zh: '因为没有别的调料', en: 'a shortage of other seasonings' }],
    explain: { zh: '四川盆地潮湿，麻辣可以发汗、去湿、开胃。', en: 'The damp basin climate: numbing-spicy food makes you sweat and opens the appetite.' } },
  { q: { zh: '"煸"是什么意思？', en: 'What does "biān" (dry-frying) mean?' },
    options: [{ zh: '用中小火慢慢炒，把水分炒干、表面起皱', en: 'fry slowly on medium-low heat until moisture leaves and the surface wrinkles', correct: true }, { zh: '用水煮', en: 'boil in water' }, { zh: '用大量油炸', en: 'deep-fry in lots of oil' }],
    explain: { zh: '干煸四季豆就是最好的例子。', en: 'Dry-fried green beans are the classic example.' } },
  { q: { zh: '担担面为什么叫"担担面"？', en: 'Why is it called "shoulder-pole noodles"?' },
    options: [{ zh: '卖面的人用扁担挑着面摊', en: 'the vendor carried his stall on a shoulder pole', correct: true }, { zh: '面条的形状像扁担', en: 'the noodles look like a pole' }, { zh: '用扁担擀面条', en: 'the noodles are rolled with a pole' }],
    explain: { zh: '一百多年前自贡的陈包包，挑着担子卖面。', en: 'Chen Baobao in Zigong sold noodles from a pole-carried stall over a century ago.' } },
  { q: { zh: '自贡的川菜属于哪一流派？', en: 'Which school does Zigong cooking belong to?' },
    options: [{ zh: '小河帮（盐帮菜）', en: 'Small River school (salt-merchant style)', correct: true }, { zh: '上河帮', en: 'Upper River school' }, { zh: '下河帮', en: 'Lower River school' }],
    explain: { zh: '自贡是"盐都"，盐场多牛多，所以牛肉菜特别有名。', en: 'Zigong is the salt capital — many cattle, hence famous beef dishes.' } },
  { q: { zh: '盖碗茶的"三件"是什么？', en: 'What are the three parts of a gaiwan tea set?' },
    options: [{ zh: '茶盖、茶碗、茶托', en: 'lid, bowl, saucer', correct: true }, { zh: '茶壶、茶杯、茶匙', en: 'pot, cup, spoon' }, { zh: '三个一样的茶杯', en: 'three identical cups' }],
    explain: { zh: '成都人说这三件是"天、地、人"，喝茶聊天叫"摆龙门阵"。', en: 'Chengdu people call them heaven, earth and people — and chatting over tea is "spinning the dragon gate".' } },
  { q: { zh: '四季豆没有炒熟会怎样？', en: 'What happens if green beans are not fully cooked?' },
    options: [{ zh: '会让人不舒服，一定要煸熟透', en: 'they can make you ill — always cook them through', correct: true }, { zh: '会更好吃', en: 'they taste better' }, { zh: '没有关系', en: 'nothing at all' }],
    explain: { zh: '安全厨房第一条：四季豆必须熟透。', en: 'Kitchen safety rule one: green beans must be cooked through.' } },
  { q: { zh: '川菜只有辣味吗？', en: 'Is Sichuan food only spicy?' },
    options: [{ zh: '不是，"一菜一格，百菜百味"，也有咸鲜、荔枝、鱼香等不辣的味型', en: 'no — "every dish its own style": there are savoury, lychee and other non-spicy types', correct: true }, { zh: '是的，全部都很辣', en: 'yes, everything is spicy' }, { zh: '只有火锅是川菜', en: 'only hotpot counts' }],
    explain: { zh: '例如"开水白菜"和鸡汤抄手就完全不辣。', en: 'For example "boiled cabbage in clear soup" is not spicy at all.' } }
];

/* 成就徽章 */
CC.badges = [
  { id: 'knife', zh: '刀工小能手', en: 'Knife Skills Rookie', emoji: '🔪', desc: { zh: '完成第一道菜的备菜。', en: 'Finish prep for your first dish.' } },
  { id: 'wok', zh: '火候大师', en: 'Heat Master', emoji: '🔥', desc: { zh: '一道菜全程没有选错火候。', en: 'Complete a dish with no heat mistakes.' } },
  { id: 'stir', zh: '锅气小王子 / 小公主', en: 'Wok-hei Champion', emoji: '💨', desc: { zh: '累计翻炒 100 次。', en: 'Reach 100 stirs in total.' } },
  { id: 'taste', zh: '味型达人', en: 'Flavour Expert', emoji: '🎨', desc: { zh: '答对 3 道味型题。', en: 'Answer 3 flavour questions correctly.' } },
  { id: 'culture', zh: '川菜文化小博士', en: 'Culture Scholar', emoji: '📚', desc: { zh: '文化小测答对 8 题以上。', en: 'Score 8+ in the culture quiz.' } },
  { id: 'chef', zh: '川味大厨', en: 'Sichuan Chef', emoji: '👨‍🍳', desc: { zh: '完成 4 道菜。', en: 'Complete 4 dishes.' } },
  { id: 'panda', zh: '胖达的好朋友', en: 'Panda\'s Friend', emoji: '🐼', desc: { zh: '和熊猫助手聊过 20 句。', en: 'Chat with the panda helper 20 times.' } }
];

window.CC = CC;
