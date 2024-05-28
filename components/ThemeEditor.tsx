import { isDynamicThemeSupported } from '@pchmn/expo-material3-theme';
import { StyleSheet, useColorScheme } from 'react-native';
import { IconButton, Switch, Text, TouchableRipple } from 'react-native-paper';

import { FontSizeProviderContext, useMaterial3ThemeContext } from '@/hooks/materialThemeProvider';
import { Flex } from './Flex';
import { useStorageState } from '@/hooks/useStorageState';
import CustomText from './Text';
import { LinearGradient } from 'expo-linear-gradient';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useContext } from 'react';
import {Themedcolors as colors} from "@/constants/Colors"

export function ThemeEditor() {
  const colorScheme = useColorScheme();
  const { updateTheme, resetTheme } = useMaterial3ThemeContext();
  const {fontSize,UpdateFontSize}  = useContext(FontSizeProviderContext)

  const [[loadingTheme,useDefaultTheme], setUseDefaultTheme] =useStorageState('useDefaultTheme');
  const [[LoadingSourceColor,sourceColor], setSourceColor] = useStorageState('sourceColor');

  const handleUseDefaultThemeChange = (value: boolean) => {
    if (value) {
      resetTheme();
    }
    setUseDefaultTheme(value.toString());
  };

  const handleSourceColorChange = (color: string) => {
    setSourceColor(color);
    updateTheme(color);
  };

  return (
    <Flex style={{ paddingTop: 20 }}>
      {isDynamicThemeSupported && (
        <Flex direction="row" justify="space-between">
          <Text>Use default theme</Text>
          <Switch value={JSON.parse(useDefaultTheme!) !== false} onValueChange={handleUseDefaultThemeChange} />
        </Flex>
      )}

      <Flex direction='row' justify='center' wrap='wrap'>
        <CustomText>Select source FontSize</CustomText>
        <Flex direction='row' justify='space-around'>
          {[10,14, 16, 18,24].map((val) => (
            <TouchableRipple
              style={styles.button}
              onPress={() => UpdateFontSize(val)}
            >
              <CustomText className="" style={styles.buttonContent}>{val}</CustomText>
            </TouchableRipple>
          ))}
        </Flex>

        <CustomText>Select source color</CustomText>
        <Flex  direction="row" justify="center">
          {colors.map(({ light, dark }) => {
            const color = colorScheme === 'dark' ? dark : light;
            return (
              <TouchableRipple
                style={{ margin:10, height: 50, width: 50, borderRadius: 50 }}
                onPress={() => handleSourceColorChange(color)}
                borderless
                rippleColor="rgba(0, 0, 0, .32)"
                disabled={JSON.parse(useDefaultTheme!)}
                key={color}
              >
                <Flex
                  backgroundColor={color}
                  justify="center"
                  align="center"
                  style={{
                    height: 50,
                    width: 50,
                    borderRadius: 50,
                    opacity: useDefaultTheme ? 0.5 : 1,
                  }}
                >
                  {sourceColor && [light, dark].includes(sourceColor) && (
                    <IconButton icon="check" iconColor="#000" size={20} />
                  )}
                </Flex>
              </TouchableRipple>
            );
          })}
        </Flex>
      </Flex>
    </Flex>
  );
}
const styles = StyleSheet.create({
  button: {
    backgroundColor: 'transparent',
    overflow:"hidden",
    borderRadius: 10,
    height: 80,
    width: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ripple: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 40,
  },
  buttonContent: {
    position: 'relative',
  },
});