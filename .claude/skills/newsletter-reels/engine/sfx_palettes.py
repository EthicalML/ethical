"""Alternative SFX palettes for sfx.py, picked with SFX_PALETTE=b|c|d (a, the default, is sfx.py's own voices).

Each palette voices every cue kind sfx.build() knows, on the same bus, at the same times and with the same panning
as palette a, so build() mixes and levels it exactly the same way. Pitched sounds use deg(), the key's pentatonic.

  b  organic / analog      marimba, kalimba and wood-block modal plucks, Karplus-Strong, felt clicks, breathy
                           tape-wobbled air, warm saturated drums. No glassy shimmer.
  c  minimal / clinical    short dry resonant clicks, tiny noise ticks, soft sine thumps, air breaths. No bells.
  d  electronic / textural resonant filter sweeps, bit-crushed square blips, granular stutters, reversed swells,
                           vinyl grit, a deep 808 drop. Sparkles become crushed arpeggios and glitch flutters.
"""

import numpy as np

import music as M
from sfx import EASE, Palette, adsr, mf, tt

SR = M.SR


def modal(f, ratios, amps, decays, d, att=0.0006):
    """A struck object: decaying sine partials at f * ratio."""
    t = tt(d)
    y = sum(a * np.sin(2 * np.pi * f * r * t) * np.exp(-t / dc) for r, a, dc in zip(ratios, amps, decays) if f * r < 16000)
    return y * np.minimum(1, t / att)


def mix(*xs):
    """Sum mono signals of different lengths."""
    y = np.zeros(max(len(x) for x in xs))
    for x in xs:
        y[: len(x)] += x
    return y


def sat(x, k=2.0):
    return np.tanh(k * x) / np.tanh(k)


def crush(x, bits=6, hold=4):
    """Bit depth and sample-rate reduction."""
    q = 2 ** (bits - 1)
    y = np.round(np.repeat(x[::hold], hold)[: len(x)] * q) / q
    return y


def env_hann(n, p=1.0):
    return np.sin(np.pi * np.arange(n) / max(n, 1)) ** p


class Voiced(Palette):
    """A palette that voices whole cues: voice() returns True when it handled the cue."""

    def voice(self, k, e, s, d, put, xpan, lands, FW):
        fn = getattr(self, "c_" + str(k), None)
        if fn is None:
            return False
        self.e, self.put, self.xpan, self.lands, self.FW = e, put, xpan, lands, FW
        fn(e, s, d)
        return True

    def popf(self, name):
        deg = self.deg
        return {
            "pill": deg(4), "input": deg(2), "point": deg(7), "dot": deg(0), "snap": deg(5),
            "core": deg(2, self.low), "disc": deg(0, self.low), "square": deg(4, self.low),
        }.get(name, deg(5))

    def count_ticks(self, e, s, d):
        """The same tick list palette a plays: thinned to >= 30 ms, the last one always kept."""
        to = float(e.get("to", 0) or 0)
        ticks = e.get("ticks")
        if ticks is None and "v" in e:
            ticks = [[s, e["v"]]]
        if ticks is None:
            ease, ticks, last = EASE.get(e.get("ease"), EASE["outCubic"]), [], 0
            for x in np.arange(0, d + 1e-9, 0.001):
                v = int(np.floor(to * ease(min(1, x / d)) + 1e-9))
                if v > last:
                    ticks.append([s + x, v])
                    last = v
        out, last = [], -1.0
        for j, (tk, v) in enumerate(ticks):
            if tk - last < 0.03 and j < len(ticks) - 1:
                continue
            last = tk
            out.append((tk, min(1, float(v) / to) if to else 0.5))
        return out, bool(ticks) and ("to" in e or "d" in e)

    def pan_from_to(self, e):
        return (e.get("from", self.FW / 2) / self.FW) * 2 - 1, (e.get("to", self.FW / 2) / self.FW) * 2 - 1

    def land_index(self, e):
        return self.lands.index(e), max(len(self.lands), 1)


# ---------------------------------------------------------------------------------------------------- b: organic


class Organic(Voiced):
    def felt(self, d=0.012, lo=300, hi=2600, seed=None):
        n = int(d * SR)
        x = M.fftfilt(self.noise(n + 512, seed), M.bpg(lo, hi))[256 : 256 + n]
        return x * adsr(n, 0.0015, d / 3)

    def wood(self, f=900, d=0.09, seed=None):
        y = modal(f, (1, 2.57, 4.21), (1, 0.35, 0.12), (d / 3, d / 8, d / 14), d)
        k = self.felt(0.006, 600, 4000, seed)
        y[: len(k)] += 0.5 * k
        return y

    def marimba(self, f, d=0.9):
        y = modal(f, (1, 3.93, 9.2), (1, 0.22, 0.05), (d / 3.2, d / 14, d / 40), d, 0.001)
        k = self.felt(0.01, 200, 1800)
        y[: len(k)] += 0.25 * k
        return sat(y, 1.2)

    def kalimba(self, f, d=1.2):
        y = modal(f, (1, 5.95, 2.0), (1, 0.16, 0.04), (d / 3.5, d / 25, d / 8), d, 0.0008)
        k = self.felt(0.004, 1500, 6000)
        y[: len(k)] += 0.15 * k
        return y

    def ks(self, f, d=0.6, damp=0.996, seed=None):
        """Karplus-Strong, computed a period at a time."""
        n, p = int(d * SR), max(2, int(SR / f))
        y = np.zeros(n + p + 1)
        y[: p + 1] = M.fftfilt(self.noise(p + 1, seed), M.lpg(5000))
        for a in range(p + 1, n + p + 1, p):
            b = min(a + p, n + p + 1)
            y[a:b] = damp * 0.5 * (y[a - p : b - p] + y[a - p - 1 : b - p - 1])
        y = y[p + 1 :]
        return y / (np.abs(y).max() + 1e-9) * adsr(n, 0.001, d / 2.5)

    def drum(self, f, d=0.5):
        f = self.snap(f)
        t = tt(d)
        y = modal(f, (1, 1.59, 2.14, 2.3), (1, 0.4, 0.25, 0.15), (d / 4, d / 9, d / 12, d / 15), d, 0.0015)
        y *= 1 + 0.25 * np.exp(-t / 0.02)
        k = self.felt(0.02, 150, 1500)
        y[: len(k)] += 0.5 * k
        return sat(y, 2.2)

    def breath(self, d, lo=400, hi=2000, peak=0.4, bw=1.6, seed=None):
        n = int(d * SR)
        y = M.stft_band(self.noise(n, seed), np.geomspace(lo, hi, 48), np.full(48, bw))
        t = np.arange(n) / SR
        y = y * (1 + 0.18 * np.sin(2 * np.pi * 5.3 * t) + 0.08 * np.sin(2 * np.pi * 0.9 * t))  # tape wobble
        u = np.arange(n) / n
        y = y * np.where(u < peak, np.sin(np.pi / 2 * u / peak) ** 2, np.exp(-(u - peak) / (1 - peak) * 4))
        return sat(M.fftfilt(y, M.lpg(6500)) / (np.abs(y).max() + 1e-9), 1.6) * 0.35  # level with palette a's swish

    def whoosh(self, d, s=0.6, dir="side", seed=None):
        d = max(d, 0.25)
        n = int((d + 0.15) * SR)
        f0, f1, pk = {
            "in": (300, 2400, 0.85), "out": (2400, 300, 0.25), "up": (400, 1900, 0.55),
            "down": (1900, 400, 0.5), "side": (600, 1400, 0.5),
        }.get(dir, (600, 1400, 0.5))
        y = self.breath(d + 0.15, f0, f1, pk * d / (d + 0.15), 1.7, seed)
        h = int(0.006 * SR)
        L, R = y, np.r_[np.zeros(h), y[:-h]]
        sw = np.linspace(-0.5, 0.5, n) if dir in ("side", "in") else np.linspace(0.3, -0.3, n)
        return np.stack([L * np.sqrt((1 - sw) / 2), R * np.sqrt((1 + sw) / 2)]) * 5.0 * s

    def c_type(self, e, s, d):
        txt, n, rate = str(e.get("s", "")), int(e.get("n", len(str(e.get("s", ""))))), float(e.get("rate", 0.016))
        for i in range(n):
            if i < len(txt) and txt[i] == " ":
                continue
            self.put("ui", self.felt(0.01, 500 + 300 * (i % 3), 3500, int(s * 1000) + i), s + i * rate,
                     0.14 * (0.6 + 0.4 * self.rng.random()), self.xpan(e) + (i / max(n, 1) - 0.5) * 0.2)
        self.put("ui", self.wood(self.deg(5 + n % 3), 0.06), s + n * rate, 0.04, self.xpan(e))

    def c_slam(self, e, s, d):
        n, st, size = int(e.get("n", len(str(e.get("s", "x"))))), float(e.get("st", 0.026)), float(e.get("size", 90))
        big = size >= 90
        self.put("move", self.breath(n * st + 0.35, 500, 2200 if big else 1600, 0.25, seed=int(s * 997)), s,
                 0.09 if big else 0.05, self.xpan(e), rev=0.12)
        for i in range(0, n, 2 if n > 14 else 1):
            self.put("ui", self.wood(self.deg(i % 5) * 2, 0.04, int(s * 131) + i), s + i * st + 0.05,
                     0.04 if big else 0.025, self.xpan(e) + (i / max(n, 1) - 0.5) * 0.3)
        if size >= 150:
            self.put("hit", self.drum(150 if size > 200 else 190, 0.35), s + 0.06, 0.4, self.xpan(e))

    def c_para(self, e, s, d):
        self.put("move", self.breath(0.35, 600, 1600, 0.3, seed=int(s * 71)), s, 0.08, self.xpan(e))

    def c_pop(self, e, s, d):
        self.put("ui", self.marimba(self.popf(e.get("s")) / 2, 0.35), s, 0.16, self.xpan(e, 0.3), rev=0.08)

    def c_ring(self, e, s, d):
        if e.get("r", 100) < 40:
            return
        self.put("tone", self.kalimba(self.deg(5 + int(e.get("r", 100) > 300) * 2), 1.0), s, 0.05,
                 self.xpan(e, 0.4), rev=0.2)

    def c_heart(self, e, s, d):
        self.put("hit", self.drum(110, 0.3), s, 0.5)

    def c_drop(self, e, s, d):
        for x, a in [(1 / 2.75, 1), (2 / 2.75, 0.35), (2.5 / 2.75, 0.15), (1, 0.06)]:
            self.put("hit", self.wood(self.snap(260), 0.12), s + x * d, 0.45 * a)

    def c_whoosh(self, e, s, d):
        self.put("move", self.whoosh(d, float(e.get("s", 0.6)), e.get("dir", "side"), seed=int(s * 313)),
                 s - (0.02 if e.get("dir") != "in" else 0), 0.22, rev=0.1)

    def c_riser(self, e, s, d):
        d = max(d, 0.3)
        self.put("move", self.breath(d, 300, 2600, 0.97, 1.4, seed=5), s, 0.12, rev=0.15)
        t, gap, j = 0.0, 0.14, 0
        while t < d:  # a marimba roll on root and fifth, accelerating and swelling
            self.put("tone", self.marimba(self.deg(j % 2 * 3, self.low), 0.3), s + t, 0.1 * (0.25 + 0.75 * t / d),
                     (j % 2 - 0.5) * 0.4, rev=0.15)
            t += gap
            gap = max(0.035, gap * 0.9)
            j += 1

    def c_shock(self, e, s, d):
        self.put("move", self.breath(0.55, 250, 1200, 0.08, seed=int(s * 17)), s, 0.1)
        self.put("hit", self.drum(130, 0.3), s, 0.3)

    def c_impact(self, e, s, d):
        st = float(e.get("s", 1.0))
        if st >= 0.95:
            self.put("hit", self.drum(160, 0.6), s, 0.6, rev=0.12)
            self.put("move", self.breath(0.3, 300, 1200, 0.05, seed=int(s * 7)), s, 0.06)
        elif st >= 0.5:
            self.put("hit", self.drum(190, 0.4), s, 0.5 * st, rev=0.1)
        else:
            self.put("hit", self.wood(self.snap(320), 0.12), s, 0.5 * st + 0.1)

    def c_boom(self, e, s, d):
        big = min(1.2, float(e.get("s", 1.2)) / 1.2)
        _, sub = Palette.boom(self, big)
        self.put("hit", self.drum(95, 1.4) + 0.4 * np.r_[self.felt(0.05, 100, 900), np.zeros(int(1.35 * SR))][: int(1.4 * SR)],
                 s, 0.85, rev=0.25)
        n = int(1.6 * SR)
        brush = M.fftfilt(self.noise((2, n), 22), M.bpg(500, 3500)) * adsr(n, 0.01, 0.4)
        self.put("move", brush, s, 0.06 * big, rev=0.2)
        self.put("low", sat(sub, 1.5) * big, s, 0.9)

    def c_flip(self, e, s, d):
        y = np.r_[self.wood(1400, 0.03, 31), np.zeros(int(0.008 * SR)), 0.6 * self.wood(1100, 0.03, 32)]
        n = int(0.12 * SR)
        y = mix(y, M.fftfilt(self.noise(n, 33), M.bpg(900, 4000)) * adsr(n, 0.002, 0.03) * 0.4)
        self.put("ui", y, s, 0.22 if e.get("to") != "ink" else 0.13, rev=0.06)

    def c_sweep(self, e, s, d):
        self.put("move", self.breath(d, 700, 1500, 0.5, seed=41), s, 0.15, -0.3)
        for i in range(5):
            self.put("tone", self.ks(self.deg(i * 2), 0.6, seed=40 + i), s + d * i / 5, 0.07, 0.3, rev=0.2)

    def c_snap(self, e, s, d):
        self.put("ui", np.r_[self.wood(1600, 0.04, 51), np.zeros(200), self.wood(1250, 0.04, 52)], s, 0.3)
        for i in range(8):
            self.put("ui", self.felt(0.006, 800, 3500, 60 + i), s + 0.02 + i * 0.015, 0.06 * (1 - i / 8),
                     (i % 2 - 0.5) * 0.8)

    def c_sparkle(self, e, s, d):
        for i in range(int(e.get("n", 6))):
            self.put("tone", self.kalimba(self.deg(3 + (i * 3) % 7), 0.6), s + i * float(e.get("st", 0.08)), 0.04,
                     np.sin(i * 2.3) * 0.7, rev=0.2)

    def c_draw(self, e, s, d):
        n = int(d * SR)
        g = np.abs(self.noise(n, 44))
        scratch = M.fftfilt(self.noise(n, 43) * (0.4 + M.fftfilt(g, M.lpg(30))), M.bpg(1200, 4000))
        self.put("move", scratch * env_hann(n, 1.5), s, 0.05, -0.2)
        self.put("tone", self.marimba(self.deg(5 if e.get("s") else 3), 0.5), s + d, 0.05, rev=0.15)

    def c_scatter(self, e, s, d):
        nn = int(e.get("n", 70))
        for i in range(0, nn, 2):
            self.put("ui", self.wood(900 + 1400 * self.rng.random(), 0.03, 70 + i), s + d * (i / nn) ** 1.8,
                     0.06 * (1 - i / nn) + 0.01, np.sin(i * 1.7) * 0.9)
        self.put("move", self.whoosh(d, 0.5, "down" if e.get("dir") == "down" else "side", seed=77), s, 0.15)

    def c_strike(self, e, s, d):
        self.put("move", self.breath(d + 0.12, 600, 2600, 0.8, seed=81), s, 0.4, rev=0.08)
        self.put("ui", self.wood(1300, 0.05, 82), s + d, 0.3)

    def c_shimmer(self, e, s, d):
        for i in range(12):
            self.put("tone", self.kalimba(self.deg(3 + (i * 2) % 9), 0.9), s + d * (i / 12) ** 1.3,
                     0.08 * (0.5 + i / 12), np.sin(i * 2.1) * 0.8, rev=0.3)

    def c_bells(self, e, s, d):
        final = bool(e.get("final"))
        for i, m in enumerate([0, 4, 7, 9, 12] if final else [0, 2, 4, 5, 7, 9]):
            self.put("tone", self.marimba(self.deg(m), 1.1), s + i * (0.1 if final else 0.075), 0.13 * (1 - i * 0.08),
                     ((i % 3) - 1) * 0.5, rev=0.25)
        self.put("tone", self.marimba(mf(self.low), 1.6), s, 0.12, 0, rev=0.25)

    def c_line(self, e, s, d):
        self.put("move", self.breath(d, 600, 2000, 0.9, seed=91), s, 0.25)
        self.put("ui", self.wood(self.deg(5), 0.05), s + d, 0.14)

    def c_stream(self, e, s, d):
        for i in range(90):
            self.put("ui", self.felt(0.006, 700, 3000, 100 + i), s + i * 0.045 + self.rng.random() * 0.02,
                     0.035 * min(1, i / 10) * (1 - i / 90), np.sin(i * 2.9) * 0.7)

    def c_flap(self, e, s, d):
        for j in range(int(d * 30)):
            self.put("ui", self.wood(1800 + 300 * (j % 3), 0.02, 200 + j), s + j / 30, 0.04, self.xpan(e, 0.4))
        self.put("ui", self.wood(700, 0.06), s + d, 0.08, self.xpan(e, 0.4))

    def c_burst(self, e, s, d):
        for i in range(0, 90, 2):
            self.put("ui", self.wood(700 + 1800 * self.rng.random(), 0.03, 300 + i), s + 0.35 * (i / 90) ** 2,
                     0.08 * (1 - i / 90) + 0.01, np.sin(i * 2.7) * 0.8)
        self.put("hit", self.drum(240, 0.25), s, 0.35, 0.3)
        self.put("move", self.breath(0.7, 1600, 400, 0.05, seed=301), s, 0.1, 0.3, rev=0.1)

    def c_swirl(self, e, s, d):
        g = float(e.get("s", 1.0))
        p0, p1 = self.pan_from_to(e)
        nn = int(10 + 10 * d)
        for i in range(nn):
            u = i / nn
            self.put("tone", self.kalimba(self.deg(int(u * 7)), 0.5), s + d * u, 0.05 * np.sin(np.pi * (u + 0.05)) * g,
                     p0 + (p1 - p0) * u, rev=0.2)
        self.put("move", self.breath(d, 500, 1500, 0.5, seed=311), s, 0.06 * g, (p0 + p1) / 2, rev=0.15)

    def c_sheen(self, e, s, d):
        g = float(e.get("s", 1.0)) if isinstance(e.get("s"), (int, float)) else 1.0
        self.put("move", self.breath(d, 500, 2200, 0.7, seed=321), s, 0.16 * g, -0.4, rev=0.15)
        self.put("tone", self.marimba(self.deg(7), 0.8), s + d * 0.6, 0.12 * g, 0.4, rev=0.2)

    def c_lock(self, e, s, d):
        self.put("ui", self.wood(self.snap(800), 0.08, 331), s, 0.35)
        self.put("hit", self.drum(220, 0.15), s, 0.15)

    def c_halo(self, e, s, d):
        n = int(d * SR)
        t = np.arange(n) / SR
        env = np.minimum(1, t / 0.6) * np.minimum(1, np.maximum(0, d - t) / 0.4)
        pad = sum(sat(np.sin(2 * np.pi * mf(m) * t + j), 1.8) * (1 + 0.25 * np.sin(2 * np.pi * (0.3 + j * 0.11) * t))
                  for j, m in enumerate((self.low - 12, self.low - 5, self.low))) / 3
        air = M.fftfilt(self.noise(n, 401), M.bpg(300, 1500)) * 0.15
        self.put("tone", np.stack([(pad + air) * env, (np.roll(pad, 400) + air) * env]), s, 0.03, rev=0.3)

    def c_blip(self, e, s, d):
        self.put("tone", self.marimba(self.deg(5), 0.6), s, 0.25, rev=0.2)
        self.put("ui", self.felt(0.01, 600, 3000), s, 0.1)

    def c_count(self, e, s, d):
        ticks, final = self.count_ticks(e, s, d)
        for tk, frac in ticks:
            self.put("ui", self.wood(self.deg(int(frac * 9)), 0.05), tk, 0.07 + 0.05 * frac, self.xpan(e, 0.35))
        if final:
            for m, a in [(5, 0.12), (9, 0.07)]:
                self.put("tone", self.marimba(self.deg(m), 1.0), ticks[-1][0], a, 0, rev=0.2)

    def c_land(self, e, s, d):
        j, n = self.land_index(e)
        self.put("ui", self.wood(self.deg(int(j / n * 10)), 0.05), s, 0.05, self.xpan(e, 0.6))


# ---------------------------------------------------------------------------------------------------- c: minimal


class Minimal(Voiced):
    def rclick(self, f, d=0.004):
        """A filtered click: a resonance that dies in a few ms."""
        t = tt(d * 6)
        return np.sin(2 * np.pi * f * t) * np.exp(-t / d) * np.minimum(1, t / 0.0002)

    def nt(self, d=0.0018, lo=4000, hi=11000, seed=None):
        return self.click(d, lo, hi, seed)

    def thump(self, f, d=0.06):
        t = tt(d * 5)
        return np.sin(2 * np.pi * np.cumsum(f * (1 + 0.3 * np.exp(-t / 0.008))) / SR) * adsr(len(t), 0.002, d)

    def air(self, d, lo=3000, hi=11000, p=2.0, seed=None):
        n = int(d * SR)
        return M.fftfilt(self.noise(n, seed), M.bpg(lo, hi)) * env_hann(n, p) * 0.35

    def whoosh(self, d, s=0.6, dir="side", seed=None):
        d = max(d, 0.2) * 0.7
        n = int(d * SR)
        f0, f1 = {"in": (1500, 6000), "out": (6000, 1500), "up": (2000, 5000), "down": (5000, 2000)}.get(dir, (2500, 4500))
        y = M.stft_band(self.noise(n, seed), np.geomspace(f0, f1, 32), np.full(32, 0.8)) * env_hann(n, 2.5)
        return np.stack([y, y]) * 0.95 * s

    def c_type(self, e, s, d):
        txt, n, rate = str(e.get("s", "")), int(e.get("n", len(str(e.get("s", ""))))), float(e.get("rate", 0.016))
        for i in range(n):
            if i < len(txt) and txt[i] == " ":
                continue
            self.put("ui", self.nt(0.0015, 5000, 11000, int(s * 1000) + i), s + i * rate,
                     0.07 * (0.7 + 0.3 * self.rng.random()), self.xpan(e) + (i / max(n, 1) - 0.5) * 0.1)
        self.put("ui", self.rclick(2400, 0.003), s + n * rate, 0.05, self.xpan(e))

    def c_slam(self, e, s, d):
        n, st, size = int(e.get("n", len(str(e.get("s", "x"))))), float(e.get("st", 0.026)), float(e.get("size", 90))
        for i in range(0, n, 2 if n > 14 else 1):
            self.put("ui", self.rclick(1800 + 60 * (i % 4), 0.002), s + i * st + 0.05, 0.08 if size >= 90 else 0.05,
                     self.xpan(e) + (i / max(n, 1) - 0.5) * 0.2)
        if size >= 150:
            self.put("hit", self.thump(self.snap(170), 0.05), s + 0.06, 0.4, self.xpan(e))

    def c_para(self, e, s, d):
        self.put("move", self.air(0.15, 4000, 10000, seed=int(s * 71)), s, 0.02, self.xpan(e))

    def c_pop(self, e, s, d):
        self.put("ui", self.thump(self.popf(e.get("s")) / 2, 0.025), s, 0.16, self.xpan(e, 0.3))

    def c_ring(self, e, s, d):
        if e.get("r", 100) < 40:
            return
        self.put("ui", self.rclick(self.deg(10), 0.004), s, 0.12, self.xpan(e, 0.4))

    def c_heart(self, e, s, d):
        self.put("hit", self.thump(self.snap(120), 0.05), s, 0.45)

    def c_drop(self, e, s, d):
        for x, a in [(1 / 2.75, 1), (2 / 2.75, 0.35), (2.5 / 2.75, 0.15), (1, 0.06)]:
            self.put("hit", self.thump(self.snap(200), 0.03), s + x * d, 0.45 * a)

    def c_whoosh(self, e, s, d):
        self.put("move", self.whoosh(d, float(e.get("s", 0.6)), e.get("dir", "side"), seed=int(s * 313)),
                 s - (0.02 if e.get("dir") != "in" else 0), 0.2)

    def c_riser(self, e, s, d):
        d = max(d, 0.3)
        n = int(d * SR)
        u = np.arange(n) / n
        self.put("move", M.stft_band(self.noise(n, 5), np.geomspace(2000, 9000, 32), np.full(32, 0.7)) * u**3, s, 0.12)
        t, gap = 0.0, 0.18
        while t < d:  # ticks closing in on the hit
            self.put("ui", self.rclick(2200, 0.0025), s + t, 0.05 * (0.3 + 0.7 * t / d))
            t += gap
            gap = max(0.03, gap * 0.85)

    def c_shock(self, e, s, d):
        self.put("move", self.air(0.3, 2000, 8000, seed=int(s * 17)), s, 0.06)
        self.put("hit", self.thump(self.snap(130), 0.06), s, 0.3)

    def c_impact(self, e, s, d):
        st = float(e.get("s", 1.0))
        self.put("hit", self.thump(self.snap(150 if st >= 0.95 else 190), 0.07 if st >= 0.95 else 0.045), s,
                 0.55 * max(0.35, st))
        self.put("ui", self.rclick(1600, 0.003), s, 0.08 * st)

    def c_boom(self, e, s, d):
        big = min(1.2, float(e.get("s", 1.2)) / 1.2)
        _, sub = Palette.boom(self, big)
        self.put("hit", self.thump(self.snap(110), 0.12), s, 0.8)
        self.put("low", sub * big, s, 0.9)
        self.put("move", self.air(0.4, 3000, 9000, 4, seed=int(s)), s, 0.03)

    def c_flip(self, e, s, d):
        y = np.r_[self.rclick(2600, 0.0025), np.zeros(int(0.01 * SR)), 0.6 * self.rclick(2000, 0.0025)]
        self.put("ui", y, s, 0.2 if e.get("to") != "ink" else 0.12)

    def c_sweep(self, e, s, d):
        self.put("move", self.air(d, 2500, 7000, 1.5, seed=41), s, 0.05, -0.3)

    def c_snap(self, e, s, d):
        self.put("ui", np.r_[self.rclick(3000, 0.002), np.zeros(240), self.rclick(2200, 0.002)], s, 0.3)

    def c_sparkle(self, e, s, d):
        self.put("move", self.air(0.12, 5000, 12000, seed=int(s * 7)), s, 0.04, 0.2)
        self.put("ui", self.rclick(self.deg(10), 0.003), s + 0.05, 0.03, -0.2)

    def c_draw(self, e, s, d):
        self.put("move", self.air(d, 3500, 8000, 1.2, seed=43), s, 0.08, -0.2)
        self.put("ui", self.rclick(2400, 0.003), s + d, 0.05)

    def c_scatter(self, e, s, d):
        nn = int(e.get("n", 70))
        for i in range(0, nn, 3):
            self.put("ui", self.nt(0.0015, 5000, 11000, 70 + i), s + d * (i / nn) ** 1.8, 0.15 * (1 - i / nn) + 0.03,
                     np.sin(i * 1.7) * 0.6)

    def c_strike(self, e, s, d):
        self.put("move", self.air(d + 0.1, 3000, 9000, 1, seed=81), s, 0.12)
        self.put("ui", self.rclick(2000, 0.003), s + d, 0.25)

    def c_shimmer(self, e, s, d):
        self.put("move", self.air(d, 5000, 12000, 1.5, seed=int(s * 9)), s, 0.05)
        for i in range(3):
            self.put("ui", self.rclick(self.deg(10 + i * 2), 0.003), s + d * (0.3 + i * 0.25), 0.02, (i - 1) * 0.5)

    def c_bells(self, e, s, d):
        final = bool(e.get("final"))
        for i, m in enumerate([0, 4, 7] if final else [0, 2, 4]):
            self.put("ui", self.thump(self.deg(m + 5) / 2, 0.04), s + i * 0.09, 0.2, (i - 1) * 0.3)

    def c_line(self, e, s, d):
        self.put("move", self.air(d, 3000, 8000, 1, seed=91), s, 0.06)
        self.put("ui", self.rclick(2400, 0.003), s + d, 0.06)

    def c_stream(self, e, s, d):
        for i in range(0, 90, 2):
            self.put("ui", self.nt(0.0012, 6000, 12000, 100 + i), s + i * 0.045 + self.rng.random() * 0.02,
                     0.025 * min(1, i / 10) * (1 - i / 90), np.sin(i * 2.9) * 0.5)

    def c_flap(self, e, s, d):
        for j in range(int(d * 30)):
            self.put("ui", self.rclick(2800, 0.0015), s + j / 30, 0.03, self.xpan(e, 0.4))
        self.put("ui", self.thump(self.snap(400), 0.02), s + d, 0.08, self.xpan(e, 0.4))

    def c_burst(self, e, s, d):
        for i in range(0, 90, 3):
            self.put("ui", self.nt(0.0015, 4000, 11000, 300 + i), s + 0.25 * (i / 90) ** 2, 0.06 * (1 - i / 90) + 0.01,
                     np.sin(i * 2.7) * 0.7)
        self.put("hit", self.thump(self.snap(220), 0.04), s, 0.3)

    def c_swirl(self, e, s, d):
        g = float(e.get("s", 1.0))
        p0, p1 = self.pan_from_to(e)
        n = int(d * SR)
        y = self.air(d, 3500, 9000, 1.2, seed=311)
        sw = np.linspace(p0, p1, n)
        self.put("move", np.stack([y * np.sqrt((1 - sw) / 2), y * np.sqrt((1 + sw) / 2)]) * 1.414, s, 0.05 * g)

    def c_sheen(self, e, s, d):
        g = float(e.get("s", 1.0)) if isinstance(e.get("s"), (int, float)) else 1.0
        self.put("move", self.air(min(d, 0.35), 4500, 12000, 2, seed=321), s + d * 0.3, 0.15 * g, -0.2)

    def c_lock(self, e, s, d):
        self.put("ui", self.rclick(1800, 0.004), s, 0.3)
        self.put("hit", self.thump(self.snap(200), 0.03), s, 0.2)

    def c_halo(self, e, s, d):
        n = int(d * SR)
        t = np.arange(n) / SR
        env = np.minimum(1, t / 0.6) * np.minimum(1, np.maximum(0, d - t) / 0.4) * (1 + 0.3 * np.sin(2 * np.pi * 0.25 * t))
        y = M.fftfilt(self.noise((2, n), 401), M.bpg(250, 1200))
        self.put("tone", y * env, s, 0.02)

    def c_blip(self, e, s, d):
        self.put("ui", self.rclick(self.deg(5), 0.006), s, 0.35)

    def c_count(self, e, s, d):
        ticks, final = self.count_ticks(e, s, d)
        for tk, frac in ticks:
            self.put("ui", self.rclick(self.deg(int(frac * 9)), 0.002), tk, 0.06 + 0.04 * frac, self.xpan(e, 0.35))
        if final:
            self.put("ui", self.thump(self.deg(5) / 2, 0.05), ticks[-1][0], 0.12)

    def c_land(self, e, s, d):
        j, n = self.land_index(e)
        self.put("ui", self.thump(self.deg(int(j / n * 10)) / 2, 0.015), s, 0.05, self.xpan(e, 0.6))


# ---------------------------------------------------------------------------------------------------- d: electronic


class Electronic(Voiced):
    def sq(self, f, d=0.08, bits=4, hold=6, drop=0.0):
        t = tt(d)
        ph = 2 * np.pi * np.cumsum(f * (1 + drop * np.exp(-t / 0.01))) / SR
        return crush(np.sign(np.sin(ph)) * 1.8 * adsr(len(t), 0.0005, d / 4), bits, hold)

    def reso(self, d, f0, f1, bw=0.22, src="noise", seed=None, base=55.0):
        """A resonant band sweep over noise or a saw."""
        n = int(d * SR)
        x = self.noise(n, seed) if src == "noise" else M._polyblep_saw(base, n) + 0.3 * self.noise(n, seed)
        y = M.stft_band(x, np.geomspace(f0, f1, 64), np.full(64, bw))
        return y / (np.sqrt(np.mean(y**2)) + 1e-9) * 0.3  # 10 dB over palette a's swish: a narrow band reads quieter

    def stutter(self, x, slice_d=0.02, reps=5, decay=0.75):
        k = int(slice_d * SR)
        g = x[:k] * np.r_[np.ones(k - 40), np.linspace(1, 0, 40)]
        return np.concatenate([g * decay**i for i in range(reps)])

    def grit(self, n, seed=None, rate=40):
        r = np.random.default_rng(seed)
        y = r.standard_normal(n) * 0.04
        idx = r.integers(0, n, max(1, int(rate * n / SR)))
        y[idx] += r.choice([-1, 1], len(idx)) * r.uniform(0.3, 1, len(idx))
        return M.fftfilt(y, M.bpg(800, 9000))

    def k808(self, f, d=0.5, drive=2.5):
        t = tt(d)
        y = np.sin(2 * np.pi * np.cumsum(f * (1 + 1.5 * np.exp(-t / 0.03))) / SR) * adsr(len(t), 0.001, d / 3)
        return sat(y, drive)

    def whoosh(self, d, s=0.6, dir="side", seed=None):
        d = max(d, 0.25)
        n = int((d + 0.15) * SR)
        f0, f1, pk = {
            "in": (500, 5000, 0.85), "out": (5000, 500, 0.2), "up": (700, 4000, 0.55),
            "down": (4000, 600, 0.5), "side": (900, 3000, 0.5),
        }.get(dir, (900, 3000, 0.5))
        y = self.reso(d + 0.15, f0, f1, 0.3, seed=seed)
        u = np.arange(n) / SR / d
        y = y * np.where(u < pk, (u / pk) ** 2, np.exp(-(u - pk) * 6)) + self.grit(n, seed) * 0.2
        y = crush(y, 8, 2)
        sw = np.linspace(-0.6, 0.6, n) if dir in ("side", "in") else np.linspace(0.4, -0.4, n)
        return np.stack([y * np.sqrt((1 - sw) / 2), y * np.sqrt((1 + sw) / 2)]) * 2.5 * s

    def c_type(self, e, s, d):
        txt, n, rate = str(e.get("s", "")), int(e.get("n", len(str(e.get("s", ""))))), float(e.get("rate", 0.016))
        for i in range(n):
            if i < len(txt) and txt[i] == " ":
                continue
            self.put("ui", self.sq(self.deg(10 + (i * 3) % 5), 0.012, 3, 8), s + i * rate,
                     0.05 * (0.6 + 0.4 * self.rng.random()), self.xpan(e) + (i / max(n, 1) - 0.5) * 0.3)
        self.put("ui", self.sq(self.deg(9 + n % 3), 0.05, 4, 4), s + n * rate, 0.03, self.xpan(e))

    def c_slam(self, e, s, d):
        n, st, size = int(e.get("n", len(str(e.get("s", "x"))))), float(e.get("st", 0.026)), float(e.get("size", 90))
        big = size >= 90
        dd = n * st + 0.35
        y = self.reso(dd, 600, 5000 if big else 3500, 0.25, seed=int(s * 997)) * env_hann(int(dd * SR), 1)
        self.put("move", y, s, 0.035 if big else 0.018, self.xpan(e), rev=0.1)
        for i in range(0, n, 2 if n > 14 else 1):
            self.put("ui", self.sq(self.deg(5 + i % 5), 0.015, 3, 10), s + i * st + 0.05, 0.04 if big else 0.025,
                     self.xpan(e) + (i / max(n, 1) - 0.5) * 0.3)
        if size >= 150:
            self.put("hit", self.k808(self.snap(150 if size > 200 else 190), 0.25), s + 0.06, 0.35, self.xpan(e))

    def c_para(self, e, s, d):
        n = int(0.3 * SR)
        self.put("move", self.reso(0.3, 1500, 3500, 0.3, seed=int(s * 71)) * env_hann(n, 2), s, 0.02, self.xpan(e))

    def c_pop(self, e, s, d):
        self.put("ui", self.sq(self.popf(e.get("s")) / 2, 0.07, 5, 3, drop=1.0), s, 0.12, self.xpan(e, 0.3), rev=0.1)

    def c_ring(self, e, s, d):
        if e.get("r", 100) < 40:
            return
        self.put("tone", self.stutter(self.sq(self.deg(5 + int(e.get("r", 100) > 300) * 2), 0.04, 4, 6), 0.03, 4, 0.6),
                 s, 0.08, self.xpan(e, 0.4), rev=0.2)

    def c_heart(self, e, s, d):
        self.put("hit", self.k808(self.snap(120), 0.3), s, 0.5)

    def c_drop(self, e, s, d):
        for x, a in [(1 / 2.75, 1), (2 / 2.75, 0.35), (2.5 / 2.75, 0.15), (1, 0.06)]:
            self.put("hit", crush(self.k808(self.snap(180), 0.12), 6, 3), s + x * d, 0.45 * a)

    def c_whoosh(self, e, s, d):
        self.put("move", self.whoosh(d, float(e.get("s", 0.6)), e.get("dir", "side"), seed=int(s * 313)),
                 s - (0.02 if e.get("dir") != "in" else 0), 0.22, rev=0.12)

    def c_riser(self, e, s, d):
        d = max(d, 0.3)
        n = int(d * SR)
        u = np.arange(n) / n
        hit = self.reso(1.2, 300, 6000, 0.25, src="saw", seed=5, base=mf(self.low - 24))[::-1]  # a reversed swell
        y = self.reso(d, 300, 7000, 0.2, src="saw", seed=6, base=mf(self.low - 24)) * u**2.5
        y[-min(n, len(hit)) :] += hit[-min(n, len(hit)) :] * 0.5
        self.put("move", crush(y, 7, 2), s, 0.3, rev=0.15)

    def c_shock(self, e, s, d):
        y = self.reso(0.4, 3000, 400, 0.3, seed=int(s * 17)) * adsr(int(0.4 * SR), 0.002, 0.1)
        self.put("move", y, s, 0.035)
        self.put("hit", self.k808(self.snap(130), 0.3), s, 0.3)

    def c_impact(self, e, s, d):
        st = float(e.get("s", 1.0))
        n = int(0.3 * SR)
        burst = crush(M.fftfilt(self.noise(n, 11), M.bpg(600, 6000)) * adsr(n, 0.0005, 0.03), 4, 6)
        if st >= 0.95:
            self.put("hit", mix(self.k808(self.snap(160), 0.5), 0.5 * burst), s, 0.55, rev=0.15)
            self.put("move", self.grit(int(0.6 * SR), 12, 80) * adsr(int(0.6 * SR), 0.002, 0.2), s, 0.2)
        elif st >= 0.5:
            self.put("hit", mix(self.k808(self.snap(190), 0.3), 0.4 * burst), s, 0.5 * st, rev=0.1)
        else:
            self.put("hit", crush(self.k808(self.snap(220), 0.1), 5, 4), s, 0.5 * st + 0.1)

    def c_boom(self, e, s, d):
        big = min(1.2, float(e.get("s", 1.2)) / 1.2)
        f0 = min((self.root * 2.0**o for o in range(-3, 2)), key=lambda f: abs(np.log(f / 42)))
        t = tt(2.6)
        st = np.maximum(0, t - 0.045)
        drop = sat(np.sin(2 * np.pi * np.cumsum(f0 * (1 + 2.0 * np.exp(-st / 0.12))) / SR) * (t > 0.045)
                   * np.minimum(1, st / 0.01) * np.exp(-st / 0.7), 2.2)
        self.put("low", drop * big, s, 1.0)
        n = int(0.25 * SR)
        punch = crush(M.fftfilt(self.noise(n, 21), M.bpg(300, 5000)) * adsr(n, 0.0005, 0.04), 4, 4)
        self.put("hit", punch + 0.6 * self.k808(self.snap(220), 0.25)[:n], s, 0.7, rev=0.2)
        tail = self.reso(1.2, 4000, 200, 0.25, seed=int(s)) * adsr(int(1.2 * SR), 0.005, 0.35)  # a tape-stop sweep
        self.put("move", tail + self.grit(len(tail), 23, 60) * 0.1, s, 0.03 * big, rev=0.2)

    def c_flip(self, e, s, d):
        y = self.stutter(crush(self.click(0.012, 2000, 10000, 31), 4, 3), 0.009, 3, 0.65)
        self.put("ui", y, s, 0.6 if e.get("to") != "ink" else 0.35, rev=0.06)

    def c_sweep(self, e, s, d):
        n = int(d * SR)
        self.put("move", self.reso(d, 300, 4000, 0.18, src="saw", seed=41, base=mf(self.low - 12)) * env_hann(n, 1.5),
                 s, 0.15, -0.3)

    def c_snap(self, e, s, d):
        self.put("ui", self.stutter(crush(self.click(0.02, 2000, 12000, 51), 4, 2), 0.012, 4, 0.7), s, 0.3)

    def c_sparkle(self, e, s, d):
        for i in range(int(e.get("n", 6))):
            self.put("tone", self.sq(self.deg(5 + (i * 3) % 7), 0.05, 4, 5), s + i * float(e.get("st", 0.08)) * 0.6,
                     0.04, np.sin(i * 2.3) * 0.7, rev=0.2)

    def c_draw(self, e, s, d):
        n = int(d * SR)
        y = self.reso(d, 400, 2500 if e.get("s") else 1500, 0.2, src="saw", seed=43, base=mf(self.low)) * env_hann(n, 1)
        self.put("tone", crush(y, 6, 3), s, 0.08, -0.2, rev=0.15)

    def c_scatter(self, e, s, d):
        nn = int(e.get("n", 70))
        for i in range(0, nn, 3):
            g = crush(self.click(0.01, 1500, 9000, 70 + i), int(3 + i % 4), 4)
            self.put("ui", self.stutter(g, 0.006, 2, 0.5), s + d * (i / nn) ** 1.8, 0.07 * (1 - i / nn) + 0.01,
                     np.sin(i * 1.7) * 0.9)
        self.put("move", self.whoosh(d, 0.5, "down" if e.get("dir") == "down" else "side", seed=77), s, 0.12)

    def c_strike(self, e, s, d):
        n = int((d + 0.12) * SR)
        self.put("move", self.reso(d + 0.12, 800, 6000, 0.25, seed=81) * env_hann(n, 0.8), s, 0.18, rev=0.1)
        self.put("ui", self.sq(self.deg(10), 0.03, 4, 4), s + d, 0.2)

    def c_shimmer(self, e, s, d):
        for i in range(16):
            self.put("tone", self.sq(self.deg(5 + (i * 2) % 9), 0.06, 3, 6), s + d * (i / 16) ** 1.3,
                     0.03 * (0.5 + i / 16), np.sin(i * 2.1) * 0.8, rev=0.25)

    def c_bells(self, e, s, d):
        final = bool(e.get("final"))
        notes = [0, 4, 7, 9, 12, 7, 12] if final else [0, 2, 4, 5, 7, 9]
        for i, m in enumerate(notes):
            self.put("tone", self.sq(self.deg(m), 0.18, 5, 4), s + i * 0.065, 0.09 * (1 - i * 0.06),
                     ((i % 3) - 1) * 0.5, rev=0.3)
        n = int(1.5 * SR)
        self.put("tone", sat(np.sin(2 * np.pi * mf(self.low) * tt(1.5)), 1.5) * adsr(n, 0.005, 0.4), s, 0.06, rev=0.3)
        self.put("move", self.grit(n, 501, 30) * adsr(n, 0.01, 0.6), s, 0.15)

    def c_line(self, e, s, d):
        n = int(d * SR)
        self.put("move", self.reso(d, 700, 4000, 0.25, seed=91) * env_hann(n, 1), s, 0.08)
        self.put("ui", self.sq(self.deg(10), 0.03, 4, 4), s + d, 0.05)

    def c_stream(self, e, s, d):
        for i in range(90):
            self.put("ui", self.sq(self.deg(8 + int(self.rng.integers(0, 7))), 0.012, 3, 6),
                     s + i * 0.045 + self.rng.random() * 0.02, 0.02 * min(1, i / 10) * (1 - i / 90), np.sin(i * 2.9) * 0.7)

    def c_flap(self, e, s, d):
        for j in range(int(d * 30)):
            self.put("ui", crush(self.click(0.003, 2500, 9000, 200 + j), 4, 3), s + j / 30, 0.1, self.xpan(e, 0.4))
        self.put("ui", self.sq(self.deg(5), 0.04, 4, 4), s + d, 0.06, self.xpan(e, 0.4))

    def c_burst(self, e, s, d):
        base = crush(self.click(0.05, 1000, 9000, 300), 3, 6)
        for i in range(10):  # a glitch flutter: the same crushed grain, retriggered faster and faster
            self.put("ui", base[: int(0.03 * SR)], s + 0.3 * (i / 10) ** 1.6, 0.12 * (1 - i / 12), np.sin(i * 2.7) * 0.8)
        self.put("hit", self.k808(self.snap(240), 0.2), s, 0.3, 0.3)

    def c_swirl(self, e, s, d):
        g = float(e.get("s", 1.0))
        p0, p1 = self.pan_from_to(e)
        nn = int(20 + 20 * d)
        src = self.reso(0.4, 1500, 5000, 0.2, src="saw", seed=311, base=mf(self.low))
        for i in range(nn):  # granular: short grains of a resonant saw, panned from -> to
            u = i / nn
            a = int(self.rng.integers(0, len(src) - int(0.03 * SR)))
            gr = crush(src[a : a + int(0.03 * SR)] * env_hann(int(0.03 * SR)), 5, 3)
            self.put("tone", gr, s + d * u, 0.12 * np.sin(np.pi * (u + 0.02)) * g, p0 + (p1 - p0) * u, rev=0.2)

    def c_sheen(self, e, s, d):
        g = float(e.get("s", 1.0)) if isinstance(e.get("s"), (int, float)) else 1.0
        n = int(d * SR)
        swell = (self.reso(d, 6000, 1500, 0.3, seed=321) * adsr(n, 0.002, d / 4))[::-1]  # reversed, peaks at the end
        self.put("move", swell, s, 0.15 * g, -0.4, rev=0.2)
        self.put("tone", self.stutter(self.sq(self.deg(7), 0.04, 4, 4), 0.025, 3, 0.6), s + d, 0.04 * g, 0.4, rev=0.2)

    def c_lock(self, e, s, d):
        self.put("ui", crush(self.click(0.008, 1500, 9000, 331), 4, 2), s, 0.3)
        self.put("hit", self.k808(self.snap(200), 0.12), s, 0.25)

    def c_halo(self, e, s, d):
        n = int(d * SR)
        t = np.arange(n) / SR
        env = np.minimum(1, t / 0.6) * np.minimum(1, np.maximum(0, d - t) / 0.4)
        pad = sum(M._polyblep_saw(mf(m) * (1 + det), n) for m in (self.low - 12, self.low - 5) for det in (-0.004, 0.004))
        pad = M.stft_band(pad, 400 + 300 * np.sin(np.linspace(0, 2 * np.pi, 16)) ** 2, np.full(16, 0.6)) / 3
        y = crush(pad, 8, 2) + self.grit(n, 402, 20) * 0.5
        self.put("tone", np.stack([y * env, np.roll(y, 300) * env]), s, 0.1, rev=0.3)

    def c_blip(self, e, s, d):
        self.put("ui", self.sq(self.deg(10) / 2, 0.08, 4, 4, drop=0.6), s, 0.12, rev=0.3)

    def c_count(self, e, s, d):
        ticks, final = self.count_ticks(e, s, d)
        for tk, frac in ticks:
            self.put("ui", self.sq(self.deg(int(frac * 9)), 0.02, 3, 6), tk, 0.06 + 0.04 * frac, self.xpan(e, 0.35))
        if final:
            for j, m in enumerate((10, 14)):
                self.put("tone", self.sq(self.deg(m) / 2, 0.15, 5, 3), ticks[-1][0] + j * 0.06, 0.08, 0, rev=0.3)

    def c_land(self, e, s, d):
        j, n = self.land_index(e)
        self.put("ui", self.sq(self.deg(5 + int(j / n * 10)), 0.02, 4, 4, drop=0.5), s, 0.04, self.xpan(e, 0.6))


PALETTES = {"b": Organic, "c": Minimal, "d": Electronic}
