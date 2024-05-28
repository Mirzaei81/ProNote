import { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { Button, Text } from "react-native-paper";
import { Colors } from "react-native/Libraries/NewAppScreen";
import CustomText from "./Text";

export const Item = ({ title, idx, onPress,colorScheme}: ItemProps) => {
  const [color,setColor] = useState(Colors.light.background)
  useEffect(() => {
    setColor(colorScheme[idx%(colorScheme.length)])
  }, [colorScheme])

  return (
    <Button key={idx} buttonColor={color} contentStyle={styles.item} mode="contained" onPress={onPress}> 
      <CustomText className='text-center'>
        {title}
      </CustomText>
    </Button>
  )
};

export type ItemProps = {idx:number,title:string,colorScheme:string[],onPress:(()=>void) | undefined}
const styles = StyleSheet.create({
  item:{
    width : '100%',
    height: 80,
  },
})