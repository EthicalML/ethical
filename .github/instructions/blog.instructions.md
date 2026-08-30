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

Blog prose is written in the author's voice, extracted from the published archive (the higher-altitude post, the memory series). Clear, concise, factual English. Every sentence must add knowledge; a sentence that only emphasises or restates the previous point is deleted.

What the posts do:

- Open from something the author actually did or noticed, then earn the thesis from it. Never open with a detached diagnosis of an industry problem.
- Think out loud in questions; sections may chase a question and admit the first answer did not satisfy.
- Coin named concepts (bold once, then reuse as the post's vocabulary).
- Stay concrete: real project names, tool lists, numbers. Generalise only after the specific case.
- Vary sentence length; short beats between long sentences.
- Pull quotes are practical or playful, never sonorous epigrams.
- Personable asides ("In my opinion...", light humour, self-deprecation) at most once per section, and most sections have none.

Banned constructions (LLM tells):

- "It's not X. It's Y." / "Not just X, but Y" / negative parallelisms; "the real X is"; "is less X, and more Y"; "X rather than Y" framed as misconception-correction.
- "is quietly ...", "Delving into", "At its core", "this is another strong signal that ... moving from ... into ...".
- Aphorism pull quotes; mic-drop one-line paragraph closers; chiasmus and inversion snaps.
- Runs of symmetric bolded-lead bullets ("**Portable, not captive.** ... **Reviewable as text.** ...").
- Sentences ending in a trailing "-ing" commentary clause ("...highlighting the importance of X").
- Copula avoidance ("serves as", "stands as", "functions as", "marks"): write "is".
- The rule of three as a reflex; vague attribution ("experts argue") without a named source.

Banned words unless quoting a source: testament, underscore, propel, unwavering, heartfelt, embrace, foster, ignite, empower, amplify, catalyst, leverage, epitome, cornerstone, harness, noteworthy, unprecedented, profound, pivotal, journey, delve, crucial, tapestry, showcase, vibrant, groundbreaking, "diverse array". Use plain alternatives: shows, indicates, supports, argues.

Punctuation: the site-wide ASCII rules already ban em dashes and curly quotes; additionally, do not overuse `-` dashes or boldface. Bold is for coined terms and genuinely load-bearing phrases.
