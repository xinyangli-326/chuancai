/* 多语言标注：右上角下拉选语言（单选，一次只显示一种语言的标注）。
   - 拼音是独立按钮，不受这里影响。
   - 短词表在 lang-pack.js，长句（步骤/故事/提示/小测/熊猫台词）在 lang-long.js；
     没收录的词条自动退回英文，不会出现空白。
   - 实现方式：渲染完成后扫一遍文本节点（中文原文 → 译文），再处理 .en 标注行。 */
(function () {
  var STORE = 'cc-langs-v1';
  var ORDER = ['en', 'ja', 'ko', 'ru', 'th', 'vi', 'ar'];
  var LANGS = window.LANGS || {};
  var EN_LONG = window.LANG_LONG_EN || {};      /* 中文原句 → 更完整的英文 */

  /* 长句译文（lang-long.js）并进词条表；短词表里已有的键以短词表为准 */
  (function mergeLong() {
    var extra = window.LANG_LONG || {};
    Object.keys(extra).forEach(function (c) {
      if (!LANGS[c]) return;
      var w = LANGS[c].w = LANGS[c].w || {};
      Object.keys(extra[c] || {}).forEach(function (k) { if (!(k in w)) w[k] = extra[c][k]; });
    });
  })();

  /* ---------- 选中的语言（单选：最多一种） ---------- */
  var sel = ['en'];
  try {
    var saved = JSON.parse(localStorage.getItem(STORE) || 'null');
    if (saved && saved.length) {
      sel = saved.filter(function (c) { return c === 'en' || LANGS[c]; }).slice(0, 1);
    }
    if (saved && !saved.length) sel = [];
  } catch (e) { /* 用默认 */ }

  function saveSel() {
    try { localStorage.setItem(STORE, JSON.stringify(sel)); } catch (e) { /* 忽略 */ }
  }
  function targets() {                        /* 需要翻译的目标语言（不含英文） */
    return sel.filter(function (c) { return c !== 'en' && LANGS[c]; });
  }
  function T(code, key) {
    var p = LANGS[code];
    return (p && p.w && p.w[key]) || '';
  }

  /* ---------- 英文 → 中文 反查表（用站点数据自动建，不用手写） ---------- */
  var EN2ZH = {};
  function pair(zh, en) {
    if (!zh || !en) return;
    var k = String(en).trim().toLowerCase();
    if (k && k !== zh && !EN2ZH[k]) EN2ZH[k] = zh;
  }
  (function buildIndex() {
    var CC = window.CC || {};
    Object.keys(CC.ingredients || {}).forEach(function (k) { pair(CC.ingredients[k].zh, CC.ingredients[k].en); });
    (CC.seasonings || []).forEach(function (x) { pair(x.zh, x.en); });
    Object.keys(CC.actions || {}).forEach(function (k) { pair(CC.actions[k].zh, CC.actions[k].en); });
    Object.keys(CC.heat || {}).forEach(function (k) { pair(CC.heat[k].zh, CC.heat[k].en); });
    (CC.flavors || []).forEach(function (x) { pair(x.zh, x.en); });
    (CC.tools || []).forEach(function (x) { pair(x.zh, x.en); });
    (CC.dishes || []).forEach(function (d) { pair(d.name, d.en); });
    Object.keys(CC.vocab || {}).forEach(function (c) {
      CC.vocab[c].forEach(function (w) { pair(w.zh, w.en); });
    });
    /* 长句：步骤正文 / 熊猫步骤提示 / 菜谱故事 / 烹饪提示 / 文化小测 */
    (CC.dishes || []).forEach(function (d) {
      pair(d.story && d.story.zh, d.story && d.story.en);
      (d.tips || []).forEach(function (t) { pair(t.zh, t.en); });
      (d.steps || []).forEach(function (s) {
        pair(s.zh, s.en);
        if (s.tip) pair(s.tip.zh, s.tip.en);
      });
    });
    (CC.cultureQuiz || []).forEach(function (q) {
      pair(q.q && q.q.zh, q.q && q.q.en);
      (q.options || []).forEach(function (o) { pair(o.zh, o.en); });
      if (q.explain) pair(q.explain.zh, q.explain.en);
    });
  })();

  /* ---------- 文本节点替换 ---------- */
  var KEYCACHE = {};
  function longKeys(code) {                   /* 只做"词中替换"用的键（长度 >= 2） */
    if (KEYCACHE[code]) return KEYCACHE[code];
    var w = (LANGS[code] && LANGS[code].w) || {};
    KEYCACHE[code] = Object.keys(w).filter(function (k) { return k.length >= 2; })
      .sort(function (a, b) { return b.length - a.length; });
    return KEYCACHE[code];
  }
  function subShort(text, code) {             /* 短标签里的词中替换（如 "🍜 豌杂面 · 怎么做"） */
    var w = LANGS[code].w, out = text, keys = longKeys(code);
    for (var i = 0; i < keys.length; i++) {
      if (out.indexOf(keys[i]) >= 0) out = out.split(keys[i]).join(w[keys[i]]);
    }
    return out === text ? '' : out;
  }

  var obs = null, queued = false;
  function schedule() {
    if (queued) return;
    queued = true;
    requestAnimationFrame(function () { queued = false; apply(); });
  }

  function apply() {
    var app = document.body;                      /* 导航条在 header 里，跟着 body 一起扫 */
    if (!app) return;
    var code = targets()[0] || '';
    if (obs) obs.disconnect();

    document.body.classList.toggle('show-en', sel.length > 0);
    document.body.classList.toggle('lang-rtl', !!(code && LANGS[code].rtl));
    paintLabel();                                 /* 右上角按钮文字跟着语言走 */

    var walker = document.createTreeWalker(app, NodeFilter.SHOW_TEXT, null);
    var n;
    while ((n = walker.nextNode())) {
      var el = n.parentNode;
      var tag = el && el.nodeName;
      if (tag === 'SCRIPT' || tag === 'STYLE' || tag === 'TEXTAREA') continue;   /* 别动代码本身 */
      if (n.__cc === undefined) n.__cc = n.nodeValue;
      var orig = n.__cc;
      /* 开头的 emoji / 符号（🏮、🔪、‹ 之类）先剥掉再比对，写回时保留 */
      var key = orig.trim().replace(/^[^\u4e00-\u9fff]+/, '');
      if (!key) continue;
      var isTitle = !!(el && el.closest && el.closest('.h1, .h2, .h3, h1, h2, h3, .eyebrow'));
      var isChrome = !!(el && el.closest && el.closest('header, button, .btn, .chip-toggle, .cat-chip, .tab, .pager, label, .view-head'));
      if (!isTitle && !isChrome) continue;      /* 正文保持中文，只有标注行换成外语 */
      var out = '';
      if (code) {
        out = T(code, key);
        if (!out && (isTitle || isChrome) && key.length >= 2 && key.length <= (isTitle ? 24 : 14)) out = subShort(key, code);
      }
      n.nodeValue = out ? orig.replace(key, out) : orig;
    }

    applyEnLines(app);
    paintPanda(sel.length ? sel[0] : '');         /* 英文也要给熊猫台词补一行 */
    if (obs) obs.observe(app, { childList: true, subtree: true });
  }

  /* ---------- 熊猫气泡：中文原文下面补一行译文 ---------- */
  function paintPanda(code) {
    var t = document.getElementById('pandaText');
    if (!t) return;
    var tr = t.querySelector('.panda-tr');
    var probe = t.cloneNode(true);                    /* 用副本取纯中文原文（不含上一轮的译文行） */
    var stale = probe.querySelector('.panda-tr');
    if (stale) stale.remove();
    var src = probe.textContent.trim();
    var want = (code && src) ? (code === 'en' ? (EN_LONG[src] || '') : (T(code, src) || '')) : '';
    var have = tr ? tr.textContent : '';
    if (want === have) return;                        /* 没变就别碰 DOM，否则会自激 */
    if (tr) tr.remove();
    if (!want) return;
    var s = document.createElement('span');
    s.className = 'panda-tr';
    s.setAttribute('dir', (LANGS[code] && LANGS[code].rtl) ? 'rtl' : 'ltr');
    s.textContent = want;
    t.appendChild(s);
  }

  function applyEnLines(root) {
    var nodes = root.querySelectorAll('.en');
    [].forEach.call(nodes, function (el) {
      if (el.classList.contains('en-extra')) return;
      if (el.dataset.ccEn === undefined) el.dataset.ccEn = el.textContent.trim();
      var sib = el.nextElementSibling;
      while (sib && sib.classList.contains('en-extra')) {           /* 清掉上次插入的其它语言行 */
        var nx = sib.nextElementSibling; sib.remove(); sib = nx;
      }
      var en = el.dataset.ccEn;
      var zh = EN2ZH[en.toLowerCase()] || '';
      var lines = [];
      sel.forEach(function (c) {
        if (c === 'en') { lines.push({ c: 'en', t: (zh && EN_LONG[zh]) || en }); return; }
        var t = zh ? T(c, zh) : '';
        if (t) lines.push({ c: c, t: t });
      });
      if (!lines.length) { el.textContent = en; return; }
      el.textContent = lines[0].t;
      el.setAttribute('dir', (LANGS[lines[0].c] && LANGS[lines[0].c].rtl) ? 'rtl' : 'ltr');
      var last = el;
      lines.slice(1).forEach(function (x) {
        var extra = el.cloneNode(true);
        extra.classList.add('en-extra');
        extra.textContent = x.t;
        extra.setAttribute('dir', (LANGS[x.c] && LANGS[x.c].rtl) ? 'rtl' : 'ltr');
        last.parentNode.insertBefore(extra, last.nextSibling);
        last = extra;
      });
    });
  }

  /* ---------- 下拉：点开选语言（可多选） ---------- */
  function label() {
    if (!sel.length) return '只看中文';
    return sel.map(function (c) {
      return c === 'en' ? 'English' : (LANGS[c] ? LANGS[c].name : c);
    }).join(' · ');
  }
  function paintPicker(btn, drop) {
    btn.textContent = '🌐 ' + label() + ' ▾';
    [].forEach.call(drop.querySelectorAll('[data-lang]'), function (b) {
      var on = b.getAttribute('data-lang') === 'none' ? sel.length === 0 : sel.indexOf(b.getAttribute('data-lang')) >= 0;
      b.classList.toggle('on', on);
      b.setAttribute('aria-checked', on ? 'true' : 'false');
    });
  }
  function paintLabel() {                        /* 只改按钮文字，没变就不动 DOM（避免自激） */
    var btn = document.getElementById('langBtn');
    if (!btn) return;
    var want = '🌐 ' + label() + ' ▾';
    if (btn.textContent !== want) btn.textContent = want;
  }
  function buildPicker() {
    var btn = document.getElementById('langBtn'), drop = document.getElementById('langDrop');
    if (!btn || !drop) return false;
    var codes = ORDER.filter(function (c) { return c === 'en' || LANGS[c]; });
    drop.innerHTML = codes.map(function (c) {
      var p = c === 'en' ? { name: 'English', flag: '🇬🇧' } : LANGS[c];
      return '<button class="lang-opt" type="button" role="menuitemradio" aria-checked="false" data-lang="' + c + '">' +
        '<span class="tick">✓</span><span class="lg-flag">' + (p.flag || '') + '</span><b>' + p.name + '</b></button>';
    }).join('') +
      '<button class="lang-opt" type="button" role="menuitemradio" aria-checked="false" data-lang="none">' +
      '<span class="tick">✓</span><span class="lg-flag">🇨🇳</span><b>只看中文</b></button>' +
      '<div class="lang-tip">一次只显示一种语言的标注</div>';

    btn.addEventListener('click', function (e) {
      e.stopPropagation();
      var willOpen = drop.hidden;
      drop.hidden = !willOpen;
      btn.setAttribute('aria-expanded', willOpen ? 'true' : 'false');
    });
    drop.addEventListener('click', function (e) {
      var b = e.target.closest('[data-lang]');
      if (!b) return;
      e.stopPropagation();
      var code = b.getAttribute('data-lang');
      if (code === 'none') sel = [];
      else if (sel.indexOf(code) >= 0) sel = [];     /* 再点一次 = 取消，回到只看中文 */
      else sel = [code];                              /* 单选：换语言就替换掉原来那个 */
      saveSel();
      paintPicker(btn, drop);
      apply();
      if (window.Sfx && Sfx.ding) Sfx.ding();
    });
    document.addEventListener('click', function (e) {
      if (!e.target.closest('#langPick')) { drop.hidden = true; btn.setAttribute('aria-expanded', 'false'); }
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') { drop.hidden = true; btn.setAttribute('aria-expanded', 'false'); }
    });
    paintPicker(btn, drop);
    return true;
  }

  function start() {
    buildPicker();
    var app = document.body;
    if (app && window.MutationObserver) {
      obs = new MutationObserver(schedule);
      obs.observe(app, { childList: true, subtree: true });
    }
    apply();
  }

  window.CC_I18N = {
    get langs() { return sel.slice(); },
    set: function (list) {
      sel = ORDER.filter(function (c) { return list.indexOf(c) >= 0; }).slice(0, 1);
      saveSel(); apply();
    },
    apply: apply,
    label: label
  };

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start);
  else start();
})();
