import { DEFAULT_LOCALE } from '../i18n/locales.ts';
import { localeFromPath } from '../i18n/paths.ts';
import { pickLocale } from '../i18n/pick.ts';
import { safeGet, STORAGE_KEYS } from './storage.ts';

const BLOCK_SELECTOR = '[data-not-found]';
const BLOCK_ATTRIBUTE = 'data-not-found';
const TITLE_ATTRIBUTE = 'data-title';

const locale =
  localeFromPath(location.pathname) ?? pickLocale(safeGet(STORAGE_KEYS.locale), navigator.languages);

if (locale !== DEFAULT_LOCALE) {
  document.querySelectorAll<HTMLElement>(BLOCK_SELECTOR).forEach((block) => {
    block.hidden = block.getAttribute(BLOCK_ATTRIBUTE) !== locale;
    if (!block.hidden) document.title = block.getAttribute(TITLE_ATTRIBUTE) ?? document.title;
  });
  document.documentElement.lang = locale;
}
