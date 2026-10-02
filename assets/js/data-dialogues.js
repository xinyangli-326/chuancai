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
        { who: 'chef', tag: '过程询问', zh: '再烧三分钟。这道菜是一百多年前万福桥边一位陈婆婆做的，麻辣烫香。',
          py: 'Zài shāo sān fēnzhōng. Zhè dào cài shì yìbǎi duō nián qián Wànfúqiáo biān yí wèi Chén pópo zuò de, má là tàng xiāng.', en: 'Three more minutes. A Granny Chen by the Wanfu Bridge made this over a century ago — numbing, hot, scalding.' },
        { who: 'student', tag: '评价与介绍', zh: '这个太好吃了！麻婆豆腐是成都的名菜，我记住了。',
          py: 'Zhège tài hǎochī le! Má pó dòufu shì Chéngdū de míngcài, wǒ jìzhù le.', en: 'This is delicious! Mapo tofu is a famous Chengdu dish — I will remember it.' }
      ]
    }
  }
};
