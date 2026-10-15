/**
 * Shared types and helpers for the "Map of Useful Places".
 *
 * Data lives in:
 *   - src/data/places.json          (one record per verified place)
 *   - src/data/place-locators.json  (links to official "find a branch" pages)
 *
 * RULE: only places with `verified: true` AND a `sourceUrl` are ever shown.
 * See CONTENT_GUIDE.md -> "How to add or edit a place".
 */
import placesData from '../data/places.json';
import locatorsData from '../data/place-locators.json';

export type Localized = { en: string; tr?: string; ru?: string; lv?: string };

export const CATEGORY_IDS = [
  'immigration',
  'hospital',
  'transport',
  'university',
  'embassy',
  'government',
  'attraction',
  'pharmacy',
  'bank',
  'supermarket',
  'tickets'
] as const;

export type CategoryId = (typeof CATEGORY_IDS)[number];

export interface Place {
  id: string;
  category: CategoryId;
  name: Localized;
  address: string;
  city: string;
  lat: number;
  lng: number;
  officialUrl: string;
  phone?: string;
  openingHours?: Localized;
  notes?: Localized;
  tags?: string[];
  sourceUrl: string;
  osmUrl?: string;
  lastChecked: string; // "YYYY-MM"
  verified: boolean;
}

export interface Locator {
  id: string;
  category: CategoryId;
  name: string;
  url: string;
  description: Localized;
  lastChecked: string;
}

/**
 * Category display settings. `color` is the marker/badge colour; a text label
 * and an icon are ALWAYS shown next to it, so colour is never the only signal.
 */
export const CATEGORIES: Record<CategoryId, { color: string; icon: string }> = {
  immigration: { color: '#ce424e', icon: 'IdCard' },
  hospital: { color: '#e11d48', icon: 'Hospital' },
  transport: { color: '#d97706', icon: 'TrainFront' },
  university: { color: '#0284c7', icon: 'GraduationCap' },
  embassy: { color: '#7c3aed', icon: 'Flag' },
  government: { color: '#059669', icon: 'Landmark' },
  attraction: { color: '#c026d3', icon: 'Camera' },
  pharmacy: { color: '#16a34a', icon: 'Pill' },
  bank: { color: '#2563eb', icon: 'Banknote' },
  supermarket: { color: '#ea580c', icon: 'ShoppingCart' },
  tickets: { color: '#ca8a04', icon: 'Ticket' }
};

const HTTPS = /^https:\/\//;

/** Places safe to show publicly: verified, sourced, https links only. */
export function getPublicPlaces(): Place[] {
  return (placesData as Place[]).filter(
    (p) =>
      p.verified === true &&
      HTTPS.test(p.sourceUrl ?? '') &&
      HTTPS.test(p.officialUrl ?? '') &&
      Number.isFinite(p.lat) &&
      Number.isFinite(p.lng)
  );
}

export function getLocators(): Locator[] {
  return (locatorsData as Locator[]).filter((l) => HTTPS.test(l.url ?? ''));
}

/** Categories that have at least one public place, in fixed display order. */
export function getActiveCategories(places: Place[]): CategoryId[] {
  const used = new Set(places.map((p) => p.category));
  return CATEGORY_IDS.filter((c) => used.has(c));
}

export function pick(value: Localized | undefined, lang: string): string {
  if (!value) return '';
  return (value as Record<string, string | undefined>)[lang] || value.en;
}

/** "2026-10" -> "October 2026" (en) / "Ekim 2026" (tr). */
export function formatMonth(yyyyMm: string, lang: string): string {
  const [y, m] = yyyyMm.split('-').map(Number);
  if (!y || !m) return yyyyMm;
  const locale = lang === 'tr' ? 'tr-TR' : lang === 'lv' ? 'lv-LV' : lang === 'ru' ? 'ru-RU' : 'en-GB';
  return new Date(Date.UTC(y, m - 1, 1)).toLocaleDateString(locale, {
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC'
  });
}

/** Link to the exact OSM object if known, otherwise to the coordinates. */
export function osmLink(p: Place): string {
  if (p.osmUrl && HTTPS.test(p.osmUrl)) return p.osmUrl;
  return `https://www.openstreetmap.org/?mlat=${p.lat}&mlon=${p.lng}#map=18/${p.lat}/${p.lng}`;
}

/** Google Maps directions to the verified point (user's current location will be start point). */
export function directionsLink(p: Place): string {
  return `https://www.google.com/maps/dir/?api=1&destination=${p.lat},${p.lng}`;
}

/** Straight-line distance in km (haversine formula). */
export function distanceKm(aLat: number, aLng: number, bLat: number, bLng: number): number {
  const R = 6371;
  const toRad = (d: number) => (d * Math.PI) / 180;
  const dLat = toRad(bLat - aLat);
  const dLng = toRad(bLng - aLng);
  const h =
    Math.sin(dLat / 2) ** 2 + Math.cos(toRad(aLat)) * Math.cos(toRad(bLat)) * Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(h));
}

/** Text used by the search box (name in all languages, address, city, tags). */
export function searchText(p: Place, categoryLabel: string): string {
  return [
    ...Object.values(p.name),
    p.address,
    p.city,
    categoryLabel,
    ...(p.tags ?? [])
  ]
    .join(' ')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
}
