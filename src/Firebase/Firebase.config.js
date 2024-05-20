import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA7VvNMbX7y3JD7_FZHInkl22_KQ-m3Ick",
  authDomain: "youthlink-18229.firebaseapp.com",
  projectId: "youthlink-18229",
  storageBucket: "youthlink-18229.appspot.com",
  messagingSenderId: "33922725109",
  appId: "1:33922725109:web:1314a5191fe96b7cef41bc"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export {auth};