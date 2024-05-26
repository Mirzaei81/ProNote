import { ThemedView } from "@/components/ThemedView";
import { darkLinear, lightLinear, location } from "@/constants/Colors";
import { useSession } from "@/hooks/useSession";
import { noteData } from "@/types";
import { getNotesByTitle } from "@/utils/api";
import { useQuery } from "@tanstack/react-query";
import { LinearGradient } from "expo-linear-gradient";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { StatusBar, StyleSheet, useColorScheme } from "react-native";
import { Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import ShimmerPlaceholder from "react-native-shimmer-placeholder";
import Constants from 'expo-constants'
import { useLayoutEffect } from "react";

export default function Page(){
    const param = useLocalSearchParams();
    const id =param.id
    const {session}  =useSession();
    const { data: Notes, isLoading } = useQuery<noteData>({
        queryKey: [id],
        queryFn: () => (typeof id==="string" ? getNotesByTitle(session!,id):{data:[],message:""}),
        enabled:(session!==undefined)
    })
  const colorScheme  = useColorScheme()
  const ShimmerGrad = colorScheme =="dark"?darkLinear:lightLinear
  const navigation = useNavigation()
  useLayoutEffect(()=>{
    navigation.setOptions({
      title: 'Home', // Set the title here
    });
  }, [navigation]);
    if(isLoading){
        return (
            <ThemedView className="h-full">
                {[0, 1, 2, 3, 4, 5, 6, 7].map((_, idx) => (
                    <ShimmerPlaceholder key={idx} shimmerStyle={styles.shimmer} shimmerColors={ShimmerGrad} location={location} visible={false} LinearGradient={LinearGradient} />
                ))}
            </ThemedView>
        )
    }
    return(
      <SafeAreaView>
        <ThemedView style={styles.TopBar} className="h-full p-2">
          <Text className="text-white  text-2xl">{id}</Text>
          <Text>{Notes && Notes?.data[0].body}</Text>
        </ThemedView>
      </SafeAreaView>
    )
}
const styles = StyleSheet.create({
  TopBar: {
    marginTop:Constants.statusBarHeight||0
  },
  shimmer:{
    marginTop:10,
    width:"100%",
    height:80,
    borderRadius:6
  }
})