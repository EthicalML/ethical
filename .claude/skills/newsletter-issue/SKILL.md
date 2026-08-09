---
name: newsletter-issue
description: Draft the weekly ML Engineering newsletter issue under src/content/newsletter/. Use when asked to write, draft or prepare the next newsletter issue, or when given a set of article URLs to turn into an issue. Covers sourcing candidates from Hacker News, grounding each article, drafting the five sections in the author's voice, and generating the summary and tags.
---

# Weekly newsletter issue

Produce the next issue of the ML Engineering newsletter: five article sections plus frontmatter, with the boilerplate carried forward. The owner reviews and publishes; never commit or open a PR unless asked.

Read `references/selection.md` before choosing articles and `references/style.md` before writing any prose. Both are mined from the corpus and are the authority on taste and voice.

## 1. Establish the inputs

The common case is that the owner supplies five URLs. Then skip to step 3.

Otherwise sourcing is needed. Ask which mode applies if it is not obvious. Confirm the issue number and date rather than assuming: `node scripts/newsletter/new-issue.mjs` derives them (next issue number, previous date plus seven days).

Also ask whether an own-project campaign is running. If not, own-project content is excluded (`references/selection.md`, self-promotion).

## 2. Source candidates

```
node scripts/newsletter/candidates.mjs fetch --days 7 --min-points 40
```

This queries Hacker News, drops every URL the newsletter has already linked, and merges results into the persistent pool at `scripts/newsletter/data/candidates.json`. The pool is the backlog: entries stay `pool` until marked, so a thin week can draw on earlier ones. `node scripts/newsletter/candidates.mjs list --limit 40` shows the ranked pool without fetching.

The fetch filter is recall-oriented and will surface AI-adjacent opinion posts with no engineering substance. Apply the 15 scoring rules in `references/selection.md` yourself; that judgement is not in the script. In particular check the mix, cap arXiv and big-lab releases at one each, and reject two picks from the same host.

Present about 12 candidates to the owner with points, comments, age, host and a one-line reason, and let them pick the five. Do not pick unilaterally.

Anything considered and not chosen stays in the pool for later weeks. Mark clear rejects so they stop resurfacing:

```
node scripts/newsletter/candidates.mjs mark rejected <url>
```

## 3. Ground each article

Never write a paragraph from the title alone. For each of the five URLs, capture the specifics into `tmp/issue-<N>/<slug>.md`, where `<slug>` is the last meaningful path segment of the URL. Record what was released or found, the concrete numbers, the architecture or method, and the stated limitations. These are notes, not prose. Head each file with a `Tier:` line naming which fetch tier succeeded, so a weak source is visible later rather than resting on the drafter's honesty.

Fetch order:

1. `WebFetch` on the URL.
2. arXiv: fetch the `/abs/` page; read the PDF with the `Read` tool only if the abstract is not enough.
3. PDFs: `Read` with a page range.
4. Blocked or JS-only pages (Medium-hosted engineering blogs, X, some vendor sites): use the `claude-in-chrome` skill against the owner's logged-in browser.
5. YouTube: use the description and any transcript; do not invent claims about video content.

Tier 4 needs the Chrome extension connected. It often is not. When it is unavailable, that tier simply does not exist: do not silently fall through to secondary coverage.

Grounding must come from the page being linked. Reporting *about* a release is not grounding for a paragraph that links the release itself; the numbers get garbled in the retelling, and the issue would assert them in the author's voice. A summary may be used to locate a first-party mirror worth fetching, never as the source of specifics.

If a source cannot be retrieved after the fallbacks, stop on that article. Leave its `TODO headline N` placeholder in the file, note the failure in the grounding notes, and draft the other four. Then ask the owner for a replacement URL or for the page contents pasted in. A four-article draft with an honest gap is the correct artifact; five articles where one is built on hearsay is not.

## 4. Draft the five sections

One paragraph each, in the order set by `references/selection.md`: hook first, substance in slots 2 to 4, lighter closer last.

The heading is a short editorial rewrite, not the source's own title: typically three to six words, often `<Actor> on <Thing>` ("Raschka on Kimi K3 Architectures", "Netflix on the LLM-Native RecSys"). It wraps the whole title in one link. Step 6 builds the summary from these headings verbatim, so write them to read well in a comma-joined list.

Per section, from `references/style.md`: open about three of five sections with a colon-lede and the rest on a short exclamation or question; use the mined openers and hedges; close on an editorial beat. No bullets, no second link to the same source, none of the banned words.

Aim for about 789 words of article prose across the issue, with real variance between sections. The median section is 158 words but the corpus runs from 31 to 291: five sections all landing near 160 reads more uniform than anything the author has actually published.

Exclamation marks and semicolons belong mid-paragraph, not only in the opener. The corpus rate is 0.92 exclamations and 0.69 semicolons per section, so an issue should carry roughly four or five of each. Hitting the lede ratio alone leaves the draft measurably flatter than the real voice.

Attribute claims to the source ("they claim", "OpenAI estimates", "the research found") rather than asserting vendor numbers as fact.

## 5. Assemble the file

```
node scripts/newsletter/new-issue.mjs
```

This writes `src/content/newsletter/<N>.md` with the preamble, events, open-source and about sections copied verbatim from the previous issue, and placeholders for everything authored. Replace the placeholders.

The weekly list mirrors the five headings but inverts the link convention: headings link the whole title, bullets link only part of the phrase. Keep the three fixed trailing bullets the scaffold emits; the backslash in `\+ more 🚀` is required Markdown escaping, not a typo.

Carried forward is not the same as still true. Check the events list against the new issue date and drop anything that has already happened, since the scaffold copies it blind.

## 6. Frontmatter

`summary`: the five headings verbatim, comma-joined, plus ` + more 🚀`. Shorten a heading only if it is genuinely too long.

`tags`: at most 3 from `NEWSLETTER_TAGS` in `src/content.config.ts`. Choose them directly from the five articles, weighted on the recent era, not all-time totals: `llms` and `ai-agents` dominate, `mlops` has declined, and `ai-ethics`, `explainability`, `privacy`, `computer-vision` have not been used recently.

## 7. Verify and hand over

```
node scripts/newsletter/style-corpus.mjs --lint src/content/newsletter/<N>.md
npx prettier --write src/content/newsletter/<N>.md
npm run check
```

The lint reports the mechanical style rules and the distributional ones; fix every error and justify any warning left standing. Run Prettier in `--write` mode rather than `--check`: hand-edited YAML with an apostrophe in it will otherwise fail a round trip for no reason. `npm run check` must pass; the schema rejects an unknown tag or more than three.

Then show the owner the five drafted sections, flagging any article whose grounding notes recorded a weak or failed fetch tier. Stop there. Publishing is the owner's call.

## 8. After the owner publishes

Record the picks so they never resurface, and clear anything considered but not used:

```
node scripts/newsletter/candidates.mjs mark used <url>...
```

Do not run this before publication.

## Refreshing the references

`references/style.md` and `references/selection.md` are curated from mined output, not generated. Re-run `node scripts/newsletter/style-corpus.mjs --issues 40` and re-curate when the voice drifts. Keep the window at 40 issues: over the full archive the style statistics describe an older voice.
