import { NextResponse } from 'next/server';
import { getAllStates, getStatesByCountryCode, getRandomStates, getUSStates, getRandomUSStates } from '@/db/queries';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const country = searchParams.get('country');
    const random = searchParams.get('random');
    const count = searchParams.get('count');

    let states;

    if (country === 'USA' || country === 'US') {
      if (random && count) {
        states = await getRandomUSStates(parseInt(count));
      } else {
        states = await getUSStates();
      }
    } else if (country) {
      if (random && count) {
        states = await getRandomStates(parseInt(count), country);
      } else {
        states = await getStatesByCountryCode(country);
      }
    } else if (random && count) {
      states = await getRandomStates(parseInt(count));
    } else {
      states = await getAllStates();
    }

    return NextResponse.json(states);
  } catch (error) {
    console.error('Error fetching states:', error);
    return NextResponse.json(
      { error: 'Failed to fetch states' },
      { status: 500 }
    );
  }
}
