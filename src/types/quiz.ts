export interface Country {
  code: string;
  name: string;
  capital: string;
  continent: string;
  flag: string;
  population: number;
  area: number;
  flagFigmaUrl?: string;
  mapFigmaUrl?: string;
}

export interface Question {
  id: string;
  type: 'multiple-choice' | 'true-false' | 'fill-in-blank';
  question: string;
  options: string[];
  correctAnswer: string;
  imageUrl?: string;
  explanation?: string;
  difficulty: 'easy' | 'medium' | 'hard';
  category: string;
  points: number;
}

export interface QuizQuestion {
  id: string;
  type: 'flag-to-country' | 'country-to-flag' | 'capital-to-country' | 'map-location' | 'map-to-country' | 'multiple-choice' | 'true-false' | 'fill-in-blank';
  question: string;
  options: string[];
  correctAnswer: string;
  country?: Country;
  difficulty: 'easy' | 'medium' | 'hard';
  points?: number;
  explanation?: string;
  category?: string;
}

export interface QuizState {
  settings: QuizSettings;
  questions: QuizQuestion[];
  currentQuestionIndex: number;
  answers: { questionId: string; userAnswer: string; isCorrect: boolean; timeSpent?: number }[];
  score: number;
  startTime: Date;
  endTime?: Date;
  isCompleted: boolean;
}

export interface QuizSettings {
  questionCount: number;
  difficulty: 'easy' | 'medium' | 'hard' | 'mixed';
  quizType: 'flags' | 'capitals' | 'mixed';
  timeLimit?: number;
}
