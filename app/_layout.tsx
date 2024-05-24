import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import {  useEffect, useState } from 'react';
import 'react-native-reanimated';
import { SessionProvider } from '@/hooks/useSession';
import { DefaultTheme,PaperProvider } from 'react-native-paper';
import { Slot } from 'expo-router';
import { useColorScheme } from 'react-native';
import { Colors } from '@/constants/Colors';
import 'react-native-reanimated'
import 'react-native-gesture-handler'
import {
  QueryClient,
  QueryClientProvider
} from '@tanstack/react-query'

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

  const client = new QueryClient()
export default function RootLayout() {

  const [appisReady,setisReady] =useState(false)
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
  }, [loaded]);

  return (
    <SessionProvider>
      <QueryClientProvider client={client}>
        <PaperProvider theme={theme}>
          <Slot />
        </PaperProvider>
      </QueryClientProvider>
    </SessionProvider>
  );
}
