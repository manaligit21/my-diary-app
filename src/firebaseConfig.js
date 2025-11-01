// src/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDQvTgTYWzqBnPQMDQXmmTybpq4tZLLKFU",
  authDomain: "my-diary-app-8ef03.firebaseapp.com",
  projectId: "my-diary-app-8ef03",
  storageBucket: "my-diary-app-8ef03.firebasestorage.app",
  messagingSenderId: "932932780813",
  appId: "1:932932780813:web:63d533cbb003b3d63aa644",
  measurementId: "G-W1MSY4600Z"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore (our database)
export const db = getFirestore(app);
export const storage = getStorage(app);

