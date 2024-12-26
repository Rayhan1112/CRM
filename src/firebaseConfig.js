// Import the functions you need from the SDKs you need
import  {initializeApp}  from "firebase/app";
import 'firebase/storage';
import { getDatabase } from "firebase/database"; // Correctly import getDatabase


// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyClcIdkdwCfMctf9PZb1voUI-TshFp29CA",
  authDomain: "leadmanagement-6735b.firebaseapp.com",
  databaseURL: "https://leadmanagement-6735b-default-rtdb.firebaseio.com",
  projectId: "leadmanagement-6735b",
  storageBucket: "leadmanagement-6735b.firebasestorage.app",
  messagingSenderId: "1009300952662",
  appId: "1:1009300952662:web:2ef5f2639b3e489d888df7",
  measurementId: "G-V1VJBNNBEV"
};
// const firebaseConfig = {
//   apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
//   authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
//   databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
//   projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
//   storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
//   appId: process.env.REACT_APP_FIREBASE_APP_ID,
//   measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
// };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);


// const analytics = getAnalytics(app);

export default database;