import { ThemedView } from "@/components/ThemedView";
import { useSession } from "@/hooks/useSession";
import { noteData } from "@/types";
import { getNotesByTitle } from "@/utils/api";
import { useQuery } from "@tanstack/react-query";
import { useLocalSearchParams, useNavigation } from "expo-router";
import {  StyleSheet } from "react-native";
import { Text } from "react-native-paper";
import { useLayoutEffect } from "react";
import { useHeaderHeight } from '@react-navigation/elements';

export default function Page(){
    const insets = useHeaderHeight();
    const param = useLocalSearchParams();
    const id =param.id
    const {session}  =useSession();
    const { data: Notes, isLoading } = useQuery<noteData>({
        queryKey: [id],
        queryFn: () => (typeof id==="string" ? getNotesByTitle(session!,id):{data:[],message:""}),
        enabled:(session!==undefined)
    })
  const navigation = useNavigation()
  useLayoutEffect(()=>{
    navigation.setOptions({
      title: 'HelloWolrld', // Set the title here
    });
  }, [navigation]);
    return(
        <ThemedView className="h-full p-2">
          <Text className="text-white  text-2xl">{id}</Text>
          <Text>{Notes && Notes?.data[0].body}</Text>
        </ThemedView>
    )
}
const styles = StyleSheet.create({
  shimmer:{
    width:"100%",
    height:80,
    borderRadius:6
  }
})