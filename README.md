# Website

This website is built using [Docusaurus](https://docusaurus.io/), a modern static website generator.

## Bryan Dady

This functions as a personal home page and learning opportunity for me to practice frontend technologies.

This site is deployed to [bryandady.com](https://bryandady.com) via [Cloudflare Pages](https://pages.cloudflare.com)).

I spend a significant amount of my professional time on backend and infrastructure technologies, so sometimes it's a fun
and helpful change of scenery to work in JAMstack, TypeScript, React and related web technologies.

### Installation

```shell
yarn
```

### Local Development

```shell
yarn start
```

This command starts a local development server and opens up a browser window. Most changes are reflected live without having to restart the server.

### Build

```shell
yarn build
```

This command generates static content into the `build` directory and can be served using any static contents hosting service.

### Deployment

I've integrated deployment from this GitHub repository to my account in Cloudflare.

For safe production deployment:

```shell
yarn deploy:safe
```

This command verifies the build excludes development dependencies and is ready for production.

### Versioning & Releases

This project uses [Semantic Versioning](https://semver.org/) and automated releases via GitHub Actions.

#### How It Works

- **Automatic**: Every push to `main` triggers the release workflow
- **Conventional Commits**: Commit messages determine the version bump:
  - `feat:` or `feature:` → minor version bump (e.g., 1.0.0 → 1.1.0)
  - `fix:` or other types → patch version bump (e.g., 1.0.0 → 1.0.1)
  - `BREAKING CHANGE:` or `!:` → major version bump (e.g., 1.0.0 → 2.0.0)
- **GitHub Releases**: Automatically created with changelog of commits

#### Commit Message Examples

```bash
# Patch release (1.0.0 → 1.0.1)
git commit -m "fix: resolve navigation bug"

# Minor release (1.0.0 → 1.1.0)
git commit -m "feat: add new blog post template"

# Major release (1.0.0 → 2.0.0)
git commit -m "feat!: redesign homepage layout"
```

## Security

### webpack-dev-server Vulnerability Handling

This project includes webpack-dev-server as a transitive dependency (through Docusaurus). Security scanners may report vulnerabilities in webpack-dev-server. These are **not security risks for the deployed site** because:

- **Transitive dependency**: webpack-dev-server is pulled in by Docusaurus for development use only
- **Development only**: Used only during local `yarn start` for hot-reloading
- **Not deployed**: The production build at [bryandady.com](https://bryandady.com) contains only static HTML/CSS/JS files
- **No runtime exposure**: The dev server never runs in production; Cloudflare Pages serves static assets only

#### Why This is Safe

Webpack-dev-server vulnerabilities (e.g., GHSA-9jgg-88mc-972h, GHSA-4v9v-hfq4-rm2v) affect the development HTTP server that runs on `localhost` during development. Since this is a JAMstack site deployed as pre-built static files, these vulnerabilities have no attack surface in production.

The deployed site on Cloudflare Pages:
- Contains zero Node.js code
- Has no webpack or development server components
- Serves only pre-compiled HTML, CSS, JavaScript, and assets

For detailed security information, see [SECURITY.md](SECURITY.md).
