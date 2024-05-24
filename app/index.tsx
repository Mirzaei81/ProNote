import {   StyleSheet, useColorScheme } from 'react-native';
import React from 'react';
import {
  SafeAreaView,
  View,
  FlatList,
  StatusBar,
} from 'react-native';
import {  useSession } from '@/hooks/useSession';
import { Image } from 'expo-image';
import { ActivityIndicator, Button, Searchbar, Text, useTheme } from 'react-native-paper';
import { Link, router } from 'expo-router';
import { DATA } from "@/constants/data"
import { ThemedView } from '@/components/ThemedView';

const Colors = ['#543C24','#E6C7BE','#C96A53','#9C8C74']
const Item = ({title,idx,onPress}: ItemProps) =>  (
  <Button buttonColor={Colors[idx % Colors.length]} className="mb-4" contentStyle={styles.item} mode="contained"  onPress={onPress}>
   <Text className='text-center'>
      {title}
    </Text> 
    </Button>
);

type ItemProps = {idx:number,title: string,onPress:(()=>void) | undefined}

export default function HomeScreen() {
  const colorScheme  = useColorScheme()
  const {session,isLoading}  = useSession()
  const [searchQuery, setSearchQuery] = React.useState('');
  const [data,setData] = React.useState(DATA)

  const onChangeSearch = (query:string) =>{
    setSearchQuery(query)
    const filtredData = DATA.filter((val)=>val.title.toLocaleLowerCase().includes(query.toLowerCase()))
    setData(filtredData)
  } 
  if (isLoading){
    return(
      <View className='bg-[#523E27]'>
        <Image source="@/assets/images/logo.png" alt='proNote'/>
      </View>
    )
  }
  const directToEdit = (title:string)=>{
      router.push(`/notes/${title}`)
  }
  if (isLoading){
    return(
      <ThemedView>
        <ActivityIndicator/>
      </ThemedView>
    )
  }
  return (
      <ThemedView className="h-full flex flex-col justify-center px-10" >
        <ThemedView style={styles.TopBar}>
          <Searchbar 
            placeholder='Search'
            className='mb-2'
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
      <Link href="/Login" asChild>
        <Button className="" mode="contained" dark>Login</Button>
      </Link>
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

  }
});