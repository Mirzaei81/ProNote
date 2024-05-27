import { Material3Scheme, Material3Theme, useMaterial3Theme } from '@pchmn/expo-material3-theme';
import { createContext, useContext, useEffect, useState } from 'react';
import { StatusBar, useColorScheme } from 'react-native';
import {
  MD3DarkTheme,
  MD3LightTheme,
  MD3Theme,
  Provider as PaperProvider,
  ProviderProps,
  useTheme,
} from 'react-native-paper';

import { Flex } from '../components/Flex';
import {  useStorageState } from './useStorageState';
import { Font, MD3Typescale, ThemeProp } from 'react-native-paper/lib/typescript/types';


type fontWeight = "normal" | "bold" | "100" | "200" | "300" | "400" | "500" | "600" | "700" | "800" | "900" | undefined
type fontStyle = "normal"|"italic"
type $DeepPartial<T> = { [P in keyof T]?: $DeepPartial<T[P]> };

type Material3ThemeProviderProps = {
  theme: Material3Theme;
  updateTheme: (sourceColor: string) => void;
  updateFontStyle:(val:fontStyle)=>void;
  updateFontWeight:(val:fontWeight)=>void;
  updateRoundness:(val:number)=>void;
  resetTheme: () => void;
};
const Material3ThemeProviderContext = createContext<Material3ThemeProviderProps>({} as Material3ThemeProviderProps);
export function Material3ThemeProvider({
  children,
  sourceColor,
  fallbackSourceColor,
  ...otherProps
}: ProviderProps & { sourceColor?: string; fallbackSourceColor?: string }) {
  const colorScheme = useColorScheme();
  const [[,fontStyle],ChangeFontStyle] =useStorageState('fontStyle');
  const [[,fontwight],ChangeFontWeight ] = useStorageState('fontWight');
  const [[,roundness],ChangeRoundness] = useStorageState('roundness');
  const [font,setFont] = useState<$DeepPartial<MD3Typescale>>({}as $DeepPartial<MD3Typescale>)

  const { theme, updateTheme, resetTheme } = useMaterial3Theme({
    sourceColor,
    fallbackSourceColor,
  });

  useEffect(()=>{
    const TargetFont:$DeepPartial<MD3Typescale>= {
      ...otherProps.theme?.fonts as Font,
      fontStyle:fontStyle as fontStyle,
      fontWeight:fontwight as fontWeight
    }
    setFont(TargetFont)
  },[font,fontwight])

  const updateFontWeight= (val:fontWeight)=>[
     ChangeFontWeight(val as string)
  ]
  const  updateFontStyle= (val:fontStyle)=>[
    ChangeFontStyle (val as string)
  ]
  const  updateRoundness= (val:number)=>[
    ChangeRoundness (val.toString())
  ]
  const paperTheme:ThemeProp =
    colorScheme === 'dark' ? { ...MD3DarkTheme, colors: theme.dark,fonts:font,} : { ...MD3LightTheme, colors: theme.light,fonts:font };
  return (
    <Material3ThemeProviderContext.Provider value={{ theme, updateTheme, resetTheme,updateFontStyle,updateFontWeight,updateRoundness}}>
      <StatusBar
        barStyle={colorScheme === 'dark' ? 'light-content' : 'dark-content'}
        backgroundColor="transparent"
        translucent
      />
      <PaperProvider theme={paperTheme} {...otherProps}>
        <Flex flex={1} backgroundColor={paperTheme.colors!.background}>
          {children}
        </Flex>
      </PaperProvider>
    </Material3ThemeProviderContext.Provider>
  );
}

export function useMaterial3ThemeContext() {
  const ctx = useContext(Material3ThemeProviderContext);
  if (!ctx) {
    throw new Error('useMaterial3ThemeContext must be used inside Material3ThemeProvider');
  }
  return ctx;
}

export const useAppTheme = useTheme<MD3Theme & { colors: Material3Scheme }>;