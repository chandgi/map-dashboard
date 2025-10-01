'use client';

import { useState } from 'react';
import { useUser } from '@/contexts/UserContext';
import { Button } from '@/components/ui/Button';
import { User, UserPlus, LogIn, Mail } from 'lucide-react';

interface WelcomeModalProps {
  onClose: () => void;
}

export function WelcomeModal({ onClose }: WelcomeModalProps) {
  const { login, loginAsGuest } = useUser();
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim()) {
      login(username.trim(), email.trim() || undefined);
      onClose();
    }
  };

  const handleGuestLogin = () => {
    loginAsGuest();
    onClose();
  };

  if (showLoginForm) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-8">
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <User className="w-8 h-8 text-orange-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Create Your Profile</h2>
            <p className="text-gray-600">Enter your details to track your progress</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
                Username *
              </label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                placeholder="Enter your username"
                required
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email (optional)
              </label>
              <div className="relative">
                <Mail className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  placeholder="your@email.com"
                />
              </div>
            </div>

            <div className="flex space-x-3 pt-4">
              <Button
                type="button"
                onClick={() => setShowLoginForm(false)}
                variant="outline"
                className="flex-1"
              >
                Back
              </Button>
              <Button
                type="submit"
                className="flex-1 bg-orange-500 hover:bg-orange-600 text-white"
              >
                Create Profile
              </Button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-8">
        <div className="text-center mb-8">
          <div className="text-6xl mb-4">🎓</div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome to Learning Hub!</h1>
          <p className="text-gray-600">
            Start your learning journey with interactive quizzes and challenges
          </p>
        </div>

        <div className="space-y-4">
          <Button
            onClick={() => setShowLoginForm(true)}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white py-4 text-lg flex items-center justify-center"
          >
            <UserPlus className="w-5 h-5 mr-2" />
            Create Profile & Track Progress
          </Button>

          <Button
            onClick={handleGuestLogin}
            variant="outline"
            className="w-full py-4 text-lg flex items-center justify-center"
          >
            <LogIn className="w-5 h-5 mr-2" />
            Continue as Guest
          </Button>
        </div>

        <div className="mt-6 text-center">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="bg-gray-50 rounded-lg p-3">
              <div className="font-semibold text-orange-600">With Profile</div>
              <div className="text-gray-600 text-xs">Save progress, view stats</div>
            </div>
            <div className="bg-gray-50 rounded-lg p-3">
              <div className="font-semibold text-blue-600">As Guest</div>
              <div className="text-gray-600 text-xs">Quick start, no signup</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
