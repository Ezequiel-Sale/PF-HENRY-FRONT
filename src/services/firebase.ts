"use client";

import { initializeApp } from "firebase/app";
import {
  browserSessionPersistence,
  getAuth,
  initializeAuth,
} from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";

const getGoogleProvider = () => {
  const firebaseConfig = {
    apiKey: "AIzaSyCSP7R4Nfee0q0mv0FLXjfykpcRBHCr6n8",
    authDomain: "power-training-fd6a4.firebaseapp.com",
    projectId: "power-training-fd6a4",
    storageBucket: "power-training-fd6a4.appspot.com",
    messagingSenderId: "925928006913",
    appId: "1:925928006913:web:37958a722435d3e01ae700",
  };

  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const googleProvider = new GoogleAuthProvider();
  return { auth, googleProvider };
};
export default getGoogleProvider;
