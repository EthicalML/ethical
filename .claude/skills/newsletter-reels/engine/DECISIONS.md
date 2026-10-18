# Decisions

## Where this came from

The skill distils a multi-day exercise that turned a 13-slide pricing deck into an 88–93 second film. The exercise went through a faithful slide-by-slide version, five alternative takes, beat-sync, a sound-effects stem and a voice-over. The version that won continued one object from scene to scene on a music grid, and most of `craft.md` is the list of things reviewers actually flagged along the way.

## JavaScript in a Python repo

The film has to run in a browser, with a Start with audio button and an in-page MP4 export, so the engine, the film scaffold and the player shell are JavaScript. That is the whole JavaScript surface, and it lives in `template/`. Everything the agent runs is Python in `reel.py`, `music.py` (the music library), the film's own `score.py`, and `sfx.py`: setting up, music, sound, sweeping the film for cues, checking, bundling and exporting. No step needs Node. The browser is driven with Playwright for Python.

## One clock, no warp

The music is composed for the beat map, so film time and music time are the same clock and every scene starts on a bar line. The original exercise used a stock track at 118.29 BPM and needed a linear time warp, a hit-ranking pass and a nudge pass to put events on the song's accents. Generating the music removes all three. A supplied track would bring them back, which is why the skill says the sync is approximate in that case and doesn't try.

## Procedural music

The first numpy experiments sounded synthetic, and the drums were dry. Their reverb sends were 0.08–0.10, every hit was the same one-shot through `tanh`, and the reverbs were metallic Schroeder ones. The user approved a punchy kit in an A/B test: a kick with a sustained sub layer tuned to the song's root, a longer body and a click; a snare with a two-tone body, noise tail and layered clap; and a drum bus with parallel compression, a small room and a low shelf. That kit is the default. The kick tail measures about 10 dB fuller than the old kit. The kit, the synth voices, the mixing and the mastering live in the `music.py` library. The arrangement lives in each film's `score.py`: see "The model designs, the scripts ship" below.

The track is mastered to −14 LUFS and at most −1 dBTP on the mp3. It is deterministic, seeded from the title, so a rebuild gives an identical file. Loudness is measured with our own BS.1770-4 code inside `music.py`, which agrees with ffmpeg's `ebur128` to within 0.1 LU, so ffmpeg is not a dependency.

## Sound effects from the film, never by hand

Every text primitive calls `cue()`, and `reel.py cues` sweeps the page to collect them. So the sound follows the picture after every edit, and nothing is placed by hand. The stem sits about 7 dB under the music, only the booms reach the sub, and a sum limiter pulls the stem, never the music, down wherever the two would clip together. The stem's gain is solved on the unlimited stem, because limiting a peaky stem lowers its gated loudness by more than the gain it takes off, and re-levelling an already limited stem compounded that: one film landed 13 dB under. Cues are keyed by their text, not their position, so a label that moves registers one sound, not one per swept frame. The live mix, the in-page export and the checks all use the same gains (`MIX` in `engine.js`, `PLAYER_GAIN` in `sfx.py`); change them together.

## One self-contained HTML file

The Desktop output is a single `.html` file with the engine, the film, the muxer and the audio (as base64) inlined. The earlier version was a folder served over http, and it kept failing in two ways: `file://` cannot `fetch()`, and Python's `http.server` lacks the range requests that seeking needs. A single file works when double-clicked, can be emailed, and needs no server.

## MP4 export

The page renders the film offline, frame by frame at 1080p60 with motion blur, and encodes it with WebCodecs (H.264 + AAC). It mixes the two stems in an OfflineAudioContext and muxes with mp4-muxer. `reel.py export` clicks that same button in the system Chrome, so the page and the command line produce the same file. A 96 s film exports in about 35 s, and the checks add about 20 s. The default bitrate is 8 Mbps (about 100 MB for 96 s; it used to be 20 Mbps and 250 MB). The frame check compares frames at 480×270, because film grain is per-frame noise the encoder is allowed to soften. If WebCodecs cannot encode H.264 (for example Playwright's own Chromium, which ships without it), `reel.py` falls back to encoding `render(t)` frames with PyAV, about 7× slower. Every export is checked with PyAV: codecs, 1920×1080, 60 fps, a duration matching the film within one frame, and decoded frames compared against `render(t)`.

mp4-muxer 5.2.2 by Vanilagy, MIT licence, is vendored in `template/vendor/`:
- source: `https://raw.githubusercontent.com/Vanilagy/mp4-muxer/v5.2.2/build/mp4-muxer.min.js`
- sha256: `076be3853983331d9eb0ab3fb5c47822c4315b576725cbef6400930d9c155971`

The licence text is alongside it.

## One engine scope

The engine runs inside one function and puts only its documented API (`template/API.md`) on `window`. It used to share the page's global scope with `film.js`, and a film that declared `const HX` crashed on the engine's colour cache of the same name. Every text primitive takes `(c, str, x, y, u, t0, {options})`, because mixed argument orders were the most common slip.

## The model designs, the scripts ship

The first release hardcoded too much of the creative work. `music.py` composed every track the same way: electronic, 4/4, one chord per bar, one arrangement. `init` copied a finished four-scene film for the agent to edit, and both blind-test films kept its opening, its particle word and its ending. And a set of ready-made data visuals (curve, grid, cloud, counter, flow diagram) would have made every chart in every film look alike. The best work in the original exercise came from direction, not templates: a model composing a fresh score per film, and building each scene from a brief.

So the split is now:
- **The scripts do plumbing and proof:** setup, the cue sweep, the sound-effects mix, checks, bundling and export.
- **The model does the design:**
  - `music.py` is a library of instruments, mixing and mastering, and each film has its own `score.py`. Frontier models (Opus 5.5 and newer) compose it from scratch; others start from the example score. The library covers any key or mode, time signatures other than 4/4, and swing: two test scores, a 3/4 cinematic piano piece at 80 bpm and a swung E-dorian funk groove at 124 bpm, both mastered to −14 LUFS, came out clearly unlike the default.
  - `init` writes a blank film scaffold.
  - The data visuals are gone. The engine keeps only a small toolkit (easing, grid timing, type, glyph particles, shape morphs, impacts, the player and export), about 80 lines smaller.

`prompts.md` carries the craft instead: the briefs and the user feedback that produced the winning film, plus five genuinely different directions. It also suggests building two or three directions in parallel when the user wants options, which is how the winning film was found.

## Checks

`reel.py check` automates the checks that caught real problems in the original exercise:
- page errors
- render purity (the same `t` gives the same pixels)
- impacts on the beat within 10 ms, and pops and slams on eighth notes
- strong music hits left without a visual answer
- a frame 33 ms after each key sound, to prove the sound has a visible cause
- loudness
- the live audio clock
- cuts: at every scene boundary, how much of the frame jumps between the frames either side, beyond what the film moves anyway over two frames and across the beat before
- static holds: stretches over 1.5 beats where nothing visibly moves
- stale sound: `cues.json` or `sfx.mp3` older than `film.js`, which a blind run found easy to ship by forgetting `sfx`

The reports name the scene and the beat within it, because mapping film seconds back to scene-local beats was the first step of every fix. `check` also writes a legibility sheet, one 960 px frame per scene once its last text has landed, because the 4-up contact sheets were too small to read footnotes and labels. And `mix` prints each stem's loudness and band shares, so a model that cannot hear the track can still balance it.

The pixel comparisons load the page with `?cpu`, because Chrome moves a canvas between GPU and CPU after a readback and the anti-aliasing changes, which reported false differences. The cut and hold detectors also load it with `?calm`, which switches off impacts, grain and the HUD, so only the scenes' own drawing counts.

The cut score is the percentage of a 320×180 greyscale frame whose brightness moves by more than 24 levels. It was calibrated on the skeleton and the two blind-test films: continuous hand-offs score 0.0–0.8, a label or curve vanishing on the boundary 1.2–2.6, a shared radius changed in one scene 5.8, and a whole wordmark dimming or a grid restyling on the frame 9–10. So 1.0 warns and 5.0 fails. The contact sheets still need an agent's eye for everything else: clumsy but continuous hand-offs, collisions, reading time, which is why step 6 asks for at least three looking rounds.

## One sign-off

The beat map is the only sign-off. It is the cheapest point to change the story, and after it everything is mechanical or judged against `craft.md`. The one question before it is the creative and audio direction: left to itself the agent picked the winning showreel and a similar score every time, so films all looked and sounded alike.

## Not yet

- **Voice-over.** The original exercise had one: Kokoro and Qwen voices, a single take cut by Whisper, a pacing budget of about 2 words per second of scene, and the music dimmed 7 dB under the voice. It is left out until the silent film is solid.
- **Retiming to a supplied track.** Also left out, for the reason above.
