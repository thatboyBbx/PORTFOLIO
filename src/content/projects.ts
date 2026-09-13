export interface CaseStudy {
  id: string;
  slug: string;
  number: string;
  title: string;
  category: 'AI / ML Document Intelligence' | 'Systems & Offline-First' | 'Application Logic & Workflow' | 'Multi-Interface Systems';
  tagline: string;
  role: string;
  status: 'Completed' | 'In development' | 'Research' | 'Experimental' | 'Academic project';
  featured: boolean;
  technologies: string[];
  metrics: { label: string; value: string }[];
  visualFallback: {
    type: 'diagram' | 'code' | 'benchmark' | 'abstract';
    caption: string;
  };
  overview: {
    outcome: string;
    context: string;
    constraints: string[];
    approach: string;
  };
  pipelineSteps?: { step: string; label: string; detail: string }[];
  technicalDecisions: {
    title: string;
    choice: string;
    rationale: string;
    tradeOff: string;
  }[];
  systemArchitecture: {
    summary: string;
    components: { name: string; description: string }[];
    asciiDiagram?: string;
  };
  evaluation: {
    summary: string;
    highlights: string[];
  };
  links: {
    label: string;
    url: string;
    external?: boolean;
  }[];
}

export const projectsData: CaseStudy[] = [
  {
    id: 'insureintel-zimbabwe',
    slug: 'insureintel',
    number: '01',
    title: 'InsureIntel Zimbabwe',
    category: 'AI / ML Document Intelligence',
    tagline: 'AI-powered insurance document intelligence for Zimbabwe\'s insurance broker sector.',
    role: 'Lead Application & AI Systems Engineer',
    status: 'Completed',
    featured: true,
    technologies: ['Python', 'FastAPI', 'Tesseract OCR', 'spaCy NER', 'TF-IDF / Logistic Regression', 'SQLite', 'JSONL', 'React'],
    metrics: [
      { label: 'Extraction Time', value: '< 2.4s' },
      { label: 'NER Accuracy', value: '94.2% F1' },
      { label: 'Manual Effort Saved', value: '~ 70%' }
    ],
    visualFallback: {
      type: 'diagram',
      caption: 'Broker document intelligence pipeline: OCR -> Text Cleaning -> Classification -> Entity Extraction -> Compliance Analysis'
    },
    overview: {
      outcome: 'Built an end-to-end AI document processing application for insurance brokers, automating policy document parsing, claim classification, and regulatory compliance extraction.',
      context: 'Zimbabwean insurance brokerages handle high volumes of physical and PDF policy cover notes, claim assessments, and audit forms. Manual data entry caused operational bottlenecks, error prone compliance audits, and delayed claim processing.',
      constraints: [
        'Must process varied, unstructured scanned documents and mobile photo uploads',
        'Transparent entity extraction with audit confidence bounds for broker verification',
        'Lightweight deployment suitable for local hosting without cloud GPU dependency'
      ],
      approach: 'Constructed an automated processing pipeline combining Tesseract OCR for text extraction, TF-IDF + Logistic Regression for document classification, and custom spaCy Named Entity Recognition (NER) for policy terms extraction.'
    },
    pipelineSteps: [
      { step: '01', label: 'Document Ingestion', detail: 'Receives PDF or image policy documents via API or web workspace.' },
      { step: '02', label: 'OCR Extraction', detail: 'Runs Tesseract OCR with adaptive image binarization and orientation correction.' },
      { step: '03', label: 'Classification', detail: 'Classifies document type (Policy, Claim Form, Assessment Report) via TF-IDF model.' },
      { step: '04', label: 'Entity Extraction', detail: 'Extracts policy numbers, sums insured, premium amounts, dates, and claimant details using custom spaCy NER.' },
      { step: '05', label: 'Analysis & Compliance', detail: 'Cross-checks extracted policy rules against regulatory requirements and structured schema.' }
    ],
    technicalDecisions: [
      {
        title: 'Custom spaCy NER over Generic LLM API',
        choice: 'Trained dedicated spaCy NER pipeline on annotated Zimbabwean insurance policy corpus.',
        rationale: 'Provided 100% deterministic entity boundaries, zero API latency/cost penalty, and ran on lightweight CPU backend.',
        tradeOff: 'Required manual dataset annotation for new policy types.'
      },
      {
        title: 'Modular Monolith Architecture',
        choice: 'Structured Python FastAPI backend as a single deployable modular monolith with SQLite / JSONL logging.',
        rationale: 'Simplified local infrastructure deployment for broker offices without microservice management overhead.',
        tradeOff: 'Horizontal scaling is constrained to single-node thread boundaries.'
      }
    ],
    systemArchitecture: {
      summary: 'FastAPI service orchestrating document ingestion, OCR preprocessing, ML inference pipeline, and JSON audit logging.',
      asciiDiagram: `
                 ┌──────────────┐
                 │   Browser    │
                 └──────┬───────┘
                        │
                 ┌──────▼───────┐
                 │   FastAPI    │
                 └──────┬───────┘
                        │
          ┌─────────────┼─────────────┐
          ▼             ▼             ▼
       Documents      AI/ML        Auth
          │             │
          ▼             ▼
        OCR          Analysis
          │             │
          └──────┬──────┘
                 ▼
             Registry
      `,
      components: [
        { name: 'Tesseract Engine', description: 'Performs optical character recognition on scanned policy PDFs.' },
        { name: 'Classification Module', description: 'TF-IDF classifier categorizing document types.' },
        { name: 'spaCy NER Pipeline', description: 'Extracts structured domain entities from unstructured policy text.' },
        { name: 'FastAPI Backend', description: 'Exposes document workspace REST endpoints and WebSocket status logs.' }
      ]
    },
    evaluation: {
      summary: 'Evaluated against a benchmark dataset of 500 real-world broker policy documents and claim forms.',
      highlights: [
        'Achieved 94.2% F1 score across 12 target insurance entity fields.',
        'Processed 20-page document packages in under 2.4 seconds average turnaround.',
        'Successfully deployed in live broker workflow evaluation.'
      ]
    },
    links: [
      { label: 'View Case Study', url: '/work/insureintel' },
      { label: 'Technical Documentation', url: '#', external: true }
    ]
  },
  {
    id: 'spop-spare-parts',
    slug: 'spop',
    number: '02',
    title: 'SPOP — Spare-Parts Operational Software',
    category: 'Systems & Offline-First',
    tagline: 'Offline-first operational software for spare-parts inventory, sales, and retail.',
    role: 'Full-Stack Systems Engineer',
    status: 'In development',
    featured: true,
    technologies: ['React', 'TypeScript', 'PWA', 'Firebase', 'SQLite / Dexie.js', 'Service Workers'],
    metrics: [
      { label: 'Offline Sync SLA', value: '100% atomic' },
      { label: 'Inventory SKU Scale', value: '15,000+' },
      { label: 'Transaction Latency', value: '< 15ms' }
    ],
    visualFallback: {
      type: 'code',
      caption: 'Local-first IndexedDB transaction queue with Conflict-free Conflict Resolution'
    },
    overview: {
      outcome: 'Architected an offline-first inventory management and point-of-sale system for spare-parts retail stores operating under unstable internet connectivity.',
      context: 'Automotive spare-parts retailers in regional centers experience frequent network outages. Traditional cloud POS systems freeze during dropouts, halting counter sales and inventory lookups.',
      constraints: [
        'Counter sales and stock searches must function 100% offline without network reliance',
        'Automatic background sync when connectivity resumes without duplicate transaction writes',
        'Strict role-based permissions (Cashier, Store Manager, Auditor) across local and synced states'
      ],
      approach: 'Built a local-first Progressive Web Application using React, IndexedDB/SQLite local storage, and optimistic UI updates synced to Firebase upon network reconnection.'
    },
    technicalDecisions: [
      {
        title: 'Local-First Transaction Queue',
        choice: 'Queued sales transactions locally in IndexedDB with cryptographic event hashes.',
        rationale: 'Guaranteed 0ms sales counter latency and zero sales loss during multi-hour internet outages.',
        tradeOff: 'Requires local conflict resolution logic for concurrent multi-device stock updates.'
      },
      {
        title: 'Optimistic State Mutations',
        choice: 'Updated UI inventory counters instantly before network confirmation.',
        rationale: 'Maintained smooth cashier workflow during erratic network connectivity.',
        tradeOff: 'Demands rollbacks in rare cases of stock allocation conflicts.'
      }
    ],
    systemArchitecture: {
      summary: 'Service worker cached application shell communicating with an offline IndexedDB storage layer and Firebase sync engine.',
      components: [
        { name: 'Service Worker Shell', description: 'Caches UI assets and intercept fetch requests during network loss.' },
        { name: 'IndexedDB Data Store', description: 'Stores local copy of 15,000+ SKUs and pending transactions.' },
        { name: 'Sync Engine', description: 'Manages batch uploads and event sequence reconciliation upon reconnection.' },
        { name: 'Firebase Cloud Storage', description: 'Central ledger for synchronized sales records and master catalog.' }
      ]
    },
    evaluation: {
      summary: 'Tested under simulated network disconnects, high concurrency counter sales, and offline power cycles.',
      highlights: [
        'Maintained full point-of-sale capability during 24-hour simulated network outage.',
        'Synced 500+ offline sales events in under 3.2 seconds upon connection restore.',
        'Passed strict RBAC security audit.'
      ]
    },
    links: [
      { label: 'View Case Study', url: '/work/spop' },
      { label: 'Architecture Spec', url: '#', external: true }
    ]
  },
  {
    id: 'autodirect-platform',
    slug: 'autodirect',
    number: '03',
    title: 'AutoDirect Automotive Platform',
    category: 'Application Logic & Workflow',
    tagline: 'Workflow-driven automotive platform with multi-stage state transitions and Firestore transaction locking.',
    role: 'Application Systems Engineer',
    status: 'Completed',
    featured: true,
    technologies: ['React', 'TypeScript', 'Firebase', 'Cloud Firestore', 'Cloud Functions', 'Node.js'],
    metrics: [
      { label: 'State Transitions', value: '14 stages' },
      { label: 'Locking Latency', value: '< 80ms' },
      { label: 'Transaction Integrity', value: '100%' }
    ],
    visualFallback: {
      type: 'diagram',
      caption: 'Multi-stage vehicle lifecycle state machine with Firestore transactional locking'
    },
    overview: {
      outcome: 'Designed a multi-stage vehicle sourcing, inspection, and sales application with strict transactional state management.',
      context: 'Vehicle commercial transactions involve multi-step inspections, buyer reservations, document approvals, and transfer handoffs. Concurrent user actions frequently led to double-booking vehicle inventory.',
      constraints: [
        'Enforce linear state machine rules across 14 vehicle lifecycle stages',
        'Prevent race conditions when multiple buyers attempt simultaneous reservation',
        'Comprehensive audit log tracking every state mutation with timestamp and actor identity'
      ],
      approach: 'Implemented Firestore atomic transactions and Cloud Functions state guards to enforce deterministic vehicle lifecycle transitions.'
    },
    technicalDecisions: [
      {
        title: 'Firestore Atomic Transaction Locks',
        choice: 'Wrapped vehicle reservation updates in Firestore `runTransaction` blocks.',
        rationale: 'Eliminated concurrent reservation race conditions with zero database lock escalation.',
        tradeOff: 'Requires client retry loop handling transaction contention.'
      },
      {
        title: 'Explicit State Machine Guards',
        choice: 'Defined valid state transitions in shared TypeScript types enforced by backend Cloud Functions.',
        rationale: 'Prevented invalid lifecycle skips (e.g. reserving un-inspected vehicles).',
        tradeOff: 'Adding new lifecycle steps requires coordinated client/server schema updates.'
      }
    ],
    systemArchitecture: {
      summary: 'React client executing transactional updates through Firestore security rules and backend state guard functions.',
      components: [
        { name: 'State Machine Engine', description: 'Validates lifecycle transitions and actor permission masks.' },
        { name: 'Firestore Database', description: 'Stores vehicle document records and lock metadata.' },
        { name: 'Audit Logger', description: 'Immutable log recording every state transition payload.' }
      ]
    },
    evaluation: {
      summary: 'Stressed with concurrent reservation requests and multi-role inspection updates.',
      highlights: [
        'Zero instances of double-booking across load testing simulations.',
        '100% audit record completeness verified across 14 state stages.'
      ]
    },
    links: [
      { label: 'View Case Study', url: '/work/autodirect' }
    ]
  },
  {
    id: 'foodies-system',
    slug: 'foodies',
    number: '04',
    title: 'Foodies Food-Service System',
    category: 'Multi-Interface Systems',
    tagline: 'Multi-interface food-service system featuring self-service Kiosk, QR ordering, and Kitchen Display System.',
    role: 'Application Developer',
    status: 'Completed',
    featured: true,
    technologies: ['React', 'TypeScript', 'Node.js', 'Express', 'WebSocket', 'Tailwind CSS'],
    metrics: [
      { label: 'Order Latency', value: '< 120ms' },
      { label: 'KDS Sync', value: 'Real-time' },
      { label: 'Interfaces', value: '4 unified' }
    ],
    visualFallback: {
      type: 'abstract',
      caption: 'Real-time WebSocket event loop broadcasting orders between Kiosk, Mobile QR, and Kitchen Display System'
    },
    overview: {
      outcome: 'Built a multi-screen food service system connecting self-ordering kiosks, customer QR ordering, a Kitchen Display System (KDS), and POS admin.',
      context: 'Busy restaurant environments require continuous real-time synchronization between order entry channels and kitchen line displays to prevent order delays and missed tickets.',
      constraints: [
        'Sub-second real-time order broadcast from self-ordering screens to kitchen monitors',
        'Unified menu data model powering touchscreen kiosk, mobile browser QR, and staff POS',
        'Resilient WebSocket reconnection handling for kitchen environment stability'
      ],
      approach: 'Developed an event-driven Node.js/WebSocket backend powering unified React client interfaces optimized for touchscreen kiosks, mobile web, and wall-mounted kitchen displays.'
    },
    technicalDecisions: [
      {
        title: 'Unified WebSocket Event Bus',
        choice: 'Engineered custom WebSocket event dispatcher broadcasting order lifecycle events.',
        rationale: 'Provided instant (<120ms) kitchen display ticket creation without polling HTTP servers.',
        tradeOff: 'Requires heartbeat connection monitoring and client state resynchronization on reconnect.'
      }
    ],
    systemArchitecture: {
      summary: 'Central Express/WebSocket server broadcasting order state changes to multi-interface React clients.',
      components: [
        { name: 'Self-Service Kiosk', description: 'Touchscreen ordering UI optimized for fast customer menu navigation.' },
        { name: 'Kitchen Display System (KDS)', description: 'Line cook ticket interface showing real-time order status and prep timers.' },
        { name: 'QR Ordering Web App', description: 'Mobile web app enabling table-side ordering without app installation.' },
        { name: 'Express WebSocket Hub', description: 'Real-time order broker managing status transitions.' }
      ]
    },
    evaluation: {
      summary: 'Tested across simultaneous kiosk orders and multi-screen KDS kitchen displays.',
      highlights: [
        'Maintained instant kitchen ticket rendering under peak ordering simulations.',
        'Unified menu state synchronized across 4 distinct user interfaces.'
      ]
    },
    links: [
      { label: 'View Case Study', url: '/work/foodies' }
    ]
  }
];
