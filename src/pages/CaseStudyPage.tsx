import React from 'react';
import { useParams } from 'react-router-dom';

export const CaseStudyPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();

  return (
    <div className="container" style={{ padding: 'var(--space-12) var(--space-4)' }}>
      <h1>Case Study: {slug}</h1>
      <p style={{ marginTop: 'var(--space-4)', maxWidth: 'var(--max-width-content)' }}>
        Detailed breakdown of engineering context, constraints, architecture, technical trade-offs, and outcomes.
      </p>
    </div>
  );
};

export default CaseStudyPage;
