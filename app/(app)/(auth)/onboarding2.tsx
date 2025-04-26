import { View, Text } from 'react-native';
import React from 'react';
import { Container } from '~/components/Container';
import CustomButton from '~/components/CustomButton';
import { useRouter } from 'expo-router';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withSpring,
    withTiming,
    Easing,
    runOnJS,
    interpolateColor,
} from 'react-native-reanimated';
import { GestureDetector, Gesture } from 'react-native-gesture-handler';

const OnboardingScreen2 = () => {
    const router = useRouter();

    // Animations for text and button
    const scale = useSharedValue(0.8);
    const opacity = useSharedValue(0);

    const backgroundColor = useSharedValue(0);

    React.useEffect(() => {
        scale.value = withSpring(1, { damping: 8 });
        opacity.value = withTiming(1, {
            duration: 800,
            easing: Easing.out(Easing.exp),
        });
        backgroundColor.value = withTiming(1, {
            duration: 800,
        });
    }, []);

    const titleStyle = useAnimatedStyle(() => ({
        transform: [{ scale: scale.value }],
        opacity: opacity.value,
    }));

    const buttonStyle = useAnimatedStyle(() => ({
        transform: [{ scale: scale.value }],
    }));

    // Handle navigation with swipe gestures
    const navigateToNextPage = () => {
        router.push('/(app)/(auth)/onboarding3');
    };

    const navigateToPreviousPage = () => {
        router.back();
    };

    // Gesture handling for swipe left/right
    const panGesture = Gesture.Pan().onEnd((e) => {
        if (e.translationX < -100) {
            // Swipe Left → Next Page
            runOnJS(navigateToNextPage)();
        }
        if (e.translationX > 100) {
            // Swipe Right → Previous Page
            runOnJS(navigateToPreviousPage)();
        }
    });

    // Background Gradient Interpolation
    const backgroundStyle = useAnimatedStyle(() => {
        const background = interpolateColor(
            backgroundColor.value,
            [0, 1],
            ['#0B0014', '#0B0014']
        );

        return {
            backgroundColor: background,
        };
    });

    return (
        <GestureDetector gesture={panGesture}>
            <Animated.View className="flex-1" style={[backgroundStyle]}>
                <Container className="flex-1 justify-center gap-4 p-4">
                    <View className="flex-1 justify-center">
                        {/* Animated Title */}
                        <Animated.Text
                            style={titleStyle}
                            className="font-pbold text-3xl text-aquamarine">
                            Get access to awesome features!
                        </Animated.Text>

                        {/* Feature List */}
                        <View className="mt-7 gap-3">
                            <Text className="font-pregular text-lg text-white">
                                ✅ Email Sorter
                            </Text>
                            <Text className="font-pregular text-lg text-white">
                                ✅ Attendance Marker
                            </Text>
                            <Text className="font-pregular text-lg text-white">
                                ✅ Hostel Leave Mailer
                            </Text>
                            <Text className="font-pregular text-lg text-white">
                                ✅ PYQs Database
                            </Text>
                            <Text className="font-pregular text-lg text-white">
                                ✅ Collaborative Notes
                            </Text>
                        </View>
                    </View>

                    {/* Animated Button */}
                    <Animated.View style={[buttonStyle]}>
                        <CustomButton
                            title="Continue"
                            containerStyles="w-full active:scale-95"
                            handlePress={() =>
                                router.push('/(app)/(auth)/onboarding3')
                            }
                        />
                    </Animated.View>

                    {/* Swipe Hint */}
                    <Text className="mt-2 text-center font-pregular text-sm text-white opacity-50">
                        Swipe left to continue →
                    </Text>
                </Container>
            </Animated.View>
        </GestureDetector>
    );
};

export default OnboardingScreen2;
