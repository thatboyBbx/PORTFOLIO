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
  description: string;
  skills: string[];
}

export const experienceData: ExperienceItem[] = [
  {
    id: 'lead-ai-application-engineer',
    role: 'Lead AI & Application Engineer',
    organization: 'Intelligent Systems Core',
    period: '2023 — Present',
    location: 'San Francisco, CA (Hybrid)',
    summary: 'Directing the architecture and development of production AI applications, vector search platforms, and high-throughput streaming inference engines.',
    highlights: [
      'Architected end-to-end hybrid vector search service serving millions of queries daily at sub-50ms latency.',
      'Designed real-time model monitoring and feature store pipelines preventing training-serving data drift.',
      'Mentored cross-functional teams across React application frontend, Python AI services, and C++ SIMD inference runtimes.'
    ],
    technologies: ['React 19', 'TypeScript', 'Python', 'FastAPI', 'Qdrant', 'PyTorch', 'Docker', 'Kubernetes']
  },
  {
    id: 'systems-ml-engineer',
    role: 'Senior ML Systems Engineer',
    organization: 'Apex Neural Labs',
    period: '2021 — 2023',
    location: 'Boston, MA',
    summary: 'Focused on model optimization, quantization, custom SIMD kernels, and embedded edge AI execution runtimes.',
    highlights: [
      'Engineered C++/Rust model runtime delivering 4.2x speedup on ARM64 and WebAssembly target platforms.',
      'Reduced LLM memory footprint by 68% using custom 4-bit matrix quantization algorithms.',
      'Built automated CI/CD benchmark suites for tracking latency regressions across mobile and web targets.'
    ],
    technologies: ['C++20', 'Rust', 'WebAssembly', 'ONNX Runtime', 'PyTorch', 'Kafka', 'Redis']
  },
  {
    id: 'software-engineer-data',
    role: 'Software Engineer — Intelligent Data Apps',
    organization: 'Vanguard Data Systems',
    period: '2019 — 2021',
    location: 'New York, NY',
    summary: 'Built full-stack data analytics platforms, interactive data visualization dashboards, and scalable REST/gRPC microservices.',
    highlights: [
      'Developed responsive React/TypeScript analytics suites for real-time telemetry streaming.',
      'Designed PostgreSQL and Redis data models supporting high-concurrency client dashboards.',
      'Implemented automated unit, integration, and E2E testing workflows.'
    ],
    technologies: ['TypeScript', 'React', 'Node.js', 'Python', 'PostgreSQL', 'Redis', 'Docker']
  }
];

export const capabilityGroups: CapabilityGroup[] = [
  {
    category: 'AI & Machine Learning Engineering',
    description: 'Model architecture, training pipeline hygiene, quantization, vector retrieval, and uncertainty quantification.',
    skills: ['PyTorch', 'ONNX Runtime', 'Vector DBs (Qdrant, Pinecone)', 'Transformer Architecture', 'Quantization (INT8/INT4)', 'RAG & Hybrid Search', 'Scikit-Learn']
  },
  {
    category: 'Application Engineering & Frontend',
    description: 'Building responsive, accessible, high-performance web applications and progressive web apps.',
    skills: ['React 19', 'TypeScript', 'CSS Modules / Design Tokens', 'Vite & PWA', 'State Management', 'Web Workers', 'WebGL / R3F', 'WCAG AA Accessibility']
  },
  {
    category: 'Systems Architecture & Infrastructure',
    description: 'Designing low-latency APIs, event-driven streaming pipelines, and efficient native code runtimes.',
    skills: ['Python (FastAPI, Asyncio)', 'C++20 & SIMD', 'Rust & WebAssembly', 'Apache Kafka & PySpark', 'Redis & DuckDB', 'Docker & Kubernetes', 'CI/CD Pipelines']
  },
  {
    category: 'Engineering & ML Working Principles',
    description: 'Core methodologies guiding technical choices, system design, trade-off evaluations, and team execution.',
    skills: ['System Design Thinking', 'Reproducible ML Pipelines', 'Empirical Latency Benchmarking', 'Defensive System Design', 'Accessibility First', 'Progressive Enhancement']
  }
];
