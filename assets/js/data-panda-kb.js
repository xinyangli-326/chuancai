/* 熊猫客服的知识库（纯本地，不联网）
   每条：{ id, keys:[关键词…], a:{zh,en} | function(ctx,payload){return {zh,en}}, acts:[{t,href}] }
   也可以写成"动态条目"：{ id, probe:function(text,ctx){ return {score, payload} | null }, a:…, acts:… }
   ctx 里带着：CC 全部数据、S 用户状态、dishById/ingById 等小工具。回答只用站里已有的事实。 */
window.CC_PANDA_KB = [
  /* ---------- 网站怎么用 ---------- */
  { id: 'start', keys: ['怎么开始', '怎么用', '怎么玩', '从哪开始', '新手', '第一次'],
    a: { zh: '从"选菜 · 点菜"挑一道开始：先看它的故事，再备菜、上灶，最后去小测闯关。零基础可以先做麻婆豆腐或干煸四季豆。', en: 'Start from "Dishes": pick one, read its story, do the prep, cook it, then try the quiz.' },
    acts: [{ t: '去选菜', href: '#/dishes' }, { t: '看网站怎么用', href: '#/guide' }] },
  { id: 'quizwhere', keys: ['小测在哪', '考试', '测验', '闯关', '做题'],
    a: { zh: '顶栏点"小测 · 闯关"。现在是初级 / 中级 / 高级三档，每档 8 题，还夹着语法填空和句子排序；答对 6 题算过，拿到 8 分是三星。', en: 'Top bar → Quiz. Three levels, 8 questions each, with grammar and sentence tasks.' },
    acts: [{ t: '去小测', href: '#/quiz' }] },
  { id: 'lang', keys: ['换语言', '英文', '日语', '韩语', '俄语', '泰语', '越南语', '阿拉伯', '语言', '翻译'],
    a: { zh: '右上角那个 "English ▾" 可以选标注语言：英 / 日 / 韩 / 俄 / 泰 / 越 / 阿拉伯，一次一种。中文正文不动，只换下面的标注行。', en: 'The "English ▾" button in the top bar switches the annotation language.' },
    acts: [] },
  { id: 'pinyin', keys: ['拼音', 'pinyin', '怎么读', '读音'],
    a: { zh: '顶栏"拼音 Pinyin"按钮控制要不要显示拼音；每个词旁边的小喇叭可以听发音。', en: 'The "拼音" button toggles pinyin; the 🔊 next to a word plays it.' },
    acts: [] },
  { id: 'sound', keys: ['音效', '声音', '没有声音', '关掉声音', '静音'],
    a: { zh: '顶栏的 🔊 是音效开关（开火、油锅、切菜都有各自的声音）；关掉就没有声音，朗读也不受影响。', en: 'The 🔊 button toggles sound effects (stove, wok, chopping).' },
    acts: [] },
  { id: 'clear', keys: ['清空进度', '重置', '重新开始', '清除记录'],
    a: { zh: '上灶页右上角有"清空做菜进度"，可以只清当前这道菜，或者清空全部 8 道菜的备菜和星星。', en: 'On the cook page, "清空做菜进度" resets one dish or all of them.' },
    acts: [{ t: '去上灶页', href: '#/cook' }] },
  { id: 'print', keys: ['证书', '打印', '结业'],
    a: { zh: '"我的厨房 → 结业证书"里写上名字，就能生成一张可以打印的证书。', en: 'My Kitchen → Certificate: type your name and print it.' },
    acts: [{ t: '去我的厨房', href: '#/progress' }] },
  { id: 'mobile', keys: ['手机', '平板', 'ipad', '触屏'],
    a: { zh: '可以用手机打开：页面会变成单栏，切步骤可以直接左右滑。不过备菜的切配、上灶的翻炒还是鼠标或手指点着更顺。', en: 'It works on phones — the layout becomes a single column.' },
    acts: [] },
  { id: 'offline', keys: ['离线', '没网', '网络', '能不能下'],
    a: { zh: '这个站是纯静态的，双击 index.html 就能用，没网也能跑，课堂上不怕断网。', en: 'It is a static site — it works offline, straight from the file system.' },
    acts: [] },

  /* ---------- 动态：某道菜 ---------- */
  { id: 'dish', probe: function (text, ctx) {
      var d = ctx.dishByName(text);
      return d ? { score: 3, payload: d } : null;
    },
    a: function (ctx, d) {
      var prep = d.prep.slice(0, 4).map(function (p) { return ctx.ingName(p.ing) + ' ' + p.qty; }).join('、');
      return { zh: d.name + '：' + d.flavor + '，' + d.minutes + ' 分钟，难度 ' + d.difficulty + '/3，出自' + d.region.replace(' · ', '的') +
        '。要准备 4 样主要食材（' + prep + '…），一共 ' + d.steps.length + ' 步。想先听它的来历，点下面"看故事"。',
        en: d.name + ': ' + d.flavor + ', ' + d.minutes + ' minutes, ' + d.steps.length + ' steps.' };
    },
    acts: function (ctx, d) { return [{ t: '看故事', href: '#/story/' + d.id }, { t: '去备菜', href: '#/prep/' + d.id }, { t: '看上灶', href: '#/cook/' + d.id }]; } },

  /* ---------- 动态：调料 / 食材 ---------- */
  { id: 'season', probe: function (text, ctx) {
      var s = ctx.seasonByName(text);
      return s ? { score: 3, payload: s } : null;
    },
    a: function (ctx, s) {
      var det = (window.CC_SEASON_DETAIL || {})[s.zh] || null;
      return { zh: s.zh + '（' + s.py + '）' + s.en + '。' + (det ? det.scene.zh : (s.use ? s.use.zh : '')),
        en: det ? det.scene.en : (s.use ? s.use.en : s.en) };
    },
    acts: function (ctx, s) { return [{ t: '看调料卡', href: '#/prep/' + (ctx.S.dish || 'mapo') + '/seasonings' }, { t: '去词汇页', href: '#/vocab/kitchen' }]; } },
  { id: 'ing', probe: function (text, ctx) {
      var i = ctx.ingByName(text);
      return i ? { score: 3, payload: i } : null;
    },
    a: function (ctx, i) {
      var v = (window.CC_VOCAB_DETAIL || {})[i.zh] || null;
      return { zh: i.zh + '（' + i.py + '）' + i.en + '。' + (v ? v.note.zh : '这是' + (i.cat || '食材') + '。'),
        en: v ? v.note.en : i.en };
    },
    acts: function (ctx, i) { return [{ t: '去备菜页', href: '#/prep/' + (ctx.S.dish || 'mapo') + '/board' }]; } },

  /* ---------- 动态：词 / 拼音 ---------- */
  { id: 'word', probe: function (text, ctx) {
      var w = ctx.vocabWord(text);
      return w ? { score: 2, payload: w } : null;
    },
    a: function (ctx, w) {
      var v = (window.CC_VOCAB_DETAIL || {})[w.zh] || null;
      return { zh: w.zh + ' 读作 ' + (w.py || '—') + '，意思是 ' + w.en + '。' + (v ? v.note.zh : ''),
        en: w.zh + ' — ' + w.en };
    },
    acts: [{ t: '去词汇卡', href: '#/vocab/cards' }] },

  /* ---------- 概念 / 技法 ---------- */
  { id: 'bian', keys: ['干煸', '煸'],
    a: { zh: '“煸”是少油、中小火慢慢把水分炒走，表面起皱发亮，行话叫“虎皮”。干煸四季豆就是这么做的；四季豆必须熟透，不然会中毒。', en: 'Bian = a little oil, medium-low heat, driving moisture out until the surface wrinkles ("tiger skin").' },
    acts: [{ t: '做干煸四季豆', href: '#/cook/ganbian' }] },
  { id: 'huohou', keys: ['火候', '火力', '大火', '小火', '中火'],
    a: { zh: '火候分大火 / 中火 / 小火：大火爆炒、中火炒香、小火慢炖。上灶页每一步都会告诉你该用哪一档，选错了我会提醒你。', en: 'High heat for quick frying, medium for aroma, low for simmering.' },
    acts: [{ t: '去上灶页', href: '#/cook' }] },
  { id: 'gouqian', keys: ['勾芡', '淀粉', '芡'],
    a: { zh: '勾芡就是用水淀粉让汤变稠、挂在菜上。要分两三次淋，边淋边推，芡才薄而亮。', en: 'Thickening with starch water — add it in two or three goes.' },
    acts: [{ t: '看麻婆豆腐', href: '#/cook/mapo' }] },
  { id: 'hongyou', keys: ['炒出红油', '红油'],
    a: { zh: '“炒出红油”指豆瓣酱用中小火慢慢炒到油变红亮，这是回锅肉、麻婆豆腐、水煮牛肉第一步的关键。', en: 'Frying bean paste until the oil turns red is the first key step in many Sichuan dishes.' },
    acts: [{ t: '看回锅肉', href: '#/cook/huiguo' }] },
  { id: 'paofa', keys: ['泡发', '怎么泡', '木耳怎么', '干货'],
    a: { zh: '泡发＝用冷水或温水把干货泡开。木耳一般泡 30 分钟到 1 小时就好，夏天别泡太久（室温泡久了容易变质）。', en: 'Soaking dried goods — wood ear takes 30–60 minutes.' }, acts: [] },
  { id: 'weixing', keys: ['味型', '几种味', '多少种味', '复合味'],
    a: { zh: '川菜有二十多种味型：麻辣、糊辣、红油、鱼香、家常、蒜泥、荔枝……很多并不辣。首页“味型与时间”里有个转盘，12 个常见味型都在上面。', en: 'Sichuan cooking has over twenty flavour types — many are not spicy.' },
    acts: [{ t: '看味型转盘', href: '#/flavor/wheel' }] },
  { id: 'pattern-ba', keys: ['把字句', '“把”', '把 字'],
    a: { zh: '“把”字句：把 + 名词 + 动词 + 结果。例：把豆腐切成小块。/ 把牛肉顺着纹理切成条。做菜时天天用。', en: 'The ba-construction: 把 + noun + verb + result.' },
    acts: [{ t: '看全部句型', href: '#/vocab/patterns' }] },
  { id: 'pattern-yue', keys: ['越越', '越……越', '越来越'],
    a: { zh: '“越……越……”表示程度跟着变：麻辣的菜越吃越想吃；火越大，锅越热。', en: 'The more … the more …' },
    acts: [{ t: '看全部句型', href: '#/vocab/patterns' }] },
  { id: 'pattern-tai', keys: ['太大了', '太……了', '有点儿'],
    a: { zh: '“太 + 形容词 + 了”＝过头了：火太大了，菜会糊。“有点儿 + 形容词”＝有点（不太满意）：这道菜有点儿咸。', en: '太…了 = too much; 有点儿 = a bit (usually negative).' },
    acts: [] },

  /* ---------- 我的进度 ---------- */
  { id: 'progress', keys: ['我做了几道', '我的进度', '我完成', '星星', '徽章', '证书'],
    a: function (ctx) {
      var s = ctx.S, done = Object.keys(s.cooked || {}).length, total = (ctx.CC.dishes || []).length;
      var stars = 0; Object.keys(s.cooked || {}).forEach(function (k) { stars += (s.cooked[k].stars || 0); });
      var best = s.quizBest || {};
      var quiz = ['easy', 'mid', 'hard'].filter(function (k) { return best[k]; })
        .map(function (k) { return ({ easy: '初级', mid: '中级', hard: '高级' })[k] + ' ' + best[k].score + '/' + best[k].total; }).join('、');
      return { zh: '你已经完成 ' + done + ' / ' + total + ' 道菜，累计 ' + stars + ' 颗星，' + (s.badges || []).length + ' 枚徽章' +
        '，动手 ' + (s.hands || 0) + ' 次。' + (quiz ? '小测最好成绩：' + quiz + '。' : '还没考过小测。'),
        en: done + '/' + total + ' dishes done, ' + stars + ' stars, ' + (s.badges || []).length + ' badges.' };
    },
    acts: [{ t: '去我的厨房', href: '#/progress' }] },

  /* ---------- 文化 ---------- */
  { id: 'schools', keys: ['流派', '上河帮', '下河帮', '小河帮', '盐帮菜', '蓉派', '渝派'],
    a: { zh: '川菜分三大流派：上河帮（成都一带，官府菜、小吃精致）、下河帮（重庆一带，江湖菜、火锅重口）、小河帮（自贡一带的盐帮菜，重油重辣）。', en: 'Three schools: Chengdu (upper river), Chongqing (lower river) and the Zigong salt-help style.' },
    acts: [{ t: '看三大流派', href: '#/table/schools' }] },
  { id: 'salt', keys: ['盐为什么', '自贡', '盐帮'],
    a: { zh: '自贡靠井盐兴盛了两千多年，盐场干活的人出力多、出汗多，需要重盐重辣顶饱的吃法，所以这里出了水煮牛肉、冷吃兔这些菜。', en: 'Zigong grew on salt wells — heavy, hot food suited the workers.' },
    acts: [{ t: '看水煮牛肉的故事', href: '#/story/shuizhu' }] },
  { id: 'cold', keys: ['冷吃', '冷吃兔', '为什么放凉'],
    a: { zh: '“冷吃”说的是吃法不是温度：水分炒干以后放凉，辣椒和花椒的香气更清楚，肉也更有嚼劲。冷吃兔是最有名的一种，冷吃牛肉、冷吃鸡尖都是同门。', en: 'Cold-eaten: dried in oil, then eaten cool — the aroma reads more clearly.' },
    acts: [{ t: '看冷吃牛肉', href: '#/story/lengchi' }] },
  { id: 'culture-timeline', keys: ['历史', '川菜多久', '起源'],
    a: { zh: '川菜不是一天长成的：秦汉就有底子，清末民国麻辣走上街头，抗战时期川菜馆开到全国，改革开放后火锅和江湖菜又火了一轮。首页“味型与时间”里有时间轴。', en: 'Sichuan cuisine has been shaped over many centuries.' },
    acts: [{ t: '看时间轴', href: '#/flavor/timeline' }] },
  { id: 'thanks', keys: ['谢谢', '多谢', 'thank', '谢了'],
    a: { zh: '不客气！做菜有问题随时叫我。', en: 'You are welcome!' }, acts: [] },
  { id: 'who', keys: ['你是谁', '你叫什么', '你是熊猫吗', '你是什么'],
    a: { zh: '我是胖达，这个川菜小厨房的助手。做菜、调料、词汇、文化，还有网站怎么用，都可以问我。', en: 'I am Panda, the helper of this Sichuan kitchen site.' },
    acts: [{ t: '去选菜', href: '#/dishes' }] }
];
