---
name: Use bun for package management
description: User prefers bun over npm for speed - use bun install, bun run dev, etc.
type: feedback
---

Use bun instead of npm for package management (install, run scripts, etc.). User explicitly asked for faster alternatives (bun/yarn/pnpm) over npm.

**Why:** npm is too slow for the user's workflow. Bun is installed and preferred.

**How to apply:** Always use `bun install`, `bun run dev`, `bun run build` etc. instead of npm equivalents in this project and likely future projects.
