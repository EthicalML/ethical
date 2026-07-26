# ADR-007 — Forms on a serverless site

**Status:** ACCEPTED · formResponse option empirically tested and REJECTED (2026-07-26)

## Constraint

GitHub Pages, static forever: no server, no backend, and GitHub provides no form service. Direct Sheets-API writes from a static page are impossible safely (a write-scoped credential would be public). Static-site generators are build-time only — no runtime help. The current live site embeds a **Google Form via iframe** (form `1FAIpQLScLmKLxQ8s5nv1xlgID08xPEhlcaigWBGg1qUU1hozqXG2v-w`) — free, responses land in the linked Sheet.

## Tested and rejected: styled form → `formResponse` POST

The classic trick (our designed form POSTing to the Google Form's `formResponse` endpoint with `entry.NNNN` ids) was tested against the LIVE form with the complete, correctly-mapped field set — all 7 fields incl. the required "individual vs representative" choice + its `_sentinel`, valid option strings, `fbzx`/`fvv`/`pageHistory` tokens: **HTTP 400 every time.** Modern Google Forms requires the JS-generated `partialResponse` payload; the static-POST pattern is dead for this form. Do not resurrect without a full browser-level replication, and treat it as brittle even then. Field map recorded for reference: main-reason `entry.1219341670`, individual/representative `entry.958273554` (+`_sentinel`), first `entry.542037596`, last `entry.653628934`, email `entry.1149064180`, company `entry.89112335`, position `entry.1169896599`.

## Options, ranked

1. **Google Apps Script web app (RECOMMENDED).** ~20-line script bound to a Sheet, deployed "execute as owner / accessible to anyone" → a public POST URL our designed form submits to; JS fetch + our own confirmation UI. **No secret exists anywhere**: the page carries only the public URL; the script runs server-side under the owner's authority (Google hosts it) and can only append rows to the one sheet it codes. **Spam exposure is HIGHER than the current form, not identical**: Google Forms' JS-built submission payload is a de facto bot barrier (our own curl test 400'd against it) plus Google-side abuse handling, whereas a bare Apps Script URL accepts any scripted POST. Mitigate in the script + page: honeypot field (drop rows that fill it), minimum-time-on-page token, basic per-IP/volume throttle and length caps in the script, and a separate "quarantine" sheet tab for suspect rows. Accept that a determined spammer still gets rows into a sheet — the blast radius is noise in a spreadsheet, not a security event. Costs: one deployed script to keep (redeploy on edit), owner's Google account as the trust root (already true today).
2. **Keep the iframe as-is** — guaranteed-working floor, zero work; costs design fidelity (iframe can't inherit tokens). Acceptable at launch if 1 slips.
3. **Third-party form services** (Formspree etc.) — rejected: external dependency + free-tier limits for no advantage.

## Decision rule

Build 1 in Milestone B with an acceptance test (submission from the designed form appears in the Sheet); iframe (2) remains the launch floor. Document the deployed endpoint + field mapping in `research/conventions.md` when wired. Until then the designed form components are decorative.
