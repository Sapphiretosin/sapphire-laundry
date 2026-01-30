// src/firebase.js
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyClRu48B8sjowHxNrBxG1NEcK4QXkciCLM",
  authDomain: "sapphire-laundry.firebaseapp.com",
  projectId: "sapphire-laundry",
  storageBucket: "sapphire-laundry.appspot.com",
  messagingSenderId: "583815531236",
  appId: "1:583815531236:web:62990af2d3f46ee9d93af1",
  measurementId: "G-4TLDD85B7G",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
