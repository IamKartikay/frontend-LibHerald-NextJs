import { NextResponse } from 'next/server';
import { HOST_ADDRESS } from '../../components/contants';

export const revalidate = 3600; // Revalidate at most once per hour

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const year = searchParams.get('year');
    const issue = searchParams.get('issue');

    if (!year || !issue) {
      return NextResponse.json(
        { error: 'Year and issue parameters are required' },
        { status: 400 }
      );
    }

    // Forward the request to your actual backend with caching strategy
    const response = await fetch(
      `${HOST_ADDRESS}/categories/?year=${year}&issue=${issue}`,
      { 
        next: { 
          revalidate: 3600 // Cache for 1 hour
        },
        headers: {
          'Content-Type': 'application/json',
        }
      }
    );

    if (!response.ok) {
      const status = response.status;
      
      if (status === 404) {
        return NextResponse.json(
          { error: 'No articles found' },
          { status: 404 }
        );
      }
      
      throw new Error(`Backend responded with ${status}`);
    }

    const data = await response.json();
    
    // Set cache headers
    return NextResponse.json(
      data,
      {
        headers: {
          'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
        }
      }
    );
  } catch (error) {
    console.error('Error in articles API route:', error);
    return NextResponse.json(
      { error: 'Failed to fetch articles' },
      { status: 500 }
    );
  }
} 