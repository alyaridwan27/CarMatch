import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ProfileScreen from '../screens/ProfileScreen';
import ProductDetail from '../screens/ProductDetail';
import { Colors } from '../../constants/Colors';

const Stack = createStackNavigator();

export default function Profile() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="profile-tab"
        component={ProfileScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
              name="product-detail"
              component={ProductDetail}
              options={{
                headerStyle: {
                  backgroundColor: Colors.GRAY,
                },
                headerTintColor: Colors.WHITE,
                headerTitleStyle: {
                  fontFamily: 'outfit-bold',
                  fontSize: 18,
                },
              }}
            />
    </Stack.Navigator>
  );
}
