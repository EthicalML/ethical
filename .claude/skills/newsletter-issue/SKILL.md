---
name: newsletter-issue
description: Draft the weekly ML Engineering newsletter issue under src/content/newsletter/. Use when asked to write, draft or prepare the next newsletter issue, or when given a set of article URLs to turn into an issue. Covers sourcing candidates from Hacker News and Reddit, grounding each article, drafting the five sections in the author's voice, scouting new events and open CFPs for src/content/events.yaml, and generating the summary and tags.
---

# Weekly newsletter issue

Produce the next issue: five article sections plus frontmatter, boilerplate carried forward, and an events scout alongside. You are the orchestrator: the context-heavy steps run as subagents that read a workflow file from `workflows/` and return a compact result — spawn them with the Agent tool, tell each which file to read, and keep the fetching out of your own context. The owner publishes; never commit or open a PR unless asked.

## 1. Establish the inputs

Run `node scripts/newsletter/new-issue.mjs --dry-run` to get the issue number and date. State both to the owner before continuing.

Then kick off the events scout in the background so it runs while the issue is drafted: spawn a subagent with the prompt "Read .claude/skills/newsletter-issue/workflows/events-scout.md and execute it for issue <N>." Its report is picked up at step 9.

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

Read `references/style.md` in full. Then write one paragraph per article, ordered hook first, substance in slots 2 to 4, lighter closer last.

Headings are short editorial rewrites of three to six words, not the source's own title, often `<Actor> on <Thing>` ("Netflix on the LLM-Native RecSys"). Each wraps its whole title in one link. Step 6 joins them into the summary, so write them to read well in a list.

Constraints, all from `references/style.md`:

- About 789 words of article prose across the issue, with real variance between sections. The median section is 158 words and the corpus runs 31 to 291; five sections near 160 is more uniform than anything published.
- Roughly three of five sections open on a colon-lede, the rest on a short exclamation or question.
- Exclamation marks and semicolons belong mid-paragraph, not only in the opener: about four or five of each per issue.
- No bullets, no sub-headings, no second link to a source already in its heading, none of the banned words.
- Close every section on an editorial beat.
- Attribute claims to the source ("they claim", "OpenAI estimates") rather than asserting vendor numbers as fact.

## 5. Assemble the file

Run `node scripts/newsletter/new-issue.mjs` to write `src/content/newsletter/<N>.md`, then replace the placeholders.

The weekly list mirrors the five headings and inverts their link convention: headings link the whole title, bullets link only part of the phrase. Keep the three fixed trailing bullets; the backslash in `\+ more 🚀` is required Markdown escaping.

Check the events list against the new issue date and drop anything that has already happened. The scaffold copies it forward blind.

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

Choose nothing, and write nothing. The document exists to be annotated by the owner, two fields per article: `Choice:` for the picture (a candidate number, `gif`, a path or URL of his own, or `skip`) and a `Text:` fence pre-filled with the section as published plus the link on the last line. Hand it over at step 9 alongside the sections.

Once it comes back annotated:

```
node scripts/newsletter/fetch-images.mjs --apply --issue <N>
node scripts/newsletter/capture-gifs.mjs --issue <N>
```

`--apply` writes `tmp/issue-<N>/posts/<n>-<slug>/` holding `post.txt` and the chosen image, ready to drag into Buffer's composer. The text comes from the document rather than from the issue, so an owner edit survives a re-run; the issue only supplies the pre-fill.

`capture-gifs` records a scroll-through for every article marked `gif`, in parallel, and encodes each to a GIF under 5 MB. It drives the `site-capture` skill's engine, found through `--engine`, then `SITE_CAPTURE_ENGINE`, then the installed skill, so no path into a personal install is ever committed. That engine always loads the site root before handing over to a flow, so `scripts/newsletter/capture-flow.mjs` navigates to the article first and marks the moment it lands; the runner trims everything before that mark. A walk that opens on somebody's homepage means the mark was lost, not that the URL was wrong.

Buffer's API is not involved and nothing is hosted, because its assets attach by public URL and must stay reachable until the post publishes, which a local file cannot do.

Nothing from this step is ever committed. `tmp/` is gitignored, and these images are somebody else's artwork borrowed for the length of one post.

## 9. Hand over

Show the owner one review document: the five drafted sections, flagging any article whose grounding notes recorded a weak or failed fetch tier, followed by the events scout report from `tmp/issue-<N>/events-scout.md` — tracker update recommendations, proposed additions, proposed updates, and the rejects it dropped. If the scout found nothing, say so; an empty week is normal. If the scout has not returned yet, hand over the sections and bring the events report as soon as it lands. Link `tmp/issue-<N>/posts.md` in the same handover so the pictures are chosen in one pass with everything else.

Stop. Publishing the issue and approving events are both the owner's call, and each event proposal needs its own explicit yes — a comment on one proposal is not approval of the rest.

## 10. Apply approved events

Only for proposals the owner approved:

1. Edit `src/content/events.yaml`: insert approved additions keeping the sort by `start` newest first, and apply approved updates. Carry over any `# unverified` comments from the report.
2. Apply approved tracker recommendations to the `watchlist` in `scripts/events/data/scout-ledger.yaml`.
3. For each new slug: `node scripts/events/fetch-banners.mjs --only <slug>`.
4. If a new event or newly opened CFP belongs in the issue's events block and the issue is not yet published, add it there too.
5. `npm run check` must pass — the schema rejects an unknown topic.

## 11. After the owner publishes

```
node scripts/newsletter/candidates.mjs mark used <url>...
node --env-file=.env scripts/newsletter/backlinks.mjs status --recent 4
```

Do not run these before publication. If the backlink status is incomplete, report the missing platforms and offer to run `node --env-file=.env scripts/newsletter/backlinks.mjs sync --recent 4`.
