import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Switch,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../core/ThemeContext';
import { useNavigation } from '../core/Navigation';
import { SPACING, BORDER_RADIUS, SHADOWS, TYPOGRAPHY } from '../constants';
import { ThemeId } from '../types';
import { getLocalizedStrings } from '../localization';

export const SettingsScreen: React.FC = () => {
  const { colors, theme, settings, setTheme, updateSettings, language, setLanguage } = useTheme();
  const { goBack } = useNavigation();
  const strings = getLocalizedStrings(language);

  const themeOptions: { id: ThemeId; label: string; description: string; icon: string }[] = [
    { id: 'light', label: strings.lightTheme, description: strings.lightDesc, icon: '☀️' },
    { id: 'dark', label: strings.darkTheme, description: strings.darkDesc, icon: '🌙' },
    { id: 'solar', label: strings.solarTheme, description: strings.solarDesc, icon: '🌓' },
    { id: 'mono', label: strings.monoTheme, description: strings.monoDesc, icon: '⚫' },
  ];

  const languageOptions = [
    { code: 'en', label: 'English', flag: '🇺🇸' },
    { code: 'es', label: 'Español', flag: '🇪🇸' },
    { code: 'fr', label: 'Français', flag: '🇫🇷' },
    { code: 'de', label: 'Deutsch', flag: '🇩🇪' },
    { code: 'ru', label: 'Русский', flag: '🇷🇺' },
  ];

  const handleThemeChange = (newTheme: ThemeId) => {
    setTheme(newTheme);
  };

  const handleToggleSounds = (value: boolean) => {
    updateSettings({ sounds: value });
  };

  const handleToggleHaptics = (value: boolean) => {
    updateSettings({ haptics: value });
  };

  const handleLanguageChange = (languageCode: string) => {
    setLanguage(languageCode);
  };

  const renderSettingSection = (
    title: string,
    children: React.ReactNode
  ) => (
    <View style={[styles.section, { backgroundColor: colors.surface1 }]}>
      <Text style={[styles.sectionTitle, { color: colors.text }]}>{title}</Text>
      {children}
    </View>
  );

  const renderToggleRow = (
    label: string,
    description: string,
    value: boolean,
    onValueChange: (value: boolean) => void,
    icon?: string
  ) => (
    <View style={styles.settingRow}>
      <View style={styles.settingContent}>
        <View style={styles.settingHeader}>
          {icon && <Text style={styles.settingIcon}>{icon}</Text>}
          <Text style={[styles.settingLabel, { color: colors.text }]}>{label}</Text>
        </View>
        {description && (
          <Text style={[styles.settingDescription, { color: colors.textSecondary }]}>
            {description}
          </Text>
        )}
      </View>
      <Switch
        value={value}
        onValueChange={onValueChange}
        trackColor={{ false: colors.border, true: colors.primary }}
        thumbColor={colors.surface0}
        ios_backgroundColor={colors.border}
      />
    </View>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.surface0 }]}>
      <StatusBar barStyle={(theme === 'light') ? 'dark-content' : 'light-content'} />

      {/* Header */}
      <View style={[styles.header, { backgroundColor: colors.surface1 }]}>
        <TouchableOpacity onPress={goBack} style={styles.backButton}>
          <Text style={[styles.backButtonText, { color: colors.text }]}>←</Text>
        </TouchableOpacity>
        <Text style={[styles.title, { color: colors.text }]}>{strings.settings}</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Theme Section */}
        {renderSettingSection(
          strings.appearance,
          <View style={styles.themeGrid}>
            {themeOptions.map((themeOption) => (
              <TouchableOpacity
                key={themeOption.id}
                style={[
                  styles.themeOption,
                  {
                    backgroundColor: theme === themeOption.id ? colors.primary : colors.surface2,
                    borderColor: colors.border,
                  },
                ]}
                onPress={() => handleThemeChange(themeOption.id)}
              >
                <Text style={styles.themeIcon}>{themeOption.icon}</Text>
                <Text
                  style={[
                    styles.themeLabel,
                    { color: theme === themeOption.id ? colors.surface0 : colors.text }
                  ]}
                >
                  {themeOption.label}
                </Text>
                <Text
                  style={[
                    styles.themeDescription,
                    { color: theme === themeOption.id ? colors.surface0 : colors.textSecondary }
                  ]}
                >
                  {themeOption.description}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        )}

        {/* Audio Section */}
        {renderSettingSection(
          strings.audioFeedback,
          <>
            {renderToggleRow(
              strings.soundEffects,
              strings.playSounds,
              settings.sounds,
              handleToggleSounds,
              '🔊'
            )}
            {renderToggleRow(
              strings.hapticFeedback,
              strings.vibrateInteractions,
              settings.haptics,
              handleToggleHaptics,
              '📳'
            )}
          </>
        )}

        {/* Language Section */}
        {renderSettingSection(
          strings.language,
          <View style={styles.languageContainer}>
            {languageOptions.map((language) => (
              <TouchableOpacity
                key={language.code}
                style={[
                  styles.languageOption,
                  {
                    backgroundColor: language === language.code ? colors.primary : colors.surface2,
                    borderColor: colors.border,
                  },
                ]}
                onPress={() => handleLanguageChange(language.code)}
              >
                <Text style={styles.languageFlag}>{language.flag}</Text>
                <Text
                  style={[
                    styles.languageLabel,
                    { color: language === language.code ? colors.surface0 : colors.text }
                  ]}
                >
                  {language.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        )}

        {/* About Section */}
        {renderSettingSection(
          strings.about,
          <View style={styles.aboutContainer}>
            <View style={styles.aboutItem}>
              <Text style={[styles.aboutLabel, { color: colors.textSecondary }]}>{strings.version}</Text>
              <Text style={[styles.aboutValue, { color: colors.text }]}>1.0.0</Text>
            </View>
            <View style={styles.aboutItem}>
              <Text style={[styles.aboutLabel, { color: colors.textSecondary }]}>{strings.build}</Text>
              <Text style={[styles.aboutValue, { color: colors.text }]}>2024.01.01</Text>
            </View>
            <View style={styles.aboutItem}>
              <Text style={[styles.aboutLabel, { color: colors.textSecondary }]}>{strings.developer}</Text>
              <Text style={[styles.aboutValue, { color: colors.text }]}>Combinations Team</Text>
            </View>
          </View>
        )}

        {/* Reset Section */}
        <View style={[styles.section, { backgroundColor: colors.surface1 }]}>
          <TouchableOpacity
            style={[styles.resetButton, { borderColor: colors.error }]}
            onPress={() => {
              updateSettings({
                theme: 'light',
                sounds: true,
                haptics: true,
                leftHanded: false,
                reduceMotion: false,
              });
              setTheme('light');
            }}
          >
            <Text style={[styles.resetButtonText, { color: colors.error }]}>
              {strings.resetAllSettings}
            </Text>
          </TouchableOpacity>
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
  themeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.sm,
  },
  themeOption: {
    flex: 1,
    minWidth: 140,
    padding: SPACING.md,
    borderRadius: BORDER_RADIUS.md,
    borderWidth: 1,
    alignItems: 'center',
  },
  themeIcon: {
    fontSize: 24,
    marginBottom: SPACING.xs,
  },
  themeLabel: {
    ...TYPOGRAPHY.body,
    fontWeight: '600',
    marginBottom: SPACING.xs,
  },
  themeDescription: {
    ...TYPOGRAPHY.caption,
    textAlign: 'center',
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: SPACING.sm,
  },
  settingContent: {
    flex: 1,
  },
  settingHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.xs,
  },
  settingIcon: {
    fontSize: 20,
    marginRight: SPACING.sm,
  },
  settingLabel: {
    ...TYPOGRAPHY.body,
    fontWeight: '600',
  },
  settingDescription: {
    ...TYPOGRAPHY.caption,
    marginLeft: SPACING.xl,
  },
  languageContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.sm,
  },
  languageOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: BORDER_RADIUS.md,
    borderWidth: 1,
  },
  languageFlag: {
    fontSize: 20,
    marginRight: SPACING.sm,
  },
  languageLabel: {
    ...TYPOGRAPHY.body,
    fontWeight: '600',
  },
  aboutContainer: {
    gap: SPACING.sm,
  },
  aboutItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: SPACING.xs,
  },
  aboutLabel: {
    ...TYPOGRAPHY.body,
  },
  aboutValue: {
    ...TYPOGRAPHY.body,
    fontWeight: '600',
  },
  resetButton: {
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.lg,
    borderRadius: BORDER_RADIUS.md,
    borderWidth: 1,
    alignItems: 'center',
  },
  resetButtonText: {
    ...TYPOGRAPHY.body,
    fontWeight: '600',
  },
});
