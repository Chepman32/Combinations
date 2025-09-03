import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { GameEngine } from './GameEngine';
import { Puzzle, Session } from '../types';
import { useNavigation } from './Navigation';
import { useTheme } from './ThemeContext';

interface GameContextType {
  gameEngine: GameEngine;
  currentPuzzle: Puzzle | null;
  currentSession: Session | null;
  isGameActive: boolean;
  startDailyGame: () => void;
  pauseGame: () => void;
  resumeGame: () => void;
  resetGame: () => void;
  endGame: () => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};

interface GameProviderProps {
  children: ReactNode;
}

export const GameProvider: React.FC<GameProviderProps> = ({ children }) => {
  const { language, setLanguage } = useTheme();
  const [gameEngine] = useState(() => new GameEngine(language));
  const [isGameActive, setIsGameActive] = useState(false);
  const [currentPuzzle, setCurrentPuzzle] = useState<Puzzle | null>(null);
  const [currentSession, setCurrentSession] = useState<Session | null>(null);
  const { navigateTo } = useNavigation();

  // Update game engine language when theme language changes
  useEffect(() => {
    gameEngine.setLanguage(language);
  }, [gameEngine, language]);

  const startDailyGame = () => {
    const puzzle = gameEngine.generateDailyPuzzle();
    const session = gameEngine.startSession(puzzle.id);
    setCurrentPuzzle(puzzle);
    setCurrentSession(session);
    setIsGameActive(true);
    navigateTo('game');
  };

  const pauseGame = () => {
    gameEngine.pauseGame();
    setIsGameActive(false);
    // Could navigate to pause overlay here
  };

  const resumeGame = () => {
    gameEngine.resumeGame();
    setIsGameActive(true);
  };

  const resetGame = () => {
    gameEngine.resetGame();
    setCurrentPuzzle(null);
    setCurrentSession(null);
    setIsGameActive(false);
    navigateTo('home');
  };

  const endGame = () => {
    gameEngine.resetGame();
    setCurrentPuzzle(null);
    setCurrentSession(null);
    setIsGameActive(false);
    navigateTo('home');
  };

  const value: GameContextType = {
    gameEngine,
    currentPuzzle,
    currentSession,
    isGameActive,
    startDailyGame,
    pauseGame,
    resumeGame,
    resetGame,
    endGame,
  };

  return (
    <GameContext.Provider value={value}>
      {children}
    </GameContext.Provider>
  );
};
