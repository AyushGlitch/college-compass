import { Stack } from 'expo-router';
import { signOut } from 'firebase/auth';
import React from 'react';
import { View } from 'react-native';

import { Container } from '~/components/Container';
import CustomButton from '~/components/CustomButton';
import { FIREBASE_AUTH } from '~/firebaseConfig';

export default function Home() {
    const auth = FIREBASE_AUTH;

    return (
        <>
            <Stack.Screen options={{ title: 'Home', navigationBarColor: 'black' }} />
            <Container>
                <View className="h-screen w-screen bg-red-500">
                    <CustomButton title="Signout" handlePress={() => signOut(auth)} />
                </View>
            </Container>
        </>
    );
}
