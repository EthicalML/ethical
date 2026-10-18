#!/usr/bin/env python3
"""Prepare reel topic inputs from a newsletter issue and its grounding files."""

import argparse
import os
import re
import shutil
from pathlib import Path
from urllib.parse import urlparse

from _common import reels_dir, repo_root


HEADING = re.compile(r"^## \[([^]]+)\]\((https?://[^)]+)\)\s*$", re.M)
NEXT_HEADING = re.compile(r"^## ", re.M)
URL = re.compile(r"https?://[^)\s>]+")
INSTITUTE_LOGOS = ("horizontal-dark.svg", "horizontal-light.svg", "mark-dark.svg", "mark-light.svg")


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


def section_end(text: str, start: int) -> int:
    following = NEXT_HEADING.search(text, start)
    return following.start() if following else len(text)


def topic_dir(output: Path, number: int, heading: str) -> Path:
    existing = sorted(output.glob(f"{number}-*"))
    return existing[0] if len(existing) == 1 else output / f"{number}-{slugify(heading)}"


def refresh_issue_logos(output: Path, branding: Path) -> int:
    logos = output / "0-issue" / "assets" / "logos"
    logos.mkdir(parents=True, exist_ok=True)
    for name in INSTITUTE_LOGOS:
        source = branding / name
        if not source.exists():
            raise SystemExit(f"missing Institute logo: {source}")
        shutil.copy2(source, logos / name)
    for number in range(1, 6):
        for topic in sorted(output.glob(f"{number}-*")):
            for source in sorted((topic / "assets").rglob("*.svg")):
                shutil.copy2(source, logos / source.name)
    return len(list(logos.glob("*.svg")))


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("issue")
    parser.add_argument("--logos-only", action="store_true")
    args = parser.parse_args()
    if not args.issue.isdigit():
        parser.error("issue must be a number")
    issue = args.issue
    source_root = Path(os.environ.get("NEWSLETTER_ROOT", repo_root())).resolve()
    output = reels_dir(issue) / "topics"
    if args.logos_only:
        count = refresh_issue_logos(output, repo_root() / "public" / "branding")
        print(f"0-issue: refreshed {count} logos")
        return
    source = source_root / "src" / "content" / "newsletter" / f"{issue}.md"
    issue_dir = source_root / "tmp" / f"issue-{issue}"
    if not source.exists():
        raise SystemExit(f"missing newsletter: {source}")
    text = source.read_text()
    matches = list(HEADING.finditer(text))
    if len(matches) != 5:
        raise SystemExit(f"expected 5 linked article sections, found {len(matches)} in {source}")

    output.mkdir(parents=True, exist_ok=True)
    sections: list[str] = []
    for number, match in enumerate(matches, 1):
        end = section_end(text, match.end())
        body = text[match.end():end].strip()
        sections.append(f"{match.group(0).strip()}\n\n{body}")
        topic = topic_dir(output, number, match.group(1))
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

    date_match = re.search(r"^date:\s*['\"]?([^'\"\n]+)", text, re.M)
    subscribers = re.search(r"over\s+\[?([0-9][0-9,]*\+?)\s+ML professionals and enthusiasts", text, re.I)
    if not date_match or not subscribers:
        raise SystemExit("could not read the issue date or subscriber figure")
    issue_topic = output / "0-issue"
    issue_topic.mkdir(parents=True, exist_ok=True)
    headings = "\n".join(f"{number}. {match.group(1)}" for number, match in enumerate(matches, 1))
    post = (
        f"ML Engineering Newsletter - Issue #{issue} ({date_match.group(1).strip()}), by The Institute for Ethical AI Alignment & Safety (ethical.institute)\n\n"
        f"This week's five stories:\n{headings}\n\n"
        f"Call to action: join over {subscribers.group(1)} ML professionals and enthusiasts who receive weekly articles & tutorials on Machine Learning & MLOps - subscribe at ethical.institute/newsletter\n"
    )
    (issue_topic / "post.txt").write_text(post)
    facts = f"# Issue {issue} as published (the section text of each story; facts for the per-story beats come only from here)\n\n" + "\n\n".join(sections) + "\n\n"
    (issue_topic / "facts.md").write_text(facts)
    count = refresh_issue_logos(output, repo_root() / "public" / "branding")
    print(f"0-issue: {count} logos")


if __name__ == "__main__":
    main()
