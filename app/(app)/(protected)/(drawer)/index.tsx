import { Link } from 'expo-router';
import React from 'react';
import { Image, Pressable, Text, View } from 'react-native';

import { Container } from '~/components/Container';
import { FIREBASE_AUTH } from '~/firebaseConfig';
import UserProfileCard from '~/components/UserProfileCard';

export default function Home() {
    const auth = FIREBASE_AUTH;

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
            {/* <Drawer.Screen
                options={{
                    headerTitle: 'Dashboard',
                    headerRight: () => (
                        <TouchableOpacity
                            className="px-4"
                            onPress={() => firebaseSignOut()}>
                            <Text className="font-psemibold text-folly">
                                Sign Out
                            </Text>
                        </TouchableOpacity>
                    ),
                }}
            /> */}
            <Container>
                <View className="flex-1 gap-2 bg-licorice p-4">
                    {/* Feature Grid */}
                    <View className="absolute inset-x-0 items-center justify-center">
                        <Image
                            source={require('assets/icons/text-logo.png')}
                            resizeMode="contain"
                            style={{
                                tintColor: 'white',
                                width: 150,
                                height: 150,
                            }}
                        />
                    </View>
                    <View className="grid flex-1 grid-cols-2 justify-center gap-4">
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

                    {/* Hero Section */}
                    <UserProfileCard user={auth.currentUser} />
                </View>
            </Container>
        </>
    );
}
