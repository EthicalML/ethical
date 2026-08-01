import { CanvasEngine, type CanvasDraw } from './CanvasEngine';

interface Hub {
  label: string;
  orbitX: number;
  orbitY: number;
  phase: number;
  x: number;
  y: number;
}

interface FieldLine {
  depth: number;
  phase: number;
  x: number;
  y: number;
}

const HUBS: Hub[] = [
  { label: 'EC', orbitX: 82, orbitY: 46, phase: 0.25, x: 0.23, y: 0.27 },
  { label: 'UN', orbitX: 76, orbitY: 43, phase: 1.8, x: 0.76, y: 0.25 },
  { label: 'ACM', orbitX: 84, orbitY: 47, phase: 3.65, x: 0.78, y: 0.73 },
  { label: 'ISO / IEEE', orbitX: 88, orbitY: 46, phase: 5.2, x: 0.24, y: 0.75 },
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

const FIELD_LINES: FieldLine[] = [
  { depth: 0.45, phase: 0.2, x: 0.08, y: 0.12 },
  { depth: 0.7, phase: 1.7, x: 0.46, y: 0.1 },
  { depth: 0.55, phase: 2.8, x: 0.63, y: 0.14 },
  { depth: 0.84, phase: 4.2, x: 0.4, y: 0.22 },
  { depth: 0.5, phase: 5.4, x: 0.08, y: 0.48 },
  { depth: 0.76, phase: 0.9, x: 0.69, y: 0.47 },
  { depth: 0.58, phase: 2.2, x: 0.42, y: 0.64 },
  { depth: 0.88, phase: 3.6, x: 0.56, y: 0.83 },
  { depth: 0.48, phase: 4.8, x: 0.09, y: 0.91 },
  { depth: 0.66, phase: 5.9, x: 0.7, y: 0.91 },
];

const PULSES = [
  { hub: 0, offset: 0.05, pace: 0.075 },
  { hub: 1, offset: 0.38, pace: 0.061 },
  { hub: 2, offset: 0.72, pace: 0.084 },
  { hub: 3, offset: 0.21, pace: 0.068 },
  { hub: 0, offset: 0.61, pace: 0.052 },
  { hub: 2, offset: 0.89, pace: 0.057 },
];

const clamp = (value: number) => Math.max(0, Math.min(1, value));
const smooth = (value: number) => value * value * (3 - 2 * value);
const eased = (value: number) => smooth(smooth(clamp(value)));

const drawPolicyAssembly: CanvasDraw = (context, width, height, elapsed) => {
  context.clearRect(0, 0, width, height);

  const time = elapsed + 1.8;
  const center = { x: width * 0.54, y: height * 0.5 };
  const scale = Math.min(width / 920, height / 650);
  const textCycle = 7.2;
  const textRound = Math.floor(time / textCycle);
  const textProgress = (time % textCycle) / textCycle;
  const activeHub = textRound % HUBS.length;
  const activeFragment = (textRound * 5 + 1) % FRAGMENTS.length;
  const focus =
    textProgress < 0.18
      ? 0
      : textProgress < 0.28
        ? smooth((textProgress - 0.18) / 0.1)
        : textProgress < 0.78
          ? 1
          : 1 - smooth((textProgress - 0.78) / 0.18);
  const assemblyProgress = ((time + 5.8) % 18) / 18;
  const assembly =
    assemblyProgress < 0.82
      ? smooth(Math.min(1, assemblyProgress / 0.68))
      : 1 - smooth((assemblyProgress - 0.82) / 0.18);

  const field = context.createRadialGradient(
    center.x,
    center.y,
    4,
    center.x,
    center.y,
    285 * scale,
  );
  field.addColorStop(0, 'rgba(94,230,160,.085)');
  field.addColorStop(0.4, 'rgba(94,230,160,.025)');
  field.addColorStop(1, 'rgba(94,230,160,0)');
  context.fillStyle = field;
  context.fillRect(0, 0, width, height);

  FIELD_LINES.forEach((line, index) => {
    const fragmentIndex = (index * 3 + 2) % FRAGMENTS.length;
    if (fragmentIndex === activeFragment) return;
    const driftX = Math.sin(time * 0.16 + line.phase) * 11 * line.depth * scale;
    const driftY = Math.cos(time * 0.11 + line.phase) * 5 * line.depth * scale;
    const x = line.x * width + driftX;
    const y = line.y * height + driftY;
    context.font = `${Math.max(7.5, (8.2 + line.depth) * scale)}px 'Geist Mono', monospace`;
    const textWidth = context.measureText(FRAGMENTS[fragmentIndex]).width;
    const startX = line.x > 0.58 ? x - textWidth : x;
    context.fillStyle = `rgba(244,242,238,${0.025 + line.depth * 0.035})`;
    context.fillText(FRAGMENTS[fragmentIndex], startX, y);
  });

  HUBS.forEach((hub, hubIndex) => {
    const hubX = hub.x * width;
    const hubY = hub.y * height;
    const active = hubIndex === activeHub;

    for (let layer = 1; layer >= 0; layer -= 1) {
      const layerScale = layer ? 1.34 : 0.82;
      const rotation = -0.18 + hubIndex * 0.12 + (layer ? 0.08 : -0.04);
      context.beginPath();
      context.ellipse(
        hubX,
        hubY,
        hub.orbitX * layerScale * scale,
        hub.orbitY * layerScale * scale,
        rotation,
        0,
        Math.PI * 2,
      );
      context.setLineDash(layer ? [1, 10] : [3, 7]);
      context.lineDashOffset = time * (layer ? -1.05 : 1.5) * (hubIndex % 2 ? -1 : 1);
      context.strokeStyle = layer ? 'rgba(244,242,238,.045)' : 'rgba(94,230,160,.095)';
      context.lineWidth = layer ? 0.65 : 0.8;
      context.stroke();
      context.setLineDash([]);

      for (let nodeIndex = 0; nodeIndex < 5; nodeIndex += 1) {
        const angle =
          hub.phase +
          (nodeIndex * (Math.PI * 2)) / 5 +
          time * (layer ? -0.036 - hubIndex * 0.002 : 0.064 + hubIndex * 0.003);
        const depth = (Math.sin(angle + layer * 0.8) + 1) / 2;
        const radiusX = hub.orbitX * layerScale * scale;
        const radiusY = hub.orbitY * layerScale * scale;
        const x = hubX + Math.cos(angle) * radiusX;
        const y = hubY + Math.sin(angle) * radiusY;
        const sizeSeed = (nodeIndex * 7 + hubIndex * 3 + layer * 5) % 4;
        const radius = (1.25 + sizeSeed * 0.52) * (0.68 + depth * 0.48) * scale;

        if (!layer) {
          context.beginPath();
          context.moveTo(hubX, hubY);
          context.lineTo(x, y);
          context.strokeStyle = `rgba(244,242,238,${0.018 + depth * 0.028})`;
          context.lineWidth = 0.65;
          context.stroke();
        }
        context.beginPath();
        context.arc(x, y, radius, 0, Math.PI * 2);
        context.fillStyle =
          sizeSeed === 3
            ? `rgba(94,230,160,${0.22 + depth * 0.4})`
            : `rgba(244,242,238,${0.12 + depth * (layer ? 0.23 : 0.36)})`;
        context.fill();
        if (sizeSeed === 3) {
          context.beginPath();
          context.arc(x, y, radius + (4 + depth * 3) * scale, 0, Math.PI * 2);
          context.strokeStyle = `rgba(94,230,160,${0.045 + depth * 0.08})`;
          context.stroke();
        }
      }
    }

    const hubGlow = context.createRadialGradient(hubX, hubY, 0, hubX, hubY, 38 * scale);
    hubGlow.addColorStop(0, `rgba(94,230,160,${active ? 0.2 : 0.11})`);
    hubGlow.addColorStop(1, 'rgba(94,230,160,0)');
    context.fillStyle = hubGlow;
    context.fillRect(hubX - 40 * scale, hubY - 40 * scale, 80 * scale, 80 * scale);
    context.beginPath();
    context.arc(hubX, hubY, (active ? 5.5 : 4.5) * scale, 0, Math.PI * 2);
    context.fillStyle = `rgba(94,230,160,${active ? 0.9 : 0.67})`;
    context.fill();
    context.beginPath();
    context.arc(hubX, hubY, (active ? 14 : 11) * scale, 0, Math.PI * 2);
    context.strokeStyle = `rgba(94,230,160,${active ? 0.28 : 0.13})`;
    context.stroke();
    context.font = `${Math.max(8, 9 * scale)}px 'Geist Mono', monospace`;
    context.textAlign = 'center';
    context.fillStyle = `rgba(244,242,238,${active ? 0.58 : 0.39})`;
    context.fillText(hub.label, hubX, hubY - 18 * scale);
  });

  PULSES.forEach((pulse, pulseIndex) => {
    const hub = HUBS[pulse.hub];
    const start = { x: hub.x * width, y: hub.y * height };
    const progress = (time * pulse.pace + pulse.offset) % 1;
    const travel = eased(progress);
    const x = start.x + (center.x - start.x) * travel;
    const y = start.y + (center.y - start.y) * travel;
    const visibility = Math.sin(progress * Math.PI);
    context.beginPath();
    context.moveTo(start.x, start.y);
    context.lineTo(center.x, center.y);
    context.strokeStyle = `rgba(94,230,160,${0.025 + visibility * 0.065})`;
    context.lineWidth = pulseIndex % 3 === 0 ? 0.95 : 0.7;
    context.stroke();
    context.beginPath();
    context.arc(x, y, (1.5 + visibility * (pulseIndex % 2 ? 1.2 : 1.8)) * scale, 0, Math.PI * 2);
    context.fillStyle = `rgba(94,230,160,${visibility * (pulseIndex % 2 ? 0.48 : 0.66)})`;
    context.fill();
    if (progress > 0.91) {
      const arrival = (progress - 0.91) / 0.09;
      context.beginPath();
      context.arc(center.x, center.y, (8 + arrival * 22) * scale, 0, Math.PI * 2);
      context.strokeStyle = `rgba(94,230,160,${(1 - arrival) * 0.1})`;
      context.stroke();
    }
  });

  const sourceHub = HUBS[activeHub];
  const source = { x: sourceHub.x * width, y: sourceHub.y * height };
  const recommendationTravel = eased(textProgress / 0.22);
  if (textProgress < 0.24) {
    const x = source.x + (center.x - source.x) * recommendationTravel;
    const y = source.y + (center.y - source.y) * recommendationTravel;
    context.beginPath();
    context.moveTo(source.x, source.y);
    context.lineTo(x, y);
    context.strokeStyle = 'rgba(94,230,160,.24)';
    context.lineWidth = 1.25;
    context.stroke();
    context.beginPath();
    context.arc(x, y, 3.2 * scale, 0, Math.PI * 2);
    context.fillStyle = 'rgba(94,230,160,.95)';
    context.fill();
  }

  const impact = textProgress < 0.22 ? 0 : 1 - smooth(clamp((textProgress - 0.22) / 0.18));
  context.save();
  context.translate(center.x, center.y);
  context.rotate(-Math.PI / 6 + time * 0.025);
  for (let segment = 0; segment < 12; segment += 1) {
    const visibility = clamp((assembly - segment / 12) * 12);
    if (visibility <= 0) continue;
    const angle = (segment / 12) * Math.PI * 2;
    context.beginPath();
    context.arc(0, 0, 39 * scale, angle + 0.045, angle + Math.PI / 6 - 0.045);
    context.strokeStyle = `rgba(94,230,160,${0.12 + visibility * 0.46 + impact * 0.12})`;
    context.lineWidth = 3.2 * scale;
    context.stroke();
    context.beginPath();
    context.moveTo(
      Math.cos(angle + Math.PI / 12) * 28 * scale,
      Math.sin(angle + Math.PI / 12) * 28 * scale,
    );
    context.lineTo(
      Math.cos(angle + Math.PI / 12) * 35 * scale,
      Math.sin(angle + Math.PI / 12) * 35 * scale,
    );
    context.strokeStyle = `rgba(244,242,238,${visibility * 0.16})`;
    context.lineWidth = 0.8;
    context.stroke();
  }
  context.beginPath();
  context.arc(0, 0, 27 * scale, 0, Math.PI * 2);
  context.setLineDash([2, 5]);
  context.strokeStyle = `rgba(244,242,238,${0.13 + assembly * 0.12})`;
  context.lineWidth = 0.8;
  context.stroke();
  context.setLineDash([]);
  context.rotate(Math.PI / 6 - time * 0.055);
  context.beginPath();
  for (let side = 0; side < 6; side += 1) {
    const angle = -Math.PI / 2 + (side / 6) * Math.PI * 2;
    const x = Math.cos(angle) * 16 * scale;
    const y = Math.sin(angle) * 16 * scale;
    if (side) context.lineTo(x, y);
    else context.moveTo(x, y);
  }
  context.closePath();
  context.fillStyle = 'rgba(19,20,20,.94)';
  context.fill();
  context.strokeStyle = `rgba(244,242,238,${0.24 + assembly * 0.3})`;
  context.lineWidth = 1;
  context.stroke();
  context.beginPath();
  context.arc(0, 0, (3.2 + impact * 2.4) * scale, 0, Math.PI * 2);
  context.fillStyle = `rgba(94,230,160,${0.62 + impact * 0.3})`;
  context.fill();
  context.restore();

  if (impact > 0.01) {
    context.beginPath();
    context.arc(center.x, center.y, (47 + (1 - impact) * 34) * scale, 0, Math.PI * 2);
    context.strokeStyle = `rgba(94,230,160,${impact * 0.16})`;
    context.stroke();
  }

  if (focus > 0.01) {
    const fragment = FRAGMENTS[activeFragment];
    const above = activeHub < 2;
    const textY = center.y + (above ? 68 : -66) * scale;
    context.font = `${Math.max(9, 10.5 * scale)}px 'Geist Mono', monospace`;
    const textWidth = context.measureText(fragment).width;
    const textX = Math.max(
      width * 0.26,
      Math.min(width - textWidth - 20 * scale, center.x - textWidth * 0.5),
    );
    const tetherY = textY + (above ? -9 : 10) * scale;
    context.beginPath();
    context.moveTo(center.x, center.y + (above ? 47 : -47) * scale);
    context.lineTo(center.x, tetherY);
    context.lineTo(textX, tetherY);
    context.strokeStyle = `rgba(94,230,160,${focus * 0.16})`;
    context.lineWidth = 0.8;
    context.stroke();
    context.fillStyle = `rgba(94,230,160,${0.12 + focus * 0.7})`;
    context.fillText(fragment, textX, textY);
    context.beginPath();
    context.moveTo(textX, textY + 7 * scale);
    context.lineTo(textX + textWidth * focus, textY + 7 * scale);
    context.strokeStyle = `rgba(94,230,160,${focus * 0.22})`;
    context.stroke();
  }

  context.textAlign = 'left';
};

export class PolicyHeroAssembly extends HTMLElement {
  private engine?: CanvasEngine;

  connectedCallback() {
    const canvas = this.querySelector('canvas');
    if (canvas) this.engine = new CanvasEngine(canvas, drawPolicyAssembly);
  }

  disconnectedCallback() {
    this.engine?.destroy();
  }
}

if (!customElements.get('policy-hero-assembly')) {
  customElements.define('policy-hero-assembly', PolicyHeroAssembly);
}
