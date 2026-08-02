import { CanvasEngine, type CanvasDraw } from './CanvasEngine';
import { POLICY_FRAGMENTS, clamp, hash } from './PolicyHeroShared';

interface PhraseParticle {
  alpha: number;
  cx: number;
  cy: number;
  depth: number;
  fragment: number;
  inGravity: boolean;
  phase: number;
  ready: boolean;
  scale: number;
  x: number;
  y: number;
}

const PARTICLES: PhraseParticle[] = Array.from({ length: 162 }, (_, index) => ({
  alpha: 0.12 + hash(index, 24) * 0.32,
  cx: 0,
  cy: 0,
  depth: 0.35 + hash(index, 25) * 0.65,
  fragment: (index * 11 + 3) % POLICY_FRAGMENTS.length,
  inGravity: false,
  phase: hash(index, 26) * Math.PI * 2,
  ready: false,
  scale: index % 31 === 0 ? 1.65 : 0.48 + hash(index, 27) * 0.62,
  x: 0.02 + hash(index, 28) * 0.96,
  y: 0.03 + hash(index, 29) * 0.94,
}));
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;

export class PolicyHeroPhraseGravity extends HTMLElement {
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
    this.pointer.targetX = 0.5;
    this.pointer.targetY = 0.5;
  };

  private draw: CanvasDraw = (context, width, height, elapsed) => {
    context.clearRect(0, 0, width, height);
    const time = reducedMotion ? 5.1 : elapsed + 1.4;
    const scale = Math.min(width / 920, height / 650);
    const follow = this.pointer.active ? 0.14 : 0.07;
    this.pointer.x += (this.pointer.targetX - this.pointer.x) * follow;
    this.pointer.y += (this.pointer.targetY - this.pointer.y) * follow;
    this.pointer.strength += ((this.pointer.active ? 1 : 0) - this.pointer.strength) * 0.085;
    this.dataset.gravity = this.pointer.strength.toFixed(3);
    const gravityX = this.pointer.x * width;
    const gravityY = this.pointer.y * height;
    // Hysteresis: a particle must cross the smaller enter radius to be captured,
    // but only releases past the larger exit radius, so boundary hover cannot flip-flop.
    const minDim = Math.min(width, height);
    const enterRadius = minDim * 0.24;
    const exitRadius = minDim * 0.34;
    const breath = 1 + Math.sin(time * 0.48) * 0.025;
    // Slow oscillating illumination wave that sweeps the field on a diagonal.
    const wavePos = 0.5 + Math.sin(time * 0.2) * 0.62;
    const bandWidth = 0.19;
    let maxStep = 0;

    PARTICLES.forEach((particle, index) => {
      const baseX = (particle.x - 0.5) * breath + 0.5;
      const baseY = (particle.y - 0.5) * breath + 0.5;
      const waveX =
        Math.sin(time * 0.55 + particle.y * 9 + particle.phase) * 13 * particle.depth * scale;
      const waveY =
        Math.cos(time * 0.68 + particle.x * 7 + particle.phase) * 8 * particle.depth * scale;
      let targetX = baseX * width + waveX;
      let targetY = baseY * height + waveY;

      const dx = gravityX - targetX;
      const dy = gravityY - targetY;
      const distance = Math.hypot(dx, dy);
      const releaseAt = particle.inGravity ? exitRadius : enterRadius;
      let hoverLit = 0;
      if (distance < releaseAt && this.pointer.strength > 0.01) {
        particle.inGravity = true;
        const pull = Math.pow(1 - Math.min(1, distance / exitRadius), 2) * this.pointer.strength;
        targetX += dx * pull * (0.2 + particle.depth * 0.16);
        targetY += dy * pull * (0.2 + particle.depth * 0.16);
        hoverLit = clamp(1 - distance / exitRadius) * this.pointer.strength * 0.6;
      } else {
        particle.inGravity = false;
      }

      const larger = index % 31 === 0;
      const fontSize = Math.max(
        5.7,
        (larger ? 9.4 : 6.2) * particle.scale * particle.depth * scale,
      );
      context.font = `${fontSize}px 'Geist Mono', monospace`;
      const phrase = POLICY_FRAGMENTS[particle.fragment];
      const textWidth = context.measureText(phrase).width;
      // Saturating clamp instead of a per-frame full-width flip; stable at the edge.
      const maxX = Math.max(4, width - textWidth - 4);
      targetX = Math.min(Math.max(targetX, 4), maxX);

      // Velocity damping: positions ease toward target, low-pass filtering any residual
      // threshold noise so a held pointer at a phrase boundary stays visually still.
      if (!particle.ready) {
        particle.cx = targetX;
        particle.cy = targetY;
        particle.ready = true;
      }
      const previousX = particle.cx;
      const previousY = particle.cy;
      particle.cx += (targetX - particle.cx) * 0.16;
      particle.cy += (targetY - particle.cy) * 0.16;
      const step = Math.hypot(particle.cx - previousX, particle.cy - previousY);
      if (step > maxStep) maxStep = step;

      // Illumination: a swept wave lights phrases as it passes; hover adds local light.
      const coordinate = particle.x * 0.72 + particle.y * 0.28;
      const band = Math.exp(-Math.pow((coordinate - wavePos) / bandWidth, 2));
      const headline = larger ? 0.16 + Math.sin(time * 0.34 + particle.phase) * 0.12 : 0;
      const lum = clamp(0.08 + band * 1.02 + hoverLit + headline);
      const depthFade = 0.62 + particle.depth * 0.38;

      if (larger) {
        const alpha = clamp(particle.alpha * 0.5 + lum * 0.72) * depthFade;
        context.fillStyle = `rgba(${Math.round(120 + (1 - lum) * 70)},235,${Math.round(150 + (1 - lum) * 40)},${alpha})`;
      } else {
        const alpha = clamp(0.1 + lum * 0.7) * depthFade * (0.5 + particle.alpha);
        const r = Math.round(150 + (1 - lum) * 94);
        const g = Math.round(234 + lum * 8);
        const b = Math.round(172 + (1 - lum) * 66);
        context.fillStyle = `rgba(${r},${g},${b},${alpha})`;
      }
      context.fillText(phrase, particle.cx, particle.cy);
    });

    this.dataset.maxStep = maxStep.toFixed(3);
  };
}

if (!customElements.get('policy-hero-phrase-gravity')) {
  customElements.define('policy-hero-phrase-gravity', PolicyHeroPhraseGravity);
}
