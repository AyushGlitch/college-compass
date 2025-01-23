/* eslint-disable prettier/prettier */
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import '../global.css';
import { ExpoSQLiteDatabase } from 'drizzle-orm/expo-sqlite';
import { useMigrations } from "drizzle-orm/expo-sqlite/migrator";
import { useDrizzleStudio } from 'expo-drizzle-studio-plugin';
import { preDefinedTimeTable, preDefinedTimeTableInsertType, preDefinedTimeTableSelectType } from '~/db/schema';
import { count } from 'drizzle-orm';
import { preDefinedTimeTableData } from '~/db/seedData';
import { useFonts } from 'expo-font';
import { SplashScreen, Stack, useRouter, useSegments } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator } from 'react-native';
import { db } from '~/db/drizzle';
import migrations from '~/db/migrations/migrations'

SplashScreen.preventAutoHideAsync();

export const unstable_settings = {
    // Ensure that reloading on `/modal` keeps a back button present.
    initialRouteName: '(drawer)',
};

type Result = {
    count: number;
}[];

async function seedData(db: ExpoSQLiteDatabase) {
    try {
        // await db.delete(preDefinedTimeTable) //
        const preDefinedData: Result = await db.select({count: count()}).from(preDefinedTimeTable)
        
        if (preDefinedData[0].count == preDefinedTimeTableData.length) {
            console.log("Updated Data Present")
        }
    
        else {
            await db.delete(preDefinedTimeTable)
            //@ts-ignore
            const insertRes: preDefinedTimeTableInsertType = await db.insert(preDefinedTimeTable).values(preDefinedTimeTableData)
            if (insertRes) {
            console.log("Updated Data Seeded")
            }
        }
        // await db.delete(preDefinedTimeTable) //
        const seededData: preDefinedTimeTableSelectType[] = await db.select().from(preDefinedTimeTable)
        // console.log("Data Present of Length", seededData.length)
  
    } catch (error) {
        console.log('Error seeding data', error)
    }
}


export default function RootLayout() {
    const router = useRouter();
    const segments = useSegments();
    const isDark = false; // TODO: temporary solution

    const [isInitializing, setIsInitializing] = useState(true);
    const [user, setUser] = useState(true);

    const [fontsLoaded, err] = useFonts({
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

    const {success, error} = useMigrations(db, migrations) 
    useDrizzleStudio(db)

    useEffect(() => {
        if (error) throw error;

        if (fontsLoaded) {
            console.log('Migrations ran successfully')
            seedData(db).then(() => SplashScreen.hideAsync()).then(() => setIsInitializing(false))
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

    const queryClient= new QueryClient()

    return (
        <QueryClientProvider client={queryClient}>
            <Stack
                screenOptions={{
                    statusBarStyle: isDark ? 'light' : 'dark',
                    statusBarBackgroundColor: isDark ? '#0c0a09' : '#fafaf9',
                    headerStyle: { backgroundColor: isDark ? '#0c0a09' : '#fafaf9' },
                    headerTintColor: isDark ? '#fafaf9' : '#0c0a09',
                    navigationBarColor: isDark ? '#0c0a09' : '#fafaf9',
                    headerShown: false
                }}>
                <Stack.Screen name="modal" options={{ title: 'Modal', presentation: 'modal' }} />
            </Stack>
        </QueryClientProvider>
    );
}
