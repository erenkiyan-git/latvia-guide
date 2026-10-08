# Latvia Guide

A practical, trustworthy, mobile-first information website for foreigners in Latvia (international students, foreign workers, tourists, and new residents).

## Project Architecture
- **Framework**: [Astro](https://astro.build/) (Static Site Generation)
- **Content**: Markdown/MDX with Astro Content Collections
- **Styling**: Tailwind CSS 4 (design tokens in `src/styles/global.css`)
- **JavaScript**: React "islands" only where interaction is needed
- **i18n**: Sub-path routing (e.g., `/en/`, `/tr/`) based on static JSON dictionaries.

## Core Features
1. **Content System**: Strict Markdown validation via Zod schemas. Every guide requires a trust badge, verified status, and category.
2. **Interactive Checklist**: 30-day relocation checklist with `localStorage` persistence (no database required).
3. **Calculators**: Client-side Net Salary and Living Costs estimators.
4. **Instant Search**: Build-time generated JSON search index for ultra-fast, serverless searching with synonym support.
5. **SEO Ready**: Auto-generated XML sitemaps, OpenGraph social tags, and Google Analytics snippet included.

## Scripts

```bash
# Start the local development server at localhost:4321
npm run dev

# Build the production static site into the /dist folder
npm run build

# Preview the built production site locally
npm run preview

# Check the places data and write PLACES_REPORT.md
npm run check-places
```

## Map of Useful Places

Page: `/en/map/` and `/tr/map/`. Data: `src/data/places.json` (places) and `src/data/place-locators.json` (links to official "find a branch" pages). Only places with `verified: true`, a `sourceUrl` and a `SOURCES.md` entry are shown. How to add a place: see `CONTENT_GUIDE.md`.

### Added dependencies (and why)
- **leaflet** — the free, open-source map library the founder approved; installed via npm so nothing loads from a third-party CDN.
- **@types/leaflet** (development only) — type descriptions so the editor catches mistakes in map code; it is not shipped to visitors.

## Folder Structure
* `src/content/guides/` - Markdown articles organized by language.
* `src/data/` - JSON data files for checklists, phrases, and links.
* `src/i18n/` - Translation dictionaries for the UI.
* `src/components/` - Reusable Astro UI components.
* `src/pages/` - Page templates and routing logic.

Built by Antigravity.
