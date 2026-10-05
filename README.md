# Panashe Bobojani — portfolio

A React / TypeScript / Vite portfolio for application development, workflow
automation and AI/ML. The restrained blue-grey theme is shared across the home
page, project gallery, about, experience, contact and technical case studies.

## Local development

Use Node 22.12+ or Node 24 LTS (the release workflow uses Node 24).

```
npm ci
npm run dev
```

## Production verification

```
npx playwright install chromium
npm run check:release
npm run check:performance
```

`check:release` runs lint, TypeScript compilation, the static production build,
SEO checks, desktop/mobile browser tests and the full dependency audit. Tests
start and stop their own strict static server on port 4180; they never use the
development preview. Performance checks use port 4181 and write lab results to
`artifacts/performance-summary.json`.

To use an existing Chrome install on Windows instead of Playwright's browser:

```powershell
$env:PLAYWRIGHT_CHROME_PATH = 'C:\Program Files\Google\Chrome\Application\chrome.exe'
npm run check:release
```

Browser checks cover all public pages, automated WCAG A/AA checks, keyboard
navigation, mobile menu closing/focus, 200% text size, 320px reflow, direct links,
real PDF response signatures, aliases, missing routes, static HTML without
JavaScript, security/cache headers and a simulated service-worker release.
Automation supplements, but does not replace, manual assistive-technology QA.
External profile links are checked against supplied contact data, not treated
as proof that third-party accounts are publicly accessible.

## Content and assets

- `src/content/profile.ts`: identity, education and shared contact information.
- `src/content/projects.ts`, `docudigit.ts` and `spare.ts`: case-study content and evidence.
- `src/content/seo.ts`: titles, descriptions, canonical URLs and sharing metadata.
- `public/projects/`: original diagrams and condensed case-study PDFs; not full
  private project documentation.
- `npm run assets`: regenerate the transparent hero variants, icons, fonts and
  social-preview card. The original hero PNG is preserved.

## Publishing and rollback

See [PRODUCTION.md](PRODUCTION.md) for the public URL setting, host requirements,
security-header policy, release checks and rollback procedure. Publish `dist/`
only. No backend, user authentication, CMS, analytics or contact-form service
is required for this portfolio.

The GitHub workflow runs checks when pushed or opened as a PR. It does not deploy.
Dependency update PRs are configured weekly; review them instead of using forced
major-version audit fixes.
