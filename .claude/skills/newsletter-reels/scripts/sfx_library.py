#!/usr/bin/env python3
"""Turn a folder of licensed WAV files into a small, role-based one-shot library."""

import argparse
import hashlib
import json
import re
import subprocess
from pathlib import Path

from _common import main_root


ROLES = ("ui", "type", "paper", "whoosh", "riser", "impact", "boom", "glitch", "sheen", "alarm", "drone")
LONG_ROLES = {"riser", "boom", "drone"}


def role_for(path: Path) -> str | None:
    text = " ".join(path.parts[-2:]).lower()
    name = path.name.lower()
    if any(word in text for word in ("paper", "newspaper", "page turn", "page movement")):
        return "paper"
    if "typewriter" in text:
        return "type"
    if "alarm" in text:
        return "alarm"
    if any(word in text for word in ("boom", "bass drop", "downer", "braam")):
        return "boom"
    if any(word in text for word in ("powerup", "power up", "blast off", "riser")):
        return "riser"
    if any(word in text for word in ("glitch", " arc", "arc_", "radio", "eq sweeping", "buzz")):
        return "glitch"
    if any(word in text for word in ("drone", "ambience", "roomtone", "sinister texture", "screechy tones")):
        return "drone"
    if any(word in text for word in ("magic", "sparkle", "shimmer", "twinkle", "kalimba", "xylophone", "bird flute")):
        return "sheen"
    if any(word in name for word in ("whoosh", "woosh", "rush", "pass by")):
        return "whoosh"
    if any(word in name for word in ("impact", "impt", " hit", "hit ", "thunk", "clatter", "shaker snap")):
        return "impact"
    if any(word in text for word in (" ui ", "ui_", "uimisc", "interface", "button", "click", "mechanism", "coin flip")):
        return "ui"
    return None


def probe_duration(path: Path) -> float:
    out = subprocess.check_output(
        ["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "default=nw=1:nk=1", str(path)],
        text=True,
    )
    return float(out.strip())


def takes(path: Path, duration: float) -> list[tuple[float, float]]:
    run = subprocess.run(
        ["ffmpeg", "-hide_banner", "-nostats", "-i", str(path), "-af", "silencedetect=noise=-46dB:d=0.22", "-f", "null", "-"],
        capture_output=True,
        text=True,
        check=True,
    )
    spans, start = [], 0.0
    for line in run.stderr.splitlines():
        found = re.search(r"silence_(start|end):\s*([0-9.]+)", line)
        if not found:
            continue
        when = float(found.group(2))
        if found.group(1) == "start":
            if when - start >= 0.035:
                spans.append((start, when))
        else:
            start = when
    if duration - start >= 0.035:
        spans.append((start, duration))
    return spans or [(0.0, duration)]


def safe_name(path: Path, take: int) -> str:
    stem = re.sub(r"[^a-z0-9]+", "-", path.stem.lower()).strip("-")[:64]
    digest = hashlib.sha1(str(path).encode()).hexdigest()[:8]
    return f"{stem}-{digest}-{take:02d}.wav"


def render(source: Path, destination: Path, start: float, end: float, role: str) -> float:
    limit = 6.0 if role in LONG_ROLES else 3.0
    duration = min(limit, end - start)
    fade = min(0.012, duration / 4)
    filters = (
        "aresample=48000,"
        "loudnorm=I=-20:LRA=7:TP=-1.5,"
        f"afade=t=in:st=0:d={fade:.4f},"
        f"afade=t=out:st={max(0, duration - fade):.4f}:d={fade:.4f}"
    )
    subprocess.run(
        [
            "ffmpeg", "-v", "error", "-y", "-ss", f"{start:.5f}", "-t", f"{duration:.5f}", "-i", str(source),
            "-af", filters, "-ar", "48000", "-ac", "2", "-c:a", "pcm_s24le", str(destination),
        ],
        check=True,
        stdin=subprocess.DEVNULL,
    )
    return duration


def main() -> None:
    default_source = main_root() / ".music" / "sfx" / "sonniss-gdc2026"
    default_output = main_root() / ".music" / "sfx" / "oneshots"
    parser = argparse.ArgumentParser()
    parser.add_argument("source", nargs="?", type=Path, default=default_source)
    parser.add_argument("output", nargs="?", type=Path, default=default_output)
    args = parser.parse_args()
    source, output = args.source.resolve(), args.output.resolve()
    if not source.is_dir():
        raise SystemExit(f"missing sound library: {source}")
    output.mkdir(parents=True, exist_ok=True)
    index = {"sample_rate": 48000, "roles": {role: [] for role in ROLES}, "dropped": []}
    for wav in sorted(source.rglob("*.wav")):
        role = role_for(wav.relative_to(source))
        if not role:
            index["dropped"].append(str(wav.relative_to(source)))
            continue
        role_dir = output / role
        role_dir.mkdir(exist_ok=True)
        duration = probe_duration(wav)
        for number, (start, end) in enumerate(takes(wav, duration), 1):
            name = safe_name(wav.relative_to(source), number)
            relative = Path(role) / name
            rendered = render(wav, output / relative, start, end, role)
            index["roles"][role].append({
                "file": relative.as_posix(),
                "source": str(wav.relative_to(source)),
                "take": number,
                "duration": round(rendered, 4),
            })
    (output / "index.json").write_text(json.dumps(index, indent=2) + "\n")
    for role in ROLES:
        print(f"{role}: {len(index['roles'][role])}")
    print(f"dropped: {len(index['dropped'])}")
    for path in index["dropped"]:
        print(f"  {path}")
    missing = [role for role in ("ui", "whoosh", "impact") if len(index["roles"][role]) < 3]
    if missing:
        raise SystemExit("too few samples for: " + ", ".join(missing))


if __name__ == "__main__":
    main()
