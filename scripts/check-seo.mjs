import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { getMetadata, publicRoutes, metadataTags, siteUrl } from '../dist-ssr/entry-server.js';

for (const route of publicRoutes) {
  const meta = getMetadata(route);
  const html = await readFile(`dist/${route === '/' ? '' : `${route.slice(1)}/`}index.html`, 'utf8');
  assert.match(html, /<h1[ >]/, `${route}: missing static heading`);
  assert.match(html, /<!--\$-->/, `${route}: missing resolved hydration boundary`);
  assert.ok(!html.includes('<!--$?-->'), `${route}: unresolved server content requires JavaScript`);
  assert.match(html, /property="og:title"/);
  assert.match(html, /name="twitter:card" content="summary_large_image"/);
  assert.equal(meta.robots, siteUrl ? 'index, follow' : 'noindex, follow');
  assert.equal(metadataTags(meta).filter(([, name]) => name === 'description').length, 1);
  if (siteUrl) {
    assert.ok(meta.canonical.startsWith(`${siteUrl}/`));
    assert.ok(html.includes(`href="${meta.canonical}"`));
    assert.equal(meta.image, `${siteUrl}/social/portfolio.png`);
  } else {
    assert.equal(meta.canonical, '');
    assert.ok(!html.includes('rel="canonical"'));
  }
}
assert.equal(getMetadata('/projects/autodirect').canonical, getMetadata('/work/autodirect').canonical);
assert.equal(getMetadata('/not-a-page').robots, 'noindex, follow');
assert.equal(getMetadata('/offline').robots, 'noindex, follow');
assert.equal(getMetadata('/404').canonical, '');
if (siteUrl) {
  const sitemap = await readFile('dist/sitemap.xml', 'utf8');
  assert.equal((sitemap.match(/<loc>/g) ?? []).length, publicRoutes.length);
  assert.ok(!sitemap.includes('/404'));
  assert.ok(!sitemap.includes('/projects/'));
  assert.ok((await readFile('dist/robots.txt', 'utf8')).includes(`${siteUrl}/sitemap.xml`));
}
console.log(`SEO checks passed for ${publicRoutes.length} pre-rendered routes (${siteUrl || 'unconfigured domain'}).`);
