import React from 'react';
import styles from './StatusBadge.module.css';

export interface StatusBadgeProps {
  status: 'Deployed & Active' | 'Production Benchmark' | 'Open Source Project' | 'Evaluated Prototype' | string;
  className?: string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, className = '' }) => {
  const getVariantClass = () => {
    switch (status) {
      case 'Deployed & Active':
        return styles.active;
      case 'Production Benchmark':
        return styles.benchmark;
      case 'Open Source Project':
        return styles.opensource;
      case 'Evaluated Prototype':
        return styles.prototype;
      default:
        return '';
    }
  };

  return (
    <span className={`${styles.badge} ${getVariantClass()} ${className}`}>
      <span className={styles.dot} aria-hidden="true" />
      <span>{status}</span>
    </span>
  );
};

export default StatusBadge;
