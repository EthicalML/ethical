PROPOSAL — for owner review

# Policy & standards content sheet — the single /policy/ page

This version replaces the earlier six-page `/standards/*` + `/policy/*` scaffold with ONE page, per the owner's direction in sheet 14: `/policy/` is a top-level route, featured from the `/partners/` index. It consolidates the standards and policy engagements that were previously spread across six blocked scaffolds. ⚠ = unverified role · **[OWNER: …]** = confirmation needed.

## Scope and grounding decisions

| Decision | Detail |
| --- | --- |
| One page | The six-page split (ISO/IEC, IEEE, ACM, LF, UN/UN CSTD, EC) collapses into sections of `/policy/`. Per-body pages can be split back out later if any engagement grows enough substance. |
| Supersedes /initiatives/ | The existing `/initiatives/` page is an earlier draft of exactly this content and already carries citable public records. `/policy/` is built FROM it; `/initiatives/` route redirects to `/policy/` and inbound links (P01's "policy work" related link, nav) are updated. |
| Citable records (verified links, already on /initiatives/) | UN CSTD working group on data governance: `unctad.org/topic/commission-on-science-and-technology-for-development/working-group-on-data-governance` · ACM volunteer record: `acm.org/volunteers/volunteer/saucedo_9722274` · LF AI joining announcement: `lfaidata.foundation/blog/2019/10/09/the-institute-for-ethical-ai-and-machine-learning-joins-lf-ai/` · NumFOCUS case study: `numfocus.org/case-studies/ethics-in-ai-ml` · OWASP agentic top-10 announcement (official-reviewer credit per sheet 13). These anchor the page; role labels beyond them stay conservative. |
| Register | Collaboration and engagement, never endorsement or inflated authority (`01-voice-and-messaging.md` §5). Where a role label from `affiliations.json` lacks a public record (ISO/IEC "AI standards group", IEEE, EC "appointed expert", UN "AI expert"), the page states the engagement domain without the unverified title. ⚠ **[OWNER: supply verified role wording + any public record for ISO/IEC, IEEE, EC and the UN AI-expert line to strengthen those rows.]** |
| OWASP + OpenSSF + NumFOCUS | Not in the old six-page nav plan but real engagements — they get rows here (OWASP cross-links `/frameworks/security/`; OpenSSF stays a small mention under the LF item per sheet 13). Nothing silently drops. |

## /policy/ — page spec

- **Hero**: eyebrow `POLICY & STANDARDS`, title *"From principles to the public record."*, intro: *"The Institute carries the nine principles into the rooms where rules are made — AI standards bodies, professional associations and public policy processes — and back again into frameworks practitioners can use."*
- **Section — Regulation (featured, EU)**: the strongest narrative first: the Institute's contribution to EU AI policy, including the human-oversight work now codified in Article 14 of the EU AI Act (the claim P01 already carries — this page becomes its landing target). Scope line for the EC engagement: AI Act, Data Act, Digital Services Act, Cyber Resilience Act ⚠ conservative phrasing until the specific appointment is confirmed. Tie to the four-phase strategy's "By Regulation" phase.
- **Section — United Nations**: the UN CSTD working group on data governance with its public record linked; framed as the national-scale end of the principles. ⚠ chair/expert titles only if owner confirms; otherwise "committee role with a public record" (the current /initiatives/ phrasing, which is already conservative and citable).
- **Section — Standards bodies**: ISO/IEC and IEEE AI standards work in one section: what the formal baseline covers, and the Institute's position that AI-RFX and the ML Maturity Model operationalise rather than replace it (links `/frameworks/ai-rfx/`, `/frameworks/maturity-model/`). ACM alongside with its volunteer record link and the Code-of-Ethics ↔ nine-principles complement framing.
- **Section — Open-source foundations & security**: Linux Foundation AI & Data (joining announcement link, Kompute donation link to `/open-source/kompute/`, ML Security Committee with the OpenSSF collaboration as a small mention) · NumFOCUS (case-study link) · OWASP (official reviewer of the Top 10 for Agentic Applications, cross-linking `/frameworks/security/`).
- **Widget — engagement band**: one structured band listing each body as a row: body · engagement domain · related Institute work (internal links) · `PUBLIC RECORD →` external link where one exists. This is the page's scannable spine; the sections above are the narrative. Rows without a public record simply omit the link rather than carrying an unverified title. Static rows, no new interactive machinery.
- **CTA**: *"Work with the Institute on standards and policy →"* to `/partners/` (the reciprocal of the partners index featuring this page).
- **Route mechanics**: `/initiatives/` → redirect to `/policy/`; update P01's related link and any nav reference; partners index features this page with a full-width card (per sheet 14).

## Open owner inputs

1. Verified role wording (and any public link) for: ISO/IEC, IEEE, EC appointment, UN AI-expert line. The page ships without the titles until then — the engagement-domain phrasing is safe.
2. Whether the EU AI Act / Article 14 contribution can be stated with a citable reference (a consultation response, publication, or press mention) — currently it rests on the P01 claim.
3. Confirm the /initiatives → /policy replacement (recommended: yes, one page owns this content).
