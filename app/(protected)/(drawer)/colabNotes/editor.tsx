import { View, Text, Dimensions, TextInput } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { useLocalSearchParams } from 'expo-router';
import { Container } from '~/components/Container';

import WebView from 'react-native-webview';
import CustomButton from '~/components/CustomButton';
import { Share } from 'react-native';
import * as Clipboard from 'expo-clipboard';
import { Ionicons } from '@expo/vector-icons';

const TextEditorScreen = () => {
    const { roomName } = useLocalSearchParams<{ roomName: string }>();

    const editorUrl = `https://notepad.pw/${roomName}`;

    const injectedJavaScript = `
    (function() {
      // Hide the header and footer
      const header = document.querySelector('header');
      const footer = document.querySelector('footer');
      if (header) header.style.display = 'none';
      if (footer) footer.style.display = 'none';
      
      // Ensure the editor container takes up the full height of the screen
      const editorContainer = document.querySelector('.notepad');
      if (editorContainer) {
        editorContainer.style.height = '100vh';
        editorContainer.style.paddingTop = '0';
        editorContainer.style.paddingBottom = '0';
      }
      
      // Optionally, you can hide any other unwanted elements
      const otherElements = document.querySelectorAll('.functions');
      otherElements.forEach(el => el.style.display = 'none');
    })();
    true;
  `;

    const handleShare = async () => {
        try {
            await Clipboard.setStringAsync(roomName);
            const result = await Share.share({
                message: `Join my room: ${roomName}`,
            });
            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                    console.log(`Shared with activity type: ${result.activityType}`);
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
        <Container>
            <View className="absolute inset-x-4 bottom-4 z-50">
                <CustomButton
                    title="Share Room ID"
                    containerStyles="border-black !bg-white border-2"
                    textStyles="!text-black"
                    handlePress={handleShare}
                    icon={<Ionicons name="arrow-undo-sharp" size={24} />}
                />
            </View>
            <WebView
                source={{ uri: editorUrl }}
                javaScriptEnabled={true}
                domStorageEnabled={true}
                className="relative flex-1"
                injectedJavaScript={injectedJavaScript}
            />
        </Container>
    );
};

export default TextEditorScreen;
