import { CanvasEngine, type CanvasDraw } from './CanvasEngine';
import {
  ORGANISATIONS,
  POLICY_FRAGMENTS,
  clamp,
  createPhraseStars,
  createSphereDots,
  drawGlow,
  spherePoint,
} from './PolicyHeroShared';

const DOTS = createSphereDots(36, 62, 6);
const PHRASE_STARS = createPhraseStars(36, 60);
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;

const drawGovernedPlanet: CanvasDraw = (context, width, height, elapsed) => {
  context.clearRect(0, 0, width, height);
  const time = reducedMotion ? 6.2 : elapsed + 1.9;
  const scale = Math.min(width / 920, height / 650);
  const center = { x: width * 0.62, y: height * 0.61 };
  const radiusX = Math.min(width * 0.29, height * 0.4);
  const radiusY = radiusX * 0.95;
  const rotation = time * 0.028;
  const sweep = Math.sin(time * 0.13) * 0.64;

  PHRASE_STARS.forEach((star, index) => {
    const light = (Math.sin(time * star.speed + star.phase) + 1) * 0.5;
    if (light < 0.38) return;
    const phrase = POLICY_FRAGMENTS[star.fragment];
    context.font = `${Math.max(6.8, 7.2 * star.scale * scale)}px 'Geist Mono', monospace`;
    const textWidth = context.measureText(phrase).width;
    const x = star.x > 0.62 ? star.x * width - textWidth : star.x * width;
    context.fillStyle = `rgba(244,242,238,${Math.pow(light, 2) * star.alpha * 0.105})`;
    context.fillText(phrase, x, star.y * height);
    if (index % 7 === 0) {
      context.beginPath();
      context.arc(star.x * width, star.y * height - 6 * scale, light * scale, 0, Math.PI * 2);
      context.fillStyle = `rgba(94,230,160,${light * 0.18})`;
      context.fill();
    }
  });

  const moons = ORGANISATIONS.map((label, index) => {
    const radius = radiusX * (1.13 + index * 0.055);
    const angle = index * 0.88 + time * (0.035 - index * 0.0018) * (index % 2 ? -1 : 1);
    const depth = Math.sin(angle);
    return {
      angle,
      depth,
      index,
      label,
      orbitX: radius,
      orbitY: radiusY * (0.62 + (index % 3) * 0.055),
      x: center.x + Math.cos(angle) * radius,
      y: center.y + Math.sin(angle) * radiusY * (0.62 + (index % 3) * 0.055),
    };
  });

  const drawMoon = (moon: (typeof moons)[number], front: boolean) => {
    const depth = (moon.depth + 1) * 0.5;
    const alpha = front ? 0.4 + depth * 0.46 : 0.1 + depth * 0.12;
    const radius = (3.4 + moon.index * 0.48) * (0.72 + depth * 0.34) * scale;
    if (front) drawGlow(context, moon.x, moon.y, 18 * scale, 0.035 + depth * 0.035);
    context.beginPath();
    context.arc(moon.x, moon.y, radius, 0, Math.PI * 2);
    context.fillStyle = `rgba(94,230,160,${alpha})`;
    context.fill();
    context.beginPath();
    context.arc(moon.x, moon.y, radius + 4 * scale, 0, Math.PI * 2);
    context.strokeStyle = `rgba(244,242,238,${alpha * 0.26})`;
    context.lineWidth = 0.7;
    context.stroke();
    context.font = `${Math.max(7, 7.6 * scale)}px 'Geist Mono', monospace`;
    context.textAlign = 'center';
    context.fillStyle = `rgba(244,242,238,${alpha * 0.7})`;
    context.fillText(moon.label, moon.x, moon.y - radius - 8 * scale);
  };

  moons.forEach((moon) => {
    context.beginPath();
    context.ellipse(center.x, center.y, moon.orbitX, moon.orbitY, 0, 0, Math.PI * 2);
    context.setLineDash(moon.index % 2 ? [1, 10] : [2, 12]);
    context.lineDashOffset = time * (moon.index % 2 ? -0.5 : 0.42);
    context.strokeStyle = 'rgba(244,242,238,.035)';
    context.stroke();
    context.setLineDash([]);
  });
  moons.filter((moon) => moon.depth < 0).forEach((moon) => drawMoon(moon, false));

  const body = context.createRadialGradient(
    center.x - radiusX * 0.28,
    center.y - radiusY * 0.32,
    radiusX * 0.05,
    center.x,
    center.y,
    radiusX,
  );
  body.addColorStop(0, 'rgba(26,62,43,.2)');
  body.addColorStop(0.68, 'rgba(15,29,22,.4)');
  body.addColorStop(1, 'rgba(10,14,12,.88)');
  context.beginPath();
  context.ellipse(center.x, center.y, radiusX, radiusY, 0, 0, Math.PI * 2);
  context.fillStyle = body;
  context.fill();
  drawGlow(context, center.x, center.y, radiusX * 1.15, 0.028);

  DOTS.forEach((dot) => {
    const point = spherePoint(dot, rotation);
    if (point.z < -0.03) return;
    const depth = clamp((point.z + 0.03) / 1.06);
    const surfaceX = point.x * 0.68 - point.y * 0.44;
    const band = Math.exp(-Math.pow((surfaceX - sweep) / 0.23, 2));
    const light = clamp((-point.x * 0.5 + point.y * 0.66 + point.z * 0.2 + 0.3) / 1.45);
    const x = center.x + point.x * radiusX;
    const y = center.y - point.y * radiusY;
    context.beginPath();
    context.arc(x, y, (0.4 + depth * 0.58 + light * 0.38 + band * 0.5) * scale, 0, Math.PI * 2);
    context.fillStyle = `rgba(94,230,160,${0.025 + depth * 0.08 + light * 0.22 + band * 0.24})`;
    context.fill();
  });

  context.beginPath();
  context.ellipse(center.x, center.y, radiusX, radiusY, 0, 0, Math.PI * 2);
  context.strokeStyle = 'rgba(94,230,160,.14)';
  context.lineWidth = 0.9;
  context.stroke();
  context.font = `${Math.max(8, 8.5 * scale)}px 'Geist Mono', monospace`;
  context.textAlign = 'center';
  context.fillStyle = 'rgba(244,242,238,.3)';
  context.fillText('THE INSTITUTE', center.x, center.y + 3 * scale);

  moons.filter((moon) => moon.depth >= 0).forEach((moon) => drawMoon(moon, true));
  context.textAlign = 'left';
};

export class PolicyHeroGovernedPlanet extends HTMLElement {
  private engine?: CanvasEngine;

  connectedCallback() {
    const canvas = this.querySelector('canvas');
    if (canvas) this.engine = new CanvasEngine(canvas, drawGovernedPlanet);
  }

  disconnectedCallback() {
    this.engine?.destroy();
  }
}

if (!customElements.get('policy-hero-governed-planet')) {
  customElements.define('policy-hero-governed-planet', PolicyHeroGovernedPlanet);
}
