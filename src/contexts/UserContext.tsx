'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface User {
  id: string;
  username: string;
  email?: string;
  isGuest: boolean;
  createdAt: Date;
  stats?: {
    totalQuizzes: number;
    totalCorrect: number;
    totalQuestions: number;
    averageScore: number;
    bestScore: number;
  };
}

interface QuizResults {
  totalQuizzes: number;
  totalCorrect: number;
  totalQuestions: number;
  latestScore: number;
}

interface UserContextType {
  user: User | null;
  login: (username: string, email?: string) => void;
  loginAsGuest: () => void;
  logout: () => void;
  updateUserStats: (quizResults: QuizResults) => void;
  isLoading: boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load user from localStorage on app start
    const savedUser = localStorage.getItem('quiz-app-user');
    if (savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser) as User;
        parsedUser.createdAt = new Date(parsedUser.createdAt);
        setUser(parsedUser);
      } catch (error) {
        console.error('Error parsing saved user:', error);
        localStorage.removeItem('quiz-app-user');
      }
    }
    setIsLoading(false);
  }, []);

  const saveUserToStorage = (userData: User) => {
    localStorage.setItem('quiz-app-user', JSON.stringify(userData));
  };

  const login = (username: string, email?: string) => {
    const newUser: User = {
      id: `user-${Date.now()}-${Math.random()}`,
      username,
      email,
      isGuest: false,
      createdAt: new Date(),
      stats: {
        totalQuizzes: 0,
        totalCorrect: 0,
        totalQuestions: 0,
        averageScore: 0,
        bestScore: 0,
      }
    };
    setUser(newUser);
    saveUserToStorage(newUser);
  };

  const loginAsGuest = () => {
    const guestUser: User = {
      id: `guest-${Date.now()}-${Math.random()}`,
      username: `Guest${Math.floor(Math.random() * 1000)}`,
      isGuest: true,
      createdAt: new Date(),
      stats: {
        totalQuizzes: 0,
        totalCorrect: 0,
        totalQuestions: 0,
        averageScore: 0,
        bestScore: 0,
      }
    };
    setUser(guestUser);
    saveUserToStorage(guestUser);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('quiz-app-user');
  };

  const updateUserStats = (quizResults: QuizResults) => {
    if (!user || !user.stats) return;

    const newStats = {
      totalQuizzes: user.stats.totalQuizzes + quizResults.totalQuizzes,
      totalCorrect: user.stats.totalCorrect + quizResults.totalCorrect,
      totalQuestions: user.stats.totalQuestions + quizResults.totalQuestions,
      averageScore: 0, // Will be calculated below
      bestScore: Math.max(user.stats.bestScore, quizResults.latestScore),
    };

    // Calculate new average score
    if (newStats.totalQuestions > 0) {
      newStats.averageScore = (newStats.totalCorrect / newStats.totalQuestions) * 100;
    }

    const updatedUser = {
      ...user,
      stats: newStats
    };

    setUser(updatedUser);
    saveUserToStorage(updatedUser);
  };

  return (
    <UserContext.Provider value={{
      user,
      login,
      loginAsGuest,
      logout,
      updateUserStats,
      isLoading
    }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}
