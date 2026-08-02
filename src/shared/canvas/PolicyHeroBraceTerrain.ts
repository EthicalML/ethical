import { CanvasEngine, type CanvasDraw } from './CanvasEngine';
import { clamp, createSphereDots, drawGlow, smooth, spherePoint } from './PolicyHeroShared';

const DOTS = createSphereDots(48, 88, 8);
// Brace-weighted glyph set: braces dominate, a low ratio of brackets and parens.
const GLYPHS = ['{', '}', '{', '}', '{', '}', '[', ']', '(', ')'];
const SIZE_TIERS = [10.5, 14, 19];
const ACCENT = '94,230,160';
const SUPERSAMPLE = 2;
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;

interface Glyph {
  canvas: HTMLCanvasElement;
  h: number;
  w: number;
}

const spriteCache = new Map<string, Glyph>();

const sprite = (glyph: string, fontPx: number): Glyph => {
  const key = `${glyph}:${fontPx}`;
  const cached = spriteCache.get(key);
  if (cached) return cached;
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d')!;
  const pixel = fontPx * SUPERSAMPLE;
  context.font = `${pixel}px 'Geist Mono', monospace`;
  const width = Math.ceil(context.measureText(glyph).width) + 4 * SUPERSAMPLE;
  const height = Math.ceil(pixel * 1.4) + 4 * SUPERSAMPLE;
  canvas.width = width;
  canvas.height = height;
  context.font = `${pixel}px 'Geist Mono', monospace`;
  context.textAlign = 'center';
  context.textBaseline = 'middle';
  context.fillStyle = `rgb(${ACCENT})`;
  context.fillText(glyph, width / 2, height / 2);
  const built = { canvas, w: width / SUPERSAMPLE, h: height / SUPERSAMPLE };
  spriteCache.set(key, built);
  return built;
};

export class PolicyHeroBraceTerrain extends HTMLElement {
  private controller = new AbortController();
  private engine?: CanvasEngine;
  private pointer = { active: false, strength: 0, targetX: 0.5, targetY: 0.5, x: 0.5, y: 0.5 };

  connectedCallback() {
    this.controller = new AbortController();
    const canvas = this.querySelector('canvas');
    if (!canvas) return;
    canvas.addEventListener('pointerenter', this.handlePointer, { signal: this.controller.signal });
    canvas.addEventListener('pointermove', this.handlePointer, { signal: this.controller.signal });
    canvas.addEventListener('pointerleave', this.handlePointerLeave, {
      signal: this.controller.signal,
    });
    // Rebuild sprites once the mono webfont resolves so glyphs are not stuck on a fallback.
    document.fonts?.ready.then(() => spriteCache.clear());
    this.engine = new CanvasEngine(canvas, this.draw);
  }

  disconnectedCallback() {
    this.controller.abort();
    this.engine?.destroy();
  }

  private handlePointer = (event: PointerEvent) => {
    if (event.pointerType === 'touch') return;
    const canvas = event.currentTarget as HTMLCanvasElement;
    const bounds = canvas.getBoundingClientRect();
    this.pointer.active = true;
    this.pointer.targetX = (event.clientX - bounds.left) / bounds.width;
    this.pointer.targetY = (event.clientY - bounds.top) / bounds.height;
  };

  private handlePointerLeave = () => {
    this.pointer.active = false;
  };

  private draw: CanvasDraw = (context, width, height, elapsed) => {
    context.clearRect(0, 0, width, height);
    const time = reducedMotion ? 6.4 : elapsed + 2.2;
    const scale = Math.min(width / 920, height / 650);
    const center = { x: width * 0.6, y: height * 1.055 };
    const radiusX = Math.min(width * 0.52, height * 0.76);
    const radiusY = Math.min(height * 0.75, width * 0.54);
    const rotation = time * 0.044;
    const sweep = Math.sin(time * 0.26) * 0.82;

    this.pointer.x += (this.pointer.targetX - this.pointer.x) * 0.12;
    this.pointer.y += (this.pointer.targetY - this.pointer.y) * 0.12;
    this.pointer.strength += ((this.pointer.active ? 1 : 0) - this.pointer.strength) * 0.09;
    const strength = this.pointer.strength;
    const cursorX = this.pointer.x * width;
    const cursorY = this.pointer.y * height;
    const hoverRadius = Math.min(width, height) * 0.26;

    const planetGlow = context.createRadialGradient(
      center.x - radiusX * 0.22,
      center.y - radiusY * 0.5,
      radiusX * 0.06,
      center.x,
      center.y,
      radiusX * 1.06,
    );
    planetGlow.addColorStop(0, 'rgba(94,230,160,.06)');
    planetGlow.addColorStop(0.55, 'rgba(94,230,160,.022)');
    planetGlow.addColorStop(1, 'rgba(94,230,160,0)');
    context.fillStyle = planetGlow;
    context.fillRect(0, height * 0.12, width, height * 0.88);

    DOTS.forEach((dot, index) => {
      const point = spherePoint(dot, rotation);
      if (point.z < -0.32) return;
      const fade = smooth(clamp((point.z + 0.32) / 0.4));
      const depth = clamp((point.z + 0.32) / 1.34);
      const surfaceX = point.x * 0.72 - point.y * 0.44;
      const band = Math.exp(-Math.pow((surfaceX - sweep) / 0.17, 2));
      const directional = clamp((-point.x * 0.5 + point.y * 0.68 + 0.46) / 1.42);
      const x = center.x + point.x * radiusX;
      let y = center.y - point.y * radiusY;
      let alpha = clamp(0.05 + depth * 0.12 + directional * 0.24 + band * 0.66) * fade;

      if (strength > 0.01) {
        const distance = Math.hypot(cursorX - x, cursorY - y);
        if (distance < hoverRadius) {
          const local = Math.pow(1 - distance / hoverRadius, 2) * strength;
          alpha = clamp(alpha + local * 0.5);
          y -= local * 3.4 * scale;
        }
      }
      if (alpha < 0.03) return;

      const tier = SIZE_TIERS[Math.floor(dot.seed * 2.999) % SIZE_TIERS.length];
      const fontPx = Math.max(8, Math.round(tier * scale * (0.86 + depth * 0.3)));
      const glyph = GLYPHS[index % GLYPHS.length];
      const image = sprite(glyph, fontPx);
      context.globalAlpha = alpha;
      context.drawImage(image.canvas, x - image.w / 2, y - image.h / 2, image.w, image.h);
    });
    context.globalAlpha = 1;

    if (strength > 0.02) {
      drawGlow(context, cursorX, cursorY, hoverRadius * 0.62, strength * 0.05);
    }
  };
}

if (!customElements.get('policy-hero-brace-terrain')) {
  customElements.define('policy-hero-brace-terrain', PolicyHeroBraceTerrain);
}
