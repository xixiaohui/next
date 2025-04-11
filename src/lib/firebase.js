
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

import { getApps } from "firebase/app";



const firebaseConfig = {
    apiKey: "AIzaSyDe9qjC_r7nReCPe4ES75YJBE7JYTotPjw",
    authDomain: "material-c7410.firebaseapp.com",
    projectId: "material-c7410",
    storageBucket: "material-c7410.firebasestorage.app",
    messagingSenderId: "473651794565",
    appId: "1:473651794565:web:a48929e178ac84dc224fec",
    measurementId: "G-79GXQRKH3Z"
  };

// const app = initializeApp(firebaseConfig);
export const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const db = getFirestore(app);
export const storage = getStorage(app);


