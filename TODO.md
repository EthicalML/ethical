# TODO

## SEO / GEO audit and LLM-optimized serving

Six-phase programme, owner-approved direction (2026-08-07). Phases 1-5 are the audit: (1) technical SEO crawl including legacy-redirect integrity against the `legacy-jekyll` inventory, (2) content and keyword-intent analysis, (3) Core Web Vitals, (4) prioritized report, (5) GEO/AEO: AI crawler policy in robots.txt, llms.txt and markdown surfaces, answer-extraction readiness, and an AI answer audit baseline (query ChatGPT/Claude/Perplexity for the queries the site should own).

Phase 6 — LLM-optimized serving (owner direction, proven pattern from industry startups): serve different, LLM-optimized content to AI crawlers (GPTBot, ClaudeBot, PerplexityBot) — never to Googlebot, so classic SEO cloaking risk does not apply. Staged: first, plain markdown text renditions of key pages served to AI user-agents; then expanded curated LLM-specific content designed for ingestion into training and RAG corpora, richer than the human pages. Requires an edge layer in front of GitHub Pages (Cloudflare Worker routing by user-agent); the markdown renditions can be generated at build time from the same MDX sources.

## Reveal thresholds: switch from % to fixed pixels

The reveal system (src/shared/Reveal.ts) fires at a percentage of element height (REVEAL_RATIO 0.45, TALL_REVEAL_VH fallback). Owner call 2026-08-06: percentage is the wrong model for most elements — a tall section needs hundreds of scrolled pixels before it fires while a short one fires almost immediately. Switch to a fixed pixel threshold (element reveals once ~N px of it are visible) for most targets, keeping percentage/bespoke behaviour only for the few widgets that need it. Audit the Motion table entries when doing this.

## Newsletter pass (next up)

Owner has ideas for the newsletter beyond the carried-over archive (396 issues live under /mle/, recent-issues rail derives from the filenames, /mle.html redirects to /network/). Scope to be defined by owner.

## PR #12 decision — hero-parallax exploration

Six homepage scroll-effect variants sit in the open PR #12, paused for owner decision: pick a variant to land or close the PR.

## CSS spacing cleanup

Retire `src/styles/layout.css` (prototype-fidelity pixel pins from round 4; the principles and open-source pins are already removed after one caused 43px of dead section space — verify the remaining join/footnote pins still earn their place, then delete the file). Introduce a single `--section-gap` rhythm token for the homepage inter-section distance instead of per-section one-offs.

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
