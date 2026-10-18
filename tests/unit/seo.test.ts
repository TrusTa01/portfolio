import { test } from 'node:test';
import assert from 'node:assert/strict';
import { alternateLinks } from '../../src/i18n/seo.ts';

const site = new URL('https://example.com');

test('lists every locale plus x-default', () => {
  assert.deepEqual(alternateLinks('/ru/', site), [
    { hreflang: 'ru-RU', href: 'https://example.com/ru/' },
    { hreflang: 'en-US', href: 'https://example.com/en/' },
    { hreflang: 'x-default', href: 'https://example.com/' },
  ]);
});

test('keeps the page path across locales', () => {
  const links = alternateLinks('/en/projects/x/', site);
  assert.equal(links[0]?.href, 'https://example.com/ru/projects/x/');
  assert.equal(links[1]?.href, 'https://example.com/en/projects/x/');
});
