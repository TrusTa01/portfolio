import { test } from 'node:test';
import assert from 'node:assert/strict';
import { identityLabel } from '../../src/site/identity.ts';

const ann = { ru: 'Анна', en: 'Ann' };
const empty = { ru: '', en: '' };

test('joins name and nick', () => {
  assert.equal(identityLabel({ name: ann, nick: 'ann_dev' }, 'en'), 'Ann · ann_dev');
});

test('picks the name for the requested locale', () => {
  assert.equal(identityLabel({ name: ann, nick: '' }, 'ru'), 'Анна');
  assert.equal(identityLabel({ name: ann, nick: '' }, 'en'), 'Ann');
});

test('renders only non-empty parts', () => {
  assert.equal(identityLabel({ name: ann, nick: ' ' }, 'en'), 'Ann');
  assert.equal(identityLabel({ name: empty, nick: 'ann_dev' }, 'en'), 'ann_dev');
});

test('returns empty string when both are empty', () => {
  assert.equal(identityLabel({ name: empty, nick: '' }, 'en'), '');
});
