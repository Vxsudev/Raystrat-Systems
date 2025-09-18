#!/bin/bash
# Exit immediately if a command exits with a non-zero status.
set -e

# --- Configuration ---
# TODO: Please set these environment variables in your shell or replace the placeholders below.
# export PROJECT="your-gcp-project-id"
# export SA="your-service-account-name"
# export REGION="your-gcp-region" # e.g., us-central1

# --- Variable Validation ---
if [ -z "$PROJECT" ]; then
  echo "Error: PROJECT environment variable is not set."
  echo "Please set it by running 'export PROJECT=your-gcp-project-id'"
  exit 1
fi

if [ -z "$SA" ]; then
  echo "Error: SA environment variable is not set."
  echo "Please set it by running 'export SA=your-service-account-name'"
  exit 1
fi

if [ -z "$REGION" ]; then
  echo "Error: REGION environment variable is not set."
  echo "Please set it by running 'export REGION=your-gcp-region'"
  exit 1
fi

# --- Dynamic Variables ---
echo "Generating a random CRON_SECRET..."
CRON_SECRET=$(head /dev/urandom | tr -dc A-Za-z0-9 | head -c 32)
IMAGE_TAG=$(date +%Y%m%d-%H%M%S)
export IMAGE="$REGION-docker.pkg.dev/$PROJECT/cloud-run-source-deploy/followup-agent:$IMAGE_TAG"

# --- Build Step ---
echo "Building image: $IMAGE"
gcloud builds submit --config cloudbuild.yaml . --project "$PROJECT"

# --- Deploy Step ---
echo "Deploying to Cloud Run in region $REGION..."
gcloud run deploy followup-agent \
  --image "$IMAGE" \
  --region "$REGION" \
  --project "$PROJECT" \
  --allow-unauthenticated \
  --service-account "$SA@$PROJECT.iam.gserviceaccount.com" \
  --update-env-vars="CRON_SECRET=$CRON_SECRET,SERVICE_VERSION=phase1,TENANTS=tenant_a,tenant_b" \
  --memory 512Mi \
  --cpu 1 \
  --concurrency 80 \
  --timeout 30s

echo "Deployment successful."
