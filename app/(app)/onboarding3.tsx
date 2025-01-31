import { View, Text } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Container } from '~/components/Container';
import CustomButton from '~/components/CustomButton';

import { FIREBASE_AUTH } from '~/firebaseConfig';

// WebBrowser.maybeCompleteAuthSession();

// const CLIENT_ID = '499007111473-iolrcekl6kfjh9mkc80lm59h582vtjah.apps.googleusercontent.com';
// const REDIRECT_URI = 'https://college-compass-6354f.firebaseapp.com/__/auth/handler';

// const discovery = {
//     authorizationEndpoint: 'https://accounts.google.com/o/oauth2/v2/auth',
//     tokenEndpoint: 'https://oauth2.googleapis.com/token',
//     revocationEndpoint: 'https://oauth2.googleapis.com/revoke',
// };

const OnboardingScreen3 = () => {
    const auth = FIREBASE_AUTH; // GET FIREBASE AUTH INSTANCE

    // const [request, response, promptAsync] = AuthSession.useAuthRequest(
    //     {
    //         clientId: '499007111473-iolrcekl6kfjh9mkc80lm59h582vtjah.apps.googleusercontent.com',
    //         scopes: ['openid', 'profile', 'email'],
    //         redirectUri: REDIRECT_URI,
    //     },
    //     discovery
    // );

    // EXCHANGE TOKENS TO INTEGRATE GOOGLE LOGIN WITH FIREBASE
    // useEffect(() => {
    //     if (response?.type === 'success') {
    //         const { id_token } = response.params;
    //         const credential = GoogleAuthProvider.credential(id_token);
    //         signInWithCredential(auth, credential)
    //             .then((userCredential) => {
    //                 console.log('User signed in:', userCredential.user);
    //             })
    //             .catch((error) => {
    //                 console.error('Sign-in failed:', error);
    //             });
    //     }
    // }, [response]);

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
                handlePress={() => console.warn('Sign in using Google')}
            />
        </Container>
    );
};

export default OnboardingScreen3;
