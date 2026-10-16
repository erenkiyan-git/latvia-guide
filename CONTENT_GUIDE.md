# Latvia Guide: Content & Maintenance Guide

A plain-English guide for the founder and editors on how to manage, verify, and publish content on Latvia Guide.

---

## 1. Daily Development Commands

Always make sure your Node.js version is **22.x** or newer (`node -v`).

* **Start the site locally (Preview mode):**
  ```bash
  npm run dev
  ```
  Open `http://localhost:4321` in your browser. Any saved change updates immediately.

* **Build the production site:**
  ```bash
  npm run build
  ```
  Compiles all 259+ static pages into `./dist`.

---

## 2. Automated Quality & Link Checks

Before publishing new guides or deploying updates, run the automated verification tool:

```bash
npm run check-links
```

### What this tool does:
1. Crawls every internal page on the website to ensure no 404 dead links or broken redirects exist.
2. Connects to all external URLs (PMLP, VID, CSDD, ministries, universities) to verify they are alive.
3. Automatically writes a full summary report into **`LINK_REPORT.md`**.

If any link shows an error, check `LINK_REPORT.md`, open the affected guide file, and either update the link or remove it and add it to `VERIFY_BEFORE_PUBLISHING.md`.

---

## 3. How to Update Global Settings (Contact Email, Site Title)

Open **`src/config.ts`**:
```typescript
export const SITE = {
  title: 'Latvia Guide',
  description: 'A practical, trustworthy guide for foreigners in Latvia.',
  contactEmail: 'contact@latviaguide.com' // <-- Replace with your real working email
};
```
When you change `contactEmail` here, all contact buttons, footer error-reporting links, and legal notices across the entire website update automatically.

---

## 4. Trust Badges & Verification Rules

Every guide must maintain our strict credibility rules:
- **`badge: "official"` (Green):** Strictly based on official Latvian government legislation (Likumi.lv, PMLP, VID). Must include an `officialSource` URL.
- **`badge: "verified"` (Blue):** Fact-checked with official sources in the current month. Shows a visible "Last checked: <Month Year>" label.
- **`badge: "draft"` (Yellow):** Content in progress or awaiting official confirmation. **Never** displays a "Last checked" date publicly.

### How to format `officialSource` in frontmatter:
Always use clean bullet points (never paste two URLs on the same line with a comma):
```yaml
officialSource:
  - "https://www.pmlp.gov.lv/en/residence-permit"
  - "https://www.pmlp.gov.lv/en/citizenship"
```

---

## 5. Editing Useful Links & Places

- **Useful Links Page:** Edit `src/data/links.json` directly.
- **Map Locations:** Edit `src/data/places.json`. To verify all map coordinates and addresses, run:
  ```bash
  npm run check-places
  ```
