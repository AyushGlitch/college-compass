import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { Link } from 'expo-router';
import { Drawer } from 'expo-router/drawer';

import { HeaderButton } from '../../components/HeaderButton';
import { Text, View } from 'react-native';

const DrawerLayout = () => (
  <Drawer>
    <Drawer.Screen
      name="index"
      options={{
        headerTitle: 'Home',
        drawerLabel: 'Home',
        drawerIcon: ({ size, color }) => <Ionicons name="home-outline" size={size} color={color} />,
      }}
    />

    <Drawer.Screen
      name="emailSorter"
      options={{
        headerTitle: 'Email Sorter',
        drawerLabel: 'Email Sorter',
        drawerIcon: ({ size, color }) => <Ionicons name="home-outline" size={size} color={color} />,
      }}
    />

    <Drawer.Screen
      name="Pyqs"
      options={{
        headerTitle: 'PYQs',
        drawerLabel: 'PYQs',
        drawerIcon: ({ size, color }) => <Ionicons name="home-outline" size={size} color={color} />,
      }}
    />

    <Drawer.Screen
      name="hostelLeave"
      options={{
        headerTitle: 'Hostel Leave',
        drawerLabel: 'Hostel Leave',
        drawerIcon: ({ size, color }) => <Ionicons name="home-outline" size={size} color={color} />,
      }}
    />

    <Drawer.Screen
      name="attendanceMarker"
      options={{
        headerTitle: 'Attendance Marker',
        drawerLabel: 'Attendance Marker',
        drawerIcon: ({ size, color }) => <Ionicons name="home-outline" size={size} color={color} />,
      }}
    />

    {/* <Drawer.Screen
      name="(tabs)"
      options={{
        headerTitle: 'Tabs',
        drawerLabel: 'Tabs',
        drawerIcon: ({ size, color }) => (
          <MaterialIcons name="border-bottom" size={size} color={color} />
        ),
        headerRight: () => (
          <Link href="/modal" asChild>
            <HeaderButton />
          </Link>
        ),
      }}
    /> */}
  </Drawer>
);

export default DrawerLayout;
