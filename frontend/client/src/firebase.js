// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APP_KEY,
  authDomain: "mern-club.firebaseapp.com",
  projectId: "mern-club",
  storageBucket: "mern-club.appspot.com",
  messagingSenderId: "326389919499",
  appId: "1:326389919499:web:396457737f88f8651ebc0e",
  measurementId: "G-YQZRFD210B"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);