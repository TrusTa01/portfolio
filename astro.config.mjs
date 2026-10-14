// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// Locales are defined once: key is the URL prefix, value is the BCP 47 tag used by the sitemap.
const locales = { ru: 'ru-RU', en: 'en-US' };
const defaultLocale = 'ru';

// https://astro.build/config
export default defineConfig({
  // Placeholder until the real domain is provided.
  site: 'https://example.com',
  trailingSlash: 'always',
  integrations: [sitemap({ i18n: { defaultLocale, locales } })],
  i18n: {
    locales: Object.keys(locales),
    defaultLocale,
    routing: { prefixDefaultLocale: true, redirectToDefaultLocale: false },
  },
  vite: { plugins: [tailwindcss()] },
});
