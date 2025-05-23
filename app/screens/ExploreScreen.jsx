import { View, Text, ScrollView, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { db } from '../../configs/FirebaseConfig';
import LatestItemList from '../components/LatestItemList';
import { Colors } from '../../constants/Colors';

export default function ExploreScreen() {
  const [productList, setProductList] = useState([]);

  useEffect(() => {
    getAllProducts();
  }, []);

  const getAllProducts = async () => {
    setProductList([]);
    const q = query(collection(db, 'UserPost'), orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(q);
    snapshot.forEach((doc) => {
      setProductList((prevList) => [...prevList, { id: doc.id, ...doc.data() }]);
    });
  };

  return (
    <ScrollView style={styles.container}>
      <LatestItemList latestItemList={productList} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE,
    padding: 20,
    paddingTop: 32,
  },
  heading: {
    fontSize: 30,
    fontFamily: 'outfit-bold',
    color: Colors.BLACK,
    marginBottom: 20,
  },
});
