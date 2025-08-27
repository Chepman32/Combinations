import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { ComboTile } from './ComboTile';
import { ComboTile as ComboTileType } from '../types';
import { SPACING } from '../constants';

interface TileGridProps {
  tiles: ComboTileType[];
  selectedTiles: string[];
  hintedTile?: string;
  onTilePress: (tileId: string) => void;
  onTileLongPress?: (tileId: string) => void;
  gridWidth: number;
  gridHeight: number;
}

const { width: screenWidth } = Dimensions.get('window');

export const TileGrid: React.FC<TileGridProps> = ({
  tiles,
  selectedTiles,
  hintedTile,
  onTilePress,
  onTileLongPress,
  gridWidth,
  gridHeight,
}) => {
  // Force full width with different height limits per difficulty
  const gameAreaWidth = screenWidth - (SPACING.md * 2); // Full width minus padding
  const totalGapWidth = SPACING.sm * (gridWidth - 1); // Total width of gaps between tiles
  const availableWidthForTiles = gameAreaWidth - totalGapWidth; // Width available for tiles only
  
  // Calculate tile size to use full width
  const tileWidthSize = availableWidthForTiles / gridWidth;
  
  // Set height limits based on grid size to prevent overlap and cropping
  let maxTileHeight: number;
  if (gridHeight <= 2) {
    maxTileHeight = 140; // Easy (2x2) - reduced from 180 to prevent vertical overlap
  } else if (gridHeight <= 4) {
    maxTileHeight = 60; // Medium (4x4) - keep current size
  } else {
    maxTileHeight = 35; // Hard (6x6) - reduced to prevent vertical overlap
  }
  
  // Use width-based size but cap height to prevent overlap
  const finalTileSize = Math.min(tileWidthSize, maxTileHeight);
  const gridGap = SPACING.sm;

  const renderTile = (tile: ComboTileType) => {
    const isSelected = selectedTiles.includes(tile.id);
    const isHinted = hintedTile === tile.id;
    const isExhausted = tile.used >= tile.maxUses;

    return (
      <ComboTile
        key={tile.id}
        tile={tile}
        isSelected={isSelected}
        isHinted={isHinted}
        isExhausted={isExhausted}
        onPress={() => onTilePress(tile.id)}
        onLongPress={onTileLongPress ? () => onTileLongPress(tile.id) : undefined}
        tileSize={finalTileSize}
      />
    );
  };

  const renderRow = (rowIndex: number) => {
    const rowTiles = tiles.filter(tile => tile.y === rowIndex);
    
    return (
      <View key={`row_${rowIndex}`} style={styles.row}>
        {rowTiles.map(tile => renderTile(tile))}
      </View>
    );
  };

    return (
    <View style={[styles.container, { gap: gridGap }]}>
      {Array.from({ length: gridHeight }, (_, index) => renderRow(index))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 1,
    maxHeight: 400, // Prevent grid from taking too much vertical space
  },
  row: {
    flexDirection: 'row',
    gap: SPACING.sm,
  },
});
