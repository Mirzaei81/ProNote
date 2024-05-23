import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import {  useEffect, useState } from 'react';
import 'react-native-reanimated';
import { SessionProvider } from '@/hooks/useSession';
import { DefaultTheme,PaperProvider } from 'react-native-paper';
import { Slot } from 'expo-router';
import { useColorScheme } from 'react-native';
import { Colors } from '@/constants/Colors';

const LightTheme = {
  ...DefaultTheme,
  roundness: 2,
  myOwnProperty: true,
  colors: {
            ...DefaultTheme.colors,
            ...Colors.light,
        },
};
//defaultTheme for React Native Paper
const DarkTheme = {
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

export default function RootLayout() {
  const [appisReady,setisReady] =useState(false)
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });
  const colorScheme = useColorScheme()
  const theme = colorScheme === "dark" ? DarkTheme: LightTheme
  console.log(colorScheme)
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
      <PaperProvider theme={theme}>
        <Slot/>
      </PaperProvider>
    </SessionProvider>
  );
}
