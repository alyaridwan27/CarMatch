import { View, Text, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useRoute } from '@react-navigation/native';
import { collection, getDocs, getFirestore, query, where } from 'firebase/firestore';
import { app } from '../../configs/FirebaseConfig';
import LatestItemList from '../components/LatestItemList';
import { Colors } from '../../constants/Colors';

export default function ItemList() {
  const { params } = useRoute();
  const category = params?.category;

  const db = getFirestore(app);
  const [itemList, setItemList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (category) getItemListByCategory();
  }, [category]);

  const getItemListByCategory = async () => {
    try {
      setLoading(true);
      setItemList([]);

      const q = query(collection(db, 'UserPost'), where('category', '==', category));
      const snapshot = await getDocs(q);

      const items = snapshot.docs.map(doc => doc.data());
      setItemList(items);
    } catch (error) {
      console.error('Error fetching items by category:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ flex: 1, padding: 16, backgroundColor: Colors.WHITE }}>
      {loading ? (
        <ActivityIndicator size="large" color={Colors.PRIMARY} style={{ marginTop: 80 }} />
      ) : itemList.length > 0 ? (
        <LatestItemList latestItemList={itemList} heading={`Category: ${category}`} />
      ) : (
        <Text style={{ padding: 20, fontSize: 20, textAlign: 'center', color: Colors.GRAY, marginTop: 80 }}>
          No posts found for "{category}"
        </Text>
      )}
    </View>
  );
}
