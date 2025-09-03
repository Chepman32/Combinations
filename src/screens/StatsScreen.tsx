import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../core/ThemeContext';
import { useGame } from '../core/GameContext';
import { useNavigation } from '../core/Navigation';
import { SPACING, BORDER_RADIUS, SHADOWS, TYPOGRAPHY } from '../constants';

export const StatsScreen: React.FC = () => {
  const { colors, theme } = useTheme();
  const { gameEngine } = useGame();
  const { goBack } = useNavigation();

  const stats = gameEngine.getStats();

  const statItems = [
    {
      label: 'Days Played',
      value: stats.daysPlayed.toString(),
      icon: '📅',
      color: colors.primary,
    },
    {
      label: 'Current Streak',
      value: stats.streak.toString(),
      icon: '🔥',
      color: colors.success,
    },
    {
      label: 'Words Found',
      value: stats.wordsFound.toString(),
      icon: '📝',
      color: colors.primary,
    },
    {
      label: 'Avg Word Length',
      value: stats.avgWordLen.toFixed(1),
      icon: '📏',
      color: colors.warning,
    },
    {
      label: 'Perfect Games',
      value: stats.perfects.toString(),
      icon: '⭐',
      color: colors.success,
    },
  ];

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.surface0 }]}>
      <StatusBar barStyle={(theme === 'light') ? 'dark-content' : 'light-content'} />

      {/* Header */}
      <View style={[styles.header, { backgroundColor: colors.surface1 }]}>
        <TouchableOpacity onPress={goBack} style={styles.backButton}>
          <Text style={[styles.backButtonText, { color: colors.text }]}>←</Text>
        </TouchableOpacity>
        <Text style={[styles.title, { color: colors.text }]}>Statistics</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Stats Grid */}
        <View style={styles.statsGrid}>
          {statItems.map((item, index) => (
            <View key={index} style={[styles.statCard, { backgroundColor: colors.surface1 }]}>
              <View style={styles.statIconContainer}>
                <Text style={[styles.statIcon, { color: item.color }]}>{item.icon}</Text>
              </View>
              <Text style={[styles.statValue, { color: colors.text }]}>{item.value}</Text>
              <Text style={[styles.statLabel, { color: colors.textSecondary }]}>
                {item.label}
              </Text>
            </View>
          ))}
        </View>

        {/* Additional Stats Section */}
        <View style={[styles.section, { backgroundColor: colors.surface1 }]}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Game Progress</Text>

          <View style={styles.progressItem}>
            <Text style={[styles.progressLabel, { color: colors.textSecondary }]}>
              Words per game
            </Text>
            <Text style={[styles.progressValue, { color: colors.text }]}>
              {stats.daysPlayed > 0 ? (stats.wordsFound / Math.max(stats.daysPlayed, 1)).toFixed(1) : '0'}
            </Text>
          </View>

          <View style={styles.progressItem}>
            <Text style={[styles.progressLabel, { color: colors.textSecondary }]}>
              Perfect game rate
            </Text>
            <Text style={[styles.progressValue, { color: colors.text }]}>
              {stats.daysPlayed > 0 ? ((stats.perfects / stats.daysPlayed) * 100).toFixed(1) : '0'}%
            </Text>
          </View>
        </View>

        {/* Achievement Section */}
        <View style={[styles.section, { backgroundColor: colors.surface1 }]}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Achievements</Text>

          <View style={styles.achievementItem}>
            <Text style={[styles.achievementIcon, { color: colors.success }]}>
              {stats.wordsFound >= 100 ? '🏆' : '🔒'}
            </Text>
            <View style={styles.achievementContent}>
              <Text style={[styles.achievementTitle, { color: colors.text }]}>
                Word Master
              </Text>
              <Text style={[styles.achievementDescription, { color: colors.textSecondary }]}>
                Find 100 words
              </Text>
            </View>
            <Text style={[styles.achievementProgress, { color: colors.textSecondary }]}>
              {Math.min(stats.wordsFound, 100)}/100
            </Text>
          </View>

          <View style={styles.achievementItem}>
            <Text style={[styles.achievementIcon, { color: colors.success }]}>
              {stats.perfects >= 10 ? '⭐' : '🔒'}
            </Text>
            <View style={styles.achievementContent}>
              <Text style={[styles.achievementTitle, { color: colors.text }]}>
                Perfectionist
              </Text>
              <Text style={[styles.achievementDescription, { color: colors.textSecondary }]}>
                Get 10 perfect scores
              </Text>
            </View>
            <Text style={[styles.achievementProgress, { color: colors.textSecondary }]}>
              {Math.min(stats.perfects, 10)}/10
            </Text>
          </View>

          <View style={styles.achievementItem}>
            <Text style={[styles.achievementIcon, { color: colors.success }]}>
              {stats.streak >= 7 ? '🔥' : '🔒'}
            </Text>
            <View style={styles.achievementContent}>
              <Text style={[styles.achievementTitle, { color: colors.text }]}>
                On Fire
              </Text>
              <Text style={[styles.achievementDescription, { color: colors.textSecondary }]}>
                Maintain a 7-day streak
              </Text>
            </View>
            <Text style={[styles.achievementProgress, { color: colors.textSecondary }]}>
              {Math.min(stats.streak, 7)}/7
            </Text>
          </View>
        </View>
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
  backButton: {
    padding: SPACING.sm,
    borderRadius: BORDER_RADIUS.sm,
  },
  backButtonText: {
    ...TYPOGRAPHY.title,
    fontSize: 24,
  },
  title: {
    ...TYPOGRAPHY.headline,
    fontWeight: '700',
  },
  headerSpacer: {
    width: 40,
  },
  content: {
    flex: 1,
    padding: SPACING.lg,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.md,
    marginBottom: SPACING.lg,
  },
  statCard: {
    flex: 1,
    minWidth: 140,
    padding: SPACING.lg,
    borderRadius: BORDER_RADIUS.lg,
    alignItems: 'center',
    ...SHADOWS.md,
  },
  statIconContainer: {
    marginBottom: SPACING.sm,
  },
  statIcon: {
    fontSize: 32,
    marginBottom: SPACING.xs,
  },
  statValue: {
    ...TYPOGRAPHY.display,
    fontWeight: '700',
    marginBottom: SPACING.xs,
  },
  statLabel: {
    ...TYPOGRAPHY.caption,
    textAlign: 'center',
    fontWeight: '600',
  },
  section: {
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.lg,
    marginBottom: SPACING.lg,
    ...SHADOWS.md,
  },
  sectionTitle: {
    ...TYPOGRAPHY.title,
    fontWeight: '700',
    marginBottom: SPACING.md,
  },
  progressItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: SPACING.sm,
  },
  progressLabel: {
    ...TYPOGRAPHY.body,
  },
  progressValue: {
    ...TYPOGRAPHY.body,
    fontWeight: '600',
  },
  achievementItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: SPACING.md,
  },
  achievementIcon: {
    fontSize: 24,
    marginRight: SPACING.md,
  },
  achievementContent: {
    flex: 1,
  },
  achievementTitle: {
    ...TYPOGRAPHY.body,
    fontWeight: '600',
  },
  achievementDescription: {
    ...TYPOGRAPHY.caption,
    marginTop: SPACING.xs,
  },
  achievementProgress: {
    ...TYPOGRAPHY.caption,
    fontWeight: '600',
  },
});
