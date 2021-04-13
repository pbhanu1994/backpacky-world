import firebase from 'firebase';
import firebaseClientConfig from '../config/firebase.json';

export default function firebaseClient() {
   // Initialize Firebase
   if (!firebase.apps.length) {
      firebase.initializeApp(firebaseClientConfig);
   } 
   else {
      firebase.app(); // if already initialized, use that one
   }
}
// firebase.analytics();
  
// export const firestore = firebase.firestore();
// export const auth = firebase.auth();