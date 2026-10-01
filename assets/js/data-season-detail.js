/* 调料详解：点开调料卡后的弹窗内容（它是干什么的 / 什么时候用 / 例句）
   键必须和 data-core.js 里 CC.seasonings 的 zh 完全一致；用 work/check-season-detail.mjs 体检。 */
window.CC_SEASON_DETAIL = {
  '郫县豆瓣酱': {
    scene: { zh: '炒回锅肉、麻婆豆腐、水煮牛肉，第一步都是"炒出红油"。', en: 'The first step of twice-cooked pork, mapo tofu and boiled beef.' },
    ex: [{ zh: '锅里放一勺郫县豆瓣酱，小火炒出红油。', py: 'Guō lǐ fàng yì sháo Píxiàn dòubànjiàng, xiǎohuǒ chǎo chū hóngyóu.', en: 'One spoon of Pixian bean paste, fried gently until the oil turns red.' },
         { zh: '豆瓣酱先剁细，炒出来更香。', py: 'Dòubànjiàng xiān duò xì, chǎo chūlái gèng xiāng.', en: 'Chop the bean paste finer first — the aroma gets better.' }]
  },
  '花椒': {
    scene: { zh: '麻婆豆腐、水煮牛肉、椒麻鸡，出锅前都要撒花椒。', en: 'Sprinkled at the end for mapo tofu, boiled beef and pepper-scallion chicken.' },
    ex: [{ zh: '油热了先下花椒炝锅。', py: 'Yóu rè le xiān xià huājiāo qiàng guō.', en: 'When the oil is hot, blast the peppercorns first.' },
         { zh: '花椒炒香再磨成粉，麻香最好。', py: 'Huājiāo chǎo xiāng zài mó chéng fěn, má xiāng zuì hǎo.', en: 'Toast the peppercorns before grinding — the tingle is best that way.' }]
  },
  '干辣椒': {
    scene: { zh: '宫保鸡丁、干煸四季豆里，辣椒段不只是辣，是要"糊辣香"。', en: 'In kung-pao chicken the dried chilli is there for its toasted aroma, not just heat.' },
    ex: [{ zh: '干辣椒剪成段，抖掉辣椒籽。', py: 'Gān làjiāo jiǎn chéng duàn, dǒu diào làjiāo zǐ.', en: 'Snip the dried chillies into sections and shake out the seeds.' },
         { zh: '辣椒段别炒糊，糊了就发苦。', py: 'Làjiāo duàn bié chǎo hú, hú le jiù fā kǔ.', en: 'Do not burn the chilli sections — burnt means bitter.' }]
  },
  '辣椒面': {
    scene: { zh: '做红油、拌凉菜、配蘸水碟都要它。', en: 'For chilli oil, cold dishes and dipping sauces.' },
    ex: [{ zh: '辣椒面分两次泼油，颜色更红。', py: 'Làjiāomiàn fēn liǎng cì pō yóu, yánsè gèng hóng.', en: 'Pour the hot oil over the chilli powder in two goes for a redder colour.' },
         { zh: '一边泼油一边搅，才不糊。', py: 'Yìbiān pō yóu yìbiān jiǎo, cái bù hú.', en: 'Stir while pouring so it does not burn.' }]
  },
  '花椒粉': {
    scene: { zh: '麻婆豆腐、水煮牛肉上桌前撒的那一勺。', en: 'The final sprinkle on mapo tofu and boiled beef.' },
    ex: [{ zh: '出锅前撒一点花椒粉。', py: 'Chū guō qián sǎ yìdiǎn huājiāofěn.', en: 'Sprinkle a little ground pepper before serving.' },
         { zh: '花椒粉要现磨的才香。', py: 'Huājiāofěn yào xiàn mó de cái xiāng.', en: 'Grind it fresh — that is where the aroma is.' }]
  },
  '泡椒': {
    scene: { zh: '鱼香肉丝、泡椒鸡杂、泡椒牛肉的灵魂。', en: 'The soul of fish-fragrant pork and pickled-chilli dishes.' },
    ex: [{ zh: '泡椒剁碎，和姜蒜一起下锅。', py: 'Pàojiāo duò suì, hé jiāng suàn yìqǐ xià guō.', en: 'Chop the pickled chillies and fry them with ginger and garlic.' },
         { zh: '泡椒有点酸，炒出来才像"鱼香"。', py: 'Pàojiāo yǒudiǎn suān, chǎo chūlái cái xiàng "yúxiāng".', en: 'The sourness is what makes it taste "fish-fragrant".' }]
  },
  '豆豉': {
    scene: { zh: '麻婆豆腐、豆豉蒸排骨、回锅肉的"底香"。', en: 'The deep savoury base of mapo tofu, steamed ribs and twice-cooked pork.' },
    ex: [{ zh: '豆豉剁碎，和豆瓣一起炒香。', py: 'Dòuchǐ duò suì, hé dòubàn yìqǐ chǎo xiāng.', en: 'Chop the black beans and fry them with the bean paste.' },
         { zh: '豆豉有点咸，盐要少放。', py: 'Dòuchǐ yǒudiǎn xián, yán yào shǎo fàng.', en: 'Fermented beans are salty — go easy on the salt.' }]
  },
  '生抽': {
    scene: { zh: '几乎每道菜都用，腌肉时也用。', en: 'Used in almost everything, including marinades.' },
    ex: [{ zh: '腌肉加一勺生抽，肉更入味。', py: 'Yān ròu jiā yì sháo shēngchōu, ròu gèng rùwèi.', en: 'One spoon of light soy in the marinade seasons the meat through.' },
         { zh: '凉拌菜里生抽和醋是一对。', py: 'Liángbàn cài lǐ shēngchōu hé cù shì yí duì.', en: 'In cold dishes, light soy and vinegar are a pair.' }]
  },
  '老抽': {
    scene: { zh: '红烧、需要深色的菜，一勺就够。', en: 'Braised dishes that need a deep colour — one spoon is enough.' },
    ex: [{ zh: '加一勺老抽，颜色马上变深。', py: 'Jiā yì sháo lǎochōu, yánsè mǎshàng biàn shēn.', en: 'One spoon of dark soy and the colour deepens at once.' },
         { zh: '老抽别放多，会发黑发苦。', py: 'Lǎochōu bié fàng duō, huì fā hēi fā kǔ.', en: 'Too much dark soy turns the dish black and bitter.' }]
  },
  '香醋': {
    scene: { zh: '鱼香汁、糖醋味、凉拌、蘸碟。', en: 'Fish-fragrant sauce, sweet-and-sour dishes, cold dishes and dips.' },
    ex: [{ zh: '醋沿锅边淋，香而不冲。', py: 'Cù yán guōbiān lín, xiāng ér bú chòng.', en: 'Pour the vinegar down the side of the wok for aroma without harshness.' },
         { zh: '醋最后放，酸味才留得住。', py: 'Cù zuìhòu fàng, suānwèi cái liú de zhù.', en: 'Add vinegar last so the sourness stays.' }]
  },
  '白糖': {
    scene: { zh: '鱼香、糖醋、怪味，也用来压辣。', en: 'Fish-fragrant and sweet-sour dishes; it also tames chilli heat.' },
    ex: [{ zh: '一勺糖不是做甜菜，是和味。', py: 'Yì sháo táng bú shì zuò tián cài, shì hé wèi.', en: 'A spoon of sugar is not for sweetness — it balances the flavour.' },
         { zh: '觉得太辣，加一点糖就好了。', py: 'Juéde tài là, jiā yìdiǎn táng jiù hǎo le.', en: 'Too spicy? A little sugar fixes it.' }]
  },
  '料酒': {
    scene: { zh: '腌肉、炒肉、炖汤都用得上。', en: 'Marinades, stir-fried meat and soups.' },
    ex: [{ zh: '腌肉加一勺料酒去腥。', py: 'Yān ròu jiā yì sháo liàojiǔ qù xīng.', en: 'One spoon of cooking wine takes away the raw smell.' },
         { zh: '锅最热的时候放料酒，腥味跟着酒一起走。', py: 'Guō zuì rè de shíhou fàng liàojiǔ, xīngwèi gēnzhe jiǔ yìqǐ zǒu.', en: 'Add it when the pan is hottest — the smell leaves with the alcohol.' }]
  },
  '蚝油': {
    scene: { zh: '炒青菜、拌面、鱼香料汁里都有它。', en: 'Stir-fried greens, noodles and fish-fragrant sauce.' },
    ex: [{ zh: '炒青菜加一勺蚝油就很鲜。', py: 'Chǎo qīngcài jiā yì sháo háoyóu jiù hěn xiān.', en: 'One spoon makes stir-fried greens taste much savourier.' },
         { zh: '蚝油怕高温，出锅前放最好。', py: 'Háoyóu pà gāowēn, chū guō qián fàng zuì hǎo.', en: 'Oyster sauce dislikes high heat — add it just before serving.' }]
  },
  '淀粉': {
    scene: { zh: '腌肉上浆、鱼香汁、麻婆豆腐分次勾芡。', en: 'Velveting meat, fish-fragrant sauce, thickening mapo tofu.' },
    ex: [{ zh: '肉丝上浆，炒出来更嫩。', py: 'Ròusī shàng jiāng, chǎo chūlái gèng nèn.', en: 'Velvet the pork shreds and they stay tender.' },
         { zh: '麻婆豆腐要分两次勾芡。', py: 'Mápó dòufu yào fēn liǎng cì gōuqiàn.', en: 'Thicken mapo tofu in two stages.' }]
  },
  '食用油': {
    scene: { zh: '所有炒菜的第一步，油温决定香不香。', en: 'The first step of every stir-fry — the oil temperature decides the aroma.' },
    ex: [{ zh: '热锅凉油，肉就不粘锅。', py: 'Rè guō liáng yóu, ròu jiù bù zhān guō.', en: 'Hot wok, cool oil — the meat will not stick.' },
         { zh: '油温六成热，筷子下去有小泡泡。', py: 'Yóuwēn liù chéng rè, kuàizi xiàqù yǒu xiǎo pàopao.', en: 'At about 60% heat, chopsticks in the oil give small bubbles.' }]
  },
  '红油': {
    scene: { zh: '口水鸡、凉拌菜、凉面都靠它上色提香。', en: 'Cold dishes and noodles — colour and aroma.' },
    ex: [{ zh: '红油要香而不燥。', py: 'Hóngyóu yào xiāng ér bú zào.', en: 'Good chilli oil is fragrant without being harsh.' },
         { zh: '凉菜最后淋红油，颜色才亮。', py: 'Liángcài zuìhòu lín hóngyóu, yánsè cái liàng.', en: 'Drizzle it last so the colour stays bright.' }]
  },
  '芝麻': {
    scene: { zh: '凉菜、甜品、面点表面。', en: 'Cold dishes, sweets and breads.' },
    ex: [{ zh: '撒一把熟芝麻，香味就上来了。', py: 'Sǎ yì bǎ shú zhīma, xiāngwèi jiù shànglái le.', en: 'A handful of toasted sesame lifts the aroma.' },
         { zh: '芝麻要炒香再撒，生的不香。', py: 'Zhīma yào chǎo xiāng zài sǎ, shēng de bù xiāng.', en: 'Toast them first — raw sesame has no aroma.' }]
  },
  '芝麻酱': {
    scene: { zh: '担担面、凉面、北方火锅蘸碟。', en: 'Dan dan noodles, cold noodles and dipping sauces.' },
    ex: [{ zh: '芝麻酱用香油澥开更香。', py: 'Zhīmajiàng yòng xiāngyóu xiè kāi gèng xiāng.', en: 'Loosen the sesame paste with sesame oil for more aroma.' },
         { zh: '芝麻酱太稠，加一点温水。', py: 'Zhīmajiàng tài chóu, jiā yìdiǎn wēnshuǐ.', en: 'If it is too thick, add a little warm water.' }]
  },
  '甜面酱': {
    scene: { zh: '京酱肉丝、蘸酱菜、烤鸭。', en: 'Shredded pork with sweet-bean sauce, dips and roast duck.' },
    ex: [{ zh: '甜面酱先炒一下，酱香才出来。', py: 'Tiánmiànjiàng xiān chǎo yíxià, jiàng xiāng cái chūlái.', en: 'Fry the sweet-bean sauce briefly to wake up its aroma.' },
         { zh: '甜面酱有点咸，别放太多。', py: 'Tiánmiànjiàng yǒudiǎn xián, bié fàng tài duō.', en: 'It is salty — do not overdo it.' }]
  },
  '芽菜': {
    scene: { zh: '芽菜肉末、担担面、干煸四季豆。', en: 'Minced pork with preserved greens, dan dan noodles, dry-fried beans.' },
    ex: [{ zh: '芽菜先洗一洗，不然太咸。', py: 'Yácài xiān xǐ yì xǐ, bùrán tài xián.', en: 'Rinse the preserved greens first — otherwise it is too salty.' },
         { zh: '芽菜切碎一点，炒出来更香。', py: 'Yácài qiē suì yìdiǎn, chǎo chūlái gèng xiāng.', en: 'Chop it small — it fries better that way.' }]
  },
  '蒜末': {
    scene: { zh: '炒菜爆香、凉拌、蘸碟。', en: 'Stir-fry aromatics, cold dishes and dips.' },
    ex: [{ zh: '蒜末和姜末一起下锅。', py: 'Suànmò hé jiāngmò yìqǐ xià guō.', en: 'Garlic and ginger go into the wok together.' },
         { zh: '蒜末后放，蒜香更冲。', py: 'Suànmò hòu fàng, suàn xiāng gèng chòng.', en: 'Add garlic later for a sharper hit.' }]
  },
  '姜末': {
    scene: { zh: '鱼香味、炒肉、蒸鱼。', en: 'Fish-fragrant dishes, stir-fried meat, steamed fish.' },
    ex: [{ zh: '姜末先下锅炒香。', py: 'Jiāngmò xiān xià guō chǎo xiāng.', en: 'Ginger goes in first to build the aroma.' },
         { zh: '姜末和蒜末是"一对好搭档"。', py: 'Jiāngmò hé suànmò shì "yí duì hǎo dādàng".', en: 'Ginger and garlic are a classic pair.' }]
  },
  '葱花': {
    scene: { zh: '汤、面、炒菜出锅前都用。', en: 'Soups, noodles and stir-fries, right at the end.' },
    ex: [{ zh: '出锅前撒一把葱花。', py: 'Chū guō qián sǎ yì bǎ cōnghuā.', en: 'Scatter a handful of scallion before serving.' },
         { zh: '葱白先下锅，葱绿最后撒。', py: 'Cōngbái xiān xià guō, cōnglǜ zuìhòu sǎ.', en: 'The white part fries first; the green goes on last.' }]
  },
  '盐': {
    scene: { zh: '所有菜，尤其是汤和素菜。', en: 'Everything, especially soups and vegetable dishes.' },
    ex: [{ zh: '盐最后放，先尝一下。', py: 'Yán zuìhòu fàng, xiān cháng yíxià.', en: 'Salt last — taste first.' },
         { zh: '汤淡了再加盐，一次放多就没法救。', py: 'Tāng dàn le zài jiā yán, yícì fàng duō jiù méi fǎ jiù.', en: 'Add salt gradually; oversalting cannot be undone.' }]
  },
  '鸡精': {
    scene: { zh: '汤菜、炒菜最后调味（不放也可以）。', en: 'Soups and stir-fries at the end — optional.' },
    ex: [{ zh: '半勺鸡精就能提鲜。', py: 'Bàn sháo jījīng jiù néng tí xiān.', en: 'Half a spoon lifts the savouriness.' },
         { zh: '鸡精别放多，会盖住菜本身的味道。', py: 'Jījīng bié fàng duō, huì gàizhù cài běnshēn de wèidào.', en: 'Too much masks the dish itself.' }]
  },
  '牛油': {
    scene: { zh: '重庆火锅、牛油火锅底料。', en: 'Chongqing hotpot and beef-tallow bases.' },
    ex: [{ zh: '牛油锅底香，但凉了会凝。', py: 'Niúyóu guōdǐ xiāng, dàn liáng le huì níng.', en: 'Tallow bases smell wonderful but set when cold.' },
         { zh: '牛油要先化开再下香料。', py: 'Niúyóu yào xiān huà kāi zài xià xiāngliào.', en: 'Melt the tallow before adding the spices.' }]
  },
  '辣椒油': {
    scene: { zh: '面、饺子蘸碟、凉皮。', en: 'Noodles, dumpling dips and cold noodles.' },
    ex: [{ zh: '吃面加一勺辣椒油。', py: 'Chī miàn jiā yì sháo làjiāoyóu.', en: 'One spoon of chilli oil in a bowl of noodles.' },
         { zh: '辣椒油要先摇匀再用。', py: 'Làjiāoyóu yào xiān yáoyún zài yòng.', en: 'Shake it before you pour.' }]
  },
  '孜然粉': {
    scene: { zh: '冷吃牛肉、烤串、干煸菜，出锅前撒一点最香。', en: 'Cold-eaten beef, skewers and dry-fried dishes — best sprinkled at the end.' },
    ex: [{ zh: '出锅前撒一勺孜然粉，香味一下就出来了。', py: 'Chū guō qián sǎ yì sháo zīránfěn, xiāngwèi yíxià jiù chūlái le.', en: 'One spoon of cumin powder before serving and the aroma jumps out.' },
         { zh: '孜然粉怕高温，最后放。', py: 'Zīránfěn pà gāowēn, zuìhòu fàng.', en: 'Cumin powder dislikes high heat — add it last.' }]
  }
};
