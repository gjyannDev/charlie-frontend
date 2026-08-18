# Graph Report - charlie-frontend  (2026-08-18)

## Corpus Check
- 72 files · ~23,198 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 315 nodes · 440 edges · 25 communities (18 shown, 7 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `86f559cd`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- cn
- dependencies
- compilerOptions
- devDependencies
- components.json
- ua-finalize.cjs
- ApiClient
- app/layout.tsx
- UI Conventions
- ua-summary.cjs
- README.md
- ua-fingerprint-input.cjs
- ua-stats.cjs
- ua-write-meta.cjs
- AuthForm.tsx
- AGENTS.md
- eslint.config.mjs
- next.config.ts
- postcss.config.mjs
- read-file.cjs
- ua-inline-validate.cjs
- breadcrumb.tsx

## God Nodes (most connected - your core abstractions)
1. `cn()` - 45 edges
2. `compilerOptions` - 16 edges
3. `FieldError()` - 9 edges
4. `UI Conventions` - 9 edges
5. `Field()` - 8 edges
6. `ApiClient` - 8 edges
7. `FieldLabel()` - 7 edges
8. `include` - 7 edges
9. `tailwind` - 6 edges
10. `aliases` - 6 edges

## Surprising Connections (you probably didn't know these)
- `BreadcrumbEllipsis()` --calls--> `cn()`  [EXTRACTED]
  src/components/ui/breadcrumb.tsx → src/lib/utils.ts
- `Breadcrumb()` --calls--> `cn()`  [EXTRACTED]
  src/components/ui/breadcrumb.tsx → src/lib/utils.ts
- `BreadcrumbList()` --calls--> `cn()`  [EXTRACTED]
  src/components/ui/breadcrumb.tsx → src/lib/utils.ts
- `BreadcrumbItem()` --calls--> `cn()`  [EXTRACTED]
  src/components/ui/breadcrumb.tsx → src/lib/utils.ts
- `BreadcrumbLink()` --calls--> `cn()`  [EXTRACTED]
  src/components/ui/breadcrumb.tsx → src/lib/utils.ts

## Import Cycles
- None detected.

## Communities (25 total, 7 thin omitted)

### Community 0 - "cn"
Cohesion: 0.08
Nodes (37): Checkbox(), Field(), FieldContent(), FieldDescription(), FieldError(), FieldLabel(), FieldLegend(), FieldSeparator() (+29 more)

### Community 1 - "dependencies"
Cohesion: 0.04
Nodes (45): axios, @base-ui/react, class-variance-authority, clsx, @hookform/resolvers, lucide-react, next, next-themes (+37 more)

### Community 2 - "compilerOptions"
Cohesion: 0.07
Nodes (28): dom, dom.iterable, esnext, **/*.mts, .next/dev/types/**/*.ts, next-env.d.ts, .next/types/**/*.ts, node_modules (+20 more)

### Community 3 - "devDependencies"
Cohesion: 0.08
Nodes (25): eslint, eslint-config-next, devDependencies, eslint, eslint-config-next, tailwindcss, @tailwindcss/postcss, @types/node (+17 more)

### Community 4 - "components.json"
Cohesion: 0.09
Nodes (21): aliases, components, hooks, lib, ui, utils, iconLibrary, menuAccent (+13 more)

### Community 6 - "ua-finalize.cjs"
Cohesion: 0.12
Nodes (14): allowedEdgeTypes, assembled, edgeTypeMap, fileLevelTypes, fileNodeIds, fs, graph, intermediate (+6 more)

### Community 7 - "ApiClient"
Cohesion: 0.17
Nodes (4): ApiClient, ApiResponse, API, options

### Community 8 - "app/layout.tsx"
Cohesion: 0.24
Nodes (6): metadata, Toaster(), Providers(), queryClient, inter, poppins

### Community 9 - "UI Conventions"
Cohesion: 0.20
Nodes (9): Accessibility, Loading, Empty, Error, and Disabled States, Naming Conventions, Prohibited Patterns, Reusable Component Rules, shadcn Component Usage, Tailwind Styling Rules, TypeScript Rules (+1 more)

### Community 10 - "ua-summary.cjs"
Cohesion: 0.40
Nodes (3): fs, graph, scan

### Community 11 - "README.md"
Cohesion: 0.50
Nodes (3): Deploy on Vercel, Getting Started, Learn More

### Community 12 - "ua-fingerprint-input.cjs"
Cohesion: 0.50
Nodes (3): fs, path, scan

### Community 14 - "ua-write-meta.cjs"
Cohesion: 0.50
Nodes (3): analyzedFiles, fs, path

### Community 15 - "AuthForm.tsx"
Cohesion: 0.12
Nodes (22): AuthForm(), getErrorMessage(), LoginStep, signInKeys, useCheckEmailMutation(), useSignInMutation(), signInCredentialsSchema, signInEmailSchema (+14 more)

### Community 26 - "breadcrumb.tsx"
Cohesion: 0.26
Nodes (9): Breadcrumb(), BreadcrumbEllipsis(), BreadcrumbItem(), BreadcrumbLink(), BreadcrumbList(), BreadcrumbPage(), BreadcrumbSeparator(), BreadcrumbsProps (+1 more)

## Knowledge Gaps
- **136 isolated node(s):** `fs`, `fs`, `path`, `uaDir`, `intermediate` (+131 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **7 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `cn()` connect `cn` to `breadcrumb.tsx`, `AuthForm.tsx`?**
  _High betweenness centrality (0.052) - this node is a cross-community bridge._
- **Why does `dependencies` connect `dependencies` to `devDependencies`?**
  _High betweenness centrality (0.042) - this node is a cross-community bridge._
- **What connects `fs`, `fs`, `path` to the rest of the system?**
  _136 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `cn` be split into smaller, more focused modules?**
  _Cohesion score 0.0822746521476104 - nodes in this community are weakly interconnected._
- **Should `dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.044444444444444446 - nodes in this community are weakly interconnected._
- **Should `compilerOptions` be split into smaller, more focused modules?**
  _Cohesion score 0.06896551724137931 - nodes in this community are weakly interconnected._
- **Should `devDependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.07692307692307693 - nodes in this community are weakly interconnected._