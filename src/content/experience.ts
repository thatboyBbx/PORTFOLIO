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

export interface CapabilityGroup { category: string; skills: string[]; }

export const experienceData: ExperienceItem[] = [
  {
    id: 'ministry-ict-attachment',
    role: 'Industrial Attachment — Applications Development, AI Team & Digital Skills Training',
    organization: 'Ministry of Information Communication Technology, Postal and Courier Services',
    period: 'Nov 2024 – Aug 2025',
    location: 'Harare, Zimbabwe',
    summary: 'A nine-month placement spanning application development, automation-focused AI initiatives, and digital skills training in a public-sector ICT environment.',
    highlights: [
      'Developed and maintained internal ministry applications using Python, C#, Java, HTML, and Firebase-backed data handling.',
      'Applied machine learning techniques to operational data for automation-focused AI initiatives.',
      'Delivered digital skills training to stakeholders and translated technical concepts into accessible material.',
      'Worked across Applications Development, AI Initiatives, and Digital Skills Training teams.'
    ],
    technologies: ['Python', 'C#', 'Java', 'HTML', 'Firebase', 'Machine Learning']
  }
];

export const capabilityGroups: CapabilityGroup[] = [
  { category: 'APPLICATION', skills: ['Python', 'React', 'FastAPI', 'Firebase', 'JavaScript/TypeScript', 'HTML/CSS'] },
  { category: 'AI / ML', skills: ['TensorFlow', 'PyTorch', 'scikit-learn', 'XGBoost', 'Deep Learning', 'NLP', 'Computer Vision'] },
  { category: 'DATA & ANALYTICS', skills: ['Pandas', 'SQL', 'Data Mining', 'Data Cleaning & Analysis', 'OCR', 'Recommender Systems'] },
  { category: 'TOOLS & PLATFORMS', skills: ['Firestore', 'Git', 'Unity'] }
];
