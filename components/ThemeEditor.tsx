import { isDynamicThemeSupported } from '@pchmn/expo-material3-theme';
import { useColorScheme } from 'react-native';
import { IconButton, Switch, Text, TouchableRipple } from 'react-native-paper';

import { useMaterial3ThemeContext } from '@/hooks/materialThemeProvider';
import { Flex } from './Flex';
import { useStorageState } from '@/hooks/useStorageState';

const colors = [
  {
    light: '#FFE082',
    dark: '#FFE082',
  },
  {
    light: '#3E8260',
    dark: '#ADF2C7',
  },
  {
    light: '#756FAB',
    dark: '#E5DFFF',
  },
  {
    light: '#9F6C2C',
    dark: '#FDDDB9',
  },
];

export function ThemeEditor() {
  const colorScheme = useColorScheme();
  const { updateTheme, resetTheme } = useMaterial3ThemeContext();

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

      <Flex >
        <Text>Select source color</Text>
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