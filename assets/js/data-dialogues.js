/* 情景对话数据（2026-10-02 新增，论文创新点）。
   结构：window.CC_DIALOGUES[菜id] = {
     prep : { zh, py, en }          备菜 · 砧板那一步的一句指令短语
     steps: [{zh, py, en}, ×8]     上灶每一步下方的"师傅指令句"，短句口语化，和步骤一一对应
     talk : { scene, lines: [{ who, tag, zh, py, en }] }
                                   一道菜做完全部步骤后出现的"上桌 · 开口"对话卡
   }
   who: 'student' = 学员（左）｜'chef' = 厨师（右）
   tag: 六类交际功能之一 —— 点单与推荐 / 询价与数量 / 口味与忌口 / 操作指令 / 过程询问 / 评价与介绍
   目前只做了麻婆豆腐这一道样板，其余 7 道按同样结构补。 */
window.CC_DIALOGUES = {
  mapo: {
    prep: {
      zh: '先把豆腐切成 1.5 厘米见方的小块，泡十分钟淡盐水。',
      py: 'Xiān bǎ dòufu qiē chéng yī diǎn wǔ límǐ de xiǎo kuài, pào shí fēnzhōng dàn yánshuǐ.',
      en: 'First cut the tofu into 1.5 cm cubes and soak them in light brine for ten minutes.'
    },
    steps: [
      {
        zh: '中火，油别太热；油面起小纹就下肉末。',
        py: 'Zhōnghuǒ, yóu bié tài rè; yóu miàn qǐ xiǎo wén jiù xià ròumò.',
        en: 'Medium heat — when the oil shows small ripples, add the mince.'
      },
      {
        zh: '肉末先下，快炒散，炒到干香。',
        py: 'Ròumò xiān xià, kuài chǎo sàn, chǎo dào gānxiāng.',
        en: 'The mince goes in first: break it up fast and fry until dry and fragrant.'
      },
      {
        zh: '转中火，豆瓣酱慢慢炒，等红油冒出来。',
        py: 'Zhuǎn zhōnghuǒ, dòubànjiàng màn man chǎo, děng hóngyóu mào chūlái.',
        en: 'Turn to medium and fry the bean paste slowly until red oil surfaces.'
      },
      {
        zh: '姜末、蒜末、辣椒面各一小勺，别贪多。',
        py: 'Jiāngmò, suànmò, làjiāomiàn gè yì xiǎosháo, bié tān duō.',
        en: 'One small spoon each of ginger, garlic and chili flakes — don\'t overdo it.'
      },
      {
        zh: '倒高汤，放豆腐，转小火盖盖烧三分钟。',
        py: 'Dào gāotāng, fàng dòufu, zhuǎn xiǎohuǒ gài gài shāo sān fēnzhōng.',
        en: 'Add stock and tofu, turn to low, cover and simmer for three minutes.'
      },
      {
        zh: '水淀粉分两三次淋，芡才薄薄挂得住。',
        py: 'Shuǐdiànfěn fēn liǎng sān cì lín, qiàn cái báo báo guà de zhù.',
        en: 'Add the starch water in two or three rounds so the sauce clings lightly.'
      },
      {
        zh: '用锅铲轻轻推，别翻——豆腐怕碎。',
        py: 'Yòng guōchǎn qīng qīng tuī, bié fān — dòufu pà suì.',
        en: 'Push gently with the spatula, do not flip — tofu breaks easily.'
      },
      {
        zh: '关火，花椒粉最后撒，趁烫上桌。',
        py: 'Guān huǒ, huājiāofěn zuìhòu sǎ, chèn tàng shàng zhuō.',
        en: 'Turn off the heat, sprinkle the pepper powder last and serve it scalding hot.'
      }
    ],
    talk: {
      scene: '在成都一家小馆子，学员点了一道麻婆豆腐，站在灶边看师傅做。',
      lines: [
        { who: 'student', tag: '点单与推荐', zh: '老板，你们这儿有什么特色菜？',
          py: 'Lǎobǎn, nǐmen zhèr yǒu shénme tèsè cài?', en: 'Boss, what is your signature dish?' },
        { who: 'chef', tag: '点单与推荐', zh: '麻婆豆腐是我们的招牌，成都的老味道。',
          py: 'Má pó dòufu shì wǒmen de zhāopai, Chéngdū de lǎo wèidào.', en: 'Mapo tofu is our signature — the old Chengdu taste.' },
        { who: 'student', tag: '口味与忌口', zh: '这个辣不辣？我不太能吃辣。',
          py: 'Zhège là bu là? Wǒ bú tài néng chī là.', en: 'Is it spicy? I cannot take much heat.' },
        { who: 'chef', tag: '口味与忌口', zh: '可以少放辣椒，"麻"一定留着——那才是它的灵魂。',
          py: 'Kěyǐ shǎo fàng làjiāo, "má" yídìng liúzhe — nà cái shì tā de línghún.', en: 'We can use less chili, but keep the numbing — that is its soul.' },
        { who: 'student', tag: '询价与数量', zh: '多少钱一份？够两个人吃吗？',
          py: 'Duōshao qián yí fèn? Gòu liǎng ge rén chī ma?', en: 'How much is one portion? Is it enough for two people?' },
        { who: 'chef', tag: '询价与数量', zh: '二十八块一份；两个人再点个青菜就正好。',
          py: 'Èrshíbā kuài yí fèn; liǎng ge rén zài diǎn ge qīngcài jiù zhènghǎo.', en: 'Twenty-eight yuan a portion; with a green vegetable it is just right for two.' },
        { who: 'chef', tag: '操作指令', zh: '看好了：先把豆腐切成小块，别切太碎。',
          py: 'Kànhǎo le: xiān bǎ dòufu qiē chéng xiǎo kuài, bié qiē tài suì.', en: 'Watch closely: cut the tofu into small cubes, not too fine.' },
        { who: 'student', tag: '过程询问', zh: '现在可以放盐了吗？还要等多久？',
          py: 'Xiànzài kěyǐ fàng yán le ma? Háiyào děng duōjiǔ?', en: 'Can I add the salt now? How much longer?' },
        { who: 'chef', tag: '过程询问', zh: '再烧三分钟，最后撒花椒粉，趁烫吃。',
          py: 'Zài shāo sān fēnzhōng, zuìhòu sǎ huājiāofěn, chèn tàng chī.', en: 'Three more minutes, then sprinkle the pepper powder and eat it scalding hot.' },
        /* 先由学员开口问来历，厨师再讲——不能自己把文化故事倒出来 */
        { who: 'student', tag: '评价与介绍', zh: '这个太好吃了！这道菜有什么来历吗？',
          py: 'Zhège tài hǎochī le! Zhè dào cài yǒu shénme láilì ma?', en: 'This is delicious! Does this dish have a story?' },
        { who: 'chef', tag: '评价与介绍', zh: '有一百多年了。万福桥边有位陈婆婆，用挑夫自带的豆腐和一点牛肉炒出来，麻辣烫香、酥嫩鲜活，后来就叫开了。',
          py: 'Yǒu yìbǎi duō nián le. Wànfúqiáo biān yǒu wèi Chén pópo, yòng tiāofū zìdài de dòufu hé yìdiǎn niúròu chǎo chūlái, má là tàng xiāng, sū nèn xiān huó, hòulái jiù jiào kāi le.', en: 'Over a century. A Granny Chen by the Wanfu Bridge cooked it with the tofu the porters carried and a little beef — numbing, hot, scalding, crisp, tender, fresh and alive. The name stuck.' }
      ]
    }
  },

  gongbao: {
    prep: {
      zh: '鸡腿肉去骨切丁，姜蒜切片、葱切段，花生米单独放。',
      py: 'Jītuǐròu qù gǔ qiē dīng, jiāng suàn qiē piàn, cōng qiē duàn, huāshēngmǐ dāndú fàng.',
      en: 'Debone the chicken thigh and dice it; slice ginger and garlic, section the scallion, keep the peanuts separate.'
    },
    steps: [
      { zh: '鸡腿肉去骨切丁，姜蒜切片、葱切段，干辣椒剪段，花生米单放。',
        py: 'Jītuǐròu qù gǔ qiē dīng, jiāng suàn qiē piàn, cōng qiē duàn, gānlàjiāo jiǎn duàn, huāshēngmǐ dān fàng.',
        en: 'Dice the thigh, slice the aromatics, section the scallion, snip the dried chilies, keep the peanuts aside.' },
      { zh: '腌肉：一勺半黄酒、一勺盐、淀粉和清水，抓到发黏。',
        py: 'Yān ròu: yì sháo bàn huángjiǔ, yì sháo yán, diànfěn hé qīngshuǐ, zhuā dào fā nián.',
        en: 'Marinate: 1.5 spoons rice wine, 1 spoon salt, starch and water — rub until sticky.' },
      { zh: '油热先炸花椒，微微变色就捞出来。',
        py: 'Yóu rè xiān zhá huājiāo, wēiwēi biànsè jiù lāo chūlái.',
        en: 'Fry the Sichuan pepper first and lift it out as soon as it colours.' },
      { zh: '再下干辣椒段，变色就捞出，和花椒放在一起。',
        py: 'Zài xià gānlàjiāo duàn, biànsè jiù lāo chū, hé huājiāo fàng zài yìqǐ.',
        en: 'Then the chili sections — lift them out and keep them with the pepper.' },
      { zh: '转大火，鸡丁和姜蒜一起下锅翻炒。',
        py: 'Zhuǎn dàhuǒ, jīdīng hé jiāng suàn yìqǐ xià guō fānchǎo.',
        en: 'Turn to high heat, add the chicken with the ginger and garlic and stir-fry.' },
      { zh: '不停翻炒，炒到鸡丁两面金黄。',
        py: 'Bù tíng fānchǎo, chǎo dào jīdīng liǎng miàn jīnhuáng.',
        en: 'Keep tossing until the chicken is golden on both sides.' },
      { zh: '倒料汁，再下葱段、花生米和炸好的辣椒花椒。',
        py: 'Dào liàozhī, zài xià cōngduàn, huāshēngmǐ hé zhà hǎo de làjiāo huājiāo.',
        en: 'Pour in the sauce, then add the scallion, peanuts and the fried chili and pepper.' },
      { zh: '大火把汁收浓，裹满鸡丁就关火装盘。',
        py: 'Dàhuǒ bǎ zhī shōu nóng, guǒ mǎn jīdīng jiù guān huǒ zhuāngpán.',
        en: 'Reduce the sauce over high heat until it coats the chicken, then plate it.' }
    ],
    talk: {
      scene: '学员在成都一家小馆子点宫保鸡丁，站在灶边看师傅做。',
      lines: [
        { who: 'student', tag: '点单与推荐', zh: '老板，你们这儿有什么特色菜？',
          py: 'Lǎobǎn, nǐmen zhèr yǒu shénme tèsè cài?', en: 'Boss, what is your signature dish?' },
        { who: 'chef', tag: '点单与推荐', zh: '宫保鸡丁点得最多，酸甜里带一点辣。',
          py: 'Gōngbǎo jīdīng diǎn de zuì duō, suān tián lǐ dài yìdiǎn là.', en: 'Kung Pao chicken is the most ordered — sweet and sour with a little heat.' },
        { who: 'student', tag: '口味与忌口', zh: '我怕太辣，能少放辣椒吗？',
          py: 'Wǒ pà tài là, néng shǎo fàng làjiāo ma?', en: 'I am afraid of too much heat — can you use less chili?' },
        { who: 'chef', tag: '口味与忌口', zh: '可以。这道菜讲究的是"糊辣"的香，不是死辣。',
          py: 'Kěyǐ. Zhè dào cài jiǎngjiu de shì "húlà" de xiāng, bú shì sǐ là.', en: 'Sure. The point is the toasted-chili aroma, not brute heat.' },
        { who: 'student', tag: '询价与数量', zh: '多少钱一份？够两个人吃吗？',
          py: 'Duōshao qián yí fèn? Gòu liǎng ge rén chī ma?', en: 'How much is a portion? Is it enough for two?' },
        { who: 'chef', tag: '询价与数量', zh: '三十二块一份，两个人再点个素菜刚好。',
          py: 'Sānshí\'èr kuài yí fèn, liǎng ge rén zài diǎn ge sùcài gānghǎo.', en: 'Thirty-two yuan; with a vegetable dish it is just right for two.' },
        { who: 'chef', tag: '操作指令', zh: '看好了：鸡丁先抓匀腌上，花生米一定最后放。',
          py: 'Kànhǎo le: jīdīng xiān zhuā yún yān shàng, huāshēngmǐ yídìng zuìhòu fàng.', en: 'Watch: marinate the chicken first, and the peanuts always go in last.' },
        { who: 'student', tag: '过程询问', zh: '现在可以倒料汁了吗？',
          py: 'Xiànzài kěyǐ dào liàozhī le ma?', en: 'Can I pour the sauce in now?' },
        { who: 'chef', tag: '过程询问', zh: '等鸡丁两面金黄再倒，一次倒完、大火收汁。',
          py: 'Děng jīdīng liǎng miàn jīnhuáng zài dào, yí cì dào wán, dàhuǒ shōu zhī.', en: 'Wait until the chicken is golden, then pour it all in and reduce over high heat.' },
        { who: 'student', tag: '评价与介绍', zh: '又酸又甜又香！"宫保"是什么意思？',
          py: 'Yòu suān yòu tián yòu xiāng! "Gōngbǎo" shì shénme yìsi?', en: 'Sour, sweet and fragrant! What does "gongbao" mean?' },
        { who: 'chef', tag: '评价与介绍', zh: '"宫保"是官衔。清朝丁宝桢当过四川总督，朝廷封他"太子少保"，家厨做的这道鸡丁就叫开了。',
          py: '"Gōngbǎo" shì guānxián. Qīngcháo Dīng Bǎozhēn dāngguo Sìchuān zǒngdū, cháotíng fēng tā "Tàizǐ Shǎobǎo", jiāchú zuò de zhè dào jīdīng jiù jiào kāi le.', en: '"Gongbao" is a title. Ding Baozhen was governor of Sichuan in the Qing dynasty and was granted the title Junior Guardian; his family cook\'s chicken dish took the name.' }
      ]
    }
  },

  huiguo: {
    prep: {
      zh: '二刀肉先煮到八分熟，放凉再切成薄片。',
      py: 'Èrdāoròu xiān zhǔ dào bā fēn shú, fàng liáng zài qiē chéng báo piàn.',
      en: 'Boil the pork to eight-tenths done, cool it, then slice it thin.'
    },
    steps: [
      { zh: '锅里只放一点点油，下肉片，中火慢煸。',
        py: 'Guō lǐ zhǐ fàng yìdiǎndiǎn yóu, xià ròupiàn, zhōnghuǒ màn biān.',
        en: 'Only a little oil — add the pork slices and render them over medium heat.' },
      { zh: '慢慢煸，等肉片卷成"小灯盏"、锅里油变清亮。',
        py: 'Màn man biān, děng ròupiàn juǎn chéng "xiǎo dēngzhǎn", guō lǐ yóu biàn qīngliàng.',
        en: 'Keep rendering until the slices curl like little lamp-cups and the oil runs clear.' },
      { zh: '下郫县豆瓣，炒出红油。',
        py: 'Xià Píxiàn dòubàn, chǎo chū hóngyóu.',
        en: 'Add Pixian bean paste and fry until red oil appears.' },
      { zh: '再加一点豆豉，提甜香。',
        py: 'Zài jiā yìdiǎn dòuchǐ, tí tiánxiāng.',
        en: 'Add a little fermented black bean for a sweet, savoury note.' },
      { zh: '转大火，下蒜苗，快速炒到断生。',
        py: 'Zhuǎn dàhuǒ, xià suànmiáo, kuàisù chǎo dào duànshēng.',
        en: 'Turn to high heat, add the garlic sprouts and stir-fry until just done.' },
      { zh: '快速翻炒，让蒜苗和肉片拌匀。',
        py: 'Kuàisù fānchǎo, ràng suànmiáo hé ròupiàn bàn yún.',
        en: 'Toss quickly so the sprouts and pork are evenly mixed.' },
      { zh: '最后少放一点盐——豆瓣和豆豉本身有咸味。',
        py: 'Zuìhòu shǎo fàng yìdiǎn yán — dòubàn hé dòuchǐ běnshēn yǒu xiánwèi.',
        en: 'Only a little salt at the end — the bean paste and black bean are already salty.' },
      { zh: '闻到香味了！出锅装盘，配一碗米饭。',
        py: 'Wéndào xiāngwèi le! Chūguō zhuāngpán, pèi yì wǎn mǐfàn.',
        en: 'Once it smells right, plate it up with a bowl of rice.' }
    ],
    talk: {
      scene: '学员想点一道最下饭的川菜，师傅推荐了回锅肉。',
      lines: [
        { who: 'student', tag: '点单与推荐', zh: '老板，有什么下饭的菜？',
          py: 'Lǎobǎn, yǒu shénme xiàfàn de cài?', en: 'Boss, what goes best with rice?' },
        { who: 'chef', tag: '点单与推荐', zh: '回锅肉，四川人的"家常第一菜"。',
          py: 'Huíguōròu, Sìchuān rén de "jiācháng dì yī cài".', en: 'Twice-cooked pork — Sichuan\'s number one home dish.' },
        { who: 'student', tag: '口味与忌口', zh: '这个辣不辣？',
          py: 'Zhège là bu là?', en: 'Is it spicy?' },
        { who: 'chef', tag: '口味与忌口', zh: '家常味，香辣但不冲；不吃辣我可以少放豆瓣。',
          py: 'Jiācháng wèi, xiāng là dàn bú chòng; bù chī là wǒ kěyǐ shǎo fàng dòubàn.', en: 'Home-style — fragrant, not aggressive; I can go easy on the bean paste.' },
        { who: 'student', tag: '询价与数量', zh: '多少钱一份？两个人够吗？',
          py: 'Duōshao qián yí fèn? Liǎng ge rén gòu ma?', en: 'How much is a portion? Enough for two?' },
        { who: 'chef', tag: '询价与数量', zh: '三十块一份，配米饭两个人正好。',
          py: 'Sānshí kuài yí fèn, pèi mǐfàn liǎng ge rén zhènghǎo.', en: 'Thirty yuan; with rice it is just right for two.' },
        { who: 'chef', tag: '操作指令', zh: '记住：肉先煮到八分熟、放凉再切，片要薄。',
          py: 'Jìzhù: ròu xiān zhǔ dào bā fēn shú, fàng liáng zài qiē, piàn yào báo.', en: 'Remember: boil to eight-tenths, cool, then slice thin.' },
        { who: 'student', tag: '过程询问', zh: '煸到什么程度算好？',
          py: 'Biān dào shénme chéngdù suàn hǎo?', en: 'How do I know when it is ready?' },
        { who: 'chef', tag: '过程询问', zh: '肉片卷起来像小灯盏，锅里油变清亮，就对了。',
          py: 'Ròupiàn juǎn qǐlái xiàng xiǎo dēngzhǎn, guō lǐ yóu biàn qīngliàng, jiù duì le.', en: 'When the slices curl like little lamp-cups and the oil runs clear, it is right.' },
        { who: 'student', tag: '评价与介绍', zh: '太香了！为什么叫"回锅"？',
          py: 'Tài xiāng le! Wèishénme jiào "huíguō"?', en: 'So fragrant! Why is it called "back to the wok"?' },
        { who: 'chef', tag: '评价与介绍', zh: '一煮、二切、三回锅——先煮好，再回锅里炒一次，所以叫回锅肉。',
          py: 'Yì zhǔ, èr qiē, sān huíguō — xiān zhǔ hǎo, zài huí guō lǐ chǎo yí cì, suǒyǐ jiào huíguōròu.', en: 'Boil, slice, then fry again — the pork returns to the wok, hence the name.' }
      ]
    }
  },

  yuxiang: {
    prep: {
      zh: '里脊、木耳、胡萝卜、青椒都切细丝，粗细要一样。',
      py: 'Lǐjǐ, mù\'ěr, húluóbo, qīngjiāo dōu qiē xì sī, cūxì yào yíyàng.',
      en: 'Cut the pork, wood ear, carrot and green pepper into thin, even shreds.'
    },
    steps: [
      { zh: '胡萝卜、青椒、木耳都切成和肉丝一样粗细的丝。',
        py: 'Húluóbo, qīngjiāo, mù\'ěr dōu qiē chéng hé ròusī yíyàng cūxì de sī.',
        en: 'Shred the carrot, pepper and wood ear to match the pork.' },
      { zh: '腌肉丝：一勺生抽、一勺黄酒、一勺淀粉，抓匀。',
        py: 'Yān ròusī: yì sháo shēngchōu, yì sháo huángjiǔ, yì sháo diànfěn, zhuā yún.',
        en: 'Marinate the pork: one spoon each of light soy, rice wine and starch.' },
      { zh: '调鱼香料汁：两勺生抽、一勺老抽、一勺醋、一勺蚝油、大半勺糖、一勺淀粉。',
        py: 'Tiáo yúxiāng liàozhī: liǎng sháo shēngchōu, yì sháo lǎochōu, yì sháo cù, yì sháo hàoyóu, dà bàn sháo táng, yì sháo diànfěn.',
        en: 'Mix the sauce: 2 spoons light soy, 1 dark soy, 1 vinegar, 1 oyster sauce, 2/3 spoon sugar, 1 starch.' },
      { zh: '锅烧热倒油，先下蒜末和葱花炒香。',
        py: 'Guō shāo rè dào yóu, xiān xià suànmò hé cōnghuā chǎo xiāng.',
        en: 'Heat the wok, add oil and fry the garlic and scallion until fragrant.' },
      { zh: '下肉丝，快速划散，肉丝一变白就行。',
        py: 'Xià ròusī, kuàisù huásàn, ròusī yí biàn bái jiù xíng.',
        en: 'Add the pork and break it apart fast; as soon as it turns white it is done.' },
      { zh: '倒入胡萝卜丝、青椒丝和木耳丝。',
        py: 'Dào rù húluóbo sī, qīngjiāo sī hé mù\'ěr sī.',
        en: 'Add the shredded carrot, pepper and wood ear.' },
      { zh: '最后倒入鱼香料汁。',
        py: 'Zuìhòu dào rù yúxiāng liàozhī.',
        en: 'Finally pour in the fish-fragrant sauce.' },
      { zh: '大火翻炒均匀，装盘开吃！',
        py: 'Dàhuǒ fānchǎo jūnyún, zhuāngpán kāi chī!',
        en: 'Toss over high heat and serve.' }
    ],
    talk: {
      scene: '学员第一次听说"鱼香肉丝"，忍不住问师傅这道菜里到底有没有鱼。',
      lines: [
        { who: 'student', tag: '点单与推荐', zh: '有什么招牌菜推荐吗？',
          py: 'Yǒu shénme zhāopai cài tuījiàn ma?', en: 'Any signature dish you would recommend?' },
        { who: 'chef', tag: '点单与推荐', zh: '鱼香肉丝，酸甜微辣，外国朋友都很喜欢。',
          py: 'Yúxiāng ròusī, suān tián wēi là, wàiguó péngyou dōu hěn xǐhuan.', en: 'Fish-fragrant pork — sweet, sour, a little hot; visitors love it.' },
        { who: 'student', tag: '口味与忌口', zh: '"鱼香"里面有鱼吗？我不吃鱼。',
          py: '"Yúxiāng" lǐmiàn yǒu yú ma? Wǒ bù chī yú.', en: 'Does "fish-fragrant" contain fish? I do not eat fish.' },
        { who: 'chef', tag: '口味与忌口', zh: '没有鱼。那是四川人烧鱼用的泡椒、姜葱蒜加糖醋，说的是味道。',
          py: 'Méiyǒu yú. Nà shì Sìchuān rén shāo yú yòng de pàojiāo, jiāng cōng suàn jiā táng cù, shuō de shì wèidào.', en: 'No fish — it is the pickle-chili, aromatics and sweet-sour used for braising fish. It describes the flavour.' },
        { who: 'student', tag: '询价与数量', zh: '多少钱一份？一个人吃得完吗？',
          py: 'Duōshao qián yí fèn? Yí ge rén chī de wán ma?', en: 'How much is a portion? Can one person finish it?' },
        { who: 'chef', tag: '询价与数量', zh: '三十块一份，一个人吃正好，两个人再点一个菜。',
          py: 'Sānshí kuài yí fèn, yí ge rén chī zhènghǎo, liǎng ge rén zài diǎn yí ge cài.', en: 'Thirty yuan; fine for one, and for two add another dish.' },
        { who: 'chef', tag: '操作指令', zh: '看好了：所有材料都切丝，粗细要一样，炒出来才匀。',
          py: 'Kànhǎo le: suǒyǒu cáiliào dōu qiē sī, cūxì yào yíyàng, chǎo chūlái cái yún.', en: 'Watch: shred everything to the same thickness so it cooks evenly.' },
        { who: 'student', tag: '过程询问', zh: '肉丝下锅要炒多久？',
          py: 'Ròusī xià guō yào chǎo duōjiǔ?', en: 'How long do I fry the pork?' },
        { who: 'chef', tag: '过程询问', zh: '快速划散，肉丝一变色就下配菜，别炒老。',
          py: 'Kuàisù huásàn, ròusī yí biànsè jiù xià pèicài, bié chǎo lǎo.', en: 'Break it apart fast — as soon as it changes colour add the vegetables.' },
        { who: 'student', tag: '评价与介绍', zh: '没有鱼却有鱼香，太有意思了！这道菜的来历是什么？',
          py: 'Méiyǒu yú què yǒu yú xiāng, tài yǒu yìsi le! Zhè dào cài de láilì shì shénme?', en: 'No fish but fish fragrance — fascinating! Where does the name come from?' },
        { who: 'chef', tag: '评价与介绍', zh: '这是四川人做鱼的老调味法，后来拿来炒肉丝，味道留下了、鱼没有了——所以叫"鱼香"。',
          py: 'Zhè shì Sìchuān rén zuò yú de lǎo tiáowèi fǎ, hòulái ná lái chǎo ròusī, wèidào liú xià le, yú méiyǒu le — suǒyǐ jiào "yúxiāng".', en: 'It is the old Sichuan way of seasoning fish. When it moved to pork the flavour stayed but the fish did not — hence "fish-fragrant".' }
      ]
    }
  },

  shuizhu: {
    prep: {
      zh: '牛肉逆着纹理切薄片，加淀粉抓匀上浆。',
      py: 'Niúròu nì zhe wénlǐ qiē báo piàn, jiā diànfěn zhuā yún shàng jiāng.',
      en: 'Slice the beef thin against the grain and coat it with starch.'
    },
    steps: [
      { zh: '备料：牛肉、叶子菜、葱姜蒜、刀口辣椒和豆瓣酱。',
        py: 'Bèiliào: niúròu, yèzi cài, cōng jiāng suàn, dāokǒu làjiāo hé dòubànjiàng.',
        en: 'Get ready: beef, leafy greens, aromatics, chopped chili and bean paste.' },
      { zh: '腌肉：350 克牛肉加盐、生抽、红薯淀粉和清水，抓匀腌十分钟。',
        py: 'Yān ròu: sānbǎi wǔshí kè niúròu jiā yán, shēngchōu, hóngshǔ diànfěn hé qīngshuǐ, zhuā yún yān shí fēnzhōng.',
        en: 'Marinate 350 g beef with salt, light soy, sweet-potato starch and water for ten minutes.' },
      { zh: '炒料：锅里倒菜籽油，油温五成热，下葱姜蒜和一半刀口辣椒。',
        py: 'Chǎo liào: guō lǐ dào càizǐyóu, yóuwēn wǔ chéng rè, xià cōng jiāng suàn hé yíbàn dāokǒu làjiāo.',
        en: 'Heat rapeseed oil to medium, add the aromatics and half the chopped chili.' },
      { zh: '加汤：炒香后加一升清水，熬煮三到五分钟。',
        py: 'Jiā tāng: chǎo xiāng hòu jiā yì shēng qīngshuǐ, áozhǔ sān dào wǔ fēnzhōng.',
        en: 'Add a litre of water and simmer for three to five minutes.' },
      { zh: '垫菜：叶子菜加盐炒断生，捞出来垫在碗底。',
        py: 'Diàn cài: yèzi cài jiā yán chǎo duànshēng, lāo chūlái diàn zài wǎn dǐ.',
        en: 'Stir-fry the greens with salt and spread them in the bottom of the bowl.' },
      { zh: '下牛肉：转小火，牛肉片一片片下进汤里，变色就关火。',
        py: 'Xià niúròu: zhuǎn xiǎohuǒ, niúròu piàn yí piàn piàn xià jìn tāng lǐ, biànsè jiù guān huǒ.',
        en: 'Turn to low, slide the beef slices in one by one and switch off when they change colour.' },
      { zh: '淋油：另起锅把油烧到冒烟，淋在刀口辣椒和蒜末上。',
        py: 'Lín yóu: lìng qǐ guō bǎ yóu shāo dào màoyān, lín zài dāokǒu làjiāo hé suànmò shàng.',
        en: 'Heat oil in another pan until smoking and pour it over the chili and garlic.' },
      { zh: '出锅：撒上葱花，连汤倒进碗里，趁热端上桌。',
        py: 'Chūguō: sǎ shàng cōnghuā, lián tāng dào jìn wǎn lǐ, chèn rè duān shàng zhuō.',
        en: 'Scatter scallion, pour everything into the bowl and serve it hot.' }
    ],
    talk: {
      scene: '学员想挑战一道麻辣的硬菜，师傅推荐水煮牛肉，并提醒他"嫩"的诀窍。',
      lines: [
        { who: 'student', tag: '点单与推荐', zh: '有什么麻辣的推荐？',
          py: 'Yǒu shénme málà de tuījiàn?', en: 'What spicy dish would you recommend?' },
        { who: 'chef', tag: '点单与推荐', zh: '水煮牛肉，麻辣鲜香，四川人请客常点。',
          py: 'Shuǐzhǔ niúròu, málà xiānxiāng, Sìchuān rén qǐngkè cháng diǎn.', en: 'Poached beef in chili oil — numbing, hot and fresh; a favourite for guests.' },
        { who: 'student', tag: '口味与忌口', zh: '太辣我受不了，可以少放辣椒吗？',
          py: 'Tài là wǒ shòu bu liǎo, kěyǐ shǎo fàng làjiāo ma?', en: 'I cannot take too much heat — can you use less chili?' },
        { who: 'chef', tag: '口味与忌口', zh: '可以少放，但花椒别减——麻才是它的招牌。',
          py: 'Kěyǐ shǎo fàng, dàn huājiāo bié jiǎn — má cái shì tā de zhāopai.', en: 'Less chili is fine, but do not cut the Sichuan pepper — the numbing is the signature.' },
        { who: 'student', tag: '询价与数量', zh: '多少钱一份？够两个人吃吗？',
          py: 'Duōshao qián yí fèn? Gòu liǎng ge rén chī ma?', en: 'How much is a portion? Enough for two?' },
        { who: 'chef', tag: '询价与数量', zh: '五十八块一份，两个人吃刚好。',
          py: 'Wǔshíbā kuài yí fèn, liǎng ge rén chī gānghǎo.', en: 'Fifty-eight yuan a portion — just right for two.' },
        { who: 'chef', tag: '操作指令', zh: '看好了：牛肉逆着纹理切薄片，抓一点淀粉，煮出来才嫩。',
          py: 'Kànhǎo le: niúròu nì zhe wénlǐ qiē báo piàn, zhuā yìdiǎn diànfěn, zhǔ chūlái cái nèn.', en: 'Watch: slice the beef thin against the grain and add a little starch so it stays tender.' },
        { who: 'student', tag: '过程询问', zh: '牛肉下锅要煮多久？',
          py: 'Niúròu xià guō yào zhǔ duōjiǔ?', en: 'How long do I cook the beef?' },
        { who: 'chef', tag: '过程询问', zh: '转小火一片片下，变色就关火，多煮一分钟就老了。',
          py: 'Zhuǎn xiǎohuǒ yí piàn piàn xià, biànsè jiù guān huǒ, duō zhǔ yì fēnzhōng jiù lǎo le.', en: 'Low heat, one slice at a time; switch off as soon as it colours — one minute more and it toughens.' },
        { who: 'student', tag: '评价与介绍', zh: '又麻又嫩！这道菜也是老菜吗？',
          py: 'Yòu má yòu nèn! Zhè dào cài yě shì lǎo cài ma?', en: 'So numbing and tender! Is this an old dish too?' },
        { who: 'chef', tag: '评价与介绍', zh: '相传北宋时自贡盐场的工人，用盐水加花椒辣椒煮牛肉，后来就成了这道名菜。',
          py: 'Xiāngchuán Běisòng shí Zìgòng yánchǎng de gōngrén, yòng yánshuǐ jiā huājiāo làjiāo zhǔ niúròu, hòulái jiù chéng le zhè dào míngcài.', en: 'It is said salt-field workers in Zigong cooked beef with brine, pepper and chili in the Northern Song — and it became a famous dish.' }
      ]
    }
  },

  wanzamian: {
    prep: {
      zh: '干豌豆提前泡一整晚，第二天炖到一抿就烂。',
      py: 'Gān wāndòu tíqián pào yì zhěng wǎn, dì èr tiān dùn dào yì mǐn jiù làn.',
      en: 'Soak the dried peas overnight, then stew them the next day until they mash at a touch.'
    },
    steps: [
      { zh: '炖耙豌豆：干豌豆泡一整晚，加水没过，压到一抿就烂。',
        py: 'Dùn pá wāndòu: gān wāndòu pào yì zhěng wǎn, jiā shuǐ mò guò, yā dào yì mǐn jiù làn.',
        en: 'Stew the peas: soaked overnight, covered with water, pressure-cooked until soft.' },
      { zh: '备小料：葱花、香菜、小米辣、蒜末、姜末切好分盘。',
        py: 'Bèi xiǎoliào: cōnghuā, xiāngcài, xiǎomǐlà, suànmò, jiāngmò qiē hǎo fēn pán.',
        en: 'Prep the condiments: scallion, coriander, small chili, garlic and ginger, each in its own dish.' },
      { zh: '调酱汁：四勺黄豆酱、四勺甜面酱、半勺蚝油、一勺老抽。',
        py: 'Tiáo jiàngzhī: sì sháo huángdòujiàng, sì sháo tiánmiànjiàng, bàn sháo hàoyóu, yì sháo lǎochōu.',
        en: 'Mix the sauce: 4 spoons soybean paste, 4 sweet flour paste, half a spoon oyster sauce, 1 dark soy.' },
      { zh: '炒杂酱：冷油下姜蒜爆香，倒肉沫炒到变色出油，淋酱汁炒香。',
        py: 'Chǎo zájiàng: lěng yóu xià jiāng suàn bàoxiāng, dào ròumò chǎo dào biànsè chū yóu, lín jiàngzhī chǎo xiāng.',
        en: 'Fry the meat sauce: aromatics in cold oil, then the mince until coloured and oily, then the sauce.' },
      { zh: '擀面：面粉加盐和清水，揉成偏硬的面团，擀开切细条。',
        py: 'Gǎn miàn: miànfěn jiā yán hé qīngshuǐ, róu chéng piān yìng de miàntuán, gǎn kāi qiē xì tiáo.',
        en: 'Make the noodles: flour, salt and water into a firm dough, rolled out and cut into thin strips.' },
      { zh: '碗底打底：半小勺猪油、葱花、一勺香醋、一勺辣椒油。',
        py: 'Wǎn dǐ dǎdǐ: bàn xiǎosháo zhūyóu, cōnghuā, yì sháo xiāngcù, yì sháo làjiāoyóu.',
        en: 'Season the bowl: half a spoon lard, scallion, a spoon of black vinegar and a spoon of chili oil.' },
      { zh: '组装：面煮熟捞进碗里，铺一大勺耙豌豆和一大勺杂酱。',
        py: 'Zǔzhuāng: miàn zhǔ shú lāo jìn wǎn lǐ, pū yí dà sháo pá wāndòu hé yí dà sháo zájiàng.',
        en: 'Assemble: boil the noodles into the bowl, then a big spoon of peas and a big spoon of meat sauce.' },
      { zh: '开吃：撒葱花和香菜，从底下往上拌匀。',
        py: 'Kāi chī: sǎ cōnghuā hé xiāngcài, cóng dǐxia wǎng shàng bàn yún.',
        en: 'Serve: scatter scallion and coriander and mix from the bottom up.' }
    ],
    talk: {
      scene: '学员早上进店，想学一碗重庆人从小吃到大的面。',
      lines: [
        { who: 'student', tag: '点单与推荐', zh: '老板，来碗面，有什么推荐？',
          py: 'Lǎobǎn, lái wǎn miàn, yǒu shénme tuījiàn?', en: 'Boss, a bowl of noodles — what do you recommend?' },
        { who: 'chef', tag: '点单与推荐', zh: '豌杂面，重庆人从小吃到大的早饭。',
          py: 'Wānzá miàn, Chóngqìng rén cóng xiǎo chī dào dà de zǎofàn.', en: 'Pea-and-meat noodles — the breakfast Chongqing people grow up on.' },
        { who: 'student', tag: '口味与忌口', zh: '辣的可以，但是不要香菜，行吗？',
          py: 'Là de kěyǐ, dànshì bú yào xiāngcài, xíng ma?', en: 'Spicy is fine, but no coriander, please.' },
        { who: 'chef', tag: '口味与忌口', zh: '没问题，香菜另放；辣度也可以调。',
          py: 'Méi wèntí, xiāngcài lìng fàng; làdù yě kěyǐ tiáo.', en: 'No problem — coriander on the side, and I can adjust the heat.' },
        { who: 'student', tag: '询价与数量', zh: '多少钱一碗？分量够吗？',
          py: 'Duōshao qián yì wǎn? Fènliàng gòu ma?', en: 'How much a bowl? Is the portion enough?' },
        { who: 'chef', tag: '询价与数量', zh: '十六块一碗，分量足，一碗管饱。',
          py: 'Shíliù kuài yì wǎn, fènliàng zú, yì wǎn guǎn bǎo.', en: 'Sixteen yuan — a generous bowl, it will fill you up.' },
        { who: 'chef', tag: '操作指令', zh: '看好了：豌豆要炖到一抿就烂，面条要偏硬才筋道。',
          py: 'Kànhǎo le: wāndòu yào dùn dào yì mǐn jiù làn, miàntiáo yào piān yìng cái jīndào.', en: 'Watch: the peas must mash at a touch, and the dough firm so the noodles stay springy.' },
        { who: 'student', tag: '过程询问', zh: '面煮好了要先拌吗？',
          py: 'Miàn zhǔ hǎo le yào xiān bàn ma?', en: 'Should I mix it first when the noodles are done?' },
        { who: 'chef', tag: '过程询问', zh: '先拌底料，再铺豌豆和杂酱，从底下往上拌，每根都裹上。',
          py: 'Xiān bàn dǐliào, zài pū wāndòu hé zájiàng, cóng dǐxia wǎng shàng bàn, měi gēn dōu guǒ shàng.', en: 'Mix the base first, then add peas and meat sauce, and fold from the bottom so every strand is coated.' },
        { who: 'student', tag: '评价与介绍', zh: '太香了！豌豆和杂酱是标配吗？',
          py: 'Tài xiāng le! Wāndòu hé zájiàng shì biāopèi ma?', en: 'So fragrant! Are the peas and meat sauce the standard topping?' },
        { who: 'chef', tag: '评价与介绍', zh: '是。"豌"是炖耙的豌豆，"杂"是杂酱肉末，这两个字就是这么来的。',
          py: 'Shì. "Wān" shì dùn pá de wāndòu, "zá" shì zájiàng ròumò, zhè liǎng ge zì jiù shì zhème lái de.', en: 'Yes. "Wan" is the stewed peas and "za" the minced-meat sauce — that is exactly what the name means.' }
      ]
    }
  },

  lengchi: {
    prep: {
      zh: '牛肉先泡净血水，冷水下锅，小火煮半小时以上。',
      py: 'Niúròu xiān pào jìng xuèshuǐ, lěngshuǐ xià guō, xiǎohuǒ zhǔ bàn xiǎoshí yǐshàng.',
      en: 'Soak the beef to clear the blood, then simmer it in cold water for over half an hour.'
    },
    steps: [
      { zh: '牛肉泡净血水，冷水下锅，小火煮三十到四十分钟。',
        py: 'Niúròu pào jìng xuèshuǐ, lěngshuǐ xià guō, xiǎohuǒ zhǔ sānshí dào sìshí fēnzhōng.',
        en: 'Soak the beef, start it in cold water and simmer for thirty to forty minutes.' },
      { zh: '煮好捞出来放凉，顺着纹理切成条。',
        py: 'Zhǔ hǎo lāo chūlái fàng liáng, shùn zhe wénlǐ qiē chéng tiáo.',
        en: 'Lift it out, cool it, then cut it into strips along the grain.' },
      { zh: '牛肉条先加生抽和料酒拌一拌。',
        py: 'Niúròu tiáo xiān jiā shēngchōu hé liàojiǔ bàn yí bàn.',
        en: 'Toss the strips with light soy and cooking wine.' },
      { zh: '辣椒、花椒、麻椒先用温水泡一下，不容易糊。',
        py: 'Làjiāo, huājiāo, májiāo xiān yòng wēnshuǐ pào yíxià, bù róngyì hú.',
        en: 'Soak the chili, pepper and májiāo in warm water so they do not burn.' },
      { zh: '锅里多放油，下牛肉条翻炒，把水分炒干。',
        py: 'Guō lǐ duō fàng yóu, xià niúròu tiáo fānchǎo, bǎ shuǐfèn chǎo gān.',
        en: 'Use plenty of oil and fry the strips until the moisture is gone.' },
      { zh: '炒到七八分干，加入泡好的辣椒和花椒一起翻炒。',
        py: 'Chǎo dào qī bā fēn gān, jiārù pào hǎo de làjiāo hé huājiāo yìqǐ fānchǎo.',
        en: 'At seven or eight parts dry, add the soaked chili and pepper.' },
      { zh: '出锅前放盐、糖和一点孜然粉调味。',
        py: 'Chūguō qián fàng yán, táng hé yìdiǎn zīránfěn tiáowèi.',
        en: 'Before serving, season with salt, sugar and a little cumin.' },
      { zh: '盛出来彻底放凉，越凉越香。',
        py: 'Chéng chūlái chèdǐ fàng liáng, yuè liáng yuè xiāng.',
        en: 'Take it out and let it cool completely — the cooler, the tastier.' }
    ],
    talk: {
      scene: '学员想买一道能带走的川菜，师傅推荐了自贡的"冷吃"做法。',
      lines: [
        { who: 'student', tag: '点单与推荐', zh: '有没有可以带走的菜？',
          py: 'Yǒu méiyǒu kěyǐ dài zǒu de cài?', en: 'Is there anything I can take away?' },
        { who: 'chef', tag: '点单与推荐', zh: '冷吃牛肉，自贡盐帮菜，放凉了更好吃。',
          py: 'Lěngchī niúròu, Zìgòng yánbāng cài, fàng liáng le gèng hǎochī.', en: 'Cold-eaten beef — a Zigong salt-merchant dish; it tastes better cooled.' },
        { who: 'student', tag: '口味与忌口', zh: '这个辣吗？我不太能吃辣。',
          py: 'Zhège là ma? Wǒ bú tài néng chī là.', en: 'Is it spicy? I cannot take much heat.' },
        { who: 'chef', tag: '口味与忌口', zh: '麻辣都有，可以少放辣椒，麻椒少一半。',
          py: 'Má là dōu yǒu, kěyǐ shǎo fàng làjiāo, májiāo shǎo yíbàn.', en: 'Both numbing and hot — I can cut the chili, and halve the pepper.' },
        { who: 'student', tag: '询价与数量', zh: '多少钱一份？能放几天？',
          py: 'Duōshao qián yí fèn? Néng fàng jǐ tiān?', en: 'How much a portion? How many days will it keep?' },
        { who: 'chef', tag: '询价与数量', zh: '四十五一份，密封放冰箱能放三四天。',
          py: 'Sìshíwǔ yí fèn, mìfēng fàng bīngxiāng néng fàng sān sì tiān.', en: 'Forty-five; sealed in the fridge it keeps three or four days.' },
        { who: 'chef', tag: '操作指令', zh: '看好了：牛肉先煮再切条，一定要顺着纹理切。',
          py: 'Kànhǎo le: niúròu xiān zhǔ zài qiē tiáo, yídìng yào shùn zhe wénlǐ qiē.', en: 'Watch: boil first, then cut — always along the grain.' },
        { who: 'student', tag: '过程询问', zh: '为什么要多放油炒干？',
          py: 'Wèishénme yào duō fàng yóu chǎo gān?', en: 'Why fry it dry with so much oil?' },
        { who: 'chef', tag: '过程询问', zh: '把水分炒干，油把香味封住，放凉了才香、也不容易坏。',
          py: 'Bǎ shuǐfèn chǎo gān, yóu bǎ xiāngwèi fēng zhù, fàng liáng le cái xiāng, yě bù róngyì huài.', en: 'Driving off the water seals the aroma in the oil — tastier cold and keeps longer.' },
        { who: 'student', tag: '评价与介绍', zh: '凉的比热的还香！为什么叫"冷吃"？',
          py: 'Liáng de bǐ rè de hái xiāng! Wèishénme jiào "lěngchī"?', en: 'The cold version smells even better! Why "cold-eaten"?' },
        { who: 'chef', tag: '评价与介绍', zh: '自贡盐帮菜有个"冷吃"系列，先煮后炒干、放凉再吃，所以叫冷吃牛肉。',
          py: 'Zìgòng yánbāng cài yǒu ge "lěngchī" xìliè, xiān zhǔ hòu chǎo gān, fàng liáng zài chī, suǒyǐ jiào lěngchī niúròu.', en: 'Zigong cooking has a "cold-eaten" family: boil, fry dry, cool, then eat — hence the name.' }
      ]
    }
  },

  ganbian: {
    prep: {
      zh: '四季豆掐头去尾，把两边的筋撕掉。',
      py: 'Sìjìdòu qiā tóu qù wěi, bǎ liǎng biān de jīn sī diào.',
      en: 'Top and tail the green beans and pull off the strings.'
    },
    steps: [
      { zh: '豆角洗净晾干，油热后倒入豆角。',
        py: 'Dòujiǎo xǐ jìng liàng gān, yóu rè hòu dào rù dòujiǎo.',
        en: 'Wash and dry the beans, then slide them into hot oil.' },
      { zh: '中火炸到表皮起皱、变成虎皮色，先捞出来。',
        py: 'Zhōnghuǒ zhá dào biǎopí qǐ zhòu, biàn chéng hǔpísè, xiān lāo chūlái.',
        en: 'Fry over medium heat until the skins wrinkle and turn tiger-striped, then lift them out.' },
      { zh: '锅里留底油，下蒜末、干辣椒段和花椒炒香。',
        py: 'Guō lǐ liú dǐyóu, xià suànmò, gānlàjiāo duàn hé huājiāo chǎo xiāng.',
        en: 'Keep a little oil and fry the garlic, chili sections and pepper until fragrant.' },
      { zh: '倒入豆角，加生抽和一点盐。',
        py: 'Dào rù dòujiǎo, jiā shēngchōu hé yìdiǎn yán.',
        en: 'Return the beans and add light soy and a pinch of salt.' },
      { zh: '再撒上一点辣椒面和白芝麻。',
        py: 'Zài sǎ shàng yìdiǎn làjiāomiàn hé bái zhīma.',
        en: 'Sprinkle on a little chili flakes and white sesame.' },
      { zh: '翻炒均匀，即可出锅！',
        py: 'Fānchǎo jūnyún, jí kě chūguō!',
        en: 'Toss well and serve.' }
    ],
    talk: {
      scene: '学员想吃点素的，师傅一边做一边叮嘱他四季豆的安全讲究。',
      lines: [
        { who: 'student', tag: '点单与推荐', zh: '有什么素的特色菜？',
          py: 'Yǒu shénme sù de tèsè cài?', en: 'Any vegetarian dish you would recommend?' },
        { who: 'chef', tag: '点单与推荐', zh: '干煸四季豆，素的，特别下饭。',
          py: 'Gānbiān sìjìdòu, sù de, tèbié xiàfàn.', en: 'Dry-fried green beans — vegetarian and great with rice.' },
        { who: 'student', tag: '口味与忌口', zh: '这个辣不辣？我不吃太辣的。',
          py: 'Zhège là bu là? Wǒ bù chī tài là de.', en: 'Is it spicy? I do not eat very hot food.' },
        { who: 'chef', tag: '口味与忌口', zh: '家常味，微微辣；不吃辣我把干辣椒减半。',
          py: 'Jiācháng wèi, wēiwēi là; bù chī là wǒ bǎ gānlàjiāo jiǎn bàn.', en: 'Home-style, mildly hot — I can halve the dried chili.' },
        { who: 'student', tag: '询价与数量', zh: '多少钱一份？',
          py: 'Duōshao qián yí fèn?', en: 'How much is a portion?' },
        { who: 'chef', tag: '询价与数量', zh: '二十六块一份，两个人配一个荤菜刚好。',
          py: 'Èrshíliù kuài yí fèn, liǎng ge rén pèi yí ge hūncài gānghǎo.', en: 'Twenty-six yuan; with a meat dish it is right for two.' },
        { who: 'chef', tag: '操作指令', zh: '记住：四季豆一定要炸到表皮起皱，彻底熟透。',
          py: 'Jìzhù: sìjìdòu yídìng yào zhá dào biǎopí qǐ zhòu, chèdǐ shú tòu.', en: 'Remember: fry the beans until the skins wrinkle and they are cooked right through.' },
        { who: 'student', tag: '过程询问', zh: '为什么一定要熟透？',
          py: 'Wèishénme yídìng yào shú tòu?', en: 'Why must they be fully cooked?' },
        { who: 'chef', tag: '过程询问', zh: '四季豆没熟透会中毒——恶心、呕吐，这一步不能省。',
          py: 'Sìjìdòu méi shú tòu huì zhòngdú — ěxīn, ǒutù, zhè yí bù bù néng shěng.', en: 'Under-cooked beans are toxic — nausea and vomiting. This step is not optional.' },
        { who: 'student', tag: '评价与介绍', zh: '原来做菜也有安全课！这道菜有什么讲究？',
          py: 'Yuánlái zuò cài yě yǒu ānquán kè! Zhè dào cài yǒu shénme jiǎngjiu?', en: 'So cooking has a safety lesson too! What is special about this dish?' },
        { who: 'chef', tag: '评价与介绍', zh: '"干煸"就是不下汤、慢慢把水汽煸走。四川人用这个做法做很多菜，最经典的就是四季豆。',
          py: '"Gānbiān" jiùshì bú xià tāng, màn man bǎ shuǐqì biān zǒu. Sìchuān rén yòng zhège zuòfǎ zuò hěnduō cài, zuì jīngdiǎn de jiùshì sìjìdòu.', en: '"Dry-frying" means no stock — you drive the moisture out slowly. Sichuan cooks use it for many dishes; green beans are the classic.' }
      ]
    }
  }
};
