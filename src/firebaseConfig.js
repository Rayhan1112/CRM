// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database"; // Import database functionality

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyClcIdkdwCfMctf9PZb1voUI-TshFp29CA",
  authDomain: "leadmanagement-6735b.firebaseapp.com",
  databaseURL: "https://leadmanagement-6735b-default-rtdb.firebaseio.com",
  projectId: "leadmanagement-6735b",
  storageBucket: "leadmanagement-6735b.appspot.com", // Corrected storage bucket
  messagingSenderId: "1009300952662",
  appId: "1:1009300952662:web:2ef5f2639b3e489d888df7",
  measurementId: "G-V1VJBNNBEV",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app); // Initialize the Realtime Database

export default database;
