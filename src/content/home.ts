import { getEntry } from 'astro:content';
import type { Locale } from '../i18n/locales.ts';
import type { HomeContent } from './home-schema.ts';
import { requireHome } from './require-home.ts';

export async function getHome(locale: Locale): Promise<HomeContent> {
  const entry = await getEntry('home', locale);
  return requireHome(entry?.data, locale);
}
