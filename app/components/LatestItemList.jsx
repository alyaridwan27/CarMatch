import { View, Text, FlatList } from 'react-native';
import React from 'react';
import PostItem from './PostItem';
import { Colors } from '../../constants/Colors';

export default function LatestItemList({ latestItemList, heading }) {
  return (
    <View style={{ marginTop: 10 }}>
      <Text style={{ fontSize: 20, fontFamily: 'outfit-bold', color: Colors.BLACK }}>
        {heading}
      </Text>
      <FlatList
        data={latestItemList}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: 'space-between' }}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => <PostItem item={item} />}
        contentContainerStyle={{ paddingVertical: 8 }}
      />
    </View>
  );
}
