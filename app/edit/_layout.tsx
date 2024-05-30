import { FontSizeProviderContext, useMaterial3ThemeContext } from '@/hooks/materialThemeProvider';
import { Stack } from 'expo-router';
import { useContext } from 'react';
import { useColorScheme } from 'react-native';

export default function Layout() {
  const fontCtx = useContext(FontSizeProviderContext);
  const {theme } = useMaterial3ThemeContext();
  const ColorScheme = useColorScheme()
  const headerStyle = { backgroundColor: theme[ColorScheme!].primary, }
  const headerTitleStyle = { fontSize: fontCtx.fontSize }
  return (
    <Stack
      screenOptions={{
        headerTitleStyle: headerTitleStyle,
        headerStyle: headerStyle
      }}
    />
  );
}
