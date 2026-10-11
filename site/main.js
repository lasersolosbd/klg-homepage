// Reveal-on-scroll (content is visible by default; .js class enables the effect)
(function () {
  var reveals = document.querySelectorAll('.reveal');
  var art = document.querySelector('.hero-art');
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduce || !('IntersectionObserver' in window)) {
    reveals.forEach(function (el) { el.classList.add('in'); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    reveals.forEach(function (el) { io.observe(el); });
  }
  if (art) { requestAnimationFrame(function () { art.classList.add('in'); }); }

  // Mobile sticky CTA: show after the hero, hide while the final CTA is on screen
  var bar = document.getElementById('stickyCta');
  var hero = document.querySelector('.hero');
  var book = document.getElementById('book');
  if (bar && hero && book && 'IntersectionObserver' in window) {
    var pastHero = false, atBook = false;
    var update = function () { bar.classList.toggle('show', pastHero && !atBook); };
    new IntersectionObserver(function (e) { pastHero = !e[0].isIntersecting; update(); }).observe(hero);
    new IntersectionObserver(function (e) { atBook = e[0].isIntersecting; update(); }, { threshold: 0.2 }).observe(book);
  }
})();

/* ================= v2 ================= */

// ---- Hero: living network ----
(function () {
  var cv = document.getElementById('net'); if (!cv) return;
  var ctx = cv.getContext('2d'), hero = cv.parentElement;
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var W = 0, H = 0, dpr = 1, nodes = [], pulses = [], mouse = { x: -999, y: -999, on: false };
  var BRASS = '210,171,98', LINK = 150, running = false, visible = true, last = 0, nextPulse = 0;

  function size() {
    var r = hero.getBoundingClientRect();
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    W = r.width; H = r.height;
    cv.width = W * dpr; cv.height = H * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    var n = Math.round(Math.min(95, Math.max(26, W * H / 15000)));
    nodes = [];
    for (var i = 0; i < n; i++) {
      var hub = Math.random() < 0.09;
      nodes.push({ x: Math.random() * W, y: Math.random() * H, vx: (Math.random() - .5) * .22, vy: (Math.random() - .5) * .22, r: hub ? 3.4 : 1.2 + Math.random() * 1.3, hub: hub });
    }
  }
  function step(dt) {
    for (var i = 0; i < nodes.length; i++) {
      var a = nodes[i];
      a.x += a.vx * dt * .06; a.y += a.vy * dt * .06;
      if (a.x < -20) a.x = W + 20; if (a.x > W + 20) a.x = -20;
      if (a.y < -20) a.y = H + 20; if (a.y > H + 20) a.y = -20;
      if (mouse.on) {
        var dx = mouse.x - a.x, dy = mouse.y - a.y, d = Math.sqrt(dx * dx + dy * dy);
        if (d < 190 && d > 1) { a.x += dx / d * dt * .012 * (1 - d / 190) * 6; a.y += dy / d * dt * .012 * (1 - d / 190) * 6; }
      }
    }
  }
  function draw(t) {
    ctx.clearRect(0, 0, W, H);
    var i, j, a, b, d, edges = [];
    ctx.lineWidth = 1;
    for (i = 0; i < nodes.length; i++) {
      a = nodes[i];
      for (j = i + 1; j < nodes.length; j++) {
        b = nodes[j]; var dx = a.x - b.x, dy = a.y - b.y; d = dx * dx + dy * dy;
        if (d < LINK * LINK) {
          d = Math.sqrt(d); ctx.strokeStyle = 'rgba(' + BRASS + ',' + ((1 - d / LINK) * .3).toFixed(3) + ')';
          ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
          edges.push([a, b]);
        }
      }
    }
    // reaching toward the cursor
    if (mouse.on) {
      for (i = 0; i < nodes.length; i++) {
        a = nodes[i]; var mx = mouse.x - a.x, my = mouse.y - a.y, md = Math.sqrt(mx * mx + my * my);
        if (md < 170) { ctx.strokeStyle = 'rgba(' + BRASS + ',' + ((1 - md / 170) * .65).toFixed(3) + ')'; ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(mouse.x, mouse.y); ctx.stroke(); }
      }
    }
    // nodes
    for (i = 0; i < nodes.length; i++) {
      a = nodes[i];
      ctx.fillStyle = 'rgba(' + BRASS + ',' + (a.hub ? .95 : .55) + ')';
      ctx.beginPath(); ctx.arc(a.x, a.y, a.r, 0, 6.2832); ctx.fill();
      if (a.hub) { ctx.strokeStyle = 'rgba(' + BRASS + ',.35)'; ctx.beginPath(); ctx.arc(a.x, a.y, a.r + 5 + Math.sin(t / 700 + a.x) * 1.5, 0, 6.2832); ctx.stroke(); }
    }
    // pulses travelling along links: work moving through the system
    for (i = pulses.length - 1; i >= 0; i--) {
      var p = pulses[i]; p.t += 0.012; if (p.t >= 1) { pulses.splice(i, 1); continue; }
      var x = p.a.x + (p.b.x - p.a.x) * p.t, y = p.a.y + (p.b.y - p.a.y) * p.t;
      var g = ctx.createRadialGradient(x, y, 0, x, y, 9); g.addColorStop(0, 'rgba(255,236,190,.95)'); g.addColorStop(1, 'rgba(' + BRASS + ',0)');
      ctx.fillStyle = g; ctx.beginPath(); ctx.arc(x, y, 9, 0, 6.2832); ctx.fill();
    }
    if (t > nextPulse && edges.length) { var e = edges[(Math.random() * edges.length) | 0]; pulses.push({ a: e[0], b: e[1], t: 0 }); nextPulse = t + 260 + Math.random() * 420; }
  }
  function loop(t) {
    if (!running) return;
    var dt = Math.min(48, t - last || 16); last = t; step(dt); draw(t); requestAnimationFrame(loop);
  }
  function start() { if (running || reduce || !visible || document.hidden) return; running = true; last = 0; requestAnimationFrame(loop); }
  function stop() { running = false; }
  size(); draw(0);
  window.addEventListener('klg:gl', function () { stop(); reduce = true; });
  if (reduce) return;
  hero.addEventListener('pointermove', function (e) { var r = hero.getBoundingClientRect(); mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top; mouse.on = e.pointerType !== 'touch'; });
  hero.addEventListener('pointerleave', function () { mouse.on = false; });
  var rt; window.addEventListener('resize', function () { clearTimeout(rt); rt = setTimeout(function () { size(); if (!running) draw(0); }, 150); });
  document.addEventListener('visibilitychange', function () { document.hidden ? stop() : start(); });
  if ('IntersectionObserver' in window) new IntersectionObserver(function (e) { visible = e[0].isIntersecting; visible ? start() : stop(); }).observe(hero);
  start();
})();

// ---- Voice demo ----
(function () {
  var btn = document.getElementById('voicePlay'); if (!btn) return;
  var call = document.querySelector('.call'), items = [].slice.call(document.querySelectorAll('#transcript li'));
  var bars = [].slice.call(document.querySelectorAll('#wave i')), state = document.getElementById('callState');
  var note = document.getElementById('voiceNote'), label = btn.querySelector('span');
  var synth = window.speechSynthesis, playing = false, token = 0, raf = 0, level = 0, who = 'agent';
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!synth) note.textContent = 'Your browser can’t speak aloud, so the call will play as text.';

  function voices() { var v = synth ? synth.getVoices().filter(function (x) { return /^en/i.test(x.lang); }) : []; return v; }
  function pick(role) { var v = voices(); if (!v.length) return null; return role === 'agent' ? v[0] : (v[1] || v[0]); }
  function animate() {
    bars.forEach(function (b, i) {
      var target = playing ? 4 + Math.abs(Math.sin(performance.now() / (120 + i * 9) + i)) * 26 * level : 4;
      b.style.height = target.toFixed(1) + 'px'; b.style.opacity = playing ? .9 : .5;
      b.style.background = who === 'agent' ? 'var(--brass)' : 'var(--mist)';
    });
    if (playing) raf = requestAnimationFrame(animate);
  }
  function reset() { items.forEach(function (li) { li.classList.remove('on', 'done'); }); call.classList.remove('live', 'finished'); state.textContent = 'Ready'; bars.forEach(function (b) { b.style.height = '4px'; }); }
  function finish(ok) { playing = false; level = 0; btn.setAttribute('aria-pressed', 'false'); label.textContent = ok ? 'Play it again' : 'Play the example call'; call.classList.remove('live'); if (ok) { call.classList.add('finished'); state.textContent = 'Call complete'; items.forEach(function (li) { li.classList.remove('on'); li.classList.add('done'); }); } else { reset(); } cancelAnimationFrame(raf); animate(); }
  function speak(li, my) {
    return new Promise(function (res) {
      var text = li.querySelector('span').textContent, done = false;
      function end() { if (!done) { done = true; res(); } }
      who = li.dataset.who; level = who === 'agent' ? 1 : .7;
      if (!synth) { setTimeout(end, 1200 + text.length * 45); return; }
      var u = new SpeechSynthesisUtterance(text); var v = pick(who); if (v) u.voice = v;
      u.rate = who === 'agent' ? 1 : .96; u.pitch = who === 'agent' ? 1 : .8;
      u.onend = end; u.onerror = end; synth.speak(u);
      setTimeout(end, 2500 + text.length * 90); // safety net
    });
  }
  async function run() {
    var my = ++token; playing = true; reset(); call.classList.add('live'); state.textContent = 'Live'; btn.setAttribute('aria-pressed', 'true'); label.textContent = 'Stop'; animate();
    for (var i = 0; i < items.length; i++) {
      if (my !== token) return;
      items[i].classList.add('on'); await speak(items[i], my);
      if (my !== token) return; items[i].classList.remove('on'); items[i].classList.add('done'); await new Promise(function (r) { setTimeout(r, 380); });
    }
    if (my === token) finish(true);
  }
  btn.addEventListener('click', function () {
    if (playing) { token++; if (synth) synth.cancel(); finish(false); return; }
    if (synth) { synth.cancel(); synth.getVoices(); }
    run();
  });
  if (synth && synth.addEventListener) synth.addEventListener('voiceschanged', function () {});
})();

// ---- Hours calculator ----
(function () {
  var f = document.getElementById('calc'); if (!f) return;
  var $ = function (id) { return document.getElementById(id); };
  var ins = ['staff', 'hours', 'rate', 'pct'].map(function (k) { return $('c-' + k); });
  var fmt = new Intl.NumberFormat('en-US'), cur = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });
  var shown = { h: 0, m: 0 }, raf = 0;
  function paint(h, m) { $('r-hours').textContent = fmt.format(Math.round(h)); $('r-money').textContent = cur.format(Math.round(m)); }
  function update(first) {
    var s = +$('c-staff').value, hr = +$('c-hours').value, rate = +$('c-rate').value, pct = +$('c-pct').value / 100;
    $('o-staff').textContent = s; $('o-hours').textContent = hr; $('o-rate').textContent = '$' + rate; $('o-pct').textContent = Math.round(pct * 100) + '%';
    ins.forEach(function (i) { i.style.setProperty('--p', ((i.value - i.min) / (i.max - i.min) * 100) + '%'); });
    var H = s * hr * 52 * pct, M = H * rate;
    $('r-weeks').textContent = Math.max(0, Math.round(H / 40));
    cancelAnimationFrame(raf);
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { paint(H, M); shown = { h: H, m: M }; return; }
    var from = { h: shown.h, m: shown.m }, t0 = performance.now();
    (function tick(t) { var k = Math.min(1, (t - t0) / 450), e = 1 - Math.pow(1 - k, 3); shown = { h: from.h + (H - from.h) * e, m: from.m + (M - from.m) * e }; paint(shown.h, shown.m); if (k < 1) raf = requestAnimationFrame(tick); })(t0);
  }
  ins.forEach(function (i) { i.addEventListener('input', update); });
  update();
})();
