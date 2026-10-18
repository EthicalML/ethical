"""Music library for z-motion-reel. A film's score (<work>/score.py) imports it and composes the track for that film's
beats.json; `reel.py music <slug>` runs the score. music.md in this directory is the guide and the API table.

The library holds building blocks, never an arrangement:
  timing     plan(beats) -> scenes on bar lines, beat/bar/sixteenth, any beats_per_bar (meter "3/4", "7/8", ...)
  theory     parse_key, SCALES, chord, roman, progression, voice, degree, nearest_tone, bass_note
  drums      kick (the approved punchy kit: sub tuned to the root, long body, click), snare, clap, hat, shaker, tom, crash
  voices     bass, sub, supersaw, pad, pluck, fm_bell, lead, piano, epiano
  fx         riser, reverse_cymbal, sub_impact
  mix        Bus, drum_bus (room + parallel compression + low shelf), sidechain, gate, filter_sweep, band, reverb,
             pingpong, widen, mono_low, mix
  master     master (glue, saturation, true-peak limiter), loudness (our own BS.1770-4), write -> music.mp3 + music.json

Film time = song time: bar 1 starts at t = 0 and every scene starts on a bar line. Everything is deterministic: seed
the score's randomness with rng(P), which comes from the title. Pure numpy + soundfile (which writes the mp3 through
its bundled libsndfile). sfx.py reuses the DSP helpers from here.
"""

import hashlib
import json
import time
from pathlib import Path

import numpy as np
import soundfile as sf

SR = 44100
TARGET_LUFS, CEIL_DBTP = -14.0, -1.0
mtof = lambda m: 440.0 * 2 ** ((np.asarray(m, float) - 69) / 12)

# ------------------------------------------------------------------ DSP helpers (shared with sfx.py)


def _nfft(n):
    return 1 << int(np.ceil(np.log2(max(n, 2))))


def fftfilt(x, gain_fn):
    """Zero-phase static filter along the last axis: multiply the spectrum by gain_fn(freqs)."""
    n = x.shape[-1]
    m = _nfft(n)
    return np.fft.irfft(np.fft.rfft(x, m, axis=-1) * gain_fn(np.fft.rfftfreq(m, 1 / SR)), m, axis=-1)[..., :n]


def lpg(fc, o=2):
    return lambda f: 1 / np.sqrt(1 + (f / fc) ** (2 * o))


def hpg(fc, o=2):
    return lambda f: 1 / np.sqrt(1 + (fc / np.maximum(f, 1e-3)) ** (2 * o))


def bpg(lo, hi, o=2):
    return lambda f: lpg(hi, o)(f) * hpg(lo, o)(f)


def conv(x, ir):
    """Linear FFT convolution, truncated to len(x)."""
    n = x.shape[-1]
    m = _nfft(n + len(ir))
    return np.fft.irfft(np.fft.rfft(x, m, axis=-1) * np.fft.rfft(ir, m), m, axis=-1)[..., :n]


def env(n, att, dec):
    t = np.arange(n) / SR
    return np.minimum(1, t / max(att, 1e-4)) * np.exp(-t / dec)


def shift(x, d):
    y = np.zeros_like(x)
    y[..., d:] = x[..., : x.shape[-1] - d]
    return y


def stft_band(x, fc, bw):
    """Time-varying band-pass by masking an STFT. fc (Hz) and bw (octaves) are curves over the sound."""
    F, H = 1024, 256
    w = np.hanning(F)
    n = len(x)
    pad = np.r_[np.zeros(F), x, np.zeros(F)]
    X = np.fft.rfft(np.lib.stride_tricks.sliding_window_view(pad, F)[::H] * w, axis=1)
    f = np.fft.rfftfreq(F, 1 / SR)
    m = len(X)
    c = np.interp(np.linspace(0, 1, m), np.linspace(0, 1, len(fc)), fc)
    b = np.interp(np.linspace(0, 1, m), np.linspace(0, 1, len(bw)), bw)
    M = np.exp(-((np.log2(np.maximum(f, 20)[None] / c[:, None]) / b[:, None]) ** 2))
    y = np.fft.irfft(X * M, n=F, axis=1) * w
    out = np.zeros(len(pad) + F)
    for k in range(m):
        out[k * H : k * H + F] += y[k]
    return out[F : F + n] / (np.sum(w**2) / H)


def make_ir(dur, seed, bands, pre=0.018):
    """Stereo-decorrelated reverb IR from band-shaped, exponentially decaying noise (no metallic combs)."""
    r = np.random.default_rng(seed)
    n = int(dur * SR)
    t = np.arange(n) / SR
    ir = np.zeros(n)
    for lo, hi, rt in bands:
        ir += fftfilt(r.standard_normal(n), bpg(lo, hi, 2)) * np.exp(-6.9 * t / rt)
    ir *= np.minimum(1, t / 0.01)
    ir = shift(ir, int(pre * SR))
    for d in (0.007, 0.011, 0.017, 0.023, 0.031):
        ir[int((d + r.random() * 0.004) * SR)] += 0.04 * r.choice([-1, 1])
    return ir / np.sqrt(np.sum(ir**2))


def _biquad_mag(f, b, a):
    z = np.exp(-2j * np.pi * f / SR)
    return np.abs((b[0] + b[1] * z + b[2] * z * z) / (a[0] + a[1] * z + a[2] * z * z))


def _kweight(f):
    # BS.1770-4 pre-filter (high shelf) and RLB high-pass, derived for any sample rate (pyloudnorm's constants)
    G, fc, Q = 3.999843853973347, 1681.974450955533, 0.7071752369554196
    A, w0 = 10 ** (G / 40), 2 * np.pi * fc / SR
    al, c, sA = np.sin(w0) / (2 * Q), np.cos(w0), np.sqrt(10 ** (G / 40))
    shelf = _biquad_mag(
        f,
        [
            A * ((A + 1) + (A - 1) * c + 2 * sA * al),
            -2 * A * ((A - 1) + (A + 1) * c),
            A * ((A + 1) + (A - 1) * c - 2 * sA * al),
        ],
        [(A + 1) - (A - 1) * c + 2 * sA * al, 2 * ((A - 1) - (A + 1) * c), (A + 1) - (A - 1) * c - 2 * sA * al],
    )
    fc, Q = 38.13547087602444, 0.5003270373238773
    w0 = 2 * np.pi * fc / SR
    al, c = np.sin(w0) / (2 * Q), np.cos(w0)
    hp = _biquad_mag(f, [(1 + c) / 2, -(1 + c), (1 + c) / 2], [1 + al, -2 * c, 1 - al])
    return shelf * hp


def loudness(x):
    """Integrated loudness (LUFS, BS.1770-4) of a (2, n) or (n,) float signal."""
    x = np.atleast_2d(x)
    y = fftfilt(x, _kweight)
    blk, hop = int(0.4 * SR), int(0.1 * SR)
    if y.shape[1] < blk:
        return -70.0
    cs = np.concatenate([np.zeros((y.shape[0], 1)), np.cumsum(y**2, axis=1)], axis=1)
    st = np.arange(0, y.shape[1] - blk + 1, hop)
    z = ((cs[:, st + blk] - cs[:, st]) / blk).sum(0)
    lk = -0.691 + 10 * np.log10(z + 1e-20)
    z = z[lk > -70]
    if not len(z):
        return -70.0
    rel = -0.691 + 10 * np.log10(z.mean()) - 10
    z = z[-0.691 + 10 * np.log10(z) > rel]
    return float(-0.691 + 10 * np.log10(z.mean()))


def tp_env(x, ch=1 << 17, ov=512):
    """Per-sample true peak (4x oversampled, max over channels), computed in chunks."""
    x = np.atleast_2d(x)
    n = x.shape[-1]
    out = np.zeros(n)
    for a in range(0, n, ch):
        lo, hi = max(0, a - ov), min(n, a + ch + ov)
        seg = x[:, lo:hi]
        up = np.abs(np.fft.irfft(np.fft.rfft(seg, axis=-1), n=seg.shape[-1] * 4, axis=-1) * 4).max(0)
        up = up.reshape(-1, 4).max(1)
        out[a : min(n, a + ch)] = up[a - lo : a - lo + min(ch, n - a)]
    return out


def true_peak_db(x):
    return float(20 * np.log10(tp_env(x).max() + 1e-12))


def limiter(x, ceil_db, look=0.003, release=0.06, blk=32):
    """True-peak limiter: 4x-oversampled detection, look-ahead, block-wise release."""
    n = x.shape[-1]
    w = int(look * SR)
    req = np.minimum(1, 10 ** (ceil_db / 20) / np.maximum(tp_env(x), 1e-9))
    rp = np.pad(req, (w, w), constant_values=1)
    mn = np.lib.stride_tricks.sliding_window_view(rp, 2 * w + 1).min(axis=1)
    nb = -(-n // blk)
    bm = np.pad(mn, (0, nb * blk - n), constant_values=1).reshape(nb, blk).min(1)
    rel = 1 - np.exp(-blk / (release * SR))
    gb = np.empty(nb)
    g = 1.0
    for i, v in enumerate(bm.tolist()):
        g = v if v < g else g + (v - g) * rel
        gb[i] = g
    g = np.repeat(gb, blk)[:n]
    g = np.convolve(np.pad(g, (blk, blk), mode="edge"), np.ones(2 * blk) / (2 * blk), "same")[blk : blk + n]
    return x * np.minimum(g, mn)


def write_mp3(path, x):
    sf.write(
        str(path),
        np.clip(x.T, -1, 1).astype(np.float32),
        SR,
        format="MP3",
        subtype="MPEG_LAYER_III",
        compression_level=0.1,
        bitrate_mode="CONSTANT",
    )


def read_audio(path, n=None):
    y, sr = sf.read(str(path), always_2d=True, dtype="float64")
    y = y.T
    if y.shape[0] == 1:
        y = np.vstack([y, y])
    if sr != SR:  # never expected (we write both files), but keep lengths honest
        idx = np.arange(int(y.shape[1] * SR / sr)) * sr / SR
        y = np.stack([np.interp(idx, np.arange(y.shape[1]), c) for c in y])
    if n is not None:
        y = np.pad(y, ((0, 0), (0, max(0, n - y.shape[1]))))[:, :n]
    return y


# ------------------------------------------------------------------ theory

NOTE = {"C": 0, "D": 2, "E": 4, "F": 5, "G": 7, "A": 9, "B": 11}
SCALES = {
    "major": [0, 2, 4, 5, 7, 9, 11],
    "minor": [0, 2, 3, 5, 7, 8, 10],
    "dorian": [0, 2, 3, 5, 7, 9, 10],
    "phrygian": [0, 1, 3, 5, 7, 8, 10],
    "lydian": [0, 2, 4, 6, 7, 9, 11],
    "mixolydian": [0, 2, 4, 5, 7, 9, 10],
    "harmonic": [0, 2, 3, 5, 7, 8, 11],
    "pent_major": [0, 2, 4, 7, 9],
    "pent_minor": [0, 3, 5, 7, 10],
    "blues": [0, 3, 5, 6, 7, 10],
}
QUALITY = {
    "M": [0, 4, 7],
    "m": [0, 3, 7],
    "dim": [0, 3, 6],
    "aug": [0, 4, 8],
    "sus2": [0, 2, 7],
    "sus4": [0, 5, 7],
    "6": [0, 4, 7, 9],
    "m6": [0, 3, 7, 9],
    "7": [0, 4, 7, 10],
    "M7": [0, 4, 7, 11],
    "m7": [0, 3, 7, 10],
    "9": [0, 4, 7, 10, 14],
    "M9": [0, 4, 7, 11, 14],
    "m9": [0, 3, 7, 10, 14],
    "add9": [0, 4, 7, 14],
    "madd9": [0, 3, 7, 14],
}
ROMAN = ["I", "II", "III", "IV", "V", "VI", "VII"]


def parse_key(s):
    """'A minor', 'F# major', 'Bb dorian', 'Am' -> (tonic pitch class 0-11, mode name in SCALES). Unreadable -> A, major."""
    parts = (s or "A minor").strip().replace("-", " ").split()
    name, mode = parts[0], "major"
    if len(parts) > 1:
        w = parts[1].lower()
        mode = "minor" if w.startswith("min") else "major" if w.startswith("maj") else w if w in SCALES else "major"
    elif len(name) > 1 and name.endswith("m"):
        name, mode = name[:-1], "minor"
    pc = NOTE.get(name[0].upper(), 9)
    for acc in name[1:]:
        pc += 1 if acc in "#♯" else -1 if acc in "b♭" else 0
    return pc % 12, mode


def chord(root_pc, q="M"):
    """Pitch classes of a chord: q is a QUALITY name (M, m, 7, M7, m7, sus2, sus4, dim, add9, m9, ...)."""
    return [(root_pc + i) % 12 for i in QUALITY[q]]


def roman(numeral, tonic, mode="major"):
    """'i', 'VI', 'bVII', 'V7', 'ii7', 'IVM7', 'Isus4' -> (root pitch class, quality). Degrees count in the key's own
    7-note scale (so in A minor VI is F); upper case is major, lower case minor; a b or # prefix shifts the root."""
    s, shift = numeral.strip(), 0
    while s[:1] in ("b", "#"):
        shift += -1 if s[0] == "b" else 1
        s = s[1:]
    head = max((r for r in ROMAN if s.upper().startswith(r)), key=len)
    base, rest = s[: len(head)], s[len(head) :]
    scale = SCALES[mode] if len(SCALES.get(mode, [])) == 7 else SCALES["minor" if "min" in mode else "major"]
    root = (tonic + scale[ROMAN.index(head)] + shift) % 12
    minor = base.islower()
    if rest in ("°", "o", "dim"):
        return root, "dim"
    if rest == "7":
        return root, "m7" if minor else "7"
    if rest in ("", "M"):
        return root, "m" if minor else "M"
    return root, ("m" + rest if minor and not rest.startswith(("m", "sus", "dim", "aug")) else rest)


def progression(numerals, tonic, mode="major"):
    """'i VI III VII' -> [(root pitch class, quality), ...]."""
    return [roman(n, tonic, mode) for n in numerals.split()]


def voice(pcs, lo, hi):
    """Each pitch class once, in the octave nearest the middle of [lo, hi] (MIDI notes), sorted."""
    mid = (lo + hi) / 2
    return sorted(int(pc + 12 * round((mid - pc) / 12)) for pc in pcs)


def nearest_tone(m, pcs):
    """The MIDI note nearest m whose pitch class is in pcs (snap a melody note onto the chord)."""
    cands = [p + 12 * o for p in pcs for o in range(0, 11)]
    return min(cands, key=lambda c: (abs(c - m), c))


def degree(d, tonic, mode="major", base=60):
    """MIDI note of scale degree d (0 = tonic, 7 = the octave in a 7-note scale, negatives go down) at or above base."""
    sc = SCALES[mode]
    t = base + (tonic - base) % 12
    return t + 12 * (d // len(sc)) + sc[d % len(sc)]


def bass_note(root_pc, near):
    """MIDI note with pitch class root_pc within a fifth or so of `near` (keeps a bass line from jumping octaves)."""
    return near + ((root_pc - near) % 12 + 5) % 12 - 5


# ------------------------------------------------------------------ timing


def _seed(title):
    return int(hashlib.sha256((title or "z-motion-reel").encode()).hexdigest()[:8], 16)


def _bpb(beats):
    m = beats.get("meter") or ""
    return max(1, int(beats.get("beats_per_bar") or (m.split("/")[0] if "/" in m else 4)))


def plan(beats):
    """beats.json (a dict, or the work dir that holds it) -> the song plan P, a plain dict:
    bpm, beat, bpb (beats per bar, from "meter": "3/4" or "beats_per_bar"), bar, s16, scenes [{i, name, bars, role,
    climax, t0, t1}], film_dur, end_t (the end scene's downbeat), dur (film + reverb tail), N (samples), key, tonic, mode,
    scale, root_m (MIDI root near 55 Hz), root_hz, seed, title. Exactly one scene has climax True."""
    if not isinstance(beats, dict):
        beats = json.loads((Path(beats) / "beats.json").read_text())
    bpm, bpb = float(beats.get("bpm") or 120), _bpb(beats)
    beat = 60 / bpm
    bar = bpb * beat
    t, out = 0.0, []
    for i, s in enumerate(beats.get("scenes") or [{"name": "scene", "bars": 8, "role": "drop"}]):
        nb = max(1, int(s.get("bars", 4)))
        role = (s.get("role") or "build").lower()
        role = role if role in ("intro", "build", "drop", "break", "outro", "end") else "build"
        out.append(
            {
                "i": i,
                "name": s.get("name", f"scene {i + 1}"),
                "bars": nb,
                "role": role,
                "climax": bool(s.get("climax")),
                "t0": t,
                "t1": t + nb * bar,
            }
        )
        t += nb * bar
    if not any(s["climax"] for s in out):
        drops = [s for s in out if s["role"] == "drop"]
        (drops[0] if drops else min(out, key=lambda s: abs(s["t0"] - 0.6 * t)))["climax"] = True
    first = next(s for s in out if s["climax"])
    for s in out:
        s["climax"] = s is first
    ends = [s for s in out if s["role"] == "end"]
    end_t = ends[0]["t0"] if ends else t
    dur = max(t, end_t + 2.6)
    tonic, mode = parse_key(beats.get("key", "A minor"))
    root_m = min((tonic + 12 * o for o in range(0, 4)), key=lambda m: abs(np.log2(mtof(m) / 55.0)))
    return {
        "bpm": bpm,
        "beat": beat,
        "bpb": bpb,
        "bar": bar,
        "s16": beat / 4,
        "scenes": out,
        "film_dur": t,
        "end_t": end_t,
        "dur": dur,
        "N": int(np.ceil(dur * SR)),
        "key": beats.get("key", "A minor"),
        "tonic": tonic,
        "mode": mode,
        "scale": SCALES[mode],
        "root_m": root_m,
        "root_hz": float(mtof(root_m)),
        "seed": _seed(beats.get("title", "")),
        "title": beats.get("title", ""),
    }


def rng(P, salt=0):
    """The score's only randomness: seeded from the title, so a rebuild gives an identical file."""
    return np.random.default_rng(P["seed"] + salt)


def step(P, tb, s, swing=0.0):
    """Time of sixteenth s in the bar starting at tb. swing (0-0.33) delays the off-beat sixteenths by that share of one."""
    return tb + s * P["s16"] + (swing * P["s16"] if s % 2 else 0.0)


# ------------------------------------------------------------------ drums


def _bp_noise(r, n, lo, hi):
    return fftfilt(r.standard_normal(n), bpg(lo, hi))


def _j(r):
    return lambda a: 1 + a * (2 * r.random() - 1)


def kick(root_hz, r):
    """The approved punchy kick: pitch drop onto the song root, a sustained sub tuned to it, a longer body, a click,
    saturation. Each call varies slightly (r), so no two strikes are the identical one-shot."""
    j = _j(r)
    n = int(0.7 * SR)
    t = np.arange(n) / SR
    f = root_hz * j(0.006) + 3.2 * root_hz * j(0.06) * np.exp(-t * 30 * j(0.08))
    body = np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-t * 5.5 * j(0.08)) * np.minimum(1, t / 0.002)
    sub = np.sin(2 * np.pi * root_hz * t) * np.exp(-t * 3.8 * j(0.08)) * np.minimum(1, t / 0.01) * 0.8 * j(0.05)
    click = _bp_noise(r, n, 2500, 8000) * np.exp(-t * 300 * j(0.15)) * 0.35 * j(0.2)
    d = 2.4 * j(0.08)
    return np.tanh((body + sub + click) * d) / np.tanh(d)


def snare(r, tone_hz=185):
    """Two-tone body, a noise tail and a layered clap; varies per strike."""
    j = _j(r)
    n = int(0.45 * SR)
    t = np.arange(n) / SR
    f = tone_hz * j(0.03)
    tone = (np.sin(2 * np.pi * f * t) + 0.5 * np.sin(2 * np.pi * f * 1.78 * t)) * np.exp(-t * 18 * j(0.1)) * 0.7
    nz = _bp_noise(r, n, 1200, 8000) * (np.exp(-t * 14 * j(0.12)) * 0.8 + np.exp(-t * 60) * 0.6)
    cl = sum(
        _bp_noise(r, n, 900, 3500) * (t >= d) * np.exp(-np.clip(t - d, 0, None) * 140)
        for d in (0, 0.01 * j(0.2), 0.021 * j(0.15))
    )
    return np.tanh((tone + nz + cl * 0.35) * 1.8) / np.tanh(1.8)


def clap(r):
    """Three quick noise bursts and a short tail: a hand clap for house and funk backbeats."""
    j = _j(r)
    n = int(0.35 * SR)
    t = np.arange(n) / SR
    x = sum(_bp_noise(r, n, 900, 3500) * (t >= d) * np.exp(-np.clip(t - d, 0, None) * 140) for d in (0, 0.01 * j(0.2)))
    d3 = 0.021 * j(0.15)
    return x + _bp_noise(r, n, 900, 4000) * (t >= d3) * np.exp(-np.clip(t - d3, 0, None) * 30)


def hat(r, open_=False):
    n = int((0.26 if open_ else 0.05) * SR)
    t = np.arange(n) / SR
    metal = sum(np.sign(np.sin(2 * np.pi * fr * (1 + 0.01 * r.random()) * t)) for fr in (3150, 4270, 5340, 6120, 7390))
    x = _bp_noise(r, n, 6500, 12000) + 0.25 * fftfilt(metal, bpg(6500, 11000)) / 5
    return x * np.exp(-t * (13 if open_ else 80 * (1 + 0.2 * r.random()))) * 0.35


def shaker(r):
    """A soft 16th-note shaker grain (swing it for funk and house)."""
    n = int(0.09 * SR)
    t = np.arange(n) / SR
    return _bp_noise(r, n, 5000, 14000) * np.minimum(1, t / 0.012) * np.exp(-t * 45) * 0.3


def tom(hz, r):
    n = int(0.4 * SR)
    t = np.arange(n) / SR
    fr = hz * (1 + 0.6 * np.exp(-t * 25))
    x = np.sin(2 * np.pi * np.cumsum(fr) / SR) * np.exp(-t * 9) + _bp_noise(r, n, 800, 5000) * np.exp(-t * 45) * 0.3
    return np.tanh(x * 1.5) / np.tanh(1.5)


def crash(r, dur=2.6):
    """Stereo crash cymbal, (2, n)."""
    n = int(dur * SR)
    t = np.arange(n) / SR
    x = fftfilt(r.standard_normal((2, n)), bpg(3200, 10500))
    metal = sum(np.sin(2 * np.pi * f * t + p) for f, p in [(3170, 0), (4410, 1), (5290, 2), (6720, 0.5)])
    return (x + metal * np.exp(-t * 4) * 0.04) * np.exp(-t * 1.9) * np.minimum(1, t / 0.002)


# ------------------------------------------------------------------ voices (mono unless noted; m is a MIDI note)


def _polyblep_saw(freq, n, phase0=0.0):
    f = np.broadcast_to(np.asarray(freq, float), (n,))
    dt = f / SR
    p = (phase0 + np.cumsum(dt)) % 1.0
    y = 2 * p - 1
    m = p < dt
    t = p[m] / dt[m]
    y[m] -= t + t - t * t - 1
    m = p > 1 - dt
    t = (p[m] - 1) / dt[m]
    y[m] -= t * t + t + t + 1
    return y


def _saw_note(m, dur, fc0, fc_env, fc_rate, att=0.003, dec=0.2, fmax=6000):
    """Band-limited saw with a per-note low-pass envelope, done additively (no aliasing)."""
    n = int(dur * SR)
    t = np.arange(n) / SR
    f = float(mtof(m))
    k = np.arange(1, max(1, int(fmax / f)) + 1)[:, None]
    fc = fc0 + fc_env * np.exp(-t * fc_rate)
    x = (np.sin(2 * np.pi * f * k * t[None] + k) / np.sqrt(1 + (k * f / fc[None]) ** 4) / k).sum(0)
    return x * env(n, att, dec) * np.minimum(1, (dur - t) / 0.01)


def bass(m, dur, bright=1.0, att=0.002, dec=0.09):
    """Filtered saw bass: short dec for a rolling or funk line, long dec (and low bright) for a held note."""
    return _saw_note(m, dur, 160, 1400 * bright, 30, att, dec, 3500)


def sub(m, dur, att=0.03, dec=0.25):
    """Pure sine sub under the bass."""
    n = int(dur * SR)
    t = np.arange(n) / SR
    return np.sin(2 * np.pi * float(mtof(m)) * t) * env(n, att, dec) * np.minimum(1, (dur - t) / 0.02)


def lead(m, dur, bright=1.0):
    """Bright saw lead with a plucked filter envelope."""
    return _saw_note(m, dur, 500, 3500 * bright, 14, 0.004, 0.35, 7000)


def supersaw(notes, dur, r, amp=0.045, det=(-19, -12, -5, 0, 5, 12, 19)):
    """7 detuned saws per note, voices alternated left/right: (2, n). Stabs: multiply by env(); pads: see pad()."""
    n = int(dur * SR)
    out = np.zeros((2, n))
    for m in notes:
        f = float(mtof(m))
        for vi, d in enumerate(det):
            s = _polyblep_saw(f * 2 ** (d / 1200), n, r.random()) * amp
            if d == 0:
                out += s * 0.7
            else:
                out[vi % 2] += s
    return out


def pad(notes, dur, r, bright=2500, att=0.4, rel=0.5, amp=0.04):
    """A soft held chord: supersaw, low-passed at `bright` Hz, slow attack and release. (2, n)."""
    x = fftfilt(supersaw(notes, dur, r, amp, det=(-9, -4, 0, 4, 9)), lpg(bright, 2))
    n = x.shape[1]
    t = np.arange(n) / SR
    return x * (np.minimum(1, t / att) * np.clip((dur - t) / rel, 0, 1))[None]


def stab(notes, dur, r, bright=4000, dec=0.07, amp=0.05):
    """A supersaw chord hit: instant attack, decay dec seconds, low-passed at bright Hz. (2, n)."""
    return fftfilt(supersaw(notes, dur, r, amp) * env(int(dur * SR), 0.002, dec), lpg(bright, 2))


def fade(x, sec=0.015):
    """Short fade in and out on a sound (mono or stereo), so back-to-back notes or bars do not click."""
    n = x.shape[-1]
    return x * np.minimum(1, np.minimum(np.arange(n), n - np.arange(n)) / max(1, sec * SR))


def pluck(m, bright=1.0, dur=0.24):
    """FM pluck for arps."""
    n = int(dur * SR)
    t = np.arange(n) / SR
    f = float(mtof(m))
    idx = bright * 2.6 * np.exp(-t * 28)
    x = np.sin(2 * np.pi * f * t + idx * np.sin(2 * np.pi * f * t))
    x += 0.3 * np.sin(2 * np.pi * 2 * f * t + idx * 0.5 * np.sin(2 * np.pi * f * t))
    return x * env(n, 0.001, 0.09) * np.minimum(1, (dur - t) / 0.02)


def fm_bell(m, dur=1.6, bright=1.0, ratio=3.5):
    """FM bell; ratio 3.5 glassy, 1.4 softer, 7 metallic."""
    n = int(dur * SR)
    t = np.arange(n) / SR
    f = float(mtof(m))
    idx = bright * (2.2 * np.exp(-t * 7) + 0.3)
    x = np.sin(2 * np.pi * f * t + idx * np.sin(2 * np.pi * f * ratio * t))
    x += 0.25 * np.sin(2 * np.pi * f * 2 * t) * np.exp(-t * 5)
    return x * env(n, 0.002, 0.55) * np.minimum(1, (dur - t) / 0.05)


def piano(m, dur, vel=0.8):
    """Additive piano: stretched (inharmonic) partials, three slightly detuned strings, a two-stage decay, a hammer
    thump. vel 0-1 also brightens. Long notes ring; cut them short with dur for a damped feel."""
    n = int(dur * SR)
    t = np.arange(n) / SR
    f = float(mtof(m))
    K = max(1, min(24, int(9000 / f)))
    k = np.arange(1, K + 1)[:, None]
    fk = f * k * np.sqrt(1 + 0.0004 * k**2)
    amp = (1 / k**1.1) * np.exp(-k * (1.2 - 0.9 * vel) * 0.35)
    dec = (0.9 + 5.0 * np.exp(-f / 600)) / (1 + 0.25 * (k - 1))  # low notes and low partials ring longer
    e = 0.6 * np.exp(-t[None] / (dec * 0.12)) + 0.4 * np.exp(-t[None] / dec)
    x = sum((np.sin(2 * np.pi * fk * c * t[None] + k * 1.7) * amp * e).sum(0) for c in (0.9997, 1.0, 1.0004)) / 3
    rr = np.random.default_rng(int(m * 131 + vel * 17))
    x += fftfilt(rr.standard_normal(n), bpg(f * 0.8, min(f * 6, 9000))) * np.exp(-t * 60) * 0.15 * vel
    return x * vel * np.minimum(1, t / 0.002) * np.minimum(1, (dur - t) / 0.08)


def epiano(m, dur, vel=0.8):
    """FM electric piano (a tine and a bark that grows with vel): funk, house and soul chords."""
    n = int(dur * SR)
    t = np.arange(n) / SR
    f = float(mtof(m))
    idx = (0.6 + 2.2 * vel) * np.exp(-t * 5)
    x = np.sin(2 * np.pi * f * t + idx * np.sin(2 * np.pi * f * t))
    x += 0.18 * vel * np.sin(2 * np.pi * f * 14 * t) * np.exp(-t * 40)
    return x * vel * env(n, 0.002, 0.9) * np.minimum(1, (dur - t) / 0.03)


# ------------------------------------------------------------------ fx


def riser(dur, r, f0=500, f1=7500, pitch=True, root_m=57):
    """Noise swept from f0 to f1 over dur (plus a rising saw chord when pitch), ending at full level: place it so it
    ends on the downbeat it leads into."""
    n = int(dur * SR)
    t = np.arange(n) / SR
    u = t / dur
    x = stft_band(r.standard_normal(n), np.geomspace(f0, f1, 64), np.full(64, 1.1)) * 1.3
    if pitch:
        fr = mtof(root_m) * 2 ** (u**1.8 * 2)
        x += sum(_polyblep_saw(fr * 2 ** (c / 1200), n, r.random()) for c in (-15, 0, 15)) * 0.07
    return x * u**2.2 * np.minimum(1, (dur - t) / 0.01)


def reverse_cymbal(r, dur=1.2):
    """A crash played backwards, swelling into its end: place it at downbeat - dur. (2, n)."""
    return crash(r, dur)[:, ::-1] * np.linspace(0, 1, int(dur * SR)) ** 2


def sub_impact(root_hz, r, dur=2.6):
    """Sub drop tuned to the root plus a low thump: the drop and the end hit."""
    n = int(dur * SR)
    t = np.arange(n) / SR
    f = root_hz * 0.75 + root_hz * 1.3 * np.exp(-t * 5)
    x = np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-t * 2.6) * np.minimum(1, t / 0.003)
    thump = fftfilt(r.standard_normal(n), lpg(600, 2)) * np.exp(-t * 9) * 0.6
    return np.tanh((x + thump) * 1.4) / np.tanh(1.4)


# ------------------------------------------------------------------ buses and mix


class Bus:
    """A stereo track N samples long. add() places a mono or stereo sound at t seconds, with gain and pan (-1..1)."""

    def __init__(self, n):
        self.x = np.zeros((2, n))

    def add(self, sig, t, g=1.0, pan=0.0):
        i = int(round(t * SR))
        sig = np.atleast_2d(sig)
        if i < 0:
            sig, i = sig[:, -i:], 0
        n = min(sig.shape[1], self.x.shape[1] - i)
        if n <= 0:
            return
        th = (np.clip(pan, -1, 1) + 1) * np.pi / 4
        self.x[:, i : i + n] += sig[:, :n] * g * (np.array([np.cos(th), np.sin(th)])[:, None] * np.sqrt(2))


def band(x, lo=None, hi=None, o=2):
    """High-pass at lo and/or low-pass at hi (Hz), zero-phase."""
    return fftfilt(x, lambda f: (hpg(lo, o)(f) if lo else 1) * (lpg(hi, o)(f) if hi else 1))


def drum_bus(kick, snare, hats, perc, seed, room=0.35, punch=0.35, low=0.35):
    """The approved drum sound, from the four drum buses' arrays: a small room (convolution), parallel compression
    (punch) and a low shelf (low), then a 28 Hz high-pass and a small 330 Hz dip. room=punch=low=0 is the old dry kit."""
    drums = kick + snare + hats + perc
    if room:
        bands = [(150, 1200, 0.4), (1200, 5000, 0.32), (5000, 16000, 0.18)]
        send = fftfilt(kick * 0.25 + snare + hats * 0.5 + perc * 0.8, hpg(180))
        drums = drums + room * np.stack([conv(send[c], make_ir(0.45, seed + 7 + c, bands, 0.004)) for c in (0, 1)])
    if punch:
        pk = np.abs(drums).max() + 1e-9
        drums = drums + punch * np.tanh(drums / pk * 4) / np.tanh(4) * pk
    if low:
        drums = drums + low * fftfilt(drums, lpg(110))
    return fftfilt(
        drums, lambda f: hpg(28, 2)(f) * (1 - 0.25 * np.exp(-((np.log2(np.maximum(f, 1) / 330)) ** 2) / 0.4))
    )


def sidechain(times, n, depth=0.8, rate=11.0):
    """Duck envelope (n,) that dips by `depth` at every time in `times` (the kicks) and recovers at `rate`/s.
    Multiply bass, pads and stabs by it (or by 1 - k + k * duck for a lighter touch)."""
    duck = np.ones(n)
    for t in times:
        i = int(t * SR)
        m = min(int(0.35 * SR), n - i)
        if m <= 0 or i < 0:
            continue
        tn = np.arange(m) / SR
        duck[i : i + m] = np.minimum(duck[i : i + m], 1 - depth * np.exp(-tn * rate) * np.minimum(1, tn / 0.004 + 0.25))
    return duck


def gate(n, spans, ramp=0.012):
    """(n,) of ones, zero inside each (t0, t1) span with a short fade in front: the silence before a drop."""
    g = np.ones(n)
    k = int(ramp * SR)
    for t0, t1 in spans:
        a, b = int(t0 * SR), int(t1 * SR)
        g[max(0, a - k) : a] = np.minimum(g[max(0, a - k) : a], np.linspace(1, 0, a - max(0, a - k)))
        g[a:b] = 0
    return g


def filter_sweep(x, fc, lo=450, hi=5500):
    """A low-pass that follows the cutoff curve fc (n,) Hz: a blend of a dark (lo) and a bright (hi) copy."""
    w = np.clip(np.log(np.maximum(fc, 1) / lo) / np.log(hi / lo), 0, 1)
    w = np.convolve(w, np.ones(int(0.05 * SR)) / int(0.05 * SR), "same")
    return fftfilt(x, lpg(lo)) * (1 - w) + fftfilt(x, lpg(hi)) * w


def reverb(send, seed, dur=2.6, bright=1.0):
    """Convolution hall: a stereo-decorrelated noise IR (no metallic combs), send band-limited to 250 Hz-8 kHz."""
    bands = [
        (20, 250, 2.0 * dur / 2.6),
        (250, 1500, 2.0 * dur / 2.6),
        (1500, 5000, 1.5 * dur / 2.6 * bright),
        (5000, 20000, 0.7 * dur / 2.6 * bright),
    ]
    s = fftfilt(send, bpg(250, 8000, 1))
    return np.stack([conv(s[c], make_ir(dur, seed + 11 + 12 * c, bands)) for c in (0, 1)]) * 0.5


def pingpong(x, dly, fb=0.35, taps=6):
    """Darkening stereo ping-pong echo of x (2, n), dly seconds apart. Returns only the echoes."""
    cur, out = x.mean(0), np.zeros_like(x)
    for k in range(1, taps + 1):
        cur = fftfilt(shift(cur, int(dly * SR)), lpg(5000 / (1 + 0.35 * k), 1)) * fb
        out[k % 2] += cur
    return out


def widen(x, ms=13, amt=0.35):
    """Haas widening of the part above 300 Hz. Returns a new (2, n)."""
    d, h = int(ms / 1000 * SR), fftfilt(x, hpg(300))
    y = x.copy()
    y[0] += amt * shift(h[1], d)
    y[1] += amt * shift(h[0], d + 37)
    return y


def mono_low(x, fc=120):
    """Everything below fc Hz in the centre: the kick, sub and bass stay mono, so the low end is solid everywhere."""
    mid, side = (x[0] + x[1]) / 2, fftfilt((x[0] - x[1]) / 2, hpg(fc, 3))
    return np.stack([mid + side, mid - side])


BANDS = (("sub", 20, 60), ("low", 60, 250), ("mid", 250, 4000), ("high", 4000, 20000))


def stem_report(stems, gains):
    """Print each stem's loudness against the dry mix and its share of the mix's energy in the sub / low / mid / high
    bands, so a score can be balanced by numbers when it cannot be heard (music.md, Balancing). Returns the rows."""
    parts = {k: np.atleast_2d(v) * gains.get(k, 1.0) for k, v in stems.items()}
    dry = sum(parts.values())
    ref, n = loudness(dry), dry.shape[-1]
    f = np.fft.rfftfreq(n, 1 / SR)
    energy = {}
    for k, v in parts.items():
        spec = np.abs(np.fft.rfft(v.mean(0))) ** 2
        energy[k] = [spec[(f >= lo) & (f < hi)].sum() for _, lo, hi in BANDS]
    tot = [sum(e[j] for e in energy.values()) + 1e-20 for j in range(len(BANDS))]
    rows = []
    print(f"stems: loudness vs the dry mix ({ref:.1f} LUFS) and share of each band")
    print(f"  {'stem':<10}{'LUFS':>7}{'vs mix':>8}" + "".join(f"{b[0]:>7}" for b in BANDS))
    for k, v in parts.items():
        lu = loudness(v)
        share = [100 * energy[k][j] / tot[j] for j in range(len(BANDS))]
        rows.append(
            {
                "stem": k,
                "lufs": round(lu, 1),
                "vs_mix": round(lu - ref, 1),
                **{b[0]: round(x) for b, x in zip(BANDS, share, strict=True)},
            }
        )
        print(f"  {k:<10}{lu:7.1f}{lu - ref:+8.1f}" + "".join(f"{x:6.0f}%" for x in share))
    return rows


def mix(stems, gains, sends, seed, verb=2.6, fade=0.25, report=True):
    """Sum stems {name: (2, N)} at gains {name: g}, add a shared reverb fed by sends {name: amount}, keep the low end
    mono and fade the last `fade` seconds. Prints stem_report() unless report=False. Returns the stereo mix for write()."""
    first = next(iter(stems.values()))
    if report:
        stem_report(stems, gains)
    dry = sum((stems[k] * gains.get(k, 1.0) for k in stems), np.zeros_like(first))
    send = sum((stems[k] * gains.get(k, 1.0) * v for k, v in sends.items() if k in stems), np.zeros_like(first))
    out = mono_low(dry + reverb(send, seed, verb))
    fo = int(fade * SR)
    out[:, -fo:] *= np.cos(np.linspace(0, np.pi / 2, fo)) ** 2
    return out


# ------------------------------------------------------------------ master and write


def master(x, drive, ceil_db=CEIL_DBTP - 0.6):
    """Glue compression (1.8:1), soft saturation, 4x true-peak limiter."""
    x = fftfilt(x, hpg(22, 2)) * drive
    p = fftfilt((x[0] ** 2 + x[1] ** 2) / 2, lpg(12, 1))
    rms = np.sqrt(np.maximum(p, 1e-12))
    thr = np.percentile(rms[rms > 1e-4], 70) if np.any(rms > 1e-4) else 1.0
    x = x * np.where(rms > thr, (rms / thr) ** (1 / 1.8 - 1), 1.0)
    x = np.tanh(x * 0.9) / 0.9 * 0.6 + x * 0.4
    return limiter(x, ceil_db)


def write(work, x, P, hits):
    """Master x (2, N) to -14 LUFS and <= -1 dBTP (measured on the mp3 that ships), write <work>/music.mp3 and
    <work>/music.json, the contract check, sfx.py and the film read. hits: [(t, strength, kind)] or dicts, the accents
    the film must answer; one per time, the strongest kept. Returns the music.json dict."""
    work, t_start = Path(work), time.time()
    x = np.asarray(x, float)[:, : P["N"]]
    x = x / (np.abs(x).max() + 1e-9)
    drive = 1.6
    for _ in range(5):
        out = master(x, drive)
        lu = loudness(out)
        if abs(lu - TARGET_LUFS) < 0.2:
            break
        drive *= 10 ** ((TARGET_LUFS - lu) / 20 * 1.1)
    mp3 = work / "music.mp3"
    for _ in range(3):  # mp3 encoding overshoots a little: measure the file that ships
        write_mp3(mp3, out)
        back = read_audio(mp3)
        tp = true_peak_db(back)
        if tp <= CEIL_DBTP - 0.05:
            break
        out = limiter(out, CEIL_DBTP - 0.6 - (tp - CEIL_DBTP) - 0.1)
    dur = back.shape[1] / SR
    hd = {}
    for h in hits:
        t, s, k = (h["t"], h["strength"], h.get("kind", "")) if isinstance(h, dict) else h
        h = {"t": round(float(t), 4), "strength": round(float(s), 2), "kind": k}
        if 0 <= h["t"] < dur and (h["t"] not in hd or h["strength"] > hd[h["t"]]["strength"]):
            hd[h["t"]] = h
    off = [h["t"] for h in hd.values() if abs(h["t"] / P["s16"] - round(h["t"] / P["s16"])) * P["s16"] > 0.005]
    if off:
        print(f"music: warning: {len(off)} hits off the sixteenth grid (first {off[0]}s); the film cannot land on them")
    info = {
        "bpm": P["bpm"],
        "beat": P["beat"],
        "bar": P["bar"],
        "beats_per_bar": P["bpb"],
        "dur": round(dur, 4),
        "key": P["key"],
        "root_hz": round(P["root_hz"], 3),
        "scenes": [
            {"name": s["name"], "t0": round(s["t0"], 4), "t1": round(s["t1"], 4), "role": s["role"]}
            for s in P["scenes"]
        ],
        "hits": sorted(hd.values(), key=lambda h: h["t"]),
        "drop_t": round(next(s["t0"] for s in P["scenes"] if s["climax"]), 4),
        "end_hit_t": round(P["end_t"], 4),
        "lufs": round(loudness(back), 2),
        "true_peak_db": round(tp, 2),
    }
    (work / "music.json").write_text(json.dumps(info, indent=1))
    print(
        f"music: {info['dur']:.1f}s {info['bpm']:g} bpm {P['bpb']}/4 {info['key']}, {info['lufs']} LUFS, "
        f"{info['true_peak_db']} dBTP, {len(info['hits'])} hits, drop at {info['drop_t']}s, "
        f"mastered in {time.time() - t_start:.1f}s"
    )
    return info
