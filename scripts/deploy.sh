#!/usr/bin/env bash
set -e

STACK="lorenzo-portfolio"
REGION="us-east-1"

echo "Building Next.js static export..."
pnpm build

echo "Deploying infrastructure (S3 + CloudFront)..."
sam deploy || true

echo "Getting stack outputs..."
BUCKET=$(aws cloudformation describe-stacks \
  --stack-name "$STACK" \
  --region "$REGION" \
  --query 'Stacks[0].Outputs[?OutputKey==`BucketName`].OutputValue' \
  --output text)

DIST_ID=$(aws cloudformation describe-stacks \
  --stack-name "$STACK" \
  --region "$REGION" \
  --query 'Stacks[0].Outputs[?OutputKey==`DistributionId`].OutputValue' \
  --output text)

echo "Uploading to s3://$BUCKET ..."
aws s3 sync out/ "s3://$BUCKET/" --delete --region "$REGION"

echo "Invalidating CloudFront cache..."
aws cloudfront create-invalidation --distribution-id "$DIST_ID" --paths "/*" --output table

APP_URL=$(aws cloudformation describe-stacks \
  --stack-name "$STACK" \
  --region "$REGION" \
  --query 'Stacks[0].Outputs[?OutputKey==`AppUrl`].OutputValue' \
  --output text)

echo "Done. URL: $APP_URL"
