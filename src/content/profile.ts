export interface ProfileData {
  name: string;
  headline: string;
  subheadline: string;
  bio: string[];
  education: {
    degree: string;
    field: string;
    institution: string;
    year: string;
    honors?: string;
  }[];
  workingPrinciples: {
    title: string;
    description: string;
  }[];
  contact: {
    email: string;
    location: string;
    github: string;
    linkedin: string;
    resumeUrl: string;
    availability: string;
  };
}

export const profileData: ProfileData = {
  name: 'Alex Vance',
  headline: 'Computer Scientist & Application Engineer specializing in AI/ML',
  subheadline: 'Designing, building, and shipping intelligent software systems—from neural retrieval models to high-throughput application runtimes.',
  bio: [
    'I am a Computer Scientist and Application Engineer with over 6 years of experience building intelligent applications and data systems. My focus sits at the intersection of modern application development, machine learning engineering, and systems architecture.',
    'Rather than treating AI as an isolated model in a notebook or building simple wrapper web pages, I specialize in architecting complete, robust software products. That means designing low-latency vector search indices, building drift-resilient streaming feature stores, optimizing SIMD execution runtimes, and wrapping them in intuitive, accessible user interfaces.',
    'I hold a B.S. in Computer Science with an emphasis on Artificial Intelligence and Systems Engineering. I value technical clarity, empirical benchmarks, clean code organization, and deliberate visual design.'
  ],
  education: [
    {
      degree: 'Bachelor of Science (B.S.)',
      field: 'Computer Science & Software Engineering',
      institution: 'University of Technology',
      year: '2019',
      honors: 'Summa Cum Laude • Specialized in Machine Learning & Systems'
    }
  ],
  workingPrinciples: [
    {
      title: 'Systems Over Standalone Models',
      description: 'An AI model is only as effective as the data pipelines, serving infrastructure, score decomposition, and user interaction design surrounding it.'
    },
    {
      title: 'Empirical Evidence & Trade-Off Rigor',
      description: 'Every technical choice—from hybrid vector fusion algorithms to SIMD quantization kernels—must be justified by empirical benchmarks and clear trade-off evaluations.'
    },
    {
      title: 'Progressive Enhancement & Reliability',
      description: 'Essential content, navigation, and user actions must remain fast, accessible, and understandable across any network condition, device viewport, or reduced-motion preference.'
    },
    {
      title: 'Restrained Craft & Technical Clarity',
      description: 'Visual polish, typography, and motion serve to clarify technical content and hierarchy, never to mask missing substance or hinder content access.'
    }
  ],
  contact: {
    email: 'alex.vance.eng@example.com',
    location: 'San Francisco, CA / Remote',
    github: 'https://github.com/thatboyBbx',
    linkedin: 'https://linkedin.com/in/example-alex-vance',
    resumeUrl: '/resume-placeholder.pdf',
    availability: 'Open to Lead AI/ML Engineering & Systems Architecture roles'
  }
};
