#!/usr/bin/env python3
"""Fetch, validate and render logo candidates for a reel topic."""

import argparse
import os
import re
import subprocess
import urllib.parse
import urllib.request
from pathlib import Path

from _common import reels_dir


BAD = [
    re.compile(r"<script\b", re.I),
    re.compile(r"\son[a-z]+\s*=", re.I),
    re.compile(r"javascript\s*:", re.I),
]
HREF = re.compile(r"(?:href|xlink:href)\s*=\s*(['\"])(.*?)\1", re.I | re.S)
SVG = re.compile(r"<svg\b.*?</svg\s*>", re.I | re.S)
HEADER = re.compile(r"<header\b.*?</header\s*>", re.I | re.S)


def fetch(url: str) -> str:
    request = urllib.request.Request(url, headers={"User-Agent": "newsletter-reels/1.0"})
    with urllib.request.urlopen(request, timeout=20) as response:
        return response.read().decode("utf-8", "replace")


def safe_svg(svg: str) -> bool:
    if not SVG.fullmatch(svg.strip()) or any(pattern.search(svg) for pattern in BAD):
        return False
    return all(value.strip().startswith("#") for _, value in HREF.findall(svg))


def render_sheet(directory: Path, brand: str) -> None:
    python = Path(os.environ.get(
        "REEL_PYTHON",
        Path.home() / ".config" / "slt-agentic-marketplace" / "motion-reel" / "venv" / "bin" / "python",
    ))
    if not python.exists():
        raise SystemExit(f"missing engine Python: {python}")
    child = r'''
import html, pathlib, sys
from playwright.sync_api import sync_playwright
d = pathlib.Path(sys.argv[1]); brand = sys.argv[2]
cards = []
for p in sorted(d.glob("*.svg")):
    svg = p.read_text()
    cards.append(f'<section><b>{html.escape(p.name)}</b><div class="pair"><i class="light">{svg}</i><i class="dark">{svg}</i></div></section>')
doc = f"""<!doctype html><style>body{{font:16px system-ui;margin:24px;background:#ddd}}h1{{margin:0 0 20px}}main{{display:grid;grid-template-columns:repeat(2,360px);gap:20px}}section{{background:#fff;padding:12px;box-shadow:0 1px 5px #888}}b{{display:block;margin-bottom:8px}}.pair{{display:grid;grid-template-columns:1fr 1fr;height:150px}}i{{display:grid;place-items:center;padding:20px}}.light{{background:#fff}}.dark{{background:#151515}}svg{{width:130px;height:100px;max-width:100%;max-height:100%}}</style><h1>{html.escape(brand)} logo candidates</h1><main>{''.join(cards)}</main>"""
with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page(viewport={"width": 800, "height": max(300, 120 + 210 * ((len(cards) + 1) // 2))}, device_scale_factor=1)
    page.set_content(doc, wait_until="load")
    page.screenshot(path=str(d / "contact-sheet.png"), full_page=True)
    browser.close()
'''
    subprocess.run([str(python), "-c", child, str(directory), brand], check=True, stdin=subprocess.DEVNULL)


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("issue")
    parser.add_argument("topic_dir")
    parser.add_argument("brand")
    parser.add_argument("--site")
    parser.add_argument("--wikimedia")
    parser.add_argument("--simpleicons")
    args = parser.parse_args()
    topic = Path(args.topic_dir)
    if not topic.is_absolute():
        topic = reels_dir(args.issue) / "topics" / topic
    output = topic / "assets" / "logos"
    output.mkdir(parents=True, exist_ok=True)

    candidates: list[tuple[str, str]] = []
    if args.simpleicons:
        name = re.sub(r"[^a-z0-9]", "", args.simpleicons.lower())
        candidates.append((f"simpleicons-{name}.svg", fetch(f"https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/{name}.svg")))
    if args.wikimedia:
        quoted = urllib.parse.quote(args.wikimedia.replace(" ", "_"))
        candidates.append((f"wikimedia-{Path(args.wikimedia).stem}.svg", fetch(f"https://commons.wikimedia.org/wiki/Special:FilePath/{quoted}")))
    if args.site:
        page = fetch(args.site)
        header = HEADER.search(page)
        for number, match in enumerate(SVG.findall(header.group(0) if header else ""), 1):
            candidates.append((f"site-{number}.svg", match))
    if not candidates:
        raise SystemExit("provide at least one of --site, --wikimedia or --simpleicons")

    accepted = 0
    for name, svg in candidates:
        if safe_svg(svg):
            (output / name).write_text(svg.strip() + "\n")
            print(f"accepted {name}")
            accepted += 1
        else:
            print(f"rejected unsafe {name}")
    if not accepted:
        raise SystemExit("no safe SVG candidates")
    render_sheet(output, args.brand)
    print(f"wrote {output / 'contact-sheet.png'}")


if __name__ == "__main__":
    main()
