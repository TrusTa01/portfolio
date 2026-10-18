// Values are entered by the author. An empty string means "do not show".
export type SiteConfig = {
  name: string; // Display name, e.g. "Ann Smith".
  nick: string; // Short handle, e.g. "ann_dev".
  telegram: string; // Username without @, not a URL.
  github: string; // Username, not a URL.
  email: string; // Address, e.g. "ann@example.com".
  resumePdf: string; // Path under public/, used in the resume slice, e.g. "/resume.pdf".
};

export const siteConfig: SiteConfig = {
  name: '',
  nick: '',
  telegram: '',
  github: '',
  email: '',
  resumePdf: '',
};
