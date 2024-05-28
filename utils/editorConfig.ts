import { CodeBridge, TenTapStartKit, useEditorBridge } from "@10play/tentap-editor";
import { MD3Theme } from "react-native-paper";

export function editorConfig(theme:MD3Theme,initialMessage:string){
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
        initialContent: initialMessage,
        bridgeExtensions: [
            ...TenTapStartKit,
            CodeBridge.configureCSS(customCodeBlockCSS), // Custom codeblock css
        ],
        theme: {
            colorKeyboard: {
                keyboardRootColor: theme.colors.onSurface
            },
            webview: {
                backgroundColor: theme.colors.primary,
            },
        }
    });
    return editor
}