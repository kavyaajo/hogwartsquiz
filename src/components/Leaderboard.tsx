import React from 'react';
import { Trophy, Medal, Award, Users, Crown } from 'lucide-react';
import { houses } from '../data/houses';
import { getLeaderboard, getHousePoints } from '../utils/localStorage';

interface LeaderboardProps {
  onBack: () => void;
}

export const Leaderboard: React.FC<LeaderboardProps> = ({ onBack }) => {
  const leaderboard = getLeaderboard();
  const housePoints = getHousePoints();
  
  const sortedHouses = Object.entries(housePoints)
    .sort(([, a], [, b]) => b - a)
    .map(([name, points]) => ({ name, points, house: houses[name.toLowerCase()] }));

  const getRankIcon = (index: number) => {
    switch (index) {
      case 0: return <Crown className="text-yellow-400" size={24} />;
      case 1: return <Trophy className="text-gray-400" size={24} />;
      case 2: return <Medal className="text-orange-400" size={24} />;
      default: return <Award className="text-blue-400" size={20} />;
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-indigo-900 via-purple-900 to-black">
        <div className="absolute inset-0 opacity-10">
          {[...Array(40)].map((_, i) => (
            <div
              key={i}
              className="absolute bg-yellow-200 rounded-full animate-pulse"
              style={{
                width: `${Math.random() * 3 + 1}px`,
                height: `${Math.random() * 3 + 1}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`
              }}
            />
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 p-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <Trophy className="mx-auto mb-4 text-yellow-400" size={64} />
            <h1 className="text-5xl font-bold text-white mb-4 font-serif">
              LEADERBOARD
            </h1>
            <p className="text-xl text-yellow-300">
              Hall of Fame & House Championships
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* House Points */}
            <div className="bg-black bg-opacity-40 backdrop-blur-md rounded-lg p-8 shadow-2xl border border-yellow-300 border-opacity-30">
              <div className="flex items-center gap-3 mb-6">
                <Users className="text-yellow-400" size={32} />
                <h2 className="text-2xl font-bold text-white">House Points</h2>
              </div>
              
              <div className="space-y-4">
                {sortedHouses.map(({ name, points, house }, index) => (
                  <div key={name} className="flex items-center gap-4 p-4 rounded-lg bg-gray-800 bg-opacity-60">
                    <div className="flex items-center gap-2">
                      {getRankIcon(index)}
                      <span className="text-2xl">{house?.emoji || '🏰'}</span>
                    </div>
                    <div className="flex-1">
                      <div className="text-white font-bold text-lg">{name}</div>
                      <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden mt-1">
                        <div 
                          className={house?.bg || 'bg-gray-500'}
                          style={{ 
                            width: `${points > 0 ? Math.max((points / Math.max(...Object.values(housePoints))) * 100, 10) : 0}%`,
                            height: '100%'
                          }}
                        />
                      </div>
                    </div>
                    <div className="text-yellow-300 font-bold text-xl">
                      {points}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Top Wizards */}
            <div className="bg-black bg-opacity-40 backdrop-blur-md rounded-lg p-8 shadow-2xl border border-yellow-300 border-opacity-30">
              <div className="flex items-center gap-3 mb-6">
                <Crown className="text-yellow-400" size={32} />
                <h2 className="text-2xl font-bold text-white">Top Wizards</h2>
              </div>
              
              <div className="space-y-3">
                {leaderboard.slice(0, 10).map((entry, index) => (
                  <div key={`${entry.name}-${entry.completedAt}`} className="flex items-center gap-4 p-3 rounded-lg bg-gray-800 bg-opacity-40">
                    <div className="flex items-center gap-2 w-12">
                      {getRankIcon(index)}
                      <span className="text-gray-400 font-bold">#{index + 1}</span>
                    </div>
                    <div className="flex-1">
                      <div className="text-white font-medium">{entry.name}</div>
                      <div className="text-gray-400 text-sm flex items-center gap-2">
                        <span>{houses[entry.house.toLowerCase()]?.emoji || '🏰'}</span>
                        {entry.house}
                      </div>
                    </div>
                    <div className="text-yellow-300 font-bold">
                      {entry.score}/15
                    </div>
                  </div>
                ))}
                
                {leaderboard.length === 0 && (
                  <div className="text-center py-8 text-gray-400">
                    <Users size={48} className="mx-auto mb-4 opacity-50" />
                    <p>No wizards have completed the quiz yet.</p>
                    <p className="text-sm">Be the first to make history!</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Back Button */}
          <div className="text-center mt-12">
            <button
              onClick={onBack}
              className="px-8 py-4 rounded-lg bg-gradient-to-r from-yellow-500 to-yellow-600 text-black font-bold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
            >
              Back to Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};