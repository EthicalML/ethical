# Engine API

Everything `film.js` can use from `engine.js`. The engine exposes only these names, so any other name in `film.js` is yours. Times are seconds; `u` is scene-local time, `t` is film time, and `b(n)` turns beats into seconds. Colours are hex strings.

## Timing and layout

| Name | Purpose | Example |
|---|---|---|
| `b(n)` | n beats in seconds. Write every time with it. | `slam(c, 'HI', x, y, u, b(2))` |
| `BEAT` | one beat in seconds (0.5 at 120 bpm) | `const BAR = b(4)` |
| `stag(i, step = .5)` | the i-th time of a stagger, step in beats, snapped to the eighth-note grid (0.5 beat), so staggered pops pass `check` | `pop(u, b(1) + stag(i), b(1.6) + stag(i))` |
| `MUSIC` | `music.json`, or `null` before `reel.py music` ran | `MUSIC.scenes[i].t0` |
| `FORMAT` | the film's size from `beats.json` `"format"`: `"1920x1080"` (default), `"1080x1350"` (4:5 feed), `"1080x1920"` (9:16), `"1080x1080"` | `if (W < H) ...` |
| `W`, `H`, `CX`, `CY`, `FPS`, `TAU` | the format's size, the centre, the frame rate (`beats.json` `"fps"`; 60 landscape, 30 portrait and square), 2π | `circle(c, CX, CY, 16)` |
| `SAFE` | the format's layout zones: `l`/`r` margins, `kicker` and `title` baselines, `body.top` to `body.bottom`, `foot`, `cap` (caption band centre `y` and height `h`), `hud.top`/`hud.bottom`/`hud.side`, and `plat` (the platform's own safe zone, outside which app chrome covers the frame). Landscape: `l` 140, `r` 1780, `title` 250, `foot` 994. 1080x1350: `l` 64, `r` 1016, `title` 290, `body` 360-1000, `cap.y` 1060, `foot` 1150, bottom 180 px left to the feed. 1080x1920: `plat` y 360-1420, `r` 960 (120 px clear on the right), `title` 560, `cap.y` 1300. `SAFES` holds every format's table. | `slam(c, 'TITLE', SAFE.l, SAFE.title, u, 0)` |
| `measure(str, size, w = 800, fam = HEAD)` | text width in px, as `slam` lays it out | `const w = measure('PAAS', 400)` |
| `pick(n, count, seed = 0)` | exactly `count` distinct indices of 0..n-1, deterministic, ascending. Use it instead of `hash(i) > x`. | `const EDGE = new Set(pick(48, 9))` |

## Maths, colour, sound

| Name | Purpose | Example |
|---|---|---|
| `prog(t, a, z)` | 0..1 across the window [a, z] | `E.outExpo(prog(u, b(1), b(2)))` |
| `E.*` | easings: `outExpo`, `inExpo`, `inOutExpo`, `outBack`, `inOutCubic`, `outCubic`, `inOutSine`, `outBounce`, `linear` | `1 - E.inExpo(prog(u, out, out + .3))` |
| `clamp`, `lerp`, `pulse(u, t0, rate = 9)` | clamp to 0..1, mix, a decaying flash from t0 | `r * (1 + pulse(u, b(2)) * .4)` |
| `hash(n)` | the only randomness: 0..1, pure | `hash(i * 3.1)` |
| `C` | palette `{ink, paper, accent, grey, data}`; set it once with `Object.assign(C, {...})` | `C.accent` |
| `pal(flip)` | the scene colours, flipped to the accent field when `flip` is true: `{bg, fg, acc, dim, line, flip}` | `const P = pal(u < b(1))` |
| `rgba(hex, a)`, `mix(a, z, t)`, `mixQ(a, z, t)` | colour with alpha, a blend, a memoised blend for particles | `rgba(C.paper, .6)` |
| `cue(kind, t0, o)` | a sound at scene-local t0: `whoosh` (`dir` in, out, up, down, side), `burst`, `swirl`, `sheen`, `lock`, `riser`, `draw`, `scatter`, `stream`, `bells`. A cue before its scene's start (t0 < 0) is dropped, and `reel.py cues` warns. | `cue('whoosh', b(6), { d: b(2), dir: 'out' })` |
| `quiet(fn)` | runs `fn` with cues off: draw the next scene tiny inside this one (an infinite zoom, a preview) without its sounds landing at this scene's times, or its `stage()` counting as a colour flip | `quiet(() => sceneB(c, 0, t))` |
| `pop(u, a, z, o)` | outBack 0..1 from a to z that also cues a pop (`o.s` names it: dot, pill, snap, core...) | `pill(c, 'NEW', x, y, pop(u, b(3), b(3.6)))` |

## Drawing

| Name | Purpose | Example |
|---|---|---|
| `stage(c, P)` | the colour field. Call it first in every scene. `stage(c, P, n, u)` adds a big outlined numeral n that slides in at every scene start, which is a visible jump at each boundary: use it only if the direction wants it. | `stage(c, P)` |
| `bg`, `circle`, `font`, `polyline(c, fn, n)`, `bz2(a, m, z, t)`, `bz3(a, m1, m2, z, t)` | canvas helpers; `polyline` traces `fn(0..1) -> [x, y]`; `bz2`/`bz3` are points on quadratic and cubic Béziers | `polyline(c, q => [lerp(200, 1700, q), CY + 80 * Math.sin(q * TAU)]); c.stroke()` |
| `ringPulse(c, x, y, u, t0, col, r0, r1, d)` | a ring bursting on a beat; cues a bell | `ringPulse(c, x, y, u, b(4), C.accent, 20, 260, b(1.4))` |
| `SHAPES`, `morphPath(c, a, z, k, R, x, y, rot)` | radial shapes (circle, square, diamond, tri, hex, star) morphing into each other | `morphPath(c, 'circle', 'square', k, 96, CX, CY); c.fill()` |
| `glyphPts(str, size, n, w)` | n points inside a word, for particles that assemble into type: `{pts, w}` | `const GL = glyphPts('SCALE', 400, 900)` |
| `chars(c, str, x, y, size, col)` | a word drawn exactly as `slam` lays it out | `chars(c, 'PAAS', x, y, 400, C.paper)` |
| `label(c, str, x, y, o)` | text drawn as-is: no animation, no cue. Options `size` (18), `col`, `align`, `mono` (true: exactly as `typed` draws it; false: the headline sans). For axis labels and anything already on screen that must carry across a boundary. | `label(c, 'PRICE', SAFE.l, 900, { col: P.dim })` |

To fade a group of things inside a scene, multiply the alpha, never assign it: `c.save(); c.globalAlpha *= k; ...; c.restore()`. The type primitives multiply too, so an outer fade reaches them, and an assigned `c.globalAlpha = 1` inside a loop would switch that fade off.

## Type

Every text primitive is `(c, str, x, y, u, t0, {options})`: it starts at scene-local `t0`, leaves at `out`, and cues its own sound. Common options: `size`, `col`, `align` (left, center, right), `out`.

| Name | Purpose | Example |
|---|---|---|
| `slam(c, str, x, y, u, t0, o)` | headline, letters rising from a mask. Options also `st` (stagger per letter), `w` (weight). Returns the width. | `slam(c, 'FIND THE EDGE.', SAFE.l, SAFE.title, u, b(1), { size: 84, out: b(7) })` |
| `typed(c, str, x, y, u, t0, o)` | mono label typed on with a cursor; default size 18 | `typed(c, '01 — DIRECTION', SAFE.l, SAFE.kicker, u, b(.5), { col: P.dim })` |
| `para(c, str, x, y, u, t0, o)` | a line of prose rising gently; default size 30 | `para(c, 'One line of body.', SAFE.l, 330, u, b(2), { size: 26 })` |
| `caption(c, str, u, t0, o)` | a burned-in sound-off caption: one short line per beat, centred in the fixed `SAFE.cap` band on a rounded high-contrast plate, at least 48 px (default 52), entering at `t0` and leaving at `out`. Options also `fg`, `bg` (ink on paper by default), `cue` (false: silent; otherwise one soft `para` cue). Keep it under ~28 characters at 1080 wide; longer lines are squeezed to the margins. | `caption(c, 'Each hop is checked', u, b(1), { out: BAR * 2 - b(.5) })` |
| `foot(c, str, u, t0, o)` | a source or footnote on the `SAFE.foot` line; keep it 3 s | `foot(c, 'SOURCE: DECK, SLIDE 44', u, b(2), { out: b(10), col: P.dim })` |
| `counter(c, to, x, y, u, t0, o)` | counts up with floor, landing on `to` exactly at `t0 + d`. Options also `d`, `pre`, `suf`, `ease`. For a big-number lock-up, pair it with a `typed` label that lands at `t0 + d`. | `counter(c, 240, x, y, u, b(2), { size: 150, d: b(2), pre: 'EUR ', suf: 'M' })` |
| `sheen(c, str, x, y, u, t0, o)` | a light band across held left-aligned type; `x` is its left edge. Options also `d`, `x0`, `x1`. | `sheen(c, 'PAAS', GX, GY, u, b(8), { size: 400, col: C.accent })` |
| `pill(c, str, x, y, sc, o)` | a capsule label at scale `sc` (use `pop`). Options `bg`, `fg`, `stroke`. | `pill(c, 'ILLUSTRATIVE', x, y, pop(u, b(3), b(3.6)), { bg: C.paper })` |

## Registering the film

`reel({ title, brand, dur, scenes, impacts, hud })` at the end of `film.js` (`hud: false` for social films; the HUD sits in the platform chrome there):
- `scenes`: `[[startSeconds, fn(c, u, t), 'NAME'], ...]`, one per `beats.json` scene, starting at `MUSIC.scenes[i].t0`.
- `dur`: `MUSIC.dur`, so the film ends where the music ends.
- `impacts`: `[[seconds, strength], ...]` for shake, zoom punch and RGB split. Every scene start is added at 1.0; 1.2 and above is a boom, for at most four moments.

## music.json

`reel.py music` runs the film's score (`<work>/score.py`, see `music.md` in the skill directory), which writes it; the page loads it as `MUSIC`. The fields:

| Field | Meaning |
|---|---|
| `bpm`, `beat`, `bar`, `beats_per_bar` | tempo, one beat and one bar in seconds, and the meter (4 unless beats.json sets `"meter": "3/4"` or similar). Use `MUSIC.bar` for a bar, never `b(4)`, when the meter is not 4/4. |
| `dur` | the track length in seconds, including the end tail. Use it as the film's `dur`. |
| `key` | the key as written in `beats.json` (`"D minor"`, `"F# major"`, `"Bb dorian"`, `"Am"`). |
| `root_hz`, `lufs`, `true_peak_db` | the root note's frequency, and the master's loudness (−14 LUFS) and true peak (≤ −1 dBTP) |
| `scenes` | `[{name, t0, t1, role}]` in `beats.json` order; every `t0` is on a bar line |
| `hits` | `[{t, strength, kind}]`, the accents the score wrote for the film to answer. The score chooses the kinds; the example score writes `scene`, `drop` (1.5), `end` (1.4), `fill` (0.9), `phrase` (0.8), `stab` (0.55–0.7) and `tease` (0.3). |
| `drop_t` | the climax scene's start: put the biggest impact and a colour flip here |
| `end_hit_t` | the `end` scene's start, where the score puts its final hit |

What the film must match:
- Every hit with strength ≥ 0.8 needs a visual answer within 40 ms (an impact, flip, slam, pop or burst); `check` lists the ones left unanswered. Scene starts count as answered, because `reel()` adds an impact at each.
- Whatever the score does around the climax (the example score cuts to half a beat of silence before it) the picture should answer: hold still or wind up in the gap, and land the reveal on `drop_t`.
- The film ends on the track's end, so an `end` scene holds through the tail.
