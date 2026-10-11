# Reel briefs

The worker briefs for step 9 of the skill. Each section below is written to be copied into a worker's brief as it stands: the shared contract always, then either the post brief or the issue brief, then one style direction from the menu, and the sound brief only once the owner has picked a reel. Fill in the angle-bracket placeholders before sending.

Every worker runs inside its own reel folder, `tmp/issue-<N>/reels/<folder>/`, which setup.mjs has prepared with a shared `vendor/` one level up. The renderer lives in the repository, four levels up from the reel folder.

## Shared reel contract

You are building one short motion reel for the ML Engineering newsletter of The Institute for Ethical AI Alignment & Safety. It replaces a static picture on a LinkedIn, X and Bluesky post, so its only job is to make people stop scrolling and to say what the source found. Several reels are being built in parallel in sibling folders. Work only inside your own folder and do not look at any other: the comparison is only useful if each one is made blind.

What makes a reel work is one world, object or metaphor that acts out the source's mechanism, so the viewer watches it happen instead of reading a list. Every element hands off to the next by morphing, travelling or transforming; there are no slide-like cuts and no near-empty frames. One strong fact or line per beat, and easing on everything.

The technical contract is mandatory, because the reel is rendered frame by frame rather than recorded:

- Write `index.html` in your folder, plus any local `.js` or `.css`, and put any images in `./assets/`. Nothing loads from the network at render time except Google Fonts; wait for `document.fonts.ready`.
- three.js r170 is at `../vendor/three.module.min.js` as an ES module. Canvas 2D, SVG, CSS and WebGL are all fine. Write any other helper yourself, into your folder.
- Set `window.reel = { duration, width, height, seek: async (t) => {} }` in every mode, and `window.reelReady = true` once fonts and assets are ready.
- With `?render=1` in the URL the page must not self-animate. `seek(t)` draws exactly the frame at `t` seconds and is a pure function of `t`: seeded randomness only, no `Date` or `performance.now`, no CSS animation or transition driven by the wall clock. Drive any CSS from `t`.
- Without `?render=1`, loop the animation in real time with `requestAnimationFrame` and compute the loop time as `window.reelTime(yourLoopT)`, so that once a sound is playing, picture and sound stay locked.
- Body margin 0, page exactly `width` x `height`, no scrollbars.
- Right after `<body>`, include these two tags and do not fight them: fit.js scales the preview to the window by setting zoom and margins on `<html>`, and audio.js adds the Sound buttons once audio files exist.

```html
<script src="../vendor/fit.js"></script>
<script src="../vendor/audio.js"></script>
```

On-screen text uses ASCII punctuation only: straight quotes, `-` and never an en or em dash, `...` and never the ellipsis character.

Review your own work from stills, since you cannot watch it play. From inside your folder:

```
node ../../../../scripts/newsletter/reels/render.mjs . --frames-only 0,0.5,1,2,3,4,5,6,7,8,9,9.8
```

Then look at every PNG in `./stills/` with your Read tool and critique it like a demanding creative director: is each frame striking, readable at phone size, on-style, uncluttered, free of overlaps and clipping, and does the whole read as one continuous idea? Iterate at least three rounds. Do not render an mp4 and do not make audio until you are told to: the owner reviews the live HTML, which is the deliverable.

Your budget is about 35 minutes. If you are still polishing at 30, stop. Finish by writing `./REPORT.md`, short: the concept in two or three sentences, a beat-by-beat timeline with times, and what you are least happy with. Later rounds add a short dated note to it rather than rewriting it.

## Post reel brief

Your reel is for one article post: 4:5 portrait at 1080x1350, exactly 10 seconds, 30 fps, so `window.reel = { duration: 10, width: 1080, height: 1350, ... }`. The post text is in `./post.txt`; `./image.*`, when present, is the picture the post would otherwise carry, there for reference only.

Facts come only from `post.txt`. Do not invent numbers, names or claims, and keep attributions honest ("they report") where a number is the source's claim. You may shorten freely.

Frame 0 is the thumbnail, so it must be a finished, composed poster: the key visual fully built and the hook headline fully on screen and readable at phone size, nothing half-drawn or mid-animation. Hold that exact frame for about 0.8 seconds before anything moves.

Pacing is where reels most often fail. Transitions and morphs take at least 0.7 to 1 second with gentle easing, and every line of text stays still and fully readable for at least 2 seconds before anything moves it. If that leaves too few beats for 10 seconds, cut beats by merging or dropping the weakest; never speed up. Body text is at least about 44px and headlines far bigger.

Make it feel like the brand it is about. `./assets/` holds the source's brand material: simple-icons logo SVGs (monochrome 24x24 paths, so recolour them to the brand colour, for example Hugging Face #FFD21E, Pinterest #E60023, Claude #D97757) and real screenshots of the source site. Put the source's logo in the hook, use product logos where those products appear, and adopt the brand colour as the accent. Where there is no logo, bring the real site in as a screenshot in a small browser or device frame, or a report cover as a physical card, and make it part of the choreography rather than a sticker. Never invent a logo you do not have; a name stays as text.

The last 1.5 seconds or so is a held end card with the core takeaway and the source as a plain domain in small wordmark type (`<source-domain>`, for example `stateof.ai`). It never shows ethical.institute.

Your style direction is below. Commit hard to it and push it somewhere surprising; a safe, generic, template-looking result is the failure case.

`<style direction from the menu, one paragraph>`

## Issue reel brief

Your reel promotes the whole of issue `<N>` rather than one post: 16:9 landscape at 1920x1080, exactly 15 seconds, 30 fps, so `window.reel = { duration: 15, width: 1920, height: 1080, ... }`. The five stories are in `./issue.md`; facts come only from there.

All five stories appear by name. Frame 0 is the hook and the thumbnail, a finished poster that says what this is or leads with the single strongest fact, held about 0.8 seconds. A rough arc is a hook of about 1.5 seconds, the five stories at about 2 seconds each with one strong line apiece, and a held end card of about 2 seconds reading "ML Engineering Newsletter #`<N>`" with the ethical.institute wordmark. You may reorder or group stories if the concept wants it.

The post reel rules on pacing, phone legibility, honest attribution and brand material all apply here too: transitions of 0.7 to 1 second, every line still for 2 seconds, cut beats rather than speed up.

`<style direction from the menu, one paragraph>`

## Style menu

Assign directions per post by matching the style to the content: a report full of numbers suits charts or kinetic type, a training method suits a mechanism or a world, a product suits its own UI. Each post gets three different directions, one per worker, and each worker sees only its own.

- **3D low-poly game world.** The mechanism as a small explorable world in three.js, with a camera that travels through it.
- **Flowing launch-page UI cards.** Product-launch interface cards that slide, stack and morph into each other, in the source's own visual language.
- **Swiss kinetic typography.** Grid, scale and motion of the words themselves carry the story; type is the image.
- **Generative data-art.** The post's numbers drive a generative system of particles, fields or lines.
- **Playful mechanical diagram.** The method as a machine of gears, chutes and conveyors that the viewer watches run.
- **Hand-drawn explainer.** Marker on paper, drawn on as you watch, like a whiteboard sketch with character.
- **Pinboard or product UI morph.** The source's own product surfaces, pinned, rearranged and morphing into the point.
- **Data-journalism charts.** Charts that build, annotate and transform as in a good newsroom explainer.
- **Cinematic 3D object.** One physical object, such as a report, device or chip, lit and shot like a product film.

## Sound brief

Your reel was picked; now give it sound. Keep the picture as it is unless a tiny timing nudge makes a cue land better.

Each soundtrack is sound effects synced to the picture plus a simple background music bed underneath. Build a cue table from your own seek timeline and put a sound on every important visual hit, at the exact frame. Under it sits a bed: a loop of two to four chords with a clear, steady groove at a tempo that suits your pacing, roughly 6 to 10 dB under the hits and ducking slightly on the big ones. Make three versions that share the effects layer and differ in the bed:

- `audio-a.py` writes `audio-a.mp3`: lo-fi chill beat, soft drums, warm keys or Rhodes chords, a little vinyl texture.
- `audio-b.py` writes `audio-b.mp3`: light upbeat electronic, clean plucks or arps over a steady chord loop and a soft kick.
- `audio-c.py` writes `audio-c.mp3`: soft acoustic, piano or guitar chords with a gentle pulse.

Python is `../.venv/bin/python`, with numpy, soundfile and scipy; install nothing. The procedural library at `../vendor/audio-lib/` (import it with `sys.path.insert(0, '../vendor/audio-lib')`; `music.md` is its API doc, `sfx.py` its effects, `score.py` an example) is there for mixing, mastering, loudness and mp3 writing. Do not lean on its stock instruments and effect voices, which is where generic-sounding audio comes from: write your own DSP for the actual sounds, with proper envelopes, filtering, light chorus and reverb, and no harsh raw oscillators.

Each file is exactly the reel's duration in stereo, about -14 LUFS integrated, true peak at or below -1 dBTP, and loops cleanly. Verify with numbers, since you cannot listen:

```
ffmpeg -i audio-a.mp3 -af ebur128 -f null -
ffmpeg -i audio-a.mp3 -lavfi showspectrumpic=s=1200x400 spec-a.png
```

Check loudness per file, run an energy-flux onset check that the main cues land within 33ms of the visual beats, and look at each spectrogram to confirm the bed shows as a steady layer under the hits. audio.js picks the files up as Sound A, B and C buttons in the preview. Do not render an mp4. Budget about 30 minutes, then add a Sound section to REPORT.md: per variant the bed in one line, the cue table, the LUFS, and which one you think is strongest.
