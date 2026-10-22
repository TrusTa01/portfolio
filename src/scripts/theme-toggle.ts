import { safeSet, STORAGE_KEYS } from './storage.ts';
import { DEFAULT_THEME, LIGHT_CLASS, LIGHT_THEME, type Theme } from '../theme/theme.ts';

const TOGGLE_SELECTOR = '[data-theme-toggle]';

document.querySelectorAll(TOGGLE_SELECTOR).forEach((button) => {
  button.addEventListener('click', () => {
    const isLight = document.documentElement.classList.toggle(LIGHT_CLASS);
    const theme: Theme = isLight ? LIGHT_THEME : DEFAULT_THEME;
    safeSet(STORAGE_KEYS.theme, theme);
  });
});
