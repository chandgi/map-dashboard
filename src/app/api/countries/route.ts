import { NextRequest, NextResponse } from 'next/server';
import { getRandomCountries } from '@/db/queries';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const count = parseInt(searchParams.get('count') || '10');
    
    const countries = await getRandomCountries(count);
    
    return NextResponse.json({ countries });
  } catch (error) {
    console.error('Error fetching countries:', error);
    return NextResponse.json(
      { error: 'Failed to fetch countries' },
      { status: 500 }
    );
  }
}
