import { CanvasEngine, type CanvasPalette, type CanvasPointer, surfaceOf } from './CanvasEngine';
import { createCubeDrawer } from './KomputeCube';
import { createGalaxyDrawer } from './KaosArchitecture';
import { createMosaicDrawer, PRODUCTION_ML_TILES } from './CategoryMosaic';
import { drawXai } from './XaiPipeline';

export class NavPreview extends HTMLElement {
  static observedAttributes = ['mode'];

  private cube = createCubeDrawer();
  private mosaic = createMosaicDrawer(PRODUCTION_ML_TILES);
  private galaxy = createGalaxyDrawer({ labels: false, scale: 0.88 });
  private engine?: CanvasEngine;

  attributeChangedCallback() {
    this.engine?.redraw();
  }

  connectedCallback() {
    const canvas = this.querySelector('canvas');
    if (!canvas) return;

    this.engine = new CanvasEngine(
      canvas,
      (
        context: CanvasRenderingContext2D,
        width: number,
        height: number,
        elapsed: number,
        pointer: CanvasPointer,
        palette: CanvasPalette,
      ) => {
        const mode = this.getAttribute('mode');
        context.clearRect(0, 0, width, height);
        if (mode === 'kompute') {
          context.save();
          context.translate(width * 0.5, height * 0.43);
          context.scale(0.85, 0.85);
          context.translate(width * -0.5, height * -0.43);
          this.cube(context, width, height * 0.86, elapsed, pointer, palette);
          context.restore();
        } else if (mode === 'xai') drawXai(context, width, height * 0.72, elapsed, palette);
        else if (mode === 'list') this.mosaic(context, width, height * 0.72, elapsed, palette);
        else this.galaxy.draw(context, width, height * 0.86, elapsed, pointer, palette);
      },
      surfaceOf(this),
    );
  }

  disconnectedCallback() {
    this.engine?.destroy();
  }
}

if (!customElements.get('nav-preview')) {
  customElements.define('nav-preview', NavPreview);
}
