# Agent guide

The website for The Institute for Ethical AI Alignment & Safety (`ethical.institute`). An Astro static site deployed to GitHub Pages by `.github/workflows/deploy.yml` on every push to `master`. The legacy Jekyll site is preserved at the `legacy-jekyll` tag and is the content source of truth when rebuilding a legacy page.

## Change workflow

All changes land on `master` through a pull request; direct pushes are blocked by a branch ruleset.

1. Branch from `master` (agents work in their own git worktree so parallel tracks never share a dirty checkout).
2. Commit with comprehensive messages. Do not append session URLs to commit messages or PR bodies.
3. Push the branch and open a PR with `gh pr create`.
4. CI (`.github/workflows/ci.yml`) runs the gates: `npm run lint`, `npm run format:check`, `npm run check:ratchet`, `npm run build`.
5. Merge once CI is green. The merge landing on `master` triggers the production deploy.

CI does not yet run the Playwright DOM gate, so `npm run verify:dom -- <route> --viewport 1440x1000` (and `420x900`) for affected routes remains a local pre-PR responsibility, as does the rest of the definition of done in `CONVENTIONS.md`.

## Which document to read when

| Document | Read it when |
| --- | --- |
| `CONVENTIONS.md` | Before touching any page, component, style, or animation. It is the authoring law: content placement, client behaviour rules, the Motion table, and the full definition of done. |
| `REUSABLE.md` | Before using or changing a documented reusable presentation component; API changes update the entry in the same change. |
| `scripts/verify/README.md` | Before running or editing the verification harness (DOM gate, screenshots, ratchet). |
| `scripts/forms/apps-script.gs` | Before changing the contact form or its delivery. This file is the receiver's source of truth, deployed manually in the Google Apps Script editor; form field changes must stay aligned across `src/data/contactForm.ts`, `src/components/FormSection.astro`, this script, and the spreadsheet's column order. |

There are currently no path-scoped instruction files (`.github/instructions/`); if any are added, list them here with their globs and when to read them.

## Local commands

Node version is pinned in `.tool-versions`. `npm run dev` for the dev server, `npm run build && npm run preview` for the production build. Temporary files go under `./tmp`, never `/tmp`.

## Editorial rules

- Markdown prose does not hard-wrap; let lines overflow.
- No em dashes in site prose; no ASCII-arrow link text (`Label →`).
- Organisation name: The Institute for Ethical AI Alignment & Safety. Network: Ethical AI Network. Principles: The 9 Responsible AI Principles.
