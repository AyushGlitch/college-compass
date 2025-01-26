import { View, Text } from 'react-native';
import React from 'react';
import { Container } from '~/components/Container';
import CustomButton from '~/components/CustomButton';

const OnboardingScreen3 = () => {
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
