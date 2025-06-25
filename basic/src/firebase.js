// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-auth-d941c.firebaseapp.com",
  projectId: "mern-auth-d941c",
  storageBucket: "mern-auth-d941c.firebasestorage.app",
  messagingSenderId: "977549228569",
  appId: "1:977549228569:web:6804ee53e0b6ca5b158888"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);