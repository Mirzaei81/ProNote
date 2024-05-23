import { useSession } from "@/hooks/useSession";
import {Image} from "expo-image"
import { useState } from "react";
import { View } from 'react-native';
import { Button, TextInput } from "react-native-paper";

export default function Login() {
  const {signIn} = useSession()
  const [username,setUserName] = useState("")
  const [password,setPassword] = useState("")
  return (
      <View className="h-full flex items-center justify-center" >
        <Image source="@/assets/images/logo.png"  alt="proNote"/>
        <TextInput
          value={username}
          onChangeText={(username) => setUserName( username )}
          placeholder={'Username'}
        />
        <TextInput
          value={password}
          onChangeText={(password) => setPassword( password )}
          placeholder={'Password'}
          secureTextEntry={true}
        />
        <Button
          onPress={()=>signIn(username,password)}
        >Login</Button>
      </View>
  );
}
