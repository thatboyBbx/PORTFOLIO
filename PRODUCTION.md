# Production build and publishing

## Public URL

The portfolio was published through Sites on 5 October 2026. The release build
used its final HTTPS origin as `VITE_SITE_URL`, and public access was enabled.
Builds without `VITE_SITE_URL` deliberately emit
`noindex, follow`, omit canonical URLs and omit the sitemap. This avoids
publishing placeholder URLs or indexing a preview.

Set `VITE_SITE_URL` to your final HTTPS origin in `.env.local` or your hosting
provider's build environment, then rebuild. Use an origin only: no route, query,
credentials or fragment. Do not publish a build made before setting this value.

```
npm ci
npm run lint
npm run build
npm run check:seo
```

Upload only `dist/`, never the source dissertation, personal sample documents,
`dist-ssr/` or this repository's other working files.

The build produces static HTML for home, work, about, experience, contact and all
four project case studies. The browser hydrates that content, while route changes
update the same description, Open Graph, Twitter and canonical metadata. Offline
and missing pages are always noindex. `/projects` URLs canonicalise to `/work`.

## Hosting requirements

Serve each generated route's `index.html` before considering any SPA fallback.
Redirect only the page routes `/projects` to `/work`, and `/projects/:slug` to
`/work/:slug`. Do not redirect `/projects/:slug/case-study.pdf` or diagram assets.
Serve `404.html` with HTTP 404 for unknown URLs; an indiscriminate HTTP
200 fallback would make soft-404s. The preview server is only for local QA.

Cache hashed `/assets/` files immutably. Revalidate HTML, `sw.js`, manifests and
non-hashed public assets on deployment. The build regenerates service-worker
precache revisions after pre-rendering, so HTML revisions match the final output.

## Asset maintenance

`npm run assets` recreates the transparent WebP hero, PB monogram icons,
1200×630 social image and locally hosted font files. The original PNG remains
untouched. Font licence notices are stored alongside the fonts in `public/fonts`.
Asset generation is separate from ordinary builds to keep them fast.

Phones use a smaller 768px transparent hero; desktops retain the full-size
version. The server renderer uses eagerly resolved pages while the browser keeps
lazy route loading, so generated pages do not rely on inline recovery scripts.

## Security and release automation

`config/security-headers.json` is the common policy tested locally. The build
exports it as `dist/_headers`, with an HTTPS-only HSTS policy. Hosts supporting
that format can use it; on other hosts translate it into their native header
configuration. This file is not proof of headers on a deployment: verify the
actual HTTPS responses after choosing a provider. Do not enable HSTS on an
unverified HTTP-only domain.

The policy permits scripts, fonts, images, connections and workers from the same
origin; denies frames, object embeds and form submissions; and prevents MIME
sniffing. Inline styles remain allowed because the current React pages use them.
Inline scripts and eval are not allowed. Add external services deliberately and
update tests/policy if introducing analytics or a contact form.

`npm run check:release` is the release gate. GitHub Actions runs it for pushes and
PRs, using read-only repository permissions and pinned action revisions. It
does not deploy or push code. Automated dependency update PRs are configured for
npm and Actions. The initial `main` release workflow passed on 5 October 2026.

`npm run check:performance` runs three cold, throttled mobile Chrome measurements
for Home and AutoDirect. It checks median LCP <= 2.5s and CLS <= 0.1, and records
raw runs and long-task blocking. These are local lab readings, not Lighthouse
scores, certified accessibility results, field Core Web Vitals or INP. Repeat
on deployment, then measure real-user interactions after launch.

## Release and rollback procedure

1. Run `npm ci`, install the Playwright browser, and run `npm run check:release`
   plus `npm run check:performance`. Review automated and manual checks below.
2. Set the final `VITE_SITE_URL`, rebuild, rerun SEO and browser checks, and retain
   the release commit identifier and complete `dist/` artifact.
3. Publish a preview using the host's static-route, header and cache configuration.
   Check HTTPS, nested refreshes, PDFs, actual HTTP 404s and sharing metadata.
4. Keep the previously verified complete artifact available. Promote only after
   preview checks pass. Do not mix HTML or assets from different releases.
5. To roll back, restore the entire previous artifact through the host's rollback
   mechanism, including its service worker. Revalidate HTML and `sw.js`, verify
   the active worker changes, then check online and offline navigation in a
   returning browser. Never delete user browser storage as the release strategy.
6. When a worker has precached old resources, confirm a normal reload installs
   the replacement and serves the intended content. The local regression test
   simulates a second release and verifies refreshed cached HTML plus offline
   case-study navigation.

## Release checks

The expanded steps 4–5 audit and measured mobile results are recorded in
[RELEASE_VERIFICATION.md](RELEASE_VERIFICATION.md). Run the checked-in release
suite rather than relying on the earlier snapshot below.

The 5 October 2026 Sites deployment (version 5) passed live browser checks for
all nine public pages at desktop, phone and 320px widths, plus direct checks of
the CV PDF, social image, sitemap, robots file, service worker and true 404
responses. A returning browser opened a case study offline. Legacy `/projects`
pages now provide a noindex HTML refresh and visible link to `/work`, while
case-study PDFs remain at their original paths. Sites did not apply the
generated `_headers` or `_redirects` rules, so HTTP 301 redirects and the
specified response headers remain open hosting requirements.

Local verification on 5 October 2026: build and lint passed; all nine public
pages rendered without JavaScript; hydration, metadata updates, navigation and
layouts at 320, 375, 768 and 1280 pixels passed with no browser errors. Both the
unconfigured-domain build and a temporary example-domain build passed SEO checks,
including sitemap generation. The final build is unconfigured and noindex.
The hero is 483,340 bytes, 78% smaller, with the original dimensions and an
identical alpha channel. No external Google Fonts requests remain.

- Verify every public URL and project PDF on the deployed domain, including direct
  loads and refreshes of nested routes.
- Confirm noindex is gone from public pages and canonical / social-image URLs
  use the correct domain. Check `sitemap.xml` and `robots.txt`.
- Check mobile navigation, keyboard focus and the styled 404 page.
- Test sharing previews and run Lighthouse against the deployed production build.
- Dependency advisories reported during the previous hardening pass have been
  patched without forced major upgrades. Audit reports zero known vulnerabilities
  at this verification date; run it on every release rather than relying on that
  historical result.
- Manually check a screen reader and native browser 200% zoom on the eventual
  deployed site. Automated text enlargement and 320px reflow are not substitutes
  for assistive-technology and real-device testing.
