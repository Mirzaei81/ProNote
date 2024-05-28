import { useSession } from "@/hooks/useSession";
import { noteData } from "@/types";
import { deleteNote, getNotesByTitle } from "@/utils/api";
import { useQuery } from "@tanstack/react-query";
import { useLocalSearchParams, useNavigation, usePathname, useRouter } from "expo-router";
import { KeyboardAvoidingView, Platform, StyleSheet, View } from "react-native";
import { Portal, Snackbar,Text, useTheme } from "react-native-paper";
import { useEffect, useLayoutEffect, useState } from "react";
import { FontAwesome5} from "@expo/vector-icons";
import ValidationComponent from '@/components/ValidationComponent';
import { ThemedView } from "@/components/ThemedView";
import { useAssets } from "expo-asset";
import CustomText from "@/components/Text";
import WebView from "react-native-webview";
import { useWebViewStyle } from "@/constants/css";

export default function Page(){
  const asset = useAssets([require("@/assets/images/logo.png")])
  const [css,setCss] = useWebViewStyle()
  const theme = useTheme()
  const navigation = useNavigation()
  const {id}= useLocalSearchParams();
  const { session } = useSession();
  const [show, setShow] = useState(false)
  const [error, setError] = useState("")
  const [SnackBarVisible, setSnackBarVisible] = useState(false)
  const router = useRouter()
  
  const [loading,setLoading] =useState(false)
    const { data: Notes, isLoading } = useQuery<noteData>({
        queryKey: [id],
        queryFn: () => (typeof id==="string" ? getNotesByTitle(session!,id):{data:[],message:""}),
    })

    
  useEffect(() => {
    navigation.setOptions({
      title: id, // Set the title here
      headerRight: () => (
        <View className="flex flex-row space-x-3">
          <FontAwesome5 name="trash" size={24} color={theme.colors.onPrimary} onPress={() => setShow(true)} />
          <FontAwesome5 name="edit" size={24} color={theme.colors.onPrimary} onPress={() => router.push({pathname:`/edit/${id}`
          ,params:{NoteId:Notes?.data[0].id as number}})} />
        </View>
    )
    });
  }, [navigation,Notes]);
    const RemoveNote =()=>{
             deleteNote(id! as string ,session! ).then(() =>{router.replace("/")}).catch((e) => {
                setError("An Error occourd while trying to connect ot server"+e.toString()),
                setSnackBarVisible(true)
            })
            setShow(false), setLoading(false)
    }
    const handleCreate = ()=>{
      setLoading(true)
      RemoveNote()
    }
    const path=  usePathname()
    console.log(Notes?.data[0].body!+css)
    return(
      <ThemedView className="h-full p-2">
        <WebView source={{ html: Notes?.data[0].body!+css}}
          scalesPageToFit={(Platform.OS === 'ios') ? false : true}
      />
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