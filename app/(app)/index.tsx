import {  GestureResponderEvent, StyleSheet } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import React from 'react';
import {
  SafeAreaView,
  View,
  FlatList,
  Text,
  StatusBar,
} from 'react-native';
import { SessionProvider, useSession } from '@/hooks/useSession';
import { Image } from 'expo-image';
import { Button } from 'react-native-paper';
import { Link } from 'expo-router';

const Item = ({title,onPress}: ItemProps) => (
  <Button mode="contained"  onPress={onPress}>{title}</Button>
);

type ItemProps = {title: string,onPress:((e: GestureResponderEvent) => void) | undefined}

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'First Item',
  },
  {
    id: '3ac68a1c-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Second Item',
  },
  {
    id: '58694avf-3da1-471f-bd96-145571e29d72',
    title: 'Third Item',
  },
  {
    id: '58694a;f-3da1-471f-bd96-145571e29d72',
    title: 'forth Item',
  },
  {
    id: '58694akf-3da1-471f-bd96-145571e29d72',
    title: 'fifth Item',
  },
  {
    id: '58694a03-3da1-471f-bd96-145571e29d72',
    title: 'Third Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Item',
  },
  {
    id: '58694a0dv-3da1-471f-bd96-145571e29d72',
    title: 'Third Item',
  },
  {
    id: '58694a0f-31a1-471f-bd96-145571e29d72',
    title: 'Third Item',
  },
  {
    id: '58694a0f-3da1-431f-bd96-145571e29d72',
    title: 'nth Item',
  }
];



export default function HomeScreen() {
  const {session,isLoading}  = useSession()
  if (isLoading){
    return(
      <View className='bg-[#523E27]'>
        <Image source="@/assets/images/logo.png" alt='proNote'/>
      </View>
    )
  }
  return (
      <ThemedView className='flex flex-row' >
        <View >
          <Text > hello World</Text>
        </View>
        <SafeAreaView style={styles.container}>
          <FlatList
            data={DATA}
            renderItem={({ item }) => <Item title={item.title} />}
            keyExtractor={item => item.id}
          />
        </SafeAreaView>
      <Link href="/login" asChild>
        <Button mode="contained" dark>Login</Button>
      </Link>
      </ThemedView>
  );
}

const styles = StyleSheet.create({
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    borderRadius: 10,
    left: 0,
    position: 'absolute',
  },
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    backgroundColor: '#f9c2ff',
    borderRadius: 20,
    padding: 20,
    marginVertical: 10,
    marginHorizontal: 32,
  },
  title: {
    fontSize: 32,
    marginLeft:70,
  },
});