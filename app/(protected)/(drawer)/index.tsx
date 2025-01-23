import { Stack } from 'expo-router';
import React from 'react';
import { View } from 'react-native';

import { Container } from '~/components/Container';

export default function Home() {
  return (
    <>
      <Stack.Screen options={{ title: 'Home', navigationBarColor: 'black' }} />
      <Container>
        <View className="h-screen w-screen bg-red-500" />
      </Container>
    </>
  );
}
