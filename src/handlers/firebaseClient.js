import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {
  getAuth,
  FacebookAuthProvider,
  GoogleAuthProvider,
  TwitterAuthProvider,
} from "firebase/auth";
import "firebase/auth";
import "firebase/firestore";
import FIREBASE_CONFIG from "../config/firebase.json";

// Initialize Firebase
const app = initializeApp(FIREBASE_CONFIG);

// firebase.analytics();

// Database
export const db = getFirestore(app);

// Authentication
export const auth = getAuth(app);
// Social Authentication
export const facebookProvider = new FacebookAuthProvider();
export const googleProvider = new GoogleAuthProvider();
export const twitterProvider = new TwitterAuthProvider();
