import { View, Text, TextInput, ScrollView } from 'react-native';
import React, { useState } from 'react';
import { Container } from '~/components/Container';
import CustomButton from '~/components/CustomButton';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { router, Stack } from 'expo-router';
import uuid from 'react-native-uuid';

const ColabNotesScreen = () => {
    // TODO: Add Zod

    const [roomName, setRoomName] = useState('');

    const createRoom = () => {
        const newRoomName = uuid.v4(); // Generate unique room name
        console.log('Joining room: ', newRoomName);
        router.push(
            `/(protected)/(drawer)/colabNotes/editor?roomName=${newRoomName}`
        );
    };

    const joinRoom = () => {
        if (!roomName.trim()) {
            alert('Please enter a room name to join');
            return;
        }
        console.log('Joining room: ', roomName);
        router.push(
            `/(protected)/(drawer)/colabNotes/editor?roomName=${roomName}`
        );
    };

    return (
        <Container>
            <ScrollView
                keyboardShouldPersistTaps="handled"
                contentContainerClassName="min-h-full justify-center items-center">
                {/* Intro */}
                <View className="z-50 w-full items-center gap-2 bg-white px-4 py-16 shadow shadow-black">
                    <MaterialCommunityIcons
                        name="application-edit"
                        size={52}
                        color="black"
                    />
                    <Text className="mt-6 text-center font-pbold text-3xl">
                        Collaborate in Real Time!
                    </Text>
                    <Text className="text-center font-pregular text-lg">
                        Create or join a shared notes room to collaborate
                        seamlessly with your peers. Whether you're
                        brainstorming, planning, or studying together, this app
                        lets you edit and sync notes live.
                    </Text>
                </View>
                {/* Separator */}
                <View className="h-[1px] w-full bg-gray-300" />
                {/* Inputs */}
                <View className="w-full flex-1 items-center justify-center gap-8 bg-stone-100 px-4">
                    <CustomButton
                        title="Create Room"
                        containerStyles="w-full"
                        handlePress={createRoom}
                    />
                    <Text className="text-center font-plight text-lg text-black/60">
                        or
                    </Text>
                    <View>
                        <View className="w-full flex-row gap-2">
                            <TextInput
                                placeholder="Enter Room name to Join"
                                className="h-16 flex-1 rounded-full border p-4 font-pregular text-xl"
                                value={roomName}
                                onChangeText={setRoomName}
                            />
                            <CustomButton
                                title="Join Room"
                                handlePress={joinRoom}
                            />
                        </View>
                    </View>
                </View>
            </ScrollView>
        </Container>
    );
};

export default ColabNotesScreen;
