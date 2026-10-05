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
    phone: string;
    location: string;
    github: string;
    linkedin: string;
    resumeUrl: string;
    availability: string;
    invitation: string;
  };
}

export const profileData: ProfileData = {
  name: "Panashe Bobojani",
  headline: "AI and software systems for real operational problems.",
  subheadline:
    "AI & Machine Learning graduate and software engineer based in Harare, Zimbabwe.",
  bio: [
    "I build software systems around real operational problems.",
    "My work sits between application development, systems thinking, and AI/ML — from workflow-heavy business applications to document intelligence and predictive systems.",
    "I completed a BSc Honours in Artificial Intelligence & Machine Learning at the University of Zimbabwe. I focus on software systems that solve concrete operational bottlenecks rather than standalone models or generic frontend interfaces.",
  ],
  education: [
    {
      degree: "BSc Honours",
      field: "Artificial Intelligence & Machine Learning",
      institution: "University of Zimbabwe",
      year: "2022–2026",
      honors: "2.1 (Upper Second Class Honours)",
    },
  ],
  workingPrinciples: [
    {
      title: "Systems Over Standalone Models",
      description:
        "An AI/ML component is valuable only when integrated cleanly into a robust application architecture and a real operational workflow.",
    },
    {
      title: "Intentional Technology Choices",
      description:
        "Every language, database, framework, or model choice must justify its existence based on project constraints, cost, and operational needs.",
    },
    {
      title: "Clear Technical Communication",
      description:
        "Interfaces and technical documentation should make complex systems understandable to both technical and non-technical stakeholders.",
    },
    {
      title: "Honest Engineering Statements",
      description:
        "Technical depth includes being explicit about system boundaries, trade-offs, known limitations, and current project status.",
    },
  ],
  contact: {
    email: "panasheshaunbobojani@gmail.com",
    phone: "+263 78 069 6934",
    location: "Harare, Zimbabwe / Remote",
    github: "https://github.com/thatboyBbx",
    linkedin: "https://www.linkedin.com/in/panashe-bobojani-434064303/",
    resumeUrl: "/Panashe_Bobojani_CV.pdf",
    availability:
      "Open to graduate and junior software engineering and AI/ML roles, plus project collaborations",
    invitation:
      "I’m open to graduate and junior roles in software engineering, AI/ML, and workflow automation, as well as project collaborations. If my work fits your team or project, get in touch.",
  },
};
