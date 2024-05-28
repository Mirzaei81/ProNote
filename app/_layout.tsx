import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import {  useEffect, useState } from 'react';
import 'react-native-reanimated';
import { SessionProvider } from '@/hooks/useSession';
import { DefaultTheme,PaperProvider } from 'react-native-paper';
import { Slot } from 'expo-router';
import { AccessibilityInfo, LogBox, useColorScheme } from 'react-native';
import { Colors } from '@/constants/Colors';
import 'react-native-reanimated'
import 'react-native-gesture-handler'
import {
  QueryClient,
  QueryClientProvider
} from '@tanstack/react-query'
import {  Material3ThemeProvider } from '@/hooks/materialThemeProvider';
import { useStorageState } from '@/hooks/useStorageState';

export const LightTheme = {
  ...DefaultTheme,
  roundness: 2,
  myOwnProperty: true,
  colors: {
            ...DefaultTheme.colors,
            ...Colors.light,
        },
};
//defaultTheme for React Native Paper
export const DarkTheme = {
  ...DefaultTheme,
  roundness: 2,
  myOwnProperty: true,
  colors: {
            ...DefaultTheme.colors,
            ...Colors.dark,
        },
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

  const client = new QueryClient()
export default function RootLayout() {

  const [appisReady,setisReady] =useState(false)
  const [[loading,sourceColor]] = useStorageState('sourceColor');

  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });
  const colorScheme = useColorScheme()
  const theme = colorScheme === "dark" ? DarkTheme: LightTheme

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync()
      setisReady(true)
    }
    if (__DEV__) {
      LogBox.ignoreLogs(["Warning: TextInput.Icon:", "Warning: ","Editor"]);
    }
  }, [loaded]);


  return (
    <SessionProvider>
        <QueryClientProvider client={client}>
          <Material3ThemeProvider sourceColor={sourceColor!}>
            <Slot />
          </Material3ThemeProvider>
        </QueryClientProvider>
    </SessionProvider>
  );
}
