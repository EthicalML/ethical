#!/usr/bin/env python3
"""Serve the reel review gallery and persist its selections."""

import argparse
import http.server
import json
import mimetypes
import re
import shutil
from pathlib import Path
from urllib.parse import urlparse

from _common import reels_dir


def gallery_data(issue: str, directions: Path) -> bytes:
    text = directions.read_text()
    topics = {m.group(1): m.group(2) for m in re.finditer(r"^## (\d+)-([^\s(]+)", text, re.M)}
    items = []
    pattern = re.compile(r"^- \*\*(\d+)([a-z]) (.*?):\*\*\s*(.*)$", re.M)
    for match in pattern.finditer(text):
        items.append({
            "slug": f"{issue}-{match.group(1)}{match.group(2)}",
            "topic": match.group(1),
            "name": match.group(3) + ":",
            "desc": match.group(4),
        })
    if not topics or not items:
        raise ValueError(f"could not parse topics and directions from {directions}")
    script = f"const ISSUE={json.dumps(issue)};const ITEMS={json.dumps(items)};const TOPICS={json.dumps(topics)};"
    return script.encode()


class GalleryHandler(http.server.SimpleHTTPRequestHandler):
    reels: Path
    scripts: Path
    issue: str
    data: bytes
    read_only: bool

    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(self.scripts), **kwargs)

    def end_headers(self) -> None:
        self.send_header("Cache-Control", "no-store")
        super().end_headers()

    def send_json(self, data: object, status: int = 200) -> None:
        body = json.dumps(data).encode()
        self.send_response(status)
        self.send_header("Content-Type", "application/json")
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        self.wfile.write(body)

    def send_file(self, path: Path) -> None:
        if not path.is_file():
            self.send_error(404)
            return
        body = path.read_bytes()
        self.send_response(200)
        self.send_header("Content-Type", mimetypes.guess_type(path.name)[0] or "application/octet-stream")
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        self.wfile.write(body)

    def do_GET(self) -> None:
        path = urlparse(self.path).path
        if path == "/list":
            posters = self.reels / "posters"
            posters.mkdir(exist_ok=True)
            work = self.reels / "work"
            if work.exists():
                for directory in work.iterdir():
                    source = directory / "check" / "poster.png"
                    destination = posters / f"{directory.name}.png"
                    if source.exists() and (not destination.exists() or source.stat().st_mtime > destination.stat().st_mtime):
                        shutil.copy2(source, destination)
            out = self.reels / "out"
            base = re.compile(rf"{re.escape(self.issue)}-\d+[a-z]\.html$")
            music = re.compile(rf"{re.escape(self.issue)}-\d+[a-z]-m\d+\.html$")
            names = [entry.name for entry in out.iterdir()] if out.exists() else []
            selections = self.reels / "selections.json"
            self.send_json({
                "html": sorted(name[:-5] for name in names if base.fullmatch(name)),
                "music": sorted(name[:-5] for name in names if music.fullmatch(name)),
                "selections": json.loads(selections.read_text()) if selections.exists() else {},
            })
            return
        if path == "/gallery-data.js":
            self.send_response(200)
            self.send_header("Content-Type", "text/javascript")
            self.send_header("Content-Length", str(len(self.data)))
            self.end_headers()
            self.wfile.write(self.data)
            return
        if path == "/music-variants.txt":
            self.send_file(self.reels / "music-variants.txt")
            return
        for prefix in ("out", "posters"):
            marker = f"/{prefix}/"
            if path.startswith(marker):
                name = Path(path[len(marker):]).name
                self.send_file(self.reels / prefix / name)
                return
        if path == "/":
            self.path = "/gallery.html"
        super().do_GET()

    def do_POST(self) -> None:
        if urlparse(self.path).path != "/select":
            self.send_error(404)
            return
        if self.read_only:
            self.send_json({"error": "gallery is read-only"}, 403)
            return
        length = int(self.headers.get("Content-Length", "0"))
        data = json.loads(self.rfile.read(length))
        (self.reels / "selections.json").write_text(json.dumps(data, indent=2) + "\n")
        self.send_json({"ok": True})

    def log_message(self, *_args) -> None:
        pass


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("issue")
    parser.add_argument("port", nargs="?", type=int, default=8767)
    parser.add_argument("--reels-dir", type=Path)
    parser.add_argument("--read-only", action="store_true")
    args = parser.parse_args()
    directory = (args.reels_dir or reels_dir(args.issue)).resolve()
    directions = directory / "directions.md"
    if not directions.exists():
        raise SystemExit(f"missing directions: {directions}")
    GalleryHandler.reels = directory
    GalleryHandler.scripts = Path(__file__).resolve().parent
    GalleryHandler.issue = args.issue
    GalleryHandler.data = gallery_data(args.issue, directions)
    GalleryHandler.read_only = args.read_only
    print(f"gallery: http://127.0.0.1:{args.port} ({directory})", flush=True)
    http.server.ThreadingHTTPServer(("127.0.0.1", args.port), GalleryHandler).serve_forever()


if __name__ == "__main__":
    main()

