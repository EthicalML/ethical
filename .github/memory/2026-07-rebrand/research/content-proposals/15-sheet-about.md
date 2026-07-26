PROPOSAL — for owner review

# About cluster copy sheet — /about, /about/team, /about/advisory, /about/annual-review, /press, /contact, /privacy

Two formats, as in `14-sheet-network.md`. Existing pages (`/about`, `/contact`, `/privacy`): **CURRENT** · **SOURCE** · **PROPOSED**. Wholly NEW pages (`/about/team`, `/about/advisory`, `/about/annual-review`, `/press`): **PURPOSE** · **STRUCTURE** · **DRAFT COPY**, owner-input flagged. ⚠ = unverified number/claim.

---

## /about

`src/pages/about.mdx` already exists and is materially further along than the audit's original finding suggests — it does **not** carry the legacy "Europe-based think tank / data governance" framing the crawled-content inventory flagged. That legacy line survives elsewhere (see the footer note below); this page itself is close to shippable.

### Mission statement
| | |
| --- | --- |
| CURRENT | "The Institute for Ethical AI Alignment & Safety is an independent research centre working on practical ways to keep advanced AI systems safe, accountable, and aligned with legitimate human intent." + "Our mission" para: "We turn broad commitments about responsible AI into methods that engineers, organisations, standards bodies, and public institutions can use. Our aim is to make alignment and safety concrete enough to test, govern, and improve." |
| SOURCE | Already matches `01-voice-and-messaging.md` §1 positioning statement near word-for-word (independent research centre; turning commitments into testable methods). No legacy phrasing present. |
| PROPOSED | Keep verbatim. This is the canonical mission statement — it should be the source others (footer, homepage subtitle) are checked against, not the other way round. |

### What we do / How we work
| | |
| --- | --- |
| CURRENT | "What we do": frameworks/research/evaluation across the 9 Principles — agent oversight, model security, explainability, procurement, production monitoring, institutional assurance. "How we work": built with practitioners, reviewed across technical/legal/policy/social perspectives, publishes reusable artefacts, revises guidance when assumptions don't hold. |
| SOURCE | On-voice, grounded in real project scope (KAOS=agent oversight, MLSecOps=security, XAI=explainability, AI-RFX=procurement, production-ML list=monitoring). No fabricated claims. |
| PROPOSED | Keep verbatim. |

### Standards & affiliations
| | |
| --- | --- |
| CURRENT | "The Institute contributes to international discussions through work with the United Nations, UN CSTD, European Commission, ACM, Linux Foundation, OWASP, IEEE, and ISO/IEC communities. Participation informs our research without replacing independent judgement." |
| SOURCE | Same org list as the homepage affiliation marquee and `/network` directory. Already phrased as "collaboration/contribution", correctly avoiding endorsement-style claims — good example of the voice framework's "state collaboration, not endorsement" rule already applied. |
| PROPOSED | Keep verbatim, **conditional on the same owner-verification pass as the homepage marquee** (`10-sheet-homepage.md` §Affiliation marquee) — this paragraph must list the same orgs, in the same state of currency, as everywhere else on the site. If an org drops off the marquee after verification, drop it here too. |

### Cross-reference: footer still carries the legacy line
| | |
| --- | --- |
| CURRENT | `src/data/footer.json` → `about.text` (rendered globally via `FootnoteBand.astro` on every page): "A Europe-based research centre bringing together technology leaders, policymakers and academics to develop industry standards and practical frameworks for the safe, secure and aligned development of AI." |
| SOURCE | This is the exact legacy phrasing the audit flagged ("Europe-based... data governance and machine learning") — it survived in the footer even though `/about` itself was already fixed. Because it renders sitewide, it is higher-priority than any single page rewrite. |
| PROPOSED | Not a page in this sheet's scope, but flagging because it directly contradicts the approved `/about` mission above. **Recommend the footer's `about.text` be replaced with a one-sentence compression of the `/about` mission statement**, e.g.: "An independent research centre turning responsible-AI commitments into methods that can be tested, governed and improved." Owner should confirm this edit lands with whichever stage touches `footer.json` (outside this sheet's file-write scope). |

---

## /about/team and /about/advisory

Wholly NEW pages — no team roster or advisory-board content exists anywhere in the audit or crawled inventory. The crawled inventory notes only that the owner's Board/NED CV "describes the creation of expert advisory-board structures" — a capability claim about the owner's own experience, not a published Institute team page.

| | |
| --- | --- |
| PURPOSE | `/about/team`: who runs the Institute's day-to-day work. `/about/advisory`: who provides external oversight/expertise. nav-proposal.md lists them as separate pages ("Team & fellows", "Advisory roles"), implying two different accountability structures. |
| STRUCTURE (team) | 1) Hero. 2) Core team (name, role, one-line remit — owner-supplied). 3) Fellows, if distinct from the `/fellowships` programme roster (cross-link rather than duplicate). |
| STRUCTURE (advisory) | 1) Hero. 2) Advisory roles (name, affiliation, area — owner-supplied). 3) Short statement on what the advisory function does (reviews framework decisions? governance? both?). |
| DRAFT COPY (team) | **Eyebrow:** "TEAM & FELLOWS". **Title:** "Who does the work." **Intro:** "[OWNER: confirm — is there a public team to list, or does the Institute operate without a named public roster? If the latter, this page should say so plainly rather than stay empty.]" **Placeholder policy:** do not publish invented names, roles, or headshots. If the owner is the sole confirmed public figure, a single-entry page is honest and sufficient — do not pad it with unnamed "the team" language implying more people than exist. |
| DRAFT COPY (advisory) | **Eyebrow:** "ADVISORY". **Title:** "External oversight." **Intro:** "[OWNER: confirm whether an advisory board currently exists, and if so, who sits on it and in what capacity — the CV language ('creation of expert advisory-board structures') is a past-experience claim, not confirmation of a current Institute board.]" **Placeholder policy:** same as team — an honest "not yet constituted" statement beats a fabricated roster. If no board exists yet, propose: "The Institute is building a formal advisory structure. [Contact us](/contact) if you'd like to be involved." |

---

## /about/annual-review

Wholly NEW page — no annual report, review, or comparable retrospective exists in the current estate. Closest real analogue: the State of Production ML 2024/2025 survey reports, which are a different kind of document (external research, not institutional self-report).

| | |
| --- | --- |
| PURPOSE | Give the Institute an accountability document — what shipped, what changed, what's next — distinct from the survey reports (which are about the field, not the Institute). |
| STRUCTURE | 1) Hero. 2) What shipped this year (real, verifiable: P09 added, new frameworks, newsletter/network growth — reuse only owner-confirmed figures from elsewhere in this workstream, don't re-derive new ones here). 3) What's next (tie to the four-phase strategy). |
| DRAFT COPY | **Eyebrow:** "ANNUAL REVIEW". **Title:** "[OWNER: confirm cadence — is this genuinely annual, or should the page be framed as a rolling changelog until a full annual cycle exists?]" **Intro (conservative, ships once real content exists):** "A record of what the Institute published, changed and learned — principles, frameworks, research and the network — each year." **Recommendation:** this page has no safe placeholder content to draft yet, since every fact it would contain is a number or milestone this workstream has flagged for owner confirmation elsewhere (network/subscriber/issue counts, P09 addition date, project releases). Treat as **blocked on those confirmations landing first**, not as independently draftable. Do not ship a review with invented milestones or dates. |

---

## /press

Wholly NEW page — "Fully NEW" per the content audit, no source material.

| | |
| --- | --- |
| PURPOSE | Standard press-kit function: give journalists/partners a fast, accurate summary + assets, and prevent ad hoc misquoting of the Institute's positioning. |
| STRUCTURE | 1) Hero. 2) Boilerplate (short, copy-pasteable description). 3) Assets (logo, name-usage rules). 4) Media contact. |
| DRAFT COPY | **Eyebrow:** "PRESS". **Title:** "For journalists and partners." **Boilerplate (safe to ship — matches the approved `/about` mission, kept to one paragraph as press boilerplate convention requires):** "The Institute for Ethical AI Alignment & Safety is an independent research centre turning responsible-AI commitments into methods that can be tested, governed and improved — across frontier and agentic systems, and the production systems already in use. It works through nine Responsible AI Principles, open-source software, and practical frameworks, with industry, academia and governments." **Assets section:** "[OWNER: confirm what's available for distribution — logo files, name/usage guidelines, headshots if any team page exists.]" **Media contact:** reuse `hello@ethical.institute` (already the live contact address per `contact.mdx`) — "For press enquiries, contact [hello@ethical.institute](mailto:hello@ethical.institute)." **Do not include:** any "as featured in" / press-mentions list — none exists in source material; fabricating one is exactly the "affiliation inflation" the voice framework prohibits. |

---

## /contact

### Hero + form
| | |
| --- | --- |
| CURRENT | `src/pages/contact.mdx`: eyebrow "CONTACT", title "Start with the work", intro "A single route into the network, frameworks, research and institutional partnerships." Shared form ("Join, subscribe or get in touch"). |
| SOURCE | On-voice; consolidates what used to be several separate forms (network apply, newsletter subscribe, RFX request) into one, per the audit's positive note under "Contact / join / RFX-request / subscribe forms — Consolidated to one form — good." |
| PROPOSED | Keep verbatim. If `/partners` and `/press` ship (this sheet), consider adding "institutional partnerships" and "press" as explicit form interest options alongside the existing three (network / newsletter / frameworks) — optional, not required. |

### Channel links
| | |
| --- | --- |
| CURRENT | "Other ways to follow": Email → `hello@ethical.institute`, Open source → `/open-source/`, Newsletter → `/network/`. |
| SOURCE | Email matches master's live contact address. The "Newsletter → /network/" link will be stale once `/newsletter` ships as its own route (this sheet, network cluster). |
| PROPOSED | Keep Email and Open source links verbatim. **Update the Newsletter link target to `/newsletter/` once that page exists** (currently correctly points at `/network/` because no standalone newsletter page exists yet — this is a forward-looking note, not a current error). |

---

## /privacy

Port note per the assignment brief: **legal text carries over verbatim** — this sheet proposes chrome copy only (page title, intro line, effective-date framing), never the substantive clauses.

| | |
| --- | --- |
| CURRENT | Legacy `_site/privacypolicy.html`: header "Privacy Policy", sub-line "Privacy policy statement effective as of November 15, 2018.", nine numbered sections (Websites Covered · Personal Information Collected · Use of Information Collected · Sharing of Information Collected · Correcting and Updating Your Information · Customer Data · Security · Changes to this Privacy Statement · Contacting Us). Company name in body text reads "The Institute for Ethical AI Alignment & Safety" already (rebrand PR already touched this file per repo history) but the page `<meta>` still says "The Institute for Ethical Ai & Machine Learning" in one spot and uses the old `eml-logo-white.png`. |
| SOURCE | Legal text is out of scope for rewriting per the brief — port verbatim. The stale meta/logo references are template chrome, not legal substance, so they fall inside this sheet's remit. |
| PROPOSED | **Legal body (9 sections): port verbatim, zero rewording** — this is the one page in the whole workstream where "don't touch the substance" is an instruction, not just caution. **Chrome only:** update page title/nav wordmark and meta `author` tag to the current name (already correct in the body, just the stray meta tag needs to match); update logo reference off the legacy `eml-logo-white.png` to the current mark. **Effective-date line: [OWNER: confirm whether the 2018 effective date is still accurate, or whether this needs a new effective date if the policy text has changed since]** — do not silently update the date without confirming the underlying policy hasn't changed; do not leave a visibly stale 2018 date unaddressed either. Propose intro framing stays exactly as-is otherwise: "Privacy policy statement effective as of [DATE]." |
