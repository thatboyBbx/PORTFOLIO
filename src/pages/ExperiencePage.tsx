import React from 'react';
import { experienceData, capabilityGroups } from '../content/experience';
import TagList from '../components/ui/TagList';
import styles from './ExperiencePage.module.css';

export const ExperiencePage: React.FC = () => {
  return (
    <div className="container" style={{ padding: 'var(--space-12) var(--space-4) var(--space-24) var(--space-4)' }}>
      <header className={styles.header}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs)', color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 'var(--space-2)' }}>
          CAREER HISTORY
        </div>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-3xl)', marginBottom: 'var(--space-4)' }}>
          Experience & Capabilities
        </h1>
        <p style={{ fontSize: 'var(--text-xl)', color: 'var(--text-secondary)', maxWidth: 'var(--max-width-prose)' }}>
          Selected engineering projects, systems architecture, and technical stack.
        </p>
      </header>

      {/* Timeline Section */}
      <section className={styles.section} aria-labelledby="roles-heading">
        <h2 id="roles-heading" style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-2xl)', marginBottom: 'var(--space-6)' }}>
          Selected Systems Impact
        </h2>

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

      {/* Grouped Capabilities */}
      <section className={styles.section} aria-labelledby="stack-heading">
        <h2 id="stack-heading" style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-2xl)', marginBottom: 'var(--space-6)' }}>
          Grouped Capabilities
        </h2>

        <div className={styles.grid}>
          {capabilityGroups.map((group) => (
            <div key={group.category} style={{ background: 'var(--surface)', padding: 'var(--space-6)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border)' }}>
              <h3 style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs)', color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 'var(--space-4)' }}>
                {group.category}
              </h3>
              <TagList tags={group.skills} />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ExperiencePage;
