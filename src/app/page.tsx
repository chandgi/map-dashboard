'use client';

import { useState } from 'react';
import Link from 'next/link';
import { QuizSettings } from '@/types/quiz';
import { QuizSetup } from '@/components/QuizSetup';
import { QuizComponent } from '@/components/QuizComponent';
import { Globe, Flag, MapPin, Star } from 'lucide-react';

type AppState = 'menu' | 'setup' | 'quiz' | 'results';

export default function Home() {
  const [appState, setAppState] = useState<AppState>('menu');
  const [quizSettings, setQuizSettings] = useState<QuizSettings | null>(null);

  const handleStartQuiz = (settings: QuizSettings) => {
    setQuizSettings(settings);
    setAppState('quiz');
  };

  const handleQuizComplete = () => {
    setAppState('results');
  };

  const handleRestart = () => {
    setAppState('menu');
    setQuizSettings(null);
  };

  const handleBackToMenu = () => {
    setAppState('menu');
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#fff8ec' }}>
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-center">
            <div className="flex items-center space-x-3">
              <div className="bg-orange-500 p-2 rounded-lg">
                <Globe className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Geography Quiz Hub</h1>
                <p className="text-sm text-gray-600">Master world geography and US states</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {appState === 'menu' && (
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-amber-900 mb-4">Choose Your Quiz Adventure</h2>
              <p className="text-lg text-gray-700 max-w-2xl mx-auto">
                Explore the world through interactive quizzes covering countries, capitals, flags, and US states.
                Perfect for students, travelers, and geography enthusiasts!
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              {/* World Geography Quiz */}
              <div className="bg-white rounded-3xl shadow-lg p-8 hover:shadow-xl transition-shadow">
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Globe className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-3">World Geography</h3>
                  <p className="text-gray-600 mb-6">
                    Test your knowledge of countries, capitals, and flags from around the world. 
                    Features multiple difficulty levels and AI-powered insights.
                  </p>
                  <div className="grid grid-cols-3 gap-3 mb-6 text-sm">
                    <div className="bg-gray-50 rounded-lg p-3">
                      <div className="font-semibold text-blue-600">195</div>
                      <div className="text-gray-600">Countries</div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-3">
                      <div className="font-semibold text-green-600">🏳️</div>
                      <div className="text-gray-600">Flags</div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-3">
                      <div className="font-semibold text-purple-600">🏛️</div>
                      <div className="text-gray-600">Capitals</div>
                    </div>
                  </div>
                  <button
                    onClick={() => setAppState('setup')}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-xl transition-colors"
                  >
                    Start World Quiz
                  </button>
                </div>
              </div>

              {/* US States Quiz */}
              <div className="bg-white rounded-3xl shadow-lg p-8 hover:shadow-xl transition-shadow">
                <div className="text-center">
                  <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <MapPin className="w-8 h-8 text-red-600" />
                  </div>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-3">US States & Capitals</h3>
                  <p className="text-gray-600 mb-6">
                    Master American geography with comprehensive quizzes covering all 50 US states, 
                    their capitals, and fascinating state facts.
                  </p>
                  <div className="grid grid-cols-3 gap-3 mb-6 text-sm">
                    <div className="bg-gray-50 rounded-lg p-3">
                      <div className="font-semibold text-red-600">50</div>
                      <div className="text-gray-600">US States</div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-3">
                      <div className="font-semibold text-blue-600">🏛️</div>
                      <div className="text-gray-600">Capitals</div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-3">
                      <div className="font-semibold text-green-600">📊</div>
                      <div className="text-gray-600">Facts</div>
                    </div>
                  </div>
                  <Link
                    href="/us-states"
                    className="block w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-xl transition-colors text-center"
                  >
                    Start US States Quiz
                  </Link>
                </div>
              </div>
            </div>

            {/* Features Section */}
            <div className="bg-white rounded-3xl shadow-lg p-8">
              <h3 className="text-2xl font-semibold text-gray-900 text-center mb-8">Quiz Features</h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Star className="w-6 h-6 text-yellow-600" />
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">Multiple Difficulty Levels</h4>
                  <p className="text-gray-600 text-sm">Choose from easy, medium, or hard difficulty levels to match your knowledge.</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Globe className="w-6 h-6 text-green-600" />
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">Comprehensive Coverage</h4>
                  <p className="text-gray-600 text-sm">Learn about countries, states, capitals, flags, and geographical facts.</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Flag className="w-6 h-6 text-purple-600" />
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">Interactive Learning</h4>
                  <p className="text-gray-600 text-sm">Immediate feedback and detailed explanations help reinforce learning.</p>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {appState === 'setup' && (
          <div>
            <div className="text-center mb-8">
              <button
                onClick={handleBackToMenu}
                className="inline-flex items-center text-orange-600 hover:text-orange-700 mb-4"
              >
                ← Back to Quiz Selection
              </button>
              <h2 className="text-3xl font-bold text-amber-900">World Geography Quiz</h2>
            </div>
            <QuizSetup onStartQuiz={handleStartQuiz} />
          </div>
        )}
        
        {appState === 'quiz' && quizSettings && (
          <QuizComponent 
            settings={quizSettings}
            onQuizComplete={handleQuizComplete}
            onRestart={handleRestart}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center text-gray-600">
            <p className="flex items-center justify-center space-x-2">
              <Flag className="w-4 h-4" />
              <span>Master geography through interactive learning</span>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
