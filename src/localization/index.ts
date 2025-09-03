import { LanguageCode } from '../types';

export interface LocalizedStrings {
  // Common UI
  appName: string;
  back: string;
  cancel: string;
  confirm: string;
  reset: string;
  close: string;
  settings: string;
  statistics: string;

  // Home Screen
  dailyPuzzle: string;
  unlimitedPuzzles: string;
  newPuzzleEveryDay: string;
  start: string;
  continue: string;
  small: string;
  classic: string;
  big: string;
  easy: string;
  medium: string;
  hard: string;
  streak: string;

  // Game Screen
  score: string;
  targetScore: string;
  puzzleId: string;
  mode: string;
  daily: string;
  grid: string;
  wordsFound: string;
  hint: string;
  shuffle: string;
  clear: string;
  submit: string;

  // Settings Screen
  appearance: string;
  audioFeedback: string;
  language: string;
  about: string;
  resetAllSettings: string;
  soundEffects: string;
  hapticFeedback: string;
  playSounds: string;
  vibrateInteractions: string;
  version: string;
  build: string;
  developer: string;

  // Stats Screen
  gameProgress: string;
  achievements: string;
  wordMaster: string;
  perfectionist: string;
  onFire: string;
  findWords: string;
  getPerfectScores: string;
  maintainStreak: string;

  // Error Messages
  noActiveGame: string;
  pleaseStartGame: string;
  noWordsYet: string;

  // Achievement Descriptions
  wordMasterDesc: string;
  perfectionistDesc: string;
  onFireDesc: string;

  // Theme Names and Descriptions
  lightTheme: string;
  darkTheme: string;
  solarTheme: string;
  monoTheme: string;
  lightDesc: string;
  darkDesc: string;
  solarDesc: string;
  monoDesc: string;
}

const en: LocalizedStrings = {
  // Common UI
  appName: 'Combinations',
  back: 'Back',
  cancel: 'Cancel',
  confirm: 'Confirm',
  reset: 'Reset',
  close: 'Close',
  settings: 'Settings',
  statistics: 'Statistics',

  // Home Screen
  dailyPuzzle: 'Daily Puzzle',
  unlimitedPuzzles: 'Unlimited puzzles',
  newPuzzleEveryDay: 'New puzzle every day at midnight',
  start: 'Start',
  continue: 'Continue',
  small: 'Small',
  classic: 'Classic',
  big: 'Big',
  easy: 'Easy',
  medium: 'Medium',
  hard: 'Hard',
  streak: 'Streak',

  // Game Screen
  score: 'Score',
  targetScore: 'Target',
  puzzleId: 'Puzzle ID',
  mode: 'Mode',
  daily: 'Daily',
  grid: 'Grid',
  wordsFound: 'Words Found',
  hint: 'Hint',
  shuffle: 'Shuffle',
  clear: 'Clear',
  submit: 'Submit',

  // Settings Screen
  appearance: 'Appearance',
  audioFeedback: 'Audio & Feedback',
  language: 'Language',
  about: 'About',
  resetAllSettings: 'Reset All Settings',
  soundEffects: 'Sound Effects',
  hapticFeedback: 'Haptic Feedback',
  playSounds: 'Play sounds for interactions',
  vibrateInteractions: 'Vibrate on interactions',
  version: 'Version',
  build: 'Build',
  developer: 'Developer',

  // Stats Screen
  gameProgress: 'Game Progress',
  achievements: 'Achievements',
  wordMaster: 'Word Master',
  perfectionist: 'Perfectionist',
  onFire: 'On Fire',
  findWords: 'Find 100 words',
  getPerfectScores: 'Get 10 perfect scores',
  maintainStreak: 'Maintain a 7-day streak',

  // Error Messages
  noActiveGame: 'No active game',
  pleaseStartGame: 'Please start a new game',
  noWordsYet: 'No words yet. Keep playing!',

  // Achievement Descriptions
  wordMasterDesc: 'Find 100 words',
  perfectionistDesc: 'Get 10 perfect scores',
  onFireDesc: 'Maintain a 7-day streak',

  // Theme Names and Descriptions
  lightTheme: 'Light',
  darkTheme: 'Dark',
  solarTheme: 'Solar',
  monoTheme: 'Mono',
  lightDesc: 'Clean and bright',
  darkDesc: 'Easy on the eyes',
  solarDesc: 'Warm and vibrant',
  monoDesc: 'Minimalist grayscale',
};

const es: LocalizedStrings = {
  // Common UI
  appName: 'Combinaciones',
  back: 'Atrás',
  cancel: 'Cancelar',
  confirm: 'Confirmar',
  reset: 'Reiniciar',
  close: 'Cerrar',
  settings: 'Configuración',
  statistics: 'Estadísticas',

  // Home Screen
  dailyPuzzle: 'Rompecabezas Diario',
  unlimitedPuzzles: 'Rompecabezas ilimitados',
  newPuzzleEveryDay: 'Nuevo rompecabezas cada día a medianoche',
  start: 'Comenzar',
  continue: 'Continuar',
  small: 'Pequeño',
  classic: 'Clásico',
  big: 'Grande',
  easy: 'Fácil',
  medium: 'Medio',
  hard: 'Difícil',
  streak: 'Racha',

  // Game Screen
  score: 'Puntuación',
  targetScore: 'Objetivo',
  puzzleId: 'ID del Rompecabezas',
  mode: 'Modo',
  daily: 'Diario',
  grid: 'Cuadrícula',
  wordsFound: 'Palabras Encontradas',
  hint: 'Pista',
  shuffle: 'Mezclar',
  clear: 'Limpiar',
  submit: 'Enviar',

  // Settings Screen
  appearance: 'Apariencia',
  audioFeedback: 'Audio y Comentarios',
  language: 'Idioma',
  about: 'Acerca de',
  resetAllSettings: 'Restablecer Toda la Configuración',
  soundEffects: 'Efectos de Sonido',
  hapticFeedback: 'Comentarios Hápticos',
  playSounds: 'Reproducir sonidos para interacciones',
  vibrateInteractions: 'Vibrar en interacciones',
  version: 'Versión',
  build: 'Compilación',
  developer: 'Desarrollador',

  // Stats Screen
  gameProgress: 'Progreso del Juego',
  achievements: 'Logros',
  wordMaster: 'Maestro de Palabras',
  perfectionist: 'Perfeccionista',
  onFire: 'En Fuego',
  findWords: 'Encontrar 100 palabras',
  getPerfectScores: 'Obtener 10 puntuaciones perfectas',
  maintainStreak: 'Mantener una racha de 7 días',

  // Error Messages
  noActiveGame: 'No hay juego activo',
  pleaseStartGame: 'Por favor inicia un nuevo juego',
  noWordsYet: 'Aún no hay palabras. ¡Sigue jugando!',

  // Achievement Descriptions
  wordMasterDesc: 'Encontrar 100 palabras',
  perfectionistDesc: 'Obtener 10 puntuaciones perfectas',
  onFireDesc: 'Mantener una racha de 7 días',

  // Theme Names and Descriptions
  lightTheme: 'Claro',
  darkTheme: 'Oscuro',
  solarTheme: 'Solar',
  monoTheme: 'Mono',
  lightDesc: 'Limpio y brillante',
  darkDesc: 'Fácil para los ojos',
  solarDesc: 'Cálido y vibrante',
  monoDesc: 'Escala de grises minimalista',
};

const fr: LocalizedStrings = {
  // Common UI
  appName: 'Combinaisons',
  back: 'Retour',
  cancel: 'Annuler',
  confirm: 'Confirmer',
  reset: 'Réinitialiser',
  close: 'Fermer',
  settings: 'Paramètres',
  statistics: 'Statistiques',

  // Home Screen
  dailyPuzzle: 'Casse-tête Quotidien',
  unlimitedPuzzles: 'Casse-têtes illimités',
  newPuzzleEveryDay: 'Nouveau casse-tête chaque jour à minuit',
  start: 'Commencer',
  continue: 'Continuer',
  small: 'Petit',
  classic: 'Classique',
  big: 'Grand',
  easy: 'Facile',
  medium: 'Moyen',
  hard: 'Difficile',
  streak: 'Série',

  // Game Screen
  score: 'Score',
  targetScore: 'Objectif',
  puzzleId: 'ID du Casse-tête',
  mode: 'Mode',
  daily: 'Quotidien',
  grid: 'Grille',
  wordsFound: 'Mots Trouvés',
  hint: 'Indice',
  shuffle: 'Mélanger',
  clear: 'Effacer',
  submit: 'Soumettre',

  // Settings Screen
  appearance: 'Apparence',
  audioFeedback: 'Audio et Commentaires',
  language: 'Langue',
  about: 'À propos',
  resetAllSettings: 'Réinitialiser Tous les Paramètres',
  soundEffects: 'Effets Sonores',
  hapticFeedback: 'Commentaires Haptiques',
  playSounds: 'Jouer des sons pour les interactions',
  vibrateInteractions: 'Vibrer lors des interactions',
  version: 'Version',
  build: 'Compilation',
  developer: 'Développeur',

  // Stats Screen
  gameProgress: 'Progrès du Jeu',
  achievements: 'Réalisations',
  wordMaster: 'Maître des Mots',
  perfectionist: 'Perfectionniste',
  onFire: 'En Feu',
  findWords: 'Trouver 100 mots',
  getPerfectScores: 'Obtenir 10 scores parfaits',
  maintainStreak: 'Maintenir une série de 7 jours',

  // Error Messages
  noActiveGame: 'Aucun jeu actif',
  pleaseStartGame: 'Veuillez commencer un nouveau jeu',
  noWordsYet: 'Pas encore de mots. Continuez à jouer !',

  // Achievement Descriptions
  wordMasterDesc: 'Trouver 100 mots',
  perfectionistDesc: 'Obtenir 10 scores parfaits',
  onFireDesc: 'Maintenir une série de 7 jours',

  // Theme Names and Descriptions
  lightTheme: 'Clair',
  darkTheme: 'Sombre',
  solarTheme: 'Solaire',
  monoTheme: 'Mono',
  lightDesc: 'Propre et lumineux',
  darkDesc: 'Facile pour les yeux',
  solarDesc: 'Chaud et vibrant',
  monoDesc: 'Nuances de gris minimalistes',
};

const de: LocalizedStrings = {
  // Common UI
  appName: 'Kombinationen',
  back: 'Zurück',
  cancel: 'Abbrechen',
  confirm: 'Bestätigen',
  reset: 'Zurücksetzen',
  close: 'Schließen',
  settings: 'Einstellungen',
  statistics: 'Statistiken',

  // Home Screen
  dailyPuzzle: 'Tägliches Rätsel',
  unlimitedPuzzles: 'Unbegrenzte Rätsel',
  newPuzzleEveryDay: 'Neues Rätsel jeden Tag um Mitternacht',
  start: 'Starten',
  continue: 'Fortfahren',
  small: 'Klein',
  classic: 'Klassisch',
  big: 'Groß',
  easy: 'Einfach',
  medium: 'Mittel',
  hard: 'Schwierig',
  streak: 'Serie',

  // Game Screen
  score: 'Punktzahl',
  targetScore: 'Ziel',
  puzzleId: 'Rätsel-ID',
  mode: 'Modus',
  daily: 'Täglich',
  grid: 'Gitter',
  wordsFound: 'Gefundene Wörter',
  hint: 'Hinweis',
  shuffle: 'Mischen',
  clear: 'Löschen',
  submit: 'Einreichen',

  // Settings Screen
  appearance: 'Erscheinung',
  audioFeedback: 'Audio und Feedback',
  language: 'Sprache',
  about: 'Über',
  resetAllSettings: 'Alle Einstellungen Zurücksetzen',
  soundEffects: 'Soundeffekte',
  hapticFeedback: 'Haptisches Feedback',
  playSounds: 'Sounds für Interaktionen abspielen',
  vibrateInteractions: 'Bei Interaktionen vibrieren',
  version: 'Version',
  build: 'Build',
  developer: 'Entwickler',

  // Stats Screen
  gameProgress: 'Spiel-Fortschritt',
  achievements: 'Erfolge',
  wordMaster: 'Wort-Meister',
  perfectionist: 'Perfektionist',
  onFire: 'Im Feuer',
  findWords: '100 Wörter finden',
  getPerfectScores: '10 perfekte Punktzahlen erreichen',
  maintainStreak: '7-Tage-Serie aufrechterhalten',

  // Error Messages
  noActiveGame: 'Kein aktives Spiel',
  pleaseStartGame: 'Bitte starten Sie ein neues Spiel',
  noWordsYet: 'Noch keine Wörter. Weiter spielen!',

  // Achievement Descriptions
  wordMasterDesc: '100 Wörter finden',
  perfectionistDesc: '10 perfekte Punktzahlen erreichen',
  onFireDesc: '7-Tage-Serie aufrechterhalten',

  // Theme Names and Descriptions
  lightTheme: 'Hell',
  darkTheme: 'Dunkel',
  solarTheme: 'Solar',
  monoTheme: 'Mono',
  lightDesc: 'Sauber und hell',
  darkDesc: 'Augenfreundlich',
  solarDesc: 'Warm und lebendig',
  monoDesc: 'Minimalistische Graustufen',
};

const ru: LocalizedStrings = {
  // Common UI
  appName: 'Комбинации',
  back: 'Назад',
  cancel: 'Отмена',
  confirm: 'Подтвердить',
  reset: 'Сбросить',
  close: 'Закрыть',
  settings: 'Настройки',
  statistics: 'Статистика',

  // Home Screen
  dailyPuzzle: 'Ежедневная Головоломка',
  unlimitedPuzzles: 'Неограниченные головоломки',
  newPuzzleEveryDay: 'Новая головоломка каждый день в полночь',
  start: 'Начать',
  continue: 'Продолжить',
  small: 'Маленький',
  classic: 'Классический',
  big: 'Большой',
  easy: 'Легкий',
  medium: 'Средний',
  hard: 'Трудный',
  streak: 'Серия',

  // Game Screen
  score: 'Очки',
  targetScore: 'Цель',
  puzzleId: 'ID Головоломки',
  mode: 'Режим',
  daily: 'Ежедневный',
  grid: 'Сетка',
  wordsFound: 'Найденные Слова',
  hint: 'Подсказка',
  shuffle: 'Перемешать',
  clear: 'Очистить',
  submit: 'Отправить',

  // Settings Screen
  appearance: 'Внешний вид',
  audioFeedback: 'Аудио и Обратная связь',
  language: 'Язык',
  about: 'О программе',
  resetAllSettings: 'Сбросить все настройки',
  soundEffects: 'Звуковые эффекты',
  hapticFeedback: 'Вибрация',
  playSounds: 'Воспроизводить звуки при взаимодействии',
  vibrateInteractions: 'Вибрация при взаимодействии',
  version: 'Версия',
  build: 'Сборка',
  developer: 'Разработчик',

  // Stats Screen
  gameProgress: 'Прогресс игры',
  achievements: 'Достижения',
  wordMaster: 'Мастер слов',
  perfectionist: 'Перфекционист',
  onFire: 'В огне',
  findWords: 'Найти 100 слов',
  getPerfectScores: 'Получить 10 идеальных результатов',
  maintainStreak: 'Поддерживать серию из 7 дней',

  // Error Messages
  noActiveGame: 'Нет активной игры',
  pleaseStartGame: 'Пожалуйста, начните новую игру',
  noWordsYet: 'Пока нет слов. Продолжайте играть!',

  // Achievement Descriptions
  wordMasterDesc: 'Найти 100 слов',
  perfectionistDesc: 'Получить 10 идеальных результатов',
  onFireDesc: 'Поддерживать серию из 7 дней',

  // Theme Names and Descriptions
  lightTheme: 'Светлый',
  darkTheme: 'Темный',
  solarTheme: 'Солнечный',
  monoTheme: 'Моно',
  lightDesc: 'Чистый и яркий',
  darkDesc: 'Легко для глаз',
  solarDesc: 'Теплый и живой',
  monoDesc: 'Минималистичные оттенки серого',
};

const localizationData: Record<LanguageCode, LocalizedStrings> = {
  en,
  es,
  fr,
  de,
  ru,
};

export function getLocalizedStrings(language: LanguageCode): LocalizedStrings {
  return localizationData[language] || localizationData.en;
}

export function t(key: keyof LocalizedStrings, language: LanguageCode = 'en'): string {
  const strings = getLocalizedStrings(language);
  return strings[key] || key;
}

// Export individual language objects for convenience
export { en, es, fr, de };
export default localizationData;
