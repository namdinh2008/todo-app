// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDg56sadNQ-_wJN0Xd2o0U9BoXzgv6IYeU",
  authDomain: "namdinh-f01f4.firebaseapp.com",
  projectId: "namdinh-f01f4",
  storageBucket: "namdinh-f01f4.appspot.com",
  messagingSenderId: "81324033972",
  appId: "1:81324033972:web:0757f514b24be200ef54e1",
  measurementId: "G-XWS6YVQ1XJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication
const auth = getAuth(app);

// Initialize Google Auth Provider
const googleProvider = new GoogleAuthProvider();

// Export auth, googleProvider, and signInWithPopup
export { auth, googleProvider, signInWithPopup };
