import { ThemedView } from "@/components/ThemedView";
import { useAssets } from "expo-asset";
import { Image } from "expo-image";
import { StatusBar, StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

export default function AboutScreen () {
    const assets = useAssets([require("../../assets/images/logo.png")])
    return (
      <ThemedView className="p-2 h-full flex items-center" style={styles.topBar} >
        <Text className="text-center m-10" variant="titleLarge">about us</Text>
        {/*@ts-expect-error */}
        <Image contentFit="cover" style={styles.image} source={assets[0]} alt="proNote" />
        <SafeAreaView>
          <Text variant="bodyMedium" className="m-2">
            Welcome to our amazing note-taking app! We are dedicated to helping you stay
            organized and productive. With our app, you can easily create, edit, and manage your
            notes on the go.
          </Text>
          <View className="items-center content-center">
            <Text className="white-text-pre" variant="titleMedium" numberOfLines={5}>
              React Native and Expo{'\n'}
              React Native Paper{'\n'}
              Local Storage Hook{'\n'}
              Tenstack Query{'\n'}
              Express{'\n'}
              MySQL{'\n'}  
            </Text>
          </View>
          <Text variant="bodyMedium" className="m-2">
            Thank you for choosing our app for your note-taking needs!
          </Text>
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