import { NextResponse } from 'next/server';
import { HOST_ADDRESS } from '../../components/contants';

/**
 * API route to track article views
 * This moves view tracking to the server which is more reliable
 * and avoids CORS issues or ad-blockers preventing analytics
 */
export async function POST(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: 'Article ID is required' },
        { status: 400 }
      );
    }

    // Forward the view increment to the backend
    const response = await fetch(`${HOST_ADDRESS}/incrementViews`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id }),
    });

    if (!response.ok) {
      throw new Error(`Backend responded with ${response.status}`);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error tracking view:', error);
    // Return success anyway to not block the user experience
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
} 