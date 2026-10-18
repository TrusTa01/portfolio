import type { Locale } from '../i18n/locales.ts';
import type { HomeContent } from './home-schema.ts';

export function requireHome(data: HomeContent | undefined, locale: Locale): HomeContent {
  if (data === undefined) {
    throw new Error(`Missing home content for "${locale}": add src/content/home/${locale}.yaml`);
  }
  return data;
}
