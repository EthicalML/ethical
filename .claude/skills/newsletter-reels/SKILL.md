---
name: newsletter-reels
description: Make short motion-graphics reels for a newsletter issue - one 1920x1080 reel for the issue itself and one 1080x1350 reel per article post, 20-30 s with music - five directions each built by parallel Opus workers, reviewed and picked in a local gallery, revised in rounds, scored with one of the owner's stock tracks (never the generated score), exported once. Use after newsletter-issue step 8, or when asked for reels, shorts or videos of the issue's posts.
---

# Newsletter reels

Six topics: `0-issue`, the newsletter's own reel (1920x1080, LinkedIn's landscape feed video), and the five article posts (1080x1350). Five reels per topic, each a different direction, built in parallel by headless Opus workers on the vendored motion engine in `engine/`. The owner reviews live HTML pages in a gallery, picks one per article, and every change after that is a round on the same worker. The mp4s are exported once, at the end.

**Music rule, no exceptions:** every reel the owner hears or receives plays one of the owner's stock tracks from the main checkout's `.music/pixabay/`. The worker's composed score is only a beat grid that the cuts and sound effects lock to: it is never played in the gallery, never offered as a choice, and never exported. `gallery.html` plays only the m1/m2 stock variants, `export.py` refuses `score`, and `stock_music.sh` builds both variants for every reel as soon as it lands (step 6).

In the commands below `$SK` is this skill's directory and `$R` is `tmp/reels/<N>/`. Scripts live in `$SK/scripts/`.

## 1. Prepare the inputs

1. The issue must be drafted (`src/content/newsletter/<N>.md`) and grounded (`tmp/issue-<N>/<slug>.md`, `tmp/issue-<N>/images/`).
2. Run `python3 $SK/scripts/prepare.py <N>`. It writes `$R/topics/<n>-<slug>/` with `post.txt`, `facts.md` and `assets/` for the five stories, plus `0-issue/` (the issue's headings, the subscriber call to action, the Institute logos from `public/branding/` and every story logo), and prints what is missing.
3. Get the brand logos as SVG for every topic, with `python3 $SK/scripts/logos.py <N> <topic> <brand> ...` (simple-icons, Wikimedia Commons, the brand site's header). It rejects any SVG carrying script, handlers or external references. Look at the contact sheet it renders before going on. A brand with no logo (a person) is set in type instead. Re-run `prepare.py <N> --logos-only` afterwards so `0-issue` picks up the story logos.
4. A source that blocks fetches (Medium) still has its figures in its RSS feed: pull them from the feed's `<img>` URLs into `assets/`.

## 2. Write the directions

Read `references/directions.md` and `references/learnings.md`. Write `$R/directions.md` in the same format: per topic a palette line and five directions `- **<n><a-e> Name (capability):** mechanism`. Each direction names the mechanism the film acts out, and the five per topic each commit to a different primary style from the worker brief's Motion-first menu (kinetic type, HUD/technical, 3D camera fly-through, generative/organic, device in scene), so the owner compares five genuinely different films. Directions are written for the article, never reused across topics. Do not write a calm explainer direction: the worker brief's Motion-first section is the default because the owner picked it over the calm reels in four of five topics on 410.

**Running experiment (from issue 411): base vs motion-max.** In every topic, write directions a-c on the base brief and directions d-e as the motion-max arm, by putting `motion-max` in the capability brackets, e.g. `- **2d Dive through the stack (motion-max, 3D fly-through):** ...`. `briefs.py` appends `briefs/motion-max.md` to those two: hard targets (12+ visual states, 3+ moving layers on every frame, a camera move per scene, 3+ transition kinds), cuts allowed, and the shot lists in `references/motion-references.md`. After the owner picks, record in `references/learnings.md` how many picks came from each arm. Once two issues agree, fold the winner into `worker.md` and drop the experiment from this step.

Then run `python3 $SK/scripts/briefs.py <N>`. It renders one brief per direction from `briefs/worker.md` into `$R/briefs/<N>-<n><a-e>.md`; the `0-issue` briefs get `briefs/issue-reel.md` appended and the 1920x1080 format. Existing briefs are kept unless you pass `--force` (`--only 3a` renders one).

## 3. Build all 30

Explain the launch to the owner (how many workers, what each builds) and wait for the go. Then run `bash $SK/scripts/launch.sh <N>`. It starts the workers 15 s apart, at most 10 at a time, so the logins never burst. Each worker designs, scores and checks its film and builds `$R/out/<slug>.html`. No mp4 is exported at this stage.

About a minute after the launch, check that the processes are alive and the logs exist before you report anything as running.

Write `$R/music-variants.txt` (step 6) before or right after the launch, then run `bash $SK/scripts/stock_music.sh <N>` in the background. It builds the m1 and m2 stock variants for each reel the moment its page lands, and exits when the launcher does, so no reel ever reaches the gallery with only its score.

`launch.sh` and `resume.sh` were only exercised with a stand-in command when the skill was written (the 409 workers ran from the prototype scripts). If either misbehaves on a real run, fix the script, note what broke in `references/learnings.md`, and carry on.

## 4. Gallery and picks

1. Check nothing else holds port 8767 first (`lsof -nP -iTCP:8767 -sTCP:LISTEN`): a previous issue's gallery server left running serves the old issue silently. Run `python3 $SK/scripts/gallery.py <N>` in the background and open `http://127.0.0.1:8767/gallery.html` in the owner's browser. Always open review URLs in the browser for the owner; never only print them.
2. **Gate:** the owner plays the reels and picks one per topic. Picks land in `$R/selections.json`.

## 5. Revision rounds

Every change is a delta to the worker that built the reel, never a fresh worker: `bash $SK/scripts/resume.sh <N> <slug> <delta.md> --music`. The delta says what the owner asked for, keeps everything else, and ends in `build` only. Templates are in `briefs/`:
- `round-poster.md`: frame 0 is the feed thumbnail, so it shows the brand and the topic at a glance.
- `round-logo-morph.md`: the logo transforms through its own anatomy, never through particle dust.

Before you resume, explain to the owner which reels you will resume and with what, and wait for the go. Open each reel in the owner's browser as its round lands.

## 6. Music

1. Stock tracks live in the main checkout's `.music/pixabay/` (gitignored). The owner downloads them; you never download music yourself. Before the run, tell the owner which moods the library is thin on, and what fits best: 1-3 minute instrumental tracks at about 118-130 bpm that hit full energy early, across a few moods (dark cinematic, upbeat house, minimal techno, playful), from the Pixabay Music licence. New tracks get analysed with `python3 $SK/scripts/analyse_tracks.py` (it skips the ones already in `analysis.json`).
2. Pick two tracks for every reel, all 30, by tempo and mood (the topic's mood and the reel's `work/<slug>/beatmap.md`), spreading the library so the set does not repeat one sound, and write them to `$R/music-variants.txt` as `<slug> <m1|m2> <track file>` lines. Avoid the previous issue's picks for the issue reel.
3. `python3 $SK/scripts/swap_music.py <N> <slug> <m1|m2> <track>` builds `<slug>-<m>`: the track from its first full-energy beat, cut to exactly the film's length and faded out over the last 2.5 s, the sound effects kept. A track longer than the film makes the player hold the last frame while the music plays on. `resume.sh --music` rebuilds these after every round.
4. **Gate:** the owner chooses m1 or m2 per reel in the gallery (m1 plays by default). There is no score option anywhere: `stock_music.sh` has already built both variants for every reel, and `export.py` defaults to m1 and refuses `score`.

## 7. Export and hand over

Only when the owner says the set is final, run `python3 $SK/scripts/export.py <N>`. It exports each pick with its chosen audio, sequentially, and copies it to `tmp/issue-<N>/posts/<n>-<slug>/reel.mp4` next to the post text Buffer takes (the issue reel to `posts/0-issue/`). It also copies every reel, named by topic, to `~/Desktop/newsletter-<N>-reels/`, which is where the owner uploads from. Buffer fetches the post copy through jsDelivr, which refuses anything over 20 MB, and the exports run 25-30 MB: re-encode each `posts/<n>-<slug>/reel.mp4` to about 18 MB (`ffmpeg -c:v libx264 -preset slow -b:v 5000k -c:a aac -b:a 160k -movflags +faststart`), keeping the full-quality Desktop copy for direct uploads. `buffer-post.mjs` refuses a file over the limit. Look at one frame of each mp4, then `open` that Desktop folder for the owner.

Nothing from this skill is committed: `tmp/` and `.music/` are gitignored, and the logos and tracks are other people's work borrowed for the post.

## 8. Learnings

Append what was new on this run to `references/learnings.md`, and fold any rule that held into the brief or step where it applies.
