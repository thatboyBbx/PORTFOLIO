import React from 'react';

export const ProjectsPage: React.FC = () => {
  return (
    <div className="container" style={{ padding: 'var(--space-12) var(--space-4)' }}>
      <h1>Featured Case Studies</h1>
      <p style={{ marginTop: 'var(--space-4)', maxWidth: 'var(--max-width-content)' }}>
        Four substantial engineering projects demonstrating intelligent applications, data/ML pipelines, system design, and applied problem-solving.
      </p>
    </div>
  );
};

export default ProjectsPage;
