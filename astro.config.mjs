// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import { DEFAULT_LOCALE, LOCALES } from './src/i18n/locales.ts';
import { siteConfig } from './src/site.config.ts';

// https://astro.build/config
export default defineConfig({
  site: `https://${siteConfig.domain}`,
  trailingSlash: 'always',
  i18n: {
    locales: [...LOCALES],
    defaultLocale: DEFAULT_LOCALE,
    routing: { prefixDefaultLocale: true, redirectToDefaultLocale: false },
  },
  vite: { plugins: [tailwindcss()] },
});
