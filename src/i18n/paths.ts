import { isLocale } from './locales.ts';
import type { Locale } from './locales.ts';

const SEPARATOR = '/';

function segmentsOf(path: string): string[] {
  return path.split(SEPARATOR).filter((segment) => segment.length > 0);
}

function toPath(segments: readonly string[]): string {
  return segments.length === 0 ? SEPARATOR : `${SEPARATOR}${segments.join(SEPARATOR)}${SEPARATOR}`;
}

export function localePath(locale: Locale, path: string = SEPARATOR): string {
  return toPath([locale, ...segmentsOf(path)]);
}

export function localeFromPath(pathname: string): Locale | null {
  const [first] = segmentsOf(pathname);
  return first !== undefined && isLocale(first) ? first : null;
}

export function stripLocale(pathname: string): string {
  const segments = segmentsOf(pathname);
  const [first] = segments;
  return toPath(first !== undefined && isLocale(first) ? segments.slice(1) : segments);
}

export function switchLocalePath(pathname: string, target: Locale): string {
  return localePath(target, stripLocale(pathname));
}
