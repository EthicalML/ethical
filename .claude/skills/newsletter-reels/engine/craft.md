# Craft: how to make the film feel keynote-grade

Read this before designing the beat map and again before writing `film.js`. These rules come from an 88-second film that went through many review rounds. Most of them fix a problem that someone actually saw.

## The one rule: nothing cuts

The object that ends one beat is the object that starts the next. Never crossfade, never wipe to a new slide, never hold a static frame. When two scenes need the same thing on screen (a curve, a point cloud, a mark), both scenes call the **same geometry function**, or read the same rest-state constant, so the hand-off is exact rather than faked. Write each shared thing as a small spec plus a draw function, and call it from both scenes.

Pick a hand-off for every scene boundary from this catalogue. Use at least five different ones in a film. The direction can bend this: a nesting direction (infinite zoom) or a single-object one may use its signature hand-off at most boundaries, but then vary what happens inside it (what you dive into, how the object reshapes, the camera's path), so no two boundaries look alike.

| Hand-off | What happens | Good for |
|---|---|---|
| Grow / stretch | a dot stretches into a line, the line becomes a beam, axis or bar | openings, a first chart |
| Camera dive | zoom into a detail (a pivot, a dot, the counter of a "0") until it fills the frame and becomes the next scene's centre | changing topic while keeping focus |
| Shape morph | every shape is a radial function r(θ), so any shape morphs into any other (disc → square → tag) | concepts, products, icons |
| Flatten / pivot | an object flattens into a bar, then pivots on one end into a line | objects into data |
| Curve morph on shared axes | keep the axes and morph the curve function; a head dot rides the curve | before/after, scenarios |
| 2D → 3D → grid | tilt a chart back into a perspective point field, then flatten it into a grid | scale ("every product, every week") |
| Scatter on arcs | grid cells fly on staggered arcs into a cloud; squares turn into circles mid-flight | many outcomes, options |
| Same scene, re-lit | keep the cloud, dim the interior, light the edge, draw a frontier | a sharper point on the same data |
| Selected subset survives | a subset orbits while the rest falls away, then lands as the next layout | counting, "250 tests" |
| Detonation | a point flies to centre, bursts into rays and a new object grows | the reveal, the product name |
| Energy into type | sparks stream along curves into the letters of a word | the name or claim you most want remembered |
| Glyph particles | text is sampled into points, so numbers and words assemble from particles and dissolve back | results, the end lock-up |
| Counter IS the objects | the number on screen counts the objects already landed | any count |
| Field exit as stripes | a full-screen colour field leaves as rotated stripes | a punctuation mark between acts |
| Loop closure | everything spirals into the opening dot, so the last frame is the first | the ending |

Anything that keeps animating across a boundary (a twinkle, a light running along a line, a slow drift, a rotation) must be driven by film time `t`, the scene function's third argument, not by the scene-local `u`, which restarts at 0 in the next scene and makes the motion jump. To draw the next scene inside this one (a zoom, a preview), wrap it in `quiet(...)` so its sounds don't land at this scene's times.

## Timing and rhythm

- **Work on the music grid.** At 120 bpm a beat is 0.5 s and a bar is 2 s. Scene starts sit on bar lines. Impacts, colour flips and counter resolves sit exactly on beats. Pops, slams and headlines sit on eighth notes. `reel.py check` measures this; any impact more than 10 ms off a beat is a bug.
- **Answer the music.** `music.json` lists the song's hits. Every strong hit (strength ≥ 0.8) needs a visual answer: an impact, a flip, a burst, a slam. Scene starts are answered automatically. Put the film's biggest moment on the drop, and put a colour-field flip or shockwave on it. The check lists unanswered hits.
- **Stagger on the grid.** A natural-looking step such as 0.6 beats drifts off the eighth notes; use `stag(i)`, which snaps to them.
- **Give reading time.** A headline needs about 1.5 s after it lands. A number the audience must remember needs 2–3 s. A footnote needs 3 s on screen. When the text doesn't fit the time, cut words, never time.
- **Let the best moment breathe.** If one moment is clearly the best, give it an extra bar.
- **No dead air.** Every held frame needs something alive: a light sweep across the letters, particles glinting, a halo pulsing on the beat. A still frame longer than about one beat reads as broken. For `check` to count it as alive, what moves must change at least 0.15 % of the frame (about 3,000 px² at 1080p: a 55 px square, a sheen across a headline, a ring pulse) by more than about 6 of 255 brightness levels every eighth of a second. The detector looks at a 320×180 copy, so specks under about 6 px average away: fine dust keeps a frame alive for the eye but not for `check`.
- **Don't end in silence.** The film must end within about 1 s of the music's final hit and tail. It must not run on after the music stops.

## Motion

- **Every animated value is one idiom:** `ease(prog(u, t0, t1))` for the entrance, multiplied by `(1 - E.inExpo(prog(u, out, out + .3)))` for the exit. That gives in and out for free.
- **Easing by job:**
  - `outExpo` for entrances (snappy settle)
  - `inExpo` for exits
  - `inOutExpo` for camera moves, field flips and stretches
  - `outBack` for pops, pills and snaps
  - `outBounce` only for objects that drop onto something
  - `inOutCubic` for flights
  - `inOutSine` for curve heads and sheens
  - `outCubic` for counters
- **Impacts** come from one list, the `impacts` passed to `reel()`, which drives camera shake, a small zoom punch and an RGB split, all decaying fast. Keep the strongest (≥ 1.2, the "booms") for at most four moments in the whole film.
- **Particles** move with a little turbulence mid-flight, and each has its own delay, so a swarm reads as alive rather than a tween. Particles faster than a few pixels per frame draw as short streaks.
- **Kinetic type:** headlines rise letter by letter from behind a mask (the `slam` primitive). Labels and sources type on in mono. Body lines rise gently (`para`). Never fade a paragraph in on its own.

## Look

- **Palette discipline:** the brand's background, foreground and one accent, plus at most ONE extra supporting colour, used only for data. Colour-field flips swap background and accent for exactly one beat window on a hit.
- **Typography:**
  - one heavy sans for headlines (kicker around 60 px, headline 90–130 px at 1080p)
  - a mono for labels, sources and footnotes
  - headlines in a consistent position
  - footnotes always in the same place, small, at about 60 % opacity (70 % ink on a coloured field)
- **Legibility over effect:** no text over busy particles without contrast, and no text collisions. Test the contact sheets, not your imagination.
- **Finish:** motion blur in the export (S=5), seeded film grain at low opacity, and a soft vignette. A small HUD (brand line, bar count, timecode) is optional and should blend so it reads on any field.

## Content honesty (hard rules)

- Use only facts and figures from the source. Never invent a number, a customer, a quote or a claim.
- Counters must never flash a value that doesn't exist. Count with `floor`, so the final value lands exactly on its beat, or reveal the number by letters instead.
- Two counters side by side with close targets (+11 % next to +13 %) each pass through the other's value on the way up, so a still frame shows the wrong figure on the wrong label. Reveal those by letters (`slam`), or stagger them so one has landed before the other starts.
- Any made-up example value (sample prices, example chips) is labelled ILLUSTRATIVE on screen.
- Keep every source and disclaimer from the input near the section it belongs to, as a footnote.

## Failure modes seen before (check for each one)

| Symptom | Fix |
|---|---|
| It feels like slides | a crossfade or a new background per scene; replace it with a hand-off from the catalogue |
| The ending drags | a long held lock-up; make it particles that assemble and then collapse into the opening dot |
| A hit lands a beat early or late | move the event onto the hit from `music.json`, not just onto the grid |
| Static holds flagged by `check` or in review | add a sheen, light running along a line, glints or a halo pulse on the beat |
| `check` flags a cut at a boundary | the two scenes disagree on a shared value (a radius, a position, an opacity) or something vanishes on the frame; read it from one constant, or move it out before the boundary |
| A subset ("the frontier", "the survivors") comes out too small or too large | choose it with `pick(n, count)`, never a `hash(i) > x` threshold |
| Text collides or is unreadable on a colour field | move it, or switch its colour with the field |
| A number counts through values that don't exist | floor-count, or reveal by letters |
| The best moment feels rushed | give it one more bar and shift everything after it by exactly one bar |
| The film runs past the music | end the film on the music's end hit and tail |
