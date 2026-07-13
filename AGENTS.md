# AGENTS.md

This file provides high-signal context for agents working on the `bryandady.com` Docusaurus repository.

## Build and Development

- **Package Manager**: Yarn 4 (Berry). Use `yarn` commands.
- **Development Server**: `yarn start`
- **Production Build**: `yarn build`. 
  - Note: `prebuild` automatically runs `yarn resume:meta`.
- **Type Checking**: `yarn typecheck` (runs `tsc`).

## Project Structure

- `docs/`: Markdown-based documentation.
  - `docs/professional/Bryan_Dady.resume.json`: Source of truth for the résumé.
- `blog/`: Markdown-based blog posts.
- `src/data/resume-metadata.json`: Generated metadata for the résumé (do not edit manually).
- `scripts/`: Utility scripts.
  - `generate-resume-meta.js`: Generates résumé metadata with timestamps and file stats.
- `twitter-*`: Various files in the root related to Twitter activity analysis (scripts, data, reports).

<!-- AGENT_SYNC_START: shared-docusaurus-patterns -->
<!-- 
  The following section is shared with ride-more-org.
  It is wrapped in HTML comments to keep AGENTS.md focused for humans
  while remaining high-signal for agents.
-->
<!--
## Shared Patterns & Best Practices

This project shares patterns with `ride-more-org`:
- **Framework**: Docusaurus 3 with TypeScript.
- **Deployment**: Automatic deployment from GitHub to **Cloudflare Pages**.
- **Broken Links**: 
  - `onBrokenLinks` and `onBrokenMarkdownLinks` are both set to `'throw'` in `docusaurus.config.ts`. Every link must be valid for the build to pass.
- **Docusaurus v4**: Both use `future: { v4: true }` in `docusaurus.config.ts` to prepare for the next major version.
- **Yarn Berry**: Uses Yarn 4 with `.yarnrc.yml` and `.yarn/` directory.
-->
<!-- AGENT_SYNC_END: shared-docusaurus-patterns -->

## Development Constraints & Conventions

- **Blog Posts**:
  - Use `<!-- truncate -->` in blog posts to control post previews.
- **Git Tracking**: Ensure new blog files are added to Git to allow Docusaurus to retrieve file history for "edit this page" and last-update metadata.

## Résumé Management

The résumé is managed via a JSON source file with automated validation and metadata generation:
- **Validate Resume**: `yarn resume:validate` or `yarn resume:check`.
- **Generate Metadata**: `yarn resume:meta` (runs automatically before build/deploy).

## Known Discrepancies

- **Missing Documentation**: `README.md` references `SECURITY.md`, `yarn deploy:safe`, and `yarn verify:no-webpack-dev-server`, but these are currently missing from the repository. Trust `package.json` for executable commands.
