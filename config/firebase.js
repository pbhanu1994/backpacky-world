import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyBVc4HiK4WQXZJ6TVbws1TkepSbzRIHXzs",
    authDomain: "backpackyworld.firebaseapp.com",
    projectId: "backpackyworld",
    storageBucket: "backpackyworld.appspot.com",
    messagingSenderId: "131731716234",
    appId: "1:131731716234:web:9c9542b6530dae17901573",
    measurementId: "G-LPZ7Z2W99V"
};

// Initialize Firebase
// firebase.initializeApp(firebaseConfig);
if (!firebase.apps.length) {
   firebase.initializeApp(firebaseConfig);
}else {
   firebase.app(); // if already initialized, use that one
}
// firebase.analytics();
  
export const firestore = firebase.firestore();
export const auth = firebase.auth();