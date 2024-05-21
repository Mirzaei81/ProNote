import { Image, StyleSheet, Platform } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import React from 'react';
import {
  SafeAreaView,
  View,
  FlatList,
  Text,
  StatusBar,
} from 'react-native';

const Item = ({title}: ItemProps) => (
  <View style={styles.item}>
    <Text style={styles.title}>{title}</Text>
  </View>
);

type ItemProps = {title: string};

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
  return (
      <ThemedView style={styles.titleContainer} >
        <View className=''></View>
        <SafeAreaView style={styles.container}>
          <FlatList
            data={DATA}
            renderItem={({ item }) => <Item title={item.title} />}
            keyExtractor={item => item.id}
          />
        </SafeAreaView>
      </ThemedView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
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