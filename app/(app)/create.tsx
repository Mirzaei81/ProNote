import { useState } from 'react';
import { CodeBridge, RichText, TenTapStartKit, Toolbar, useEditorBridge } from "@10play/tentap-editor"
import { KeyboardAvoidingView, Platform, View } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { Button, Dialog, Portal, TextInput, useTheme } from 'react-native-paper';
import { AntDesign } from '@expo/vector-icons';
import { postNote } from '@/utils/api';
import { useSession } from '@/hooks/useSession';
import { ThemedView } from '@/components/ThemedView';
export default function Create(){
    const theme = useTheme()
    const {session} = useSession()
    const param = useLocalSearchParams();
    const id = param.id
    const [title, setTitle] = useState<string>('');
    const [show,setShow] = useState(false)
    const customCodeBlockCSS = `
        code {
            background-color: ${theme.colors.background};
            border-radius: 0.25em;
            border-color: #e45d5d;
            border-width: 6px;
            border-style: solid;
            box-decoration-break: clone;
            color: ${theme.colors.onBackground};
            font-size: 0.9rem;
            padding: 0.5em;
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
    const Create = async ()=>{
        const body = await editor.getText()
       postNote(session!,title,body) 
    }

    return (
        <ThemedView >
            <View>
                <AntDesign name="save" size={24} color="black"  onPress={()=>setShow(true)} />
            </View>
        <Portal>
        <Dialog visible={show} onDismiss={()=>setShow(false)}>
          <Dialog.Title>Save Changes</Dialog.Title>
          <Dialog.Content>
           <Button onPress={()=>setShow(false)} style={{backgroundColor:theme.colors.error}}>Close</Button> 
           <Button onPress={()=>{Create(),setShow(false)}} style={{backgroundColor:theme.colors.primary}}>Save</Button> 
          </Dialog.Content>
        </Dialog>
      </Portal>
            <TextInput className=" p-4" mode='flat' value={title} onChangeText={(e) => { setTitle(e) }} />
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
