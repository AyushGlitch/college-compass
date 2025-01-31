/* eslint-disable prettier/prettier */
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ExpoSQLiteDatabase } from 'drizzle-orm/expo-sqlite';
import { useMigrations } from 'drizzle-orm/expo-sqlite/migrator';
import { useDrizzleStudio } from 'expo-drizzle-studio-plugin';
import {
    preDefinedTimeTable,
    preDefinedTimeTableInsertType,
    preDefinedTimeTableSelectType,
} from '~/db/schema';
import { count } from 'drizzle-orm';
import { preDefinedTimeTableData } from '~/db/seedData';
import { Stack, useRouter, useSegments } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator } from 'react-native';
import { db } from '~/db/drizzle';
import migrations from '~/db/migrations/migrations';

import { FIREBASE_AUTH } from 'firebaseConfig';

type Result = {
    count: number;
}[];

async function seedData(db: ExpoSQLiteDatabase) {
    try {
        // await db.delete(preDefinedTimeTable) //
        const preDefinedData: Result = await db
            .select({ count: count() })
            .from(preDefinedTimeTable);

        if (preDefinedData[0].count == preDefinedTimeTableData.length) {
            console.log('Updated Data Present');
        } else {
            await db.delete(preDefinedTimeTable);
            //@ts-ignore
            const insertRes: preDefinedTimeTableInsertType = await db
                .insert(preDefinedTimeTable)
                //@ts-ignore
                .values(preDefinedTimeTableData);
            if (insertRes) {
                console.log('Updated Data Seeded');
            }
        }
        // await db.delete(preDefinedTimeTable) //
        const seededData: preDefinedTimeTableSelectType[] = await db
            .select()
            .from(preDefinedTimeTable);
        // console.log("Data Present of Length", seededData.length)
    } catch (error) {
        console.log('Error seeding data', error);
    }
}

export default function AppLayout() {
    const auth = FIREBASE_AUTH; // IMPORTING AUTH INSTANCE
    const router = useRouter();
    const segments = useSegments();
    console.warn('CURRENT ROUTE:', segments);

    const isDark = false; // TODO: temporary solution

    const [isInitializing, setIsInitializing] = useState(true);
    const [user, setUser] = useState(true); // FIREBASE AUTH USER

    const { success, error } = useMigrations(db, migrations);
    useDrizzleStudio(db);

    // SEEDING DATA IF NEEDED INITIALLY
    useEffect(() => {
        if (error) throw error;

        if (success) {
            console.log('Migrations ran successfully');
            seedData(db).then(() => setIsInitializing(false));
        }
    }, [success, error]);

    // LISTENING TO AUTH STATE CHANGES
    // useEffect(() => {
    //     const unsubscribe = auth.onAuthStateChanged((user) => {
    //         console.log('onAuthStateChanged', user);
    //         setUser(user);
    //         if (isInitializing) setIsInitializing(false);
    //     });
    //     return () => unsubscribe();
    // }, []);

    // REDIRECTING BASED ON AUTH STATUS
    useEffect(() => {
        if (!isInitializing) {
            const inProtectedGroup = segments[1] === '(protected)';
            if (user && !inProtectedGroup) {
                router.replace('/(app)/(protected)/(drawer)');
            } else if (!user && inProtectedGroup) {
                router.replace('/(app)');
            }
        }
    }, [user, isInitializing]);

    if (isInitializing) {
        return <ActivityIndicator className="flex-1 items-center justify-center" size={'large'} />;
    }

    const queryClient = new QueryClient();

    return (
        <QueryClientProvider client={queryClient}>
            <Stack
                screenOptions={{
                    statusBarStyle: isDark ? 'light' : 'dark',
                    statusBarBackgroundColor: isDark ? '#0c0a09' : '#fafaf9',
                    headerStyle: { backgroundColor: isDark ? '#0c0a09' : '#fafaf9' },
                    headerTintColor: isDark ? '#fafaf9' : '#0c0a09',
                    navigationBarColor: isDark ? '#0c0a09' : '#fafaf9',
                    headerShown: false,
                }}
            />
        </QueryClientProvider>
    );
}
