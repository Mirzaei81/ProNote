import { FontSizeProviderContext, useMaterial3ThemeContext } from '@/hooks/materialThemeProvider';
import { useStorageState } from '@/hooks/useStorageState';
import { Stack } from 'expo-router';
import { useContext } from 'react';
import { useColorScheme } from 'react-native';

export default function Layout() {
  const fontCtx = useContext(FontSizeProviderContext);
  const { updateTheme,theme } = useMaterial3ThemeContext();
  const [[LoadingSourceColor,sourceColor]] = useStorageState('sourceColor');
  const ColorScheme = useColorScheme()

  return (
    <Stack
          screenOptions={{ headerTitleStyle: { fontSize: fontCtx.fontSize },
           headerStyle: { backgroundColor: theme[ColorScheme!].primary, } }}
    />
  );
}
