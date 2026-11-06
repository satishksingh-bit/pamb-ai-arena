#!/usr/bin/env bash
set -euo pipefail

CHALLENGE_NUM="${1:-}"
SOURCE_ARG="${2:-}"

if [[ -z "${CHALLENGE_NUM}" || -z "${SOURCE_ARG}" ]]; then
  echo "Usage:"
  echo "  ./import_challenge.sh <1|2|3> <COLLEAGUE_CLOUD_RUN_URL_OR_TARBALL>"
  echo ""
  echo "Examples:"
  echo "  ./import_challenge.sh 1 https://pamb-agency-ai-arena-xxxx.us-central1.run.app"
  echo "  ./import_challenge.sh 2 ./pamb-challenge-2-handoff.tar.gz"
  exit 1
fi

if [[ "${SOURCE_ARG}" == http://* || "${SOURCE_ARG}" == https://* ]]; then
  BASE_URL="${SOURCE_ARG%/}"
  EXPORT_URL="${BASE_URL}/handoff/export-challenge/${CHALLENGE_NUM}"
  echo "🌐 Pulling Challenge ${CHALLENGE_NUM} code from ${EXPORT_URL} ..."
  python3 - "${EXPORT_URL}" << 'EOF'
import json
import sys
import urllib.request

url = sys.argv[1]
req = urllib.request.Request(url, headers={"Accept": "application/json"})
with urllib.request.urlopen(req, timeout=20) as resp:
    data = json.loads(resp.read().decode("utf-8"))

if not data.get("ok"):
    print("❌ Error:", data.get("error"))
    sys.exit(1)

for rel_path, content in data.get("files", {}).items():
    with open(rel_path, "w", encoding="utf-8") as f:
        f.write(content)
    print(f"   ✅ Updated {rel_path} ({len(content)} bytes)")
EOF
else
  echo "📦 Extracting Challenge ${CHALLENGE_NUM} archive ${SOURCE_ARG} ..."
  tar -xzvf "${SOURCE_ARG}"
fi

echo "=================================================================="
echo "🎉 Challenge ${CHALLENGE_NUM} successfully merged into master workspace!"
echo "   Run ./deploy.sh argolis-sandbox-main to publish to production."
echo "=================================================================="
