import { NextResponse } from 'next/server';
import { HOST_ADDRESS } from '../../components/contants';

/**
 * API route to handle article likes/unlikes 
 * This moves like management to the server which is more reliable
 */
export async function POST(request) {
  try {
    const body = await request.json();
    const { id, action } = body;

    if (!id || !action) {
      return NextResponse.json(
        { error: 'Article ID and action (like/unlike) are required' },
        { status: 400 }
      );
    }

    // Determine which endpoint to call based on action
    const endpoint = action === 'like' ? 'incrementLikes' : 'decrementLikes';

    // Forward the action to the backend
    const response = await fetch(`${HOST_ADDRESS}/${endpoint}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id }),
    });

    if (!response.ok) {
      throw new Error(`Backend responded with ${response.status}`);
    }

    return NextResponse.json({ 
      success: true,
      action: action
    });
  } catch (error) {
    console.error('Error handling like/unlike:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
} 