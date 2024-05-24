import { ThemedView } from "@/components/ThemedView";
import { useSession } from "@/hooks/useSession";
import { noteData } from "@/types";
import { getNotesByTitle } from "@/utils/api";
import { useQuery } from "@tanstack/react-query";
import { useLocalSearchParams } from "expo-router";
import { StyleSheet } from "react-native";
import { Text } from "react-native-paper";

export default function Page(){
    const { id } = useLocalSearchParams();
    const {session}  =useSession();
    const { data: Notes, isLoading } = useQuery<noteData>({
        queryKey: [session!],
        queryFn: () => (typeof id==="string" ? getNotesByTitle(session!,id):{data:[],message:""}),
    })
    console.log(Notes)
    return(
        <ThemedView style={styles.TopBar} className="h-screen p-2">
            <Text className="text-white  text-2xl">{id}</Text>
            <Text>{Notes?.data[0].body}</Text>
        </ThemedView>
    )
}
const styles = StyleSheet.create({
  TopBar: {
  },
})