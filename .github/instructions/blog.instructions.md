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

`voice.instructions.md` holds the shared core: personification, sentence shape, no superfluous text, word choice, banned constructions, banned words and the calibration pairs. Apply it in full. What follows is blog-only, and adds to it rather than relaxing it.

Blog prose is written in the author's voice, extracted from the published archive (the higher-altitude post, the memory series).

Section titles are in Title Case and carry the section's claim, question or finding, never an abstract category label. From the archive: "Task State Is Not Memory", "What Changes When the Loop Keeps Running?", "When NOT to Add Long-Term Memory", "Memory 101: The Version Everyone Starts With", "Kubernetes Enters the Picture: Memory as Infrastructure", "Access Scopes: Whose Memory Is It Anyway?". Numbered patterns carry series ("Decision 1:", "Failure 1:", "Step 1:", "Surprise #1:"), colon constructions and playful titles are welcome, and "Closing Thoughts" ends a post. A title like "The objective" or "Overview" says nothing and gets replaced.

Structure and register:

- Colons only introduce lists, enumerations or code blocks; mid-prose apposition ("The rule is simple: ...") gets merged into one sentence instead. The newsletter's colon-lede is a different move and is not a precedent here.
- Bullet points are normal sentences that start with a capital and end with a full stop. Never comma-separated fragments continuing the lead-in sentence ("- the architecture section,").
- Conversational questions and interjections are fine ("Well, which one is it?"); declarative punch fragments that close or restate a point are not.
- Also banned here, on top of the shared list: ship/shipping (write release, publish, or land), which reads as marketing when the author is describing his own work.
- Do not overuse `-` dashes or boldface. Bold is for coined terms and genuinely load-bearing phrases.

What the posts do:

- Open from something the author actually did or noticed, then earn the thesis from it. Never open with a detached diagnosis of an industry problem.
- Think out loud in questions; sections may chase a question and admit the first answer did not satisfy.
- Coin named concepts (bold once, then reuse as the post's vocabulary).
- Stay concrete with real project names, tool lists and numbers, and generalise only after the specific case.
- Pull quotes are practical or playful, never sonorous epigrams.
- Personable asides ("In my opinion...", light humour, self-deprecation) at most once per section, and most sections have none.
