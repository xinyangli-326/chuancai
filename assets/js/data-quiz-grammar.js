/* 语法 / 句子练习（小测里每个等级各出 1 道填空 + 1 道排序）
   句子全部取自站里"词汇 · 句型"那 8 个句型（CC.patterns），不另编语法点。
   fill  ：走普通选择题（options 里 correct:true 为答案）
   build ：句子排序，tokens 按正确顺序写，answer 是拼好以后的句子 */
window.CC_QUIZ_GRAMMAR = {
  fill: [
    { q: { zh: '把牛肉顺着纹理切成条。 —— 这里应该填哪个词？', en: 'Which word fits? "___ 牛肉顺着纹理切成条。"' },
      options: [{ zh: '把', en: 'bǎ (disposal marker)', correct: true }, { zh: '被', en: 'bèi (passive)' }, { zh: '比', en: 'bǐ (compare)' }],
      explain: { zh: '句型：「把 + 名词 + 动词 + 结果」。"把牛肉切成条"是主动处理，不是被动。', en: 'Pattern: 把 + noun + verb + result.' } },
    { q: { zh: '先把油烧热，___放豆瓣酱，最后放豆腐。', en: 'First the oil, ___ the bean paste, finally the tofu.' },
      options: [{ zh: '然后', en: 'ránhòu — then', correct: true }, { zh: '因为', en: 'yīnwèi — because' }, { zh: '虽然', en: 'suīrán — although' }],
      explain: { zh: '句型：「先……然后……最后……」表示做菜的顺序。', en: 'Pattern: 先 … 然后 … 最后 … for cooking order.' } },
    { q: { zh: '麻辣的菜越吃___想吃。', en: 'The more you eat spicy food, the more you want it.' },
      options: [{ zh: '越', en: 'yuè — the more', correct: true }, { zh: '很', en: 'hěn — very' }, { zh: '太', en: 'tài — too' }],
      explain: { zh: '句型：「越……越……」前后都要有"越"。', en: 'Pattern: 越 … 越 … — both halves need 越.' } },
    { q: { zh: '这道菜有点儿___，再加点糖。', en: 'This dish is a bit ___, add some sugar.' },
      options: [{ zh: '咸', en: 'xián — salty', correct: true }, { zh: '咸了', en: 'xián le' }, { zh: '很咸', en: 'hěn xián' }],
      explain: { zh: '句型：「有点儿 + 形容词」，形容词后面不跟"了"。', en: 'Pattern: 有点儿 + adjective (no 了 after it).' } },
    { q: { zh: '火___大了，菜会糊。', en: 'The heat is ___ high, the dish will burn.' },
      options: [{ zh: '太', en: 'tài — too', correct: true }, { zh: '有点儿', en: 'yǒudiǎnr — a bit' }, { zh: '越', en: 'yuè — the more' }],
      explain: { zh: '句型：「太 + 形容词 + 了」，表示"过头了"。', en: 'Pattern: 太 + adjective + 了 — "too much".' } },
    { q: { zh: '这道菜火候___，肉又嫩又香。', en: 'This dish is cooked just right — tender and fragrant.' },
      options: [{ zh: '到位', en: 'dàowèi — just right', correct: true }, { zh: '不够', en: 'bú gòu — not enough' }, { zh: '有点儿', en: 'yǒudiǎnr — a bit' }],
      explain: { zh: '句型：「火候到位／火候不够」，说火候控制得好不好。', en: 'Pattern: 火候到位 / 火候不够 — heat control is right / lacking.' } }
  ],
  build: [
    { tokens: ['把', '豆腐', '切成', '小块。'], answer: '把豆腐切成小块。',
      hint: { zh: '把 + 名词 + 动词 + 结果', en: '把 + noun + verb + result' },
      explain: { zh: '"把"字句：把要处理的东西放在"把"后面。', en: 'The 把-construction puts the thing being handled right after 把.' } },
    { tokens: ['先', '把油烧热，', '然后', '放豆瓣酱，', '最后', '放豆腐。'], answer: '先把油烧热，然后放豆瓣酱，最后放豆腐。',
      hint: { zh: '先……然后……最后……', en: 'first … then … finally …' },
      explain: { zh: '做菜的顺序用"先……然后……最后……"最自然。', en: 'Use 先 … 然后 … 最后 … to describe cooking order.' } },
    { tokens: ['把', '牛肉', '顺着纹理', '切成条。'], answer: '把牛肉顺着纹理切成条。',
      hint: { zh: '把 + 名词 + 方式 + 动词 + 结果', en: '把 + noun + manner + verb + result' },
      explain: { zh: '"顺着纹理"是方式，放在动词前面。', en: '"Along the grain" describes the manner and comes before the verb.' } },
    { tokens: ['这道菜', '火候', '到位，', '肉', '又嫩又香。'], answer: '这道菜火候到位，肉又嫩又香。',
      hint: { zh: '又……又……', en: 'both … and …' },
      explain: { zh: '"又……又……"把两个特点连起来：又嫩又香。', en: '又 … 又 … joins two qualities: tender and fragrant.' } },
    { tokens: ['你', '尝尝，', '味道', '怎么样？'], answer: '你尝尝，味道怎么样？',
      hint: { zh: '……怎么样？', en: 'How is …?' },
      explain: { zh: '问别人对菜的评价，用"……怎么样？"。', en: 'Ask for an opinion with 怎么样.' } }
  ]
};
