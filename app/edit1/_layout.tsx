import { useStorageState } from "@/hooks/useStorageState";
import {  Slot, Stack } from "expo-router";
export default function RootLayout() {
  const [[LoadingSourceColor,sourceColor]] = useStorageState('sourceColor');
  return (
    <Stack>
      <Stack.Screen name="index"/>
    </Stack>
  )
}