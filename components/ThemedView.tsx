import { View, ViewStyle, type ViewProps } from 'react-native';

import { useThemeColor } from '@/hooks/useThemeColor';
import { StatusBar } from 'react-native';

export type ThemedViewProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
};

export function ThemedView({ style, lightColor, darkColor, ...otherProps }: ThemedViewProps) {
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'background');
  const ViewStyle:ViewStyle = { backgroundColor,height:"100%" }
  return <View style={[ViewStyle, style]} {...otherProps} />;
}
