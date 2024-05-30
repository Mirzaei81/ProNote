import { useCallback, useContext, useEffect, useState } from 'react';
import { CodeBridge, RichText, TenTapStartKit, Toolbar, useEditorBridge } from "@10play/tentap-editor"
import { KeyboardAvoidingView, Platform, StyleProp, TextStyle, View, ViewStyle } from 'react-native';
import { Stack, useLocalSearchParams, useNavigation, useRouter } from 'expo-router';
import { Button, Dialog, Portal, Snackbar, TextInput, useTheme } from 'react-native-paper';
import { AntDesign } from '@expo/vector-icons';
import { useSession } from '@/hooks/useSession';
import { useQuery } from '@tanstack/react-query';
import { getNotesByTitle, updateNote } from '@/utils/api';
import { noteData } from '@/types';
import { ThemedView } from '@/components/ThemedView';
import ValidationComponent from '@/components/ValidationComponent';
import { FontSizeProviderContext } from '@/hooks/materialThemeProvider';
import { editorConfig } from '@/utils/editorConfig';
import CustomText from '@/components/Text';
import { StyleSheet } from 'react-native';
import { useThemeColor } from '@/hooks/useThemeColor';

export default  function Page(){
    const fontSize = useContext(FontSizeProviderContext).fontSize;
    const { id,NoteId} = useLocalSearchParams();
    const { session } = useSession();

    const theme = useTheme()
    const onPrimary = theme.colors.onPrimary
    const colorError= theme.colors.error
    const onError =   theme.colors.onError
    const [SnackBarVisible, setSnackBarVisible] = useState(false)
    const [loading, setLoading] = useState(false)
    const [show, setShow] = useState(false)

    const [error, setError] = useState("")
    const [title, setTitle] = useState('');
    const navigation =  useNavigation()
    const router = useRouter()

    const { data: Notes } = useQuery<noteData>({
        queryKey: [id],
        queryFn: () =>  getNotesByTitle(session!, id as string),
        enabled: (session !== undefined)
    })
    useEffect(() => {
        setTitle(id as string) 
    },[id])
    const editor = editorConfig(Notes?Notes.data[0].body:"")

    const handleUpdate = async () => {
        setLoading(true)
        const body = await editor.getText()
        if (body.length === 0 || title.length === 0) {
            setError("Body or Title shouldn't be Empty ")
            setSnackBarVisible(true)
        }
        else {
            updateNote(NoteId as string,title, body, session!).then(() => router.replace("/")).catch((e) => {
                setError("An Error occourd while trying to connect ot server"),
                    setSnackBarVisible(true)
            })
            setShow(false)
            setLoading(false)
        }
    }
    const fontSizeStyle: StyleProp<Pick<TextStyle, "fontSize" | "fontFamily" | "fontWeight">> = { fontSize: fontSize };
    const SnackBarStyle: StyleProp<ViewStyle> = { backgroundColor: colorError }
    const SnackBarTextStyle: StyleProp<TextStyle> = { color: onError }
    return (
        <>
        <Stack.Screen options={{
            headerTitleStyle:fontSizeStyle,
            headerShown:true,
            headerTitle:title,
            headerLeft:()=>(<AntDesign name="arrowleft" size={fontSize} color={onPrimary} onPress={()=>router.back()}/>),
            headerRight:()=>(<AntDesign name="sync" size={32} color={onPrimary}  onPress={()=>setShow(true)} />)
        }}/>
            <ThemedView className='h-full'>
                <Portal>
                    <ValidationComponent setShow={setShow} loading={loading} handler={handleUpdate} show={show} />
                </Portal>
                {/*@ts-ignore*/}
                <TextInput mode='flat' value={title} onChangeText={setTitle} />
                <RichText editor={editor} />
                <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                    style={styles.KeyBoardStyle}
                >
                    <Toolbar editor={editor} />
                </KeyboardAvoidingView>
                <Snackbar style={SnackBarStyle} duration={5000} onDismiss={() => setSnackBarVisible(false)} visible={SnackBarVisible}>
                    <CustomText style={SnackBarTextStyle}>
                        {error}
                    </CustomText>
                </Snackbar>
            </ThemedView>
        </>
    );
};
const styles = StyleSheet.create({
    KeyBoardStyle: {
        position: 'absolute',
        width: '100%',
        bottom: 0,
    }
})