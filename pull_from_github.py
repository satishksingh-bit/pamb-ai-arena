#!/usr/bin/env python3
"""Pulls/downloads the latest main branch from GitHub via https://api.github.com using curl.

Usage:
  python3 pull_from_github.py [repo_name]
"""

import base64
import json
import os
import subprocess
import sys

OWNER = "satishksingh-bit"
DEFAULT_REPO = "pamb-ai-arena"
API_BASE = "https://api.github.com"


def api_get(path: str, token: str = "") -> dict:
    cmd = [
        "curl",
        "-sS",
        "-H",
        "Accept: application/vnd.github+json",
        "-H",
        "X-GitHub-Api-Version: 2022-11-28",
        "-H",
        "User-Agent: pamb-ai-arena-downloader",
    ]
    if token:
        cmd.extend(["-H", f"Authorization: Bearer {token}"])
    cmd.append(f"{API_BASE}{path}")
    out = subprocess.check_output(cmd, text=True, timeout=60)
    return json.loads(out)


def pull_repo(repo: str):
    token = os.environ.get("GITHUB_TOKEN", "").strip()
    print(f"Fetching latest commit on {OWNER}/{repo} (branch: main)...")
    ref = api_get(f"/repos/{OWNER}/{repo}/git/ref/heads/main", token)
    commit_sha = ref["object"]["sha"]
    commit = api_get(f"/repos/{OWNER}/{repo}/git/commits/{commit_sha}", token)
    tree_sha = commit["tree"]["sha"]
    tree = api_get(
        f"/repos/{OWNER}/{repo}/git/trees/{tree_sha}?recursive=1", token
    )

    count = 0
    for item in tree.get("tree", []):
        if item.get("type") != "blob":
            continue
        rel_path = item["path"]
        blob = api_get(f"/repos/{OWNER}/{repo}/git/blobs/{item['sha']}", token)
        raw = base64.b64decode(blob["content"])
        parent = os.path.dirname(rel_path)
        if parent:
            os.makedirs(parent, exist_ok=True)
        with open(rel_path, "wb") as f:
            f.write(raw)
        if item.get("mode") == "100755":
            os.chmod(rel_path, 0o755)
        count += 1
        print(f"  ✓ Synced {rel_path} ({len(raw)} bytes)")

    print(
        f"\n🎉 Synced {count} files from https://github.com/{OWNER}/{repo} "
        f"(commit {commit_sha[:7]})"
    )


if __name__ == "__main__":
    repo_name = sys.argv[1] if len(sys.argv) > 1 else DEFAULT_REPO
    pull_repo(repo_name)
