# UI Conventions

## shadcn Component Usage

- Prefer shadcn-style primitives from `src/components/ui` before creating new custom UI.
- For common UI structures such as cards, items, dialogs, sheets, forms, tables, alerts, buttons, inputs, selects, textareas, separators, breadcrumbs, tooltips, and toasts, use an existing shadcn primitive or add the matching shadcn primitive before building raw `div`-based markup.
- Use `Card`, `CardHeader`, `CardContent`, `CardFooter`, and shadcn item/list primitives for card-like or item-like surfaces when those primitives exist in the repo.
- If a needed shadcn primitive is missing, add it to `src/components/ui` and compose from it rather than scattering one-off structural markup through feature code.
- Extend existing primitives through composition and wrappers instead of forking vendor behavior.
- Keep cross-feature wrappers in `src/my-components/shared` when they are still domain-agnostic.
- Keep feature-specific UI inside the owning feature folder.
- Use `cn()` from `src/lib/utils.ts` for class merging.

Current examples:

- `DataTable`, `Button`, `Input`, `Select`, `Sheet`, `Dialog`, `Alert`
- `Card`, `Item`, and similar shadcn primitives should be used broadly once available.
- shared wrappers such as `TextField`, `SelectField`, `CheckboxField`, `TextAreaField`

## Tailwind Styling Rules

- Prefer semantic tokens from `src/app/globals.css`: `bg-background`, `text-foreground`, `border-border`, `text-muted-foreground`, `bg-primary`, `text-primary-foreground`.
- Reuse shared utility classes such as `font-display`, `font-body`, and `main-container`.
- Keep spacing and layout utility-first; avoid adding one-off CSS files for feature work.
- When styling shared primitives, prefer variant props or wrapper composition over ad hoc duplication.

Current repo nuance:

- newer shared primitives lean on token-based classes
- some older table markup still uses raw `gray-*` and `blue-*` utilities
- new work should prefer token-based classes unless matching an existing local pattern

## Naming Conventions

- React components: PascalCase files and exports, for example `TenantUserForm.tsx`.
- Hooks: camelCase with `use` prefix, for example `useSyncFilterToUrl`.
- Query key factories: `*.keys.ts`.
- Query hooks: `*.queries.ts`.
- Service wrappers: `*.services.ts`.
- Zod schemas: `*.schema.ts` or `*.schemas.ts`.
- Type modules: `*.types.ts`.
- Feature folders and route folders: kebab-case.

## Reusable Component Rules

- Put low-level reusable UI in `src/components/ui`.
- Put reusable form wrappers and small composition helpers in `src/my-components/shared`.
- Keep business-specific sheets, tables, cards, and dialogs inside their feature directory.
- Business-specific cards, item rows, panels, and empty/error surfaces should compose shadcn primitives instead of raw structural `div` shells.
- Reuse `Field`, `FieldLabel`, `FieldDescription`, and `FieldError` through shared wrappers instead of rebuilding label/error markup.
- Prefer the existing `DataTable` plus feature-local column definitions over bespoke table markup.

## Accessibility

- Inputs should have a stable `id` and matching `htmlFor` on labels.
- Icon-only buttons must include screen-reader text via `.sr-only`.
- Error messages should render through `FieldError` or `ErrorAlert`; `FieldError` already uses `role="alert"`.
- Loading overlays should communicate busy state; `LoadingScreen` already sets `aria-live="polite"` and `aria-busy="true"`.
- Disabled controls should use actual `disabled` props when possible.
- If UI must stay visible but non-interactive, use `Can disabled` rather than a visually active control.

## Loading, Empty, Error, and Disabled States

- Loading:
  use `Skeleton`, `Spinner`, or `LoadingScreen`.
- Empty:
  use `EmptyStateSmallPage` for feature-level empty or unavailable states.
- Error:
  use `ErrorAlert` for fetch or load failures and toast errors for mutations.
- Disabled:
  disable submit buttons and field inputs while mutations are pending; most forms derive an `isBusy` or `disabled` flag first.

## TypeScript Rules

- TypeScript strict mode is enabled.
- Avoid `any`.
- Infer form values and DTOs from Zod schemas where possible.
- Keep explicit prop interfaces for components.
- Prefer centralized type files per feature.
- Use branded IDs where the repo already does so, for example `LocationId` in tenant-location routes.
- Only mark a component with `use client` when it actually needs client-only behavior.

## Prohibited Patterns

- Do not fetch API data directly inside page or presentational components; use feature query hooks.
- Do not store server state in Zustand; Zustand is used here for auth/session and small client-only state.
- Do not duplicate shared field, dialog, or table primitives when an existing wrapper already matches the need.
- Do not build card-like, item-like, dialog-like, alert-like, sheet-like, or table-like UI from bare `div` markup when a shadcn primitive exists or should be added.
- Do not introduce route protection only in the UI; sensitive pages still need `PageGuard`, `RoleGuard`, or both.
- Do not add new vendor-style component copies when an existing `components/ui` primitive can be composed.
