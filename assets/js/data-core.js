/* 川味小厨房 · 内容数据（核心）
   Sichuan Flavor Kitchen — core content data
   面向国际中文教育的川菜文化学习数据：食材 / 调料 / 厨具 / 味型 / 词汇 / 句型 / 文化。
   字段约定：zh 中文、py 拼音、en 英文。
*/
window.CC = window.CC || {};

/* ---------- 备菜动作（用于"备菜"配对游戏） ---------- */
CC.actions = {
  xi:        { zh: '洗',       py: 'xǐ',        en: 'wash',            emoji: '🚿' },
  qiekuai:   { zh: '切块',     py: 'qiē kuài',   en: 'cut into cubes',  emoji: '🔲' },
  qiepian:   { zh: '切片',     py: 'qiē piàn',   en: 'slice',           emoji: '🥏' },
  qiesi:     { zh: '切丝',     py: 'qiē sī',     en: 'shred',           emoji: '🍜' },
  qieduan:   { zh: '切段',     py: 'qiē duàn',   en: 'cut into sections', emoji: '✂️' },
  qieding:   { zh: '切丁',     py: 'qiē dīng',   en: 'dice',            emoji: '🎲' },
  duomo:     { zh: '剁末',     py: 'duò mò',     en: 'mince',           emoji: '🔪' },
  duosui:    { zh: '剁碎',     py: 'duò suì',    en: 'chop finely',     emoji: '🔪' },
  paisui:    { zh: '拍碎',     py: 'pāi suì',    en: 'smash',           emoji: '🔨' },
  qupi:      { zh: '去皮',     py: 'qù pí',      en: 'peel',            emoji: '🧅' },
  yanzhi:    { zh: '腌制',     py: 'yān zhì',    en: 'marinate',        emoji: '🥣' },
  chaosui:   { zh: '焯水',     py: 'chāo shuǐ',  en: 'blanch',          emoji: '♨️' },
  shangjiang:{ zh: '上浆',     py: 'shàng jiāng', en: 'velvet with starch', emoji: '🥣' },
  gouqian:   { zh: '调水淀粉', py: 'tiáo shuǐ diàn fěn', en: 'mix starch water', emoji: '🥛' },
  tiaozhi:   { zh: '调碗汁',   py: 'tiáo wǎn zhī',  en: 'mix the sauce in a bowl', emoji: '🥣' },
  chaoxiang: { zh: '炒香',     py: 'chǎo xiāng', en: 'toast until fragrant', emoji: '🔥' },
  mofen:     { zh: '磨成粉',   py: 'mó chéng fěn', en: 'grind to powder', emoji: '⚙️' },
  paofa:     { zh: '泡发',     py: 'pào fā',     en: 'soak until soft', emoji: '💧' },
  bodan:     { zh: '打散',     py: 'dǎ sàn',     en: 'beat (eggs)',     emoji: '🥚' }
};

/* ---------- 火候 ---------- */
CC.heat = {
  da:   { zh: '大火', py: 'dà huǒ',   en: 'high heat',   emoji: '🔥🔥🔥', level: 3,
          note: { zh: '火苗高、声音大，适合快炒、爆炒、水煮。', en: 'Big flame. For quick stir-frying and fast boiling.' } },
  zhong:{ zh: '中火', py: 'zhōng huǒ', en: 'medium heat', emoji: '🔥🔥',   level: 2,
          note: { zh: '火力适中，适合炒香豆瓣、煸炒、收汁。', en: 'Medium flame. For frying the bean paste, dry-frying, reducing sauce.' } },
  xiao: { zh: '小火', py: 'xiǎo huǒ', en: 'low heat',    emoji: '🔥',     level: 1,
          note: { zh: '火苗小，适合炖、焖、煮汤和勾芡。', en: 'Small flame. For simmering, stewing and thickening.' } }
};

/* ---------- 食材总表（备菜 + 词汇） ---------- */
CC.ingredients = {
  nendoufu:  { zh: '嫩豆腐', py: 'nèn dòufu',   en: 'silken tofu',      emoji: '⬜', cat: '豆制品' },
  doufu:     { zh: '豆腐',   py: 'dòufu',       en: 'tofu',            emoji: '⬜', cat: '豆制品' },
  dougan:    { zh: '豆干',   py: 'dòu gān',     en: 'firm dried tofu', emoji: '🟫', cat: '豆制品' },
  niurou:    { zh: '牛肉',   py: 'niúròu',      en: 'beef',            emoji: '🥩', cat: '肉类' },
  niuliji:   { zh: '牛里脊', py: 'niú lǐjǐ',    en: 'beef tenderloin', emoji: '🥩', cat: '肉类' },
  zhurou:    { zh: '猪肉',   py: 'zhūròu',      en: 'pork',            emoji: '🥓', cat: '肉类' },
  wuhuarou:  { zh: '五花肉', py: 'wǔhuāròu',    en: 'pork belly',      emoji: '🥓', cat: '肉类' },
  houtuirou: { zh: '后腿肉', py: 'hòutuǐròu',   en: 'pork hind leg',   emoji: '🥓', cat: '肉类' },
  zhuliji:   { zh: '猪里脊', py: 'zhū lǐjǐ',    en: 'pork tenderloin', emoji: '🥓', cat: '肉类' },
  roumo:     { zh: '肉末',   py: 'ròumò',       en: 'minced meat',     emoji: '⚪', cat: '肉类' },
  jirou:     { zh: '鸡肉',   py: 'jīròu',       en: 'chicken',         emoji: '🍗', cat: '肉类' },
  jixiongrou:{ zh: '鸡胸肉', py: 'jīxiōngròu',  en: 'chicken breast',  emoji: '🍗', cat: '肉类' },
  jiwing:    { zh: '鸡腿肉', py: 'jītuǐròu',    en: 'chicken thigh',   emoji: '🍗', cat: '肉类' },
  niudu:     { zh: '牛肚',   py: 'niú dǔ',      en: 'beef tripe',      emoji: '🥩', cat: '肉类' },
  niutoupi:  { zh: '牛头皮', py: 'niú tóupí',   en: 'beef head skin',  emoji: '🥩', cat: '肉类' },
  suanmiao:  { zh: '蒜苗',   py: 'suànmiáo',    en: 'garlic sprouts',  emoji: '🌿', cat: '蔬菜' },
  qingjiao:  { zh: '青椒',   py: 'qīngjiāo',    en: 'green pepper',    emoji: '🫑', cat: '蔬菜' },
  gansuan:   { zh: '干辣椒', py: 'gān làjiāo',  en: 'dried chili',     emoji: '🌶️', cat: '调料' },
  huajiao:   { zh: '花椒',   py: 'huājiāo',     en: 'Sichuan pepper',  emoji: '🫘', cat: '调料' },
  paojiao:   { zh: '泡椒',   py: 'pàojiāo',     en: 'pickled chili',   emoji: '🌶️', cat: '调料' },
  sijidou:   { zh: '四季豆', py: 'sìjìdòu',     en: 'green beans',     emoji: '🫛', cat: '蔬菜' },
  yacai:     { zh: '芽菜',   py: 'yácài',       en: 'preserved mustard sprouts', emoji: '🥬', cat: '蔬菜' },
  muer:      { zh: '木耳',   py: 'mù ěr',       en: 'wood ear mushroom', emoji: '🍄', cat: '蔬菜' },
  dongsun:   { zh: '冬笋',   py: 'dōngsǔn',     en: 'winter bamboo shoot', emoji: '🎋', cat: '蔬菜' },
  wosun:     { zh: '莴笋',   py: 'wōsǔn',       en: 'celtuce',         emoji: '🥬', cat: '蔬菜' },
  huluobo:   { zh: '胡萝卜', py: 'húluóbo',     en: 'carrot',          emoji: '🥕', cat: '蔬菜' },
  dasuan:    { zh: '大蒜',   py: 'dàsuàn',      en: 'garlic',          emoji: '🧄', cat: '蔬菜' },
  shengjiang:{ zh: '生姜',   py: 'shēngjiāng',  en: 'ginger',          emoji: '🫚', cat: '蔬菜' },
  dacong:    { zh: '大葱',   py: 'dàcōng',      en: 'scallion',        emoji: '🌱', cat: '蔬菜' },
  xiaocong:  { zh: '小葱',   py: 'xiǎocōng',    en: 'spring onion',    emoji: '🌱', cat: '蔬菜' },
  xiangcai:  { zh: '香菜',   py: 'xiāngcài',    en: 'cilantro',        emoji: '🌿', cat: '蔬菜' },
  qincai:    { zh: '芹菜',   py: 'qíncài',      en: 'celery',          emoji: '🥬', cat: '蔬菜' },
  huashengmi:{ zh: '花生米', py: 'huāshēngmǐ',  en: 'peanuts',         emoji: '🥜', cat: '干货' },
  jidan:     { zh: '鸡蛋',   py: 'jīdàn',       en: 'egg',             emoji: '🥚', cat: '蛋类' },
  miantiao:  { zh: '面条',   py: 'miàntiáo',    en: 'noodles',         emoji: '🍜', cat: '主食' },
  migao:     { zh: '米线',   py: 'mǐxiàn',      en: 'rice noodles',    emoji: '🍜', cat: '主食' },
  jitang:    { zh: '鸡汤',   py: 'jītāng',      en: 'chicken stock',   emoji: '🍲', cat: '汤水' },
  gaotang:   { zh: '高汤',   py: 'gāotāng',     en: 'stock',           emoji: '🍲', cat: '汤水' },
  qingshui:  { zh: '清水',   py: 'qīngshuǐ',    en: 'water',           emoji: '💧', cat: '汤水' }
};
/* ---------- 调料总表 ---------- */
CC.seasonings = [
  { id: 'pixiandouban', zh: '郫县豆瓣酱', py: 'Píxiàn dòubànjiàng', en: 'Pixian broad bean paste', emoji: '🥫',
    taste: ['辣', '咸', '鲜'], use: { zh: '川菜之魂，炒菜前先下锅炒出红油。', en: 'The soul of Sichuan cooking — fry it first to release red oil.' } },
  { id: 'huajiao', zh: '花椒', py: 'huājiāo', en: 'Sichuan pepper', emoji: '🫘',
    taste: ['麻'], use: { zh: '川菜的"麻"来自它，不是辣椒。', en: 'The source of "numbing" (má) — not from chili at all.' } },
  { id: 'ganlajiao', zh: '干辣椒', py: 'gān làjiāo', en: 'dried chili', emoji: '🌶️',
    taste: ['辣', '香'], use: { zh: '用油一炸，香而不燥。', en: 'Bloomed in oil, it gives fragrance more than pain.' } },
  { id: 'lajiaomian', zh: '辣椒面', py: 'làjiāomiàn', en: 'chili flakes', emoji: '🌶️',
    taste: ['辣'], use: { zh: '淋热油就变成红油。', en: 'Pour hot oil over it and you get chili oil.' } },
  { id: 'huajiaofen', zh: '花椒粉', py: 'huājiāofěn', en: 'ground Sichuan pepper', emoji: '🫘',
    taste: ['麻'], use: { zh: '出锅前撒上，麻香最足。', en: 'Sprinkle at the end for the freshest numbing aroma.' } },
  { id: 'paojiao', zh: '泡椒', py: 'pàojiāo', en: 'pickled chili', emoji: '🌶️',
    taste: ['酸', '辣'], use: { zh: '鱼香味的灵魂。', en: 'The key to fish-fragrant flavor.' } },
  { id: 'doushi', zh: '豆豉', py: 'dòuchǐ', en: 'fermented black beans', emoji: '🫘',
    taste: ['咸', '鲜', '香'], use: { zh: '麻婆豆腐里的"陈香"。', en: 'Gives mapo tofu its deep savoury note.' } },
  { id: 'shengchou', zh: '生抽', py: 'shēngchōu', en: 'light soy sauce', emoji: '🍶',
    taste: ['咸', '鲜'], use: { zh: '调味为主，颜色浅。', en: 'For seasoning; light in colour.' } },
  { id: 'laochou', zh: '老抽', py: 'lǎochōu', en: 'dark soy sauce', emoji: '🍶',
    taste: ['咸'], use: { zh: '上色为主，别放多。', en: 'Mainly for colour — a little goes far.' } },
  { id: 'xiangcu', zh: '香醋', py: 'xiāngcù', en: 'fragrant vinegar', emoji: '🫙',
    taste: ['酸'], use: { zh: '醋要沿锅边淋，香而不酸。', en: 'Pour it down the side of the wok for aroma.' } },
  { id: 'baitang', zh: '白糖', py: 'báitáng', en: 'sugar', emoji: '🍬',
    taste: ['甜'], use: { zh: '和味、提鲜，也是鱼香味的一半。', en: 'Balances flavour; half of the fish-fragrant taste.' } },
  { id: 'liaojiu', zh: '料酒', py: 'liàojiǔ', en: 'cooking wine', emoji: '🍶',
    taste: ['香'], use: { zh: '给肉去腥。', en: 'Removes the "raw" smell of meat.' } },
  { id: 'dianfen', zh: '淀粉', py: 'diànfěn', en: 'starch', emoji: '🥣',
    taste: [], use: { zh: '上浆让肉嫩，勾芡让汤汁挂住菜。', en: 'Velvet the meat, thicken the sauce.' } },
  { id: 'shiyongyou', zh: '食用油', py: 'shíyòngyóu', en: 'cooking oil', emoji: '🫗',
    taste: [], use: { zh: '油温六成热最合适。', en: 'Oil at about 60% heat is ready.' } },
  { id: 'hongyou', zh: '红油', py: 'hóngyóu', en: 'chili oil', emoji: '🫙',
    taste: ['辣', '香'], use: { zh: '凉菜的好朋友。', en: 'Best friend of cold dishes.' } },
  { id: 'zhima', zh: '芝麻', py: 'zhīma', en: 'sesame', emoji: '⚪',
    taste: ['香'], use: { zh: '最后撒一点，好看又香。', en: 'A final sprinkle for looks and fragrance.' } },
  { id: 'zhimajiang', zh: '芝麻酱', py: 'zhīmajiàng', en: 'sesame paste', emoji: '🥫',
    taste: ['香'], use: { zh: '担担面和凉面都会用。', en: 'Used in dan dan and cold noodles.' } },
  { id: 'tianmianjiang', zh: '甜面酱', py: 'tiánmiànjiàng', en: 'sweet wheat paste', emoji: '🥫',
    taste: ['甜', '咸'], use: { zh: '回锅肉里提甜香。', en: 'Adds a sweet depth to twice-cooked pork.' } },
  { id: 'yacai', zh: '芽菜', py: 'yácài', en: 'preserved mustard sprout', emoji: '🥬',
    taste: ['咸', '鲜'], use: { zh: '干煸四季豆和担担面的"隐藏队友"。', en: 'The secret teammate in dry-fried beans and dan dan noodles.' } },
  { id: 'suanmo', zh: '蒜末', py: 'suànmò', en: 'minced garlic', emoji: '🧄',
    taste: ['香'], use: { zh: '蒜香是川菜四香之一。', en: 'Garlic aroma is one of the four "fragrances".' } },
  { id: 'jiangmo', zh: '姜末', py: 'jiāngmò', en: 'minced ginger', emoji: '🫚',
    taste: ['香'], use: { zh: '去腥增香。', en: 'Cuts the raw smell, adds warmth.' } },
  { id: 'conghua', zh: '葱花', py: 'cōnghuā', en: 'chopped scallion', emoji: '🌱',
    taste: ['香'], use: { zh: '出锅最后撒上。', en: 'Sprinkle right before serving.' } },
  { id: 'yan', zh: '盐', py: 'yán', en: 'salt', emoji: '🧂',
    taste: ['咸'], use: { zh: '盐是百味之首。', en: 'Salt is the first of all flavours.' } },
  { id: 'jijing', zh: '鸡精', py: 'jījīng', en: 'chicken bouillon', emoji: '🧂',
    taste: ['鲜'], use: { zh: '少量提鲜。', en: 'A pinch for umami.' } },
  { id: 'niuyou', zh: '牛油', py: 'niúyóu', en: 'beef tallow', emoji: '🧈',
    taste: ['香'], use: { zh: '火锅底料的主角，香得厚重。', en: 'The star of hotpot base — rich and heavy.' } },
  { id: 'lajiaoyou', zh: '辣椒油', py: 'làjiāoyóu', en: 'chili oil', emoji: '🫙',
    taste: ['辣', '香'], use: { zh: '一勺就红亮。', en: 'One spoonful makes everything glow red.' } }
];

/* ---------- 味道词 ---------- */
CC.tastes = [
  { zh: '酸', py: 'suān', en: 'sour', emoji: '🍋' },
  { zh: '甜', py: 'tián', en: 'sweet', emoji: '🍬' },
  { zh: '苦', py: 'kǔ', en: 'bitter', emoji: '🌿' },
  { zh: '辣', py: 'là', en: 'spicy / hot', emoji: '🌶️' },
  { zh: '麻', py: 'má', en: 'numbing', emoji: '🫘' },
  { zh: '咸', py: 'xián', en: 'salty', emoji: '🧂' },
  { zh: '鲜', py: 'xiān', en: 'umami', emoji: '🐟' },
  { zh: '香', py: 'xiāng', en: 'fragrant', emoji: '💨' },
  { zh: '淡', py: 'dàn', en: 'light / bland', emoji: '💧' },
  { zh: '腻', py: 'nì', en: 'greasy', emoji: '🧈' },
  { zh: '烫', py: 'tàng', en: 'piping hot', emoji: '♨️' },
  { zh: '脆', py: 'cuì', en: 'crisp', emoji: '🥬' }
];

/* ---------- 厨具 ---------- */
CC.tools = [
  { zh: '炒锅', py: 'chǎoguō', en: 'wok', emoji: '🥘' },
  { zh: '锅铲', py: 'guōchǎn', en: 'wok spatula', emoji: '🥄' },
  { zh: '菜刀', py: 'càidāo', en: 'Chinese cleaver', emoji: '🔪' },
  { zh: '砧板', py: 'zhēnbǎn', en: 'cutting board', emoji: '🟫' },
  { zh: '碗', py: 'wǎn', en: 'bowl', emoji: '🥣' },
  { zh: '盘子', py: 'pánzi', en: 'plate', emoji: '🍽️' },
  { zh: '筷子', py: 'kuàizi', en: 'chopsticks', emoji: '🥢' },
  { zh: '漏勺', py: 'lòusháo', en: 'slotted spoon', emoji: '🥄' },
  { zh: '蒸笼', py: 'zhēnglóng', en: 'bamboo steamer', emoji: '🎍' },
  { zh: '砂锅', py: 'shāguō', en: 'clay pot', emoji: '🍲' },
  { zh: '火锅', py: 'huǒguō', en: 'hotpot', emoji: '🫕' },
  { zh: '灶台', py: 'zàotái', en: 'stove', emoji: '🔥' }
];

/* ---------- 川菜味型 ---------- */
CC.flavors = [
  { id: 'mala', zh: '麻辣味', py: 'málà wèi', en: 'numbing & spicy', taste: '麻辣',
    desc: { zh: '花椒的麻 + 辣椒的辣，川菜最有名的味型。', en: 'Sichuan pepper numbness plus chili heat — the most famous Sichuan taste.' },
    dishes: ['麻婆豆腐', '水煮牛肉'] },
  { id: 'hula', zh: '糊辣味', py: 'húlà wèi', en: 'toasted chili', taste: '辣香',
    desc: { zh: '干辣椒炒到棕红，辣得香，不辣得疼。', en: 'Dried chili fried to a deep red — fragrant heat, not painful heat.' },
    dishes: ['宫保鸡丁'] },
  { id: 'yuxiang', zh: '鱼香味', py: 'yúxiāng wèi', en: 'fish-fragrant', taste: '酸甜辣',
    desc: { zh: '没有鱼的"鱼香"：泡椒、姜葱蒜、糖醋，酸甜微辣。', en: 'No fish inside: pickled chili, ginger, garlic, sugar and vinegar.' },
    dishes: ['鱼香肉丝'] },
  { id: 'jiachang', zh: '家常味', py: 'jiācháng wèi', en: 'home-style', taste: '咸鲜微辣',
    desc: { zh: '豆瓣酱打底，咸鲜带一点辣，四川人家的味道。', en: 'Bean paste base: savoury with a touch of heat, the taste of home.' },
    dishes: ['回锅肉', '干煸四季豆'] },
  { id: 'guaiwei', zh: '怪味', py: 'guàiwèi', en: 'fabulous flavour', taste: '七味俱全',
    desc: { zh: '麻、辣、咸、甜、酸、鲜、香，七种味道都在，"怪"得刚刚好。', en: 'Seven tastes at once — numbness, heat, salt, sweet, sour, umami, aroma.' },
    dishes: ['怪味鸡块', '怪味花生'] },
  { id: 'lizhi', zh: '荔枝味', py: 'lìzhī wèi', en: 'lychee flavour', taste: '酸甜',
    desc: { zh: '甜酸像荔枝，酸先甜后。', en: 'Sweet-sour like a lychee — sour first, sweet after.' },
    dishes: ['锅巴肉片'] },
  { id: 'jiaoma', zh: '椒麻味', py: 'jiāomá wèi', en: 'peppercorn-scallion', taste: '麻香',
    desc: { zh: '花椒加葱叶剁成茸，清香微麻。', en: 'Sichuan pepper and scallion leaves minced together — fresh and numbing.' },
    dishes: ['椒麻鸡'] },
  { id: 'suanmi', zh: '蒜泥味', py: 'suànní wèi', en: 'garlicky', taste: '蒜香辣',
    desc: { zh: '蒜泥 + 红油，凉菜的好搭档。', en: 'Minced garlic with chili oil — perfect for cold dishes.' },
    dishes: ['蒜泥白肉'] },
  { id: 'hongyou', zh: '红油味', py: 'hóngyóu wèi', en: 'chili-oil flavour', taste: '香辣', 
    desc: { zh: '红亮、香辣、微甜，凉菜常用。', en: 'Bright red, fragrant and slightly sweet; used for cold dishes.' },
    dishes: ['夫妻肺片'] },
  { id: 'suanla', zh: '酸辣味', py: 'suānlà wèi', en: 'hot & sour', taste: '酸辣',
    desc: { zh: '酸和辣手拉手，越吃越开胃。', en: 'Sour and hot hand in hand — very appetising.' },
    dishes: ['酸辣粉'] },
  { id: 'xianxian', zh: '咸鲜味', py: 'xiánxiān wèi', en: 'savoury-fresh', taste: '咸鲜',
    desc: { zh: '不放辣椒也好吃，川菜不只有麻辣。', en: 'No chili needed — Sichuan food is much more than spicy.' },
    dishes: ['开水白菜', '鸡汤抄手'] },
  { id: 'wuxiang', zh: '五香味', py: 'wǔxiāng wèi', en: 'five-spice', taste: '香',
    desc: { zh: '卤味常用，香气厚重。', en: 'Common in braised dishes; deep warm aroma.' },
    dishes: ['卤牛肉'] }
];

/* ---------- 句型（国际中文教育语言点） ---------- */
CC.patterns = [
  { id: 'ba', pattern: '把 + 名词 + 动词 + 结果', py: 'bǎ …',
    en: 'disposal construction: "take X and do something to it"',
    ex: [
      { zh: '把豆腐切成小块。', py: 'Bǎ dòufu qiē chéng xiǎo kuài.', en: 'Cut the tofu into small cubes.' },
      { zh: '把花椒粉撒在上面。', py: 'Bǎ huājiāofěn sǎ zài shàngmiàn.', en: 'Sprinkle the ground Sichuan pepper on top.' }
    ] },
  { id: 'xian', pattern: '先……然后……最后……', py: 'xiān … ránhòu … zuìhòu …',
    en: 'first … then … finally …',
    ex: [
      { zh: '先把油烧热，然后放豆瓣酱，最后放豆腐。', py: 'Xiān bǎ yóu shāo rè, ránhòu fàng dòubànjiàng, zuìhòu fàng dòufu.', en: 'First heat the oil, then add the bean paste, finally add the tofu.' }
    ] },
  { id: 'yue', pattern: '越……越……', py: 'yuè … yuè …',
    en: 'the more … the more …',
    ex: [
      { zh: '麻辣的菜越吃越想吃。', py: 'Málà de cài yuè chī yuè xiǎng chī.', en: 'The more you eat spicy food, the more you want it.' },
      { zh: '火越大，锅越热。', py: 'Huǒ yuè dà, guō yuè rè.', en: 'The bigger the flame, the hotter the wok.' }
    ] },
  { id: 'you', pattern: '又……又……', py: 'yòu … yòu …',
    en: 'both … and …',
    ex: [
      { zh: '麻婆豆腐又麻又辣。', py: 'Mápó dòufu yòu má yòu là.', en: 'Mapo tofu is both numbing and spicy.' }
    ] },
  { id: 'youdian', pattern: '有点儿 + 形容词', py: 'yǒudiǎnr …',
    en: 'a bit (usually for things you are not happy about)',
    ex: [
      { zh: '这道菜有点儿咸。', py: 'Zhè dào cài yǒudiǎnr xián.', en: 'This dish is a bit salty.' },
      { zh: '汤有点儿辣。', py: 'Tāng yǒudiǎnr là.', en: 'The soup is a bit spicy.' }
    ] },
  { id: 'tai', pattern: '太 + 形容词 + 了', py: 'tài … le',
    en: 'too …',
    ex: [
      { zh: '火太大了，菜会糊。', py: 'Huǒ tài dà le, cài huì hú.', en: 'The heat is too high, the dish will burn.' }
    ] },
  { id: 'huohou', pattern: '火候 + 到位／不够', py: 'huǒhòu dàowèi / bú gòu',
    en: 'heat control is just right / not enough',
    ex: [
      { zh: '这道菜火候到位，肉又嫩又香。', py: 'Zhè dào cài huǒhòu dàowèi, ròu yòu nèn yòu xiāng.', en: 'The heat was just right — tender and fragrant.' }
    ] },
  { id: 'zenmeyang', pattern: '……怎么样？／你尝尝', py: '… zěnmeyàng? / nǐ chángchang',
    py2: '', en: 'How is it? / Have a taste',
    ex: [
      { zh: '你尝尝，味道怎么样？', py: 'Nǐ chángchang, wèidào zěnmeyàng?', en: 'Have a taste — how is it?' }
    ] }
];

/* ---------- 川菜文化内容 ---------- */
CC.culture = [
  {
    id: 'what', emoji: '🥢',
    title: '什么是川菜？', py: 'Shénme shì chuāncài?', en: 'What is Sichuan cuisine?',
    lead: { zh: '川菜是中国八大菜系之一，来自四川盆地和重庆一带。', en: 'Sichuan cuisine is one of China\u2019s eight great cuisines, from the Sichuan Basin and Chongqing.' },
    blocks: [
      { zh: '很多人以为川菜就是"辣"，其实川菜有句话叫"一菜一格，百菜百味"。', en: 'Many people think Sichuan food is only spicy. But there is a saying: "every dish its own style, a hundred dishes a hundred flavours."' },
      { zh: '川菜的常用味型有二三十种：麻辣、糊辣、鱼香、家常、怪味、荔枝、椒麻、蒜泥、咸鲜……有的根本不辣。', en: 'It uses 20–30 flavour types: numbing-spicy, toasted chili, fish-fragrant, home-style, "fabulous", lychee, pepper-scallion, garlicky, savoury… some are not spicy at all.' },
      { zh: '川菜讲究"三香三椒三料"，也很讲究火候和刀工。', en: 'Sichuan cooking values aromatics, peppercorns and key ingredients — plus precise heat control and knife skills.' }
    ],
    facts: [
      { zh: '八大菜系：川、鲁、粤、苏、浙、闽、湘、徽。', en: 'The Eight Great Cuisines: Sichuan, Shandong, Cantonese, Jiangsu, Zhejiang, Fujian, Hunan, Anhui.' },
      { zh: '四川人把"吃"叫"吃味道"，味道比食材更贵。', en: 'In Sichuan, "eating" is really "tasting flavour".' },
      { zh: '麻来自花椒，辣来自辣椒 —— 是两个完全不同的东西。', en: 'Numbing comes from Sichuan pepper; heat comes from chili. Two completely different things!' },
      { zh: '味型到底有多少种？常见说法是"二三十种"，有资料统计为 23 种，也有"二十四味型"的说法。', en: 'How many flavour types? Sources commonly say "twenty-odd" — some count 23, others speak of 24.' }
    ]
  },
  {
    id: 'geo', emoji: '⛰️',
    title: '为什么四川人爱吃麻辣？', py: 'Wèishénme Sìchuān rén ài chī málà?', en: 'Why do Sichuan people love numbing-spicy food?',
    lead: { zh: '四川盆地四面是山，气候潮湿多雾，日照少。', en: 'The Sichuan Basin is ringed by mountains: humid, foggy, and short on sunshine.' },
    blocks: [
      { zh: '潮湿的天气让人容易觉得身上又冷又重，麻辣可以发汗、去湿、开胃口。', en: 'Damp weather makes your body feel cold and heavy. Numbing-spicy food makes you sweat, dries the dampness and opens the appetite.' },
      { zh: '再加上历史上四川产盐、养牛，盐工和码头工人需要便宜、下饭、能补力气的菜，于是有了重口味的江湖菜。', en: 'Sichuan also produced salt and raised cattle. Salt and dock workers needed cheap, filling, strong-flavoured food — which shaped its bold "jianghu" dishes.' }
    ],
    facts: [
      { zh: '花椒是中国本土香料。《诗经·唐风·椒聊》里就有"椒聊之实，蕃衍盈升"的句子；在辣椒来中国之前，四川的辛辣主要靠花椒、生姜和茱萸。', en: 'Sichuan pepper is native to China and already appears in the Book of Songs. Before chili arrived, Sichuan\'s pungency came from pepper, ginger and zhuyu.' },
      { zh: '辣椒原产美洲，明代末年传入中国。明代高濂《遵生八笺》里有"番椒……味辣色红，甚可观"的记载——那时它多半是种来看的，清代以后才慢慢走上餐桌。', en: 'Chili came from the Americas and reached China in the late Ming. Gao Lian\'s "Zunsheng Bajian" already describes it as a red, ornamental, pungent plant — it only entered the kitchen in the Qing.' },
      { zh: '郫县豆瓣：相传清康熙年间（约 1688 年），"湖广填四川"的移民陈逸仙把蚕豆带到郫县；咸丰三年（1853 年），陈氏后人陈守信开设"益丰和"酱园，把盐渍辣椒改成豆瓣辣椒，郫县豆瓣由此定型。', en: 'Pixian bean paste: legend says the migrant Chen Yixian brought broad beans to Pixian around 1688; in 1853 his descendant Chen Shouxin opened the "Yifenghe" workshop and turned salted chili into bean paste — the paste as we know it took shape.' },
      { zh: '郫县豆瓣用红辣椒、蚕豆、小麦粉和食盐发酵而成，被称为"川菜之魂"，也常被视为近代川菜形成的标志。', en: 'It ferments red chili, broad beans, wheat flour and salt. Called "the soul of Sichuan cuisine", it is often seen as the marker of modern Sichuan cooking.' }
    ]
  },
  {
    id: 'schools', emoji: '🗺️',
    title: '川菜三大流派', py: 'Chuāncài sān dà liúpài', en: 'Three schools of Sichuan cuisine',
    lead: { zh: '同是川菜，成都、重庆、自贡的味道并不一样。', en: 'Chengdu, Chongqing and Zigong all cook Sichuan food — but not the same way.' },
    blocks: [
      { zh: '上河帮（成都、乐山）：也叫蓉派，口味更清鲜温和，官府菜、小吃多。', en: 'Upper River school (Chengdu, Leshan): lighter and gentler flavours, famous for official-style dishes and snacks.' },
      { zh: '下河帮（重庆、达州）：也叫渝派，江湖菜多，麻辣浓烈、分量豪爽。', en: 'Lower River school (Chongqing, Dazhou): bold and rustic, heavy on chili and pepper, generous portions.' },
      { zh: '小河帮（自贡、内江）：也叫盐帮菜，来自盐场，味厚、鲜辣，水煮牛肉、冷吃兔是代表。', en: 'Small River school (Zigong, Neijiang): the salt-merchant style — rich, fresh and hot. Think poached beef and cold rabbit.' }
    ],
    facts: [
      { zh: '成都小吃：龙抄手、钟水饺、赖汤圆、蛋烘糕。', en: 'Chengdu snacks: wontons, sweet-oil dumplings, glutinous rice balls, egg cakes.' },
      { zh: '重庆火锅相传来自长江码头，船工用牛油、辣椒、花椒煮牛下水，便宜又暖身。', en: 'Chongqing hotpot is said to come from Yangtze dock workers, who simmered beef offal in beef tallow, chili and pepper.' },
      { zh: '自贡是"盐都"，盐井多，牛多，所以牛肉菜特别有名。', en: 'Zigong is the "salt capital": many salt wells, many cattle — hence its famous beef dishes.' }
    ]
  },
  {
    id: 'table', emoji: '🍵',
    title: '川菜桌上的文化', py: 'Chuāncài zhuō shang de wénhuà', en: 'Culture at the Sichuan table',
    lead: { zh: '在四川，吃饭不只是吃饭，是聊天、见面和热闹。', en: 'In Sichuan, eating is also chatting, meeting people and having fun.' },
    blocks: [
      { zh: '成都人爱坐茶馆，盖碗茶有"天、地、人"三件：茶盖、茶碗、茶托。聊天叫"摆龙门阵"。', en: 'Chengdu people love teahouses. A gaiwan tea set has three parts — lid, bowl, saucer — meaning heaven, earth and people. Chatting is called "spinning the dragon gate."' },
      { zh: '请客时，主人常说"随便点，多吃点儿"，客人尝第一口说"好吃！"主人会很高兴。', en: 'Hosts say "order anything, eat more!" Guests who say "delicious!" on the first bite make the host happy.' },
      { zh: '现在的餐桌上有公筷，大家一起吃也更卫生。', en: 'Modern tables use serving chopsticks, so sharing food stays hygienic.' }
    ],
    facts: [
      { zh: '饭桌上的敬酒叫"干杯"，但学生可以只喝饮料。', en: 'Toasting is called "gānbēi" — but soft drinks are perfectly fine.' },
      { zh: '火锅的蘸碟可以自己调：香油、蒜泥、香菜、蚝油。', en: 'You mix your own hotpot dipping sauce: sesame oil, garlic, cilantro, oyster sauce.' },
      { zh: '四川人说"巴适"，意思是舒服、很好。', en: '"Bāshì" is Sichuan dialect for comfortable, just right.' }
    ]
  },
  {
    id: 'skills', emoji: '🔥',
    title: '火候与刀工', py: 'Huǒhòu yǔ dāogōng', en: 'Heat control and knife skills',
    lead: { zh: '川菜师傅最看重的两件事：火候和刀工。', en: 'Two things Sichuan chefs care about most: heat control and knife skills.' },
    blocks: [
      { zh: '火候就是"火的大小"和"炒的时间"。旺火快炒，菜脆；小火慢炖，汤浓。', en: 'Heat control means how big the flame is and how long you cook. High heat for crispness, low heat for rich soup.' },
      { zh: '刀工决定了菜的样子和口感：切片好入味，切丝快熟，剁末炒香。', en: 'Knife work decides shape and texture: slices for seasoning, shreds for quick cooking, mince for aroma.' },
      { zh: '川菜常用的烹饪方法：炒、爆、煸、烧、煮、炖、蒸、拌、卤、炝。', en: 'Common techniques: stir-fry, quick-fry, dry-fry, braise, boil, stew, steam, toss, braise in soy sauce, flash-fry.' }
    ],
    facts: [
      { zh: '"煸"是把食材水分炒干、表面起皱，干煸四季豆就是这样。', en: '"Biān" means frying out the water until the surface wrinkles — exactly how dry-fried green beans are made.' },
      { zh: '勾芡让汤汁抱住食材，麻婆豆腐亮亮的秘密。', en: 'Thickening with starch makes sauce cling to the food — the secret of glossy mapo tofu.' },
      { zh: '油温"六成热"，就是筷子放进油里会有小泡泡。', en: 'Oil at "60% heat": a chopstick dipped in makes small bubbles.' }
    ]
  }
];

/* ---------- 词汇表（按类别） ---------- */
CC.vocab = {
  '食材 · 蔬菜': [
    { zh: '蒜苗', py: 'suànmiáo', en: 'garlic sprouts', emoji: '🌿' },
    { zh: '四季豆', py: 'sìjìdòu', en: 'green beans', emoji: '🫛' },
    { zh: '青椒', py: 'qīngjiāo', en: 'green pepper', emoji: '🫑' },
    { zh: '木耳', py: 'mù ěr', en: 'wood ear mushroom', emoji: '🍄' },
    { zh: '冬笋', py: 'dōngsǔn', en: 'winter bamboo shoot', emoji: '🎋' },
    { zh: '莴笋', py: 'wōsǔn', en: 'celtuce', emoji: '🥬' },
    { zh: '胡萝卜', py: 'húluóbo', en: 'carrot', emoji: '🥕' },
    { zh: '大蒜', py: 'dàsuàn', en: 'garlic', emoji: '🧄' },
    { zh: '生姜', py: 'shēngjiāng', en: 'ginger', emoji: '🫚' },
    { zh: '小葱', py: 'xiǎocōng', en: 'spring onion', emoji: '🌱' },
    { zh: '香菜', py: 'xiāngcài', en: 'cilantro', emoji: '🌿' },
    { zh: '芽菜', py: 'yácài', en: 'preserved mustard sprout', emoji: '🥬' }
  ],
  '食材 · 肉蛋豆': [
    { zh: '牛肉', py: 'niúròu', en: 'beef', emoji: '🥩' },
    { zh: '牛里脊', py: 'niú lǐjǐ', en: 'beef tenderloin', emoji: '🥩' },
    { zh: '猪里脊', py: 'zhū lǐjǐ', en: 'pork tenderloin', emoji: '🥓' },
    { zh: '五花肉', py: 'wǔhuāròu', en: 'pork belly', emoji: '🥓' },
    { zh: '后腿肉', py: 'hòutuǐròu', en: 'pork hind leg', emoji: '🥓' },
    { zh: '肉末', py: 'ròumò', en: 'minced meat', emoji: '⚪' },
    { zh: '鸡胸肉', py: 'jīxiōngròu', en: 'chicken breast', emoji: '🍗' },
    { zh: '牛肚', py: 'niú dǔ', en: 'beef tripe', emoji: '🥩' },
    { zh: '豆腐', py: 'dòufu', en: 'tofu', emoji: '⬜' },
    { zh: '嫩豆腐', py: 'nèn dòufu', en: 'silken tofu', emoji: '⬜' },
    { zh: '鸡蛋', py: 'jīdàn', en: 'egg', emoji: '🥚' },
    { zh: '花生米', py: 'huāshēngmǐ', en: 'peanuts', emoji: '🥜' }
  ],
  '调味 · 调料': [
    { zh: '郫县豆瓣酱', py: 'Píxiàn dòubànjiàng', en: 'Pixian bean paste', emoji: '🥫' },
    { zh: '花椒', py: 'huājiāo', en: 'Sichuan pepper', emoji: '🫘' },
    { zh: '花椒粉', py: 'huājiāofěn', en: 'ground Sichuan pepper', emoji: '🫘' },
    { zh: '干辣椒', py: 'gān làjiāo', en: 'dried chili', emoji: '🌶️' },
    { zh: '泡椒', py: 'pàojiāo', en: 'pickled chili', emoji: '🌶️' },
    { zh: '豆豉', py: 'dòuchǐ', en: 'fermented black beans', emoji: '🫘' },
    { zh: '生抽', py: 'shēngchōu', en: 'light soy sauce', emoji: '🍶' },
    { zh: '老抽', py: 'lǎochōu', en: 'dark soy sauce', emoji: '🍶' },
    { zh: '香醋', py: 'xiāngcù', en: 'fragrant vinegar', emoji: '🫙' },
    { zh: '白糖', py: 'báitáng', en: 'sugar', emoji: '🍬' },
    { zh: '料酒', py: 'liàojiǔ', en: 'cooking wine', emoji: '🍶' },
    { zh: '淀粉', py: 'diànfěn', en: 'starch', emoji: '🥣' },
    { zh: '甜面酱', py: 'tiánmiànjiàng', en: 'sweet wheat paste', emoji: '🥫' },
    { zh: '红油', py: 'hóngyóu', en: 'chili oil', emoji: '🫙' }
  ],
  '动作 · 烹饪': [
    { zh: '洗', py: 'xǐ', en: 'wash', emoji: '🚿' },
    { zh: '切', py: 'qiē', en: 'cut', emoji: '🔪' },
    { zh: '切片', py: 'qiē piàn', en: 'slice', emoji: '🥏' },
    { zh: '切丝', py: 'qiē sī', en: 'shred', emoji: '🍜' },
    { zh: '切块', py: 'qiē kuài', en: 'cut into cubes', emoji: '🔲' },
    { zh: '剁末', py: 'duò mò', en: 'mince', emoji: '🔪' },
    { zh: '腌制', py: 'yān zhì', en: 'marinate', emoji: '🥣' },
    { zh: '焯水', py: 'chāo shuǐ', en: 'blanch', emoji: '♨️' },
    { zh: '下锅', py: 'xià guō', en: 'put into the wok', emoji: '🥘' },
    { zh: '翻炒', py: 'fān chǎo', en: 'stir-fry', emoji: '🥄' },
    { zh: '炒香', py: 'chǎo xiāng', en: 'fry until fragrant', emoji: '💨' },
    { zh: '煸', py: 'biān', en: 'dry-fry', emoji: '🔥' },
    { zh: '收汁', py: 'shōu zhī', en: 'reduce the sauce', emoji: '🥘' },
    { zh: '勾芡', py: 'gōu qiàn', en: 'thicken with starch', emoji: '🥛' },
    { zh: '淋', py: 'lín', en: 'drizzle', emoji: '🫗' },
    { zh: '出锅', py: 'chū guō', en: 'take out of the wok', emoji: '🍽️' },
    { zh: '上菜', py: 'shàng cài', en: 'serve the dish', emoji: '🥢' },
    { zh: '关火', py: 'guān huǒ', en: 'turn off the heat', emoji: '🔌' }
  ],
  '味道 · 评价': [
    { zh: '麻', py: 'má', en: 'numbing', emoji: '🫘' },
    { zh: '辣', py: 'là', en: 'spicy', emoji: '🌶️' },
    { zh: '咸', py: 'xián', en: 'salty', emoji: '🧂' },
    { zh: '酸', py: 'suān', en: 'sour', emoji: '🍋' },
    { zh: '甜', py: 'tián', en: 'sweet', emoji: '🍬' },
    { zh: '鲜', py: 'xiān', en: 'umami', emoji: '🐟' },
    { zh: '香', py: 'xiāng', en: 'fragrant', emoji: '💨' },
    { zh: '好吃', py: 'hǎochī', en: 'delicious', emoji: '😋' },
    { zh: '太辣了', py: 'tài là le', en: 'too spicy', emoji: '🥵' },
    { zh: '有点儿咸', py: 'yǒudiǎnr xián', en: 'a bit salty', emoji: '🧂' },
    { zh: '火候到位', py: 'huǒhòu dàowèi', en: 'perfectly cooked', emoji: '🔥' },
    { zh: '巴适', py: 'bāshì', en: 'Sichuan dialect: great, comfy', emoji: '👌' }
  ],
  '厨具 · 厨房': [
    { zh: '炒锅', py: 'chǎoguō', en: 'wok', emoji: '🥘' },
    { zh: '锅铲', py: 'guōchǎn', en: 'spatula', emoji: '🥄' },
    { zh: '菜刀', py: 'càidāo', en: 'cleaver', emoji: '🔪' },
    { zh: '砧板', py: 'zhēnbǎn', en: 'cutting board', emoji: '🟫' },
    { zh: '碗', py: 'wǎn', en: 'bowl', emoji: '🥣' },
    { zh: '盘子', py: 'pánzi', en: 'plate', emoji: '🍽️' },
    { zh: '筷子', py: 'kuàizi', en: 'chopsticks', emoji: '🥢' },
    { zh: '漏勺', py: 'lòusháo', en: 'slotted spoon', emoji: '🥄' },
    { zh: '蒸笼', py: 'zhēnglóng', en: 'bamboo steamer', emoji: '🎍' },
    { zh: '砂锅', py: 'shāguō', en: 'clay pot', emoji: '🍲' },
    { zh: '油温', py: 'yóuwēn', en: 'oil temperature', emoji: '🌡️' },
    { zh: '火候', py: 'huǒhòu', en: 'heat control', emoji: '🔥' }
  ],
  '文化 · 川味': [
    { zh: '川菜', py: 'chuāncài', en: 'Sichuan cuisine', emoji: '🥢' },
    { zh: '味型', py: 'wèixíng', en: 'flavour type', emoji: '🎨' },
    { zh: '一菜一格，百菜百味', py: 'yí cài yì gé, bǎi cài bǎi wèi', en: 'every dish its own style', emoji: '💯' },
    { zh: '上河帮', py: 'shànghébāng', en: 'Chengdu school', emoji: '🗺️' },
    { zh: '下河帮', py: 'xiàhébāng', en: 'Chongqing school', emoji: '🗺️' },
    { zh: '小河帮', py: 'xiǎohébāng', en: 'Zigong salt school', emoji: '🗺️' },
    { zh: '盖碗茶', py: 'gàiwǎnchá', en: 'gaiwan tea', emoji: '🍵' },
    { zh: '摆龙门阵', py: 'bǎi lóngménzhèn', en: 'Sichuan: to chat', emoji: '💬' },
    { zh: '火锅', py: 'huǒguō', en: 'hotpot', emoji: '🫕' },
    { zh: '小吃', py: 'xiǎochī', en: 'snacks', emoji: '🥟' },
    { zh: '巴适', py: 'bāshì', en: 'comfy, great (dialect)', emoji: '👌' },
    { zh: '干杯', py: 'gānbēi', en: 'cheers', emoji: '🥤' }
  ]
};

window.CC = CC;
