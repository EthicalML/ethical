import { CanvasEngine, type CanvasDraw } from './CanvasEngine';
import { POLICY_FRAGMENTS, hash } from './PolicyHeroShared';

interface PhraseParticle {
  alpha: number;
  depth: number;
  fragment: number;
  phase: number;
  scale: number;
  x: number;
  y: number;
}

const PARTICLES: PhraseParticle[] = Array.from({ length: 162 }, (_, index) => ({
  alpha: 0.12 + hash(index, 24) * 0.32,
  depth: 0.35 + hash(index, 25) * 0.65,
  fragment: (index * 11 + 3) % POLICY_FRAGMENTS.length,
  phase: hash(index, 26) * Math.PI * 2,
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
    const gravityRadius = Math.min(width, height) * 0.29;
    const breath = 1 + Math.sin(time * 0.48) * 0.025;

    PARTICLES.forEach((particle, index) => {
      const baseX = (particle.x - 0.5) * breath + 0.5;
      const baseY = (particle.y - 0.5) * breath + 0.5;
      const waveX =
        Math.sin(time * 0.55 + particle.y * 9 + particle.phase) * 13 * particle.depth * scale;
      const waveY =
        Math.cos(time * 0.68 + particle.x * 7 + particle.phase) * 8 * particle.depth * scale;
      let x = baseX * width + waveX;
      let y = baseY * height + waveY;
      const dx = gravityX - x;
      const dy = gravityY - y;
      const distance = Math.hypot(dx, dy);
      if (distance < gravityRadius && this.pointer.strength > 0.001) {
        const pull = Math.pow(1 - distance / gravityRadius, 2) * this.pointer.strength;
        x += dx * pull * (0.2 + particle.depth * 0.16);
        y += dy * pull * (0.2 + particle.depth * 0.16);
      }

      const larger = index % 31 === 0;
      const focus = larger ? 0.72 + Math.sin(time * 0.34 + particle.phase) * 0.2 : 1;
      const fontSize = Math.max(
        5.7,
        (larger ? 9.4 : 6.2) * particle.scale * particle.depth * scale,
      );
      context.font = `${fontSize}px 'Geist Mono', monospace`;
      const phrase = POLICY_FRAGMENTS[particle.fragment];
      const textWidth = context.measureText(phrase).width;
      if (x + textWidth > width) x -= textWidth;
      context.fillStyle = larger
        ? `rgba(94,230,160,${particle.alpha * focus * 0.68})`
        : `rgba(244,242,238,${particle.alpha * particle.depth * 0.24})`;
      context.fillText(phrase, x, y);
    });
  };
}

if (!customElements.get('policy-hero-phrase-gravity')) {
  customElements.define('policy-hero-phrase-gravity', PolicyHeroPhraseGravity);
}
