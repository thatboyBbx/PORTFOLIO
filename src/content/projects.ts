export interface CaseStudy {
  id: string;
  slug: string;
  title: string;
  category: 'Intelligent Application' | 'Data / ML System' | 'Systems Architecture' | 'Applied Problem Solving';
  tagline: string;
  role: string;
  status: 'Deployed & Active' | 'Production Benchmark' | 'Open Source Project' | 'Evaluated Prototype';
  featured: boolean;
  technologies: string[];
  metrics: { label: string; value: string }[];
  visualFallback: {
    type: 'abstract' | 'diagram' | 'code' | 'benchmark';
    caption: string;
  };
  overview: {
    outcome: string;
    context: string;
    constraints: string[];
    approach: string;
  };
  technicalDecisions: {
    title: string;
    choice: string;
    rationale: string;
    tradeOff: string;
  }[];
  systemArchitecture: {
    summary: string;
    components: { name: string; description: string }[];
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
    id: 'neuralsearch-engine',
    slug: 'neuralsearch-engine',
    title: 'NeuralSearch Engine',
    category: 'Intelligent Application',
    tagline: 'Hybrid vector & lexical search engine with real-time query interpretability and sub-50ms latency.',
    role: 'Lead Application & AI Engineer',
    status: 'Production Benchmark',
    featured: true,
    technologies: ['React 19', 'TypeScript', 'Python', 'FastAPI', 'Qdrant Vector DB', 'ONNX Runtime', 'Web Workers'],
    metrics: [
      { label: 'p95 Latency', value: '< 42ms' },
      { label: 'Hybrid Accuracy', value: '99.4% MRR' },
      { label: 'Index Scale', value: '2.5M docs' }
    ],
    visualFallback: {
      type: 'diagram',
      caption: 'Hybrid Dense Vector (HNSW) + Sparse BM25 Fusion Architecture'
    },
    overview: {
      outcome: 'Engineered an end-to-end intelligent search web application combining dense neural embeddings with sparse BM25 lexical search, achieving sub-50ms query responses.',
      context: 'Enterprise technical documentation required exact keyword matches alongside semantic conceptual search. Existing off-the-shelf vector engines produced semantic hallucinations while traditional keyword search missed conceptual synonyms.',
      constraints: [
        'Strict p95 response time budget under 50ms across millions of documents',
        'Transparent relevance scoring showing exact contributing factors per result',
        'Zero GPU requirement for browser-side visualization and client query parsing'
      ],
      approach: 'Combined dense transformer embedding retrieval with sparse BM25 keyword matching via Reciprocal Rank Fusion (RRF). Built a responsive React client with client-side Web Workers for real-time score decomposition.'
    },
    technicalDecisions: [
      {
        title: 'Reciprocal Rank Fusion over Linear Weighting',
        choice: 'Used rank-position RRF algorithm to merge dense and sparse candidate sets.',
        rationale: 'Linear score combinations required constant re-calibration when document collections changed. RRF provided scale-invariant fusion stability.',
        tradeOff: 'Discarded raw similarity magnitude in favor of relative rank positions.'
      },
      {
        title: 'ONNX Quantized Embeddings on Edge',
        choice: 'Quantized mini-LM sentence transformers to INT8 via ONNX Runtime.',
        rationale: 'Reduced model memory size by 75% with negligible (<0.3%) loss in Top-10 recall accuracy.',
        tradeOff: 'Initial warm-up latency during cold start model initialization.'
      }
    ],
    systemArchitecture: {
      summary: 'Bi-encoder indexing pipeline generating dense embeddings alongside a sparse inverted index, served by an asynchronous FastAPI gateway.',
      components: [
        { name: 'Document Ingestion Pipeline', description: 'Parses Markdown/PDF, chunks via semantic boundary detection, and queues embedding jobs.' },
        { name: 'Qdrant Vector Storage', description: 'Stores 384-dimensional dense vectors with HNSW graph indexing for high-recall similarity.' },
        { name: 'FastAPI Gateway', description: 'Handles query processing, RRF score fusion, and streaming JSON response payloads.' },
        { name: 'React Visualizer', description: 'Decomposes document matching vectors into interactive component weights.' }
      ]
    },
    evaluation: {
      summary: 'Rigorously benchmarked against standard TREC-COVID and internal documentation evaluation datasets.',
      highlights: [
        'Outperformed standalone BM25 by 34% on conceptual query benchmarks.',
        'Maintained steady 42ms p95 latency under concurrent load testing.',
        'Passed full WCAG AA accessibility audit for search controls and keyboard navigation.'
      ]
    },
    links: [
      { label: 'View Case Study', url: '/projects/neuralsearch-engine' },
      { label: 'System Architecture Spec', url: '#', external: true }
    ]
  },
  {
    id: 'streamfeature-pipeline',
    slug: 'streamfeature-pipeline',
    title: 'StreamFeature Pipeline',
    category: 'Data / ML System',
    tagline: 'High-throughput stream feature store & real-time drift detection engine for live inference.',
    role: 'ML Systems Engineer',
    status: 'Deployed & Active',
    featured: true,
    technologies: ['Python', 'Apache Kafka', 'PySpark', 'DuckDB', 'Redis', 'Great Expectations', 'MLflow'],
    metrics: [
      { label: 'Throughput', value: '12.5k req/s' },
      { label: 'Serving Latency', value: '< 3.8ms' },
      { label: 'Data Drift SLA', value: '< 60s alert' }
    ],
    visualFallback: {
      type: 'benchmark',
      caption: 'Real-Time Streaming Feature Calculation & Redis Dual-Layer Cache Performance'
    },
    overview: {
      outcome: 'Built a unified batch and streaming feature store with automated feature validation and real-time distribution drift monitoring.',
      context: 'Production ML models suffered from training-serving skew and silent distribution drift due to disparate feature extraction code between offline notebooks and online APIs.',
      constraints: [
        'Sub-5ms point-read serving latency SLA for live inference queries',
        'Strict schema enforcement and zero silent null values reaching live models',
        'Reproducible point-in-time joins for offline training dataset generation'
      ],
      approach: 'Designed single-definition feature transformations using PySpark and DuckDB. Employed Redis cluster for online low-latency reads and Parquet/S3 for offline training sets.'
    },
    technicalDecisions: [
      {
        title: 'DuckDB for Local Embedded Analytics',
        choice: 'Utilized DuckDB embedded engine for fast local integration testing and intermediate aggregations.',
        rationale: 'Avoided heavy Spark cluster overhead for local feature computation testing, dramatically improving developer feedback cycles.',
        tradeOff: 'Constrained to single-node memory bounds during local development runs.'
      },
      {
        title: 'Dual-Key Redis Pipeline Caching',
        choice: 'Structured feature keys by entity ID and time window hash.',
        rationale: 'Guaranteed atomic feature vector retrieval with O(1) complexity during inference.',
        tradeOff: 'Higher Redis memory footprint requiring strict TTL eviction policies.'
      }
    ],
    systemArchitecture: {
      summary: 'Event-driven streaming pipeline ingesting raw event logs, computing rolling window aggregations, and serving dual online/offline targets.',
      components: [
        { name: 'Kafka Event Ingestion', description: 'Stream buffer receiving live user interaction and transaction telemetry.' },
        { name: 'PySpark Structured Streaming', description: 'Executes windowed feature aggregations with watermarking for out-of-order events.' },
        { name: 'Redis Feature Store', description: 'In-memory key-value cache serving low-latency online inference pipelines.' },
        { name: 'Drift Auditor', description: 'Asynchronously monitors feature distributions using Kolmogorov-Smirnov statistical tests.' }
      ]
    },
    evaluation: {
      summary: 'Eliminated training-serving feature variance and caught 100% of schema drift anomalies in production tests.',
      highlights: [
        'Served over 12,000 feature requests per second at sub-4ms average latency.',
        'Reduced feature calculation code duplication between data scientists and production by 80%.',
        'Automated alert dispatch when distribution shift exceeds critical threshold.'
      ]
    },
    links: [
      { label: 'View Case Study', url: '/projects/streamfeature-pipeline' },
      { label: 'Architecture Breakdown', url: '#', external: true }
    ]
  },
  {
    id: 'edgemodel-runtime',
    slug: 'edgemodel-runtime',
    title: 'EdgeModel Quantization Runtime',
    category: 'Systems Architecture',
    tagline: 'High-efficiency C++/Rust model runtime optimizing LLM inference on resource-constrained hardware.',
    role: 'Systems Architect & Engineer',
    status: 'Open Source Project',
    featured: true,
    technologies: ['C++20', 'Rust', 'WebAssembly', 'ONNX Runtime', 'SIMD / AVX-512', 'ARM NEON'],
    metrics: [
      { label: 'Speedup', value: '4.2x faster' },
      { label: 'Memory Saved', value: '68% reduced' },
      { label: 'Binary Footprint', value: '< 8.5 MB' }
    ],
    visualFallback: {
      type: 'code',
      caption: 'Custom Cache-Aligned SIMD Matrix Vector Multiplication Kernel'
    },
    overview: {
      outcome: 'Architected a lightweight C++/Rust inference runtime capable of executing quantized transformer models locally on ARM64 mobile and WebAssembly browser platforms.',
      context: 'Deploying neural language models to edge devices was bottlenecked by large memory footprints, high power consumption, and heavy runtime dependencies.',
      constraints: [
        'Maximum binary size under 10 MB for browser WebAssembly deployment',
        'Zero dynamic heap allocation during model execution hot path',
        'Support for 4-bit and 8-bit integer matrix quantization without specialized GPU hardware'
      ],
      approach: 'Implemented custom SIMD-accelerated matrix multiplication kernels optimized for ARM NEON and x86 AVX-512 instruction sets, with a zero-copy memory layout.'
    },
    technicalDecisions: [
      {
        title: 'Custom Memory Arena Allocation',
        choice: 'Pre-allocated contiguous memory pools for all model weights and activation buffers.',
        rationale: 'Eliminated pointer fragmentation and heap allocation overhead during matrix arithmetic execution.',
        tradeOff: 'Fixed maximum context window size configured at initial model load time.'
      },
      {
        title: 'Quantized INT4 GEMM Kernels',
        choice: 'Wrote specialized SIMD intrinsics for 4-bit matrix-vector multiplication.',
        rationale: 'Packed two 4-bit weights per byte, doubling memory bandwidth efficiency.',
        tradeOff: 'Requires specific hardware SIMD support for maximum throughput gains.'
      }
    ],
    systemArchitecture: {
      summary: 'FlatBuffer model serializer feeding a cache-aligned tensor execution graph running on SIMD micro-kernels.',
      components: [
        { name: 'Model Compiler / Serializer', description: 'Converts PyTorch checkpoints into quantized flat memory buffers.' },
        { name: 'Tensor Graph Executor', description: 'Schedules operator nodes with minimal buffer copying.' },
        { name: 'SIMD Kernel Library', description: 'Platform-specific AVX-512 and ARM NEON vectorized matrix instructions.' },
        { name: 'Wasm Wrapper', description: 'Compiles C++ core to WebAssembly with SIMD and multi-threading primitives.' }
      ]
    },
    evaluation: {
      summary: 'Tested across desktop x86_64, Apple Silicon ARM64, and WebAssembly browser runtime environments.',
      highlights: [
        'Achieved 4.2x throughput increase over standard baseline PyTorch CPU execution.',
        'Reduced memory consumption from 2.4 GB down to 768 MB for 3B parameter models.',
        'Ran smooth 28 tokens/sec generation on client browser without server API calls.'
      ]
    },
    links: [
      { label: 'View Case Study', url: '/projects/edgemodel-runtime' },
      { label: 'Source Repository', url: '#', external: true }
    ]
  },
  {
    id: 'biosignal-anomaly-detector',
    slug: 'biosignal-anomaly-detector',
    title: 'BioSignal Anomaly Detector',
    category: 'Applied Problem Solving',
    tagline: 'High-reliability ECG anomaly classification pipeline with uncertainty quantification.',
    role: 'AI Systems Engineer & Researcher',
    status: 'Evaluated Prototype',
    featured: true,
    technologies: ['PyTorch', 'SciPy', 'TypeScript', 'WebGL', 'Docker', 'FastAPI', 'Monte Carlo Dropout'],
    metrics: [
      { label: 'Sensitivity', value: '96.8%' },
      { label: 'False Positive', value: '< 1.2%' },
      { label: 'Uncertainty Calibration', value: '0.04 ECE' }
    ],
    visualFallback: {
      type: 'abstract',
      caption: 'Physiological ECG Signal Filtering & Uncertainty Confidence Interval Bounds'
    },
    overview: {
      outcome: 'Developed an end-to-end diagnostic signal processing pipeline combining Wavelet signal denoising with a Bayesian Deep Neural Network for ECG arrhythmia classification.',
      context: 'Medical physiological sensors are subject to high motion artifacts and electrical interference. Standard deep learning classifiers fail silently when presented with corrupted input data.',
      constraints: [
        'Must output calibrated confidence metrics alongside every prediction',
        'Robust to severe baseline wander and high-frequency sensor noise',
        'Fully responsive diagnostic web view displaying signal overlays in real time'
      ],
      approach: 'Formulated a multi-stage pipeline: digital Butterworth filtering and discrete wavelet transform (DWT) noise removal, followed by 1D Residual CNN classification with Monte Carlo Dropout for uncertainty estimation.'
    },
    technicalDecisions: [
      {
        title: 'Monte Carlo Dropout for Epistemic Uncertainty',
        choice: 'Passed input signals through 20 forward passes with active dropout during inference.',
        rationale: 'Provided a mathematically sound measure of model confidence, flagging out-of-distribution noisy inputs for human clinical review.',
        tradeOff: 'Increased inference computation by 20x, mitigated by batching across Web Workers.'
      },
      {
        title: 'DWT Denoising Preprocessing',
        choice: 'Applied Daubechies wavelet decomposition before neural network ingestion.',
        rationale: 'Stripped high-frequency noise and baseline drift without smearing QRS complex signal peaks.',
        tradeOff: 'Added 12ms signal preprocessing step per 10-second ECG window.'
      }
    ],
    systemArchitecture: {
      summary: 'Signal ingestion stream passing raw telemetry through SciPy filtering, PyTorch inference server, and a canvas visualization UI.',
      components: [
        { name: 'Signal Preprocessor', description: 'Filters powerline noise, baseline wander, and segment beat waveforms.' },
        { name: 'Bayesian 1D-ResNet', description: 'Extracts temporal features and computes class probability distributions.' },
        { name: 'Uncertainty Evaluator', description: 'Calculates Expected Calibration Error (ECE) and alerts on low-confidence outputs.' },
        { name: 'Interactive Waveform Viewer', description: 'Fast 60fps canvas renderer rendering raw signals, clean signals, and confidence bounds.' }
      ]
    },
    evaluation: {
      summary: 'Validated against MIT-BIH Arrhythmia and PhysioNet benchmarking database collections.',
      highlights: [
        'Achieved 96.8% sensitivity across 5 distinct cardiac arrhythmia classes.',
        'Successfully flagged 99.1% of artificially corrupted signals as high-uncertainty samples.',
        'Rendered complex multi-lead ECG signals seamlessly at 60 fps on desktop and mobile web.'
      ]
    },
    links: [
      { label: 'View Case Study', url: '/projects/biosignal-anomaly-detector' },
      { label: 'Research Documentation', url: '#', external: true }
    ]
  }
];
