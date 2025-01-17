import { View, Text, ScrollView } from 'react-native';
import React from 'react';
import { Container } from '~/components/Container';
import CustomButton from '~/components/CustomButton';
import { Redirect, router } from 'expo-router';

const OnboardingScreen = () => {
    return (
        <Container className="justify-center gap-4 p-4">
            <View className="flex-1 justify-center">
                <Text className={`text-center font-pregular text-3xl text-stone-950`}>
                    Welcome to {'\n'}
                    <Text className="font-pblack text-4xl">College Compass</Text>
                </Text>
                <Text className={`mt-24 text-center font-pregular text-xl text-stone-950`}>
                    Your one-stop solution for everything college-related. Let’s make your college
                    life simpler and more organized!
                </Text>
            </View>
            <CustomButton
                title="Continue"
                containerStyles="w-full"
                handlePress={() => router.push('/onboarding2')}
            />
        </Container>
    );
};

export default OnboardingScreen;
