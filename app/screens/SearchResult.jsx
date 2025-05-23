import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useRoute, useNavigation } from '@react-navigation/native';
import { useRouter } from 'expo-router';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../configs/FirebaseConfig';
import { Colors } from '../../constants/Colors';
import PostItem from "../components/PostItem";

export default function SearchResult() {
  const route = useRoute();
  const navigation = useNavigation();
  const router = useRouter();

  const formatRupiah = (num) => {
  return 'Rp. ' + Number(num).toLocaleString('id-ID');
    };

  const { location, searchQuery, latitude, longitude } = route.params || {};
  const [results, setResults] = useState([]);

  useEffect(() => {
    fetchFilteredResults();
  }, []);

  const fetchFilteredResults = async () => {
    const querySnapshot = await getDocs(collection(db, 'UserPost'));
    const filtered = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();

      const matchesQuery = data.title.toLowerCase().includes(searchQuery.toLowerCase());
      const hasLocation = data.location?.latitude && data.location?.longitude;

      if (matchesQuery && hasLocation) {
        // Optional: you could filter by distance here using the location prop
        filtered.push({ id: doc.id, ...data });
      }
    });
    setResults(filtered);
  };

  return (
    <View style={{ flex: 1 }}>
      <MapView
        style={{ height: 300 }}
        initialRegion={{
          latitude: parseFloat(latitude) || 37.78825,
            longitude: parseFloat(longitude) || -122.4324,
            latitudeDelta: 0.1,
            longitudeDelta: 0.1,
        }}
      >
        {results.map((item) => (
          <Marker
            key={item.id}
            coordinate={{
              latitude: item.location.latitude,
              longitude: item.location.longitude,
            }}
            title={item.title}
            description={formatRupiah(item.price)}
            onPress={() => navigation.navigate('product-detail', { postId: item.id })}
          />
        ))}
      </MapView>

      <FlatList
  data={results}
  keyExtractor={(item) => item.id}
  renderItem={({ item }) => <PostItem item={item} />}
  numColumns={2}
  columnWrapperStyle={{ justifyContent: 'space-between' }}
  contentContainerStyle={{ padding: 16 }}
  ListEmptyComponent={
    <Text style={styles.emptyText}>No results found.</Text>
  }
/>


    </View>
  );
}

const styles = StyleSheet.create({
  itemContainer: {
    backgroundColor: Colors.WHITE,
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: Colors.BLACK,
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 2,
  },
  title: {
    fontFamily: 'outfit-bold',
    fontSize: 16,
  },
  subtitle: {
    fontFamily: 'outfit',
    fontSize: 14,
    color: Colors.GRAY,
  },
  emptyText: {
    textAlign: 'center',
    color: Colors.GRAY,
    fontFamily: 'outfit',
    marginTop: 40,
  },
  row: {
  flexDirection: 'row',
  alignItems: 'center',
},
image: {
  width: 80,
  height: 60,
  borderRadius: 8,
  backgroundColor: Colors.LIGHT_GRAY,
},
});
