/**
 * Word data for the Combinations game
 * Each word includes the complete word and its tile components
 */

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
  "easy": [
    { "word": "moon", "tiles": ["mo", "on"] },
    { "word": "star", "tiles": ["st", "ar"] },
    { "word": "fire", "tiles": ["fi", "re"] },
    { "word": "wind", "tiles": ["wi", "nd"] },
    { "word": "lake", "tiles": ["la", "ke"] },
    { "word": "road", "tiles": ["ro", "ad"] },
    { "word": "tree", "tiles": ["tr", "ee"] },
    { "word": "rock", "tiles": ["ro", "ck"] },
    { "word": "book", "tiles": ["bo", "ok"] },
    { "word": "game", "tiles": ["ga", "me"] },
    { "word": "time", "tiles": ["ti", "me"] },
    { "word": "ring", "tiles": ["ri", "ng"] },
    { "word": "blue", "tiles": ["bl", "ue"] },
    { "word": "gold", "tiles": ["go", "ld"] },
    { "word": "gray", "tiles": ["gr", "ay"] },
    { "word": "ship", "tiles": ["sh", "ip"] },
    { "word": "wolf", "tiles": ["wo", "lf"] },
    { "word": "bird", "tiles": ["bi", "rd"] },
    { "word": "fish", "tiles": ["fi", "sh"] },
    { "word": "bear", "tiles": ["be", "ar"] },
    { "word": "lion", "tiles": ["li", "on"] },
    { "word": "deer", "tiles": ["de", "er"] },
    { "word": "frog", "tiles": ["fr", "og"] },
    { "word": "goat", "tiles": ["go", "at"] },
    { "word": "duck", "tiles": ["du", "ck"] },
    { "word": "swan", "tiles": ["sw", "an"] },
    { "word": "snow", "tiles": ["sn", "ow"] },
    { "word": "rain", "tiles": ["ra", "in"] },
    { "word": "mist", "tiles": ["mi", "st"] },
    { "word": "sand", "tiles": ["sa", "nd"] },
    { "word": "wave", "tiles": ["wa", "ve"] },
    { "word": "hill", "tiles": ["hi", "ll"] },
    { "word": "port", "tiles": ["po", "rt"] },
    { "word": "gate", "tiles": ["ga", "te"] },
    { "word": "path", "tiles": ["pa", "th"] },
    { "word": "home", "tiles": ["ho", "me"] },
    { "word": "yard", "tiles": ["ya", "rd"] },
    { "word": "barn", "tiles": ["ba", "rn"] },
    { "word": "farm", "tiles": ["fa", "rm"] },
    { "word": "camp", "tiles": ["ca", "mp"] },
    { "word": "town", "tiles": ["to", "wn"] },
    { "word": "city", "tiles": ["ci", "ty"] },
    { "word": "park", "tiles": ["pa", "rk"] },
    { "word": "mall", "tiles": ["ma", "ll"] },
    { "word": "shop", "tiles": ["sh", "op"] },
    { "word": "food", "tiles": ["fo", "od"] },
    { "word": "meal", "tiles": ["me", "al"] },
    { "word": "cook", "tiles": ["co", "ok"] },
    { "word": "bake", "tiles": ["ba", "ke"] },
    { "word": "salt", "tiles": ["sa", "lt"] },
    { "word": "sour", "tiles": ["so", "ur"] },
    { "word": "wild", "tiles": ["wi", "ld"] },
    { "word": "tame", "tiles": ["ta", "me"] },
    { "word": "kind", "tiles": ["ki", "nd"] },
    { "word": "mean", "tiles": ["me", "an"] },
    { "word": "good", "tiles": ["go", "od"] },
    { "word": "evil", "tiles": ["ev", "il"] },
    { "word": "hard", "tiles": ["ha", "rd"] },
    { "word": "soft", "tiles": ["so", "ft"] },
    { "word": "leaf", "tiles": ["le", "af"] }
  ],
  "medium": [
    { "word": "adventure", "tiles": ["adv", "ent", "ure"] },
    { "word": "chocolate", "tiles": ["cho", "col", "ate"] },
    { "word": "pineapple", "tiles": ["pin", "eap", "ple"] },
    { "word": "beautiful", "tiles": ["bea", "uti", "ful"] },
    { "word": "moonlight", "tiles": ["moo", "nli", "ght"] },
    { "word": "waterfall", "tiles": ["wat", "erf", "all"] },
    { "word": "blackbird", "tiles": ["bla", "ckb", "ird"] },
    { "word": "butterfly", "tiles": ["but", "ter", "fly"] },
    { "word": "nightmare", "tiles": ["nig", "htm", "are"] },
    { "word": "aeroplane", "tiles": ["aer", "opl", "ane"] },
    { "word": "algorithm", "tiles": ["alg", "ori", "thm"] },
    { "word": "interface", "tiles": ["int", "erf", "ace"] },
    { "word": "happiness", "tiles": ["hap", "pin", "ess"] },
    { "word": "blueberry", "tiles": ["blu", "ebe", "rry"] },
    { "word": "raspberry", "tiles": ["ras", "pbe", "rry"] },
    { "word": "architect", "tiles": ["arc", "hit", "ect"] },
    { "word": "chemistry", "tiles": ["che", "mis", "try"] },
    { "word": "criterion", "tiles": ["cri", "ter", "ion"] },
    { "word": "apartment", "tiles": ["apa", "rtm", "ent"] },
    { "word": "continent", "tiles": ["con", "tin", "ent"] },
    { "word": "framework", "tiles": ["fra", "mew", "ork"] },
    { "word": "mechanism", "tiles": ["mec", "han", "ism"] },
    { "word": "equipment", "tiles": ["equ", "ipm", "ent"] },
    { "word": "challenge", "tiles": ["cha", "lle", "nge"] },
    { "word": "ecosystem", "tiles": ["eco", "sys", "tem"] },
    { "word": "waterways", "tiles": ["wat", "erw", "ays"] },
    { "word": "greenland", "tiles": ["gre", "enl", "and"] },
    { "word": "adjective", "tiles": ["adj", "ect", "ive"] },
    { "word": "bluegrass", "tiles": ["blu", "egr", "ass"] },
    { "word": "timescale", "tiles": ["tim", "esc", "ale"] },
    { "word": "handcraft", "tiles": ["han", "dcr", "aft"] },
    { "word": "lifeboats", "tiles": ["lif", "ebo", "ats"] },
    { "word": "windswept", "tiles": ["win", "dsw", "ept"] },
    { "word": "notebooks", "tiles": ["not", "ebo", "oks"] },
    { "word": "moonshine", "tiles": ["moo", "nsh", "ine"] },
    { "word": "storyline", "tiles": ["sto", "ryl", "ine"] },
    { "word": "northwest", "tiles": ["nor", "thw", "est"] },
    { "word": "southwest", "tiles": ["sou", "thw", "est"] },
    { "word": "northeast", "tiles": ["nor", "the", "ast"] },
    { "word": "southeast", "tiles": ["sou", "the", "ast"] },
    { "word": "timestamp", "tiles": ["tim", "est", "amp"] },
    { "word": "windstorm", "tiles": ["win", "dst", "orm"] },
    { "word": "snowflake", "tiles": ["sno", "wfl", "ake"] },
    { "word": "goldsmith", "tiles": ["gol", "dsm", "ith"] },
    { "word": "spaceship", "tiles": ["spa", "ces", "hip"] },
    { "word": "courtyard", "tiles": ["cou", "rty", "ard"] },
    { "word": "graveyard", "tiles": ["gra", "vey", "ard"] },
    { "word": "afternoon", "tiles": ["aft", "ern", "oon"] },
    { "word": "afterward", "tiles": ["aft", "erw", "ard"] },
    { "word": "somewhere", "tiles": ["som", "ewh", "ere"] },
    { "word": "everybody", "tiles": ["eve", "ryb", "ody"] },
    { "word": "shoulders", "tiles": ["sho", "uld", "ers"] },
    { "word": "operation", "tiles": ["ope", "rat", "ion"] },
    { "word": "developer", "tiles": ["dev", "elo", "per"] },
    { "word": "processor", "tiles": ["pro", "ces", "sor"] },
    { "word": "admission", "tiles": ["adm", "iss", "ion"] },
    { "word": "vibration", "tiles": ["vib", "rat", "ion"] },
    { "word": "radiation", "tiles": ["rad", "iat", "ion"] },
    { "word": "formation", "tiles": ["for", "mat", "ion"] }
  ],
  "hard": [
    { "word": "characterization", "tiles": ["char", "acte", "riza", "tion"] },
    { "word": "internationalism", "tiles": ["inte", "rnat", "iona", "lism"] },
    { "word": "disproportionate", "tiles": ["disp", "ropo", "rtio", "nate"] },
    { "word": "uncharacteristic", "tiles": ["unch", "arac", "teri", "stic"] },
    { "word": "miscommunication", "tiles": ["misc", "ommu", "nica", "tion"] },
    { "word": "misunderstanding", "tiles": ["misu", "nder", "stan", "ding"] },
    { "word": "disenfranchising", "tiles": ["dise", "nfra", "nchi", "sing"] },
    { "word": "interoperability", "tiles": ["inte", "rope", "rabi", "lity"] },
    { "word": "responsibilities", "tiles": ["resp", "onsi", "bili", "ties"] },
    { "word": "authoritarianism", "tiles": ["auth", "orit", "aria", "nism"] },
    { "word": "institutionalism", "tiles": ["inst", "itut", "iona", "lism"] },
    { "word": "thermostatically", "tiles": ["ther", "most", "atic", "ally"] },
    { "word": "unsatisfactorily", "tiles": ["unsa", "tisf", "acto", "rily"] },
    { "word": "overintellectual", "tiles": ["over", "inte", "llec", "tual"] },
    { "word": "hyperventilating", "tiles": ["hype", "rven", "tila", "ting"] },
    { "word": "reconceptualized", "tiles": ["reco", "ncep", "tual", "ized"] },
    { "word": "instrumentalists", "tiles": ["inst", "rume", "ntal", "ists"] },
    { "word": "transcontinental", "tiles": ["tran", "scon", "tine", "ntal"] },
    { "word": "interpenetration", "tiles": ["inte", "rpen", "etra", "tion"] },
    { "word": "photoautotrophic", "tiles": ["phot", "oaut", "otro", "phic"] },
    { "word": "psychoanalytical", "tiles": ["psyc", "hoan", "alyt", "ical"] },
    { "word": "photolithography", "tiles": ["phot", "olit", "hogr", "aphy"] },
    { "word": "biotechnological", "tiles": ["biot", "echn", "olog", "ical"] },
    { "word": "environmentalism", "tiles": ["envi", "ronm", "enta", "lism"] },
    { "word": "oversubscription", "tiles": ["over", "subs", "crip", "tion"] },
    { "word": "mischaracterized", "tiles": ["misc", "hara", "cter", "ized"] },
    { "word": "counterintuitive", "tiles": ["coun", "teri", "ntui", "tive"] },
    { "word": "intercontinental", "tiles": ["inte", "rcon", "tine", "ntal"] },
    { "word": "ultracentrifugal", "tiles": ["ultr", "acen", "trif", "ugal"] },
    { "word": "geomorphological", "tiles": ["geom", "orph", "olog", "ical"] },
    { "word": "thermoregulation", "tiles": ["ther", "more", "gula", "tion"] },
    { "word": "transmissibility", "tiles": ["tran", "smis", "sibi", "lity"] },
    { "word": "compartmentalise", "tiles": ["comp", "artm", "enta", "lise"] },
    { "word": "internationalist", "tiles": ["inte", "rnat", "iona", "list"] },
    { "word": "photosensitivity", "tiles": ["phot", "osen", "siti", "vity"] },
    { "word": "hypersensitivity", "tiles": ["hype", "rsen", "siti", "vity"] },
    { "word": "magnetostriction", "tiles": ["magn", "etos", "tric", "tion"] },
    { "word": "reconstructively", "tiles": ["reco", "nstr", "ucti", "vely"] },
    { "word": "circumnavigation", "tiles": ["circ", "umna", "viga", "tion"] },
    { "word": "indiscriminately", "tiles": ["indi", "scri", "mina", "tely"] },
    { "word": "photoconvertible", "tiles": ["phot", "ocon", "vert", "ible"] },
    { "word": "counterbalancing", "tiles": ["coun", "terb", "alan", "cing"] },
    { "word": "autobiographical", "tiles": ["auto", "biog", "raph", "ical"] },
    { "word": "climatologically", "tiles": ["clim", "atol", "ogic", "ally"] },
    { "word": "anthropocentrism", "tiles": ["anth", "ropo", "cent", "rism"] },
    { "word": "misappropriation", "tiles": ["misa", "ppro", "pria", "tion"] },
    { "word": "interpenetrating", "tiles": ["inte", "rpen", "etra", "ting"] },
    { "word": "misconfiguration", "tiles": ["misc", "onfi", "gura", "tion"] },
    { "word": "photosensibility", "tiles": ["phot", "osen", "sibi", "lity"] },
    { "word": "counteroffensive", "tiles": ["coun", "tero", "ffen", "sive"] },
    { "word": "mispronunciation", "tiles": ["misp", "ronu", "ncia", "tion"] },
    { "word": "internationality", "tiles": ["inte", "rnati", "onali", "ty"] },
    { "word": "pseudoscientific", "tiles": ["pseu", "dosc", "ient", "ific"] },
    { "word": "characterisation", "tiles": ["char", "acte", "risa", "tion"] },
    { "word": "internationalise", "tiles": ["inte", "rnati", "onali", "se"] },
    { "word": "microelectronics", "tiles": ["micr", "oele", "ctro", "nics"] },
    { "word": "immunoreactivity", "tiles": ["immu", "nore", "acti", "vity"] },
    { "word": "reindustrialised", "tiles": ["rein", "dust", "rial", "ised"] },
    { "word": "electroacoustics", "tiles": ["elec", "troa", "cou", "stics"] },
    { "word": "counterstatement", "tiles": ["coun", "ters", "tate", "ment"] }
  ]
};

/**
 * Helper functions for working with the word database
 */

/**
 * Get all words for a specific difficulty
 */
export const getWordsForDifficulty = (difficulty: 'easy' | 'medium' | 'hard'): WordData[] => {
  return WORD_DATABASE[difficulty];
};

/**
 * Get a random word for a specific difficulty
 */
export const getRandomWordForDifficulty = (difficulty: 'easy' | 'medium' | 'hard', seed?: number): WordData => {
  const words = getWordsForDifficulty(difficulty);
  const index = seed ? seed % words.length : Math.floor(Math.random() * words.length);
  return words[index];
};

/**
 * Check if a word exists in the database
 */
export const isValidWord = (word: string): boolean => {
  const allWords = [
    ...WORD_DATABASE.easy,
    ...WORD_DATABASE.medium,
    ...WORD_DATABASE.hard
  ];
  return allWords.some(wordData => wordData.word.toLowerCase() === word.toLowerCase());
};

/**
 * Check if a partial word could be the start of a valid word
 */
export const isValidPrefix = (prefix: string): boolean => {
  const allWords = [
    ...WORD_DATABASE.easy,
    ...WORD_DATABASE.medium,
    ...WORD_DATABASE.hard
  ];
  const lowerPrefix = prefix.toLowerCase();
  return allWords.some(wordData => wordData.word.toLowerCase().startsWith(lowerPrefix));
};

/**
 * Get word data for a specific word
 */
export const getWordData = (word: string): WordData | null => {
  const allWords = [
    ...WORD_DATABASE.easy,
    ...WORD_DATABASE.medium,
    ...WORD_DATABASE.hard
  ];
  return allWords.find(wordData => wordData.word.toLowerCase() === word.toLowerCase()) || null;
};

/**
 * Convert difficulty preset to word database difficulty
 */
export const presetToDifficulty = (preset: 'small' | 'classic' | 'big'): 'easy' | 'medium' | 'hard' => {
  switch (preset) {
    case 'small':
      return 'easy';
    case 'classic':
      return 'medium';
    case 'big':
      return 'hard';
    default:
      return 'medium';
  }
};
