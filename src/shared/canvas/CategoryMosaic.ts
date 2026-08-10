import { CanvasEngine, type CanvasPalette, rgba, surfaceOf } from './CanvasEngine';

// A twinkling mosaic of catalogue categories: each tile is a category, sized by its span in a
// six-by-four grid, carrying an emoji, a name and a count. Tiles enter in sequence and then flare
// on their own offset cycles, so the board reads as a living index rather than a static table.
// Shared by the header's nav preview and the open-source project cards.

export interface MosaicTile {
  column: number;
  row: number;
  spanColumns: number;
  spanRows: number;
  emoji: string;
  name: string;
  count: number;
}

export const PRODUCTION_ML_TILES: MosaicTile[] = [
  {
    column: 0,
    row: 0,
    spanColumns: 2,
    spanRows: 2,
    emoji: '📈',
    name: 'Evaluation & Monitoring',
    count: 68,
  },
  {
    column: 2,
    row: 0,
    spanColumns: 2,
    spanRows: 1,
    emoji: '💪',
    name: 'Deployment & Serving',
    count: 60,
  },
  {
    column: 4,
    row: 0,
    spanColumns: 2,
    spanRows: 1,
    emoji: '🧮',
    name: 'Compute Optimisation',
    count: 58,
  },
  { column: 2, row: 1, spanColumns: 1, spanRows: 1, emoji: '🔠', name: 'NLP', count: 45 },
  { column: 3, row: 1, spanColumns: 1, spanRows: 1, emoji: '🍕', name: 'RL', count: 39 },
  {
    column: 4,
    row: 1,
    spanColumns: 2,
    spanRows: 1,
    emoji: '🏁',
    name: 'Training & Orchestration',
    count: 27,
  },
  { column: 0, row: 2, spanColumns: 1, spanRows: 1, emoji: '🧵', name: 'Pipelines', count: 25 },
  { column: 1, row: 2, spanColumns: 1, spanRows: 1, emoji: '💾', name: 'Storage', count: 25 },
  { column: 2, row: 2, spanColumns: 2, spanRows: 1, emoji: '📊', name: 'Visualisation', count: 25 },
  { column: 4, row: 2, spanColumns: 1, spanRows: 1, emoji: '🔥', name: 'Retrieval', count: 24 },
  { column: 5, row: 2, spanColumns: 1, spanRows: 1, emoji: '🔧', name: 'AutoML', count: 18 },
  {
    column: 0,
    row: 3,
    spanColumns: 2,
    spanRows: 1,
    emoji: '🏷️',
    name: 'Annotation & Synthesis',
    count: 16,
  },
  {
    column: 2,
    row: 3,
    spanColumns: 2,
    spanRows: 1,
    emoji: '📜',
    name: 'Experiment Management',
    count: 16,
  },
  {
    column: 4,
    row: 3,
    spanColumns: 2,
    spanRows: 1,
    emoji: '🔏',
    name: 'Privacy & Safety',
    count: 15,
  },
];

// A drawer bound to one tile set. Two sets ship: the production-ML catalogue and the AI
// regulation catalogue, which share the layout grammar and differ only in their tiles.
export const createMosaicDrawer =
  (tiles: MosaicTile[]) =>
  (
    context: CanvasRenderingContext2D,
    width: number,
    height: number,
    elapsed: number,
    palette: CanvasPalette,
  ) => {
    const pad = 22;
    const gap = 7;
    const columns = 6;
    const rows = 4;
    const unitWidth = (width - pad * 2 - gap * (columns - 1)) / columns;
    const unitHeight = (height - pad * 2 - gap * (rows - 1)) / rows;

    tiles.forEach((tile, index) => {
      const x = pad + tile.column * (unitWidth + gap);
      const y = pad + tile.row * (unitHeight + gap);
      const tileWidth = tile.spanColumns * unitWidth + (tile.spanColumns - 1) * gap;
      const tileHeight = tile.spanRows * unitHeight + (tile.spanRows - 1) * gap;
      const entrance = Math.min(1, Math.max(0, elapsed * 2 - index * 0.07));
      // Star-like twinkle: each tile flares on its own offset cycle, most stay dim.
      const twinkle =
        Math.max(0, Math.sin(elapsed * (1.1 + (index % 5) * 0.27) + index * 2.4)) ** 4;

      context.globalAlpha = entrance;
      context.save();
      context.translate(0, (1 - entrance) * 10);
      context.fillStyle = rgba(palette.accent, 0.015 + twinkle * 0.055);
      context.fillRect(x, y, tileWidth, tileHeight);
      context.strokeStyle =
        twinkle > 0.08 ? rgba(palette.accentInk, 0.13 + twinkle * 0.6) : rgba(palette.ink, 0.13);
      context.lineWidth = 1 + twinkle * 0.4;
      context.strokeRect(x, y, tileWidth, tileHeight);

      context.textAlign = 'left';
      context.font = `${Math.min(17, tileHeight * 0.24)}px 'Geist',sans-serif`;
      context.fillText(tile.emoji, x + 10, y + 24);
      context.font = "10px 'Geist Mono',monospace";
      context.fillStyle = rgba(palette.accentInk, 0.5 + twinkle * 0.5);
      context.textAlign = 'right';
      context.fillText(String(tile.count), x + tileWidth - 10, y + 22);
      context.textAlign = 'left';
      context.font = "9.5px 'Geist',sans-serif";
      context.fillStyle = rgba(palette.ink, 0.55 + twinkle * 0.4);
      context.fillText(tile.name, x + 10, y + tileHeight - 12, tileWidth - 20);
      context.restore();
      context.globalAlpha = 1;
    });
  };

// The AI regulation catalogue: the six themes carry their real entry counts, and the economic
// areas with the deepest records anchor the board. Same grammar as the production-ML set.
export const AI_GUIDELINES_TILES: MosaicTile[] = [
  {
    column: 0,
    row: 0,
    spanColumns: 2,
    spanRows: 2,
    emoji: '\u{1F1EA}\u{1F1FA}',
    name: 'European Union',
    count: 10,
  },
  {
    column: 2,
    row: 0,
    spanColumns: 2,
    spanRows: 1,
    emoji: '\u{1F1FA}\u{1F1F8}',
    name: 'United States',
    count: 11,
  },
  {
    column: 4,
    row: 0,
    spanColumns: 2,
    spanRows: 1,
    emoji: '\u{1F50D}',
    name: 'Frameworks & Principles',
    count: 21,
  },
  {
    column: 2,
    row: 1,
    spanColumns: 1,
    spanRows: 1,
    emoji: '\u{1F1E8}\u{1F1F3}',
    name: 'China',
    count: 7,
  },
  {
    column: 3,
    row: 1,
    spanColumns: 1,
    spanRows: 1,
    emoji: '\u{1F1EC}\u{1F1E7}',
    name: 'United Kingdom',
    count: 3,
  },
  {
    column: 4,
    row: 1,
    spanColumns: 2,
    spanRows: 1,
    emoji: '\u{1F528}',
    name: 'Interactive & Practical Tools',
    count: 25,
  },
  {
    column: 0,
    row: 2,
    spanColumns: 1,
    spanRows: 1,
    emoji: '\u{1F1EE}\u{1F1F3}',
    name: 'India',
    count: 4,
  },
  {
    column: 1,
    row: 2,
    spanColumns: 1,
    spanRows: 1,
    emoji: '\u{1F1F8}\u{1F1EC}',
    name: 'Singapore',
    count: 2,
  },
  {
    column: 2,
    row: 2,
    spanColumns: 2,
    spanRows: 1,
    emoji: '\u{1F50F}',
    name: 'Processes & Checklists',
    count: 15,
  },
  {
    column: 4,
    row: 2,
    spanColumns: 1,
    spanRows: 1,
    emoji: '\u{1F1E7}\u{1F1F7}',
    name: 'Brazil',
    count: 1,
  },
  {
    column: 5,
    row: 2,
    spanColumns: 1,
    spanRows: 1,
    emoji: '\u{1F1E8}\u{1F1E6}',
    name: 'Canada',
    count: 1,
  },
  {
    column: 0,
    row: 3,
    spanColumns: 2,
    spanRows: 1,
    emoji: '\u{1F4DC}',
    name: 'Industry standards',
    count: 5,
  },
  {
    column: 2,
    row: 3,
    spanColumns: 2,
    spanRows: 1,
    emoji: '\u{1F4DA}',
    name: 'Online courses',
    count: 7,
  },
  {
    column: 4,
    row: 3,
    spanColumns: 2,
    spanRows: 1,
    emoji: '\u{1F916}',
    name: 'Newsletters',
    count: 7,
  },
];

const TILE_SETS: Record<string, MosaicTile[]> = {
  'production-ml': PRODUCTION_ML_TILES,
  'ai-guidelines': AI_GUIDELINES_TILES,
};

// A standalone mount. `data-set` names the catalogue; the nav preview calls the drawer directly
// because it multiplexes several drawers onto one canvas.
export class CategoryMosaic extends HTMLElement {
  private engine?: CanvasEngine;

  connectedCallback() {
    const canvas = this.querySelector('canvas');
    if (!canvas) return;
    const draw = createMosaicDrawer(
      TILE_SETS[this.dataset.set ?? 'production-ml'] ?? PRODUCTION_ML_TILES,
    );
    this.engine = new CanvasEngine(
      canvas,
      (context, width, height, elapsed, _pointer, palette) => {
        context.clearRect(0, 0, width, height);
        draw(context, width, height, elapsed, palette);
      },
      surfaceOf(this),
    );
  }

  disconnectedCallback() {
    this.engine?.destroy();
  }
}

if (!customElements.get('category-mosaic')) {
  customElements.define('category-mosaic', CategoryMosaic);
}
