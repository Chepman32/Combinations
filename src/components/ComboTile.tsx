import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  View,
  Animated,
  Dimensions,
} from 'react-native';
import { useTheme } from '../core/ThemeContext';
import { ComboTile as ComboTileType } from '../types';
import { SPACING, BORDER_RADIUS, SHADOWS, TYPOGRAPHY } from '../constants';

interface ComboTileProps {
  tile: ComboTileType;
  isSelected: boolean;
  isHinted: boolean;
  isExhausted: boolean;
  onPress: () => void;
  onLongPress?: () => void;
  tileSize?: number;
}

const { width: screenWidth } = Dimensions.get('window');
const defaultTileSize = Math.min((screenWidth - SPACING.md * 6) / 6, 80);

export const ComboTile: React.FC<ComboTileProps> = ({
  tile,
  isSelected,
  isHinted,
  isExhausted,
  onPress,
  onLongPress,
  tileSize: propTileSize,
}) => {
  const { colors } = useTheme();

  const getTileStyle = () => {
    if (isExhausted) {
      return [
        styles.tile,
        {
          backgroundColor: colors.surface2,
          opacity: 0.6,
          borderColor: colors.border,
        },
        styles.exhausted,
      ];
    }

    if (isSelected) {
      return [
        styles.tile,
        {
          backgroundColor: colors.surface1,
          borderColor: colors.primary,
          borderWidth: 2,
        },
        styles.selected,
      ];
    }

    if (isHinted) {
      return [
        styles.tile,
        {
          backgroundColor: colors.surface1,
          borderColor: colors.warning,
          borderWidth: 2,
        },
        styles.hinted,
      ];
    }

    return [
      styles.tile,
      {
        backgroundColor: colors.surface1,
        borderColor: colors.border,
      },
    ];
  };

  const getTextStyle = () => {
    if (isExhausted) {
      return [styles.text, { color: colors.textSecondary }];
    }
    return [styles.text, { color: colors.text }];
  };

  const getBadgeStyle = () => {
    if (isExhausted) {
      return [styles.badge, { backgroundColor: colors.textSecondary }];
    }
    return [styles.badge, { backgroundColor: colors.primary }];
  };

  const finalTileSize = propTileSize || defaultTileSize;
  
  return (
    <TouchableOpacity
      style={[getTileStyle(), { width: finalTileSize, height: finalTileSize }]}
      onPress={onPress}
      onLongPress={onLongPress}
      activeOpacity={0.8}
      disabled={isExhausted}
    >
      <Text style={[getTextStyle(), { fontSize: Math.min(finalTileSize * 0.3, 22) }]} numberOfLines={1} adjustsFontSizeToFit>
        {tile.text}
      </Text>
      
      <View style={getBadgeStyle()}>
        <Text style={styles.badgeText}>
          {tile.maxUses - tile.used}
        </Text>
      </View>

      {isExhausted && (
        <View style={[styles.hatch, { borderColor: colors.textSecondary }]} />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  tile: {
    borderRadius: BORDER_RADIUS.md,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    ...SHADOWS.md,
  },
  selected: {
    ...SHADOWS.lg,
    transform: [{ scale: 1.05 }],
  },
  hinted: {
    ...SHADOWS.lg,
  },
  exhausted: {
    ...SHADOWS.sm,
  },
  text: {
    ...TYPOGRAPHY.title,
    textAlign: 'center',
    fontWeight: '700',
  },
  badge: {
    position: 'absolute',
    top: SPACING.xs,
    right: SPACING.xs,
    minWidth: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: SPACING.xs,
  },
  badgeText: {
    ...TYPOGRAPHY.caption,
    color: 'white',
    fontWeight: '600',
  },
  hatch: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderRadius: BORDER_RADIUS.md,
    opacity: 0.3,
  },
});
