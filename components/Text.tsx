import { FontSizeProviderContext } from "@/hooks/materialThemeProvider";
import {  RFValue } from "react-native-responsive-fontsize";
import { PropsWithChildren, useContext } from "react";
import { Text } from "react-native-paper"
import { TextStyle } from "react-native";
import { VariantProp } from "react-native-paper/lib/typescript/components/Typography/types";

interface CustomTextProps{
    style?:TextStyle
    className?:string
    variant?:VariantProp<never>
    numberOfLine?:number
}
export default function CustomText({children,style,className,variant,numberOfLine,...otherProps}:PropsWithChildren<CustomTextProps>){
    const  fontSize = RFValue(useContext(FontSizeProviderContext).fontSize)||18;
    return(
        <Text style={[{fontSize:fontSize},style]} variant={variant}
         numberOfLines={numberOfLine} className={className}
         {...otherProps}
          >{children}</Text>
    )
}