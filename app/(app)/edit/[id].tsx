import { useState } from 'react';
import { RichText, Toolbar, useEditorBridge } from "@10play/tentap-editor"
import { KeyboardAvoidingView, Platform, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams } from 'expo-router';
import { TextInput } from 'react-native-paper';
import { AntDesign } from '@expo/vector-icons';

export const RichTextComponents = () => {
    const param = useLocalSearchParams();
    const id = param.id
    const [title, setTitle] = useState<string>('');
    const editor = useEditorBridge({
        autofocus: true,
        avoidIosKeyboard: true,
        initialContent: 'Start editing!',
    });

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View>
                <AntDesign name="save" size={24} color="black" />
            </View>
            
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
        </SafeAreaView>
    );
};
