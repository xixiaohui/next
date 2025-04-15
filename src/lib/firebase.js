import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

import { getApps } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyDe9qjC_r7nReCPe4ES75YJBE7JYTotPjw",
  authDomain: "material-c7410.firebaseapp.com",
  databaseURL: "https://material-c7410-default-rtdb.firebaseio.com",
  projectId: "material-c7410",
  storageBucket: "material-c7410.firebasestorage.app",
  messagingSenderId: "473651794565",
  appId: "1:473651794565:web:e9b161f1d518e507224fec",
  measurementId: "G-181TGZC3TZ",
};

// const app = initializeApp(firebaseConfig);
export const app = getApps().length
  ? getApps()[0]
  : initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const db = getFirestore(app);
export const storage = getStorage(app);
