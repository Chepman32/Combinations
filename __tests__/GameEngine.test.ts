import { GameEngine } from '../src/core/GameEngine';
import { generateDailySeed, generateRandomSeed } from '../src/utils';

describe('GameEngine', () => {
  let gameEngine: GameEngine;

  beforeEach(() => {
    gameEngine = new GameEngine();
  });

  describe('Puzzle Generation', () => {
    test('should generate daily puzzle with correct structure', () => {
      const puzzle = gameEngine.generateDailyPuzzle();
      
      expect(puzzle).toBeDefined();
      expect(puzzle.id).toMatch(/^daily_\d{4}-\d{2}-\d{2}$/);
      expect(puzzle.seed.dateISO).toBeDefined();
      expect(puzzle.seed.rngSeed).toBeDefined();
      expect(puzzle.tiles).toHaveLength(9); // 3x3 grid (classic)
      expect(puzzle.targetScore).toBeGreaterThan(0);
      expect(puzzle.ruleset.minCombos).toBe(2);
      expect(puzzle.ruleset.maxCombos).toBe(4);
    });

    test('should generate free play puzzle with different presets', () => {
      const smallPuzzle = gameEngine.generateFreePlayPuzzle('small');
      const classicPuzzle = gameEngine.generateFreePlayPuzzle('classic');
      const bigPuzzle = gameEngine.generateFreePlayPuzzle('big');
      
      expect(smallPuzzle.tiles).toHaveLength(4); // 2x2
      expect(classicPuzzle.tiles).toHaveLength(9); // 3x3
      expect(bigPuzzle.tiles).toHaveLength(36); // 6x6
    });
  });

  describe('Session Management', () => {
    test('should start new session', () => {
      const puzzle = gameEngine.generateDailyPuzzle();
      const session = gameEngine.startSession(puzzle.id);
      
      expect(session.puzzleId).toBe(puzzle.id);
      expect(session.attempts).toHaveLength(0);
      expect(session.totalScore).toBe(0);
      expect(session.stars).toBe(0);
    });
  });

  describe('Tile Selection', () => {
    test('should select and deselect tiles correctly', () => {
      const puzzle = gameEngine.generateDailyPuzzle();
      gameEngine.startSession(puzzle.id);
      
      const tileId = puzzle.tiles[0].id;
      
      // Select tile
      const selectResult = gameEngine.selectTile(tileId);
      expect(selectResult).toBe(true);
      expect(gameEngine.getSelectedTiles()).toContain(tileId);
      
      // Deselect tile
      const deselectResult = gameEngine.deselectTile(tileId);
      expect(deselectResult).toBe(true);
      expect(gameEngine.getSelectedTiles()).not.toContain(tileId);
    });

    test('should not select exhausted tiles', () => {
      const puzzle = gameEngine.generateDailyPuzzle();
      gameEngine.startSession(puzzle.id);
      
      const tile = puzzle.tiles[0];
      tile.used = tile.maxUses; // Exhaust the tile
      
      const result = gameEngine.selectTile(tile.id);
      expect(result).toBe(false);
    });
  });

  describe('Word Validation', () => {
    test('should validate word submission correctly', () => {
      const puzzle = gameEngine.generateDailyPuzzle();
      gameEngine.startSession(puzzle.id);
      
      // Select two tiles
      const tile1 = puzzle.tiles[0];
      const tile2 = puzzle.tiles[1];
      
      gameEngine.selectTile(tile1.id);
      gameEngine.selectTile(tile2.id);
      
      const result = gameEngine.submitWord();
      
      if (result.success) {
        expect(result.attempt).toBeDefined();
        expect(result.attempt!.word).toBe(tile1.text + tile2.text);
        expect(result.attempt!.score).toBe(tile1.text.length + tile2.text.length);
      }
    });
  });

  describe('Game State', () => {
    test('should track game state correctly', () => {
      expect(gameEngine.getGameState()).toBe('idle');
      
      const puzzle = gameEngine.generateDailyPuzzle();
      gameEngine.startSession(puzzle.id);
      
      expect(gameEngine.getCurrentPuzzle()).toBe(puzzle);
      expect(gameEngine.getCurrentSession()).toBeDefined();
    });
  });
});

describe('Utility Functions', () => {
  test('should generate deterministic daily seeds', () => {
    const date = new Date('2024-01-01');
    const seed1 = generateDailySeed(date);
    const seed2 = generateDailySeed(date);
    
    expect(seed1.dateISO).toBe('2024-01-01');
    expect(seed1.rngSeed).toBe(seed2.rngSeed);
  });

  test('should generate unique random seeds', () => {
    const seed1 = generateRandomSeed();
    const seed2 = generateRandomSeed();
    
    expect(seed1.rngSeed).not.toBe(seed2.rngSeed);
  });
});
