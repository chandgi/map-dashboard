'use client';

import { useState, useEffect } from 'react';
import { useUser } from '@/contexts/UserContext';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Trophy, Target, TrendingUp, LogOut, User, Clock, Globe } from 'lucide-react';

interface UserProfileProps {
  onClose: () => void;
}

export function UserProfile({ onClose }: UserProfileProps) {
  const { user, logout } = useUser();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [showWorldTime, setShowWorldTime] = useState(false);

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  if (!user) return null;

  const handleLogout = () => {
    logout();
    onClose();
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatPercentage = (value: number) => {
    return Math.round(value);
  };

  const formatTime = (date: Date, timeZone: string) => {
    return date.toLocaleTimeString('en-US', {
      timeZone: timeZone,
      hour12: true,
      hour: 'numeric',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const formatTimeZoneDate = (date: Date, timeZone: string) => {
    return date.toLocaleDateString('en-US', {
      timeZone: timeZone,
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    });
  };

  const worldTimeZones = [
    { name: 'New York', timeZone: 'America/New_York', flag: '🇺🇸' },
    { name: 'London', timeZone: 'Europe/London', flag: '🇬🇧' },
    { name: 'Tokyo', timeZone: 'Asia/Tokyo', flag: '🇯🇵' },
    { name: 'Sydney', timeZone: 'Australia/Sydney', flag: '🇦🇺' },
    { name: 'Dubai', timeZone: 'Asia/Dubai', flag: '🇦🇪' },
    { name: 'Los Angeles', timeZone: 'America/Los_Angeles', flag: '🇺🇸' }
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full p-8 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
            {user.isGuest ? (
              <User className="w-10 h-10 text-orange-600" />
            ) : (
              <div className="text-2xl font-bold text-orange-600">
                {user.username.charAt(0).toUpperCase()}
              </div>
            )}
          </div>
          <h2 className="text-2xl font-bold text-gray-900">
            {user.isGuest ? 'Guest User' : user.username}
          </h2>
          {user.email && (
            <p className="text-gray-600 mt-1">{user.email}</p>
          )}
          <p className="text-sm text-gray-500 mt-2">
            Member since {formatDate(user.createdAt)}
          </p>
        </div>

        {/* World Time Section */}
        <Card className="p-4 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <Globe className="w-5 h-5 text-blue-500 mr-2" />
              <span className="font-semibold text-gray-900">World Time</span>
            </div>
            <Button
              onClick={() => setShowWorldTime(!showWorldTime)}
              variant="outline"
              className="text-sm px-3 py-1"
            >
              {showWorldTime ? 'Hide' : 'Show'} Times
            </Button>
          </div>
          
          {/* Local Time */}
          <div className="bg-orange-50 rounded-lg p-3 mb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Clock className="w-4 h-4 text-orange-600 mr-2" />
                <span className="font-medium text-orange-700">Your Local Time</span>
              </div>
              <div className="text-right">
                <div className="text-lg font-bold text-orange-600">
                  {currentTime.toLocaleTimeString('en-US', { 
                    hour12: true, 
                    hour: 'numeric', 
                    minute: '2-digit',
                    second: '2-digit'
                  })}
                </div>
                <div className="text-sm text-orange-500">
                  {currentTime.toLocaleDateString('en-US', { 
                    weekday: 'short', 
                    month: 'short', 
                    day: 'numeric',
                    year: 'numeric'
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* World Times */}
          {showWorldTime && (
            <div className="space-y-3">
              <div className="grid grid-cols-1 gap-2">
                {worldTimeZones.map((zone) => (
                  <div key={zone.timeZone} className="bg-gray-50 rounded-lg p-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <span className="text-lg mr-2">{zone.flag}</span>
                        <span className="font-medium text-gray-700">{zone.name}</span>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-bold text-gray-600">
                          {formatTime(currentTime, zone.timeZone)}
                        </div>
                        <div className="text-xs text-gray-500">
                          {formatTimeZoneDate(currentTime, zone.timeZone)}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Time Zone Educational Info */}
              <div className="bg-blue-50 rounded-lg p-3 border border-blue-200">
                <div className="text-center">
                  <div className="text-sm font-semibold text-blue-700 mb-1">
                    🌍 Did You Know?
                  </div>
                  <div className="text-xs text-blue-600">
                    Earth has 24 time zones, each roughly 15° of longitude apart. 
                    When it&apos;s noon in London, it&apos;s midnight in New Zealand!
                  </div>
                </div>
              </div>
            </div>
          )}
        </Card>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <Card className="p-4 text-center bg-blue-50 border-blue-200">
            <div className="text-2xl font-bold text-blue-600 mb-1">
              {user.stats?.totalQuizzes || 0}
            </div>
            <div className="text-sm text-blue-700 font-medium">Total Quizzes</div>
          </Card>
          <Card className="p-4 text-center bg-green-50 border-green-200">
            <div className="text-2xl font-bold text-green-600 mb-1">
              {formatPercentage(user.stats?.averageScore || 0)}%
            </div>
            <div className="text-sm text-green-700 font-medium">Average Score</div>
          </Card>
        </div>

        {/* Detailed Stats */}
        <div className="space-y-4 mb-6">
          <Card className="p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center">
                <Trophy className="w-5 h-5 text-yellow-500 mr-2" />
                <span className="font-semibold text-gray-900">Best Score</span>
              </div>
              <span className="text-xl font-bold text-yellow-600">
                {formatPercentage(user.stats?.bestScore || 0)}%
              </span>
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center">
                <Target className="w-5 h-5 text-purple-500 mr-2" />
                <span className="font-semibold text-gray-900">Questions Answered</span>
              </div>
              <span className="text-xl font-bold text-purple-600">
                {user.stats?.totalQuestions || 0}
              </span>
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center">
                <TrendingUp className="w-5 h-5 text-green-500 mr-2" />
                <span className="font-semibold text-gray-900">Correct Answers</span>
              </div>
              <div className="text-right">
                <div className="text-xl font-bold text-green-600">
                  {user.stats?.totalCorrect || 0}
                </div>
                <div className="text-sm text-gray-500">
                  {(user.stats?.totalQuestions || 0) > 0 
                    ? `${formatPercentage(((user.stats?.totalCorrect || 0) / (user.stats?.totalQuestions || 1)) * 100)}% accuracy`
                    : 'No quizzes yet'
                  }
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Progress Encouragement */}
        {(user.stats?.totalQuizzes || 0) > 0 && (
          <Card className="p-4 bg-orange-50 border-orange-200 mb-6">
            <div className="text-center">
              <div className="text-lg font-semibold text-orange-700 mb-2">
                🎉 Keep Learning!
              </div>
              <div className="text-sm text-orange-600">
                {(user.stats?.totalQuizzes || 0) < 5 
                  ? `Complete ${5 - (user.stats?.totalQuizzes || 0)} more quizzes to unlock achievements!`
                  : (user.stats?.averageScore || 0) < 80
                  ? "Try different subjects to improve your overall score!"
                  : "Amazing progress! You're becoming a quiz master!"
                }
              </div>
            </div>
          </Card>
        )}

        {/* Action Buttons */}
        <div className="flex space-x-3">
          <Button
            onClick={onClose}
            variant="outline"
            className="flex-1"
          >
            Close
          </Button>
          <Button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white flex items-center justify-center"
          >
            <LogOut className="w-4 h-4 mr-1" />
            {user.isGuest ? 'Exit' : 'Logout'}
          </Button>
        </div>
      </div>
    </div>
  );
}
