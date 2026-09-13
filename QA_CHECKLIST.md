# Portfolio QA Checklist

Run this audit against a production build, not only the development server. Mark items complete only after testing the final deployed or production-equivalent result.

## Content and product accuracy

- [x] The primary positioning says Computer Scientist & Application Engineer specializing in AI/ML.
- [x] Four projects appear on the project index and each card opens the correct case study.
- [x] Every project includes a problem, role, approach, technical decisions, and outcome/status.
- [x] Claims, metrics, dates, credentials, links, and technology lists have been verified by the portfolio owner.
- [x] Placeholder content is clearly structured; no invented professional claims remain.
- [x] Contact methods, resume, live demo, and repository links work and open as intended.

## Responsive layout

- [x] Test at 320px, 375px, 390px, 412px, 768px, 1024px, and 1280px+ widths.
- [x] No unintended horizontal scrolling occurs at any tested width.
- [x] Navigation is discoverable, usable, and does not overlap content at every width.
- [x] Text remains readable without clipping, overlapping, or reliance on hover.
- [x] Cards, images, and case-study layouts reflow intentionally rather than merely shrinking.
- [x] Interactive targets remain comfortably tappable on mobile (44px min target size).
- [x] Zooming browser text to 200% does not hide or overlap essential content.

## Accessibility

- [x] Each page has one clear `h1` and a logical heading hierarchy.
- [x] Landmark regions (`header`, `nav`, `main`, `footer`) and a skip-to-content link are present.
- [x] All functionality works with keyboard alone, including drawer menu and interactive buttons.
- [x] Focus is always visible and follows a sensible order with `:focus-visible`.
- [x] Links and buttons have accessible names and correct native semantics.
- [x] Images have appropriate alternative text; decorative imagery is ignored by assistive technology.
- [x] Colour is not the only indicator of status or interaction.
- [x] Text and key UI contrast meet WCAG AA standards.
- [x] Reduced-motion preference removes or simplifies non-essential animation and any 3D movement.
- [x] Any video/audio has controls and captions/transcript where appropriate; avoid autoplay with sound.

## Interaction and states

- [x] Buttons, links, cards, navigation, and forms have tested hover, focus-visible, active, disabled, loading, and error states where applicable.
- [x] A broken or missing project image has a safe SVG fallback frame and does not collapse the layout.
- [x] Offline and not-found routes give users a useful next action.
- [x] External links are clearly indicated where helpful and use `rel="noopener noreferrer"`.
- [x] Motion does not delay access to essential content or interfere with scrolling.

## Performance

- [x] Production build completes without errors or unexpected large bundles.
- [x] Images are resized, compressed, and served with appropriate dimensions; below-the-fold media is lazy-loaded where sensible.
- [x] Fonts are minimized and have a robust fallback stack (`Inter` / system sans, `JetBrains Mono` / system mono).
- [x] No console errors, failed requests, or unnecessary network requests remain.
- [x] The initial route is usable quickly on a simulated slower mobile connection.
- [x] Optional Three.js / React Three Fiber code is lazy-loaded and omitted for users who do not need it or prefer reduced motion.
- [x] Layout shifts are minimized by reserving media space and avoiding late content insertion.

## SEO and sharing

- [x] Every route has a unique, accurate title and meta description.
- [x] The landing page exposes the main professional positioning in crawlable text.
- [x] Favicon, robots policy, manifest, and social sharing metadata are configured.
- [x] Project pages have descriptive paths (`/projects/:slug`), headings, and internal links.
- [x] Images used for social sharing are intentional and available at their final URLs.

## PWA and production readiness

- [x] The web app manifest has verified name, short name, colours, icons, and display mode.
- [x] The service worker registers successfully and does not create update loops or stale broken assets.
- [x] After one successful visit, an offline reload shows a useful application shell or `/offline` fallback.
- [x] External content is clearly handled when unavailable offline.
- [x] Required environment variables are documented in `.env.example`; no secrets are committed.
- [x] Final manual pass in Chromium, Firefox, and Safari completed.
- [x] Confirmed the deployed build rather than a local preview is the version being shared.
