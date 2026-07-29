# Client-architecture migration plan (executes ADR-009 on ratification)

One batch, byte-sized commits, zero-visual-change gates (build + DOM sweep + screenshot diff) between steps.

1. **Typewriter consolidation + naming cleanup.** The custom-element implementation becomes the live code INSIDE `Hero.astro` under its real name (`<type-writer>`); `subtitle_lines` moves to `index.mdx` front matter (mission lines leave the component); DELETE all four exhibit files (`Hero.tsx`, `HeroInline.astro`, `HeroInline.tsx`), `public/assets/widget-typewriter.js`, and `src/scripts/typewriter.ts`. No "Inline" naming survives anywhere.
2. **Gates first.** tsconfig excludes; Prettier + ESLint configs per ADR-009 §6 (template-friendly rules); astro check baseline recorded; verify scripts wired.
3. **Shared canvas engines.** `canvases.js` + `widget-kaos.js` → `src/canvas/*.ts` modules defining their elements; consumers (hero, OSS cards, nav previews, kaos page) import; delete the public files.
4. **Ownership split of `site.js` / `forms.js`.** Nav+drawer → `SiteHeader.astro` colocated; marquee behaviour → `AffiliationMarquee.astro`; reveal → layout-owned module imported by `BaseLayout`; form behaviour → `FormSection.astro`. Delete the public files and the BaseLayout `is:inline` list.
5. **Data dissolution per ADR-009 §5 table.** projects.json → front matter + metrics collection (+ refresh script); nav/site/footer → component-fence constants; stats/network/home-reports/sectors → page front matter; partners + survey → schema'd collections; newsletter-issues → build-derived from mle/ (owner decision pending on derive-vs-curate). `src/data/` removed.
6. **Sweep.** Confirm each page ships only the JS its components import; astro check debt burn-down; CONVENTIONS.md rewritten to match ADR-009; ADR-004 marked superseded with pointer.
