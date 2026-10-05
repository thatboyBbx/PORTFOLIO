import React from 'react';
import { Link } from 'react-router-dom';
import { profileData } from '../content/profile';
import { capabilityGroups } from '../content/experience';
import styles from './AboutPage.module.css';

export const AboutPage: React.FC = () => (
  <div className={`container ${styles.page}`}>
    <header className={styles.intro}>
      <div className={styles.introCopy}>
        <p className={styles.eyebrow}>About & background</p>
        <h1 className={styles.name}>{profileData.name}</h1>
        <p className={styles.lead}>{profileData.bio[0]}</p>
        <ul className={styles.disciplines} aria-label="Areas of focus">
          <li>Application development</li>
          <li>Workflow Automation</li>
          <li>AI / ML</li>
        </ul>
      </div>

      <aside className={styles.profilePanel} aria-labelledby="education-heading">
        <p className={styles.eyebrow}>Academic foundation</p>
        <h2 id="education-heading" className={styles.panelHeading}>Education</h2>
        {profileData.education.map((education) => (
          <div key={`${education.institution}-${education.degree}`} className={styles.education}>
            <p className={styles.degree}>{education.degree}</p>
            <p className={styles.field}>{education.field}</p>
            <p className={styles.educationMeta}>{education.institution}<br />{education.year}</p>
            {education.honors && <p className={styles.honors}>{education.honors}</p>}
          </div>
        ))}
        <div className={styles.panelFooter}>
          <span>{profileData.contact.location}</span>
          <a href={profileData.contact.resumeUrl} target="_blank" rel="noopener noreferrer" className={styles.textLink}>View résumé <span aria-hidden="true">↗</span></a>
        </div>
      </aside>
    </header>

    <section className={styles.story} aria-labelledby="perspective-heading">
      <div className={styles.sectionIntro}>
        <p className={styles.eyebrow}>Perspective</p>
        <h2 id="perspective-heading" className={styles.sectionTitle}>From problem to working system.</h2>
      </div>
      <div className={styles.bio}>
        {profileData.bio.slice(1).map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
      </div>
    </section>

    <section className={styles.section} aria-labelledby="skills-heading">
      <div className={styles.sectionHeader}>
        <div>
          <p className={styles.eyebrow}>Technical profile</p>
          <h2 id="skills-heading" className={styles.sectionTitle}>Capabilities</h2>
        </div>
        <Link to="/experience" className={styles.textLink}>Explore my experience <span aria-hidden="true">↗</span></Link>
      </div>
      <div className={styles.capabilityGrid}>
        {capabilityGroups.map((group, index) => (
          <article key={group.category} className={styles.capability}>
            <div className={styles.capabilityHeader}>
              <span className={styles.index} aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
              <h3 className={styles.capabilityTitle}>{group.category}</h3>
            </div>
            <ul className={styles.skills}>
              {group.skills.map((skill) => <li key={skill}>{skill}</li>)}
            </ul>
          </article>
        ))}
      </div>
    </section>

    <section className={styles.principlesSection} aria-labelledby="principles-heading">
      <div className={styles.sectionIntro}>
        <p className={styles.eyebrow}>Working approach</p>
        <h2 id="principles-heading" className={styles.sectionTitle}>Principles that shape the work.</h2>
        <Link to="/work" className={styles.textLink}>See them in practice <span aria-hidden="true">↗</span></Link>
      </div>
      <ol className={styles.principles}>
        {profileData.workingPrinciples.map((principle, index) => (
          <li key={principle.title} className={styles.principle}>
            <span className={styles.principleNumber} aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
            <div>
              <h3 className={styles.principleTitle}>{principle.title}</h3>
              <p>{principle.description}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  </div>
);

export default AboutPage;
