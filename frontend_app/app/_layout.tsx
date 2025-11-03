import React from 'react';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import { useColorScheme } from '@/hooks/use-color-scheme';

export const unstable_settings = {
  // Khởi động vào nhóm (tabs) thay vì (auth)
  anchor: '(tabs)',
};

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack screenOptions={{ headerShown: false }}>
        {/* (tabs) là group chứa Home, sẽ là nơi khởi động */}
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="(auth)" />
      </Stack>

      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
