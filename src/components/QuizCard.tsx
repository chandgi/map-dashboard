'use client';

import { useState } from 'react';
import { QuizQuestion } from '@/types/quiz';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { CheckCircle, XCircle } from 'lucide-react';
import Image from 'next/image';

interface QuizCardProps {
  question: QuizQuestion;
  onAnswer: (answer: string) => void;
  questionNumber: number;
  totalQuestions: number;
}

export function QuizCard({ question, onAnswer, questionNumber, totalQuestions }: QuizCardProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);

  const handleAnswerClick = (answer: string) => {
    if (selectedAnswer) return; // Prevent multiple selections
    
    setSelectedAnswer(answer);
    setShowResult(true);
    
    // Show feedback for 2 seconds before moving to next question
    setTimeout(() => {
      onAnswer(answer);
      setSelectedAnswer(null);
      setShowResult(false);
    }, 2000);
  };

  const isCorrect = selectedAnswer === question.correctAnswer;

  return (
    <Card className="w-full mt-6">
      <CardHeader>
        <CardTitle className="text-center text-lg">
          Question {questionNumber} of {totalQuestions}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Flag Display */}
        {question.type === 'flag-to-country' && question.country && (
          <div className="text-center">
            <div className="flex justify-center items-center mb-4">
              {question.country.flagFigmaUrl ? (
                <Image
                  src={question.country.flagFigmaUrl}
                  alt={`Flag of ${question.country.name}`}
                  width={200}
                  height={133}
                  className="border border-gray-200 rounded shadow-sm"
                  unoptimized // For external URLs
                />
              ) : (
                <div className="text-8xl" role="img" aria-label={`Flag of ${question.country.name}`}>
                  {question.country.flag}
                </div>
              )}
            </div>
          </div>
        )}
        
        {/* Map Display */}
        {question.type === 'map-to-country' && question.country && (
          <div className="text-center">
            <div className="flex justify-center items-center mb-4">
              {question.country.mapFigmaUrl ? (
                <Image
                  src={question.country.mapFigmaUrl}
                  alt={`Map of ${question.country.name}`}
                  width={200}
                  height={200}
                  className="border border-gray-200 rounded shadow-sm"
                  unoptimized // For external URLs
                />
              ) : (
                <div className="w-48 h-48 bg-gray-100 border border-gray-200 rounded flex items-center justify-center text-gray-500">
                  Map of {question.country?.name || 'Country'}
                </div>
              )}
            </div>
          </div>
        )}
        
        {/* Question Text */}
        <h2 className="text-xl font-semibold text-center text-gray-800">
          {question.question}
        </h2>
        
        {/* Result Feedback */}
        {showResult && (
          <div className={`text-center p-4 rounded-lg ${
            isCorrect ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
          }`}>
            <div className="flex items-center justify-center mb-2">
              {isCorrect ? (
                <CheckCircle className="w-8 h-8 text-green-600 mr-2" />
              ) : (
                <XCircle className="w-8 h-8 text-red-600 mr-2" />
              )}
              <span className="text-lg font-semibold">
                {isCorrect ? 'Correct!' : 'Incorrect!'}
              </span>
            </div>
            {!isCorrect && (
              <p className="text-sm">
                The correct answer is: <strong>{question.correctAnswer}</strong>
              </p>
            )}
          </div>
        )}
        
        {/* Answer Options */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {question.options.map((option, index) => {
            let buttonClass = "p-4 h-auto text-left justify-start transition-colors";
            
            if (selectedAnswer) {
              if (option === question.correctAnswer) {
                buttonClass += " bg-green-100 border-green-500 text-green-800";
              } else if (option === selectedAnswer && !isCorrect) {
                buttonClass += " bg-red-100 border-red-500 text-red-800";
              } else {
                buttonClass += " bg-gray-100 border-gray-300 text-gray-500";
              }
            } else {
              buttonClass += " hover:bg-blue-50 hover:border-blue-300 border-gray-200";
            }

            return (
              <Button
                key={index}
                variant="outline"
                className={buttonClass}
                onClick={() => handleAnswerClick(option)}
                disabled={selectedAnswer !== null}
              >
                <span className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 font-semibold flex items-center justify-center mr-3 text-sm">
                  {String.fromCharCode(65 + index)}
                </span>
                {option}
              </Button>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
