import React from 'react';
import { projectsData } from '../content/projects';
import { capabilityGroups } from '../content/experience';
import { profileData } from '../content/profile';
import ProjectCard from '../components/ui/ProjectCard';
import SectionHeading from '../components/ui/SectionHeading';
import Button from '../components/ui/Button';
import TagList from '../components/ui/TagList';
import styles from './LandingPage.module.css';

export const LandingPage: React.FC = () => {
  return (
    <div className="container">
      {/* Hero Section */}
      <section className={styles.hero} aria-labelledby="hero-title">
        <div className={styles.heroContent}>
          <div className={styles.eyebrow}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--color-success)', display: 'inline-block' }} />
            {profileData.contact.availability}
          </div>

          <h1 id="hero-title" className={styles.title}>
            Computer Scientist & <br />
            <span className={styles.titleAccent}>AI / ML Application Engineer</span>
          </h1>

          <p className={styles.description}>
            {profileData.subheadline}
          </p>

          <div className={styles.actions}>
            <Button to="/projects" variant="primary">
              Explore Case Studies
            </Button>
            <Button to="/contact" variant="secondary">
              Contact & Resume
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section className={styles.section} aria-labelledby="featured-projects-title">
        <SectionHeading
          eyebrow="Portfolio Archive"
          title="Featured Case Studies"
          description="Substantial engineering projects demonstrating intelligent applications, real-time feature pipelines, edge model runtimes, and physiological signal classification."
        />

        <div className={styles.projectGrid}>
          {projectsData.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </section>

      {/* Technical Capabilities Section */}
      <section className={styles.section} aria-labelledby="capabilities-title">
        <SectionHeading
          eyebrow="Core Competencies"
          title="Engineering & AI/ML Capabilities"
          description="A structured overview of technical domain experience spanning neural model architectures, frontend applications, and systems design."
        />

        <div className={styles.capabilitiesGrid}>
          {capabilityGroups.map((group) => (
            <div key={group.category} className={styles.capabilityCard}>
              <h3 className={styles.capabilityTitle}>{group.category}</h3>
              <p className={styles.capabilityDesc}>{group.description}</p>
              <TagList tags={group.skills} />
            </div>
          ))}
        </div>
      </section>

      {/* Contact CTA Section */}
      <section className={styles.section}>
        <div className={styles.ctaBox}>
          <h2>Interested in collaborating or hiring?</h2>
          <p style={{ color: 'var(--color-text-secondary)', maxWidth: '540px' }}>
            Open to lead engineering positions, technical architecture roles, and intelligent systems consulting.
          </p>
          <div className={styles.actions}>
            <Button to="/contact" variant="primary">
              Get In Touch
            </Button>
            <Button to="/about" variant="quiet">
              Read Engineering Approach
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
