import { test } from 'node:test';
import assert from 'node:assert/strict';
import { LOCALES } from '../../src/i18n/locales.ts';
import { localeFromPath, localePath, stripLocale, switchLocalePath } from '../../src/i18n/paths.ts';

test('localePath builds prefixed paths with trailing slash', () => {
  assert.equal(localePath('ru'), '/ru/');
  assert.equal(localePath('en', '/projects/x'), '/en/projects/x/');
  assert.equal(localePath('en', 'projects/x/'), '/en/projects/x/');
});

test('localeFromPath reads only an exact locale segment', () => {
  assert.equal(localeFromPath('/ru/projects/'), 'ru');
  assert.equal(localeFromPath('/ru'), 'ru');
  assert.equal(localeFromPath('/de/'), null);
  assert.equal(localeFromPath('/'), null);
  assert.equal(localeFromPath('/russia/'), null);
});

test('stripLocale removes the prefix and normalizes slashes', () => {
  assert.equal(stripLocale('/ru/projects/x/'), '/projects/x/');
  assert.equal(stripLocale('/en/'), '/');
  assert.equal(stripLocale('/ru'), '/');
});

test('switchLocalePath swaps the prefix', () => {
  assert.equal(switchLocalePath('/ru/projects/x/', 'en'), '/en/projects/x/');
  assert.equal(switchLocalePath('/ru/projects/x', 'en'), '/en/projects/x/');
  assert.equal(switchLocalePath('/en/', 'ru'), '/ru/');
});

test('invariant I2: switching locale keeps the stripped path', () => {
  for (const a of LOCALES) {
    for (const b of LOCALES) {
      for (const p of ['/', '/projects/', '/projects/a-b/', '/resume/']) {
        assert.equal(
          stripLocale(switchLocalePath(localePath(a, p), b)),
          stripLocale(localePath(a, p)),
        );
      }
    }
  }
});
