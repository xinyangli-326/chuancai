/* 川味小厨房 · 交互主程序
   Sichuan Flavor Kitchen — main interactive script
   纯原生 JS：路由、朗读、音效、备菜配对、烹饪模拟、词汇卡、小测、进度与徽章。
*/
(function () {
  'use strict';

  var CC = window.CC || {};
  var $ = function (sel, root) { return (root || document).querySelector(sel); };
  var $$ = function (sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); };
  var app = $('#app');

  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function shuffle(a) {
    a = a.slice();
    for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; }
    return a;
  }

  /* ============ 学习记录（本地保存） ============ */
  var S = {
    py: true, en: true, sound: true, dish: null,
    prepped: {}, cooked: {}, badges: [], stirs: 0, chat: 0,
    flavorCorrect: 0, vocabSeen: [], name: ''
  };
  var LS_KEY = 'sichuan-kitchen-state-v1';
  function save() { try { localStorage.setItem(LS_KEY, JSON.stringify(S)); } catch (e) {} }
  function load() {
    try {
      var raw = localStorage.getItem(LS_KEY);
      if (raw) { var o = JSON.parse(raw); for (var k in o) if (k in S) S[k] = o[k]; }
    } catch (e) {}
  }

  /* ============ 音效（WebAudio 现场合成，无需音频文件） ============ */
  var Sfx = (function () {
    var ac = null;
    function ctx() {
      if (!S.sound) return null;
      try {
        if (!ac) ac = new (window.AudioContext || window.webkitAudioContext)();
        if (ac.state === 'suspended') ac.resume();
      } catch (e) { return null; }
      return ac;
    }
    function tone(freq, dur, type, gain, slideTo) {
      var c = ctx(); if (!c) return;
      var o = c.createOscillator(), g = c.createGain();
      o.type = type || 'sine';
      o.frequency.setValueAtTime(freq, c.currentTime);
      if (slideTo) o.frequency.exponentialRampToValueAtTime(slideTo, c.currentTime + dur);
      g.gain.setValueAtTime(gain || 0.12, c.currentTime);
      g.gain.exponentialRampToValueAtTime(0.001, c.currentTime + dur);
      o.connect(g); g.connect(c.destination);
      o.start(); o.stop(c.currentTime + dur + 0.02);
    }
    function noise(dur, filterFreq, gain, q) {
      var c = ctx(); if (!c) return;
      var len = Math.floor(c.sampleRate * dur);
      var buf = c.createBuffer(1, len, c.sampleRate);
      var d = buf.getChannelData(0);
      for (var i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * (1 - i / len);
      var src = c.createBufferSource(); src.buffer = buf;
      var f = c.createBiquadFilter(); f.type = 'bandpass'; f.frequency.value = filterFreq || 1400; f.Q.value = q || 0.8;
      var g = c.createGain(); g.gain.setValueAtTime(gain || 0.16, c.currentTime);
      g.gain.exponentialRampToValueAtTime(0.001, c.currentTime + dur);
      src.connect(f); f.connect(g); g.connect(c.destination);
      src.start();
    }
    return {
      sizzle: function () { noise(0.7, 2600, 0.13, 0.6); },
      chop: function () { noise(0.08, 1800, 0.2, 2.2); tone(220, 0.06, 'square', 0.06, 120); },
      stir: function () { noise(0.22, 900, 0.1, 0.7); },
      ding: function () { tone(880, 0.16, 'sine', 0.12); setTimeout(function () { tone(1320, 0.22, 'sine', 0.1); }, 110); },
      pop: function () { tone(520, 0.12, 'sine', 0.12, 900); },
      error: function () { tone(200, 0.22, 'sawtooth', 0.1, 110); },
      bubble: function () { tone(300 + Math.random() * 160, 0.16, 'sine', 0.07, 480); },
      fanfare: function () {
        [523, 659, 784, 1047].forEach(function (f, i) { setTimeout(function () { tone(f, 0.26, 'triangle', 0.12); }, i * 130); });
      }
    };
  })();

  /* ============ 朗读（浏览器内置语音合成） ============ */
  var voices = [];
  function loadVoices() { try { voices = window.speechSynthesis ? speechSynthesis.getVoices() : []; } catch (e) { voices = []; } }
  if (window.speechSynthesis) { loadVoices(); speechSynthesis.onvoiceschanged = loadVoices; }
  function speak(text, btn) {
    if (!window.speechSynthesis) { toast('这个浏览器暂时不支持朗读，可以换 Edge 或 Chrome 试试'); return; }
    try {
      speechSynthesis.cancel();
      var u = new SpeechSynthesisUtterance(text);
      u.lang = 'zh-CN'; u.rate = 0.86; u.pitch = 1.02;
      var v = voices.filter(function (x) { return /zh|Chinese/i.test(x.lang + ' ' + x.name); });
      if (v.length) {
        var prefer = v.find(function (x) { return /Yunxi|Xiaoxiao|Huihui|Kangkang|yaoyao|Tingting|Chinese \(Mainland\)/i.test(x.name); });
        u.voice = prefer || v[0];
      }
      if (btn) { btn.classList.add('speaking'); u.onend = function () { btn.classList.remove('speaking'); }; }
      speechSynthesis.speak(u);
    } catch (e) { toast('朗读失败，请换一个浏览器试试'); }
  }

  /* ============ 提示 / 弹窗 / 彩纸 ============ */
  var toastTimer = null;
  function toast(msg) {
    var t = $('#toast'); t.textContent = msg; t.classList.add('show');
    clearTimeout(toastTimer); toastTimer = setTimeout(function () { t.classList.remove('show'); }, 2600);
  }
  function openModal(html) {
    var root = $('#modalRoot');
    root.innerHTML = '<div class="modal-backdrop" data-close="1"></div><div class="modal-card" role="dialog" aria-modal="true">' +
      '<button class="modal-close" data-close="1" aria-label="关闭">✕</button>' + html + '</div>';
    root.classList.add('open');
    root.setAttribute('aria-hidden', 'false');
  }
  function closeModal() {
    var root = $('#modalRoot');
    root.classList.remove('open'); root.innerHTML = '';
    root.setAttribute('aria-hidden', 'true');
  }
  function confetti(n) {
    var layer = $('#confetti');
    var colors = ['#c8102e', '#e8a33d', '#2e7d5b', '#d7263d', '#f6c667', '#e0402c'];
    n = n || 90;
    for (var i = 0; i < n; i++) {
      var p = document.createElement('i');
      p.className = 'confetti-piece';
      p.style.left = Math.random() * 100 + 'vw';
      p.style.background = colors[i % colors.length];
      p.style.animationDuration = (2.4 + Math.random() * 1.8) + 's';
      p.style.animationDelay = (Math.random() * 0.6) + 's';
      p.style.width = (6 + Math.random() * 8) + 'px';
      p.style.height = (8 + Math.random() * 10) + 'px';
      layer.appendChild(p);
      setTimeout(function (el) { return function () { el.remove(); }; }(p), 5200);
    }
  }
  function floatScore(text, x, y) {
    var el = document.createElement('div');
    el.className = 'float-score'; el.textContent = text;
    el.style.left = (x || window.innerWidth / 2) + 'px';
    el.style.top = (y || window.innerHeight / 2) + 'px';
    document.body.appendChild(el);
    setTimeout(function () { el.remove(); }, 1200);
  }

  /* ============ 熊猫助手"胖达" ============ */
  var PANDA = {
    home: [
      '欢迎来到川味小厨房！我就是四川的"特产"——胖达。',
      '别怕辣，川菜有二十多种味型，很多一点都不辣。',
      '想学做菜？先去"选菜"挑一道，我陪你从头做到上桌。',
      '每道菜我都会告诉你：为什么四川人这样吃。'
    ],
    dishes: ['挑一道你最想吃的吧，难度我都标好了。', '麻婆豆腐最容易上手，宫保鸡丁最考火候。', '点开卡片能看这道菜的来历和小故事。'],
    prep: ['先认识食材，再动刀——这是厨师的第一步。', '不确定怎么处理？看我给的小提示。', '把食材处理对了，它会"跳"进备菜筐里。'],
    cook: ['油温、火候、下锅顺序，是川菜的三个秘密。', '翻炒的时候可以用空格键，更快！', '火太大菜会糊，火太小菜会出水，看清楚再选。'],
    vocab: ['点卡片翻面看拼音和英文，点小喇叭听发音。', '跟我念：麻—婆—豆—腐。', '听不懂就多听几遍，学语言就是"越听越熟"。'],
    quiz: ['小测一共十题左右，答错也没关系，有讲解。', '注意听音题，我会念给你听。', '答对八题以上就是"川菜文化小博士"。'],
    progress: ['这里记录你做过几道菜、拿了几枚徽章。', '把名字写上，可以打印一张属于你的证书。'],
    correct: ['对啦！这一步做得漂亮 👍', '巴适！就是这样。', '很好，继续下一步。', '完全正确，香味已经出来了！'],
    wrong: ['再想想，看看我给的小提示。', '不对哦，川菜这一步很讲究。', '差一点点，换一个试试？'],
    finish: ['上菜啦！色、香、味都到位。', '这道菜你已经学会了，去试试别的吧。', '好吃！要不要写进你的"我的厨房"？']
  };
  function pandaSay(kind, text, mood) {
    var box = $('#pandaBubble'), t = $('#pandaText'), av = $('#pandaAvatar');
    if (!t) return;
    var pool = PANDA[kind];
    t.innerHTML = text || (pool ? pool[Math.floor(Math.random() * pool.length)] : '');
    box.style.animation = 'none';
    void box.offsetWidth;
    box.style.animation = 'popIn .35s both';
    if (mood && av) {
      av.classList.remove('react-happy', 'react-oh');
      void av.offsetWidth;
      av.classList.add(mood === 'oh' ? 'react-oh' : 'react-happy');
      setTimeout(function () { av.classList.remove('react-happy', 'react-oh'); }, 700);
    }
  }

  /* ============ 徽章 ============ */
  function awardBadge(id, silent) {
    if (!id) return false;
    var b = (CC.badges || []).find(function (x) { return x.id === id; });
    if (!b) return false;
    if (S.badges.indexOf(id) >= 0) return false;
    S.badges.push(id); save();
    if (!silent) {
      confetti(120); Sfx.fanfare();
      openModal('<div style="text-align:center">' +
        '<div style="font-size:64px">' + b.emoji + '</div>' +
        '<h2 class="h2">获得徽章：' + esc(b.zh) + '</h2>' +
        '<p class="en" style="font-style:normal">' + esc(b.en) + '</p>' +
        '<p class="muted">' + esc(b.desc.zh) + '</p>' +
        '<button class="btn btn-primary" data-close="1">收下徽章</button></div>');
    }
    return true;
  }

  /* ============ 数据小工具 ============ */
  function dishById(id) { return (CC.dishes || []).find(function (d) { return d.id === id; }); }
  function ingInfo(id) {
    if (CC.ingredients && CC.ingredients[id]) return CC.ingredients[id];
    var s = (CC.seasonings || []).find(function (x) { return x.id === id; });
    if (s) return { zh: s.zh, py: s.py, en: s.en, emoji: s.emoji, cat: '调料' };
    return { zh: id, py: '', en: '', emoji: '🍽️', cat: '' };
  }
  function seasonInfo(id) { return (CC.seasonings || []).find(function (x) { return x.id === id; }); }
  var PREP_SENTENCE = {
    xi:         { zh: function (n) { return '把' + n + '洗干净。'; },        en: function (n) { return 'Wash the ' + n + '.'; } },
    qiekuai:    { zh: function (n) { return '把' + n + '切成小块。'; },      en: function (n) { return 'Cut the ' + n + ' into cubes.'; } },
    qiepian:    { zh: function (n) { return '把' + n + '切成薄片。'; },      en: function (n) { return 'Slice the ' + n + ' thinly.'; } },
    qiesi:      { zh: function (n) { return '把' + n + '切成细丝。'; },      en: function (n) { return 'Shred the ' + n + '.'; } },
    qieduan:    { zh: function (n) { return '把' + n + '切成小段。'; },      en: function (n) { return 'Cut the ' + n + ' into short sections.'; } },
    qieding:    { zh: function (n) { return '把' + n + '切成小丁。'; },      en: function (n) { return 'Dice the ' + n + '.'; } },
    duomo:      { zh: function (n) { return '把' + n + '剁成末。'; },        en: function (n) { return 'Mince the ' + n + '.'; } },
    duosui:     { zh: function (n) { return '把' + n + '剁碎。'; },          en: function (n) { return 'Chop the ' + n + ' finely.'; } },
    paisui:     { zh: function (n) { return '把' + n + '拍碎。'; },          en: function (n) { return 'Smash the ' + n + '.'; } },
    qupi:       { zh: function (n) { return '把' + n + '去皮。'; },          en: function (n) { return 'Peel the ' + n + '.'; } },
    yanzhi:     { zh: function (n) { return '把' + n + '腌一会儿。'; },      en: function (n) { return 'Marinate the ' + n + ' for a while.'; } },
    chaosui:    { zh: function (n) { return '把' + n + '焯一下水。'; },      en: function (n) { return 'Blanch the ' + n + '.'; } },
    shangjiang: { zh: function (n) { return '给' + n + '上浆。'; },          en: function (n) { return 'Velvet the ' + n + ' with starch.'; } },
    gouqian:    { zh: function (n) { return '把' + n + '调成水淀粉。'; },    en: function (n) { return 'Mix the ' + n + ' into starch water.'; } },
    tiaozhi:    { zh: function (n) { return '把' + n + '调成碗汁。'; },      en: function (n) { return 'Mix the ' + n + ' into a sauce.'; } },
    chaoxiang:  { zh: function (n) { return '把' + n + '炒香。'; },          en: function (n) { return 'Toast the ' + n + ' until fragrant.'; } },
    mofen:      { zh: function (n) { return '把' + n + '磨成粉。'; },        en: function (n) { return 'Grind the ' + n + ' into powder.'; } },
    paofa:      { zh: function (n) { return '把' + n + '泡发。'; },          en: function (n) { return 'Soak the ' + n + ' until soft.'; } },
    bodan:      { zh: function (n) { return '把' + n + '打散。'; },          en: function (n) { return 'Beat the ' + n + '.'; } }
  };
  var PREP_POOL = ['xi', 'qiekuai', 'qiepian', 'qiesi', 'qieduan', 'qieding', 'duomo', 'duosui', 'paisui', 'qupi', 'yanzhi', 'chaosui', 'shangjiang', 'gouqian', 'tiaozhi', 'chaoxiang', 'mofen'];

  function speakBtn(text, label) {
    return '<button class="speak" data-speak="' + esc(text) + '" title="听一听" aria-label="朗读' + esc(label || text) + '">🔊</button>';
  }
  function pyLine(text) { return text ? '<span class="py">' + esc(text) + '</span>' : ''; }
  /* 按中文名找真实照片：食材 → 调料 → 厨具 → 菜品 */
  function photoOf(zh) {
    var ing = Object.keys(CC.ingredients || {}).find(function (k) { return CC.ingredients[k].zh === zh; });
    if (ing) return 'assets/img/i/' + ing + '.jpg';
    var s = (CC.seasonings || []).find(function (x) { return x.zh === zh; });
    if (s) return 'assets/img/s/' + s.id + '.jpg';
    var ti = (CC.tools || []).findIndex(function (t) { return t.zh === zh; });
    if (ti >= 0) return 'assets/img/t/' + (ti + 1) + '.jpg';
    var d = (CC.dishes || []).find(function (x) { return x.name === zh; });
    if (d && d.img) return d.img;
    return '';
  }
  function photoImg(zh, cls, fallbackEmoji) {
    var src = photoOf(zh);
    if (!src) return '<span class="' + (cls || '') + '">' + (fallbackEmoji || '') + '</span>';
    return '<img class="' + (cls || '') + '" src="' + src + '" alt="' + esc(zh) + '" loading="lazy" ' +
      'onerror="this.replaceWith(Object.assign(document.createElement(\'span\'),{textContent:\'' + (fallbackEmoji || '') + '\'}))">';
  }
  function enLine(text) { return text ? '<span class="en">' + esc(text) + '</span>' : ''; }

  /* ============ 路由 ============ */
  var NAV = [
    ['home', '首页 · 文化', '🏮'],
    ['dishes', '选菜 · 点菜', '🍽️'],
    ['prep', '备菜 · 砧板', '🔪'],
    ['cook', '烹饪 · 上灶', '🔥'],
    ['vocab', '词汇 · 语言', '📚'],
    ['quiz', '小测 · 闯关', '🏆'],
    ['progress', '我的厨房', '🐼']
  ];
  var current = { name: 'home', arg: null };

  function renderNav() {
    $('#nav').innerHTML = NAV.map(function (n) {
      return '<a class="nav-link' + (current.name === n[0] ? ' active' : '') + '" data-route="' + n[0] + '">' + n[2] + ' ' + n[1] + '</a>';
    }).join('');
  }
  function go(name, arg) { location.hash = '#/' + name + (arg ? '/' + arg : ''); }
  function parseHash() {
    var h = (location.hash || '#/home').replace(/^#\/?/, '');
    var parts = h.split('/');
    return { name: parts[0] || 'home', arg: parts[1] || null };
  }
  function route() {
    var r = parseHash();
    if (!NAV.some(function (n) { return n[0] === r.name; })) r.name = 'home';
    if (r.arg && dishById(r.arg)) S.dish = r.arg;
    current = r;
    renderNav();
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (r.name === 'home') renderHome();
    else if (r.name === 'dishes') renderDishes();
    else if (r.name === 'prep') renderPrep();
    else if (r.name === 'cook') renderCook();
    else if (r.name === 'vocab') renderVocab();
    else if (r.name === 'quiz') renderQuiz();
    else if (r.name === 'progress') renderProgress();
  }

  /* ============ 首页 ============ */
  function wokSvg() {
    return '<svg class="wok-illust" viewBox="0 0 320 300" aria-hidden="true">' +
      '<defs>' +
      '<radialGradient id="wokIn" cx="50%" cy="35%" r="70%">' +
      '<stop offset="0%" stop-color="#5c5049"/><stop offset="60%" stop-color="#3b332e"/><stop offset="100%" stop-color="#241f1c"/>' +
      '</radialGradient>' +
      '<linearGradient id="oilG" x1="0" y1="0" x2="1" y2="1">' +
      '<stop offset="0%" stop-color="#ffd894"/><stop offset="100%" stop-color="#e0a martin"/></linearGradient>' +
      '<linearGradient id="handleG" x1="0" y1="0" x2="0" y2="1">' +
      '<stop offset="0%" stop-color="#6b4a37"/><stop offset="100%" stop-color="#3c2a20"/></linearGradient>' +
      '</defs>' +
      '<path d="M300 120c-6-10-4-22 6-28 8-5 18-2 22 6" fill="none" stroke="url(#handleG)" stroke-width="16" stroke-linecap="round"/>' +
      '<circle cx="150" cy="160" r="112" fill="url(#wokIn)" stroke="#191512" stroke-width="9"/>' +
      '<ellipse cx="150" cy="168" rx="88" ry="72" fill="#f0b462" opacity=".92"/>' +
      '<ellipse cx="150" cy="168" rx="88" ry="72" fill="none" stroke="#d1963f" stroke-width="3" opacity=".7"/>' +
      '<g opacity=".95">' +
      '<ellipse cx="120" cy="156" rx="20" ry="14" fill="#e8613c"/>' +
      '<ellipse cx="176" cy="180" rx="18" ry="12" fill="#f2f0e6"/>' +
      '<ellipse cx="146" cy="196" rx="16" ry="11" fill="#c74a2b"/>' +
      '</g>' +
      '<g class="steam" opacity=".7"><path d="M120 120c-10-18 8-26 2-44 14 10 18 26 4 44z" fill="#fff"/></g>' +
      '<g class="steam s2" opacity=".6"><path d="M152 112c-10-20 10-28 4-46 14 12 18 28 4 46z" fill="#fff"/></g>' +
      '<g class="steam s3" opacity=".5"><path d="M184 122c-10-18 8-24 2-42 14 10 18 26 4 42z" fill="#fff"/></g>' +
      '</svg>';
  }

  function renderHome() {
    var stats = [
      ['8', '道菜谱可做'],
      ['20+', '常用味型'],
      ['150+', '拼音词汇'],
      ['100%', '中·英·拼音']
    ];
    var html = '';
    html += '<section class="hero"><div class="hero-copy">' +
      '<span class="eyebrow">国际中文教育 · 文化体验课</span>' +
      '<h1>在网上做一道<span>川菜</span><br>边动手，边学中文</h1>' +
      '<p class="lead">川味小厨房是为来华留学生设计的川菜文化学习网站。<span class="py">Chuānwèi xiǎochúfáng shì wèi láihuá liúxuéshēng shèjì de chuāncài wénhuà xuéxí wǎngzhàn.</span>' +
      '从选菜、逛菜市场、认识食材和调料，到真正开火下锅，一步一步动手做，让"麻辣鲜香"变成看得见、听得懂、说得出的事。</p>' +
      '<div class="hero-actions">' +
      '<button class="btn btn-primary" data-route="dishes">🍽️ 开始点菜</button>' +
      '<button class="btn" data-route="home" data-scroll="#culture">🏮 先看川菜文化</button>' +
      '<button class="btn btn-gold" id="randomDish">🎲 随机来一道</button>' +
      '</div>' +
      '<div class="hero-stats">' + stats.map(function (s) { return '<div class="stat"><b>' + s[0] + '</b><span>' + s[1] + '</span></div>'; }).join('') + '</div>' +
      '</div><div class="hero-art" style="align-content:start">' +
      '<div style="position:relative;width:100%;max-width:340px;margin:0 auto">' +
      '<img class="hero-photo" src="assets/img/hero.jpg" alt="一桌川菜" onerror="this.style.display=\'none\'">' +
      '<span class="floating-ing" style="left:4%;top:8%;animation-delay:.2s">🌶️</span>' +
      '<span class="floating-ing" style="right:6%;top:16%;animation-delay:1.1s">🫘</span>' +
      '<span class="floating-ing" style="left:10%;bottom:10%;animation-delay:.6s">🧄</span>' +
      '<span class="floating-ing" style="right:12%;bottom:6%;animation-delay:1.6s">🥢</span>' +
      '</div>' +
      '<p class="photo-credit" style="margin-top:8px">图：四川家常一桌菜（教学演示用图）</p>' +
      '</div></section>';

    html += '<section class="culture-section">' +
      '<div class="view-head"><span class="eyebrow">怎么用</span><h2 class="h2">三步，做出一道真正的川菜</h2>' +
      '<p class="lead">每个步骤都有中文、拼音和英文，还能点小喇叭听发音。<span class="en">Every step comes with Chinese, pinyin and English — tap the speaker to listen.</span></p></div>' +
      '<div class="grid grid-3">' +
      [['🍽️', '第一步 · 选菜点菜', '挑一道菜，看它的来历、味型、辣度和需要的食材。', '先去选菜', 'dishes'],
       ['🔪', '第二步 · 备菜认识食材', '在砧板上给食材配对处理方式：切丝、剁末还是拍碎？', '去备菜', 'prep'],
       ['🔥', '第三步 · 上灶模拟烹饪', '选火候、排顺序、快速翻炒、勾芡淋油，最后给菜品打分。', '去上灶', 'cook']]
      .map(function (c) {
        return '<div class="card card-lift">' +
          '<div style="font-size:34px">' + c[0] + '</div>' +
          '<h3 class="h3">' + c[1] + '</h3><p class="muted small">' + c[2] + '</p>' +
          '<button class="btn btn-sm" data-route="' + c[4] + '">' + c[3] + ' →</button></div>';
      }).join('') +
      '</div></section>';

    /* 文化长廊 */
    html += '<section class="culture-section" id="culture"><div class="view-head"><span class="eyebrow">文化长廊</span>' +
      '<h2 class="h2">川菜不只是"辣"</h2><p class="lead">这部分对应国际中文教育的文化教学：地理、历史、流派、餐桌礼仪和烹饪技法。</p></div>' +
      '<div class="grid grid-2">' +
      (CC.culture || []).map(function (c) {
        return '<article class="card card-lift culture-section">' +
          '<div class="section-title"><span class="emoji">' + c.emoji + '</span>' +
          '<div><h3 class="h3">' + esc(c.title) + ' ' + speakBtn(c.title) + '</h3>' +
          pyLine(c.py) + enLine(c.en) + '</div></div>' +
          '<p><strong>' + esc(c.lead.zh) + '</strong>' + pyLine(c.lead.py) + enLine(c.lead.en) + '</p>' +
          c.blocks.map(function (b) { return '<p class="small">' + esc(b.zh) + enLine(b.en) + '</p>'; }).join('') +
          '<div class="fact-list">' + c.facts.map(function (f) {
            return '<div class="fact"><div>' + esc(f.zh) + enLine(f.en) + '</div></div>';
          }).join('') + '</div>' +
          '</article>';
      }).join('') +
      '</div></section>';

    /* 味型转盘 */
    html += '<section class="culture-section"><div class="view-head"><span class="eyebrow">味型转盘</span>' +
      '<h2 class="h2">转一转，认识一个味型</h2>' +
      '<p class="lead">川菜讲究"一菜一格，百菜百味"。常说有二十多种味型，其中约一半和麻辣沾边，其余并不辣。<span class="en">Sichuan cooking has 20-odd flavour types — about half of them are not spicy at all.</span></p></div>' +
      '<div class="wheel-wrap"><div style="position:relative">' +
      '<span class="wheel-pointer">📍</span>' +
      '<div class="wheel" id="wheel"><div class="wheel-labels">' +
      (CC.flavors || []).map(function (f, i) {
        var a = i * 30 + 15;
        return '<span style="transform: rotate(' + a + 'deg) translateY(-38%) rotate(' + (-a) + 'deg)">' + esc(f.zh.replace('味', '')) + '</span>';
      }).join('') +
      '</div><div class="wheel-center" id="wheelCenter">点我<br>转一转</div></div></div>' +
      '<div class="card flavor-card" id="flavorCard"><h3 class="h3">今天是哪一味？</h3>' +
      '<p class="muted small">按下左边的转盘，会随机停在一个味型上，我给你讲讲它是什么味道、有哪些代表菜。</p></div>' +
      '</div></section>';

    /* 时间轴 */
    var tl = [
      ['🫘', '很久以前 · 花椒是主角', '花椒是中国本土香料，早在《诗经》里就有"椒聊之实，蕃衍盈升"的句子。辣椒进来之前，四川人的辛辣主要靠花椒、生姜和茱萸。'],
      ['🌶️', '明代末年 · 辣椒来了', '辣椒原产美洲，明代末年传入中国。明代《遵生八笺》里有"番椒……味辣色红，甚可观"的记载——那时它主要被当成观赏植物。'],
      ['🥫', '清代 · 豆瓣与麻辣成型', '相传康熙年间（约1688年），"湖广填四川"的移民陈逸仙把蚕豆带到郫县；咸丰三年（1853年），陈氏后人陈守信开设"益丰和"酱园，郫县豆瓣逐渐定型，被叫做"川菜之魂"。'],
      ['🍲', '今天 · 一菜一格，百菜百味', '川菜分成上河帮（成都、乐山）、下河帮（重庆、南充）、小河帮（自贡、宜宾）等流派，有麻辣、糊辣、鱼香、家常、怪味、荔枝、咸鲜等二十多种味型。']
    ];
    html += '<section class="culture-section"><div class="view-head"><span class="eyebrow">时间轴</span>' +
      '<h2 class="h2">麻辣是怎么一步步走上四川餐桌的</h2>' +
      '<p class="lead">点一下每一条，展开阅读。<span class="en">Tap a line to expand.</span></p></div>' +
      '<div class="card"><div class="timeline">' +
      tl.map(function (t, i) {
        return '<div class="timeline-item' + (i === 0 ? ' open' : '') + '" data-emoji="' + t[0] + '">' +
          '<h4>' + esc(t[1]) + '</h4><div class="timeline-body"><p class="small">' + esc(t[2]) + '</p></div></div>';
      }).join('') + '</div></div></section>';

    /* 三大流派 */
    html += '<section class="culture-section"><div class="view-head"><span class="eyebrow">三大流派</span>' +
      '<h2 class="h2">同一个四川，三种味道</h2></div><div class="grid grid-3">' +
      [['🏯', '上河帮 · 蓉派', '以成都、乐山为中心。口味相对清鲜温和，官府菜和小吃多，麻婆豆腐、回锅肉、宫保鸡丁都算这一路。'],
       ['🌉', '下河帮 · 渝派', '以重庆、南充为中心。江湖菜多，大方粗犷，酸菜鱼、毛血旺、烤鱼是代表。'],
       ['🧂', '小河帮 · 盐帮菜', '以自贡、宜宾为中心，来自盐场。味厚香浓、鲜辣刺激，代表菜有水煮牛肉、冷吃兔、火边子牛肉。']]
      .map(function (s) {
        return '<div class="card card-lift school-card"><div style="font-size:30px">' + s[0] + '</div>' +
          '<h3 class="h3">' + s[1] + '</h3><p class="small muted">' + s[2] + '</p></div>';
      }).join('') +
      '</div></section>';

    /* 盖碗茶 */
    html += '<section class="culture-section"><div class="view-head"><span class="eyebrow">餐桌文化</span>' +
      '<h2 class="h2">盖碗茶里的"天、地、人"</h2>' +
      '<p class="lead">成都人爱坐茶馆，一碗茶可以坐一下午。盖碗茶有三件，点一点看看它们叫什么。</p></div>' +
      '<div class="gaiwan-row">' +
      [['茶盖', 'chágài', 'lid', '天 · heaven'], ['茶碗', 'cháwǎn', 'bowl', '人 · people'], ['茶托', 'chátuō', 'saucer', '地 · earth']]
      .map(function (g, i) {
        return '<div class="gaiwan-part" data-speak="' + g[0] + '" data-i="' + i + '">' +
          '<span class="icon">' + ['🍵', '🥣', '🍽️'][i] + '</span>' +
          '<b>' + g[0] + '</b>' + pyLine(g[1]) + enLine(g[2]) +
          '<div class="tag" style="margin-top:6px">' + g[3] + '</div></div>';
      }).join('') +
      '</div>' +
      '<div class="card"><p class="small">在四川，聊天叫"摆龙门阵"，舒服叫"巴适"。请客时主人常说到"多吃点儿"，客人尝一口说"好吃！"主人会很高兴。现在的餐桌上还有公筷，大家一起吃也更卫生。</p></div>' +
      '</section>';

    /* 教学提示 + 参考资料 */
    html += '<section class="culture-section"><div class="grid grid-2">' +
      '<div class="card"><h3 class="h3">🧑‍🏫 给老师的使用建议</h3>' +
      '<p class="small">建议 1 课时（45 分钟）：10 分钟文化导入（首页时间轴 + 味型转盘），15 分钟备菜配对（词汇与"把"字句），20 分钟上灶模拟（火候、顺序、翻炒），最后用小测收尾。</p>' +
      '<p class="small">语言点：把字句（把豆腐切成小块）、先……然后……最后、越……越……、有点儿 / 太……了、火候与味道词汇。</p>' +
      '<p class="small muted">课堂建议：能投影就用投影一起做，学生轮流上来选火候、按翻炒；每个人再自己选一道菜完成一遍。</p></div>' +
      '<div class="card"><h3 class="h3">📖 内容依据</h3>' +
      '<p class="small">菜谱做法与文化说明参考公开资料整理，包括菜谱站（下厨房、豆果美食、美食天下、百度经验）、媒体与地方志类文章（澎湃新闻、网易、新浪、搜狐、腾讯新闻、简书等）。</p>' +
      '<p class="small muted">不同版本的川菜做法会有差异（例如干煸四季豆有"先焯水"和"直接干煸"两种做法），我们保留这些差异并说明来源，方便课堂讨论。历史上说法不一的（如担担面的起源地），文中用"相传""据记载"标明。</p>' +
      '<button class="btn btn-sm" id="openSources">查看资料清单</button></div>' +
      '</div></section>';

    app.innerHTML = html;

    /* 绑定 */
    $('#randomDish').addEventListener('click', function () {
      var d = (CC.dishes || [])[Math.floor(Math.random() * (CC.dishes || []).length)];
      Sfx.pop(); go('prep', d.id);
    });
    $('#wheelCenter').addEventListener('click', spinWheel);
    $('#openSources').addEventListener('click', showSources);
    $$('.timeline-item').forEach(function (it) {
      it.addEventListener('click', function () { it.classList.toggle('open'); Sfx.pop(); });
    });
    $$('.gaiwan-part').forEach(function (p) {
      p.addEventListener('click', function () {
        Sfx.ding();
        p.style.animation = 'none'; void p.offsetWidth; p.style.animation = 'popIn .5s both';
      });
    });
    pandaSay('home');
  }

  var wheelRot = 0;
  function spinWheel() {
    var f = CC.flavors || [];
    if (!f.length) return;
    var idx = Math.floor(Math.random() * f.length);
    wheelRot += 360 * 4 + (wheelRot % 360 ? 0 : 0) + idx * 30 + 15;
    var w = $('#wheel');
    w.style.transform = 'rotate(' + wheelRot + 'deg)';
    Sfx.sizzle();
    setTimeout(function () {
      var x = f[f.length - 1 - (idx % f.length)];
      var el = $('#flavorCard');
      el.innerHTML = '<h3 class="h3">' + esc(x.zh) + ' ' + speakBtn(x.zh) + '</h3>' + pyLine(x.py) + enLine(x.en) +
        '<div class="taste-chips"><span class="taste-chip">' + esc(x.taste) + '</span></div>' +
        '<p class="small">' + esc(x.desc.zh) + enLine(x.desc.en) + '</p>' +
        '<p class="small muted">代表菜：' + x.dishes.map(esc).join('、') + '</p>';
      Sfx.ding();
      pandaSay('home', '这个味型叫 <b>' + esc(x.zh) + '</b>，代表菜是' + esc(x.dishes[0]) + '。', 'happy');
    }, 4700);
  }

  function showSources() {
    openModal('<h2 class="h2">资料清单</h2>' +
      '<p class="small muted">下面是本次编写时实际查阅、抓取到的公开网页（按站点归类）。课堂使用时可以直接打开对照。</p>' +
      '<ul class="small">' +
      ['《成都通览》中关于担担面（1841 年，自贡小贩陈包包）的记载 —— 见搜狐《担担面制作技术详解》等整理文章',
       '回锅肉"一煮二炒三回锅"与"灯盏窝"的说法 —— 美食天下菜谱、搜狐《这才是回锅肉正宗做法》',
       '四季豆含皂甙与红细胞凝集素、必须彻底加热 —— 搜狐科普文章',
       '宫保鸡丁"糊辣荔枝味"碗汁比例（生抽 2 : 醋 1.5 : 糖 1 : 淀粉 0.5 : 水 3）—— 新浪新闻《宫保鸡丁的做法》',
       '麻婆豆腐用嫩豆腐 400 克、肉末、豆瓣酱、豆豉、花椒粉，分次勾芡 —— 网易《正宗麻婆豆腐做法全解析》、豆果美食菜谱',
       '水煮牛肉源于自贡盐场役牛、盐工以盐水加花椒辣椒煮食 —— 学术之家《水煮牛肉的来历》、今日头条文章',
       '夫妻肺片 20 世纪 30 年代由郭朝华、张田政夫妇创制，现主料为牛头皮、牛心、牛舌、牛肚 —— 简书《夫妻肺片做法》、澎湃新闻《成都市 长顺街：经典名菜夫妻肺片发源地》',
       '郫县豆瓣：相传康熙年间（1688 年）陈逸仙携蚕豆入蜀；咸丰三年（1853 年）陈守信开设"益丰和"酱园 —— 搜狐《川菜之魂：郫县豆瓣的历史》等',
       '辣椒明代末年传入中国，《遵生八笺》"番椒……味辣色红，甚可观" —— 公开科普文章整理',
       '油温"六成热"约 140–180 ℃，筷子下锅有细密小泡 —— 百度经验《油温六成热是什么怎么判断》',
       '川菜三大流派上河帮、下河帮、小河帮 —— 观察者网风闻《川菜的大流派有三个》等']
        .map(function (s) { return '<li style="margin-bottom:8px">' + esc(s) + '</li>'; }).join('') +
      '</ul>' +
      '<p class="small muted">说明：历史传说在不同资料里说法不完全一致（例如麻婆豆腐的"麻婆"是老板娘还是老板），本站保留了主要说法，并用"相传""据记载"标注可信度。</p>' +
      '<button class="btn btn-primary" data-close="1">知道了</button>');
  }

  /* ============ 选菜 ============ */
  var dishFilter = 'all';
  function renderDishes() {
    if (current.arg || S.dish) { /* 打开详情 */ }
    var filters = [['all', '全部'], ['easy', '简单（难度 1）'], ['hot', '能吃辣（辣度 3+）'], ['mild', '不太辣（辣度 ≤2）'], ['quick', '20 分钟以内'], ['veg', '素菜']];
    var html = '<div class="view"><div class="view-head"><span class="eyebrow">选菜 · 点菜</span>' +
      '<h1 class="h1">今天做哪一道？</h1>' +
      '<p class="lead">点开卡片看看这道菜的来历。选好之后，我们先去菜市场买齐食材，再回到砧板备菜。</p></div>' +
      '<div class="filters" id="filters">' + filters.map(function (f) {
        return '<button class="filter-chip' + (dishFilter === f[0] ? ' on' : '') + '" data-f="' + f[0] + '">' + f[1] + '</button>';
      }).join('') + '</div><div class="dish-grid" id="dishGrid"></div></div>';
    app.innerHTML = html;
    $$('#filters .filter-chip').forEach(function (b) {
      b.addEventListener('click', function () {
        dishFilter = b.dataset.f;
        $$('#filters .filter-chip').forEach(function (x) { x.classList.toggle('on', x === b); });
        paintDishes(); Sfx.pop();
      });
    });
    paintDishes();
    pandaSay('dishes');
  }
  function paintDishes() {
    var list = (CC.dishes || []).filter(function (d) {
      if (dishFilter === 'easy') return d.difficulty === 1;
      if (dishFilter === 'hot') return d.heat >= 3;
      if (dishFilter === 'mild') return d.heat <= 2;
      if (dishFilter === 'quick') return d.minutes <= 20;
      if (dishFilter === 'veg') return d.tags.indexOf('素菜') >= 0;
      return true;
    });
    $('#dishGrid').innerHTML = list.map(function (d) {
      var done = S.cooked[d.id];
      var heatDots = '';
      for (var i = 1; i <= 5; i++) heatDots += '<i class="heat-dot' + (i <= d.heat ? ' on' : '') + '"></i>';
      return '<div class="dish-card" data-dish="' + d.id + '">' +
        (done ? '<span class="ribbon">已完成 ' + '★'.repeat(done.stars) + '</span>' : '') +
        /* 盘子做成图片素材 + 内联样式叠加：不依赖外部 CSS，保证一定显示 */
        '<div class="dish-photo-wrap" style="position:relative;height:180px;display:grid;place-items:center;' +
        'background:repeating-linear-gradient(45deg,#efe3ce 0 8px,#f7efe0 8px 16px),linear-gradient(180deg,#f9f3e8,#eee2cd)">' +
        '<img src="assets/img/plate.png?v=7" alt="" style="position:absolute;width:174px;height:174px;z-index:1;' +
        'filter:drop-shadow(0 14px 22px rgba(96,72,48,.22))">' +
        (d.img
          ? '<img class="dish-photo" src="' + d.img + '" alt="' + esc(d.name) + '" loading="lazy" style="position:relative;z-index:2;' +
            'width:106px;height:106px;border-radius:50%;object-fit:cover;box-shadow:inset 0 -8px 18px rgba(0,0,0,.20)" ' +
            'onerror="this.style.display=\'none\';this.nextElementSibling.style.display=\'block\'">' +
            '<span class="emoji-fallback" style="display:none;position:relative;z-index:2;font-size:54px">' + d.emoji + '</span>'
          : '<span style="position:relative;z-index:2;font-size:54px">' + d.emoji + '</span>') +
        '</div>' +
        '<div class="dish-body">' +
        '<div class="dish-name">' + esc(d.name) + '</div>' + pyLine(d.py) + enLine(d.en) +
        '<div class="dish-meta"><span class="heat-dots" title="辣度">' + heatDots + '</span><span>⏱ ' + d.minutes + ' 分钟</span><span>难度 ' + '●'.repeat(d.difficulty) + '○'.repeat(3 - d.difficulty) + '</span></div>' +
        '<div class="dish-tags"><span class="tag">' + esc(d.flavor) + '</span>' + d.tags.slice(0, 2).map(function (t) { return '<span class="tag">' + esc(t) + '</span>'; }).join('') + '</div>' +
        '<div class="card-cta"><span class="muted small">' + esc(d.region) + '</span>' +
        '<button class="btn btn-sm btn-primary" data-pick="' + d.id + '">开始做 →</button></div>' +
        '</div></div>';
    }).join('');
    $$('#dishGrid .dish-card').forEach(function (c) {
      c.addEventListener('click', function (e) {
        if (e.target.closest('[data-pick]')) return;
        openDishModal(c.dataset.dish);
      });
    });
    $$('#dishGrid [data-pick]').forEach(function (b) {
      b.addEventListener('click', function (e) {
        e.stopPropagation(); S.dish = b.dataset.pick; save(); Sfx.pop(); go('prep', b.dataset.pick);
      });
    });
  }
  function openDishModal(id) {
    var d = dishById(id); if (!d) return;
    var prepDone = (S.prepped[id] || []).length, total = d.prep.length;
    openModal((d.img ? '<img class="modal-photo" src="' + d.img + '" alt="' + esc(d.name) + '" onerror="this.style.display=\'none\'">' : '<div style="font-size:48px;text-align:center">' + d.emoji + '</div>') +
      '<h2 class="h2" style="text-align:center">' + esc(d.name) + ' ' + speakBtn(d.name) + '</h2>' +
      '<div style="text-align:center">' + pyLine(d.py) + enLine(d.en) + '</div>' +
      '<div style="display:flex;gap:8px;justify-content:center;flex-wrap:wrap;margin:10px 0">' +
      '<span class="tag">' + esc(d.flavor) + '</span><span class="tag">辣度 ' + d.heat + '/5</span>' +
      '<span class="tag">' + d.minutes + ' 分钟</span><span class="tag">' + esc(d.region) + '</span></div>' +
      '<p class="small">' + esc(d.story.zh) + enLine(d.story.en) + '</p>' +
      '<p class="small muted">备菜进度：' + prepDone + '/' + total + '　' + (S.cooked[id] ? '已做过：' + '★'.repeat(S.cooked[id].stars) : '还没做过') + '</p>' +
      '<div style="display:flex;gap:10px;flex-wrap:wrap;margin-top:12px">' +
      '<button class="btn btn-primary" data-go="prep" data-id="' + id + '">🔪 去备菜</button>' +
      '<button class="btn" data-go="cook" data-id="' + id + '">🔥 直接上灶</button>' +
      '<button class="btn btn-gold" data-go="vocab" data-id="' + id + '">📚 先学这道菜的词</button>' +
      '<button class="btn" data-video="' + id + '">🎬 看真人做这道菜</button>' +
      '</div>');
  }

  /* ============ 备菜 ============ */
  function renderPrep() {
    var d = dishById(S.dish) || dishById((CC.dishes || [])[0].id);
    S.dish = d.id;
    var done = S.prepped[d.id] || [];
    var pct = Math.round(done.length / d.prep.length * 100);
    var html = '<div class="view"><div class="view-head"><span class="eyebrow">备菜 · 砧板</span>' +
      '<h1 class="h1">' + d.emoji + ' ' + esc(d.name) + ' 的备菜</h1>' +
      '<p class="lead">每种食材都要"处理"一下。看清它是什么，再选出正确的动作：切片？切丝？还是剁末？</p></div>' +
      dishStrip() +
      '<div class="board">' +
      '<div class="board-head">' +
      '<div class="board-dish"><span class="big">' + d.emoji + '</span><div>' +
      '<div class="dish-name">' + esc(d.name) + '</div>' + pyLine(d.py) + enLine(d.en) +
      '<div class="small muted">' + esc(d.flavor) + ' · ' + d.minutes + ' 分钟 · ' + esc(d.region) + '</div></div></div>' +
      '<div class="prep-progress"><div class="small muted">备菜进度 <b id="prepCount">' + done.length + ' / ' + d.prep.length + '</b></div>' +
      '<div class="progress-bar"><div class="progress-fill" id="prepFill" style="width:' + pct + '%"></div></div></div>' +
      '</div>' +
      '<div class="ing-grid" id="ingGrid"></div>' +
      '<div class="basket" id="basket"><span class="basket-label">🧺 备菜筐</span><span class="muted small">处理好的食材会放到这里</span></div>' +
      '<div style="display:flex;gap:10px;flex-wrap:wrap;margin-top:16px">' +
      '<button class="btn btn-primary" id="toCook">🔥 备好了，去上灶</button>' +
      '<button class="btn" id="prepAll">⚡ 一键备好（老师演示用）</button>' +
      '</div></div>' +

      '<section class="culture-section"><div class="view-head"><span class="eyebrow">调味台</span>' +
      '<h2 class="h2">这道菜要用到的调料</h2>' +
      '<p class="lead">点一下调料卡，听发音，看看它在川菜里做什么。<span class="en">Tap a card to hear it and learn its job.</span></p></div>' +
      '<div class="season-grid" id="seasonGrid"></div>' +
      (d.flavorTask ? '<div class="card flavor-task culture-section" id="flavorTask"></div>' : '') +
      '</section>' +
      '<section class="culture-section"><div class="card"><h3 class="h3">💡 这道菜的小窍门</h3>' +
      d.tips.map(function (t) { return '<p class="small">• ' + esc(t.zh) + enLine(t.en) + '</p>'; }).join('') +
      '<p class="small muted">看完了就去"上灶"吧，火候和顺序在等着你。</p></div></section>' +
      '</div>';
    app.innerHTML = html;
    bindStrip();

    paintIngredients(d);
    paintSeasonings(d);
    if (d.flavorTask) paintFlavorTask(d);
    $('#toCook').addEventListener('click', function () {
      var left = d.prep.length - (S.prepped[d.id] || []).length;
      if (left > 0) { toast('还有 ' + left + ' 种食材没处理，先完成或点"一键备好"'); Sfx.error(); pandaSay('prep', '还有 ' + left + ' 种食材没处理，确定不先备好它们吗？', 'oh'); }
      else go('cook', d.id);
    });
    $('#prepAll').addEventListener('click', function () {
      d.prep.forEach(function (p) { donePush(d.id, p.ing); });
      paintIngredients(d); paintBasket(d); Sfx.ding();
      awardBadge('knife');
    });
    pandaSay('prep');
  }
  function dishStrip() {
    return '<div class="dish-strip">' + (CC.dishes || []).map(function (d) {
      return '<button class="strip-item' + (S.dish === d.id ? ' on' : '') + '" data-strip="' + d.id + '">' +
        d.emoji + ' ' + esc(d.name) + '</button>';
    }).join('') + '</div>';
  }
  function bindStrip() {
    $$('.strip-item').forEach(function (b) {
      b.addEventListener('click', function () {
        S.dish = b.dataset.strip; save(); Sfx.pop();
        if (current.name === 'cook') renderCook(); else renderPrep();
      });
    });
  }
  function donePush(dishId, ingId) {
    if (!S.prepped[dishId]) S.prepped[dishId] = [];
    if (S.prepped[dishId].indexOf(ingId) < 0) S.prepped[dishId].push(ingId);
    save();
  }
  function paintIngredients(d) {
    var done = S.prepped[d.id] || [];
    $('#ingGrid').innerHTML = d.prep.map(function (p, i) {
      var ing = ingInfo(p.ing);
      var isDone = done.indexOf(p.ing) >= 0;
      var correct = p.prep;
      var opts = [correct];
      var k = 0;
      while (opts.length < 3 && k < PREP_POOL.length * 3) {
        var cand = PREP_POOL[(i * 5 + k * 3 + 1) % PREP_POOL.length];
        if (opts.indexOf(cand) < 0) opts.push(cand);
        k++;
      }
      opts = shuffle(opts);
      return '<div class="ingredient-tile' + (isDone ? ' done' : '') + '" data-ing="' + p.ing + '" data-correct="' + correct + '">' +
        (isDone ? '<span class="done-flag">已备好</span>' : '') +
        '<div class="ing-top"><span class="ing-emoji" draggable="true" data-drag="' + p.ing + '">' +
        '<img class="item-photo" src="assets/img/i/' + p.ing + '.jpg" alt="' + esc(ing.zh) + '" loading="lazy" onerror="this.style.display=\'none\';this.nextElementSibling.style.display=\'block\'">' +
        '<span class="item-emoji" style="display:none">' + ing.emoji + '</span></span>' +
        '<div><div class="ing-name">' + esc(ing.zh) + '</div>' + pyLine(ing.py) + '<div class="ing-qty">' + esc(p.qty) + ' · ' + esc(ing.en) + '</div></div></div>' +
        '<div class="ing-note">' + esc(p.note.zh) + enLine(p.note.en) + '</div>' +
        (isDone ? '<div class="sentence-pop">' + esc(PREP_SENTENCE[correct] ? PREP_SENTENCE[correct].zh(ing.zh) : '') +
          '<span class="en">' + esc(PREP_SENTENCE[correct] ? PREP_SENTENCE[correct].en(ing.en) : '') + '</span></div>' :
          '<div class="ing-actions">' + opts.map(function (o) {
            var a = CC.actions[o];
            return '<button class="action-btn" data-act="' + o + '">' + a.emoji + ' ' + esc(a.zh) + '</button>';
          }).join('') + '</div>') +
        '</div>';
    }).join('');
    bindIngredients(d);
    paintBasket(d);
  }
  function bindIngredients(d) {
    $$('#ingGrid .ingredient-tile').forEach(function (tile) {
      var ingId = tile.dataset.ing, correct = tile.dataset.correct;
      tile.addEventListener('click', function (e) {
        var btn = e.target.closest('[data-act]');
        if (!btn) return;
        if (tile.classList.contains('done')) return;
        judge(btn.dataset.act);
      });
      tile.addEventListener('dragover', function (e) {
        var btn = e.target.closest('[data-act]'); if (!btn) return;
        e.preventDefault(); btn.classList.add('dragover');
      });
      tile.addEventListener('dragleave', function (e) {
        var btn = e.target.closest('[data-act]'); if (btn) btn.classList.remove('dragover');
      });
      tile.addEventListener('drop', function (e) {
        var btn = e.target.closest('[data-act]'); if (!btn) return;
        e.preventDefault(); btn.classList.remove('dragover');
        judge(btn.dataset.act, btn);
      });
      function judge(actId, btn) {
        if (actId === correct) {
          donePush(d.id, ingId);
          Sfx.chop();
          if (btn) btn.classList.add('correct');
          tile.classList.add('done');
          var ing = ingInfo(ingId);
          setTimeout(function () {
            tile.outerHTML = '<div class="ingredient-tile done" data-ing="' + ingId + '">' +
              '<span class="done-flag">已备好</span>' +
              '<div class="ing-top"><span class="ing-emoji">' + ing.emoji + '</span>' +
              '<div><div class="ing-name">' + esc(ing.zh) + '</div>' + pyLine(ing.py) + '</div></div>' +
              '<div class="sentence-pop">' + esc(PREP_SENTENCE[correct].zh(ing.zh)) +
              '<span class="en">' + esc(PREP_SENTENCE[correct].en(ing.en)) + '</span></div></div>';
          }, 260);
          floatScore('+1 🥕', window.innerWidth - 130, window.innerHeight - 260);
          updatePrepProgress(d);
          paintBasket(d);
          pandaSay('correct', null, 'happy');
          if ((S.prepped[d.id] || []).length === d.prep.length) {
            awardBadge('knife');
            toast('备菜完成！可以去上灶了 🔥');
            pandaSay('prep', '全部备好了！<b>锅已经热了</b>，我们去上灶。', 'happy');
          }
        } else {
          Sfx.error();
          tile.classList.add('wrong');
          if (btn) btn.classList.add('wrong');
          setTimeout(function () { tile.classList.remove('wrong'); if (btn) btn.classList.remove('wrong'); }, 700);
          var a = CC.actions[correct];
          pandaSay('wrong', '再想想～这种食材要"<b>' + esc(a.zh) + '</b>"（' + esc(a.py) + '，' + esc(a.en) + '）。', 'oh');
        }
      }
    });
  }
  function paintBasket(d) {
    var done = S.prepped[d.id] || [];
    var b = $('#basket'); if (!b) return;
    b.innerHTML = '<span class="basket-label">🧺 备菜筐（' + done.length + '/' + d.prep.length + '）</span>' +
      (done.length ? done.map(function (id) {
        var ing = ingInfo(id);
        return '<span class="basket-item">' + ing.emoji + ' ' + esc(ing.zh) + '</span>';
      }).join('') : '<span class="muted small">处理好的食材会放到这里</span>');
  }
  function updatePrepProgress(d) {
    var done = (S.prepped[d.id] || []).length;
    var c = $('#prepCount'), f = $('#prepFill');
    if (c) c.textContent = done + ' / ' + d.prep.length;
    if (f) f.style.width = Math.round(done / d.prep.length * 100) + '%';
  }
  function paintSeasonings(d) {
    $('#seasonGrid').innerHTML = d.seasonings.map(function (id) {
      var s = seasonInfo(id) || ingInfo(id);
      var taste = (s.taste || []).map(function (t) { return '<span class="taste-chip">' + esc(t) + '</span>'; }).join('');
      var qty = (d.seasonQty || {})[id];
      return '<div class="season-card" data-speak="' + esc(s.zh) + '">' +
        '<div class="emoji"><img class="item-photo season-photo" src="assets/img/s/' + id + '.jpg" alt="' + esc(s.zh) + '" loading="lazy" onerror="this.style.display=\'none\';this.nextElementSibling.style.display=\'block\'">' +
        '<span class="item-emoji" style="display:none">' + s.emoji + '</span></div>' +
        '<div class="dish-name" style="font-size:15px">' + esc(s.zh) + '</div>' +
        pyLine(s.py) + enLine(s.en) +
        (qty ? '<div class="tag" style="margin-top:6px">用量 ' + esc(qty) + '</div>' : '') +
        (taste ? '<div style="margin-top:6px">' + taste + '</div>' : '') +
        '<div class="use">' + esc(s.use ? s.use.zh : (s.cat || '')) + '</div></div>';
    }).join('');
  }
  function paintFlavorTask(d) {
    var t = d.flavorTask;
    var box = $('#flavorTask');
    box.innerHTML = '<h3 class="h3">🎯 味型小任务：' + esc(d.flavor) + '</h3>' +
      '<p class="small">' + esc(t.question.zh) + enLine(t.question.en) + '</p>' +
      '<div class="option-row">' + t.options.map(function (o, i) {
        return '<button class="option-btn" data-i="' + i + '"><span class="opt-emoji">' + o.emoji + '</span>' + esc(o.zh) + '</button>';
      }).join('') + '</div>';
    $$('#flavorTask .option-btn').forEach(function (b) {
      b.addEventListener('click', function () {
        var o = t.options[+b.dataset.i];
        if (o.correct) {
          b.classList.add('correct'); Sfx.ding(); S.flavorCorrect++; save();
          box.insertAdjacentHTML('beforeend', '<div class="hint-box good"><span>✅</span><div>' + esc(t.explain.zh) + enLine(t.explain.en) + '</div></div>');
          $$('#flavorTask .option-btn').forEach(function (x) { x.disabled = true; });
          if (S.flavorCorrect >= 3) awardBadge('taste');
        } else {
          b.classList.add('wrong'); Sfx.error();
          pandaSay('wrong', '再试一个？想想这道菜的味型。', 'oh');
        }
      });
    });
  }

  /* ============ 烹饪模拟 ============ */
  var run = null;
  /* 真人做法视频（哔哩哔哩站外播放器） */
  var VIDEOS = {
    gongbao: { bvid: 'BV1NMXTYKE6M', title: '大厨教你宫保鸡丁的详细做法，鸡肉嫩滑不柴' },
    huiguo:  { bvid: 'BV14Qt8eZEdh', title: '【回锅肉】下饭菜经典，手把手保姆级教程' },
    dandan:  { bvid: 'BV1Gq4y1S7JT', title: '厨师长教你：四川担担面的家常做法' },
    feipian: { bvid: 'BV1fX4y1V7eR', title: '四川名菜：夫妻肺片，老师傅详细解说' },
    ganbian: { bvid: 'BV1kT411T7z8', title: '干煸四季豆做法真的很简单，翠绿入味' }
  };
  function openVideo(d) {
    if (!d) return;
    var v = VIDEOS[d.id];
    var search = 'https://search.bilibili.com/all?keyword=' + encodeURIComponent(d.name + ' 做法');
    if (v) {
      openModal('<h3 class="h3">🎬 ' + esc(d.name) + ' · 真人做法</h3>' +
        '<p class="small muted">' + esc(v.title) + '　（来源：哔哩哔哩，站外视频）</p>' +
        '<div style="position:relative;padding-top:56.25%;border-radius:14px;overflow:hidden;box-shadow:var(--shadow-m)">' +
        '<iframe src="//player.bilibili.com/player.html?bvid=' + v.bvid + '&autoplay=0&high_quality=1&danmaku=0" ' +
        'style="position:absolute;inset:0;width:100%;height:100%" frameborder="0" scrolling="no" allowfullscreen></iframe></div>' +
        '<div style="display:flex;gap:10px;flex-wrap:wrap;margin-top:14px">' +
        '<a class="btn btn-primary btn-sm" href="https://www.bilibili.com/video/' + v.bvid + '" target="_blank" rel="noopener">↗ 在 B 站打开</a>' +
        '<a class="btn btn-sm" href="' + search + '" target="_blank" rel="noopener">🔍 搜更多做法</a>' +
        '<button class="btn btn-sm" data-close="1">关闭</button></div>');
    } else {
      openModal('<h3 class="h3">🎬 ' + esc(d.name) + ' · 真人做法</h3>' +
        '<p class="small">这道菜还没挂固定的视频源。建议先看一遍真人实拍，再回到"上灶"自己动手做一遍。</p>' +
        '<a class="btn btn-primary" href="' + search + '" target="_blank" rel="noopener">↗ 在 B 站搜索"' + esc(d.name) + ' 做法"</a>');
    }
  }
  function renderCook() {
    var d = dishById(S.dish) || dishById((CC.dishes || [])[0].id);
    S.dish = d.id;
    run = { dishId: d.id, step: 0, contents: [], rendered: 0, heat: null,
            color: 100, aroma: 100, taste: 100, mistakes: 0, heatMistakes: 0, stirs: 0, done: false };
    app.innerHTML = '<div class="view"><div class="view-head"><span class="eyebrow">烹饪 · 上灶</span>' +
      '<h1 class="h1">' + d.emoji + ' 开始炒' + esc(d.name) + '</h1>' +
      '<p class="lead">每一步都要你做决定：用什么火？先放什么？翻炒几下？选错了我会提醒你，别怕。</p></div>' +
      dishStrip() +
      '<div class="cook-layout">' +
      '<div class="wok-stage" id="wokStage">' +
      '<span class="stage-label">🥘 炒锅</span><span class="stage-temp" id="stageTemp">还没开火</span>' +
      '<button class="btn btn-gold btn-sm" id="autoBtn" style="position:absolute;top:10px;right:104px;z-index:3">▶ 自动演示全流程</button>' +
      '<button class="btn btn-sm" id="videoBtn" style="position:absolute;top:10px;right:14px;z-index:3">🎬 真人做法</button>' +
      '<div class="wok" id="wok">' + wokFace() +
      '<img class="wok-real" src="assets/img/wok.png" alt="炒锅" onerror="this.remove()">' +
      '<div class="wok-food" id="wokFood">' +
      (d.img ? '<img class="wok-photo" id="wokPhoto" src="' + d.img + '" alt="' + esc(d.name) + '">' : '') +
      '<span class="wok-sheen"></span></div>' +
      '<svg class="spatula" id="spatula" viewBox="0 0 120 120" aria-hidden="true">' +
      '<rect x="70" y="66" width="46" height="12" rx="6" fill="#6b4a37" transform="rotate(-38 93 72)"/>' +
      '<path d="M8 66c0-15 13-25 28-25h22c4 0 7 3 7 7v22c0 4-3 7-7 7H36C21 77 8 81 8 66z" fill="#c9ccd1" stroke="#8e9299" stroke-width="3"/>' +
      '</svg></div>' +
      '<div class="fire-row" id="fireRow"><i class="flame"></i><i class="flame"></i><i class="flame"></i><i class="flame"></i></div>' +
      '<div class="puffs" id="puffs"></div>' +
      '<div class="score-strip" style="margin-top:14px">' +
      ['色 color', '香 aroma', '味 taste'].map(function (s, i) {
        var k = ['color', 'aroma', 'taste'][i];
        return '<div class="score-item"><div class="small muted">' + s + '</div>' +
          '<b id="score-' + k + '" style="font-size:20px;color:var(--red)">100</b>' +
          '<div class="bar"><i id="bar-' + k + '" style="width:100%"></i></div></div>';
      }).join('') +
      '</div></div>' +
      '<div class="step-panel" id="stepPanel"></div>' +
      '</div></div>';
    bindStrip();
    $('#autoBtn').addEventListener('click', startAuto);
    $('#videoBtn').addEventListener('click', function () { stopAuto(); openVideo(d); });
    renderStep();
    pandaSay('cook');
  }
  /* ---- 自动演示：整道菜连续播放动画 ---- */
  var autoTimer = null;
  function stopAuto() {
    if (autoTimer) { clearTimeout(autoTimer); autoTimer = null; }
    var b = $('#autoBtn'); if (b) b.textContent = '▶ 自动演示全流程';
  }
  function autoCard(d, st, i) {
    var dots = d.steps.map(function (_, k) {
      return '<i class="dot' + (k < i ? ' done' : k === i ? ' now' : '') + '"></i>';
    }).join('');
    var label = { heat: '🔥 调火候', order: '🥢 下锅', season: '🥄 调味', stir: '💨 翻炒', wait: '⏳ 烧制', finish: '🍽️ 出锅' }[st.type] || '步骤';
    $('#stepPanel').innerHTML = stepPhotoBlock(d, i) + '<div class="card step-card">' +
      '<div class="step-dots">' + dots + '</div>' +
      '<span class="step-badge" style="margin-top:10px">' + label + ' · 第 ' + (i + 1) + ' / ' + d.steps.length + ' 步' + (st.heat ? ' · ' + CC.heat[st.heat].zh : '') + '</span>' +
      '<div class="step-instruction">' + esc(st.zh) + '</div>' + pyLine(st.py) + enLine(st.en) +
      (st.tip ? '<div class="hint-box good" style="margin-top:12px"><span>🐼</span><div>' + esc(st.tip.zh) + enLine(st.tip.en) + '</div></div>' : '') +
      '</div>' +
      '<div class="card"><p class="small muted">自动演示中……想看完整效果，也可以暂停后自己动手做一次。</p>' +
      '<button class="btn btn-sm" id="stopAutoBtn">⏸ 暂停演示</button> ' +
      '<button class="btn btn-sm" id="restartBtn">🔄 自己动手做</button></div>';
    var sb = $('#stopAutoBtn'); if (sb) sb.addEventListener('click', stopAuto);
    var rb = $('#restartBtn'); if (rb) rb.addEventListener('click', function () { stopAuto(); renderCook(); });
  }
  function startAuto() {
    if (autoTimer) { stopAuto(); return; }
    var d = dishById(run.dishId);
    run.demo = true;
    var b = $('#autoBtn'); if (b) b.textContent = '⏸ 暂停演示';
    var i = 0;
    (function play() {
      if (i >= d.steps.length) { stopAuto(); run.step = d.steps.length; finishDish(); return; }
      var st = d.steps[i];
      if (st.heat) setFlame(st.heat);
      if (st.type === 'stir') {
        for (var k = 0; k < 3; k++) {
          (function (k2) { setTimeout(function () { toss(); sweepSpatula(); Sfx.stir(); }, k2 * 240); })(k);
        }
      }
      if (st.type === 'season') pourIn();
      if (st.type === 'wait') Sfx.bubble();
      if (st.add && st.add.length) addFood(st.add);
      run.step = i; cookProgress();
      autoCard(d, st, i);
      pandaSay('cook', '<b>' + esc(st.zh) + '</b><span class="en">' + esc(st.en) + '</span>');
      i++;
      autoTimer = setTimeout(play, st.type === 'stir' ? 1700 : st.type === 'wait' ? 2200 : 1600);
    })();
  }
  function wokFace() {
    return '<svg class="wok-svg" viewBox="0 0 400 380" aria-hidden="true">' +
      '<defs><radialGradient id="wi" cx="50%" cy="32%" r="72%">' +
      '<stop offset="0%" stop-color="#6a5b52"/><stop offset="55%" stop-color="#413832"/><stop offset="100%" stop-color="#251f1c"/></radialGradient></defs>' +
      '<rect x="352" y="176" width="48" height="20" rx="10" fill="#4b352a"/>' +
      '<circle cx="200" cy="190" r="152" fill="url(#wi)" stroke="#1c1815" stroke-width="12"/>' +
      '<ellipse cx="200" cy="200" rx="118" ry="98" fill="#eab35f" opacity=".9"/>' +
      '<ellipse cx="200" cy="200" rx="118" ry="98" fill="none" stroke="#cf9538" stroke-width="3" opacity=".6"/>' +
      '</svg>';
  }
  function renderStep() {
    window.__stir = null;
    var d = dishById(run.dishId), st = d.steps[run.step], panel = $('#stepPanel');
    if (!st) return finishDish();
    panel.innerHTML = stepPhotoBlock(d, run.step) + '<div class="card step-card" id="stepCard"></div><div class="card"><h3 class="h3">🐼 胖达提示</h3><p class="small" id="stepTip"></p></div>';
    panel = $('#stepCard');
    var dots = d.steps.map(function (_, i) {
      return '<i class="dot' + (i < run.step ? ' done' : i === run.step ? ' now' : '') + '"></i>';
    }).join('');
    var label = { heat: '🔥 火候', order: '🥢 下锅顺序', season: '🥄 调味', stir: '💨 翻炒', wait: '⏳ 计时', finish: '🍽️ 上菜' }[st.type] || '步骤';
    var head = '<div class="step-dots">' + dots + '</div>' +
      '<span class="step-badge" style="margin-top:10px">' + label + ' · 第 ' + (run.step + 1) + ' / ' + d.steps.length + ' 步</span>' +
      '<div class="step-instruction">' + esc(st.zh) + ' ' + speakBtn(st.zh) + '</div>' + pyLine(st.py) + enLine(st.en);
    var body = '';
    if (st.type === 'heat') {
      body = '<div class="heat-row-ui">' + ['da', 'zhong', 'xiao'].map(function (h) {
        var x = CC.heat[h];
        return '<button class="heat-btn" data-heat="' + h + '"><span class="fl">' + x.emoji + '</span>' + x.zh +
          '<div class="small muted">' + esc(x.py) + '</div></button>';
      }).join('') + '</div>';
    } else if (st.type === 'order' || st.type === 'season') {
      body = '<div class="option-row">' + st.options.map(function (o) {
        return '<button class="option-btn" data-opt="' + o.id + '"><span class="opt-emoji">' + (o.emoji || '') + '</span>' + esc(o.zh) + '</button>';
      }).join('') + '</div>';
    } else if (st.type === 'stir') {
      body = '<div class="stir-wrap">' +
        '<div class="small">' + esc(st.word || '翻炒') + '：<b id="stirCount">0</b> / ' + st.target + '　（也可以按空格键）</div>' +
        '<div class="stir-meter"><div class="stir-fill" id="stirFill"></div></div>' +
        '<button class="stir-btn" id="stirBtn">🥄 翻炒！</button>' +
        '<div class="small muted">限时 <b id="stirTime">' + st.seconds + '</b> 秒，快一点，别把菜炒糊了。</div></div>';
    } else if (st.type === 'wait') {
      body = '<div style="text-align:center">' +
        '<div class="timer-ring" id="timerRing"><div class="bubbles" id="bubbles"></div><div><div class="t-val" id="tVal">' + st.seconds + 's</div>' +
        '<div class="t-label">' + esc(st.label || '计时中') + '</div></div></div>' +
        '<p class="small muted" style="margin-top:8px">课堂加速：真实的 ' + esc(st.label || '') + ' 在这里只需要几秒。<span class="en">Classroom speed-up.</span></p>' +
        '<button class="btn btn-primary" id="startWait" style="margin-top:6px">▶ 开始计时</button></div>';
    } else if (st.type === 'finish') {
      body = '<div style="text-align:center;margin-top:10px"><button class="btn btn-primary" id="serveBtn">🍽️ 出锅装盘</button></div>';
    }
    panel.innerHTML = '<div class="card step-card">' + head + body +
      '<div id="stepFeedback"></div></div>' +
      '<div class="card"><h3 class="h3">🐼 胖达提示</h3><p class="small" id="stepTip">' +
      esc(st.tip ? st.tip.zh : '') + (st.tip ? '<span class="en">' + esc(st.tip.en) + '</span>' : '') + '</p></div>';
    $('#stepPanel').innerHTML = stepPhotoBlock(d, run.step) + panel.innerHTML;
    bindStep(st, d);
  }

  /* 真实步骤图：显示当前步骤对应的实拍图 + 缩略图条 */
  function stepPhotoBlock(d, stepIndex) {
    var imgs = (window.STEP_IMAGES || {})[d.id] || [];
    if (!imgs.length) return '';
    var idx = Math.min(stepIndex, imgs.length - 1);
    var base = 'assets/img/step/' + d.id + '/';
    var strip = imgs.map(function (f, i) {
      return '<img src="' + base + f + '" class="' + (i === idx ? 'on' : '') + '" data-jump="' + i + '" alt="第' + (i + 1) + '步" loading="lazy">';
    }).join('');
    return '<div class="step-photo-wrap">' +
      '<img class="step-photo" src="' + base + imgs[idx] + '" alt="' + esc(d.name) + ' 第' + (idx + 1) + '步">' +
      '<span class="step-photo-cap">真实做法 · 步骤图 ' + (idx + 1) + ' / ' + imgs.length + '</span></div>' +
      '<div class="step-strip" id="stepStrip">' + strip + '</div>' +
      '<p class="step-source">步骤图来自公开菜谱分享（小红书），用于课堂演示，版权归原作者。</p>';
  }
  function feedback(ok, zh, en) {
    var box = $('#stepFeedback'); if (!box) return;
    box.innerHTML = '<div class="hint-box ' + (ok ? 'good' : 'bad') + '"><span>' + (ok ? '✅' : '⚠️') + '</span><div>' +
      esc(zh) + (en ? '<span class="en">' + esc(en) + '</span>' : '') + '</div></div>';
  }
  function bindStep(st, d) {
    var timerHandle = null, stirHandle = null;
    if (st.type === 'heat') {
      $$('#stepPanel .heat-btn').forEach(function (b) {
        b.addEventListener('click', function () {
          var h = b.dataset.heat;
          if (h === st.heat) {
            b.classList.add('correct'); run.heat = h; setFlame(h); Sfx.sizzle();
            feedback(true, '火候对了！' + CC.heat[h].zh + '（' + CC.heat[h].py + '）', CC.heat[h].en + '. ' + (st.tip ? st.tip.en : ''));
            pandaSay('correct', null, 'happy');
            completeStep();
          } else {
            b.classList.add('wrong'); Sfx.error();
            run.mistakes++; run.heatMistakes++;
            run.aroma = Math.max(30, run.aroma - 8); run.color = Math.max(30, run.color - 6);
            updateScoreUI();
            smoke();
            feedback(false, '火候不对：你用' + CC.heat[h].zh + '，这道菜这一步要用' + CC.heat[st.heat].zh + '。' + (st.tip ? st.tip.zh : ''),
              'You chose ' + CC.heat[h].en + ' but this step needs ' + CC.heat[st.heat].en + '.');
            pandaSay('wrong', '火候是川菜的命门：这一步要用 <b>' + esc(CC.heat[st.heat].zh) + '</b>。', 'oh');
          }
        });
      });
    } else if (st.type === 'order' || st.type === 'season') {
      $$('#stepPanel .option-btn').forEach(function (b) {
        b.addEventListener('click', function () {
          var id = b.dataset.opt;
          if (id === st.answer) {
            b.classList.add('correct'); Sfx.sizzle(); pourIn();
            feedback(true, '正确！' + (st.tip ? st.tip.zh : ''), st.tip ? st.tip.en : '');
            pandaSay('correct', null, 'happy');
            completeStep();
          } else {
            b.classList.add('wrong'); Sfx.error();
            run.mistakes++; run.taste = Math.max(35, run.taste - 7); updateScoreUI();
            feedback(false, '这一步先不要放它。想想看：' + (st.tip ? st.tip.zh : ''), st.tip ? st.tip.en : '');
            pandaSay('wrong', null, 'oh');
          }
        });
      });
    } else if (st.type === 'stir') {
      var count = 0, left = st.seconds, armed = true;
      var fill = $('#stirFill'), cnt = $('#stirCount'), tEl = $('#stirTime'), btn = $('#stirBtn');
      function armTimer() {
        clearInterval(stirHandle);
        left = st.seconds;
        if (tEl) tEl.textContent = left;
        stirHandle = setInterval(function () {
          left--;
          if (tEl) tEl.textContent = Math.max(0, left);
          if (left <= 0) {
            clearInterval(stirHandle); stirHandle = null;
            if (count < st.target) {
              run.mistakes++; run.taste = Math.max(35, run.taste - 6); updateScoreUI();
              feedback(false, '时间到了，才炒了 ' + count + ' 下。川菜讲究大火快炒，手要快一点！', 'Not enough tossing — Sichuan stir-fry is fast.');
              pandaSay('wrong', '慢了半拍～点"再炒一次"，这次手快一点！', 'oh');
              armed = false; count = 0;
              if (btn) btn.textContent = '↻ 再炒一次（还差 ' + st.target + ' 下）';
              if (fill) fill.style.width = '0%';
              if (cnt) cnt.textContent = '0';
            }
          }
        }, 1000);
      }
      function stir() {
        if (run.done) return;
        if (!armed) { armed = true; if (btn) btn.textContent = '🥄 翻炒！'; armTimer(); }
        count++; S.stirs++; run.stirs++; save();
        if (cnt) cnt.textContent = count;
        if (fill) fill.style.width = Math.min(100, count / st.target * 100) + '%';
        toss(); sweepSpatula(); Sfx.stir();
        $$('#wokFood .food-item').forEach(function (f, i) {
          f.classList.remove('hop'); void f.offsetWidth;
          f.style.animationDelay = (i * 20) + 'ms';
          f.classList.add('hop');
        });
        if (count >= st.target) {
          clearInterval(stirHandle); stirHandle = null;
          window.__stir = null;
          Sfx.ding();
          run.aroma = Math.min(100, run.aroma + 6); updateScoreUI();
          feedback(true, '炒到位了！闻到"锅气"了吗？', 'That aroma is "wok breath" — 锅气.');
          pandaSay('correct', '这就是四川人说的 <b>锅气</b>！', 'happy');
          if (S.stirs >= 100) awardBadge('stir');
          completeStep();
        }
      }
      window.__stir = stir;
      if (btn) btn.addEventListener('click', stir);
      armTimer();
    } else if (st.type === 'wait') {
      $('#startWait').addEventListener('click', function () {
        var el = $('#timerRing'), total = st.seconds, t0 = performance.now();
        $('#startWait').disabled = true;
        var bubbles = $('#bubbles');
        for (var i = 0; i < 8; i++) {
          var b = document.createElement('i');
          b.className = 'bubble';
          b.style.left = (8 + i * 11) + '%';
          b.style.animationDelay = (i * 0.2) + 's';
          bubbles.appendChild(b);
        }
        var bl = setInterval(function () { Sfx.bubble(); }, 500);
        (function tick(now) {
          var p = Math.min(1, (now - t0) / (total * 1000));
          el.style.setProperty('--p', (p * 100).toFixed(1));
          $('#tVal').textContent = Math.max(0, Math.ceil(total - (now - t0) / 1000)) + 's';
          if (p < 1) requestAnimationFrame(tick);
          else {
            clearInterval(bl);
            Sfx.ding();
            feedback(true, '时间到！' + (st.tip ? st.tip.zh : ''), st.tip ? st.tip.en : '');
            pandaSay('correct', '时间刚刚好！', 'happy');
            completeStep();
          }
        })(t0);
      });
    } else if (st.type === 'finish') {
      $('#serveBtn').addEventListener('click', function () {
        addFood(st.add || []);
        Sfx.sizzle(); completeStep();
      });
    }
  }
  function completeStep() {
    var d = dishById(run.dishId), st = d.steps[run.step];
    addFood(st.add || []); cookProgress();
    setTimeout(function () {
      run.step++;
      if (run.step >= d.steps.length) finishDish();
      else renderStep();
    }, 850);
  }
  /* ---- 真实烹饪动画：抛料、溅油、蒸汽、倒汁、锅铲 ---- */
  var steamTimer = null;
  /* emoji → 真实照片：只保留"一个 emoji 只指一种东西"的确定映射，
     含糊的（🌶️ 可能是干辣椒/泡椒/辣椒油，🍽️ 是盘子还是整桌菜）一律不动。
     具体食材/调料一律按 id 找照片，不靠 emoji 猜。 */
  var EMOJI_IMG = {
    '🥘': 'assets/img/wok.png',        // 炒锅
    '🧄': 'assets/img/i/dasuan.jpg',    // 大蒜
    '🫚': 'assets/img/i/shengjiang.jpg',// 生姜
    '🥩': 'assets/img/i/niurou.jpg',    // 牛肉
    '🥓': 'assets/img/i/wuhuarou.jpg',  // 猪肉/五花肉
    '🍗': 'assets/img/i/jirou.jpg',     // 鸡肉
    '🥚': 'assets/img/i/jidan.jpg',     // 鸡蛋
    '🍜': 'assets/img/i/miantiao.jpg',  // 面条
    '🫛': 'assets/img/i/sijidou.jpg',   // 四季豆
    '🍄': 'assets/img/i/muer.jpg',      // 木耳
    '🎋': 'assets/img/i/dongsun.jpg'    // 冬笋
  };
  function foodVisual(emoji, cls) {
    var src = EMOJI_IMG[emoji];
    if (!src) return '<span class="' + (cls || '') + '">' + emoji + '</span>';
    return '<span class="' + (cls || '') + '" style="display:block">' +
      '<img class="food-photo" src="' + src + '" alt="" loading="lazy" ' +
      'onerror="this.parentNode.textContent=\'' + emoji + '\'">' +
      '<span class="food-photo-fb" style="display:none">' + emoji + '</span></span>';
  }
  function steamLevel() {
    var lv = ($('#fireRow') ? $$('#fireRow .flame.on').length : 0);
    return lv || 1;
  }
  function steamLoop() {
    if (steamTimer) return;
    steamTimer = setInterval(function () {
      var layer = $('#wokFood'); if (!layer) { clearInterval(steamTimer); steamTimer = null; return; }
      var n = steamLevel() + 1;
      for (var i = 0; i < n; i++) {
        var s = document.createElement('span');
        s.className = 'steam-puff';
        s.style.left = (16 + Math.random() * 62) + '%';
        s.style.bottom = (16 + Math.random() * 26) + '%';
        s.style.setProperty('--sx', ((Math.random() - 0.5) * 60).toFixed(0) + 'px');
        s.style.width = s.style.height = (22 + Math.random() * 26).toFixed(0) + 'px';
        layer.appendChild(s);
        setTimeout(function (el) { return function () { el.remove(); }; }(s), 2600);
      }
    }, 340);
  }
  function stopSteam() { if (steamTimer) { clearInterval(steamTimer); steamTimer = null; } }
  function splashFx() {
    var layer = $('#wokFood'); if (!layer) return;
    var ring = document.createElement('span');
    ring.className = 'splash';
    ring.style.left = (32 + Math.random() * 36) + '%';
    ring.style.top = (40 + Math.random() * 26) + '%';
    layer.appendChild(ring);
    setTimeout(function () { ring.remove(); }, 800);
    for (var i = 0; i < 7; i++) {
      var d = document.createElement('span');
      d.className = 'oil-drop';
      d.style.left = (30 + Math.random() * 40) + '%';
      d.style.top = (44 + Math.random() * 22) + '%';
      d.style.setProperty('--jx', ((Math.random() - 0.5) * 150).toFixed(0) + 'px');
      d.style.setProperty('--jy', (-(40 + Math.random() * 80)).toFixed(0) + 'px');
      d.style.animationDelay = (i * 30) + 'ms';
      layer.appendChild(d);
      setTimeout(function (el) { return function () { el.remove(); }; }(d), 1200);
    }
    Sfx.sizzle();
  }
  function dropFx(emoji, i) {
    var layer = $('#wokFood'); if (!layer) return;
    var el = document.createElement('span');
    el.className = 'drop-item';
    el.innerHTML = foodVisual(emoji);
    el.style.left = (30 + Math.random() * 40) + '%';
    el.style.setProperty('--dx', ((Math.random() - 0.5) * 80).toFixed(0) + 'px');
    el.style.animationDelay = (i * 90) + 'ms';
    layer.appendChild(el);
    setTimeout(function () { el.remove(); }, 1100 + i * 90);
    setTimeout(splashFx, 620 + i * 90);
  }
  function pourIn() {
    var layer = $('#wokFood'); if (!layer) return;
    var p = document.createElement('span');
    p.className = 'pour-stream';
    layer.appendChild(p);
    setTimeout(function () { p.remove(); }, 1000);
    setTimeout(splashFx, 700);
  }
  function sweepSpatula() {
    var sp = $('#spatula'); if (!sp) return;
    sp.classList.remove('on'); void sp.offsetWidth; sp.classList.add('on');
  }
  function cookProgress() {
    var d = dishById(run.dishId), ph = $('#wokPhoto');
    if (!ph) return;
    /* 步骤照里通常已经包含锅/盘，直接贴进锅会"锅里套锅"。
       所以锅里不用步骤照，只靠"去背食材 + 火候 + 锅气"表现，步骤照放在右侧当大图参考。 */
    ph.style.opacity = Math.min(0.92, (run.step / d.steps.length) * 1.05);
  }

  function addFood(emojis) {
    var layer = $('#wokFood'); if (!layer) return;
    var hasStep = ((window.STEP_IMAGES || {})[run.dishId] || []).length > 0;
    emojis.forEach(function (e, i) { if (e !== '🥄' && e !== '💨') dropFx(e, i); });
    emojis.forEach(function (e) { run.contents.push(e); });
    run.rendered = run.contents.length; splashFx(); return;
    for (var i = run.rendered; i < run.contents.length; i++) {
      var el = document.createElement('span');
      el.className = 'food-item';
      el.innerHTML = foodVisual(run.contents[i]);
      var a = (i * 137.5) * Math.PI / 180;
      var rad = 0.28 + 0.42 * ((i % 3) / 2);
      var fw = (layer.clientWidth || 220) / 2, fh = (layer.clientHeight || 180) / 2;
      el.style.setProperty('--fx', (Math.cos(a) * rad * fw).toFixed(1) + 'px');
      el.style.setProperty('--fy', (Math.sin(a) * rad * fh).toFixed(1) + 'px');
      el.style.setProperty('--fr', ((i * 37) % 30 - 15) + 'deg');
      layer.appendChild(el);
    }
    run.rendered = run.contents.length;
  }
  function setFlame(level) {
    var lv = CC.heat[level] ? CC.heat[level].level : 0;
    var stage = $('#wokStage');
    stage.classList.remove('heat-da', 'heat-xiao');
    if (level === 'da') stage.classList.add('heat-da');
    if (level === 'xiao') stage.classList.add('heat-xiao');
    $$('#fireRow .flame').forEach(function (f, i) {
      f.className = 'flame' + (i < lv ? ' on' : '') + ' lv' + Math.max(1, lv) + (i < lv ? ' flame-flicker' : '');
    });
    if (lv > 0) steamLoop();
    $('#stageTemp').textContent = level ? CC.heat[level].zh + ' · ' + CC.heat[level].py : '还没开火';
  }
  function toss() {
    var w = $('#wok');
    w.classList.remove('tossing'); void w.offsetWidth; w.classList.add('tossing');
    var puffs = $('#puffs');
    for (var i = 0; i < 3; i++) {
      var p = document.createElement('i');
      p.className = 'puff';
      p.style.left = (18 + Math.random() * 60) + '%';
      p.style.bottom = (10 + Math.random() * 20) + '%';
      p.style.animationDelay = (i * 90) + 'ms';
      puffs.appendChild(p);
      setTimeout(function (el) { return function () { el.remove(); }; }(p), 1700);
    }
  }
  function smoke() {
    var puffs = $('#puffs');
    for (var i = 0; i < 6; i++) {
      var p = document.createElement('i');
      p.className = 'puff';
      p.style.background = 'radial-gradient(circle, rgba(90,80,75,.75), rgba(90,80,75,0))';
      p.style.left = (10 + Math.random() * 70) + '%';
      p.style.bottom = (16 + Math.random() * 30) + '%';
      p.style.animationDelay = (i * 70) + 'ms';
      puffs.appendChild(p);
      setTimeout(function (el) { return function () { el.remove(); }; }(p), 1700);
    }
  }
  function updateScoreUI() {
    ['color', 'aroma', 'taste'].forEach(function (k) {
      var v = Math.round(run[k]);
      var n = $('#score-' + k), b = $('#bar-' + k);
      if (n) n.textContent = v;
      if (b) b.style.width = v + '%';
    });
  }
  function finishDish() {
    if (run.done) return;
    run.done = true;
    stopSteam();
    var phx = $('#wokPhoto'); if (phx) phx.style.opacity = 1;
    var d = dishById(run.dishId);
    var avg = Math.round((run.color + run.aroma + run.taste) / 3);
    var stars = avg >= 92 ? 3 : avg >= 75 ? 2 : 1;
    var prev = S.cooked[d.id];
    if (!run.demo && (!prev || prev.score < avg)) S.cooked[d.id] = { score: avg, stars: stars, date: new Date().toISOString().slice(0, 10) };
    save();
    confetti(130); Sfx.fanfare();
    if (run.heatMistakes === 0) awardBadge('wok', true);
    if (Object.keys(S.cooked).length >= 4) awardBadge('chef', true);
    var vocabChips = d.prep.map(function (p) { return ingInfo(p.ing); })
      .concat(d.seasonings.map(function (s) { return seasonInfo(s) || ingInfo(s); }))
      .slice(0, 14);
    $('#stepPanel').innerHTML = '<div class="card step-card"><div class="plate-view">' +
      (d.img ? '<img class="plate-photo" src="' + d.img + '" alt="' + esc(d.name) + '" onerror="this.replaceWith(document.createTextNode(\'' + d.plate + '\'))">' : '<span class="dish-emoji">' + d.plate + '</span>') + '</div>' +
      '<h2 class="h2" style="text-align:center">' + esc(d.name) + ' 出锅啦！</h2>' +
      '<div style="text-align:center">' + pyLine(d.py) + enLine(d.en) + '</div>' +
      '<div style="text-align:center;margin:10px 0"><span class="stars">' + [1, 2, 3].map(function (i) { return '<span class="star' + (i <= stars ? ' on' : '') + '" style="animation-delay:' + (i * 0.15) + 's">★</span>'; }).join('') + '</span></div>' +
      '<div class="score-strip">' + ['色', '香', '味'].map(function (s, i) {
        var k = ['color', 'aroma', 'taste'][i];
        return '<div class="score-item"><div class="small muted">' + s + '</div><b>' + Math.round(run[k]) + '</b></div>';
      }).join('') + '</div>' +
      '<p class="small" style="margin-top:12px">' + (stars === 3 ? '色香味俱全！火候、顺序、调味都到位，这就是川菜说的"一菜一格"。'
        : stars === 2 ? '味道不错！再注意一下火候和下锅顺序，就可以拿三星了。'
        : '第一次做能出锅就很棒了！火候和顺序再练一次会更好。') + '</p>' +
      '<p class="small muted">本次选错 ' + run.mistakes + ' 次；火候选错 ' + run.heatMistakes + ' 次；翻炒 ' + run.stirs + ' 下。</p>' +
      '<div class="fact-list">' + d.tips.map(function (t) { return '<div class="fact"><div>' + esc(t.zh) + enLine(t.en) + '</div></div>'; }).join('') + '</div>' +
      '<h3 class="h3" style="margin-top:14px">📚 这道菜学到的词</h3>' +
      '<div style="display:flex;flex-wrap:wrap;gap:6px">' + vocabChips.map(function (v) {
        return '<span class="tag" data-speak="' + esc(v.zh) + '" style="cursor:pointer">' + v.emoji + ' ' + esc(v.zh) + '</span>';
      }).join('') + '</div>' +
      '<div style="display:flex;gap:10px;flex-wrap:wrap;margin-top:16px">' +
      '<button class="btn btn-primary" id="againBtn">↻ 再做一次</button>' +
      '<button class="btn" data-route="dishes">🍽️ 换一道菜</button>' +
      '<button class="btn btn-gold" data-route="quiz">🏆 去小测</button>' +
      '<button class="btn" data-route="progress">🐼 我的厨房</button>' +
      '</div></div>';
    $('#againBtn').addEventListener('click', function () { renderCook(); });
    pandaSay('finish', '上菜！<b>' + esc(d.name) + '</b>拿到 ' + stars + ' 颗星，真棒。', 'happy');
  }

  /* ============ 词汇 ============ */
  var vocabCat = null;
  function renderVocab() {
    var cats = Object.keys(CC.vocab || {});
    vocabCat = vocabCat || cats[0];
    var html = '<div class="view"><div class="view-head"><span class="eyebrow">词汇 · 语言</span>' +
      '<h1 class="h1">川菜中文词汇卡</h1>' +
      '<p class="lead">点卡片翻面看拼音和英文，点小喇叭听发音。也可以搜索：试着输入"麻"或"doufu"。</p></div>' +
      '<div class="search-row"><input class="search" id="vocabSearch" placeholder="搜索中文 / 拼音 / English…">' +
      '<button class="btn btn-sm" id="clearSearch">清空</button></div>' +
      '<div class="vocab-tabs" id="vocabTabs">' + cats.map(function (c) {
        return '<button class="filter-chip' + (vocabCat === c ? ' on' : '') + '" data-cat="' + esc(c) + '">' + esc(c) + '</button>';
      }).join('') + '</div>' +
      '<div class="flash-grid" id="flashGrid"></div>' +

      '<section class="culture-section"><div class="view-head"><span class="eyebrow">句型</span>' +
      '<h2 class="h2">做菜时能用的中文句型</h2>' +
      '<p class="lead">这些句型在厨房里天天用，学会了就能一边做菜一边说中文。</p></div>' +
      '<div class="grid grid-2">' + (CC.patterns || []).map(function (p) {
        return '<div class="card pattern-card"><div class="pattern-tpl">' + esc(p.pattern) + '</div>' +
          pyLine(p.py) + enLine(p.en) +
          p.ex.map(function (e) {
            return '<div class="example">' + esc(e.zh) + ' ' + speakBtn(e.zh) + pyLine(e.py) + enLine(e.en) + '</div>';
          }).join('') + '</div>';
      }).join('') + '</div></section>' +

      '<section class="culture-section"><div class="view-head"><span class="eyebrow">厨房与味道</span>' +
      '<h2 class="h2">厨具和味道词</h2></div><div class="grid grid-2">' +
      '<div class="card"><h3 class="h3">🍳 厨具</h3><div style="display:flex;flex-wrap:wrap;gap:8px;margin-top:8px">' +
      (CC.tools || []).map(function (t) { return '<span class="tag" data-speak="' + esc(t.zh) + '" style="cursor:pointer">' + photoImg(t.zh, 'chip-photo', t.emoji) + ' ' + esc(t.zh) + ' <span class="muted">' + esc(t.py) + '</span></span>'; }).join('') +
      '</div></div>' +
      '<div class="card"><h3 class="h3">😋 味道</h3><div style="display:flex;flex-wrap:wrap;gap:8px;margin-top:8px">' +
      (CC.tastes || []).map(function (t) { return '<span class="tag" data-speak="' + esc(t.zh) + '" style="cursor:pointer">' + t.emoji + ' ' + esc(t.zh) + ' <span class="muted">' + esc(t.en) + '</span></span>'; }).join('') +
      '</div><p class="small muted" style="margin-top:10px">试一试用"又……又……"造句：麻婆豆腐又麻又辣。</p></div>' +
      '</div></section></div>';
    app.innerHTML = html;
    paintVocab();
    $$('#vocabTabs .filter-chip').forEach(function (b) {
      b.addEventListener('click', function () {
        vocabCat = b.dataset.cat;
        $$('#vocabTabs .filter-chip').forEach(function (x) { x.classList.toggle('on', x === b); });
        paintVocab(); Sfx.pop();
      });
    });
    $('#vocabSearch').addEventListener('input', paintVocab);
    $('#clearSearch').addEventListener('click', function () { $('#vocabSearch').value = ''; paintVocab(); });
    pandaSay('vocab');
  }
  function paintVocab() {
    var q = ($('#vocabSearch') && $('#vocabSearch').value || '').trim().toLowerCase();
    var list = [];
    if (q) {
      Object.keys(CC.vocab).forEach(function (c) {
        CC.vocab[c].forEach(function (w) { if ((w.zh + w.py + w.en).toLowerCase().indexOf(q) >= 0) list.push(w); });
      });
    } else {
      list = (CC.vocab[vocabCat] || []).slice();
    }
    $('#flashGrid').innerHTML = list.map(function (w, i) {
      return '<div class="flash-card" data-i="' + i + '" data-zh="' + esc(w.zh) + '">' +
        '<div class="flash-inner">' +
        '<div class="flash-face">' + photoImg(w.zh, 'face-photo', w.emoji) +
        '<div class="big" style="position:absolute;top:6px;left:10px;z-index:2">' + w.emoji + '</div>' +
        '<div class="face-label"><div class="word">' + esc(w.zh) + '</div></div>' +
        '<span class="hint">点一下翻面</span></div>' +
        '<div class="flash-face back"><div>' + pyLine(w.py) + '<div class="word" style="font-size:15px">' + esc(w.en) + '</div></div>' +
        '<button class="speak" data-speak="' + esc(w.zh) + '" style="position:absolute;bottom:8px;right:10px">🔊</button></div>' +
        '</div></div>';
    }).join('') || '<p class="muted">没有找到，换个词试试。</p>';
    $$('#flashGrid .flash-card').forEach(function (c) {
      c.addEventListener('click', function (e) {
        if (e.target.closest('.speak')) return;
        c.classList.toggle('flipped');
        if (c.classList.contains('flipped')) {
          Sfx.pop();
          var zh = c.dataset.zh;
          if (S.vocabSeen.indexOf(zh) < 0) { S.vocabSeen.push(zh); save(); }
        }
      });
    });
  }

  /* ============ 小测 ============ */
  var quiz = null;
  function buildQuiz() {
    var deck = [];
    shuffle(CC.cultureQuiz || []).slice(0, 8).forEach(function (q) {
      deck.push({ type: 'text', q: q.q, options: q.options, explain: q.explain });
    });
    var allWords = [];
    Object.keys(CC.vocab).forEach(function (c) { CC.vocab[c].forEach(function (w) { allWords.push(w); }); });
    shuffle(allWords).slice(0, 3).forEach(function (w) {
      var others = shuffle(allWords.filter(function (x) { return x.zh !== w.zh; })).slice(0, 2);
      deck.push({
        type: 'audio', word: w,
        options: shuffle([w].concat(others)).map(function (o) { return { zh: o.zh, py: o.py, en: o.en, correct: o.zh === w.zh }; }),
        explain: { zh: w.zh + '（' + w.py + '）意思是 ' + w.en + '。', en: w.en }
      });
    });
    var d = (CC.dishes || [])[Math.floor(Math.random() * (CC.dishes || []).length)];
    var steps = d.steps.filter(function (s) { return s.type !== 'finish'; }).slice(0, 3);
    if (steps.length >= 3) {
      deck.push({ type: 'order', dish: d, steps: steps, shuffled: shuffle(steps.map(function (s, i) { return { s: s, i: i }; })) });
    }
    return shuffle(deck);
  }
  function renderQuiz() {
    quiz = { deck: buildQuiz(), i: 0, score: 0, wrong: [], picked: [] };
    app.innerHTML = '<div class="view"><div class="quiz-shell" id="quizShell"></div></div>';
    renderQuizStep();
    pandaSay('quiz');
  }
  function renderQuizStep() {
    var shell = $('#quizShell');
    if (quiz.i >= quiz.deck.length) return renderQuizResult();
    var q = quiz.deck[quiz.i];
    var pct = Math.round(quiz.i / quiz.deck.length * 100);
    var head = '<div class="quiz-top"><span class="step-badge">第 ' + (quiz.i + 1) + ' / ' + quiz.deck.length + ' 题</span>' +
      '<div class="quiz-bar"><i style="width:' + pct + '%"></i></div><span class="small muted">得分 ' + quiz.score + '</span></div>';
    var body = '';
    if (q.type === 'text') {
      body = '<div class="card"><div class="quiz-question">' + esc(q.q.zh) + ' ' + speakBtn(q.q.zh) + '</div>' +
        enLine(q.q.en) + '<div class="quiz-options">' + q.options.map(function (o, i) {
          return '<button class="quiz-option" data-i="' + i + '"><span class="key">' + 'ABC'[i] + '</span>' +
            '<span>' + esc(o.zh) + '<span class="en">' + esc(o.en) + '</span></span></button>';
        }).join('') + '</div></div>';
    } else if (q.type === 'audio') {
      body = '<div class="card" style="text-align:center">' +
        '<p class="lead" style="margin:0 auto 10px">听一听，选出你听到的词。</p>' +
        '<button class="btn btn-primary" id="playWord">🔊 播放发音</button>' +
        '<p class="small muted" style="margin-top:8px">（可以多听几遍）</p></div>' +
        '<div class="card"><div class="quiz-options">' + q.options.map(function (o, i) {
          return '<button class="quiz-option" data-i="' + i + '"><span class="key">' + 'ABC'[i] + '</span>' +
            '<span>' + esc(o.zh) + '<span class="en">' + esc(o.py) + ' · ' + esc(o.en) + '</span></span></button>';
        }).join('') + '</div></div>';
    } else if (q.type === 'order') {
      body = '<div class="card"><div class="quiz-question">厨房顺序题：' + esc(q.dish.name) + ' 的前三步，应该什么顺序？</div>' +
        '<p class="small muted">按顺序点下面的步骤，点错了可以"重新排"。</p>' +
        '<div class="quiz-options" id="orderOptions">' + q.shuffled.map(function (o, i) {
          return '<button class="quiz-option" data-o="' + i + '"><span class="key">?</span><span>' + esc(o.s.zh) + '</span></button>';
        }).join('') + '</div>' +
        '<div style="margin-top:12px"><b>你的顺序：</b><span id="orderPick" class="muted">（还没选）</span></div>' +
        '<button class="btn btn-sm" id="resetOrder" style="margin-top:10px">↻ 重新排</button></div>';
    }
    shell.innerHTML = head + body + '<div id="quizFb"></div>';
    if (q.type === 'audio') {
      $('#playWord').addEventListener('click', function () { speak(q.word.zh); });
      setTimeout(function () { speak(q.word.zh); }, 350);
    }
    if (q.type === 'order') {
      var picked = [];
      $$('#orderOptions .quiz-option').forEach(function (b) {
        b.addEventListener('click', function () {
          var idx = +b.dataset.o;
          if (picked.indexOf(idx) >= 0) return;
          picked.push(idx);
          b.classList.add('correct');
          b.querySelector('.key').textContent = picked.length;
          $('#orderPick').textContent = picked.map(function (p) { return q.shuffled[p].i + 1; }).join(' → ') + '（第几步）';
          Sfx.pop();
          if (picked.length === q.shuffled.length) {
            var ok = picked.every(function (p, pos) { return q.shuffled[p].i === pos; });
            judgeQuiz(ok, q, ok ? null : '正确顺序：' + q.steps.map(function (s, i) { return (i + 1) + '. ' + s.zh.split('。')[0]; }).join('　'));
          }
        });
      });
      $('#resetOrder').addEventListener('click', function () {
        picked = []; $$('#orderOptions .quiz-option').forEach(function (b) {
          b.classList.remove('correct'); b.querySelector('.key').textContent = '?';
        });
        $('#orderPick').textContent = '（还没选）';
      });
    } else {
      $$('.quiz-option').forEach(function (b) {
        b.addEventListener('click', function () {
          var o = q.options[+b.dataset.i];
          $$('.quiz-option').forEach(function (x) { x.disabled = true; });
          if (o.correct) b.classList.add('correct'); else {
            b.classList.add('wrong');
            var right = q.options.findIndex(function (x) { return x.correct; });
            if (right >= 0) $$('.quiz-option')[right].classList.add('correct');
          }
          judgeQuiz(!!o.correct, q);
        });
      });
    }
  }
  function judgeQuiz(ok, q, extra) {
    if (ok) { quiz.score++; Sfx.ding(); } else { Sfx.error(); quiz.wrong.push(q); }
    var fb = $('#quizFb');
    fb.innerHTML = '<div class="hint-box ' + (ok ? 'good' : 'bad') + '" style="margin-top:14px"><span>' + (ok ? '✅ 答对了' : '⚠️ 再想想') + '</span>' +
      '<div>' + esc(extra || (q.explain ? q.explain.zh : '')) + (q.explain ? enLine(q.explain.en) : '') + '</div></div>' +
      '<button class="btn btn-primary" id="nextQ" style="margin-top:12px">' + (quiz.i + 1 >= quiz.deck.length ? '看结果 →' : '下一题 →') + '</button>';
    $('#nextQ').addEventListener('click', function () { quiz.i++; renderQuizStep(); });
    pandaSay(ok ? 'correct' : 'wrong', null, ok ? 'happy' : 'oh');
  }
  function renderQuizResult() {
    var total = quiz.deck.length, sc = quiz.score;
    var level = sc >= 8 ? '川菜文化小博士 📚' : sc >= 6 ? '川菜学徒 👨‍🍳' : '川菜新手 🐣';
    if (sc >= 8) awardBadge('culture', true);
    confetti(sc >= 6 ? 120 : 50);
    if (sc >= 6) Sfx.fanfare();
    $('#quizShell').innerHTML = '<div class="card quiz-result">' +
      '<div class="big-score">' + sc + '<span style="font-size:22px;color:var(--muted)"> / ' + total + '</span></div>' +
      '<h2 class="h2">' + level + '</h2>' +
      '<p class="small">' + (sc >= 8 ? '你对川菜的理解已经很深了，可以去给别人讲讲"麻辣"是怎么来的。'
        : sc >= 6 ? '不错！再复习一下词汇和文化部分，就能拿满分。'
        : '没关系，先去"词汇"和"首页·文化"逛一圈，再来挑战一次。') + '</p>' +
      (quiz.wrong.length ? '<div style="text-align:left;margin-top:12px"><h3 class="h3">这些题可以再看一眼</h3>' +
        quiz.wrong.map(function (w) {
          return '<div class="fact"><div>' + esc(w.type === 'text' ? w.q.zh : w.type === 'audio' ? ('听音题：' + w.word.zh) : ('顺序题：' + w.dish.name)) +
            (w.explain ? '<span class="en">' + esc(w.explain.zh) + '</span>' : '') + '</div></div>';
        }).join('') + '</div>' : '') +
      '<div style="display:flex;gap:10px;justify-content:center;flex-wrap:wrap;margin-top:16px">' +
      '<button class="btn btn-primary" id="quizAgain">↻ 再来一次</button>' +
      '<button class="btn" data-route="vocab">📚 去学词汇</button>' +
      '<button class="btn btn-gold" data-route="progress">🐼 我的厨房</button></div></div>';
    $('#quizAgain').addEventListener('click', renderQuiz);
    pandaSay('quiz', sc >= 8 ? '太厉害了，你是 <b>川菜文化小博士</b>！' : '继续加油，多来几次就熟了！', sc >= 8 ? 'happy' : '');
  }

  /* ============ 我的厨房 ============ */
  function renderProgress() {
    var cookedCount = Object.keys(S.cooked).length;
    var totalStars = 0, bestScore = 0;
    Object.keys(S.cooked).forEach(function (k) {
      totalStars += S.cooked[k].stars; bestScore = Math.max(bestScore, S.cooked[k].score);
    });
    var html = '<div class="view"><div class="view-head"><span class="eyebrow">我的厨房</span>' +
      '<h1 class="h1">你的川菜学习记录</h1>' +
      '<p class="lead">下面这些记录保存在你自己的浏览器里，换电脑或清缓存会消失，所以做完可以打印一张证书留作纪念。</p></div>' +
      '<div class="dash-grid">' +
      '<div class="card dash-stat"><span class="icon">🍽️</span><div><b>' + cookedCount + '</b><span class="muted small">完成菜品（共 ' + (CC.dishes || []).length + ' 道）</span></div></div>' +
      '<div class="card dash-stat"><span class="icon">★</span><div><b>' + totalStars + '</b><span class="muted small">累计星星</span></div></div>' +
      '<div class="card dash-stat"><span class="icon">💨</span><div><b>' + S.stirs + '</b><span class="muted small">累计翻炒次数</span></div></div>' +
      '<div class="card dash-stat"><span class="icon">🎖️</span><div><b>' + S.badges.length + ' / ' + (CC.badges || []).length + '</b><span class="muted small">获得徽章</span></div></div>' +
      '</div>' +

      '<section class="culture-section"><div class="view-head"><span class="eyebrow">菜单进度</span><h2 class="h2">八道菜的完成情况</h2></div>' +
      (CC.dishes || []).map(function (d) {
        var c = S.cooked[d.id], prep = (S.prepped[d.id] || []).length;
        return '<div class="dish-progress-row"><span class="emoji">' + d.emoji + '</span>' +
          '<div class="grow"><b>' + esc(d.name) + '</b><span class="py">' + esc(d.py) + '</span>' +
          '<div class="small muted">备菜 ' + prep + '/' + d.prep.length + (c ? ' · 已做，得分 ' + c.score + '，' + '★'.repeat(c.stars) : ' · 还没做') + '</div></div>' +
          '<button class="btn btn-sm" data-go="prep" data-id="' + d.id + '">' + (c ? '再做一次' : '开始做') + '</button></div>';
      }).join('') + '</section>' +

      '<section class="culture-section"><div class="view-head"><span class="eyebrow">徽章墙</span><h2 class="h2">你收集到的川菜徽章</h2></div>' +
      '<div class="badge-wall">' + (CC.badges || []).map(function (b) {
        var got = S.badges.indexOf(b.id) >= 0;
        return '<div class="badge' + (got ? ' earned' : '') + '"><div class="icon">' + b.emoji + '</div><b>' + esc(b.zh) + '</b>' +
          '<div class="small muted">' + esc(got ? b.desc.zh : '还没获得：' + b.desc.zh) + '</div></div>';
      }).join('') + '</div></section>' +

      '<section class="culture-section"><div class="view-head"><span class="eyebrow">结业证书</span><h2 class="h2">打印一张属于你的证书</h2></div>' +
      '<div class="card"><div class="search-row"><input class="cert-input" id="certName" placeholder="写下你的名字 / Your name" value="' + esc(S.name) + '">' +
      '<button class="btn btn-primary" id="makeCert">生成证书</button>' +
      '<button class="btn" id="printCert">🖨️ 打印</button></div>' +
      '<p class="small muted">至少完成 1 道菜就可以生成证书；完成 4 道以上会多一枚"川味大厨"徽章。</p></div>' +
      '<div id="certBox" style="margin-top:14px"></div></section>' +

      '<section class="culture-section"><div class="card"><h3 class="h3">⚠️ 课堂安全提示</h3>' +
      '<p class="small">这是模拟做菜，不动真火真刀。真正下厨时请注意：四季豆必须彻底加热（未熟透的四季豆含皂甙和红细胞凝集素，可能引起不适）；油温很高时不要进水；切菜时手指内扣、刀口向外。</p>' +
      '<p class="small muted">（来源：公开科普资料整理）</p>' +
      '<button class="btn btn-sm" id="resetAll">清除我的学习记录</button></div></section></div>';
    app.innerHTML = html;
    $('#makeCert').addEventListener('click', function () {
      var n = ($('#certName').value || '').trim();
      if (!cookedCount) { toast('先完成一道菜，就能生成证书啦'); Sfx.error(); return; }
      S.name = n; save(); paintCert(cookedCount, totalStars);
    });
    $('#printCert').addEventListener('click', function () { window.print(); });
    $('#resetAll').addEventListener('click', function () {
      openModal('<h3 class="h3">清除学习记录？</h3><p class="small">会删掉备菜进度、做过的菜和徽章，这个操作不能撤销。</p>' +
        '<div style="display:flex;gap:10px"><button class="btn" data-close="1">先不清</button>' +
        '<button class="btn btn-primary" id="confirmReset">确定清除</button></div>');
      $('#confirmReset').addEventListener('click', function () {
        try { localStorage.removeItem(LS_KEY); } catch (e) {}
        location.reload();
      });
    });
    if (S.name) paintCert(cookedCount, totalStars);
    pandaSay('progress');
  }
  function paintCert(cookedCount, totalStars) {
    var today = new Date().toLocaleDateString('zh-CN');
    $('#certBox').innerHTML = '<div class="certificate">' +
      '<div style="font-size:34px">🏮</div>' +
      '<h3>川菜文化体验课 · 结业证书</h3>' +
      '<p class="en" style="font-style:normal">Sichuan Flavor Kitchen — Certificate of Completion</p>' +
      '<div class="cert-name">' + esc(S.name || '小小厨神') + '</div>' +
      '<p class="small">已完成 <b>' + cookedCount + '</b> 道川菜、累计 <b>' + totalStars + '</b> 颗星、获得 <b>' + S.badges.length + '</b> 枚徽章，' +
      '并认识了"麻辣鲜香"背后的四川风土与文化。</p>' +
      '<p class="small muted">颁发日期：' + today + '　|　川味小厨房 · 国际中文教育文化教学</p>' +
      '<div style="font-size:22px;letter-spacing:6px">🌶️ 🫘 🥢 🍲 🐼</div></div>';
    confetti(90); Sfx.fanfare();
  }

  /* ============ 全局事件 ============ */
  document.addEventListener('click', function (e) {
    var sp = e.target.closest('[data-speak]');
    if (sp) { speak(sp.dataset.speak, sp.classList.contains('speak') ? sp : null); return; }
    var close = e.target.closest('[data-close]');
    if (close) { closeModal(); return; }
    var vb = e.target.closest('[data-video]');
    if (vb) { closeModal(); openVideo(dishById(vb.dataset.video)); return; }
    var scroll = e.target.closest('[data-scroll]');
    if (scroll) {
      var t = $(scroll.dataset.scroll);
      if (t) t.scrollIntoView({ behavior: 'smooth' });
      return;
    }
    var nav = e.target.closest('[data-route]');
    if (nav) { go(nav.dataset.route); return; }
    var gd = e.target.closest('[data-go]');
    if (gd) { closeModal(); S.dish = gd.dataset.id; save(); go(gd.dataset.go, gd.dataset.id); return; }
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') { closeModal(); return; }
    if (e.code === 'Space' && window.__stir && current.name === 'cook') {
      var tag = (e.target && e.target.tagName || '').toLowerCase();
      if (tag === 'input' || tag === 'textarea') return;
      e.preventDefault();
      window.__stir();
    }
  });
  $('#pandaAvatar').addEventListener('click', function () {
    S.chat++; save();
    if (S.chat >= 20) awardBadge('panda');
    pandaSay(current.name);
    Sfx.pop();
  });
  $('#togglePy').addEventListener('click', function () {
    S.py = !S.py; document.body.classList.toggle('show-py', S.py);
    this.classList.toggle('on', S.py); save();
  });
  $('#toggleEn').addEventListener('click', function () {
    S.en = !S.en; document.body.classList.toggle('show-en', S.en);
    this.classList.toggle('on', S.en); save();
  });
  $('#toggleSound').addEventListener('click', function () {
    S.sound = !S.sound; save();
    this.textContent = S.sound ? '🔊' : '🔇';
    this.classList.toggle('off', !S.sound);
    if (S.sound) Sfx.ding();
  });

  function bgDeco() {
    var items = ['🌶️', '🫘', '🥢', '🧄', '🥬', '🍲', '🐼', '🫚'];
    var box = $('#bgDeco');
    for (var i = 0; i < 14; i++) {
      var s = document.createElement('span');
      s.textContent = items[i % items.length];
      s.style.left = (Math.random() * 96) + 'vw';
      s.style.animationDuration = (16 + Math.random() * 16) + 's';
      s.style.animationDelay = (-Math.random() * 20) + 's';
      s.style.fontSize = (14 + Math.random() * 16) + 'px';
      box.appendChild(s);
    }
  }

  /* ============ 启动 ============ */
  /* ---- 全站真实照片化：把界面里的食物类图标自动换成真实照片 ---- */
  var UI_PHOTO = EMOJI_IMG;   /* 只用核对过的白名单，避免张冠李戴 */
  /* 透明抠图：有 cut/<同名>.png 就优先用它（依据真实文件，不做猜测） */
  var CUT_SET = null;
  var CUT_BY_NAME = {};   /* 文件名(id) → 抠图路径：跨目录查，避免素材来源目录不同就找不到 */
  function useManifest(m) {
    CUT_SET = new Set(Object.keys(m || {}));
    ['c/', 'cs/', 'i/', 's/', 't/'].forEach(function (dir) {
      Object.keys(m || {}).forEach(function (rel) {
        if (rel.indexOf(dir) !== 0) return;
        var name = rel.slice(dir.length).replace(/\.[a-z]+$/i, '');
        if (!CUT_BY_NAME[name]) CUT_BY_NAME[name] = m[rel].png;
      });
    });
    sweepPhotos(app);
  }
  /* 本地双击打开（file://）时不能 fetch JSON，所以优先用内联清单 */
  if (window.CUT_MANIFEST) { useManifest(window.CUT_MANIFEST); }
  fetch('assets/img/cut/manifest.json')
    .then(function (r) { return r.ok ? r.json() : {}; })
    .then(useManifest)
    .catch(function () { CUT_SET = new Set(); });
  function cutPathFor(src) {
    if (!/assets\/img\//.test(src)) return '';
    var rel = src.slice(src.indexOf('assets/img/') + 'assets/img/'.length);
    if (CUT_SET && CUT_SET.size && CUT_SET.has(rel)) return 'assets/img/cut/' + rel.replace(/\.[a-z]+$/i, '.png');
    var base = rel.replace(/^.*\//, '').replace(/\.[a-z]+$/i, '');
    return CUT_BY_NAME[base] || '';
  }
  function applyCutouts(root) {
    if (!CUT_SET || !CUT_SET.size) return;
    Array.prototype.slice.call(root.querySelectorAll('img')).forEach(function (img) {
      if (img.dataset.cutDone) return;
      var cut = cutPathFor(img.getAttribute('src') || '');
      if (!cut) { img.dataset.cutDone = '1'; return; }
      var original = img.getAttribute('src');
      img.dataset.cutDone = '1';
      img.dataset.cut = '1';
      img.onerror = function () { this.onerror = null; this.removeAttribute('data-cut'); this.src = original; };
      img.setAttribute('src', cut);
    });
  }
  var EMOJI_RE = new RegExp('(' + Object.keys(UI_PHOTO).map(function (e) {
    return e.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }).join('|') + ')', 'g');
  function sweepPhotos(root) {
    if (!root || current.name === 'cook') return;   /* 上灶页自己处理锅内动画 */
    applyCutouts(root);
    var walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, null);
    var nodes = [];
    while (walker.nextNode()) {
      var n = walker.currentNode;
      if (n.parentNode && /EMOJI_SKIP/.test(n.parentNode.className || '')) continue;
      if (EMOJI_RE.test(n.nodeValue)) nodes.push(n);
      EMOJI_RE.lastIndex = 0;
    }
    nodes.forEach(function (n) {
      var frag = document.createDocumentFragment(), txt = n.nodeValue, last = 0, m;
      EMOJI_RE.lastIndex = 0;
      while ((m = EMOJI_RE.exec(txt))) {
        if (m.index > last) frag.appendChild(document.createTextNode(txt.slice(last, m.index)));
        var img = document.createElement('img');
        img.className = 'ui-photo'; img.src = UI_PHOTO[m[1]]; img.alt = m[1];
        img.onerror = function () { this.replaceWith(document.createTextNode(this.alt)); };
        frag.appendChild(img);
        last = m.index + m[1].length;
      }
      if (last < txt.length) frag.appendChild(document.createTextNode(txt.slice(last)));
      n.parentNode.replaceChild(frag, n);
    });
  }
  var sweepTimer = null;
  if (window.MutationObserver) {
    new MutationObserver(function () {
      clearTimeout(sweepTimer);
      sweepTimer = setTimeout(function () { sweepPhotos(app); }, 60);
    }).observe(app, { childList: true, subtree: true });
  }
  window.__sweepPhotos = sweepPhotos;

  load();
  /* 菜品照片按 id 统一约定路径（dish-<id>.jpg），避免数据漏填 */
  (CC.dishes || []).forEach(function (d) { if (!d.img) d.img = 'assets/img/dish-' + d.id + '.jpg'; });
  document.body.classList.toggle('show-py', !!S.py);
  document.body.classList.toggle('show-en', !!S.en);
  $('#togglePy').classList.toggle('on', !!S.py);
  $('#toggleEn').classList.toggle('on', !!S.en);
  $('#toggleSound').textContent = S.sound ? '🔊' : '🔇';
  $('#toggleSound').classList.toggle('off', !S.sound);
  bgDeco();
  window.addEventListener('hashchange', route);
  route();
})();
