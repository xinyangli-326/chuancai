/* 词汇卡详解：点开卡片后的弹窗内容（这是什么 / 例句 / 什么场景用）
   键是词汇卡里的中文词，必须和 data-core.js 里 CC.vocab 的 zh 完全一致；
   用 work/check-vocab-detail.mjs 体检，缺词或多余词都会报出来。 */
window.CC_VOCAB_DETAIL = {

  /* ==================== 食材 · 蔬菜 ==================== */
  '蒜苗': {
    note: { zh: '大蒜长出来的嫩苗，有蒜香但不冲，川菜里常用来给肉菜提香。', en: 'Garlic sprouts — the young green shoots of garlic, milder than the bulb and used to perfume meat dishes.' },
    ex: [{ zh: '回锅肉里一定要放蒜苗。', py: 'Huíguōròu lǐ yídìng yào fàng suànmiáo.', en: 'Garlic sprouts are a must in twice-cooked pork.' },
         { zh: '蒜苗切段，等肉炒香了再下锅。', py: 'Suànmiáo qiē duàn, děng ròu chǎo xiāng le zài xià guō.', en: 'Cut the sprouts into lengths and add them once the meat smells fragrant.' }],
    scene: { zh: '在菜市场说"要一把蒜苗"，或者点回锅肉、盐煎肉时都会遇到它。', en: 'Useful at the market ("one bunch of garlic sprouts, please") and whenever twice-cooked pork is on the table.' }
  },
  '四季豆': {
    note: { zh: '细长的绿色豆角，川菜里最出名的是干煸四季豆。', en: 'Green beans — the long, thin kind; the classic Sichuan dish is dry-fried green beans.' },
    ex: [{ zh: '四季豆一定要炒熟，生的不能吃。', py: 'Sìjìdòu yídìng yào chǎo shú, shēng de bù néng chī.', en: 'Green beans must be cooked through — never eat them raw.' },
         { zh: '干煸四季豆要煸到表面起皱。', py: 'Gānbiān sìjìdòu yào biān dào biàomiàn qǐ zhòu.', en: 'Dry-fry the beans until the skin wrinkles.' }],
    scene: { zh: '在食堂点菜时很好用："来一个干煸四季豆，微辣。"', en: 'Handy for ordering: "one dry-fried green beans, mild, please."' }
  },
  '青椒': {
    note: { zh: '不辣的绿色甜椒，川菜里用来配色、也用来清口。', en: 'Green bell pepper — not spicy, used for colour and to freshen a dish.' },
    ex: [{ zh: '青椒切丝，和肉丝一起炒。', py: 'Qīngjiāo qiē sī, hé ròusī yìqǐ chǎo.', en: 'Shred the pepper and stir-fry it with shredded pork.' },
         { zh: '鱼香肉丝里也有青椒丝。', py: 'Yúxiāng ròusī lǐ yě yǒu qīngjiāo sī.', en: 'Fish-fragrant pork also contains shredded green pepper.' }],
    scene: { zh: '说"我不要辣的辣椒，青椒就行"时最常用。', en: 'Use it to say "not hot chilli — green pepper is fine."' }
  },
  '木耳': {
    note: { zh: '黑色的干菌菇，泡发以后脆脆的，川菜里做凉菜或炒肉。', en: 'Wood ear fungus — dried black fungus; springy and crunchy once soaked.' },
    ex: [{ zh: '木耳要提前用温水泡发。', py: 'Mù\'ěr yào tíqián yòng wēnshuǐ pào fā.', en: 'Soak the wood ear in warm water ahead of time.' },
         { zh: '木耳泡好以后撕成小朵。', py: 'Mù\'ěr pào hǎo yǐhòu sī chéng xiǎo duǒ.', en: 'Once soaked, tear it into small pieces.' }],
    scene: { zh: '点凉菜时说"凉拌木耳"；泡发时间也要问清楚。', en: 'Ordering cold dishes: "cold wood ear salad"; also used when asking how long to soak it.' }
  },
  '冬笋': {
    note: { zh: '冬天挖的竹笋，脆嫩、带一点鲜甜，是川菜的时令食材。', en: 'Winter bamboo shoot — crisp, tender and slightly sweet; a seasonal favourite.' },
    ex: [{ zh: '冬笋切片，先用开水焯一下。', py: 'Dōngsǔn qiē piàn, xiān yòng kāishuǐ chāo yíxià.', en: 'Slice the shoot and blanch it first.' },
         { zh: '冬笋和肉一起炒，很鲜。', py: 'Dōngsǔn hé ròu yìqǐ chǎo, hěn xiān.', en: 'Winter shoot stir-fried with meat tastes very fresh.' }],
    scene: { zh: '冬天在菜市场问"有冬笋吗？"，或者聊时令菜时说"冬笋是冬天的"。', en: 'Ask "do you have winter shoot?" in winter, or talk about what is in season.' }
  },
  '莴笋': {
    note: { zh: '一种吃茎的莴苣，口感脆爽，可以凉拌也可以炒。', en: 'Celtuce (stem lettuce) — crunchy and refreshing, good cold or stir-fried.' },
    ex: [{ zh: '莴笋削皮以后切成丝。', py: 'Wōsǔn xiāo pí yǐhòu qiē chéng sī.', en: 'Peel the celtuce and shred it.' },
         { zh: '莴笋凉拌，很清爽。', py: 'Wōsǔn liángbàn, hěn qīngshuǎng.', en: 'Celtuce salad tastes very clean and fresh.' }],
    scene: { zh: '说口感时很有用："这个莴笋很脆。"', en: 'Great for describing texture: "this celtuce is lovely and crunchy."' }
  },
  '胡萝卜': {
    note: { zh: '橙色的根茎蔬菜，川菜里多用来配色、也添一点甜味。', en: 'Carrot — an orange root vegetable, mostly used for colour and a touch of sweetness.' },
    ex: [{ zh: '胡萝卜切丝，和芹菜一起炒。', py: 'Húluóbo qiē sī, hé qíncài yìqǐ chǎo.', en: 'Shred the carrot and stir-fry it with celery.' },
         { zh: '胡萝卜给这道菜添了一点甜味。', py: 'Húluóbo gěi zhè dào cài tiān le yìdiǎn tiánwèi.', en: 'The carrot adds a little sweetness to the dish.' }],
    scene: { zh: '在市场买菜、或者问"这个要不要削皮"时用。', en: 'For buying vegetables and asking whether it needs peeling.' }
  },
  '大蒜': {
    note: { zh: '蒜头，川菜里几乎每道菜都用；剁碎就是蒜末。', en: 'Garlic — used in almost every Sichuan dish; chopped, it becomes minced garlic.' },
    ex: [{ zh: '大蒜拍碎再切末。', py: 'Dàsuàn pāi suì zài qiē mò.', en: 'Crush the garlic, then chop it fine.' },
         { zh: '蒜末最后放，香味才足。', py: 'Suànmò zuìhòu fàng, xiāngwèi cái zú.', en: 'Add the garlic last so the aroma stays strong.' }],
    scene: { zh: '在厨房问"大蒜在哪儿？"，或者说"多放点蒜"。', en: 'Ask where the garlic is, or say "more garlic, please."' }
  },
  '生姜': {
    note: { zh: '姜，去腥提味的老搭档，切片、切丝、剁末都行。', en: 'Ginger — the classic deodoriser and flavour booster; sliced, shredded or minced.' },
    ex: [{ zh: '生姜切片，和肉一起腌。', py: 'Shēngjiāng qiē piàn, hé ròu yìqǐ yān.', en: 'Slice the ginger and marinate it with the meat.' },
         { zh: '姜末可以去腥。', py: 'Jiāngmò kěyǐ qù xīng.', en: 'Minced ginger takes away the raw smell.' }],
    scene: { zh: '处理鱼、肉的时候最常说："放点姜去腥。"', en: 'When handling fish or meat: "add some ginger to kill the smell."' }
  },
  '小葱': {
    note: { zh: '香葱，切碎就是葱花，出锅前撒上增香。', en: 'Spring onion — chopped into "scallion flowers" and scattered on at the end.' },
    ex: [{ zh: '出锅前撒上葱花。', py: 'Chū guō qián sǎ shàng cōnghuā.', en: 'Sprinkle the scallion over just before serving.' },
         { zh: '小葱洗干净，切成葱花备用。', py: 'Xiǎocōng xǐ gānjìng, qiē chéng cōnghuā bèiyòng.', en: 'Wash the spring onion and chop it ready to use.' }],
    scene: { zh: '在面馆说"多放葱花"；做菜时提示"最后撒葱花"。', en: 'At a noodle shop: "extra scallion, please." Or when finishing a dish.' }
  },
  '香菜': {
    note: { zh: '芫荽，四川话里就叫香菜，有人爱有人怕，常用来提香。', en: 'Coriander (cilantro) — loved by some, hated by others; used as a fresh garnish.' },
    ex: [{ zh: '豌杂面里要放香菜。', py: 'Wānzámài lǐ yào fàng xiāngcài.', en: 'Wanza noodles come with coriander.' },
         { zh: '我不吃香菜，可以不放吗？', py: 'Wǒ bù chī xiāngcài, kěyǐ bú fàng ma?', en: 'I do not eat coriander — could you leave it out?' }],
    scene: { zh: '点餐时最实用的一句："不要香菜。"', en: 'One of the most useful ordering phrases: "no coriander."' }
  },
  '芽菜': {
    note: { zh: '四川宜宾的腌菜，用青菜腌成，咸香，是干煸四季豆的常客。', en: 'Yibin yacai — a salted pickled mustard green from Sichuan, salty and savoury.' },
    ex: [{ zh: '芽菜要先洗一下再切碎。', py: 'Yácài yào xiān xǐ yíxià zài qiē suì.', en: 'Rinse the yacai first, then chop it.' },
         { zh: '干煸四季豆里放了芽菜才香。', py: 'Gānbiān sìjìdòu lǐ fàng le yácài cái xiāng.', en: 'Dry-fried beans only taste right with yacai in them.' }],
    scene: { zh: '买川菜调料时说"宜宾芽菜"，一般是一小包一小包卖的。', en: 'Ask for "Yibin yacai" when buying Sichuan ingredients — it usually comes in small packets.' }
  },

  /* ==================== 食材 · 肉蛋豆 ==================== */
  '牛肉': {
    note: { zh: '牛身上的肉，川菜里水煮牛肉、冷吃牛肉都用它。', en: 'Beef — the base of dishes like boiled beef in chilli oil and cold-eaten beef.' },
    ex: [{ zh: '牛肉要逆着纹路切，才嫩。', py: 'Niúròu yào nì zhe wénlù qiē, cái nèn.', en: 'Cut the beef against the grain so it stays tender.' },
         { zh: '水煮牛肉要用嫩一点的牛肉。', py: 'Shuǐzhǔ niúròu yào yòng nèn yìdiǎn de niúròu.', en: 'Boiled beef needs a tender cut.' }],
    scene: { zh: '在肉摊上说"要半斤牛肉，切薄片"。', en: 'At the butcher: "half a jin of beef, sliced thin, please."' }
  },
  '牛里脊': {
    note: { zh: '牛身上最嫩的一条肉，适合快炒和水煮。', en: 'Beef tenderloin — the tenderest cut, best for quick frying or poaching.' },
    ex: [{ zh: '牛里脊切片，加淀粉抓匀。', py: 'Niúlǐji qiē piàn, jiā diànfěn zhuā yún.', en: 'Slice the tenderloin and rub in some starch.' },
         { zh: '用牛里脊做水煮牛肉最好。', py: 'Yòng niúlǐji zuò shuǐzhǔ niúròu zuì hǎo.', en: 'Tenderloin makes the best boiled beef.' }],
    scene: { zh: '在肉摊上说"要嫩一点的，炒肉用"。', en: 'Say "the tender part, for stir-frying" at the butcher.' }
  },
  '猪里脊': {
    note: { zh: '猪身上最嫩的瘦肉，鱼香肉丝就用它。', en: 'Pork tenderloin — the tenderest lean cut; used for fish-fragrant shredded pork.' },
    ex: [{ zh: '猪里脊切丝，做鱼香肉丝。', py: 'Zhūlǐji qiē sī, zuò yúxiāng ròusī.', en: 'Shred the tenderloin for fish-fragrant pork.' },
         { zh: '里脊肉没有肥肉。', py: 'Lǐji ròu méiyǒu féiròu.', en: 'Tenderloin has no fat on it.' }],
    scene: { zh: '说"我不吃肥肉，要里脊"时用得上。', en: 'Useful for "I do not eat fat — tenderloin, please."' }
  },
  '五花肉': {
    note: { zh: '肥瘦相间的猪肉，回锅肉、蒜泥白肉的标准材料。', en: 'Pork belly — layered fat and lean; the standard cut for twice-cooked pork.' },
    ex: [{ zh: '五花肉先煮再切薄片。', py: 'Wǔhuāròu xiān zhǔ zài qiē báo piàn.', en: 'Boil the pork belly first, then slice it thin.' },
         { zh: '做回锅肉要用五花肉。', py: 'Zuò huíguōròu yào yòng wǔhuāròu.', en: 'Twice-cooked pork calls for pork belly.' }],
    scene: { zh: '在肉摊说"要一条五花肉，肥瘦相间的"。', en: 'At the butcher: "one strip of pork belly with even layers."' }
  },
  '后腿肉': {
    note: { zh: '猪后腿的肉，瘦中带一点肥，适合炒肉丝、做肉臊。', en: 'Pork hind leg — lean with a little fat; good for shreds and meat sauce.' },
    ex: [{ zh: '后腿肉切丝，炒青椒。', py: 'Hòutuǐròu qiē sī, chǎo qīngjiāo.', en: 'Shred the hind-leg pork and stir-fry it with green pepper.' },
         { zh: '后腿肉比里脊稍微粗一点。', py: 'Hòutuǐròu bǐ lǐji shāowēi cū yìdiǎn.', en: 'Hind leg is a bit coarser than tenderloin.' }],
    scene: { zh: '问老板"这个肉炒着吃行不行"时最常用。', en: 'Ask the butcher: "is this cut good for stir-frying?"' }
  },
  '肉末': {
    note: { zh: '剁碎或绞碎的肉，麻婆豆腐、豌杂面都用它。', en: 'Minced meat — used in mapo tofu and wanza noodles.' },
    ex: [{ zh: '肉末要炒散才香。', py: 'Ròumò yào chǎo sàn cái xiāng.', en: 'Break the mince apart as you fry it so it smells good.' },
         { zh: '肉末加料酒腌一下。', py: 'Ròumò jiā liàojiǔ yān yíxià.', en: 'Marinate the mince with a little cooking wine.' }],
    scene: { zh: '在肉摊上说"帮我绞成肉末"，或者点"肉末茄子"。', en: 'Say "please mince it for me", or order "aubergine with minced pork."' }
  },
  '鸡胸肉': {
    note: { zh: '鸡胸脯的肉，几乎没有脂肪，适合水煮、凉拌。', en: 'Chicken breast — almost no fat; good boiled or served cold.' },
    ex: [{ zh: '鸡胸肉煮熟以后撕成丝。', py: 'Jīxiōngròu zhǔ shú yǐhòu sī chéng sī.', en: 'Boil the chicken breast, then tear it into strips.' },
         { zh: '鸡胸肉要提前腌，才不柴。', py: 'Jīxiōngròu yào tíqián yān, cái bù chái.', en: 'Marinate chicken breast first or it turns dry.' }],
    scene: { zh: '说"我要减脂，吃鸡胸肉"；或者点凉菜"手撕鸡"。', en: 'Talk about eating light: "chicken breast for me"; the cold dish is "hand-torn chicken."' }
  },
  '牛肚': {
    note: { zh: '牛的胃，毛肚火锅的主角，口感脆弹。', en: 'Beef tripe — the star of tripe hotpot; bouncy and crunchy.' },
    ex: [{ zh: '牛肚要先煮到软。', py: 'Niúdǔ yào xiān zhǔ dào ruǎn.', en: 'Boil the tripe until it is soft.' },
         { zh: '牛肚切薄片，凉拌很香。', py: 'Niúdǔ qiē báo piàn, liángbàn hěn xiāng.', en: 'Slice the tripe thin — it makes a fragrant cold dish.' }],
    scene: { zh: '吃火锅时说"来一份毛肚"，就是牛的另一个胃。', en: 'At hotpot: "one portion of maodu" — a different part of the same animal.' }
  },
  '豆腐': {
    note: { zh: '黄豆做的，川菜里麻婆豆腐、家常豆腐都用它。', en: 'Tofu — made from soybeans; the base of mapo tofu and home-style tofu.' },
    ex: [{ zh: '豆腐切块，用淡盐水泡一下。', py: 'Dòufu qiē kuài, yòng dàn yánshuǐ pào yíxià.', en: 'Cube the tofu and soak it in lightly salted water.' },
         { zh: '豆腐要用嫩一点的。', py: 'Dòufu yào yòng nèn yìdiǎn de.', en: 'Use the softer kind of tofu.' }],
    scene: { zh: '在菜市场说"要一块豆腐"；问"老豆腐还是嫩豆腐？"', en: 'Say "one block of tofu"; then the vendor may ask "firm or soft?"' }
  },
  '嫩豆腐': {
    note: { zh: '也叫内酯豆腐，比普通豆腐更软更嫩，麻婆豆腐用它最合适。', en: 'Silken tofu — softer than regular tofu and the best choice for mapo tofu.' },
    ex: [{ zh: '嫩豆腐一碰就碎，动作要轻。', py: 'Nèn dòufu yí pèng jiù suì, dòngzuò yào qīng.', en: 'Silken tofu falls apart if you touch it — be gentle.' },
         { zh: '嫩豆腐更适合做汤。', py: 'Nèn dòufu gèng shìhé zuò tāng.', en: 'Silken tofu is better in soup.' }],
    scene: { zh: '买豆腐时问"有没有嫩一点的"，或者点菜时说"要嫩豆腐"。', en: 'Ask for "the softer one" when buying, or specify at the restaurant.' }
  },
  '鸡蛋': {
    note: { zh: '家常食材，川菜里用来上浆、做汤、炒饭。', en: 'Egg — used to coat meat, in soups and in fried rice.' },
    ex: [{ zh: '鸡蛋打散，加一点盐。', py: 'Jīdàn dǎ sàn, jiā yìdiǎn yán.', en: 'Beat the eggs with a pinch of salt.' },
         { zh: '肉片裹上鸡蛋液再下锅。', py: 'Ròupiàn guǒ shàng jīdàn yè zài xià guō.', en: 'Coat the meat slices in egg before frying.' }],
    scene: { zh: '说"我要两个鸡蛋"，或者问"有没有鸡蛋？"', en: 'Ask for "two eggs", or check whether a dish contains egg.' }
  },
  '花生米': {
    note: { zh: '花生仁，宫保鸡丁、凉菜里常见，香脆。', en: 'Peanuts — crisp and common in kung pao chicken and cold dishes.' },
    ex: [{ zh: '花生米要炸到酥脆。', py: 'Huāshēngmǐ yào zhà dào sūcuì.', en: 'Fry the peanuts until they are crisp.' },
         { zh: '宫保鸡丁最后才放花生米。', py: 'Gōngbǎo jīdīng zuìhòu cái fàng huāshēngmǐ.', en: 'Peanuts go into kung pao chicken at the very end.' }],
    scene: { zh: '点凉菜说"凉拌花生米"；提醒别人"我对花生过敏"。', en: 'Order cold peanuts, or warn others: "I am allergic to peanuts."' }
  },

  /* ==================== 调味 · 调料 ==================== */
  '郫县豆瓣酱': {
    note: { zh: '四川郫县产的辣椒豆瓣酱，被叫做"川菜之魂"，炒出红油才香。', en: 'Pixian broad-bean chilli paste — called the soul of Sichuan cooking; fry it until red oil appears.' },
    ex: [{ zh: '豆瓣酱一定要炒出红油。', py: 'Dòubànjiàng yídìng yào chǎo chū hóngyóu.', en: 'Always fry the bean paste until the red oil comes out.' },
         { zh: '郫县豆瓣酱有点咸，盐要少放。', py: 'Píxiàn dòubànjiàng yǒudiǎn xián, yán yào shǎo fàng.', en: 'Pixian bean paste is salty, so go easy on the salt.' }],
    scene: { zh: '买调料时说"要一瓶郫县豆瓣"，超市里一般写"郫县豆瓣酱"。', en: 'Ask for "a jar of Pixian douban" — the label usually says Pixian doubanjiang.' }
  },
  '花椒': {
    note: { zh: '四川的花椒，麻味的来源；青花椒更清麻，红花椒更香。', en: 'Sichuan peppercorn — the source of numbing flavour; green is brighter, red is more fragrant.' },
    ex: [{ zh: '花椒先用油炸出香味。', py: 'Huājiāo xiān yòng yóu zhá chū xiāngwèi.', en: 'Fry the peppercorns in oil to release the aroma.' },
         { zh: '花椒麻得舌头都没感觉了。', py: 'Huājiāo má de shétou dōu méi gǎnjué le.', en: 'The peppercorns numb your tongue completely.' }],
    scene: { zh: '说麻味时说"花椒太麻了"，点菜说"少放花椒"。', en: 'Talk about the numbing taste, or ask for "less Sichuan pepper."' }
  },
  '花椒粉': {
    note: { zh: '花椒磨成的粉，出锅前撒，麻香最足。', en: 'Ground Sichuan pepper — sprinkled at the very end for the freshest numbing aroma.' },
    ex: [{ zh: '花椒粉最后撒才香。', py: 'Huājiāofěn zuìhòu sǎ cái xiāng.', en: 'Ground pepper only smells right when added last.' },
         { zh: '再撒点花椒粉。', py: 'Zài sǎ diǎn huājiāofěn.', en: 'Sprinkle a bit more ground pepper.' }],
    scene: { zh: '吃面时最常说："多放点花椒粉。"', en: 'At a noodle shop: "more ground Sichuan pepper, please."' }
  },
  '干辣椒': {
    note: { zh: '晒干的辣椒，用来炒香、增辣，剪成段更出味。', en: 'Dried chillies — fried for aroma and heat; snipped into sections they release more flavour.' },
    ex: [{ zh: '干辣椒剪成段，把籽去掉。', py: 'Gān làjiāo jiǎn chéng duàn, bǎ zǐ qù diào.', en: 'Snip the dried chillies into sections and shake out the seeds.' },
         { zh: '干辣椒炒糊了会苦。', py: 'Gān làjiāo chǎo hú le huì kǔ.', en: 'Burnt dried chillies turn bitter.' }],
    scene: { zh: '在干货店说"要一两干辣椒"。', en: 'At the dry-goods shop: "one liang of dried chillies."' }
  },
  '泡椒': {
    note: { zh: '泡在盐水里的辣椒，酸辣带一点发酵香，是鱼香味的来源。', en: 'Pickled chillies — sour-hot with a fermented note; the source of fish-fragrant flavour.' },
    ex: [{ zh: '泡椒要剁碎再用。', py: 'Pàojiāo yào duòsuì zài yòng.', en: 'Chop the pickled chillies before using them.' },
         { zh: '没有泡椒就不是鱼香味。', py: 'Méiyǒu pàojiāo jiù bú shì yúxiāngwèi.', en: 'Without pickled chilli it is not fish-fragrant at all.' }],
    scene: { zh: '在川菜馆点"泡椒鸡杂""泡椒牛蛙"，或者买一袋泡椒回家做。', en: 'Order pickled-chilli dishes, or buy a bag of paojiao to cook with.' }
  },
  '豆豉': {
    note: { zh: '发酵过的黑豆，咸鲜，川菜里用来提香。', en: 'Fermented black beans — salty and savoury, used to deepen the aroma.' },
    ex: [{ zh: '豆豉剁一下再用更出味。', py: 'Dòuchǐ duò yíxià zài yòng gèng chū wèi.', en: 'Chop the beans a little and they release more flavour.' },
         { zh: '豆豉有点咸，别放太多。', py: 'Dòuchǐ yǒudiǎn xián, bié fàng tài duō.', en: 'Fermented beans are salty, so do not add too much.' }],
    scene: { zh: '吃"豆豉蒸排骨""豆豉鲮鱼油麦菜"时会遇到它。', en: 'You meet it in steamed ribs with black beans and stir-fried greens with dace.' }
  },
  '生抽': {
    note: { zh: '颜色浅的酱油，主要提鲜、调味。', en: 'Light soy sauce — pale in colour, used mainly for seasoning and savouriness.' },
    ex: [{ zh: '生抽两勺，老抽半勺。', py: 'Shēngchōu liǎng sháo, lǎochōu bàn sháo.', en: 'Two spoons of light soy, half a spoon of dark soy.' },
         { zh: '生抽不太咸，可以多放一点。', py: 'Shēngchōu bú tài xián, kěyǐ duō fàng yìdiǎn.', en: 'Light soy is not very salty, so you can add a little more.' }],
    scene: { zh: '在超市找酱油时可以问："哪个是生抽？"', en: 'In the supermarket: "which one is light soy sauce?"' }
  },
  '老抽': {
    note: { zh: '颜色深的酱油，主要给菜上色。', en: 'Dark soy sauce — deep in colour, used mainly to colour a dish.' },
    ex: [{ zh: '老抽只要一点就够。', py: 'Lǎochōu zhǐyào yìdiǎn jiù gòu.', en: 'A little dark soy goes a long way.' },
         { zh: '加了老抽，颜色就深了。', py: 'Jiā le lǎochōu, yánsè jiù shēn le.', en: 'Once you add dark soy the colour deepens.' }],
    scene: { zh: '谈菜的颜色："这个菜是用老抽上的色。"', en: 'Talking about colour: "this dish gets its colour from dark soy."' }
  },
  '香醋': {
    note: { zh: '香味浓的米醋，川菜里凉菜和酸辣味常用。', en: 'Fragrant rice vinegar — used in cold dishes and sour-hot flavours.' },
    ex: [{ zh: '凉菜里放一点香醋更开胃。', py: 'Liángcài lǐ fàng yìdiǎn xiāngcù gèng kāiwèi.', en: 'A splash of fragrant vinegar makes cold dishes more appetising.' },
         { zh: '香醋和辣椒油一起拌很好吃。', py: 'Xiāngcù hé làjiāoyóu yìqǐ bàn hěn hǎochī.', en: 'Fragrant vinegar and chilli oil make a great dressing.' }],
    scene: { zh: '点凉菜或面时说："多放点醋。"', en: 'Ordering cold dishes or noodles: "more vinegar, please."' }
  },
  '白糖': {
    note: { zh: '白糖，川菜里用来调味、提鲜，不是只做甜的。', en: 'White sugar — used to balance and lift flavours, not only for sweet dishes.' },
    ex: [{ zh: '加一点白糖，味道更圆。', py: 'Jiā yìdiǎn báitáng, wèidào gèng yuán.', en: 'A pinch of sugar rounds out the taste.' },
         { zh: '糖醋汁是糖和醋三比三。', py: 'Tángcùzhī shì táng hé cù sān bǐ sān.', en: 'The sweet-and-sour sauce is sugar and vinegar three to three.' }],
    scene: { zh: '说口味时用："不要太甜，少放糖。"', en: 'Say "not too sweet, less sugar, please."' }
  },
  '料酒': {
    note: { zh: '黄酒类的烹饪酒，用来去腥。', en: 'Cooking wine (rice wine) — used to remove the raw smell from meat and fish.' },
    ex: [{ zh: '腌肉的时候加一点料酒。', py: 'Yān ròu de shíhou jiā yìdiǎn liàojiǔ.', en: 'Add a little cooking wine when marinating meat.' },
         { zh: '料酒和姜一起用，可以去掉腥味。', py: 'Liàojiǔ hé jiāng yìqǐ yòng, kěyǐ qùdiào xīngwèi.', en: 'Cooking wine with ginger takes the fishiness away.' }],
    scene: { zh: '处理鱼、肉时常说："先加料酒去腥。"', en: 'When handling fish or meat: "add cooking wine first to kill the smell."' }
  },
  '淀粉': {
    note: { zh: '玉米淀粉或土豆淀粉，用来上浆、勾芡。', en: 'Starch — corn or potato; used to coat meat and to thicken sauces.' },
    ex: [{ zh: '肉片加淀粉抓匀，炒出来更嫩。', py: 'Ròupiàn jiā diànfěn zhuā yún, chǎo chūlái gèng nèn.', en: 'Rub starch into the meat slices and they fry up tender.' },
         { zh: '水淀粉要分两三次淋入。', py: 'Shuǐ diànfěn yào fēn liǎng sān cì lín rù.', en: 'Add the starch water in two or three rounds.' }],
    scene: { zh: '说口感："肉有点老，淀粉放少了。"', en: 'Talk about texture: "the meat is tough — not enough starch."' }
  },
  '甜面酱': {
    note: { zh: '甜咸味的面酱，回锅肉、炸酱里都用。', en: 'Sweet bean sauce — sweet and savoury; used in twice-cooked pork and fried sauce noodles.' },
    ex: [{ zh: '甜面酱和豆瓣酱一起炒。', py: 'Tiánmiànjiàng hé dòubànjiàng yìqǐ chǎo.', en: 'Fry the sweet bean sauce together with the chilli bean paste.' },
         { zh: '甜面酱有点甜。', py: 'Tiánmiànjiàng yǒudiǎn tián.', en: 'Sweet bean sauce is a little sweet.' }],
    scene: { zh: '买甜面酱做炸酱面，或者蘸烤鸭、蘸黄瓜。', en: 'Buy it for fried-sauce noodles, or to dip roast duck and cucumber.' }
  },
  '红油': {
    note: { zh: '热油泼辣椒面做成的辣油，是凉菜和抄手的灵魂。', en: 'Chilli oil — hot oil poured over chilli flakes; the soul of cold dishes and wontons.' },
    ex: [{ zh: '红油抄手要多放红油。', py: 'Hóngyóu chāoshǒu yào duō fàng hóngyóu.', en: 'Chilli-oil wontons need plenty of chilli oil.' },
         { zh: '红油看着辣，其实很香。', py: 'Hóngyóu kàn zhe là, qíshí hěn xiāng.', en: 'Chilli oil looks hot, but it is really about the aroma.' }],
    scene: { zh: '点"红油抄手""红油耳片"时用。', en: 'Order chilli-oil wontons or chilli-oil pig ear.' }
  },

  /* ==================== 动作 · 烹饪 ==================== */
  '洗': {
    note: { zh: '用水弄干净，做菜的第一步。', en: 'To wash — the first step of any cooking.' },
    ex: [{ zh: '先把菜洗干净。', py: 'Xiān bǎ cài xǐ gānjìng.', en: 'Wash the vegetables first.' },
         { zh: '洗三遍就干净了。', py: 'Xǐ sān biàn jiù gānjìng le.', en: 'Rinse it three times and it is clean.' }],
    scene: { zh: '在厨房最常听到的一句话："先洗一下。"', en: 'The most common kitchen phrase: "wash it first."' }
  },
  '切': {
    note: { zh: '用刀把食材分开，最常用的动作。', en: 'To cut — the basic knife action.' },
    ex: [{ zh: '这个菜要切成小块。', py: 'Zhège cài yào qiē chéng xiǎo kuài.', en: 'Cut this into small pieces.' },
         { zh: '切菜的时候小心手。', py: 'Qiē cài de shíhou xiǎoxīn shǒu.', en: 'Be careful with your fingers while cutting.' }],
    scene: { zh: '问刀工："这个要切多大？"', en: 'Ask about the size: "how big should I cut it?"' }
  },
  '切片': {
    note: { zh: '切成薄片。', en: 'To slice — cut into thin flat pieces.' },
    ex: [{ zh: '牛肉切成薄片。', py: 'Niúròu qiē chéng báo piàn.', en: 'Slice the beef thinly.' },
         { zh: '姜切片，蒜切末。', py: 'Jiāng qiē piàn, suàn qiē mò.', en: 'Slice the ginger and mince the garlic.' }],
    scene: { zh: '说刀工："切薄片，别太厚。"', en: 'Describe the cut: "thin slices, not too thick."' }
  },
  '切丝': {
    note: { zh: '切成细长条。', en: 'To shred — cut into thin strips.' },
    ex: [{ zh: '肉切丝，青椒也切丝。', py: 'Ròu qiē sī, qīngjiāo yě qiē sī.', en: 'Shred the pork, and shred the pepper too.' },
         { zh: '切丝要切得一样粗。', py: 'Qiē sī yào qiē de yíyàng cū.', en: 'Shred everything to the same thickness.' }],
    scene: { zh: '鱼香肉丝、青椒肉丝里的"丝"就是这个动作。', en: 'The "si" in fish-fragrant pork and pepper pork means this cut.' }
  },
  '切块': {
    note: { zh: '切成大一点的块。', en: 'To cut into chunks.' },
    ex: [{ zh: '豆腐切块，不要太小。', py: 'Dòufu qiē kuài, bú yào tài xiǎo.', en: 'Cut the tofu into chunks, not too small.' },
         { zh: '土豆切成滚刀块。', py: 'Tǔdòu qiē chéng gǔndāo kuài.', en: 'Cut the potato into rough rolling chunks.' }],
    scene: { zh: '炖菜、烧菜时最常说："切成块。"', en: 'For stews and braises: "cut it into chunks."' }
  },
  '剁末': {
    note: { zh: '剁成碎末。', en: 'To mince — chop into fine pieces.' },
    ex: [{ zh: '把姜剁成末。', py: 'Bǎ jiāng duò chéng mò.', en: 'Mince the ginger.' },
         { zh: '肉剁成末以后更好入味。', py: 'Ròu duò chéng mò yǐhòu gèng hǎo rùwèi.', en: 'Minced meat takes on seasoning more easily.' }],
    scene: { zh: '说配料时常用："蒜末、姜末。"', en: 'Common in recipes: "minced garlic, minced ginger."' }
  },
  '腌制': {
    note: { zh: '加调料放一会儿，让肉入味。', en: 'To marinate — season and leave for a while so the flavour soaks in.' },
    ex: [{ zh: '肉片腌十分钟。', py: 'Ròupiàn yān shí fēnzhōng.', en: 'Marinate the meat slices for ten minutes.' },
         { zh: '腌制的时候加一点淀粉。', py: 'Yānzhì de shíhou jiā yìdiǎn diànfěn.', en: 'Add a little starch while marinating.' }],
    scene: { zh: '做肉菜前说"先腌一下"，做菜视频里也常听到。', en: 'Before cooking meat: "marinate it first" — you hear it in every cooking video.' }
  },
  '焯水': {
    note: { zh: '先放进开水里煮一下，去掉腥味或生味。', en: 'To blanch — a quick dip in boiling water to remove rawness or smells.' },
    ex: [{ zh: '冬笋先焯水。', py: 'Dōngsǔn xiān chāo shuǐ.', en: 'Blanch the winter bamboo shoot first.' },
         { zh: '肉焯水以后要洗一下。', py: 'Ròu chāo shuǐ yǐhòu yào xǐ yíxià.', en: 'Rinse the meat after blanching.' }],
    scene: { zh: '处理肉、笋、青菜时说"焯一下水"。', en: 'For meat, bamboo shoots and greens: "give it a blanch."' }
  },
  '下锅': {
    note: { zh: '把食材放进锅里，川菜说"下锅"。', en: 'To drop into the wok — the Sichuan way of saying it goes in.' },
    ex: [{ zh: '油热了再下锅。', py: 'Yóu rè le zài xià guō.', en: 'Wait until the oil is hot before adding it.' },
         { zh: '肉已经下锅了。', py: 'Ròu yǐjīng xià guō le.', en: 'The meat is already in the wok.' }],
    scene: { zh: '做菜时的口令："可以下锅了。"', en: 'A kitchen cue: "in it goes."' }
  },
  '翻炒': {
    note: { zh: '用铲子把锅里的菜翻来翻去。', en: 'To stir-fry — keep turning the food in the wok with the spatula.' },
    ex: [{ zh: '大火翻炒一分钟。', py: 'Dàhuǒ fānchǎo yì fēnzhōng.', en: 'Stir-fry on high heat for one minute.' },
         { zh: '翻炒的时候别停手。', py: 'Fānchǎo de shíhou bié tíng shǒu.', en: 'Do not stop stirring while it fries.' }],
    scene: { zh: '看菜谱、听讲解时出现最多的动作词。', en: 'The action word you meet most in recipes and videos.' }
  },
  '炒香': {
    note: { zh: '炒到出香味，是川菜的关键一步。', en: 'To fry until fragrant — a key step in Sichuan cooking.' },
    ex: [{ zh: '姜蒜炒香再下肉。', py: 'Jiāng suàn chǎo xiāng zài xià ròu.', en: 'Fry the ginger and garlic until fragrant, then add the meat.' },
         { zh: '豆瓣酱炒香才有红油。', py: 'Dòubànjiàng chǎo xiāng cái yǒu hóngyóu.', en: 'Only when the bean paste is fried fragrant does the red oil appear.' }],
    scene: { zh: '说步骤："先炒香，再放水。"', en: 'Describe the order: "fry it fragrant first, then add water."' }
  },
  '煸': {
    note: { zh: '用中小火慢慢炒，把水分炒干、表面起皱。', en: 'To dry-fry — slow frying on medium-low heat until the moisture leaves and the surface wrinkles.' },
    ex: [{ zh: '四季豆要煸到起皱。', py: 'Sìjìdòu yào biān dào qǐ zhòu.', en: 'Dry-fry the beans until the skins wrinkle.' },
         { zh: '煸的时候火别太大。', py: 'Biān de shíhou huǒ bié tài dà.', en: 'Do not use too much heat while dry-frying.' }],
    scene: { zh: '点菜时说"干煸"，就是用这种做法。', en: 'Order "ganbian" on a menu and this is what you get.' }
  },
  '收汁': {
    note: { zh: '把汤汁炒浓、收少。', en: 'To reduce the sauce — fry until the liquid thickens and lessens.' },
    ex: [{ zh: '最后大火收汁。', py: 'Zuìhòu dàhuǒ shōu zhī.', en: 'Finish with high heat to reduce the sauce.' },
         { zh: '收汁不要太干。', py: 'Shōu zhī bú yào tài gān.', en: 'Do not reduce it until it is completely dry.' }],
    scene: { zh: '说"收一下汁就可以出锅了"。', en: 'Say "let the sauce reduce and it is ready to serve."' }
  },
  '勾芡': {
    note: { zh: '淋入水淀粉，让汤汁变浓、挂在食材上。', en: 'To thicken with starch water so the sauce clings to the food.' },
    ex: [{ zh: '水淀粉分两次勾芡。', py: 'Shuǐ diànfěn fēn liǎng cì gōu qiàn.', en: 'Thicken in two rounds with starch water.' },
         { zh: '勾芡以后汤汁才浓。', py: 'Gōu qiàn yǐhòu tāngzhī cái nóng.', en: 'Only after thickening does the sauce become rich.' }],
    scene: { zh: '做麻婆豆腐、鱼香肉丝时要"勾芡"。', en: 'Mapo tofu and fish-fragrant pork both need thickening.' }
  },
  '淋': {
    note: { zh: '把油或汤汁从上往下浇。', en: 'To drizzle or pour over from above.' },
    ex: [{ zh: '最后淋一点香油。', py: 'Zuìhòu lín yìdiǎn xiāngyóu.', en: 'Finish with a drizzle of sesame oil.' },
         { zh: '把热油淋在辣椒面上。', py: 'Bǎ rèyóu lín zài làjiāomiàn shàng.', en: 'Pour the hot oil over the chilli flakes.' }],
    scene: { zh: '说"淋一点油"，就是浇上去。', en: '"Drizzle a little oil" means pour it over.' }
  },
  '出锅': {
    note: { zh: '把做好的菜从锅里盛出来。', en: 'To take the dish out of the wok.' },
    ex: [{ zh: '出锅前撒葱花。', py: 'Chū guō qián sǎ cōnghuā.', en: 'Scatter the scallion before it leaves the wok.' },
         { zh: '菜已经出锅了。', py: 'Cài yǐjīng chū guō le.', en: 'The dish is already plated.' }],
    scene: { zh: '厨房口令："可以出锅了。"', en: 'A kitchen cue: "time to plate it."' }
  },
  '上菜': {
    note: { zh: '把菜端到桌子上。', en: 'To serve the dish — bring it to the table.' },
    ex: [{ zh: '上菜啦！', py: 'Shàng cài la!', en: 'Dinner is served!' },
         { zh: '先上凉菜，再上热菜。', py: 'Xiān shàng liángcài, zài shàng rècài.', en: 'Cold dishes come first, then the hot ones.' }],
    scene: { zh: '在餐厅最常听到："上菜了，小心烫。"', en: 'At the restaurant: "here comes your dish, it is hot."' }
  },
  '关火': {
    note: { zh: '把火关掉。', en: 'To turn off the heat.' },
    ex: [{ zh: '关火，撒花椒粉。', py: 'Guān huǒ, sǎ huājiāofěn.', en: 'Turn off the heat and sprinkle the ground pepper.' },
         { zh: '关火以后再加香菜。', py: 'Guān huǒ yǐhòu zài jiā xiāngcài.', en: 'Add the coriander after the heat is off.' }],
    scene: { zh: '做菜最后一步常说："关火。"', en: 'The last step in most recipes: "heat off."' }
  },

  /* ==================== 味道 · 评价 ==================== */
  '麻': {
    note: { zh: '花椒带来的感觉：舌头又麻又跳。', en: 'Numbing — the tingling, buzzing feeling Sichuan pepper gives your tongue.' },
    ex: [{ zh: '这个麻得很舒服。', py: 'Zhège má de hěn shūfu.', en: 'This numbing taste is really pleasant.' },
         { zh: '花椒放多了，嘴巴都麻了。', py: 'Huājiāo fàng duō le, zuǐba dōu má le.', en: 'Too much pepper — my whole mouth is numb.' }],
    scene: { zh: '评价川菜最常用的两个字之一（另一个是"辣"）。', en: 'One of the two words you need for Sichuan food (the other is hot).' }
  },
  '辣': {
    note: { zh: '辣椒带来的热辣感。', en: 'Spicy — the heat that chillies bring.' },
    ex: [{ zh: '川菜有很多不辣的菜。', py: 'Chuāncài yǒu hěnduō bú là de cài.', en: 'Plenty of Sichuan dishes are not spicy at all.' },
         { zh: '这个辣得刚刚好。', py: 'Zhège là de gānggāng hǎo.', en: 'This is just the right level of heat.' }],
    scene: { zh: '点菜时说"微辣、中辣、特辣"。', en: 'Order with "mild, medium or extra hot."' }
  },
  '咸': {
    note: { zh: '盐味重。', en: 'Salty.' },
    ex: [{ zh: '有点咸。', py: 'Yǒudiǎn xián.', en: 'It is a bit salty.' },
         { zh: '这个菜太咸了。', py: 'Zhège cài tài xián le.', en: 'This dish is too salty.' }],
    scene: { zh: '在餐厅提意见："能不能少放点盐？"', en: 'At a restaurant: "could you use less salt?"' }
  },
  '酸': {
    note: { zh: '醋或泡菜带来的酸味。', en: 'Sour — from vinegar or pickles.' },
    ex: [{ zh: '酸辣粉又酸又辣。', py: 'Suānlàfěn yòu suān yòu là.', en: 'Hot-and-sour noodles are both sour and spicy.' },
         { zh: '这个汤有点酸。', py: 'Zhège tāng yǒudiǎn suān.', en: 'This soup tastes a little sour.' }],
    scene: { zh: '描述口味，也用来点"酸辣"的菜。', en: 'Describe taste, or order something "hot and sour."' }
  },
  '甜': {
    note: { zh: '糖带来的甜味。', en: 'Sweet.' },
    ex: [{ zh: '荔枝味的菜有一点甜。', py: 'Lìzhīwèi de cài yǒu yìdiǎn tián.', en: 'Lychee-flavour dishes are slightly sweet.' },
         { zh: '宫保鸡丁是酸甜的。', py: 'Gōngbǎo jīdīng shì suāntián de.', en: 'Kung pao chicken is sweet and sour.' }],
    scene: { zh: '点菜说："不要太甜。"', en: 'Order with "not too sweet, please."' }
  },
  '鲜': {
    note: { zh: '食材本来的美味，中文里是很高的夸奖。', en: 'Fresh and full of natural flavour — high praise in Chinese.' },
    ex: [{ zh: '这个汤真鲜。', py: 'Zhège tāng zhēn xiān.', en: 'This soup is really flavourful.' },
         { zh: '冬笋炒肉很鲜。', py: 'Dōngsǔn chǎo ròu hěn xiān.', en: 'Winter bamboo shoot with pork tastes very fresh.' }],
    scene: { zh: '夸一道菜时说"很鲜"，比"好吃"更具体。', en: 'Praising a dish: "very fresh" is more specific than "tasty."' }
  },
  '香': {
    note: { zh: '闻起来好。', en: 'Fragrant — it smells good.' },
    ex: [{ zh: '好香啊！', py: 'Hǎo xiāng a!', en: 'That smells great!' },
         { zh: '炒香了再下锅。', py: 'Chǎo xiāng le zài xià guō.', en: 'Fry it until fragrant before adding the rest.' }],
    scene: { zh: '闻到味道时说："什么这么香？"', en: 'Catching a smell: "what smells so good?"' }
  },
  '好吃': {
    note: { zh: '最常用的夸奖：味道好。', en: 'Delicious — the everyday compliment.' },
    ex: [{ zh: '太好吃了！', py: 'Tài hǎochī le!', en: 'That is so delicious!' },
         { zh: '这个菜真好吃。', py: 'Zhège cài zhēn hǎochī.', en: 'This dish is really tasty.' }],
    scene: { zh: '吃饭时最常说的一句，主人听了最开心。', en: 'The first thing to say at the table — it makes the host happiest.' }
  },
  '太辣了': {
    note: { zh: '辣得受不了。', en: 'Too spicy — more than I can take.' },
    ex: [{ zh: '太辣了，我要喝水。', py: 'Tài là le, wǒ yào hē shuǐ.', en: 'Too spicy — I need water.' },
         { zh: '这个菜太辣了，我吃不了。', py: 'Zhège cài tài là le, wǒ chī bù liǎo.', en: 'This dish is too hot for me.' }],
    scene: { zh: '点菜前先提醒："我不能吃太辣。"', en: 'Say it before ordering: "I cannot eat very spicy food."' }
  },
  '有点儿咸': {
    note: { zh: '咸了一点，比"太咸"委婉。', en: 'A bit salty — softer than saying "too salty."' },
    ex: [{ zh: '今天的菜有点儿咸。', py: 'Jīntiān de cài yǒudiǎnr xián.', en: 'The food today is a little salty.' },
         { zh: '有点儿咸，可以加点水。', py: 'Yǒudiǎnr xián, kěyǐ jiā diǎn shuǐ.', en: 'It is a bit salty — you could add some water.' }],
    scene: { zh: '温和地提意见时用，比"太咸了"客气。', en: 'Use it to complain politely.' }
  },
  '火候到位': {
    note: { zh: '火的大小和时间刚刚好。', en: 'The heat was exactly right.' },
    ex: [{ zh: '这道菜火候到位，肉很嫩。', py: 'Zhè dào cài huǒhou dàowèi, ròu hěn nèn.', en: 'This dish is cooked just right — the meat is tender.' },
         { zh: '火候不到位，肉就老了。', py: 'Huǒhou bú dàowèi, ròu jiù lǎo le.', en: 'Get the heat wrong and the meat turns tough.' }],
    scene: { zh: '夸厨师手艺时最专业的一句。', en: 'A professional-sounding compliment for the cook.' }
  },
  '巴适': {
    note: { zh: '四川话，意思是舒服、好、满意。', en: 'Bashi — Sichuan dialect for comfortable, good, just right.' },
    ex: [{ zh: '这碗面吃起巴适。', py: 'Zhè wǎn miàn chī qǐ bāshì.', en: 'This bowl of noodles hits the spot.' },
         { zh: '巴适得很！', py: 'Bāshì de hěn!', en: 'Absolutely perfect!' }],
    scene: { zh: '四川人的口头禅，夸好吃、夸日子舒服都能用。', en: 'A Sichuan catchphrase: for good food, a good day, anything pleasant.' }
  },

  /* ==================== 厨具 · 厨房 ==================== */
  '炒锅': {
    note: { zh: '炒菜用的锅，川菜多用圆底铁锅。', en: 'Wok — Sichuan cooking usually means a round-bottomed iron wok.' },
    ex: [{ zh: '炒锅要烧热再倒油。', py: 'Chǎoguō yào shāo rè zài dào yóu.', en: 'Heat the wok before pouring in the oil.' },
         { zh: '这口炒锅很顺手。', py: 'Zhè kǒu chǎoguō hěn shùnshǒu.', en: 'This wok handles nicely.' }],
    scene: { zh: '买锅时说："要一口炒锅。"', en: 'Shopping for cookware: "one wok, please."' }
  },
  '锅铲': {
    note: { zh: '炒菜用的铲子。', en: 'Spatula — the tool you stir the wok with.' },
    ex: [{ zh: '用锅铲轻轻推豆腐。', py: 'Yòng guōchǎn qīngqīng tuī dòufu.', en: 'Nudge the tofu gently with the spatula.' },
         { zh: '锅铲要用木头的，不伤锅。', py: 'Guōchǎn yào yòng mùtou de, bù shāng guō.', en: 'Use a wooden spatula so the wok does not get scratched.' }],
    scene: { zh: '在厨房找工具："锅铲在哪儿？"', en: 'Looking for tools: "where is the spatula?"' }
  },
  '菜刀': {
    note: { zh: '中式菜刀，切、剁、拍都能用。', en: 'Chinese cleaver — cuts, chops and crushes.' },
    ex: [{ zh: '菜刀要磨快一点。', py: 'Càidāo yào mó kuài yìdiǎn.', en: 'Sharpen the cleaver a bit.' },
         { zh: '用菜刀拍一下大蒜。', py: 'Yòng càidāo pāi yíxià dàsuàn.', en: 'Give the garlic a smack with the cleaver.' }],
    scene: { zh: '提醒安全："菜刀很锋利，小心。"', en: 'Safety warning: "the cleaver is sharp, be careful."' }
  },
  '砧板': {
    note: { zh: '切菜用的板子，木头或塑料的。', en: 'Chopping board — wood or plastic.' },
    ex: [{ zh: '生肉和蔬菜要用不同的砧板。', py: 'Shēng ròu hé shūcài yào yòng bùtóng de zhēnbǎn.', en: 'Raw meat and vegetables need separate boards.' },
         { zh: '砧板洗干净再切菜。', py: 'Zhēnbǎn xǐ gānjìng zài qiē cài.', en: 'Wash the board before you cut.' }],
    scene: { zh: '讲厨房卫生时常用。', en: 'Common when talking about kitchen hygiene.' }
  },
  '碗': {
    note: { zh: '吃饭、装汤的器皿。', en: 'Bowl — for rice, soup or mixing.' },
    ex: [{ zh: '拿一个碗来。', py: 'Ná yíge wǎn lái.', en: 'Bring me a bowl.' },
         { zh: '碗里放调料，调成碗汁。', py: 'Wǎn lǐ fàng tiáoliào, tiáo chéng wǎnzhī.', en: 'Mix the seasonings in a bowl to make a sauce.' }],
    scene: { zh: '说"再来一个碗"，或者做菜时的"碗底调味"。', en: 'Ask for another bowl, or talk about seasoning at the bottom of the bowl.' }
  },
  '盘子': {
    note: { zh: '装菜的平底器皿。', en: 'Plate — the flat dish you serve food on.' },
    ex: [{ zh: '把菜装进盘子里。', py: 'Bǎ cài zhuāng jìn pánzi lǐ.', en: 'Put the dish onto a plate.' },
         { zh: '这个盘子很好看。', py: 'Zhège pánzi hěn hǎokàn.', en: 'This plate is pretty.' }],
    scene: { zh: '上菜时说："拿个盘子。"', en: 'Serving up: "pass me a plate."' }
  },
  '筷子': {
    note: { zh: '吃饭用的两根小棍。', en: 'Chopsticks — two sticks for eating.' },
    ex: [{ zh: '我用筷子不太熟练。', py: 'Wǒ yòng kuàizi bú tài shúlian.', en: 'I am not very good with chopsticks yet.' },
         { zh: '请给我一双筷子。', py: 'Qǐng gěi wǒ yì shuāng kuàizi.', en: 'May I have a pair of chopsticks?' }],
    scene: { zh: '在餐厅说："再来一双筷子。"', en: 'At the restaurant: "another pair of chopsticks, please."' }
  },
  '漏勺': {
    note: { zh: '有孔的勺子，用来捞东西、沥水。', en: 'Slotted spoon — for lifting food out and draining it.' },
    ex: [{ zh: '用漏勺把面捞出来。', py: 'Yòng lòusháo bǎ miàn lāo chūlái.', en: 'Lift the noodles out with the slotted spoon.' },
         { zh: '用漏勺把油沥一下。', py: 'Yòng lòusháo bǎ yóu lì yíxià.', en: 'Use the slotted spoon to drain off the oil.' }],
    scene: { zh: '煮面、煮饺子时说："漏勺在哪儿？"', en: 'Boiling noodles or dumplings: "where is the slotted spoon?"' }
  },
  '蒸笼': {
    note: { zh: '竹编的蒸东西的笼子。', en: 'Bamboo steamer — a woven basket for steaming.' },
    ex: [{ zh: '蒸笼里蒸着包子。', py: 'Zhēnglóng lǐ zhēng zhe bāozi.', en: 'Buns are steaming in the basket.' },
         { zh: '蒸笼要用大火。', py: 'Zhēnglóng yào yòng dàhuǒ.', en: 'Steamers need high heat.' }],
    scene: { zh: '吃早茶、点"蒸笼"类小吃时会用到。', en: 'At dim sum or ordering steamed snacks.' }
  },
  '砂锅': {
    note: { zh: '陶做的锅，保温好，适合炖。', en: 'Clay pot — holds heat well, perfect for slow stewing.' },
    ex: [{ zh: '砂锅炖汤更香。', py: 'Shāguō dùn tāng gèng xiāng.', en: 'Soup tastes better stewed in a clay pot.' },
         { zh: '砂锅要用小火。', py: 'Shāguō yào yòng xiǎohuǒ.', en: 'Clay pots should be used on low heat.' }],
    scene: { zh: '点"砂锅米线""砂锅豆腐"时会看到。', en: 'You see it in clay-pot rice noodles and clay-pot tofu.' }
  },
  '油温': {
    note: { zh: '油热到什么程度，川菜里常说"三成热、七成热"。', en: 'Oil temperature — Sichuan cooks talk about it in tenths: three-tenths hot, seven-tenths hot.' },
    ex: [{ zh: '油温太高会糊。', py: 'Yóuwēn tài gāo huì hú.', en: 'Too high an oil temperature and it burns.' },
         { zh: '油温七成热就可以下锅。', py: 'Yóuwēn qī chéng rè jiù kěyǐ xià guō.', en: 'At seven-tenths hot it is ready for the food.' }],
    scene: { zh: '看菜谱、听讲解时最关键的一个词。', en: 'The key word when following a recipe or a video.' }
  },
  '火候': {
    note: { zh: '火的大小和时间，川菜的核心技术。', en: 'Heat control — how strong the flame is and how long it cooks; the heart of Sichuan cooking.' },
    ex: [{ zh: '火候不够，肉不熟。', py: 'Huǒhou bú gòu, ròu bù shú.', en: 'Not enough heat and the meat stays raw.' },
         { zh: '这道菜很考火候。', py: 'Zhè dào cài hěn kǎo huǒhou.', en: 'This dish really tests your heat control.' }],
    scene: { zh: '夸菜或说做菜技巧时常用。', en: 'Common when praising a dish or talking technique.' }
  },

  /* ==================== 文化 · 川味 ==================== */
  '川菜': {
    note: { zh: '四川菜，中国四大菜系之一，麻辣只是它的一部分。', en: 'Sichuan cuisine — one of China four great schools; spicy is only one part of it.' },
    ex: [{ zh: '川菜不只辣，也有很多清淡的菜。', py: 'Chuāncài bù zhǐ là, yě yǒu hěnduō qīngdàn de cài.', en: 'Sichuan food is not only spicy — there are many light dishes too.' },
         { zh: '我最喜欢川菜。', py: 'Wǒ zuì xǐhuan chuāncài.', en: 'Sichuan food is my favourite.' }],
    scene: { zh: '聊中国菜时最常用的一句。', en: 'The go-to when chatting about Chinese food.' }
  },
  '味型': {
    note: { zh: '川菜的味道类型，比如麻辣、鱼香、家常。', en: 'Flavour type — the category of taste, such as numbing-hot, fish-fragrant or home-style.' },
    ex: [{ zh: '川菜有二十多种味型。', py: 'Chuāncài yǒu èrshí duō zhǒng wèixíng.', en: 'Sichuan cooking has more than twenty flavour types.' },
         { zh: '鱼香是一个味型，不是一道菜。', py: 'Yúxiāng shì yíge wèixíng, bú shì yí dào cài.', en: 'Fish-fragrant is a flavour type, not a dish.' }],
    scene: { zh: '学习川菜文化、看讲解时用。', en: 'Useful in food-culture classes and documentaries.' }
  },
  '一菜一格，百菜百味': {
    note: { zh: '川菜的名言：每道菜有自己的风格，一百道菜有一百种味道。', en: 'A Sichuan saying: every dish has its own style, a hundred dishes have a hundred tastes.' },
    ex: [{ zh: '川菜讲究"一菜一格，百菜百味"。', py: 'Chuāncài jiǎngjiu yī cài yì gé, bǎi cài bǎi wèi.', en: 'Sichuan cooking lives by this saying.' },
         { zh: '这句话说明川菜不只是辣。', py: 'Zhè jù huà shuōmíng chuāncài bù zhǐshì là.', en: 'This saying shows Sichuan food is not only about heat.' }],
    scene: { zh: '介绍川菜文化时最好用的一句话。', en: 'The best line to use when introducing Sichuan cuisine.' }
  },
  '上河帮': {
    note: { zh: '川菜的一个流派，成都、乐山一带，口味比较温和精致。', en: 'Shanghe school — the Chengdu and Leshan style, milder and more refined.' },
    ex: [{ zh: '上河帮的菜比较清鲜。', py: 'Shànghébāng de cài bǐjiào qīngxiān.', en: 'The Shanghe school is lighter and fresher.' },
         { zh: '上河帮以成都为中心。', py: 'Shànghébāng yǐ Chéngdū wéi zhōngxīn.', en: 'The Shanghe school centres on Chengdu.' }],
    scene: { zh: '讲川菜文化、看纪录片时会听到。', en: 'You hear it in food documentaries and culture classes.' }
  },
  '下河帮': {
    note: { zh: '重庆一带的川菜流派，味道更重、更江湖。', en: 'Xiahe school — the Chongqing style, bolder and more rustic.' },
    ex: [{ zh: '下河帮的菜又辣又香。', py: 'Xiàhébāng de cài yòu là yòu xiāng.', en: 'Xiahe cooking is both hot and fragrant.' },
         { zh: '下河帮的代表是重庆江湖菜。', py: 'Xiàhébāng de dàibiǎo shì Chóngqìng jiānghúcài.', en: 'Its trademark is Chongqing s rugged street cooking.' }],
    scene: { zh: '同上，讲川菜流派时用。', en: 'Same context: talking about Sichuan cooking schools.' }
  },
  '小河帮': {
    note: { zh: '自贡的盐帮菜，善用椒麻、鲜辣。', en: 'Xiaohe school — Zigong salt-merchant cooking, strong on peppercorn numbness and fresh heat.' },
    ex: [{ zh: '小河帮擅长水煮、火爆。', py: 'Xiǎohébāng shàncháng shuǐzhǔ, huǒbào.', en: 'The Xiaohe school excels at poaching and fierce flash-frying.' },
         { zh: '小河帮的口味很重。', py: 'Xiǎohébāng de kǒuwèi hěn zhòng.', en: 'Xiaohe cooking has very strong flavours.' }],
    scene: { zh: '同上，提到自贡菜时会用。', en: 'Useful when talking about Zigong food.' }
  },
  '盖碗茶': {
    note: { zh: '四川的茶具：茶盖、茶碗、茶托三件。', en: 'Gaiwan tea — the Sichuan tea service: lid, bowl and saucer.' },
    ex: [{ zh: '在茶馆点一碗盖碗茶。', py: 'Zài cháguǎn diǎn yì wǎn gàiwǎnchá.', en: 'Order a bowl of gaiwan tea in a teahouse.' },
         { zh: '盖碗茶可以慢慢喝一下午。', py: 'Gàiwǎnchá kěyǐ mànman hē yí xiàwǔ.', en: 'You can sip gaiwan tea all afternoon.' }],
    scene: { zh: '去人民公园茶馆体验四川生活时用。', en: 'When you visit a teahouse to feel local life.' }
  },
  '摆龙门阵': {
    note: { zh: '四川话，意思是聊天、闲谈。', en: 'Sichuan dialect for chatting, shooting the breeze.' },
    ex: [{ zh: '他们坐在一起摆龙门阵。', py: 'Tāmen zuò zài yìqǐ bǎi lóngménzhèn.', en: 'They sat together chatting.' },
         { zh: '来，我们摆一下龙门阵。', py: 'Lái, wǒmen bǎi yíxià lóngménzhèn.', en: 'Come, let us have a good chat.' }],
    scene: { zh: '和四川朋友聊天时用，会很地道。', en: 'Use it with Sichuan friends and you sound local.' }
  },
  '火锅': {
    note: { zh: '四川的代表美食，一锅红汤自己涮。', en: 'Hotpot — Sichuan signature: one pot of red broth, you cook as you eat.' },
    ex: [{ zh: '我们晚上去吃火锅吧。', py: 'Wǒmen wǎnshang qù chī huǒguō ba.', en: 'Let us go for hotpot tonight.' },
         { zh: '四川火锅是麻辣的。', py: 'Sìchuān huǒguō shì málà de.', en: 'Sichuan hotpot is numbing and hot.' }],
    scene: { zh: '约饭必用的一句："一起吃火锅？"', en: 'The must-know invitation: "hotpot together?"' }
  },
  '小吃': {
    note: { zh: '正餐之外的小份食物，比如龙抄手、钟水饺。', en: 'Snacks — small eats outside main meals, like wontons and dumplings.' },
    ex: [{ zh: '成都有很多小吃。', py: 'Chéngdū yǒu hěnduō xiǎochī.', en: 'Chengdu has lots of snacks.' },
         { zh: '这些小吃都很好吃。', py: 'Zhèxiē xiǎochī dōu hěn hǎochī.', en: 'These snacks are all delicious.' }],
    scene: { zh: '逛宽窄巷子、锦里时说"尝尝小吃"。', en: 'While strolling Kuanzhai Alley: "let us try some snacks."' }
  },
  '干杯': {
    note: { zh: '举杯喝酒时的说法。', en: 'Cheers — said when raising your glass.' },
    ex: [{ zh: '干杯！', py: 'Gānbēi!', en: 'Cheers!' },
         { zh: '大家一起干杯。', py: 'Dàjiā yìqǐ gānbēi.', en: 'Let us all drink a toast.' }],
    scene: { zh: '聚餐、喝酒时说，也可以说"我以茶代酒"。', en: 'At dinners and toasts; you can also say "tea instead of wine."' }
  }
};
