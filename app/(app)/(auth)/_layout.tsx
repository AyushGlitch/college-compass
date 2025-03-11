import { Redirect, Stack } from 'expo-router';
import { View, Text } from 'react-native';
import { FIREBASE_AUTH } from '~/firebaseConfig';

const AuthLayout = () => {
    return (
        <Stack
            screenOptions={{
                statusBarStyle: 'dark',
                // statusBarBackgroundColor: isDark ? '#030014' : '#0B0014',
                statusBarBackgroundColor: 'transparent',
                // headerStyle: {
                //     backgroundColor: isDark ? '#080017' : '#0B0014',
                // },
                // headerTintColor: isDark ? '#c084fc' : '#0c0a09',
                // navigationBarColor: isDark ? '#030014' : '#fafaf9',
                headerShown: false,
                statusBarTranslucent: true,
            }}
        />
    );
};

export default AuthLayout;
