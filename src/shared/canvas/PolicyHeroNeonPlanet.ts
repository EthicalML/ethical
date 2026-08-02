import { CanvasEngine, type CanvasDraw } from './CanvasEngine';
import { POLICY_FRAGMENTS, hash } from './PolicyHeroShared';

const STARS = Array.from({ length: 88 }, (_, index) => ({
  alpha: 0.07 + hash(index, 40) * 0.3,
  depth: 0.3 + hash(index, 41) * 0.7,
  phase: hash(index, 42) * Math.PI * 2,
  x: hash(index, 43),
  y: hash(index, 44),
}));
const LABELS = Array.from({ length: 7 }, (_, index) => ({
  angle: -1.8 + index * 0.58,
  fragment: (index * 5 + 3) % POLICY_FRAGMENTS.length,
  phase: index * 1.31,
}));
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;

const drawNeonPlanet: CanvasDraw = (context, width, height, elapsed) => {
  context.clearRect(0, 0, width, height);
  const time = reducedMotion ? 5.8 : elapsed + 2;
  const scale = Math.min(width / 920, height / 650);
  const center = { x: width * 0.68, y: height * 0.54 };
  const radius = Math.min(height * 0.43, width * 0.31);

  STARS.forEach((star) => {
    const twinkle = 0.45 + (Math.sin(time * (0.18 + star.depth * 0.22) + star.phase) + 1) * 0.275;
    const r = (0.35 + star.depth * 1.05) * scale;
    context.beginPath();
    context.arc(star.x * width, star.y * height, r, 0, Math.PI * 2);
    context.fillStyle = `rgba(244,242,238,${star.alpha * twinkle})`;
    context.fill();
  });

  const atmosphere = context.createRadialGradient(
    center.x,
    center.y,
    radius * 0.84,
    center.x,
    center.y,
    radius * 1.24,
  );
  atmosphere.addColorStop(0, 'rgba(94,230,160,.02)');
  atmosphere.addColorStop(0.68, 'rgba(94,230,160,.075)');
  atmosphere.addColorStop(0.84, 'rgba(94,230,160,.025)');
  atmosphere.addColorStop(1, 'rgba(94,230,160,0)');
  context.fillStyle = atmosphere;
  context.beginPath();
  context.arc(center.x, center.y, radius * 1.24, 0, Math.PI * 2);
  context.fill();

  const surface = context.createRadialGradient(
    center.x - radius * 0.38,
    center.y - radius * 0.42,
    radius * 0.05,
    center.x + radius * 0.08,
    center.y + radius * 0.1,
    radius * 1.12,
  );
  surface.addColorStop(0, 'rgba(94,230,160,.19)');
  surface.addColorStop(0.32, 'rgba(52,126,87,.15)');
  surface.addColorStop(0.7, 'rgba(20,43,31,.16)');
  surface.addColorStop(1, 'rgba(10,16,13,.8)');
  context.beginPath();
  context.arc(center.x, center.y, radius, 0, Math.PI * 2);
  context.fillStyle = surface;
  context.fill();

  context.save();
  context.beginPath();
  context.arc(center.x, center.y, radius - 1, 0, Math.PI * 2);
  context.clip();
  for (let band = 0; band < 9; band += 1) {
    const progress = ((band / 9 + time * 0.012) % 1) * 2 - 1;
    const x = center.x + progress * radius;
    const visibleWidth = Math.sqrt(Math.max(0, 1 - progress * progress)) * radius;
    context.beginPath();
    context.ellipse(
      x,
      center.y,
      Math.max(4, visibleWidth * 0.18),
      radius * 0.96,
      0,
      0,
      Math.PI * 2,
    );
    context.strokeStyle = `rgba(94,230,160,${0.018 + (1 - Math.abs(progress)) * 0.025})`;
    context.lineWidth = 0.7;
    context.stroke();
  }
  for (let latitude = -2; latitude <= 2; latitude += 1) {
    const y = center.y + latitude * radius * 0.27 + Math.sin(time * 0.08 + latitude) * 3 * scale;
    context.beginPath();
    context.ellipse(center.x, y, radius * 0.92, radius * 0.12, 0.03, 0, Math.PI * 2);
    context.strokeStyle = 'rgba(244,242,238,.018)';
    context.stroke();
  }
  context.restore();

  const rim = context.createLinearGradient(
    center.x - radius,
    center.y - radius,
    center.x + radius,
    center.y + radius,
  );
  rim.addColorStop(0, 'rgba(166,255,207,.36)');
  rim.addColorStop(0.34, 'rgba(94,230,160,.17)');
  rim.addColorStop(0.72, 'rgba(94,230,160,.06)');
  rim.addColorStop(1, 'rgba(94,230,160,.2)');
  context.beginPath();
  context.arc(center.x, center.y, radius, 0, Math.PI * 2);
  context.strokeStyle = rim;
  context.lineWidth = 1.4 * scale;
  context.stroke();

  LABELS.forEach((label, index) => {
    const angle = label.angle + time * (0.008 + index * 0.0008);
    const cycle = (Math.sin(time * 0.32 + label.phase) + 1) * 0.5;
    if (cycle < 0.38) return;
    const x = center.x + Math.cos(angle) * radius * 1.12;
    const y = center.y + Math.sin(angle) * radius * 1.05;
    const phrase = POLICY_FRAGMENTS[label.fragment];
    context.beginPath();
    context.arc(x, y, (1.1 + cycle) * scale, 0, Math.PI * 2);
    context.fillStyle = `rgba(94,230,160,${cycle * 0.35})`;
    context.fill();
    context.font = `${Math.max(6.8, (7.2 + (index % 2)) * scale)}px 'Geist Mono', monospace`;
    const textWidth = context.measureText(phrase).width;
    const textX = Math.cos(angle) > 0 ? x + 8 * scale : x - textWidth - 8 * scale;
    context.fillStyle = `rgba(244,242,238,${cycle * 0.16})`;
    context.fillText(phrase, textX, y - 6 * scale);
  });
};

export class PolicyHeroNeonPlanet extends HTMLElement {
  private engine?: CanvasEngine;

  connectedCallback() {
    const canvas = this.querySelector('canvas');
    if (canvas) this.engine = new CanvasEngine(canvas, drawNeonPlanet);
  }

  disconnectedCallback() {
    this.engine?.destroy();
  }
}

if (!customElements.get('policy-hero-neon-planet')) {
  customElements.define('policy-hero-neon-planet', PolicyHeroNeonPlanet);
}
