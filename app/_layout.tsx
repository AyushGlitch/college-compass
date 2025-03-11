/* eslint-disable prettier/prettier */
import '../global.css';
import { useFonts } from 'expo-font';
import { Slot } from 'expo-router';
import { SQLiteProvider } from 'expo-sqlite';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
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
            // SplashScreen.hideAsync();
        }
    }, [fontsLoaded, error]);

    if (!fontsLoaded && !error) {
        return null;
    }

    return (
        <GestureHandlerRootView>
            <SQLiteProvider
                databaseName="db"
                options={{ enableChangeListener: true }}>
                <Slot
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
            </SQLiteProvider>
        </GestureHandlerRootView>
    );
}
