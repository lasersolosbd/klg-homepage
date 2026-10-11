/* Kind Logic Group: 3D hero.
   Dependency-free WebGL: a lattice of ~400 nodes on a sphere, joined to their nearest
   neighbours, with pulses of "work" travelling the links. Loaded after first paint.
   Falls back silently to the 2D canvas network if WebGL is unavailable. */
(function () {
  var hero = document.querySelector('.hero'), old = document.getElementById('net');
  if (!hero) return;
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var coarse = window.matchMedia('(pointer: coarse)').matches;

  function boot() {
    var cv = document.createElement('canvas');
    cv.className = 'net gl'; cv.setAttribute('aria-hidden', 'true');
    var gl = cv.getContext('webgl', { alpha: true, premultipliedAlpha: true, antialias: false, powerPreference: 'low-power' });
    if (!gl) return;

    /* ---------- geometry ---------- */
    var N = (coarse || window.innerWidth < 700) ? 230 : 420, K = 3, i, j;
    var P = [], seed = [];
    var ga = Math.PI * (3 - Math.sqrt(5));
    for (i = 0; i < N; i++) {
      var y = 1 - (i / (N - 1)) * 2, r = Math.sqrt(1 - y * y), th = ga * i;
      var jit = 1 + (Math.random() - .5) * .07;
      P.push([Math.cos(th) * r * jit, y * jit, Math.sin(th) * r * jit]); seed.push(Math.random());
    }
    var seen = {}, edges = [];
    for (i = 0; i < N; i++) {
      var ds = [];
      for (j = 0; j < N; j++) if (j !== i) { var dx = P[i][0] - P[j][0], dy = P[i][1] - P[j][1], dz = P[i][2] - P[j][2]; ds.push([dx * dx + dy * dy + dz * dz, j]); }
      ds.sort(function (a, b) { return a[0] - b[0]; });
      for (var k = 0; k < K; k++) { var a = Math.min(i, ds[k][1]), b = Math.max(i, ds[k][1]), key = a * 4096 + b; if (!seen[key]) { seen[key] = 1; edges.push([a, b]); } }
    }
    // line buffer: pos(3) seed(1) t(1) phase(1) pulse(1)
    var L = [];
    function seg(p0, s0, p1, s1, phase, pulse) {
      L.push(p0[0], p0[1], p0[2], s0, 0, phase, pulse, p1[0], p1[1], p1[2], s1, 1, phase, pulse);
    }
    edges.forEach(function (e) { seg(P[e[0]], seed[e[0]], P[e[1]], seed[e[1]], Math.random(), Math.random() < .22 ? 1 : 0); });
    // two tilted orbit rings
    [[1.38, .5, 0], [1.62, -.35, .6]].forEach(function (rg) {
      var M = 96, pts = [], c, s, tx = rg[1], tz = rg[2];
      for (i = 0; i < M; i++) { var an = i / M * Math.PI * 2; var x = Math.cos(an) * rg[0], z = Math.sin(an) * rg[0], yy = 0;
        var y1 = yy * Math.cos(tx) - z * Math.sin(tx), z1 = yy * Math.sin(tx) + z * Math.cos(tx);
        var x2 = x * Math.cos(tz) - y1 * Math.sin(tz), y2 = x * Math.sin(tz) + y1 * Math.cos(tz); pts.push([x2, y2, z1]); }
      for (i = 0; i < M; i++) seg(pts[i], .5, pts[(i + 1) % M], .5, 0, 0);
    });
    var Pt = [];
    for (i = 0; i < N; i++) Pt.push(P[i][0], P[i][1], P[i][2], seed[i]);

    /* ---------- shaders ---------- */
    function sh(type, src) { var s = gl.createShader(type); gl.shaderSource(s, src); gl.compileShader(s); if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(s)); return s; }
    function prog(vs, fs) { var p = gl.createProgram(); gl.attachShader(p, sh(gl.VERTEX_SHADER, vs)); gl.attachShader(p, sh(gl.FRAGMENT_SHADER, fs)); gl.linkProgram(p); if (!gl.getProgramParameter(p, gl.LINK_STATUS)) throw new Error('link'); return p; }
    var common = 'uniform mat4 uMVP; uniform mediump float uTime; uniform mediump float uDist; vec3 breathe(vec3 p, float s){ return p * (1.0 + 0.035 * sin(uTime * 0.9 + s * 25.0)); }';
    var pointsP, linesP;
    try {
      pointsP = prog(
        'attribute vec4 aPS; uniform float uSize; varying float vA; varying float vS;' + common +
        'void main(){ vec4 c = uMVP * vec4(breathe(aPS.xyz, aPS.w), 1.0); gl_Position = c;' +
        'vA = smoothstep(uDist + 1.0, uDist - 1.0, c.w); vS = aPS.w; gl_PointSize = uSize * (uDist / c.w) * (0.7 + vS * vS * 2.4); }',
        'precision mediump float; varying float vA; varying float vS;' +
        'void main(){ float d = length(gl_PointCoord - 0.5); if (d > 0.5) discard; float g = smoothstep(0.5, 0.0, d); float core = pow(g, 3.0);' +
        'vec3 col = mix(vec3(0.82, 0.67, 0.38), vec3(1.0, 0.93, 0.76), core); float a = (g * 0.55 + core * 0.6) * (0.35 + vA * 0.9);' +
        'gl_FragColor = vec4(col * a, a); }');
      linesP = prog(
        'attribute vec3 aPos; attribute vec4 aM; varying float vA; varying float vT; varying float vPh; varying float vPu;' + common +
        'void main(){ vec4 c = uMVP * vec4(breathe(aPos, aM.x), 1.0); gl_Position = c; vA = smoothstep(uDist + 1.1, uDist - 1.0, c.w); vT = aM.y; vPh = aM.z; vPu = aM.w; }',
        'precision mediump float; uniform float uTime; varying float vA; varying float vT; varying float vPh; varying float vPu;' +
        'void main(){ float h = fract(uTime * 0.28 + vPh); float pulse = vPu * smoothstep(0.16, 0.0, abs(vT - h));' +
        'float a = (0.10 + pulse * 0.9) * (0.25 + vA * 0.95); vec3 col = mix(vec3(0.82, 0.67, 0.38), vec3(1.0, 0.94, 0.78), pulse);' +
        'gl_FragColor = vec4(col * a, a); }');
    } catch (e) { return; }

    function buf(data) { var b = gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER, b); gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(data), gl.STATIC_DRAW); return b; }
    var ptBuf = buf(Pt), lnBuf = buf(L), lnCount = L.length / 7;
    var loc = {
      aPS: gl.getAttribLocation(pointsP, 'aPS'), uMVPp: gl.getUniformLocation(pointsP, 'uMVP'), uTimep: gl.getUniformLocation(pointsP, 'uTime'), uDistp: gl.getUniformLocation(pointsP, 'uDist'), uSize: gl.getUniformLocation(pointsP, 'uSize'),
      aPos: gl.getAttribLocation(linesP, 'aPos'), aM: gl.getAttribLocation(linesP, 'aM'), uMVPl: gl.getUniformLocation(linesP, 'uMVP'), uTimel: gl.getUniformLocation(linesP, 'uTime'), uDistl: gl.getUniformLocation(linesP, 'uDist')
    };

    /* ---------- math ---------- */
    function mul(a, b) { var o = new Float32Array(16); for (var c = 0; c < 4; c++) for (var r = 0; r < 4; r++) { var s = 0; for (var k = 0; k < 4; k++) s += a[k * 4 + r] * b[c * 4 + k]; o[c * 4 + r] = s; } return o; }
    function persp(fov, asp, n, f, ox, oy) { var t = 1 / Math.tan(fov / 2), m = new Float32Array(16); m[0] = t / asp; m[5] = t; m[10] = (f + n) / (n - f); m[11] = -1; m[14] = 2 * f * n / (n - f); m[8] = -ox; m[9] = -oy; return m; }
    function rotY(a) { var c = Math.cos(a), s = Math.sin(a); return new Float32Array([c, 0, -s, 0, 0, 1, 0, 0, s, 0, c, 0, 0, 0, 0, 1]); }
    function rotX(a) { var c = Math.cos(a), s = Math.sin(a); return new Float32Array([1, 0, 0, 0, 0, c, s, 0, 0, -s, c, 0, 0, 0, 0, 1]); }
    function trans(z) { return new Float32Array([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, z, 1]); }

    /* ---------- state / loop ---------- */
    var W = 0, H = 0, dpr = 1, ry = 0.6, rx = 0.25, tx = 0, ty = 0, mx = 0, my = 0, running = false, visible = true, last = 0, time = 0;
    function size() {
      var r = hero.getBoundingClientRect(); dpr = Math.min(window.devicePixelRatio || 1, 1.75);
      W = Math.max(1, r.width); H = Math.max(1, r.height); cv.width = Math.round(W * dpr); cv.height = Math.round(H * dpr); gl.viewport(0, 0, cv.width, cv.height);
    }
    function render() {
      var asp = W / H, fov = 0.61, th = Math.tan(fov / 2), dist, ox = 0, oy = 0, R;
      if (asp >= 1.15) { dist = 4.3; ox = 0.56; R = (H / 2) / (dist * th); }          // wide: globe sits on the right
      else {                                                                          // tall: globe sits in the clear space above the headline
        var pad = parseFloat(getComputedStyle(hero.querySelector('.hero-grid')).paddingTop) || 260;
        R = Math.min(W * 0.44, pad * 0.5); dist = (H / 2) / (R * th); oy = 1 - 2 * (pad * 0.52) / H;
      }
      var mvp = mul(persp(fov, asp, .1, 30, ox, oy), mul(trans(-dist), mul(rotX(rx), rotY(ry))));
      gl.clearColor(0, 0, 0, 0); gl.clear(gl.COLOR_BUFFER_BIT); gl.enable(gl.BLEND); gl.blendFunc(gl.ONE, gl.ONE);
      gl.useProgram(linesP); gl.uniformMatrix4fv(loc.uMVPl, false, mvp); gl.uniform1f(loc.uTimel, time); gl.uniform1f(loc.uDistl, dist);
      gl.bindBuffer(gl.ARRAY_BUFFER, lnBuf); gl.enableVertexAttribArray(loc.aPos); gl.vertexAttribPointer(loc.aPos, 3, gl.FLOAT, false, 28, 0);
      gl.enableVertexAttribArray(loc.aM); gl.vertexAttribPointer(loc.aM, 4, gl.FLOAT, false, 28, 12); gl.drawArrays(gl.LINES, 0, lnCount);
      gl.useProgram(pointsP); gl.uniformMatrix4fv(loc.uMVPp, false, mvp); gl.uniform1f(loc.uTimep, time); gl.uniform1f(loc.uDistp, dist); gl.uniform1f(loc.uSize, Math.min(10, Math.max(4.5, R / 45)) * dpr);
      gl.bindBuffer(gl.ARRAY_BUFFER, ptBuf); gl.enableVertexAttribArray(loc.aPS); gl.vertexAttribPointer(loc.aPS, 4, gl.FLOAT, false, 16, 0); gl.disableVertexAttribArray(loc.aM);
      gl.drawArrays(gl.POINTS, 0, N);
    }
    function loop(t) {
      if (!running) return;
      var dt = Math.min(50, t - last || 16); last = t; time += dt / 1000;
      mx += (tx - mx) * .06; my += (ty - my) * .06;
      ry += dt * 0.00007; rx = 0.22 + my * .35; ry += (mx * .0018);
      render(); requestAnimationFrame(loop);
    }
    function start() { if (running || reduce || !visible || document.hidden) return; running = true; last = 0; requestAnimationFrame(loop); }
    function stop() { running = false; }

    hero.insertBefore(cv, hero.firstChild);
    size(); render();
    hero.classList.add('gl-on'); window.dispatchEvent(new Event('klg:gl'));
    if (reduce) return;
    hero.addEventListener('pointermove', function (e) { if (e.pointerType === 'touch') return; var r = hero.getBoundingClientRect(); tx = ((e.clientX - r.left) / r.width - .5) * 2; ty = ((e.clientY - r.top) / r.height - .5) * 2; });
    var rt; window.addEventListener('resize', function () { clearTimeout(rt); rt = setTimeout(function () { size(); if (!running) render(); }, 150); });
    document.addEventListener('visibilitychange', function () { document.hidden ? stop() : start(); });
    if ('IntersectionObserver' in window) new IntersectionObserver(function (e) { visible = e[0].isIntersecting; visible ? start() : stop(); }).observe(hero);
    cv.addEventListener('webglcontextlost', function (e) { e.preventDefault(); stop(); cv.remove(); hero.classList.remove('gl-on'); });
    start();
  }
  // after first paint, when the browser is idle
  var go = function () { try { boot(); } catch (e) { /* keep 2D fallback */ } };
  if ('requestIdleCallback' in window) requestIdleCallback(go, { timeout: 1500 }); else setTimeout(go, 400);
})();
