// src/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, collection, addDoc, query, where, getDocs, doc, getDoc, updateDoc } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCuPE13JN_7byYcxDqdusCdMnga_Y9LNJ4",
  authDomain: "academia-c1ea7.firebaseapp.com",
  projectId: "academia-c1ea7",
  storageBucket: "academia-c1ea7.appspot.com",
  messagingSenderId: "281029265760",
  appId: "1:281029265760:web:9eec70026c186a660ab605",
  measurementId: "G-QQD92CLHQV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and Firestore
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db, collection, addDoc, query, where, getDocs, doc, getDoc, updateDoc };
