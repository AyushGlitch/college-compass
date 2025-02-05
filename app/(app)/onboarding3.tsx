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

WebBrowser.maybeCompleteAuthSession();

const OnboardingScreen3 = () => {
    const auth = FIREBASE_AUTH; // GET FIREBASE AUTH INSTANCE
    const [isLoading, setIsLoading] = useState(false);

    // GOOGLE AUTH FLOW REQUEST
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

    // EXCHANGE TOKENS TO INTEGRATE GOOGLE LOGIN WITH FIREBASE
    useEffect(() => {
        if (response?.type === 'success') {
            console.warn('expo-auth-session response', response);
            const { idToken, accessToken, refreshToken, expiresIn }: any =
                response.authentication; // Extract id_token instead of access_token

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

    if (isLoading) {
        return (
            <Container className="justify-center gap-4">
                <Text className="text-center font-pbold text-3xl">
                    Please wait while we Sign you in
                </Text>
                <ActivityIndicator size="large" />
            </Container>
        );
    }

    return (
        <Container className="justify-center gap-4 p-4">
            <View className="flex-1 justify-center gap-4">
                <Text className="text-center font-pbold text-3xl">
                    Login now to get started!
                </Text>
                <Text className="text-center text-xl font-light">
                    Just use your institute Email to login.
                </Text>
            </View>
            <CustomButton
                title="Sign in with Google"
                containerStyles="w-full"
                handlePress={async () => {
                    try {
                        setIsLoading(true);
                        console.log('Starting Google Sign-In...');
                        const res = await promptAsync();
                        console.log(
                            'PromptAsync Response:',
                            JSON.stringify(res, null, 2)
                        );
                    } catch (error) {
                        console.error('Error during Google Sign-In:', error);
                    } finally {
                        setIsLoading(false);
                    }
                }}
            />
        </Container>
    );
};

export default OnboardingScreen3;
