// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-estate-4d9ff.firebaseapp.com",
  projectId: "mern-estate-4d9ff",
  storageBucket: "mern-estate-4d9ff.appspot.com",
  messagingSenderId: "206020871155",
  appId: "1:206020871155:web:99b95f914de81654aa4886"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);