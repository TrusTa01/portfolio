export const THEMES = ['dark', 'light'] as const;
export type Theme = (typeof THEMES)[number];
export const DEFAULT_THEME: Theme = 'dark';
export const LIGHT_THEME: Theme = 'light';
export const LIGHT_CLASS = 'light';

function isTheme(value: string): value is Theme {
  return (THEMES as readonly string[]).includes(value);
}

export function resolveTheme(saved: string | null): Theme {
  return saved !== null && isTheme(saved) ? saved : DEFAULT_THEME;
}
