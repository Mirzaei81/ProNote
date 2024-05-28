import CustomText from "@/components/Text";
import { ThemedView } from "@/components/ThemedView";
import { useSession } from "@/hooks/useSession";
import { useAssets } from "expo-asset";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { View, StyleSheet } from "react-native";
import { Button, useTheme } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Page (){
    const assets = useAssets(require("@/assets/images/Signout.svg"))
    const {signOut} = useSession()
    const theme = useTheme()
    const router = useRouter()
  return (
      <ThemedView className="h-full flex flex-col justify-center items-center px-10" >
          <SafeAreaView className="flex flex-col items-center">
              {/*@ts-expect-error */}
              <Image contentFit="cover" style={styles.image} source={assets[0]} alt='Create First' />
              <CustomText className="text-center text-2xl">We Will miss you </CustomText>
              <View className="flex ">
                  <Button style={styles.button} onPress={signOut} mode="contained"><CustomText style={{color:theme.colors.onPrimary}}>Sign Out</CustomText></Button>
                  <Button style={styles.button} onPress={()=>router.replace('/')} mode="contained"><CustomText style={{color:theme.colors.onPrimary}}>Go Home </CustomText></Button>
              </View>
          </SafeAreaView>
      </ThemedView>
  );
}
const styles = StyleSheet.create({
  image:{
    width: 320,
    height: 320,
    borderRadius: 20,
  },
  button:{
    width:300,
    height:50,
    margin:10
  }
})