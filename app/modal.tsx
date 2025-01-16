import { StatusBar } from 'expo-status-bar';
import { Platform } from 'react-native';
import React from 'react';

export default function Modal() {
    return (
        <>
            <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
        </>
    );
}
