PROPOSAL — implemented for owner review & iteration (v2 flagship)

# Policy & standards content sheet — /policy/ as a flagship page

v2, 2026-08-01: full content rethink per owner direction. The owner supplied the delivered-products list, flagship outcomes and verified participation roles, and rated this "the absolutely strongest position of the Institute", to stand with open source as the Institute's two main drivers. The page is REBUILT as a flagship (OSS-page-grade richness), written for an audience of POLICY MAKERS. ⚠ = fact to keep conservative until further evidence · **[OWNER: …]** = input wanted during iteration.

## The argument (what the page must land)

The Institute's unique position: **the people who write the consultation responses are the people who ship the code.** Most policy advice comes from people who don't build; most builders never sit in the rooms where rules are drafted. The Institute does both — an open-source estate on one side (KAOS, Kompute, XAI, the production-ML ecosystem), a delivered policy record on the other (25+ policy products across every major European digital instrument, with measured adoption). For a policymaker, that is the offer: practitioner evidence, technical review of draft instruments, and standards participation from a source that maintains real production tooling.

## Flagship facts (owner-supplied 2026-08-01)

- Contributed to every major European digital policy through its planning, creation and execution: the **AI Act**, the **Data Act**, the **DSA**, the **Cyber Resilience Act**, and the **UK's AI regulatory proposal**.
- **8 of 12 recommendations adopted** — EU (2nd draft) General-Purpose AI Code of Practice (evidence: owner's LinkedIn post `linkedin.com/posts/axsaucedo_eu-2nd-draft-ai-code-of-practice-activity-7281944634149244928-jpnq`).
- **13 of 14 recommendations adopted** — the UK's AI Regulatory Proposal.
- Sustainability record: ACM climate disclosure statement + data-center statement (EN `acm_data_center_final.pdf` + ES `acm-data-center-final-spanish`).
- US/global: USTPC-approved generative-AI principles (`acm.org/binaries/content/assets/public-policy/ustpc-approved-generative-ai-principles`), joint AI statement update (`…/final-joint-ai-statement-update.pdf`).

## Participation — verified roles (owner-supplied; state these titles)

Grouped for the mandates band:

| Body | Role |
| --- | --- |
| European Commission | Selected to the reserve list of the High-Level Expert Group on AI (AI HLEG — the group whose Ethics Guidelines for Trustworthy AI preceded the AI Act; members were replaced from the reserve list) |
| European Commission | Member, Frontier AI Forum |
| European Commission | Member, European AI Alliance |
| European Commission | Member, Code of Practice for General-Purpose Models with Systemic Risk |
| United Nations | Chair, Principles Committee — Data Governance Guidelines, UN CSTD (public record: `unctad.org/topic/commission-on-science-and-technology-for-development/working-group-on-data-governance`) |
| United Nations | AI Expert, UN AI Advisory Committee |
| ACM | Founding Chair, ACM AI Policy Committee in Europe (Europe TPC; volunteer record `acm.org/volunteers/volunteer/saucedo_9722274`) |
| IEEE | Early member, IEEE P700x standards series |
| ISO/IEC | Early member, ISO/IEC 42001 (AI management systems) |

HLEG phrasing note: "reserve list" is the accurate term. There is NO public roster of reserve-list members (owner confirmed after checking) — so the page states the role and links to where the reserve list's existence is documented, the EC's AI HLEG page (`digital-strategy.ec.europa.eu/en/policies/expert-group-ai`, which records that departing members were replaced from a reserve list). Never inflate to full membership; never imply a public roster entry.

## Policy products — the delivered record (owner list, deduped ~27 items)

All via the ACM Europe Technology Policy Committee unless noted; the Article 50 response verifiably names Alejandro Saucedo as an author. ⚠ ACM pages are Cloudflare-protected: the builder takes titles as given below (slug-derived), links verbatim from the owner list. Dates kept only where slug-derived or attested; otherwise grouped by instrument without a fabricated date. Grouping for the timeline widget:

**EU — AI Act line**: EU AI White Paper comments (2020) · AI consultation comments · AI-system definition guidelines (2024) · Regulation (EU) 2024/1689 consultation (Apr 2026) · Article 50 transparency guidelines response (Jun 2026) · Digital Omnibus on AI regulation (2026) · GPAI Code of Practice (2024) + 2nd GPAI Code of Practice · AI scientific panel of independent experts comments (Nov 2024) · Calibrating oversight of agentic frontier models (Apr 2026) · reflections on draft prEN 18282.
**EU — digital acts**: DSA comments + delegated-regulation comments (2024) · Data Act comments (May 2022) · Cyber Resilience Act comments · digital principles comments · ETPC response to targeted EC consultation · ETPC survey responses.
**United Kingdom**: UK AI paper comments · UK AI framework comments · UK National Data Strategy comments.
**United Nations / global**: Independent International Scientific Panel on AI consultation (2025) · EU–US TTC AI taxonomy comments (Nov 2023) · joint AI statement update · USTPC generative-AI principles.
**Sustainability**: climate disclosure statement · data-center statements (EN + ES).
**[OWNER: one opaque item remains — `contribution55012b10-…pdf` — name/date it or drop it.]**

## /policy/ — flagship page spec (implemented; iterate from here)

Audience: policymakers and regulators first, practitioners second. Voice: evidence, delivered artefacts, measured outcomes — never self-congratulation; every claim carries a link or a number.

1. **Hero**: eyebrow `POLICY & STANDARDS`, title *"Policy written by practitioners."*, intro: *"The Institute has contributed to every major European digital policy through its planning, creation and execution — the AI Act, the Data Act, the DSA, the Cyber Resilience Act and the UK's regulatory proposal — carrying evidence from its open-source and production-ML practice into the rooms where rules are made."* Ambient canvas backdrop on the right two-thirds like the other flagship heroes (design call for the worker: a quiet timeline/constellation motif, no card framing, morph-safe).
2. **Impact band**: the measured outcomes as a stat band: `8/12 RECOMMENDATIONS ADOPTED — EU GPAI CODE OF PRACTICE` · `13/14 — UK AI REGULATORY PROPOSAL` · `25+ POLICY PRODUCTS DELIVERED` · `EU · UK · UN · US ENGAGEMENT`. (The frameworks no-numbers rule does not apply here: these are outcomes, the core evidence.)
3. **Section — Outcomes that stuck**: the adoption story in prose: what it means for recommendations to be adopted into the GPAI Code of Practice and the UK proposal, each with its evidence link. One line tying to the four-phase strategy's "By Regulation" end-state.
4. **Widget — The policy record (flagship)**: interactive, filterable record of the ~27 products: filter pills by track (EU AI ACT · EU DIGITAL ACTS · UK · UN & GLOBAL · SUSTAINABILITY · ALL), rows show title · instrument · date where known · `READ →` external link. Custom element for the filtering (colocated script), static data in page frontmatter per the placement rule. Dense, scannable, the page's spine.
5. **Section — Mandates**: the nine verified roles as grouped cards (European Commission / United Nations / ACM / Standards bodies), each with its public-record link where one exists. The HLEG reserve-list phrasing per above.
6. **Section — The practitioner bridge (the case for policy makers)**: why this record is different: the same organisation maintains the open-source estate — KAOS for agent orchestration, Kompute in the Linux Foundation, the production-ML ecosystem — and turns that practice into consultation evidence. Cross-links `/open-source/`, `/frameworks/ai-rfx/`, `/frameworks/security/`, and P01/P09. Includes the security-adjacent engagements (OWASP official reviewer, LF ML Security Committee with OpenSSF mention, NumFOCUS) so nothing from the previous page's band is lost.
7. **Section — Work with us**: the direct offer to policymakers: technical review of draft instruments, practitioner evidence for consultations, standards participation. CTA *"Engage the Institute →"* to `/contact/` and a secondary link to `/partners/`.
8. **Route mechanics**: unchanged — `/policy/` route, `/initiatives/` redirect stands, partners index featured card stands, P01/P09 links stand.

## Iteration inputs

1. The opaque contribution PDF (name/date or drop).
2. Whether the non-AI sustainability products stay on the page (currently: yes, as their own track — they show breadth).
3. Any public roster links for Frontier AI Forum / AI Alliance / GPAI Code of Practice membership to harden those rows.
4. Homepage follow-up (separate pass): elevate policy alongside open source as the two main-driver sections.
