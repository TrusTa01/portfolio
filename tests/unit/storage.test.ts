import { test } from 'node:test';
import assert from 'node:assert/strict';
import { safeGet, safeSet, STORAGE_KEYS } from '../../src/scripts/storage.ts';

const throwing = (): never => {
  throw new Error('storage unavailable');
};

test('storage keys are stable', () => {
  assert.deepEqual(STORAGE_KEYS, { locale: 'locale', theme: 'theme' });
});

test('safeGet returns null when getItem throws', () => {
  assert.equal(safeGet('k', { getItem: throwing }), null);
});

test('safeSet returns false when setItem throws', () => {
  assert.equal(safeSet('k', 'v', { setItem: throwing }), false);
});

test('a normal storage round-trips', () => {
  const map = new Map<string, string>();
  const fake = {
    getItem: (key: string): string | null => map.get(key) ?? null,
    setItem: (key: string, value: string): void => {
      map.set(key, value);
    },
  };
  assert.equal(safeSet('k', 'v', fake), true);
  assert.equal(safeGet('k', fake), 'v');
  assert.equal(safeGet('missing', fake), null);
});
