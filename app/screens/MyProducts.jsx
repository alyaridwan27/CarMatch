import { View, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { auth, db } from '../../configs/FirebaseConfig';
import LatestItemList from '../components/LatestItemList';
import { useNavigation } from '@react-navigation/native';
import { Colors } from '../../constants/Colors';

export default function MyProducts() {
  const [productList, setProductList] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      fetchUserPosts();
    });
    fetchUserPosts();
    return unsubscribe;
  }, []);

  const fetchUserPosts = async () => {
    const user = auth.currentUser;
    if (!user) return;

    setProductList([]);
    const q = query(collection(db, 'UserPost'), where('userId', '==', user.uid));
    const snapshot = await getDocs(q);

    snapshot.forEach((doc) => {
      setProductList((prev) => [...prev, { id: doc.id, ...doc.data() }]);
    });
  };

  return (
    <View style={styles.container}>
      <LatestItemList latestItemList={productList} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.WHITE,
    flex: 1,
    padding: 16,
  },
});
