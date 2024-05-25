import { ThemedView } from "@/components/ThemedView";
import { useSession } from "@/hooks/useSession";
import { Redirect,router,Stack, useLocalSearchParams, useRouter } from "expo-router";
import { ActivityIndicator } from "react-native-paper";

export default function RootLayout() {
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
      <Stack.Screen name='[id]' options={{headerTransparent:true}}
/>
      </Stack>
  )
}