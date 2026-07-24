# Copilot / Agent Instructions — The Institute for Ethical AI website

Context for AI coding agents editing this repository. Read this before touching any page. Keep changes **simple and surgical** — this is a small, hand-maintained static site, not an app. Do not introduce build tooling, frameworks, or abstractions unless explicitly asked.

## What this repo is

The live website for **The Institute for Ethical AI & Machine Learning** (domain: `ethical.institute`, see `CNAME`). It is a **Jekyll** static site served via **GitHub Pages**. There is no custom backend; forms post to third-party endpoints loaded by JS.

> **Rebrand in progress.** The organisation is being repositioned from *"The Institute for Ethical AI & Machine Learning"* to *"The Institute for Ethical AI Alignment & Safety"*. When editing copy, prefer the new positioning (AI alignment & safety) over the legacy "responsible ML / MLOps / procurement" framing, but keep changes consistent site-wide — the name appears in many places (navbar, footer, every page's front-matter `title`/`description`, README). Do not rename half the site. See `tmp/rebrand-content-review.md` (git-ignored working doc) for the full content plan if present.

## Tech + structure

- **Jekyll**: pages are `.html` files at the repo root with YAML front-matter (`title`, `description`, optional `image-banner`, `no-bootstrap`). Liquid `{% include %}` pulls in shared partials.
- **No `_layouts` / `_config.yml` / `_data`**: pages are self-contained and stitch partials manually via includes. Do not assume a standard Jekyll layout chain.
- **Shared partials** live in `_includes/`:
  - `navbar.html` — top navigation (org name, Principles menu, Institute Initiatives menu, Contact). **The single source of truth for the site menu.**
  - `header.html` — `<head>` boilerplate; conditional Bootstrap via `page.no-bootstrap`.
  - `footer.html` — social links + copyright (org name appears here).
  - `apply-form.html` — the "Contact us or join" form block, included at the bottom of most pages.
  - `subscribe-form.html` — newsletter subscribe block.
- `assets/` — CSS/JS (incl. Chart.js survey logic in `assets/js/state-of-ml-*.js`), `images/`.
- `replace_partials.sh` — helper that was used to extract inline blocks into `_includes/`. Historical; understand before rerunning.

## Page inventory (root `.html`)

| Page | Purpose | Key legacy terms to watch |
|------|---------|---------------------------|
| `index.html` | Homepage: mission, 4-phase strategy, 8 principles summary, AI-RFX, network CTA | "Europe-based research centre", "8 principles", "4 phases" |
| `principles.html` | The 8 Responsible ML Principles (full detail + case studies) | Principle #8 title is inconsistent ("Security risks" vs "Data risk awareness") |
| `security.html` | **MLSecOps Top 10** initiative | OWASP mapping table |
| `xai.html` | **XAI** eXplainable AI Framework (ALPHA) | |
| `eal.html` | **Ethically Aligned (Software) Licenses** | |
| `rfx.html` | **AI-RFX Procurement Framework** landing | |
| `rfp.html` | AI Request for Proposal template (long-form doc) | |
| `mlmm.html` | Machine Learning Maturity Model (long-form doc) | |
| `network.html` | Ethical (M)L Network members list + join | "(BETA)" appears repeatedly |
| `contact.html` | Just includes header/navbar/apply-form/footer | |
| `state-of-ml-2024.html` / `state-of-ml-2025.html` | Survey report visualisations (Chart.js + CSV) | data in `data.csv`, `data-2025.csv` |
| `mle.html` | Newsletter landing | |
| `privacypolicy.html` | Privacy policy | |

## Terminology (canonical — use consistently)

Legacy copy mixes several names for the same things. When editing, converge on ONE form per concept and apply site-wide:
- Organisation: **The Institute for Ethical AI & Machine Learning** → (target) **The Institute for Ethical AI Alignment & Safety**.
- Network: currently "Ethical AI Network" / "Ethical ML Network (BETA)" used interchangeably — pick one; consider dropping "(BETA)".
- Principles: "8 Machine Learning Principles" / "8 Principles for Responsible ML" / "The Responsible Machine Learning Principles" — pick one.
- Strategy: "4 phases towards responsible development of AI" (By Principle / By Process / By Standards / By Regulation).

## Conventions

- **Markdown files**: do NOT hard-wrap lines — let prose overflow (per repo/user convention).
- **HTML copy edits**: change only the text nodes; leave classes, structure, and Liquid tags intact. Grep for a phrase before editing — the same string often appears on multiple pages and in the navbar/footer.
- Front-matter `title` and `description` are the SEO/social text for each page — update them when rebranding.
- Fix-on-sight typos present in legacy copy: `togethers`, `devleopment`/`development` inconsistency, `rramework`, `Learnign`, `tempalte`, `prision`, `carefuly`, `identifie`.

## Token-efficiency rules for agents

- **Do NOT read `mle/*`** — it is the newsletter archive (huge, low value). Also skip `_site/` (generated output) and `blog`/`resources` bulk content unless the task is specifically about them.
- HTML pages are token-heavy. To review **copy**, extract visible text first (strip `<script>`/`<style>`/tags) rather than reading raw HTML. Read raw HTML only when you must edit structure/markup.
- Survey CSVs (`data.csv`, `data-2025.csv`) are large — sample, don't read whole.

## Local dev

Standard Jekyll: `bundle install` then `bundle exec jekyll serve` (uses `Gemfile`). Output goes to `_site/` (git-ignored). Commits should be comprehensive; do not append session URLs to commit messages or PR bodies.
