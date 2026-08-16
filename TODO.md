# TODO

## SEO / GEO audit and LLM-optimized serving

Six-phase programme, owner-approved direction (2026-08-07). Phases 1-5 are the audit: (1) technical SEO crawl including legacy-redirect integrity against the `legacy-jekyll` inventory, (2) content and keyword-intent analysis, (3) Core Web Vitals, (4) prioritized report, (5) GEO/AEO: AI crawler policy in robots.txt, llms.txt and markdown surfaces, answer-extraction readiness, and an AI answer audit baseline (query ChatGPT/Claude/Perplexity for the queries the site should own).

Phase 6 — LLM-optimized serving (owner direction, proven pattern from industry startups): serve different, LLM-optimized content to AI crawlers (GPTBot, ClaudeBot, PerplexityBot) — never to Googlebot, so classic SEO cloaking risk does not apply. Staged: first, plain markdown text renditions of key pages served to AI user-agents; then expanded curated LLM-specific content designed for ingestion into training and RAG corpora, richer than the human pages. Requires an edge layer in front of GitHub Pages (Cloudflare Worker routing by user-agent); the markdown renditions can be generated at build time from the same MDX sources.

Moving the nameservers to Cloudflare would also allow **real 301 redirects** for the legacy `/mle/N.html` URLs, configurable through the Cloudflare API once keys are available. GitHub Pages can only serve the current meta-refresh redirect pages, which Google documents as permanent redirects, so this would be an improvement rather than a repair.

## Principles prev/next: sticky sub-navbar with directional slide

The principle pages carry prev/next only at the bottom, and the transition does not read as progression. Move the controls into a sticky sub-navbar in the same spirit as the newsletter issue navigation, always reachable, and animate the change directionally: on next, the current principle text exits to the left while the next enters from the right; reversed on previous. Audit the Motion table entry for "Principle directional slide" when doing this. The current markup also uses ASCII-arrow link text, which the conventions forbid.

## Production ML list: category modal and monthly sync

Presentation follow-up to the on-domain catalogue: clicking a category card should open that category's libraries in a modal or in-place expanded panel rather than rendering as one long list below the fold. The full list must stay server-rendered in the DOM (hidden-until-click is fine and stays crawlable) since on-domain crawlability is the whole point of the catalogue. The monthly refresh half is done and shipped as `.github/workflows/catalogue-sync.yml`; it needs an `AUTOMATION_TOKEN` repository secret before its pull requests can auto-merge.

## PR #12 decision — hero-parallax exploration

Six homepage scroll-effect variants sit in the open PR #12, paused for owner decision: pick a variant to land or close the PR.

## Hero family: coverage, variation and primitive extraction

Owner review 2026-08-12: most page heroes are boring, especially the ones with no canvas animation behind them; even among the animated ones only a subset (the policy canvas notably) land well. This is a site-wide programme, deliberately decoupled from the blog build. Scope to design with owner:

- Coverage: the `ArticleHero` pages without any canvas variant read as hero-less; decide which of the 21 utility pages earn a canvas (existing scenes: kaos, kompute, policy, open-source, generic) and whether new cheap scenes are worth building.
- Quality: audit the existing canvas scenes against the policy one the owner rates; upgrade or retire the weak ones.
- Variation: the flagship `Hero` cycles three scenes (planes, sphere, contour) but every surface gets the same default; consider per-surface defaults and deterministic per-post scene seeding (hash of slug picks scene and parameters) so repeated visits do not feel identical. Seeding must stay deterministic for the screenshot gates.
- Structure: extract shared hero primitives (status pill, glitch title line, typewriter subtitle, canvas mount) as owned components composed by both `Hero` and `ArticleHero`, so fixes propagate without unifying the two species into one prop-matrix mega-component (rejected 2026-08-12: it couples 25 surfaces into one blast radius).
- Interactive graph widgets (owner ask 2026-08-12): explore hero widgets, possibly 3D, that are interactive graphs in the spirit of the visualisations on https://www.theforecastingcompany.com/en, which the owner rates highly. The reference's graphs are client-rendered and not inspectable from fetched markup, so the exploration must start with the owner walking through the reference (screenshots or live) to pin down which behaviours appeal, per the no-unseen-design-references rule, before any prototyping.

## Blog landing redesign

The archive shipped with an interim showcase (2026-08-13): flagship hero, featured latest card, and a ScrollStage sweep where each post's featured image fills the container behind a right-aligned translucent card column (70% dim, 80px edge fade, talks-reel spacing). Owner verdict: acceptable to ship, not yet good. Revisit properly alongside the hero family programme: explored and rejected so far are a boxed split layout, a mid-screen gradient with backdrop blur, and per-card floating fade boxes; candidate directions include per-post canvas scenes, tag filter chips, and a series shelf. Design with owner in the loop from mockups, not iterations on the live page. Batch into the next visual pass (SEO session finding 2026-08-14): the two mono-9 labels in `pages/blog/[slug].astro` (series-nav and related eyebrow) predate the owner's mono-10 ruling on the AI-RFX criteria table and should be bumped with owner review.

## Blog follow-up: proactive weekly content proposals

A recurring workflow (weekly cadence) that proposes blog content to publish: candidate topics or drafts sourced from the newsletter archive, the talk backlog, the backfill ledger, and current discussion threads, delivered as draft posts or a proposal list for owner triage. The scheduling substrate already exists (undated drafts plus future-dated publishing with the daily deploy cron), so this is purely the generation/proposal side. Owner decision needed on delivery form (PR with draft posts vs a proposal doc) before building.

## Blog follow-up: byte-sized opinions (Fowler-style bliki)

Explore a Martin Fowler bliki-style stream of short opinion posts alongside full articles: byte-sized takes (a few paragraphs) with permalinks, published frequently. Open design questions: same collection with a `kind`/length distinction vs a separate collection, how they appear in the archive and RSS, and whether they feed the weekly-proposals workflow above as its lightest-weight output.

## Blog posts to write

Queued posts for the new blog. Each lands as an undated draft or future-dated entry through the normal publish flow; the list will grow.

- Production ML Across 2015-2035, written properly (owner call 2026-08-14): the pilot post was a lightly adapted newsletter section and was removed rather than shipped. Write it as a full standalone piece from the PyCon DE & PyData 2026 talk (https://www.youtube.com/watch?v=I1GvlW1H4WI), with its own structure, stills or diagrams from the talk as images, and the recovered prose (git history of the removed post folder) as raw material. Coordinate with the Issue 400 entry below so the newsletter and post link rather than duplicate.
- Announcement: the newsletter redesign and the new RSS feed (PR #69). Cover the rebuilt archive under the Astro site and the feed addition; publish once the blog itself is live and linked.
- Production ML monitoring, conceptual rewrite (owner call 2026-08-12): not a 1-1 republication of the 2020 KDnuggets/TDS piece because its Seldon Core implementation is archive tech; write a version centred on the concepts (outliers, drift, explainers, statistical performance) that references the KDnuggets and Towards Data Science originals.
- The top risks posed by AI and how to safeguard against them: the 2020 ITProPortal piece is dead on the live web (Wayback only); rather than recover it, treat the topic as a fresh post updated for the frontier-AI era.
- AI policy engagement highlights (owner call 2026-08-12): the ACM US & Europe AI Principles and the UK AI policy adoption proposals were briefly imported as external-link cards and rejected; the blog carries no link-only entries. Write a post that discusses both engagements in more detail and links or features the LinkedIn announcements and the underlying documents.
- Per-project posts for the open-source portfolio (owner call 2026-08-12): the GitHub repos do not enter the blog as feature-cards; instead each major project (Kompute, awesome-production-machine-learning, the regulation list, KAOS, fml/sml-security, the agentic lists) earns an authored post that tells its story and backlinks the repo and its existing /open-source/ page.
- Announcement: monokai-institute.nvim (owner call 2026-08-15, future-dated slot): a Neovim colorscheme in the Institute's visual language — signature teal `#5ee6a0` on black for dark mode, a warm sage light mode, truecolor with 256-color degradation, treesitter/LSP-aware highlights, Apache 2.0. Frame it as the brand identity extending into the editor; backlink https://github.com/EthicalML/monokai-institute.nvim and include screenshots of both modes.
- The Institute redesign, from a technical Astro/UI perspective (owner call 2026-08-15): the story of the Jekyll-to-Astro cutover and the visual programme that followed — content collections, the date-driven blog publish flow with the daily deploy cron, the pixel-parity verification gate, the scroll-collapse header and outlined-logo brand work, canvas hero scenes, and the performance passes (LCP, CSS split, per-page payload budgets). An engineering write-up, not a launch announcement.

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

## Issue 400: the Production ML Across 2015-2035 talk

Written and cut from issue 399 at the last minute to make room for the HackerNoon series feature and the website relaunch. It is the PyCon DE & PyData 2026 talk, https://www.youtube.com/watch?v=I1GvlW1H4WI, covering production ML from 2015 to 2035: the 2015-2023 evolution and the shift of engineering effort from training to inference and the application layer, then monitoring, stack alignment, shorter production timelines, autonomous operational patterns, platform complexity and operational debt. The recovered full section was briefly a pilot blog post, removed 2026-08-14 pending a proper write-up (see the blog queue); the prose survives in the git history of `src/content/blog/2026-08-12-production-ml-across-2015-2035/index.md` on the feat/blog-imports branch and of `src/content/newsletter/399.md`. Coordinate issue 400 with the queued blog post so the two link rather than duplicate.

## Low priority — event banner artwork loads eagerly

The talks page has only five `<img>` elements, all correctly lazy and none above the fold, but the event banners render their artwork as SVG `<image href>`, and SVG images have no `loading` attribute. Every banner in the archive therefore fetches on load, so a visitor who never scrolls past the fold still pays for all of it — measured at roughly 2.3 MB of conference artwork on `/talks-and-events/`.

Fixable without changing anything anyone sees: render the photograph as an HTML `<img>` layer behind the generated SVG rather than inside it, or gate the banner on an `IntersectionObserver`. The generated ground and motifs are cheap and can stay eager; it is only the remote photograph that is worth deferring.

Explicitly NOT in scope: the reel mounts the active talk's player eagerly, which costs about 1 MB and sets two third-party cookies before any interaction. That is deliberate — it is what makes pressing play instant — and the owner has decided to keep it (2026-08-10). Do not "optimise" it away.

## About page: bespoke People treatment

The People section shipped in PR #74 renders plain 120px portraits beside prose bios because the site has no prose-image vocabulary at all. Design a proper owner-validated treatment for the about-page bios (portrait framing, layout, possibly cards), and replace Lucy Yu's placeholder headshot with an owned image when supplied.

## Network page: validate and refresh the member roster

Owner call 2026-08-12: validate what the network page claims and actually update and add the members — the copy predates the relaunch, and the roster needs real entries plus a maintenance path for keeping them current.
