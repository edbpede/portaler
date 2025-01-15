<div align="center">
	<img src="public/str_logo_icon.svg" alt="Portaler Logo" width="120" height="120">
	<h1>Portaler</h1>
	<p><strong>Digital Learning Platform Directory</strong></p>
	<p>A comprehensive directory of digital learning platforms for Danish schools</p>
</div>

<div align="center">

[![Built with Astro](https://img.shields.io/badge/Built%20with-Astro-0C8FC4.svg?logo=astro)](https://astro.build)
[![Styled with Tailwind](https://img.shields.io/badge/styled%20with-Tailwind-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![License: AGPL v3](https://img.shields.io/badge/License-AGPL%20v3-blue.svg)](https://www.gnu.org/licenses/agpl-3.0)

</div>

---

## 📖 Overview

Portaler is built with modern web technologies focusing on performance and maintainability:

- **Static Generation**: Built with Astro for optimal performance
- **Type Safety**: Leverages TypeScript and Content Collections
- **Responsive Design**: Styled with Tailwind CSS
- **Content Management**: Type-safe content collections

## 🚀 Project Structure

```
src/
 ├── content/
 │    ├── config.ts        # Content collection schema definitions
 │    ├── platforms/       # Platform data files
 │    └── subjects/        # Subject data files
 ├── components/           # Reusable Astro components
 ├── layouts/              # Page layouts
 ├── pages/                # Route components
 ├── styles/               # Global styles
 └── utils/                # Utility functions
     ├── platforms.ts      # Platform data management
     ├── subjects.ts       # Subject data management
     └── grades.ts         # Grade range utilities
```

## 📝 Adding New Platforms

1. Create a new JSON file in `src/content/platforms/[publisher]/` directory:

```json
{
  "name": "Platform Name",
  "publisher": "Publisher Name",
  "grades": [0, 1, 2, 3],
  "url": "https://platform-url.com",
  "subject": "subject-name",
  "isActive": true,
  "description": "Brief platform description"
}
```

2. The platform will be automatically validated against the schema in `src/content/config.ts`.

## 💻 Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📚 Content Collections

The project uses Astro's Content Collections for type-safe content management:

### Platforms Collection

- Organized by publisher in `platforms/[publisher]/` directories
- Schema:
  - name: string (required)
  - publisher: string (required)
  - grades: number[] (required)
  - url: string URL (required)
  - subject: string (required)
  - isActive: boolean (defaults to true)
  - description: string (optional)

### Subjects Collection

- Stored in `subjects/` directory
- Schema:
  - name: string (required)
  - displayName: string (required)
  - order: number (required)
  - isActive: boolean (defaults to true)

All content is validated using Zod schemas defined in `src/content/config.ts`

## ⚡ Performance Features

- Static site generation with dynamic routes
- Image optimization with built-in astro:assets
- Resource hints and preloading
- Font optimization
- Asset optimization and caching

## ⚖️ License

This project is licensed under the AGPLv3 License - see the [LICENSE](LICENSE) file for details.

<div align="center">
	<a href="https://www.gnu.org/licenses/agpl-3.0.en.html">
		<img src="public/agplv3_icon.png" alt="GNU AGPLv3">
	</a>
</div>
