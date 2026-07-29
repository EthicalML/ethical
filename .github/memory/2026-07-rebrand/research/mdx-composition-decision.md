# MDX composition investigation — settled: keep the front-matter model (2026-07-29)

**Question:** are the designed pages over-using front-matter YAML (large data blocks consumed by components) versus the ecosystem's body-composition style? Raised by owner; investigated with an OSS survey plus a working experiment; **settled: keep the front-matter model, deliberately. Revisit only if a concrete pain point recurs.**

## Evidence trail

- OSS survey (`tmp2/mdx-vt-survey.md`, agent-run over starlight / astro.build / withastro docs / cloudflare-docs / t3.gg): MDX element mapping (`export const components`) is used by NONE of them — element treatment is done with remark/rehype plugins (our `rehype-sectionize` is already the idiomatic mechanism). Designed pages there are `.astro` compositions; prose pages are MDX bodies with imported components; none use heavy front-matter section arrays.
- Experiment (worktree `tmp/experiment-mdx`, branch `expt/mdx-composition`, report in its `tmp2/report-expt-mdx.md`): homepage re-authored body-composition style at `/expt-home/` — **byte-identical rendered DOM**, front matter 283→5 lines, total lines ~equal. Single edits (headline, card copy, new card) are one-line-ish diffs in BOTH models; line count decides nothing. Measured costs of the body style: JSX object-literal props for data tables (owner: "annoying JSON"), named-slot prose needs `{'…'}` string-expression escaping (owner: "strange"). `/expt-prose/` demonstrated one tasteful element mapping (external-link treatment) — noted, not adopted.
- Third shape sketched for reading (`expt-home2.mdx`, unwired): item components (`<PhaseCard label=… title=…>` with markdown children). Wins only for prose-bearing items; costs one `.astro` file PER item component (hard platform limit: one .astro file = one component) or a `.tsx` multi-component file. Owner rejected the file sprawl; phases/stats are pure data where YAML is simply better.

## Ruling

1. Front-matter YAML remains the home for page-owned structured content, **including when it dominates the file** (homepage). This is intentional, not a smell — agents must not "fix" it. ADR-009 §5 carries the same clarification.
2. Escape hatches, sanctioned but not required, for when they are ever earned: prose-bearing items (sentences a human edits, links, emphasis) may move to component children in the MDX body; multiple render-only item components may share one `.tsx` file. The dividing question: *could the field ever contain a link or emphasis?*
3. MDX element mapping is NOT adopted; rehype plugins remain the element-treatment mechanism.
4. The experiment worktree/branch stays as evidence; nothing converts.

## Status of the existing named slots

The few live prose slots (e.g. the Kompute donation sentence) predate this investigation, work, and stay. They are the known cost of the model; if their number grows enough to hurt, that is the trigger to revisit rule 2.
