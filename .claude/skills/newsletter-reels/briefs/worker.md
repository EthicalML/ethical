To make a motion graphics video that shows what an incredible motion designer you are, like it's your showreel for a global expo keynote. Go all out.

You are ONE of {{COUNT}} parallel workers. Each is building one short social reel (LinkedIn/X feed, 1080x1350 portrait, 30 fps, 20-30 s, with sound effects; the music is one of the owner's stock tracks, swapped in after you build) for one article in issue {{N}} of the ML Engineering newsletter from The Institute for Ethical AI Alignment & Safety (ethical.institute). The owner will see five reels per article, each in a radically different direction, and pick one. Earlier batches were judged "pretty bad" when they were generic, timid or too fast to read. A safe, template-looking result is the failure case. Yours must be polished and must show off a real capability.

## Your assignment
- Slug: {{SLUG}}
- Article inputs (read all): {{REELS}}/topics/{{TOPIC}}/ - post.txt (the published post text, the core facts), facts*.md (grounding notes from the source; any extra facts must come from here), assets/ (real logos as SVG and real figures/screenshots from the source; use them as physical objects in the choreography where they help, recolour the monochrome logos to the brand colour).
- Direction (commit hard; it is yours alone, do not look at other workers' folders):

{{DIRECTION}}

## How to work
1. Read in full, in this order: the skill at {{ENGINE}}/ - SOCIAL.md first (it is your operating mode and overrides the keynote defaults, except where the Motion-first section below overrides it), then ENGINE.md, craft.md, prompts.md, music.md, template/API.md. 
2. Run the pipeline exactly as SOCIAL.md says, from the engine dir, with:
   export REEL_HOME={{REELS}}/work
   export REEL_OUT={{REELS}}/out
   and `python3 reel.py init {{SLUG}} --format 1080x1350`, run from {{ENGINE}}. There is no user sign-off: write beatmap.md and proceed.
3. Compose a score.py for this direction at 118-130 bpm, but only as the beat grid your cuts and sound effects lock to. The owner never hears it: every reel ships with one of the owner's stock tracks, cut from its first full-energy beat to your film's length, so land your hits on a steady 4/4 grid and keep the sound effects carrying the accents.
4. At least 3 review rounds on the check sheets (look at them with Read), with the SOCIAL.md checklist and the prompts.md feedback lens, read through the Motion-first section. Every word on screen at least 0.7 s and readable on a phone; no text clipping, overlaps or tiny type.
5. `build` only. Do NOT export: the owner reviews the HTML page, and the mp4 is exported once at the end.

## Frame 0 and the brand
- Frame 0 is the feed thumbnail. At t=0 a viewer instantly sees the brand (the real logo) and the topic in big punchy type, fully formed; it may start moving after 0.3 s. No generic labels ("SCHEMATIC") on it.
- The logos in assets/logos/ are SVG: embed their path data as Path2D vectors in film.js, never as bitmaps, and keep them crisp and correctly proportioned at rest.
- The logo transforms at least 3 times (out of the thumbnail, on the drop, back on the end card) through its OWN anatomy: its real pieces move as solid parts, its outline deforms with morphPath, strokes draw and undraw, it flips or extrudes in 3D. No particle dissolves of the logo (at most one small particle accent in the film). The reference the owner loved: Mistral's pixel-M blocks flying into the finish-line squares and the 50.4 digits, then re-stacking into the M.
- End card: the brand mark next to the "ethical.institute" wordmark.

## Motion-first (overrides SOCIAL.md wherever they conflict)
The calm explainer is the failure case: 5-7 scenes of 4 s, a held headline, a caption, a number, an end card. Every reel in the first runs came out like that, all alike. The references the owner loves are motion-design showreels that change every 1-2 s, fill every frame with living detail and feel like a music video, and on issue 410 he picked the motion-first reel over the calm one in four of five topics. Think "what would make a motion designer stop scrolling", not "how do I explain the article".
- **Pace:** a new visual idea every 1-2 s (half a bar to a bar at 120-128 bpm). Hard cuts on the beat are allowed and encouraged, mixed with continuous carries. A `cuts` or `holds` WARN from `check` may stand when the cut or hold is a deliberate beat: list it in REPORT.md with the reason. FAILs still get fixed.
- **Story:** one claim and at most two numbers from the article, carried by the style. No five-scene fact tour.
- **Captions:** optional; use one only where a word is the beat.
- **Decorative motion is wanted:** layered living detail (HUD furniture, fields, particles, grids, ticking readouts, light sweeps, parallax planes) is what makes these feel rich. SOCIAL.md's "no decorative motion" rule does not apply. Keep text legible over it with contrast plates, dimming or depth of field.
- **Type:** free. Giant heavy display words, mono micro-labels, words wrapped around shapes, letters resolving one by one, inverted words, mixed scale in one line.
- **Camera:** move it. Dolly, orbit, push through layers, whip pans with motion blur (blend 2-4 offset frames), rack focus.

Your direction names a primary style; borrow from the others freely:
1. **Kinetic type / lyric video:** one giant word stamped per beat with scale overshoot, small words typing in beside it, words wrapping a ring or path, inverted highlight words, a terminal prompt typing a line with a block cursor.
2. **HUD / technical:** crop marks, hairline grids, a mono code or coordinates column, ticking timecodes, odometer digits (clipped digit columns easing in, faint vertical blur copies), callout boxes on leader lines growing out of an object, dimension arrows, line art drawn stroke by stroke with a glowing comet head (lineDashOffset on Path2D, additive dot, shadowBlur bloom).
3. **3D camera fly-through:** the subject as a three.js set (tilted UI panels, architecture, a chip, a corridor of layers) on a continuous camera spline with depth of field and whip pans; flat UI extruded into 3D slabs.
4. **Generative / organic:** noise-displaced contour-ring fields, flow fields, branching networks, swarms, with a glowing path cutting through and drifting on the beat.
5. **Device in scene:** the film playing on a screen inside a dark three.js scene (a laptop or phone on a glossy black table, lit only by its screen, with a mirror reflection and a slow camera move), cutting between full screen and the device.

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
