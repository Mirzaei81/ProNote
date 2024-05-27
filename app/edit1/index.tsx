import { useEffect, useState } from 'react';
import { CodeBridge, RichText, TenTapStartKit, Toolbar, useEditorBridge } from "@10play/tentap-editor"
import { KeyboardAvoidingView, Platform, View } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Button, Dialog, Portal, Snackbar, TextInput, useTheme } from 'react-native-paper';
import { AntDesign } from '@expo/vector-icons';
import { useSession } from '@/hooks/useSession';
import { useQuery } from '@tanstack/react-query';
import { getNotesByTitle, updateNote } from '@/utils/api';
import { noteData } from '@/types';
import { ThemedView } from '@/components/ThemedView';
import ValidationComponent from '@/components/ValidationComponent';

export const Page= () => {
    const [loading,setLoading] = useState(false)
    const param = useLocalSearchParams();
    const theme = useTheme()
    const id = param.id
    const [title, setTitle] = useState<string>('');
    const [show,setShow] = useState(false)
    const {session}  =useSession();
    const { data: Notes, isLoading } = useQuery<noteData>({
        queryKey: [id],
        queryFn: () => (typeof id==="string" ? getNotesByTitle(session!,id):{data:[],message:""}),
        enabled:(session!==undefined)
    })

    const [SnackBarVisible, setSnackBarVisible] = useState(false)
    const [error, setError] = useState("")
    const router = useRouter()

    const customCodeBlockCSS = `
        code {
            background-color: ${theme.colors.background};
            border-radius: 0.25em;
            border-color: #e45d5d;
            border-width: 1px;
            border-style: solid;
            box-decoration-break: clone;
            color: ${theme.colors.onBackground};
            font-size: 0.9rem;
            padding: 0.25em;
        }
        `;
    const editor = useEditorBridge({
        autofocus: true,
        avoidIosKeyboard: true,
        initialContent: Notes?Notes.message:"",
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
    const handleUpdate = async ()=>{
        setLoading(true)
        const body = await editor.getText()
        if (body.length !== 0 || title.length !== 0) {
            setError("Body or Title shouldn't be Empty ")
            setSnackBarVisible(true)
        }
        else {
            updateNote(title, body,session!).then(() => router.replace("/")).catch((e) => {
                setError("An Error occourd while trying to connect ot server"),
                setSnackBarVisible(true)
            })
            setShow(false)
            setLoading(false)
        }
    }
    return (
        <ThemedView className='h-full'>
            <View>
                <AntDesign name="save" size={24} color="black"  onPress={()=>setShow(true)} />
            </View>
        <Portal>
            <ValidationComponent setShow={setShow} loading={loading} handler={handleUpdate} show={show} />
      </Portal>
      {/*@ts-ignore*/}
            <TextInput mode='flat' value={title} onChange={(e) => { setTitle(e.target.value) }} />
            <RichText editor={editor} />
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
                {error}
            </Snackbar>
        </ThemedView>
    );
};
