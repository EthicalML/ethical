---
applyTo: 'src/content/blog/**'
paths:
  - 'src/content/blog/**'
---

# Blog authoring and publishing

Posts live as `src/content/blog/<YYYY-MM-DD->slug/index.md` with colocated assets. The publishing state machine is driven entirely by the optional `date` field; there is no draft flag:

- **No `date`** - draft: never built in production, visible only in dev. The folder carries no date prefix yet.
- **Future `date`** - unlisted `noindex` preview, reachable by URL, in no listing, sitemap, llms.txt entry or feed.
- **Past `date`** - published everywhere. The flip happens at build time, which is why `deploy.yml` re-runs the build on a daily cron.

- Every post requires a featured `image` (schema-enforced; drives archive showcases and social cards).
- Listing consumers read the collection only through `publishedBlogEntries` in `src/utils/blog.ts`; only the post page's path generation uses `renderableBlogEntries`.
- Republished posts set `source` and `url` (the off-site canonical) and record other appearances in `syndication`.
- Mermaid diagrams are pre-rendered to committed SVGs beside the post (dark theme, transparent background); no Mermaid runtime ships to the browser.

## Voice

Blog prose is written in the author's voice, extracted from the published archive (the higher-altitude post, the memory series). Every sentence must add knowledge; a sentence that only emphasises or restates the previous point is deleted.

The single strongest driver is **personification**. The author is present in the text as "I" (personal posts) or "we" (Institute posts), and actions have actors: "we make sure every change runs the validator", never "every change runs the validator". This applies to headings too ("What we are shipping today", not "What ships today"). A paragraph with no person in it is almost always the detached LLM register.

Sentence shape is the second driver, and it has two failure modes that both read as LLM:

- Chopping one thought into consecutive short declarative fragments ("A plugin is the unit an assistant installs. That is the only packaging layer."). Fold the fragment into the sentence it belongs to or delete it. A short sentence is fine when it carries a complete plain thought; a fragment that restates or punctuates the previous sentence is not.
- Fusing several thoughts into one nested sentence ("A skill writes that same capability down as a folder with a SKILL.md at its root, which holds a short description the agent matches against the task in front of it and the procedure it should follow once it matches."). Sentences read in normal order (subject, verb, object), one thought per clause. Length comes from chaining plain clauses with "and", "so", "but", "as" or "because", never from stacking relative clauses or piling modifiers. At most one subordinate clause per sentence; if the reader has to re-read to find who does what, split it.

Other register rules:

- Conversational questions and interjections are fine ("Well, which one is it?"); declarative punch fragments that close or restate a point are not.
- Prefer common words. Do not reach for a vivid uncommon verb ("evaporates") when a plain phrase does the job ("is ephemeral", "disappears").
- Use contractions naturally ("wasn't", "it's", "I've").
- Casual hedges and colloquial fillers are part of the register ("just", "a bunch of", "pretty much", "nowadays", "organically").
- Colons only introduce lists, enumerations or code blocks; mid-prose apposition ("The rule is simple: ...") gets merged into one sentence instead.
- Avoid definitional framings without an actor ("X is the unit that...", "X serves as..."); say what someone does with the thing.

Calibration pairs from the author (left is the tell, right is the voice):

- "Not as a decision; it just happened." -> "It wasn't an explicit decision I made, it just happened organically."
- "Ask an agent to write you a skill and it will hand back something impressive and wrong." -> "Whenever I blindly delegate the skill writing to an agent, I end up getting a bunch of AI slop; it ends up being more of a menu of suggestions than an actual recipe."
- "Which makes it worth being precise about how to write one, because the default is bad." -> "Being precise about how to write one is important nowadays because the default is just not great."
- "Every change runs scripts/validate.sh in CI." -> "We make sure that every change runs scripts/validate.sh in CI."
- "Five skills across three plugins. Each of them is a tool we use." -> "Each of the five skills we are shipping is a tool we use in our own day-to-day work."
- "A skill writes that same capability down as a folder with a SKILL.md at its root, which holds a short description the agent matches against the task in front of it and the procedure it should follow once it matches." -> "A skill writes that same capability down as a folder with a SKILL.md file at its root. The file holds a short description and a procedure. The agent matches the description against the task in front of it, and once it matches, it follows the procedure."

What the posts do:

- Open from something the author actually did or noticed, then earn the thesis from it. Never open with a detached diagnosis of an industry problem.
- Think out loud in questions; sections may chase a question and admit the first answer did not satisfy.
- Coin named concepts (bold once, then reuse as the post's vocabulary).
- Stay concrete with real project names, tool lists and numbers, and generalise only after the specific case.
- Pull quotes are practical or playful, never sonorous epigrams.
- Personable asides ("In my opinion...", light humour, self-deprecation) at most once per section, and most sections have none.

Banned constructions (LLM tells):

- "It's not X. It's Y." / "Not just X, but Y" / negative parallelisms; "the real X is"; "is less X, and more Y"; "X rather than Y" framed as misconception-correction.
- "is quietly ...", "Delving into", "At its core", "it rarely survives", "this is another strong signal that ... moving from ... into ...".
- Aphorism pull quotes; mic-drop one-line paragraph closers; chiasmus and inversion snaps.
- Runs of symmetric bolded-lead bullets ("**Portable, not captive.** ... **Reviewable as text.** ...").
- Sentences ending in a trailing "-ing" commentary clause ("...highlighting the importance of X").
- Copula avoidance ("serves as", "stands as", "functions as", "marks"): write "is".
- The rule of three as a reflex; vague attribution ("experts argue") without a named source.

Banned words unless quoting a source: testament, underscore, propel, unwavering, heartfelt, embrace, foster, ignite, empower, amplify, catalyst, leverage, epitome, cornerstone, harness, noteworthy, unprecedented, profound, pivotal, journey, delve, crucial, tapestry, showcase, vibrant, groundbreaking, "diverse array". Use plain alternatives: shows, indicates, supports, argues.

Punctuation: the site-wide ASCII rules already ban em dashes and curly quotes; additionally, do not overuse `-` dashes or boldface. Bold is for coined terms and genuinely load-bearing phrases.
