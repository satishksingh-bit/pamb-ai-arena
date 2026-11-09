#!/usr/bin/env bash
set -euo pipefail

# Usage:
#   ./deploy.sh                                  # Deploys to active gcloud project
#   ./deploy.sh <PROJECT_ID>                     # Deploys to specified Argolis project
#   ./deploy.sh <PROJECT_ID> <REVISION_TAG>      # Deploys isolated dev preview tag (--no-traffic)

PROJECT_ID="${1:-${PROJECT_ID:-$(gcloud config get-value project 2>/dev/null || echo "argolis-sandbox-main")}}"
TAG="${2:-}"
REGION="${REGION:-us-central1}"
SERVICE_NAME="${SERVICE_NAME:-pamb-agency-ai-arena}"

echo "=================================================================="
echo "🚀 Deploying PRUMDA Learning Trip AI Arena"
echo "   Project : ${PROJECT_ID}"
echo "   Region  : ${REGION}"
echo "   Service : ${SERVICE_NAME}"
echo "=================================================================="

if [[ -n "${TAG}" ]]; then
  echo "🔹 Deploying isolated developer revision tag: ${TAG} (--no-traffic)"
  gcloud run deploy "${SERVICE_NAME}" \
    --source . \
    --project "${PROJECT_ID}" \
    --region "${REGION}" \
    --allow-unauthenticated \
    --min-instances=1 \
    --max-instances=1 \
    --memory=1Gi \
    --cpu=2 \
    --set-env-vars="PROJECT_ID=${PROJECT_ID},VERTEX_LOCATION=${REGION}" \
    --tag "${TAG}" \
    --no-traffic \
    --quiet
else
  gcloud run deploy "${SERVICE_NAME}" \
    --source . \
    --project "${PROJECT_ID}" \
    --region "${REGION}" \
    --allow-unauthenticated \
    --min-instances=1 \
    --max-instances=1 \
    --memory=1Gi \
    --cpu=2 \
    --set-env-vars="PROJECT_ID=${PROJECT_ID},VERTEX_LOCATION=${REGION}" \
    --quiet
fi
