import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { Colors } from '../../constants/Colors';

export default function PostItem({ item }) {
  const navigation = useNavigation();

  // Format price as Indonesian Rupiah
  const formattedPrice = new Intl.NumberFormat('id-ID').format(item.price || 0);

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.push('product-detail', { product: item })}
    >
      {item.image && (
        <Image source={{ uri: item.image }} style={styles.image} />
      )}
      <View style={styles.info}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.price}>Rp. {formattedPrice}</Text>
        <Text style={styles.category}>{item.category}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    margin: 8,
    padding: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.GRAY,
    backgroundColor: Colors.WHITE,
  },
  image: {
    width: '100%',
    height: 140,
    borderRadius: 10,
  },
  info: {
    marginTop: 10,
  },
  title: {
    fontSize: 15,
    fontFamily: 'outfit-bold',
    marginBottom: 4,
    color: Colors.BLACK,
  },
  price: {
    fontSize: 18,
    fontFamily: 'outfit-bold',
    color: Colors.BLACK,
    marginBottom: 6,
  },
  category: {
    fontSize: 10,
    fontFamily: 'outfit',
    backgroundColor: Colors.LIGHT_GRAY,
    color: Colors.BLACK,
    alignSelf: 'flex-start',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 20,
    overflow: 'hidden',
  },
});
