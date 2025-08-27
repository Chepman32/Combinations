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

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

export const TileGrid: React.FC<TileGridProps> = ({
  tiles,
  selectedTiles,
  hintedTile,
  onTilePress,
  onTileLongPress,
  gridWidth,
  gridHeight,
}) => {
  // Calculate optimal tile size to fill the entire game area
  const gameAreaWidth = screenWidth - (SPACING.md * 2); // Full width minus padding
  const gameAreaHeight = screenHeight * 0.6; // Use 60% of screen height for tiles
  
  // Calculate spacing between tiles (smaller for better space utilization)
  const tileGap = SPACING.xs; // Reduced gap for more tile space
  const totalGapWidth = tileGap * (gridWidth - 1);
  const totalGapHeight = tileGap * (gridHeight - 1);
  
  // Calculate available space for tiles
  const availableWidthForTiles = gameAreaWidth - totalGapWidth;
  const availableHeightForTiles = gameAreaHeight - totalGapHeight;
  
  // Calculate tile size to fit both width and height constraints
  const tileWidthSize = availableWidthForTiles / gridWidth;
  const tileHeightSize = availableHeightForTiles / gridHeight;
  
  // Use the smaller dimension to ensure tiles fit in both directions
  const optimalTileSize = Math.min(tileWidthSize, tileHeightSize);
  
  // Set minimum and maximum tile sizes for good usability
  const minTileSize = 50;
  const maxTileSize = 120;
  
  // Final tile size with constraints
  const finalTileSize = Math.max(minTileSize, Math.min(maxTileSize, optimalTileSize));
  const gridGap = tileGap;

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
      <View key={`row_${rowIndex}`} style={[styles.row, { gap: gridGap }]}>
        {rowTiles.map(tile => renderTile(tile))}
      </View>
    );
  };

    return (
    <View style={[
      styles.container,
      {
        width: gameAreaWidth,
        height: gameAreaHeight,
        gap: gridGap,
      }
    ]}>
      {Array.from({ length: gridHeight }, (_, index) => renderRow(index))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  row: {
    flexDirection: 'row',
  },
});
