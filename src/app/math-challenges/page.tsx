'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { QuizSetup } from '@/components/QuizSetup';
import { MathQuizComponent } from '@/components/MathQuizComponent';
import { MathQuizResults } from '@/components/MathQuizResults';
import type { QuizSettings, QuizState, Question, QuizQuestion } from '@/types/quiz';

interface MathProblem {
  id: string;
  type: 'multiple-choice';
  question: string;
  problem: {
    num1: number;
    num2: number;
    operation: string;
  };
  options: string[];
  correctAnswer: string;
  explanation: string;
  difficulty: 'easy' | 'medium';
  category: string;
  points: number;
  gradeLevel: string;
}

export default function MathChallenges() {
  const [gameState, setGameState] = useState<'setup' | 'playing' | 'results'>('setup');
  const [quizState, setQuizState] = useState<QuizState | null>(null);
  const [gradeLevel, setGradeLevel] = useState<'1-5' | '5-8'>('1-5');
  const [problems, setProblems] = useState<MathProblem[]>([]);

  useEffect(() => {
    // Fetch math problems when grade level changes
    const fetchProblems = async () => {
      try {
        const response = await fetch(`/api/math-problems?grade=${gradeLevel}&count=20`);
        const data = await response.json();
        setProblems(data.problems);
      } catch (error) {
        console.error('Error fetching math problems:', error);
      }
    };
    
    fetchProblems();
  }, [gradeLevel]);

  const convertToQuizQuestions = (mathProblems: MathProblem[], count: number): QuizQuestion[] => {
    return mathProblems.slice(0, count).map(problem => ({
      id: problem.id,
      type: problem.type as 'multiple-choice',
      question: problem.question,
      options: problem.options,
      correctAnswer: problem.correctAnswer,
      difficulty: problem.difficulty,
      category: problem.category,
      points: problem.points,
      explanation: problem.explanation,
    }));
  };

  const handleStartQuiz = (settings: QuizSettings) => {
    if (problems.length === 0) {
      alert('Math problems are still loading. Please wait a moment and try again.');
      return;
    }

    const questions = convertToQuizQuestions(problems, settings.questionCount);
    
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

  const getGradeLevelInfo = (level: '1-5' | '5-8') => {
    if (level === '1-5') {
      return {
        title: 'Elementary Level',
        description: 'Perfect for grades 1-5 with smaller 3-digit numbers',
        range: '100-499 + 100-399',
        difficulty: 'Beginner Friendly',
        color: 'bg-green-100 text-green-800 border-green-200'
      };
    } else {
      return {
        title: 'Intermediate Level',
        description: 'Challenging for grades 5-8 with larger 3-digit numbers',
        range: '300-999 + 300-899',
        difficulty: 'More Challenging',
        color: 'bg-blue-100 text-blue-800 border-blue-200'
      };
    }
  };

  const currentInfo = getGradeLevelInfo(gradeLevel);

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
            <h1 className="text-4xl font-bold text-amber-900 mb-4">🧮 3-Digit Addition Challenges</h1>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto mb-6">
              Master 3-digit addition with step-by-step practice problems designed for different grade levels.
              Practice adding two 3-digit numbers and build strong math foundations!
            </p>

            {/* Grade Level Selection */}
            <div className="max-w-2xl mx-auto mb-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Choose Your Grade Level</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <button
                  onClick={() => setGradeLevel('1-5')}
                  className={`p-6 rounded-2xl border-2 transition-all ${
                    gradeLevel === '1-5'
                      ? 'border-green-500 bg-green-50 shadow-md'
                      : 'border-gray-200 hover:border-gray-300 bg-white'
                  }`}
                >
                  <div className="text-center">
                    <div className="text-3xl mb-2">🌱</div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">Grades 1-5</h4>
                    <p className="text-sm text-gray-600 mb-3">Elementary Level</p>
                    <div className="text-xs text-gray-500">
                      <div>Numbers: 100-499</div>
                      <div>Perfect for beginners</div>
                    </div>
                  </div>
                </button>

                <button
                  onClick={() => setGradeLevel('5-8')}
                  className={`p-6 rounded-2xl border-2 transition-all ${
                    gradeLevel === '5-8'
                      ? 'border-blue-500 bg-blue-50 shadow-md'
                      : 'border-gray-200 hover:border-gray-300 bg-white'
                  }`}
                >
                  <div className="text-center">
                    <div className="text-3xl mb-2">🚀</div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">Grades 5-8</h4>
                    <p className="text-sm text-gray-600 mb-3">Intermediate Level</p>
                    <div className="text-xs text-gray-500">
                      <div>Numbers: 300-999</div>
                      <div>More challenging</div>
                    </div>
                  </div>
                </button>
              </div>

              {/* Current Level Info */}
              <div className={`mt-6 p-4 rounded-xl border-2 ${currentInfo.color}`}>
                <h4 className="font-semibold mb-2">{currentInfo.title}</h4>
                <p className="text-sm mb-2">{currentInfo.description}</p>
                <p className="text-xs font-mono">{currentInfo.range}</p>
              </div>
            </div>

            {/* Sample Problem */}
            <div className="max-w-md mx-auto mb-8 bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Sample Problem</h3>
              {gradeLevel === '1-5' ? (
                <div className="text-center">
                  <div className="text-2xl font-mono text-gray-800 mb-2">
                    234 + 156 = ?
                  </div>
                  <div className="text-sm text-gray-600">
                    Answer: 390
                  </div>
                </div>
              ) : (
                <div className="text-center">
                  <div className="text-2xl font-mono text-gray-800 mb-2">
                    567 + 432 = ?
                  </div>
                  <div className="text-sm text-gray-600">
                    Answer: 999
                  </div>
                </div>
              )}
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto mb-8">
              <div className="bg-white rounded-lg p-4 text-center">
                <div className="text-2xl mb-2">📚</div>
                <div className="font-semibold text-gray-900 text-sm">Step-by-Step</div>
                <div className="text-xs text-gray-600">Learning</div>
              </div>
              <div className="bg-white rounded-lg p-4 text-center">
                <div className="text-2xl mb-2">⚡</div>
                <div className="font-semibold text-gray-900 text-sm">Instant</div>
                <div className="text-xs text-gray-600">Feedback</div>
              </div>
              <div className="bg-white rounded-lg p-4 text-center">
                <div className="text-2xl mb-2">🏆</div>
                <div className="font-semibold text-gray-900 text-sm">Progress</div>
                <div className="text-xs text-gray-600">Tracking</div>
              </div>
              <div className="bg-white rounded-lg p-4 text-center">
                <div className="text-2xl mb-2">🎯</div>
                <div className="font-semibold text-gray-900 text-sm">Grade</div>
                <div className="text-xs text-gray-600">Appropriate</div>
              </div>
            </div>
          </div>
          
          <QuizSetup onStartQuiz={handleStartQuiz} />
        </div>
      )}

      {gameState === 'playing' && quizState && (
        <MathQuizComponent
          quizState={quizState}
          onQuizComplete={handleQuizComplete}
          onBackToSetup={handleBackToSetup}
        />
      )}

      {gameState === 'results' && quizState && (
        <MathQuizResults
          quizState={quizState}
          onPlayAgain={handlePlayAgain}
          onBackToSetup={handleBackToSetup}
        />
      )}
    </div>
  );
}
