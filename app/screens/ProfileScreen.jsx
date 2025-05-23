import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import { auth, db } from '../../configs/FirebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import { signOut } from 'firebase/auth';
import { Colors } from '../../constants/Colors';
import { useRouter } from 'expo-router';

// Static assets
import diary from '../../assets/images/diary.png';
import logout from '../../assets/images/logout.png';
import search from '../../assets/images/search.png';

export default function ProfileScreen() {
  const router = useRouter();
  const [userData, setUserData] = useState({ fullName: '', email: '' });

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    const user = auth.currentUser;
    if (!user) return;

    const docRef = doc(db, 'users', user.uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data();
      setUserData({ fullName: data.fullName, email: data.email });
    }
  };

  const confirmSignOut = () => {
    Alert.alert('Log Out', 'Are you sure you want to log out?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Log Out',
        style: 'destructive',
        onPress: () => handleSignOut(),
      },
    ]);
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      router.replace('/(auth)/Login'); // Redirect to sign-in
    } catch (error) {
      Alert.alert('Error', 'Failed to sign out');
    }
  };

  const menuList = [
    {
      id: 1,
      name: 'Explore',
      icon: search,
      path: 'explore',
    },
    {
      id: 2,
      name: 'Logout',
      icon: logout,
    },
  ];

  const onMenuPress = (item) => {
    if (item.name === 'Logout') {
      confirmSignOut(); // Show confirmation alert
      return;
    }

    if (item.path) {
      router.push(item.path);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.profileSection}>
        <Text style={styles.name}>{userData.fullName}</Text>
        <Text style={styles.email}>{userData.email}</Text>
      </View>

      <FlatList
        data={menuList}
        numColumns={3}
        contentContainerStyle={{ marginTop: 20 }}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => onMenuPress(item)} style={styles.menuItem}>
            <Image source={item.icon} style={styles.menuIcon} />
            <Text style={styles.menuText}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: Colors.WHITE,
    flex: 1,
  },
  profileSection: {
    alignItems: 'center',
    marginTop: 50,
  },
  name: {
    fontFamily: 'outfit-bold',
    fontSize: 24,
    marginTop: 10,
    color: Colors.BLACK,
  },
  email: {
    fontFamily: 'outfit',
    fontSize: 16,
    color: Colors.GRAY,
    marginTop: 4,
  },
  menuItem: {
    flex: 1,
    padding: 10,
    borderWidth: 1,
    alignItems: 'center',
    margin: 6,
    borderRadius: 8,
    borderColor: '#3b82f6',
    backgroundColor: '#dbeafe',
  },
  menuIcon: {
    width: 50,
    height: 50,
  },
  menuText: {
    fontSize: 12,
    marginTop: 8,
    fontFamily: 'outfit-medium',
    color: '#1e40af',
    textAlign: 'center',
  },
});
