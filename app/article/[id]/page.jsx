import { notFound } from 'next/navigation';
import JournalContent from '../JournalContent';

const HOST_ADDRESS = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

async function getArticleData(id, year, volume, issue) {
  try {
    // Use absolute URL for server-side fetch
    const response = await fetch(
      `${HOST_ADDRESS}/api/article?_id=${id}`,
      { 
        cache: 'no-store',
        headers: {
          'Content-Type': 'application/json',
        }
      }
    );
    
    if (!response.ok) {
      throw new Error(`Failed to fetch article: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching article:', error);
    return null;
  }
}

export default async function ArticlePage({ params: paramsPromise, searchParams: searchParamsPromise }) {
  // Await the params and searchParams
  const params = await Promise.resolve(paramsPromise);
  const searchParams = await Promise.resolve(searchParamsPromise);
  
  const id = params?.id;
  const { year, volume, issue } = searchParams || {};

  if (!id || !year || !volume || !issue) {
    notFound();
  }

  const articleData = await getArticleData(id, year, volume, issue);

  if (!articleData) {
    notFound();
  }

  return (
    <JournalContent 
      data={articleData} 
      year={year} 
      volume={volume} 
      issue={issue}
    />
  );
}

// Generate metadata for SEO
export async function generateMetadata({ params: paramsPromise, searchParams: searchParamsPromise }) {
  const params = await Promise.resolve(paramsPromise);
  const searchParams = await Promise.resolve(searchParamsPromise);
  
  const id = params?.id;
  const { year, volume, issue } = searchParams || {};
  
  try {
    const articleData = await getArticleData(id, year, volume, issue);
    
    if (!articleData) {
      return {
        title: 'Article Not Found',
        description: 'The requested article could not be found.'
      };
    }

    return {
      title: `${articleData.title} | Library Herald`,
      description: `Article from Library Herald Volume ${volume}, Issue ${issue} (${year})`,
      openGraph: {
        title: articleData.title,
        description: `Article from Library Herald Volume ${volume}, Issue ${issue} (${year})`,
        type: 'article',
        publishedTime: articleData.publishedDate,
      }
    };
  } catch (error) {
    return {
      title: 'Error Loading Article',
      description: 'There was an error loading the article.'
    };
  }
}
