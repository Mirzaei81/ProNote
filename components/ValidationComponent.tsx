import { useThemeColor } from "@/hooks/useThemeColor";
import { StyleProp, StyleSheet, TextStyle } from "react-native";
import { View } from "react-native";
import { ActivityIndicator, Dialog,Button,Text } from "react-native-paper";

export interface IValidationComponent{
    setShow:(value: React.SetStateAction<boolean>) => void,
    loading: boolean,
    show:boolean,
    handler:()=>void
}
const primary = useThemeColor({}, "error")
const onPrimary = useThemeColor({}, "onPrimary")
const ClosetButtonStyle: StyleProp<TextStyle> = {backgroundColor: primary,width:125 }
const SaveButtonStyle: StyleProp<TextStyle> = { color: onPrimary,width:125 }
export default function ValidationComponent({show,setShow,loading,handler}:IValidationComponent){
    return(
        <Dialog visible={show} onDismiss={()=>setShow(false)}>
          <Dialog.Title>Save Changes</Dialog.Title>
          <Dialog.Content>
                        <View className='flex content-center flex-row justify-around '>{loading ? <ActivityIndicator /> : (
                    <View style={styles.item}>
                        <Button onPress={() => setShow(false)} style={ClosetButtonStyle}><Text>Close</Text></Button>
                        <Button onPress={handler} style={SaveButtonStyle}><Text >Save</Text></Button>
                            </View>
                        )}
                </View>
          </Dialog.Content>
        </Dialog>
    )
}
const styles = StyleSheet.create({
    item: { flexDirection: "row", justifyContent: "space-around" }
})