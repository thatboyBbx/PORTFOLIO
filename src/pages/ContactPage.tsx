import React from 'react';
import { profileData } from '../content/profile';
import styles from './ContactPage.module.css';

export const ContactPage: React.FC = () => {
  return (
    <div className="container" style={{ padding: 'var(--space-12) var(--space-4) var(--space-24) var(--space-4)' }}>
      <header className={styles.header}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs)', color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 'var(--space-2)' }}>
          DIRECT CONTACT
        </div>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-3xl)', marginBottom: 'var(--space-4)' }}>
          Have a problem worth building around?
        </h1>
        <p style={{ fontSize: 'var(--text-xl)', color: 'var(--text-secondary)', maxWidth: 'var(--max-width-prose)' }}>
          If you're working on a product, internal system, automation workflow or AI/ML application, get in touch.
        </p>
      </header>

      <div className={styles.grid}>
        <div className={styles.contactCard}>
          <h2 className={styles.contactTitle}>Direct Communication</h2>

          <div className={styles.pathway}>
            <span className={styles.label}>Email Address</span>
            <a href={`mailto:${profileData.contact.email}`} className={styles.value}>
              {profileData.contact.email} →
            </a>
          </div>

          <div className={styles.pathway}>
            <span className={styles.label}>Location</span>
            <span className={styles.value}>{profileData.contact.location}</span>
          </div>

          <div className={styles.pathway}>
            <span className={styles.label}>Curriculum Vitae</span>
            <a href={profileData.contact.resumeUrl} target="_blank" rel="noopener noreferrer" className={styles.value}>
              Download CV (.pdf) ↗
            </a>
          </div>
        </div>

        <div className={styles.contactCard}>
          <h2 className={styles.contactTitle}>Profiles & Code</h2>

          <div className={styles.pathway}>
            <span className={styles.label}>LinkedIn</span>
            <a href={profileData.contact.linkedin} target="_blank" rel="noopener noreferrer" className={styles.value}>
              {profileData.contact.linkedin} ↗
            </a>
          </div>

          <div className={styles.pathway}>
            <span className={styles.label}>GitHub</span>
            <a href={profileData.contact.github} target="_blank" rel="noopener noreferrer" className={styles.value}>
              {profileData.contact.github} ↗
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
