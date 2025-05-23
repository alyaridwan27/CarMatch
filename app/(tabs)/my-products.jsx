import MyProducts from '../screens/MyProducts'; 
import ProductDetail from '../screens/ProductDetail';
import { createStackNavigator } from '@react-navigation/stack';
import { Colors } from '../../constants/Colors';
import React from 'react';
const Stack = createStackNavigator();
export default function MyListing() {
  return (
    <Stack.Navigator>
          <Stack.Screen
            name="my-listings"
            component={MyProducts}
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