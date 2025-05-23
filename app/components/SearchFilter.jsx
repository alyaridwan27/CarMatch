import React, { useState } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  FlatList,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Colors } from '../../constants/Colors'; // wrong
import { useRouter } from 'expo-router';


export default function SearchFilter() {
  const [keyword, setKeyword] = useState('');
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const navigation = useNavigation();
  

  // 🔍 Fetch autocomplete suggestions
  const fetchPlaces = async (input) => {
    if (!input) return setSuggestions([]);
    try {
      const res = await fetch(
        `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${input}&key=AIzaSyAVqy5-Eb3LACbATtpo8IHenp6mx8wMFeI`
      );
      const json = await res.json();
      setSuggestions(json.predictions || []);
    } catch (err) {
      console.error(err);
    }
  };

  // 📍 Fetch location details from selected place
  const fetchPlaceDetails = async (placeId) => {
    const res = await fetch(
      `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&key=AIzaSyAVqy5-Eb3LACbATtpo8IHenp6mx8wMFeI`
    );
    const json = await res.json();
    return json.result;
  };

  const handleSearch = () => {
    if (!keyword || !selectedLocation) return;

    navigation.navigate('search-result', {
  location: selectedLocation.formatted_address,
  searchQuery: keyword,
  latitude: selectedLocation.lat,
  longitude: selectedLocation.lng,
  });
  };

  return (
    <View style={styles.container}>
      {/* Location input */}
      <TextInput
        placeholder="Enter a location"
        value={query}
        onChangeText={(text) => {
          setQuery(text);
          fetchPlaces(text);
        }}
        style={styles.input}
        placeholderTextColor={Colors.GRAY}
      />

      {/* Suggestions dropdown */}
      <FlatList
        data={suggestions}
        keyExtractor={(item) => item.place_id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.suggestionItem}
            onPress={async () => {
              const details = await fetchPlaceDetails(item.place_id);
              if (details) {
                setQuery(details.formatted_address);
                setSelectedLocation({
                  formatted_address: details.formatted_address,
                  lat: details.geometry.location.lat,
                  lng: details.geometry.location.lng,
                });
                setSuggestions([]);
              }
            }}
          >
            <Text>{item.description}</Text>
          </TouchableOpacity>
        )}
        style={{ maxHeight: 150, backgroundColor: '#fff' }}
      />

      {/* Keyword input */}
      <TextInput
        placeholder="Search by car (e.g. Toyota)"
        value={keyword}
        onChangeText={setKeyword}
        style={styles.input}
        placeholderTextColor={Colors.GRAY}
      />

      {/* Search button */}
      <TouchableOpacity onPress={handleSearch} style={styles.searchBtn}>
        <Text style={styles.searchBtnText}>Search</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
    backgroundColor: Colors.LIGHT_GRAY,
    padding: 12,
    borderRadius: 12,
    zIndex: 10, // to ensure dropdown is above other elements
  },
  input: {
    backgroundColor: Colors.WHITE,
    padding: 12,
    borderRadius: 8,
    fontFamily: 'outfit',
    fontSize: 16,
    marginBottom: 12,
  },
  suggestionItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  searchBtn: {
    backgroundColor: Colors.BLACK,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
  },
  searchBtnText: {
    color: Colors.WHITE,
    fontFamily: 'outfit-bold',
    fontSize: 16,
  },
});
