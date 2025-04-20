import { View, Text, Share, Pressable } from 'react-native';
import React from 'react';
import { useLocalSearchParams } from 'expo-router';
import { Container } from '~/components/Container';
import WebView from 'react-native-webview';
import * as Clipboard from 'expo-clipboard';
import { FontAwesome } from '@expo/vector-icons';

const WebQuillScreen = () => {
    const { creatorId, roomName } = useLocalSearchParams<{
        creatorId: string;
        roomName: string;
    }>();

    const editorUrl = `https://college-compass-collab.vercel.app/?creatorId=${creatorId}&roomName=${roomName}`;

    const handleShare = async () => {
        try {
            await Clipboard.setStringAsync(roomName);
            const result = await Share.share({
                message: editorUrl,
            });
            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                    console.log(
                        `Shared with activity type: ${result.activityType}`
                    );
                } else {
                    console.log('Shared successfully');
                }
            } else if (result.action === Share.dismissedAction) {
                console.log('Sharing dismissed');
            }
        } catch (error) {
            console.error('Error sharing: ', error);
        }
    };

    return (
        <Container className="relative bg-licorice">
            <WebView
                source={{ uri: editorUrl }}
                originWhitelist={['*']}
                javaScriptEnabled={true}
                domStorageEnabled={true}
                mixedContentMode="always"
                allowUniversalAccessFromFileURLs={true}
                allowsInlineMediaPlayback={true}
                startInLoadingState={true}
            />

            <View className="absolute inset-x-0 bottom-0 h-16 items-center justify-center bg-celestial_blue">
                <Pressable onPress={handleShare} className="flex-row gap-4">
                    <Text className="font-psemibold text-3xl">Share</Text>
                    <FontAwesome name="share" size={24} color="black" />
                </Pressable>
            </View>
        </Container>
    );
};

export default WebQuillScreen;
