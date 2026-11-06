#!/usr/bin/env bash
set -euo pipefail

CHALLENGE_NUM="${1:-}"
if [[ "${CHALLENGE_NUM}" != "1" && "${CHALLENGE_NUM}" != "2" && "${CHALLENGE_NUM}" != "3" ]]; then
  echo "Usage: ./export_challenge.sh <1|2|3>"
  echo "Example: ./export_challenge.sh 1"
  exit 1
fi

case "${CHALLENGE_NUM}" in
  1)
    BACKEND_FILE="challenges/c1_image_outreach.py"
    FRONTEND_FILE="static/challenge1.js"
    ;;
  2)
    BACKEND_FILE="challenges/c2_prompt_duel.py"
    FRONTEND_FILE="static/challenge2.js"
    ;;
  3)
    BACKEND_FILE="challenges/c3_pre_pitch.py"
    FRONTEND_FILE="static/challenge3.js"
    ;;
esac

OUT_ARCHIVE="pamb-challenge-${CHALLENGE_NUM}-handoff.tar.gz"
tar -czf "${OUT_ARCHIVE}" "${BACKEND_FILE}" "${FRONTEND_FILE}"

echo "=================================================================="
echo "✅ Packaged Challenge ${CHALLENGE_NUM} Handoff Bundle: ${OUT_ARCHIVE}"
echo "   Included files:"
echo "   - ${BACKEND_FILE}"
echo "   - ${FRONTEND_FILE}"
echo ""
echo "📤 How to share back with Satish:"
echo "   Option A: Send ${OUT_ARCHIVE} (or your Git repo/branch)"
echo "   Option B: Deploy to your Argolis Cloud Run (./deploy.sh <PROJECT_ID>)"
echo "             and simply share your Cloud Run URL with Satish!"
echo "=================================================================="
