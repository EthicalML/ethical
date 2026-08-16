// The agent-skills-marketplace loading bay for /open-source/: an isometric dock built from the
// shared IsoKit primitives. Three plugin stacks of hairline skill cubes idle on a ground plate
// beside two client sockets, and a faint conduit network joins them.
//
// The idle quality is the point. Most of the time nothing travels: each cube scintillates on its
// own slow timer between a dim tone and a lit one, the way live infrastructure idles. Only once
// per DISPATCH does a single cube lift, take a validation pulse, glide a conduit and dock, and the
// socket it lands in warms for a couple of seconds afterwards. Pointing at a stack warms it, the
// same hover-heat idiom the policy citadel uses.

import { CanvasEngine, type CanvasDraw, type Rgb, rgba, surfaceOf } from './CanvasEngine';
import {
  clamp,
  createIso,
  drawGlow,
  drawIsoCube,
  drawIsoGrid,
  plateStyle,
  styleAt,
  type IsoPoint,
} from './IsoKit';

const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;

/* Label ink on dark. The accent reads as a fill rather than as type at these sizes, so the
   on-dark label tone is the lifted mint the policy citadel labels its districts with; on paper
   the accent ink is the only accent value legible as text. */
const LABEL_DARK: Rgb = [180, 255, 214];

const CUBE_HALF = 0.4;
const CUBE_HEIGHT = 0.54;
const STACK_STEP = 0.54;
const PLATE_TOP = 0.26;

/** Seconds between deliveries. One cube travels; the rest of the cycle is idle scintillation. */
const DISPATCH = 9.6;
const LIFT_END = 1.1;
const PULSE_END = 2;
const GLIDE_END = 3.7;
const DOCK_END = 4.4;

interface Stack {
  gx: number;
  gz: number;
  label: string;
  /** Skills the plugin ships, one cube each. */
  skills: number;
}

interface Socket {
  gx: number;
  gz: number;
  label: string;
}

/* Stack order is a silhouette decision: the three-skill plugin sits between the two single-skill
   ones so the bay reads as a centred pile rather than a staircase. Counts are the real catalogue. */
const STACKS: Stack[] = [
  { gx: -2.9, gz: -2.6, label: 'SITE-CAPTURE', skills: 1 },
  { gx: -2.9, gz: 0, label: 'DEV-UTILITIES', skills: 3 },
  { gx: -2.9, gz: 2.6, label: 'AGENT-HARNESS', skills: 1 },
];

const SOCKETS: Socket[] = [
  { gx: 3, gz: -1.6, label: 'CLAUDE CODE' },
  { gx: 3, gz: 1.6, label: 'COPILOT CLI' },
];

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const easeInOut = (t: number) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2);

/** Ground route from a stack to a socket: out to the spine, along it, then out to the socket. */
const routeFor = (stack: Stack, socket: Socket): [number, number][] => [
  [stack.gx + 0.9, stack.gz],
  [0, stack.gz],
  [0, socket.gz],
  [socket.gx - 0.9, socket.gz],
];

/** Point at fraction `t` along a grid-space polyline, measured by segment length. */
const alongRoute = (route: [number, number][], t: number): [number, number] => {
  const lengths = route
    .slice(1)
    .map(([x, z], index) => Math.hypot(x - route[index][0], z - route[index][1]));
  const total = lengths.reduce((sum, length) => sum + length, 0) || 1;
  let travelled = clamp(t) * total;
  for (let index = 0; index < lengths.length; index += 1) {
    if (travelled <= lengths[index] || index === lengths.length - 1) {
      const fraction = lengths[index] ? clamp(travelled / lengths[index]) : 1;
      return [
        lerp(route[index][0], route[index + 1][0], fraction),
        lerp(route[index][1], route[index + 1][1], fraction),
      ];
    }
    travelled -= lengths[index];
  }
  return route[route.length - 1];
};

export class SkillCrateDock extends HTMLElement {
  private canvas?: HTMLCanvasElement;
  private controller = new AbortController();
  private engine?: CanvasEngine;
  private heat = STACKS.map(() => 0);
  private pointer = { active: false, targetX: 0.5, targetY: 0.5, x: 0.5, y: 0.5 };

  connectedCallback() {
    this.controller = new AbortController();
    const canvas = this.querySelector('canvas');
    if (!canvas) return;
    this.canvas = canvas;
    const { signal } = this.controller;
    canvas.addEventListener('pointermove', this.handlePointer, { signal });
    canvas.addEventListener('pointerleave', this.handleLeave, { signal });
    window.addEventListener('blur', this.handleLeave, { signal });
    this.engine = new CanvasEngine(canvas, this.draw, surfaceOf(this));
  }

  disconnectedCallback() {
    this.controller.abort();
    this.engine?.destroy();
  }

  private handlePointer = (event: PointerEvent) => {
    if (event.pointerType === 'touch' || !this.canvas) return;
    const bounds = this.canvas.getBoundingClientRect();
    const nx = (event.clientX - bounds.left) / bounds.width;
    const ny = (event.clientY - bounds.top) / bounds.height;
    this.pointer.active = nx >= 0 && nx <= 1 && ny >= 0 && ny <= 1;
    if (this.pointer.active) {
      this.pointer.targetX = nx;
      this.pointer.targetY = ny;
    }
  };

  private handleLeave = () => {
    this.pointer.active = false;
  };

  private draw: CanvasDraw = (context, width, height, elapsed, _pointer, palette) => {
    context.clearRect(0, 0, width, height);
    if (width < 2 || height < 2) return;

    /* Reduced motion freezes a composed frame rather than an empty bay: the offset lands inside
       the second cycle's glide, so the static picture still shows a cube in transit. */
    const time = reducedMotion ? DISPATCH + 2.9 : elapsed + 1.2;
    const unit = Math.min(width / 18, height / 12.5);
    const project = createIso(unit, width * 0.5, height * 0.55);
    const labelInk = palette.onLight ? palette.accentInk : LABEL_DARK;
    const font = (scale: number) => `${Math.max(7.5, unit * scale)}px 'Geist Mono', monospace`;

    // Hover heat: the stack nearest the cursor eases to 1, every other back to 0.
    this.pointer.x += (this.pointer.targetX - this.pointer.x) * 0.12;
    this.pointer.y += (this.pointer.targetY - this.pointer.y) * 0.12;
    const cursorX = this.pointer.x * width;
    const cursorY = this.pointer.y * height;
    let near = -1;
    if (this.pointer.active) {
      let best = unit * 4;
      STACKS.forEach((stack, index) => {
        const ground = project(stack.gx, 0, stack.gz);
        const topY = project(stack.gx, PLATE_TOP + stack.skills * STACK_STEP, stack.gz)[1];
        const clampedY = Math.min(Math.max(cursorY, topY), ground[1]);
        const distance = Math.hypot(cursorX - ground[0], cursorY - clampedY);
        if (distance < best) {
          best = distance;
          near = index;
        }
      });
    }
    const ease = reducedMotion ? 1 : 0.12;
    this.heat.forEach((value, index) => {
      this.heat[index] = value + ((near === index ? 1 : 0) - value) * ease;
    });

    /* Scintillation: a slow cosine per cube, raised to a power so it sits dim for most of its
       period and only briefly reaches the lit tone. Periods are staggered per seed, so no two
       cubes breathe together. */
    const twinkle = (seed: number) => {
      const period = 3.4 + ((seed * 1.73) % 3.1);
      const phase = (seed * 0.37) % 1;
      const wave = 0.5 - 0.5 * Math.cos(Math.PI * 2 * (time / period + phase));
      return Math.pow(wave, 2.4) * 0.44;
    };

    // One delivery per cycle: a rotating stack ships to an alternating socket.
    const cycle = Math.floor(time / DISPATCH);
    const step = time % DISPATCH;
    const fromIndex = cycle % STACKS.length;
    const toIndex = cycle % SOCKETS.length;
    const from = STACKS[fromIndex];
    const to = SOCKETS[toIndex];
    const departed = step < DOCK_END;
    const arrival = step - GLIDE_END;
    const socketGlow = arrival < 0 ? 0 : Math.exp(-arrival * 0.75);
    const liftGy = PLATE_TOP + from.skills * STACK_STEP + 0.85;
    const route = routeFor(from, to);

    drawIsoGrid(context, project, 7, rgba(palette.accentInk, 0.05));

    // Two stacked plates give the bay floor its stepped edge; the top face is PLATE_TOP.
    const plate = plateStyle(palette);
    drawIsoCube(context, project, 0, 0, 0, 4.2, 0.14, plate);
    drawIsoCube(context, project, 0, 0.14, 0, 3.8, 0.12, plate);

    // Conduit network, painted flat on the plate: stack spurs, the spine, socket spurs.
    const conduit = (grid: [number, number][], lit: number) => {
      const points = grid.map(([gx, gz]) => project(gx, PLATE_TOP, gz));
      context.strokeStyle = rgba(palette.accentInk, 0.1 + lit * 0.4);
      context.lineWidth = 1 + lit * 0.8;
      context.beginPath();
      points.forEach(([x, y], index) => (index ? context.lineTo(x, y) : context.moveTo(x, y)));
      context.stroke();
    };
    const active = departed && step >= PULSE_END;
    STACKS.forEach((stack, index) => {
      conduit(
        [
          [stack.gx + 0.9, stack.gz],
          [0, stack.gz],
        ],
        active && index === fromIndex ? 1 : 0,
      );
    });
    conduit(
      [
        [0, -2.6],
        [0, 2.6],
      ],
      active ? 0.6 : 0,
    );
    SOCKETS.forEach((socket, index) => {
      conduit(
        [
          [0, socket.gz],
          [socket.gx - 0.9, socket.gz],
        ],
        active && index === toIndex ? 1 : 0,
      );
    });

    /* Painter's order is static: every stack (gx + gz from -5.4 to -0.8) sits behind every
       socket (0.9 and 4.5), and each list is already ordered back to front. */
    const label = (anchor: IsoPoint, text: string, alpha: number) => {
      context.font = font(0.32);
      context.textAlign = 'center';
      context.fillStyle = rgba(labelInk, alpha);
      context.fillText(text, anchor[0], anchor[1] + unit * 1.15);
      context.textAlign = 'start';
    };

    STACKS.forEach((stack, index) => {
      const stackHeat = this.heat[index];
      const shipping = departed && index === fromIndex ? 1 : 0;
      for (let cube = 0; cube < stack.skills - shipping; cube += 1) {
        const heat = Math.max(twinkle(index * 5 + cube), stackHeat * 0.62);
        drawIsoCube(
          context,
          project,
          stack.gx,
          PLATE_TOP + cube * STACK_STEP,
          stack.gz,
          CUBE_HALF,
          CUBE_HEIGHT,
          styleAt(heat, palette),
        );
      }
      label(project(stack.gx, 0, stack.gz), stack.label, 0.38 + stackHeat * 0.5);
    });

    SOCKETS.forEach((socket, index) => {
      const glow = index === toIndex ? socketGlow : 0;
      drawIsoCube(
        context,
        project,
        socket.gx,
        PLATE_TOP,
        socket.gz,
        0.74,
        0.1,
        styleAt(glow * 0.85, palette),
      );
      // The socket mouth: a hairline diamond on the pad face, brightening as a cube lands.
      const mouth: IsoPoint[] = [
        project(socket.gx - 0.56, PLATE_TOP + 0.1, socket.gz - 0.56),
        project(socket.gx + 0.56, PLATE_TOP + 0.1, socket.gz - 0.56),
        project(socket.gx + 0.56, PLATE_TOP + 0.1, socket.gz + 0.56),
        project(socket.gx - 0.56, PLATE_TOP + 0.1, socket.gz + 0.56),
      ];
      context.strokeStyle = rgba(palette.accentInk, 0.16 + glow * 0.5);
      context.lineWidth = 1;
      context.beginPath();
      mouth.forEach(([x, y], corner) => (corner ? context.lineTo(x, y) : context.moveTo(x, y)));
      context.closePath();
      context.stroke();
      if (glow > 0.04) {
        const centre = project(socket.gx, PLATE_TOP + 0.1, socket.gz);
        drawGlow(context, centre[0], centre[1], unit * 1.6, glow * 0.22, palette.accentInk);
      }
      // The delivered cube rests in its socket for the remainder of the cycle.
      if (index === toIndex && step >= DOCK_END) {
        drawIsoCube(
          context,
          project,
          socket.gx,
          PLATE_TOP + 0.1,
          socket.gz,
          CUBE_HALF,
          CUBE_HEIGHT,
          styleAt(0.35 + socketGlow * 0.5, palette),
        );
      }
      label(project(socket.gx, 0, socket.gz), socket.label, 0.44 + glow * 0.42);
    });

    if (!departed) return;

    // The travelling cube: lift, validation pulse, glide, dock.
    let gx = from.gx;
    let gz = from.gz;
    let gy = PLATE_TOP + (from.skills - 1) * STACK_STEP;
    if (step < LIFT_END) {
      gy = lerp(gy, liftGy, easeInOut(step / LIFT_END));
    } else if (step < PULSE_END) {
      gy = liftGy;
    } else if (step < GLIDE_END) {
      gy = liftGy;
      [gx, gz] = alongRoute(route, easeInOut((step - PULSE_END) / (GLIDE_END - PULSE_END)));
    } else {
      gx = to.gx;
      gz = to.gz;
      gy = lerp(liftGy, PLATE_TOP + 0.1, easeInOut((step - GLIDE_END) / (DOCK_END - GLIDE_END)));
    }

    const carriage = project(gx, gy, gz);
    if (step >= LIFT_END && step < PULSE_END) {
      const pulse = (step - LIFT_END) / (PULSE_END - LIFT_END);
      context.strokeStyle = rgba(palette.accentInk, (1 - pulse) * 0.55);
      context.lineWidth = 1;
      context.beginPath();
      context.ellipse(
        carriage[0],
        carriage[1],
        unit * (0.7 + pulse * 2),
        unit * (0.35 + pulse),
        0,
        0,
        Math.PI * 2,
      );
      context.stroke();
    }
    drawIsoCube(context, project, gx, gy, gz, CUBE_HALF, CUBE_HEIGHT, styleAt(0.8, palette));
  };
}

if (!customElements.get('skill-crate-dock')) {
  customElements.define('skill-crate-dock', SkillCrateDock);
}
