# Hero mission typewriter refinement

## Outcome

- Matched the mission line to the status pill's computed Geist Mono treatment: weight `400`, letter spacing `1.4px` and uppercase rendering. The desktop lede size is `13px`; it scales down only where required to preserve the three fixed rows at narrow widths.
- Hard-coded the mission into three block rows. Row 1 ends at “MISSION TO”, row 2 ends at “ACCOUNTABLE TO”, and only the beneficiary on row 3 changes.
- Set row 3 to `--accent`, kept rows 1–2 at `--text-2`, and set the cursor blink cycle to exactly `1s`.
- Added scaled chroma-ghost, clip-band and flicker animations to the row-3 text and cursor.
- Kept typing at `45ms` plus the existing jitter and deletion at `25ms`.
- Added the `typewriter_underline` component flag and `data-underline` runtime flag. The homepage default is off.

## Phase lock

The CSS headline and row-3 glitch animations both use the shared `--cycle: 9s` duration and begin in the same document style update. The typewriter does not run an independent rotation interval. Before each rotation it reads the headline's live `om-flicker` Web Animation clock, calculates the next `76.7%` boundary, and waits only until that boundary. Deletion therefore starts immediately after the shared `65.6–76.7%` burst and repeats once per headline cycle without accumulating timer drift.

The focused gate sampled both animations during the burst. They had the same start time, the same current time and a phase difference of `0`; both chroma ghosts were visible with active clip bands. Deletion was sampled at phase `0.7695`, and consecutive deletion starts were `8999.5ms` apart.

## Verification

- Branch: `redesign-astro`.
- Pinned build: passed with Node `22.12.0`.
- Homepage DOM at `1440×1000` on port `4126`: passed with no console/page errors, no overflow and all standard homepage checks green.
- Homepage DOM at `420×900` on port `4126`: passed with no console/page errors or horizontal overflow. All three fixed rows remained present and unwrapped.
- Desktop geometry: the lede stayed `620×81.890625px` before and after rotation; the action row's top coordinate did not move.
- Animation: frames captured `120ms` apart during deletion differed.
- Reduced motion: all three rows remained visible, row 3 was “PEOPLE AND SOCIETY”, the cursor was hidden and frames `800ms` apart were identical.
- Font and colour checks: pill and lede computed family/weight/tracking matched; rows 1–2 computed to `rgba(244, 242, 238, 0.66)` and row 3 to `rgb(94, 230, 160)`.
- Cursor: computed blink duration was `1s`.
- Syntax, build and `git diff --check`: passed.

## Underline comparison

- Default off: `tmp2/typewriter-underline-off.png`
- Optional on: `tmp2/typewriter-underline-on.png`
