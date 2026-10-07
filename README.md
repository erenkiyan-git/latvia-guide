# Latvia Guide

A practical, trustworthy, mobile-first information website for foreigners in Latvia (international students, foreign workers, tourists, and new residents).

## Project Architecture
- **Framework**: [Astro](https://astro.build/) (Static Site Generation)
- **Content**: Markdown/MDX with Astro Content Collections
- **Styling**: Vanilla CSS with CSS Variables (No Tailwind)
- **JavaScript**: Vanilla JS (No React/Vue overhead)
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
```

## Folder Structure
* `src/content/guides/` - Markdown articles organized by language.
* `src/data/` - JSON data files for checklists, phrases, and links.
* `src/i18n/` - Translation dictionaries for the UI.
* `src/components/` - Reusable Astro UI components.
* `src/pages/` - Page templates and routing logic.

Built by Antigravity.
