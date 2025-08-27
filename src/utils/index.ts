import { Seed, ComboTile, Attempt, Ruleset } from '../types';
import { GAME_CONSTANTS } from '../constants';

// Simple hash function for deterministic seed generation
export function simpleHash(str: string): string {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  return Math.abs(hash).toString(36);
}

// Generate daily seed based on date
export function generateDailySeed(date: Date = new Date()): Seed {
  const dateISO = date.toISOString().split('T')[0]; // YYYY-MM-DD
  const rngSeed = simpleHash(dateISO + '/v1');
  return { dateISO, rngSeed };
}

// Generate random seed for free play
export function generateRandomSeed(): Seed {
  const randomBytes = Math.random().toString(36) + Date.now().toString(36);
  const rngSeed = simpleHash(randomBytes);
  return { rngSeed };
}

// Simple RNG using seed (splitmix64-inspired)
export function seededRandom(seed: string): () => number {
  let state = 0;
  for (let i = 0; i < seed.length; i++) {
    state = ((state << 5) - state + seed.charCodeAt(i)) | 0;
  }
  
  return () => {
    state = (state + 0x9e3779b9) | 0;
    let t = Math.imul(state ^ (state >>> 16), 0x21f0aaad);
    t = t ^ (t >>> 15);
    t = Math.imul(t, 0x735a2d97);
    return ((t ^ (t >>> 15)) >>> 0) / 2 ** 32;
  };
}

// Calculate score for a word (1 point per letter)
export function calculateScore(word: string): number {
  return word.length;
}

// Check if word meets minimum length requirement
export function isValidWordLength(word: string, ruleset: Ruleset): boolean {
  return word.length >= ruleset.minWordLen && word.length <= GAME_CONSTANTS.MAX_WORD_LENGTH;
}

// Check if attempt uses valid number of tiles
export function isValidTileCount(tileIds: string[], ruleset: Ruleset): boolean {
  return tileIds.length >= ruleset.minCombos && tileIds.length <= ruleset.maxCombos;
}

// Check if tiles are used only once in the attempt
export function hasUniqueTiles(tileIds: string[]): boolean {
  return new Set(tileIds).size === tileIds.length;
}

// Check if tiles are available (not exhausted)
export function areTilesAvailable(tiles: ComboTile[], tileIds: string[]): boolean {
  return tileIds.every(id => {
    const tile = tiles.find(t => t.id === id);
    return tile && tile.used < tile.maxUses;
  });
}

// Validate attempt against rules
export function validateAttempt(
  word: string,
  tileIds: string[],
  tiles: ComboTile[],
  ruleset: Ruleset
): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];

  if (!isValidWordLength(word, ruleset)) {
    errors.push(`Word must be at least ${ruleset.minWordLen} letters long`);
  }

  if (!isValidTileCount(tileIds, ruleset)) {
    errors.push(`Must use between ${ruleset.minCombos} and ${ruleset.maxCombos} tiles`);
  }

  if (!hasUniqueTiles(tileIds)) {
    errors.push('Each tile can only be used once per word');
  }

  if (!areTilesAvailable(tiles, tileIds)) {
    errors.push('One or more tiles are exhausted');
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

// Calculate stars based on score and target
export function calculateStars(score: number, targetScore: number): 0 | 1 | 2 | 3 | 4 | 5 {
  const percentage = score / targetScore;
  
  if (percentage >= 1.0) return 5;
  if (percentage >= 0.8) return 4;
  if (percentage >= 0.6) return 3;
  if (percentage >= 0.4) return 2;
  if (percentage >= 0.2) return 1;
  return 0;
}

// Generate tile inventory based on seed
export function generateTileInventory(
  seed: Seed,
  gridWidth: number,
  gridHeight: number
): ComboTile[] {
  const rng = seededRandom(seed.rngSeed);
  const tiles: ComboTile[] = [];
  
  // Common n-grams for English words
  const commonNgrams = [
    'ING', 'ER', 'ED', 'LY', 'TION', 'SION', 'MENT', 'NESS', 'ABLE', 'IBLE',
    'QU', 'TH', 'CH', 'SH', 'PH', 'WH', 'CK', 'NG', 'NK', 'MP', 'NT', 'ST',
    'PRO', 'PRE', 'RE', 'UN', 'IN', 'IM', 'IL', 'IR', 'DIS', 'MIS', 'OVER',
    'AN', 'EN', 'ON', 'AT', 'ET', 'IT', 'OT', 'UT', 'AL', 'EL', 'IL', 'OL',
    'AR', 'ER', 'IR', 'OR', 'UR', 'AS', 'ES', 'IS', 'OS', 'US'
  ];

  const totalTiles = gridWidth * gridHeight;
  
  for (let i = 0; i < totalTiles; i++) {
    const x = i % gridWidth;
    const y = Math.floor(i / gridWidth);
    
    // Weighted selection of n-grams
    const ngram = commonNgrams[Math.floor(rng() * commonNgrams.length)];
    const maxUses = Math.floor(rng() * 3) + 2; // 2-4 uses per tile
    
    tiles.push({
      id: `tile_${i}`,
      text: ngram,
      maxUses,
      used: 0,
      x,
      y,
    });
  }
  
  return tiles;
}

// Calculate target score based on tile inventory
export function calculateTargetScore(tiles: ComboTile[]): number {
  const totalLetters = tiles.reduce((sum, tile) => sum + tile.text.length * tile.maxUses, 0);
  const estimatedWords = Math.floor(totalLetters / 6); // Assume average word length of 6
  return Math.floor(estimatedWords * GAME_CONSTANTS.TARGET_SCORE_MULTIPLIER);
}

// Check if a string is a valid prefix (placeholder for DAWG implementation)
export function isValidPrefix(prefix: string): boolean {
  // This would be replaced with actual DAWG lookup
  // For now, return true for common prefixes
  const commonPrefixes = [
    'A', 'AB', 'ABS', 'AC', 'AD', 'AF', 'AG', 'AL', 'AM', 'AN', 'AP', 'AR', 'AS', 'AT',
    'BE', 'BI', 'CO', 'DE', 'DI', 'EN', 'EX', 'IM', 'IN', 'IR', 'MIS', 'NON', 'OUT',
    'OVER', 'PRE', 'PRO', 'RE', 'SUB', 'SUPER', 'TRANS', 'UN', 'UNDER', 'UP'
  ];
  return commonPrefixes.some(p => prefix.toUpperCase().startsWith(p));
}

// Check if a string is a valid word (placeholder for DAWG implementation)
export function isValidWord(word: string): boolean {
  // This would be replaced with actual DAWG lookup
  // For now, return true for common words
  const commonWords = [
    'THE', 'AND', 'FOR', 'ARE', 'BUT', 'NOT', 'YOU', 'ALL', 'CAN', 'HER', 'WAS', 'ONE',
    'OUR', 'OUT', 'DAY', 'GET', 'HAS', 'HIM', 'HIS', 'HOW', 'MAN', 'NEW', 'NOW', 'OLD',
    'SEE', 'TWO', 'WAY', 'WHO', 'BOY', 'DID', 'ITS', 'LET', 'PUT', 'SAY', 'SHE', 'TOO',
    'USE', 'WORK', 'ABOUT', 'AFTER', 'AGAIN', 'BEFORE', 'BETWEEN', 'DURING', 'EVERY',
    'FIRST', 'GOOD', 'GREAT', 'LITTLE', 'LONG', 'MOST', 'OTHER', 'RIGHT', 'SOME', 'THAN',
    'THERE', 'THEIR', 'THEM', 'THEN', 'THEY', 'TIME', 'VERY', 'WANT', 'WERE', 'WHAT',
    'WHEN', 'WHERE', 'WHICH', 'WHILE', 'WITH', 'WORLD', 'WOULD', 'YEAR', 'ALSO', 'ANOTHER',
    'BECAUSE', 'BECOME', 'BEFORE', 'BETWEEN', 'DURING', 'EVERY', 'FIRST', 'GOOD', 'GREAT',
    'LITTLE', 'LONG', 'MOST', 'OTHER', 'RIGHT', 'SOME', 'THAN', 'THERE', 'THEIR', 'THEM',
    'THEN', 'THEY', 'TIME', 'VERY', 'WANT', 'WERE', 'WHAT', 'WHEN', 'WHERE', 'WHICH',
    'WHILE', 'WITH', 'WORLD', 'WOULD', 'YEAR'
  ];
  return commonWords.includes(word.toUpperCase());
}

// Format time for display
export function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

// Generate emoji from seed (deterministic)
export function seedToEmoji(seed: string): string {
  const emojis = ['🎯', '🎲', '🎪', '🎨', '🎭', '🎪', '🎨', '🎭', '🎪', '🎨'];
  const hash = simpleHash(seed);
  const index = parseInt(hash, 36) % emojis.length;
  return emojis[index];
}

// Debounce function for performance
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

// Throttle function for performance
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}
