/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { ThemeProvider } from './src/core/ThemeContext';
import { GameProvider } from './src/core/GameContext';
import { NavigationProvider, AppNavigator } from './src/core/Navigation';

function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
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
    </GestureHandlerRootView>
  );
}

export default App;
