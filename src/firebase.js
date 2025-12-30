import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Replace the following configuration with your own Firebase project configuration
// You can find this in the Firebase Console -> Project Settings -> General -> Your apps -> SDK Setup and Configuration
const firebaseConfig = {
    apiKey: "AIzaSyCKKJgOwMkRQFQaUR-cjw5MLFAlYK4wR0Y",
    authDomain: "igfest-7b66e.firebaseapp.com",
    projectId: "igfest-7b66e",
    storageBucket: "igfest-7b66e.firebasestorage.app",
    messagingSenderId: "42519337756",
    appId: "1:42519337756:web:1aff632f1942c32555f8d9",
    measurementId: "G-QTHSZ2K98Y",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Services
export const auth = getAuth(app);
export const db = getFirestore(app);
