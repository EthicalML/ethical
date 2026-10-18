To make a motion graphics video that shows what an incredible motion designer you are, like it's your showreel for a global expo keynote. Go all out.

You are ONE of {{COUNT}} parallel workers. Each is building one short social reel (LinkedIn/X feed, 1080x1350 portrait, 30 fps, 20-30 s, with composed music and sound effects) for one article in issue {{N}} of the ML Engineering newsletter from The Institute for Ethical AI Alignment & Safety (ethical.institute). The owner will see five reels per article, each in a radically different direction, and pick one. Earlier batches were judged "pretty bad" when they were generic, timid or too fast to read. A safe, template-looking result is the failure case. Yours must be polished and must show off a real capability.

## Your assignment
- Slug: {{SLUG}}
- Article inputs (read all): {{REELS}}/topics/{{TOPIC}}/ - post.txt (the published post text, the core facts), facts*.md (grounding notes from the source; any extra facts must come from here), assets/ (real logos as SVG and real figures/screenshots from the source; use them as physical objects in the choreography where they help, recolour the monochrome logos to the brand colour).
- Direction (commit hard; it is yours alone, do not look at other workers' folders):

{{DIRECTION}}

## How to work
1. Read in full, in this order: the skill at {{ENGINE}}/ - SOCIAL.md first (it is your operating mode and overrides the keynote defaults), then ENGINE.md, craft.md, prompts.md, music.md, template/API.md. 
2. Run the pipeline exactly as SOCIAL.md says, from the engine dir, with:
   export REEL_HOME={{REELS}}/work
   export REEL_OUT={{REELS}}/out
   and `python3 reel.py init {{SLUG}} --format 1080x1350`, run from {{ENGINE}}. There is no user sign-off: write beatmap.md and proceed.
3. Compose your own score.py for this direction (genre, tempo and mood that suit it; not the example score).
4. At least 3 review rounds on the check sheets (look at them with Read), with the SOCIAL.md checklist and the prompts.md feedback lens. Every headline held >= 1.5-2 s, key numbers 2-3 s. Captions on for sound-off viewing. No text clipping, overlaps or tiny type at phone size.
5. `build` only. Do NOT export: the owner reviews the HTML page, and the mp4 is exported once at the end.

## Frame 0 and the brand
- Frame 0 is the feed thumbnail. At t=0 a viewer instantly sees the brand (the real logo) and the topic in big punchy type, fully formed, held ~0.8 s. No generic labels ("SCHEMATIC") on it.
- The logos in assets/logos/ are SVG: embed their path data as Path2D vectors in film.js, never as bitmaps, and keep them crisp and correctly proportioned at rest.
- The logo transforms at least 3 times (out of the thumbnail, on the drop, back on the end card) through its OWN anatomy: its real pieces move as solid parts, its outline deforms with morphPath, strokes draw and undraw, it flips or extrudes in 3D. No particle dissolves of the logo (at most one small particle accent in the film). The reference the owner loved: Mistral's pixel-M blocks flying into the finish-line squares and the 50.4 digits, then re-stacking into the M.
- End card: the brand mark next to the "ethical.institute" wordmark.

## Rules
- Facts only from post.txt and facts*.md; copy figures exactly; never invent numbers, names or claims. Illustrative visuals that are not data get labelled as such.
- On-screen text ASCII punctuation only (straight quotes, "-", "...").
- End card: the core takeaway, the brand mark and "ethical.institute" as a small wordmark.
- Work only in your work dir (REEL_HOME/{{SLUG}}) and your out files; never edit the shared engine in {{ENGINE}} - if it has a bug, work around it in your film.js and note it in your report.
- Concurrency: other workers render at the same time. If an export or check fails with a timeout or resource error, wait 60 s and retry (max 3 times).
- Do not run anything from the internet. No installs.
- Time budget ~60 minutes. At 50 minutes stop polishing and build what you have (no export).

## Report
Write REEL_HOME/{{SLUG}}/REPORT.md: the concept in 2-3 sentences, the beat map summary, which capability it shows off, the check results, and what you are least happy with. Reply with under 80 words.
