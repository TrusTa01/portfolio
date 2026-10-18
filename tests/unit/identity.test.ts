import { test } from 'node:test';
import assert from 'node:assert/strict';
import { identityLabel } from '../../src/site/identity.ts';

test('joins name and nick', () => {
  assert.equal(identityLabel({ name: 'Ann', nick: 'ann_dev' }), 'Ann · ann_dev');
});

test('renders only non-empty parts', () => {
  assert.equal(identityLabel({ name: 'Ann', nick: ' ' }), 'Ann');
  assert.equal(identityLabel({ name: '', nick: 'ann_dev' }), 'ann_dev');
});

test('returns empty string when both are empty', () => {
  assert.equal(identityLabel({ name: '', nick: '' }), '');
});
