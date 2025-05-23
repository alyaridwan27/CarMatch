import React from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Colors } from '../../constants/Colors';

export default function Categories({ categoryList }) {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Categories</Text>

      <FlatList
        data={categoryList}
        numColumns={4}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('item-list', {
                category: item.name,
              })
            }
            style={styles.categoryItem}
          >
            <Image source={{ uri: item.icon }} style={styles.icon} />
            <Text style={styles.categoryText}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 12,
  },
  heading: {
    fontSize: 20,
    fontFamily: 'outfit-bold',
    marginBottom: 8,
  },
  categoryItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
    borderWidth: 1,
    borderColor: Colors.GRAY,
    margin: 4,
    height: 80,
    borderRadius: 10,
    backgroundColor: Colors.WHITE, 
  },
  icon: {
    width: 35,
    height: 35,
    resizeMode: 'contain',
  },
  categoryText: {
    fontSize: 12,
    marginTop: 5,
    fontFamily: 'outfit',
  },
});
