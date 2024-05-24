import {   StyleSheet, useColorScheme } from 'react-native';
import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  FlatList,
  StatusBar,
} from 'react-native';
import {  useSession } from '@/hooks/useSession';
import { Image } from 'expo-image';
import {  Button, Searchbar, Text } from 'react-native-paper';
import {  router } from 'expo-router';
import { DATA } from "@/constants/data"
import { ThemedView } from '@/components/ThemedView';
import ShimmerPlaceHolder from 'react-native-shimmer-placeholder'
import { LinearGradient } from 'expo-linear-gradient';
import { darkLinear, lightLinear, location } from '@/constants/Colors';

const ItemColors = ['#543C24','#E6C7BE','#C96A53','#9C8C74']
const Item = ({title,idx,onPress}: ItemProps) =>  (
  <Button buttonColor={ItemColors[idx % ItemColors.length]} className="mb-4" contentStyle={styles.item} mode="contained"  onPress={onPress}>
   <Text className='text-center'>
      {title}
    </Text> 
    </Button>
);

type ItemProps = {idx:number,title: string,onPress:(()=>void) | undefined}
export default function HomeScreen() {
  const colorScheme  = useColorScheme()
  const ShimmerGrad = colorScheme =="dark"?darkLinear:lightLinear

  const {session,isLoading:LoadingSession}  = useSession()
  const [isLoading,setIsLoading] = useState(false)
  const [searchQuery, setSearchQuery] = React.useState('');

  const [data,setData] = React.useState(DATA)
  const onChangeSearch = (query:string) =>{
    setSearchQuery(query)
    const filtredData = DATA.filter((val)=>val.title.toLocaleLowerCase().includes(query.toLowerCase()))
    setData(filtredData)
  } 
  if (LoadingSession && !isLoading){
    return(
      <View className='bg-[#523E27]'>
        <Image source="@/assets/images/logo.png" alt='proNote'/>
        <Text>Hello</Text>
      </View>
    )
  }
  const directToEdit = (title:string)=>{
      router.push(`/${title}`)
  }
  if (isLoading && !LoadingSession){
    return(
      <ThemedView className="h-full  flex flex-col justify-center px-10" >
          <Searchbar 
            placeholder='Search'
            className='my-2'
            placeholderTextColor="black"
            value={searchQuery}
            />
      {[0,1,2,3,4,5,6,7].map((_,idx)=>(
        <ShimmerPlaceHolder key={idx}shimmerStyle={styles.shimmer} shimmerColors={ShimmerGrad} location={location} visible={false} LinearGradient={LinearGradient}/>
      ))}
      </ThemedView>
    )
  }
  return (
      <ThemedView className="h-full flex flex-col justify-center px-10" >
        <ThemedView style={styles.TopBar}>
          <Searchbar 
            placeholder='Search'
            className='my-2'
            onChangeText={onChangeSearch}
            placeholderTextColor="black"
            value={searchQuery}
            />
            </ThemedView>
        <SafeAreaView className='flex flex-1'>
          <FlatList
             showsVerticalScrollIndicator={false}
            data={data}
            renderItem={({ item,index }) => <Item idx={index} title={item.title} onPress={()=>directToEdit(item.title)}/>}
            keyExtractor={item => item.id}
          />
        </SafeAreaView>
      </ThemedView>
  );
}

const styles = StyleSheet.create({
  TopBar: {
    marginTop: StatusBar.currentHeight || 0,
  },
  textStyle:{
    color:"black"
  },
  item:{
    width : '100%',
    height: 80,
    flex:1,
    textAlign:"center",
    display:"flex",
    justifyContent:"center",
    alignContent:"center",
    alignItems:"center"

  },
  shimmer:{
    marginTop:10,
    width:"100%",
    height:80,
    borderRadius:6
  }
});