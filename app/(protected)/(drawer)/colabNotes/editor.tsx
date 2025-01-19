import { View, Text } from 'react-native';
import React from 'react';
import { useLocalSearchParams } from 'expo-router';
import { Container } from '~/components/Container';

const TextEditorScreen = () => {
    const { roomName } = useLocalSearchParams<{ roomName?: string }>();

    return (
        <Container>
            <Text>RoomName: {roomName}</Text>
        </Container>
    );
};

export default TextEditorScreen;
