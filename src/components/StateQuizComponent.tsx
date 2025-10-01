'use client';

import { useState, useEffect, useCallback } from 'react';
import { QuizState } from '@/types/quiz';
import { useUser } from '@/contexts/UserContext';
import { Button } from '@/components/ui/Button';
import { ArrowLeft, Clock, Trophy } from 'lucide-react';

interface StateQuizComponentProps {
  quizState: QuizState;
  onQuizComplete: (finalState: QuizState) => void;
  onBackToSetup: () => void;
}

export function StateQuizComponent({ quizState: initialQuizState, onQuizComplete, onBackToSetup }: StateQuizComponentProps) {
  const { updateUserStats } = useUser();
  const [quizState, setQuizState] = useState<QuizState>(initialQuizState);
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');
  const [showResult, setShowResult] = useState(false);
  const [timeLeft, setTimeLeft] = useState<number | null>(null);

  const currentQuestion = quizState.questions[quizState.currentQuestionIndex];
  const isLastQuestion = quizState.currentQuestionIndex === quizState.questions.length - 1;

  const handleTimeUp = useCallback(() => {
    if (!showResult && selectedAnswer === '') {
      // This will trigger the auto-submit when time runs out
      setSelectedAnswer('__TIME_UP__'); // Special marker for timeout
    }
  }, [showResult, selectedAnswer]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (timeLeft !== null && timeLeft > 0 && !showResult) {
      timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    } else if (timeLeft === 0) {
      handleTimeUp();
    }
    return () => clearTimeout(timer);
  }, [timeLeft, showResult, handleTimeUp]);

  // Handle timeout auto-submit
  useEffect(() => {
    if (selectedAnswer === '__TIME_UP__') {
      handleAnswerSubmit('__TIME_UP__');
    }
  }, [selectedAnswer]);

  const handleAnswerSelect = (answer: string) => {
    if (!showResult) {
      setSelectedAnswer(answer);
    }
  };

  const handleAnswerSubmit = (answer: string) => {
    const actualAnswer = answer === '__TIME_UP__' ? '' : answer;
    const isCorrect = actualAnswer === currentQuestion.correctAnswer;
    const newAnswer = {
      questionId: currentQuestion.id,
      userAnswer: actualAnswer,
      isCorrect,
      timeSpent: timeLeft ? (quizState.settings.timeLimit || 30) - timeLeft : undefined,
    };

    const newScore = quizState.score + (isCorrect ? (currentQuestion.points || 1) : 0);
    
    const updatedQuizState = {
      ...quizState,
      answers: [...quizState.answers, newAnswer],
      score: newScore,
    };

    setQuizState(updatedQuizState);
    setShowResult(true);

    // Auto-advance after showing result
    setTimeout(() => {
      if (isLastQuestion) {
        const finalState = {
          ...updatedQuizState,
          isCompleted: true,
          endTime: new Date(),
        };
        
        // Update user stats
        const correctAnswers = finalState.answers.filter(a => a.isCorrect).length;
        const totalQuestions = finalState.answers.length;
        const finalScore = (correctAnswers / totalQuestions) * 100;
        
        updateUserStats({
          totalQuizzes: 1,
          totalCorrect: correctAnswers,
          totalQuestions: totalQuestions,
          latestScore: finalScore
        });
        
        onQuizComplete(finalState);
      } else {
        setQuizState(prev => ({
          ...prev,
          currentQuestionIndex: prev.currentQuestionIndex + 1,
        }));
        setSelectedAnswer('');
        setShowResult(false);
        if (quizState.settings.timeLimit) {
          setTimeLeft(quizState.settings.timeLimit);
        }
      }
    }, 2000);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSubmit = () => {
    if (selectedAnswer && selectedAnswer !== '__TIME_UP__') {
      handleAnswerSubmit(selectedAnswer);
    }
  };

  return (
    <div className="min-h-screen p-4 flex items-center justify-center" style={{ backgroundColor: '#fff8ec' }}>
      <div className="max-w-2xl w-full">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <Button
            onClick={onBackToSetup}
            variant="outline"
            className="flex items-center"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Setup
          </Button>
          
          <div className="flex items-center space-x-4">
            {timeLeft !== null && (
              <div className="flex items-center text-orange-600">
                <Clock className="w-4 h-4 mr-1" />
                {formatTime(timeLeft)}
              </div>
            )}
            <div className="flex items-center text-gray-600">
              <Trophy className="w-4 h-4 mr-1" />
              {quizState.score} pts
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Question {quizState.currentQuestionIndex + 1} of {quizState.questions.length}</span>
            <span>{Math.round(((quizState.currentQuestionIndex + 1) / quizState.questions.length) * 100)}% Complete</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-orange-500 h-2 rounded-full transition-all duration-300"
              style={{ 
                width: `${((quizState.currentQuestionIndex + 1) / quizState.questions.length) * 100}%` 
              }}
            />
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-white rounded-3xl shadow-lg p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6 text-center">
            {currentQuestion.question}
          </h2>

          {/* Answer Options */}
          <div className="space-y-3">
            {currentQuestion.options.map((option, index) => {
              const buttonClass = `w-full p-4 rounded-xl border-2 text-left transition-all ${
                selectedAnswer === option
                  ? showResult 
                    ? option === currentQuestion.correctAnswer
                      ? 'border-green-500 bg-green-50 text-green-800'
                      : 'border-red-500 bg-red-50 text-red-800'
                    : 'border-blue-500 bg-blue-50'
                  : showResult && option === currentQuestion.correctAnswer
                    ? 'border-green-500 bg-green-50 text-green-800'
                    : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
              }`;

              return (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(option)}
                  disabled={showResult}
                  className={buttonClass}
                >
                  <div className="flex items-center">
                    <span className="w-6 h-6 rounded-full border-2 border-current mr-3 flex items-center justify-center text-xs font-semibold">
                      {String.fromCharCode(65 + index)}
                    </span>
                    {option}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Submit Button */}
          {!showResult && selectedAnswer && (
            <Button
              onClick={handleSubmit}
              className="w-full mt-6 bg-orange-500 hover:bg-orange-600 text-white py-3"
            >
              Submit Answer
            </Button>
          )}

          {/* Result Explanation */}
          {showResult && currentQuestion.explanation && (
            <div className="mt-6 p-4 bg-blue-50 rounded-xl border border-blue-200">
              <h3 className="font-semibold text-blue-900 mb-2">Did you know?</h3>
              <p className="text-blue-800 text-sm">{currentQuestion.explanation}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
