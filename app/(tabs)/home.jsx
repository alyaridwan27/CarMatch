import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import ItemList from '../screens/ItemList';
import ProductDetail from '../screens/ProductDetail';
import SearchResult from '../screens/SearchResult';
import { Colors } from '../../constants/Colors';

const Stack = createStackNavigator();

export default function Home() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="home"
        component={HomeScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
          name="search-result"
          component={SearchResult}
          options={{
            title: 'Search Results',
            headerStyle: {
              backgroundColor: Colors.GRAY,
            },
            headerTintColor: '#fff',
          }}
        />
      <Stack.Screen
        name="item-list"
        component={ItemList}
        options={({ route }) => ({
          title: route.params.category,
          headerStyle: {
            backgroundColor: Colors.PRIMARY,
          },
          headerTintColor: '#fff',
        })}
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

