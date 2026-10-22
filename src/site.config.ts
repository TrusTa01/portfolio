import type { Locale } from './i18n/locales.ts';

// Values are entered by the author. An empty string means "do not show".
export type SiteConfig = {
  domain: string; // Production host without scheme, e.g. "example.com".
  name: Record<Locale, string>; // Display name per locale, e.g. { ru: "Анна", en: "Ann" }.
  nick: string; // Short handle, e.g. "ann_dev".
  telegram: string; // Username without @, not a URL.
  github: string; // Username, not a URL.
  email: string; // Address, e.g. "ann@example.com".
  resumePdf: string; // Path under public/, used in the resume slice, e.g. "/resume.pdf".
};

export const siteConfig: SiteConfig = {
  domain: 'yuriyborovikov.com',
  name: { ru: 'Юрий', en: 'Yuriy' },
  nick: '',
  telegram: 'yuriy_borovikov',
  github: 'TrusTa01',
  email: 'trusta01.dev@gmail.com',
  resumePdf: '',
};
