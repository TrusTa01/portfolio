import type { Locale } from './locales.ts';
import { en } from './ui/en.ts';
import { ru } from './ui/ru.ts';

export type UiKey = keyof typeof en;

export type Dictionary = Record<UiKey, string>;

const DICTIONARIES: Record<Locale, Dictionary> = { ru, en };

export function t(locale: Locale, key: UiKey): string {
  return DICTIONARIES[locale][key];
}
