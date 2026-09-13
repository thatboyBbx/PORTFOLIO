import React from 'react';
import { experienceData, capabilityGroups } from '../content/experience';
import SectionHeading from '../components/ui/SectionHeading';
import TagList from '../components/ui/TagList';
import styles from './ExperiencePage.module.css';

export const ExperiencePage: React.FC = () => {
  return (
    <div className="container">
      <header className={styles.header}>
        <SectionHeading
          eyebrow="Career History"
          title="Experience & Technical Stack"
          description="Selected software engineering roles, AI system deployments, and capabilities across application engineering and machine learning."
          level={1}
        />
      </header>

      {/* Timeline Section */}
      <section className={styles.section} aria-labelledby="roles-heading">
        <SectionHeading
          eyebrow="Employment Record"
          title="Selected Roles & Impact"
        />

        <div className={styles.timeline}>
          {experienceData.map((item) => (
            <article key={item.id} className={styles.timelineItem}>
              <div className={styles.itemHeader}>
                <div>
                  <h3 className={styles.role}>{item.role}</h3>
                  <span className={styles.org}>{item.organization}</span>
                </div>
                <span className={styles.meta}>{item.period} • {item.location}</span>
              </div>

              <p className={styles.summary}>{item.summary}</p>

              <ul className={styles.highlights}>
                {item.highlights.map((highlight, idx) => (
                  <li key={idx}>{highlight}</li>
                ))}
              </ul>

              <TagList tags={item.technologies} />
            </article>
          ))}
        </div>
      </section>

      {/* Technical Stack & Capabilities */}
      <section className={styles.section} aria-labelledby="stack-heading">
        <SectionHeading
          eyebrow="Capabilities Breakdown"
          title="Technical Stack & Methodologies"
        />

        <div className={styles.grid}>
          {capabilityGroups.map((group) => (
            <div key={group.category} style={{ background: 'var(--color-surface)', padding: 'var(--space-6)', borderRadius: 'var(--radius-xl)', border: '1px solid var(--color-border)' }}>
              <h3 style={{ fontSize: 'var(--text-h4)', marginBottom: 'var(--space-2)' }}>{group.category}</h3>
              <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-muted)', marginBottom: 'var(--space-4)' }}>{group.description}</p>
              <TagList tags={group.skills} />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ExperiencePage;
