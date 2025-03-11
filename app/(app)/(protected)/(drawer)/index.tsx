import AsyncStorage from '@react-native-async-storage/async-storage';
import Drawer from 'expo-router/drawer';
import { Link, useRouter } from 'expo-router';
import { signOut } from 'firebase/auth';
import React from 'react';
import { Pressable, Text, TouchableOpacity, View } from 'react-native';

import { Container } from '~/components/Container';
import { FIREBASE_AUTH } from '~/firebaseConfig';

export default function Home() {
    const auth = FIREBASE_AUTH;
    const router = useRouter();

    // Features and their correct routes based on the given structure
    const features = [
        {
            name: 'Email Sorter',
            route: '/(app)/(protected)/(drawer)/emailSorter' as const,
        },
        { name: 'PYQs', route: '/(app)/(protected)/(drawer)/Pyqs' as const },
        {
            name: 'Hostel Leave',
            route: '/(app)/(protected)/(drawer)/hostelLeave' as const,
        },
        {
            name: 'Attendance',
            route: '/(app)/(protected)/(drawer)/attendanceMarker' as const,
        },
        {
            name: 'Colab Notes',
            route: '/(app)/(protected)/(drawer)/colabNotes' as const,
        },
    ];

    return (
        <>
            <Drawer.Screen
                options={{
                    headerTitle: 'Dashboard',
                    headerRight: () => (
                        <TouchableOpacity
                            className="px-4"
                            onPress={() => {
                                const storage_keys = [
                                    'accessToken',
                                    'refreshToken',
                                    'expiryTime',
                                ];
                                AsyncStorage.multiRemove(storage_keys);
                                signOut(auth);
                            }}>
                            <Text className="font-psemibold text-licorice-600">
                                Sign Out
                            </Text>
                        </TouchableOpacity>
                    ),
                }}
            />
            <Container>
                <View className="flex-1 justify-center gap-6 bg-licorice p-4">
                    {/* Hero Section */}
                    <View className="mb-6 items-center justify-center gap-4">
                        <Text className="text-3xl font-extrabold text-rose_pompadour">
                            Welcome to Your Dashboard 🎉
                        </Text>
                        <Text className="text-center text-yellow-400">
                            {auth.currentUser?.displayName ?? 'No user found'}
                        </Text>
                        <Text className="max-w-xs text-center text-white">
                            Easily manage your emails, mark attendance, apply
                            for hostel leave, and collaborate on notes!
                        </Text>
                    </View>

                    {/* Feature Grid */}
                    <View className="grid grid-cols-2 gap-4">
                        {features.map((feature, idx) => (
                            <Link
                                href={feature.route as any}
                                key={`${feature.name}-${idx}`}
                                asChild>
                                <Pressable className="rounded-2xl border border-glass bg-black p-4 shadow-neon-glow active:border-rose_pompadour active:bg-rose_pompadour-100">
                                    <Text className="font-psemibold text-lg text-rose_pompadour">
                                        {feature.name}
                                    </Text>
                                    <Text className="text-sm text-white">
                                        This is a small feature description.
                                    </Text>
                                </Pressable>
                            </Link>
                        ))}
                    </View>
                </View>
            </Container>
        </>
    );
}
