import React from 'react';
import { Link } from 'react-router-dom';
import { projectsData } from '../content/projects';
import { profileData } from '../content/profile';
import ProjectCard from '../components/ui/ProjectCard';
import styles from './LandingPage.module.css';

export const LandingPage: React.FC = () => {
  return (
    <>
      {/* Hero Section */}
      <section className={styles.hero} aria-labelledby="hero-title">
        <div className={`${styles.heroContent} container`}>
          <h1 id="hero-title" className={styles.title}>
            Software systems for real operational problems.
          </h1>

          <p className={styles.description}>
            {profileData.subheadline}
          </p>

          <div className={styles.actions}>
            <a href="#selected-work" className={styles.actionLink}>
              View selected work →
            </a>
          </div>
        </div>
      </section>

      <div className="container">
        {/* About Summary Section */}
        <section className={styles.aboutBox} aria-labelledby="about-summary-title">
        <div>
          <span className={styles.sectionTitle}>ABOUT</span>
        </div>
        <div>
          <h2 id="about-summary-title" style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-xl)', marginBottom: 'var(--space-4)' }}>
            Computer scientist. Application developer. AI/ML specialization.
          </h2>
          <p style={{ fontSize: 'var(--text-base)', color: 'var(--text-secondary)', marginBottom: 'var(--space-4)' }}>
            I build software systems around real operational problems. My work sits between application development, systems thinking, and AI/ML — from workflow-heavy business applications to document intelligence and predictive systems.
          </p>
          <Link to="/about" className={styles.actionLink}>
            Read full profile & principles →
          </Link>
        </div>
        </section>

        {/* Selected Work Section */}
        <section id="selected-work" className={styles.section} aria-labelledby="work-title">
        <div className={styles.sectionHeader}>
          <h2 id="work-title" className={styles.sectionTitle}>SELECTED WORK</h2>
          <span className={styles.sectionTitle}>{projectsData.length.toString().padStart(2, '0')} CASE FILES</span>
        </div>

        <div className={styles.workList}>
          {projectsData.map((project) => (
            <ProjectCard key={project.id} project={project} headingLevel={3} />
          ))}
        </div>
        </section>

        {/* Contact Section (Section 19 of Guide) */}
        <section className={styles.contactBox} aria-labelledby="contact-summary-title">
        <span className={styles.sectionTitle}>CONTACT</span>
        <h2 id="contact-summary-title" className={styles.contactTitle}>
          Let’s work together.
        </h2>
        <p style={{ fontSize: 'var(--text-base)', color: 'var(--text-secondary)' }}>
          {profileData.contact.invitation}
        </p>
        <div className={styles.contactLinks}>
          <a href={`mailto:${profileData.contact.email}`} className={styles.actionLink}>
            Email → {profileData.contact.email}
          </a>
          <a href={profileData.contact.github} target="_blank" rel="noopener noreferrer" className={styles.actionLink}>
            GitHub ↗
          </a>
          <a href={profileData.contact.linkedin} target="_blank" rel="noopener noreferrer" className={styles.actionLink}>
            LinkedIn ↗
          </a>
          <a href={profileData.contact.resumeUrl} target="_blank" rel="noopener noreferrer" className={styles.actionLink}>
            Download CV ↗
          </a>
        </div>
        </section>
      </div>
    </>
  );
};

export default LandingPage;
