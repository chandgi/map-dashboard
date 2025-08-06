'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { QuizSetup } from '@/components/QuizSetup';
import { StateQuizComponent } from '@/components/StateQuizComponent';
import { StateQuizResults } from '@/components/StateQuizResults';
import type { QuizSettings, QuizState, Question } from '@/types/quiz';

interface StateData {
  id: string;
  name: string;
  capital: string;
  code: string;
  population: number;
  area: number;
  country: {
    name: string;
    code: string;
    flagEmoji: string;
  };
}

export default function USStatesQuiz() {
  const [gameState, setGameState] = useState<'setup' | 'playing' | 'results'>('setup');
  const [quizState, setQuizState] = useState<QuizState | null>(null);
  const [states, setStates] = useState<StateData[]>([]);

  useEffect(() => {
    // Fetch US states data
    const fetchStates = async () => {
      try {
        const response = await fetch('/api/states?country=USA');
        const data = await response.json();
        setStates(data);
      } catch (error) {
        console.error('Error fetching states:', error);
      }
    };
    
    fetchStates();
  }, []);

  const generateStateQuestions = (settings: QuizSettings): Question[] => {
    const shuffledStates = [...states].sort(() => Math.random() - 0.5);
    const selectedStates = shuffledStates.slice(0, settings.questionCount);

    return selectedStates.map((state, index) => {
      // Create wrong answers by selecting other state capitals
      const otherStates = states.filter(s => s.id !== state.id);
      const wrongAnswers = otherStates
        .sort(() => Math.random() - 0.5)
        .slice(0, 3)
        .map(s => s.capital);

      const allOptions = [state.capital, ...wrongAnswers].sort(() => Math.random() - 0.5);

      return {
        id: `state-${state.id}`,
        type: 'multiple-choice' as const,
        question: `What is the capital of ${state.name}?`,
        options: allOptions,
        correctAnswer: state.capital,
        imageUrl: undefined, // Could add state flag/map images later
        explanation: `${state.capital} is the capital city of ${state.name}. ${state.name} has a population of ${state.population?.toLocaleString()} and covers an area of ${state.area?.toLocaleString()} square kilometers.`,
        difficulty: settings.difficulty === 'mixed' ? 'medium' : settings.difficulty,
        category: 'us-states',
        points: settings.difficulty === 'easy' ? 10 : settings.difficulty === 'medium' ? 15 : 20,
      };
    });
  };

  const handleStartQuiz = (settings: QuizSettings) => {
    if (states.length === 0) {
      alert('States data is still loading. Please wait a moment and try again.');
      return;
    }

    const questions = generateStateQuestions(settings);
    
    const newQuizState: QuizState = {
      settings,
      questions,
      currentQuestionIndex: 0,
      answers: [],
      score: 0,
      startTime: new Date(),
      endTime: undefined,
      isCompleted: false,
    };

    setQuizState(newQuizState);
    setGameState('playing');
  };

  const handleQuizComplete = (finalState: QuizState) => {
    setQuizState(finalState);
    setGameState('results');
  };

  const handlePlayAgain = () => {
    setGameState('setup');
    setQuizState(null);
  };

  const handleBackToSetup = () => {
    setGameState('setup');
    setQuizState(null);
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#fff8ec' }}>
      {gameState === 'setup' && (
        <div className="container mx-auto px-4 py-8">
          <div className="text-center mb-8">
            <Link
              href="/"
              className="inline-flex items-center text-orange-600 hover:text-orange-700 mb-4"
            >
              ← Back to Quiz Hub
            </Link>
            <h1 className="text-4xl font-bold text-amber-900 mb-4">🇺🇸 US States & Capitals Quiz</h1>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto">
              Test your knowledge of American geography! Learn about all 50 US states and their capital cities 
              in this comprehensive quiz covering state capitals, populations, and interesting facts.
            </p>
            <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-md mx-auto text-sm text-gray-600">
              <div className="bg-white rounded-lg p-3">
                <div className="font-semibold text-blue-600">50</div>
                <div>US States</div>
              </div>
              <div className="bg-white rounded-lg p-3">
                <div className="font-semibold text-green-600">50</div>
                <div>State Capitals</div>
              </div>
              <div className="bg-white rounded-lg p-3">
                <div className="font-semibold text-purple-600">3</div>
                <div>Difficulty Levels</div>
              </div>
              <div className="bg-white rounded-lg p-3">
                <div className="font-semibold text-orange-600">∞</div>
                <div>Practice Rounds</div>
              </div>
            </div>
          </div>
          <QuizSetup onStartQuiz={handleStartQuiz} />
        </div>
      )}

      {gameState === 'playing' && quizState && (
        <StateQuizComponent
          quizState={quizState}
          onQuizComplete={handleQuizComplete}
          onBackToSetup={handleBackToSetup}
        />
      )}

      {gameState === 'results' && quizState && (
        <StateQuizResults
          quizState={quizState}
          onPlayAgain={handlePlayAgain}
          onBackToSetup={handleBackToSetup}
        />
      )}
    </div>
  );
}
