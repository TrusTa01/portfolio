import { LOCALES, LOCALE_TAGS } from './locales.ts';
import { localePath, stripLocale } from './paths.ts';

const X_DEFAULT = 'x-default';
const ROOT = '/';

export type AlternateLink = { hreflang: string; href: string };

export function alternateLinks(pathname: string, site: URL): AlternateLink[] {
  const rest = stripLocale(pathname);
  return [
    ...LOCALES.map((locale) => ({
      hreflang: LOCALE_TAGS[locale],
      href: new URL(localePath(locale, rest), site).href,
    })),
    { hreflang: X_DEFAULT, href: new URL(ROOT, site).href },
  ];
}
