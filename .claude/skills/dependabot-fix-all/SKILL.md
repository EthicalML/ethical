---
name: dependabot-fix-all
description: Fix every open Dependabot PR end-to-end on autopilot. Use this skill when asked to run /dependabot-fix-all (no arguments). This skill acts as an orchestrator that discovers all open Dependabot PRs once, risk-orders them, then processes them one at a time by spawning an isolated non-interactive Codex child per PR that runs the dependabot-fix skill. It verifies each PR independently via gh, applies the repo's merge policy (the owner merges, the skill does not), records state in a durable ledger, and is bounded so it always terminates. Never pauses for user input.
allowed-tools: shell
---

# Dependabot Fix All

Orchestrate the `dependabot-fix` skill across **every open Dependabot PR**, fully autonomously. Invoked as `/dependabot-fix-all` (no arguments).

**This session is the orchestrator.** It does not diagnose or edit PRs itself — it spawns **one isolated Codex child per PR** (each child runs the heavyweight `dependabot-fix` skill in a fresh context), then **independently verifies** the result via `gh` and moves on. This keeps the orchestrator's context lean and avoids cross-PR contamination.

## Core principles (do not violate)

- **Autopilot — never pause.** Zero interactive prompts anywhere in this path. Resolve every decision autonomously. If something cannot be resolved, mark the PR `blocked` and continue.
- **Serial only.** Children share this one git working tree (each runs `gh pr checkout`, and the parity phase checks out a merge base and rebuilds). Never run children in parallel. Clean tree + `master` between children.
- **Bounded — always terminates.** Discover PRs **once** and snapshot the list. Never re-discover inside the loop. Attempt each PR **at most once** (no orchestrator-level retry, no re-queue). Every child has a wall-clock timeout.
- **Token-efficient.** **Never read a child's full log into context.** Use `grep`/`tail` on it and treat `gh` output as the ground truth for verification.
- **The orchestrator never merges.** `master` is PR-only and the owner merges his own PRs. This run produces green PRs and recommendations, nothing else.
- **Keep it simple.** No nesting (`dependabot-fix-all` never spawns another `dependabot-fix-all`), no extra retry loops, no cleverness beyond what is written here.

Durable state lives in `./tmp/dfa-ledger.md` (gitignored, resumable), not in conversation memory.

---

## Phase 0 — Preflight & discovery (once)

```bash
mkdir -p ./tmp && touch ./tmp/null
REPO=EthicalML/ethical
```

**Preflight** (abort early with a clear message if any fails):

- `gh auth status` is OK (personal `axsaucedo` account — this is a personal repo, not the Zalando one).
- `codex` is on `PATH` (`command -v codex`).
- `magick` is on `PATH` — `verify:parity` shells out to ImageMagick and a missing binary makes every parity phase void rather than failing loudly.
- Git working tree is clean and on the default branch:
  ```bash
  git rev-parse --abbrev-ref HEAD          # expect master
  git status --porcelain                   # expect empty
  ```
  If dirty or on another branch, switch to `master` and confirm clean before proceeding (do not discard the owner's work silently — if the tree is dirty with unrelated changes, mark the whole run blocked and report).

**Discover once** and snapshot — this is the *only* discovery; never list PRs again during the loop:

```bash
gh pr list --repo $REPO --author app/dependabot \
  --json number,title,labels,headRefName,files --limit 100 > ./tmp/dfa-prs.json
```

**Risk-order easy → hard** (process low-risk first so the run banks wins before tackling the expensive ones):

1. `github-actions` — grouped, trivial, and parity-skippable, so these are minutes each
2. `npm` grouped `all-security` — time-sensitive, usually small
3. `npm` grouped `all` (minor/patch batch) — one batch per week; parity sweep applies
4. `npm` **majors**, one PR each — highest risk, most scrutiny, run last

Infer ecosystem and grouping from the PR title, `headRefName` (`dependabot/npm_and_yarn/...` vs `dependabot/github_actions/...`) and `files`. Under the current `.github/dependabot.yml`, npm majors are excluded from the `all` group, so a lone-package npm PR is by definition a major and belongs in bucket 4.

**Budget the run.** Each npm child that runs the parity sweep costs roughly 4–5 minutes of wall clock on top of diagnosis (two builds plus two screenshot sweeps over 37 routes × 2 viewports). Size the per-child timeout accordingly and say the expected total in the printed plan.

**Seed the ledger** — one row per discovered PR, in processing order, in `./tmp/dfa-ledger.md`:

```
| # | PR | ecosystem | grouping | risk | status | outcome |
|---|----|-----------|----------|------|--------|---------|
| 1 | 51 | github-actions | all | low | pending | |
| 2 | 52 | npm | all | medium | pending | |
```

Print the ordered plan (PR number, ecosystem, risk, whether parity is expected to run) so the run is auditable, then proceed without pausing.

---

## Phase 1 — Serial loop (one PR at a time, in order)

Iterate the snapshot in risk order. For each PR `<n>`:

### 1. Pre-checks (orchestrator, cheap — no child yet)

```bash
gh pr view <n> --repo $REPO --json state,mergeStateStatus,labels,title
```

- If `state` is `MERGED` or `CLOSED` → ledger `done` (note "already merged/closed"), continue.
- Confirm the working tree is clean and on `master` before handing off (the previous child should have restored it; if not, restore it first).

Mark the ledger row `in_progress`.

### 2. Spawn the child (isolated, non-interactive, with a timeout)

Run **serially** and wait. The child runs the `dependabot-fix` skill in its own fresh Codex context. Write the brief to a file — briefs passed inline break on shell quoting.

```bash
cat > ./tmp/brief-pr-<n>.md <<'EOF'
Use the dependabot-fix skill in .claude/skills/dependabot-fix/SKILL.md to fix Dependabot PR <n>
in EthicalML/ethical, fully autonomously.

Follow the skill exactly, including Phase E (merge-base pixel parity) unless Step 8.5 says it is
skippable for this PR. Do not merge anything - the owner merges. Do not ask any questions; run on
autopilot to completion and emit the final RESULT line as the last line of your output.
EOF

nohup codex exec "$(cat ./tmp/brief-pr-<n>.md)" \
  -c model_reasoning_effort=medium \
  < ./tmp/null > ./tmp/codex-pr-<n>.log 2>&1 & disown
```

Notes:

- Always `gpt-5.6-sol` (the default model); vary only effort. `medium` is right for a diagnosis-and-fix pass; use `high` only for an npm framework major where a migration may be involved. Config flags do **not** persist across `resume`, so pass `-c model_reasoning_effort=` on every invocation.
- Launch with `nohup ... < ./tmp/null ... & disown` — without the stdin redirect a backgrounded child can block on a terminal read.
- Run from the repo root so the project skill is discoverable.
- **Monitor one completion signal**, never a done-marker you wrote into the brief (Codex echoes the brief into its log, so a self-written marker matches instantly and you will think the child finished before it started):
  ```bash
  grep -qE "tokens used|codex exec failed|stream error" ./tmp/codex-pr-<n>.log
  ```
- Give each child a wall-clock ceiling — 45 minutes for an npm PR that will run the parity sweep, 15 for a `github-actions` PR. Past the ceiling, kill it and classify `blocked`.
- Between launch and completion, pull with judgment at expected-milestone times: elapsed vs estimate, new commits on the branch, whether `./tmp/parity/` is filling up, a repeated-command loop smell in the last substantive log line. The orchestrator owns the nudge-or-kill call.
- Share the tail command with the user so they can watch: `tail -f ./tmp/codex-pr-<n>.log | bat --paging=never --language=md`.

### 3. Capture the result — token-efficiently (never load the whole log)

Extract **only** the `RESULT:` line and the completion signal. Do not read the full log — it is large and it contains the entire child transcript.

```bash
grep -E "^RESULT:" ./tmp/codex-pr-<n>.log | tail -1
tail -3 ./tmp/codex-pr-<n>.log
```

If no `RESULT:` line is found, or the log ends in `codex exec failed` / `stream error`, treat the run as `blocked` and rely on the Phase 1.4 `gh` verification to classify the real PR state.

### 4. Post-checks — independent verification (gh is the ground truth)

Never trust the child's prose; re-derive truth:

```bash
gh pr checks <n> --repo $REPO
gh pr view <n> --repo $REPO --json state,mergeStateStatus,labels
```

Classify the outcome:

- **ready** — the three required checks (`lint`, `typecheck`, `build`) are green, the PR is open and mergeable, and the child reported parity clean or parity legitimately skipped. Recommended for the owner to merge.
- **held** — checks green but the child reported a parity difference or low confidence on a major. Needs owner eyes on the rendering before merge.
- **superseded** — child scope-rejected; a comment was posted (and a `dependabot.yml` config PR opened if the config was the problem), original left open for the owner to close.
- **blocked** — checks failing, child timeout, child error, or any state that is none of the above.

**Cross-check the parity claim.** A child that claims parity clean but left no `./tmp/parity/*.json` behind, or whose JSON shows `compared: 0`, did not actually measure anything. Downgrade such a PR from `ready` to `held` — a void sweep reported as green is the exact failure this orchestration exists to prevent.

### 5. Merge policy — do nothing

There is no merge step. `master` is PR-only with required checks and the owner merges his own PRs. The orchestrator's product is a set of green, reported PRs plus a recommendation per PR. **Never** run `gh pr merge`.

### 6. Record and continue

Update the ledger row to `done` with a one-line outcome (`ready` / `held <reason>` / `superseded` / `blocked <reason>`). Restore a clean state for the next child — the parity phase leaves the tree on a detached merge-base commit and `node_modules` reinstalled, so this matters more here than in a repo without it:

```bash
git checkout master && git reset --hard origin/master >/dev/null 2>./tmp/null
git status --porcelain   # expect empty
lsof -i :4126            # expect nothing; kill any orphaned http-server
```

Move to the next PR. **Do not re-discover, do not retry a blocked PR, do not re-queue.**

---

## Phase 2 — Termination & summary

The loop is bounded by the Phase 0 snapshot; once every row is `done`, stop. There is no re-discovery and no retry, so the run always terminates.

Print a concise summary table built from the ledger — **not** from child logs. Render as: `PR | ecosystem | outcome | parity | note`. Each child already posted its own report comment on its PR; the orchestrator does **not** duplicate those.

Close with a one-paragraph wrap-up: how many are ready to merge, how many are held for visual review, how many superseded, how many blocked (and the single-line reason for each). Name the held PRs explicitly — those are the ones that need the owner, and they are the point of the run.

---

## Assessment: grouped multi-PR (`/dependabot-fix A,B`) — deferred

Deliberately **not** supported. Dependabot already batches this repo into one PR per ecosystem, so on a normal week the whole run is two or three PRs and genuine cross-PR coupling is rare. Batching two PRs into one child would require two `gh pr checkout`s, intertwined diagnosis, an ambiguous parity merge base, and unclear report semantics — more complexity than value. The orchestrator therefore always runs **one PR per child**. Revisit only if a concrete, repeated need emerges.

---

## Invariants

- Discover PRs **once**; never re-list inside the loop (prevents endless growth from new bump PRs).
- **Serial** children only (shared git checkout, and the parity phase rebuilds the tree); clean tree + `master` between runs.
- One attempt per PR; no orchestrator retry, no re-queue; every child has a wall-clock ceiling.
- **Never** load a full child log into context — extract only the `RESULT:` line and the completion signal; use `gh` as the ground truth.
- Monitor a completion signal Codex emits (`tokens used` / `codex exec failed` / `stream error`), never a marker written into the brief.
- **Never merge.** The owner merges; this run produces green PRs and recommendations.
- A parity claim with no evidence file is downgraded to `held`, never accepted as green.
- Fully non-interactive (autopilot); never pause for input.
- Scratch under `./tmp/` (never `/tmp/`); `./tmp/dfa-ledger.md` is the durable, resumable state.
- This skill never spawns another `dependabot-fix-all`.
