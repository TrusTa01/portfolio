import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import type { HomeContent } from '../../src/content/home-schema.ts';
import { requireHome } from '../../src/content/require-home.ts';

const SAMPLE: HomeContent = {
  hero: { title: 'a', description: 'b', chips: [] },
  about: { paragraphs: [] },
  technologies: { intro: 'c', items: [] },
  services: [],
  contacts: { intro: 'd' },
};

describe('requireHome', () => {
  it('returns the data when present', () => {
    assert.equal(requireHome(SAMPLE, 'en'), SAMPLE);
  });

  it('throws a message naming the missing file', () => {
    assert.throws(
      () => requireHome(undefined, 'ru'),
      /Missing home content for "ru": add src\/content\/home\/ru\.yaml/,
    );
  });
});
