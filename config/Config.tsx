// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBN_uY1jS7hIeL3ds1p4gVKkmf30lBQ7hU",
  authDomain: "actividad-contato2.firebaseapp.com",
  projectId: "actividad-contato2",
  storageBucket: "actividad-contato2.firebasestorage.app",
  messagingSenderId: "282895078872",
  appId: "1:282895078872:web:cef1f25ed46d64e4004ead",
  measurementId: "G-EHMYL6QGFX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();