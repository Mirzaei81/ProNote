import { useSession } from "@/hooks/useSession";
import {Image} from "expo-image"
import { useState } from "react";
import { ThemedView } from '@/components/ThemedView';
import { Button, Snackbar, Text, TextInput } from "react-native-paper";
import { StyleSheet } from "react-native";
import { useAssets } from "expo-asset";
import { Link, router } from "expo-router";
import { useThemeColor } from "@/hooks/useThemeColor";
import { AntDesign } from '@expo/vector-icons';

export default function Login() {
  const color= useThemeColor({}, 'inverseOnSurface');
  const [visible,setVisible] = useState(false)
  const assets = useAssets([require("../assets/images/logo.png")])
  const {logIn} = useSession()
  const [username,setUserName] = useState("Mirzaei28")
  const [password,setPassword] = useState("@m1r@rsh1@")
  const [error,setError] = useState("")
  const handleLogin =async ()=>  {
      const res =await logIn(username,password)
      if(res!.hasOwnProperty("error")){
        setError(res?.error!)
        setVisible(true)
      }
      router.replace("/")
  }
  return (
      <ThemedView className="h-full flex items-center justify-center" >
      {/*@ts-expect-error */}
        <Image contentFit="cover" style={style.image} source={assets[0]}  alt="proNote"/>
        <TextInput
          value={username}
          className="w-4/5 m-2"
          label="Username"
          onChangeText={(username) => setUserName( username )}
          right={<TextInput.Icon icon="account" />}

        />
        <TextInput
          value={password}
          className="w-4/5"
          onChangeText={(password) => setPassword( password )}
          label="Password"
          placeholder={'Password'}
          secureTextEntry={true} 
          right={<TextInput.Icon icon="key" />}
        />
        <Button
          mode="contained-tonal" 
          className="mt-4 text-center flex justify-center"
          contentStyle={style.button}
          onPress={handleLogin}
        >Login</Button>
        <Link  href="/SignUp" asChild><Text>Don't Have an account?</Text></Link>
      <Snackbar duration={5000} onDismiss={() => setVisible(false)} visible={visible}>
        {error!=="" &&
          error
        }
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
    width : 120,
    height: 120,
    borderRadius:20,
  }
})
