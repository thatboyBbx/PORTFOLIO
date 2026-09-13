import React from 'react';
import { projectsData } from '../content/projects';
import SectionHeading from '../components/ui/SectionHeading';
import ProjectCard from '../components/ui/ProjectCard';
import styles from './ProjectsPage.module.css';

export const ProjectsPage: React.FC = () => {
  return (
    <div className="container">
      <header className={styles.header}>
        <SectionHeading
          eyebrow="Portfolio Index"
          title="Case Studies & Engineering Projects"
          description="Detailed technical documentations of 4 core projects: an intelligent search web app, streaming feature store, SIMD model execution runtime, and physiological anomaly classifier."
          level={1}
        />
      </header>

      <div className={styles.grid}>
        {projectsData.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
};

export default ProjectsPage;
