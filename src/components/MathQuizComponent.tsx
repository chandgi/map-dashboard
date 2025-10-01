'use client';

import { useState, useEffect, useCallback } from 'react';
import { QuizState } from '@/types/quiz';
import { useUser } from '@/contexts/UserContext';
import { Button } from '@/components/ui/Button';
import { ArrowLeft, Clock, Trophy, Calculator } from 'lucide-react';

interface MathQuizComponentProps {
  quizState: QuizState;
  onQuizComplete: (finalState: QuizState) => void;
  onBackToSetup: () => void;
}

export function MathQuizComponent({ quizState: initialQuizState, onQuizComplete, onBackToSetup }: MathQuizComponentProps) {
  const { updateUserStats } = useUser();
  const [quizState, setQuizState] = useState<QuizState>(initialQuizState);
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');
  const [showResult, setShowResult] = useState(false);
  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  const [startTime, setStartTime] = useState<Date>(new Date());

  const currentQuestion = quizState.questions[quizState.currentQuestionIndex];
  const isLastQuestion = quizState.currentQuestionIndex === quizState.questions.length - 1;

  useEffect(() => {
    setStartTime(new Date());
    if (quizState.settings.timeLimit) {
      setTimeLeft(quizState.settings.timeLimit);
    }
  }, [quizState.currentQuestionIndex, quizState.settings.timeLimit]);

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
    const endTime = new Date();
    const timeSpent = Math.round((endTime.getTime() - startTime.getTime()) / 1000);
    const isCorrect = actualAnswer === currentQuestion.correctAnswer;
    
    const newAnswer = {
      questionId: currentQuestion.id,
      userAnswer: actualAnswer,
      isCorrect,
      timeSpent,
    };

    const newScore = quizState.score + (isCorrect ? currentQuestion.points : 0);
    
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
    }, 2500);
  };

  const handleSubmit = () => {
    if (selectedAnswer) {
      handleAnswerSubmit(selectedAnswer);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const renderMathProblem = (question: string) => {
    // Extract numbers from the question like "234 + 156 = ?"
    const match = question.match(/(\d+)\s*\+\s*(\d+)/);
    if (match) {
      const [, num1, num2] = match;
      return (
        <div className="bg-gray-50 rounded-2xl p-6 mb-6 border border-gray-200">
          <div className="text-center">
            <div className="text-4xl font-mono font-bold text-gray-800 mb-4">
              <div className="flex items-center justify-center space-x-3">
                <span>{num1}</span>
                <span className="text-orange-500">+</span>
                <span>{num2}</span>
                <span className="text-orange-500">=</span>
                <span className="text-blue-600">?</span>
              </div>
            </div>
            <div className="text-sm text-gray-600">
              Find the sum of these two numbers
            </div>
          </div>
        </div>
      );
    }
    return null;
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
              <div className={`flex items-center ${timeLeft <= 10 ? 'text-red-600' : 'text-orange-600'}`}>
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
            <span>Problem {quizState.currentQuestionIndex + 1} of {quizState.questions.length}</span>
            <span>{Math.round(((quizState.currentQuestionIndex + 1) / quizState.questions.length) * 100)}% Complete</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div 
              className="bg-gradient-to-r from-orange-400 to-orange-600 h-3 rounded-full transition-all duration-300"
              style={{ 
                width: `${((quizState.currentQuestionIndex + 1) / quizState.questions.length) * 100}%` 
              }}
            />
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-white rounded-3xl shadow-lg p-6 mb-6">
          <div className="flex items-center justify-center mb-4">
            <Calculator className="w-6 h-6 text-orange-500 mr-2" />
            <h2 className="text-xl font-semibold text-gray-900">
              Math Challenge #{quizState.currentQuestionIndex + 1}
            </h2>
          </div>

          {/* Math Problem Display */}
          {renderMathProblem(currentQuestion.question)}

          {/* Answer Options */}
          <div className="grid grid-cols-2 gap-3">
            {currentQuestion.options.map((option, index) => {
              const buttonClass = `p-4 rounded-xl border-2 text-center transition-all font-mono text-lg ${
                selectedAnswer === option
                  ? showResult 
                    ? option === currentQuestion.correctAnswer
                      ? 'border-green-500 bg-green-50 text-green-800'
                      : 'border-red-500 bg-red-50 text-red-800'
                    : 'border-orange-500 bg-orange-50 text-orange-800'
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
                  <div className="flex items-center justify-center">
                    <span className="w-6 h-6 rounded-full border-2 border-current mr-2 flex items-center justify-center text-xs font-semibold">
                      {String.fromCharCode(65 + index)}
                    </span>
                    {parseInt(option).toLocaleString()}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Submit Button */}
          {!showResult && selectedAnswer && (
            <Button
              onClick={handleSubmit}
              className="w-full mt-6 bg-orange-500 hover:bg-orange-600 text-white py-3 text-lg"
            >
              Submit Answer
            </Button>
          )}

          {/* Result Feedback */}
          {showResult && (
            <div className="mt-6 p-4 bg-blue-50 rounded-xl border border-blue-200">
              <div className="flex items-center mb-2">
                {selectedAnswer === currentQuestion.correctAnswer ? (
                  <div className="flex items-center text-green-700">
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white text-sm mr-2">✓</div>
                    <span className="font-semibold">Correct!</span>
                  </div>
                ) : (
                  <div className="flex items-center text-red-700">
                    <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-white text-sm mr-2">✗</div>
                    <span className="font-semibold">Not quite right</span>
                  </div>
                )}
              </div>
              
              {currentQuestion.explanation && (
                <div className="text-blue-800 text-sm bg-white rounded p-3 border border-blue-200">
                  <h4 className="font-semibold mb-1">Solution:</h4>
                  <pre className="text-xs font-mono whitespace-pre-line">{currentQuestion.explanation}</pre>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
