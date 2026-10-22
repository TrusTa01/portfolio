import type { Locale } from '../i18n/locales.ts';
import type { SiteConfig } from '../site.config.ts';

const IDENTITY_SEPARATOR = ' · ';

export function identityLabel(config: Pick<SiteConfig, 'name' | 'nick'>, locale: Locale): string {
  return [config.name[locale], config.nick]
    .map((part) => part.trim())
    .filter((part) => part !== '')
    .join(IDENTITY_SEPARATOR);
}
