PROPOSAL — for owner review

# Network cluster content sheet — /network (newsletter-first), /talks (talks & events merged), /membership, /partners (+ deep dives incl. featured policy)

This version replaces the earlier CURRENT/SOURCE/PROPOSED tables with the proposed content inline, per the sheet 11/12/13 approach: each page section outlines the content to add plus its widgets. ⚠ = unverified number · **[OWNER: …]** = confirmation needed.

## Scope and grounding decisions (owner-directed 2026-08-01)

| Decision | Detail |
| --- | --- |
| Page set | `/network` (reworked, newsletter-first) · `/talks` (Talks & Events MERGED into one page: upcoming speaking, past events, featured talks) · `/membership` (NEW: the value and benefits of membership) · `/partners` (kept as the router page) + `/partners/<slug>` deep-dive pages, with a FEATURED policy/standards deep-dive that becomes the home for sheet 17's content. |
| Dropped | `/fellowships` — not a page we keep (no programme exists; removed from the sitemap and nav proposal). `/events` as a standalone route — merged into `/talks`. `/newsletter` as a standalone route — the newsletter opens `/network` instead; the archive under `public/mle/` stays as is. |
| Sheet 16 | `16-sheet-research.md` DELETED — the Institute has no research estate to build a page from at the moment; drop the route from the sitemap. |
| Featured talks source | Verified against the owner's YouTube playlist (`youtube.com/playlist?list=PL7F3ZwS1Ae8UJIbFB_yBFUSe3cNtpZObi`, fetched 2026-08-01, 15 videos) — full list in the /talks section below. This CONFIRMS the KubeCon Europe talk the previous sheet version flagged as invented (KubeCon Europe 2021, "Automated Machine Learning Performance Evaluation in Kubernetes at Scale"). |
| Members listing | Open question resolved toward a **membership page** (value/benefits), NOT a public directory of individual members (privacy + maintenance burden + no source list). Member ORGANISATIONS continue to surface via the network directory / affiliation marquee under the existing owner-verification rule. **[OWNER: confirm no individual-member listing anywhere.]** |
| Numbers rule | The two headline numbers are the cluster's spine: **70k+ newsletter subscribers** and the network member count (prototype shows 1,034 ⚠). Issue count is provably >393 (repo archive reaches at least #397). **[OWNER: confirm member count and current issue count at publish time; subscriber figure ships as "70k+" which is safely below the tracked 70,412.]** |

## /network

The page is about the network, ordered as the owner directed: newsletter first (the largest real audience), then the network itself, then the route in. Existing components (`FormSection` with the shared `contactForm` copy, `NetworkDirectory`) are reused; the page is a re-composition, not a component rebuild.

- **Hero**: keep title *"A network of aligned humans"* (strongest line in the estate for this page). Intro: *"Responsible technology takes more than changes to models — it takes a network of accountable people across engineering, research, policy and standards. It starts with the ML Engineer newsletter and runs through the Ethical AI Network."*
- **Section 1 — The newsletter (opens the page)**: eyebrow `ML ENGINEER NEWSLETTER`. Lead: *"Weekly, curated, technical — the Machine Learning Engineer newsletter reaches 70k+ practitioners with hand-picked material on production ML, security, monitoring and the open-source tools that keep systems running."* Themes line (all attested in master `mle.html`): production ML · MLOps · monitoring · ML security · explainability · GPU acceleration · LLMs · AI policy. **Widget — recent issues rail**: the existing recent-issues pattern (`#NNN — title` linked into the archive), derived from `public/mle/*.html` filenames per the derived-facts convention (never a hand-maintained list — this also fixes the stale-issue-number problem structurally). **CTA**: Subscribe → `/contact/?interest=newsletter#contact` reusing the interest tick animation shipped for the framework CTAs.
- **Section 2 — The network**: eyebrow `ETHICAL AI NETWORK`. Lead: *"[N] members ⚠ across engineering, research, policy and standards — practitioners, researchers and institutions sharing the difficult work of responsible AI."* **Widget — directory**: keep `NetworkDirectory` (sectors + member organisations) with the carried-over flags: sector percentages are prototype-invented and sum to 90% ⚠ **[OWNER: supply real distribution or drop the sector panel]**; the org list must match the owner-verified homepage marquee list, stated as collaboration where membership isn't accurate.
- **Section 3 — Join**: one line of membership value (*"Membership is contribution: principles, frameworks, open source, events and reviews."*) linking `/membership/` for the full picture, then the shared `FormSection` (network-split variant, same as homepage/contact after the unification).

## /talks — Talks & Events (merged)

One page for where the Institute speaks: upcoming first (a reason to check back), then the featured talks, then the broader past-events record. Fellowship/events routes fold in here.

- **Hero**: eyebrow `TALKS & EVENTS`, keep title *"Ideas carried into the room"*, intro: *"Keynotes, conference talks and roundtables on production ML, security, explainability and agentic systems — where the network shows up in person."*
- **Section 1 — Upcoming**: eyebrow `SPEAKING NEXT`. Owner-fed list (venue, date, talk title, link). Empty-state copy that ships when nothing is scheduled: *"No public dates right now — announcements go out first through the ML Engineer newsletter."* with the newsletter CTA. **[OWNER: supply any upcoming 2026 engagements.]** **Widget**: simple dated list rows (no new machinery); rows link out per the Links rule.
- **Section 2 — Featured talks**: the verified playlist, rendered with the existing `TalkCard` pattern (poster + external YouTube link) in a grid; suggest featuring 6–9 with the rest behind a "All featured talks →" link to the playlist. Verified list (owner's playlist, newest-first as published):
  1. The State of GenAI in 2025 — WWC25 keynote — `youtube.com/watch?v=v2LENQOG-Xg`
  2. The State of Production Machine Learning in 2024 — WeAreDevelopers 2024 — `youtube.com/watch?v=NycftytgPnk`
  3. The State of GenAI 2025 — Code Talks 2025 keynote (with Dat Tran) — `youtube.com/watch?v=cXYpyHTvFRk`
  4. Guide towards algorithm explainability in ML — PyData London 2019 — `youtube.com/watch?v=vq8mDiDODhc` (already used on the XAI page — keep both, same asset)
  5. Real-time NLP & ML with Spark Streaming, Kafka — Infoshare 2019 — `youtube.com/watch?v=u-bIWsNpwrw`
  6. The State of GenAI & ML in the Cloud Native Ecosystem (with Bartosz Ocytko, Zalando) — `youtube.com/watch?v=0uJGmMZGUJE`
  7. [NeurIPS Workshop keynote] Security in ML Systems: Risks and Best Practices — `youtube.com/watch?v=7XSy5aw8oU8`
  8. MLOps tools to scale your production ML — FOSDEM 2019 — `youtube.com/watch?v=Ynb6X0KZKxY`
  9. [NeurIPS Workshop keynote] Practical AI Ethics — A Guide Towards Responsible ML — `youtube.com/watch?v=57YpXjcj0Ho`
  10. Production ML Monitoring: Principles, Patterns and Techniques — `youtube.com/watch?v=QcevzK9ZuDg`
  11. Beyond CUDA: GPU-accelerated Python on cross-vendor graphics cards (Kompute + Vulkan SDK) — `youtube.com/watch?v=AJRyZ09IUdg`
  12. GPU Computing & Optimizations Made Simple with C++ Kompute & Vulkan — `youtube.com/watch?v=Xz4fiQNmGSA`
  13. A CI/CD Framework for Production ML at Massive Scale (Jenkins X + Seldon Core) — `youtube.com/watch?v=68_Phxwaj-k`
  14. Automated ML Performance Evaluation in Kubernetes at Scale — KubeCon Europe 2021 — `youtube.com/watch?v=8ORl8lu1Eeo`
  15. Accelerating High-Performance ML at Scale (with Elena Neroslavskaya) — `youtube.com/watch?v=hj_lozIqo5M`
  **[OWNER: pick the featured 6–9 and confirm venue labels where the video title doesn't carry one (items 10, 13, 15).]**
- **Section 3 — Past events**: the wider record beyond recorded talks — roundtables, workshops, panels (venue + year rows, no cards). Only owner-confirmed instances; the prototype `talks.json` entries are superseded by the verified list above. **[OWNER: optionally supply non-recorded past events; the section can also launch with recorded talks only.]**

## /membership

NEW page: what membership is worth, not who the members are. Replaces the fellowships slot in the sitemap.

- **Hero**: eyebrow `MEMBERSHIP`, title *"Membership is contribution."*, intro: *"The Ethical AI Network is free and built through contribution — members shape the principles, frameworks and open-source tools the Institute maintains, and carry them into their own organisations."* **[OWNER: confirm membership remains free/application-based.]**
- **Section — What you get**: benefit rows grounded in the master `network.html` contributions list, stated as member value: a network of aligned practitioners across engineering, research, policy and standards · early input on the principles and frameworks (AI-RFX, maturity model, security) · roundtables, events and reviews · the newsletter and its community · visibility for your contributions (talks, case studies, open source).
- **Section — Who it's for**: the master's membership criteria rephrased to the current register: founders and scale-ups, professionals procuring or operating AI systems, professors and academics, engineers and data scientists, product and delivery managers, leaders across AI, alignment and data.
- **Section — How it works**: apply via the shared form (network interest pre-ticked via `/contact/?interest=network#contact` with the tick animation), applications reviewed by the Institute. **[OWNER: confirm the actual review/acceptance process in one sentence.]**
- **Widget**: none new — benefit rows + the existing form/CTA vocabulary. Deliberately a prose-and-rows page.

## /partners — index + deep dives

`/partners` stays the router: who the Institute works with and the ways in. NEW: selected relationships get `/partners/<slug>` deep-dive pages; the FIRST and featured deep dive is the policy & standards work, which is where sheet 17 (`17-sheet-standards-policy.md`) content lands — that sheet now feeds `/partners/policy/` rather than a standalone standards section.

- **Index hero**: eyebrow `PARTNERS`, title *"Work with the Institute."*, intro: *"Organisations engage through procurement pilots, research collaboration, open-source contribution, and joint standards and policy work."*
- **Index — forms of partnership** (ships as-is, conservative): Standards & policy (ISO/IEC, IEEE, ACM, Linux Foundation, UN CSTD, European Commission channels) · Frameworks (piloting AI-RFX / maturity model in procurement) · Open source (KAOS, Kompute, XAI, production-ML ecosystem) · Network & newsletter support.
- **Index — current partners**: the owner-verified org list only (same list as the homepage marquee — one list, never two divergent ones), each row linking out, and linking to a deep-dive page where one exists. **Widget**: reuse the partner directory/marquee vocabulary; rows with a `DEEP DIVE →` affordance where a detail page exists.
- **Deep-dive template `/partners/<slug>`**: hero (org/programme, relationship eyebrow), "What we do together" (concrete artefacts: committees, publications, donated projects, contributed clauses), links to the artefacts, CTA back to contact. First instances: **FEATURED: `/partners/policy/`** — the standards & policy engagement page (EU AI Act contribution incl. the Article 14 human-oversight work already cited on P01, UN CSTD, ISO/IEC, ACM, IEEE, Linux Foundation committees) — content to be finalised from sheet 17, which should now be drafted AS this page. Candidate seconds when ready: Linux Foundation (Kompute donation + ML Security Committee), OWASP (agentic top-10 reviewer credit, cross-linking `/frameworks/security/`). **[OWNER: confirm the first deep-dive set — recommend shipping with policy only and growing.]**
- The featured policy page is surfaced on the index with a full-width featured card above the partner rows.

## Build inventory

| Page | Route | Status | Components |
| --- | --- | --- | --- |
| Network | `/network/` | recompose | ArticleHero, newsletter section (recent-issues rail derived from `public/mle/`), `NetworkDirectory`, `FormSection` (shared copy) |
| Talks & Events | `/talks/` | rework | ArticleHero, upcoming list rows, `TalkCard` grid (featured playlist), past-events rows |
| Membership | `/membership/` | NEW | ArticleHero + benefit rows + CTA (no new machinery) |
| Partners index | `/partners/` | rework | ArticleHero, featured policy card, partner rows with deep-dive affordances |
| Policy deep dive | `/partners/policy/` | NEW (featured) | from sheet 17 — drafted as this page |
| Fellowships | — | DROPPED | remove route/nav references |
| Research | — | DROPPED | sheet 16 deleted; no route |

## Open owner inputs

1. Member count and current issue count at publish time (subscriber figure ships as "70k+").
2. Real sector distribution for the directory, or drop the sector panel.
3. Upcoming speaking engagements for /talks, and the featured 6–9 picks from the verified list.
4. Membership process sentence (how applications are reviewed) and confirmation membership stays free.
5. First deep-dive set beyond `/partners/policy/` (recommend: launch with policy only).
