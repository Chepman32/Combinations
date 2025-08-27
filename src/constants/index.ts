import { ThemeId } from '../types';

export const GAME_CONSTANTS = {
  MIN_COMBOS: 2,
  MAX_COMBOS: 4,
  MIN_WORD_LENGTH: 4,
  MAX_WORD_LENGTH: 16,
  TARGET_SCORE_MULTIPLIER: 0.85,
  SOLVABILITY_THRESHOLD: 70,
  GRID_PRESETS: {
    small: { width: 2, height: 2 },
    classic: { width: 4, height: 4 },
    big: { width: 6, height: 6 },
  },
} as const;

export const ANIMATION_CONSTANTS = {
  ENTRANCE_STAGGER: 20,
  TOUCH_FEEDBACK_SCALE: 0.98,
  INVALID_SHAKE_AMOUNT: 6,
  INVALID_SHAKE_DURATION: 150,
  INVALID_SHAKE_CYCLES: 3,
  CARD_RISE_OFFSET: 8,
  FLAME_INCREMENT_ELASTIC: 1,
} as const;

export const PERFORMANCE_BUDGETS = {
  COLD_START_IPHONE_12: 2000,
  COLD_START_IPHONE_XR: 2500,
  TOUCH_FEEDBACK_LATENCY: 16,
  PREFIX_CHECK_MAX: 0.05,
  WORD_CHECK_MAX: 0.2,
  MEMORY_RSS_MAX: 250,
  BUNDLE_SIZE_MAX: 60,
} as const;

export const COLORS = {
  light: {
    primary: '#6366f1',
    primaryVariant: '#8b5cf6',
    surface0: '#ffffff',
    surface1: '#f8fafc',
    surface2: '#f1f5f9',
    text: '#0f172a',
    textSecondary: '#475569',
    success: '#10b981',
    warning: '#f59e0b',
    error: '#ef4444',
    border: '#e2e8f0',
  },
  dark: {
    primary: '#818cf8',
    primaryVariant: '#a78bfa',
    surface0: '#0f172a',
    surface1: '#1e293b',
    surface2: '#334155',
    text: '#f8fafc',
    textSecondary: '#cbd5e1',
    success: '#34d399',
    warning: '#fbbf24',
    error: '#f87171',
    border: '#475569',
  },
  solar: {
    primary: '#f59e0b',
    primaryVariant: '#d97706',
    surface0: '#fefce8',
    surface1: '#fef3c7',
    surface2: '#fde68a',
    text: '#451a03',
    textSecondary: '#92400e',
    success: '#10b981',
    warning: '#f59e0b',
    error: '#ef4444',
    border: '#fbbf24',
  },
  mono: {
    primary: '#6b7280',
    primaryVariant: '#4b5563',
    surface0: '#ffffff',
    surface1: '#f9fafb',
    surface2: '#f3f4f6',
    text: '#111827',
    textSecondary: '#6b7280',
    success: '#059669',
    warning: '#d97706',
    error: '#dc2626',
    border: '#d1d5db',
  },
} as const;

export const TYPOGRAPHY = {
  display: {
    fontFamily: 'System',
    fontWeight: '700' as const,
    fontSize: 34,
    lineHeight: 41,
  },
  headline: {
    fontFamily: 'System',
    fontWeight: '700' as const,
    fontSize: 28,
    lineHeight: 34,
  },
  title: {
    fontFamily: 'System',
    fontWeight: '600' as const,
    fontSize: 22,
    lineHeight: 28,
  },
  body: {
    fontFamily: 'System',
    fontWeight: '400' as const,
    fontSize: 16,
    lineHeight: 24,
  },
  caption: {
    fontFamily: 'System',
    fontWeight: '400' as const,
    fontSize: 14,
    lineHeight: 20,
  },
} as const;

export const SPACING = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
} as const;

export const BORDER_RADIUS = {
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
} as const;

export const SHADOWS = {
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
} as const;

export const HAPTIC_PATTERNS = {
  light: 'light',
  medium: 'medium',
  heavy: 'heavy',
  success: 'success',
  warning: 'warning',
  error: 'error',
} as const;

export const SOUND_VOLUMES = {
  tap: -18,
  submit: -14,
  invalid: -16,
  success: -12,
} as const;
