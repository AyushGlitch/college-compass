import { View, Text, ScrollView, useWindowDimensions } from 'react-native';
import React from 'react';
import { useLocalSearchParams } from 'expo-router';
import { Container } from '~/components/Container';
import { extractEmailBody } from '~/utils/gmailUtils';
import Drawer from 'expo-router/drawer';
import RenderHTML from 'react-native-render-html';

const EmailDetailScreen = () => {
    const { email: emailString } = useLocalSearchParams();
    const { width } = useWindowDimensions();

    if (!emailString) {
        return (
            <View className="flex-1 items-center justify-center">
                <Text className="text-red-500">Email not found.</Text>
            </View>
        );
    }

    const email = JSON.parse(emailString as string);

    const senderHeader = email.payload.headers.find(
        (h: any) => h.name === 'From'
    );
    const sender = senderHeader?.value || 'Unknown Sender';

    const subject =
        email.payload.headers.find((h: any) => h.name === 'Subject')?.value ||
        'No Subject';

    const body = extractEmailBody(email);

    return (
        <Container className="bg-white">
            <ScrollView contentContainerClassName="p-4 pb-8">
                {/* Subject */}
                <Text className="font-psemibold text-xl text-licorice">
                    {subject}
                </Text>

                {/* Sender */}
                <Text className="mt-1 font-pregular text-licorice/60">
                    From: {sender}
                </Text>

                {/* Divider */}
                <View className="my-3 mb-8 h-px bg-gray-700" />

                {/* Body */}
                <RenderHTML
                    contentWidth={width}
                    source={{ html: body || '<p>No content available</p>' }}
                />
            </ScrollView>
        </Container>
    );
};

export default EmailDetailScreen;
