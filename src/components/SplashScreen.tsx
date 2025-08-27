import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Dimensions,
  Animated,
} from 'react-native';
import { useTheme } from '../core/ThemeContext';
import { SPACING, TYPOGRAPHY } from '../constants';

interface SplashScreenProps {
  onComplete: () => void;
}

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

export const SplashScreen: React.FC<SplashScreenProps> = ({ onComplete }) => {
  const { colors } = useTheme();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;

  useEffect(() => {
    // Animated entrance sequence
    const sequence = Animated.sequence([
      // Fade in and scale up
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 700,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 700,
          useNativeDriver: true,
        }),
      ]),
      // Hold
      Animated.delay(300),
      // Fade out and scale down
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 0.9,
          duration: 500,
          useNativeDriver: true,
        }),
      ]),
    ]);

    sequence.start(() => {
      onComplete();
    });
  }, [fadeAnim, scaleAnim, onComplete]);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.primary }]}>
      <StatusBar barStyle="light-content" />
      
      <View style={styles.content}>
        {/* Logo */}
        <Animated.View
          style={[
            styles.logoContainer,
            {
              opacity: fadeAnim,
              transform: [{ scale: scaleAnim }],
            },
          ]}
        >
          <Text style={styles.logoIcon}>🎯</Text>
          <Text style={styles.logoText}>Combinations</Text>
        </Animated.View>

        {/* Subtitle */}
        <Animated.View
          style={[
            styles.subtitleContainer,
            {
              opacity: fadeAnim,
              transform: [{ scale: scaleAnim }],
            },
          ]}
        >
          <Text style={styles.subtitle}>Offline Word Puzzles</Text>
        </Animated.View>
      </View>

      {/* Gradient overlay */}
      <View style={[styles.gradientOverlay, { backgroundColor: colors.primaryVariant }]} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    alignItems: 'center',
    zIndex: 2,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: SPACING.xl,
  },
  logoIcon: {
    fontSize: 80,
    marginBottom: SPACING.lg,
  },
  logoText: {
    ...TYPOGRAPHY.display,
    color: 'white',
    fontWeight: '700',
    textAlign: 'center',
  },
  subtitleContainer: {
    alignItems: 'center',
  },
  subtitle: {
    ...TYPOGRAPHY.body,
    color: 'white',
    opacity: 0.9,
    textAlign: 'center',
  },
  gradientOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    opacity: 0.3,
    zIndex: 1,
  },
});
