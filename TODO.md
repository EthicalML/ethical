# TODO

## Newsletter pass (next up)

Owner has ideas for the newsletter beyond the carried-over archive (396 issues live under /mle/, recent-issues rail derives from the filenames, /mle.html redirects to /network/). Scope to be defined by owner.

## PR #12 decision — hero-parallax exploration

Six homepage scroll-effect variants sit in the open PR #12, paused for owner decision: pick a variant to land or close the PR.

## CSS spacing cleanup

Retire `src/styles/layout.css` (prototype-fidelity pixel pins from round 4; the principles and open-source pins are already removed after one caused 43px of dead section space — verify the remaining join/footnote pins still earn their place, then delete the file). Introduce a single `--section-gap` rhythm token for the homepage inter-section distance instead of per-section one-offs.

## tokens.css breakup (post-cutover, pixel-perfect)

Roughly 3/4 of tokens.css (~2,200 lines) is per-component styling; relocate it into the ~15-20 owning components, delete dead rules as they surface (likely 10-20%), and consolidate the five ad-hoc breakpoints (950/900/800/600/520) into 2-3 named ones. Zero visual change by construction: every batch gates on masked full-page screenshot parity for all 33 pages at 2-3 widths (definition of done #7). Run as a low-supervision worker campaign in 3-4 scoped rounds (survey+carousel → principles+hero → menus+cards+misc → breakpoints & sweep), ~30-45 min each; owner eye pass only where parity diffs flag. Deliberately deferred until after the redesign cutover so parity runs against a stable target. Standing guardrail effective now: no NEW component rules go into tokens.css — style in the owning component.

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

