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
  generateTileInventory,
  calculateTargetScore,
  validateAttempt,
  calculateScore,
  calculateStars,
  isValidPrefix,
  isValidWord,
} from '../utils';
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
    const tiles = generateTileInventory(seed, gridSize.width, gridSize.height);
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
    const tiles = generateTileInventory(seed, gridSize.width, gridSize.height);
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

  // Get hint for current selection
  public getHint(): { type: 'start' | 'continuation' | 'word'; tileId?: string } | null {
    if (!this.currentPuzzle) return null;

    if (this.selectedTiles.length === 0) {
      // Suggest a starting tile that could lead to a valid word
      const availableTiles = this.getAvailableTiles();
      if (availableTiles.length > 0) {
        // Look for tiles that could start common word patterns
        const commonStarters = ['RE', 'UN', 'IN', 'DIS', 'MIS', 'PRE', 'OVER', 'UNDER'];
        const bestStarter = availableTiles.find(tile => 
          commonStarters.includes(tile.text)
        ) || availableTiles[0];
        
        return { type: 'start', tileId: bestStarter.id };
      }
    } else if (this.selectedTiles.length < this.defaultRuleset.maxCombos) {
      // Suggest continuation that could form a valid word
      const availableTiles = this.getAvailableTiles().filter(t => 
        !this.selectedTiles.includes(t.id)
      );
      
      if (availableTiles.length > 0) {
        // Look for tiles that could complete the current word meaningfully
        const currentWord = this.currentWord;
        const commonEndings = ['ING', 'ED', 'ER', 'EST', 'LY', 'NESS', 'TION', 'ABLE'];
        
        // Try to find a tile that could complete a common word pattern
        const bestContinuation = availableTiles.find(tile => {
          const potentialWord = currentWord + tile.text;
          // Check if this could form a common word ending
          return commonEndings.some(ending => potentialWord.endsWith(ending));
        }) || availableTiles[0];
        
        return { type: 'continuation', tileId: bestContinuation.id };
      }
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
