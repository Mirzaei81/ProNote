import { useSession } from "@/hooks/useSession";
import {Image} from "expo-image"
import { useState } from "react";
import { ThemedView } from '@/components/ThemedView';
import { ActivityIndicator, Button, HelperText, Snackbar, Text, TextInput } from "react-native-paper";
import { StyleSheet, View } from "react-native";
import { useAssets } from "expo-asset";
import { Link, router } from "expo-router";
import { useThemeColor } from "@/hooks/useThemeColor";

export default function Login() {
  const colorError = useThemeColor({}, 'error');
  const [visible,setVisible] = useState(false)
  const assets = useAssets([require("../assets/images/logo.png")])
  const {logIn} = useSession()
  const [username,setUserName] = useState("Mirzaei28")
  const [password,setPassword] = useState("@m1r@rsh1@")
  const [error,setError] = useState("")
  const [loading,setLoading] = useState(false)
  const handleLogin =async ()=>  {
      setLoading(true)
      const res = await logIn(username,password)
    if (res!.hasOwnProperty("error")) {
      setError(res?.error!)
      setLoading(false)
      setVisible(true)
    }
    else {
      setLoading(false)
      router.replace("/")
    }
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
          className="mt-4 z-30  flex"
          contentStyle={style.button}
          onPress={handleLogin}
        >
        {loading? (
          <View className="flex items-center justify-center content-center">
            <ActivityIndicator style={style.activity}  size={40} />
          </View>
      ) : "Login"
      }</Button>
        <Link  href="/SignUp" asChild><Text>Don't Have an account?</Text></Link>
      <Snackbar style={{backgroundColor:colorError}}  duration={5000} onDismiss={() => setVisible(false)} visible={visible}>
        {
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
  },
  activity:{
    alignItems:"center",
    alignContent:"center",
    justifyContent:"center",
  }
})
