import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import FIREBASE_CONFIG from "../config/firebase.json";

// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(FIREBASE_CONFIG);
} else {
  firebase.app(); // if already initialized, use that one
}

// firebase.analytics();

// Database
export const db = firebase.firestore();

// Authentication
export const auth = firebase.auth();
// Social Authentication
export const facebookProvider = new firebase.auth.FacebookAuthProvider();
export const googleProvider = new firebase.auth.GoogleAuthProvider();
export const twitterProvider = new firebase.auth.TwitterAuthProvider();
