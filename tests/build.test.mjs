import { test } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { join, relative } from 'node:path';
import { LOCALES } from '../src/i18n/locales.ts';
import { CONCEPT_PATH } from '../src/navigation/nav.ts';

const DIST = 'dist';
const INDEX_FILE = 'index.html';
const MARKUP_FILE = /\.(html|xml)$/;
const EMPTY_HREF = /href\s*=\s*(?:"\s*"|'\s*')/;

assert.ok(existsSync(DIST), `${DIST}/ is missing: run npm run build first`);

const read = (file) => readFileSync(file, 'utf8');
const rel = (file) => relative('.', file).replaceAll('\\', '/');

function walk(dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const path = join(dir, entry.name);
    return entry.isDirectory() ? walk(path) : [path];
  });
}

test('no empty href in any built file', () => {
  for (const file of walk(DIST).filter((f) => MARKUP_FILE.test(f))) {
    assert.ok(!EMPTY_HREF.test(read(file)), `${rel(file)}: contains an empty href`);
  }
});

test('root page: under-construction page without a link to the concept, no redirect', () => {
  const file = join(DIST, INDEX_FILE);
  const html = read(file);
  assert.ok(!html.includes(CONCEPT_PATH), `${rel(file)}: must not link to ${CONCEPT_PATH}`);
  assert.ok(!/http-equiv="refresh"/.test(html), `${rel(file)}: the root must not redirect`);
  assert.ok(existsSync(join(DIST, CONCEPT_PATH, INDEX_FILE)), `${DIST}${CONCEPT_PATH}${INDEX_FILE} is missing`);
});

test('the old localized site is not built', () => {
  for (const locale of LOCALES) {
    assert.ok(!existsSync(join(DIST, locale)), `${DIST}/${locale}/ must not exist while the site is under construction`);
  }
});

test('404 page and robots.txt exist, robots keeps the concept out of search', () => {
  for (const name of ['404.html', 'robots.txt']) {
    assert.ok(existsSync(join(DIST, name)), `${DIST}/${name} is missing`);
  }
  assert.match(read(join(DIST, 'robots.txt')), new RegExp(`Disallow: ${CONCEPT_PATH}`));
});
