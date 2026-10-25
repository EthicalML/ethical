#!/usr/bin/env python3
"""Render one clip per (palette, cue kind) through the real sfx.build(), plus recorded-library candidates.

  sfx_lab.py <work-dir-of-a-real-reel> [out-dir]     (default out: tmp/sfx-lab)

Each clip is the cue alone, placed after the reel's own cue sheet on a silent music track, so build() levels the stem
the way it levels a real reel and the clip keeps its loudness relative to the rest of the palette. Writes
<out>/audio/<palette>/<cue>.mp3, <out>/audio/lib/<cue>/<n>.mp3 and <out>/manifest.json.
"""

import json
import os
import sys
import tempfile
from multiprocessing import Pool
from pathlib import Path

import numpy as np

ENGINE = Path(__file__).resolve().parent.parent / "engine"
sys.path.insert(0, str(ENGINE))
import music as M  # noqa: E402

LIB = Path(__file__).resolve().parents[4] / ".music" / "sfx" / "oneshots"
if not LIB.is_dir():  # a worktree: the library lives in the main checkout
    LIB = Path("/Users/asaucedo/Programming/ethical/ethical/.music/sfx/oneshots")
T0 = 32.0  # the cell starts here, well after the reel's own cues and their reverb tails
PALETTES = {"a": "current (a)", "b": "organic (b)", "c": "minimal (c)", "d": "electronic (d)"}

# cue kind -> (default event fields, one-line hint of when the reels use it)
CUES = {
    "type": ({"s": "fetch ok", "n": 8, "rate": 0.016, "x": 960}, "text typing on, one tick per character"),
    "slam": ({"s": "SHIP IT", "n": 7, "st": 0.026, "size": 160}, "a big headline slams in"),
    "para": ({"s": "a paragraph fades in", "size": 20}, "body copy appears"),
    "pop": ({"s": "pill"}, "a pill, dot or chip pops in"),
    "ring": ({"r": 330}, "a ring or circle draws out"),
    "heart": ({}, "a heartbeat pulse"),
    "drop": ({"d": 0.8}, "an object drops and bounces"),
    "whoosh": ({"dir": "in", "d": 0.6, "s": 0.6}, "a scene or panel moves in"),
    "riser": ({"d": 1.5}, "tension into the next hit"),
    "shock": ({}, "a shockwave from a hit"),
    "impact": ({"s": 1.0}, "a scene-change hit"),
    "boom": ({"s": 1.2}, "the drop: the biggest hit"),
    "flip": ({"to": "paper"}, "a colour-field flip"),
    "sweep": ({"d": 1.0}, "a light sweep across"),
    "snap": ({}, "a hard snap into place"),
    "sparkle": ({"n": 6, "st": 0.08}, "a little sparkle accent"),
    "draw": ({"d": 0.8, "s": 1}, "a pen line draws"),
    "scatter": ({"d": 0.7, "n": 70}, "particles scatter"),
    "strike": ({"d": 0.4}, "a strike-through line"),
    "shimmer": ({"d": 1.2}, "a long shimmering wash"),
    "bells": ({"final": True}, "the final lock-up chord"),
    "line": ({"d": 0.6}, "a rule line extends"),
    "stream": ({}, "a data stream ticks by"),
    "flap": ({"d": 0.6}, "a split-flap display settles"),
    "burst": ({}, "a burst of fragments"),
    "swirl": ({"d": 1.2, "from": 400, "to": 1500, "s": 1.0}, "grains swirl across"),
    "sheen": ({"d": 0.8, "s": 1.0}, "a glint across a logo or card"),
    "lock": ({}, "a logo locks into place"),
    "halo": ({"d": 3.0}, "a held end, so it is never silent"),
    "blip": ({}, "a small accent blip"),
    "count": ({"to": 42, "d": 1.2, "ease": "outCubic", "x": 960}, "a number counts up"),
    "land": ({}, "items land one after another"),
}

# cue kind -> recorded one-shots that fit it, best first (judged by role, name and length)
LIB_PICKS = {
    "type": ["type/*-03.wav", "glitch/sbvr-mode-select-wheel-006-*-01.wav", "glitch/sbvr-mode-select-wheel-006-*-02.wav",
             "type/comtype-typewriter-space-key-*", "impact/mechltch-*"],
    "slam": ["whoosh/woosh-sweep-slide-*", "impact/impact-cut-sweep-*", "impact/mechltch-*",
             "impact/transition-frantic-shaker-snap-*", "whoosh/metlmisc-metal-slow-whoosh-*"],
    "para": ["whoosh/woosh-sweep-slide-*", "paper/encyclopedia-glossy-page-turn-*", "paper/*-990659d9-01.wav",
             "whoosh/winddsgn-wind-rush-*"],
    "pop": ["ui/interface-pop-high-short-*", "ui/interface-percussion-snap-*", "ui/game-entry-happy-short-*",
            "glitch/sbvr-power-button-*"],
    "ring": ["sheen/uimisc-kalimba-3-up-*", "ui/interface-sci-fi-ping-down-*", "ui/interface-accept-glassy-snap-*",
             "sheen/button-arp-twinkle-*"],
    "heart": ["impact/mechltch-*", "ui/interface-deny-low-fat-dark-*", "ui/deny-muted-*"],
    "drop": ["impact/mechltch-*", "ui/deny-muted-*", "impact/metltonl-item-spring-*"],
    "whoosh": ["whoosh/winddsgn-wind-rush-*", "whoosh/woosh-sweep-slide-*", "whoosh/metlmisc-metal-slow-whoosh-*",
               "whoosh/woosh-debris-*", "whoosh/glasmvmt-*"],
    "riser": ["riser/aerojet-*", "riser/elecarc-*"],
    "shock": ["impact/impact-cut-sweep-*", "impact/watrmisc-*", "whoosh/firewhsh-*"],
    "impact": ["impact/impact-cut-sweep-*", "impact/watrmisc-*", "impact/impact-hit-rapid-chord-*", "impact/watrimpt-*",
               "impact/mechltch-*"],
    "boom": ["boom/*-80091dc9-01.wav", "boom/*-5499869a-01.wav", "boom/effectivetrailer-booms-vol2-011-*",
             "boom/dsgnbass-jump-start-drop-*", "boom/transition-braam-slow-dark-*"],
    "flip": ["glitch/sbvr-power-button-*", "ui/interface-percussion-snap-*", "glitch/sbvr-mode-select-wheel-006-*-03.wav",
             "paper/encyclopedia-glossy-page-turn-*"],
    "sweep": ["glitch/sbvr-am-eq-sweeping-*", "whoosh/woosh-sweep-slide-*", "whoosh/winddsgn-wind-rush-*"],
    "snap": ["ui/interface-percussion-snap-*", "ui/interface-accept-glassy-snap-*",
             "impact/transition-frantic-shaker-snap-*", "impact/mechltch-*"],
    "sparkle": ["sheen/button-arp-twinkle-*", "ui/interface-plucks-happy-*", "sheen/uimisc-kalimba-3-up-*",
                "ui/ting-coins-*", "sheen/uimisc-xylophone-ringtone-*"],
    "draw": ["ui/mechmisc-tool-tape-measure-*", "paper/a4-printing-paper-rattle-*", "whoosh/woosh-sweep-slide-*"],
    "scatter": ["whoosh/cofetti-whoosh-pluck-spill-*", "whoosh/woosh-debris-*", "whoosh/glasmvmt-*",
                "impact/metltonl-item-spring-*"],
    "strike": ["whoosh/woosh-sweep-slide-*", "whoosh/metlmisc-metal-slow-whoosh-*", "impact/impact-cut-sweep-*"],
    "shimmer": ["sheen/magic-energy-flow-astonishment-*", "sheen/magic-energy-flow-astral-travel-*",
                "sheen/gamemisc-magic-creation-*", "sheen/button-arp-twinkle-*", "sheen/toonmisc-bird-flutes-*"],
    "bells": ["sheen/uimisc-xylophone-ringtone-*", "ui/interface-plucks-happy-*", "sheen/uimisc-kalimba-3-up-*",
              "ui/interface-arp-reveal-down-long-*", "sheen/button-arp-twinkle-*"],
    "line": ["whoosh/woosh-sweep-slide-*", "ui/readout-thin-long-*", "glitch/sbvr-am-eq-sweeping-*"],
    "stream": ["ui/readout-thin-long-*", "glitch/uiglitch-user-interface-glitch-high-*", "ui/machmech-*",
               "glitch/elecbuzz-*"],
    "flap": ["ui/machmech-*", "paper/*-990659d9-02.wav", "type/*-01.wav", "paper/a4-printing-paper-rattle-*"],
    "burst": ["glitch/uiglitch-designed-glitch-*", "whoosh/cofetti-whoosh-pluck-spill-*", "glitch/elecarc-*",
              "glitch/psycho-glitched-*", "impact/transition-frantic-shaker-snap-*"],
    "swirl": ["sheen/magic-energy-flow-astral-travel-*", "whoosh/glasmvmt-*", "sheen/gamemisc-magic-creation-*",
              "glitch/sbvr-am-eq-sweeping-*"],
    "sheen": ["sheen/magic-energy-flow-astonishment-*", "sheen/button-arp-twinkle-*", "sheen/uimisc-kalimba-3-up-*",
              "whoosh/winddsgn-wind-rush-*", "ui/interface-accept-glassy-snap-*"],
    "lock": ["impact/mechltch-*", "ui/interface-accept-glassy-snap-*", "glitch/sbvr-power-button-*",
             "ui/interface-percussion-snap-*", "type/comtype-typewriter-space-key-*"],
    "halo": ["drone/roomtone-space-ship-*", "drone/magic-drone-tension-*", "drone/dark-industrial-ambience-*"],
    "blip": ["ui/interface-pop-high-short-*", "glitch/sbvr-mode-select-wheel-006-*-01.wav", "ui/game-entry-happy-short-*",
             "ui/interface-sci-fi-ping-down-*"],
    "count": ["ui/machmech-*", "glitch/sbvr-mode-select-wheel-006-*-02.wav", "ui/interface-pop-high-short-*",
              "type/*-03.wav"],
    "land": ["ui/interface-pop-high-short-*", "glitch/sbvr-mode-select-wheel-006-*-03.wav", "impact/mechltch-*",
             "ui/interface-percussion-snap-*"],
}


def cell_events(cue):
    fields, _ = CUES[cue]
    if cue == "land":  # one land is a single pop; five show the rising run
        return [{"k": "land", "t": T0 + i * 0.12, "x": 600 + 180 * i} for i in range(5)]
    return [{"k": cue, "t": T0, **fields}]


def trim(y, start, tail=0.2, cap=6.0):
    seg = y[:, int((start - 0.02) * M.SR) : int((start + cap) * M.SR)]
    loud = np.nonzero(np.abs(seg).max(0) > 10 ** (-58 / 20))[0]
    end = min(seg.shape[1], (loud[-1] if len(loud) else 0) + int(tail * M.SR))
    seg = seg[:, :end].copy()
    f = min(end, int(0.05 * M.SR))
    seg[:, end - f :] *= np.linspace(1, 0, f)
    return seg


def render_palette(job):
    palette, work, out = job
    os.environ["SFX_PALETTE"] = palette
    import sfx  # after SFX_PALETTE is set; build() reads it per call

    base = json.loads((Path(work) / "cues.json").read_text())
    info = json.loads((Path(work) / "music.json").read_text())
    peaks = {}
    with tempfile.TemporaryDirectory(dir=out) as tmp:
        w = Path(tmp)
        (w / "music.json").write_text(json.dumps({**info, "dur": T0 + 7}))
        M.write_mp3(w / "music.mp3", np.zeros((2, int((T0 + 7) * M.SR))))
        for cue in CUES:
            events = (base["events"] if isinstance(base, dict) else base) + cell_events(cue)
            (w / "cues.json").write_text(json.dumps({**(base if isinstance(base, dict) else {}), "events": events}))
            sfx.build(w)
            clip = trim(M.read_audio(w / "sfx.mp3"), T0)
            dst = Path(out) / "audio" / palette / f"{cue}.mp3"
            dst.parent.mkdir(parents=True, exist_ok=True)
            M.write_mp3(dst, clip)
            peaks[cue] = float(np.abs(clip).max())
    return palette, peaks


def render_lib(out, peaks_a):
    picks = {}
    for cue, pats in LIB_PICKS.items():
        files = []
        for pat in pats:
            for f in sorted(LIB.glob(pat)):
                if f not in files:
                    files.append(f)
                    break
        picks[cue] = []
        for i, f in enumerate(files[:5]):
            y = M.read_audio(f)[:, : int(4 * M.SR)]
            f_out = min(y.shape[1], int(0.05 * M.SR))
            y[:, y.shape[1] - f_out :] *= np.linspace(1, 0, f_out)
            y *= peaks_a.get(cue, 0.5) / (np.abs(y).max() + 1e-9)  # peak-matched to palette a's clip
            dst = Path(out) / "audio" / "lib" / cue / f"{i + 1}.mp3"
            dst.parent.mkdir(parents=True, exist_ok=True)
            M.write_mp3(dst, y)
            picks[cue].append({"file": f"audio/lib/{cue}/{i + 1}.mp3", "source": str(f), "name": f.name})
    return picks


def main():
    work = Path(sys.argv[1]).resolve()
    out = Path(sys.argv[2] if len(sys.argv) > 2 else "tmp/sfx-lab").resolve()
    out.mkdir(parents=True, exist_ok=True)
    with Pool(len(PALETTES)) as pool:
        peaks = dict(pool.map(render_palette, [(p, str(work), str(out)) for p in PALETTES]))
    lib = render_lib(out, peaks["a"])
    manifest = {
        "key": json.loads((work / "music.json").read_text()).get("key"),
        "rows": [{"id": p, "label": label} for p, label in PALETTES.items()] + [{"id": "lib", "label": "recorded library"}],
        "cues": [{"id": c, "hint": h} for c, (_, h) in CUES.items()],
        "lib": lib,
    }
    (out / "manifest.json").write_text(json.dumps(manifest, indent=1))
    print(f"sfx-lab: {len(PALETTES)} x {len(CUES)} cells + {sum(len(v) for v in lib.values())} library clips -> {out}")


if __name__ == "__main__":
    main()
