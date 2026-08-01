import { CanvasEngine, type CanvasDraw } from './CanvasEngine';

interface RecordNode {
  featured: boolean;
  phase: number;
  track: number;
  x: number;
  year: number;
}

const TRACK_COUNTS = [7, 6, 5, 5, 5];
const NODES: RecordNode[] = TRACK_COUNTS.flatMap((count, track) =>
  Array.from({ length: count }, (_, index) => {
    const position = (index + 0.35 + track * 0.19) / (count + 0.2);
    return {
      featured: (index + track * 2) % 4 === 0,
      phase: track * 0.7 + index * 0.41,
      track,
      x: 0.06 + position * 0.88,
      year: Math.min(2026, 2020 + Math.floor(position * 7)),
    };
  }),
);

const smooth = (value: number) => value * value * (3 - 2 * value);

const drawRecordFlow: CanvasDraw = (context, width, height, elapsed) => {
  context.clearRect(0, 0, width, height);
  const left = width * 0.06;
  const right = width * 0.95;
  const top = height * 0.22;
  const gap = (height * 0.58) / (TRACK_COUNTS.length - 1);
  const scale = Math.min(width / 920, height / 650);
  const cohort = 2020 + (Math.floor(elapsed / 2.2) % 7);
  const cohortPhase = (elapsed % 2.2) / 2.2;

  context.font = `${Math.max(8, 9 * scale)}px 'Geist Mono', monospace`;
  context.lineWidth = 1;
  ['2020', '2022', '2024', '2026'].forEach((year, index) => {
    const x = left + (index / 3) * (right - left);
    context.beginPath();
    context.moveTo(x, top - 30 * scale);
    context.lineTo(x, top + gap * 4 + 24 * scale);
    context.setLineDash([2, 8]);
    context.strokeStyle = 'rgba(244,242,238,.055)';
    context.stroke();
    context.setLineDash([]);
    context.fillStyle = year === String(cohort) ? 'rgba(94,230,160,.64)' : 'rgba(244,242,238,.28)';
    context.fillText(year, x + 6 * scale, top - 38 * scale);
  });

  for (let track = 0; track < TRACK_COUNTS.length; track += 1) {
    const y = top + track * gap;
    const gradient = context.createLinearGradient(left, y, right, y);
    gradient.addColorStop(0, 'rgba(244,242,238,.025)');
    gradient.addColorStop(0.3, 'rgba(244,242,238,.11)');
    gradient.addColorStop(1, 'rgba(244,242,238,.035)');
    context.beginPath();
    context.moveTo(left, y);
    context.lineTo(right, y);
    context.strokeStyle = gradient;
    context.stroke();
  }

  NODES.forEach((node, index) => {
    const x = left + node.x * (right - left);
    const y = top + node.track * gap;
    const distance = Math.abs(node.year - cohort);
    const cohortLight = distance === 0 ? Math.sin(Math.min(1, cohortPhase * 1.6) * Math.PI) : 0;
    const depth = 0.58 + (node.track / 4) * 0.42;
    const radius = (node.featured ? 3.05 : 1.8 + (index % 3) * 0.3) * depth * scale;

    context.beginPath();
    context.arc(x, y, radius * (1 + cohortLight * 0.32), 0, Math.PI * 2);
    context.fillStyle =
      node.featured || cohortLight > 0.1
        ? `rgba(94,230,160,${0.3 + cohortLight * 0.56})`
        : `rgba(244,242,238,${0.18 + depth * 0.2})`;
    context.fill();
    if (cohortLight > 0.08) {
      context.beginPath();
      context.arc(x, y, radius + (5 + cohortLight * 7) * scale, 0, Math.PI * 2);
      context.strokeStyle = `rgba(94,230,160,${cohortLight * 0.12})`;
      context.stroke();
    }
  });

  const eventDuration = 4.6;
  const event = Math.floor(elapsed / eventDuration);
  const eventProgress = (elapsed % eventDuration) / eventDuration;
  const target = NODES[(event * 7 + 5) % NODES.length];
  const targetX = left + target.x * (right - left);
  const targetY = top + target.track * gap;
  const travelEnd = 0.76;
  if (eventProgress < travelEnd) {
    const travel = smooth(eventProgress / travelEnd);
    const x = left + (targetX - left) * travel;
    context.beginPath();
    context.moveTo(left, targetY);
    context.lineTo(x, targetY);
    const trail = context.createLinearGradient(
      Math.max(left, x - 110 * scale),
      targetY,
      x,
      targetY,
    );
    trail.addColorStop(0, 'rgba(94,230,160,0)');
    trail.addColorStop(1, 'rgba(94,230,160,.48)');
    context.strokeStyle = trail;
    context.lineWidth = 1.25;
    context.stroke();
    context.beginPath();
    context.arc(x, targetY, 2.6 * scale, 0, Math.PI * 2);
    context.fillStyle = 'rgba(94,230,160,.9)';
    context.fill();
  } else {
    const landing = (eventProgress - travelEnd) / (1 - travelEnd);
    const bloom = Math.sin(landing * Math.PI);
    context.beginPath();
    context.arc(targetX, targetY, (5 + landing * 30) * scale, 0, Math.PI * 2);
    context.strokeStyle = `rgba(94,230,160,${bloom * 0.25})`;
    context.lineWidth = 1.1;
    context.stroke();
    context.beginPath();
    context.arc(targetX, targetY, (3 + bloom * 3) * scale, 0, Math.PI * 2);
    context.fillStyle = `rgba(94,230,160,${0.48 + bloom * 0.46})`;
    context.fill();
  }
};

export class PolicyHero3 extends HTMLElement {
  private engine?: CanvasEngine;

  connectedCallback() {
    const canvas = this.querySelector('canvas');
    if (canvas) this.engine = new CanvasEngine(canvas, drawRecordFlow);
  }

  disconnectedCallback() {
    this.engine?.destroy();
  }
}

if (!customElements.get('policy-hero-3')) customElements.define('policy-hero-3', PolicyHero3);
