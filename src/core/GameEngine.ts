import {
  Puzzle,
  Session,
  Attempt,
  ComboTile,
  Ruleset,
  Seed,
  GameMode,
  FreePlayPreset,
  GameState,
  Stats,
} from '../types';
import {
  generateDailySeed,
  generateRandomSeed,
  calculateTargetScore,
  validateAttempt,
  calculateScore,
  calculateStars,
} from '../utils';
import { 
  WORD_DATABASE, 
  getRandomWordForDifficulty, 
  isValidWord, 
  isValidPrefix, 
  presetToDifficulty,
  getWordData
} from '../data';
import { GAME_CONSTANTS } from '../constants';

export class GameEngine {
  private currentPuzzle: Puzzle | null = null;
  private currentSession: Session | null = null;
  private gameState: GameState = 'idle';
  private selectedTiles: string[] = [];
  private currentWord: string = '';
  private stats: Stats = {
    daysPlayed: 0,
    streak: 0,
    wordsFound: 0,
    avgWordLen: 0,
    perfects: 0,
  };

  private readonly defaultRuleset: Ruleset = {
    minCombos: 2,
    maxCombos: 4,
    minWordLen: 4,
    allowHyphen: false,
    allowProperNouns: false,
  };

  constructor() {
    this.initializeStats();
  }

  // Generate tiles from word data based on difficulty
  private generateTilesFromWordData(difficulty: 'easy' | 'medium' | 'hard', rngSeed: string, gridWidth: number, gridHeight: number): ComboTile[] {
    // Convert string seed to number for deterministic generation
    const seedNumber = parseInt(rngSeed.slice(-8), 16) || 12345;
    const wordData = getRandomWordForDifficulty(difficulty, seedNumber);
    const totalTiles = gridWidth * gridHeight;
    const tiles: ComboTile[] = [];
    
    // For Easy (2x2), we need exactly 4 tiles that form a valid word
    if (difficulty === 'easy' && gridWidth === 2 && gridHeight === 2) {
      // Ensure we have exactly the tiles needed for the word
      wordData.tiles.forEach((tileText, index) => {
        const row = Math.floor(index / gridWidth);
        const col = index % gridWidth;
        tiles.push({
          id: `tile_${index}`,
          text: tileText.toUpperCase(),
          used: 0,
          maxUses: 1,
          x: col,
          y: row,
        });
      });
      
      // Fill the remaining 2 slots with tiles that don't interfere with the solution
      const allWordsForDifficulty = WORD_DATABASE[difficulty];
      const allTilesFromDifficulty = allWordsForDifficulty.flatMap(word => word.tiles);
      
      let randomIndex = seedNumber;
      let addedCount = 0;
      while (addedCount < 2) {
        randomIndex = (randomIndex * 16807) % 2147483647;
        const tileIndex = randomIndex % allTilesFromDifficulty.length;
        const randomTileText = allTilesFromDifficulty[tileIndex];
        
        // Don't duplicate the correct tiles and ensure it doesn't create false solutions
        if (!wordData.tiles.includes(randomTileText.toLowerCase())) {
          const row = Math.floor((wordData.tiles.length + addedCount) / gridWidth);
          const col = (wordData.tiles.length + addedCount) % gridWidth;
          tiles.push({
            id: `tile_${wordData.tiles.length + addedCount}`,
            text: randomTileText.toUpperCase(),
            used: 0,
            maxUses: 1,
            x: col,
            y: row,
          });
          addedCount++;
        }
      }
    } else {
      // For other difficulties, use the original logic
      // Add the correct word tiles first
      wordData.tiles.forEach((tileText, index) => {
        const row = Math.floor(index / gridWidth);
        const col = index % gridWidth;
        tiles.push({
          id: `tile_${index}`,
          text: tileText.toUpperCase(),
          used: 0,
          maxUses: 1,
          x: col,
          y: row,
        });
      });
      
      // Fill remaining slots with random tiles from the same difficulty level
      const allWordsForDifficulty = WORD_DATABASE[difficulty];
      const allTilesFromDifficulty = allWordsForDifficulty.flatMap(word => word.tiles);
      
      // Use seeded random to ensure deterministic tile generation
      let randomIndex = seedNumber;
      while (tiles.length < totalTiles) {
        randomIndex = (randomIndex * 16807) % 2147483647; // Linear congruential generator
        const tileIndex = randomIndex % allTilesFromDifficulty.length;
        const randomTileText = allTilesFromDifficulty[tileIndex];
        
        // Don't duplicate the correct tiles
        if (!wordData.tiles.includes(randomTileText.toLowerCase())) {
          const row = Math.floor(tiles.length / gridWidth);
          const col = tiles.length % gridWidth;
          tiles.push({
            id: `tile_${tiles.length}`,
            text: randomTileText.toUpperCase(),
            used: 0,
            maxUses: 1,
            x: col,
            y: row,
          });
        }
      }
    }
    
    // Shuffle the tiles using seeded random
    let randomIndex = seedNumber;
    for (let i = tiles.length - 1; i > 0; i--) {
      randomIndex = (randomIndex * 16807) % 2147483647;
      const j = randomIndex % (i + 1);
      [tiles[i], tiles[j]] = [tiles[j], tiles[i]];
    }
    
    // Reassign positions after shuffle
    tiles.forEach((tile, index) => {
      const row = Math.floor(index / gridWidth);
      const col = index % gridWidth;
      tile.x = col;
      tile.y = row;
    });
    
    return tiles;
  }

  // Initialize or load stats
  private initializeStats(): void {
    // This would load from MMKV in the real implementation
    this.stats = {
      daysPlayed: 0,
      streak: 0,
      wordsFound: 0,
      avgWordLen: 0,
      perfects: 0,
    };
  }

  // Generate daily puzzle
  public generateDailyPuzzle(): Puzzle {
    const seed = generateDailySeed();
    const gridSize = GAME_CONSTANTS.GRID_PRESETS.classic;
    const difficulty = presetToDifficulty('classic'); // Daily puzzles use classic difficulty
    const tiles = this.generateTilesFromWordData(difficulty, seed.rngSeed, gridSize.width, gridSize.height);
    const targetScore = calculateTargetScore(tiles);

    this.currentPuzzle = {
      id: `daily_${seed.dateISO}`,
      seed,
      tiles,
      targetScore,
      ruleset: this.defaultRuleset,
      gridWidth: gridSize.width,
      gridHeight: gridSize.height,
    };

    return this.currentPuzzle;
  }

  // Generate free play puzzle
  public generateFreePlayPuzzle(preset: FreePlayPreset): Puzzle {
    const seed = generateRandomSeed();
    const gridSize = GAME_CONSTANTS.GRID_PRESETS[preset];
    const difficulty = presetToDifficulty(preset);
    const tiles = this.generateTilesFromWordData(difficulty, seed.rngSeed, gridSize.width, gridSize.height);
    const targetScore = calculateTargetScore(tiles);

    this.currentPuzzle = {
      id: `freeplay_${Date.now()}`,
      seed,
      tiles,
      targetScore,
      ruleset: this.defaultRuleset,
      gridWidth: gridSize.width,
      gridHeight: gridSize.height,
    };

    return this.currentPuzzle;
  }

  // Start new session
  public startSession(puzzleId: string): Session {
    this.currentSession = {
      puzzleId,
      attempts: [],
      totalScore: 0,
      stars: 0,
    };
    this.gameState = 'idle';
    this.selectedTiles = [];
    this.currentWord = '';
    return this.currentSession;
  }

  // Select a tile
  public selectTile(tileId: string): boolean {
    if (!this.currentPuzzle || !this.currentSession) return false;

    const tile = this.currentPuzzle.tiles.find(t => t.id === tileId);
    if (!tile || tile.used >= tile.maxUses) return false;

    // Check if tile is already selected
    if (this.selectedTiles.includes(tileId)) return false;

    // Check if we've reached max combos
    if (this.selectedTiles.length >= this.defaultRuleset.maxCombos) return false;

    this.selectedTiles.push(tileId);
    this.updateCurrentWord();
    this.gameState = 'selecting';

    return true;
  }

  // Deselect a tile
  public deselectTile(tileId: string): boolean {
    const index = this.selectedTiles.indexOf(tileId);
    if (index === -1) return false;

    this.selectedTiles.splice(index, 1);
    this.updateCurrentWord();
    
    if (this.selectedTiles.length === 0) {
      this.gameState = 'idle';
    }

    return true;
  }

  // Clear all selected tiles
  public clearSelection(): void {
    this.selectedTiles = [];
    this.currentWord = '';
    this.gameState = 'idle';
  }

  // Update current word based on selected tiles
  private updateCurrentWord(): void {
    if (!this.currentPuzzle) return;

    this.currentWord = this.selectedTiles
      .map(id => {
        const tile = this.currentPuzzle!.tiles.find(t => t.id === id);
        return tile ? tile.text : '';
      })
      .join('');
  }

  // Check if current word is a valid prefix
  public isCurrentWordPrefix(): boolean {
    return isValidPrefix(this.currentWord);
  }

  // Check if current word is a valid word
  public isCurrentWordValid(): boolean {
    return isValidWord(this.currentWord);
  }

  // Submit current word
  public submitWord(): { success: boolean; errors?: string[]; attempt?: Attempt } {
    if (!this.currentPuzzle || !this.currentSession) {
      return { success: false, errors: ['No active puzzle or session'] };
    }

    // Validate attempt
    const validation = validateAttempt(
      this.currentWord,
      this.selectedTiles,
      this.currentPuzzle.tiles,
      this.defaultRuleset
    );

    if (!validation.isValid) {
      return { success: false, errors: validation.errors };
    }

    // Create attempt
    const attempt: Attempt = {
      word: this.currentWord,
      tileIds: [...this.selectedTiles],
      score: calculateScore(this.currentWord),
      ts: Date.now(),
    };

    // Update tiles usage
    this.selectedTiles.forEach(tileId => {
      const tile = this.currentPuzzle!.tiles.find(t => t.id === tileId);
      if (tile) tile.used++;
    });

    // Add to session
    this.currentSession.attempts.push(attempt);
    this.currentSession.totalScore += attempt.score;

    // Update best word if applicable
    if (!this.currentSession.bestWord || attempt.score > this.currentSession.bestWord.score) {
      this.currentSession.bestWord = attempt;
    }

    // Calculate stars
    this.currentSession.stars = calculateStars(
      this.currentSession.totalScore,
      this.currentPuzzle.targetScore
    );

    // Update stats
    this.updateStats(attempt);

    // Clear selection
    this.clearSelection();

    return { success: true, attempt };
  }

  // Update statistics
  private updateStats(attempt: Attempt): void {
    this.stats.wordsFound++;
    
    // Update average word length
    const totalLength = this.stats.avgWordLen * (this.stats.wordsFound - 1) + attempt.word.length;
    this.stats.avgWordLen = totalLength / this.stats.wordsFound;

    // Check if this is a perfect score
    if (this.currentSession?.stars === 5) {
      this.stats.perfects++;
    }
  }

  // Get current game state
  public getGameState(): GameState {
    return this.gameState;
  }

  // Get current puzzle
  public getCurrentPuzzle(): Puzzle | null {
    return this.currentPuzzle;
  }

  // Get current session
  public getCurrentSession(): Session | null {
    return this.currentSession;
  }

  // Get selected tiles
  public getSelectedTiles(): string[] {
    return [...this.selectedTiles];
  }

  // Get current word
  public getCurrentWord(): string {
    return this.currentWord;
  }

  // Get current stats
  public getStats(): Stats {
    return { ...this.stats };
  }

  // Check if game is completed
  public isGameCompleted(): boolean {
    if (!this.currentSession || !this.currentPuzzle) return false;
    return this.currentSession.stars === 5;
  }

  // Get remaining tiles count
  public getRemainingTilesCount(): number {
    if (!this.currentPuzzle) return 0;
    return this.currentPuzzle.tiles.reduce((count, tile) => count + (tile.maxUses - tile.used), 0);
  }

  // Get available tiles (not exhausted)
  public getAvailableTiles(): ComboTile[] {
    if (!this.currentPuzzle) return [];
    return this.currentPuzzle.tiles.filter(tile => tile.used < tile.maxUses);
  }

  // Shuffle tiles (visual only, doesn't change inventory)
  public shuffleTiles(): void {
    if (!this.currentPuzzle) return;

    // This would trigger a visual shuffle animation
    // The actual tile data remains the same for determinism
    this.gameState = 'idle';
  }



  // Get hint for current selection - improved for all difficulties
  public getHint(): { type: 'start' | 'continuation' | 'word'; tileId?: string } | null {
    if (!this.currentPuzzle) return null;

    const availableTiles = this.getAvailableTiles();

    if (this.selectedTiles.length === 0) {
      // Find a tile that starts a valid word from our database
      const validStartTile = availableTiles.find(tile => {
        // Check if this tile could start any valid words
        return Object.values(WORD_DATABASE).flat().some(wordData => {
          return wordData.tiles[0].toUpperCase() === tile.text;
        });
      });
      
      if (validStartTile) {
        return { type: 'start', tileId: validStartTile.id };
      }
      
      // Fallback to first available tile
      return availableTiles.length > 0 ? { type: 'start', tileId: availableTiles[0].id } : null;
      
    } else if (this.selectedTiles.length < this.defaultRuleset.maxCombos) {
      // Find the next tile that could continue building a valid word
      const currentTileTexts = this.selectedTiles.map(id => {
        const tile = this.currentPuzzle!.tiles.find(t => t.id === id);
        return tile ? tile.text : '';
      });
      
      // Look for words that match our current tile sequence
      const possibleWords = Object.values(WORD_DATABASE).flat().filter(wordData => {
        // Check if the current tiles match the beginning of this word
        if (wordData.tiles.length <= currentTileTexts.length) return false;
        
        return currentTileTexts.every((tileText, index) => {
          return wordData.tiles[index].toUpperCase() === tileText;
        });
      });
      
      if (possibleWords.length > 0) {
        // Get the next tile needed for the first possible word
        const nextTileText = possibleWords[0].tiles[currentTileTexts.length].toUpperCase();
        const nextTile = availableTiles.find(tile => 
          tile.text === nextTileText && !this.selectedTiles.includes(tile.id)
        );
        
        if (nextTile) {
          return { type: 'continuation', tileId: nextTile.id };
        }
      }
      
      // If no valid continuation, don't suggest anything
      return null;
    }

    return null;
  }

  // Reset game
  public resetGame(): void {
    this.currentPuzzle = null;
    this.currentSession = null;
    this.gameState = 'idle';
    this.selectedTiles = [];
    this.currentWord = '';
  }

  // Pause game
  public pauseGame(): void {
    this.gameState = 'paused';
  }

  // Resume game
  public resumeGame(): void {
    if (this.currentSession) {
      this.gameState = 'idle';
    }
  }
}
