PROPOSAL — for owner review

# Network cluster copy sheet — /network, /newsletter, /talks, /events, /fellowships, /partners

Two formats below. For pages with existing substance (`/network`, `/talks`): **CURRENT** (what renders today) · **SOURCE** (origin / placeholder status) · **PROPOSED** (rephrased per `01-voice-and-messaging.md`). For pages that are structurally NEW (`/newsletter` as its own route, `/events`, `/fellowships`, `/partners`): **PURPOSE** (why the page exists, per nav-proposal.md) · **STRUCTURE** (sections) · **DRAFT COPY** (conservative, shippable text, with `[OWNER: confirm]` markers). ⚠ = unverified number — never assert without owner sign-off.

---

## /network

### Hero
| | |
| --- | --- |
| CURRENT | `src/pages/network.mdx`: eyebrow "ETHICAL AI NETWORK", title "A network of aligned humans", intro "Practitioners, researchers and institutions sharing the difficult work of responsible AI." |
| SOURCE | Master `network.html` philosophy paragraph: *"the only machine learning network that can be induced with ethics in practical industrial usecases is one made out of responsible and aligned humans who advocate for best practices."* Current intro is a compressed, on-voice rephrase of that. |
| PROPOSED | Keep title verbatim — it's the strongest single line in the estate for this page. Intro: keep, or tighten toward the master's actual argument: **"Responsible technology takes more than changes to models — it takes a network of accountable people across engineering, research, policy and standards."** (matches key message 5 in `01-voice-and-messaging.md`). Either version is shippable; owner picks. |

### Directory (sectors + member orgs)
| | |
| --- | --- |
| CURRENT | `NetworkDirectory` component: sector eyebrow "WHO IS HERE" / heading "Across disciplines", using `network-sectors.json` (Universities & research 24%, Technology companies 22%, Financial services 17%, Government & public bodies 14%, Startups & scale-ups 13% — **sums to 90%, not 100%** ⚠); member eyebrow "MEMBER NETWORK" / heading "Built through contribution", showing ACM, OWASP, Linux Foundation, NumFocus, IEEE, UN CSTD. |
| SOURCE | Sector percentages are prototype-illustrative, not sourced from any real member survey in the inventory — flag as invented until owner supplies real data or removes the panel. Member-org list overlaps the homepage affiliation marquee (same owner-verification requirement — `10-sheet-homepage.md` §Affiliation marquee applies here too). |
| PROPOSED | Keep structure (sector breakdown + org list) — it's a good pattern. **Sector percentages: [OWNER: confirm real distribution or drop the panel]** — do not ship a total that doesn't add to 100%. Org list: same rule as homepage marquee — list only current, owner-confirmed collaborations; state "collaboration" not "membership" if that's more accurate per org. |

### Join / stats / form
| | |
| --- | --- |
| CURRENT | `FormSection` (variant network-split): title "Join the working network", stats 1,034 NETWORK MEMBERS ⚠ / 70,412 NEWSLETTER SUBSCRIBERS ⚠ / 393 ISSUES PUBLISHED ⚠. Shared one-form (`network.json`): "Join, subscribe or get in touch" with three interest checkboxes (network, newsletter, frameworks/RFX). |
| SOURCE | Stats identical to homepage network band (`10-sheet-homepage.md` §Network/form) — same three placeholders, same requirement. Newsletter-issue commit history in this repo runs at least to #397 (`feat: added 397`), so **393 is already stale** — whatever number ships must be the real current count at publish time, sourced from the newsletter platform, not this repo's commit count either (that only proves a floor). Form copy and disclaimer are on-voice already. |
| PROPOSED | Keep form and disclaimer verbatim. **[OWNER: confirm current member count, subscriber count, and issue count before ship — issue count is provably >393, do not reuse that figure.]** Title "Join the working network" is fine; could also read "Join, subscribe or contribute" to match the form's own three verbs — owner's call, low stakes. |

### Master content not yet surfaced (candidate additions)
| | |
| --- | --- |
| CURRENT | Not present in `network.mdx`. |
| SOURCE | Master `network.html` §"Apply to join the Ethical AI Network": explicit membership criteria (founders/scale-ups, professionals procuring/working with AI, professors/academics, engineers, data scientists, product/project/delivery managers, leaders and thinkers across AI and data) and a "contributions" list (principles, AI-RFX, open-source frameworks, research, community projects, events/roundtables, reports/case studies). |
| PROPOSED | Optional addition, not required to ship: a short "Who this is for" list using the master's membership criteria (rephrased to safety/alignment register, e.g. swap "leaders and thinkers working across AI and data" → "leaders and thinkers across AI, alignment and data"). Would sit between hero and directory. Low priority — current page already reads as complete without it. |

---

## /newsletter — the ML Engineer newsletter

Currently the newsletter is folded into `/network`'s stats and form checkbox; nav-proposal.md calls for it as its own route. This is a NEW standalone page, but built from strong existing substance (master `mle.html`, `newsletter-issues.json`).

| | |
| --- | --- |
| PURPOSE | Give the newsletter — the Institute's largest real audience asset — its own identity and archive entry point, separate from network membership. |
| STRUCTURE | 1) Hero (name, cadence, what it covers). 2) Editorial themes (from master's recurring categories). 3) Recent issues list (real data, linked to archive). 4) Subscribe (reuse the shared one-form, newsletter checkbox pre-checked). |
| DRAFT COPY | **Eyebrow:** "ML ENGINEER NEWSLETTER". **Title:** "Weekly, curated, technical." **Intro:** "The Machine Learning Engineer newsletter reaches [OWNER: confirm current subscriber count] practitioners with weekly material on production ML, security, monitoring and the open-source tools that keep systems running." **Themes list** (safe to ship as-is, all attested in master `mle.html`): production machine learning · MLOps · model monitoring · DataOps/AIOps · ML infrastructure · ML security · explainability · GPU acceleration · large language models · data engineering · research papers · industry reports · conferences and events · AI policy and guidelines. **Recent issues:** reuse `newsletter-issues.json` pattern (`#NNN — title`), but **[OWNER: confirm the real current issue numbers before ship — do not reuse #390–393 from the current file, they are already behind the archive's actual state]**. **CTA:** "Subscribe" → shared form, newsletter box checked. |

---

## /talks

### Hero
| | |
| --- | --- |
| CURRENT | `src/pages/talks.mdx`: eyebrow "TALKS / KEYNOTES / BRIEFINGS", title "Ideas carried into the room", intro "Selected talks on alignment, responsible systems, agent safety and standards." |
| SOURCE | No direct master precedent for this exact phrasing; on-voice and accurate as a container description. Keep. |
| PROPOSED | Keep verbatim. |

### Talks grid — entries
| | |
| --- | --- |
| CURRENT | `talks.json`, four entries: "NeurIPS 2023 Workshop keynote" (NeurIPS Workshop), "NeurIPS 2022 — machine learning security" (NeurIPS), "KubeCon Europe — ML evaluation at scale" (KubeCon Europe), "PyCon keynote — monitoring, drift and explainability" (PyCon). |
| SOURCE | Inventory confirms only **two** of these against the crawled estate: NeurIPS Workshop 2022 keynote and NeurIPS Workshop 2023 keynote (`institute-crawled-content.md` §19, and referenced directly on the master homepage). PyCon keynote on monitoring/drift/explainability is referenced as newsletter-archive material, also plausible-real. **"KubeCon Europe — ML evaluation at scale" has no match anywhere in the audit or crawled inventory — likely invented placeholder.** |
| PROPOSED | Structure (grid of kind/title/image/label/place) is fine, keep it. **Content: [OWNER: confirm the full, real talks list — titles, years, venues, and video links where available.]** Ship only entries the owner confirms are real Institute talks; the two NeurIPS entries are the safest starting point (already attested twice in source material). Drop or replace KubeCon Europe unless the owner confirms it happened. Do not add new invented talks to fill out the grid — a shorter, true grid beats a padded, false one. |

---

## /events

Wholly NEW page. No dedicated existing content; "events and roundtables" appear only as one line item inside the network's "contributions" list and inside typical newsletter issue structure (master `mle.html`).

| | |
| --- | --- |
| PURPOSE | Give the Institute's events and roundtables (referenced but never surfaced as content) a real home, and a reason for practitioners to check back / subscribe. |
| STRUCTURE | 1) Hero. 2) Upcoming (owner-fed list; empty-state copy needed until owner supplies dates). 3) Past / recurring formats (roundtables, workshops — described, not itemised, until real instances are confirmed). 4) CTA to newsletter (events are announced there per master's evergreen-sections pattern). |
| DRAFT COPY | **Eyebrow:** "EVENTS & WORKSHOPS". **Title:** "Where the network meets." **Intro:** "Roundtables and workshops for practitioners working through the nine principles in practice. [OWNER: confirm cadence and format — recurring series, one-off, or announced ad hoc.]" **Upcoming section, empty-state copy (ship this, not a fabricated calendar):** "No events are scheduled publicly right now. Announcements go out first through the [ML Engineer newsletter](/newsletter)." **Past formats (only if owner confirms specifics — otherwise omit section entirely):** "[OWNER: list confirmed past roundtables/workshops with dates, or leave this page to hero + empty-state + newsletter CTA only.]" |

---

## /partners

Wholly NEW page. No dedicated existing content, but real substance exists as *inputs*: the homepage affiliation marquee, the network's member-org list, and the four-phase strategy's "empowering organisations / industries" framing.

| | |
| --- | --- |
| PURPOSE | Give organisational relationships (as opposed to individual network members) their own page — nav-proposal.md's "Partner with us" — and a clear route for an organisation (not a person) to start a relationship. |
| STRUCTURE | 1) Hero. 2) What partnership means (tiers or forms of collaboration — standards work, procurement/AI-RFX pilots, research collaboration, sponsorship of the newsletter/network). 3) Current partners/collaborators (reuse the owner-verified affiliation list from the homepage marquee — do not duplicate an unverified one). 4) Contact/CTA. |
| DRAFT COPY | **Eyebrow:** "PARTNERS". **Title:** "Work with the Institute." **Intro:** "Organisations engage with the Institute's principles, frameworks and standards work in several ways — through procurement pilots, research collaboration, or contributing to the open-source ecosystem." **Forms of partnership (conservative, ships as-is):** "**Standards & policy** — joint work through ISO/IEC, IEEE, ACM, Linux Foundation, UN CSTD and European Commission channels. **Frameworks** — piloting AI-RFX or the ML Maturity Model inside procurement. **Research** — contributing data, case studies or engineering time to open frameworks (KAOS, Kompute, XAI, the production-ML ecosystem). **Network & newsletter** — supporting the Ethical AI Network or ML Engineer newsletter." **Current partners:** "[OWNER: this section must reuse only the same owner-confirmed org list as the homepage marquee (`10-sheet-homepage.md` §Affiliation marquee) — do not introduce a second, divergent list.]" **CTA:** "Start a conversation" → shared contact form. |

---

## /fellowships

Wholly NEW page. No existing content anywhere in the audit or crawled inventory — the inventory explicitly lists fellowships as "Fully NEW — no source material."

| | |
| --- | --- |
| PURPOSE | nav-proposal.md places "Fellowships" under Network → Programme, alongside talks/events/partners — implies a people-facing programme (distinct from open membership), likely tied to the four-phase strategy's individual-empowerment phase. Because there is zero source substance, this page carries the most owner-input risk in the cluster. |
| STRUCTURE | 1) Hero. 2) What a fellowship is (must be defined by the owner — duration, focus, output). 3) Who it's for. 4) How to apply / express interest. |
| DRAFT COPY | **Eyebrow:** "FELLOWSHIPS". **Title:** "[OWNER: confirm — is this a real, active programme, or an intended future one? Title and all copy below depend on the answer.]" **Conservative placeholder intro, safe only if the programme is real and simply undocumented:** "A programme for practitioners and researchers to work with the Institute on the nine Responsible AI Principles in practice. [OWNER: confirm scope, duration, and whether fellowships are funded, credentialed, or informal.]" **If the programme does not yet exist:** do not publish an "apply" page implying an active programme — instead ship a short intent statement ("The Institute is developing a fellowship programme — [contact us](/contact) to register interest") until the owner confirms real structure. **Recommendation:** treat this page as the one most likely to slip to a later stage; everything above is a placeholder shape, not approved copy. |
