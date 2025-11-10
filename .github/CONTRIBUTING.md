# Contributing

Thank you for considering contributing to this project!

## Commit Message Convention

This project uses [Conventional Commits](https://www.conventionalcommits.org/) to automate semantic versioning and changelog generation.

### Format

```text
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

### Types

- **feat**: A new feature (triggers minor version bump)
- **fix**: A bug fix (triggers patch version bump)
- **docs**: Documentation only changes
- **style**: Changes that don't affect code meaning (formatting, etc.)
- **refactor**: Code change that neither fixes a bug nor adds a feature
- **perf**: Performance improvements
- **test**: Adding or updating tests
- **chore**: Maintenance tasks, dependency updates, etc.
- **ci**: Changes to CI/CD configuration files and scripts

### Breaking Changes

To trigger a major version bump, use one of these formats:

```bash
# Using ! after type
feat!: redesign navigation structure

# Using BREAKING CHANGE in footer
feat: update API endpoints

BREAKING CHANGE: API endpoints now require authentication
```

### Examples

```bash
# Patch release (1.0.0 → 1.0.1)
git commit -m "fix: correct typo in homepage title"
git commit -m "docs: update installation instructions"

# Minor release (1.0.0 → 1.1.0)
git commit -m "feat: add dark mode toggle"
git commit -m "feat(blog): add RSS feed support"

# Major release (1.0.0 → 2.0.0)
git commit -m "feat!: migrate to new routing system"
```

## Development Workflow

1. **Fork & Clone**: Fork the repository and clone your fork
2. **Branch**: Create a feature branch (`git checkout -b feat/amazing-feature`)
3. **Install**: Run `yarn install`
4. **Develop**: Make your changes and test locally with `yarn start`
5. **Test**: Run `yarn typecheck` and `yarn build` to verify
6. **Commit**: Use conventional commit messages
7. **Push**: Push to your fork
8. **Pull Request**: Open a PR with a clear description

## Testing Your Changes

Before submitting a PR, ensure:

```bash
# Dependencies are locked
yarn install --immutable

# TypeScript compiles
yarn typecheck

# Site builds successfully
yarn build

# (Optional) Test the production build
yarn serve
```

## Questions?

Feel free to open an issue for any questions or concerns!
