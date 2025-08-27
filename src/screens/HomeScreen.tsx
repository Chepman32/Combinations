import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../core/ThemeContext';
import { useGame } from '../core/GameContext';
import { FreePlayPreset } from '../types';
import { SPACING, BORDER_RADIUS, SHADOWS, TYPOGRAPHY } from '../constants';
import { seedToEmoji } from '../utils';

export const HomeScreen: React.FC = () => {
  const { colors, theme } = useTheme();
  const { startDailyGame, startFreePlayGame, currentSession, gameMode } = useGame();

  const handleDailyPress = () => {
    startDailyGame();
  };

  const handleFreePlayPress = (preset: FreePlayPreset) => {
    startFreePlayGame(preset);
  };

  const getCurrentDate = () => {
    const now = new Date();
    return now.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
    });
  };

  const getDailySeedEmoji = () => {
    // Generate a deterministic emoji for today
    const today = new Date().toISOString().split('T')[0];
    return seedToEmoji(today);
  };

  const renderDailyCard = () => (
    <TouchableOpacity
      style={[styles.card, { backgroundColor: colors.surface1 }]}
      onPress={handleDailyPress}
      activeOpacity={0.8}
    >
      <View style={styles.cardHeader}>
        <Text style={[styles.cardTitle, { color: colors.text }]}>Daily Puzzle</Text>
        <Text style={[styles.cardSubtitle, { color: colors.textSecondary }]}>
          {getCurrentDate()}
        </Text>
      </View>
      
      <View style={styles.cardContent}>
        <Text style={[styles.seedEmoji, { color: colors.primary }]}>
          {getDailySeedEmoji()}
        </Text>
        
        <View style={styles.progressContainer}>
          <View style={[styles.progressRing, { borderColor: colors.border }]}>
            <Text style={[styles.progressText, { color: colors.text }]}>
              {currentSession?.stars || 0}/5
            </Text>
          </View>
        </View>
        
        <Text style={[styles.cardDescription, { color: colors.textSecondary }]}>
          New puzzle every day at midnight
        </Text>
      </View>
      
      <View style={styles.cardFooter}>
        <TouchableOpacity
          style={[styles.cardButton, { backgroundColor: colors.primary }]}
          onPress={handleDailyPress}
        >
          <Text style={[styles.cardButtonText, { color: colors.surface0 }]}>
            {currentSession ? 'Continue' : 'Start'}
          </Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  const renderFreePlayCard = () => (
    <View style={[styles.card, { backgroundColor: colors.surface1 }]}>
      <View style={styles.cardHeader}>
        <Text style={[styles.cardTitle, { color: colors.text }]}>Free Play</Text>
        <Text style={[styles.cardSubtitle, { color: colors.textSecondary }]}>
          Unlimited puzzles
        </Text>
      </View>
      
      <View style={styles.cardContent}>
        <View style={styles.presetContainer}>
          <TouchableOpacity
            style={[
              styles.presetButton,
              { backgroundColor: colors.surface2, borderColor: colors.border }
            ]}
            onPress={() => handleFreePlayPress('small')}
          >
            <Text style={[styles.presetText, { color: colors.text }]}>Small</Text>
            <Text style={[styles.presetSubtext, { color: colors.textSecondary }]}>2×2</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[
              styles.presetButton,
              { backgroundColor: colors.surface2, borderColor: colors.border }
            ]}
            onPress={() => handleFreePlayPress('classic')}
          >
            <Text style={[styles.presetText, { color: colors.text }]}>Classic</Text>
            <Text style={[styles.presetSubtext, { color: colors.textSecondary }]}>4×4</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[
              styles.presetButton,
              { backgroundColor: colors.surface2, borderColor: colors.border }
            ]}
            onPress={() => handleFreePlayPress('big')}
          >
            <Text style={[styles.presetText, { color: colors.text }]}>Big</Text>
            <Text style={[styles.presetSubtext, { color: colors.textSecondary }]}>6×6</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  const renderStatsStrip = () => (
    <View style={[styles.statsStrip, { backgroundColor: colors.surface1 }]}>
      <View style={styles.statItem}>
        <Text style={[styles.statIcon, { color: colors.primary }]}>🔥</Text>
        <Text style={[styles.statValue, { color: colors.text }]}>0</Text>
        <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Streak</Text>
      </View>
      
      <View style={styles.statItem}>
        <Text style={[styles.statIcon, { color: colors.success }]}>📝</Text>
        <Text style={[styles.statValue, { color: colors.text }]}>0</Text>
        <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Words</Text>
      </View>
      
      <View style={styles.statItem}>
        <Text style={[styles.statIcon, { color: colors.primary }]}>⭐</Text>
        <Text style={[styles.statValue, { color: colors.text }]}>0</Text>
        <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Perfect</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.surface0 }]}>
      <StatusBar barStyle={theme === 'light' ? 'dark-content' : 'light-content'} />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={[styles.appTitle, { color: colors.text }]}>Combinations</Text>
        <View style={styles.headerActions}>
          <TouchableOpacity style={styles.headerButton}>
            <Text style={[styles.headerButtonText, { color: colors.text }]}>🛍️</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerButton}>
            <Text style={[styles.headerButtonText, { color: colors.text }]}>⚙️</Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Daily Card */}
        {renderDailyCard()}
        
        {/* Free Play Card */}
        {renderFreePlayCard()}
        
        {/* Stats Strip */}
        {renderStatsStrip()}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
    ...SHADOWS.sm,
  },
  appTitle: {
    ...TYPOGRAPHY.display,
    fontWeight: '700',
  },
  headerActions: {
    flexDirection: 'row',
    gap: SPACING.sm,
  },
  headerButton: {
    padding: SPACING.sm,
    borderRadius: BORDER_RADIUS.sm,
  },
  headerButtonText: {
    fontSize: 24,
  },
  content: {
    flex: 1,
    padding: SPACING.lg,
  },
  card: {
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.lg,
    marginBottom: SPACING.lg,
    ...SHADOWS.md,
  },
  cardHeader: {
    marginBottom: SPACING.md,
  },
  cardTitle: {
    ...TYPOGRAPHY.headline,
    fontWeight: '700',
    marginBottom: SPACING.xs,
  },
  cardSubtitle: {
    ...TYPOGRAPHY.body,
  },
  cardContent: {
    alignItems: 'center',
    marginBottom: SPACING.lg,
  },
  seedEmoji: {
    fontSize: 48,
    marginBottom: SPACING.md,
  },
  progressContainer: {
    marginBottom: SPACING.md,
  },
  progressRing: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressText: {
    ...TYPOGRAPHY.title,
    fontWeight: '700',
  },
  cardDescription: {
    ...TYPOGRAPHY.body,
    textAlign: 'center',
  },
  cardFooter: {
    alignItems: 'center',
  },
  cardButton: {
    paddingHorizontal: SPACING.xl,
    paddingVertical: SPACING.md,
    borderRadius: BORDER_RADIUS.md,
    minWidth: 120,
    alignItems: 'center',
  },
  cardButtonText: {
    ...TYPOGRAPHY.body,
    fontWeight: '600',
  },
  presetContainer: {
    flexDirection: 'row',
    gap: SPACING.sm,
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  presetButton: {
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: BORDER_RADIUS.md,
    borderWidth: 1,
    alignItems: 'center',
    minWidth: 80,
  },
  presetText: {
    ...TYPOGRAPHY.body,
    fontWeight: '600',
  },
  presetSubtext: {
    ...TYPOGRAPHY.caption,
    marginTop: SPACING.xs,
  },
  statsStrip: {
    flexDirection: 'row',
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.lg,
    marginTop: SPACING.md,
    ...SHADOWS.sm,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statIcon: {
    fontSize: 24,
    marginBottom: SPACING.xs,
  },
  statValue: {
    ...TYPOGRAPHY.headline,
    fontWeight: '700',
  },
  statLabel: {
    ...TYPOGRAPHY.caption,
    textAlign: 'center',
  },
});
