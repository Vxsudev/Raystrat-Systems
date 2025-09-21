#!/bin/bash
# Exit immediately if a command exits with a non-zero status.
set -e

# --- Configuration ---
# This script uses gcloud to dynamically fetch your Project ID.
# You must be authenticated with gcloud and have the correct project selected.
# To select your project run: gcloud config set project raystrat-systems

export REGION="us-central1"
export PROJECT_ID="$(gcloud config get-value project)"
export REPO="cloud-run-source-deploy"
export SERVICE_NAME="followup-agent"
export SERVICE_ACCOUNT="followup-agent-sa" # The Service Account for the Cloud Run service

# --- Automated Steps ---

# 1. Enable necessary APIs
echo ">>> Enabling required Google Cloud services..."
gcloud services enable \
  run.googleapis.com \
  artifactregistry.googleapis.com \
  cloudbuild.googleapis.com \
  iamcredentials.googleapis.com \
  --project="$PROJECT_ID"

# 2. Create the Artifact Registry repo if it doesn't exist
echo ">>> Ensuring Artifact Registry repository '$REPO' exists in '$REGION'..."
if ! gcloud artifacts repositories describe "$REPO" --location="$REGION" --project="$PROJECT_ID" &>/dev/null; then
  echo "    Repository not found. Creating it..."
  gcloud artifacts repositories create "$REPO" \
    --repository-format=docker \
    --location="$REGION" \
    --description="Cloud Run source deploy images" \
    --project="$PROJECT_ID"
else
  echo "    Repository already exists."
fi

# 3. Grant Cloud Build permission to push to the repo
echo ">>> Granting Cloud Build permissions to Artifact Registry..."
PROJECT_NUMBER="$(gcloud projects describe "$PROJECT_ID" --format='value(projectNumber)')"
gcloud projects add-iam-policy-binding "$PROJECT_ID" \
  --member="serviceAccount:${PROJECT_NUMBER}@cloudbuild.gserviceaccount.com" \
  --role="roles/artifactregistry.writer" \
  --condition=None >/dev/null # Suppress noisy output

# 4. Configure Docker to authenticate with Artifact Registry
echo ">>> Configuring Docker authentication..."
gcloud auth configure-docker "$REGION-docker.pkg.dev" -q

# 5. Build and push the image using Cloud Build
echo ">>> Building and pushing the container image..."
export IMAGE="${REGION}-docker.pkg.dev/${PROJECT_ID}/${REPO}/${SERVICE_NAME}:$(date +%Y%m%d-%H%M%S)"
gcloud builds submit --tag "$IMAGE" --project="$PROJECT_ID" .

# 6. Deploy to Cloud Run
echo ">>> Deploying to Cloud Run..."
# Generate a secure random secret for cron jobs
CRON_SECRET=$(openssl rand -hex 16)
gcloud run deploy "$SERVICE_NAME" \
  --image "$IMAGE" \
  --region "$REGION" \
  --platform managed \
  --allow-unauthenticated \
  --service-account="${SERVICE_ACCOUNT}@${PROJECT_ID}.iam.gserviceaccount.com" \
  --set-env-vars "CRON_SECRET=${CRON_SECRET}" \
  --project="$PROJECT_ID"

# 7. Verify and output the URL
echo ">>> Deployment successful!"
SERVICE_URL=$(gcloud run services describe "$SERVICE_NAME" --region "$REGION" --project "$PROJECT_ID" --format='value(status.url)')
echo "✅ Service URL: $SERVICE_URL"
echo "💡 Set this URL as the AGENT_API_BASE_URL environment variable for your frontend application."
