import React, { useState, useEffect } from 'react';
import { Clock, Zap, CheckCircle } from 'lucide-react';
import { Question, House } from '../types';
import { questions } from '../data/questions';

interface QuizScreenProps {
  user: { name: string; house: House };
  onComplete: (score: number) => void;
}

export const QuizScreen: React.FC<QuizScreenProps> = ({ user, onComplete }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [timeLeft, setTimeLeft] = useState(15);
  const [isAnswered, setIsAnswered] = useState(false);
  const [showResult, setShowResult] = useState(false);

  const currentQuestion = questions[currentQuestionIndex];

  useEffect(() => {
    if (timeLeft > 0 && !isAnswered) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !isAnswered) {
      handleTimeout();
    }
  }, [timeLeft, isAnswered]);

  const handleTimeout = () => {
    setIsAnswered(true);
    setShowResult(true);
    setTimeout(() => {
      nextQuestion();
    }, 2000);
  };

  const handleAnswer = (answerIndex: number) => {
    if (isAnswered) return;
    
    setSelectedAnswer(answerIndex);
    setIsAnswered(true);
    setShowResult(true);

    if (answerIndex === currentQuestion.correctAnswer) {
      setScore(score + 1);
    }

    setTimeout(() => {
      nextQuestion();
    }, 2000);
  };

  const nextQuestion = () => {
    if (currentQuestionIndex + 1 >= questions.length) {
      onComplete(score + (selectedAnswer === currentQuestion.correctAnswer ? 1 : 0));
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
      setShowResult(false);
      setTimeLeft(15);
    }
  };

  const getTimerColor = () => {
    if (timeLeft > 10) return 'text-green-400';
    if (timeLeft > 5) return 'text-yellow-400';
    return 'text-red-400';
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-indigo-900 via-purple-900 to-black">
        <div className="absolute inset-0 opacity-10">
          {[...Array(30)].map((_, i) => (
            <div
              key={i}
              className="absolute bg-yellow-200 rounded-full animate-pulse"
              style={{
                width: `${Math.random() * 4 + 2}px`,
                height: `${Math.random() * 4 + 2}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`
              }}
            />
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen p-8">
        <div className="max-w-4xl w-full">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className={`px-4 py-2 rounded-lg ${user.house.bg} text-white font-bold`}>
                {user.house.emoji} {user.name}
              </div>
              <div className="px-4 py-2 rounded-lg bg-gray-800 text-white font-bold">
                Question {currentQuestionIndex + 1} of {questions.length}
              </div>
              <div className="px-4 py-2 rounded-lg bg-gray-800 text-white font-bold">
                Score: {score}
              </div>
            </div>
            
            {/* Timer */}
            <div className="flex items-center justify-center gap-2 mb-6">
              <Clock className={getTimerColor()} size={24} />
              <span className={`text-2xl font-bold ${getTimerColor()}`}>
                {timeLeft}
              </span>
              <div className="w-32 h-2 bg-gray-700 rounded-full overflow-hidden">
                <div 
                  className={`h-full transition-all duration-1000 ${timeLeft > 5 ? 'bg-green-500' : 'bg-red-500'}`}
                  style={{ width: `${(timeLeft / 15) * 100}%` }}
                />
              </div>
            </div>
          </div>

          {/* Question */}
          <div className="bg-black bg-opacity-40 backdrop-blur-md rounded-lg p-8 shadow-2xl border border-yellow-300 border-opacity-30">
            <h2 className="text-2xl font-bold text-white text-center mb-8">
              {currentQuestion.question}
            </h2>

            {/* Answer Options */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {currentQuestion.options.map((option, index) => {
                let buttonStyle = `p-4 rounded-lg border-2 transition-all duration-300 font-bold text-lg ${
                  isAnswered ? 'cursor-not-allowed' : 'cursor-pointer hover:scale-105 hover:shadow-lg'
                }`;

                if (showResult && index === currentQuestion.correctAnswer) {
                  buttonStyle += ' bg-green-600 border-green-400 text-white';
                } else if (showResult && selectedAnswer === index && index !== currentQuestion.correctAnswer) {
                  buttonStyle += ' bg-red-600 border-red-400 text-white';
                } else if (selectedAnswer === index && !showResult) {
                  buttonStyle += ` ${user.house.bg} border-white text-white`;
                } else {
                  buttonStyle += ' bg-gray-800 bg-opacity-60 border-gray-600 text-gray-300 hover:border-gray-400 hover:text-white';
                }

                return (
                  <button
                    key={index}
                    onClick={() => handleAnswer(index)}
                    disabled={isAnswered}
                    className={buttonStyle}
                  >
                    <div className="flex items-center gap-3">
                      {showResult && index === currentQuestion.correctAnswer && (
                        <CheckCircle size={24} className="text-green-300" />
                      )}
                      {showResult && selectedAnswer === index && index !== currentQuestion.correctAnswer && (
                        <Zap size={24} className="text-red-300" />
                      )}
                      <span>{option}</span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Result Feedback */}
            {showResult && (
              <div className="mt-6 text-center animate-pulse">
                {selectedAnswer === currentQuestion.correctAnswer ? (
                  <div className="text-green-400 font-bold text-xl flex items-center justify-center gap-2">
                    <CheckCircle size={24} />
                    Correct! Well done, wizard!
                  </div>
                ) : timeLeft === 0 ? (
                  <div className="text-orange-400 font-bold text-xl">
                    Time's up! The correct answer was: {currentQuestion.options[currentQuestion.correctAnswer]}
                  </div>
                ) : (
                  <div className="text-red-400 font-bold text-xl">
                    Incorrect. The right answer was: {currentQuestion.options[currentQuestion.correctAnswer]}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};