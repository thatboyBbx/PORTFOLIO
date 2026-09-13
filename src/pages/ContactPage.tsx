import React from 'react';

export const ContactPage: React.FC = () => {
  return (
    <div className="container" style={{ padding: 'var(--space-12) var(--space-4)' }}>
      <h1>Contact & Connect</h1>
      <p style={{ marginTop: 'var(--space-4)', maxWidth: 'var(--max-width-content)' }}>
        Direct communication pathways, professional profiles, code repositories, and resume access.
      </p>
    </div>
  );
};

export default ContactPage;
