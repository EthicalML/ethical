# Hero mission typewriter initial sequence

## Outcome

- The full mission now types on initial load in fixed sequence: L1, then L2, then L3.
- One cursor moves with the active line. After the initial sequence, it remains on L3 and only L3 participates in the existing glitch-synced delete/retype rotation.
- L1 and L2 remain unchanged after their initial typing completes.
- Each line reserves its height before text is populated, so the three-line block and the action row do not move.
- If initial typing overlaps the current glitch burst, the first rotation skips that burst's end boundary and waits for the next complete phase-locked cycle.
- The existing pill-mono styling, green L3, 1-second cursor blink, underline default off, 45ms typing speed with jitter, 25ms deletion speed and reduced-motion static sentence are unchanged.

## Verification

- Branch: `redesign-astro`.
- Pinned runtime: Node `22.14.0` from `.tool-versions`.
- Pinned Astro build: passed; 25 pages generated.
- Homepage DOM at `1440×1000` and `420×900` on port `4126`: passed with no page or console errors and no horizontal overflow.
- Initial typing: sampled changing frames and observed L1 complete while L2 typed, then L1/L2 complete while L3 typed.
- Cursor: sampled on L2 and then L3; completed-state blink duration remained `1s`.
- Rotation: sampled changing deletion frames, L3-only replacement, and a `8996.5ms` interval between consecutive deletion starts.
- Phase lock: headline and L3 animation phases differed by `0`; deletion began at phase `0.7685`.
- Boundary skip: initial typing completed during the active burst at phase `0.7102`; the verifier confirmed deletion waited for the next cycle.
- Layout: the typewriter box stayed `620×81.890625px` from initial typing through rotation, and the action row top coordinate remained fixed.
- Reduced motion: all three lines rendered as the full static sentence, the cursor was hidden, and frames `800ms` apart were identical.
- `git diff --check` and JavaScript syntax checks: passed.
