import { initializeApp } from "firebase/app";
import { getStorage } from 'firebase/storage'
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCe0Y-voDUoiq0_mFljgV-CMtgYWpHwVH8",
  authDomain: "movie-app-665cd.firebaseapp.com",
  projectId: "movie-app-665cd",
  storageBucket: "movie-app-665cd.appspot.com",
  messagingSenderId: "474445992579",
  appId: "1:474445992579:web:571351f06e33cfff8881b6",
  measurementId: "G-KF4W7S9GM4",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const provider = new GoogleAuthProvider();
export const storage = getStorage(app);

export default app;