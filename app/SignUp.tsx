import { useSession } from "@/hooks/useSession";
import {Image} from "expo-image"
import { useContext, useState } from "react";
import { ThemedView } from '@/components/ThemedView';
import { ActivityIndicator, Button, HelperText, Snackbar, TextInput } from "react-native-paper";
import { StyleSheet, View } from "react-native";
import { useAssets } from "expo-asset";
import { Link, router } from "expo-router";
import { useThemeColor } from "@/hooks/useThemeColor";
import CustomText from "@/components/Text";
import { FontSizeProviderContext } from "@/hooks/materialThemeProvider";

export default function Page() {
  const  fontSize = useContext(FontSizeProviderContext).fontSize;

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

  const [loading,setLoading] = useState(false)

  const handleSignIn =async ()=>  {
    setLoading(true)
    const res = await signIn(username, password, email)
    console.log(res)
      if(res!.hasOwnProperty("error")){
        setError(res?.error!)
        setVisible(true)
      }
      else {
        router.replace("/")
      }
      setLoading(false)
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
          style={{fontSize:fontSize}}
          className="w-4/5 m-2"
          onChangeText={(username) => setUserName( username )}
          label={'Username'}
          right={<TextInput.Icon icon="account" />}
        />
        <TextInput
          value={email}
          className="w-4/5 m-2"
          style={{fontSize:fontSize}}
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
          style={{fontSize:fontSize}}
          secureTextEntry={true}
          right={<TextInput.Icon icon="key" />}
        />
        <TextInput
          value={Checkpassword}
          style={{fontSize:fontSize}}
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
          className="mt-4 z-30  flex"
          contentStyle={style.button}
          onPress={handleSignIn}
        >
        {loading? (
          <View className="flex flex-1 items-center justify-center content-center">
            <ActivityIndicator style={style.activity}  size={40} />
          </View>
      ) :<CustomText>SignUp</CustomText> 
      }</Button>
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
  },
  activity:{
    alignItems:"center",
    verticalAlign:"middle"
  }
})
