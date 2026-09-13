export interface ExperienceItem {
  id: string;
  role: string;
  organization: string;
  period: string;
  location: string;
  summary: string;
  highlights: string[];
  technologies: string[];
}

export interface CapabilityGroup {
  category: string;
  skills: string[];
}

export const experienceData: ExperienceItem[] = [
  {
    id: 'software-systems-engineer',
    role: 'Application Developer & Systems Engineer',
    organization: 'Software Systems & AI/ML Projects',
    period: '2023 — Present',
    location: 'Harare, Zimbabwe',
    summary: 'Architecting workflow-heavy business applications, AI document intelligence pipelines, and offline-first software systems.',
    highlights: [
      'Built InsureIntel Zimbabwe: AI-powered insurance document intelligence for broker policy & claim workflows.',
      'Architected SPOP: Offline-first spare-parts operational & inventory retail system with local IndexedDB queue.',
      'Engineered AutoDirect: Workflow-driven automotive platform with 14-stage lifecycle state locking.',
      'Developed Foodies: Real-time multi-interface food service system with Kiosk, QR Ordering, and KDS.'
    ],
    technologies: ['Python', 'FastAPI', 'React', 'Next.js', 'TypeScript', 'Firebase', 'SQLite', 'Tesseract', 'spaCy']
  }
];

export const capabilityGroups: CapabilityGroup[] = [
  {
    category: 'APPLICATION',
    skills: ['Python', 'React', 'Next.js', 'FastAPI', 'Firebase', 'TypeScript', 'Tailwind CSS']
  },
  {
    category: 'AI / ML',
    skills: ['Machine Learning', 'NLP', 'OCR (Tesseract)', 'Classification (TF-IDF)', 'NER (spaCy)', 'Predictive Modelling']
  },
  {
    category: 'SYSTEMS',
    skills: ['REST APIs', 'Authentication', 'RBAC', 'Offline-First Systems', 'Workflow Modelling', 'State Machines', 'Database Design']
  },
  {
    category: 'DATA',
    skills: ['SQLite', 'PostgreSQL', 'Firestore', 'JSON / JSONL', 'IndexedDB / Dexie.js']
  }
];
