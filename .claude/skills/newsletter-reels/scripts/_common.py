#!/usr/bin/env python3
"""Shared path helpers for newsletter reel scripts."""

import os
import subprocess
from pathlib import Path


def git_path(*args: str) -> Path:
    return Path(subprocess.check_output(["git", *args], text=True).strip()).resolve()


def repo_root() -> Path:
    return git_path("rev-parse", "--show-toplevel")


def main_root() -> Path:
    common = git_path("rev-parse", "--git-common-dir")
    return common.parent if common.name == ".git" else common


def reels_dir(issue: str) -> Path:
    base = Path(os.environ.get("REEL_ROOT", repo_root() / "tmp" / "reels"))
    return base.resolve() / str(issue)


def music_dir() -> Path:
    return Path(os.environ.get("REEL_MUSIC", main_root() / ".music" / "pixabay")).resolve()


def engine_dir() -> Path:
    return Path(__file__).resolve().parent.parent / "engine"

