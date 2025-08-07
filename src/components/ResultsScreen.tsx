import React from 'react';
import { Trophy, Home, RotateCcw, Sparkles, Crown } from 'lucide-react';
import { House } from '../types';

interface ResultsScreenProps {
  user: { name: string; house: House };
  score: number;
  totalQuestions: number;
  onRestart: () => void;
  onGoHome: () => void;
}

export const ResultsScreen: React.FC<ResultsScreenProps> = ({
  user,
  score,
  totalQuestions,
  onRestart,
  onGoHome
}) => {
  const percentage = Math.round((score / totalQuestions) * 100);
  const housePoints = Math.max(1, Math.floor(score * 2));

  const getScoreMessage = () => {
    if (percentage >= 90) return { text: "Outstanding! You're a true wizard!", icon: Crown };
    if (percentage >= 80) return { text: "Excellent! Magic flows through you!", icon: Trophy };
    if (percentage >= 70) return { text: "Well done! A solid performance!", icon: Sparkles };
    if (percentage >= 60) return { text: "Good effort! Keep studying!", icon: Sparkles };
    return { text: "Practice makes perfect, young wizard!", icon: Sparkles };
  };

  const { text: message, icon: MessageIcon } = getScoreMessage();

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-indigo-900 via-purple-900 to-black">
        <div className="absolute inset-0 opacity-20">
          {[...Array(100)].map((_, i) => (
            <div
              key={i}
              className="absolute bg-yellow-300 rounded-full animate-bounce"
              style={{
                width: `${Math.random() * 6 + 2}px`,
                height: `${Math.random() * 6 + 2}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${1 + Math.random()}s`
              }}
            />
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen p-8">
        <div className="max-w-3xl w-full text-center">
          {/* Results Card */}
          <div className="bg-black bg-opacity-50 backdrop-blur-md rounded-lg p-12 shadow-2xl border border-yellow-300 border-opacity-30 animate-fade-in">
            {/* Header */}
            <div className="mb-8">
              <MessageIcon className="mx-auto mb-4 text-yellow-400 animate-pulse" size={80} />
              <h1 className="text-4xl font-bold text-white mb-4 font-serif">
                Quiz Complete!
              </h1>
              <p className="text-2xl text-yellow-300 font-bold">
                {message}
              </p>
            </div>

            {/* Score Display */}
            <div className="mb-8 space-y-4">
              <div className="text-6xl font-bold text-white mb-2">
                {score}/{totalQuestions}
              </div>
              <div className="text-2xl text-gray-300">
                {percentage}% Correct
              </div>
              
              {/* Score Bar */}
              <div className="w-full max-w-md mx-auto">
                <div className="w-full h-4 bg-gray-700 rounded-full overflow-hidden">
                  <div 
                    className={`h-full transition-all duration-2000 ${user.house.bg}`}
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>
            </div>

            {/* House Points */}
            <div className="mb-12">
              <div className={`inline-flex items-center gap-3 px-6 py-4 rounded-lg ${user.house.bg} text-white font-bold text-xl shadow-lg`}>
                <span className="text-2xl">{user.house.emoji}</span>
                <span>{housePoints} points awarded to {user.house.name}!</span>
                <Sparkles className="animate-spin" size={20} />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={onRestart}
                className="flex items-center justify-center gap-2 px-8 py-4 rounded-lg bg-gradient-to-r from-green-600 to-green-700 text-white font-bold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
              >
                <RotateCcw size={24} />
                Try Again
              </button>
              <button
                onClick={onGoHome}
                className="flex items-center justify-center gap-2 px-8 py-4 rounded-lg bg-gradient-to-r from-yellow-500 to-yellow-600 text-black font-bold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
              >
                <Home size={24} />
                Go Home
              </button>
            </div>
          </div>

          {/* Personal Stats */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-black bg-opacity-30 backdrop-blur-sm rounded-lg p-4 border border-gray-600">
              <div className="text-gray-300 text-sm">Wizard</div>
              <div className="text-white font-bold text-lg">{user.name}</div>
            </div>
            <div className="bg-black bg-opacity-30 backdrop-blur-sm rounded-lg p-4 border border-gray-600">
              <div className="text-gray-300 text-sm">House</div>
              <div className="text-white font-bold text-lg flex items-center gap-2">
                <span>{user.house.emoji}</span>
                {user.house.name}
              </div>
            </div>
            <div className="bg-black bg-opacity-30 backdrop-blur-sm rounded-lg p-4 border border-gray-600">
              <div className="text-gray-300 text-sm">Achievement</div>
              <div className="text-white font-bold text-lg">{percentage >= 90 ? 'Master' : percentage >= 70 ? 'Skilled' : 'Apprentice'} Wizard</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};