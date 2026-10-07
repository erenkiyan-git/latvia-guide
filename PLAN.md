# Implementation Plan: Latvia Guide

## 1. Chosen Stack & Why
- **Framework:** Astro. Chosen for its excellent static site generation, performance (zero JS by default), and content collections which make working with Markdown extremely easy. This fits the requirement for simplicity and a static output.
- **Styling:** Plain CSS with CSS variables (Design Tokens). No Tailwind. This keeps the codebase simpler for a non-programmer to read and modify later without learning utility classes.
- **Interactivity:** Vanilla JavaScript. Only used for necessary client-side features (search, checklist, calculators, map, menu toggle). No heavy frameworks like React.
- **Map:** Leaflet with OpenStreetMap.

## 2. Folder Structure
```text
/
├── public/                 # Static assets (images, icons, fonts)
├── src/
│   ├── components/         # Reusable UI components (Header, GuideCard, TrustBadge, etc.)
│   ├── content/
│   │   ├── config.ts       # Content collections schema
│   │   └── guides/         # Markdown content organized by language and section
│   │       ├── en/
│   │       ├── tr/
│   │       ├── ru/
│   │       └── lv/
│   ├── data/               # JSON data files (links, places, phrases, checklist, costs)
│   ├── i18n/               # UI text translations (en.json, tr.json, etc.)
│   ├── layouts/            # Page layouts (BaseLayout, GuideLayout)
│   ├── pages/              # Astro pages and routing (multilingual setup)
│   ├── styles/             # Global CSS and design tokens (index.css)
│   └── config.ts           # Global configuration (flags for ru/lv, contact email)
├── astro.config.mjs        # Astro configuration
├── package.json            # Dependencies and scripts
├── PLAN.md                 # This plan
└── README.md               # User manual
```

## 3. Page List & Sitemap
- `/` - Landing Page (detects/redirects to preferred language)
- `/{lang}/` - Homepage (Search, problem cards, checklist preview, popular guides)
- `/{lang}/guides/` - Section landing pages (e.g., /en/guides/new-to-latvia/)
- `/{lang}/guides/{slug}/` - Individual guide pages
- `/{lang}/useful-websites/` - Filterable links
- `/{lang}/map/` - Interactive map and verified places list
- `/{lang}/phrases/` - Basic Latvian phrases
- `/{lang}/emergency/` - Lightweight emergency contacts
- `/{lang}/calculators/` - Cost of living & Salary calculators
- `/{lang}/about/` - Mission, trust explanation, disclaimer

## 4. Content Model
- **Guides:** Markdown files with Frontmatter `title`, `description`, `section`, `badge` (e.g., 'official', 'verified', 'draft'), `officialSource` (URL), `lastChecked` (Month Year), `verified` (boolean).
- **JSON Data:**
  - `links.json`: Useful websites categorized.
  - `places.json`: Places for the map with verification flags.
  - `phrases.json`: Situational phrases with translations.
  - `checklist.json`: 30-day grouped checklist items.
  - `costs.json`: Values for calculators, verified flags, sources.

## 5. Build Phases
- **Phase 1:** Setup, config, folder structure, base layout, styling tokens. (COMPLETED)
- **Phase 2:** i18n architecture and language switcher. (COMPLETED)
- **Phase 3:** Content system, templates, components (TrustBadge, SourceBox, etc.). (COMPLETED)
- **Phase 4:** Homepage and section landing pages. (COMPLETED)
- **Phase 5:** Starter content for 15 sections (English and Turkish). (COMPLETED)
- **Phase 6:** 30-day checklist feature. (COMPLETED)
- **Phase 7:** Client-side search. (COMPLETED)
- **Phase 8:** Useful Websites, Phrases, Emergency pages. (COMPLETED)
- **Phase 9:** Map feature. (COMPLETED)
- **Phase 10:** Calculators. (COMPLETED)
- **Phase 11:** SEO, Accessibility, Performance, About page. (COMPLETED)
- **Phase 12:** Final QA. (COMPLETED)

## 6. Assumptions & Questions
- **Assumption 1:** We will use a standard set of system fonts to avoid downloading external assets unless necessary, keeping the site simple and fast.
- **Assumption 2:** The "fallback language notice" for missing pages will be a small banner at the top of the English page when accessed from another language route.
- **Question for the Founder:** Do you have any preference for the accent color (e.g., a specific shade of blue/teal) for the site's brand? (If not, I will pick a modern, calm teal).
