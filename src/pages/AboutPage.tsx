import React from 'react';
import { profileData } from '../content/profile';
import SectionHeading from '../components/ui/SectionHeading';
import Callout from '../components/ui/Callout';
import styles from './AboutPage.module.css';

export const AboutPage: React.FC = () => {
  return (
    <div className="container">
      <header className={styles.header}>
        <SectionHeading
          eyebrow="Profile & Background"
          title="About & Engineering Philosophy"
          description="Combining foundational computer science principles, system architecture, and modern machine learning application engineering."
          level={1}
        />
      </header>

      <article className={styles.bioSection}>
        {profileData.bio.map((paragraph, idx) => (
          <p key={idx} className={styles.bioParagraph}>
            {paragraph}
          </p>
        ))}
      </article>

      {/* Working Principles */}
      <section className={styles.section} aria-labelledby="principles-heading">
        <SectionHeading
          eyebrow="Methodology"
          title="Engineering & ML Working Principles"
          description="The core tenets that guide technical decisions, system design trade-offs, and software craft."
        />

        <div className={styles.grid}>
          {profileData.workingPrinciples.map((principle) => (
            <Callout key={principle.title} type="decision" title={principle.title}>
              {principle.description}
            </Callout>
          ))}
        </div>
      </section>

      {/* Education & Credentials */}
      <section className={styles.section} aria-labelledby="education-heading">
        <SectionHeading
          eyebrow="Academic Credentials"
          title="Education & Foundations"
        />

        <div className={styles.grid}>
          {profileData.education.map((edu) => (
            <div key={edu.degree} className={styles.card}>
              <h3 className={styles.cardTitle}>{edu.degree} — {edu.field}</h3>
              <p className={styles.cardSub}>{edu.institution} • {edu.year}</p>
              {edu.honors && <p className={styles.cardDesc}>{edu.honors}</p>}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
