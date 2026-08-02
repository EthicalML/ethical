import { CanvasEngine, type CanvasDraw } from './CanvasEngine';
import {
  clamp,
  hash,
  POLICY_FRAGMENTS,
  type SphereDot,
  smooth,
  spherePoint,
} from './PolicyHeroShared';

// A planet made of language: verbatim fragments are positioned on a full rotating displaced
// sphere. Near-side phrases are brighter and larger, far-side phrases dimmer and smaller, so
// depth reads as brightness and scale. Phrases render in the green accent by default (with the
// depth fade). The cursor is a gravity field: phrases within a generous radius are pulled toward
// it, gently enlarge and resolve to white, easing back on leave.
//
// Generalised from the policy-hero study: the phrase list is a property. `setPhrases(list)`
// reforms the sphere with a new set, crossfading (fade out ~200ms, swap, fade in ~200ms). With
// no explicit list the element defaults to POLICY_FRAGMENTS, so the policy hero page keeps its
// idle behaviour by passing the policy fragments (or nothing).

const ACCENT = '94,230,160';
const WHITE = '244,242,238';
const FONT_BASE = 15;
const SUPERSAMPLE = 2;
const GOLDEN = Math.PI * (3 - Math.sqrt(5));
const ANCHOR_COUNT = 78;
const FADE_SECONDS = 0.2;
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;

interface Anchor extends SphereDot {
  fragment: number;
  size: number;
}

interface Sprite {
  canvas: HTMLCanvasElement;
  h: number;
  w: number;
}

// Shorter fragments only, so each phrase stays a legible surface tag rather than a ribbon.
const shortlist = (phrases: string[]) => {
  const short = phrases.filter((fragment) => fragment.length <= 33);
  return short.length > 0 ? short : phrases;
};

// Even distribution over the sphere via a golden spiral, then displaced by a shared ridge.
const buildAnchors = (count: number): Anchor[] =>
  Array.from({ length: ANCHOR_COUNT }, (_, index) => {
    const y = 1 - (index / (ANCHOR_COUNT - 1)) * 2;
    const latitude = Math.asin(clamp((y + 1) / 2) * 2 - 1);
    const longitude = index * GOLDEN;
    const ridge =
      Math.sin(longitude * 3.1 + latitude * 4.7) * 0.03 +
      Math.cos(longitude * 1.7 + latitude * 8.2) * 0.014;
    return {
      elevation: ridge,
      fragment: index % Math.max(1, count),
      latitude,
      longitude,
      seed: hash(index, 41),
      size: 0.82 + hash(index, 42) * 0.4,
    };
  });

// Draws a sprite, optionally split into horizontal bands with an alternating x offset for a
// signal-interference glitch. slice = 0 takes the common single-draw path.
const drawPhrase = (
  context: CanvasRenderingContext2D,
  image: HTMLCanvasElement,
  dx: number,
  dy: number,
  w: number,
  h: number,
  slice: number,
) => {
  if (slice <= 0.01) {
    context.drawImage(image, dx, dy, w, h);
    return;
  }
  const bands = 3;
  const sh = image.height / bands;
  const dh = h / bands;
  for (let b = 0; b < bands; b += 1) {
    const offset = b === 1 ? slice : -slice * 0.5;
    context.drawImage(image, 0, sh * b, image.width, sh, dx + offset, dy + dh * b, w, dh);
  }
};

export class PhraseTerrain extends HTMLElement {
  private controller = new AbortController();
  private engine?: CanvasEngine;
  private canvas?: HTMLCanvasElement;
  private pointer = { active: false, strength: 0, targetX: 0.5, targetY: 0.5, x: 0.5, y: 0.5 };

  private short: string[] = shortlist(POLICY_FRAGMENTS);
  private anchors: Anchor[] = buildAnchors(this.short.length);
  private spriteCache = new Map<number, Sprite>();

  // Crossfade state between phrase sets.
  private pending?: string[];
  private phase: 'idle' | 'out' | 'in' = 'idle';
  private phaseT = 0;
  private lastElapsed = 0;

  connectedCallback() {
    this.controller = new AbortController();
    const canvas = this.querySelector('canvas');
    if (!canvas) return;
    this.canvas = canvas;
    // Track on window: the canvas may sit behind copy that would otherwise swallow pointer moves.
    window.addEventListener('pointermove', this.handlePointer, { signal: this.controller.signal });
    window.addEventListener('blur', this.handlePointerLeave, { signal: this.controller.signal });
    // Rebuild sprites once the mono webfont resolves so they are not stuck on a fallback.
    document.fonts?.ready.then(() => this.spriteCache.clear());
    this.engine = new CanvasEngine(canvas, this.draw);
  }

  disconnectedCallback() {
    this.controller.abort();
    this.engine?.destroy();
  }

  // Reform the sphere with a new phrase set. Empty or missing lists fall back to the default set.
  setPhrases(phrases: string[]) {
    const next = shortlist(phrases && phrases.length > 0 ? phrases : POLICY_FRAGMENTS);
    if (reducedMotion) {
      this.applyPhrases(next);
      this.phase = 'idle';
      this.engine?.redraw();
      return;
    }
    this.pending = next;
    this.phase = 'out';
    this.phaseT = 0;
    this.engine?.setPlaying(true);
  }

  private applyPhrases(next: string[]) {
    this.short = next;
    this.anchors = buildAnchors(this.short.length);
    this.spriteCache.clear();
  }

  private sprite(fragmentIndex: number, hot: boolean): Sprite {
    const key = fragmentIndex * 2 + (hot ? 1 : 0);
    const cached = this.spriteCache.get(key);
    if (cached) return cached;
    const text = this.short[fragmentIndex] ?? '';
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
    context.fillStyle = `rgb(${hot ? WHITE : ACCENT})`;
    context.fillText(text, width / 2, height / 2);
    const built = { canvas, w: width / SUPERSAMPLE, h: height / SUPERSAMPLE };
    this.spriteCache.set(key, built);
    return built;
  }

  private handlePointer = (event: PointerEvent) => {
    if (event.pointerType === 'touch' || !this.canvas) return;
    const bounds = this.canvas.getBoundingClientRect();
    const nx = (event.clientX - bounds.left) / bounds.width;
    const ny = (event.clientY - bounds.top) / bounds.height;
    this.pointer.active = nx >= 0 && nx <= 1 && ny >= 0 && ny <= 1;
    if (this.pointer.active) {
      this.pointer.targetX = nx;
      this.pointer.targetY = ny;
    }
  };

  private handlePointerLeave = () => {
    this.pointer.active = false;
  };

  // Advance the crossfade envelope; returns the alpha multiplier for this frame.
  private advanceFade(elapsed: number): number {
    const dt = Math.max(0, Math.min(0.05, elapsed - this.lastElapsed));
    this.lastElapsed = elapsed;
    if (this.phase === 'idle') return 1;
    this.phaseT += dt;
    if (this.phase === 'out') {
      if (this.phaseT >= FADE_SECONDS) {
        if (this.pending) this.applyPhrases(this.pending);
        this.pending = undefined;
        this.phase = 'in';
        this.phaseT = 0;
        return 0;
      }
      return clamp(1 - this.phaseT / FADE_SECONDS);
    }
    // phase === 'in'
    if (this.phaseT >= FADE_SECONDS) {
      this.phase = 'idle';
      return 1;
    }
    return clamp(this.phaseT / FADE_SECONDS);
  }

  private draw: CanvasDraw = (context, width, height, elapsed) => {
    context.clearRect(0, 0, width, height);
    const fade = this.advanceFade(elapsed);
    const time = reducedMotion ? 6.4 : elapsed + 2.2;
    const scale = Math.min(width / 920, height / 650);
    const center = { x: width * 0.49, y: height * 0.48 };
    const radiusX = Math.min(width * 0.35, height * 0.53);
    const radiusY = Math.min(height * 0.53, width * 0.37);
    const rotation = time * 0.05;
    const sweep = Math.sin(time * 0.26) * 0.82;

    this.pointer.x += (this.pointer.targetX - this.pointer.x) * 0.12;
    this.pointer.y += (this.pointer.targetY - this.pointer.y) * 0.12;
    this.pointer.strength += ((this.pointer.active ? 1 : 0) - this.pointer.strength) * 0.09;
    const strength = this.pointer.strength;
    const cursorX = this.pointer.x * width;
    const cursorY = this.pointer.y * height;
    const hoverRadius = Math.min(width, height) * 0.4;

    const bodyGlow = context.createRadialGradient(
      center.x - radiusX * 0.2,
      center.y - radiusY * 0.3,
      radiusX * 0.05,
      center.x,
      center.y,
      radiusX * 1.1,
    );
    bodyGlow.addColorStop(0, `rgba(94,230,160,${0.07 * fade})`);
    bodyGlow.addColorStop(0.6, `rgba(94,230,160,${0.026 * fade})`);
    bodyGlow.addColorStop(1, 'rgba(94,230,160,0)');
    context.fillStyle = bodyGlow;
    context.fillRect(0, 0, width, height);

    const ordered = this.anchors
      .map((anchor) => {
        const point = spherePoint(anchor, rotation);
        return { anchor, point, x: center.x + point.x * radiusX, y: center.y - point.y * radiusY };
      })
      .sort((a, b) => a.point.z - b.point.z);

    ordered.forEach(({ anchor, point, x: baseX, y: baseY }) => {
      if (point.z < -0.55) return;
      const depthN = clamp((point.z + 1) / 2);
      const depthFade = smooth(clamp((point.z + 0.55) / 0.4));
      const surfaceX = point.x * 0.72 - point.y * 0.44;
      const band = Math.exp(-Math.pow((surfaceX - sweep) / 0.22, 2));
      const directional = clamp((-point.x * 0.5 + point.y * 0.68 + 0.46) / 1.42);
      let x = baseX;
      let y = baseY;

      let alpha = clamp(0.05 + depthN * 0.34 + directional * 0.24 + band * 0.42) * depthFade;
      let k = scale * anchor.size * (0.42 + depthN * 0.62);

      let heat = 0;
      if (strength > 0.01) {
        const dx = cursorX - x;
        const dy = cursorY - y;
        const distance = Math.hypot(dx, dy);
        if (distance < hoverRadius) {
          heat = clamp(smooth(1 - distance / hoverRadius) * strength);
          const pull = heat * 0.26;
          x += dx * pull;
          y += dy * pull;
          alpha = clamp(alpha + heat * 0.8);
          k += heat * 0.28 * scale * anchor.size;
          y -= heat * 3 * scale;
        }
      }
      alpha *= fade;
      if (alpha < 0.02) return;

      const base = this.sprite(anchor.fragment, false);
      const drawW = base.w * k;
      const drawH = base.h * k;
      const drawX = Math.min(Math.max(x - drawW / 2, 2), width - drawW - 2);
      const drawY = y - drawH / 2;

      context.globalAlpha = alpha;
      drawPhrase(context, base.canvas, drawX, drawY, drawW, drawH, 0);
      if (heat > 0.01) {
        context.globalAlpha = alpha * smooth(clamp(heat));
        drawPhrase(
          context,
          this.sprite(anchor.fragment, true).canvas,
          drawX,
          drawY,
          drawW,
          drawH,
          0,
        );
      }
    });
    context.globalAlpha = 1;
  };
}

if (!customElements.get('phrase-terrain')) {
  customElements.define('phrase-terrain', PhraseTerrain);
}
