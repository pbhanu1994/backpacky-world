import firebase from 'firebase/app';
import 'firebase/auth';
import FIREBASE_CONFIG from '../config/firebase.json';

   // Initialize Firebase
   if (!firebase.apps.length) {
      firebase.initializeApp(FIREBASE_CONFIG);
   }
   else {
      firebase.app(); // if already initialized, use that one
   }
// firebase.analytics();
  
// export const firestore = firebase.firestore();
export const auth = firebase.auth();