import { test } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { dirname, join, relative } from 'node:path';
import { DEFAULT_LOCALE, LOCALES, LOCALE_TAGS } from '../src/i18n/locales.ts';
import { siteConfig } from '../src/site.config.ts';

const DIST = 'dist';
const SITE_ROOT = `https://${siteConfig.domain}/`;
const INDEX_FILE = 'index.html';
const X_DEFAULT = 'x-default';
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

const allFiles = walk(DIST);

function localePages(locale) {
  const dir = join(DIST, locale);
  assert.ok(existsSync(dir), `${rel(dir)}/ is missing`);
  return walk(dir).filter((file) => file.endsWith(INDEX_FILE));
}

for (const locale of LOCALES) {
  test(`${locale} pages: lang, single h1, hreflang, pair pages`, () => {
    const pages = localePages(locale);
    assert.ok(pages.length > 0, `no ${INDEX_FILE} pages under ${DIST}/${locale}/`);
    for (const file of pages) {
      const html = read(file);
      const name = rel(file);
      assert.match(html, new RegExp(`<html[^>]*\\slang="${locale}"`), `${name}: wrong <html lang>`);
      assert.equal((html.match(/<h1[\s>]/g) ?? []).length, 1, `${name}: expected exactly one <h1>`);
      const pairPath = relative(join(DIST, locale), file);
      const dirPath = relative(join(DIST, locale), dirname(file)).replaceAll('\\', '/');
      const subPath = dirPath === '' ? '/' : `/${dirPath}/`;
      const alternates = html.match(/<link[^>]*rel="alternate"[^>]*>/g) ?? [];
      const hrefFor = (tag) =>
        alternates.find((l) => l.includes(`hreflang="${tag}"`))?.match(/href="([^"]*)"/)?.[1];
      for (const l of LOCALES) {
        const href = hrefFor(LOCALE_TAGS[l]);
        assert.ok(href?.endsWith(`/${l}${subPath}`), `${name}: hreflang ${LOCALE_TAGS[l]} href "${href}" must end with /${l}${subPath}`);
      }
      const root = hrefFor(X_DEFAULT);
      assert.equal(
        root,
        SITE_ROOT,
        `${name}: hreflang x-default href "${root}" must be the production site root`,
      );
      for (const other of LOCALES.filter((l) => l !== locale)) {
        const pair = join(DIST, other, pairPath);
        assert.ok(existsSync(pair), `${name}: missing pair page ${rel(pair)}`);
      }
    }
  });
}

test('no empty href in any built file', () => {
  for (const file of allFiles.filter((f) => MARKUP_FILE.test(f))) {
    assert.ok(!EMPTY_HREF.test(read(file)), `${rel(file)}: contains an empty href`);
  }
});

test('root page: noscript redirect and visible links to every locale', () => {
  const file = join(DIST, INDEX_FILE);
  const html = read(file);
  const noscript = html.match(/<noscript>[\s\S]*?<\/noscript>/)?.[0] ?? '';
  const refresh = `<meta http-equiv="refresh" content="0; url=/${DEFAULT_LOCALE}/">`;
  assert.ok(noscript.includes(refresh), `${rel(file)}: noscript lacks ${refresh}`);
  const visible = html.replace(/<noscript>[\s\S]*?<\/noscript>/g, '');
  for (const locale of LOCALES) {
    assert.match(visible, new RegExp(`<a[^>]*href="/${locale}/"`), `${rel(file)}: no visible link to /${locale}/`);
  }
});

test('language switcher links to the other locale', () => {
  for (const locale of LOCALES) {
    const file = join(DIST, locale, INDEX_FILE);
    const links = read(file).match(/<a [^>]*data-locale-link[^>]*>/g) ?? [];
    for (const other of LOCALES.filter((l) => l !== locale)) {
      const link = links.find((l) => l.includes(`data-locale="${other}"`));
      assert.ok(link, `${rel(file)}: no switcher link for ${other}`);
      assert.match(link, new RegExp(`href="/${other}/"`), `${rel(file)}: switcher for ${other} has wrong href`);
    }
  }
});

test('404 page and robots.txt exist', () => {
  for (const name of ['404.html', 'robots.txt']) {
    assert.ok(existsSync(join(DIST, name)), `${DIST}/${name} is missing`);
  }
});

test('sitemap: no root url and no duplicate hreflang per url', () => {
  const file = join(DIST, 'sitemap-0.xml');
  assert.ok(existsSync(file), `${rel(file)} is missing`);
  const xml = read(file);
  const urls = xml.match(/<url>[\s\S]*?<\/url>/g) ?? [];
  assert.ok(urls.length > 0, `${rel(file)}: no <url> entries`);
  for (const url of urls) {
    const loc = url.match(/<loc>([^<]*)<\/loc>/)?.[1] ?? '';
    assert.ok(!/^https?:\/\/[^/]+\/$/.test(loc), `${rel(file)}: root <loc> ${loc} must be excluded`);
    const langs = [...url.matchAll(/hreflang="([^"]*)"/g)].map((m) => m[1]);
    assert.equal(new Set(langs).size, langs.length, `${loc}: duplicate hreflang in ${langs.join(', ')}`);
  }
});
