---
title: How to Write an Agent Skill
date: 2026-08-29
image: './featured.png'
summary: 'My opinionated take on what belongs in a SKILL.md and what to delete, covering the description as a router, steps over prose, and how I verify a skill.'
tags: [agents, agent-skills, context-engineering, tooling]
---

At some point in the last year I noticed I had stopped writing bash scripts. It wasn't an explicit decision I made, it just happened organically as the small automations I used to script became skills instead. The deterministic parts still end up as commands, but now they sit inside a procedure an agent executes, and the parts that used to be a flag nobody remembers or a comment saying "use judgement here" have become actual judgement.

I believe that what a skill gets you is this balance, and finding it is a craft in itself, as you want deterministic utilities where the answer is fixed and non-deterministic intelligence where it's not, with each doing the job the other is bad at. When you get this right something else falls out of it too, because a script does one thing and extending it means reopening it, whereas a skill written at the right grain works like a lego block that's small enough to compose and stack, so one skill becomes a step inside another and a procedure written for one job becomes a piece of a much bigger one. Each new skill can then build on the ones already written, which means the collection compounds instead of growing one automation at a time.

Being precise about how to write one is important nowadays because the default is just not great. Whenever I blindly delegate the skill writing to an agent, I end up getting a bunch of AI slop; it ends up being more of a menu of suggestions than an actual recipe, with six hundred lines, a Prerequisites section, an Architecture Overview, a Troubleshooting appendix, and somewhere in the middle, buried, the four commands that actually do the work.

> A skill is a procedure an agent follows, so write it as if you were writing code, but in English.

That framing carries everything below, as I try to be exact and deterministic where the answer is fixed and leave room for judgement where it's not, and it's the view I encoded in the [`writing-skills`](https://github.com/EthicalML/agent-skills-marketplace/tree/master/plugins/dev-utilities/skills/writing-skills) skill we published in the [Agent Skills Marketplace](/blog/announcing-the-agent-skills-marketplace/).

## The shape of a skill

A skill is a folder with a `SKILL.md` at its root, where the frontmatter carries a `name` and a `description` and the body carries the procedure. I find the simplicity of the format to be the point, since there's nothing sitting between what a reviewer reads and what the agent runs. The two halves do have genuinely different jobs though, and conflating them is the most common structural mistake I see.

### The description is a router

The description is the only part of the skill the agent sees before deciding whether to load it, so it works as the matching rule that the agent compares against the task in front of it. In practice I've found that a description that only says what the skill is tends not to fire, because nothing in it matches the words a user actually types. Compare:

```text
description: A comprehensive utility for working with code changes.
```

```text
description: Succinct walkthrough of a code change. Use when the user asks to explain,
  walk through, or break down a commit, PR, diff, or change set. Accepts a commit SHA,
  a PR number or URL, a git range, or a pasted diff.
```

The second one names the trigger phrases and the accepted inputs, which means it fires when it should and stays quiet when it shouldn't. I write the description last, once I know what the skill actually does, and I write it for the router rather than for the reader.

### The body is steps

If something isn't a step and it isn't the outline, it probably doesn't belong, as prose in a skill is dead weight the agent pays for on every single run. This is where I see most skills go wrong, so it's worth being blunt about what to delete: the introduction explaining what the tool is, the architecture section, the rationale paragraphs, the glossary, the "further reading" list. None of it changes what the agent does, and all of it costs context.

## Keep it simple

This is the first principle and the one that matters most, so I'm giving it its own section. Simple doesn't mean incomplete, and in my experience finding the simple version of a procedure takes more work than writing the complicated one, which is pretty much the point of the exercise. The default skill an agent generates is overengineered, as it abstracts the procedure into phases, invents configuration that nobody asked for, and adds a fallback path for a failure that has never happened, so I add complexity when it's required, not before, and not after.

## Handle errors where they happen

I put the error handling next to the thing that fails.

> If the error says an asset cannot be cropped, pick a different asset. Do not widen the crop.

That belongs inline in the step that does the cropping rather than in a Troubleshooting section at the end, because nobody reads a troubleshooting section until they're already lost, and by then the agent has usually chosen the wrong recovery and is three steps down a bad path. The same applies to constraints, since a rule that governs step four should be written in step four and not in a Rules section at the top that the agent will have half-forgotten by the time it matters.

## Scripts and judgement are different tools

A sequence of steps that never varies is a script, so when I see authenticate, call the API, validate the response, build the output, I write that as a script and have the skill invoke it, as the agent shouldn't be re-deriving a fixed sequence token by token on every run. A step that requires reading a source, choosing between valid options, writing content, or judging whether output is good enough is a judgement call, and I leave that to the agent whilst giving it the rule it must follow rather than the answer.

The failure modes run in both directions, and I've hit both:

- Put too much in the script and the skill becomes a thin wrapper around a program, at which point you didn't need a skill and should just ship the program.
- Put too much on the agent and the skill burns minutes and thousands of tokens re-deriving something a five-line shell command settles exactly.

Finding the line between them is most of the craft of writing a good skill.

## Only what every run needs

`SKILL.md` loads on every invocation, which means context is the budget and the skill spends it first, before the agent has looked at a single file of the actual task. So my rule is that `SKILL.md` holds the steps, their conditions, and their commands, and nothing else.

I move something into a separate file when some runs need it and others don't, and then read it from the step that needs it. This is progressive disclosure, and it's the difference between a skill that costs a little and one that costs a lot before it has done anything.

- A branch of the workflow that is substantial and self-contained becomes `workflow-<name>.md`, read from the step that takes that branch, although if the branch is three lines I leave it inline since a file per branch is its own kind of overengineering.
- Reference material becomes `docs.md` or similar, read at the point it's needed rather than at the top.
- I never link a file "for reference", as either a step reads it or it shouldn't be there.

One more thing I avoid is restating what a schema or a type already says, because if the source of truth is unclear the fix belongs in the source of truth, and a skill that duplicates a schema will disagree with it within a month.

## Make verification a step

A skill whose output nobody checks will eventually produce wrong output without anything in the run flagging it, so I put verification in the procedure as its own step, sized to what's at stake. Sometimes that's a script that validates the input before the expensive work starts, sometimes it's a gate that confirms the prerequisites exist, and sometimes it's a single command whose exit code decides whether the skill continues.

The temptation is to overbuild here because verification feels virtuous, but it's not free, as every check is context and wall-clock time on every run, so I verify proportionately and push the heavier checks behind a condition.

## Verify the skill itself by making something run it

This is the step almost nobody does, and in my experience it's worth more than every review pass combined. I don't ask a model to judge my skill, because asking "is this SKILL.md any good?" produces agreeable, useless feedback; instead I give a blind subagent a real task that should trigger the skill and watch what happens.

Then I read the evidence rather than the opinion, looking at where the tokens were spent, which step took far longer than it should have, and where the transcript shows the agent getting stuck, re-reading the same file three times, or inventing a step I never wrote. Every one of those is a defect in the skill and not in the model, since a step that gets misread is a step that is ambiguous, a file read four times is a file that should have been summarised in the step, and a wrong turn at step three means step three doesn't say what I thought it said.

I run this a handful of times, and I run it on a cheaper model than the one I'm targeting, as a cheap model is a more honest test that will fall into every hole a strong model steps over. A skill that a small model executes cleanly is a skill that's genuinely unambiguous.

## The short version

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
