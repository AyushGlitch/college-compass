import { View, Text } from 'react-native';
import React from 'react';
import { Redirect, Stack } from 'expo-router';

const ProtectedLayout = () => {
    return <Stack screenOptions={{ headerShown: false }} />;
};

export default ProtectedLayout;
