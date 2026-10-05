import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { resolve, dirname } from 'node:path';
import { generateSW } from 'workbox-build';
import { createHash } from 'node:crypto';
import { render, publicRoutes, getMetadata, metadataTags, siteUrl } from '../dist-ssr/entry-server.js';

const escape = value => value.replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]);
const template = await readFile('dist/index.html', 'utf8');
const securityHeaders = JSON.parse(await readFile('config/security-headers.json', 'utf8'));
await writeFile('dist/_headers', `/*\n${Object.entries(securityHeaders).map(([key, value]) => `  ${key}: ${value}`).join('\n')}\n  Strict-Transport-Security: max-age=31536000\n\n/assets/*\n  Cache-Control: public, max-age=31536000, immutable\n\n/*.html\n  Cache-Control: no-cache\n\n/sw.js\n  Cache-Control: no-cache\n\n/manifest.webmanifest\n  Cache-Control: no-cache\n`);
await writeFile('dist/_redirects', ['/projects /work 301',
  '/projects/insureintel /work/insureintel 301',
  '/projects/autodirect /work/autodirect 301',
  '/projects/docudigit /work/docudigit 301',
  '/projects/spare /work/spare 301',
  ''].join('\n'));
const manifest = JSON.parse(await readFile('dist/.vite/manifest.json', 'utf8'));
// One extra route stylesheet instead of ten render-blocking network requests.
const routeStyles = [...new Set(Object.values(manifest).flatMap(entry => entry.css ?? []))]
  .filter(file => !template.includes(`/${file}`));
const routeCss = (await Promise.all(routeStyles.map(file => readFile(`dist/${file}`, 'utf8')))).join('\n');
const stylePath = `assets/routes-${createHash('sha256').update(routeCss).digest('hex').slice(0, 12)}.css`;
await writeFile(`dist/${stylePath}`, routeCss);
const styles = `<link rel="stylesheet" href="/${stylePath}">`;

for (const path of [...publicRoutes, '/offline', '/404']) {
  const meta = getMetadata(path);
  const heroPreloads = path === '/' ? [
    ['src/assets/hero-brutalist-systems-v2-mobile.webp', '(max-width: 767px)'],
    ['src/assets/hero-brutalist-systems-v2.webp', '(min-width: 768px)'],
  ].map(([asset, media]) => `<link rel="preload" as="image" fetchpriority="high" media="${media}" href="/${manifest[asset].file}">`).join('\n') : '';
  const tags = `<title>${escape(meta.title)}</title>\n` + metadataTags(meta)
    .map(([attribute, key, value]) => `<meta data-seo ${attribute}="${escape(key)}" content="${escape(value)}">`).join('\n')
    + (meta.canonical ? `\n<link data-seo rel="canonical" href="${escape(meta.canonical)}">` : '');
  const html = template.replace(/<title>[\s\S]*?<\/title>/, '').replace(/<meta\s+name="description"[\s\S]*?\/>/, '')
    .replace('<script type="module"', `${heroPreloads}\n<script type="module"`)
    .replace('</head>', `${tags}\n${styles}\n</head>`)
    .replace('<div id="root"></div>', `<div id="root" data-route="${path}">${await render(path)}</div>`);
  const destination = resolve('dist', path === '/' ? 'index.html' : `${path.slice(1)}/index.html`);
  await mkdir(dirname(destination), { recursive: true });
  await writeFile(destination, html);
  if (path === '/404') await writeFile('dist/404.html', html);
}

// Keep legacy page links usable on static hosts that do not honor _redirects.
for (const slug of ['', 'insureintel', 'autodirect', 'docudigit', 'spare']) {
  const target = `/work${slug ? `/${slug}` : ''}`;
  const canonical = siteUrl ? `<link rel="canonical" href="${escape(`${siteUrl}${target}`)}">` : '';
  const html = `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="robots" content="noindex, follow"><meta http-equiv="refresh" content="0;url=${target}">${canonical}<title>Portfolio page moved</title></head><body><main><h1>Portfolio page moved</h1><p><a href="${target}">Continue to the current page</a></p></main></body></html>`;
  const destination = resolve('dist', 'projects', slug, 'index.html');
  await mkdir(dirname(destination), { recursive: true });
  await writeFile(destination, html);
}

if (siteUrl) {
  await writeFile('dist/sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${publicRoutes.map(path => `<url><loc>${escape(`${siteUrl}${path}`)}</loc></url>`).join('')}</urlset>`);
  await writeFile('dist/robots.txt', `User-agent: *\nAllow: /\nSitemap: ${siteUrl}/sitemap.xml\n`);
} else {
  await writeFile('dist/robots.txt', 'User-agent: *\nAllow: /\n# Public URL not configured. HTML pages are noindex.\n');
  console.warn('VITE_SITE_URL is unset: noindex enabled; canonical URLs and sitemap omitted.');
}

// Refresh precache revisions AFTER HTML generation, not before it.
const result = await generateSW({
  globDirectory: 'dist', globPatterns: ['**/*.{js,css,html,svg,png,webp,woff2,ico,txt,pdf}'],
  globIgnores: ['sw.js', 'workbox-*.js', '404.html', '404/**', '.vite/**'],
  swDest: 'dist/sw.js', navigateFallback: '/index.html',
  navigateFallbackDenylist: [/^\/404(?:\/|$)/, /\.[^/]+$/],
  skipWaiting: true, clientsClaim: true, cleanupOutdatedCaches: true,
});
for (const warning of result.warnings) console.warn(warning);
console.log(`Pre-rendered ${publicRoutes.length} public routes, offline and 404 pages. Precached ${result.count} files.`);
