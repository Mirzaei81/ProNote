import { useSession } from '@/hooks/useSession';
import { Stack } from 'expo-router';

export default function RootLayout() {
  const {session,isLoading} = useSession()
  if (isLoading){

  }
  return (
    <Stack />
  );
}