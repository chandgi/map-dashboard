'use client';

import { useState, useRef, useEffect } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { CheckCircle, XCircle, RotateCcw, Home, Shuffle } from 'lucide-react';
import Link from 'next/link';

interface QuizItem {
  id: string;
  capital: string;
  country: string;
  countryCode?: string;
}

interface Connection {
  capitalId: string;
  countryId: string;
  isCorrect?: boolean;
}

export default function GeographyQuizPage() {
  const [quizData, setQuizData] = useState<QuizItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [connections, setConnections] = useState<Connection[]>([]);
  const [dragging, setDragging] = useState<string | null>(null);
  const [dragStart, setDragStart] = useState<{x: number, y: number} | null>(null);
  const [dragCurrent, setDragCurrent] = useState<{x: number, y: number} | null>(null);
  const [selectedCapital, setSelectedCapital] = useState<string | null>(null);
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Shuffle the right column for the quiz
  const [shuffledCountries, setShuffledCountries] = useState<QuizItem[]>([]);
  
  // Also make capitals shuffleable
  const [shuffledCapitals, setShuffledCapitals] = useState<QuizItem[]>([]);

  // Fetch quiz data from API
  useEffect(() => {
    const fetchQuizData = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/quiz/countries-capitals');
        
        if (!response.ok) {
          throw new Error('Failed to fetch quiz data');
        }
        
        const data = await response.json();
        
        if (data.error) {
          throw new Error(data.error);
        }
        
        // Take first 8 items for the quiz, or all if less than 8
        const quizItems = data.slice(0, Math.min(8, data.length));
        
        if (quizItems.length === 0) {
          throw new Error('No quiz data available');
        }
        
        setQuizData(quizItems);
        setShuffledCapitals(quizItems);
        setShuffledCountries([...quizItems].sort(() => Math.random() - 0.5));
      } catch (err) {
        console.error('Error fetching quiz data:', err);
        setError('Failed to load quiz data. Please refresh the page to try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchQuizData();
  }, []);

  const shuffleItems = () => {
    if (quizData.length === 0) return;
    
    // Shuffle both capitals and countries arrays
    const shuffledCaps = [...quizData].sort(() => Math.random() - 0.5);
    const shuffledCountriesArray = [...quizData].sort(() => Math.random() - 0.5);
    
    setShuffledCapitals(shuffledCaps);
    setShuffledCountries(shuffledCountriesArray);
    
    // Clear existing connections when shuffling
    setConnections([]);
    setSelectedCapital(null);
    setShowResults(false);
    setScore(0);
  };

  // Force re-render of connection lines when connections change
  useEffect(() => {
    const timer = setTimeout(() => {
      // This will trigger a re-render of the SVG lines
      if (svgRef.current) {
        svgRef.current.style.display = 'none';
        // Force reflow
        void svgRef.current.getBoundingClientRect();
        svgRef.current.style.display = 'block';
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [connections]);

  const handleDragStart = (e: React.DragEvent, capitalId: string) => {
    e.dataTransfer.setData('text/plain', capitalId);
    setDragging(capitalId);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, countryId: string) => {
    e.preventDefault();
    const capitalId = e.dataTransfer.getData('text/plain');
    
    if (!capitalId) return;

    // Remove any existing connection for this capital
    const newConnections = connections.filter(c => c.capitalId !== capitalId);
    
    // Add new connection
    newConnections.push({
      capitalId: capitalId,
      countryId: countryId
    });

    setConnections(newConnections);
    setDragging(null);
  };

  const handleDragEnd = () => {
    setDragging(null);
  };

  // Mouse-based line drawing for visual connection
  const handleMouseDown = (e: React.MouseEvent, capitalId: string) => {
    if (!containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const startX = e.clientX - rect.left;
    const startY = e.clientY - rect.top;
    
    setDragging(capitalId);
    setDragStart({ x: startX, y: startY });
    setDragCurrent({ x: startX, y: startY });
    
    // Prevent text selection
    e.preventDefault();
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!dragging || !containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const currentX = e.clientX - rect.left;
    const currentY = e.clientY - rect.top;
    
    setDragCurrent({ x: currentX, y: currentY });
  };

  const handleMouseUp = (e: React.MouseEvent, countryId?: string) => {
    if (!dragging) return;
    
    if (countryId) {
      // Remove any existing connection for this capital
      const newConnections = connections.filter(c => c.capitalId !== dragging);
      
      // Add new connection
      newConnections.push({
        capitalId: dragging,
        countryId: countryId
      });

      setConnections(newConnections);
    }
    
    // Reset drag state
    setDragging(null);
    setDragStart(null);
    setDragCurrent(null);
  };

  const handleMouseLeave = () => {
    // Reset drag state if mouse leaves the container
    setDragging(null);
    setDragStart(null);
    setDragCurrent(null);
  };

  // Click-to-connect functionality as backup
  const handleCapitalClick = (capitalId: string) => {
    setSelectedCapital(selectedCapital === capitalId ? null : capitalId);
  };

  const handleCountryClick = (countryId: string) => {
    if (!selectedCapital) return;

    // Remove any existing connection for this capital
    const newConnections = connections.filter(c => c.capitalId !== selectedCapital);
    
    // Add new connection
    newConnections.push({
      capitalId: selectedCapital,
      countryId: countryId
    });

    setConnections(newConnections);
    setSelectedCapital(null);
  };

  const checkAnswers = () => {
    const updatedConnections = connections.map(connection => {
      const capital = quizData.find((item: QuizItem) => item.id === connection.capitalId);
      const country = quizData.find((item: QuizItem) => item.id === connection.countryId);
      
      return {
        ...connection,
        isCorrect: capital?.id === country?.id
      };
    });

    setConnections(updatedConnections);
    const correctCount = updatedConnections.filter(c => c.isCorrect).length;
    setScore(correctCount);
    setShowResults(true);
  };

  const resetQuiz = () => {
    setConnections([]);
    setSelectedCapital(null);
    setShowResults(false);
    setScore(0);
    setDragging(null);
    setDragStart(null);
    setDragCurrent(null);
    
    // Re-shuffle the arrays
    if (quizData.length > 0) {
      const newShuffledCapitals = [...quizData].sort(() => Math.random() - 0.5);
      const newShuffledCountries = [...quizData].sort(() => Math.random() - 0.5);
      setShuffledCapitals(newShuffledCapitals);
      setShuffledCountries(newShuffledCountries);
    }
  };

  const getConnectionLine = (capitalId: string, countryId: string) => {
    if (!containerRef.current) return null;

    const capitalElement = document.querySelector(`[data-capital-id="${capitalId}"]`);
    const countryElement = document.querySelector(`[data-country-id="${countryId}"]`);

    if (!capitalElement || !countryElement) return null;

    const containerRect = containerRef.current.getBoundingClientRect();
    const capitalRect = capitalElement.getBoundingClientRect();
    const countryRect = countryElement.getBoundingClientRect();

    const x1 = capitalRect.right - containerRect.left;
    const y1 = capitalRect.top + capitalRect.height / 2 - containerRect.top;
    const x2 = countryRect.left - containerRect.left;
    const y2 = countryRect.top + countryRect.height / 2 - containerRect.top;

    return { x1, y1, x2, y2 };
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <h1 className="text-4xl font-bold text-gray-800">
              Find the <span className="text-blue-600">capitals</span>
            </h1>
            <Button
              onClick={shuffleItems}
              className="ml-4 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-lg flex items-center space-x-2 transition-colors"
            >
              <Shuffle className="w-4 h-4" />
              <span>Shuffle</span>
            </Button>
          </div>
          <p className="text-gray-600 text-lg mb-2">
            Instructions: match the capital with its country and have fun!
          </p>
          <p className="text-sm text-gray-500">
            💡 Tip: Click and drag from a capital to draw a line to its country, or click capital then country
          </p>
        </div>

        {/* Quiz Container */}
        <div 
          ref={containerRef} 
          className="relative max-w-4xl mx-auto"
          onMouseMove={handleMouseMove}
          onMouseUp={(e) => handleMouseUp(e)}
          onMouseLeave={handleMouseLeave}
        >
          <div className="grid grid-cols-2 gap-6 lg:gap-8">
            {/* Left Column - Capitals */}
            <div className="space-y-2">
              {shuffledCapitals.map((item) => {
                const connection = connections.find(c => c.capitalId === item.id);
                const isConnected = !!connection;
                const isCorrect = connection?.isCorrect;

                return (
                  <div
                    key={item.id}
                    data-capital-id={item.id}
                    onMouseDown={(e) => handleMouseDown(e, item.id)}
                    onClick={() => handleCapitalClick(item.id)}
                    className={`
                      relative p-3 rounded-lg border-2 cursor-pointer select-none max-w-xs
                      transition-all duration-200 hover:shadow-md
                      ${isConnected 
                        ? showResults
                          ? isCorrect 
                            ? 'bg-green-50 border-green-300 text-green-800'
                            : 'bg-red-50 border-red-300 text-red-800'
                          : 'bg-blue-50 border-blue-300 text-blue-800'
                        : 'bg-white border-gray-300 hover:border-blue-400'
                      }
                      ${dragging === item.id ? 'opacity-50 scale-105 ring-2 ring-orange-400' : ''}
                      ${selectedCapital === item.id ? 'ring-2 ring-orange-400 border-orange-400' : ''}
                    `}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-sm">{item.capital}</span>
                      {showResults && isConnected && (
                        isCorrect ? (
                          <CheckCircle className="w-4 h-4 text-green-600" />
                        ) : (
                          <XCircle className="w-4 h-4 text-red-600" />
                        )
                      )}
                    </div>
                    
                    {/* Connection point */}
                    <div className="absolute right-0 top-1/2 transform translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 bg-orange-400 rounded-full border-2 border-white shadow-sm"></div>
                  </div>
                );
              })}
            </div>

            {/* Right Column - Countries */}
            <div className="space-y-2">
              {shuffledCountries.map((item) => {
                const connection = connections.find(c => c.countryId === item.id);
                const isConnected = !!connection;
                const isCorrect = connection?.isCorrect;

                return (
                  <div
                    key={item.id}
                    data-country-id={item.id}
                    onMouseUp={(e) => handleMouseUp(e, item.id)}
                    onClick={() => handleCountryClick(item.id)}
                    className={`
                      relative p-3 rounded-lg border-2 transition-all duration-200 cursor-pointer select-none max-w-xs
                      ${isConnected 
                        ? showResults
                          ? isCorrect 
                            ? 'bg-green-50 border-green-300 text-green-800'
                            : 'bg-red-50 border-red-300 text-red-800'
                          : 'bg-blue-50 border-blue-300 text-blue-800'
                        : 'bg-white border-gray-300 hover:border-blue-400 hover:shadow-md'
                      }
                      ${dragging ? 'border-dashed border-orange-400 bg-orange-50 ring-2 ring-orange-200' : ''}
                      ${selectedCapital ? 'hover:ring-2 hover:ring-orange-300' : ''}
                    `}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-sm">{item.country}</span>
                      {showResults && isConnected && (
                        isCorrect ? (
                          <CheckCircle className="w-4 h-4 text-green-600" />
                        ) : (
                          <XCircle className="w-4 h-4 text-red-600" />
                        )
                      )}
                    </div>
                    
                    {/* Connection point */}
                    <div className="absolute left-0 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 bg-orange-400 rounded-full border-2 border-white shadow-sm"></div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Connection Lines SVG */}
          <svg
            ref={svgRef}
            className="absolute top-0 left-0 w-full h-full pointer-events-none"
            style={{ zIndex: 1 }}
          >
            {/* Existing connections */}
            {connections.map((connection) => {
              const line = getConnectionLine(connection.capitalId, connection.countryId);
              if (!line) return null;

              const isCorrect = connection.isCorrect;
              const strokeColor = showResults 
                ? isCorrect 
                  ? '#10b981' // green
                  : '#ef4444' // red
                : '#f97316'; // orange

              return (
                <line
                  key={`${connection.capitalId}-${connection.countryId}`}
                  x1={line.x1}
                  y1={line.y1}
                  x2={line.x2}
                  y2={line.y2}
                  stroke={strokeColor}
                  strokeWidth="3"
                  strokeLinecap="round"
                  className="transition-all duration-300"
                />
              );
            })}
            
            {/* Live dragging line */}
            {dragging && dragStart && dragCurrent && (
              <line
                x1={dragStart.x}
                y1={dragStart.y}
                x2={dragCurrent.x}
                y2={dragCurrent.y}
                stroke="#f97316"
                strokeWidth="3"
                strokeLinecap="round"
                strokeDasharray="5,5"
                className="animate-pulse"
              />
            )}
          </svg>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center space-x-4 mt-8">
          {!showResults ? (
            <Button
              onClick={checkAnswers}
              disabled={connections.length !== quizData.length}
              className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg disabled:opacity-50"
            >
              Check Answers
            </Button>
          ) : (
            <>
              <Button
                onClick={resetQuiz}
                className="px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg flex items-center space-x-2"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Try Again</span>
              </Button>
              <Link href="/">
                <Button className="px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white font-semibold rounded-lg flex items-center space-x-2">
                  <Home className="w-4 h-4" />
                  <span>Home</span>
                </Button>
              </Link>
            </>
          )}
        </div>

        {/* Results */}
        {showResults && (
          <Card className="mt-8 p-6 bg-white border-2 border-gray-200 text-center">
            <h3 className="text-2xl font-bold mb-4">
              Quiz Complete! 🎉
            </h3>
            <p className="text-lg mb-2">
              Your Score: <span className="font-bold text-blue-600">{score}/{quizData.length}</span>
            </p>
            <p className="text-gray-600">
              {score === quizData.length 
                ? "Perfect! You're a geography expert! 🌟"
                : score >= quizData.length * 0.7
                ? "Great job! Keep learning! 👏"
                : "Good try! Practice makes perfect! 💪"
              }
            </p>
          </Card>
        )}

        {/* Paper plane decoration */}
        <div className="fixed bottom-8 right-8 text-blue-400 opacity-20">
          <svg width="60" height="60" viewBox="0 0 24 24" fill="currentColor">
            <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
          </svg>
        </div>
      </div>
    </div>
  );
}
