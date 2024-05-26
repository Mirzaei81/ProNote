import { ThemedView } from "@/components/ThemedView";
import { useSession } from "@/hooks/useSession";
import { Redirect,Stack } from "expo-router";
import { ActivityIndicator, } from "react-native-paper";
import { useEffect } from "react";
import { useMaterial3ThemeContext } from "@/hooks/materialThemeProvider";
import { useStorageState } from "@/hooks/useStorageState";

export default function RootLayout() {
  const { updateTheme } = useMaterial3ThemeContext();
  const [[LoadingSourceColor,sourceColor]] = useStorageState('sourceColor');
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
  return (
      <Stack screenOptions={{headerTitle:"",navigationBarColor:"black"}}>
        <Stack.Screen name='index' options={{headerShown:false}}/>
        <Stack.Screen name='create'  options={{headerTransparent:true,headerStyle:{backgroundColor:sourceColor!}} }/>
        <Stack.Screen name='about'
         options={{headerTransparent:true,headerStyle:{backgroundColor:sourceColor!}} }
    />
      <Stack.Screen name='[id]' options={{headerTransparent:true,headerStyle:{backgroundColor:sourceColor!}} }
/>
      </Stack>
  )
}