---
title: One Source of Truth for Agent Instructions
date: 2026-08-29
image: './featured.png'
summary: 'Agent instruction files multiply one tool at a time: CLAUDE.md, AGENTS.md, copilot-instructions. On the skill we use to converge them onto one real file plus symlinks.'
tags: [agents, agent-skills, context-engineering, tooling]
---

At some point I went through my repositories and counted the agent instruction files. A `CLAUDE.md` at the root. An `AGENTS.md` next to it. A `.github/copilot-instructions.md`. A `.claude/rules/` directory, and in one repo a leftover `.cursorrules` from an editor I tried for a week. Every one of them was written for a different tool, and every one of them was current on the day it was written.

What sent me counting was a debugging session. An agent kept breaking a convention I was sure I had written down, and I had, in the file a different tool reads. The copy this agent was reading predated the convention by about two months. There was no error anywhere: the agent read its file and followed it correctly. I just had four files claiming to be the rules, and only one of them was.

So, how many of these files does a repository actually need? The answer we landed on is one, plus symlinks, and the procedure for getting a repo there is now the [`standardize-agent-instructions`](https://github.com/EthicalML/agent-skills-marketplace/tree/master/plugins/dev-utilities/skills/standardize-agent-instructions) skill in the `dev-utilities` plugin of the [Agent Skills Marketplace](/blog/announcing-the-agent-skills-marketplace/).

## How a repo ends up with four rulebooks

Nobody plans to maintain four copies of the same document; the copies arrive one tool at a time. Someone adopts Claude Code and writes a `CLAUDE.md`. Copilot code review reads `.github/copilot-instructions.md`, so the content gets pasted there. Codex and a growing list of tools read `AGENTS.md`, so a third copy appears. From then on, whenever a convention changes, whoever changes it updates the file their own tool reads, and the other copies keep the old version.

The result is the situation from my debugging session: which rules an agent follows depends on which assistant happens to be running. And because every agent is following its file faithfully, nothing surfaces the divergence until a convention is broken visibly enough for a human to go looking.

## The layout: one real file, many names

The skill converges a repository onto a single rule: the `.github` files are real, and everything else is a symlink to them.

```text
.github/copilot-instructions.md              # REAL: global instructions
.github/instructions/<name>.instructions.md  # REAL: path-scoped rules
CLAUDE.md  -> .github/copilot-instructions.md
AGENTS.md  -> .github/copilot-instructions.md
.claude/rules/<name>.md -> ../../.github/instructions/<name>.instructions.md
```

Each harness finds the file it expects at the path it expects, and every path resolves to the same bytes. Editing the `.github` file updates every assistant at once.

Why is the Copilot path the real one and not, say, `AGENTS.md`? Because Copilot's instruction discovery runs server-side during code review, and whether it follows a symlinked `.github/copilot-instructions.md` is undocumented. Every other consumer reads from a local checkout, where symlinks behave normally. Pointing the symlinks at the one consumer we cannot inspect removes the risk.

Path-scoped rules need one extra move. Copilot reads the scope from an `applyTo:` frontmatter key holding a single glob string; Claude Code reads a `paths:` key holding a list. The skill gives each `.github/instructions/<name>.instructions.md` both keys with the same globs:

```yaml
---
applyTo: 'src/components/**'
paths:
  - 'src/components/**'
---
```

## What the skill automates

The layout takes a paragraph to describe and an afternoon to apply by hand, which is the kind of work a skill is for. Given a repo, it inventories every instruction file and notes which are already symlinks, merges the divergent copies into one `.github/copilot-instructions.md` (keeping every non-duplicate instruction and asking only when two rules genuinely contradict), consolidates the path-scoped rules with the dual frontmatter, creates the symlinks, and updates in-repo references to point at the real files.

Most of the skill's length covers traps rather than the main path, and every trap is in there because I hit it:

- Repositories often gitignore `CLAUDE.md` or `.claude/`, so `git add -A` skips the new symlinks without any error and the migration ships half-done. The skill runs `git check-ignore` explicitly and confirms the symlinks are staged with git's symlink mode.
- The same file is read at the repo root through the symlinks and at `.github/` directly, so no relative Markdown link inside it resolves correctly from both depths. References are written as root-anchored paths instead.
- Native Windows checkouts (outside WSL2) need Developer Mode for symlinks, so for repos with those contributors the skill swaps the root files to Claude's `@`-import syntax.

The last step is verification: `head` each symlink and confirm it prints instruction content and not a path string, then grep that every path-scoped file carries both frontmatter keys.

## Try it on your own repo

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

Then ask your assistant to standardise the agent instruction files in the repository, and read the pull request it opens. The repository behind this site runs the resulting layout, which is the test we apply to everything in the catalogue: a skill is a procedure we actually run, published so it can be read and corrected.

The rest of the catalogue is covered in [Announcing the Agent Skills Marketplace](/blog/announcing-the-agent-skills-marketplace/), and the opinions on how a skill like this one should be written are in [How to write an agent skill](/blog/how-to-write-an-agent-skill/).
