# Signals Berlin — preflight

10 September 2026 · opening keynote · 09:15 · 45 minutes

## Run the built deck

1. Use Node 22.12 or newer. Run `npm ci` once while online.
2. Run `npm run build`, then `npm run preview -- --port 4173`.
3. Open http://127.0.0.1:4173/#0.1. All presentation assets are local; Google Analytics runs only on the public production hostname, outside presenter mode.
4. Connect the projector, check display mirroring/extension, and press F for fullscreen.
5. Check the title subtitle, chart labels on 1.2–1.3, and the five sensor labels on 4.2 from the back of the room. Keep the full 16:9 stage inside the projector's safe area.
6. Test the physical clicker: Page Down/Up and Right/Left advance/return; Space, Enter and background clicks advance. Links and controls remain interactive. Left/right (or Space) changes slides; up/down changes acts. Scrolling remains continuous; releasing near a speaking stop settles gently. Home returns to the title; End goes to references.
7. Press P for a separate presenter window with the complete outline notes and a 45-minute timer. Put it on the laptop screen. Start the timer yourself; navigation never starts or resets it.
8. Rehearse the fault-to-repair sequence from D2 through 2A.4 and the running/exposed/governor controls on 4.1. Arrow keys still advance one slide.
9. Use a separately exported PDF if a backup is needed; there is no screenshot fallback (the one opening-slide JPEG is for social sharing only).
10. B blacks out the audience screen; any key restores it. G opens the index; ? opens help.
11. Disable notifications, power saving, automatic display changes and system sleep. Connect power. Keep the build and browser running locally before doors open.
12. After the close (4.6), hold the silence. Advance to 4.7 only after it lands.

## Automated checks

`npm run verify` builds, starts a separate production server, and launches Playwright Chromium with `--use-angle=metal`. It records the actual renderer and rejects software rendering. It checks all 41 views, offline requests, navigation, spring settling, presenter sync, reduced motion, 4K rendering, context restoration and environment recovery. Reports and screenshots go under `tmp/`.


## Editorial checks

See [V4-REVIEW.md](V4-REVIEW.md) for source corrections already reconciled with the v4 outline. Presenter notes retain the outline's speaker-owned and pre-talk checks, including current programme details, internal figures and the actual pipeline story. The pipeline curve is explicitly illustrative until the speaker provides measurements.

The OpenAI quotation and the historical SREcon diagram have been checked against their primaries. Legal wording is bounded to high-risk systems and avoids the obsolete blanket applicability date. Deleted v3 material is absent from navigation.

## Timing

The 38 views are a speaking sequence, not an automatic 45-minute schedule. Rehearse with the presenter clock, including pauses for chart reveals and hardware transitions. Protect the four failure-mode chapters and the reconcile-loop conclusion. Thank You at 4.7 retains the QR and reference links.
