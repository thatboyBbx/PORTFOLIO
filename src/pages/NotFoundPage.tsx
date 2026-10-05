import React from 'react';
import { Link } from 'react-router-dom';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="container" style={{ padding: 'var(--space-12) var(--space-4)', textAlign: 'center' }}>
      <h1>404 — Page Not Found</h1>
      <p style={{ marginTop: 'var(--space-4)', marginInline: 'auto', maxWidth: 'var(--max-width-prose)' }}>
        The page or resource you requested could not be located.
      </p>
      <div style={{ marginTop: 'var(--space-6)' }}>
        <Link to="/" style={{ display: 'inline-block', padding: 'var(--space-3) var(--space-6)', background: 'var(--accent)', color: '#FFFFFF', borderRadius: 'var(--radius-md)', fontWeight: 600 }}>
          Return home
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
