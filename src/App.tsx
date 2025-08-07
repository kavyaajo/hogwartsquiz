import React, { useState, useEffect } from 'react';
import { WelcomeScreen } from './components/WelcomeScreen';
import { QuizScreen } from './components/QuizScreen';
import { ResultsScreen } from './components/ResultsScreen';
import { Leaderboard } from './components/Leaderboard';
import { House, User } from './types';
import { questions } from './data/questions';
import { saveToLeaderboard, addHousePoints } from './utils/localStorage';
import { Trophy } from 'lucide-react';

type Screen = 'welcome' | 'quiz' | 'results' | 'leaderboard';

function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('welcome');
  const [user, setUser] = useState<User | null>(null);
  const [finalScore, setFinalScore] = useState(0);

  const handleQuizStart = (name: string, house: House) => {
    const newUser: User = {
      name,
      house,
      score: 0,
      completedAt: new Date()
    };
    setUser(newUser);
    setCurrentScreen('quiz');
  };

  const handleQuizComplete = (score: number) => {
    setFinalScore(score);
    
    if (user) {
      const completedUser = { ...user, score, completedAt: new Date() };
      saveToLeaderboard(completedUser);
      
      // Award house points
      const housePoints = Math.max(1, Math.floor(score * 2));
      addHousePoints(user.house.name, housePoints);
    }
    
    setCurrentScreen('results');
  };

  const handleRestart = () => {
    setFinalScore(0);
    setCurrentScreen('quiz');
  };

  const handleGoHome = () => {
    setUser(null);
    setFinalScore(0);
    setCurrentScreen('welcome');
  };

  const handleShowLeaderboard = () => {
    setCurrentScreen('leaderboard');
  };

  useEffect(() => {
    // Add Google Fonts
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700&family=Crimson+Text:wght@400;600&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);

    return () => {
      document.head.removeChild(link);
    };
  }, []);

  return (
    <div className="font-serif">
      {currentScreen === 'welcome' && (
        <div>
          <WelcomeScreen onStart={handleQuizStart} />
          
          {/* Leaderboard Button */}
          <div className="fixed bottom-8 right-8">
            <button
              onClick={handleShowLeaderboard}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-black bg-opacity-60 backdrop-blur-sm text-yellow-300 border border-yellow-300 border-opacity-50 hover:bg-opacity-80 transition-all duration-300"
            >
              <Trophy size={20} />
              Leaderboard
            </button>
          </div>
        </div>
      )}

      {currentScreen === 'quiz' && user && (
        <QuizScreen 
          user={user}
          onComplete={handleQuizComplete}
        />
      )}

      {currentScreen === 'results' && user && (
        <ResultsScreen
          user={user}
          score={finalScore}
          totalQuestions={questions.length}
          onRestart={handleRestart}
          onGoHome={handleGoHome}
        />
      )}

      {currentScreen === 'leaderboard' && (
        <Leaderboard onBack={handleGoHome} />
      )}
    </div>
  );
}

export default App;