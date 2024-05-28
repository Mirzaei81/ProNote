import { CodeBridge, PlaceholderBridge, TenTapStartKit, useEditorBridge } from "@10play/tentap-editor";
import { MD3Theme } from "react-native-paper";

export function editorConfig(theme:MD3Theme,initialMessage:string){
    const customCodeBlockCSS = `
        * {
            background-color #ffdede;
            padding:0.25rem;
        }
        p {
            color:${theme.colors.onSurface};
        }
        ::placeholder{
            color:${theme.colors.onSurface};
        }
        code {
            background-color: ${theme.colors.background};
            border-radius: 0.25em;
            border-color: #e45d5d;
            border-width: 1px;
            border-style: solid;
            box-decoration-break: clone;
            color: ${theme.colors.onSurface};
            font-size: 0.9rem;
            padding: 0.25em;
        }
        `;
    const editor = useEditorBridge({
        autofocus: true,
        avoidIosKeyboard: true,
        initialContent: initialMessage,
        bridgeExtensions: [
            ...TenTapStartKit,
            PlaceholderBridge.configureExtension({
                placeholder: 'Type something...',
            }),
            CodeBridge.configureCSS(customCodeBlockCSS), // Custom codeblock css
        ],
        theme: {
            colorKeyboard: {
                keyboardRootColor: 'white'
            },
            webview: {
                backgroundColor: theme.colors.surface,
            },
        }
    });
    return editor
}