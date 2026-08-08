import {
  CanvasEngine,
  type CanvasDraw,
  type CanvasPalette,
  type CanvasPointer,
  rgba,
  surfaceOf,
} from './CanvasEngine';

type Vector = [number, number, number];

interface CubeMove {
  axis: number;
  dir: number;
  layer: number;
  t?: number;
}

interface Cubie {
  home: Vector;
  m: [Vector, Vector, Vector];
  p: Vector;
}

interface Quad {
  depth: number;
  pts: Vector[];
  shade: number;
  sticker: Vector[];
  tone: string | null;
}

export function createCubeDrawer(): CanvasDraw {
  const cubies: Cubie[] = [];
  let move: CubeMove | null = null;
  let phase = 'scramble';
  let pause = 0;
  let moves: CubeMove[] = [];
  let scramble: CubeMove[] = [];
  let last: number | undefined;

  for (let x = -1; x <= 1; x += 1) {
    for (let y = -1; y <= 1; y += 1) {
      for (let z = -1; z <= 1; z += 1) {
        cubies.push({
          p: [x, y, z],
          home: [x, y, z],
          m: [
            [1, 0, 0],
            [0, 1, 0],
            [0, 0, 1],
          ],
        });
      }
    }
  }

  const queue = () => {
    const sequence: CubeMove[] = [];
    let prior = -1;
    for (let index = 0; index < 14; index += 1) {
      let axis: number;
      do {
        axis = Math.floor(Math.random() * 3);
      } while (axis === prior);
      prior = axis;
      sequence.push({
        axis,
        layer: Math.random() < 0.5 ? -1 : 1,
        dir: Math.random() < 0.5 ? 1 : -1,
      });
    }
    scramble = sequence;
    moves = sequence.slice();
    phase = 'scramble';
  };

  const rotate = ([x, y, z]: Vector, axis: number, direction: number): Vector => {
    if (axis === 0) return [x, -direction * z, direction * y];
    if (axis === 1) return [direction * z, y, -direction * x];
    return [-direction * y, direction * x, z];
  };

  const step = (delta: number) => {
    if (!moves.length && !move && phase === 'scramble' && !scramble.length) queue();
    if (!move) {
      if (pause > 0) {
        pause -= delta;
        return;
      }
      if (!moves.length) {
        if (phase === 'scramble') {
          moves = scramble
            .slice()
            .reverse()
            .map((item) => ({ ...item, dir: -item.dir }));
          phase = 'solve';
          pause = 0.5;
        } else {
          queue();
          pause = 1.1;
        }
        return;
      }
      move = { ...moves.shift()!, t: 0 };
    }

    move.t = (move.t ?? 0) + delta / 0.42;
    if (move.t < 1) return;

    const { axis, layer, dir } = move;
    cubies.forEach((cubie) => {
      if (cubie.p[axis] !== layer) return;
      cubie.p = rotate(cubie.p, axis, dir).map(Math.round) as Vector;
      cubie.m = cubie.m.map((column) => rotate(column, axis, dir)) as [Vector, Vector, Vector];
    });
    move = null;
    pause = 0.06;
  };

  queue();

  return (
    context: CanvasRenderingContext2D,
    width: number,
    height: number,
    elapsed: number,
    pointer: CanvasPointer,
    palette: CanvasPalette,
  ) => {
    const delta = Math.max(0, Math.min(0.05, last === undefined ? 0.016 : elapsed - last));
    last = elapsed;
    step(delta);
    context.clearRect(0, 0, width, height);

    const yaw = elapsed * 0.18 + (pointer.x - 0.5) * 1.3;
    const pitch = -0.46 + (pointer.y - 0.5) * 0.5;
    const scale = Math.min(width, height) * 0.23;
    const centerX = width / 2;
    const centerY = height / 2;
    const ease = (value: number) =>
      value < 0.5 ? 4 * value * value * value : 1 - Math.pow(-2 * value + 2, 3) / 2;
    const spin = (vector: Vector, axis: number, angle: number): Vector => {
      const cosine = Math.cos(angle);
      const sine = Math.sin(angle);
      const [x, y, z] = vector;
      if (axis === 0) return [x, y * cosine - z * sine, y * sine + z * cosine];
      if (axis === 1) return [x * cosine + z * sine, y, -x * sine + z * cosine];
      return [x * cosine - y * sine, x * sine + y * cosine, z];
    };
    const world = (vector: Vector): Vector => {
      const yawCosine = Math.cos(yaw);
      const yawSine = Math.sin(yaw);
      const pitchCosine = Math.cos(pitch);
      const pitchSine = Math.sin(pitch);
      const x = vector[0] * yawCosine - vector[2] * yawSine;
      const z = vector[0] * yawSine + vector[2] * yawCosine;
      return [x, vector[1] * pitchCosine - z * pitchSine, vector[1] * pitchSine + z * pitchCosine];
    };
    const project = (point: Vector): Vector => {
      const perspective = 8 / (8 - point[2]);
      return [
        centerX + point[0] * scale * perspective,
        centerY + point[1] * scale * perspective,
        point[2],
      ];
    };
    /* Sticker tones are the cube's identity and stay put across themes — they are
       a six-colour scheme, not semantic colour, and they read on either surface.
       They are also consumed numerically below (hex parsed and scaled by shade),
       so they cannot become `var()` references. */
    const tones = ['#efece6', '#a8ada3', '#5ee6a0', '#3f9c74', '#cfd2c9', '#7d847c'];
    const axes: Vector[] = [
      [1, 0, 0],
      [0, 1, 0],
      [0, 0, 1],
    ];
    const quads: Quad[] = [];
    const half = 0.46;

    cubies.forEach((cubie) => {
      const moving = Boolean(move && cubie.p[move.axis] === move.layer);
      const angle = moving ? move!.dir * (Math.PI / 2) * ease(Math.min(move!.t ?? 0, 1)) : 0;
      const centerDepth = world(moving ? spin(cubie.p, move!.axis, angle) : cubie.p)[2];

      for (let face = 0; face < 6; face += 1) {
        const axis = face >> 1;
        const sign = face % 2 ? -1 : 1;
        const localNormal = axes[axis].map((value) => value * sign) as Vector;
        const toWorld = (vector: Vector): Vector =>
          [0, 1, 2].map(
            (index) =>
              cubie.m[0][index] * vector[0] +
              cubie.m[1][index] * vector[1] +
              cubie.m[2][index] * vector[2],
          ) as Vector;
        const normal = toWorld(localNormal);
        const horizontal = toWorld(axes[(axis + 1) % 3]);
        const vertical = toWorld(axes[(axis + 2) % 3]);
        const quadAt = (size: number): Vector[] =>
          [
            [-1, -1],
            [1, -1],
            [1, 1],
            [-1, 1],
          ].map(
            ([a, b]) =>
              [0, 1, 2].map(
                (index) =>
                  cubie.p[index] +
                  normal[index] * half +
                  (horizontal[index] * a + vertical[index] * b) * half * size,
              ) as Vector,
          );
        const screen = (corners: Vector[]) =>
          corners.map((point) => project(world(moving ? spin(point, move!.axis, angle) : point)));
        const points = quadAt(1).map((point) =>
          world(moving ? spin(point, move!.axis, angle) : point),
        );
        const worldNormal = world(moving ? spin(normal, move!.axis, angle) : normal);
        if (worldNormal[2] < 0.03) continue;

        let tone: string | null = null;
        for (let index = 0; index < 3; index += 1) {
          if (
            Math.abs(localNormal[index]) === 1 &&
            Math.abs(cubie.home[index]) === 1 &&
            Math.sign(localNormal[index]) === Math.sign(cubie.home[index])
          ) {
            tone = tones[index * 2 + (localNormal[index] > 0 ? 0 : 1)];
          }
        }
        quads.push({
          pts: points.map(project),
          sticker: screen(quadAt(0.82)),
          depth: centerDepth * 4 + points.reduce((sum, point) => sum + point[2], 0) / 4,
          tone,
          shade: 0.68 + 0.32 * Math.max(0, worldNormal[2]) - 0.12 * worldNormal[1],
        });
      }
    });

    const path = (points: Vector[]) => {
      context.beginPath();
      points.forEach((point, index) => {
        if (index) context.lineTo(point[0], point[1]);
        else context.moveTo(point[0], point[1]);
      });
      context.closePath();
    };

    quads
      .sort((first, second) => first.depth - second.depth)
      .forEach((quad) => {
        /* Plastic body: an arithmetic grey, not a colour literal. Dark keeps the
           near-black 10..22 ramp; light mirrors it into a 245..233 ramp so the
           cube stays a light object with dark stickers rather than a black blob. */
        const body = palette.onLight
          ? Math.round(245 - 12 * quad.shade)
          : Math.round(10 + 12 * quad.shade);
        path(quad.pts);
        context.fillStyle = `rgb(${body},${body + (palette.onLight ? -1 : 1)},${body})`;
        context.fill();
        context.strokeStyle = rgba(palette.shadow, 0.7);
        context.stroke();
        if (!quad.tone) return;
        const color = [1, 3, 5]
          .map((index) => Number.parseInt(quad.tone!.slice(index, index + 2), 16))
          .map((value) => Math.max(0, Math.min(255, Math.round(value * quad.shade))));
        path(quad.sticker);
        context.fillStyle = `rgb(${color.join(',')})`;
        context.fill();
      });
  };
}

export class KomputeCube extends HTMLElement {
  private engine?: CanvasEngine;

  connectedCallback() {
    const canvas = this.querySelector('canvas');
    if (canvas) this.engine = new CanvasEngine(canvas, createCubeDrawer(), surfaceOf(this));
  }

  disconnectedCallback() {
    this.engine?.destroy();
  }
}

if (!customElements.get('kompute-cube')) {
  customElements.define('kompute-cube', KomputeCube);
}
