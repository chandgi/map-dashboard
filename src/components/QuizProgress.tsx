'use client';

import { Trophy, Target } from 'lucide-react';

interface QuizProgressProps {
  current: number;
  total: number;
  score: number;
}

export function QuizProgress({ current, total, score }: QuizProgressProps) {
  const progressPercentage = (current / total) * 100;
  const answeredQuestions = current - 1;
  const accuracy = answeredQuestions > 0 ? Math.round((score / answeredQuestions) * 100) : 0;

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-4">
      <div className="flex justify-between items-center mb-3">
        <div className="flex items-center">
          <Target className="w-4 h-4 text-blue-600 mr-2" />
          <span className="text-sm font-medium text-gray-600">
            Question {current} of {total}
          </span>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center">
            <Trophy className="w-4 h-4 text-yellow-600 mr-1" />
            <span className="text-sm font-semibold text-gray-900">
              {score}/{answeredQuestions} correct
            </span>
          </div>
          {answeredQuestions > 0 && (
            <div className={`text-sm font-semibold px-2 py-1 rounded ${
              accuracy >= 80 ? 'bg-green-100 text-green-800' :
              accuracy >= 60 ? 'bg-yellow-100 text-yellow-800' :
              'bg-red-100 text-red-800'
            }`}>
              {accuracy}%
            </div>
          )}
        </div>
      </div>
      
      {/* Progress Bar */}
      <div className="w-full bg-gray-200 rounded-full h-3">
        <div 
          className="bg-gradient-to-r from-blue-500 to-blue-600 h-3 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${progressPercentage}%` }}
        />
      </div>
      
      <div className="flex justify-between text-xs text-gray-500 mt-1">
        <span>Progress</span>
        <span>{Math.round(progressPercentage)}% Complete</span>
      </div>
    </div>
  );
}
