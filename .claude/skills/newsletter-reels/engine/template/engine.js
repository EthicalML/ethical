// engine.js - the z-motion-reel film engine. Generic: film.js supplies the palette, the scenes and the words, then calls reel({...}).
// render(t, S) is a PURE function of film time t (seconds; film time = song time): no Date, no Math.random, every frame reproducible.
// The idiom for every animated value: ease(prog(u, t0, t1)) * (1 - E.inExpo(prog(u, out, out + .3))) - one line does in and out.
// Everything lives inside this function; only the API listed at the bottom (and in API.md) reaches window, so a film can
// declare any name it likes without colliding with the engine's internals.
(() => {
'use strict';
// format: beats.json "format" (inlined by reel.py as window.FORMAT): "1080x1350" (4:5 feed), "1080x1920" (9:16), "1080x1080", "1920x1080".
const FORMAT = window.FORMAT || '1920x1080', [W, H] = FORMAT.split('x').map(Number);
const FPS = window.REEL_FPS || (W > H ? 60 : 30), TAU = Math.PI * 2, CX = W / 2, CY = H / 2;
const HEAD = "'Helvetica Neue',Helvetica,Arial,sans-serif", MONO = "Menlo,'SF Mono',monospace";
const MUSIC = window.MUSIC || null;                  // music.json, inlined by reel.py: {bpm, beat, bar, beats_per_bar, dur, scenes, hits, drop_t, end_hit_t}
let BPM = MUSIC ? MUSIC.bpm : 120, BEAT = 60 / BPM;          // one clock: film time = song time
const BPB = (MUSIC && MUSIC.beats_per_bar) || 4;              // beats per bar (the score's meter), for the HUD
const b = n => n * BEAT;                                       // beats -> seconds: write every time as b(n)
// stag(i, step): the i-th time of a stagger, step in beats snapped to the eighth-note grid (.5 beat), so pops stay on it
const stag = (i, step = .5) => b(i * Math.max(.5, Math.round(step * 2) / 2));
const C = { ink: '#0e0e12', paper: '#f4f3ef', accent: '#ff5a1e', grey: '#8b8b8b', data: '#3ad7ff' };   // film: Object.assign(C, {...})
const MIX = { music: 1, sfx: 1, master: .8 };        // one mix, used by the live player AND the MP4 export
// layout zones per format. Kicker and headline sit top-left, the body between body.top and body.bottom, footnotes on one line,
// captions in the cap band, and nothing but the HUD outside hud.top / hud.bottom. plat: the platform's own safe zone (app chrome).
const SAFES = {
  '1920x1080': { l: 140, r: 1780, kicker: 150, title: 250, body: { top: 360, bottom: 930 }, foot: 994, cap: { y: 900, h: 64 }, hud: { top: 80, bottom: 1020, side: 48 }, plat: { l: 0, r: 1920, top: 0, bottom: 1080 } },
  // 4:5 feed: 64 px sides, the bottom ~180 px left for the feed's caption band
  '1080x1350': { l: 64, r: 1016, kicker: 150, title: 290, body: { top: 360, bottom: 1000 }, foot: 1150, cap: { y: 1060, h: 72 }, hud: { top: 60, bottom: 1170, side: 64 }, plat: { l: 0, r: 1080, top: 0, bottom: 1170 } },
  // 9:16 reels/shorts: the platform's safe zone is y 360-1420, with 120 px clear on the right
  '1080x1920': { l: 72, r: 960, kicker: 420, title: 560, body: { top: 620, bottom: 1240 }, foot: 1400, cap: { y: 1300, h: 72 }, hud: { top: 360, bottom: 1420, side: 72 }, plat: { l: 0, r: 960, top: 360, bottom: 1420 } },
  '1080x1080': { l: 72, r: 1008, kicker: 130, title: 260, body: { top: 330, bottom: 860 }, foot: 1030, cap: { y: 920, h: 72 }, hud: { top: 60, bottom: 1040, side: 60 }, plat: { l: 0, r: 1080, top: 0, bottom: 1080 } },
};
const SAFE = SAFES[FORMAT] || SAFES['1920x1080'];

// ---------- maths
const clamp = (x, a = 0, b = 1) => Math.min(b, Math.max(a, x));
const lerp = (a, b, t) => a + (b - a) * t;
const prog = (t, a, b) => clamp((t - a) / (b - a));                        // 0..1 across the window [a, b]
const pulse = (u, t0, rate = 9) => u >= t0 ? Math.exp(-(u - t0) * rate) : 0;  // a decaying flash from t0
const hash = n => { const x = Math.sin(n * 127.1 + 311.7) * 43758.5453; return x - Math.floor(x); };   // the only randomness
// pick: exactly `count` distinct indices out of 0..n-1, chosen by hash (deterministic), ascending. Use it, not hash(i) > x.
const pick = (n, count, seed = 0) => Array.from({ length: n }, (_, i) => [hash(i * 7.31 + seed * 13.7 + .5), i]).sort((a, z) => a[0] - z[0]).slice(0, Math.min(n, count)).map(q => q[1]).sort((a, z) => a - z);
const E = {
  linear: x => x,
  outExpo: x => x >= 1 ? 1 : 1 - Math.pow(2, -10 * x),        // entrances: snappy settle
  inExpo: x => x <= 0 ? 0 : Math.pow(2, 10 * x - 10),          // exits
  inOutExpo: x => x <= 0 ? 0 : x >= 1 ? 1 : x < .5 ? Math.pow(2, 20 * x - 10) / 2 : (2 - Math.pow(2, -20 * x + 10)) / 2,   // camera, stretches, flips
  outBack: x => { const c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * Math.pow(x - 1, 3) + c1 * Math.pow(x - 1, 2); },   // pops, snaps
  inOutCubic: x => x < .5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2,   // flights
  outCubic: x => 1 - Math.pow(1 - x, 3),                                        // counters
  inOutSine: x => -(Math.cos(Math.PI * x) - 1) / 2,                             // sheens, curve heads
  outBounce: x => { const n = 7.5625, d = 2.75;
    if (x < 1 / d) return n * x * x; if (x < 2 / d) return n * (x -= 1.5 / d) * x + .75;
    if (x < 2.5 / d) return n * (x -= 2.25 / d) * x + .9375; return n * (x -= 2.625 / d) * x + .984375; },
};
const HX = {}; const hx = h => HX[h] || (HX[h] = [1, 3, 5].map(i => parseInt(h.slice(i, i + 2), 16)));
const rgba = (h, a) => { const v = hx(h); return `rgba(${v[0]},${v[1]},${v[2]},${a})`; };
const mix = (a, b, t, al = 1) => { const A = hx(a), B = hx(b), k = clamp(t); return `rgba(${Math.round(lerp(A[0], B[0], k))},${Math.round(lerp(A[1], B[1], k))},${Math.round(lerp(A[2], B[2], k))},${al})`; };
const MQ = new Map(); const mixQ = (a, b, t) => { const q = Math.round(clamp(t) * 40), k = a + b + q; let v = MQ.get(k); if (!v) MQ.set(k, v = mix(a, b, q / 40)); return v; };   // memoised, for particles

// ---------- cue hook: primitives announce what they reveal. A no-op unless cues() is sweeping, so render() stays pure.
let CUE = null, CUE_S = 0, CUE_I = 0, CUE_BG = null;
const cue = (k, t0, o) => { if (CUE) CUE(k, CUE_S + t0, o || {}); };      // t0 is scene-local, like u
const pop = (u, a, b, o) => (cue('pop', a, o), E.outBack(prog(u, a, b)));   // outBack pop-in that also cues a pitched pop
// quiet(fn): run fn with cues switched off, to draw another scene (the next one, tiny, for a zoom or a preview) inside this
// one without its sounds landing at this scene's times, or its stage() counting as a colour flip. Returns what fn returns.
const quiet = fn => { const s = CUE, bgc = CUE_BG; CUE = null; try { return fn(); } finally { CUE = s; CUE_BG = bgc; } };

// ---------- canvas
// ?cpu pins every canvas to CPU rasterisation: Chrome otherwise moves a canvas between GPU and CPU after pixel readbacks,
// which changes anti-aliasing, so pixel comparisons (reel.py check) need it. The player and the export run on the GPU.
const CPU = location.search.includes('cpu'), ctx2d = cv => cv.getContext('2d', CPU ? { willReadFrequently: true } : {});
const out = document.getElementById('c'); out.width = W; out.height = H; document.documentElement.style.setProperty('--ar', String(W / H));
const O = ctx2d(out);
const buf = document.createElement('canvas'); buf.width = W; buf.height = H; const B = ctx2d(buf);
function bg(c, col) { c.fillStyle = col; c.fillRect(-400, -400, W + 800, H + 800); }
function circle(c, x, y, r) { c.beginPath(); c.arc(x, y, Math.max(0, r), 0, TAU); }
function font(c, size, weight = 800, fam = HEAD) { c.font = `${weight} ${size}px ${fam}`; }
// the colour field: ink by default, flipped to the accent for a beat on a hit. Scenes read colours from P, never from C.
const pal = f => f ? { bg: C.accent, fg: C.ink, acc: C.paper, dim: rgba(C.ink, .62), line: rgba(C.ink, .25), flip: 1 }
  : { bg: C.ink, fg: C.paper, acc: C.accent, dim: rgba(C.paper, .62), line: rgba(C.paper, .18), flip: 0 };
// stage: the colour field. Opt-in: a number n adds a huge outlined scene numeral that slides in from u = 0 and drifts,
// which moves at every scene start (a visible jump), so leave it off unless the direction wants it.
function stage(c, P, n = null, u = 0) {
  CUE_BG = P.bg; bg(c, P.bg); if (n == null) return;
  c.save(); font(c, 520); c.textAlign = 'right'; c.textBaseline = 'alphabetic'; c.lineWidth = 2.5;
  c.strokeStyle = P.flip ? rgba(C.ink, .16) : rgba(C.paper, .06);
  const o = E.outExpo(prog(u, 0, .9)); c.strokeText(String(n).padStart(2, '0'), W - 60 + (1 - o) * 300 - u * 8, H - 70); c.restore();
}

// ---------- kinetic type. Every text primitive is (c, str, x, y, u, t0, {size, col, align, out, ...}): u is scene-local time,
// t0 when it starts, out when it leaves. Each cues its own sound, so authoring type authors the SFX too.
const MC = document.createElement('canvas').getContext('2d');
// measure: the width of str at size (weight w, family fam), exactly as slam/chars lay it out
function measure(str, size, w = 800, fam = HEAD) { font(MC, size, w, fam); let t = 0; for (const k of str) t += MC.measureText(k).width; return t; }
// slam: per-letter masked rise in, masked rise out at `out`. Returns the line width (for underlines, pills, sheens).
function slam(c, str, x, y, u, t0, o = {}) {
  const { size = 96, col = C.paper, align = 'left', w = 800, st = .026, dur = .55, out = 1e9, fam = HEAD } = o;
  cue('slam', t0, { id: `${x},${y}`, s: str, n: str.length, size, st });
  font(c, size, w, fam); c.letterSpacing = '0px';
  const ch = [...str], ws = ch.map(k => c.measureText(k).width), tot = ws.reduce((a, q) => a + q, 0);
  if (u < t0) return tot;
  let px = align === 'center' ? x - tot / 2 : align === 'right' ? x - tot : x;
  c.save(); c.beginPath(); c.rect(px - size * .4, y - size * .96, tot + size * .8, size * 1.24); c.clip();
  c.fillStyle = col; c.textAlign = 'left'; c.textBaseline = 'alphabetic';
  ch.forEach((k, i) => {
    const p = E.outExpo(prog(u, t0 + i * st, t0 + i * st + dur)), q = E.inExpo(prog(u, out + i * st * .5, out + i * st * .5 + .32));
    if (p > 0 && q < 1) { c.save(); c.translate(px, y + (1 - p) * size * 1.08 - q * size * 1.15); c.rotate((1 - p) * .16); c.fillText(k, 0, 0); c.restore(); }
    px += ws[i];
  });
  c.restore(); return tot;
}
// typed: mono label, 16 ms per char, block cursor while typing. Kickers, labels, sources.
function typed(c, str, x, y, u, t0, o = {}) {
  const { size = 18, col = C.paper, align = 'left', out = 1e9, rate = .016, sp = 3, w = 600 } = o;
  cue('type', t0, { id: `${x},${y}`, s: str, n: str.length, rate });
  const n = Math.floor(clamp((u - t0) / rate, 0, str.length)); if (!n || u > out + .25) return;
  c.save(); c.globalAlpha *= 1 - prog(u, out, out + .25);
  font(c, size, w, MONO); c.letterSpacing = `${sp}px`; c.fillStyle = col; c.textAlign = align; c.textBaseline = 'alphabetic';
  c.fillText(str.slice(0, n) + (n < str.length ? '▌' : ''), x, y); c.letterSpacing = '0px'; c.restore();
}
// label: text drawn as-is, no animation and no cue: axis labels and anything that must stay put across scenes.
// mono (default) matches typed() exactly, so a typed label can carry on as a label in the next scene.
function label(c, str, x, y, o = {}) {
  const { size = 18, col = C.paper, align = 'left', mono = true, w = mono ? 600 : 800, sp = mono ? 3 : 0 } = o;
  c.save(); font(c, size, w, mono ? MONO : HEAD); c.letterSpacing = `${sp}px`; c.fillStyle = col; c.textAlign = align; c.textBaseline = 'alphabetic';
  c.fillText(str, x, y); c.letterSpacing = '0px'; c.restore();
}
// para: a quiet line of prose - fade + 26px rise in, 20px up out.
function para(c, str, x, y, u, t0, o = {}) {
  const { size = 30, col = rgba(C.paper, .78), out = 1e9, w = 400, align = 'left', fam = HEAD } = o;
  cue('para', t0, { id: `${x},${y}`, s: str, size });
  const p = E.outExpo(prog(u, t0, t0 + .6)), q = E.inExpo(prog(u, out, out + .3)); if (p <= 0 || q >= 1) return;
  c.save(); c.globalAlpha *= p * (1 - q); font(c, size, w, fam); c.fillStyle = col; c.textAlign = align; c.textBaseline = 'alphabetic';
  c.fillText(str, x, y + (1 - p) * 26 - q * 20); c.restore();
}
// foot: sources and footnotes, always on the SAFE.foot line. Keep one on screen >= 3 s. Pass col: P.dim on a flipped field.
function foot(c, str, u, t0, o = {}) { para(c, str, SAFE.l, SAFE.foot, u, t0, { size: 15, col: rgba(C.paper, .58), fam: MONO, w: 500, ...o }); }
// caption: a burned-in sound-off caption, one short line per beat, centred in the fixed SAFE.cap band on a high-contrast plate.
// Size >= 48 px. Plate in at t0 (outExpo), out at `out`. It registers only a soft 'para' cue (pass cue: false for none).
function caption(c, str, u, t0, o = {}) {
  const { size = 52, out = 1e9, fg = C.ink, bg: bgc = C.paper, w = 800, cue: q = true } = o, sz = Math.max(48, size);
  if (q) cue('para', t0, { id: `cap,${SAFE.cap.y}`, s: str, size: 20 });
  const p = E.outExpo(prog(u, t0, t0 + .35)), z = E.inExpo(prog(u, out, out + .25)); if (p <= 0 || z >= 1) return;
  c.save(); c.globalAlpha *= p * (1 - z); font(c, sz, w); c.letterSpacing = '0px';
  const maxw = SAFE.r - SAFE.l, tw = Math.min(maxw, c.measureText(str).width + sz * 1.0), h = Math.max(SAFE.cap.h, sz * 1.45);
  const x = (SAFE.l + SAFE.r) / 2, y = SAFE.cap.y + (1 - p) * 16;
  c.fillStyle = bgc; c.beginPath(); c.roundRect(x - tw / 2, y - h / 2, tw, h, 10); c.fill();
  c.fillStyle = fg; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText(str, x, y + sz * .04, maxw - sz * .6); c.restore();
}
// pill: a capsule label scaled by sc (use pop() for sc, which cues the sound). Returns its width.
function pill(c, str, x, y, sc, o = {}) {
  const { size = 20, bg: bgc = C.accent, fg = C.ink, align = 'center', stroke = false, fam = HEAD, w = 700 } = o; if (sc <= 0) return 0;
  font(c, size, w, fam); c.letterSpacing = fam === MONO ? '2px' : '0px';
  const tw = c.measureText(str).width + size * 1.5, h = size * 2.1, x0 = align === 'center' ? -tw / 2 : align === 'right' ? -tw : 0;
  c.save(); c.translate(x, y); c.scale(sc, sc); c.beginPath(); c.roundRect(x0, -h / 2, tw, h, h / 2);
  if (stroke) { c.strokeStyle = bgc; c.lineWidth = 2.5; c.stroke(); } else { c.fillStyle = bgc; c.fill(); }
  c.fillStyle = stroke ? bgc : fg; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText(str, x0 + tw / 2, 1); c.restore(); c.letterSpacing = '0px'; return tw;
}
// counter: counts 0 -> to over d seconds from t0, with floor, so the stated value appears exactly at t0 + d (put that on a beat)
// and it never flashes a value that is not on the way there. Cues one tick per displayed change.
function counter(c, to, x, y, u, t0, o = {}) {
  const { size = 120, d = 1, col = C.paper, align = 'left', pre = '', suf = '', ease = 'outCubic', w = 800, out = 1e9 } = o;
  cue('count', t0, { s: pre + to + suf, x: x | 0, y: y | 0, to, d, ease });   // keyed by value: x, y may move
  if (u < t0 || u > out + .3) return;
  const n = Math.floor(to * E[ease](prog(u, t0, t0 + d)) + 1e-9);
  c.save(); c.globalAlpha *= prog(u, t0, t0 + .12) * (1 - E.inExpo(prog(u, out, out + .3)));
  font(c, size, w); c.fillStyle = col; c.textAlign = align; c.textBaseline = 'alphabetic'; c.fillText(pre + n.toLocaleString('en-US') + suf, x, y); c.restore();
}
// the per-character layout slam() uses, so an overlay (sheen) registers exactly on slammed type
function chars(c, str, x, y, size, col, w = 800) { font(c, size, w); c.fillStyle = col; c.textAlign = 'left'; c.textBaseline = 'alphabetic'; let px = x; for (const k of str) { c.fillText(k, px, y); px += c.measureText(k).width; } }
// sheen: a light band sweeping across held left-aligned type (x = its left edge). Anything held > 1 bar needs one.
function sheen(c, str, x, y, u, t0, o = {}) {
  const { size = 96, d = .6, col = C.paper, w = 800 } = o, x0 = o.x0 ?? x - 80, x1 = o.x1 ?? x + measure(str, size, w) + 160;
  cue('sheen', t0, { id: `${x},${y}`, s: str, d });
  const p = prog(u, t0, t0 + d); if (p <= 0 || p >= 1) return; const X = lerp(x0, x1, E.inOutSine(p)), h = size * .9;
  c.save(); c.beginPath(); c.moveTo(X - 40, y - h - 20); c.lineTo(X + 50, y - h - 20); c.lineTo(X - 30, y + 20); c.lineTo(X - 120, y + 20); c.closePath(); c.clip(); chars(c, str, x, y, size, col, w); c.restore();
}
// ringPulse: a ring bursting from r0 to r1 over d seconds. Put them on beats.
function ringPulse(c, x, y, u, t0, col, r0 = 12, r1 = 70, d = .6) {
  cue('ring', t0, { id: `${x | 0},${y | 0}`, r: r1 }); const p = prog(u, t0, t0 + d); if (p <= 0 || p >= 1) return;
  c.strokeStyle = rgba(col, 1 - p); c.lineWidth = lerp(4, .5, p); circle(c, x, y, lerp(r0, r1, E.outExpo(p))); c.stroke();
}
// polyline through fn(i / n) -> [x, y] for i in 0..n (curves, paths, chart lines)
function polyline(c, fn, n = 120) { c.beginPath(); for (let i = 0; i <= n; i++) { const [x, y] = fn(i / n); i ? c.lineTo(x, y) : c.moveTo(x, y); } }
const bz2 = (a, m, b, t) => { const q = 1 - t; return [q * q * a[0] + 2 * q * t * m[0] + t * t * b[0], q * q * a[1] + 2 * q * t * m[1] + t * t * b[1]]; };
const bz3 = (a, m1, m2, z, t) => { const q = 1 - t; return [0, 1].map(j => q * q * q * a[j] + 3 * q * q * t * m1[j] + 3 * q * t * t * m2[j] + t * t * t * z[j]); };

// ---------- radial shape morph: every shape is r(theta) sampled at NS angles, so anything morphs into anything.
const NS = 240;
function polyRadial(v, th) {                                 // distance from the origin to polygon v along angle th
  const dx = Math.cos(th), dy = Math.sin(th); let best = 9;
  for (let i = 0; i < v.length; i++) {
    const [ax, ay] = v[i], [bx, by] = v[(i + 1) % v.length], ex = bx - ax, ey = by - ay, den = dx * ey - dy * ex;
    if (Math.abs(den) < 1e-9) continue;
    const s = (ax * ey - ay * ex) / den, w = (ax * dy - ay * dx) / den;
    if (s > 0 && w >= -1e-6 && w <= 1 + 1e-6) best = Math.min(best, s);
  }
  return best;
}
const ngon = (n, rot = 0, s = 1) => Array.from({ length: n }, (_, i) => { const a = rot + i * TAU / n; return [Math.cos(a) * s, Math.sin(a) * s]; });
const radial = f => Float32Array.from({ length: NS }, (_, i) => f(i / NS * TAU));
const SHAPES = {
  circle: radial(() => 1),
  square: radial(th => polyRadial(ngon(4, Math.PI / 4, 1.25), th)),
  diamond: radial(th => polyRadial(ngon(4, 0, 1.3), th)),
  tri: radial(th => polyRadial(ngon(3, -Math.PI / 2, 1.45), th)),
  hex: radial(th => polyRadial(ngon(6, 0, 1.1), th)),
  star: radial(th => polyRadial(Array.from({ length: 10 }, (_, i) => { const a = -Math.PI / 2 + i * TAU / 10, r = i % 2 ? .55 : 1.3; return [Math.cos(a) * r, Math.sin(a) * r]; }), th)),
};
// morphPath: path of shape a morphing into shape b (names or r(theta) arrays), k 0..1, radius R, centred on x, y.
function morphPath(c, a, b, k, R, x = 0, y = 0, rot = 0) {
  const A = SHAPES[a] || a, Bs = SHAPES[b] || b; c.beginPath();
  for (let i = 0; i < NS; i++) { const th = i / NS * TAU, r = lerp(A[i], Bs[i], k) * R, X = x + Math.cos(th + rot) * r, Y = y + Math.sin(th + rot) * r; i ? c.lineTo(X, Y) : c.moveTo(X, Y); }
  c.closePath();
}

// ---------- glyph particles: n points inside a string's glyphs (sample once, at load), relative to its left end and baseline.
// Particles fly to these so a word or a numeral can be assembled from, and dissolved back into, a cloud. Shuffled, so streams cross.
function glyphPts(str, size, n, w = 800) {
  const cv = document.createElement('canvas'), x = cv.getContext('2d', { willReadFrequently: true }); font(x, size, w);
  const tw = Math.ceil(x.measureText(str).width) + 20, th = Math.ceil(size * 1.25), st = Math.max(2, Math.round(size / 70));
  cv.width = tw; cv.height = th; font(x, size, w); x.textBaseline = 'alphabetic'; x.fillStyle = '#fff'; x.fillText(str, 10, size);
  const d = x.getImageData(0, 0, tw, th).data, all = [];
  for (let y = 0; y < th; y += st) for (let X = 0; X < tw; X += st) if (d[(y * tw + X) * 4 + 3] > 150) all.push([X - 10, y - size]);
  const pts = Array.from({ length: n }, (_, i) => all[Math.floor(i * all.length / n)]);
  return { pts: pts.map((p, i) => [hash(i * 7.77 + str.length * 3.1 + size), p]).sort((a, b) => a[0] - b[0]).map(q => q[1]), w: tw - 20 };
}

// ---------- timeline, impacts and the compositor. reel({...}) at the end of film.js fills these in.
let SCENES = [], DUR = 10, IMP = [], BRAND = '', HUD = true;
// ?calm: no impacts, grain or HUD, so two frames differ only by what the scenes draw (reel.py check's cut and hold detectors)
const CALM = location.search.includes('calm');
function impact(t) { if (CALM) return 0; let k = 0; for (const [a, s] of IMP) if (t >= a) k = Math.max(k, s * Math.exp(-(t - a) * 9)); return k; }
const sceneAt = t => { let i = 0; for (let k = 0; k < SCENES.length; k++) if (t >= SCENES[k][0]) i = k; return i; };
function drawScene(c, t) {
  t = clamp(t, 0, DUR - 1e-4); const i = sceneAt(t), k = impact(t), f = Math.floor(t * FPS); CUE_S = SCENES[i][0]; CUE_I = i;
  c.save(); c.setTransform(1, 0, 0, 1, 0, 0); c.globalAlpha = 1; c.globalCompositeOperation = 'source-over'; c.setLineDash([]); c.letterSpacing = '0px'; c.lineCap = 'butt'; c.lineJoin = 'miter';
  c.translate((hash(f * 1.3) - .5) * 34 * k, (hash(f * 2.1 + 5) - .5) * 34 * k);                 // camera shake, seeded per frame
  const z = 1 + k * .022; c.translate(W / 2, H / 2); c.scale(z, z); c.translate(-W / 2, -H / 2);  // zoom punch
  SCENES[i][1](c, t - SCENES[i][0], t); c.restore(); return i;
}
// post: seeded grain, RGB split without pixel readback, vignette, difference-blended HUD
function mulberry32(a) { return () => { a |= 0; a = a + 0x6D2B79F5 | 0; let t = Math.imul(a ^ a >>> 15, 1 | a); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }
const rnd = mulberry32(2026);
const GP = Array.from({ length: 6 }, () => { const cv = document.createElement('canvas'); cv.width = cv.height = 256; const x = cv.getContext('2d'), im = x.createImageData(256, 256);
  for (let i = 0; i < im.data.length; i += 4) { const v = rnd() * 255; im.data[i] = im.data[i + 1] = im.data[i + 2] = v; im.data[i + 3] = 255; } x.putImageData(im, 0, 0); return O.createPattern(cv, 'repeat'); });
const NOGRAIN = CALM || location.search.includes('nograin');
const CRc = document.createElement('canvas'), CBc = document.createElement('canvas'); CRc.width = CBc.width = W; CRc.height = CBc.height = H;
const CRx = ctx2d(CRc), CBx = ctx2d(CBc);
function chroma(d) {                                          // red shifted right, green+blue left, summed on the GPU
  if (d < 1) return;
  for (const [x, col] of [[CRx, '#ff0000'], [CBx, '#00ffff']]) { x.globalCompositeOperation = 'copy'; x.drawImage(out, 0, 0); x.globalCompositeOperation = 'multiply'; x.fillStyle = col; x.fillRect(0, 0, W, H); }
  O.save(); O.globalCompositeOperation = 'copy'; O.drawImage(CBc, -d, 0); O.globalCompositeOperation = 'lighter'; O.drawImage(CRc, d, 0); O.restore();
}
function finish(t, si) {
  const f = Math.floor(t * FPS);
  if (!NOGRAIN) { O.save(); O.globalCompositeOperation = 'overlay'; O.globalAlpha = .09; O.fillStyle = GP[((f % 6) + 6) % 6]; O.translate(-hash(f) * 256, -hash(f + 9) * 256); O.fillRect(0, 0, W + 256, H + 256); O.restore(); }
  const vg = O.createRadialGradient(W / 2, H / 2, Math.min(W, H) * .5, W / 2, H / 2, Math.max(W, H) * .75); vg.addColorStop(0, 'rgba(0,0,0,0)'); vg.addColorStop(1, 'rgba(0,0,0,.34)'); O.fillStyle = vg; O.fillRect(0, 0, W, H);
  const a = HUD && !CALM ? prog(t, .6, 1) * (1 - prog(t, DUR - 1.6, DUR - 1.1)) : 0; if (a <= 0) return;
  O.save(); O.globalCompositeOperation = 'difference'; O.globalAlpha = a * .8; O.fillStyle = '#fff'; font(O, 15, 600, MONO); O.letterSpacing = '3px'; O.textBaseline = 'alphabetic';
  O.textAlign = 'left'; const hs = SAFE.hud.side, ht = SAFE.hud.top - 24, hb = SAFE.hud.bottom + 20;
  O.fillText(BRAND, hs, ht); if (Math.floor(t * 2) % 2 === 0) { circle(O, hs - 14, ht - 5, 4.5); O.fill(); }
  const n = SCENES.length - 1; O.textAlign = 'right'; O.fillText(`${String(si).padStart(2, '0')}/${String(n).padStart(2, '0')} · ${SCENES[si][2]}`, W - hs, ht);
  const bar = Math.floor(t / (BPB * BEAT)) + 1, beat = Math.floor(t / BEAT) % BPB;
  O.textAlign = 'left'; O.fillText(`${Math.round(BPM)} BPM · BAR ${String(bar).padStart(2, '0')}`, hs, hb);
  for (let b = 0; b < BPB; b++) { O.globalAlpha = a * (b === beat ? .9 : .3); O.fillRect(hs + 252 + b * 16, hb - 11, 10, 10); }
  O.globalAlpha = a * .8; O.textAlign = 'right';
  O.fillText(`00:${String(Math.floor(f / FPS / 60)).padStart(2, '0')}:${String(Math.floor(f / FPS) % 60).padStart(2, '0')}:${String(f % FPS).padStart(2, '0')}`, W - hs, hb);
  O.restore(); O.fillStyle = C.accent; O.globalAlpha = a; O.fillRect(0, H - 4, W * t / DUR, 4); O.globalAlpha = 1;
}
// render(t, S): S sub-frames across a half-frame shutter, averaged (motion blur). S=1 live, S=5 for the export.
function render(t, S = 1) {
  t = ((t % DUR) + DUR) % DUR; let si;
  if (S <= 1) si = drawScene(O, t);
  else { const sh = .5 / FPS; for (let i = 0; i < S; i++) { si = drawScene(B, t + (i / (S - 1) - .5) * sh); O.globalAlpha = 1 / (i + 1); O.drawImage(buf, 0, 0); } O.globalAlpha = 1; }
  const k = impact(t); if (k > .12) chroma(Math.round(k * 13)); finish(t, si);
}

// ---------- cue sheet: sweep the film with the hook on; every sound-worthy event, from the scene code itself (reel.py cues).
function cues(fps = 50) {
  const seen = new Map(), early = new Map();
  CUE = (k, t, o) => { const key = `${k}|${t.toFixed(4)}|${k === 'ring' ? '' : o.s ?? o.id ?? ''}`;   // keyed by text: a moving label is one cue
    if (t < SCENES[CUE_I][0] - 1e-6) { early.set(key, { k, t: +(t - SCENES[CUE_I][0]).toFixed(3), scene: SCENES[CUE_I][2], s: o.s }); return; }   // before its scene: dropped
    if (!seen.has(key) && t < (SCENES[CUE_I + 1] || [DUR])[0]) seen.set(key, { k, t, sc: CUE_I, ...o }); };
  const bgAt = t => { drawScene(B, t); return CUE_BG; }, flips = [];
  let prev = bgAt(0);
  for (let i = 1; i < DUR * fps; i++) { const t = i / fps, b = bgAt(t);
    if (b !== prev) { let lo = (i - 1) / fps, hi = t; for (let n = 0; n < 20; n++) { const m = (lo + hi) / 2; bgAt(m) === prev ? lo = m : hi = m; }   // bisect the flip
      flips.push({ k: 'flip', t: hi, sc: sceneAt(hi), to: b === C.accent ? 'accent' : 'ink' }); prev = b; } }
  CUE = null; window.FILM.early = [...early.values()];
  const ev = [...seen.values(), ...flips, ...IMP.map(([t, s]) => ({ k: s >= 1.2 ? 'boom' : 'impact', t, sc: sceneAt(t), s }))];
  ev.filter(e => e.k === 'count').forEach(e => { e.ticks = []; let last = 0;   // counters: one tick per displayed-integer change
    for (let x = 0; x <= e.d + 1e-9; x += .001) { const n = Math.floor(e.to * E[e.ease](clamp(x / e.d)) + 1e-9); if (n > last) { e.ticks.push([+(e.t + x).toFixed(4), n]); last = n; } } });
  ev.forEach(e => { e.t = +e.t.toFixed(4); if (typeof e.id === 'string') { const [x, y] = e.id.split(',').map(Number); if (isFinite(x) && isFinite(y)) { e.x = x; e.y = y; } } delete e.id; });   // x: for panning
  return ev.filter(e => e.t >= 0 && e.t < DUR).sort((a, b) => a.t - b.t);
}

// ---------- reel({...}): the film registers itself. scenes: [[startSec, fn(c, u, t), 'NAME'], ...] on bar lines;
// impacts: [[sec, strength]] (every scene start is added at 1.0; >= 1.2 is a "boom", keep those for the 2-4 biggest hits).
function reel(def) {
  SCENES = def.scenes; DUR = def.dur; BPM = def.bpm || BPM; BEAT = 60 / BPM; BRAND = def.brand || ''; HUD = def.hud !== false;
  const starts = SCENES.slice(1).map(s => [s[0], 1]);
  IMP = [];                                                  // sorted; two hits at the same time keep the stronger
  for (const [t, s] of [...(def.sceneHits === false ? [] : starts), ...(def.impacts || [])].filter(([t]) => t >= 0 && t < DUR).sort((a, b) => a[0] - b[0])) {
    const l = IMP[IMP.length - 1]; if (l && Math.abs(l[0] - t) < 1e-6) l[1] = Math.max(l[1], s); else IMP.push([t, s]); }
  window.FILM = { W, H, FPS, FORMAT, DUR, BPM, BEAT, SCENES: SCENES.map(s => [s[0], s[2]]), IMP, cues, MIX, TITLE: def.title || '' };
}

// ---------- soundtrack: every stem decoded to an AudioBuffer and started on ONE AudioContext time + offset, so they stay
// sample-locked. The next loop pass is scheduled ahead on the audio clock (seamless). Audio arrives as base64 (window.AUDIO),
// because a page opened from file:// cannot fetch() local files. Browsers need a gesture before audio: the Start button.
const b64buf = s => { const b = atob(s), a = new Uint8Array(b.length); for (let i = 0; i < b.length; i++) a[i] = b.charCodeAt(i); return a.buffer; };
function decodeStems(ctx) {
  const A = window.AUDIO || {};
  return Promise.all(Object.keys(A).map(name => ctx.decodeAudioData(b64buf(A[name])).then(buf => ({ name, buf }), () => null))).then(r => r.filter(Boolean));
}
function Soundtrack() {
  const st = { ready: false, dur: 0, stems: [] };
  const AC = window.AudioContext || window.webkitAudioContext; if (!AC || !window.AUDIO) return st;
  const ctx = new AC(), master = ctx.createGain(); master.gain.value = MIX.master; master.connect(ctx.destination);
  let playing = false, base = 0, held = 0, passes = [];
  const T = [];
  const lat = () => ctx.outputLatency || ctx.baseLatency || 0;
  const stopAll = () => { passes.forEach(p => p.forEach(s => { try { s.stop(); } catch (e) {} })); passes = []; };
  const schedule = (when, at) => passes.push(T.filter(t => at < t.buf.duration).map(t => { const s = ctx.createBufferSource(); s.buffer = t.buf; s.connect(t.g); s.start(when, at); return s; }));
  const startAt = at => { stopAll(); at = clamp(at, 0, st.dur - 1e-3); const when = ctx.currentTime + .04; base = when - at; schedule(when, at); schedule(base + st.dur, 0); };
  Object.assign(st, {
    ctx,
    load: () => ctx.resume().then(() => decodeStems(ctx)).then(r => {
      r.forEach(({ name, buf }) => { const g = ctx.createGain(), an = ctx.createAnalyser(); g.gain.value = MIX[name] ?? 1; g.connect(an); an.connect(master); T.push({ name, buf, g, an, level: g.gain.value, on: true }); });
      st.stems = T.map(t => t.name); st.dur = Math.max(0, ...T.map(t => t.buf.duration)); st.ready = st.dur > 0; return st.ready; }),
    time() { if (!playing) return held; let p = ctx.currentTime - lat() - base;
      if (p >= st.dur) { base += st.dur; p -= st.dur; passes = passes.slice(-1); schedule(base + st.dur, 0); } return Math.max(0, p); },
    play() { if (!st.ready || playing) return; ctx.resume(); playing = true; startAt(held); },
    pause() { if (!playing) return; held = st.time(); stopAll(); playing = false; },
    paused: () => !playing,
    seek(s) { held = clamp(s, 0, st.dur - 1e-3); if (playing) startAt(held); },
    mute(name) { const t = T.find(t => t.name === name); if (!t) return; t.on = !t.on; t.g.gain.setTargetAtTime(t.on ? t.level : 0, ctx.currentTime, .015); },
    muted: name => { const t = T.find(t => t.name === name); return !t || !t.on; },
    rms(name) { const t = T.find(t => t.name === name); if (!t) return 0; const a = new Float32Array(t.an.fftSize); t.an.getFloatTimeDomainData(a); return Math.sqrt(a.reduce((s, v) => s + v * v, 0) / a.length); },
    origin: () => base,
  });
  return st;
}
// offlineMix: the same stems and gains as the live player, rendered to a 48 kHz stereo buffer of `sec` seconds (for the export).
async function offlineMix(sec, rate = 48000) {
  const ctx = new OfflineAudioContext(2, Math.round(sec * rate), rate), master = ctx.createGain(); master.gain.value = MIX.master; master.connect(ctx.destination);
  (await decodeStems(ctx)).forEach(({ name, buf }) => { const s = ctx.createBufferSource(), g = ctx.createGain(); s.buffer = buf; g.gain.value = MIX[name] ?? 1; s.connect(g); g.connect(master); s.start(0); });
  return ctx.startRendering();
}

// ---------- the public API (API.md documents every name). Nothing else leaks onto window.
Object.assign(window, {
  W, H, FPS, FORMAT, TAU, CX, CY, HEAD, MONO, MUSIC, C, MIX, SAFE, SAFES, BEAT, b, stag, pick,
  clamp, lerp, prog, pulse, hash, E, rgba, mix, mixQ, cue, pop, quiet,
  bg, circle, font, pal, stage, measure, label, slam, typed, para, foot, caption, pill, counter, chars, sheen, ringPulse, polyline, bz2, bz3,
  SHAPES, morphPath, glyphPts,
  reel, render, Soundtrack, offlineMix,
});
})();
