import { FontSizeProviderContext } from "@/hooks/materialThemeProvider"
import { useThemeColor } from "@/hooks/useThemeColor"
import { useContext, useEffect, useState } from "react"

export const useWebViewStyle = ()=>{
    const onSurface = useThemeColor({}, "onSurface")
    const Surface = useThemeColor({}, "surface")
    const fontSize = useContext(FontSizeProviderContext).fontSize
    const defaultStyle = `<style> *{
        color:${onSurface};
        font-size:${fontSize/8}rem;
    }
    html{
        background-color:${Surface};
        padding:1rem;
    }
    </style>
`
    const [style,setStyle] = useState(defaultStyle)
    return [style,setStyle]
}