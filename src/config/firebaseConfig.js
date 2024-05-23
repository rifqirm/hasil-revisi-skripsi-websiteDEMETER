import { getStorage } from "firebase/storage"

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCdnR1iOnoSBPgE4YDoF8ZeE1dLL--Y-vk",
  authDomain: "productimagestorage.firebaseapp.com",
  projectId: "productimagestorage",
  storageBucket: "productimagestorage.appspot.com",
  messagingSenderId: "414573691366",
  appId: "1:414573691366:web:0e5d417514c8f38e821627"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize storage Firebase
export const storage = getStorage(app)