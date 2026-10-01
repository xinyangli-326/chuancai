/* 厨房与味道 · 词条弹窗详解：这是什么 / 例句 / 什么时候用
   键必须和 data-core.js 里 CC.tools、CC.tastes 的 zh 完全一致（改完可以跑 work/check-tools-detail.mjs 体检）。 */
window.CC_TOOLS_DETAIL = {

  /* ==================== 厨具 · 12 ==================== */
  '炒锅': {
    note: { zh: '圆底的中式大铁锅，川菜的炒、煸、爆几乎都靠它，"锅气"就是从这里来的。', en: 'The round-bottomed Chinese wok — where most Sichuan stir-frying and dry-frying happens.' },
    ex: [{ zh: '先把炒锅烧热，再倒油。', py: 'Xiān bǎ chǎoguō shāo rè, zài dào yóu.', en: 'Heat the wok first, then add the oil.' },
         { zh: '炒锅烧到冒烟，菜才有锅气。', py: 'Chǎoguō shāo dào mào yān, cài cái yǒu guōqì.', en: 'Get the wok smoking and the dish will have wok aroma.' }],
    scene: { zh: '在厨房里请人递锅、问"锅热了吗"，或者买锅时说"我要一个炒锅"。', en: 'Asking for the wok, asking whether it is hot enough, or buying one.' }
  },
  '锅铲': {
    note: { zh: '炒菜时翻菜用的铲子；铁锅配铁铲，不粘锅要用软铲，不然会刮坏。', en: 'The spatula you stir and flip with — metal for a wok, soft-edged for a non-stick pan.' },
    ex: [{ zh: '用锅铲把菜翻一下。', py: 'Yòng guōchǎn bǎ cài fān yíxià.', en: 'Give the vegetables a flip with the spatula.' },
         { zh: '锅铲不要刮坏不粘锅。', py: 'Guōchǎn bú yào guā huài bùzhānguō.', en: 'Don\'t scrape the non-stick pan with the spatula.' }],
    scene: { zh: '做菜时指挥动作："帮我拿一下锅铲"；买厨具时也能问"这个锅铲多少钱？"', en: 'Asking a friend to pass it while cooking, or asking the price in a kitchenware shop.' }
  },
  '菜刀': {
    note: { zh: '中式方刀，切菜、切肉、拍蒜都用它，是川菜厨房里最重要的工具。', en: 'The Chinese cleaver — for vegetables, meat and smashing garlic; the workhorse of a Sichuan kitchen.' },
    ex: [{ zh: '菜刀要磨快一点。', py: 'Càidāo yào mó kuài yìdiǎn.', en: 'The cleaver needs sharpening.' },
         { zh: '用菜刀把豆腐切成小块。', py: 'Yòng càidāo bǎ dòufu qiē chéng xiǎo kuài.', en: 'Cut the tofu into small cubes with the cleaver.' }],
    scene: { zh: '备菜时最常用；在菜市场可以问"这把刀快不快？"', en: 'Everyday prep work, or asking at the market whether a knife is sharp.' }
  },
  '砧板': {
    note: { zh: '切菜用的板子，生肉和熟食最好分开用，切完要洗干净。', en: 'The cutting board — use separate boards for raw meat and ready-to-eat food, and wash it after use.' },
    ex: [{ zh: '在砧板上把肉切成片。', py: 'Zài zhēnbǎn shàng bǎ ròu qiē chéng piàn.', en: 'Slice the meat on the cutting board.' },
         { zh: '砧板用完要洗干净。', py: 'Zhēnbǎn yòng wán yào xǐ gānjìng.', en: 'Wash the board after you finish.' }],
    scene: { zh: '合租、食堂后厨里常说："哪个砧板切肉？"', en: 'Shared kitchens and canteens: "which board is for meat?"' }
  },
  '碗': {
    note: { zh: '盛饭、盛汤的碗；厨房里也用来打蛋、装调料。', en: 'A bowl for rice or soup — also used in the kitchen to beat eggs or hold seasonings.' },
    ex: [{ zh: '给我一个小碗。', py: 'Gěi wǒ yí gè xiǎo wǎn.', en: 'Give me a small bowl.' },
         { zh: '把鸡蛋打在碗里，搅匀。', py: 'Bǎ jīdàn dǎ zài wǎn lǐ, jiǎoyún.', en: 'Crack the egg into the bowl and beat it.' }],
    scene: { zh: '在饭馆说"再来一碗米饭"；在厨房里要容器也说"给我一个碗"。', en: 'Ordering another bowl of rice, or asking for a container in the kitchen.' }
  },
  '盘子': {
    note: { zh: '装菜的盘子，川菜的凉菜、炒菜都盛在盘子里。', en: 'The plate — cold dishes and stir-fries are both served on one.' },
    ex: [{ zh: '把炒好的菜盛到盘子里。', py: 'Bǎ chǎo hǎo de cài chéng dào pánzi lǐ.', en: 'Slide the finished dish onto a plate.' },
         { zh: '盘子很烫，小心一点。', py: 'Pánzi hěn tàng, xiǎoxīn yìdiǎn.', en: 'The plate is hot — be careful.' }],
    scene: { zh: '上菜、传菜的时候用；在饭馆可以要"一个空盘子"。', en: 'Serving dishes, or asking for "an empty plate" in a restaurant.' }
  },
  '筷子': {
    note: { zh: '吃饭用的筷子；做菜时也用长筷子夹、挑、拨。', en: 'Chopsticks — long ones are also used in the kitchen to pick, lift and stir.' },
    ex: [{ zh: '请给我一双筷子。', py: 'Qǐng gěi wǒ yì shuāng kuàizi.', en: 'Please give me a pair of chopsticks.' },
         { zh: '用筷子把面条挑起来。', py: 'Yòng kuàizi bǎ miàntiáo tiāo qǐlái.', en: 'Lift the noodles with your chopsticks.' }],
    scene: { zh: '在饭馆要餐具："麻烦给我一双筷子"；也是留学生餐桌上最常用的一句话。', en: 'Asking for cutlery in a restaurant — the phrase exchange students use most at the table.' }
  },
  '漏勺': {
    note: { zh: '有洞的勺子，捞面、捞饺子、焯完水捞菜都靠它沥水。', en: 'The slotted spoon — drains noodles, dumplings and blanched vegetables.' },
    ex: [{ zh: '用漏勺把面条捞出来。', py: 'Yòng lòusháo bǎ miàntiáo lāo chūlái.', en: 'Fish the noodles out with the slotted spoon.' },
         { zh: '漏勺沥水很快。', py: 'Lòusháo lì shuǐ hěn kuài.', en: 'A slotted spoon drains very fast.' }],
    scene: { zh: '煮面、焯水的时候用；在面馆看师傅"用漏勺捞面"也常听到。', en: 'Boiling noodles or blanching vegetables — and you will hear it at any noodle shop.' }
  },
  '蒸笼': {
    note: { zh: '竹编的蒸笼，蒸包子、蒸菜、蒸饭都香，靠蒸汽把东西蒸熟。', en: 'A bamboo steamer — buns, vegetables and rice all cook in its steam.' },
    ex: [{ zh: '包子放进蒸笼蒸十分钟。', py: 'Bāozi fàng jìn zhēnglóng zhēng shí fēnzhōng.', en: 'Steam the buns for ten minutes.' },
         { zh: '蒸笼要先烧开水再放进去。', py: 'Zhēnglóng yào xiān shāo kāi shuǐ zài fàng jìnqù.', en: 'Boil the water first, then put the steamer on.' }],
    scene: { zh: '在早餐店买包子会看到蒸笼；也可以说"用蒸笼蒸一下"。', en: 'Common at breakfast stalls — or "steam it for a bit".' }
  },
  '砂锅': {
    note: { zh: '陶土做的锅，保温好、受热慢，炖汤、煲菜最香。', en: 'A clay pot — slow to heat but excellent at holding warmth for soups and stews.' },
    ex: [{ zh: '砂锅炖汤最香。', py: 'Shāguō dùn tāng zuì xiāng.', en: 'Soup simmered in a clay pot smells best.' },
         { zh: '砂锅要小火慢慢炖。', py: 'Shāguō yào xiǎohuǒ mànmàn dùn.', en: 'Simmer a clay pot low and slow.' }],
    scene: { zh: '点菜时说"砂锅豆腐"；冬天喝汤、外卖砂锅饭也用得到。', en: 'Ordering "clay-pot tofu", or talking about winter soups.' }
  },
  '火锅': {
    note: { zh: '一边煮一边吃的锅，四川最有名；"鸳鸯锅"是一半清汤一半红汤。', en: 'Hotpot — cooked and eaten at the table. A "mandarin-duck pot" is half mild, half spicy.' },
    ex: [{ zh: '我们今晚吃火锅吧。', py: 'Wǒmen jīn wǎn chī huǒguō ba.', en: 'Let\'s have hotpot tonight.' },
         { zh: '要一个鸳鸯锅，一半清汤一半红汤。', py: 'Yào yí gè yuānyāngguō, yíbàn qīngtāng yíbàn hóngtāng.', en: 'One split pot — half clear broth, half red.' }],
    scene: { zh: '和朋友约饭、点锅底、要蘸碟时最常用："我要香油碟，不要麻酱。"', en: 'Making hotpot plans, choosing the broth, or asking for a sesame-oil dip instead of sesame paste.' }
  },
  '灶台': {
    note: { zh: '做饭的灶和台面，火大火小、擦不擦干净都在这里。', en: 'The stove and its counter — where the heat is turned up, down and wiped clean.' },
    ex: [{ zh: '灶台上还炖着汤。', py: 'Zàotái shàng hái dùn zhe tāng.', en: 'There is still soup simmering on the stove.' },
         { zh: '做完菜把灶台擦干净。', py: 'Zuò wán cài bǎ zàotái cā gānjìng.', en: 'Wipe the stove down when you finish cooking.' }],
    scene: { zh: '租房看厨房、合租分工时说："今天谁擦灶台？"', en: 'Viewing an apartment, or dividing chores with flatmates.' }
  },

  /* ==================== 味道 · 12 ==================== */
  '酸': {
    note: { zh: '酸味来自醋、泡菜和酸菜，鱼香味、酸辣味都靠它。', en: 'Sourness comes from vinegar, pickles and pickled greens — the base of fish-fragrant and hot-and-sour flavours.' },
    ex: [{ zh: '这个汤有点酸。', py: 'Zhège tāng yǒudiǎn suān.', en: 'This soup is a bit sour.' },
         { zh: '醋放多了，太酸了。', py: 'Cù fàng duō le, tài suān le.', en: 'Too much vinegar — it is too sour.' }],
    scene: { zh: '尝味道时说"再酸一点"，或者在店里点酸辣粉、酸菜鱼。', en: 'Tasting and asking for more sourness, or ordering hot-and-sour noodles or fish with pickled greens.' }
  },
  '甜': {
    note: { zh: '甜味来自糖，川菜里常用来"提味"，不是只有甜点才甜。', en: 'Sweetness comes from sugar; in Sichuan food it is a background note, not just for desserts.' },
    ex: [{ zh: '鱼香肉丝有点甜。', py: 'Yúxiāngròusī yǒudiǎn tián.', en: 'Fish-fragrant pork is a little sweet.' },
         { zh: '糖放多了，太甜了。', py: 'Táng fàng duō le, tài tián le.', en: 'Too much sugar — it is too sweet.' }],
    scene: { zh: '说甜度："少放一点糖"；也用来形容甜点和饮料。', en: 'Asking for less sugar, or describing desserts and drinks.' }
  },
  '苦': {
    note: { zh: '苦味来自苦瓜、陈皮和一部分药材，川菜里用得最多的是苦瓜。', en: 'Bitterness comes from bitter melon, dried tangerine peel and some herbs — bitter melon is the common one.' },
    ex: [{ zh: '苦瓜有点苦，但是很清火。', py: 'Kǔguā yǒudiǎn kǔ, dànshì hěn qīnghuǒ.', en: 'Bitter melon is a bit bitter but it cools you down.' },
         { zh: '这个菜苦得吃不下去。', py: 'Zhège cài kǔ de chī bú xiàqù.', en: 'This dish is so bitter I can\'t eat it.' }],
    scene: { zh: '在饭馆说"苦瓜别放太多"；聊生活时也用"苦"表示辛苦。', en: 'Ordering bitter melon, or using 苦 figuratively for hardship.' }
  },
  '辣': {
    note: { zh: '辣味来自辣椒；在四川点菜可以选微辣、中辣、特辣。', en: 'Heat comes from chillies — in Sichuan you can order mild, medium or extra hot.' },
    ex: [{ zh: '这个菜很辣，我受不了。', py: 'Zhège cài hěn là, wǒ shòubuliǎo.', en: 'This dish is too spicy for me.' },
         { zh: '可以微辣吗？', py: 'Kěyǐ wēilà ma?', en: 'Could you make it mildly spicy?' }],
    scene: { zh: '点菜时第一句最常用："我不太能吃辣，要微辣。"', en: 'The first sentence you need when ordering: "I can\'t take much heat, mild please."' }
  },
  '麻': {
    note: { zh: '麻来自花椒，是川菜和其他菜系最不一样的感觉：不疼，但嘴巴像有电流。', en: 'Numbness from Sichuan pepper — not pain, but a tingling buzz on the lips; the signature of Sichuan food.' },
    ex: [{ zh: '花椒放多了，嘴巴都麻了。', py: 'Huājiāo fàng duō le, zuǐba dōu má le.', en: 'Too much Sichuan pepper — my mouth is numb.' },
         { zh: '麻婆豆腐又麻又辣。', py: 'Mápódòufu yòu má yòu là.', en: 'Mapo tofu is both numbing and spicy.' }],
    scene: { zh: '解释"麻"是什么感觉，或者跟老板说"要麻一点"。', en: 'Explaining what numbness feels like, or asking for a stronger peppercorn kick.' }
  },
  '咸': {
    note: { zh: '咸味来自盐、酱油和豆瓣酱，是川菜的基础味道。', en: 'Saltiness comes from salt, soy sauce and bean paste — the base note of Sichuan cooking.' },
    ex: [{ zh: '这个菜有点咸。', py: 'Zhège cài yǒudiǎn xián.', en: 'This dish is a bit salty.' },
         { zh: '盐放多了，太咸了。', py: 'Yán fàng duō le, tài xián le.', en: 'Too much salt — it is too salty.' }],
    scene: { zh: '在饭馆说"少放盐"；聊健康时也会说"吃淡一点、少吃咸的"。', en: 'Asking for less salt, or talking about eating lighter for your health.' }
  },
  '鲜': {
    note: { zh: '鲜是"味道好、很香"的感觉，鸡汤、菌菇、鱼和味精都能带来鲜味。', en: 'Umami — the savoury depth in stock, mushrooms, fish and MSG.' },
    ex: [{ zh: '鸡汤很鲜。', py: 'Jītāng hěn xiān.', en: 'The chicken soup is very savoury.' },
         { zh: '这个汤鲜得很。', py: 'Zhège tāng xiān de hěn.', en: 'This soup is really full of flavour.' }],
    scene: { zh: '夸菜好吃时说"真鲜"；"新鲜"也是这个词，买菜时常用。', en: 'Complimenting a dish, or saying food is fresh at the market.' }
  },
  '香': {
    note: { zh: '香是闻到的好味道：蒜、葱、花椒一下锅就香。', en: 'Fragrance — what garlic, scallion and Sichuan pepper give off the moment they hit the wok.' },
    ex: [{ zh: '好香啊，你在做什么菜？', py: 'Hǎo xiāng a, nǐ zài zuò shénme cài?', en: 'Smells amazing — what are you cooking?' },
         { zh: '蒜一炒就香了。', py: 'Suàn yì chǎo jiù xiāng le.', en: 'The garlic smells fragrant as soon as it is fried.' }],
    scene: { zh: '在厨房闻到香味时最常见的感叹："好香！"', en: 'The reflex reaction in any kitchen: "smells so good!"' }
  },
  '淡': {
    note: { zh: '淡就是味道轻、不咸不辣，也可以形容颜色淡。', en: 'Bland or light — not salty, not spicy; also used for pale colours.' },
    ex: [{ zh: '这个菜有点淡。', py: 'Zhège cài yǒudiǎn dàn.', en: 'This dish is a bit bland.' },
         { zh: '汤太淡了，加一点盐。', py: 'Tāng tài dàn le, jiā yìdiǎn yán.', en: 'The soup is too light — add a little salt.' }],
    scene: { zh: '说自己的口味："我喜欢吃淡一点的。"', en: 'Describing your own taste: "I like things a bit lighter."' }
  },
  '腻': {
    note: { zh: '腻是油多、吃几口就不想再吃的感觉。', en: 'Cloying or greasy — the feeling of having had enough after a few bites.' },
    ex: [{ zh: '这个肉太腻了。', py: 'Zhège ròu tài nì le.', en: 'This meat is too rich.' },
         { zh: '吃两块就腻了。', py: 'Chī liǎng kuài jiù nì le.', en: 'Two pieces and I\'ve had enough.' }],
    scene: { zh: '说菜太肥，或者点菜时说"来点解腻的"（酸菜、茶）。', en: 'Saying a dish is too rich, or ordering something to cut the grease, like pickles or tea.' }
  },
  '烫': {
    note: { zh: '烫是温度很高，刚出锅的汤、火锅里的菜都很烫。', en: 'Scalding hot — straight off the stove, or straight out of the hotpot.' },
    ex: [{ zh: '汤很烫，慢点喝。', py: 'Tāng hěn tàng, mànmàn hē.', en: 'The soup is very hot — sip it slowly.' },
         { zh: '小心，盘子很烫。', py: 'Xiǎoxīn, pánzi hěn tàng.', en: 'Careful, the plate is hot.' }],
    scene: { zh: '吃火锅、砂锅时提醒同伴："这个很烫！"', en: 'Warning your friends at a hotpot or clay-pot table.' }
  },
  '脆': {
    note: { zh: '脆是咬下去"咔"一声的口感，凉拌菜和干煸菜最讲这个。', en: 'Crispness — the crunch in cold salads and dry-fried dishes.' },
    ex: [{ zh: '这个黄瓜很脆。', py: 'Zhège huángguā hěn cuì.', en: 'This cucumber is really crisp.' },
         { zh: '干煸四季豆外面脆脆的。', py: 'Gānbiān sìjìdòu wàimiàn cuìcuì de.', en: 'Dry-fried green beans are crunchy on the outside.' }],
    scene: { zh: '夸口感："我喜欢脆一点的"；点凉菜时也常用。', en: 'Complimenting texture, or ordering cold dishes the crunchy way.' }
  }
};
