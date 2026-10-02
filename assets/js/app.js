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
    theme: 'cream',
    prepped: {}, cooked: {}, badges: [], stirs: 0, hands: 0, chat: 0,
    flavorCorrect: 0, vocabSeen: [], name: ''
  };
  var LS_KEY = 'sichuan-kitchen-state-v2';   /* 升版一次：让旧的字体选择失效，改用新的默认字体 */
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
    /* 带扫频的噪声：倒液体、"哗"的一下、油锅起烟 */
    function noiseSweep(dur, fromHz, toHz, gain, type) {
      var c = ctx(); if (!c) return;
      var len = Math.floor(c.sampleRate * dur);
      var buf = c.createBuffer(1, len, c.sampleRate);
      var d = buf.getChannelData(0);
      for (var i = 0; i < len; i++) {
        var t = i / len;
        d[i] = (Math.random() * 2 - 1) * Math.sin(Math.PI * Math.min(1, t * 1.6)) * (1 - t * 0.5);
      }
      var src = c.createBufferSource(); src.buffer = buf;
      var f = c.createBiquadFilter(); f.type = type || 'bandpass'; f.Q.value = 0.7;
      f.frequency.setValueAtTime(fromHz, c.currentTime);
      f.frequency.exponentialRampToValueAtTime(Math.max(80, toHz), c.currentTime + dur);
      var g = c.createGain(); g.gain.setValueAtTime(gain || 0.14, c.currentTime);
      g.gain.exponentialRampToValueAtTime(0.001, c.currentTime + dur);
      src.connect(f); f.connect(g); g.connect(c.destination);
      src.start();
    }
    /* 油锅里的"噼啪"小爆点 */
    function crackles(n, freq, gain, spread) {
      for (var i = 0; i < n; i++) {
        (function (k) {
          setTimeout(function () { noise(0.03 + Math.random() * 0.03, freq || 3200, (gain || 0.1) * (0.6 + Math.random() * 0.7), 2.4); },
            k * (spread || 90) + Math.random() * 40);
        })(i);
      }
    }
    return {
      /* —— 开火：一声"咔"+ 火着起来的"呼" —— */
      ignite: function () {
        noise(0.05, 2600, 0.18, 3);
        tone(150, 0.05, 'square', 0.05, 90);
        setTimeout(function () { noiseSweep(0.5, 420, 1500, 0.1, 'lowpass'); }, 70);
      },
      /* —— 油锅滋啦（下锅 / 炒）—— */
      fry: function () { noiseSweep(0.55, 2400, 3600, 0.11, 'highpass'); crackles(3, 3400, 0.06, 120); },
      fryHard: function () { noiseSweep(1.1, 1800, 4200, 0.13, 'highpass'); crackles(8, 3200, 0.08, 110); },
      /* —— 切：刀落砧板的闷响 + 一点脆声 —— */
      knife: function () { noise(0.06, 1200, 0.2, 1.6); tone(180, 0.07, 'square', 0.05, 110); setTimeout(function () { noise(0.04, 3600, 0.07, 2.6); }, 25); },
      /* —— 拌：筷子刮碗 —— */
      scrape: function () { noiseSweep(0.34, 700, 1500, 0.1, 'bandpass'); setTimeout(function () { noise(0.05, 2600, 0.05, 2); }, 120); },
      /* —— 水：注水 + 冒泡 —— */
      water: function () { noiseSweep(0.6, 900, 2200, 0.12, 'bandpass'); setTimeout(function () { tone(320, 0.14, 'sine', 0.07, 520); }, 260); },
      boil: function () { for (var i = 0; i < 4; i++) setTimeout(function () { tone(260 + Math.random() * 200, 0.16, 'sine', 0.07, 520); }, i * 210); },
      /* —— 倒液体 —— */
      pour: function () { noiseSweep(0.7, 600, 1800, 0.13, 'bandpass'); setTimeout(function () { noiseSweep(0.25, 1500, 900, 0.07, 'lowpass'); }, 520); },
      /* —— 撒粉 / 撒芝麻 —— */
      sprinkle: function () { for (var i = 0; i < 7; i++) setTimeout(function () { noise(0.035, 4200 + Math.random() * 1800, 0.07, 2.8); }, i * 55); },
      /* —— 放固体食材进锅：闷响 + 油花 —— */
      plop: function () { tone(210, 0.12, 'sine', 0.1, 120); noise(0.16, 1600, 0.1, 1.4); setTimeout(function () { noiseSweep(0.35, 2600, 3600, 0.07, 'highpass'); }, 60); },
      /* —— 瓷器相碰（装盘）—— */
      clink: function () { tone(1750, 0.09, 'triangle', 0.09); setTimeout(function () { tone(2600, 0.14, 'triangle', 0.07); }, 45); setTimeout(function () { tone(3400, 0.2, 'sine', 0.035); }, 90); },
      /* —— 计时器滴答 —— */
      timer: function () { [0, 480, 960].forEach(function (d) { setTimeout(function () { noise(0.03, 2400, 0.12, 4); }, d); }); },
      /* —— 尝一口：小口一抿 —— */
      sip: function () { noise(0.09, 700, 0.09, 1.2); setTimeout(function () { tone(420, 0.1, 'sine', 0.06, 700); }, 90); },
      /* —— 拖拽/落下的一下"咻" —— */
      whoosh: function () { noiseSweep(0.3, 400, 2200, 0.09, 'bandpass'); },
      /* —— 放调料进锅：按食材形状分三种声音 —— */
      dropSound: function (id) {
        var POWDER = { huajiafen: 1, lajiaomian: 1, ziranfen: 1, jijing: 1, yan: 1, baitang: 1, zhima: 1, dianfen: 1 };
        var LIQUID = { shengchou: 1, laochou: 1, xiangcu: 1, haoyou: 1, liaojiu: 1, shiyongyou: 1, hongyou: 1, lajiaoyou: 1, niuyou: 1, qingshui: 1, gaotang: 1, jitang: 1 };
        if (POWDER[id]) { setTimeout(function () { return SfxPublic.sprinkle(); }, 10); return; }
        if (LIQUID[id]) { setTimeout(function () { return SfxPublic.pour(); }, 10); return; }
        setTimeout(function () { return SfxPublic.plop(); }, 10);
      },
      /* —— 旧名字都留着当别名，老代码还在用 —— */
      sizzle: function () { noiseSweep(0.8, 2400, 3200, 0.12, 'highpass'); crackles(4, 3400, 0.05, 150); },
      chop: function () { this.knife(); },
      stir: function () { this.fry(); },
      ding: function () { tone(880, 0.16, 'sine', 0.12); setTimeout(function () { tone(1320, 0.22, 'sine', 0.1); }, 110); },
      pop: function () { tone(520, 0.12, 'sine', 0.12, 900); },
      error: function () { tone(200, 0.22, 'sawtooth', 0.1, 110); },
      bubble: function () { tone(300 + Math.random() * 160, 0.16, 'sine', 0.07, 480); },
      fanfare: function () {
        [523, 659, 784, 1047].forEach(function (f, i) { setTimeout(function () { tone(f, 0.26, 'triangle', 0.12); }, i * 130); });
      }
    };
  })();
  var SfxPublic = Sfx;      /* dropSound 里要用别名 */

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
  /* 点图片 → 弹窗看大图 */
  function openPhotoModal(src, caption) {
    if (!src) return;
    openModal('<div class="photo-modal">' +
      '<img src="' + src + '" alt="' + esc(caption || '') + '">' +
      (caption ? '<p class="photo-modal-cap">' + esc(caption) + '</p>' : '') +
      '</div>');
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
    /* 熊猫助手已下线（用户要求删除），这里保留空函数：全站一百多处调用它的地方不用改 */
    return;
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
    /* data-fb：万一抠图路径被换成了不存在的文件，先退回实拍图；实拍图也没有再退成 emoji */
    return '<img class="' + (cls || '') + '" src="' + src + '" data-fb="' + src + '" alt="' + esc(zh) + '" loading="lazy" ' +
      'onerror="if(this.getAttribute(\'src\')!==this.dataset.fb){this.src=this.dataset.fb;}' +
      'else{this.replaceWith(Object.assign(document.createElement(\'span\'),{textContent:\'' + (fallbackEmoji || '') + '\'}));}">';
  }
  /* 干净图：优先用抠好的透明图（assets/img/cutv、c、cs），没有就退回实拍图 */
  function cutPath(kind, id) {
    var mp = window.CUT_PHOTOS || {};
    return mp[kind + ':' + id] || '';
  }
  function ingPhotoImg(ingId, cls, zh, emoji, kind) {
    kind = kind || 'ing';
    var cut = cutPath(kind, ingId);
    var dir = kind === 'sea' ? 's' : kind === 'tool' ? 't' : 'i';
    var src = cut || ('assets/img/' + dir + '/' + ingId + '.jpg');
    return '<img class="' + (cls || '') + (cut ? '' : ' photo-round') + '"' + (cut ? ' data-cut="1"' : '') +
      ' src="' + src + '" alt="' + esc(zh) + '" loading="lazy" ' +
      'onerror="this.style.display=\'none\';if(this.nextElementSibling)this.nextElementSibling.style.display=\'inline-block\'">' +
      '<span class="item-emoji" style="display:none">' + (emoji || '') + '</span>';
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
  /* 首页右侧菜单对应的子页（不属于顶部主导航） */
  var SUB_ROUTES = ['guide', 'culture', 'flavor', 'table', 'story'];
  var current = { name: 'home', arg: null };

  function renderNav() {
    $('#nav').innerHTML = NAV.map(function (n) {
      var on = current.name === n[0]
        || (n[0] === 'home' && SUB_ROUTES.indexOf(current.name) >= 0 && current.name !== 'story')
        || (n[0] === 'dishes' && current.name === 'story');   /* 文化故事页高亮"选菜" */
      return '<a class="nav-link' + (on ? ' active' : '') + '" data-route="' + n[0] + '">' + n[2] + ' ' + n[1] + '</a>';
    }).join('');
  }
  function go(name, arg) { location.hash = '#/' + name + (arg ? '/' + arg : ''); }
  function parseHash() {
    var h = (location.hash || '#/home').replace(/^#\/?/, '');
    var parts = h.split('/');
    return { name: parts[0] || 'home', arg: parts[1] || null, sub: parts[2] || null };
  }
  function route() {
    var r = parseHash();
    if (!NAV.some(function (n) { return n[0] === r.name; }) && SUB_ROUTES.indexOf(r.name) < 0) r.name = 'home';
    if (r.arg && dishById(r.arg)) S.dish = r.arg;
    current = r;
    document.body.dataset.page = r.name;
    renderNav();
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (r.name === 'home') renderHome();
    else if (r.name === 'story') renderStory();
    else if (SUB_ROUTES.indexOf(r.name) >= 0) renderHomeSectionPage(r.name);
    else if (r.name === 'dishes') renderBeltPage();
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
    /* 首页 hero：图（标题字/盘子/辣子鸡/贴纸）照用户给的参考做，位置按参考图量出来的百分比摆；
       左边的文案是本站自己的（面向留学生的川菜文化课），不照抄参考站的广告语。 */
    html += '<section class="hero hero-sticker">' +
      '<div class="hs-stage">' +
      /* data-depth = 鼠标视差的层深（px）；值越大离眼睛越近、动得越多 */
      '<img class="hs-deco hs-d1" data-depth="24" src="assets/img/hero/doodle1.png?v=5" alt="" aria-hidden="true" loading="lazy">' +
      '<img class="hs-deco hs-d2" data-depth="24" src="assets/img/hero/doodle2.png?v=5" alt="" aria-hidden="true" loading="lazy">' +
      '<img class="hs-deco hs-d3" data-depth="24" src="assets/img/hero/doodle3.png?v=5" alt="" aria-hidden="true" loading="lazy">' +
      '<img class="hs-plate-img" data-depth="12" src="assets/img/hero/plate.png?v=5" alt="麻婆豆腐" loading="lazy">' +
      '<img class="hs-blob-img" data-depth="18" src="assets/img/hero/blob.png?v=5" alt="辣子鸡" loading="lazy">' +
      '<div class="hs-title-wrap" data-depth="6"><h1 class="sr-only">川味加油站 · 留学生的川菜文化课</h1>' +
      '<img class="hs-title-img" src="assets/img/hero/title.png?v=5" alt="川味加油站" loading="lazy"></div>' +
      '<p class="hs-source" data-depth="4">Sichuan Flavor Kitchen<br><span>国际中文教育 · 文化体验课</span></p>' +
      '<div class="hs-col hs-col-top" data-depth="4">' +
      '<p class="hs-en">Cook &amp; Learn</p>' +
      '<p class="hs-en3">一边做菜，一边学中文</p>' +
      '<p class="hs-en2">为来华留学生准备的川菜文化课</p>' +
      '</div>' +
      '<div class="hs-col hs-col-bottom" data-depth="4">' +
      '<p class="hs-slogan">从一口川菜<br>认识中国味道</p>' +
      '<p class="hs-slogan2">8 道菜 · 从选菜、备菜到上灶全过程</p>' +
      '<div class="hs-actions">' +
      '<div class="hero-actions">' +
      '<button class="btn btn-primary" data-route="dishes">🍽️ 开始点菜</button>' +
      '<button class="btn btn-gold" id="randomDish">🎲 随机来一道</button>' +
      '<button class="btn" data-route="home" data-scroll="#culture">🏮 先看川菜文化</button>' +
      '</div>' +
      '</div>' +
      '</div>' +
      '<img class="hs-sticker-img hs-s1" data-depth="21" src="assets/img/hero/stick1.png?v=5" alt="麻辣满分" loading="lazy">' +
      '<img class="hs-sticker-img hs-s3" data-depth="21" src="assets/img/hero/stick3.png?v=5" alt="川味源泉" loading="lazy">' +
      '<p class="hero-meta hs-meta-bar">' + stats.map(function (s) { return '<b>' + s[0] + '</b> ' + s[1]; }).join('　·　') + '</p>' +
      '</div>' +
      '</section>';

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
      /* 标签层跟着扇区一起转（位置会动），但每个字的字形每帧反向转回来，所以字始终是水平的 */
      '<div class="wheel" id="wheel"><div class="wheel-disc" id="wheelDisc"><div class="wheel-labels">' +
      (CC.flavors || []).map(function (f, i) {
        var a = i * 30 + 15;
        /* 外层 span 负责把标签摆到圆上；内层 i 负责"把字转正"（每帧跟着盘的角度反向转） */
        return '<span style="transform: rotate(' + a + 'deg) translateY(-35%) rotate(' + (-a) + 'deg)">' +
          '<i class="wl-txt">' + esc(f.zh.replace('味', '')) + '</i></span>';
      }).join('') +
      '</div></div><div class="wheel-center" id="wheelCenter">点我<br>转一转</div></div></div>' +
      '<div class="card flavor-card" id="flavorCard"><h3 class="h3">今天是哪一味？</h3>' +
      '<p class="muted small">按下左边的转盘，会随机停在一个味型上，我给你讲讲它是什么味道、有哪些代表菜。</p></div>' +
      '</div></section>';

    /* 时间轴 */
    var tl = [
      ['🫘', '先秦—唐宋 · 花椒是主角', '花椒是中国本土香料，早在《诗经》里就有"椒聊之实，蕃衍盈升"的句子，先秦时人们用它敬神，也用它入菜。辣椒进来以前，四川人的辛辣主要靠花椒、生姜和茱萸（"食茱萸"），所以"麻"比"辣"资格老得多——川菜最早的底子是花椒的香与麻。'],
      ['🌶️', '明代末年 · 辣椒来了', '辣椒原产美洲，随海上贸易传入中国，最早在浙江、福建一带落脚。明代《遵生八笺》（1591 年）里有"番椒……味辣色红，甚可观"的记载：那时它主要被当成观赏植物，还被叫作"番椒""海椒"。四川盆地潮湿，吃辣能发汗祛湿，辣椒于是慢慢从花盆走进了锅里。'],
      ['🥫', '清代 · 豆瓣定型，麻辣成型', '相传康熙年间（约 1688 年）"湖广填四川"的移民陈逸仙把蚕豆带到郫县；咸丰三年（1853 年），陈氏后人陈守信开设"益丰和"酱园，郫县豆瓣逐渐定型，后来被称为"川菜之魂"。辣椒、花椒、豆瓣酱三样凑齐，麻辣味才真正成形，也才有了麻婆豆腐、回锅肉这些家常味的底子。'],
      ['🍲', '清末—民国 · 麻辣走上街头', '清末民初，成都、重庆的街头小馆把麻辣做成了家常味：麻婆豆腐（相传创于同治年间的陈麻婆）、水煮牛肉（源自自贡盐场工人的吃法）、冷吃牛肉（自贡盐帮菜的"冷吃"做法）都在这段时期出现在市井里。抗战时期重庆成为陪都，各地人口涌入，川菜馆也借机开到了全国。'],
      ['🔥', '1980s—2000s · 火锅与江湖菜', '改革开放后，重庆火锅、麻辣烫、串串香从小摊走向全国；酸菜鱼、毛血旺、烤鱼这些"江湖菜"也跟着流行起来。川菜由此被很多人当成"辣的代名词"——其实川菜二十多种味型里，有将近一半并不辣。'],
      ['🌍', '今天 · 一菜一格，百菜百味', '川菜分上河帮（成都、乐山）、下河帮（重庆、南充）、小河帮（自贡、宜宾）等流派，有麻辣、糊辣、鱼香、家常、怪味、荔枝、椒麻、蒜泥、红油、酸辣、咸鲜、五香等二十多种味型。现在不只在成都、重庆，国外也能吃到川菜，但"一菜一格，百菜百味"才是它的底子。']
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
      (window.CC_SCHOOLS_DETAIL || []).map(function (s, i) {
        return '<button class="card card-lift school-card" data-school="' + i + '">' +
          '<span class="school-ico">' + s.emoji + '</span>' +
          '<span class="school-name">' + esc(s.name) + '</span>' +
          '<span class="school-area small muted">' + esc(s.area.split('（')[0]) + '</span>' +
          '<span class="school-taste small">' + esc(s.taste) + '</span>' +
          '<span class="school-dishes small muted">代表菜：' + s.dishes.slice(0, 4).map(esc).join('、') + '</span>' +
          '<span class="school-more">点开看详细介绍 ›</span></button>';
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

    app.innerHTML = html;

    /* 绑定 */
    homeNavAndSplit();
    $('#randomDish').addEventListener('click', function () {
      var d = (CC.dishes || [])[Math.floor(Math.random() * (CC.dishes || []).length)];
      Sfx.pop(); go('prep', d.id);
    });
    $('#wheelCenter').addEventListener('click', spinWheel);
    var sourcesBtn = $('#openSources');          /* 资料清单那块已删掉，按钮不一定在 */
    if (sourcesBtn) sourcesBtn.addEventListener('click', showSources);
    $$('.timeline-item').forEach(function (it) {
      it.addEventListener('click', function () { it.classList.toggle('open'); Sfx.pop(); });
    });
    $$('.gaiwan-part').forEach(function (p) {
      p.addEventListener('click', function () {
        Sfx.ding();
        p.style.animation = 'none'; void p.offsetWidth; p.style.animation = 'popIn .5s both';
      });
    });
    initHeroPlate();                 /* hero 圆盘轮播 */
    initHeroParallax();              /* hero 鼠标视差 + 悬浮 + 贴纸摆动 */
    pandaSay('home');
  }

  var wheelRot = 0, wheelAnim = null;
  /* ===== 首页 hero 的动效（用户 2026-10-02 要求"灵动一点"）=====
     1) 鼠标视差：鼠标在 hero 上移动，各层按 data-depth 反向微移；移出缓慢归位。
     2) 悬浮感：盘子和辣子鸡各自缓慢上下浮动，悬停抬起放大（纯 CSS 动画/属性）。
     3) 贴纸摆动：两张贴纸错峰轻摆。
     三个都用 CSS 的独立变换属性（translate / rotate / scale）+ transform 变量，
     所以"浮动动画"和"视差位移"互不覆盖。系统开了减少动态效果就整套不启动。 */
  function initHeroParallax() {
    var stage = $('#app .hs-stage');
    if (!stage) return;
    if (window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches) {
      stage.classList.add('no-motion');
      return;
    }
    var layers = $$('.hs-stage [data-depth]');
    if (!layers.length) return;
    var raf = null, tx = 0, ty = 0;
    function paint() {
      raf = null;
      layers.forEach(function (el) {
        var d = parseFloat(el.getAttribute('data-depth')) || 0;
        el.style.setProperty('--hs-px', (tx * d).toFixed(2) + 'px');
        el.style.setProperty('--hs-py', (ty * d * .62).toFixed(2) + 'px');
      });
    }
    function move(e) {
      var r = stage.getBoundingClientRect();
      if (!r.width) return;
      tx = Math.max(-1, Math.min(1, (((e.clientX - r.left) / r.width) - .5) * -2));
      ty = Math.max(-1, Math.min(1, (((e.clientY - r.top) / r.height) - .5) * -2));
      if (!raf) raf = requestAnimationFrame(paint);
    }
    function home() {
      tx = 0; ty = 0;
      if (!raf) raf = requestAnimationFrame(paint);
    }
    stage.addEventListener('mousemove', move);
    stage.addEventListener('mouseleave', home);
    stage.addEventListener('blur', home);
  }
  /* 首页 hero 圆盘轮播：3 道菜轮流出现，点图片进那道菜的故事 */
  var HERO_SLIDES = [
    { id: 'mapo', name: '麻婆豆腐' },
    { id: 'gongbao', name: '宫保鸡丁' },
    { id: 'shuizhu', name: '水煮牛肉' }
  ];
  var heroTimer = null, heroIdx = 0;
  function initHeroPlate() {
    var imgs = $$('#heroPlate .hero-slide');
    var dots = $$('#heroDots i');
    if (!imgs.length) return;
    function show(i) {
      heroIdx = (i + imgs.length) % imgs.length;
      imgs.forEach(function (im, k) { im.classList.toggle('on', k === heroIdx); });
      dots.forEach(function (d, k) { d.classList.toggle('on', k === heroIdx); });
    }
    dots.forEach(function (d) {
      d.addEventListener('click', function (e) { e.stopPropagation(); show(Number(d.dataset.i)); });
    });
    imgs.forEach(function (im) {
      im.addEventListener('click', function () { go('story', im.getAttribute('data-id')); });
    });
    if (heroTimer) clearInterval(heroTimer);
    heroTimer = setInterval(function () { show(heroIdx + 1); }, 6000);
    show(0);
  }
  function spinWheel() {
    var f = CC.flavors || [];
    if (!f.length || wheelAnim) return;                 /* 正在转就别重复触发 */
    var idx = Math.floor(Math.random() * f.length);
    /* 指针在正上方（0°），标签在第 idx 段的正中间（idx*30+15）；
       要让这个标签转到正上方，旋转量必须是 -(idx*30+15)，再往前多转 4 圈 */
    var base = wheelRot - (((wheelRot % 360) + 360) % 360);
    var from = wheelRot, to = base + 360 * 4 - (idx * 30 + 15);
    var dur = 4200, t0 = performance.now();
    var disc = $('#wheelDisc') || $('#wheel');
    var txts = $$('.wheel-labels .wl-txt');             /* 每个标签里的文字，要一直保持水平 */
    Sfx.sizzle();
    var finished = false;
    function finish() {                                 /* 兜底：切到别的标签页时 rAF 会被暂停，用定时器保证一定收尾 */
      if (finished) return;
      finished = true;
      wheelAnim = null;
      wheelRot = to;
      txts.forEach(function (el) { el.style.transform = 'rotate(' + (-to) + 'deg)'; });
      if (disc) disc.style.transform = 'rotate(' + to + 'deg)';
      var x = f[idx % f.length];            /* 对上以后不用再反着取 */
      var el2 = $('#flavorCard');
      if (el2) el2.innerHTML = '<h3 class="h3">' + esc(x.zh) + ' ' + speakBtn(x.zh) + '</h3>' + pyLine(x.py) + enLine(x.en) +
        '<div class="taste-chips"><span class="taste-chip">' + esc(x.taste) + '</span></div>' +
        '<p class="small">' + esc(x.desc.zh) + enLine(x.desc.en) + '</p>' +
        '<p class="small muted">代表菜：' + x.dishes.map(esc).join('、') + '</p>';
      Sfx.ding();
      pandaSay('home', '这个味型叫 <b>' + esc(x.zh) + '</b>，代表菜是' + esc(x.dishes[0]) + '。', 'happy');
    }
    function frame(now) {
      var t = Math.min(1, (now - t0) / dur);
      var e = 1 - Math.pow(1 - t, 3);                   /* ease-out：先快后慢 */
      var r = from + (to - from) * e;
      disc.style.transform = 'rotate(' + r + 'deg)';
      txts.forEach(function (el) { el.style.transform = 'rotate(' + (-r) + 'deg)'; });
      if (t < 1) { wheelAnim = requestAnimationFrame(frame); return; }
      finish();
    }
    wheelAnim = requestAnimationFrame(frame);
    setTimeout(finish, dur + 150);
  }

  function showSources() {
    openModal('<h2 class="h2">资料清单</h2>' +
      '<p class="small muted">下面是本次编写时实际查阅、抓取到的公开网页（按站点归类）。课堂使用时可以直接打开对照。</p>' +
      '<ul class="small">' +
      ['豌杂面的家常做法（耙豌豆 + 肉杂酱 + 手擀面）与碗底调味 —— 小红书教程笔记《在家复刻路边摊豌杂面》',
       '回锅肉"一煮二炒三回锅"与"灯盏窝"的说法 —— 美食天下菜谱、搜狐《这才是回锅肉正宗做法》',
       '四季豆含皂甙与红细胞凝集素、必须彻底加热 —— 搜狐科普文章',
       '宫保鸡丁"糊辣荔枝味"碗汁比例（生抽 2 : 醋 1.5 : 糖 1 : 淀粉 0.5 : 水 3）—— 新浪新闻《宫保鸡丁的做法》',
       '麻婆豆腐用嫩豆腐 400 克、肉末、豆瓣酱、豆豉、花椒粉，分次勾芡 —— 网易《正宗麻婆豆腐做法全解析》、豆果美食菜谱',
       '水煮牛肉源于自贡盐场役牛、盐工以盐水加花椒辣椒煮食 —— 学术之家《水煮牛肉的来历》、今日头条文章',
       '冷吃牛肉属于自贡盐帮菜的"冷吃"系列（同门有自贡冷吃兔），先煮后炒干、冷却后香味更浓 —— 百度百科《自贡冷吃兔》《冷吃牛肉》、百度文库《冷吃牛肉的典故》',
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
      '</div>' +
      '<div class="filters" id="filters">' + filters.map(function (f) {
        return '<button class="filter-chip' + (dishFilter === f[0] ? ' on' : '') + '" data-f="' + f[0] + '">' + f[1] + '</button>';
      }).join('') + '</div><div class="dish-grid" id="dishGrid"></div><div class="pager" id="dishPager"></div></div>';
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
  function paintDishes(page) {
    var list = (CC.dishes || []).filter(function (d) {
      if (dishFilter === 'easy') return d.difficulty === 1;
      if (dishFilter === 'hot') return d.heat >= 3;
      if (dishFilter === 'mild') return d.heat <= 2;
      if (dishFilter === 'quick') return d.minutes <= 20;
      if (dishFilter === 'veg') return d.tags.indexOf('素菜') >= 0;
      return true;
    });
    /* 分页：8 条一页（上 4 下 4） */
    var per = 8;
    var pages = Math.max(1, Math.ceil(list.length / per));
    page = page || 0;
    if (page < 0) page = pages - 1;
    if (page >= pages) page = 0;
    var pg = $('#dishPager');
    if (pg) {
      pg.innerHTML = '<button class="btn btn-sm" data-pg="' + (page - 1) + '"' + (pages < 2 ? ' disabled' : '') + '>‹ 上一页</button>' +
        '<span class="muted small">第 ' + (page + 1) + ' / ' + pages + ' 页</span>' +
        '<button class="btn btn-sm" data-pg="' + (page + 1) + '"' + (pages < 2 ? ' disabled' : '') + '>下一页 ›</button>';
      $$('#dishPager [data-pg]').forEach(function (b) {
        b.addEventListener('click', function () { paintDishes(+b.dataset.pg); Sfx.pop(); });
      });
    }
    $('#dishGrid').innerHTML = list.slice(page * per, page * per + per).map(function (d) {
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
  var prepPage = 0;          /* 备菜页分页页码 */
  function renderPrep() {
    var d = dishById(S.dish) || dishById((CC.dishes || [])[0].id);
    S.dish = d.id;
    if (current.sub === 'board') return renderPrepBoard(d);
    if (current.sub === 'seasonings') return renderPrepSeasonings(d);
    return renderPrepMenu(d);
  }
  /* 备菜页 = 两张卡的导航菜单：备菜（砧板）/ 用到的调料 */
  function renderPrepMenu(d) {
    var done = (S.prepped[d.id] || []).length;
    app.innerHTML = '<div class="view"><div class="view-head"><span class="eyebrow">备菜 · 砧板</span>' +
      '<h1 class="h1">' + d.emoji + ' ' + esc(d.name) + ' 的备菜</h1>' +
      '<p class="lead">先选一件事：处理食材，还是先认识这道菜要用到的调料。</p></div>' +
      dishStrip() +
      '<div class="vocab-menu vm-2">' +
        '<a class="vm-card" href="#/prep/' + d.id + '/board">' +
          '<span class="vm-ico">🔪</span><span class="vm-title">备菜</span>' +
          '<span class="vm-sub">每样食材都要"处理"一下：看清它是什么，再选出正确的动作——切片？切丝？还是剁末？</span>' +
          '<span class="vm-meta">已备好 ' + done + ' / ' + d.prep.length + ' 种食材</span>' +
          '<span class="vm-go">进去看看 ›</span></a>' +
        '<a class="vm-card" href="#/prep/' + d.id + '/seasonings">' +
          '<span class="vm-ico">🧂</span><span class="vm-title">用到的调料</span>' +
          '<span class="vm-sub">点一下调料卡，听发音，看看它在川菜里做什么、放多少。</span>' +
          '<span class="vm-meta">' + (d.seasonings || []).length + ' 种调料' + (d.flavorTask ? ' · 附味型小任务' : '') + '</span>' +
          '<span class="vm-go">进去看看 ›</span></a>' +
      '</div>' +
      '<div style="margin:16px 0 6px;display:flex;gap:10px;flex-wrap:wrap">' +
      '<a class="btn" href="#/story/' + d.id + '">📖 文化故事</a>' +
      '<button class="btn" data-route="dishes">🍽️ 换一道菜</button>' +
      '<button class="btn btn-gold" data-route="cook">🔥 直接上灶</button></div></div>';
    bindStrip();
    pandaSay('prep');
  }
  function renderPrepBoard(d) {
    var done = S.prepped[d.id] || [];
    var pct = Math.round(done.length / d.prep.length * 100);
    app.innerHTML = '<div class="view"><a class="vocab-back" href="#/prep/' + d.id + '">‹ 返回备菜</a>' +
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

      '<section class="culture-section"><div class="card"><h3 class="h3">💡 这道菜的小窍门</h3>' +
      d.tips.map(function (t) { return '<p class="small">• ' + esc(t.zh) + enLine(t.en) + '</p>'; }).join('') +
      '<p class="small muted">看完了就去"上灶"吧，火候和顺序在等着你。</p></div></section>' +
      '<div style="margin:18px 0 6px;display:flex;gap:10px;flex-wrap:wrap">' +
      '<button class="btn" data-route="prep">‹ 返回备菜</button>' +
      '<button class="btn btn-gold" data-route="dishes">🍽️ 换一道菜</button></div></div>';
    bindStrip();

    paintIngredients(d);
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
  function renderPrepSeasonings(d) {
    app.innerHTML = '<div class="view"><a class="vocab-back" href="#/prep/' + d.id + '">‹ 返回备菜</a>' +
      '<section class="culture-section"><div class="view-head"><span class="eyebrow">调味台</span>' +
      '<h2 class="h2">' + d.emoji + ' ' + esc(d.name) + ' 要用到的调料</h2>' +
      '<p class="lead">点一张调料卡：它是干什么的、什么时候用，还有两个例句。<span class="en">Tap a card for its use, when to add it, and example sentences.</span></p></div>' +
      '<div class="season-grid" id="seasonGrid"></div>' +
      (d.flavorTask ? '<div class="card flavor-task culture-section" id="flavorTask"></div>' : '') +
      '</section>' +
      '<div style="margin:18px 0 6px;display:flex;gap:10px;flex-wrap:wrap">' +
      '<button class="btn" data-route="prep">‹ 返回备菜</button>' +
      '<button class="btn btn-gold" data-route="dishes">🍽️ 换一道菜</button></div></div>';
    paintSeasonings(d);
    if (d.flavorTask) paintFlavorTask(d);
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
        if (current.name === 'cook') { renderCook(); return; }
        if (current.name === 'story') { renderStory(); return; }   /* 文化故事页：换菜留在故事页 */
        if (current.sub) { go('prep', b.dataset.strip + '/' + current.sub); return; }   /* 在子页里换菜 → 停在同一个子页 */
        renderPrep();
      });
    });
  }
  function donePush(dishId, ingId) {
    if (!S.prepped[dishId]) S.prepped[dishId] = [];
    if (S.prepped[dishId].indexOf(ingId) < 0) S.prepped[dishId].push(ingId);
    save();
  }
  /* 砧板头部的进度数字 + 进度条（处理食材只重画食材格，这里补一次头部） */
  function refreshPrepHead(d) {
    var done = (S.prepped[d.id] || []).length;
    var c = $('#prepCount'), f = $('#prepFill');
    if (c) c.textContent = done + ' / ' + d.prep.length;
    if (f) f.style.width = Math.round(done / d.prep.length * 100) + '%';
  }
  function paintIngredients(d) {
    var done = S.prepped[d.id] || [];
    /* 分页：每页 6 种食材，一屏放得下；多出的翻页 */
    var per = 6;
    var pages = Math.max(1, Math.ceil(d.prep.length / per));
    if (typeof prepPage !== 'number' || prepPage >= pages) prepPage = 0;
    var view = d.prep.slice(prepPage * per, prepPage * per + per);
    $('#ingGrid').innerHTML = view.map(function (p, i) {
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
        return '<div class="ingredient-tile' + (isDone ? ' done' : '') + '" data-ing="' + p.ing + '" data-correct="' + correct +
          '" data-opts="' + opts.join(',') + '" title="点一下看大图和做法">' +
        (isDone ? '<span class="done-flag">已备好</span>' : '') +
        '<div class="ing-top"><span class="ing-emoji" draggable="true" data-drag="' + p.ing + '">' +
        ingPhotoImg(p.ing, 'item-photo', ing.zh, ing.emoji) + '</span>' +
        '<div><div class="ing-name">' + esc(ing.zh) + '</div>' + pyLine(ing.py) + '<div class="ing-qty">' + esc(p.qty) + ' · ' + esc(ing.en) + '</div></div></div>' +
        '<div class="ing-note">' + esc(p.note.zh) + enLine(p.note.en) + '</div>' +
        (isDone ? '<div class="sentence-pop">' + esc(PREP_SENTENCE[correct] ? PREP_SENTENCE[correct].zh(ing.zh) : '') +
          '<span class="en">' + esc(PREP_SENTENCE[correct] ? PREP_SENTENCE[correct].en(ing.en) : '') + '</span></div>' :
          '<div class="ing-actions">' + opts.map(function (o) {
            var a = CC.actions[o];
            return '<button class="action-btn" data-act="' + o + '">' + a.emoji + ' ' + esc(a.zh) + '</button>';
          }).join('') + '</div>') +
        '</div>';
    }).join('') +
      (pages > 1
        ? '<div class="pager" style="grid-column:1/-1">' +
          '<button class="btn btn-sm" data-pg="' + (prepPage - 1) + '">‹ 上一页</button>' +
          '<span class="muted small">第 ' + (prepPage + 1) + ' / ' + pages + ' 页</span>' +
          '<button class="btn btn-sm" data-pg="' + (prepPage + 1) + '">下一页 ›</button></div>'
        : '');
    bindIngredients(d);
    paintBasket(d);
    refreshPrepHead(d);
    var grid = $('#ingGrid');
    if (grid && !grid.dataset.pagerBound) {
      grid.dataset.pagerBound = '1';
      grid.addEventListener('click', function (e) {
        var b = e.target.closest('[data-pg]');
        if (!b) return;
        var n = +b.dataset.pg;
        var total = Math.max(1, Math.ceil((dishById(S.dish).prep.length) / 6));
        prepPage = n < 0 ? total - 1 : (n >= total ? 0 : n);
        paintIngredients(dishById(S.dish));
        Sfx.pop();
      });
    }
  }
  function bindIngredients(d) {
    /* 处理食材只重画了食材格，砧板头部的「备菜进度」也得跟着刷新 */
    $$('#ingGrid .ingredient-tile').forEach(function (tile) {
      var ingId = tile.dataset.ing, correct = tile.dataset.correct;
      tile.addEventListener('click', function (e) {
        var btn = e.target.closest('[data-act]');
        if (btn) {
          if (tile.classList.contains('done')) return;
          judge(btn.dataset.act, btn);
          return;
        }
        openIngModal(d, ingId, correct);      /* 点卡片本身 → 弹出大图弹窗 */
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
  /* 食材卡弹窗：文字和卡片一致，图片可以点开放大 */
  function openIngModal(d, ingId, correct) {
    var ing = ingInfo(ingId);
    var p = (d.prep || []).filter(function (x) { return x.ing === ingId; })[0] || { qty: '', note: { zh: '', en: '' } };
    var tile = document.querySelector('.ingredient-tile[data-ing="' + ingId + '"]');
    var opts = (tile && tile.dataset.opts ? tile.dataset.opts.split(',') : [correct]);
    var isDone = (S.prepped[d.id] || []).indexOf(ingId) >= 0;
    openModal('<div class="ing-modal">' +
      '<div class="ing-modal-photo" id="ingZoom" title="点一下放大">' +
      '<span class="zoom-tip">🔍 点图片放大</span>' +
      ingPhotoImg(ingId, 'ing-big-photo', ing.zh, ing.emoji) + '</div>' +
      '<h3 class="h3" style="margin-top:12px">' + esc(ing.zh) + ' ' + speakBtn(ing.zh) + '</h3>' +
      pyLine(ing.py) +
      '<div class="small muted">' + esc(p.qty) + ' · ' + esc(ing.en) + '</div>' +
      '<p class="small" style="margin-top:10px">' + esc(p.note.zh) + enLine(p.note.en) + '</p>' +
      (isDone
        ? '<div class="hint-box good"><span>✅</span><div>这种食材已经备好了。<span class="en">Already prepared.</span></div></div>'
        : '<div class="small muted" style="margin-top:8px">它要怎么处理？选一个：</div>' +
          '<div class="ing-actions" id="ingModalActions">' + opts.map(function (o) {
            var a = CC.actions[o];
            return '<button class="action-btn" data-act="' + o + '">' + a.emoji + ' ' + esc(a.zh) + '</button>';
          }).join('') + '</div><div id="ingModalFb"></div>') +
      '</div>');

    $('#ingZoom').addEventListener('click', function () {
      var im = $('#ingZoom img');
      openPhotoModal(im ? im.getAttribute('src') : '', ing.zh + ' ' + ing.py + ' · ' + (p.qty || ''));
    });
    $$('#ingModalActions [data-act]').forEach(function (b) {
      b.addEventListener('click', function () {
        if (b.dataset.act === correct) {
          donePush(d.id, ingId); Sfx.chop();
          paintIngredients(d); updatePrepProgress(d); paintBasket(d);
          var left = d.prep.length - (S.prepped[d.id] || []).length;
          if (left === 0) { awardBadge('knife'); toast('备菜完成！可以去上灶了 🔥'); pandaSay('prep', '全部备好了！<b>锅已经热了</b>，我们去上灶。', 'happy'); }
          else toast('✅ ' + ing.zh + ' 备好了，还剩 ' + left + ' 种');
          closeModal();
        } else {
          Sfx.error();
          b.classList.add('wrong');
          setTimeout(function () { b.classList.remove('wrong'); }, 700);
          var a = CC.actions[correct];
          $('#ingModalFb').innerHTML = '<div class="hint-box bad" style="margin-top:10px"><span>⚠️</span><div>再想想～这种食材要“<b>' +
            esc(a.zh) + '</b>”（' + esc(a.py) + '，' + esc(a.en) + '）。<span class="en">Wrong action — try again.</span></div></div>';
          pandaSay('wrong', '再想想～这种食材要“<b>' + esc(a.zh) + '</b>”。', 'oh');
        }
      });
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
    var list = d.seasonings.map(function (id) { return seasonInfo(id) || ingInfo(id); });
    $('#seasonGrid').innerHTML = list.map(function (s, i) {
      var id = s.id;
      var taste = (s.taste || []).map(function (t) { return '<span class="taste-chip">' + esc(t) + '</span>'; }).join('');
      var qty = (d.seasonQty || {})[id];
      return '<div class="season-card" data-season="' + i + '" title="点开看它的用法和例句">' +
        '<div class="emoji"><img class="item-photo season-photo" src="assets/img/s/' + id + '.jpg" alt="' + esc(s.zh) + '" loading="lazy" onerror="this.style.display=\'none\';this.nextElementSibling.style.display=\'block\'">' +
        '<span class="item-emoji" style="display:none">' + s.emoji + '</span></div>' +
        '<div class="dish-name" style="font-size:15px">' + esc(s.zh) + '</div>' +
        pyLine(s.py) + enLine(s.en) +
        (qty ? '<div class="tag" style="margin-top:6px">用量 ' + esc(qty) + '</div>' : '') +
        (taste ? '<div style="margin-top:6px">' + taste + '</div>' : '') +
        '<div class="use">' + esc(s.use ? s.use.zh : (s.cat || '')) + '</div></div>';
    }).join('');
    $$('#seasonGrid .season-card').forEach(function (c) {
      c.addEventListener('click', function () {
        Sfx.pop();
        openSeasonModal(list, +c.dataset.season);
      });
    });
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
  /* ============ 上灶页：步骤拆解（横向滚动步骤菜单 + 左边文字 / 右边实拍图） ============ */
  var cookStep = 0;
  var STEP_LABEL = { heat: '🔥 火候', order: '🥢 下锅顺序', season: '🥄 调味', stir: '💨 翻炒', wait: '⏳ 计时', finish: '🍽️ 上菜' };
  function stepCropOf(d, i) {
    var map = (window.STEP_CROPS || {})[d.id];
    if (!map || !map[i]) return '';
    return 'assets/img/stepcrop/' + d.id + '/' + map[i];
  }
  /* 步骤答案：拆解页要把"答案"直接讲出来，不能只留一个问句 */
  function stepAnswerLine(st) {
    if ((st.type === 'order' || st.type === 'season') && st.answer) {
      var hit = null;
      (st.options || []).forEach(function (o) { if (o.id === st.answer) hit = o; });
      if (hit) return '👉 答案：' + (hit.emoji ? hit.emoji + ' ' : '') + hit.zh;
      if (st.answer === 'none') return '👉 答案：不用放';
    }
    if (st.type === 'heat' && st.heat && CC.heat && CC.heat[st.heat]) {
      var h = CC.heat[st.heat];
      return '👉 火候：' + h.emoji + ' ' + h.zh + '（' + h.py + '）';
    }
    if (st.type === 'stir' && st.target) return '👉 翻炒 ' + st.target + ' 下';
    if (st.type === 'wait' && st.seconds) return '👉 计时：' + st.seconds + ' 秒（课堂加速）';
    return '';
  }
  /* ============ 选菜 · 文化故事（每道菜的来历）============ */
  function renderStory() {
    var d = dishById(S.dish) || dishById((CC.dishes || [])[0].id);
    S.dish = d.id;
    var det = (window.CC_STORY_DETAIL || {})[d.id] || {};
    var dots = '';
    for (var i = 1; i <= 5; i++) dots += '<i class="heat-dot' + (i <= d.heat ? ' on' : '') + '"></i>';
    var nPts = (det.points || []).length;
    app.innerHTML = '<div class="view">' +
      '<a class="vocab-back" href="#/dishes">‹ 返回选菜</a>' +
      '<div class="view-head"><span class="eyebrow">选菜 · 文化故事</span>' +
      '<div class="story-title-row">' +
      '<h1 class="h1">📖 ' + esc(d.name) + ' 的故事</h1>' +
      (nPts ? '<button class="btn btn-sm story-link" id="storyPointsBtn" type="button">🏮 ' + nPts + ' 个文化点</button>' : '') +
      '</div>' +
      (det.lead ? '<p class="lead">' + esc(det.lead) + '</p>' : '') + '</div>' +
      '<div class="story-grid">' +
      '<div class="card story-photo">' +
      '<img src="assets/img/dish-' + d.id + '.jpg" alt="' + esc(d.name) + ' 成品图" loading="lazy">' +
      '<div class="story-photo-meta"><span class="heat-dots">' + dots + '</span>' +
      '<span>⏱ ' + d.minutes + ' 分钟</span><span>' + esc(d.region) + '</span></div>' +
      '<div class="dish-tags" style="margin-top:8px"><span class="tag">' + esc(d.flavor) + '</span>' +
      (d.tags || []).map(function (t) { return '<span class="tag">' + esc(t) + '</span>'; }).join('') + '</div>' +
      '</div>' +
      '<div class="card story-main">' +
      '<h3 class="h3">这道菜是怎么来的</h3>' +
      '<p>' + esc(d.story.zh) + '</p>' + pyLine(d.story.py) + enLine(d.story.en) +
      '</div></div>' +
      '<div class="story-cta">' +
      '<a class="btn btn-primary" href="#/prep/' + d.id + '">🔪 去备菜</a>' +
      '<a class="btn" href="#/cook/' + d.id + '">🔥 直接上灶</a>' +
      '<a class="btn btn-gold" href="#/culture">🏮 看更多川菜文化</a></div>' +
      '</div>';
    pandaSay('dishes');
    var pbtn = $('#storyPointsBtn');
    if (pbtn) pbtn.addEventListener('click', function () { Sfx.pop(); openStoryPoints(d); });
  }

  function renderCook() {
    var d = dishById(S.dish) || dishById((CC.dishes || [])[0].id);
    S.dish = d.id;
    cookStep = 0;
    app.innerHTML = '<div class="view"><div class="view-head"><span class="eyebrow">烹饪 · 上灶</span>' +
      '<h1 class="h1">' + d.emoji + ' ' + esc(d.name) + ' · 怎么做</h1>' +
      '<p class="lead">一共 <b>' + d.steps.length + '</b> 步。左边是这一步的做法，右边是这一步的实拍图，跟着做就行。</p>' +
      '<button class="btn btn-sm head-clear" id="clearProgress">清空做菜进度</button></div>' +
      dishStrip() +
      '<div id="stepView"></div>' +
      '<div class="step-foot">' +
      '<button class="btn" id="stepPrev">‹ 上一步</button>' +
      '<span class="muted small" id="stepPos">1 / ' + d.steps.length + '</span>' +
      '<button class="btn" id="stepNext">下一步 ›</button>' +
      '<span class="step-gate" id="stepGate"></span>' +
      '<button class="btn btn-gold" id="videoBtn">🎬 看真人做法</button></div>' +
      '</div>';
    bindStrip();
    paintCookStep(0);
    $('#videoBtn').addEventListener('click', function () { openVideo(d); });
    $('#stepPrev').addEventListener('click', function () { paintCookStep(cookStep - 1); });
    $('#stepNext').addEventListener('click', function () { paintCookStep(cookStep + 1); });
    $('#clearProgress').addEventListener('click', function () { openClearProgress(d); });
    pandaSay('cook');
  }
  /* 清空做菜进度：这道菜 / 全部 8 道菜 */
  function clearCooking(ids) {
    ids.forEach(function (id) { delete S.prepped[id]; delete S.cooked[id]; });
    S.stirs = 0; S.hands = 0;
    actState = {};
    save();
  }
  function openClearProgress(d) {
    var all = (CC.dishes || []).length;
    openModal('<h3 class="h3">清空做菜进度</h3>' +
      '<p class="small">清掉以后，备菜的勾选、这道菜的星星，还有这一页的动手记录都会归零（词汇、小测的记录不动）。</p>' +
      '<div style="display:flex;gap:10px;flex-wrap:wrap">' +
      '<button class="btn btn-primary" id="clearThis">只清「' + esc(d.name) + '」</button>' +
      '<button class="btn" id="clearAll">清空全部 ' + all + ' 道菜</button>' +
      '<button class="btn" data-close="1">先不清</button></div>');
    $('#clearThis').addEventListener('click', function () {
      clearCooking([d.id]);
      closeModal();
      renderCook();
      pandaSay('cook', '「' + esc(d.name) + '」的进度清好了，可以再做一遍。', 'happy');
      toast('已清空「' + d.name + '」的进度');
    });
    $('#clearAll').addEventListener('click', function () {
      clearCooking((CC.dishes || []).map(function (x) { return x.id; }));
      closeModal();
      renderCook();
      pandaSay('cook', '全部做菜进度都清空了，重新开始吧。', 'happy');
      toast('已清空全部做菜进度');
    });
  }
  /* ============ 上灶页：动手键（模拟做菜的小互动）============
     放在"👉 火候/答案"那一行的右边。按这一步该做的动作给 2–4 个键：
     切配（连点 5 刀）/ 火候 / 计时 / 翻炒 / 下锅 / 装盘放凉，外加一个"尝一口"。
     点一下 = 音效 + 飘一个 emoji + 熊猫说一句；点错只提示、不扣分。 */
  var actState = {};                     /* '菜:步:键' → 已点次数（本次会话内记着） */
  var ACT_LINES = {
    chop: ['沙沙沙，刀要斜着下。', '听到这个声音就对了。', '切得挺匀，手腕别太用力。'],
    cutTick: ['好，继续，别切到手。', '刀口要斜一点，切得才利落。', '顺着食材划，别压太狠。'],
    cutDone: ['切好了！大小差不多，这样受热才均匀。', '漂亮，切得挺匀。', '这一盘切得可以上灶了。'],
    mix: ['拌的时候从底下兜上来。', '每根都要沾到酱，别偷懒。'],
    soak: ['泡上，等下锅就不容易糊。', '热水泡一下，香味更足。'],
    fire: ['火候对了，香味马上出来。', '听，油开始响了。', '火别太大，慢慢来。'],
    timer: ['计时开始，别走开。', '趁这个时间把碗摆好。'],
    stir: ['翻炒别停，手腕带一下。', '每一下都从锅底兜上来。', '香味出来了！'],
    drop: ['下锅喽！', '这一勺就是味道的关键。', '顺着锅边倒，别溅出来。'],
    plate: ['装盘！颜色真好看。', '摆整齐一点，更好看。'],
    cool: ['放凉是这道菜的秘密武器。', '凉了以后更香，等着瞧。'],
    taste: ['小心烫！尝一口，再调调味道。', '自己尝尝，咸淡最准。', '这一口，值了。']
  };
  function randLine(a) { return a[Math.floor(Math.random() * a.length)]; }
  /* 真实照片素材：厨具用实拍图，食材/调料用抠图或照片（拿不到再加兜底） */
  var PIC = {
    knife: ['assets/img/cut/t/3.png', 'assets/img/t/3.jpg'],
    spatula: ['assets/img/cut/t/2.png', 'assets/img/t/2.jpg'],
    wok: ['assets/img/cut/t/1.png', 'assets/img/t/1.jpg'],
    plate: ['assets/img/cut/t/6.png', 'assets/img/t/6.jpg'],
    bowl: ['assets/img/cut/t/5.png', 'assets/img/t/5.jpg'],
    chopsticks: ['assets/img/cut/t/7.png', 'assets/img/t/7.jpg'],
    stove: ['assets/img/cut/t/12.png', 'assets/img/t/12.jpg'],
    board: ['assets/img/cut/t/4.png', 'assets/img/t/4.jpg']
  };
  function materialIdsOf(d, st) {
    var A = (window.STEP_ASSETS || {})[d.id] || {}, out = [];
    (st.add || []).forEach(function (e) {
      var id = A[e];
      if (id && id !== 'x' && out.indexOf(id) < 0) out.push(id);
    });
    return out;
  }
  /* 一个 id 的照片：优先透明抠图 → 调料照片 → 食材照片 → cut 目录 */
  function photoChain(id) {
    return [
      'assets/img/cut/s/' + id + '.png', 'assets/img/cut/i/' + id + '.png',
      'assets/img/cut/c/' + id + '.png', 'assets/img/cut/cs/' + id + '.png',
      'assets/img/cs/' + id + '.png', 'assets/img/c/' + id + '.png',
      'assets/img/s/' + id + '.jpg', 'assets/img/i/' + id + '.jpg'
    ];
  }
  function chainImg(chain, cls, title) {
    return '<img class="' + cls + '" src="' + chain[0] + '" alt="' + esc(title || '') + '"' +
      ' data-fb="' + chain.slice(1).join('|') + '">';
  }
  /* 注意：这里必须叫 matPhoto，不能叫 photoImg —— 上面 330 行已经有个 photoImg(中文名)，
     同名函数声明会互相覆盖（之前就是这么把词汇页的图搞挂的）。 */
  function matPhoto(id, cls, title) {
    return chainImg(photoChain(id), cls, title);
  }
  /* 图挂了就顺着兜底链换下一张；全挂了就把这张图删掉 */
  function bindPhotoFallback(root) {
    if (!root) return;
    Array.prototype.forEach.call(root.querySelectorAll('img[data-fb]'), function (im) {
      im.addEventListener('error', function () {
        var chain = (im.getAttribute('data-fb') || '').split('|').filter(Boolean);
        if (!chain.length) { im.remove(); return; }
        im.setAttribute('data-fb', chain.slice(1).join('|'));
        im.src = chain[0];
      });
    });
  }
  function cutKeyOf(zh) {
    var s = zh || '';
    var rules = [
      { re: /切成?条|切条|切成?细条/, ok: '切成条', bad: ['拍碎', '切成丝'] },
      { re: /切成?丝|切丝|切成?细丝/, ok: '切成丝', bad: ['拍碎', '切成块'] },
      { re: /切成?片|切片|切薄片/, ok: '切成片', bad: ['切成丝', '拍碎'] },
      { re: /切成?段|切段|剪成段/, ok: '切成段', bad: ['切成丝', '拍碎'] },
      { re: /切成?丁|切丁/, ok: '切成丁', bad: ['切成丝', '拍碎'] },
      { re: /切末|剁成末|切成末|剁碎/, ok: '剁成末', bad: ['切成块', '拍碎'] },
      { re: /拍碎|拍一拍|拍散/, ok: '拍碎', bad: ['切成丝', '切成块'] },
      { re: /切成?块|切块/, ok: '切成块', bad: ['切成丝', '拍碎'] }
    ];
    for (var i = 0; i < rules.length; i++) if (rules[i].re.test(s)) return rules[i];
    return null;
  }
  function cookActionKeys(d, st, i) {
    var zh = st.zh || '', keys = [], cut = cutKeyOf(zh);
    var mats = materialIdsOf(d, st);
    if (cut) {
      keys.push({ id: 'chop', label: '切一切', pic: PIC.knife, need: 5, sfx: 'knife', line: ACT_LINES.chop });
      keys.push({ id: 'cut-ok', label: cut.ok, pic: PIC.knife, need: 1, correct: true, sfx: 'knife', popId: mats[0], line: ['对，就是这样——' + cut.ok + '。'] });
      keys.push({ id: 'cut-bad', label: cut.bad[0], pic: PIC.knife, need: 1, wrong: true, line: ['这一步要' + cut.ok + '哦，不是' + cut.bad[0] + '。'] });
    } else if (st.type === 'heat') {
      var hm = (CC.heat || {})[st.heat] || {};
      keys.push({ id: 'fire', label: (st.heat === 'da' ? '调大火' : st.heat === 'xiao' ? '调小火' : '开火'), pic: PIC.stove, need: 1, correct: true, sfx: 'ignite', line: ACT_LINES.fire });
      keys.push({ id: 'fire-bad', label: (st.heat === 'da' ? '用最小火' : '一直开大火'), need: 1, wrong: true, line: ['火候不对：这一步要' + (hm.zh || '看准火候') + '。'] });
    } else if (st.type === 'stir') {
      keys.push({ id: 'stir', label: '翻炒', pic: PIC.spatula, need: st.target || 8, sfx: 'fry', line: ACT_LINES.stir, stir: true });
    } else if (/拌/.test(zh)) {
      keys.push({ id: 'mix', label: '拌一拌', pic: PIC.chopsticks, need: 3, sfx: 'scrape', line: ACT_LINES.mix });
    } else if (/泡|浸/.test(zh)) {
      keys.push({ id: 'soak', label: '泡一下', pic: PIC.bowl, need: 1, correct: true, sfx: 'water', line: ACT_LINES.soak });
    } else if (st.type === 'wait') {
      keys.push({ id: 'timer', label: '开始计时', pic: PIC.stove, need: 1, correct: true, sfx: 'timer', line: ACT_LINES.timer });
    } else if (st.type === 'order' || st.type === 'season') {
      keys.push({ id: 'drop', label: '加进去', shopId: mats[0], need: 1, correct: true, sfx: 'dropSound', line: ACT_LINES.drop });
    } else if (st.type === 'finish') {
      keys.push({ id: 'plate', label: '装盘', pic: PIC.plate, need: 1, correct: true, sfx: 'clink', line: ACT_LINES.plate });
      keys.push({ id: 'cool', label: '放凉', need: 1, correct: true, sfx: 'bubble', line: ACT_LINES.cool });
    }
    /* 尝一口只在最后一步出现（用户要求） */
    if (i === d.steps.length - 1 || st.type === 'finish') {
      keys.push({ id: 'taste', label: '尝一口', pic: PIC.chopsticks, need: 1, sfx: 'sip', popId: mats[0], line: ACT_LINES.taste });
    }
    return keys;
  }
  function cookActionsHTML(d, st, i) {
    var keys = cookActionKeys(d, st, i);
    return '<div class="act-row">' + keys.map(function (k) {
      return '<button class="act-key" data-act="' + k.id + '" data-need="' + k.need + '" title="点一下试试">' +
        (k.pic ? chainImg(k.pic, 'act-ico') : (k.shopId ? matPhoto(k.shopId, 'act-ico') : '')) +
        '<span class="act-label">' + k.label + '</span>' +
        '<span class="tick">' + (k.need > 1 ? '0/' + k.need : '') + '</span></button>';
    }).join('') + dragChipHTML(d, st) + '</div>';
  }
  function dragChipHTML(d, st) {
    if (!(st.type === 'order' || st.type === 'season')) return '';
    var label = stepAnswerLabel(st);
    if (!label) return '';
    var mats = materialIdsOf(d, st);
    var pics = mats.slice(0, 3).map(function (id) { return matPhoto(id, 'drag-pic', label); }).join('');
    return '<div class="drag-chip" data-label="' + esc(label) + '" title="按住它，拖到右边的实拍图上">' +
      (pics || '') + '<span class="drag-name">' + label + '</span><span class="drag-tip">拖到图上 ›</span></div>';
  }
  function fxAtPop(btn, id) {
    if (!id) return;
    var row = btn.parentNode;
    if (!row) return;
    var sp = document.createElement('span');
    sp.className = 'act-pop';
    sp.innerHTML = matPhoto(id, 'act-pop-img');
    row.appendChild(sp);
    bindPhotoFallback(sp);
    setTimeout(function () { if (sp.parentNode) sp.parentNode.removeChild(sp); }, 1000);
  }
  function markActDone(btn, key) {
    btn.classList.remove('on');
    btn.classList.add('done');
    var t = btn.querySelector('.tick');
    if (t) t.textContent = '完成';
  }
  function bindCookActions(d, st, i) {
    var row = $('#stepView .act-row');
    if (!row) return;
    var keys = cookActionKeys(d, st, i);
    Array.prototype.forEach.call(row.querySelectorAll('.act-key'), function (btn) {
      var k = keys.filter(function (x) { return x.id === btn.getAttribute('data-act'); })[0];
      if (!k) return;
      var sk = d.id + ':' + i + ':' + k.id;
      actState[sk] = actState[sk] || 0;
      if (actState[sk] >= k.need) markActDone(btn, k);
      btn.addEventListener('click', function () {
        if (actState[sk] >= k.need) { pandaSay('cook', '这一步已经做好啦，点"下一步"继续。', 'happy'); return; }
        S.hands++;
        if (k.wrong) {
          Sfx.error();
          btn.classList.add('shake', 'bad');
          setTimeout(function () { btn.classList.remove('shake'); }, 360);
          pandaSay('cook', randLine(k.line), 'oh');
        } else {
          actState[sk]++;
          if (k.stir) S.stirs++;
          if (k.sfx && Sfx[k.sfx]) Sfx[k.sfx](k.shopId);
          fxAtPop(btn, k.popId);
          if (actState[sk] >= k.need) {
            markActDone(btn, k);
            Sfx.ding();
            pandaSay('cook', randLine(k.line), 'happy');
            if (k.id === 'stir') Sfx.fryHard();      /* 炒完这一轮：油锅最响的一下 */
            if (k.id === 'timer') setTimeout(function () { Sfx.boil(); }, 260);
            if (k.stir && S.stirs >= 100) awardBadge('stir');
            refreshStepGate(d, st, i);
          } else {
            btn.classList.add('on');
            var t = btn.querySelector('.tick');
            if (t) t.textContent = actState[sk] + '/' + k.need;
          }
        }
        save();
      });
    });
  }

  /* ---- 在实拍图上直接"切"：按住鼠标/手指在图上划，一刀一刀切完 ---- */
  function syncActButton(actId, n, need) {
    var btn = $('#stepView .act-key[data-act="' + actId + '"]');
    if (!btn) return;
    var t = btn.querySelector('.tick');
    if (n >= need) { btn.classList.remove('on'); btn.classList.add('done'); if (t) t.textContent = '完成'; }
    else { btn.classList.add('on'); if (t) t.textContent = n + '/' + need; }
  }
  function syncChopButton(n, need) { syncActButton('chop', n, need); }
  /* ---- 步骤闸门：这一步的关键动作做完了，才放出「下一步」 ---- */
  function keyRequired(k) { return !!k.correct || k.need > 1; }
  function requiredKeys(d, st, i) {
    return cookActionKeys(d, st, i).filter(keyRequired);
  }
  function stepDoneKeys(d, st, i) {
    var out = { done: 0, total: 0, missing: [] };
    requiredKeys(d, st, i).forEach(function (k) {
      out.total++;
      var sk = d.id + ':' + i + ':' + k.id;
      if ((actState[sk] || 0) >= k.need) out.done++;
      else out.missing.push(k.label + (k.need > 1 ? '（' + (actState[sk] || 0) + '/' + k.need + '）' : ''));
    });
    return out;
  }
  function refreshStepGate(d, st, i, quiet) {
    var next = $('#stepNext'), gate = $('#stepGate');
    if (!next) return;
    var info = stepDoneKeys(d, st, i);
    var ok = info.total === 0 || info.done >= info.total;
    var isLast = i >= d.steps.length - 1;
    if (isLast) {                       /* 最后一步本来就是"结束" */
      next.style.display = '';
      if (gate) gate.style.display = 'none';
      return;
    }
    next.style.display = ok ? '' : 'none';
    next.disabled = !ok;                 /* 藏起来也要点不动 */
    if (gate) {
      gate.style.display = ok ? 'none' : '';
      if (!ok) gate.textContent = '先做完这一步：' + info.missing.join('、');
    }
    if (ok && !quiet && next.dataset.gateWasOff === '1') {
      Sfx.ding();
      next.classList.add('gate-open');
      setTimeout(function () { next.classList.remove('gate-open'); }, 900);
      pandaSay('cook', '这一步做好了，可以点「下一步」。', 'happy');
    }
    next.dataset.gateWasOff = ok ? '0' : '1';
  }
  function bindPhotoCut(d, st, i, zoom) {
    var cut = cutKeyOf(st.zh);
    if (!cut) return;
    var wrap = $('#stepView .sbs-photo');
    if (!wrap || !wrap.querySelector('.step-photo')) return;
    var keys = cookActionKeys(d, st, i);
    var chop = keys.filter(function (k) { return k.id === 'chop'; })[0];
    var need = chop ? chop.need : 5;
    var sk = d.id + ':' + i + ':chop';
    if (actState[sk] >= need) { wrap.classList.add('cut-ready'); return; }   /* 已经切过就不重复铺层 */
    wrap.classList.add('cut-ready');
    var layer = document.createElement('div');
    layer.className = 'cut-layer';
    var hint = document.createElement('div');
    hint.className = 'cut-hint';
    function refresh() {
      var n = Math.min(actState[sk] || 0, need);
      hint.textContent = n >= need ? '切好了' : '按住鼠标，顺着食材划一刀（' + n + '/' + need + '）';
      if (n >= need) hint.classList.add('done');
      syncChopButton(n, need);
    }
    wrap.appendChild(layer);
    wrap.appendChild(hint);
    refresh();
    var stroke = null, moved = false, sx = 0, sy = 0;
    function pos(e) {
      var r = layer.getBoundingClientRect();
      return { x: e.clientX - r.left, y: e.clientY - r.top };
    }
    layer.addEventListener('pointerdown', function (e) {
      if ((actState[sk] || 0) >= need) return;
      var p = pos(e);
      stroke = { x: p.x, y: p.y, len: 0 };
      moved = false; sx = e.clientX; sy = e.clientY;
      if (layer.setPointerCapture) layer.setPointerCapture(e.pointerId);
      e.preventDefault();
    });
    layer.addEventListener('pointermove', function (e) {
      if (!stroke) return;
      if (!moved && (Math.abs(e.clientX - sx) + Math.abs(e.clientY - sy) > 8)) moved = true;
      if (!moved) return;
      var p = pos(e), dx = p.x - stroke.x, dy = p.y - stroke.y, len = Math.sqrt(dx * dx + dy * dy);
      if (len < 26) return;
      var mark = document.createElement('div');
      mark.className = 'cut-mark';
      mark.style.left = stroke.x + 'px';
      mark.style.top = stroke.y + 'px';
      mark.style.width = len + 'px';
      mark.style.transform = 'rotate(' + (Math.atan2(dy, dx) * 180 / Math.PI) + 'deg)';
      layer.appendChild(mark);
      setTimeout(function () { if (mark.parentNode) mark.parentNode.removeChild(mark); }, 1300);
      var knife = document.createElement('img');
      knife.className = 'cut-knife';
      knife.src = PIC.knife[0];
      knife.addEventListener('error', function () { knife.src = PIC.knife[1]; });
      knife.alt = '';
      knife.style.left = (p.x - 6) + 'px';
      knife.style.top = (p.y - 30) + 'px';
      layer.appendChild(knife);
      setTimeout(function () { if (knife.parentNode) knife.parentNode.removeChild(knife); }, 560);
      stroke.x = p.x; stroke.y = p.y; stroke.len += len;
    });
    function endStroke() {
      if (!stroke) return;
      var far = stroke.len, wasMoved = moved;
      stroke = null;
      if (!wasMoved || far < 60) return;          /* 只是点了一下，不算切 */
      actState[sk] = (actState[sk] || 0) + 1;
      S.hands++; save();
      Sfx.chop();
      if (actState[sk] >= need) { Sfx.ding(); pandaSay('cook', randLine(ACT_LINES.cutDone), 'happy'); }
      else pandaSay('cook', randLine(ACT_LINES.cutTick), 'happy');
      refresh();
      refreshStepGate(d, st, i);
    }
    layer.addEventListener('pointerup', endStroke);
    layer.addEventListener('pointercancel', function () { stroke = null; });
    /* 划动时别把"点图看大图"一起触发；没划动就还是看作点图 */
    layer.addEventListener('click', function (e) {
      if (moved) { e.stopPropagation(); e.preventDefault(); return; }
      if (zoom) zoom();
    });
  }

  /* ---- 「这一步 ↔ 最终成品」对比滑块 ---- */
  var BA_SLIDER = false;   /* 暂时不渲染：用户反馈"又大又不对题"，见交接文档；要开就改这里 */
  /* ---- 把调料拖进锅里（调味/下锅那几步） ---- */
  function stepAnswerLabel(st) {
    if (st.options && st.answer) {
      var hit = st.options.filter(function (o) { return o.id === st.answer; })[0];
      if (hit) return (hit.emoji ? hit.emoji + ' ' : '') + hit.zh;
    }
    return '';
  }
  /* 松手以后：真实食材/调料照片落到图上 + 几滴油花 */
  function dropPhotos(host, ids, x, y) {
    if (!host) return;
    var list = (ids && ids.length) ? ids : [null];
    list.forEach(function (id, k) {
      var el = document.createElement('span');
      el.className = 'drop-photo';
      el.style.left = (x + (k - (list.length - 1) / 2) * 34) + 'px';
      el.style.top = y + 'px';
      el.style.animationDelay = (k * 90) + 'ms';
      el.innerHTML = id ? matPhoto(id, 'drop-photo-img') : '';
      host.appendChild(el);
      bindPhotoFallback(el);
      setTimeout(function () { if (el.parentNode) el.parentNode.removeChild(el); }, 1600);
    });
    for (var i = 0; i < 8; i++) {
      var d = document.createElement('span');
      d.className = 'drop-bit';
      d.style.left = (x - 40 + Math.random() * 80) + 'px';
      d.style.top = (y - 10 + Math.random() * 20) + 'px';
      d.style.animationDelay = (i * 40) + 'ms';
      host.appendChild(d);
      setTimeout(function (el) { return function () { if (el.parentNode) el.parentNode.removeChild(el); }; }(d), 1200);
    }
  }
  function bindDragChip(d, st, i) {
    var chip = $('#stepView .drag-chip');
    if (!chip) return;
    var sk = d.id + ':' + i + ':drop';
    var keys = cookActionKeys(d, st, i);
    var dk = keys.filter(function (k) { return k.id === 'drop'; })[0];
    var need = dk ? dk.need : 1;
    var mats = materialIdsOf(d, st);
    var photo = $('#stepView .sbs-photo');
    var dragging = false, ghost = null, ox = 0, oy = 0;
    function overPhoto(e) {
      if (!photo) return false;
      var r = photo.getBoundingClientRect();
      return e.clientX >= r.left && e.clientX <= r.right && e.clientY >= r.top && e.clientY <= r.bottom;
    }
    function moveGhost(e) {
      if (!ghost) return;
      ghost.style.left = (e.clientX - ox) + 'px';
      ghost.style.top = (e.clientY - oy) + 'px';
      if (photo) photo.classList.toggle('drop-hot', overPhoto(e));
    }
    function clearGhost() {
      chip.classList.remove('ghost');
      if (ghost && ghost.parentNode) ghost.parentNode.removeChild(ghost);
      ghost = null;
      if (photo) photo.classList.remove('drop-hot');
    }
    if (actState[sk] >= need) { chip.classList.add('done'); return; }
    chip.addEventListener('pointerdown', function (e) {
      if (actState[sk] >= need) return;
      dragging = true;
      Sfx.whoosh();
      var r = chip.getBoundingClientRect();
      ox = e.clientX - r.left; oy = e.clientY - r.top;
      ghost = chip.cloneNode(true);
      ghost.classList.add('drag-ghost');
      ghost.classList.remove('ghost');
      document.body.appendChild(ghost);
      chip.classList.add('ghost');
      moveGhost(e);
      if (chip.setPointerCapture) chip.setPointerCapture(e.pointerId);
      e.preventDefault();
    });
    chip.addEventListener('pointermove', function (e) { if (dragging) moveGhost(e); });
    chip.addEventListener('pointerup', function (e) {
      if (!dragging) return;
      dragging = false;
      var hit = overPhoto(e);
      clearGhost();
      if (!hit) return;
      actState[sk] = need;
      S.hands++; save();
      Sfx.dropSound(mats[0]);
      var pr = photo.getBoundingClientRect();
      dropPhotos(photo, materialIdsOf(d, st), e.clientX - pr.left, e.clientY - pr.top);
      syncActButton('drop', need, need);
      chip.classList.add('done');
      pandaSay('cook', randLine(ACT_LINES.drop), 'happy');
      refreshStepGate(d, st, i);
    });
    chip.addEventListener('pointercancel', function () { dragging = false; clearGhost(); });
  }

  function baCardHTML(d, i) {
    var step = stepCropOf(d, i);
    if (!step) return '';
    return '<section class="culture-section"><div class="card ba-card">' +
      '<h3 class="h3">👀 这一步做完，最后会变成这样</h3>' +
      '<div class="ba-wrap" id="baWrap">' +
      '<img class="ba-bot" src="assets/img/dish-' + d.id + '.jpg" alt="' + esc(d.name) + ' 成品图" loading="lazy">' +
      '<img class="ba-top" src="' + step + '" alt="' + esc(d.name) + ' 第 ' + (i + 1) + ' 步实拍图" loading="lazy">' +
      '<span class="ba-handle" id="baHandle"></span>' +
      '<span class="ba-tag l">👀 这一步</span><span class="ba-tag r">🍽️ 最后的样子</span>' +
      '<input class="ba-range" id="baRange" type="range" min="0" max="100" value="50" aria-label="对比这一步和成品">' +
      '</div>' +
      '<p class="small muted" style="margin-top:8px">左右拖动中间的小圆点：左边是这一步的样子，右边是做好的成品。</p>' +
      '</div></section>';
  }
  function bindBaCard() {
    var wrap = $('#baWrap');
    if (!wrap) return;
    var range = $('#baRange'), top = wrap.querySelector('.ba-top'), handle = $('#baHandle');
    if (!range || !top || !handle) return;
    function paint(v) {
      top.style.clipPath = 'inset(0 ' + (100 - v) + '% 0 0)';
      handle.style.left = v + '%';
    }
    range.addEventListener('input', function () { paint(Number(range.value)); });
    /* 成品图没有就整块撤掉（不让它留个破图） */
    Array.prototype.forEach.call(wrap.querySelectorAll('img'), function (im) {
      im.addEventListener('error', function () { var s = wrap.closest('section'); if (s) s.remove(); });
    });
    paint(50);
  }

  function paintCookStep(i) {
    var d = dishById(S.dish);
    if (!d) return;
    cookStep = Math.max(0, Math.min(i, d.steps.length - 1));
    var st = d.steps[cookStep];
    var img = stepCropOf(d, cookStep);
    var photo = img
      ? '<div class="sbs-photo"><img class="step-photo" src="' + img + '" alt="' + esc(d.name) + ' 第' + (cookStep + 1) + ' 步实拍图" loading="lazy" title="点一下看大图">' +
        '<span class="step-photo-cap">第 ' + (cookStep + 1) + ' 步 · 实拍</span></div>'
      : '<div class="sbs-photo sbs-photo-empty"><span>' + d.emoji + '</span><div class="small muted">这一步的实拍图还在整理</div></div>';
    $('#stepView').innerHTML = '<div class="sbs-step">' +
      '<div class="sbs-text">' +
      '<span class="step-badge">' + (STEP_LABEL[st.type] || '步骤') + ' · 第 ' + (cookStep + 1) + ' / ' + d.steps.length + ' 步</span>' +
      '<div class="step-instruction">' + esc(st.zh) + ' ' + speakBtn(st.zh) + '</div>' +
      '<div class="step-actrow">' +
      (stepAnswerLine(st) ? '<div class="step-answer">' + esc(stepAnswerLine(st)) + '</div>' : '') +
      cookActionsHTML(d, st, cookStep) +
      '</div>' +
      pyLine(st.py) + enLine(st.en) +
      (st.tip ? '<div class="hint-box good" style="margin-top:10px"><span>🐼</span><div>' + esc(st.tip.zh) + enLine(st.tip.en) + '</div></div>' : '') +
      '</div>' + photo + '</div>' + (BA_SLIDER ? baCardHTML(d, cookStep) : '');
    $('#stepPos').textContent = (cookStep + 1) + ' / ' + d.steps.length;
    bindPhotoFallback($('#stepView'));
    bindBaCard();
    bindCookActions(d, st, cookStep);
    $('#stepPrev').disabled = cookStep === 0;
    $('#stepNext').disabled = cookStep === d.steps.length - 1;
    var zoomImg = $('#stepView .step-photo');
    function zoom() {
      if (zoomImg) openPhotoModal(zoomImg.getAttribute('src'), d.name + ' · 第 ' + (cookStep + 1) + ' 步 · 实拍图');
    }
    if (zoomImg) zoomImg.addEventListener('click', zoom);
    bindPhotoCut(d, st, cookStep, zoom);
    bindDragChip(d, st, cookStep);
    refreshStepGate(d, st, cookStep, true);
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
      if (st.add && st.add.length) addFood(st.add, st);
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
        addFood(st.add || [], st);
        Sfx.sizzle(); completeStep();
      });
    }
  }
  function completeStep() {
    var d = dishById(run.dishId), st = d.steps[run.step];
    addFood(st.add || [], st); cookProgress();
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
    var A = window.STEP_ASSETS || {};
    var id = (arguments.length > 2 && arguments[2]) ? (A._opt || {})[arguments[2]] : null;
    if (!id && run && A[run.dishId]) id = A[run.dishId][emoji];
    if (id === 'x') return '<span style="display:none"></span>';
    var src = '';
    if (id) {
      src = (CUT_BY_NAME && CUT_BY_NAME[id]) ? CUT_BY_NAME[id] : '';
      var chain = [];
      if (src) chain.push(src);
      ['c/' + id, 'i/' + id, 's/' + id].forEach(function (p) {
        var f = 'assets/img/cut/' + p + '.png';
        if (chain.indexOf(f) < 0) chain.push(f);
      });
      ['i/' + id + '.jpg', 's/' + id + '.jpg'].forEach(function (f) { chain.push('assets/img/' + f); });
      src = chain[0];
      var esc2 = JSON.stringify(chain.slice(1)).replace(/"/g, '&quot;');
      return '<span class="' + (cls || '') + '" style="display:block">' +
        '<img class="food-photo" src="' + src + '" data-chain="' + esc2 + '" alt="" loading="lazy" ' +
        'onerror="var c=JSON.parse(this.dataset.chain||\'[]\');if(c.length){this.src=c.shift();this.dataset.chain=JSON.stringify(c);}' +
        'else{this.style.display=\'none\';}"></span>';
    }
    if (!src) src = EMOJI_IMG[emoji] || '';
    /* 找不到真实素材就"不显示"，绝不退回 emoji 图标 */
    if (!src) return '<span style="display:none"></span>';
    return '<span class="' + (cls || '') + '" style="display:block">' +
      '<img class="food-photo" src="' + src + '" alt="" loading="lazy" ' +
      'onerror="this.parentNode.style.display=\'none\'">' +
      '</span>';
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
  function dropFx(emoji, i, optId) {
    var layer = $('#wokFood'); if (!layer) return;
    var el = document.createElement('span');
    el.className = 'drop-item';
    el.innerHTML = foodVisual(emoji, null, optId);
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

  function addFood(emojis, st) {
    var layer = $('#wokFood'); if (!layer) return;
    var hasStep = ((window.STEP_IMAGES || {})[run.dishId] || []).length > 0;
    var _oa = (st && (st.type === 'order' || st.type === 'season')) ? st.answer : null;
    emojis.forEach(function (e, i) { if (e !== '🥄' && e !== '💨') dropFx(e, i, _oa); });
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
  /* 词汇页 = 一个卡片菜单，先选板块，再展开那一页 */
  var VOCAB_SECTIONS = [
    { id: 'cards', icon: '📇', title: '词汇卡', sub: '按分类看词卡：图、词、拼音、英文；点开一张有释义、例句和用法。' },
    { id: 'patterns', icon: '💬', title: '句型', sub: '厨房里天天用的中文句型，学会就能一边做菜一边说。' },
    { id: 'kitchen', icon: '🍳', title: '厨房与味道', sub: '厨具和味道的常用词都在一张词表上；点开一个词有场景和例句，还能听发音。' }
  ];
  function renderVocab() {
    var sec = current.arg || '';
    if (!VOCAB_SECTIONS.some(function (s) { return s.id === sec; })) sec = '';
    if (!sec) return renderVocabMenu();
    return renderVocabSection(sec);
  }
  function vocabMenuCounts() {
    return {
      cards: (Object.keys(CC.vocab || {}).reduce(function (n, c) { return n + CC.vocab[c].length; }, 0)),
      patterns: (CC.patterns || []).length,
      kitchen: (CC.tools || []).length + (CC.tastes || []).length
    };
  }
  function renderVocabMenu() {
    var n = vocabMenuCounts();
    var meta = { cards: n.cards + ' 张卡 · ' + Object.keys(CC.vocab || {}).length + ' 个分类', patterns: n.patterns + ' 个句型 · 每个配例句', kitchen: n.kitchen + ' 个词 · 可以听发音' };
    app.innerHTML = '<div class="view"><div class="view-head"><span class="eyebrow">词汇 · 语言</span>' +
      '<h1 class="h1">词汇 · 语言</h1>' +
      '<p class="lead">先选一个板块，再进去看。中文是主角，拼音和外语标注跟着走。</p></div>' +
      '<div class="vocab-menu">' + VOCAB_SECTIONS.map(function (s) {
        return '<a class="vm-card" href="#/vocab/' + s.id + '">' +
          '<span class="vm-ico">' + s.icon + '</span>' +
          '<span class="vm-title">' + s.title + '</span>' +
          '<span class="vm-sub">' + s.sub + '</span>' +
          '<span class="vm-meta">' + meta[s.id] + '</span>' +
          '<span class="vm-go">进去看看 ›</span></a>';
      }).join('') + '</div></div>';
    pandaSay('vocab');
  }
  function renderVocabSection(sec) {
    var one = VOCAB_SECTIONS.filter(function (s) { return s.id === sec; })[0];
    var back = '<a class="vocab-back" href="#/vocab">‹ 返回板块</a>';
    if (sec === 'cards') return renderVocabCards(one, back);
    if (sec === 'patterns') {
      app.innerHTML = '<div class="view">' + back + '<div class="view-head"><span class="eyebrow">句型</span>' +
        '<h1 class="h1">' + one.icon + ' 做菜时能用的中文句型</h1>' +
        '<p class="lead">这些句型在厨房里天天用，学会了就能一边做菜一边说中文。</p></div>' +
        '<div class="belt-row"><div class="pattern-row">' + (CC.patterns || []).map(function (p) {
          return '<div class="card pattern-card"><div class="pattern-tpl">' + esc(p.pattern) + '</div>' +
            pyLine(p.py) + enLine(p.en) +
            p.ex.map(function (e) {
              return '<div class="example">' + esc(e.zh) + ' ' + speakBtn(e.zh) + pyLine(e.py) + enLine(e.en) + '</div>';
            }).join('') + '</div>';
        }).join('') + '</div></div></div>';
      autoRows();
      pandaSay('vocab');
      return;
    }
    /* 厨房与味道：两栏词表排成矩阵（不滚动），点一个词开弹窗看场景和例句 */
    app.innerHTML = '<div class="view">' + back + '<div class="view-head"><span class="eyebrow">厨房与味道</span>' +
      '<h1 class="h1">' + one.icon + ' 厨具和味道词</h1>' +
      '<p class="lead">厨具和味道都在下面一张词表上，一屏看完，不用左右拖。点一个词，我给你讲它怎么用，再配两个例句。</p></div><div class="grid grid-2">' +
      '<div class="card"><h3 class="h3">🍳 厨具</h3><div class="tag-row tag-matrix" style="margin-top:8px">' +
      (CC.tools || []).map(function (t, i) { return toolChipHTML(t, 'tools', i); }).join('') +
      '</div></div>' +
      '<div class="card"><h3 class="h3">😋 味道</h3><div class="tag-row tag-matrix" style="margin-top:8px">' +
      (CC.tastes || []).map(function (t, i) { return toolChipHTML(t, 'tastes', i); }).join('') +
      '</div><p class="small muted" style="margin-top:10px">试一试用"又……又……"造句：麻婆豆腐又麻又辣。</p></div>' +
      '</div></div>';
    $$('.tag-btn').forEach(function (b) {
      b.addEventListener('click', function () {
        Sfx.pop();
        openToolModal(b.dataset.tool, Number(b.dataset.i));
      });
    });
    pandaSay('vocab');
  }
  function toolChipHTML(t, kind, i) {
    /* 厨具照旧标拼音、味道照旧标英文，和改之前一致 */
    var sub = kind === 'tastes' ? (t.en || t.py || '') : (t.py || t.en || '');
    return '<button class="tag tag-btn" data-tool="' + kind + '" data-i="' + i + '" title="点开看场景和例句">' +
      photoImg(t.zh, 'chip-photo', t.emoji) + ' <span class="tag-zh">' + esc(t.zh) + '</span>' +
      (sub ? ' <span class="muted">' + esc(sub) + '</span>' : '') + '</button>';
  }
  function renderVocabCards(one, back) {
    var cats = Object.keys(CC.vocab || {});
    vocabCat = vocabCat || cats[0];
    var html = '<div class="view">' + back + '<div class="view-head"><span class="eyebrow">词汇卡</span>' +
      '<h1 class="h1">' + one.icon + ' 川菜中文词汇卡</h1>' +
      '<p class="lead">图片下面是词、拼音和英文；点一下卡片打开详解（这是什么、例句、什么时候用），可以左右翻页。也可以搜索：试着输入"麻"或"doufu"。</p></div>' +
      '<div class="search-row"><input class="search" id="vocabSearch" placeholder="搜索中文 / 拼音 / English…">' +
      '<button class="btn btn-sm" id="clearSearch">清空</button></div>' +
      '<div class="vocab-tabs" id="vocabTabs">' + cats.map(function (c) {
        return '<button class="filter-chip' + (vocabCat === c ? ' on' : '') + '" data-cat="' + esc(c) + '">' + esc(c) + '</button>';
      }).join('') + '</div>' +
      '<div class="belt-row"><div class="flash-grid belt-scroll" id="flashGrid"></div></div></div>';
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
    autoRows();
    pandaSay('vocab');
  }
  /* 横向卡片条：像传菜带那样自动慢慢滚动；鼠标悬停/拖动时暂停，滚轮也能横滚 */
  function autoRows() {
    var reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    $$('.belt-scroll, .pattern-row, .tag-row').forEach(function (row) {
      if (row.dataset.autoRow) return;
      row.dataset.autoRow = '1';
      var paused = !!reduced, resumeTimer = null;
      function pause() { paused = true; }
      function resume() { paused = false; }
      function pauseThenResume() {
        pause();
        clearTimeout(resumeTimer);
        resumeTimer = setTimeout(resume, 1500);
      }
      row.addEventListener('mouseenter', pause);
      row.addEventListener('mouseleave', resume);
      row.addEventListener('pointerdown', pause);
      row.addEventListener('pointerup', pauseThenResume);
      row.addEventListener('wheel', function (e) {
        if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
          row.scrollLeft += e.deltaY;
          e.preventDefault();
          pauseThenResume();
        }
      }, { passive: false });

      /* 条子下面那根可以拖的进度条（原生滚动条被藏掉了，这里补一根） */
      var bar = document.createElement('div');
      bar.className = 'belt-bar';
      bar.innerHTML = '<i class="belt-thumb"></i>';
      bar.hidden = true;
      row.parentNode.insertBefore(bar, row.nextSibling);
      var thumb = bar.querySelector('.belt-thumb');
      function track() { return Math.max(40, bar.clientWidth - 12); }
      function syncBar() {
        var max = row.scrollWidth - row.clientWidth;
        if (max <= 6) { bar.hidden = true; return; }
        bar.hidden = false;
        var t = track();
        var w = Math.max(40, Math.round(t * row.clientWidth / row.scrollWidth));
        var pos = Math.round(t * (row.scrollLeft / row.scrollWidth));
        thumb.style.width = w + 'px';
        thumb.style.left = (6 + Math.min(t - w, Math.max(0, pos))) + 'px';
      }
      row._syncBar = syncBar;
      row.addEventListener('scroll', syncBar);
      window.addEventListener('resize', syncBar);
      setTimeout(syncBar, 80);

      var dragging = false, dragX = 0, dragScroll = 0;
      thumb.addEventListener('pointerdown', function (e) {
        dragging = true; dragX = e.clientX; dragScroll = row.scrollLeft;
        pause();
        try { thumb.setPointerCapture(e.pointerId); } catch (err) { /* 忽略 */ }
        e.preventDefault(); e.stopPropagation();
      });
      thumb.addEventListener('pointermove', function (e) {
        if (!dragging) return;
        row.scrollLeft = dragScroll + (e.clientX - dragX) * (row.scrollWidth / track());
      });
      function endDrag(e) {
        if (!dragging) return;
        dragging = false;
        try { thumb.releasePointerCapture(e.pointerId); } catch (err) { /* 忽略 */ }
        pauseThenResume();
      }
      thumb.addEventListener('pointerup', endDrag);
      thumb.addEventListener('pointercancel', endDrag);
      bar.addEventListener('pointerdown', function (e) {            /* 点空白处：跳过去 */
        if (e.target === thumb) return;
        var r = bar.getBoundingClientRect();
        row.scrollLeft = ((e.clientX - r.left) / r.width) * row.scrollWidth - row.clientWidth / 2;
        pauseThenResume();
      });
      bar.addEventListener('mouseenter', pause);
      bar.addEventListener('mouseleave', function () { if (!dragging) resume(); });
      /* 用定时器而不是 rAF：后台标签页里 rAF 会被暂停，定时器仍会跑（慢一点也没关系） */
      var last = performance.now();
      var timer = setInterval(function () {
        if (!document.body.contains(row)) { clearInterval(timer); return; }   /* 离开页面自动停 */
        var now = performance.now();
        var dt = Math.min(0.6, (now - last) / 1000); last = now;
        var max = row.scrollWidth - row.clientWidth;
        if (!paused && max > 6) {
          row.scrollLeft += 26 * dt;                        /* 每秒约 26px：慢慢走 */
          if (row.scrollLeft >= max - 0.5) {                /* 到头 → 停一下 → 回绕 */
            if (!row._wrapAt) row._wrapAt = now + 900;
            else if (now >= row._wrapAt) { row.scrollLeft = 0; row._wrapAt = 0; }
          } else if (row.scrollLeft < max - 1) row._wrapAt = 0;
        }
      }, 90);
      row._timer = timer;
    });
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
    vocabShown = list;
    $('#flashGrid').innerHTML = list.map(function (w, i) {
      return '<div class="flash-card menu-card' + (w.zh.length >= 7 ? ' w-long-card' : '') + '" data-i="' + i + '" data-zh="' + esc(w.zh) + '" title="点开看详解">' +
        '<div class="menu-photo">' + vocabPhotoHTML(w) + '</div>' +
        '<div class="menu-txt"><div class="word' + (w.zh.length >= 7 ? ' w-long' : '') + '">' + esc(w.zh) + '</div>' +
        pyLine(w.py) + '<div class="en">' + esc(w.en) + '</div></div>' +
        '<button class="speak" data-speak="' + esc(w.zh) + '">🔊</button></div>';
    }).join('') || '<p class="muted">没有找到，换个词试试。</p>';
    var gridEl = $('#flashGrid');
    if (gridEl && gridEl._syncBar) setTimeout(gridEl._syncBar, 60);   /* 换分类/搜索后刷新进度条 */
    $$('#flashGrid .flash-card').forEach(function (c) {
      c.addEventListener('click', function (e) {
        var zh = c.dataset.zh;
        if (S.vocabSeen.indexOf(zh) < 0) { S.vocabSeen.push(zh); save(); }
        Sfx.pop();
        if (e.target.closest('.speak')) return;                   /* 小喇叭：只发音 */
        c.classList.add('pulse');
        setTimeout(function () { c.classList.remove('pulse'); }, 320);
        openVocabModal(Number(c.dataset.i));                      /* 点卡片 → 打开详解弹窗 */
      });
    });
  }
  /* 词汇卡配图：能抠出干净图的用透明图，其余用圆盘实拍图，实在没有就用 emoji */
  function vocabPhotoHTML(w, pre) {
    pre = pre || 'menu';
    var zh = w.zh;
    var ing = Object.keys(CC.ingredients || {}).filter(function (k) { return CC.ingredients[k].zh === zh; })[0];
    if (ing && cutPath('ing', ing)) return '<img class="' + pre + '-img" data-cut="1" src="' + cutPath('ing', ing) + '" alt="' + esc(zh) + '">';
    var s = (CC.seasonings || []).filter(function (x) { return x.zh === zh; })[0];
    if (s && cutPath('sea', s.id)) return '<img class="' + pre + '-img" data-cut="1" src="' + cutPath('sea', s.id) + '" alt="' + esc(zh) + '">';
    var ti = (CC.tools || []).findIndex(function (t) { return t.zh === zh; });
    if (ti >= 0 && cutPath('tool', String(ti + 1))) return '<img class="' + pre + '-img" data-cut="1" src="' + cutPath('tool', String(ti + 1)) + '" alt="' + esc(zh) + '">';
    var src = photoOf(zh);
    if (src) return '<img class="' + pre + '-img ' + pre + '-round" src="' + src + '" alt="' + esc(zh) + '" loading="lazy" ' +
      'onerror="this.replaceWith(Object.assign(document.createElement(\'span\'),{className:\'' + pre + '-emoji\',textContent:\'' + (w.emoji || '') + '\'}))">';
    return '<span class="' + pre + '-emoji">' + (w.emoji || '') + '</span>';
  }

  /* ============ 词汇卡详解弹窗（点卡片打开，可以翻页） ============ */
  var vocabShown = [];        /* 当前这一页展示的词（分类或搜索结果），翻页就沿用它 */
  var vocabIndex = 0;
  function vocabDetailOf(zh) { return (window.CC_VOCAB_DETAIL || {})[zh] || null; }
  /* 弹窗分两种：词汇卡详解（vocab）和厨具/味道详解（tool），共用同一套样式和翻页 */
  var modalKind = 'vocab';
  var toolKind = 'tools';
  var TOOL_KINDS = { tools: { name: '厨具', icon: '🍳' }, tastes: { name: '味道', icon: '😋' } };
  function toolDetailOf(zh) { return (window.CC_TOOLS_DETAIL || {})[zh] || null; }
  function seasonDetailOf(zh) { return (window.CC_SEASON_DETAIL || {})[zh] || null; }
  function modalSec(icon, title, body) {
    return '<div class="vm-sec"><h4>' + icon + ' ' + title + '</h4>' + body + '</div>';
  }
  /* 三大帮派：点开卡片后的弹窗（详细介绍 / 文化故事 / 代表菜 + 翻页） */
  /* 调料：点开卡片后的弹窗（它是干什么的 / 什么时候用 / 例句 + 翻页） */
  function seasonModalHTML(s) {
    var d = seasonDetailOf(s.zh);
    var total = vocabShown.length;
    var taste = (s.taste || []).length ? '<div style="margin-top:8px">' + s.taste.map(function (t) { return '<span class="taste-chip">' + esc(t) + '</span>'; }).join('') + '</div>' : '';
    var exHTML = (d && d.ex ? d.ex : []).map(function (e) {
      return '<div class="vm-ex"><div class="zh">' + esc(e.zh) + '</div>' + pyLine(e.py) +
        (e.en ? '<span class="en">' + esc(e.en) + '</span>' : '') + '</div>';
    }).join('');
    return '<div class="vocab-modal">' +
      '<div class="vm-top"><div class="vm-photo">' +
        '<img class="vm-img" src="assets/img/s/' + s.id + '.jpg" alt="' + esc(s.zh) + '" onerror="this.style.display=\'none\';this.nextElementSibling.style.display=\'block\'">' +
        '<span class="vm-emoji" style="display:none">' + s.emoji + '</span></div>' +
        '<div class="vm-meta"><h3 class="h3">' + esc(s.zh) + ' ' + speakBtn(s.zh) + '</h3>' +
          pyLine(s.py) + '<div class="en">' + esc(s.en) + '</div>' +
          '<div class="vm-cat">🧂 调料' + taste + '</div></div></div>' +
      (s.use ? modalSec('🔎', '它是干什么的', '<p class="small">' + esc(s.use.zh) + enLine(s.use.en) + '</p>') : '') +
      (d ? modalSec('🧭', '什么时候用', '<p class="small">' + esc(d.scene.zh) + enLine(d.scene.en) + '</p>') : '') +
      (exHTML ? modalSec('💬', '例句', exHTML) : '') +
      (d ? '' : '<div class="vm-sec"><p class="small muted">这个调料的详解还在整理中，先听发音吧。</p></div>') +
      '<div class="vm-pager">' +
        '<button class="btn btn-sm" id="vmPrev"' + (vocabIndex <= 0 ? ' disabled' : '') + '>‹ 上一个</button>' +
        '<span class="vm-count">第 ' + (vocabIndex + 1) + ' / ' + total + ' 个</span>' +
        '<button class="btn btn-sm" id="vmNext"' + (vocabIndex >= total - 1 ? ' disabled' : '') + '>下一个 ›</button>' +
      '</div></div>';
  }
  function schoolModalHTML(s) {
    var total = vocabShown.length;
    return '<div class="vocab-modal">' +
      '<div class="vm-top"><div class="vm-photo"><span class="vm-emoji">' + s.emoji + '</span></div>' +
        '<div class="vm-meta"><h3 class="h3">' + esc(s.name) + ' ' + speakBtn(s.name.split(' · ')[0]) + '</h3>' +
          pyLine(s.py) + '<div class="en">' + esc(s.en) + '</div>' +
          '<div class="vm-cat">🏯 川菜三大帮派</div></div></div>' +
      modalSec('🧭', '在哪儿 · 什么口味', '<p class="small">' + esc(s.area) + '<br>' + esc(s.taste) + '</p>') +
      modalSec('🔎', '详细介绍', '<p class="small">' + esc(s.note.zh) + enLine(s.note.en) + '</p>') +
      modalSec('📖', '文化故事', '<p class="small">' + esc(s.story.zh) + enLine(s.story.en) + '</p>') +
      modalSec('🍽️', '代表菜', '<p class="small">' + s.dishes.map(esc).join(' · ') + '</p>') +
      '<div class="vm-pager">' +
        '<button class="btn btn-sm" id="vmPrev"' + (vocabIndex <= 0 ? ' disabled' : '') + '>‹ 上一个</button>' +
        '<span class="vm-count">第 ' + (vocabIndex + 1) + ' / ' + total + ' 个</span>' +
        '<button class="btn btn-sm" id="vmNext"' + (vocabIndex >= total - 1 ? ' disabled' : '') + '>下一个 ›</button>' +
      '</div></div>';
  }
  function toolModalHTML(w) {
    var d = toolDetailOf(w.zh);
    var kind = TOOL_KINDS[toolKind] || { name: '', icon: '' };
    var total = vocabShown.length;
    var exHTML = (d && d.ex ? d.ex : []).map(function (e) {
      return '<div class="vm-ex"><div class="zh">' + esc(e.zh) + '</div>' + pyLine(e.py) +
        (e.en ? '<span class="en">' + esc(e.en) + '</span>' : '') + '</div>';
    }).join('');
    return '<div class="vocab-modal">' +
      '<div class="vm-top"><div class="vm-photo">' + vocabPhotoHTML(w, 'vm') + '</div>' +
        '<div class="vm-meta"><h3 class="h3">' + esc(w.zh) + ' ' + speakBtn(w.zh) + '</h3>' +
          pyLine(w.py) + '<div class="en">' + esc(w.en) + '</div>' +
          '<div class="vm-cat">' + kind.icon + ' ' + esc(kind.name) + '</div></div></div>' +
      (d ? modalSec('🔎', '这是什么', '<p class="small">' + esc(d.note.zh) + enLine(d.note.en) + '</p>') : '') +
      (exHTML ? modalSec('💬', '例句', exHTML) : '') +
      (d ? modalSec('🧭', '什么时候用', '<p class="small">' + esc(d.scene.zh) + enLine(d.scene.en) + '</p>') : '') +
      (d ? '' : '<div class="vm-sec"><p class="small muted">这个词的详解还在整理中，先听发音、看拼音吧。</p></div>') +
      '<div class="vm-pager">' +
        '<button class="btn btn-sm" id="vmPrev"' + (vocabIndex <= 0 ? ' disabled' : '') + '>‹ 上一个</button>' +
        '<span class="vm-count">第 ' + (vocabIndex + 1) + ' / ' + total + ' 个</span>' +
        '<button class="btn btn-sm" id="vmNext"' + (vocabIndex >= total - 1 ? ' disabled' : '') + '>下一个 ›</button>' +
      '</div></div>';
  }
  function vocabCatOf(w) {
    var cats = Object.keys(CC.vocab || {});
    for (var i = 0; i < cats.length; i++) {
      if (CC.vocab[cats[i]].indexOf(w) >= 0) return cats[i];
    }
    return '';
  }
  function vocabModalHTML(w) {
    var d = vocabDetailOf(w.zh);
    var total = vocabShown.length;
    function sec(icon, title, body) {
      return '<div class="vm-sec"><h4>' + icon + ' ' + title + '</h4>' + body + '</div>';
    }
    var exHTML = (d && d.ex ? d.ex : []).map(function (e) {
      return '<div class="vm-ex"><div class="zh">' + esc(e.zh) + '</div>' + pyLine(e.py) +
        (e.en ? '<span class="en">' + esc(e.en) + '</span>' : '') + '</div>';
    }).join('');
    return '<div class="vocab-modal">' +
      '<div class="vm-top"><div class="vm-photo">' + vocabPhotoHTML(w, 'vm') + '</div>' +
        '<div class="vm-meta"><h3 class="h3">' + esc(w.zh) + ' ' + speakBtn(w.zh) + '</h3>' +
          pyLine(w.py) + '<div class="en">' + esc(w.en) + '</div>' +
          '<div class="vm-cat">' + esc(vocabCatOf(w)) + '</div></div></div>' +
      (d ? sec('🔎', '这是什么', '<p class="small">' + esc(d.note.zh) + enLine(d.note.en) + '</p>') : '') +
      (exHTML ? sec('💬', '例句', exHTML) : '') +
      (d ? sec('🧭', '什么时候用', '<p class="small">' + esc(d.scene.zh) + enLine(d.scene.en) + '</p>') : '') +
      (d ? '' : '<div class="vm-sec"><p class="small muted">这个词的详解还在整理中，先听发音、看拼音吧。</p></div>') +
      '<div class="vm-pager">' +
        '<button class="btn btn-sm" id="vmPrev"' + (vocabIndex <= 0 ? ' disabled' : '') + '>‹ 上一张</button>' +
        '<span class="vm-count">第 ' + (vocabIndex + 1) + ' / ' + total + ' 张</span>' +
        '<button class="btn btn-sm" id="vmNext"' + (vocabIndex >= total - 1 ? ' disabled' : '') + '>下一张 ›</button>' +
      '</div></div>';
  }
  /* 文化点：翻页弹窗（点故事页标题旁边的按钮打开） */
  var storyPointsCtx = null;
  function pointModalHTML(p) {
    var total = vocabShown.length, i = vocabIndex;
    var d = storyPointsCtx ? storyPointsCtx.d : null;
    var fact = storyPointsCtx ? storyPointsCtx.fact : '';
    return '<div class="vocab-modal point-modal">' +
      '<div class="vm-top"><div class="vm-photo"><span class="vm-emoji">' + (p.icon || '🏮') + '</span></div>' +
      '<div class="vm-meta"><h3 class="h3">' + esc(p.title) + ' ' + speakBtn(p.title) + '</h3>' +
      '<div class="vm-cat">🏮 ' + esc(d ? d.name : '') + ' · 文化点 ' + (i + 1) + ' / ' + total + '</div></div></div>' +
      '<div class="vm-sec"><h4>🔎 说说这一点</h4><p class="small">' + esc(p.zh) + enLine(p.en) + '</p></div>' +
      (fact && i === total - 1 ? '<div class="vm-sec"><h4>📌 顺带一提</h4><p class="small">' + esc(fact) + '</p></div>' : '') +
      '<div class="vm-pager">' +
      '<button class="btn btn-sm" id="vmPrev"' + (i <= 0 ? ' disabled' : '') + '>‹ 上一个</button>' +
      '<span class="muted small">第 ' + (i + 1) + ' / ' + total + ' 个</span>' +
      '<button class="btn btn-sm" id="vmNext"' + (i >= total - 1 ? ' disabled' : '') + '>下一个 ›</button>' +
      '</div></div>';
  }
  function openStoryPoints(d) {
    var det = (window.CC_STORY_DETAIL || {})[d.id] || {};
    var list = (det.points || []).slice();
    if (!list.length) return;
    modalKind = 'point';
    storyPointsCtx = { d: d, fact: det.fact || '', lead: det.lead || '' };
    vocabShown = list;
    vocabIndex = 0;
    paintVocabModal(0);
    speak(list[0].title);
  }
  function speakCurrent() {
    var w = vocabShown[vocabIndex];
    if (!w) return;
    speak(modalKind === 'point' ? (w.title || '') : (w.zh || w.name || ''));
  }
  function paintVocabModal(dir) {
    if (!vocabShown.length) return;
    vocabIndex = Math.max(0, Math.min(vocabShown.length - 1, vocabIndex));
    var w = vocabShown[vocabIndex];
    openModal(modalKind === 'school' ? schoolModalHTML(w)
      : modalKind === 'point' ? pointModalHTML(w)
      : modalKind === 'tool' ? toolModalHTML(w)
      : modalKind === 'season' ? seasonModalHTML(w)
      : vocabModalHTML(w));
    if (dir) {
      var card = document.querySelector('#modalRoot .modal-card');
      if (card) card.classList.add(dir > 0 ? 'flip-right' : 'flip-left');
    }
    var prev = $('#vmPrev'), next = $('#vmNext');
    if (prev) prev.addEventListener('click', function () {
      if (vocabIndex <= 0) return;
      vocabIndex--; Sfx.pop(); paintVocabModal(-1); speakCurrent();
    });
    if (next) next.addEventListener('click', function () {
      if (vocabIndex >= vocabShown.length - 1) return;
      vocabIndex++; Sfx.pop(); paintVocabModal(1); speakCurrent();
    });
  }
  function openVocabModal(i) {
    if (!vocabShown.length) return;
    modalKind = 'vocab';
    vocabIndex = i;
    paintVocabModal(0);
    speak(vocabShown[vocabIndex].zh);
  }
  /* 厨具 / 味道：点词条打开详解弹窗，可在同一栏里前后翻 */
  function openToolModal(kind, i) {
    var list = kind === 'tastes' ? (CC.tastes || []) : (CC.tools || []);
    if (!list.length) return;
    modalKind = 'tool'; toolKind = kind === 'tastes' ? 'tastes' : 'tools';
    vocabShown = list.slice();
    vocabIndex = Math.max(0, Math.min(list.length - 1, i || 0));
    paintVocabModal(0);
    speak(vocabShown[vocabIndex].zh);
  }
  /* 三大帮派：点卡片打开详解弹窗，可前后翻 */
  function openSchoolModal(i) {
    var list = (window.CC_SCHOOLS_DETAIL || []).slice();
    if (!list.length) return;
    modalKind = 'school';
    vocabShown = list;
    vocabIndex = Math.max(0, Math.min(list.length - 1, i || 0));
    paintVocabModal(0);
    speak(list[vocabIndex].name);
  }
  /* 调料：点卡片打开详解弹窗，同一道菜的调料之间可以前后翻 */
  function openSeasonModal(list, i) {
    if (!list || !list.length) return;
    modalKind = 'season';
    vocabShown = list;
    vocabIndex = Math.max(0, Math.min(list.length - 1, i || 0));
    paintVocabModal(0);
    speak(list[vocabIndex].zh);
  }
  document.addEventListener('keydown', function (e) {
    if (!document.querySelector('.vocab-modal')) return;          /* 只有详解弹窗开着才响应左右键 */
    if (e.key === 'ArrowLeft' && vocabIndex > 0) { vocabIndex--; paintVocabModal(-1); speakCurrent(); }
    if (e.key === 'ArrowRight' && vocabIndex < vocabShown.length - 1) { vocabIndex++; paintVocabModal(1); speakCurrent(); }
  });

  /* ============ 小测 ============ */
  var quiz = null;
  function buildQuiz(level) {
    var deck = [];
    var pool = (level && level.questions) ? level.questions : (CC.cultureQuiz || []);
    var G = window.CC_QUIZ_GRAMMAR || { fill: [], build: [] };
    var take = level ? 5 : 8;                 /* 有等级的：5 道学科题 + 1 语法填空 + 1 句子排序 + 1 附加题 = 8 */
    shuffle(pool.slice()).slice(0, take).forEach(function (q) {
      /* 选项每次打乱：不然正确答案永远在第一个（自检时发现的：全点 A 也能满分） */
      deck.push({ type: 'text', q: q.q, options: shuffle(q.options.slice()), explain: q.explain });
    });
    if (level) {
      var f = shuffle((G.fill || []).slice())[0];
      if (f) deck.push({ type: 'text', tag: '语法', q: f.q, options: shuffle(f.options.slice()), explain: f.explain });
      var b = shuffle((G.build || []).slice())[0];
      if (b) deck.push({ type: 'build', tag: '句子', tokens: b.tokens.slice(), answer: b.answer, hint: b.hint, explain: b.explain });
    }
    var allWords = [];
    Object.keys(CC.vocab).forEach(function (c) { CC.vocab[c].forEach(function (w) { allWords.push(w); }); });
    /* 附加题：等级模式只加 1 道（听音 / 厨房顺序），没等级的老模式保持 3 道听音 + 1 道顺序 */
    var wordCount = level ? (level.id === 'hard' ? 0 : 1) : 3;   /* 高级那道附加题换成厨房顺序题 */
    shuffle(allWords).slice(0, wordCount).forEach(function (w) {
      var others = shuffle(allWords.filter(function (x) { return x.zh !== w.zh; })).slice(0, 2);
      deck.push({
        type: 'audio', tag: '听音', word: w,
        options: shuffle([w].concat(others)).map(function (o) { return { zh: o.zh, py: o.py, en: o.en, correct: o.zh === w.zh }; }),
        explain: { zh: w.zh + '（' + w.py + '）意思是 ' + w.en + '。', en: w.en }
      });
    });
    if (!level || level.id === 'hard') {
      var d = (CC.dishes || [])[Math.floor(Math.random() * (CC.dishes || []).length)];
      var steps = d.steps.filter(function (s) { return s.type !== 'finish'; }).slice(0, 3);
      if (steps.length >= 3) {
        deck.push({ type: 'order', tag: '顺序', dish: d, steps: steps, shuffled: shuffle(steps.map(function (s, i) { return { s: s, i: i }; })) });
      }
    }
    return shuffle(deck);
  }
  function renderQuiz() {
    var levels = window.CC_QUIZ_LEVELS || [];
    var want = current.arg || '';
    var lv = levels.filter(function (x) { return x.id === want; })[0];
    if (!lv) return renderQuizMenu(levels);
    quiz = { level: lv, deck: buildQuiz(lv), i: 0, score: 0, wrong: [], picked: [] };
    app.innerHTML = '<div class="view"><div class="quiz-shell" id="quizShell"></div></div>';
    renderQuizStep();
    pandaSay('quiz');
  }
  /* 小测入口：三张等级卡 */
  function renderQuizMenu(levels) {
    var best = S.quizBest || {};
    if (!levels.length) {                       /* 兜底：没有等级数据就跑老的那套 */
      quiz = { deck: buildQuiz(), i: 0, score: 0, wrong: [], picked: [] };
      app.innerHTML = '<div class="view"><div class="quiz-shell" id="quizShell"></div></div>';
      renderQuizStep();
      return;
    }
    app.innerHTML = '<div class="view"><div class="view-head"><span class="eyebrow">小测 · 闯关</span>' +
      '<h1 class="h1">🏆 选一个等级，开始闯关</h1>' +
      '<p class="lead">三个等级各 8 题，答对 6 题算通过。初级考"认识川菜"，中级考站里学过的内容，高级考来历和细节。</p></div>' +
      '<div class="vocab-menu">' + levels.map(function (l) {
        var b = best[l.id];
        return '<a class="vm-card" href="#/quiz/' + l.id + '">' +
          '<span class="vm-ico">' + l.icon + '</span>' +
          '<span class="vm-title">' + esc(l.name) + '</span>' +
          '<span class="vm-sub">' + esc(l.sub) + '</span>' +
      '<span class="vm-meta">' + l.questions.length + ' 题 · 答对 ' + l.pass + ' 题算过' +
          (b ? ' · 最好 ' + b.score + '/' + b.total + ' ' + '★'.repeat(b.stars || 0) : ' · 还没考过') + '</span>' +
          '<span class="vm-go">开始闯关 ›</span></a>';
      }).join('') + '</div>' +
      '<div class="story-cta">' +
      '<a class="btn" href="#/vocab">📚 先去学词汇</a>' +
      '<a class="btn" href="#/culture">🏮 看川菜文化</a></div></div>';
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
    } else if (q.type === 'build') {
      body = '<div class="card"><div class="quiz-question">句子练习：把下面的词排成一个通顺的句子</div>' +
        (q.hint ? '<p class="small muted">句型提示：' + esc(q.hint.zh) + enLine(q.hint.en) + '</p>' : '') +
        '<div class="build-row" id="buildRow">' + q.tokens.map(function (t, i) {
          return '<button class="build-token" data-t="' + i + '">' + esc(t) + '</button>';
        }).join('') + '</div>' +
        '<div class="build-line" id="buildLine"><span class="muted">点上面的词，按顺序组句…</span></div>' +
        '<div style="display:flex;gap:10px;margin-top:10px;flex-wrap:wrap">' +
        '<button class="btn btn-sm" id="buildUndo">‹ 撤回</button>' +
        '<button class="btn btn-sm" id="buildReset">↻ 重排</button></div></div>';
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
    } else if (q.type === 'build') {
      var used = [];
      function paintBuild() {
        var line = used.map(function (i) { return q.tokens[i]; }).join('');
        $('#buildLine').innerHTML = line ? esc(line) : '<span class="muted">点上面的词，按顺序组句…</span>';
        $$('#buildRow .build-token').forEach(function (b, i) {
          var on = used.indexOf(i) >= 0;
          b.disabled = on;
          b.classList.toggle('used', on);
        });
      }
      $$('#buildRow .build-token').forEach(function (b, i) {
        b.addEventListener('click', function () {
          if (used.indexOf(i) >= 0) return;
          used.push(i); Sfx.pop(); paintBuild();
          if (used.length === q.tokens.length) {
            var made = used.map(function (k) { return q.tokens[k]; }).join('');
            var ok = made === q.answer;
            judgeQuiz(ok, q, ok ? null : '正确句子：' + q.answer);
          }
        });
      });
      $('#buildUndo').addEventListener('click', function () {
        if (!used.length) return;
        used.pop(); paintBuild();
      });
      $('#buildReset').addEventListener('click', function () {
        used = []; paintBuild();
      });
      paintBuild();
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
    var lv = quiz.level || null;
    var passLine = lv ? lv.pass : 6;
    var passed = sc >= passLine;
    var pct = Math.round(sc / total * 100);
    /* 评星：满分 3 星，过线 2 星，答对一半 1 星 */
    var stars = sc >= total ? 3 : passed ? 2 : (sc >= Math.ceil(total / 2) ? 1 : 0);
    var level = sc >= total - 1 ? '川菜文化小博士 📚' : passed ? '川菜学徒 👨‍🍳' : '川菜新手 🐣';
    /* 记录这个等级的最好成绩 */
    if (lv) {
      S.quizBest = S.quizBest || {};
      if (!S.quizBest[lv.id] || S.quizBest[lv.id].score < sc) S.quizBest[lv.id] = { score: sc, total: total, stars: stars };
      save();
    }
    if (lv && lv.id === 'hard' && passed) awardBadge('culture', true);
    else if (!lv && sc >= 8) awardBadge('culture', true);
    confetti(sc >= 6 ? 120 : 50);
    if (passed) Sfx.fanfare();
    $('#quizShell').innerHTML = '<div class="card quiz-result">' +
      (lv ? '<div class="small muted">' + lv.icon + ' ' + esc(lv.name) + '</div>' : '') +
      '<div class="big-score">' + sc + '<span style="font-size:22px;color:var(--muted)"> / ' + total + '</span></div>' +
      '<div style="text-align:center;margin:6px 0 2px"><span class="stars">' +
      [1, 2, 3].map(function (i) {
        return '<span class="star' + (i <= stars ? ' on' : '') + '" style="animation-delay:' + (i * 0.15) + 's">★</span>';
      }).join('') + '</span></div>' +
      '<p class="small" style="text-align:center;margin:2px 0 6px">答对 <b>' + sc + '</b> / ' + total + ' 题 · 正确率 <b>' + pct + '%</b>' +
      ' · ' + (stars === 3 ? '满分三星' : stars === 2 ? '过了，想拿三星还差一点' : stars === 1 ? '刚过半，再练一次吧' : '分有点低，先去看看词汇') + '</p>' +
      '<h2 class="h2">' + level + '</h2>' +
      '<p class="small">' + (sc >= total - 1 ? '你对川菜的理解已经很深了，可以去给别人讲讲"麻辣"是怎么来的。'
        : passed ? '不错！再复习一下词汇和文化部分，就能拿满分。'
        : '没关系，先去"词汇"和"首页·文化"逛一圈，再来挑战一次。') + '</p>' +
      (quiz.wrong.length ? '<div style="text-align:left;margin-top:12px"><h3 class="h3">这些题可以再看一眼</h3>' +
        quiz.wrong.map(function (w) {
          return '<div class="fact"><div>' + esc(w.type === 'text' ? w.q.zh : w.type === 'audio' ? ('听音题：' + w.word.zh) : ('顺序题：' + w.dish.name)) +
            (w.explain ? '<span class="en">' + esc(w.explain.zh) + '</span>' : '') + '</div></div>';
        }).join('') + '</div>' : '') +
      '<div style="display:flex;gap:10px;justify-content:center;flex-wrap:wrap;margin-top:16px">' +
      '<button class="btn btn-primary" id="quizAgain">↻ 再来一次</button>' +
      '<a class="btn" href="#/quiz">🏆 换一个等级</a>' +
      '<button class="btn" data-route="vocab">📚 去学词汇</button>' +
      '<button class="btn btn-gold" data-route="progress">🐼 我的厨房</button></div></div>';
    $('#quizAgain').addEventListener('click', renderQuiz);
    pandaSay('quiz', sc >= 8 ? '太厉害了，你是 <b>川菜文化小博士</b>！' : '继续加油，多来几次就熟了！', sc >= 8 ? 'happy' : '');
  }

  /* ============ 我的厨房 ============ */
  /* 我的厨房 = 一个四张卡的导航菜单，先选板块，再展开那一页 */
  var PROGRESS_SECTIONS = [
    { id: 'record', icon: '📊', title: '学习记录', sub: '完成菜品、星星、翻炒次数和徽章数，都在这里。' },
    { id: 'menu', icon: '🍽️', title: '菜单进度', sub: '八道菜各做到哪一步，想继续就直接点进去。' },
    { id: 'badges', icon: '🏅', title: '徽章墙', sub: '你收集到的川菜徽章，做菜和拿分都会解锁新徽章。' },
    { id: 'cert', icon: '🎓', title: '结业证书', sub: '写上名字，生成并打印一张属于你的证书。' }
  ];
  function progressStats() {
    var cookedCount = Object.keys(S.cooked).length;
    var totalStars = 0;
    Object.keys(S.cooked).forEach(function (k) { totalStars += S.cooked[k].stars; });
    return {
      cooked: cookedCount, stars: totalStars, stirs: S.stirs, hands: S.hands || 0,
      badges: S.badges.length, dishTotal: (CC.dishes || []).length, badgeTotal: (CC.badges || []).length
    };
  }
  function renderProgress() {
    var sec = current.arg || '';
    if (PROGRESS_SECTIONS.some(function (s) { return s.id === sec; })) return renderProgressSection(sec);
    var n = progressStats();
    var meta = {
      record: n.cooked + '/' + n.dishTotal + ' 道 · ' + n.stars + ' 星 · ' + n.badges + '/' + n.badgeTotal + ' 徽章',
      menu: n.dishTotal + ' 道菜 · 已完成 ' + n.cooked + ' 道',
      badges: n.badges + ' / ' + n.badgeTotal + ' 枚已获得',
      cert: S.name ? '名字：' + S.name : '写上名字就能生成'
    };
    app.innerHTML = '<div class="view"><div class="view-head"><span class="eyebrow">我的厨房</span>' +
      '<h1 class="h1">你的川菜学习记录</h1>' +
      '<p class="lead">记录保存在你自己的浏览器里，换电脑或清缓存会消失。先选一个板块，再进去看；做完可以打印一张证书。</p></div>' +
      '<div class="vocab-menu vm-4">' + PROGRESS_SECTIONS.map(function (s) {
        return '<a class="vm-card" href="#/progress/' + s.id + '">' +
          '<span class="vm-ico">' + s.icon + '</span>' +
          '<span class="vm-title">' + s.title + '</span>' +
          '<span class="vm-sub">' + s.sub + '</span>' +
          '<span class="vm-meta">' + esc(meta[s.id]) + '</span>' +
          '<span class="vm-go">进去看看 ›</span></a>';
      }).join('') + '</div></div>';
    pandaSay('progress');
  }
  function renderProgressSection(sec) {
    var back = '<a class="vocab-back" href="#/progress">‹ 返回我的厨房</a>';
    var n = progressStats();

    /* 学习记录 */
    if (sec === 'record') {
      app.innerHTML = '<div class="view">' + back + '<div class="view-head"><span class="eyebrow">学习记录</span>' +
      '<h1 class="h1">📊 你的川菜学习记录</h1>' +
      '<p class="lead">下面这些记录保存在你自己的浏览器里，换电脑或清缓存会消失。</p></div>' +
      '<div class="dash-grid">' +
      '<div class="card dash-stat"><span class="icon">🍽️</span><div><b>' + n.cooked + '</b><span class="muted small">完成菜品（共 ' + n.dishTotal + ' 道）</span></div></div>' +
      '<div class="card dash-stat"><span class="icon">★</span><div><b>' + n.stars + '</b><span class="muted small">累计星星</span></div></div>' +
      '<div class="card dash-stat"><span class="icon">💨</span><div><b>' + n.stirs + '</b><span class="muted small">累计翻炒次数</span></div></div>' +
      '<div class="card dash-stat"><span class="icon">✋</span><div><b>' + n.hands + '</b><span class="muted small">动手次数（切、炒、尝…）</span></div></div>' +
      '<div class="card dash-stat"><span class="icon">🎖️</span><div><b>' + n.badges + ' / ' + n.badgeTotal + '</b><span class="muted small">获得徽章</span></div></div>' +
      '</div>' +
      '<section class="culture-section"><div class="card"><h3 class="h3">⚠️ 课堂安全提示</h3>' +
      '<p class="small">这是模拟做菜，不动真火真刀。真正下厨时请注意：四季豆必须彻底加热（未熟透的四季豆含皂甙和红细胞凝集素，可能引起不适）；油温很高时不要进水；切菜时手指内扣、刀口向外。</p>' +
      '<p class="small muted">（来源：公开科普资料整理）</p>' +
      '<button class="btn btn-sm" id="resetAll">清除我的学习记录</button></div></section></div>';
      $('#resetAll').addEventListener('click', function () {
        openModal('<h3 class="h3">清除学习记录？</h3><p class="small">会删掉备菜进度、做过的菜和徽章，这个操作不能撤销。</p>' +
          '<div style="display:flex;gap:10px"><button class="btn" data-close="1">先不清</button>' +
          '<button class="btn btn-primary" id="confirmReset">确定清除</button></div>');
        $('#confirmReset').addEventListener('click', function () {
          try { localStorage.removeItem(LS_KEY); } catch (e) {}
          location.reload();
        });
      });
      pandaSay('progress');
      return;
    }

    /* 菜单进度 */
    if (sec === 'menu') {
      app.innerHTML = '<div class="view">' + back + '<div class="view-head"><span class="eyebrow">菜单进度</span>' +
      '<h2 class="h1">🍽️ 八道菜的完成情况</h2>' +
      '<p class="lead">点右边按钮就能接着做；做过的菜可以再做一次，拿更高分。</p></div>' +
      '<section class="culture-section dish-rows">' +
      (CC.dishes || []).map(function (d) {
        var c = S.cooked[d.id], prep = (S.prepped[d.id] || []).length;
        return '<div class="dish-progress-row"><span class="emoji">' + d.emoji + '</span>' +
          '<div class="grow"><b>' + esc(d.name) + '</b><span class="py">' + esc(d.py) + '</span>' +
          '<div class="small muted">备菜 ' + prep + '/' + d.prep.length + (c ? ' · 已做，得分 ' + c.score + '，' + '★'.repeat(c.stars) : ' · 还没做') + '</div></div>' +
          '<button class="btn btn-sm" data-go="prep" data-id="' + d.id + '">' + (c ? '再做一次' : '开始做') + '</button></div>';
      }).join('') + '</section></div>';
      pandaSay('progress');
      return;
    }

    /* 徽章墙 */
    if (sec === 'badges') {
      app.innerHTML = '<div class="view">' + back + '<div class="view-head"><span class="eyebrow">徽章墙</span>' +
      '<h2 class="h1">🏅 你收集到的川菜徽章</h2>' +
      '<p class="lead">做菜、拿分、学词汇都会解锁徽章，灰色的是还没拿到的。</p></div>' +
      '<section class="culture-section" style="overflow:auto">' +
      '<div class="badge-wall">' + (CC.badges || []).map(function (b) {
        var got = S.badges.indexOf(b.id) >= 0;
        return '<div class="badge' + (got ? ' earned' : '') + '"><div class="icon">' + b.emoji + '</div><b>' + esc(b.zh) + '</b>' +
          '<div class="small muted">' + esc(got ? b.desc.zh : '还没获得：' + b.desc.zh) + '</div></div>';
      }).join('') + '</div></section></div>';
      pandaSay('progress');
      return;
    }

    /* 结业证书 */
    app.innerHTML = '<div class="view">' + back + '<div class="view-head"><span class="eyebrow">结业证书</span>' +
      '<h2 class="h1">🎓 打印一张属于你的证书</h2>' +
      '<p class="lead">写上名字，点「生成证书」，再点打印或另存成 PDF。</p></div>' +
      '<section class="culture-section">' +
      '<div class="card"><div class="search-row"><input class="cert-input" id="certName" placeholder="写下你的名字 / Your name" value="' + esc(S.name) + '">' +
      '<button class="btn btn-primary" id="makeCert">生成证书</button>' +
      '<button class="btn" id="printCert">🖨️ 打印</button></div>' +
      '<p class="small muted">至少完成 1 道菜就可以生成证书；完成 4 道以上会多一枚"川味大厨"徽章。</p></div>' +
      '<div id="certBox" style="margin-top:14px"></div></section></div>';
    $('#makeCert').addEventListener('click', function () {
      var name = ($('#certName').value || '').trim();
      if (!n.cooked) { toast('先完成一道菜，就能生成证书啦'); Sfx.error(); return; }
      S.name = name; save(); paintCert(n.cooked, n.stars);
    });
    $('#printCert').addEventListener('click', function () { window.print(); });
    if (S.name) paintCert(n.cooked, n.stars);
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
    var sc = e.target.closest('[data-school]');            /* 三大帮派卡片 → 详解弹窗（克隆到子页也能用） */
    if (sc) { Sfx.pop(); openSchoolModal(Number(sc.dataset.school)); return; }
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
  /* 熊猫头像已删除（用户要求），这段绑定保留判空，将来恢复也还能用 */
  var pandaAvatarEl = $('#pandaAvatar');
  if (pandaAvatarEl) pandaAvatarEl.addEventListener('click', function () {
    if (pandaChatOpen()) { closePandaChat(); Sfx.pop(); return; }
    setPandaHidden(false);
    openPandaChat();
    Sfx.pop();
  });

  /* ============ 熊猫客服：本地知识库问答（不联网，记录存 localStorage）============ */
  var PANDA_CHAT_KEY = 'sichuan-kitchen-panda-chat-v1';
  var pandaMsgs = [];
  var PANDA_WELCOME = '你好！我是胖达。做菜、调料、词汇、文化，或者网站怎么用，都可以问我——比如"麻婆豆腐要什么材料"、"郫县豆瓣是什么"、"我做了几道菜"。';
  var PANDA_CHIPS = ['怎么开始做菜？', '麻婆豆腐要什么材料？', '郫县豆瓣是什么？', '什么叫干煸？', '我做了几道菜？', '小测在哪？'];
  function pandaChatOpen() { var el = $('#pandaChat'); return !!(el && !el.hidden); }
  function pandaLoadChat() {
    try { pandaMsgs = JSON.parse(localStorage.getItem(PANDA_CHAT_KEY) || '[]') || []; } catch (e) { pandaMsgs = []; }
    if (!pandaMsgs.length) pandaMsgs = [{ who: 'panda', zh: PANDA_WELCOME }];
  }
  function pandaSaveChat() { try { localStorage.setItem(PANDA_CHAT_KEY, JSON.stringify(pandaMsgs.slice(-40))); } catch (e) {} }
  function pandaPush(m) { pandaMsgs.push(m); pandaSaveChat(); if (pandaChatOpen()) renderPandaLog(); }
  function pandaEsc(s) { return esc(s); }
  function renderPandaLog() {
    var log = $('#pandaLog');
    if (!log) return;
    log.innerHTML = pandaMsgs.map(function (m) {
      var acts = (m.acts || []).map(function (a) {
        return '<a class="pc-act" href="' + a.href + '">' + esc(a.t) + '</a>';
      }).join('');
      /* 注意：这里不能用 class "panda" —— 站里 .panda 是熊猫容器的类（position:fixed 到左下角），
         之前就是因为它，熊猫的回复全被拉到框外面去了。 */
      return '<div class="pc-msg ' + (m.who === 'user' ? 'me' : 'bot') + '">' +
        '<div class="pc-bub">' + pandaEsc(m.zh) + (m.en ? '<span class="en">' + pandaEsc(m.en) + '</span>' : '') + '</div>' +
        (acts ? '<div class="pc-acts">' + acts + '</div>' : '') + '</div>';
    }).join('');
    log.scrollTop = log.scrollHeight;
  }
  function renderPandaChips() {
    var box = $('#pandaChips');
    if (!box) return;
    box.innerHTML = PANDA_CHIPS.map(function (q) { return '<button class="pc-chip" type="button">' + esc(q) + '</button>'; }).join('');
    $$('#pandaChips .pc-chip').forEach(function (b) {
      b.addEventListener('click', function () { pandaAsk(b.textContent); });
    });
  }
  function openPandaChat() {
    var el = $('#pandaChat');
    if (!el) return;
    el.hidden = false;
    $('#panda').classList.add('chat-open');
    renderPandaLog();
    renderPandaChips();
    setTimeout(function () { if (pandaReflow) pandaReflow(); }, 30);   /* 变大以后收进屏幕 */
    setTimeout(function () { var i = $('#pandaInput'); if (i) i.focus(); }, 120);
  }
  function closePandaChat() {
    var el = $('#pandaChat');
    if (el) el.hidden = true;
    var p = $('#panda'); if (p) p.classList.remove('chat-open');
  }
  /* —— 匹配：先看动态条目（菜名/调料/食材/生词），再看关键词 —— */
  function pandaCtx() {
    var text = '';
    return {
      CC: CC, S: S,
      dishByName: function (t) {
        return (CC.dishes || []).filter(function (d) { return t.indexOf(d.name) >= 0; })[0] || null;
      },
      ingName: function (id) { return (CC.ingredients[id] || {}).zh || id; },
      seasonByName: function (t) {
        /* 允许简称："郫县豆瓣" 也能匹配 "郫县豆瓣酱" */
        return (CC.seasonings || []).filter(function (s) {
          if (t.indexOf(s.zh) >= 0) return true;
          var head = s.zh.slice(0, 3);
          return head.length >= 3 && t.indexOf(head) >= 0;
        })[0] || null;
      },
      ingByName: function (t) {
        var ids = Object.keys(CC.ingredients || {}).filter(function (k) {
          var zh = CC.ingredients[k].zh;
          return t.indexOf(zh) >= 0 || (zh.length >= 3 && t.indexOf(zh.slice(0, 3)) >= 0);
        });
        return ids.length ? CC.ingredients[ids[0]] : null;
      },
      vocabWord: function (t) {
        var words = [];
        Object.keys(CC.vocab || {}).forEach(function (c) { (CC.vocab[c] || []).forEach(function (w) { words.push(w); }); });
        (CC.tools || []).forEach(function (w) { words.push(w); });
        (CC.tastes || []).forEach(function (w) { words.push(w); });
        return words.filter(function (w) { return t.indexOf(w.zh) >= 0 && w.zh.length >= 2; }).sort(function (a, b) { return b.zh.length - a.zh.length; })[0] || null;
      }
    };
  }
  function pandaAnswer(text) {
    var ctx = pandaCtx(), best = null;
    (window.CC_PANDA_KB || []).forEach(function (e) {
      var score = 0, payload = null;
      if (e.probe) {
        try { var r = e.probe(text, ctx); if (r) { score = r.score || 2; payload = r.payload; } } catch (err) {}
      } else {
        (e.keys || []).forEach(function (k) { if (text.indexOf(k) >= 0) score += (k.length >= 2 ? 3 : 1); });
      }
      if (score > 0 && (!best || score > best.score)) best = { e: e, score: score, payload: payload };
    });
    if (!best) {
      return { zh: '这个问题我还没学会 😅 你可以去"词汇"里搜一下关键词，或者问问老师。也可以这样问我：某道菜要什么材料、某个调料是什么、某个词怎么读。',
        en: 'I have not learned that yet — try asking about a dish, a seasoning or a word.',
        acts: [{ t: '去词汇页', href: '#/vocab' }, { t: '去选菜', href: '#/dishes' }] };
    }
    var e = best.e;
    var a = (typeof e.a === 'function') ? e.a(ctx, best.payload) : e.a;
    var acts = (typeof e.acts === 'function') ? e.acts(ctx, best.payload) : (e.acts || []);
    return { zh: a.zh, en: a.en, acts: acts };
  }
  function pandaAsk(text) {
    text = (text || '').trim();
    if (!text) return;
    pandaPush({ who: 'user', zh: text });
    S.chat++; save();
    if (S.chat >= 20) awardBadge('panda');
    Sfx.pop();
    setTimeout(function () {
      var a = pandaAnswer(text);
      pandaPush({ who: 'panda', zh: a.zh, en: a.en, acts: a.acts });
      Sfx.ding();
    }, 260);
  }
  /* 熊猫气泡可以收起（点熊猫头），收起状态记在浏览器里 */
  var PANDA_HIDE_KEY = 'sichuan-kitchen-panda-hidden-v1';
  function pandaIsHidden() { try { return localStorage.getItem(PANDA_HIDE_KEY) === '1'; } catch (e) { return false; } }
  function setPandaHidden(h) {
    var box = $('#panda');
    if (!box) return;
    box.classList.toggle('hide-bubble', !!h);
    try { h ? localStorage.setItem(PANDA_HIDE_KEY, '1') : localStorage.removeItem(PANDA_HIDE_KEY); } catch (e) {}
  }
  setPandaHidden(pandaIsHidden());
  pandaLoadChat();
  (function initPandaChat() {
    var close = $('#pandaChatClose');
    if (close) close.addEventListener('click', function () { closePandaChat(); Sfx.pop(); });
    var clear = $('#pandaClear');
    if (clear) clear.addEventListener('click', function () {
      pandaMsgs = [{ who: 'panda', zh: PANDA_WELCOME }];
      pandaSaveChat();
      renderPandaLog();
      Sfx.pop();
      toast('对话记录已清空');
    });
    var form = $('#pandaForm');
    if (form) form.addEventListener('submit', function (e) {
      e.preventDefault();
      var i = $('#pandaInput');
      if (!i) return;
      var v = i.value; i.value = '';
      pandaAsk(v);
    });
    var log = $('#pandaLog');
    if (log) log.addEventListener('click', function (e) {
      var t = e.target;
      if (t && t.classList && t.classList.contains('pc-act')) closePandaChat();
    });
  })();

  /* ============ 熊猫可以拖着走：位置记在浏览器里，双击回左下角 ============ */
  var PANDA_KEY = 'sichuan-kitchen-panda-pos-v1';
  var pandaReflow = null;          /* 由 initPandaDrag 赋值：按当前尺寸重新夹一次位置 */
  function pandaSavedPos() {
    try {
      var s = JSON.parse(localStorage.getItem(PANDA_KEY) || 'null');
      return (s && typeof s.x === 'number' && typeof s.y === 'number') ? s : null;
    } catch (e) { return null; }
  }
  function initPandaDrag() {
    var box = $('#panda');
    if (!box) return;
    /* 面板展开后整体变高，位置要按新尺寸再夹一次，否则会顶出屏幕底部 */
    pandaReflow = function () {
      var b = box.getBoundingClientRect();
      var p = put(b.left, b.top);
      remember(p);
    };
    var EDGE = 8;                 /* 离屏幕边至少留一点，别拖出画外 */
    var suppressClickUntil = 0;   /* 拖完这一下别当成"点熊猫说话" */
    function clampXY(x, y) {
      var w = box.offsetWidth, h = box.offsetHeight;
      var TOP_GUARD = 118;         /* 顶上这条留给导航和"返回"按钮，熊猫别停这儿（用户反馈它挡住了返回条） */
      var yMax = Math.max(TOP_GUARD, window.innerHeight - h - EDGE);
      return {
        x: Math.max(EDGE, Math.min(window.innerWidth - w - EDGE, x)),
        y: Math.max(TOP_GUARD, Math.min(yMax, y))
      };
    }
    function put(x, y) {
      var p = clampXY(x, y);
      box.style.setProperty('left', p.x + 'px', 'important');   /* CSS 里是 left:18px !important，要用 important 才盖得住 */
      box.style.setProperty('top', p.y + 'px', 'important');
      box.style.setProperty('right', 'auto', 'important');
      box.style.setProperty('bottom', 'auto', 'important');
      box.classList.add('panda-moved');
      return p;
    }
    function remember(p) {
      try { localStorage.setItem(PANDA_KEY, JSON.stringify(p)); } catch (e) {}
    }
    function resetPanda() {
      try { localStorage.removeItem(PANDA_KEY); } catch (e) {}
      ['left', 'top', 'right', 'bottom'].forEach(function (k) { box.style.removeProperty(k); });
      box.classList.remove('panda-moved');
    }
    var saved = pandaSavedPos();
    if (saved) remember(put(saved.x, saved.y));
    window.addEventListener('resize', function () {
      var s = pandaSavedPos();
      if (s) remember(put(s.x, s.y));
    });
    var drag = null;
    box.addEventListener('pointerdown', function (e) {
      if (e.button && e.button !== 0) return;
      var r = box.getBoundingClientRect();
      drag = { id: e.pointerId, dx: e.clientX - r.left, dy: e.clientY - r.top, x0: e.clientX, y0: e.clientY, moved: false };
    });
    window.addEventListener('pointermove', function (e) {
      if (!drag || e.pointerId !== drag.id) return;
      if (!drag.moved) {
        if (Math.abs(e.clientX - drag.x0) < 6 && Math.abs(e.clientY - drag.y0) < 6) return;   /* 6px 以内算点，不算拖 */
        drag.moved = true;
        box.classList.add('dragging');
        try { box.setPointerCapture(drag.id); } catch (err) {}
      }
      if (e.cancelable) e.preventDefault();
      put(e.clientX - drag.dx, e.clientY - drag.dy);
    }, { passive: false });
    function endDrag(e) {
      if (!drag || (e && e.pointerId !== drag.id)) return;
      if (drag.moved) {
        var r = box.getBoundingClientRect();
        remember(put(r.left, r.top));
        suppressClickUntil = performance.now() + 500;
      }
      drag = null;
      box.classList.remove('dragging');
    }
    window.addEventListener('pointerup', endDrag);
    window.addEventListener('pointercancel', endDrag);
    box.addEventListener('click', function (e) {
      if (performance.now() < suppressClickUntil) { e.stopPropagation(); e.preventDefault(); }
    }, true);
    box.addEventListener('dblclick', resetPanda);
  }
  initPandaDrag();
  /* ============ 换肤：5 套配色，记住用户选择 ============ */
  var THEMES = [
    ['cream', '奶油果园'],
    ['peach', '蜜桃汽水'],
    ['berry', '莓莓奶油'],
    ['matcha', '抹茶牛奶'],
    ['lemon', '海盐柠檬']
  ];
  function applyTheme(id, announce) {
    var name = 'cream';
    for (var i = 0; i < THEMES.length; i++) if (THEMES[i][0] === id) name = id;
    document.body.dataset.theme = name;
    S.theme = name; save();
    var btn = $('#themeBtn');
    if (btn) {
      var label = '';
      for (var k = 0; k < THEMES.length; k++) if (THEMES[k][0] === name) label = THEMES[k][1];
      btn.textContent = '🎨 ' + label;
    }
    if (announce) { toast('换好了：' + (label || '') + ' 配色'); Sfx.ding(); }
  }
  /* ============ 字体：全站固定文渊圆体（正文 Light 300 / 标题 Bold 700） ============ */
  function applyFont() {
    document.body.dataset.font = 'wenyuan';
    S.font = 'wenyuan'; save();
  }

  /* ============ 拼音：独立开关（外语标注在 assets/js/i18n.js 里） ============ */
  $('#togglePy').addEventListener('click', function () {
    S.py = !S.py; document.body.classList.toggle('show-py', S.py);
    this.classList.toggle('on', S.py); save();
  });
  $('#toggleSound').addEventListener('click', function () {
    S.sound = !S.sound; save();
    this.textContent = S.sound ? '🔊' : '🔇';
    this.classList.toggle('off', !S.sound);
    if (S.sound) Sfx.ding();
  });
  var themeBtnEl = $('#themeBtn');
  if (themeBtnEl) themeBtnEl.addEventListener('click', function () {
    var cur = 0;
    for (var i = 0; i < THEMES.length; i++) if (THEMES[i][0] === (S.theme || 'cream')) cur = i;
    var next = THEMES[(cur + 1) % THEMES.length];
    applyTheme(next[0], true);
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
    if (/[^\x00-\x7F]/.test(rel)) return '';     /* 带中文名的路径不可能有对应抠图，直接不换 */
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
  applyTheme(S.theme || 'cream', false);
  applyFont();
  document.body.classList.toggle('show-py', !!S.py);
  $('#togglePy').classList.toggle('on', !!S.py);
  $('#toggleSound').textContent = S.sound ? '🔊' : '🔇';
  $('#toggleSound').classList.toggle('off', !S.sound);
  bgDeco();
  window.addEventListener('hashchange', route);

  /* ============ 选菜 · 传菜带（缓慢转动 / 悬停渐停 / 点击渐进居中停住） ============ */
  var beltFilter = 'all';
  var belt = null;

  function beltList() {
    return (CC.dishes || []).filter(function (d) {
      if (beltFilter === 'easy') return d.difficulty === 1;
      if (beltFilter === 'hot') return d.heat >= 3;
      if (beltFilter === 'mild') return d.heat <= 2;
      if (beltFilter === 'quick') return d.minutes <= 20;
      if (beltFilter === 'veg') return d.tags.indexOf('素菜') >= 0;
      return true;
    });
  }

  function beltPlateHTML(d) {
    var done = S.cooked[d.id];
    return '<div class="belt-item" data-dish="' + d.id + '" tabindex="0" role="button" aria-label="' + esc(d.name) + '">' +
      '<div class="belt-plate">' +
      '<img class="belt-plate-img" src="assets/img/plate.png?v=7" alt="">' +
      (d.img
        ? '<img class="belt-dish-img" src="' + d.img + '" alt="' + esc(d.name) + '" loading="lazy" onerror="this.style.display=\'none\'">'
        : '<span class="belt-dish-emoji">' + d.emoji + '</span>') +
      (done ? '<span class="belt-flag">已完成 ' + '★'.repeat(done.stars) + '</span>' : '') +
      '</div>' +
      '<div class="belt-name">' + esc(d.name) + '</div>' +
      '</div>';
  }

  function renderBeltPage() {
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) { renderDishes(); return; }
    var filters = [['all', '全部'], ['easy', '简单（难度 1）'], ['hot', '能吃辣（辣度 3+）'], ['mild', '不太辣（辣度 ≤2）'], ['quick', '20 分钟以内'], ['veg', '素菜']];
    app.innerHTML = '<div class="view">' +
      '<div class="view-head"><span class="eyebrow">选菜 · 点菜</span>' +
      '<h1 class="h1">今天做哪一道？</h1>' +
      '</div>' +
      '<div class="belt-viewport" id="beltViewport">' +
      '<div class="belt-surface"><span class="belt-ticks" id="beltTicks"></span></div>' +
      '<div class="belt-track" id="beltTrack"></div></div>' +
      '<div class="card belt-info" id="beltInfo"></div>' +
      '</div>';
    $$('#beltFilters .filter-chip').forEach(function (b) {
      b.addEventListener('click', function () {
        beltFilter = b.dataset.f;
        $$('#beltFilters .filter-chip').forEach(function (x) { x.classList.toggle('on', x === b); });
        buildBelt(); Sfx.pop();
      });
    });
    buildBelt();
    pandaSay('dishes');
  }

  function buildBelt() {
    var track = $('#beltTrack'), viewport = $('#beltViewport');
    if (!track || !viewport) return;
    var list = beltList();
    track.innerHTML = list.map(beltPlateHTML).join('');
    track.style.transform = 'translate3d(0,0,0)';
    belt = { offset: 0, speed: 0, base: 26, target: 26, max: 0, selected: null, tween: null, dragging: false, wrapAt: 0, raf: 0 };
    paintBeltInfo(null);
    requestAnimationFrame(function () {
      if (!belt) return;
      belt.max = Math.max(0, track.scrollWidth - viewport.clientWidth + 40);
      belt.speed = belt.base;
      bindBelt();
      startBelt();
    });
  }

  function bindBelt() {
    var track = $('#beltTrack'), viewport = $('#beltViewport');
    if (!track) return;
    $$('#beltTrack .belt-item').forEach(function (it) {
      it.addEventListener('click', function () { beltSelect(it.dataset.dish); });
      it.addEventListener('keydown', function (e) { if (e.key === 'Enter') { e.preventDefault(); beltSelect(it.dataset.dish); } });
    });
    viewport.addEventListener('mouseenter', function () { if (!belt.dragging && !belt.selected) belt.target = 0; });
    viewport.addEventListener('mouseleave', function () { if (!belt.selected && !belt.dragging) belt.target = belt.base; });
    var dragging = false, lastX = 0, lastT = 0, vel = 0;
    viewport.addEventListener('pointerdown', function (e) {
      if (e.target.closest('.belt-item')) return;
      dragging = true; belt.dragging = true; belt.tween = null; belt.target = 0;
      lastX = e.clientX; lastT = performance.now(); vel = 0;
      try { viewport.setPointerCapture(e.pointerId); } catch (err) {}
    });
    viewport.addEventListener('pointermove', function (e) {
      if (!dragging) return;
      var now = performance.now();
      var dt = Math.max(8, now - lastT);
      vel = -(e.clientX - lastX) / (dt / 1000);      /* 记录拖动速度，用于松手惯性 */
      belt.offset = Math.max(0, Math.min(belt.max, belt.offset - (e.clientX - lastX)));
      lastX = e.clientX; lastT = now;
    });
    viewport.addEventListener('pointerup', function () {
      dragging = false; belt.dragging = false;
      if (!belt.selected) {
        belt.speed = Math.max(-420, Math.min(420, vel));   /* 松手后带惯性滑行，再逐渐回到常速 */
        belt.target = belt.base;
      }
    });
    viewport.addEventListener('pointercancel', function () { dragging = false; belt.dragging = false; });
    /* 悬停时盘子随鼠标轻微倾斜，增加互动感 */
    viewport.addEventListener('pointermove', function (e) {
      if (dragging) return;
      var it = e.target.closest ? e.target.closest('.belt-item') : null;
      $$('#beltTrack .belt-item').forEach(function (x) {
        if (x === it) return;
        x.style.setProperty('--rot', '0deg');
      });
      if (!it) return;
      var r = it.getBoundingClientRect();
      var dx = (e.clientX - (r.left + r.width / 2)) / Math.max(1, r.width);
      it.style.setProperty('--rot', (dx * 6).toFixed(2) + 'deg');
    });
  }

  function beltSelect(id) {
    var track = $('#beltTrack'), viewport = $('#beltViewport');
    if (!track || !viewport || !belt) return;
    var el = track.querySelector('[data-dish="' + id + '"]');
    if (!el) return;
    var to = el.offsetLeft + el.offsetWidth / 2 - viewport.clientWidth / 2;
    to = Math.max(0, Math.min(belt.max, to));
    belt.tween = { from: belt.offset, to: to, t0: performance.now(), dur: 1200 };
    belt.target = 0; belt.selected = id;
    $$('#beltTrack .belt-item').forEach(function (x) { x.classList.toggle('on', x.dataset.dish === id); });
    /* 落定弹跳 + 冒热气 */
    el.classList.add('settle');
    setTimeout(function () { el.classList.remove('settle'); }, 660);
    for (var pi = 0; pi < 3; pi++) {
      (function (k) {
        setTimeout(function () {
          var p = document.createElement('span');
          p.className = 'belt-puff';
          p.style.setProperty('--px', ((Math.random() - 0.5) * 40).toFixed(0) + 'px');
          el.appendChild(p);
          setTimeout(function () { p.remove(); }, 1600);
        }, k * 140);
      })(pi);
    }
    paintBeltInfo(id);
    Sfx.pop();
  }

  function beltResume() {
    if (!belt) return;
    belt.selected = null; belt.tween = null; belt.target = belt.base;
    $$('#beltTrack .belt-item').forEach(function (x) { x.classList.remove('on'); });
    paintBeltInfo(null);
  }

  function beltNext() {
    var list = beltList();
    if (!list.length) return;
    var i = 0;
    for (var k = 0; k < list.length; k++) if (list[k].id === (belt && belt.selected)) i = k;
    beltSelect(list[(i + 1) % list.length].id);
  }

  function paintBeltInfo(id) {
    var box = $('#beltInfo');
    if (!box) return;
    var help = $('#beltHelp');
    if (!id) {
      if (help) help.style.display = 'block';
      box.innerHTML = '<div class="option-row" style="margin:0;justify-content:center">' +
        '<button class="btn btn-sm" id="beltRandom">🎲 随机来一道</button>' +
        '<button class="btn btn-sm" id="beltListBtn">📋 列表视图</button></div>';
      var r = $('#beltRandom');
      if (r) r.addEventListener('click', function () { var l = beltList(); if (l.length) beltSelect(l[Math.floor(Math.random() * l.length)].id); });
      var lb = $('#beltListBtn'); if (lb) lb.addEventListener('click', function () { renderDishes(); });
      return;
    }
    if (help) help.style.display = 'none';
    var d = dishById(id);
    var dots = '';
    for (var i = 1; i <= 5; i++) dots += '<i class="heat-dot' + (i <= d.heat ? ' on' : '') + '"></i>';
    box.innerHTML = '<div style="display:flex;gap:18px;align-items:flex-start;flex-wrap:wrap">' +
      '<div style="flex:1 1 330px;min-width:250px">' +
      '<div class="dish-name-row">' +
      '<h2 class="h2">' + esc(d.name) + ' ' + speakBtn(d.name) + '</h2>' +
      '<a class="btn btn-sm story-link" href="#/story/' + d.id + '">📖 了解文化故事</a></div>' +
      pyLine(d.py) + enLine(d.en) +
      '<div class="dish-meta" style="margin-top:8px"><span class="heat-dots">' + dots + '</span>' +
      '<span>⏱ ' + d.minutes + ' 分钟</span>' +
      '<span>难度 ' + '●'.repeat(d.difficulty) + '○'.repeat(3 - d.difficulty) + '</span>' +
      '<span>' + esc(d.region) + '</span></div>' +
      '<div class="dish-tags" style="margin-top:8px"><span class="tag">' + esc(d.flavor) + '</span>' +
      d.tags.map(function (t) { return '<span class="tag">' + esc(t) + '</span>'; }).join('') + '</div>' +
      '<p class="small" style="margin-top:10px">' + esc(String(d.story.zh).split('。')[0] + '。') + '</p></div>' +
      '<div style="display:flex;flex-direction:column;gap:8px;min-width:168px">' +
      '<button class="btn btn-primary" id="beltStart">开始做 →</button>' +
      '<button class="btn" id="beltNextBtn">🔁 换一盘</button>' +
      '<button class="btn btn-sm" id="beltResumeBtn">▶ 继续转</button>' +
      '<button class="btn btn-sm" id="beltListBtn2">📋 列表视图</button></div></div>';
    var st = $('#beltStart');
    if (st) st.addEventListener('click', function () { S.dish = d.id; save(); go('prep', d.id); });
    var nx = $('#beltNextBtn'); if (nx) nx.addEventListener('click', beltNext);
    var rs = $('#beltResumeBtn'); if (rs) rs.addEventListener('click', beltResume);
    var l2 = $('#beltListBtn2'); if (l2) l2.addEventListener('click', function () { renderDishes(); });
  }

  function beltKeys(e) {
    if (!belt || current.name !== 'dishes') return;
    if (!document.getElementById('beltTrack')) return;
    var list = beltList();
    if (!list.length) return;
    var idx = 0;
    for (var k = 0; k < list.length; k++) if (list[k].id === belt.selected) idx = k;
    if (e.key === 'ArrowRight') { e.preventDefault(); beltSelect(list[(idx + 1) % list.length].id); }
    else if (e.key === 'ArrowLeft') { e.preventDefault(); beltSelect(list[(idx - 1 + list.length) % list.length].id); }
    else if (e.key === 'Enter' && belt.selected) { e.preventDefault(); S.dish = belt.selected; save(); go('prep', belt.selected); }
    else if (e.key === 'Escape') { beltResume(); }
  }
  document.addEventListener('keydown', beltKeys);

  function startBelt() {
    if (!belt) return;
    if (belt.raf) cancelAnimationFrame(belt.raf);
    var last = performance.now();
    function frame(now) {
      var track = $('#beltTrack');
      if (!track || !belt) { belt = null; return; }          /* 离开页面自动停止 */
      var b = belt;
      var dt = Math.min(0.05, (now - last) / 1000); last = now;
      if (b.tween) {
        var p = Math.min(1, (now - b.tween.t0) / b.tween.dur);
        var e = p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2;   /* easeInOutCubic：渐进滑到中间 */
        b.offset = b.tween.from + (b.tween.to - b.tween.from) * e;
        if (p >= 1) { b.tween = null; b.speed = 0; b.target = 0; }
      } else if (!b.dragging) {
        b.speed += (b.target - b.speed) * Math.min(1, dt * 2.4);              /* 渐进加减速 */
        if (b.target === 0 && b.speed < 0.2) b.speed = 0;
        b.offset += b.speed * dt;
        if (b.offset >= b.max) {                                              /* 转到头 → 稍停 → 回绕 */
          b.offset = b.max;
          if (!b.wrapAt) b.wrapAt = now + 900;
          else if (now >= b.wrapAt) { b.offset = 0; b.wrapAt = 0; if (!b.selected) b.target = b.base; }
        } else if (b.offset < b.max - 1) b.wrapAt = 0;
        if (document.hidden) b.speed = 0;
      }
      track.style.transform = 'translate3d(' + (-b.offset).toFixed(1) + 'px,0,0)';
      var ticks = $('#beltTicks');
      if (ticks) ticks.style.backgroundPosition = (-b.offset * 0.55).toFixed(0) + 'px 0';
      b.raf = requestAnimationFrame(frame);
    }
    belt.raf = requestAnimationFrame(frame);
  }

  /* ============ 首页导航化：右侧菜单 + 内容子页 ============ */
  var HOME_NAV = [
    ['guide', '🥢', '怎么做菜', '三步走：选菜 → 备菜 → 上灶', '#ffe9a8', '#f6d271'],
    ['culture', '🏮', '川菜文化', '地理 · 历史 · 流派 · 餐桌', '#cfe3b0', '#a9c77f'],
    ['flavor', '🎨', '味型与时间', '转盘认味型，看麻辣由来', '#ffdbbe', '#f0a24a'],
    ['table', '🍵', '流派与餐桌', '三大帮派 · 盖碗茶 · 教学建议', '#ffdada', '#e0533d']
  ];

  function homeNavHTML() {
    return '<aside class="home-nav" id="homeNav"><div class="home-nav-title">想看点别的？</div>' +
      HOME_NAV.map(function (n) {
        return '<button class="hnav-card" data-route="' + n[0] + '" style="--c1:' + n[4] + ';--c2:' + n[5] + '">' +
          '<span class="hnav-ico">' + n[1] + '</span>' +
          '<span class="hnav-txt"><b>' + n[2] + '</b><i>' + n[3] + '</i></span>' +
          '<span class="hnav-go">›</span></button>';
      }).join('') + '</aside>';
  }

  /* 首页只留 Hero + 右侧菜单；其余 section 收进缓存，交给子页使用 */
  function homeNavAndSplit() {
    var secs = $$('#app section.culture-section');
    window.HOME_SECTIONS = secs.map(function (s) { return s.outerHTML; });
    secs.forEach(function (s) { s.style.display = 'none'; });
    var hero = $('#app .hero');
    if (!hero) return;
    var wrap = document.createElement('div');
    wrap.className = 'home-split';
    hero.parentNode.insertBefore(wrap, hero);
    wrap.appendChild(hero);
    wrap.insertAdjacentHTML('beforeend', homeNavHTML());
  }

  /* 直接打开子页（刷新 / 收藏链接）时缓存是空的：先渲染一次首页把 section 收进来 */
  function ensureHomeSections() {
    if (window.HOME_SECTIONS && window.HOME_SECTIONS.length) return;
    renderHome();
  }

  /* 首页·文化的两个板块 = 两张卡的导航菜单（味型与时间 / 流派与餐桌） */
  var HOME_MENUS = {
    flavor: {
      name: '味型与时间', title: '🎨 味型与时间', lead: '先选一张卡：转盘认味型，时间轴看"麻辣"的来历。',
      cards: [
        { id: 'wheel', icon: '🎡', title: '味型转盘', sub: '转一转，随机停在一个味型上，看看它是什么味道、有哪些代表菜。', meta: (CC.flavors || []).length + ' 个味型 · 点中间的圆盘转一转', sec: 2 },
        { id: 'timeline', icon: '⏳', title: '时间轴', sub: '从花椒到辣椒："麻辣"是怎么一步步走上四川餐桌的。', meta: '4 个时间点 · 点开逐条读', sec: 3 }
      ]
    },
    table: {
      name: '流派与餐桌', title: '🍵 流派与餐桌', lead: '先选一张卡：看三大帮派的差别，再坐一坐成都的茶馆。',
      cards: [
        { id: 'schools', icon: '🏯', title: '三大流派', sub: '上河帮（成都乐山）、下河帮（重庆）、小河帮（自贡），同一个四川三种味道。', meta: '3 个帮派 · 代表菜都不一样', sec: 4 },
        { id: 'gaiwan', icon: '🍵', title: '餐桌文化', sub: '盖碗茶里的"天、地、人"，还有四川人怎么聊天、怎么请客。', meta: '3 件茶具 + 餐桌小知识', sec: 5 }
      ]
    }
  };
  function renderHomeMenu(route) {
    var cfg = HOME_MENUS[route];
    var one = cfg.cards.filter(function (c) { return c.id === (current.arg || ''); })[0];
    if (one) return renderHomeMenuSection(route, cfg, one);
    app.innerHTML = '<div class="view"><div class="view-head"><span class="eyebrow">首页 · 文化</span>' +
      '<h1 class="h1">' + cfg.title + '</h1>' +
      '<p class="lead">' + cfg.lead + '</p></div>' +
      '<div class="vocab-menu vm-2">' + cfg.cards.map(function (c) {
        return '<a class="vm-card" href="#/' + route + '/' + c.id + '">' +
          '<span class="vm-ico">' + c.icon + '</span>' +
          '<span class="vm-title">' + c.title + '</span>' +
          '<span class="vm-sub">' + c.sub + '</span>' +
          '<span class="vm-meta">' + esc(c.meta || '') + '</span>' +
          '<span class="vm-go">进去看看 ›</span></a>';
      }).join('') + '</div>' +
      '<div style="margin:16px 0 6px;display:flex;gap:10px;flex-wrap:wrap">' +
      '<button class="btn" data-route="home">‹ 返回首页</button>' +
      '<button class="btn btn-gold" data-route="dishes">🍽️ 去做菜</button></div></div>';
    pandaSay('home');
  }
  function renderHomeMenuSection(route, cfg, one) {
    ensureHomeSections();
    var all = window.HOME_SECTIONS || [];
    app.innerHTML = '<div class="view"><a class="vocab-back" href="#/' + route + '">‹ 返回' + cfg.name + '</a>' +
      (all[one.sec] || '<p class="muted" style="margin-top:20px">这块内容还在整理中。</p>') +
      '<div style="margin:18px 0 6px;display:flex;gap:10px;flex-wrap:wrap">' +
      '<button class="btn" data-route="' + route + '">‹ 返回' + cfg.name + '</button>' +
      '<button class="btn btn-gold" data-route="dishes">🍽️ 去做菜</button></div></div>';
    bindMovedSections();
    pandaSay('home');
  }

  var SUB_META = {
    guide: ['🥢 怎么做菜', '从选菜到上灶，三步做完一道川菜 —— 每一步都有中文、拼音和英文。'],
    culture: ['🏮 川菜文化', '四川为什么爱吃麻辣、花椒和辣椒从哪来、成都重庆自贡有什么不同。'],
    flavor: ['🎨 味型与时间', '转一转认识味型，再看"麻辣"是怎么一步步走上四川餐桌的。'],
    table: ['🍵 流派与餐桌', '三大帮派、盖碗茶与餐桌礼仪，附给老师的教学建议和资料清单。']
  };
  var SUB_MAP = { guide: [0] };   /* flavor / table 走 HOME_MENUS 两张卡的菜单，culture 走卡片墙 */

  function renderHomeSectionPage(route) {
    if (route === 'culture') { renderCultureCards(); return; }
    if (HOME_MENUS[route]) { renderHomeMenu(route); return; }
    ensureHomeSections();
    var all = window.HOME_SECTIONS || [];
    var meta = SUB_META[route] || ['首页', ''];
    var idx = SUB_MAP[route] || [];
    app.innerHTML = '<div class="view">' +
      '<div class="view-head"><span class="eyebrow">首页 · 文化</span>' +
      '<h1 class="h1">' + meta[0] + '</h1><p class="lead">' + meta[1] + '</p></div>' +
      idx.map(function (i) { return all[i] || ''; }).join('') +
      '<div style="margin:18px 0 6px;display:flex;gap:10px;flex-wrap:wrap">' +
      '<button class="btn" data-route="home">‹ 返回首页</button>' +
      '<button class="btn btn-gold" data-route="dishes">🍽️ 去做菜</button></div></div>';
    bindMovedSections();
    pandaSay('home');
  }

  /* 子页是克隆出来的 HTML，需要重新绑定这些交互 */
  /* ===== 文化页：卡片墙 + 翻页弹窗 ===== */
  /* 每个文化话题配一张实物图，帮助理解 */
  var CULTURE_IMG = {
    what: 'assets/img/hero.jpg',
    geo: 'assets/img/dish-shuizhu.jpg',
    schools: 'assets/img/dish-huiguo.jpg',
    table: 'assets/img/dish-wanzamian.jpg',
    skills: 'assets/img/dish-ganbian.jpg'
  };
  function cultureImage(c) { return CULTURE_IMG[c && c.id] || 'assets/img/hero.jpg'; }

  function renderCultureCards() {
    var list = CC.culture || [];
    app.innerHTML = '<div class="view">' +
      '<div class="view-head"><span class="eyebrow">首页 · 文化</span><h1 class="h1">🏮 川菜文化</h1>' +
      '<p class="lead">点一张卡片，像翻书一样看它的故事 —— 左下角还能翻到下一个话题。</p></div>' +
      '<div class="culture-grid">' + list.map(function (c, i) {
        return '<button class="cc-card" data-cc="' + i + '">' +
          '<span class="cc-emoji">' + c.emoji + '</span>' +
          '<span class="cc-title">' + esc(c.title) + '</span>' +
          '<span class="cc-sub">' + esc(c.py) + '</span>' +
          '<span class="cc-lead">' + esc(String(c.lead.zh).slice(0, 46)) + '…</span>' +
          '<span class="cc-more">点开看 →</span></button>';
      }).join('') + '</div>' +
      '<div class="home-back" style="margin-top:14px;display:flex;gap:10px">' +
      '<button class="btn" data-route="home">‹ 返回首页</button>' +
      '<button class="btn btn-gold" data-route="dishes">🍽️ 去做菜</button></div></div>';
    $$('#app .cc-card').forEach(function (b) {
      b.addEventListener('click', function () { openCultureModal(+b.dataset.cc, 0); Sfx.ding(); });
    });
    pandaSay('home');
  }
  function openCultureModal(i, dir) {
    var list = CC.culture || [];
    if (i < 0) i = list.length - 1;
    if (i >= list.length) i = 0;
    var c = list[i];
    openModal('<div class="flip-panel">' +
      '<img class="book-photo" src="' + cultureImage(c) + '" alt="' + esc(c.title) + '" onerror="this.style.display=\'none\'">' +
      '<div style="text-align:center">' +
      '<div class="cc-big-emoji">' + c.emoji + '</div>' +
      '<h2 class="h2" style="text-align:center;margin:4px 0 0">' + esc(c.title) + ' ' + speakBtn(c.title) + '</h2>' +
      pyLine(c.py) + enLine(c.en) + '</div>' +
      '<p class="small"><strong>' + esc(c.lead.zh) + '</strong>' + pyLine(c.lead.py) + enLine(c.lead.en) + '</p>' +
      c.blocks.map(function (b) { return '<p class="small">' + esc(b.zh) + enLine(b.en) + '</p>'; }).join('') +
      '<div class="fact-list">' + c.facts.map(function (f) {
        return '<div class="fact"><div>' + esc(f.zh) + enLine(f.en) + '</div></div>';
      }).join('') + '</div>' +
      '<div class="cc-nav">' +
      '<button class="btn btn-sm" id="ccPrev">‹ 上一个</button>' +
      '<span class="muted small">' + (i + 1) + ' / ' + list.length + '</span>' +
      '<button class="btn btn-sm btn-primary" id="ccNext">下一个 ›</button>' +
      '</div></div>');
    var card = $('.modal-card');
    if (card) {
      card.classList.add(dir ? 'flip-left' : 'flip-right');
      card.style.animation = 'none'; void card.offsetWidth;
      card.style.animation = '';
    }
    var pv = $('#ccPrev'); if (pv) pv.addEventListener('click', function () { openCultureModal(i - 1, -1); Sfx.pop(); });
    var nx = $('#ccNext'); if (nx) nx.addEventListener('click', function () { openCultureModal(i + 1, 1); Sfx.pop(); });
  }

  function bindMovedSections() {
    var wc = $('#wheelCenter'); if (wc) wc.addEventListener('click', spinWheel);
    var os = $('#openSources'); if (os) os.addEventListener('click', showSources);
    var rd = $('#randomDish');
    if (rd) rd.addEventListener('click', function () {
      var list = CC.dishes || [];
      if (list.length) { Sfx.pop(); go('prep', list[Math.floor(Math.random() * list.length)].id); }
    });
    $$('.timeline-item').forEach(function (it) {
      it.addEventListener('click', function () { it.classList.toggle('open'); Sfx.pop(); });
    });
    $$('.gaiwan-part').forEach(function (p) {
      p.addEventListener('click', function () { Sfx.ding(); p.style.animation = 'none'; void p.offsetWidth; p.style.animation = 'popIn .5s both'; });
    });
  }

  /* ============ 交互增强：点击星星、滚动淡入、数字滚动、页面转场 ============ */
  function sparkle(x, y) {
    var glyphs = ['✦', '✧', '★', '♥', '❋'];
    for (var i = 0; i < 8; i++) {
      var s = document.createElement('span');
      s.className = 'spark';
      s.textContent = glyphs[i % glyphs.length];
      s.style.left = x + 'px';
      s.style.top = y + 'px';
      s.style.fontSize = (12 + Math.random() * 14).toFixed(0) + 'px';
      s.style.color = ['#ff8a3d', '#4fa36b', '#e4567f', '#3f7fd6', '#e0a81c'][i % 5];
      s.style.setProperty('--dx', ((Math.random() - 0.5) * 150).toFixed(0) + 'px');
      s.style.setProperty('--dy', (-(40 + Math.random() * 120)).toFixed(0) + 'px');
      document.body.appendChild(s);
      setTimeout(function (el) { return function () { el.remove(); }; }(s), 950);
    }
  }
  document.addEventListener('click', function (e) {
    if (e.target.closest('.belt-item') || e.target.closest('.btn') || e.target.closest('.hnav-card')) {
      sparkle(e.clientX, e.clientY);
      Sfx.pop();
    }
  }, true);

  /* 卡片进入视口时错峰淡入 */
  var io = window.IntersectionObserver ? new IntersectionObserver(function (entries) {
    entries.forEach(function (en, i) {
      if (en.isIntersecting) {
        en.target.style.transitionDelay = (i * 60) + 'ms';
        en.target.classList.add('reveal-in');
        io.unobserve(en.target);
      }
    });
  }, { rootMargin: '0px 0px -40px 0px' }) : null;
  window.__reveal = function () {
    if (!io) return;
    $$('.card, .dish-card, .ingredient-tile, .season-card').forEach(function (el, i) {
      if (el.classList.contains('reveal-in')) return;
      el.classList.add('reveal');
      io.observe(el);
    });
  };
  var _origRoute = route;
  route = function () {
    _origRoute.apply(null, arguments);
    var app2 = $('#app');
    if (app2) { app2.classList.remove('page-in'); void app2.offsetWidth; app2.classList.add('page-in'); }
    window.__reveal();
    setTimeout(countUp, 400);
  };

  /* 首页数字滚动 */
  function countUp() {
    $$('.stat b').forEach(function (el) {
      if (el.dataset.done) return;
      var txt = el.textContent.trim();
      var num = parseInt(txt.replace(/[^\d]/g, ''), 10);
      if (!num) return;
      el.dataset.done = '1';
      var suffix = txt.replace(/[\d,]/g, '');
      var t0 = performance.now();
      (function tick(now) {
        var p = Math.min(1, (now - t0) / 900);
        el.textContent = Math.round(num * (1 - Math.pow(1 - p, 3))) + suffix;
        if (p < 1) requestAnimationFrame(tick);
      })(t0);
    });
  }

  route();
})();
