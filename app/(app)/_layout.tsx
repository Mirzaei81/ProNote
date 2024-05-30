import { ThemedView } from "@/components/ThemedView";
import { useSession } from "@/hooks/useSession";
import { Redirect,Stack } from "expo-router";
import { ActivityIndicator, useTheme, } from "react-native-paper";
import { useContext, useEffect } from "react";
import { FontSizeProviderContext, useMaterial3ThemeContext } from "@/hooks/materialThemeProvider";
import { useStorageState } from "@/hooks/useStorageState";
import { useColorScheme } from "react-native";

export default function RootLayout() {
  const fontCtx = useContext(FontSizeProviderContext);
  const { updateTheme,theme } = useMaterial3ThemeContext();
  const [[LoadingSourceColor,sourceColor]] = useStorageState('sourceColor');
  const ColorScheme = useColorScheme()

  useEffect(()=>{
    if(!LoadingSourceColor && sourceColor){
      updateTheme(sourceColor);
    }
  },[sourceColor])
  const {isLoading,session} = useSession()
  if(isLoading){
    return (
      <ThemedView>
        <ActivityIndicator/>
      </ThemedView>
    )
  }
  if(!session){
    return <Redirect href="/Login"/>
  }
  const headerTitleStyle={ fontSize: fontCtx.fontSize }
  const headerStyle={ backgroundColor: theme[ColorScheme!].primary, }
  return (
    <Stack screenOptions={{ headerTitleStyle: headerTitleStyle, headerStyle:headerStyle  }}>
      <Stack.Screen name='index' options={{ headerShown: false }} />
      <Stack.Screen name='create' options={{  headerTransparent: false }} />
      <Stack.Screen name='about' options={{ headerShown:false}} />
      <Stack.Screen name='signOut'options={{headerShown:false}}/>
      <Stack.Screen name='[id]' />
    </Stack>
  )
}