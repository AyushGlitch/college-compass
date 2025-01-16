import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { Link } from 'expo-router';
import { Drawer } from 'expo-router/drawer';

import { HeaderButton } from '../../components/HeaderButton';
import { Image, Text, View } from 'react-native';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

function CustomDrawerContent(props: any) {
  const {top, bottom} = useSafeAreaInsets()

  return (    
    <View style={{flex:1}}>
      <DrawerContentScrollView {...props} scrollEnabled={false}>
        <View style={{backgroundColor: '#021520', height: 150, flex:1, justifyContent:'center', alignItems:'center'}}>
          {/* <Image source={require("../assets/images/adaptive-icon.png")} style={{width:'100%', flex:1}} /> */}
        </View>
        
        <View style={{marginVertical:30}}>
          <DrawerItemList {...props} />
        </View>
      </DrawerContentScrollView>  

      {/* <View style={{ borderTopWidth: 2, borderTopColor: '#414141', paddingVertical: bottom + 20, paddingLeft:20, gap:17}}>
        <TouchableOpacity style={{flexWrap:'wrap', flexDirection:'row', gap:20, alignItems:'center'}}  onPress={() => Linking.openURL('https://github.com/AyushGlitch/nitd-attend')}>
          <AntDesign name="github" size={30} color="grey" />
          <Text style={{ fontSize: 17, fontWeight:'500', marginBottom: 10 }}>GitHub</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{flexWrap:'wrap', flexDirection:'row', gap:20, alignItems:'center'}} onPress={() => Linking.openURL('https://www.linkedin.com/in/ayush-aryan-singh-877989204/')}>
          <AntDesign name="linkedin-square" size={30} color="grey" />
          <Text style={{ fontSize: 17, fontWeight:'500', marginBottom: 10 }}>LinkedIn</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{flexWrap:'wrap', flexDirection:'row', gap:20, alignItems:'center'}} onPress={() => Linking.openURL('https://x.com/AyushAryanSgh')}>
          <FontAwesome6 name="square-x-twitter" size={30} color="grey" />
          <Text style={{ fontSize: 17, fontWeight:'500', marginBottom: 10 }}>Twitter</Text>
        </TouchableOpacity>
      </View>   */}
    </View>
  )
} 

const DrawerLayout = () => (
  <Drawer
    screenOptions={{
      headerLeft: () => (
        <Ionicons name="menu" size={30} color="white" className='px-5 flex justify-center items-center'
        style= {{
          paddingHorizontal: 20,
        }}
        />
      ),
      headerRight: () => (
        // <NotificationBell />
        <Ionicons name='menu' />
      ),
      drawerStyle: {
        width: 200
      },
    }}
    drawerContent={CustomDrawerContent}
  >
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
  </Drawer>
);

export default DrawerLayout;
