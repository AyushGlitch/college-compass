import React from 'react';
import { Tabs } from 'expo-router';
import { FontAwesome5, FontAwesome6 } from '@expo/vector-icons';

const _layout = () => {
    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarStyle: {
                    backgroundColor: '#0b0014',
                },
                tabBarActiveTintColor: '#99edcc',
            }}>
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Attendance',
                    tabBarIcon: ({ color, size }) => (
                        <FontAwesome6 name="edit" size={size} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="subjects"
                options={{
                    title: 'Subjects',
                    tabBarIcon: ({ color, size }) => (
                        <FontAwesome6
                            name="book-open"
                            size={size}
                            color={color}
                        />
                    ),
                }}
            />
            <Tabs.Screen
                name="history"
                options={{
                    title: 'History',
                    tabBarIcon: ({ color, size }) => (
                        <FontAwesome5
                            name="history"
                            size={size}
                            color={color}
                        />
                    ),
                }}
            />
        </Tabs>
    );
};

export default _layout;
