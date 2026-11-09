#!/usr/bin/env python3
"""Pushes the pamb-ai-arena codebase to GitHub via https://api.github.com using curl.

Usage:
  GITHUB_TOKEN=ghp_... python3 push_to_github.py [repo_name]
"""

import base64
import json
import os
import subprocess
import sys

OWNER = "satishksingh-bit"
DEFAULT_REPO = "pamb-ai-arena"
API_BASE = "https://api.github.com"


def github_request(method: str, path: str, token: str, payload: dict | None = None):
    import urllib.error
    import urllib.request
    url = f"{API_BASE}{path}"
    data_bytes = json.dumps(payload).encode("utf-8") if payload is not None else None
    req = urllib.request.Request(
        url,
        data=data_bytes,
        method=method,
        headers={
            "Authorization": f"Bearer {token}",
            "Accept": "application/vnd.github+json",
            "X-GitHub-Api-Version": "2022-11-28",
            "User-Agent": "pamb-ai-arena-uploader",
            "Content-Type": "application/json",
        },
    )
    try:
        with urllib.request.urlopen(req, timeout=45) as resp:
            body = resp.read().decode("utf-8")
            return resp.status, json.loads(body) if body.strip() else {}
    except urllib.error.HTTPError as e:
        err_body = e.read().decode("utf-8", errors="replace")
        if e.code != 403 or "ÜberProxy" not in err_body:
            try:
                return e.code, json.loads(err_body)
            except Exception:
                return e.code, {"message": err_body}
    except Exception:
        pass

    cmd = [
        "curl",
        "-sS",
        "-X",
        method,
        "-H",
        f"Authorization: Bearer {token}",
        "-H",
        "Accept: application/vnd.github+json",
        "-H",
        "X-GitHub-Api-Version: 2022-11-28",
        "-H",
        "User-Agent: pamb-ai-arena-uploader",
        "-H",
        "Content-Type: application/json",
        "-w",
        "\n__HTTP_STATUS__:%{http_code}",
        url,
    ]
    input_bytes = None
    if payload is not None:
        cmd.extend(["--data-binary", "@-"])
        input_bytes = json.dumps(payload).encode("utf-8")

    proc = subprocess.run(cmd, input=input_bytes, capture_output=True, timeout=60)
    out = proc.stdout.decode("utf-8", errors="replace")
    if "\n__HTTP_STATUS__:" in out:
        body, status_str = out.rsplit("\n__HTTP_STATUS__:", 1)
        status = int(status_str.strip() or "0")
    else:
        body = out
        status = 500
    try:
        data = json.loads(body) if body.strip() else {}
    except Exception:
        data = {"message": body}
    return status, data


def ensure_repo_exists(token: str, repo: str):
    status, data = github_request("GET", f"/repos/{OWNER}/{repo}", token)
    if status == 200:
        print(f"✓ Found existing repository: https://github.com/{OWNER}/{repo}")
        return data

    print(f"Creating repository https://github.com/{OWNER}/{repo} ...")
    status, data = github_request(
        "POST",
        "/user/repos",
        token,
        {
            "name": repo,
            "description": (
                "PRUMDA Learning Trip AI Arena — "
                "Multi-Agent Challenge Platform (C1 Executive Image & Outreach, C2 R.C.T.F.C. Prompt Duel, C3 Pre-Pitch War Room)"
            ),
            "private": False,
            "auto_init": True,
        },
    )
    if status not in (200, 201):
        raise RuntimeError(f"Failed to create repo ({status}): {data}")
    print(f"✓ Created repository: https://github.com/{OWNER}/{repo}")
    return data


def get_tracked_files() -> list[str]:
    try:
        out = subprocess.check_output(["git", "ls-files"], text=True, stderr=subprocess.DEVNULL)
        files = [line.strip() for line in out.splitlines() if line.strip()]
        if files:
            return files
    except Exception:
        pass
    walked = []
    for root, dirs, filenames in os.walk("."):
        dirs[:] = sorted(d for d in dirs if d not in (".git", "__pycache__", ".venv", "venv", "node_modules"))
        for fname in sorted(filenames):
            if fname.endswith((".pyc", ".pyo", ".tar.gz", ".zip", ".bundle")) or fname in ("arena_state.json", "cloudbuild-push.yaml"):
                continue
            rel = os.path.relpath(os.path.join(root, fname), ".")
            walked.append(rel)
    return walked


def push_all_files(token: str, repo: str, commit_message: str):
    ensure_repo_exists(token, repo)

    status, ref_data = github_request(
        "GET", f"/repos/{OWNER}/{repo}/git/ref/heads/main", token
    )
    if status in (404, 409):
        print("Bootstrapping initial commit on main branch...")
        with open("README.md", "rb") as f:
            readme_b64 = base64.b64encode(f.read()).decode("ascii")
        s2, _ = github_request(
            "PUT",
            f"/repos/{OWNER}/{repo}/contents/README.md",
            token,
            {"message": "Initial commit", "content": readme_b64, "branch": "main"},
        )
        if s2 not in (200, 201):
            raise RuntimeError(f"Failed to bootstrap README.md ({s2})")
        status, ref_data = github_request(
            "GET", f"/repos/{OWNER}/{repo}/git/ref/heads/main", token
        )

    if status != 200:
        raise RuntimeError(f"Could not read refs/heads/main ({status}): {ref_data}")

    parent_sha = ref_data["object"]["sha"]
    files = get_tracked_files()
    tree_items = []

    print(f"Uploading {len(files)} tracked files to {OWNER}/{repo}...")
    for rel_path in files:
        if not os.path.exists(rel_path):
            continue
        with open(rel_path, "rb") as f:
            raw = f.read()
        b64_content = base64.b64encode(raw).decode("ascii")
        b_status, blob = github_request(
            "POST",
            f"/repos/{OWNER}/{repo}/git/blobs",
            token,
            {"content": b64_content, "encoding": "base64"},
        )
        if b_status not in (200, 201):
            raise RuntimeError(
                f"Failed to upload blob for {rel_path} ({b_status}): {blob}"
            )
        mode = "100755" if os.access(rel_path, os.X_OK) else "100644"
        tree_items.append({
            "path": rel_path,
            "mode": mode,
            "type": "blob",
            "sha": blob["sha"],
        })
        print(f"  • Uploaded {rel_path} ({len(raw)} bytes)")

    t_status, tree = github_request(
        "POST",
        f"/repos/{OWNER}/{repo}/git/trees",
        token,
        {"tree": tree_items},
    )
    if t_status not in (200, 201):
        raise RuntimeError(f"Failed to create git tree ({t_status}): {tree}")

    c_status, commit = github_request(
        "POST",
        f"/repos/{OWNER}/{repo}/git/commits",
        token,
        {
            "message": commit_message,
            "tree": tree["sha"],
            "parents": [parent_sha],
        },
    )
    if c_status not in (200, 201):
        raise RuntimeError(f"Failed to create commit ({c_status}): {commit}")

    u_status, _ = github_request(
        "PATCH",
        f"/repos/{OWNER}/{repo}/git/refs/heads/main",
        token,
        {"sha": commit["sha"], "force": True},
    )
    if u_status != 200:
        raise RuntimeError(f"Failed to update refs/heads/main ({u_status})")

    print(f"\n🎉 Successfully pushed commit {commit['sha'][:7]} to:")
    print(f"   https://github.com/{OWNER}/{repo}")


if __name__ == "__main__":
    token = os.environ.get("GITHUB_TOKEN", "").strip()
    if not token:
        print("Error: GITHUB_TOKEN environment variable is required.", file=sys.stderr)
        sys.exit(1)
    repo_name = sys.argv[1] if len(sys.argv) > 1 else DEFAULT_REPO
    msg = (
        sys.argv[2]
        if len(sys.argv) > 2
        else "PRUMDA Learning Trip — Updated Onboarding & Branding"
    )
    push_all_files(token, repo_name, msg)
