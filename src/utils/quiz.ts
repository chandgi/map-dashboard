import { QuizQuestion, QuizSettings, Country } from '@/types/quiz';

interface ApiCountry {
  alpha2Code: string;
  name: string;
  capital?: string;
  continent?: string;
  flagEmoji?: string;
  population?: number;
  area?: number;
  flagFigmaUrl?: string;
  mapFigmaUrl?: string;
}

interface ApiCapital {
  name: string;
  country: { name: string };
}

// Convert API response to app Country type
function apiCountryToAppCountry(apiCountry: ApiCountry): Country {
  return {
    code: apiCountry.alpha2Code,
    name: apiCountry.name,
    capital: apiCountry.capital || '',
    continent: apiCountry.continent || '',
    flag: apiCountry.flagEmoji || '',
    population: apiCountry.population || 0,
    area: apiCountry.area || 0,
    flagFigmaUrl: apiCountry.flagFigmaUrl || undefined,
    mapFigmaUrl: apiCountry.mapFigmaUrl || undefined,
  };
}

export class QuizGenerator {
  static async generateQuiz(settings: QuizSettings): Promise<QuizQuestion[]> {
    const questions: QuizQuestion[] = [];
    
    // Fetch countries from API
    const countriesResponse = await fetch(`/api/countries?count=${settings.questionCount}`);
    const { countries: dbCountries } = await countriesResponse.json();
    const countries = dbCountries.map(apiCountryToAppCountry);

    for (let i = 0; i < settings.questionCount; i++) {
      const country = countries[i];
      let question: QuizQuestion;

      switch (settings.quizType) {
        case 'flags':
          question = await this.generateFlagQuestion(country, settings.difficulty);
          break;
        case 'capitals':
          question = await this.generateCapitalQuestion(country, settings.difficulty);
          break;
        case 'mixed':
          const questionTypes = ['flag', 'capital', 'map'];
          const randomType = questionTypes[Math.floor(Math.random() * questionTypes.length)];
          if (randomType === 'flag') {
            question = await this.generateFlagQuestion(country, settings.difficulty);
          } else if (randomType === 'map') {
            question = await this.generateMapQuestion(country, settings.difficulty);
          } else {
            question = await this.generateCapitalQuestion(country, settings.difficulty);
          }
          break;
        default:
          question = await this.generateFlagQuestion(country, settings.difficulty);
      }

      questions.push(question);
    }

    return questions;
  }

  private static async generateFlagQuestion(country: Country, difficulty: string): Promise<QuizQuestion> {
    const wrongOptions = await this.getRandomWrongAnswers(country, 3);
    const allOptions = [country.name, ...wrongOptions].sort(() => Math.random() - 0.5);

    return {
      id: `flag-${country.code}-${Date.now()}-${Math.random()}`,
      type: 'flag-to-country',
      question: `Which country does this flag belong to?`,
      options: allOptions,
      correctAnswer: country.name,
      country: country,
      difficulty: difficulty as 'easy' | 'medium' | 'hard'
    };
  }

  private static async generateCapitalQuestion(country: Country, difficulty: string): Promise<QuizQuestion> {
    const wrongOptions = await this.getRandomWrongCapitals(country, 3);
    const allOptions = [country.capital, ...wrongOptions].sort(() => Math.random() - 0.5);

    return {
      id: `capital-${country.code}-${Date.now()}-${Math.random()}`,
      type: 'capital-to-country',
      question: `What is the capital of ${country.name}?`,
      options: allOptions,
      correctAnswer: country.capital,
      country: country,
      difficulty: difficulty as 'easy' | 'medium' | 'hard'
    };
  }

  private static async generateMapQuestion(country: Country, difficulty: string): Promise<QuizQuestion> {
    const wrongOptions = await this.getRandomWrongAnswers(country, 3);
    const allOptions = [country.name, ...wrongOptions].sort(() => Math.random() - 0.5);

    return {
      id: `map-${country.code}-${Date.now()}-${Math.random()}`,
      type: 'map-to-country',
      question: `Which country is shown on this map?`,
      options: allOptions,
      correctAnswer: country.name,
      country: country,
      difficulty: difficulty as 'easy' | 'medium' | 'hard'
    };
  }

  private static async getRandomWrongAnswers(correctCountry: Country, count: number): Promise<string[]> {
    const countriesResponse = await fetch('/api/countries?count=50');
    const { countries: allCountries } = await countriesResponse.json();
    const otherCountries = allCountries.filter((c: ApiCountry) => c.alpha2Code !== correctCountry.code);
    const shuffled = otherCountries.sort(() => Math.random() - 0.5);
    return shuffled.slice(0, count).map((c: ApiCountry) => c.name);
  }

  private static async getRandomWrongCapitals(correctCountry: Country, count: number): Promise<string[]> {
    const capitalsResponse = await fetch('/api/capitals');
    const { capitals: allCapitals } = await capitalsResponse.json();
    const otherCapitals = allCapitals.filter((c: ApiCapital) => c.country.name !== correctCountry.name);
    const shuffled = otherCapitals.sort(() => Math.random() - 0.5);
    return shuffled.slice(0, count).map((c: ApiCapital) => c.name);
  }
}

export const calculateScore = (totalQuestions: number, correctAnswers: number): number => {
  return Math.round((correctAnswers / totalQuestions) * 100);
};

export const getScoreGrade = (score: number): string => {
  if (score >= 90) return 'Excellent!';
  if (score >= 80) return 'Great!';
  if (score >= 70) return 'Good!';
  if (score >= 60) return 'Not bad!';
  return 'Keep practicing!';
};
