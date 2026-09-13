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
  `feat/05-motion-pwa`, `feat/06-three-decorative-layer`, `chore/07-qa-pass`,
  `feat/08-panashe-design-tokens`, `feat/09-panashe-content`, `feat/10-panashe-components`,
  `feat/11-panashe-views`, `chore/12-panashe-qa`), so history and review stay trackable.

---

## 2026-08-21 — Workflow setup

- Read all four spec files and produced an implementation plan.

## 2026-09-13 — Phase 1 through 7 Completed

- Scaffolded and completed baseline portfolio build.

## 2026-09-13 — Panashe Phase 1: Design Tokens & Typography Transformation

- Loaded Google Fonts (`Fraunces`, `Inter`, `IBM Plex Mono`).
- Implemented warm off-white palette (`#FAFAF8`), slate blue accent (`#3D5A80`), and dark panel tokens (`#0F1117`).
- Committed Phase 1 locally on `feat/08-panashe-design-tokens` (`0d9e61e`).

## 2026-09-13 — Panashe Phase 2: Content Models & Technical Case Data

- Created stacked branch `feat/09-panashe-content`.
- Updated `profile.ts` for Panashe Bobojani (Application Developer & Computer Scientist, AI/ML Specialization, Harare, Zimbabwe).
- Replaced project dataset in `projects.ts` with 4 primary case studies:
  1. `insureintel` — InsureIntel Zimbabwe (Flagship AI/ML OCR & Document Intelligence)
  2. `spop` — SPOP Spare-Parts Operational Software (Offline-first ERP)
  3. `autodirect` — AutoDirect Automotive Platform (State transitions & Firestore locking)
  4. `foodies` — Foodies System (Multi-interface KDS & QR ordering)
- Updated `experience.ts` grouped capabilities (APPLICATION, AI/ML, SYSTEMS, DATA).
- Confirmed zero TypeScript errors with `npx tsc --noEmit`.
- Committed Phase 2 locally on `feat/09-panashe-content` (no remote push per owner instruction).
