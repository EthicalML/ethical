import { CanvasEngine, type CanvasDraw } from './CanvasEngine';
import { POLICY_FRAGMENTS, clamp, hash } from './PolicyHeroShared';

interface LatticePoint {
  column: number;
  phase: number;
  row: number;
  seed: number;
}

const COLUMNS = 22;
const ROWS = 14;
const POINTS: LatticePoint[] = Array.from({ length: COLUMNS * ROWS }, (_, index) => ({
  column: index % COLUMNS,
  phase: hash(index, 31) * Math.PI * 2,
  row: Math.floor(index / COLUMNS),
  seed: hash(index, 32),
}));
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;

export class PolicyHeroJellyScroll extends HTMLElement {
  private controller = new AbortController();
  private currentVelocity = 0;
  private engine?: CanvasEngine;
  private lastScrollY = 0;
  private targetVelocity = 0;
  private wobble = 0;

  connectedCallback() {
    this.controller = new AbortController();
    this.lastScrollY = window.scrollY;
    window.addEventListener('scroll', this.handleScroll, {
      passive: true,
      signal: this.controller.signal,
    });
    const canvas = this.querySelector('canvas');
    if (canvas) this.engine = new CanvasEngine(canvas, this.draw);
  }

  disconnectedCallback() {
    this.controller.abort();
    this.engine?.destroy();
  }

  private handleScroll = () => {
    const delta = window.scrollY - this.lastScrollY;
    this.lastScrollY = window.scrollY;
    this.targetVelocity = clamp((this.targetVelocity + delta / 95 + 1) / 2) * 2 - 1;
  };

  private draw: CanvasDraw = (context, width, height, elapsed) => {
    context.clearRect(0, 0, width, height);
    const time = reducedMotion ? 4.6 : elapsed + 1.7;
    const scale = Math.min(width / 920, height / 650);
    this.currentVelocity += (this.targetVelocity - this.currentVelocity) * 0.13;
    this.targetVelocity *= 0.84;
    this.wobble += this.currentVelocity * 0.095;
    this.wobble *= 0.992;
    const deformation = Math.abs(this.currentVelocity);
    this.dataset.deformation = deformation.toFixed(3);

    const points = POINTS.map((point) => {
      const normalizedX = point.column / (COLUMNS - 1);
      const normalizedY = point.row / (ROWS - 1);
      const centeredY = normalizedY - 0.5;
      const baselineWave = Math.sin(normalizedX * 7 + time * 0.28 + point.phase * 0.16) * 5 * scale;
      const velocityWave =
        Math.sin(normalizedX * 9 + normalizedY * 4 + this.wobble + point.phase * 0.08) *
        deformation *
        24 *
        scale;
      const stretch = 1 + deformation * 0.18;
      const skew = this.currentVelocity * centeredY * 112 * scale;
      return {
        alpha: 0.1 + point.seed * 0.28 + deformation * 0.12,
        x: normalizedX * width + skew + velocityWave,
        y: (centeredY * stretch + 0.5) * height + baselineWave,
      };
    });

    context.lineWidth = 0.55;
    POINTS.forEach((point, index) => {
      const current = points[index];
      if (point.column < COLUMNS - 1) {
        const right = points[index + 1];
        context.beginPath();
        context.moveTo(current.x, current.y);
        context.lineTo(right.x, right.y);
        context.strokeStyle = `rgba(244,242,238,${0.022 + deformation * 0.028})`;
        context.stroke();
      }
      if (point.row < ROWS - 1) {
        const below = points[index + COLUMNS];
        context.beginPath();
        context.moveTo(current.x, current.y);
        context.lineTo(below.x, below.y);
        context.strokeStyle = `rgba(94,230,160,${0.018 + deformation * 0.032})`;
        context.stroke();
      }
    });

    POINTS.forEach((point, index) => {
      const projected = points[index];
      const featured = index % 37 === 0;
      const radius = (0.55 + point.seed * 1.1 + (featured ? 0.8 : 0)) * scale;
      context.beginPath();
      context.arc(projected.x, projected.y, radius, 0, Math.PI * 2);
      context.fillStyle = featured
        ? `rgba(94,230,160,${0.3 + projected.alpha * 0.6})`
        : `rgba(244,242,238,${projected.alpha})`;
      context.fill();

      if (index % 8 === 0) {
        const phrase = POLICY_FRAGMENTS[(index * 3 + point.row) % POLICY_FRAGMENTS.length];
        const larger = index % 40 === 0;
        context.font = `${Math.max(6.4, (larger ? 8.8 : 6.8) * scale)}px 'Geist Mono', monospace`;
        const textWidth = context.measureText(phrase).width;
        const x =
          projected.x + textWidth > width
            ? projected.x - textWidth - 5 * scale
            : projected.x + 5 * scale;
        context.fillStyle = larger
          ? `rgba(94,230,160,${0.15 + deformation * 0.08})`
          : `rgba(244,242,238,${0.045 + point.seed * 0.035})`;
        context.fillText(phrase, x, projected.y - 5 * scale);
      }
    });
  };
}

if (!customElements.get('policy-hero-jelly-scroll')) {
  customElements.define('policy-hero-jelly-scroll', PolicyHeroJellyScroll);
}
