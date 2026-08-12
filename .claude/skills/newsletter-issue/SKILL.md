---
name: newsletter-issue
description: Draft the weekly ML Engineering newsletter issue under src/content/newsletter/. Use when asked to write, draft or prepare the next newsletter issue, or when given a set of article URLs to turn into an issue. Covers sourcing candidates from Hacker News and Reddit, grounding each article, drafting the five sections in the author's voice, and generating the summary and tags.
---

# Weekly newsletter issue

Produce the next issue: five article sections plus frontmatter, boilerplate carried forward. Work through the steps in order. The owner publishes; never commit or open a PR unless asked.

## 1. Establish the inputs

Run `node scripts/newsletter/new-issue.mjs --dry-run` to get the issue number and date. State both to the owner before continuing.

Determine which mode applies:

- The owner supplied the five URLs. Go to step 3.
- No URLs supplied. Go to step 2.

The owner often supplies links collected during the week, in one of two modes. Ask which applies when it is not stated:

- **Use these** — the URLs are the issue. Go to step 3.
- **Consider these too** — the URLs join the pool and compete with everything else. Add them, then go to step 2:

  ```
  node scripts/newsletter/candidates.mjs add <url>...
  ```

A link to a LinkedIn or X post is a pointer, not a source: resolve it to the artifact it points at, and score that. Fall back to the post itself only when the commentary is the substance.

Own content — the author's talks, projects and initiatives, and work they are connected to — is eligible and must be surfaced, flagged as own content, never silently dropped.

## 2. Source candidates

Read `references/selection.md` in full. Then:

1. Fetch this week's candidates from all three sources:

   ```
   node --env-file=.env scripts/newsletter/candidates.mjs fetch --days 7 --source hn,reddit,feeds
   ```

   This drops every URL the newsletter has already linked and merges the rest into the pool at `scripts/newsletter/data/candidates.json`. Entries stay `pool` until marked, so a thin week draws on earlier ones.

   Reddit needs `REDDIT_CLIENT_ID` and `REDDIT_CLIENT_SECRET` in the repo `.env`; without them the command warns, skips Reddit and continues on the other sources. Drop `--source` to fetch Hacker News only.

   `feeds` polls a hand-picked table of publisher blogs, so authoritative writing is picked up even when it never trends. Cap each publisher with `--per-feed N` (default 5).

2. Review the ranked pool:

   ```
   node scripts/newsletter/candidates.mjs list --limit 40
   ```

   Add `--source hn`, `--source reddit` or `--source feeds` to list one source. Reddit scores and Hacker News points are not comparable, so read the `src` column before trusting the ranking. Feed entries are unscored and show `—` in `pts`: a publisher blog has no popularity signal at all, which is not the same as a low one, and those entries are ordered by recency instead. Judge them on the article, exactly as the rules require for every other entry.

3. Score every entry against the rules in `references/selection.md`. The `kind`, `company`, `firstParty` and `ownProject` fields are heuristics from the title and host: use them to filter and sort, never to decide.

4. Skim candidates from the top of the ranking until 15 survive the rules. Fetch each one and read enough to answer three questions: what does it actually claim or report, does it develop that idea or only enumerate observations, and who is the central actor. A title answers none of these. Metadata ranks a thin findings dump above a strong argument, and popularity is not a selection criterion at any point.

5. Present the surviving 15 to the owner, each carrying: source, points (or `—`), age, host, kind, word count, the central actor and why they matter, and one line on what the piece argues. Mark anything thin. The owner cuts the 15 down to five, and those five go to step 3. Never pick unilaterally.

6. Mark the clear rejects so they stop resurfacing:

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

Ground only from the page being linked. Reporting *about* a release is not grounding for a paragraph that links the release itself. A summary may be used to locate a first-party mirror worth fetching, never as the source of specifics.

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

Show the owner the five drafted sections, flagging any article whose grounding notes recorded a weak or failed fetch tier. Stop. Publishing is the owner's call.

## 9. After the owner publishes

```
node scripts/newsletter/candidates.mjs mark used <url>...
node --env-file=.env scripts/newsletter/backlinks.mjs status --recent 4
```

Do not run these before publication. If the backlink status is incomplete, report the missing platforms and offer to run `node --env-file=.env scripts/newsletter/backlinks.mjs sync --recent 4`.
