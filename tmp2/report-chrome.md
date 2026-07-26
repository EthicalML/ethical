# Lane B — Chrome completion report

Branch: `redesign-astro`

Verification origin: `http://127.0.0.1:4126` only

Node: `22.14.0`

## 1. Self-hosted fonts

Commit: `51e00c6 feat(fonts): self-host design typefaces`

- Added Latin variable WOFF2 files for Newsreader 300–600 normal/italic, Geist 300–700, and Geist Mono 300–500 under `public/fonts/`.
- Added matching `@font-face` rules with `font-display: swap` to `src/styles/tokens.css`.
- Removed the Google Fonts stylesheet and preconnect links from `BaseLayout.astro`.
- Full Chromium DOM gate: `document.fonts.check()` returned `true` for Newsreader, Geist, and Geist Mono on all 23 routes; performance resources contained zero `fonts.googleapis.com` requests.

## 2. SEO and meta chrome

Commit: `5811f5a feat(seo): add per-page metadata and favicons`

- Added descriptions to the original 20 Astro pages, including the nine principle collection entries. Descriptions reuse existing page prose or commitments, so no invented placeholders were required in that set.
- Added per-page description, canonical, Open Graph, and Twitter metadata to `BaseLayout.astro`.
- Set Astro's production site to `https://ethical.institute` and the default social image to `/images/banner.jpg`.
- Added `favicon.png` and `favicon.ico`, derived from `public/images/logos/eml-logo-white.png`.
- Final static audit across all 23 pages: 23 unique titles, 23 unique descriptions, and zero missing/mismatched metadata fields.

## 3. Redirects, indexes, privacy, sitemap, and robots

Commit: `091c52a feat(routes): preserve legacy URLs and publish sitemap`

- Added the requested redirects for `/principles.html`, `/security.html`, `/rfx.html`, `/xai.html`, `/eal.html`, `/mlmm.html`, `/network.html`, `/contact.html`, `/mle.html`, and `/privacypolicy.html`.
- Added `/rfp.html` → `/frameworks/` because it is also a legacy root page and the brief requires every legacy URL.
- Added minimal `/frameworks/` and ported the visible legacy privacy policy to `/privacy/`.
- Added `@astrojs/sitemap`, recorded the dependency in ADR-001, and added `robots.txt`.
- Built-output audit: 11/11 redirect refresh targets matched, the sitemap contains 22 indexable routes, and robots points to `https://ethical.institute/sitemap-index.xml`.
- Continuity audit: `CNAME` is `ethical.institute`; both state-of-ML HTML pages and CSVs exist; 396 newsletter archive HTML files remain in `dist/mle/`.

## 4. Continuity tags

Commit: `b88e906 feat(analytics): preserve verification and GA tags`

- Carried `google-site-verification=9rfgBQEvfnZ7HS_kBzINrlrJ-_sJcyJxqEUltqvP9Og` into the base head.
- Carried the legacy Analytics property `UA-89407852-2` and loader into the base head.
- The verification token was in legacy `_includes/header.html`; the legacy analytics snippet was actually in `_includes/footer.html`.
- Final audit found both tags in all 23 built Astro pages.

## 5. Designed 404

Commit: `3df3112 feat(errors): add designed 404 page`

- Added `src/pages/404.astro` using the shared layout, article hero, CTA, tokens, header, and footer.
- The new 404 copy and description are marked with `<!-- PLACEHOLDER -->`.
- Built as `dist/404.html` and passed DOM and screenshot gates.

## 6. Forms

Commit: `1322006 feat(forms): wire static submissions and receiver`

- Both `network-split` and `contact-full` variants now submit through the shared client.
- Added required name/email validation, an off-screen honeypot, a page-start timestamp, elapsed time, per-browser client token, endpoint-backed `fetch` POST, success/error states, and a clear no-network demo confirmation.
- `src/data/site.json` deliberately keeps `forms.endpoint` empty and shows the Apps Script placeholder URL separately.
- Added `scripts/forms/apps-script.gs` with honeypot drop, timing/rate/volume/length quarantine, and `Responses`/`Quarantine` routing.
- Added `scripts/forms/README.md` with the owner's deployment steps and field order.
- Client and receiver both passed JavaScript syntax checks.
- Chromium gate submitted all rendered forms in demo mode: both variants reached `data-state="success"`, displayed the demo confirmation, retained a 13-digit start token, and kept the honeypot at 1×1 px and `left: -10000px`.

## Final gates

- `npm run build`: pass, 23 Astro pages, sitemap generated.
- DOM gate at 1440×1000: 23/23 routes passed; zero page/console errors; zero unrevealed targets; maximum page height 7,011 px; maximum document width 1,440 px.
- Screenshot gate at 1440×1000: 23/23 routes returned 200 with zero page/console errors and no horizontal overflow.
- Internal route/link audit: 26 targets checked, zero failures.
- Redirect audit: 11 targets checked, zero failures.
- Static metadata/continuity audit: pass.
- In-app Chrome was not exposed to this session. The repository's required headless Chromium harness supplied the runtime DOM, font, form, canvas, reveal, screenshot, error, and overflow evidence.

The verification manifest now covers the full 23-page desktop Astro surface. No responsive/mobile files or checks were added in this lane.
