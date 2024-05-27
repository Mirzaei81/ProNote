import { useSession } from "@/hooks/useSession";
import { noteData } from "@/types";
import { deleteNote, getNotesByTitle } from "@/utils/api";
import { useQuery } from "@tanstack/react-query";
import { useLocalSearchParams, useNavigation, useRouter } from "expo-router";
import {   StyleSheet, View } from "react-native";
import { Portal, Snackbar,Text, useTheme } from "react-native-paper";
import { useLayoutEffect, useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import ValidationComponent from '@/components/ValidationComponent';
import { ThemedView } from "@/components/ThemedView";
import useIsReady from "@/hooks/useIsReady";
import { Image } from "expo-image";
import { useAssets } from "expo-asset";

export default function Page(){
  const asset = useAssets([require("@/assets/images/logo.png")])
  const theme = useTheme()
  const navigation = useNavigation()
  const param = useLocalSearchParams();
  const id = param.id
  const { session } = useSession();
  const [show, setShow] = useState(false)
  const [error, setError] = useState("")
  const [SnackBarVisible, setSnackBarVisible] = useState(false)
  const router = useRouter()
  
  const [loading,setLoading] =useState(false)
    const { data: Notes, isLoading } = useQuery<noteData>({
        queryKey: [id],
        queryFn: () => (typeof id==="string" ? getNotesByTitle(session!,id):{data:[],message:""}),
        enabled:(session!==undefined)
    })

  useLayoutEffect(() => {
    navigation.setOptions({
      title: id, // Set the title here
      headerRight: () => (<AntDesign name="delete" size={24} color={theme.colors.onPrimary} onPress={() => setShow(true)} />)
    });
  }, [navigation]);
    const RemoveNote =()=>{
             deleteNote(id! as string ,session! ).then((d) =>{console.log(JSON.stringify(d)+"[id]:39"); router.replace("/")}).catch((e) => {
                setError("An Error occourd while trying to connect ot server"+e.toString()),
                setSnackBarVisible(true)
            })
            setShow(false), setLoading(false)
    }
    const handleCreate = ()=>{
      setLoading(true)
      RemoveNote()
    }
    if(isLoading){
      return(
      <View className='h-full flex items-center content-center bg-[rgb(82,62,39)]'>
        {/*@ts-ignore*/}
        <Image source={asset[0]} style={styles.image} alt='proNote' />
      </View>
    )
  }
    return(
      <ThemedView className="h-full p-2">
        <Text>{Notes && Notes?.data[0].body}</Text>
        <Portal>
          <ValidationComponent setShow={setShow} loading={loading} handler={handleCreate} show={show} />
            <Snackbar style={{ backgroundColor: theme.colors.error }} duration={5000} onDismiss={() => setSnackBarVisible(false)} visible={SnackBarVisible}>
              {error}
            </Snackbar>
        </Portal>
      </ThemedView>
    )
}
const styles = StyleSheet.create({
  shimmer:{
    width:"100%",
    height:80,
    borderRadius:6
  },
  image:{
    width: 320,
    height: 320,
    borderRadius: 20,

  }
})