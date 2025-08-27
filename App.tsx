/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ThemeProvider } from './src/core/ThemeContext';
import { GameProvider } from './src/core/GameContext';
import { NavigationProvider, AppNavigator } from './src/core/Navigation';

function App() {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <NavigationProvider>
          <GameProvider>
            <StatusBar barStyle="default" />
            <AppNavigator />
          </GameProvider>
        </NavigationProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}

export default App;
