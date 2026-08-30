---
title: How to Write an Agent Skill
date: 2026-08-29
image: './featured.png'
summary: 'An opinionated take on what belongs in a SKILL.md and what to delete: the description as a router, steps over prose, and how to verify a skill.'
tags: [agents, agent-skills, context-engineering, tooling]
---

At some point in the last year I noticed I had stopped writing bash scripts. Not as a decision; it just happened. The small automations I used to script I now write as skills. The deterministic parts still end up as commands, but they sit inside a procedure an agent executes, and the parts that used to be a flag nobody remembers or a comment saying "use judgement here" are now actual judgement.

That balance is what a skill gets you, and finding it is most of the craft: deterministic utilities where the answer is fixed, non-deterministic intelligence where it is not, each doing the job the other is bad at. Done correctly, something else falls out of it. A script does one thing, and extending it means reopening it. A skill written at the right grain works like a lego block: small enough to compose, and stackable, so one skill becomes a step inside another and a procedure written for one job becomes a piece of a much bigger one. Each new skill can build on the ones already written, which means the collection compounds instead of growing one automation at a time.

Which makes it worth being precise about how to write one, because the default is bad. Ask an agent to write you a skill and it will hand back something impressive and wrong. Six hundred lines, a Prerequisites section, an Architecture Overview, a Troubleshooting appendix, and somewhere in the middle, buried, the four commands that actually do the work.

> A skill is a procedure an agent follows. Write it as if you were writing code, but in English.

That framing is the whole of it. Be exact and deterministic where the answer is fixed. Leave room for judgement where it is not. Everything below follows from those two sentences, and it is the view encoded in the [`writing-skills`](https://github.com/EthicalML/agent-skills-marketplace/tree/master/plugins/dev-utilities/skills/writing-skills) skill we published in the [Agent Skills Marketplace](/blog/announcing-the-agent-skills-marketplace/).

## The shape of a skill

A skill is a folder with a `SKILL.md` at its root. The frontmatter carries a `name` and a `description`. The body carries the procedure. That is the entire format, and its simplicity is the point: there is nothing between what a reviewer reads and what the agent runs.

The two halves have genuinely different jobs, and conflating them is the most common structural mistake.

### The description is a router

The description is the only part of the skill the agent sees before deciding whether to load it, so it works as the matching rule: the agent compares it against the task in front of it and decides whether the rest of the file is worth loading.

In practice, a description that only says what the skill is tends not to fire, because nothing in it matches the words a user actually types. Compare:

```text
description: A comprehensive utility for working with code changes.
```

```text
description: Succinct walkthrough of a code change. Use when the user asks to explain,
  walk through, or break down a commit, PR, diff, or change set. Accepts a commit SHA,
  a PR number or URL, a git range, or a pasted diff.
```

The second one names the trigger phrases and the accepted inputs. It fires when it should and stays quiet when it should not. Write the description last, once you know what the skill actually does, and write it for the router rather than for the reader.

### The body is steps

If something is not a step, and it is not the outline, it probably does not belong. Prose in a skill is dead weight the agent pays for on every single run.

This is where most skills go wrong, so it is worth being blunt about what to delete: the introduction explaining what the tool is, the architecture section, the rationale paragraphs, the glossary, the "further reading" list. None of it changes what the agent does, and all of it costs context.

## Keep it simple

This is the first principle and the one that matters most, so it is worth separating from the others.

Simple does not mean incomplete. Finding the simple version of a procedure takes more work than writing the complicated one, and that work is the point of the exercise.

The default skill an agent generates is overengineered. It has abstracted the procedure into phases, invented configuration that nobody asked for, and added a fallback path for a failure that has never happened. Add complexity when it is required, not before, and not after.

## Handle errors where they happen

Put the error handling next to the thing that fails.

> If the error says an asset cannot be cropped, pick a different asset. Do not widen the crop.

That belongs inline, in the step that does the cropping. It does not belong in a Troubleshooting section at the end, because nobody reads a troubleshooting section until they are already lost, and by then the agent has usually chosen the wrong recovery and is three steps down a bad path.

The same applies to constraints. A rule that governs step four should be written in step four, not in a Rules section at the top that the agent will have half-forgotten by the time it matters.

## Scripts and judgement are different tools

A sequence of steps that never varies is a script. Authenticate, call the API, validate the response, build the output: write that as a script and have the skill invoke it. The agent should not be re-deriving a fixed sequence, token by token, on every run.

A step that requires reading a source, choosing between valid options, writing content, or judging whether output is good enough is a judgement call. Leave that to the agent, and give it the rule it must follow rather than the answer.

The failure modes run in both directions, and both are common:

- Put too much in the script and the skill becomes a thin wrapper around a program, at which point you did not need a skill. Ship the program.
- Put too much on the agent and the skill burns minutes and thousands of tokens re-deriving something a five-line shell command settles exactly.

Finding the line between them is most of the craft of writing a good skill.

## Only what every run needs

`SKILL.md` loads on every invocation. Context is the budget, and the skill spends it first, before the agent has looked at a single file of the actual task.

So the rule is: `SKILL.md` holds the steps, their conditions, and their commands. Nothing else.

Move something into a separate file when some runs need it and others do not, then read it from the step that needs it. That is progressive disclosure, and it is the difference between a skill that costs a little and one that costs a lot before it has done anything.

- A branch of the workflow that is substantial and self-contained becomes `workflow-<name>.md`, read from the step that takes that branch. If the branch is three lines, leave it inline; a file per branch is its own kind of overengineering.
- Reference material becomes `docs.md` or similar, read at the point it is needed rather than at the top.
- Never link a file "for reference". Either a step reads it, or it should not be there.

One more: do not restate what a schema or a type already says. If the source of truth is unclear, fix the source of truth. A skill that duplicates a schema is a skill that will disagree with it within a month.

## Make verification a step

A skill whose output nobody checks will eventually produce wrong output, and nothing in the run will flag it.

Verification belongs in the procedure as its own step, sized to what is at stake. Sometimes that is a script that validates the input before the expensive work starts. Sometimes it is a gate that confirms the prerequisites exist. Sometimes it is a single command whose exit code decides whether the skill continues.

The temptation is to overbuild here, because verification feels virtuous. It is not free: every check is context and wall-clock time on every run. Verify proportionately, and push the heavier checks behind a condition.

## Verify the skill itself by making something run it

This is the step almost nobody does, and it is worth more than every review pass combined.

Do not ask a model to judge your skill. Asking "is this SKILL.md any good?" produces agreeable, useless feedback. Instead, give a blind subagent a real task that should trigger the skill, and watch what happens.

Then read the evidence rather than the opinion:

- **Token consumption.** Where did it spend, and on what?
- **Wall-clock time.** Which step took far longer than it should have?
- **The transcript.** Where did it get stuck, re-read the same file three times, or invent a step you never wrote?

Every one of those is a defect in the skill, not in the model. A step that gets misread is a step that is ambiguous. A file read four times is a file that should have been summarised in the step. A wrong turn at step three means step three does not say what you thought it said.

Run this a handful of times, and run it on a cheaper model than the one you are targeting. A cheap model is a more honest test: it will fall into every hole a strong model steps over. A skill that a small model executes cleanly is a skill that is genuinely unambiguous.

## The short version

If you take one thing from this, take the shape:

- The description says when to use the skill, in the words a user would type.
- The body is steps; anything that is not a step or the outline gets deleted.
- Fixed sequences go in scripts, judgement calls go to the agent, and finding the boundary between them is the craft.
- `SKILL.md` holds only what every run needs; anything conditional moves to a file read from its step.
- Error handling sits next to the step that fails, never in an appendix.
- Verify the output as a step, and verify the skill by giving a blind subagent a real task.

The [`writing-skills`](https://github.com/EthicalML/agent-skills-marketplace/tree/master/plugins/dev-utilities/skills/writing-skills) skill applies all of this to itself, which is the only honest test of a position like this one. It ships in the `dev-utilities` plugin:

```text
/plugin marketplace add EthicalML/agent-skills-marketplace
/plugin install dev-utilities@agent-skills-marketplace
```

The rest of the catalogue, and what the Institute is trying to do with it, is in [Announcing the Agent Skills Marketplace](/blog/announcing-the-agent-skills-marketplace/).
