import CustomText from '@/components/Text';
import { useAssets } from 'expo-asset';
import { Image } from 'expo-image';
import { usePathname, Link, Stack } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';


export default function NotFoundScreen() {
  const assets = useAssets([require("@/assets/images/Create.svg")])
  const path = usePathname()
  
  return (
    <>
      <Stack.Screen options={{ title: 'Oops!' }} />
      <View style={styles.container}>
      {/*@ts-expect-error */}
        <Image source={assets[0]} alt='NotFound' contentFit="cover"/>
        <Text >This screen doesn't exist.</Text>
        <CustomText>Current Path {path}</CustomText>
        <Link href="/" style={styles.link}>
          <Text >Go to home screen!</Text>
        </Link>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
});
