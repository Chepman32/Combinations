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
import { useNavigation } from '../core/Navigation';
import { SPACING, BORDER_RADIUS, SHADOWS, TYPOGRAPHY } from '../constants';
import { seedToEmoji } from '../utils';
import { getLocalizedStrings } from '../localization';

export const HomeScreen: React.FC = () => {
  const { colors, theme, language } = useTheme();
  const { startDailyGame, currentSession } = useGame();
  const { navigateTo } = useNavigation();
  const strings = getLocalizedStrings(language);

  const handleDailyPress = () => {
    startDailyGame();
  };



  const handleStatsPress = () => {
    navigateTo('stats');
  };

  const handleSettingsPress = () => {
    navigateTo('settings');
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
        <Text style={[styles.cardTitle, { color: colors.text }]}>{strings.dailyPuzzle}</Text>
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
          {strings.newPuzzleEveryDay}
        </Text>
      </View>
      
      <View style={styles.cardFooter}>
        <TouchableOpacity
          style={[styles.cardButton, { backgroundColor: colors.primary }]}
          onPress={handleDailyPress}
        >
          <Text style={[styles.cardButtonText, { color: colors.surface0 }]}>
            {currentSession ? strings.continue : strings.start}
          </Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );



  const renderStatsStrip = () => (
    <View style={[styles.statsStrip, { backgroundColor: colors.surface1 }]}>
      <View style={styles.statItem}>
        <Text style={[styles.statIcon, { color: colors.primary }]}>🔥</Text>
        <Text style={[styles.statValue, { color: colors.text }]}>0</Text>
        <Text style={[styles.statLabel, { color: colors.textSecondary }]}>{strings.streak}</Text>
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
      <StatusBar barStyle={(theme === 'light') ? 'dark-content' : 'light-content'} />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={[styles.appTitle, { color: colors.text }]}>{strings.appName}</Text>
        <View style={styles.headerActions}>
          <TouchableOpacity style={styles.headerButton} onPress={handleStatsPress}>
            <Text style={[styles.headerButtonText, { color: colors.text }]}>📊</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerButton} onPress={handleSettingsPress}>
            <Text style={[styles.headerButtonText, { color: colors.text }]}>⚙️</Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Daily Card */}
        {renderDailyCard()}

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
