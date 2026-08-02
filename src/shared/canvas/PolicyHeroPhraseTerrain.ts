import { CanvasEngine, type CanvasDraw } from './CanvasEngine';
import {
  clamp,
  hash,
  POLICY_FRAGMENTS,
  type SphereDot,
  smooth,
  spherePoint,
} from './PolicyHeroShared';

// A planet made of language: verbatim fragments are positioned on the rotating displaced
// sphere surface. Near-side phrases are brighter and larger, far-side phrases dimmer and
// smaller, so depth reads as brightness and scale. The hemisphere is anchored low in the
// section so it rises from the hero's lower edge. Phrases render in warm off-white by default
// and cross-fade to the green accent, enlarging to readable, as the cursor passes over them.

// Shorter fragments only, so each phrase stays a legible surface tag rather than a ribbon.
const SHORT = POLICY_FRAGMENTS.filter((fragment) => fragment.length <= 33);
const ACCENT = '94,230,160';
const WHITE = '244,242,238';
const FONT_BASE = 15;
const SUPERSAMPLE = 2;
const GOLDEN = Math.PI * (3 - Math.sqrt(5));
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;

interface Anchor extends SphereDot {
  fragment: number;
  size: number;
}

// Even distribution over the sphere via a golden spiral, then displaced by the shared ridge.
const ANCHORS: Anchor[] = Array.from({ length: 78 }, (_, index) => {
  const y = 1 - (index / 77) * 2;
  const latitude = Math.asin(clamp((y + 1) / 2) * 2 - 1);
  const longitude = index * GOLDEN;
  const ridge =
    Math.sin(longitude * 3.1 + latitude * 4.7) * 0.03 +
    Math.cos(longitude * 1.7 + latitude * 8.2) * 0.014;
  return {
    elevation: ridge,
    fragment: index % SHORT.length,
    latitude,
    longitude,
    seed: hash(index, 41),
    size: 0.82 + hash(index, 42) * 0.4,
  };
});

interface Sprite {
  canvas: HTMLCanvasElement;
  h: number;
  w: number;
}

// Two colour variants per fragment share identical metrics; the key packs the hover flag.
const spriteCache = new Map<number, Sprite>();

const sprite = (fragmentIndex: number, hot: boolean): Sprite => {
  const key = fragmentIndex * 2 + (hot ? 1 : 0);
  const cached = spriteCache.get(key);
  if (cached) return cached;
  const text = SHORT[fragmentIndex];
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d')!;
  const pixel = FONT_BASE * SUPERSAMPLE;
  context.font = `${pixel}px 'Geist Mono', monospace`;
  const width = Math.ceil(context.measureText(text).width) + 6 * SUPERSAMPLE;
  const height = Math.ceil(pixel * 1.4);
  canvas.width = width;
  canvas.height = height;
  context.font = `${pixel}px 'Geist Mono', monospace`;
  context.textAlign = 'center';
  context.textBaseline = 'middle';
  context.fillStyle = `rgb(${hot ? ACCENT : WHITE})`;
  context.fillText(text, width / 2, height / 2);
  const built = { canvas, w: width / SUPERSAMPLE, h: height / SUPERSAMPLE };
  spriteCache.set(key, built);
  return built;
};

export class PolicyHeroPhraseTerrain extends HTMLElement {
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
    // Rebuild sprites once the mono webfont resolves so they are not stuck on a fallback.
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
    // Anchored low so only the upper hemisphere emerges from the section's lower edge.
    const center = { x: width * 0.5, y: height * 0.92 };
    const radiusX = Math.min(width * 0.4, height * 0.62);
    const radiusY = Math.min(height * 0.62, width * 0.42);
    const rotation = time * 0.05;
    const sweep = Math.sin(time * 0.26) * 0.82;

    this.pointer.x += (this.pointer.targetX - this.pointer.x) * 0.12;
    this.pointer.y += (this.pointer.targetY - this.pointer.y) * 0.12;
    this.pointer.strength += ((this.pointer.active ? 1 : 0) - this.pointer.strength) * 0.09;
    const strength = this.pointer.strength;
    const cursorX = this.pointer.x * width;
    const cursorY = this.pointer.y * height;
    const hoverRadius = Math.min(width, height) * 0.26;

    // Quiet body glow so the sphere reads as a mass even between phrases.
    const bodyGlow = context.createRadialGradient(
      center.x - radiusX * 0.2,
      center.y - radiusY * 0.3,
      radiusX * 0.05,
      center.x,
      center.y,
      radiusX * 1.1,
    );
    bodyGlow.addColorStop(0, 'rgba(94,230,160,.07)');
    bodyGlow.addColorStop(0.6, 'rgba(94,230,160,.026)');
    bodyGlow.addColorStop(1, 'rgba(94,230,160,0)');
    context.fillStyle = bodyGlow;
    context.fillRect(0, 0, width, height);

    // Painter's order: far side first so near-side phrases sit on top.
    const ordered = ANCHORS.map((anchor) => ({
      anchor,
      point: spherePoint(anchor, rotation),
    })).sort((a, b) => a.point.z - b.point.z);

    ordered.forEach(({ anchor, point }) => {
      if (point.z < -0.55) return;
      const depthN = clamp((point.z + 1) / 2);
      const fade = smooth(clamp((point.z + 0.55) / 0.4));
      const surfaceX = point.x * 0.72 - point.y * 0.44;
      const band = Math.exp(-Math.pow((surfaceX - sweep) / 0.22, 2));
      const directional = clamp((-point.x * 0.5 + point.y * 0.68 + 0.46) / 1.42);
      const x = center.x + point.x * radiusX;
      let y = center.y - point.y * radiusY;

      let alpha = clamp(0.05 + depthN * 0.34 + directional * 0.24 + band * 0.42) * fade;
      let k = scale * anchor.size * (0.42 + depthN * 0.62);

      // Local hover heat: phrases near the cursor brighten, enlarge and lift toward the viewer.
      let heat = 0;
      if (strength > 0.01) {
        const distance = Math.hypot(cursorX - x, cursorY - y);
        if (distance < hoverRadius) {
          heat = clamp(Math.pow(1 - distance / hoverRadius, 2) * strength);
          alpha = clamp(alpha + heat * 0.8);
          k += heat * 0.5 * scale * anchor.size;
          y -= heat * 3 * scale;
        }
      }
      if (alpha < 0.02) return;

      // Metrics are colour-independent, so size from the white base and overlay green on heat.
      const base = sprite(anchor.fragment, false);
      const drawW = base.w * k;
      const drawH = base.h * k;
      // Keep the sprite fully inside the canvas so no phrase is cut off at the frame edge.
      const drawX = Math.min(Math.max(x - drawW / 2, 2), width - drawW - 2);
      const drawY = y - drawH / 2;
      context.globalAlpha = alpha;
      context.drawImage(base.canvas, drawX, drawY, drawW, drawH);
      if (heat > 0.01) {
        context.globalAlpha = alpha * smooth(clamp(heat));
        context.drawImage(sprite(anchor.fragment, true).canvas, drawX, drawY, drawW, drawH);
      }
    });
    context.globalAlpha = 1;
  };
}

if (!customElements.get('policy-hero-phrase-terrain')) {
  customElements.define('policy-hero-phrase-terrain', PolicyHeroPhraseTerrain);
}
