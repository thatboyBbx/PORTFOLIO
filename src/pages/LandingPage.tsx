import React from 'react';

export const LandingPage: React.FC = () => {
  return (
    <div className="container" style={{ padding: 'var(--space-12) var(--space-4)' }}>
      <header style={{ marginBottom: 'var(--space-8)' }}>
        <h1 style={{ marginBottom: 'var(--space-4)' }}>
          Computer Scientist & Application Engineer
        </h1>
        <p style={{ fontSize: 'var(--text-h3)', color: 'var(--color-text-secondary)', maxWidth: 'var(--max-width-content)' }}>
          Specializing in AI/ML systems design, high-performance data pipelines, and intelligent software engineering.
        </p>
      </header>
    </div>
  );
};

export default LandingPage;
