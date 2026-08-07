# Organisation link collapse report

Date: 2026-07-27

Branch: `redesign-astro`

## Result

- Collapsed `/partners/` to one owner-confirmed evidence link per linked organisation.
- Removed link rows and placeholders for the United Nations, IEEE, and ISO/IEC, and reframed their copy around participation without claiming a public record.
- Collapsed the organisation records on `/initiatives/` to the strongest owner-confirmed link for each organisation.
- Removed the duplicate European Commission output request and retained one appointment-record request on `/partners/`.
- Removed the unverified KAOS Medium-coverage slot.
- Kept the KAOS project-domain request and its warning that `kaos.cc` resolves to the unrelated EssentialKaos project.

## Remaining `[OWNER-LINK]` placeholders

Total across `src/`: **2**.

1. `/partners/` — European Commission appointment record naming Alejandro Saucedo.
2. `/initiatives/` — the real domain for the Institute's KAOS Kubernetes agent project.

## Verification

- `npm run build` with the repository-pinned Node 22.14.0: passed; 25 pages built.
- Repository DOM gate at 1440 × 1000 against `http://127.0.0.1:4126`: passed for `/partners/` and `/initiatives/`.
- `/partners/`: HTTP and runtime checks passed; 0 page or console errors; 0 unrevealed targets; page width 1,440 px; page height 5,824 px.
- `/initiatives/`: HTTP and runtime checks passed; 0 page or console errors; 0 unrevealed targets; page width 1,440 px; page height 4,598 px.
- Font checks passed for Newsreader, Geist, and Geist Mono; no Google Fonts requests were made.
- `git diff --check`: passed.
- The existing development server on port 4126 was reused and left running.
