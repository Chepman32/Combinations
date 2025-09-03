import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { useTheme } from '../core/ThemeContext';
import { ComboTile as ComboTileType } from '../types';
import { SPACING, BORDER_RADIUS, SHADOWS, TYPOGRAPHY } from '../constants';
import { getLocalizedStrings } from '../localization';

interface AssemblyBarProps {
  selectedTiles: ComboTileType[];
  _currentWord: string;
  _isValidPrefix: boolean;
  _isValidWord: boolean;
  onTilePress: (tileId: string) => void;
  onClear: () => void;
  onSubmit: () => void;
  canSubmit: boolean;
}

export const AssemblyBar: React.FC<AssemblyBarProps> = ({
  selectedTiles,
  _currentWord,
  _isValidPrefix,
  _isValidWord,
  onTilePress,
  onClear,
  onSubmit,
  canSubmit,
}) => {
  const { colors, language } = useTheme();
  const strings = getLocalizedStrings(language as any);



  const renderSelectedTile = (tile: ComboTileType, index: number) => (
    <TouchableOpacity
      key={`${tile.id}_${index}`}
      style={[
        styles.tileChip,
        {
          backgroundColor: colors.surface1,
          borderColor: colors.primary,
        },
      ]}
      onPress={() => onTilePress(tile.id)}
      activeOpacity={0.8}
    >
      <Text style={[styles.tileText, { color: colors.primary }]}>
        {tile.text}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.surface0 }]}>
      {/* Selected Tiles */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.tilesContainer}
      >
        {selectedTiles.map((tile, index) => renderSelectedTile(tile, index))}
      </ScrollView>
      {/* Action Buttons */}
      <View style={styles.actionsContainer}>
        <TouchableOpacity
          style={[
            styles.actionButton,
            {
              backgroundColor: colors.surface2,
              borderColor: colors.border,
            },
          ]}
          onPress={onClear}
          disabled={selectedTiles.length === 0}
        >
          <Text style={[styles.actionButtonText, { color: colors.textSecondary }]}>
            {strings.clear}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.actionButton,
            {
              backgroundColor: canSubmit ? colors.primary : colors.surface2,
              borderColor: canSubmit ? colors.primary : colors.border,
            },
          ]}
          onPress={onSubmit}
          disabled={!canSubmit}
        >
          <Text
            style={[
              styles.actionButtonText,
              {
                color: canSubmit ? colors.surface0 : colors.textSecondary,
              },
            ]}
          >
            {strings.submit}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: SPACING.md,
    borderRadius: BORDER_RADIUS.lg,
    ...SHADOWS.lg,
  },
  tilesContainer: {
    flexDirection: 'row',
    gap: SPACING.sm,
    paddingBottom: SPACING.md,
  },
  tileChip: {
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: BORDER_RADIUS.md,
    borderWidth: 2,
    minWidth: 60,
    alignItems: 'center',
  },
  tileText: {
    ...TYPOGRAPHY.body,
    fontWeight: '600',
  },
  wordContainer: {
    padding: SPACING.md,
    borderWidth: 1,
    borderRadius: BORDER_RADIUS.md,
    backgroundColor: 'transparent',
    marginBottom: SPACING.md,
    minHeight: 60,
    justifyContent: 'center',
    position: 'relative',
  },
  wordText: {
    ...TYPOGRAPHY.title,
    textAlign: 'center',
    fontWeight: '600',
  },
  caret: {
    position: 'absolute',
    right: SPACING.md,
    top: '50%',
    width: 2,
    height: 20,
    marginTop: -10,
    borderRadius: 1,
  },
  actionsContainer: {
    flexDirection: 'row',
    gap: SPACING.md,
  },
  actionButton: {
    flex: 1,
    paddingVertical: SPACING.md,
    borderRadius: BORDER_RADIUS.md,
    borderWidth: 1,
    alignItems: 'center',
  },
  actionButtonText: {
    ...TYPOGRAPHY.body,
    fontWeight: '600',
  },
});
