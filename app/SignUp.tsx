import { useSession } from "@/hooks/useSession";
import {Image} from "expo-image"
import { useState } from "react";
import { ThemedView } from '@/components/ThemedView';
import { Button, Snackbar, Text, TextInput } from "react-native-paper";
import { StyleSheet } from "react-native";
import { useAssets } from "expo-asset";

export default function Login() {
  const  [visibale,setVisiable] = useState(false)
  const assets = useAssets([require("../assets/images/logo.png")])
  const {signIn} = useSession()
  const [username,setUserName] = useState("")
  const [password,setPassword] = useState("")
  return (
      <ThemedView className="h-full flex items-center justify-center" >
        <Image contentFit="cover" style={style.image} className="text-white" source={assets[0]}   alt="proNote"/>
        <TextInput
          value={username}
          className="w-4/5 m-2"
          onChangeText={(username) => setUserName( username )}
          placeholder={'Username'}
        />
        <TextInput
          value={username}
          className="w-4/5 m-2"
          onChangeText={(username) => setUserName( username )}
          placeholder={'Username'}
        />
        <TextInput
          value={password}
          className="w-4/5"
          onChangeText={(password) => setPassword( password )}
          placeholder={'Password'}
          secureTextEntry={true}
        />
        <TextInput
          value={password}
          className="w-4/5"
          onChangeText={(password) => setPassword( password )}
          placeholder={'Password'}
          secureTextEntry={true}
        />
        <Button
          mode="contained-tonal" 
          className="mt-4 text-center flex justify-center"
          contentStyle={style.button}
          onPress={()=>signIn(username,password)}
        >Login</Button>
        <Snackbar>
            {err}
        </Snackbar>
      </ThemedView>
  );
}
const style = StyleSheet.create({
  button:{
    width : 260,
    height: 80
  },
  image:{
    width : 160,
    height: 160
  }

})
