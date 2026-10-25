#!/usr/bin/env python3
"""Build m3 variants: m1 stock music with recorded sound effects."""

import os
import subprocess
import sys
from pathlib import Path

from _common import engine_dir, main_root, music_dir, reels_dir


def main() -> None:
    if len(sys.argv) < 3:
        raise SystemExit("usage: recorded_sfx.py <N> <slug>...")
    issue, *slugs = sys.argv[1:]
    root = reels_dir(issue)
    variants = {}
    for line in (root / "music-variants.txt").read_text().splitlines():
        fields = line.split(maxsplit=2)
        if len(fields) == 3 and fields[1] == "m1":
            variants[fields[0]] = fields[2]
    sfx_lib = Path(os.environ.get("SFX_LIB", main_root() / ".music" / "sfx" / "oneshots")).resolve()
    if not (sfx_lib / "index.json").is_file():
        raise SystemExit(f"missing recorded SFX library: {sfx_lib}")
    scripts = Path(__file__).resolve().parent
    env = dict(
        os.environ,
        REEL_HOME=str(root / "work"),
        REEL_OUT=str(root / "out"),
        SFX_LIB=str(sfx_lib),
    )
    engine_venv = Path.home() / ".config" / "slt-agentic-marketplace" / "motion-reel" / "venv" / "bin"
    if (engine_venv / "python3").exists():
        env["PATH"] = str(engine_venv) + os.pathsep + env.get("PATH", "")
    reported_samples = False
    for slug in slugs:
        if not (root / "out" / f"{slug}.html").is_file():
            print(f"{slug}: skipped (missing out/{slug}.html)")
            continue
        track = variants.get(slug)
        if not track:
            print(f"{slug}: skipped (no m1 line in music-variants.txt)")
            continue
        subprocess.run(
            [sys.executable, str(scripts / "swap_music.py"), issue, slug, "m3", str(music_dir() / track)],
            env=env,
            check=True,
            stdin=subprocess.DEVNULL,
        )
        new_slug = f"{slug}-m3"
        build_env = dict(env)
        if not reported_samples:
            build_env["SFX_REPORT_SAMPLES"] = "1"
        subprocess.run(
            ["python3", "reel.py", "sfx", new_slug], cwd=engine_dir(), env=build_env, check=True, stdin=subprocess.DEVNULL
        )
        reported_samples = True
        subprocess.run(
            ["python3", "reel.py", "build", new_slug], cwd=engine_dir(), env=env, check=True, stdin=subprocess.DEVNULL
        )
        print(f"{new_slug}: {track} with recorded sfx -> out/{new_slug}.html")


if __name__ == "__main__":
    main()
