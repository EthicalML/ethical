#!/usr/bin/env python3
"""Prepare reel topic inputs from a newsletter issue and its grounding files."""

import os
import re
import shutil
import sys
from pathlib import Path
from urllib.parse import urlparse

from _common import reels_dir, repo_root


HEADING = re.compile(r"^## \[([^]]+)\]\((https?://[^)]+)\)\s*$", re.M)
URL = re.compile(r"https?://[^)\s>]+")


def slugify(text: str) -> str:
    return re.sub(r"(^-|-$)", "", re.sub(r"[^a-z0-9]+", "-", text.lower()))


def url_slug(url: str) -> str:
    parts = [part for part in urlparse(url).path.split("/") if part]
    return slugify(parts[-1]) if parts else slugify(urlparse(url).netloc)


def matching_note(issue_dir: Path, slug: str) -> Path | None:
    exact = issue_dir / f"{slug}.md"
    if exact.exists():
        return exact
    matches = [p for p in issue_dir.glob("*.md") if slug.startswith(p.stem) or p.stem.startswith(slug)]
    return max(matches, key=lambda p: len(p.stem), default=None)


def main() -> None:
    if len(sys.argv) != 2 or not sys.argv[1].isdigit():
        raise SystemExit("usage: prepare.py <N>")
    issue = sys.argv[1]
    source_root = Path(os.environ.get("NEWSLETTER_ROOT", repo_root())).resolve()
    source = source_root / "src" / "content" / "newsletter" / f"{issue}.md"
    issue_dir = source_root / "tmp" / f"issue-{issue}"
    if not source.exists():
        raise SystemExit(f"missing newsletter: {source}")
    text = source.read_text()
    matches = list(HEADING.finditer(text))
    if len(matches) != 5:
        raise SystemExit(f"expected 5 linked article sections, found {len(matches)} in {source}")

    output = reels_dir(issue) / "topics"
    output.mkdir(parents=True, exist_ok=True)
    for number, match in enumerate(matches, 1):
        end = matches[number].start() if number < len(matches) else len(text)
        body = text[match.end():end].strip()
        topic = output / f"{number}-{slugify(match.group(1))}"
        assets = topic / "assets"
        assets.mkdir(parents=True, exist_ok=True)
        (topic / "post.txt").write_text(f"{match.group(1)}\n\n{body}\n\n{match.group(2)}\n")

        copied_notes: set[Path] = set()
        urls = [match.group(2), *URL.findall(body)]
        for position, url in enumerate(dict.fromkeys(urls)):
            slug = url_slug(url.rstrip(".,"))
            note = matching_note(issue_dir, slug)
            if not note or note in copied_notes:
                continue
            suffix = "" if position == 0 else f"-{slug}"
            shutil.copy2(note, topic / f"facts{suffix}.md")
            copied_notes.add(note)

        primary_slug = url_slug(match.group(2))
        images = sorted((issue_dir / "images").glob(f"{primary_slug}-*"))
        for image in images:
            shutil.copy2(image, assets / image.name)

        missing = []
        if not copied_notes:
            missing.append("grounding notes")
        if not images:
            missing.append("images")
        if not (assets / "logos").exists():
            missing.append("logos")
        status = ", ".join(f"no {item}" for item in missing) or "complete inputs"
        print(f"{topic.name}: {status}")


if __name__ == "__main__":
    main()

