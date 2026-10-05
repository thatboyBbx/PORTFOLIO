import { docudigitProject } from "./docudigit";
import { spareProject } from "./spare";

export interface CaseStudy {
  id: string;
  slug: string;
  number: string;
  title: string;
  category:
    | "AI / ML Document Intelligence"
    | "Systems & Workflow"
    | "Information Retrieval"
    | "Application Development";
  tagline: string;
  role: string;
  period?: string;
  printPages?: 2 | 3;
  figures?: {
    section: "system" | "architecture";
    src: string;
    height?: number;
    alt: string;
    caption: string;
  }[];
  status:
    | "Completed"
    | "In development"
    | "Research"
    | "Experimental"
    | "Academic project";
  featured: boolean;
  technologies: string[];
  visualFallback: {
    type: "diagram" | "code" | "benchmark" | "abstract";
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
    metrics?: { value: string; label: string; detail: string }[];
    limitations?: string[];
    nextSteps?: string;
    sourceNote?: string;
  };
  links: { label: string; url: string; external?: boolean }[];
}

export const projectsData: CaseStudy[] = [
  {
    id: "insureintel-zimbabwe",
    slug: "insureintel",
    number: "01",
    title: "InsureIntel Zimbabwe",
    category: "AI / ML Document Intelligence",
    tagline:
      "A CPU-first insurance document-intelligence prototype combining extraction, compliance triage, and insurer profiling.",
    role: "Individual capstone · Design, development & evaluation",
    period: "June 2026",
    status: "Academic project",
    featured: true,
    technologies: [
      "Python",
      "FastAPI",
      "spaCy",
      "scikit-learn",
      "PostgreSQL",
      "ChromaDB",
    ],
    figures: [
      {
        section: "system",
        src: "/projects/insureintel/review-flow.svg",
        alt: "Digital PDFs or scans enter text extraction, then document classification and entity extraction. Document checks and insurer profiling provide evidence for broker review; regulatory retrieval supports questions.",
        caption:
          "Original conceptual workflow. Outputs support broker judgment; they do not certify compliance.",
      },
      {
        section: "architecture",
        src: "/projects/insureintel/data-architecture.svg",
        alt: "A Jinja2 broker workspace connects to a FastAPI processing layer backed by PostgreSQL for structured records, MongoDB for OCR text, and ChromaDB for regulatory retrieval.",
        caption:
          "Original architecture summary, redrawn from the implementation description—not a screenshot of the application.",
      },
    ],
    visualFallback: {
      type: "diagram",
      caption:
        "OCR, entity extraction, document classification, and rules-based compliance review.",
    },
    overview: {
      outcome:
        "Turning insurance documents into structured evidence for a broker’s first-pass review.",
      context:
        "Insurance brokers must read policy wordings, claims forms, treaty agreements, and correspondence to find terms, identify missing clauses, and assess insurer exposure. InsureIntel Zimbabwe explored how document intelligence could bring those tasks into one review workflow. I designed, implemented, and evaluated the academic prototype.",
      constraints: [
        "Run locally on an 8th-generation Intel i5 with 16 GB RAM, without a GPU or paid model APIs.",
        "Handle digital PDFs and scanned documents with limited authentic training material.",
        "Keep findings reviewable and preserve human responsibility for insurance decisions.",
      ],
      approach:
        "The pipeline tries pdfplumber text extraction first and routes low-text documents to Tesseract OCR. TF-IDF with Logistic Regression classifies four document types; a custom spaCy model extracts six entity types, including premiums, coverage limits, deductibles, and exclusions. Clause checks and a document-risk score support triage. A separate Corporate Solvency Profiling module combines four financial indicators and an XGBoost anomaly model. Regulatory retrieval uses MiniLM embeddings and ChromaDB to surface supporting passages with citations.",
    },
    technicalDecisions: [
      {
        title: "Fit the model to the constraint",
        choice:
          "TF-IDF + Logistic Regression rather than a heavier classifier.",
        rationale:
          "A small, CPU-friendly model suited the vocabulary differences between the four document classes. Training used 847 labelled samples.",
        tradeOff:
          "Overlapping vocabulary made treaty agreements and correspondence harder to distinguish.",
      },
      {
        title: "Fail closed on missing rules",
        choice:
          "Raise a configuration error when required clause files are missing.",
        rationale:
          "During development, missing knowledge files could silently produce a 100% compliance score. A startup guard and regression test replaced that misleading success path.",
        tradeOff:
          "Processing stops until configuration is repaired; availability does not take priority over trustworthy findings.",
      },
    ],
    systemArchitecture: {
      summary:
        "FastAPI exposes the processing services to a server-rendered Jinja2 workspace. JWT authentication and role checks distinguish administrators, brokers, and analysts. Three stores separate structured records, raw extraction output, and regulatory retrieval; this flexibility also increases local deployment complexity.",
      components: [
        {
          name: "PostgreSQL",
          description:
            "Users, document records, compliance findings, insurer profiles, and audit records.",
        },
        {
          name: "MongoDB",
          description: "Raw OCR output and variable page structures.",
        },
        {
          name: "ChromaDB",
          description:
            "Embedded regulatory passages drawn from the Insurance Act, 12 IPEC circulars, and an FSR-1 template.",
        },
      ],
    },
    evaluation: {
      summary:
        "These are dissertation-reported proof-of-concept results, not independently reproduced portfolio benchmarks. The document corpus contained 45 documents: 11 authentic seeds and 34 synthetic documents. The report describes 20% held-out splits for classification and NER; compliance thresholds and profiling weights were calibrated against the evaluation/reference data, so those results are not independent validation.",
      metrics: [
        {
          value: "0.87",
          label: "Classification F1",
          detail: "Weighted average across four document types.",
        },
        {
          value: "0.76",
          label: "Entity extraction F1",
          detail: "Micro-average; below the 0.85 research target.",
        },
        {
          value: "0.91",
          label: "Clause-check precision",
          detail: "Mandatory clause detection; recall was 0.78.",
        },
        {
          value: "12.4 / 34.7 s",
          label: "Digital / scanned PDF",
          detail:
            "Mean processing time over ten runs per type on the local CPU setup.",
        },
      ],
      highlights: [
        "The report records 68 passing development tests, including authentication, role restrictions, extraction, and the missing-rules guard.",
        "Deductibles were the weakest entity type (F1 0.69): conditional wording led to incomplete extraction spans.",
        "Solvency rankings achieved reported Kendall’s τ = 0.74 against a regulatory reference, after weight optimisation—not a prospective insurer-risk test.",
      ],
      limitations: [
        "Mostly synthetic document data limits confidence in generalisation to real brokerage workloads.",
        "Only six of approximately twelve browser routes were fully wired; retrieval-answer evaluation and multi-user validation remained incomplete.",
        "The dissertation contains inconsistent anomaly-detection counts and metrics. Those results are intentionally omitted here; no production readiness or measured business savings are claimed.",
      ],
      nextSteps:
        "Prioritise a larger anonymised authentic corpus, complete the review interface, and evaluate retrieval quality and user workflows with brokers before any production pilot.",
      sourceNote:
        "Source: University of Zimbabwe capstone dissertation, June 2026, implementation and results chapters. This condensed account anonymises client details and omits the full dissertation and source documents.",
    },
    links: [
      {
        label: "Download the 3-page case study (PDF)",
        url: "/projects/insureintel/case-study.pdf",
        external: true,
      },
    ],
  },
  {
    id: "autodirect",
    slug: "autodirect",
    number: "02",
    title: "AutoDirect",
    category: "Systems & Workflow",
    tagline:
      "A mineral-freight marketplace connecting shippers and transporters through a shared seven-stage job lifecycle.",
    role: "Full-stack project · Freight workflow & coordination",
    printPages: 2,
    status: "Completed",
    featured: true,
    technologies: ["React", "Firebase", "Firestore", "Transactions"],
    figures: [
      {
        section: "system",
        src: "/projects/autodirect/job-lifecycle.svg",
        alt: "Seven stages: Posted, Matched, Accepted, Loading, In transit, Delivered, and Closed. Transactional acceptance checks availability and assigns one transporter; an already assigned job is not overwritten.",
        caption:
          "Original lifecycle diagram based on the project documentation. Acceptance is the contested transition; final closure follows confirmation by both parties.",
      },
    ],
    visualFallback: {
      type: "diagram",
      caption:
        "Seven-stage mineral-freight coordination with transactional assignment.",
    },
    overview: {
      outcome:
        "Connecting mineral shippers and transporters through one shared job record.",
      context:
        "Mineral freight is often arranged through calls, messages, and personal networks. Shippers lack visibility of available capacity, transporters struggle to find return-leg work, and both sides need a shared record of progress. AutoDirect applies a ride-sharing marketplace model to this coordination problem, with shipper and transporter workflows in a React application.",
      constraints: [
        "Keep assignment consistent when multiple transporters accept the same job.",
        "Represent seven named stages, with clear responsibilities and valid transitions.",
        "Keep infrastructure lightweight and communicate failures on unreliable connections.",
      ],
      approach:
        "A shipper posts cargo details, pickup, destination, and timing. Transporters see the request and express interest; one accepts the work. The job then advances through loading, transit, delivery, and closure. Both parties follow the same Firestore record through real-time updates. Acceptance reads availability and writes the assignment in one transaction. If a competing acceptance has already claimed the job, the losing action reports that it is taken rather than overwriting the assignment. Client-side fallbacks provide clear feedback and safe retry paths when the preferred action cannot complete.",
    },
    technicalDecisions: [
      {
        title: "Check and claim atomically",
        choice:
          "Read availability and write assignment in one Firestore transaction.",
        rationale:
          "Separate checks and writes leave a race window. Transactional assignment checks shared job state before committing, rather than treating competing requests as independent bookings.",
        tradeOff:
          "Contention and failures need handling, alongside appropriate Firestore rules. The supplied document does not establish those rules.",
      },
      {
        title: "Make state and failure visible",
        choice:
          "Use named lifecycle stages, a shared record, and explicit failure feedback.",
        rationale:
          "Named stages clarify the next action. Shared updates reduce confirmation calls; fallback handling distinguishes saved actions from failed attempts.",
        tradeOff:
          "The managed backend reduces maintenance but depends on Firebase and connectivity. Live GPS tracking remains a proposed extension.",
      },
    ],
    systemArchitecture: {
      summary:
        "The documented architecture is a React single-page application communicating directly with Firebase. Firestore stores job records, streams status changes, and provides transactions for assignment. A dedicated custom server is not part of this documented design.",
      components: [
        {
          name: "React application",
          description:
            "Shipper job posting and tracking; transporter discovery, acceptance, and progress updates.",
        },
        {
          name: "Firestore",
          description:
            "Shared job records, real-time status updates, and transactional assignment.",
        },
        {
          name: "Client fallbacks",
          description:
            "Failure feedback and safe retries when the preferred path cannot finish; not a verified offline-sync system.",
        },
      ],
    },
    evaluation: {
      summary:
        "The supplied documentation reports a complete posting-to-closure workflow, transactional assignment, and graceful failure handling. It provides a concrete design account, but no repository, automated test results, deployment evidence, or measured operating outcomes were supplied for independent verification.",
      highlights: [
        "Seven stages connect marketplace discovery with delivery and a retained completion record.",
        "The acceptance walkthrough explains the contention case: the first successful claim assigns the transporter; a later claimant receives a taken-job message.",
      ],
      limitations: [
        "Concurrency guarantees, permissions, and retry behaviour still need source-code and test evidence; the document alone does not prove all race conditions are covered.",
        "Reduced empty journeys, lower costs, and fewer disputes are intended benefits, not measured pilot results.",
      ],
      nextSteps:
        "Validate competing acceptance requests, invalid transitions, and network failures. GPS tracking, reputation, pricing suggestions, payments, and shipment documents remain proposed extensions.",
      sourceNote:
        "Source: AutoDirect portfolio documentation supplied in October 2026. This condensed account distinguishes documented implementation from independent verification and proposed features.",
    },
    links: [
      {
        label: "Download the 2-page case study (PDF)",
        url: "/projects/autodirect/case-study.pdf",
        external: true,
      },
    ],
  },
  docudigitProject,
  spareProject,
];
