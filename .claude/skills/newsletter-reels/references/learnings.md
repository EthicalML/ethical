# Learnings

Newest first. Fold a rule into the step or brief where it applies once it has held; keep here why it exists.

## Issue 410 (2026-10-25)

- **Never play the generated score.** The gallery defaulted to each worker's composed score and the m1/m2 stock variants were only built for picks, so the owner reviewed every reel with generated music and the first issue-reel export defaulted to `score`. The owner's rule is absolute: stock tracks only. The gallery now has no score option, export refuses it, and `stock_music.sh` builds both variants for all 30 reels as they land.
- **A stale gallery server serves the wrong issue.** Last week's gallery server was still bound to 8767, the new one died with "Address already in use", and the browser showed 409's reels. Check the port before starting.
- **The issue reel is the one that earns reach.** From Buffer's metrics: the 409 issue reel got ~56k LinkedIn impressions, about 25x the earlier issue posts, while the story reels sat around the image-post median. Only the photo-finish race held viewers (92% of impressions became views against 27-38% for the rest). Briefs now carry both points; the issue reel keeps the 409 skeleton.
- **Pull the issue reel forward.** The owner wanted to post the issue reel as soon as it existed: export it on its own (`export.py <N> --slug <slug>`) once picked, without waiting for the story reels.
- **Workers read their brief at launch,** so a brief edited while the launcher is running reaches every worker not yet started. That is how the motion-reference techniques reached 20 of 30 reels mid-run.

## Issue 409 (2026-10-18), first run

- **Two formats.** The newsletter's own reel posts as LinkedIn's landscape feed video: 1920x1080. The five story reels stay 1080x1350 (the owner confirmed both after comparing against a real LinkedIn post).
- **The issue reel was missed at first.** The newsletter needs its own reel promoting the issue; it is topic `0-issue` and sits at the top of the gallery.
- **Stock tracks end with the film.** A track 2 s longer than the film made the player hold the last frame while the music faded, which read as a frozen ending. swap_music cuts to the film's exact length with a 2.5 s fade-out, and every end card settles inside that window.
- **Logos come from their SVG path, always.** A hand-drawn Meta infinity looked broken; rendering it from the SVG fixed it.

- **Review the HTML, export once.** The owner reviews the live page; mp4 exports happened every round in the first pass and only cost time. Workers and rounds run `build` only; `export.py` runs at the very end.
- **Frame 0 is the thumbnail.** The first picks opened on generic frames. Every opening must show the brand (real logo) and the topic, fully formed at t=0.
- **Logos as SVG vectors, transformed through their anatomy.** Fading a logo in reads cheap. Particle dissolve-and-reform was used by most workers in the first morph round and rejected as "cheap" and "lazy". What won (Mistral): the mark's own pieces move as solid parts into new roles and back. The Netflix N worked once it was built from its three real ribbons.
- **Resume the same worker for every change.** Each round is a short delta to the session that built the reel; it keeps the context and the style.
- **Stagger worker launches.** Starting 10 headless sessions in the same second triggered a burst of login prompts on the owner's machine. Launch 15 s apart, max 10 running. Explain any launch to the owner before triggering it.
- **Open every review URL in the owner's browser** (`open <url>`), never only print it.
- **Music: stock beats composed for most picks.** The owner downloaded Pixabay tracks and chose stock for four of five reels. Start the track on its first full-energy beat, fade out over the last 3 s, keep the sfx. The music library is the gitignored `.music/` in the main checkout.
- **ffmpeg reads stdin.** In a `while read` loop it swallowed the rest of the job list and the loop stalled silently; every subprocess runs with stdin from /dev/null.
- **The gh account matters.** The active `gh` login can be the work account, which cannot create PRs on EthicalML; use the personal token for this repo.
- **Medium blocks fetches, its RSS feed does not.** The feed carries the full text and the figure URLs (miro.medium.com), fetched at full width.
- Cost per worker was about 17 minutes for the first build and 4-15 minutes per round. Don't quote costs to the owner unless asked.
