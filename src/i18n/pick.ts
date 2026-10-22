import { DEFAULT_LOCALE, isLocale } from './locales.ts';
import type { Locale } from './locales.ts';

const RUSSIAN_PREFIX = 'ru';

export function pickLocale(saved: string | null, browserLanguages: readonly string[]): Locale {
  if (saved !== null && isLocale(saved)) return saved;
  const primary = browserLanguages[0]?.toLowerCase();
  return primary?.startsWith(RUSSIAN_PREFIX) ? 'ru' : DEFAULT_LOCALE;
}
