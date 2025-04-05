import { NextResponse } from 'next/server';
import { HOST_ADDRESS } from '../../components/contants';

export async function GET() {
  try {
    // Forward the request to your actual backend
    const response = await fetch(
      `${HOST_ADDRESS}/`,
      { 
        cache: 'no-store',
        headers: {
          'Content-Type': 'application/json',
        }
      }
    );

    if (!response.ok) {
      throw new Error(`Backend responded with ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error in latest journal API route:', error);
    return NextResponse.json(
      { error: 'Failed to fetch latest journal details' },
      { status: 500 }
    );
  }
} 