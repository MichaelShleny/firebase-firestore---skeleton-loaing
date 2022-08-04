// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
import { getAuth } from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA1MDkya4PaWgJTcxNxsEnRYiA4ARsuBOc",
  authDomain: "fir-michael.firebaseapp.com",
  projectId: "fir-michael",
  storageBucket: "fir-michael.appspot.com",
  messagingSenderId: "137245022533",
  appId: "1:137245022533:web:cb0158c0e81ef15812462c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore();
