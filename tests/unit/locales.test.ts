import { test } from 'node:test';
import assert from 'node:assert/strict';
import { isLocale } from '../../src/i18n/locales.ts';

test('accepts supported locales', () => {
  assert.equal(isLocale('ru'), true);
  assert.equal(isLocale('en'), true);
});

test('rejects unsupported values', () => {
  for (const value of ['de', '', 'RU']) assert.equal(isLocale(value), false);
});
