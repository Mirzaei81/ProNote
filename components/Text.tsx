import { FontSizeProviderContext } from "@/hooks/materialThemeProvider";
import {  RFValue } from "react-native-responsive-fontsize";
import React, { LegacyRef, PropsWithChildren, useContext } from "react";
import { customText, Text } from "react-native-paper"
import { TextStyle, View } from "react-native";
import { VariantProp } from "react-native-paper/lib/typescript/components/Typography/types";

interface CustomTextProps{
    style?:TextStyle
    className?:string
    variant?:VariantProp<never>
    numberOfLine?:number
}
const  CustomText= React.forwardRef((props:PropsWithChildren<CustomTextProps>,ref)=>{
    const  fontSize = RFValue(useContext(FontSizeProviderContext).fontSize)||18;
    return(
        <View ref={ref as LegacyRef<View>}>
            <Text style={[{ fontSize: fontSize }, props.style]} variant={props.variant}
                numberOfLines={props.numberOfLine} className={props.className}
                {...props}>{props.children}</Text>
</View >
    )
})
export default CustomText;