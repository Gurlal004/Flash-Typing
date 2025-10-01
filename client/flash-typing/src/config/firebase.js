// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyABAdQceyk0Z3E0Axl1wwo4_rvX1Chxnrs",
  authDomain: "flash-typing.firebaseapp.com",
  projectId: "flash-typing",
  storageBucket: "flash-typing.firebasestorage.app",
  messagingSenderId: "108811300815",
  appId: "1:108811300815:web:1bad6b365391ed3301ecba",
  measurementId: "G-8V8P6LJL1V"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const auth = getAuth(app);