import { useSession } from "@/hooks/useSession";
import { Redirect,Stack } from "expo-router";
import { useEffect } from "react";

export default function RootLayout() {
  const {isLoading,session} = useSession()
  useEffect(()=>{
    console.log(session+"Loaded _layout:8")
  })
  if(!session){
    console.log(session+"Loaded _layout:11")
    return <Redirect href="/Login"/>
  }
  return (
      <Stack screenOptions={{headerTitle:"",navigationBarColor:"black"}}>
        <Stack.Screen name='index' options={{headerShown:false}}/>
        <Stack.Screen name='[id]'/>
      </Stack>
  )
}