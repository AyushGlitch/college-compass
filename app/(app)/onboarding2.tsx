import { View, Text } from 'react-native';
import React from 'react';
import { Container } from '~/components/Container';
import CustomButton from '~/components/CustomButton';
import { router } from 'expo-router';

const OnboardingScreen2 = () => {
    return (
        <Container className="justify-center gap-4 p-4">
            <View className="flex-1 justify-center">
                <Text className={`font-pbold text-3xl`}>Get access to awesome features!</Text>

                <View className="mt-7 gap-2">
                    <Text className="font-pregular text-lg">Email Sorter</Text>
                    <Text className="font-pregular text-lg">Attendance Marker</Text>
                    <Text className="font-pregular text-lg">Hostel Leave Mailer</Text>
                    <Text className="font-pregular text-lg">College Layout Navigator</Text>
                </View>
            </View>
            <CustomButton
                title="Continue"
                containerStyles="w-full"
                handlePress={() => router.push('/(app)/onboarding3')}
            />
        </Container>
    );
};

export default OnboardingScreen2;
