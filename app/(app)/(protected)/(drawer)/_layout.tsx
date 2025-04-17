import {
    Ionicons,
    FontAwesome,
    MaterialCommunityIcons,
} from '@expo/vector-icons';
import { Drawer } from 'expo-router/drawer';

import { Image, Linking, Text, TouchableOpacity, View } from 'react-native';
import {
    DrawerContentScrollView,
    DrawerItemList,
} from '@react-navigation/drawer';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

function CustomDrawerContent(props: any) {
    const { top, bottom } = useSafeAreaInsets();

    return (
        <View className="flex-1">
            {/* Drawer Header */}
            <View className="w-full border-b border-glass bg-licorice-600/20 py-8">
                <View
                    className="mx-auto aspect-video w-[60%] items-center justify-center"
                    style={{ paddingTop: top + 10 }}>
                    <Image
                        source={require('assets/icons/text-logo.png')}
                        resizeMode="contain"
                        className="w-full"
                        style={{ tintColor: 'white' }}
                    />
                </View>
            </View>

            {/* Drawer Items */}
            <DrawerContentScrollView {...props}>
                <DrawerItemList {...props} />
            </DrawerContentScrollView>

            {/* Footer Links */}
            <View
                style={{ paddingBottom: bottom + 10 }}
                className="flex-row items-center justify-around gap-4 border-t border-gray-300 py-3">
                {/* NIT Delhi Website */}
                <TouchableOpacity
                    className="my-auto aspect-square items-center justify-center p-2"
                    onPress={() => Linking.openURL('https://nitdelhi.ac.in/')}>
                    <MaterialCommunityIcons name="web" size={24} color="grey" />
                    <Text className="font-pbold text-sm text-white/60">
                        NITD
                    </Text>
                </TouchableOpacity>
                {/* NIT Delhi ERP */}
                <TouchableOpacity
                    className="my-auto aspect-square items-center justify-center p-2"
                    onPress={() => Linking.openURL('https://nitdelhi.ac.in/')}>
                    <MaterialCommunityIcons name="web" size={24} color="grey" />
                    <Text className="font-pbold text-sm text-white/60">
                        ERP
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const DrawerLayout = () => (
    <Drawer
        screenOptions={({ navigation }) => ({
            headerLeft: () => (
                <Ionicons
                    name="menu"
                    size={30}
                    color="white"
                    className="flex items-center justify-center px-5"
                    style={{
                        paddingHorizontal: 20,
                    }}
                    onPress={() => navigation.openDrawer()}
                />
            ),
            drawerStyle: {
                width: '70%',
                backgroundColor: '#0B0014',
                borderColor: 'rgba(255, 255, 255, 0.2)',
                borderRightWidth: 1,
                overflow: 'hidden',
            },
            headerStyle: {
                backgroundColor: '#0b0014',
                borderBottomWidth: 1,
                borderBottomColor: 'rgba(255, 255, 255, 0.1)',
                shadowColor: '#8A2BE2',
                elevation: 10,
            },
            headerTitleStyle: {
                color: '#fff',
                fontWeight: 'bold',
                fontSize: 20,
            },
            drawerLabelStyle: {
                color: '#E8BDFE',
                fontSize: 16,
                fontWeight: 'bold',
                textShadowColor: '#A102F6',
                textShadowOffset: { width: 0, height: 0 },
                textShadowRadius: 6,
                letterSpacing: 1.2,
            },

            drawerItemStyle: {
                shadowColor: '#A102F6',
                shadowOffset: { width: 0, height: 5 },
                shadowOpacity: 0.4,
                shadowRadius: 10,
            },

            drawerActiveTintColor: '#A102F6',

            drawerInactiveTintColor: '#E8BDFE',
        })}
        drawerContent={CustomDrawerContent}>
        <Drawer.Screen
            name="index"
            options={{
                headerTitle: 'Dashboard',
                drawerLabel: 'Dashboard',
                drawerIcon: ({ size, color }) => (
                    <Ionicons name="home" size={size} color={color} />
                ),
            }}
        />

        <Drawer.Screen
            name="emailSorter"
            options={{
                headerTitle: 'Email Sorter',
                drawerLabel: 'Email Sorter',
                drawerIcon: ({ size, color }) => (
                    <Ionicons name="mail" size={size} color={color} />
                ),
            }}
        />

        <Drawer.Screen
            name="Pyqs"
            options={{
                headerTitle: 'PYQs',
                drawerLabel: 'PYQs',
                drawerIcon: ({ size, color }) => (
                    <MaterialCommunityIcons
                        name="book-education"
                        size={size}
                        color={color}
                    />
                ),
            }}
        />

        <Drawer.Screen
            name="hostelLeave"
            options={{
                headerTitle: 'Hostel Leave',
                drawerLabel: 'Hostel Leave',
                drawerIcon: ({ size, color }) => (
                    <FontAwesome name="building" size={size} color={color} />
                ),
            }}
        />

        <Drawer.Screen
            name="attendanceMarker"
            options={{
                headerTitle: 'Attendance Marker',
                drawerLabel: 'Attendance Marker',
                drawerIcon: ({ size, color }) => (
                    <Ionicons name="calendar" size={size} color={color} />
                ),
            }}
        />
        <Drawer.Screen
            name="colabNotes"
            options={{
                drawerItemStyle: {
                    display: "none"
                },
                headerTitle: 'Collab Notes',
                drawerLabel: 'Collab Notes',
                drawerIcon: ({ size, color }) => (
                    <MaterialCommunityIcons
                        name="application-edit"
                        size={size}
                        color={color}
                    />
                ),
            }}
        />
    </Drawer>
);

export default DrawerLayout;
