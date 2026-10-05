import type { CaseStudy } from "./projects";

export const docudigitProject: CaseStudy = {
  id: "docudigit-ai",
  slug: "docudigit",
  number: "03",
  title: "DocuDigit AI",
  category: "AI / ML Document Intelligence",
  tagline:
    "Local OCR that turns scanned forms into reviewed, editable Word documents—with source evidence for every proposed field.",
  role: "Independent project · Processing, API & worker",
  period: "September 2026 · Ongoing",
  printPages: 2,
  status: "In development",
  featured: true,
  technologies: [
    "Python",
    "PaddleOCR",
    "FastAPI",
    "SQLAlchemy",
    "DOCX",
    "LibreOffice",
  ],
  visualFallback: {
    type: "diagram",
    caption: "Local OCR, evidence-based review, and native Word export.",
  },
  figures: [
    {
      section: "system",
      src: "/projects/docudigit/review-workflow.svg",
      alt: "A configured DOCX template and PDF or image enter local OCR and candidate mapping. Every field must be confirmed, corrected, or marked missing before approval and export to editable DOCX plus provenance JSON.",
      caption:
        "Original workflow diagram. Human review is a required processing step, not a confidence-score shortcut.",
    },
  ],
  overview: {
    outcome:
      "From scanned forms to editable Word documents, with a human in control.",
    context:
      "Scanned forms often need to be retyped into a standard Word template. DocuDigit AI brings local OCR, field proposals, explicit review, and document generation into one reproducible workflow. The implemented scope covers a command-line slice and a persistent API/worker; the browser review interface is the next phase.",
    constraints: [
      "Process locally on a Windows CPU setup with pre-downloaded models; no cloud OCR service.",
      "Preserve editable Word text and simple template structure, rather than flattening the output into an image.",
      "Keep source evidence and require a decision for every field before export.",
    ],
    approach:
      "A configured DOCX template defines the fields. PyMuPDF renders PDFs, while PNG and JPEG inputs are normalised for local PaddleOCR. Each recognised token retains its page, text, engine score, and normalised bounding box. Deterministic mapping combines label/alias similarity, nearby geometry, and field-type checks. Weak or conflicting evidence abstains. Review records confirmed, corrected, or missing values; docxtpl produces an editable DOCX and JSON provenance record. LibreOffice supplies template/output previews.",
  },
  systemArchitecture: {
    summary:
      "The processing package is shared by the CLI and a versioned FastAPI service. A polling worker persists job progress and processes one job at a time. Jobs snapshot the template version and schema; private artifacts are accessed through controlled routes.",
    components: [
      {
        name: "Processing",
        description:
          "Template validation, rendering, OCR, candidate mapping, review, and export.",
      },
      {
        name: "API & worker",
        description:
          "Persistent jobs, revision-guarded edits, approval, retry, and idempotent export.",
      },
      {
        name: "Storage",
        description:
          "SQLAlchemy/Alembic records and opaque local file keys. SQLite verified; PostgreSQL integration not yet verified.",
      },
    ],
  },
  technicalDecisions: [
    {
      title: "Evidence, not false confidence",
      choice: "Treat rank_score as candidate ordering only.",
      rationale:
        "OCR engine scores and mapping heuristics are uncalibrated. Page boxes and component scores let a reviewer inspect the source instead of trusting a percentage.",
      tradeOff:
        "Review is mandatory; handwriting and ambiguous layouts remain human decisions.",
    },
    {
      title: "Protect the approved revision",
      choice: "Reject stale edits and recover interrupted work.",
      rationale:
        "Revision mismatches return HTTP 409. Startup recovery requeues processing within an attempt limit and returns interrupted exports to the approved queue.",
      tradeOff:
        "The current design is a local, single-user worker—not a distributed production queue.",
    },
  ],
  evaluation: {
    summary:
      "Rechecked on 5 October 2026: all 27 tests passed, including real local OCR and LibreOffice rendering. The API integration story covers template setup, scan upload, processing, review, approval, repeatable export, download, and deletion.",
    highlights: [
      "Tests reject incomplete review and premature approval, retain required-missing warnings, and check stale-revision rejection.",
      "Native DOCX filling preserves paragraph/table shape; job deletion removes its private artifacts while retaining the template.",
    ],
    limitations: [
      "Evidence uses a single synthetic ten-field form family, not a multi-form OCR accuracy benchmark.",
      "Browser review, authentication, public-host security hardening, and live PostgreSQL validation are not implemented or verified.",
    ],
    nextSteps:
      "Build browser evidence review against the existing API, then evaluate varied form families, abstention quality, and reviewer effort.",
    sourceNote:
      "Source: project implementation and Phase 0–2 verification records, September 2026; tests rerun on 5 October 2026. Seven dependency/tooling warnings were reported. No personal records or runtime artifacts are published here.",
  },
  links: [
    {
      label: "Download the 2-page case study (PDF)",
      url: "/projects/docudigit/case-study.pdf",
      external: true,
    },
  ],
};
