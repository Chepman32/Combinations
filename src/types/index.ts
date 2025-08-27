export type ComboTile = {
  id: string;
  text: string;
  maxUses: number;
  used: number;
  x: number;
  y: number;
};

export type Ruleset = {
  minCombos: 2;
  maxCombos: 4;
  minWordLen: 4;
  allowHyphen: false;
  allowProperNouns: false;
};

export type Seed = {
  dateISO?: string;
  rngSeed: string;
};

export type Puzzle = {
  id: string;
  seed: Seed;
  tiles: ComboTile[];
  targetScore: number;
  ruleset: Ruleset;
  gridWidth: number;
  gridHeight: number;
};

export type Attempt = {
  word: string;
  tileIds: string[];
  score: number;
  ts: number;
};

export type Session = {
  puzzleId: string;
  attempts: Attempt[];
  totalScore: number;
  stars: 0 | 1 | 2 | 3 | 4 | 5;
  bestWord?: Attempt;
};

export type Stats = {
  daysPlayed: number;
  streak: number;
  wordsFound: number;
  avgWordLen: number;
  perfects: number;
};

export type ThemeId = 'light' | 'dark' | 'solar' | 'mono';

export type Settings = {
  theme: ThemeId;
  haptics: boolean;
  sounds: boolean;
  leftHanded: boolean;
  reduceMotion: boolean;
};

export type PurchaseState = {
  pro: boolean;
  receiptCache?: string;
  lastVerifiedAt?: number;
};

export type GameMode = 'daily' | 'freeplay';

export type FreePlayPreset = 'small' | 'classic' | 'big';

export type HintType = 'start' | 'continuation' | 'word';

export type GameState = 'idle' | 'selecting' | 'submitting' | 'paused' | 'completed';
