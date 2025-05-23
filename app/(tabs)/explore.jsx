import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ExploreScreen from '../screens/ExploreScreen';
import ProductDetail from '../screens/ProductDetail';
import { Colors } from '../../constants/Colors';

const Stack = createStackNavigator();

export default function Explore() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ExploreScreen"
        component={ExploreScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="product-detail"
        component={ProductDetail}
        options={{
          title: 'Product Detail',
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
