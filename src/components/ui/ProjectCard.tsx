import React from 'react';
import { Link } from 'react-router-dom';
import { CaseStudy } from '../../content/projects';
import TagList from './TagList';
import styles from './ProjectCard.module.css';

export interface ProjectCardProps {
  project: CaseStudy;
  className?: string;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, className = '' }) => {
  return (
    <Link to={`/projects/${project.slug}`} className={`${styles.card} ${className}`}>
      <div className={styles.cardHeader}>
        <div className={styles.metaRow}>
          <span className={styles.category}>{project.category}</span>
          <span className={styles.status}>{project.status}</span>
        </div>
        <h3 className={styles.title}>{project.title}</h3>
        <p className={styles.tagline}>{project.tagline}</p>
      </div>

      <div className={styles.metricsRow}>
        {project.metrics.map((metric) => (
          <div key={metric.label} className={styles.metricItem}>
            <span className={styles.metricValue}>{metric.value}</span>
            <span className={styles.metricLabel}>{metric.label}</span>
          </div>
        ))}
      </div>

      <div className={styles.cardFooter}>
        <span className={styles.roleText}>Role: {project.role}</span>
        <TagList tags={project.technologies.slice(0, 4)} />
      </div>
    </Link>
  );
};

export default ProjectCard;
