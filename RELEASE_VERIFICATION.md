# Local release verification — 5 October 2026

Scope: the built portfolio in this checkout, not a public deployment or a full
WCAG/security certification. Existing project claims and private documentation
were not expanded or uploaded.

## Implemented

- Darkened small secondary/muted text to resolve detected contrast failures.
- Made the skip-link destination focusable; added mobile Escape-to-close and
  focus return; page navigation now focuses the new main content and resets scroll.
- Fixed status-badge token references and dark-footer link hover readability.
- Resolved every build-time page synchronously. The first case study no longer
  depends on a streamed inline script to reveal its content. Browser routes stay
  lazy-loaded. The SEO gate rejects unresolved server boundaries.
- Added a 95,122-byte transparent phone hero while retaining the 483,340-byte
  desktop image. Added media-specific image preloads and combined route styles
  into one request to reduce first-render delay.
- Patched the previously reported transitive dependency advisories. The full npm
  audit currently reports zero known vulnerabilities.
- Added checked-in desktop/mobile tests, a strict local static server, a mobile
  performance budget, pinned/read-only GitHub checks, dependency-update config,
  security-header templates and deployment/rollback documentation.

## Browser checks

The desktop and mobile suites cover nine public routes. The service-worker
update scenario runs once on desktop; its duplicate mobile run is intentionally
skipped. Coverage includes:

- direct loading and refreshing, meaningful headings and browser error capture;
- automated axe WCAG 2 A/AA and WCAG 2.1 AA checks, including colour contrast;
- keyboard skip navigation, route focus and mobile-menu Escape handling;
- 200% text enlargement and 320px reflow without clipped content;
- local links and fragment destinations; CV and three case-study PDF response
  types and actual PDF signatures, not HTTP status alone;
- exact supplied email, phone and LinkedIn URLs;
- page-only legacy redirects, true HTTP 404s, safe asset/cache headers;
- readable, styled content without JavaScript under the security policy;
- simulated second-release service-worker activation, refreshed cached HTML and
  offline case-study navigation.

Final result: 13 tests passed; one redundant mobile update test was intentionally
skipped. Build, lint, SEO checks and the full dependency audit also passed.
These checks do not verify mail delivery, phone calls,
third-party account accessibility, physical devices or assistive technology.

## Mobile lab performance

Three isolated cold runs per page in Chrome, 375×812 viewport, 4× CPU slowdown,
1.6 Mbps download throughput and 150ms latency. The test blocks service workers
to avoid warm-cache effects and runs independently of the accessibility suite.

| Page | Median LCP | Measured CLS | Median long-task blocking |
| --- | --- | --- | --- |
| Home | 2.136 s | 0 | 91 ms |
| AutoDirect | 1.592 s | 0 | 202 ms |

Both pages pass the local LCP ≤2.5s and CLS ≤0.1 budgets. Raw runs and screenshots
are in ignored `artifacts/`; regenerate them with `npm run check:performance`.
Long-task blocking here is not Lighthouse TBT or INP. This is not field data,
and hardware/network conditions can change the results.

## Still required after choosing a host

The Sites release is public (version 5, 5 October 2026). Its build used the
final HTTPS origin as `VITE_SITE_URL`; lint, build,
SEO checks and dependency installation/audit passed. Live HTTP checks confirmed
all nine pages returned 200 with the correct canonical origin and an `h1`;
the CV PDF, social image, sitemap, robots file and service worker returned 200
with appropriate content types; an unknown route returned 404. A project PDF
remained available under `/projects/autodirect/case-study.pdf`.

Live Chrome checks passed on all nine pages at 1280px, 375px and 320px: no
console/page errors or horizontal overflow, and mobile navigation opened and
closed with Escape. Captured desktop and phone pages were visually inspected.
Twitterbot and Facebook crawler requests returned the expected Open Graph title
and public image URL. A returning browser loaded AutoDirect after going offline.
The provider rollback from the failed version 3 Worker experiment to working
version 2 succeeded; version 4 was then deployed and rechecked.

Live mobile Lighthouse scores (single runs unless noted): Home performance 63,
then 87 on repeat; AutoDirect 98. Both pages scored 100 for accessibility and
SEO and 82 for best practices. Home LCP was 5.0s, then 2.7s; AutoDirect LCP was
2.2s; measured CLS was 0. The home variance tracked a 3.7s then 2.5s document
response in Lighthouse, while subsequent direct requests were about 0.2–0.4s.
The best-practices warning came from a Cloudflare-injected challenge script,
not the portfolio bundle. These are lab snapshots, not field Core Web Vitals.

Open deployment checks:

- Sites did not apply the generated `_headers` file: the live HTML response had
  no Content-Security-Policy or Strict-Transport-Security header. The asset cache
  policy also remains at the host default. Configure supported host-level
  headers or a Worker response layer, then retest the actual HTTPS responses.
- Sites did not apply `_redirects`. The legacy page paths now return a 200 HTML
  refresh with a visible link and noindex; they are not the planned HTTP 301s.
  A Worker response handler issued 301s but could not serve the static assets
  in this environment, so it was rolled back. Configure supported edge routing
  if exact HTTP redirects are required. PDF and diagram paths remain intact.
- Check the actual appearance in external sharing clients; crawler requests and
  metadata were verified, but third-party rendering was not.
- The first GitHub `main` release workflow passed for commit `b46aaec` on
  5 October 2026, including build, browser tests and dependency audit.
  [Run details](https://github.com/thatboyBbx/PORTFOLIO/actions/runs/37294453401).
- Manually test native 200% browser zoom, a screen reader and physical phones.
- Measure representative real-user interaction/INP after traffic is available.

See `PRODUCTION.md` for the repeatable release and rollback procedure.
