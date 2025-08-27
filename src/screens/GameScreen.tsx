import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Modal,
  Pressable,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
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
    gameMode,
    freePlayPreset,
    setFreePlayDifficulty,
    startFreePlayGame,
    endGame,
  } = useGame();

  const [selectedTiles, setSelectedTiles] = useState<string[]>([]);
  const [hintedTile, setHintedTile] = useState<string | undefined>();
  const [foundOpen, setFoundOpen] = useState<boolean>(false);
  const [forceRefresh, setForceRefresh] = useState(0); // Force re-render when puzzle changes

  useEffect(() => {
    // Update selected tiles when game engine state changes
    const interval = setInterval(() => {
      setSelectedTiles(gameEngine.getSelectedTiles());
    }, 100);

    return () => clearInterval(interval);
  }, [gameEngine]);

  useEffect(() => {
    // Force re-render when puzzle ID changes (difficulty switch)
    const currentPuzzleId = currentPuzzle?.id;
    console.log('Puzzle changed:', currentPuzzleId, 'Grid:', currentPuzzle?.gridWidth, 'x', currentPuzzle?.gridHeight);
    setForceRefresh(prev => prev + 1);
  }, [currentPuzzle?.id, currentPuzzle?.gridWidth, currentPuzzle?.gridHeight, freePlayPreset]);

  const handleTilePress = (tileId: string) => {
    if (selectedTiles.includes(tileId)) {
      // Deselect tile
      gameEngine.deselectTile(tileId);
    } else {
      // Select tile
      gameEngine.selectTile(tileId);
      // No alert on failure; ignore
    }
  };

  const handleTileLongPress = (_tileId: string) => {
    // no-op (suppress system alert)
  };

  const handleClear = () => {
    gameEngine.clearSelection();
  };

  const handleSubmit = () => {
    const result = gameEngine.submitWord();
    if (result.success) {
      if (gameMode === 'freeplay') {
        startFreePlayGame(freePlayPreset);
      }
    }
  };

  const handleHint = () => {
    const hint = gameEngine.getHint();
    if (hint) {
      setHintedTile(hint.tileId);
      setTimeout(() => setHintedTile(undefined), 1500);
    }
  };

  const handleShuffle = () => {
    gameEngine.shuffleTiles();
    // This would trigger visual shuffle animation
  };



  const handleExit = () => {
    endGame();
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
        

      </View>

      {/* Star Meter + Difficulty Switcher (Free Play) */}
      <View style={[styles.starMeter, { backgroundColor: colors.surface1 }]}>
        {/* Stars removed per request */}
                 {/* Debug info */}
         <Text style={[styles.debugText, { color: colors.textSecondary }]}>
           Puzzle ID: {currentPuzzle?.id} | Mode: {currentPuzzle?.id?.startsWith('freeplay_') ? 'Free Play' : 'Daily'}
         </Text>
         <Text style={[styles.debugText, { color: colors.textSecondary }]}>
           Target Word: {currentPuzzle?.solutionWord} | Preset: {freePlayPreset}
         </Text>
         <Text style={[styles.debugText, { color: colors.textSecondary }]}>
           Grid: {currentPuzzle?.gridWidth}×{currentPuzzle?.gridHeight} | Refresh: {forceRefresh}
         </Text>
        
                 {/* Difficulty switcher - simplified version */}
         <View style={styles.difficultyRow}>
           <TouchableOpacity
             style={[
               styles.diffButton,
               {
                 backgroundColor: freePlayPreset === 'small' ? colors.primary : colors.surface2,
                 borderColor: colors.border,
               },
             ]}
             onPress={() => {
               console.log('Switching to Easy (2x2)');
               setFreePlayDifficulty('small');
             }}
           >
             <Text style={[styles.diffButtonText, { color: freePlayPreset === 'small' ? colors.surface0 : colors.text }]}>
               Easy (2×2)
             </Text>
           </TouchableOpacity>
           
           <TouchableOpacity
             style={[
               styles.diffButton,
               {
                 backgroundColor: freePlayPreset === 'classic' ? colors.primary : colors.surface2,
                 borderColor: colors.border,
               },
             ]}
             onPress={() => {
               console.log('Switching to Medium (3x3)');
               setFreePlayDifficulty('classic');
             }}
           >
             <Text style={[styles.diffButtonText, { color: freePlayPreset === 'classic' ? colors.surface0 : colors.text }]}>
               Medium (3×3)
             </Text>
           </TouchableOpacity>
           
           <TouchableOpacity
             style={[
               styles.diffButton,
               {
                 backgroundColor: freePlayPreset === 'big' ? colors.primary : colors.surface2,
                 borderColor: colors.border,
               },
             ]}
             onPress={() => {
               console.log('Switching to Hard (6x6)');
               setFreePlayDifficulty('big');
             }}
           >
             <Text style={[styles.diffButtonText, { color: freePlayPreset === 'big' ? colors.surface0 : colors.text }]}>
               Hard (6×6)
             </Text>
           </TouchableOpacity>
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
          style={[styles.toolButton, { backgroundColor: colors.primaryVariant }]}
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
          onPress={() => setFoundOpen(true)}
        >
          <Text style={[styles.toolButtonText, { color: colors.surface0 }] }>
            📝 Found
          </Text>
        </TouchableOpacity>
      </View>

      <Modal animationType="slide" transparent visible={foundOpen} onRequestClose={() => setFoundOpen(false)}>
        <View style={styles.modalBackdrop}>
          <View style={[styles.modalCard, { backgroundColor: colors.surface1 }]}>
            <Text style={[styles.modalTitle, { color: colors.text }]}>Found Words</Text>
            <View style={{ maxHeight: 240 }}>
              {currentSession.attempts.length === 0 ? (
                <Text style={{ color: colors.textSecondary }}>No words yet. Keep playing!</Text>
              ) : (
                currentSession.attempts
                  .slice()
                  .reverse()
                  .map(a => (
                    <Text key={a.ts} style={{ color: colors.text, marginBottom: SPACING.xs }}>
                      {a.word} · {a.score}
                    </Text>
                  ))
              )}
            </View>
            <Pressable onPress={() => setFoundOpen(false)} style={[styles.modalButton, { backgroundColor: colors.primary }]}>
              <Text style={{ color: colors.surface0, fontWeight: '700' }}>Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
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
    paddingBottom: SPACING.xxl, // Further increased bottom padding to separate from tiles
    position: 'relative',
    zIndex: 2,
    ...SHADOWS.sm,
  },
  difficultyRow: {
    flexDirection: 'row',
    gap: SPACING.sm,
    marginTop: SPACING.xs,
    marginBottom: SPACING.md,
    justifyContent: 'center',
    alignItems: 'center',
  },
  diffButton: {
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.xs,
    borderRadius: BORDER_RADIUS.md,
    borderWidth: 1,
    minHeight: 40,
    minWidth: 80,
    justifyContent: 'center',
    alignItems: 'center',
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
    marginTop: SPACING.xxl, // Further increased top margin to prevent overlap with difficulty selector
    marginBottom: SPACING.xl, // Increased bottom margin to prevent cropping
    position: 'relative',
    zIndex: 1,
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
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'flex-end',
  },
  modalCard: {
    padding: SPACING.lg,
    borderTopLeftRadius: BORDER_RADIUS.lg,
    borderTopRightRadius: BORDER_RADIUS.lg,
  },
  modalTitle: {
    ...TYPOGRAPHY.title,
    marginBottom: SPACING.md,
    fontWeight: '700',
  },
  modalButton: {
    marginTop: SPACING.lg,
    paddingVertical: SPACING.md,
    alignItems: 'center',
    borderRadius: BORDER_RADIUS.md,
  },
});
