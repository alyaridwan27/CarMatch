import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import { Colors } from '../../constants/Colors'; 
import { Ionicons } from '@expo/vector-icons';
import carPlaceholder from '../../assets/images/car-placeholder.png';

const dummyCars = [
  {
    id: '1',
    title: '2022 Honda CRV',
    price: 'Rp. 456.000.000',
    km: '105.000 KM',
    image: carPlaceholder,
  },
  {
    id: '2',
    title: '2015 Toyota Fortuner',
    price: 'Rp. 170.000.000',
    km: '95.000 KM',
    image: carPlaceholder,
  },
];

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredCars, setFilteredCars] = useState(dummyCars);

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query.trim() === '') {
      setFilteredCars(dummyCars);
    } else {
      const filtered = dummyCars.filter((car) =>
        car.title.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredCars(filtered);
    }
  };

  return (
    <View style={styles.container}>
      {/* Top Section */}
      <View style={styles.topSection}>
        <View style={styles.location}>
          <Ionicons name="location-outline" size={18} color={Colors.text} />
          <Text style={styles.locationText}>Jakarta, Indonesia</Text>
        </View>
        <TouchableOpacity style={styles.listingButton}>
          <Text style={styles.listingText}>My Listing</Text>
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View style={styles.searchWrapper}>
        <Ionicons name="search-outline" size={18} color={Colors.text} />
        <TextInput
          style={styles.searchBar}
          placeholder="Looking for a car?"
          placeholderTextColor={Colors.text}
          value={searchQuery}
          onChangeText={handleSearch}
        />
      </View>

      {/* Car Cards */}
      <ScrollView showsVerticalScrollIndicator={false}>
        {filteredCars.map((car) => (
          <View key={car.id} style={styles.card}>
            <Image source={car.image} style={styles.image} />
            <Text style={styles.carTitle}>{car.title}</Text>
            <Text style={styles.carDetail}>{car.km}</Text>
            <Text style={styles.carPrice}>{car.price}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    paddingHorizontal: 16,
    paddingTop: 40,
  },
  topSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  location: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationText: {
    fontFamily: 'outfit',
    fontSize: 14,
    marginLeft: 6,
    color: Colors.text,
  },
  listingButton: {
    backgroundColor: Colors.primary,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  listingText: {
    fontFamily: 'outfit-bold',
    fontSize: 14,
    color: Colors.WHITE,
  },
  searchWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.secondary,
    paddingHorizontal: 10,
    borderRadius: 10,
    marginBottom: 20,
  },
  searchBar: {
    flex: 1,
    fontFamily: 'outfit',
    fontSize: 14,
    paddingVertical: 10,
    marginLeft: 8,
    color: Colors.text,
  },
  card: {
    backgroundColor: Colors.WHITE,
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
    shadowColor: Colors.BLACK,
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 4,
    elevation: 3,
  },
  image: {
    width: '100%',
    height: 180,
    borderRadius: 10,
    marginBottom: 10,
  },
  carTitle: {
    fontFamily: 'outfit-bold',
    fontSize: 16,
    marginBottom: 4,
    color: Colors.text,
  },
  carDetail: {
    fontFamily: 'outfit',
    fontSize: 13,
    color: Colors.text,
  },
  carPrice: {
    fontFamily: 'outfit-bold',
    fontSize: 15,
    color: Colors.text,
    marginTop: 4,
  },
});
