import { localePath } from '../i18n/paths.ts';
import { pickLocale } from '../i18n/pick.ts';
import { safeGet, STORAGE_KEYS } from './storage.ts';

location.replace(localePath(pickLocale(safeGet(STORAGE_KEYS.locale), navigator.languages)));
