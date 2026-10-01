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
      zh: '清朝光绪年间，贵州人丁宝桢任四川总督，官衔是"太子少保"（尊称"宫保"）。相传这道菜出自他家的厨师：鸡丁配上干辣椒、花椒和花生米，甜酸里带着糊辣香。后来人们就用他的尊称叫它"宫保鸡丁"。它属于"糊辣荔枝味"：干辣椒炒到棕红，吃起来先酸后甜，像荔枝。',
      py: 'Qīngcháo guānyuán Dīng Bǎozhēn dāngguo Sìchuān zǒngdū, guānxián shì "Tàizǐ Shǎobǎo", rén chēng "Dīng Gōngbǎo".',
      en: 'In the Guangxu reign of the Qing dynasty, Ding Baozhen — a native of Guizhou — served as governor of Sichuan. His honorary title was "Gongbao" (Guardian of the Heir Apparent). The dish is said to come from his household kitchen: diced chicken with dried chili, Sichuan pepper and peanuts, sweet-sour with a toasted-chili aroma. It became "Gongbao Chicken". Its flavour is "toasted chili + lychee": chili fried deep red, sour first, then sweet, like a lychee.'
    },
    prep: [
      { ing: 'jiwing', qty: '300 克', prep: 'qieding', note: { zh: '一定要用鸡腿肉，去骨切丁，比鸡胸肉嫩很多。', en: 'Use chicken thigh — deboned and diced; far more tender than breast.' } },
      { ing: 'dasuan', qty: '4 瓣', prep: 'qiepian', note: { zh: '切片，一半腌肉、一半下锅。', en: 'Slice; some for the marinade, some for the wok.' } },
      { ing: 'shengjiang', qty: '1 小块', prep: 'qiepian', note: { zh: '切片，和蒜片一起腌肉。', en: 'Slice and marinate with the garlic.' } },
      { ing: 'dacong', qty: '1 根', prep: 'qieduan', note: { zh: '切成葱段，最后和花生一起下锅。', en: 'Cut into sections; goes in last with the peanuts.' } },
      { ing: 'gansuan', qty: '10 个', prep: 'qieduan', note: { zh: '干辣椒剪成段，先用油激出香味再捞出。', en: 'Snip the dried chilli into sections; fry briefly for aroma, then lift out.' } },
      { ing: 'huajiao', qty: '1 小勺', prep: 'chaoxiang', note: { zh: '油热后先炸花椒，微微变色就捞出。', en: 'Fry the Sichuan pepper first; take it out as soon as it colours.' } },
      { ing: 'huashengmi', qty: '50 克', prep: 'chaoxiang', note: { zh: '保持酥脆，最后和葱段一起放。', en: 'Keep them crunchy — they go in last with the scallion.' } },
      { ing: 'dianfen', qty: '2 大勺', prep: 'tiaozhi', note: { zh: '和糖醋一起调成"灵魂碗汁"。', en: 'Mix into the "soul sauce" with the sugar and vinegar.' } }
    ],
    seasonings: ['ganlajiao', 'huajiao', 'baitang', 'xiangcu', 'shengchou', 'laochou', 'liaojiu', 'dianfen', 'yan', 'shiyongyou'],
    seasonQty: { ganlajiao: '10 个，剪段', huajiao: '1 小勺', baitang: '3 大勺（碗汁）', xiangcu: '3 大勺（碗汁）', shengchou: '1 勺', laochou: '半勺', liaojiu: '1 勺（碗汁）+ 1.5 勺腌肉', dianfen: '2 勺（碗汁）+ 腌肉适量', yan: '少许', shiyongyou: '30 毫升，腌肉再加 1 勺' },
    flavorTask: {
      question: { zh: '"酸甜微辣"的碗汁，糖和醋大概是什么比例？', en: 'For the sweet-sour sauce, roughly what ratio of sugar to vinegar?' },
      options: [
        { zh: '白糖 3 大勺 : 香醋 3 大勺，大约 1 : 1', emoji: '🍬🫙', correct: true },
        { zh: '糖 1 勺 : 醋 5 勺，酸为主', emoji: '🫙' },
        { zh: '糖 5 勺 : 醋 1 勺，甜为主', emoji: '🍬' }
      ],
      explain: { zh: '这份做法是糖醋各 3 大勺，酸甜平衡，再靠干辣椒和花椒补"微辣"。', en: 'This version uses three spoons of each — balanced sweet and sour, with chilli and pepper for the gentle heat.' }
    },
    tips: [
      { zh: '黄酒是去腥关键：腌肉放一点，碗汁里也放一点。', en: 'Rice wine is the key: a little in the marinade, a little in the sauce.' },
      { zh: '腌肉时加一勺油锁住水分，鸡丁才嫩到弹牙。', en: 'A spoon of oil in the marinade seals in moisture and keeps the chicken springy.' },
      { zh: '花生米最后和葱段一起放，不然就不脆了。', en: 'Peanuts go in last with the scallion, or they lose their crunch.' },
      { zh: '料汁要大火收浓，裹满鸡丁才够香。', en: 'Reduce the sauce over high heat so it clings to every piece.' }
    ],
    steps: [
      { type: 'prep', zh: '备料：鸡腿肉去骨切丁；蒜片、姜片、葱段、干辣椒段、花椒、花生米分开放；再调一碗料汁（白糖 3 勺、香醋 3 勺、蚝油 1 勺、生抽 1 勺、黄酒 1 勺、老抽半勺、淀粉 2 勺、清水 3 勺、白胡椒和盐各少许）。', py: 'Bèi liào: jītuǐròu qù gǔ qiè dīng, xiǎoliào fēn kāi fàng, zài tiáo yì wǎn liàozhī.', en: 'Mise en place: debone and dice the chicken thigh; keep garlic, ginger, scallion, dried chilli, Sichuan pepper and peanuts separate; then mix the sauce (3 spoons sugar, 3 vinegar, 1 oyster sauce, 1 light soy, 1 rice wine, half a spoon dark soy, 2 starch, 3 water, white pepper and salt).', add: ['🍗', '🌶️', '🥜'], tip: { zh: '小料先摆齐，锅热起来才不会手忙脚乱。', en: 'Lay everything out first — the wok goes fast.' } },
      { type: 'prep', zh: '腌肉：鸡腿肉加 1.5 勺黄酒、1 勺盐、适量淀粉和清水，抓到发黏，再倒一勺油锁住水分，放入蒜片姜片腌 5 分钟。', py: 'Yān ròu: jītuǐròu jiā huángjiǔ, yán, diànfěn, qīngshuǐ zhuā yún, zài jiā yì sháo yóu, yān wǔ fēnzhōng.', en: 'Marinate: mix the diced thigh with rice wine, salt, starch and water until sticky, add a spoon of oil to seal in the moisture, then the garlic and ginger; rest 5 minutes.', add: ['🍗'], tip: { zh: '黄酒去腥、油锁水，这两步别省。', en: 'The rice wine and the oil are the two steps you should not skip.' } },
      { type: 'heat', heat: 'zhong', zh: '炸花椒油：油热后下花椒，微微变色就捞出来。', py: 'Zhà huājiāo yóu: yóu rè hòu xià huājiāo, wēiwēi biànsè jiù lāo chūlái.', en: 'Fry the Sichuan pepper in the hot oil and lift it out as soon as it changes colour.', add: ['🫗', '🫘'], tip: { zh: '花椒一糊就发苦，变色就捞。', en: 'Burnt pepper turns bitter — take it out early.' } },
      { type: 'heat', heat: 'zhong', zh: '放辣椒：下干辣椒段，微微变色就捞出，和花椒放在一起备用。', py: 'Fàng làjiāo: xià gān làjiāo duàn, wēiwēi biànsè jiù lāo chū.', en: 'Add the dried chilli sections and lift them out as soon as they colour, keeping them with the pepper.', add: ['🌶️'], tip: { zh: '辣椒和花椒最后还要回锅，现在只取香味。', en: 'The chilli and pepper come back at the end — here you only want their fragrance.' } },
      { type: 'heat', heat: 'da', zh: '下鸡丁：转大火，把腌好的鸡丁和姜蒜一起下锅翻炒。', py: 'Xià jīdīng: zhuǎn dà huǒ, xià yān hǎo de jīdīng hé jiāng suàn yìqǐ fānchǎo.', en: 'Turn the heat up and add the marinated chicken together with its garlic and ginger.', add: ['🍗'], tip: { zh: '大火快炒，鸡丁才嫩。', en: 'High heat and speed keep the chicken tender.' } },
      { type: 'stir', target: 14, seconds: 11, word: '翻炒', zh: '炒到两面焦黄：不停翻炒，鸡丁表面金黄。', py: 'Chǎo dào liǎng miàn jiāohuáng.', en: 'Keep tossing until the chicken is golden on both sides.', add: ['💨'], tip: { zh: '表面金黄、里面还嫩，这时候最香。', en: 'Golden outside, still juicy inside — that is the moment.' } },
      { type: 'season', zh: '倒料汁：倒入调好的料汁，再放葱段、花生米和炸好的辣椒花椒，一起翻炒。', py: 'Dào liàozhī: dào rù liàozhī, zài fàng cōngduàn, huāshēngmǐ hé zhà hǎo de làjiāo huājiāo.', en: 'Pour in the sauce, then add the scallion, peanuts and the fried chilli and pepper, and toss everything together.', options: [{ id: 'wanzhi', zh: '调好的碗汁', emoji: '🥣' }, { id: 'shui', zh: '一碗清水', emoji: '💧' }, { id: 'cu', zh: '半碗香醋', emoji: '🫙' }], answer: 'wanzhi', add: ['🥣', '🌱', '🥜'], tip: { zh: '花生最后和葱一起放，不然就不脆了。', en: 'Peanuts go in last with the scallion so they stay crunchy.' } },
      { type: 'finish', zh: '收浓出锅：大火把汁收浓，裹满鸡丁就关火装盘。', py: 'Shōu nóng chū guō: dà huǒ bǎ zhī shōu nóng, guǒ mǎn jīdīng jiù chū guō.', en: 'Reduce the sauce over high heat until it coats every piece, then serve.', add: ['🍽️'], tip: { zh: '汁要裹住鸡丁才够香，趁热吃。', en: 'The sauce should cling to the chicken — serve it hot.' } }
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
    flavorId: 'yuxiang', flavor: '鱼香味', flavorPy: 'yúxiāng wèi', heat: 2, difficulty: 3, minutes: 25,
    region: '四川 · 家常菜', tags: ['没有鱼', '酸甜微辣', '20 分钟快手'],
    story: {
      zh: '第一次听到"鱼香肉丝"的留学生都会问：鱼在哪里？其实"鱼香"不是鱼的香味，而是四川人做鱼时用的那一套调料——泡椒、姜、葱、蒜、糖、醋。后来有人用同样的调料来炒肉丝，就叫"鱼香肉丝"。所以这道菜里有咸、甜、酸、辣，还有浓浓的姜葱蒜香，是一条鱼都没有的"鱼香"。',
      py: '"Yúxiāng" bú shì yú de xiāngwèi, ér shì Sìchuān rén zuò yú shí yòng de nà tào tiáoliào.',
      en: 'Students always ask: where is the fish? "Fish-fragrant" is not the smell of fish — it is the seasoning set Sichuan people use when cooking fish: pickled chili, ginger, scallion, garlic, sugar and vinegar. Cook pork slivers the same way and you get "fish-fragrant pork" with no fish at all.'
    },
    prep: [
      { ing: 'zhuliji', qty: '300 克', prep: 'qiesi', note: { zh: '先冻硬一点再切，能切得更细更匀。', en: 'Chill it slightly first for even, fine shreds.' } },
      { ing: 'muer', qty: '一小把', prep: 'qiesi', note: { zh: '提前泡发，切成和肉丝一样细的丝。', en: 'Soak ahead, then shred as finely as the pork.' } },
      { ing: 'huluobo', qty: '1 根', prep: 'qiesi', note: { zh: '切丝——图上三样配菜都是丝，粗细跟肉丝差不多。', en: 'Shred it — all three vegetables are shredded to match the pork.' } },
      { ing: 'qingjiao', qty: '2 个', prep: 'qiesi', note: { zh: '去籽切丝，脆口又好看。', en: 'Seed and shred for crunch and colour.' } },
      { ing: 'dasuan', qty: '4 瓣', prep: 'duomo', note: { zh: '剁成蒜末，和葱花一起爆香。', en: 'Mince; it fries with the scallion.' } },
      { ing: 'xiaocong', qty: '2 根', prep: 'duomo', note: { zh: '切成葱花。', en: 'Chop into scallion flowers.' } }
    ],
    seasonings: ['shengchou', 'laochou', 'xiangcu', 'haoyou', 'baitang', 'dianfen', 'liaojiu', 'shiyongyou'],
    seasonQty: {
      shengchou: '腌肉 1 勺 + 料汁 2 勺', laochou: '料汁 1 勺', xiangcu: '料汁 1 勺',
      haoyou: '料汁 1 勺', baitang: '料汁 大半勺', dianfen: '腌肉 1 勺 + 料汁 1 勺',
      liaojiu: '腌肉 1 勺', shiyongyou: '炒菜用'
    },
    flavorTask: {
      question: { zh: '按图调这碗"鱼香料汁"，放了哪几样？', en: 'Which set builds this fish-fragrant sauce?' },
      options: [
        { zh: '生抽 + 老抽 + 醋 + 蚝油 + 糖 + 淀粉 + 清水', emoji: '🍶🫙🍬', correct: true },
        { zh: '花椒 + 芝麻酱 + 香油', emoji: '🫘🥫' },
        { zh: '牛油 + 豆瓣 + 孜然', emoji: '🧈' }
      ],
      explain: { zh: '酸来自醋，甜来自糖，鲜来自生抽和蚝油，颜色来自老抽，稠度来自淀粉——一条鱼都没有，却有鱼香味。', en: 'Vinegar for sour, sugar for sweet, soy and oyster sauce for savour, dark soy for colour, starch for body.' }
    },
    tips: [
      { zh: '三样配菜都切丝，粗细跟肉丝差不多，下锅才能一起熟。', en: 'Shred everything to a similar width so it all cooks together.' },
      { zh: '肉丝先腌 10 分钟：一勺生抽、一勺料酒、一勺淀粉，抓匀。', en: 'Marinate the pork 10 minutes with one spoon each of soy sauce, cooking wine and starch.' },
      { zh: '料汁提前调好（两勺生抽、一勺老抽、一勺醋、一勺蚝油、大半勺糖、一勺淀粉、半碗清水），下锅后一次倒完。', en: 'Mix the sauce beforehand and pour it in one go.' },
      { zh: '全程大火快炒，肉丝滑散就下配菜，别炒太久。', en: 'Work over high heat; once the pork separates, add the vegetables.' }
    ],
    steps: [
      { type: 'season', zh: '胡萝卜、青椒、木耳怎么处理？', py: 'Húluóbo, qīngjiāo, mù\'ěr zěnme chǔlǐ?', en: 'How do you cut the vegetables?', options: [{ id: 'si', zh: '都切丝', emoji: '🔪' }, { id: 'kuai', zh: '切大块', emoji: '🧱' }, { id: 'mo', zh: '剁成末', emoji: '🥣' }], answer: 'si', add: ['🥕', '🫑', '🍄'], tip: { zh: '图上第 1 张：三样都是丝，跟肉丝差不多粗细。', en: 'Image 1: all three are shredded to match the pork.' } },
      { type: 'season', zh: '腌肉丝要放哪三样（各一勺）？', py: 'Yān ròusī yào fàng nǎ sān yàng?', en: 'What goes into the pork marinade?', options: [{ id: 'san', zh: '生抽 + 料酒 + 淀粉', emoji: '🥣' }, { id: 'tangcu', zh: '醋 + 糖', emoji: '🫙' }, { id: 'yan', zh: '只放盐', emoji: '🧂' }], answer: 'san', add: ['🥩', '🥣'], tip: { zh: '抓匀腌 10 分钟——图上第 2 张。', en: 'Mix and rest 10 minutes — that is image 2.' } },
      { type: 'order', zh: '调鱼香料汁：两勺生抽、一勺老抽、一勺醋、一勺蚝油、大半勺白糖、一勺淀粉，最后还要加……', py: 'Diào yúxiāng liàozhī…', en: 'Building the sauce: six seasonings, then what?', options: [{ id: 'shui', zh: '半碗清水', emoji: '💧' }, { id: 'you', zh: '半碗油', emoji: '🫗' }, { id: 'cu', zh: '半碗醋', emoji: '🫙' }], answer: 'shui', add: ['🥣', '💧'], tip: { zh: '图上第 3 张写得很清楚：六样 + 半碗清水，搅匀备用。', en: 'Image 3: six seasonings plus half a bowl of water.' } },
      { type: 'heat', heat: 'zhong', zh: '锅烧热倒油，先下蒜末和葱花炒香。', py: 'Guō shāo rè dào yóu, xiān xià suànmò hé cōnghuā.', en: 'Heat the oil and fry the garlic and scallion first.', add: ['🧄', '🌱'], tip: { zh: '图上第 4 张：油热放入蒜末葱，闻到香味就下一步。', en: 'Image 4: garlic and scallion go in first — do not let them burn.' } },
      { type: 'stir', target: 12, seconds: 10, word: '划散', zh: '放入腌制好的肉丝，快速划散，肉丝变白。', py: 'Fàng rù yānzhì hǎo de ròusī, kuàisù huásàn.', en: 'Add the marinated pork and separate the shreds fast.', add: ['🥩'], tip: { zh: '图上第 5 张：肉丝下锅就划散，别让它粘成一坨。', en: 'Image 5: separate the shreds as soon as they hit the wok.' } },
      { type: 'order', zh: '接着倒入哪三样？', py: 'Jiēzhe dào rù nǎ sān yàng?', en: 'Which three go in next?', options: [{ id: 'cai', zh: '胡萝卜 + 青椒 + 木耳', emoji: '🥕🫑🍄' }, { id: 'tang', zh: '白糖', emoji: '🍬' }, { id: 'cu', zh: '香醋', emoji: '🫙' }], answer: 'cai', add: ['🥕', '🫑', '🍄'], tip: { zh: '图上第 6 张：红、绿、黑三色一起下锅，炒到断生。', en: 'Image 6: red, green and black together, fried until just tender.' } },
      { type: 'season', zh: '最后倒入……', py: 'Zuìhòu dào rù…', en: 'Finally, pour in…', options: [{ id: 'liaozhi', zh: '调好的鱼香料汁', emoji: '🥣' }, { id: 'shui', zh: '清水', emoji: '💧' }, { id: 'jiangyou', zh: '老抽', emoji: '🍶' }], answer: 'liaozhi', add: ['🥣'], tip: { zh: '图上第 7 张：沿锅边倒入料汁，马上就会变稠。', en: 'Image 7: pour the sauce down the side; it thickens at once.' } },
      { type: 'finish', zh: '大火翻炒均匀即可，装盘开吃！', py: 'Dà huǒ fānchǎo jūnyún jí kě.', en: 'Stir-fry over high heat until evenly coated, then serve.', add: ['💨'], tip: { zh: '图上第 8 张：翻炒均匀即可——汁要亮、匀，盘底不汪水。', en: 'Image 8: just toss until everything is coated — glossy, not soupy.' } }
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
      { type: 'prep', zh: '备料：牛肉、叶子菜、葱姜蒜、刀口辣椒和豆瓣酱。', py: 'Bèi liào: niúròu, yèzi cài, cōng jiāng suàn, dāokǒu làjiāo hé dòubànjiàng.', en: 'Mise en place: beef, leafy greens, scallion-ginger-garlic, knife-cut chili and Pixian bean paste.', add: ['🥩', '🥬'], tip: { zh: '先把料摆齐，炒的时候才不手忙脚乱。', en: 'Lay everything out first — stir-frying goes fast.' } },
      { type: 'prep', zh: '腌肉：350 克牛肉加盐、生抽、红薯淀粉和适量清水，抓匀腌 10 分钟。', py: 'Yān ròu: 350 kè niúròu jiā yán, shēngchōu, hóngshǔ diànfěn hé shìliàng qīngshuǐ, zhuā yún yān shí fēnzhōng.', en: 'Marinate 350 g beef with salt, light soy, sweet-potato starch and a splash of water; mix well and rest 10 minutes.', add: ['🥩'], tip: { zh: '淀粉把水分锁在肉里，牛肉才嫩。', en: 'The starch traps moisture so the beef stays tender.' } },
      { type: 'heat', heat: 'zhong', zh: '炒料：锅里倒 120 毫升菜籽油，油温五成热，下葱姜蒜、一半刀口辣椒和豆瓣酱炒香（可加 50 克火锅底料）。', py: 'Chǎo liào: guō lǐ dào 120 háoshēng càizǐyóu, yóu wēn wǔ chéng rè, xià cōng jiāng suàn, yíbàn dāokǒu làjiāo hé dòubànjiàng chǎo xiāng.', en: 'Heat 120 ml rapeseed oil to medium, then fry scallion-ginger-garlic, half the knife-cut chili and the bean paste until fragrant (optional: 50 g hot-pot base).', add: ['🫗', '🥫'], tip: { zh: '小火慢炒，红油才红亮不发苦。', en: 'Fry gently so the red oil comes out bright, not bitter.' } },
      { type: 'wait', seconds: 5, label: '熬汤 3—5 分钟', zh: '加汤：炒香后加入 1 升清水，熬煮 3—5 分钟。', py: 'Jiā tāng: chǎo xiāng hòu jiārù 1 shēng qīngshuǐ, áo zhǔ sān dào wǔ fēnzhōng.', en: 'Add 1 litre of water and simmer for 3–5 minutes.', add: ['💧'], tip: { zh: '汤要多一点，牛肉才能在汤里"游泳"。', en: 'Use plenty of broth — the beef should swim in it.' } },
      { type: 'wait', seconds: 6, label: '菜炒断生垫底', zh: '垫菜：叶子菜加盐炒断生，捞出来垫在碗底。', py: 'Diàn cài: yèzi cài jiā yán chǎo duànshēng, lāo chūlái diàn zài wǎn dǐ.', en: 'Stir-fry the leafy greens with a pinch of salt until just done, then lay them in the bottom of the bowl.', add: ['🥬'], tip: { zh: '垫底的菜吸了汤汁最好吃。', en: 'The vegetable bed soaks up the broth — the best bite.' } },
      { type: 'heat', heat: 'xiao', zh: '下牛肉：转小火，把牛肉片一片片依次下进汤里，变色就关火。', py: 'Xià niúròu: zhuǎn xiǎo huǒ, bǎ niúròupiàn yí piàn piàn yīcì xià jìn tāng lǐ, biàn sè jiù guān huǒ.', en: 'Turn the heat low and slide the beef slices in one by one; stop as soon as they change colour.', add: ['🥩'], tip: { zh: '一片片下不会粘，变色就停，久了就柴。', en: 'One by one so they do not stick; stop early or they turn tough.' } },
      { type: 'heat', heat: 'da', zh: '淋油：另起锅把油烧到冒烟，淋在刀口辣椒和蒜末上。', py: 'Lín yóu: lìng qǐ guō bǎ yóu shāo dào mào yān, lín zài dāokǒu làjiāo hé suànmò shang.', en: 'Heat oil in another pan until it smokes, then pour it over the knife-cut chili and minced garlic.', add: ['🫗'], tip: { zh: '"滋——"的一声，香味被热油激出来。', en: 'That sizzle is where the aroma is released.' } },
      { type: 'finish', zh: '出锅：撒上葱花，连汤倒进碗里，趁热端上桌。', py: 'Chū guō: sǎ shàng cōnghuā, lián tāng dào jìn wǎn lǐ, chèn rè duān shàng zhuō.', en: 'Scatter scallion, pour the beef and broth into the bowl and serve scalding hot.', add: ['🌱'], tip: { zh: '这道菜要"烫"着吃，凉了香味就少一半。', en: 'Eat it scalding hot — half the aroma fades when cold.' } }
    ]
  },

  /* ==================== 6. 豌杂面 ==================== */
  {
    id: 'wanzamian', name: '豌杂面', py: 'Wān zá miàn', en: 'Pea & Pork Noodles',
    emoji: '🍜', plate: '🍜', color: '#e08a1e',
    flavorId: 'mala', flavor: '麻辣味（面食）', flavorPy: 'málà wèi', heat: 3, difficulty: 2, minutes: 60,
    region: '重庆 · 街头小面', tags: ['小吃', '一碗面', '吃前要拌'],
    story: {
      zh: '豌杂面是重庆小面里最典型的一碗。名字里的"豌"是耙豌豆：干豌豆提前泡开，再用锅压到软烂沙糯——四川话说"耙"就是软烂；"杂"是猪肉炒的杂酱。一碗面里，豌豆泥负责沙糯，杂酱负责咸香，猪油、香醋和辣椒油藏在碗底，所以端上来先拌再吃。',
      py: 'Wān zá miàn shì Chóngqìng xiǎomiàn de yì zhǒng: "wān" shì pá wāndòu, "zá" shì ròu zájiàng.',
      en: 'Wanza noodles are one of Chongqing\'s signature noodle bowls. "Wan" is pa wandou — dried peas soaked and then cooked until soft and sandy (pa means "mushy-soft" in Sichuanese); "za" is the pork topping, zajiang. The pea mash brings a sandy creaminess, the pork brings salt and savour, and lard, vinegar and chilli oil hide at the bottom of the bowl — so mix well before eating.'
    },
    prep: [
      { ing: 'wandou', qty: '200 克', prep: 'paofa', note: { zh: '干豌豆提前泡一整晚，再压到完全软烂。', en: 'Soak the dried peas overnight, then cook until completely soft.' } },
      { ing: 'roumo', qty: '150 克', prep: 'duomo', note: { zh: '猪肉剁成肉沫，用来炒杂酱。', en: 'Mince the pork for the zajiang topping.' } },
      { ing: 'miantiao', qty: '200 克', prep: 'xi', note: { zh: '手擀面最好，买现成鲜面条也行。', en: 'Hand-rolled noodles are best; fresh ones work too.' } },
      { ing: 'xiaocong', qty: '3 根', prep: 'duomo', note: { zh: '切成葱花：碗底要放，面上也要撒。', en: 'Chop into scallion flowers for the bowl base and the top.' } },
      { ing: 'xiangcai', qty: '2 根', prep: 'qieduan', note: { zh: '香菜切段，最后撒在面上。', en: 'Cut the coriander into sections for the top.' } },
      { ing: 'dasuan', qty: '4 瓣', prep: 'duomo', note: { zh: '蒜末和姜末一起爆香。', en: 'Minced garlic fries with the ginger.' } },
      { ing: 'shengjiang', qty: '1 块', prep: 'duomo', note: { zh: '姜末下冷油爆香，杂酱的香味从这里开始。', en: 'Ginger goes into cold oil first — where the aroma starts.' } }
    ],
    seasonings: ['tianmianjiang', 'laochou', 'shengchou', 'xiangcu', 'lajiaoyou', 'hongyou', 'shiyongyou', 'yan', 'conghua', 'suanmo', 'jiangmo'],
    seasonQty: { tianmianjiang: '4 勺（调酱汁）', laochou: '1 勺（调酱汁）', shengchou: '1 勺', xiangcu: '1 勺（碗底）', lajiaoyou: '1 勺（碗底）', hongyou: '1 勺', shiyongyou: '2 勺', yan: '少许', conghua: '碗底 + 面上', suanmo: '1 小勺', jiangmo: '1 小勺' },
    flavorTask: {
      question: { zh: '豌杂面里的"豌"和"杂"分别是什么？', en: 'What do "wan" and "za" stand for?' },
      options: [
        { zh: '"豌"是耙豌豆，"杂"是猪肉杂酱', emoji: '🍜', correct: true },
        { zh: '"豌"是碗，"杂"是杂菜', emoji: '🥣' },
        { zh: '"豌"是豌豆，"杂"是肉丝', emoji: '🥩' }
      ],
      explain: { zh: '两样都是浇头：豌豆要压到沙糯，杂酱要炒到干香，合在一起才叫豌杂面。', en: 'Both are toppings: peas cooked until sandy, pork fried until dry and fragrant.' }
    },
    tips: [
      { zh: '豌豆一定要泡够时间，压得越烂越好吃。', en: 'Soak the peas properly — the softer, the better.' },
      { zh: '杂酱多炒一会儿，水分收干，香味才浓。', en: 'Fry the topping longer to drive off the water — that is where the aroma is.' }
    ],
    steps: [
      { type: 'wait', seconds: 8, label: '炖豌豆 30 分钟', zh: '炖耙豌豆：200 克干豌豆提前泡一整晚，放进电饭煲加水没过豌豆，压到完全软烂，出锅加一小勺盐拌匀。', py: 'Dùn pá wāndòu: 200 kè gān wāndòu tíqián pào yì zhěng wǎn, yā dào wánquán ruǎnlàn.', en: 'Soak 200 g dried peas overnight, then cook them in a rice cooker with water to cover until completely soft; stir in a pinch of salt.', add: ['🫛'], tip: { zh: '豌豆是这碗面的灵魂，压得越烂越好吃。', en: 'The peas are the soul of this bowl — cook them until really soft.' } },
      { type: 'prep', zh: '备小料：葱花、香菜、小米辣、蒜末、姜末提前切好，分盘放着。', py: 'Bèi xiǎoliào: cōnghuā, xiāngcài, xiǎomǐlà, suànmò, jiāngmò qiè hǎo fēn pán.', en: 'Prep the aromatics: chop scallion, coriander, small chilli, garlic and ginger, and keep them in separate little dishes.', add: ['🌱', '🧄', '🫚'], tip: { zh: '先切好摆齐，炒酱的时候才不手忙脚乱。', en: 'Get everything cut first — frying the sauce goes fast.' } },
      { type: 'season', zh: '调酱汁：碗里放 4 勺黄豆酱、4 勺甜面酱、半勺蚝油、1 勺老抽和少许盐，搅匀备用。', py: 'Tiáo jiàngzhī: wǎn lǐ fàng huángdòujiàng, tiánmiànjiàng, háoyóu, lǎochōu hé yán, jiǎo yún.', en: 'Mix the sauce: 4 spoons of yellow bean paste, 4 of sweet wheat paste, half a spoon of oyster sauce, 1 of dark soy and a pinch of salt.', options: [{ id: 'jiangzhi', zh: '黄豆酱 + 甜面酱 + 蚝油 + 老抽', emoji: '🥣' }, { id: 'cu', zh: '香醋 + 白糖', emoji: '🫙' }, { id: 'shui', zh: '一碗清水', emoji: '💧' }], answer: 'jiangzhi', add: ['🥣'], tip: { zh: '先把酱汁调好再下锅，肉沫才不会炒过头。', en: 'Mix the sauce first so the pork does not overcook.' } },
      { type: 'heat', heat: 'zhong', zh: '炒杂酱：冷油下姜末蒜末爆香，倒入肉沫翻炒到变色出油，淋上调好的酱汁，中小火慢慢炒干水分。', py: 'Chǎo zájiàng: lěng yóu xià jiāngmò suànmò bàoxiāng, dào rù ròumò chǎo dào biànsè chū yóu, lín shàng jiàngzhī chǎo gān.', en: 'Fry the topping: garlic and ginger in cool oil until fragrant, add the pork and fry until it colours and releases oil, then pour in the sauce and fry gently until dry.', add: ['🫗', '🥩', '🥣'], tip: { zh: '水分收干，杂酱才香、才放得久。', en: 'Drive off the water — that keeps it fragrant and keeps longer.' } },
      { type: 'prep', zh: '擀面：500 克面粉加 3 克盐和 200—250 克清水，揉成偏硬的面团，醒一会儿再擀开切窄面。', py: 'Gǎn miàn: 500 kè miànfěn jiā 3 kè yán hé 200—250 kè qīngshuǐ, róu chéng piānyìng de miàntuán.', en: 'Make the noodles: 500 g flour, 3 g salt, 200–250 g water; knead into a firm dough, rest, roll out and cut into narrow strips.', add: ['🍜'], tip: { zh: '嫌麻烦直接买现成鲜面条也完全可以。', en: 'Short on time? Fresh shop-bought noodles are perfectly fine.' } },
      { type: 'season', zh: '碗底打底：碗里放半小勺猪油、葱花、1 勺香醋、1 勺辣椒油和一点十三香。', py: 'Wǎndǐ dǎdǐ: wǎn lǐ fàng zhūyóu, cōnghuā, xiāngcù, làjiāoyóu hé shísānxiāng.', en: 'Build the base: half a spoon of lard, scallion, 1 spoon of vinegar, 1 of chilli oil and a touch of thirteen-spice in the bottom of the bowl.', options: [{ id: 'diaoli', zh: '猪油、葱花、香醋、辣椒油、十三香', emoji: '🥣' }, { id: 'shui', zh: '一碗清水', emoji: '💧' }, { id: 'yan', zh: '半碗盐', emoji: '🧂' }], answer: 'diaoli', add: ['🥣'], tip: { zh: '猪油是香味关键，别省略。', en: 'The lard is the key to the aroma — do not skip it.' } },
      { type: 'order', zh: '组装：水烧开把面条煮熟，捞进调好味的碗里，铺上一大勺耙豌豆和一大勺肉杂酱。', py: 'Zǔzhuāng: shuǐ shāo kāi zhǔ shú miàntiáo, lāo jìn wǎn lǐ, pū shàng pá wāndòu hé ròu zájiàng.', en: 'Assemble: boil the noodles, lift them into the seasoned bowl, then spoon over the pea mash and the pork topping.', options: [{ id: 'wandou', zh: '耙豌豆 + 肉杂酱', emoji: '🥣' }, { id: 'tang', zh: '白糖', emoji: '🍬' }, { id: 'cu', zh: '香醋', emoji: '🫙' }], answer: 'wandou', add: ['🫛', '🥩', '🍜'], tip: { zh: '豌豆要够烂，才能"沙沙"地挂在面条上。', en: 'The peas must be soft enough to cling to the noodles.' } },
      { type: 'finish', zh: '开吃：撒上葱花和香菜，从底下往上拌匀，每根面条都裹上酱香和豌豆泥。', py: 'Kāi chī: sǎ shàng cōnghuā hé xiāngcài, bàn yún, měi gēn miàntiáo dōu guǒ shàng jiàng xiāng hé wāndòu ní.', en: 'To serve: scatter scallion and coriander, then toss from the bottom up so every strand is coated in sauce and pea mash.', add: ['🌱', '🥢'], tip: { zh: '先拌再吃——味道都藏在碗底。', en: 'Mix first: the flavour is hiding at the bottom of the bowl.' } }
    ]
  },

  /* ==================== 7. 冷吃牛肉 ==================== */

  {
    id: 'lengchi', name: '冷吃牛肉', py: 'Lěng chī niúròu', en: 'Cold-eaten Beef (Sichuan spiced strips)',
    emoji: '🥩', plate: '🍽️', color: '#8e2440',
    flavorId: 'mala', flavor: '麻辣味', flavorPy: 'málà wèi', heat: 3, difficulty: 2, minutes: 70,
    region: '自贡 · 盐帮菜', tags: ['下酒菜', '麻辣干香', '放凉更好吃'],
    story: {
      zh: '冷吃牛肉出自自贡——一座靠井盐兴旺起来的城市。盐场里干活的人出力多、出汗多，需要又咸又辣、顶饱又放得住的吃食，于是把牛肉顺着纹理切成条，下油慢慢把水分煸干，再用辣椒和花椒把味道收进去。自贡最有名的"冷吃"本来是冷吃兔，后来同门的冷吃牛肉、冷吃鸡尖也一起出了名。这道菜最特别的一点是：凉了以后香味更浓、味道更好，所以叫"冷吃"——刚出锅还不算最好吃，放凉才是它的高光时刻。',
      py: 'Lěng chī niúròu chū zì Zìgòng, yí zuò kào jǐngyán xīngwàng qǐlái de chéngshì.',
      en: 'Cold-eaten beef comes from Zigong, a city that grew rich on salt wells. Workers in the salt fields sweated hard and needed something salty, spicy, filling and long-lasting — so beef was cut into strips along the grain, slowly dried out in oil, then locked in with chilli and Sichuan pepper. Zigong\'s most famous "cold-eaten" dish was cold-eaten rabbit; beef, chicken wing tips and dried tofu followed the same path. What makes this dish special: it smells and tastes even better once it has cooled — which is exactly why it is called "cold-eaten". Straight from the wok is not its best moment.'
    },
    prep: [
      { ing: 'niurou', qty: '500 克（牛后腿肉或牛里脊）', prep: 'qiesi', note: { zh: '泡净血水，冷水下锅煮 30–40 分钟；放凉后顺着纹理切成条。', en: 'Soak out the blood, simmer in cold water 30–40 minutes, cool, then cut along the grain into strips.' } },
      { ing: 'gansuan', qty: '20 个', prep: 'qieduan', note: { zh: '剪成段，和花椒、麻椒一起用热水泡一下。', en: 'Snip into sections; soak with the peppercorns in hot water.' } },
      { ing: 'huajiao', qty: '1 大勺', prep: 'paofa', note: { zh: '先用热水泡过再下锅，不容易糊。', en: 'Soaked first, so it will not burn in the wok.' } },
      { ing: 'majiao', qty: '1 小勺', prep: 'paofa', note: { zh: '麻椒负责"麻"，和花椒一起泡。', en: 'Green pepper brings the numbing tingle — soak it with the rest.' } }
    ],
    seasonings: ['shengchou', 'haoyou', 'yan', 'baitang', 'jijing', 'zhima', 'ziranfen', 'shiyongyou'],
    seasonQty: {
      shengchou: '2 勺（拌牛肉条）', haoyou: '1 勺（拌牛肉条）', yan: '适量，出锅前放', baitang: '1 小勺',
      jijing: '少许', zhima: '1 大勺（白芝麻）', ziranfen: '1 小勺', shiyongyou: '多放一点，要能没过牛肉条'
    },
    flavorTask: {
      question: { zh: '"麻辣味"里的麻和辣，分别是谁给的？', en: 'In a numbing-and-hot flavour, who brings the numb and who brings the heat?' },
      options: [
        { zh: '花椒、麻椒给麻，干辣椒给辣', emoji: '🫘🌶️', correct: true },
        { zh: '白糖给麻，生抽给辣', emoji: '🍬🍶' },
        { zh: '蚝油给麻，孜然给辣', emoji: '🥫' }
      ],
      explain: { zh: '花椒和麻椒在舌尖上"跳"，干辣椒负责辣，再加一点糖回甜，麻辣才不冲。', en: 'Peppercorns make the tongue tingle, chilli brings the heat, a pinch of sugar rounds it off.' }
    },
    tips: [
      { zh: '一定要放凉了再吃：凉的比热的更香，这就是"冷吃"两个字的意思。', en: 'Eat it cool — it smells better cold. That is exactly what "cold-eaten" means.' },
      { zh: '油要多放一点，油少了炒不干、也挂不住辣味。', en: 'Be generous with the oil — too little and the strips never dry out or hold the chilli.' },
      { zh: '牛肉顺着纹理切条，吃的时候才有撕扯感、也不容易碎。', en: 'Cut along the grain so the strips hold together and shred as you chew.' },
      { zh: '辣椒和花椒先用热水泡一下，下锅不容易糊，香味反而更足。', en: 'Soak the chilli and peppers in hot water first — no burning, more aroma.' }
    ],
    steps: [
      { type: 'heat', heat: 'xiao', zh: '牛肉泡净血水，冷水下锅，小火煮 30–40 分钟。', py: 'Niúròu pào jìng xuèshuǐ, lěngshuǐ xià guō, xiǎohuǒ zhǔ sānshí dào sìshí fēnzhōng.', en: 'Soak out the blood, put the beef into cold water and simmer for 30–40 minutes.', add: ['🥩', '💧'], tip: { zh: '图上第 3 张：冷水下锅，煮 30–40 分钟，筷子能扎透就好。', en: 'Image 3: cold water, 30–40 minutes — until a chopstick slides through.' } },
      { type: 'wait', seconds: 9, label: '煮 30–40 分钟（课堂快进）', zh: '煮好捞出来放凉，顺着纹理切成条。', py: 'Zhǔ hǎo lāo chūlái fàng liáng, shùnzhe wénlǐ qiē chéng tiáo.', en: 'Lift it out, let it cool, then cut into strips along the grain.', add: ['🥩'], tip: { zh: '图上第 5 张：凉了才切得整齐，顺着纹理切不容易碎。', en: 'Image 5: cool first for neat strips, and cut along the grain so they hold.' } },
      { type: 'order', zh: '切好的牛肉条，先加哪两样拌一拌？', py: 'Qiē hǎo de niúròu tiáo, xiān jiā nǎ liǎng yàng bàn yi bàn?', en: 'What goes onto the strips first?', options: [{ id: 'shao', zh: '生抽 + 蚝油', emoji: '🍶🦪' }, { id: 'shui', zh: '一碗清水', emoji: '💧' }, { id: 'cu', zh: '半碗香醋', emoji: '🫙' }], answer: 'shao', add: ['🥩', '🍶'], tip: { zh: '图上第 6 张：生抽和蚝油各一点，抓匀就行。', en: 'Image 6: a little light soy and oyster sauce — just toss it through.' } },
      { type: 'season', zh: '辣椒、花椒、麻椒先做什么？', py: 'Làjiāo, huājiāo, májiāo xiān zuò shénme?', en: 'What happens to the chilli and peppers first?', options: [{ id: 'pao', zh: '用热水泡一下', emoji: '💧' }, { id: 'zhijie', zh: '直接下油锅', emoji: '🔥' }, { id: 'leng', zh: '用冷水冲一冲', emoji: '🚰' }], answer: 'pao', add: ['🌶️', '🫘'], tip: { zh: '图上第 7 张：热水泡一下，下锅不糊、香味更足。', en: 'Image 7: a hot-water soak keeps them from burning and brings out the aroma.' } },
      { type: 'heat', heat: 'zhong', zh: '锅里多放油，下牛肉条翻炒，把水分炒干。', py: 'Guō lǐ duō fàng yóu, xià niúròu tiáo fānchǎo, bǎ shuǐfèn chǎo gān.', en: 'Pour in plenty of oil, add the strips and fry until the moisture is gone.', add: ['🫗', '🥩'], tip: { zh: '图上第 8 张：油要能没过牛肉条，中火慢慢把水分炒走。', en: 'Image 8: enough oil to cover the strips; medium heat drives the water out.' } },
      { type: 'stir', target: 8, seconds: 9, word: '翻炒', zh: '炒到七八分干，加入泡好的辣椒和花椒一起翻炒。', py: 'Chǎo dào qī bā fēn gān, jiārù pào hǎo de làjiāo hé huājiāo yìqǐ fānchǎo.', en: 'When the strips are about 70–80% dry, add the soaked chilli and peppers and keep tossing.', add: ['🌶️', '🫘'], tip: { zh: '图上第 9 张：七八分干就下辣椒花椒丝，一起炒到干香。', en: 'Image 9: at 70–80% dry, add the chilli and pepper threads and toss until fragrant.' } },
      { type: 'season', zh: '出锅前调味，要放哪几样？', py: 'Chū guō qián tiáowèi, yào fàng nǎ jǐ yàng?', en: 'Before serving, what goes in?', options: [{ id: 'tiao', zh: '盐 + 白糖 + 鸡精 + 白芝麻 + 孜然粉', emoji: '🧂🍬' }, { id: 'cu', zh: '香醋 + 香油', emoji: '🫙' }, { id: 'shui', zh: '半碗清水', emoji: '💧' }], answer: 'tiao', add: ['🧂', '🍬', '⚪'], tip: { zh: '图上第 1 张：盐、白糖、鸡精、白芝麻、孜然粉一起放，翻匀就出锅。', en: 'Image 1: salt, sugar, chicken essence, sesame and cumin together — toss and serve.' } },
      { type: 'finish', zh: '盛出来彻底放凉，越凉越香——开吃！', py: 'Chéng chūlái chèdǐ fàng liáng, yuè liáng yuè xiāng.', en: 'Tip it out and let it cool completely — the cooler it gets, the better it tastes.', add: ['💨'], tip: { zh: '图上第 2 张：放凉以后又香又耐嚼，配酒一绝。', en: 'Image 2: cooled down it is fragrant and chewy — perfect with a drink.' } }
    ]
  },

  /* ==================== 8. 干煸四季豆 ==================== */
  {
    id: 'ganbian', name: '干煸四季豆', py: 'Gānbiān sìjìdòu', en: 'Dry-fried Green Beans',
    emoji: '🫛', plate: '🍽️', color: '#3f7d3a',
    flavorId: 'jiachang', flavor: '家常味', flavorPy: 'jiācháng wèi', heat: 2, difficulty: 1, minutes: 20,
    region: '四川 · 家常素菜', tags: ['素菜', '安全第一', '认识"煸"'],
    story: {
      zh: '"煸"是川菜很特别的一个做法：锅里放不多的油，用中小火慢慢炒，把食材里的水分一点点炒走，表面就会起皱、变得干香，行话叫"虎皮"。干煸四季豆就是这样做的，再用干辣椒、花椒、蒜瓣爆香，最后加生抽、辣椒面和白芝麻，又香又下饭。要记住一件事：四季豆含有皂甙和红细胞凝集素，必须彻底加热熟透，半生的四季豆会让人中毒，所以这道菜也是"厨房安全"最好的教材。',
      py: '"Biān" shì chuāncài hěn tèbié de yí ge zuòfǎ.',
      en: '"Biān" is a distinct Sichuan technique: a little oil, medium-low heat, slowly driving out moisture until the surface wrinkles and turns fragrant — chefs call it "tiger skin". Dry-fried green beans are the classic example, finished with dried chilli, Sichuan pepper, garlic, soy sauce, chilli powder and sesame. One rule never changes: green beans contain saponins and phytohaemagglutinin, so they must be fully cooked — half-raw beans can make people ill.'
    },
    prep: [
      { ing: 'sijidou', qty: '400 克', prep: 'qieduan', note: { zh: '掐掉两头和筋，掰成 5 厘米左右的段，洗净后一定要晾干。', en: 'Snap off both ends, break into 5 cm sections, wash and dry well.' } },
      { ing: 'dasuan', qty: '4 瓣', prep: 'paisui', note: { zh: '拍碎，蒜香才出得来。', en: 'Smash the cloves so the aroma comes out.' } },
      { ing: 'ganlajiao', qty: '5 个', prep: 'qieduan', note: { zh: '剪成段，怕辣可以少放。', en: 'Snip into sections; use fewer if you dislike heat.' } },
      { ing: 'huajiao', qty: '1 小勺', prep: 'chaoxiang', note: { zh: '和干辣椒、蒜瓣一起下锅炒香。', en: 'Goes into the wok with the chilli and garlic.' } }
    ],
    seasonings: ['ganlajiao', 'huajiao', 'suanmo', 'shengchou', 'yan', 'jijing', 'lajiaomian', 'zhima', 'shiyongyou'],
    seasonQty: {
      ganlajiao: '5 个，剪段', huajiao: '1 小勺', suanmo: '4 瓣，拍碎', shengchou: '2 勺',
      yan: '少许', jijing: '少许', lajiaomian: '1 勺', zhima: '1 勺', shiyongyou: '适量（炸豆角用）'
    },
    flavorTask: {
      question: { zh: '按图：倒入豆角以后，加的是哪一组？', en: 'After the beans go back in, which set is added?' },
      options: [
        { zh: '两勺生抽 + 少许盐 + 鸡精', emoji: '🍶🧂', correct: true },
        { zh: '两勺白糖 + 一勺醋', emoji: '🍬🫙' },
        { zh: '半碗清水 + 一勺淀粉', emoji: '💧🥣' }
      ],
      explain: { zh: '生抽给咸鲜，盐和鸡精各少许；最后再撒一勺辣椒面和白芝麻。', en: 'Soy sauce for savour, a touch of salt and chicken essence — then chilli powder and sesame at the end.' }
    },
    tips: [
      { zh: '四季豆必须彻底熟透！半生的四季豆含皂甙，会让人不舒服。', en: 'Green beans must be fully cooked — half-raw beans can make you ill.' },
      { zh: '豆角洗过一定要晾干再下锅，不然油会溅。', en: 'Dry the beans before they hit the oil, or it will spit.' },
      { zh: '炸到虎皮状先捞出，最后再回锅调味，豆角才外皱里嫩。', en: 'Lift the beans out once wrinkled, then return them at the end for seasoning.' },
      { zh: '辣椒面和白芝麻最后放，颜色红、香味足。', en: 'Chilli powder and sesame go in last, for colour and aroma.' }
    ],
    steps: [
      { type: 'heat', heat: 'zhong', zh: '豆角洗净晾干，油热后倒入豆角。', py: 'Dòujiǎo xǐ jìng liàng gān, yóu rè hòu dào rù dòujiǎo.', en: 'Dry the beans, heat the oil and slide them in.', add: ['🫗', '🫛'], tip: { zh: '中火就好：火太大会外糊内生。', en: 'Medium heat — too hot burns the outside and leaves the inside raw.' } },
      { type: 'wait', seconds: 10, label: '炸到虎皮状', zh: '中火炸到表皮起皱、变成虎皮色，先捞出来。', py: 'Zhōng huǒ zhá dào biǎopí qǐ zhòu.', en: 'Fry until the skins wrinkle and turn "tiger-skin" brown, then lift them out.', add: ['💨'], tip: { zh: '这一步不能省时间——安全第一！', en: 'Never rush this step. Safety first!' } },
      { type: 'order', zh: '锅里留底油，先下……', py: 'Guō lǐ liú dǐyóu, xiān xià…', en: 'Leave a little oil — what goes in first?', options: [{ id: 'xiang', zh: '干辣椒 + 花椒 + 蒜瓣', emoji: '🌶️🫘🧄' }, { id: 'shui', zh: '一碗水', emoji: '💧' }, { id: 'cu', zh: '香醋', emoji: '🫙' }], answer: 'xiang', add: ['🌶️', '🫘', '🧄'], tip: { zh: '小火炒香，别炒糊。', en: 'Low heat — do not burn them.' } },
      { type: 'season', zh: '倒入豆角，加……', py: 'Dào rù dòujiǎo, jiā…', en: 'Return the beans and add…', options: [{ id: 'shao', zh: '两勺生抽 + 少许盐 + 鸡精', emoji: '🍶🧂' }, { id: 'tang', zh: '两勺白糖', emoji: '🍬' }, { id: 'shui', zh: '半碗清水', emoji: '💧' }], answer: 'shao', add: ['🫛', '🍶'], tip: { zh: '图上第 4 格：两勺生抽、少许盐和鸡精。', en: 'Tile 4: two spoons of soy sauce, a little salt and chicken essence.' } },
      { type: 'season', zh: '再撒上……', py: 'Zài sǎ shàng…', en: 'Then sprinkle in…', options: [{ id: 'mian', zh: '一勺辣椒面 + 白芝麻', emoji: '🌶️⚪' }, { id: 'cu', zh: '一勺香醋', emoji: '🫙' }, { id: 'tang', zh: '一勺白糖', emoji: '🍬' }], answer: 'mian', add: ['🌶️', '⚪'], tip: { zh: '图上第 5 格：辣椒面和白芝麻最后放，颜色才红。', en: 'Tile 5: chilli powder and sesame last, for colour.' } },
      { type: 'finish', zh: '翻炒均匀，即可出锅！', py: 'Fānchǎo jūnyún, jí kě chū guō!', en: 'Toss until evenly coated and serve.', add: ['💨'], tip: { zh: '图上第 6 格：外皮微皱、里面还嫩，这就是"干煸"。', en: 'Wrinkled outside, tender inside — that is "dry-fried".' } }
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
  { q: { zh: '豌杂面里的"豌"和"杂"分别是什么？', en: 'In wanza noodles, what do "wan" and "za" stand for?' },
    options: [{ zh: '"豌"是耙豌豆，"杂"是猪肉杂酱', en: '"wan" is soft-cooked peas, "za" is the pork topping', correct: true }, { zh: '"豌"是碗，"杂"是杂菜', en: '"wan" is the bowl, "za" is mixed vegetables' }, { zh: '"豌"是豌豆，"杂"是肉丝', en: '"wan" is peas, "za" is shredded pork' }],
    explain: { zh: '四川话说"耙"就是软烂：豌豆压得越烂越沙，杂酱炒到干香，拌在一起才好吃。', en: 'In Sichuanese "pa" means mushy-soft: the peas are cooked to a sandy mash, the pork fried dry and fragrant, then both are tossed through the noodles.' } },
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
