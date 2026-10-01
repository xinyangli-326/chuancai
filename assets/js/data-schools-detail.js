/* 川菜三大帮派详解：点开卡片后的弹窗内容（详细介绍 / 文化故事 / 代表菜）
   顺序必须和页面上的三张卡一致：上河帮 → 下河帮 → 小河帮 */
window.CC_SCHOOLS_DETAIL = [
  {
    id: 'shanghe', emoji: '🏯',
    name: '上河帮 · 蓉派', py: 'Shànghébāng · Róngpài', en: 'Chengdu school',
    area: '成都、乐山、眉山一带（成都处在岷江上游，所以叫"上河"）',
    taste: '清鲜温和、一菜一格——麻辣只是其中一味',
    dishes: ['麻婆豆腐', '回锅肉', '宫保鸡丁', '钟水饺', '开水白菜'],
    note: {
      zh: '上河帮又叫"蓉派"，以成都、乐山、眉山为中心，因为地处岷江上游而得名"上河"。它受官府菜和文人菜的影响最深，讲究用料精细、火候准确、摆盘好看。"一菜一格，百菜百味"这句话就是从这一路来的：麻辣只是其中一味，家常味、鱼香味、荔枝味、糊辣味、椒麻味也都是在这里整理定型的。',
      en: 'The Chengdu school, named for the upper reaches of the Min River. Refined, mild and endlessly varied — official-banquet cooking plus a strong street-snack tradition. Mapo tofu, twice-cooked pork and kung-pao chicken all belong here.'
    },
    story: {
      zh: '成都在唐代就是西南第一大城市，清代是四川总督驻地，官署多、宴席多，名厨也就多。为了照顾各地客人的口味，厨师们把"辣"做出了层次：辣里带甜是荔枝味，带酸是鱼香味，带焦香是糊辣味。成都又特别会做小吃，钟水饺、担担面、赖汤圆都是从这里走上街头的——所以蓉派既有官府菜的细致，也有街边摊的热闹。',
      en: 'As the provincial capital, Chengdu attracted banquet chefs and demanding guests, who developed many distinct flavour types — lychee (sweet-sour), fish-fragrant, toasted-chilli. Its snack culture then carried Sichuan food out to the street.'
    }
  },
  {
    id: 'xiahe', emoji: '🌉',
    name: '下河帮 · 渝派', py: 'Xiàhébāng · Yúpài', en: 'Chongqing school',
    area: '重庆、南充、达州等嘉陵江与长江沿岸（长江下游，所以叫"下河"）',
    taste: '麻辣厚重、大方粗犷，讲究"吃得过瘾、吃得热闹"',
    dishes: ['酸菜鱼', '毛血旺', '烤鱼', '重庆火锅', '水煮鱼'],
    note: {
      zh: '下河帮又叫"渝派"，以重庆为中心，包括南充、达州等嘉陵江、长江沿岸的地方。这里是码头城市，做法大方粗犷、重油重辣：大盆上桌、麻辣铺满，配着啤酒和朋友一起吃。水煮、爆炒、火锅这一路最擅长，酸菜鱼、毛血旺、烤鱼、重庆火锅都是它的代表。',
      en: 'The Chongqing school of the lower river: bold, oily and very spicy — the cooking of a river-port city. Big bowls, heavy chilli, and dishes made to be shared: pickled-fish soup, blood-curd stew, grilled fish, hotpot.'
    },
    story: {
      zh: '重庆过去是长江上游的大码头，搬运工、船工多，干的活重、出汗多，需要重盐重辣又便宜顶饱的吃法，"下脚料 + 重味"的菜就这么长出来了：牛油火锅用牛油和牛肚、牛黄喉，毛血旺用血和杂碎，都是把不贵的东西做得有滋有味。抗战时期重庆成为陪都，各地人口涌入，渝派川菜跟着人流走向全国。今天很多外国人印象里的"麻辣川菜"，其实多半是渝派。',
      en: 'Porters and boatmen needed cheap, salty, hot, filling food, so offcuts plus heavy seasoning became the signature. When Chongqing served as the wartime capital, people from all over China carried this style nationwide — it is the "spicy Sichuan food" most foreigners meet first.'
    }
  },
  {
    id: 'xiaohe', emoji: '🧂',
    name: '小河帮 · 盐帮菜', py: 'Xiǎohébāng · Yánbāngcài', en: 'Salt-merchant school',
    area: '自贡、宜宾、泸州一带（沱江、釜溪河流域的盐场）',
    taste: '味厚香浓、鲜辣刺激，牛肉菜特别多',
    dishes: ['水煮牛肉', '冷吃兔', '火边子牛肉', '小煎鸡'],
    note: {
      zh: '小河帮又叫"盐帮菜"，以自贡、宜宾为中心。自贡过去是井盐之都，盐商有钱、盐工辛苦，所以这一路有两个样子：盐商请客的菜讲火候、讲摆盘，盐工吃的菜味厚香浓、鲜辣刺激。总体特点就是"味厚、香浓、鲜辣"，代表菜有水煮牛肉、冷吃兔、火边子牛肉、小煎鸡。',
      en: 'The salt-merchant school of Zigong and Yibin: rich, aromatic and sharply spicy, with a remarkable number of beef dishes — boiled beef slices, cold rabbit, dried beef.'
    },
    story: {
      zh: '自贡的盐井要打到几百米深，井架叫"天车"，井场里整天是盐工和拉车的牛。牛老了、伤了就宰来吃，所以牛肉菜特别多；盐商赚了钱要请客，又把菜越做越细。于是小河帮既有大碗吃肉的豪爽（水煮牛肉、小煎鸡），也有讲刀工火候的细致（火边子牛肉、烧白）。',
      en: 'Salt wells were dug hundreds of metres deep and worked by men and oxen. When an ox grew old it was eaten, so beef dishes multiplied; the merchants\' money paid for ever-finer cooking. Hence a school that is both hearty and delicate.'
    }
  }
];
