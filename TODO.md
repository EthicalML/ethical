# TODO

## Remove ASCII-arrow link text site-wide

Convention added: no `Label →` links — inline text links or primary/secondary buttons, never a trailing arrow. Do a full pass over pages and components (CTAs, card footers, ChannelLinks, AchievementNeonRendition buttons, FormSection, prose links with `→`, switchers) removing the arrows and, where a link was arrow-styled text, deciding inline-link vs button per context.

## Homepage Reports & Initiatives reshuffle (proposal pending approval)

Approved layout: 01 phases → 02 Reports & Initiatives (principles explorer opener → one full-width policy split block: narrative + metrics + button left, embedded interactive iso citadel right → production ML survey) → 03 Open Source. Remove ML Maturity Model and Agentic & ML Security blocks; retire their title morphs. Content must derive from the reworked /policy/ achievement cards (20+, 11/11, 6 active mandates, ~10 org principles, 5 regions, 30+ products). Awaiting owner approval of final copy/metrics before dispatch.

## Recovered backlog (from pre-branch sessions; triage — some may be done)

- #10 SEO redirects (legacy `.html` URLs → new routes; the security-slug decision goes into the redirect map)
- #21 Partners logos / EC link
- #22 Tighten vite `allowedHosts`
- #23 Mobile polish pass
- #24 Network-members
- #25 Anti-LLM style pass (was waiting on owner sheets)
- #27 RSS (later)
- #29 Astro showcase (post-cutover)

## Merge the instruments shelf into the policy record explorer as a tab

Today `/policy/` renders two stacked `PolicyRecordPreview` explorers (the authored record and "Where the record landed"). Merge them into one explorer with shelf tabs, e.g. `RECORD (29) | INSTRUMENTS (9)`: one set of chrome (header, search, viewer), per-tab lede and filter set, the authored/contributed boundary carried by the tab labels and the per-document role chips. Data stays as the two arrays in `src/components/PolicyRecordData.ts`.

Relevant instruments to carry over (current shelf, with participation):

| Document                                                                                    | Participation               |
| ------------------------------------------------------------------------------------------- | --------------------------- |
| Governing AI for Humanity: final report (UN AI Advisory Body, SEP 2024)                     | AI EXPERT                   |
| GPAI Code of Practice: Transparency chapter (EU AI ACT, JUL 2025)                           | RECOMMENDATIONS ADOPTED     |
| GPAI Code of Practice: Safety and Security chapter (EU AI ACT, JUL 2025)                    | RECOMMENDATIONS ADOPTED     |
| Frontier AI expert findings: competitiveness, sovereignty and security (EU AI OFFICE, 2026) | FORUM MEMBER                |
| OWASP Top 10 for Agentic Applications 2026 (DEC 2025)                                       | REVIEWER (verified in text) |
| Agentic AI: threats and mitigations (OWASP, DEC 2025)                                       | REVIEWER (verified in text) |
| Securing Agentic Applications Guide 1.0 (OWASP, JUL 2025)                                   | REVIEWER (verified in text) |
| State of Agentic AI Security and Governance 2.01 (OWASP, JUN 2026)                          | REVIEWER (verified in text) |
| Multi-Agentic system Threat Modeling Guide v1.0 (OWASP, APR 2025)                           | REVIEWER (verified in text) |

Pending additions to the shelf when picked up:

- WGDG Progress Report, Zero Draft (JUN 2026) — owner co-facilitates Track 1 whose principles form Chapter 2; the document itself is unattributed and unpublished (zero draft, not on the UNCTAD site), so it belongs on the shelf as CO-FACILITATOR linked to the 6th-meeting page (https://unctad.org/meeting/6th-meeting-un-cstd-multi-stakeholder-working-group-data-governance-all-levels); PDF at owner's Downloads (`WGDG Progress Report_Zero Draft_June 2026.pdf`). Promote to the authored record when the final Progress Report publishes with attribution.
- Systemic Risks Associated with Agentic AI policy brief (ETPC) — owner is in the acknowledgments only; shelf candidate with an ACKNOWLEDGED CONTRIBUTOR chip if wanted.

## Policy record: 30th product

The achievements card and StatBand print "30+" per owner instruction; the record currently holds 29 verified entries. Owner is identifying the 30th authored product (candidate: the AI & Product Liability consultation response, unsigned so it rests on owner confirmation). Add it to `PolicyRecordData.ts` with a rendered preview when named.
