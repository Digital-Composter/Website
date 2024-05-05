// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from "firebase/auth"

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD7CYTMO7i25XkOt9xcj0JtUgkHiQ0Oloc",
  authDomain: "data-user-8f419.firebaseapp.com",
  databaseURL: "https://data-user-8f419-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "data-user-8f419",
  storageBucket: "data-user-8f419.appspot.com",
  messagingSenderId: "487564526090",
  appId: "1:487564526090:web:dc12c228ec59f5414ad5f3",
  measurementId: "G-F6XY8X0XYH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);