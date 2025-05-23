/* eslint-disable prettier/prettier */
import { ExpoSQLiteDatabase } from 'drizzle-orm/expo-sqlite';
import { useMigrations } from 'drizzle-orm/expo-sqlite/migrator';
import { useDrizzleStudio } from 'expo-drizzle-studio-plugin';
import { emailCategories, preDefinedTimeTable } from '~/db/schema';
import { count } from 'drizzle-orm';
import { preDefinedTimeTableData } from '~/db/seedData';
import { Slot, useRouter, useSegments } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import { db } from '~/db/drizzle';
import migrations from '~/db/migrations/migrations';

import { FIREBASE_AUTH } from 'firebaseConfig';
import { User } from 'firebase/auth';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { defaultEmailCategories } from '~/constants/EmailCategories';
import { useStore } from '~/store/store';

type Result = {
    count: number;
}[];

SplashScreen.preventAutoHideAsync();

async function seedData(db: ExpoSQLiteDatabase) {
    try {
        const preDefinedData: Result = await db
            .select({ count: count() })
            .from(preDefinedTimeTable);

        if (preDefinedData[0].count === preDefinedTimeTableData.length) {
            console.log('✅ Data is already seeded');
        } else {
            await db.delete(preDefinedTimeTable);
            await db
                .insert(preDefinedTimeTable)
                .values(preDefinedTimeTableData as any);
            console.log('✅ Data Seeded Successfully');
        }
    } catch (error) {
        console.log('❌ Error seeding data', error);
    }
}

async function initializeCategories() {
    // const isInitialized = await AsyncStorage.getItem('categoriesInitialized');
    for (const cat of defaultEmailCategories) {
        await db
            .insert(emailCategories)
            .values({
                name: cat.name,
                keywords: JSON.stringify(cat.keywords),
                senderMatch: JSON.stringify(cat.senderMatch),
                labelMatch: JSON.stringify(cat.labelMatch || []),
            })
            .onConflictDoUpdate({
                target: emailCategories.name,
                set: {
                    keywords: JSON.stringify(cat.keywords),
                    senderMatch: JSON.stringify(cat.senderMatch),
                    labelMatch: JSON.stringify(cat.labelMatch || []),
                },
            });
    }

    // await AsyncStorage.setItem('categoriesInitialized', 'true');

    // Hydrate Zustand
    const rows = await db.select().from(emailCategories);
    const formatted = rows.map((cat) => ({
        ...cat,
        keywords: JSON.parse(cat.keywords),
        senderMatch: cat.senderMatch ? JSON.parse(cat.senderMatch) : [],
        labelMatch: cat.labelMatch ? JSON.parse(cat.labelMatch) : [],
    }));

    useStore.getState().setCategories(formatted);
}

export default function AppLayout() {
    const auth = FIREBASE_AUTH;
    const router = useRouter();
    const segments = useSegments();

    const [isInitializing, setIsInitializing] = useState(true);
    const [user, setUser] = useState<User | null>(null);

    const { success, error } = useMigrations(db, migrations);
    useDrizzleStudio(db);

    // Run Migrations + Seed Data
    useEffect(() => {
        const initializeApp = async () => {
            try {
                if (error) throw new Error('Migration error');

                if (success) {
                    console.log('✅ Migrations successful');
                    await seedData(db);
                    await initializeCategories();
                }
            } catch (error) {
                console.log('❌ Initialization error:', error);
            } finally {
                // await SplashScreen.hideAsync();
                // setIsInitializing(false);
            }
        };

        initializeApp();
    }, [success, error]);

    // Firebase Auth State listener
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            console.log('🔑 User:', user?.displayName);
            setUser(user);
            setIsInitializing(false);
        });

        return () => unsubscribe();
    }, []);

    // Handle Navigation Based on Auth State
    useEffect(() => {
        const authRedirect = async () => {
            if (isInitializing) return;

            const inProtectedGroup = segments[1] === '(protected)';

            if (user && !inProtectedGroup) {
                console.log('🚀 Redirecting to: Dashboard');
                router.replace('/');
            } else if (!user && inProtectedGroup) {
                console.log('🚀 Redirecting to: Onboarding');
                router.replace('/(app)/(auth)/onboarding1');
            }

            // await SplashScreen.hideAsync();
        };

        authRedirect();
    }, [user, isInitializing, segments]);

    // Provide Tanstack Query Client
    const queryClient = new QueryClient();

    if (isInitializing) return null;

    return (
        <QueryClientProvider client={queryClient}>
            <Slot />
        </QueryClientProvider>
    );
}
