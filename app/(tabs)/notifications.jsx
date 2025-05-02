import { View, Text, StyleSheet, FlatList, SafeAreaView } from 'react-native';
import React from 'react';

const notificationsData = [
  {
    id: '1',
    title: '2021 BMW X1',
    message: 'The listing you bookmarked has been updated by the seller, check it out!',
  },
  {
    id: '2',
    title: '2022 Honda CRV',
    message: 'Your listing has been bookmarked by Alex.',
  },
  {
    id: '3',
    title: '2022 Honda CRV',
    message: 'Alex has requested to chat with you.',
  },
];

export default function Notifications() {
  const renderItem = ({ item }) => (
    <View style={styles.notificationCard}>
      <Text style={styles.notificationTitle}>{item.title}</Text>
      <Text style={styles.notificationMessage}>{item.message}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Notification</Text>
      <Text style={styles.subHeader}>Notifications & Seller Updates</Text>
      <FlatList
        data={notificationsData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
  },
  header: {
    fontSize: 28,
    fontWeight: '600',
    marginTop: 20,
    marginBottom: 8,
  },
  subHeader: {
    fontSize: 16,
    color: 'gray',
    marginBottom: 16,
  },
  list: {
    paddingBottom: 20,
  },
  notificationCard: {
    backgroundColor: '#e0e0e0',
    borderRadius: 4,
    padding: 16,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#aaa',
  },
  notificationTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 4,
  },
  notificationMessage: {
    fontSize: 14,
    color: '#333',
  },
});
