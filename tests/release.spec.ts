import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const routes = ['/', '/work', '/about', '/experience', '/contact', '/work/insureintel', '/work/autodirect', '/work/docudigit', '/work/spare'];

test('all routes load, refresh, and pass automated accessibility checks', async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', error => errors.push(error.message));
  page.on('console', message => { if (message.type() === 'error') errors.push(message.text()); });
  for (const route of routes) {
    expect((await page.goto(route))?.status()).toBe(200);
    await page.waitForLoadState('networkidle');
    await expect(page.locator('main h1')).toBeVisible();
    expect(await page.locator('h1').count()).toBe(1);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    const scan = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze();
    expect(scan.violations.map(item => ({ id: item.id, nodes: item.nodes.map(node => node.target) })), route).toEqual([]);
    await page.reload();
    await expect(page.locator('main h1')).toBeVisible();
  }
  expect(errors).toEqual([]);
});

test('links, documents, contact actions, aliases and true 404 responses', async ({ page, request }) => {
  const checked = new Set<string>();
  for (const route of routes) {
    await page.goto(route);
    await page.waitForLoadState('networkidle');
    for (const href of await page.locator('a[href]').evaluateAll(elements => elements.map(element => element.getAttribute('href')!))) {
      if (href.startsWith('#')) { expect(await page.locator(`[id="${href.slice(1)}"]`).count()).toBe(1); continue; }
      if (!href.startsWith('/') || checked.has(href)) continue;
      checked.add(href);
      const response = await request.get(href);
      expect(response.status(), href).toBe(200);
      if (href.endsWith('.pdf')) {
        expect(response.headers()['content-type']).toContain('application/pdf');
        expect((await response.body()).subarray(0, 5).toString()).toBe('%PDF-');
      }
    }
  }
  await page.goto('/contact');
  await expect(page.locator('main a[href^="mailto:"]')).toHaveAttribute('href', 'mailto:panasheshaunbobojani@gmail.com');
  await expect(page.locator('main a[href^="tel:"]')).toHaveAttribute('href', 'tel:+263780696934');
  await expect(page.locator('main a[href*="linkedin.com"]')).toHaveAttribute('href', 'https://www.linkedin.com/in/panashe-bobojani-434064303/');
  const alias = await request.get('/projects/autodirect', { maxRedirects: 0 });
  expect(alias.status()).toBe(301); expect(alias.headers().location).toBe('/work/autodirect');
  // Service worker app-shell fallback is tested separately; status checks use HTTP directly.
  expect((await request.get('/not-a-real-page')).status()).toBe(404);
  expect((await request.get('/missing.pdf')).status()).toBe(404);
  await page.goto('/404');
  await expect(page.getByRole('heading', { name: '404 — Page Not Found' })).toBeVisible();
  await page.getByRole('link', { name: 'Return home' }).click();
  await expect(page.locator('#hero-title')).toBeVisible();
});

test('keyboard skip link, mobile menu, Escape and route focus', async ({ page, isMobile }) => {
  await page.goto('/'); await page.waitForLoadState('networkidle');
  await page.keyboard.press('Tab');
  await expect(page.getByRole('link', { name: 'Skip to main content' })).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(page.locator('main')).toBeFocused();
  if (isMobile) {
    const toggle = page.getByRole('button', { name: 'Open Navigation Menu' });
    await toggle.click();
    await expect(page.getByRole('navigation', { name: 'Mobile Navigation', exact: true })).toBeVisible();
    await page.keyboard.press('Escape');
    await expect(toggle).toBeFocused();
    await expect(toggle).toHaveAttribute('aria-expanded', 'false');
    await toggle.click();
    await page.getByRole('navigation', { name: 'Mobile Navigation', exact: true }).getByRole('link', { name: 'About', exact: true }).click();
  } else {
    await page.getByRole('navigation', { name: 'Main Navigation', exact: true }).getByRole('link', { name: 'About', exact: true }).click();
  }
  await expect(page).toHaveTitle('About | Panashe Bobojani');
  await expect(page.locator('main')).toBeFocused();
  await expect(page.locator('meta[property="og:title"]')).toHaveAttribute('content', 'About | Panashe Bobojani');
});

test('200% text size and 320px reflow without clipped content', async ({ page }) => {
  await page.setViewportSize({ width: 640, height: 900 });
  for (const route of routes) {
    await page.goto(route); await page.waitForLoadState('networkidle');
    await page.addStyleTag({ content: 'html { font-size: 200% !important; }' });
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), route).toBe(true);
    const clipped = await page.locator('main h1, main p, main a').evaluateAll(elements => elements.filter(element => {
      const rect = element.getBoundingClientRect();
      return rect.width > 0 && (rect.right > innerWidth + 1 || rect.left < -1);
    }).map(element => element.textContent?.slice(0, 70)));
    expect(clipped, route).toEqual([]);
    await page.setViewportSize({ width: 320, height: 800 });
    await page.evaluate(() => document.documentElement.style.fontSize = '16px');
    // Fresh navigation removes the injected 200% stylesheet.
    await page.reload(); await page.waitForLoadState('networkidle');
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), route).toBe(true);
    await page.setViewportSize({ width: 640, height: 900 });
  }
});

test('readable pages without JavaScript', async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  try {
    const page = await context.newPage();
    for (const route of routes) {
      await page.goto(`http://127.0.0.1:4180${route}`);
      await expect(page.locator('main h1')).toBeVisible();
      await expect(page.locator('meta[property="og:title"]')).toHaveAttribute('content', await page.title());
    }
  } finally { await context.close(); }
});

test('security headers and cache policy', async ({ request }) => {
  const response = await request.get('/');
  expect(response.headers()['content-security-policy']).toContain("script-src 'self'");
  expect(response.headers()['x-content-type-options']).toBe('nosniff');
  expect(response.headers()['x-frame-options']).toBe('DENY');
  expect(response.headers()['cache-control']).toBe('no-cache');
  expect((await request.get('/sw.js')).headers()['cache-control']).toBe('no-cache');
  const entry = (await response.text()).match(/src="(\/assets\/[^"]+\.js)"/);
  expect(entry).not.toBeNull();
  expect((await request.get(entry![1])).headers()['cache-control']).toContain('immutable');
  for (const [path, type] of [['/favicon.svg', 'image/svg+xml'], ['/pwa-192.png', 'image/png'], ['/fonts/inter-latin.woff2', 'font/woff2'], ['/social/portfolio.png', 'image/png']]) {
    const asset = await request.get(path);
    expect(asset.status(), path).toBe(200);
    expect(asset.headers()['content-type']).toContain(type);
  }
});

test('service-worker update refreshes cached content and supports offline routes', async ({ browser, request }, testInfo) => {
  test.skip(testInfo.project.name !== 'desktop', 'One isolated update scenario is sufficient.');
  const context = await browser.newContext();
  try {
    const page = await context.newPage();
    await page.goto('http://127.0.0.1:4180/');
    await page.evaluate(async () => { await navigator.serviceWorker.ready; });
    await page.waitForFunction(() => !!navigator.serviceWorker.controller);
    const initial = await page.locator('meta[name="test-release"]').getAttribute('content');
    await request.post('/__test/release');
    await page.evaluate(async () => { const registration = await navigator.serviceWorker.ready; await registration.update(); });
    await expect(async () => {
      await page.reload();
      expect(await page.locator('meta[name="test-release"]').getAttribute('content')).not.toBe(initial);
    }).toPass({ timeout: 30000 });
    await context.setOffline(true);
    await page.goto('http://127.0.0.1:4180/work/autodirect');
    await expect(page.getByRole('heading', { level: 1, name: 'AutoDirect' })).toBeVisible();
  } finally { await context.close(); }
});
