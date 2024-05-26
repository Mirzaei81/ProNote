import { useState } from 'react';
import { CodeBridge, RichText, TenTapStartKit, Toolbar, useEditorBridge } from "@10play/tentap-editor"
import { KeyboardAvoidingView, Platform, View } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { Button, Dialog, Portal, TextInput, useTheme } from 'react-native-paper';
import { AntDesign } from '@expo/vector-icons';
import { useSession } from '@/hooks/useSession';
import { useQuery } from '@tanstack/react-query';
import { getNotesByTitle } from '@/utils/api';
import { noteData } from '@/types';
import { ThemedView } from '@/components/ThemedView';

import { useHeaderHeight } from '@react-navigation/elements';
export const Page= () => {
    const insets = useHeaderHeight();
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

    return (
        <ThemedView style={{flex:1}}>
            <View>
                <AntDesign name="save" size={24} color="black"  onPress={()=>setShow(true)} />
            </View>
        <Portal>
        <Dialog visible={show} onDismiss={()=>setShow(false)}>
          <Dialog.Title>Save Changes</Dialog.Title>
          <Dialog.Content>
           <Button>Close</Button> 
           <Button>Save</Button> 
          </Dialog.Content>
        </Dialog>
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
        </ThemedView>
    );
};
