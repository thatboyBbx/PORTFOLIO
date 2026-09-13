import React from 'react';

export const AboutPage: React.FC = () => {
  return (
    <div className="container" style={{ padding: 'var(--space-12) var(--space-4)' }}>
      <h1>About & Engineering Approach</h1>
      <p style={{ marginTop: 'var(--space-4)', maxWidth: 'var(--max-width-content)' }}>
        Architecting intelligent systems that bridge foundational computer science, machine learning models, and production application engineering.
      </p>
    </div>
  );
};

export default AboutPage;
