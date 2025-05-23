import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation, useRouter } from 'expo-router';
import { Colors } from '../../../constants/Colors';
import Ionicons from '@expo/vector-icons/Ionicons';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../../../configs/FirebaseConfig';
import { doc, setDoc } from 'firebase/firestore';

export default function SignUp() {
  const navgation = useNavigation();
  const router = useRouter();

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [fullName, setFullName] = useState();

  useEffect(() => {
    navgation.setOptions({
      headerShown: false
    });
  }, []);

  const OnCreateAccount = async () => {
    if (!email || !password || !fullName) {
      Alert.alert('Missing Info', 'Please enter all details');
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Save to Firestore
      await setDoc(doc(db, "users", user.uid), {
        fullName: fullName,
        email: email,
        createdAt: new Date()
      });

      console.log("User added to Firestore with UID:", user.uid);

      router.replace('/home');
    } catch (error) {
      console.log(error.message, error.code);
      Alert.alert('Signup Error', error.message);
    }
  };

  return (
    <View style={{ padding: 25, paddingTop: 60, backgroundColor: Colors.WHITE, height: '100%' }}>
      <TouchableOpacity onPress={() => router.back()}>
        <Ionicons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>
      <Text style={{ fontFamily: 'outfit-bold', fontSize: 30, marginTop: 30 }}>Create a New Account</Text>

      <View style={{ marginTop: 50 }}>
        <Text style={{ fontFamily: 'outfit' }}>Full Name</Text>
        <TextInput style={styles.input} placeholder='Enter Full Name' onChangeText={(value) => setFullName(value)} />
      </View>
      <View style={{ marginTop: 20 }}>
        <Text style={{ fontFamily: 'outfit' }}>Email</Text>
        <TextInput style={styles.input} placeholder='Enter Email' onChangeText={(value) => setEmail(value)} />
      </View>
      <View style={{ marginTop: 20 }}>
        <Text style={{ fontFamily: 'outfit' }}>Password</Text>
        <TextInput secureTextEntry={true} style={styles.input} placeholder='Enter Password' onChangeText={(value) => setPassword(value)} />
      </View>

      <TouchableOpacity onPress={OnCreateAccount} style={{ padding: 20, backgroundColor: Colors.BLACK, borderRadius: 15, marginTop: 50 }}>
        <Text style={{ color: Colors.WHITE, textAlign: 'center' }}>Create Account</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.replace('(auth)/sign-in')} style={{ padding: 20, backgroundColor: Colors.WHITE, borderRadius: 15, marginTop: 20, borderWidth: 1 }}>
        <Text style={{ color: Colors.BLACK, textAlign: 'center' }}>Sign In</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    padding: 15,
    borderWidth: 1,
    borderRadius: 15,
    borderColor: Colors.GRAY,
    fontFamily: 'outfit',
    marginTop: 10
  }
});