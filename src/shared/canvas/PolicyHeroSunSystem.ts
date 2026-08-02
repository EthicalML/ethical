import { CanvasEngine, type CanvasDraw } from './CanvasEngine';
import {
  ORGANISATIONS,
  POLICY_FRAGMENTS,
  createPhraseStars,
  drawGlow,
  hash,
} from './PolicyHeroShared';

const PHRASE_STARS = createPhraseStars(42, 70);
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;

const drawSunSystem: CanvasDraw = (context, width, height, elapsed) => {
  context.clearRect(0, 0, width, height);
  const time = reducedMotion ? 5.5 : elapsed + 1.6;
  const scale = Math.min(width / 920, height / 650);
  const center = { x: width * 0.57, y: height * 0.5 };

  PHRASE_STARS.forEach((star, index) => {
    const cycle = (Math.sin(time * star.speed + star.phase) + 1) * 0.5;
    if (cycle < 0.34) return;
    const alpha = Math.pow(cycle, 2) * star.alpha * 0.13;
    const fontSize = Math.max(6.8, 7.3 * star.scale * scale);
    context.font = `${fontSize}px 'Geist Mono', monospace`;
    context.fillStyle = `rgba(244,242,238,${alpha})`;
    const phrase = POLICY_FRAGMENTS[star.fragment];
    const textWidth = context.measureText(phrase).width;
    const x = star.x > 0.62 ? star.x * width - textWidth : star.x * width;
    context.fillText(phrase, x, star.y * height);
    if (index % 6 === 0) {
      context.beginPath();
      context.arc(
        star.x * width,
        star.y * height - 6 * scale,
        (0.5 + cycle) * scale,
        0,
        Math.PI * 2,
      );
      context.fillStyle = `rgba(94,230,160,${alpha * 1.8})`;
      context.fill();
    }
  });

  ORGANISATIONS.forEach((label, index) => {
    const radiusX = (78 + index * 30) * scale;
    const radiusY = radiusX * (0.46 + (index % 3) * 0.055);
    const speed = (0.058 - index * 0.004) * (index % 2 ? -1 : 1);
    const angle = index * 0.89 + time * speed;
    const depth = (Math.sin(angle) + 1) * 0.5;
    const x = center.x + Math.cos(angle) * radiusX;
    const y = center.y + Math.sin(angle) * radiusY;
    const planetScale = 0.7 + depth * 0.42;
    const planetRadius = (2.8 + index * 0.42) * planetScale * scale;

    context.beginPath();
    context.ellipse(center.x, center.y, radiusX, radiusY, 0, 0, Math.PI * 2);
    context.setLineDash(index % 2 ? [1, 9] : [2, 11]);
    context.lineDashOffset = time * (index % 2 ? -0.7 : 0.55);
    context.strokeStyle = `rgba(244,242,238,${0.025 + depth * 0.025})`;
    context.lineWidth = 0.65;
    context.stroke();
    context.setLineDash([]);

    context.beginPath();
    context.arc(x, y, planetRadius + 7 * scale, 0, Math.PI * 2);
    context.fillStyle = `rgba(94,230,160,${0.025 + depth * 0.04})`;
    context.fill();
    context.beginPath();
    context.arc(x, y, planetRadius, 0, Math.PI * 2);
    context.fillStyle = `rgba(94,230,160,${0.34 + depth * 0.46})`;
    context.fill();
    context.beginPath();
    context.arc(x, y, planetRadius + (index % 3 === 0 ? 5 : 3) * scale, 0, Math.PI * 2);
    context.strokeStyle = `rgba(244,242,238,${0.08 + depth * 0.13})`;
    context.lineWidth = 0.7;
    context.stroke();
    context.font = `${Math.max(7, (7.5 + depth) * scale)}px 'Geist Mono', monospace`;
    context.textAlign = 'center';
    context.fillStyle = `rgba(244,242,238,${0.28 + depth * 0.32})`;
    context.fillText(label, x, y - planetRadius - 9 * scale);
  });

  drawGlow(context, center.x, center.y, 150 * scale, 0.075);
  drawGlow(context, center.x, center.y, 72 * scale, 0.18);
  for (let corona = 0; corona < 3; corona += 1) {
    const radius = (32 + corona * 9 + Math.sin(time * 0.48 + corona * 2) * 2.5) * scale;
    context.beginPath();
    const start = time * (corona % 2 ? -0.04 : 0.055) + corona * 1.7;
    context.arc(center.x, center.y, radius, start, start + Math.PI * (1.15 + corona * 0.12));
    context.strokeStyle = `rgba(94,230,160,${0.16 - corona * 0.035})`;
    context.lineWidth = (1.2 - corona * 0.18) * scale;
    context.stroke();
  }
  for (let ray = 0; ray < 18; ray += 1) {
    const angle = (ray * Math.PI) / 9 + time * 0.018;
    const pulse = 0.55 + hash(ray, 77) * 0.75 + Math.sin(time * 0.7 + ray) * 0.12;
    context.beginPath();
    context.moveTo(
      center.x + Math.cos(angle) * 20 * scale,
      center.y + Math.sin(angle) * 20 * scale,
    );
    context.lineTo(
      center.x + Math.cos(angle) * (25 + pulse * 8) * scale,
      center.y + Math.sin(angle) * (25 + pulse * 8) * scale,
    );
    context.strokeStyle = `rgba(94,230,160,${0.07 + pulse * 0.035})`;
    context.lineWidth = 0.7;
    context.stroke();
  }

  const core = context.createRadialGradient(
    center.x - 5 * scale,
    center.y - 6 * scale,
    1,
    center.x,
    center.y,
    23 * scale,
  );
  core.addColorStop(0, 'rgba(244,242,238,.88)');
  core.addColorStop(0.18, 'rgba(166,255,207,.78)');
  core.addColorStop(0.55, 'rgba(94,230,160,.54)');
  core.addColorStop(1, 'rgba(94,230,160,.08)');
  context.beginPath();
  context.arc(center.x, center.y, 23 * scale, 0, Math.PI * 2);
  context.fillStyle = core;
  context.fill();
  context.beginPath();
  context.arc(center.x, center.y, 5.5 * scale, 0, Math.PI * 2);
  context.fillStyle = 'rgba(244,242,238,.9)';
  context.fill();
  context.textAlign = 'left';
};

export class PolicyHeroSunSystem extends HTMLElement {
  private engine?: CanvasEngine;

  connectedCallback() {
    const canvas = this.querySelector('canvas');
    if (canvas) this.engine = new CanvasEngine(canvas, drawSunSystem);
  }

  disconnectedCallback() {
    this.engine?.destroy();
  }
}

if (!customElements.get('policy-hero-sun-system')) {
  customElements.define('policy-hero-sun-system', PolicyHeroSunSystem);
}
