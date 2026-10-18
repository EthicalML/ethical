#!/usr/bin/env python3
"""Clone a reel with a stock track, normalize it, and rebuild its HTML."""

import json
import os
import shutil
import subprocess
import sys

import numpy as np

from _common import engine_dir, reels_dir


def main() -> None:
    if len(sys.argv) != 5:
        raise SystemExit("usage: swap_music.py <N> <slug> <tag> <track>")
    issue, slug, tag, track_arg = sys.argv[1:]
    root = reels_dir(issue)
    track = os.path.abspath(track_arg)
    analysis = os.path.join(os.path.dirname(track), "analysis.json")
    data = json.load(open(analysis))[os.path.basename(track)]
    source = root / "work" / slug
    new_slug = f"{slug}-{tag}"
    destination = root / "work" / new_slug
    if not source.exists():
        raise SystemExit(f"missing reel work directory: {source}")
    if destination.exists():
        shutil.rmtree(destination)
    shutil.copytree(source, destination, ignore=shutil.ignore_patterns("check", "tmp", "*.r?.js"), copy_function=shutil.copy2)
    duration = json.load(open(destination / "music.json"))["dur"]  # exactly the film: a longer track freezes the last frame
    sample_rate = 11025
    raw = subprocess.run(
        ["ffmpeg", "-v", "quiet", "-i", track, "-ac", "1", "-ar", str(sample_rate), "-f", "f32le", "-"],
        capture_output=True,
        check=True,
        stdin=subprocess.DEVNULL,
    ).stdout
    samples = np.frombuffer(raw, np.float32)
    hop = 128
    energy = np.array([
        np.sqrt(np.mean(samples[i * hop:(i + 1) * hop] ** 2))
        for i in range(len(samples) // hop)
    ])
    onset = np.maximum(0, np.diff(np.log(energy + 1e-6)))
    full = data["full_energy_from_s"]
    low = int(max(0, full - 1) * sample_rate / hop)
    high = int((full + 1) * sample_rate / hop)
    start = (low + int(np.argmax(onset[low:high]))) * hop / sample_rate
    start = max(0.0, min(start, data["dur"] - duration))
    music = destination / "music.mp3"
    modified = music.stat().st_mtime
    subprocess.run(
        [
            "ffmpeg", "-v", "error", "-y", "-ss", f"{start:.3f}", "-t", f"{duration:.3f}", "-i", track,
            "-af", f"afade=t=in:d=0.03,afade=t=out:st={duration - 2.5:.3f}:d=2.5,loudnorm=I=-14:TP=-1.5",
            "-ar", "48000", "-ac", "2", str(music),
        ],
        check=True,
        stdin=subprocess.DEVNULL,
    )
    os.utime(music, (modified, modified))
    env = dict(os.environ, REEL_HOME=str(root / "work"), REEL_OUT=str(root / "out"))
    subprocess.run(
        ["python3", "reel.py", "build", new_slug],
        cwd=engine_dir(),
        env=env,
        check=True,
        stdin=subprocess.DEVNULL,
    )
    print(f"{new_slug}: {os.path.basename(track)} from {start:.2f}s, {duration:.1f}s, fade out last 2.5s -> out/{new_slug}.html")


if __name__ == "__main__":
    main()
