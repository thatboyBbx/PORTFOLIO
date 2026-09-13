import React from 'react';
import SectionHeading from '../components/ui/SectionHeading';
import Button from '../components/ui/Button';

export const OfflinePage: React.FC = () => {
  return (
    <div className="container" style={{ padding: 'var(--space-16) var(--space-4)', textAlign: 'center' }}>
      <SectionHeading
        eyebrow="PWA Offline Mode"
        title="Network Connection Unavailable"
        description="You are currently viewing the offline shell. Application content cached during previous visits remains accessible."
        level={1}
      />

      <div style={{ marginTop: 'var(--space-8)', display: 'inline-flex', gap: 'var(--space-4)', justifyContent: 'center' }}>
        <Button to="/" variant="primary">
          Return to Overview
        </Button>
        <Button to="/projects" variant="secondary">
          View Cached Projects
        </Button>
      </div>
    </div>
  );
};

export default OfflinePage;
