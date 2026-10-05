import type { CaseStudy } from './projects';

export const spareProject: CaseStudy = {
  id: 'spare-operations', slug: 'spare', number: '04', title: 'SPARE',
  category: 'Systems & Workflow',
  tagline: 'Offline-first spare-parts operations: stock, branch transfers and approvals, with auditable records and controlled sync.',
  role: 'Project development · API, offline workflows & responsive console',
  period: '2026 · Controlled-pilot preparation', printPages: 2,
  status: 'In development', featured: true,
  technologies: ['React', 'TypeScript', 'FastAPI', 'Dexie / IndexedDB', 'PostgreSQL', 'Redis', 'Workbox'],
  visualFallback: { type: 'diagram', caption: 'Branch operations, offline replay and auditable stock/accounting records.' },
  figures: [
    { section: 'system', src: '/projects/spare/transfer-workflow.svg', height: 350, alt: 'A shop requests a transfer, the warehouse fulfils it, then the destination confirms receipt. Only requests can queue offline; fulfilment and receipt require live authorization and an expected version. Stale versions return 409 for review.', caption: 'Original transfer workflow. Physical hand-offs are separate, version-checked online actions; offline support does not cover every mutation.' },
    { section: 'architecture', src: '/projects/spare/offline-architecture.svg', alt: 'The React PWA uses a Workbox application shell and Dexie cache/outbox. FastAPI checks roles, idempotency and versions before writing stock and journal ledgers. PostgreSQL is the intended production database; readiness checks database, Redis and migrations.', caption: 'Original architecture diagram. Local tests use isolated SQLite; the intended PostgreSQL/Redis staging stack still needs validation.' },
  ],
  overview: {
    outcome: 'A shared operations workspace for one warehouse and multiple spare-parts shops.',
    context: 'Spare-parts teams need to know what moved, who approved it and which records still await sync. SPARE brings stock receipts, sales recording, transfers, purchasing, approvals and accounting into a role-aware desktop/mobile workspace. It is an operations platform, not a payment-processing POS. This portfolio presents the SPOP implementation under the name SPARE.',
    constraints: ['Keep permitted receipt, sale and transfer-request work recoverable during connection failures.', 'Separate warehouse dispatch from shop receipt, with server-side role and version checks.', 'Retain stock and accounting movements as auditable records rather than silently overwriting balances.'],
    approach: 'A transfer moves through requested, in_transit and received states. Only its request can enter the local outbox; dispatch and receipt require the live API. Dexie stores local records and queued requests. Reconnect replay reuses client request IDs to avoid duplicate server postings. Stale version checks return HTTP 409 for operator review rather than guessing a merge. Purchasing and expenses use a shared approval path; reports derive from recorded stock and journal entries.',
  },
  systemArchitecture: {
    summary: 'React/TypeScript provides the responsive console; Workbox caches the application shell and Dexie maintains the local cache/outbox. FastAPI enforces six fixed roles, JWT/device identity, idempotent creation and selected optimistic-concurrency checks. PostgreSQL is the intended production store; Redis and migration state participate in the /ready gate.',
    components: [
      { name: 'Operations', description: 'Receipts, sales recording, staged transfers, purchasing and approval dispatch.' },
      { name: 'Records & insight', description: 'Append-only stock/journal ledgers, branch reports and explainable replenishment suggestions.' },
    ],
  },
  technicalDecisions: [
    { title: 'Offline, with boundaries', choice: 'Queue supported actions; keep stock hand-offs online.', rationale: 'Stable request IDs and expected versions address duplicate replay and stale writes.', tradeOff: 'Local records are provisional. Conflicts need review; exhausted retries can require intervention.' },
    { title: 'Explain before predicting', choice: 'Use trailing 30-day sales velocity for replenishment.', rationale: 'A transparent heuristic is inspectable before real operating data exists for model validation.', tradeOff: 'This is not trained demand forecasting; no ML accuracy or commercial savings are claimed.' },
  ],
  evaluation: {
    summary: 'Rechecked on 5 October 2026: 75 backend tests and 7 frontend tests passed. Implementation and verification records cover role-aware operations, local offline replay and conflict handling; these local tests are not evidence of a production deployment.',
    highlights: ['Frontend coverage includes permission-filtered navigation, keyboard/focus handling, offline queue/replay and stale-version recovery.', 'Backend coverage spans roles, stock, purchasing, approvals, accounting, idempotency, readiness and migrations.'],
    limitations: ['Staging PostgreSQL/Redis readiness, real-device UAT and backup/restore rehearsal remain outstanding. Prior local /ready returned 503 with missing dependencies.', 'No measured business outcomes or production-scale sync/forecasting benchmark. Client error classification, conflict UX and retry recovery need pilot review.'],
    nextSteps: 'Validate the full staging dependency gate, exercise real-device offline hand-offs, and reconcile ledgers before a controlled pilot.',
    sourceNote: 'Source: SPOP implementation, pilot verification/UAT records and local test reruns, reviewed 5 October 2026. Client records, credentials, logs and full internal documentation are not published.',
  },
  links: [{ label: 'Download the 2-page case study (PDF)', url: '/projects/spare/case-study.pdf', external: true }],
};
