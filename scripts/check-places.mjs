#!/usr/bin/env node
/**
 * npm run check-places
 *
 * Checks src/data/places.json (and place-locators.json) and writes a plain
 * English report to PLACES_REPORT.md. Exits with code 1 if there are errors,
 * so problems are noticed before publishing.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const read = (rel) => fs.readFileSync(path.join(root, rel), 'utf8');

const CATEGORIES = [
  'immigration', 'hospital', 'transport', 'university', 'embassy', 'government',
  'attraction', 'pharmacy', 'bank', 'supermarket', 'tickets'
];
const REQUIRED = ['id', 'category', 'name', 'address', 'city', 'lat', 'lng', 'officialUrl', 'sourceUrl', 'lastChecked', 'verified'];
// Rough box around Latvia (a bit generous at the borders).
const LATVIA = { minLat: 55.6, maxLat: 58.1, minLng: 20.9, maxLng: 28.3 };
const MAX_AGE_MONTHS = 12;

const errors = [];
const warnings = [];
const info = [];

let places = [];
let locators = [];
try {
  places = JSON.parse(read('src/data/places.json'));
  if (!Array.isArray(places)) throw new Error('places.json must be a list [ ... ]');
} catch (e) {
  errors.push(`places.json could not be read: ${e.message}`);
}
try {
  locators = JSON.parse(read('src/data/place-locators.json'));
  if (!Array.isArray(locators)) throw new Error('place-locators.json must be a list [ ... ]');
} catch (e) {
  errors.push(`place-locators.json could not be read: ${e.message}`);
}
let sourcesLog = '';
try {
  sourcesLog = read('SOURCES.md');
} catch {
  errors.push('SOURCES.md is missing.');
}

const now = new Date();
const monthsOld = (yyyyMm) => {
  const [y, m] = yyyyMm.split('-').map(Number);
  return (now.getUTCFullYear() - y) * 12 + (now.getUTCMonth() + 1 - m);
};
const isHttps = (u) => typeof u === 'string' && /^https:\/\/[^\s]+$/.test(u);

const seenIds = new Map();
const seenNameAddr = new Map();
const byCategory = {};
let verifiedCount = 0;

places.forEach((p, i) => {
  const label = `${p?.id || `(record #${i + 1})`}`;
  const missing = REQUIRED.filter((k) => p[k] === undefined || p[k] === null || p[k] === '');
  if (missing.length) errors.push(`${label}: missing required field(s): ${missing.join(', ')}`);

  if (p.name && (typeof p.name !== 'object' || !p.name.en)) errors.push(`${label}: name must have at least an "en" value`);
  else if (p.name && !p.name.tr) warnings.push(`${label}: no Turkish ("tr") name — English will be shown`);

  if (p.category && !CATEGORIES.includes(p.category)) errors.push(`${label}: unknown category "${p.category}"`);

  if (p.lat !== undefined && p.lng !== undefined) {
    if (typeof p.lat !== 'number' || typeof p.lng !== 'number') errors.push(`${label}: lat/lng must be numbers, not text`);
    else if (p.lat < LATVIA.minLat || p.lat > LATVIA.maxLat || p.lng < LATVIA.minLng || p.lng > LATVIA.maxLng)
      errors.push(`${label}: coordinates ${p.lat}, ${p.lng} are outside Latvia (lat/lng swapped?)`);
  }

  for (const k of ['officialUrl', 'sourceUrl', 'osmUrl']) {
    if (p[k] !== undefined && p[k] !== '' && !isHttps(p[k])) errors.push(`${label}: ${k} must be a full https:// link`);
  }
  if (!p.sourceUrl) errors.push(`${label}: no sourceUrl — cannot be shown`);
  if (!p.osmUrl) warnings.push(`${label}: no osmUrl — coordinates are not traceable to an OpenStreetMap object`);

  if (!p.lastChecked) {
    errors.push(`${label}: lastChecked is missing`);
  } else if (!/^\d{4}-(0[1-9]|1[0-2])$/.test(p.lastChecked)) {
    errors.push(`${label}: lastChecked must look like "2026-10"`);
  } else if (monthsOld(p.lastChecked) > MAX_AGE_MONTHS) {
    warnings.push(`${label}: lastChecked ${p.lastChecked} is older than ${MAX_AGE_MONTHS} months — please re-check`);
  } else if (monthsOld(p.lastChecked) < 0) {
    errors.push(`${label}: lastChecked ${p.lastChecked} is in the future`);
  }

  if (p.verified !== true) {
    warnings.push(`${label}: verified is not true — this place is HIDDEN on the site`);
  } else {
    verifiedCount++;
    if (p.id && !sourcesLog.includes(p.id)) {
      errors.push(`${label}: verified is true but there is no SOURCES.md entry mentioning "${p.id}"`);
    }
  }

  if (p.id) {
    if (seenIds.has(p.id)) errors.push(`${label}: duplicate id (also record #${seenIds.get(p.id) + 1})`);
    seenIds.set(p.id, i);
  }
  const key = `${(p.name?.en || '').toLowerCase()}|${(p.address || '').toLowerCase()}`;
  if (key !== '|') {
    if (seenNameAddr.has(key)) errors.push(`${label}: same name and address as "${seenNameAddr.get(key)}" (duplicate?)`);
    seenNameAddr.set(key, label);
  }

  const c = p.category || 'unknown';
  byCategory[c] ??= { total: 0, shown: 0 };
  byCategory[c].total++;
  if (p.verified === true && p.sourceUrl) byCategory[c].shown++;
});

// Places that sit on (almost) the same spot — often a copy/paste mistake.
for (let a = 0; a < places.length; a++) {
  for (let b = a + 1; b < places.length; b++) {
    const A = places[a], B = places[b];
    if (typeof A.lat === 'number' && typeof B.lat === 'number' && Math.abs(A.lat - B.lat) < 0.00005 && Math.abs(A.lng - B.lng) < 0.00005) {
      warnings.push(`${A.id} and ${B.id}: same coordinates — check that this is intended`);
    }
  }
}

locators.forEach((l, i) => {
  const label = `locator ${l?.id || `#${i + 1}`}`;
  for (const k of ['id', 'category', 'name', 'url', 'description', 'lastChecked']) {
    if (!l[k]) errors.push(`${label}: missing ${k}`);
  }
  if (l.url && !isHttps(l.url)) errors.push(`${label}: url must be a full https:// link`);
  if (l.category && !CATEGORIES.includes(l.category)) errors.push(`${label}: unknown category "${l.category}"`);
  if (l.id && !sourcesLog.includes(l.id)) warnings.push(`${label}: no SOURCES.md entry mentioning "${l.id}"`);
});

info.push(`Places in file: ${places.length}`);
info.push(`Verified (shown on site): ${verifiedCount}`);
info.push(`Official locator links: ${locators.length}`);

const date = now.toISOString().slice(0, 10);
const list = (arr) => (arr.length ? arr.map((x) => `- ${x}`).join('\n') : '- None 🎉');
const table = Object.entries(byCategory)
  .map(([c, v]) => `| ${c} | ${v.shown} | ${v.total - v.shown} |`)
  .join('\n');

const report = `# Places Report

Generated by \`npm run check-places\` on ${date}.

## Summary
${info.map((x) => `- ${x}`).join('\n')}
- Errors: **${errors.length}**
- Warnings: **${warnings.length}**

| Category | Shown | Hidden |
|---|---|---|
${table || '| (no places yet) | 0 | 0 |'}

## Errors (must fix)
${list(errors)}

## Warnings (should check)
${list(warnings)}
`;

fs.writeFileSync(path.join(root, 'PLACES_REPORT.md'), report);
console.log(report);
console.log(errors.length ? `❌ ${errors.length} error(s). See PLACES_REPORT.md` : '✅ No errors. Report written to PLACES_REPORT.md');
process.exit(errors.length ? 1 : 0);
