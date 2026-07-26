# ADR-001 — Platform: Astro, static output, GitHub Pages via Actions

**Status:** ACCEPTED (2026-07-26, owner decision after 8 evaluation rounds) · Supersedes the earlier Jekyll-oriented ADR-001 drafted before the spikes.

## Decision

Rebuild ethical.institute on **Astro** (v7 line, pinned via lockfile + `.tool-versions` node pin), **static output only** (`output: 'static'`), MDX for content pages, deployed to **GitHub Pages via a GitHub Actions workflow** (build `dist/`, `actions/upload-pages-artifact` + `actions/deploy-pages`). No SSR, ever, while hosting is GH Pages — do not add server-mode features.

## Why Astro (condensed from the decision docs)

- Explicit wiring won the owner's traceability test once remediated: leaf pages are direct `.mdx` files whose front matter names the layout as a literal path and whose imports name their components — one-hop answers to "where does this come from".
- Native guardrails: Zod-schema'd collections + compile-time checks fail the build loudly with file/line. The Hugo equivalent required an owned, bypassable validation script — custom machinery vs product feature was the deciding asymmetry.
- Best-owned template files (`.astro`/`.tsx`), and the one genuinely stateful widget (survey explorer) is idiomatically a Preact island.
- Toolchain overhead (npm tree, yearly majors) explicitly down-weighted by owner; mitigated by lockfile + agent-driven maintenance.

## Why not the others (all fully implemented and measured — see research repo)

- **Hugo** (runner-up; reached visual+traceability parity): its parity depended on conventions and owned scripts; Go templates; heading render hooks cannot restructure documents (no section wrapping); implicit template lookup was the owner's core objection. Right choice under prose-purity/ops-austerity/dormancy weights — not this owner's.
- **Jekyll (+Actions)**: won the pre-prose-first rounds on migration carry-over, but the redesign replaces every page/template so carry-over is worth little; Ruby toolchain disliked by owner; component ergonomics need an owned 133-line plugin.
- **Eleventy**: best authoring calls, but component markup in JS strings + markdown paragraph-wrapping conflicts persisted across rounds.

## Consequences & constraints

- GH Pages is static-forever: forms keep posting to external endpoints; no auth/server features. If that ever changes, hosting changes first, not the framework.
- A stray `<` or `{` in MDX prose is a build error — accepted cost, covered by conventions and loud builds.
- Exit cost is the highest of the candidates (`.astro`/MDX translate manually); accepted knowingly.
- Legacy URL migration (`/network.html` → `/network/`) via Astro `redirects` config + canonical tags — see plan and SEO task.
