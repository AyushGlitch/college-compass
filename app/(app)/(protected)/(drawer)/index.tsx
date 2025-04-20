import { Link } from 'expo-router';
import React, { useEffect } from 'react';
import { Image, Pressable, Text, View } from 'react-native';

import { Container } from '~/components/Container';
import { FIREBASE_AUTH } from '~/firebaseConfig';
import UserProfileCard from '~/components/UserProfileCard';

import Animated, {
    useSharedValue,
    withRepeat,
    withTiming,
    useAnimatedStyle,
    Easing,
} from 'react-native-reanimated';

export default function Home() {
    const auth = FIREBASE_AUTH;

    // Features and their correct routes based on the given structure
    const features = [
        {
            name: 'Email Sorter',
            route: '/(app)/(protected)/(drawer)/emailSorter' as const,
            description: 'Organize your academic emails efficiently',
        },
        {
            name: 'PYQs',
            route: '/(app)/(protected)/(drawer)/Pyqs' as const,
            description: 'Access previous year question papers',
        },
        {
            name: 'Hostel Leave',
            route: '/(app)/(protected)/(drawer)/hostelLeave' as const,
            description: 'Manage your hostel leave applications',
        },
        {
            name: 'Attendance',
            route: '/(app)/(protected)/(drawer)/attendanceMarker' as const,
            description: 'Track your class attendance records',
        },
        {
            name: 'Colab Notes',
            route: '/(app)/(protected)/(drawer)/colabNotes' as const,
            description: 'Collaborative notes with classmates',
        },
    ];

    return (
        <Container>
            <View className="flex-1 gap-2 bg-licorice p-4">
                <View className="pointer-events-none absolute bottom-0 left-0 right-0 top-0">
                    {Array.from({ length: 20 }).map((_, i) => (
                        <Particle key={i} id={i} />
                    ))}
                </View>
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
                            <Pressable className="rounded-2xl border border-glass bg-licorice/90 p-4 shadow-neon-glow active:border-rose_pompadour active:bg-rose_pompadour-100">
                                <Text className="font-psemibold text-lg text-rose_pompadour">
                                    {feature.name}
                                </Text>
                                <Text className="text-sm text-white">
                                    {feature.description}
                                </Text>
                            </Pressable>
                        </Link>
                    ))}
                </View>

                {/* Hero Section */}
                <UserProfileCard user={auth.currentUser} />
            </View>
        </Container>
    );
}

const Particle = ({ id }: { id: number }) => {
    const progress = useSharedValue(0);
    const duration = 3000 + Math.random() * 5000;
    const size = Math.random() * 10 + 5;
    const startX = Math.random() * 100;
    const startY = Math.random() * 100;
    const xRange = Math.random() * 20 - 10;
    const yRange = Math.random() * 20 - 10;

    // Move animation setup to useEffect
    useEffect(() => {
        progress.value = withRepeat(
            withTiming(1, {
                duration,
                easing: Easing.linear,
            }),
            -1, // infinite loop
            true // reverse animation
        );
    }, []); // Empty dependency array means this runs once on mount

    const animatedStyle = useAnimatedStyle(() => {
        return {
            left: `${startX + progress.value * xRange}%`,
            top: `${startY + progress.value * yRange}%`,
            opacity: 0.2 + progress.value * 0.6,
            width: size,
            height: size,
        };
    });

    return (
        <Animated.View
            className="absolute rounded-full bg-rose_pompadour"
            style={animatedStyle}
        />
    );
};
