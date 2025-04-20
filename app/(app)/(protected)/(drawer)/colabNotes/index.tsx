import {
    View,
    Text,
    TextInput,
    ScrollView,
    KeyboardAvoidingView,
    FlatList,
    Pressable,
} from 'react-native';
import React, { useState } from 'react';
import { Container } from '~/components/Container';
import CustomButton from '~/components/CustomButton';
import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
import { router, Stack } from 'expo-router';
import uuid from 'react-native-uuid';
import { db } from '~/db/drizzle';
import { colabRooms } from '~/db/schema';
import { and, eq, not } from 'drizzle-orm';
import { FIREBASE_AUTH } from '~/firebaseConfig';
import { useLiveQuery } from 'drizzle-orm/expo-sqlite';

const ColabNotesScreen = () => {
    // TODO: Add keyboard avoiding view

    const user = FIREBASE_AUTH.currentUser;
    const userUid = user?.uid;

    const [newRoomName, setNewRoomName] = useState('');

    const [creatorId, setCreatorId] = useState('');
    const [roomName, setRoomName] = useState('');

    const { data: roomsList } = useLiveQuery(db.select().from(colabRooms)); // get list of rooms in db

    const createRoom = async () => {
        if (!newRoomName.trim()) {
            alert('Room name cannot be empty!');
            return;
        }

        try {
            // check if room exists
            const existingRoom = await db
                .select()
                .from(colabRooms)
                .where(
                    and(
                        eq(colabRooms.creatorId, userUid as string),
                        eq(colabRooms.roomName, newRoomName)
                    )
                );

            if (existingRoom.length > 0) {
                alert('A room with this name already exists!');
                return;
            }

            // add new room to DB
            await db.insert(colabRooms).values({
                id: uuid.v4() as string,
                creatorId: userUid as string,
                roomName: newRoomName,
            });

            console.log('Creating room: ', newRoomName);

            router.push({
                pathname: '/(app)/(protected)/(drawer)/colabNotes/webquill',
                params: {
                    creatorId: userUid,
                    roomName: newRoomName,
                },
            });
        } catch (error) {}
    };

    const joinRoom = async (
        customCreatorId?: string,
        customRoomName?: string
    ) => {
        if (customCreatorId && customRoomName) {
            router.push({
                pathname: '/(app)/(protected)/(drawer)/colabNotes/webquill',
                params: {
                    creatorId: customCreatorId,
                    roomName: customRoomName,
                },
            });
            return;
        }
        if (!roomName.trim()) {
            alert('Please enter a room name to join');
            return;
        }

        // TODO: Verify room exists with DB call (main online db)

        await db
            .insert(colabRooms)
            .values({
                id: uuid.v4() as string,
                creatorId,
                roomName,
            })
            .onConflictDoNothing();

        console.log('Joining room: ', roomName);
        router.push({
            pathname: '/(app)/(protected)/(drawer)/colabNotes/webquill',
            params: {
                creatorId,
                roomName,
            },
        });
    };

    // const handleDeleteRecents = async () => {
    //     // delete records from db for shared notes
    //     await db
    //         .delete(colabRooms)
    //         .where(not(eq(colabRooms.creatorId, userUid as string)));
    // };

    return (
        <Container className="bg-licorice">
            <ScrollView
                keyboardShouldPersistTaps="handled"
                contentContainerClassName="justify-center items-center"
                contentContainerStyle={{ flexGrow: 1 }}>
                {/* Intro */}
                <View className="z-50 w-full items-center gap-2 px-4 py-16">
                    <MaterialCommunityIcons
                        name="application-edit"
                        size={52}
                        color="white"
                    />
                    <Text className="mt-6 text-center font-pbold text-3xl text-white">
                        Collaborate in Real Time!
                    </Text>
                    <Text className="text-center font-pregular text-lg text-white/80">
                        Create or join a shared notes room to collaborate
                        seamlessly with your peers. Whether you're
                        brainstorming, planning, or studying together, this app
                        lets you edit and sync notes live.
                    </Text>
                </View>

                {/* Separator */}
                <View className="h-[1px] w-full bg-glass" />

                {/* Inputs */}
                <View className="w-full flex-1 items-center justify-center gap-4 px-4 py-2">
                    <View className="w-full flex-row gap-2">
                        <View className="flex-1 justify-center rounded-full border border-glass p-4">
                            <TextInput
                                placeholder="New Room Name"
                                className="text-xl text-folly placeholder:text-folly"
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
                    <Text className="z-10 bg-licorice p-2 text-center font-plight text-lg text-white/60">
                        or
                    </Text>
                    <View className="gap-4">
                        <View className="w-full flex-row justify-between gap-2">
                            <View className="flex-1 justify-center rounded-full border border-glass p-4">
                                <TextInput
                                    placeholder="Creator ID"
                                    className="text-xl text-folly placeholder:text-folly"
                                    value={creatorId}
                                    onChangeText={setCreatorId}
                                    textAlign="center"
                                    multiline={false}
                                />
                            </View>
                            <Text className="self-center text-3xl text-white/60">
                                -
                            </Text>
                            <View className="flex-1 justify-center rounded-full border border-glass p-4">
                                <TextInput
                                    placeholder="Room Name"
                                    className="text-xl text-folly placeholder:text-folly"
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

                {/* Separator */}
                <View className="h-[1px] w-full bg-glass" />

                {/* History */}
                {roomsList.length > 0 && (
                    <View className="w-full py-6 pb-12">
                        <View className="flex-row items-center justify-between p-4">
                            <Text className="font-psemibold text-xl  text-aquamarine">
                                Recents
                            </Text>
                            {/* <Pressable onPress={handleDeleteRecents}>
                            <AntDesign name="delete" size={24} color="red" />
                        </Pressable> */}
                        </View>

                        <FlatList
                            data={roomsList}
                            keyExtractor={(room) => room.id}
                            contentContainerClassName="p-4 gap-2"
                            // ListEmptyComponent={() => (
                            //     <Text className="text-center font-plight text-sm text-white">
                            //         Your Recents will appear here.
                            //     </Text>
                            // )}
                            scrollEnabled={false}
                            renderItem={({ item }) => (
                                <Pressable
                                    onPress={() =>
                                        joinRoom(item.creatorId, item.roomName)
                                    }>
                                    <View className="rounded-lg border border-glass p-4">
                                        <View className="flex-row items-center gap-4">
                                            <Text className="font-psemibold text-sm text-folly">
                                                Creator
                                            </Text>
                                            {item.creatorId === userUid ? (
                                                <Text className="font-pregular text-lg text-aquamarine">
                                                    You
                                                </Text>
                                            ) : (
                                                <Text className="font-plight text-lg text-white">
                                                    {item.creatorId}
                                                </Text>
                                            )}
                                        </View>
                                        <View className="flex-row items-center gap-4">
                                            <Text className="font-psemibold text-sm text-folly">
                                                Room
                                            </Text>
                                            <Text className="font-pregular text-lg text-white">
                                                {item.roomName}
                                            </Text>
                                        </View>
                                    </View>
                                </Pressable>
                            )}
                        />
                    </View>
                )}
            </ScrollView>
        </Container>
    );
};

export default ColabNotesScreen;
