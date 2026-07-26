# ADR-006 — Design source of truth: the prototype HTML, hosted

**Status:** ACCEPTED

## Decision

The single source of truth for the design is the Claude Design prototype in the handoff bundle (research repo `design/design_handoff_institute_homepage/`): `Institute Homepage - Alignment Field.dc.html` plus `SurveyChart.dc.html`, with the handoff README as its written spec (tokens, timings, per-section values). **The prototype must be HOSTED over HTTP to render correctly** — file-open does not execute the canvas widgets, the top-menu panel mechanics, or the include pages; serve it (e.g. `python3 -m http.server 8000` in that directory) whenever doing design comparison work. All fidelity verification is *measured against the live-served prototype*, not against memory or screenshots of it.

## Status of the current implementation vs the source of truth

Everything in the seed implementation was built/inferred from the prototype for evaluation purposes and approximates it to the level the evaluation rounds verified — but **the design is not yet locked down**: known inconsistencies remain, concentrated on the homepage. The first implementation step of the build plan is therefore a homepage design lock-down pass against the hosted prototype (see `plan/proposed-split.md`), closing the remaining deltas before any new surface is built.

## Design iteration tooling

For NEW design questions (pages the prototype doesn't cover, variant explorations, component treatments), **Claude Design is the sanctioned tool** — at the time of the evaluation it materially outperformed Lovable, Replit and bolt.new for this work. Outputs from such sessions extend the handoff bundle in the research repo and become part of this source of truth; ad-hoc design invention inside implementation sessions is what produced the round-4/5 drift and is not the path.
