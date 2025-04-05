import ServerTile from '../components/ServerTile';
import styles from '../styles/journalTile.module.css';

/**
 * Server component for the journal tile content
 * This provides better SEO and initial rendering
 */
export default function ServerJournalTileContent({ data, year, volume, issue }) {
  if (!data || data.length === 0) {
    return (
      <div className={styles.content || "content"}>
        <h1>No Articles Found</h1>
        <p>No articles found for the selected year and issue.</p>
      </div>
    );
  }

  return (
    <div className={styles.content || "content"}>
      <h1 className={styles.volumeTitle} style={{ 
        fontSize: "22px", 
        lineHeight: "1.41em", 
        fontWeight: "bold", 
        color: "#3a54b4",
        textAlign: 'center',
        marginBottom: '20px'
      }}>
        Volume {volume}, Issue {issue} ({year})
      </h1>
      
      <div className={styles.journalTiles || "journalTiles"}>
        {data.map((article, index) => (
          <ServerTile 
            key={index} 
            data={article} 
            year={year} 
            volume={volume} 
            issue={issue}
          />
        ))}
      </div>
    </div>
  );
} 