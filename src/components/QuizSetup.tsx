'use client';

import { useState } from 'react';
import { QuizSettings } from '@/types/quiz';
import { Button } from '@/components/ui/Button';
import { Play, Flag, MapPin, Globe, Zap } from 'lucide-react';

interface QuizSetupProps {
  onStartQuiz: (settings: QuizSettings) => void;
}

export function QuizSetup({ onStartQuiz }: QuizSetupProps) {
  const [settings, setSettings] = useState<QuizSettings>({
    questionCount: 10,
    difficulty: 'easy',
    quizType: 'flags'
  });

  const handleStart = () => {
    onStartQuiz(settings);
  };

  return (
    <div className="min-h-screen p-4 flex items-center justify-center" style={{ backgroundColor: '#fff8ec' }}>
      <div className="max-w-md mx-auto w-full">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="flex items-center justify-center mb-3">
            <div className="w-12 h-12 bg-gray-900 rounded-full mr-3"></div>
            <div className="text-orange-400 text-xl">✨</div>
            <div className="w-10 h-10 border-4 border-gray-400 rounded-full ml-3"></div>
          </div>
          <h1 className="text-3xl font-bold text-amber-900 mb-2">Geography Quiz</h1>
          <p className="text-gray-600 text-base">
            Learn about countries with AI-powered analysis and guidance
          </p>
        </div>

        {/* Configure Your Game */}
        <div className="bg-white rounded-3xl shadow-lg p-5">
          <h2 className="text-xl font-semibold text-gray-900 text-center mb-6">
            Configure Your Game
          </h2>

          {/* MODE */}
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wide mb-3">
              MODE
            </h3>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setSettings(prev => ({ ...prev, quizType: 'flags' }))}
                className={`p-3 rounded-2xl border-2 transition-all ${
                  settings.quizType === 'flags'
                    ? 'border-blue-500' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                style={{ backgroundColor: settings.quizType === 'flags' ? '#fff8ec' : 'transparent' }}
              >
                <Globe className="w-5 h-5 text-blue-500 mx-auto mb-1" />
                <div className="font-semibold text-gray-900 text-sm">Analysis</div>
                <div className="text-xs text-gray-500">Learn with AI insights</div>
              </button>
              
              <button
                onClick={() => setSettings(prev => ({ ...prev, quizType: 'mixed' }))}
                className={`p-3 rounded-2xl border-2 transition-all ${
                  settings.quizType === 'mixed'
                    ? 'border-blue-500'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                style={{ backgroundColor: settings.quizType === 'mixed' ? '#fff8ec' : 'transparent' }}
              >
                <Zap className="w-5 h-5 text-gray-400 mx-auto mb-1" />
                <div className="font-semibold text-gray-900 text-sm">Quick</div>
                <div className="text-xs text-gray-500">Fast gameplay</div>
              </button>
            </div>
          </div>

          {/* BOARD SIZE */}
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wide mb-3">
              BOARD SIZE
            </h3>
            <div className="grid grid-cols-3 gap-3">
              <button
                onClick={() => setSettings(prev => ({ ...prev, questionCount: 5 }))}
                className={`p-3 rounded-2xl border-2 transition-all ${
                  settings.questionCount === 5
                    ? 'border-orange-500 bg-orange-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="font-bold text-xl text-gray-900">5</div>
                <div className="text-xs text-gray-500">Beginner</div>
              </button>
              
              <button
                onClick={() => setSettings(prev => ({ ...prev, questionCount: 10 }))}
                className={`p-3 rounded-2xl border-2 transition-all ${
                  settings.questionCount === 10
                    ? 'border-orange-500 bg-orange-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="font-bold text-xl text-gray-900">10</div>
                <div className="text-xs text-gray-500">Intermediate</div>
              </button>
              
              <button
                onClick={() => setSettings(prev => ({ ...prev, questionCount: 15 }))}
                className={`p-3 rounded-2xl border-2 transition-all ${
                  settings.questionCount === 15
                    ? 'border-orange-500 bg-orange-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="font-bold text-xl text-gray-900">15</div>
                <div className="text-xs text-gray-500">Advanced</div>
              </button>
            </div>
          </div>

          {/* YOUR COLOR */}
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wide mb-3">
              YOUR COLOR
            </h3>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setSettings(prev => ({ ...prev, quizType: 'flags' }))}
                className={`p-3 rounded-2xl border-2 transition-all ${
                  settings.quizType === 'flags'
                    ? 'border-gray-900 bg-gray-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center">
                  <div className="w-5 h-5 bg-gray-900 rounded-full mr-2"></div>
                  <div>
                    <div className="font-semibold text-gray-900 text-sm">Black</div>
                    <div className="text-xs text-gray-500">First to play</div>
                  </div>
                </div>
              </button>
              
              <button
                onClick={() => setSettings(prev => ({ ...prev, quizType: 'capitals' }))}
                className={`p-3 rounded-2xl border-2 transition-all ${
                  settings.quizType === 'capitals'
                    ? 'border-gray-900 bg-gray-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center">
                  <div className="w-5 h-5 border-3 border-gray-400 rounded-full mr-2"></div>
                  <div>
                    <div className="font-semibold text-gray-900 text-sm">White</div>
                    <div className="text-xs text-gray-500">Second to play</div>
                  </div>
                </div>
              </button>
            </div>
          </div>

          {/* AI DIFFICULTY */}
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wide mb-3">
              AI DIFFICULTY
            </h3>
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => setSettings(prev => ({ ...prev, difficulty: 'easy' }))}
                className={`p-3 rounded-2xl border-2 transition-all ${
                  settings.difficulty === 'easy'
                    ? 'border-green-500 bg-green-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="font-semibold text-gray-900 text-sm">Easy</div>
              </button>
              
              <button
                onClick={() => setSettings(prev => ({ ...prev, difficulty: 'medium' }))}
                className={`p-3 rounded-2xl border-2 transition-all ${
                  settings.difficulty === 'medium'
                    ? 'border-green-500 bg-green-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="font-semibold text-gray-900 text-sm">Medium</div>
              </button>
              
              <button
                onClick={() => setSettings(prev => ({ ...prev, difficulty: 'hard' }))}
                className={`p-3 rounded-2xl border-2 transition-all ${
                  settings.difficulty === 'hard'
                    ? 'border-green-500 bg-green-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="font-semibold text-gray-900 text-sm">Hard</div>
              </button>
            </div>
          </div>

          {/* Start Button */}
          <button
            onClick={handleStart}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-6 rounded-2xl transition-colors flex items-center justify-center"
          >
            <Play className="w-5 h-5 mr-2" />
            Begin Your Journey
          </button>
        </div>
      </div>
    </div>
  );
}
