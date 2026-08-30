---
title: Announcing the Agent Skills Marketplace
date: 2026-08-29
image: './featured.png'
summary: 'We are releasing an open-source marketplace of portable agent skills, with five skills across three plugins written to the SKILL.md convention so the same plugin installs into both Claude Code and Copilot CLI.'
tags: [agents, agent-skills, open-source, tooling]
---

Today we are releasing the [Agent Skills Marketplace](/open-source/agent-skills-marketplace/), an open-source catalogue of portable agent skills that we maintain at the Institute.

> A skill is the careful balance of deterministic utilities with non-deterministic intelligence.

We are shipping five skills across three plugins, all under MIT, and all of them install into both Claude Code and Copilot CLI without being rewritten for either.

## The objective

Most of the capability that people are building with coding agents today is ephemeral. It lives in a prompt someone pasted into a chat window, in a paragraph buried in a project instruction file, or in the head of the one engineer who worked out how to make the agent do the thing reliably. It can't be reviewed, it can't be copied to another team, and it usually disappears with the next tool change.

A skill writes that same capability down as a folder with a `SKILL.md` file at its root. The file holds a short description and a procedure. The agent matches the description against the task in front of it, and once it matches, it follows the procedure. Because the skill is a file in version control, it can be read in a pull request, corrected in public, and copied to another team.

Our objective with the marketplace is to make that the normal way capability gets shared. Concretely:

- The `SKILL.md` layout is a convention and not a vendor feature, so a skill written once installs into more than one assistant, and changing tools doesn't mean rewriting everything the team has worked out.
- A skill is prose and commands, with no build artefact between what a reviewer reads and what the agent runs.
- When a skill turns out to encode a bad practice, the fix is a pull request instead of a support ticket to a vendor.

## The mandate

Since 2017 we have argued that systems making consequential decisions should be inspectable by the people affected by them. That argument has produced the [Nine Principles for AI Alignment & Safety](/principles/), over 30 [policy contributions](/policy/), and a set of [open-source projects](/open-source/) that give the principles something to run on.

Agent skills are the same argument applied one level up. The instructions we hand to agents are now a real part of how software gets built, how research gets summarised and how decisions get drafted. We believe those instructions deserve the same treatment we ask for everywhere else: written down, versioned, reviewed, and open to correction by people who didn't write them.

That's the mandate we operate the marketplace under. It's a place where a working procedure can be published, validated and improved by anyone who uses it, and it doesn't compete with the assistants it installs into.

## The capability

We kept the mechanics deliberately small.

### Skills and plugins

A skill is a directory containing a `SKILL.md`. The frontmatter carries a `name` and a `description`, and the body carries the procedure. The description is doing real work here, as the agent matches it against the task. A vague description means the skill never fires, and an overreaching one means it fires when it shouldn't.

A plugin bundles one or more related skills, and it's the thing an assistant actually installs. We didn't add any packaging layers beyond that.

### Installing from either client

You register the marketplace once and then install plugins from it by name. Claude Code takes the slash-command form:

```text
/plugin marketplace add EthicalML/agent-skills-marketplace
/plugin install dev-utilities@agent-skills-marketplace
```

Copilot CLI takes the shell form and reads the same catalogue from the same repository:

```bash
copilot plugin marketplace add EthicalML/agent-skills-marketplace
copilot plugin install dev-utilities@agent-skills-marketplace
```

We also wrote `INSTALL.md` in the repository to do the prerequisite check, the registration and the installation for you, in case you'd rather hand the whole thing to your assistant.

### Validation before review

We make sure that every change runs `scripts/validate.sh` in CI. The script checks manifest structure, skill frontmatter, skill references, naming and plugin freshness. A submission either satisfies the format or gets told exactly why it doesn't, before a human reviewer spends time on it. We put the machine on format checking because it does that job better than a reviewer, and a catalogue that drifts out of spec stops being useful fast.

## What we are shipping today

Each of the five skills we are shipping is a tool we use in our own day-to-day work.

| Plugin          | Skill                            | What it does                                                                                                                |
| --------------- | -------------------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| `dev-utilities` | `writing-skills`                 | Writes or revises a `SKILL.md` so it reads as executable instructions rather than prose.                                    |
| `dev-utilities` | `explain-code-walkthrough`       | Turns a commit, pull request, diff or git range into a succinct walkthrough of what changed and why.                        |
| `dev-utilities` | `standardize-agent-instructions` | Consolidates a repository's agent instruction files so one set works across Copilot, Claude Code, Codex, Cursor and Gemini. |
| `site-capture`  | `site-capture`                   | Records a scripted screen capture of a site as video or GIF, with human-paced scrolling, clicks and a visible cursor.       |
| `agent-harness` | `create-agent-harness`           | Builds a skill-driven Python agent harness with deferred capability loading against any OpenAI-compatible endpoint.         |

The first of those is worth calling out because it's the skill that governs the rest. `writing-skills` encodes our opinionated view of what a skill should look like, and we have written it up in full in [How to write an agent skill](/blog/how-to-write-an-agent-skill/).

[`standardize-agent-instructions`](/blog/one-source-of-truth-for-agent-instructions/) is the one that tends to surprise people. Most repositories that have seen more than one agent tool now carry three or four instruction files, and those files have diverged from each other. The skill collapses them into a single source of truth with symlinks, and that removes an entire category of "the agent ignored the rules" bug.

## Contributing

Contributions arrive as pull requests against [the repository](https://github.com/EthicalML/agent-skills-marketplace). Please run `scripts/validate.sh` before you open one, and read [`CONTRIBUTING.md`](https://github.com/EthicalML/agent-skills-marketplace/blob/master/CONTRIBUTING.md) for what the validator expects and what a good skill looks like.

Our bar for a new skill is that it should be a procedure you actually run, portable across the supported runtimes, and short enough that someone can read it and disagree with it. If you have one of those, we want it.

- [Browse the marketplace](/open-source/agent-skills-marketplace/) on the site.
- [View the repository](https://github.com/EthicalML/agent-skills-marketplace) on GitHub.
- [Read the install guide](https://github.com/EthicalML/agent-skills-marketplace/blob/master/INSTALL.md) if you want your assistant to set it up.
