import React, { createContext, useContext, useState, ReactNode } from 'react';
import { HomeScreen } from '../screens/HomeScreen';
import { GameScreen } from '../screens/GameScreen';
import { StatsScreen } from '../screens/StatsScreen';
import { SettingsScreen } from '../screens/SettingsScreen';

type Screen = 'home' | 'game' | 'stats' | 'settings';

interface NavigationContextType {
  currentScreen: Screen;
  navigateTo: (screen: Screen) => void;
  goBack: () => void;
}

const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

export const useNavigation = () => {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error('useNavigation must be used within a NavigationProvider');
  }
  return context;
};

interface NavigationProviderProps {
  children: ReactNode;
}

export const NavigationProvider: React.FC<NavigationProviderProps> = ({ children }) => {
  const [currentScreen, setCurrentScreen] = useState<Screen>('home');
  const [screenHistory, setScreenHistory] = useState<Screen[]>(['home']);

  const navigateTo = (screen: Screen) => {
    setScreenHistory(prev => [...prev, screen]);
    setCurrentScreen(screen);
  };

  const goBack = () => {
    if (screenHistory.length > 1) {
      const newHistory = screenHistory.slice(0, -1);
      setScreenHistory(newHistory);
      setCurrentScreen(newHistory[newHistory.length - 1]);
    }
  };

  const value: NavigationContextType = {
    currentScreen,
    navigateTo,
    goBack,
  };

  return (
    <NavigationContext.Provider value={value}>
      {children}
    </NavigationContext.Provider>
  );
};

const ScreenRenderer: React.FC<{ currentScreen: Screen }> = ({ currentScreen }) => {
  switch (currentScreen) {
    case 'home':
      return <HomeScreen />;
    case 'game':
      return <GameScreen />;
    case 'stats':
      return <StatsScreen />;
    case 'settings':
      return <SettingsScreen />;
    default:
      return <HomeScreen />;
  }
};

export const AppNavigator: React.FC = () => {
  const { currentScreen } = useNavigation();
  return <ScreenRenderer currentScreen={currentScreen} />;
};
