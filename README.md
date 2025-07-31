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

## Security

### webpack-dev-server Vulnerability Handling

This project may show webpack-dev-server security warnings during `yarn audit` (or `npm audit`). These are **not security risks for the deployed site** because:

- **Development only**: webpack-dev-server is only used during `yarn start` and build processes
- **Not deployed**: The production build contains only static HTML/CSS/JS files
- **Verified exclusion**: Automated checks ensure no webpack-dev-server code reaches production

#### Verification

To verify webpack-dev-server is excluded from production builds:

```shell
yarn verify:no-webpack-dev-server
```

Or run the complete safety check:

```shell
yarn deploy:safe
```

#### Why This Approach

The vulnerabilities (GHSA-9jgg-88mc-972h, GHSA-4v9v-hfq4-rm2v) affect the development server, not static site deployments. Since this is a JAMstack site deployed as static files, these vulnerabilities don't impact the production environment.

For detailed security information, see [SECURITY.md](SECURITY.md).
