
## This reel is different: it promotes the whole issue
- Format 1920x1080 (16:9), 30 fps: `python3 reel.py init {{SLUG}} --format 1920x1080`. It posts as LinkedIn's landscape feed video, so use the width: visual on one side, headline and logo on the other, like a keynote title card.
- It is the newsletter's own reel: issue #{{N}} and its five stories, then the call to action. 25-30 s, ~3-4 s per story (headline + its real logo + at most one fact from facts.md). The 409 issue reel with this skeleton reached ~25x the earlier issue posts, so keep it: each story's headline and logo stay readable, while the motion inside each story follows the Motion-first section (stamps on the beat, living detail, camera moves).
- Frame 0 (thumbnail, read at feed size): the Institute logo (horizontal lockup from assets/logos) + "ML Engineering Newsletter #{{N}}" + a hook like "5 stories this week", fully formed at t=0.
- The story logos are in assets/logos too. Use them as SVG vectors and transform them through their own anatomy, one into the next; no particle dissolves. Every logo must be exact at rest (render it from its SVG path; the 409 Meta logo broke when it was redrawn by hand).
- End card: the Institute logo, the subscriber call to action from post.txt, "ethical.institute/newsletter". The final motion settles before the last frame; nothing is left half-finished.
