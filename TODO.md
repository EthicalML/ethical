# TODO

## SEO / GEO audit and LLM-optimized serving

Six-phase programme, owner-approved direction (2026-08-07). Phases 1-5 are the audit: (1) technical SEO crawl including legacy-redirect integrity against the `legacy-jekyll` inventory, (2) content and keyword-intent analysis, (3) Core Web Vitals, (4) prioritized report, (5) GEO/AEO: AI crawler policy in robots.txt, llms.txt and markdown surfaces, answer-extraction readiness, and an AI answer audit baseline (query ChatGPT/Claude/Perplexity for the queries the site should own).

Phase 6 — LLM-optimized serving (owner direction, proven pattern from industry startups): serve different, LLM-optimized content to AI crawlers (GPTBot, ClaudeBot, PerplexityBot) — never to Googlebot, so classic SEO cloaking risk does not apply. Staged: first, plain markdown text renditions of key pages served to AI user-agents; then expanded curated LLM-specific content designed for ingestion into training and RAG corpora, richer than the human pages. Requires an edge layer in front of GitHub Pages (Cloudflare Worker routing by user-agent); the markdown renditions can be generated at build time from the same MDX sources.

## Scope and colocate the last two oversized components

`OpenSourceShowcase.astro` (1,235 lines) and `FormSection.astro` (893) are the two components the simplification pass left oversized, and both are now larger than they were before the CSS breakup: they absorbed their styles from `tokens.css` and then did not qualify for colocation, because each carries a scoped `<style>` block AND an `is:global` one, and a single companion file would erase that boundary.

Measured since: all 19 classes in `OpenSourceShowcase`'s 431-line global block appear in its own markup, so the block does not need to be global. It is global only because the tokens campaign moved it verbatim to guarantee a byte-identical relocation. Its scoped block has three classes that are not in its markup (`kaos-canvas-mount`, `pressed`, `css`), which look like runtime-added or child-canvas classes and are the genuine exceptions.

Do it in two steps with parity proving each: convert the global block to scoped, keeping only the rules that genuinely need to escape, then colocate the whole stylesheet into `OpenSourceShowcase.css` through `@import` in the style block. Check `FormSection` for the same shape. Owner call 2026-08-08: schedule this after the templating pull request merges.

## Bug: the hero canvas animates offscreen

`src/shared/canvas/HeroCycle.ts` owns a requestAnimationFrame loop and correctly handles reduced motion, backing-store resize, frame cancellation and listener teardown, but it has no `IntersectionObserver`. It pauses only when the document is hidden, so the homepage and article hero canvases keep animating while scrolled out of view, burning CPU and battery on every visit. The smallest safe fix adds intersection gating to its existing lifecycle. Migrating it fully onto `CanvasEngine` would delete duplicate resize and pointer plumbing but changes pointer coverage and the cycle clock, so treat that as a separate visually-verified change. Found by the 2026-08-08 canvas contract audit, which cleared every other canvas host.

## Bugs

* When in mobile mode, sometimes when clicking on the menu, the menu disappears / crashes. 

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

## Reveal thresholds: switch from % to fixed pixels

The reveal system (src/shared/Reveal.ts) fires at a percentage of element height (REVEAL_RATIO 0.45, TALL_REVEAL_VH fallback). Owner call 2026-08-06: percentage is the wrong model for most elements — a tall section needs hundreds of scrolled pixels before it fires while a short one fires almost immediately. Switch to a fixed pixel threshold (element reveals once ~N px of it are visible) for most targets, keeping percentage/bespoke behaviour only for the few widgets that need it. Audit the Motion table entries when doing this.

## Newsletter pass (next up)

Owner has ideas for the newsletter beyond the carried-over archive (396 issues live under /mle/, recent-issues rail derives from the filenames, /mle.html redirects to /network/). Scope to be defined by owner.

## PR #12 decision — hero-parallax exploration

Six homepage scroll-effect variants sit in the open PR #12, paused for owner decision: pick a variant to land or close the PR.


## Deferred

- Anti-LLM style pass — needs owner to supply the style guidance it was waiting on, or downgrade to a plain owner-led copy review
- RSS (later)
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
