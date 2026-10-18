#!/usr/bin/env python3
"""Export the selected reel for every topic and copy it into post folders."""

import argparse
import json
import os
import re
import shutil
import subprocess
from pathlib import Path

from _common import engine_dir, reels_dir, repo_root


def probe(path: Path) -> str:
    result = subprocess.run(
        [
            "ffprobe", "-v", "error", "-show_entries",
            "stream=codec_type,codec_name,width,height,r_frame_rate,sample_rate,channels:format=duration",
            "-of", "default=nw=1", str(path),
        ],
        capture_output=True,
        text=True,
        check=True,
        stdin=subprocess.DEVNULL,
    )
    return " ".join(result.stdout.split())


def reel_format(root: Path, slug: str) -> str:
    beats = root / "work" / slug / "beats.json"
    if not beats.exists() and re.match(r".*-m\d+$", slug):
        beats = root / "work" / slug.rsplit("-", 1)[0] / "beats.json"
    return json.loads(beats.read_text()).get("format", "1920x1080") if beats.exists() else "unknown"


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("issue")
    parser.add_argument("--dry-run", action="store_true")
    parser.add_argument("--slug", help="export only this selected slug")
    parser.add_argument("--output-dir", type=Path, help="copy exports here instead of issue post folders")
    parser.add_argument("--desktop", type=Path, help="owner-facing copy folder (default ~/Desktop/newsletter-<N>-reels)")
    args = parser.parse_args()
    root = reels_dir(args.issue)
    selections_path = root / "selections.json"
    if not selections_path.exists():
        raise SystemExit(f"missing selections: {selections_path}")
    selections = json.loads(selections_path.read_text())
    audio = selections.get("audio", {})
    picks = [(topic, slug) for topic, slug in selections.items() if topic != "audio"]
    picks.sort(key=lambda pair: int(pair[0]))
    if args.slug:
        picks = [pair for pair in picks if pair[1] == args.slug]
        if not picks:
            raise SystemExit(f"{args.slug} is not selected")

    issue_posts = repo_root() / "tmp" / f"issue-{args.issue}" / "posts"
    export_out = (args.output_dir or root / "final").resolve()
    # The owner uploads from the Desktop; tmp/ inside the repo is too hard to reach.
    desktop = (args.desktop or Path.home() / "Desktop" / f"newsletter-{args.issue}-reels").resolve()
    if not args.dry_run:
        export_out.mkdir(parents=True, exist_ok=True)
        desktop.mkdir(parents=True, exist_ok=True)
    for topic, slug in picks:
        choice = audio.get(topic, "score")
        export_slug = slug if choice == "score" else f"{slug}-{choice}"
        post_dirs = sorted(issue_posts.glob(f"{topic}-*")) if issue_posts.exists() else []
        destination = export_out / f"{export_slug}.mp4"
        if not args.output_dir and topic == "0" and issue_posts.exists():
            destination = issue_posts / "0-issue" / "reel.mp4"
        elif not args.output_dir and post_dirs:
            destination = post_dirs[0] / "reel.mp4"
        topic_dirs = sorted((root / "topics").glob(f"{topic}-*"))
        desktop_name = f"{topic_dirs[0].name}.mp4" if topic_dirs else f"{export_slug}.mp4"
        print(f"{topic}: {export_slug} [{reel_format(root, export_slug)}] -> {destination}, {desktop / desktop_name}")
        if args.dry_run:
            continue
        env = dict(os.environ, REEL_HOME=str(root / "work"), REEL_OUT=str(export_out))
        subprocess.run(
            ["python3", "reel.py", "export", export_slug],
            cwd=engine_dir(),
            env=env,
            check=True,
            stdin=subprocess.DEVNULL,
        )
        generated = export_out / f"{export_slug}.mp4"
        destination.parent.mkdir(parents=True, exist_ok=True)
        if generated != destination:
            shutil.copy2(generated, destination)
        shutil.copy2(generated, desktop / desktop_name)
        print(f"ffprobe {destination}: {probe(destination)}")


if __name__ == "__main__":
    main()
