# Content & prose curation — the unfinished workstream

Across the evaluation, engineering fidelity was driven hard but COPY was repeatedly invented by agents under placeholder license. Round 5 restored the homepage to the prototype's verbatim text, but the prototype itself marks content as placeholder, and every non-homepage page carries agent-drafted prose the owner has never signed off. This file scopes the curation work (plan Phase 1).

## The fundamental frame: this is a REBRAND, not a re-skin

The organisation is being repositioned from **"The Institute for Ethical AI & Machine Learning"** to **"The Institute for Ethical AI Alignment & Safety"**. A 1:1 name-replace PR already landed on the live site, but that was the mechanical step — the redesign carries the larger move: existing prose is a *starting input to be rephrased into the new positioning* (safety, alignment, frontier/agentic framing), NOT content to migrate verbatim. Expect every carried-over passage to be reworked for the new identity; carrying legacy responsible-ML phrasing unmodified is a review finding, not a convenience.

## Canonical sources, in order of authority
1. **Owner decisions** (this workstream's output) — final.
2. **The current institute website as it stands** (rebranded master of this repo) — the source of truth for existing substance: the 9 principles' commitments (incl. #9 "Alignment with intent"), MLSecOps/AI-RFX/MLMM framework content, NeurIPS keynote entries, network member organisations, newsletter facts — plus prose from the project pages, blog posts and related published material. All of it subject to the rebrand rephrasing above; the research-repo `institute-crawled-content.md` inventory maps what exists.
3. **The design prototype's copy** (handoff README + prototype HTML) — canonical for homepage structure/tone; its numbers are explicitly illustrative.
4. Agent-drafted spike prose — treat as DRAFT everywhere; never promote silently.

## Known placeholder inventory (must be resolved before each cluster ships)
- **Numbers:** network members (1,034), subscribers (70,412), issues (393 — verify current), GitHub stars/contributors/releases per project, survey percentages/datasets, evidence-band figures.
- **People/entities:** member names in forms/examples, talks list + thumbnails, affiliation roles wording (UN/UN CSTD/EC/ACM/LF/OWASP/IEEE/ISO/NumFocus — verify current titles), marquee logos (licensing).
- **Prose:** all principle detail bodies (failure modes/controls were agent-drafted — review against the original principles text), research/standards/policy cluster pages (pure stubs), about/team/fellowships/events (drafted), KAOS/Kompute/XAI/Production-ML project copy (drafted against real READMEs — verify claims).
- **Survey:** the explorer dataset is illustrative; wire the real 2024/2025 survey data (`data.csv`, `data-2025.csv` in this repo) or an owner-approved extract.

## Voice & style (from the rebrand + design direction)
- Name everywhere: **The Institute for Ethical AI Alignment & Safety**; network = **Ethical AI Network**; principles = **The 9 Responsible AI Principles**; no "(BETA)", no "Bell Labs" claims, no "Europe-based research centre" framing.
- Register: technical, sober, practitioner-first; safety/alignment framing over responsible-ML legacy phrasing; avoid marketing superlatives; British-leaning spelling per existing content.
- Mono eyebrows are UPPERCASE and terse; headings are sentence case with the design's serif/italic accent conventions; body copy short paragraphs, no filler.

## Workflow
1. Per cluster (homepage → open-source → principles → frameworks/reports → network → about): generate a copy sheet (current text vs proposed final, per section, placeholders flagged) as markdown in the research repo.
2. Owner edits/approves the sheet — the sheet, not the page, is the review surface.
3. Codex applies approved copy verbatim (no paraphrasing on application); placeholder markers removed only by this path.
4. Grep gate at cutover: zero remaining placeholder markers (see ADR-005 policy).
