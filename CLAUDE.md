# Claude Code Rules

## Project overview

Screenshop is an AI-assisted app store screenshot studio built with Next.js, React, MUI, and TypeScript. It helps developers create polished, conversion-optimized screenshots for the Apple App Store and Google Play Store.

## Tech stack

- **Framework**: Next.js 16 (App Router)
- **UI**: MUI 7 + Emotion (SSR-compatible)
- **Language**: TypeScript (strict mode, noUncheckedIndexedAccess)
- **Package manager**: pnpm
- **Linting**: ESLint (strict TypeScript-checked) + Prettier

## Before committing

Run checks from the repo root:

```bash
pnpm lint
pnpm typecheck
pnpm format:check
```

If formatting fails, run `pnpm format:fix`.

Do not commit code that fails any of these checks.

## Code style

- Use pnpm, not npm
- No em dashes in any text (user-facing, comments, JSDoc, metadata). Use commas, periods, colons, or "and" instead
- Prefer MUI's `sx` breakpoint objects over `useMediaQuery` for responsive styling
- Don't override MUI's default `borderRadius` unless there's a specific visual reason
- Conventional commits: `feat:`, `fix:`, `chore:`, `docs:`

## Project structure

```
app/              # Next.js App Router pages and layouts
components/       # Reusable React components
lib/              # Utilities, theme, helpers
public/           # Static assets
docs/             # Research and planning documents
```
