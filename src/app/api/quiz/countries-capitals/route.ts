import { NextRequest, NextResponse } from 'next/server';
import { getRandomCountries } from '@/db/queries';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const count = parseInt(searchParams.get('count') || '10');
    
    // Get random countries with capitals
    const countries = await getRandomCountries(count);
    
    // Filter out countries without capitals
    const countriesWithCapitals = countries.filter(country => 
      country.capital && country.capital.trim() !== ''
    );
    
    // Generate quiz questions
    const quizQuestions = countriesWithCapitals.map((country, index) => ({
      id: `question-${index}`,
      type: 'multiple-choice' as const,
      question: `What is the capital of ${country.name}?`,
      correctAnswer: country.capital,
      options: [], // Will be populated with random wrong answers
      country: {
        code: country.alpha2Code,
        name: country.name,
        capital: country.capital,
        continent: country.continent || '',
        flag: country.flagEmoji || '',
        population: country.population || 0,
        area: country.area || 0,
        flagFigmaUrl: country.flagFigmaUrl,
        mapFigmaUrl: country.mapFigmaUrl,
      },
      difficulty: 'medium' as const
    }));
    
    return NextResponse.json({ 
      questions: quizQuestions,
      count: quizQuestions.length 
    });
  } catch (error) {
    console.error('Error generating countries-capitals quiz:', error);
    return NextResponse.json(
      { error: 'Failed to generate quiz' },
      { status: 500 }
    );
  }
}
