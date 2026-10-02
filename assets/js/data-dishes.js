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
      zh: '清同治年间，成都北门外万福桥边有家小饭铺，老板娘陈刘氏脸上有几颗麻点，熟客都叫她"陈麻婆"。那时万福桥是运油、运米的挑夫必经之地，挑夫们把自带的豆腐和一点牛肉交给店里，付几文钱请她代炒。她做的豆腐又麻又辣又烫，香气能盖过整条街，一来二去，"陈麻婆的豆腐"就简化成了"麻婆豆腐"。\n\n这道菜的地位，从它被夸的八个字就能看出来：麻、辣、烫、香、酥、嫩、鲜、活。麻来自花椒，讲究现磨现撒；辣来自郫县豆瓣，要小火慢炒到红油冒出来；酥是把牛肉末炒到干香；嫩是豆腐先用淡盐水焯过定型；"活"则是端上桌时表面还在咕嘟冒泡，也就是四川人说的"烫得跳"。\n\n传统做法用牛肉末而不用猪肉，这是成都"上河帮"的老规矩。今天它已经是川菜最出名的一张名片，各地的中餐馆把它改得五花八门——日本的麻婆豆腐常加甜面酱，口味更温和；而在成都，老师傅判断一碗麻婆豆腐合不合格，看的还是那八个字。',
      py: 'Qīngcháo Tóngzhì niánjiān, Chéngdū Wànfúqiáo biān yǒu yì jiā xiǎo fàn pù, lǎobǎnniáng xìng Chén, liǎn shang yǒu jǐ kē mázi, dàjiā jiào tā "Chén mápó".',
      en: 'In the 1860s a small eatery stood by the Wanfu Bridge outside Chengdu\'s north gate, run by a woman with a pockmarked face whom regulars called "Granny Chen the pockmarked". Porters carrying oil and rice stopped there with their own tofu and a little beef, paid a few coins and asked her to cook it. Her tofu was numbing, fiery and scalding, and the smell carried down the street — so "Granny Chen\'s tofu" gradually became "mapo tofu".\n\nCooks judge the dish by eight qualities: numbing, hot, scalding, fragrant, crisp, tender, fresh and "alive" — still bubbling at the table. The numbing comes from Sichuan pepper, ground fresh and sprinkled last; the heat from Pixian bean paste fried slowly until red oil surfaces; the crispness from minced beef fried dry; the tenderness from tofu blanched in light brine so it holds its shape.\n\nMinced beef rather than pork is the old Chengdu rule. Today it is Sichuan\'s best-known calling card, and restaurants everywhere adapt it — in Japan it is often softened with sweet bean paste. In Chengdu, though, a bowl is still judged by those eight words.'
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
      zh: '"宫保"两个字不是菜名，是官衔。清代官员丁宝桢曾任四川总督，朝廷授他"太子少保"，这个衔在民间俗称"宫保"。他家常请客，家厨做的一道炒鸡丁很出名，客人索性拿主人的官衔给它命了名。丁宝桢是贵州人，在山东、四川都任过职，所以川、黔、鲁三地至今还在争这道菜的"户口"。\n\n它的味道密码藏在两个词里：糊辣和荔枝。干辣椒在锅里炒到微微发焦、香气冲出来，四川人叫"糊辣"；糖和醋按比例调出的酸甜回口不刺人，像荔枝的清甜，叫"荔枝味"。一咸、一甜、一酸、一辣，四种味道要互不抢戏。\n\n做它有两个小规矩：花生米必须最后和葱段一起下锅，早放就软了；碗汁——生抽、醋、糖、淀粉加一点清水——要提前调好，一次倒入、大火收汁，鸡丁才外亮里嫩。它是海外中餐馆最常被点到的川菜之一，英文 Kung Pao Chicken 里那个"Pao"，其实就是"宫保"的音。',
      py: 'Qīngcháo guānyuán Dīng Bǎozhēn dāngguo Sìchuān zǒngdū, guānxián shì "Tàizǐ Shǎobǎo", rén chēng "Dīng Gōngbǎo".',
      en: '"Gongbao" is not a dish name but an honorary title. The Qing official Ding Baozhen served as governor of Sichuan and was granted the title "Junior Guardian of the Heir Apparent", known in common speech as gongbao. His household entertained often, and a fried chicken dish from his kitchen became famous — guests simply named it after his rank. Ding was from Guizhou and also served in Shandong, so three provinces still claim the dish.\n\nIts flavour hides in two words: burnt-chilli and lychee. Chillies toasted in the wok until just smoky give the "burnt-chilli" note; sugar and vinegar in the right ratio give a rounded sweet-sour finish like lychee. Salty, sweet, sour and hot all have to stay in balance.\n\nTwo small rules matter: peanuts go in at the very end with the scallion, or they lose their crunch; and the sauce — soy, vinegar, sugar, starch and a little water — is mixed in a bowl first, then poured in at once over high heat so the chicken comes out glossy outside and tender inside. Abroad it is one of the most ordered Sichuan dishes, and the "Pao" of Kung Pao is simply gongbao.'
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
      zh: '"回锅"就是"再回到锅里"。这道菜的标准流程是三句话：一煮、二炒、三回锅。整块猪肉（常用二刀肉或五花肉）先冷水下锅，加姜葱、料酒煮到七八成熟，捞出来晾凉再切薄片——热肉切不薄，凉了才切得整齐。\n\n关于它的来历，流传最广的一种说法和祭祖有关：旧时四川人祭祖用白水煮肉，敬过祖先的肉没什么味道，就切片回锅，加豆瓣酱、豆豉、甜面酱和蒜苗再炒一遍，"回锅肉"就这样得名。另一层记忆是"打牙祭"：以前寻常人家吃得清淡，农历初二、十六才吃肉，回锅肉往往是那天桌上最有分量的一道。\n\n判断师傅手艺的标准很形象——肉片下锅后会慢慢卷起来，像一个个小灯盏，行话叫"灯盏窝"。卷得起来，说明肉挑得对、火候也到位。川菜里它常被叫作"第一菜"，固定搭档是郫县豆瓣：炒出红油，才有那股酱香和红亮。现在回锅肉的花样很多，回锅萝卜、回锅茄子都是从它派生出来的家常做法。',
      py: '"Huí guō" jiù shì "zài huí dào guō lǐ".',
      en: '"Huiguo" means "back to the wok", and that is exactly the method: boil, slice, then fry again. A whole piece of pork — usually belly — goes into cold water with ginger, scallion and cooking wine until about seventy per cent done. It is lifted out, left to cool, then sliced thin. Warm meat will not slice thinly; cooled meat will.\n\nThe most common story about its origin involves ancestral offerings: in old Sichuan, meat was boiled plain for the ancestors, and since the offering itself was tasteless, people sliced it and returned it to the wok with bean paste, fermented black beans, sweet wheat paste and garlic sprouts. Another layer is the memory of "meat days" — twice a month, on the second and sixteenth, families ate meat, and twice-cooked pork was usually the centrepiece.\n\nA cook\'s skill shows in the curl: good slices gradually roll up into little cups, known in the trade as "lamp-cups". It is often called Sichuan\'s number one dish, and its fixed partner is Pixian bean paste — fried until the red oil comes out, which is where the colour and savour come from.'
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
      zh: '"鱼香"里没有鱼。四川人烧鱼爱用泡椒、姜、葱、蒜，再加糖和醋调味。这套调味后来被发现拿来炒肉丝同样好使，于是"鱼香"就从一种做鱼的方法变成了一种味型——名字说的是味道，不是食材。\n\n真正的难点在"调和"：泡椒给酸和辣，姜葱蒜给香底，糖给回甜，醋给酸香，酱油给咸鲜，几样缺一样都会"瘸"。所以厨师们习惯提前在碗里把糖、醋、酱油、淀粉和一点清水调成"碗汁"，下锅前搅匀，一次倒入、大火一收，味道才挂得住、不出汤。\n\n在川菜课堂里，鱼香肉丝几乎是必考的一道，因为它最能看出基本功：酸甜咸辣不能有一个冒头。它和宫保鸡丁一样，属于川菜"复合味"的代表——一道菜里同时存在几种味道，靠比例而不是靠量取胜。川菜里名字和食材"对不上"的味型还有荔枝味、家常味，说的都是味道本身。',
      py: '"Yúxiāng" bú shì yú de xiāngwèi, ér shì Sìchuān rén zuò yú shí yòng de nà tào tiáoliào.',
      en: 'There is no fish in "fish-fragrant". Sichuan cooks braise fish with pickled chillies, ginger, scallion and garlic, sweetened and soured with sugar and vinegar. People noticed the same seasoning worked beautifully with shredded pork, and so a way of cooking fish turned into a flavour type — the name describes the taste, not the ingredients.\n\nThe difficulty lies in balancing: pickled chilli brings sour and hot, ginger, scallion and garlic bring the aromatic base, sugar brings a sweet echo, vinegar sharpens, soy sauce rounds it out. Cooks therefore mix the sauce in a bowl first — sugar, vinegar, soy, starch and a little water — then pour it in all at once over high heat so it clings instead of turning soupy.\n\nIt is a standard test dish in Sichuan cooking schools precisely because nothing may dominate. Like Kung Pao chicken it belongs to Sichuan\'s "compound flavours", where several tastes coexist and proportion, not quantity, decides.'
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
      zh: '它诞生在盐井边上。自贡靠井盐兴盛了两千多年，开采、运卤、拉盐都靠牛。牛在盐场里是重要的劳力，退役或病死后，盐工们舍不得丢，就用盐水加辣椒、花椒煮着吃——这就是水煮牛肉的雏形。肉粗、味重、汤烫，正好对付一天的体力活。\n\n名字里带着"水煮"，但它一点不清淡。"水煮"说的是先用汤把肉煮熟，真正的香味来自最后一步：肉片捞进碗里，面上撒辣椒面和花椒粉，再一勺滚油泼下去——"刺啦"一声，辣香和麻香被同时逼出来。油温不够就只辣不香，油温过了又会发苦。\n\n牛肉要提前上浆（淀粉、料酒、蛋清），煮的时候才嫩；汤里常配莴笋、黄豆芽，吸饱汤汁更好吃。它是自贡"小河帮（盐帮菜）"的代表之一——重油重辣、味道冲，带着盐场的生活痕迹。今天在水煮牛肉的基础上，又长出了水煮鱼、水煮肉片这一大家子。',
      py: 'Zìgòng shì Sìchuān de "yándū", yánchǎng gōngrén yòng niúròu jiā làjiāo huājiāo zhǔ chéng yí dà guō.',
      en: 'This dish was born beside salt wells. Zigong grew rich on well salt for two thousand years, and oxen did the hardest work — hauling brine and salt. When an ox retired or died, the salt workers would not waste it: they simmered the meat with brine, chillies and Sichuan pepper. Coarse meat, heavy seasoning, scalding broth — exactly what a day of hard labour demanded.\n\nThe name says "water-boiled", but nothing about it is bland. Boiling is only the first half; the aroma comes at the end, when chilli flakes and ground Sichuan pepper are scattered over the meat and a ladle of smoking oil is poured on. If the oil is too cool you get heat without fragrance; too hot and it turns bitter.\n\nThe beef is velveted with starch, wine and egg white so it stays tender, and the broth is usually padded out with celtuce or soybean sprouts that soak up the flavour. It is a flagship of Zigong\'s "salt-help" style — rich and loud, carrying the traces of salt-field life. Fish and pork versions grew out of it later.'
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
      zh: '重庆人的早晨，常常从一碗小面开始。面摊支在路边，一口大锅滚着水，老板抓一把面丢下去，几秒钟就捞起来——碗里早已放好了调料。"豌杂"是这一族里最有饱腹感的版本：耙豌豆加一勺肉杂酱，很多人拿它当早饭，也当午饭。\n\n四川话里"耙"就是煮得软烂。豌豆要提前泡发，炖到起沙、勺子一压就散，才能挂在面条上；杂酱则用猪肉末加黄豆酱、甜面酱、蚝油炒香，炒到油亮、微微发干。面用的是碱水细面，煮好捞进碗里，口感才爽滑。\n\n小面真正的功夫在碗底：猪油、辣椒油、蒜水、花椒粉、芽菜、葱花先在碗里调好，面条一捞进去拌开，味道才立体。所以老重庆人评价一碗小面，看的是"调料打得正不正"，而不是面煮了多久。如今小面已经是这座城市的早饭名片，豌杂面是其中最实在的一种。',
      py: 'Wān zá miàn shì Chóngqìng xiǎomiàn de yì zhǒng: "wān" shì pá wāndòu, "zá" shì ròu zájiàng.',
      en: 'Many Chongqing mornings begin with a bowl of noodles. The stall sits on the pavement, a big pot rolls at a boil, the owner throws in a handful of noodles and lifts them out seconds later — the seasoning is already waiting in the bowl. The "wanza" version is the most filling of the family: soft peas plus a spoonful of savoury pork topping, eaten as breakfast and often as lunch.\n\nIn Sichuan dialect "pa" means cooked to a mush. The peas are soaked, then simmered until they crumble at the touch of a spoon, so they cling to the noodles. The topping is minced pork fried with yellow bean paste, sweet wheat paste and oyster sauce until glossy and just dry. The noodles themselves are thin and alkaline, which is what makes them springy.\n\nThe real skill sits at the bottom of the bowl: lard, chilli oil, garlic water, ground pepper, preserved mustard sprout and scallion are mixed first, so that when the noodles land and are tossed, the flavour comes together. Locals judge a bowl by how well the seasoning is built, not by how long the noodles cooked.'
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
      zh: '"冷吃"两个字，说的不是温度，是时机。自贡盐场里的工人出力多、出汗多，需要又咸又辣、能放得住、还能揣在身上的吃食。牛肉顺纹切成条、下油慢慢把水分煸干，再用辣椒和花椒把味道收进去——水分越少，放得越久，这就是"冷吃"的雏形。\n\n自贡最有名的"冷吃"其实是冷吃兔，有上百年历史，属于盐帮菜的代表；冷吃牛肉、冷吃鸡尖、冷吃豆干都是它的同门。做法上都是同一套逻辑：先把主料煮到断生，再下油煸到七八分干，最后加辣椒、花椒和香料翻炒收味。\n\n它最反常识的一点是：放凉以后更好吃。水分炒干之后，辣椒和花椒的香气在温度降下来时反而更清楚，肉也更有嚼劲，一根一根撕着吃，越嚼越香。所以做这道菜的最后一步是"放凉"——刚出锅不算最好吃，凉了才是它的高光时刻。',
      py: 'Lěng chī niúròu chū zì Zìgòng, yí zuò kào jǐngyán xīngwàng qǐlái de chéngshì.',
      en: '"Cold-eaten" is not about temperature but about timing. Workers in the Zigong salt fields sweated hard and needed food that was salty, spicy, filling, long-lasting and easy to carry. Beef was cut into strips along the grain, slowly dried in oil, then locked in with chilli and Sichuan pepper. The less water left, the longer it keeps — the beginning of "cold-eaten".\n\nZigong\'s most famous cold-eaten dish is actually rabbit, over a century old and a flagship of the salt-help style; beef, chicken wing tips and dried tofu are its siblings. They all follow one logic: parboil the main ingredient, dry-fry it in oil until about three-quarters dry, then finish with chilli, pepper and spices.\n\nIts most counter-intuitive point: it tastes better cool. Once the water is driven off, the chilli and pepper aromas read more clearly as the temperature drops, and the texture firms up — shred it with your fingers, one strip at a time. That is why "let it cool" is a step in the recipe, and why straight from the wok is not its best moment.'
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
      zh: '"煸"是川菜里很有耐心的一种做法：锅里放不多的油，用中小火慢慢炒，把食材里的水分一点点逼出来，表面就会起皱、发亮、变香，行话叫"虎皮"。干煸四季豆就是这种技法的代表——急不得，火一大就外面糊、里面还生。\n\n它也是一道"厨房安全"教材。四季豆含皂甙和红细胞凝集素，没有彻底加热就会让人恶心、呕吐、拉肚子。所以这道菜的标准只有一个：必须熟透。家里做的时候，宁可比平时多炒一两分钟；豆角洗过一定要晾干再下锅，不然油花会溅。\n\n香味的来源不止辣椒：干辣椒和花椒负责麻与辣，蒜瓣负责香，有些师傅还会加一点芽菜或榨菜末提鲜——不靠肉，也能做得有滋有味，这是川菜做素菜的看家本事。学会"干煸"以后，干煸苦瓜、干煸土豆丝、干煸杏鲍菇都能照着做。',
      py: '"Biān" shì chuāncài hěn tèbié de yí ge zuòfǎ.',
      en: '"Bian" is one of Sichuan\'s most patient techniques: a little oil, medium-low heat, and time. Moisture is slowly driven out until the surface wrinkles, shines and smells toasted — cooks call it "tiger skin". Dry-fried green beans are the classic example. There is no rushing it: too much heat and the outside burns while the inside stays raw.\n\nIt is also a lesson in kitchen safety. Green beans contain saponins and phytohaemagglutinin; undercooked, they cause nausea, vomiting and stomach cramps. So the dish has exactly one rule: they must be fully cooked. At home, give them an extra minute or two rather than less, and always dry the beans before they go into the oil, or it will spit.\n\nAroma comes from more than chilli: dried chillies and Sichuan pepper supply heat and numbness, garlic supplies fragrance, and some cooks add a little preserved mustard sprout for savour. No meat is needed to make it rich — that is the skill behind Sichuan vegetable cooking. Once you can dry-fry, bitter melon, potato slivers and king oyster mushrooms all follow.'
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
  { id: 'chef', zh: '川味大厨', en: 'Sichuan Chef', emoji: '👨‍🍳', desc: { zh: '完成 4 道菜。', en: 'Complete 4 dishes.' } }
];

window.CC = CC;
