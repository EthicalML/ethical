# TODO

## Remove ASCII-arrow link text site-wide

Convention added: no `Label →` links — inline text links or primary/secondary buttons, never a trailing arrow. Do a full pass over pages and components (CTAs, card footers, ChannelLinks, AchievementNeonRendition buttons, FormSection, prose links with `→`, switchers) removing the arrows and, where a link was arrow-styled text, deciding inline-link vs button per context.

## CSS spacing cleanup

Retire `src/styles/layout.css` (prototype-fidelity pixel pins from round 4; the principles and open-source pins are already removed after one caused 43px of dead section space — verify the remaining join/footnote pins still earn their place, then delete the file). Introduce a single `--section-gap` rhythm token for the homepage inter-section distance instead of per-section one-offs.

## Bug

- In the homepage if you click the animation separator which cycles across the three 3d objects, and force the change of the annimation, the distortion stops. Let's actually not make the ability to change the 3d animation manually by not making it clickable.
- When refreshing the home page and half of the metrics or the brands carousel is visible, there is an animation wwhere it apepars and then disappears. and then reappears when scrolling. The functionaliy should be that it doesnt appear at all unless it's in the visibility range.

## tokens.css breakup (post-cutover, pixel-perfect)

Roughly 3/4 of tokens.css (~2,200 lines) is per-component styling; relocate it into the ~15-20 owning components, delete dead rules as they surface (likely 10-20%), and consolidate the five ad-hoc breakpoints (950/900/800/600/520) into 2-3 named ones. Zero visual change by construction: every batch gates on masked full-page screenshot parity for all 33 pages at 2-3 widths (definition of done #7). Run as a low-supervision worker campaign in 3-4 scoped rounds (survey+carousel → principles+hero → menus+cards+misc → breakpoints & sweep), ~30-45 min each; owner eye pass only where parity diffs flag. Deliberately deferred until after the redesign cutover so parity runs against a stable target. Standing guardrail effective now: no NEW component rules go into tokens.css — style in the owning component.

## Recovered backlog (from pre-branch sessions; triage — some may be done)

- #10 SEO redirects (legacy `.html` URLs → new routes; the security-slug decision goes into the redirect map)
- #21 Partners logos / EC link
- #22 Tighten vite `allowedHosts`
- #23 Mobile polish pass
- #24 Network-members
- #25 Anti-LLM style pass (was waiting on owner sheets)
- #27 RSS (later)
- #29 Astro showcase (post-cutover)

## Policy/Industry library follow-ups

The toggle library shipped (POLICY: 29 authored + 5 contributed; INDUSTRY: LF AI principles + 5 OWASP guides). Remaining:

- Promote the WGDG Progress Report zero draft (POLICY, CO-FACILITATOR) to the authored record when the final report publishes with attribution.
- Collect the remaining public organisational principles for the INDUSTRY view (the ~10 card names Linux Foundation and UN publicly; Zalando, Capital One, Deutsche Börse and one more are confidential; owner recalls "several others" public).
- LF AI principles entry links an HTML page so it has a placeholder viewer; optionally print-to-PDF at build for a paginated preview.
- Systemic Risks Associated with Agentic AI policy brief (ETPC) — owner is in the acknowledgments only; POLICY-view candidate with an ACKNOWLEDGED CONTRIBUTOR chip if wanted.

## Policy record: 30th product

The achievements card and StatBand print "30+" per owner instruction; the record currently holds 29 verified entries. Owner is identifying the 30th authored product (candidate: the AI & Product Liability consultation response, unsigned so it rests on owner confirmation). Add it to `PolicyRecordData.ts` with a rendered preview when named.
