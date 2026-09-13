import React from 'react';
import styles from './TagList.module.css';

export interface TagListProps {
  tags: string[];
  accent?: boolean;
  className?: string;
}

export const TagList: React.FC<TagListProps> = ({ tags, accent = false, className = '' }) => {
  return (
    <ul className={`${styles.tagList} ${className}`}>
      {tags.map((tag) => (
        <li
          key={tag}
          className={`${styles.tag} ${accent ? styles.tagAccent : ''}`}
        >
          {tag}
        </li>
      ))}
    </ul>
  );
};

export default TagList;
