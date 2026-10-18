import { test } from 'node:test';
import assert from 'node:assert/strict';
import { CONTACT_LABEL_KEYS, contactLinks } from '../../src/site/contacts.ts';

test('all empty values give no links', () => {
  assert.deepEqual(contactLinks({ telegram: '', email: '', github: '' }), []);
});

test('skips blank values and strips a leading @', () => {
  assert.deepEqual(contactLinks({ telegram: '@me', email: '', github: ' ' }), [
    { kind: 'telegram', href: 'https://t.me/me', label: 'me' },
  ]);
});

test('builds all three links in order', () => {
  assert.deepEqual(contactLinks({ telegram: 'tg', email: 'a@b.c', github: 'gh' }), [
    { kind: 'telegram', href: 'https://t.me/tg', label: 'tg' },
    { kind: 'email', href: 'mailto:a@b.c', label: 'a@b.c' },
    { kind: 'github', href: 'https://github.com/gh', label: 'gh' },
  ]);
});

test('no link ever has an empty href', () => {
  for (const link of contactLinks({ telegram: '@', email: '  ', github: '@x' })) {
    assert.notEqual(link.href, '');
  }
});

test('every contact kind has a label key', () => {
  assert.deepEqual(CONTACT_LABEL_KEYS, {
    telegram: 'header.telegram',
    email: 'contact.email',
    github: 'header.github',
  });
});
