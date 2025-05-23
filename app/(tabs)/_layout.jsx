import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../constants/Colors';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors.PRIMARY,
        tabBarLabelStyle: {
          fontFamily: 'outfit-medium',
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          headerShown: false,
          title: 'Home',
          tabBarIcon: ({ color }) => (
            <Ionicons name="home-outline" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Explore',
          headerTitleStyle: {
            fontFamily: 'outfit-bold',
            fontSize: 20,
            marginTop:35
          },
          tabBarIcon: ({ color }) => (
            <Ionicons name="search-outline" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="my-products"
        options={{
          title: 'My Products',
          headerTitleStyle: {
            fontFamily: 'outfit-bold',
            fontSize: 20,
            marginTop:35
          },
          tabBarIcon: ({ color }) => (
            <Ionicons name="file-tray-outline" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="addPost"
        options={{
          headerShown: false,
          title: 'Add Post',
          tabBarIcon: ({ color }) => (
            <Ionicons name="add" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          headerShown: false,
          title: 'Profile',
          tabBarIcon: ({ color }) => (
            <Ionicons name="person-outline" size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}