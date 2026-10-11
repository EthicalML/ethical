---
name: newsletter-issue
description: Draft the weekly ML Engineering newsletter issue under src/content/newsletter/. Use when asked to write, draft or prepare the next newsletter issue, or when given a set of article URLs to turn into an issue. Covers sourcing candidates from Hacker News and Reddit, grounding each article, drafting the five sections in the author's voice, scouting new events and open CFPs for src/content/events.yaml, and generating the summary and tags.
---

# Weekly newsletter issue

Produce the next issue: five article sections plus frontmatter, boilerplate carried forward, and an events scout alongside. You are the orchestrator: the context-heavy steps run as subagents that read a workflow file from `workflows/` and return a compact result — spawn them with the Agent tool, tell each which file to read, and keep the fetching out of your own context. The owner publishes; never commit or open a PR unless asked.

## 1. Establish the inputs

Run `node scripts/newsletter/new-issue.mjs --dry-run` to get the issue number and date. State both to the owner before continuing.

Then kick off the events scout in the background so it runs while the issue is drafted: spawn a subagent with the prompt "Read .claude/skills/newsletter-issue/workflows/events-scout.md and execute it for issue <N>." Its report is picked up at step 10.

Determine which mode applies for the articles:

- The owner supplied the five URLs. Go to step 3.
- No URLs supplied. Go to step 2.

The owner often supplies links collected during the week, in one of two modes. Ask which applies when it is not stated:

- **Use these** — the URLs are the issue. Go to step 3.
- **Consider these too** — the URLs join the pool and compete with everything else. Add them, then go to step 2:

  ```
  node scripts/newsletter/candidates.mjs add <url>...
  ```

A link to a LinkedIn or X post is a pointer, not a source: resolve it to the artifact it points at, and score that. Fall back to the post itself only when the commentary is the substance.

## 2. Source candidates

Spawn a subagent with the prompt "Read .claude/skills/newsletter-issue/workflows/source-candidates.md and execute it", naming any owner-supplied URLs that joined the pool. It fetches and skims the pool and returns a factual digest of ~25 candidates — facts only, no verdicts. The scoring judgement stays here with you.

Read `references/selection.md` in full, score the digest against its rules, and cut to the 15 strongest.

Resolve every link against `scripts/newsletter/data/candidates.json`, copied verbatim. Never complete a URL from memory; a row the pool cannot resolve goes back to the subagent as a digest defect.

Write the shortlist to `tmp/issue-<N>/shortlist.md` — the owner reviews it as a file, not as chat output. It carries four parts:

1. A table of the 15, each row with the digest facts: source, points (or `—`), age, host, kind and word count.
2. One paragraph per entry on what it argues and why the actor matters, flagging own content and anything thin. Every title is a link to its URL, in the table and in the paragraphs, with the description starting on its own line and a blank line between entries — the owner reviews by clicking through and annotating between them.
3. A recommended five with a slot role each (hook, substance, substance, substance, closer), followed by a cap and mix check that names every rule the set touches: host clustering, the research-paper and model-release caps, the opinion and production-engineering slots, video count, adjacent-beat count, own-content cap, recency and repeat subjects. State any rule the recommendation deliberately breaks and why, and give the swap that would satisfy it.
4. The cut list: everything skimmed but dropped, one line each with the reason, so the owner can pull one back.

Then summarise in chat and link the file. The owner cuts to five, and those five go to step 3. Never pick unilaterally: the recommended five is a recommendation, and own content never enters the final five without an explicit yes.

After the cut, mark the clear rejects so they stop resurfacing:

```
node scripts/newsletter/candidates.mjs mark rejected <url>...
```

Everything else stays in the pool for later weeks.

## 3. Ground each article

For each of the five URLs, write `tmp/issue-<N>/<slug>.md`, where `<slug>` is the last meaningful path segment of the URL. Start the file with a `Tier:` line naming which fetch tier below succeeded, then record what was released or found, the concrete numbers, the architecture or method, and the stated limitations. Notes, not prose.

Fetch tiers, in order:

1. `WebFetch` on the URL.
2. arXiv: the `/abs/` page; read the PDF with `Read` only if the abstract is insufficient.
3. PDFs: `Read` with a page range.
4. Blocked or JS-only pages: the `claude-in-chrome` skill against the owner's logged-in browser. This tier requires the Chrome extension to be connected. When it is not, the tier does not exist.
5. YouTube: the description and any transcript. Make no claims about unwatched video content.

Ground only from the page being linked. Reporting _about_ a release is not grounding for a paragraph that links the release itself. A summary may be used to locate a first-party mirror worth fetching, never as the source of specifics.

When a source survives every tier unread, stop on that article: leave its `TODO headline N` placeholder in the file, record the failure in the grounding notes, draft the other four, and ask the owner for a replacement URL or the pasted page. A four-article draft with an honest gap is the correct artifact.

## 4. Draft the five sections

Read `.github/instructions/voice.instructions.md` and `references/style.md`, both in full. The first is the shared core the blog and the newsletter both obey; the second is the newsletter's own shape and register, and it never relaxes the first. Then write one paragraph per article, ordered hook first, substance in slots 2 to 4, lighter closer last.

Headings are short editorial rewrites of three to six words, not the source's own title, often `<Actor> on <Thing>` ("Netflix on the LLM-Native RecSys"). Each wraps its whole title in one link. Step 6 joins them into the summary, so write them to read well in a list.

Constraints, all from `references/style.md`:

- About 789 words of article prose across the issue, with real variance between sections. The median section is 158 words and the corpus runs 31 to 291; five sections near 160 is more uniform than anything published.
- Roughly three of five sections open on a colon-lede, the rest on a short exclamation or question.
- Exclamation marks and semicolons belong mid-paragraph, not only in the opener: about four or five of each per issue.
- No bullets, no sub-headings, no second link to a source already in its heading, none of the banned words or constructions.
- Close every section on an editorial beat.
- Attribute claims to the source ("they claim", "OpenAI estimates") rather than asserting vendor numbers as fact.

## 5. Assemble the file

Run `node scripts/newsletter/new-issue.mjs` to write `src/content/newsletter/<N>.md`, then replace the placeholders.

The weekly list mirrors the five headings and inverts their link convention: headings link the whole title, bullets link only part of the phrase. Keep the three fixed trailing bullets; the backslash in `\+ more 🚀` is required Markdown escaping.

Reconcile the events list against `src/content/events.yaml` in both directions: drop what has already happened, and add any tracked future event the block is missing. The scaffold copies the block forward blind, so an event added to the yaml later never arrives on its own. Speaking slots go under the speaking heading, the rest under other relevant events, sorted by date.

Keep the `/talks-and-events/` backlink paragraph that sits under the events lede; every issue carries it so a reader who lands on an issue through search can reach the talks and events page. The scaffold carries it forward with the rest of the events block, so this is a check rather than an edit:

```
You can also find our upcoming events and past talk recordings on the [talks and events page](/talks-and-events/).
```

## 6. Write the frontmatter

`summary`: the five headings verbatim, comma-joined, plus ` + more 🚀`. Shorten a heading only if it is genuinely too long.

`tags`: at most 3 from `NEWSLETTER_TAGS` in `src/content.config.ts`, chosen from the five articles and weighted on the recent era rather than all-time totals. `llms` and `ai-agents` dominate; `mlops` has declined; `ai-ethics`, `explainability`, `privacy` and `computer-vision` are unused recently.

## 7. Verify

```
node scripts/newsletter/style-corpus.mjs --lint src/content/newsletter/<N>.md
npx prettier --write src/content/newsletter/<N>.md
npm run check:voice
npm run check
```

Fix every lint error and justify any warning left standing. Prettier runs in `--write` mode because hand-edited YAML fails a `--check` round trip on an apostrophe alone. `npm run check` must pass; the schema rejects an unknown tag or more than three.

A link that 404s against the issue worktree is not yet a broken link. The worktree is branched from a point in master's history, so a page added after that point is legitimately absent from it and from any dev server running out of it. Before treating a failure as real, re-check the URL against current master (`git ls-tree -r --name-only origin/master src/content/blog/` for a post, or a dev server on a worktree branched from a fresh `origin/master`). This cost issue 400 a follow-up PR: the owner's link to the new phase announcement was correct, the post had landed on master after the worktree was cut, and the 404 was taken as proof the link was wrong.

The rule behind it generalises. When your own check contradicts what the owner wrote, the first hypothesis is that the check is wrong, not the copy. Rewriting an owner's line is a last resort that needs the failure reproduced against master and reported to them, not a silent correction folded into a commit.

## 8. Collect the post images

Each article is posted to social separately, as an image post: the section prose exactly as published, the source link on the last line, and a picture that is the post rather than a preview attached to it. This step gathers the picture candidates.

```
node scripts/newsletter/fetch-images.mjs --issue <N>
```

It reads the five article headings out of the assembled issue, so it runs after step 5 and not before, and it takes the post text from the same place. For each article it collects the site's og and twitter images, a page-1 render where the link is a paper or a PDF, the largest images on the rendered page, and three screenshots off one page load: the hero, the biggest figure cropped to itself, and a mid-article frame. The screenshots are the floor, and the figure shot is the only thing here that catches a diagram drawn as inline SVG or canvas. Logos and funder strips sort last rather than out. Articles run concurrently. Everything lands in `tmp/issue-<N>/images/` and is listed in `tmp/issue-<N>/posts.md`.

Choose nothing, and write nothing. The document exists to be annotated by the owner, two fields per article: `Choice:` for the picture (a candidate number, `gif`, a path or URL of his own, or `skip`) and a `Text:` fence pre-filled with the section as published plus the link on the last line. Hand it over at step 10 alongside the sections.

Once it comes back annotated:

```
node scripts/newsletter/fetch-images.mjs --apply --issue <N>
node scripts/newsletter/capture-gifs.mjs --issue <N>
```

`--apply` writes `tmp/issue-<N>/posts/<n>-<slug>/` holding `post.txt` and the chosen image, ready to drag into Buffer's composer. The text comes from the document rather than from the issue, so an owner edit survives a re-run; the issue only supplies the pre-fill. An empty `Short:` fence (X and Bluesky) means derive: the first line of the edited text plus the link. Nothing is cropped programmatically, so a short over X's 280 comes back as an open item for you to crop with judgement. That 280 counts the link as well as the text, so budget against the URL's length rather than the prose alone.

Because `--apply` reads the document and not the issue, the two drift apart the moment either one is edited, and the drift is silent in both directions. Rewrite a section in the issue and `posts.md` still holds the old wording, so the post goes out as the draft you replaced. Take an owner edit out of `posts.md` and the issue still holds yours. Whenever either side changes, sync the other in the same turn and say which file you edited, so the owner knows where to make the next change.

The `Short:` fence is a third copy with the same problem and no link back to the other two: editing a `Text:` fence does not touch the `Short:` under it, so a reworked lede leaves every short still carrying the old one. Re-derive the shorts whenever the text changes.

A host that answers bot checks with an interstitial is reported as `page render blocked by <host>` and contributes no candidates, rather than handing back a screenshot of the block notice. Medium does this and a Chrome-channel retry does not always beat it, so treat the line as a prompt to go and get the pictures yourself: load the article in a browser that does get through, read the figure URLs off the rendered page, and pull them from the CDN at full width. Those figures are usually better than any screenshot would have been, because they are the author's own diagrams.

`Choice:` is parsed strictly: a bare integer, `gif`, `skip`, a path or a URL, and nothing else on the line. An owner writing "image 4 but without the cookie banner" is normal and useful, so read the intent, do the work it asks for, put the bare value on the `Choice:` line, and keep their wording on a separate line underneath where the parser will not see it.

`capture-gifs` records a scroll-through for every article marked `gif`, in parallel, and writes two files per article: an `image.mp4` carrying the walk at the full 1280x800 and full frame rate, and an `image.gif` of the same walk squeezed under a 5 MB cap. Upload the mp4 wherever video is accepted, which is most places; a GIF has no interframe compression and a 256-colour palette, so holding one under a cap costs frame rate, pixels and gradients, and it shows on an eased scroll over a dark page. It drives the `site-capture` skill's engine, found through `--engine`, then `SITE_CAPTURE_ENGINE`, then the installed skill, so no path into a personal install is ever committed. That engine always loads the site root before handing over to a flow, so `scripts/newsletter/capture-flow.mjs` navigates to the article first and marks the moment it lands; the runner trims everything before that mark. A walk that opens on somebody's homepage means the mark was lost, not that the URL was wrong.

Buffer's API is not involved and nothing is hosted, because its assets attach by public URL and must stay reachable until the post publishes, which a local file cannot do.

Nothing from this step is ever committed. `tmp/` is gitignored, and these images are somebody else's artwork borrowed for the length of one post.

## 9. Offer motion reels (optional)

A post can carry a short motion reel instead of a still, and the issue as a whole can get one main video. Both are optional and both cost real money, so this step starts with a proposal rather than with work. Offer the owner a main issue video and a reel for each post that would gain from one, each as a one-line concept naming the mechanism it would act out, and build only what he says yes to. A post whose best picture is already a strong figure does not need a reel; say so rather than proposing one.

Lay out the working folder once per issue:

```
node scripts/newsletter/reels/setup.mjs --issue <N>
```

It creates `tmp/issue-<N>/reels/` with the shared `vendor/` every reel references (the preview scaler, the Sound buttons, three.js, and links to the procedural audio library of the `z-motion-reel` skill), the review gallery and a Python venv for the sound scripts. The audio library is found through `--audio-lib`, then `REEL_AUDIO_LIB`, then the newest installed skill, and is linked rather than copied, so nothing of it is ever committed. Setup stops with a clear message when uv, ffmpeg or the library is missing; install the missing piece rather than working around it.

Each reel gets its own folder under `tmp/issue-<N>/reels/` and its own worker. A post gets three folders, `<n>a`, `<n>b` and `<n>c`, each with a different direction from the style menu chosen to suit that post's content, because the owner picks between finished options far better than he describes a look in advance. Put `post.txt`, the post's current picture as `image.*`, and the source's logos and site screenshots under `assets/` into each folder before the worker starts. The main video gets one folder with the issue's five sections as `issue.md`.

Every worker is a durable headless Opus session, launched from inside its own folder so its working directory is the reel:

```
cd tmp/issue-<N>/reels/<folder>
nohup command claude -p "$(cat brief.md)" --model claude-opus-5-5 --permission-mode auto --output-format json > ../<folder>.log 2>&1 &
```

Build each `brief.md` from `references/reels.md`: the shared reel contract, then the post reel brief or the issue reel brief, then the one style paragraph that worker gets. Give each about 35 minutes. Launches fail silently, so a minute after starting them, check that the processes are alive and the logs exist before telling the owner they are running.

Review happens on the live HTML, never on mp4s, which take minutes each and show nothing the page does not. Serve the reels folder over http and give the owner the gallery link, one post's three styles side by side:

```
cd tmp/issue-<N>/reels && python3 -m http.server 8765
```

```
http://localhost:8765/gallery.html?reels=<n>a,<n>b,<n>c&cols=3
```

Feedback goes back as rounds. When a worker has finished, resume its own session with a short delta rather than starting a fresh one, so it keeps everything it learned about its reel; the session id is in the JSON its log ends with. Never interrupt a worker that is still running: wait for it to finish, then resume.

```
cd tmp/issue-<N>/reels/<folder>
nohup command claude --resume <session_id> -p "<delta>" --permission-mode auto --output-format json > ../<folder>-r2.log 2>&1 &
```

Sound comes last and only for the reels the owner picks. Resume each picked worker with the sound brief from `references/reels.md`; it writes three soundtracks, `audio-a.mp3` to `audio-c.mp3`, which appear in the preview as Sound A, B and C buttons, and the owner chooses one by listening in the gallery. Copy the chosen one to `audio.mp3` in the reel folder and render, all picks in parallel:

```
cp audio-b.mp3 audio.mp3
node ../../../../scripts/newsletter/reels/render.mjs .
```

The renderer reads the size from the page, muxes `audio.mp3` in, and writes `reel.mp4` in the reel folder, an H.264 file Buffer accepts. Point that post's `Choice:` at it (`tmp/issue-<N>/reels/<folder>/reel.mp4`) and re-run `--apply`, which copies it into the post folder as `image.mp4` for Buffer.

Be honest about the cost when proposing. Twelve post workers over three rounds, plus sound for the picks, cost about $109 on 2026-10-11. Three styles is the default for a post that genuinely benefits from motion; propose one, or none, when it does not.

## 10. Hand over

The scout reads whatever checkout it runs in, which is usually the main one and is often behind `origin/master`. Its carry-forward claims about what is "still unmerged" are therefore claims about that checkout, not about master: check each one against `origin/master` before repeating it to the owner. Its ledger writes land there too, so they have to be carried into the issue worktree (as a patch, since the file's base may differ) or they are lost when the branch merges.

Show the owner one review document: the five drafted sections, flagging any article whose grounding notes recorded a weak or failed fetch tier, followed by the events scout report from `tmp/issue-<N>/events-scout.md` — tracker update recommendations, proposed additions, proposed updates, and the rejects it dropped. If the scout found nothing, say so; an empty week is normal. If the scout has not returned yet, hand over the sections and bring the events report as soon as it lands. Link `tmp/issue-<N>/posts.md` in the same handover so the pictures are chosen in one pass with everything else, and when step 9 built reels, the gallery link for each post's styles and the main video alongside it.

Stop. Publishing the issue and approving events are both the owner's call, and each event proposal needs its own explicit yes — a comment on one proposal is not approval of the rest.

## 11. Apply approved events

Only for proposals the owner approved:

1. Edit `src/content/events.yaml`: insert approved additions keeping the sort by `start` newest first, and apply approved updates. Carry over any `# unverified` comments from the report.
2. Apply approved tracker recommendations to the `watchlist` in `scripts/events/data/scout-ledger.yaml`.
3. For each new slug: `node scripts/events/fetch-banners.mjs --only <slug>`.
4. If a new event or newly opened CFP belongs in the issue's events block and the issue is not yet published, add it there too.
5. `npm run check` must pass — the schema rejects an unknown topic.

## 12. After the owner publishes

```
node scripts/newsletter/candidates.mjs mark used <url>...
node --env-file=.env scripts/newsletter/backlinks.mjs status --recent 4
```

Do not run these before publication. If the backlink status is incomplete, report the missing platforms and offer to run `node --env-file=.env scripts/newsletter/backlinks.mjs sync --recent 4`.
