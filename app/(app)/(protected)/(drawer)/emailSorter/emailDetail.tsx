import { View, Text, ScrollView } from 'react-native';
import React from 'react';
import { useLocalSearchParams } from 'expo-router';
import { Container } from '~/components/Container';
import { extractEmailBody } from '~/utils/gmailUtils';
import WebView from 'react-native-webview';

const EmailDetailScreen = () => {
    const { email: emailString } = useLocalSearchParams();

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

    const body: string = extractEmailBody(email);
    const htmlBody = body
        ? body.startsWith('<')
            ? body
            : `<pre>${body}</pre>`
        : `<pre>No body</pre>`;

    // console.log('🚀 Email body: ', htmlBody);

    return (
        <Container className="bg-black/5">
            <ScrollView
                contentContainerStyle={{
                    flexGrow: 1,
                }}>
                <View className="p-4">
                    {/* Subject */}
                    <Text className="font-psemibold text-xl text-licorice">
                        {subject}
                    </Text>

                    {/* Sender */}
                    <Text className="mt-1 font-pregular text-licorice/60">
                        From: {sender}
                    </Text>
                </View>

                {/* Divider */}
                <View className="h-px bg-gray-700" />

                {/* Body */}
                <WebView
                    originWhitelist={['*']}
                    source={{ html: htmlBody }}
                    className="flex-1"
                    injectedJavaScript={`
                        const meta = document.createElement('meta');
                        meta.setAttribute('content', 'width=device-width, initial-scale=1, maximum-scale=1');
                        meta.setAttribute('name', 'viewport');
                        document.head.appendChild(meta);

                        const style = document.createElement('style');
                        style.innerHTML = \`
                            body {
                                font-size: 16px;
                                line-height: 1.5;
                                padding: 16px;
                            }
                            img {
                                max-width: 100%;
                                height: auto;
                            }
                        \`;
                        document.head.appendChild(style);
                    `}
                    onMessage={(event) => {
                        console.log('WebView message:', event.nativeEvent.data);
                    }}
                />
            </ScrollView>
        </Container>
    );
};

export default EmailDetailScreen;
