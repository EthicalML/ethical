import { CanvasEngine, type CanvasDraw } from './CanvasEngine';
import {
  ORGANISATIONS,
  POLICY_FRAGMENTS,
  createPhraseStars,
  drawGlow,
  ease,
} from './PolicyHeroShared';

const PHRASE_STARS = createPhraseStars(58, 11);
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;

const drawInstituteSystem: CanvasDraw = (context, width, height, elapsed) => {
  context.clearRect(0, 0, width, height);
  const time = reducedMotion ? 4.8 : elapsed + 2.4;
  const scale = Math.min(width / 920, height / 650);
  const center = { x: width * 0.58, y: height * 0.51 };

  PHRASE_STARS.forEach((star, index) => {
    const light = (Math.sin(time * star.speed + star.phase) + 1) * 0.5;
    if (light < 0.2) return;
    const phrase = POLICY_FRAGMENTS[star.fragment];
    const larger = index % 11 === 0;
    const fontSize = Math.max(6.7, (larger ? 9.1 : 7.1) * star.scale * scale);
    context.font = `${fontSize}px 'Geist Mono', monospace`;
    const textWidth = context.measureText(phrase).width;
    const x = star.x > 0.6 ? star.x * width - textWidth : star.x * width;
    context.fillStyle = `rgba(244,242,238,${Math.pow(light, 2.4) * star.alpha * (larger ? 0.2 : 0.1)})`;
    context.fillText(phrase, x, star.y * height);
    if (index % 4 === 0) {
      context.beginPath();
      context.arc(
        star.x * width,
        star.y * height - 6 * scale,
        (0.45 + light * 0.8) * scale,
        0,
        Math.PI * 2,
      );
      context.fillStyle = `rgba(94,230,160,${light * star.alpha * 0.22})`;
      context.fill();
    }
  });

  const orbiters = ORGANISATIONS.map((label, index) => {
    const radiusX = (72 + index * 34) * scale;
    const radiusY = radiusX * (0.4 + (index % 3) * 0.075);
    const speed = (0.052 - index * 0.0035) * (index % 2 ? -1 : 1);
    const angle = index * 0.91 + time * speed;
    const depth = (Math.sin(angle) + 1) * 0.5;
    return {
      angle,
      depth,
      index,
      label,
      radiusX,
      radiusY,
      x: center.x + Math.cos(angle) * radiusX,
      y: center.y + Math.sin(angle) * radiusY,
    };
  });

  orbiters.forEach((planet) => {
    context.beginPath();
    context.ellipse(center.x, center.y, planet.radiusX, planet.radiusY, 0, 0, Math.PI * 2);
    context.setLineDash(planet.index % 2 ? [1, 10] : [3, 12]);
    context.lineDashOffset = time * (planet.index % 2 ? -0.8 : 0.55);
    context.strokeStyle = `rgba(244,242,238,${0.022 + planet.depth * 0.028})`;
    context.lineWidth = 0.65;
    context.stroke();
    context.setLineDash([]);
  });

  orbiters
    .sort((a, b) => a.depth - b.depth)
    .forEach((planet) => {
      const planetScale = 0.72 + planet.depth * 0.42;
      const radius = (3.2 + planet.index * 0.62) * planetScale * scale;
      drawGlow(
        context,
        planet.x,
        planet.y,
        (14 + planet.index * 1.2) * scale,
        0.035 + planet.depth * 0.035,
      );
      context.save();
      context.translate(planet.x, planet.y);
      context.beginPath();
      if (planet.index === 2 || planet.index === 5) {
        context.rotate(Math.PI / 4);
        context.rect(-radius * 0.72, -radius * 0.72, radius * 1.44, radius * 1.44);
      } else {
        context.arc(0, 0, radius, 0, Math.PI * 2);
      }
      context.fillStyle = `rgba(94,230,160,${0.3 + planet.depth * 0.48})`;
      context.fill();
      context.strokeStyle = `rgba(244,242,238,${0.1 + planet.depth * 0.18})`;
      context.lineWidth = 0.8;
      context.stroke();
      context.restore();
      if (planet.index % 3 === 0) {
        context.beginPath();
        context.ellipse(
          planet.x,
          planet.y,
          radius + 6 * scale,
          radius * 0.48,
          -0.18,
          0,
          Math.PI * 2,
        );
        context.strokeStyle = `rgba(94,230,160,${0.12 + planet.depth * 0.12})`;
        context.stroke();
      }
      context.font = `${Math.max(7.2, (7.7 + planet.depth) * scale)}px 'Geist Mono', monospace`;
      context.textAlign = 'center';
      context.fillStyle = `rgba(244,242,238,${0.32 + planet.depth * 0.34})`;
      context.fillText(planet.label, planet.x, planet.y - radius - 9 * scale);
    });

  drawGlow(context, center.x, center.y, 54 * scale, 0.11);
  context.beginPath();
  context.arc(center.x, center.y, 16 * scale, 0, Math.PI * 2);
  context.strokeStyle = 'rgba(94,230,160,.24)';
  context.lineWidth = 0.8;
  context.stroke();
  context.beginPath();
  context.arc(center.x, center.y, 8 * scale, 0, Math.PI * 2);
  context.strokeStyle = 'rgba(244,242,238,.34)';
  context.stroke();
  context.beginPath();
  context.arc(center.x, center.y, 3.4 * scale, 0, Math.PI * 2);
  context.fillStyle = 'rgba(94,230,160,.9)';
  context.fill();
  context.font = `${Math.max(7, 7.5 * scale)}px 'Geist Mono', monospace`;
  context.fillStyle = 'rgba(244,242,238,.38)';
  context.textAlign = 'left';
  context.fillText('THE INSTITUTE', center.x + 21 * scale, center.y + 3 * scale);

  const shootingPhase = (time % 9) / 9;
  if (shootingPhase > 0.06 && shootingPhase < 0.62) {
    const progress = ease((shootingPhase - 0.06) / 0.56);
    const x = width * (0.94 - progress * 0.62);
    const y = height * (0.18 + progress * 0.23 + Math.sin(progress * Math.PI) * 0.035);
    const trailX = x + 82 * scale;
    const trailY = y - 26 * scale;
    const trail = context.createLinearGradient(x, y, trailX, trailY);
    trail.addColorStop(0, 'rgba(94,230,160,.42)');
    trail.addColorStop(1, 'rgba(94,230,160,0)');
    context.beginPath();
    context.moveTo(x, y);
    context.lineTo(trailX, trailY);
    context.strokeStyle = trail;
    context.lineWidth = 1;
    context.stroke();
    context.beginPath();
    context.arc(x, y, 2 * scale, 0, Math.PI * 2);
    context.fillStyle = 'rgba(244,242,238,.72)';
    context.fill();
    context.font = `${Math.max(7.5, 8.2 * scale)}px 'Geist Mono', monospace`;
    context.fillStyle = `rgba(94,230,160,${Math.sin(progress * Math.PI) * 0.5})`;
    context.fillText('operational divergence', x + 9 * scale, y - 8 * scale);
  }
};

export class PolicyHeroInstituteSystem extends HTMLElement {
  private engine?: CanvasEngine;

  connectedCallback() {
    const canvas = this.querySelector('canvas');
    if (canvas) this.engine = new CanvasEngine(canvas, drawInstituteSystem);
  }

  disconnectedCallback() {
    this.engine?.destroy();
  }
}

if (!customElements.get('policy-hero-institute-system')) {
  customElements.define('policy-hero-institute-system', PolicyHeroInstituteSystem);
}
