import { useCallback, useContext, useEffect, useLayoutEffect, useState } from 'react';
import { RichText, Toolbar } from "@10play/tentap-editor"
import { KeyboardAvoidingView, Platform,  StyleProp,  TextStyle,  View, ViewStyle } from 'react-native';
import {  useLocalSearchParams, useNavigation, useRouter } from 'expo-router';
import {  Portal, Snackbar,  TextInput } from 'react-native-paper';
import { AntDesign } from '@expo/vector-icons';
import { postNote } from '@/utils/api';
import { useSession } from '@/hooks/useSession';
import { ThemedView } from '@/components/ThemedView';
import ValidationComponent from '@/components/ValidationComponent';
import CustomText from '@/components/Text';
import { FontSizeProviderContext } from '@/hooks/materialThemeProvider';
import { editorConfig } from '@/utils/editorConfig';
import { useThemeColor } from '@/hooks/useThemeColor';

export default function CreatePage({ navigation, route }:any){
    const nav = useNavigation()
    const param = useLocalSearchParams();

    const colorError = useThemeColor({}, "error")
    const onError = useThemeColor({}, "onError")
    const onPrimary = useThemeColor({}, "onPrimary")
    const {session} = useSession()
    const router = useRouter()

    const [title, setTitle] = useState('');
    const [error, setError] = useState("")

    const [show,setShow] = useState(false)
    const [loading, setLoading] = useState(false)
    const [SnackBarVisible, setSnackBarVisible] = useState(false)

    const fontSize = useContext(FontSizeProviderContext).fontSize
    const editor = editorConfig("")
    const [RichTextKey,setRichTextKey]=useState(0) //Chaning it at first time to cause forcefully rerender 
    useEffect(()=>{
        if (navigation) {
            navigation.setOptions({
                title: param.id
            })
        }
        setRichTextKey(RichTextKey+1)
    },[navigation])

    const handleCreate = async ()=>{
        setLoading(true)
        const body = await editor.getHTML()
        if (title.length === 0) {
            console.log(body,title)
            setError("Title shouldn't be Empty ")
            setSnackBarVisible(true)
            setLoading(false)
            setShow(false)
        }
        else {
            postNote(session!, title.trim(), body).then(() => router.replace("/")).catch((e) => {
                setError("An Error occourd while trying to connect ot server"),
                setSnackBarVisible(true)
            })
            setShow(false)
            setLoading(false)
        }

    }
    useLayoutEffect(()=>{
        nav.setOptions({
            headerRight:()=>(<AntDesign name="save" size={32} color={onPrimary}  onPress={()=>setShow(true)} />)
        })
    },[nav])
    
    const titleChange = useCallback((e:string)=>{
        nav.setOptions({
            title:e,
        })
        setTitle(e)
    },[])
    const fontSizeStyle: StyleProp<TextStyle> = { fontSize: fontSize };
    const SnackBarStyle: StyleProp<ViewStyle> = { backgroundColor: colorError }
    const HelperStyle: StyleProp<TextStyle> = { color: colorError }
    const SnackBarTextStyle: StyleProp<TextStyle> = { color: onError }
    return (
        <ThemedView>
            <View>
            </View>
        <Portal>
            <ValidationComponent setShow={setShow} loading={loading} handler={handleCreate} show={show} />
      </Portal>
            <TextInput label="Title" style={fontSizeStyle}  mode='flat' value={title} onChangeText={titleChange} />
            <RichText key={RichTextKey} editor={editor} />
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={{
                    position: 'absolute',
                    width: '100%',
                    bottom: 0
                }}
            >
                <Toolbar editor={editor} />
            </KeyboardAvoidingView>
            <Snackbar style={SnackBarStyle} duration={5000} onDismiss={() => setSnackBarVisible(false)} visible={SnackBarVisible}>
                <CustomText style={SnackBarTextStyle}>{error}</CustomText>
            </Snackbar>
        </ThemedView>
    );
};
