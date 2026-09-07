// ============================================
// SAFEROUTE - FIREBASE CONFIGURATION
// ============================================

import { initializeApp } from "firebase/app";

import {
  getAuth,
  signInAnonymously
} from "firebase/auth";

import {
  getFirestore
} from "firebase/firestore";

// ============================================
// FIREBASE CONFIGURATION
// ============================================

const firebaseConfig = {
  apiKey: "AIzaSyDU-EbE9sHqzYV4WHaVn2942KZK-QyrN5w",
  authDomain: "saferoute-5a720.firebaseapp.com",
  projectId: "saferoute-5a720",
  storageBucket: "saferoute-5a720.firebasestorage.app",
  messagingSenderId: "1000910619498",
  appId: "1:1000910619498:web:ffcee5989e5f8a6359db13"
};

// ============================================
// INITIALIZE FIREBASE
// ============================================

const app = initializeApp(firebaseConfig);

// ============================================
// FIREBASE AUTHENTICATION
// ============================================

export const auth = getAuth(app);

// ============================================
// FIRESTORE DATABASE
// ============================================

export const db = getFirestore(app);

// ============================================
// ANONYMOUS AUTHENTICATION
// ============================================

signInAnonymously(auth)
  .then(() => {
    console.log("Firebase anonymous authentication successful");
  })
  .catch((error) => {
    console.error(
      "Firebase anonymous authentication failed:",
      error
    );
  });