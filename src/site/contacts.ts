import type { SiteConfig } from '../site.config.ts';
import type { UiKey } from '../i18n/t.ts';

export type ContactKind = 'telegram' | 'email' | 'github';

export type ContactLink = { kind: ContactKind; href: string; label: string };

const HANDLE_PREFIX = '@';

const HREF_BUILDERS: Record<ContactKind, (value: string) => string> = {
  telegram: (value) => `https://t.me/${value}`,
  email: (value) => `mailto:${value}`,
  github: (value) => `https://github.com/${value}`,
};

export const CONTACT_LABEL_KEYS: Record<ContactKind, UiKey> = {
  telegram: 'contact.telegram',
  email: 'contact.email',
  github: 'contact.github',
};

const CONTACT_ORDER: readonly ContactKind[] = ['telegram', 'email', 'github'];

function clean(kind: ContactKind, raw: string): string {
  const trimmed = raw.trim();
  return kind === 'email' || !trimmed.startsWith(HANDLE_PREFIX)
    ? trimmed
    : trimmed.slice(HANDLE_PREFIX.length).trim();
}

export function contactLinks(config: Pick<SiteConfig, ContactKind>): ContactLink[] {
  return CONTACT_ORDER.flatMap((kind) => {
    const value = clean(kind, config[kind]);
    return value === '' ? [] : [{ kind, href: HREF_BUILDERS[kind](value), label: value }];
  });
}
