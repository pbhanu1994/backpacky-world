import { initializeApp } from "firebase/app";
import { getFirestore, initializeFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import {
  getAuth,
  FacebookAuthProvider,
  GoogleAuthProvider,
  TwitterAuthProvider,
} from "firebase/auth";
import "firebase/auth";
import "firebase/firestore";
import FIREBASE_CONFIG from "../config/firebase";

// Initialize Firebase
const app = initializeApp(FIREBASE_CONFIG);

// firebase.analytics();

// Database
// Settings - Ignoring Undefined Properties
initializeFirestore(app, {
  ignoreUndefinedProperties: true,
});
export const db = getFirestore(app);

// Storage
export const storage = getStorage(app);

// Authentication
export const auth = getAuth(app);
// Social Authentication
export const facebookProvider = new FacebookAuthProvider();
export const googleProvider = new GoogleAuthProvider();
export const twitterProvider = new TwitterAuthProvider();
