# Social reel mode

A 20-30 s portrait film for a feed, watched muted, judged in the first second. Follow SKILL.md except where this file differs, and read craft.md, prompts.md, music.md and template/API.md as usual. The bar line in prompts.md still opens every brief.

## Run it autonomously

You run without the user. Do SKILL.md steps 1-7 with these changes:

1. **Step 1:** write `story.md` from the source you were given. Pick the slug you were told to use.
2. **Step 2:** do not ask for a direction or a sound; use the direction and sound in your brief, or pick one and say why in `beatmap.md`. Do not wait for beat-map sign-off, but still write `beatmap.md` in full (bars, start, on screen, enters, leaves, and the one mechanism per scene). If two scenes could be the climax, pick one and name the other with a reason.
3. **Steps 3-6:** as written. At least three review rounds; the checklist below replaces step 6.3.
4. **Step 7:** run `build` and `export` with the env vars below. Do not `open` anything and do not ask whether the user wants changes; end with your report.

```sh
export REEL_HOME=<shared work root> REEL_OUT=<shared out dir>   # never ~/Desktop for workers
python3 reel.py init <slug> --format 1080x1350
# write story.md, beats.json, beatmap.md, score.py, film.js
python3 reel.py music <slug> && python3 reel.py cues <slug> && python3 reel.py sfx <slug> && python3 reel.py check <slug>
python3 reel.py build <slug> && python3 reel.py export <slug>
```

The venv at `~/.config/slt-agentic-marketplace/motion-reel/venv` is shared and already built; never install anything into it.

## Format and length

- `beats.json`: `"format": "1080x1350"` (LinkedIn/X feed, the default for social) or `"1080x1920"` (Reels/Shorts) or `"1080x1080"`; `"fps": 30`.
- 20-30 s: 5-7 scenes, 10-14 bars at 120 bpm (a bar is 2 s), END 1-2 bars plus the music's ~2.6 s tail.
- 120 bpm is the default grid. State the bars per scene in `beatmap.md`; most scenes get 2 bars, the climax 3.
- Lay everything out in `SAFE` (it follows the format). 1080x1350: 64 px sides, the bottom ~180 px belongs to the feed's caption. 1080x1920: keep text inside y 360-1420 and 120 px clear on the right (`SAFE.plat`). `check/safezone-*.jpg` draws these zones: red is covered by app chrome, cyan is the layout box, yellow the caption band.
- `reel({... hud: false })`: the HUD lands under the app chrome.

## Frame 0 is the poster

- Frame 0 is the thumbnail. At t = 0 the hook headline and the key visual are fully built, with the brand visible. Draw them with `label()`/`chars()`/plain drawing, never a `slam` starting at 0 (it draws nothing at t = 0).
- Hold the poster still for ~0.8 s (1.5 beats), then the first motion by 1 s. `check` FAILs `poster` on an empty frame 0 and reports when the first motion comes; the static-hold check forgives this opening hold.
- The first 3 s are the thumb test: if they would not stop your own scroll, rebuild them.

## Captions

- Every scene has one `caption(c, str, u, t0, {out})`: one short line (under ~28 characters), the claim of that beat in plain words, in the fixed `SAFE.cap` band. Sound-off viewers read only the headline and the caption, so together they must carry the story.
- Enter on the beat after the scene starts (`b(1)` or `b(1.5)`), leave half a beat before the scene ends. Never two captions at once.

## Reading time

- Headline on screen still for at least 1.5-2 s after it lands; a key number 2-3 s; a footnote 3 s; a caption at least 1.5 s.
- Hand-offs take 0.6-1.0 s. When text does not fit the time, cut words or a scene, never time.

## Mechanism per shot

- One idea per scene. Each scene has a mechanism that acts out its claim: the headline names it, the mechanism proves it ("trust is per hop": a packet stops at every node and gets checked). Write the mechanism in `beatmap.md` before any code.
- No decorative motion: if an object does not prove the claim or carry the eye to the next one, cut it.

## Type roles

Use exactly these, consistently across the film:

| Role | Use | Size at 1080 wide |
|---|---|---|
| Display | the headline of each scene, heavy condensed or heavy sans, `slam` | 110-180 px |
| Slam | one wide word or number per film, the climax | as big as fits `SAFE` (use `measure`) |
| Voice | the one human line, italic serif or a lighter weight, `para` | 44-60 px |
| Label | kickers, sources, ILLUSTRATIVE / SCHEMATIC tags, mono, `typed`/`label`/`foot` | 22-30 px |

Plus the caption plate (`caption`, >= 48 px). Nothing else.

## Continuity (vector law)

- Every seam has a carrier: an object from the last frame that IS the next scene's first object (craft.md catalogue; shared geometry functions, never crossfades).
- One dominant direction of travel (the "current"); an exit leaves on the same axis, direction and speed the next entrance continues. Z-push in for "deeper", inverse zoom out for "arrival".
- Never three hand-offs of the same kind in a row. Use at least four kinds in the film.
- Ground rotation: alternate the field (ink, accent, paper...) so each scene reads as new while the carrier stays continuous; colour-field flips on the drop.

## Brand and facts

- Brand assets (logo, the article's screenshot, the brand colour) appear as physical objects in the choreography: a card that flies, a device frame the scene flows out of, the logo as the end lock-up. Never a pasted overlay.
- The brand colour is the accent. Red is reserved for failures only.
- Only facts from the source. Illustrative values and schematic diagrams carry an ILLUSTRATIVE or SCHEMATIC label on screen.

## Sound

- Compose `score.py` for this film (music.md). In-key swells and risers, not noise whooshes; silence (a `gate`) on about half the scene cuts; exactly one drop, on the climax, with half a beat of silence before it.
- At most three impacts of 1.2 or more in a short film; every strong hit answered (check `grid`).
- The track must work muted too: the picture never depends on the sound to be understood.

## Review checklist (each round, on the sheets in `check/`)

- [ ] `check` passes, including `poster`; no WARN from `cuts` or `holds`
- [ ] `poster.png`: a finished poster that names the topic and shows the brand
- [ ] `safezone-*.jpg`: no text in red, captions inside yellow, nothing outside cyan
- [ ] `handoffs-*.jpg`: every seam has a carrier; no three of one hand-off kind in a row
- [ ] reading times above hold; each scene has one caption and one mechanism
- [ ] type uses only the four roles plus captions
- [ ] every figure and word matches `story.md`; ILLUSTRATIVE/SCHEMATIC labels where needed
- [ ] the legibility frames read at phone size: shrink one to ~360 px wide in your head; anything under ~24 px at 1080 wide is gone
- [ ] fix one thing at a time, re-run `cues`, `sfx`, `check`, look again
