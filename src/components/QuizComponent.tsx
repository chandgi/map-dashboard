'use client';

import { useState, useEffect } from 'react';
import { QuizState, QuizSettings } from '@/types/quiz';
import { QuizGenerator, calculateScore, getScoreGrade } from '@/utils/quiz';
import { useUser } from '@/contexts/UserContext';
import { QuizCard } from './QuizCard';
import { QuizResults } from './QuizResults';
import { QuizProgress } from './QuizProgress';

interface QuizComponentProps {
  settings: QuizSettings;
  onQuizComplete: (results: QuizState) => void;
  onRestart: () => void;
}

export function QuizComponent({ settings, onQuizComplete, onRestart }: QuizComponentProps) {
  const { updateUserStats } = useUser();
  const [quizState, setQuizState] = useState<QuizState>({
    settings: settings,
    currentQuestionIndex: 0,
    score: 0,
    questions: [],
    answers: [],
    isCompleted: false,
    startTime: new Date()
  });

  useEffect(() => {
    const generateQuestions = async () => {
      try {
        const questions = await QuizGenerator.generateQuiz(settings);
        // Convert QuizQuestion to Question format
        const convertedQuestions = questions.map((q) => ({
          id: q.id,
          type: 'multiple-choice' as const,
          question: q.question,
          options: q.options,
          correctAnswer: q.correctAnswer,
          imageUrl: q.country.flag,
          explanation: `The correct answer is ${q.correctAnswer}`,
          difficulty: q.difficulty,
          category: 'geography',
          points: q.difficulty === 'easy' ? 1 : q.difficulty === 'medium' ? 2 : 3
        }));
        
        setQuizState(prev => ({
          ...prev,
          questions: convertedQuestions,
          startTime: new Date()
        }));
      } catch (error) {
        console.error('Error generating quiz questions:', error);
        // Fallback to empty state or show error message
      }
    };

    generateQuestions();
  }, [settings]);

  const handleAnswer = (answer: string) => {
    const currentQuestion = quizState.questions[quizState.currentQuestionIndex];
    const isCorrect = answer === currentQuestion.correctAnswer;
    
    const newAnswer = {
      questionId: currentQuestion.id,
      userAnswer: answer,
      isCorrect
    };

    const newAnswers = [...quizState.answers, newAnswer];
    const newScore = isCorrect ? quizState.score + 1 : quizState.score;
    const nextQuestion = quizState.currentQuestionIndex + 1;
    
    if (nextQuestion >= quizState.questions.length) {
      // Quiz completed
      const finalState = {
        ...quizState,
        answers: newAnswers,
        score: newScore,
        isCompleted: true,
        endTime: new Date()
      };
      setQuizState(finalState);
      
      // Update user stats
      const correctAnswers = newAnswers.filter(a => a.isCorrect).length;
      const totalQuestions = newAnswers.length;
      const finalScore = (correctAnswers / totalQuestions) * 100;
      
      updateUserStats({
        totalQuizzes: 1,
        totalCorrect: correctAnswers,
        totalQuestions: totalQuestions,
        latestScore: finalScore
      });
      
      onQuizComplete(finalState);
    } else {
      // Move to next question
      setQuizState(prev => ({
        ...prev,
        currentQuestionIndex: nextQuestion,
        score: newScore,
        answers: newAnswers
      }));
    }
  };

  if (quizState.questions.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Generating quiz questions...</p>
        </div>
      </div>
    );
  }

  if (quizState.isCompleted) {
    const scorePercentage = calculateScore(quizState.questions.length, quizState.score);
    const grade = getScoreGrade(scorePercentage);
    
    return (
      <QuizResults
        quizState={quizState}
        scorePercentage={scorePercentage}
        grade={grade}
        onRestart={onRestart}
      />
    );
  }

  const currentQuestion = quizState.questions[quizState.currentQuestionIndex];

  return (
    <div className="max-w-2xl mx-auto">
      <QuizProgress
        current={quizState.currentQuestionIndex + 1}
        total={quizState.questions.length}
        score={quizState.score}
      />
      
      <QuizCard
        question={currentQuestion}
        onAnswer={handleAnswer}
        questionNumber={quizState.currentQuestionIndex + 1}
        totalQuestions={quizState.questions.length}
      />
    </div>
  );
}
