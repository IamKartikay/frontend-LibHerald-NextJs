import styles from "./archive.module.css";
import ArchiveContent from "./ArchiveContent";
import { HOST_ADDRESS } from '../components/contants';

export default async function Archive() {
  // Fetch data on the server
  const res = await fetch(`${HOST_ADDRESS}/allJournals`, { 
    cache: 'no-store' // This ensures we get fresh data on each request
  });
  const data = await res.json();

  return (
    <main className={styles.content}>
      <ArchiveContent initialData={data} allYears={data.years} />
    </main>
  );
}
