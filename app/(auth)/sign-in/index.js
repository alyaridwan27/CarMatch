import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation, useRouter } from 'expo-router';
import { Colors } from '../../../constants/Colors';
import Ionicons from '@expo/vector-icons/Ionicons';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../../configs/FirebaseConfig';

export default function SignIn() {
  const navigation = useNavigation();
  const router = useRouter();

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  useEffect(() => {
    navigation.setOptions({
      headerShown: false
    });
  }, []);

  const onSignIn = () => {
    if (!email || !password) {
      Alert.alert('Missing Info', 'Please enter email and password');
      return;
    }
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        router.replace('/home');
        console.log(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage, errorCode);
        if (errorCode === 'auth/invalid-credential') {
          Alert.alert('Login Error', 'Invalid credentials');
        } else {
          Alert.alert('Login Error', errorMessage);
        }
      });
  };

  return (
    <View style={{ padding: 25, paddingTop: 60, backgroundColor: Colors.WHITE, height: '100%' }}>
      <TouchableOpacity onPress={() => router.back()}>
        <Ionicons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>

      <Text style={{ fontFamily: 'outfit-bold', fontSize: 30, marginTop: 30 }}>Let's Sign You In</Text>
      <Text style={{ fontFamily: 'outfit', fontSize: 20, color: Colors.GRAY, marginTop: 20 }}>Welcome back! Please enter your details.</Text>

      <View style={{ marginTop: 50 }}>
        <Text style={{ fontFamily: 'outfit' }}>Email</Text>
        <TextInput style={styles.input} placeholder='Enter Email' onChangeText={(value) => setEmail(value)} />
      </View>

      <View style={{ marginTop: 20 }}>
        <Text style={{ fontFamily: 'outfit' }}>Password</Text>
        <TextInput secureTextEntry={true} style={styles.input} placeholder='Enter Password' onChangeText={(value) => setPassword(value)} />
      </View>

      <TouchableOpacity onPress={onSignIn} style={{ padding: 20, backgroundColor: Colors.BLACK, borderRadius: 15, marginTop: 50 }}>
        <Text style={{ color: Colors.WHITE, textAlign: 'center' }}>Sign In</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.replace('(auth)/sign-up')} style={{ padding: 20, backgroundColor: Colors.WHITE, borderRadius: 15, marginTop: 20, borderWidth: 1 }}>
        <Text style={{ color: Colors.BLACK, textAlign: 'center' }}>Create Account</Text>
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