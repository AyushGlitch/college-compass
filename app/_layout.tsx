import '../global.css';

import { useFonts } from 'expo-font';
import { SplashScreen, Stack, useRouter, useSegments } from 'expo-router';
import { useEffect } from 'react';

SplashScreen.preventAutoHideAsync();

export const unstable_settings = {
    // Ensure that reloading on `/modal` keeps a back button present.
    initialRouteName: '(drawer)',
};

export default function RootLayout() {
    const isDark = false; // TODO: temporary solution
    const isAuthenticated = false; // TODO: temporary solution

    const router = useRouter();
    const segments = useSegments();

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

        if (fontsLoaded) SplashScreen.hideAsync();
    }, [fontsLoaded, error]);

    if (!fontsLoaded && !error) {
        return null;
    }

    // Routes user back to onboarding if not authenticated
    useEffect(() => {
        const inProtectedGroup = segments[0] === '(protected)';

        if (isAuthenticated && !inProtectedGroup) {
            router.replace('/(protected)/(drawer)');
        } else if (!isAuthenticated && inProtectedGroup) {
            router.replace('/');
        }
    }, [isAuthenticated]);

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
