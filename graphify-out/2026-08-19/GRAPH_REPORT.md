# Graph Report - charlie-frontend  (2026-08-19)

## Corpus Check
- 73 files · ~23,935 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 336 nodes · 478 edges · 25 communities (19 shown, 6 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `ad81b320`
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
- Charlie Frontend Agent Instructions
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
8. `AuthService` - 7 edges
9. `normalizeError()` - 7 edges
10. `include` - 7 edges

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

## Communities (25 total, 6 thin omitted)

### Community 0 - "cn"
Cohesion: 0.08
Nodes (38): Checkbox(), Field(), FieldContent(), FieldDescription(), FieldError(), FieldLabel(), FieldLegend(), FieldSeparator() (+30 more)

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
Cohesion: 0.08
Nodes (35): AuthForm(), getErrorMessage(), LoginStep, Button(), buttonVariants, FieldGroup(), FieldSet(), authKeys (+27 more)

### Community 16 - "Charlie Frontend Agent Instructions"
Cohesion: 0.40
Nodes (4): Charlie Frontend Agent Instructions, Domain Module Placement, This is NOT the Next.js you know, UI Primitive Preference

### Community 26 - "breadcrumb.tsx"
Cohesion: 0.26
Nodes (9): Breadcrumb(), BreadcrumbEllipsis(), BreadcrumbItem(), BreadcrumbLink(), BreadcrumbList(), BreadcrumbPage(), BreadcrumbSeparator(), BreadcrumbsProps (+1 more)

## Knowledge Gaps
- **144 isolated node(s):** `fs`, `fs`, `path`, `uaDir`, `intermediate` (+139 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **6 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `cn()` connect `cn` to `breadcrumb.tsx`, `AuthForm.tsx`?**
  _High betweenness centrality (0.053) - this node is a cross-community bridge._
- **Why does `dependencies` connect `dependencies` to `devDependencies`?**
  _High betweenness centrality (0.037) - this node is a cross-community bridge._
- **Why does `FieldError()` connect `cn` to `AuthForm.tsx`?**
  _High betweenness centrality (0.018) - this node is a cross-community bridge._
- **What connects `fs`, `fs`, `path` to the rest of the system?**
  _144 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `cn` be split into smaller, more focused modules?**
  _Cohesion score 0.08007013442431327 - nodes in this community are weakly interconnected._
- **Should `dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.044444444444444446 - nodes in this community are weakly interconnected._
- **Should `compilerOptions` be split into smaller, more focused modules?**
  _Cohesion score 0.06896551724137931 - nodes in this community are weakly interconnected._