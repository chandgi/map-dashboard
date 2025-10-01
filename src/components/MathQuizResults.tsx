'use client';

import { QuizState } from '@/types/quiz';
import { Button } from '@/components/ui/Button';
import { Trophy, RotateCcw, Clock, Target, Award, ArrowLeft, Calculator, TrendingUp } from 'lucide-react';

interface MathQuizResultsProps {
  quizState: QuizState;
  onPlayAgain: () => void;
  onBackToSetup: () => void;
}

export function MathQuizResults({ quizState, onPlayAgain, onBackToSetup }: MathQuizResultsProps) {
  const correctAnswers = quizState.answers.filter(answer => answer.isCorrect).length;
  const totalQuestions = quizState.questions.length;
  const scorePercentage = Math.round((correctAnswers / totalQuestions) * 100);
  
  const timeTaken = quizState.endTime && quizState.startTime 
    ? Math.round((quizState.endTime.getTime() - quizState.startTime.getTime()) / 1000)
    : 0;

  const averageTimePerProblem = totalQuestions > 0 ? Math.round(timeTaken / totalQuestions) : 0;
  const minutes = Math.floor(timeTaken / 60);
  const seconds = timeTaken % 60;

  const getGrade = (percentage: number) => {
    if (percentage >= 95) return { grade: 'A+', color: 'text-green-600', emoji: '🏆', message: 'Outstanding!' };
    if (percentage >= 90) return { grade: 'A', color: 'text-green-500', emoji: '🥇', message: 'Excellent work!' };
    if (percentage >= 80) return { grade: 'B+', color: 'text-blue-500', emoji: '🥈', message: 'Great job!' };
    if (percentage >= 70) return { grade: 'B', color: 'text-blue-400', emoji: '🥉', message: 'Good work!' };
    if (percentage >= 60) return { grade: 'C', color: 'text-yellow-500', emoji: '📚', message: 'Keep practicing!' };
    return { grade: 'D', color: 'text-red-500', emoji: '💪', message: 'Keep trying!' };
  };

  const { grade, color, emoji, message } = getGrade(scorePercentage);

  const getMathEncouragement = (percentage: number) => {
    if (percentage >= 90) return "You're a math superstar! Your addition skills are excellent! 🌟";
    if (percentage >= 80) return "Fantastic job! You've mastered 3-digit addition! 🎯";
    if (percentage >= 70) return "Great progress! Keep practicing to become even stronger! 📈";
    if (percentage >= 60) return "Good effort! Practice makes perfect in mathematics! 🔢";
    return "Every mathematician started as a beginner. Keep practicing! 🚀";
  };

  const getSpeedFeedback = (avgTime: number) => {
    if (avgTime <= 15) return { feedback: "Lightning fast!", color: "text-green-600" };
    if (avgTime <= 30) return { feedback: "Good speed", color: "text-blue-600" };
    if (avgTime <= 60) return { feedback: "Steady pace", color: "text-yellow-600" };
    return { feedback: "Take your time", color: "text-gray-600" };
  };

  const speedInfo = getSpeedFeedback(averageTimePerProblem);

  return (
    <div className="min-h-screen p-4 flex items-center justify-center" style={{ backgroundColor: '#fff8ec' }}>
      <div className="max-w-2xl w-full">
        {/* Results Header */}
        <div className="bg-white rounded-3xl shadow-lg p-8 text-center mb-6">
          <div className="text-6xl mb-4">{emoji}</div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Math Challenge Complete!</h1>
          <p className="text-lg text-gray-600 mb-2">{message}</p>
          <p className="text-base text-gray-600 mb-6">
            {getMathEncouragement(scorePercentage)}
          </p>

          {/* Score Display Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-xl p-4 border border-yellow-200">
              <Trophy className="w-6 h-6 text-yellow-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">{quizState.score}</div>
              <div className="text-sm text-gray-600">Points</div>
            </div>
            
            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-4 border border-green-200">
              <Target className="w-6 h-6 text-green-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">{correctAnswers}/{totalQuestions}</div>
              <div className="text-sm text-gray-600">Correct</div>
            </div>
            
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-4 border border-purple-200">
              <Award className={`w-6 h-6 mx-auto mb-2 ${color}`} />
              <div className={`text-2xl font-bold ${color}`}>{grade}</div>
              <div className="text-sm text-gray-600">Grade</div>
            </div>
            
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 border border-blue-200">
              <Clock className="w-6 h-6 text-blue-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">
                {minutes}:{seconds.toString().padStart(2, '0')}
              </div>
              <div className="text-sm text-gray-600">Total Time</div>
            </div>
          </div>

          {/* Speed Analysis */}
          <div className="bg-gray-50 rounded-xl p-4 mb-6">
            <div className="flex items-center justify-center mb-2">
              <TrendingUp className={`w-5 h-5 mr-2 ${speedInfo.color}`} />
              <span className={`font-semibold ${speedInfo.color}`}>
                {speedInfo.feedback}
              </span>
            </div>
            <p className="text-sm text-gray-600">
              Average: {averageTimePerProblem}s per problem
            </p>
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

        {/* Detailed Problem Review */}
        <div className="bg-white rounded-3xl shadow-lg p-6 mb-6">
          <div className="flex items-center mb-4">
            <Calculator className="w-5 h-5 text-orange-500 mr-2" />
            <h2 className="text-xl font-semibold text-gray-900">Problem Review</h2>
          </div>
          <div className="space-y-4 max-h-80 overflow-y-auto">
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
                      <p className="font-medium text-gray-900 mb-2">
                        <span className="inline-flex items-center">
                          <span className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center text-xs font-bold mr-2">
                            {index + 1}
                          </span>
                          {question.question.replace('= ?', '=')}
                        </span>
                      </p>
                      
                      <div className="text-sm space-y-1">
                        <p className={`${isCorrect ? 'text-green-700' : 'text-red-700'}`}>
                          <span className="font-medium">Your answer:</span> {
                            answer?.userAnswer 
                              ? parseInt(answer.userAnswer).toLocaleString() 
                              : 'No answer'
                          }
                        </p>
                        {!isCorrect && (
                          <p className="text-gray-600">
                            <span className="font-medium">Correct answer:</span> {parseInt(question.correctAnswer).toLocaleString()}
                          </p>
                        )}
                        {answer?.timeSpent && (
                          <p className="text-gray-500 text-xs">
                            <Clock className="w-3 h-3 inline mr-1" />
                            Solved in {answer.timeSpent}s
                          </p>
                        )}
                      </div>
                    </div>
                    
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
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
            Practice Again
          </Button>
        </div>
      </div>
    </div>
  );
}
