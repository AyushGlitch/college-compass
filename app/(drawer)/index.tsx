import { Stack } from 'expo-router';
import { SafeAreaView, View } from 'react-native';

import { Container } from '~/components/Container';

export default function Home() {
  return (
    <>
      <Stack.Screen options={{ title: 'Home' }} />
      <Container>
        <SafeAreaView className='bg-red-500 h-screen w-screen' />
      </Container>
    </>
  );
}
