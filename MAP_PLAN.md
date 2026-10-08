# Map of Useful Places — Plan (awaiting approval)

Status: **PLAN ONLY — no code written yet.**
Date: 2026-10-08

---

## 1. What I found (Step 0)

| Item | Finding |
|---|---|
| Stack | Astro 7 + React "islands" + Tailwind CSS 4 + MDX. Dark theme (black/zinc, Latvian red `primary-*`, emerald "official", sky "verified"). Inter font. |
| Languages | `en`, `tr` live; `ru`, `lv` hidden by flag in `src/config.ts`. UI strings in `src/i18n/*.json`. |
| Map page | `src/pages/[lang]/map/index.astro` — static "Coming Soon (V2)" card. Promises: PMLP offices, "24/7 pharmacies & emergency rooms", university campuses, ticket machines, "offline-friendly". |
| Data folder | `src/data/` has `links.json`, `checklist.json`, `phrases.json`, `synonyms.json`. No places data yet. |
| Search | `src/pages/[lang]/search-index.json.ts` — indexes guides only; has a "future: add more" note. |
| Build | `npm run build` works: **167 pages, no errors.** |
| Git | ⚠️ You are on branch `content-expansion` (all the redesign + content work lives here). `main` only has the very first V1 commit. One file has an uncommitted change (`src/content.config.ts`, from the content batches). |
| Source access | OpenStreetMap is reachable (coordinates can be read from exact OSM objects). ⚠️ `pmlp.gov.lv` did **not** respond to my tools today. I'll retry in Phase 2, including with the browser tool. If it still can't be reached, PMLP offices stay off the map until verified. |
| Docs | `SOURCES.md`, `VERIFY_BEFORE_PUBLISHING.md`, `README.md`, `HOW_TO_EDIT.md` exist. `CONTENT_GUIDE.md` does **not** exist yet. |

---

## 2. Data structure — `src/data/places.json`

One record per place:

```jsonc
{
  "id": "pmlp-riga-example",
  "category": "immigration",
  "name": { "en": "…", "tr": "…" },
  "address": "Street 1, Rīga, LV-1000",
  "city": "Rīga",
  "lat": 56.95,
  "lng": 24.11,
  "officialUrl": "https://… (official page of the institution)",
  "phone": "+371 …",                          // optional, only if verified
  "openingHours": { "en": "…", "tr": "…" },  // optional, only if verified
  "notes": { "en": "…", "tr": "…" },          // optional, short
  "tags": ["residence permit", "PMLP"],       // optional, helps search
  "sourceUrl": "https://… (page where name/address were confirmed)",
  "osmUrl": "https://www.openstreetmap.org/node/…", // where the coordinates came from
  "lastChecked": "2026-10",
  "verified": true
}
```

- One small addition to your field list: **`osmUrl`** — the exact OpenStreetMap object the coordinates were read from. This makes coordinates auditable and gives a precise "Open in OpenStreetMap" link.
- Places with `verified: false` are **never shown** on the site (kept in the file only as candidates).
- A second small file, `src/data/place-locators.json`, holds the "Official locator" cards (e.g. a pharmacy chain's own store finder).

---

## 3. Categories I expect to fill with verified data

| Category | Expectation | Notes |
|---|---|---|
| Immigration offices (PMLP) | ✅ High | From PMLP's official office list. |
| Hospitals & emergency care | ✅ High | Main state/university hospitals + children's hospital. "Emergency department" shown only if the hospital's own site says so. |
| Transport hubs | ✅ High | Riga Airport, Riga Central Station, Riga Coach Terminal. |
| Universities | ✅ High | Main buildings of LU, RTU, RSU and a few other major institutions. |
| Tourist attractions | ✅ High | Old Town landmarks from liveriga.com. |
| Government service centres | 🟡 Medium | VID, NVA, CSDD customer service points in Riga. |
| Embassies & consulates | 🟡 Medium | Turkey + others you choose (see Questions). Only from official embassy/MFA pages. |
| Pharmacies | 🔁 Locator cards | Individual pharmacies only if hours are verified officially; otherwise links to chains' official "find a pharmacy" pages. |
| Banks | 🔁 Locator cards | Links to official branch finders of main banks. |
| Supermarkets | 🔁 Locator cards | Links to official store finders of main chains. |
| Ticket points | 🔁 Info card | Link to Rīgas satiksme official ticket info. |

Target: **about 40–60 verified places**, mostly Riga, plus main PMLP offices and hospitals in other big cities where sources are clear. Anything I can't confirm goes to `VERIFY_BEFORE_PUBLISHING.md`, not the map.

---

## 4. Page layout

**Desktop (wide screens):** Title + short intro → search box + category chips (with "Show all" / "Reset") → **list on the left (~40%)**, **map on the right (~60%)**, side by side. Locator cards and the "Offline tip" below.

**Mobile (360px+):** Search → chips scroll sideways in one row (44px tall) → a clear **"List | Map" toggle**. List is shown by default. Map takes ~60% of screen height when selected.

**Each place (list card and map popup):** name, category label + small icon (color is never the only signal), address, "Official website", phone/hours only if verified, "Open in OpenStreetMap", "Get directions" (opens OpenStreetMap directions to the verified point), and "Official source · Last checked: Oct 2026" only when `verified: true`.

**Interaction:** click a list item → map flies to it and opens its popup; click a marker → list item is highlighted and scrolled into view. Filters/search are saved in the link (e.g. `/en/map/?category=hospital`) so guides can link to filtered views.

**"Near me":** a button; asks for location only after a click, sorts the list by distance, centers the map. Nothing is stored or sent. Friendly message if denied. (Simple — I plan to include it.)

---

## 5. How it's built (plain English)

- **Leaflet** installed via npm (no CDN, no API key). Plain Leaflet inside one React component — `react-leaflet` isn't needed and would add more code.
- Markers are small coloured **CSS/SVG icons with a category symbol** → no image files, no "broken marker" problem.
- The **list is built into the page at build time**, so it works even without JavaScript. The map code is downloaded **only on the map page, and only when the map is actually visible** (on mobile: only after tapping "Map"). Other pages are not affected.
- Map tiles: OpenStreetMap, with the required "© OpenStreetMap contributors" credit.

## 6. Fallbacks

- **Map fails** (offline, tiles blocked, error): list keeps working + friendly notice "The map couldn't load. The list below has all places and links."
- **No JavaScript:** plain list grouped by category (built into the page).
- **Offline tip:** "The map needs internet. The list and 'Open in OpenStreetMap' links still help." — no offline-map promise.

---

## 7. What I recommend dropping from the placeholder

| Old promise | Recommendation | Why |
|---|---|---|
| "Interactive Map Coming Soon (V2)" | Remove | Replaced by the real map. |
| "24/7 pharmacies" | **Drop** (unless verified) | Hours change often; I won't claim 24/7 without an official page. Replaced by official pharmacy locators. |
| "Emergency rooms" | Keep, carefully | Only hospitals whose own site confirms an emergency department get that label. |
| "Transport ticket machines" | **Drop** | Unless Rīgas satiksme publishes a location list; replaced by a link to their official ticket info. |
| "Offline-friendly map" | **Drop** | Not doing offline caching in V1. |

---

## 8. Support tools & docs

- `npm run check-places` → checks required fields, coordinates inside Latvia, duplicates, missing sources, `verified:false`, `lastChecked` missing/older than 12 months → writes `PLACES_REPORT.md`.
- New `CONTENT_GUIDE.md`: "How to add or edit a place" (with copy-paste template) + "How to run the check". Linked from `HOW_TO_EDIT.md`.
- Search index: places added so "hospital", "PMLP", "embassy", "airport" etc. find them.
- `SOURCES.md` gets a "Places" section; README gets the dependency note, tile-usage note and "Ideas for later".

## 9. Phases (commit after each)

1. Branch, Leaflet, data structure, i18n keys, check script
2. Verify batch 1: PMLP, hospitals, transport hubs
3. List view, filters, search, no-JS fallback
4. Leaflet map, popups, syncing, URL filters, mobile toggle
5. Verify batch 2: universities, embassies, gov centres, attractions + locator cards
6. Near me, fallbacks, accessibility
7. Connect guides/nav/homepage/checklist/search; remove "Coming Soon"; Turkish
8. Final QA + handover

---

## 10. Questions for you

1. **Branch base:** May I commit the pending content change on `content-expansion` and create `map-feature` **from `content-expansion`**? (Branching from `main` would lose the redesign and all content batches.)
2. **Embassies:** Besides Turkey, which countries? Suggestion: Turkey, India, Uzbekistan, Ukraine, Germany, USA, UK.
3. **Turkish place names:** Keep official names as-is (e.g. "Rīgas Austrumu klīniskā universitātes slimnīca") and add a Turkish description in notes? (Recommended — people need to match signs.)
