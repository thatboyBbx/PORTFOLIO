import React from 'react';
import styles from './MediaFrame.module.css';

export interface MediaFrameProps {
  type?: 'diagram' | 'code' | 'benchmark' | 'abstract';
  caption?: string;
  aspectRatio?: '16x9' | '4x3';
  children?: React.ReactNode;
  className?: string;
}

export const MediaFrame: React.FC<MediaFrameProps> = ({
  type = 'diagram',
  caption,
  aspectRatio = '16x9',
  children,
  className = '',
}) => {
  const aspectClass = aspectRatio === '16x9' ? styles.aspect16x9 : styles.aspect4x3;

  const renderIcon = () => {
    switch (type) {
      case 'diagram':
        return (
          <svg className={styles.graphicSvg} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <rect x="3" y="3" width="7" height="7" rx="1" />
            <rect x="14" y="3" width="7" height="7" rx="1" />
            <rect x="14" y="14" width="7" height="7" rx="1" />
            <rect x="3" y="14" width="7" height="7" rx="1" />
            <path d="M10 6.5h4M6.5 10v4M17.5 10v4M10 17.5h4" />
          </svg>
        );
      case 'code':
        return (
          <svg className={styles.graphicSvg} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M16 18l6-6-6-6M8 6l-6 6 6 6" />
            <path d="M14 4l-4 16" />
          </svg>
        );
      case 'benchmark':
        return (
          <svg className={styles.graphicSvg} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M18 20V10M12 20V4M6 20v-6" />
          </svg>
        );
      case 'abstract':
      default:
        return (
          <svg className={styles.graphicSvg} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <circle cx="12" cy="12" r="9" />
            <path d="M12 3a9 9 0 009 9M12 21a9 9 0 00-9-9" />
          </svg>
        );
    }
  };

  return (
    <figure className={`${styles.frame} ${aspectClass} ${className}`}>
      {children ? (
        children
      ) : (
        <div className={styles.fallbackGraphic}>
          <span className={styles.badge}>{type.toUpperCase()} SPECIFICATION</span>
          {renderIcon()}
          {caption && <figcaption className={styles.caption}>{caption}</figcaption>}
        </div>
      )}
    </figure>
  );
};

export default MediaFrame;
