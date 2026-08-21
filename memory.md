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
