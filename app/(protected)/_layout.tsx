import { View, Text } from 'react-native';
import React from 'react';
import { Redirect, Stack } from 'expo-router';

const ProtectedLayout = () => {
    const isAuthenticated = true; // TODO: temporary solution

    if (!isAuthenticated) {
        return Redirect({ href: '/' });
    }

    return <Stack screenOptions={{ headerShown: false }} />;
};

export default ProtectedLayout;
