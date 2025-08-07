export interface User {
  name: string;
  house: House;
  score: number;
  completedAt: Date;
}

export interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface House {
  name: string;
  colors: {
    primary: string;
    secondary: string;
    text: string;
    bg: string;
  };
  emoji: string;
}

export interface LeaderboardEntry {
  name: string;
  house: string;
  score: number;
  completedAt: string;
}