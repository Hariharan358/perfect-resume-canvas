// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from "firebase/app";
import "firebase/firestore"; 

const firebaseConfig = {
  apiKey: "AIzaSyBSVe7EaLHE8opy0LUpkisHGzu_7G5xXr8",
  authDomain: "summa-9c5bd.firebaseapp.com",
  projectId: "summa-9c5bd",
  storageBucket: "summa-9c5bd.firebasestorage.app",
  messagingSenderId: "418385494774",
  appId: "1:418385494774:web:87ae1eea94322149e222d7",
  measurementId: "G-BZR5TWHF3X"
};

// Initialize Firebase


// firebaseConfig.js
// or any other Firebase services you want to use


if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig); // Initialize Firebase
} else {
  firebase.app(); // Use the default app
}

const firestore = firebase.firestore();

export default firestore;
