import { useCallback, useEffect, useLayoutEffect, useState } from 'react';
import { CodeBridge, RichText, TenTapStartKit, Toolbar, useEditorBridge } from "@10play/tentap-editor"
import { KeyboardAvoidingView, Platform,  View } from 'react-native';
import {  useLocalSearchParams, useNavigation, useRouter } from 'expo-router';
import {  Portal, Snackbar,  TextInput, useTheme } from 'react-native-paper';
import { AntDesign } from '@expo/vector-icons';
import { postNote } from '@/utils/api';
import { useSession } from '@/hooks/useSession';
import { ThemedView } from '@/components/ThemedView';
import ValidationComponent from '@/components/ValidationComponent';

export default function CreateSCreen({ navigation, route }:any){
    const nav = useNavigation()
    const theme = useTheme()
    const {session} = useSession()
    const param = useLocalSearchParams();
    const router = useRouter()
    const [title, setTitle] = useState<string>('');
    const [show,setShow] = useState(false)
    const [loading, setLoading] = useState(false)
    const [SnackBarVisible, setSnackBarVisible] = useState(false)
    const [error, setError] = useState("")

    const customCodeBlockCSS = `
        code {
            background-color: ${theme.colors.surface};
            border-radius: 0.25em;
            border-color: #e45d5d;
            border-width: 6px;
            border-style: solid;
            box-decoration-break: clone;
            color: ${theme.colors.onBackground};
            font-size: 0.9rem;
        }
        `;
    const editor = useEditorBridge({
        autofocus: true,
        avoidIosKeyboard: true,
        initialContent: 'Start editing!',
        bridgeExtensions: [
            ...TenTapStartKit,
            CodeBridge.configureCSS(customCodeBlockCSS), // Custom codeblock css
        ],
        theme:{
            colorKeyboard:{
                keyboardRootColor:theme.colors.onSurface
            },
        webview: {
            backgroundColor: theme.colors.primary,
          },
        }
    });
    useEffect(()=>{
        if(navigation){
        navigation.setOptions({
            title : param.id
        })
        }
    },[navigation])

    const handleCreate = async ()=>{
        setLoading(true)
        const body = await editor.getText()
        if (body.length !== 0 || title.length !== 0) {
            setError("Body or Title shouldn't be Empty ")
            setSnackBarVisible(true)
        }
        else {
            postNote(session!, title, body).then(() => router.replace("/")).catch((e) => {
                setError("An Error occourd while trying to connect ot server"),
                setSnackBarVisible(true)
            })
            setShow(false)
            setLoading(false)
        }

    }
    useLayoutEffect(()=>{
        nav.setOptions({
            headerRight:()=>(<AntDesign name="save" size={32} color={theme.colors.onPrimary}  onPress={()=>setShow(true)} />)
        })
    },[nav])
    
    const titleChange = useCallback((e:string)=>{
        console.log(e)
        nav.setOptions({
            title:e,
        })
        setTitle(e)
    },[])
    return (
        <ThemedView>
            <View>
            </View>
        <Portal>
            <ValidationComponent setShow={setShow} loading={loading} handler={handleCreate} show={show} />
      </Portal>
            <TextInput label="Title"   mode='flat' value={title} onChangeText={(e) => { titleChange(e) }} />
            <RichText  editor={editor} />
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={{
                    position: 'absolute',
                    width: '100%',
                    bottom: 0,
                }}
            >
                <Toolbar editor={editor} />
            </KeyboardAvoidingView>
            <Snackbar style={{ backgroundColor: theme.colors.error }} duration={5000} onDismiss={() => setSnackBarVisible(false)} visible={SnackBarVisible}>
                {
                    error
                }
            </Snackbar>
        </ThemedView>
    );
};
