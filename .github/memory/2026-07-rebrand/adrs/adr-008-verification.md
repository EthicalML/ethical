# ADR-008 — Verification strategy: the measured-comparison harness, in-repo

**Status:** ACCEPTED

## Principle (the core evaluation learning)

"Looks close" is not a gate. Every fidelity regression during the evaluation survived until verification became MEASURED. All verification runs as scripted, repeatable checks — a command, not folklore.

## The harness

Port the evaluation tooling into **`scripts/verify/`** during Milestone A (currently scratch scripts in the research repo). Components:

1. **Build gate** — `npm run build`: schemas + type errors are the loud-failure layer; never bypassed (run locally per change during development; in the Actions workflow once it exists at cutover).
2. **DOM gate** (headless Chromium/Playwright, per affected route): zero page errors; every `[data-reveal]` revealed after a slow scripted scroll; every canvas present AND pixel-sampled non-blank; page height sane (<20k px — catches the resize-feedback bug class); route-specific assertions (e.g. explorer auto-advance, dropdown geometry) as they accrue.
3. **Visual gate** — full-page screenshots per route: diffed against the PREVIOUS build for refactors (zero-visual-change work masks canvas regions), and against the **live-served design prototype** (ADR-006) for new/changed sections — computed-style diffs + per-section pixel sampling, never eyeballing.
4. **Cutover-only gates**: placeholder grep (ADR-005) returns zero unapproved hits; full-site link check; redirects resolve; CNAME + `mle/*` continuity verified on the built artefact; `google-site-verification` meta present; analytics tag present (see below).

## Continuity assertions (carried from the live site — MUST survive into the new chrome)

- The `google-site-verification` meta tag from the current header (Search Console access depends on it, exactly when cutover needs it).
- **Google Analytics**: the live site carries GA in its base layout head — carry the same property tag into `BaseLayout.astro`. Verified by the DOM gate (tag present, fires no console errors).

## Phased operation

- **During development:** the gates are run and adapted by the ORCHESTRATOR per change — explicit agent-level steps with judgment (which routes, which assertions, what changed), not a fire-and-forget pipeline. The harness is reviewed as it is ported (every check read and justified against the imported tree), and checks evolve with findings.
- **At stabilisation (cutover phase):** the by-then-stable steps are frozen into the automated rig alongside the GH Actions workflow. Premature delegation of quality to CI is explicitly rejected — automation inherits a proven process, it doesn't substitute for one.

## Operating rules

- Every commit-batch runs gates 1-2 on affected routes; gate 3 on anything visual; the definition of done in `research/conventions.md` points here.
- Gate scripts live with the site and evolve with it — a new interactive behaviour lands together with its DOM assertion.
- Screenshot artefacts land in a git-ignored `scripts/verify/out/`; only findings are committed (in commit messages / memory), not image blobs.
