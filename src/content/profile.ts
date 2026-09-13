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
  name: 'Panashe Bobojani',
  headline: 'Software systems for real operational problems.',
  subheadline: 'Application development with an AI & ML specialization. Based in Harare, Zimbabwe.',
  bio: [
    'I build software systems around real operational problems.',
    'My work sits between application development, systems thinking, and AI/ML — from workflow-heavy business applications to document intelligence and predictive systems.',
    'My background is in Computer Science with a specialization in Artificial Intelligence and Machine Learning. I focus on software systems that solve concrete operational bottlenecks rather than building standalone models or generic frontend interfaces.'
  ],
  education: [
    {
      degree: 'Bachelor of Science (B.S.)',
      field: 'Computer Science & Software Engineering',
      institution: 'University of Technology',
      year: '2023',
      honors: 'Specialization in Artificial Intelligence & Machine Learning'
    }
  ],
  workingPrinciples: [
    {
      title: 'Systems Over Standalone Models',
      description: 'An AI/ML component is valuable only when integrated cleanly into a robust, stateful application architecture and real operational workflow.'
    },
    {
      title: 'Intentional Technology Choices',
      description: 'Every language, database, framework, or model choice must justify its existence based on project constraints, offline requirements, and operational SLAs.'
    },
    {
      title: 'Editorial Clarity & Restraint',
      description: 'Visual interfaces and technical documentations should present information clearly without distracting animations, purple AI gradients, or manufactured claims.'
    },
    {
      title: 'Honest Engineering Statements',
      description: 'Demonstrating technical depth means being explicit about system boundaries, trade-offs, known limitations, and current project status.'
    }
  ],
  contact: {
    email: 'panashe.bobojani@example.com',
    location: 'Harare, Zimbabwe / Remote',
    github: 'https://github.com/thatboyBbx',
    linkedin: 'https://linkedin.com/in/example-panashe-bobojani',
    resumeUrl: '/Panashe_Bobojani_CV.pdf',
    availability: 'Open to software engineering & AI/ML systems roles'
  }
};
