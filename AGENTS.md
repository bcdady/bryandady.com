# AGENTS.md

This file provides high-signal context for agents working on the `bryandady.com` Docusaurus repository.

## Build and Development

- **Package Manager**: [aube](https://aube.jdx.dev/). Use `aube` commands.
- **Tool Version Manager**: [mise](https://mise.jdx.dev/). Managed via `mise.toml`.
- **Development Server**: `aube run start` (or `npm run start` / `yarn start` via aube's compatibility layer).
- **Production Build**: `aube run build`. 
  - Note: `prebuild` automatically runs `aube run resume:meta`.
- **Type Checking**: `aube run typecheck` (runs `tsc`).
- **Security Audit**: `aube audit`.

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
- **Modern Tooling**: Moving towards standardizing on `mise` for tool management and `aube` for package management.
-->
<!-- AGENT_SYNC_END: shared-docusaurus-patterns -->

## Development Constraints & Conventions

- **Surgical Commits**: Only commit files directly related to the current task. Do not bundle pre-existing untracked files or unrelated modifications without explicit permission.
- **Branching Strategy**: Use feature/draft branches for new features, scripts, or content. Direct commits to `main` should be reserved for minor configuration or documentation fixes.
- **Blog Posts**:
  - Use `<!-- truncate -->` in blog posts to control post previews.
- **Git Tracking**: Ensure new blog files are added to Git to allow Docusaurus to retrieve file history for "edit this page" and last-update metadata.

## Résumé Management

The résumé is managed via a JSON source file with automated validation and metadata generation:
- **Validate Resume**: `yarn resume:validate` or `yarn resume:check`.
- **Generate Metadata**: `yarn resume:meta` (runs automatically before build/deploy).

## Known Discrepancies

- **Missing Documentation**: `README.md` references `SECURITY.md`, `yarn deploy:safe`, and `yarn verify:no-webpack-dev-server`, but these are currently missing from the repository. Trust `package.json` for executable commands.
