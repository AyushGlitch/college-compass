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
                    headerTitle: "Dashboard",
                    headerTitleStyle: { fontSize: 20, fontWeight: "bold", color: "#333" },
                    headerRight: () => (
                        <TouchableOpacity
                            className="mr-4 rounded-lg bg-cyan-600 px-4 py-2"
                            onPress={() => {
                                const storage_keys = ['accessToken', 'refreshToken', 'expiryTime'];
                                AsyncStorage.multiRemove(storage_keys);
                                signOut(auth);
                            }}>
                            <Text className="text-white font-semibold">Sign Out</Text>
                        </TouchableOpacity>
                    ),
                }}
            />
            <Container>
                <View className="flex-1 items-center justify-center bg-gray-100 p-6">
                    <Text className="mb-4 text-2xl font-bold text-gray-800">Welcome to Your Dashboard 🎉</Text>
                    <Text className="text-gray-600 text-center">
                        Access all features easily from the menu. Manage emails, sort past questions, mark attendance, 
                        apply for hostel leave, and collaborate on notes!
                    </Text>

                    <View className="mt-6 w-full flex-row flex-wrap justify-center gap-4">
                        {["Email Sorter", "PYQs", "Hostel Leave", "Attendance", "Colab Notes"].map((feature) => (
                            <TouchableOpacity
                                key={feature}
                                className="w-40 rounded-lg bg-blue-600 p-4 shadow-lg"
                                onPress={() => alert(`Opening ${feature}`)}
                            >
                                <Text className="text-center text-lg font-semibold text-white">{feature}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>
            </Container>
        </>
    );
}
