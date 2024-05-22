import {   StyleSheet } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import React from 'react';
import {
  SafeAreaView,
  View,
  FlatList,
  Text,
  StatusBar,
} from 'react-native';
import {  useSession } from '@/hooks/useSession';
import { Image } from 'expo-image';
import { Button, Searchbar } from 'react-native-paper';
import { Link, router } from 'expo-router';
import {DATA} from "@/constants/data"

const Item = ({title,onPress}: ItemProps) => (
  <Button className='mb-4' mode="contained"  onPress={onPress}>{title}</Button>
);

type ItemProps = {title: string,onPress:(()=>void) | undefined}

export default function HomeScreen() {
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
      router.replace(`/${title}`)
  }
  return (
      <ThemedView className='h-screen flex flex-col justify-center px-10' >
        <View style={styles.TopBar}>
          <Text className='text-white'>Notes</Text>
          <Searchbar 
            placeholder='Search'
            onChangeText={onChangeSearch}
            placeholderTextColor="black"
            value={searchQuery}
            />
            </View>
        <SafeAreaView className='flex flex-1'>
          <FlatList
             showsVerticalScrollIndicator={false}
            data={data}
            renderItem={({ item }) => <Item title={item.title} onPress={()=>directToEdit(item.title)}/>}
            keyExtractor={item => item.id}
          />
        </SafeAreaView>
      <Link href="/Login" asChild>
        <Button className="mt-4" mode="contained" dark>Login</Button>
      </Link>
      </ThemedView>
  );
}

const styles = StyleSheet.create({
  TopBar: {
    marginTop: StatusBar.currentHeight || 0,
  },
  textStyle:{
    color:"black"
  }
});