import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import {Image} from "expo-image"
import { View } from 'react-native';

export default function Login() {
  return (
      <ThemedView className="flex items-center justify-center" >
        <Image source="@/assets/images/logo.png"  alt="proNote"/>
        <View className=''>
        </View>
      </ThemedView>
  );
}
