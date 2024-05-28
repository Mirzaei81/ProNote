import CustomText from "@/components/Text";
import { ThemedView } from "@/components/ThemedView";
import { useAssets } from "expo-asset";
import { Image } from "expo-image";
import { Link } from "expo-router";
import { StatusBar, StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Page () {
    const assets = useAssets([require("../../assets/images/logo.png")])
    return (
      <ThemedView className="p-2 h-full flex items-center" style={styles.topBar} >
        <CustomText className="text-center m-10" variant="titleLarge">about us</CustomText>
        <Link href="/" asChild>
        {/*@ts-expect-error */}
          <Image contentFit="cover" style={styles.image} source={assets[0]} alt="proNote" />
        </Link>
        <SafeAreaView>
          <CustomText variant="bodyMedium" className="m-2">
            Welcome to our amazing note-taking app! We are dedicated to helping you stay
            organized and productive. With our app, you can easily create, edit, and manage your
            notes on the go.
          </CustomText>
          <View className="items-center content-center">
            <CustomText className="white-text-pre" variant="titleMedium" numberOfLine={5}>
              React Native and Expo{'\n'}
              React Native Paper{'\n'}
              Local Storage Hook{'\n'}
              Tenstack Query{'\n'}
              Express{'\n'}
              MySQL{'\n'}  
            </CustomText>
          </View>
          <CustomText variant="bodyMedium" className="m-2">
            Thank you for choosing our app for your note-taking needs!
          </CustomText>
        </SafeAreaView>
      </ThemedView>
    );
  };
  const styles = StyleSheet.create({
  topBar: {
    marginTop: StatusBar.currentHeight || 0,
  },
  image:{
    width : 120,
    height: 120,
    borderRadius:20,
  },

  })