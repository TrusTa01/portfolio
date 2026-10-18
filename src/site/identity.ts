import type { SiteConfig } from '../site.config.ts';

const IDENTITY_SEPARATOR = ' · ';

export function identityLabel(config: Pick<SiteConfig, 'name' | 'nick'>): string {
  return [config.name, config.nick]
    .map((part) => part.trim())
    .filter((part) => part !== '')
    .join(IDENTITY_SEPARATOR);
}
