---
title: Announcing the Agent Skills Marketplace
date: 2026-08-29
image: './featured.png'
summary: 'The Institute is releasing an open-source marketplace of portable agent skills: five skills across three plugins, written to the SKILL.md convention so the same plugin installs into both Claude Code and Copilot CLI.'
tags: [agents, agent-skills, open-source, tooling]
---

Today we are releasing the [Agent Skills Marketplace](/open-source/agent-skills-marketplace/), an open-source catalogue of portable agent skills maintained by the Institute.

> A skill is the careful balance of deterministic utilities with non-deterministic intelligence.

Five skills ship across three plugins, all under MIT, all installable into both Claude Code and Copilot CLI without being rewritten for either.

## The objective

Most of the capability people are building with coding agents today evaporates. It lives in a prompt someone pasted into a chat window, or a paragraph buried in a project instruction file, or in the head of the one engineer who worked out how to make the agent do the thing reliably. It cannot be reviewed, it cannot be copied to another team, and it rarely survives a tool change.

A skill writes that same capability down as a folder with a `SKILL.md` at its root: a short description the agent matches against the task in front of it, and the procedure it should follow once it matches. Because it is a file in version control, it can be read in a pull request, corrected in public, and copied to another team.

The objective of the marketplace is to make that the normal way capability is shared. Concretely:

- A skill written once installs into more than one assistant, so changing tools does not require rewriting everything the team has worked out. The `SKILL.md` layout is a convention, not a vendor feature.
- A skill is prose and commands, with no build artefact between what a reviewer reads and what the agent runs.
- When a skill turns out to encode a bad practice, the fix is a pull request instead of a support ticket to a vendor.

## The mandate

Since 2017 the Institute has argued that the systems making consequential decisions should be inspectable by the people affected by them. That argument has produced the [Nine Principles for AI Alignment & Safety](/principles/), over 30 [policy contributions](/policy/), and a set of [open-source projects](/open-source/) that give the principles something to run on.

Agent skills are the same argument applied one level up. The instructions we hand to agents are now a real part of how software gets built, how research gets summarised and how decisions get drafted. Those instructions deserve the same treatment we ask for everywhere else: written down, versioned, reviewed, and open to correction by people who did not write them.

That is the mandate the marketplace operates under: a place where a working procedure can be published, validated and improved by anyone who uses it. It does not compete with the assistants it installs into.

## The capability

The mechanics stay deliberately small.

### Skills and plugins

A skill is a directory containing `SKILL.md`. The frontmatter carries a `name` and a `description`, and the description is doing real work: it is what the agent matches against the task, so a vague one means the skill never fires and an overreaching one means it fires when it should not. The body is the procedure.

A plugin is the unit an assistant installs, and it bundles one or more related skills. That is the only packaging layer.

### Installing from either client

The marketplace is registered once, then plugins are installed from it by name. Claude Code takes the slash-command form:

```text
/plugin marketplace add EthicalML/agent-skills-marketplace
/plugin install dev-utilities@agent-skills-marketplace
```

Copilot CLI takes the shell form, reading the same catalogue from the same repository:

```bash
copilot plugin marketplace add EthicalML/agent-skills-marketplace
copilot plugin install dev-utilities@agent-skills-marketplace
```

`INSTALL.md` in the repository does the prerequisite check, the registration and the installation for you if you would rather hand the whole thing to your assistant.

### Validation before review

Every change runs `scripts/validate.sh` in CI, which checks manifest structure, skill frontmatter, skill references, naming and plugin freshness. A submission either satisfies the format or gets told exactly why it does not, before a human reviewer spends time on it. Format checking is work a machine does better than a reviewer, and a catalogue whose contents drift out of spec stops being useful fast.

## What ships today

Five skills across three plugins. Each of them is a tool we use in our own day-to-day work.

| Plugin          | Skill                            | What it does                                                                                                                |
| --------------- | -------------------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| `dev-utilities` | `writing-skills`                 | Writes or revises a `SKILL.md` so it reads as executable instructions rather than prose.                                    |
| `dev-utilities` | `explain-code-walkthrough`       | Turns a commit, pull request, diff or git range into a succinct walkthrough of what changed and why.                        |
| `dev-utilities` | `standardize-agent-instructions` | Consolidates a repository's agent instruction files so one set works across Copilot, Claude Code, Codex, Cursor and Gemini. |
| `site-capture`  | `site-capture`                   | Records a scripted screen capture of a site as video or GIF, with human-paced scrolling, clicks and a visible cursor.       |
| `agent-harness` | `create-agent-harness`           | Builds a skill-driven Python agent harness with deferred capability loading against any OpenAI-compatible endpoint.         |

The first of those is worth calling out, because it is the skill that governs the rest. `writing-skills` is our opinionated view of what a skill should look like, and we have written it up in full in [How to write an agent skill](/blog/how-to-write-an-agent-skill/).

[`standardize-agent-instructions`](/blog/one-source-of-truth-for-agent-instructions/) is the one that tends to surprise people. Most repositories that have been touched by more than one agent tool now carry three or four instruction files that have diverged from each other. The skill collapses them into a single source of truth with symlinks, which removes an entire category of "the agent ignored the rules" bug.

## Contributing

Contributions arrive as pull requests against [the repository](https://github.com/EthicalML/agent-skills-marketplace). Run `scripts/validate.sh` before you open one, and read [`CONTRIBUTING.md`](https://github.com/EthicalML/agent-skills-marketplace/blob/master/CONTRIBUTING.md) for what the validator expects and what a good skill looks like.

The bar for a new skill is simple: it should be a procedure you actually run, it should be portable across the supported runtimes, and it should be short enough that someone can read it and disagree with it. If you have one of those, we want it.

- [Browse the marketplace](/open-source/agent-skills-marketplace/) on the site.
- [View the repository](https://github.com/EthicalML/agent-skills-marketplace) on GitHub.
- [Read the install guide](https://github.com/EthicalML/agent-skills-marketplace/blob/master/INSTALL.md) if you want your assistant to set it up.
