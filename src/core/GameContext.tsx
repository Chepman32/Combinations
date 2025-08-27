import React, { createContext, useContext, useState, ReactNode } from 'react';
import { GameEngine } from './GameEngine';
import { Puzzle, Session, GameMode, FreePlayPreset } from '../types';
import { useNavigation } from './Navigation';

interface GameContextType {
  gameEngine: GameEngine;
  currentPuzzle: Puzzle | null;
  currentSession: Session | null;
  gameMode: GameMode;
  freePlayPreset: FreePlayPreset;
  isGameActive: boolean;
  startDailyGame: () => void;
  startFreePlayGame: (preset: FreePlayPreset) => void;
  setFreePlayDifficulty: (preset: FreePlayPreset) => void;
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
  const [gameEngine] = useState(() => new GameEngine());
  const [gameMode, setGameMode] = useState<GameMode>('daily');
  const [freePlayPreset, setFreePlayPreset] = useState<FreePlayPreset>('classic');
  const [isGameActive, setIsGameActive] = useState(false);
  const [currentPuzzle, setCurrentPuzzle] = useState<Puzzle | null>(null);
  const [currentSession, setCurrentSession] = useState<Session | null>(null);
  const { navigateTo } = useNavigation();

  const startDailyGame = () => {
    const puzzle = gameEngine.generateDailyPuzzle();
    const session = gameEngine.startSession(puzzle.id);
    setCurrentPuzzle(puzzle);
    setCurrentSession(session);
    setGameMode('daily');
    setIsGameActive(true);
    navigateTo('game');
  };

  const startFreePlayGame = (preset: FreePlayPreset) => {
    const puzzle = gameEngine.generateFreePlayPuzzle(preset);
    const session = gameEngine.startSession(puzzle.id);
    setCurrentPuzzle(puzzle);
    setCurrentSession(session);
    setGameMode('freeplay');
    setFreePlayPreset(preset);
    setIsGameActive(true);
    navigateTo('game');
  };

  // Regenerate a free play puzzle with a new difficulty (grid size)
  const setFreePlayDifficulty = (preset: FreePlayPreset) => {
    console.log('setFreePlayDifficulty called with:', preset);
    const puzzle = gameEngine.generateFreePlayPuzzle(preset);
    const session = gameEngine.startSession(puzzle.id);
    setCurrentPuzzle(puzzle);
    setCurrentSession(session);
    setGameMode('freeplay');
    setFreePlayPreset(preset);
    setIsGameActive(true);
    console.log('New puzzle generated:', puzzle.id, 'Grid:', puzzle.gridWidth, 'x', puzzle.gridHeight);
    // Don't navigate since we're already on the game screen
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
    gameMode,
    freePlayPreset,
    isGameActive,
    startDailyGame,
    startFreePlayGame,
    setFreePlayDifficulty,
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
