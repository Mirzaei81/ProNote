import { FontSizeProviderContext } from "@/hooks/materialThemeProvider";
import {  RFValue } from "react-native-responsive-fontsize";
import { useContext } from "react";
import { Text } from "react-native-paper"
import { TextStyle } from "react-native";

export default function CustomText({children,style}:{children:React.ReactNode,style?:TextStyle}){
    const  fontSize = RFValue(useContext(FontSizeProviderContext).fontSize);
    return(
        <Text style={{fontSize,...style}}>{children}</Text>
    )

}