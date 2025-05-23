import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { auth, db } from '../../configs/FirebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { Colors } from '../../constants/Colors';

export default function Header() {
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const docRef = doc(db, 'users', user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setUserInfo(docSnap.data());
        }
      }
    });
  }, []);

  return (
    <View>
      {/* User Info Section */}
      <View style={styles.userInfoContainer}>
        <View>
          <Text style={styles.welcomeText}>Welcome,</Text>
          <Text style={styles.userName}>{userInfo?.fullName}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  userInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  welcomeText: {
    fontSize: 20,
    fontFamily: 'outfit-bold',
    color: Colors.GRAY,
    marginTop: 20,
  },
  userName: {
    fontSize: 18,
    fontFamily: 'outfit-medium',
    color: Colors.BLACK,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor:Colors.WHITE,
    padding: 9,
    paddingHorizontal: 20,
    marginTop: 20,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: Colors.GRAY,
  },
  searchInput: {
    marginLeft: 10,
    fontSize: 18,
    fontFamily: 'outfit',
    flex: 1,
  },
});
