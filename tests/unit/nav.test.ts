import { test } from 'node:test';
import assert from 'node:assert/strict';
import { navItems, pageHref, sectionHref } from '../../src/navigation/nav.ts';

test('hides projects and resume when unavailable', () => {
  const keys = navItems('ru', { projects: false, resume: false }).map((item) => item.key);
  assert.deepEqual(keys, ['nav.home', 'nav.about', 'nav.contacts']);
});

test('shows five items in order when all available', () => {
  const items = navItems('en', { projects: true, resume: true });
  assert.deepEqual(
    items.map((item) => item.key),
    ['nav.home', 'nav.projects', 'nav.resume', 'nav.about', 'nav.contacts'],
  );
  assert.equal(items[0]?.href, '/en/');
  assert.equal(items[1]?.href, '/en/projects/');
  assert.equal(items[2]?.href, '/en/resume/');
});

test('section links point to anchors on the home page', () => {
  const items = navItems('ru', { projects: false, resume: false });
  assert.equal(items.at(-1)?.href, '/ru/#contacts');
  assert.equal(items.at(-2)?.href, '/ru/#about');
});

test('pageHref builds a localized page path', () => {
  assert.equal(pageHref('ru', 'projects'), '/ru/projects/');
  assert.equal(pageHref('en', 'resume'), '/en/resume/');
});

test('sectionHref builds a home page anchor', () => {
  assert.equal(sectionHref('en', 'about'), '/en/#about');
  assert.equal(sectionHref('ru', 'contacts'), '/ru/#contacts');
});
