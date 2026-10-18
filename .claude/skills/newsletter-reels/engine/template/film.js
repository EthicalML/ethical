// film.js - a blank scaffold. The film is yours to design (craft.md, template/API.md): replace the placeholder scene,
// write one scene function per beats.json scene, and make each scene grow out of the one before it.
'use strict';
Object.assign(C, { ink: '#0e0e12', paper: '#f4f3ef', accent: '#ff5a1e' });   // the brand's colours

// ---------- timing: one row per beats.json scene, same order and bars. MUSIC (music.json) is the truth once it exists.
const PLAN = [['OPEN', 2], ['DIRECTION', 3], ['SCALE', 4], ['END', 3]];
if (MUSIC && MUSIC.scenes.length !== PLAN.length) throw new Error(`PLAN has ${PLAN.length} scenes, music.json ${MUSIC.scenes.length}: match beats.json`);
const BAR = MUSIC ? MUSIC.bar : b(4);
const T0 = PLAN.map((_, i) => MUSIC ? MUSIC.scenes[i].t0 : PLAN.slice(0, i).reduce((a, p) => a + p[1] * BAR, 0));
const LEN = MUSIC ? MUSIC.dur : T0.at(-1) + PLAN.at(-1)[1] * BAR + 2;   // the film ends where the music ends

// ---------- a placeholder scene: a disc that beats with the music, a ring, and the scene's name. u = scene-local seconds.
const placeholder = (name, bars) => (c, u) => {
  const P = pal(0); stage(c, P);
  const k = E.outExpo((u % BEAT) / BEAT);
  c.strokeStyle = rgba(C.accent, 1 - k); c.lineWidth = 6; circle(c, CX, CY, 80 + 420 * k); c.stroke();
  c.fillStyle = C.accent; circle(c, CX, CY, 80 + 200 * (1 - k)); c.fill();
  typed(c, name, CX, CY + 380, u, b(.5), { align: 'center', col: P.dim, size: 22, out: bars * BAR - b(1) });
};

// ---------- register: scenes on their bar lines, and the music's strong hits (>= .8) answered with impacts.
reel({
  title: 'Untitled film', brand: '', dur: LEN,
  scenes: PLAN.map(([name, bars], i) => [T0[i], placeholder(name, bars), name]),
  impacts: (MUSIC ? MUSIC.hits : []).filter(h => h.strength >= .8).map(h => [h.t, h.kind === 'drop' ? 1.3 : .4]),
});
