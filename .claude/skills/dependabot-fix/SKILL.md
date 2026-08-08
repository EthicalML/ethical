---
name: dependabot-fix
description: Comprehensively diagnose and fix a failing Dependabot PR on this Astro site. Use this skill when asked to run /dependabot-fix <pr-number>. The user provides the PR number in their prompt. The skill loads PR context, surveys errors at a high level, ingests relevant repo conventions and harness docs via subagents, performs a deep root-cause diagnosis, designs a risk-tiered fix with a manual testing strategy, runs a merge-base pixel-parity sweep to catch visual regressions CI cannot see, commits the fix directly to the Dependabot PR branch, merges when checks are green and the sweep measured zero pixels, posts a report as a comment on it (never commits it), and evaluates whether the skill itself needs updating afterwards.
allowed-tools: shell
---

# Dependabot Fix

Systematically fix a failing Dependabot PR. The user provides a PR number (e.g., `/dependabot-fix 42`).

This skill spans **six phases** (A–F). Do **not** start editing code until Phase D is complete. Do **not** dive into logs until Phase B is complete.

Set up scratch space once at the start:

```bash
mkdir -p ./tmp && touch ./tmp/null
PR_NUM=<from user prompt>
REPO=EthicalML/ethical
```

---

## Phase A — Context

### Step 1 · PR context

Fetch metadata and produce a one-paragraph written summary of the PR (ecosystem, grouping, size, whether it is a security update, which files it touches). Do **not** open source files yet.

```bash
gh pr view $PR_NUM --repo $REPO --json title,body,headRefName,labels,files,mergeable,createdAt
gh pr diff $PR_NUM --repo $REPO | head -200
```

Identify:

- Ecosystem: `npm` | `github-actions` — those are the only two this repo has
- Grouping: grouped (`all`, `all-security`) vs a lone npm **major** (majors are excluded from the `all` group by design, so each arrives on its own)
- Size: number of files and approximate LOC changed; for npm, whether `package.json` moved or only `package-lock.json`
- Whether any changed dependency can affect rendered output at all — this decides Phase E (see Step 8.5)

### Step 2 · High-level error survey

List failing checks and capture the **first and last** error line from each failing job log. Do **not** investigate their meaning yet — just enumerate symptoms.

CI (`.github/workflows/ci.yml`) has exactly three required jobs: `lint` (ESLint + Prettier), `typecheck` (`npm run check:ratchet`), and `build` (the production Astro build in demo mode, no `FORM_ENDPOINT`). Anything else red is not a required check.

```bash
gh pr checks $PR_NUM --repo $REPO

# For each failing check, grab job ID from the URL and pull logs
gh run view --job <JOB_ID> --repo $REPO --log 2>./tmp/null \
  | grep -iE "error|exit code|##\[error\]|FAILED|assert|timed ?out" \
  | head -20 > ./tmp/pr-${PR_NUM}-symptoms.txt
```

Output should be a bullet list such as:

- `lint`: `Prettier check failed: package.json`
- `typecheck`: `astro check reported 3 errors, baseline is 0`
- `build`: `[vite] Rollup failed to resolve import "..."`

**Note what CI cannot see.** Lint, the astro-check ratchet and a successful build say nothing about what the page looks like. That gap is Phase E's job, and it is the highest-value part of this skill on this repo.

---

## Phase B — Context ingestion via subagents

Spawn **two or three parallel `explore` subagents** scoped to what the PR touches. Do not read any of this yourself beforehand — delegate.

### Step 3 · Conventions subagent

`AGENTS.md` is the single canonical agent entry point in this repo (there is no `CONVENTIONS.md` and no committed `CLAUDE.md`). Ask the subagent to read it and return: the change workflow, the definition of done, the commit/PR conventions, and any gotcha relevant to the touched paths. Point it at `STYLES.md` as well when the PR could touch styling or the token ratchet, and at `REUSABLE.md` when a component API is implicated.

### Step 4 · Harness subagent

Ask it to read `scripts/verify/README.md` and return a briefing (~40 lines) on the local verification harness: what `verify:dom`, `verify:shots`, `verify:parity`, `verify:typewriter` and `check:ratchet` each assert, how the theme flag and viewport flags work, where output lands, and what the parity allowlist mechanism is and is not. This briefing is what Phase E executes against.

### Step 5 · Codebase subagent

Ask it to produce a targeted map for the touched area:

- Which package(s) in the diff are actually imported by `src/**` or `scripts/**`, and where (a bump to something nothing imports is a different risk class from a bump to `astro`)
- Build and check commands (`npm run build`, `npm run lint`, `npm run format:check`, `npm run check:ratchet`)
- Whether the bump touches the build pipeline (`astro`, `vite`, `@astrojs/*`, `pagefind`, `mdx`/`rehype`/`remark` plugins) or only tooling (`eslint`, `prettier`, `typescript`)
- For a `github-actions` PR: which workflows change and whether any change affects the deploy path (`.github/workflows/deploy.yml`) rather than only CI

The subagent briefings together form the working context for Phase C.

---

## Phase C — Deep root-cause diagnosis

### Step 6 · Diagnose

Now — and only now — dive into the failing-job logs with full context from Phase B. For each failing check, trace the first meaningful error back to:

1. A direct regression from the bumped dep (removed export, signature change, stricter validation, changed default)
2. A transitive toolchain issue (a dep requiring a newer Node than `.tool-versions` pins; a postinstall needing a newer runtime; an optional native binding not resolving)
3. Pre-existing fragility exposed by a harmless bump (the astro-check baseline, the `-a###` token ratchet, or the `STYLES.md` hash tripping on formatting churn)
4. Infra flake (registry rate-limit, cancelled job, `npm ci` network failure)

For a grouped PR, diagnose **each** failing check separately — failures may have independent causes, and in a batch they usually trace to different packages. Record findings in `./tmp/pr-${PR_NUM}-diagnosis.md`.

---

## Phase D — Fix design

### Step 6.5 · Scope triage — is this a fix, or a Dependabot config problem?

Before planning a fix, check whether the PR is **in-scope** for fixing at all. `.github/dependabot.yml` batches routine npm minor/patch updates into a single `all` group per ecosystem plus an `all-security` group, and deliberately excludes npm **majors** from the `all` group so each major arrives on its own. That shape means two distinct failure situations:

**A grouped PR failing on one package.** This is the common case and it is **in scope**. Do not abandon the batch. Find the single offending package and either fix the code for it, or pin that one package (an entry in `package.json` narrowing the range, or a Dependabot `ignore` entry for that package and version) so the rest of the batch can land. Abandoning a green-except-one batch throws away a dozen good updates for one bad one.

**Scope-reject triggers** (any one is sufficient — the PR is a config problem, not a fix):

- A single group PR contains **≥ 2 major bumps** — which should be impossible under the current npm group config, so if it happens the config itself has drifted and is the actual bug
- A lone major on a framework-tier package (`astro`, `vite`, `@astrojs/*`, `typescript`, `eslint`, `prettier`, `preact`, `pagefind`) that is a genuine migration — not a fix, a project
- The batch is mostly routine but its failure needs a migration on one package that cannot be pinned around

When triggered, **do not attempt a fix** and **do not close the PR yourself** — leave it open for the owner. Instead:

1. If the cause is a config drift, prepare the `.github/dependabot.yml` correction as a separate small PR (leave it for the owner to review and merge). Otherwise, no config change is needed and the recommendation is simply that the migration be scheduled as its own piece of work.
2. **Verbalise the scope-reject decision as a comment** on the Dependabot PR: explain why it cannot be fixed in one pass, link any config PR, and say what a migration would involve. Leave the PR **open** — do not pause for a decision, do not close it.
3. Skip Phase F's commit flow — there is no fix. The report content folds into that comment.

Security-update groups (`all-security`) are left bundled: security bumps are time-sensitive and rare enough that splitting them costs more than it saves. Only split one if a concrete blocker forces it.

### Step 7 · Comprehensive plan

Write a plan covering the following; scale depth to risk:

| Section                                        | Always | If risk ≥ medium        |
| ---------------------------------------------- | ------ | ----------------------- |
| Root cause                                     | ✅     | ✅                      |
| Files expected to change                       | ✅     | ✅                      |
| Fix approach (and alternatives considered)     | ✅     | ✅                      |
| Risk rating (low/medium/high)                  | ✅     | ✅                      |
| Reproduction steps                             | ✅     | ✅ (must be executable) |
| Manual testing strategy                        | ✅     | ✅ expanded             |
| Rollback plan                                  |        | ✅                      |
| Blast radius (rendered output / deploy / URLs) |        | ✅                      |

Risk ≥ medium if **any** of:

- the bump touches the build pipeline (`astro`, `vite`, `@astrojs/*`, MDX/rehype/remark plugins, `pagefind`)
- the fix edits anything under `src/` rather than config or lockfile
- the bump can change emitted HTML, CSS ordering, font loading, or hydration behaviour
- a `github-actions` change touches `deploy.yml` (a broken deploy is a live-site outage, not a red check)

Any npm **major** is at least medium by default. A major arrives alone precisely because it warrants reading and testing by itself; treat it with more scrutiny than a batch of the same size.

### Step 8 · Manual testing strategy (tiered)

Tier the effort by Step 7's risk rating:

- **Low (tooling only)** — apply fix, run the narrowest relevant gate (`npm run lint`, `npm run format:check`, or `npm run check:ratchet`). No reproduction step needed.
- **Medium (build pipeline or `src/` edit)** — first **reproduce** the failure locally on the PR branch to prove the regression is real (not a CI artefact). Then apply the fix, re-run the full local definition of done: `npm run lint && npm run format:check && npm run check:ratchet && npm run build`. Then Phase E.
- **High (majors, anything that can change rendered output, deploy changes)** — everything in medium, plus Phase E's parity sweep is **mandatory**, plus `npm run verify:dom:all` against the built PR head, plus `npm run verify:typewriter` if the hero or motion tokens are implicated.

Keep all scratch output under `./tmp/` (gitignored). Use `./tmp/null` as the sink when suppressing output:

```bash
npm run build 2>./tmp/null
```

---

## Phase E — Visual parity against the merge base

CI proves the site still builds. It does not prove the site still looks the same. A dependency bump should be **pixel-neutral by definition** — if it is not, something rendered differently and nobody would have seen it. This phase is the reason this skill exists on this repo.

No pixel baselines are committed (`scripts/verify/out/` and `tmp/` are gitignored), so the comparison has to be generated in-run: capture the merge base, capture the PR head, compare.

### Step 8.5 · Decide whether to run it

The sweep costs roughly **4–5 minutes** per PR (two builds plus two screenshot sweeps over 37 routes × 2 viewports). Skip it only when the change **cannot** affect rendering. It is skippable when **all** of these hold:

- The PR is `github-actions` only, or touches only `.github/**`
- No file under `src/`, `public/`, `astro.config.mjs`, or `package.json` `dependencies` changed
- The diff is confined to devDependencies whose output never reaches `dist/` (`eslint*`, `prettier`, `@types/*`, `typescript` when the ratchet is unchanged)

Anything else — any `astro`, `vite`, `@astrojs/*`, `preact`, `pagefind`, MDX/rehype/remark, font, or CSS-tooling bump, and every npm major — **runs the sweep**. When in doubt, run it; five minutes is cheaper than a silent visual regression on a live site.

Say explicitly in the report which branch of this decision was taken and why.

### Step 9 · Capture and compare

Playwright is **not** a repo dependency; the harness drives it from an npx cache path already wired into the scripts. Serve each build with a plain static server.

```bash
BASE_SHA=$(git merge-base origin/master HEAD)
mkdir -p ./tmp/parity

# --- merge base ---
git checkout $BASE_SHA
npm ci
npm run build
cp dist/index.html ./tmp/parity/base-index.html    # fingerprint of what we are serving
nohup npx --yes http-server dist -p 4126 --silent < ./tmp/null > ./tmp/parity/base-server.log 2>&1 &
BASE_SERVER=$!
npm run verify:shots:all
kill $BASE_SERVER
cp -R scripts/verify/out ./tmp/parity/base

# --- PR head ---
gh pr checkout $PR_NUM --repo $REPO
npm ci
npm run build
cp dist/index.html ./tmp/parity/head-index.html
nohup npx --yes http-server dist -p 4126 --silent < ./tmp/null > ./tmp/parity/head-server.log 2>&1 &
HEAD_SERVER=$!
npm run verify:shots:all
kill $HEAD_SERVER
cp -R scripts/verify/out ./tmp/parity/head

# --- compare, per viewport ---
npm run verify:parity -- ./tmp/parity/base/1440 ./tmp/parity/head/1440 > ./tmp/parity/1440.json
npm run verify:parity -- ./tmp/parity/base/420  ./tmp/parity/head/420  > ./tmp/parity/420.json
```

**The stale-`dist` trap.** Reusing port 4126 across two builds is the single most likely way to produce a confident, meaningless green: if the old server did not actually die, or `dist` was not rebuilt, the second sweep photographs the first build and parity passes because you compared a build to itself. Guard it every run:

- Confirm the previous server is gone before starting the next one (`lsof -i :4126` returns nothing).
- Diff the two fingerprints — `cmp ./tmp/parity/base-index.html ./tmp/parity/head-index.html` returning "identical" for a PR that changed `src/` or a build-pipeline dep is a signal to distrust the run, not a result.
- If the sweep's own JSON reports `compared: 0` or every route missing, the server was not up; the run is void, not passing.

`verify:shots` writes dark-theme output to `out/<width>/`. If a bump plausibly affects the light theme differently (CSS tooling, colour handling, token emission), repeat the sweep with `--theme light`, which writes to `out/light/<width>/` and cannot overwrite the dark tree.

### Step 10 · Interpret the result

`verify-parity` reports two numbers per route, and **both matter**:

- `differingPixels` — the AE count. Locates the change. A large count over a flat area can be sub-perceptual.
- `maxChannelDelta` — the peak single-channel difference out of 255. Sizes the change. This is the number that says whether a human could see it.

| Result                                                                       | Reading                                                                                                             | Action                                                                                                          |
| ---------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| `passed: true`, zero differing pixels                                        | The bump is pixel-neutral. Expected outcome.                                                                        | Proceed. Record "parity clean, 37 routes × 2 viewports" in the report.                                          |
| Non-zero pixels, `maxChannelDelta` ≤ 2                                       | Sub-perceptual — usually a rounding or compositing shift from a CSS/build-tool bump.                                | Not automatically a failure, but **not yours to wave through**. Report it with route names and the diff images. |
| Non-zero pixels, `maxChannelDelta` > 2                                       | A visible rendering change from a dependency bump. Something moved, recoloured, or reflowed.                        | **Escalate.** Do not merge, do not allowlist.                                                                   |
| `size-mismatch` on any route                                                 | Page height or width changed — a layout regression, the most serious class here.                                    | **Escalate.** Always.                                                                                           |
| Differences confined to canvas-backed routes                                 | Canvases are masked by `verify:shots`, so this should not happen; if it does, the mask or the canvas mount changed. | **Escalate.** Investigate before assuming instability.                                                          |
| `compared: 0`, routes missing, or fingerprints equal when they should not be | The harness did not measure what you think it measured.                                                             | Void the run and redo it. Never report a void run as green.                                                     |

**Do not use `--allow` or `--tolerance` to make a dependency bump pass.** The allowlist is a reviewed, human-signed mechanism with an `approvedBy` and `approvedIn` field; a bot filing its own entries defeats the gate entirely. A tolerance is for documented canvas instability that reproduces between two captures of the _same_ build, which is not this.

**Escalation means: leave the PR open, post the parity JSON and the diff image paths as part of the report comment, state plainly that a human must look at the rendering, and emit `left-open` as the RESULT.** Do not decide alone that a visible pixel change is acceptable — the whole point is that this is exactly the class of regression no automated gate in this repo catches.

---

## Phase F — Finalise

### Step 11 · Ship directly on the Dependabot PR

Keep it simple: commit fixes **on the existing Dependabot PR branch**. No replacement PR, no cherry-picking.

```bash
gh pr checkout $PR_NUM --repo $REPO

# ...make edits...
git add -A
git commit   # comprehensive message, see below
git push
```

Commit messages in this repo are **comprehensive prose**: a subject line that says what changed, then paragraphs explaining the root cause, the fix and how it was verified. **No trailers, no co-author lines, no session URLs** — that convention is explicit in `AGENTS.md` and applies to PR bodies too.

Monitor CI; rerun known flakes once before investigating:

```bash
gh pr checks $PR_NUM --repo $REPO
gh run rerun <run-id> --failed --repo $REPO  # only for a genuine flake
```

**Caveats:**

- Do not use `@dependabot rebase` after pushing fix commits — it will discard them.
- Prefer version **pinning** over rollback when a transitive `@latest` drift is the cause.

### Step 11.5 · Merge policy — merge on proof

`master` is PR-only with required checks (`lint`, `typecheck`, `build`).

The owner's standing convention is that he merges his own PRs, but that is about work with design judgement in it. A dependency bump is not that: with green checks and a measured zero-pixel parity sweep, there is nothing left for a human to decide. So **merge it** — `gh pr merge <n> --merge`.

Hold, and leave the PR open with a recommendation, in every other case:

- the parity sweep measured any non-zero difference, however small
- the sweep was skipped, or ran but measured nothing (`compared: 0`)
- the bump is an npm major
- a required check is failing, or merely absent rather than passing

The distinction is evidence, not caution. A skipped sweep is not a clean sweep, and a bump nobody measured is exactly the one worth a human's eye.

| Situation                                         | Action                                                                                    |
| ------------------------------------------------- | ----------------------------------------------------------------------------------------- |
| Grouped minor/patch batch, CI green, parity clean | Post report recommending merge. **Leave open.**                                           |
| npm major, CI green, parity clean                 | Post report noting it is a major and what was tested. **Leave open.**                     |
| Any parity difference at all                      | Post report with the diff evidence and an explicit ask for visual review. **Leave open.** |
| Scope-rejected                                    | Post the scope-reject comment. **Leave open.**                                            |

Do not use any in-chat prompt as a merge gate — it does not reliably block execution. The gate is simply that the PR stays open and the owner reviews it.

### Step 12 · Report as a PR comment — never commit

Write the report to `./tmp/pr-${PR_NUM}-report.md` (gitignored) covering: PR context, symptoms, root cause, fix plan, testing evidence, **the parity decision and its result**, and the merge recommendation. Then:

```bash
gh pr comment $PR_NUM --repo $REPO --body-file ./tmp/pr-${PR_NUM}-report.md
```

Never commit the report. `tmp/` is gitignored precisely so this stays out of the tree.

### Step 12.5 · Emit a machine-readable result line

As the **final line of output**, print exactly one status line so an orchestrator (e.g. `/dependabot-fix-all`) can classify the outcome without parsing prose:

```
RESULT: <ready|left-open|superseded|blocked> pr=<PR_NUM> reason="<short phrase>"
```

- `ready` — fix pushed (or none needed), CI green, parity clean, recommended for the owner to merge.
- `left-open` — CI green but held for human judgement (parity difference, or a major the run is not confident about).
- `superseded` — scope-rejected; comment posted, config PR opened if applicable, original left open.
- `blocked` — could not be fixed this run (record why in `reason`).

This skill runs **fully non-interactive / autopilot**: never ask questions in any mode — resolve every decision autonomously per the policies above and emit the RESULT line. "Escalate" here means _leave the PR open and say so in the report_, not _stop and ask_.

### Step 13 · Evaluate skill currency

After the run, ask whether it surfaced a **major, repeatable** learning that future runs would miss without it. Examples:

- A new failure pattern not in the appendix
- A repo-level invariant that changed (a new required check, a Node bump in `.tool-versions`, a harness script rename)
- A workflow step that proved redundant in practice

If yes — and only if the learning is non-obvious — propose a small follow-up PR updating this SKILL.md. Resist adding minor details a competent operator would infer; bloat degrades the skill.

---

## Invariants

- Work directly on the Dependabot PR branch; do not open replacement PRs
- Never `@dependabot rebase` after pushing fix commits (it discards them)
- Prefer version **pinning** over rollback for toolchain drift
- A grouped PR failing on one package is fixed or pinned, never abandoned
- Scratch files under `./tmp/` (never `/tmp/`); suppress output with `2>./tmp/null`
- Comprehensive commit messages; **no trailers, no co-author lines, no session URLs**
- The report is **posted as a PR comment**, never committed
- **Merge on proof, hold on doubt.** Green checks plus a measured zero-pixel sweep merges; a skipped, void or non-zero sweep is held for the owner
- Never use `--allow` or `--tolerance` to make a bump pass parity
- Runs fully non-interactive (autopilot); the **final output line** is the `RESULT:` status line

---

## Appendix · Ecosystem cheat-sheet

Failure modes to expect on this repo. Treat these as hypotheses, not diagnoses — Phase C must still verify.

### `npm` (root — the only npm directory)

- **Lockfile desync** is the dominant failure mode on grouped PRs: every job fails at `npm ci` with `Missing: <pkg> from lock file`. Fix: delete **both** `node_modules` **and** `package-lock.json`, then `npm install`. Deleting only `node_modules` can leave an optional-native-binding error from a bundler's platform packages.
- `prettier` bumps reformat files and break `format:check` even though nothing else changed. Fix is to run `npm run format` and commit the churn — but check the diff, because a formatter that reflows `src/**` at a new print width is a real change, not noise. Astro/MDX use ~160 columns, TS/scripts ~100.
- `eslint` and plugin bumps drift the flat config; new rules fire on existing code. Prefer fixing the code; disable a rule only with a written reason.
- `astro` / `@astrojs/*` bumps are the highest-risk class: they can change emitted HTML, CSS ordering, script hydration, and view-transition behaviour without failing the build. **Always run Phase E**, and add `npm run verify:dom:all`.
- `typescript` bumps can move the `astro check` count off the baseline in `scripts/verify/astro-check-baseline.json`. The ratchet is meant to hold at zero — fix the errors rather than re-baselining, and never raise the baseline to make a bump pass.
- Style-adjacent bumps can trip `verify-styles-doc.mjs`'s `styles-hash` in `check:ratchet`. If a bump genuinely changed emitted style blocks, that is a Phase E signal, not a re-bless-and-move-on.
- `pagefind` runs as `postbuild`; a bump failing there breaks search on the deployed site while the build still looks fine locally if you skip `postbuild`.
- `preact` bumps affect only the islands (survey tabs, sorting). Cheap to verify, but they are the parts of the site with real state.
- Local reproduction, in order: `npm ci && npm run lint && npm run format:check && npm run check:ratchet && npm run build`.
- Playwright is **not** a repo dependency — the harness imports it from `/Users/asaucedo/.npm/_npx/e41f203b7505f1fb/node_modules/playwright/index.js`. A Playwright-related failure is therefore never a Dependabot problem in this repo.

### `github-actions`

- Grouped and usually trivial. Almost always Phase E-skippable (see Step 8.5) — these bumps cannot change a pixel.
- `actions/setup-node` majors: check alignment with `.tool-versions` (`nodejs 22.14.0`), which both CI and deploy read via `node-version-file`.
- `actions/checkout` and `actions/upload-pages-artifact` / `deploy-pages` majors touch the **deploy** path. A broken deploy is a live-site outage that no PR check catches, because `deploy.yml` only runs on push to `master`. Read the changelog for these specifically, and say in the report that the deploy path changed.
- The production build injects `FORM_ENDPOINT` from a secret in `deploy.yml` and deliberately does not in CI. An actions bump that changes how env or secrets are passed can silently ship the contact form in demo mode.
- Cache-action majors can change cache keys, which manifests as slow-but-green CI, not a failure.
