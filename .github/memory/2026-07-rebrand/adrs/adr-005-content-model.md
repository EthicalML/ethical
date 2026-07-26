# ADR-005 — Content model: collections, data files, canonical values

**Status:** ACCEPTED · Shaped by rounds 4 (scale), 7 (parity audit), 8 (de-tupling/single-sourcing).

## Collections (page-generating, schema-validated)

- `principles` — nine entries `01-…` to `09-…`; fields: `number`, `title`, `commitment`, `failure_modes[]`, `controls[]`, plus markdown body. Feeds the homepage/`/principles` explorer AND generates `/principles/NN/` detail routes. Adding `10.md` requires zero index changes. Extend the Zod schema with any new field — silent extra keys are not allowed.
- Add further collections only when a set becomes iterated (candidate: projects, if project pages multiply beyond the current four).

## Data files (`src/data/*.json`, named-key objects only)

- `site.json` (wordmark, chrome, legal), `nav.json` (all five menus), `stats.json` (evidence band), `affiliations.json` (marquee), `projects.json` (open-source showcase), `home-reports.json` (§04 maturity/OWASP rows), `survey.json` (single source for the island), `network-sectors.json`, `newsletter-issues.json`, `network.json`, `footer.json`, `talks.json`.
- Every value must be self-describing at the edit site (named keys). No duplicated value sets: one canonical source per fact, established in round 8 against the live prototype — keep it that way.
- **Placeholder policy:** every invented number/name carries a `"_placeholder": true` sibling key or a `<!-- PLACEHOLDER -->` comment at its authoring site. The cutover gate greps for these — nothing placeholder ships silently. Known placeholder classes: member/subscriber counts, survey values, repo metrics, talks, member names, affiliation roles.

## Content facts that bite

- AI-RFX has **8** assessment criteria (its own model) while principles count **9** — do not "fix" one to match the other.
- The affiliation marquee needs licensed logo SVGs (typographic wordmarks stand in until then).
- The newsletter archive (`mle/*` in the old repo) stays out of the new system: keep serving/linking, never migrate or read it.
- Legacy URLs get `redirects` entries + canonicals at cutover (SEO task) — old `.html` content must never coexist with new routes without stubs.
