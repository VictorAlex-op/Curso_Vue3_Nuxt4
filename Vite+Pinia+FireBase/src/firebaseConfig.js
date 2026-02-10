// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
import {getFirestore} from 'firebase/firestore/lite'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDmUlDZrXiVqbTT3A94NZ4oroIH9VGRzRE",
  authDomain: "vue3test-34792.firebaseapp.com",
  projectId: "vue3test-34792",
  storageBucket: "vue3test-34792.firebasestorage.app",
  messagingSenderId: "1003746003604",
  appId: "1:1003746003604:web:0ab51305b4c635edac8281"
};

// Initialize Firebase
initializeApp(firebaseConfig);
const auth = getAuth()
const db = getFirestore()
export {auth,db};