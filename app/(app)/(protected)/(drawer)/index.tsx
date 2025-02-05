import AsyncStorage from '@react-native-async-storage/async-storage';
import Drawer from 'expo-router/drawer';
import { signOut } from 'firebase/auth';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import { Container } from '~/components/Container';
import { FIREBASE_AUTH } from '~/firebaseConfig';

export default function Home() {
    const auth = FIREBASE_AUTH;

    return (
        <>
            <Drawer.Screen
                options={{
                    headerRight: () => (
                        <TouchableOpacity
                            className="px-4"
                            onPress={() => {
                                const storage_keys = ['accessToken', 'refreshToken', 'expiryTime'];
                                AsyncStorage.multiRemove(storage_keys);
                                signOut(auth);
                            }}>
                            <Text className="text-cyan-600">Sign Out</Text>
                        </TouchableOpacity>
                    ),
                }}
            />
            <Container>
                <View className="h-screen w-screen bg-red-500"></View>
            </Container>
        </>
    );
}
