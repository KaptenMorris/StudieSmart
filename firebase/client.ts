import { initializeApp, getApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBY76R673oKaVQjDXyL85_Zjr7W1Li7LR0",
  authDomain: "studiesmart-41800.firebaseapp.com",
  projectId: "studiesmart-41800",
  storageBucket: "studiesmart-41800.firebasestorage.app",
  messagingSenderId: "756719203416",
  appId: "1:756719203416:web:a8c2cded39155520d9c62d",
  measurementId: "G-JZSZLT6BFB"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();


export const auth = getAuth(app);
export const db = getFirestore(app);