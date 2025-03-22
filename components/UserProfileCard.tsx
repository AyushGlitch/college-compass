import { View, Text, Image } from 'react-native';
import React from 'react';
import { User } from 'firebase/auth';
import Animated, {
    runOnJS,
    useAnimatedStyle,
    useSharedValue,
    withSpring,
} from 'react-native-reanimated';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { firebaseSignOut } from '~/utils/authUtils';

const UserProfileCard = ({ user }: { user: User | null }) => {
    const translateX = useSharedValue(0); // Tracks the horizontal swipe distance
    const SWIPE_THRESHOLD = 100; // Distance required to trigger sign-out

    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{ translateX: translateX.value }],
        };
    });

    const panGesture = Gesture.Pan()
        .onChange((e) => {
            if (e.translationX > SWIPE_THRESHOLD) {
                translateX.value =
                    SWIPE_THRESHOLD + (e.translationX - SWIPE_THRESHOLD) / 20;
            } else {
                translateX.value = Math.max(0, e.translationX);
            }
            // console.log(translateX.value);
        })
        .onEnd((e) => {
            translateX.value = withSpring(0, {
                mass: 0.3,
                damping: 5,
            });
            if (e.translationX > SWIPE_THRESHOLD) {
                runOnJS(firebaseSignOut)();
            }
        });

    if (!user) {
        return (
            <View className="bg-white">
                <Text>No user is currently logged in.</Text>
            </View>
        );
    }

    return (
        <View className="elevation-sm max-h-20 flex-row items-center gap-4 overflow-hidden rounded-full border border-glass p-2 shadow-neon-glow">
            <GestureDetector gesture={panGesture}>
                <Animated.View
                    className="z-10 h-full flex-1 items-center justify-center rounded-full border border-glass bg-licorice"
                    style={animatedStyle}>
                    <Text className="font-psemibold text-lg text-red-500">{`>> SIGN-OUT >>`}</Text>
                </Animated.View>
            </GestureDetector>
            <View className="gap-1">
                {/* Name */}
                <Text className="font-pbold text-lg text-white">
                    {user.displayName || 'No Name'}
                </Text>

                {/* Email */}
                <Text className="font-pregular text-sm text-white/60">
                    {user.email}
                </Text>
            </View>
            {/* Profile Picture */}
            {user.photoURL && (
                <Image
                    source={{ uri: user.photoURL }}
                    className="aspect-square w-14 rounded-full"
                />
            )}
        </View>
    );
};

export default UserProfileCard;
