---
title: One Source of Truth for Agent Instructions
date: 2026-08-29
image: './featured.png'
summary: 'Repos touched by more than one agent tool accumulate instruction files that quietly diverge. The fix is one real file and symlinks, and there is a skill that applies it.'
tags: [agents, agent-skills, context-engineering, tooling]
---

Open a repository that has been worked on by more than one coding agent and count the instruction files. A `CLAUDE.md` at the root. An `AGENTS.md` next to it. A `.github/copilot-instructions.md`. Maybe a `.cursorrules`, a `GEMINI.md`, a `.claude/rules/` directory. Each one was written for a different tool, each one was current the day it was written, and no two of them say the same thing any more.

> Every duplicated instruction file is a fork of your engineering conventions that nobody agreed to maintain.

This is the problem the [`standardize-agent-instructions`](https://github.com/EthicalML/agent-skills-marketplace/tree/master/plugins/dev-utilities/skills/standardize-agent-instructions) skill exists to remove. It ships in the `dev-utilities` plugin of the [Agent Skills Marketplace](/blog/announcing-the-agent-skills-marketplace/), and it converges a repository onto a single layout: one set of real files, and symlinks for every name the different harnesses expect.

## How the divergence happens

Nobody sets out to maintain four copies of the same document. The copies happen one tool at a time.

Someone adopts Claude Code and writes a `CLAUDE.md`. Copilot code review wants `.github/copilot-instructions.md`, so someone pastes the same content there. A Codex-style tool reads `AGENTS.md`, so a third copy appears. Then a convention changes, the person changing it updates the file their tool reads, and from that day forward the agents in that repository are following different rules depending on which assistant happens to be running.

The failure this produces is the worst kind: quiet. The agent did not ignore your instructions. It faithfully followed the stale copy you forgot existed. You debug the model, or the prompt, or the tool, and the actual defect is a file you have not opened in two months.

## The layout

The skill converges everything onto one rule: **the `.github` files are real, everything else is a symlink to them.**

```text
.github/copilot-instructions.md              # REAL: global instructions
.github/instructions/<name>.instructions.md  # REAL: path-scoped rules
CLAUDE.md  -> .github/copilot-instructions.md
AGENTS.md  -> .github/copilot-instructions.md
.claude/rules/<name>.md -> ../../.github/instructions/<name>.instructions.md
```

Each harness finds the file it is looking for at the path it expects, and every path resolves to the same bytes. Edit the `.github` file and every assistant picks up the change at once. There is nothing to keep in sync because there is only one thing.

The real file lives on the Copilot path rather than the other way round for a practical reason: Copilot's instruction discovery runs server-side during code review, and how it treats a symlinked `.github/copilot-instructions.md` is undocumented. Everything else reads files from a local checkout, where symlinks just work. Point the symlinks at the one consumer you cannot inspect, and the risk disappears.

Path-scoped rules get the same treatment with one extra move: each `.github/instructions/<name>.instructions.md` carries its scope twice in the frontmatter, because the harnesses spell it differently. Copilot reads `applyTo:` as a single glob string; Claude Code reads `paths:` as a list. Same globs, both spellings, kept in sync in the one real file:

```yaml
---
applyTo: 'src/components/**'
paths:
  - 'src/components/**'
---
```

## What the skill actually does

The layout is easy to describe and tedious to apply, which is exactly the shape of work a skill is for. Ask your assistant to standardise the agent instructions in a repo and the skill walks it through the whole migration: inventory every instruction file and note which are already symlinks, merge the divergent copies into one `.github/copilot-instructions.md` (keeping every non-duplicate instruction, and asking you only when two rules genuinely contradict), consolidate the path-scoped rules with dual frontmatter, create the symlinks, and update every in-repo reference to point at the real files.

Most of the skill's length is not the happy path. It is the traps we hit applying this across our own repositories, written next to the step where each one bites:

- **Gitignored symlinks.** Repositories often ignore `CLAUDE.md` or `.claude/`, so `git add -A` silently skips the new symlinks and the migration ships half-done. The skill checks `git check-ignore` explicitly and confirms the symlinks are staged with git's symlink mode.
- **Relative links that resolve from two places.** The same file is read at the repo root through the symlinks and at `.github/` directly, so no relative Markdown link can be correct from both. References inside the instruction files are written as root-anchored paths instead.
- **Windows.** Native non-WSL2 checkouts need Developer Mode for symlinks, so the skill swaps in Claude's `@`-import syntax for the root files when a repo targets those contributors.

It ends with a verification step rather than a hope: `head` each symlink and confirm it prints instruction content instead of a path string, and grep that every path-scoped file carries both frontmatter spellings.

## Try it on your repository

The skill installs from the marketplace into Claude Code:

```text
/plugin marketplace add EthicalML/agent-skills-marketplace
/plugin install dev-utilities@agent-skills-marketplace
```

or into Copilot CLI:

```bash
copilot plugin marketplace add EthicalML/agent-skills-marketplace
copilot plugin install dev-utilities@agent-skills-marketplace
```

Then ask your assistant to standardise the agent instruction files in the repository, and read the pull request it opens. This site's own repository runs the resulting layout, which is the same test we apply to everything in the catalogue: a skill is a procedure we actually run, published so it can be read, disagreed with and corrected.

The rest of the catalogue is covered in [Announcing the Agent Skills Marketplace](/blog/announcing-the-agent-skills-marketplace/), and the opinions on how a skill like this one should be written are in [How to write an agent skill](/blog/how-to-write-an-agent-skill/).
