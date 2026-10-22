import { test } from 'node:test';
import assert from 'node:assert/strict';
import { pickLocale } from '../../src/i18n/pick.ts';

test('a valid saved locale wins', () => {
  assert.equal(pickLocale('ru', ['en-US']), 'ru');
  assert.equal(pickLocale('en', ['ru-RU']), 'en');
});

test('an invalid saved locale is ignored', () => {
  assert.equal(pickLocale('de', ['ru-RU']), 'ru');
});

test('only the primary browser language counts', () => {
  assert.equal(pickLocale(null, ['ru-RU']), 'ru');
  assert.equal(pickLocale(null, ['RU']), 'ru');
  assert.equal(pickLocale(null, ['ru']), 'ru');
  assert.equal(pickLocale(null, ['en-GB', 'ru']), 'en');
  assert.equal(pickLocale(null, ['uk']), 'en');
  assert.equal(pickLocale(null, []), 'en');
});
