import Link from 'next/link';
import Image from 'next/image';
import styles from '../styles/tile.module.css';

// Server component version of Tile for initial render
export default function ServerTile({ data, year, volume, issue }) {
  const {
    _id,
    firstPage,
    lastPage,
    printISSN,
    title,
    onlineISSN,
    doi,
    views,
    likes,
    authors = []
  } = data;

  // Generate article URL
  const articleUrl = `/article/${_id}?year=${year}&volume=${volume}&issue=${issue}`;

  return (
    <div className={styles.tileContainer}>
      <Link href={articleUrl} className={styles.tileLink}>
        <div className={styles.titleArea}>
          <h2 className={styles.title}>{title}</h2>
        </div>
        
        {authors && authors.length > 0 && (
          <div className={styles.authorArea}>
            <p>
              {authors.map((author, index) => (
                <span key={index}>
                  {author}
                  {index < authors.length - 1 ? ', ' : ''}
                </span>
              ))}
            </p>
          </div>
        )}
        
        <div className={styles.metaArea}>
          <div className={styles.pageInfo}>
            {firstPage && lastPage && (
              <span>Pages: {firstPage}-{lastPage}</span>
            )}
          </div>
          
          <div className={styles.statsArea}>
            <div className={styles.viewsCount}>
              <span>{views || 0} views</span>
            </div>
            <div className={styles.likesCount}>
              <span>{likes || 0} likes</span>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
} 