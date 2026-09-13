import React from 'react';

export const OfflinePage: React.FC = () => {
  return (
    <div className="container" style={{ padding: 'var(--space-12) var(--space-4)', textAlign: 'center' }}>
      <h1>You Are Offline</h1>
      <p style={{ marginTop: 'var(--space-4)', marginInline: 'auto', maxWidth: 'var(--max-width-content)' }}>
        It looks like your network connection is currently unavailable. Cached pages and core information remain accessible.
      </p>
    </div>
  );
};

export default OfflinePage;
