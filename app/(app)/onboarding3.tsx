import { View, Text, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Container } from '~/components/Container';
import CustomButton from '~/components/CustomButton';

import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import { GoogleAuthProvider, signInWithCredential } from 'firebase/auth';
import { FIREBASE_AUTH } from '~/firebaseConfig';
import { makeRedirectUri } from 'expo-auth-session';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withSpring,
    withTiming,
    interpolateColor,
} from 'react-native-reanimated';
import { AntDesign } from '@expo/vector-icons';

WebBrowser.maybeCompleteAuthSession();

const OnboardingScreen3 = () => {
    const auth = FIREBASE_AUTH;
    const [isLoading, setIsLoading] = useState(false);

    const [request, response, promptAsync] = Google.useAuthRequest({
        webClientId:
            '499007111473-iolrcekl6kfjh9mkc80lm59h582vtjah.apps.googleusercontent.com',
        androidClientId:
            '499007111473-js9hv6mda0chi4bp2t3g054qnl12mgkk.apps.googleusercontent.com',
        scopes: [
            'openid',
            'profile',
            'email',
            'https://www.googleapis.com/auth/gmail.readonly',
        ],
        extraParams: {
            access_type: 'offline',
            prompt: 'consent',
        },
        redirectUri: makeRedirectUri({
            scheme: 'com.aditya221210011.collegecompass',
            path: '/(app)/onboarding3',
        }),
    });

    useEffect(() => {
        if (response?.type === 'success') {
            console.warn('expo-auth-session response', response);
            const { idToken, accessToken, refreshToken, expiresIn }: any =
                response.authentication;

            if (!idToken || !accessToken || !refreshToken || !expiresIn) {
                console.error('Missing Tokens!');
                return;
            }

            const credential = GoogleAuthProvider.credential(idToken);
            signInWithCredential(auth, credential)
                .then(async (userCredential) => {
                    console.log('User signed in:', userCredential.user);

                    const promises = [
                        AsyncStorage.setItem('accessToken', accessToken),
                        AsyncStorage.setItem('refreshToken', refreshToken),
                        AsyncStorage.setItem(
                            'expiryTime',
                            (Date.now() + expiresIn * 1000).toString()
                        ),
                    ];
                    await Promise.all(promises);
                })
                .catch((error) => {
                    console.error('Sign-in failed:', error);
                });
        }
    }, [response]);

    // Animation States
    const scale = useSharedValue(0.8);
    const opacity = useSharedValue(0);
    const background = useSharedValue(0);

    useEffect(() => {
        scale.value = withSpring(1, { damping: 8 });
        opacity.value = withTiming(1, { duration: 1500 });
        background.value = withTiming(1, { duration: 1000 });
    }, []);

    // Animated Styles
    const titleStyle = useAnimatedStyle(() => ({
        transform: [{ scale: scale.value }],
        opacity: opacity.value,
    }));

    const buttonStyle = useAnimatedStyle(() => ({
        transform: [{ scale: scale.value }],
    }));

    const backgroundStyle = useAnimatedStyle(() => {
        const bgColor = interpolateColor(
            background.value,
            [0, 1],
            ['#0B0014', '#21003D']
        );
        return {
            backgroundColor: bgColor,
        };
    });

    if (isLoading) {
        return (
            <View className="bg-licorice flex-1 items-center justify-center">
                <Text className="text-center font-pbold text-3xl text-white">
                    Please wait while we Sign you in
                </Text>
                <ActivityIndicator size="large" color="white" />
            </View>
        );
    }

    return (
        <Animated.View className="flex-1" style={[backgroundStyle]}>
            <Container className="flex-1 justify-center gap-4 p-4">
                <View className="flex-1 justify-center gap-4">
                    {/* Title Text */}
                    <Animated.Text
                        style={titleStyle}
                        className="text-aquamarine text-center font-pbold text-3xl">
                        Login now to get started!
                    </Animated.Text>
                    <Text className="text-center text-lg font-light text-white">
                        Just use your institute Email to login.
                    </Text>
                </View>

                {/* Google Sign-In Button */}
                <Animated.View style={buttonStyle}>
                    <CustomButton
                        title="Sign in with Google"
                        containerStyles="w-full active:scale-95"
                        textStyles="!text-white"
                        icon={
                            <AntDesign name="google" size={18} color="white" />
                        }
                        handlePress={async () => {
                            try {
                                setIsLoading(true);
                                console.log('Starting Google Sign-In...');
                                const res = await promptAsync();
                                console.log('PromptAsync Response:', res);
                            } catch (error) {
                                console.error('Google Sign-In Error:', error);
                            } finally {
                                setIsLoading(false);
                            }
                        }}
                    />
                </Animated.View>
            </Container>
        </Animated.View>
    );
};

export default OnboardingScreen3;
