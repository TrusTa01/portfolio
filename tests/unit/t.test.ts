import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { en } from '../../src/i18n/ui/en.ts';
import { ru } from '../../src/i18n/ui/ru.ts';
import { t } from '../../src/i18n/t.ts';

describe('t', () => {
  it('returns the Russian string', () => {
    assert.equal(t('ru', 'nav.projects'), 'Мои проекты');
  });

  it('returns the English string', () => {
    assert.equal(t('en', 'nav.projects'), 'My projects');
  });
});

describe('dictionaries', () => {
  it('have identical key sets', () => {
    assert.deepEqual(new Set(Object.keys(ru)), new Set(Object.keys(en)));
  });

  for (const [name, dict] of [['en', en], ['ru', ru]] as const) {
    it(`${name} values are non-empty trimmed strings`, () => {
      for (const key of Object.keys(en)) {
        const value = (dict as Record<string, unknown>)[key];
        assert.equal(typeof value, 'string', key);
        assert.ok((value as string).length > 0, key);
        assert.equal(value, (value as string).trim(), key);
      }
    });
  }
});
