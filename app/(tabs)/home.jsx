import { View, Text, TextInput, Button, ScrollView, StyleSheet, Image } from 'react-native'
import React from 'react'

export default function home() {
  return (
    <View style={styles.container}>
    {/* Top Section */}
    <View style={styles.topSection}>
      <View style={styles.location}>
        <Text>Your Location: Jakarta, Indonesia</Text>
      </View>
      <Button title="My Listing" />
    </View>

    {/* Search Bar */}
    <TextInput 
      style={styles.searchBar} 
      placeholder="Looking for a car?" 
    />
    
    {/* Car Cards Section */}
    <ScrollView>
      <View style={styles.card}>
        <Image source={{uri: 'placeholder_image_url'}} style={styles.image} />
        <Text>2022 Honda CRV</Text>
        <Text>Rp. 456.000.000</Text>
        <Text>105.000 KM</Text>
      </View>
    </ScrollView>
  </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  topSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
  },
  location: {
    flex: 1,
  },
  searchBar: {
    backgroundColor: '#fff',
    borderRadius: 5,
    margin: 10,
    padding: 10,
  },
  card: {
    backgroundColor: '#fff',
    margin: 10,
    borderRadius: 10,
    padding: 10,
  },
  image: {
    width: '100%',
    height: 200,
    backgroundColor: '#ddd', 
    borderRadius: 10,
  },
  navBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: '#fff',
  },
});