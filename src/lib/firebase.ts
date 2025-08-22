// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  "projectId": "e-reader-oasis-92zyl",
  "appId": "1:498756826400:web:4b190d52c09cd9edd3d345",
  "storageBucket": "e-reader-oasis-92zyl.firebasestorage.app",
  "apiKey": "AIzaSyC6xAivRrbyfUtTerDA1YmPTw2Brz7gg9Y",
  "authDomain": "e-reader-oasis-92zyl.firebaseapp.com",
  "measurementId": "",
  "messagingSenderId": "498756826400"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
