---
name: newsletter-issue
description: Draft the weekly ML Engineering newsletter issue under src/content/newsletter/. Use when asked to write, draft or prepare the next newsletter issue, or when given a set of article URLs to turn into an issue. Covers sourcing candidates from Hacker News and Reddit, grounding each article, drafting the five sections in the author's voice, scouting new events and open CFPs for src/content/events.yaml, and generating the summary and tags.
---

# Weekly newsletter issue

Produce the next issue: five article sections plus frontmatter, boilerplate carried forward, and an events scout alongside. You are the orchestrator: the context-heavy steps run as subagents that read a workflow file from `workflows/` and return a compact result — spawn them with the Agent tool, tell each which file to read, and keep the fetching out of your own context. The owner publishes; never commit or open a PR unless asked.

## 1. Establish the inputs

Run `node scripts/newsletter/new-issue.mjs --dry-run` to get the issue number and date. State both to the owner before continuing.

Then kick off the events scout in the background so it runs while the issue is drafted: spawn a subagent with the prompt "Read .claude/skills/newsletter-issue/workflows/events-scout.md and execute it for issue <N>." Its report is picked up at step 8.

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

Spawn a subagent with the prompt "Read .claude/skills/newsletter-issue/workflows/source-candidates.md and execute it", naming any owner-supplied URLs that joined the pool. It fetches, scores and skims the pool and returns a table of the 15 survivors.

Present the 15 to the owner exactly as returned. The owner cuts the 15 down to five, and those five go to step 3. Never pick unilaterally.

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

## 8. Hand over

Show the owner one review document: the five drafted sections, flagging any article whose grounding notes recorded a weak or failed fetch tier, followed by the events scout report from `tmp/issue-<N>/events-scout.md` — tracker update recommendations, proposed additions, proposed updates, and the rejects it dropped. If the scout found nothing, say so; an empty week is normal. If the scout has not returned yet, hand over the sections and bring the events report as soon as it lands.

Stop. Publishing the issue and approving events are both the owner's call, and each event proposal needs its own explicit yes — a comment on one proposal is not approval of the rest.

## 9. Apply approved events

Only for proposals the owner approved:

1. Edit `src/content/events.yaml`: insert approved additions keeping the sort by `start` newest first, and apply approved updates. Carry over any `# unverified` comments from the report.
2. Apply approved tracker recommendations to the `watchlist` in `scripts/events/data/scout-ledger.yaml`.
3. For each new slug: `node scripts/events/fetch-banners.mjs --only <slug>`.
4. If a new event or newly opened CFP belongs in the issue's events block and the issue is not yet published, add it there too.
5. `npm run check` must pass — the schema rejects an unknown topic.

## 10. After the owner publishes

```
node scripts/newsletter/candidates.mjs mark used <url>...
node --env-file=.env scripts/newsletter/backlinks.mjs status --recent 4
```

Do not run these before publication. If the backlink status is incomplete, report the missing platforms and offer to run `node --env-file=.env scripts/newsletter/backlinks.mjs sync --recent 4`.
