import { LANGUAGES, DEFAULT_LANG } from '../config';

// Load UI translations
import en from './en.json';
import tr from './tr.json';
import ru from './ru.json';
import lv from './lv.json';

const ui = {
  en,
  tr,
  ru,
  lv,
} as const;

export function getLangFromUrl(url: URL) {
  const [, lang] = url.pathname.split('/');
  if (lang in LANGUAGES) return lang as keyof typeof LANGUAGES;
  return DEFAULT_LANG;
}

export function useTranslations(lang: keyof typeof LANGUAGES) {
  return function t(key: keyof typeof ui[typeof DEFAULT_LANG]) {
    // @ts-ignore - dynamic key access
    return ui[lang][key] || ui[DEFAULT_LANG][key];
  }
}

export function getActiveLanguages() {
  return Object.entries(LANGUAGES)
    .filter(([_, config]) => config.active)
    .map(([code]) => code);
}
