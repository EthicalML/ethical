# TODO

## Remove ASCII-arrow link text site-wide

Convention added: no `Label →` links — inline text links or primary/secondary buttons, never a trailing arrow. Do a full pass over pages and components (CTAs, card footers, ChannelLinks, AchievementNeonRendition buttons, FormSection, prose links with `→`, switchers) removing the arrows and, where a link was arrow-styled text, deciding inline-link vs button per context.

## Homepage Reports & Initiatives reshuffle (proposal pending approval)

Approved layout: 01 phases → 02 Reports & Initiatives (principles explorer opener → one full-width policy split block: narrative + metrics + button left, embedded interactive iso citadel right → production ML survey) → 03 Open Source. Remove ML Maturity Model and Agentic & ML Security blocks; retire their title morphs. Content must derive from the reworked /policy/ achievement cards (20+, 11/11, 6 active mandates, ~10 org principles, 5 regions, 30+ products). Awaiting owner approval of final copy/metrics before dispatch.

## Bug

- In the homepage if you click the animation separator which cycles across the three 3d objects, and force the change of the annimation, the distortion stops. Let's actually not make the ability to change the 3d animation manually by not making it clickable.
- When refreshing the home page and half of the metrics or the brands carousel is visible, there is an animation wwhere it apepars and then disappears. and then reappears when scrolling. The functionaliy should be that it doesnt appear at all unless it's in the visibility range.

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
