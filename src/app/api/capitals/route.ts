import { NextRequest, NextResponse } from 'next/server';
import { getAllCapitals } from '@/db/queries';

export async function GET() {
  try {
    const capitals = await getAllCapitals();
    
    return NextResponse.json({ capitals });
  } catch (error) {
    console.error('Error fetching capitals:', error);
    return NextResponse.json(
      { error: 'Failed to fetch capitals' },
      { status: 500 }
    );
  }
}
