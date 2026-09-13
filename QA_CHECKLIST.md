# Portfolio QA Checklist

Run this audit against a production build, not only the development server. Mark items complete only after testing the final deployed or production-equivalent result.

## Content and product accuracy

- [ ] The primary positioning says Computer Scientist & Application Engineer specializing in AI/ML.
- [ ] Four projects appear on the project index and each card opens the correct case study.
- [ ] Every project includes a problem, role, approach, technical decisions, and outcome/status.
- [ ] Claims, metrics, dates, credentials, links, and technology lists have been verified by the portfolio owner.
- [ ] Placeholder content is either replaced or visibly marked; no invented professional claims remain.
- [ ] Contact methods, resume, live demo, and repository links work and open as intended.

## Responsive layout

- [ ] Test at 320px, 375px, 390px, 412px, 768px, 1024px, and 1280px+ widths.
- [ ] No unintended horizontal scrolling occurs at any tested width.
- [ ] Navigation is discoverable, usable, and does not overlap content at every width.
- [ ] Text remains readable without clipping, overlapping, or reliance on hover.
- [ ] Cards, images, and case-study layouts reflow intentionally rather than merely shrinking.
- [ ] Interactive targets remain comfortably tappable on mobile.
- [ ] Zooming browser text to 200% does not hide or overlap essential content.

## Accessibility

- [ ] Each page has one clear `h1` and a logical heading hierarchy.
- [ ] Landmark regions and a skip-to-content link are present.
- [ ] All functionality works with keyboard alone, including menus, dialogs, and any filters.
- [ ] Focus is always visible and follows a sensible order.
- [ ] Links and buttons have accessible names and correct native semantics.
- [ ] Images have appropriate alternative text; decorative imagery is ignored by assistive technology.
- [ ] Colour is not the only indicator of status or interaction.
- [ ] Text and key UI contrast meet WCAG AA.
- [ ] Reduced-motion preference removes or simplifies non-essential animation and any 3D movement.
- [ ] Any video/audio has controls and captions/transcript where appropriate; avoid autoplay with sound.

## Interaction and states

- [ ] Buttons, links, cards, navigation, and forms have tested hover, focus-visible, active, disabled, loading, and error states where applicable.
- [ ] A broken or missing project image has a safe fallback and does not collapse the layout.
- [ ] Offline and not-found routes give users a useful next action.
- [ ] External links are clearly indicated where helpful and do not create a security risk when opened in a new tab.
- [ ] Motion does not delay access to essential content or interfere with scrolling.

## Performance

- [ ] Production build completes without errors or unexpected large bundles.
- [ ] Images are resized, compressed, and served with appropriate dimensions; below-the-fold media is lazy-loaded where sensible.
- [ ] Fonts are minimized, preloaded only when justified, and have a robust fallback stack.
- [ ] No console errors, failed requests, or unnecessary network requests remain.
- [ ] The initial route is usable quickly on a simulated slower mobile connection.
- [ ] Optional Three.js / React Three Fiber code is lazy-loaded and omitted for users who do not need it.
- [ ] Layout shifts are minimized by reserving media space and avoiding late content insertion.

## SEO and sharing

- [ ] Every route has a unique, accurate title and meta description.
- [ ] The landing page exposes the main professional positioning in crawlable text.
- [ ] Canonical URL, favicon, robots policy, sitemap, and social sharing metadata are configured for the deployed domain.
- [ ] Project pages have descriptive paths, headings, and internal links.
- [ ] Images used for social sharing are intentional and available at their final URLs.

## PWA and production readiness

- [ ] The web app manifest has verified name, short name, colours, icons, and display mode.
- [ ] The service worker registers successfully and does not create update loops or stale broken assets.
- [ ] After one successful visit, an offline reload shows a useful application shell or `/offline` fallback.
- [ ] External content is clearly handled when unavailable offline.
- [ ] Required environment variables are documented in `.env.example`; no secrets are committed.
- [ ] Analytics, if used, respects the owner’s privacy and consent requirements.
- [ ] Run a final manual pass in current Chromium, Firefox, and Safari where available.
- [ ] Confirm the deployed build rather than a local preview is the version being shared.

