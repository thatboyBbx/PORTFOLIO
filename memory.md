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
  `QA_CHECKLIST.md`) and produced an implementation plan.

## 2026-08-21 — Scaffold started, paused mid-`npm install`

- Created branch `feat/01-shell-routing-tokens` stacked on `chore/00-workflow-setup`.

## 2026-09-13 — Phase 1 Complete: Shell, Routing, PWA & Design Tokens

- Built design tokens, global reset, `PageShell` layout, React Router setup, and `vite-plugin-pwa` config.
- Committed Phase 1 locally on `feat/01-shell-routing-tokens` (`6f7717d`).

## 2026-09-13 — Phase 2 Complete: Content Architecture & Page Views

- Implemented typed content datasets in `src/content/` (`projects.ts`, `experience.ts`, `profile.ts`).
- Built route views (`LandingPage`, `AboutPage`, `ProjectsPage`, `ExperiencePage`, `ContactPage`, `OfflinePage`, `NotFoundPage`).
- Committed Phase 2 locally on `feat/02-routes-content` (`36020af`).

## 2026-09-13 — Phase 3 Complete: Shared UI Component Library

- Complete component library verified: `PageShell`, `Button`, `TagList`, `SectionHeading`, `Callout`, `MediaFrame`, `ProjectCard`, `StatusBadge`.
- Committed Phase 3 locally on `feat/03-shared-components` (`1557903`).

## 2026-09-13 — Phase 4 Complete: Case Study Detail Pages

- Built full `CaseStudyPage.tsx` with standard 8-section layout.
- Committed Phase 4 locally on `feat/04-case-studies` (`36c7b80`).

## 2026-09-13 — Phase 5 Complete: Motion Polish, Micro-interactions, & PWA Offline Setup

- Added service worker registration, page transitions, and reduced motion rules.
- Committed Phase 5 locally on `feat/05-motion-pwa` (`d29c8a1`).

## 2026-09-13 — Phase 6 Complete: Ambient 3D Decorative Layer

- Created stacked branch `feat/06-three-decorative-layer`.
- Implemented lazy-loaded `AmbientScene.tsx` using R3F / Three.js for Landing page hero background.
- Gated 3D rendering behind WebGL detection and `prefers-reduced-motion: reduce` checks.
- Confirmed zero TypeScript errors with `npx tsc --noEmit`.
- Committed Phase 6 locally on `feat/06-three-decorative-layer` (no remote push per owner instruction).
