import { notFound } from 'next/navigation';
import JournalContent from '../JournalContent';
import ServerJournalContent from '../ServerJournalContent';

// const HOST_ADDRESS = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

// async function getArticleData(id, year, volume, issue) {
//   try {
//     // Use absolute URL for server-side fetch
//     const response = await fetch(
//       `${HOST_ADDRESS}/api/article?_id=${id}`,
//       { 
//         cache: 'no-store',
//         headers: {
//           'Content-Type': 'application/json',
//         }
//       }
//     );
    
//     if (!response.ok) {
//       throw new Error(`Failed to fetch article: ${response.status}`);
//     }
    
//     const data = await response.json();
//     return data;
//   } catch (error) {
//     console.error('Error fetching article:', error);
//     return null;
//   }
// }


// Define revalidation time - articles don't change often, so we can cache them longer
export const revalidate = 86400; // Revalidate every 24 hours

// Get base URL for API calls
const getBaseUrl = () => {
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
};

/**
 * Fetch article data with improved caching strategy
 */
async function getArticleData(id) {
  try {
    const baseUrl = getBaseUrl();
    
    // Use the API route we've optimized for caching
    const response = await fetch(
      `${baseUrl}/api/article?_id=${id}`,
      { 
        next: { revalidate: 3600 }, // Cache for 1 hour
        headers: {
          'Content-Type': 'application/json',
        }
      }
    );
    
    if (!response.ok) {
      if (response.status === 404) {
        return null;
      }
      throw new Error(`Failed to fetch article: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching article:', error);
    return null;
  }
}


export default async function ArticlePage({ params, searchParams }) {
  const id = params?.id;
  const { year, volume, issue } = searchParams || {};

  if (!id || !year || !volume || !issue) {
    notFound();
  }

  const articleData = await getArticleData(id);

  if (!articleData) {
    notFound();
  }

  // Track article view on the server side for analytics
  try {
    const baseUrl = getBaseUrl();
    fetch(`${baseUrl}/api/track-view?id=${id}`, { method: 'POST' })
      .catch(err => console.error('Error tracking view:', err));
  } catch (error) {
    console.error('Error tracking view:', error);
  }

  return (
    <ServerJournalContent 
      data={articleData} 
      year={year} 
      volume={volume} 
      issue={issue}
    />
  );
}

// Generate metadata for SEO
export async function generateMetadata({ params, searchParams }) {
  const id = params?.id;
  const { year, volume, issue } = searchParams || {};
  
  if (!id) {
    return {
      title: 'Article Not Found',
      description: 'The requested article could not be found.'
    };
  }
  
  try {
    const articleData = await getArticleData(id);
    
    if (!articleData) {
      return {
        title: 'Article Not Found',
        description: 'The requested article could not be found.'
      };
    }

    // Extract keywords from article if available
    const keywords = articleData.keywords || 'library science, journal article, research';

    return {
      title: articleData.title || 'Library Herald Article',
      description: articleData.abstract?.substring(0, 160) || 
                  `Article from Library Herald Volume ${volume}, Issue ${issue} (${year})`,
      keywords: keywords,
      openGraph: {
        title: articleData.title,
        description: articleData.abstract?.substring(0, 160) || 
                    `Article from Library Herald Volume ${volume}, Issue ${issue} (${year})`,
        type: 'article',
        publishedTime: articleData.publishedDate,
        authors: articleData.authors ? [{ name: articleData.authors }] : undefined,
      },
      twitter: {
        card: 'summary_large_image',
        title: articleData.title,
        description: articleData.abstract?.substring(0, 160)
      }
    };
  } catch (error) {
    console.error('Error generating metadata:', error);
    return {
      title: 'Library Herald Article',
      description: 'Read articles from Library Herald journal.'
    };
  }
}


