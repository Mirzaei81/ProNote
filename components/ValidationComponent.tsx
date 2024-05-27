import { StyleSheet } from "react-native";
import { View } from "react-native";
import { ActivityIndicator, Dialog, useTheme,Button,Text } from "react-native-paper";

export interface IValidationComponent{
    setShow:(value: React.SetStateAction<boolean>) => void,
    loading: boolean,
    show:boolean,
    handler:()=>void
}
export default function ValidationComponent({show,setShow,loading,handler}:IValidationComponent){
    const theme  =  useTheme()
    return(
        <Dialog visible={show} onDismiss={()=>setShow(false)}>
          <Dialog.Title>Save Changes</Dialog.Title>
          <Dialog.Content>
                        <View className='flex content-center flex-row justify-around '>{loading ? <ActivityIndicator /> : (
                    <View style={styles.item}>
                        <Button onPress={() => setShow(false)} style={{ backgroundColor: theme.colors.error, width: 125 }}><Text>Close</Text></Button>
                        <Button onPress={handler} style={{ backgroundColor: theme.colors.primary, width: 125 }}><Text >Save</Text></Button>
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