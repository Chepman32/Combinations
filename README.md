# Combinations - Offline Word Puzzle Game

A React Native word game where players chain 2-4 combination tiles to form valid English words, achieving a 5-star rating by reaching the target score.

## 🎯 Game Overview

**Goal**: Achieve a 5-star rating by reaching or exceeding the target score for the current puzzle.

**Mechanic**: Build valid English words by chaining 2–4 distinct combination tiles, where each tile can be used only once per word. Score = 1 point per letter.

**Modes**: 
- **Daily**: Date-seeded puzzles that reset at midnight (deterministic offline)
- **Free Play**: Infinite seeded puzzles with adjustable grid presets (Small/Classic/Big)

## 🏗️ Architecture

### Core Components
- **GameEngine**: Handles puzzle generation, validation, and game state
- **ThemeContext**: Manages app-wide theme and color schemes
- **GameContext**: Manages game state and navigation
- **Navigation**: Simple screen management system

### Game Logic
- **Tile Generation**: Deterministic n-gram sampling based on seed
- **Validation**: Rule-based word validation (length, tile usage, etc.)
- **Scoring**: 1 point per letter with star rating system
- **Offline First**: No network required for gameplay

### UI Components
- **ComboTile**: Individual tile with states (idle/selected/hinted/exhausted)
- **TileGrid**: Responsive grid layout for tiles
- **AssemblyBar**: Shows selected tiles and current word being formed
- **GameScreen**: Main game interface
- **HomeScreen**: Main menu with game options

## 🎨 Design System

### Themes
- **Light**: Clean, high-contrast design
- **Dark**: Easy on the eyes for low-light environments
- **Solar**: Warm, energetic color palette
- **Mono**: Minimalist grayscale design

### Typography
- SF Pro Rounded for headings (700 weight)
- SF Pro Text for body content (400-600 weights)
- Dynamic type scaling support

### Motion
- 60 FPS interactions with Reanimated 3
- Entrance animations with staggered timing
- Touch feedback with spring animations
- Reduce Motion support for accessibility

## 🚀 Getting Started

### Prerequisites
- Node.js >= 18
- React Native 0.81.0
- iOS Simulator or Android Emulator

### Installation
```bash
# Install dependencies
npm install

# iOS
cd ios && pod install && cd ..
npm run ios

# Android
npm run android
```

### Project Structure
```
src/
├── components/          # Reusable UI components
├── screens/            # Main app screens
├── core/               # Game engine and context
├── types/              # TypeScript type definitions
├── utils/              # Helper functions
├── constants/          # App constants and configuration
└── assets/             # Images, fonts, etc.
```

## 🎮 How to Play

1. **Select Tiles**: Tap tiles to select them (2-4 tiles per word)
2. **Form Words**: Selected tiles combine to show the word being formed
3. **Submit**: Tap Submit when you have a valid word
4. **Score**: Earn points and stars based on word length and target achievement
5. **Strategy**: Use hints and shuffle to find optimal word combinations

### Rules
- Each tile can only be used once per word
- Words must be at least 4 letters long
- Score = 1 point per letter
- Reach target score for 5 stars

## 🔧 Technical Features

### Performance
- Cold start < 2.0s on iPhone 12+
- Touch feedback latency < 16ms
- 60 FPS animations
- Memory budget: ≤ 250 MB

### Accessibility
- VoiceOver support with descriptive labels
- Dynamic Type scaling
- High contrast themes
- Reduce Motion support

### Offline Capabilities
- Fully offline gameplay
- Deterministic puzzle generation
- Local save/load via MMKV
- No network dependencies

## 📱 Platform Support

- **iOS**: iPhone and iPad (adaptive layout in v1.1)
- **Android**: Full support
- **Minimum**: iOS 12.4+, Android 6.0+

## 🎯 Roadmap

### v1.0 (MVP)
- ✅ Core game mechanics
- ✅ Daily and Free Play modes
- ✅ Theme system
- ✅ Basic animations
- ✅ Offline gameplay

### v1.1
- iPad layout enhancements
- Additional themes
- Optional telemetry opt-in

### Future
- Cloud sync
- Social features
- Multi-language support
- Advanced analytics

## 🧪 Testing

```bash
# Run tests
npm test

# Run linting
npm run lint

# Type checking
npx tsc --noEmit
```

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📞 Support

For questions or support, please open an issue on GitHub.

---

**Combinations** - Where words come together, offline and free.
