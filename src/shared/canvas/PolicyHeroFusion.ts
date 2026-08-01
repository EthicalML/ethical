import { CanvasEngine, type CanvasDraw } from './CanvasEngine';

interface Hub {
  label: string;
  phase: number;
  x: number;
  y: number;
}

interface DepthBand {
  opacity: number;
  radius: number;
  scale: number;
  speed: number;
}

interface PulseTrain {
  bend: number;
  hub: number;
  offset: number;
  pace: number;
}

interface TextFragment {
  font: 'display' | 'mono';
  phase: number;
  scale: number;
  x: number;
  y: number;
}

const HUBS: Hub[] = [
  { label: 'EC', phase: 0.25, x: 0.25, y: 0.27 },
  { label: 'UN', phase: 1.8, x: 0.77, y: 0.24 },
  { label: 'ACM', phase: 3.55, x: 0.79, y: 0.73 },
  { label: 'ISO / IEEE', phase: 5.1, x: 0.25, y: 0.75 },
];

const DEPTH_BANDS: DepthBand[] = [
  { opacity: 0.17, radius: 1.62, scale: 0.72, speed: -0.024 },
  { opacity: 0.29, radius: 1.12, scale: 0.95, speed: 0.04 },
  { opacity: 0.5, radius: 0.7, scale: 1.22, speed: 0.068 },
];

const PULSE_TRAINS: PulseTrain[] = [
  { bend: -0.16, hub: 0, offset: 0.08, pace: 0.052 },
  { bend: 0.11, hub: 0, offset: 0.61, pace: 0.073 },
  { bend: 0.14, hub: 1, offset: 0.28, pace: 0.064 },
  { bend: -0.1, hub: 1, offset: 0.82, pace: 0.047 },
  { bend: -0.13, hub: 2, offset: 0.46, pace: 0.069 },
  { bend: 0.12, hub: 2, offset: 0.93, pace: 0.055 },
  { bend: 0.15, hub: 3, offset: 0.19, pace: 0.059 },
  { bend: -0.11, hub: 3, offset: 0.72, pace: 0.078 },
];

const FRAGMENTS = [
  'eight (8) out of twelve (12) initial recommendations',
  'narrowness is maintained rather than merely declared',
  'operational divergence',
  'continuous and dynamic oversight',
  'measurable, reproducible, auditable',
  'an incident register',
  'deployment vs release',
  'classification should follow the risk introduced',
  'proportionate to the risk involved',
  'define your terms',
  'certain artifacts are irreducible for a meaningful audit',
  'ADM processes must be traceable',
  'public scrutiny of the data and models',
  'human-centered AI systems work in partnership',
  'sunlight is often the best disinfectant',
  'Existing mechanisms and modes for avoiding such harm likely will not suffice',
];

const TEXT_FIELD: TextFragment[] = [
  { font: 'mono', phase: 0.2, scale: 0.78, x: 0.07, y: 0.1 },
  { font: 'display', phase: 1.1, scale: 1.1, x: 0.37, y: 0.1 },
  { font: 'mono', phase: 2.2, scale: 0.82, x: 0.69, y: 0.13 },
  { font: 'mono', phase: 3.4, scale: 0.96, x: 0.42, y: 0.2 },
  { font: 'display', phase: 4.1, scale: 0.9, x: 0.07, y: 0.44 },
  { font: 'mono', phase: 5.3, scale: 0.76, x: 0.69, y: 0.43 },
  { font: 'mono', phase: 0.8, scale: 0.88, x: 0.4, y: 0.62 },
  { font: 'display', phase: 1.9, scale: 1.02, x: 0.67, y: 0.63 },
  { font: 'mono', phase: 2.8, scale: 0.8, x: 0.07, y: 0.87 },
  { font: 'mono', phase: 4.5, scale: 0.94, x: 0.38, y: 0.91 },
  { font: 'display', phase: 5.7, scale: 0.86, x: 0.69, y: 0.88 },
  { font: 'mono', phase: 3.8, scale: 0.72, x: 0.16, y: 0.58 },
];

const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
const clamp = (value: number) => Math.max(0, Math.min(1, value));
const smooth = (value: number) => value * value * (3 - 2 * value);
const ease = (value: number) => smooth(smooth(clamp(value)));

const pointOnCurve = (
  start: { x: number; y: number },
  end: { x: number; y: number },
  bend: number,
  progress: number,
) => {
  const dx = end.x - start.x;
  const dy = end.y - start.y;
  const control = {
    x: (start.x + end.x) * 0.5 - dy * bend,
    y: (start.y + end.y) * 0.5 + dx * bend,
  };
  const inverse = 1 - progress;
  return {
    control,
    x:
      inverse * inverse * start.x +
      2 * inverse * progress * control.x +
      progress * progress * end.x,
    y:
      inverse * inverse * start.y +
      2 * inverse * progress * control.y +
      progress * progress * end.y,
  };
};

const strokeCurve = (
  context: CanvasRenderingContext2D,
  start: { x: number; y: number },
  end: { x: number; y: number },
  bend: number,
) => {
  const { control } = pointOnCurve(start, end, bend, 0);
  context.beginPath();
  context.moveTo(start.x, start.y);
  context.quadraticCurveTo(control.x, control.y, end.x, end.y);
  context.stroke();
};

const drawFusion: CanvasDraw = (context, width, height, elapsed) => {
  context.clearRect(0, 0, width, height);

  const time = elapsed + 1.25;
  const phase = reducedMotion ? 9.35 : time % 12;
  const round = Math.floor(time / 12);
  const center = { x: width * 0.56, y: height * 0.49 };
  const scale = Math.min(width / 920, height / 650);
  const converge = ease((phase - 6.1) / 2);
  const completion =
    phase < 6.1
      ? 0.55 + Math.sin(time * 0.32) * 0.025
      : phase < 8.1
        ? 0.55 + converge * 0.45
        : phase < 11.55
          ? 1
          : 1 - smooth((phase - 11.55) / 0.45) * 0.45;
  const flashProgress = clamp((phase - 8.1) / 0.82);
  const flash = phase >= 8.1 && phase <= 8.92 ? Math.sin(flashProgress * Math.PI) : 0;
  const focus = reducedMotion
    ? 1
    : phase < 8.12
      ? 0
      : phase < 8.58
        ? smooth((phase - 8.12) / 0.46)
        : phase < 11.05
          ? 1
          : 1 - smooth(clamp((phase - 11.05) / 0.8));
  const activeFragment = (round * 5 + 1) % FRAGMENTS.length;

  const field = context.createRadialGradient(
    center.x,
    center.y,
    6,
    center.x,
    center.y,
    310 * scale,
  );
  field.addColorStop(0, `rgba(94,230,160,${0.055 + flash * 0.05})`);
  field.addColorStop(0.42, 'rgba(94,230,160,.018)');
  field.addColorStop(1, 'rgba(94,230,160,0)');
  context.fillStyle = field;
  context.fillRect(0, 0, width, height);

  context.save();
  context.translate(center.x, center.y);
  for (let ring = 0; ring < 3; ring += 1) {
    context.beginPath();
    context.ellipse(
      0,
      0,
      width * (0.18 + ring * 0.105),
      height * (0.14 + ring * 0.074),
      -0.08,
      0,
      Math.PI * 2,
    );
    context.setLineDash(ring === 1 ? [2, 10] : [1, 13]);
    context.lineDashOffset = time * (ring % 2 ? 1.1 : -0.75);
    context.strokeStyle = `rgba(244,242,238,${0.04 + ring * 0.017})`;
    context.lineWidth = 0.7;
    context.stroke();
  }
  context.setLineDash([]);
  context.restore();

  TEXT_FIELD.forEach((line, index) => {
    const fragmentIndex = (index * 5 + 2) % FRAGMENTS.length;
    if (fragmentIndex === activeFragment) return;
    const driftX = Math.sin(time * 0.12 + line.phase) * 9 * line.scale * scale;
    const driftY = Math.cos(time * 0.085 + line.phase) * 4 * line.scale * scale;
    const x = line.x * width + driftX;
    const y = line.y * height + driftY;
    const fontSize = (line.font === 'display' ? 13.5 : 8.2) * line.scale * scale;
    context.font =
      line.font === 'display'
        ? `300 ${Math.max(9, fontSize)}px 'Newsreader', Georgia, serif`
        : `${Math.max(7.5, fontSize)}px 'Geist Mono', monospace`;
    const textWidth = context.measureText(FRAGMENTS[fragmentIndex]).width;
    const startX = line.x > 0.58 ? x - textWidth : x;
    const hierarchy = line.font === 'display' ? 0.018 : 0.01;
    context.fillStyle = `rgba(244,242,238,${hierarchy + line.scale * 0.025})`;
    context.fillText(FRAGMENTS[fragmentIndex], startX, y);
  });

  HUBS.forEach((hub, hubIndex) => {
    const hubPoint = { x: hub.x * width, y: hub.y * height };
    const hubActive = hubIndex === round % HUBS.length;

    DEPTH_BANDS.forEach((band, bandIndex) => {
      const radiusX = (44 + hubIndex * 2) * band.radius * scale;
      const radiusY = (26 + (hubIndex % 2) * 2) * band.radius * scale;
      context.beginPath();
      context.ellipse(
        hubPoint.x,
        hubPoint.y,
        radiusX,
        radiusY,
        -0.13 + hubIndex * 0.08,
        0,
        Math.PI * 2,
      );
      context.setLineDash(bandIndex === 2 ? [3, 8] : [1, 11]);
      context.lineDashOffset = time * band.speed * 18;
      context.strokeStyle = `rgba(244,242,238,${0.026 + bandIndex * 0.022})`;
      context.lineWidth = 0.65;
      context.stroke();
      context.setLineDash([]);

      for (let nodeIndex = 0; nodeIndex < 3; nodeIndex += 1) {
        const angle =
          hub.phase + (nodeIndex * (Math.PI * 2)) / 3 + time * band.speed + bandIndex * 0.48;
        const depth = (Math.sin(angle + bandIndex * 0.7) + 1) / 2;
        const x = hubPoint.x + Math.cos(angle) * radiusX;
        const y = hubPoint.y + Math.sin(angle) * radiusY;
        const seed = (hubIndex * 7 + bandIndex * 5 + nodeIndex * 3) % 5;
        const radius = (1.15 + seed * 0.42) * band.scale * (0.7 + depth * 0.42) * scale;
        if (bandIndex === 2) {
          context.beginPath();
          context.moveTo(hubPoint.x, hubPoint.y);
          context.lineTo(x, y);
          context.strokeStyle = `rgba(244,242,238,${0.018 + depth * 0.025})`;
          context.lineWidth = 0.6;
          context.stroke();
        }
        context.beginPath();
        context.arc(x, y, radius, 0, Math.PI * 2);
        context.fillStyle =
          seed === 4
            ? `rgba(94,230,160,${band.opacity + depth * 0.34})`
            : `rgba(244,242,238,${band.opacity + depth * 0.18})`;
        context.fill();
        if (seed === 4) {
          context.beginPath();
          context.arc(x, y, radius + (4 + depth * 4) * scale, 0, Math.PI * 2);
          context.strokeStyle = `rgba(94,230,160,${0.04 + depth * 0.085})`;
          context.stroke();
        }
      }
    });

    const hubGlow = context.createRadialGradient(
      hubPoint.x,
      hubPoint.y,
      0,
      hubPoint.x,
      hubPoint.y,
      36 * scale,
    );
    hubGlow.addColorStop(0, `rgba(94,230,160,${hubActive ? 0.18 : 0.09})`);
    hubGlow.addColorStop(1, 'rgba(94,230,160,0)');
    context.fillStyle = hubGlow;
    context.fillRect(hubPoint.x - 38 * scale, hubPoint.y - 38 * scale, 76 * scale, 76 * scale);
    context.beginPath();
    context.arc(hubPoint.x, hubPoint.y, (hubActive ? 5.2 : 4.2) * scale, 0, Math.PI * 2);
    context.fillStyle = `rgba(94,230,160,${hubActive ? 0.88 : 0.63})`;
    context.fill();
    context.beginPath();
    context.arc(hubPoint.x, hubPoint.y, (hubActive ? 13 : 10) * scale, 0, Math.PI * 2);
    context.strokeStyle = `rgba(94,230,160,${hubActive ? 0.24 : 0.11})`;
    context.stroke();
    context.font = `${Math.max(8, 9 * scale)}px 'Geist Mono', monospace`;
    context.textAlign = 'center';
    context.fillStyle = `rgba(244,242,238,${hubActive ? 0.56 : 0.38})`;
    context.fillText(hub.label, hubPoint.x, hubPoint.y - 17 * scale);
  });

  PULSE_TRAINS.forEach((pulse, index) => {
    const hub = HUBS[pulse.hub];
    const start = { x: hub.x * width, y: hub.y * height };
    const progress = (time * pulse.pace + pulse.offset) % 1;
    const travel = ease(progress);
    const point = pointOnCurve(start, center, pulse.bend, travel);
    const visibility = Math.sin(progress * Math.PI) * (1 - converge * 0.42);
    context.strokeStyle = `rgba(94,230,160,${0.03 + visibility * 0.068})`;
    context.lineWidth = index % 3 === 0 ? 0.9 : 0.65;
    strokeCurve(context, start, center, pulse.bend);
    context.beginPath();
    context.arc(
      point.x,
      point.y,
      (1.4 + visibility * (index % 2 ? 1.1 : 1.7)) * scale,
      0,
      Math.PI * 2,
    );
    context.fillStyle = `rgba(94,230,160,${visibility * (index % 2 ? 0.44 : 0.62)})`;
    context.fill();
  });

  if (phase >= 6.1 && phase < 8.18) {
    HUBS.forEach((hub, index) => {
      const start = { x: hub.x * width, y: hub.y * height };
      const bend = [-0.12, 0.11, -0.1, 0.13][index];
      const progress = ease((phase - 6.1 - index * 0.05) / 1.82);
      const point = pointOnCurve(start, center, bend, progress);
      context.strokeStyle = `rgba(94,230,160,${0.09 + progress * 0.13})`;
      context.lineWidth = 1.05;
      strokeCurve(context, start, center, bend);
      context.beginPath();
      context.arc(point.x, point.y, (2.5 + progress * 1.5) * scale, 0, Math.PI * 2);
      context.fillStyle = `rgba(94,230,160,${0.54 + progress * 0.4})`;
      context.fill();
    });
  }

  if (flash > 0.01) {
    const flashGlow = context.createRadialGradient(
      center.x,
      center.y,
      0,
      center.x,
      center.y,
      105 * scale,
    );
    flashGlow.addColorStop(0, `rgba(94,230,160,${flash * 0.24})`);
    flashGlow.addColorStop(0.45, `rgba(94,230,160,${flash * 0.065})`);
    flashGlow.addColorStop(1, 'rgba(94,230,160,0)');
    context.fillStyle = flashGlow;
    context.fillRect(center.x - 110 * scale, center.y - 110 * scale, 220 * scale, 220 * scale);
    context.beginPath();
    context.arc(center.x, center.y, (58 + flashProgress * 38) * scale, 0, Math.PI * 2);
    context.strokeStyle = `rgba(94,230,160,${flash * 0.3})`;
    context.lineWidth = 1.1;
    context.stroke();
  }

  context.save();
  context.translate(center.x, center.y);
  context.beginPath();
  context.arc(0, 0, 59 * scale, 0, Math.PI * 2);
  context.setLineDash([1, 9]);
  context.lineDashOffset = time * 0.7;
  context.strokeStyle = 'rgba(244,242,238,.07)';
  context.lineWidth = 0.7;
  context.stroke();
  context.setLineDash([]);
  context.rotate(-Math.PI / 2 + time * 0.018);
  for (let segment = 0; segment < 16; segment += 1) {
    const visibility = clamp((completion - segment / 16) * 16);
    if (visibility <= 0) continue;
    const angle = (segment * Math.PI) / 8;
    const depth = 0.72 + (Math.sin(angle) + 1) * 0.14;
    context.beginPath();
    context.arc(0, 0, 51 * scale, angle + 0.035, angle + Math.PI / 8 - 0.035);
    context.strokeStyle = `rgba(94,230,160,${visibility * depth * 0.62 + flash * 0.12})`;
    context.lineWidth = (2.7 + depth) * scale;
    context.stroke();
  }
  context.beginPath();
  context.arc(0, 0, 40 * scale, 0, Math.PI * 2);
  context.setLineDash([2, 6]);
  context.lineDashOffset = -time * 0.9;
  context.strokeStyle = `rgba(244,242,238,${0.1 + completion * 0.13})`;
  context.lineWidth = 0.8;
  context.stroke();
  context.setLineDash([]);
  for (let spoke = 0; spoke < 8; spoke += 1) {
    const angle = (spoke * Math.PI) / 4;
    context.beginPath();
    context.moveTo(Math.cos(angle) * 25 * scale, Math.sin(angle) * 25 * scale);
    context.lineTo(Math.cos(angle) * 35 * scale, Math.sin(angle) * 35 * scale);
    context.strokeStyle = `rgba(244,242,238,${0.08 + completion * 0.12})`;
    context.stroke();
  }
  context.rotate(Math.PI / 2 - time * 0.055);
  context.beginPath();
  for (let side = 0; side < 8; side += 1) {
    const angle = -Math.PI / 2 + (side * Math.PI) / 4;
    const x = Math.cos(angle) * 18 * scale;
    const y = Math.sin(angle) * 18 * scale;
    if (side) context.lineTo(x, y);
    else context.moveTo(x, y);
  }
  context.closePath();
  context.fillStyle = 'rgba(19,20,20,.95)';
  context.fill();
  context.strokeStyle = `rgba(244,242,238,${0.2 + completion * 0.32 + flash * 0.16})`;
  context.lineWidth = 1;
  context.stroke();
  context.beginPath();
  context.arc(0, 0, (3.5 + flash * 2.8) * scale, 0, Math.PI * 2);
  context.fillStyle = `rgba(94,230,160,${0.7 + flash * 0.26})`;
  context.fill();
  context.restore();

  if (focus > 0.01) {
    const fragment = FRAGMENTS[activeFragment];
    context.font = `${Math.max(9.5, 11 * scale)}px 'Geist Mono', monospace`;
    const textWidth = context.measureText(fragment).width;
    const textX = Math.min(width - textWidth - 22 * scale, center.x + 62 * scale);
    const textY = center.y + 72 * scale;
    context.beginPath();
    context.moveTo(center.x + 58 * scale, center.y);
    context.lineTo(textX - 12 * scale, center.y);
    context.lineTo(textX - 12 * scale, textY - 5 * scale);
    context.strokeStyle = `rgba(94,230,160,${focus * 0.18})`;
    context.lineWidth = 0.8;
    context.stroke();
    context.fillStyle = `rgba(94,230,160,${0.14 + focus * 0.72})`;
    context.fillText(fragment, textX, textY);
    context.beginPath();
    context.moveTo(textX, textY + 8 * scale);
    context.lineTo(textX + textWidth * focus, textY + 8 * scale);
    context.strokeStyle = `rgba(94,230,160,${focus * 0.25})`;
    context.stroke();
  }

  context.textAlign = 'left';
};

export class PolicyHeroFusion extends HTMLElement {
  private engine?: CanvasEngine;

  connectedCallback() {
    const canvas = this.querySelector('canvas');
    if (canvas) this.engine = new CanvasEngine(canvas, drawFusion);
  }

  disconnectedCallback() {
    this.engine?.destroy();
  }
}

if (!customElements.get('policy-hero-fusion')) {
  customElements.define('policy-hero-fusion', PolicyHeroFusion);
}
