import { View, Text, Image, ActivityIndicator } from 'react-native';
import React from 'react';
import { Button } from '~/components/Button';
import { signOut } from 'firebase/auth';
import { FIREBASE_AUTH } from '~/firebaseConfig';

// USER SCREEN (ONLY FOR TESTING AUTH)
const UserScreen = () => {
    const auth = FIREBASE_AUTH;

    // get user data
    const user = auth.currentUser;
    console.log('User Screen:', user);

    return (
        user && (
            <View className="flex-1 items-center justify-center gap-4">
                <Text>UserScreen</Text>
                <View className="flex-row items-center gap-4">
                    <Image
                        source={{ uri: user.photoURL || 'default_image_url' }}
                        className="aspect-square w-32"
                    />
                    <View>
                        <Text>{user.email}</Text>
                        <Text>{user.displayName}</Text>
                    </View>
                </View>

                <Button title="Logout" onPress={() => signOut(auth)} />
            </View>
        )
    );
};

export default UserScreen;
