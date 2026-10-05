// Local production-behaviour test server, not a public hosting service.
import http from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { resolve, sep, extname } from 'node:path';

const root = resolve('dist');
const headers = JSON.parse(await readFile('config/security-headers.json', 'utf8'));
const mime = { '.html': 'text/html; charset=utf-8', '.js': 'application/javascript', '.css': 'text/css', '.pdf': 'application/pdf', '.svg': 'image/svg+xml', '.png': 'image/png', '.webp': 'image/webp', '.woff2': 'font/woff2', '.json': 'application/json', '.webmanifest': 'application/manifest+json', '.xml': 'application/xml', '.txt': 'text/plain' };
let release = 1;
const server = http.createServer(async (request, response) => {
  for (const [key, value] of Object.entries(headers)) response.setHeader(key, value);
  try {
    const pathname = decodeURIComponent(new URL(request.url, 'http://localhost').pathname);
    if (process.env.RELEASE_TEST_MODE === '1' && pathname === '/__test/release' && request.method === 'POST') {
      release++;
      response.end(String(release));
      return;
    }
    if (!['GET', 'HEAD'].includes(request.method)) { response.writeHead(405); response.end(); return; }
    // Never redirect /projects/<slug>/<asset> (case-study PDFs and diagrams).
    if (/^\/projects(?:\/[^/.]+)?\/?$/.test(pathname)) {
      response.writeHead(301, { Location: pathname.replace(/^\/projects/, '/work') }); response.end(); return;
    }
    let target = resolve(root, `.${pathname}`);
    if (target !== root && !target.startsWith(root + sep)) { response.writeHead(403); response.end(); return; }
    let status = 200;
    try {
      const info = await stat(target);
      if (info.isDirectory()) target = resolve(target, 'index.html');
      await stat(target);
    } catch { target = resolve(root, '404.html'); status = 404; }
    if (pathname === '/404' || pathname === '/404/' || pathname === '/404.html') status = 404;
    let body = await readFile(target);
    if (process.env.RELEASE_TEST_MODE === '1') {
      if (extname(target) === '.html') body = Buffer.from(body.toString().replace('</head>', `<meta name="test-release" content="${release}"></head>`));
      if (pathname === '/sw.js' && release > 1) body = Buffer.from(body.toString().replace(/revision:"([^"]+)"/g, `revision:"release-${release}-$1"`));
    }
    response.writeHead(status, {
      'Content-Type': mime[extname(target)] ?? 'application/octet-stream',
      'Cache-Control': pathname.startsWith('/assets/') ? 'public, max-age=31536000, immutable' : 'no-cache',
    });
    response.end(request.method === 'HEAD' ? undefined : body);
  } catch { response.writeHead(400); response.end('Bad request'); }
});
server.listen(Number(process.env.PORT ?? 4180), '127.0.0.1', () => console.log('Built-site test server ready'));
