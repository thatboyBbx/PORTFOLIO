import React from 'react';
import { Link } from 'react-router-dom';
import { experienceData } from '../content/experience';
import TagList from '../components/ui/TagList';
import styles from './ExperiencePage.module.css';

export const ExperiencePage: React.FC = () => {
  return (
    <div className="container" style={{ padding: 'var(--space-12) var(--space-4) var(--space-24) var(--space-4)' }}>
      <header className={styles.header}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs)', color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 'var(--space-2)' }}>
          CAREER HISTORY
        </div>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.2rem, 5vw, 3.5rem)', marginBottom: 'var(--space-4)' }}>
          Experience
        </h1>
        <p style={{ fontSize: 'var(--text-xl)', color: 'var(--text-secondary)', maxWidth: 'var(--max-width-prose)' }}>
          Practical experience in application development, applied AI, and digital skills training.
        </p>
      </header>

      {/* Timeline Section */}
      <section className={styles.section} aria-labelledby="roles-heading">
        <h2 id="roles-heading" style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-2xl)', marginBottom: 'var(--space-6)' }}>
          Professional experience
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

      <div className={styles.section}>
        <Link to="/work">Explore the project case studies →</Link>
      </div>
    </div>
  );
};

export default ExperiencePage;
