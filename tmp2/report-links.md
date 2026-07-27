# Evidence link wiring report

Date: 2026-07-27

Branch: `redesign-astro`

## Result

- Replaced 12 of the original 24 `[OWNER-LINK]` placeholders with owner-confirmed or high-confidence evidence links.
- Added the TUM / TUM IEAI speaker-series relationship to the affiliation marquee and the partners page.
- Wired high-confidence NeurIPS 2022/2023, Kompute, AI-RFX, MLSecOps, Awesome AI Guidelines, production-ML list, KAOS repository, and verified HackerNoon KAOS article and translation links into the relevant pages and data-driven cards.
- Corrected MLSecOps to `https://github.com/EthicalML/fml-security`.
- Did not link `kaos.cc` or EssentialKaos.
- All rendered external links added by this change use `rel="noopener"` and follow the existing same-tab convention.

## Remaining `[OWNER-LINK]` placeholders

Total: 14. Of these, 12 are unresolved placeholders from the original 24 and two explicitly preserve the ambiguous KAOS domain and Medium evidence requests.

1. `/partners/` United Nations role evidence — a public UN record naming the Institute or Alejandro Saucedo is needed; current evidence is email-only.
2. `/partners/` UN CSTD relevant output — a published output identifying the Institute's or Alejandro Saucedo's contribution is needed.
3. `/partners/` European Commission appointment record — a public appointment record naming Alejandro Saucedo is needed.
4. `/partners/` European Commission relevant output — a published output identifying the Institute's or Alejandro Saucedo's contribution is needed.
5. `/partners/` ACM relevant output — a published ACM output identifying the Institute's or Alejandro Saucedo's contribution is needed.
6. `/partners/` IEEE working-group record — the IEEE P7000-series PDF naming Alejandro Saucedo was not found.
7. `/partners/` IEEE relevant output — a published IEEE P7000-series output naming Alejandro Saucedo is needed.
8. `/partners/` ISO/IEC working-group record — a public record naming the Institute or Alejandro Saucedo is needed.
9. `/partners/` ISO/IEC relevant output — a public output identifying the Institute's or Alejandro Saucedo's contribution is needed.
10. `/initiatives/` ISO/IEC contribution — a public record naming the Institute or Alejandro Saucedo is needed.
11. `/initiatives/` IEEE contribution — the IEEE P7000-series PDF naming Alejandro Saucedo was not found.
12. `/initiatives/` European Commission appointment — a public appointment record naming Alejandro Saucedo is needed.
13. `/initiatives/` KAOS project domain — the real domain for the Institute's Kubernetes agent project is needed; `kaos.cc` redirects to the unrelated EssentialKaos project.
14. `/initiatives/` Medium coverage — a verified Medium article specifically describing the Institute's KAOS Kubernetes agent project is needed.

## Verification

- `npm run build`: passed with Node 22.14.0; 25 pages built.
- Port 4126 generated-DOM gate: `/partners/` and `/initiatives/` returned HTTP 200; counts were 9 and 5 remaining placeholders respectively; all rendered external anchors had `rel="noopener"`; TUM appeared in the marquee and partner section; corrected MLSecOps and KAOS evidence links were present; no ambiguous KAOS domain appeared in rendered HTML.
- Link response check: NumFOCUS, TUM IEAI, Linux Foundation, OWASP, all GitHub repositories, and both YouTube links returned HTTP 200. UNCTAD and ACM returned HTTP 403 to automated requests but are owner-confirmed URLs.
- Verified the HackerNoon article content before linking: it is authored by Alejandro Saucedo and explicitly describes `axsaucedo/kaos` as the Kubernetes Agent Orchestration System; the Spanish URL is the translation linked by that article.
- `git diff --check`: passed.
- 1440px interactive browser gate: not run because the in-app browser exposed no available browser instance in this session. No substitute browser-control backend was used.
