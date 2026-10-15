export const SITE = {
  title: 'Latvia Guide',
  description: 'A practical, trustworthy guide for foreigners in Latvia.',
  contactEmail: 'contact@latviaguide.com'
};

export const LANGUAGES = {
  en: { label: 'English', active: true },
  tr: { label: 'Türkçe', active: true },
  ru: { label: 'Русский', active: false }, // Ready but hidden for launch
  lv: { label: 'Latviešu', active: false } // Ready but hidden for launch
};

export const DEFAULT_LANG = 'en';

export type Lang = keyof typeof LANGUAGES;
