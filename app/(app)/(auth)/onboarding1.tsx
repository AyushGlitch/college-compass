import { View, Text } from 'react-native';
import React from 'react';
import { Container } from '~/components/Container';
import CustomButton from '~/components/CustomButton';
import { useRouter } from 'expo-router';
import Animated, {
    useSharedValue,
    withSpring,
    useAnimatedStyle,
    withTiming,
    Easing,
    runOnJS,
    interpolateColor,
} from 'react-native-reanimated';
import { GestureDetector, Gesture } from 'react-native-gesture-handler';

const OnboardingScreen = () => {
    const scale = useSharedValue(0.5);
    const opacity = useSharedValue(0);
    const backgroundColor = useSharedValue(0);

    const router = useRouter();

    React.useEffect(() => {
        scale.value = withSpring(1, { damping: 7 });
        opacity.value = withTiming(1, {
            duration: 1000,
            easing: Easing.out(Easing.exp),
        });
        backgroundColor.value = withTiming(1, {
            duration: 800,
        });
    }, []);

    const navigateToNextPage = () => {
        router.push('/(app)/onboarding2');
    };

    const panGesture = Gesture.Pan().onEnd((e) => {
        if (e.translationX < -100) {
            runOnJS(navigateToNextPage)();
        }
    });

    // Animation for app name
    const appNameStyle = useAnimatedStyle(() => ({
        transform: [{ scale: scale.value }],
        opacity: opacity.value,
    }));

    // Button bounce effect
    const buttonStyle = useAnimatedStyle(() => ({
        transform: [{ scale: scale.value }],
    }));

    // Background Gradient Interpolation
    const backgroundStyle = useAnimatedStyle(() => {
        const background = interpolateColor(
            backgroundColor.value,
            [0, 1],
            ['#1b003b', '#0b0014']
        );

        return {
            backgroundColor: background,
        };
    });

    return (
        <GestureDetector gesture={panGesture}>
            <Animated.View className="flex-1" style={[backgroundStyle]}>
                <Container className="flex-1 justify-between gap-4 p-4">
                    {/* Top Section */}
                    <View className="flex-1 items-center justify-center gap-2">
                        {/* App Name Animation */}
                        <Animated.View style={appNameStyle}>
                            <Text className="text-aquamarine text-center font-pregular text-2xl opacity-80">
                                Welcome to
                            </Text>
                            <Text
                                className="text-aquamarine relative font-pblack text-5xl"
                                style={{
                                    textShadowColor: '#99EDCC',
                                    textShadowOffset: {
                                        width: 0,
                                        height: 0,
                                    },
                                    textShadowRadius: 20,
                                    lineHeight: 75,
                                    marginTop: -12,
                                }}>
                                College Compass
                            </Text>
                        </Animated.View>

                        {/* Tagline */}
                        <Text className="mt-4 text-center font-pregular text-lg text-white opacity-70">
                            Your one-stop solution for everything
                            college-related.
                        </Text>
                    </View>

                    <Animated.View style={[buttonStyle]}>
                        <CustomButton
                            title="Continue"
                            containerStyles="w-full active:scale-95"
                            handlePress={() =>
                                router.push('/(app)/onboarding2')
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

export default OnboardingScreen;
