#!/usr/bin/env python3
"""Analyse MP3 duration, tempo, loudness and largest energy jump incrementally."""

import glob
import json
import os
import subprocess
import sys

import numpy as np

from _common import music_dir


SR = 11025


def load(path: str) -> np.ndarray:
    raw = subprocess.run(
        ["ffmpeg", "-v", "quiet", "-i", path, "-ac", "1", "-ar", str(SR), "-f", "f32le", "-"],
        capture_output=True,
        check=True,
        stdin=subprocess.DEVNULL,
    ).stdout
    return np.frombuffer(raw, np.float32)


def main() -> None:
    directory = os.path.abspath(sys.argv[1]) if len(sys.argv) > 1 else str(music_dir())
    analysis = os.path.join(directory, "analysis.json")
    out = json.load(open(analysis)) if os.path.exists(analysis) else {}
    changed = False
    for path in sorted(glob.glob(os.path.join(directory, "*.mp3"))):
        name = os.path.basename(path)
        if name in out:
            print(f"{name}: already analysed")
            continue
        x = load(path)
        dur = len(x) / SR
        hop = 256
        frames = len(x) // hop
        energy = np.array([np.sqrt(np.mean(x[i * hop:(i + 1) * hop] ** 2)) for i in range(frames)])
        onset = np.maximum(0, np.diff(np.log(energy + 1e-6)))
        onset -= onset.mean()
        fps = SR / hop
        sample = onset[:int(60 * fps)]
        ac = np.correlate(sample, sample, "full")[len(sample) - 1:]
        lags = np.arange(len(ac))
        bpm_l = 60 * fps / np.maximum(lags, 1)
        valid = (bpm_l > 80) & (bpm_l < 170)
        lag = lags[valid][np.argmax(ac[valid])]
        bpm = 60 * fps / lag
        seconds = np.array([np.sqrt(np.mean(x[int(i * SR):int((i + 1) * SR)] ** 2)) for i in range(int(dur))])
        smooth = np.convolve(seconds, np.ones(2) / 2, "same")
        jump = np.diff(smooth)
        drop = int(np.argmax(jump[4:]) + 5) if len(jump) > 6 else 0
        first_loud = int(np.argmax(smooth > 0.6 * smooth.max()))
        out[name] = dict(
            dur=round(dur, 1),
            bpm=round(bpm, 1),
            rms=round(float(20 * np.log10(seconds.mean() + 1e-9)), 1),
            drop_s=drop,
            full_energy_from_s=first_loud,
        )
        changed = True
        print(f"{name[:55]:55s} {dur:6.1f}s {bpm:6.1f}bpm drop@{drop:4d}s full@{first_loud:3d}s")
    if changed:
        with open(analysis, "w") as handle:
            json.dump(out, handle, indent=1)
            handle.write("\n")


if __name__ == "__main__":
    main()
