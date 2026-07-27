# Hero mission typewriter report

## Outcome

- Replaced the homepage hero subtitle with the owner-ratified mission sentence.
- Added the six owner-editable beneficiaries to `src/pages/index.mdx` front matter.
- Added a vanilla `hero-typewriter` widget with 45ms typing jitter, 25ms deletion, 2.6s dwell, and a white block cursor that blinks only while the completed text dwells.
- Kept the mission prefix fixed while the beneficiary and terminal punctuation rotate.
- Reserved the subtitle with the longest authored variant plus cursor space, preventing button/canvas movement during typing.
- Added a reduced-motion branch that keeps the complete ratified sentence static and removes the cursor.

## Verification

- Branch: `redesign-astro`.
- Build: passed with Node 22.12.0 (`npx --yes node@22.12.0 node_modules/astro/bin/astro.mjs build`). The machine default Node 22.7.0 is below Astro's supported minimum.
- Homepage DOM gate at 1440×1000 on port 4126: passed; zero page/console errors, width 1440/1440, no unrevealed targets, all visible canvases non-blank.
- Homepage DOM gate at 420×900 on port 4126: passed; zero page/console errors, width 420/420, no unrevealed targets, all visible canvases non-blank.
- Typewriter gate: passed; two lede-region screenshots differed during beneficiary deletion, the mission prefix stayed intact, and the subtitle box remained 560×83.671875px before and after rotation.
- Reduced-motion gate: passed; the exact static sentence was present, cursor content was `none`, and two frames 800ms apart were identical.
- Deterministic homepage screenshot gate: passed at 1440px with HTTP 200 and no runtime errors.
- Mobile hero capture at 420px: visually checked; mission text, actions, switcher, and canvas remain contained without overlap.
- Syntax and whitespace: `node --check` passed for both widget and typewriter gate; `git diff --check` passed.
