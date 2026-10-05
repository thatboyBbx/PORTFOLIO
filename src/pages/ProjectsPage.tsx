import React from 'react';
import { projectsData } from '../content/projects';
import SectionHeading from '../components/ui/SectionHeading';
import ProjectCard from '../components/ui/ProjectCard';
import styles from './ProjectsPage.module.css';

export const ProjectsPage: React.FC = () => {
  const featuredIndex = projectsData.findIndex((project) => project.featured);

  return (
    <div className="container">
      <header className={styles.header}>
        <SectionHeading
          eyebrow="Portfolio Index"
          title="Case Studies & Engineering Projects"
          description="Selected work in document intelligence, information retrieval, and operational software."
          level={1}
        />
      </header>

      <div className={styles.grid}>
        {projectsData.map((project, index) => (
          <ProjectCard
            key={project.id}
            project={project}
            featured={index === featuredIndex}
          />
        ))}
      </div>
    </div>
  );
};

export default ProjectsPage;
