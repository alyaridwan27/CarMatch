import { View, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Categories from '../components/Categories';
import LatestItemList from '../components/LatestItemList';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { db } from '../../configs/FirebaseConfig'; // assuming you're using `db` here
import SearchFilter from '../components/SearchFilter';

export default function HomeScreen() {
  const [categoryList, setCategoryList] = useState([]);
  const [latestItemList, setLatestItemList] = useState([]);

  useEffect(() => {
    getCategoryList();
    getLatestItemList();
  }, []);

  const getCategoryList = async () => {
    setCategoryList([]);
    const querySnapshot = await getDocs(collection(db, 'fuelCategory'));
    querySnapshot.forEach((doc) => {
      setCategoryList((prev) => [...prev, doc.data()]);
    });
  };

  const getLatestItemList = async () => {
    setLatestItemList([]);
    const q = query(collection(db, 'UserPost'), orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      setLatestItemList((prev) => [...prev, doc.data()]);
    });
  };

  return (
    <ScrollView style={{ paddingVertical: 32, paddingHorizontal: 24, backgroundColor: 'white', flex: 1 }}>
      <Header />
      <SearchFilter />
      <Categories categoryList={categoryList} />
      <LatestItemList latestItemList={latestItemList} heading="Latest Items" />
    </ScrollView>
  );
}
