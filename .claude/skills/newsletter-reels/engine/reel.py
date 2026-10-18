#!/usr/bin/env python3
"""Motion reel: a keynote-grade motion-graphics film as one web page and an MP4, on the Desktop.

  python3 reel.py init <slug>        make the work dir with a blank film.js scaffold and an example beats.json
  python3 reel.py music <slug>       run <work>/score.py (the example score if none) -> music.mp3 + music.json
  python3 reel.py cues <slug>        sweep film.js headless -> cues.json    (re-run after every film.js change)
  python3 reel.py sfx <slug>         cues.json -> sfx.mp3                   (sfx.py)
  python3 reel.py check <slug>       errors, purity, sheets, beat grid, cuts, static holds, SFX frames, loudness, player -> check/
  python3 reel.py build <slug>       ~/Desktop/<slug>.html, one self-contained file (double-click to play)
  python3 reel.py export <slug>      ~/Desktop/<slug>.mp4, H.264 + AAC at the beats.json format, verified (--mbps 8, --fast: no motion blur)

Format: beats.json "format" ("1920x1080" default here, "1080x1350", "1080x1920", "1080x1080") and "fps" (60 landscape, 30 portrait).
Work dir: ~/.config/slt-agentic-marketplace/motion-reel/<slug>/ ($REEL_HOME overrides the root; the venv stays in the default
root so parallel workers share it). Outputs go to ~/Desktop ($REEL_OUT overrides). The film is JS because it runs in the browser;
everything here drives the system Chrome through Playwright, so there is no Node and nothing needs admin rights.
"""

import sys

if sys.version_info < (3, 11):  # noqa: UP036 - the point is to catch the 3.9 macOS default, which cannot run `zip(..., strict=)` below
    raise SystemExit(
        f"z-motion-reel needs Python 3.11 or later; found {sys.version.split()[0]}. "
        "Re-run it with a newer interpreter, e.g. `uv run --python 3.12 --no-project`. "
        "If a newer python3 still lands here, delete ~/.config/slt-agentic-marketplace/motion-reel/venv: an older one built it."
    )

import argparse
import base64
import html
import importlib.util
import io
import json
import os
import re
import shutil
import subprocess
import time
from pathlib import Path

DEFAULT_HOME = Path.home() / ".config/slt-agentic-marketplace/motion-reel"
HOME = Path(os.environ["REEL_HOME"]).expanduser() if os.environ.get("REEL_HOME") else DEFAULT_HOME
VENV = DEFAULT_HOME / "venv"  # shared by every worker, whatever REEL_HOME says
SKILL = Path(__file__).resolve().parent
TEMPLATE = SKILL / "template"
DESKTOP = Path(os.environ["REEL_OUT"]).expanduser() if os.environ.get("REEL_OUT") else Path.home() / "Desktop"
DEPS = ["numpy", "scipy", "soundfile", "pyloudnorm", "pillow", "playwright", "av"]
FPS, SR = 60, 48000  # FPS and SIZE are set from beats.json by use_format() before any page work
SIZE = (1920, 1080)
FORMATS = ("1920x1080", "1080x1350", "1080x1920", "1080x1080")
MUXER = "mp4-muxer 5.2.2, MIT licence, (c) 2023 Vanilagy, https://github.com/Vanilagy/mp4-muxer"
STRONG = 0.8  # a music hit this strong (fills, phrase hits, the drop) needs a visual answer within 40 ms; craft.md says the same
CUT_WARN, CUT_FAIL = 1.0, 5.0  # % of the frame that jumps across a scene boundary, beyond what the scene itself moves
HOLD_BEATS = 1.5  # a stretch this many beats long where nothing visibly moves is a static hold
# alive = more than HOLD_STILL % of a 320x180 copy of the frame changes by more than HOLD_LEVEL (of 255) every 1/8 s:
# about 3,000 px2 at 1080p. Specks under ~6 px average away at that size, so they do not count (craft.md says so).
HOLD_LEVEL, HOLD_STILL = 6, 0.15
SHEET_COLS, SHEET_TILES = 4, 24  # contact sheets: 4 tiles a row, at most 24 tiles a page (tile size follows the format)
TEXT_CUES = ("slam", "type", "para", "count")
# poster (frame 0, the thumbnail): at least this % of the frame inked and this % on sharp edges, which text produces.
POSTER_INK, POSTER_EDGES, POSTER_HOLD = 3.0, 0.5, 1.0  # the legibility sheet waits for the last of these in each scene


# --------------------------------------------------------------- environment
def ensure_env() -> None:
    """Re-exec under our own venv so every command is just `python3 reel.py`."""
    if Path(sys.prefix).resolve() == VENV.resolve():
        return
    python = VENV / ("Scripts/python.exe" if os.name == "nt" else "bin/python")
    VENV.parent.mkdir(parents=True, exist_ok=True)
    lock = open(VENV.parent / ".venv.lock", "w")  # parallel workers: one builds the venv, the rest wait, nobody pip-installs twice
    try:
        import fcntl

        fcntl.flock(lock, fcntl.LOCK_EX)
    except ImportError:  # Windows: no flock, run one worker first
        pass
    if not python.exists():
        t0 = time.time()
        print(f"first run: creating {VENV} and installing {', '.join(DEPS)}", file=sys.stderr)
        VENV.parent.mkdir(parents=True, exist_ok=True)
        subprocess.run([sys.executable, "-m", "venv", str(VENV)], check=True)
        pip = [
            str(python),
            "-m",
            "pip",
            "install",
            "-q",
            "--disable-pip-version-check",
            "--index-url",
            "https://pypi.org/simple",
        ]
        subprocess.run([*pip, *DEPS], check=True)
        print(f"venv ready in {time.time() - t0:.0f}s", file=sys.stderr)
    lock.close()
    os.execv(str(python), [str(python), str(Path(__file__).resolve()), *sys.argv[1:]])


def die(msg: str, fix: str = "") -> None:
    print(f"error: {msg}" + (f"\n  fix: {fix}" if fix else ""), file=sys.stderr)
    sys.exit(1)


def workdir(slug: str, must_exist: bool = True) -> Path:
    if not re.fullmatch(r"[a-z0-9][a-z0-9-]{0,40}", slug) or slug == "venv":
        die(f"bad slug {slug!r}", "use lowercase letters, digits and dashes, e.g. q3-keynote")
    w = HOME / slug
    if must_exist and not w.is_dir():
        die(f"no work dir {w}", f"python3 reel.py init {slug}")
    return w


def rjson(p: Path):
    return json.loads(p.read_text())


def use_format(w: Path) -> tuple:
    """beats.json "format" and "fps" -> (format, fps); sets the module's SIZE and FPS for checks and export."""
    global FPS, SIZE
    beats = rjson(w / "beats.json") if (w / "beats.json").exists() else {}
    f = beats.get("format", "1920x1080")
    if f not in FORMATS:
        die(f"beats.json format {f!r} is not supported", f"use one of {', '.join(FORMATS)}")
    SIZE = tuple(int(v) for v in f.split("x"))
    FPS = int(beats.get("fps") or (60 if SIZE[0] > SIZE[1] else 30))
    return f, FPS


def fit(area: int) -> tuple:
    """A (w, h) with the film's aspect and about `area` pixels: 320x180-sized analysis copies and sheet tiles at any format."""
    k = (area / (SIZE[0] * SIZE[1])) ** 0.5
    return round(SIZE[0] * k), round(SIZE[1] * k)


def short(p: Path) -> str:
    return str(p).replace(str(Path.home()), "~")


# --------------------------------------------------------------- bundling
def bundle(w: Path, slug: str, out: Path) -> Path:
    """One self-contained page: the muxer, music.json, both stems (base64), the engine and the film, all inline."""
    if not (w / "film.js").exists():
        die(f"no film.js in {short(w)}", f"python3 reel.py init {slug}")
    beats = rjson(w / "beats.json") if (w / "beats.json").exists() else {}
    audio = {
        n: base64.b64encode((w / f"{n}.mp3").read_bytes()).decode()
        for n in ("music", "sfx")
        if (w / f"{n}.mp3").exists()
    }
    music = rjson(w / "music.json") if (w / "music.json").exists() else None
    fmt, fps = use_format(w)
    data = (
        f"window.SLUG={json.dumps(slug)};window.FORMAT={json.dumps(fmt)};window.REEL_FPS={fps};"
        f"window.MUSIC={json.dumps(music)};window.AUDIO={json.dumps(audio) if audio else 'null'};"
    )
    js = lambda s: s.replace("</script", "<\\/script")  # noqa: E731
    parts = {
        "vendor/mp4-muxer.min.js": f"/* {MUXER} */\n" + (TEMPLATE / "vendor/mp4-muxer.min.js").read_text(),
        "data.js": data,
        "engine.js": (TEMPLATE / "engine.js").read_text(),
        "film.js": (w / "film.js").read_text(),
    }
    page = (TEMPLATE / "index.html").read_text()
    for src, body in parts.items():
        tag = f'<script src="{src}"></script>'
        if tag not in page:
            die(f"template/index.html lost its {tag}", "restore the template from the plugin")
        page = page.replace(tag, f"<script>\n{js(body)}\n</script>")
    page = page.replace("<title>Motion reel</title>", f"<title>{html.escape(beats.get('title') or slug)}</title>")
    out.parent.mkdir(parents=True, exist_ok=True)
    out.write_text(page)
    return out


# --------------------------------------------------------------- browser
class Browser:
    """System Chrome through Playwright (channel="chrome"); Playwright's own Chromium only if Chrome is missing."""

    def __enter__(self):
        from playwright.sync_api import sync_playwright

        self.pw = sync_playwright().start()
        args = ["--autoplay-policy=no-user-gesture-required", "--enable-gpu-rasterization"]
        try:
            self.b = self.pw.chromium.launch(channel="chrome", headless=True, args=args)
            self.kind = "chrome"
        except Exception:
            print("Google Chrome not found: installing Playwright's Chromium (no admin rights needed)", file=sys.stderr)
            subprocess.run([sys.executable, "-m", "playwright", "install", "chromium"], check=True)
            self.b = self.pw.chromium.launch(headless=True, args=args)
            self.kind = "chromium"
        return self

    def __exit__(self, *a):
        self.b.close()
        self.pw.stop()

    def page(self, path: Path, query: str = "?render", init: str = ""):
        ctx = self.b.new_context(viewport={"width": 1280, "height": 720}, accept_downloads=True)
        if init:
            ctx.add_init_script(init)
        pg = ctx.new_page()
        pg.errs = []
        pg.on("pageerror", lambda e: pg.errs.append(f"pageerror: {e}"))
        pg.on("console", lambda m: m.type == "error" and pg.errs.append(f"console: {m.text}"))
        pg.goto(path.as_uri() + query, wait_until="load")
        if not pg.evaluate("!!(window.FILM && window.render)"):
            die(
                "the film did not load:\n  " + "\n  ".join(pg.errs or ["window.FILM is missing"]),
                "fix film.js (the first error names the line), then re-run",
            )
        return pg


def grab(pg, t: float, S: int = 1, png: bool = False):
    from PIL import Image

    url = pg.evaluate(
        "([t,S,png]) => { render(t,S); return document.getElementById('c').toDataURL(png ? 'image/png' : 'image/jpeg', .92); }",
        [t, S, png],
    )
    return Image.open(io.BytesIO(base64.b64decode(url.split(",", 1)[1]))).convert("RGB")


def sheet(tiles, out: Path, cols: int = SHEET_COLS, tile: tuple = None, per: int = SHEET_TILES) -> list:
    """tiles: [(PIL image, label)] -> numbered pages <out>-01.jpg ... of `per` labelled tiles, `cols` a row. Returns the names."""
    from PIL import Image, ImageDraw

    tile = tile or fit(384 * 216)
    for old in [out, *out.parent.glob(f"{out.stem}-*.jpg")]:
        old.unlink(missing_ok=True)
    (tw, th), names = tile, []
    for p in range(0, max(1, len(tiles)), per):
        page = tiles[p : p + per]
        rows = (len(page) + cols - 1) // cols
        img = Image.new("RGB", (cols * (tw + 4) + 4, rows * (th + 4) + 4), (40, 40, 44))
        d = ImageDraw.Draw(img)
        for i, (im, label) in enumerate(page):
            x, y = 4 + (i % cols) * (tw + 4), 4 + (i // cols) * (th + 4)
            img.paste(im.resize(tile), (x, y))
            d.rectangle([x, y, x + 8 + 6 * len(label), y + 15], fill=(0, 0, 0))
            d.text((x + 4, y + 2), label, fill=(255, 255, 255))
        name = f"{out.stem}-{p // per + 1:02d}.jpg"
        out.parent.mkdir(parents=True, exist_ok=True)
        img.save(out.parent / name, quality=85)
        names.append(name)
    return names


def small(pg, t: float):
    """render(t) on a ?calm page, as a ~320x180-pixel grayscale array (aspect follows the format): cheap enough to sample the whole film."""
    import numpy as np
    from PIL import Image

    sw, sh = fit(320 * 180)
    url = pg.evaluate(
        "([t, w, h]) => { render(t, 1); const s = window._sm || (window._sm = Object.assign(document.createElement('canvas'), {width: w, height: h}));"
        " const x = s.getContext('2d'); x.drawImage(document.getElementById('c'), 0, 0, w, h); return s.toDataURL('image/png'); }",
        [t, sw, sh],
    )
    return np.asarray(Image.open(io.BytesIO(base64.b64decode(url.split(",", 1)[1]))).convert("L"), dtype=np.int16)


def poster_score(im) -> tuple:
    """(% of the frame inked away from the background, % of the frame on a sharp edge) for a frame, at ~960x540 pixels."""
    import numpy as np

    g = np.asarray(im.convert("L").resize(fit(960 * 540)), dtype=np.int16)
    bgv = int(np.median(g))
    ink = float(np.mean(np.abs(g - bgv) > 24) * 100)
    e = (np.abs(np.diff(g, axis=1))[:-1, :] > 60) | (np.abs(np.diff(g, axis=0))[:, :-1] > 60)
    return ink, float(e.mean() * 100)


def safezone(im, safe: dict):
    """A copy of a frame with the format's zones drawn on: red outside the platform safe zone, cyan the layout margins
    (SAFE.l/r, hud top/bottom), yellow the caption band."""
    from PIL import Image, ImageDraw

    im = im.convert("RGBA")
    ov = Image.new("RGBA", im.size, (0, 0, 0, 0))
    d = ImageDraw.Draw(ov)
    W_, H_ = im.size
    pl = safe.get("plat") or {"l": 0, "r": W_, "top": 0, "bottom": H_}
    for box in ((0, 0, W_, pl["top"]), (0, pl["bottom"], W_, H_), (0, 0, pl["l"], H_), (pl["r"], 0, W_, H_)):
        if box[2] > box[0] and box[3] > box[1]:
            d.rectangle(box, fill=(255, 0, 60, 90))
    d.rectangle((safe["l"], safe["hud"]["top"], safe["r"], safe["hud"]["bottom"]), outline=(0, 230, 255, 255), width=4)
    cap = safe.get("cap")
    if cap:
        d.rectangle((safe["l"], cap["y"] - cap["h"] / 2, safe["r"], cap["y"] + cap["h"] / 2), outline=(255, 220, 0, 255), width=4)
    return Image.alpha_composite(im, ov).convert("RGB")


def changed(a, b, level: int = 24) -> float:
    """% of the frame whose brightness moves by more than `level` (0-255) between two frames."""
    import numpy as np

    return float(np.mean(np.abs(a - b) > level) * 100)


def cut_scores(pg, starts: list, flips: list, beat: float) -> list:
    """At each scene start t0: how much of the frame jumps from t0 - 1 frame to t0 + 1 frame, minus how much the film moves
    anyway: over two frames just before and just after, and across the beat before (things that change on every beat).
    A hand-off moves continuously; a hard cut or a shared constant that differs between the two scenes jumps.
    Returns [(t0, score, jump, motion, note)]; boundaries with a colour flip are skipped."""
    f, out = 1 / FPS, []
    for t0 in starts:
        if any(abs(x - t0) < 2 * f for x in flips):
            out.append((t0, 0.0, 0.0, 0.0, "colour flip, skipped"))
            continue
        a3, a1, z1, z3 = (small(pg, t0 + d * f) for d in (-3, -1, 1, 3))
        jump = changed(a1, z1)
        motion = max(changed(a3, a1), changed(z1, z3), changed(small(pg, t0 - beat - f), small(pg, t0 - beat + f)))
        out.append((t0, max(0.0, jump - motion), jump, motion, ""))
    return out


def static_holds(
    pg, dur: float, beat: float, fps: int = 8, level: int = HOLD_LEVEL, still: float = HOLD_STILL, poster: bool = False
) -> list:
    """Stretches longer than HOLD_BEATS where consecutive frames (1/fps apart) change less than `still` % of the frame.
    poster: a social film's opening poster may hold still from t=0 for up to POSTER_HOLD seconds."""
    holds, run0, prev = [], None, small(pg, 0.0)
    for i in range(1, int(dur * fps)):
        t = i / fps
        cur = small(pg, t)
        quiet = changed(prev, cur, level) < still
        if quiet and run0 is None:
            run0 = t - 1 / fps
        if (not quiet or i == int(dur * fps) - 1) and run0 is not None:
            if poster and run0 <= 1e-6 and t <= POSTER_HOLD:
                pass  # the frame-0 poster hold
            elif t - run0 > HOLD_BEATS * beat and t < dur - 1:  # the tail after the final hit may rest
                holds.append((run0, t))
            run0 = None
        prev = cur
    return holds


# --------------------------------------------------------------- stubs (used until sfx.py exists)
def stub_sfx(w: Path) -> None:
    """A quiet tick per cue, the same length as the music. Replaced by sfx.py."""
    import numpy as np
    import soundfile as sf

    dur = rjson(w / "music.json")["dur"]
    x = np.zeros(int(dur * SR))
    k = np.arange(int(0.08 * SR)) / SR
    for e in rjson(w / "cues.json")["events"]:
        big = e["k"] in ("impact", "boom")
        tone = (
            np.sin(2 * np.pi * (220 if big else 2800) * k) * np.exp(-k * (25 if big else 90)) * (0.25 if big else 0.08)
        )
        i = int(e["t"] * SR)
        seg = tone[: max(0, len(x) - i)]
        x[i : i + len(seg)] += seg
    sf.write(w / "sfx.mp3", np.stack([x, x], 1), SR, format="MP3")


def run_module(name: str, w: Path) -> bool:
    """Import sfx.py from the skill dir and call .build(workdir). False when the module is not there."""
    p = SKILL / f"{name}.py"
    if not p.exists():
        return False
    spec = importlib.util.spec_from_file_location(name, p)
    mod = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(mod)
    mod.build(w)
    return True


# --------------------------------------------------------------- audio helpers
def read_mono_stereo(p: Path):
    import numpy as np
    import soundfile as sf
    from scipy.signal import resample_poly

    x, sr = sf.read(p, always_2d=True)
    if x.shape[1] == 1:
        x = np.repeat(x, 2, 1)
    if sr != SR:
        x = resample_poly(x, SR, sr, axis=0)
    return x[:, :2]


def mixdown(w: Path, gains: dict, sec: float):
    """The live player's mix, offline, in numpy: (music * g + sfx * g) * master, trimmed or padded to sec."""
    import numpy as np

    n = int(round(sec * SR))
    y = np.zeros((n, 2))
    for name in ("music", "sfx"):
        if (w / f"{name}.mp3").exists():
            x = read_mono_stereo(w / f"{name}.mp3")[:n]
            y[: len(x)] += x * gains.get(name, 1)
    return y * gains.get("master", 1)


def loudness(x) -> tuple:
    import numpy as np
    import pyloudnorm as pyln
    from scipy.signal import resample_poly

    lufs = pyln.Meter(SR).integrated_loudness(x)
    tp = 20 * np.log10(max(1e-9, np.abs(resample_poly(x, 4, 1, axis=0)).max()))
    return lufs, tp


# --------------------------------------------------------------- commands
def cmd_init(a) -> None:
    w = workdir(a.slug, must_exist=False)
    w.mkdir(parents=True, exist_ok=True)
    made = []
    if not (w / "film.js").exists() or a.force:
        shutil.copy(TEMPLATE / "film.js", w / "film.js")
        made.append("film.js")
    if not (w / "beats.json").exists():
        ex = {
            "title": a.slug.replace("-", " ").title(),
            **({"format": a.format} if a.format else {}),
            "bpm": 120,
            "key": "A minor",
            "scenes": [
                {"name": "OPEN", "bars": 2, "role": "intro"},
                {"name": "DIRECTION", "bars": 3, "role": "build"},
                {"name": "SCALE", "bars": 4, "role": "drop", "climax": True},
                {"name": "END", "bars": 3, "role": "end"},
            ],
        }
        (w / "beats.json").write_text(json.dumps(ex, indent=1))
        made.append("beats.json (example: replace it)")
    print(f"work dir {short(w)}: {', '.join(made) or 'already set up (film.js kept; --force replaces it)'}")
    print(
        f"next: write story.md and beats.json, then compose score.py (music.md) and run python3 reel.py music {a.slug}"
    )


def cmd_music(a) -> None:
    w = workdir(a.slug)
    if not (w / "beats.json").exists():
        die(f"no beats.json in {short(w)}", "write beats.json: {title, bpm, key, meter?, scenes:[{name, bars, role}]}")
    score = w / "score.py"
    if not score.exists():
        shutil.copy(TEMPLATE / "score.py", score)
        print(f"no score.py yet: copied the example score to {short(score)} (compose your own: music.md)", flush=True)
    t0 = time.time()
    env = {**os.environ, "PYTHONPATH": os.pathsep.join(filter(None, [str(SKILL), os.environ.get("PYTHONPATH")]))}
    if subprocess.run([sys.executable, str(score), str(w)], env=env).returncode:
        die(f"{short(score)} failed (the traceback above names the line)", "fix score.py, then re-run")
    mj = w / "music.json"
    if not mj.exists() or mj.stat().st_mtime < t0 or not (w / "music.mp3").exists():
        die("score.py did not write music.mp3 + music.json", "end the score with M.write(work, mix, P, hits)")
    sys.path.insert(0, str(SKILL))
    import music

    m, want = rjson(mj), music.plan(w)["scenes"]
    got = [(s["name"], round(s["t0"], 3)) for s in m["scenes"]]
    if got != [(s["name"], round(s["t0"], 3)) for s in want]:
        die("music.json scenes do not match beats.json", "build P with M.plan(work) and pass it to M.write unchanged")
    print(
        f"music.mp3 {m['dur']:.2f}s at {m['bpm']:g} BPM, {m.get('beats_per_bar', 4)} beats a bar, "
        f"{len(m['scenes'])} scenes, {len(m['hits'])} hits, drop {m['drop_t']:.2f}s"
    )
    print(f"next: python3 reel.py cues {a.slug}")


def cmd_sfx(a) -> None:
    w = workdir(a.slug)
    for f, fix in (("music.json", "music"), ("cues.json", "cues")):
        if not (w / f).exists():
            die(f"no {f}", f"python3 reel.py {fix} {a.slug}")
    real = run_module("sfx", w)
    if not real:
        stub_sfx(w)
    print("sfx.mp3 written" + ("" if real else "  (STUB ticks: sfx.py not installed)"))
    print(f"next: python3 reel.py check {a.slug}")


def film_page(w: Path, slug: str) -> Path:
    if not (w / "music.json").exists():
        print(
            f"warning: no music.json, the film uses its fallback timing (python3 reel.py music {slug})", file=sys.stderr
        )
    return bundle(w, slug, w / "reel.html")


def cmd_cues(a) -> None:
    w = workdir(a.slug)
    page = film_page(w, a.slug)
    with Browser() as br:
        pg = br.page(page, "?render&nograin")
        out = pg.evaluate("({dur: FILM.DUR, bpm: FILM.BPM, w: FILM.W, h: FILM.H, fps: FILM.FPS, scenes: FILM.SCENES, events: FILM.cues()})")
        early = pg.evaluate("FILM.early || []")
        if pg.errs:
            die("page errors while sweeping cues:\n  " + "\n  ".join(pg.errs[:10]), "fix film.js, then re-run")
    (w / "cues.json").write_text(json.dumps(out, separators=(",", ":")).replace("},{", "},\n{"))
    n = {}
    for e in out["events"]:
        n[e["k"]] = n.get(e["k"], 0) + 1
    print(f"cues.json: {len(out['events'])} events " + " ".join(f"{k}:{v}" for k, v in sorted(n.items())))
    if early:
        e = early[0]
        print(
            f"warning: {len(early)} cue{'s' * (len(early) != 1)} before their scene's start dropped (first: {e['k']} "
            f"{e.get('s') or ''!r} in {e['scene']} at u={e['t']}s); use label() for text already on screen, or t0 >= 0"
        )
    print(f"next: python3 reel.py sfx {a.slug}")


def stale_sound(w: Path) -> str:
    """'' when cues.json and sfx.mp3 are newer than film.js, else what is missing or stale."""
    film = (w / "film.js").stat().st_mtime
    for f in ("cues.json", "sfx.mp3"):
        if not (w / f).exists():
            return f"no {f}"
        if (w / f).stat().st_mtime < film:
            return f"film.js is newer than {f}"
    return ""


def cmd_check(a) -> None:
    import numpy as np

    w = workdir(a.slug)
    ck = w / "check"
    ck.mkdir(exist_ok=True)
    page = film_page(w, a.slug)
    res = []  # (status, name, detail)
    music = rjson(w / "music.json") if (w / "music.json").exists() else None
    stale = stale_sound(w)
    res.append(
        (
            "PASS" if not stale else "WARN" if stale.startswith("no ") else "FAIL",
            "sound",
            "cues.json and sfx.mp3 are up to date with film.js"
            if not stale
            else f"{stale}, so the sound effects no longer match the picture  fix: run cues, then sfx "
            f"(python3 reel.py cues {a.slug} && python3 reel.py sfx {a.slug})",
        )
    )
    with Browser() as br:
        pg = br.page(page, "?render")
        F = pg.evaluate(
            "({DUR: FILM.DUR, BPM: FILM.BPM, BEAT: FILM.BEAT, SCENES: FILM.SCENES, IMP: FILM.IMP, MIX: FILM.MIX})"
        )
        dur, scenes = F["DUR"], F["SCENES"]
        # 1. errors: load + one render per half second
        for t in np.arange(0, dur, 0.5):
            try:
                pg.evaluate("t => render(t, 1)", float(t))
            except Exception as e:  # a throw inside render() surfaces here
                pg.errs.append(f"render({t:.1f}): {str(e).splitlines()[0]}")
        res.append(
            (
                "FAIL" if pg.errs else "PASS",
                "errors",
                f"{len(pg.errs)} console/page errors" + ("".join(f"\n        {e}" for e in pg.errs[:5])),
            )
        )
        # 2. purity: render t1 -> t2 -> t1 must give identical pixels
        mids = [(s + e) / 2 for (s, _), e in zip(scenes, [x[0] for x in scenes[1:]] + [dur], strict=False)]
        pairs = [(mids[i], mids[(i + 1) % len(mids)]) for i in range(len(mids))]
        pg = br.page(
            page, "?render&cpu"
        )  # CPU canvas: GPU/CPU switching would change anti-aliasing between the two renders
        js = "([a,b]) => { const x = document.getElementById('c').getContext('2d'), g = () => x.getImageData(0,0,W,H).data; render(a); const A = g(); render(b); render(a); const B2 = g(); let d = 0; for (let i = 0; i < A.length; i += 4) if (A[i]!==B2[i]||A[i+1]!==B2[i+1]||A[i+2]!==B2[i+2]) d++; return d; }"
        diffs = [pg.evaluate(js, list(p)) for p in pairs]
        res.append(
            (
                "PASS" if not any(diffs) else "FAIL",
                "purity",
                f"{len(pairs)} pairs, {sum(diffs)} px differ"
                + (
                    ""
                    if not any(diffs)
                    else "  fix: state leaks between frames (reset what you set, or keep it inside c.save()/c.restore())"
                ),
            )
        )
        # 3. contact sheets: 1 fps, and 8 fps across each hand-off (0.5 s either side of a scene start), in pages of 24
        idx = lambda t: max(i for i, s in enumerate(scenes) if t >= s[0] - 1e-9)  # noqa: E731
        name = lambda t: scenes[idx(t)][1]  # noqa: E731
        beat = music["beat"] if music else F["BEAT"]
        at = lambda t: f"{name(t)} beat {(t - scenes[idx(t)][0]) / beat:.1f}"  # noqa: E731  scene + beat within it
        tiles = [(grab(pg, t), f"{t:5.2f}s {name(t)}") for t in np.arange(0.5, dur, 1.0)]
        p1 = sheet(tiles, ck / "sheet-1fps.jpg")
        hand = [
            (grab(pg, s + d), f"{s + d:5.2f}s {name(s + d)}")
            for s, _ in scenes[1:]
            for d in np.arange(-0.5, 0.5, 0.125)
        ]
        p2 = sheet(hand, ck / "handoffs.jpg")
        # legibility: one large frame per scene, once its last text has landed (else its midpoint), to read text on
        ev = pg.evaluate("FILM.cues()")
        ends = [s for s, _ in scenes[1:]] + [dur]
        leg = []
        for i, ((t0, _), t1) in enumerate(zip(scenes, ends, strict=False)):
            done = [
                e["t"]
                + {"slam": e.get("n", 1) * e.get("st", 0.026) + 0.55, "type": e.get("n", 1) * e.get("rate", 0.016)}.get(
                    e["k"], e.get("d", 0.6)
                )
                for e in ev
                if e.get("sc") == i and e["k"] in TEXT_CUES and e["t"] < t1 - 0.3
            ]
            t = min(max(done) + 0.2, t1 - 0.25) if done else (t0 + t1) / 2
            leg.append((grab(pg, t), f"{t:5.2f}s {at(t)}"))
        p3 = sheet(leg, ck / "legibility.jpg", cols=2, tile=fit(960 * 540), per=6)
        # poster: frame 0 is the thumbnail, so it must be a finished frame (text and key visual on), not an empty stage
        safe = pg.evaluate("SAFE")
        f0 = grab(pg, 0.0, 1, png=True)
        f0.save(ck / "poster.png")
        ink, edges = poster_score(f0)
        p0 = br.page(page, "?render&cpu&calm")
        first = next((i / 8 for i in range(1, 17) if changed(small(p0, 0.0), small(p0, i / 8), HOLD_LEVEL) >= HOLD_STILL), None)
        social = SIZE[0] <= SIZE[1]
        empty = ink < POSTER_INK or edges < POSTER_EDGES
        res.append(
            (
                ("FAIL" if social else "WARN") if empty else "PASS",
                "poster",
                f"frame 0: {ink:.1f}% inked (min {POSTER_INK}), {edges:.2f}% edges (min {POSTER_EDGES}, text makes edges), "
                f"first motion at {'%.2fs' % first if first is not None else '> 2 s'} -> check/poster.png"
                + (
                    "  fix: draw the hook headline and key visual fully built at t=0 (label()/chars(), not a slam starting at 0), hold ~0.8 s"
                    if empty
                    else ""
                ),
            )
        )
        # safe zones: frame 0 and every legibility frame with the format's zones drawn on
        zs = [(safezone(f0, safe), " 0.00s POSTER")] + [(safezone(im, safe), lb) for im, lb in leg]
        p4 = sheet(zs, ck / "safezone.jpg", cols=3 if social else 2, tile=fit(640 * 360 if social else 960 * 540), per=6)
        res.append(
            (
                "PASS",
                "sheets",
                f"check/sheet-1fps-*.jpg ({len(tiles)} frames, {len(p1)} pages), check/handoffs-*.jpg ({len(scenes) - 1} hand-offs x 8, {len(p2)} pages), "
                f"check/legibility-*.jpg (one large frame per scene with its text on, {len(p3)} pages), "
                f"check/safezone-*.jpg (poster + legibility frames with the {SIZE[0]}x{SIZE[1]} safe zones, {len(p4)} pages)",
            )
        )
        # 4. beat grid: impacts/booms/flips on a beat (<10 ms), slams/pops on the eighth-note grid, strong music hits answered
        off = lambda t, g: (t - round(t / g) * g) * 1000  # noqa: E731
        lines, bad = [], 0
        for e in ev:
            if e["k"] in ("impact", "boom", "flip", "slam", "pop"):
                g = beat if e["k"] in ("impact", "boom", "flip") else beat / 2
                ms = off(e["t"], g)
                ok = abs(ms) < 10
                bad += not ok
                lines.append(
                    f"{'ok ' if ok else 'OFF'} {e['t']:8.3f}s {e['k']:<7}{ms:+7.1f} ms vs {'beat' if g == beat else '8th'}  {e.get('s', '')}"
                )
        missed = [
            h
            for h in (music or {}).get("hits", [])
            if h["strength"] >= STRONG and not any(abs(h["t"] - e["t"]) < 0.04 for e in ev)
        ]
        lines += [
            f"UNANSWERED music hit {h['t']:.3f}s strength {h['strength']:.2f} {h.get('kind', '')}" for h in missed
        ]
        (ck / "grid.txt").write_text("\n".join(lines) + "\n")
        n = sum(1 for e in ev if e["k"] in ("impact", "boom", "flip", "slam", "pop"))
        st = "FAIL" if bad else "WARN" if missed else "PASS"
        res.append(
            (
                st,
                "grid",
                f"{n - bad}/{n} events on the grid, {len(missed)} strong music hits unanswered -> check/grid.txt"
                + ("  fix: move the OFF events onto beats (b(n))" if bad else ""),
            )
        )
        # 4b. cuts: a jump across a scene boundary is a hard cut or a shared constant the two scenes disagree on
        pc = br.page(page, "?render&cpu&calm")
        flips = [e["t"] for e in ev if e["k"] == "flip"]
        cuts = cut_scores(pc, [s for s, _ in scenes[1:]], flips, beat)
        worst = max((c[1] for c in cuts), default=0.0)
        hand_off = lambda t0: f"{name(t0 - 1e-3)} -> {name(t0)}"  # noqa: E731
        (ck / "cuts.txt").write_text(
            "t0  hand-off  score  jump  motion  (% of the frame; score = jump - motion)\n"
            + "".join(f"{t0:7.3f}s {hand_off(t0):<32} {sc:5.1f} {j:5.1f} {m:5.1f}  {nt}\n" for t0, sc, j, m, nt in cuts)
        )
        bad_cuts = [f"{t0:.2f}s {hand_off(t0)} ({sc:.1f})" for t0, sc, *_ in cuts if sc >= CUT_WARN]
        res.append(
            (
                "FAIL" if worst >= CUT_FAIL else "WARN" if bad_cuts else "PASS",
                "cuts",
                f"worst boundary jump {worst:.1f} (warn {CUT_WARN}, fail {CUT_FAIL}) -> check/cuts.txt"
                + (
                    f"\n        {', '.join(bad_cuts)}  fix: both scenes must draw the same shared geometry at the boundary (see check/handoffs-*.jpg)"
                    if bad_cuts
                    else ""
                ),
            )
        )
        holds = static_holds(pc, dur, beat, poster=SIZE[0] <= SIZE[1])
        res.append(
            (
                "WARN" if holds else "PASS",
                "holds",
                f"{len(holds)} static holds over {HOLD_BEATS:g} beats"
                + (
                    "\n        "
                    + "\n        ".join(
                        f"{a:.2f}-{z:.2f}s  {name(a)} beats {(a - scenes[idx(a)][0]) / beat:.1f}-{(z - scenes[idx(a)][0]) / beat:.1f}"
                        for a, z in holds
                    )
                    + "\n        fix: keep something alive (sheen, run, glints, a pulse on the beat); tiny specks do not count (craft.md)"
                    if holds
                    else ""
                ),
            )
        )
        # 5. SFX-event frames: a frame 33 ms after up to 20 key cues, proving each sound has a visible cause
        rank = {"boom": 0, "impact": 1, "flip": 2, "slam": 3, "pop": 4}
        key = sorted(
            (e for e in ev if e["k"] in rank),
            key=lambda e: (rank[e["k"]], -(e["s"] if e["k"] in ("boom", "impact") else 0), -e.get("size", 0)),
        )
        pick = []
        for e in key:
            if len(pick) < 20 and all(abs(e["t"] - p["t"]) > 0.1 for p in pick):
                pick.append(e)
        pick.sort(key=lambda e: e["t"])
        sheet(
            [(grab(pg, e["t"] + 0.033), f"{e['t']:.2f}s {name(e['t'])} {e['k']} {e.get('s', '')}"[:60]) for e in pick],
            ck / "sfx-events.jpg",
        )
        res.append(("PASS", "sfx-frames", f"check/sfx-events-*.jpg ({len(pick)} events)"))
        # 6. loudness of the stems and of the player's mix
        if music and (w / "music.mp3").exists():
            m = read_mono_stereo(w / "music.mp3")
            ml, mt = loudness(m)
            det = f"music {ml:.1f} LUFS {mt:.1f} dBTP"
            rep = {"music": {"lufs": ml, "dbtp": mt}}
            warn = not (-15 <= ml <= -13 and mt <= -1)
            if (w / "sfx.mp3").exists():
                sl, stp = loudness(read_mono_stereo(w / "sfx.mp3"))
                det += f"; sfx {sl:.1f} LUFS ({ml - sl:.1f} under)"
                rep["sfx"] = {"lufs": sl, "dbtp": stp}
                warn |= not (5.5 <= ml - sl <= 8.5)
            xl, xt = loudness(mixdown(w, F["MIX"], dur))
            rep["mix"] = {"lufs": xl, "dbtp": xt, "gains": F["MIX"]}
            (ck / "loudness.json").write_text(json.dumps(rep, indent=1))
            det += f"; mix {xl:.1f} LUFS {xt:.1f} dBTP" + ("  (stub music)" if music.get("stub") else "")
            res.append(
                (
                    "FAIL" if xt > 0 else "WARN" if warn else "PASS",
                    "loudness",
                    det + ("  fix: the mix clips, lower MIX.master in engine.js or the stems" if xt > 0 else ""),
                )
            )
        else:
            res.append(("WARN", "loudness", f"no music yet (python3 reel.py music {a.slug})"))
        # 7. player: Start with audio, clock advances, both stems audible
        if (w / "music.mp3").exists():
            pp = br.page(page, "")
            pp.click("#start")
            pp.wait_for_function("PLAYER.snd.ready && !PLAYER.snd.paused()", timeout=20000)
            pp.wait_for_timeout(500)  # let the output latency settle
            t1, c1 = pp.evaluate("[PLAYER.time(), performance.now() / 1000]")
            rms = {}
            for _ in range(30):
                for n in pp.evaluate("PLAYER.snd.stems"):
                    rms[n] = max(rms.get(n, 0), pp.evaluate("n => PLAYER.snd.rms(n)", n))
                pp.wait_for_timeout(50)
            t2, c2 = pp.evaluate("[PLAYER.time(), performance.now() / 1000]")
            rate = (t2 - t1) / max(1e-6, c2 - c1)
            ok = abs(rate - 1) < 0.02 and all(v > 0 for v in rms.values()) and not pp.errs
            res.append(
                (
                    "PASS" if ok else "FAIL",
                    "player",
                    f"audio clock {rate:.3f} s per wall s, rms "
                    + " ".join(f"{k} {v:.3f}" for k, v in rms.items())
                    + ("".join(f"\n        {e}" for e in pp.errs[:3])),
                )
            )
    print(f"check {a.slug}  (film {dur:.2f}s, {len(scenes)} scenes, {F['BPM']:g} BPM)")
    for st, n, d in res:
        print(f"  {st:<5} {n:<11}{d}")
    fails, warns = sum(r[0] == "FAIL" for r in res), sum(r[0] == "WARN" for r in res)
    print(
        f"result: {'FAIL' if fails else 'PASS'}"
        + (f" ({warns} warning{'s' * (warns != 1)})" if warns else "")
        + f" -> {short(ck)}/  (look at the sheets)"
    )
    (ck / "summary.txt").write_text("\n".join(f"{st} {n} {d}" for st, n, d in res) + "\n")
    sys.exit(1 if fails else 0)


def cmd_build(a) -> None:
    w = workdir(a.slug)
    if not (w / "music.mp3").exists():
        die("no music.mp3", f"python3 reel.py music {a.slug}")
    out = bundle(w, a.slug, DESKTOP / f"{a.slug}.html")
    print(
        f"built {short(out)} ({out.stat().st_size / 1e6:.1f} MB, self-contained{'' if (w / 'sfx.mp3').exists() else ', NO sfx stem'})"
    )
    print(f"next: open it, or python3 reel.py export {a.slug}")


def verify_mp4(path: Path, pg, dur: float, S: int, starts: list) -> list:
    """h264 + aac, the film's size and fps, yuv420p, duration within a frame, and decoded frames matching render(t, S)."""
    import av
    import numpy as np

    out, errs = [], []
    with av.open(str(path)) as c:
        v, au = c.streams.video[0], (c.streams.audio[0] if c.streams.audio else None)
        vc, ac = v.codec_context.name, au.codec_context.name if au else "none"
        pix = v.codec_context.pix_fmt
        fr = float(v.average_rate or 0)
        idx = {
            min(int(round(dur * FPS)) - 31, int(round((t0 + 0.3) * FPS))) for t0 in starts
        }  # just after each scene start: moving pictures
        frames, got = 0, {}
        for fr_ in c.decode(v):
            if frames in idx:
                got[frames] = fr_.to_image()
            frames += 1
        adur = float(au.duration * au.time_base) if au and au.duration else 0
    vdur = frames / FPS
    out.append(
        f"{vc} {v.width}x{v.height} {pix} {fr:g} fps, {ac} audio, {frames} frames = {vdur:.3f}s (film {dur:.3f}s), audio {adur:.2f}s"
    )
    if vc != "h264" or ac != "aac" or (v.width, v.height) != SIZE or abs(fr - FPS) > 0.01 or pix != "yuv420p":
        errs.append(f"wrong format (want h264 + aac, {SIZE[0]}x{SIZE[1]} yuv420p, {FPS} fps)")
    if abs(vdur - dur) > 1 / FPS + 1e-6:
        errs.append(f"duration off by {vdur - dur:+.3f}s")
    mads, wrong = [], []
    for n, arr in sorted(
        got.items()
    ):  # the decoded frame n must match render(n / FPS) far better than render(n / FPS + 0.25 s)
        # compared at ~480x270: film grain is per-frame noise the encoder may soften, the picture itself must match
        q = lambda im: np.asarray(im.resize(fit(480 * 270)), dtype=np.int16)  # noqa: E731
        ref, other, arr = q(grab(pg, n / FPS, S, png=True)), q(grab(pg, (n + round(FPS / 4)) / FPS, S, png=True)), q(arr)
        mads.append(float(np.abs(arr - ref).mean()))
        wrong.append(float(np.abs(arr - other).mean()))
    # close everywhere (mean abs diff 0-255), and clearly the right frame where it moves (render(t + 0.25 s) is far off)
    ok = bool(mads) and max(mads) <= 3 and any(x > 3 * m for m, x in zip(mads, wrong, strict=False))
    out.append(
        f"frames match render(t): max diff {max(mads, default=0):.1f} (limit 3.0), {len(mads)} frames"
        f" {'✓' if ok else '✗'}"
    )
    if not ok:
        errs.append("decoded frames do not match render(t)")
    return out + [("FAIL: " + "; ".join(errs)) if errs else "verified"]


def export_page(br, page: Path, out: Path, S: int, mbps: float) -> str:
    """Run the page's own exporter headless and catch the download. Returns '' or the reason it failed."""
    pg = br.page(page, "", init="Object.defineProperty(window, 'showSaveFilePicker', { value: undefined });")
    got = []
    pg.on("download", lambda d: got.append(d))
    pg.evaluate(
        "([S, m]) => { PLAYER.exportMP4({ S, mbps: m }).catch(e => { window.EXPORT = { error: e.message }; }); }",
        [S, mbps],
    )
    last, t0 = -1, time.time()
    while not got:
        st = pg.evaluate("window.EXPORT || {}")
        if st.get("error"):
            return st["error"]
        p = int(st.get("p", 0) * 10)
        if p != last and st.get("phase", "").startswith("RENDERING"):
            print(f"  page export {p * 10:3d}%  {time.time() - t0:.0f}s", flush=True)
            last = p
        pg.wait_for_timeout(1000)
        if time.time() - t0 > 3600:
            return "timed out after an hour"
    got[0].save_as(out)
    info = pg.evaluate("window.EXPORT")
    print(
        f"  page export done in {time.time() - t0:.0f}s: {info.get('codec')} S={info.get('S')} {info.get('mbps')} Mbps {info.get('bytes', 0) / 1e6:.1f} MB"
    )
    return ""


def export_pyav(pg, w: Path, out: Path, dur: float, S: int, gains: dict, mbps: float) -> None:
    """Fallback: render(t, S) frames from the page + the numpy mix, encoded with PyAV (libx264 + aac)."""
    import av
    import numpy as np

    N = int(round(dur * FPS))
    mixd = mixdown(w, gains, N / FPS).astype(np.float32)
    with av.open(str(out), "w") as c:
        vs = c.add_stream("libx264", rate=FPS, options={"preset": "medium"})
        vs.bit_rate = int(mbps * 1e6)
        vs.width, vs.height, vs.pix_fmt = SIZE[0], SIZE[1], "yuv420p"
        aus = c.add_stream("aac", rate=SR, layout="stereo")
        aus.bit_rate = 192000
        for i in range(0, len(mixd), 1024):
            fr = av.AudioFrame.from_ndarray(np.ascontiguousarray(mixd[i : i + 1024].T), format="fltp", layout="stereo")
            fr.sample_rate, fr.pts = SR, i
            for pk in aus.encode(fr):
                c.mux(pk)
        for pk in aus.encode():
            c.mux(pk)
        t0 = time.time()
        for n in range(N):
            fr = av.VideoFrame.from_ndarray(np.asarray(grab(pg, n / FPS, S)), format="rgb24")
            fr.pts = n
            for pk in vs.encode(fr):
                c.mux(pk)
            if n % (FPS * 5) == 0:
                print(f"  pyav export {100 * n // N:3d}%  {time.time() - t0:.0f}s", flush=True)
        for pk in vs.encode():
            c.mux(pk)


def cmd_export(a) -> None:
    w = workdir(a.slug)
    if not (w / "music.mp3").exists():
        die("no music.mp3", f"python3 reel.py music {a.slug}")
    page = film_page(w, a.slug)
    out = DESKTOP / f"{a.slug}.mp4"
    S = 1 if a.fast else 5
    t_start = time.time()
    with Browser() as br:
        ref = br.page(page, "?render")
        dur, gains, starts = (
            ref.evaluate("FILM.DUR"),
            ref.evaluate("FILM.MIX"),
            ref.evaluate("FILM.SCENES.map(s => s[0])"),
        )
        print(
            f"export {a.slug}: {dur:.2f}s, {int(round(dur * FPS))} frames at {SIZE[0]}x{SIZE[1]}@{FPS}, motion blur S={S}, {a.mbps:g} Mbps"
        )
        path, why = "page (WebCodecs)", ""
        if a.via != "pyav":
            why = export_page(br, page, out, S, a.mbps)
        if a.via == "pyav" or why:
            if why:
                print(f"  in-page export failed ({why}): falling back to PyAV")
            path = "pyav (libx264)"
            export_pyav(ref, w, out, dur, S, gains, a.mbps)
        rep = verify_mp4(out, ref, dur, S, starts)
    print(f"wrote {short(out)} ({out.stat().st_size / 1e6:.1f} MB) via {path} in {time.time() - t_start:.0f}s")
    for line in rep:
        print(f"  {line}")
    if rep[-1].startswith("FAIL"):
        sys.exit(1)


def main() -> None:
    ap = argparse.ArgumentParser(
        prog="reel.py", description="Motion reel: film.js -> self-contained page + MP4 on the Desktop."
    )
    sub = ap.add_subparsers(dest="cmd", required=True)
    for name, fn, hlp in [
        ("init", cmd_init, "make the work dir with a blank film.js scaffold"),
        ("music", cmd_music, "run <work>/score.py -> music.mp3 + music.json"),
        ("cues", cmd_cues, "film.js -> cues.json"),
        ("sfx", cmd_sfx, "cues.json -> sfx.mp3"),
        ("check", cmd_check, "verify the film -> check/"),
        ("build", cmd_build, "-> ~/Desktop/<slug>.html"),
        ("export", cmd_export, "-> ~/Desktop/<slug>.mp4"),
    ]:
        p = sub.add_parser(name, help=hlp)
        p.add_argument("slug")
        p.set_defaults(fn=fn)
        if name == "init":
            p.add_argument("--force", action="store_true", help="replace an existing film.js with the blank scaffold")
            p.add_argument("--format", choices=FORMATS, help="write it into the example beats.json (social: 1080x1350)")
        if name == "export":
            p.add_argument("--fast", action="store_true", help="no motion blur (S=1), about 4x faster")
            p.add_argument(
                "--mbps", type=float, default=8, help="video bitrate, default 8 (about 1 MB per second of film)"
            )
            p.add_argument(
                "--via",
                choices=["auto", "page", "pyav"],
                default="auto",
                help="auto: the page's WebCodecs exporter, PyAV if that fails",
            )
    a = ap.parse_args()
    ensure_env()
    a.fn(a)


if __name__ == "__main__":
    main()
