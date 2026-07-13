# Recommendations to Sync
1. Add CI and Release workflows to bryandady.com
2. Update dependabot.yml in bryandady.com to match ride-more-org's more comprehensive config
3. Add Prettier config files (.prettierrc, .prettierignore) to ride-more-org
4. Fix the codeql.yml workflow in both repos to consistently use either bun or yarn
5. Consider whether bryandady.com should also migrate to bun (and update Cloudflare config as you mentioned), or keep ride-more-org on yarn for consistency
