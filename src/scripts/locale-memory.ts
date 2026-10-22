import { isLocale } from '../i18n/locales.ts';
import { safeSet, STORAGE_KEYS } from './storage.ts';

const LINK_SELECTOR = 'a[data-locale-link]';

document.querySelectorAll<HTMLAnchorElement>(LINK_SELECTOR).forEach((link) => {
  link.addEventListener('click', () => {
    const locale = link.dataset.locale;
    if (locale !== undefined && isLocale(locale)) safeSet(STORAGE_KEYS.locale, locale);
  });
});
