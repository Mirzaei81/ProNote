import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import {  useEffect, useState } from 'react';
import 'react-native-reanimated';

import { PaperProvider } from 'react-native-paper';
import { SessionProvider } from '@/hooks/useSession';
import Login from './(app)/Login';
import HomeScreen from './(app)';
import { DefaultTheme } from 'react-native-paper';

//defaultTheme for React Native Paper
const customTheme = {
  ...DefaultTheme,
  dark: false,
  roundness: 4,
  myOwnProperty: true,
  colors: {
            primary: "#DBC66E",
            surfaceTint: "#DBC66E",
            onPrimary: "#3A3000",
            primaryContainer: "#534600",
            onPrimaryContainer: "#F8E287",
            secondary: "#D1C6A1",
            onSecondary: "#363016",
            secondaryContainer: "#4E472A",
            onSecondaryContainer: "#EEE2BC",
            tertiary: "#A9D0B3",
            onTertiary: "#143723",
            tertiaryContainer: "#2C4E38",
            onTertiaryContainer: "#C5ECCE",
            error: "#FFB4AB",
            onError: "#690005",
            errorContainer: "#93000A",
            onErrorContainer: "#FFDAD6",
            background: "#15130B",
            onBackground: "#E8E2D4",
            surface: "#15130B",
            onSurface: "#E8E2D4",
            surfaceVariant: "#4B4739",
            onSurfaceVariant: "#CDC6B4",
            outline: "#969080",
            outlineVariant: "#4B4739",
            shadow: "#000000",
            scrim: "#000000",
            inverseSurface: "#E8E2D4",
            inverseOnSurface: "#333027",
            inversePrimary: "#6D5E0F",
            primaryFixed: "#F8E287",
            onPrimaryFixed: "#221B00",
            primaryFixedDim: "#DBC66E",
            onPrimaryFixedVariant: "#534600",
            secondaryFixed: "#EEE2BC",
            onSecondaryFixed: "#211B04",
            secondaryFixedDim: "#D1C6A1",
            onSecondaryFixedVariant: "#4E472A",
            tertiaryFixed: "#C5ECCE",
            onTertiaryFixed: "#00210F",
            tertiaryFixedDim: "#A9D0B3",
            onTertiaryFixedVariant: "#2C4E38",
            surfaceDim: "#15130B",
            surfaceBright: "#3C3930",
            surfaceContainerLowest: "#100E07",
            surfaceContainerLow: "#1E1B13",
            surfaceContainer: "#222017",
            surfaceContainerHigh: "#2D2A21",
            surfaceContainerHighest: "#38352B"
        },
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [appisReady,setisReady] =useState(false)
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync()
      setisReady(true)
    }
  }, [loaded]);


  if (!appisReady) {
    return (<></>)
  }

  return (
    <SessionProvider>
      <PaperProvider theme={customTheme}>
          <HomeScreen />
          <Login />
      </PaperProvider>
    </SessionProvider>
  );
}
