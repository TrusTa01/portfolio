export const LOCALES = ['ru', 'en'] as const;

export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = 'en';

// BCP 47 tags, used for hreflang and the sitemap (the html lang attribute uses the bare locale).
export const LOCALE_TAGS: Record<Locale, string> = {
  ru: 'ru-RU',
  en: 'en-US',
};

export function isLocale(value: string): value is Locale {
  return (LOCALES as readonly string[]).includes(value);
}
