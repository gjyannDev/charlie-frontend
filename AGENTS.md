<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

---

# Charlie Frontend Agent Instructions

## Domain Module Placement

- Keep route files and route-specific UI under `src/app/`.
- Keep reusable domain data-layer code under `src/modules/<domain>/`.
- For auth work, place schemas, types, services, query keys, and query hooks under `src/modules/auth/`.
- Do not put auth API-facing schemas, types, services, query keys, or query hooks directly under an App Router route folder.
