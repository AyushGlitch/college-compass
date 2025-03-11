/* eslint-disable prettier/prettier */
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
import { Slot, useRouter, useSegments } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useCallback, useEffect, useState } from 'react';
import { db } from '~/db/drizzle';
import migrations from '~/db/migrations/migrations';

import { FIREBASE_AUTH } from 'firebaseConfig';
import { User } from 'firebase/auth';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

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
    console.log('CURRENT ROUTE:', segments);

    const isDark = false; // TODO: Temporary fix for dark mode

    const [isInitializing, setIsInitializing] = useState(true);
    const [user, setUser] = useState<User | null>(null);
    const { success, error } = useMigrations(db, migrations);
    useDrizzleStudio(db);

    const initializeApp = useCallback(async () => {
        if (error) {
            console.error('Migration error:', error);
            return;
        }
        if (success) {
            console.log('Migrations ran successfully');
            await seedData(db);
            // setIsInitializing(false);
        }
    }, [success, error]);

    useEffect(() => {
        initializeApp();
    }, [initializeApp]);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            console.log('ONAUTHSTATECHANGED:', user?.displayName);

            setUser(user);
            if (isInitializing) {
                setIsInitializing(false);
                SplashScreen.hide();
            }
        });
        return () => unsubscribe();
    }, []);

    useEffect(() => {
        if (!isInitializing) {
            const inProtectedGroup = segments[1] === '(protected)';
            if (user && !inProtectedGroup) {
                console.log('User is logged in, redirecting to Home Screen');
                router.replace('/');
            } else if (!user && inProtectedGroup) {
                console.log('User is not logged in, redirecting to login');
                router.replace('/(app)/(auth)/onboarding1');
            }
        }
    }, [user, isInitializing, segments]);

    // if (isInitializing) {
    //     return (
    //         <ActivityIndicator
    //             className="flex-1 items-center justify-center"
    //             size={'large'}
    //         />
    //     );
    // }

    const queryClient = new QueryClient();

    return (
        <QueryClientProvider client={queryClient}>
            <Slot />
        </QueryClientProvider>
    );
}
