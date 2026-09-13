import React from 'react';
import { profileData } from '../content/profile';
import SectionHeading from '../components/ui/SectionHeading';
import Button from '../components/ui/Button';
import Callout from '../components/ui/Callout';
import styles from './ContactPage.module.css';

export const ContactPage: React.FC = () => {
  return (
    <div className="container">
      <header className={styles.header}>
        <SectionHeading
          eyebrow="Direct Connection"
          title="Contact & Professional Links"
          description="Direct email, code repositories, professional network profiles, and downloadable technical resume."
          level={1}
        />
      </header>

      <div className={styles.grid}>
        <div className={styles.contactCard}>
          <h2 className={styles.contactTitle}>Direct Communication Pathways</h2>

          <div className={styles.pathway}>
            <span className={styles.label}>Email Address</span>
            <a href={`mailto:${profileData.contact.email}`} className={styles.value}>
              {profileData.contact.email}
            </a>
          </div>

          <div className={styles.pathway}>
            <span className={styles.label}>Primary Location</span>
            <span className={styles.value}>{profileData.contact.location}</span>
          </div>

          <div className={styles.pathway}>
            <span className={styles.label}>Role Availability</span>
            <span className={styles.value}>{profileData.contact.availability}</span>
          </div>

          <div className={styles.actions}>
            <Button href={`mailto:${profileData.contact.email}`} variant="primary">
              Send Direct Email
            </Button>
            <Button href={profileData.contact.resumeUrl} external variant="secondary">
              Download Technical Resume (.pdf)
            </Button>
          </div>
        </div>

        <div className={styles.contactCard}>
          <h2 className={styles.contactTitle}>Repositories & Profiles</h2>

          <div className={styles.pathway}>
            <span className={styles.label}>GitHub Code Archive</span>
            <a href={profileData.contact.github} target="_blank" rel="noopener noreferrer" className={styles.value}>
              {profileData.contact.github}
            </a>
          </div>

          <div className={styles.pathway}>
            <span className={styles.label}>LinkedIn Professional Network</span>
            <a href={profileData.contact.linkedin} target="_blank" rel="noopener noreferrer" className={styles.value}>
              {profileData.contact.linkedin}
            </a>
          </div>

          <Callout type="note" title="Contact Form Note">
            Per product design standards, a custom form is omitted in favor of direct, reliable mailto links and verified professional profiles.
          </Callout>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
