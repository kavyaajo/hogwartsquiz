import { LeaderboardEntry, User } from '../types';

export const saveToLeaderboard = (user: User): void => {
  const existing = getLeaderboard();
  const newEntry: LeaderboardEntry = {
    name: user.name,
    house: user.house.name,
    score: user.score,
    completedAt: new Date().toISOString()
  };
  
  const updated = [...existing, newEntry]
    .sort((a, b) => b.score - a.score)
    .slice(0, 50); // Keep top 50
  
  localStorage.setItem('hogwarts-leaderboard', JSON.stringify(updated));
};

export const getLeaderboard = (): LeaderboardEntry[] => {
  const stored = localStorage.getItem('hogwarts-leaderboard');
  return stored ? JSON.parse(stored) : [];
};

export const getHousePoints = (): Record<string, number> => {
  const stored = localStorage.getItem('hogwarts-house-points');
  return stored ? JSON.parse(stored) : {
    Gryffindor: 0,
    Hufflepuff: 0,
    Ravenclaw: 0,
    Slytherin: 0
  };
};

export const addHousePoints = (house: string, points: number): void => {
  const current = getHousePoints();
  current[house] = (current[house] || 0) + points;
  localStorage.setItem('hogwarts-house-points', JSON.stringify(current));
};