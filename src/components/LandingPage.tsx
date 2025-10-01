'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useUser } from '@/contexts/UserContext';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { 
  Globe, 
  MapPin, 
  Calculator, 
  TrendingUp, 
  Users, 
  Award, 
  Clock,
  Target,
  BookOpen,
  BarChart3,
  PieChart,
  Activity,
  ChevronRight,
  Play,
  Star
} from 'lucide-react';

interface LandingPageProps {
  onStartQuiz: () => void;
  onShowProfile?: () => void;
}

export function LandingPage({ onStartQuiz, onShowProfile }: LandingPageProps) {
  const { user } = useUser();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [stats, setStats] = useState({
    totalUsers: 12847,
    totalQuizzes: 45623,
    accuracy: 87,
    countries: 195
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
      // Simulate real-time stats updates
      setStats(prev => ({
        ...prev,
        totalUsers: prev.totalUsers + Math.floor(Math.random() * 3),
        totalQuizzes: prev.totalQuizzes + Math.floor(Math.random() * 5)
      }));
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const features = [
    {
      icon: Globe,
      title: 'World Geography',
      description: 'Master countries, capitals, and flags from all continents',
      color: 'blue',
      count: '195 Countries',
      link: '/setup'
    },
    {
      icon: BookOpen,
      title: 'Geography Quiz',
      description: 'Match capitals with countries in an interactive quiz',
      color: 'indigo',
      count: 'Capital Matching',
      link: '/geography-quiz'
    },
    {
      icon: MapPin,
      title: 'US States & Capitals',
      description: 'Complete guide to American geography and state facts',
      color: 'red',
      count: '50 States',
      link: '/us-states'
    },
    {
      icon: Calculator,
      title: 'Math Challenges',
      description: 'Grade-appropriate 3-digit addition practice',
      color: 'purple',
      count: '∞ Problems',
      link: '/math-challenges'
    },
    {
      icon: Clock,
      title: 'World Time Dashboard',
      description: 'Real-time global clock and timezone learning',
      color: 'emerald',
      count: '16 Time Zones',
      link: '/world-time'
    }
  ];

  const achievements = [
    { label: 'Geography Expert', users: 2847, icon: Globe, color: 'emerald' },
    { label: 'Math Wizard', users: 1923, icon: Calculator, color: 'violet' },
    { label: 'Quick Learner', users: 5634, icon: Clock, color: 'amber' },
    { label: 'Perfect Score', users: 892, icon: Star, color: 'rose' }
  ];

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#fff8ec' }}>
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-br from-orange-500 to-red-500 p-2 rounded-xl shadow-lg">
                <Globe className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                  Learning Hub
                </h1>
                <p className="text-sm text-gray-600">Interactive Education Platform</p>
              </div>
            </div>
            
            {user && (
              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <div className="text-sm font-medium text-gray-900">
                    Welcome back, {user.isGuest ? 'Guest' : user.username}!
                  </div>
                  <div className="text-xs text-gray-500">
                    {user.stats?.totalQuizzes || 0} quizzes completed
                  </div>
                </div>
                <button
                  onClick={onShowProfile}
                  className="w-10 h-10 bg-gradient-to-br from-orange-400 to-red-400 rounded-full flex items-center justify-center hover:shadow-lg transition-all duration-300"
                >
                  <span className="text-white font-bold">
                    {user.isGuest ? '👤' : user.username.charAt(0).toUpperCase()}
                  </span>
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-16">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-orange-50 opacity-70"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <div className="inline-flex items-center bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-medium">
                  <Activity className="w-4 h-4 mr-2" />
                  Live Learning Platform
                </div>
                <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                  <span className="bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 bg-clip-text text-transparent">
                    Master
                  </span>
                  <br />
                  <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                    Geography & Math
                  </span>
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed">
                  Interactive quizzes and challenges designed for students, educators, and lifelong learners. 
                  Track your progress with real-time analytics.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  onClick={onStartQuiz}
                  className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center"
                >
                  <Play className="w-5 h-5 mr-2" />
                  Start Learning Now
                </Button>
                <Link href="/world-time">
                  <Button
                    variant="outline"
                    className="px-8 py-4 text-lg font-semibold rounded-xl border-2 hover:bg-gray-50 transition-all duration-300 flex items-center w-full"
                  >
                    <Clock className="w-5 h-5 mr-2" />
                    World Time Dashboard
                  </Button>
                </Link>
              </div>
            </div>

            {/* Live Stats Dashboard */}
            <div className="space-y-6">
              <Card className="p-6 bg-white/60 backdrop-blur-sm border-0 shadow-xl">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">Live Platform Stats</h3>
                  <div className="flex items-center text-green-600 text-sm font-medium">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse mr-2"></div>
                    Live
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4">
                    <div className="flex items-center justify-between">
                      <Users className="w-8 h-8 text-blue-600" />
                      <TrendingUp className="w-4 h-4 text-blue-500" />
                    </div>
                    <div className="mt-2">
                      <div className="text-2xl font-bold text-blue-900">{stats.totalUsers.toLocaleString()}</div>
                      <div className="text-sm text-blue-600">Active Learners</div>
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-4">
                    <div className="flex items-center justify-between">
                      <Target className="w-8 h-8 text-green-600" />
                      <BarChart3 className="w-4 h-4 text-green-500" />
                    </div>
                    <div className="mt-2">
                      <div className="text-2xl font-bold text-green-900">{stats.totalQuizzes.toLocaleString()}</div>
                      <div className="text-sm text-green-600">Quizzes Completed</div>
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-4">
                    <div className="flex items-center justify-between">
                      <Award className="w-8 h-8 text-purple-600" />
                      <PieChart className="w-4 h-4 text-purple-500" />
                    </div>
                    <div className="mt-2">
                      <div className="text-2xl font-bold text-purple-900">{stats.accuracy}%</div>
                      <div className="text-sm text-purple-600">Avg Accuracy</div>
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-4">
                    <div className="flex items-center justify-between">
                      <Globe className="w-8 h-8 text-orange-600" />
                      <Activity className="w-4 h-4 text-orange-500" />
                    </div>
                    <div className="mt-2">
                      <div className="text-2xl font-bold text-orange-900">{stats.countries}</div>
                      <div className="text-sm text-orange-600">Countries</div>
                    </div>
                  </div>
                </div>

                {/* Current Time */}
                <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Clock className="w-5 h-5 text-gray-600 mr-2" />
                      <span className="text-sm font-medium text-gray-700">Current Time</span>
                    </div>
                    <div className="text-lg font-bold text-gray-900">
                      {currentTime.toLocaleTimeString('en-US', { 
                        hour12: true, 
                        hour: 'numeric', 
                        minute: '2-digit'
                      })}
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Choose Your Learning Path</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Explore our comprehensive educational modules designed to enhance your knowledge
            </p>
          </div>

          <div className="grid lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Link key={index} href={feature.link}>
                <Card className="group cursor-pointer hover:shadow-2xl transition-all duration-300 bg-white border-0 shadow-lg hover:-translate-y-2 h-full">
                  <div className="p-8">
                    <div className={`w-16 h-16 bg-gradient-to-br from-${feature.color}-400 to-${feature.color}-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                      <feature.icon className="w-8 h-8 text-white" />
                    </div>
                    
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="text-xl font-bold text-gray-900">{feature.title}</h3>
                        <span className={`text-xs font-medium text-${feature.color}-600 bg-${feature.color}-50 px-2 py-1 rounded-full`}>
                          {feature.count}
                        </span>
                      </div>
                      
                      <p className="text-gray-600 leading-relaxed text-sm">{feature.description}</p>
                      
                      <div className="flex items-center text-orange-600 font-medium group-hover:text-orange-700 transition-colors">
                        <span>Start Learning</span>
                        <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section className="py-16 bg-white/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Achievement Leaderboard</h2>
            <p className="text-xl text-gray-600">Join thousands of learners earning recognition</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {achievements.map((achievement, index) => (
              <Card key={index} className="p-6 text-center hover:shadow-lg transition-shadow bg-white border-0 shadow-md">
                <div className={`w-12 h-12 bg-gradient-to-br from-${achievement.color}-400 to-${achievement.color}-600 rounded-xl flex items-center justify-center mx-auto mb-4`}>
                  <achievement.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{achievement.label}</h3>
                <div className="text-2xl font-bold text-gray-700 mb-1">
                  {achievement.users.toLocaleString()}
                </div>
                <div className="text-sm text-gray-500">Achievers</div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Card className="p-12 bg-gradient-to-br from-orange-500 to-red-500 border-0 text-white shadow-2xl">
            <h2 className="text-4xl font-bold mb-6">Ready to Start Learning?</h2>
            <p className="text-xl mb-8 opacity-90">
              Join our community of learners and track your progress with detailed analytics
            </p>
            <Button
              onClick={onStartQuiz}
              className="bg-white text-orange-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 inline-flex items-center"
            >
              <Play className="w-5 h-5 mr-2" />
              Begin Your Journey
            </Button>
          </Card>
        </div>
      </section>
    </div>
  );
}
