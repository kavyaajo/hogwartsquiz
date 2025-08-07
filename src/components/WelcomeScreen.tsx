import React, { useState } from 'react';
import { Sparkles, Castle, Star } from 'lucide-react';
import { houses } from '../data/houses';
import { House } from '../types';

interface WelcomeScreenProps {
  onStart: (name: string, house: House) => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onStart }) => {
  const [name, setName] = useState('');
  const [selectedHouse, setSelectedHouse] = useState<string>('');

  const handleStart = () => {
    if (name.trim() && selectedHouse) {
      onStart(name.trim(), houses[selectedHouse]);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-indigo-900 via-purple-900 to-black">
        <div className="absolute inset-0 opacity-20">
          {[...Array(50)].map((_, i) => (
            <Star
              key={i}
              className="absolute text-yellow-200 animate-pulse"
              size={Math.random() * 8 + 4}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 3}s`
              }}
            />
          ))}
        </div>
        
        {/* Castle Silhouette */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-black opacity-40">
          <svg viewBox="0 0 100 20" className="w-full h-full">
            <polygon points="0,20 15,12 25,15 35,8 45,13 55,6 65,11 75,5 85,9 100,4 100,20" fill="currentColor" />
          </svg>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen p-8">
        <div className="max-w-2xl w-full text-center">
          {/* Title */}
          <div className="mb-12 animate-fade-in">
            <Castle className="mx-auto mb-4 text-yellow-300" size={64} />
            <h1 className="text-6xl font-bold text-white mb-4 font-serif tracking-wider">
              HOGWARTS
            </h1>
            <h2 className="text-3xl text-yellow-300 font-serif mb-2">
              Quiz Tournament
            </h2>
            <div className="flex items-center justify-center gap-2 text-yellow-200">
              <Sparkles size={16} className="animate-pulse" />
              <span className="text-lg">Test your magical knowledge</span>
              <Sparkles size={16} className="animate-pulse" />
            </div>
          </div>

          {/* Form */}
          <div className="bg-black bg-opacity-40 backdrop-blur-md rounded-lg p-8 shadow-2xl border border-yellow-300 border-opacity-30">
            <div className="space-y-6">
              {/* Name Input */}
              <div>
                <label className="block text-yellow-200 text-lg font-medium mb-3">
                  Enter your name, young wizard:
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-gray-800 bg-opacity-80 text-white border-2 border-yellow-400 border-opacity-50 focus:border-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-opacity-50 transition-all text-lg"
                  placeholder="Your magical name..."
                />
              </div>

              {/* House Selection */}
              <div>
                <label className="block text-yellow-200 text-lg font-medium mb-4">
                  Choose your house:
                </label>
                <div className="grid grid-cols-2 gap-4">
                  {Object.entries(houses).map(([key, house]) => (
                    <button
                      key={key}
                      onClick={() => setSelectedHouse(key)}
                      className={`p-4 rounded-lg border-2 transition-all duration-300 transform hover:scale-105 ${
                        selectedHouse === key
                          ? `${house.bg} border-white shadow-lg`
                          : 'bg-gray-800 bg-opacity-60 border-gray-600 hover:border-gray-400'
                      }`}
                    >
                      <div className="text-2xl mb-2">{house.emoji}</div>
                      <div className={`font-bold ${selectedHouse === key ? 'text-white' : 'text-gray-300'}`}>
                        {house.name}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Start Button */}
              <button
                onClick={handleStart}
                disabled={!name.trim() || !selectedHouse}
                className="w-full py-4 px-8 rounded-lg bg-gradient-to-r from-yellow-400 to-yellow-600 text-black font-bold text-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none group"
              >
                <div className="flex items-center justify-center gap-2">
                  <Sparkles className="group-hover:animate-spin" size={24} />
                  Begin the Quiz
                  <Sparkles className="group-hover:animate-spin" size={24} />
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};