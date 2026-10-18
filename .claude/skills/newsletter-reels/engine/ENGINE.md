---
name: z-motion-reel
description: 'Use to turn a slide deck, document or story into a keynote-grade motion-graphics film - an animated reel, launch video, showreel or "make this deck move". Builds a self-contained web page on the Desktop with a Start with audio button and an Export MP4 button, with procedural music and sound effects synced to every hit.'
---

# Motion reel

Turn a deck, doc or story into a continuous motion-graphics film. There are no slides and no cuts: every scene grows out of the one before it, and every hit lands on the music. `reel.py` in this skill's directory does the mechanical work and manages its own virtual environment, so call it with plain `python3 reel.py …` from this directory and install nothing by hand. Needs **Python 3.11 or newer**. Check with `python3 --version`. If `python3` is missing or older than 3.11 (stock macOS ships 3.9), look for a newer interpreter — `~/.pixi/bin`, `/opt/homebrew/bin`, `/usr/local/bin`, `pyenv`, or the `PATH` line in `~/.zshrc` — and use that path instead of `python3` in every command below; `reel.py` builds its own environment from whichever interpreter first runs it. You do the storytelling, the design and the judging.

The bar for every run is this: make a motion graphics film that shows what an incredible motion designer you are, like a showreel for a global expo keynote. Go all out.

Outputs:
- `~/Desktop/<slug>.html`: one self-contained file. Double-click it, press **Start with audio**, and use **Export MP4** in the page.
- `~/Desktop/<slug>.mp4`: the exported film.

The working files live in `~/.config/slt-agentic-marketplace/motion-reel/<slug>/`. `REEL_HOME` overrides that root and `REEL_OUT` overrides `~/Desktop`; the venv always stays in the default root, shared.

**Short social reels** (20-30 s, portrait 1080x1350 or 1080x1920, sound-off captions): read `SOCIAL.md` and follow it instead of the keynote defaults below wherever they differ.

## 1. Read the source and write the story

1. Get the content:
   - **Google Slides or Google Doc:** read it with the `z-google-workspace` skill, including the slide thumbnails, so you see the visuals.
   - **.pptx, .pdf, .docx or .md:** read it directly.
   - **Plain text in the chat:** use it as given.
2. Pick a short slug (lowercase, dashes), then run `python3 reel.py init <slug>`. It creates the work dir and prints its path.
3. Write `<work>/story.md`:
   - one numbered beat per idea, in the source's order
   - under each beat, the exact facts, figures and wording to show
   - every footnote, source and disclaimer, attached to its beat
   - the brand colours (background, foreground, accent) and fonts, if the source has them

   Copy figures character for character. Never add a number, a customer or a claim that isn't in the source.

## 2. Design the beat map, then get sign-off

1. Read `craft.md` and `prompts.md` in this skill's directory in full.
2. Ask the user for the **creative and audio direction**, unless they already gave both. Offer the directions in `prompts.md` as one line each plus their own idea, and offer a few contrasting sounds - genre, mood and tempo, for example cinematic orchestral, warm solo piano, synthwave, minimal techno or upbeat pop. Never default to the Connected showreel or to the sound of a previous film: if the user leaves it to you, pick a direction and a sound that suit this story and say why. Say which in `beatmap.md`. If the user wants options and you can run subagents, give each subagent the same `story.md`, a different direction and its own slug, have each run steps 2–7, and let the user pick.
3. Overwrite the example `<work>/beats.json` that `init` wrote: `{"title", "bpm", "meter"?, "key", "scenes": [{"name", "bars", "role", "climax"?}]}`. `meter` defaults to "4/4"; `key` takes any mode ("E dorian").
   - **role** is one of intro, build, drop, break, outro, end.
   - **Exactly one scene has `"climax": true`.** It gets the musical drop, so make it the story's biggest reveal. If two beats could be the climax, name both in `beatmap.md` with a one-line reason each.
   - **bpm, meter and key:** choose them for the direction and the sound the user picked. 120 bpm in 4/4 is a good keynote default (a bar is 2 s). Minor keys suit tension-to-reveal stories, major keys upbeat launches.
   - **bars:** give each scene enough bars to read its text (craft.md, Timing). Most scenes need 2–4 bars, and a keynote-length film runs 80–100 s. If the source has more beats than fit about 100 s at those reading times, merge related beats into one scene; never drop a figure or a footnote.
   - **END** gets 1–2 bars: the music adds its own tail of about 2.6 s after the final hit.
4. Write `<work>/beatmap.md`, a table with one row per scene:
   - bars and start time
   - what's on screen
   - **how it enters** (which object from the previous scene it grows out of)
   - **how it leaves**

   Use at least five different hand-offs from the craft.md catalogue.
5. Show the user the direction and the beat map and wait for their go-ahead or edits. If you named two climax candidates, ask which one gets the drop. This is the one sign-off in the run after the direction questions. Don't write film code before it.

## 3. Compose the music

1. Read `music.md` in this skill's directory: the music library and what makes a track work under a film.
2. Write `<work>/score.py`, the track for this film. It imports the library, reads `beats.json`, and gives each scene its part.
   - If you are Claude Opus 5.5 or a newer frontier model, compose it yourself: choose the genre, instruments, progression and arrangement for the direction, the sound the user picked and the story.
   - Otherwise, run `python3 reel.py music <slug>` once before writing anything: with no `score.py` it copies the example score into the work dir and builds it. Then adapt that score to this film.

   Either way, the drop lands on the climax scene, the end hit lands on the last scene, and the helper that writes `music.json` is called.
3. Run `python3 reel.py music <slug>`. It runs `score.py` and checks the result: `music.mp3` at about −14 LUFS, and `music.json` with the beat grid, scene times, the drop and the hits the film must answer. The music is composed for this beat map, so film time and music time are the same clock.
4. Listen-check by measurement: if it prints a loudness or peak FAIL, fix `score.py`'s levels, not the master.

If the user supplied their own track, skip this step and tell them the sync will be approximate. Measuring and retiming a supplied song is not part of this skill yet.

## 4. Write the film

`<work>/film.js` starts as a blank scaffold: the timing, one placeholder scene and the registration. You design every scene yourself, in the chosen direction. There are no ready-made charts or scenes on purpose, so no two films look alike. Read `template/API.md` in this skill's directory for the engine's small toolkit and the `music.json` fields. Then:

1. Set `PLAN` to your scenes and bars, exactly as in `beats.json`. Scene start times come from `MUSIC.scenes`, and the film ends where the music ends.
2. Set the colours to the brand's (`Object.assign(C, {...})`), with at most one extra colour, for data.
3. Write every time in beats with `b(n)`, and staggers with `stag(i)`, so they stay on the grid. For a bar, use `MUSIC.bar`, not `b(4)`, so a meter other than 4/4 still lines up. Lay text out in the `SAFE` zones and size it with `measure`.
4. Put the geometry that two scenes share into a function both of them call. That is what makes a hand-off exact; don't crossfade.
5. Build each visual for this story: its charts, grids, counters and diagrams, drawn your way. Use the toolkit for the mechanics:
   - type: `slam`, `typed`, `para`, `foot`, `pill`/`pop`, `counter`. They register their own sound cues.
   - `glyphPts` for text made of particles, `SHAPES` + `morphPath` for morphs, and `pick` for subsets.
   - `sheen` and `ringPulse` to keep held frames alive.
   - the `impacts` list passed to `reel({...})` for shake, zoom punch and RGB split. Add the strong hits from `music.json`, and put the biggest on `drop_t`.
6. Call `cue(kind, t, opts)` for anything else that should make a sound: `whoosh` (`dir`: in, out, up, down or side) on camera moves, `burst`, `swirl`, `sheen`, `lock`, `riser`.
7. Keep `render` pure: no `Date`, no `Math.random`, only `hash()`. `check` fails otherwise.
8. Use the story's exact wording and figures, and put every footnote in place with `foot`.

To look at one moment while you work, run `cues` (it bundles `<work>/reel.html`) and open `<work>/reel.html?t=<seconds>` in a browser, or run `check`, which renders the contact sheets.

## 5. Add the sound effects

Run `python3 reel.py cues <slug>`, then `python3 reel.py sfx <slug>`. The first sweeps the film for its cues. The second synthesises a stem that sits under the music, in its key. Re-run both after every change to `film.js`; `check` fails while they are older than it.

If `cues` reports a page error, fix `film.js` first; the error names the line. An error like `x is not a function` usually means the old argument order: check the call against API.md.

## 6. Verify and polish (at least three rounds)

1. Run `python3 reel.py check <slug>`. It prints PASS/WARN/FAIL per check (stale sound, errors, purity, beat grid and music hits, cuts at scene boundaries, static holds, loudness, player) and writes pages of contact sheets and reports to `<work>/check/`. Holds and cuts name the scene and the beat within it.
2. Fix every FAIL, and every WARN from `cuts` and `holds`; `check/cuts.txt` and the hand-off sheet show where.
3. Look at the sheets yourself with this checklist, and write down what fails:
   - [ ] every boundary on `handoffs-*.jpg`: the last frame's object IS the next scene's first
   - [ ] no frame held for more than a beat with nothing alive
   - [ ] no text colliding with text, data or particles, and none crossing the `SAFE` zones (read text on `legibility-*.jpg`: one large frame per scene with its text on)
   - [ ] every headline on screen at least 1.5 s, every key number 2–3 s, every footnote 3 s
   - [ ] every figure and word matches `story.md`; illustrative values are labelled (check both on the legibility sheets)
   - [ ] every source and disclaimer from `story.md` is on screen as a footnote
   - [ ] read the feedback lens in `prompts.md`: would that note apply to this film? If so, fix it
4. Fix what you find, re-run `cues`, `sfx` and `check`, and look again.
5. Stop when a round finds nothing worth fixing, with a minimum of three rounds.

## 7. Deliver

1. Run `python3 reel.py build <slug>`. It writes `~/Desktop/<slug>.html`.
2. Run `python3 reel.py export <slug>` in the foreground, never in the background. It renders the MP4 (8 Mbps, about 1 MB per second of film; `--mbps` changes it) to `~/Desktop/<slug>.mp4` and verifies it: codecs, the `beats.json` format and fps (1080p60 by default), yuv420p, duration, and frames matching the page. It takes about 0.35 s per second of film, plus about 20 s of checks, so about a minute for a 90 s film. If it says it fell back to PyAV, expect about 7× longer. If it prints a FAIL, report it plainly instead of handing over the file.
3. Open the HTML for the user (`open ~/Desktop/<slug>.html` on macOS).
4. Tell them:
   - both paths
   - the length
   - Start with audio / Space / ←→ / `f`
   - that **Export MP4** in the page re-exports after edits, and the button beside it picks the size (STANDARD 8 Mbps, SMALL, HIGH, FAST)
5. Ask whether they want changes.
