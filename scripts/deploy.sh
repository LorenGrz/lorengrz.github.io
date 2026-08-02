#!/usr/bin/env bash
set -e

echo "Building Next.js static export..."
pnpm build

echo "Copying static files into deploy/public/..."
rm -rf deploy/public
cp -r out deploy/public

echo "Running SAM build..."
sam build

echo "Deploying to AWS..."
sam deploy

echo "Done. Check the AppUrl in the output above."
