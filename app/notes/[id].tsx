import { useLocalSearchParams } from "expo-router";
import { View } from "react-native";
import { Text } from "react-native-paper";

export default function Page(){
    const { title } = useLocalSearchParams();

    return(
        <View>
            <Text>{title}</Text>
        </View>
    )
}