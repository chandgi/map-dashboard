'use client';

import { QuizState } from '@/types/quiz';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Trophy, RotateCcw, Clock } from 'lucide-react';

interface QuizResultsProps {
  quizState: QuizState;
  scorePercentage: number;
  grade: string;
  onRestart: () => void;
}

export function QuizResults({ quizState, scorePercentage, grade, onRestart }: QuizResultsProps) {
  const timeTaken = quizState.endTime && quizState.startTime 
    ? Math.round((quizState.endTime.getTime() - quizState.startTime.getTime()) / 1000)
    : 0;

  const minutes = Math.floor(timeTaken / 60);
  const seconds = timeTaken % 60;

  return (
    <div className="max-w-2xl mx-auto">
      <Card className="text-center">
        <CardHeader>
          <div className="flex justify-center mb-4">
            <Trophy className="w-16 h-16 text-yellow-500" />
          </div>
          <CardTitle className="text-2xl text-gray-900">Quiz Completed!</CardTitle>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Score Display */}
          <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-6">
            <div className="text-4xl font-bold text-blue-600 mb-2">
              {scorePercentage}%
            </div>
            <div className="text-lg text-gray-700 mb-1">
              {quizState.score} out of {quizState.questions.length} correct
            </div>
            <div className="text-xl font-semibold text-blue-600">
              {grade}
            </div>
          </div>

          {/* Time Display */}
          <div className="flex items-center justify-center text-gray-600">
            <Clock className="w-5 h-5 mr-2" />
            <span>
              Time: {minutes > 0 ? `${minutes}m ` : ''}{seconds}s
            </span>
          </div>

          {/* Answer Review */}
          <div className="text-left">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Review Your Answers</h3>
            <div className="space-y-3 max-h-64 overflow-y-auto">
              {quizState.answers.map((answer, index) => {
                const question = quizState.questions[index];
                return (
                  <div 
                    key={answer.questionId}
                    className={`p-3 rounded-lg border ${
                      answer.isCorrect 
                        ? 'bg-green-50 border-green-200' 
                        : 'bg-red-50 border-red-200'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">
                        Q{index + 1}: {question.country?.name || question.question.substring(0, 30) + '...'}
                      </span>
                      <span className={`text-sm font-semibold ${
                        answer.isCorrect ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {answer.isCorrect ? '✓' : '✗'}
                      </span>
                    </div>
                    {!answer.isCorrect && (
                      <div className="text-xs text-gray-600 mt-1">
                        Your answer: {answer.userAnswer} | 
                        Correct: {question.correctAnswer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button onClick={onRestart} className="flex items-center">
              <RotateCcw className="w-4 h-4 mr-2" />
              Try Another Quiz
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
