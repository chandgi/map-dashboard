import { NextResponse } from 'next/server';
import { getAllCapitals } from '@/db/queries';
import { FALLBACK_QUIZ_DATA } from '@/data/fallback-quiz';

export async function GET() {
  try {
    const capitals = await getAllCapitals();
    
    if (!capitals || capitals.length === 0) {
      console.warn('No capitals found in database, using fallback data');
      return NextResponse.json(FALLBACK_QUIZ_DATA);
    }
    
    // Transform the data to match the existing quiz interface
    const quizData = capitals.map((capital, index) => ({
      id: (index + 1).toString(),
      capital: capital.name,
      country: capital.country.name,
      countryCode: capital.country.alpha2Code,
    }));

    return NextResponse.json(quizData);
  } catch (error) {
    console.error('Error fetching countries and capitals:', error);
    
    // Return fallback data instead of error for better user experience
    console.warn('Database error, using fallback quiz data');
    return NextResponse.json(FALLBACK_QUIZ_DATA);
  }
}
