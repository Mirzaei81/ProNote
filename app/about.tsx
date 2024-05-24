import { useAssets } from "expo-asset";
import { Image } from "expo-image";
import { View } from "react-native";
import { Text } from "react-native-paper";

const AboutScreen = () => {
    const assets = useAssets([require("../assets/images/logo.png")])
    return (
      <View >
        <Image contentFit="cover" className="text-white" source={assets[0]}  alt="proNote"/>
        <Text>about us</Text>
  
        <Text>
          Welcome to our amazing note-taking app! We are dedicated to helping you stay
          organized and productive. With our app, you can easily create, edit, and manage your
          notes on the go.
        </Text>

        <Text >
          Follow us on social media for updates and tips on getting the most out of our app.
        </Text>
  
        <Text>
          Thank you for choosing our app for your note-taking needs!
        </Text>
        
      </View>
    );
  };