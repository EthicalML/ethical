---
applyTo: '{src/content/blog/**,src/content/newsletter/**}'
paths:
  - 'src/content/blog/**'
  - 'src/content/newsletter/**'
---

# Shared prose voice

The rules every authored article obeys, in both media. They exist because the default LLM register produces prose the owner deletes wholesale.

Medium-specific structure lives beside this file: `blog.instructions.md` for posts, and the `newsletter-issue` skill's `references/style.md` for issues. Those two own section shape, headings, ledes, bullets and register. They never relax the banned lists here.

## Personification

The single strongest driver. The author is present as "I" (personal) or "we" (Institute), and actions have actors: "we make sure every change runs the validator", never "every change runs the validator". This applies to headings too ("What we are shipping today", not "What ships today"). A paragraph with no person in it is almost always the detached LLM register.

Avoid definitional framings without an actor ("X is the unit that...", "X serves as..."); say what someone does with the thing.

## Sentence shape

Two failure modes, both of which read as LLM:

- Chopping one thought into consecutive short declarative fragments ("A plugin is the unit an assistant installs. That is the only packaging layer."). Fold the fragment into the sentence it belongs to or delete it. A short sentence is fine when it carries a complete plain thought; a fragment that restates or punctuates the previous sentence is not.
- Fusing several thoughts into one nested sentence ("A skill writes that same capability down as a folder with a SKILL.md at its root, which holds a short description the agent matches against the task in front of it and the procedure it should follow once it matches."). Sentences read in normal order (subject, verb, object), one thought per clause. Length comes from chaining plain clauses with "and", "so", "but", "as" or "because", never from stacking relative clauses or piling modifiers. At most one subordinate clause per sentence; if the reader has to re-read to find who does what, split it.

## No superfluous text

Every sentence must add knowledge; a sentence that only emphasises or restates the previous point is deleted. Make each point once, in the sentence where it lives, and move on:

- No bullet list that elaborates the benefits of a point already made in prose.
- No justification sentence appended after a stated practice ("We put the machine on format checking because it does that job better..."). State the practice; the reader can infer why.
- One example or consequence where the draft piles up three ("how software gets built, how research gets summarised and how decisions get drafted" became "how software gets built").
- No trailing amplifier clause ("...without being rewritten for either", "...and the risk goes away") and no closing sentence that repeats the section's point.
- Added words must carry new facts, motive or a concrete example ("as we don't aim for this to be a complete list of skills, but a curated list").

## Word choice

- Prefer common words. Do not reach for a vivid uncommon verb ("evaporates") when a plain phrase does the job ("is ephemeral", "disappears").
- Write numbers as digits (600), not spelled out (six hundred).
- Use contractions naturally ("wasn't", "it's", "I've").
- Casual hedges and colloquial fillers are part of the register ("just", "a bunch of", "pretty much", "nowadays", "organically"). They are load-bearing, not filler.
- Ground claims in experience or in the source, with inline parenthetical examples, "etc" welcome. Attribute rather than assert ("they claim", "OpenAI estimates").

## Banned constructions (LLM tells)

- "It's not X. It's Y." / "Not just X, but Y" / negative parallelisms; "the real X is"; "is less X, and more Y"; "X rather than Y" framed as misconception-correction.
- "is quietly ...", "Delving into", "At its core", "it rarely survives", "this is another strong signal that ... moving from ... into ...".
- Aphorism pull quotes; mic-drop one-line paragraph closers; chiasmus and inversion snaps.
- Runs of symmetric bolded-lead bullets ("**Portable, not captive.** ... **Reviewable as text.** ...").
- Sentences ending in a trailing "-ing" commentary clause ("...highlighting the importance of X").
- Copula avoidance ("serves as", "stands as", "functions as", "marks"): write "is".
- Metaphor equations ("Context is the budget, and the skill spends it..."). Say the plain fact instead.
- A follow-up sentence that labels the previous one ("This is progressive disclosure."). Fold the term in ("An example of progressive disclosure is when...").
- Gerund equations of the form "X is Y, and doing-Z means W" ("A script does one thing, and extending it means reopening it."). Cryptic and hard to parse; say it plainly or delete it.
- Abstract throat-clearing paragraph openers that frame the point before making it ("Being precise about how to write one is important nowadays because..."). Open with the point itself.
- Symmetric wrap-up clauses tacked onto a finished sentence ("...so each side does the job the other is bad at."). The sentence was done; end it.
- The rule of three as a reflex; vague attribution ("experts argue") without a named source.
- A summary sentence that restates the heading; "In this article the authors".

## Banned words

Unless quoting a source, a title or a product name: testament, underscore, propel, unwavering, heartfelt, embrace, foster, ignite, empower, amplify, catalyst, leverage, epitome, cornerstone, noteworthy, unprecedented, profound, pivotal, journey, delve, crucial, tapestry, showcase, vibrant, groundbreaking, revolutionary, "game-changing", "diverse array", "failure modes" (write "common failures"), moreover, furthermore. Use plain alternatives: shows, indicates, supports, argues, use.

Near-zero in the archive, so never a staple: seamless, landscape, robust.

`harness` is allowed only as a noun for the technical object ("agent harness", "the harness they use"), which is what the newsletter reports on every few weeks. The verb ("harness the power of") is banned.

## Calibration pairs

Left is the tell, right is the voice:

- "Not as a decision; it just happened." -> "It wasn't an explicit decision I made, it just happened organically."
- "Ask an agent to write you a skill and it will hand back something impressive and wrong." -> "Whenever I blindly delegate the skill writing to an agent, I end up getting a bunch of AI slop; it ends up being more of a menu of suggestions than an actual recipe."
- "Which makes it worth being precise about how to write one, because the default is bad." -> "Being precise about how to write one is important nowadays because the default is just not great."
- "Every change runs scripts/validate.sh in CI." -> "We make sure that every change runs scripts/validate.sh in CI."
- "Five skills across three plugins. Each of them is a tool we use." -> "Each of the five skills we are shipping is a tool we use in our own day-to-day work."
- "A skill writes that same capability down as a folder with a SKILL.md at its root, which holds a short description the agent matches against the task in front of it and the procedure it should follow once it matches." -> "A skill writes that same capability down as a folder with a SKILL.md file at its root. The file holds a short description and a procedure. The agent matches the description against the task in front of it, and once it matches, it follows the procedure."

## Enforcement

`scripts/verify/check-voice.sh` (`npm run check:voice`) runs in the lint CI job whenever `src/content/blog` or `src/content/newsletter` changed. It fails only on the zero-judgement cases: a short list of words and phrases that never appear in legitimate prose, and the non-ASCII punctuation the site-wide rule bans. It reads blog posts dated on or after 2026-08-29 and newsletter issues from 402 on; earlier work predates this guide and is not retro-edited.

Everything else here cannot be grepped without false positives and is enforced by this file alone. These are strict requirements, not suggestions, and every agent writing or editing an article must apply them in full.
