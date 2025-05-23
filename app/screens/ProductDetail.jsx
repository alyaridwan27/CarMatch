import {
  View,
  Text,
  Image,
  ScrollView,
  Linking,
  Share,
  Alert,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import {
  deleteDoc,
  doc,
  getDoc,
} from 'firebase/firestore';
import { Colors } from '../../constants/Colors';
import { db, auth } from '../../configs/FirebaseConfig';
import { useLocalSearchParams } from 'expo-router';


export default function ProductDetail({ navigation }) {
  const { params } = useRoute();
  const [product, setProduct] = useState({});
  const [postOwner, setPostOwner] = useState({});
  const nav = useNavigation();
  const user = auth.currentUser;
  const route = useRoute();

  useEffect(() => {
  if (params?.product) {
    setProduct(params.product);
    fetchUserInfo(params.product.userId); 
    setupHeaderShare();
  } else if (params?.postId) {
    fetchProductFromFirestore(params.postId);
  }
}, [params]);

  const fetchUserInfo = async (userId) => {
    try {
      const docRef = doc(db, 'users', userId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setPostOwner(docSnap.data());
      }
    } catch (error) {
      console.error('Error fetching post owner info:', error);
    }
  };

  const fetchProductFromFirestore = async (postId) => {
  try {
    const docRef = doc(db, 'UserPost', postId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const data = { id: docSnap.id, ...docSnap.data() };
      setProduct(data);
      fetchUserInfo(data.userId);
      setupHeaderShare();
    }
  } catch (error) {
    console.error('Error fetching product:', error);
  }
};

  const setupHeaderShare = () => {
    navigation.setOptions({
      headerRight: () => (
        <Ionicons
          name="share-social-sharp"
          size={24}
          color={Colors.WHITE}
          style={{ marginRight: 15 }}
          onPress={shareProduct}
        />
      ),
    });
  };

  const shareProduct = async () => {
    const content = {
      message: `${product?.title}\n${product?.desc}`,
    };
    Share.share(content).catch(console.error);
  };

  const sendEmailMessage = () => {
  if (!postOwner.email) return;
  const subject = encodeURIComponent(`Regarding ${product.title}`);
  const body = encodeURIComponent(`Hi ${postOwner.fullName},\n\nI am interested in this product.`);
  const emailUrl = `mailto:${postOwner.email}?subject=${subject}&body=${body}`;

  Linking.canOpenURL(emailUrl)
    .then((supported) => {
      if (supported) {
        Linking.openURL(emailUrl);
      } else {
        Alert.alert('Error', 'No email app is available to send a message.');
      }
    })
    .catch((err) => {
      console.error('Failed to open email client:', err);
      Alert.alert('Error', 'Something went wrong while trying to open your email app.');
    });
};


  const deleteUserPost = () => {
    Alert.alert('Do you want to delete?', 'Are you sure you want to delete this post?', [
      { text: 'Yes', onPress: deleteFromFirestore },
      { text: 'Cancel', style: 'cancel' },
    ]);
  };

  const deleteFromFirestore = async () => {
    try {
      await deleteDoc(doc(db, 'UserPost', product.id));
      nav.goBack();
    } catch (error) {
      console.error('Failed to delete post:', error);
      Alert.alert('Error', 'Failed to delete the post. Please try again.');
    }
  };

  const isOwner = user?.uid && product?.userId && user.uid === product.userId;

  return (
    <ScrollView style={styles.container}>
      {product.image && <Image source={{ uri: product.image }} style={styles.image} />}

      <View style={styles.content}>
        <Text style={styles.title}>{product?.title}</Text>

        <View style={styles.categoryWrapper}>
          <Text style={styles.category}>{product?.category}</Text>
        </View>

        <Text style={styles.descLabel}>Description</Text>
        <Text style={styles.description}>{product?.desc}</Text>
        {product.address && (
          <>
            <Text style={styles.descLabel}>Address</Text>
            <Text style={styles.description}>{product.address}</Text>
          </>
        )}
      </View>

      {/* User Info */}
      <View style={styles.userInfo}>
        <View>
          <Text style={styles.userName}>{postOwner?.fullName || 'Unknown User'}</Text>
          <Text style={styles.userEmail}>{postOwner?.email || 'No email provided'}</Text>
        </View>
      </View>

      {/* Action Button */}
      <TouchableOpacity
        onPress={isOwner ? deleteUserPost : sendEmailMessage}
        style={[styles.actionBtn, isOwner ? styles.deleteBtn : styles.messageBtn]}
      >
        <Text style={styles.actionBtnText}>{isOwner ? 'Delete Post' : 'Send Message'}</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.WHITE,
  },
  image: {
    width: '100%',
    height: 320,
  },
  content: {
    margin: 20,
  },
  title: {
    fontSize: 24,
    fontFamily: 'outfit-bold',
    color: Colors.BLACK,
  },
  categoryWrapper: {
    marginTop: 10,
    alignSelf: 'flex-start',
    backgroundColor: Colors.LIGHT_GRAY,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },
  category: {
    fontSize: 14,
    fontFamily: 'outfit',
    color: Colors.BLACK,
  },
  descLabel: {
    marginTop: 20,
    fontSize: 20,
    fontFamily: 'outfit-bold',
    color: Colors.BLACK,
  },
  description: {
    fontSize: 17,
    fontFamily: 'outfit',
    color: Colors.GRAY,
    marginTop: 8,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: Colors.LIGHT_GRAY,
    padding: 12,
    paddingHorizontal: 16,
  },
  userName: {
    fontSize: 18,
    fontFamily: 'outfit-bold',
    color: Colors.BLACK,
  },
  userEmail: {
    fontSize: 14,
    fontFamily: 'outfit',
    color: Colors.GRAY,
  },
  actionBtn: {
    padding: 16,
    margin: 16,
    borderRadius: 12,
  },
  messageBtn: {
    backgroundColor: Colors.BLACK,
  },
  deleteBtn: {
    backgroundColor: Colors.RED,
  },
  actionBtnText: {
    color: Colors.WHITE,
    textAlign: 'center',
    fontFamily: 'outfit-bold',
    fontSize: 16,
  },
});
