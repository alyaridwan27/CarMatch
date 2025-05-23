import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
  ActivityIndicator,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  SafeAreaView,
  FlatList,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import {
  getFirestore,
  getDocs,
  collection,
  addDoc,
  doc,
  getDoc,
} from 'firebase/firestore';
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytes,
} from 'firebase/storage';
import { auth, db } from '../../configs/FirebaseConfig';
import { Formik } from 'formik';
import * as ImagePicker from 'expo-image-picker';
import { Picker } from '@react-native-picker/picker';
import { Colors } from '../../constants/Colors';
import { onAuthStateChanged } from 'firebase/auth';

export default function AddPostScreen() {
  const [image, setImage] = useState(null);
  const storage = getStorage();
  const [loading, setLoading] = useState(false);
  const [categoryList, setCategoryList] = useState([]);
  const [userInfo, setUserInfo] = useState(null);
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    fetchUser();
    getCategoryList();
  }, []);

  const fetchUser = async () => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const docRef = doc(db, 'users', user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setUserInfo(docSnap.data());
        } else {
          Alert.alert('Error', 'User data not found');
        }
      }
    });
  };

  const getCategoryList = async () => {
    try {
      const snapshot = await getDocs(collection(db, 'fuelCategory'));
      const list = [];
      snapshot.forEach((doc) => {
        const data = doc.data();
        if (data?.name) {
          list.push(data.name);
        }
      });
      setCategoryList(list);
    } catch (err) {
      Alert.alert('Error', 'Failed to load categories');
      console.error('Category fetch error:', err);
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const fetchPlaces = async (input) => {
    if (!input) return setSuggestions([]);
    try {
      const res = await fetch(
        `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${input}&key=AIzaSyAVqy5-Eb3LACbATtpo8IHenp6mx8wMFeI`
      );
      const json = await res.json();
      setSuggestions(json.predictions || []);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchPlaceDetails = async (placeId) => {
    const res = await fetch(
      `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&key=AIzaSyAVqy5-Eb3LACbATtpo8IHenp6mx8wMFeI`
    );
    const json = await res.json();
    return json.result;
  };

  const onSubmitMethod = async (value) => {
    if (!userInfo) {
      Alert.alert('Error', 'User not authenticated');
      return;
    }

    if (!value.title) {
      Alert.alert('Validation Error', 'Title is required');
      return;
    }

    setLoading(true);

    let downloadUrl = '';
    if (image) {
      const resp = await fetch(image);
      const blob = await resp.blob();
      const storageRef = ref(storage, 'communityPost/' + Date.now() + '.jpg');
      await uploadBytes(storageRef, blob);
      downloadUrl = await getDownloadURL(storageRef);
    }

    value.image = downloadUrl || null;
    value.fullName = userInfo.fullName;
    value.email = userInfo.email;
    value.userId = auth.currentUser.uid;
    value.createdAt = new Date().toISOString();

    try {
      const docRef = await addDoc(collection(db, 'UserPost'), value);
      if (docRef.id) {
        setLoading(false);
        Alert.alert('Success', 'Post Added Successfully.');
      }
    } catch (error) {
      setLoading(false);
      Alert.alert('Error', 'Failed to add post');
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.WHITE }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1 }}
      >
        <ScrollView
          style={{ padding: 20 }}
          contentContainerStyle={{ paddingBottom: 30 }}
          keyboardShouldPersistTaps="handled"
        >
          <Text style={styles.header}>Add New Post</Text>
          <Text style={styles.subheader}>Create New Post and Start Selling</Text>

          <Formik
            initialValues={{
              title: '',
              desc: '',
              address: '',
              price: '',
              image: '',
              fullName: '',
              email: '',
              createdAt: '',
              category: '',
              location: null,
            }}
            onSubmit={onSubmitMethod}
          >
            {({ handleChange, handleSubmit, values, setFieldValue }) => (
              <View>
                <TouchableOpacity onPress={pickImage} style={{ marginVertical: 15 }}>
                  <Image
                    source={
                      image
                        ? { uri: image }
                        : require('../../assets/images/car-placeholder.png')
                    }
                    style={{ width: 100, height: 100, borderRadius: 15 }}
                  />
                </TouchableOpacity>

                <TextInput
                  style={styles.input}
                  placeholder="Title"
                  value={values.title}
                  onChangeText={handleChange('title')}
                />

                <TextInput
                  style={styles.input}
                  placeholder="Description"
                  value={values.desc}
                  onChangeText={handleChange('desc')}
                  multiline
                />

                <TextInput
                  style={styles.input}
                  placeholder="Price"
                  value={values.price}
                  keyboardType="number-pad"
                  onChangeText={handleChange('price')}
                />

                <TextInput
                  style={styles.input}
                  placeholder="Search Address"
                  value={query}
                  onChangeText={(text) => {
                    setQuery(text);
                    fetchPlaces(text);
                  }}
                />

                <FlatList
                  data={suggestions}
                  keyExtractor={(item) => item.place_id}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      style={{ padding: 10, borderBottomWidth: 1, borderColor: '#ccc' }}
                      onPress={async () => {
                        const details = await fetchPlaceDetails(item.place_id);
                        if (details) {
                          setQuery(details.formatted_address);
                          setFieldValue('address', details.formatted_address);
                          setFieldValue('location', {
                            latitude: details.geometry.location.lat,
                            longitude: details.geometry.location.lng,
                          });
                          setSuggestions([]);
                        }
                      }}
                    >
                      <Text>{item.description}</Text>
                    </TouchableOpacity>
                  )}
                  style={{ maxHeight: 200, backgroundColor: 'white', zIndex: 10 }}
                />

                <View style={styles.pickerWrapper}>
                  <Picker
                    selectedValue={values.category}
                    onValueChange={(itemValue) => setFieldValue('category', itemValue)}
                  >
                    <Picker.Item label="Select Category" value="" />
                    {categoryList.map((name, index) => (
                      <Picker.Item key={index} label={name} value={name} />
                    ))}
                  </Picker>
                </View>

                <TouchableOpacity
                  onPress={handleSubmit}
                  style={[
                    styles.submitButton,
                    { backgroundColor: loading ? Colors.GRAY : Colors.BLACK },
                  ]}
                  disabled={loading}
                >
                  {loading ? (
                    <ActivityIndicator color={Colors.WHITE} />
                  ) : (
                    <Text style={styles.submitText}>Submit</Text>
                  )}
                </TouchableOpacity>
              </View>
            )}
          </Formik>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    fontSize: 27,
    fontFamily: 'outfit-bold',
    marginTop:30
  },
  subheader: {
    fontSize: 16,
    color: Colors.GRAY,
    fontFamily: 'outfit',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: Colors.GRAY,
    borderRadius: 10,
    padding: 15,
    marginTop: 10,
    marginBottom: 10,
    fontFamily: 'outfit',
  },
  pickerWrapper: {
    borderWidth: 1,
    borderColor: Colors.GRAY,
    borderRadius: 10,
    marginTop: 15,
    marginBottom: 10,
  },
  submitButton: {
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
  },
  submitText: {
    textAlign: 'center',
    color: Colors.WHITE,
    fontSize: 16,
    fontFamily: 'outfit-bold',
  },
});
