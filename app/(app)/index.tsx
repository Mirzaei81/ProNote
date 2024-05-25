import {   StyleSheet, useColorScheme } from 'react-native';
import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  View,
  FlatList,
  StatusBar,
} from 'react-native';
import {  useSession } from '@/hooks/useSession';
import { Image } from 'expo-image';
import {  Button, Dialog, FAB, Menu, Portal, Searchbar, Text } from 'react-native-paper';
import { useRouter } from 'expo-router';
import { ThemedView } from '@/components/ThemedView';
import ShimmerPlaceHolder from 'react-native-shimmer-placeholder'
import { LinearGradient } from 'expo-linear-gradient';
import { Colors, darkLinear, lightLinear, location } from '@/constants/Colors';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getNotes } from '@/utils/api';
import { note, noteData } from '@/types';
import { useAssets } from 'expo-asset';
import { ThemeEditor } from '@/components/ThemeEditor';

const ItemColors = ['#543C24','#E6C7BE','#C96A53','#9C8C74']
const Item = ({ title, idx, onPress }: ItemProps) => {
  const [color,setColor] = useState(Colors.light.background)
  useEffect(() => {
    setColor(ItemColors[idx%(ItemColors.length+1)])
  }, [])
  return (
    <Button key={idx} buttonColor={color} className="mb-4" contentStyle={styles.item} mode="contained" onPress={onPress}> 
      <Text className='text-center'>
        {title}
      </Text>
    </Button>
  )
};

type ItemProps = {idx:number,title: string,onPress:(()=>void) | undefined}
export default function HomeScreen() {
  const assets = useAssets([require("@/assets/images/Create.svg")])
  const router = useRouter()
  const colorScheme  = useColorScheme()
  const ShimmerGrad = colorScheme =="dark"?darkLinear:lightLinear
  const {session,isLoading:LoadingSession}  = useSession()
  const [searchQuery, setSearchQuery] = React.useState('');
  const [data,setData] = React.useState<note[]>([])
  const [filtredData,setFilterdData] = React.useState<note[]>(data)
  const [state, setState] = React.useState({ open: false });
  const [DialogVisible,setDialogVisible] =  useState(false)

  const onStateChange = ({ open }:{open:boolean}) => setState({ open });

  const { open } = state;

  const {data:Notes,isLoading} = useQuery<noteData>({
    queryKey:[session!],
    queryFn:()=>getNotes(session!),
})


  useEffect(()=>{
    if(Notes){
      setData(Notes!.data)
      setFilterdData(Notes!.data)
    }
  },[Notes])


  const onChangeSearch = (query:string) =>{
    setSearchQuery(query)
    if(data){
      const filtredData = data.filter((val) => val.title.toLocaleLowerCase().includes(query.toLowerCase()))
      setFilterdData(filtredData)
    }
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
    router.setParams({ name: 'Updated' });
    router.push({pathname:`/${title}`,params:{name:"updated"}})
  }
  if ((isLoading && !LoadingSession) || data && data.length==0){
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
      {/*@ts-expect-error */}
          {filtredData.length===0?<Image contentFit="cover" source={assets[0]} alt='Create First'/>:
          <FlatList
             showsVerticalScrollIndicator={false}
            data={filtredData}
            renderItem={({ item,index }) => <Item idx={index} title={item.title} onPress={()=>directToEdit(item.title)}/>}
            keyExtractor={item => item.id.toString()}
          />}
        </SafeAreaView>
        <Portal>
        <Dialog visible={DialogVisible} onDismiss={()=>setDialogVisible(false)}>
          <Dialog.Title>Change theme</Dialog.Title>
          <Dialog.Content>
            <ThemeEditor />
          </Dialog.Content>
        </Dialog>
        <FAB.Group
          open={open}
          visible
          icon={open ? 'cog' : 'plus'}
          actions={[
            {
              icon: 'palette',
              label: 'palette',
              onPress: () => {setDialogVisible(true)},
            },
            {
              icon: 'note-plus',
              label: 'Create Note',
              onPress: () => router.push("/edit"),
            },
          ]}
          onStateChange={onStateChange}
        />
      </Portal>
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
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
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