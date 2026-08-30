---
title: How to Write an Agent Skill
date: 2026-08-29
image: './featured.png'
summary: 'My opinionated take on what belongs in a SKILL.md and what to delete, covering the description as a router, steps over prose, and how I verify a skill.'
tags: [agents, agent-skills, context-engineering, tooling]
---

At some point in the last year I noticed I had stopped writing bash scripts. It wasn't an explicit decision I made, it just happened organically as the small automations I used to script became skills instead. The deterministic parts still end up as commands, but now they sit inside a procedure that an agent executes. The judgement calls used to be a flag nobody remembers or a comment saying "use judgement here", and now they are actual judgement.

I believe this balance is what a skill gets you, and finding it is a craft in itself. You want deterministic utilities where the answer is fixed, and you want non-deterministic intelligence where it's not, so each side does the job the other is bad at. When you get this right, something else falls out of it too. A script does one thing, and extending it means reopening it. A skill written at the right grain works more like a lego block, so you can compose them and stack them, and one skill becomes a step inside another. Each new skill can build on the ones already written, which means the collection compounds instead of growing one automation at a time.

Being precise about how to write one is important nowadays because the default is just not great. Whenever I blindly delegate the skill writing to an agent, I end up getting a bunch of AI slop; it ends up being more of a menu of suggestions than an actual recipe. I get six hundred lines, a Prerequisites section, an Architecture Overview, a Troubleshooting appendix, and somewhere in the middle, buried, the four commands that actually do the work.

> A skill is a procedure an agent follows, so write it as if you were writing code, but in English.

That framing carries everything below. I try to be exact and deterministic where the answer is fixed, and I leave room for judgement where it's not. This is also the view I encoded in the [`writing-skills`](https://github.com/EthicalML/agent-skills-marketplace/tree/master/plugins/dev-utilities/skills/writing-skills) skill that we published in the [Agent Skills Marketplace](/blog/announcing-the-agent-skills-marketplace/).

## The Two Halves of a SKILL.md

A skill is a folder with a `SKILL.md` at its root. The frontmatter carries a `name` and a `description`, and the body carries the procedure. I find the simplicity of the format to be the point, as there's nothing between what a reviewer reads and what the agent runs. The two halves do have genuinely different jobs though, and conflating them is the most common structural mistake I see.

### The Description Is a Router

The description is the only part of the skill that the agent sees before deciding whether to load it. It works as a matching rule, and the agent compares it against the task in front of it. In practice I've found that a description tends not to fire when it only says what the skill is, because nothing in it matches the words a user actually types. Compare:

```text
description: A comprehensive utility for working with code changes.
```

```text
description: Succinct walkthrough of a code change. Use when the user asks to explain,
  walk through, or break down a commit, PR, diff, or change set. Accepts a commit SHA,
  a PR number or URL, a git range, or a pasted diff.
```

The second one names the trigger phrases and the accepted inputs. I write the description last, once I know what the skill actually does, and I write it for the router rather than for the reader.

### The Body Is Steps and Nothing Else

If something isn't a step and it isn't the outline, it probably doesn't belong. Prose in a skill is dead weight, and the agent pays for it on every single run. This is where I see most skills go wrong, so it's worth being blunt about what to delete: the introduction explaining what the tool is, the architecture section, the rationale paragraphs, the glossary, the "further reading" list.

## Keep It Simple

This is the first principle and the one that matters most, so I'm giving it its own section. Simple doesn't mean incomplete. In my experience, finding the simple version of a procedure takes more work than writing the complicated one, and that work is pretty much the point of the exercise.

The default skill an agent generates is overengineered. It abstracts the procedure into phases, invents configuration that nobody asked for, and adds a fallback path for a failure that has never happened. I add complexity when it's required, not before, and not after.

## Handle Errors Where They Happen

I put the error handling next to the thing that fails.

> If the error says an asset cannot be cropped, pick a different asset. Do not widen the crop.

That belongs inline in the step that does the cropping, and not in a Troubleshooting section at the end. Nobody reads a troubleshooting section until they're already lost, and by then the agent has usually chosen the wrong recovery and is three steps down a bad path. The same applies to constraints. A rule that governs step four should be written in step four, and not in a Rules section at the top that the agent will have half-forgotten by the time it matters.

## Scripts and Judgement Are Different Tools

A sequence of steps that never varies is a script. When I see authenticate, call the API, validate the response, build the output, I write that as a script and have the skill invoke it. The agent shouldn't be re-deriving a fixed sequence token by token on every run.

A judgement call is a step that requires reading a source, choosing between valid options, writing content, or judging whether the output is good enough. I leave those to the agent, and I give it the rule it must follow rather than the answer.

The failure modes run in both directions, and I've hit both:

- Put too much in the script and the skill becomes a thin wrapper around a program, at which point you didn't need a skill and should just ship the program.
- Put too much on the agent and the skill burns minutes and thousands of tokens re-deriving something a five-line shell command settles exactly.

## SKILL.md Only Holds What Every Run Needs

`SKILL.md` loads on every invocation. Context is the budget, and the skill spends it before the agent has looked at a single file of the actual task. So my rule is that `SKILL.md` holds the steps, their conditions, and their commands, and nothing else.

I move something into a separate file when some runs need it and others don't, and then I read it from the step that needs it. This is progressive disclosure.

- A substantial and self-contained branch of the workflow becomes `workflow-<name>.md`, and it gets read from the step that takes that branch. If the branch is three lines I leave it inline, as a file per branch is its own kind of overengineering.
- Reference material becomes `docs.md` or similar, read at the point it's needed rather than at the top.
- I never link a file "for reference", as either a step reads it or it shouldn't be there.

One more thing I avoid is restating what a schema or a type already says. If the source of truth is unclear, the fix belongs in the source of truth. A skill that duplicates a schema will disagree with it within a month.

## Make Verification a Step of the Procedure

When nobody checks the output of a skill, it will eventually produce wrong output and nothing in the run will flag it. So I put verification in the procedure as its own step, and I size it to what's at stake. Sometimes that's a script that validates the input before the expensive work starts, sometimes it's a gate that confirms the prerequisites exist, and sometimes it's a single command whose exit code decides whether the skill continues.

The temptation is to overbuild here because verification feels virtuous. It's not free though, as every check adds context and wall-clock time on every run, so I verify proportionately and push the heavier checks behind a condition.

## Verify the Skill by Making a Blind Agent Run It

This is the step almost nobody does, and in my experience it's worth more than every review pass combined. I don't ask a model to judge my skill, because asking "is this SKILL.md any good?" produces agreeable, useless feedback. Instead I give a blind subagent a real task that should trigger the skill, and I watch what happens.

Then I read the evidence rather than the opinion. I look at where the tokens were spent, at which step took far longer than it should have, and at where the transcript shows the agent getting stuck, re-reading the same file, or inventing a step I never wrote. Every one of those is a defect in the skill and not in the model, as a step that gets misread is a step that's ambiguous.

I run this a handful of times, and I run it on a cheaper model than the one I'm targeting. A cheap model is a more honest test, as it will fall into every hole that a strong model steps over.

## The Short Version

If you take one thing from this, take the shape:

- The description says when to use the skill, in the words a user would type.
- The body is steps, and anything that isn't a step or the outline gets deleted.
- Fixed sequences go in scripts, judgement calls go to the agent, and finding the boundary between them is the craft.
- `SKILL.md` holds only what every run needs, with anything conditional moved to a file read from its step.
- Error handling sits next to the step that fails, never in an appendix.
- Verify the output as a step, and verify the skill by giving a blind subagent a real task.

The [`writing-skills`](https://github.com/EthicalML/agent-skills-marketplace/tree/master/plugins/dev-utilities/skills/writing-skills) skill applies all of this to itself, which felt like the only honest test of a position like this one. It ships in the `dev-utilities` plugin:

```text
/plugin marketplace add EthicalML/agent-skills-marketplace
/plugin install dev-utilities@agent-skills-marketplace
```

The rest of the catalogue, and what we're trying to do with it at the Institute, is in [Announcing the Agent Skills Marketplace](/blog/announcing-the-agent-skills-marketplace/).
