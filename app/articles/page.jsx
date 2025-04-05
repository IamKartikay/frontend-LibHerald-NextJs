import { notFound } from 'next/navigation';
import JournalTileContent from './JournalTileContent';
import ServerJournalTileContent from './ServerJournalTileContent';

// Define revalidation time for articles listing
export const revalidate = 3600; // Revalidate every hour

// Get base URL for API calls
const getBaseUrl = () => {
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
};

/**
 * Fetch articles data with proper caching
 */
async function getArticlesData(year, issue) {
  try {
    const baseUrl = getBaseUrl();
    
    // Use our optimized API route
    const response = await fetch(
      `${baseUrl}/api/articles?year=${year}&issue=${issue}`,
      { 
        next: { revalidate: 3600 }, // Cache for 1 hour
      }
    );
    
    if (!response.ok) {
      if (response.status === 404) {
        return null;
      }
      throw new Error(`Failed to fetch articles: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching articles:', error);
    return null;
  }
}

// Metadata generation for SEO
export async function generateMetadata({ searchParams }) {
  const { year, issue, volume } = searchParams;
  
  if (!year || !issue) {
    return {
      title: 'Articles - Library Herald',
      description: 'Browse articles from Library Herald journal',
    };
  }

  return {
    title: `Volume ${volume}, Issue ${issue} (${year}) - Library Herald`,
    description: `Browse articles from Library Herald journal Volume ${volume}, Issue ${issue} published in ${year}`,
    openGraph: {
      title: `Volume ${volume}, Issue ${issue} (${year}) - Library Herald`,
      description: `Browse articles from Library Herald journal Volume ${volume}, Issue ${issue} published in ${year}`,
      type: 'website',
    }
  };
}

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

  // Fetch data with the optimized function
  const data = await getArticlesData(year, issue);
    
  if (!data || data.length === 0) {
    notFound();
  }

  return (
    <JournalTileContent 
      initialData={data} 
      year={year} 
      volume={volume} 
      issue={issue}
    />
  );
}
