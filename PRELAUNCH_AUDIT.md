# Pre-Launch Quality, Trust, SEO & Accessibility Audit

**Project:** Latvia Guide (`latviaguide.com`)  
**Audit Date:** October 16, 2026  
**Auditor:** Senior Front-End, SEO, Accessibility & UX Auditor  
**Git Branch:** `prelaunch-polish`  
**Build Status:** Clean production build (259 pages generated via Astro 7.3.6 on Node 22).

---

## Executive Summary

| Severity | Count | Description |
| :--- | :---: | :--- |
| **Blocker** | **7** | Must be fixed before public release (broken government URLs, missing 404, missing hreflang/x-default, exposed internal routes in sitemap, dummy tracking script, missing legal pages, unverified dates on draft guides). |
| **Important** | **12** | Impacts user trust, mobile experience, accessibility, or organic search rankings (contrast failures, missing TOC, zero related guides, CLS from hero image, unlocalized UI strings). |
| **Nice-to-have** | **6** | Enhancements for polish, offline resilience, and social sharing asset weights. |

---

## Findings by Workstream / Phase

### Phase 2 (W1): Broken and Outdated Links
* **Severity:** Blocker
* **Locations:** Multiple MDX guides and `useful-websites`
* **What is wrong:**
  1. **Malformed Comma-Separated URLs:** Several frontmatter `officialSource` fields contain two URLs joined by a comma string instead of a YAML array, resulting in unclickable 404 links:
     - `en/documents/permanent-residence.mdx`: `https://www.pmlp.gov.lv/en/residence-permit,https://www.pmlp.gov.lv/en/citizenship`
     - `en/documents/visa-hub.mdx`: `https://www.pmlp.gov.lv/en,https://www.mfa.gov.lv/en`
     - `en/work/minimum-wage.mdx`: `https://www.lm.gov.lv/en,https://www.pmlp.gov.lv/en`
     - `tr/documents/digital-nomad-visa.mdx`: `https://www.pmlp.gov.lv/en/entry-latvia,https://investinlatvia.org`
     - `tr/documents/turkey-country-notes.mdx`: `https://www.mfa.gov.lv/en/ankara,https://www.pmlp.gov.lv/en`
     - `tr/work/finding-a-job.mdx`: `https://www.cv.lv,https://www.nva.gov.lv`
     - `tr/work/tax-booklet.mdx`: `https://www.vid.gov.lv/en,https://eds.vid.gov.lv/`
  2. **Dead / Reorganized Official URLs:**
     - PMLP Lost ID: `https://www.pmlp.gov.lv/en/what-do-if-identity-document-lost` (404)
     - EU Schengen Calculator: `https://home-affairs.ec.europa.eu/policies/schengen-borders-and-visa/border-crossing/short-stay-visa-calculator_en` (404)
     - MFA Ankara: `https://www.mfa.gov.lv/en/ankara` (404)
     - CSDD Driving Licence Exchange: `https://www.csdd.lv/en/exchanging-a-driving-licence-issued-abroad/general-information` (404)
     - VID Economic Activity: `https://www.vid.gov.lv/en/registration-economic-activity` (404)
     - VID Tax Declaration: `https://www.vid.gov.lv/en/annual-income-declaration` (404)
     - NVD Health Portal endpoints: `https://www.nvd.gov.lv/en/...`
  3. **Dead Useful Sites:** `https://inch.lv` (timeout), `https://likeit.lv/en` (down), `https://yourmove.lv` (down), `https://www.integration.lv/en` (down).
  4. **Redirects (16 URLs):** `latvija.lv` redirects to `latvija.gov.lv/Home/`, MFA sections have moved to `/travel-and-consular-services`.
* **Proposed Fix:** Format multi-source links as proper arrays; replace dead URLs with verified current official destinations or fallback to verified parent portals with "Check the official source"; remove defunct commercial portals; add npm check-links automated script.

---

### Phase 3 (W2): Verification List & Desynchronized Badges
* **Severity:** Blocker
* **Locations:** `VERIFY_BEFORE_PUBLISHING.md`, `SOURCES.md`, `src/content/guides/`
* **What is wrong:**
  1. `SOURCES.md` documents only 32 verified sources, while 126 guides claim `verified: true` and display "October 2026".
  2. **Badge & Date Desynchronization between EN and TR:**
     - `daily-life/cost-of-living.mdx`: EN is marked `draft` (unverified), but TR is marked `verified: true` with `lastChecked: "Ekim 2026"`.
     - `documents/digital-nomad-visa.mdx`: EN is marked `draft`, but TR is marked `verified: true` with `lastChecked: "Ekim 2026"`.
     - `documents/turkey-country-notes.mdx`: EN is marked `draft`, but TR is marked `verified: true` with `lastChecked: "Ekim 2026"`.
     - `healthcare/emergencies.mdx`: EN is `verified: true`, but TR is marked `draft`.
     - `students/isic-card.mdx`: EN is `verified: true`, but TR is marked `draft`.
     - `travel/day-trips.mdx`: EN is `verified: true`, but TR is marked `draft`.
* **Proposed Fix:** Harmonize all EN and TR pairs. For every fact on `VERIFY_BEFORE_PUBLISHING.md` that cannot be officially confirmed right now, set `badge: "draft"`, `verified: false`, and remove `lastChecked`. Update `SOURCES.md` with verified sources checked during session.

---

### Phase 4 (W3): Legal & Privacy Architecture
* **Severity:** Blocker
* **Locations:** `src/layouts/BaseLayout.astro`, `src/components/Footer.tsx`, new legal routes
* **What is wrong:**
  1. Site collects no first-party data and sets no first-party cookies, but `BaseLayout.astro` unconditionally loads Google Tag Manager script with dummy ID `G-XXXXXXXXXX`, which attempts to set cookies and sends visitor IP to Google without consent.
  2. The interactive map uses third-party OpenStreetMap tiles, exposing IP addresses to OSM.
  3. Geolocation is used on the map ("Near Me") client-side.
  4. LocalStorage is used for `preferred_lang` and `latviaguide_checklist`.
  5. The site has NO Privacy Policy, NO Cookie/LocalStorage Notice, and NO Terms & Disclaimer pages.
  6. The footer has NO links to legal notices.
* **Site Data Handling Audit Table:**
  | Data Type / Tool | Present? | Location | Purpose | Privacy / GDPR Impact |
  | :--- | :---: | :--- | :--- | :--- |
  | First-party Cookies | No | None | None | None |
  | Third-party Analytics | Yes (Dummy) | `BaseLayout.astro` | `gtag.js (G-XXXXXXXXXX)` | Sets third-party tracking cookies; transmits IP to Google; lacks consent mechanism. |
  | LocalStorage | Yes | `Checklist.tsx`, `index.astro`, `Header.tsx` | Checklist state & language preference | Strictly functional, stored locally on visitor device, not transmitted. |
  | Map Tiles | Yes | `LeafletMap.tsx` | OpenStreetMap tiles | Transmits visitor IP address to OpenStreetMap Foundation (UK). |
  | Fonts | Self-hosted | `@fontsource/inter` | Typography | Bundled locally by Vite; zero external network requests. |
  | Geolocation | Yes (Client) | `InteractiveMap.tsx` | "Near Me" map sorting | Browser prompt requested on-demand; coordinates calculated locally, never sent to server. |
  | Forms / Newsletter | No | None | None | None |
  | Contact / Feedback | Yes | `mailto:` links | Founder communication | Handled entirely within visitor's email client. |
* **Proposed Fix:**
  - Remove non-functional GTM script from `BaseLayout.astro` until founder configures an approved privacy-first analytics tool.
  - Create plain-English Privacy Policy, Cookie/LocalStorage Notice, and Terms & Disclaimer pages in English (`/en/privacy/`, `/en/terms/`, `/en/cookies/`) and Turkish (`/tr/gizlilik/`, `/tr/sartlar/`, `/tr/cerezler/`).
  - Add legal links in `Footer.tsx`.
  - Add placeholder settings in `src/config.ts` with build warnings if missing. List legal review in `FOUNDER_TODO.md`.

---

### Phase 5 (W4): 404 and Empty/Error States
* **Severity:** Blocker
* **Locations:** `src/pages/404.astro`, `src/components/SearchBox.tsx`, `src/pages/[lang]/map/index.astro`, `src/components/Checklist.tsx`
* **What is wrong:**
  1. **No 404 Page:** There is no `404.astro` page in the project. Any broken link results in a web server error rather than a branded, helpful recovery page.
  2. **SearchBox Microcopy Bug:** The keyboard shortcut hints in `SearchBox.tsx` header toolbar are hardcoded in Turkish (`↑↓ Gezin · Seç`) even when the user is on an English page.
  3. **Map Fallback Empty:** The `<div id="no-js-list">` container is empty. When JavaScript is disabled or fails to load, users see an alert saying the map is disabled and a list is provided, but no list is actually rendered.
  4. **Checklist Reset Prompt:** `handleReset` in `Checklist.tsx` uses hardcoded English `window.confirm('Are you sure you want to reset all your progress?')` on Turkish pages.
  5. **Useful Websites Filters:** If filters yield no results, the empty state works, but card language badges lack Turkish equivalents.
* **Proposed Fix:**
  - Create a multilingual, responsive `404.astro` with search input, emergency links, and popular guide recommendations.
  - Fix Turkish hardcoding in `SearchBox.tsx` toolbar.
  - Populate `#no-js-list` with server-rendered place cards.
  - Localize the checklist reset modal and progress label.

---

### Phase 6 (W5): Titles, Meta Descriptions & Structured Data
* **Severity:** Important
* **Locations:** All guides and section layouts, `BaseLayout.astro`
* **What is wrong:**
  1. 7 titles exceed 60 characters (e.g. `Scenario: Opening a Bank Account Before Your Permit \| Latvia Guide` - 66 chars).
  2. 44 pages have descriptions shorter than 40 characters (mainly section hub pages).
  3. 2 pages have missing descriptions.
  4. **Zero Structured Data:** 0 out of 259 pages contain JSON-LD structured data. No `Article`, `FAQPage`, `BreadcrumbList`, or `Organization` schemas exist.
* **Proposed Fix:**
  - Normalize titles to under 60 characters with consistent search-intent wording (e.g., "Bank Account Before Residence Permit \| Latvia Guide").
  - Expand short descriptions to 120-155 characters.
  - Add JSON-LD schema generation in `BaseLayout.astro` and `GuideLayout.astro`.

---

### Phase 7 (W6 & W14): Hreflang, Canonical, Sitemap, Robots & Social Tags
* **Severity:** Blocker
* **Locations:** `src/layouts/BaseLayout.astro`, `astro.config.mjs`, `public/robots.txt`
* **What is wrong:**
  1. **Missing Hreflang & x-default:** ALL 259 pages lack `<link rel="alternate" hreflang="...">` tags! Search engines cannot correlate the English and Turkish versions.
  2. **Internal Pages in Sitemap:** `sitemap-0.xml` includes `/design-system/` and `/palette-preview/`.
  3. `robots.txt` does not disallow `/design-system/` or `/palette-preview/`.
  4. Canonical URL logic does not generate language alternates.
  5. Social cards hardcode `https://latviaguide.com/social-card.jpg` on all pages, which is a 599 KB uncompressed image.
* **Proposed Fix:**
  - Add bidirectional `hreflang` tags (`en`, `tr`, and `x-default="https://latviaguide.com/en/"`) in `BaseLayout.astro`.
  - Filter out `/design-system/` and `/palette-preview/` in `astro.config.mjs` sitemap options.
  - Add Disallow rules in `robots.txt`.
  - Compress and generate lightweight branded Open Graph / Twitter images.

---

### Phase 8 (W7): Internal Linking & Orphan Pages
* **Severity:** Important
* **Locations:** `src/layouts/GuideLayout.astro`, `src/components/RelatedGuides.astro`, all MDX guides
* **What is wrong:**
  1. 0 out of 144 guides have `relatedGuides` specified in frontmatter.
  2. `RelatedGuides.astro` is only imported manually into 1 single guide (`visa-hub.mdx`), using brittle relative hrefs (`./${guide.slug}`).
  3. Guides end abruptly without suggesting next steps or complementary topics.
* **Proposed Fix:**
  - Integrate an automatic "Related Guides" and "Next Step" suggestion algorithm into `GuideLayout.astro` that suggests 3-4 relevant guides from the same section or target audience if manual `relatedGuides` are not defined.
  - Ensure links use absolute language-prefixed URLs (`/${lang}/guides/...`).

---

### Phase 9 (W8): Performance & Asset Optimization
* **Severity:** Important
* **Locations:** `public/hero-riga.jpg`, `src/pages/[lang]/index.astro`, `src/layouts/BaseLayout.astro`, `src/pages/[lang]/map/index.astro`
* **What is wrong:**
  1. `hero-riga.jpg` is a 617.7 KB uncompressed JPEG loaded on the homepage without explicit `width` or `height` attributes (causing CLS).
  2. `social-card.jpg` is 599.1 KB.
  3. `@fontsource/inter` imports Greek, Cyrillic, Cyrillic-Ext, Latin, and Latin-Ext weights.
  4. `map/index.astro` dynamically loads Leaflet CSS and JS from `unpkg.com` on top of local Vite modules.
  5. Dummy Google Tag Manager script incurs render-blocking DNS lookups.
* **Proposed Fix:**
  - Compress `hero-riga.jpg` into optimized WebP/JPEG format with explicit aspect-ratio attributes.
  - Remove external unpkg.com script injection in favor of bundled Leaflet.
  - Strip unneeded font weights; preload primary Latin font.

---

### Phase 10 (W9): First-5-Seconds Clarity (Homepage)
* **Severity:** Important
* **Locations:** `src/pages/[lang]/index.astro`, `src/i18n/en.json`, `src/i18n/tr.json`
* **What is wrong:**
  1. "Welcome to Latvia" / "Letonya'ya Hoş Geldiniz" reads like a tourist greeting rather than an actionable guide for relocation and daily life.
  2. Above the fold on a 390px mobile screen, there are no immediate action buttons for users who do not type in the search bar.
* **Proposed Fix:**
  - Upgrade headline and subheadline to communicate immediate value.
  - Add primary CTA buttons: "Browse All Guides" and "First 30 Days Checklist".
  - **Option 1 (Recommended):**
    - EN Headline: *Living, Working & Studying in Latvia — Made Simple*
    - EN Subheadline: *Clear, verified answers for expats, students, and workers in Latvia. All rules checked against official government sources.*
    - TR Headline: *Letonya'da Yaşam, Çalışma ve Eğitim — Pratik Rehber*
    - TR Subheadline: *Gurbetçiler, öğrenciler ve çalışanlar için resmi kaynaklardan doğrulanmış güncel bilgiler.*
  - **Option 2:**
    - EN Headline: *The Practical Handbook for Foreigners in Latvia*
    - EN Subheadline: *From residence permits and taxes to healthcare and housing — step-by-step guides verified with official sources.*

---

### Phase 11 (W10): Microcopy & Terminology Consistency
* **Severity:** Important
* **Locations:** `src/i18n/*.json`, `src/components/*.tsx`
* **What is wrong:**
  1. Hardcoded English words in Turkish components: "Visit", "Official", "Progress:", "completed", "Found X verified guides".
  2. Inconsistent terminology: "residence permit" vs "living permit"; "deklarēšanās" lacking consistent parenthetical Latvian terms.
* **Proposed Fix:**
  - Move all component-level copy into `en.json` and `tr.json`.
  - Maintain Latvian legal terms in brackets upon first mention across all guides (e.g. `residence permit (termiņuzturēšanās atļauja)`, `address registration (deklarēšanās)`).

---

### Phase 12 (W11): Readability & Mobile Table of Contents
* **Severity:** Important
* **Locations:** `src/components/TableOfContents.astro`, `src/layouts/GuideLayout.astro`
* **What is wrong:**
  1. `TableOfContents.astro` is never rendered in `GuideLayout.astro`. Long guides have no quick navigation.
  2. `TableOfContents.astro` has `hidden md:block`, meaning mobile users would never see it.
  3. `// ON THIS PAGE` header is hardcoded in English with code syntax.
* **Proposed Fix:**
  - Render an interactive, collapsible Table of Contents in `GuideLayout.astro` for all guides with 3 or more headings.
  - Make TOC accessible and responsive on 360px mobile viewports.

---

### Phase 13 (W12): Accessibility (A11y)
* **Severity:** Important
* **Locations:** `src/layouts/BaseLayout.astro`, `src/components/Header.tsx`, `src/styles/global.css`
* **What is wrong:**
  1. **No Skip Link:** No "Skip to main content" link for keyboard/screen-reader navigation.
  2. **Contrast Failures:** Text styled with `text-slate-400` (`#4b525d`) on dark surfaces (`#0b0c0f` / `#13151a`) has a contrast ratio of 2.32:1, failing WCAG AA (minimum 4.5:1).
  3. **Mobile Menu Keyboard Trap & Escape Key:** Pressing `Escape` does not dismiss the open mobile navigation drawer in `Header.tsx`.
  4. **Hardcoded English Aria Label:** `aria-label="Toggle menu"` on mobile menu button.
  5. **No Reduced Motion Query:** `global.css` lacks `@media (prefers-reduced-motion)` overrides for pulsing/bouncing animations.
* **Proposed Fix:**
  - Add visually hidden, focusable Skip Link at the very top of `BaseLayout.astro`.
  - Adjust muted text tokens (`--color-slate-400` or usages) to meet 4.5:1 contrast against dark backgrounds.
  - Add Escape key listener and localized aria-labels to `Header.tsx`.
  - Add `@media (prefers-reduced-motion: reduce)` rules in `global.css`.

---

### Phase 14 (W13): Trust Pages, About Structure & Brand Assets
* **Severity:** Important
* **Locations:** `src/pages/[lang]/about/index.astro`, `src/components/Footer.tsx`, `public/`
* **What is wrong:**
  1. The About page does not explain who is behind Latvia Guide, leaving visitor trust incomplete.
  2. Footer lacks the required explicit independence statement in both languages.
  3. Missing `apple-touch-icon.png` and `site.webmanifest`.
* **Proposed Fix:**
  - Update About page structure with a dedicated "Who is behind this project" section, incorporating non-rendered founder placeholders.
  - Add clear independence statement to `Footer.tsx` in EN and TR:
    - *EN: "Latvia Guide is an independent project and is not an official government website."*
    - *TR: "Latvia Guide bağımsız bir proje olup resmi bir devlet web sitesi değildir."*
  - Generate standard web manifest and Apple touch icons.
