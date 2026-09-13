import React from 'react';
import styles from './Callout.module.css';

export interface CalloutProps {
  title?: string;
  type?: 'decision' | 'warning' | 'success' | 'note';
  children: React.ReactNode;
  className?: string;
}

export const Callout: React.FC<CalloutProps> = ({
  title,
  type = 'note',
  children,
  className = '',
}) => {
  const typeClassMap = {
    decision: styles.calloutDecision,
    warning: styles.calloutWarning,
    success: styles.calloutSuccess,
    note: '',
  };

  return (
    <div className={`${styles.callout} ${typeClassMap[type]} ${className}`}>
      {title && <div className={styles.title}>{title}</div>}
      <div className={styles.content}>{children}</div>
    </div>
  );
};

export default Callout;
