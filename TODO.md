# TODO

## SEO / GEO audit and LLM-optimized serving

Six-phase programme, owner-approved direction (2026-08-07). Phases 1-5 are the audit: (1) technical SEO crawl including legacy-redirect integrity against the `legacy-jekyll` inventory, (2) content and keyword-intent analysis, (3) Core Web Vitals, (4) prioritized report, (5) GEO/AEO: AI crawler policy in robots.txt, llms.txt and markdown surfaces, answer-extraction readiness, and an AI answer audit baseline (query ChatGPT/Claude/Perplexity for the queries the site should own).

Phase 6 — LLM-optimized serving (owner direction, proven pattern from industry startups): serve different, LLM-optimized content to AI crawlers (GPTBot, ClaudeBot, PerplexityBot) — never to Googlebot, so classic SEO cloaking risk does not apply. Staged: first, plain markdown text renditions of key pages served to AI user-agents; then expanded curated LLM-specific content designed for ingestion into training and RAG corpora, richer than the human pages. Requires an edge layer in front of GitHub Pages (Cloudflare Worker routing by user-agent); the markdown renditions can be generated at build time from the same MDX sources.

Moving the nameservers to Cloudflare would also allow **real 301 redirects** for the legacy `/mle/N.html` URLs, configurable through the Cloudflare API once keys are available. GitHub Pages can only serve the current meta-refresh redirect pages, which Google documents as permanent redirects, so this would be an improvement rather than a repair.

## OpenSourceShowcase: two dead selectors

`OpenSourceShowcase.css` carries two `.open-source-showcase` rules that match nothing: the component's root is the `open-source-showcase` custom element carrying `.open-source-prototype`. Deleting them is not purely mechanical, because the padding they were meant to apply may be intended and currently comes from elsewhere, so it needs a visually reviewed change rather than a blind removal. Found during the 2026-08-08 colocation pass.

## Improve the search

The search is still not immediate, takes a while to laod
Can we make it such that it displays all and filters progressively?
That way when you open it you could have some of the top recommended pages too
Also i searched "mle 123", and "123" and the MLE newsletter 123 does not come up
So it seems there are still inefficienes herel.

## Principles prev/next: sticky sub-navbar with directional slide

The principle pages carry prev/next only at the bottom, and the transition does not read as progression. Move the controls into a sticky sub-navbar in the same spirit as the newsletter issue navigation, always reachable, and animate the change directionally: on next, the current principle text exits to the left while the next enters from the right; reversed on previous. Audit the Motion table entry for "Principle directional slide" when doing this. The current markup also uses ASCII-arrow link text, which the conventions forbid.

## Production ML list: category modal and monthly sync

Presentation follow-up to the on-domain catalogue: clicking a category card should open that category's libraries in a modal or in-place expanded panel rather than rendering as one long list below the fold. The full list must stay server-rendered in the DOM (hidden-until-click is fine and stays crawlable) since on-domain crawlability is the whole point of the catalogue. The monthly refresh half is done and shipped as `.github/workflows/catalogue-sync.yml`; it needs an `AUTOMATION_TOKEN` repository secret before its pull requests can auto-merge.

## Policy record: full text preview

The reading room renders each publication as page images with the canonical PDF hosted remotely, so the document bodies are the only genuinely uncrawlable content on the site. Add a second action next to the PDF link: a "preview text" control opening the full document text in a modal, converted from the PDF into readable markdown with tables and structure preserved. Extraction quality is the open question: `scripts/fetch-policy-previews.mjs` already downloads and extracts text, so first assess whether that structured output is good enough for tables and headings; if not, evaluate an OCR or document-understanding model, or a one-off subagent extraction pass committed as data. Confirm republication rights for the ACM-published documents before committing full text to the repo.

## Easy optimisation: composed pages ship the whole prose CSS bundle

Every composed MDX page imports through the `src/components/prose/components.js` barrel, and Vite bundles all prose-component CSS into one 110,215-byte chunk, so importing one component ships everyone's CSS. `TalksGrid` proved it: zero consumers, markup never rendered, CSS still in the bundle. `/policy/` and `/open-source/` therefore download 188,709 bytes of CSS against 35,339 for `/privacy/`, roughly 150KB each of stylesheet they never use. Test whether direct component imports on one composed page split the chunk before doing the whole set. This is a serving optimisation with no maintenance benefit, so it only earns time if the fix is close to trivial.

## Newsletter pass (next up)

Owner has ideas for the newsletter beyond the carried-over archive (396 issues live under /mle/, recent-issues rail derives from the filenames, /mle.html redirects to /network/). Scope to be defined by owner.

## PR #12 decision — hero-parallax exploration

Six homepage scroll-effect variants sit in the open PR #12, paused for owner decision: pick a variant to land or close the PR.

## Hero family: coverage, variation and primitive extraction

Owner review 2026-08-12: most page heroes are boring, especially the ones with no canvas animation behind them; even among the animated ones only a subset (the policy canvas notably) land well. This is a site-wide programme, deliberately decoupled from the blog build. Scope to design with owner:

- Coverage: the `ArticleHero` pages without any canvas variant read as hero-less; decide which of the 21 utility pages earn a canvas (existing scenes: kaos, kompute, policy, open-source, generic) and whether new cheap scenes are worth building.
- Quality: audit the existing canvas scenes against the policy one the owner rates; upgrade or retire the weak ones.
- Variation: the flagship `Hero` cycles three scenes (planes, sphere, contour) but every surface gets the same default; consider per-surface defaults and deterministic per-post scene seeding (hash of slug picks scene and parameters) so repeated visits do not feel identical. Seeding must stay deterministic for the screenshot gates.
- Structure: extract shared hero primitives (status pill, glitch title line, typewriter subtitle, canvas mount) as owned components composed by both `Hero` and `ArticleHero`, so fixes propagate without unifying the two species into one prop-matrix mega-component (rejected 2026-08-12: it couples 25 surfaces into one blast radius).
- Interactive graph widgets (owner ask 2026-08-12): explore hero widgets, possibly 3D, that are interactive graphs in the spirit of the visualisations on https://www.theforecastingcompany.com/en, which the owner rates highly. The reference's graphs are client-rendered and not inspectable from fetched markup, so the exploration must start with the owner walking through the reference (screenshots or live) to pin down which behaviours appeal, per the no-unseen-design-references rule, before any prototyping.

## Blog follow-up: proactive weekly content proposals

A recurring workflow (weekly cadence) that proposes blog content to publish: candidate topics or drafts sourced from the newsletter archive, the talk backlog, the backfill ledger, and current discussion threads, delivered as draft posts or a proposal list for owner triage. The scheduling substrate already exists (draft flag plus future-dated publishing with the daily deploy cron), so this is purely the generation/proposal side. Owner decision needed on delivery form (PR with draft posts vs a proposal doc) before building.

## Blog follow-up: byte-sized opinions (Fowler-style bliki)

Explore a Martin Fowler bliki-style stream of short opinion posts alongside full articles: byte-sized takes (a few paragraphs) with permalinks, published frequently. Open design questions: same collection with a `kind`/length distinction vs a separate collection, how they appear in the archive and RSS, and whether they feed the weekly-proposals workflow above as its lightest-weight output.

## Blog posts to write

Queued posts for the new blog. Each lands as a draft or future-dated entry through the normal publish flow; the list will grow.

- Announcement: the newsletter redesign and the new RSS feed (PR #69). Cover the rebuilt archive under the Astro site and the feed addition; publish once the blog itself is live and linked.
- Production ML monitoring, conceptual rewrite (owner call 2026-08-12): not a 1-1 republication of the 2020 KDnuggets/TDS piece because its Seldon Core implementation is archive tech; write a version centred on the concepts (outliers, drift, explainers, statistical performance) that references the KDnuggets and Towards Data Science originals.
- The top risks posed by AI and how to safeguard against them: the 2020 ITProPortal piece is dead on the live web (Wayback only); rather than recover it, treat the topic as a fresh post updated for the frontier-AI era.
- Per-project posts for the open-source portfolio (owner call 2026-08-12): the GitHub repos do not enter the blog as feature-cards; instead each major project (Kompute, awesome-production-machine-learning, the regulation list, KAOS, fml/sml-security, the agentic lists) earns an authored post that tells its story and backlinks the repo and its existing /open-source/ page.

## Blog follow-up: RSS feeds and newsletter cross-publishing

Once the blog ships, give it its own feed at `/blog/rss.xml`, fully separate from a newsletter feed at `/mle/rss.xml` (this absorbs the old deferred "RSS (later)" item): the audiences and cadences differ, both derive trivially from their content collections via `@astrojs/rss`, and nothing is gained by combining them. Separately decide whether new blog posts get surfaced in the weekly newsletter issues (a featured section or link block); that half is editorial, not build work, and needs an owner call on placement and cadence.

## Deferred

- Anti-LLM style pass — needs owner to supply the style guidance it was waiting on, or downgrade to a plain owner-led copy review
- Astro showcase (later)

## Policy/Industry library follow-ups

The toggle library shipped (POLICY: 29 authored + 5 contributed; INDUSTRY: LF AI principles + 5 OWASP guides). Remaining:

- Promote the WGDG Progress Report zero draft (POLICY, CO-FACILITATOR) to the authored record when the final report publishes with attribution.
- Collect the remaining public organisational principles for the INDUSTRY view (the ~10 card names Linux Foundation and UN publicly; Zalando, Capital One, Deutsche Börse and one more are confidential; owner recalls "several others" public).
- LF AI principles entry links an HTML page so it has a placeholder viewer; optionally print-to-PDF at build for a paginated preview.

## Policy record: 30th product

The achievements card and StatBand print "30+" per owner instruction; the record currently holds 29 verified entries. Owner is identifying the 30th authored product (candidate: the AI & Product Liability consultation response, unsigned so it rests on owner confirmation). Add it to `PolicyRecordData.ts` with a rendered preview when named.

## LLM-based survey

I want to follow on from the State of Production ML 2025, but now for 2026. Instead of asking respondents, I want to do a slight twist on this: collect, through research, the ML stack from various companies from their public blog posts, etc. We would be able to build a report based on all of that. Right now, this could be a more meaningful approach as opposed to what could be a biassed survey response.

## Backlink every newsletter issue to the talks and events page

Each issue carries an events block, but nothing in it points back to `/talks-and-events/`, so the archive of talks and the open calls for papers are reachable only from the site navigation. Add a backlink from the events block of every issue — new issues from the template, and the archive in a single pass — so a reader who finds an issue through search lands on the events page rather than a dead end. The events block itself is still hand-maintained copy; generating it from the events collection is the related open item, and doing both in one pass avoids editing 399 issues twice.

## Issue 400: the Production ML Across 2015-2035 talk

Written and cut from issue 399 at the last minute to make room for the HackerNoon series feature and the website relaunch. It is the PyCon DE & PyData 2026 talk, https://www.youtube.com/watch?v=I1GvlW1H4WI, covering production ML from 2015 to 2035: the 2015-2023 evolution and the shift of engineering effort from training to inference and the application layer, then monitoring, stack alignment, shorter production timelines, autonomous operational patterns, platform complexity and operational debt. The recovered full section now lives at `/blog/production-ml-across-2015-2035/`; lead issue 400 by linking to or lightly adapting that post rather than duplicating it.

## Low priority — event banner artwork loads eagerly

The talks page has only five `<img>` elements, all correctly lazy and none above the fold, but the event banners render their artwork as SVG `<image href>`, and SVG images have no `loading` attribute. Every banner in the archive therefore fetches on load, so a visitor who never scrolls past the fold still pays for all of it — measured at roughly 2.3 MB of conference artwork on `/talks-and-events/`.

Fixable without changing anything anyone sees: render the photograph as an HTML `<img>` layer behind the generated SVG rather than inside it, or gate the banner on an `IntersectionObserver`. The generated ground and motifs are cheap and can stay eager; it is only the remote photograph that is worth deferring.

Explicitly NOT in scope: the reel mounts the active talk's player eagerly, which costs about 1 MB and sets two third-party cookies before any interaction. That is deliberate — it is what makes pressing play instant — and the owner has decided to keep it (2026-08-10). Do not "optimise" it away.

## Reveal gate: exempt above-the-fold content from opacity-0

Phase-3 CWV audit (2026-08-12, tmp/report-seo-phase3.md): the inline `[data-reveal]{opacity:0}` rule in BaseLayout.astro gates LCP on JS execution on every route — /privacy/ (ungated) renders content in ~106ms vs 1.4-1.9s elsewhere, and the h1 itself starts invisible. Fix by exempting the first viewport (or gating the rule behind a JS-added class so no-JS renders fully visible), keeping all below-fold reveal motion. Visible motion change: land alone, owner-validated with before/after per AGENTS.md. The prefers-reduced-motion branch already shows the opt-out pattern.

## About page: bespoke People treatment

The People section shipped in PR #74 renders plain 120px portraits beside prose bios because the site has no prose-image vocabulary at all. Design a proper owner-validated treatment for the about-page bios (portrait framing, layout, possibly cards), and replace Lucy Yu's placeholder headshot with an owned image when supplied.

## Network page: validate and refresh the member roster

Owner call 2026-08-12: validate what the network page claims and actually update and add the members — the copy predates the relaunch, and the roster needs real entries plus a maintenance path for keeping them current.
