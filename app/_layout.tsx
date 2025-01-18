import '../global.css';

import { useFonts } from 'expo-font';
import { SplashScreen, Stack, useRouter, useSegments } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator } from 'react-native';

SplashScreen.preventAutoHideAsync();

export const unstable_settings = {
    // Ensure that reloading on `/modal` keeps a back button present.
    initialRouteName: '(drawer)',
};

export default function RootLayout() {
    const router = useRouter();
    const segments = useSegments();
    const isDark = false; // TODO: temporary solution

    const [isInitializing, setIsInitializing] = useState(true);
    const [user, setUser] = useState(true);

    const [fontsLoaded, error] = useFonts({
        'Poppins-Black': require('../assets/fonts/Poppins-Black.ttf'),
        'Poppins-Bold': require('../assets/fonts/Poppins-Bold.ttf'),
        'Poppins-ExtraBold': require('../assets/fonts/Poppins-ExtraBold.ttf'),
        'Poppins-ExtraLight': require('../assets/fonts/Poppins-ExtraLight.ttf'),
        'Poppins-Light': require('../assets/fonts/Poppins-Light.ttf'),
        'Poppins-Medium': require('../assets/fonts/Poppins-Medium.ttf'),
        'Poppins-Regular': require('../assets/fonts/Poppins-Regular.ttf'),
        'Poppins-SemiBold': require('../assets/fonts/Poppins-SemiBold.ttf'),
        'Poppins-Thin': require('../assets/fonts/Poppins-Thin.ttf'),
    });

    useEffect(() => {
        if (error) throw error;

        if (fontsLoaded) {
            SplashScreen.hideAsync();
            setIsInitializing(false);
        }
    }, [fontsLoaded, error]);

    // if (!fontsLoaded && !error) {
    //     return null;
    // }

    // useEffect(() => {
    //     const unsubscribe = auth.onAuthStateChanged((user) => {
    //         console.log('onAuthStateChanged', user);
    //         setUser(user as any);
    //         if (isInitializing) setIsInitializing(false);
    //     });
    //     return () => unsubscribe();
    // }, []);

    useEffect(() => {
        if (!isInitializing) {
            const inProtectedGroup = segments[0] === '(protected)';
            if (user && !inProtectedGroup) {
                router.replace('/(protected)/(drawer)');
            } else if (!user && inProtectedGroup) {
                router.replace('/');
            }
        }
    }, [user, isInitializing]);

    if (isInitializing || !fontsLoaded) {
        return <ActivityIndicator />;
    }

    return (
        <Stack
            screenOptions={{
                statusBarStyle: isDark ? 'light' : 'dark',
                statusBarBackgroundColor: isDark ? '#0c0a09' : '#fafaf9',
                headerStyle: { backgroundColor: isDark ? '#0c0a09' : '#fafaf9' },
                headerTintColor: isDark ? '#fafaf9' : '#0c0a09',
                navigationBarColor: isDark ? '#0c0a09' : '#fafaf9',

                headerShown: false,
            }}>
            <Stack.Screen name="modal" options={{ title: 'Modal', presentation: 'modal' }} />
        </Stack>
    );
}
