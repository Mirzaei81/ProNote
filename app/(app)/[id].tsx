import { ThemedView } from "@/components/ThemedView";
import { useLocalSearchParams } from "expo-router";
import { StyleSheet } from "react-native";
import { Text } from "react-native-paper";

export default function Page(){
    const { id } = useLocalSearchParams();
    console.log(id + " at [id].tsx")
    return(
        <ThemedView style={styles.TopBar} className="h-screen p-2">

            <Text className="text-white  text-2xl">{id}</Text>
        </ThemedView>
    )
}
const styles = StyleSheet.create({
  TopBar: {
  },
})