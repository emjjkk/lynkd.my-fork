import en from '../locales/en.json';
import zh from '../locales/zh.json';

const translations = {
  en: en,
  zh: zh,
} as const;

export type Locale = keyof typeof translations;
export type Translations = typeof en;

export function getTranslations(locale: Locale): Translations {
  return translations[locale];
}

// Type-safe translation keys
export type TranslationKey = keyof Translations;