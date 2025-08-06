'use client';

import { QuizState } from '@/types/quiz';
import { Button } from '@/components/ui/Button';
import { Trophy, RotateCcw, Clock, Target, Award, ArrowLeft } from 'lucide-react';

interface StateQuizResultsProps {
  quizState: QuizState;
  onPlayAgain: () => void;
  onBackToSetup: () => void;
}

export function StateQuizResults({ quizState, onPlayAgain, onBackToSetup }: StateQuizResultsProps) {
  const correctAnswers = quizState.answers.filter(answer => answer.isCorrect).length;
  const totalQuestions = quizState.questions.length;
  const scorePercentage = Math.round((correctAnswers / totalQuestions) * 100);
  
  const timeTaken = quizState.endTime && quizState.startTime 
    ? Math.round((quizState.endTime.getTime() - quizState.startTime.getTime()) / 1000)
    : 0;

  const minutes = Math.floor(timeTaken / 60);
  const seconds = timeTaken % 60;

  const getGrade = (percentage: number) => {
    if (percentage >= 90) return { grade: 'A+', color: 'text-green-600', emoji: '🏆' };
    if (percentage >= 80) return { grade: 'A', color: 'text-green-500', emoji: '🥇' };
    if (percentage >= 70) return { grade: 'B', color: 'text-blue-500', emoji: '🥈' };
    if (percentage >= 60) return { grade: 'C', color: 'text-yellow-500', emoji: '🥉' };
    return { grade: 'D', color: 'text-red-500', emoji: '📚' };
  };

  const { grade, color, emoji } = getGrade(scorePercentage);

  const getEncouragingMessage = (percentage: number) => {
    if (percentage >= 90) return "Exceptional! You're a US geography expert! 🌟";
    if (percentage >= 80) return "Great job! You know your states well! 👏";
    if (percentage >= 70) return "Good work! You're on your way to mastering US geography! 📍";
    if (percentage >= 60) return "Not bad! Keep studying to improve your knowledge! 📖";
    return "Keep practicing! Every expert was once a beginner! 💪";
  };

  return (
    <div className="min-h-screen p-4 flex items-center justify-center" style={{ backgroundColor: '#fff8ec' }}>
      <div className="max-w-2xl w-full">
        {/* Results Header */}
        <div className="bg-white rounded-3xl shadow-lg p-8 text-center mb-6">
          <div className="text-6xl mb-4">{emoji}</div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Quiz Complete!</h1>
          <p className="text-lg text-gray-600 mb-6">
            {getEncouragingMessage(scorePercentage)}
          </p>

          {/* Score Display */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-gray-50 rounded-xl p-4">
              <Trophy className="w-6 h-6 text-yellow-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">{quizState.score}</div>
              <div className="text-sm text-gray-600">Points</div>
            </div>
            
            <div className="bg-gray-50 rounded-xl p-4">
              <Target className="w-6 h-6 text-green-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">{correctAnswers}/{totalQuestions}</div>
              <div className="text-sm text-gray-600">Correct</div>
            </div>
            
            <div className="bg-gray-50 rounded-xl p-4">
              <Award className={`w-6 h-6 mx-auto mb-2 ${color}`} />
              <div className={`text-2xl font-bold ${color}`}>{grade}</div>
              <div className="text-sm text-gray-600">Grade</div>
            </div>
            
            <div className="bg-gray-50 rounded-xl p-4">
              <Clock className="w-6 h-6 text-blue-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">
                {minutes}:{seconds.toString().padStart(2, '0')}
              </div>
              <div className="text-sm text-gray-600">Time</div>
            </div>
          </div>

          {/* Percentage Circle */}
          <div className="relative w-32 h-32 mx-auto mb-6">
            <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 120 120">
              <circle
                cx="60"
                cy="60"
                r="50"
                stroke="#e5e7eb"
                strokeWidth="8"
                fill="none"
              />
              <circle
                cx="60"
                cy="60"
                r="50"
                stroke="#f59e0b"
                strokeWidth="8"
                fill="none"
                strokeLinecap="round"
                strokeDasharray={`${scorePercentage * 3.14} 314`}
                className="transition-all duration-1000 ease-out"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-2xl font-bold text-gray-900">{scorePercentage}%</span>
            </div>
          </div>
        </div>

        {/* Question Review */}
        <div className="bg-white rounded-3xl shadow-lg p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Question Review</h2>
          <div className="space-y-3 max-h-60 overflow-y-auto">
            {quizState.questions.map((question, index) => {
              const answer = quizState.answers[index];
              const isCorrect = answer?.isCorrect;
              
              return (
                <div 
                  key={question.id}
                  className={`p-4 rounded-xl border-2 ${
                    isCorrect 
                      ? 'border-green-200 bg-green-50' 
                      : 'border-red-200 bg-red-50'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <p className="font-medium text-gray-900 mb-1">
                        {index + 1}. {question.question}
                      </p>
                      <p className={`text-sm ${isCorrect ? 'text-green-700' : 'text-red-700'}`}>
                        Your answer: {answer?.userAnswer || 'No answer'}
                      </p>
                      {!isCorrect && (
                        <p className="text-sm text-gray-600">
                          Correct answer: {question.correctAnswer}
                        </p>
                      )}
                    </div>
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                      isCorrect 
                        ? 'bg-green-500 text-white' 
                        : 'bg-red-500 text-white'
                    }`}>
                      {isCorrect ? '✓' : '✗'}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Button
            onClick={onBackToSetup}
            variant="outline"
            className="flex-1 flex items-center justify-center py-3"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Setup
          </Button>
          
          <Button
            onClick={onPlayAgain}
            className="flex-1 bg-orange-500 hover:bg-orange-600 text-white flex items-center justify-center py-3"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Play Again
          </Button>
        </div>
      </div>
    </div>
  );
}
