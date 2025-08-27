import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { useTheme } from '../core/ThemeContext';
import { useGame } from '../core/GameContext';
import { TileGrid } from '../components/TileGrid';
import { AssemblyBar } from '../components/AssemblyBar';
import { SPACING, BORDER_RADIUS, SHADOWS, TYPOGRAPHY } from '../constants';

export const GameScreen: React.FC = () => {
  const { colors, theme } = useTheme();
  const {
    gameEngine,
    currentPuzzle,
    currentSession,
    freePlayPreset,
    setFreePlayDifficulty,
    pauseGame,
    endGame,
  } = useGame();

  const [selectedTiles, setSelectedTiles] = useState<string[]>([]);
  const [hintedTile, setHintedTile] = useState<string | undefined>();

  useEffect(() => {
    // Update selected tiles when game engine state changes
    const interval = setInterval(() => {
      setSelectedTiles(gameEngine.getSelectedTiles());
    }, 100);

    return () => clearInterval(interval);
  }, [gameEngine]);

  const handleTilePress = (tileId: string) => {
    if (selectedTiles.includes(tileId)) {
      // Deselect tile
      gameEngine.deselectTile(tileId);
    } else {
      // Select tile
      const success = gameEngine.selectTile(tileId);
      if (!success) {
        // Show error feedback
        Alert.alert('Invalid Selection', 'This tile cannot be selected.');
      }
    }
  };

  const handleTileLongPress = (tileId: string) => {
    // Show tile info popover
    const tile = currentPuzzle?.tiles.find(t => t.id === tileId);
    if (tile) {
      Alert.alert(
        `Tile: ${tile.text}`,
        `Uses: ${tile.used}/${tile.maxUses}\nPosition: (${tile.x}, ${tile.y})`
      );
    }
  };

  const handleClear = () => {
    gameEngine.clearSelection();
  };

  const handleSubmit = () => {
    const result = gameEngine.submitWord();
    
    if (result.success && result.attempt) {
      // Show success feedback
      Alert.alert(
        'Word Submitted!',
        `"${result.attempt.word}" scored ${result.attempt.score} points!`,
        [{ text: 'OK' }]
      );
    } else if (result.errors) {
      // Show error feedback
      Alert.alert('Invalid Word', result.errors.join('\n'));
    }
  };

  const handleHint = () => {
    const hint = gameEngine.getHint();
    if (hint) {
      setHintedTile(hint.tileId);
      // Clear hint after 3 seconds
      setTimeout(() => setHintedTile(undefined), 3000);
    } else {
      Alert.alert('No Hint Available', 'Try selecting some tiles first.');
    }
  };

  const handleShuffle = () => {
    gameEngine.shuffleTiles();
    // This would trigger visual shuffle animation
  };

  const handlePause = () => {
    pauseGame();
    // Navigate to pause overlay
  };

  const handleExit = () => {
    Alert.alert(
      'Exit Game',
      'Are you sure you want to exit? Your progress will be saved.',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Exit', style: 'destructive', onPress: endGame },
      ]
    );
  };

  if (!currentPuzzle || !currentSession) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: colors.surface0 }]}>
        <StatusBar barStyle={theme === 'light' ? 'dark-content' : 'light-content'} />
        <View style={styles.centerContainer}>
          <Text style={[styles.errorText, { color: colors.error }]}>
            No active game. Please start a new game.
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  const currentWord = gameEngine.getCurrentWord();
  const isValidPrefix = gameEngine.isCurrentWordPrefix();
  const isValidWord = gameEngine.isCurrentWordValid();
  const canSubmit = selectedTiles.length >= 2 && isValidWord;

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.surface0 }]}>
      <StatusBar barStyle={theme === 'light' ? 'dark-content' : 'light-content'} />
      
      {/* Top Bar */}
      <View style={[styles.topBar, { backgroundColor: colors.surface1 }]}>
        <TouchableOpacity onPress={handleExit} style={styles.topBarButton}>
          <Text style={[styles.topBarButtonText, { color: colors.text }]}>←</Text>
        </TouchableOpacity>
        
        <View style={styles.scoreContainer}>
          <Text style={[styles.scoreText, { color: colors.text }]}>
            {currentSession.totalScore}
          </Text>
          <Text style={[styles.targetText, { color: colors.textSecondary }]}>
            / {currentPuzzle.targetScore}
          </Text>
        </View>
        
        <TouchableOpacity onPress={handlePause} style={styles.topBarButton}>
          <Text style={[styles.topBarButtonText, { color: colors.text }]}>≡</Text>
        </TouchableOpacity>
      </View>

      {/* Star Meter + Difficulty Switcher (Free Play) */}
      <View style={[styles.starMeter, { backgroundColor: colors.surface1 }]}>
        <Text style={[styles.starText, { color: colors.text }]}>
          {'★'.repeat(currentSession.stars)}{'☆'.repeat(5 - currentSession.stars)}
        </Text>
        {/* Debug info */}
        <Text style={[styles.debugText, { color: colors.textSecondary }]}>
          Puzzle ID: {currentPuzzle?.id} | Mode: {currentPuzzle?.id?.startsWith('freeplay_') ? 'Free Play' : 'Daily'}
        </Text>
        
        {/* Difficulty switcher - always show for now */}
        <View style={styles.difficultyRow}>
          {(
            [
              { key: 'small', label: 'Easy (2×2)' },
              { key: 'classic', label: 'Medium (4×4)' },
              { key: 'big', label: 'Hard (6×6)' },
            ] as const
          ).map(opt => (
            <TouchableOpacity
              key={opt.key}
              onPress={() => setFreePlayDifficulty(opt.key)}
              style={[
                styles.diffButton,
                {
                  backgroundColor:
                    freePlayPreset === opt.key ? colors.primary : colors.surface2,
                  borderColor: colors.border,
                },
              ]}
            >
              <Text
                style={[
                  styles.diffButtonText,
                  { color: freePlayPreset === opt.key ? colors.surface0 : colors.text },
                ]}
              >
                {opt.label}
                {freePlayPreset === opt.key ? ' ✓' : ''}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Game Area */}
      <View style={styles.gameArea}>
        <TileGrid
          tiles={currentPuzzle.tiles}
          selectedTiles={selectedTiles}
          hintedTile={hintedTile}
          onTilePress={handleTilePress}
          onTileLongPress={handleTileLongPress}
          gridWidth={currentPuzzle.gridWidth}
          gridHeight={currentPuzzle.gridHeight}
        />
      </View>

      {/* Assembly Bar */}
      <View style={styles.assemblyContainer}>
        <AssemblyBar
          selectedTiles={selectedTiles.map(id => 
            currentPuzzle.tiles.find(t => t.id === id)!
          )}
          currentWord={currentWord}
          isValidPrefix={isValidPrefix}
          isValidWord={isValidWord}
          onTilePress={handleTilePress}
          onClear={handleClear}
          onSubmit={handleSubmit}
          canSubmit={canSubmit}
        />
      </View>

      {/* Toolbelt */}
      <View style={[styles.toolbelt, { backgroundColor: colors.surface1 }]}>
        <TouchableOpacity
          style={[styles.toolButton, { backgroundColor: colors.warning }]}
          onPress={handleHint}
        >
          <Text style={[styles.toolButtonText, { color: colors.surface0 }]}>
            💡 Hint
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.toolButton, { backgroundColor: colors.primary }]}
          onPress={handleShuffle}
        >
          <Text style={[styles.toolButtonText, { color: colors.surface0 }]}>
            🔀 Shuffle
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.toolButton, { backgroundColor: colors.success }]}
          onPress={() => {/* Open found words */}}
        >
          <Text style={[styles.toolButtonText, { color: colors.surface0 }]}>
            📝 Found
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: SPACING.xl,
  },
  errorText: {
    ...TYPOGRAPHY.title,
    textAlign: 'center',
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    ...SHADOWS.sm,
  },
  topBarButton: {
    padding: SPACING.sm,
    borderRadius: BORDER_RADIUS.sm,
  },
  topBarButtonText: {
    ...TYPOGRAPHY.title,
    fontSize: 24,
  },
  scoreContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  scoreText: {
    ...TYPOGRAPHY.headline,
    fontWeight: '700',
  },
  targetText: {
    ...TYPOGRAPHY.body,
    marginLeft: SPACING.xs,
  },
  starMeter: {
    alignItems: 'center',
    paddingVertical: SPACING.sm,
    paddingTop: SPACING.sm, // Keep top padding small
    paddingBottom: SPACING.lg, // Increase bottom padding to separate from tiles
    ...SHADOWS.sm,
  },
  difficultyRow: {
    flexDirection: 'row',
    gap: SPACING.sm,
    marginTop: SPACING.xs,
  },
  diffButton: {
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.xs,
    borderRadius: BORDER_RADIUS.md,
    borderWidth: 1,
  },
  diffButtonText: {
    ...TYPOGRAPHY.caption,
    fontWeight: '600',
  },
  debugText: {
    ...TYPOGRAPHY.caption,
    marginTop: SPACING.xs,
    textAlign: 'center',
  },
  starText: {
    ...TYPOGRAPHY.title,
    fontSize: 20,
  },
  gameArea: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: SPACING.md,
    marginTop: SPACING.lg, // Prevent overlap with difficulty selector
    marginBottom: SPACING.lg, // Increase bottom margin to prevent cropping
  },
  assemblyContainer: {
    paddingHorizontal: SPACING.md,
    paddingBottom: SPACING.md,
    paddingTop: SPACING.md, // Add space above assembly bar
  },
  toolbelt: {
    flexDirection: 'row',
    padding: SPACING.md,
    gap: SPACING.sm,
    ...SHADOWS.md,
  },
  toolButton: {
    flex: 1,
    paddingVertical: SPACING.md,
    borderRadius: BORDER_RADIUS.md,
    alignItems: 'center',
  },
  toolButtonText: {
    ...TYPOGRAPHY.body,
    fontWeight: '600',
  },
});
