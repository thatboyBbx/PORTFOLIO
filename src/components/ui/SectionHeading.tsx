import React from 'react';
import styles from './SectionHeading.module.css';

export interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  level?: 1 | 2 | 3;
  className?: string;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  eyebrow,
  title,
  description,
  level = 2,
  className = '',
}) => {
  const HeadingTag = `h${level}` as keyof JSX.IntrinsicElements;

  return (
    <header className={`${styles.header} ${className}`}>
      {eyebrow && <p className={styles.eyebrow}>{eyebrow}</p>}
      <HeadingTag className={styles.title}>{title}</HeadingTag>
      {description && <p className={styles.description}>{description}</p>}
    </header>
  );
};

export default SectionHeading;
