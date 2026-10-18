import { localePath } from '../i18n/paths.ts';
import type { Locale } from '../i18n/locales.ts';
import type { UiKey } from '../i18n/t.ts';

export const SECTION_IDS = { about: 'about', contacts: 'contacts' } as const;

const ROUTES = { projects: '/projects/', resume: '/resume/' } as const;
const ANCHOR_PREFIX = '#';

export type NavItem = { key: UiKey; href: string };
export type NavAvailability = { projects: boolean; resume: boolean };

// Slices 2-3 flip these flags when the pages exist.
export const AVAILABLE_PAGES = { projects: false, resume: false } as const;

export type PageName = keyof typeof ROUTES;
export type SectionName = keyof typeof SECTION_IDS;

export function pageHref(locale: Locale, page: PageName): string {
  return localePath(locale, ROUTES[page]);
}

export function sectionHref(locale: Locale, section: SectionName): string {
  return localePath(locale) + ANCHOR_PREFIX + SECTION_IDS[section];
}

export function navItems(locale: Locale, available: NavAvailability): NavItem[] {
  const items: (NavItem | null)[] = [
    { key: 'nav.home', href: localePath(locale) },
    available.projects ? { key: 'nav.projects', href: pageHref(locale, 'projects') } : null,
    available.resume ? { key: 'nav.resume', href: pageHref(locale, 'resume') } : null,
    { key: 'nav.about', href: sectionHref(locale, 'about') },
    { key: 'nav.contacts', href: sectionHref(locale, 'contacts') },
  ];
  return items.filter((item): item is NavItem => item !== null);
}
