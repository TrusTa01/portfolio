// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import { DEFAULT_LOCALE, LOCALES, LOCALE_TAGS } from './src/i18n/locales.ts';
import { siteConfig } from './src/site.config.ts';

const ROOT_PATHNAME = '/';

// https://astro.build/config
export default defineConfig({
  site: `https://${siteConfig.domain}`,
  trailingSlash: 'always',
  integrations: [
    sitemap({
      // The site root is a language chooser, not a content page.
      filter: (page) => new URL(page).pathname !== ROOT_PATHNAME,
      i18n: { defaultLocale: DEFAULT_LOCALE, locales: LOCALE_TAGS },
    }),
  ],
  i18n: {
    locales: [...LOCALES],
    defaultLocale: DEFAULT_LOCALE,
    routing: { prefixDefaultLocale: true, redirectToDefaultLocale: false },
  },
  vite: { plugins: [tailwindcss()] },
});
