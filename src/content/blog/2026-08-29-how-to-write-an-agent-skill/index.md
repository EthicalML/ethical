---
title: How to Write an Agent Skill
date: 2026-08-29
image: './featured.png'
summary: 'My opinionated take on what belongs in a SKILL.md and what to delete, covering the description as a router, steps over prose, and how I verify a skill.'
tags: [agents, agent-skills, context-engineering, tooling]
---

> ["The hottest new programming language is English."](https://x.com/karpathy/status/1617979122625712128) - Andrej Karpathy, 2023

At some point in the last year I noticed I had stopped writing bash scripts. It wasn't an explicit decision I made, it just happened organically as the small automations I used to script became skills instead. The deterministic parts still end up as commands, but now they sit inside a procedure that an agent executes.

After many iterations building and using skills, I found the sweet spot by using deterministic scripts where the actions are clear (carrying out auth, executing against an API, etc), and leaning on non-deterministic intelligence where the task benefits from logic (something not working, building a creative structure like a document or deck, etc).

A skill written at the right grain works more like a lego block, so you can compose them and stack them, and one skill becomes a step inside another. Each new skill can build on the ones already written, and the collection compounds instead of growing one automation at a time.

Whenever I blindly delegate the skill writing to an agent, I end up getting a bunch of AI slop; it ends up being more of a menu of suggestions than an actual recipe. I get 600 lines, a Prerequisites section, an Architecture Overview, a Troubleshooting appendix, the entire history of the program's changes (context you don't need when executing it), and somewhere in the middle, buried, the four commands that actually do the work.

A skill is a procedure an agent follows, so I write it as if I were writing code, but in English. I encoded this view in the [`writing-skills`](https://github.com/EthicalML/agent-skills-marketplace/tree/master/plugins/dev-utilities/skills/writing-skills) skill that we published in the [Agent Skills Marketplace](/blog/announcing-the-agent-skills-marketplace/).

## The Two Halves of a SKILL.md

A skill is a folder with a `SKILL.md` at its root. The frontmatter carries a `name` and a `description`, and the body carries the procedure.

```text
---
name: explain-code-walkthrough
description: <when to use it, in the words a user would type>
---

<the procedure the agent follows, written as steps>
```

There's nothing between what a reviewer reads and what the agent runs. The two halves do have genuinely different jobs though, and conflating them is the most common structural mistake I see.

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

If something isn't a step and it isn't the outline, it probably doesn't belong. Prose in a skill is dead weight, and the agent pays for it on every single run.

Most skills I review need the same deletions:

- The introduction explaining what the tool is.
- The architecture section.
- The rationale paragraphs.
- The glossary.
- The "further reading" list.

## Keep It Simple

Side note rant: agents are just too verbose by default, and the default iteration you get back is AI slop. I sometimes catch myself writing exactly that as a comment back to the agent (too often). The default skill an agent generates reads more like a menu of the things that "could be done", and it often ends up with the worst of both worlds, deterministic and non-deterministic.

> Simple doesn't mean simplistic, as a simple solution can still solve complexity, just not in a complicated manner.

Getting to the simple solution is often harder than accepting the complicated default, and that extra work is pretty much the point of the exercise. I add complexity when it's required, not before, and not after.

## Handle Errors Where They Happen

I put the error handling next to the thing that fails.

> If the upload fails with a 413, split the file and retry. Do not raise the size limit.

I put that inline in the step that does the upload, and not in a Troubleshooting section at the end, as by the time the agent reaches a troubleshooting section it has usually already chosen the wrong recovery. I do the same with constraints, so a rule that governs step four is written in step four.

## Scripts and Judgement Are Different Tools

When a sequence of steps never varies, I write it as a script and have the skill invoke it, as the agent shouldn't be re-deriving fixed commands token by token on every run.

I leave the judgement calls to the agent, like reading a source, choosing between valid options, or judging whether the output is good enough, and I give it the rule it must follow rather than the answer.

This can fail in both directions, and I've hit both:

- Put too much in the script and the skill becomes a thin wrapper around a program, at which point you didn't need a skill and could just use the program directly.
- Put too much on the agent and the skill burns minutes and thousands of tokens re-deriving something that we could easily do with a five-line shell script.

## SKILL.md Only Holds What Every Run Needs

`SKILL.md` loads on every invocation, and it consumes context before the agent has looked at a single file of the actual task. So my rule is that `SKILL.md` holds the steps, their conditions, and their commands, and nothing else.

An example of progressive disclosure is when I move something into a separate file because only some runs need it, and then I read it from the step that needs it.

- A substantial and self-contained branch of the workflow becomes `workflow-<name>.md`, and it gets read from the step that takes that branch. If the branch is three lines I leave it inline, as a file per branch is its own kind of overengineering.
- Reference material becomes `docs.md` or similar, read at the point it's needed rather than at the top.
- I never link a file "for reference", as either a step reads it or it shouldn't be there.

One more thing I avoid is restating what a schema or a type already says. If the source of truth is unclear, the fix belongs in the source of truth. A skill that duplicates a schema will disagree with it within a month.

## Make Verification a Step of the Procedure

When nobody checks the output of a skill, it will eventually produce wrong output and nothing in the run will flag it. So I put verification in the procedure as its own step, and I size it to what's at stake:

- A script that validates the input before the expensive work starts.
- A gate that confirms the prerequisites exist.
- A single command whose exit code decides whether the skill continues.

I try not to overbuild the checks though, as every check adds context and wall-clock time on every run, so I verify proportionately and push the heavier checks behind a condition.

## Verify the Skill by Making a Blind Agent Run It

This is the step almost nobody does, and in my experience it's worth more than every review pass combined. I don't ask a model to judge my skill, because asking "is this SKILL.md any good?" produces agreeable, useless feedback. Instead I give a blind subagent a real task that should trigger the skill, and I watch what happens.

![A blind subagent run with the transcript defects annotated: a file read three times and an invented step](./verify-run.png)

Then I read the evidence rather than the opinion:

- I look at where the tokens were spent.
- I check which step took far longer than it should have.
- I read the transcript for the agent getting stuck, re-reading the same file, or inventing a step I never wrote.

Every one of those is a defect in the skill and not in the model, as a step that gets misread is a step that's ambiguous.

I run this a handful of times, and I run it on a cheaper model than the one I'm targeting. A cheap model is a more honest test, as it will fall into every hole that a strong model steps over.

## The Short Version

If you take one thing from this, take the shape:

- The description says when to use the skill, in the words a user would type.
- The body is steps, and anything that isn't a step or the outline gets deleted.
- Fixed sequences go in scripts, judgement calls go to the agent, and finding the boundary between them is the craft.
- `SKILL.md` holds only what every run needs, with anything conditional moved to a file read from its step.
- Error handling sits next to the step that fails, never in an appendix.
- Verify the output as a step, and verify the skill by giving a blind subagent a real task.

The [`writing-skills`](https://github.com/EthicalML/agent-skills-marketplace/tree/master/plugins/dev-utilities/skills/writing-skills) skill applies all of this to itself, which felt like the only honest test of a position like this one. It's part of the `dev-utilities` plugin:

```text
/plugin marketplace add EthicalML/agent-skills-marketplace
/plugin install dev-utilities@agent-skills-marketplace
```

The rest of the catalogue, and what we're trying to do with it at the Institute, is in [Announcing the Agent Skills Marketplace](/blog/announcing-the-agent-skills-marketplace/).
