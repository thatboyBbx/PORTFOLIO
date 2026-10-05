import React from 'react';
import { Link } from 'react-router-dom';
import type { CaseStudy } from '../../content/projects';
import styles from './ProjectCard.module.css';

export interface ProjectCardProps {
  project: CaseStudy;
  featured?: boolean;
  headingLevel?: 2 | 3;
  className?: string;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, featured = false, headingLevel = 2, className = '' }) => {
  const Heading = headingLevel === 2 ? 'h2' : 'h3';

  return (
    <article className={`${styles.card} ${featured ? styles.featured : ''} ${className}`}>
      <Link to={`/work/${project.slug}`} className={styles.link}>
        <Heading className={styles.title}>{project.title}</Heading>
        <p className={styles.description}>{project.tagline}</p>
        <span className={styles.arrow} aria-hidden="true">↗</span>
      </Link>
    </article>
  );
};

export default ProjectCard;
