/* 小测分三级：初级（认识）/ 中级（学过站里的内容就能答）/ 高级（来历与细节）
   题目事实都对着公开资料核过（百度百科词条为主，脚本 work/verify-stories.mjs 同源）。
   结构：{ id, icon, name, sub, pass 通过线, extra 附加题型, questions: [{ q, options, explain }] }
   options 里 correct: true 的那一项是正确答案。 */
window.CC_QUIZ_LEVELS = [
  {
    id: 'easy', icon: '🟢', name: '初级', sub: '认识川菜：麻和辣、常见菜名、最基本的常识　（含 1 道语法填空 + 1 道句子排序）', pass: 6,
    questions: [
      { q: { zh: '川菜的"麻"来自什么？', en: 'What gives Sichuan food its numbing taste?' },
        options: [{ zh: '花椒', en: 'Sichuan pepper', correct: true }, { zh: '辣椒', en: 'chili' }, { zh: '生姜', en: 'ginger' }],
        explain: { zh: '麻来自花椒，辣来自辣椒，这是两样不同的东西。', en: 'Numbing = Sichuan pepper; heat = chili.' } },
      { q: { zh: '川菜的"辣"主要来自什么？', en: 'Where does the heat mostly come from?' },
        options: [{ zh: '辣椒', en: 'chili', correct: true }, { zh: '花椒', en: 'Sichuan pepper' }, { zh: '白糖', en: 'sugar' }],
        explain: { zh: '辣椒给辣，花椒给麻——四川人把这两样分开讲。', en: 'Chili brings heat, pepper brings the tingle.' } },
      { q: { zh: '"麻婆豆腐"的"麻婆"是谁？', en: 'Who was "Mapo"?' },
        options: [{ zh: '一位脸上有麻点的老板娘', en: 'a snack-shop owner nicknamed "pockmarked"', correct: true }, { zh: '一位很辣的婆婆', en: 'a very spicy grandmother' }, { zh: '一个卖花椒的老奶奶', en: 'a pepper-selling granny' }],
        explain: { zh: '清代同治年间成都万福桥边小饭铺的老板娘陈刘氏，人称"陈麻婆"，菜以她的外号得名。', en: 'Granny Chen ran a small eatery by Wanfu Bridge in Chengdu; the dish took her nickname.' } },
      { q: { zh: '鱼香肉丝里有鱼吗？', en: 'Is there fish in "fish-fragrant" pork?' },
        options: [{ zh: '没有，是一种调味方法', en: 'No — it is a seasoning style', correct: true }, { zh: '有，用鱼肉做的', en: 'Yes, made with fish' }, { zh: '有，用鱼汤煮的', en: 'Yes, cooked in fish stock' }],
        explain: { zh: '"鱼香"来自四川人烧鱼用的泡椒、姜葱蒜加糖醋，说的是味道，不是食材。', en: 'The name comes from the seasoning used for braising fish.' } },
      { q: { zh: '川菜只有辣味吗？', en: 'Is Sichuan food all spicy?' },
        options: [{ zh: '不是，有二十多种味型，很多并不辣', en: 'No — over twenty flavour types, many not spicy', correct: true }, { zh: '是的，都很辣', en: 'Yes, everything is hot' }, { zh: '只有麻和辣两种', en: 'Only numbing and hot' }],
        explain: { zh: '川菜讲究"一菜一格"，开水白菜、甜烧白这些都是不辣的。', en: 'Sichuan cooking is "one dish, one style" — plenty of dishes are not hot at all.' } },
      { q: { zh: '回锅肉为什么叫"回锅"？', en: 'Why is twice-cooked pork called "back to the wok"?' },
        options: [{ zh: '先把肉煮好，再回到锅里炒一次', en: 'the pork is boiled first, then returned to the wok', correct: true }, { zh: '要洗两次锅', en: 'the wok is washed twice' }, { zh: '要用两个锅炒', en: 'two woks are used' }],
        explain: { zh: '一煮、二切、三回锅，所以叫"回锅肉"。', en: 'Boil, slice, then fry again — hence the name.' } },
      { q: { zh: '盖碗茶的"三件套"是什么？', en: 'What are the three parts of a gaiwan tea set?' },
        options: [{ zh: '茶盖、茶碗、茶托', en: 'lid, bowl and saucer', correct: true }, { zh: '茶壶、茶杯、茶勺', en: 'pot, cup and spoon' }, { zh: '茶叶、茶壶、茶盘', en: 'leaves, pot and tray' }],
        explain: { zh: '盖碗有盖、碗、托三件，成都茶馆里最常见。', en: 'Lid, bowl and saucer — the classic Chengdu teahouse set.' } },
      { q: { zh: '四季豆没有炒熟会怎样？', en: 'What happens if green beans are not fully cooked?' },
        options: [{ zh: '可能引起恶心呕吐等中毒症状', en: 'they can cause nausea and vomiting', correct: true }, { zh: '更脆更好吃', en: 'they taste crunchier' }, { zh: '没有关系', en: 'nothing happens' }],
        explain: { zh: '四季豆含皂甙和植物凝集素，必须彻底加热；这也是最好用的"厨房安全"教材。', en: 'Green beans contain saponins and phytohaemagglutinin — they must be cooked through.' } }
    ]
  },
  {
    id: 'mid', icon: '🟡', name: '中级', sub: '学过站里的内容就能答：调料、技法、流派、吃法　（含 1 道语法填空 + 1 道句子排序）', pass: 6,
    extra: { audio: true },
    questions: [
      { q: { zh: '郫县豆瓣酱主要用什么做的？', en: 'Pixian bean paste is mainly made from…' },
        options: [{ zh: '蚕豆、辣椒和面粉发酵', en: 'fermented broad beans, chili and flour', correct: true }, { zh: '黄豆和花椒', en: 'soybeans and pepper' }, { zh: '花生和白糖', en: 'peanuts and sugar' }],
        explain: { zh: '相传创制于清代康熙年间，被称为"川菜之魂"。', en: 'Said to date from the Qing dynasty; called "the soul of Sichuan cuisine".' } },
      { q: { zh: '郫县豆瓣在川菜里常被叫作什么？', en: 'What is Pixian bean paste often called?' },
        options: [{ zh: '"川菜之魂"', en: 'the soul of Sichuan cuisine', correct: true }, { zh: '"川菜之王"', en: 'the king of Sichuan cuisine' }, { zh: '"川菜之骨"', en: 'the bone of Sichuan cuisine' }],
        explain: { zh: '回锅肉、麻婆豆腐、水煮牛肉都靠它炒出红油。', en: 'Twice-cooked pork, mapo tofu and boiled beef all depend on it for red oil.' } },
      { q: { zh: '"煸"是什么意思？', en: 'What does "bian" (dry-frying) mean?' },
        options: [{ zh: '少油、中小火慢慢把水分炒走', en: 'a little oil, medium-low heat, driving out moisture', correct: true }, { zh: '大火猛炸', en: 'deep-frying hot and fast' }, { zh: '加水焖煮', en: 'braising with water' }],
        explain: { zh: '水分炒走后表面起皱发亮，行话叫"虎皮"。', en: 'As the moisture leaves, the surface wrinkles and shines — "tiger skin".' } },
      { q: { zh: '自贡的川菜属于哪一流派？', en: 'Which Sichuan school does Zigong cooking belong to?' },
        options: [{ zh: '小河帮（盐帮菜）', en: 'the "small-river" salt-help style', correct: true }, { zh: '上河帮（蓉派）', en: 'the Chengdu school' }, { zh: '下河帮（渝派）', en: 'the Chongqing school' }],
        explain: { zh: '自贡靠井盐兴盛，水煮牛肉、冷吃兔都是盐帮菜的代表。', en: 'Zigong grew on salt wells; boiled beef and cold-eaten rabbit are its flagships.' } },
      { q: { zh: '碗杂面里的"豌"和"杂"分别是什么？', en: 'In wanza noodles, what are "wan" and "za"?' },
        options: [{ zh: '耙豌豆 + 肉杂酱', en: 'soft peas and a pork topping', correct: true }, { zh: '豌豆 + 杂面', en: 'peas and mixed noodles' }, { zh: '酸菜 + 杂碎', en: 'pickles and offal' }],
        explain: { zh: '"耙"在四川话里是煮到软烂，豌豆要能挂住面条。', en: '"Pa" means cooked to a mush — the peas must cling to the noodles.' } },
      { q: { zh: '冷吃牛肉为什么叫"冷吃"？', en: 'Why is cold-eaten beef called "cold-eaten"?' },
        options: [{ zh: '放凉以后香味更浓，所以凉了才最好吃', en: 'it tastes better once cooled — the aroma reads more clearly', correct: true }, { zh: '必须放进冰箱冻硬', en: 'it must be frozen hard' }, { zh: '要用冷水煮', en: 'it is boiled in cold water' }],
        explain: { zh: '水分炒干后，辣椒和花椒的香气在温度降低时更明显，肉也更有嚼劲。', en: 'With the water gone, chilli and pepper read more clearly once cool.' } },
      { q: { zh: '干煸四季豆的"虎皮"指的是什么？', en: 'What is "tiger skin" on dry-fried green beans?' },
        options: [{ zh: '豆角表皮起皱、发亮的状态', en: 'the wrinkled, glossy surface of the beans', correct: true }, { zh: '一种辣椒的名字', en: 'a kind of chilli' }, { zh: '盘子的花纹', en: 'a plate pattern' }],
        explain: { zh: '小火慢慢煸，把水分逼出去，表面才会起皱发亮。', en: 'Slow frying drives out moisture until the skin wrinkles and shines.' } },
      { q: { zh: '重庆小面的味道主要靠什么？', en: 'What carries the flavour of Chongqing noodles?' },
        options: [{ zh: '碗底先调好的调料', en: 'the seasoning built in the bottom of the bowl', correct: true }, { zh: '面条本身很咸', en: 'the noodles themselves are salty' }, { zh: '最后加的清水', en: 'the water added at the end' }],
        explain: { zh: '猪油、辣椒油、蒜水、花椒粉先在碗里调好，面条捞进去一拌就有味道。', en: 'Lard, chilli oil, garlic water and pepper wait in the bowl for the noodles.' } }
    ]
  },
  {
    id: 'hard', icon: '🔴', name: '高级', sub: '来历、年代和细节：给认真学过的人　（含 1 道语法填空 + 1 道句子排序）', pass: 6,
    extra: { order: true },
    questions: [
      { q: { zh: '麻婆豆腐始创于哪一年？', en: 'When did mapo tofu first appear?' },
        options: [{ zh: '1862 年（清同治元年）', en: '1862', correct: true }, { zh: '1912 年', en: '1912' }, { zh: '1958 年', en: '1958' }],
        explain: { zh: '资料记载创于 1862 年成都万福桥边的陈兴盛饭铺。', en: 'Sources date it to 1862 at the Chen Xingsheng eatery by Wanfu Bridge.' } },
      { q: { zh: '"宫保鸡丁"里的"宫保"指什么？', en: 'What does "gongbao" refer to?' },
        options: [{ zh: '官衔"太子少保"的俗称，来自丁宝桢', en: 'the honorary title of the official Ding Baozhen', correct: true }, { zh: '一种辣椒', en: 'a kind of chilli' }, { zh: '宫里的厨师', en: 'a palace chef' }],
        explain: { zh: '丁宝桢曾任四川总督，朝廷授他"太子少保"，俗称"宫保"。', en: 'Ding Baozhen, a Qing governor of Sichuan, held the title known as gongbao.' } },
      { q: { zh: '回锅肉炒到肉片卷起来，行话叫什么？', en: 'What do cooks call the curled pork slices?' },
        options: [{ zh: '灯盏窝', en: '"lamp-cup"', correct: true }, { zh: '虎皮', en: '"tiger skin"' }, { zh: '荔枝口', en: '"lychee mouth"' }],
        explain: { zh: '肉片卷成小碗形叫"灯盏窝"，说明肉挑得好、火候到了。', en: 'Slices curling into little cups prove good meat and good heat.' } },
      { q: { zh: '自贡冷吃兔哪一年获得地理标志产品保护？', en: 'When did Zigong cold-eaten rabbit gain geographical-indication protection?' },
        options: [{ zh: '2014 年', en: '2014', correct: true }, { zh: '1998 年', en: '1998' }, { zh: '2020 年', en: '2020' }],
        explain: { zh: '2014 年 2 月，原国家质检总局批准对"自贡冷吃兔"实施地理标志产品保护。', en: 'Approved in February 2014 by the former quality inspection authority.' } },
      { q: { zh: '水煮牛肉最早和什么有关？', en: 'What is boiled beef originally connected with?' },
        options: [{ zh: '自贡盐场的牛和盐工', en: 'the oxen and workers of the Zigong salt fields', correct: true }, { zh: '成都的官府宴席', en: 'Chengdu official banquets' }, { zh: '重庆的码头火锅', en: 'Chongqing dock hotpot' }],
        explain: { zh: '井盐开采靠牛，老牛退役后盐工用盐水加辣椒、花椒煮食。', en: 'Oxen powered the salt wells; retired animals were simmered with brine, chilli and pepper.' } },
      { q: { zh: '宫保鸡丁属于哪一种味型？', en: 'Which flavour type is Kung Pao chicken?' },
        options: [{ zh: '糊辣味 + 荔枝味', en: 'burnt-chilli with a lychee finish', correct: true }, { zh: '鱼香味', en: 'fish-fragrant' }, { zh: '蒜泥味', en: 'garlicky' }],
        explain: { zh: '干辣椒炒到微糊发香叫"糊辣"，糖醋调出的酸甜回口叫"荔枝味"。', en: 'Smoky toasted chilli plus a sweet-sour lychee round-off.' } },
      { q: { zh: '川菜三大流派是哪三个？', en: 'What are the three Sichuan schools?' },
        options: [{ zh: '上河帮、下河帮、小河帮', en: 'upper-river, lower-river and small-river', correct: true }, { zh: '川西、川东、川南', en: 'west, east and south Sichuan' }, { zh: '蓉派、渝派、泸派', en: 'Chengdu, Chongqing and Luzhou' }],
        explain: { zh: '上河帮是成都一带，下河帮是重庆一带，小河帮是自贡一带的盐帮菜。', en: 'Chengdu, Chongqing and the Zigong salt-help style.' } },
      { q: { zh: '麻婆豆腐讲究的"八字"里，下面哪一个在列？', en: 'Which of these is part of mapo tofu\'s "eight words"?' },
        options: [{ zh: '麻、辣、烫、香、酥、嫩、鲜、活里的"酥"', en: '"crisp" — one of numb, hot, scalding, fragrant, crisp, tender, fresh, alive', correct: true }, { zh: '甜', en: 'sweet' }, { zh: '苦', en: 'bitter' }],
        explain: { zh: '资料里写作"麻、辣、烫、香、嫩、酥、鲜、活"，酥指牛肉末炒到干香。', en: 'Sources list numb, hot, scalding, fragrant, tender, crisp, fresh and alive.' } }
    ]
  }
];
