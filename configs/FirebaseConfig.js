// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "enter your api key",
  authDomain: "car-match-4a3a1.firebaseapp.com",
  projectId: "car-match-4a3a1",
  storageBucket: "car-match-4a3a1.firebasestorage.app",
  messagingSenderId: "223512176834",
  appId: "1:223512176834:web:7760baadacd7c13ac5335b",
  measurementId: "G-N2K9BEBPFG"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
