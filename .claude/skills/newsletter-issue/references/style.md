# Newsletter voice

Mined from issues 359-398 (198 article sections) by `scripts/newsletter/style-corpus.mjs`. Regenerate with `node scripts/newsletter/style-corpus.mjs --issues 40` and re-curate this file when the voice drifts.

Keep the window at 40 issues. Over the full 398-issue archive the colon-lede rate falls from 58% to 27% and the median section halves from 158 to 70 words: the current voice is recent, and mining the whole archive teaches the wrong one.

## Shape of one article section

| Measure                | Median | p90 | Range  |
| ---------------------- | ------ | --- | ------ |
| Words                  | 158    | 217 | 31-291 |
| Sentences              | 6      | 8   | 1-17   |
| Commas                 | 9      | 17  | 0-27   |
| Links inside the prose | 0      | 1   | 0-3    |

One paragraph. No bullets, no sub-headings, no block quotes inside an article section. The link lives in the heading, so the prose usually carries none: name the source in words instead of linking it again.

Per issue: 5 sections, 789 words and 29 sentences of article prose in total.

## The lede

58% of sections open with a scene-setting first sentence that ends in a colon, then the detail follows. This is the single strongest structural tell of the voice.

> Netflix has developed an LLM-native Recommender System, and they share some of the learnings they gathered along the journey:

> Last week OpenAI published about their rouge hacking HuggingFace, this week HF published a super detailed forensic reconstruction and it's insane:

The other 42% open on a short exclamation or a question, then continue normally:

> Europe is on Fire with another Foundation Model!

> Claude Opus 5 is out!!

> The second part of the "DuckDB Internals" series is out!

> Should we stop reading all the code and let agents make all decisions autonomously?

Aim for roughly three colon-ledes and two exclamation/question ledes across the five sections, but treat that as a centre of gravity rather than a quota: 58% is the rate across 198 sections, and individual issues swing hard around it. Issue 397 opens none of its five on a colon and runs 1064 words. An issue that misses the average is not wrong; an issue that hits it every single week is a tell.

## Sentence openers (counts are uses / distinct issues)

- `This is ...` 67/32, `It is ...` 52/28, `There are ...` 17/12, `It seems ...` 12/8
- `For production ML practitioners ...` 27/16 (and `For production ML practitioners the ...` 21/13) — the signature pivot from what a report says to what it means for the reader. Variants: `For ML practitioners the` 6/6, `For production ML teams` 3/3, `In production ML` 4/3
- `It is interesting to see ...` 9/8, `It is quite interesting ...` 6/5, `It is also interesting ...` 4/4, `It is clear that ...` 4/4
- `This is a great ...` 11/8, `This is one of ...` 6/6, `This is certainly ...` 4/4
- `Check it out` 7/7, `I have to say ...` 4/4

## Closing moves (final sentence of a section)

Every section ends on an editorial beat: what it means, what to watch, or a personal aside. Mined closers:

- `interesting to see` 11/8, `to see how` 12/9, `to see that` 9/7, `see how this` 5/5
- `takeaway is that` 9/7
- `worth checking out` 6/5, `definitely worth checking out` 4/4, `check it out` 9/9, `definitely a great` 5/4
- `this is certainly` 5/5, `this is definitely` 5/4, `it is clear` 5/4, `quite a lot of` 6/6

Verbatim examples:

> It is interesting to see how closely the model and serving engine were developed together.

> This is certainly an interesting area of research and practice, like many other industries we will likely see a lot of changes in the status quo.

> But let's indeed see when we actually get it in Europe.

> Looking forward to seeing the benchmarks and results, it is good to see European sovereign AI progressing and hopefully speeding up!

## Phrase bank

Used at least 3 times across at least 3 distinct issues:

`this is a` 38/24 · `interesting to see` 35/24 · `one of the` 46/23 · `for production ML` 44/21 · `a lot of` 25/21 · `to see that` 25/20 · `is a great` 22/17 · `great to see` 16/14 · `it is great to see` 7/7

Hedges are load-bearing, not filler. Use them: `it seems that` 13/10 · `seems to be` 12/10 · `quite a lot of` 12/11 · `it is clear that` 9/6 · `keep an eye` 7/7 · `is not just` 8/8

## Register

- `interesting` is the house adjective: 126 uses, 0.64 per section. great/awesome/super 112, pretty/quite/very 103, definitely/indeed/certainly 54.
- Exclamation marks 0.92 per section, semicolons 0.69 per section. Both are normal here; the semicolon usually joins a claim to its consequence.
- First person plural leads: `we` 142 (0.72/section) over `I` 105 (0.53). `our` 17, `my` 20.
- Emoji stay in headings and the summary. Only 0.24 per section in prose.
- Rare, so do not reach for them as staples: `Let's` 8, `looking forward` 5, `it is impressive` 2.
- British and American spellings both appear (`optimisation`/`optimization`, `behaviour`/`behavior`). Do not normalise.

## Never

These appear zero times in 198 sections. Writing any of them breaks the voice instantly: `delve`, `game-changing`, `revolutionary`, `pivotal`, `testament`, `crucial`, `moreover`, `furthermore`. Near-zero and only in technical senses: `seamless` 2, `landscape` 2, `leverage` 4, `unlock` 7, `harness` 9 (always "agent harness"), `robust` 11.

Also never: bullets inside an article section; a second link to the source already linked in the heading; a summary sentence that restates the heading; "In this article the authors".

The author writes fast and ships small typos (`practicioners`, `achitecture`, `cheasheet`, doubled `!!`, occasional missing space after a comma). Do not imitate these deliberately, and do not silently correct the author's own text when editing.

## Mechanics

**Headings wrap the whole title in one link. Bullets split the title.** This inverse is near-absolute: 197 of 199 headings are fully linked; 199 of 199 weekly-list bullets put only part of the phrase in the link.

```
## [Timeline on OpenAI HF Hack](https://huggingface.co/blog/agent-intrusion-technical-timeline)

- Timeline [on OpenAI HF Hack](https://huggingface.co/blog/agent-intrusion-technical-timeline)
- Netflix on [the LLM-Native RecSys](https://netflixtechblog.com/...)
- Mozilla's State [of OSS AI](https://stateofopensource.ai/...)
```

The only two split headings in 40 issues had a reason: two destinations in one heading, and an own-project release.

The weekly list always ends with these three fixed bullets. The backslash in `\+ more 🚀` is required Markdown escaping so the `+` does not start a list; it is not a typo and must not be "fixed":

```
- Open Source [ML Frameworks](/open-source/production-ml-list/)
- Awesome AI Guidelines [to check out this week](/open-source/ai-guidelines/)
- \+ more 🚀
```

## Frontmatter

`summary` is the five headings verbatim, comma-joined, plus ` + more 🚀`. This held for 179 of 196 issues; 6 shortened a long heading and 11 diverged (own-project teasers, or a reworded heading as in 397/398). Build it mechanically, then shorten only a heading that is genuinely too long.

`tags`: at most 3, from the `NEWSLETTER_TAGS` enum in `src/content.config.ts`. Weight on the recent era, not all-time totals — across issues 340-398 the counts are `llms` 35, `ai-agents` 35, `mlops` 19, `ml-security` 13, `generative-ai` 10, `ml-education` 6, `gpu-compute` 5, `forecasting` 5, `recommender-systems` 4, `ml-research` 4, `data-engineering` 4, `nlp` 2, `reinforcement-learning` 1, `explainability` 1, `ai-policy` 1. Common pairs: `ai-agents`+`llms` 14, `ai-agents`+`mlops` 6, `llms`+`mlops` 6, `ai-agents`+`ml-security` 5.
