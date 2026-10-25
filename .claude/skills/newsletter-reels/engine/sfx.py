"""SFX stem for a z-motion-reel film: work/cues.json + work/music.json + work/music.mp3 -> work/sfx.mp3.

Every sound is synthesised from the cue sheet the film itself emits, so picture and sound cannot disagree.
Palette: keynote UI, not arcade. Pitched sounds sit on the pentatonic scale of the music's key.

  type    one tight tick per character + a soft enter     slam    airy swish + letter ratchet (+ a thock if huge)
  para    a quiet swish                                   pop     soft pitched pop (s: pill/input/point/dot/core/...)
  ring    a small FM bell (skipped for tiny rings)        whoosh  band-swept air, dir in/out/up/down/side
  riser   noise + glide into the next hit                 impact  mid-body thud, three tiers by strength (no sub)
  boom    punch + crack + sub-drop + crash shimmer        flip    double shutter snap on a colour-field flip
  sheen   airy glint + two high bells                     burst   a spray of crackles + a woody knock
  swirl   granular glassy grains panned from -> to        count   pitched ticks climbing with the value, a bell on the last
  land    micro-pops rising in pitch                      bells   a glassy FM arpeggio (final: true for the lock-up)
  blip    a bell + tick                                   halo    a quiet breathing pad (so a held end has no dead air)
  lock    bright click + air tail                         strike  swish + click at the end of the line
  draw    a pen glide                                     flap    split-flap rattle and settle
  also: heart, drop, shock, sweep, snap, sparkle, scatter, shimmer, line, stream

Mixing: buses high-passed (ui 250, move 180, tone 200, hit 110 Hz); only the booms' sub-drop reaches below
~110 Hz, and it is ducked by the music's kick. The stem sits TARGET_UNDER dB under the music (integrated),
<= -2 dBTP, and a sum limiter pulls the stem down only where music + stem, as the player mixes them, would
pass -2 dBFS. The stem is the same length as the music. Unknown cue kinds are skipped with a warning.
"""

import hashlib
import json
import os
import sys
import time
from pathlib import Path

import numpy as np

sys.path.insert(0, str(Path(__file__).resolve().parent))
import music as M  # noqa: E402

SR = M.SR
TARGET_UNDER = 7.0  # dB under the music, integrated
CEIL_DBTP = -2.0
PLAYER_GAIN = 0.8  # engine.js MIX: music 1, sfx 1, master .8 -> each stem reaches the output at 0.8
BUS_HP = {"ui": 250, "move": 180, "tone": 200, "hit": 110}
BUS_GAIN = {"ui": 1.6, "move": 1.25, "tone": 1.25, "hit": 0.8, "low": 0.7}  # booms own the peaks, not the loudness
SAMPLE_GAIN = 10 ** (-4 / 20)
EASE = {
    "linear": lambda x: x,
    "outCubic": lambda x: 1 - (1 - x) ** 3,
    "outQuad": lambda x: 1 - (1 - x) ** 2,
    "outExpo": lambda x: 1 if x >= 1 else 1 - 2 ** (-10 * x),
    "inOutCubic": lambda x: 4 * x**3 if x < 0.5 else 1 - (-2 * x + 2) ** 3 / 2,
    "inOutSine": lambda x: -(np.cos(np.pi * x) - 1) / 2,
}

tt = lambda d: np.arange(int(d * SR)) / SR
mf = lambda m: 440.0 * 2 ** ((m - 69) / 12)


def adsr(n, a, d):
    t = np.arange(n) / SR
    return np.minimum(1, t / max(a, 1e-4)) * np.exp(-t / d)


class Palette:
    """The voices. Pitched ones use deg(k): the k-th pentatonic step above the key's base note."""

    def __init__(self, tonic, mode, seed, root_hz=55.0):
        self.root = root_hz
        self.scale = [0, 3, 5, 7, 10] if mode == "minor" else [0, 2, 4, 7, 9]
        self.base = 72 + tonic if tonic <= 4 else 60 + tonic
        self.low = self.base - 12
        self.rng = np.random.default_rng(seed)

    def snap(self, hz):
        """The pentatonic tone of the key nearest hz, so thuds and booms are in key too."""
        m = 69 + 12 * np.log2(hz / 440)
        cands = [self.base % 12 + 12 * o + d for o in range(-1, 11) for d in self.scale]
        return mf(min(cands, key=lambda c: abs(c - m)))

    def deg(self, k, base=None):
        b = self.base if base is None else base
        k = int(k)
        return mf(b + 12 * (k // 5) + self.scale[k % 5])

    def noise(self, n, seed=None):
        r = np.random.default_rng(seed) if seed is not None else self.rng
        return r.standard_normal(n)

    def click(self, d=0.006, lo=2500, hi=9000, seed=None):
        n = int(d * SR)
        x = M.fftfilt(self.noise(n + 512, seed), M.bpg(lo, hi))[256 : 256 + n]
        return x * adsr(n, 0.0003, d / 4)

    def tick(self, f=3200, d=0.035):
        t = tt(d)
        c = np.zeros(len(t))
        k = self.click(0.004)[: len(t)]
        c[: len(k)] = k
        return np.sin(2 * np.pi * f * t) * adsr(len(t), 0.0005, d / 5) + 0.5 * c

    def pop(self, f=900, d=0.09):
        t = tt(d)
        ph = 2 * np.pi * np.cumsum(f * (1 + 0.8 * np.exp(-t / 0.006))) / SR
        return np.sin(ph) * adsr(len(t), 0.0015, d / 4) + 0.25 * np.sin(ph * 2.01) * adsr(len(t), 0.001, d / 9)

    def thock(self, f=170, d=0.14):
        f = self.snap(f)
        t = tt(d)
        body = np.sin(2 * np.pi * np.cumsum(f * (1 + 1.2 * np.exp(-t / 0.01))) / SR) * adsr(len(t), 0.001, d / 5)
        c = np.zeros(len(t))
        k = self.click(0.005, 800, 5000)[: len(t)]
        c[: len(k)] = k
        return body + 0.35 * np.sin(2 * np.pi * f * 3.3 * t) * adsr(len(t), 0.0008, 0.012) + 0.4 * c

    def swish(self, d, f0, f1, bw=0.9, peak=0.35, seed=None):
        n = int(d * SR)
        y = M.stft_band(self.noise(n, seed), np.geomspace(f0, f1, 64), np.full(64, bw))
        t = np.arange(n) / n
        return y * np.where(t < peak, (t / peak) ** 2, np.exp(-(t - peak) / (1 - peak) * 4))

    def whoosh(self, d, s=0.6, dir="side", seed=None):
        d = max(d, 0.25)
        n = int((d + 0.15) * SR)
        shape = {
            "in": (700, 5200, 0.85),
            "out": (5000, 700, 0.25),
            "up": (900, 3800, 0.55),
            "down": (3600, 800, 0.5),
            "side": (1400, 2600, 0.5),
        }
        f0, f1, pk = shape.get(dir, shape["side"])
        bw = np.linspace(1.4, 0.8, 64) if dir == "in" else np.full(64, 1.1)
        y = M.stft_band(self.noise(n, seed), np.geomspace(f0, f1, 64), bw)
        t = np.arange(n) / SR / d
        y = y * np.where(
            t < pk, np.sin(np.pi / 2 * np.clip(t / pk, 0, 1)) ** 2.2, np.exp(-(t - pk) * (9 if dir == "in" else 4))
        )
        h = int(0.004 * SR)
        L, R = y, np.r_[np.zeros(h), y[:-h]]  # Haas-wide
        sw = np.linspace(-0.5, 0.5, n) if dir in ("side", "in") else np.linspace(0.3, -0.3, n)
        return np.stack([L * np.sqrt((1 - sw) / 2), R * np.sqrt((1 + sw) / 2)]) * 1.414 * s

    def riser(self, d):
        n = int(d * SR)
        u = np.arange(n) / SR / d
        x = M.stft_band(self.noise(n, 5), np.geomspace(600, 7000, 64), np.full(64, 1.2)) * u**2.6
        glide = sum(
            g * np.sin(2 * np.pi * np.cumsum(mf(self.low + st) * 2 ** (u * 2.0)) / SR)
            for st, g in ((0, 0.25), (7, 0.12))
        )
        return x + M.fftfilt(glide * u**3, M.hpg(200))

    def impact(self, s):
        t = tt(0.45)
        n = len(t)
        body = np.sin(2 * np.pi * np.cumsum(self.snap(200) * (1 + 1.4 * np.exp(-t / 0.015))) / SR) * adsr(
            n, 0.001, 0.05
        )
        crack = M.fftfilt(self.noise(n, 11), M.bpg(700, 6000)) * adsr(n, 0.0005, 0.015)
        air = M.fftfilt(self.noise(n, 12), M.bpg(2500, 12000)) * adsr(n, 0.01, 0.12) * 0.25
        return (body * 0.9 + crack * 0.6 + air) * s

    def boom(self, big=1.0):
        t = tt(2.8)
        n = len(t)
        punch = np.sin(2 * np.pi * np.cumsum(self.snap(220) * (1 + 2 * np.exp(-t / 0.012))) / SR) * adsr(n, 0.001, 0.07)
        crack = M.fftfilt(self.noise(n, 21), M.bpg(500, 7000)) * adsr(n, 0.0005, 0.02)
        st = np.maximum(0, t - 0.045)  # the sub-drop starts 45 ms late, so the music's kick transient goes first
        f0 = min(
            (self.root * 2.0**o for o in range(-3, 2)), key=lambda f: abs(np.log(f / 42))
        )  # the song root near 42 Hz
        sub = (
            np.sin(2 * np.pi * np.cumsum(f0 + 1.5 * f0 * np.exp(-st / 0.25)) / SR)
            * (t > 0.045)
            * np.minimum(1, st / 0.02)
            * np.exp(-st / 0.32)
        )
        shim = M.fftfilt(self.noise((2, n), 22), M.bpg(4500, 13000)) * adsr(n, 0.004, 0.55)
        metal = (
            sum(np.sin(2 * np.pi * f * t + p) for f, p in [(3170, 0), (4410, 1), (5290, 2), (6720, 0.5)])
            * adsr(n, 0.002, 0.35)
            * 0.05
        )
        mono = punch * 0.8 + crack * 0.55
        return np.stack([mono, mono]) + (shim * 0.32 + metal) * big, sub * big

    def flip(self):
        t = tt(0.16)
        n = len(t)
        snap = np.r_[
            self.click(0.004, 3000, 12000, 31), np.zeros(int(0.011 * SR)), self.click(0.004, 2000, 9000, 32) * 0.6
        ]
        y = M.stft_band(self.noise(n, 33), np.geomspace(7000, 1800, 32), np.full(32, 0.7)) * adsr(n, 0.002, 0.04) * 0.6
        y[: len(snap)] += snap
        return y

    def bell(self, f, d=2.2, idx=2.2, ratio=3.5):
        t = tt(d)
        return np.sin(2 * np.pi * f * t + idx * np.exp(-t / 0.35) * np.sin(2 * np.pi * f * ratio * t)) * adsr(
            len(t), 0.002, d / 4.5
        )

    def heart(self):
        t = tt(0.25)
        return np.sin(2 * np.pi * np.cumsum(self.snap(120) * (1 + 0.8 * np.exp(-t / 0.02))) / SR) * adsr(
            len(t), 0.004, 0.05
        )


def build(work):
    """work/cues.json + music.json + music.mp3 -> work/sfx.mp3. Returns a small report dict."""
    work = Path(work)
    t_start = time.time()
    cues = json.loads((work / "cues.json").read_text())
    events = cues["events"] if isinstance(cues, dict) else cues
    FW = float(cues.get("w", 1920)) if isinstance(cues, dict) else 1920.0  # film width, for panning
    info = json.loads((work / "music.json").read_text())
    music = M.read_audio(work / "music.mp3")
    N = music.shape[1]
    tonic, mode = M.parse_key(info.get("key", "A minor"))
    P = Palette(tonic, mode, M._seed(info.get("key", "")) + len(events), float(info.get("root_hz", 55.0)))
    rng = P.rng
    deg = P.deg
    bus = {k: np.zeros((2, N), np.float32) for k in ("ui", "move", "hit", "low", "tone")}
    send = np.zeros((2, N), np.float32)

    sample_root = Path(os.environ["SFX_LIB"]).expanduser().resolve() if os.environ.get("SFX_LIB") else None
    samples = {}
    sample_rng = None
    sample_last = {}
    sample_used = {}
    if sample_root:
        try:
            sample_index = json.loads((sample_root / "index.json").read_text())
            samples = {
                role: sorted(sample_root / item["file"] for item in items if (sample_root / item["file"]).is_file())
                for role, items in sample_index.get("roles", {}).items()
            }
            seed_text = work.name + "\n" + json.dumps(cues, sort_keys=True, separators=(",", ":"))
            sample_rng = np.random.default_rng(int(hashlib.sha256(seed_text.encode()).hexdigest()[:16], 16))
        except (OSError, ValueError, TypeError, KeyError) as exc:
            print(f"sfx: warning: could not load sample library {sample_root}: {exc}; using synthesis")
            sample_root = None

    def put(b, sig, t0, gain=1.0, pan=0.0, rev=0.0):
        i = int(round(t0 * SR))
        sig = np.atleast_2d(sig)
        if i < 0:
            sig, i = sig[:, -i:], 0
        n = min(sig.shape[-1], N - i)
        if n <= 0:
            return
        pan = float(np.clip(pan, -1, 1))
        g = np.array([np.sqrt((1 - pan) / 2), np.sqrt((1 + pan) / 2)]) * 1.414
        s = sig[:, :n] * gain * (g[:, None] if sig.shape[0] == 1 else 1)
        bus[b][:, i : i + n] += s
        if rev:
            send[:, i : i + n] += s * rev

    def xpan(e, amt=0.55):
        return ((e.get("x", FW / 2) / FW) * 2 - 1) * amt

    def put_sample(kind, role, b, t0, gain=1.0, pan=0.0, rev=0.0, max_d=None, also=None):
        choices = samples.get(role, [])
        if not choices:
            return False
        previous = sample_last.get((kind, role))
        available = [path for path in choices if path != previous] or choices
        path = available[int(sample_rng.integers(len(available)))]
        sample_last[(kind, role)] = path
        relative = path.relative_to(sample_root).as_posix()
        if relative not in sample_used.setdefault(kind, []):
            sample_used[kind].append(relative)
        sig = M.read_audio(path).mean(axis=0)
        if max_d and len(sig) > int(max_d * SR):
            sig = sig[: int(max_d * SR)].copy()
            fade = min(len(sig), int(0.006 * SR))
            sig[-fade:] *= np.linspace(1, 0, fade)
        put(b, sig, t0, gain * SAMPLE_GAIN, pan, rev)
        if also:
            put(also[0], sig, t0, also[1] * SAMPLE_GAIN, also[2], also[3])
        return True

    popf = {
        "pill": deg(4),
        "input": deg(2),
        "point": deg(7),
        "dot": deg(0),
        "snap": deg(5),
        "core": deg(2, P.low),
        "disc": deg(0, P.low),
        "square": deg(4, P.low),
    }
    counts, unknown = {}, {}
    lands = sorted((e for e in events if e.get("k") == "land"), key=lambda e: e["t"])
    for e in events:
        k, s = e.get("k"), float(e.get("t", 0))
        d = float(e.get("d", 0.6))
        counts[k] = counts.get(k, 0) + 1
        if k == "type":
            txt, n, rate = str(e.get("s", "")), int(e.get("n", len(str(e.get("s", ""))))), float(e.get("rate", 0.016))
            if samples.get("type"):
                for i in range(n):
                    if i < len(txt) and txt[i] == " ":
                        continue
                    put_sample(
                        k, "type", "ui", s + i * rate, 0.09 * (0.6 + 0.4 * sample_rng.random()),
                        xpan(e) + (i / max(n, 1) - 0.5) * 0.2, max_d=min(0.09, rate * 1.8),
                    )
            else:
                for i in range(n):
                    if i < len(txt) and txt[i] == " ":
                        continue
                    put(
                        "ui",
                        P.click(0.005, 3000, 8000, seed=int(s * 1000) + i),
                        s + i * rate,
                        0.09 * (0.6 + 0.4 * rng.random()),
                        xpan(e) + (i / max(n, 1) - 0.5) * 0.2,
                    )
                put("ui", P.tick(deg(9 + n % 3), 0.04), s + n * rate, 0.025, xpan(e))
        elif k == "slam":
            n, st, size = (
                int(e.get("n", len(str(e.get("s", "x"))))),
                float(e.get("st", 0.026)),
                float(e.get("size", 90)),
            )
            big = size >= 90
            if samples.get("whoosh") and samples.get("impact"):
                put_sample(k, "whoosh", "move", s, 0.10 if big else 0.05, xpan(e), rev=0.15)
                put_sample(k, "impact", "hit", s + 0.06, 0.35 if size >= 150 else 0.18, xpan(e), rev=0.12)
                continue
            put(
                "move",
                P.swish(n * st + 0.35, 1500, 6000 if big else 4500, 0.8, 0.25, seed=int(s * 997)),
                s,
                0.10 if big else 0.05,
                xpan(e),
                rev=0.15,
            )
            for i in range(0, n, 2 if n > 14 else 1):
                put(
                    "ui",
                    P.click(0.003, 4000, 11000, seed=int(s * 131) + i),
                    s + i * st + 0.05,
                    0.05 if big else 0.03,
                    xpan(e) + (i / max(n, 1) - 0.5) * 0.3,
                )
            if size >= 150:
                put("hit", P.thock(150 if size > 200 else 190), s + 0.06, 0.35, xpan(e))
        elif k == "para":
            if not put_sample(k, "whoosh", "move", s, 0.025, xpan(e)):
                put("move", P.swish(0.35, 2500, 5000, 0.9, 0.3, seed=int(s * 71)), s, 0.025, xpan(e))
        elif k == "pop":
            if not put_sample(k, "ui", "ui", s, 0.16, xpan(e, 0.3), rev=0.12):
                put("ui", P.pop(popf.get(e.get("s"), deg(5))), s, 0.16, xpan(e, 0.3), rev=0.12)
        elif k == "ring":
            if e.get("r", 100) < 40:
                continue
            if not put_sample(k, "sheen", "tone", s, 0.035, xpan(e, 0.4), rev=0.35):
                put(
                    "tone",
                    P.bell(deg(10 + int(e.get("r", 100) > 300) * 2), 0.9, 0.6, 2.0),
                    s,
                    0.035,
                    xpan(e, 0.4),
                    rev=0.35,
                )
        elif k == "heart":
            put("hit", P.heart(), s, 0.5)
        elif k == "drop":  # outBounce contacts
            for x, a in [(1 / 2.75, 1), (2 / 2.75, 0.35), (2.5 / 2.75, 0.15), (1, 0.06)]:
                put("hit", P.thock(180), s + x * d, 0.45 * a)
        elif k == "whoosh":
            if not put_sample(k, "whoosh", "move", s - (0.02 if e.get("dir") != "in" else 0), 0.22, rev=0.12):
                put(
                    "move",
                    P.whoosh(d, float(e.get("s", 0.6)), e.get("dir", "side"), seed=int(s * 313)),
                    s - (0.02 if e.get("dir") != "in" else 0),
                    0.22,
                    rev=0.12,
                )
        elif k == "riser":
            if not put_sample(k, "riser", "move", s, 0.18, rev=0.2, max_d=max(d, 0.3)):
                put("move", P.riser(max(d, 0.3)), s, 0.18, rev=0.2)
        elif k == "shock":
            put("move", P.swish(0.55, 400, 2500, 1.2, 0.08, seed=int(s * 17)), s, 0.10)
            put("hit", P.thock(130, 0.2), s, 0.25)
        elif k == "impact":
            st = float(e.get("s", 1.0))
            if put_sample(k, "impact", "hit", s, 0.55 * max(0.3, st), rev=0.18):
                pass
            elif st >= 0.95:
                put("hit", P.impact(1), s, 0.55, rev=0.18)
            elif st >= 0.5:
                put("hit", P.impact(0.6), s, 0.5 * st, rev=0.12)
            else:
                put("hit", P.thock(180, 0.12), s, 0.5 * st + 0.1)
        elif k == "boom":
            if samples.get("boom"):
                put_sample(k, "boom", "hit", s, 0.75, rev=0.3, also=("low", 0.9, 0.0, 0.0))
                continue
            st, sub = P.boom(min(1.2, float(e.get("s", 1.2)) / 1.2))
            put("hit", st, s, 0.75, rev=0.3)
            put("low", sub, s, 0.9)
            put("move", P.swish(0.9, 9000, 3000, 1.0, 0.02, seed=int(s)), s, 0.08, rev=0.3)
        elif k == "flip":
            if not put_sample(k, "glitch", "ui", s, 0.22 if e.get("to") != "ink" else 0.13, rev=0.08):
                put("ui", P.flip(), s, 0.22 if e.get("to") != "ink" else 0.13, rev=0.08)
        elif k == "sweep":
            n = int(d * SR)
            t = np.arange(n) / SR
            put(
                "move",
                M.stft_band(P.noise(n, 41), np.geomspace(1200, 3200, 32), np.full(32, 0.5))
                * np.sin(np.pi * t / d) ** 2,
                s,
                0.06,
                -0.3,
            )
            put(
                "tone",
                np.sin(2 * np.pi * np.cumsum(np.geomspace(deg(5), deg(10), n)) / SR) * np.sin(np.pi * t / d) ** 3,
                s,
                0.012,
                0.3,
                rev=0.3,
            )
        elif k == "snap":
            put("ui", np.r_[P.click(0.004, 2000, 12000, 51), np.zeros(200), P.click(0.003, 5000, 12000, 52)], s, 0.3)
            for i in range(12):
                put(
                    "ui",
                    P.click(0.003, 5000, 12000, 60 + i),
                    s + 0.01 + i * 0.012,
                    0.05 * (1 - i / 12),
                    (i % 2 - 0.5) * 0.8,
                )
        elif k == "sparkle":
            for i in range(int(e.get("n", 6))):
                put(
                    "tone",
                    P.tick(deg(8 + (i * 3) % 7), 0.05),
                    s + i * float(e.get("st", 0.08)),
                    0.03,
                    np.sin(i * 2.3) * 0.7,
                    rev=0.3,
                )
        elif k == "draw":
            n = int(d * SR)
            t = np.arange(n) / SR
            env = np.sin(np.pi * np.clip(t / d, 0, 1)) ** 1.5
            put(
                "tone",
                np.sin(2 * np.pi * np.cumsum(np.geomspace(deg(0), deg(5 if e.get("s") else 3), n)) / SR) * env,
                s,
                0.03,
                rev=0.3,
            )
            put(
                "move",
                M.stft_band(P.noise(n, 43), np.geomspace(2500, 5000, 16), np.full(16, 0.4)) * env,
                s,
                0.025,
                -0.2,
            )
        elif k == "scatter":
            nn = int(e.get("n", 70))
            for i in range(nn):
                put(
                    "ui",
                    P.click(0.003, 3500, 11000, 70 + i),
                    s + d * (i / nn) ** 1.8,
                    0.05 * (1 - i / nn) + 0.01,
                    np.sin(i * 1.7) * 0.9,
                )
            put("move", P.whoosh(d, 0.5, "down" if e.get("dir") == "down" else "side", seed=77), s, 0.15)
        elif k == "strike":
            if not put_sample(k, "whoosh", "move", s, 0.22, rev=0.1, max_d=d + 0.12):
                put("move", P.swish(d + 0.12, 2000, 9000, 0.6, 0.8, seed=81), s, 0.22, rev=0.1)
                put("ui", P.click(0.006, 1500, 9000, 82), s + d, 0.35)
        elif k == "shimmer":
            for i in range(22):
                put(
                    "tone",
                    P.bell(deg(10 + (i * 2) % 9), 1.1, 1.2, 2.76),
                    s + d * (i / 22) ** 1.3,
                    0.03 * (0.5 + i / 22),
                    np.sin(i * 2.1) * 0.8,
                    rev=0.5,
                )
        elif k == "bells":
            if put_sample(k, "sheen", "tone", s, 0.10, rev=0.6):
                continue
            final = bool(e.get("final"))
            for i, m in enumerate([0, 4, 7, 9, 12] if final else [0, 2, 4, 5, 7, 9]):
                put(
                    "tone",
                    P.bell(deg(m + 5), 2.6, 2.4),
                    s + i * (0.1 if final else 0.075),
                    0.10 * (1 - i * 0.08),
                    ((i % 3) - 1) * 0.5,
                    rev=0.6,
                )
            put("tone", P.bell(mf(P.low), 3.5, 1.2, 2.0), s, 0.09, 0, rev=0.6)
        elif k == "line":
            put("move", P.swish(d, 1500, 5500, 0.7, 0.9, seed=91), s, 0.1)
            put("ui", P.tick(deg(10), 0.05), s + d, 0.06)
        elif k == "stream":
            for i in range(90):
                put(
                    "ui",
                    P.click(0.002, 5000, 12000, 100 + i),
                    s + i * 0.045 + rng.random() * 0.02,
                    0.02 * min(1, i / 10) * (1 - i / 90),
                    np.sin(i * 2.9) * 0.7,
                )
        elif k == "flap":
            for j in range(int(d * 30)):
                put("ui", P.click(0.0025, 2500, 9000, 200 + j), s + j / 30, 0.03, xpan(e, 0.4))
            put("ui", P.thock(900, 0.04), s + d, 0.06, xpan(e, 0.4))
        elif k == "burst":
            if put_sample(k, "glitch", "ui", s, 0.22, rev=0.12):
                continue
            for i in range(90):
                put(
                    "ui",
                    P.click(0.003, 3000, 12000, 300 + i),
                    s + 0.35 * (i / 90) ** 2,
                    0.07 * (1 - i / 90) + 0.01,
                    np.sin(i * 2.7) * 0.8,
                )
            put("hit", P.thock(240, 0.12), s, 0.3, 0.3)
            put("move", P.swish(0.7, 7000, 1500, 0.9, 0.05, seed=301), s, 0.1, 0.3, rev=0.15)
        elif k == "swirl":
            g = float(e.get("s", 1.0))
            if put_sample(k, "sheen", "tone", s, 0.07 * g, rev=0.35, max_d=d):
                continue
            p0, p1 = (e.get("from", FW / 2) / FW) * 2 - 1, (e.get("to", FW / 2) / FW) * 2 - 1
            nn = int(60 + 90 * d)
            for i in range(nn):
                u = i / nn
                f = deg(8 + int(u * 7) + (i * 3) % 3) * (1 + 0.01 * rng.standard_normal())
                put(
                    "tone",
                    P.tick(f, 0.06),
                    s + d * u + rng.random() * 0.02,
                    0.016 * np.sin(np.pi * u) ** 0.8 * g,
                    p0 + (p1 - p0) * u + 0.25 * np.sin(i * 1.3),
                    rev=0.35,
                )
            n = int(d * SR)
            t = np.arange(n) / SR
            put(
                "move",
                M.stft_band(P.noise(n, 311), np.geomspace(1800, 5500, 64), np.full(64, 0.6))
                * np.sin(np.pi * t / d) ** 1.5,
                s,
                0.05 * g,
                (p0 + p1) / 2,
                rev=0.2,
            )
        elif k == "sheen":
            g = float(e.get("s", 1.0)) if isinstance(e.get("s"), (int, float)) else 1.0
            if not put_sample(k, "sheen", "tone", s, 0.07 * g, -0.4, rev=0.35, max_d=d):
                put("move", P.swish(d, 3500, 11000, 0.6, 0.7, seed=321), s, 0.07 * g, -0.4, rev=0.2)
                for j, m in enumerate((12, 14)):
                    put("tone", P.bell(deg(m), 1.4, 0.8, 2.0), s + d * 0.6 + j * 0.06, 0.035 * g, 0.4, rev=0.5)
        elif k == "lock":
            if not put_sample(k, "ui", "ui", s, 0.3, rev=0.2):
                put("ui", P.click(0.006, 2000, 10000, 331), s, 0.3)
                put("move", P.swish(0.5, 9000, 2500, 0.9, 0.02, seed=332), s, 0.08, rev=0.3)
        elif k == "halo":
            if put_sample(k, "drone", "tone", s, 0.025, rev=0.4, max_d=d):
                continue
            n = int(d * SR)
            t = np.arange(n) / SR
            env = np.minimum(1, t / 0.6) * np.minimum(1, np.maximum(0, d - t) / 0.4)
            notes = (P.low, P.low + 7, P.low + 12, P.low + 19)
            pad = (
                sum(
                    np.sin(2 * np.pi * mf(m) * t + j) * (1 + 0.3 * np.sin(2 * np.pi * (0.4 + j * 0.13) * t))
                    for j, m in enumerate(notes)
                )
                / 4
            )
            put("tone", np.stack([pad * env, np.roll(pad, 300) * env]), s, 0.025, rev=0.4)
        elif k == "blip":
            if not put_sample(k, "ui", "ui", s, 0.12, rev=0.4):
                put("tone", P.bell(deg(10), 1.6, 0.8, 2.0), s, 0.12, rev=0.6)
                put("ui", P.tick(deg(10), 0.06), s, 0.08)
        elif (
            k == "count"
        ):  # pitched ticks climbing the scale with the value, thinned to >= 30 ms, a bell on the final value
            to = float(e.get("to", 0) or 0)
            ticks = e.get("ticks")
            if ticks is None and "v" in e:
                ticks = [[s, e["v"]]]
            if ticks is None:  # expand from the easing, like engine.js does
                ease, ticks, last = EASE.get(e.get("ease"), EASE["outCubic"]), [], 0
                for x in np.arange(0, d + 1e-9, 0.001):
                    v = int(np.floor(to * ease(min(1, x / d)) + 1e-9))
                    if v > last:
                        ticks.append([s + x, v])
                        last = v
            last = -1.0
            for j, (tk, v) in enumerate(ticks):
                if tk - last < 0.03 and j < len(ticks) - 1:
                    continue
                last = tk
                frac = min(1, float(v) / to) if to else 0.5
                if not put_sample(k, "ui", "ui", tk, 0.07 + 0.05 * frac, xpan(e, 0.35), max_d=0.05):
                    put("ui", P.tick(deg(int(frac * 9)), 0.03), tk, 0.07 + 0.05 * frac, xpan(e, 0.35))
            if not samples.get("ui") and ticks and ("to" in e or "d" in e):
                for m, a in [(10, 0.12), (14, 0.07)]:
                    put("tone", P.bell(deg(m), 1.8, 1.4), ticks[-1][0], a, 0, rev=0.4)
        elif k == "land":
            j = lands.index(e)
            f = deg(5 + int(j / max(len(lands), 1) * 10))
            if not put_sample(k, "ui", "ui", s, 0.028, xpan(e, 0.6), max_d=0.06):
                put("ui", P.pop(f * (1 + 0.02 * rng.standard_normal()), 0.03), s, 0.028, xpan(e, 0.6))
        else:
            unknown[k] = unknown.get(k, 0) + 1
    for k, n in unknown.items():
        print(f"sfx: warning: skipped {n} '{k}' cue(s): unknown kind")
    if sample_used and os.environ.get("SFX_REPORT_SAMPLES"):
        print("sfx samples:")
        for kind, paths in sorted(sample_used.items()):
            print(f"  {kind} -> {', '.join(paths)}")

    # ---- mix: carve, duck the sub under the music's kick, reverb, level
    stem = {b: M.fftfilt(bus[b].astype(np.float64), M.hpg(fc, 2)) for b, fc in BUS_HP.items()}
    low = M.fftfilt(bus["low"].astype(np.float64), M.bpg(30, 120, 2))
    kick = np.abs(M.fftfilt(music.mean(0), M.bpg(35, 110, 2)))
    w = int(0.004 * SR)
    kick = np.convolve(kick, np.ones(w) / w, "same")
    blk = 64
    eb = np.pad(kick, (0, -len(kick) % blk)).reshape(-1, blk).max(1)
    fb, a, rb = np.empty_like(eb), 0.0, np.exp(-blk / (0.09 * SR))
    for i, v in enumerate(eb.tolist()):  # peak follower, 90 ms release
        a = max(v, a * rb)
        fb[i] = a
    env = np.repeat(fb, blk)[:N]
    low = low * (1 - 0.95 * np.clip(env / (np.percentile(fb, 95) + 1e-9), 0, 1) ** 0.7)
    dry = sum(stem[b] * BUS_GAIN[b] for b in stem) + low * BUS_GAIN["low"]
    ir = [M.make_ir(1.8, s, [(300, 1500, 1.6), (1500, 5000, 1.3), (5000, 12000, 0.6)]) for s in (5, 9)]
    snd = M.fftfilt(send.astype(np.float64), M.bpg(400, 7000, 2))
    mix = dry + 0.35 * np.stack([M.conv(snd[0], ir[0]), M.conv(snd[1], ir[1])])
    mix -= mix.mean(axis=1, keepdims=True)
    music_lufs = info.get("lufs") or M.loudness(music)
    target = music_lufs - TARGET_UNDER
    # sum limiter headroom: wherever (music + stem) * PLAYER_GAIN would pass -2 dBFS, the stem gives way there
    C = 10 ** (-2.3 / 20) / PLAYER_GAIN  # 0.3 dB of margin for the mp3 overshoot
    head = np.maximum(C - np.abs(music).max(0), 0)
    raw = mix

    def level(gain_db):
        """The stem at gain_db, true-peak limited, then pulled down wherever music + stem would clip together."""
        y = M.limiter(raw * 10 ** (gain_db / 20), CEIL_DBTP - 0.5)
        pk = np.abs(y).max(0)
        req = np.ones(N)
        m = np.abs(music + y).max(0) > C
        req[m] = np.clip(head[m] / np.maximum(pk[m], 1e-9), 0, 1)
        rp = np.pad(req, (w, w), constant_values=1)
        mn = np.lib.stride_tricks.sliding_window_view(rp, 2 * w + 1).min(axis=1)
        g = np.minimum(np.convolve(np.pad(mn, (w, 0), constant_values=1), np.ones(w) / w, "valid")[:N], mn)
        return (
            y * g,
            f"stem pulled down in {np.mean(g < 0.999) * 100:.2f}% of samples, deepest {20 * np.log10(g.min() + 1e-9):.1f} dB",
        )

    # Solve the gain on the raw stem, never on an already-limited one: limiting a sparse stem (a few booms, many quiet
    # ticks) lowers its gated loudness by more than the gain reduction, so re-levelling the limited stem compounds the
    # loss (a sparse film used to land ~13 dB under). Secant search in dB: loudness(level(g)) = target.
    sum_info, lu0 = "no events", M.loudness(raw)
    if lu0 > -69:
        g0, g1 = target - lu0, None
        mix, sum_info = level(g0)
        e0 = M.loudness(mix) - target
        for _ in range(6):
            if abs(e0) < 0.3:
                break
            g1 = g0 - e0 if g1 is None else g1
            mix, sum_info = level(g1)
            e1 = M.loudness(mix) - target
            slope = (e1 - e0) / (g1 - g0) if abs(g1 - g0) > 1e-6 else 1.0
            g0, e0, g1 = g1, e1, g1 - e1 / max(slope, 0.2)
        sum_info += f"; limiter peak reduction {20 * np.log10(np.abs(raw).max() + 1e-12) + g0 - CEIL_DBTP + 0.5:.1f} dB"
    out = work / "sfx.mp3"
    for _ in range(3):  # measure the file that ships: mp3 adds a little overshoot
        M.write_mp3(out, mix)
        back = M.read_audio(out, N)
        tp = M.true_peak_db(back)
        if tp <= CEIL_DBTP:
            break
        mix = mix * 10 ** ((CEIL_DBTP - 0.1 - tp) / 20)
    lu = M.loudness(back)
    comb = (music + back) * PLAYER_GAIN
    rep = {
        "events": len(events),
        "kinds": counts,
        "skipped": unknown,
        "lufs": round(lu, 2),
        "true_peak_db": round(tp, 2),
        "under_music_db": round(music_lufs - lu, 2),
        "combined_lufs": round(M.loudness(comb), 2),
        "combined_peak_dbfs": round(20 * np.log10(np.abs(comb).max() + 1e-12), 2),
        "sum_limiter": sum_info,
    }
    print(
        f"sfx: {len(events)} events, {rep['lufs']} LUFS ({rep['under_music_db']} dB under the music), {rep['true_peak_db']} dBTP; {sum_info}; built in {time.time() - t_start:.1f}s"
    )
    return rep


if __name__ == "__main__":
    build(Path(sys.argv[1]))
