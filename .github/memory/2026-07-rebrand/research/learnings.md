# Learnings & caveats from the evaluation (rounds 1-8)

Hard-won facts. Read before touching the codebase; each one cost a debugging cycle or an audit finding.

## Process learnings

- **"Looks close" is not a gate.** Every fidelity regression survived until verification became MEASURED: DOM assertions + pixel-sampled canvases + computed-style diffs against the live prototype. Keep the live-original comparison harness for any new section work.
- **Screenshot artifacts lie:** full-page captures paint sticky headers over the hero and catch 450ms swap animations mid-fade — verify suspicious visuals live before "fixing" them.
- **Agents drift toward hardcoding under fidelity pressure** (the recurring disease of rounds 4-6: copy invented in templates, content buried in components, JSX blobs in MDX). The countermeasure is the parity audit posture: content-free templates as an explicit review criterion on every PR.
- **Divergent duplicate values are a refactor trap**: the same stat existing in two files with different numbers breaks any "no visual change" guarantee. Reconcile to one canonical source BEFORE moving data.
- **Codex sessions echo briefs AND files-they-read into logs** — log-grep completion signals are unreliable in both directions: a done-marker from the brief matches instantly, and (observed live) an agent reading THIS FILE echoed the documented signal string and fired a false completion. Use out-of-band signals: process liveness / exit codes, never log content. Also: `pkill -f` patterns must not match your own monitor's command line.

## Astro-specific caveats

- Canvas resize feedback loop (round-4 KAOS bug): container height must come from CSS; ResizeObserver refits the backing store only. Any widget that grows its own container will loop.
- `public/` scripts need `is:inline` on the `<script src>` or Astro tries to process them.
- Orphaned-looking data files are a live trap (pre-r8 `survey.json` looked authoritative, was imported nowhere) — every `src/data/` file must have a consuming import; delete or wire, never leave ambiguous.
- Stray `<` / `{` in MDX prose = build error; slot-name typos = silent empty render (the one quiet failure left — check slot names in review).
- A stale `astro dev` daemon can hold a port while refusing connections — `npx astro dev stop` (or kill the pid it names) before re-serving.
- Dev-server port conflicts with the prototype server (:8000) and evaluation ports (4124/4125) — check before serving.

## Design/content caveats

- The design handoff README + prototype HTML are ground truth; the prototype renders fully when served over HTTP (serve it — don't file-open).
- 9s hero cycle: glitch keyframes (65.6-76.7%) intentionally lead the canvas tear (6.4-7.4s) — both are clock-locked to page load; keep them in one timing system.
- KAOS compact variant triggers below 220px — the dropdown preview depends on it.
- Reveal must be driven by BOTH an IntersectionObserver and a scroll-position sweep (handoff explicitly warns observer-only breaks on fast/programmatic scroll).
- AI-RFX = 8 criteria; principles = 9 — different models, both correct.
- Old site's `<meta name="author">`-style stragglers: grep for the legacy org name when touching chrome — the rebrand found leftovers in odd places.

## Evaluation history (one line each, full detail in the research repo)

R1 authoring spike (4 tools) → R1b real-world extension (collections/variants/forms) → R2 design fidelity (3 finalists) → R3 prose-first pivot + Hugo re-entry → R4 9-page parallel implementation (Hugo vs Astro) → R5 prototype-as-ground-truth corrections → R6 pixel-fidelity vs live original → R7 authoring-parity refactor + conventions → R8 symmetric remediation (Astro routing regime; Hugo validation gate) → decision: **Astro** (see `adr-001-platform.md`; full reasoning in research repo `impl/decision.md` + `impl/fresh-eyes-review.md`).
