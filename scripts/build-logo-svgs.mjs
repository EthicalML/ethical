/**
 * Renders the eight logo lockups as outlined SVG, in both themes, into public/branding/.
 *
 * The geometry is the design handoff's, reproduced from the same font the site ships:
 * public/fonts/newsreader-*-variable.woff2, instanced at wght=300 with the optical size
 * the browser would pick (opsz = clamp(font-size, 6, 72)). Type is converted to paths, so
 * the assets can never reflow or substitute a font.
 *
 * Run: node scripts/build-logo-svgs.mjs [--verify]
 * --verify prints the ink-centring deltas for the mark cells and the measured line widths.
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import * as fontkit from 'fontkit';
import pngToIco from 'png-to-ico';
import sharp from 'sharp';
import { decompress } from 'wawoff2';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const outDir = path.join(root, 'public', 'branding');

const THEMES = {
  dark: { bg: '#080a09', type: '#f2f5f3', accent: '#57e39b' },
  light: { bg: '#f4f6f4', type: '#0b0e0c', accent: '#0f7a4c' },
};

// The mark is theme-invariant: dark cells on either background.
const CELL_BG = '#121815';
const CELL_BG_ACCENT = '#57e39b';
const KNOCKOUT = '#08110c';
const GLYPH_IN_CELL = '#f2f5f3';
const GLYPH_ACCENT = '#57e39b';

/**
 * The mark's four cells. Centring a glyph centres its advance box, not its ink, so each cell
 * carries an em-relative nudge. The handoff's values (I 0/0.1144, E 0/0.1129, A -0.086/0.1194,
 * S -0.082/0.1219) were solved against a browser that had no italic face loaded and synthesised
 * an oblique from the roman; the real Newsreader Italic leans the other way. Per the handoff's
 * own instruction, the nudges are re-solved here from the shipped font's ink metrics.
 */
const MARK_CELLS = [
  { glyph: 'I', italic: false, bg: CELL_BG, fill: GLYPH_IN_CELL },
  { glyph: 'E', italic: false, bg: CELL_BG, fill: GLYPH_IN_CELL },
  { glyph: 'A', italic: true, bg: CELL_BG_ACCENT, fill: KNOCKOUT },
  { glyph: 'S', italic: true, bg: CELL_BG, fill: GLYPH_ACCENT },
];

const LINE1 = 'The Institute for Ethical AI';
const LINE2 = 'Alignment & Safety';

/* ---------------------------------------------------------------- fonts */

const fonts = {};
for (const [style, file] of [
  ['roman', 'newsreader-latin-variable.woff2'],
  ['italic', 'newsreader-latin-italic-variable.woff2'],
]) {
  const woff2 = fs.readFileSync(path.join(root, 'public', 'fonts', file));
  fonts[style] = fontkit.create(Buffer.from(await decompress(woff2)));
}

const variations = new Map();
function instance(italic, size, wght = 300) {
  // The browser's default font-optical-sizing:auto sets opsz to the used font size in px.
  const opsz = Math.min(72, Math.max(6, size));
  const key = `${italic ? 'i' : 'r'}:${opsz}:${wght}`;
  if (!variations.has(key)) {
    variations.set(key, fonts[italic ? 'italic' : 'roman'].getVariation({ wght, opsz }));
  }
  return variations.get(key);
}

/** Baseline offset from the top of a CSS line box, in px. */
function baselineOffset(font, size, lineHeight) {
  const content = ((font.ascent - font.descent) / font.unitsPerEm) * size;
  return (lineHeight * size - content) / 2 + (font.ascent / font.unitsPerEm) * size;
}

/* --------------------------------------------------------------- layout */

/**
 * Lays a single line out the way CSS would: kerned advances plus letter-spacing after every
 * character (including the last, which is why it counts toward the measured width).
 */
function layoutLine(text, { italic = false, size, tracking = 0 }) {
  const font = instance(italic, size);
  const scale = size / font.unitsPerEm;
  const spacing = tracking * size;
  const run = font.layout(text);
  const glyphs = [];
  let x = 0;
  run.glyphs.forEach((glyph, i) => {
    glyphs.push({ glyph, x });
    x += run.positions[i].xAdvance * scale + spacing;
  });
  return { glyphs, width: x, scale, font, size };
}

const num = (n) => (Math.round(n * 100) / 100).toString();

/** Emits a laid-out line as path data, with its baseline at y. */
function lineToPath(line, x, y) {
  const parts = [];
  for (const { glyph, x: gx } of line.glyphs) {
    if (!glyph.path.commands.length) continue;
    const d = glyph.path.transform(line.scale, 0, 0, -line.scale, x + gx, y).toSVG();
    parts.push(d.replace(/-?\d+(\.\d+)?/g, (m) => num(Number(m))));
  }
  return parts.join('');
}

/** Ink bounding box of a laid-out line placed at (x, y), in px, y-down. */
function lineInk(line, x, y) {
  let minX = Infinity;
  let minY = Infinity;
  let maxX = -Infinity;
  let maxY = -Infinity;
  for (const { glyph, x: gx } of line.glyphs) {
    if (!glyph.path.commands.length) continue;
    const b = glyph.path.transform(line.scale, 0, 0, -line.scale, x + gx, y).bbox;
    minX = Math.min(minX, b.minX);
    minY = Math.min(minY, b.minY);
    maxX = Math.max(maxX, b.maxX);
    maxY = Math.max(maxY, b.maxY);
  }
  return { minX, minY, maxX, maxY };
}

/**
 * Solves a cell glyph's em-relative nudge so its ink centre lands on the cell centre.
 * Both terms are independent of the cell size, so one solve serves every lockup at this
 * glyph size (ink metrics still vary with the optical size, hence the size argument).
 */
function solveNudge({ glyph, italic }, glyphSize) {
  const font = instance(italic, glyphSize);
  const upem = font.unitsPerEm;
  const run = font.layout(glyph);
  const box = run.glyphs[0].path.bbox;
  const advance = run.positions[0].xAdvance / upem;
  const midX = (box.minX + box.maxX) / 2 / upem;
  const midY = (box.minY + box.maxY) / 2 / upem;
  return { nx: advance / 2 - midX, ny: 0.5 + midY - baselineOffset(font, 1, 1) };
}

/** Solves the font size at which a line measures `target` px, per the handoff's formula. */
function solveSize(text, { italic, tracking, target, from }) {
  let size = from;
  for (let i = 0; i < 4; i += 1) {
    const width = layoutLine(text, { italic, tracking, size }).width;
    size = Math.round((size * target) / width);
  }
  return size;
}

/* ----------------------------------------------------------- primitives */

/** A stack of lines, flush left (or centred) inside its own block box. */
function textBlock(specs, { align = 'left' } = {}) {
  const lines = specs.map((spec) => ({
    ...spec,
    laid: layoutLine(spec.text, spec),
    boxHeight: spec.size * spec.lineHeight,
  }));
  const width = Math.max(...lines.map((l) => l.laid.width));
  const height = lines.reduce((a, l) => a + l.boxHeight, 0);
  return {
    width,
    height,
    lines,
    draw(originX, originY) {
      const out = [];
      let y = originY;
      for (const line of lines) {
        const x = align === 'center' ? originX + (width - line.laid.width) / 2 : originX;
        out.push({
          fill: line.fill,
          d: lineToPath(
            line.laid,
            x,
            y + baselineOffset(line.laid.font, line.size, line.lineHeight),
          ),
        });
        y += line.boxHeight;
      }
      return out;
    },
  };
}

/** The 2×2 mark. Returns its size plus a draw() and the per-cell centring metrics. */
function mark({ cell, gap, glyphSize }) {
  const size = cell * 2 + gap;
  return {
    size,
    draw(originX, originY, { collectInto } = {}) {
      const out = [];
      MARK_CELLS.forEach((spec, i) => {
        const cx = originX + (i % 2) * (cell + gap);
        const cy = originY + Math.floor(i / 2) * (cell + gap);
        out.push({ rect: { x: cx, y: cy, w: cell, h: cell }, fill: spec.bg });

        const laid = layoutLine(spec.glyph, { italic: spec.italic, size: glyphSize });
        const nudge = solveNudge(spec, glyphSize);
        // The glyph is a shrink-to-fit flex item: its advance box is centred in the cell,
        // its line box is exactly 1em tall (line-height:1). Then the optical nudge.
        const x = cx + (cell - laid.width) / 2 + nudge.nx * glyphSize;
        const top = cy + (cell - glyphSize) / 2 + nudge.ny * glyphSize;
        const baseline = top + baselineOffset(laid.font, glyphSize, 1);
        out.push({ fill: spec.fill, d: lineToPath(laid, x, baseline) });

        if (collectInto) {
          const ink = lineInk(laid, x, baseline);
          collectInto.push({
            glyph: spec.glyph,
            nx: nudge.nx,
            ny: nudge.ny,
            dx: (ink.minX + ink.maxX) / 2 - (cx + cell / 2),
            dy: (ink.minY + ink.maxY) / 2 - (cy + cell / 2),
          });
        }
      });
      return out;
    },
  };
}

/* ------------------------------------------------------------ the tiles */

const wordmarkLines = (size, lineHeight, theme) => [
  { text: LINE1, size, lineHeight, fill: theme.type },
  { text: LINE2, size, lineHeight, italic: true, fill: theme.accent },
];

const squareLines = (theme, sizes) =>
  [
    { text: 'The Institute', fill: theme.type },
    { text: 'for Ethical AI', fill: theme.type },
    { text: 'Alignment', italic: true, fill: theme.accent },
    { text: '& Safety', italic: true, fill: theme.accent },
  ].map((line, i) => ({ ...line, ...sizes[i] }));

/**
 * The two one-measure tiles flush all four lines to a common measure. The handoff's sizes were
 * solved against its own (part synthetic-italic) rendering, so they are treated as the probe and
 * re-solved here against the shipped font. `handoffSize` is kept for the verification table.
 */
function fitBlock(defs, target) {
  return defs.map((def) => ({
    ...def,
    handoffSize: def.from,
    lineHeight: 1.06,
    size: solveSize(def.text, { ...def, target }),
    target,
  }));
}

const FIT_J = fitBlock(
  [
    { text: 'The Institute', tracking: -0.005, from: 91 },
    { text: 'for Ethical AI', tracking: 0.005, from: 86 },
    { text: 'Alignment', italic: true, tracking: 0.01, from: 109 },
    { text: '& Safety', italic: true, tracking: 0.02, from: 129 },
  ],
  499,
);

const FIT_H = fitBlock(
  [
    { text: 'The Institute', tracking: -0.005, from: 91 },
    { text: 'for Ethical', tracking: 0.055, from: 99 },
    { text: 'AI Alignment', italic: true, tracking: -0.005, from: 88 },
    { text: '& Safety', italic: true, tracking: 0.02, from: 129 },
  ],
  500,
);

const withFill = (lines, theme) =>
  lines.map((line, i) => ({ ...line, fill: i < 2 ? theme.type : theme.accent }));

const TILES = [
  {
    id: 'wordmark',
    handoff: 'D · #asset-word-full',
    width: 960,
    height: 220,
    build(theme) {
      const block = textBlock(wordmarkLines(52, 1.22, theme));
      return block.draw(64, (220 - block.height) / 2);
    },
  },
  {
    id: 'horizontal',
    handoff: 'F · #asset-horizontal',
    width: 960,
    height: 220,
    build(theme, cells) {
      const m = mark({ cell: 56, gap: 4, glyphSize: 36 });
      const block = textBlock(wordmarkLines(36, 1.22, theme));
      const total = m.size + 32 + block.width;
      const x = (960 - total) / 2;
      return [
        ...m.draw(x, (220 - m.size) / 2, { collectInto: cells }),
        ...block.draw(x + m.size + 32, (220 - block.height) / 2),
      ];
    },
  },
  {
    id: 'square-text-j',
    handoff: 'J · #asset-square-text-j',
    width: 640,
    height: 640,
    build(theme) {
      const block = textBlock(
        squareLines(
          theme,
          Array.from({ length: 4 }, () => ({ size: 76, lineHeight: 1.08, tracking: -0.015 })),
        ),
      );
      return block.draw((640 - block.width) / 2, (640 - block.height) / 2);
    },
  },
  {
    id: 'square-full',
    handoff: 'A · #asset-square-full',
    width: 640,
    height: 640,
    build(theme, cells) {
      const m = mark({ cell: 104, gap: 6, glyphSize: 66 });
      const block = textBlock(wordmarkLines(34, 1.24, theme), { align: 'center' });
      const total = m.size + 52 + block.height;
      const top = (640 - total) / 2;
      return [
        ...m.draw((640 - m.size) / 2, top, { collectInto: cells }),
        ...block.draw((640 - block.width) / 2, top + m.size + 52),
      ];
    },
  },
  {
    id: 'mark',
    handoff: 'C · #asset-mark',
    width: 640,
    height: 640,
    build(theme, cells) {
      const m = mark({ cell: 176, gap: 10, glyphSize: 112 });
      return m.draw((640 - m.size) / 2, (640 - m.size) / 2, { collectInto: cells });
    },
  },
  {
    id: 'square-text-j-fit',
    handoff: 'K · #asset-square-text-j-fit',
    width: 640,
    height: 640,
    fit: FIT_J,
    build(theme) {
      const block = textBlock(withFill(FIT_J, theme));
      return block.draw((640 - block.width) / 2, (640 - block.height) / 2);
    },
  },
  {
    id: 'square-text-mark',
    handoff: 'I · #asset-square-text-mark',
    width: 640,
    height: 640,
    build(theme, cells) {
      const m = mark({ cell: 116, gap: 6, glyphSize: 74 });
      const block = textBlock(
        squareLines(
          theme,
          Array.from({ length: 4 }, () => ({ size: 41, lineHeight: 1.45 })),
        ),
      );
      const total = m.size + 30 + block.width;
      const x = (640 - total) / 2;
      return [
        ...m.draw(x, (640 - m.size) / 2, { collectInto: cells }),
        ...block.draw(x + m.size + 30, (640 - block.height) / 2),
      ];
    },
  },
  {
    id: 'square-text-fit',
    handoff: 'H · #asset-square-text-fit',
    width: 640,
    height: 640,
    fit: FIT_H,
    build(theme) {
      const block = textBlock(withFill(FIT_H, theme));
      return block.draw((640 - block.width) / 2, (640 - block.height) / 2);
    },
  },
];

/* ------------------------------------------------------------- emission */

function toSvg({ width, height }, background, shapes) {
  const body = shapes.map((shape) =>
    shape.rect
      ? `<rect x="${num(shape.rect.x)}" y="${num(shape.rect.y)}" width="${num(shape.rect.w)}" height="${num(shape.rect.h)}" fill="${shape.fill}"/>`
      : `<path fill="${shape.fill}" d="${shape.d}"/>`,
  );
  return [
    `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" role="img" aria-label="The Institute for Ethical AI Alignment &amp; Safety">`,
    background ? `<rect width="${width}" height="${height}" fill="${background}"/>` : '',
    ...body,
    '</svg>',
    '',
  ]
    .filter(Boolean)
    .join('\n');
}

/** The mark alone on a transparent square, for the favicon. */
function markSvg() {
  const m = mark({ cell: 176, gap: 10, glyphSize: 112 });
  return toSvg({ width: m.size, height: m.size }, null, m.draw(0, 0));
}

/** The favicon bitmap source: the mark centred on the dark background, with breathing room. */
function faviconRasterSvg(size, padding) {
  const m = mark({ cell: 176, gap: 10, glyphSize: 112 });
  const scale = (size - padding * 2) / m.size;
  const inner = markSvg().split('\n').slice(1, -2).join('\n');
  return [
    `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">`,
    `<rect width="${size}" height="${size}" fill="${THEMES.dark.bg}"/>`,
    `<g transform="translate(${padding} ${padding}) scale(${num(scale)})">`,
    inner,
    '</g>',
    '</svg>',
    '',
  ].join('\n');
}

/**
 * Favicon cuts: weight-300 glyphs cannot survive tab sizes, so the small cuts trade weight
 * for legibility — heavier instances at the smallest optical size, the glyph enlarged and
 * ink-centred per cell. The dark cells lift to the header's value so the grid reads on
 * dark tab strips. The letters lighten as the canvas grows, converging on the true mark.
 */
const FAVICON_CELL_BG = '#1c2420';
const FAVICON_CUTS = [
  { size: 16, cell: 7, gap: 2, frac: 0.95, wght: 800 },
  { size: 32, cell: 15, gap: 2, frac: 0.85, wght: 700 },
  { size: 48, cell: 23, gap: 2, frac: 0.78, wght: 600 },
];

function faviconTileSvg({ size, cell, gap, frac, wght }) {
  const shapes = [];
  MARK_CELLS.forEach((spec, i) => {
    const x = (i % 2) * (cell + gap);
    const y = Math.floor(i / 2) * (cell + gap);
    // opsz pinned to the axis minimum (pass 6, not the glyph size): the chunkiest cut.
    const font = instance(spec.italic, 6, wght);
    const glyph = font.layout(spec.glyph).glyphs[0];
    const scale = (cell * frac) / font.unitsPerEm;
    const box = glyph.path.bbox;
    const cx = ((box.minX + box.maxX) / 2) * scale;
    const cy = ((box.minY + box.maxY) / 2) * scale;
    shapes.push({
      rect: { x, y, w: cell, h: cell },
      fill: spec.bg === CELL_BG ? FAVICON_CELL_BG : spec.bg,
    });
    const d = glyph.path
      .transform(scale, 0, 0, -scale, x + cell / 2 - cx, y + cell / 2 + cy)
      .toSVG()
      .replace(/-?\d+(\.\d+)?/g, (m) => num(Number(m)));
    shapes.push({ fill: spec.fill, d });
  });
  return toSvg({ width: size, height: size }, null, shapes);
}

const verbose = process.argv.includes('--verify');
fs.mkdirSync(outDir, { recursive: true });

const centring = [];
const measures = [];

for (const tile of TILES) {
  for (const [name, theme] of Object.entries(THEMES)) {
    const cells = [];
    const shapes = tile.build(theme, cells);
    fs.writeFileSync(path.join(outDir, `${tile.id}-${name}.svg`), toSvg(tile, theme.bg, shapes));
    for (const cell of cells) centring.push({ tile: `${tile.id}-${name}`, ...cell });
  }
}

// Line measures for the two one-measure tiles, taken from the same layout the SVGs use.
for (const tile of TILES.filter((t) => t.fit)) {
  for (const spec of tile.fit) {
    const width = layoutLine(spec.text, spec).width;
    measures.push({
      tile: tile.id,
      line: spec.text,
      handoffSize: spec.handoffSize,
      size: spec.size,
      width,
      deltaPct: ((width - spec.target) / spec.target) * 100,
    });
  }
}

// The scalable favicon carries the 32px lettered cut; the ico carries all three.
fs.writeFileSync(path.join(root, 'public', 'favicon.svg'), faviconTileSvg(FAVICON_CUTS[1]));
const faviconPngs = await Promise.all(
  FAVICON_CUTS.map((cut) =>
    sharp(Buffer.from(faviconTileSvg(cut)), { density: 288 })
      .resize(cut.size, cut.size)
      .png()
      .toBuffer(),
  ),
);
fs.writeFileSync(path.join(root, 'public', 'favicon.ico'), await pngToIco(faviconPngs));
await sharp(Buffer.from(faviconRasterSvg(512, 40)))
  .png()
  .toFile(path.join(root, 'public', 'favicon.png'));

const worstCell = Math.max(...centring.map((c) => Math.max(Math.abs(c.dx), Math.abs(c.dy))));
const worstMeasure = Math.max(...measures.map((m) => Math.abs(m.deltaPct)));

if (verbose) {
  console.table(
    centring.map((c) => ({
      tile: c.tile,
      glyph: c.glyph,
      nx: Number(c.nx.toFixed(4)),
      ny: Number(c.ny.toFixed(4)),
      dx: Number(c.dx.toFixed(3)),
      dy: Number(c.dy.toFixed(3)),
    })),
  );
  console.table(
    measures.map((m) => ({
      tile: m.tile,
      line: m.line,
      'handoff size': m.handoffSize,
      size: m.size,
      width: Number(m.width.toFixed(1)),
      'delta %': Number(m.deltaPct.toFixed(2)),
    })),
  );
}

console.log(
  `Wrote ${TILES.length * 2} tiles to public/branding/ and public/favicon.svg. ` +
    `Worst ink-centring delta ${worstCell.toFixed(2)}px; worst measure delta ${worstMeasure.toFixed(2)}%.`,
);

if (worstCell > 1) {
  console.error('Ink centring exceeds the 1px tolerance.');
  process.exitCode = 1;
}
