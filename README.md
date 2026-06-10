<div align="center">
	<img src="src/assets/str_logo_icon.svg" alt="Portaler Logo" width="120" height="120">
	<h1>Portaler</h1>
	<p><strong>Digital Learning Platform Directory</strong></p>
	<p>A directory of digital learning platforms (digitale læremidler) for a Danish folkeskole</p>
</div>

<div align="center">

[![Built with Astro](https://img.shields.io/badge/Built%20with-Astro%206-BC52EE.svg?logo=astro)](https://astro.build)
[![Bun](https://img.shields.io/badge/Bun-1.x-000000?logo=bun&logoColor=white)](https://bun.sh)
[![UnoCSS](https://img.shields.io/badge/UnoCSS-presetWind4-333333?logo=unocss)](https://unocss.dev)
[![License: AGPL v3](https://img.shields.io/badge/License-AGPL%20v3-blue.svg)](https://www.gnu.org/licenses/agpl-3.0)

</div>

---

## 📖 Overview

Portaler helps teachers at STR navigate the digital learning platforms available
to them — by grade (årgang) and subject (fag). It is built for speed and calm
wayfinding: a fast, static, mobile-first site that loads quickly and stays out of
the way.

- **Astro 6** — static generation, file-based routing, server-first islands
- **Bun** — package manager and task runner
- **UnoCSS** (`presetWind4`) — atomic utilities + pure-CSS Phosphor icons
- **Svelte 5** — the platform browser island (search, filter, grouped list)
- **SolidJS** — the global quick-find overlay island
- **Self-hosted fonts** — Bricolage Grotesque + Inter via Fontsource (no external
  font requests — better performance and privacy)

## 🚀 Project Structure

```
src/
 ├── content.config.ts     # Content collections (Astro content layer + Zod)
 ├── content/
 │    ├── platforms/        # Platform data, by publisher (JSON)
 │    └── subjects/         # Subject data (JSON)
 ├── lib/                   # Server-side data + shared helpers
 │    ├── catalog.ts        # Loads + serialises platforms/subjects for islands
 │    ├── grades.ts         # Grades 0–9 and folkeskole stages
 │    ├── publishers.ts     # Publisher badge styling
 │    ├── icons.ts          # Phosphor → UnoCSS icon class
 │    └── types.ts          # Island-safe data shapes
 ├── components/
 │    ├── PlatformBrowser.svelte  # Svelte island: search + filter + list
 │    ├── PlatformCard.svelte     # Card with accessible info popover
 │    ├── GlobalSearch.tsx        # Solid island: cross-platform quick-find
 │    ├── GradeRail.astro         # Grade 0–9 switcher
 │    ├── SiteHeader.astro
 │    └── Footer.astro
 ├── layouts/Layout.astro
 ├── pages/                 # index, grade/[id], other
 └── styles/global.css      # Fonts, base styles, reduced-motion
```

## 💻 Development

```bash
bun install        # Install dependencies
bun run dev        # Start the dev server
bun run build      # Build for production (static, to dist/)
bun run preview    # Preview the production build
bunx astro check   # Type + diagnostics check
```

## 📝 Adding New Platforms

Create a JSON file in `src/content/platforms/[publisher]/`:

```json
{
  "name": "Platform Name",
  "publisher": "Publisher Name",
  "grades": [0, 1, 2, 3],
  "url": "https://platform-url.com",
  "subject": "subject-name",
  "isActive": true,
  "description": "Brief platform description",
  "longDescription": "Detailed description shown in the info popover",
  "iconOverwrite": false,
  "icon": { "name": "ph:book-bookmark-fill", "color": "text-blue-500" }
}
```

It is validated against the Zod schema in `src/content.config.ts`. Platforms with
an empty `grades` array appear on the **Andre platforme** page.

> **Icons:** icon `color` classes (e.g. `text-rose-500`) and any new `ph:*` icon
> name used in content must exist in the `safelist` in `uno.config.ts`, because
> UnoCSS extracts utilities statically.

## 📚 Content Collections

Type-safe content via Astro's content layer (`glob` loaders + Zod):

**Platforms** — `name`, `publisher`, `grades`, `url`, `subject`, `isActive`,
`description`, `longDescription`, optional `iconOverwrite` + `icon`.

**Subjects** — `name`, `displayName`, `order`, `isActive`, optional `icon`.

## ⚡ Performance

- Static generation; the homepage ships **zero JavaScript**
- Two deferred islands only where interaction lives (Svelte browser, Solid search)
- Pure-CSS icons (no icon runtime), self-hosted subset fonts
- Responsive images via `astro:assets`

## ⚖️ License

Licensed under the AGPLv3 — see [LICENSE](LICENSE).

<div align="center">
	<a href="https://www.gnu.org/licenses/agpl-3.0.en.html">
		<img src="src/assets/agplv3_icon.png" alt="GNU AGPLv3">
	</a>
</div>
