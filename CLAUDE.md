# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

Portaler is a static Astro site listing a Danish school's digital learning platforms, browsable by
grade (`0.–9. klasse`) and subject. All user-facing copy is Danish.

## Essential Commands

Run everything from the repository root with Bun (`packageManager: bun@1.3.14`).

| Command | Purpose |
| --- | --- |
| `bun install` | Install dependencies (CI uses `bun install --frozen-lockfile`). |
| `bun run dev` | Astro dev server. |
| `bun run check` | `astro check` — syncs content collections, regenerates `.astro/types.d.ts`, and type-checks `.astro`/`.ts`/`.svelte`/`.tsx`. This is the primary correctness gate. |
| `bun run sync` | Regenerate content-collection types only, without diagnostics. |
| `bun run build` | Static build to `dist/`. Zod schema violations in `src/content/**` fail here. |
| `bun run preview` | Serve the built `dist/`. |
| `bun run lint` / `bun run lint:fix` | `biome check .` / `biome check --write .`. |
| `bunx biome ci .` | The exact non-writing Biome gate CI runs. Use this to reproduce CI locally. |
| `prek run --all-files --hook-stage manual` | Run the repo's own hooks as CI does. |

**There is no test suite.** No test runner is configured and no test files exist. Validation is
`bun run check` + `bun run build`, plus the CI smoke test that serves `dist/` and asserts `/`,
`/other`, `/grade/3`, and `/fag/matematik` return a `<title>`. Do not claim tests were run.

## Architecture Overview

Astro 7 with `output: "static"`, deployed to GitHub Pages (`portaler.edbpede.net`) by
`.github/workflows/deploy.yml` on every push to `main`.

**Data flows in one direction:** JSON files in `src/content/` → glob loader + Zod schemas in
`src/content.config.ts` → query/enrichment layer in `src/lib/platforms.ts` → `.astro` pages →
props into the client islands.

- `src/lib/platforms.ts` is the only place that calls `getCollection("platforms")`. It enriches each
  entry into a plain, serializable `PlatformItem` (adding `subjectLabel`, `subjectOrder`, `accent`,
  `icon`) so the Solid island never touches `astro:content`, and caches the result in a module-scope
  promise so the collection is scanned once per build.
- `src/lib/grades.ts` holds the domain model (`PHASES`, three Danish school phases covering grades
  0–9). It drives `getStaticPaths()` in `src/pages/grade/[id].astro` and the `GradeRail` component —
  changing `PHASES` changes the set of generated routes.
- **Exactly two client islands exist**, both leaf components: `ThemeToggle.svelte` (`client:load`)
  and `PlatformExplorer.tsx` (`client:idle`, Solid — search, publisher filter, subject grouping).
  Everything else is `.astro` and ships zero JS.
- Styling: UnoCSS `presetWind4`. Semantic utilities (`bg-background`, `text-foreground`,
  `text-indskoling`, …) are declared in `uno.config.ts` and resolve to CSS variables defined in
  `src/styles/global.css`. Dark mode is a `.dark` class on `<html>`, applied pre-paint by the inline
  script in `src/layouts/Layout.astro`; `ThemeToggle.svelte` only toggles that class,
  `localStorage`, and the `theme-color` meta.

## Project Boundaries

- `dist/` and `.astro/` are generated and gitignored — never edit.
- `src/content/**` is data only. Presentation for a subject (accent colour, icon) lives in
  `src/lib/subjects.ts`, not in the JSON.
- Publisher logos are resolved to hashed URLs in `src/lib/publishers.ts`, keyed by the exact
  `publisher` string from the platform JSON. Publishers without an entry render a text-only chip.

## Common Change Workflows

### Adding a platform

1. Create `src/content/platforms/<publisher>/<kebab-name>.json` with `name`, `publisher`, `grades`,
   `url`, `subject`, `description`, `longDescription` (`isActive` defaults to `true`).
2. `subject` **must** be one of the `subjectSlugs` in `src/content.config.ts`.
3. `"grades": []` places the platform in the `/other` ("Andre platforme") bucket instead of any
   grade page.
4. If the publisher is new and has a logo, add the asset to `src/assets/` and register it in
   `src/lib/publishers.ts`.
5. Run `bun run check`.

### Adding a subject

A new subject requires four coordinated edits — miss any one and it silently misbehaves:

1. `src/content/subjects/<slug>.json` — `name` (the slug), `displayName`, `order`.
2. Add the slug to `subjectSlugs` in `src/content.config.ts` (the Zod enum platforms validate against).
3. Add an `accent` (OKLCH) and an `i-lucide-*` `icon` to `SUBJECT_META` in `src/lib/subjects.ts`.
   Without this the subject silently falls back to the grey `andre` identity.
4. Add the slug to the `subject` dropdown in `.github/ISSUE_TEMPLATE/new-platform.yml`.
5. Run `bun run check`.

A subject tile only appears on the front page once at least one active platform references it —
`SubjectTiles.astro` filters out zero-count subjects.

## Implementation Decisions

| Situation | Preferred approach | Avoid |
| --- | --- | --- |
| New UI that needs no client state | An `.astro` component | Adding a Svelte/Solid island — the site's value is zero-JS-by-default |
| Getting platform data to an island | Pass enriched `PlatformItem[]` from `src/lib/platforms.ts` as props | Calling `getCollection` / importing `astro:content` inside `.tsx` or `.svelte` |
| Per-subject accent colour | Inline `style={`--sa: ${accent}`}` plus literal utilities like `bg-[var(--sa)]/12` | Composing class names at runtime — UnoCSS extracts statically and the class will not exist |
| Per-phase colour | A literal `Record<PhaseId, string>` class map (see `GradeRail.astro`) | Template-interpolated `text-${phase.id}` |
| Querying platforms in a new page | An existing helper in `src/lib/platforms.ts`, or add one there | A second `getCollection("platforms")` call, which bypasses the enrichment and the build-time cache |

## Repository Conventions

- **UnoCSS static extraction.** Class strings must be literal in source. `src/lib/subjects.ts` is
  marked `// @unocss-include` precisely because it holds literal `i-lucide-*` strings outside a
  component; keep that comment if you add icons there.
- **`format: "file"` is load-bearing.** `astro.config.mjs` emits `/grade/0.html`, and every internal
  link uses a bare no-trailing-slash anchor (`/grade/0`, `/fag/dansk`, `/other`). These two are
  paired; changing one breaks live URLs on GitHub Pages.
- **Local hooks (prek) will block you.** `no-commit-to-branch` rejects direct commits to `main`,
  `commit-msg` enforces Conventional Commits, gitleaks scans for secrets, and `pre-push` runs
  `bun run check`. Work on a branch and let the hooks run.
- **Biome config is deliberately loose in two places:** `noUnusedImports` and `noUnusedVariables`
  are off. Formatting is 100 columns, double quotes, semicolons, trailing commas.
- **Danish sorting.** Use `localeCompare(a, b, "da")` when ordering names, publishers, or subjects,
  as `src/lib/platforms.ts` and `PlatformExplorer.tsx` do.

## Critical Gotchas

- **`icon` and `iconOverwrite` keys in `src/content/**/*.json` are dead data.** The Zod schemas do
  not declare them, so Zod strips them silently — including the `ph:*` Phosphor icon names still
  present in `src/content/subjects/*.json`. To change a subject's icon or colour, edit
  `SUBJECT_META` in `src/lib/subjects.ts`.
- **The platform-request automation can emit an unbuildable file.** The dropdown in
  `.github/ISSUE_TEMPLATE/new-platform.yml` offers `fransk`, `håndværk-design`, `idræt`,
  `kristendom`, and `musik` — none are valid slugs — and omits the valid `handvaerk-design` and
  `religion`. `.github/workflows/platform-request.yml` writes the raw dropdown value straight into
  the JSON, so the generated PR fails at `bun run check`/`bun run build`. When reviewing such a PR,
  correct `subject` to a real slug (or add the subject properly via the workflow above).
- **A platform referencing a subject with no entry in the `subjects` collection still builds.**
  `src/lib/platforms.ts` only `console.warn`s and labels it "Andre", so the mistake is easy to miss
  in build output.

## Additional Documentation

- `README.md` — read for the platform/subject JSON field reference before adding content. Note its
  "Astro 6" badge and prose are stale; `package.json` pins `astro: ^7.0.0`, which is authoritative.
- `.augment/rules/astro-dev-pro.md` — read before writing Svelte 5 runes, Solid components,
  hydration directives, or UnoCSS/`presetWind4` config. It is the authoritative idiom guide for this
  exact stack and covers the mistakes imported from React/Svelte 4 habits.
- `.github/workflows/code-quality.yml` — read before changing lint/format config or bumping Biome;
  it documents the Renovate-only auto-migration job and why it is the sole write-capable job.
- `.github/workflows/smoke.yml` — read before changing routes or adding a test layer; it explains
  what the smoke test deliberately does not cover (client-side island hydration).
- `prek.toml` — read before changing commit or push validation. Its comment points at a
  `CONTRIBUTING.md` that does not exist in this repository.
