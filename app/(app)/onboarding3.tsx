import { View, Text } from 'react-native';
import React, { useEffect } from 'react';
import { Container } from '~/components/Container';
import CustomButton from '~/components/CustomButton';

import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import { GoogleAuthProvider, signInWithCredential } from 'firebase/auth';
import { FIREBASE_AUTH } from '~/firebaseConfig';
import { makeRedirectUri } from 'expo-auth-session';

WebBrowser.maybeCompleteAuthSession();

const OnboardingScreen3 = () => {
    const auth = FIREBASE_AUTH; // GET FIREBASE AUTH INSTANCE

    // GOOGLE AUTH FLOW REQUEST
    const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
        webClientId: '499007111473-iolrcekl6kfjh9mkc80lm59h582vtjah.apps.googleusercontent.com',
        androidClientId: '499007111473-js9hv6mda0chi4bp2t3g054qnl12mgkk.apps.googleusercontent.com',
        redirectUri: makeRedirectUri({
            scheme: 'com.aditya221210011.collegecompass',
            path: '/(app)/onboarding3',
        }),
    });

    // EXCHANGE TOKENS TO INTEGRATE GOOGLE LOGIN WITH FIREBASE
    useEffect(() => {
        if (response?.type === 'success') {
            console.warn('expo-auth-session response', response);
            const { id_token } = response.params; // Extract id_token instead of access_token

            if (!id_token) {
                console.error('No ID Token received!');
                return;
            }

            const credential = GoogleAuthProvider.credential(id_token);
            signInWithCredential(auth, credential)
                .then((userCredential) => {
                    console.log('User signed in:', userCredential.user);
                })
                .catch((error) => {
                    console.error('Sign-in failed:', error);
                });
        }
    }, [response]);

    return (
        <Container className="justify-center gap-4 p-4">
            <View className="flex-1 justify-center gap-4">
                <Text className="text-center font-pbold text-3xl">Login now to get started!</Text>
                <Text className="text-center text-xl font-light">
                    Just use your institute Email to login.
                </Text>
            </View>
            <CustomButton
                title="Sign in with Google"
                containerStyles="w-full"
                // handlePress={() => console.warn('Sign in using Google')}
                handlePress={() => promptAsync()}
            />
        </Container>
    );
};

export default OnboardingScreen3;
