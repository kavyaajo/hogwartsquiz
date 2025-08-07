import { House } from '../types';

export const houses: Record<string, House> = {
  gryffindor: {
    name: 'Gryffindor',
    colors: {
      primary: 'rgb(174, 26, 36)',
      secondary: 'rgb(255, 205, 0)',
      text: 'text-red-700',
      bg: 'bg-gradient-to-br from-red-600 to-yellow-500'
    },
    emoji: '🦁'
  },
  hufflepuff: {
    name: 'Hufflepuff',
    colors: {
      primary: 'rgb(255, 198, 41)',
      secondary: 'rgb(0, 0, 0)',
      text: 'text-yellow-700',
      bg: 'bg-gradient-to-br from-yellow-500 to-yellow-700'
    },
    emoji: '🦡'
  },
  ravenclaw: {
    name: 'Ravenclaw',
    colors: {
      primary: 'rgb(0, 87, 183)',
      secondary: 'rgb(179, 148, 108)',
      text: 'text-blue-700',
      bg: 'bg-gradient-to-br from-blue-600 to-bronze-500'
    },
    emoji: '🦅'
  },
  slytherin: {
    name: 'Slytherin',
    colors: {
      primary: 'rgb(26, 71, 42)',
      secondary: 'rgb(192, 192, 192)',
      text: 'text-green-700',
      bg: 'bg-gradient-to-br from-green-700 to-gray-400'
    },
    emoji: '🐍'
  }
};