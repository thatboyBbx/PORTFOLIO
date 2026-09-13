import React from 'react';
import { Link } from 'react-router-dom';
import type { CaseStudy } from '../../content/projects';
import TechnicalPanel from './TechnicalPanel';
import StatusBadge from './StatusBadge';
import styles from './ProjectCard.module.css';

export interface ProjectCardProps {
  project: CaseStudy;
  className?: string;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, className = '' }) => {
  const techItems = project.technologies.slice(0, 4).map((tech) => ({
    label: 'TECH',
    value: tech,
  }));

  return (
    <article className={`${styles.record} ${className}`}>
      <div className={styles.recordInner}>
        <div>
          <div className={styles.number}>{project.number}</div>

          <div className={styles.titleRow}>
            <h3 className={styles.title}>{project.title}</h3>
            <StatusBadge status={project.status} />
          </div>

          <p className={styles.tagline}>{project.tagline}</p>

          <div className={styles.summaryFlow}>
            <div className={styles.flowItem}>
              <span className={styles.flowLabel}>Problem →</span>
              <span>{project.overview.constraints[0] || 'Operational workflow bottleneck'}</span>
            </div>
            <div className={styles.flowItem}>
              <span className={styles.flowLabel}>System →</span>
              <span>{project.overview.outcome.slice(0, 90)}...</span>
            </div>
          </div>

          <div className={styles.actionRow}>
            <Link to={`/work/${project.slug}`} className={styles.actionLink}>
              View case file →
            </Link>
          </div>
        </div>

        <div>
          <TechnicalPanel
            title={`${project.title.toUpperCase()} SPEC`}
            badge={project.status.toUpperCase()}
            items={techItems}
          />
        </div>
      </div>
    </article>
  );
};

export default ProjectCard;
