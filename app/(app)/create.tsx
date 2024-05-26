import { useCallback, useEffect, useLayoutEffect, useState } from 'react';
import { CodeBridge, RichText, TenTapStartKit, Toolbar, useEditorBridge } from "@10play/tentap-editor"
import { KeyboardAvoidingView, Platform, StyleSheet, View } from 'react-native';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import { Button, Dialog, Portal, Text, TextInput, useTheme } from 'react-native-paper';
import { AntDesign } from '@expo/vector-icons';
import { postNote } from '@/utils/api';
import { useSession } from '@/hooks/useSession';
import { ThemedView } from '@/components/ThemedView';
import { useHeaderHeight } from '@react-navigation/elements';

export default function CreateSCreen({ navigation, route }:any){
    const insets = useHeaderHeight();
    const nav = useNavigation()
    const theme = useTheme()
    const {session} = useSession()
    const param = useLocalSearchParams();
    const id = param.id
    const [title, setTitle] = useState<string>('');
    const [show,setShow] = useState(false)
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
        console.log(typeof(navigation))
        }
    },[navigation])
    const Create = async ()=>{
        const body = await editor.getText()
       postNote(session!,title,body)
    }
    const titleChange = useCallback((e:string)=>{
        console.log(e)
        nav.setOptions({
            title:"thie"
        })
        setTitle(e)
    },[])
    return (
        <ThemedView style={{marginTop:insets,flex:1}} >
            <View>
                <AntDesign name="save" size={24} color={theme.colors.onBackground}  onPress={()=>setShow(true)} />
            </View>
        <Portal>
        <Dialog visible={show} onDismiss={()=>setShow(false)}>
          <Dialog.Title>Save Changes</Dialog.Title>
          <Dialog.Content>
                <View className='flex content-center flex-row justify-around '>
                    <Button onPress={() => setShow(false)} style={{ backgroundColor: theme.colors.error,width:125 }}><Text>Close</Text></Button>
                    <Button onPress={() => { Create(), setShow(false) }} style={{ backgroundColor: theme.colors.primary,width:125}}><Text >Save</Text></Button>
                </View>
          </Dialog.Content>
        </Dialog>
      </Portal>
            <TextInput label="Title" className='mb-2'  mode='flat' value={title} onChangeText={(e) => { titleChange(e) }} />
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
        </ThemedView>
    );
};
