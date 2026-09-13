import React from 'react';
import { profileData } from '../content/profile';
import { capabilityGroups } from '../content/experience';
import styles from './AboutPage.module.css';

export const AboutPage: React.FC = () => {
  return (
    <div className="container" style={{ padding: 'var(--space-12) var(--space-4) var(--space-24) var(--space-4)' }}>
      <header className={styles.header}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs)', color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 'var(--space-2)' }}>
          ABOUT & BACKGROUND
        </div>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-3xl)', marginBottom: 'var(--space-4)' }}>
          Panashe Bobojani
        </h1>
        <p style={{ fontSize: 'var(--text-xl)', color: 'var(--text-secondary)', maxWidth: 'var(--max-width-prose)' }}>
          I build software systems around real operational problems.
        </p>
      </header>

      <article className={styles.bioSection}>
        {profileData.bio.map((paragraph, idx) => (
          <p key={idx} className={styles.bioParagraph}>
            {paragraph}
          </p>
        ))}
      </article>

      {/* Technical Capabilities */}
      <section className={styles.section} aria-labelledby="skills-heading">
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs)', color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 'var(--space-2)' }}>
          TECHNICAL PROFILE
        </div>
        <h2 id="skills-heading" style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-2xl)', marginBottom: 'var(--space-6)' }}>
          Grouped Capabilities
        </h2>

        <div className={styles.grid}>
          {capabilityGroups.map((group) => (
            <div key={group.category} className={styles.card}>
              <h3 style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs)', color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                {group.category}
              </h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 'var(--space-1)' }}>
                {group.skills.map((skill) => (
                  <li key={skill} style={{ fontSize: 'var(--text-sm)', color: 'var(--text-primary)' }}>
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Principles */}
      <section className={styles.section} aria-labelledby="principles-heading">
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs)', color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 'var(--space-2)' }}>
          ENGINEERING METHODOLOGY
        </div>
        <h2 id="principles-heading" style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-2xl)', marginBottom: 'var(--space-6)' }}>
          Working Principles
        </h2>

        <div className={styles.grid}>
          {profileData.workingPrinciples.map((principle) => (
            <div key={principle.title} className={styles.card}>
              <h3 className={styles.cardTitle}>{principle.title}</h3>
              <p className={styles.cardDesc}>{principle.description}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
