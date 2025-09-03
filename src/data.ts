/**
 * Word data for the Combinations game
 * Each word includes the complete word and its tile components
 * Note: Word count reduced by 50% for each difficulty level to improve performance
 */

import { LanguageCode } from './types';
import { SPANISH_WORD_DATABASE } from './data/spanish';
import { FRENCH_WORD_DATABASE } from './data/french';
import { GERMAN_WORD_DATABASE } from './data/german';
import { RUSSIAN_WORD_DATABASE } from './data/russian';

export interface WordData {
  word: string;
  tiles: string[];
}

export interface WordDatabase {
  easy: WordData[];
  medium: WordData[];
  hard: WordData[];
}

export const WORD_DATABASE: WordDatabase = {
  easy: [
    { word: "moon", tiles: ["mo", "on"] },
    { word: "star", tiles: ["st", "ar"] },
    { word: "fire", tiles: ["fi", "re"] },
    { word: "wind", tiles: ["wi", "nd"] },
    { word: "lake", tiles: ["la", "ke"] },
    { word: "road", tiles: ["ro", "ad"] },
    { word: "tree", tiles: ["tr", "ee"] },
    { word: "rock", tiles: ["ro", "ck"] },
    { word: "book", tiles: ["bo", "ok"] },
    { word: "game", tiles: ["ga", "me"] },
    { word: "time", tiles: ["ti", "me"] },
    { word: "ring", tiles: ["ri", "ng"] },
    { word: "ship", tiles: ["sh", "ip"] },
    { word: "wolf", tiles: ["wo", "lf"] },
    { word: "bird", tiles: ["bi", "rd"] },
    { word: "fish", tiles: ["fi", "sh"] },
    { word: "bear", tiles: ["be", "ar"] },
    { word: "lion", tiles: ["li", "on"] },
    { word: "deer", tiles: ["de", "er"] },
    { word: "frog", tiles: ["fr", "og"] },
    { word: "goat", tiles: ["go", "at"] },
    { word: "duck", tiles: ["du", "ck"] },
    { word: "swan", tiles: ["sw", "an"] },
    { word: "snow", tiles: ["sn", "ow"] },
    { word: "rain", tiles: ["ra", "in"] }
  ],
  medium: [
    { word: "adventure", tiles: ["adv", "ent", "ure"] },
    { word: "chocolate", tiles: ["cho", "col", "ate"] },
    { word: "pineapple", tiles: ["pin", "eap", "ple"] },
    { word: "moonlight", tiles: ["moo", "nli", "ght"] },
    { word: "waterfall", tiles: ["wat", "erf", "all"] },
    { word: "blackbird", tiles: ["bla", "ckb", "ird"] },
    { word: "butterfly", tiles: ["but", "ter", "fly"] },
    { word: "nightmare", tiles: ["nig", "htm", "are"] },
    { word: "aeroplane", tiles: ["aer", "opl", "ane"] },
    { word: "algorithm", tiles: ["alg", "ori", "thm"] },
    { word: "interface", tiles: ["int", "erf", "ace"] },
    { word: "happiness", tiles: ["hap", "pin", "ess"] },
    { word: "architect", tiles: ["arc", "hit", "ect"] }
  ],
  hard: [
    { word: "characterization", tiles: ["char", "acte", "riza", "tion"] },
    { word: "internationalism", tiles: ["inte", "rnat", "iona", "lism"] },
    { word: "miscommunication", tiles: ["misc", "ommu", "nica", "tion"] },
    { word: "misunderstanding", tiles: ["misu", "nder", "stan", "ding"] },
    { word: "interoperability", tiles: ["inte", "rope", "rabi", "lity"] },
    { word: "responsibilities", tiles: ["resp", "onsi", "bili", "ties"] },
    { word: "authoritarianism", tiles: ["auth", "orit", "aria", "nism"] },
    { word: "institutionalism", tiles: ["inst", "itut", "iona", "lism"] },
    { word: "instrumentalists", tiles: ["inst", "rume", "ntal", "ists"] },
    { word: "interpenetration", tiles: ["inte", "rpen", "etra", "tion"] },
    { word: "environmentalism", tiles: ["envi", "ronm", "enta", "lism"] },
    { word: "oversubscription", tiles: ["over", "subs", "crip", "tion"] },
    { word: "thermoregulation", tiles: ["ther", "more", "gula", "tion"] },
    { word: "transmissibility", tiles: ["tran", "smis", "sibi", "lity"] }
  ]
};

// Multi-language database support
const LANGUAGE_DATABASES: Record<LanguageCode, WordDatabase> = {
  en: WORD_DATABASE,
  es: SPANISH_WORD_DATABASE,
  fr: FRENCH_WORD_DATABASE,
  de: GERMAN_WORD_DATABASE,
  ru: RUSSIAN_WORD_DATABASE,
};

// Helper functions for data processing
export function getWordsForDifficulty(difficulty: keyof WordDatabase, language: LanguageCode = 'en'): WordData[] {
  const database = LANGUAGE_DATABASES[language] || WORD_DATABASE;
  return database[difficulty];
}

export function getRandomWord(difficulty: keyof WordDatabase, language: LanguageCode = 'en'): WordData {
  const words = getWordsForDifficulty(difficulty, language);
  const randomIndex = Math.floor(Math.random() * words.length);
  return words[randomIndex];
}

export function getTotalWordCount(language: LanguageCode = 'en'): number {
  const database = LANGUAGE_DATABASES[language] || WORD_DATABASE;
  return Object.values(database).reduce((total, words) => total + words.length, 0);
}

// Convert preset names to difficulty levels
export function presetToDifficulty(preset: string): keyof WordDatabase {
  switch (preset) {
    case 'small':
      return 'easy';
    case 'classic':
      return 'medium';
    case 'big':
      return 'hard';
    default:
      return 'medium'; // default to medium for unknown presets
  }
}

// Get random word for a specific difficulty with seeded randomization
export function getRandomWordForDifficulty(difficulty: keyof WordDatabase, seed: number, language: LanguageCode = 'en'): WordData {
  const words = getWordsForDifficulty(difficulty, language);
  const randomIndex = seed % words.length;
  return words[randomIndex];
}

// Get word data by word string (used for validation)
export function getWordData(word: string, language: LanguageCode = 'en'): WordData | null {
  const database = LANGUAGE_DATABASES[language] || WORD_DATABASE;
  const allWords = Object.values(database).flat();
  return allWords.find(w => w.word.toLowerCase() === word.toLowerCase()) || null;
}

// Simple word validation - checks if word exists in our database
export function isValidWord(word: string, language: LanguageCode = 'en'): boolean {
  const database = LANGUAGE_DATABASES[language] || WORD_DATABASE;
  const allWords = Object.values(database).flat();
  return allWords.some(w => w.word.toLowerCase() === word.toLowerCase());
}

// Simple prefix validation - checks if the current string could be the start of a valid word
export function isValidPrefix(prefix: string, language: LanguageCode = 'en'): boolean {
  if (prefix.length === 0) return true;
  const database = LANGUAGE_DATABASES[language] || WORD_DATABASE;
  const allWords = Object.values(database).flat();
  return allWords.some(w => w.word.toLowerCase().startsWith(prefix.toLowerCase()));
}

// Get the word database for a specific language
export function getWordDatabaseForLanguage(language: LanguageCode): WordDatabase {
  return LANGUAGE_DATABASES[language] || WORD_DATABASE;
}