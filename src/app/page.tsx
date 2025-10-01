'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { QuizSettings } from '@/types/quiz';
import { QuizSetup } from '@/components/QuizSetup';
import { QuizComponent } from '@/components/QuizComponent';
import { WelcomeModal } from '@/components/WelcomeModal';
import { UserProfile } from '@/components/UserProfile';
import { LandingPage } from '@/components/LandingPage';
import { useUser } from '@/contexts/UserContext';
// Removed unused icon imports

type AppState = 'menu' | 'setup' | 'quiz' | 'results';

export default function Home() {
  const [appState, setAppState] = useState<AppState>('menu');
  const [quizSettings, setQuizSettings] = useState<QuizSettings | null>(null);
  const [showWelcome, setShowWelcome] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const { user } = useUser();

  useEffect(() => {
    // Show welcome modal if no user is logged in
    if (!user) {
      setShowWelcome(true);
    }
  }, [user]);

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

  const handleStartQuizFromLanding = () => {
    setAppState('setup');
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#fff8ec' }}>
      {/* Main Content */}
      <main>
        {appState === 'menu' && (
          <LandingPage 
            onStartQuiz={handleStartQuizFromLanding} 
            onShowProfile={() => setShowProfile(true)}
          />
        )}
        
        {appState === 'setup' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="text-center mb-8">
              <button
                onClick={handleBackToMenu}
                className="inline-flex items-center text-orange-600 hover:text-orange-700 mb-4"
              >
                ← Back to Landing Page
              </button>
              <h2 className="text-3xl font-bold text-amber-900">World Geography Quiz</h2>
            </div>
            <QuizSetup onStartQuiz={handleStartQuiz} />
          </div>
        )}
        
        {appState === 'quiz' && quizSettings && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <QuizComponent 
              settings={quizSettings}
              onQuizComplete={handleQuizComplete}
              onRestart={handleRestart}
            />
          </div>
        )}
      </main>

      {/* Modals */}
      {showWelcome && <WelcomeModal onClose={() => setShowWelcome(false)} />}
      {showProfile && <UserProfile onClose={() => setShowProfile(false)} />}
    </div>
  );
}
