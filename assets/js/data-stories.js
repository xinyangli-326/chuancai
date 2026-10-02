/* 每道菜背后的文化故事（文化故事页用）
   结构：<菜id>: { lead 导读, points: [{ icon, title, zh, en } ×3], fact 冷知识 }
   内容依据：公开的川菜史料与百科条目（详见页面"资料清单"），口语化改写，不编年代和数字。 */
window.CC_STORY_DETAIL = {
  mapo: {
    lead: '一道菜的名字，来自一个人的外号。',
    points: [
      { icon: '👵', title: '名字来自一个人',
        zh: '清同治年间，成都万福桥边有家小饭铺，老板娘陈刘氏脸上有几颗麻点，街坊都叫她"陈麻婆"。她做的豆腐又麻又辣又烫，客人干脆拿她的外号当了菜名。',
        en: 'A small Chengdu eatery was run by a woman nicknamed "Granny Chen the pockmarked". Her numbing, scalding tofu took her nickname as its name.' },
      { icon: '🔥', title: '八个字的讲究',
        zh: '老四川用八个字夸它：麻、辣、烫、香、酥、嫩、鲜、活。酥是牛肉末炒到干香，嫩是豆腐先用盐水焯过定型，活是端上桌时还在冒泡。',
        en: 'Cooks judge it by eight qualities: numbing, hot, scalding, fragrant, crisp, tender, fresh — and "alive", meaning still bubbling at the table.' },
      { icon: '🥩', title: '牛肉末不是随便选的',
        zh: '传统做法用牛肉末，不用猪肉。豆瓣酱要小火炒到红油冒出来，花椒粉最后撒——麻味是上桌前才到的。',
        en: 'Traditionally minced beef, not pork. The bean paste is fried until red oil surfaces, and the pepper is ground fresh and sprinkled last.' }
    ],
    fact: '📌 麻婆豆腐是川菜最有名的一张国际名片，也是很多外国人认识川菜的第一道菜。'
  },
  gongbao: {
    lead: '"宫保"不是一个菜名，是一个官衔。',
    points: [
      { icon: '🎖️', title: '"宫保"是官衔',
        zh: '清代官员丁宝桢当过四川总督，朝廷给他的"太子少保"衔俗称"宫保"。人们把他家厨做的炒鸡丁叫作"宫保鸡丁"。',
        en: '"Gongbao" was an honorary title held by Ding Baozhen, a Qing governor of Sichuan — the dish is named after his rank, not a person called Gong.' },
      { icon: '🌶️', title: '糊辣 + 荔枝味',
        zh: '干辣椒炒到微微发糊、香气冲出来叫"糊辣"；糖和醋按比例调出的酸甜回口像荔枝，所以又叫"荔枝味"。',
        en: 'Chillies toasted until just smoky give the "burnt-chilli" note; sugar and vinegar round it into a lychee-like sweet-sour finish.' },
      { icon: '🥜', title: '花生米要最后放',
        zh: '花生米炸香后，最后和葱段一起下锅，才能保持脆口；早放就软了，这是这道菜的小脾气。',
        en: 'Peanuts go in at the very end with the scallion — any earlier and they lose their crunch.' }
    ],
    fact: '📌 它是海外中餐馆最常被点到的川菜之一，英文写作 Kung Pao Chicken。'
  },
  huiguo: {
    lead: '"回锅"这两个字，就是它的做法。',
    points: [
      { icon: '🔁', title: '一煮二炒三回锅',
        zh: '整块猪肉先煮到七成熟，放凉切薄片，再回锅和豆瓣酱一起炒——所以才叫"回锅肉"。',
        en: 'Pork is boiled first, cooled, sliced thin, then returned to the wok with bean paste. Hence "back to the wok".' },
      { icon: '🍚', title: '"打牙祭"的记忆',
        zh: '以前四川人平常吃得清淡，农历初二、十六"打牙祭"才吃肉。回锅肉常常是那天桌上最有分量的一道。',
        en: 'In old Sichuan, meat appeared only on "temple days" — twice a month. Twice-cooked pork was the centrepiece.' },
      { icon: '🥣', title: '灯盏窝',
        zh: '肉片炒到卷成小碗形，行话叫"灯盏窝"。能卷起来，说明肉挑得好、火候也到了。',
        en: 'Perfect slices curl into little cups — cooks call it "lamp-cup", and take it as proof of good meat and good heat.' }
    ],
    fact: '📌 川菜里它常被叫作"第一菜"，固定搭档是郫县豆瓣酱。'
  },
  yuxiang: {
    lead: '"鱼香"里，一条鱼都没有。',
    points: [
      { icon: '🐟', title: '名字来自烧鱼',
        zh: '四川人烧鱼爱用泡椒、姜葱蒜加糖醋。这套调味后来被拿去炒肉丝，"鱼香"说的其实是味道，不是食材。',
        en: 'The seasoning used for braising fish — pickled chilli, ginger, garlic, scallion, sugar and vinegar — was borrowed for pork slivers.' },
      { icon: '🥄', title: '一勺醋一勺糖',
        zh: '鱼香味的底子是"碗汁"：糖、醋、酱油、淀粉提前调好，下锅前搅匀一次倒入，味道才收得住。',
        en: 'The sauce is mixed in a bowl beforehand so it can go in at once — that is how the flavour holds together.' },
      { icon: '🎓', title: '厨师的考试题',
        zh: '鱼香味很考基本功：酸、甜、咸、辣谁都不能抢戏，这是川菜讲的"五味调和"。',
        en: 'It is a test of skill: sour, sweet, salty and hot must balance without one dominating.' }
    ],
    fact: '📌 川菜里名字和食材"对不上"的味型不止一个：荔枝味、家常味讲的都是味道，不是主料。'
  },
  shuizhu: {
    lead: '它诞生在盐井边上。',
    points: [
      { icon: '🐂', title: '盐场里的吃法',
        zh: '自贡靠井盐兴盛，开采、运卤都靠牛。老牛退役后，盐工们用盐水加辣椒、花椒煮牛肉吃，这是水煮牛肉的雏形。',
        en: 'Zigong grew on salt wells where oxen did the heavy work. When an ox retired, salt workers simmered it with brine, chilli and pepper.' },
      { icon: '🥄', title: '"水煮"并不清淡',
        zh: '"水煮"说的是先用汤煮，最后还要泼一勺滚油，把辣椒面和花椒粉的香气逼出来——油一浇，香味才炸开。',
        en: '"Water-boiled" means poached first — then a ladle of smoking oil is poured over the chilli and pepper on top.' },
      { icon: '🧂', title: '盐帮菜的性格',
        zh: '自贡一带的"小河帮（盐帮菜）"重油重辣、香味冲，正好应付体力活。水煮牛肉就是这种性格的代表。',
        en: 'The Zigong "salt-help" style is heavy, hot and loud — food for people doing hard physical work.' }
    ],
    fact: '📌 自贡的井盐开采有两千多年历史，盐场里大量用牛，当地也因此留下了不少牛肉菜。'
  },
  wanzamian: {
    lead: '一碗面，是重庆人的闹钟。',
    points: [
      { icon: '🌅', title: '从一碗小面开始',
        zh: '重庆人的早晨常常从一碗小面开始。"豌杂"是加了耙豌豆和肉杂酱的豪华版，比素小面实在得多。',
        en: 'Many Chongqing mornings start with a bowl of noodles. "Wanza" is the deluxe version — soft peas plus a savoury pork topping.' },
      { icon: '🫛', title: '"耙"是软烂',
        zh: '四川话里"耙"就是煮得软烂。豌豆要炖到起沙、勺子一压就开，才能挂得住面条。',
        en: 'In Sichuan dialect "pa" means cooked to a mush — the peas must be soft enough to cling to the noodles.' },
      { icon: '🥣', title: '秘密在碗底',
        zh: '小面的功夫在碗底：猪油、辣椒油、蒜水、花椒粉先调好，面条煮好直接捞进去一拌，味道才立体。',
        en: 'The secret sits in the bottom of the bowl — lard, chilli oil, garlic water and pepper waiting for the noodles.' }
    ],
    fact: '📌 重庆小面是这座城市的"早饭名片"，豌杂面是其中最有饱腹感的一种。'
  },
  lengchi: {
    lead: '凉了才好吃，所以叫"冷吃"。',
    points: [
      { icon: '🧂', title: '盐场的干粮',
        zh: '自贡盐场干活的人出力多、出汗多，需要又咸又辣、能放得住的东西。牛肉顺纹切条、下油慢慢煸干，就是"冷吃"的雏形。',
        en: 'Salt-field workers needed food that was salty, hot and would keep. Beef was cut into strips and slowly dried in oil.' },
      { icon: '🐰', title: '冷吃兔是大哥',
        zh: '自贡最有名的"冷吃"本来是冷吃兔，有上百年历史；冷吃牛肉、冷吃鸡尖、冷吃豆干都是它的同门。',
        en: 'Zigong\'s original cold-eaten dish was rabbit, a century old. Beef, chicken wing tips and dried tofu came later.' },
      { icon: '❄️', title: '为什么放凉更香',
        zh: '水分炒干以后，辣椒和花椒的香味在温度降下来时反而更清楚，肉也更有嚼劲——刚出锅不算最好吃。',
        en: 'With the water driven off, chilli and pepper read more clearly once cooled, and the texture firms up.' }
    ],
    fact: '📌 自贡冷吃兔 2014 年获得国家地理标志产品保护，"冷吃"已经成了盐帮菜的招牌系列。'
  },
  ganbian: {
    lead: '"煸"是一种技法，也是一种耐心。',
    points: [
      { icon: '🔥', title: '煸出虎皮',
        zh: '"干煸"是少油、中小火慢慢把水分逼走，豆角表面起皱发亮，行话叫"虎皮"。急不得，火大了外面糊里面还生。',
        en: '"Dry-frying" means a little oil and medium-low heat until the beans wrinkle and shine — cooks call it tiger skin.' },
      { icon: '⚠️', title: '一定要熟透',
        zh: '四季豆含皂甙和红细胞凝集素，没熟透会让人恶心呕吐，必须彻底加热。它也是最好用的"厨房安全"教材。',
        en: 'Green beans contain saponins and phytohaemagglutinin — undercooked beans can make people ill, so they must be fully cooked.' },
      { icon: '🌶️', title: '素菜也要香',
        zh: '不靠肉，靠干辣椒、花椒、蒜瓣和一点芽菜把香味撑起来，这是川菜做素菜的看家本事。',
        en: 'No meat: dried chilli, Sichuan pepper, garlic and a little preserved mustard sprout do the heavy lifting.' }
    ],
    fact: '📌 "干煸"很考火候：豆角洗过一定要晾干再下锅，不然油会溅。'
  }
};
