import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { projectsData } from '../content/projects';
import StatusBadge from '../components/ui/StatusBadge';
import TagList from '../components/ui/TagList';
import MediaFrame from '../components/ui/MediaFrame';
import Button from '../components/ui/Button';
import Callout from '../components/ui/Callout';
import styles from './CaseStudyPage.module.css';

export const CaseStudyPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const project = projectsData.find((p) => p.slug === slug);

  if (!project) {
    return <Navigate to="/404" replace />;
  }

  return (
    <article className={`container ${styles.container}`}>
      {/* Back to Projects Navigation */}
      <header className={styles.header}>
        <Link to="/projects" className={styles.backLink}>
          ← Back to Project Index
        </Link>

        <div className={styles.metaRow}>
          <span className={styles.category}>{project.category}</span>
          <StatusBadge status={project.status} />
        </div>

        <h1 className={styles.title}>{project.title}</h1>
        <p className={styles.outcome}>{project.overview.outcome}</p>

        <div className={styles.roleBar}>
          <div className={styles.roleItem}>
            <span className={styles.roleLabel}>Engineering Role</span>
            <span className={styles.roleValue}>{project.role}</span>
          </div>
          <div className={styles.roleItem}>
            <span className={styles.roleLabel}>Primary Domain</span>
            <span className={styles.roleValue}>{project.category}</span>
          </div>
          <div className={styles.roleItem}>
            <span className={styles.roleLabel}>Status</span>
            <span className={styles.roleValue}>{project.status}</span>
          </div>
        </div>

        {/* Key Benchmark Metrics */}
        <div className={styles.metricsGrid}>
          {project.metrics.map((m) => (
            <div key={m.label} className={styles.metricCard}>
              <span className={styles.metricValue}>{m.value}</span>
              <span className={styles.metricLabel}>{m.label}</span>
            </div>
          ))}
        </div>
      </header>

      {/* 1. Context & Problem Framing */}
      <section className={styles.section} aria-labelledby="context-heading">
        <h2 id="context-heading" className={styles.sectionTitle}>1. Problem & Context</h2>
        <p className={styles.paragraph}>{project.overview.context}</p>
      </section>

      {/* 2. Technical Constraints */}
      <section className={styles.section} aria-labelledby="constraints-heading">
        <h2 id="constraints-heading" className={styles.sectionTitle}>2. Constraints & Requirements</h2>
        <ul className={styles.constraintsList}>
          {project.overview.constraints.map((c, idx) => (
            <li key={idx}>{c}</li>
          ))}
        </ul>
      </section>

      {/* 3. System Architecture & Diagram */}
      <section className={styles.section} aria-labelledby="architecture-heading">
        <h2 id="architecture-heading" className={styles.sectionTitle}>3. Approach & System Architecture</h2>
        <p className={styles.paragraph}>{project.overview.approach}</p>
        <p className={styles.paragraph}>{project.systemArchitecture.summary}</p>

        <MediaFrame
          type={project.visualFallback.type}
          caption={project.visualFallback.caption}
        />

        <div className={styles.componentsGrid}>
          {project.systemArchitecture.components.map((comp) => (
            <div key={comp.name} className={styles.componentCard}>
              <div className={styles.componentName}>{comp.name}</div>
              <div className={styles.componentDesc}>{comp.description}</div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Technical Decisions & Trade-Offs */}
      <section className={styles.section} aria-labelledby="decisions-heading">
        <h2 id="decisions-heading" className={styles.sectionTitle}>4. Key Technical Decisions & Trade-Offs</h2>
        <div className={styles.decisionsGrid}>
          {project.technicalDecisions.map((dec) => (
            <div key={dec.title} className={styles.decisionCard}>
              <h3 className={styles.decisionTitle}>{dec.title}</h3>
              <p className={styles.decisionChoice}>Choice: {dec.choice}</p>
              <p className={styles.decisionRationale}>{dec.rationale}</p>
              <p className={styles.decisionTradeOff}>Trade-off: {dec.tradeOff}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Implementation & Technology Stack */}
      <section className={styles.section} aria-labelledby="tech-heading">
        <h2 id="tech-heading" className={styles.sectionTitle}>5. Technologies & Implementation</h2>
        <p className={styles.paragraph}>
          Built using a specialized technical stack tailored for performance, reliability, and maintainability:
        </p>
        <TagList tags={project.technologies} accent />
      </section>

      {/* 6. Evaluation & Measured Outcomes */}
      <section className={styles.section} aria-labelledby="evaluation-heading">
        <h2 id="evaluation-heading" className={styles.sectionTitle}>6. Evaluation & Outcomes</h2>
        <p className={styles.paragraph}>{project.evaluation.summary}</p>
        <Callout type="success" title="Benchmark Highlights">
          <ul style={{ paddingLeft: 'var(--space-4)', margin: 0 }}>
            {project.evaluation.highlights.map((h, idx) => (
              <li key={idx} style={{ marginBottom: 'var(--space-1)' }}>{h}</li>
            ))}
          </ul>
        </Callout>
      </section>

      {/* 7. External Links & Demos */}
      <section className={styles.section} aria-labelledby="links-heading">
        <h2 id="links-heading" className={styles.sectionTitle}>7. Links & Documentation</h2>
        <div className={styles.linksRow}>
          {project.links.map((link) => (
            <Button
              key={link.label}
              href={link.url}
              external={link.external}
              variant={link.external ? 'secondary' : 'primary'}
            >
              {link.label}
            </Button>
          ))}
        </div>
      </section>
    </article>
  );
};

export default CaseStudyPage;
