import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCMD8AUDX11lycOKarl4s1B49_PQJJz2zY",
  authDomain: "student-project-submission.firebaseapp.com",
  projectId: "student-project-submission",
  storageBucket: "student-project-submission.appspot.com",
  messagingSenderId: "687401184985",
  appId: "1:687401184985:web:c42b88d41d1af0d5e058c8",
  measurementId: "G-S1P3R86LBH",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
