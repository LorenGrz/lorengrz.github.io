#!/usr/bin/env bash
# Creates a dedicated IAM user (portfolio-deploy) with least-privilege permissions for SAM deploys.
# Run once from root credentials; after that use the generated access key for all deploys.
set -euo pipefail

ACCOUNT_ID="493735739644"
USER_NAME="portfolio-deploy"
POLICY_NAME="PortfolioSAMDeploy"
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

echo "Creating IAM user: $USER_NAME"
aws iam create-user --user-name "$USER_NAME"

echo "Creating inline policy: $POLICY_NAME"
aws iam put-user-policy \
  --user-name "$USER_NAME" \
  --policy-name "$POLICY_NAME" \
  --policy-document "file://$SCRIPT_DIR/iam-deploy-policy.json"

echo "Creating access key (save these credentials securely, they are shown only once):"
aws iam create-access-key --user-name "$USER_NAME" \
  --query '{AccessKeyId: AccessKey.AccessKeyId, SecretAccessKey: AccessKey.SecretAccessKey}' \
  --output table

echo ""
echo "Next steps:"
echo "  1. Run: aws configure --profile portfolio-deploy"
echo "     Paste the AccessKeyId and SecretAccessKey above."
echo "     Default region: us-east-1 / Output format: json"
echo "  2. Update samconfig.toml to use the new profile:"
echo "     Add: profile = \"portfolio-deploy\" under [default.deploy.parameters]"
echo "  3. Revoke the root access key from the AWS Console > IAM > Security credentials."
