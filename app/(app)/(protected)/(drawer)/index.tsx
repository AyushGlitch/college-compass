import AsyncStorage from '@react-native-async-storage/async-storage';
import Drawer from 'expo-router/drawer';
import { useRouter } from 'expo-router';
import { signOut } from 'firebase/auth';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import { Container } from '~/components/Container';
import { FIREBASE_AUTH } from '~/firebaseConfig';

export default function Home() {
    const auth = FIREBASE_AUTH;
    const router = useRouter();

    // Features and their correct routes based on the given structure
    const features = [
        { name: 'Email Sorter', route: '/(app)/(protected)/(drawer)/emailSorter' as const },
        { name: 'PYQs', route: '/(app)/(protected)/(drawer)/pyq' as const },
        { name: 'Hostel Leave', route: '/(app)/(protected)/(drawer)/hostelLeave' as const },
        { name: 'Attendance', route: '/(app)/(protected)/(drawer)/attendance' as const },
        { name: 'Colab Notes', route: '/(app)/(protected)/(drawer)/colabNotes' as const },
    ];

    return (
        <>
            <Drawer.Screen
                options={{
                    headerTitle: 'Dashboard',
                    headerTitleStyle: { fontSize: 20, fontWeight: 'bold', color: '#333' },
                    headerRight: () => (
                        <TouchableOpacity
                            className="mr-4 rounded-lg bg-cyan-600 px-4 py-2"
                            onPress={() => {
                                const storage_keys = ['accessToken', 'refreshToken', 'expiryTime'];
                                AsyncStorage.multiRemove(storage_keys);
                                signOut(auth);
                            }}>
                            <Text className="font-semibold text-white">Sign Out</Text>
                        </TouchableOpacity>
                    ),
                }}
            />
            <Container>
                <View className="flex-1 items-center justify-center bg-gray-100 p-6">
                    <Text className="mb-4 text-2xl font-bold text-gray-800">
                        Welcome to Your Dashboard 🎉
                    </Text>
                    <Text className="text-center text-gray-600">
                        Access all features easily from the menu. Manage emails, sort past
                        questions, mark attendance, apply for hostel leave, and collaborate on
                        notes!
                    </Text>

                    <View className="mt-6 w-full flex-row flex-wrap justify-center gap-4">
                        {features.map(({ name, route }) => (
                            <TouchableOpacity
                                key={route}
                                className="w-40 rounded-lg bg-blue-600 p-4 shadow-lg"
                                onPress={() => router.push(route as any)}>
                                <Text className="text-center text-lg font-semibold text-white">
                                    {name}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>
            </Container>
        </>
    );
}
