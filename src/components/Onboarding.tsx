import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Dimensions,
  ScrollView,
} from 'react-native';
import { useTheme } from '../core/ThemeContext';
import { SPACING, BORDER_RADIUS, SHADOWS, TYPOGRAPHY } from '../constants';

interface OnboardingProps {
  onComplete: () => void;
  onSkip: () => void;
}

const { width: screenWidth } = Dimensions.get('window');

const onboardingCards = [
  {
    title: 'How to Play',
    description: 'Chain 2–4 combos, each once, to form words.',
    icon: '🔗',
    color: '#6366f1',
  },
  {
    title: 'Scoring & Stars',
    description: '1 point per letter; reach target for ★★★★★.',
    icon: '⭐',
    color: '#f59e0b',
  },
  {
    title: 'Offline Daily + Free Play',
    description: 'New daily at midnight; unlimited offline play.',
    icon: '📱',
    color: '#10b981',
  },
];

export const Onboarding: React.FC<OnboardingProps> = ({ onComplete, onSkip }) => {
  const { colors, theme } = useTheme();
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    if (currentIndex < onboardingCards.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      onComplete();
    }
  };

  const handleSkip = () => {
    onSkip();
  };

  const renderCard = (card: typeof onboardingCards[0], index: number) => {
    const isActive = index === currentIndex;
    
    return (
      <View
        key={index}
        style={[
          styles.card,
          {
            backgroundColor: colors.surface1,
            borderColor: isActive ? card.color : colors.border,
            transform: [{ scale: isActive ? 1 : 0.95 }],
          },
        ]}
      >
        <View style={styles.cardIconContainer}>
          <Text style={[styles.cardIcon, { color: card.color }]}>
            {card.icon}
          </Text>
        </View>
        
        <Text style={[styles.cardTitle, { color: colors.text }]}>
          {card.title}
        </Text>
        
        <Text style={[styles.cardDescription, { color: colors.textSecondary }]}>
          {card.description}
        </Text>
      </View>
    );
  };

  const renderDots = () => (
    <View style={styles.dotsContainer}>
      {onboardingCards.map((_, index) => (
        <TouchableOpacity
          key={index}
          style={[
            styles.dot,
            {
              backgroundColor: index === currentIndex ? colors.primary : colors.border,
            },
          ]}
          onPress={() => setCurrentIndex(index)}
        />
      ))}
    </View>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.surface0 }]}>
      <StatusBar barStyle={theme === 'light' ? 'dark-content' : 'light-content'} />
      
      {/* Skip Button */}
      <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
        <Text style={[styles.skipText, { color: colors.textSecondary }]}>
          Skip
        </Text>
      </TouchableOpacity>

      {/* Cards */}
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={(event) => {
          const newIndex = Math.round(event.nativeEvent.contentOffset.x / screenWidth);
          setCurrentIndex(newIndex);
        }}
        style={styles.cardsContainer}
      >
        {onboardingCards.map((card, index) => (
          <View key={index} style={styles.cardWrapper}>
            {renderCard(card, index)}
          </View>
        ))}
      </ScrollView>

      {/* Dots */}
      {renderDots()}

      {/* Action Buttons */}
      <View style={styles.actionsContainer}>
        <TouchableOpacity
          style={[
            styles.actionButton,
            {
              backgroundColor: currentIndex === onboardingCards.length - 1 
                ? colors.success 
                : colors.primary,
            },
          ]}
          onPress={handleNext}
        >
          <Text style={[styles.actionButtonText, { color: colors.surface0 }]}>
            {currentIndex === onboardingCards.length - 1 ? 'Get Started' : 'Next'}
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
  skipButton: {
    position: 'absolute',
    top: SPACING.xl,
    right: SPACING.lg,
    zIndex: 1,
    padding: SPACING.sm,
  },
  skipText: {
    ...TYPOGRAPHY.body,
    fontWeight: '600',
  },
  cardsContainer: {
    flex: 1,
  },
  cardWrapper: {
    width: screenWidth,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: SPACING.lg,
  },
  card: {
    width: screenWidth - SPACING.lg * 2,
    padding: SPACING.xl,
    borderRadius: BORDER_RADIUS.xl,
    borderWidth: 2,
    alignItems: 'center',
    ...SHADOWS.lg,
  },
  cardIconContainer: {
    marginBottom: SPACING.lg,
  },
  cardIcon: {
    fontSize: 64,
  },
  cardTitle: {
    ...TYPOGRAPHY.headline,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: SPACING.md,
  },
  cardDescription: {
    ...TYPOGRAPHY.body,
    textAlign: 'center',
    lineHeight: 24,
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: SPACING.lg,
    gap: SPACING.sm,
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  actionsContainer: {
    paddingHorizontal: SPACING.lg,
    paddingBottom: SPACING.xl,
  },
  actionButton: {
    paddingVertical: SPACING.md,
    borderRadius: BORDER_RADIUS.md,
    alignItems: 'center',
  },
  actionButtonText: {
    ...TYPOGRAPHY.body,
    fontWeight: '600',
  },
});
