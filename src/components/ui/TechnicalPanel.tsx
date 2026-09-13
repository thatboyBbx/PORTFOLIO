import React from 'react';
import styles from './TechnicalPanel.module.css';

export interface TechItem {
  label: string;
  value: string;
}

export interface TechnicalPanelProps {
  title?: string;
  badge?: string;
  items: TechItem[];
  asciiDiagram?: string;
  className?: string;
}

export const TechnicalPanel: React.FC<TechnicalPanelProps> = ({
  title = 'SYSTEM ARCHITECTURE & STACK',
  badge = 'SPECIFICATION',
  items,
  asciiDiagram,
  className = '',
}) => {
  return (
    <div className={`${styles.panel} ${className}`}>
      <div className={styles.header}>
        <span className={styles.title}>{title}</span>
        {badge && <span className={styles.badge}>{badge}</span>}
      </div>

      <div className={styles.grid}>
        {items.map((item) => (
          <div key={item.label} className={styles.item}>
            <span className={styles.label}>{item.label}</span>
            <span className={styles.value}>{item.value}</span>
          </div>
        ))}
      </div>

      {asciiDiagram && (
        <div className={styles.diagramContainer}>
          <pre className={styles.asciiDiagram}>{asciiDiagram}</pre>
        </div>
      )}
    </div>
  );
};

export default TechnicalPanel;
