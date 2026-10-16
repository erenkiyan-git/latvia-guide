# Latvia Guide (latviaguide.com)

A practical, trustworthy, mobile-first handbook for foreigners living, studying, and working in Latvia (students, workers, digital nomads, and new residents).

## Project Architecture
- **Framework**: [Astro 5](https://astro.build/) (Static Site Generation)
- **Content**: Markdown/MDX with Astro Content Collections & strict Zod schemas
- **Styling**: Tailwind CSS 4 with custom "Riga Noir" soft cyberpunk theme (`src/styles/global.css`)
- **Interactive Islands**: React 19 hydrated islands loaded strictly on-demand
- **i18n**: Multilingual sub-path routing (`/en/`, `/tr/` active; `/ru/`, `/lv/` config-ready)
- **Privacy & Legal**: 100% Cookieless, zero tracking scripts, full GDPR/ePrivacy compliance with plain-language legal pages

## Core Features
1. **Curated & Verified Guides**: Categorized into 9 essential pillars with trust badges (Official, Verified, Draft) and human verification dates.
2. **Instant Search & Command Bar**: Build-time indexed client-side search with `Cmd+K` / `Ctrl+K` shortcuts, category filtering, and empty-state smart pills.
3. **Interactive 30-Day Checklist**: Relocation milestone tracker with client-side `localStorage` persistence, category filters, and print stylesheet.
4. **Interactive Places Map**: Leaflet map loaded on-demand on `/map` with OpenStreetMap tiles, geolocation ("Near Me"), category filters, and full no-JS static fallback.
5. **Responsive Table of Contents**: Collapsible mobile accordion and sticky desktop rail with active heading indicators.
6. **Technical SEO & Structured Data**: Complete Schema.org JSON-LD (`Article`, `BreadcrumbList`, `Organization`, `WebSite`), bidirectional `hreflang` tags, canonical tags, automated XML sitemaps, and optimized WebP/JPEG responsive images.

## Scripts

```bash
# Start local development server (Node >= 22.12.0 required)
npm run dev

# Build the complete production static site into /dist
npm run build

# Preview the built production site locally
npm run preview

# Verify places data and write PLACES_REPORT.md
npm run check-places

# Crawl all 269 pages for broken internal and external links
node scripts/check-links.mjs
```

## Key Documentation
- `FOUNDER_TODO.md`: Final action items and decisions for the founder before public launch.
- `USER_TEST_KIT.md`: Guided 5-second test and 6 scenario tasks for real expat testing.
- `CONTENT_GUIDE.md`: Editorial rules, badge criteria, and style guidelines for contributors.
- `SOURCES.md`: Master directory of verified Latvian government sources (PMLP, VID, NVD, VSAA).
- `PRELAUNCH_RESULTS.md`: Detailed before/after quality audit and performance results.

Built with care for newcomers in Latvia.
