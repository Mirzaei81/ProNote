import { useSession } from "@/hooks/useSession";
import {Image} from "expo-image"
import { useState } from "react";
import { ThemedView } from '@/components/ThemedView';
import { Button, HelperText, Snackbar, Text, TextInput } from "react-native-paper";
import { StyleSheet } from "react-native";
import { useAssets } from "expo-asset";
import { Link, router } from "expo-router";

export default function Login() {

  const [visible,setVisible] = useState(false)
  const [error,setError] = useState("")  //SnackBar

  const assets = useAssets([require("../assets/images/logo.png")])

  const {signIn} = useSession()

  const [username,setUserName] = useState("")
  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")       //Forms
  const [Checkpassword,setCheckPassword] = useState("")

  const handleSignIn =async ()=>  {
      const res =await signIn(username,password,email)
      if(res!.hasOwnProperty("error")){
        setError(res?.error!)
        setVisible(true)
      }
      router.replace("/")
  }
  const passCheck=()=>{
    if(Checkpassword.length===0){
      return false
    }
    return  !(password=== Checkpassword)
  }
  const hasErrors = ()=>{
    return (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email) && email.length!==0)
  }
  return (
      <ThemedView className="h-full flex items-center justify-center" >
      {/*@ts-expect-error */}
        <Image contentFit="cover" style={style.image} className="text-white" source={assets[0]}   alt="proNote"/>
        <TextInput
          value={username}
          className="w-4/5 m-2"
          onChangeText={(username) => setUserName( username )}
          label={'Username'}
          right={<TextInput.Icon icon="account" />}
        />
        <TextInput
          value={email}
          className="w-4/5 m-2"
          onChangeText={(username) => setEmail( username )}
          label={'Email'}
          right={<TextInput.Icon icon="email" />}
        />
      <HelperText type="error" style={{color:"red"}} visible={hasErrors()}>
        Email address is invalid!
      </HelperText>

        <TextInput
          value={password}
          className="w-4/5"
          onChangeText={(password) => setPassword( password )}
          label="Password"
          secureTextEntry={true}
          right={<TextInput.Icon icon="key" />}
        />
        <TextInput
          value={Checkpassword}
          className="w-4/5"
          onChangeText={(password) => setCheckPassword(password)}
          label={'Password Confirmation'}
          secureTextEntry={true}
          right={<TextInput.Icon icon="key" />}
        />
      <HelperText type="error" visible={passCheck()}>
      password and Confirmation don't match 
      </HelperText>
        <Button
          mode="contained-tonal" 
          className="mt-4 text-center flex justify-center"
          contentStyle={style.button}
          onPress={handleSignIn}
        >SignUp</Button>
        <Link  href="/Login" asChild><Text>Already have an account ?</Text></Link>
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
    width : 160,
    height: 160
  }

})
