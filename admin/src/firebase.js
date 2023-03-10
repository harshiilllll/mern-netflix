import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "movie-app-665cd.firebaseapp.com",
  projectId: "movie-app-665cd",
  storageBucket: "movie-app-665cd.appspot.com",
  messagingSenderId: "474445992579",
  appId: "1:474445992579:web:571351f06e33cfff8881b6",
  measurementId: "G-KF4W7S9GM4",
};

export const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
export default storage;
