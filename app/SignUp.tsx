import { useSession } from "@/hooks/useSession";
import {Image} from "expo-image"
import { useState } from "react";
import { ThemedView } from '@/components/ThemedView';
import { Button, HelperText, Snackbar, TextInput } from "react-native-paper";
import { customText } from "react-native-paper";
import { StyleSheet } from "react-native";
import { useAssets } from "expo-asset";
import { Link, router } from "expo-router";
import { useThemeColor } from "@/hooks/useThemeColor";
import CustomText from "@/components/Text";

export default function Login() {

  const [visible,setVisible] = useState(false)
  const [error,setError] = useState("")  //SnackBar

  const assets = useAssets([require("../assets/images/logo.png")])
  const colorError =useThemeColor({},"error")
  const onError =useThemeColor({},"onError")

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
          style={{fontSize:}}
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
        <CustomText style={{ color: colorError }}>
          Email address is invalid!
        </CustomText>
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
        <CustomText style={{color:colorError}}>
      password and Confirmation don't match 
      </CustomText>
      </HelperText>
        <Button
          mode="contained-tonal" 
          className="mt-4 text-center flex justify-center"
          contentStyle={style.button}
          onPress={handleSignIn}
        ><CustomText>SignUp</CustomText></Button>
        <Link  href="/Login" asChild><CustomText>Already have an account ?</CustomText></Link>
      <Snackbar style={{backgroundColor:colorError}}  duration={5000} onDismiss={() => setVisible(false)} visible={visible}>
        <CustomText style={{color:onError}}>
          {error}
          </CustomText>
          
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
