import { test } from 'node:test';
import assert from 'node:assert/strict';
import { DEFAULT_THEME, LIGHT_CLASS, resolveTheme } from '../../src/theme/theme.ts';

test('a saved light theme is kept', () => {
  assert.equal(resolveTheme('light'), 'light');
});

test('missing or invalid values fall back to dark', () => {
  assert.equal(resolveTheme(null), 'dark');
  assert.equal(resolveTheme('dark'), 'dark');
  assert.equal(resolveTheme('blue'), 'dark');
});

test('constants', () => {
  assert.equal(DEFAULT_THEME, 'dark');
  assert.equal(LIGHT_CLASS, 'light');
});
