import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { projectsData } from '../content/projects';
import StatusBadge from '../components/ui/StatusBadge';
import TechnicalPanel from '../components/ui/TechnicalPanel';
import MediaFrame from '../components/ui/MediaFrame';
import styles from './CaseStudyPage.module.css';

export const CaseStudyPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const project = projectsData.find((p) => p.slug === slug);

  if (!project) {
    return <Navigate to="/404" replace />;
  }

  const sectionNav = [
    { id: 'context', label: '01 Context' },
    { id: 'problem', label: '02 Problem' },
    { id: 'system', label: '03 System' },
    { id: 'architecture', label: '04 Architecture' },
    { id: 'aiml', label: '05 AI / ML' },
    { id: 'interface', label: '06 Interface' },
    { id: 'decisions', label: '07 Decisions' },
    { id: 'outcome', label: '08 Outcome' },
  ];

  const techPanelItems = project.technologies.map((t) => ({
    label: 'COMPONENT',
    value: t,
  }));

  return (
    <article className={`container ${styles.container}`}>
      <Link to="/work" className={styles.backLink}>
        ← All work
      </Link>

      <header className={styles.header}>
        <div className={styles.projectNum}>PROJECT {project.number}</div>
        <h1 className={styles.title}>{project.title}</h1>
        <p className={styles.tagline}>{project.overview.outcome}</p>
        <StatusBadge status={project.status} />
      </header>

      <div className={styles.caseLayout}>
        {/* Sticky Local Section Index Navigation */}
        <nav className={styles.stickyNav} aria-label="Case File Navigation">
          {sectionNav.map((sec) => (
            <a key={sec.id} href={`#${sec.id}`} className={styles.navSectionItem}>
              {sec.label}
            </a>
          ))}
        </nav>

        <div>
          {/* 01 Context */}
          <section id="context" className={styles.section}>
            <div className={styles.sectionHeader}>01 CONTEXT</div>
            <h2 className={styles.sectionTitle}>Operational Environment</h2>
            <p className={styles.prose}>{project.overview.context}</p>
          </section>

          {/* 02 Problem */}
          <section id="problem" className={styles.section}>
            <div className={styles.sectionHeader}>02 PROBLEM</div>
            <h2 className={styles.sectionTitle}>What was happening before?</h2>
            <p className={styles.prose}>
              The primary challenge centered on inefficient manual processing and workflow operational delays:
            </p>
            <ul style={{ paddingLeft: 'var(--space-5)', color: 'var(--text-secondary)', fontSize: 'var(--text-base)' }}>
              {project.overview.constraints.map((c, idx) => (
                <li key={idx} style={{ marginBottom: 'var(--space-2)' }}>{c}</li>
              ))}
            </ul>
          </section>

          {/* 03 System */}
          <section id="system" className={styles.section}>
            <div className={styles.sectionHeader}>03 SYSTEM</div>
            <h2 className={styles.sectionTitle}>What was actually built?</h2>
            <p className={styles.prose}>{project.overview.approach}</p>

            {project.pipelineSteps && (
              <div className={styles.pipelineList}>
                {project.pipelineSteps.map((s) => (
                  <div key={s.step} className={styles.pipelineStep}>
                    <div className={styles.stepHeader}>
                      <span className={styles.stepNum}>{s.step}</span>
                      <span className={styles.stepLabel}>{s.label}</span>
                    </div>
                    <p className={styles.stepDetail}>{s.detail}</p>
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* 04 Architecture */}
          <section id="architecture" className={styles.section}>
            <div className={styles.sectionHeader}>04 ARCHITECTURE</div>
            <h2 className={styles.sectionTitle}>System Design & Topology</h2>
            <p className={styles.prose}>{project.systemArchitecture.summary}</p>

            <TechnicalPanel
              title={`${project.title.toUpperCase()} ARCHITECTURE`}
              badge="MODULAR MONOLITH"
              items={techPanelItems}
              asciiDiagram={project.systemArchitecture.asciiDiagram}
            />
          </section>

          {/* 05 AI / ML */}
          <section id="aiml" className={styles.section}>
            <div className={styles.sectionHeader}>05 AI / ML</div>
            <h2 className={styles.sectionTitle}>Model & Processing Design</h2>
            <p className={styles.prose}>
              Rather than calling generic opaque APIs, domain-specific models were selected and evaluated to deliver deterministic, transparent results.
            </p>
            <MediaFrame type={project.visualFallback.type} caption={project.visualFallback.caption} />
          </section>

          {/* 06 Interface */}
          <section id="interface" className={styles.section}>
            <div className={styles.sectionHeader}>06 INTERFACE</div>
            <h2 className={styles.sectionTitle}>User Workspace & Interface</h2>
            <p className={styles.prose}>
              Designed for operational clarity with high-contrast text, clear status indicators, and keyboard-navigable controls.
            </p>
          </section>

          {/* 07 Decisions */}
          <section id="decisions" className={styles.section}>
            <div className={styles.sectionHeader}>07 DECISIONS</div>
            <h2 className={styles.sectionTitle}>Engineering Trade-Offs</h2>
            <div className={styles.decisionsGrid}>
              {project.technicalDecisions.map((dec) => (
                <div key={dec.title} className={styles.decisionCard}>
                  <h3 className={styles.decisionTitle}>{dec.title}</h3>
                  <div className={styles.decisionChoice}>Choice: {dec.choice}</div>
                  <p className={styles.decisionRationale}>{dec.rationale}</p>
                  <p className={styles.decisionTradeOff}>Trade-off: {dec.tradeOff}</p>
                </div>
              ))}
            </div>
          </section>

          {/* 08 Outcome */}
          <section id="outcome" className={styles.section}>
            <div className={styles.sectionHeader}>08 OUTCOME</div>
            <h2 className={styles.sectionTitle}>Result & Evaluation</h2>
            <p className={styles.prose}>{project.evaluation.summary}</p>
            <ul style={{ paddingLeft: 'var(--space-5)', color: 'var(--text-secondary)' }}>
              {project.evaluation.highlights.map((h, idx) => (
                <li key={idx} style={{ marginBottom: 'var(--space-2)' }}>{h}</li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </article>
  );
};

export default CaseStudyPage;
