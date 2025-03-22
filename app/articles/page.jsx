import JournalTileContent from './JournalTileContent';
import { HOST_ADDRESS } from '../components/contants';

export default async function JournalTile({ searchParams }) {
  const { year, issue, volume } = searchParams;
  
  // Validate required parameters
  if (!year || !issue) {
    return (
      <div className="content">
        <h1>Missing Required Parameters</h1>
        <p>Please provide both year and issue parameters.</p>
      </div>
    );
  }

  try {
    // Fetch data on the server
    const res = await fetch(
      `${HOST_ADDRESS}/categories/?year=${year}&issue=${issue}`,
      { 
        cache: 'no-store',
        next: { revalidate: 3600 } // Revalidate every hour
      }
    );

    if (!res.ok) {
      throw new Error(`Failed to fetch data: ${res.status}`);
    }

    const data = await res.json();

    return (
      <JournalTileContent 
        initialData={data} 
        year={year} 
        volume={volume} 
        issue={issue}
      />
    );
  } catch (error) {
    console.error('Error fetching articles:', error);
    return (
      <div className="content">
        <h1>Error Loading Articles</h1>
        <p>There was an error loading the articles. Please try again later.</p>
      </div>
    );
  }
}
