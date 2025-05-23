import { initializeApp } from "@firebase/app";
import { getFirestore } from "firebase/firestore";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "API",
  authDomain: "car-match-4a3a1.firebaseapp.com",
  projectId: "car-match-4a3a1",
  storageBucket: "car-match-4a3a1.firebasestorage.app",
  messagingSenderId: "223512176834",
  appId: "1:223512176834:web:7760baadacd7c13ac5335b",
  measurementId: "G-N2K9BEBPFG"
};


const app = initializeApp(firebaseConfig);

const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

export { app, auth };
export const db = getFirestore(app);
