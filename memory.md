# Build Memory Log

Running log of the portfolio build. An entry is added after every major step/goal
(end of each phase, or any significant decision), most recent entry last.

## Workflow conventions (apply for the whole build)

- **Never add a `Co-Authored-By` trailer** to any commit or push in this repository,
  on any branch, for any phase. This overrides the default commit-message convention.
- **Stacked PRs, one phase/feature per branch and per commit.** Each phase or major
  feature is staged and committed on its own (not squashed into one giant commit),
  and branched sensibly (e.g. `chore/00-workflow-setup`, `feat/01-shell-routing-tokens`,
  `feat/02-routes-content`, `feat/03-shared-components`, `feat/04-case-studies`,
  `feat/05-motion-pwa`, `feat/06-three-decorative-layer`, `chore/07-qa-pass`), so
  history and review stay trackable phase-by-phase. Branches stack on top of the
  previous phase's branch rather than all landing independently on `main`.

---

## 2026-08-21 — Workflow setup

- Read all four spec files (`CLAUDE.md`, `PROJECT_SPEC.md`, `DESIGN_SYSTEM.md`,
  `QA_CHECKLIST.md`) and produced an implementation plan covering: Vite + React +
  TypeScript scaffold, CSS Modules + a `tokens.css` token system, React Router with
  lazy-loaded routes, a single typed placeholder content source (`src/content/*`),
  the DESIGN_SYSTEM.md-approved shared component set, `vite-plugin-pwa` for the
  manifest/service worker, and an optional lazy-loaded Three.js/React Three Fiber
  decorative layer on `/` gated behind `prefers-reduced-motion`.
- Decisions confirmed by the owner: scaffold with clearly-labelled placeholder
  content throughout (no invented facts); include the optional 3D layer in this
  build rather than deferring it; leave the deployment domain undecided for now
  (placeholder/relative values + `.env.example` entry).
- Adopted this file (`memory.md`) as the running build log, plus the two workflow
  conventions above: no `Co-Authored-By` trailers, and a stacked-PR / per-phase
  branch-and-commit model for the rest of the build.

## 2026-08-21 — Scaffold started, paused mid-`npm install`

- Created branch `feat/01-shell-routing-tokens` stacked on `chore/00-workflow-setup`.
- Scaffolded Vite React 19 + TypeScript project.

## 2026-09-13 — Phase 1 Complete: Shell, Routing, PWA & Design Tokens

- Installed dependencies (`react-router-dom`, `vite-plugin-pwa`, `three`, `@react-three/fiber`, `@react-three/drei`, `@types/three`, `prettier`).
- Set Git remote origin to `https://github.com/thatboyBbx/PORTFOLIO`.
- Built CSS design tokens system in `src/styles/tokens.css` (semantic dark theme + light mode tokens, fluid typography, spacing scale, focus rings).
- Created global reset & accessibility rules in `src/styles/global.css` (skip link, focus-visible outline, screen-reader helper, container scale, reduced-motion overrides).
- Created `PageShell.tsx` layout frame with sticky responsive navigation header, accessibility landmarks, and site footer.
- Set up React Router in `App.tsx` with lazy-loaded route views (`/`, `/about`, `/projects`, `/projects/:slug`, `/experience`, `/contact`, `/offline`, `*`) and Suspense loading indicator.
- Configured `vite-plugin-pwa` in `vite.config.ts` and updated `index.html` with professional metadata and WCAG theme colors.
- Built reusable UI primitives (`Button`, `TagList`, `SectionHeading`, `Callout`, `MediaFrame`, `ProjectCard`).
- Created typed content data models (`src/content/projects.ts`, `src/content/experience.ts`, `src/content/profile.ts`).
- Confirmed zero TypeScript compilation errors via `npx tsc --noEmit`.
- Committed Phase 1 locally on `feat/01-shell-routing-tokens` (no remote push per owner instruction).
