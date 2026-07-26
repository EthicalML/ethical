# ADR-007 — Forms on a serverless site

**Status:** ACCEPTED (approach ranked; final pick during Milestone B)

## Constraint

GitHub Pages, static forever: no server, no backend, and GitHub itself provides no form service. The current live site embeds a **Google Form via iframe** — free, zero-maintenance, responses land in Google Sheets. The bar is: anything replacing it must be equally cheap and equally owner-owned.

## Options, ranked

1. **Styled native form POSTing to the Google Form backend (preferred — try first).** Keep the exact Google Form as the data sink, but render OUR designed form (the network-split/contact-full components) and submit to the form's `formResponse` endpoint with the field `entry.NNNN` ids (obtainable from the form's prefill link). Zero cost, responses still in the same Sheet, no iframe styling jail. Caveats: it's an unofficial pattern — Google can change field ids when the form is edited (re-sync then), and submission result is opaque (fire in no-cors mode and show our own confirmation state). Acceptance test in Milestone B: a submission lands in the Sheet from the designed form.
2. **Google Apps Script web app** ("Google Sheets in the background", the owner's instinct): a ~20-line Apps Script bound to a Sheet, deployed as a web endpoint our form POSTs to. Also free and Sheet-backed, slightly more owned surface (a script to keep deployed), but an *official* mechanism — the fallback if #1 proves brittle.
3. **Keep the iframe as-is** — guaranteed-working floor; costs design fidelity (iframe cannot inherit our tokens). Acceptable for launch if 1-2 slip.
4. **Third-party form services** (Formspree/Getform/etc.) — rejected: adds an external dependency + free-tier limits for no advantage over Google-backed options.

## Decision rule

Ship 1 if its acceptance test passes; else 2; else 3 at launch with 2 as fast-follow. Never 4. Document the chosen endpoint + field mapping in `research/conventions.md` when wired (the current forms are decorative until then — treat as a Milestone B blocker).
