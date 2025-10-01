'use client';

import { useState, useEffect } from 'react';
import { useUser } from '@/contexts/UserContext';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import CountryIcon from '@/components/CountryIcon';
import { 
  Globe, 
  Clock, 
  MapPin, 
  Calendar,
  Sun,
  Moon,
  ArrowLeft,
  BarChart3,
  PieChart,
  TrendingUp,
  Activity,
  Plus,
  X,
  Search
} from 'lucide-react';
import Link from 'next/link';

export default function WorldTimePage() {
  const { user } = useUser();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [selectedTimeZone, setSelectedTimeZone] = useState('America/New_York');
  const [displayedTimeZones, setDisplayedTimeZones] = useState<string[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [hoveredZone, setHoveredZone] = useState<string | null>(null);
  const [showTimePopup, setShowTimePopup] = useState<string | null>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

    // Helper function to get country code from timezone
  const getCountryCodeFromZone = (timeZone: string): string => {
    const zoneToCode: { [key: string]: string } = {
      'America/New_York': 'US',
      'America/Los_Angeles': 'US',
      'America/Vancouver': 'CA',
      'America/Mexico_City': 'MX',
      'America/Sao_Paulo': 'BR',
      'Europe/London': 'GB',
      'Europe/Paris': 'FR',
      'Europe/Berlin': 'DE',
      'Europe/Moscow': 'RU',
      'Asia/Tokyo': 'JP',
      'Asia/Hong_Kong': 'HK',
      'Asia/Singapore': 'SG',
      'Asia/Dubai': 'AE',
      'Asia/Kolkata': 'IN',
      'Australia/Sydney': 'AU',
      'Africa/Cairo': 'EG'
    };
    return zoneToCode[timeZone] || 'US';
  };

  const worldTimeZones = [
    { 
      name: 'New York', 
      timeZone: 'America/New_York', 
      flag: '🇺🇸', 
      country: 'United States',
      countryCode: 'US',
      region: 'Eastern',
      utcOffset: '-5',
      coordinates: { x: 25, y: 35 }
    },
    { 
      name: 'London', 
      timeZone: 'Europe/London', 
      flag: '🇬🇧', 
      country: 'United Kingdom',
      countryCode: 'GB',
      region: 'Greenwich',
      utcOffset: '+0',
      coordinates: { x: 50, y: 25 }
    },
    { 
      name: 'Tokyo', 
      timeZone: 'Asia/Tokyo', 
      flag: '🇯🇵', 
      country: 'Japan',
      region: 'Japan Standard',
      utcOffset: '+9',
      coordinates: { x: 85, y: 30 }
    },
    { 
      name: 'Sydney', 
      timeZone: 'Australia/Sydney', 
      flag: '🇦🇺', 
      country: 'Australia',
      region: 'Australian Eastern',
      utcOffset: '+10',
      coordinates: { x: 88, y: 75 }
    },
    { 
      name: 'Dubai', 
      timeZone: 'Asia/Dubai', 
      flag: '🇦🇪', 
      country: 'United Arab Emirates',
      region: 'Gulf Standard',
      utcOffset: '+4',
      coordinates: { x: 62, y: 40 }
    },
    { 
      name: 'Los Angeles', 
      timeZone: 'America/Los_Angeles', 
      flag: '🇺🇸', 
      country: 'United States',
      region: 'Pacific',
      utcOffset: '-8',
      coordinates: { x: 15, y: 38 }
    },
    { 
      name: 'Paris', 
      timeZone: 'Europe/Paris', 
      flag: '🇫🇷', 
      country: 'France',
      region: 'Central European',
      utcOffset: '+1',
      coordinates: { x: 48, y: 22 }
    },
    { 
      name: 'Singapore', 
      timeZone: 'Asia/Singapore', 
      flag: '🇸🇬', 
      country: 'Singapore',
      region: 'Singapore Standard',
      utcOffset: '+8',
      coordinates: { x: 78, y: 60 }
    },
    { 
      name: 'Mumbai', 
      timeZone: 'Asia/Kolkata', 
      flag: '🇮🇳', 
      country: 'India',
      region: 'Indian Standard',
      utcOffset: '+5:30',
      coordinates: { x: 70, y: 45 }
    },
    { 
      name: 'Cairo', 
      timeZone: 'Africa/Cairo', 
      flag: '🇪🇬', 
      country: 'Egypt',
      region: 'Eastern European',
      utcOffset: '+2',
      coordinates: { x: 52, y: 42 }
    },
    { 
      name: 'Moscow', 
      timeZone: 'Europe/Moscow', 
      flag: '🇺', 
      country: 'Russia',
      region: 'Moscow Standard',
      utcOffset: '+3',
      coordinates: { x: 58, y: 18 }
    },
    { 
      name: 'São Paulo', 
      timeZone: 'America/Sao_Paulo', 
      flag: '🇧🇷', 
      country: 'Brazil',
      region: 'Brasília',
      utcOffset: '-3',
      coordinates: { x: 32, y: 65 }
    },
    { 
      name: 'Hong Kong', 
      timeZone: 'Asia/Hong_Kong', 
      flag: '🇭🇰', 
      country: 'Hong Kong',
      region: 'Hong Kong',
      utcOffset: '+8',
      coordinates: { x: 82, y: 40 }
    },
    { 
      name: 'Vancouver', 
      timeZone: 'America/Vancouver', 
      flag: '��', 
      country: 'Canada',
      region: 'Pacific',
      utcOffset: '-8',
      coordinates: { x: 18, y: 25 }
    },
    { 
      name: 'Berlin', 
      timeZone: 'Europe/Berlin', 
      flag: '��', 
      country: 'Germany',
      region: 'Central European',
      utcOffset: '+1',
      coordinates: { x: 51, y: 20 }
    },
    { 
      name: 'Mexico City', 
      timeZone: 'America/Mexico_City', 
      flag: '��', 
      country: 'Mexico',
      region: 'Central',
      utcOffset: '-6',
      coordinates: { x: 22, y: 50 }
    }
  ];

  // Initialize with first 8 time zones
  useEffect(() => {
    if (displayedTimeZones.length === 0) {
      setDisplayedTimeZones(worldTimeZones.slice(0, 8).map(zone => zone.timeZone));
    }
  }, [displayedTimeZones.length]);

  const formatTime = (date: Date, timeZone: string) => {
    return date.toLocaleTimeString('en-US', {
      timeZone: timeZone,
      hour12: true,
      hour: 'numeric',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const formatDate = (date: Date, timeZone: string) => {
    return date.toLocaleDateString('en-US', {
      timeZone: timeZone,
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const formatShortDate = (date: Date, timeZone: string) => {
    return date.toLocaleDateString('en-US', {
      timeZone: timeZone,
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    });
  };

  const getTimeOfDay = (date: Date, timeZone: string) => {
    const hour = parseInt(date.toLocaleTimeString('en-US', {
      timeZone: timeZone,
      hour: 'numeric',
      hour12: false
    }));
    
    if (hour >= 6 && hour < 12) return { period: 'Morning', icon: Sun, color: 'yellow' };
    if (hour >= 12 && hour < 18) return { period: 'Afternoon', icon: Sun, color: 'orange' };
    if (hour >= 18 && hour < 22) return { period: 'Evening', icon: Sun, color: 'red' };
    return { period: 'Night', icon: Moon, color: 'blue' };
  };

  const selectedZone = worldTimeZones.find(zone => zone.timeZone === selectedTimeZone) || worldTimeZones[0];
  const timeOfDay = getTimeOfDay(currentTime, selectedTimeZone);

  // Get displayed time zones data
  const displayedZones = worldTimeZones.filter(zone => displayedTimeZones.includes(zone.timeZone));
  
  // Get available time zones for adding (not currently displayed)
  const availableZones = worldTimeZones.filter(zone => !displayedTimeZones.includes(zone.timeZone));
  
  // Filter available zones by search term
  const filteredAvailableZones = availableZones.filter(zone => 
    zone.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    zone.country.toLowerCase().includes(searchTerm.toLowerCase()) ||
    zone.region.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const addTimeZone = (timeZone: string) => {
    if (displayedTimeZones.length < 16) {
      setDisplayedTimeZones([...displayedTimeZones, timeZone]);
      setShowAddModal(false);
      setSearchTerm('');
    }
  };

  const removeTimeZone = (timeZone: string) => {
    if (displayedTimeZones.length > 1) {
      setDisplayedTimeZones(displayedTimeZones.filter(tz => tz !== timeZone));
      // If removed timezone was selected, select the first remaining one
      if (selectedTimeZone === timeZone) {
        const remaining = displayedTimeZones.filter(tz => tz !== timeZone);
        if (remaining.length > 0) {
          setSelectedTimeZone(remaining[0]);
        }
      }
    }
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#fff8ec' }}>
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/" className="flex items-center text-orange-600 hover:text-orange-700">
                <ArrowLeft className="w-5 h-5 mr-2" />
                Back to Home
              </Link>
              <div className="h-6 w-px bg-gray-300"></div>
              <div className="flex items-center space-x-3">
                <div className="bg-gradient-to-br from-blue-500 to-purple-600 p-2 rounded-xl">
                  <Globe className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">World Time Dashboard</h1>
                  <p className="text-sm text-gray-600">Real-time global clock & timezone information</p>
                </div>
              </div>
            </div>
            
            {user && (
              <div className="flex items-center space-x-3">
                <div className="text-right">
                  <div className="text-sm font-medium text-gray-900">
                    {user.isGuest ? 'Guest User' : user.username}
                  </div>
                  <div className="text-xs text-gray-500">Learning Geography</div>
                </div>
                <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-red-400 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold">
                    {user.isGuest ? '👤' : user.username.charAt(0).toUpperCase()}
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main Dashboard */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-12 gap-6">
          {/* Sidebar */}
          <div className="col-span-3 space-y-4">
            {/* Navigation */}
            <Card className="p-4 bg-gradient-to-br from-gray-700 to-gray-800 text-white">
              <div className="space-y-3">
                <div className="flex items-center space-x-2 p-2 bg-white/10 rounded-lg">
                  <Clock className="w-4 h-4" />
                  <span className="text-sm font-medium">World Time</span>
                </div>
                <div className="flex items-center space-x-2 p-2 hover:bg-white/5 rounded-lg cursor-pointer">
                  <BarChart3 className="w-4 h-4" />
                  <span className="text-sm">Time Analytics</span>
                </div>
                <div className="flex items-center space-x-2 p-2 hover:bg-white/5 rounded-lg cursor-pointer">
                  <MapPin className="w-4 h-4" />
                  <span className="text-sm">Geography</span>
                </div>
              </div>
            </Card>

            {/* About the Data */}
            <Card className="p-4 bg-white">
              <div className="flex items-center space-x-2 mb-3">
                <Activity className="w-4 h-4 text-blue-600" />
                <span className="text-sm font-semibold text-gray-900">About the Data</span>
              </div>
              <p className="text-xs text-gray-600 mb-3">
                Real-time data from major cities across 8 different time zones, 
                updated every second.
              </p>
              <Button variant="outline" className="w-full text-xs py-2">
                Learn More
              </Button>
            </Card>
          </div>

          {/* Main Content */}
          <div className="col-span-9 space-y-6">
            {/* Header with Selected Time */}
            <div className="flex items-center justify-between">
              <h2 className="text-3xl font-bold text-gray-900 flex items-center">
                <Globe className="w-8 h-8 mr-3 text-blue-600" />
                World Time
              </h2>
              <div className="text-right">
                <div className="text-sm text-gray-500">Your Local Time</div>
                <div className="text-xl font-bold text-gray-900">
                  {currentTime.toLocaleTimeString('en-US', { 
                    hour12: true, 
                    hour: 'numeric', 
                    minute: '2-digit'
                  })}
                </div>
              </div>
            </div>

            {/* Top Row - Key Metrics */}
            <div className="grid grid-cols-4 gap-4">
              {/* Selected City Time */}
              <Card className="col-span-2 p-6 bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl">{selectedZone.flag}</span>
                    <div>
                      <div className="font-semibold text-blue-900">{selectedZone.name}</div>
                      <div className="text-sm text-blue-600">{selectedZone.country}</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-1 text-blue-600">
                    <timeOfDay.icon className="w-4 h-4" />
                    <span className="text-sm">{timeOfDay.period}</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="text-4xl font-bold text-blue-900">
                    {formatTime(currentTime, selectedTimeZone)}
                  </div>
                  <div className="text-sm text-blue-600">
                    {formatDate(currentTime, selectedTimeZone)}
                  </div>
                </div>
              </Card>

              {/* Time Zones Count */}
              <Card className="p-4 bg-gradient-to-br from-green-50 to-green-100 border-green-200">
                <div className="flex items-center justify-between mb-2">
                  <MapPin className="w-6 h-6 text-green-600" />
                  <TrendingUp className="w-4 h-4 text-green-500" />
                </div>
                <div className="text-2xl font-bold text-green-900">{displayedTimeZones.length}</div>
                <div className="text-sm text-green-600">Active Zones</div>
              </Card>

              {/* UTC Offset */}
              <Card className="p-4 bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
                <div className="flex items-center justify-between mb-2">
                  <Clock className="w-6 h-6 text-purple-600" />
                  <PieChart className="w-4 h-4 text-purple-500" />
                </div>
                <div className="text-2xl font-bold text-purple-900">UTC{selectedZone.utcOffset}</div>
                <div className="text-sm text-purple-600">Current Offset</div>
              </Card>
            </div>

            {/* World Clock Grid */}
            <div className="space-y-4">
              {/* Add/Remove Controls */}
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold text-gray-900">Active Time Zones</h3>
                <div className="flex items-center space-x-3">
                  <span className="text-sm text-gray-500">{displayedTimeZones.length}/16 zones</span>
                  <Button
                    onClick={() => setShowAddModal(true)}
                    disabled={displayedTimeZones.length >= 16 || availableZones.length === 0}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center text-sm"
                  >
                    <Plus className="w-4 h-4 mr-1" />
                    Add Zone
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-4 gap-4">
                {displayedZones.map((zone, index) => {
                  const timeOfDayInfo = getTimeOfDay(currentTime, zone.timeZone);
                  const isSelected = zone.timeZone === selectedTimeZone;
                  
                  return (
                    <div 
                      key={zone.timeZone} 
                      className="relative cursor-pointer"
                      onClick={() => setSelectedTimeZone(zone.timeZone)}
                    >
                      <Card 
                        className={`p-2 h-36 transition-all duration-300 hover:scale-95 hover:shadow-md ${
                          isSelected 
                            ? 'ring-2 ring-blue-500 bg-blue-50 border-blue-200' 
                            : 'bg-white hover:bg-gray-50'
                        }`}
                      >
                        {/* Remove button */}
                        {displayedTimeZones.length > 1 && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              removeTimeZone(zone.timeZone);
                            }}
                            className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center text-xs transition-colors z-10"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        )}

                        <div className="space-y-2">
                          {/* Top Row: Flag (left) + Day/Night Icon (right) - closer together */}
                          <div className="flex items-center justify-between px-2">
                            <CountryIcon 
                              countryCode={zone.countryCode || getCountryCodeFromZone(zone.timeZone)}
                              type="flag"
                              size={24}
                              fallback={zone.flag}
                              className="flex-shrink-0"
                            />
                            <timeOfDayInfo.icon className={`w-4 h-4 text-${timeOfDayInfo.color}-500`} />
                          </div>
                          
                          {/* City Name */}
                          <div className="text-center">
                            <div className="font-semibold text-gray-900 text-xs">{zone.name}</div>
                            <div className="text-xs text-gray-500">{zone.region}</div>
                          </div>
                          
                          {/* Bottom: Time and Date on one line */}
                          <div className="text-center border-t pt-2">
                            <div className="text-base font-bold text-gray-900">
                              {formatTime(currentTime, zone.timeZone).split(':').slice(0, 2).join(':')}
                              <span className="text-xs ml-1">
                                {formatTime(currentTime, zone.timeZone).split(' ')[1]}
                              </span>
                              <span className="text-xs text-gray-500 ml-2">
                                {formatShortDate(currentTime, zone.timeZone)}
                              </span>
                            </div>
                          </div>
                        </div>
                      </Card>
                    </div>
                  );
                })}
              </div>
            </div>            {/* Educational Info Section */}
            <Card className="p-6 bg-gradient-to-br from-orange-50 to-yellow-50 border-orange-200">
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Calendar className="w-5 h-5 text-orange-600" />
                  <h3 className="text-lg font-semibold text-orange-900">Geography Learning</h3>
                </div>
                
                <div className="grid md:grid-cols-3 gap-4 text-sm">
                  <div className="bg-white/50 rounded-lg p-3">
                    <div className="font-semibold text-orange-700 mb-1">🌍 Time Zones</div>
                    <div className="text-orange-600 text-xs">
                      Earth has 24 time zones, each roughly 15° of longitude apart. 
                      This helps coordinate time globally based on the sun&apos;s position.
                    </div>
                  </div>
                  
                  <div className="bg-white/50 rounded-lg p-3">
                    <div className="font-semibold text-orange-700 mb-1">🕰️ UTC Standard</div>
                    <div className="text-orange-600 text-xs">
                      Coordinated Universal Time (UTC) is the global time standard. 
                      All time zones are expressed as offsets from UTC.
                    </div>
                  </div>
                  
                  <div className="bg-white/50 rounded-lg p-3">
                    <div className="font-semibold text-orange-700 mb-1">🌅 Daylight Saving</div>
                    <div className="text-orange-600 text-xs">
                      Some regions adjust their clocks seasonally to make better use of daylight, 
                      affecting the UTC offset twice a year.
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>

      {/* Add Time Zone Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold text-gray-900">Add Time Zone</h3>
                <button
                  onClick={() => {
                    setShowAddModal(false);
                    setSearchTerm('');
                  }}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>
              
              {/* Search Input */}
              <div className="mt-4 relative">
                <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search cities, countries, or regions..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
            
            <div className="p-6 max-h-96 overflow-y-auto">
              {filteredAvailableZones.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  {availableZones.length === 0 ? (
                    <div>
                      <Clock className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                      <p>All available time zones are already displayed</p>
                    </div>
                  ) : (
                    <div>
                      <Search className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                      <p>No time zones found matching &quot;{searchTerm}&quot;</p>
                    </div>
                  )}
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-3">
                  {filteredAvailableZones.map((zone) => (
                    <button
                      key={zone.timeZone}
                      onClick={() => addTimeZone(zone.timeZone)}
                      className="flex items-center justify-between p-4 border border-gray-200 rounded-xl hover:bg-gray-50 hover:border-blue-300 transition-all duration-200 text-left"
                    >
                      <div className="flex items-center space-x-3">
                        <span className="text-2xl">{zone.flag}</span>
                        <div>
                          <div className="font-semibold text-gray-900">{zone.name}</div>
                          <div className="text-sm text-gray-500">{zone.country} • {zone.region}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium text-gray-900">
                          {formatTime(currentTime, zone.timeZone)}
                        </div>
                        <div className="text-sm text-gray-500">UTC{zone.utcOffset}</div>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
