import {   StyleSheet, useColorScheme } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import {
  SafeAreaView,
  View,
  FlatList,
  StatusBar,
} from 'react-native';
import {  useSession } from '@/hooks/useSession';
import { Image } from 'expo-image';
import {   Dialog, FAB, Portal, Searchbar, Snackbar, Text,useTheme } from 'react-native-paper';
import { Link, useRouter } from 'expo-router';
import { ThemedView } from '@/components/ThemedView';
import ShimmerPlaceHolder from 'react-native-shimmer-placeholder'
import { LinearGradient } from 'expo-linear-gradient';
import {  darkLinear, lightLinear, location } from '@/constants/Colors';
import { useQuery } from '@tanstack/react-query';
import { getNotes } from '@/utils/api';
import { note, noteData } from '@/types';
import { useAssets } from 'expo-asset';
import { ThemeEditor } from '@/components/ThemeEditor';
import { rotation} from "simpler-color"
import { Item } from '@/components/item';
import { useThemeColor } from '@/hooks/useThemeColor';
import CustomText from '@/components/Text';
import { FontSizeProviderContext } from '@/hooks/materialThemeProvider';
import { FontAwesome } from '@expo/vector-icons';

export default function HomeScreen() {
  const mainThem = useTheme()
  const fontSize = useContext(FontSizeProviderContext).fontSize

  const colorError = useThemeColor({}, 'error');
  const  onError = useThemeColor({}, 'onError');
  const  surfaceColor = useThemeColor({}, "onBackground");

  const colorScheme  = useColorScheme()
  const ShimmerGrad = colorScheme =="dark"?darkLinear:lightLinear

  const assets = useAssets([require("@/assets/images/Create.svg")])
  const router = useRouter()

  const {session,isLoading:LoadingSession}  = useSession()

  const [searchQuery, setSearchQuery] = React.useState('');
  const [data,setData] = React.useState<note[]>([])
  const [filtredData,setFilterdData] = React.useState<note[]>([])
  const [state, setState] = React.useState({ open: false });
  const [DialogVisible,setDialogVisible] =  useState(false)
  const [FabVisible ,setFabVisible] = useState(true)
  const [ItemsColorSCheme,setColorScheme] = useState<string[]>([])

  const [error,setError] = useState("")  //Error Handling
  const [visible,setVisible] = useState(false)
  const onStateChange = ({ open }:{open:boolean}) => setState({ open });


  const {data:Notes,isLoading} = useQuery<noteData>({
    queryKey:[session!],
    queryFn:()=>getNotes(session!),
    retry:3
})

  useEffect(() => {
    let LocalColorScheme = []
    for (let i = 0; i < 6; i++) {
      LocalColorScheme.push(rotation(mainThem.colors.primary, i * 50))
    }
    setColorScheme([...LocalColorScheme])
  }, [mainThem])

  useEffect(() => {
    if (Notes) {
      if (Object.hasOwn(Notes, "error")) {
        //@ts-expect-error
        setError(Notes.error.toString())
        setVisible(true)
      }
      else {
        setData(Notes!.data)
        setFilterdData(Notes!.data)
      }
    }
  }, [Notes])

  const onChangeSearch = (query: string) => {
    console.log(query)
    setSearchQuery(query)

    if (data) {
      const filtredData = data.filter((val) => val.title.toLocaleLowerCase().includes(query.toLowerCase()))
      setFilterdData(filtredData)
    }
  }
  if (LoadingSession && !isLoading ) {
    return (
      <View className='h-full flex items-center content-center bg-[rgb(82,62,39)]'>
        <Image source="@/assets/images/logo.png" alt='proNote' />
      </View>
    )
  }
  const directToEdit = (title: string) => {
    router.setParams({ name: 'Updated' });
    router.push({ pathname: `/${title}`, params: { name: "updated" } })
  }
  if ((isLoading && !LoadingSession)) {
    return (
      <ThemedView className="h-full  flex flex-col justify-center px-10" >
        <Searchbar
          placeholder='Search'
          className='my-2'
          onChangeText={(s)=>{onChangeSearch(s),console.log(s)}}
          value={searchQuery}
        />
        {[0, 1, 2, 3, 4, 5, 6, 7].map((_, idx) => (
          <ShimmerPlaceHolder key={idx} shimmerStyle={styles.shimmer} shimmerColors={ShimmerGrad} location={location} visible={false} LinearGradient={LinearGradient} />
        ))}
      </ThemedView>
    )
  }
  return (
    <ThemedView style={styles.TopBar} className="h-full flex flex-col justify-center px-10" >
      <View className='flex flex-row mt-5'>
        <FontAwesome style={{alignSelf:"center",marginRight:10}} name='sign-out' size={24} color={surfaceColor} onPress={() => {
           router.push("/signOut");console.log("routing") }} />
        <Searchbar
          placeholder='Search'
          className='my-2 grow'
          onChangeText={onChangeSearch}
          style={{fontSize:fontSize}}
          placeholderTextColor={surfaceColor}
          value={searchQuery}
        />
      </View>
      <SafeAreaView className='flex flex-1'>
        {(!filtredData || filtredData.length === 0) ? (<View className='flex text-center align-center mt-40  justify-center'>
          {/*@ts-expect-error */}
          <Image contentFit="cover" style={styles.image} source={assets[0]} alt='Create First' />
              <Link href="/create" style={{fontSize:fontSize}} asChild>
              <CustomText className='text-center'>Create New Note +</CustomText>
             </Link>
        </View>) :
          <FlatList
            contentContainerStyle={{ gap: 10 }}
            className='mb-20'
            showsVerticalScrollIndicator={false}
            data={filtredData}
            renderItem={({ item, index }) => <Item colorScheme={[...ItemsColorSCheme]} idx={index} title={item.title} onPress={() => directToEdit(item.title)} />}
            keyExtractor={item => item.id.toString()}
          />}
      </SafeAreaView>
      <Portal>
        <Dialog visible={DialogVisible} onDismiss={() => setDialogVisible(false)}>
          <Dialog.Title><CustomText>Change theme</CustomText></Dialog.Title>
          <Dialog.Content>
            <ThemeEditor />
          </Dialog.Content>
        </Dialog>
        <FAB.Group
          open={state.open}
          visible={FabVisible}
          icon={state.open ? 'cog' : 'plus'}
          actions={[
            {
              icon: 'palette',
              label: 'Palette',
              onPress: () => { setDialogVisible(true)},
            },
            {
              icon: 'note-plus',
              label: 'Create Note',
              onPress: () =>router.push("/create"),
            },
            {
              icon: 'information-outline',
              label: "About Us ",
              onPress: () => router.replace("/about")
            }
          ]}
          onStateChange={onStateChange}
        />
        <Snackbar style={{ backgroundColor: colorError }} duration={5000} onDismiss={() => setVisible(false)} visible={visible}>
          <CustomText style={{color:onError}}>{error}</CustomText>
        </Snackbar>
      </Portal>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  TopBar: {
    marginTop: StatusBar.currentHeight || 0,
  },
  textStyle: {
    color: "black"
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
  image: {
    width: 320,
    height: 320,
    borderRadius: 20,
  },
  shimmer: {
    marginTop: 10,
    width: "100%",
    height: 80,
    borderRadius: 6
  }
});