#!/usr/bin/env python3
"""Render one worker brief per direction in tmp/reels/<N>/directions.md into tmp/reels/<N>/briefs/<N>-<n><letter>.md.

usage: briefs.py <N> [--only <n><letter>...] [--force]
Topic 0 (the issue reel) gets briefs/issue-reel.md appended and the 1920x1080 format; the stories stay 1080x1350.
Directions whose name carries "(motion-max" get briefs/motion-max.md appended (the experiment arm).
"""

import argparse
import re
import sys
from pathlib import Path

from _common import engine_dir, reels_dir

SKILL = Path(__file__).resolve().parent.parent
TOPIC = re.compile(r"^## (\d)-(\S+)\s*(?:\((.*)\))?\s*$")
ITEM = re.compile(r"^- (?:\[PICKED\] )?\*\*(\d)([a-z]) (.+?)\*\*\s*(.*)$")


def parse(text: str):
    topics, items = {}, []
    for line in text.splitlines():
        if m := TOPIC.match(line):
            topics[m.group(1)] = (f"{m.group(1)}-{m.group(2)}", m.group(3) or "")
        elif m := ITEM.match(line):
            items.append((m.group(1), m.group(2), m.group(3), m.group(4)))
    return topics, items


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__.splitlines()[0])
    parser.add_argument("issue")
    parser.add_argument("--only", nargs="*", help="directions to render, e.g. 0b 3a")
    parser.add_argument("--force", action="store_true", help="overwrite briefs that already exist")
    args = parser.parse_args()
    root = reels_dir(args.issue)
    directions = root / "directions.md"
    if not directions.exists():
        sys.exit(f"missing {directions}: write the directions first (SKILL.md step 2)")
    topics, items = parse(directions.read_text())
    if not items:
        sys.exit(f"no directions found in {directions}: expected lines like '- **1a Name (capability):** mechanism'")
    worker = (SKILL / "briefs" / "worker.md").read_text()
    issue_extra = (SKILL / "briefs" / "issue-reel.md").read_text()
    max_extra = (SKILL / "briefs" / "motion-max.md").read_text()
    out = root / "briefs"
    out.mkdir(parents=True, exist_ok=True)
    written = 0
    for n, letter, name, rest in items:
        if args.only and f"{n}{letter}" not in args.only:
            continue
        if n not in topics:
            sys.exit(f"direction {n}{letter} has no '## {n}-<slug>' topic heading above it")
        topic_dir, palette = topics[n]
        if not (root / "topics" / topic_dir).exists():
            print(f"warning: {root / 'topics' / topic_dir} does not exist yet (run prepare.py)", file=sys.stderr)
        slug = f"{args.issue}-{n}{letter}"
        path = out / f"{slug}.md"
        if path.exists() and not args.force:
            print(f"skip {path.name} (exists; --force to overwrite)")
            continue
        direction = (f"Topic palette: {palette}\n" if palette else "") + f"**{name}**{(' ' + rest) if rest else ''}"
        text = worker
        if n == "0":
            text = text.replace("--format 1080x1350", "--format 1920x1080") + issue_extra
        if "(motion-max" in name.lower():
            text += max_extra
        for key, value in {"{{SLUG}}": slug, "{{TOPIC}}": topic_dir, "{{DIRECTION}}": direction, "{{REELS}}": str(root),
                           "{{ENGINE}}": str(engine_dir()), "{{N}}": str(args.issue), "{{COUNT}}": str(len(items)), "{{SKILL}}": str(SKILL)}.items():
            text = text.replace(key, value)
        if "{{" in text:
            sys.exit(f"{path.name}: unfilled placeholder {re.search(r'{{[A-Z]+}}', text).group(0)}")
        path.write_text(text)
        written += 1
        print(f"wrote {path}")
    print(f"{written} brief(s) in {out}")


if __name__ == "__main__":
    main()
