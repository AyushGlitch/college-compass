import { View, Text, TextInput, ScrollView } from 'react-native';
import React, { useState } from 'react';
import { Container } from '~/components/Container';
import CustomButton from '~/components/CustomButton';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { router, Stack } from 'expo-router';
import uuid from 'react-native-uuid';

const ColabNotesScreen = () => {
    // TODO: Add Zod

    const [newRoomName, setNewRoomName] = useState('')

    const [creatorId, setCreatorId] = useState('');
    const [roomName, setRoomName] = useState('');

    const createRoom = () => {
        console.log('Joining room: ', newRoomName);
        router.push({
            pathname: "/(app)/(protected)/(drawer)/colabNotes/webquill",
            params: {
                creatorId: "me",
                roomName: newRoomName
            }
        });
    };

    const joinRoom = () => {
        if (!roomName.trim()) {
            alert('Please enter a room name to join');
            return;
        }
        console.log('Joining room: ', roomName);
        router.push({
            pathname: "/(app)/(protected)/(drawer)/colabNotes/webquill",
            params: {
                creatorId: "add own creator Id here",
                roomName: newRoomName
            }
        });
    };

    return (
        <Container className='bg-licorice'>
            <ScrollView
                keyboardShouldPersistTaps="handled"
                contentContainerClassName="min-h-full justify-center items-center">
                {/* Intro */}
                <View className="z-50 w-full items-center gap-2 px-4 py-16">
                    <MaterialCommunityIcons
                        name="application-edit"
                        size={52}
                        color="black"
                    />
                    <Text className="mt-6 text-center font-pbold text-white text-3xl">
                        Collaborate in Real Time!
                    </Text>
                    <Text className="text-center font-pregular text-white/80 text-lg">
                        Create or join a shared notes room to collaborate
                        seamlessly with your peers. Whether you're
                        brainstorming, planning, or studying together, this app
                        lets you edit and sync notes live.
                    </Text>
                </View>
                {/* Separator */}
                <View className="h-[1px] w-full bg-glass" />
                {/* Inputs */}
                <View className="w-full flex-1 items-center justify-center gap-8 px-4">
                    <View className='gap-2 w-full flex-row'>
                        <View className='border border-glass p-4 flex-1 justify-center rounded-full'>
                            <TextInput
                                placeholder="New Room Name"
                                className="text-folly placeholder:text-folly text-xl"
                                value={newRoomName}
                                onChangeText={setNewRoomName}
                                textAlign="center"
                                multiline={false}
                            />
                        </View>
                        <CustomButton
                            title="Create Room"
                            handlePress={createRoom}
                        />
                    </View>
                    <Text className="text-center font-plight text-lg z-10 bg-licorice p-2 text-white/60">
                        or
                    </Text>
                    <View className='gap-4'>
                        <View className="w-full flex-row justify-between gap-2">
                            <View className='border border-glass flex-1 p-4 justify-center rounded-full'>
                                <TextInput
                                    placeholder="Creator ID"
                                    className="text-folly placeholder:text-folly text-xl"
                                    value={creatorId}
                                    onChangeText={setCreatorId}
                                    textAlign="center"
                                    multiline={false}
                                />
                            </View>
                            <View className='border border-glass p-4 flex-1 justify-center rounded-full'>
                                <TextInput
                                    placeholder="Room Name"
                                    className="text-folly placeholder:text-folly text-xl"
                                    value={roomName}
                                    onChangeText={setRoomName}
                                    textAlign="center"
                                    multiline={false}
                                />
                            </View>
                        </View>
                        <CustomButton
                            title="Join Room"
                            handlePress={joinRoom}
                        />
                    </View>
                </View>
            </ScrollView>
        </Container>
    );
};

export default ColabNotesScreen;
