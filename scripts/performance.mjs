// Repeatable Chrome lab measurements, not real-user Core Web Vitals.
import { chromium } from '@playwright/test';
import { mkdir, writeFile } from 'node:fs/promises';
import { spawn } from 'node:child_process';
import assert from 'node:assert/strict';
const server = spawn(process.execPath, ['scripts/serve-built.mjs'], { env: { ...process.env, PORT: '4181' }, stdio: 'pipe' });
let browser;
try {
  await new Promise((resolve, reject) => { server.stdout.once('data', resolve); server.once('error', reject); server.once('exit', code => reject(new Error(`Test server exited: ${code}`))); });
  browser = await chromium.launch({ executablePath: process.env.PLAYWRIGHT_CHROME_PATH, headless: true });
  await mkdir('artifacts', { recursive: true });
  const results = [];
  for (const path of ['/', '/work/autodirect']) {
    const runs = [];
    for (let attempt = 0; attempt < 3; attempt++) {
      const context = await browser.newContext({ viewport: { width: 375, height: 812 }, isMobile: true, deviceScaleFactor: 1, reducedMotion: 'reduce', serviceWorkers: 'block' });
      try {
        const page = await context.newPage();
        const session = await context.newCDPSession(page);
        await session.send('Emulation.setCPUThrottlingRate', { rate: 4 });
        await session.send('Network.enable');
        await session.send('Network.emulateNetworkConditions', { offline: false, latency: 150, downloadThroughput: 1600000 / 8, uploadThroughput: 750000 / 8 });
        await page.addInitScript(() => {
          const metrics = { lcp: 0, cls: 0, blocking: 0 };
          Object.assign(window, { labMetrics: metrics });
          new PerformanceObserver(list => { for (const entry of list.getEntries()) metrics.lcp = entry.startTime; }).observe({ type: 'largest-contentful-paint', buffered: true });
          new PerformanceObserver(list => { for (const entry of list.getEntries()) if (!entry.hadRecentInput) metrics.cls += entry.value; }).observe({ type: 'layout-shift', buffered: true });
          new PerformanceObserver(list => { for (const entry of list.getEntries()) metrics.blocking += Math.max(0, entry.duration - 50); }).observe({ type: 'longtask', buffered: true });
        });
        await page.goto(`http://127.0.0.1:4181${path}`);
        await page.waitForLoadState('networkidle');
        await page.evaluate(() => document.fonts.ready);
        await page.waitForTimeout(1500);
        const metrics = await page.evaluate(() => window.labMetrics);
        if (attempt === 0) await page.screenshot({ path: `artifacts/${path === '/' ? 'home' : 'autodirect'}-mobile.png` });
        await page.getByRole('button', { name: 'Open Navigation Menu' }).click();
        await page.getByRole('navigation', { name: 'Mobile Navigation', exact: true }).waitFor();
        runs.push({ LCP_ms: Math.round(metrics.lcp), CLS: metrics.cls, longTaskBlocking_ms: Math.round(metrics.blocking) });
      } finally { await context.close(); }
    }
    const median = key => runs.map(run => run[key]).sort((a, b) => a - b)[1];
    results.push({ path, runs, median: { LCP_ms: median('LCP_ms'), CLS: median('CLS'), longTaskBlocking_ms: median('longTaskBlocking_ms') } });
  }
  await mkdir('artifacts', { recursive: true });
  await writeFile('artifacts/performance-summary.json', JSON.stringify({ conditions: '375px mobile viewport, 4x CPU slowdown, 1.6 Mbps down, 150ms latency, cold isolated contexts, three runs per route. Long-task blocking is not Lighthouse TBT. INP needs representative interactions and real-user measurement after launch.', results }, null, 2));
  console.log(JSON.stringify(results, null, 2));
  for (const result of results) {
    assert.ok(result.median.LCP_ms > 0 && result.median.LCP_ms <= 2500, `${result.path}: median lab LCP exceeds 2.5s`);
    assert.ok(result.median.CLS <= 0.1, `${result.path}: median lab CLS exceeds 0.1`);
  }
} finally { await browser?.close(); server.kill(); }
