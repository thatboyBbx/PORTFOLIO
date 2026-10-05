import sharp from 'sharp';
import { mkdir, copyFile, writeFile, stat } from 'node:fs/promises';

await mkdir('public/fonts', { recursive: true });
await mkdir('public/social', { recursive: true });
const fontFiles = [
  ['inter', 'inter-latin-wght-normal.woff2', 'inter-latin.woff2'],
  ['fraunces', 'fraunces-latin-opsz-normal.woff2', 'fraunces-latin.woff2'],
  ['fraunces', 'fraunces-latin-opsz-italic.woff2', 'fraunces-latin-italic.woff2'],
];
for (const [family, source, output] of fontFiles) {
  await copyFile(`node_modules/@fontsource-variable/${family}/files/${source}`, `public/fonts/${output}`);
}
for (const family of ['inter', 'fraunces']) {
  await copyFile(`node_modules/@fontsource-variable/${family}/LICENSE`, `public/fonts/${family}-LICENSE.txt`);
}
const hero = 'src/assets/hero-brutalist-systems-v2';
await sharp(`${hero}.png`).webp({ quality: 84, alphaQuality: 100, effort: 6 }).toFile(`${hero}.webp`);
await sharp(`${hero}.png`).resize({ width: 768 }).webp({ quality: 70, alphaQuality: 100, effort: 6 }).toFile(`${hero}-mobile.webp`);
const original = await stat(`${hero}.png`);
const optimised = await stat(`${hero}.webp`);
console.log(`Hero: ${original.size} → ${optimised.size} bytes (${Math.round(100 * (1 - optimised.size / original.size))}% smaller)`);

// Original vector monogram, with safe margins for maskable app icons.
const icon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><rect width="512" height="512" rx="100" fill="#E9EDF3"/><path fill="#3D5A80" fill-rule="evenodd" d="M110 365V147h87c53 0 82 27 82 71s-29 72-82 72h-39v75zm48-122h36c24 0 36-8 36-25s-12-25-36-25h-36z"/><path fill="#1A1A1E" fill-rule="evenodd" d="M295 147h55c47 0 75 21 75 57 0 21-10 36-25 44 23 9 36 26 36 51 0 42-31 66-79 66h-62zm45 44v40h10c20 0 29-6 29-20s-9-20-29-20zm0 81v49h16c22 0 34-8 34-25 0-16-12-24-34-24z"/></svg>`;
await writeFile('public/favicon.svg', icon);
await writeFile('public/pwa-icon.svg', icon);
for (const [size, name] of [[180, 'apple-touch-icon'], [192, 'pwa-192'], [512, 'pwa-512']]) {
  await sharp(Buffer.from(icon)).resize(size, size).png().toFile(`public/${name}.png`);
}
const card = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630"><rect width="1200" height="630" fill="#E9EDF3"/><rect x="72" y="76" width="56" height="6" fill="#3D5A80"/><text x="72" y="144" font-family="Arial,sans-serif" font-size="22" letter-spacing="3" fill="#3D5A80">APPLICATION DEVELOPMENT · WORKFLOW AUTOMATION · AI/ML</text><text x="72" y="284" font-family="Georgia,serif" font-size="78" fill="#1A1A1E">Panashe Bobojani</text><text x="72" y="362" font-family="Georgia,serif" font-size="48" fill="#1A1A1E">Software systems. Real problems.</text><path d="M72 450H1128" stroke="#C5CDD8"/><text x="72" y="512" font-family="Arial,sans-serif" font-size="25" fill="#6B7280">AI &amp; Machine Learning graduate · Harare, Zimbabwe</text><text x="72" y="557" font-family="Arial,sans-serif" font-size="22" fill="#3D5A80">Selected work, technical decisions and practical outcomes.</text></svg>`;
await sharp(Buffer.from(card)).png().toFile('public/social/portfolio.png');
